import fs from "fs/promises";
import http from "http";
import { afterAll, beforeAll, expect, test } from "vitest";
import { ResilientHttpClient } from "@/lib/resilient-http";

const loadFactors = [1.0, 1.2, 1.5, 2.0];
const baseRequestCount = 20;
const baseConcurrency = 4;

let server: http.Server;
let baseUrl: string;

beforeAll(async () => {
  server = http.createServer((req, res) => {
    if (!req.url) {
      res.statusCode = 400;
      res.end("Missing URL");
      return;
    }

    if (req.url.startsWith("/unstable")) {
      const failureRate = 0.2;
      const shouldFail = Math.random() < failureRate;
      const latency = 100 + Math.random() * 40;

      setTimeout(() => {
        if (shouldFail) {
          res.statusCode = 503;
          res.end("temporary failure");
        } else {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ ok: true }));
        }
      }, latency);
      return;
    }

    res.statusCode = 404;
    res.end("not found");
  });

  await new Promise<void>((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve());
  });

  const addressInfo = server.address();
  if (addressInfo && typeof addressInfo === "object") {
    baseUrl = `http://127.0.0.1:${addressInfo.port}`;
  } else {
    throw new Error("Failed to determine test server address.");
  }
});

afterAll(async () => {
  await new Promise<void>((resolve, reject) => {
    server.close((error) => {
      if (error) reject(error);
      else resolve();
    });
  });
});

function percentile(values: number[], percentileValue: number) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const rank = Math.ceil((percentileValue / 100) * sorted.length) - 1;
  return sorted[Math.max(0, Math.min(sorted.length - 1, rank))];
}

async function runScenario(
  client: ResilientHttpClient,
  totalRequests: number,
  concurrency: number,
) {
  let successes = 0;
  let failures = 0;
  const latencies: number[] = [];
  const startTime = performance.now();

  let issued = 0;
  async function worker() {
    while (true) {
      const current = issued;
      issued += 1;
      if (current >= totalRequests) {
        break;
      }

      const requestStart = performance.now();
      try {
        await client.get(`${baseUrl}/unstable`);
        successes += 1;
      } catch {
        failures += 1;
      } finally {
        latencies.push(performance.now() - requestStart);
      }
    }
  }

  const workers = Array.from(
    { length: Math.max(1, concurrency) },
    () => worker(),
  );

  await Promise.all(workers);
  const durationMs = performance.now() - startTime;
  const p99 = percentile(latencies, 99);

  return {
    totalRequests,
    successes,
    failures,
    failureRate: totalRequests ? failures / totalRequests : 0,
    p99,
    durationMs,
  };
}

test("resilient HTTP client maintains acceptable retry budget under load", async () => {
  const client = new ResilientHttpClient({
    maxRetries: 2,
    baseBackoffMs: 80,
    maxRetryBudget: 24,
    retryBudgetWindowMs: 2_000,
    failureThreshold: 3,
    halfOpenAfterMs: 1_000,
    maxConcurrent: 6,
    requestTimeoutMs: 2_000,
  });

  const results = [];
  for (const factor of loadFactors) {
    const total = Math.round(baseRequestCount * factor);
    const concurrency = Math.max(1, Math.round(baseConcurrency * factor));
    const scenario = await runScenario(client, total, concurrency);
    results.push({ factor, ...scenario });
  }

  const byFactor = new Map(results.map((entry) => [entry.factor, entry]));

  const baseline = byFactor.get(1.0);
  expect(baseline).toBeDefined();
  expect(baseline!.failureRate).toBeLessThanOrEqual(0.1);
  expect(baseline!.p99).toBeLessThanOrEqual(400);

  const moderateLoad = byFactor.get(1.2);
  expect(moderateLoad).toBeDefined();
  expect(moderateLoad!.p99).toBeLessThanOrEqual(450);
  expect(moderateLoad!.failureRate - baseline!.failureRate).toBeLessThanOrEqual(0.01);

  const highLoad = byFactor.get(1.5);
  expect(highLoad).toBeDefined();
  expect(highLoad!.failureRate).toBeLessThanOrEqual(0.15);

  const overload = byFactor.get(2.0);
  expect(overload).toBeDefined();
  expect(overload!.failureRate).toBeGreaterThanOrEqual(0.2);

  const reportPath = new URL("../resilience-report.json", import.meta.url);
  await fs.writeFile(
    reportPath,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        loadFactors,
        results,
      },
      null,
      2,
    ) + "\n",
  );
});

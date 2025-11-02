#!/usr/bin/env node

import { spawn } from "child_process";
import { once } from "events";
import { setTimeout as delay } from "timers/promises";
import fs from "fs/promises";
import path from "path";

const cycles = 3;
const port = parseInt(process.env.GRACEFUL_TEST_PORT || "3050", 10);
const gracePeriod = parseInt(process.env.GRACE_PERIOD || "1000", 10);
const projectRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const serverPath = path.join(projectRoot, "server", "graceful-server.mjs");
const reportPath = path.join(projectRoot, "graceful-shutdown-report.json");

function startServer() {
  return spawn(
    "node",
    [serverPath],
    {
      env: {
        ...process.env,
        NODE_ENV: "development",
        PORT: String(port),
        GRACE_PERIOD: String(gracePeriod),
      },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );
}

async function waitForReady(child) {
  let buffer = "";
  const readyPhrase = "Listening on http://127.0.0.1";

  const onData = (data) => {
    buffer += data.toString();
    if (buffer.includes(readyPhrase)) {
      child.stdout.off("data", onData);
      readyResolver();
    }
  };

  let readyResolver;
  const readyPromise = new Promise((resolve) => {
    readyResolver = resolve;
  });

  child.stdout.on("data", onData);

  await Promise.race([
    readyPromise,
    once(child, "exit").then(() => {
      throw new Error("Server exited before reporting readiness.");
    }),
  ]);
}

async function fetchWithRetry(url, expected, maxAttempts = 10) {
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.status === expected) {
        return response;
      }
    } catch (error) {
      if (attempt === maxAttempts) {
        throw error;
      }
    }
    await delay(50);
  }
  throw new Error(`Failed to observe HTTP ${expected} from ${url} after ${maxAttempts} attempts.`);
}

async function runCycle(cycleIndex) {
  const server = startServer();
  const stderrChunks = [];
  server.stderr.on("data", (data) => stderrChunks.push(data.toString()));

  await waitForReady(server);
  await fetchWithRetry(`http://127.0.0.1:${port}/_health`, 200);

  const slowStart = performance.now();
  const slowPromise = fetch(`http://127.0.0.1:${port}/_demo/sleep?ms=200`).then(
    async (response) => {
      const duration = performance.now() - slowStart;
      return {
        status: response.status,
        duration,
        body: await response.json().catch(() => null),
      };
    },
  );

  await delay(50);
  server.kill("SIGTERM");

  let drainingStatus = null;
  try {
    const drainingResponse = await fetch(`http://127.0.0.1:${port}/_health`, { cache: "no-store" });
    drainingStatus = drainingResponse.status;
  } catch (error) {
    drainingStatus = null;
  }

  const slowResult = await slowPromise.catch((error) => ({
    status: null,
    duration: performance.now() - slowStart,
    error: error?.message ?? String(error),
  }));

  const [exitCode] = await once(server, "exit");

  return {
    cycle: cycleIndex,
    slowResult,
    drainingStatus,
    exitCode,
    stderr: stderrChunks.join(""),
  };
}

async function main() {
  const cyclesResults = [];

  for (let index = 0; index < cycles; index += 1) {
    const result = await runCycle(index + 1);
    cyclesResults.push(result);
  }

  const durations = cyclesResults
    .map((cycle) => cycle.slowResult.duration ?? gracePeriod)
    .sort((a, b) => a - b);
  const p99Duration = durations[durations.length - 1] ?? 0;
  const drops = cyclesResults.filter((cycle) => cycle.slowResult.status !== 200).length;
  const dropRate = drops / cyclesResults.length;

  const report = {
    generatedAt: new Date().toISOString(),
    gracePeriodMs: gracePeriod,
    cycles: cyclesResults,
    metrics: {
      dropRate,
      p99Duration,
      meetsGraceBudget: p99Duration <= gracePeriod * 0.95,
    },
  };

  await fs.writeFile(reportPath, JSON.stringify(report, null, 2) + "\n", "utf8");

  if (dropRate > 0) {
    throw new Error(`Drop rate ${dropRate} exceeds threshold.`);
  }
  if (!report.metrics.meetsGraceBudget) {
    throw new Error(
      `p99 duration ${p99Duration}ms exceeds 95% of grace period ${gracePeriod * 0.95}ms.`,
    );
  }

  console.log(
    `Graceful shutdown validation complete. Drop rate ${dropRate}, p99 ${p99Duration.toFixed(2)}ms.`,
  );
}

main().catch((error) => {
  console.error("[validate-graceful-shutdown] Failed:", error);
  process.exitCode = 1;
});

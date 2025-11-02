import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

type CircuitState = "closed" | "open" | "half-open";

export class CircuitOpenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CircuitOpenError";
  }
}

export class RetryBudgetExceededError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RetryBudgetExceededError";
  }
}

export class ConcurrencyLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConcurrencyLimitError";
  }
}

export interface ResilientClientOptions {
  maxRetries: number;
  baseBackoffMs: number;
  maxRetryBudget: number;
  retryBudgetWindowMs: number;
  failureThreshold: number;
  halfOpenAfterMs: number;
  maxConcurrent: number;
  requestTimeoutMs: number;
}

const defaultOptions: ResilientClientOptions = {
  maxRetries: 2,
  baseBackoffMs: 150,
  maxRetryBudget: 6,
  retryBudgetWindowMs: 60_000,
  failureThreshold: 3,
  halfOpenAfterMs: 5_000,
  maxConcurrent: 4,
  requestTimeoutMs: 7_500,
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRetriableStatus(status?: number) {
  if (!status) {
    return true;
  }
  return status >= 500 || status === 429 || status === 408;
}

export class ResilientHttpClient {
  private readonly options: ResilientClientOptions;
  private circuitState: CircuitState = "closed";
  private failureCount = 0;
  private nextAttemptAt = 0;
  private retryHistory: number[] = [];
  private activeRequests = 0;
  private halfOpenProbeInFlight = false;

  constructor(options?: Partial<ResilientClientOptions>) {
    this.options = { ...defaultOptions, ...options };
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "GET", url });
  }

  private assertCircuit(): void {
    const now = Date.now();
    if (this.circuitState === "open") {
      if (now >= this.nextAttemptAt) {
        this.circuitState = "half-open";
        this.halfOpenProbeInFlight = false;
      } else {
        throw new CircuitOpenError(
          `Circuit is open until ${new Date(this.nextAttemptAt).toISOString()}`,
        );
      }
    }

    if (this.circuitState === "half-open") {
      if (this.halfOpenProbeInFlight) {
        throw new CircuitOpenError("Half-open probe already in progress.");
      }
      this.halfOpenProbeInFlight = true;
    }
  }

  private acquireSlot(): void {
    if (this.activeRequests >= this.options.maxConcurrent) {
      throw new ConcurrencyLimitError(
        `Max concurrent requests (${this.options.maxConcurrent}) reached.`,
      );
    }
    this.activeRequests += 1;
  }

  private releaseSlot(): void {
    this.activeRequests = Math.max(0, this.activeRequests - 1);
  }

  private canRetry(): boolean {
    const now = Date.now();
    this.retryHistory = this.retryHistory.filter(
      (timestamp) => now - timestamp < this.options.retryBudgetWindowMs,
    );
    if (this.retryHistory.length >= this.options.maxRetryBudget) {
      return false;
    }
    this.retryHistory.push(now);
    return true;
  }

  private markSuccess(): void {
    this.failureCount = 0;
    this.circuitState = "closed";
    this.nextAttemptAt = 0;
  }

  private markFailure(): void {
    this.failureCount += 1;
    if (
      this.circuitState === "half-open" ||
      this.failureCount >= this.options.failureThreshold
    ) {
      this.circuitState = "open";
      this.nextAttemptAt = Date.now() + this.options.halfOpenAfterMs;
    }
  }

  private finalizeRequest(): void {
    if (this.circuitState === "half-open") {
      this.halfOpenProbeInFlight = false;
    }
  }

  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    this.assertCircuit();
    this.acquireSlot();

    const axiosConfig: AxiosRequestConfig = {
      timeout: this.options.requestTimeoutMs,
      ...config,
    };

    let attempt = 0;
    let lastError: unknown;

    try {
      while (attempt <= this.options.maxRetries) {
        if (attempt > 0 && !this.canRetry()) {
          throw new RetryBudgetExceededError("Retry budget exhausted for window.");
        }

        try {
          const response: AxiosResponse<T> = await axios.request<T>(axiosConfig);
          this.markSuccess();
          return response.data;
        } catch (error: any) {
          lastError = error;
          const status = error?.response?.status as number | undefined;
          const retriable = isRetriableStatus(status);
          this.markFailure();

          if (!retriable || attempt === this.options.maxRetries) {
            throw error;
          }

          const backoff =
            this.options.baseBackoffMs * 2 ** attempt +
            Math.floor(Math.random() * this.options.baseBackoffMs);
          await sleep(backoff);
        }

        attempt += 1;
      }
    } catch (error) {
      lastError = error;
      throw error;
    } finally {
      this.finalizeRequest();
      this.releaseSlot();
    }

    throw lastError instanceof Error
      ? lastError
      : new Error("Unknown error in resilient HTTP client.");
  }
}

function envNumber(name: string, fallback: number): number {
  const raw = process.env[name];
  if (raw === undefined) {
    return fallback;
  }
  const value = Number(raw);
  return Number.isFinite(value) && value >= 0 ? value : fallback;
}

export const resilientHttp = new ResilientHttpClient({
  maxRetries: envNumber(
    "NEXT_PUBLIC_HTTP_MAX_RETRIES",
    defaultOptions.maxRetries,
  ),
  baseBackoffMs: envNumber(
    "NEXT_PUBLIC_HTTP_BACKOFF_MS",
    defaultOptions.baseBackoffMs,
  ),
  maxRetryBudget: envNumber(
    "NEXT_PUBLIC_HTTP_RETRY_BUDGET",
    defaultOptions.maxRetryBudget,
  ),
  retryBudgetWindowMs: envNumber(
    "NEXT_PUBLIC_HTTP_RETRY_WINDOW_MS",
    defaultOptions.retryBudgetWindowMs,
  ),
  failureThreshold: envNumber(
    "NEXT_PUBLIC_HTTP_FAILURE_THRESHOLD",
    defaultOptions.failureThreshold,
  ),
  halfOpenAfterMs: envNumber(
    "NEXT_PUBLIC_HTTP_HALF_OPEN_MS",
    defaultOptions.halfOpenAfterMs,
  ),
  maxConcurrent: envNumber(
    "NEXT_PUBLIC_HTTP_MAX_CONCURRENT",
    defaultOptions.maxConcurrent,
  ),
  requestTimeoutMs: envNumber(
    "NEXT_PUBLIC_HTTP_TIMEOUT_MS",
    defaultOptions.requestTimeoutMs,
  ),
});

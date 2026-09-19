/**
 * In-memory sliding window rate limiter for API routes.
 * Suitable for edge/node environments with automatic stale token pruning.
 */

interface RateLimitRecord {
  timestamps: number[];
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Clean up stale entries every 10 minutes to prevent memory leaks
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    const expiryWindow = 60 * 60 * 1000; // 1 hour
    for (const [key, record] of rateLimitStore.entries()) {
      record.timestamps = record.timestamps.filter((t) => now - t < expiryWindow);
      if (record.timestamps.length === 0) {
        rateLimitStore.delete(key);
      }
    }
  }, 10 * 60 * 1000);
}

export interface RateLimitOptions {
  limit?: number; // max requests within window
  windowMs?: number; // window duration in ms
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

export function rateLimit(
  identifier: string,
  options: RateLimitOptions = {}
): RateLimitResult {
  const limit = options.limit ?? 5; // default: 5 requests
  const windowMs = options.windowMs ?? 15 * 60 * 1000; // default: 15 minutes
  const now = Date.now();
  const windowStart = now - windowMs;

  let record = rateLimitStore.get(identifier);
  if (!record) {
    record = { timestamps: [] };
    rateLimitStore.set(identifier, record);
  }

  // Filter timestamps within current window
  record.timestamps = record.timestamps.filter((t) => t > windowStart);

  if (record.timestamps.length >= limit) {
    const oldestTimestamp = record.timestamps[0];
    const resetTime = oldestTimestamp + windowMs;
    return {
      success: false,
      limit,
      remaining: 0,
      reset: Math.ceil((resetTime - now) / 1000),
    };
  }

  // Record current request
  record.timestamps.push(now);

  return {
    success: true,
    limit,
    remaining: limit - record.timestamps.length,
    reset: Math.ceil(windowMs / 1000),
  };
}

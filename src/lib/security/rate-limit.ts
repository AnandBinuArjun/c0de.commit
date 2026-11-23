import { prisma } from "@/lib/db/prisma";
import { hashClientIp } from "@/lib/db/repositories";

interface RateLimitBucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, RateLimitBucket>();

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetInMs: number;
  backend: "memory" | "upstash-redis" | "postgresql";
}

/**
 * Synchronous in-memory token-bucket rate limiter (used as primary local store and fast-path).
 */
export function checkRateLimit(
  identifier: string,
  maxRequests = 5,
  windowMs = 60_000
): RateLimitResult {
  const now = Date.now();
  const key = identifier.trim() || "anonymous";
  const existing = buckets.get(key);

  if (!existing || now >= existing.resetAt) {
    buckets.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });
    return {
      allowed: true,
      remaining: Math.max(0, maxRequests - 1),
      resetInMs: windowMs,
      backend: "memory",
    };
  }

  if (existing.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetInMs: Math.max(0, existing.resetAt - now),
      backend: "memory",
    };
  }

  existing.count += 1;
  buckets.set(key, existing);

  return {
    allowed: true,
    remaining: Math.max(0, maxRequests - existing.count),
    resetInMs: Math.max(0, existing.resetAt - now),
    backend: "memory",
  };
}

/**
 * Distributed Production Rate Limiter:
 * 1. If UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are configured, enforces atomic distributed
 *    window counters via Upstash Redis REST pipeline.
 * 2. Else if DATABASE_URL (PostgreSQL) is configured in production, counts recent ContactSubmission
 *    records matching the hashed client IP within the sliding window.
 * 3. Always enforces the in-memory fast-path guard as a baseline defense.
 */
export async function checkDistributedRateLimit(
  identifier: string,
  maxRequests = 5,
  windowMs = 60_000
): Promise<RateLimitResult> {
  // Fast-path local memory guard first
  const localResult = checkRateLimit(identifier, maxRequests, windowMs);
  if (!localResult.allowed) {
    return localResult;
  }

  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  const ipHash = hashClientIp(identifier);

  // 1. Optional Upstash Redis Distributed Enforcement
  if (upstashUrl && upstashToken) {
    try {
      const bucketKey = `codecommit:rl:${ipHash}`;
      const response = await fetch(`${upstashUrl}/pipeline`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${upstashToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          ["INCR", bucketKey],
          ["PEXPIRE", bucketKey, windowMs, "NX"],
          ["PTTL", bucketKey],
        ]),
      });

      if (response.ok) {
        const data = (await response.json()) as { result: number }[];
        const currentCount = Number(data?.[0]?.result ?? 1);
        const ttl = Number(data?.[2]?.result ?? windowMs);
        return {
          allowed: currentCount <= maxRequests,
          remaining: Math.max(0, maxRequests - currentCount),
          resetInMs: ttl > 0 ? ttl : windowMs,
          backend: "upstash-redis",
        };
      }
    } catch {
      // Fall through to PostgreSQL or memory result if Redis is temporarily unreachable
    }
  }

  // 2. Optional PostgreSQL Sliding-Window Count Enforcement
  if (process.env.DATABASE_URL && process.env.NODE_ENV === "production") {
    try {
      const windowStart = new Date(Date.now() - windowMs);
      const recentCount = await prisma.contactSubmission.count({
        where: {
          ipHash,
          createdAt: { gte: windowStart },
        },
      });

      if (recentCount >= maxRequests) {
        return {
          allowed: false,
          remaining: 0,
          resetInMs: windowMs,
          backend: "postgresql",
        };
      }

      return {
        allowed: true,
        remaining: Math.max(0, maxRequests - (recentCount + 1)),
        resetInMs: windowMs,
        backend: "postgresql",
      };
    } catch {
      // Fallback to in-memory result
    }
  }

  return localResult;
}

export function resetRateLimitStore(): void {
  buckets.clear();
}

/**
 * A small fixed-window rate limiter.
 *
 * State lives in this process's memory. For a single-container deployment that
 * is the right trade-off: it needs no schema change and no extra service.
 * Running more than one replica would need a shared store (Redis, or a table),
 * because each replica would otherwise keep its own counters.
 *
 * Kept free of Next.js imports so the logic can be unit tested directly.
 */

export interface RateLimitRule {
  /** Requests allowed per window. */
  limit: number;
  /** Window length in milliseconds. */
  windowMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  /** Milliseconds until the window resets. Zero when the request is allowed. */
  retryAfterMs: number;
}

interface Window {
  count: number;
  resetAt: number;
}

const windows = new Map<string, Window>();

/** How often stale windows are swept, so the map cannot grow without bound. */
const SWEEP_INTERVAL_MS = 60_000;
let lastSweep = 0;

/**
 * Rate limiting is on by default and can be switched off with
 * `AUTH_RATE_LIMIT_ENABLED=false` — which the end-to-end suite does, because
 * every test would otherwise share one client identity.
 */
export function isRateLimitingEnabled(): boolean {
  return process.env.AUTH_RATE_LIMIT_ENABLED !== "false";
}

function sweep(now: number): void {
  if (now - lastSweep < SWEEP_INTERVAL_MS) return;
  lastSweep = now;

  for (const [key, window] of windows) {
    if (window.resetAt <= now) windows.delete(key);
  }
}

/**
 * Records an attempt against `key` and reports whether it may proceed.
 *
 * A request is counted even when it is rejected, so a client that keeps hammering
 * cannot keep the window alive indefinitely without being pushed further out.
 */
export function checkRateLimit(
  key: string,
  rule: RateLimitRule,
  now: number = Date.now(),
): RateLimitResult {
  if (!isRateLimitingEnabled() || rule.limit <= 0) {
    return { allowed: true, retryAfterMs: 0 };
  }

  sweep(now);

  const existing = windows.get(key);

  if (!existing || existing.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + rule.windowMs });
    return { allowed: true, retryAfterMs: 0 };
  }

  if (existing.count >= rule.limit) {
    return { allowed: false, retryAfterMs: existing.resetAt - now };
  }

  existing.count += 1;
  return { allowed: true, retryAfterMs: 0 };
}

/** Clears every counter. Used by tests to keep cases independent. */
export function resetRateLimits(): void {
  windows.clear();
  lastSweep = 0;
}

/**
 * The named limits, kept together so the policy is visible in one place.
 *
 * Sign-in is limited per email as well as per client address: the per-email limit
 * is what actually stops password guessing, and it keeps working when the app is
 * reached directly rather than through a proxy (when no client address is known).
 * The per-address limits are the backstop against spraying many accounts.
 */
export const RATE_LIMITS = {
  signInPerAddress: { limit: 30, windowMs: 5 * 60_000 },
  signInPerEmail: { limit: 10, windowMs: 5 * 60_000 },
  signUpPerAddress: { limit: 10, windowMs: 60 * 60_000 },
  passwordResetPerAddress: { limit: 10, windowMs: 15 * 60_000 },
  passwordResetPerEmail: { limit: 3, windowMs: 15 * 60_000 },
} satisfies Record<string, RateLimitRule>;

export type RateLimitName = keyof typeof RATE_LIMITS;

// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { RATE_LIMITS, checkRateLimit, isRateLimitingEnabled, resetRateLimits } from "./rate-limit";

const RULE = { limit: 3, windowMs: 60_000 };
const START = new Date("2026-01-01T00:00:00.000Z").getTime();

beforeEach(() => {
  resetRateLimits();
  vi.unstubAllEnvs();
});

afterEach(() => {
  resetRateLimits();
  vi.unstubAllEnvs();
});

describe("checkRateLimit", () => {
  it("allows exactly the configured number of requests", () => {
    for (let attempt = 0; attempt < RULE.limit; attempt += 1) {
      expect(checkRateLimit("k", RULE, START).allowed).toBe(true);
    }
  });

  it("rejects the request that exceeds the limit", () => {
    for (let attempt = 0; attempt < RULE.limit; attempt += 1) {
      checkRateLimit("k", RULE, START);
    }

    const blocked = checkRateLimit("k", RULE, START);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterMs).toBeGreaterThan(0);
  });

  it("never reports waiting longer than the window", () => {
    for (let attempt = 0; attempt < RULE.limit; attempt += 1) {
      checkRateLimit("k", RULE, START);
    }

    expect(checkRateLimit("k", RULE, START).retryAfterMs).toBeLessThanOrEqual(RULE.windowMs);
  });

  it("lets requests through again once the window has passed", () => {
    for (let attempt = 0; attempt < RULE.limit; attempt += 1) {
      checkRateLimit("k", RULE, START);
    }
    expect(checkRateLimit("k", RULE, START).allowed).toBe(false);

    const afterWindow = START + RULE.windowMs + 1;
    expect(checkRateLimit("k", RULE, afterWindow).allowed).toBe(true);
  });

  it("counts each key separately", () => {
    for (let attempt = 0; attempt < RULE.limit; attempt += 1) {
      checkRateLimit("a", RULE, START);
    }

    expect(checkRateLimit("a", RULE, START).allowed).toBe(false);
    expect(checkRateLimit("b", RULE, START).allowed).toBe(true);
  });

  it("does not extend the window when a blocked client keeps trying", () => {
    for (let attempt = 0; attempt < RULE.limit; attempt += 1) {
      checkRateLimit("k", RULE, START);
    }

    // Hammering in the last millisecond of the window must not push the reset out.
    const nearEnd = START + RULE.windowMs - 1;
    checkRateLimit("k", RULE, nearEnd);

    expect(checkRateLimit("k", RULE, START + RULE.windowMs + 1).allowed).toBe(true);
  });

  it("treats a non-positive limit as unlimited", () => {
    for (let attempt = 0; attempt < 50; attempt += 1) {
      expect(checkRateLimit("k", { limit: 0, windowMs: 1000 }, START).allowed).toBe(true);
    }
  });
});

describe("isRateLimitingEnabled", () => {
  it("is on by default", () => {
    vi.stubEnv("AUTH_RATE_LIMIT_ENABLED", "");
    expect(isRateLimitingEnabled()).toBe(true);
  });

  it("can be switched off", () => {
    vi.stubEnv("AUTH_RATE_LIMIT_ENABLED", "false");
    expect(isRateLimitingEnabled()).toBe(false);
  });

  it("allows everything when switched off", () => {
    vi.stubEnv("AUTH_RATE_LIMIT_ENABLED", "false");

    for (let attempt = 0; attempt < 100; attempt += 1) {
      expect(checkRateLimit("k", RULE, START).allowed).toBe(true);
    }
  });
});

describe("the configured policy", () => {
  it("allows a few password resets per address per window", () => {
    expect(RATE_LIMITS.passwordResetPerEmail.limit).toBeGreaterThanOrEqual(1);
    expect(RATE_LIMITS.passwordResetPerEmail.limit).toBeLessThanOrEqual(5);
    expect(RATE_LIMITS.passwordResetPerEmail.windowMs).toBeGreaterThanOrEqual(60_000);
  });

  it("allows enough sign-in attempts for a typo, but not for guessing", () => {
    expect(RATE_LIMITS.signInPerEmail.limit).toBeGreaterThanOrEqual(5);
    expect(RATE_LIMITS.signInPerEmail.limit).toBeLessThanOrEqual(20);
    expect(RATE_LIMITS.signInPerEmail.windowMs).toBeLessThanOrEqual(15 * 60_000);
  });
});

import { describe, expect, it } from "vitest";

import {
  RESET_TOKEN_BYTES,
  RESET_TOKEN_TTL_MINUTES,
  createResetToken,
  hashResetToken,
  isResetTokenUsable,
  resetTokenExpiry,
} from "./reset-token";

describe("password reset tokens", () => {
  it("stores only a hash of the token", () => {
    const { token, tokenHash } = createResetToken();

    expect(token.length).toBeGreaterThan(30);
    expect(tokenHash).toHaveLength(64); // SHA-256 in hex
    expect(tokenHash).toBe(hashResetToken(token));
    expect(tokenHash).not.toContain(token);
  });

  it("generates a distinct token every time", () => {
    expect(createResetToken().token).not.toBe(createResetToken().token);
  });

  it("hashes deterministically and distinguishes tokens", () => {
    const { token } = createResetToken();
    expect(hashResetToken(token)).toBe(hashResetToken(token));
    expect(hashResetToken("token-a")).not.toBe(hashResetToken("token-b"));
  });

  it("expires after the configured lifetime", () => {
    const issuedAt = new Date("2026-01-01T00:00:00.000Z");
    const expiresAt = resetTokenExpiry(issuedAt);

    const minutes = (expiresAt.getTime() - issuedAt.getTime()) / 60_000;
    expect(minutes).toBe(RESET_TOKEN_TTL_MINUTES);
  });

  it("accepts a fresh, unused token", () => {
    const now = new Date("2026-01-01T00:00:00.000Z");
    expect(
      isResetTokenUsable({ usedAt: null, expiresAt: resetTokenExpiry(now) }, now),
    ).toBe(true);
  });

  it("rejects a token that has already been used", () => {
    const now = new Date("2026-01-01T00:00:00.000Z");
    expect(isResetTokenUsable({ usedAt: now, expiresAt: resetTokenExpiry(now) }, now)).toBe(false);
  });

  it("rejects an expired token", () => {
    const issuedAt = new Date("2026-01-01T00:00:00.000Z");
    const expiresAt = resetTokenExpiry(issuedAt);
    const oneSecondAfterExpiry = new Date(expiresAt.getTime() + 1000);

    expect(isResetTokenUsable({ usedAt: null, expiresAt }, oneSecondAfterExpiry)).toBe(false);
  });

  it("uses a strong amount of entropy and a short lifetime", () => {
    expect(RESET_TOKEN_BYTES).toBeGreaterThanOrEqual(32);
    expect(RESET_TOKEN_TTL_MINUTES).toBeLessThanOrEqual(60);
  });
});

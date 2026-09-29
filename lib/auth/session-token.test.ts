import { describe, expect, it } from "vitest";

import { SESSION_MAX_AGE_SECONDS, createSessionToken, readSessionToken } from "./session-token";

describe("session tokens", () => {
  it("round-trips a user id", () => {
    const token = createSessionToken("user_123");
    expect(readSessionToken(token)).toEqual({ userId: "user_123" });
  });

  it("rejects a tampered signature", () => {
    const token = createSessionToken("user_123");
    const [payload] = token.split(".");

    expect(readSessionToken(`${payload}.not-a-real-signature`)).toBeNull();
  });

  it("rejects a tampered payload", () => {
    const token = createSessionToken("user_123");
    const [, signature] = token.split(".");

    const forgedPayload = Buffer.from(
      JSON.stringify({ uid: "attacker", exp: Date.now() + 60_000 }),
    ).toString("base64url");

    expect(readSessionToken(`${forgedPayload}.${signature}`)).toBeNull();
  });

  it("rejects a structurally invalid token", () => {
    expect(readSessionToken("")).toBeNull();
    expect(readSessionToken("no-dot-here")).toBeNull();
    expect(readSessionToken(".signature-only")).toBeNull();
  });

  it("expires after the configured lifetime", () => {
    const issuedAt = 1_700_000_000_000;
    const token = createSessionToken("user_123", issuedAt);

    // Valid one second before expiry…
    expect(
      readSessionToken(token, issuedAt + SESSION_MAX_AGE_SECONDS * 1000 - 1000),
    ).toEqual({ userId: "user_123" });

    // …and rejected once past it.
    expect(
      readSessionToken(token, issuedAt + SESSION_MAX_AGE_SECONDS * 1000 + 1000),
    ).toBeNull();
  });

  it("issues a different token for a different user", () => {
    expect(createSessionToken("a")).not.toBe(createSessionToken("b"));
  });
});

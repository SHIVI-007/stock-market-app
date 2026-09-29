import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Pure session-token logic — no Next.js imports, so it can be unit tested.
 *
 * A session token is a signed, tamper-evident string:
 *
 *     <base64url(payload)>.<base64url(HMAC-SHA256(payload))>
 *
 * The payload is never trusted without a valid signature.
 */
export const SESSION_COOKIE = "smf_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

const DEV_FALLBACK_SECRET = "insecure-development-secret-change-me";

function getSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (secret && secret.length >= 16) return secret;

  if (process.env.NODE_ENV === "production") {
    console.warn(
      "[auth] AUTH_SECRET is not set. Sessions are signed with an insecure fallback. " +
        "Set AUTH_SECRET to a long random value before deploying.",
    );
  }
  return DEV_FALLBACK_SECRET;
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

function constantTimeEqual(a: string, b: string): boolean {
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);
  if (bufferA.length !== bufferB.length) return false;
  return timingSafeEqual(bufferA, bufferB);
}

export function createSessionToken(userId: string, now: number = Date.now()): string {
  const payload = Buffer.from(
    JSON.stringify({ uid: userId, exp: now + SESSION_MAX_AGE_SECONDS * 1000 }),
  ).toString("base64url");

  return `${payload}.${sign(payload)}`;
}

export function readSessionToken(
  token: string,
  now: number = Date.now(),
): { userId: string } | null {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  if (!constantTimeEqual(signature, sign(payload))) return null;

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString()) as {
      uid?: unknown;
      exp?: unknown;
    };

    if (typeof data.uid !== "string" || typeof data.exp !== "number") return null;
    if (data.exp < now) return null;

    return { userId: data.uid };
  } catch {
    return null;
  }
}

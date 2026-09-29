import { cookies } from "next/headers";

import {
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  createSessionToken,
  readSessionToken,
} from "@/lib/auth/session-token";

export { SESSION_COOKIE, createSessionToken, readSessionToken } from "@/lib/auth/session-token";

/**
 * Cookie handling for sessions. The token format itself lives in
 * `session-token.ts` so it can be tested without a Next.js request context.
 *
 * Cookies are only marked `Secure` when explicitly enabled, so the app works
 * over plain HTTP during local production testing. Set `AUTH_COOKIE_SECURE=true`
 * whenever the app is served over HTTPS.
 */
function isCookieSecure(): boolean {
  return process.env.AUTH_COOKIE_SECURE === "true";
}

export async function setSessionCookie(userId: string): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, createSessionToken(userId), {
    httpOnly: true,
    sameSite: "lax",
    secure: isCookieSecure(),
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: isCookieSecure(),
    path: "/",
    maxAge: 0,
  });
}

export async function getSessionUserId(): Promise<string | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return readSessionToken(token)?.userId ?? null;
}

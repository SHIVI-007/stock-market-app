import { createHash, randomBytes } from "node:crypto";

/**
 * Password reset tokens — pure helpers, no Next.js imports, so they can be
 * unit tested directly.
 *
 * The raw token is sent to the learner and never stored. Only its SHA-256 hash
 * is persisted, so a leaked database cannot be used to reset accounts.
 */
export const RESET_TOKEN_TTL_MINUTES = 30;
export const RESET_TOKEN_BYTES = 32;

export interface CreatedResetToken {
  /** The value that goes into the reset link. Never persisted. */
  token: string;
  /** What is stored in the database. */
  tokenHash: string;
}

export function hashResetToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export function createResetToken(): CreatedResetToken {
  const token = randomBytes(RESET_TOKEN_BYTES).toString("base64url");
  return { token, tokenHash: hashResetToken(token) };
}

export function resetTokenExpiry(now: Date = new Date()): Date {
  return new Date(now.getTime() + RESET_TOKEN_TTL_MINUTES * 60_000);
}

/** A token is usable only if it exists, has not been used, and has not expired. */
export function isResetTokenUsable(
  record: { usedAt: Date | null; expiresAt: Date },
  now: Date = new Date(),
): boolean {
  if (record.usedAt) return false;
  return record.expiresAt.getTime() > now.getTime();
}

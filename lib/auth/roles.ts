import type { Role } from "@/lib/auth/types";

/**
 * Role helpers.
 *
 * An account becomes an administrator in one of two ways:
 *
 *  1. Its email is listed in `ADMIN_EMAILS` — granted automatically at sign-up
 *     and sign-in. This bootstraps the very first admin without a chicken-and-egg
 *     problem, and still requires the correct password.
 *  2. It is promoted directly, either from the admin dashboard or with
 *     `npm run admin:promote -- someone@example.com`.
 */
export function isAdminRole(role: unknown): role is "ADMIN" {
  return role === "ADMIN";
}

/**
 * Type guard, so callers that have already checked the role keep the full user
 * type (and TS knows the user is not null).
 */
export function isAdmin<T extends { role: Role }>(
  user: T | null | undefined,
): user is T & { role: "ADMIN" } {
  return user?.role === "ADMIN";
}

/** The email addresses in `ADMIN_EMAILS`, normalised to lowercase. */
export function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string): boolean {
  return adminEmails().includes(email.trim().toLowerCase());
}

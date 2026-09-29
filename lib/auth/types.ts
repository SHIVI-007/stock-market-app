import type { ThemePreference } from "@/lib/theme/theme";

/** Access level. Administrators can open the /admin dashboard. */
export type Role = "LEARNER" | "ADMIN";

/**
 * Types shared between server and client.
 *
 * This module has no imports beyond types, so it is safe to import from client
 * components without pulling any server-only code into the browser bundle.
 */
export interface SessionUser {
  id: string;
  email: string;
  name: string | null;
  role: Role;
  themePreference: ThemePreference;
  createdAt: string;
}

/** Shared shape returned by the auth server actions. */
export interface AuthState {
  /** Set after a successful profile save. */
  saved?: boolean;
  /** Set when a password reset request has been accepted. */
  sent?: boolean;
  /**
   * The reset link. Only populated in development, where no mail transport is
   * configured — never in production.
   */
  resetUrl?: string;
  error?: string;
  fieldErrors?: Record<string, string>;
}

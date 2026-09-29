"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

import { updateThemePreferenceAction } from "@/lib/auth/actions";
import type { SessionUser } from "@/lib/auth/types";
import type { ThemePreference } from "@/lib/theme/theme";
import {
  applyTheme,
  getStoredPreference,
  setThemePreference,
} from "@/lib/theme/theme-store";

interface SessionContextValue {
  /** The signed-in learner, or null when anonymous. */
  user: SessionUser | null;
  /** False until the first session lookup has completed. */
  ready: boolean;
  /** Applies a theme locally and, when signed in, saves it to the account. */
  changeTheme: (preference: ThemePreference) => void;
}

const SessionContext = React.createContext<SessionContextValue | null>(null);

async function fetchSessionUser(): Promise<SessionUser | null> {
  const response = await fetch("/api/me", { cache: "no-store" });
  if (!response.ok) return null;
  const data = (await response.json()) as { user: SessionUser | null };
  return data.user ?? null;
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [user, setUser] = React.useState<SessionUser | null>(null);
  const [ready, setReady] = React.useState(false);
  const themeSyncedFor = React.useRef<string | null>(null);

  // The pre-paint script in the root layout applies the theme during HTML
  // parsing. React's development-mode Strict Mode remount resets the attributes
  // on <html>, so re-apply before paint. A no-op in production.
  React.useLayoutEffect(() => {
    applyTheme(getStoredPreference());
  }, []);

  // Re-read the session whenever the route changes. Signing in and signing out
  // both change the path (the auth panel lives at /signin, the account at
  // /profile), so the new session is always picked up.
  React.useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        const session = await fetchSessionUser();
        if (!cancelled) setUser(session);
      } catch {
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setReady(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  // Adopt the account's theme preference once per signed-in learner.
  React.useEffect(() => {
    if (!user) {
      themeSyncedFor.current = null;
      return;
    }
    if (themeSyncedFor.current === user.id) return;
    themeSyncedFor.current = user.id;

    const localPreference = getStoredPreference();
    if (user.themePreference === localPreference) return;

    if (user.themePreference === "system") {
      // The account has no explicit choice yet: keep the local one and save it.
      void updateThemePreferenceAction(localPreference).catch(() => undefined);
    } else {
      setThemePreference(user.themePreference);
    }
  }, [user]);

  const changeTheme = React.useCallback((preference: ThemePreference) => {
    setThemePreference(preference);
    setUser((current) =>
      current ? { ...current, themePreference: preference } : current,
    );
    void updateThemePreferenceAction(preference).catch(() => undefined);
  }, []);

  const value = React.useMemo<SessionContextValue>(
    () => ({ user, ready, changeTheme }),
    [user, ready, changeTheme],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionContextValue {
  const context = React.useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a <SessionProvider>");
  }
  return context;
}

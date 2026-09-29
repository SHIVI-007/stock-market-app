import {
  THEME_STORAGE_KEY,
  isThemePreference,
  resolveTheme,
  type ResolvedTheme,
  type ThemePreference,
} from "@/lib/theme/theme";

/**
 * Theme state as an external store so components can read it with
 * `useSyncExternalStore` instead of mirroring the DOM into React state.
 */
export interface ThemeSnapshot {
  preference: ThemePreference;
  resolved: ResolvedTheme;
}

const DARK_MEDIA_QUERY = "(prefers-color-scheme: dark)";

let cachedPreference: ThemePreference | null = null;
let cachedSnapshot: ThemeSnapshot | null = null;

/**
 * A single frozen server snapshot. `useSyncExternalStore` requires the server
 * snapshot to be referentially stable, otherwise React warns about an
 * infinite loop.
 */
const SERVER_SNAPSHOT: ThemeSnapshot = { preference: "system", resolved: "dark" };

const listeners = new Set<() => void>();

function mediaQuery(): MediaQueryList | null {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return null;
  }
  return window.matchMedia(DARK_MEDIA_QUERY);
}

function prefersDark(): boolean {
  return mediaQuery()?.matches ?? true;
}

export function getStoredPreference(): ThemePreference {
  if (cachedPreference) return cachedPreference;

  try {
    const raw = localStorage.getItem(THEME_STORAGE_KEY);
    cachedPreference = isThemePreference(raw) ? raw : "system";
  } catch {
    cachedPreference = "system";
  }

  return cachedPreference;
}

/** Applies the resolved theme to the document root. */
export function applyTheme(preference: ThemePreference): void {
  if (typeof document === "undefined") return;

  const resolved = resolveTheme(preference, prefersDark());
  document.documentElement.classList.toggle("dark", resolved === "dark");
  document.documentElement.dataset.theme = resolved;
}

/** Sets and persists the theme preference. */
export function setThemePreference(preference: ThemePreference): void {
  cachedPreference = preference;
  invalidateSnapshot();

  try {
    localStorage.setItem(THEME_STORAGE_KEY, preference);
  } catch {
    // Storage may be unavailable (private mode); the DOM still updates.
  }

  applyTheme(preference);
  emit();
}

export function subscribeTheme(listener: () => void): () => void {
  listeners.add(listener);

  // While the preference is "system", follow the operating system.
  const query = mediaQuery();
  const onSystemChange = () => {
    if (getStoredPreference() === "system") {
      invalidateSnapshot();
      applyTheme("system");
      emit();
    }
  };

  query?.addEventListener?.("change", onSystemChange);

  return () => {
    listeners.delete(listener);
    query?.removeEventListener?.("change", onSystemChange);
  };
}

/** Stable snapshot required by useSyncExternalStore. */
export function getThemeSnapshot(): ThemeSnapshot {
  if (!cachedSnapshot) {
    const preference = getStoredPreference();
    cachedSnapshot = {
      preference,
      resolved: resolveTheme(preference, prefersDark()),
    };
  }
  return cachedSnapshot;
}

export function getServerThemeSnapshot(): ThemeSnapshot {
  return SERVER_SNAPSHOT;
}

function invalidateSnapshot(): void {
  cachedSnapshot = null;
}

function emit(): void {
  for (const listener of listeners) listener();
}

/** Keeps the cached snapshot in step with a theme applied outside this store. */
export function syncSnapshotFromDocument(): void {
  invalidateSnapshot();
  emit();
}

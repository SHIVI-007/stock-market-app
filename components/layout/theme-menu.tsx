"use client";

import * as React from "react";
import { Check, Monitor, Moon, Sun } from "lucide-react";

import { useSession } from "@/components/auth/session-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  THEME_PREFERENCES,
  themeLabel,
  type ThemePreference,
} from "@/lib/theme/theme";
import {
  getServerThemeSnapshot,
  getThemeSnapshot,
  subscribeTheme,
} from "@/lib/theme/theme-store";

const ICONS: Record<ThemePreference, React.ReactNode> = {
  light: <Sun className="size-4" />,
  dark: <Moon className="size-4" />,
  system: <Monitor className="size-4" />,
};

/** Dark / Light / System theme picker. */
export function ThemeMenu() {
  const { changeTheme, user } = useSession();
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const theme = React.useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  // Close on outside click or Escape.
  React.useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Theme: ${themeLabel(theme.preference)}. Change theme`}
        title={`Theme: ${themeLabel(theme.preference)}`}
      >
        {theme.resolved === "dark" ? (
          <Moon className="size-4" />
        ) : (
          <Sun className="size-4" />
        )}
      </Button>

      {open ? (
        <div
          role="menu"
          aria-label="Theme"
          className="animate-scale-in absolute right-0 z-50 mt-2 w-52 origin-top-right rounded-xl border border-border bg-popover p-1.5 shadow-lg"
        >
          <p className="px-2.5 py-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Appearance
          </p>

          {THEME_PREFERENCES.map((preference) => {
            const isSelected = theme.preference === preference;
            return (
              <button
                key={preference}
                type="button"
                role="menuitemradio"
                aria-checked={isSelected}
                onClick={() => {
                  changeTheme(preference);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors",
                  isSelected
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-muted",
                )}
              >
                {ICONS[preference]}
                <span className="flex-1 text-left">{themeLabel(preference)}</span>
                {isSelected ? <Check className="size-3.5" /> : null}
              </button>
            );
          })}

          <p className="px-2.5 pb-1 pt-2 text-[11px] leading-snug text-muted-foreground">
            {user
              ? "Saved to your account."
              : "Saved in this browser. Sign in to keep it everywhere."}
          </p>
        </div>
      ) : null}
    </div>
  );
}

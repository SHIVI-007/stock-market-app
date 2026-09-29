"use client";

import * as React from "react";
import { useActionState } from "react";
import { Check, Loader2, Monitor, Moon, Save, Sun } from "lucide-react";

import { useSession } from "@/components/auth/session-provider";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { updateProfileAction } from "@/lib/auth/actions";
import type { AuthState, SessionUser } from "@/lib/auth/types";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { THEME_PREFERENCES, themeLabel, type ThemePreference } from "@/lib/theme/theme";
import { getServerThemeSnapshot, getThemeSnapshot, subscribeTheme } from "@/lib/theme/theme-store";

const THEME_ICONS: Record<ThemePreference, React.ReactNode> = {
  light: <Sun className="size-4" />,
  dark: <Moon className="size-4" />,
  system: <Monitor className="size-4" />,
};

export function ProfileSettings({ user }: { user: SessionUser }) {
  const { changeTheme } = useSession();
  const [state, formAction, pending] = useActionState<AuthState, FormData>(
    updateProfileAction,
    {},
  );

  const theme = React.useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  const memberSince = new Date(user.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Account details */}
      <Card className="animate-fade-in-up">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-1.5">
            <Label>Email</Label>
            <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm">
              <span className="truncate">{user.email}</span>
              <Badge variant="success" className="ml-auto shrink-0">
                Verified by sign-in
              </Badge>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            Member since <span className="text-foreground">{memberSince}</span>
          </div>

          <form action={formAction} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="profile-name">Display name</Label>
              <Input
                id="profile-name"
                name="name"
                defaultValue={user.name ?? ""}
                placeholder="How should we greet you?"
                maxLength={80}
              />
              {state.fieldErrors?.name ? (
                <p className="text-xs text-destructive">{state.fieldErrors.name}</p>
              ) : null}
            </div>

            {state.error ? (
              <Alert variant="destructive">
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            ) : null}

            {state.saved && !state.error ? (
              <p className="animate-fade-in text-xs text-success">
                Saved. Your name will show in the header.
              </p>
            ) : null}

            <Button type="submit" variant="secondary" disabled={pending}>
              {pending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
              Save changes
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Appearance + session */}
      <Card className="animate-fade-in-up">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Appearance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <p className="text-sm text-muted-foreground">
            Your choice is saved to your account, so the same theme appears wherever you sign in.
          </p>

          <div className="grid gap-2">
            {THEME_PREFERENCES.map((preference) => {
              const isSelected = theme.preference === preference;
              return (
                <button
                  key={preference}
                  type="button"
                  onClick={() => changeTheme(preference)}
                  aria-pressed={isSelected}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isSelected
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:bg-muted",
                  )}
                >
                  {THEME_ICONS[preference]}
                  <span className="font-medium">{themeLabel(preference)}</span>
                  {preference === "system" ? (
                    <span className="text-xs text-muted-foreground">matches your device</span>
                  ) : null}
                  {isSelected ? <Check className="ml-auto size-4" /> : null}
                </button>
              );
            })}
          </div>

          <div className="border-t border-border pt-5">
            <SignOutButton />
            <p className="mt-2 text-xs text-muted-foreground">
              Signing out keeps your progress in this browser.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

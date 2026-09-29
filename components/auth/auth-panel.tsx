"use client";

import * as React from "react";
import { useActionState } from "react";
import Link from "next/link";
import { CloudUpload, Loader2, Lock, Mail, UserRound } from "lucide-react";

import { signInAction, signUpAction } from "@/lib/auth/actions";
import type { AuthState } from "@/lib/auth/types";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const INITIAL_STATE: AuthState = {};
const MIN_PASSWORD_LENGTH = 8;

type Mode = "sign-in" | "sign-up";

export function AuthPanel() {
  const [mode, setMode] = React.useState<Mode>("sign-in");

  const [signInState, signInFormAction, signInPending] = useActionState(
    signInAction,
    INITIAL_STATE,
  );
  const [signUpState, signUpFormAction, signUpPending] = useActionState(
    signUpAction,
    INITIAL_STATE,
  );

  const isSignIn = mode === "sign-in";
  const state = isSignIn ? signInState : signUpState;
  const formAction = isSignIn ? signInFormAction : signUpFormAction;
  const pending = isSignIn ? signInPending : signUpPending;

  return (
    <Card className="animate-fade-in-up mx-auto w-full max-w-md overflow-hidden">
      <CardHeader className="border-b border-border bg-muted/40">
        <CardTitle className="text-lg">
          {isSignIn ? "Sign in" : "Create your account"}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Your lessons, quiz scores, streak and theme follow your email — on any device.
        </p>
      </CardHeader>

      <CardContent className="space-y-5 pt-6">
        {/* Mode switch */}
        <div
          role="tablist"
          aria-label="Authentication mode"
          className="flex gap-1 rounded-xl border border-border bg-muted/50 p-1"
        >
          {(["sign-in", "sign-up"] as Mode[]).map((option) => (
            <button
              key={option}
              type="button"
              role="tab"
              aria-selected={mode === option}
              onClick={() => setMode(option)}
              className={cn(
                "flex-1 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                mode === option
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {option === "sign-in" ? "Sign in" : "Sign up"}
            </button>
          ))}
        </div>

        {/* `key` resets the fields when switching modes. */}
        <form key={mode} action={formAction} className="space-y-4">
          {!isSignIn ? (
            <div className="space-y-1.5">
              <Label htmlFor="name">Name (optional)</Label>
              <div className="relative">
                <UserRound className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="name"
                  name="name"
                  autoComplete="name"
                  placeholder="Ananya"
                  className="pl-9"
                  maxLength={80}
                />
              </div>
              {state.fieldErrors?.name ? (
                <p className="text-xs text-destructive">{state.fieldErrors.name}</p>
              ) : null}
            </div>
          ) : null}

          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
                className="pl-9"
              />
            </div>
            {state.fieldErrors?.email ? (
              <p className="text-xs text-destructive">{state.fieldErrors.email}</p>
            ) : null}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete={isSignIn ? "current-password" : "new-password"}
                placeholder={isSignIn ? "Your password" : `At least ${MIN_PASSWORD_LENGTH} characters`}
                required
                minLength={isSignIn ? undefined : MIN_PASSWORD_LENGTH}
                className="pl-9"
              />
            </div>
            {state.fieldErrors?.password ? (
              <p className="text-xs text-destructive">{state.fieldErrors.password}</p>
            ) : null}
          </div>

          {state.error ? (
            <Alert variant="destructive" className="animate-shake">
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          ) : null}

          <Button type="submit" disabled={pending} className="w-full">
            {pending ? <Loader2 className="size-4 animate-spin" /> : null}
            {pending
              ? isSignIn
                ? "Signing in…"
                : "Creating account…"
              : isSignIn
                ? "Sign in"
                : "Create account"}
          </Button>

          {isSignIn ? (
            <p className="text-center text-sm">
              <Link
                href="/forgot-password"
                className="text-primary underline-offset-4 hover:underline"
              >
                Forgot your password?
              </Link>
            </p>
          ) : null}
        </form>

        <div className="flex items-start gap-2 rounded-lg border border-border bg-muted/30 p-3 text-xs text-muted-foreground">
          <CloudUpload className="mt-0.5 size-3.5 shrink-0" />
          <p>
            You do not need an account to learn — everything works in your browser. An account simply
            lets your progress and theme follow you between devices.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import * as React from "react";
import { useActionState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, Mail, Send } from "lucide-react";

import { requestPasswordResetAction } from "@/lib/auth/actions";
import type { AuthState } from "@/lib/auth/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(
    requestPasswordResetAction,
    {},
  );

  if (state.sent) {
    return (
      <div className="animate-fade-in-up space-y-4">
        <Alert variant="success">
          <CheckCircle2 className="size-4" />
          <div>
            <AlertTitle>Check your email</AlertTitle>
            <AlertDescription>
              If an account exists for that address, a reset link is on its way. The link is valid
              for 30 minutes and can be used once.
            </AlertDescription>
          </div>
        </Alert>

        {state.resetUrl ? (
          <div className="space-y-3 rounded-xl border border-warning/40 bg-warning/10 p-4">
            <div>
              <p className="text-sm font-semibold">Development mode</p>
              <p className="mt-1 text-xs text-muted-foreground">
                No mail transport is configured, so the link is shown here instead. This never
                happens in production.
              </p>
            </div>

            <Link
              href={state.resetUrl}
              className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "w-full")}
            >
              Open the reset link
            </Link>

            <code className="block break-all rounded-lg bg-background/60 p-2 text-[11px] leading-relaxed text-muted-foreground">
              {state.resetUrl}
            </code>
          </div>
        ) : null}

        <Link
          href="/signin"
          className={cn(buttonVariants({ variant: "ghost" }), "w-full")}
        >
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="reset-email">Email</Label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="reset-email"
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

      {state.error ? (
        <Alert variant="destructive" className="animate-shake">
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      ) : null}

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
        {pending ? "Sending…" : "Send reset link"}
      </Button>

      <Link
        href="/signin"
        className={cn(buttonVariants({ variant: "ghost" }), "w-full")}
      >
        Back to sign in
      </Link>
    </form>
  );
}

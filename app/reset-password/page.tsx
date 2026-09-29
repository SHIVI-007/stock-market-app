import type { Metadata } from "next";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";

import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Choose a new password",
  description: "Set a new password for your MarketLearn account.",
};

export const dynamic = "force-dynamic";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string | string[] }>;
}) {
  const params = await searchParams;
  const token = typeof params.token === "string" ? params.token : "";

  if (!token) {
    return (
      <div className="mx-auto max-w-md">
        <Card className="animate-fade-in-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <ShieldAlert className="size-5 text-warning" />
              That link is missing its token
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Reset links can only be used once, and they expire after 30 minutes. Request a fresh
              one and try again.
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link
              href="/forgot-password"
              className={cn(buttonVariants(), "w-full")}
            >
              Request a new link
            </Link>
            <Link
              href="/signin"
              className={cn(buttonVariants({ variant: "ghost" }), "w-full")}
            >
              Back to sign in
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md space-y-6">
      <Card className="animate-fade-in-up overflow-hidden">
        <CardHeader className="border-b border-border bg-muted/40">
          <CardTitle className="text-lg">Choose a new password</CardTitle>
          <p className="text-sm text-muted-foreground">
            You will be signed in straight after, so you can carry on where you left off.
          </p>
        </CardHeader>
        <CardContent className="pt-6">
          <ResetPasswordForm token={token} />
        </CardContent>
      </Card>

      <p className="text-center text-xs text-muted-foreground">
        Setting a new password does not delete your progress or achievements.
      </p>
    </div>
  );
}

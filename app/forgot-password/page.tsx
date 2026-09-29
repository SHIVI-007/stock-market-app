import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { KeyRound } from "lucide-react";

import { getCurrentUser } from "@/lib/auth/user";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Reset your password",
  description: "Request a password reset link for your MarketLearn account.",
};

export const dynamic = "force-dynamic";

export default async function ForgotPasswordPage() {
  const user = await getCurrentUser();
  if (user) redirect("/profile");

  return (
    <div className="mx-auto max-w-md space-y-6">
      <Card className="animate-fade-in-up overflow-hidden">
        <CardHeader className="border-b border-border bg-muted/40">
          <CardTitle className="flex items-center gap-2 text-lg">
            <KeyRound className="size-5 text-primary" />
            Reset your password
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Enter the email you signed up with and we will send a single-use reset link.
          </p>
        </CardHeader>
        <CardContent className="pt-6">
          <ForgotPasswordForm />
        </CardContent>
      </Card>

      <p className="text-center text-xs text-muted-foreground">
        For your safety, the page gives the same response whether or not an account exists for the
        address you enter.
      </p>
    </div>
  );
}

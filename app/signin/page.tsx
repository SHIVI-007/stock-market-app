import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CloudUpload } from "lucide-react";

import { getCurrentUser } from "@/lib/auth/user";
import { AuthPanel } from "@/components/auth/auth-panel";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Sign in",
  description:
    "Sign in with your email to keep your lessons, quiz scores, streak and theme in sync across devices.",
};

// Reads the session cookie, so it is always rendered per request.
export const dynamic = "force-dynamic";

export default async function SignInPage() {
  const user = await getCurrentUser();
  if (user) redirect("/profile");

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <header className="animate-fade-in-up space-y-3 text-center">
        <Badge variant="secondary" className="mx-auto">
          <CloudUpload className="size-3" />
          Optional
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Track your progress with your email
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          The course works completely without an account. Sign in and your completed lessons, quiz
          scores, learning streak and theme preference are saved to your email — so they are there
          when you come back on another device.
        </p>
      </header>

      <AuthPanel />

      <section className="animate-fade-in-up stagger-3 mx-auto max-w-2xl space-y-3 rounded-xl border border-border bg-muted/30 p-5 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">What an account stores</p>
        <ul className="space-y-1.5">
          <li>Your email address and a securely hashed password.</li>
          <li>Which lessons you completed, and your best quiz score for each.</li>
          <li>Your XP, learning streak and theme choice.</li>
        </ul>
        <p className="pt-1">
          Nothing else. No newsletter, no selling of data, and no investment advice — ever.
        </p>
      </section>
    </div>
  );
}

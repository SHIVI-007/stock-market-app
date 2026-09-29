import Link from "next/link";
import { ShieldAlert } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * Shown to a signed-in learner who opens /admin.
 *
 * Someone who is not signed in at all is redirected to /signin instead, so the
 * only case that reaches this component is an account without the admin role.
 */
export function NotAnAdministrator({ email }: { email: string }) {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Card className="animate-fade-in-up">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <ShieldAlert className="size-5 text-warning" />
            Not an administrator account
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            You are signed in as <span className="text-foreground">{email}</span>, which does not
            have access to the dashboard.
          </p>
        </CardHeader>

        <CardContent className="space-y-5 text-sm text-muted-foreground">
          <div className="space-y-2">
            <p className="font-medium text-foreground">How to get access</p>
            <ol className="list-decimal space-y-1.5 pl-5">
              <li>
                Add this address to{" "}
                <code className="rounded bg-muted px-1 font-mono text-xs">ADMIN_EMAILS</code> in your{" "}
                <code className="rounded bg-muted px-1 font-mono text-xs">.env</code> file
                (comma-separated for several addresses).
              </li>
              <li>Sign out and sign back in — the role is applied at sign-in.</li>
            </ol>
            <p>
              Alternatively, an existing administrator can promote you from the Users table on the
              dashboard.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/profile"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              Back to your profile
            </Link>
            <Link href="/" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
              Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { LogOut } from "lucide-react";

import { signOutAction } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";

/**
 * Signs the learner out. The server action clears the cookie and redirects,
 * which changes the path and makes the client session provider re-read it.
 */
export function SignOutButton() {
  return (
    <form action={signOutAction}>
      <Button type="submit" variant="outline" className="w-full">
        <LogOut className="size-4" />
        Sign out
      </Button>
    </form>
  );
}

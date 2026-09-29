"use client";

import Link from "next/link";
import { LogIn, UserRound } from "lucide-react";

import { useSession } from "@/components/auth/session-provider";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Shows either a sign-in link or the learner's profile shortcut. */
export function UserMenu() {
  const { user, ready } = useSession();

  if (!ready) {
    return <span className="h-10 w-10 animate-pulse rounded-full bg-muted" aria-hidden />;
  }

  if (!user) {
    return (
      <Link
        href="/signin"
        className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1.5")}
      >
        <LogIn className="size-3.5" />
        Sign in
      </Link>
    );
  }

  const label = user.name?.trim() || user.email;
  const initial = (user.name?.trim()?.[0] ?? user.email[0] ?? "?").toUpperCase();

  return (
    <Link
      href="/profile"
      title={label}
      aria-label={`Profile for ${user.email}`}
      className="group flex items-center gap-2 rounded-full border border-border py-1 pl-1 pr-3 transition-colors hover:bg-muted"
    >
      <span className="flex size-7 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary transition-transform group-hover:scale-105">
        {initial}
      </span>
      <span className="hidden max-w-[10rem] truncate text-sm sm:block">{label}</span>
      <UserRound className="hidden size-3.5 text-muted-foreground sm:block" />
    </Link>
  );
}

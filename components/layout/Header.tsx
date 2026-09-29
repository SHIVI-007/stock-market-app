"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Calculator, GraduationCap, LayoutDashboard, ListChecks, Menu, ShieldCheck, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSession } from "@/components/auth/session-provider";
import { ThemeMenu } from "@/components/layout/theme-menu";
import { UserMenu } from "@/components/auth/user-menu";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: GraduationCap },
  { href: "/learn", label: "Learn", icon: BookOpen },
  { href: "/practice", label: "Practice", icon: Calculator },
  { href: "/glossary", label: "Glossary", icon: ListChecks },
  { href: "/progress", label: "Progress", icon: LayoutDashboard },
];

const ADMIN_ITEM = { href: "/admin", label: "Admin", icon: ShieldCheck };

export default function Header() {
  const pathname = usePathname();
  const { user } = useSession();
  const [open, setOpen] = React.useState(false);

  // Administrators get an extra destination in the navigation.
  const navItems = React.useMemo(
    () => (user?.role === "ADMIN" ? [...NAV_ITEMS, ADMIN_ITEM] : NAV_ITEMS),
    [user],
  );

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="MarketLearn home">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <BookOpen className="size-4" />
          </span>
          <span className="text-lg font-bold tracking-tight">
            Market<span className="text-primary">Learn</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeMenu />
          <UserMenu />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label="Toggle navigation menu"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-border px-4 pb-4 pt-2 md:hidden">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium",
                  isActive(item.href)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      ) : null}
    </header>
  );
}

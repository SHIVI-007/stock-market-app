import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";

import { getCurrentUser } from "@/lib/auth/user";
import { ProfileSettings } from "@/components/auth/profile-settings";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  AchievementGrid,
  ChapterProgressList,
  CourseStatsGrid,
  NoProgressHint,
  OverallProgressCard,
} from "@/components/progress/progress-ui";

export const metadata: Metadata = {
  title: "Your profile",
  description:
    "Your lessons, quiz scores, streak, achievements and theme — saved to your email account.",
};

// Reads the session cookie, so it is always rendered per request.
export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  // The auth panel lives on its own route, so signing in always changes the
  // path and the client session provider re-reads the session.
  if (!user) redirect("/signin");

  return (
    <div className="space-y-10">
      <header className="animate-fade-in-up space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="success">
            <Sparkles className="size-3" />
            Signed in
          </Badge>
          <span className="text-sm text-muted-foreground">{user.email}</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {user.name?.trim() ? `Welcome back, ${user.name.trim()}` : "Your profile"}
        </h1>
        <p className="max-w-3xl text-muted-foreground">
          Your progress is saved to this account, so it follows you between devices.
        </p>
      </header>

      <ProfileSettings user={user} />

      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight">Your progress</h2>
        <CourseStatsGrid />
        <NoProgressHint />
        <OverallProgressCard />
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold tracking-tight">Chapters</h2>
          <Link href="/learn" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
            Continue learning
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <ChapterProgressList />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight">Achievements</h2>
        <p className="text-sm text-muted-foreground">
          Learning milestones — never investment ratings of any kind.
        </p>
        <AchievementGrid />
      </section>
    </div>
  );
}

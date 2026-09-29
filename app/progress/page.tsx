import type { Metadata } from "next";
import Link from "next/link";
import { Award, BookOpen, Flame, Sparkles, Target } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { totalLessons } from "@/lib/learning/curriculum";
import {
  AchievementGrid,
  ChapterProgressList,
  CourseStatsGrid,
  NoProgressHint,
  OverallProgressCard,
  ResetProgressButton,
  StatCard,
} from "@/components/progress/progress-ui";

export const metadata: Metadata = {
  title: "Progress",
  description: "Track your lessons completed, quiz average, learning streak and achievements.",
};

export default function ProgressPage() {
  return (
    <div className="space-y-10">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-3">
          <h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight sm:text-4xl">
            <Award className="size-7 text-primary" />
            Your progress
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            {totalLessons} lessons across the whole course. Progress is saved in this browser — no
            account required.
          </p>
        </div>
        <ResetProgressButton />
      </header>

      <CourseStatsGrid />
      <NoProgressHint />
      <OverallProgressCard />

      <section className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="How XP works"
          value="+50"
          hint="Per lesson completed"
          icon={<Sparkles className="size-4" />}
        />
        <StatCard
          label="Quiz XP"
          value="+20"
          hint="Per correct answer"
          icon={<Target className="size-4" />}
        />
        <StatCard
          label="Streak"
          value="+1"
          hint="Per day you return"
          icon={<Flame className="size-4" />}
        />
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight">
            <BookOpen className="size-5 text-primary" />
            Chapters
          </h2>
          <Link href="/learn" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
            Open curriculum
          </Link>
        </div>
        <ChapterProgressList />
      </section>

      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <Award className="size-5 text-primary" />
          Achievements
        </h2>
        <p className="text-sm text-muted-foreground">
          These are learning milestones — not investment ratings of any kind.
        </p>
        <AchievementGrid />
      </section>
    </div>
  );
}

"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Circle,
  Flame,
  RotateCcw,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn, formatIndianNumber } from "@/lib/utils";
import { useProgress } from "@/lib/progress/progress-provider";
import { achievements, evaluateAchievements } from "@/lib/learning/achievements";
import {
  chapterHref,
  chapters,
  getRecommendedLesson,
  lessonHref,
  totalLessons,
} from "@/lib/learning/curriculum";

/* -------------------------------------------------------------------------- */
/* Small stat tiles                                                           */
/* -------------------------------------------------------------------------- */

export function StatCard({
  label,
  value,
  hint,
  icon,
}: {
  label: string;
  value: string;
  hint?: string;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent className="flex items-start gap-3 p-4">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </span>
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {label}
          </p>
          <p className="truncate text-xl font-semibold tabular-nums">{value}</p>
          {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
        </div>
      </CardContent>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/* Stats derived from progress                                                */
/* -------------------------------------------------------------------------- */

export function CourseStatsGrid() {
  const { completedCount, xp, quizAverage, streak, ready } = useProgress();

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="Lessons completed"
        value={`${completedCount} / ${totalLessons}`}
        icon={<BookOpen className="size-4" />}
      />
      <StatCard
        label="Quiz average"
        value={ready && quizAverage !== null ? `${formatIndianNumber(quizAverage, 0)}%` : "—"}
        hint={ready && quizAverage === null ? "Take a quiz to start" : undefined}
        icon={<Target className="size-4" />}
      />
      <StatCard
        label="XP earned"
        value={ready ? formatIndianNumber(xp) : "—"}
        icon={<Sparkles className="size-4" />}
      />
      <StatCard
        label="Learning streak"
        value={ready ? `${streak} ${streak === 1 ? "day" : "days"}` : "—"}
        icon={<Flame className="size-4" />}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Continue learning                                                          */
/* -------------------------------------------------------------------------- */

export function ContinueLearningCard() {
  const { lessons, ready } = useProgress();

  const completedSlugs = React.useMemo(
    () =>
      Object.values(lessons)
        .filter((record) => record.completed)
        .map((record) => record.lessonSlug),
    [lessons],
  );

  const recommended = React.useMemo(
    () => getRecommendedLesson(completedSlugs),
    [completedSlugs],
  );

  if (!recommended) return null;

  const { chapter, lesson } = recommended;
  const isFirst = completedSlugs.length === 0;

  return (
    <Card className="border-primary/40">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-base">
            {isFirst ? "Start here" : "Continue learning"}
          </CardTitle>
          <Badge variant="secondary">Chapter {chapter.chapterOrder}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">{chapter.title}</p>
          <p className="mt-0.5 text-lg font-semibold">{lesson.title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{lesson.summary}</p>
        </div>
        <Link
          href={lessonHref(chapter.slug, lesson.slug)}
          className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
        >
          {isFirst ? "Start learning" : "Continue lesson"}
          <ArrowRight className="size-4" />
        </Link>
        {!ready ? (
          <p className="text-xs text-muted-foreground">Loading your progress…</p>
        ) : null}
      </CardContent>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/* Overall course progress                                                    */
/* -------------------------------------------------------------------------- */

export function OverallProgressCard() {
  const { completedCount, ready } = useProgress();
  const percent = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Overall progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {ready ? `${completedCount} of ${totalLessons} lessons` : "—"}
          </span>
          <span className="font-semibold tabular-nums">
            {ready ? `${formatIndianNumber(percent, 0)}%` : "—"}
          </span>
        </div>
        <Progress value={ready ? percent : 0} className="h-3" />
      </CardContent>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/* Chapter-by-chapter progress                                                */
/* -------------------------------------------------------------------------- */

export function ChapterProgressList() {
  const { lessons, ready } = useProgress();

  return (
    <ol className="space-y-2">
      {chapters.map((chapter) => {
        const total = chapter.lessons.length;
        const done = chapter.lessons.filter((lesson) => lessons[lesson.slug]?.completed).length;
        const percent = total > 0 ? (done / total) * 100 : 0;
        const complete = done === total && total > 0;

        return (
          <li key={chapter.slug}>
            <Link
              href={chapterHref(chapter.slug)}
              className="lift flex items-center gap-4 rounded-xl border border-border bg-card p-4 hover:border-primary/40"
            >
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
                  complete
                    ? "border-success bg-success/15 text-success"
                    : "border-border text-muted-foreground",
                )}
              >
                {complete ? <CheckCircle2 className="size-4" /> : chapter.chapterOrder}
              </span>

              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-3">
                  <span className="truncate text-sm font-medium">{chapter.title}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {ready ? `${done}/${total}` : "—"}
                  </span>
                </span>
                <Progress
                  value={ready ? percent : 0}
                  className="mt-2 h-1.5"
                  indicatorClassName={complete ? "bg-success" : undefined}
                />
              </span>

              <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
            </Link>
          </li>
        );
      })}
    </ol>
  );
}

/* -------------------------------------------------------------------------- */
/* Achievements                                                               */
/* -------------------------------------------------------------------------- */

export function AchievementGrid() {
  const { lessons, quizAverage, streak, ready } = useProgress();

  const earned = React.useMemo(
    () =>
      new Set(
        evaluateAchievements({
          completedLessonSlugs: Object.values(lessons)
            .filter((record) => record.completed)
            .map((record) => record.lessonSlug),
          quizAverage,
          streak,
        }),
      ),
    [lessons, quizAverage, streak],
  );

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {achievements.map((achievement) => {
        const isEarned = ready && earned.has(achievement.slug);
        return (
          <Card
            key={achievement.slug}
            className={cn(
              "transition-colors",
              isEarned ? "border-success/40 bg-success/5" : "opacity-80",
            )}
          >
            <CardContent className="flex items-start gap-3 p-4">
              <span
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-full text-xl",
                  isEarned ? "bg-success/15" : "bg-muted grayscale",
                )}
                aria-hidden
              >
                {achievement.icon}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-semibold">{achievement.name}</p>
                  {isEarned ? <CheckCircle2 className="size-3.5 shrink-0 text-success" /> : null}
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{achievement.description}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  <span className="font-medium">To earn:</span> {achievement.requirement}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Quick practice + reset                                                     */
/* -------------------------------------------------------------------------- */

const QUICK_PRACTICE = [
  { label: "Calculate Market Cap", href: "/practice/calculators#market-cap" },
  { label: "Calculate P/E", href: "/practice/calculators#pe-ratio" },
  { label: "Calculate ROE", href: "/practice/calculators#roe" },
];

export function QuickPracticeRow() {
  return (
    <div className="flex flex-wrap gap-3">
      {QUICK_PRACTICE.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(buttonVariants({ variant: "secondary" }))}
        >
          <TrendingUp className="size-4" />
          {item.label}
        </Link>
      ))}
    </div>
  );
}

export function ResetProgressButton() {
  const { resetProgress } = useProgress();
  const [confirming, setConfirming] = React.useState(false);

  if (!confirming) {
    return (
      <Button variant="outline" size="sm" onClick={() => setConfirming(true)}>
        <RotateCcw className="size-3.5" /> Reset progress
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground">Erase all local progress?</span>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => {
          resetProgress();
          setConfirming(false);
        }}
      >
        Yes, reset
      </Button>
      <Button variant="ghost" size="sm" onClick={() => setConfirming(false)}>
        Cancel
      </Button>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Empty-state hint                                                           */
/* -------------------------------------------------------------------------- */

export function NoProgressHint() {
  const { ready, completedCount } = useProgress();
  if (!ready || completedCount > 0) return null;

  return (
    <Card className="border-dashed">
      <CardContent className="flex items-center gap-3 p-4 text-sm text-muted-foreground">
        <Circle className="size-4 shrink-0" />
        <span>
          You have not completed a lesson yet. Progress is saved in this browser — start with the
          first lesson and it will show up here.
        </span>
      </CardContent>
    </Card>
  );
}

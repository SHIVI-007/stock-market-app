import Link from "next/link";
import { ArrowRight, BookOpen, Compass, GraduationCap, ListChecks, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { chapters, totalChapters, totalLessons, totalMinutes } from "@/lib/learning/curriculum";
import {
  ContinueLearningCard,
  CourseStatsGrid,
  OverallProgressCard,
  QuickPracticeRow,
} from "@/components/progress/progress-ui";

const HERO_GRADIENT =
  "linear-gradient(115deg, color-mix(in oklab, var(--primary) 24%, transparent), transparent 38%, color-mix(in oklab, var(--chart-2) 20%, transparent) 68%, transparent)";

export default function HomePage() {
  const firstChapters = chapters.slice(0, 6);

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="animate-fade-in relative overflow-hidden rounded-2xl border border-border p-8 text-center sm:p-12">
        {/* Slowly drifting gradient wash — purely decorative. */}
        <div
          aria-hidden
          className="animate-gradient-pan pointer-events-none absolute inset-0"
          style={{ backgroundImage: HERO_GRADIENT }}
        />

        <div className="relative">
          <Badge variant="secondary" className="animate-fade-in-up mx-auto stagger-1">
            <Sparkles className="size-3" />
            Free interactive course
          </Badge>

          <h1 className="animate-fade-in-up stagger-2 mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Learn the Stock Market <span className="text-primary">From Zero</span>
          </h1>

          <p className="animate-fade-in-up stagger-3 mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            An interactive journey from understanding your first share to learning how to analyse a
            company&apos;s fundamentals — with calculators, simulators and quizzes at every step.
          </p>

          <div className="animate-fade-in-up stagger-4 mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/learn"
              className={cn(
                buttonVariants({ size: "lg" }),
                "transition-transform hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.99]",
              )}
            >
              Start Learning
              <ArrowRight className="size-5" />
            </Link>
            <Link
              href="/#curriculum"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "transition-transform hover:-translate-y-0.5",
              )}
            >
              Explore Curriculum
            </Link>
          </div>

          <div className="animate-fade-in-up stagger-5 mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <BookOpen className="size-4" /> {totalLessons} lessons
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Compass className="size-4" /> {totalChapters} chapters
            </span>
            <span className="inline-flex items-center gap-1.5">
              <GraduationCap className="size-4" /> ~{Math.round(totalMinutes / 60)} hours
            </span>
          </div>
        </div>
      </section>

      {/* Dashboard */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Your dashboard</h2>
        <CourseStatsGrid />
        <div className="grid gap-6 lg:grid-cols-2">
          <ContinueLearningCard />
          <OverallProgressCard />
        </div>
      </section>

      {/* Curriculum preview */}
      <section id="curriculum" className="reveal-on-scroll scroll-mt-20 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight">Explore the curriculum</h2>
          <Link href="/learn" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
            View all {totalChapters} chapters
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {firstChapters.map((chapter) => (
            <Card key={chapter.slug} className="lift flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Chapter {chapter.chapterOrder}
                  </span>
                  <Badge variant="outline">{chapter.lessons.length} lessons</Badge>
                </div>
                <CardTitle className="text-base">{chapter.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between gap-4">
                <p className="text-sm text-muted-foreground">{chapter.description}</p>
                <Link
                  href={`/learn/${chapter.slug}`}
                  className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "self-start")}
                >
                  Open chapter
                  <ArrowRight className="size-3.5" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Quick practice */}
      <section className="reveal-on-scroll space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Quick practice</h2>
        <p className="text-sm text-muted-foreground">
          Interactive calculators and simulators you can use right away.
        </p>
        <QuickPracticeRow />
      </section>

      {/* Approach */}
      <section className="reveal-on-scroll rounded-2xl border border-border bg-muted/30 p-6">
        <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <ListChecks className="size-5 text-primary" />
          How this course works
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-sm font-semibold">Understand, don&apos;t memorise</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Every important idea comes with something you can move, change and observe — not just
              a paragraph to read.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold">Built for the Indian market</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Rupees, crore, NSE, BSE, SEBI, NSDL, CDSL and Indian financial years throughout.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold">No advice, ever</p>
            <p className="mt-1 text-sm text-muted-foreground">
              You will learn how to think about fundamentals — never what to buy or sell.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

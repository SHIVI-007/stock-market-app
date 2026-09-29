import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Compass } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { chapters, totalChapters, totalLessons } from "@/lib/learning/curriculum";
import {
  ChapterProgressList,
  CourseStatsGrid,
  OverallProgressCard,
} from "@/components/progress/progress-ui";

export const metadata: Metadata = {
  title: "Curriculum",
  description:
    "The complete Stock Market Fundamentals curriculum — 35 chapters from what money is to forming an independent fundamental view.",
};

/** Themed groupings so learners can see the arc of the course. */
const LEARNING_PATH = [
  { label: "Beginner", from: 1, to: 3, note: "Money, companies and shares" },
  { label: "Market Basics", from: 4, to: 9, note: "Exchanges, regulation, accounts, order types" },
  { label: "Company Basics", from: 10, to: 12, note: "Orders, terminology and market capitalisation" },
  { label: "Financial Statements", from: 13, to: 17, note: "Income statement, balance sheet, cash flow" },
  { label: "Ratios", from: 18, to: 25, note: "EPS, P/E, P/B, ROE, ROCE, debt, margins, growth" },
  { label: "Valuation & Returns", from: 26, to: 31, note: "Dividends, corporate actions, EV, working capital" },
  { label: "Advanced Fundamentals", from: 32, to: 35, note: "Business models, process, red flags, case study" },
];

export default function LearnPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <Badge variant="secondary">
          <Compass className="size-3" />
          {totalChapters} chapters · {totalLessons} lessons
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Curriculum</h1>
        <p className="max-w-3xl text-muted-foreground">
          The course builds progressively: each chapter assumes only what came before it. Work
          through it in order, or jump to a topic you want to understand.
        </p>
      </header>

      <CourseStatsGrid />
      <OverallProgressCard />

      {/* Learning path overview */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight">Learning path</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {LEARNING_PATH.map((stage) => (
            <div key={stage.label} className="rounded-xl border border-border bg-card p-4">
              <p className="text-sm font-semibold">{stage.label}</p>
              <p className="mt-1 text-xs text-muted-foreground">{stage.note}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                Chapters {stage.from}–{stage.to}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Chapter list with progress */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight">All chapters</h2>
        <ChapterProgressList />
      </section>

      {/* Chapter cards (static detail) */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight">Chapter details</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {chapters.map((chapter) => (
            <Card key={chapter.slug} className="flex flex-col">
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
    </div>
  );
}

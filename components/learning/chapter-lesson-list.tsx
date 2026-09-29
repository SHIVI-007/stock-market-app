"use client";

import * as React from "react";
import Link from "next/link";
import { CheckCircle2, Circle, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useProgress } from "@/lib/progress/progress-provider";
import type { Chapter } from "@/lib/learning/types";
import { lessonHref } from "@/lib/learning/curriculum";

const DIFFICULTY_VARIANT = {
  BEGINNER: "success",
  INTERMEDIATE: "warning",
  ADVANCED: "destructive",
} as const;

/** The list of lessons in a chapter, with per-lesson completion state. */
export function ChapterLessonList({ chapter }: { chapter: Chapter }) {
  const { lessons, ready, isComplete } = useProgress();

  return (
    <ol className="space-y-2">
      {chapter.lessons.map((lesson, index) => {
        const complete = ready && isComplete(lesson.slug);
        const record = lessons[lesson.slug];
        const score = record?.bestScore ?? 0;

        return (
          <li key={lesson.slug}>
            <Link
              href={lessonHref(chapter.slug, lesson.slug)}
              className="lift flex items-start gap-4 rounded-xl border border-border bg-card p-4 hover:border-primary/40"
            >
              <span
                className={cn(
                  "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
                  complete
                    ? "border-success bg-success/15 text-success"
                    : "border-border text-muted-foreground",
                )}
              >
                {complete ? <CheckCircle2 className="size-4" /> : index + 1}
              </span>

              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold">{lesson.title}</span>
                  <Badge variant={DIFFICULTY_VARIANT[lesson.difficulty]}>
                    {lesson.difficulty.charAt(0) + lesson.difficulty.slice(1).toLowerCase()}
                  </Badge>
                  {score > 0 ? (
                    <Badge variant="secondary">Best quiz {Math.round(score)}%</Badge>
                  ) : null}
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">{lesson.summary}</span>
                <span className="mt-1.5 inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="size-3" />~{lesson.estimatedMinutes} min
                </span>
              </span>

              {!ready ? <Circle className="mt-1 size-4 shrink-0 opacity-40" /> : null}
            </Link>
          </li>
        );
      })}
    </ol>
  );
}

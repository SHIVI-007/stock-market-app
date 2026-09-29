"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Trophy } from "lucide-react";

import { Celebrate } from "@/components/motion/celebrate";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useProgress } from "@/lib/progress/progress-provider";

export interface LessonCompleteProps {
  chapterSlug: string;
  lessonSlug: string;
  keyTakeaways: string[];
  nextHref?: string;
  nextLabel?: string;
}

/** Marks a lesson complete and shows a short summary of what was learned. */
export function LessonComplete({
  chapterSlug,
  lessonSlug,
  keyTakeaways,
  nextHref,
  nextLabel = "Continue",
}: LessonCompleteProps) {
  const { isComplete, markLessonComplete } = useProgress();
  const [justCompleted, setJustCompleted] = React.useState(false);
  const complete = isComplete(lessonSlug);

  const handleComplete = () => {
    markLessonComplete({ lessonSlug, chapterSlug });
    setJustCompleted(true);
  };

  if (!complete && !justCompleted) {
    return (
      <Button size="lg" onClick={handleComplete} className="w-full sm:w-auto">
        <CheckCircle2 className="size-5" />
        Complete lesson
      </Button>
    );
  }

  return (
    <div className="animate-fade-in-up relative space-y-4 overflow-visible rounded-xl border border-success/40 bg-success/10 p-6">
      <Celebrate />
      <div className="flex items-center gap-2">
        <span className="animate-pop flex size-8 items-center justify-center rounded-full bg-success/15">
          <Trophy className="size-4 text-success" />
        </span>
        <h3 className="text-lg font-semibold">Lesson complete</h3>
      </div>

      <div>
        <p className="text-sm font-medium">You learned:</p>
        <ul className="mt-2 space-y-1.5">
          {keyTakeaways.map((takeaway) => (
            <li key={takeaway} className="flex items-start gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
              <span>{takeaway}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        {nextHref ? (
          <Link href={nextHref} className={cn(buttonVariants({ size: "lg" }))}>
            {nextLabel}
            <ArrowRight className="size-4" />
          </Link>
        ) : null}
      </div>
    </div>
  );
}

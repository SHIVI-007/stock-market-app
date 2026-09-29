import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight, Clock, ListChecks } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LessonBlocks } from "@/components/learning/lesson-blocks";
import { LessonComplete } from "@/components/learning/lesson-complete";
import { LessonRating } from "@/components/learning/lesson-rating";
import { Quiz } from "@/components/quizzes/quiz";
import {
  flatLessons,
  getChapter,
  getLessonNeighbours,
  lessonHref,
} from "@/lib/learning/curriculum";

export function generateStaticParams() {
  return flatLessons.map((entry) => ({
    chapter: entry.chapter.slug,
    lesson: entry.lesson.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ chapter: string; lesson: string }>;
}): Promise<Metadata> {
  const { chapter, lesson } = await params;
  const found = getChapter(chapter)?.lessons.find((entry) => entry.slug === lesson);
  return {
    title: found ? found.title : "Lesson",
    description: found?.summary,
  };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ chapter: string; lesson: string }>;
}) {
  const { chapter: chapterSlug, lesson: lessonSlug } = await params;
  const chapter = getChapter(chapterSlug);
  const lesson = chapter?.lessons.find((entry) => entry.slug === lessonSlug);

  if (!chapter || !lesson) notFound();

  const { previous, next } = getLessonNeighbours(chapter.slug, lesson.slug);

  return (
    <div className="space-y-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground">
        <Link href="/learn" className="hover:text-foreground">
          Curriculum
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/learn/${chapter.slug}`} className="hover:text-foreground">
          {chapter.title}
        </Link>
      </nav>

      {/* Header */}
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">Chapter {chapter.chapterOrder}</Badge>
          <Badge variant="outline">
            {lesson.difficulty.charAt(0) + lesson.difficulty.slice(1).toLowerCase()}
          </Badge>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="size-3" />~{lesson.estimatedMinutes} min
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{lesson.title}</h1>
        <p className="text-lg text-muted-foreground">{lesson.summary}</p>
      </header>

      {/* Lesson body */}
      <article className="max-w-3xl">
        <LessonBlocks blocks={lesson.blocks} />
      </article>

      {/* Key takeaways */}
      <section className="max-w-3xl">
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <ListChecks className="size-4 text-primary" />
              Key takeaways
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {lesson.keyTakeaways.map((takeaway) => (
                <li key={takeaway} className="flex items-start gap-2 text-sm">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="text-muted-foreground">{takeaway}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Quiz */}
      {lesson.quiz.length > 0 ? (
        <section className="max-w-3xl space-y-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Check your understanding</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Every answer comes with an explanation — the goal is understanding, not a score.
            </p>
          </div>
          <Card>
            <CardContent className="p-6">
              <Quiz
                lessonSlug={lesson.slug}
                chapterSlug={chapter.slug}
                questions={lesson.quiz}
              />
            </CardContent>
          </Card>
        </section>
      ) : null}

      {/* Rating */}
      <section className="max-w-3xl">
        <LessonRating lessonSlug={lesson.slug} />
      </section>

      {/* Complete */}
      <section className="max-w-3xl">
        <LessonComplete
          key={lesson.slug}
          chapterSlug={chapter.slug}
          lessonSlug={lesson.slug}
          keyTakeaways={lesson.keyTakeaways}
          nextHref={next ? lessonHref(next.chapter.slug, next.lesson.slug) : undefined}
          nextLabel={next ? `Next: ${next.lesson.title}` : "Continue"}
        />
      </section>

      {/* Prev / next navigation */}
      <nav className="flex flex-col justify-between gap-3 border-t border-border pt-6 sm:flex-row">
        {previous ? (
          <Link
            href={lessonHref(previous.chapter.slug, previous.lesson.slug)}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <ChevronLeft className="size-4" />
            {previous.lesson.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={lessonHref(next.chapter.slug, next.lesson.slug)}
            className={cn(buttonVariants({ variant: "outline" }), "sm:ml-auto")}
          >
            {next.lesson.title}
            <ChevronRight className="size-4" />
          </Link>
        ) : null}
      </nav>
    </div>
  );
}

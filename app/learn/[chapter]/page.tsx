import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { ChapterLessonList } from "@/components/learning/chapter-lesson-list";
import { chapters, getChapter } from "@/lib/learning/curriculum";

export function generateStaticParams() {
  return chapters.map((chapter) => ({ chapter: chapter.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ chapter: string }>;
}): Promise<Metadata> {
  const { chapter: chapterSlug } = await params;
  const chapter = getChapter(chapterSlug);
  return {
    title: chapter ? `Chapter ${chapter.chapterOrder}: ${chapter.title}` : "Chapter",
    description: chapter?.description,
  };
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ chapter: string }>;
}) {
  const { chapter: chapterSlug } = await params;
  const chapter = getChapter(chapterSlug);
  if (!chapter) notFound();

  const index = chapters.findIndex((entry) => entry.slug === chapter.slug);
  const previous = chapters[index - 1];
  const next = chapters[index + 1];
  const totalMinutes = chapter.lessons.reduce(
    (sum, lesson) => sum + lesson.estimatedMinutes,
    0,
  );

  return (
    <div className="space-y-8">
      <nav className="text-sm text-muted-foreground">
        <Link href="/learn" className="hover:text-foreground">
          Curriculum
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">Chapter {chapter.chapterOrder}</span>
      </nav>

      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="secondary">Chapter {chapter.chapterOrder}</Badge>
          <Badge variant="outline">{chapter.difficulty.charAt(0) + chapter.difficulty.slice(1).toLowerCase()}</Badge>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="size-3" />~{totalMinutes} min total
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{chapter.title}</h1>
        <p className="text-lg text-muted-foreground">{chapter.subtitle}</p>
        <p className="max-w-3xl text-muted-foreground">{chapter.description}</p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight">Lessons</h2>
        <ChapterLessonList chapter={chapter} />
      </section>

      <div className="rounded-xl border border-dashed border-border p-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Course position</span>
          <span>
            Chapter {chapter.chapterOrder} of {chapters.length}
          </span>
        </div>
        <Progress
          value={(chapter.chapterOrder / chapters.length) * 100}
          className="mt-2 h-2"
        />
      </div>

      <nav className="flex flex-col justify-between gap-3 border-t border-border pt-6 sm:flex-row">
        {previous ? (
          <Link
            href={`/learn/${previous.slug}`}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <ChevronLeft className="size-4" />
            Chapter {previous.chapterOrder}: {previous.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/learn/${next.slug}`}
            className={cn(buttonVariants({ variant: "outline" }), "sm:ml-auto")}
          >
            Chapter {next.chapterOrder}: {next.title}
            <ChevronRight className="size-4" />
          </Link>
        ) : null}
      </nav>
    </div>
  );
}

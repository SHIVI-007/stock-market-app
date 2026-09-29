import { getPrismaClient } from "@/lib/db/prisma";

/**
 * Read-only queries backing the admin dashboard.
 *
 * Everything here is aggregate-first: the dashboard asks "how is the course
 * doing and who is using it", which maps naturally onto a handful of grouped
 * queries rather than loading every row.
 */

export interface AdminTotals {
  users: number;
  admins: number;
  newUsers7d: number;
  newUsers30d: number;
  lessonsCompleted: number;
  averageQuizScore: number | null;
  ratings: number;
  averageRating: number | null;
  feedbackTotal: number;
  feedbackOpen: number;
}

export interface AdminUserRow {
  id: string;
  email: string;
  name: string | null;
  role: "LEARNER" | "ADMIN";
  themePreference: string;
  createdAt: string;
  lastSignedInAt: string | null;
  lessonsCompleted: number;
  xp: number;
  averageQuizScore: number | null;
  ratingsGiven: number;
}

export interface AdminLessonStat {
  slug: string;
  title: string;
  chapterTitle: string;
  /** Meaning depends on the list: completions, average score, or average stars. */
  value: number;
  count: number;
}

export interface AdminFeedbackRow {
  id: string;
  subject: string | null;
  message: string;
  category: "BUG" | "CONTENT" | "FEATURE" | "OTHER";
  stars: number | null;
  email: string | null;
  status: "OPEN" | "REVIEWING" | "RESOLVED";
  adminNote: string | null;
  createdAt: string;
  userEmail: string | null;
  userName: string | null;
}

export interface AdminDashboardData {
  totals: AdminTotals;
  users: AdminUserRow[];
  mostCompletedLessons: AdminLessonStat[];
  hardestQuizzes: AdminLessonStat[];
  lowestRatedLessons: AdminLessonStat[];
  feedback: AdminFeedbackRow[];
}

const FEEDBACK_LIMIT = 100;

export async function getAdminDashboard(): Promise<AdminDashboardData | null> {
  const prisma = getPrismaClient();
  if (!prisma) return null;

  const now = Date.now();
  const sevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);

  try {
    const [
      users,
      admins,
      newUsers7d,
      newUsers30d,
      lessonsCompleted,
      quizAggregate,
      ratingAggregate,
      feedbackTotal,
      feedbackOpen,
      progressByUser,
      completedByUser,
      scoresByUser,
      completedByLesson,
      scoresByLesson,
      ratingsByLesson,
      lessonIndex,
      feedback,
    ] = await Promise.all([
      prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          themePreference: true,
          createdAt: true,
          lastSignedInAt: true,
        },
      }),
      prisma.user.count({ where: { role: "ADMIN" } }),
      prisma.user.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
      prisma.user.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
      prisma.lessonProgress.count({ where: { completed: true } }),
      prisma.lessonProgress.aggregate({
        where: { score: { gt: 0 } },
        _avg: { score: true },
      }),
      prisma.lessonRating.aggregate({ _avg: { stars: true }, _count: { _all: true } }),
      prisma.feedback.count(),
      prisma.feedback.count({ where: { status: "OPEN" } }),
      prisma.lessonProgress.groupBy({
        by: ["userId"],
        _sum: { xpEarned: true },
      }),
      prisma.lessonProgress.groupBy({
        by: ["userId"],
        where: { completed: true },
        _count: { _all: true },
      }),
      prisma.lessonProgress.groupBy({
        by: ["userId"],
        where: { score: { gt: 0 } },
        _avg: { score: true },
      }),
      prisma.lessonProgress.groupBy({
        by: ["lessonId"],
        where: { completed: true },
        _count: { _all: true },
      }),
      prisma.lessonProgress.groupBy({
        by: ["lessonId"],
        where: { score: { gt: 0 } },
        _avg: { score: true },
        _count: { _all: true },
      }),
      prisma.lessonRating.groupBy({
        by: ["lessonId"],
        _avg: { stars: true },
        _count: { _all: true },
      }),
      prisma.lesson.findMany({
        select: { id: true, slug: true, title: true, chapter: { select: { title: true } } },
      }),
      prisma.feedback.findMany({
        orderBy: { createdAt: "desc" },
        take: FEEDBACK_LIMIT,
        include: { user: { select: { email: true, name: true } } },
      }),
    ]);

    // ---- Per-user rollups -------------------------------------------------
    const xpByUser = new Map(progressByUser.map((row) => [row.userId, row._sum.xpEarned ?? 0]));
    const completedByUserMap = new Map(
      completedByUser.map((row) => [row.userId, row._count._all]),
    );
    const scoreByUserMap = new Map(
      scoresByUser.map((row) => [row.userId, row._avg.score ?? null]),
    );
    // Ratings given per user. Fetched separately because the rating grouping
    // above is keyed by lesson, not by user.
    const ratingsGivenByUser = new Map<string, number>();
    const ratingCountsByUser = await prisma.lessonRating.groupBy({
      by: ["userId"],
      _count: { _all: true },
    });
    for (const row of ratingCountsByUser) {
      ratingsGivenByUser.set(row.userId, row._count._all);
    }

    const userRows: AdminUserRow[] = users.map((user) => ({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role === "ADMIN" ? "ADMIN" : "LEARNER",
      themePreference: user.themePreference,
      createdAt: user.createdAt.toISOString(),
      lastSignedInAt: user.lastSignedInAt?.toISOString() ?? null,
      lessonsCompleted: completedByUserMap.get(user.id) ?? 0,
      xp: xpByUser.get(user.id) ?? 0,
      averageQuizScore: scoreByUserMap.get(user.id) ?? null,
      ratingsGiven: ratingsGivenByUser.get(user.id) ?? 0,
    }));

    // ---- Per-lesson rollups ----------------------------------------------
    const lessonById = new Map(
      lessonIndex.map((lesson) => [
        lesson.id,
        {
          slug: lesson.slug,
          title: lesson.title,
          chapterTitle: lesson.chapter.title,
        },
      ]),
    );

    const toLessonStat = (
      lessonId: string,
      value: number,
      count: number,
    ): AdminLessonStat | null => {
      const meta = lessonById.get(lessonId);
      if (!meta) return null;
      return { ...meta, value, count };
    };

    const mostCompletedLessons = completedByLesson
      .map((row) => toLessonStat(row.lessonId, row._count._all, row._count._all))
      .filter((stat): stat is AdminLessonStat => stat !== null)
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    const hardestQuizzes = scoresByLesson
      .map((row) => toLessonStat(row.lessonId, row._avg.score ?? 0, row._count._all))
      .filter((stat): stat is AdminLessonStat => stat !== null && stat.count > 0)
      .sort((a, b) => a.value - b.value)
      .slice(0, 5);

    const lowestRatedLessons = ratingsByLesson
      .map((row) => toLessonStat(row.lessonId, row._avg.stars ?? 0, row._count._all))
      .filter((stat): stat is AdminLessonStat => stat !== null && stat.count > 0)
      .sort((a, b) => a.value - b.value)
      .slice(0, 5);

    return {
      totals: {
        users: users.length,
        admins,
        newUsers7d,
        newUsers30d,
        lessonsCompleted,
        averageQuizScore: quizAggregate._avg.score ?? null,
        ratings: ratingAggregate._count._all,
        averageRating: ratingAggregate._avg.stars ?? null,
        feedbackTotal,
        feedbackOpen,
      },
      users: userRows,
      mostCompletedLessons,
      hardestQuizzes,
      lowestRatedLessons,
      feedback: feedback.map((entry) => ({
        id: entry.id,
        subject: entry.subject,
        message: entry.message,
        category: entry.category,
        stars: entry.stars,
        email: entry.email,
        status: entry.status,
        adminNote: entry.adminNote,
        createdAt: entry.createdAt.toISOString(),
        userEmail: entry.user?.email ?? null,
        userName: entry.user?.name ?? null,
      })),
    };
  } catch {
    // A missing table or unreachable database should not crash the page.
    return null;
  }
}

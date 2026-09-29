import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  BarChart3,
  Database,
  MessageSquare,
  ShieldCheck,
  Star,
  TrendingDown,
  Users,
} from "lucide-react";

import { getCurrentUser } from "@/lib/auth/user";
import { isAdmin } from "@/lib/auth/roles";
import { getAdminDashboard, type AdminLessonStat } from "@/lib/admin/queries";
import { AdminFeedbackPanel } from "@/components/admin/feedback-panel";
import { AdminUserTable } from "@/components/admin/user-table";
import { NotAnAdministrator } from "@/components/admin/not-authorized";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn, formatIndianNumber } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Admin dashboard",
  description: "Usage, ratings and feedback for the course.",
  // Keep the dashboard out of search engines.
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

/** A single headline number. */
function Stat({
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
    <Card className="lift">
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

function LessonStatList({
  title,
  icon,
  stats,
  format,
  emptyLabel,
}: {
  title: string;
  icon: React.ReactNode;
  stats: AdminLessonStat[];
  format: (stat: AdminLessonStat) => string;
  emptyLabel: string;
}) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {stats.length === 0 ? (
          <p className="text-xs text-muted-foreground">{emptyLabel}</p>
        ) : (
          <ol className="space-y-2">
            {stats.map((stat) => (
              <li key={stat.slug} className="flex items-center justify-between gap-3 text-sm">
                <Link
                  href={`/learn/${stat.slug}`}
                  className="min-w-0 truncate text-muted-foreground hover:text-foreground"
                  title={stat.title}
                >
                  {stat.title}
                </Link>
                <span className="shrink-0 font-mono text-xs tabular-nums">{format(stat)}</span>
              </li>
            ))}
          </ol>
        )}
      </CardContent>
    </Card>
  );
}

export default async function AdminPage() {
  const user = await getCurrentUser();

  // Signed-out visitors are sent to sign in. A bare 404 here is technically
  // "hidden", but it is indistinguishable from a broken link, and the route's
  // existence is not the security boundary — every action re-checks the role.
  if (!user) redirect("/signin");

  // A signed-in learner gets a clear explanation rather than a dead end.
  if (!isAdmin(user)) return <NotAnAdministrator email={user.email} />;

  const data = await getAdminDashboard();

  if (!data) {
    return (
      <div className="mx-auto max-w-2xl space-y-4">
        <h1 className="text-2xl font-bold tracking-tight">Admin dashboard</h1>
        <Card>
          <CardContent className="flex items-start gap-3 p-6 text-sm text-muted-foreground">
            <Database className="mt-0.5 size-5 shrink-0" />
            <div className="space-y-2">
              <p className="font-medium text-foreground">A database is required</p>
              <p>
                The dashboard reads accounts, progress, ratings and feedback from PostgreSQL. Set{" "}
                <code className="rounded bg-muted px-1">DATABASE_URL</code>, then run{" "}
                <code className="rounded bg-muted px-1">npm run db:push</code>.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { totals } = data;

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <Badge variant="secondary">
          <ShieldCheck className="size-3" />
          Administrator
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Admin dashboard</h1>
        <p className="max-w-3xl text-muted-foreground">
          How the course is being used, what learners think of it, and what needs attention.
        </p>
      </header>

      {/* Headline numbers */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          label="Registered users"
          value={formatIndianNumber(totals.users)}
          hint={`${totals.admins} admin${totals.admins === 1 ? "" : "s"}`}
          icon={<Users className="size-4" />}
        />
        <Stat
          label="New users"
          value={formatIndianNumber(totals.newUsers7d)}
          hint={`last 7 days · ${formatIndianNumber(totals.newUsers30d)} in 30 days`}
          icon={<BarChart3 className="size-4" />}
        />
        <Stat
          label="Lessons completed"
          value={formatIndianNumber(totals.lessonsCompleted)}
          hint={
            totals.averageQuizScore === null
              ? undefined
              : `quiz average ${formatIndianNumber(totals.averageQuizScore, 0)}%`
          }
          icon={<BarChart3 className="size-4" />}
        />
        <Stat
          label="Feedback"
          value={formatIndianNumber(totals.feedbackTotal)}
          hint={`${totals.feedbackOpen} open`}
          icon={<MessageSquare className="size-4" />}
        />
        <Stat
          label="Average lesson rating"
          value={
            totals.averageRating === null ? "—" : `${formatIndianNumber(totals.averageRating, 1)} / 5`
          }
          hint={`${formatIndianNumber(totals.ratings)} rating${totals.ratings === 1 ? "" : "s"}`}
          icon={<Star className="size-4" />}
        />
      </section>

      {/* Lesson analytics */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight">Lesson analytics</h2>
        <div className="grid gap-4 lg:grid-cols-3">
          <LessonStatList
            title="Most completed"
            icon={<BarChart3 className="size-4 text-primary" />}
            stats={data.mostCompletedLessons}
            format={(stat) => `${formatIndianNumber(stat.value)}`}
            emptyLabel="No lessons completed yet."
          />
          <LessonStatList
            title="Hardest quizzes"
            icon={<TrendingDown className="size-4 text-warning" />}
            stats={data.hardestQuizzes}
            format={(stat) => `${formatIndianNumber(stat.value, 0)}% (${stat.count})`}
            emptyLabel="No quiz attempts yet."
          />
          <LessonStatList
            title="Lowest rated"
            icon={<Star className="size-4 text-warning" />}
            stats={data.lowestRatedLessons}
            format={(stat) => `${formatIndianNumber(stat.value, 1)}★ (${stat.count})`}
            emptyLabel="No lesson ratings yet."
          />
        </div>
      </section>

      {/* Feedback */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight">
            <MessageSquare className="size-5 text-primary" />
            Feedback inbox
          </h2>
          <Link href="/feedback" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
            Open the public form
          </Link>
        </div>
        <AdminFeedbackPanel feedback={data.feedback} />
      </section>

      {/* Users */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight">
            <Users className="size-5 text-primary" />
            Users
          </h2>
          <p className="text-xs text-muted-foreground">
            {formatIndianNumber(totals.users)} {totals.users === 1 ? "account" : "accounts"}
          </p>
        </div>
        <AdminUserTable users={data.users} currentUserId={user.id} />
      </section>
    </div>
  );
}

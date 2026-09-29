import { ShieldCheck, UserRound } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { setUserRoleAction } from "@/lib/admin/actions";
import type { AdminUserRow } from "@/lib/admin/queries";
import { formatIndianNumber } from "@/lib/utils";

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatDateTime(iso: string | null): string {
  if (!iso) return "Never";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Learner table with role management.
 *
 * The role buttons are plain form submissions — the server action re-checks that
 * the caller is an admin, so a crafted request cannot promote anyone.
 */
export function AdminUserTable({
  users,
  currentUserId,
}: {
  users: AdminUserRow[];
  currentUserId: string;
}) {
  if (users.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
        No accounts yet. Learners appear here as soon as they sign up.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Learner</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className="text-right">Lessons</TableHead>
          <TableHead className="text-right">XP</TableHead>
          <TableHead className="text-right">Quiz avg</TableHead>
          <TableHead className="text-right">Ratings</TableHead>
          <TableHead>Joined</TableHead>
          <TableHead>Last seen</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => {
          const isSelf = user.id === currentUserId;
          const nextRole = user.role === "ADMIN" ? "LEARNER" : "ADMIN";

          return (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
                    {(user.name?.trim()?.[0] ?? user.email[0] ?? "?").toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{user.name?.trim() || "—"}</p>
                    <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <Badge variant={user.role === "ADMIN" ? "default" : "secondary"}>
                  {user.role === "ADMIN" ? (
                    <>
                      <ShieldCheck className="size-3" /> Admin
                    </>
                  ) : (
                    <>
                      <UserRound className="size-3" /> Learner
                    </>
                  )}
                </Badge>
              </TableCell>

              <TableCell className="text-right font-mono tabular-nums">
                {formatIndianNumber(user.lessonsCompleted)}
              </TableCell>
              <TableCell className="text-right font-mono tabular-nums">
                {formatIndianNumber(user.xp)}
              </TableCell>
              <TableCell className="text-right font-mono tabular-nums">
                {user.averageQuizScore === null
                  ? "—"
                  : `${formatIndianNumber(user.averageQuizScore, 0)}%`}
              </TableCell>
              <TableCell className="text-right font-mono tabular-nums">
                {formatIndianNumber(user.ratingsGiven)}
              </TableCell>
              <TableCell className="text-xs text-muted-foreground">
                {formatDate(user.createdAt)}
              </TableCell>
              <TableCell className="text-xs text-muted-foreground">
                {formatDateTime(user.lastSignedInAt)}
              </TableCell>

              <TableCell className="text-right">
                {isSelf ? (
                  <span className="text-xs text-muted-foreground">You</span>
                ) : (
                  <form action={setUserRoleAction}>
                    <input type="hidden" name="userId" value={user.id} />
                    <input type="hidden" name="role" value={nextRole} />
                    <Button
                      type="submit"
                      size="sm"
                      variant={nextRole === "ADMIN" ? "secondary" : "ghost"}
                    >
                      {nextRole === "ADMIN" ? "Make admin" : "Remove admin"}
                    </Button>
                  </form>
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

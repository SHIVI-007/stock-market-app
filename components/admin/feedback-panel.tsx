import { Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { setFeedbackStatusAction, updateFeedbackNoteAction } from "@/lib/admin/actions";
import type { AdminFeedbackRow } from "@/lib/admin/queries";
import { cn } from "@/lib/utils";

const CATEGORY_LABELS: Record<AdminFeedbackRow["category"], string> = {
  BUG: "Bug",
  CONTENT: "Content",
  FEATURE: "Feature",
  OTHER: "Other",
};

const STATUS_VARIANT: Record<AdminFeedbackRow["status"], "warning" | "secondary" | "success"> = {
  OPEN: "warning",
  REVIEWING: "secondary",
  RESOLVED: "success",
};

const STATUS_LABELS: Record<AdminFeedbackRow["status"], string> = {
  OPEN: "Open",
  REVIEWING: "Reviewing",
  RESOLVED: "Resolved",
};

function StarsDisplay({ value }: { value: number }) {
  return (
    <span aria-label={`${value} out of 5 stars`} className="inline-flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "size-3.5",
            star <= value ? "fill-warning text-warning" : "text-muted-foreground",
          )}
        />
      ))}
    </span>
  );
}

/** Feedback inbox. Status changes and notes go through admin-checked actions. */
export function AdminFeedbackPanel({ feedback }: { feedback: AdminFeedbackRow[] }) {
  if (feedback.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
        No feedback yet. Submissions from{" "}
        <span className="text-foreground">/feedback</span> land here.
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {feedback.map((entry) => (
        <li key={entry.id} className="space-y-3 rounded-xl border border-border bg-card p-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{CATEGORY_LABELS[entry.category]}</Badge>
            <Badge variant={STATUS_VARIANT[entry.status]}>{STATUS_LABELS[entry.status]}</Badge>
            {entry.stars ? <StarsDisplay value={entry.stars} /> : null}
            <span className="ml-auto text-xs text-muted-foreground">
              {new Date(entry.createdAt).toLocaleString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          {entry.subject ? (
            <p className="text-sm font-semibold">{entry.subject}</p>
          ) : null}

          <p className="whitespace-pre-wrap text-sm text-muted-foreground">{entry.message}</p>

          <p className="text-xs text-muted-foreground">
            From:{" "}
            <span className="text-foreground">
              {entry.userEmail ?? entry.email ?? "Anonymous"}
            </span>
            {entry.userName ? ` (${entry.userName})` : ""}
          </p>

          <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
            <form action={updateFeedbackNoteAction} className="space-y-2">
              <input type="hidden" name="feedbackId" value={entry.id} />
              <Textarea
                name="adminNote"
                rows={2}
                maxLength={2000}
                defaultValue={entry.adminNote ?? ""}
                placeholder="Internal note (only visible here)"
                className="text-xs"
              />
              <Button type="submit" size="sm" variant="ghost">
                Save note
              </Button>
            </form>

            <form action={setFeedbackStatusAction} className="flex items-start gap-2">
              <input type="hidden" name="feedbackId" value={entry.id} />
              <select
                name="status"
                defaultValue={entry.status}
                aria-label="Feedback status"
                className="h-9 rounded-lg border border-input bg-background px-2 text-xs shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {(["OPEN", "REVIEWING", "RESOLVED"] as const).map((status) => (
                  <option key={status} value={status}>
                    {STATUS_LABELS[status]}
                  </option>
                ))}
              </select>
              <Button type="submit" size="sm" variant="secondary">
                Update
              </Button>
            </form>
          </div>

          {entry.adminNote ? (
            <p className="rounded-lg border border-border bg-muted/40 p-2 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Note: </span>
              {entry.adminNote}
            </p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

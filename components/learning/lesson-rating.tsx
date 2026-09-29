"use client";

import * as React from "react";
import { useActionState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, Star } from "lucide-react";

import { useSession } from "@/components/auth/session-provider";
import { AnimatedNumber } from "@/components/motion/animated-number";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import type { AuthState } from "@/lib/auth/types";
import { fetchLessonRatingSummary, saveLessonRatingAction } from "@/lib/ratings/actions";
import { cn } from "@/lib/utils";

const STAR_VALUES = [1, 2, 3, 4, 5];

interface Summary {
  average: number | null;
  count: number;
  mine: { stars: number; comment: string | null } | null;
}

const EMPTY_SUMMARY: Summary = { average: null, count: 0, mine: null };

/** A row of tappable stars with keyboard support. */
function StarPicker({
  value,
  onChange,
  disabled,
}: {
  value: number;
  onChange: (next: number) => void;
  disabled?: boolean;
}) {
  return (
    <div role="radiogroup" aria-label="Rating out of five stars" className="flex gap-1">
      {STAR_VALUES.map((star) => {
        const filled = star <= value;
        return (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={star === value}
            aria-label={`${star} ${star === 1 ? "star" : "stars"}`}
            disabled={disabled}
            onClick={() => onChange(star)}
            className={cn(
              "rounded-md p-1 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              !disabled && "hover:scale-110 active:scale-95",
              disabled && "opacity-60",
            )}
          >
            <Star
              className={cn(
                "size-6 transition-colors",
                filled ? "fill-warning text-warning" : "text-muted-foreground",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}

function StarsDisplay({ value }: { value: number }) {
  return (
    <span aria-hidden className="inline-flex">
      {STAR_VALUES.map((star) => (
        <Star
          key={star}
          className={cn(
            "size-4",
            star <= Math.round(value) ? "fill-warning text-warning" : "text-muted-foreground",
          )}
        />
      ))}
    </span>
  );
}

/**
 * "How was this lesson?" — one 1–5 star rating per learner per lesson.
 * The aggregate is fetched on the client so lesson pages stay static.
 */
export function LessonRating({ lessonSlug }: { lessonSlug: string }) {
  const { user, ready } = useSession();
  const [summary, setSummary] = React.useState<Summary>(EMPTY_SUMMARY);
  const [stars, setStars] = React.useState(0);
  const [comment, setComment] = React.useState("");

  const [state, formAction, pending] = useActionState<AuthState, FormData>(
    saveLessonRatingAction,
    {},
  );

  // Once the learner has touched the controls, a late-arriving summary must not
  // overwrite what they are doing.
  const touched = React.useRef(false);

  // Load the aggregate (and this learner's own rating) when the lesson or the
  // signed-in user changes.
  React.useEffect(() => {
    touched.current = false;
    let cancelled = false;

    void (async () => {
      const result = await fetchLessonRatingSummary(lessonSlug);
      if (cancelled) return;
      setSummary(result);
      if (!touched.current) {
        setStars(result.mine?.stars ?? 0);
        setComment(result.mine?.comment ?? "");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [lessonSlug, user?.id]);

  // Refresh the aggregate after a successful save.
  React.useEffect(() => {
    if (!state.saved) return;
    let cancelled = false;

    void (async () => {
      const result = await fetchLessonRatingSummary(lessonSlug);
      if (!cancelled) setSummary(result);
    })();

    return () => {
      cancelled = true;
    };
  }, [state, lessonSlug]);

  const canRate = ready && Boolean(user);

  return (
    <Card className="animate-fade-in-up">
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CardTitle className="text-base">How was this lesson?</CardTitle>
          {summary.count > 0 && summary.average !== null ? (
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <StarsDisplay value={summary.average} />
              <AnimatedNumber value={summary.average} decimals={1} className="tabular-nums" />
              <span>
                ({summary.count} {summary.count === 1 ? "rating" : "ratings"})
              </span>
            </span>
          ) : null}
        </div>
      </CardHeader>

      <CardContent>
        {!canRate ? (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Ratings are tied to your account so we can tell which lessons land well. Sign in to
              leave one — it takes a second.
            </p>
            <Link
              href="/signin"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              Sign in to rate
            </Link>
          </div>
        ) : (
          <form action={formAction} className="space-y-4">
            <input type="hidden" name="lessonSlug" value={lessonSlug} />
            <input type="hidden" name="stars" value={stars} />

            <div className="space-y-2">
              <StarPicker
                value={stars}
                disabled={pending}
                onChange={(next) => {
                  touched.current = true;
                  setStars(next);
                }}
              />
              <p className="text-xs text-muted-foreground">
                {stars === 0
                  ? "Pick a rating from 1 to 5 stars."
                  : ["", "Not useful", "Could be better", "Good", "Very good", "Excellent"][stars]}
              </p>
            </div>

            <Textarea
              name="comment"
              value={comment}
              onChange={(event) => {
                touched.current = true;
                setComment(event.target.value);
              }}
              placeholder="Anything you would change? (optional)"
              maxLength={1000}
              rows={3}
            />

            {state.error ? (
              <p className="animate-shake text-sm text-destructive">{state.error}</p>
            ) : null}

            {state.saved && !state.error ? (
              <p className="animate-fade-in flex items-center gap-1.5 text-sm text-success">
                <CheckCircle2 className="size-4" />
                Thanks — your rating is saved.
              </p>
            ) : null}

            <Button type="submit" size="sm" disabled={pending || stars === 0}>
              {pending ? <Loader2 className="size-3.5 animate-spin" /> : null}
              {summary.mine ? "Update rating" : "Submit rating"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}

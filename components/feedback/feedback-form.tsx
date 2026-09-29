"use client";

import * as React from "react";
import { useActionState } from "react";
import { CheckCircle2, Loader2, MessageSquareHeart, Send, Star } from "lucide-react";

import { useSession } from "@/components/auth/session-provider";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { AuthState } from "@/lib/auth/types";
import { submitFeedbackAction } from "@/lib/feedback/actions";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { value: "BUG", label: "Something is broken" },
  { value: "CONTENT", label: "Content suggestion" },
  { value: "FEATURE", label: "Feature request" },
  { value: "OTHER", label: "Something else" },
] as const;

const STAR_VALUES = [1, 2, 3, 4, 5];

export function FeedbackForm() {
  const { user, ready } = useSession();
  const [state, formAction, pending] = useActionState<AuthState, FormData>(
    submitFeedbackAction,
    {},
  );
  const [stars, setStars] = React.useState(0);

  if (state.sent) {
    return (
      <div className="animate-fade-in-up space-y-4 rounded-xl border border-success/40 bg-success/10 p-6">
        <div className="flex items-center gap-2">
          <span className="animate-pop flex size-8 items-center justify-center rounded-full bg-success/15">
            <CheckCircle2 className="size-4 text-success" />
          </span>
          <h3 className="text-lg font-semibold">Thank you</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Your feedback is recorded and appears on the administrator dashboard. If you left an email
          address, expect a reply there.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="feedback-category">What is this about?</Label>
          <select
            id="feedback-category"
            name="category"
            defaultValue="CONTENT"
            className={cn(
              "flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            )}
          >
            {CATEGORIES.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="feedback-subject">Subject (optional)</Label>
          <Input
            id="feedback-subject"
            name="subject"
            placeholder="A short summary"
            maxLength={120}
          />
          {state.fieldErrors?.subject ? (
            <p className="text-xs text-destructive">{state.fieldErrors.subject}</p>
          ) : null}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="feedback-message">Your feedback</Label>
        <Textarea
          id="feedback-message"
          name="message"
          rows={5}
          required
          minLength={10}
          maxLength={4000}
          placeholder="Tell us what worked, what did not, or what you would like to see."
        />
        {state.fieldErrors?.message ? (
          <p className="text-xs text-destructive">{state.fieldErrors.message}</p>
        ) : (
          <p className="text-xs text-muted-foreground">At least 10 characters.</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Overall rating (optional)</Label>
        <input type="hidden" name="stars" value={stars} />
        <div role="radiogroup" aria-label="Overall rating" className="flex gap-1">
          {STAR_VALUES.map((star) => (
            <button
              key={star}
              type="button"
              role="radio"
              aria-checked={star === stars}
              aria-label={`${star} ${star === 1 ? "star" : "stars"}`}
              onClick={() => setStars(star === stars ? 0 : star)}
              className="rounded-md p-1 transition-transform hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Star
                className={cn(
                  "size-6 transition-colors",
                  star <= stars ? "fill-warning text-warning" : "text-muted-foreground",
                )}
              />
            </button>
          ))}
        </div>
      </div>

      {ready && !user ? (
        <div className="space-y-1.5">
          <Label htmlFor="feedback-email">Email (optional)</Label>
          <Input
            id="feedback-email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
          />
          {state.fieldErrors?.email ? (
            <p className="text-xs text-destructive">{state.fieldErrors.email}</p>
          ) : (
            <p className="text-xs text-muted-foreground">Leave this blank to stay anonymous.</p>
          )}
        </div>
      ) : null}

      {user ? (
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <MessageSquareHeart className="size-3.5" />
          Sending as {user.email}
        </p>
      ) : null}

      {state.error ? (
        <Alert variant="destructive" className="animate-shake">
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      ) : null}

      <Button type="submit" disabled={pending}>
        {pending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
        {pending ? "Sending…" : "Send feedback"}
      </Button>
    </form>
  );
}

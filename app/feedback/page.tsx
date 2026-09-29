import type { Metadata } from "next";
import { MessageSquareHeart } from "lucide-react";

import { FeedbackForm } from "@/components/feedback/feedback-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Send feedback",
  description:
    "Tell us what worked, what did not, or what you would like to see in Stock Market Fundamentals.",
};

export default function FeedbackPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <header className="space-y-3 text-center">
        <h1 className="flex items-center justify-center gap-2 text-3xl font-bold tracking-tight sm:text-4xl">
          <MessageSquareHeart className="size-7 text-primary" />
          Send feedback
        </h1>
        <p className="text-muted-foreground">
          Found a bug, spotted an error in a lesson, or have an idea for something that would help
          you learn? Tell us. Every submission lands in the administrator dashboard.
        </p>
      </header>

      <Card className="animate-fade-in-up">
        <CardHeader className="border-b border-border bg-muted/40">
          <CardTitle className="text-base">Your feedback</CardTitle>
          <p className="text-sm text-muted-foreground">
            You can submit this without an account, and it takes less than a minute.
          </p>
        </CardHeader>
        <CardContent className="pt-6">
          <FeedbackForm />
        </CardContent>
      </Card>
    </div>
  );
}

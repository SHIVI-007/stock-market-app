import Link from "next/link";
import { MessageSquareHeart, ShieldAlert } from "lucide-react";

/** Persistent, app-wide educational disclaimer required by the brief. */
export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex flex-wrap items-center gap-4 text-sm">
          <Link
            href="/feedback"
            className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            <MessageSquareHeart className="size-4" />
            Send feedback
          </Link>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-warning/15 text-warning">
            <ShieldAlert className="size-5" />
          </span>
          <div className="space-y-2 text-sm">
            <p className="font-semibold text-foreground">Educational Use Only</p>
            <p className="max-w-3xl text-muted-foreground">
              This application is designed to teach stock-market concepts and fundamental analysis.
              Examples and simulations may use hypothetical data. Nothing in this application
              constitutes investment, financial, tax, or legal advice. It does not provide buy or
              sell recommendations, price targets, or return guarantees.
            </p>
            <p className="text-xs text-muted-foreground">
              Built for learners — not for trading. Indian market references (NSE, BSE, SEBI, NSDL,
              CDSL) are explained for education only.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

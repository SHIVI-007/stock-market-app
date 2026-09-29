import * as React from "react";
import { Lightbulb, ShieldAlert, TriangleAlert, CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/utils";

export interface ConceptCardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

/** A highlighted card used to set a single concept apart from the prose. */
export function ConceptCard({ title, icon, children, className }: ConceptCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border-l-4 border-primary bg-card p-5 shadow-sm",
        className,
      )}
    >
      <h4 className="flex items-center gap-2 text-base font-semibold">
        {icon}
        {title}
      </h4>
      <div className="mt-2 space-y-2 text-sm text-muted-foreground">{children}</div>
    </div>
  );
}

const CALLOUT_STYLES = {
  info: {
    icon: <Lightbulb className="size-4" />,
    className: "border-chart-5/40 bg-chart-5/10",
    iconClass: "text-chart-5",
  },
  success: {
    icon: <CheckCircle2 className="size-4" />,
    className: "border-success/40 bg-success/10",
    iconClass: "text-success",
  },
  warning: {
    icon: <TriangleAlert className="size-4" />,
    className: "border-warning/40 bg-warning/10",
    iconClass: "text-warning",
  },
  destructive: {
    icon: <ShieldAlert className="size-4" />,
    className: "border-destructive/40 bg-destructive/10",
    iconClass: "text-destructive",
  },
} as const;

export interface CalloutProps {
  variant?: keyof typeof CALLOUT_STYLES;
  title?: string;
  children: React.ReactNode;
}

/** A short aside — a hint, a warning, or a key confirmation. */
export function Callout({ variant = "info", title, children }: CalloutProps) {
  const style = CALLOUT_STYLES[variant];

  return (
    <div className={cn("flex gap-3 rounded-xl border p-4", style.className)}>
      <span className={cn("mt-0.5 shrink-0", style.iconClass)}>{style.icon}</span>
      <div className="space-y-1">
        {title ? <p className="text-sm font-semibold">{title}</p> : null}
        <div className="text-sm text-muted-foreground">{children}</div>
      </div>
    </div>
  );
}

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TooltipProps {
  /** The tooltip body. */
  content: React.ReactNode;
  /** The element the tooltip is attached to. */
  children: React.ReactNode;
  side?: "top" | "bottom";
  className?: string;
}

/**
 * A lightweight, CSS-driven tooltip. It shows on hover and on keyboard focus
 * (via the `group-focus-within` variant) and needs no JavaScript.
 */
export function Tooltip({
  content,
  children,
  side = "top",
  className,
}: TooltipProps) {
  return (
    <span className="group/tt relative inline-flex">
      {children}
      <span
        role="tooltip"
        className={cn(
          "pointer-events-none absolute left-1/2 z-50 hidden w-max max-w-xs -translate-x-1/2 rounded-lg border border-border bg-popover px-3 py-2 text-xs text-popover-foreground shadow-md",
          "group-hover/tt:block group-focus-within/tt:block",
          side === "top" ? "bottom-[calc(100%+6px)]" : "top-[calc(100%+6px)]",
          className,
        )}
      >
        {content}
      </span>
    </span>
  );
}

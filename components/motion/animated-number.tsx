"use client";

import * as React from "react";

import { formatIndianNumber } from "@/lib/utils";

export interface AnimatedNumberProps {
  value: number;
  /** Decimal places to display. */
  decimals?: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
  className?: string;
}

/**
 * Counts smoothly from the previous value to the new one.
 *
 * The server renders the final value, so the number is always correct without
 * JavaScript — only the *transition* is animated.
 */
export function AnimatedNumber({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  durationMs = 650,
  className,
}: AnimatedNumberProps) {
  const [display, setDisplay] = React.useState(value);
  const fromRef = React.useRef(value);

  React.useEffect(() => {
    const from = fromRef.current;
    const to = value;
    fromRef.current = to;

    if (from === to) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || typeof requestAnimationFrame === "undefined") {
      const timeout = window.setTimeout(() => setDisplay(to), 0);
      return () => window.clearTimeout(timeout);
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(from + (to - from) * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, durationMs]);

  return (
    <span className={className}>
      {prefix}
      {formatIndianNumber(display, decimals)}
      {suffix}
    </span>
  );
}

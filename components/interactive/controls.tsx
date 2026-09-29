"use client";

import * as React from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

/** Shared frame used by every simulation so they feel consistent. */
export function SimFrame({
  title,
  description,
  icon,
  children,
  footer,
  className,
}: {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="border-b border-border bg-muted/40">
        <CardTitle className="flex items-center gap-2 text-base">
          {icon}
          {title}
        </CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent className="space-y-6 pt-6">{children}</CardContent>
      {footer ? (
        <div className="border-t border-border bg-muted/20 px-6 py-4 text-sm text-muted-foreground">
          {footer}
        </div>
      ) : null}
    </Card>
  );
}

export interface SliderFieldProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  /** Format the displayed number (defaults to Indian grouping). */
  display?: (value: number) => string;
  className?: string;
}

/** A labelled slider paired with a direct numeric entry box. */
export function SliderField({
  id,
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit,
  display,
  className,
}: SliderFieldProps) {
  const shown = display ? display(value) : new Intl.NumberFormat("en-IN").format(value);

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between gap-3">
        <Label htmlFor={id} className="text-sm">
          {label}
          {unit ? <span className="ml-1 text-xs text-muted-foreground">({unit})</span> : null}
        </Label>
        <span className="font-mono text-sm tabular-nums text-foreground">{shown}</span>
      </div>
      <div className="flex items-center gap-3">
        <Slider
          id={id}
          min={min}
          max={max}
          step={step}
          value={value}
          onValueChange={onChange}
          className="flex-1"
        />
        <Input
          type="number"
          inputMode="decimal"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(event) => onChange(Number(event.target.value))}
          className="h-8 w-24 text-right"
          aria-label={`${label} value`}
        />
      </div>
    </div>
  );
}

export interface ResultTileProps {
  label: string;
  value: string;
  hint?: string;
  emphasis?: boolean;
  className?: string;
  tone?: "default" | "success" | "warning" | "destructive";
}

const toneClasses: Record<NonNullable<ResultTileProps["tone"]>, string> = {
  default: "border-border bg-muted/30",
  success: "border-success/40 bg-success/10",
  warning: "border-warning/40 bg-warning/10",
  destructive: "border-destructive/40 bg-destructive/10",
};

/** A single highlighted output value. */
export function ResultTile({
  label,
  value,
  hint,
  emphasis,
  tone = "default",
  className,
}: ResultTileProps) {
  return (
    <div
      className={cn(
        "animate-fade-in-up rounded-xl border p-4",
        emphasis ? "border-primary/40 bg-primary/10" : toneClasses[tone],
        className,
      )}
    >
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p
        className={cn(
          "mt-1 font-semibold tabular-nums",
          emphasis ? "text-2xl text-primary" : "text-xl",
        )}
      >
        {value}
      </p>
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

/** A simple labelled progress-style bar used for allocations and shares. */
export function MeterBar({
  segments,
}: {
  segments: { label: string; value: number; className: string }[];
}) {
  const total = segments.reduce((sum, segment) => sum + Math.max(0, segment.value), 0) || 1;

  return (
    <div className="space-y-3">
      <div className="flex h-6 w-full overflow-hidden rounded-full border border-border bg-muted">
        {segments.map((segment) => (
          <div
            key={segment.label}
            className={cn("h-full transition-all duration-500", segment.className)}
            style={{ width: `${(Math.max(0, segment.value) / total) * 100}%` }}
            title={segment.label}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs">
        {segments.map((segment) => (
          <span key={segment.label} className="inline-flex items-center gap-2">
            <span className={cn("size-3 rounded-sm", segment.className)} />
            <span className="text-muted-foreground">{segment.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

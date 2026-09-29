"use client";

import * as React from "react";
import { RotateCcw, Sigma } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { cn, formatIndianNumber, formatINR, round } from "@/lib/utils";

export interface CalculatorInput {
  id: string;
  label: string;
  /** Unit suffix shown next to the value, e.g. "₹ Cr" or "shares". */
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  defaultValue: number;
}

export interface CalculatorOutput {
  id: string;
  label: string;
  value: number | null;
  /** "x" | "%" | "₹" | "₹ Cr" | undefined */
  unit?: string;
  decimals?: number;
  hint?: string;
  /** Highlight the primary result. */
  emphasis?: boolean;
}

export interface FormulaCalculatorProps {
  title: string;
  description?: string;
  /** The formula, rendered as a highlighted expression. */
  formula: string;
  inputs: CalculatorInput[];
  /** Pure function mapping current input values to outputs. */
  compute: (values: Record<string, number>) => CalculatorOutput[];
  /** Extra content (explanations, caveats) rendered under the results. */
  footer?: React.ReactNode;
  className?: string;
}

function formatOutput(output: CalculatorOutput): string {
  const { value, unit, decimals = 2 } = output;
  if (value === null || !Number.isFinite(value)) return "—";

  const rounded = round(value, decimals);

  if (unit === "%") return `${formatIndianNumber(rounded, decimals)}%`;
  if (unit === "x") return `${formatIndianNumber(rounded, decimals)}x`;
  if (unit === "₹ Cr") return `₹${formatIndianNumber(rounded, decimals)} Cr`;
  if (unit === "₹") return formatINR(rounded, decimals);
  if (unit) return `${formatIndianNumber(rounded, decimals)} ${unit}`;
  return formatIndianNumber(rounded, decimals);
}

/**
 * A reusable, fully interactive formula calculator.
 *
 * This single component powers every ratio/valuation tool in the app: each one
 * simply declares its inputs and a pure `compute` function, so the interactive
 * behaviour (sliders + direct entry + live animated results) is consistent
 * everywhere. See `ratio-calculators.tsx` for the concrete instances.
 */
export function FormulaCalculator({
  title,
  description,
  formula,
  inputs,
  compute,
  footer,
  className,
}: FormulaCalculatorProps) {
  const initialValues = React.useMemo(
    () =>
      Object.fromEntries(inputs.map((input) => [input.id, input.defaultValue])) as Record<
        string,
        number
      >,
    [inputs],
  );

  const [values, setValues] = React.useState<Record<string, number>>(initialValues);

  const setValue = (id: string, next: number) => {
    setValues((current) => ({ ...current, [id]: Number.isFinite(next) ? next : 0 }));
  };

  const reset = () => setValues(initialValues);

  const outputs = React.useMemo(() => compute(values), [compute, values]);

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="border-b border-border bg-muted/40">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-base">
              <Sigma className="size-4 text-primary" />
              {title}
            </CardTitle>
            {description ? <CardDescription>{description}</CardDescription> : null}
          </div>
          <Button variant="ghost" size="sm" onClick={reset} aria-label="Reset values">
            <RotateCcw className="size-3.5" />
            Reset
          </Button>
        </div>
        <div className="mt-3 rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 font-mono text-sm text-primary">
          {formula}
        </div>
      </CardHeader>

      <CardContent className="grid gap-6 pt-6 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-5">
          {inputs.map((input) => {
            const value = values[input.id] ?? input.defaultValue;
            const hasSlider = input.min !== undefined && input.max !== undefined;

            return (
              <div key={input.id} className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <Label htmlFor={`calc-${input.id}`} className="text-sm">
                    {input.label}
                    {input.unit ? (
                      <span className="ml-1 text-xs text-muted-foreground">({input.unit})</span>
                    ) : null}
                  </Label>
                  <Input
                    id={`calc-${input.id}`}
                    type="number"
                    inputMode="decimal"
                    value={Number.isFinite(value) ? value : 0}
                    step={input.step ?? 1}
                    onChange={(event) => setValue(input.id, Number(event.target.value))}
                    className="h-8 w-32 text-right"
                  />
                </div>
                {hasSlider ? (
                  <Slider
                    aria-label={input.label}
                    min={input.min}
                    max={input.max}
                    step={input.step ?? 1}
                    value={value}
                    onValueChange={(next) => setValue(input.id, next)}
                  />
                ) : null}
              </div>
            );
          })}
        </div>

        {/* Results */}
        <div className="space-y-3">
          {outputs.map((output) => (
            <div
              key={`${output.id}-${output.value ?? "null"}`}
              className={cn(
                "animate-fade-in-up rounded-xl border p-4",
                output.emphasis
                  ? "border-primary/40 bg-primary/10"
                  : "border-border bg-muted/30",
              )}
            >
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {output.label}
              </p>
              <p
                className={cn(
                  "mt-1 font-semibold tabular-nums",
                  output.emphasis ? "text-2xl text-primary" : "text-xl",
                )}
              >
                {formatOutput(output)}
              </p>
              {output.hint ? (
                <p className="mt-1 text-xs text-muted-foreground">{output.hint}</p>
              ) : null}
            </div>
          ))}
        </div>
      </CardContent>

      {footer ? (
        <div className="border-t border-border bg-muted/20 px-6 py-4 text-sm text-muted-foreground">
          {footer}
        </div>
      ) : null}
    </Card>
  );
}

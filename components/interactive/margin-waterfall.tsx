"use client";

import * as React from "react";
import { Droplets } from "lucide-react";

import { ResultTile, SimFrame, SliderField } from "@/components/interactive/controls";
import { cn, formatIndianNumber } from "@/lib/utils";
import { buildIncomeStatement } from "@/lib/calculations/finance";

interface WaterfallRow {
  label: string;
  value: number;
  kind: "total" | "subtract" | "subtotal";
  note?: string;
}

/** A horizontal "waterfall" showing how revenue is whittled down to net profit. */
export function MarginWaterfall() {
  const [revenue, setRevenue] = React.useState(1000);
  const [costOfGoods, setCostOfGoods] = React.useState(400);
  const [operatingExpenses, setOperatingExpenses] = React.useState(200);
  const [depreciation, setDepreciation] = React.useState(100);
  const [interest, setInterest] = React.useState(50);
  const [taxRate, setTaxRate] = React.useState(25);

  const result = buildIncomeStatement({
    revenue,
    costOfGoods,
    operatingExpenses,
    depreciation,
    interest,
    taxRatePercent: taxRate,
  });

  const rows: WaterfallRow[] = [
    { label: "Revenue", value: result.revenue, kind: "total", note: "The top line" },
    {
      label: "Cost of goods / services",
      value: result.costOfGoods,
      kind: "subtract",
    },
    {
      label: "Gross profit",
      value: result.grossProfit,
      kind: "subtotal",
      note: `${result.grossMargin === null ? "—" : `${formatIndianNumber(result.grossMargin, 1)}%`} gross margin`,
    },
    {
      label: "Operating expenses",
      value: result.operatingExpenses,
      kind: "subtract",
    },
    {
      label: "EBITDA",
      value: result.ebitda,
      kind: "subtotal",
      note: `${result.ebitdaMargin === null ? "—" : `${formatIndianNumber(result.ebitdaMargin, 1)}%`} EBITDA margin`,
    },
    {
      label: "Depreciation",
      value: result.depreciation,
      kind: "subtract",
    },
    {
      label: "EBIT (operating profit)",
      value: result.ebit,
      kind: "subtotal",
      note: `${result.operatingMargin === null ? "—" : `${formatIndianNumber(result.operatingMargin, 1)}%`} operating margin`,
    },
    { label: "Interest", value: result.interest, kind: "subtract" },
    { label: "Tax", value: result.tax, kind: "subtract" },
    {
      label: "Net profit",
      value: result.netProfit,
      kind: "subtotal",
      note: `${result.netProfitMargin === null ? "—" : `${formatIndianNumber(result.netProfitMargin, 1)}%`} net margin`,
    },
  ];

  const maxValue = Math.max(result.revenue, 1);

  return (
    <SimFrame
      title="Margin waterfall"
      description="Follow revenue down through every cost to reach net profit, and see each margin form."
      icon={<Droplets className="size-4 text-primary" />}
      footer={
        <>
          Margins are best compared with the company&apos;s own history and with close competitors.
          A 5% net margin is excellent in some industries and poor in others, so cross-industry
          comparisons mislead.
        </>
      }
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <SliderField id="mw-rev" label="Revenue" unit="₹ Cr" value={revenue} onChange={setRevenue} min={100} max={5000} step={50} />
        <SliderField id="mw-cogs" label="Cost of goods / services" unit="₹ Cr" value={costOfGoods} onChange={setCostOfGoods} min={0} max={4000} step={50} />
        <SliderField id="mw-opex" label="Operating expenses" unit="₹ Cr" value={operatingExpenses} onChange={setOperatingExpenses} min={0} max={3000} step={25} />
        <SliderField id="mw-dep" label="Depreciation" unit="₹ Cr" value={depreciation} onChange={setDepreciation} min={0} max={500} step={10} />
        <SliderField id="mw-int" label="Interest" unit="₹ Cr" value={interest} onChange={setInterest} min={0} max={500} step={10} />
        <SliderField id="mw-tax" label="Tax rate" unit="%" value={taxRate} onChange={setTaxRate} min={0} max={40} step={1} />
      </div>

      <div className="space-y-2">
        {rows.map((row) => {
          const width = Math.max(0, Math.min(100, (Math.abs(row.value) / maxValue) * 100));
          const isSubtract = row.kind === "subtract";

          return (
            <div key={row.label} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
              <div className="space-y-1">
                <div className="flex items-baseline justify-between gap-3">
                  <span
                    className={cn(
                      "text-sm",
                      row.kind === "subtotal" ? "font-semibold" : "text-muted-foreground",
                    )}
                  >
                    {row.label}
                  </span>
                  <span
                    className={cn(
                      "font-mono text-sm tabular-nums",
                      isSubtract ? "text-destructive" : row.kind === "subtotal" ? "text-foreground font-semibold" : "",
                    )}
                  >
                    {isSubtract ? "−" : ""}
                    {formatIndianNumber(Math.abs(row.value), 1)}
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      isSubtract
                        ? "bg-destructive/70"
                        : row.kind === "subtotal"
                          ? "bg-primary"
                          : "bg-chart-5",
                    )}
                    style={{ width: `${width}%` }}
                  />
                </div>
                {row.note ? (
                  <p className="text-xs text-muted-foreground">{row.note}</p>
                ) : null}
              </div>
              <span className="w-16" aria-hidden />
            </div>
          );
        })}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ResultTile label="Gross margin" value={result.grossMargin === null ? "—" : `${formatIndianNumber(result.grossMargin, 1)}%`} />
        <ResultTile label="EBITDA margin" value={result.ebitdaMargin === null ? "—" : `${formatIndianNumber(result.ebitdaMargin, 1)}%`} />
        <ResultTile label="Operating margin" value={result.operatingMargin === null ? "—" : `${formatIndianNumber(result.operatingMargin, 1)}%`} />
        <ResultTile label="Net margin" value={result.netProfitMargin === null ? "—" : `${formatIndianNumber(result.netProfitMargin, 1)}%`} emphasis />
      </div>
    </SimFrame>
  );
}

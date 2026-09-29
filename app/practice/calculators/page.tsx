import type { Metadata } from "next";

import {
  CagrCalculator,
  DebtEquityCalculator,
  DividendCalculator,
  EnterpriseValueCalculator,
  EpsCalculator,
  EvEbitdaCalculator,
  MarginCalculator,
  MarketCapCalculator,
  PbCalculator,
  PeCalculator,
  RoeCalculator,
  RoceCalculator,
} from "@/components/calculators/ratio-calculators";

export const metadata: Metadata = {
  title: "Calculators",
  description:
    "Interactive fundamental-analysis calculators with live formulas and interpretation notes.",
};

const CALCULATORS = [
  { id: "market-cap", label: "Market Capitalisation", Component: MarketCapCalculator },
  { id: "eps", label: "Earnings Per Share", Component: EpsCalculator },
  { id: "pe-ratio", label: "P/E Ratio", Component: PeCalculator },
  { id: "pb-ratio", label: "P/B Ratio", Component: PbCalculator },
  { id: "roe", label: "Return on Equity", Component: RoeCalculator },
  { id: "roce", label: "Return on Capital Employed", Component: RoceCalculator },
  { id: "debt-equity", label: "Debt to Equity", Component: DebtEquityCalculator },
  { id: "margins", label: "Profit Margins", Component: MarginCalculator },
  { id: "cagr", label: "CAGR", Component: CagrCalculator },
  { id: "dividend", label: "Dividend Yield & Payout", Component: DividendCalculator },
  { id: "enterprise-value", label: "Enterprise Value", Component: EnterpriseValueCalculator },
  { id: "ev-ebitda", label: "EV / EBITDA", Component: EvEbitdaCalculator },
];

export default function CalculatorsPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Calculators</h1>
        <p className="max-w-3xl text-muted-foreground">
          Twelve interactive calculators covering the core of fundamental analysis. Change any input
          with the slider or by typing, and every result updates immediately.
        </p>
      </header>

      <nav aria-label="Jump to calculator" className="flex flex-wrap gap-2">
        {CALCULATORS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="space-y-10">
        {CALCULATORS.map((item) => {
          const Component = item.Component;
          return (
            <section key={item.id} id={item.id} className="scroll-mt-20">
              <Component />
            </section>
          );
        })}
      </div>
    </div>
  );
}

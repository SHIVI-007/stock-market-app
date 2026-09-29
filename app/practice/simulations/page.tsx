import type { Metadata } from "next";

import {
  CompanyModel,
  InvestmentTypes,
  MarketCapSimulator,
  MarketplaceSimulator,
  MoneyFlow,
  OwnershipSimulator,
  SavingVsInvesting,
} from "@/components/interactive/core-simulators";
import { MarginWaterfall } from "@/components/interactive/margin-waterfall";
import {
  IpoSimulator,
  OrderBookSimulator,
  SupplyDemandSimulator,
  TermExplorer,
} from "@/components/interactive/market-simulators";
import {
  BalanceSheetBuilder,
  CashFlowExplorer,
  FinancialStatementsDiagram,
  IncomeStatementSimulator,
  ProfitVsCashFlowSimulator,
  WorkingCapitalSimulator,
} from "@/components/interactive/statement-simulators";
import { CorporateActionSimulator } from "@/components/interactive/analysis-tools";

export const metadata: Metadata = {
  title: "Simulations",
  description:
    "Interactive simulations of ownership, market mechanics, financial statements and cash flow.",
};

const SIMULATIONS = [
  { id: "money-flow", label: "Money flow", Component: MoneyFlow },
  { id: "saving-investing", label: "Saving vs investing", Component: SavingVsInvesting },
  { id: "investment-types", label: "Investment categories", Component: InvestmentTypes },
  { id: "company-model", label: "How a company forms", Component: CompanyModel },
  { id: "ownership", label: "Ownership & dilution", Component: OwnershipSimulator },
  { id: "marketplace", label: "Marketplace (bids & asks)", Component: MarketplaceSimulator },
  { id: "supply-demand", label: "Supply & demand", Component: SupplyDemandSimulator },
  { id: "order-book", label: "Order book", Component: OrderBookSimulator },
  { id: "market-cap", label: "Market capitalisation", Component: MarketCapSimulator },
  { id: "ipo", label: "IPO", Component: IpoSimulator },
  { id: "terms", label: "Terminology", Component: TermExplorer },
  { id: "statements", label: "The three statements", Component: FinancialStatementsDiagram },
  { id: "income-statement", label: "Income statement", Component: IncomeStatementSimulator },
  { id: "balance-sheet", label: "Balance sheet", Component: BalanceSheetBuilder },
  { id: "cash-flow", label: "Cash flow", Component: CashFlowExplorer },
  { id: "profit-vs-cash", label: "Profit vs cash flow", Component: ProfitVsCashFlowSimulator },
  { id: "margins", label: "Margin waterfall", Component: MarginWaterfall },
  { id: "working-capital", label: "Working capital", Component: WorkingCapitalSimulator },
  { id: "corporate-actions", label: "Corporate actions", Component: CorporateActionSimulator },
];

export default function SimulationsPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Simulations</h1>
        <p className="max-w-3xl text-muted-foreground">
          Every simulation uses hypothetical numbers. Their purpose is to make a concept concrete —
          not to predict anything about real markets.
        </p>
      </header>

      <nav aria-label="Jump to simulation" className="flex flex-wrap gap-2">
        {SIMULATIONS.map((item) => (
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
        {SIMULATIONS.map((item) => {
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

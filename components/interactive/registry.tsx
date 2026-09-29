import type { InteractiveKey } from "@/lib/learning/types";

import { EconomicFactorsExplorer, BusinessModelExplorer, AnalysisProcess, RedFlagsExplorer, CaseStudySimulator, CorporateActionSimulator } from "@/components/interactive/analysis-tools";
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
  AccountStructureDiagram,
  ExchangeDiagram,
  MarketStructureDiagram,
} from "@/components/diagrams/flow-diagrams";
import {
  BalanceSheetBuilder,
  CashFlowExplorer,
  FinancialStatementsDiagram,
  IncomeStatementSimulator,
  ProfitVsCashFlowSimulator,
  WorkingCapitalSimulator,
} from "@/components/interactive/statement-simulators";
import {
  CagrCalculator,
  DebtEquityCalculator,
  DividendCalculator,
  EnterpriseValueCalculator,
  EpsCalculator,
  EvEbitdaCalculator,
  MarketCapCalculator,
  MarginCalculator,
  PbCalculator,
  PeCalculator,
  RoeCalculator,
  RoceCalculator,
} from "@/components/calculators/ratio-calculators";

/**
 * Maps a lesson's `interactive` key to the component that implements it.
 * Keeping this in one place means lesson content stays plain data.
 */
export const interactiveRegistry: Record<InteractiveKey, React.ComponentType> = {
  MoneyFlow,
  SavingVsInvesting,
  InvestmentTypes,
  CompanyModel,
  OwnershipSimulator,
  MarketplaceSimulator,
  ExchangeDiagram,
  MarketStructureDiagram,
  AccountStructureDiagram,
  IpoSimulator,
  SupplyDemandSimulator,
  OrderBookSimulator,
  TermExplorer,
  MarketCapCalculator,
  FinancialStatementsDiagram,
  IncomeStatementSimulator,
  BalanceSheetBuilder,
  CashFlowExplorer,
  ProfitVsCashFlowSimulator,
  EpsCalculator,
  PeCalculator,
  PbCalculator,
  RoeCalculator,
  RoceCalculator,
  DebtEquityCalculator,
  MarginWaterfall,
  CagrCalculator,
  DividendCalculator,
  CorporateActionSimulator,
  EnterpriseValueCalculator,
  EvEbitdaCalculator,
  WorkingCapitalSimulator,
  EconomicFactorsExplorer,
  BusinessModelExplorer,
  AnalysisProcess,
  RedFlagsExplorer,
  CaseStudySimulator,
};

/** Extra interactive pieces that are not referenced from lesson data. */
export const extraInteractive = {
  MarketCapSimulator,
  MarginCalculator,
} as const;

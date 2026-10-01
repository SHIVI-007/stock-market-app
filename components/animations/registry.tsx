import type { ConceptAnimationKey } from "@/lib/learning/types";

import {
  BusinessLoop,
  CompanyJourney,
  HowCostsBehave,
  ProfitLayers,
  WhenRevenueLands,
  WhyCapital,
} from "./company-basics";
import { CompoundingOverTime } from "./compounding";
import { OrderJourney, WhyMarketsExist } from "./marketplace";
import { MoneyJourney } from "./money-journey";
import { OwnershipOrLending } from "./ownership-or-lending";
import { WhatMovesPrices } from "./price-movement";
import { IpoJourney, PrimaryVsSecondary } from "./raising-capital";
import { DilutionSlices, OwnershipSlices } from "./shares";

/**
 * Maps a lesson's animation key to the component that plays it.
 *
 * Mirrors `components/interactive/registry.tsx`: lesson content stays plain
 * data, and the key is resolved to a component at render time.
 */
export const animationRegistry: Record<ConceptAnimationKey, React.ComponentType> = {
  MoneyJourney,
  CompoundingOverTime,
  OwnershipOrLending,
  CompanyJourney,
  BusinessLoop,
  WhenRevenueLands,
  HowCostsBehave,
  ProfitLayers,
  WhyCapital,
  OwnershipSlices,
  DilutionSlices,
  WhyMarketsExist,
  OrderJourney,
  IpoJourney,
  PrimaryVsSecondary,
  WhatMovesPrices,
};

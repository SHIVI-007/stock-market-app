import type { Metadata } from "next";

import { CaseStudySimulator, RedFlagsExplorer, AnalysisProcess, BusinessModelExplorer } from "@/components/interactive/analysis-tools";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Practise fundamental analysis on a fictional Indian company and learn to form an independent view.",
};

export default function CaseStudiesPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Case Studies</h1>
        <p className="max-w-3xl text-muted-foreground">
          This is where the concepts come together. Work through a fictional company&apos;s numbers,
          ask the right questions, and form your own view. There are no buy/sell answers here — only
          calculations and observations.
        </p>
      </header>

      <CaseStudySimulator />

      <section className="grid gap-8 lg:grid-cols-2">
        <BusinessModelExplorer />
        <AnalysisProcess />
      </section>

      <RedFlagsExplorer />
    </div>
  );
}

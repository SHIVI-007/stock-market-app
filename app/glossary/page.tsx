import type { Metadata } from "next";

import { GlossaryBrowser } from "@/components/learning/glossary-browser";
import { glossary } from "@/lib/learning/glossary";

export const metadata: Metadata = {
  title: "Glossary",
  description:
    "A searchable glossary of stock-market and fundamental-analysis terms, with formulas and examples.",
};

export default function GlossaryPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Glossary</h1>
        <p className="max-w-3xl text-muted-foreground">
          {glossary.length} terms explained in plain English, with formulas and worked examples where
          they help.
        </p>
      </header>

      <GlossaryBrowser />
    </div>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Calculator, FlaskConical, Search } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Practice",
  description:
    "Interactive calculators, simulators and case studies for practising stock-market fundamentals.",
};

const SECTIONS = [
  {
    href: "/practice/calculators",
    title: "Calculators",
    icon: Calculator,
    description:
      "Twelve interactive calculators — market cap, EPS, P/E, P/B, ROE, ROCE, debt/equity, margins, CAGR, dividends, EV and EV/EBITDA.",
    bullets: [
      "Change any input and the result updates instantly",
      "Every formula is shown alongside the numbers",
      "Context notes explain how to interpret each result",
    ],
  },
  {
    href: "/practice/simulations",
    title: "Simulations",
    icon: FlaskConical,
    description:
      "Explore how ownership, market pressure, order books, financial statements and cash flow actually behave.",
    bullets: [
      "Ownership and dilution simulator",
      "Supply, demand and order-book mechanics",
      "Income statement, balance sheet and cash flow builders",
    ],
  },
  {
    href: "/practice/case-studies",
    title: "Case Studies",
    icon: Search,
    description:
      "Work through a fictional Indian company and practise forming your own independent view.",
    bullets: [
      "A three-year data set with revenue, debt and cash flow",
      "Guided investigation questions with educational feedback",
      "No buy/sell conclusion — the reasoning is the point",
    ],
  },
];

export default function PracticePage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Practice</h1>
        <p className="max-w-3xl text-muted-foreground">
          Fundamentals are learned by doing. Use these tools to manipulate numbers, watch what
          changes, and build intuition — with hypothetical data throughout.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        {SECTIONS.map((section) => {
          const Icon = section.icon;
          return (
            <Card key={section.href} className="flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Icon className="size-5 text-primary" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-4">
                <p className="text-sm text-muted-foreground">{section.description}</p>
                <ul className="space-y-1.5">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <Link
                  href={section.href}
                  className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "mt-auto self-start")}
                >
                  Open {section.title}
                  <ArrowRight className="size-3.5" />
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

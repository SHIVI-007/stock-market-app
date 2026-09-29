"use client";

import * as React from "react";
import { Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { glossary, glossaryCategories } from "@/lib/learning/glossary";
import type { GlossaryCategory } from "@/lib/learning/types";

export function GlossaryBrowser() {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<GlossaryCategory | "All">("All");

  const results = React.useMemo(() => {
    const needle = query.trim().toLowerCase();

    return glossary
      .filter((entry) => category === "All" || entry.category === category)
      .filter((entry) => {
        if (!needle) return true;
        return [entry.term, entry.definition, entry.formula ?? "", entry.example ?? ""]
          .join(" ")
          .toLowerCase()
          .includes(needle);
      })
      .sort((a, b) => a.term.localeCompare(b.term));
  }, [query, category]);

  return (
    <div className="space-y-6">
      {/* Search + filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search terms, e.g. P/E, dividend, cash flow…"
            className="pl-9"
            aria-label="Search the glossary"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {(["All", ...glossaryCategories] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item as GlossaryCategory | "All")}
              aria-pressed={category === item}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                category === item
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {item}
            </button>
          ))}
        </div>

        <p className="text-xs text-muted-foreground">
          {results.length} {results.length === 1 ? "term" : "terms"}
        </p>
      </div>

      {/* Results */}
      {results.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          No terms match “{query}”. Try a different search.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {results.map((entry) => (
            <Card key={entry.slug} id={entry.slug} className="scroll-mt-20">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="text-base">{entry.term}</CardTitle>
                  <Badge variant="outline">{entry.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{entry.definition}</p>

                {entry.formula ? (
                  <div className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 font-mono text-xs text-primary">
                    {entry.formula}
                  </div>
                ) : null}

                {entry.example ? (
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">Example: </span>
                    {entry.example}
                  </p>
                ) : null}

                {entry.related && entry.related.length > 0 ? (
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">Related: </span>
                    {entry.related.join(", ")}
                  </p>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

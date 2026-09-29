"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  value: string;
  label: string;
  content: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  defaultValue?: string;
  className?: string;
}

/**
 * A compact, controlled-from-within tabs component. Uses real buttons with
 * correct ARIA roles so it stays keyboard accessible.
 */
export function Tabs({ items, defaultValue, className }: TabsProps) {
  const [active, setActive] = React.useState(defaultValue ?? items[0]?.value);
  const activeItem = items.find((item) => item.value === active) ?? items[0];

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div
        role="tablist"
        aria-orientation="horizontal"
        className="flex flex-wrap gap-1 rounded-xl border border-border bg-muted/50 p-1"
      >
        {items.map((item) => {
          const isActive = item.value === activeItem?.value;
          return (
            <button
              key={item.value}
              role="tab"
              type="button"
              aria-selected={isActive}
              onClick={() => setActive(item.value)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isActive
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <div role="tabpanel" className="animate-fade-in-up">
        {activeItem?.content}
      </div>
    </div>
  );
}

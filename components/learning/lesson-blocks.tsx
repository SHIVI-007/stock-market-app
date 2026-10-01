import * as React from "react";

import { Callout } from "@/components/learning/concept-card";
import { animationRegistry } from "@/components/animations/registry";
import { interactiveRegistry } from "@/components/interactive/registry";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { LessonBlock } from "@/lib/learning/types";

/**
 * Renders the authored lesson blocks. Static blocks render on the server; the
 * interactive ones resolve to client components via the registry.
 */
export function LessonBlocks({ blocks }: { blocks: LessonBlock[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </div>
  );
}

function Block({ block }: { block: LessonBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p className="leading-relaxed text-foreground/90">{block.text}</p>;

    case "heading":
      return (
        <h3 className="pt-2 text-xl font-semibold tracking-tight">{block.text}</h3>
      );

    case "bullets":
      return (
        <ul className="list-disc space-y-1.5 pl-5 text-foreground/90">
          {block.items.map((item) => (
            <li key={item} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      );

    case "numbered":
      return (
        <ol className="list-decimal space-y-1.5 pl-5 text-foreground/90">
          {block.items.map((item) => (
            <li key={item} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ol>
      );

    case "callout":
      return (
        <Callout variant={block.variant ?? "info"} title={block.title}>
          {block.text}
        </Callout>
      );

    case "formula":
      return (
        <div className="rounded-xl border border-primary/30 bg-primary/10 p-4">
          <p className="font-mono text-sm text-primary sm:text-base">{block.expression}</p>
          {block.note ? (
            <p className="mt-2 text-xs text-muted-foreground">{block.note}</p>
          ) : null}
        </div>
      );

    case "table":
      return (
        <div className="space-y-2">
          <Table>
            <TableHeader>
              <TableRow>
                {block.headers.map((header) => (
                  <TableHead key={header}>{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {block.rows.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <TableCell
                      key={cellIndex}
                      className={cellIndex === 0 ? "font-medium" : "text-muted-foreground"}
                    >
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {block.caption ? (
            <p className="text-xs text-muted-foreground">{block.caption}</p>
          ) : null}
        </div>
      );

    case "steps":
      return (
        <ol className="space-y-3">
          {block.items.map((item, stepIndex) => (
            <li key={item.title} className="flex gap-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                {stepIndex + 1}
              </span>
              <span>
                <span className="block text-sm font-semibold">{item.title}</span>
                <span className="block text-sm text-muted-foreground">{item.text}</span>
              </span>
            </li>
          ))}
        </ol>
      );

    case "kv":
      return (
        <dl className="grid gap-3 sm:grid-cols-2">
          {block.items.map((item) => (
            <div key={item.label} className="rounded-lg border border-border bg-muted/30 p-3">
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {item.label}
              </dt>
              <dd className="mt-1 text-sm">{item.value}</dd>
            </div>
          ))}
        </dl>
      );

    case "animation": {
      const Animation = animationRegistry[block.key];
      if (!Animation) return null;

      return (
        <figure className="space-y-2">
          <Animation />
          {block.caption ? (
            <figcaption className="text-center text-xs text-muted-foreground">
              {block.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    }

    case "interactive": {
      const Component = interactiveRegistry[block.key];
      if (!Component) return null;

      return (
        <figure className="space-y-2">
          <Component />
          {block.caption ? (
            <figcaption className="text-center text-xs text-muted-foreground">
              {block.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    }

    default:
      return null;
  }
}

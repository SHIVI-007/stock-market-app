import * as React from "react";

import { cn } from "@/lib/utils";

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

/**
 * Determined values (not random) so the server and client render identically —
 * no hydration mismatch, and the burst looks the same every time.
 */
const PARTICLES = Array.from({ length: 18 }, (_, index) => {
  const spread = (index - 8.5) / 8.5; // -1 … 1
  return {
    x: Math.round(spread * 140),
    y: 110 + (index % 5) * 24,
    rotation: (index % 2 === 0 ? 1 : -1) * (160 + index * 14),
    color: COLORS[index % COLORS.length],
    delay: (index % 6) * 45,
    duration: 900 + (index % 5) * 90,
    size: index % 3 === 0 ? 8 : 6,
  };
});

/**
 * A small, dependency-free confetti burst for celebratory moments
 * (completing a lesson, earning an achievement).
 */
export function Celebrate({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 flex justify-center overflow-visible",
        className,
      )}
    >
      {PARTICLES.map((particle, index) => (
        <span
          key={index}
          className="absolute block rounded-[2px]"
          style={
            {
              backgroundColor: particle.color,
              width: particle.size,
              height: particle.size,
              "--confetti-x": `${particle.x}px`,
              "--confetti-y": `${particle.y}px`,
              "--confetti-rot": `${particle.rotation}deg`,
              animation: `confetti-fall ${particle.duration}ms ease-out ${particle.delay}ms both`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

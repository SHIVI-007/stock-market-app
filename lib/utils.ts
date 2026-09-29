/**
 * Tiny class-name combiner (a dependency-free stand-in for `clsx`).
 * Accepts strings, arrays, and conditional objects so components can compose
 * Tailwind classes ergonomically.
 */
export type ClassValue =
  | string
  | number
  | null
  | false
  | undefined
  | ClassValue[]
  | { [key: string]: boolean | null | undefined };

export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  for (const input of inputs) {
    if (!input) continue;

    if (typeof input === "string" || typeof input === "number") {
      classes.push(String(input));
      continue;
    }

    if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) classes.push(nested);
      continue;
    }

    if (typeof input === "object") {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key);
      }
    }
  }

  return classes.join(" ");
}

/**
 * Format a number as Indian Rupees using the Indian digit grouping
 * (lakh / crore), e.g. 12345678 -> ₹1,23,45,678.
 */
export function formatINR(value: number, maximumFractionDigits = 0): string {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits,
  }).format(value);
}

/**
 * Format a plain number with Indian digit grouping (no currency symbol).
 */
export function formatIndianNumber(value: number, maximumFractionDigits = 0): string {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits,
  }).format(value);
}

/**
 * Convert a value expressed in "Crore" into a human readable string.
 * 1 Crore = 10,000,000.
 */
export function formatCrore(valueInCrore: number, fractionDigits = 2): string {
  if (!Number.isFinite(valueInCrore)) return "—";
  return `₹${new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: fractionDigits,
  }).format(valueInCrore)} Cr`;
}

/** Clamp a number between a minimum and maximum. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Round to a fixed number of decimals, returning a number (not a string). */
export function round(value: number, decimals = 2): number {
  if (!Number.isFinite(value)) return 0;
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

/**
 * Safe division that returns `fallback` instead of Infinity / NaN.
 */
export function safeDivide(numerator: number, denominator: number, fallback = 0): number {
  if (!denominator || !Number.isFinite(denominator) || !Number.isFinite(numerator)) {
    return fallback;
  }
  return numerator / denominator;
}

"use client";

import * as React from "react";

/**
 * `false` while the app is server-rendered and on the browser's first —
 * hydrating — render, then `true` once React owns the page.
 *
 * It exists so that attributes which are routinely rewritten in the browser can
 * be kept out of the server's markup. The boolean `disabled` is the usual
 * offender: extensions and translation tools add or strip it before React
 * hydrates, and React then reports a mismatch for an attribute the server and
 * the client both agreed on. Deferring the attribute until after hydration
 * avoids that, without silencing the warning with `suppressHydrationWarning`.
 *
 * `useSyncExternalStore` is what makes the "current" snapshot differ from the
 * "server" one without setting state from an effect: React reads `false` while
 * hydrating, then re-renders once because `true` no longer matches.
 */

/** Nothing outside React changes this value, so there is nothing to subscribe to. */
const neverChanges = () => () => {};
const browserSnapshot = () => true;
const serverSnapshot = () => false;

export function useHydrated(): boolean {
  return React.useSyncExternalStore(neverChanges, browserSnapshot, serverSnapshot);
}

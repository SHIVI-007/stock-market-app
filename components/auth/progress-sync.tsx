"use client";

import * as React from "react";

import { useSession } from "@/components/auth/session-provider";
import { useProgress } from "@/lib/progress/progress-provider";
import { getLessons, mergeServerProgress } from "@/lib/progress/progress-store";
import type { LessonProgressRecord } from "@/lib/learning/types";

/** How long to wait after the last change before sending progress to the server. */
const PUSH_DEBOUNCE_MS = 800;

function postProgress(body: string, keepalive: boolean): void {
  void fetch("/api/progress", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body,
    keepalive,
  }).catch(() => undefined);
}

/**
 * Keeps browser progress and the learner's account in step.
 *
 * - **Pull:** once per signed-in learner, fetch saved progress and merge it in
 *   (a union, so nothing is lost).
 * - **Push:** after any local change, debounce briefly and upload the whole map.
 * - **Flush:** anything still pending is sent when the tab is hidden, when the
 *   page is being unloaded, or when this component unmounts — so finishing a
 *   quiz and immediately navigating away can never lose the score.
 *
 * Every network call is best-effort: the app is fully usable offline and when
 * signed out.
 */
export function ProgressSync() {
  const { user, ready } = useSession();
  const { lessons } = useProgress();

  const hydratedFor = React.useRef<string | null>(null);
  const lastSyncedPayload = React.useRef<string | null>(null);
  const pending = React.useRef<{ payload: string; body: string } | null>(null);

  // ---- Pull -------------------------------------------------------------
  React.useEffect(() => {
    if (!ready) return;

    if (!user) {
      hydratedFor.current = null;
      lastSyncedPayload.current = null;
      pending.current = null;
      return;
    }

    if (hydratedFor.current === user.id) return;
    hydratedFor.current = user.id;

    let cancelled = false;

    void (async () => {
      try {
        const response = await fetch("/api/progress", { cache: "no-store" });
        if (!response.ok || cancelled) return;

        const data = (await response.json()) as { lessons?: LessonProgressRecord[] };
        if (cancelled) return;

        mergeServerProgress(data.lessons ?? []);
        // Whatever the store now holds is considered already saved.
        lastSyncedPayload.current = JSON.stringify(getLessons());
      } catch {
        // Offline: keep using local progress.
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [ready, user]);

  // ---- Note what still needs sending -----------------------------------
  React.useEffect(() => {
    if (!ready || !user) {
      pending.current = null;
      return;
    }

    const payload = JSON.stringify(lessons);
    if (payload === lastSyncedPayload.current) {
      pending.current = null;
      return;
    }

    pending.current = {
      payload,
      body: JSON.stringify({ lessons: Object.values(lessons) }),
    };
  }, [lessons, ready, user]);

  // ---- Debounced send while the learner stays on the page --------------
  React.useEffect(() => {
    if (!ready || !user || !pending.current) return;

    const timer = window.setTimeout(() => {
      const item = pending.current;
      if (!item) return;
      lastSyncedPayload.current = item.payload;
      pending.current = null;
      postProgress(item.body, false);
    }, PUSH_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [lessons, ready, user]);

  // ---- Flush on hide / unload / unmount --------------------------------
  React.useEffect(() => {
    if (!user) return;

    const flush = () => {
      const item = pending.current;
      if (!item) return;
      lastSyncedPayload.current = item.payload;
      pending.current = null;
      postProgress(item.body, true);
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") flush();
    };

    window.addEventListener("pagehide", flush);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.removeEventListener("pagehide", flush);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      // Covers client-side navigation, where the page is never unloaded.
      flush();
    };
  }, [user]);

  return null;
}

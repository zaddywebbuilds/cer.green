'use client';

import { useEffect, useRef, useState } from 'react';

/** How long to wait for the observer to report before assuming it never will. */
const OBSERVER_GRACE_MS = 1200;

/**
 * Tracks whether an element is near the viewport.
 *
 * Two separate flags, because they do different jobs:
 *
 *   `hasEntered` latches true the first time the element comes near and never
 *   resets. Callers gate an expensive fetch on it, so nothing heavy is pulled
 *   until it is actually approaching -- the methodology stage videos sit far
 *   below the fold and would otherwise attach several megabytes to first paint.
 *
 *   `isVisible` tracks the current state, for callers that want to stop work
 *   while the element is off screen.
 *
 * The grace timer matters more than it looks. IntersectionObserver can exist and
 * still never deliver a callback -- headless renderers, some embedded webviews
 * and screenshot pipelines all do this, and it was reproducible in the preview
 * pane during development. Without a fallback the gate never opens and the
 * gated content silently disappears, which is a worse outcome than loading it
 * eagerly. So if nothing has been reported by the time the timer fires, it
 * loads anyway: this degrades to always-on rather than to a blank slot.
 */
export function useInView<T extends HTMLElement>(rootMargin = '200px') {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let reported = false;
    let observer: IntersectionObserver | undefined;

    // A missing IntersectionObserver is handled by the same grace timer as one
    // that never reports, rather than by setting state here -- initial state
    // must stay false to match what the server rendered.
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry) return;
          reported = true;
          setIsVisible(entry.isIntersecting);
          if (entry.isIntersecting) setHasEntered(true);
        },
        { rootMargin },
      );
      observer.observe(el);
    }

    const fallback = window.setTimeout(() => {
      if (reported) return;
      setIsVisible(true);
      setHasEntered(true);
    }, OBSERVER_GRACE_MS);

    return () => {
      window.clearTimeout(fallback);
      observer?.disconnect();
    };
  }, [rootMargin]);

  return { ref, isVisible, hasEntered };
}

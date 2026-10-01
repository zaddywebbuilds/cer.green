// No 'use client' directive -- see the note in useWebGL.ts.
import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

/**
 * Whether the visitor has asked for reduced motion.
 *
 * `useSyncExternalStore` rather than an effect writing state: matchMedia is an
 * external store, and reading it this way means the first client render already
 * has the right answer instead of animating for a frame and then stopping.
 *
 * The server snapshot is `false` so the markup matches what a visitor with no
 * preference gets; the real value arrives on the first client render.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

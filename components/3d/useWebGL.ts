// No 'use client' directive: this module is an implementation detail of the
// scene components, which are already inside the client graph. Marking it would
// open a second client-reference boundary and the exported hook would arrive as
// a proxy rather than a callable function.
import { useSyncExternalStore } from 'react';

let cached: boolean | undefined;

/**
 * Probes once per page load, not once per scene. Four scenes each creating a
 * throwaway probe canvas is four contexts the browser has to allocate and tear
 * down before any of them draws anything.
 */
function hasWebGL(): boolean {
  if (cached === undefined) {
    try {
      const canvas = document.createElement('canvas');
      cached = Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'));
    } catch {
      cached = false;
    }
  }
  return cached;
}

/** No updates to subscribe to -- WebGL support does not change mid-session. */
function subscribe() {
  return () => {};
}

/**
 * Whether this browser can render WebGL. Scenes return null when it cannot, so
 * a device without it gets the page with no decorative layer rather than a
 * broken canvas.
 */
export function useWebGL(): boolean {
  return useSyncExternalStore(subscribe, hasWebGL, () => false);
}

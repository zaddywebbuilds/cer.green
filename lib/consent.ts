'use client';

/**
 * Cookie consent store.
 *
 * Consent lives in `localStorage`, which is an external system, so it is
 * exposed through the `useSyncExternalStore` contract rather than mirrored into
 * component state inside an effect. That avoids the cascading render React 19
 * warns about, and it keeps the banner and the analytics loader reading from
 * one source that cannot drift.
 *
 * `getSnapshot` must return a stable reference between changes or React will
 * re-render forever, so the parsed value is cached and only replaced when the
 * stored string actually changes.
 */

export interface ConsentState {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  /** ISO timestamp, so stale consent can be re-requested later. */
  decidedAt: string;
}

const STORAGE_KEY = 'cer_cookie_consent';

const listeners = new Set<() => void>();

let cachedRaw: string | null = null;
let cachedValue: ConsentState | null = null;

function readRaw(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    // Private browsing modes can throw on access. Treat as no decision.
    return null;
  }
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);

  // Consent set in another tab should take effect here too.
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) listener();
  };
  window.addEventListener('storage', onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
}

export function getSnapshot(): ConsentState | null {
  const raw = readRaw();
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      cachedValue = raw ? (JSON.parse(raw) as ConsentState) : null;
    } catch {
      cachedValue = null;
    }
  }
  return cachedValue;
}

/** The server knows nothing about a visitor's choice. */
export function getServerSnapshot(): ConsentState | null {
  return null;
}

export function setConsent(next: { analytics: boolean; marketing: boolean }): void {
  const state: ConsentState = {
    necessary: true,
    ...next,
    decidedAt: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage unavailable: the banner will simply reappear on the next visit.
  }
  for (const listener of listeners) listener();
}

/** Opens the preferences panel from elsewhere, e.g. the cookie policy page. */
export const OPEN_PREFERENCES_EVENT = 'cer:open-cookie-preferences';

export function openCookiePreferences(): void {
  window.dispatchEvent(new CustomEvent(OPEN_PREFERENCES_EVENT));
}

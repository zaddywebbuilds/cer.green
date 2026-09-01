'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import {
  OPEN_PREFERENCES_EVENT,
  getServerSnapshot,
  getSnapshot,
  setConsent,
  subscribe,
} from '@/lib/consent';

/**
 * Consent management.
 *
 * Analytics and marketing tags do not fire until consent is recorded. Accept
 * and reject carry equal visual weight -- no pattern where rejecting is hidden
 * behind an extra screen -- and preferences can be reopened at any time from
 * the cookie policy page.
 *
 * Stored consent is read through `useSyncExternalStore` rather than copied into
 * state inside an effect, so the banner and `Analytics.tsx` always agree.
 */
export function CookieBanner() {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const [reopened, setReopened] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // The banner shows when no decision exists, or when the visitor reopens it.
  const visible = consent === null || reopened;

  useEffect(() => {
    const onOpen = () => {
      const current = getSnapshot();
      setAnalytics(current?.analytics ?? false);
      setMarketing(current?.marketing ?? false);
      setShowPreferences(true);
      setReopened(true);
    };
    window.addEventListener(OPEN_PREFERENCES_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (visible) headingRef.current?.focus();
  }, [visible]);

  if (!visible) return null;

  const decide = (next: { analytics: boolean; marketing: boolean }) => {
    setConsent(next);
    setReopened(false);
    setShowPreferences(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-heading"
      className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-line-invert bg-forest text-white on-dark"
      data-surface="dark"
    >
      <div className="shell py-6">
        <h2
          id="cookie-banner-heading"
          ref={headingRef}
          tabIndex={-1}
          className="font-heading text-h4 font-semibold"
        >
          Cookies on this site
        </h2>
        <p className="mt-2 max-w-[70ch] text-sm text-muted-invert">
          We use necessary cookies to make this site work. We would also like to set analytics
          cookies to understand how the site is used. Nothing beyond the necessary cookies is set
          without your agreement.{' '}
          <Link href="/cookie-policy/" className="underline underline-offset-4 hover:text-white">
            Read the cookie policy
          </Link>
          .
        </p>

        {showPreferences ? (
          <fieldset className="mt-5 flex flex-col gap-3 border-t border-line-invert pt-5">
            <legend className="sr-only">Cookie preferences</legend>

            <div className="flex items-start gap-3">
              <input
                id="consent-necessary"
                type="checkbox"
                checked
                disabled
                className="mt-1 h-4 w-4 accent-[--color-lime]"
              />
              <label htmlFor="consent-necessary" className="text-sm">
                <span className="font-semibold">Necessary</span>
                <span className="block text-muted-invert">
                  Required for the site to function. Always on.
                </span>
              </label>
            </div>

            <div className="flex items-start gap-3">
              <input
                id="consent-analytics"
                type="checkbox"
                checked={analytics}
                onChange={(event) => setAnalytics(event.target.checked)}
                className="mt-1 h-4 w-4 accent-[--color-lime]"
              />
              <label htmlFor="consent-analytics" className="text-sm">
                <span className="font-semibold">Analytics</span>
                <span className="block text-muted-invert">
                  Helps us understand which pages are useful. No form field values are collected.
                </span>
              </label>
            </div>

            <div className="flex items-start gap-3">
              <input
                id="consent-marketing"
                type="checkbox"
                checked={marketing}
                onChange={(event) => setMarketing(event.target.checked)}
                className="mt-1 h-4 w-4 accent-[--color-lime]"
              />
              <label htmlFor="consent-marketing" className="text-sm">
                <span className="font-semibold">Marketing</span>
                <span className="block text-muted-invert">
                  Used to measure the effect of campaigns.
                </span>
              </label>
            </div>
          </fieldset>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => decide({ analytics: true, marketing: true })}
            className="inline-flex min-h-11 items-center justify-center rounded-[3px] bg-lime px-5 font-heading text-[0.95rem] font-semibold text-forest-900 hover:bg-white"
          >
            Accept all
          </button>
          <button
            type="button"
            onClick={() => decide({ analytics: false, marketing: false })}
            className="inline-flex min-h-11 items-center justify-center rounded-[3px] border border-white/40 px-5 font-heading text-[0.95rem] font-semibold text-white hover:bg-white hover:text-forest"
          >
            Reject non-essential
          </button>
          {showPreferences ? (
            <button
              type="button"
              onClick={() => decide({ analytics, marketing })}
              className="inline-flex min-h-11 items-center justify-center rounded-[3px] border border-white/40 px-5 font-heading text-[0.95rem] font-semibold text-white hover:bg-white hover:text-forest"
            >
              Save preferences
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowPreferences(true)}
              className="inline-flex min-h-11 items-center justify-center px-2 font-heading text-[0.95rem] font-semibold text-lime underline underline-offset-4 hover:text-white"
            >
              Manage preferences
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

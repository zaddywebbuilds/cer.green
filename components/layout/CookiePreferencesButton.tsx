'use client';

import { openCookiePreferences } from '@/lib/consent';

/** Reopens the consent panel from the cookie policy page. */
export function CookiePreferencesButton() {
  return (
    <button
      type="button"
      onClick={openCookiePreferences}
      className="mt-6 inline-flex min-h-12 items-center rounded-[3px] bg-forest px-6 font-heading font-semibold text-white hover:bg-forest-500"
    >
      Manage cookie preferences
    </button>
  );
}

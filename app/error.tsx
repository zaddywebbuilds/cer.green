'use client';

import { useEffect } from 'react';
import Link from 'next/link';

/**
 * Route-level error boundary.
 *
 * Shows a branded, useful message and a retry. It never renders the error
 * message or stack to the visitor -- those go to the server log only, because a
 * stack trace on a public page is an information disclosure.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[render error]', error.digest ?? error.message);
  }, [error]);

  return (
    <section className="bg-ivory py-(--spacing-section)" data-surface="light">
      <div className="shell max-w-2xl">
        <p className="eyebrow text-lime-ink">Something went wrong</p>
        <h1 className="mt-5 text-h2">This page didn&rsquo;t load properly.</h1>
        <p className="mt-6 text-lead text-ink-700">
          The problem has been logged. Trying again often resolves it; if it does not, the routes
          below will still work.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-12 items-center rounded-[3px] bg-forest px-6 font-heading font-semibold text-white hover:bg-forest-500"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex min-h-12 items-center rounded-[3px] border border-forest/25 px-6 font-heading font-semibold text-forest hover:border-forest"
          >
            Go to the homepage
          </Link>
          <Link
            href="/contact/"
            className="inline-flex min-h-12 items-center rounded-[3px] border border-forest/25 px-6 font-heading font-semibold text-forest hover:border-forest"
          >
            Contact CER
          </Link>
        </div>

        {error.digest ? (
          <p className="mt-8 text-sm text-muted">
            If you contact us about this, quote reference {error.digest}.
          </p>
        ) : null}
      </div>
    </section>
  );
}

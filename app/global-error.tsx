'use client';

/**
 * Root error boundary.
 *
 * Replaces the whole document when the root layout itself fails, so it must
 * render its own html and body and cannot rely on any shared styling. Kept
 * deliberately self-contained with inline styles for that reason.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en-SG">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          padding: '2rem',
          background: '#F6F4EE',
          color: '#161A18',
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        }}
      >
        <main style={{ maxWidth: '34rem' }}>
          <p
            style={{
              margin: 0,
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 600,
              color: '#556F13',
            }}
          >
            CER
          </p>
          <h1 style={{ marginTop: '1rem', fontSize: '2rem', lineHeight: 1.15 }}>
            Something went wrong.
          </h1>
          <p style={{ marginTop: '1rem', lineHeight: 1.6, color: '#2A312E' }}>
            The page could not be displayed. The problem has been logged.
          </p>
          <div style={{ marginTop: '2rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={reset}
              style={{
                minHeight: '3rem',
                padding: '0 1.5rem',
                border: 0,
                borderRadius: 3,
                background: '#123C32',
                color: '#fff',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Try again
            </button>
            {/* A plain anchor, not next/link: this boundary replaces the root
                layout, so a full document load is the reliable way out. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              style={{
                minHeight: '3rem',
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0 1.5rem',
                borderRadius: 3,
                border: '1px solid rgba(18,60,50,0.25)',
                color: '#123C32',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Go to the homepage
            </a>
          </div>
          {error.digest ? (
            <p style={{ marginTop: '2rem', fontSize: '0.875rem', color: '#4E5C56' }}>
              Reference {error.digest}
            </p>
          ) : null}
        </main>
      </body>
    </html>
  );
}

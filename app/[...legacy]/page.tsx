import type { Metadata } from 'next';
import Link from 'next/link';

import { Section } from '@/components/ui/primitives';
import { redirects, gonePaths } from '@/lib/redirects';
import { site } from '@/lib/site';

/**
 * Legacy URL handler.
 *
 * `lib/redirects.ts` maps every old cer.green URL to its new home, but this site
 * builds with `output: 'export'`. A static host serves files; it cannot run
 * `next.config` redirects or middleware, so that map had no runtime and the
 * migration it describes would not have happened on deploy.
 *
 * This route gives it one. `generateStaticParams` emits a real HTML file at each
 * legacy path, so the redirect ships as part of the static bundle.
 *
 * Redirect pages carry a zero-delay meta refresh plus a canonical pointing at
 * the destination. Google treats that pairing as a permanent redirect and passes
 * the ranking signal on, which is the whole reason the map exists -- so these
 * pages must NOT be noindex. Marking them noindex would strand the signal.
 *
 * Gone pages are the opposite case: workflow screens and upload steps that were
 * indexed on the old site and should leave the index. A static host cannot
 * return 410, so they ship as noindex pages that state plainly that the page is
 * gone and route the visitor somewhere useful.
 */

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** Splits a site-relative path into the segments the catch-all matches on. */
function toSegments(path: string): string[] {
  return path.replace(/^\/+|\/+$/g, '').split('/');
}

const redirectBySource = new Map(
  redirects.map((r) => [r.source.replace(/^\/+|\/+$/g, ''), r.destination]),
);

const gonePathSet = new Set(gonePaths.exact.map((p) => p.replace(/^\/+|\/+$/g, '')));

export function generateStaticParams() {
  const paths = [
    ...redirects.map((r) => r.source),
    ...gonePaths.exact,
  ];
  return paths.map((path) => ({ legacy: toSegments(path) }));
}

type Params = { legacy: string[] };

function resolve(segments: string[]) {
  const key = segments.join('/');
  const destination = redirectBySource.get(key);
  if (destination) return { kind: 'redirect' as const, destination };
  if (gonePathSet.has(key)) return { kind: 'gone' as const };
  return { kind: 'gone' as const };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { legacy } = await params;
  const result = resolve(legacy);

  if (result.kind === 'redirect') {
    return {
      title: 'Redirecting',
      alternates: { canonical: `${site.url}${result.destination}` },
      robots: { index: true, follow: true },
    };
  }

  return {
    title: 'Page no longer available',
    robots: { index: false, follow: false, nocache: true },
  };
}

export default async function LegacyPage({ params }: { params: Promise<Params> }) {
  const { legacy } = await params;
  const result = resolve(legacy);

  if (result.kind === 'redirect') {
    const target = `${basePath}${result.destination}`;
    return (
      <>
        {/* React 19 hoists these into <head>. The meta refresh is what makes the
            redirect happen on a static host; the script just makes it instant
            and replaces the history entry so Back does not bounce. */}
        <meta httpEquiv="refresh" content={`0; url=${target}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `location.replace(${JSON.stringify(target)})`,
          }}
        />
        <Section surface="ivory" labelledBy="legacy-redirect">
          <h1 id="legacy-redirect" className="text-h2">
            This page has moved
          </h1>
          <p className="mt-6 max-w-[60ch] text-lead text-ink-700">
            You are being redirected. If nothing happens,{' '}
            <Link
              href={result.destination}
              className="text-forest underline underline-offset-4"
            >
              continue to the new page
            </Link>
            .
          </p>
        </Section>
      </>
    );
  }

  return (
    <Section surface="ivory" labelledBy="legacy-gone">
      <h1 id="legacy-gone" className="text-h2">
        This page is no longer available
      </h1>
      <p className="mt-6 max-w-[62ch] text-lead text-ink-700">
        It was part of the previous CER website and has been retired. Nothing has replaced it
        directly.
      </p>
      <ul className="mt-8 flex flex-col gap-3">
        {[
          { label: 'CER Solutions', href: '/solutions/' },
          { label: 'CER Academy', href: '/academy/' },
          { label: 'Insights', href: '/insights/' },
          { label: 'Contact CER', href: '/contact/' },
        ].map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="font-heading font-semibold text-forest underline underline-offset-4 hover:text-lime-ink"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

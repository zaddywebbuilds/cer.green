import type { Metadata } from 'next';
import Link from 'next/link';

import { Card, Eyebrow, Section } from '@/components/ui/primitives';
import { buildPrivateMetadata } from '@/lib/seo';

/**
 * 404 page.
 *
 * Returns a genuine HTTP 404 status -- Next handles that for this file, so the
 * page is never a soft 404 that search engines treat as real content. It is
 * noindex, and it offers real routes onward rather than only an apology.
 */
export const metadata: Metadata = buildPrivateMetadata(
  'Page not found',
  'The page you were looking for could not be found.',
);

const destinations = [
  {
    title: 'Solutions',
    body: 'ESG, carbon, climate, compliance and sustainable finance advisory.',
    href: '/solutions/',
  },
  {
    title: 'Academy',
    body: 'Professional courses, corporate training and executive programmes.',
    href: '/academy/',
  },
  {
    title: 'Insights',
    body: 'Analysis of the requirements organisations in Asia are working through.',
    href: '/insights/',
  },
  {
    title: 'Contact',
    body: 'Speak with CER about an advisory or training requirement.',
    href: '/contact/',
  },
];

export default function NotFound() {
  return (
    <>
      <Section surface="dark" labelledBy="notfound-h1">
        <Eyebrow className="text-lime">404</Eyebrow>
        <h1 id="notfound-h1" className="mt-5 max-w-[20ch] text-display">
          We couldn&rsquo;t find that page.
        </h1>
        <p className="mt-7 max-w-[62ch] text-lead text-muted-invert">
          The page may have been moved or removed. This site was rebuilt in 2026, and a number of
          pages from the previous version were consolidated or retired.
        </p>
      </Section>

      <Section surface="ivory" labelledBy="notfound-options">
        <h2 id="notfound-options" className="text-h3">
          Where would you like to go?
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((destination) => (
            <Card key={destination.href} surface="white" as="article" className="flex flex-col">
              <h3 className="text-h4">
                <Link href={destination.href} className="hover:text-lime-ink">
                  {destination.title}
                </Link>
              </h3>
              <p className="mt-4 flex-1 text-ink-700">{destination.body}</p>
            </Card>
          ))}
        </div>

        <p className="mt-12 text-ink-700">
          If you followed a link to get here, we would like to fix it —{' '}
          <Link href="/contact/" className="text-forest underline underline-offset-4">
            let us know where it was
          </Link>
          .
        </p>
      </Section>
    </>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';

import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Card, Eyebrow, Section } from '@/components/ui/primitives';
import { buildCrumbs, buildPrivateMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

/**
 * Client Portal gateway.
 *
 * The portal itself is a separate, authenticated application. This page is the
 * only public-facing part of it: a signpost, carrying no client information.
 *
 * Indexation is blocked in four independent places, because the previous site's
 * portal workflow pages were indexed and that is the specific failure this
 * rebuild is closing:
 *   1. `buildPrivateMetadata` emits noindex, nofollow, nocache.
 *   2. `next.config.ts` sets `X-Robots-Tag` on every `/portal/*` response.
 *   3. `app/robots.ts` disallows the path.
 *   4. `app/sitemap.ts` excludes it via `isNoindexPath`.
 *
 * Meta tags and robots.txt are not access control. Client documents must be
 * served from behind authentication in the portal application itself, never
 * from a public or guessable URL.
 */
export const metadata: Metadata = buildPrivateMetadata(
  'Client Portal',
  'Secure client access for CER engagements.',
);

const crumbs = buildCrumbs({ label: 'Client Portal', href: '/portal/' });

const PORTAL_URL = process.env.NEXT_PUBLIC_PORTAL_URL;

export default function PortalPage() {
  return (
    <>
      <Section surface="dark" labelledBy="portal-h1">
        <Breadcrumbs crumbs={crumbs} onDark />
        <Eyebrow className="text-lime">Client access</Eyebrow>
        <h1 id="portal-h1" className="mt-5 max-w-[20ch] text-display">
          Client Portal
        </h1>
        <p className="mt-7 max-w-[62ch] text-lead text-muted-invert">
          Secure access for clients with an active CER engagement.
        </p>
      </Section>

      <Section surface="ivory" labelledBy="portal-access">
        <div className="grid gap-8 lg:grid-cols-2">
          <Card surface="white">
            <h2 id="portal-access" className="text-h3">
              Sign in
            </h2>
            <p className="mt-4 text-ink-700">
              The Client Portal is a separate secure application. Access is issued per engagement.
            </p>

            {PORTAL_URL ? (
              <a
                href={PORTAL_URL}
                rel="noopener noreferrer"
                className="mt-7 inline-flex min-h-12 items-center rounded-[3px] bg-forest px-6 font-heading font-semibold text-white hover:bg-forest-500"
              >
                Continue to the Client Portal
              </a>
            ) : (
              /* No portal URL is configured yet. Rather than link to a route
                 that does not exist, the page routes the visitor to a person. */
              <div className="mt-7 rounded-(--radius-card) border border-line bg-ivory p-6">
                <p className="text-ink-700">
                  Portal access is arranged directly with your engagement lead. If you need access
                  or have lost your credentials, contact us at{' '}
                  <a
                    href={`mailto:${site.email}`}
                    className="text-forest underline underline-offset-4"
                  >
                    {site.email}
                  </a>
                  .
                </p>
              </div>
            )}
          </Card>

          <Card surface="sage">
            <h2 className="text-h3">Not a client yet?</h2>
            <p className="mt-4 text-ink-700">
              The portal is only for organisations with an active engagement. If you are looking
              for information about CER&rsquo;s services or training, those are on the public site.
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {[
                { label: 'Explore CER Solutions', href: '/solutions/' },
                { label: 'Explore CER Academy', href: '/academy/' },
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
          </Card>
        </div>

        <p className="mt-10 max-w-[80ch] text-sm text-muted">
          Never share portal credentials by email. CER will not ask you for your password, and no
          CER email will ask you to confirm login details.
        </p>
      </Section>
    </>
  );
}

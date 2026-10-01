import type { Metadata } from 'next';
import { Suspense } from 'react';

import { JsonLd } from '@/components/layout/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ContactTabs } from '@/components/forms/ContactTabs';
import { IfVerified } from '@/components/ui/Verify';
import { Card, Eyebrow, Section } from '@/components/ui/primitives';
import { getCourses } from '@/lib/content';
import { buildCrumbs, buildMetadata } from '@/lib/seo';
import { breadcrumbSchema, jsonLd } from '@/lib/schema';
import { site } from '@/lib/site';

export const metadata: Metadata = buildMetadata({
  path: '/contact/',
  seo: {
    title: 'Contact CER | Sustainability Advisory & Training Singapore',
    description:
      'Speak with CER about ESG, carbon, climate and sustainability advisory, or about professional and corporate training. Singapore-based, working across Asia.',
    primaryKeyword: 'contact ESG consultant Singapore',
  },
});

const crumbs = buildCrumbs({ label: 'Contact', href: '/contact/' });

/**
 * Contact page.
 *
 * Visitors are split at the top level into consulting and Academy enquiries,
 * because those go to different people and need different information. The
 * choice is carried in the URL (`?enquiry=academy`), so every CTA across the
 * site can deep-link to the right form, and the selection survives a refresh
 * or a shared link.
 */
export default function ContactPage() {
  const courseOptions = [
    ...getCourses().map((c) => c.title),
    'A customised programme',
    'Not sure yet',
  ];

  return (
    <>
      <JsonLd data={jsonLd(breadcrumbSchema(crumbs))} />

      <Section surface="dark" labelledBy="contact-h1">
        <Breadcrumbs crumbs={crumbs} onDark />
        <Eyebrow className="text-lime">Contact</Eyebrow>
        <h1 id="contact-h1" className="mt-5 max-w-[20ch] text-display">
          Start a conversation
        </h1>
        <p className="mt-7 max-w-[68ch] text-lead text-muted-invert">
          Tell us what you are working through: the requirement, who is asking for it, and when it
          is needed. That is usually enough for us to say whether we can help and what it would
          involve.
        </p>
      </Section>

      <Section surface="ivory" labelledBy="contact-form">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <h2 id="contact-form" className="sr-only">
              Enquiry form
            </h2>

            <Suspense>
              <ContactTabs courseOptions={courseOptions} />
            </Suspense>
          </div>

          <aside className="flex flex-col gap-6">
            <Card surface="white">
              <h2 className="eyebrow text-lime-ink">Direct contact</h2>
              <dl className="mt-5 flex flex-col gap-4">
                <div>
                  <dt className="text-sm text-muted">Email</dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${site.email}`}
                      className="font-heading font-semibold text-forest underline underline-offset-4 hover:text-lime-ink"
                    >
                      {site.email}
                    </a>
                  </dd>
                </div>

                <IfVerified value={site.phone}>
                  {(phone) => (
                    <div>
                      <dt className="text-sm text-muted">Telephone</dt>
                      <dd className="mt-1">
                        <a
                          href={`tel:${phone.replace(/[^+\d]/g, '')}`}
                          className="font-heading font-semibold text-forest underline underline-offset-4"
                        >
                          {phone}
                        </a>
                      </dd>
                    </div>
                  )}
                </IfVerified>

                <div>
                  <dt className="text-sm text-muted">LinkedIn</dt>
                  <dd className="mt-1">
                    <a
                      href={site.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-heading font-semibold text-forest underline underline-offset-4 hover:text-lime-ink"
                    >
                      CER Consultancy
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className="text-sm text-muted">Address</dt>
                  <dd className="mt-1">
                    <address className="not-italic text-ink-700">
                      <IfVerified value={site.address.street}>
                        {(street) => (
                          <>
                            {street}
                            <br />
                          </>
                        )}
                      </IfVerified>
                      {site.address.locality}
                      <IfVerified value={site.address.postalCode}>
                        {(postal) => <> {postal}</>}
                      </IfVerified>
                    </address>
                  </dd>
                </div>
              </dl>
            </Card>

            <Card surface="sage">
              <h2 className="eyebrow text-lime-ink">Existing clients</h2>
              <p className="mt-4 text-ink-700">
                If you have an active engagement, contact your engagement lead directly. They remain
                your first point of contact for anything relating to current project work.
              </p>
            </Card>

            <Card surface="outline">
              <h2 className="eyebrow text-lime-ink">What happens next</h2>
              <ol className="mt-4 flex flex-col gap-3 text-ink-700">
                <li>
                  <strong className="font-semibold">1.</strong> We acknowledge your enquiry by
                  email straight away.
                </li>
                <li>
                  <strong className="font-semibold">2.</strong> A consultant reviews it and comes
                  back with questions or a proposed call.
                </li>
                <li>
                  <strong className="font-semibold">3.</strong> If we are not the right fit, we
                  will tell you that rather than proposing work.
                </li>
              </ol>
            </Card>
          </aside>
        </div>
      </Section>
    </>
  );
}


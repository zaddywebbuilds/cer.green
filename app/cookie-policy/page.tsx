import type { Metadata } from 'next';
import { LegalPage, type LegalSection } from '@/components/sections/LegalPage';
import { CookiePreferencesButton } from '@/components/layout/CookiePreferencesButton';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

/**
 * Cookie policy.
 *
 * Describes exactly what this implementation does: necessary storage only until
 * consent, no analytics tag loaded before consent, and self-hosted fonts so
 * there is no third-party font request.
 */
export const metadata: Metadata = buildMetadata({
  path: '/cookie-policy/',
  seo: {
    title: 'Cookie Policy | CER',
    description:
      'What cookies and similar technologies this website uses, what each one is for, how long it lasts, and how to change your preferences at any time.',
  },
});

const sections: LegalSection[] = [
  {
    heading: 'Our approach',
    body: [
      'This site sets only what is necessary for it to work, unless you agree to more. Analytics and marketing scripts are not loaded at all until you consent -- we do not load them in a restricted mode and we do not set them by default.',
      'Fonts are served from this website rather than from a third-party font service, so viewing a page does not disclose your visit to a font provider.',
      'You can change your choice at any time using the button at the end of this page.',
    ],
  },
  {
    heading: 'Categories we use',
    rows: [
      {
        term: 'Necessary',
        detail:
          'Required for the site to function and for security. This includes remembering your cookie choice itself, and controls that protect forms against automated abuse. These cannot be switched off.',
      },
      {
        term: 'Analytics',
        detail:
          'Helps us understand which pages are useful and where visitors have difficulty. Only set if you agree. We do not send the contents of form fields to analytics.',
      },
      {
        term: 'Marketing',
        detail:
          'Used to measure the effect of campaigns. Only set if you agree. If you do not agree, no marketing tag is loaded.',
      },
    ],
  },
  {
    heading: 'What is actually stored',
    rows: [
      {
        term: 'cer_cookie_consent',
        detail:
          'Necessary. Stored in your browser to remember your cookie choice so you are not asked on every page. Stays until you clear your browser storage or change your preference.',
      },
      {
        term: 'cer_lead_source',
        detail:
          'Necessary. Stored for the duration of your browsing session only, so that if you submit an enquiry we can see which page and campaign it came from. Cleared when you close the tab.',
      },
      {
        term: 'Google Analytics cookies',
        detail:
          'Analytics. Set by Google Analytics only after you consent to analytics cookies. Used to distinguish visitors and sessions in aggregate reporting. IP anonymisation is enabled.',
      },
    ],
  },
  {
    heading: 'Third parties',
    body: [
      'The only third-party service that can set anything in your browser through this site is Google Analytics, and only with your consent. Google acts as our service provider for that purpose.',
      'Where you follow a link from this site to another website -- a partner, a regulator, or a social platform -- that site sets its own cookies under its own policy. We have no control over those.',
    ],
  },
  {
    heading: 'Changing your mind',
    body: [
      'You can change your cookie preferences at any time using the button below. Withdrawing analytics consent stops the analytics script loading on subsequent page views.',
      'You can also block or delete cookies through your browser settings. Blocking necessary cookies may stop parts of the site working, including the record of your cookie choice, which means you will be asked again.',
    ],
  },
  {
    heading: 'Questions',
    body: [
      `If you have a question about this policy, contact us at ${site.email}. How we handle personal data more generally is described in the privacy policy.`,
    ],
  },
];

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie policy"
      crumbLabel="Cookie policy"
      href="/cookie-policy/"
      lastUpdated="1 September 2026"
      intro={[
        'This page explains what this website stores in your browser, what each item is for, and how to change your choice.',
      ]}
      sections={sections}
    >
      <div className="not-prose mt-12 rounded-(--radius-card) border border-line bg-white p-7">
        <h2 className="font-heading text-h4 font-semibold">Change your preferences</h2>
        <p className="mt-3 text-ink-700">
          Open the preferences panel to review or change what you have agreed to.
        </p>
        <CookiePreferencesButton />
      </div>
    </LegalPage>
  );
}

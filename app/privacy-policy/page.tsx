import type { Metadata } from 'next';
import { LegalPage, type LegalSection } from '@/components/sections/LegalPage';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

/**
 * Privacy policy.
 *
 * This describes what the website actually does -- the forms it operates, the
 * fields they collect, where submissions are sent, what analytics runs and
 * under what consent. It is accurate to the implementation.
 *
 * It is NOT a substitute for legal review. CER's counsel must confirm the
 * policy against the PDPA and any other regime that applies to its clients
 * before launch, and complete the company identification details. See
 * docs/CONTENT-GUIDE.md.
 */
export const metadata: Metadata = buildMetadata({
  path: '/privacy-policy/',
  seo: {
    title: 'Privacy Policy | CER',
    description:
      'How CER collects, uses and protects personal data submitted through this website, including enquiry forms, analytics and cookies.',
  },
});

const sections: LegalSection[] = [
  {
    heading: 'Who we are',
    body: [
      `This website is operated by ${site.legalName}, based in Singapore. In this policy, "we", "us" and "our" refer to ${site.legalName}.`,
      `For any question about this policy or about how your personal data is handled, contact us at ${site.email}.`,
    ],
  },
  {
    heading: 'What this policy covers',
    body: [
      'This policy covers personal data collected through this website. It does not cover data processed within a client engagement, which is governed by the agreement in place for that engagement, or data held in the Client Portal, which is subject to its own access controls and terms.',
    ],
  },
  {
    heading: 'Personal data we collect',
    body: [
      'We collect only what is needed to respond to an enquiry or to operate the site. We do not buy personal data, and we do not build profiles of individual visitors.',
    ],
    rows: [
      {
        term: 'Consulting enquiries',
        detail:
          'First name, last name, work email, company, job title, country, telephone (optional), area of interest, organisation size (optional) and the content of your message.',
      },
      {
        term: 'Academy and training enquiries',
        detail:
          'Name, work email, company, job title, country, telephone (optional), the programme of interest, whether the enquiry is individual or corporate, approximate participant numbers, preferred dates and the content of your message.',
      },
      {
        term: 'Newsletter subscriptions',
        detail: 'Your email address and the fact that you gave consent.',
      },
      {
        term: 'Enquiry context',
        detail:
          'The page you submitted from, the page you first arrived on, the referring website, and any campaign parameters in the link you followed. This tells us how an enquiry reached us. It does not identify you beyond the details you provide.',
      },
      {
        term: 'Analytics',
        detail:
          'Where you consent to analytics cookies, aggregated information about pages viewed and interactions. We do not send the contents of form fields to analytics.',
      },
      {
        term: 'Technical data',
        detail:
          'Server logs including IP address, retained briefly for security, rate limiting and abuse prevention.',
      },
    ],
  },
  {
    heading: 'Why we use it',
    list: [
      'To respond to your enquiry and to correspond with you about it.',
      'To send you an acknowledgement confirming that we received your enquiry.',
      'To provide the training or advisory information you asked for.',
      'To send you email updates, where you have subscribed. You can unsubscribe at any time.',
      'To understand how the site is used and improve it, where you have consented to analytics.',
      'To protect the site against spam, abuse and automated submissions.',
      'To comply with legal and regulatory obligations that apply to us.',
    ],
  },
  {
    heading: 'The basis on which we rely',
    body: [
      'Where you submit an enquiry, we process your details in order to respond to you -- that is what the form is for, and it is the basis on which you provided them.',
      'Where we send marketing email, we do so on the basis of the consent you gave when subscribing, and you may withdraw it at any time.',
      'Where we run analytics, we do so only after you have consented to analytics cookies. Withdrawing that consent stops it.',
      'Where we keep server logs for security purposes, we do so because we have a legitimate interest in protecting the site and the people who use it.',
    ],
  },
  {
    heading: 'Who we share it with',
    body: [
      'We do not sell personal data and we do not share it for third-party marketing.',
      'We use a small number of service providers to operate the site. They process data on our instructions only:',
    ],
    rows: [
      {
        term: 'Hosting provider',
        detail:
          'Hostinger. Serves this website and processes server logs. Hostinger is based in Lithuania and operates data centres globally.',
      },
      {
        term: 'Form submission service',
        detail:
          'Web3Forms. Receives form submissions and delivers enquiry notifications to us. Web3Forms is operated by Rivetech Inc.',
      },
      {
        term: 'Analytics provider',
        detail:
          'Google Analytics, used only where you have consented to analytics cookies. IP anonymisation is enabled.',
      },
    ],
  },
  {
    heading: 'Where your data is held',
    body: [
      'Our service providers may process data outside Singapore. Where that happens we take steps to ensure the data continues to be protected to a comparable standard, in line with the transfer requirements of the Personal Data Protection Act.',
    ],
  },
  {
    heading: 'How long we keep it',
    body: [
      'Enquiry correspondence is kept for as long as needed to respond and to maintain a record of the business relationship, then deleted or anonymised.',
      'Newsletter subscriptions are kept until you unsubscribe.',
      'Server logs are kept for a short period for security purposes.',
      'Where an enquiry leads to an engagement, retention is governed by the agreement for that engagement.',
      '[VERIFY WITH CER: confirm specific retention periods for each category, in line with CER internal policy.]',
    ],
  },
  {
    heading: 'How we protect it',
    list: [
      'The site is served over HTTPS only, with HTTP Strict Transport Security enabled.',
      'Form submissions are validated on the server and rate limited to prevent abuse.',
      'Security headers, including a Content Security Policy, are applied to every response.',
      'Enquiry destination addresses and service credentials are held server-side and are never exposed in the browser.',
      'Client documents are held behind authentication in the Client Portal, never on a public URL.',
    ],
  },
  {
    heading: 'Your rights',
    body: [
      'Under the Personal Data Protection Act you may ask us for access to the personal data we hold about you, and ask us to correct it if it is inaccurate. You may also withdraw consent for uses that rely on it, such as marketing email or analytics.',
      `To make a request, contact ${site.email}. We will respond within the time the law allows. If you are not satisfied with our response, you may raise the matter with the Personal Data Protection Commission of Singapore.`,
    ],
  },
  {
    heading: 'Cookies',
    body: [
      'This site sets only necessary cookies unless you consent to more. Analytics and marketing tags are not loaded at all until consent is given, and you can change your choice at any time.',
      'Full detail, including how to change your preferences, is on the cookie policy page.',
    ],
  },
  {
    heading: 'Children',
    body: [
      'This site is intended for business audiences and is not directed at children. We do not knowingly collect personal data from children.',
    ],
  },
  {
    heading: 'Changes to this policy',
    body: [
      'We may update this policy from time to time. The date at the top of this page shows when it was last changed. Where a change is significant, we will make that clear.',
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      crumbLabel="Privacy policy"
      href="/privacy-policy/"
      lastUpdated="1 September 2026"
      intro={[
        'This policy explains what personal data this website collects, why, who it is shared with, and what rights you have over it.',
      ]}
      sections={sections}
    />
  );
}

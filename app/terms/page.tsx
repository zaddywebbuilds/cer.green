import type { Metadata } from 'next';
import { LegalPage, type LegalSection } from '@/components/sections/LegalPage';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

/**
 * Website terms of use.
 *
 * Covers use of this website only, not the terms of any advisory or training
 * engagement, which are contracted separately.
 *
 * Requires review by CER's legal counsel before launch, along with completion
 * of the company identification details.
 */
export const metadata: Metadata = buildMetadata({
  path: '/terms/',
  seo: {
    title: 'Terms of Use | CER',
    description:
      'The terms on which CER makes this website available, including acceptable use, intellectual property, limitations of liability and governing law.',
  },
});

const sections: LegalSection[] = [
  {
    heading: 'About these terms',
    body: [
      `This website is operated by ${site.legalName}. By using the site you accept these terms. If you do not accept them, please do not use the site.`,
      'These terms cover use of this website only. Advisory engagements and training programmes are provided under separate written agreements, and nothing on this website forms part of those agreements or amends them.',
    ],
  },
  {
    heading: 'Company information',
    rows: [
      { term: 'Legal name', detail: site.legalName },
      {
        term: 'Registered address',
        detail: `${site.address.street}, ${site.address.locality} ${site.address.postalCode}`,
      },
      { term: 'Registration number (UEN)', detail: site.uen },
      { term: 'Contact', detail: site.email },
    ],
  },
  {
    heading: 'Information on this site is general',
    body: [
      'The content of this website is general information about CER and about sustainability, ESG, carbon and regulatory subjects. It is not advice for any particular organisation, and it should not be relied on as such.',
      'Regulatory requirements, reporting timelines and thresholds change, sometimes at short notice. While we take care to keep published material accurate, we do not warrant that everything on this site is current at the time you read it. Before acting on any regulatory point, confirm the current position with the relevant regulator or take advice on your specific circumstances.',
      'Nothing on this site constitutes legal, financial, investment, tax or accounting advice.',
    ],
  },
  {
    heading: 'Acceptable use',
    body: ['You agree not to:'],
    list: [
      'Use the site for any unlawful purpose, or in a way that breaches these terms.',
      'Submit false information through any form on the site, or submit an enquiry on behalf of someone who has not asked you to.',
      'Attempt to gain unauthorised access to the site, or to any server or system connected to it.',
      'Introduce malicious code, or attempt to interfere with the operation or availability of the site.',
      'Scrape, harvest or systematically extract content from the site without our written permission.',
      'Use automated systems to submit forms, or otherwise circumvent the site\'s abuse controls.',
    ],
  },
  {
    heading: 'Intellectual property',
    body: [
      'The content of this website, including text, design, graphics, diagrams and methodology descriptions, is owned by CER or licensed to us, and is protected by intellectual property law.',
      'You may read the site, and print or download extracts for your own reference or for internal business use. You may not republish, distribute commercially, or present our material as your own without our written permission.',
      'Third-party names and trade marks referred to on this site -- including standards bodies, frameworks and partner organisations -- remain the property of their respective owners. Their appearance here does not imply any endorsement of CER by them, or by CER of them, beyond the relationships described on the partners page.',
    ],
  },
  {
    heading: 'Standards and frameworks referred to',
    body: [
      'Where this site refers to standards and frameworks such as the GHG Protocol, ISO standards or the PCAF standard, those references describe the basis on which CER works. They do not indicate accreditation, certification or endorsement by the bodies responsible for them unless that is stated explicitly and separately.',
      'CER prepares organisations for certification, verification and assurance. It does not itself certify, verify or assure, and it does not hold itself out as doing so -- those roles must be independent of the party that prepared the work.',
    ],
  },
  {
    heading: 'Links to other sites',
    body: [
      'This site links to external websites, including partner organisations and regulators. We do not control those sites and are not responsible for their content, availability or privacy practices. A link is not an endorsement.',
    ],
  },
  {
    heading: 'Availability',
    body: [
      'We aim to keep the site available but do not guarantee uninterrupted access. We may suspend, withdraw or change any part of the site without notice, including for maintenance.',
    ],
  },
  // CER's solicitor should still read this section before launch. The scope
  // sentence below is what keeps it clear of the engagement contracts and the
  // professional indemnity position, so it should not be dropped.
  {
    heading: 'Limitation of liability',
    body: [
      'To the extent permitted by law, we are not liable for loss arising from use of, or reliance on, the content of this website. This includes loss of profits, business, contracts, anticipated savings, goodwill or data.',
      'The limits in this section apply to the website. They do not affect the liability, warranty or insurance position agreed for a client engagement, which the written agreement for that engagement sets out in full.',
      'Nothing in these terms limits or excludes liability that cannot be limited or excluded under Singapore law, including liability for death or personal injury caused by negligence, or for fraud.',
    ],
  },
  {
    heading: 'Governing law',
    body: [
      'These terms are governed by the laws of Singapore, and the courts of Singapore have exclusive jurisdiction over any dispute arising from them or from your use of this site.',
    ],
  },
  {
    heading: 'Changes to these terms',
    body: [
      'We may update these terms from time to time. The date at the top of this page shows when they were last changed. Continued use of the site after a change means you accept the updated terms.',
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of use"
      crumbLabel="Terms"
      href="/terms/"
      lastUpdated="1 September 2026"
      intro={[
        'These terms govern your use of this website. Advisory and training engagements are contracted separately.',
      ]}
      sections={sections}
    />
  );
}

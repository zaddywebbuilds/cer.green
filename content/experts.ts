import type { Expert } from '@/types/content';
import { needsVerification } from '@/lib/site';

/**
 * CER experts.
 *
 * Every biography, qualification and credential below is taken from CER's own
 * published expert profiles. Nothing has been added, inferred or embellished.
 *
 * PHOTOGRAPHS: no `photo` is set. The expert card and profile fall back to a
 * typographic monogram. Real professional photographs must be supplied by CER
 * before launch -- AI-generated headshots are not used on this site under any
 * circumstances. See docs/CONTENT-GUIDE.md.
 */
export const experts: Expert[] = [
  {
    slug: 'raymond-cheung',
    name: 'Raymond Cheung',
    role: 'Advisor & Lead Trainer',
    shortBio:
      'Over twenty years in actuarial science and risk management, working across ESG, sustainability and ESG investment.',
    longBio: [
      'Raymond brings more than twenty years of experience in actuarial science and risk management to CER, where he advises on ESG and sustainability engagements and leads the delivery of CER Academy programmes.',
      'His work spans risk management, ESG and sustainability, and ESG investment. Alongside his role at CER he serves as chief executive of a medical group, founded a fintech business, and has worked as a portfolio manager.',
      'He teaches at leading institutions across Asia and holds independent director positions with a number of organisations.',
    ],
    expertise: [
      'Actuarial science',
      'Risk management',
      'ESG and sustainability',
      'ESG investment',
      'Climate risk',
      'Governance',
    ],
    industries: ['financial-services', 'healthcare'],
    qualifications: [
      'Bachelor of Business, Actuarial Science major, Nanyang Technological University',
    ],
    credentials: ['Over 20 years in actuarial science and risk management'],
    linkedin: 'https://www.linkedin.com/in/raymond-cheung-erm/',
    courseSlugs: [
      'esg-essentials',
      'carbon-literacy-for-professionals',
      'esg-risk-management',
      'iso-14064-ghg-emission-awareness',
      'risk-intelligence-for-decision-makers',
    ],
    solutionSlugs: ['carbon-accounting', 'esg-risk-management', 'climate-risk', 'iso-14064'],
    seo: {
      title: 'Raymond Cheung, Advisor & Lead Trainer',
      description:
        'Raymond Cheung is Advisor and Lead Trainer at CER, with over twenty years in actuarial science, risk management, ESG and sustainability across Asia.',
      primaryKeyword: 'Raymond Cheung CER',
    },
    status: 'published',
  },
  {
    slug: 'chan-ee-chong',
    name: 'Chan Ee Chong',
    role: 'Lead Consultant',
    shortBio:
      'Over twenty years in wealth management and business consultancy, with ESG project experience across South-East Asia.',
    longBio: [
      'Chan Ee Chong leads consulting engagements at CER, drawing on more than twenty years in wealth management and business consultancy.',
      'His ESG work has focused on South-East Asia. He co-founded a fintech business specialising in supply chain financing and has directed a registered fund management company.',
      'He has led high net worth segments at prominent Malaysian banks.',
    ],
    expertise: [
      'ESG advisory',
      'Wealth management',
      'Business consultancy',
      'Supply chain financing',
      'Sustainable finance',
      'South-East Asia markets',
    ],
    industries: ['financial-services'],
    qualifications: [
      'Bachelor of Business Administration, Finance major, National University of Singapore',
    ],
    credentials: ['Over 20 years in wealth management and business consultancy'],
    linkedin: needsVerification('LinkedIn profile URL for Chan Ee Chong'),
    courseSlugs: ['green-finance-in-action', 'sustainable-procurement', 'esg-building-a-sustainable-brand-identity'],
    solutionSlugs: ['green-finance', 'esg-strategy', 'sustainable-procurement', 'materiality-assessment'],
    seo: {
      title: 'Chan Ee Chong, Lead Consultant',
      description:
        'Chan Ee Chong is Lead Consultant at CER, with over twenty years in wealth management, business consultancy and ESG projects across South-East Asia.',
      primaryKeyword: 'Chan Ee Chong CER',
    },
    status: 'published',
  },
];

export const expertBySlug = Object.fromEntries(experts.map((e) => [e.slug, e]));

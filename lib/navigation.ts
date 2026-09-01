/**
 * Navigation.
 *
 * The Solutions mega menu is derived from published content rather than
 * hand-maintained, so a service added in the CMS appears in the menu and a
 * draft service never does. Only the top-level structure is declared here.
 */

import { getSolutionsGrouped } from '@/lib/content';

export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavColumn {
  heading: string;
  href: string;
  links: NavLink[];
}

export interface NavItem {
  label: string;
  href: string;
  /** Rendered as a mega menu when present. */
  columns?: NavColumn[];
  featured?: { title: string; body: string; cta: NavLink };
  viewAll?: NavLink;
}

export function getPrimaryNav(): NavItem[] {
  const solutionColumns: NavColumn[] = getSolutionsGrouped()
    .filter((group) => group.solutions.length > 0)
    .map((group) => ({
      heading: group.category.navTitle,
      href: `/solutions/${group.category.slug}/`,
      links: group.solutions.map((s) => ({
        label: s.navTitle ?? s.title,
        href: `/solutions/${s.slug}/`,
      })),
    }));

  return [
    {
      label: 'Solutions',
      href: '/solutions/',
      columns: solutionColumns,
      viewAll: { label: 'View all solutions', href: '/solutions/' },
    },
    {
      label: 'Academy',
      href: '/academy/',
      columns: [
        {
          heading: 'Programmes',
          href: '/academy/',
          links: [
            {
              label: 'Professional courses',
              href: '/academy/courses/',
              description: 'Scheduled programmes for individual professionals.',
            },
            {
              label: 'Corporate training',
              href: '/academy/corporate-training/',
              description: 'Private programmes delivered for your team.',
            },
            {
              label: 'Executive programmes',
              href: '/academy/executive-programmes/',
              description: 'Board and senior leadership sessions.',
            },
            {
              label: 'Custom programmes',
              href: '/academy/custom-training/',
              description: 'Curricula built around your requirements.',
            },
          ],
        },
      ],
      featured: {
        title: 'CER Academy',
        body: 'Knowledge. Skills. Certification. Build sustainability capability across professionals, leadership teams and whole organisations.',
        cta: { label: 'Explore CER Academy', href: '/academy/' },
      },
    },
    { label: 'Industries', href: '/industries/' },
    { label: 'Case Studies', href: '/case-studies/' },
    { label: 'Insights', href: '/insights/' },
    { label: 'About', href: '/about/' },
  ];
}

export const footerNav = [
  {
    heading: 'Solutions',
    links: [
      { label: 'Carbon & Climate', href: '/solutions/carbon-climate/' },
      { label: 'ESG & Sustainability', href: '/solutions/esg-sustainability/' },
      { label: 'Compliance & Standards', href: '/solutions/compliance-standards/' },
      { label: 'Sustainable Finance', href: '/solutions/sustainable-finance/' },
      { label: 'All solutions', href: '/solutions/' },
    ],
  },
  {
    heading: 'Academy',
    links: [
      { label: 'Courses', href: '/academy/courses/' },
      { label: 'Corporate training', href: '/academy/corporate-training/' },
      { label: 'Executive programmes', href: '/academy/executive-programmes/' },
      { label: 'Custom programmes', href: '/academy/custom-training/' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About CER', href: '/about/' },
      { label: 'Who we are', href: '/about/who-we-are/' },
      { label: 'Experts', href: '/about/experts/' },
      { label: 'Partners', href: '/about/partners/' },
      { label: 'Industries', href: '/industries/' },
      { label: 'Case studies', href: '/case-studies/' },
      { label: 'Insights', href: '/insights/' },
      { label: 'Contact', href: '/contact/' },
    ],
  },
] as const;

export const legalNav = [
  { label: 'Privacy policy', href: '/privacy-policy/' },
  { label: 'Terms', href: '/terms/' },
  { label: 'Cookie policy', href: '/cookie-policy/' },
] as const;

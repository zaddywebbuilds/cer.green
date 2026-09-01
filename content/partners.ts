import type { Partner } from '@/types/content';

/**
 * Partner organisations.
 *
 * Sourced from CER's published partners page. CER's own wording describes these
 * as collaborations, and explicitly does not describe any of them as clients --
 * so none is presented as one here.
 *
 * The relationship category assigned to each organisation reflects how CER
 * describes the collaboration. Where CER wants a different categorisation, it is
 * a single field change. Logos are not bundled: they require the partner's
 * written approval and a licensed asset. See docs/CONTENT-GUIDE.md.
 */
export const partners: Partner[] = [
  {
    name: 'TÜV SÜD Singapore',
    relationship: 'Training Partner',
    description:
      'CER delivers professional sustainability and ESG training in collaboration with TÜV SÜD Academy Singapore.',
  },
  {
    name: 'BSM Bank Indonesia',
    relationship: 'Project Partner',
    description:
      'Collaboration on ESG initiatives in the Indonesian banking sector, including green finance.',
  },
  {
    name: 'Juris Tech',
    relationship: 'Technology Partner',
    description:
      'Technology collaboration supporting ESG and sustainability project delivery.',
  },
  {
    name: 'SW Group',
    relationship: 'Project Partner',
    description:
      'Project collaboration on ESG and sustainability engagements.',
  },
  {
    name: 'Verde Kinetics',
    relationship: 'Project Partner',
    description:
      'Project collaboration on sustainability and decarbonisation initiatives.',
  },
  {
    name: 'Hibank',
    relationship: 'Project Partner',
    description:
      'Collaboration on ESG and green finance initiatives in the banking sector.',
  },
  {
    name: 'Triage Investiga',
    relationship: 'Project Partner',
    description:
      'Project collaboration supporting ESG and sustainability engagements.',
  },
  {
    name: 'S P Jain School of Global Management',
    relationship: 'Academic Partner',
    description:
      'Academic collaboration supporting ESG education and the development of sustainability capability.',
  },
  {
    name: 'Softscheck',
    relationship: 'Academic Partner',
    description:
      'Collaboration supporting ESG knowledge development and capability building.',
  },
];

export const partnerGroups = [
  'Strategic Partner',
  'Training Partner',
  'Technology Partner',
  'Project Partner',
  'Academic Partner',
] as const;

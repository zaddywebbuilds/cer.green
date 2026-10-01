import type { Partner } from '@/types/content';

/**
 * Partner organisations.
 *
 * The list and its four groupings were supplied by CER on 1 October 2026.
 * CER's own wording describes these as collaborations, and explicitly does not
 * describe any of them as clients, so none is presented as one here.
 *
 * DESCRIPTIONS: where CER supplied one it is used verbatim. The rest state only
 * the collaboration type CER assigned, because what each partnership actually
 * covers has not been supplied and inventing it would put words in another
 * organisation's mouth. They read as placeholders on purpose and should be
 * replaced as CER confirms each one.
 *
 * Logos are not bundled: they require the partner's written approval and a
 * licensed asset. See docs/CONTENT-GUIDE.md.
 */
export const partners: Partner[] = [
  // ── Assurance ──────────────────────────────────────────────────────────────
  {
    name: 'TÜV SÜD Singapore',
    relationship: 'Assurance Partner',
    description:
      'CER delivers professional sustainability and ESG training in collaboration with TÜV SÜD Academy Singapore.',
  },
  {
    name: 'TÜV NORD',
    relationship: 'Assurance Partner',
    description: 'Assurance collaboration supporting CER engagements.',
  },

  // ── Project ────────────────────────────────────────────────────────────────
  {
    name: 'SPETA',
    relationship: 'Project Partner',
    description: 'Project collaboration on ESG and sustainability engagements.',
  },
  {
    name: 'SW Group',
    relationship: 'Project Partner',
    description: 'Project collaboration on ESG and sustainability engagements.',
  },
  {
    name: 'BSM Bank Indonesia',
    relationship: 'Project Partner',
    description:
      'Collaboration on ESG initiatives in the Indonesian banking sector, including green finance.',
  },
  {
    name: 'SoftScheck',
    relationship: 'Project Partner',
    description:
      'Project collaboration supporting ESG knowledge development and capability building.',
  },
  {
    name: 'Merandi',
    relationship: 'Project Partner',
    description: 'Project collaboration on ESG and sustainability engagements.',
  },

  // ── Academic and training ──────────────────────────────────────────────────
  {
    name: 'King Mongkut\'s University of Technology Thonburi (KMUTT)',
    relationship: 'Academic & Training Partner',
    description:
      'Academic collaboration with the university in Thailand, supporting sustainability education and capability building.',
  },
  {
    name: 'Aventis Singapore',
    relationship: 'Academic & Training Partner',
    description:
      'Academic and training collaboration supporting sustainability capability building.',
  },
  {
    name: 'NCC Education',
    relationship: 'Academic & Training Partner',
    description:
      'Academic and training collaboration supporting sustainability capability building.',
  },
  {
    name: 'Momenta',
    relationship: 'Academic & Training Partner',
    description:
      'Academic and training collaboration supporting sustainability capability building.',
  },

  // ── Technology ─────────────────────────────────────────────────────────────
  {
    name: 'Verde Kinetics',
    relationship: 'Technology Partner',
    description:
      'Technology collaboration on sustainability and decarbonisation initiatives.',
  },
  {
    name: 'Cygnus Technology Asia',
    relationship: 'Technology Partner',
    description:
      'Technology collaboration supporting ESG and sustainability project delivery.',
  },
];

/** Display order of the groups on the partners page. */
export const partnerGroups = [
  'Assurance Partner',
  'Project Partner',
  'Academic & Training Partner',
  'Technology Partner',
] as const;

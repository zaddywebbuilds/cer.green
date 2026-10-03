import type { Partner } from '@/types/content';

/**
 * Partner organisations.
 *
 * The list and its four groupings were supplied by CER on 1 October 2026.
 * CER's own wording describes these as collaborations, and explicitly does not
 * describe any of them as clients, so none is presented as one here.
 *
 * DESCRIPTIONS: all thirteen are CER's own wording, supplied 3 October 2026 to
 * replace the placeholders that previously stated only the collaboration type.
 * They are used verbatim. Do not paraphrase them: they describe what another
 * organisation does with CER, which is not ours to reword.
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
    description:
      'CER works with TÜV NORD on ESG and ISO-related certification and assurance services for organisations across the region.',
  },

  // ── Project ────────────────────────────────────────────────────────────────
  {
    name: 'SPETA',
    relationship: 'Project Partner',
    description:
      'CER partners with SPETA to raise ESG awareness and build sustainability skills among its member companies.',
  },
  {
    name: 'SW Group',
    relationship: 'Project Partner',
    description:
      'CER supports SW Group with tailored ESG advisory and sustainability solutions for its business operations.',
  },
  {
    name: 'BSM Bank Indonesia',
    relationship: 'Project Partner',
    description:
      'CER works with BSM Indonesia to help MSMEs become ready for sustainable finance and get access to green loans.',
  },
  {
    name: 'softScheck',
    relationship: 'Project Partner',
    description:
      'CER works with softScheck APAC to offer integrated ESG and cybersecurity governance solutions to businesses in Asia Pacific.',
  },
  {
    name: 'Merandi',
    relationship: 'Project Partner',
    description:
      'CER works with Merandi to deliver practical sustainability solutions that help businesses move towards greener operations.',
  },

  // ── Academic and training ──────────────────────────────────────────────────
  {
    name: 'King Mongkut\'s University of Technology Thonburi (KMUTT)',
    relationship: 'Academic & Training Partner',
    description:
      'CER works with King Mongkut\'s University of Technology Thonburi (KMUTT) to advance sustainability education and research in Thailand.',
  },
  {
    name: 'Aventis Singapore',
    relationship: 'Academic & Training Partner',
    description:
      'CER offers ESG and sustainability courses with Aventis School of Management, from foundation to advanced levels.',
  },
  {
    name: 'NCC Education',
    relationship: 'Academic & Training Partner',
    description:
      'CER works with NCC Education to bring internationally recognised sustainability and ESG learning to students and professionals.',
  },
  {
    name: 'Momenta',
    relationship: 'Academic & Training Partner',
    description:
      'CER partners with Momenta to drive ESG adoption and sustainable business change across the region.',
  },

  // ── Technology ─────────────────────────────────────────────────────────────
  {
    name: 'Verde Kinetics',
    relationship: 'Technology Partner',
    description:
      'CER works with Verde Kinetika in Indonesia to speed up decarbonisation and sustainability projects on the ground.',
  },
  {
    name: 'Cygnus Technology Asia',
    relationship: 'Technology Partner',
    description:
      'CER works with Cygnus Technology Asia to use technology to help businesses measure, manage and report their ESG performance.',
  },
];

/** Display order of the groups on the partners page. */
export const partnerGroups = [
  'Assurance Partner',
  'Project Partner',
  'Academic & Training Partner',
  'Technology Partner',
] as const;

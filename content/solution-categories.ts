import type { SolutionCategory } from '@/types/content';

/**
 * The four commercial pillars of CER Solutions. Each category page is a
 * genuine landing page in its own right, and is the fallback home for any
 * service that does not yet have enough content to stand alone.
 */
export const solutionCategories: SolutionCategory[] = [
  {
    slug: 'carbon-climate',
    title: 'Carbon & Climate',
    navTitle: 'Carbon & Climate',
    summary:
      'Measure emissions, understand exposure and establish credible reduction pathways.',
    problem:
      'Most organisations are asked for emissions figures before they have a defensible way of producing them. Data sits across finance, facilities, procurement and operations, methodology is inconsistent between years, and the resulting number cannot survive scrutiny from an auditor, a customer or a bank.',
    capability:
      'CER builds the measurement foundation first: organisational boundary, emissions sources, data collection, calculation methodology and documentation. Once the baseline is reliable, we work on what the organisation can actually change -- reduction levers, sequencing, cost, and the internal ownership needed to deliver them.',
    outcome:
      'A greenhouse gas inventory the organisation can stand behind, a reduction pathway grounded in its own operations, and documentation that holds up to external review.',
    seo: {
      title: 'Carbon & Climate Consulting Singapore',
      description:
        'Carbon accounting, GHG inventories, Scope 1, 2 and 3, ISO 14064 and decarbonisation advisory for organisations in Singapore and across Asia.',
      primaryKeyword: 'carbon consultant Singapore',
      secondaryKeywords: ['carbon accounting Singapore', 'GHG inventory Singapore'],
    },
  },
  {
    slug: 'esg-sustainability',
    title: 'ESG & Sustainability',
    navTitle: 'ESG & Sustainability',
    summary:
      'Turn ESG requirements into practical governance, reporting and operational programmes.',
    problem:
      'ESG arrives as a set of external demands -- investor questionnaires, customer requirements, listing rules, procurement conditions -- and is often answered document by document. That produces reporting effort without producing management information, and leaves the organisation restating positions it has never actually decided.',
    capability:
      'CER works from materiality outwards: what genuinely matters to this business and its stakeholders, what has to be governed, what has to be measured, and what has to be disclosed. We then build the reporting process, data definitions and internal accountability that make it repeatable.',
    outcome:
      'A defined ESG position, a reporting process that runs on a schedule rather than a scramble, and data that management can use rather than only publish.',
    seo: {
      title: 'ESG Consultancy Singapore',
      description:
        'ESG strategy, sustainability reporting, materiality assessment and ESG risk advisory for organisations in Singapore and Asia, built around what is material.',
      primaryKeyword: 'ESG consultancy Singapore',
      secondaryKeywords: ['ESG consultant Singapore', 'sustainability consultant Singapore'],
    },
  },
  {
    slug: 'compliance-standards',
    title: 'Compliance & Standards',
    navTitle: 'Compliance & Standards',
    summary:
      'Prepare for the sustainability frameworks, standards and regulatory expectations that apply to you.',
    problem:
      'Standards and regulatory regimes are not interchangeable. An organisation preparing for a management system certification, an assurance engagement and an import regime is being asked for different evidence in each case, on different timetables, by parties with different tolerances for gaps.',
    capability:
      'CER maps which requirements genuinely apply, identifies the gap between current practice and what each requires, and puts the controls, records and documentation in place. We prepare organisations for external scrutiny rather than producing a document set that has never been tested.',
    outcome:
      'A clear view of applicable obligations, a closed gap list, and evidence organised the way an auditor or verifier will ask for it.',
    seo: {
      title: 'ESG Compliance & ISO Advisory Singapore',
      description:
        'ISO advisory, CBAM readiness and assurance readiness for organisations meeting sustainability standards and regulatory requirements across Asia.',
      primaryKeyword: 'ESG compliance Singapore',
      secondaryKeywords: ['ISO consultant Singapore', 'CBAM consultant Singapore'],
    },
  },
  {
    slug: 'sustainable-finance',
    title: 'Sustainable & Green Finance',
    navTitle: 'Sustainable & Green Finance',
    summary:
      'Connect sustainability objectives with risk, financing and investment requirements.',
    problem:
      'For financial institutions, sustainability is a risk and portfolio question before it is a reporting one. Financed emissions, climate exposure in the lending book, and the credibility of a sustainability-linked structure all require methodology that supervisors and counterparties will accept.',
    capability:
      'CER supports financial institutions and borrowers on climate risk, financed emissions measurement, green and transition finance frameworks, and the sustainability performance targets that sit inside financing structures.',
    outcome:
      'Portfolio-level visibility of climate and ESG exposure, financed emissions calculated on a recognised methodology, and financing structures whose sustainability terms are defensible.',
    seo: {
      title: 'Green Finance & Climate Risk Consulting Singapore',
      description:
        'Green finance, climate risk and financed emissions advisory for banks and financial institutions in Singapore and across Asia, including PCAF measurement.',
      primaryKeyword: 'green finance consultant Singapore',
      secondaryKeywords: ['climate risk consultant Singapore', 'PCAF consultant Singapore'],
    },
  },
];

export const solutionCategoryBySlug = Object.fromEntries(
  solutionCategories.map((c) => [c.slug, c]),
);

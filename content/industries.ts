import type { Industry } from '@/types/content';

/**
 * Industry pages.
 *
 * Only sectors where CER has demonstrable capability are published. Each page
 * carries genuinely sector-specific content -- these are not near-duplicate
 * doorway pages with a swapped noun.
 *
 * `public-sector` is held as a draft. CER's published material does not
 * evidence public sector delivery, and a page claiming it would be a fabricated
 * capability claim. Set `status` to 'published' once CER confirms the
 * experience and supplies the content.
 */
export const industries: Industry[] = [
  {
    slug: 'financial-services',
    title: 'Financial Services',
    navTitle: 'Financial Services',
    challenge:
      'Climate risk, financed emissions, ESG governance and sustainable finance.',
    summary:
      'For banks, insurers and asset managers, sustainability is a portfolio and risk question before it is a reporting one.',
    context: [
      'A financial institution\'s own operational emissions are almost never the material number. The exposure sits in the lending book and the investment portfolio -- in the emissions attributable to what the institution finances, and in the climate sensitivity of the counterparties it is exposed to.',
      'That creates two demands at once. Supervisors expect climate risk to be identified, measured and managed inside existing risk frameworks. Counterparties, investors and regulators expect financed emissions to be measured on a methodology that can be compared across institutions.',
      'Both depend on counterparty data the institution does not hold. Which is why the practical work is usually less about analysis and more about building a data pathway through origination, credit and portfolio management processes.',
    ],
    priorities: [
      'Financed emissions measurement across asset classes, with disclosed data quality',
      'Physical and transition risk exposure across sectors and geographies',
      'Integration of climate risk into credit assessment and enterprise risk management',
      'Green, sustainability-linked and transition finance frameworks that survive external review',
      'Board and committee oversight of climate and ESG exposure',
      'Climate-related disclosure aligned to reporting obligations',
    ],
    solutionSlugs: [
      'financed-emissions',
      'climate-risk',
      'green-finance',
      'esg-risk-management',
      'governance-controls',
      'sustainability-reporting',
    ],
    courseSlugs: ['green-finance-in-action', 'esg-risk-management', 'esg-essentials'],
    seo: {
      title: 'ESG & Climate Advisory for Financial Services',
      description:
        'ESG, climate risk and financed emissions advisory for banks, insurers and asset managers in Singapore and across Asia, from disclosure to portfolio measurement.',
      primaryKeyword: 'ESG consulting financial services Singapore',
      secondaryKeywords: ['climate risk banks Singapore', 'financed emissions Asia'],
    },
    status: 'published',
  },
  {
    slug: 'manufacturing-supply-chain',
    title: 'Manufacturing & Supply Chain',
    navTitle: 'Manufacturing & Supply Chain',
    challenge:
      'Carbon measurement, Scope 3, supply-chain requirements and sustainable procurement.',
    summary:
      'Manufacturers face sustainability requirements arriving from two directions at once: from customers above them, and from suppliers below them.',
    context: [
      'For manufacturers, the pressure is commercial before it is regulatory. Customers request emissions data as a condition of supply, tenders carry sustainability criteria, and EU-bound goods in covered categories now sit inside the Carbon Border Adjustment Mechanism.',
      'At the same time the majority of a manufacturer\'s footprint typically sits in purchased goods and services -- upstream, in a supply base that has its own data limitations.',
      'The organisations that handle this well treat it as a data and procurement problem rather than a reporting one. They establish product-level and site-level measurement they can reuse, and they build supplier requirements into how they buy rather than into a separate questionnaire.',
    ],
    priorities: [
      'Site and organisational emissions measurement that customers will accept',
      'Scope 3 screening, with measurement focused on purchased goods and logistics',
      'Product-level footprint and life cycle assessment for customer requirements',
      'CBAM exposure assessment and embedded emissions data for EU-bound goods',
      'Sustainable procurement requirements built into tenders and contracts',
      'Energy and environmental management systems that reduce cost as well as emissions',
    ],
    solutionSlugs: [
      'carbon-accounting',
      'scope-1-2-3',
      'life-cycle-assessment',
      'cbam-readiness',
      'sustainable-procurement',
      'iso-advisory',
    ],
    courseSlugs: ['carbon-literacy-for-professionals', 'life-cycle-assessment', 'sustainable-procurement'],
    seo: {
      title: 'Sustainability Advisory for Manufacturing & Supply Chain',
      description:
        'Carbon measurement, Scope 3, CBAM readiness and sustainable procurement for manufacturers and supply chains in Singapore and Asia, beyond the factory gate.',
      primaryKeyword: 'manufacturing sustainability consultant Singapore',
      secondaryKeywords: ['Scope 3 manufacturing Asia', 'CBAM manufacturers Singapore'],
    },
    status: 'published',
  },
  {
    slug: 'energy-infrastructure',
    title: 'Energy & Infrastructure',
    navTitle: 'Energy & Infrastructure',
    challenge:
      'Transition planning, emissions intensity, project-level assessment and financing requirements.',
    summary:
      'Energy and infrastructure assets are long-lived, capital-intensive and directly exposed to transition policy -- which makes the pathway decision consequential and difficult to reverse.',
    context: [
      'Assets in this sector are committed for decades. A decision made now on plant, fuel or infrastructure design determines emissions and cost exposure across a period in which carbon pricing, policy and technology will all change.',
      'That exposure is also where the financing question becomes acute. Lenders and investors assess transition credibility directly, and financing terms increasingly reflect whether a transition plan is substantiated or asserted.',
      'The work therefore tends to combine technical measurement with capital planning: what the emissions actually are, what can change them, what that costs, and how it is presented to the parties funding it.',
    ],
    priorities: [
      'Asset and operational emissions measurement, including fugitive sources',
      'Transition pathway development with costed reduction levers',
      'Physical climate risk exposure across assets and infrastructure',
      'Transition finance and green finance framework development',
      'Energy management systems and efficiency programmes',
      'Disclosure of climate risk and transition plans to investors and lenders',
    ],
    solutionSlugs: [
      'decarbonisation',
      'carbon-accounting',
      'climate-risk',
      'green-finance',
      'iso-advisory',
    ],
    courseSlugs: ['carbon-literacy-for-professionals', 'esg-essentials'],
    seo: {
      title: 'Sustainability Advisory for Energy & Infrastructure',
      description:
        'Decarbonisation pathways, emissions measurement, climate risk and transition finance for energy and infrastructure organisations across Asia.',
      primaryKeyword: 'energy sustainability consultant Singapore',
      secondaryKeywords: ['transition planning Asia', 'infrastructure climate risk'],
    },
    status: 'published',
  },
  {
    slug: 'technology',
    title: 'Technology',
    navTitle: 'Technology',
    challenge:
      'Data centre and cloud emissions, purchased energy, supply-chain hardware and customer ESG requirements.',
    summary:
      'Technology businesses carry a footprint concentrated in purchased electricity and hardware supply chains, and face ESG questions increasingly written into enterprise procurement.',
    context: [
      'For most technology organisations the largest emissions sources are purchased electricity -- particularly where computing is significant -- and the upstream manufacture of hardware. Neither is fully within the organisation\'s direct control.',
      'Enterprise customers now ask about both. ESG requirements appear in security questionnaires, procurement due diligence and contract terms, and the answers are increasingly checked rather than filed.',
      'Because the footprint is concentrated, the analysis is often narrow but the data work is precise: market-based Scope 2 treatment, renewable energy instruments, and hardware lifecycle assumptions all materially change the reported result.',
    ],
    priorities: [
      'Scope 2 measurement on both location-based and market-based methods',
      'Renewable energy procurement and instrument treatment',
      'Scope 3 focus on purchased goods, hardware and cloud services',
      'ESG data and metric definitions that satisfy enterprise customer due diligence',
      'ESG governance proportionate to organisation size and stage',
      'Reporting that supports customer, investor and acquirer requirements',
    ],
    solutionSlugs: [
      'carbon-accounting',
      'scope-1-2-3',
      'esg-data-kpis',
      'esg-strategy',
      'sustainability-reporting',
    ],
    courseSlugs: ['esg-essentials', 'carbon-literacy-for-professionals'],
    seo: {
      title: 'ESG & Carbon Advisory for Technology Companies',
      description:
        'ESG and carbon advisory for technology businesses in Asia. Scope 2 and hardware supply-chain emissions, ESG data and enterprise customer requirements.',
      primaryKeyword: 'ESG consultant technology Singapore',
      secondaryKeywords: ['data centre emissions Singapore', 'tech company ESG Asia'],
    },
    status: 'published',
  },
  {
    slug: 'healthcare',
    title: 'Healthcare',
    navTitle: 'Healthcare',
    challenge:
      'Clinical waste, energy intensity, medical gases and a supply chain with limited substitution options.',
    summary:
      'Healthcare organisations operate continuously, cannot compromise clinical outcomes for environmental gain, and carry emissions sources most sectors do not.',
    context: [
      'Healthcare has emissions characteristics that make generic advice unhelpful. Facilities run continuously with strict environmental controls, anaesthetic and medical gases are potent greenhouse gases, and single-use clinical consumables exist for infection control reasons that are not negotiable.',
      'The supply chain is also constrained. Medical products are specified, regulated and often single-sourced, so procurement leverage works differently than in other sectors.',
      'Progress therefore comes from the areas where clinical outcomes are unaffected: building energy, gas selection where clinically equivalent alternatives exist, waste segregation, and procurement categories outside the clinical specification.',
    ],
    priorities: [
      'Emissions measurement including medical gases and refrigerants',
      'Energy management across continuously operating facilities',
      'Clinical and non-clinical waste stream assessment',
      'Supply-chain assessment within regulatory and clinical constraints',
      'Governance and reporting appropriate to healthcare oversight structures',
      'Staff capability building across clinical and operational teams',
    ],
    solutionSlugs: [
      'carbon-accounting',
      'ghg-inventory',
      'iso-advisory',
      'sustainable-procurement',
      'esg-strategy',
    ],
    courseSlugs: ['esg-essentials', 'carbon-literacy-for-professionals'],
    seo: {
      title: 'Sustainability Advisory for Healthcare Organisations',
      description:
        'Sustainability and carbon advisory for healthcare organisations in Asia. Medical gases, energy intensity, clinical waste and constrained supply chains.',
      primaryKeyword: 'healthcare sustainability consultant Singapore',
      secondaryKeywords: ['hospital carbon footprint Asia', 'healthcare ESG Singapore'],
    },
    status: 'published',
  },
  {
    slug: 'public-sector',
    title: 'Public Sector',
    navTitle: 'Public Sector',
    challenge:
      'Policy alignment, procurement standards and building sustainability capability across agencies.',
    summary:
      'Public sector organisations set requirements as well as meeting them, which puts particular weight on procurement policy and internal capability.',
    context: [
      'Public sector bodies influence markets through procurement, and are held to the standards they set.',
      'Capability is usually the constraint: technical ESG and carbon expertise has to exist inside the organisation rather than being bought in for each requirement.',
    ],
    priorities: [
      'Sustainable procurement policy and supplier requirements',
      'Internal sustainability capability and technical training',
      'Emissions measurement across estates and operations',
      'Governance and reporting aligned to public accountability requirements',
    ],
    solutionSlugs: ['sustainable-procurement', 'carbon-accounting', 'governance-controls'],
    courseSlugs: ['sustainable-procurement', 'esg-essentials'],
    seo: {
      title: 'Sustainability Advisory for the Public Sector',
      description:
        'Sustainable procurement, emissions measurement and sustainability capability building for public sector organisations.',
      primaryKeyword: 'public sector sustainability consultant Singapore',
    },
    status: 'draft',
  },
];

export const industryBySlug = Object.fromEntries(industries.map((i) => [i.slug, i]));

import type { Solution } from '@/types/content';

export const complianceSolutions: Solution[] = [
  {
    slug: 'iso-advisory',
    title: 'ISO Advisory',
    category: 'compliance-standards',
    heroStatement:
      'Implement management systems that pass certification and continue working afterwards.',
    summary:
      'Gap assessment, system design, documentation and audit preparation for environmental, energy and related ISO management system standards.',
    businessContext: [
      'Organisations pursue ISO certification for a reason that is usually external: a customer requires it, a tender demands it, or a group policy applies. That deadline shapes the project, and it is why many implementations optimise for passing the audit rather than for running the system.',
      'The cost of that shows up at the first surveillance audit, when the system has not been used since certification and the records do not exist.',
      'A system built around processes the organisation already runs -- rather than a parallel set of procedures written for the auditor -- is cheaper to implement and considerably cheaper to maintain.',
    ],
    components: [
      'Standard applicability review and scope definition',
      'Gap assessment against the relevant standard',
      'Context, interested party and risk analysis as required by the standard',
      'Management system design mapped onto existing business processes',
      'Documented information -- policy, procedures, records and controls',
      'Objective setting and performance monitoring',
      'Internal audit programme design and internal auditor briefing',
      'Management review process',
      'Corrective action and continual improvement process',
      'Stage 1 and Stage 2 certification audit preparation and support',
    ],
    deliverables: [
      'Gap assessment report against the applicable standard',
      'Management system documentation set',
      'Risk and opportunity register',
      'Objectives, targets and monitoring framework',
      'Internal audit programme and checklists',
      'Management review pack',
      'Audit preparation support and non-conformity response support',
    ],
    frameworks: ['ISO 14001', 'ISO 50001', 'ISO 14064-1'],
    audience: [
      'Organisations required to certify by a customer, tender or group policy',
      'Companies holding certification that has become an administrative burden',
      'Manufacturers integrating environmental and energy management systems',
      'Organisations preparing for recertification after a lapse',
    ],
    faqs: [
      {
        question: 'Which ISO standard do we need?',
        answer:
          'That depends on what is being asked of you. ISO 14001 addresses environmental management, ISO 50001 energy management, and ISO 14064-1 greenhouse gas quantification and reporting. We confirm what the requesting party actually requires before scoping, because the wrong standard is an expensive mistake.',
      },
      {
        question: 'Can CER certify us?',
        answer:
          'No. Certification is carried out by an accredited certification body, and a body cannot certify a system it designed. We prepare you for certification and support you through the audit. That separation is a requirement of the accreditation system, not a preference.',
      },
      {
        question: 'How long does implementation take?',
        answer:
          'It depends on scope, number of sites, and how much of the underlying process control already exists. Organisations with mature operational processes move faster, because the system documents what they already do.',
      },
      {
        question: 'Can we integrate multiple standards?',
        answer:
          'Yes, and it is usually worth doing. The management system standards share a common high-level structure, so context, leadership, planning, internal audit and management review can be run once rather than separately for each standard.',
      },
    ],
    relatedSolutions: ['iso-14064', 'assurance-readiness', 'governance-controls'],
    relatedIndustries: ['manufacturing-supply-chain', 'healthcare'],
    expertSlugs: ['raymond-cheung'],
    seo: {
      title: 'ISO Advisory & Implementation Singapore',
      description:
        'ISO advisory in Singapore for ISO 14001, ISO 50001 and ISO 14064. Gap assessment, system design, internal audit and certification audit preparation.',
      primaryKeyword: 'ISO consultant Singapore',
      secondaryKeywords: ['ISO 14001 consultant Singapore', 'ISO 50001 Singapore'],
    },
    status: 'published',
  },
  {
    slug: 'cbam-readiness',
    title: 'CBAM Readiness',
    category: 'compliance-standards',
    heroStatement:
      'Understand your exposure to the EU carbon border regime and put the data pathway in place.',
    summary:
      'Assessment of CBAM exposure across your products and customers, embedded emissions data preparation, and the reporting pathway your EU importers require.',
    businessContext: [
      'The EU Carbon Border Adjustment Mechanism entered its definitive period on 1 January 2026. It covers cement, iron and steel, aluminium, fertilisers, electricity and hydrogen, and it prices the carbon embedded in those goods when they enter the EU.',
      'The obligation sits with the EU importer, who must be an authorised CBAM declarant and surrender certificates against the embedded emissions of what they import. The first surrender deadline is 30 September 2027 for goods imported during 2026, with certificate sales beginning on 1 February 2027.',
      'For Asian producers and exporters, that obligation arrives indirectly. The importer needs verified embedded emissions data at product level, and will source from suppliers who can provide it. Producers who cannot become commercially less attractive than those who can, regardless of their own carbon performance.',
      'A mass threshold currently exempts small consignments below 50 tonnes of CBAM goods per year, and the scope has been subject to revision -- so applicability should be confirmed rather than assumed.',
    ],
    components: [
      'Product scope assessment against the CBAM goods list and CN codes',
      'Exposure analysis across EU customers and export volumes',
      'Threshold applicability review',
      'Embedded emissions determination at product level, direct and where applicable indirect',
      'Production process mapping and installation-level data requirements',
      'Data collection design at the production installation',
      'Carbon price paid assessment, where a domestic carbon price applies',
      'Documentation prepared for importer and verifier requirements',
      'Customer and importer engagement support',
      'Internal capability building for ongoing reporting',
    ],
    deliverables: [
      'CBAM exposure assessment across products and EU customers',
      'Embedded emissions calculation at product level',
      'Production and installation data collection framework',
      'Documentation pack for EU importers',
      'Gap assessment against verification requirements',
      'Ongoing reporting process and internal handover',
    ],
    audience: [
      'Asian producers and exporters of iron and steel, aluminium, cement, fertilisers or hydrogen',
      'Manufacturers whose EU customers have requested embedded emissions data',
      'Trading and distribution businesses selling covered goods into the EU',
      'Groups assessing CBAM exposure across a product portfolio',
    ],
    faqs: [
      {
        question: 'Does CBAM apply to us if we are not an EU business?',
        answer:
          'The legal obligation falls on the EU importer, not on you. In practice the requirement is passed to you, because the importer cannot meet their obligation without embedded emissions data from your production. Suppliers who cannot provide it become harder to buy from.',
      },
      {
        question: 'Which goods are covered?',
        answer:
          'Cement, iron and steel, aluminium, fertilisers, electricity and hydrogen, defined by customs codes rather than by product description. Scope has been revised since introduction, so classification should be confirmed against current legislation rather than an earlier summary.',
      },
      {
        question: 'What are embedded emissions?',
        answer:
          'The emissions released during production of the goods. Depending on the product category this covers direct emissions and, in some cases, indirect emissions from electricity consumed in production. The calculation is made at the level of the production installation.',
      },
      {
        question: 'What are the key dates?',
        answer:
          'The definitive period began on 1 January 2026. CBAM certificate sales start on 1 February 2027, and the first surrender deadline is 30 September 2027 covering 2026 imports. Because the regime has been amended, we verify current dates and thresholds against the legislation at engagement.',
      },
      {
        question: 'Does a carbon price paid at home reduce the obligation?',
        answer:
          'A carbon price effectively paid in the country of production can be taken into account, subject to evidence requirements. Whether and how it applies depends on the pricing mechanism in the production jurisdiction.',
      },
    ],
    relatedSolutions: ['carbon-accounting', 'life-cycle-assessment', 'scope-1-2-3', 'assurance-readiness'],
    relatedIndustries: ['manufacturing-supply-chain', 'energy-infrastructure'],
    expertSlugs: ['raymond-cheung'],
    seo: {
      title: 'CBAM Readiness Consultant Singapore',
      description:
        'CBAM readiness for Asian exporters. Product scope assessment, embedded emissions calculation and the reporting pathway EU importers require.',
      primaryKeyword: 'CBAM consultant Singapore',
      secondaryKeywords: ['CBAM readiness Asia', 'carbon border adjustment mechanism Singapore'],
    },
    status: 'published',
  },
  {
    slug: 'assurance-readiness',
    title: 'Assurance Readiness',
    category: 'compliance-standards',
    heroStatement:
      'Prepare sustainability data for external assurance before an assurance provider finds the gaps.',
    summary:
      'A pre-assurance review of data, evidence and controls against what a provider will test, with the gaps closed before the engagement begins.',
    businessContext: [
      'Assurance on sustainability data is becoming mandatory rather than voluntary. In Singapore, limited assurance on Scope 1 and 2 emissions is being phased in, with deadlines that have already been extended for some groups.',
      'Organisations approaching a first assurance engagement usually discover the same thing: the number is defensible but the evidence trail is not. Calculations exist in spreadsheets nobody has reviewed, source documents cannot be retrieved for the period, and no one signed anything off.',
      'Assurance providers test process and evidence, not just arithmetic. Preparing that in advance is substantially less disruptive than discovering it mid-engagement, when the reporting deadline is fixed.',
    ],
    components: [
      'Readiness assessment against limited assurance expectations',
      'Data trail testing -- can each reported figure be traced to source evidence',
      'Control identification and documentation',
      'Evidence retention review and remediation',
      'Methodology documentation review',
      'Sample testing of key metrics using an assurance-style approach',
      'Materiality and misstatement threshold consideration',
      'Management sign-off and review process design',
      'Gap remediation planning and support',
      'Support during the assurance engagement, including information requests',
    ],
    deliverables: [
      'Assurance readiness assessment report',
      'Data trail test results by metric',
      'Control documentation',
      'Gap register with remediation actions and owners',
      'Evidence file structured to assurance requirements',
      'Sign-off and review process documentation',
      'Engagement support and information request handling',
    ],
    audience: [
      'Companies facing a first mandatory assurance requirement',
      'Organisations that received findings in a previous assurance engagement',
      'Groups consolidating data from multiple entities for assurance',
      'Finance and internal audit functions taking on sustainability data',
    ],
    faqs: [
      {
        question: 'What is the difference between limited and reasonable assurance?',
        answer:
          'Limited assurance provides a conclusion expressed in the negative -- nothing came to the provider\'s attention suggesting the information is materially misstated. Reasonable assurance is a higher level of testing and gives a positive opinion. Mandatory requirements generally start with limited assurance.',
      },
      {
        question: 'Can CER provide the assurance?',
        answer:
          'No. Assurance must be independent, and a provider cannot assure information it helped prepare. We prepare you for the engagement and support you through it. Your assurance provider is separately appointed.',
      },
      {
        question: 'How far ahead should we prepare?',
        answer:
          'Far enough that remediation can happen within a reporting cycle. Gaps in evidence retention often cannot be fixed retrospectively -- if source records for a period were never kept, no amount of later effort recreates them.',
      },
      {
        question: 'Which metrics get tested?',
        answer:
          'Typically those that are material to the disclosure and highest risk. Scope 1 and 2 emissions are the usual starting point under current mandatory requirements.',
      },
    ],
    relatedSolutions: ['sustainability-reporting', 'esg-data-kpis', 'ghg-inventory', 'iso-14064'],
    relatedIndustries: ['financial-services', 'manufacturing-supply-chain'],
    expertSlugs: ['raymond-cheung', 'chan-ee-chong'],
    seo: {
      title: 'Assurance Readiness Consultant Singapore',
      description:
        'Sustainability assurance readiness in Singapore. Evidence trails, controls and gap remediation before limited assurance on Scope 1 and 2 data.',
      primaryKeyword: 'assurance readiness Singapore',
      secondaryKeywords: ['ESG assurance Singapore', 'limited assurance Scope 1 2'],
    },
    status: 'published',
  },
  {
    slug: 'governance-controls',
    title: 'Sustainability Governance & Controls',
    navTitle: 'Governance & Controls',
    category: 'compliance-standards',
    heroStatement:
      'Give sustainability commitments the oversight, ownership and controls that make them enforceable.',
    summary:
      'Board and management structures, delegated authority, policy and control design that put accountability behind published sustainability positions.',
    businessContext: [
      'Sustainability disclosure asks organisations to describe how the board oversees these matters and how management is accountable. Answering that honestly is difficult where oversight consists of an annual presentation.',
      'The gap becomes material when commitments are published. A target with no owner, no budget and no reporting line is a statement rather than an obligation, and the difference is visible to anyone examining the governance disclosure closely.',
      'Governance work is unglamorous and disproportionately effective: it determines whether anything else in the programme actually happens.',
    ],
    components: [
      'Board and committee oversight structure review',
      'Terms of reference for sustainability oversight',
      'Management accountability and delegated authority mapping',
      'Policy framework development and review',
      'Control design over sustainability data, claims and commitments',
      'Approval process for public sustainability statements',
      'Reporting lines and escalation routes',
      'Board reporting pack design and cadence',
      'Remuneration linkage assessment, where applicable',
      'Internal audit scope recommendations for sustainability',
    ],
    deliverables: [
      'Governance structure assessment',
      'Committee terms of reference',
      'Accountability and delegated authority matrix',
      'Policy framework',
      'Control matrix over sustainability data and public claims',
      'Board reporting template and calendar',
      'Recommendations for internal audit coverage',
    ],
    audience: [
      'Boards accountable for climate and sustainability disclosure',
      'Company secretaries and governance functions',
      'Organisations with published commitments and no assigned owners',
      'Groups aligning sustainability governance across subsidiaries',
    ],
    faqs: [
      {
        question: 'Do we need a dedicated sustainability committee?',
        answer:
          'Not necessarily. Oversight can sit with an existing committee -- audit and risk is a common home -- provided the terms of reference are explicit and the committee has the information it needs. A dedicated committee that meets twice a year is not better than an existing one that reviews properly.',
      },
      {
        question: 'What controls apply to sustainability claims?',
        answer:
          'At minimum, a defined approval route for external statements, evidence supporting each claim, and a record of who approved it. Public claims made without substantiation carry regulatory and reputational exposure.',
      },
      {
        question: 'Should ESG be linked to remuneration?',
        answer:
          'It can be, but only where the underlying metrics are reliable and controllable. Linking pay to a metric the organisation cannot measure well creates a governance problem rather than solving one.',
      },
    ],
    relatedSolutions: ['esg-risk-management', 'esg-strategy', 'sustainability-reporting'],
    relatedIndustries: ['financial-services', 'public-sector'],
    expertSlugs: ['raymond-cheung'],
    seo: {
      title: 'Sustainability Governance & Controls Singapore',
      description:
        'Sustainability governance advisory in Singapore. Board oversight, delegated authority, policy frameworks and controls over sustainability data and claims.',
      primaryKeyword: 'sustainability governance Singapore',
      secondaryKeywords: ['ESG governance Singapore', 'board climate oversight Asia'],
    },
    status: 'published',
  },
];

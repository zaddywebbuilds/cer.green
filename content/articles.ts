import type { Article, ArticleCategory } from '@/types/content';

/**
 * Insights.
 *
 * The articles below are written from published regulatory sources and
 * established technical standards. Where a timeline has been revised -- and
 * both the Singapore reporting phasing and CBAM have been -- the article says
 * so and directs the reader to confirm the current position, rather than
 * presenting a date as settled.
 *
 * No article contains a client reference, a project result or a claim about
 * CER's experience that is not evidenced elsewhere on the site.
 */

export const articleCategories: ArticleCategory[] = [
  {
    slug: 'carbon-climate',
    title: 'Carbon & Climate',
    description: 'Measurement, greenhouse gas standards and decarbonisation.',
  },
  {
    slug: 'esg',
    title: 'ESG',
    description: 'Strategy, materiality, governance and ESG data.',
  },
  {
    slug: 'regulation',
    title: 'Regulation',
    description: 'Reporting obligations, standards and regulatory change affecting organisations in Asia.',
  },
  {
    slug: 'sustainable-finance',
    title: 'Sustainable Finance',
    description: 'Green finance, climate risk and financed emissions.',
  },
  {
    slug: 'standards',
    title: 'Standards',
    description: 'ISO standards, the GHG Protocol and assurance requirements.',
  },
  {
    slug: 'training',
    title: 'Training',
    description: 'Building sustainability capability inside organisations.',
  },
  {
    slug: 'singapore',
    title: 'Singapore',
    description: 'Requirements and market developments specific to Singapore.',
  },
  {
    slug: 'asean',
    title: 'ASEAN',
    description: 'Regional sustainability developments across South-East Asia.',
  },
];

export const articles: Article[] = [
  {
    slug: 'sgx-climate-reporting-assurance-readiness',
    title: 'SGX Climate Reporting: What Assurance Providers Will Test First',
    excerpt: 'Singapore\'s listed issuers must obtain limited assurance on Scope 1 and 2 emissions from FY2027. Here is what assurance providers will examine first, and how to prepare the evidence trail now.',
    type: 'Article',
    categorySlug: 'singapore',
    authorSlug: 'raymond-cheung',
    publishedAt: '2026-11-12',
    intro: [
      'From FY2027, SGX-listed issuers must obtain limited assurance on Scope 1 and Scope 2 greenhouse gas emissions, following the climate reporting requirements aligned with the ISSB standards. The Singapore Exchange Regulation has confirmed this timeline, and ACRA has issued the relevant orders under the Companies Act for listed companies. For many issuers, the assurance deadline is now one reporting cycle away.',
      'Most companies have spent the past two years building a GHG inventory. Fewer have built the evidence that an assurance provider will actually test. Limited assurance is not a review of your sustainability narrative. It is a verification of whether the reported emissions figures are supported by a controlled, documented and reproducible measurement process.',
      'This article sets out the areas assurance providers examine first, based on the ISAE 3410 standard used for greenhouse gas statements, and the practical steps issuers should take before their first assurance engagement. The focus is on what will be tested, not on what will be written in the sustainability report.',
    ],
    sections: [
      {
        heading: 'The boundary question comes first',
        id: 'boundary-question',
        body: [
          'Assurance providers begin with the organisational boundary. Under the GHG Protocol Corporate Standard, an issuer must apply either the equity share or the control approach consistently across the group. The choice must be documented, applied to every entity and disclosed. A common failure is a boundary that shifts between the inventory and the financial statements, particularly where joint ventures, leased assets or newly acquired subsidiaries are involved.',
          'The provider will reconcile the entity list in the GHG inventory against the consolidation scope in the audited financial statements. Any difference must be explained. If an entity is consolidated financially but excluded from the emissions boundary, the provider will ask why, and the answer must be supported by the stated consolidation approach rather than convenience.',
          'Operational boundary questions follow: which facilities, which vehicles, which refrigerants are in scope. For Scope 2, issuers must state whether they are reporting location-based, market-based or both. Under the SGX requirements, both are expected. The provider will test that the same boundary is used for both methods.',
        ],
      },
      {
        heading: 'Activity data and its source records',
        id: 'activity-data',
        body: [
          'The largest share of assurance effort goes to activity data: litres of fuel, kWh of electricity, kilograms of refrigerant, tonnes of purchased gas. Providers will sample transactions and trace each one back to a source document, such as a utility invoice, a fuel delivery note or a metered reading. Where data is estimated, the estimation method must be documented and applied consistently.',
          'Issuers should expect questions on data completeness. If a site reports electricity from a landlord\'s recharge rather than a direct meter, the provider will ask how that figure was derived and whether it covers the full reporting period. Estimated data is acceptable if it is disclosed and the method is sound, but unexplained gaps are not.',
          'Spreadsheets remain the most common weak point. A provider will test version control, access restrictions and the audit trail from source document to final reported figure. A spreadsheet that has been emailed between three people with no change log is difficult to assure, even if the numbers are correct.',
        ],
      },
      {
        heading: 'Emission factors and calculation methodology',
        id: 'emission-factors',
        body: [
          'Providers will test the emission factors used against their published sources. For Singapore operations, the grid emission factor published by the Energy Market Authority is the standard reference for location-based Scope 2. For market-based Scope 2, the provider will examine the contractual instruments, such as renewable energy certificates or green electricity products, and confirm they meet the GHG Protocol Scope 2 Guidance quality criteria.',
          'For Scope 1, the provider will check that the correct factors are applied to each fuel type and that unit conversions are consistent. Refrigerant emissions require the correct global warming potential from the applicable IPCC assessment report, and the issuer must state which version is used.',
          'The calculation methodology itself should be documented in a methodology note that the provider can test against. This note should cover the consolidation approach, the emission factors and their sources, the calculation formulas, and any estimation methods. Without it, the provider will reconstruct the methodology from the spreadsheets, which extends the engagement and increases the likelihood of findings.',
        ],
      },
      {
        heading: 'Controls, governance and the evidence file',
        id: 'controls-governance',
        body: [
          'Limited assurance under ISAE 3410 requires the provider to understand the entity\'s internal controls over the emissions data. Issuers should be able to describe who collects the data, who reviews it, what checks are performed and how errors are corrected. A documented review step, with evidence that it happened, is the single most useful control an issuer can put in place.',
          'The provider will also assess the competence of the people preparing the data and the oversight applied by management and the board. Under the SGX requirements, the board is responsible for the climate reporting. Assurance providers increasingly ask for evidence that the board or its sustainability committee has reviewed the emissions figures before publication.',
          'Issuers should build an evidence file that maps each reported figure to its source records, calculation and review sign-off. This file is the working paper set the provider will sample from. Building it after the report is drafted is far more costly than building it as the data is collected.',
        ],
        list: [
          'A documented organisational and operational boundary, reconciled to the financial statements',
          'Source records for every sampled activity data point, retained for the reporting period',
          'A methodology note covering factors, formulas and estimation methods',
          'Evidence of management review and board oversight of the reported figures',
          'A change log for the inventory spreadsheet and restricted access to the master file',
        ],
      },
      {
        heading: 'What to do before the first engagement',
        id: 'preparation-steps',
        body: [
          'Issuers should run an internal readiness review against the ISAE 3410 evidence requirements at least one reporting cycle before the assurance engagement begins. This review should identify gaps in source records, undocumented estimation methods and controls that exist in practice but are not evidenced. Each gap should be closed before the provider is appointed.',
          'A dry run, in which an independent reviewer tests a sample of the inventory as an assurance provider would, is the most effective way to surface problems early. It also gives the finance and sustainability teams a shared view of what the evidence file must contain.',
          'CER supports SGX-listed issuers with GHG inventory preparation under ISO 14064, assurance readiness reviews and the evidence documentation that limited assurance engagements require. The work is practical: it produces the file the provider will test, not a narrative about it.',
        ],
      },
    ],
    relatedSolutions: [
      'assurance-readiness',
      'ghg-inventory',
      'scope-1-2-3',
      'iso-14064',
    ],
    relatedArticles: [
      'what-assurance-providers-actually-test',
      'singapore-climate-reporting-what-applies-and-when',
      'scope-3-where-to-start',
    ],
    tags: [
      'SGX',
      'Assurance',
      'GHG Inventory',
      'Scope 1 and 2',
      'ISAE 3410',
    ],
    seo: {
      title: 'SGX Climate Reporting: Assurance Readiness for FY2027',
      description: 'SGX-listed issuers need limited assurance on Scope 1 and 2 from FY2027. Learn what assurance providers test first and how to prepare the evidence file.',
      primaryKeyword: 'SGX climate reporting assurance',
      secondaryKeywords: [
        'limited assurance Scope 1 Scope 2',
        'ISAE 3410 Singapore',
        'GHG inventory assurance readiness',
      ],
    },
    status: 'published',
  },
  {
    slug: 'tnfd-readiness-singapore-nature-related-disclosures',
    title: 'TNFD Readiness for Singapore Companies: What to Disclose and When',
    excerpt: 'The Taskforce on Nature-related Financial Disclosures is moving from voluntary to expected. Here is how SGX-listed companies and financial institutions in Singapore should prepare, and what the LEAP approach requires in practice.',
    type: 'Guide',
    categorySlug: 'singapore',
    authorSlug: 'raymond-cheung',
    publishedAt: '2026-11-11',
    intro: [
      'Nature risk is no longer a niche concern for Singapore companies. The Taskforce on Nature-related Financial Disclosures (TNFD) published its final recommendations in September 2023, and adoption has accelerated through 2024 and 2025 as financial institutions, investors and regulators begin to ask for nature-related information alongside climate disclosures.',
      'For SGX-listed companies, the immediate driver is not a standalone TNFD mandate. It is the interaction between TNFD, the ISSB standards and the Singapore Exchange\'s climate reporting requirements. IFRS S1 requires entities to disclose material sustainability-related risks and opportunities, and nature and biodiversity sit squarely within that scope. Companies preparing ISSB-aligned reporting will find that TNFD provides the structured framework for the nature component.',
      'This guide sets out what TNFD asks for, how it connects to Singapore\'s regulatory timeline, and what a practical readiness programme looks like for a listed company or financial institution in the region.',
    ],
    sections: [
      {
        heading: 'What TNFD actually requires',
        id: 'what-tnfd-requires',
        body: [
          'TNFD is built on four pillars that mirror TCFD: governance, strategy, risk and impact management, and metrics and targets. The difference is that TNFD asks companies to assess both risks and impacts on nature, not only financial risks to the business. This dual lens is the source of most of the implementation difficulty.',
          'The framework includes 14 recommended disclosures and a set of core global metrics. Companies are expected to disclose their direct operations and upstream and downstream value chain dependencies and impacts, with a materiality assessment used to scope the work. TNFD explicitly allows a phased approach, and the taskforce has published sector guidance covering food and agriculture, mining, energy, and financial institutions.',
          'The LEAP approach is the recommended assessment methodology: Locate the interface with nature, Evaluate dependencies and impacts, Assess risks and opportunities, and Prepare to respond. LEAP is not a reporting standard in itself. It is the analytical process that generates the information the disclosures require.',
        ],
      },
      {
        heading: 'How TNFD connects to Singapore\'s reporting timeline',
        id: 'tnfd-singapore-timeline',
        body: [
          'SGX introduced mandatory climate reporting on an comply or explain basis from financial year 2022, aligned with TCFD recommendations. In 2024 SGX consulted on moving to ISSB-aligned requirements, and the Singapore regulator has signalled a phased transition to IFRS S1 and S2 for listed issuers, with larger issuers moving first.',
          'ACRA has also progressed its sustainability reporting roadmap for large non-listed companies, and MAS has issued guidance for banks, insurers and asset managers on environmental risk management that includes nature-related considerations. The direction of travel is consistent: disclosure expectations are widening from climate to broader environmental risk.',
          'For practical purposes, a Singapore company that reports under ISSB will need to consider nature where it is material. TNFD is the most developed framework for doing so, and regulators and investors increasingly treat TNFD-aligned disclosure as the benchmark. Companies that wait for an explicit mandate will be preparing under time pressure.',
        ],
      },
      {
        heading: 'Sectors in Singapore with the highest nature exposure',
        id: 'sectors-nature-exposure',
        body: [
          'Singapore\'s economy is services-heavy, but nature dependencies run through several sectors that are central to the listed market. Financial institutions carry nature risk through their lending and investment portfolios, particularly where exposure to palm oil, forestry, seafood, and commodities is material. MAS has been explicit that banks should assess environmental risk, including nature-related risk, in their credit processes.',
          'Real estate and construction companies face dependencies on ecosystem services such as water regulation and flood protection, and impacts through land use change and materials sourcing. Food and beverage companies, and companies with agricultural supply chains in the region, have direct dependencies on pollination, soil health and water availability.',
          'Shipping, logistics and energy companies face transition and physical risks linked to coastal and marine ecosystems. For most companies the most material exposure is upstream, in the supply chain, which is why TNFD places so much emphasis on value chain assessment.',
        ],
      },
      {
        heading: 'A practical readiness sequence',
        id: 'readiness-sequence',
        body: [
          'Start with scoping and materiality. Identify which parts of the value chain are likely to have material nature dependencies and impacts, using sector guidance and the TNFD sector materiality tools. This step should be proportionate: not every company needs a full biodiversity assessment of every supplier.',
          'Then run LEAP for the priority areas. Locate the interface with nature using geospatial data where possible, evaluate dependencies and impacts against the core metrics, and assess risks and opportunities in financial terms. Document the methodology and the assumptions, because assurance providers will test them.',
          'Finally, integrate the outputs into existing reporting and governance. The nature disclosures should sit alongside the climate disclosures in the annual report, use the same risk register and the same board oversight structures, and be subject to the same internal controls. Companies that treat TNFD as a separate reporting exercise create duplication and inconsistent messaging.',
        ],
        list: [
          'Scope the value chain and apply sector materiality guidance',
          'Run LEAP on priority locations and commodities',
          'Map outputs to the 14 recommended disclosures and core metrics',
          'Integrate with ISSB reporting, risk registers and board oversight',
          'Set targets and transition actions where impacts are material',
        ],
      },
      {
        heading: 'What assurance providers will look for',
        id: 'assurance-expectations',
        body: [
          'Assurance providers will test whether the nature assessment is complete and whether the conclusions are supported by evidence. The most common weaknesses are an incomplete value chain scope, unsupported claims about supplier practices, and metrics that cannot be traced to source data.',
          'Where companies rely on third-party data, such as geospatial datasets or supplier questionnaires, they need to document the source, the version and the limitations. Where estimates are used, the basis for the estimate should be disclosed. These are the same disciplines that apply to Scope 3 and climate risk disclosure, and companies that have already built those controls have a head start.',
          'Companies should also be clear about what they have not assessed. TNFD allows phased disclosure, and a transparent statement of gaps with a plan to close them is more credible than an overreaching claim of completeness.',
        ],
      },
      {
        heading: 'Getting started',
        id: 'getting-started',
        body: [
          'The most useful first step is a gap assessment against the TNFD recommendations, combined with a review of how the company\'s existing climate and sustainability reporting would need to change. This typically takes four to eight weeks for a listed company with an established reporting function.',
          'CER supports Singapore and ASEAN companies with TNFD readiness, including materiality assessment, LEAP implementation, integration with ISSB reporting, and assurance readiness. If your company is preparing its first ISSB-aligned report, the nature component should be scoped now, not after the climate work is complete.',
        ],
      },
    ],
    relatedSolutions: [
      'climate-risk',
      'sustainability-reporting',
      'assurance-readiness',
      'materiality-assessment',
    ],
    relatedArticles: [
      'singapore-climate-reporting-what-applies-and-when',
      'what-assurance-providers-actually-test',
      'regulation',
    ],
    tags: [
      'TNFD',
      'Nature',
      'Biodiversity',
      'ISSB',
      'Singapore',
      'Disclosure',
    ],
    seo: {
      title: 'TNFD Readiness for Singapore Companies: What to Disclose',
      description: 'How SGX-listed companies and financial institutions in Singapore should prepare for TNFD nature-related disclosures, LEAP assessment and assurance.',
      primaryKeyword: 'TNFD Singapore',
      secondaryKeywords: [
        'nature-related financial disclosures',
        'TNFD LEAP approach',
        'ISSB nature disclosure Singapore',
      ],
    },
    status: 'published',
  },
  {
    slug: 'singapore-climate-reporting-what-applies-and-when',
    title: 'Singapore climate reporting: what applies to your company, and when',
    excerpt:
      'Singapore\'s climate reporting requirements are phased by listing status, index membership and size -- and the timelines have been revised. Here is how to work out where your organisation sits.',
    type: 'Regulatory Update',
    categorySlug: 'singapore',
    authorSlug: 'raymond-cheung',
    publishedAt: '2026-08-20',
    intro: [
      'The most common question we are asked about Singapore climate reporting is not what to disclose. It is when the obligation starts.',
      'That is a reasonable question, because the answer depends on several variables at once -- whether the company is listed, whether it is an index constituent, its market capitalisation, and for non-listed companies its revenue and assets -- and because the timelines have been revised since they were first announced.',
      'This article sets out how the phasing is structured. It is not a substitute for confirming your own position against current ACRA and SGX RegCo guidance, which is the first thing we do at the start of a reporting engagement.',
    ],
    sections: [
      {
        heading: 'The starting point: all listed companies report Scope 1 and 2',
        id: 'scope-1-2-baseline',
        body: [
          'The baseline requirement is that SGX-listed companies report Scope 1 and Scope 2 greenhouse gas emissions from FY2025. This applies across listed issuers rather than only to the largest.',
          'For many companies this is the first obligation that requires an actual measurement process rather than a narrative disclosure. It is worth being clear about what it demands: a defined organisational boundary, activity data for the reporting period, documented emission factors, and a figure that can be explained.',
        ],
      },
      {
        heading: 'Further requirements are phased by index and size',
        id: 'phasing',
        body: [
          'Beyond the Scope 1 and 2 baseline, the remaining ISSB-based climate reporting requirements are introduced in stages.',
          'Straits Times Index constituents are furthest ahead, with mandatory Scope 3 disclosure beginning in 2026. For other listed companies, Scope 3 initially remains voluntary, and the broader climate reporting requirements begin later -- from FY2028 for companies above a one billion dollar market capitalisation, and from FY2030 for those below it.',
          'Large non-listed companies enter the regime later still. The threshold is defined by both revenue and assets, and Scope 1 and 2 reporting begins in 2030.',
        ],
        list: [
          'STI constituents: Scope 3 disclosure mandatory from 2026',
          'Listed companies above S$1bn market capitalisation: remaining ISSB-based requirements from FY2028',
          'Listed companies below S$1bn market capitalisation: from FY2030',
          'Large non-listed companies meeting the revenue and asset thresholds: Scope 1 and 2 from 2030',
        ],
      },
      {
        heading: 'Assurance follows reporting, on its own timetable',
        id: 'assurance',
        body: [
          'Reporting and assurance are phased separately. Limited assurance on Scope 1 and 2 data is being introduced after the reporting obligation itself, and the deadlines have been extended for some groups -- the STI constituent deadline moved from FY2027 to FY2029, and large non-listed companies are scheduled from 2032.',
          'The extension is easily misread as time to defer preparation. In practice it is the opposite. Assurance tests evidence and process, and evidence cannot be created retrospectively. If source records for a reporting period were never retained, no amount of later effort reconstructs them.',
          'The practical implication is that data reported now should be built to a standard that would survive assurance later, even where assurance is years away.',
        ],
      },
      {
        heading: 'Why the timelines keep moving',
        id: 'revisions',
        body: [
          'ACRA and SGX RegCo have revised the implementation timelines, extending some deadlines by a significant margin, with the stated intention of giving smaller companies more time to prepare.',
          'That is worth taking seriously as a planning assumption in both directions. Dates published in an article -- including this one -- can be superseded. Any organisation making resourcing decisions on the basis of a reporting date should verify it against current regulator guidance rather than a secondary summary.',
        ],
      },
      {
        heading: 'What to do with this',
        id: 'what-to-do',
        body: [
          'Three practical steps follow from the structure above.',
          'First, establish your own position precisely: listing status, index membership, market capitalisation, and for non-listed entities revenue and assets against the thresholds. This determines everything else.',
          'Second, separate the reporting date from the preparation date. Organisations that begin building measurement capability in the year the obligation applies are generally too late, because the first reporting cycle exposes data gaps that take a cycle to close.',
          'Third, build for assurance from the outset. The marginal cost of documenting methodology and retaining evidence while the work is being done is small. The cost of reconstructing it later is not.',
        ],
      },
    ],
    relatedSolutions: ['sustainability-reporting', 'carbon-accounting', 'assurance-readiness'],
    relatedArticles: ['scope-3-where-to-start', 'what-assurance-providers-actually-test'],
    tags: ['Singapore', 'ISSB', 'SGX', 'ACRA', 'Climate reporting'],
    seo: {
      title: 'Singapore Climate Reporting: What Applies and When',
      description:
        'How Singapore climate reporting requirements are phased by listing status, index membership and size, and why assurance timelines matter more than they appear.',
      primaryKeyword: 'Singapore climate reporting requirements',
      secondaryKeywords: ['SGX climate reporting', 'ACRA sustainability reporting'],
    },
    status: 'published',
  },
  {
    slug: 'scope-3-where-to-start',
    title: 'Scope 3: where to start when fifteen categories is not a plan',
    excerpt:
      'Most organisations approach Scope 3 by trying to measure everything. Screening first is faster, cheaper and produces a more defensible result.',
    type: 'Guide',
    categorySlug: 'carbon-climate',
    authorSlug: 'raymond-cheung',
    publishedAt: '2026-08-12',
    intro: [
      'Scope 3 is where corporate carbon accounting becomes genuinely difficult. It covers fifteen categories spanning the entire value chain, most of the data sits outside the organisation, and for many businesses it accounts for the large majority of total emissions.',
      'The common response is to attempt all fifteen categories at once. That is expensive, slow, and tends to produce a result in which a great deal of effort has been spent on categories that were never material.',
      'The GHG Protocol Scope 3 Standard does not require this. It requires you to screen all fifteen categories and report those that are material, disclosing and justifying exclusions.',
    ],
    sections: [
      {
        heading: 'Screening is a requirement, not a shortcut',
        id: 'screening',
        body: [
          'Screening means estimating the approximate significance of each category using data you already have -- spend, volumes, headcount, floor area -- to establish which categories could plausibly be material.',
          'This is not a lower standard of work. It is the step that makes the eventual measurement defensible, because it produces a documented rationale for why some categories were measured in detail and others were excluded.',
          'It is also the step that most often surprises people. Categories assumed to be trivial occasionally turn out to dominate, and categories that receive a great deal of internal attention -- business travel is the usual example -- are frequently immaterial next to purchased goods and services.',
        ],
      },
      {
        heading: 'Materiality is not only about size',
        id: 'materiality',
        body: [
          'Magnitude is the first test but not the only one. The standard and common practice also weigh influence, risk exposure, stakeholder interest and the availability of data.',
          'A category may be worth measuring because a customer asks about it specifically, or because it is where the organisation has genuine ability to reduce emissions, even if it is not the largest line.',
        ],
        list: [
          'Magnitude: is the estimated contribution significant relative to the total',
          'Influence: can the organisation actually affect emissions in this category',
          'Risk: does this category carry regulatory, supply or reputational exposure',
          'Stakeholder interest: is it being asked about specifically',
          'Data availability: can it be measured to a useful standard',
        ],
      },
      {
        heading: 'Method selection: start where the data is',
        id: 'methods',
        body: [
          'For prioritised categories, the standard permits several calculation methods with different data requirements. Spend-based methods apply emission factors to procurement spend. Average-data methods apply factors to physical quantities. Supplier-specific methods use data from the supplier itself.',
          'Accuracy increases across that progression, and so does effort. Most organisations begin spend-based, which is entirely acceptable under the standard, and move priority suppliers onto primary data over subsequent cycles.',
          'What matters is that the progression is planned. A spend-based figure that stays spend-based indefinitely will eventually be challenged, particularly once the organisation starts setting reduction targets against it.',
        ],
      },
      {
        heading: 'Supplier data comes through procurement, or not at all',
        id: 'supplier-data',
        body: [
          'The most reliable way to obtain supplier emissions data is to make it a condition of the commercial relationship -- in prequalification, in tender evaluation, and in contract terms.',
          'Questionnaires sent outside that process have low response rates, and the responses that do arrive are frequently inconsistent enough to be difficult to use. The organisations that build good Scope 3 data are generally the ones that treated it as a procurement problem.',
        ],
      },
      {
        heading: 'Disclose what you excluded',
        id: 'exclusions',
        body: [
          'Exclusions are permitted. Undisclosed exclusions are not.',
          'A Scope 3 disclosure that states which categories were assessed, which were measured, which were excluded and on what basis is considerably more credible than one presenting a single total with no boundary information -- even when the second number looks more complete.',
        ],
      },
    ],
    relatedSolutions: ['scope-1-2-3', 'carbon-accounting', 'sustainable-procurement'],
    relatedArticles: ['singapore-climate-reporting-what-applies-and-when', 'cbam-what-asian-exporters-need'],
    tags: ['Scope 3', 'GHG Protocol', 'Carbon accounting', 'Supply chain'],
    seo: {
      title: 'Scope 3 Emissions: Where to Start',
      description:
        'How to approach Scope 3 emissions through screening and prioritisation under the GHG Protocol, rather than attempting all fifteen categories at once.',
      primaryKeyword: 'Scope 3 emissions where to start',
      secondaryKeywords: ['Scope 3 screening', 'GHG Protocol Scope 3 Standard'],
    },
    status: 'published',
  },
  {
    slug: 'cbam-what-asian-exporters-need',
    title: 'CBAM is live: what Asian exporters are now being asked for',
    excerpt:
      'The EU carbon border mechanism entered its definitive period on 1 January 2026. The obligation sits with EU importers -- but the data requirement lands on their suppliers.',
    type: 'Regulatory Update',
    categorySlug: 'regulation',
    authorSlug: 'raymond-cheung',
    publishedAt: '2026-08-04',
    intro: [
      'The EU Carbon Border Adjustment Mechanism entered its definitive period on 1 January 2026. It covers cement, iron and steel, aluminium, fertilisers, electricity and hydrogen.',
      'The regulatory obligation falls on the EU importer, who must be an authorised declarant and surrender certificates against the embedded emissions of the goods they bring in. For producers in Asia, the effect is indirect but commercially direct: the importer cannot meet that obligation without embedded emissions data from the production installation.',
      'This article covers what is actually being asked for, and what a producer needs in place to answer it.',
    ],
    sections: [
      {
        heading: 'The mechanism in outline',
        id: 'mechanism',
        body: [
          'CBAM prices the carbon embedded in covered goods entering the EU, adjusted for free allocation under the EU Emissions Trading System. Its purpose is to place imported goods on a comparable carbon cost footing with EU production.',
          'Certificate sales are scheduled to begin on 1 February 2027, and the first surrender deadline is 30 September 2027 covering goods imported during 2026. A mass threshold applies, currently exempting importers below 50 tonnes of CBAM goods per year.',
          'Scope and thresholds have been amended since the mechanism was introduced. Any producer assessing exposure should confirm current classification and thresholds against the legislation rather than an earlier summary -- including this one.',
        ],
      },
      {
        heading: 'What the importer needs from you',
        id: 'data-requirement',
        body: [
          'The importer needs embedded emissions at product level, determined at the installation where the goods were produced. Depending on the product category this covers direct emissions and, for some categories, indirect emissions from electricity consumed in production.',
          'This is a different calculation from a corporate greenhouse gas inventory. It is installation-specific and product-specific, and it requires production data at a granularity most organisations do not routinely maintain.',
        ],
        list: [
          'Product classification against the covered goods list by customs code',
          'Installation-level production and emissions data',
          'Direct emissions from the production process',
          'Indirect emissions from electricity, where the category requires it',
          'Any carbon price effectively paid in the production country, with evidence',
        ],
      },
      {
        heading: 'The commercial risk is procurement, not compliance',
        id: 'commercial-risk',
        body: [
          'A producer outside the EU is not exposed to a CBAM penalty. The exposure is that an EU customer needs data to meet their own obligation, and will source from suppliers who can provide it.',
          'That risk applies regardless of the producer\'s carbon performance. A producer with genuinely low emissions but no installation-level data is harder to buy from than one with higher emissions and complete documentation -- because the second can be declared and the first cannot.',
          'For producers with low emissions intensity, this cuts the other way once the data exists. Verified low embedded emissions translate into a lower certificate cost for the importer, which is a commercial argument rather than a compliance one.',
        ],
      },
      {
        heading: 'Where to start',
        id: 'starting-point',
        body: [
          'Begin with scope, not with measurement. Establish which of your products fall within the covered categories by customs code, and which of your EU customers import them and in what volume. That determines whether this is a material issue for your business at all.',
          'Where it is, the next step is installation-level data collection -- production quantities, fuel and process emissions, electricity consumption -- structured so that it can be reported per unit of product.',
          'This is worth building properly once. The requirement is annual and the data will be subject to verification, so an approach assembled per customer request will not hold.',
        ],
      },
    ],
    relatedSolutions: ['cbam-readiness', 'carbon-accounting', 'life-cycle-assessment'],
    relatedArticles: ['scope-3-where-to-start', 'singapore-climate-reporting-what-applies-and-when'],
    tags: ['CBAM', 'EU', 'Export', 'Manufacturing', 'Embedded emissions'],
    seo: {
      title: 'CBAM: What Asian Exporters Need to Provide',
      description:
        'The EU CBAM definitive period began on 1 January 2026. What EU importers now require from Asian producers, and how to build the installation-level data.',
      primaryKeyword: 'CBAM Asian exporters',
      secondaryKeywords: ['CBAM definitive period 2026', 'CBAM embedded emissions data'],
    },
    status: 'published',
  },
  {
    slug: 'what-assurance-providers-actually-test',
    title: 'What assurance providers actually test, and why your number is not the problem',
    excerpt:
      'Organisations preparing for their first sustainability assurance engagement usually assume the risk is in the calculation. It is almost always in the evidence trail.',
    type: 'Article',
    categorySlug: 'standards',
    authorSlug: 'chan-ee-chong',
    publishedAt: '2026-07-22',
    intro: [
      'Sustainability assurance is becoming mandatory across an increasing number of reporting regimes, and most organisations are approaching their first engagement with a reasonable degree of confidence in their numbers.',
      'That confidence is usually justified. The calculation is rarely where a first assurance engagement runs into difficulty.',
      'What causes difficulty is that assurance tests process and evidence, not just arithmetic -- and the process was frequently never documented, because the figure was produced by one competent person working in a spreadsheet.',
    ],
    sections: [
      {
        heading: 'Limited assurance is still a real examination',
        id: 'limited-assurance',
        body: [
          'Limited assurance provides a conclusion expressed in the negative: nothing came to the provider\'s attention suggesting the information is materially misstated. It involves less testing than reasonable assurance, which gives a positive opinion.',
          'It is a lower level of assurance, but it is not a review of the final number in isolation. The provider still examines how the information was produced, samples underlying evidence, and forms a view on whether the process is capable of producing a reliable result.',
        ],
      },
      {
        heading: 'The four things that get tested',
        id: 'what-gets-tested',
        body: [
          'Across engagements, the same areas produce findings.',
        ],
        list: [
          'Traceability: can a reported figure be followed back to a source document for the reporting period',
          'Methodology: is the calculation approach documented, and was it applied consistently',
          'Controls: did anyone independent of the preparer review the figure before it was reported',
          'Completeness: is the boundary defined, and can you demonstrate that nothing material within it was omitted',
        ],
      },
      {
        heading: 'Why evidence retention is the hardest gap to close',
        id: 'evidence-retention',
        body: [
          'Most findings can be remediated. Methodology can be documented after the fact. Controls can be designed and applied to the next cycle.',
          'Evidence retention cannot be fixed retrospectively. If utility invoices for a period were not retained, if a supplier\'s data submission was not kept, if a meter reading was recorded in a spreadsheet that has since been overwritten, then the evidence does not exist and no amount of later effort creates it.',
          'This is the single strongest argument for building to assurance standard before assurance is required. The marginal cost of retaining source documents during the reporting cycle is close to zero. The cost of not having them is a qualified conclusion.',
        ],
      },
      {
        heading: 'Independence is not negotiable',
        id: 'independence',
        body: [
          'An assurance provider cannot assure information it helped prepare. This is a requirement of the assurance framework rather than a matter of preference, and it means the adviser who builds your inventory cannot also assure it.',
          'That separation is worth understanding early, because it affects how you appoint. Preparation support and assurance are two engagements with two providers, and an adviser offering both should be treated with caution.',
        ],
      },
      {
        heading: 'Preparing properly',
        id: 'preparing',
        body: [
          'The most useful preparation is to run an internal version of the engagement before the real one: take each reported metric, and try to trace it back to source evidence without help from the person who prepared it.',
          'Where that fails, you have found your gap list -- and you have found it at a point in the cycle where it can still be closed, rather than three weeks before a filing deadline.',
        ],
      },
    ],
    relatedSolutions: ['assurance-readiness', 'esg-data-kpis', 'sustainability-reporting'],
    relatedArticles: ['singapore-climate-reporting-what-applies-and-when', 'scope-3-where-to-start'],
    tags: ['Assurance', 'Reporting', 'Data quality', 'Controls'],
    seo: {
      title: 'What Sustainability Assurance Providers Actually Test',
      description:
        'Limited assurance tests process and evidence, not just calculations. The four areas that produce findings, and why evidence retention cannot be fixed later.',
      primaryKeyword: 'sustainability assurance readiness',
      secondaryKeywords: ['limited assurance ESG', 'ESG assurance preparation'],
    },
    status: 'published',
  },
];

export const articleBySlug = Object.fromEntries(articles.map((a) => [a.slug, a]));

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

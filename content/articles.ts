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
    slug: 'carbon-accounting-team-training-singapore',
    title: 'Building a Carbon Accounting Team That Can Withstand Assurance: What to Train and Who to Train',
    excerpt: 'SGX climate reporting under IFRS S1 and S2 will test the competence of the team behind the numbers. Here is what a competent carbon accounting function needs to know, and how to build it without hiring an army.',
    type: 'Article',
    categorySlug: 'training',
    authorSlug: 'raymond-cheung',
    publishedAt: '2026-11-18',
    intro: [
      'Singapore\'s mandatory climate reporting regime moves from disclosure ambition to assurance reality. SGX-listed issuers are already required to report under the climate reporting rules, and the transition to ISSB-aligned IFRS S1 and IFRS S2 raises the technical bar considerably: scenario analysis, Scope 3, financed emissions for financial institutions, and a governance structure that can survive external scrutiny.',
      'Most of the attention goes to the disclosure itself. The harder question sits one layer down: who actually prepares the numbers, and can that person defend them in front of an assurance provider? A sustainability report signed off by the board is only as good as the GHG inventory behind it, and that inventory is only as good as the competence of the team that compiled it.',
      'This article sets out what a competent carbon accounting function in a Singapore-listed company needs to know, how to structure training across the finance, sustainability and operations teams, and where the common competence gaps show up when assurance providers start testing.',
    ],
    sections: [
      {
        heading: 'The competence gap is not where companies think it is',
        id: 'competence-gap',
        body: [
          'When companies assess their readiness for IFRS S1 and S2 reporting, they usually look at the disclosure template: do we have the data points, do we have the scenario analysis, do we have the Scope 3 categories. These are output questions. The input question is whether anyone in the organisation can explain, on the record, how each number was produced.',
          'In practice, the gap sits in the middle layer. Finance teams understand controls, materiality and audit trails but not emission factors or organisational boundaries. Sustainability teams understand the GHG Protocol but often lack the control discipline that an assurance provider expects. Operations teams hold the activity data but have never been told why the unit of measurement matters.',
          'The result is a report that reads well but cannot be defended. Assurance providers test the process, not the prose. If the person compiling the inventory cannot explain why a particular emission factor was chosen, or why an entity was consolidated one way and not another, the finding writes itself.',
        ],
      },
      {
        heading: 'What a competent carbon accounting team actually needs to know',
        id: 'what-to-know',
        body: [
          'Competence in carbon accounting is not a single skill. It is a stack, and each layer has a specific standard behind it.',
          'At the base sits the GHG Protocol Corporate Standard and its Scope 3 Standard: organisational boundary setting (equity share, financial control, operational control), the fifteen Scope 3 categories, and the rules on recalculation when the business changes. On top of that sits ISO 14064-1, which is the standard most assurance providers in Singapore will reference when verifying a GHG inventory, and which imposes its own requirements on documentation, quantification methodology and uncertainty.',
          'Above that sits the reporting layer. IFRS S2 requires disclosure of Scope 1, 2 and 3 emissions, the measurement approach, and the targets against which performance is assessed. For financial institutions, financed emissions under PCAF add another methodology layer. A team that has only ever compiled a basic inventory will struggle with the reconciliation between the inventory, the disclosure and the targets.',
          'Finally, there is the controls layer: data governance, evidence retention, version control, and the ability to reproduce a prior year figure on demand. This is the layer that assurance providers test most aggressively, and the one most often missing from sustainability training programmes.',
        ],
      },
      {
        heading: 'Who to train, and to what depth',
        id: 'who-to-train',
        body: [
          'A common mistake is to send one sustainability manager on a course and assume the capability now exists. Carbon accounting is a team function. The training plan should map to three distinct audiences.',
          'The first is the preparer group: the sustainability and finance staff who compile the inventory and draft the disclosure. They need deep technical training in the GHG Protocol, ISO 14064-1, IFRS S2 and the assurance process. This is where formal certification has value, because it gives the individual a defensible credential and the organisation a documented competence record.',
          'The second is the data owners: operations, procurement, facilities, logistics and HR staff who supply activity data. They do not need the full methodology, but they do need to understand why the unit of measurement, the source document and the reporting period matter, and what happens when they get it wrong. A short, role-specific module is usually more effective than a general ESG awareness course.',
          'The third is the board and audit committee. They are not compiling the inventory, but they are approving the report and, under the SGX rules, carrying responsibility for its accuracy. Their training needs to cover the governance of climate reporting, the questions to ask of management, and the nature of assurance findings. This is a different curriculum from the preparer course, and treating it as the same thing is a common failure.',
        ],
      },
      {
        heading: 'The assurance readiness test: can your team answer these questions',
        id: 'assurance-test',
        body: [
          'A useful way to design training is to work backwards from the questions an assurance provider will ask. If the team cannot answer them confidently, the training has not landed.',
          'The questions tend to cluster around five areas: boundary and consolidation, emission factors and their sources, activity data and evidence, estimation and uncertainty, and restatement of prior year figures. Each maps to a specific standard and each can be taught.',
          'A practical exercise is to run an internal mock assurance session before the external provider arrives. Put the preparer in front of the CFO and the audit committee chair and have them walk through a single material emission source from activity data to disclosed figure. The gaps that surface are the training syllabus for the following quarter.',
        ],
        list: [
          'Which consolidation approach did we use, and why, and does it match the financial statements?',
          'Which emission factor did we apply to this source, from which version of which database, and when was it published?',
          'Where is the source document for this activity data, and can we reproduce the figure from it?',
          'Which figures are estimated rather than measured, and what is the uncertainty range?',
          'If we restate last year, what triggered the restatement and how have we disclosed it?',
        ],
      },
      {
        heading: 'Building the capability without building a department',
        id: 'building-capability',
        body: [
          'Few Singapore companies need a large in-house carbon accounting team. What they need is a small number of deeply competent people, a wider group of trained data owners, and a governance structure that connects them. That is a training problem more than a hiring problem.',
          'A workable model is a two-tier structure. A central team of two to four people holds the technical methodology and owns the inventory and disclosure. A distributed network of data owners in each business unit is trained to a defined standard and accountable for the data they supply. The central team trains the network, and the network feeds the central team.',
          'This structure has a second benefit: it creates a documented competence record. Assurance providers increasingly ask not only whether the numbers are right but whether the people who produced them were competent to do so. Training records, certification and a defined competency framework are evidence of exactly that.',
        ],
      },
      {
        heading: 'Where CER can help',
        id: 'where-cer-can-help',
        body: [
          'CER runs professional ESG and sustainability training for Singapore and ASEAN organisations, including carbon accounting and GHG inventory courses aligned to the GHG Protocol and ISO 14064, assurance readiness workshops, and board-level briefings on climate reporting governance.',
          'We also work with companies to design the internal competency framework that sits behind the training: who needs which module, at what depth, and how competence is recorded and refreshed as the reporting requirements evolve.',
          'If your team is preparing for IFRS S1 and S2 disclosure and you are not confident it could survive an assurance review, the place to start is a competence assessment, not another report.',
        ],
      },
    ],
    relatedSolutions: [
      'carbon-accounting',
      'ghg-inventory',
      'assurance-readiness',
      'iso-14064',
    ],
    relatedArticles: [
      'singapore-mandatory-climate-reporting-issb-ifrs-s1-s2-readiness',
      'sgx-climate-reporting-assurance-readiness',
      'what-assurance-providers-actually-test',
      'scope-3-where-to-start',
    ],
    tags: [
      'Carbon Accounting Training',
      'GHG Inventory',
      'Assurance Readiness',
      'IFRS S2',
      'Singapore',
    ],
    seo: {
      title: 'Carbon Accounting Team Training for SGX Reporting',
      description: 'What a competent carbon accounting team needs to know for IFRS S1 and S2 assurance, who to train, and how to build the capability in Singapore.',
      primaryKeyword: 'carbon accounting training Singapore',
      secondaryKeywords: [
        'GHG inventory training',
        'IFRS S2 competence',
        'assurance readiness training',
      ],
    },
    status: 'published',
  },
  {
    slug: 'ifrs-s1-s2-adoption-asia-jurisdictions',
    title: 'IFRS S1 and S2 Adoption Across ASEAN: Where Each Jurisdiction Stands',
    excerpt: 'Singapore has set the pace, but Malaysia, Indonesia, the Philippines and Thailand are all moving on ISSB-aligned reporting. A jurisdiction by jurisdiction view of what is final, what is proposed, and what Singapore groups with regional operations should plan for.',
    type: 'Regulatory Update',
    categorySlug: 'regulation',
    authorSlug: 'raymond-cheung',
    publishedAt: '2026-11-17',
    intro: [
      'The International Sustainability Standards Board published IFRS S1 and IFRS S2 in June 2023. Since then, the question for Singapore headquartered groups has shifted from whether ASEAN will adopt them to how unevenly and on what timetable. That unevenness now has direct consequences for group reporting calendars, data collection, and assurance scoping.',
      'Singapore moved first. ACRA and SGX RegCo confirmed in September 2024 that issuers must report under IFRS S1 and S2 for financial years beginning on or after 1 January 2025, with a phased approach for large non-listed companies following from FY2027. The Singapore standard is aligned with the ISSB baseline, which means the group consolidation work is already underway for many listed issuers.',
      'Other ASEAN regulators have taken different routes. Some have issued final standards, some have published consultation papers, and some have signalled alignment without a firm date. For a Singapore group with subsidiaries, joint ventures or suppliers in these markets, the practical problem is not the group standard. It is reconciling the local filing obligation with the group IFRS S2 disclosure, often on a different boundary and a different timeline.',
    ],
    sections: [
      {
        heading: 'Singapore: final, phased, and already in force',
        id: 'singapore-final-phased',
        body: [
          'Singapore was the first Asian jurisdiction to fully align its mandatory climate reporting regime with the ISSB standards. SGX RegCo\'s September 2024 rule changes require issuers to prepare climate disclosures in accordance with IFRS S1 and S2 for financial years beginning on or after 1 January 2025. Scope 1 and Scope 2 disclosures are required from the outset, with Scope 3 following on a later phase for most issuers.',
          'The listed issuer requirement is supported by a parallel ACRA regime for large non-listed companies, which will apply from FY2027 for entities meeting the large company thresholds. Both regimes rely on the same ISSB baseline, which simplifies the technical work but not the operational work: the boundary of the group report and the boundary of each local filing are rarely identical.',
          'For a Singapore listed issuer, the practical implication is that the group sustainability report is now a regulated disclosure, not a voluntary one. The assurance roadmap, the internal controls over sustainability information, and the audit committee\'s oversight role all follow from that.',
        ],
      },
      {
        heading: 'Malaysia, Indonesia, the Philippines and Thailand: different stages, same direction',
        id: 'asean-jurisdictions-status',
        body: [
          'Malaysia\'s Bursa Malaysia has been consulting on ISSB-aligned reporting for Main Market listed issuers, with a phased implementation that begins with the largest issuers. The direction of travel is clear: the Sustainability Reporting Guide is being updated to reference IFRS S1 and S2 as the baseline, with transitional relief on Scope 3 and climate scenario analysis.',
          'Indonesia\'s OJK has issued a roadmap for mandatory sustainability reporting that references ISSB alignment, though the implementing regulation for listed issuers is still being finalised. The POJK framework has historically been principle based, so the shift to an ISSB baseline is a significant change in the level of technical specificity required from Indonesian issuers.',
          'The Philippines SEC has published draft guidance on IFRS S1 and S2 adoption and is working through the consultation process. Thailand\'s SEC has signalled alignment with ISSB and has been updating its sustainability reporting requirements for listed companies. In each case, the key questions for a Singapore group are the same: which entity files, on what boundary, and from which financial year.',
        ],
        list: [
          'Singapore: final, IFRS S1 and S2 mandatory for listed issuers from FY2025, large non-listed from FY2027',
          'Malaysia: ISSB-aligned requirements being phased in for Main Market issuers, consultation ongoing',
          'Indonesia: OJK roadmap references ISSB, implementing regulation pending',
          'Philippines: SEC draft guidance published, consultation in progress',
          'Thailand: SEC signalling ISSB alignment, requirements being updated',
        ],
      },
      {
        heading: 'Why the boundary problem matters more than the standard',
        id: 'boundary-problem',
        body: [
          'IFRS S1 requires a reporting entity to disclose sustainability related risks and opportunities that could affect its prospects, and IFRS S2 applies the same boundary to climate. For a Singapore group, that boundary is the consolidated group. But a subsidiary in Malaysia or Indonesia may have a local filing obligation on a different boundary, with different materiality thresholds and different transition relief.',
          'The practical consequence is that the group cannot simply collect one dataset and file it everywhere. Scope 3 category boundaries, the treatment of joint ventures and associates, and the choice of emission factors often diverge between the group report and the local filing. Reconciling these differences requires a documented basis of preparation and a data model that can produce both views.',
          'This is where many groups underestimate the effort. The technical standard is the same, but the operational reality of a multi jurisdiction group is that the same underlying activity may need to be reported on two or three different bases. The audit trail has to support all of them.',
        ],
      },
      {
        heading: 'What Singapore groups should do now',
        id: 'what-to-do-now',
        body: [
          'The first step is a jurisdiction mapping exercise. For each market where the group has a listed entity, a large subsidiary, or a significant supplier, establish the current filing obligation, the applicable standard, the effective date, and the boundary. This should be owned by the group sustainability function but signed off by finance and legal.',
          'The second step is to design the group data model so that it can produce the IFRS S2 consolidated view and the local filing views from the same source data. That means a documented basis of preparation, a clear mapping of emission factors, and a reconciliation between the group boundary and each local boundary.',
          'The third step is assurance readiness. Singapore\'s regime moves to limited assurance on Scope 1 and Scope 2 from FY2027 for listed issuers, and other ASEAN jurisdictions are following similar paths. The controls that an assurance provider will test need to be in place before the first assurance year, not after.',
        ],
      },
      {
        heading: 'The risks of waiting for regional convergence',
        id: 'risks-of-waiting',
        body: [
          'Some groups are deferring regional work on the assumption that ASEAN will converge on a single standard and a single timeline. That assumption is not supported by the published roadmaps. The ISSB baseline is converging, but the effective dates, transition relief and local filing boundaries are not.',
          'Waiting creates two specific risks. The first is a data gap: the first year of local filing often arrives with less lead time than the group report, and retrofitting data collection into a subsidiary\'s systems is slow. The second is an assurance gap: if the group\'s Scope 1 and Scope 2 numbers are assured but the local filing numbers are not reconcilable to them, the group faces questions it cannot easily answer.',
          'The pragmatic approach is to treat the group IFRS S2 disclosure as the master dataset and to build local filing views as controlled derivations from it. That way, when a jurisdiction finalises its rules, the incremental work is a mapping exercise rather than a rebuild.',
        ],
      },
    ],
    relatedSolutions: [
      'sustainability-reporting',
      'ghg-inventory',
      'assurance-readiness',
      'esg-data-kpis',
    ],
    relatedArticles: [
      'singapore-mandatory-climate-reporting-issb-ifrs-s1-s2-readiness',
      'asean-taxonomy-cross-border-reporting-singapore',
      'sgx-climate-reporting-assurance-readiness',
    ],
    tags: [
      'IFRS S1',
      'IFRS S2',
      'ISSB',
      'ASEAN sustainability reporting',
      'Singapore climate reporting',
    ],
    seo: {
      title: 'IFRS S1 and S2 Adoption Across ASEAN: Jurisdiction Guide',
      description: 'Where Singapore, Malaysia, Indonesia, the Philippines and Thailand stand on ISSB-aligned reporting, and what Singapore groups with regional operations must plan for.',
      primaryKeyword: 'IFRS S1 S2 ASEAN adoption',
      secondaryKeywords: [
        'ISSB adoption Asia',
        'ASEAN sustainability reporting requirements',
        'Singapore IFRS S2 group reporting',
      ],
    },
    status: 'published',
  },
  {
    slug: 'eu-csddd-supply-chain-due-diligence-asian-suppliers',
    title: 'EU CSDDD: What Asian Suppliers and Their Singapore Buyers Must Prepare For',
    excerpt: 'The EU Corporate Sustainability Due Diligence Directive reaches into Asian supply chains through large EU buyers. Here is what the obligations actually require, which Asian companies are captured, and how to prepare evidence that survives a buyer audit.',
    type: 'Article',
    categorySlug: 'regulation',
    authorSlug: 'raymond-cheung',
    publishedAt: '2026-11-17',
    intro: [
      'The EU Corporate Sustainability Due Diligence Directive (CSDDD, Directive (EU) 2024/1760) is often read as a European compliance story. For companies in Singapore and across ASEAN, it is a commercial story. The directive obliges large EU-incorporated companies, and non-EU companies meeting its turnover thresholds, to conduct human rights and environmental due diligence across their chains of activities. Your factory, plantation, logistics provider or contract manufacturer sits inside those chains.',
      'The practical consequence is that CSDDD requirements will arrive at Asian suppliers through contract clauses, supplier questionnaires and audit requests from EU customers, often before any local law changes. A supplier that cannot produce credible due diligence evidence will be treated as a risk regardless of its actual performance.',
      'This article sets out who is captured, what the obligations require in operational terms, and what Asian suppliers and their Singapore-based buyers should be building now. It is not a summary of the political debate over the directive\'s timing. It is a preparation note.',
    ],
    sections: [
      {
        heading: 'Who is actually captured by CSDDD',
        id: 'who-is-captured',
        body: [
          'CSDDD applies to EU limited liability companies with more than 1,000 employees and worldwide net turnover above EUR 450 million. It also applies to non-EU companies with net turnover in the EU above EUR 450 million, and to companies in high-impact sectors such as textiles, agriculture, food and minerals at lower thresholds of 500 employees and EUR 150 million turnover. Franchise and licensing arrangements have their own thresholds.',
          'For an Asian supplier, the key point is that you do not need to be directly regulated to be affected. You are in the chain of activities of a company that is. The directive covers upstream business partners in the production of goods or provision of services, including activities related to the sale, distribution, transport, storage and disposal of the product.',
          'The directive entered into force in July 2024. Member states must transpose it into national law. The Commission proposed a delay to the first phase of application, and companies should track the final transposition timetable in the relevant member state rather than assume the original dates hold.',
        ],
      },
      {
        heading: 'What the due diligence obligations require in practice',
        id: 'due-diligence-obligations',
        body: [
          'The directive requires in-scope companies to integrate due diligence into corporate policies, identify and assess actual and potential adverse human rights and environmental impacts, prevent or mitigate potential impacts, and bring actual impacts to an end. They must also establish a grievance mechanism, monitor the effectiveness of their measures, and communicate publicly on their due diligence.',
          'For suppliers, this translates into four demands. First, a documented code of conduct that your buyer can flow down. Second, a mapping of your own upstream suppliers, because the buyer\'s obligation extends through the chain. Third, evidence of remediation where issues are found, not just a denial that issues exist. Fourth, a named contact and process for handling grievances raised by workers or communities.',
          'The environmental side of the directive covers impacts under international conventions, including climate change obligations. Companies in scope must adopt a transition plan for climate change mitigation, which means your buyer will be asking for your emissions data and decarbonisation commitments as part of the same exercise.',
        ],
      },
      {
        heading: 'What Asian suppliers will be asked to provide',
        id: 'supplier-evidence',
        body: [
          'Expect requests in three waves. The first is contractual: codes of conduct, audit rights, termination clauses for non-compliance, and requirements to cascade obligations to sub-suppliers. The second is informational: site-level human rights and environmental data, grievance records, and evidence of corrective action plans. The third is assurance: independent verification of the data you report.',
          'Suppliers with existing ISO 14001 certification, a GHG inventory prepared to ISO 14064, and a documented supplier code will find this far less burdensome. Those starting from scratch will be asked to produce evidence they do not have, on timelines set by the buyer rather than by regulation.',
        ],
        list: [
          'A written supplier code of conduct aligned to the buyer\'s CSDDD policy, with flow-down to your own suppliers.',
          'Site-level environmental data: energy, water, waste, emissions, and permits, with a clear boundary and methodology.',
          'Human rights due diligence records: risk assessment, grievance log, and corrective action plans.',
          'A climate transition plan or at minimum a credible emissions baseline and reduction target.',
          'Named accountability: a director-level owner for due diligence and a grievance contact.',
        ],
      },
      {
        heading: 'The Singapore buyer side: groups with EU customers',
        id: 'singapore-buyer-side',
        body: [
          'Singapore-headquartered groups with EU operations or EU-listed customers face the directive from both directions. As a customer, they may be asked by their EU buyers to demonstrate due diligence over their own Asian supply base. As a parent, they may be asked by their EU subsidiaries to provide group-level data and policies.',
          'The practical response is to treat CSDDD as an extension of the governance and data work already required for SGX climate reporting. The same supplier data, emissions inventory and grievance process can serve both. Building them once, to a defensible standard, is cheaper than responding to each customer questionnaire separately.',
          'Companies should also map which of their EU customers are in scope and on what timeline. That determines the sequence of preparation, not an abstract compliance calendar.',
        ],
      },
      {
        heading: 'A practical preparation sequence',
        id: 'preparation-sequence',
        body: [
          'Start with a supply chain map. Identify which customers are EU-incorporated or meet the non-EU turnover thresholds, and which of your products or sites sit in their chains of activities. This tells you where requests will come from first.',
          'Then build the evidence base. A supplier code with flow-down, a grievance mechanism, and a site-level environmental and human rights data set are the minimum. Where you already hold ISO 14001 or an ISO 14064 inventory, align the CSDDD response to those systems rather than creating parallel records.',
          'Finally, test the evidence. Run a mock buyer audit against your own supplier code and grievance log. The gaps that surface are the ones your customers will find. Addressing them before the first formal request is the difference between a supplier that is trusted and one that is managed as a risk.',
        ],
      },
    ],
    relatedSolutions: [
      'esg-strategy',
      'sustainable-procurement',
      'assurance-readiness',
      'ghg-inventory',
    ],
    relatedArticles: [
      'regulation',
      'asean',
      'cbam-what-asian-exporters-need',
    ],
    tags: [
      'CSDDD',
      'Supply chain due diligence',
      'EU regulation',
      'Asian exporters',
      'Human rights',
    ],
    seo: {
      title: 'EU CSDDD: What Asian Suppliers Must Prepare For',
      description: 'CSDDD reaches Asian supply chains through EU buyers. What suppliers and Singapore groups must evidence, and how to prepare before the first audit request.',
      primaryKeyword: 'EU CSDDD Asian suppliers',
      secondaryKeywords: [
        'CSDDD supply chain due diligence',
        'CSDDD Singapore companies',
        'EU corporate sustainability due diligence directive',
      ],
    },
    status: 'published',
  },
  {
    slug: 'asean-taxonomy-cross-border-reporting-singapore',
    title: 'ASEAN Taxonomy and Cross-Border Reporting: What Singapore Groups with Regional Operations Need to Know',
    excerpt: 'The ASEAN Taxonomy for Sustainable Finance now has a working multi-tier framework. For Singapore headquartered groups with operations across the region, the practical question is how it interacts with national taxonomies, SGX reporting and lender expectations.',
    type: 'Article',
    categorySlug: 'asean',
    authorSlug: 'raymond-cheung',
    publishedAt: '2026-11-16',
    intro: [
      'Singapore listed groups rarely operate in one jurisdiction. A holding company on SGX may have subsidiaries in Indonesia, Malaysia, Thailand and Vietnam, each subject to a different stage of sustainability disclosure and each with its own set of lenders, regulators and customers asking for taxonomy aligned data.',
      'The ASEAN Taxonomy for Sustainable Finance, developed under the ASEAN Taxonomy Board, is the regional reference point. Version 3, published in 2024, moved the framework into a multi-tier structure: the Foundation Framework, which applies to all sectors, and the Plus Standard, which sets out activity level screening criteria for priority sectors including energy, transport, and in later workstreams, agriculture and construction.',
      'For a Singapore group, the taxonomy is not a reporting obligation in itself. It becomes relevant through three channels: the national taxonomies that member states are building on top of it, the sustainable finance products that reference it, and the SGX climate reporting requirements that require you to explain how your disclosures connect to recognised frameworks. This article sets out how those channels interact and what to do about them.',
    ],
    sections: [
      {
        heading: 'The ASEAN Taxonomy is not one rulebook, and that is the point',
        id: 'asean-taxonomy-structure',
        body: [
          'The ASEAN Taxonomy is deliberately designed as a layered framework rather than a single list of eligible activities. The Foundation Framework applies an environmental objective screening test and an essential criteria assessment covering climate change mitigation and adaptation, protection of healthy ecosystems and biodiversity, resource resilience and transition, and social aspects including transition. The Plus Standard then adds technical screening criteria for specific activities, starting with the energy and transport sectors.',
          'The distinction matters for a regional group because the Foundation Framework is intended to be usable now, while the Plus Standard criteria are being developed sector by sector. A company reporting against the taxonomy today is typically doing a Foundation Framework assessment, and should say so explicitly rather than implying full alignment.',
          'The taxonomy also recognises a transition category, which is significant for ASEAN economies where hard to abate sectors dominate. A coal-fired plant and a solar farm are not treated the same way, but the framework does allow activities with a credible transition pathway to be classified, provided the essential criteria are met. That is a different posture from the EU taxonomy, which is stricter on gas and nuclear.',
        ],
      },
      {
        heading: 'How national taxonomies in the region diverge',
        id: 'national-taxonomy-divergence',
        body: [
          'Several member states have issued or are developing national taxonomies that sit alongside the ASEAN framework. Indonesia published its Taxonomy for Sustainable Finance in 2022 and has since extended it into a Taksonomi Keuangan Berkelanjutan Indonesia with sector guidance. Malaysia issued its Climate Change and Principle-based Taxonomy in 2021 through Bank Negara Malaysia, which applies a principle based approach rather than a pure activity list. Thailand has issued a taxonomy for sustainable finance through the Bank of Thailand and the Securities and Exchange Commission. The Philippines and Vietnam are at earlier stages.',
          'The practical consequence is that a project in Indonesia may be assessed against the Indonesian taxonomy, a financing in Malaysia against the CCT, and a regional green bond against the ASEAN Taxonomy or ICMA Green Bond Principles. These are not interchangeable, and a group that assumes one assessment covers all of them will find itself reworking the analysis at the point of financing.',
          'There is convergence work underway through the ASEAN Taxonomy Board and through the International Platform on Sustainable Finance, but for the near term, a Singapore group should map which taxonomy applies to which entity, which lender and which instrument.',
        ],
      },
      {
        heading: 'The SGX connection: framework interoperability in your climate report',
        id: 'sgx-framework-interoperability',
        body: [
          'SGX Listing Rule 711B requires issuers to prepare an annual sustainability report on a comply or explain basis, and from FY2025 the climate reporting requirements align with the ISSB standards, IFRS S1 and IFRS S2, for issuers in the specified tiers. IFRS S1 requires disclosure of the frameworks and standards used, and IFRS S2 requires disclosure of how climate related risks and opportunities are identified and assessed.',
          'The ASEAN Taxonomy does not replace IFRS S1 or S2, and it is not a substitute for a GHG inventory. What it does is provide a recognised reference point for classifying revenue, capital expenditure and financing as sustainable or transitioning, which can feed into the disclosure of climate related opportunities and into the metrics you present to lenders.',
          'A defensible approach is to state clearly in the sustainability report which taxonomy or taxonomies were applied, at which tier, to which portion of the business, and on what basis the assessment was performed. Boilerplate references to alignment without a stated methodology will not survive assurance scrutiny.',
        ],
      },
      {
        heading: 'What lenders and investors are actually asking for',
        id: 'lender-investor-expectations',
        body: [
          'Banks in Singapore, Malaysia and Indonesia are increasingly applying taxonomy alignment tests to sustainability linked loans and green financing. A sustainability linked loan does not strictly require taxonomy alignment, because the pricing mechanism is tied to sustainability performance targets, but lenders are now asking for taxonomy mapping as part of their own internal reporting and their own regulatory obligations.',
          'For green bonds and green loans, the alignment question is more direct. If the use of proceeds is claimed as green, the lender or investor will want to know which taxonomy or principles the claim rests on, and the answer needs to be consistent with the second party opinion or the framework document.',
          'The practical preparation is to build a mapping between your activities, your revenue and capex lines, and the relevant taxonomy criteria, so that when a lender asks, the answer is a document rather than a project. That mapping also feeds directly into the taxonomy related disclosures that are increasingly expected in annual reports.',
        ],
      },
      {
        heading: 'A workable sequence for a regional group',
        id: 'regional-group-sequence',
        body: [
          'Start with a jurisdictional inventory. List every entity in the group, its country of operation, the regulator with sustainability disclosure requirements that applies to it, and the lenders or instruments it uses. This is usually the step that reveals the scale of the problem, because most groups discover they have more exposure than the head office assumed.',
          'Second, map activities to the ASEAN Taxonomy Foundation Framework and, where available, the Plus Standard. Record the environmental objective, the essential criteria assessment and the transition classification. Keep the evidence for each determination, because this is what assurance providers and lenders will test.',
          'Third, reconcile the taxonomy mapping with the IFRS S2 disclosure. The taxonomy classification should be consistent with the climate related opportunities and the capex figures disclosed in the annual report. Inconsistency between the two is one of the most common findings in assurance reviews.',
          'Fourth, build the internal capability to maintain the mapping. Taxonomy criteria are still being developed, national rules are still being issued, and a mapping done once will be out of date within a year. Assign ownership and set a review cycle.',
        ],
      },
    ],
    relatedSolutions: [
      'esg-strategy',
      'sustainability-reporting',
      'green-finance',
      'assurance-readiness',
    ],
    relatedArticles: [
      'asean',
      'singapore',
      'singapore-climate-reporting-what-applies-and-when',
      'double-materiality-assessment-singapore-practice',
    ],
    tags: [
      'ASEAN Taxonomy',
      'Cross-border reporting',
      'Sustainable finance',
      'SGX',
      'Taxonomy alignment',
    ],
    seo: {
      title: 'ASEAN Taxonomy and Cross-Border Reporting for Singapore Groups',
      description: 'How the ASEAN Taxonomy interacts with national taxonomies, SGX climate reporting and lender expectations for Singapore groups with regional operations.',
      primaryKeyword: 'ASEAN Taxonomy Singapore',
      secondaryKeywords: [
        'ASEAN Taxonomy for Sustainable Finance',
        'cross-border sustainability reporting',
        'Singapore regional groups taxonomy',
        'taxonomy alignment green loans',
      ],
    },
    status: 'published',
  },
  {
    slug: 'double-materiality-assessment-singapore-practice',
    title: 'Double Materiality in Practice: Running a Defensible Assessment for SGX and CSRD Exposure',
    excerpt: 'Double materiality is now the working method behind IFRS S1 materiality and the explicit test under the CSRD. Here is how Singapore companies can run an assessment that survives board, auditor and investor scrutiny.',
    type: 'Article',
    categorySlug: 'esg',
    authorSlug: 'raymond-cheung',
    publishedAt: '2026-11-15',
    intro: [
      'Double materiality has moved from a European concept to a working requirement for many Singapore and ASEAN companies. The CSRD requires undertakings in scope to report on both financial materiality and impact materiality, and the first wave of large listed companies has already published against ESRS. At the same time, IFRS S1 asks entities to disclose material information about sustainability related risks and opportunities that could reasonably be expected to affect prospects, which is closer to financial materiality but still requires a documented process.',
      'For SGX-listed issuers, the Sustainability Reporting Advisory Committee recommendations and the move toward ISSB-aligned climate reporting mean the materiality process is no longer a communications exercise. It is the control that determines what enters the annual report, what gets assured, and what the board signs off. Companies with European customers, lenders or parent groups are also being asked for impact materiality data that Singapore reporting has historically not required.',
      'This article sets out how to run a double materiality assessment that is defensible: how to define the process, how to score and threshold, how to document judgements, and how to connect the output to IFRS S1 and S2 disclosures and to assurance readiness. It is written for sustainability leads, finance teams and board committees who need a method, not a framework summary.',
    ],
    sections: [
      {
        heading: 'What double materiality actually requires',
        id: 'what-double-materiality-requires',
        body: [
          'Double materiality has two dimensions. Impact materiality looks at how the company affects people and the environment, including impacts connected through its value chain. Financial materiality looks at how sustainability matters create or erode enterprise value, through cash flows, cost of capital or access to finance. The CSRD requires reporting where a matter is material on either dimension, which is why it is sometimes called the union approach.',
          'IFRS S1 does not use the term double materiality, but it does require an entity to identify sustainability related risks and opportunities that could reasonably be expected to affect its prospects, and to disclose the process used to identify and assess them. In practice, a well-run double materiality assessment provides the evidence base for that process. It shows how the company moved from a long list of topics to a defined set of disclosures.',
          'The practical difference matters. A purely financial materiality exercise will screen out impacts that do not yet have a price, such as biodiversity loss or labour practices deep in the supply chain. A purely impact exercise will miss matters that affect enterprise value but are not yet regulated. A defensible assessment runs both lenses and records where they diverge.',
        ],
      },
      {
        heading: 'Building the process: scoping, stakeholders and evidence',
        id: 'building-the-process',
        body: [
          'Start with scope. Define the reporting boundary, including upstream and downstream value chain where impacts and dependencies are significant. For a Singapore-headquartered group, this usually means mapping subsidiaries, joint ventures and key suppliers, and deciding which entities are consolidated for reporting and which are covered through value chain disclosure.',
          'Next, build the topic universe from a recognised source rather than internal opinion. The ESRS topic list, the SASB industry standards and the IFRS S2 industry-based guidance are all defensible starting points. Map each topic to the business model and value chain, then screen with a documented rationale. A topic should only be removed with a recorded reason, not because no one in the room had data.',
          'Stakeholder engagement is where most assessments are weakest. Regulators and assurance providers will ask who was consulted, how they were selected and what they said. Keep a register of engagement: investors, lenders, customers, suppliers, employees, regulators and affected communities where relevant. Record the questions asked, the responses, and how the responses changed the scoring. This register is the evidence that the assessment is not a desk exercise.',
        ],
      },
      {
        heading: 'Scoring, thresholds and the judgement trail',
        id: 'scoring-and-thresholds',
        body: [
          'Use a scoring scale that separates likelihood from severity for impacts, and likelihood from magnitude of financial effect for financial materiality. Severity for impacts should consider scale, scope and irremediability, consistent with the ESRS approach. Financial magnitude should be expressed in a way finance can defend: effect on revenue, cost, asset life, cost of capital or access to finance, with a time horizon attached.',
          'Set thresholds before scoring, not after. A common failure is to score first and then set the threshold so that the answer matches the existing report. Document the threshold, the rationale and the sensitivity. If a small change in the threshold changes the material topics, say so and explain why the chosen threshold is appropriate.',
          'The judgement trail is what makes the assessment defensible. For each material topic, record the data sources, the internal owners consulted, the assumptions made, the uncertainties, and the link to the disclosures that follow. Where quantitative data is unavailable, state that and describe the qualitative basis. Assurance providers under ISAE 3000 or ISSA 5000 will test the process, not just the output, so the trail needs to exist before the assurance engagement begins.',
        ],
      },
      {
        heading: 'Connecting the assessment to IFRS S1 and S2 disclosure',
        id: 'connecting-to-ifrs-s1-s2',
        body: [
          'The output of the assessment should be a defined set of material topics with a clear mapping to disclosure requirements. Under IFRS S1, that means governance, strategy, risk management, and metrics and targets for each material sustainability related risk and opportunity. Under IFRS S2, climate specific requirements apply: governance, strategy including transition planning, risk management, and metrics including Scope 1, 2 and 3 greenhouse gas emissions and industry-based metrics.',
          'Map each material topic to the specific disclosure it drives. A material water dependency, for example, should connect to the risk management disclosure, to any targets, and to the metrics used to track performance. A material labour practice impact in the supply chain should connect to the value chain disclosure and to the supplier standards the company applies. If a material topic has no corresponding disclosure, the assessment or the report is incomplete.',
          'The assessment also sets the boundary for assurance. SGX climate reporting requirements phase in assurance on Scope 1 and 2 emissions, and the materiality process is the control that determines which other metrics are in scope. A topic that is material but unmeasured is a gap the board should see, not a reason to leave it out.',
        ],
      },
      {
        heading: 'Common failure points and how to avoid them',
        id: 'common-failure-points',
        body: [
          'The most common failure is treating the assessment as a one-off workshop. Double materiality is a recurring process, refreshed annually and whenever the business changes materially, such as an acquisition, a new market or a shift in the regulatory perimeter. Build it into the risk and reporting calendar.',
          'The second failure is separating the sustainability team from finance and risk. Financial materiality cannot be scored credibly without finance input, and impact materiality cannot be scored credibly without operational and supply chain input. A joint ownership model, with the sustainability team running the process and finance and risk signing off the financial dimension, is the practical answer.',
          'The third failure is overreach. Companies sometimes try to assess every ESRS datapoint in the first year and produce a document no one can defend. Start with the topics that are clearly material, document the screening for the rest, and improve the evidence base over successive cycles. A smaller, well-evidenced assessment is more defensible than a comprehensive one with no audit trail.',
        ],
      },
    ],
    relatedSolutions: [
      'materiality-assessment',
      'esg-strategy',
      'sustainability-reporting',
      'assurance-readiness',
    ],
    relatedArticles: [
      'esg',
      'singapore-mandatory-climate-reporting-issb-ifrs-s1-s2-readiness',
      'sgx-climate-reporting-assurance-readiness',
      'what-assurance-providers-actually-test',
    ],
    tags: [
      'Double materiality',
      'ESG strategy',
      'CSRD',
      'IFRS S1',
      'Materiality assessment',
    ],
    seo: {
      title: 'Double Materiality Assessment: A Practical Guide for Singapore',
      description: 'How Singapore companies can run a defensible double materiality assessment for IFRS S1, SGX reporting and CSRD exposure, with scoring, thresholds and evidence.',
      primaryKeyword: 'double materiality assessment Singapore',
      secondaryKeywords: [
        'double materiality CSRD',
        'IFRS S1 materiality process',
        'ESG materiality assessment',
      ],
    },
    status: 'published',
  },
  {
    slug: 'singapore-mandatory-climate-reporting-issb-ifrs-s1-s2-readiness',
    title: 'Singapore Mandatory Climate Reporting: Getting Ready for ISSB-Aligned IFRS S1 and S2',
    excerpt: 'ACRA and SGX are phasing in mandatory ISSB-aligned climate reporting for listed and large non-listed companies. Here is what the requirements actually say, who they apply to, and what finance and sustainability teams need to build now.',
    type: 'Regulatory Update',
    categorySlug: 'regulation',
    authorSlug: 'raymond-cheung',
    publishedAt: '2026-11-14',
    intro: [
      'Singapore has moved from voluntary sustainability reporting to a mandatory, ISSB-aligned regime. The Accounting and Corporate Regulatory Authority (ACRA) and Singapore Exchange Regulation (SGX RegCo) have set out a phased timetable for climate reporting based on IFRS S1 General Requirements for Disclosure of Sustainability-related Financial Information and IFRS S2 Climate-related Disclosures. For SGX-listed issuers and large non-listed companies, the question is no longer whether to report but how to build a reporting system that survives assurance.',
      'The regime is deliberately staged. Listed issuers were the first cohort, with climate reporting required from FY2025 for issuers in the STI constituents and other specified sectors, followed by the remaining listed issuers. Large non-listed companies follow on a separate schedule, with thresholds set by ACRA. Across all cohorts, the reporting standard is IFRS S2, applied together with IFRS S1, and the disclosures are expected to be subject to external assurance on a phased basis.',
      'This article sets out what the published requirements actually say, where the common readiness gaps sit, and what a practical implementation programme looks like for a Singapore company with a December financial year end. It does not repeat the general case for climate disclosure. It focuses on the specific mechanics that boards, CFOs and sustainability leads are being asked to sign off.',
    ],
    sections: [
      {
        heading: 'What the Singapore regime requires, and who it covers',
        id: 'what-the-regime-requires',
        body: [
          'The Singapore requirements are built on IFRS S1 and IFRS S2, issued by the International Sustainability Standards Board. IFRS S1 sets the general requirements for sustainability-related financial disclosures: governance, strategy, risk management, and metrics and targets, applied to sustainability risks and opportunities that could affect enterprise value. IFRS S2 applies that architecture specifically to climate, and adds the detailed disclosure requirements on Scope 1, 2 and 3 greenhouse gas emissions, climate resilience, transition plans and internal carbon prices.',
          'The coverage is phased. SGX-listed issuers in the STI constituents and specified sectors were the first to report under IFRS S2, starting with financial years beginning on or after 1 January 2025. Other listed issuers follow in subsequent years. For large non-listed companies, ACRA has set the reporting thresholds and timetable, with the largest companies in scope first. Companies should confirm their own cohort against the published ACRA and SGX RegCo rules rather than relying on general summaries.',
          'Two features of the regime matter more than the headline dates. First, the disclosures are financial-statement adjacent: they are expected to be issued with the annual report and are subject to the same governance discipline. Second, assurance is phased in, so companies that treat the first reporting year as a drafting exercise will find the second year considerably harder.',
        ],
      },
      {
        heading: 'The readiness gaps that show up first',
        id: 'readiness-gaps',
        body: [
          'In practice, the same five gaps appear in almost every readiness assessment we run for Singapore issuers. They are not conceptual. They are operational, and each one has a direct effect on whether the first disclosure can be assured.',
          'The first is boundary. IFRS S2 requires disclosure for the consolidated group, and Scope 3 requires a defined inventory boundary that is consistent with the financial statements. Companies that have reported emissions on a voluntary, facility-by-facility basis often find that the boundary does not reconcile to the group consolidation. Resolving this takes longer than the emissions calculation itself.',
          'The second is Scope 3. IFRS S2 requires Scope 3 disclosure, with relief provisions for the first year in some cases, but the expectation is that material Scope 3 categories are measured and disclosed. Most Singapore companies have purchased goods and services and upstream transport as their largest categories, and both require supplier data or credible spend-based estimation with a documented transition path to primary data.',
          'The third is climate resilience and scenario analysis. IFRS S2 requires disclosure of the entity\'s climate resilience, assessed using climate-related scenario analysis, with at least one scenario aligned with the latest international agreement on climate change. This is a board-level exercise, not a consultant deliverable, and it needs to connect to the financial planning assumptions.',
          'The fourth and fifth gaps are internal carbon pricing and transition plans. IFRS S2 asks whether the company uses an internal carbon price and, if so, how it is applied. It also asks for the company\'s climate transition plan, if it has one. Companies without either are not penalised for saying so, but the disclosure is more credible, and more useful to investors, when both exist and are linked to capital allocation.',
        ],
      },
      {
        heading: 'What good looks like: a 12-month implementation sequence',
        id: 'implementation-sequence',
        body: [
          'For a company with a December year end reporting for the first time, the work needs to start at least twelve months before the reporting date. The sequence below reflects what has worked for SGX issuers moving from voluntary to ISSB-aligned reporting.',
          'Months one to three: governance and boundary. Confirm board and management oversight, establish a sustainability reporting committee with finance representation, and fix the consolidation boundary for emissions and for financial effects. Agree the materiality assessment process and document it.',
          'Months four to six: data and controls. Build the GHG inventory to ISO 14064-1 and the GHG Protocol Corporate Standard, with a documented data management plan. Identify the controls around each data point, from utility invoices to supplier emissions factors, and test them. This is the phase that determines assurance readiness.',
          'Months seven to nine: scenario analysis and transition plan. Run the climate scenario analysis with the board and risk committee, connect the outputs to the financial planning assumptions, and draft the transition plan with capital expenditure and operational levers. Where an internal carbon price is used, document the price, the scope and the decision it informs.',
          'Months ten to twelve: drafting and dry-run assurance. Prepare the IFRS S1 and S2 disclosures, run a gap assessment against the standards, and commission a dry-run review of the emissions inventory and the disclosure controls. Companies that do the dry run in year one find the actual assurance in year two substantially less disruptive.',
        ],
      },
      {
        heading: 'Assurance: what providers will actually test',
        id: 'assurance-what-providers-test',
        body: [
          'Assurance under the Singapore regime is phased, but the direction is clear: limited assurance first, with a pathway to reasonable assurance. Providers will test the systems that produce the numbers, not just the numbers themselves.',
          'Expect scrutiny of the emissions boundary and consolidation, the completeness of Scope 1 and 2 sources, the methodology and data sources for material Scope 3 categories, and the consistency between the sustainability disclosures and the financial statements. Expect questions on the governance of the reporting process, the evidence for the scenario analysis, and the basis for any internal carbon price disclosed.',
          'The most common cause of a qualified or delayed assurance opinion is not a calculation error. It is an undocumented methodology or a data source that cannot be traced. Building the evidence file alongside the calculation, rather than after it, is the single highest-return change most companies can make.',
        ],
      },
      {
        heading: 'What to do now',
        id: 'what-to-do-now',
        body: [
          'If your company is in the first or second cohort, the immediate priorities are boundary reconciliation, Scope 3 measurement for material categories, and board-level scenario analysis. If you are in a later cohort, use the time to build the inventory and controls properly rather than commissioning a disclosure draft that will need to be rebuilt.',
          'CER supports Singapore issuers through the full sequence: materiality assessment, GHG inventory and Scope 3 measurement to ISO 14064-1 and the GHG Protocol, climate scenario analysis and TCFD and IFRS S2 alignment, transition planning, and assurance readiness reviews ahead of external verification. We also deliver board and finance team training on the IFRS S1 and S2 requirements.',
          'The regime rewards companies that treat climate reporting as a financial reporting process with the same controls, evidence and governance. The companies that start now will be the ones whose first assured report is uneventful.',
        ],
      },
    ],
    relatedSolutions: [
      'sustainability-reporting',
      'carbon-accounting',
      'ghg-inventory',
      'scope-1-2-3',
      'climate-risk',
      'assurance-readiness',
    ],
    relatedArticles: [
      'singapore-climate-reporting-what-applies-and-when',
      'sgx-climate-reporting-assurance-readiness',
      'scope-3-where-to-start',
      'what-assurance-providers-actually-test',
    ],
    tags: [
      'IFRS S1',
      'IFRS S2',
      'SGX climate reporting',
      'ACRA',
      'ISSB',
      'assurance readiness',
    ],
    seo: {
      title: 'Singapore Mandatory Climate Reporting: IFRS S1 and S2 Readiness',
      description: 'ACRA and SGX are phasing in ISSB-aligned climate reporting. What IFRS S1 and S2 require, who is in scope, and how to build an assurrable reporting system.',
      primaryKeyword: 'Singapore mandatory climate reporting',
      secondaryKeywords: [
        'IFRS S2 Singapore',
        'ISSB climate reporting',
        'SGX climate disclosure requirements',
      ],
    },
    status: 'published',
  },
  {
    slug: 'internal-carbon-pricing-singapore',
    title: 'Internal Carbon Pricing: A Practical Tool for Singapore Companies Preparing for Mandatory Climate Reporting',
    excerpt: 'Internal carbon pricing is moving from voluntary best practice to a core component of climate transition planning. Here is how Singapore companies can design a shadow price that supports ISSB-aligned disclosure and decarbonisation decisions.',
    type: 'Article',
    categorySlug: 'singapore',
    authorSlug: 'raymond-cheung',
    publishedAt: '2026-11-13',
    intro: [
      'Internal carbon pricing (ICP) is no longer a niche instrument used only by large multinationals. As Singapore\'s mandatory climate reporting regime takes effect under ACRA and SGX requirements aligned with IFRS S1 and S2, companies are being asked to disclose how climate risk affects their strategy, financial planning and capital allocation. An internal carbon price gives management a defensible, quantified basis for those disclosures.',
      'The concept is straightforward: a company assigns a monetary value to each tonne of carbon dioxide equivalent it emits, or expects to emit, and uses that value in investment appraisal, procurement, budgeting and scenario analysis. The discipline lies in choosing the right price, applying it consistently, and documenting the assumptions so that auditors and assurance providers can test them.',
      'This article sets out the practical design choices for Singapore and ASEAN companies adopting ICP for the first time, with reference to the disclosure expectations under IFRS S2 and the transition planning requirements now embedded in the SGX climate reporting rules.',
    ],
    sections: [
      {
        heading: 'Why internal carbon pricing matters now',
        id: 'why-icp-matters-now',
        body: [
          'IFRS S2 requires entities to disclose their climate-related transition plan, including the assumptions used and the internal carbon prices applied. Paragraph 14 of IFRS S2 specifically identifies internal carbon prices as a relevant assumption where an entity uses one. This turns ICP from a voluntary management tool into a disclosure input that assurance providers will examine.',
          'Singapore\'s carbon tax provides an external reference point. The tax is scheduled to rise from S$25 per tonne in 2024 and 2025 to S$45 per tonne in 2026 and 2027, with a further increase planned toward S$50 to S$80 by 2030. Companies that set an internal price well below the statutory trajectory are unlikely to demonstrate credible transition planning to investors or lenders.',
          'For SGX-listed issuers, the climate reporting requirements introduced in 2022 and progressively aligned with ISSB standards mean that board committees and audit committees are now expected to challenge management on the financial implications of climate risk. An ICP gives them a consistent metric to do so.',
        ],
      },
      {
        heading: 'Choosing the pricing approach',
        id: 'choosing-pricing-approach',
        body: [
          'There are three common approaches. A shadow price is used internally for decision-making without any cash flow. An internal carbon fee involves an actual internal transfer, often from business units to a central sustainability fund. An implicit price is derived retrospectively from the abatement cost of projects already undertaken.',
          'For most Singapore companies at an early stage of maturity, the shadow price is the most practical starting point. It requires no treasury or tax restructuring, can be applied to capital expenditure decisions immediately, and produces the assumptions needed for IFRS S2 disclosure.',
          'The price level itself should be anchored to something defensible. Reasonable anchors include the Singapore carbon tax trajectory, the marginal abatement cost of the company\'s own decarbonisation levers, or a peer benchmark drawn from the CDP disclosure database. Companies with EU exposure should also consider the CBAM certificate price, since embedded emissions in exported goods will carry a direct cost from 2026.',
        ],
      },
      {
        heading: 'Design decisions that assurance providers will test',
        id: 'design-decisions',
        body: [
          'Assurance providers and auditors will look for consistency and documentation. The following design choices should be recorded in a written methodology note approved by the board or its sustainability committee.',
          'Scope of application: which decisions and which emissions the price applies to. A common approach is to apply the shadow price to Scope 1 and Scope 2 emissions for all capital projects above a defined threshold, and to Scope 3 where supplier selection or product design is materially affected.',
          'Price trajectory: whether a single price or a rising trajectory is used. A trajectory aligned to the Singapore carbon tax schedule and to the company\'s own net zero target year is more credible than a flat price, and is easier to reconcile with IFRS S2 scenario analysis.',
          'Governance: who sets the price, how often it is reviewed, and how exceptions are approved. This should mirror the company\'s existing capital allocation governance rather than sit outside it.',
          'Disclosure: how the price and its application are described in the sustainability report. IFRS S2 requires the assumptions to be disclosed where they are material to the transition plan.',
        ],
        list: [
          'Document the pricing method, price level and review cadence in a board-approved methodology note',
          'Apply the price consistently across capital expenditure, procurement and scenario analysis',
          'Reconcile the price to the Singapore carbon tax trajectory and to any CBAM exposure',
          'Disclose the price and its use in the IFRS S2 transition plan narrative',
        ],
      },
      {
        heading: 'Linking internal carbon pricing to transition planning',
        id: 'linking-to-transition-planning',
        body: [
          'An internal carbon price becomes useful for transition planning when it is embedded in the financial model rather than applied as an afterthought. Companies should run their capital allocation plan under at least two price scenarios, for example the statutory Singapore trajectory and a higher stress case consistent with a 1.5 degree pathway.',
          'The output is a ranked list of decarbonisation levers by abatement cost, which is directly usable in the transition plan required under IFRS S2 and in the decarbonisation roadmap that underpins a science-based target. It also gives the finance function a way to test whether planned investments remain viable under higher carbon prices.',
          'For companies with EU customers, the same model can be extended to estimate CBAM certificate costs on embedded emissions, which is a direct financial exposure rather than a shadow cost. This is particularly relevant for exporters of aluminium, cement, fertilisers, iron and steel, hydrogen and electricity.',
        ],
      },
      {
        heading: 'Getting started: a 90 day implementation sequence',
        id: 'getting-started',
        body: [
          'A first internal carbon price does not require a lengthy programme. A focused 90 day sequence is usually sufficient to produce a board-ready methodology and a first set of decision outputs.',
          'Weeks one to four: establish the baseline. Confirm the emissions inventory boundary, identify the decisions where the price will be applied, and gather the abatement cost data already available from energy audits or ISO 50001 work.',
          'Weeks five to eight: set the price and test it. Select the anchor, run the capital plan under two price scenarios, and identify which projects change ranking. This is the point at which the price becomes useful rather than theoretical.',
          'Weeks nine to twelve: document and approve. Draft the methodology note, take it through the sustainability committee and audit committee, and prepare the disclosure language for the next sustainability report. From there, the price should be reviewed annually alongside the carbon tax schedule and any changes to the company\'s transition plan.',
        ],
      },
    ],
    relatedSolutions: [
      'carbon-accounting',
      'decarbonisation',
      'climate-risk',
      'assurance-readiness',
    ],
    relatedArticles: [
      'singapore-climate-reporting-what-applies-and-when',
      'cbam-what-asian-exporters-need',
      'what-assurance-providers-actually-test',
    ],
    tags: [
      'Internal carbon pricing',
      'IFRS S2',
      'Singapore carbon tax',
      'Transition planning',
      'Decarbonisation',
    ],
    seo: {
      title: 'Internal Carbon Pricing for Singapore Companies: IFRS S2 Guide',
      description: 'How Singapore companies can design an internal carbon price to support IFRS S2 transition plan disclosure, capital allocation and decarbonisation decisions.',
      primaryKeyword: 'internal carbon pricing Singapore',
      secondaryKeywords: [
        'IFRS S2 transition plan',
        'Singapore carbon tax 2026',
        'shadow carbon price',
      ],
    },
    status: 'published',
  },
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

import type { Solution } from '@/types/content';

export const carbonClimateSolutions: Solution[] = [
  {
    slug: 'carbon-accounting',
    title: 'Carbon Accounting',
    category: 'carbon-climate',
    heroStatement:
      'Produce an emissions figure your auditors, customers and lenders will accept.',
    summary:
      'A defensible greenhouse gas number, built on a documented boundary, traceable data and a methodology that stays consistent between reporting years.',
    businessContext: [
      'Emissions data has moved from a voluntary disclosure to a business input. Listed companies in Singapore report Scope 1 and 2 emissions under SGX rules, customers pass supplier emissions requests down their supply chains, and lenders increasingly ask borrowers for the same figures they need for their own financed emissions reporting.',
      'The difficulty is rarely the arithmetic. It is that the underlying data was never collected for this purpose. Fuel is recorded in accounts payable, electricity in facilities, refrigerants in a maintenance log, and business travel in an expense system, each with different coverage and different periods.',
      'Where that is not resolved, the organisation ends up with a number it cannot explain, cannot reproduce next year, and cannot defend when someone asks how it was derived.',
    ],
    components: [
      'Organisational boundary definition, using the control or equity share approach',
      'Operational boundary and emissions source mapping across the business',
      'Scope 1 direct emissions -- combustion, process, fugitive and mobile sources',
      'Scope 2 purchased energy, on both location-based and market-based methods',
      'Scope 3 screening and prioritisation of relevant categories',
      'Data collection framework, with owners and source systems named for each input',
      'Emission factor selection and documentation of sources',
      'Emissions calculation and internal quality checks',
      'Base year setting and a recalculation policy for structural change',
      'Methodology documentation written for external review',
    ],
    deliverables: [
      'Greenhouse gas inventory covering the agreed reporting boundary',
      'Emissions calculation workbook with traceable inputs and factors',
      'Methodology and boundary documentation',
      'Data collection framework with named owners and source systems',
      'Data gap register with the treatment applied to each gap',
      'Management report explaining the results and their drivers',
      'Improvement roadmap for the next reporting cycle',
    ],
    frameworks: ['GHG Protocol Corporate Standard', 'ISO 14064-1'],
    audience: [
      'Listed companies reporting under SGX requirements',
      'Large non-listed companies preparing for future reporting obligations',
      'Manufacturers responding to customer and supply-chain requests',
      'Banks and financial institutions building financed emissions data',
      'SMEs asked for emissions data by a customer or lender',
    ],
    faqs: [
      {
        question: 'What is the difference between carbon accounting and a GHG inventory?',
        answer:
          'They describe the same work from different angles. Carbon accounting is the discipline -- boundaries, methodology, emission factors and controls. The greenhouse gas inventory is the output: the quantified set of emissions for a defined organisation and reporting period.',
      },
      {
        question: 'How long does a first carbon accounting exercise take?',
        answer:
          'It depends on the number of sites, the number of source systems involved, and how much of the underlying data already exists. The largest variable is data availability, not calculation. We scope this before quoting so the timeline reflects your actual data position.',
      },
      {
        question: 'Do we need to measure Scope 3 straight away?',
        answer:
          'Not necessarily. Under the current SGX phasing, mandatory Scope 3 reporting applies first to STI constituents. Most organisations begin with a Scope 3 screening to identify which categories are material, then build measurement for those categories rather than attempting all fifteen at once.',
      },
      {
        question: 'Which emission factors do you use?',
        answer:
          'Factor selection depends on the country of operation, the activity and the data available. We document the source and version of every factor used so the inventory can be reproduced and updated consistently.',
      },
      {
        question: 'Will the inventory be ready for external assurance?',
        answer:
          'That is how we build it. Documentation, traceability and the data gap register are the elements an assurance provider examines first. Whether you then engage an assurance provider is a separate decision.',
      },
      {
        question: 'What if our data has gaps?',
        answer:
          'Gaps are normal in a first inventory. They are handled with a documented estimation approach, recorded in the gap register, and targeted for improvement in the following cycle. What matters is that the treatment is disclosed rather than hidden.',
      },
    ],
    relatedSolutions: ['ghg-inventory', 'scope-1-2-3', 'iso-14064', 'decarbonisation'],
    relatedIndustries: ['manufacturing-supply-chain', 'financial-services'],
    expertSlugs: ['raymond-cheung'],
    seo: {
      title: 'Carbon Accounting Singapore',
      description:
        'Carbon accounting for organisations in Singapore and Asia. Defensible GHG inventories built on GHG Protocol and ISO 14064 with documented methodology.',
      primaryKeyword: 'carbon accounting Singapore',
      secondaryKeywords: ['carbon footprint consultant Singapore', 'GHG accounting Singapore'],
    },
    status: 'published',
  },
  {
    slug: 'ghg-inventory',
    title: 'GHG Inventory Development',
    navTitle: 'GHG Inventories',
    category: 'carbon-climate',
    heroStatement:
      'Build a greenhouse gas inventory that can be reproduced, audited and improved year after year.',
    summary:
      'A complete organisational inventory with defined boundaries, documented sources, quality controls and a base year you can report against consistently.',
    businessContext: [
      'A greenhouse gas inventory is not a one-off calculation. It is a reporting asset that has to be produced again every year, on a comparable basis, often by different people than those who built it.',
      'Inventories that were assembled quickly tend to fail on their second cycle. The spreadsheet is undocumented, the person who built it has moved on, the boundary has changed because the business acquired a site, and last year\'s figure can no longer be explained.',
      'Building the inventory as a repeatable process -- with defined ownership, documented method and a recalculation policy -- costs more in the first year and considerably less in every year after it.',
    ],
    components: [
      'Boundary setting and consolidation approach',
      'Full emissions source register across sites and activities',
      'Activity data collection design, mapped to existing source systems',
      'Emission factor library with documented sources and versions',
      'Calculation model with built-in quality control checks',
      'Base year determination and recalculation policy',
      'Uncertainty and data quality assessment',
      'Inventory management plan for repeat reporting cycles',
      'Handover and internal training so the process can be run in-house',
    ],
    deliverables: [
      'Organisational greenhouse gas inventory for the reporting period',
      'Inventory management plan documenting process, ownership and controls',
      'Emission factor library',
      'Calculation model with quality control checks',
      'Base year statement and recalculation policy',
      'Data quality and uncertainty assessment',
      'Internal handover session and process documentation',
    ],
    frameworks: ['GHG Protocol Corporate Standard', 'ISO 14064-1'],
    audience: [
      'Organisations reporting emissions for the first time',
      'Companies whose existing inventory cannot be reproduced or explained',
      'Groups consolidating emissions across multiple entities or countries',
      'Organisations preparing for limited assurance on Scope 1 and 2 data',
    ],
    faqs: [
      {
        question: 'What is an inventory management plan?',
        answer:
          'It is the written procedure for producing the inventory: who collects each data input, from which system, on what timetable, how it is checked, and how the result is reviewed. It is the document that lets a different person produce the same result next year.',
      },
      {
        question: 'How do we choose a base year?',
        answer:
          'A base year should be a period with reasonably complete data that is representative of normal operations. It also needs a recalculation policy, so that acquisitions, disposals or methodology changes are handled consistently rather than quietly resetting the baseline.',
      },
      {
        question: 'Can you work with our existing spreadsheet?',
        answer:
          'Usually. We review what exists, identify where the methodology or traceability breaks down, and rebuild those parts rather than discarding work that is sound.',
      },
      {
        question: 'Does this cover more than carbon dioxide?',
        answer:
          'Yes. An inventory covers the greenhouse gases relevant to your operations, converted to carbon dioxide equivalent using documented global warming potentials. Refrigerant losses in particular are commonly missed and can be material.',
      },
    ],
    relatedSolutions: ['carbon-accounting', 'scope-1-2-3', 'iso-14064', 'assurance-readiness'],
    relatedIndustries: ['manufacturing-supply-chain'],
    expertSlugs: ['raymond-cheung'],
    seo: {
      title: 'GHG Inventory Development Singapore',
      description:
        'Greenhouse gas inventory development in Singapore. Repeatable inventories with documented boundaries, emission factors, controls and a base year policy.',
      primaryKeyword: 'GHG inventory Singapore',
      secondaryKeywords: ['greenhouse gas inventory consultant', 'GHG Protocol Singapore'],
    },
    status: 'published',
  },
  {
    slug: 'scope-1-2-3',
    title: 'Scope 1, 2 & 3 Emissions',
    navTitle: 'Scope 1, 2 & 3',
    category: 'carbon-climate',
    heroStatement:
      'Establish which emissions you are accountable for, and measure the ones that matter.',
    summary:
      'Complete Scope 1 and 2 measurement, and a Scope 3 programme that starts with screening and prioritisation rather than attempting fifteen categories at once.',
    businessContext: [
      'Scope 1 and Scope 2 cover emissions an organisation controls directly or through its purchased energy. They are bounded, and for most organisations they are the smaller number.',
      'Scope 3 covers the value chain -- purchased goods and services, transport, use of sold products, and eleven further categories. For many businesses it accounts for the large majority of total emissions, and it is the part that customers and investors increasingly ask about.',
      'Attempting all fifteen Scope 3 categories in a first year is a common and expensive mistake. Screening first establishes which categories are material to this business, which are measurable with the data available, and which can wait.',
    ],
    components: [
      'Scope 1 source identification: stationary combustion, mobile combustion, process and fugitive emissions',
      'Scope 2 measurement on both location-based and market-based methods',
      'Renewable energy instrument treatment, where applicable',
      'Scope 3 screening across all fifteen categories',
      'Materiality assessment of Scope 3 categories against spend, volume and influence',
      'Category-level measurement for prioritised Scope 3 categories',
      'Supplier data collection approach, including a primary-data pathway',
      'Spend-based, average-data and supplier-specific method selection',
      'Documentation of exclusions with the rationale for each',
    ],
    deliverables: [
      'Scope 1 and Scope 2 emissions results, location-based and market-based',
      'Scope 3 screening report ranking all fifteen categories by estimated significance',
      'Measured results for prioritised Scope 3 categories',
      'Supplier engagement approach for improving primary data coverage',
      'Documented exclusions with rationale',
      'Multi-year plan for extending Scope 3 coverage',
    ],
    frameworks: [
      'GHG Protocol Corporate Standard',
      'GHG Protocol Corporate Value Chain (Scope 3) Standard',
    ],
    audience: [
      'STI-constituent companies preparing for mandatory Scope 3 reporting',
      'Suppliers receiving emissions data requests from large customers',
      'Manufacturers with significant purchased goods and logistics footprints',
      'Organisations whose Scope 3 estimate has been challenged',
    ],
    faqs: [
      {
        question: 'What is the difference between location-based and market-based Scope 2?',
        answer:
          'Location-based uses the average emissions intensity of the grid you draw from. Market-based reflects the electricity you have contractually procured, including renewable energy instruments. The GHG Protocol requires both to be reported where a market-based figure is claimed.',
      },
      {
        question: 'Do we have to report all fifteen Scope 3 categories?',
        answer:
          'No. The Scope 3 Standard requires you to screen all fifteen and report those that are material, disclosing and justifying any exclusions. Screening is what makes that judgement defensible.',
      },
      {
        question: 'When is Scope 3 mandatory in Singapore?',
        answer:
          'Under the phased SGX approach, mandatory Scope 3 reporting begins with STI constituents. For other listed companies Scope 3 initially remains voluntary. Because these timelines have been revised, we confirm the current position against ACRA and SGX RegCo guidance at the point of engagement.',
      },
      {
        question: 'Our suppliers will not give us data. What then?',
        answer:
          'Most organisations start with spend-based or average-data methods, which are accepted under the standard, then move priority suppliers onto primary data over time. The route from one to the other should be planned rather than left open.',
      },
      {
        question: 'Is Scope 3 double counting?',
        answer:
          'Emissions do appear in more than one organisation\'s Scope 3 inventory, and that is by design. Scope 3 measures value-chain influence, not exclusive ownership of a tonne. It is not added to national inventories.',
      },
    ],
    relatedSolutions: ['carbon-accounting', 'ghg-inventory', 'sustainable-procurement', 'life-cycle-assessment'],
    relatedIndustries: ['manufacturing-supply-chain', 'technology'],
    expertSlugs: ['raymond-cheung'],
    seo: {
      title: 'Scope 1, 2 & 3 Emissions Consultant Singapore',
      description:
        'Scope 1, 2 and 3 emissions measurement in Singapore. Screening, prioritisation and value-chain data collection under the GHG Protocol Scope 3 Standard.',
      primaryKeyword: 'Scope 3 consultant Singapore',
      secondaryKeywords: ['Scope 1 2 3 emissions Singapore', 'value chain emissions Asia'],
    },
    status: 'published',
  },
  {
    slug: 'iso-14064',
    title: 'ISO 14064 Advisory',
    navTitle: 'ISO 14064',
    category: 'carbon-climate',
    heroStatement:
      'Quantify and report greenhouse gas emissions to a standard built for independent verification.',
    summary:
      'Preparation against ISO 14064-1, structured so the resulting GHG assertion can be taken to a verification body without rework.',
    businessContext: [
      'ISO 14064-1 specifies how an organisation quantifies and reports greenhouse gas emissions and removals. Where the GHG Protocol is widely used for corporate reporting, ISO 14064 is the route most often taken when the intention is third-party verification.',
      'The two are compatible, and an organisation can satisfy both. The practical difference is that ISO 14064-1 is prescriptive about documentation, uncertainty treatment and the content of the GHG report itself.',
      'Organisations usually pursue it because a customer, a tender, a regulator or a verification body has asked for it -- in which case the documentation requirements are not optional detail, they are the deliverable.',
    ],
    components: [
      'Gap assessment against ISO 14064-1 requirements',
      'Organisational and reporting boundary definition to the standard',
      'Direct and indirect emissions categorisation as set out in the standard',
      'Quantification methodology selection and documentation',
      'Uncertainty assessment',
      'GHG information management procedures and internal controls',
      'Preparation of the GHG report and assertion',
      'Support through verification, including responses to verifier findings',
    ],
    deliverables: [
      'Gap assessment against ISO 14064-1',
      'Boundary and categorisation documentation',
      'Quantification methodology document',
      'GHG report prepared to the content requirements of the standard',
      'GHG information management procedure',
      'Uncertainty assessment',
      'Verification support and finding responses',
    ],
    frameworks: ['ISO 14064-1', 'ISO 14064-3', 'GHG Protocol Corporate Standard'],
    audience: [
      'Organisations required by a customer or tender to hold a verified GHG assertion',
      'Companies seeking third-party verification of emissions data',
      'Manufacturers and exporters facing overseas customer requirements',
      'Organisations already holding other ISO management system certifications',
    ],
    faqs: [
      {
        question: 'Is ISO 14064 a certification?',
        answer:
          'ISO 14064-1 leads to a verified GHG assertion rather than a management system certification. An accredited verification body examines the assertion and issues a verification statement. CER prepares organisations for that process; the verification itself is carried out by an independent body.',
      },
      {
        question: 'How does ISO 14064 relate to the GHG Protocol?',
        answer:
          'They are broadly compatible and use similar concepts of boundaries and scopes. ISO 14064-1 uses a different categorisation of indirect emissions and is more prescriptive about report content, uncertainty and documentation.',
      },
      {
        question: 'Do we need ISO 14064 if we already report under SGX rules?',
        answer:
          'Not automatically. SGX-aligned climate reporting and an ISO 14064 verified assertion serve different audiences. Organisations usually pursue ISO 14064 when a specific counterparty asks for verified emissions data.',
      },
      {
        question: 'Can CER verify our inventory?',
        answer:
          'No, and no adviser should. Preparing an inventory and independently verifying it are separate roles, and a verification body cannot accept work it produced itself. We prepare you for verification and support you through it.',
      },
    ],
    relatedSolutions: ['carbon-accounting', 'ghg-inventory', 'iso-advisory', 'assurance-readiness'],
    relatedIndustries: ['manufacturing-supply-chain'],
    expertSlugs: ['raymond-cheung'],
    seo: {
      title: 'ISO 14064 Consultant Singapore',
      description:
        'ISO 14064 advisory in Singapore. Prepare a GHG assertion for independent verification, with the boundaries, methodology and documentation the standard requires.',
      primaryKeyword: 'ISO 14064 consultant Singapore',
      secondaryKeywords: ['ISO 14064-1 Singapore', 'GHG verification Singapore'],
    },
    status: 'published',
  },
  {
    slug: 'decarbonisation',
    title: 'Decarbonisation & Net-Zero Strategy',
    navTitle: 'Decarbonisation & Net-Zero',
    category: 'carbon-climate',
    heroStatement:
      'Move from an emissions baseline to a reduction plan the business can actually fund and deliver.',
    summary:
      'Reduction levers assessed against cost, feasibility and impact, sequenced into a roadmap with owners, capital requirements and interim targets.',
    businessContext: [
      'A target is not a plan. Organisations that announce a long-dated commitment without an underlying pathway tend to find that the intervening years produce activity rather than reduction, and that the commitment becomes a reputational liability rather than an asset.',
      'A workable decarbonisation plan is unglamorous. It identifies the specific levers available to this organisation, what each one costs, what it delivers, when it can realistically be implemented, and who owns it.',
      'It also has to survive contact with capital planning. Reduction measures compete with every other use of capital in the business, so the plan needs to present them in terms a finance function recognises.',
    ],
    components: [
      'Baseline review and emissions driver analysis',
      'Reduction lever identification across energy, process, fleet, refrigerants and procurement',
      'Marginal abatement cost assessment of each lever',
      'Feasibility and implementation constraint review',
      'Scenario modelling of alternative pathways',
      'Interim target setting with a defined base year',
      'Sequencing and roadmap development with owners and dependencies',
      'Capital and operating cost estimation',
      'Governance, monitoring and reporting design',
      'Guidance on the appropriate role, if any, of carbon credits',
    ],
    deliverables: [
      'Emissions driver analysis',
      'Assessed reduction lever register with cost and impact estimates',
      'Decarbonisation pathway showing modelled scenarios',
      'Interim targets and base year statement',
      'Implementation roadmap with owners, sequencing and dependencies',
      'Capital requirement summary',
      'Monitoring and governance framework',
    ],
    frameworks: ['GHG Protocol Corporate Standard', 'ISO 14064-1'],
    audience: [
      'Organisations with a completed emissions baseline and no reduction plan',
      'Companies that have made a public commitment and need a pathway behind it',
      'Manufacturers facing energy cost and customer pressure simultaneously',
      'Boards seeking a costed view of what decarbonisation requires',
    ],
    faqs: [
      {
        question: 'Do we need a full inventory before starting?',
        answer:
          'You need a reliable baseline for the emissions you intend to reduce. Building a reduction plan on figures that are not defensible produces a plan that cannot be measured against.',
      },
      {
        question: 'What is a marginal abatement cost curve?',
        answer:
          'It ranks available reduction measures by cost per tonne of emissions avoided, against the volume each delivers. It is a prioritisation tool, and it is only as good as the cost and impact estimates behind it -- which is why those are built from your operations rather than sector averages.',
      },
      {
        question: 'Should we buy carbon credits?',
        answer:
          'Credits do not substitute for reduction, and treating them as though they do creates real exposure. Where they have a role it is usually limited and specific. We set out what that role would be in your case, including where the answer is that there is not one yet.',
      },
      {
        question: 'How far out should targets go?',
        answer:
          'Long-dated targets are difficult to manage against. Interim targets on a horizon the current management team is accountable for tend to produce more actual reduction.',
      },
    ],
    relatedSolutions: ['carbon-accounting', 'scope-1-2-3', 'esg-strategy', 'life-cycle-assessment'],
    relatedIndustries: ['manufacturing-supply-chain', 'energy-infrastructure'],
    expertSlugs: ['raymond-cheung', 'chan-ee-chong'],
    seo: {
      title: 'Decarbonisation & Net-Zero Strategy Singapore',
      description:
        'Decarbonisation and net-zero strategy in Singapore. Costed reduction pathways, interim targets and implementation roadmaps grounded in your own operations.',
      primaryKeyword: 'decarbonisation consultant Singapore',
      secondaryKeywords: ['net zero strategy Singapore', 'carbon reduction strategy Asia'],
    },
    status: 'published',
  },
  {
    slug: 'life-cycle-assessment',
    title: 'Life Cycle Assessment',
    navTitle: 'Life Cycle Assessment',
    category: 'carbon-climate',
    heroStatement:
      'Understand the environmental impact of a product across its full life cycle, not just its factory gate.',
    summary:
      'Product-level assessment following ISO 14040 and ISO 14044, from goal and scope definition through inventory analysis, impact assessment and interpretation.',
    businessContext: [
      'Corporate emissions reporting answers questions about an organisation. It does not answer questions about a product -- which is what customers, procurement teams and increasingly regulators are asking.',
      'Life cycle assessment quantifies impact across the stages a product passes through: raw materials, manufacture, distribution, use and end of life. Depending on the question, the assessment may cover the full life cycle or stop at the factory gate.',
      'It is also the analysis that most often changes a design decision, because it shows where impact actually sits. That is frequently upstream in materials rather than in the manufacturing process the organisation controls.',
    ],
    components: [
      'Goal and scope definition, including the functional unit',
      'System boundary setting -- cradle-to-gate or cradle-to-grave',
      'Life cycle inventory data collection across the boundary',
      'Primary data collection from operations, and secondary data selection',
      'Impact assessment across the agreed impact categories',
      'Sensitivity and uncertainty analysis',
      'Interpretation, hotspot identification and improvement options',
      'Reporting prepared to ISO 14044 requirements',
      'Critical review support where comparative assertions are to be published',
    ],
    deliverables: [
      'Goal and scope definition document',
      'Life cycle inventory model',
      'Impact assessment results by life cycle stage',
      'Hotspot analysis identifying where impact concentrates',
      'Sensitivity analysis on key assumptions',
      'Life cycle assessment report prepared to ISO 14044',
      'Improvement options assessment',
    ],
    frameworks: ['ISO 14040', 'ISO 14044'],
    audience: [
      'Manufacturers whose customers require product-level environmental data',
      'Product and design teams evaluating material or process changes',
      'Organisations preparing environmental product declarations',
      'Companies substantiating a product environmental claim',
    ],
    faqs: [
      {
        question: 'What is a functional unit?',
        answer:
          'It is the quantified performance the assessment measures against -- for example one thousand litres delivered, or one square metre protected for twenty years. It is what makes results comparable, and it is the single most consequential decision in the study.',
      },
      {
        question: 'What is the difference between cradle-to-gate and cradle-to-grave?',
        answer:
          'Cradle-to-gate covers raw materials through to the point the product leaves your control. Cradle-to-grave continues through distribution, use and end of life. Which is appropriate depends on the question being asked and who is asking it.',
      },
      {
        question: 'Do we need a critical review?',
        answer:
          'ISO 14044 requires an independent critical review where a comparative assertion is to be disclosed publicly. For internal decision-making it is not required, though it does strengthen the result.',
      },
      {
        question: 'How does LCA relate to Scope 3?',
        answer:
          'They share data and concepts but answer different questions. Scope 3 measures value-chain emissions attributable to an organisation. LCA measures impact attributable to a product, and covers impact categories beyond greenhouse gases.',
      },
    ],
    relatedSolutions: ['scope-1-2-3', 'sustainable-procurement', 'decarbonisation'],
    relatedIndustries: ['manufacturing-supply-chain'],
    expertSlugs: ['raymond-cheung'],
    seo: {
      title: 'Life Cycle Assessment Singapore',
      description:
        'Life cycle assessment in Singapore to ISO 14040 and ISO 14044. Product-level impact across materials, manufacture, distribution, use and end of life.',
      primaryKeyword: 'life cycle assessment Singapore',
      secondaryKeywords: ['LCA consultant Singapore', 'ISO 14040 Singapore'],
    },
    status: 'published',
  },
];

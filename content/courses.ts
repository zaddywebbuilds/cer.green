import type { Course, CourseCategory } from '@/types/content';

/**
 * CER Academy courses.
 *
 * TITLES, DURATIONS AND SERIES are taken verbatim from CER's published course
 * listing. Nothing has been added to that list and no course has been invented.
 *
 * CERTIFICATION is deliberately unresolved on every course. CER delivers
 * training in collaboration with TÜV SÜD Academy Singapore, and exactly what a
 * participant receives -- a CER certificate, a co-branded certificate, or a
 * partner-issued one -- is not established in CER's public material. Claiming
 * any of them would be inventing an accreditation. CER must confirm the wording
 * per course before launch.
 *
 * LEARNING OUTCOMES AND MODULES are drafted curricula, written to match each
 * published course title and duration. They require CER trainer sign-off before
 * launch so that what is advertised matches what is delivered. See
 * docs/CONTENT-GUIDE.md.
 *
 * DATES AND PRICES are not published by CER, so `upcoming` is empty and no
 * price is set. Course pages present an enquiry route instead of a false
 * schedule.
 */

export const courseCategories: CourseCategory[] = [
  {
    slug: 'esg-sustainability',
    title: 'ESG & Sustainability',
    summary:
      'Foundational and applied programmes covering ESG strategy, reporting, brand and procurement.',
  },
  {
    slug: 'carbon-climate',
    title: 'Carbon & Climate',
    summary:
      'Technical programmes on carbon measurement, greenhouse gas standards and product life cycle impact.',
  },
  {
    slug: 'sustainable-finance',
    title: 'Sustainable Finance',
    summary:
      'Programmes for finance professionals on ESG integration, green finance and climate-aligned investing.',
  },
  {
    slug: 'risk-governance',
    title: 'Risk & Governance',
    summary:
      'Programmes on ESG risk, enterprise risk management and decision-making under uncertainty.',
  },
];

export const courses: Course[] = [
  {
    slug: 'esg-essentials',
    title: 'ESG Essentials: A Strategic Overview',
    category: 'esg-sustainability',
    outcome:
      'Understand what ESG requires of your organisation and where responsibility for it sits.',
    summary:
      'A half-day grounding in ESG for managers and professionals who need to understand the requirements, the terminology and the business implications.',
    description: [
      'ESG arrives in most organisations as a set of external demands before anyone internally has been given a working definition of it. This programme provides that definition, and sets out what the requirements actually ask organisations to do.',
      'The session is built for people who need to participate in ESG decisions rather than run them: managers, functional leads and professionals who have been given ESG responsibilities alongside an existing role.',
      'It covers the reporting landscape as it applies in Singapore and the wider region, the difference between the frameworks people commonly conflate, and how ESG obligations translate into work for specific functions.',
    ],
    duration: 'Half day',
    formats: ['In person', 'Virtual live', 'In-house'],
    location: 'Singapore',
    upcoming: [],
    whoShouldAttend: [
      'Managers given ESG responsibilities alongside an existing role',
      'Finance, risk, legal and operations professionals supporting ESG work',
      'Business owners and directors of small and mid-sized companies',
      'Teams preparing for a first sustainability reporting cycle',
    ],
    learningOutcomes: [
      'Define ESG accurately and distinguish it from adjacent terms such as sustainability and CSR',
      'Identify the main reporting frameworks and what each is for',
      'Describe the reporting obligations applying to organisations in Singapore and how they are phased',
      'Explain the concept of materiality and its role in determining what an organisation reports',
      'Recognise where ESG requirements create work for specific business functions',
      'Identify the first practical steps an organisation should take',
    ],
    modules: [
      {
        title: 'What ESG is, and what it is not',
        points: [
          'Environmental, social and governance components',
          'How ESG differs from sustainability, CSR and philanthropy',
          'Who is asking, and why: investors, customers, regulators and lenders',
        ],
      },
      {
        title: 'The reporting landscape',
        points: [
          'The main frameworks and standards, and what each addresses',
          'Climate-first reporting and ISSB-aligned disclosure',
          'How reporting obligations are phased in Singapore',
        ],
      },
      {
        title: 'Materiality',
        points: [
          'Why materiality determines everything downstream',
          'Financial materiality and double materiality',
          'How material issues are identified and validated',
        ],
      },
      {
        title: 'ESG in the business',
        points: [
          'Governance and ownership: who is accountable',
          'What ESG requires from finance, procurement, HR and operations',
          'Common failure patterns and how to avoid them',
        ],
      },
      {
        title: 'Getting started',
        points: [
          'Sequencing a first ESG programme',
          'Data and capability prerequisites',
          'Practical first steps by organisation size',
        ],
      },
    ],
    instructorSlugs: ['raymond-cheung'],
    corporateAvailable: true,
    relatedCourses: ['carbon-literacy-for-professionals', 'esg-risk-management'],
    relatedSolutions: ['esg-strategy', 'sustainability-reporting'],
    faqs: [
      {
        question: 'Do I need prior ESG knowledge?',
        answer: 'No. The programme assumes no prior background and starts from definitions.',
      },
      {
        question: 'Is this suitable for a whole team?',
        answer:
          'Yes. It is frequently delivered in-house as a shared grounding before an organisation begins an ESG programme, so that everyone is working from the same definitions.',
      },
    ],
    seo: {
      title: 'ESG Essentials Training Singapore',
      description:
        'Half-day ESG Essentials training in Singapore. A strategic overview of ESG requirements, reporting frameworks and materiality for managers and professionals.',
      primaryKeyword: 'ESG training Singapore',
      secondaryKeywords: ['ESG course Singapore', 'ESG essentials training'],
    },
    status: 'published',
    registration: 'enquire',
  },
  {
    slug: 'carbon-literacy-for-professionals',
    title: 'Carbon Literacy for Professionals: Measurement to Mitigation',
    category: 'carbon-climate',
    outcome:
      'Read, question and contribute to a greenhouse gas inventory with confidence.',
    summary:
      'A half-day technical grounding in carbon measurement: boundaries, scopes, emission factors, and how measurement connects to reduction.',
    description: [
      'Carbon numbers circulate widely inside organisations and are frequently misunderstood by the people expected to act on them. This programme addresses that directly.',
      'It covers how emissions are measured -- organisational boundaries, the three scopes, activity data and emission factors -- and then how measurement translates into reduction: what levers exist, how they are assessed, and why a target without a pathway is not a plan.',
      'The session is technical enough to be useful and is aimed at professionals who need to work with emissions data rather than produce it single-handedly.',
    ],
    duration: 'Half day',
    formats: ['In person', 'Virtual live', 'In-house'],
    location: 'Singapore',
    upcoming: [],
    whoShouldAttend: [
      'Sustainability, EHS and operations professionals working with emissions data',
      'Finance and reporting teams responsible for carbon disclosures',
      'Procurement teams handling supplier emissions requirements',
      'Managers asked to interpret or challenge an emissions figure',
    ],
    learningOutcomes: [
      'Explain organisational and operational boundary setting',
      'Distinguish Scope 1, Scope 2 and Scope 3 emissions and give examples of each',
      'Describe the difference between location-based and market-based Scope 2',
      'Explain how activity data and emission factors combine to produce an emissions figure',
      'Identify common sources of error and omission in a greenhouse gas inventory',
      'Describe how reduction levers are identified and prioritised by cost and impact',
    ],
    modules: [
      {
        title: 'Foundations',
        points: [
          'Greenhouse gases and carbon dioxide equivalent',
          'Why organisational carbon accounting exists and who uses the output',
          'The GHG Protocol and ISO 14064 in outline',
        ],
      },
      {
        title: 'Boundaries and scopes',
        points: [
          'Control and equity share approaches',
          'Scope 1 direct emissions, including fugitive and mobile sources',
          'Scope 2 purchased energy, location-based and market-based',
          'Scope 3 and the fifteen categories',
        ],
      },
      {
        title: 'From data to a number',
        points: [
          'Activity data: where it lives and why it is difficult to obtain',
          'Emission factor selection and documentation',
          'Data quality, gaps and estimation',
          'Common errors that make an inventory indefensible',
        ],
      },
      {
        title: 'From measurement to mitigation',
        points: [
          'Reading an inventory to find where emissions actually sit',
          'Reduction levers and how they are assessed',
          'Marginal abatement cost as a prioritisation tool',
          'Targets, pathways and the limited role of offsetting',
        ],
      },
    ],
    instructorSlugs: ['raymond-cheung'],
    corporateAvailable: true,
    relatedCourses: ['iso-14064-ghg-emission-awareness', 'life-cycle-assessment'],
    relatedSolutions: ['carbon-accounting', 'scope-1-2-3', 'decarbonisation'],
    faqs: [
      {
        question: 'Is this a technical course?',
        answer:
          'It is technical in content but does not assume a technical background. The objective is that participants can work with emissions data competently, not that they can build an inventory alone.',
      },
      {
        question: 'How does this differ from ESG Essentials?',
        answer:
          'ESG Essentials covers the full ESG landscape at a strategic level. This programme goes deeper on carbon specifically -- measurement method, data and reduction.',
      },
    ],
    seo: {
      title: 'Carbon Literacy Training Singapore',
      description:
        'Half-day carbon literacy training in Singapore. Boundaries, Scope 1, 2 and 3, emission factors and reduction levers for professionals working with carbon data.',
      primaryKeyword: 'carbon training Singapore',
      secondaryKeywords: ['carbon literacy course Singapore', 'GHG training Asia'],
    },
    status: 'published',
    registration: 'enquire',
  },
  {
    slug: 'iso-14064-ghg-emission-awareness',
    title: 'ISO 14064 Series GHG Emission Awareness',
    category: 'carbon-climate',
    outcome:
      'Understand what ISO 14064 requires and what preparing for verification involves.',
    summary:
      'A half-day awareness programme on the ISO 14064 series: quantification and reporting requirements, and the verification process they support.',
    description: [
      'The ISO 14064 series is the route most organisations take when greenhouse gas data needs to be independently verified. This programme explains what the standard requires and how it differs from corporate reporting under the GHG Protocol.',
      'It covers the structure of the series, the quantification and reporting requirements of ISO 14064-1, the documentation the standard expects, and what a verification body examines.',
      'It is an awareness programme. It gives participants a working understanding of the requirements and the verification process, rather than qualifying them to conduct verification.',
    ],
    duration: 'Half day',
    formats: ['In person', 'Virtual live', 'In-house'],
    location: 'Singapore',
    upcoming: [],
    whoShouldAttend: [
      'Sustainability and EHS teams preparing for GHG verification',
      'Quality and management system professionals adding GHG scope',
      'Organisations required by a customer or tender to hold verified emissions data',
      'Internal auditors extending coverage to greenhouse gas information',
    ],
    learningOutcomes: [
      'Describe the structure and purpose of the ISO 14064 series',
      'Explain the quantification and reporting requirements of ISO 14064-1',
      'Describe how the standard categorises direct and indirect emissions',
      'Identify the documentation and information management the standard requires',
      'Explain what a verification body examines and what a verification statement means',
      'Recognise the relationship between ISO 14064 and the GHG Protocol',
    ],
    modules: [
      {
        title: 'The ISO 14064 series',
        points: [
          'Parts 1, 2 and 3 and what each covers',
          'Why organisations pursue ISO 14064',
          'Relationship to the GHG Protocol and to other ISO standards',
        ],
      },
      {
        title: 'ISO 14064-1 requirements',
        points: [
          'Organisational and reporting boundaries',
          'Categorisation of direct and indirect emissions',
          'Quantification methodology and emission factors',
          'Uncertainty assessment',
        ],
      },
      {
        title: 'Documentation and information management',
        points: [
          'GHG information management procedures',
          'Records, traceability and internal controls',
          'Content requirements of the GHG report',
        ],
      },
      {
        title: 'Verification',
        points: [
          'The role of the verification body and why independence matters',
          'What is examined and how evidence is sampled',
          'Common findings and how organisations prepare for them',
        ],
      },
    ],
    instructorSlugs: ['raymond-cheung'],
    corporateAvailable: true,
    relatedCourses: ['carbon-literacy-for-professionals', 'life-cycle-assessment'],
    relatedSolutions: ['iso-14064', 'ghg-inventory', 'assurance-readiness'],
    faqs: [
      {
        question: 'Does this qualify me as a GHG verifier?',
        answer:
          'No. This is an awareness programme. Verifier competence is established through accredited verification body schemes, not through an awareness course.',
      },
      {
        question: 'Do we need ISO 14064 if we already follow the GHG Protocol?',
        answer:
          'Not necessarily. Organisations generally pursue ISO 14064 when a specific counterparty requires verified emissions data. The course covers how the two relate.',
      },
    ],
    seo: {
      title: 'ISO 14064 GHG Awareness Training Singapore',
      description:
        'Half-day ISO 14064 awareness training in Singapore. Quantification, reporting, documentation requirements and what greenhouse gas verification involves.',
      primaryKeyword: 'ISO 14064 training Singapore',
      secondaryKeywords: ['GHG awareness course Singapore', 'ISO 14064 course Asia'],
    },
    status: 'published',
    registration: 'enquire',
  },
  {
    slug: 'life-cycle-assessment',
    title: 'Life Cycle Assessment',
    category: 'carbon-climate',
    outcome:
      'Scope, interpret and commission a life cycle assessment that answers the question actually being asked.',
    summary:
      'A half-day programme on LCA methodology under ISO 14040 and ISO 14044: functional units, system boundaries, inventory analysis, impact assessment and interpretation.',
    description: [
      'Life cycle assessment answers product-level questions that corporate carbon accounting cannot. It is also easy to get wrong in ways that are not obvious until the result is challenged.',
      'This programme covers the four phases defined in ISO 14040 and ISO 14044, with particular attention to the two decisions that determine everything else: the functional unit and the system boundary.',
      'It is aimed at people who need to scope, commission or interpret an assessment rather than model one from scratch.',
    ],
    duration: 'Half day',
    formats: ['In person', 'Virtual live', 'In-house'],
    location: 'Singapore',
    upcoming: [],
    whoShouldAttend: [
      'Product, design and engineering teams evaluating material or process changes',
      'Sustainability professionals commissioning or reviewing LCA work',
      'Marketing and regulatory teams substantiating product environmental claims',
      'Procurement teams interpreting supplier LCA data',
    ],
    learningOutcomes: [
      'Describe the four phases of LCA under ISO 14040 and ISO 14044',
      'Define a functional unit and explain why it determines comparability',
      'Distinguish cradle-to-gate from cradle-to-grave boundaries and select appropriately',
      'Explain life cycle inventory data collection and the role of primary and secondary data',
      'Interpret impact assessment results and identify hotspots',
      'Recognise when a critical review is required',
    ],
    modules: [
      {
        title: 'Goal and scope definition',
        points: [
          'Establishing the question the assessment must answer',
          'The functional unit and reference flow',
          'System boundaries and cut-off criteria',
          'Allocation and its effect on results',
        ],
      },
      {
        title: 'Life cycle inventory',
        points: [
          'Data collection across the boundary',
          'Primary versus secondary data and database selection',
          'Data quality requirements',
        ],
      },
      {
        title: 'Impact assessment',
        points: [
          'Impact categories beyond global warming potential',
          'Characterisation, normalisation and weighting',
          'Reading and comparing results',
        ],
      },
      {
        title: 'Interpretation and use',
        points: [
          'Hotspot analysis and improvement options',
          'Sensitivity and uncertainty',
          'Comparative assertions and critical review requirements',
          'Communicating results without overstating them',
        ],
      },
    ],
    instructorSlugs: ['raymond-cheung'],
    corporateAvailable: true,
    relatedCourses: ['carbon-literacy-for-professionals', 'sustainable-procurement'],
    relatedSolutions: ['life-cycle-assessment', 'scope-1-2-3'],
    faqs: [
      {
        question: 'Will I be able to build an LCA model after this course?',
        answer:
          'A half-day programme develops the understanding needed to scope, commission and interpret an assessment. Building models independently requires software training and practice beyond this session.',
      },
      {
        question: 'Is specific LCA software covered?',
        answer:
          'The programme is methodology-focused rather than tool-specific, so that the principles apply whichever software is later used.',
      },
    ],
    seo: {
      title: 'Life Cycle Assessment Training Singapore',
      description:
        'Half-day life cycle assessment training in Singapore. Functional units, system boundaries, inventory and impact assessment under ISO 14040 and ISO 14044.',
      primaryKeyword: 'life cycle assessment training Singapore',
      secondaryKeywords: ['LCA course Singapore', 'ISO 14040 training Asia'],
    },
    status: 'published',
    registration: 'enquire',
  },
  {
    slug: 'green-finance-in-action',
    title: 'Green Finance in Action: From ESG Integration to Climate-Aligned Investing',
    category: 'sustainable-finance',
    outcome:
      'Apply ESG and climate considerations to investment and lending decisions using recognised methodology.',
    summary:
      'A half-day programme for finance professionals on ESG integration, green and sustainability-linked instruments, financed emissions and climate-aligned investing.',
    description: [
      'Sustainable finance has moved from a product category to a set of methodology questions that credit, investment and risk professionals are expected to answer.',
      'This programme covers how ESG factors are integrated into investment and credit analysis, how green and sustainability-linked instruments are structured, how financed emissions are measured, and what makes a sustainability performance target credible to a counterparty.',
      'It is built for practitioners rather than for a general audience, and assumes working familiarity with financial products.',
    ],
    duration: 'Half day',
    formats: ['In person', 'Virtual live', 'In-house'],
    location: 'Singapore',
    upcoming: [],
    whoShouldAttend: [
      'Credit, investment and portfolio professionals',
      'Relationship and origination teams in banking',
      'Risk professionals in financial institutions',
      'Corporate finance and treasury teams considering sustainable financing',
    ],
    learningOutcomes: [
      'Describe how ESG factors are integrated into credit and investment analysis',
      'Distinguish green, sustainability-linked and transition instruments by structure',
      'Explain what makes a sustainability performance target credible',
      'Describe financed emissions measurement and PCAF data quality scoring',
      'Identify physical and transition risk exposure in a portfolio',
      'Recognise greenwashing risk in financing structures and claims',
    ],
    modules: [
      {
        title: 'ESG integration in finance',
        points: [
          'Where ESG factors enter credit and investment analysis',
          'Data sources, ratings and their limitations',
          'Fiduciary and supervisory context',
        ],
      },
      {
        title: 'Instruments and structures',
        points: [
          'Green instruments and use of proceeds',
          'Sustainability-linked structures and performance targets',
          'Transition finance and credibility assessment',
          'External review and second party opinions',
        ],
      },
      {
        title: 'Financed emissions',
        points: [
          'Why financed emissions dominate a financial institution footprint',
          'PCAF methodology and attribution by asset class',
          'Data quality scoring and what it signals',
        ],
      },
      {
        title: 'Climate risk and portfolio alignment',
        points: [
          'Physical and transition risk in a lending or investment book',
          'Scenario analysis in outline',
          'Portfolio alignment and target setting',
          'Greenwashing exposure and how it arises',
        ],
      },
    ],
    instructorSlugs: ['chan-ee-chong'],
    corporateAvailable: true,
    relatedCourses: ['esg-risk-management', 'esg-essentials'],
    relatedSolutions: ['green-finance', 'financed-emissions', 'climate-risk'],
    faqs: [
      {
        question: 'Is prior ESG knowledge assumed?',
        answer:
          'Financial product familiarity is assumed; ESG knowledge is not. Participants without a finance background usually find ESG Essentials a better starting point.',
      },
    ],
    seo: {
      title: 'Green Finance Training Singapore',
      description:
        'Half-day green finance training in Singapore. ESG integration, sustainability-linked structures, financed emissions and climate-aligned investing.',
      primaryKeyword: 'green finance training Singapore',
      secondaryKeywords: ['sustainable finance course Singapore', 'ESG investing training Asia'],
    },
    status: 'published',
    registration: 'enquire',
  },
  {
    slug: 'esg-risk-management',
    title: 'ESG Risk Management Masterclass',
    category: 'risk-governance',
    outcome:
      'Integrate ESG and climate risk into the enterprise risk framework your organisation already operates.',
    summary:
      'A two-day masterclass on identifying, assessing and governing ESG and climate risk within existing enterprise risk management structures.',
    description: [
      'ESG risk is commonly managed in a register that sits outside the enterprise risk framework, which is why it rarely influences decisions. This masterclass addresses integration directly.',
      'Over two days it covers ESG and climate risk identification across physical, transition, regulatory, operational and reputational categories; assessment against likelihood, impact and time horizon; appetite and tolerance; controls; indicators; and board reporting.',
      'It is a working programme built around applied exercises rather than a lecture series, and participants work with their own risk taxonomy where possible.',
    ],
    duration: '2 days',
    formats: ['In person', 'In-house'],
    location: 'Singapore',
    upcoming: [],
    whoShouldAttend: [
      'Risk managers and heads of risk',
      'Compliance and internal audit professionals',
      'Sustainability leads working with the risk function',
      'Company secretaries and governance professionals',
      'Board members with risk committee responsibilities',
    ],
    learningOutcomes: [
      'Identify ESG and climate risks across physical, transition, regulatory, operational and reputational categories',
      'Integrate ESG risks into an existing enterprise risk taxonomy rather than a parallel register',
      'Assess risks against likelihood, impact and time horizon',
      'Define risk appetite and tolerance for ESG and climate exposures',
      'Assess control adequacy and identify gaps',
      'Design key risk indicators with meaningful thresholds',
      'Structure board and committee reporting on ESG risk',
    ],
    modules: [
      {
        title: 'Day one: identification and assessment',
        points: [
          'The ESG risk universe and how it maps to existing taxonomies',
          'Physical and transition risk in depth',
          'Regulatory, operational, supply chain and reputational exposure',
          'Time horizons and why standard risk horizons understate climate risk',
          'Assessment criteria and calibration',
          'Applied exercise: building an integrated risk register',
        ],
      },
      {
        title: 'Day two: governance, controls and reporting',
        points: [
          'Risk appetite and tolerance for ESG exposures',
          'Control design and adequacy assessment',
          'Key risk indicators and threshold setting',
          'Scenario consideration and when it is decision-useful',
          'Board and committee reporting',
          'The link between risk management and climate disclosure',
          'Applied exercise: risk appetite statement and board paper',
        ],
      },
    ],
    instructorSlugs: ['raymond-cheung'],
    corporateAvailable: true,
    relatedCourses: ['risk-intelligence-for-decision-makers', 'esg-essentials'],
    relatedSolutions: ['esg-risk-management', 'climate-risk', 'governance-controls'],
    faqs: [
      {
        question: 'Can we run this for our own risk team?',
        answer:
          'Yes, and it is frequently delivered that way. In-house delivery allows the applied exercises to use your own risk taxonomy and register, which materially improves what participants take away.',
      },
      {
        question: 'Do participants need a risk management background?',
        answer:
          'Familiarity with enterprise risk management concepts is assumed. Participants from sustainability functions without that background should attend with a risk colleague where possible.',
      },
    ],
    seo: {
      title: 'ESG Risk Management Masterclass Singapore',
      description:
        'Two-day ESG risk management masterclass in Singapore. Integrate ESG and climate risk into enterprise risk management, with appetite, controls and indicators.',
      primaryKeyword: 'ESG risk management training Singapore',
      secondaryKeywords: ['climate risk training Singapore', 'ESG risk course Asia'],
    },
    status: 'published',
    registration: 'enquire',
  },
  {
    slug: 'sustainable-procurement',
    title: 'Sustainable Procurement Masterclass',
    category: 'esg-sustainability',
    outcome:
      'Build sustainability requirements into procurement decisions so that they actually change supplier behaviour.',
    summary:
      'A one-day masterclass on embedding sustainability into procurement policy, supplier assessment, tender criteria and contract terms.',
    description: [
      'Sustainable procurement fails when it exists as a policy rather than as a criterion. This programme focuses on the mechanisms that make requirements binding: prequalification, evaluation weighting, contract clauses and performance review.',
      'It also covers the data problem. Procurement is where most organisations have to create the pathway for supplier emissions data, and where supplier due diligence obligations are discharged.',
      'The masterclass draws on ISO 20400 guidance and works through supplier segmentation, proportionate requirements and engagement approaches for suppliers with limited capability.',
    ],
    duration: '1 day',
    formats: ['In person', 'Virtual live', 'In-house'],
    location: 'Singapore',
    upcoming: [],
    whoShouldAttend: [
      'Procurement and category managers',
      'Supply chain and vendor management professionals',
      'Sustainability leads working on Scope 3 and supplier data',
      'Legal and contracts teams drafting supplier terms',
    ],
    learningOutcomes: [
      'Explain the scope of ISO 20400 guidance and how it is applied',
      'Segment a supply base by spend, risk and influence',
      'Set requirements proportionate to supplier size and capability',
      'Write sustainability criteria into prequalification and tender evaluation',
      'Draft contract terms that make requirements enforceable',
      'Design a supplier data collection approach, including emissions data',
      'Structure supplier engagement where capability is the constraint',
    ],
    modules: [
      {
        title: 'Foundations and analysis',
        points: [
          'ISO 20400 in outline',
          'Spend and supply base analysis',
          'Where environmental, social and governance risk concentrates',
          'Supplier segmentation',
        ],
      },
      {
        title: 'Building it into the process',
        points: [
          'Policy and supplier code of conduct',
          'Prequalification criteria',
          'Tender evaluation and weighting',
          'Contract clauses and enforceability',
        ],
      },
      {
        title: 'Supplier data and engagement',
        points: [
          'Collecting supplier emissions data through the procurement relationship',
          'Due diligence and assessment approaches',
          'Working with suppliers who cannot yet meet requirements',
          'Monitoring, escalation and performance review',
        ],
      },
    ],
    instructorSlugs: ['chan-ee-chong'],
    corporateAvailable: true,
    relatedCourses: ['life-cycle-assessment', 'esg-essentials'],
    relatedSolutions: ['sustainable-procurement', 'scope-1-2-3'],
    faqs: [
      {
        question: 'Is this relevant for services procurement?',
        answer:
          'Yes. The material issues differ -- labour practices, data governance and business conduct rather than product impact -- but the mechanisms are the same.',
      },
    ],
    seo: {
      title: 'Sustainable Procurement Training Singapore',
      description:
        'One-day sustainable procurement masterclass in Singapore. Supplier segmentation, tender criteria, contract terms and supply-chain data under ISO 20400.',
      primaryKeyword: 'sustainable procurement training Singapore',
      secondaryKeywords: ['ISO 20400 training Singapore', 'green procurement course Asia'],
    },
    status: 'published',
    registration: 'enquire',
  },
  {
    slug: 'esg-building-a-sustainable-brand-identity',
    title: 'ESG: Building a Sustainable Brand Identity',
    category: 'esg-sustainability',
    outcome:
      'Communicate sustainability performance credibly, without creating greenwashing exposure.',
    summary:
      'A one-day programme on substantiating and communicating sustainability claims, and on the governance that keeps public statements defensible.',
    description: [
      'Sustainability communication carries regulatory and commercial risk that marketing functions are not always structured to manage. Claims made without substantiation attract scrutiny from regulators, customers and competitors.',
      'This programme covers what makes a claim substantiated, how evidence is retained, which claim types attract the most challenge, and what approval process should sit behind public statements.',
      'It brings marketing, sustainability and legal perspectives together, which is usually where the gap sits.',
    ],
    duration: '1 day',
    formats: ['In person', 'Virtual live', 'In-house'],
    location: 'Singapore',
    upcoming: [],
    whoShouldAttend: [
      'Marketing and brand professionals',
      'Corporate communications and investor relations teams',
      'Sustainability leads supporting external communication',
      'Legal and compliance professionals reviewing sustainability claims',
    ],
    learningOutcomes: [
      'Identify which sustainability claims require substantiation and to what standard',
      'Distinguish defensible claims from claims that create exposure',
      'Explain the evidence required behind common claim types',
      'Recognise greenwashing patterns, including selective disclosure and unqualified terms',
      'Design an approval process for external sustainability statements',
      'Align communication with what the organisation can actually evidence',
    ],
    modules: [
      {
        title: 'Claims and their exposure',
        points: [
          'How sustainability claims are regulated and challenged',
          'Claim types and the evidence each requires',
          'Unqualified terms and why they attract scrutiny',
        ],
      },
      {
        title: 'Substantiation',
        points: [
          'What constitutes adequate evidence',
          'Product claims and the role of life cycle data',
          'Carbon neutrality and offset-based claims',
          'Evidence retention',
        ],
      },
      {
        title: 'Governance and communication',
        points: [
          'Approval routes for external statements',
          'Working across marketing, sustainability and legal',
          'Communicating progress honestly, including where targets are missed',
          'Building a brand position on what the organisation can evidence',
        ],
      },
    ],
    instructorSlugs: ['chan-ee-chong'],
    corporateAvailable: true,
    relatedCourses: ['esg-essentials', 'esg-risk-management'],
    relatedSolutions: ['esg-strategy', 'governance-controls'],
    faqs: [
      {
        question: 'Is this a marketing course?',
        answer:
          'It is built for marketing and communications professionals but covers substantiation and governance rather than campaign development. It is most effective when marketing and sustainability attend together.',
      },
    ],
    seo: {
      title: 'ESG Brand & Sustainability Communication Training Singapore',
      description:
        'One-day training on building a sustainable brand identity. Substantiating sustainability claims, avoiding greenwashing and governing external statements.',
      primaryKeyword: 'sustainability communication training Singapore',
      secondaryKeywords: ['greenwashing training Singapore', 'ESG brand course Asia'],
    },
    status: 'published',
    registration: 'enquire',
  },
  {
    slug: 'risk-intelligence-for-decision-makers',
    title: 'Risk Intelligence for Decision Makers: Aligning ERM with Business Strategy',
    category: 'risk-governance',
    outcome:
      'Use enterprise risk management as an input to strategy rather than a compliance exercise.',
    summary:
      'A one-day programme for senior decision makers on aligning enterprise risk management with business strategy and decision-making.',
    description: [
      'Enterprise risk management frequently produces a register that is reviewed periodically and influences little. This programme is about closing the gap between the risk process and the decisions the organisation actually makes.',
      'It covers risk appetite as a decision tool, how risk information should be structured for a board, the behavioural factors that distort risk judgement, and how emerging risks -- including climate and ESG exposures -- enter the framework.',
      'It is aimed at senior decision makers rather than risk practitioners.',
    ],
    duration: '1 day',
    formats: ['In person', 'In-house'],
    location: 'Singapore',
    upcoming: [],
    whoShouldAttend: [
      'Senior executives and functional heads',
      'Board members and risk committee members',
      'Heads of risk and strategy',
      'Finance leaders with risk oversight responsibilities',
    ],
    learningOutcomes: [
      'Explain how enterprise risk management should inform strategic decisions',
      'Define and apply risk appetite as a decision tool rather than a statement',
      'Assess whether risk information reaching the board is decision-useful',
      'Recognise behavioural and organisational factors that distort risk judgement',
      'Incorporate emerging risks, including climate and ESG, into the framework',
      'Identify where a risk framework has become a compliance exercise',
    ],
    modules: [
      {
        title: 'Risk and strategy',
        points: [
          'Why risk registers often fail to influence decisions',
          'Connecting risk assessment to strategic planning',
          'Risk-adjusted decision making',
        ],
      },
      {
        title: 'Appetite and tolerance',
        points: [
          'Defining appetite in operational terms',
          'Cascading appetite into delegated authority',
          'Testing whether appetite is actually applied',
        ],
      },
      {
        title: 'Judgement and information',
        points: [
          'Behavioural factors in risk assessment',
          'Structuring board risk information',
          'Emerging risk, including climate and ESG exposures',
          'Indicators that give early warning rather than confirmation',
        ],
      },
    ],
    instructorSlugs: ['raymond-cheung'],
    corporateAvailable: true,
    relatedCourses: ['esg-risk-management'],
    relatedSolutions: ['esg-risk-management', 'governance-controls'],
    faqs: [
      {
        question: 'How does this differ from the ESG Risk Management Masterclass?',
        answer:
          'This programme covers enterprise risk management and strategy broadly, for senior decision makers. The ESG Risk Management Masterclass is a deeper, practitioner-level programme focused specifically on ESG and climate risk.',
      },
    ],
    seo: {
      title: 'Risk Intelligence for Decision Makers Training Singapore',
      description:
        'One-day risk intelligence training in Singapore. Aligning enterprise risk management with business strategy, risk appetite and board decision-making.',
      primaryKeyword: 'enterprise risk management training Singapore',
      secondaryKeywords: ['ERM course Singapore', 'risk training for executives Asia'],
    },
    status: 'published',
    registration: 'enquire',
  },
  {
    slug: 'sustainable-export-practices-and-compliance',
    title: 'Sustainable Export Practices and Compliance for Thai Exporters',
    category: 'esg-sustainability',
    outcome:
      'Integrate sustainability, carbon management and CBAM compliance into your export strategy.',
    summary:
      'A practical programme for Thai exporters covering sustainable procurement, product carbon footprint, the EU Carbon Border Adjustment Mechanism, ESG supply chain requirements and social responsibility — with reference to Thai TGO initiatives.',
    description: [
      'International buyers, multinational supply chains and the European regulatory agenda are all placing sustainability and carbon-related requirements on Thai exporters. This programme gives exporters a working understanding of what those requirements are and what responding to them involves.',
      'The course covers sustainable procurement under ISO 20400, product carbon footprint and embedded emissions, the EU Carbon Border Adjustment Mechanism (CBAM) and its documentation requirements, ESG expectations from international customers, and the role of the Thailand Greenhouse Gas Management Organization (TGO).',
      'Participants leave with a Sustainable Export Action Plan that identifies the sustainability, carbon and supply chain priorities most relevant to their own business.',
    ],
    duration: '1 day',
    formats: ['In person', 'Virtual live', 'In-house'],
    location: 'Thailand',
    upcoming: [],
    whoShouldAttend: [
      'Thai exporters and manufacturers supplying international markets',
      'Export and international business managers',
      'SME owners and senior management',
      'Sustainability and ESG professionals',
      'Procurement and supply chain professionals',
      'Compliance and risk officers',
      'Finance and operations professionals involved in export activities',
      'Companies supplying multinational corporations and global supply chains',
    ],
    learningOutcomes: [
      'Understand the principles of ISO 20400 Sustainable Procurement and their relevance to international supply chains',
      'Explain the EU Carbon Border Adjustment Mechanism (CBAM) and its implications for Thai exporters',
      'Understand the importance of carbon footprint and embedded emissions data for export products',
      'Recognise the role of TGO and relevant Thai carbon footprint initiatives',
      'Identify key ESG and sustainability requirements from international customers and supply chains',
      'Apply relevant UN Sustainable Development Goals (SDGs) to export business activities',
      'Identify key social responsibility and ethical sourcing considerations in export operations',
      'Develop practical strategies to integrate sustainability, carbon management and compliance into export planning',
    ],
    modules: [
      {
        title: 'Module 1: Sustainability and the Changing Export Environment',
        points: [
          'Global sustainability trends affecting international trade',
          'ESG expectations from international markets',
          'Sustainability requirements in global supply chains',
          'Implications for Thai exporters',
        ],
      },
      {
        title: 'Module 2: ISO 20400 Sustainable Procurement',
        points: [
          'Principles of sustainable procurement',
          'Sustainable supplier selection and assessment',
          'Responsible sourcing and supply chain management',
        ],
      },
      {
        title: 'Module 3: Carbon Management and Product Carbon Footprint',
        points: [
          'Greenhouse gas emissions and carbon management',
          'Product Carbon Footprint',
          'Embedded emissions',
          'Carbon data collection and management',
          'Thai carbon footprint initiatives and TGO',
        ],
      },
      {
        title: 'Module 4: EU Carbon Border Adjustment Mechanism (CBAM)',
        points: [
          'CBAM overview and scope',
          'Implications for Thai exporters',
          'Embedded emissions and reporting requirements',
          'CBAM readiness and documentation',
        ],
      },
      {
        title: 'Module 5: Sustainable Supply Chains and International Customer Requirements',
        points: [
          'ESG requirements from international buyers',
          'Supplier sustainability assessments',
          'Traceability and supply chain transparency',
          'Sustainability information and documentation',
        ],
      },
      {
        title: 'Module 6: SDGs and Social Responsibility',
        points: [
          'SDGs and export business',
          'Labour and human rights considerations',
          'Ethical sourcing',
          'Responsible supplier management',
        ],
      },
      {
        title: 'Module 7: Integrating Sustainability into Export Strategy',
        points: [
          'ESG risk and opportunity identification',
          'Carbon reduction strategies',
          'Sustainable procurement',
          'Sustainability data and reporting',
          'Developing a sustainable export strategy',
        ],
      },
      {
        title: 'Module 8: Action Planning and Course Summary',
        points: [
          'Sustainability and export compliance checklist',
          'CBAM readiness',
          'Priority sustainability actions',
          'Sustainable Export Action Plan',
          'Q&A and discussion',
        ],
      },
    ],
    instructorSlugs: ['raymond-cheung'],
    certification: certificationTbc,
    corporateAvailable: true,
    relatedCourses: ['sustainable-procurement', 'carbon-literacy-for-professionals', 'esg-essentials'],
    relatedSolutions: ['sustainable-procurement', 'carbon-accounting', 'esg-strategy'],
    faqs: [
      {
        question: 'Is this course available in Thai?',
        answer:
          'Delivery language is confirmed at the time of booking. The course has been designed for Thai exporters and can be tailored to the specific sectors and markets most relevant to participants.',
      },
      {
        question: 'Do participants need prior sustainability or carbon knowledge?',
        answer:
          'No prior background is assumed. The programme is designed to build understanding from the ground up while remaining practical and export-focused throughout.',
      },
      {
        question: 'What does the Sustainable Export Action Plan involve?',
        answer:
          'Participants develop a plan identifying the key sustainability requirements, carbon-related considerations, supply chain priorities and practical actions relevant to their own company\'s export activities. It is a working output, not a case study.',
      },
    ],
    seo: {
      title: 'CBAM and Sustainable Export Compliance Training for Thai Exporters',
      description:
        'One-day training for Thai exporters on CBAM, sustainable procurement, product carbon footprint, ESG supply chain requirements and TGO carbon initiatives.',
      primaryKeyword: 'CBAM training Thailand',
      secondaryKeywords: ['sustainable export compliance Thailand', 'CBAM Thai exporters', 'ESG supply chain training Thailand'],
    },
    status: 'published',
    registration: 'enquire',
  },
];

export const courseBySlug = Object.fromEntries(courses.map((c) => [c.slug, c]));

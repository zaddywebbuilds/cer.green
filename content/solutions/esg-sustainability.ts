import type { Solution } from '@/types/content';

export const esgSolutions: Solution[] = [
  {
    slug: 'esg-strategy',
    title: 'ESG Strategy',
    category: 'esg-sustainability',
    heroStatement:
      'Decide what your organisation is actually going to do about ESG, and what it is not.',
    summary:
      'A defined ESG position built from material issues, business strategy and stakeholder requirements -- with governance, priorities and a delivery plan attached.',
    businessContext: [
      'Most ESG activity begins reactively. An investor questionnaire arrives, a customer sends a code of conduct, a listing rule changes, and each is answered on its own terms. Over time the organisation accumulates commitments it has never collectively reviewed.',
      'The result is an ESG position that exists only in the aggregate of past responses, which nobody owns, and which cannot be explained coherently to a board or a lender.',
      'A strategy resolves that by deciding, deliberately, which issues this business will manage, to what level, with what resources, and against what measures -- and by being explicit about what falls outside scope.',
    ],
    components: [
      'Current state review of existing commitments, disclosures and responses',
      'Materiality assessment to establish which issues genuinely matter',
      'Peer and sector benchmarking',
      'Stakeholder requirement mapping across investors, customers, regulators and employees',
      'Regulatory and reporting obligation mapping',
      'Strategic priority setting, aligned to business strategy',
      'Governance design -- board oversight, management ownership and committee structure',
      'Target and KPI definition',
      'Implementation roadmap with sequencing and resource requirements',
      'Internal and external communication approach',
    ],
    deliverables: [
      'ESG materiality assessment',
      'Stakeholder and obligation map',
      'ESG strategy document with defined priorities and scope',
      'Governance framework and accountability model',
      'Target and KPI set with baselines and measurement definitions',
      'Implementation roadmap with owners and timelines',
      'Board-level summary paper',
    ],
    audience: [
      'Boards and executive teams setting an ESG position for the first time',
      'Listed companies whose disclosures have outgrown their governance',
      'Companies preparing for investor or acquirer due diligence',
      'Organisations with ESG activity spread across functions and no owner',
    ],
    faqs: [
      {
        question: 'Where does ESG strategy start?',
        answer:
          'With materiality. Without an assessment of which issues matter to this business and its stakeholders, a strategy is a list of topics rather than a set of decisions.',
      },
      {
        question: 'Who should own ESG internally?',
        answer:
          'It varies by organisation, but it should be someone with authority over resources and a direct line to the board. ESG owned by a function with no budget and no mandate produces reporting rather than change.',
      },
      {
        question: 'How is this different from a sustainability report?',
        answer:
          'A report describes what happened. A strategy decides what will happen. Organisations that build the report first typically find they are describing activity rather than a position.',
      },
      {
        question: 'Do we need to commit to targets?',
        answer:
          'Targets you cannot deliver are worse than no targets. We work on what is achievable given your operations and capital position, and are explicit where the honest answer is that a target should wait until the data supports it.',
      },
    ],
    relatedSolutions: ['materiality-assessment', 'sustainability-reporting', 'esg-risk-management', 'esg-data-kpis'],
    relatedIndustries: ['financial-services', 'manufacturing-supply-chain'],
    expertSlugs: ['chan-ee-chong', 'raymond-cheung'],
    seo: {
      title: 'ESG Strategy Consultant Singapore',
      description:
        'ESG strategy for organisations in Singapore and Asia. Materiality, governance, targets and a delivery roadmap tied to business strategy, not a topic list.',
      primaryKeyword: 'ESG strategy Singapore',
      secondaryKeywords: ['ESG consultant Singapore', 'sustainability strategy Asia'],
    },
    status: 'published',
  },
  {
    slug: 'sustainability-reporting',
    title: 'Sustainability Reporting',
    category: 'esg-sustainability',
    heroStatement:
      'Produce a sustainability report that meets your obligations and survives scrutiny.',
    summary:
      'Reporting built on defined data, documented process and a clear view of which framework applies -- prepared so that assurance is achievable when it becomes required.',
    businessContext: [
      'Sustainability reporting in Singapore has moved onto a mandatory footing. All SGX-listed companies report Scope 1 and 2 greenhouse gas emissions from FY2025, with broader climate reporting requirements phased in for other groups on later timelines, and large non-listed companies brought in from 2030.',
      'Because those timelines have been revised more than once, the practical question for most organisations is not only what to report but when their particular obligation begins -- which depends on listing status, index membership, market capitalisation, revenue and assets.',
      'The harder problem is usually internal. Reporting requires data with definitions, owners and a control trail. Where that does not exist, the report becomes an annual reconstruction rather than an output of a process.',
    ],
    components: [
      'Applicability assessment -- which requirements apply to your entity and from when',
      'Framework selection and alignment, including ISSB-aligned climate disclosure',
      'Gap assessment against applicable disclosure requirements',
      'Data definition, ownership and collection process design',
      'Internal control and evidence trail design',
      'Disclosure drafting across governance, strategy, risk management, metrics and targets',
      'Climate-related risk and opportunity disclosure support',
      'Board and management review process',
      'Assurance readiness preparation',
      'Report production support',
    ],
    deliverables: [
      'Applicability and obligation assessment with timelines',
      'Gap assessment against applicable requirements',
      'Reporting data framework with definitions and owners',
      'Evidence and control trail documentation',
      'Drafted disclosures',
      'Assurance readiness assessment',
      'Reporting calendar and process documentation',
    ],
    frameworks: ['IFRS S2 / ISSB-aligned climate disclosure', 'GHG Protocol Corporate Standard'],
    audience: [
      'SGX-listed companies subject to phased climate reporting requirements',
      'Large non-listed companies preparing ahead of their reporting date',
      'Subsidiaries reporting into a group disclosure',
      'Organisations whose reporting process depends on one individual',
    ],
    faqs: [
      {
        question: 'When does mandatory climate reporting apply to us?',
        answer:
          'It depends on your listing status and size. SGX-listed companies report Scope 1 and 2 emissions from FY2025. Further ISSB-based requirements are phased by index membership and market capitalisation, and large non-listed companies meeting the revenue and asset thresholds begin later. Because ACRA and SGX RegCo have revised these timelines, we confirm the current position for your entity at the start of an engagement rather than working from a published summary.',
      },
      {
        question: 'Which framework should we report against?',
        answer:
          'For climate disclosure in Singapore the direction of travel is ISSB-aligned. Beyond climate, framework choice depends on who is asking -- investors, customers and regulators do not all want the same thing. We establish that before drafting.',
      },
      {
        question: 'When will we need assurance?',
        answer:
          'Limited assurance on Scope 1 and 2 data is being phased in, with deadlines that have been extended for some groups. The practical implication is that the data you report now should be built to withstand assurance later, because retrofitting an evidence trail is considerably harder.',
      },
      {
        question: 'Can you write the report for us?',
        answer:
          'We draft disclosures and support production, but the report is the organisation\'s statement and has to be owned internally. Where a report is written entirely externally it tends not to match what the business actually does.',
      },
      {
        question: 'What if our data is not good enough yet?',
        answer:
          'Then that is the finding, and it is better established before a filing deadline than after one. Data gaps are addressed through defined improvement actions and, where necessary, disclosed.',
      },
    ],
    relatedSolutions: ['esg-strategy', 'esg-data-kpis', 'assurance-readiness', 'carbon-accounting'],
    relatedIndustries: ['financial-services', 'manufacturing-supply-chain'],
    expertSlugs: ['raymond-cheung', 'chan-ee-chong'],
    seo: {
      title: 'Sustainability Reporting Consultant Singapore',
      description:
        'Sustainability and climate reporting support in Singapore. Obligation assessment, ISSB-aligned disclosure, data controls and assurance readiness.',
      primaryKeyword: 'sustainability reporting consultant Singapore',
      secondaryKeywords: ['ESG reporting Singapore', 'climate disclosure Singapore'],
    },
    status: 'published',
  },
  {
    slug: 'materiality-assessment',
    title: 'Materiality Assessment',
    category: 'esg-sustainability',
    heroStatement:
      'Establish which sustainability issues actually matter to your business, on evidence rather than assumption.',
    summary:
      'A structured assessment of sustainability issues against business impact and stakeholder significance, producing a prioritised set that strategy and reporting can be built on.',
    businessContext: [
      'Materiality is the decision that determines everything downstream. It sets what gets governed, what gets measured, what gets reported and what gets resourced.',
      'Done badly, it is a workshop that confirms what management already believed. Done properly, it tests those beliefs against stakeholder evidence, sector data and the organisation\'s actual exposure -- and it usually moves at least one issue that was not previously on the list.',
      'It also has a defensive function. When a regulator, investor or assurance provider asks why a topic was excluded from a report, the materiality assessment is the answer.',
    ],
    components: [
      'Issue universe development from sector standards, peers and regulation',
      'Internal stakeholder engagement across functions and leadership',
      'External stakeholder engagement with investors, customers and other relevant parties',
      'Assessment of business impact for each issue',
      'Assessment of stakeholder significance',
      'Where relevant, double materiality -- impact on the organisation and impact of the organisation',
      'Prioritisation and threshold setting',
      'Validation with management and the board',
      'Documentation of method and rationale',
    ],
    deliverables: [
      'Documented issue universe with sources',
      'Stakeholder engagement summary',
      'Materiality matrix or prioritised issue ranking',
      'Rationale for inclusion and exclusion of each issue',
      'Methodology documentation for reporting and assurance purposes',
      'Recommendations for governance and measurement of prioritised issues',
    ],
    audience: [
      'Organisations building an ESG strategy or first sustainability report',
      'Companies whose current material topics have not been reviewed in several years',
      'Boards asking which issues genuinely warrant attention',
      'Organisations preparing for assurance on their reporting',
    ],
    faqs: [
      {
        question: 'What is double materiality?',
        answer:
          'It assesses two directions: how sustainability issues affect the organisation financially, and how the organisation affects people and the environment. Some frameworks require both; others focus on financial materiality. Which applies depends on the regime you report under.',
      },
      {
        question: 'How often should materiality be reviewed?',
        answer:
          'Periodically, and whenever something changes materially -- an acquisition, a new market, a regulatory change, or a significant incident. An assessment several years old is difficult to defend as current.',
      },
      {
        question: 'Do we need to engage external stakeholders?',
        answer:
          'For a defensible assessment, yes. An internal-only exercise measures management perception. Where external engagement is genuinely constrained, that limitation should be disclosed rather than obscured.',
      },
    ],
    relatedSolutions: ['esg-strategy', 'sustainability-reporting', 'esg-risk-management'],
    relatedIndustries: ['financial-services'],
    expertSlugs: ['chan-ee-chong'],
    seo: {
      title: 'Materiality Assessment Singapore',
      description:
        'ESG materiality assessment in Singapore. Evidence-based prioritisation of sustainability issues, with documented method for reporting and assurance.',
      primaryKeyword: 'materiality assessment Singapore',
      secondaryKeywords: ['double materiality Singapore', 'ESG materiality Asia'],
    },
    status: 'published',
  },
  {
    slug: 'esg-risk-management',
    title: 'ESG Risk Management',
    category: 'esg-sustainability',
    heroStatement:
      'Bring ESG and climate risk into the risk framework the business already runs on.',
    summary:
      'Identification, assessment and integration of ESG and climate risks into enterprise risk management, with ownership, appetite and monitoring rather than a parallel register.',
    businessContext: [
      'ESG risk is frequently managed outside the enterprise risk framework, in a separate register maintained by a sustainability function. That arrangement rarely influences decisions, because the risks are not competing for attention alongside everything else the board considers.',
      'Integrating them changes the question from whether ESG risks exist to how they rank against operational, financial and strategic risks the organisation already manages.',
      'It also exposes where the organisation has no appetite statement, no owner and no control for exposures it has been disclosing publicly.',
    ],
    components: [
      'ESG and climate risk identification across physical, transition, regulatory, operational and reputational categories',
      'Integration into the existing enterprise risk management framework and taxonomy',
      'Risk assessment against defined likelihood and impact criteria',
      'Time-horizon analysis across short, medium and long term',
      'Risk appetite and tolerance definition',
      'Control assessment and gap identification',
      'Risk ownership assignment',
      'Key risk indicator design and monitoring',
      'Board and committee reporting design',
      'Scenario consideration where relevant to the organisation',
    ],
    deliverables: [
      'ESG and climate risk register integrated with the enterprise risk framework',
      'Risk assessment results by likelihood, impact and time horizon',
      'Control gap assessment',
      'Risk appetite statement covering ESG and climate exposures',
      'Key risk indicators with thresholds',
      'Governance and reporting structure',
      'Board risk paper',
    ],
    audience: [
      'Risk and compliance functions integrating ESG into enterprise risk management',
      'Financial institutions assessing climate risk in their own operations and portfolios',
      'Listed companies disclosing climate risk under reporting requirements',
      'Boards with disclosed risks that have no assigned owner',
    ],
    faqs: [
      {
        question: 'What is the difference between physical and transition risk?',
        answer:
          'Physical risk arises from climate impacts themselves -- acute events such as flooding, and chronic shifts such as heat or water stress. Transition risk arises from the response to climate change: policy, carbon pricing, technology shifts, market and reputational change.',
      },
      {
        question: 'Should ESG risk sit in a separate register?',
        answer:
          'Generally no. A separate register tends to be reviewed separately, and therefore not prioritised against the risks that drive decisions. Integration is what gives these risks standing.',
      },
      {
        question: 'Do we need climate scenario analysis?',
        answer:
          'It depends on your sector, size and reporting obligations, and it is more meaningful for some business models than others. We assess whether it would produce a decision-useful result for you before recommending it.',
      },
      {
        question: 'How does this relate to sustainability reporting?',
        answer:
          'Climate disclosure requires you to describe your risk management process. If that process does not exist, the disclosure has nothing to describe. Building the risk framework first makes the disclosure straightforward.',
      },
    ],
    relatedSolutions: ['esg-strategy', 'climate-risk', 'governance-controls', 'sustainability-reporting'],
    relatedIndustries: ['financial-services', 'manufacturing-supply-chain'],
    expertSlugs: ['raymond-cheung', 'chan-ee-chong'],
    seo: {
      title: 'ESG Risk Management Consultant Singapore',
      description:
        'ESG and climate risk management in Singapore. Integrate physical, transition and regulatory risk into enterprise risk management with owners and indicators.',
      primaryKeyword: 'ESG risk management Singapore',
      secondaryKeywords: ['climate risk management Singapore', 'ESG risk consultant Asia'],
    },
    status: 'published',
  },
  {
    slug: 'esg-data-kpis',
    title: 'ESG Data & KPIs',
    navTitle: 'ESG Data & KPIs',
    category: 'esg-sustainability',
    heroStatement:
      'Make ESG data something management can rely on, not something assembled once a year.',
    summary:
      'Metric definitions, data ownership, collection processes and controls that turn scattered ESG information into a reportable, auditable data set.',
    businessContext: [
      'ESG data typically originates in systems that were designed for other purposes. Headcount data serves payroll, energy data serves cost control, incident data serves operations. None was designed to produce a disclosure.',
      'The consequence is that every reporting cycle becomes a data-gathering project, definitions drift between years, and nobody can explain why a figure moved.',
      'Fixing it is a data governance exercise rather than a sustainability one: define each metric precisely, name an owner, identify the source system, specify the calculation, and put a check in place.',
    ],
    components: [
      'Metric inventory against reporting and stakeholder requirements',
      'Precise metric definitions, including boundary, units and calculation',
      'Source system mapping for each metric',
      'Data owner assignment',
      'Collection process and reporting calendar design',
      'Control and review design, including reasonableness checks',
      'Data quality assessment of current metrics',
      'Restatement and correction policy',
      'Tooling requirements assessment, where a spreadsheet is no longer sufficient',
      'Dashboard and management reporting design',
    ],
    deliverables: [
      'ESG metric catalogue with full definitions',
      'Data ownership matrix',
      'Source system map',
      'Collection process and reporting calendar',
      'Control framework with review points',
      'Data quality assessment of existing metrics',
      'Management dashboard specification',
    ],
    audience: [
      'Organisations whose reporting depends on a manual annual data exercise',
      'Companies preparing for assurance on ESG metrics',
      'Groups consolidating ESG data across entities or countries',
      'Sustainability functions without defined data ownership',
    ],
    faqs: [
      {
        question: 'Do we need an ESG data platform?',
        answer:
          'Not always, and buying one before definitions exist usually just relocates the problem. Software is worth considering once metrics are defined, owned and stable. We assess whether your volume and complexity justify it.',
      },
      {
        question: 'What makes a metric assurable?',
        answer:
          'A precise definition, a traceable source, a documented calculation, and evidence that a review took place. Assurance providers test the process as much as the number.',
      },
      {
        question: 'How do we handle restatements?',
        answer:
          'With a policy agreed in advance covering when a figure is restated, how the change is disclosed, and who approves it. Handling restatements case by case is what damages credibility.',
      },
    ],
    relatedSolutions: ['sustainability-reporting', 'assurance-readiness', 'esg-strategy'],
    relatedIndustries: ['financial-services', 'technology'],
    expertSlugs: ['chan-ee-chong'],
    seo: {
      title: 'ESG Data & KPI Consulting Singapore',
      description:
        'ESG data and KPI frameworks in Singapore. Metric definitions, data ownership, controls and reporting calendars that stand up to assurance.',
      primaryKeyword: 'ESG data management Singapore',
      secondaryKeywords: ['ESG KPI framework', 'ESG data governance Asia'],
    },
    status: 'published',
  },
  {
    slug: 'sustainable-procurement',
    title: 'Sustainable Procurement',
    category: 'esg-sustainability',
    heroStatement:
      'Build sustainability requirements into how you buy, not into a policy nobody applies.',
    summary:
      'Supplier requirements, assessment criteria and contract terms that make sustainability part of procurement decisions and give you the supply-chain data you are being asked for.',
    businessContext: [
      'Supply chains carry the majority of most organisations\' environmental impact and a significant share of their social and governance risk. They are also where the organisation has influence but not control.',
      'Procurement is the point where that influence is exercised. If sustainability requirements are not in the specification, the evaluation criteria and the contract, they are not in the relationship.',
      'This work also produces something increasingly needed elsewhere: supplier-level data. Organisations building Scope 3 inventories or responding to customer requirements find that the procurement process is where the data pathway has to be created.',
    ],
    components: [
      'Spend and supply base analysis to identify where impact and risk concentrate',
      'Supplier segmentation by risk, spend and influence',
      'Sustainable procurement policy development',
      'Supplier code of conduct',
      'Prequalification and tender criteria design',
      'Supplier assessment and due diligence process',
      'Contract clause development for sustainability requirements',
      'Supplier data collection approach, including emissions data',
      'Supplier engagement and capability building programme',
      'Monitoring, escalation and performance review process',
    ],
    deliverables: [
      'Spend and supply base risk analysis',
      'Sustainable procurement policy',
      'Supplier code of conduct',
      'Tender and evaluation criteria',
      'Supplier assessment questionnaire and scoring approach',
      'Model contract clauses',
      'Supplier engagement plan',
      'Monitoring and reporting framework',
    ],
    frameworks: ['ISO 20400'],
    audience: [
      'Organisations required to demonstrate supply-chain due diligence',
      'Manufacturers building Scope 3 purchased goods data',
      'Public sector and large private buyers with procurement policy obligations',
      'Companies whose customers impose supplier sustainability requirements',
    ],
    faqs: [
      {
        question: 'What is ISO 20400?',
        answer:
          'It is guidance on sustainable procurement -- how to integrate sustainability into procurement policy, strategy, process and supplier relationships. It is guidance rather than a certifiable requirements standard.',
      },
      {
        question: 'How do we get emissions data from suppliers?',
        answer:
          'Through the procurement relationship rather than a separate request. Requirements written into prequalification, tender criteria and contract terms produce responses; a questionnaire sent outside that process often does not.',
      },
      {
        question: 'What about suppliers who cannot meet the requirements?',
        answer:
          'Segmentation matters. Requirements proportionate to spend, risk and supplier capability produce compliance. Uniform requirements applied to every supplier produce non-responses and, sometimes, unnecessary supply risk.',
      },
      {
        question: 'Does this apply to services as well as goods?',
        answer:
          'Yes, though the material issues differ. For services the emphasis usually shifts from environmental impact toward labour practices, data governance and business conduct.',
      },
    ],
    relatedSolutions: ['scope-1-2-3', 'esg-risk-management', 'life-cycle-assessment'],
    relatedIndustries: ['manufacturing-supply-chain', 'public-sector'],
    expertSlugs: ['chan-ee-chong'],
    seo: {
      title: 'Sustainable Procurement Consultant Singapore',
      description:
        'Sustainable procurement advisory in Singapore. Supplier requirements, assessment criteria, contract terms and supply-chain data aligned to ISO 20400.',
      primaryKeyword: 'sustainable procurement Singapore',
      secondaryKeywords: ['ISO 20400 Singapore', 'supply chain sustainability Asia'],
    },
    status: 'published',
  },
];

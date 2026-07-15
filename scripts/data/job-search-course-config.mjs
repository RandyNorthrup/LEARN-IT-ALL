import { finalizeCourse, project, skill } from './course-config-helpers.mjs';

const REVIEWED_AT = '2026-07-15';
const RESEARCHED_AT = '2026-07-16T00:40:00.000Z';

function outcome([id, statement, misconception, knowledgeType = 'procedural', level = 'apply']) {
  if (!misconception) throw new Error(`Missing job-search misconception for career-${id}`);
  return skill(`career-${id}`, statement, misconception, knowledgeType, level);
}

function careerModule(id, title, context, artifact, specifications) {
  const skills = specifications.map(outcome);
  return {
    id: `career-${id}`,
    title,
    context,
    artifact,
    objectives: skills.slice(0, 3).map((entry) => entry[1]),
    skills,
    contexts: {
      theory: `${context} Predict the hiring decision, evidence quality, affected people, uncertainty, and ethical boundary before reviewing a model.`,
      workshop: `A guided career studio extends ${artifact} while retaining truthful evidence, accessibility, privacy, security, consent, and learner agency.`,
      debug: `A realistic ${title.toLowerCase()} artifact contains one plausible targeting, evidence, integrity, access, privacy, process, or decision defect. Locate the first unsupported claim before revising it.`,
      lab: `A different candidate, role family, location, access need, employment history, constraint, and hiring process requires an independent transfer of ${title.toLowerCase()} into a changed ${artifact}.`,
      review: `A delayed hiring review reconstructs ${title.toLowerCase()} from target, claim, evidence, audience, action, observation, changed case, rejected failure, repair, consent, owner, and next-decision evidence.`,
      quiz: `A hiring panel compares near-miss decisions for ${title.toLowerCase()} and accepts only role-relevant, truthful, accessible, privacy-preserving, and independently defensible evidence.`,
    },
  };
}

const sources = [
  {
    title: 'NACE Career Readiness Competencies',
    authority: 'curriculum-framework',
    url: 'https://www.naceweb.org/career-readiness/competencies/career-readiness-defined/',
    version: 'Current eight-competency framework reviewed 2026-07-15',
    scope:
      'Controls observable evidence for career and self-development, communication, critical thinking, equity and inclusion, leadership, professionalism, teamwork, and technology.',
  },
  {
    title: 'NACE 2025 Career Readiness Quick Poll',
    authority: 'curriculum-framework',
    url: 'https://www.naceweb.org/career-readiness/competencies/nace-quick-poll-more-than-83-percent-of-respondents-implementing-career-readiness-competencies',
    version: 'Published 2025-09-30; reviewed 2026-07-15',
    scope:
      'Provides bounded contemporary context for skills-based graduate hiring and institutional competency integration without turning a survey into a universal employer claim.',
  },
  {
    title: 'BLS Occupational Outlook Handbook for Software Development and Quality Assurance',
    authority: 'official-docs',
    url: 'https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm',
    version: '2024 data and 2024-2034 projections; page modified 2025-08-28',
    scope:
      'Controls U.S.-specific occupation duties, collaboration expectations, important qualities, education norms, wage interpretation, and projection caveats.',
  },
  {
    title: 'O*NET Software Developers Occupation Report',
    authority: 'official-docs',
    url: 'https://www.onetonline.org/link/summary/15-1252.00',
    version: 'O*NET current occupation data reviewed 2026-07-15',
    scope:
      'Controls task, work-activity, skill, knowledge, work-style, and technology evidence used to decompose roles rather than chase job-title labels.',
  },
  {
    title: 'O*NET Employer-Based In-Demand Software Skills',
    authority: 'official-docs',
    url: 'https://www.onetonline.org/link/demand/15-1252.00',
    version: 'U.S. postings from 2025; reviewed 2026-07-15',
    scope:
      'Supports time- and location-bounded technology demand comparisons while prohibiting claims that posting frequency equals job importance or learner fit.',
  },
  {
    title: 'CareerOneStop Job Search',
    authority: 'official-docs',
    url: 'https://www.careeronestop.org/JobSearch/job-search.aspx',
    version: 'U.S. Department of Labor sponsored guidance reviewed 2026-07-15',
    scope:
      'Controls the connected search flow across planning, employer research, networking, applications, portfolios, interviews, background checks, and negotiation.',
  },
  {
    title: 'CareerOneStop Salary Finder',
    authority: 'official-docs',
    url: 'https://www.careeronestop.org/Toolkit/Wages/find-salary.aspx',
    version: 'May 2024 OEWS estimates; reviewed 2026-07-15',
    scope:
      'Controls location- and occupation-specific compensation research while requiring total-package, source-date, sample, and local-law caveats.',
  },
  {
    title: 'GitHub Profile Documentation',
    authority: 'official-docs',
    url: 'https://docs.github.com/en/account-and-profile/concepts/personal-profile',
    version: 'GitHub Docs current 2026-07-15',
    scope:
      'Controls profile visibility, optional public identity, pinned work, contribution context, and the personal safety consequences of public disclosure.',
  },
  {
    title: 'GitHub Resume and Project Presentation Tutorial',
    authority: 'official-docs',
    url: 'https://docs.github.com/en/account-and-profile/tutorials/using-your-github-profile-to-enhance-your-resume',
    version: 'GitHub Docs current 2026-07-15',
    scope:
      'Controls selective project presentation, useful repository descriptions, setup, demonstration, tests, dependency currency, and truthful links from application evidence.',
  },
  {
    title: 'GitHub Healthy Contributions Guidance',
    authority: 'official-docs',
    url: 'https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions',
    version: 'GitHub Docs current 2026-07-15',
    scope:
      'Controls README, contribution, conduct, license, support, governance, issue-template, and stewardship signals without equating activity volume with quality.',
  },
  {
    title: 'EEOC Disability Discrimination and Employment Decisions',
    authority: 'official-docs',
    url: 'https://www.eeoc.gov/disability-discrimination-and-employment-decisions',
    version: 'U.S. federal guidance reviewed 2026-07-15',
    scope:
      'Controls U.S.-specific applicant accommodation, confidentiality, pre-offer inquiry, and employment-decision boundaries while requiring local qualified guidance elsewhere.',
  },
  {
    title: 'EEOC Employment Discrimination and AI for Workers',
    authority: 'official-docs',
    url: 'https://www.eeoc.gov/sites/default/files/2024-04/20240429_Employment%20Discrimination%20and%20AI%20for%20Workers.pdf',
    version: 'Worker resource published 2024; reviewed 2026-07-15',
    scope:
      'Controls awareness that automated recruiting, screening, assessment, promotion, and pay tools can implicate protected rights and accommodation needs.',
  },
  {
    title: 'FTC Job Scam Consumer Alert',
    authority: 'official-docs',
    url: 'https://consumer.ftc.gov/consumer-alerts/2025/07/job-scammers-are-looking-hire-you',
    version: 'Published 2025-07-10; reviewed 2026-07-15',
    scope:
      'Controls recruiter identity verification, premature sensitive-data requests, payment and equipment-check fraud, urgency signals, and independent employer-channel confirmation.',
  },
  {
    title: 'ACM Code of Ethics and Professional Conduct',
    authority: 'standard',
    url: 'https://www.acm.org/code-of-ethics',
    version: 'ACM Code 2018 current',
    scope:
      'Controls honesty about contribution and competence, privacy, confidentiality, fairness, harm avoidance, professional review, and accountability throughout a search.',
  },
  {
    title: 'Web Content Accessibility Guidelines',
    authority: 'standard',
    url: 'https://www.w3.org/TR/WCAG22/',
    version: 'WCAG 2.2 Recommendation; ISO IEC 40500:2025',
    scope:
      'Controls accessible portfolio and application artifacts while distinguishing automated checks from knowledgeable human and assistive-technology evaluation.',
  },
].map((source) => ({ ...source, reviewedAt: REVIEWED_AT }));

const modules = [
  careerModule(
    'agency-constraints',
    'Career Agency, Success Criteria, and Search Constraints',
    'A graduate is told to apply everywhere immediately, but has not defined acceptable work, financial runway, access needs, location, schedule, authorization, values, safety, or a stop rule.',
    'learner-owned career decision charter',
    [
      [
        'success-definition',
        'Define a personally meaningful career outcome with observable success, guardrails, tradeoffs, and a review date.',
        'A successful search has one universal outcome: the highest available salary.',
        'metacognitive',
        'create',
      ],
      [
        'constraint-inventory',
        'Separate hard constraints, flexible preferences, assumptions, unknowns, and resources without disclosing private reasons unnecessarily.',
        'Every personal constraint must be explained to an employer to be respected.',
        'strategic',
        'analyze',
      ],
      [
        'search-runway',
        'Model time, money, energy, care, health, and learning capacity under conservative search scenarios and escalation thresholds.',
        'More applications always compensate for an unsustainable search pace.',
        'strategic',
        'evaluate',
      ],
      [
        'work-boundaries',
        'State ethical, safety, accessibility, privacy, employment-type, travel, location, and schedule boundaries before opportunity pressure appears.',
        'Boundaries can be decided after accepting an offer.',
        'professional',
        'evaluate',
      ],
      [
        'agency-review-loop',
        'Create a learner-controlled review cadence that adapts tactics from evidence without treating rejection as identity evidence.',
        'Any rejection proves the candidate chose the wrong career.',
        'metacognitive',
        'create',
      ],
    ]
  ),
  careerModule(
    'competency-evidence',
    'Competency Inventory and Independent Evidence Ledger',
    'A candidate lists technologies and course completions, yet cannot show the behavior, changed case, personal contribution, limitation, or current reproducibility behind any claim.',
    'competency-to-evidence ledger',
    [
      [
        'competency-behavior',
        'Translate course, work, community, care, creative, and self-directed experience into observable role-relevant behaviors.',
        'Only paid employment produces valid professional evidence.',
        'metacognitive',
        'analyze',
      ],
      [
        'evidence-strength',
        'Rank claim evidence by authenticity, recency, independence, changed-case performance, stakeholder relevance, and inspectability.',
        'A polished final artifact proves every skill used to create it.',
        'strategic',
        'evaluate',
      ],
      [
        'contribution-boundary',
        'Distinguish personal decisions and work from collaboration, templates, tutorials, automation, generative assistance, and reviewer input.',
        'Disclosure weakens strong work and should be avoided.',
        'professional',
        'evaluate',
      ],
      [
        'transfer-story',
        'Connect one demonstrated behavior to a changed role context without claiming unobserved expertise.',
        'Using the same tool name makes two work contexts equivalent.',
        'conceptual',
        'analyze',
      ],
      [
        'evidence-refresh',
        'Reproduce fragile or stale evidence under a changed requirement and record exact pass, failure, repair, and remaining limit.',
        'Old screenshots remain current evidence if the repository still exists.',
        'procedural',
        'create',
      ],
    ]
  ),
  careerModule(
    'labor-market',
    'Labor-Market Research, Role Families, and Data Limits',
    'A candidate follows viral title and salary lists that mix countries, seniority, occupations, posting windows, and unsupported predictions.',
    'dated labor-market evidence brief',
    [
      [
        'occupation-vs-title',
        'Distinguish occupations, job titles, functions, industries, products, seniority, and employment arrangements when mapping possible work.',
        'The same title names the same work at every organization.',
        'conceptual',
        'analyze',
      ],
      [
        'source-provenance',
        'Record source owner, geography, population, collection period, update date, method, and missing groups before using labor data.',
        'A current webpage necessarily contains current data.',
        'strategic',
        'evaluate',
      ],
      [
        'posting-demand',
        'Interpret posting-frequency signals as bounded demand evidence rather than required-skill, hiring-probability, or future-certainty claims.',
        'The most-mentioned technology is mandatory for every candidate.',
        'strategic',
        'evaluate',
      ],
      [
        'wage-interpretation',
        'Compare occupation and location wage distributions while accounting for level, total compensation, hours, contract status, and data lag.',
        'A national median is an appropriate expected offer for one learner.',
        'strategic',
        'analyze',
      ],
      [
        'role-hypothesis',
        'Select a small, testable role-family hypothesis from personal constraints, evidence adjacency, real tasks, and market signals.',
        'Keeping every possible role open always increases opportunity.',
        'strategic',
        'create',
      ],
    ]
  ),
  careerModule(
    'role-decomposition',
    'Job Description Decomposition and Evidence Mapping',
    'A listing combines recruiter language, team outcomes, essential work, preferences, copied requirements, benefits, legal text, and ambiguous signals.',
    'role requirement and evidence matrix',
    [
      [
        'outcome-extraction',
        'Extract the problems, users, decisions, deliverables, collaboration, quality, and operating outcomes beneath requirement wording.',
        'Matching nouns matters more than understanding expected work.',
        'strategic',
        'analyze',
      ],
      [
        'requirement-classification',
        'Classify stated requirements as essential evidence, likely preference, negotiable proxy, process constraint, or unresolved question.',
        'Every bullet is an equally rigid screening threshold.',
        'strategic',
        'evaluate',
      ],
      [
        'evidence-mapping',
        'Map each priority outcome to direct, adjacent, transferable, missing, or contradictory candidate evidence.',
        'A skill either matches perfectly or does not count.',
        'procedural',
        'analyze',
      ],
      [
        'signal-caution',
        'Separate observable opportunity evidence from speculative culture, prestige, tone, badge, and keyword interpretations.',
        'An enthusiastic job post reliably predicts daily working conditions.',
        'metacognitive',
        'evaluate',
      ],
      [
        'go-no-go',
        'Make and document a bounded apply, investigate, defer, or decline decision from fit, cost, risk, evidence, and learner priorities.',
        'Applying has no cost, so every listing deserves a submission.',
        'strategic',
        'evaluate',
      ],
    ]
  ),
  careerModule(
    'gap-plan',
    'Gap Closure, Deliberate Practice, and Honest Positioning',
    'The role matrix exposes a few high-value gaps, but the candidate starts another broad course instead of testing whether each gap blocks real work.',
    'time-boxed role-readiness experiment plan',
    [
      [
        'gap-priority',
        'Prioritize gaps by role frequency, task centrality, transfer distance, evidence weakness, learning cost, and application timing.',
        'Every missing keyword needs a new credential before applying.',
        'strategic',
        'evaluate',
      ],
      [
        'smallest-evidence-task',
        'Design the smallest authentic task that can reveal or improve one missing behavior under a changed case.',
        'Watching an explanation is enough to close a performance gap.',
        'procedural',
        'create',
      ],
      [
        'learning-stop-rule',
        'Precommit a time, evidence, and opportunity-cost stop rule for readiness work.',
        'Preparation should continue until the candidate feels no uncertainty.',
        'metacognitive',
        'evaluate',
      ],
      [
        'adjacent-positioning',
        'Describe adjacent experience and an active learning boundary truthfully without apologizing or inflating competence.',
        'Candidates must either claim mastery or highlight deficiency.',
        'professional',
        'create',
      ],
      [
        'apply-learn-loop',
        'Interleave bounded applications, feedback signals, retrieval, projects, and plan revision without training on random rejection noise.',
        'All application outcomes identify the exact skill gap to fix.',
        'metacognitive',
        'create',
      ],
    ]
  ),
  careerModule(
    'public-identity',
    'Public Identity, Privacy, Security, and Reputation Boundaries',
    'A learner is told to make everything public, revealing contact details, location patterns, secrets, client material, protected identity, private history, and unsafe availability.',
    'public-identity threat and disclosure model',
    [
      [
        'audience-purpose',
        'Choose a public, selective, private, or live-only evidence channel from audience need, learner safety, and claim purpose.',
        'Serious candidates must maintain a maximally public personal brand.',
        'strategic',
        'evaluate',
      ],
      [
        'data-inventory',
        'Inventory personal, third-party, employer, client, research, secret, metadata, and inferred information before publication.',
        'Deleting visible text removes all sensitive history and metadata.',
        'procedural',
        'analyze',
      ],
      [
        'threat-model',
        'Model impersonation, harassment, discrimination, credential theft, doxxing, scraping, and relationship harm for the learner context.',
        'Professional material has no personal safety threat surface.',
        'strategic',
        'evaluate',
      ],
      [
        'identity-separation',
        'Configure appropriate names, emails, account recovery, commit identity, domains, and contact channels with explicit tradeoffs.',
        'One identity and one inbox are always simpler and safer.',
        'procedural',
        'create',
      ],
      [
        'publication-review',
        'Run content, history, secret, link, permission, accessibility, and changed-audience checks before and after publication.',
        'A repository set private after exposure restores confidentiality.',
        'procedural',
        'create',
      ],
    ]
  ),
  careerModule(
    'github-proof',
    'GitHub Profile, Repository Health, and Verifiable Work',
    'A profile has a dense contribution graph and many forked tutorials, but reviewers cannot find three relevant, runnable, maintained, or honestly attributed examples.',
    'selective GitHub evidence route',
    [
      [
        'project-selection',
        'Select a small set of projects by target-role relevance, independent contribution, evidence strength, recency, and safe disclosure.',
        'More pinned repositories always create a stronger profile.',
        'strategic',
        'evaluate',
      ],
      [
        'profile-route',
        'Write a concise profile route that helps a reviewer reach role, proof, boundaries, contact choice, and accessible alternatives.',
        'A profile README should repeat a complete chronological resume.',
        'professional',
        'create',
      ],
      [
        'repository-entry',
        'Create a fast repository entry path through purpose, users, status, demonstration, setup, test, architecture, and limitation evidence.',
        'A screenshot and technology badge explain a project sufficiently.',
        'procedural',
        'create',
      ],
      [
        'repository-health',
        'Show license, contribution, conduct, support, security, issue, dependency, release, and ownership signals appropriate to the project.',
        'Repository community files are decorative for solo work.',
        'professional',
        'evaluate',
      ],
      [
        'reproducible-proof',
        'Verify one clean setup, core behavior, changed case, failure, and current dependency or environment boundary from the public route.',
        'A passing historical workflow badge proves the project works now.',
        'procedural',
        'create',
      ],
    ]
  ),
  careerModule(
    'case-studies',
    'Portfolio Case Studies and Technical Decision Narratives',
    'A project page celebrates features and tools but omits the user need, personal decisions, alternatives, failures, verification, accessibility, security, impact limits, and maintenance state.',
    'evidence-linked project case-study set',
    [
      [
        'problem-context',
        'Explain the affected people, decision, evidence, constraints, prior alternative, and personal authority without inventing user research.',
        'A compelling case study needs a dramatic origin story even if none occurred.',
        'professional',
        'create',
      ],
      [
        'decision-trace',
        'Present important alternatives, tradeoffs, revision triggers, and the learner-owned technical decisions rather than a tool inventory.',
        'Naming a modern stack demonstrates architectural judgment.',
        'strategic',
        'create',
      ],
      [
        'failure-learning',
        'Show a reproduced failure, competing hypotheses, causal repair, regression evidence, and what the repair did not prove.',
        'Portfolio material should hide failed approaches to appear competent.',
        'metacognitive',
        'create',
      ],
      [
        'quality-evidence',
        'Connect accessibility, security, privacy, testing, operations, and recovery claims to exact automated and human evidence.',
        'One automated score can establish broad quality conformance.',
        'professional',
        'evaluate',
      ],
      [
        'case-study-access',
        'Provide keyboard-operable, reflowing, structured, concise, low-motion, text-equivalent case evidence with a usable offline alternative.',
        'Portfolio accessibility matters only for design roles.',
        'procedural',
        'create',
      ],
    ]
  ),
  careerModule(
    'resume',
    'Resume Architecture, Evidence Statements, and Machine-Robust Delivery',
    'A resume uses decorative columns, keyword blocks, vague adjectives, unsupported impact numbers, and identical content for every role.',
    'truthful role-targeted resume system',
    [
      [
        'resume-priority',
        'Prioritize the candidate value proposition and strongest role-relevant evidence for a rapid human review.',
        'A resume must preserve the full chronology with equal detail.',
        'strategic',
        'create',
      ],
      [
        'evidence-bullet',
        'Write concise action, context, decision, behavior, result, and evidence statements without false causality or invented metrics.',
        'Every bullet needs a large percentage to sound credible.',
        'professional',
        'create',
      ],
      [
        'experience-translation',
        'Translate projects, education, open source, community work, care, career change, and employment into relevant evidence without hiding provenance.',
        'Unpaid or nontraditional experience belongs nowhere on a technical resume.',
        'professional',
        'analyze',
      ],
      [
        'machine-robust',
        'Produce readable semantic source, plain-text, and appropriately generated PDF variants that survive selection, extraction, links, zoom, and reflow checks.',
        'Passing an automated resume scanner guarantees human usability.',
        'procedural',
        'create',
      ],
      [
        'resume-verification',
        'Cross-check every date, role, claim, skill, link, file name, page break, contact route, privacy choice, and changed rendering.',
        'Small inconsistencies are harmless because reviewers infer intent.',
        'procedural',
        'evaluate',
      ],
    ]
  ),
  careerModule(
    'application-package',
    'Tailored Applications, Work Samples, and References',
    'A candidate replaces terms mechanically, writes a generic cover letter, uploads arbitrary work, and shares reference contact details without permission.',
    'auditable role-specific application packet',
    [
      [
        'tailoring-map',
        'Select and reorder truthful evidence from the role matrix without keyword stuffing or mirroring unsupported requirements.',
        'Tailoring means copying every phrase from the listing.',
        'strategic',
        'create',
      ],
      [
        'cover-message',
        'Write a concise evidence bridge between the organization problem, relevant contribution, specific proof, and next conversation.',
        'A cover letter should retell the resume in paragraph form.',
        'professional',
        'create',
      ],
      [
        'work-sample-choice',
        'Choose or create a bounded work sample that demonstrates the prioritized behavior without exposing protected material or doing unpaid production work.',
        'Any requested take-home task is safe and proportionate.',
        'strategic',
        'evaluate',
      ],
      [
        'reference-consent',
        'Request informed reference consent, provide role context, honor contact preferences, and protect reference information.',
        'Listing a person as a reference is acceptable if they once supervised the candidate.',
        'professional',
        'create',
      ],
      [
        'submission-proof',
        'Verify instructions, truthful consistency, file accessibility, links, permissions, privacy, final rendering, receipt, and retained revision.',
        'The application portal confirmation proves every uploaded file was correct.',
        'procedural',
        'evaluate',
      ],
    ]
  ),
  careerModule(
    'search-system',
    'Job Search Operating System, Experiments, and Sustainable Throughput',
    'A candidate relies on browser tabs and memory, duplicates work, misses follow-ups, exposes sensitive notes, and changes tactics after every outcome.',
    'privacy-preserving search decision system',
    [
      [
        'pipeline-state',
        'Model discovery, research, decision, preparation, submission, follow-up, interview, offer, close, and archive states with next actions.',
        'A list of submitted applications is a complete search system.',
        'procedural',
        'create',
      ],
      [
        'minimum-data',
        'Store only decision-necessary opportunity, contact, consent, artifact revision, deadline, outcome, and learning data with retention rules.',
        'Collecting every detail improves future analysis.',
        'strategic',
        'evaluate',
      ],
      [
        'cadence-capacity',
        'Set a sustainable weekly mix of sourcing, evidence improvement, relationships, applications, practice, recovery, and review.',
        'Application count is the best measure of search quality.',
        'metacognitive',
        'create',
      ],
      [
        'experiment-design',
        'Change one bounded tactic, define an observable intermediate signal, and review enough comparable cases before inference.',
        'Any response-rate change proves the latest tactic caused it.',
        'strategic',
        'evaluate',
      ],
      [
        'failure-recovery',
        'Detect missed dates, stale listings, broken links, duplicate submissions, lost access, and overload with explicit repair and graceful stop paths.',
        'Search systems need no recovery because the data is temporary.',
        'procedural',
        'create',
      ],
    ]
  ),
  careerModule(
    'opportunity-trust',
    'Employer Research, Opportunity Quality, and Scam Defense',
    'An urgent remote offer uses a recognizable logo, personal email, text interview, early identity request, equipment check, and no independently verifiable team.',
    'opportunity trust and risk dossier',
    [
      [
        'identity-verification',
        'Verify employer, domain, recruiter, role, process, and contact through independent official channels before sharing sensitive data or money.',
        'A familiar company logo and polished document prove recruiter identity.',
        'procedural',
        'evaluate',
      ],
      [
        'scam-patterns',
        'Recognize urgency, premature offers, payment, check, reshipping, credential, identity, task, impersonation, and off-platform pressure patterns.',
        'A scam is obvious because its writing is always poor.',
        'conceptual',
        'analyze',
      ],
      [
        'organization-evidence',
        'Compare official records, products, customers, funding or revenue claims, leadership, security, labor, news, employee, and counterevidence with source limits.',
        'One review site represents the whole organization.',
        'strategic',
        'evaluate',
      ],
      [
        'role-quality-questions',
        'Investigate management, onboarding, team work, accessibility, inclusion, security, on-call, workload, turnover, measurement, and growth through behavior questions.',
        'Culture labels provide stronger evidence than concrete recent examples.',
        'professional',
        'create',
      ],
      [
        'risk-response',
        'Pause, preserve non-sensitive evidence, verify, refuse, report through appropriate channels, secure affected accounts, and document uncertainty after suspicious contact.',
        'Continuing the conversation is necessary to prove fraud.',
        'procedural',
        'create',
      ],
    ]
  ),
  careerModule(
    'relationships',
    'Professional Relationships, Community Participation, and Consent',
    'A learner treats networking as mass cold requests for referrals, extracts attention, ignores community norms, and measures people only by hiring power.',
    'reciprocal relationship practice plan',
    [
      [
        'network-map',
        'Map existing reciprocal relationships across work, study, community, identity-safe spaces, events, and weak ties without ranking human worth.',
        'People without industry contacts have no professional network.',
        'metacognitive',
        'analyze',
      ],
      [
        'specific-request',
        'Make a bounded, easy-to-decline request for information, feedback, introduction, or context with purpose and time expectations.',
        'Asking directly for a job is the most efficient first contact.',
        'professional',
        'create',
      ],
      [
        'contribution-first',
        'Contribute relevant help, documentation, testing, facilitation, learning notes, or community work within actual competence and norms.',
        'Networking value requires free technical labor.',
        'professional',
        'create',
      ],
      [
        'follow-up-consent',
        'Record promised action, consented channel, timing, privacy boundary, thanks, and a respectful stop rule.',
        'Persistent follow-up proves motivation.',
        'professional',
        'evaluate',
      ],
      [
        'relationship-integrity',
        'Refuse deceptive familiarity, hidden automation, testimonial fabrication, referral pressure, or contact harvesting.',
        'Automating personalized outreach is harmless if response rates improve.',
        'professional',
        'evaluate',
      ],
    ]
  ),
  careerModule(
    'informational-interviews',
    'Informational Interviews and Reality Testing',
    'A candidate schedules a conversation to ask for a hidden referral, asks generic questions available online, records without consent, and treats one opinion as market truth.',
    'consented role-reality interview study',
    [
      [
        'learning-question',
        'Define a concrete uncertainty about tasks, environment, entry routes, evidence, or tradeoffs that a practitioner can help test.',
        'The goal of an informational interview is to impress the contact.',
        'strategic',
        'create',
      ],
      [
        'contact-context',
        'Research public context and explain why this person may have relevant perspective without presuming identity, availability, or representation.',
        'A prestigious title guarantees applicable advice.',
        'professional',
        'analyze',
      ],
      [
        'conversation-design',
        'Plan a short accessible conversation with neutral behavior questions, time consent, recording consent, and an easy stopping path.',
        'Recording is acceptable whenever notes would be inconvenient.',
        'professional',
        'create',
      ],
      [
        'synthesis-limit',
        'Separate observation, practitioner interpretation, candidate inference, contradiction, and unanswered question across multiple sources.',
        'One experienced person can validate an entire career plan.',
        'strategic',
        'evaluate',
      ],
      [
        'action-feedback',
        'Close the loop by acting on one bounded insight, reporting the result when welcome, and revising the role hypothesis from combined evidence.',
        'The contact owes continuing mentorship after one conversation.',
        'metacognitive',
        'create',
      ],
    ]
  ),
  careerModule(
    'screening',
    'Recruiter Screens, Written Communication, and Process Control',
    'A fast screening call mixes role interest, evidence, compensation, location, authorization, accommodations, private history, and unclear next steps.',
    'screening conversation and process record',
    [
      [
        'concise-introduction',
        'Deliver a flexible evidence-grounded introduction connecting target work, relevant behavior, proof, and reason for this conversation.',
        'A good introduction is one memorized biography for every audience.',
        'professional',
        'create',
      ],
      [
        'question-clarification',
        'Clarify ambiguous role, level, process, location, schedule, compensation, work sample, and decision criteria before answering.',
        'Candidates must answer every question immediately to appear prepared.',
        'professional',
        'apply',
      ],
      [
        'private-boundary',
        'Respond to irrelevant, sensitive, or jurisdiction-dependent questions by protecting privacy, redirecting to job function, and seeking qualified local guidance when needed.',
        'Every personal question must be answered to remain in consideration.',
        'strategic',
        'evaluate',
      ],
      [
        'process-access',
        'Request process details and needed access adjustments with learner-controlled disclosure and location-specific rights awareness.',
        'An accommodation request must include a diagnosis and formal legal vocabulary.',
        'professional',
        'create',
      ],
      [
        'screen-close',
        'Confirm mutual interest, unresolved questions, next step, owner, timing, artifact promises, contact channel, and follow-up record.',
        'A friendly conversation implies advancement.',
        'procedural',
        'create',
      ],
    ]
  ),
  careerModule(
    'technical-interviews',
    'Technical Problem Solving, Coding, and Work-Sample Boundaries',
    'A timed exercise rewards silent pattern recall while the candidate ignores requirements, changed cases, testing, communication, accessibility, security, tool policy, and task proportionality.',
    'observable technical interview practice system',
    [
      [
        'problem-contract',
        'Clarify user, input, output, constraints, examples, error behavior, environment, allowed tools, and evaluation before implementation.',
        'Beginning to code immediately demonstrates seniority.',
        'procedural',
        'create',
      ],
      [
        'reasoning-communication',
        'Externalize assumptions, alternatives, invariants, tradeoffs, checkpoints, uncertainty, and help requests without narrating every keystroke.',
        'The interviewer can infer reasoning from final code.',
        'professional',
        'create',
      ],
      [
        'correctness-first',
        'Build the smallest correct behavior, test examples and changed cases, inspect failures, then improve measured cost or design.',
        'The optimal algorithm matters before the contract works.',
        'procedural',
        'create',
      ],
      [
        'unknown-recovery',
        'Use first principles, documentation when allowed, a smaller model, experiment, or explicit partial result when recall fails.',
        'Not remembering a named algorithm means the interview is lost.',
        'metacognitive',
        'create',
      ],
      [
        'sample-boundary',
        'Evaluate take-home scope, ownership, confidentiality, accessibility, tool disclosure, deadline, compensation, and production-use risk before consent.',
        'Every interview assignment is reasonable because participation is optional.',
        'professional',
        'evaluate',
      ],
    ]
  ),
  careerModule(
    'collaborative-defense',
    'Pairing, System Reasoning, Debugging, and Project Defense',
    'A candidate treats collaboration as performance theater, accepts false premises, over-designs an abstract system, and describes a team project as entirely personal work.',
    'multi-format technical defense packet',
    [
      [
        'pairing-contract',
        'Establish roles, turn-taking, accessibility, tool use, communication, disagreement, and shared success for a collaborative exercise.',
        'The strongest candidate should take control and finish alone.',
        'professional',
        'create',
      ],
      [
        'debug-evidence',
        'Reproduce the symptom, bound the last-known-good state, rank hypotheses, run discriminating checks, repair the cause, and retain regression evidence.',
        'Interview debugging rewards rapid guessing more than causal diagnosis.',
        'procedural',
        'create',
      ],
      [
        'system-scenarios',
        'Elicit stakeholders, workload, quality scenarios, data, trust, failure, cost, operations, and evolution before proposing components.',
        'A system interview begins by drawing standard infrastructure boxes.',
        'strategic',
        'create',
      ],
      [
        'tradeoff-defense',
        'Compare feasible alternatives against explicit scenarios, limits, evidence, and revision triggers instead of claiming one best architecture.',
        'Using more distributed components demonstrates stronger system design.',
        'strategic',
        'evaluate',
      ],
      [
        'project-defense',
        'Defend personal contribution, team decisions, failures, accessibility, security, testing, operations, outcomes, assistance, and non-claims with inspectable evidence.',
        'Speaking in “we” avoids the need to identify personal contribution.',
        'professional',
        'create',
      ],
    ]
  ),
  careerModule(
    'behavioral-equity',
    'Behavioral Evidence, Values, Equity, and Accessible Hiring',
    'A candidate memorizes heroic stories, erases collaborators, blames others, performs culture fit, and assumes every hiring task is equally accessible or lawful everywhere.',
    'behavioral evidence and access response bank',
    [
      [
        'behavior-example',
        'Choose a specific relevant situation and explain context, responsibility, action, decision, observable result, reflection, and transfer limit.',
        'A polished hypothetical answer is stronger than an imperfect real example.',
        'professional',
        'create',
      ],
      [
        'conflict-accountability',
        'Describe disagreement, feedback, error, repair, shared credit, power, and changed behavior without blame or false harmony.',
        'Leadership stories require the candidate to be the sole decision maker.',
        'professional',
        'create',
      ],
      [
        'values-evidence',
        'Test stated organizational values with recent behavior, incentives, tradeoffs, failure response, affected people, and employee recourse.',
        'Matching personality with a team is objective evidence of culture fit.',
        'strategic',
        'evaluate',
      ],
      [
        'access-plan',
        'Prepare learner-controlled requests for accessible scheduling, format, environment, communication, assessment, breaks, or assistive technology.',
        'Requesting an adjustment signals inability to do the job.',
        'professional',
        'create',
      ],
      [
        'jurisdiction-boundary',
        'Distinguish general ethical practice from location-specific rights, protected categories, disclosure rules, background checks, and qualified advice.',
        'U.S. employment guidance applies globally and permanently.',
        'conceptual',
        'evaluate',
      ],
    ]
  ),
  careerModule(
    'offers-negotiation',
    'Offer Evaluation, Compensation, Negotiation, and Decision Quality',
    'A verbal offer creates urgency while base pay, equity, benefits, schedule, location, probation, intellectual property, contingencies, and role expectations remain unclear.',
    'evidence-based offer decision model',
    [
      [
        'written-offer',
        'Request and verify a written offer, role, level, reporting line, location, schedule, start, compensation, benefits, contingencies, and decision date.',
        'A verbal promise is equivalent to an enforceable final agreement.',
        'procedural',
        'evaluate',
      ],
      [
        'total-package',
        'Compare base, variable pay, equity uncertainty, benefits, leave, hours, commute, equipment, learning, stability, risk, and personal constraints.',
        'The highest base salary is always the best economic offer.',
        'strategic',
        'evaluate',
      ],
      [
        'market-range',
        'Build a source-dated occupation, location, level, and responsibility range while separating public data from this employer decision.',
        'A single online salary number establishes fair compensation.',
        'strategic',
        'create',
      ],
      [
        'counterproposal',
        'Make a respectful prioritized counterproposal grounded in role value, evidence, market range, alternatives, and non-salary options.',
        'Negotiation succeeds only if every request is accepted.',
        'professional',
        'create',
      ],
      [
        'decision-record',
        'Document benefits, risks, unknowns, pressure, advice boundaries, decline conditions, acceptance terms, and the learner-owned reasoned decision.',
        'Accepting quickly demonstrates commitment and protects the offer.',
        'strategic',
        'evaluate',
      ],
    ]
  ),
  careerModule(
    'transition-resilience',
    'Ethical Transition, Rejection Learning, and Continuing Career Development',
    'After an outcome, the candidate either stops learning, extracts certainty from sparse feedback, burns relationships, or carries confidential material into the next role.',
    'first-90-days and continuing career evidence plan',
    [
      [
        'close-process',
        'Close accepted, declined, rejected, withdrawn, and expired opportunities with concise communication, returned property, retained records, and privacy-safe deletion.',
        'Only successful processes deserve professional closure.',
        'professional',
        'create',
      ],
      [
        'feedback-calibration',
        'Separate direct feedback, process outcome, missing signal, candidate inference, repeated pattern, and uncontrollable variance before changing strategy.',
        'Every rejection contains an actionable verdict about candidate ability.',
        'metacognitive',
        'evaluate',
      ],
      [
        'transition-integrity',
        'Honor notice, confidentiality, intellectual property, client, account, device, access, data, and relationship duties with qualified local review where needed.',
        'Portfolio value justifies retaining prior employer material.',
        'professional',
        'evaluate',
      ],
      [
        'first-ninety-days',
        'Plan accessible onboarding around relationships, product and user context, systems, quality, security, operating norms, early evidence, feedback, and bounded commitments.',
        'A new hire should prove value by making major changes immediately.',
        'strategic',
        'create',
      ],
      [
        'career-evidence-loop',
        'Maintain a consented private evidence log, retrieve skills, seek feedback, update public proof selectively, and review direction without exposing confidential work.',
        'Career development happens only during the next job search.',
        'metacognitive',
        'create',
      ],
    ]
  ),
];

export const jobSearchConfig = finalizeCourse(
  {
    id: 'job-search',
    title: 'Evidence-Driven Programming Career Launch',
    version: '2026.07',
    audience: {
      description:
        'Capstone-ready learners who want a truthful, sustainable, accessible, evidence-driven route from demonstrated computing competence to a well-evaluated programming opportunity and responsible transition.',
      entryKnowledge: [
        'Independently retrieve, build, test, debug, document, version, and defend accessible, secure, privacy-aware software evidence from prior courses and the capstone.',
        'Distinguish personal contribution, collaboration, generated assistance, automated checks, human evidence, limitations, and unsupported claims.',
        'Use a browser-based evidence simulator safely and transfer real applications, research, conversations, interviews, and negotiations only with learner consent.',
      ],
      deviceConstraints: [
        'The browser lab analyzes fictional, deterministic career manifests only. Real profiles, applications, messages, participant contact, interviews, accounts, employment records, legal rights, negotiation, and offer decisions remain learner-controlled external actions.',
      ],
      accessibilityAssumptions: [
        'Every resume, portfolio, profile, application, message, tracker, interview artifact, technical exercise, offer model, and transition plan requires keyboard operation, structured text, visible focus, reflow, non-color meaning, usable zoom, text alternatives, understandable status, and flexible format.',
      ],
    },
    scope: {
      includes: [
        'A cumulative career launch from learner constraints and evidence inventory through labor-market research, role decomposition, gap experiments, safe public proof, GitHub and case studies, resumes and application packets, search operations, employer trust, reciprocal relationships, interviews, accommodations, offers, negotiation, transition, and continuing development',
        'Five authentic career campaign projects, misconception-targeted theory, guided workshops, faded debugging, changed-candidate labs, retrieval, scenario quizzes, and a cumulative unfamiliar defense',
        'Original evidence manifests that make targeting, truthfulness, accessibility, privacy, consent, process state, interview reasoning, decision quality, failure repair, and transfer boundaries mechanically reviewable without automating real hiring actions',
      ],
      excludes: [
        'Guaranteed employment, mass application or message automation, scraped contacts, fabricated experience or metrics, hidden AI authorship, keyword stuffing, unpaid production work, legal advice, mandatory public identity, medical disclosure, credential sharing, real recruiter contact, offer acceptance, or learner decisions made by the platform',
      ],
      nextCourses: [],
    },
    sources,
    sharedRequirements: [
      'Every activity retrieves learner agency, target role, truthfulness, personal contribution, evidence revision, accessibility, privacy, security, consent, jurisdiction, process state, changed-case proof, failure repair, and next-decision boundaries before adding complexity.',
      'Fictional browser cases never contact employers or people, submit applications, access accounts, scrape listings, expose personal information, run learner commands, accept terms, negotiate, or make employment decisions.',
      'Passing work requires role-relevant observable evidence, a changed candidate or opportunity case, contradiction or rejected failure, causal repair, accessible artifact, consent and privacy control, dated source limits, an explicit non-claim, and learner-owned transfer decision.',
      'Employment law, wages, rights, authorization, benefits, tax, contract, background-check, and accommodation details are location- and time-dependent; activities must name the jurisdiction and route consequential questions to current official or qualified local guidance.',
    ],
    modules,
    projects: [
      project(
        'career-target-evidence',
        'Target Role and Evidence Strategy Defense',
        'career-role-decomposition',
        'A career adviser, working practitioner, and accessibility-aware peer reviewer',
        'They need a learner-owned search charter, source-dated market hypothesis, decomposed role, honest evidence matrix, explicit constraints, and a defensible apply or investigate decision.',
        [
          'career-success-definition',
          'career-source-provenance',
          'career-role-hypothesis',
          'career-outcome-extraction',
          'career-go-no-go',
        ]
      ),
      project(
        'career-public-proof',
        'Safe Public Technical Evidence Route',
        'career-case-studies',
        'A time-constrained technical reviewer and a learner with specific privacy and access boundaries',
        'They need a selective safe profile, three relevant repository routes, reproducible changed-case proof, accessible case studies, honest contribution boundaries, and no sensitive disclosure.',
        [
          'career-audience-purpose',
          'career-publication-review',
          'career-project-selection',
          'career-reproducible-proof',
          'career-case-study-access',
        ]
      ),
      project(
        'career-application-campaign',
        'Auditable and Sustainable Application Campaign',
        'career-opportunity-trust',
        'A candidate balancing limited time, privacy, financial safety, and several materially different opportunities',
        'They need a truthful resume system, targeted packet, consented references, sustainable tracker, source-verified employers, scam resistance, and evidence-based campaign revision.',
        [
          'career-evidence-bullet',
          'career-machine-robust',
          'career-reference-consent',
          'career-experiment-design',
          'career-identity-verification',
        ]
      ),
      project(
        'career-interview-loop',
        'Accessible Multi-Stage Interview Loop',
        'career-technical-interviews',
        'A candidate and hiring group preparing an accessible screen, technical exercise, work-sample decision, and explicit next-step handoff',
        'They need concise evidence, protected private boundaries, accessible process requests, contract-first problem solving, changed-case testing, honest tool use, and proportional work-sample consent.',
        [
          'career-concise-introduction',
          'career-process-access',
          'career-problem-contract',
          'career-correctness-first',
          'career-sample-boundary',
        ]
      ),
      project(
        'career-offer-transition',
        'Career Launch Offer, Transition, and 90-Day Defense',
        'career-transition-resilience',
        'A candidate, trusted adviser, future manager, and privacy-aware transition reviewer',
        'They need a collaborative technical and behavioral defense, access plan, written total-package evaluation, evidence-grounded counterproposal, ethical closure, calibrated rejection learning, and a bounded first-90-days plan.',
        [
          'career-project-defense',
          'career-access-plan',
          'career-total-package',
          'career-counterproposal',
          'career-first-ninety-days',
        ]
      ),
    ],
    examContext:
      'An unfamiliar candidate with nontraditional evidence, strict privacy and accessibility needs, limited runway, a changed local market, ambiguous listings, conflicting employer signals, a suspicious recruiter, role gaps, public-proof decisions, a tailored application, a reciprocal contact, a multistage interview, a disproportionate take-home request, jurisdiction-specific questions, competing offers, and an ethical transition must defend every claim and learner-owned decision.',
    minimumQuestionBankSize: 650,
    competencyIdPrefix: 'career-',
  },
  {
    researchedAt: RESEARCHED_AT,
    prerequisiteCourseIds: ['capstone-project'],
    masteryThresholdPercent: 88,
  }
);

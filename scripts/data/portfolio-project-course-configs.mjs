import { finalizeCourse, project, skill } from './course-config-helpers.mjs';

const REVIEWED_AT = '2026-07-15';
const RESEARCHED_AT = '2026-07-15T23:55:00.000Z';

function outcome(
  prefix,
  [id, statement, misconception, knowledgeType = 'procedural', level = 'apply']
) {
  if (!misconception)
    throw new Error(`Missing portfolio-project misconception for ${prefix}-${id}`);
  return skill(`${prefix}-${id}`, statement, misconception, knowledgeType, level);
}

function productModule(prefix, id, title, context, artifact, specifications) {
  const skills = specifications.map((entry) => outcome(prefix, entry));
  return {
    id: `${prefix}-${id}`,
    title,
    context,
    artifact,
    objectives: skills.slice(0, 3).map((entry) => entry[1]),
    skills,
    contexts: {
      theory: `${context} Predict the decision, affected people, evidence strength, failure cost, and transfer limit before seeing a worked case.`,
      workshop: `A guided product team extends ${artifact} while preserving every earlier problem, accessibility, security, testing, operations, and recovery requirement.`,
      debug: `A preserved decision record for ${title.toLowerCase()} contains one plausible evidence, scope, design, implementation, evaluation, or ownership defect. Find the first unsupported claim before changing the product.`,
      lab: `An independent public-benefit team supplies different users, constraints, risks, technology, data, and failure conditions and transfers ${title.toLowerCase()} into a changed ${artifact}.`,
      review: `A delayed review reconstructs ${title.toLowerCase()} from stakeholder, decision, assumption, revision, artifact, observation, changed case, rejected failure, repair, owner, and residual-risk evidence.`,
      quiz: `A review board compares near-miss decisions for ${title.toLowerCase()} and accepts only observable behavior, human evidence, explicit non-claims, and owned transfer gates.`,
    },
  };
}

const sharedSources = [
  [
    'ACM IEEE AAAI Computer Science Curricula 2023',
    'standard',
    'https://csed.acm.org/final-report/',
    'CS2023 final report',
    'Controls competency-based progression, project work, professional practice, ethics, accessibility, security, testing, and the integration of knowledge with observable performance.',
  ],
  [
    'NACE Career Readiness Competencies',
    'curriculum-framework',
    'https://www.naceweb.org/career-readiness/competencies/career-readiness-defined/',
    'Current eight-competency framework reviewed 2026-07-15',
    'Controls reflection and evidence for career and self-development, communication, critical thinking, leadership, professionalism, teamwork, technology, and inclusive practice.',
  ],
  [
    'ACM Code of Ethics and Professional Conduct',
    'standard',
    'https://www.acm.org/code-of-ethics',
    'ACM Code 2018 current',
    'Controls public-good reasoning, harm avoidance, honesty, fairness, privacy, security, competence, review, and accountability.',
  ],
  [
    'Web Content Accessibility Guidelines',
    'standard',
    'https://www.w3.org/TR/WCAG22/',
    'WCAG 2.2 Recommendation; ISO IEC 40500:2025',
    'Controls perceivable, operable, understandable, and robust product requirements and distinguishes automated checks from human conformance evaluation.',
  ],
  [
    'NIST Secure Software Development Framework',
    'standard',
    'https://csrc.nist.gov/pubs/sp/800/218/final',
    'NIST SP 800-218 SSDF 1.1 final',
    'Controls prepared organizations, protected software, well-secured production, vulnerability response, provenance, verification, and release evidence.',
  ],
  [
    'NIST Privacy Framework',
    'standard',
    'https://www.nist.gov/privacy-framework',
    'Privacy Framework 1.0 final; 1.1 remains an initial public draft at review',
    'Controls purpose, data processing, governance, communication, protection, retention, correction, and privacy-risk reasoning without presenting the draft as final.',
  ],
  [
    'GitHub profile and project presentation documentation',
    'official-docs',
    'https://docs.github.com/en/account-and-profile/tutorials/using-your-github-profile-to-enhance-your-resume',
    'GitHub Docs current 2026-07-15',
    'Controls selective project presentation, useful README evidence, setup, demonstration, testing, dependency currency, and truthful portfolio communication.',
  ],
  [
    'GitHub healthy contribution and repository security documentation',
    'official-docs',
    'https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions',
    'GitHub Docs current 2026-07-15',
    'Controls contribution guidance, governance, licensing, support, security policy, dependency review, code scanning, secret scanning, and repository stewardship.',
  ],
  [
    'GOV.UK Service Manual discovery and alpha guidance',
    'official-docs',
    'https://www.gov.uk/service-manual/agile-delivery/how-the-discovery-phase-works',
    'Service Manual current 2026-07-15',
    'Controls problem-first discovery, affected-user and constraint research, measures of success, riskiest-assumption prototypes, and evidence-based stop decisions before production building.',
  ],
  [
    'SLSA specification',
    'standard',
    'https://slsa.dev/spec/v1.2/',
    'SLSA 1.2 approved 2025-11-06',
    'Controls source and build tracks, provenance, artifact identity, verification, and honest supply-chain claims.',
  ],
  [
    'SPDX specification',
    'standard',
    'https://spdx.github.io/spdx-spec/',
    'SPDX 3.0.1',
    'Controls machine-readable software, package, file, snippet, licensing, security, build, and AI artifact relationships.',
  ],
].map(([title, authority, url, version, scope]) => ({
  title,
  authority,
  url,
  version,
  reviewedAt: REVIEWED_AT,
  scope,
}));

const commonAccessibility = [
  'Every product brief, interview artifact, diagram, prototype, backlog, code task, test result, dashboard, demo, and defense must have structured text, keyboard operation, visible focus, announced status, large targets, non-color meaning, reflow, and reduced-motion support.',
];

const projectOneModules = [
  productModule(
    'pp1',
    'readiness-evidence',
    'Readiness Audit, Prior-Skill Retrieval, and Evidence Baseline',
    'A learner has many completed exercises but cannot show which behaviors are independently reproducible, current, accessible, secure, or useful.',
    'mastery baseline and project readiness ledger',
    [
      [
        'competency-inventory',
        'Map prior competencies to observable behaviors, dated artifacts, evidence strength, and unresolved gaps before selecting a product.',
        'Course completion badges prove every underlying skill remains retrievable.',
        'metacognitive',
        'evaluate',
      ],
      [
        'artifact-triage',
        'Distinguish reusable evidence, practice residue, generated output, sensitive material, and unsupported claims in an existing work sample.',
        'Anything committed to a repository is suitable portfolio evidence.',
        'professional',
        'evaluate',
      ],
      [
        'changed-case-baseline',
        'Reproduce one prior behavior under a changed input, environment, or constraint and retain its exact pass or failure evidence.',
        'Repeating the original happy path demonstrates durable mastery.',
      ],
      [
        'gap-remediation',
        'Convert a readiness gap into a bounded retrieval task with acceptance evidence and a stop rule.',
        'The project should silently teach every missing prerequisite while scope grows.',
        'strategic',
        'create',
      ],
      [
        'evidence-ledger',
        'Create a revision-bound ledger linking each claim to artifact, verification, changed case, limitation, and owner.',
        'A polished narrative can replace traceable evidence.',
        'professional',
        'create',
      ],
    ]
  ),
  productModule(
    'pp1',
    'problem-discovery',
    'Problem Discovery Before Solution Commitment',
    'A community partner asks for an app, but the underlying decision, present workaround, affected users, frequency, severity, and evidence are unknown.',
    'problem evidence dossier',
    [
      [
        'request-vs-need',
        'Separate the requested feature from the user need, stakeholder decision, current behavior, and desired outcome.',
        'A stakeholder solution request is already a validated problem statement.',
        'strategic',
        'analyze',
      ],
      [
        'context-observation',
        'Observe or reconstruct the current workflow with roles, triggers, inputs, handoffs, delays, exceptions, and consequences.',
        'A generic persona provides enough evidence about real work.',
        'procedural',
        'analyze',
      ],
      [
        'evidence-source-quality',
        'Compare direct observation, interview, artifact, analytics, support, market, and assumption evidence for relevance and bias.',
        'All evidence sources deserve equal confidence.',
        'strategic',
        'evaluate',
      ],
      [
        'problem-frequency-severity',
        'Estimate who encounters the problem, how often, with what severity, and under which boundary conditions.',
        'A vivid anecdote establishes population-level importance.',
      ],
      [
        'discovery-noncommitment',
        'Record open questions and postpone feature commitment until the problem and constraints meet an explicit evidence threshold.',
        'Discovery is successful only when it approves the original build idea.',
        'professional',
        'evaluate',
      ],
    ]
  ),
  productModule(
    'pp1',
    'ethical-user-research',
    'Ethical, Inclusive, and Accessible User Research',
    'A team plans convenience-sampled interviews, records unnecessary personal data, and excludes people who use assistive technology or cannot join live video.',
    'consented inclusive research packet',
    [
      [
        'research-question',
        'Frame neutral research questions around behavior, context, barriers, and decisions instead of selling a preferred solution.',
        'Asking whether users like the idea measures authentic need.',
      ],
      [
        'participant-inclusion',
        'Recruit relevant variation in ability, device, language, connectivity, role, and problem experience without claiming representativeness.',
        'The easiest available participants adequately represent affected users.',
        'professional',
        'create',
      ],
      [
        'consent-power',
        'Explain purpose, recording, storage, withdrawal, incentives, and power relationships in accessible consent before participation.',
        'A checked box makes any collection ethically acceptable.',
        'professional',
        'evaluate',
      ],
      [
        'data-minimization-research',
        'Collect only decision-necessary research data with retention, access, redaction, deletion, and breach handling.',
        'More raw participant data always produces better insight.',
        'professional',
        'create',
      ],
      [
        'synthesis-contradiction',
        'Synthesize patterns with source links, counterevidence, minority needs, uncertainty, and quotations short enough to protect identity.',
        'A majority theme permits discarding contradictory or accessibility-specific evidence.',
        'strategic',
        'evaluate',
      ],
    ]
  ),
  productModule(
    'pp1',
    'outcomes-success',
    'Outcome Contract, Non-Goals, and Measures of Success',
    'The proposed product promises engagement and delight but names no user decision, baseline, guardrail, accessibility outcome, or unacceptable harm.',
    'measurable outcome and non-goal contract',
    [
      [
        'outcome-chain',
        'Connect product capability to user behavior, user outcome, stakeholder outcome, and public consequence without assuming causality.',
        'Shipping a capability directly proves the intended real-world outcome.',
        'conceptual',
        'analyze',
      ],
      [
        'baseline-measure',
        'Define a baseline, observable leading and lagging measures, collection method, comparison window, and uncertainty.',
        'A target is meaningful without a baseline or measurement plan.',
      ],
      [
        'guardrail-metric',
        'Pair success measures with accessibility, equity, privacy, security, reliability, and burden guardrails.',
        'Optimizing the primary metric cannot make the product worse overall.',
        'professional',
        'create',
      ],
      [
        'non-goal-boundary',
        'State non-goals, excluded users or cases, unsupported claims, and the evidence required to expand scope.',
        'Omitting a feature from the plan communicates a stable non-goal.',
        'strategic',
        'create',
      ],
      [
        'stop-pivot-rule',
        'Define evidence thresholds that trigger continue, revise, pause, or stop decisions before sunk cost grows.',
        'Stopping after negative evidence means the project failed.',
        'metacognitive',
        'evaluate',
      ],
    ]
  ),
  productModule(
    'pp1',
    'hypotheses-prototypes',
    'Hypotheses, Riskiest Assumptions, and Disposable Prototypes',
    'A team starts production architecture while desirability, usability, feasibility, viability, safety, and operating assumptions remain untested.',
    'ranked assumption map and prototype evidence',
    [
      [
        'assumption-register',
        'Express desirable, usable, feasible, viable, ethical, accessible, secure, and operable assumptions as falsifiable claims.',
        'A risk list that names topics without predictions is testable.',
      ],
      [
        'risk-priority',
        'Prioritize assumptions by uncertainty, consequence, dependency, and cheapest discriminating evidence.',
        'The technically hardest feature is always the riskiest assumption.',
        'strategic',
        'evaluate',
      ],
      [
        'prototype-fidelity',
        'Choose paper, clickable, coded, data, integration, or operational prototype fidelity to answer one question without production overinvestment.',
        'Higher fidelity always creates more valid evidence.',
        'strategic',
        'create',
      ],
      [
        'prototype-test',
        'Run a protocol with success, failure, observation, accessibility accommodation, and interpretation criteria set before the session.',
        'Any positive participant comment validates the prototype.',
      ],
      [
        'prototype-disposal',
        'Separate disposable exploration from production code and record what can and cannot transfer after the experiment.',
        'A prototype that appears to work should become the production foundation.',
        'professional',
        'evaluate',
      ],
    ]
  ),
  productModule(
    'pp1',
    'scope-roadmap',
    'Thin Scope, Vertical Slices, and Evidence-Driven Roadmap',
    'A backlog contains many horizontal technical tasks, no complete user path, hidden prerequisites, and no way to demonstrate value until the end.',
    'risk-ordered vertical-slice roadmap',
    [
      [
        'story-outcome',
        'Write a bounded user scenario with trigger, actor, need, outcome, constraints, and observable acceptance evidence.',
        'A component or database task is automatically a user story.',
      ],
      [
        'vertical-slice',
        'Slice work across interface, behavior, data, verification, accessibility, security, and operations to produce one end-to-end learning signal.',
        'Completing each architecture layer separately reduces integration risk.',
      ],
      [
        'dependency-order',
        'Order slices by prerequisite knowledge, risk retirement, feedback value, and reversible commitment.',
        'Business priority alone determines pedagogical and technical order.',
        'strategic',
        'create',
      ],
      [
        'definition-done',
        'Define done as behavior plus changed-case tests, accessibility review, security checks, documentation, deployment, and recovery evidence.',
        'A merged implementation means the slice is done.',
        'professional',
        'create',
      ],
      [
        'scope-tradeoff',
        'Protect the outcome by trading feature breadth, fidelity, automation, and polish while preserving non-negotiable quality boundaries.',
        'Fixed time can be met by temporarily dropping accessibility or testing.',
        'strategic',
        'evaluate',
      ],
    ]
  ),
  productModule(
    'pp1',
    'repository-toolchain',
    'Reproducible Repository, Toolchain, and Dependency Stewardship',
    'The product runs only on one machine with floating tools, unexplained generated files, unclear license, secrets in examples, and no clean-start proof.',
    'reproducible healthy project repository',
    [
      [
        'repository-contract',
        'Establish purpose, setup, architecture, commands, contribution, conduct, support, security, license, and ownership documentation.',
        'A README installation snippet is a complete repository contract.',
        'professional',
        'create',
      ],
      [
        'toolchain-pin',
        'Pin supported runtime, package manager, compiler, formatter, linter, type checker, test runner, and build behavior with compatibility evidence.',
        'Latest floating tools keep the repository modern without risk.',
      ],
      [
        'dependency-due-diligence',
        'Evaluate dependency need, maintenance, provenance, license, advisories, transitive cost, API stability, and replacement or removal path.',
        'A popular package is automatically safe and appropriate.',
        'strategic',
        'evaluate',
      ],
      [
        'secret-config-boundary',
        'Separate public configuration, local examples, runtime secrets, generated state, and ignored files with rotation and scanning evidence.',
        'Adding a secret file to ignore rules repairs prior exposure.',
        'professional',
        'create',
      ],
      [
        'clean-reproduction',
        'Prove clone-to-gates-to-build behavior in a clean environment and record exact revision, lock, tool, artifact, and failure evidence.',
        'Success from a warm developer directory proves reproducibility.',
      ],
    ]
  ),
  productModule(
    'pp1',
    'architecture-data-contracts',
    'Small-System Architecture, Data Boundaries, and Decision Records',
    'Product logic is coupled to framework, storage, global state, and external services, so changed requirements and tests require broad rewrites.',
    'bounded architecture and data contract packet',
    [
      [
        'architecture-driver',
        'Derive architecture from user flows, quality attributes, risk, data sensitivity, team capacity, and change likelihood.',
        'Using a fashionable pattern is an architecture rationale.',
        'strategic',
        'create',
      ],
      [
        'boundary-port',
        'Separate domain decisions from interface, persistence, network, clock, identity, and third-party effects through narrow owned boundaries.',
        'Creating many folders guarantees useful separation.',
      ],
      [
        'data-model-invariant',
        'Model identities, states, relationships, invariants, invalid cases, provenance, and lifecycle before choosing storage representation.',
        'A table or interface shape fully defines valid domain behavior.',
      ],
      [
        'interface-contract',
        'Specify inputs, runtime validation, authorization, outputs, failures, idempotency, compatibility, and observability at each interface.',
        'Static types validate all external data and operational behavior.',
      ],
      [
        'decision-record',
        'Record context, forces, alternatives, decision, consequences, evidence, review trigger, and supersession for consequential choices.',
        'An ADR is permanent justification that should not be revisited.',
        'professional',
        'create',
      ],
    ]
  ),
  productModule(
    'pp1',
    'incremental-core',
    'Walking Skeleton, Core Behavior, and Preserved Invariants',
    'A large feature branch contains plausible UI and data but no earlier end-to-end behavior, executable invariant, or safe integration point.',
    'cumulative working product with invariant evidence',
    [
      [
        'walking-skeleton',
        'Deliver the smallest accessible end-to-end path through real boundaries with observable build, test, deploy, and recovery signals.',
        'A static mock connected to placeholder data is an operational walking skeleton.',
      ],
      [
        'domain-operation',
        'Implement one domain operation with explicit preconditions, transition, postconditions, failure taxonomy, and stakeholder-visible result.',
        'If output looks correct, internal state transitions need no contract.',
      ],
      [
        'invariant-test',
        'Encode critical invariants at the closest layer and prove a deliberate violation is rejected without corrupting prior state.',
        'Happy-path examples are enough to protect an invariant.',
      ],
      [
        'increment-integration',
        'Integrate each slice in a reviewable revision that retrieves prior requirements and leaves the product deployable.',
        'Integration risk can be deferred until all features are complete.',
        'professional',
        'create',
      ],
      [
        'refactor-evidence',
        'Refactor only behind behavior, changed-case, accessibility, performance, and failure evidence that separates design change from product change.',
        'Passing type checks proves a refactor preserved behavior.',
        'metacognitive',
        'evaluate',
      ],
    ]
  ),
  productModule(
    'pp1',
    'inclusive-experience',
    'Inclusive Interaction, Content, Responsive Design, and Human Evaluation',
    'The primary flow works by mouse at one viewport but loses focus, status, meaning, readability, and error recovery for changed devices and users.',
    'accessible responsive product experience',
    [
      [
        'semantic-task-flow',
        'Structure landmarks, headings, names, instructions, controls, errors, and status around the user task and reading order.',
        'ARIA can repair any non-semantic interaction after implementation.',
      ],
      [
        'keyboard-focus',
        'Verify complete keyboard operation, logical order, visible focus, focus movement, escape paths, and no traps across state changes.',
        'Tabbing through a page once proves keyboard accessibility.',
      ],
      [
        'responsive-reflow',
        'Design content and interaction to reflow at zoom and changed mobile, tablet, desktop, orientation, text, and language conditions.',
        'Responsive design means choosing three fixed screen widths.',
      ],
      [
        'multimodal-meaning',
        'Provide text alternatives, captions, labels, non-color meaning, reduced motion, adequate targets, and tolerant input.',
        'An automated score proves equivalent perception and operation.',
        'professional',
        'create',
      ],
      [
        'human-accessibility-eval',
        'Combine automated checks, keyboard review, screen-reader or structured-text inspection, zoom, contrast, and affected-user evidence with documented limits.',
        'One accessibility tool can certify WCAG conformance.',
        'professional',
        'evaluate',
      ],
    ]
  ),
  productModule(
    'pp1',
    'trust-quality',
    'Security, Privacy, Reliability, and Layered Quality Evidence',
    'A product passes a familiar unit test but trusts input, overcollects data, leaks failure details, loses work, and has no threat or recovery evidence.',
    'trust and quality assurance case',
    [
      [
        'threat-abuse-case',
        'Model assets, actors, trust boundaries, misuse, abuse, failure impact, mitigations, detection, response, and residual risk.',
        'Security review is a vulnerability scanner run after coding.',
        'strategic',
        'create',
      ],
      [
        'privacy-lifecycle',
        'Trace purpose, collection, consent or authority, use, sharing, retention, access, correction, deletion, and aggregation risk.',
        'Removing direct names makes any dataset anonymous.',
        'professional',
        'evaluate',
      ],
      [
        'test-layer-strategy',
        'Assign pure behavior, boundary, integration, interface, end-to-end, accessibility, security, and recovery claims to appropriate tests.',
        'More end-to-end tests provide the strongest and cheapest confidence.',
        'strategic',
        'create',
      ],
      [
        'fault-recovery',
        'Inject timeout, invalid data, dependency failure, interruption, duplicate action, partial write, and restart conditions and verify safe recovery.',
        'Catching exceptions and showing a message makes a product reliable.',
      ],
      [
        'quality-nonclaim',
        'State which tests passed, what environment they represent, what remains human or production evidence, and who owns each gap.',
        'A green continuous-integration run proves production quality.',
        'metacognitive',
        'evaluate',
      ],
    ]
  ),
  productModule(
    'pp1',
    'release-defense',
    'Validation, Release, Documentation, Recovery, and Portfolio Defense',
    'A demo works from a developer machine, but the audience cannot reproduce it, inspect evidence, understand limits, recover failure, or verify who benefited.',
    'released product evidence and public defense packet',
    [
      [
        'user-validation',
        'Run task-based validation against predeclared outcomes and guardrails, analyze success, breakdown, accessibility, and contradictory evidence, then revise.',
        'A satisfaction rating proves task success and user benefit.',
        'strategic',
        'evaluate',
      ],
      [
        'artifact-identity-release',
        'Bind source revision, dependencies, generated assets, build, SBOM or inventory, test evidence, deployment, and rollback to one release identity.',
        'A version tag alone identifies the exact reviewed artifact.',
        'professional',
        'create',
      ],
      [
        'operations-recovery',
        'Define health, logs, metrics, alerts, support, backup, restore, incident, rollback, ownership, and retirement behavior proportionate to risk.',
        'A small portfolio product needs no operational or recovery design.',
        'professional',
        'create',
      ],
      [
        'documentation-demo',
        'Create audience-specific setup, architecture, decision, usage, accessibility, security, test, operation, and limitation documentation plus a failure-aware demo.',
        'A polished video can replace runnable and inspectable evidence.',
        'professional',
        'create',
      ],
      [
        'claim-defense-retro',
        'Defend each mastery and impact claim with traceable evidence, answer counterexamples honestly, reflect on decisions, and define the next changed-context test.',
        'Confidence and presentation polish are substitutes for evidence.',
        'metacognitive',
        'evaluate',
      ],
    ]
  ),
];

const projectTwoModules = [
  productModule(
    'pp2',
    'prior-product-audit',
    'Prior-Product Audit, Maintenance Reality, and Reframed Challenge',
    'A successful first project has dependency drift, unresolved feedback, stale assumptions, hidden operations work, and a proposed sequel based only on more features.',
    'maintenance audit and reframed product charter',
    [
      [
        'production-vs-demo',
        'Audit which prior claims survived real use, changed data, dependency drift, support, accessibility, security, and recovery conditions.',
        'A product that shipped remains proven until code changes.',
      ],
      [
        'feedback-triage',
        'Classify feedback by user outcome, evidence source, frequency, severity, reach, confidence, and strategic fit.',
        'The loudest request deserves the highest priority.',
        'strategic',
        'evaluate',
      ],
      [
        'maintenance-cost',
        'Measure dependency, defect, support, content, data, infrastructure, and cognitive maintenance cost before adding scope.',
        'Feature development is the only meaningful project cost.',
      ],
      [
        'reframe-or-retire',
        'Compare repair, simplify, extend, replace, archive, and retire options against outcomes and total risk.',
        'Starting a new version is always easier than repairing the old one.',
        'strategic',
        'evaluate',
      ],
      [
        'new-mastery-delta',
        'Define which unfamiliar multi-actor, distributed, operational, or leadership competencies the second project must independently prove.',
        'A larger codebase automatically demonstrates more advanced mastery.',
        'metacognitive',
        'create',
      ],
    ]
  ),
  productModule(
    'pp2',
    'multi-actor-discovery',
    'Multi-Actor Service Discovery and Conflicting Outcomes',
    'Operators, end users, administrators, support staff, and affected non-users have different workflows, incentives, harms, and definitions of success.',
    'multi-actor service map and conflict register',
    [
      [
        'actor-system-map',
        'Map direct users, indirect users, operators, approvers, maintainers, adversaries, and affected non-users with their decisions and dependencies.',
        'Only people who click the interface are product users.',
        'strategic',
        'analyze',
      ],
      [
        'service-journey',
        'Trace frontstage and backstage actions, handoffs, wait states, channels, policies, evidence, and breakdowns across an end-to-end service.',
        'A screen-level user flow captures the whole service.',
      ],
      [
        'outcome-conflict',
        'Expose conflicting speed, control, privacy, accessibility, workload, cost, and accountability outcomes instead of averaging them away.',
        'One global success metric can represent every actor fairly.',
        'professional',
        'evaluate',
      ],
      [
        'authority-accountability',
        'Identify who may decide, approve, access, override, appeal, support, and answer for each consequential transition.',
        'Administrative access implies legitimate authority for every action.',
        'professional',
        'create',
      ],
      [
        'research-saturation-limit',
        'Judge when additional research is repeating known patterns, where evidence is still weak, and which groups remain missing.',
        'A fixed interview count guarantees discovery saturation.',
        'metacognitive',
        'evaluate',
      ],
    ]
  ),
  productModule(
    'pp2',
    'codesign-equity',
    'Co-Design, Equity, and Accessible Participation',
    'The team invites affected people only after scope is fixed and treats feedback as approval rather than shared problem framing and decision power.',
    'co-design plan and equity impact record',
    [
      [
        'participation-level',
        'Choose inform, consult, involve, collaborate, or shared-decision participation deliberately and communicate its actual influence.',
        'Calling a session co-design grants participants decision power.',
      ],
      [
        'access-accommodation',
        'Budget format, assistive technology, language, schedule, compensation, connectivity, cognitive load, and support accommodations before recruitment.',
        'Offering a video call is sufficient access for all participants.',
        'professional',
        'create',
      ],
      [
        'equity-impact',
        'Compare benefits, burdens, error rates, exclusion, recourse, and resource demands across relevant groups without inventing demographic certainty.',
        'Equal treatment necessarily produces equitable outcomes.',
        'professional',
        'evaluate',
      ],
      [
        'conflict-facilitation',
        'Facilitate disagreement with explicit decision rules, psychological safety, evidence capture, dissent preservation, and escalation paths.',
        'Consensus is the only legitimate co-design outcome.',
        'professional',
        'apply',
      ],
      [
        'feedback-accountability',
        'Report what input changed, did not change, why, who decided, and how participants can challenge or withdraw.',
        'Collecting feedback completes the obligation to participants.',
        'professional',
        'create',
      ],
    ]
  ),
  productModule(
    'pp2',
    'workflow-state',
    'Multi-Actor Workflow, State Machines, and Auditability',
    'Concurrent actors can approve, cancel, retry, reopen, and override work, but the product models only a mutable status string and timestamps.',
    'authorized auditable workflow model',
    [
      [
        'state-transition-table',
        'Define states, events, guards, actors, effects, notifications, terminal conditions, and invalid transitions in an executable table.',
        'A list of status values defines workflow behavior.',
      ],
      [
        'role-transition',
        'Bind each transition to authenticated role, contextual authorization, separation of duties, and appeal or override evidence.',
        'Hiding a button prevents an unauthorized transition.',
        'professional',
        'create',
      ],
      [
        'concurrent-transition',
        'Specify optimistic, pessimistic, serialized, or conflict-resolution behavior when actors act on stale state.',
        'The last write is an acceptable default for every conflict.',
        'strategic',
        'create',
      ],
      [
        'audit-event',
        'Record append-only actor, authority, request, prior state, new state, reason, correlation, time, and outcome without leaking unnecessary data.',
        'Application logs are automatically a reliable audit trail.',
      ],
      [
        'workflow-recovery',
        'Recover interrupted, duplicated, partially completed, or disputed transitions without fabricating history.',
        'Retrying the whole workflow restores a consistent state.',
      ],
    ]
  ),
  productModule(
    'pp2',
    'architecture-interfaces',
    'Quality-Attribute Architecture, ADRs, and Evolvable Interfaces',
    'Teams split a product into services before measuring coupling, deployment need, failure boundaries, team ownership, or compatibility cost.',
    'quality-attribute architecture and interface suite',
    [
      [
        'quality-scenario',
        'Express accessibility, security, privacy, reliability, performance, modifiability, operability, and cost as stimulus-response-measure scenarios.',
        'Words like scalable and secure are usable architecture requirements.',
        'strategic',
        'create',
      ],
      [
        'architecture-alternative',
        'Compare modular monolith, service, event, batch, managed, and buy options against explicit quality scenarios and team constraints.',
        'Microservices are the advanced default for a second project.',
        'strategic',
        'evaluate',
      ],
      [
        'interface-evolution',
        'Design runtime-validated APIs or events with compatibility, versioning, idempotency, pagination, error, deprecation, and consumer evidence.',
        'Adding optional fields is always backward compatible.',
      ],
      [
        'dependency-direction',
        'Enforce domain, application, adapter, and platform dependency direction with contract tests and replaceable boundaries.',
        'Dependency injection alone creates correct architectural boundaries.',
      ],
      [
        'adr-review-trigger',
        'Attach evidence, consequence, owner, expiry, and measurable review triggers to architecture decisions.',
        'An accepted architecture decision should not change during delivery.',
        'professional',
        'create',
      ],
    ]
  ),
  productModule(
    'pp2',
    'data-lifecycle',
    'Data Ownership, Integrity, Migrations, and Lifecycle Governance',
    'Shared records have unclear ownership, incompatible meanings, uncontrolled copies, irreversible migrations, and no correction or deletion path.',
    'governed data model and migration rehearsal',
    [
      [
        'data-owner-source',
        'Assign authoritative source, steward, identity, update rights, derived copies, synchronization, and dispute resolution for each entity.',
        'The database containing a value owns its meaning.',
      ],
      [
        'integrity-concurrency',
        'Protect uniqueness, relationships, state invariants, transaction boundaries, and concurrency behavior at complementary layers.',
        'Application validation prevents all invalid persisted state.',
      ],
      [
        'schema-evolution',
        'Plan expand-migrate-contract changes with old/new reader and writer compatibility, backfill, verification, pause, and rollback.',
        'A migration that succeeds once is safe for production data.',
      ],
      [
        'retention-deletion',
        'Implement retention, legal or policy hold, export, correction, deletion, derived-data cleanup, and auditable exceptions.',
        'Deleting the primary row removes every copy and derived artifact.',
        'professional',
        'create',
      ],
      [
        'data-reconciliation',
        'Reconcile counts, checksums, invariants, samples, rejects, and actor-visible outcomes before and after migration or repair.',
        'Matching total row counts proves a migration preserved meaning.',
      ],
    ]
  ),
  productModule(
    'pp2',
    'identity-authentication',
    'Identity, Authentication, Sessions, and Recovery',
    'The product conflates account, person, credential, role, session, and tenant while password reset and support override bypass normal protections.',
    'identity and session assurance model',
    [
      [
        'identity-entity',
        'Separate person, account, organization, service, device, credential, authenticator, session, and display identity.',
        'One email address is a stable global person identity.',
        'conceptual',
        'analyze',
      ],
      [
        'authentication-assurance',
        'Choose authentication and step-up strength from threat, consequence, usability, accessibility, recovery, and platform evidence.',
        'More authentication factors always produce a safer accessible system.',
        'strategic',
        'evaluate',
      ],
      [
        'session-lifecycle',
        'Define issuance, binding, rotation, idle and absolute expiry, revocation, concurrent sessions, device evidence, and secure transport.',
        'A signed token needs no server-side lifecycle policy.',
      ],
      [
        'account-recovery',
        'Design recovery resistant to takeover and lockout with accessible alternatives, cooling, notification, audit, and support boundaries.',
        'Security questions are a safe universal recovery method.',
        'professional',
        'create',
      ],
      [
        'auth-failure-privacy',
        'Return usable authentication failures and telemetry without account enumeration, credential leakage, or inaccessible friction.',
        'Generic errors alone prevent authentication information leaks.',
      ],
    ]
  ),
  productModule(
    'pp2',
    'authorization-tenancy-abuse',
    'Authorization, Tenant Isolation, and Abuse Resistance',
    'Authenticated users can change identifiers, cross tenant boundaries, automate expensive actions, and exploit support or administrator workflows.',
    'deny-by-default authorization and abuse case suite',
    [
      [
        'authorization-model',
        'Choose role, attribute, relationship, capability, or policy models from resource, action, subject, context, and review needs.',
        'Role-based access control fits every authorization problem.',
        'strategic',
        'evaluate',
      ],
      [
        'server-enforcement',
        'Enforce authorization at every trusted resource and transition boundary using current server-side state.',
        'Client routing and hidden controls are meaningful authorization barriers.',
      ],
      [
        'tenant-isolation',
        'Propagate tenant identity through query, cache, file, job, event, log, backup, restore, and support paths with adversarial tests.',
        'Adding tenant_id to primary tables guarantees isolation.',
      ],
      [
        'abuse-economics',
        'Model automation, scraping, spam, enumeration, resource exhaustion, fraud, and moderator burden with proportional controls.',
        'Rate limiting by IP solves automated abuse.',
      ],
      [
        'privileged-operation',
        'Require least privilege, just-in-time or bounded elevation, reason, approval where needed, audit, notification, and revocation for privileged work.',
        'Administrators should have unrestricted standing access.',
        'professional',
        'create',
      ],
    ]
  ),
  productModule(
    'pp2',
    'distributed-correctness',
    'Concurrency, Idempotency, Partial Failure, and Resilient Integration',
    'Retries, duplicate events, reordered messages, timeouts, and dependency outages create duplicate effects and contradictory state.',
    'fault-aware integration and recovery harness',
    [
      [
        'effect-identity',
        'Assign stable operation, request, event, entity, and attempt identities so repeated delivery can be recognized and reconciled.',
        'A timestamp is a sufficient idempotency key.',
      ],
      [
        'idempotent-effect',
        'Define idempotency scope, result replay, conflict behavior, retention, and atomic relationship to the protected effect.',
        'Retrying an idempotent HTTP method guarantees no duplicate business effect.',
      ],
      [
        'timeout-unknown-outcome',
        'Distinguish rejected, failed, timed out, cancelled, partially completed, and unknown remote outcomes before retry or compensation.',
        'A client timeout means the server performed no work.',
      ],
      [
        'ordering-consistency',
        'State ordering, visibility, staleness, monotonicity, and conflict guarantees per workflow instead of claiming generic consistency.',
        'Distributed events arrive exactly once and in creation order.',
      ],
      [
        'resilience-recovery',
        'Bound retries, backoff, concurrency, queues, circuit behavior, fallback, compensation, reconciliation, and operator recovery.',
        'Automatic retries make an integration resilient.',
      ],
    ]
  ),
  productModule(
    'pp2',
    'collaboration-governance',
    'Team Collaboration, Review, Governance, and Decision Handoffs',
    'Parallel contributors create hidden work, oversized changes, ambiguous ownership, rubber-stamp review, and undocumented decisions.',
    'collaboration operating system and review evidence',
    [
      [
        'work-decomposition',
        'Decompose work into outcome-bearing, low-coupling slices with owner, interface, acceptance, dependencies, and integration point.',
        'Assigning files to people prevents collaboration conflicts.',
        'strategic',
        'create',
      ],
      [
        'issue-decision-link',
        'Link problem evidence, issue, decision, change, review, verification, release, and follow-up through stable identifiers.',
        'A ticket title provides enough traceability.',
      ],
      [
        'review-contract',
        'Request review by risk area and require behavior, accessibility, security, data, operations, test, and documentation evidence.',
        'Code style approval is a complete review.',
      ],
      [
        'conflict-handoff',
        'Surface disagreement, uncertainty, blockers, availability, and decision authority early with reversible escalation and handoff artifacts.',
        'A high-performing team should resolve all disagreements informally.',
        'professional',
        'apply',
      ],
      [
        'governance-health',
        'Maintain contribution, conduct, security, support, ownership, license, roadmap, release, and archival practices for project health.',
        'Governance matters only after a project gains external contributors.',
        'professional',
        'create',
      ],
    ]
  ),
  productModule(
    'pp2',
    'observability-slo-support',
    'Observability, Service Levels, Support, and Incident Learning',
    'The product emits many logs but cannot answer whether users succeed, which revision failed, who is affected, or how to restore service.',
    'user-centered operations and incident system',
    [
      [
        'service-level-indicator',
        'Choose user-centered availability, correctness, latency, freshness, durability, or support indicators with valid measurement boundaries.',
        'Server uptime directly measures user success.',
      ],
      [
        'service-level-objective',
        'Set objective, window, population, exclusions, error budget, and response policy from user need and operating capacity.',
        'Every service should target 100 percent availability.',
        'strategic',
        'create',
      ],
      [
        'telemetry-correlation',
        'Correlate revision, request, actor class, workflow, dependency, event, log, metric, and trace without high-cardinality or privacy leakage.',
        'More telemetry always improves diagnosis.',
      ],
      [
        'accessible-support',
        'Provide discoverable accessible status, help, reporting, workarounds, response expectations, escalation, and communication during failure.',
        'A public status page is sufficient user support.',
        'professional',
        'create',
      ],
      [
        'incident-learning',
        'Preserve timeline and evidence, restore safely, communicate impact, analyze contributing conditions without blame, and track preventive work.',
        'The person who made the triggering change is the incident root cause.',
        'professional',
        'evaluate',
      ],
    ]
  ),
  productModule(
    'pp2',
    'performance-cost',
    'Performance, Capacity, Efficiency, and Cost Tradeoffs',
    'The team optimizes synthetic speed while real users face slow devices, large payloads, queue growth, resource contention, and unpredictable bills.',
    'capacity and cost evidence model',
    [
      [
        'performance-budget',
        'Set task, response, interaction, payload, memory, CPU, queue, accessibility, and energy budgets tied to user conditions.',
        'One average latency target represents product performance.',
      ],
      [
        'workload-model',
        'Model actors, operations, arrival patterns, concurrency, data sizes, locality, think time, bursts, failures, and growth.',
        'Multiplying current traffic by ten is a realistic load model.',
      ],
      [
        'measure-bottleneck',
        'Measure end-to-end and component behavior with controlled environments, percentiles, resource signals, variance, and profiler evidence.',
        'The slowest-looking code is the system bottleneck.',
      ],
      [
        'overload-policy',
        'Bound queues and concurrency and define admission, degradation, prioritization, backpressure, shedding, retry, and recovery behavior.',
        'Autoscaling prevents overload under every workload.',
      ],
      [
        'unit-economics',
        'Attribute fixed and variable build, run, storage, transfer, support, accessibility, and failure costs to useful product outcomes.',
        'Cheaper infrastructure automatically creates a more efficient product.',
        'strategic',
        'evaluate',
      ],
    ]
  ),
  productModule(
    'pp2',
    'delivery-supply-chain',
    'Trusted Delivery, Supply Chain, Progressive Release, and Rollback',
    'A release rebuilds across environments, uses mutable dependencies, grants broad automation authority, and has no provenance, canary, or rollback rehearsal.',
    'trusted progressive delivery dossier',
    [
      [
        'source-build-provenance',
        'Bind reviewed source, protected workflow, isolated builder, inputs, dependencies, output digest, provenance, and verification.',
        'A checksum proves who built an artifact and from which source.',
      ],
      [
        'component-inventory',
        'Maintain current direct, transitive, generated, container, service, data, model, and license inventory with vulnerability ownership.',
        'A package lockfile is a complete SBOM.',
      ],
      [
        'pipeline-authority',
        'Constrain events, untrusted input, tokens, OIDC claims, secrets, runners, caches, environments, approvals, and audit evidence.',
        'Private repositories make CI workflows trusted.',
      ],
      [
        'progressive-release',
        'Deploy the same immutable artifact through readiness, bounded exposure, user-centered signals, hold points, abort, and promotion.',
        'A deployment that starts successfully is ready for full traffic.',
      ],
      [
        'rollback-rollforward',
        'Rehearse compatible rollback, rollforward, configuration and data recovery, communication, and post-recovery verification.',
        'Returning application code to an older version always restores the service.',
      ],
    ]
  ),
  productModule(
    'pp2',
    'migration-validation-defense',
    'Migration, Recovery, Longitudinal Validation, and Advanced Defense',
    'The team plans a big-bang cutover, one launch-day usability test, an untested backup, and a demo that hides operating and collaboration evidence.',
    'advanced product transition and defense packet',
    [
      [
        'migration-strategy',
        'Choose parallel, phased, cohort, shadow, strangler, import, or big-bang transition from reversibility, compatibility, user burden, and risk.',
        'Big-bang migration is simplest because it avoids dual operation.',
        'strategic',
        'evaluate',
      ],
      [
        'backup-restore',
        'Define recovery point and time needs, backup scope, integrity, encryption, access, retention, clean restore, and application reconciliation.',
        'A successful backup job proves recoverability.',
      ],
      [
        'longitudinal-validation',
        'Measure task outcomes, guardrails, adoption, abandonment, support, accessibility, reliability, and unintended effects over an appropriate period.',
        'Launch-day feedback predicts sustained product value.',
      ],
      [
        'team-evidence-defense',
        'Defend personal contribution and shared outcomes using decisions, revisions, reviews, incidents, feedback, and changed-case evidence without claiming others work.',
        'Commit count measures individual contribution.',
      ],
      [
        'advanced-retrospective',
        'Evaluate product, process, leadership, ethics, operations, and learning against prior predictions and define a harder transfer challenge.',
        'A retrospective is mainly a list of what went well and poorly.',
        'metacognitive',
        'evaluate',
      ],
    ]
  ),
];

const capstoneModules = [
  productModule(
    'capstone',
    'mastery-contract',
    'Capstone Mastery Contract and Evidence Architecture',
    'A learner proposes an impressive build but cannot explain which curriculum outcomes it will assess, what independent evidence will count, or how overclaiming will be prevented.',
    'capstone competency and evidence architecture',
    [
      [
        'competency-claim-map',
        'Map every claimed competency to prerequisite evidence, new transfer task, artifact, verification, counterexample, and defense question.',
        'One complex artifact automatically demonstrates every skill used to create it.',
        'metacognitive',
        'create',
      ],
      [
        'independence-boundary',
        'Declare prior code, templates, libraries, collaborators, generated assistance, external services, and personal contribution with verification boundaries.',
        'Disclosing tools weakens a capstone and should be minimized.',
        'professional',
        'create',
      ],
      [
        'evidence-validity',
        'Evaluate whether proposed evidence is authentic, observable, sufficient, reproducible, current, and resistant to superficial completion.',
        'A large quantity of screenshots creates strong evidence.',
        'strategic',
        'evaluate',
      ],
      [
        'defense-question-bank',
        'Predefine changed-case, causal diagnosis, tradeoff, ethics, accessibility, security, operations, and recovery questions that expose shallow mastery.',
        'A prepared product walkthrough is an adequate mastery examination.',
        'strategic',
        'create',
      ],
      [
        'assessment-stop-rule',
        'Set proposal, implementation, validation, and defense gates that can require repair, rescope, defer, or stop before credential claims.',
        'Capstone evaluators should help every started project reach approval.',
        'professional',
        'evaluate',
      ],
    ]
  ),
  productModule(
    'capstone',
    'significant-problem',
    'Significant Problem, Public Value, and Durable Need',
    'A novel technical idea lacks evidence of a consequential recurring problem, reachable affected people, existing alternatives, or value beyond demonstration.',
    'significance and public-value case',
    [
      [
        'significance-evidence',
        'Triangulate direct research, domain artifacts, credible data, existing services, and counterevidence to establish problem significance.',
        'Novel technology makes the addressed problem significant.',
        'strategic',
        'evaluate',
      ],
      [
        'affected-population',
        'Bound affected populations, contexts, frequency, severity, unequal burden, and who is missing from available evidence.',
        'A broad phrase such as everyone establishes product reach.',
        'professional',
        'analyze',
      ],
      [
        'existing-alternative',
        'Study current services, manual workarounds, nonuse, competitors, public infrastructure, and build-nothing options.',
        'Competitor feature lists explain why people use current alternatives.',
        'strategic',
        'analyze',
      ],
      [
        'value-hypothesis',
        'Connect intervention to behavior and outcome through an explicit causal hypothesis with confounders and falsification evidence.',
        'Improved product metrics prove public benefit.',
      ],
      [
        'durability-change',
        'Test whether the need persists under policy, market, technology, organizational, and behavior change across the project horizon.',
        'Current demand guarantees a durable need.',
        'strategic',
        'evaluate',
      ],
    ]
  ),
  productModule(
    'capstone',
    'stakeholders-harms',
    'Stakeholders, Ethics, Accessibility, and Harm Analysis',
    'Primary-user convenience may shift surveillance, labor, exclusion, safety, environmental, or procedural costs onto less visible people.',
    'stakeholder benefit-burden and harm register',
    [
      [
        'stakeholder-power-map',
        'Map benefit, burden, exposure, voice, authority, recourse, and accountability across users and affected non-users.',
        'Stakeholder importance is proportional to purchasing power.',
        'professional',
        'analyze',
      ],
      [
        'ethics-principle-case',
        'Apply public good, harm avoidance, honesty, fairness, privacy, competence, review, and accountability to concrete project conflicts.',
        'Ethics is satisfied by legal compliance.',
        'professional',
        'evaluate',
      ],
      [
        'accessibility-inclusion',
        'Treat disability, language, literacy, device, connectivity, environment, and support needs as core system requirements and research conditions.',
        'Accessibility applies only to the final user interface.',
        'professional',
        'create',
      ],
      [
        'harm-prevention-response',
        'Define prevention, detection, limit, safe failure, appeal, correction, restitution, communication, and retirement for plausible harms.',
        'A terms-of-use warning transfers product harm to the user.',
        'strategic',
        'create',
      ],
      [
        'ethics-review-route',
        'Route domain, legal, accessibility, safety, privacy, or community questions to qualified review and preserve explicit non-claims.',
        'A software team can resolve every domain risk through technical controls.',
        'metacognitive',
        'evaluate',
      ],
    ]
  ),
  productModule(
    'capstone',
    'domain-regulation-license',
    'Domain Evidence, Regulation, Standards, and Licensing Boundaries',
    'The product depends on health, finance, education, civic, creative, or safety assumptions inferred from secondary summaries and incompatible licenses.',
    'domain authority and compliance boundary dossier',
    [
      [
        'authority-hierarchy',
        'Distinguish law, regulation, standard, specification, official guidance, contract, policy, research, convention, and opinion by jurisdiction and authority.',
        'All official-looking web pages impose equivalent requirements.',
        'conceptual',
        'analyze',
      ],
      [
        'version-review-date',
        'Record version, status, jurisdiction, applicability, review date, supersession, and monitoring owner for governing sources.',
        'Linking a source keeps a project current automatically.',
        'professional',
        'create',
      ],
      [
        'qualified-review',
        'Identify decisions requiring legal, safety, clinical, financial, accessibility, security, privacy, or domain expert review.',
        'Adding a disclaimer removes the need for qualified review.',
        'professional',
        'evaluate',
      ],
      [
        'license-compatibility',
        'Trace source, dependency, data, content, model, font, media, and generated-artifact licenses into distribution obligations.',
        'Public availability means unrestricted reuse.',
      ],
      [
        'compliance-nonclaim',
        'Separate implemented controls and collected evidence from formal compliance, certification, approval, or legal conclusions.',
        'Meeting a technical checklist permits a compliance claim.',
        'metacognitive',
        'evaluate',
      ],
    ]
  ),
  productModule(
    'capstone',
    'measurement-baseline',
    'Outcome Measurement, Baselines, Guardrails, and Evaluation Design',
    'The capstone promises impact but relies on vanity metrics, no counterfactual, unclear instrumentation, and post hoc interpretation.',
    'outcome evaluation and measurement protocol',
    [
      [
        'theory-of-change',
        'Model inputs, activities, outputs, short and long outcomes, assumptions, external factors, and possible negative pathways.',
        'A feature roadmap is equivalent to a theory of change.',
        'strategic',
        'create',
      ],
      [
        'operational-measure',
        'Translate each construct into observable measure, population, unit, collection method, timing, uncertainty, and interpretation limit.',
        'Anything quantifiable is a valid measure of the intended construct.',
      ],
      [
        'baseline-comparison',
        'Choose historical, within-subject, benchmark, cohort, staged, qualitative, or build-nothing comparison appropriate to the claim.',
        'Before-and-after change proves the product caused the outcome.',
        'strategic',
        'evaluate',
      ],
      [
        'guardrail-equity',
        'Measure failure, exclusion, burden, privacy, security, accessibility, support, and subgroup differences alongside success.',
        'Aggregate improvement means no group was harmed.',
        'professional',
        'create',
      ],
      [
        'analysis-precommitment',
        'Precommit inclusion, exclusion, missing-data, success, stopping, and interpretation rules before seeing outcome data.',
        'Changing an analysis after seeing results is harmless exploration.',
        'metacognitive',
        'create',
      ],
    ]
  ),
  productModule(
    'capstone',
    'feasibility-options-stop',
    'Feasibility, Alternatives, Risk Experiments, and Stop Decisions',
    'A long capstone plan assumes access to data, users, infrastructure, expertise, approvals, integrations, time, and operating budget that have not been tested.',
    'feasibility proof and alternative decision record',
    [
      [
        'constraint-inventory',
        'Inventory time, skill, access, authority, data, technology, service, policy, cost, support, and maintenance constraints with owners.',
        'Motivation can compensate for every missing project dependency.',
        'strategic',
        'analyze',
      ],
      [
        'alternative-analysis',
        'Compare build, buy, configure, integrate, simplify, manual service, policy change, partnership, and no-build alternatives.',
        'A capstone must involve a new software product to demonstrate mastery.',
        'strategic',
        'evaluate',
      ],
      [
        'risk-experiment',
        'Design the cheapest ethical experiment that distinguishes outcomes for the highest uncertainty and consequence.',
        'A broad proof of concept efficiently tests all major risks.',
      ],
      [
        'feasibility-budget',
        'Estimate development, research, evaluation, accessibility, security, operations, support, contingency, and retirement effort with uncertainty.',
        'Implementation estimates cover the full cost of a product.',
      ],
      [
        'stop-pivot-evidence',
        'Exercise a real stop, rescope, substitute, or pivot decision when evidence crosses a predeclared threshold.',
        'Persistence despite disconfirming evidence demonstrates capstone excellence.',
        'metacognitive',
        'evaluate',
      ],
    ]
  ),
  productModule(
    'capstone',
    'scope-roadmap-risk',
    'Capstone Scope, Dependency Graph, Milestones, and Risk Control',
    'The plan is organized by components and deadlines rather than prerequisite evidence, risk retirement, end-to-end value, and independent assessment gates.',
    'evidence-ordered capstone delivery system',
    [
      [
        'scope-thesis',
        'State the bounded product thesis, users, decision, outcomes, exclusions, quality floor, and credential claims in one falsifiable contract.',
        'A flexible broad vision is better than a bounded capstone thesis.',
        'strategic',
        'create',
      ],
      [
        'competency-dependency',
        'Order new tasks by prerequisite competence and schedule retrieval of earlier skills before their consequential use.',
        'Project tasks can be ordered entirely by implementation convenience.',
        'metacognitive',
        'create',
      ],
      [
        'risk-value-slice',
        'Create vertical milestones that retire a named risk, deliver an affected-user signal, and produce assessable evidence.',
        'A milestone is meaningful when a component is complete.',
      ],
      [
        'critical-path-buffer',
        'Model dependencies, uncertain durations, external waits, integration points, contingency, and explicit scope-release triggers.',
        'Adding more parallel work always shortens the critical path.',
        'strategic',
        'evaluate',
      ],
      [
        'progress-evidence',
        'Track accepted evidence, changed assumptions, blocked claims, forecast, decision latency, quality debt, and residual risk rather than percent complete.',
        'Task completion percentage accurately predicts capstone readiness.',
        'metacognitive',
        'create',
      ],
    ]
  ),
  productModule(
    'capstone',
    'architecture-decisions',
    'Architecture Evaluation, Quality Attributes, and Decision Governance',
    'The capstone architecture diagram shows components but not quality scenarios, trust boundaries, failure containment, evolution, cost, or rejected alternatives.',
    'evaluated architecture and decision governance packet',
    [
      [
        'architecture-viewpoints',
        'Describe context, containers, components, data, deployment, runtime, trust, operations, and ownership views at useful levels.',
        'One box-and-arrow diagram explains an architecture.',
      ],
      [
        'quality-tradeoff',
        'Analyze concrete quality-attribute scenarios and trade accessibility, security, privacy, reliability, performance, modifiability, cost, and simplicity explicitly.',
        'Architecture can maximize every quality attribute simultaneously.',
        'strategic',
        'evaluate',
      ],
      [
        'failure-containment',
        'Define failure domains, resource bounds, dependency timeouts, degraded modes, safe stop, recovery, and blast-radius evidence.',
        'Redundant components automatically contain failure.',
      ],
      [
        'evolution-compatibility',
        'Plan interface, data, deployment, and organizational evolution with compatibility windows, migration, deprecation, and retirement.',
        'A clean internal design makes future compatibility easy.',
      ],
      [
        'architecture-review',
        'Run a structured review with scenarios, alternatives, evidence gaps, dissent, decisions, owners, and timed re-evaluation.',
        'Architecture review is a presentation seeking approval.',
        'professional',
        'evaluate',
      ],
    ]
  ),
  productModule(
    'capstone',
    'data-api-invariants',
    'Data, API, Algorithm, and Domain Invariants',
    'The product has schemas and endpoints but no proof of identity, authorization, concurrency, numerical, algorithmic, lifecycle, or compatibility correctness.',
    'executable domain and interface assurance suite',
    [
      [
        'domain-invariant',
        'Formalize critical identities, states, quantities, relationships, transitions, and impossible conditions in domain language.',
        'Types and schemas express every important invariant.',
      ],
      [
        'runtime-admission',
        'Validate untrusted input for structure, semantics, authorization, limits, normalization, provenance, and version before trusted use.',
        'Well-typed clients make server validation redundant.',
      ],
      [
        'algorithm-correctness-cost',
        'State preconditions, invariant, termination, result, counterexample, complexity, scale boundary, and alternative for consequential algorithms.',
        'Passing representative examples proves an algorithm correct.',
      ],
      [
        'api-behavior-contract',
        'Specify operation semantics, status and error taxonomy, idempotency, pagination, consistency, compatibility, rate, privacy, and observation.',
        'API documentation generated from routes describes complete behavior.',
      ],
      [
        'data-recovery-invariant',
        'Prove backup, restore, migration, replay, reconciliation, and deletion preserve or intentionally transform domain invariants.',
        'Storage-level restore success proves application recovery.',
      ],
    ]
  ),
  productModule(
    'capstone',
    'security-privacy',
    'Threat Modeling, Privacy Engineering, and Abuse-Resistant Design',
    'Security and privacy are represented by authentication, encryption, a scanner, and a policy page without system-specific adversarial evidence.',
    'threat, privacy, and abuse assurance case',
    [
      [
        'threat-model-system',
        'Trace assets, actors, entry points, data flows, trust boundaries, attack paths, controls, detection, response, and residual risk.',
        'A generic threat checklist is a project threat model.',
        'strategic',
        'create',
      ],
      [
        'authorization-proof',
        'Prove deny-by-default resource and action authorization across interface, service, data, cache, job, event, export, and support paths.',
        'Successful authentication proves legitimate access.',
      ],
      [
        'privacy-risk-assessment',
        'Analyze data action, affected people, likelihood, problematic consequence, controls, tradeoffs, and governance across the lifecycle.',
        'Privacy risk equals cybersecurity risk to stored personal data.',
        'professional',
        'evaluate',
      ],
      [
        'abuse-safety-case',
        'Test misuse, automation, fraud, harassment, coercion, unsafe advice, resource exhaustion, evasion, and moderator or operator burden.',
        'Blocking known malicious strings prevents product abuse.',
      ],
      [
        'vulnerability-response',
        'Define reporting, triage, severity, containment, remediation, disclosure, dependency response, verification, and learning ownership.',
        'Applying a patch closes a vulnerability incident.',
        'professional',
        'create',
      ],
    ]
  ),
  productModule(
    'capstone',
    'walking-skeleton-core',
    'Walking Skeleton, Core Domain, and Cumulative Construction',
    'The capstone has extensive infrastructure and design artifacts but no small deployed path proving that user value and all critical engineering gates can coexist.',
    'deployed cumulative capstone core',
    [
      [
        'skeleton-critical-path',
        'Build the smallest end-to-end path through authentic interface, domain, data, deployment, telemetry, accessibility, security, and recovery boundaries.',
        'A mocked demo is enough to validate the delivery system.',
      ],
      [
        'increment-evidence',
        'For each increment, retrieve prior requirements, predict behavior, implement, test accepted and rejected cases, validate with users, and update claims.',
        'Small commits automatically create cumulative learning.',
      ],
      [
        'quality-floor',
        'Keep accessibility, security, privacy, tests, observability, documentation, deployability, and rollback at an explicit floor in every revision.',
        'Quality can be accumulated in a final hardening phase.',
        'professional',
        'create',
      ],
      [
        'defect-causal-repair',
        'Reproduce a defect, preserve evidence, compare hypotheses, identify the first invalid transition, repair cause, add regression, and verify changed cases.',
        'The line changed by a fix identifies the root cause.',
      ],
      [
        'refactoring-governance',
        'Use measured design pressure and protected behavior to choose local refactor, boundary extraction, replacement, or deliberate debt.',
        'Visible duplication always justifies immediate abstraction.',
        'strategic',
        'evaluate',
      ],
    ]
  ),
  productModule(
    'capstone',
    'integrations-resilience',
    'External Integrations, Distributed Effects, and Resilience',
    'The product relies on APIs, queues, models, identity, payments, files, or notifications whose delays, duplication, outages, drift, and policy changes are hidden.',
    'controlled integration and resilience evidence',
    [
      [
        'integration-authority',
        'Document provider purpose, authority, data, credentials, terms, version, quota, availability, cost, accessibility, replacement, and exit boundaries.',
        'An API key and SDK establish permission to use a service.',
      ],
      [
        'adapter-conformance',
        'Wrap external behavior behind owned contracts and test requests, responses, errors, limits, version drift, and semantic mismatch with controlled fixtures.',
        'Using the official SDK guarantees integration correctness.',
      ],
      [
        'distributed-effect',
        'Assign effect identity, idempotency, ordering, concurrency, retry, timeout, unknown-outcome, compensation, and reconciliation rules.',
        'At-least-once delivery becomes exactly once with a deduplication set.',
      ],
      [
        'dependency-degradation',
        'Provide bounded queueing, fallback, cached or reduced behavior, accessible status, safe stop, and recovery when a dependency degrades.',
        'A circuit breaker is a complete resilience strategy.',
      ],
      [
        'vendor-exit',
        'Rehearse export, replacement, key rotation, data deletion, contract termination, user communication, and degraded operation without the provider.',
        'An interface abstraction makes vendor exit inexpensive.',
      ],
    ]
  ),
  productModule(
    'capstone',
    'verification-human-eval',
    'Layered Verification, Human Evaluation, and Claim Calibration',
    'A large automated suite passes, but test data is familiar, accessibility is tool-only, human tasks are scripted, and evidence does not map to impact claims.',
    'multi-method capstone evaluation dossier',
    [
      [
        'claim-test-matrix',
        'Map behavior, quality, risk, outcome, and impact claims to unit, property, contract, integration, system, fault, human, and production evidence.',
        'Every important claim should be covered by an automated test.',
      ],
      [
        'changed-adversarial-case',
        'Generate boundary, malformed, hostile, scale, accessibility, concurrency, failure, and environment cases that differ structurally from teaching examples.',
        'Random inputs automatically create meaningful adversarial tests.',
      ],
      [
        'human-task-study',
        'Run representative tasks with neutral protocol, accommodations, observation, success criteria, breakdown capture, consent, and uncertainty.',
        'Users who eventually finish a task validate usability.',
      ],
      [
        'accessibility-conformance-limit',
        'Combine automated, keyboard, zoom, contrast, content, screen-reader or structured-text, and disabled-user evidence without unsupported conformance claims.',
        'Zero automated violations means the product meets WCAG 2.2.',
        'professional',
        'evaluate',
      ],
      [
        'claim-calibration',
        'Match the strength, population, environment, duration, causality, and certainty of each public claim to the collected evidence.',
        'Cautious wording can make weak evidence acceptable.',
        'metacognitive',
        'evaluate',
      ],
    ]
  ),
  productModule(
    'capstone',
    'performance-operations',
    'Capacity, Observability, Support, and Production Operations',
    'The capstone is feature-complete but has no realistic workload, user-centered service measures, operator workflow, support path, capacity boundary, or incident rehearsal.',
    'operational readiness and capacity case',
    [
      [
        'capacity-model',
        'Model demand, concurrency, data, compute, memory, storage, network, third-party quotas, growth, bursts, and failure reserve with uncertainty.',
        'A successful load test reveals production capacity.',
      ],
      [
        'user-centered-sli',
        'Measure task availability, correctness, latency, freshness, durability, and support from the user boundary and correlate them with system signals.',
        'Infrastructure health metrics are sufficient service indicators.',
      ],
      [
        'telemetry-privacy-cost',
        'Design logs, metrics, traces, profiles, audits, retention, access, redaction, sampling, cardinality, and cost around diagnostic questions.',
        'Recording complete request context is the safest diagnostic approach.',
      ],
      [
        'runbook-operator',
        'Create symptom, impact, evidence, decision, mitigation, escalation, rollback, recovery, communication, and verification runbooks tested by another operator.',
        'A list of commands is an actionable runbook.',
        'professional',
        'create',
      ],
      [
        'incident-game-day',
        'Inject a realistic compound failure, observe detection, triage, communication, containment, recovery, reconciliation, and follow-up under time pressure.',
        'Restoring the happy path completes an incident exercise.',
        'professional',
        'evaluate',
      ],
    ]
  ),
  productModule(
    'capstone',
    'release-recovery',
    'Supply Chain, Deployment, Migration, Backup, and Recovery',
    'The release candidate has unclear source-to-artifact identity, unreviewed components, mutable environments, untested migrations, and backup success without restore proof.',
    'release integrity and clean recovery proof',
    [
      [
        'supply-chain-inventory',
        'Inventory source, dependencies, tools, generated code, models, data, images, services, licenses, vulnerabilities, and maintainers with current ownership.',
        'A dependency scanner inventories the whole product.',
      ],
      [
        'artifact-provenance',
        'Bind protected source and workflow, isolated build, declared inputs, immutable output, SBOM, provenance, signature or attestation, and verification.',
        'A signed artifact is necessarily trustworthy.',
      ],
      [
        'progressive-deployment',
        'Move one reviewed artifact through compatible migration, readiness, bounded exposure, guardrails, hold, abort, promotion, and user communication.',
        'Blue-green infrastructure removes deployment risk.',
      ],
      [
        'clean-restore',
        'Restore into an isolated environment from documented backups, rotate secrets, verify invariants and user workflows, measure recovery objectives, and preserve evidence.',
        'Testing restore over the existing environment proves disaster recovery.',
      ],
      [
        'retirement-plan',
        'Plan export, migration, retention, deletion, dependency shutdown, credential revocation, domain and client behavior, communication, and archive evidence.',
        'A capstone can be abandoned after assessment without lifecycle risk.',
        'professional',
        'create',
      ],
    ]
  ),
  productModule(
    'capstone',
    'documentation-defense',
    'Documentation, Demonstration, Independent Defense, and Reflective Transfer',
    'A polished final presentation shows the product but hides failed hypotheses, human evidence, accessibility, threat decisions, incident recovery, contribution limits, and what remains unproven.',
    'public capstone dossier and independent defense',
    [
      [
        'audience-documentation',
        'Provide affected-user, operator, maintainer, contributor, reviewer, security, accessibility, and decision-maker documentation at appropriate detail.',
        'One comprehensive README serves every audience well.',
        'professional',
        'create',
      ],
      [
        'evidence-demo',
        'Demonstrate ordinary, changed, boundary, inaccessible-before-repair, failure, recovery, rollback, and stakeholder-outcome cases from the reviewed artifact.',
        'A flawless happy-path demo is the most persuasive evidence.',
      ],
      [
        'independent-defense',
        'Answer unseen causal, counterexample, tradeoff, ethics, accessibility, security, data, operations, and transfer questions using inspectable evidence.',
        'Memorizing architecture vocabulary demonstrates independent mastery.',
        'metacognitive',
        'evaluate',
      ],
      [
        'portfolio-claim',
        'Publish selective problem, role, constraints, decisions, implementation, validation, results, limitations, and links without sensitive data or inflated impact.',
        'A portfolio case study should maximize perceived success.',
        'professional',
        'create',
      ],
      [
        'reflective-transfer',
        'Compare initial predictions with outcomes, explain changed mental models, identify retained misconceptions, and design a harder independent transfer task.',
        'Reflection is a chronological summary of completed work.',
        'metacognitive',
        'evaluate',
      ],
    ]
  ),
];

function courseBase({
  id,
  title,
  audience,
  includes,
  excludes,
  nextCourses,
  modules,
  projects,
  examContext,
  prerequisites,
  minimumQuestionBankSize,
}) {
  return finalizeCourse(
    {
      id,
      title,
      version: '2026.07',
      audience: {
        description: audience,
        entryKnowledge: [
          'Independently build, test, debug, document, version, and explain software in at least one supported stack.',
          'Apply semantic responsive web design, accessibility, security, privacy, Git, repository quality gates, and changed-case testing as continuing requirements.',
          'Use prior course artifacts as evidence while distinguishing guided completion from independent mastery.',
        ],
        deviceConstraints: [
          'Modern browser for deterministic evidence-manifest practice; real research, assistive technology, local toolchains, services, deployment, load, security, backup, restore, incident, and production claims require authorized controlled environments and qualified review.',
        ],
        accessibilityAssumptions: commonAccessibility,
      },
      scope: { includes, excludes, nextCourses },
      sources: sharedSources,
      sharedRequirements: [
        'Every activity retrieves the prior problem, stakeholder, affected-user, accessibility, security, privacy, evidence, revision, test, operation, recovery, contribution, and non-claim boundaries before adding complexity.',
        'Browser labs analyze deterministic original evidence manifests only. They never execute learner shell commands, contact research participants or external services, deploy software, access secrets, or claim live accessibility, security, privacy, load, recovery, legal, or production behavior.',
        'Passing work requires a prediction, traceable artifact, deterministic verification, changed and rejected cases, causal diagnosis, repair evidence, affected-user or stakeholder evidence where appropriate, explicit limitations, and an accountable owner.',
      ],
      modules,
      projects,
      examContext,
      minimumQuestionBankSize,
    },
    {
      researchedAt: RESEARCHED_AT,
      prerequisiteCourseIds: prerequisites,
      masteryThresholdPercent: 88,
    }
  );
}

export const personalProjectOneConfig = courseBase({
  id: 'personal-project-1',
  title: 'Independent Product Studio I: Discover, Build, Validate, and Defend',
  audience:
    'Advanced learners ready to retrieve prior programming and web foundations while independently discovering, building, validating, releasing, and defending a small but real stakeholder product.',
  includes: [
    'A complete independent product cycle from readiness audit and ethical discovery through outcomes, prototypes, vertical slices, reproducible repository, architecture, cumulative implementation, inclusive experience, trust evidence, release, recovery, and defense',
    'Original guided, faded, debugging, independent, retrieval, assessment, and transfer work that grades affected-user behavior and evidence rather than code shape',
    'Five materially different public-benefit milestones and one unfamiliar cumulative product defense',
  ],
  excludes: [
    'Copied portfolio tutorials, speculative startup theater, feature-count grading, unsupported impact or compliance claims, sensitive participant disclosure, production experimentation without authority, or treating automated tools as accessibility, security, privacy, recovery, or legal proof',
  ],
  nextCourses: ['personal-project-2'],
  modules: projectOneModules,
  projects: [
    project(
      'pp1-discovery-case',
      'Problem and Affected-User Evidence Case',
      'pp1-ethical-user-research',
      'A local mutual-aid coordinator and people using varied devices and assistive technology',
      'They need a decision-ready problem dossier produced through ethical inclusive research without committing to a solution or exposing participants.',
      [
        'pp1-request-vs-need',
        'pp1-evidence-source-quality',
        'pp1-consent-power',
        'pp1-data-minimization-research',
        'pp1-synthesis-contradiction',
      ]
    ),
    project(
      'pp1-prototype-decision',
      'Riskiest-Assumption Prototype Decision',
      'pp1-hypotheses-prototypes',
      'A public-library service team deciding whether to invest',
      'They need a disposable accessible experiment that distinguishes continue, pivot, and stop decisions for one high-consequence assumption.',
      [
        'pp1-outcome-chain',
        'pp1-guardrail-metric',
        'pp1-assumption-register',
        'pp1-prototype-test',
        'pp1-prototype-disposal',
      ]
    ),
    project(
      'pp1-walking-skeleton',
      'Accessible Reproducible Walking Skeleton',
      'pp1-architecture-data-contracts',
      'A volunteer food-access program and a new maintainer',
      'They need a clean-start repository and smallest end-to-end product path with bounded architecture, data invariants, test, deploy, and recovery signals.',
      [
        'pp1-clean-reproduction',
        'pp1-architecture-driver',
        'pp1-boundary-port',
        'pp1-data-model-invariant',
        'pp1-interface-contract',
      ]
    ),
    project(
      'pp1-inclusive-product',
      'Inclusive Trustworthy Product Increment',
      'pp1-trust-quality',
      'A disability-led community events group',
      'They need a responsive keyboard-complete core workflow with human accessibility, threat, privacy, layered test, fault, and recovery evidence.',
      [
        'pp1-domain-operation',
        'pp1-keyboard-focus',
        'pp1-responsive-reflow',
        'pp1-human-accessibility-eval',
        'pp1-fault-recovery',
      ]
    ),
    project(
      'pp1-public-defense',
      'First Independent Product Release and Defense',
      'pp1-release-defense',
      'An affected-user, accessibility, security, operations, and hiring-review panel',
      'The panel needs a reproducible release, user-outcome evidence, explicit limits, clean restore, failure-aware demonstration, and causal mastery defense.',
      [
        'pp1-user-validation',
        'pp1-artifact-identity-release',
        'pp1-operations-recovery',
        'pp1-documentation-demo',
        'pp1-claim-defense-retro',
      ]
    ),
  ],
  examContext:
    'An unfamiliar small stakeholder product requiring prior-skill retrieval, ethical inclusive discovery, problem and outcome evidence, prototype choice, thin scope, reproducible repository, dependency review, architecture, invariants, responsive accessible interaction, threat and privacy analysis, layered tests, fault recovery, release identity, clean restore, user validation, documentation, demonstration, and independent claim defense.',
  prerequisites: ['python-dsa', 'c-memory-management'],
  minimumQuestionBankSize: 420,
});

export const personalProjectTwoConfig = courseBase({
  id: 'personal-project-2',
  title: 'Independent Product Studio II: Multi-Actor Systems, Delivery, and Operations',
  audience:
    'Learners who have independently shipped and defended one product and are ready to lead a more consequential multi-actor system through collaboration, distributed failure, trusted delivery, operations, migration, and longitudinal validation.',
  includes: [
    'A second independent product cycle that begins with maintenance reality and advances through multi-actor service design, co-design, workflow state, architecture, data lifecycle, identity, authorization, resilience, governance, operations, capacity, trusted delivery, migration, recovery, and longitudinal evidence',
    'Explicit collaboration and personal-contribution evidence plus five different team and operations milestones',
    'Changed-context tasks that require stronger system, human, and operating evidence than the first studio',
  ],
  excludes: [
    'A renamed or merely larger first project, microservices by default, feature velocity as mastery, simulated teamwork presented as real collaboration, unbounded administrator power, exactly-once claims without evidence, or production, compliance, accessibility, security, and recovery overclaims',
  ],
  nextCourses: ['capstone-project'],
  modules: projectTwoModules,
  projects: [
    project(
      'pp2-service-reframe',
      'Multi-Actor Service Reframe',
      'pp2-codesign-equity',
      'End users, case workers, administrators, support staff, and affected non-users of a community referral service',
      'They need a maintenance audit, conflicting outcome map, accessible co-design process, and accountable decision record before any sequel scope.',
      [
        'pp2-production-vs-demo',
        'pp2-actor-system-map',
        'pp2-outcome-conflict',
        'pp2-participation-level',
        'pp2-feedback-accountability',
      ]
    ),
    project(
      'pp2-workflow-foundation',
      'Auditable Multi-Actor Workflow Foundation',
      'pp2-data-lifecycle',
      'A regional equipment-lending network with member and staff handoffs',
      'They need authorized conflict-aware state transitions, evolvable interfaces, governed records, compatible migration, and recovery evidence.',
      [
        'pp2-state-transition-table',
        'pp2-concurrent-transition',
        'pp2-interface-evolution',
        'pp2-schema-evolution',
        'pp2-data-reconciliation',
      ]
    ),
    project(
      'pp2-trust-resilience',
      'Tenant-Isolated Resilient Service',
      'pp2-distributed-correctness',
      'Several independent community organizations sharing one service',
      'They need accessible authentication recovery, deny-by-default tenant isolation, abuse resistance, idempotent effects, and fault reconciliation.',
      [
        'pp2-account-recovery',
        'pp2-server-enforcement',
        'pp2-tenant-isolation',
        'pp2-idempotent-effect',
        'pp2-resilience-recovery',
      ]
    ),
    project(
      'pp2-operating-system',
      'Collaborative Product Operations System',
      'pp2-performance-cost',
      'A distributed contributor and on-call group',
      'They need risk-based review, traceable handoffs, user-centered service levels, privacy-safe telemetry, accessible support, incident learning, and bounded overload.',
      [
        'pp2-review-contract',
        'pp2-governance-health',
        'pp2-service-level-objective',
        'pp2-incident-learning',
        'pp2-overload-policy',
      ]
    ),
    project(
      'pp2-transition-defense',
      'Trusted Release, Migration, and Advanced Team Defense',
      'pp2-migration-validation-defense',
      'A joint user, operator, contributor, accessibility, security, finance, and governance board',
      'The board needs immutable provenance, component inventory, progressive release, migration and clean restore, longitudinal outcomes, and honest personal and team evidence.',
      [
        'pp2-source-build-provenance',
        'pp2-component-inventory',
        'pp2-progressive-release',
        'pp2-backup-restore',
        'pp2-team-evidence-defense',
      ]
    ),
  ],
  examContext:
    'An unfamiliar multi-actor product with prior-product audit, conflicting outcomes, co-design and equity, authorized workflow state, architecture alternatives, interface evolution, data migration, authentication and recovery, tenant isolation, abuse, idempotency, partial failure, collaboration governance, service levels, telemetry, support, incident response, capacity, cost, supply-chain provenance, progressive deployment, migration, restore, longitudinal validation, and personal plus team defense.',
  prerequisites: ['personal-project-1'],
  minimumQuestionBankSize: 500,
});

export const capstoneProjectConfig = courseBase({
  id: 'capstone-project',
  title: 'Institution-Grade Computing Capstone: Evidence, Impact, Operations, and Defense',
  audience:
    'Graduating learners ready to synthesize the full platform into a consequential, independently governed capstone whose technical, human, ethical, operational, and impact claims survive changed cases and an unseen defense.',
  includes: [
    'A gated capstone from mastery contract and significant problem evidence through ethics, standards, outcome evaluation, feasibility, roadmap, architecture, domain invariants, security and privacy, cumulative construction, integration resilience, layered human evaluation, operations, trusted release, clean recovery, retirement, public documentation, and unseen defense',
    'Competency evidence that distinguishes personal work, assistance, collaboration, automated structure, runtime behavior, affected-user evidence, controlled operations, and remaining non-claims',
    'Five defense milestones and a cumulative unfamiliar examination suitable for institution-grade completion review',
  ],
  excludes: [
    'A code-volume contest, copied capstone brief, demo-only assessment, invented participants or impact, undisclosed generated work, automated compliance or accessibility certification, production access without authority, legal or domain conclusions without qualified review, or credential approval before every evidence gate passes',
  ],
  nextCourses: ['job-search'],
  modules: capstoneModules,
  projects: [
    project(
      'capstone-proposal-defense',
      'Capstone Proposal and Significance Defense',
      'capstone-stakeholders-harms',
      'An affected-community, ethics, accessibility, and academic review panel',
      'The panel needs a traceable mastery contract, significant durable problem case, stakeholder power map, benefit-burden evidence, harm controls, and explicit review routes.',
      [
        'capstone-competency-claim-map',
        'capstone-significance-evidence',
        'capstone-value-hypothesis',
        'capstone-stakeholder-power-map',
        'capstone-ethics-review-route',
      ]
    ),
    project(
      'capstone-evidence-plan',
      'Outcome, Feasibility, and Stop-Gate Review',
      'capstone-feasibility-options-stop',
      'A sponsor, affected-user representative, research reviewer, and delivery lead',
      'They need precommitted outcome and guardrail measures, realistic alternatives, risk experiments, full-cost feasibility, and exercised stop or pivot rules.',
      [
        'capstone-theory-of-change',
        'capstone-baseline-comparison',
        'capstone-analysis-precommitment',
        'capstone-alternative-analysis',
        'capstone-stop-pivot-evidence',
      ]
    ),
    project(
      'capstone-architecture-core',
      'Architecture and Cumulative Core Defense',
      'capstone-walking-skeleton-core',
      'A cross-functional architecture, data, accessibility, security, and maintainability board',
      'They need evidence-ordered milestones, quality tradeoffs, domain and API invariants, threat and privacy proof, and a deployed walking skeleton that preserves the quality floor.',
      [
        'capstone-risk-value-slice',
        'capstone-quality-tradeoff',
        'capstone-domain-invariant',
        'capstone-privacy-risk-assessment',
        'capstone-skeleton-critical-path',
      ]
    ),
    project(
      'capstone-evaluation-operations',
      'Resilience, Human Evaluation, and Operations Game Day',
      'capstone-performance-operations',
      'Affected users, operators, support staff, accessibility reviewers, and reliability reviewers',
      'They need controlled integration failures, calibrated human and accessibility evidence, realistic capacity, user-centered telemetry, tested runbooks, and a compound incident recovery.',
      [
        'capstone-distributed-effect',
        'capstone-human-task-study',
        'capstone-accessibility-conformance-limit',
        'capstone-user-centered-sli',
        'capstone-incident-game-day',
      ]
    ),
    project(
      'capstone-final-defense',
      'Trusted Release, Recovery, Public Dossier, and Unseen Defense',
      'capstone-documentation-defense',
      'An independent academic, user, engineering, ethics, accessibility, security, operations, and career panel',
      'The panel needs one provenance-bound release, progressive deployment, clean restore, retirement path, evidence-rich demonstration, calibrated portfolio claims, unseen causal answers, and reflective transfer.',
      [
        'capstone-artifact-provenance',
        'capstone-progressive-deployment',
        'capstone-clean-restore',
        'capstone-independent-defense',
        'capstone-reflective-transfer',
      ]
    ),
  ],
  examContext:
    'An unfamiliar consequential capstone challenge requiring competency evidence architecture, independence disclosure, significant problem and affected-population proof, public value, ethics and harms, accessibility and inclusion, governing source authority, licensing, theory of change, measurement and guardrails, alternatives and feasibility, exercised stop decisions, evidence-ordered scope, architecture quality tradeoffs, domain and API invariants, algorithm evidence, threat and privacy engineering, cumulative implementation, integration resilience, layered automated and human evaluation, claim calibration, capacity, telemetry, support, incident game day, component inventory, provenance, progressive release, clean restore, retirement, audience documentation, changed and failure demonstrations, unseen defense, and reflective transfer.',
  prerequisites: ['personal-project-2'],
  minimumQuestionBankSize: 620,
});

export const portfolioProjectCourseConfigs = [
  personalProjectOneConfig,
  personalProjectTwoConfig,
  capstoneProjectConfig,
];

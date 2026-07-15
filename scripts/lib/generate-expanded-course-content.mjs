import { mkdir, readdir, readFile, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import {
  aiAgentPythonEvidenceContract,
  aiAgentPythonScenario,
  aiAgentPythonWorkedExample,
} from './ai-agent-python-evidence-contracts.mjs';
import {
  asteroidsPythonEvidenceContract,
  asteroidsPythonScenario,
  asteroidsPythonWorkedExample,
} from './asteroids-python-evidence-contracts.mjs';
import {
  blogAggregatorGoEvidenceContract,
  blogAggregatorGoScenario,
  blogAggregatorGoWorkedExample,
} from './blog-aggregator-go-evidence-contracts.mjs';
import {
  blogAggregatorTypescriptEvidenceContract,
  blogAggregatorTypescriptScenario,
  blogAggregatorTypescriptWorkedExample,
} from './blog-aggregator-typescript-evidence-contracts.mjs';
import {
  bookbotPythonEvidenceContract,
  bookbotPythonScenario,
  bookbotPythonWorkedExample,
} from './bookbot-python-evidence-contracts.mjs';
import {
  cMemoryManagementEvidenceContract,
  cMemoryManagementScenario,
  cMemoryManagementWorkedExample,
} from './c-memory-management-evidence-contracts.mjs';
import { cicdEvidenceContract, cicdWorkedExample } from './cicd-evidence-contracts.mjs';
import {
  cryptographyGoEvidenceContract,
  cryptographyGoScenario,
  cryptographyGoWorkedExample,
} from './cryptography-go-evidence-contracts.mjs';
import { dockerEvidenceContract, dockerWorkedExample } from './docker-evidence-contracts.mjs';
import {
  fileServersS3GoEvidenceContract,
  fileServersS3GoScenario,
  fileServersS3GoWorkedExample,
} from './file-servers-s3-go-evidence-contracts.mjs';
import {
  fileServersS3TypescriptEvidenceContract,
  fileServersS3TypescriptScenario,
  fileServersS3TypescriptWorkedExample,
} from './file-servers-s3-typescript-evidence-contracts.mjs';
import {
  gitAdvancedEvidenceContract,
  gitAdvancedScenario,
  gitAdvancedWorkedExample,
} from './git-advanced-evidence-contracts.mjs';
import { httpEvidenceContract } from './http-evidence-contracts.mjs';
import {
  httpProtocolGoEvidenceContract,
  httpProtocolGoScenario,
  httpProtocolGoWorkedExample,
} from './http-protocol-go-evidence-contracts.mjs';
import {
  httpServerGoEvidenceContract,
  httpServerGoScenario,
  httpServerGoWorkedExample,
} from './http-server-go-evidence-contracts.mjs';
import {
  httpServerTypescriptEvidenceContract,
  httpServerTypescriptScenario,
  httpServerTypescriptWorkedExample,
} from './http-server-typescript-evidence-contracts.mjs';
import {
  kubernetesEvidenceContract,
  kubernetesWorkedExample,
} from './kubernetes-evidence-contracts.mjs';
import {
  mazePythonEvidenceContract,
  mazePythonScenario,
  mazePythonWorkedExample,
} from './maze-python-evidence-contracts.mjs';
import {
  pokedexGoEvidenceContract,
  pokedexGoScenario,
  pokedexGoWorkedExample,
} from './pokedex-go-evidence-contracts.mjs';
import {
  pokedexTypescriptEvidenceContract,
  pokedexTypescriptScenario,
  pokedexTypescriptWorkedExample,
} from './pokedex-typescript-evidence-contracts.mjs';
import {
  rabbitmqGoEvidenceContract,
  rabbitmqGoScenario,
  rabbitmqGoWorkedExample,
} from './rabbitmq-go-evidence-contracts.mjs';
import {
  rabbitmqTypescriptEvidenceContract,
  rabbitmqTypescriptScenario,
  rabbitmqTypescriptWorkedExample,
} from './rabbitmq-typescript-evidence-contracts.mjs';
import {
  ragPythonEvidenceContract,
  ragPythonScenario,
  ragPythonWorkedExample,
} from './rag-python-evidence-contracts.mjs';
import {
  staticSitePythonEvidenceContract,
  staticSitePythonScenario,
  staticSitePythonWorkedExample,
} from './static-site-python-evidence-contracts.mjs';
import {
  webScraperGoEvidenceContract,
  webScraperGoScenario,
  webScraperGoWorkedExample,
} from './web-scraper-go-evidence-contracts.mjs';
import {
  webScraperPythonEvidenceContract,
  webScraperPythonScenario,
  webScraperPythonWorkedExample,
} from './web-scraper-python-evidence-contracts.mjs';
import {
  webScraperTypescriptEvidenceContract,
  webScraperTypescriptScenario,
  webScraperTypescriptWorkedExample,
} from './web-scraper-typescript-evidence-contracts.mjs';

const STOP_WORDS = new Set([
  'about',
  'after',
  'against',
  'before',
  'between',
  'create',
  'define',
  'demonstrate',
  'distinguish',
  'every',
  'explain',
  'identify',
  'implement',
  'rather',
  'should',
  'through',
  'under',
  'without',
  'with',
  'from',
  'into',
  'that',
  'their',
  'this',
  'when',
  'where',
  'which',
  'while',
  'using',
]);

const ACTIVITY_LABELS = {
  c: {
    theory: ['Memory Trace', 'Object-Lifetime Lens', 'C Contract Brief', 'Failure Case'],
    workshop: ['C Memory Workbench', 'Guided Pointer Studio', 'Lifetime Workshop'],
    debug: ['Memory Repair Bay', 'Pointer Forensics', 'Undefined-Behavior Triage'],
    lab: ['Changed-Lifetime Lab', 'Independent C Trial', 'Native Transfer Build'],
    review: ['Memory Retrieval', 'Invariant Recall', 'Spiral Systems Review'],
    quiz: ['C Scenario Checkpoint', 'Memory-Safety Defense', 'Mastery Check'],
    project: ['Stakeholder Native Systems Mission'],
    exam: ['C Memory-Safety Defense Board'],
  },
  linux: {
    theory: ['Terminal Trace', 'System Lens', 'Command Brief', 'Operations Case'],
    workshop: ['Linux Operations Room', 'Guided Terminal Studio', 'Command Workshop'],
    debug: ['Incident Repair Bay', 'System Forensics', 'Terminal Failure Triage'],
    lab: ['Changed-Host Lab', 'Independent Operations Trial', 'Transfer Runbook'],
    review: ['Command Retrieval', 'Operations Recall', 'Spiral Review'],
    quiz: ['Terminal Checkpoint', 'Operations Defense', 'Mastery Check'],
    project: ['Linux Stakeholder Mission'],
    exam: ['Linux Operations Board'],
  },
  git: {
    theory: ['Repository Trace', 'Graph Lens', 'History Brief', 'Recovery Case'],
    workshop: ['Git Collaboration Room', 'Guided Repository Studio', 'History Workshop'],
    debug: ['Repository Repair Bay', 'Graph Forensics', 'Conflict Triage'],
    lab: ['Changed-History Lab', 'Independent Repository Trial', 'Collaboration Transfer'],
    review: ['Graph Retrieval', 'Command Recall', 'Spiral Review'],
    quiz: ['Repository Checkpoint', 'History Defense', 'Mastery Check'],
    project: ['Git Stakeholder Mission'],
    exam: ['Repository Operations Board'],
  },
  typescript: {
    theory: ['Type-System Trace', 'Contract Lens', 'Inference Brief', 'Compiler Case'],
    workshop: ['TypeScript Build Room', 'Guided Contract Studio', 'Narrowing Workshop'],
    debug: ['Diagnostic Repair Bay', 'Type Forensics', 'Boundary Failure Triage'],
    lab: ['Changed-Schema Lab', 'Independent Type Trial', 'Transfer Build'],
    review: ['Retrieval Circuit', 'Type Recall', 'Spiral Review'],
    quiz: ['Scenario Checkpoint', 'Contract Defense', 'Mastery Check'],
    project: ['Stakeholder TypeScript Mission'],
    exam: ['TypeScript 7 Performance Board'],
  },
  javascript: {
    theory: ['Runtime Trace', 'Language Lens', 'Behavior Brief', 'Semantics Case'],
    workshop: ['JavaScript Build Room', 'Guided Runtime Studio', 'Behavior Workshop'],
    debug: ['Console Repair Bay', 'State Forensics', 'Async Failure Triage'],
    lab: ['Changed-Input Lab', 'Independent Script Trial', 'Transfer Build'],
    review: ['Retrieval Circuit', 'Runtime Recall', 'Spiral Review'],
    quiz: ['Scenario Checkpoint', 'Code Defense', 'Mastery Check'],
    project: ['Stakeholder JavaScript Mission'],
    exam: ['JavaScript Performance Board'],
  },
  sql: {
    theory: ['Query Trace', 'Relational Lens', 'Data Contract Brief', 'Result-Grain Case'],
    workshop: ['SQL Query Room', 'Guided Data Studio', 'Relational Workshop'],
    debug: ['Query Repair Bay', 'Cardinality Forensics', 'Integrity Triage'],
    lab: ['Changed-Data Lab', 'Independent Query Trial', 'Data-System Transfer'],
    review: ['Query Retrieval', 'Relational Recall', 'Spiral Data Review'],
    quiz: ['SQL Scenario Checkpoint', 'Data-System Defense', 'Mastery Check'],
    project: ['Stakeholder Data Mission'],
    exam: ['SQL Performance Board'],
  },
  go: {
    theory: ['Execution Trace', 'Language Lens', 'Runtime Contract', 'Go Semantics Case'],
    workshop: ['Go Build Room', 'Guided Systems Studio', 'Concurrent Code Workshop'],
    debug: ['Failure Repair Bay', 'Goroutine Forensics', 'Contract Triage'],
    lab: ['Changed-Input Lab', 'Independent Go Trial', 'Systems Transfer'],
    review: ['Go Retrieval', 'Runtime Recall', 'Spiral Systems Review'],
    quiz: ['Go Scenario Checkpoint', 'Program Defense', 'Mastery Check'],
    project: ['Stakeholder Go Mission'],
    exam: ['Go 1.26 Performance Board'],
  },
  python: {
    theory: ['Runtime Lens', 'Language Clinic', 'Program Brief', 'Behavior Case'],
    workshop: ['Python Build Room', 'Guided Program Studio', 'Contract Workshop'],
    debug: ['Traceback Repair Bay', 'Program Forensics', 'Failure Triage'],
    lab: ['Changed-Input Lab', 'Independent Program Trial', 'Transfer Build'],
    review: ['Retrieval Circuit', 'Code Recall', 'Spiral Review'],
    quiz: ['Scenario Checkpoint', 'Program Defense', 'Mastery Check'],
    project: ['Stakeholder Software Mission'],
    exam: ['Python Certification Board'],
  },
  network: {
    theory: ['Packet Lens', 'Protocol Clinic', 'Operations Brief', 'Incident Case'],
    workshop: ['Network Control Room', 'Guided Evidence Lab', 'Operations Workshop'],
    debug: ['Incident Repair Bay', 'Packet Forensics', 'Fault Triage'],
    lab: ['Changed-Topology Lab', 'Independent Network Trial', 'Transfer Incident'],
    review: ['Retrieval Circuit', 'Protocol Recall', 'Spiral Review'],
    quiz: ['PBQ Checkpoint', 'Incident Defense', 'Mastery Check'],
    project: ['Network Stakeholder Mission'],
    exam: ['N10-009 Certification Board'],
  },
  support: {
    theory: ['Support Evidence Lens', 'Device-State Clinic', 'Service Brief', 'Incident Case'],
    workshop: ['Support Workbench', 'Guided Service Studio', 'Evidence Workshop'],
    debug: ['Incident Repair Bay', 'Device Forensics', 'Fault-Isolation Clinic'],
    lab: ['Changed-Device Lab', 'Independent Support Trial', 'Service Transfer'],
    review: ['Support Retrieval', 'Causal Recall', 'Spiral Incident Review'],
    quiz: ['PBQ Checkpoint', 'Support Decision Defense', 'Mastery Check'],
    project: ['Stakeholder Support Mission'],
    exam: ['A+ V15 Support Defense Board'],
  },
  functional: {
    theory: ['Transformation Lens', 'Effects Clinic', 'Pipeline Brief', 'Evaluation Trace'],
    workshop: ['Pipeline Foundry', 'Composition Studio', 'Iterator Workshop'],
    debug: ['Side-Effect Repair Bay', 'Lazy Trace Forensics', 'Pipeline Triage'],
    lab: ['Changed-Stream Lab', 'Independent Transformation Trial', 'Composition Transfer'],
    review: ['Equational Recall', 'Pipeline Retrieval', 'Spiral Review'],
    quiz: ['Transformation Checkpoint', 'Effects Defense', 'Mastery Check'],
    project: ['Functional Systems Mission'],
    exam: ['Functional Design Board'],
  },
  algorithms: {
    theory: ['Invariant Lens', 'Cost-Model Clinic', 'Structure Brief', 'Execution Trace'],
    workshop: ['Algorithm Workbench', 'Data-Structure Studio', 'Proof Workshop'],
    debug: ['Counterexample Repair Bay', 'Complexity Forensics', 'Invariant Triage'],
    lab: ['Adversarial-Input Lab', 'Independent Algorithm Trial', 'Scale Transfer'],
    review: ['Trace Retrieval', 'Invariant Recall', 'Spiral Review'],
    quiz: ['Complexity Checkpoint', 'Correctness Defense', 'Mastery Check'],
    project: ['Algorithm Stakeholder Mission'],
    exam: ['Algorithm Design Board'],
  },
  math: {
    theory: ['Model Lens', 'Quantity Clinic', 'Decision Notebook', 'Worked Case'],
    workshop: ['Guided Modeling Studio', 'Calculation Build', 'Evidence Workshop'],
    debug: ['Model Repair Bay', 'Error Forensics', 'Assumption Clinic'],
    lab: ['Unfamiliar Decision Lab', 'Independent Model Trial', 'Transfer Challenge'],
    review: ['Retrieval Circuit', 'Mixed Practice Return', 'Spiral Review'],
    quiz: ['Scenario Checkpoint', 'Decision Defense', 'Mastery Check'],
    project: ['Stakeholder Model Mission'],
    exam: ['Cumulative Modeling Board'],
  },
  prompt: {
    theory: ['Prompt Lens', 'Contract Clinic', 'Evaluation Brief', 'Failure Case'],
    workshop: ['Prompt Forge', 'Guided Eval Studio', 'Contract Workshop'],
    debug: ['Regression Repair Bay', 'Prompt Forensics', 'Failure Triage'],
    lab: ['Changed-Case Lab', 'Independent Prompt Trial', 'Transfer Evaluation'],
    review: ['Retrieval Circuit', 'Eval Recall', 'Spiral Review'],
    quiz: ['Scenario Checkpoint', 'Prompt Defense', 'Mastery Check'],
    project: ['Production Prompt Mission'],
    exam: ['Cross-Agent Certification Board'],
  },
  loops: {
    theory: ['Control-Loop Lens', 'State Clinic', 'Goal Brief', 'Failure Case'],
    workshop: ['Agent Control Room', 'Guided Harness Build', 'State Workshop'],
    debug: ['Recovery Bay', 'Loop Forensics', 'Incident Triage'],
    lab: ['Fault-Injection Lab', 'Independent Harness Trial', 'Transfer Run'],
    review: ['Retrieval Circuit', 'Operations Recall', 'Spiral Review'],
    quiz: ['Scenario Checkpoint', 'Control Defense', 'Mastery Check'],
    project: ['Durable Agent Mission'],
    exam: ['Agent Operations Board'],
  },
  skills: {
    theory: ['Extension Lens', 'Protocol Clinic', 'Skill Brief', 'Threat Case'],
    workshop: ['Skill Foundry', 'MCP Build Room', 'Integration Workshop'],
    debug: ['Protocol Repair Bay', 'Trigger Forensics', 'Integration Triage'],
    lab: ['Cross-Client Lab', 'Independent Server Trial', 'Transfer Build'],
    review: ['Retrieval Circuit', 'Protocol Recall', 'Spiral Review'],
    quiz: ['Scenario Checkpoint', 'Design Defense', 'Mastery Check'],
    project: ['Extension System Mission'],
    exam: ['Skills and MCP Review Board'],
  },
  gates: {
    theory: ['Gate Lens', 'Policy Clinic', 'Risk Brief', 'Failure Case'],
    workshop: ['Repository Factory', 'Guided Gate Build', 'Policy Workshop'],
    debug: ['Broken-Build Bay', 'Gate Forensics', 'Signal Triage'],
    lab: ['Clean-Machine Lab', 'Independent Template Trial', 'Transfer Build'],
    review: ['Retrieval Circuit', 'Policy Recall', 'Spiral Review'],
    quiz: ['Scenario Checkpoint', 'Gate Defense', 'Mastery Check'],
    project: ['Repository Template Mission'],
    exam: ['Quality Engineering Board'],
  },
  portfolio: {
    theory: [
      'Decision Evidence Lens',
      'Stakeholder Case',
      'Product Reasoning Brief',
      'Claim Audit',
    ],
    workshop: ['Product Evidence Studio', 'Guided Vertical Slice', 'Stakeholder Workshop'],
    debug: ['Claim Repair Board', 'Product Forensics', 'Evidence Triage'],
    lab: ['Changed-Stakeholder Lab', 'Independent Product Trial', 'Transfer Studio'],
    review: ['Decision Retrieval', 'Evidence Recall', 'Cumulative Product Review'],
    quiz: ['Product Scenario Checkpoint', 'Claim Defense', 'Mastery Review'],
    project: ['Stakeholder Product Defense'],
    exam: ['Independent Product Review Board'],
  },
  career: {
    theory: ['Hiring Decision Lens', 'Career Evidence Case', 'Opportunity Brief', 'Claim Audit'],
    workshop: ['Career Campaign Studio', 'Guided Evidence Sprint', 'Hiring Practice Room'],
    debug: ['Application Repair Board', 'Hiring Signal Forensics', 'Career Evidence Triage'],
    lab: ['Changed-Candidate Lab', 'Independent Career Trial', 'Opportunity Transfer Studio'],
    review: ['Career Decision Retrieval', 'Evidence Recall', 'Cumulative Campaign Review'],
    quiz: ['Hiring Scenario Checkpoint', 'Career Claim Defense', 'Decision Mastery Review'],
    project: ['Career Campaign Defense'],
    exam: ['Independent Career Launch Board'],
  },
  docker: {
    theory: [
      'Container Boundary Trace',
      'Image and Runtime Lens',
      'Docker Systems Brief',
      'Delivery Case',
    ],
    workshop: ['Docker Build Room', 'Guided Container Studio', 'Release Workshop'],
    debug: ['Container Repair Bay', 'Layer and Runtime Forensics', 'Deployment Triage'],
    lab: ['Changed-Environment Lab', 'Independent Container Trial', 'Operations Transfer'],
    review: ['Docker Retrieval', 'Runtime and Build Recall', 'Spiral Delivery Review'],
    quiz: ['Docker Scenario Checkpoint', 'Container-System Defense', 'Mastery Check'],
    project: ['Stakeholder Container Mission'],
    exam: ['Docker Production Defense Board'],
  },
  kubernetes: {
    theory: ['Control-Plane Trace', 'API Object Lens', 'Reconciliation Brief', 'Cluster Case'],
    workshop: ['Kubernetes Operations Room', 'Guided Manifest Studio', 'Platform Workshop'],
    debug: ['Cluster Repair Bay', 'Object and Event Forensics', 'Reconciliation Triage'],
    lab: ['Changed-Cluster Lab', 'Independent Platform Trial', 'Operations Transfer'],
    review: ['Kubernetes Retrieval', 'API and Operations Recall', 'Spiral Platform Review'],
    quiz: ['Kubernetes Scenario Checkpoint', 'Platform-System Defense', 'Mastery Check'],
    project: ['Stakeholder Platform Mission'],
    exam: ['Kubernetes Production Defense Board'],
  },
  cicd: {
    theory: [
      'Delivery-System Trace',
      'Workflow Trust Lens',
      'Release Evidence Brief',
      'Automation Case',
    ],
    workshop: ['CI/CD Control Room', 'Guided Workflow Studio', 'Release Engineering Workshop'],
    debug: ['Pipeline Repair Bay', 'Run and Artifact Forensics', 'Delivery Incident Triage'],
    lab: ['Changed-Repository Lab', 'Independent Delivery Trial', 'Production Transfer'],
    review: ['CI/CD Retrieval', 'Workflow and Release Recall', 'Spiral Delivery Review'],
    quiz: ['CI/CD Scenario Checkpoint', 'Delivery-System Defense', 'Mastery Check'],
    project: ['Stakeholder Delivery Mission'],
    exam: ['Production Delivery Defense Board'],
  },
};

function familyFor(courseId) {
  if (courseId === 'comptia-a-plus') return 'support';
  if (courseId === 'job-search') return 'career';
  if (['personal-project-1', 'personal-project-2', 'capstone-project'].includes(courseId))
    return 'portfolio';
  if (courseId === 'build-web-scraper-go') return 'go';
  if (courseId === 'build-web-scraper-typescript') return 'typescript';
  if (courseId === 'build-blog-aggregator-go') return 'go';
  if (courseId === 'build-blog-aggregator-typescript') return 'typescript';
  if (courseId === 'build-pokedex-go') return 'go';
  if (courseId === 'build-pokedex-typescript') return 'typescript';
  if (courseId === 'build-ai-agent-python') return 'python';
  if (courseId === 'build-web-scraper-python') return 'python';
  if (courseId === 'build-maze-solver-python') return 'python';
  if (courseId === 'build-asteroids-python') return 'python';
  if (courseId === 'build-bookbot-python') return 'python';
  if (courseId === 'build-static-site-python') return 'python';
  if (courseId === 'c-memory-management') return 'c';
  if (courseId === 'cryptography-go') return 'go';
  if (courseId === 'rag-retrieval-augmented-generation') return 'python';
  if (courseId === 'file-servers-s3-typescript') return 'typescript';
  if (courseId === 'file-servers-s3-go') return 'go';
  if (courseId === 'pubsub-rabbitmq-go') return 'go';
  if (courseId === 'pubsub-rabbitmq-typescript') return 'typescript';
  if (courseId === 'http-protocol-go') return 'go';
  if (courseId === 'http-servers-go') return 'go';
  if (courseId === 'http-servers-typescript') return 'typescript';
  if (courseId === 'http-clients-go') return 'go';
  if (courseId === 'http-clients-typescript') return 'typescript';
  if (courseId === 'http-clients-python') return 'python';
  if (courseId === 'docker-basics') return 'docker';
  if (courseId === 'kubernetes-basics') return 'kubernetes';
  if (courseId === 'cicd-github-actions') return 'cicd';
  if (courseId === 'linux-basics') return 'linux';
  if (courseId === 'git-basics') return 'git';
  if (courseId === 'git-advanced') return 'git';
  if (courseId === 'typescript-basics') return 'typescript';
  if (courseId === 'javascript-basics') return 'javascript';
  if (courseId === 'go-basics') return 'go';
  if (courseId === 'sql-basics') return 'sql';
  if (courseId.startsWith('applied-mathematics')) return 'math';
  if (courseId === 'python-functional') return 'functional';
  if (courseId === 'python-dsa' || courseId === 'python-dsa-2') return 'algorithms';
  if (courseId.startsWith('python-')) return 'python';
  if (courseId === 'comptia-network-plus') return 'network';
  if (courseId === 'prompt-engineering-claude-codex') return 'prompt';
  if (courseId === 'agent-loops-goals') return 'loops';
  if (courseId === 'agent-skills-mcp') return 'skills';
  return 'gates';
}

function hash(value) {
  let result = 2166136261;
  for (const character of value) {
    result ^= character.charCodeAt(0);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
}

function unique(values) {
  return [...new Set(values)];
}

const PORTFOLIO_CASES = {
  'pp1-readiness-evidence':
    'A learner claims independent mastery from guided exercises, but a changed environment breaks the artifact and the evidence ledger has no dated reproduction.',
  'pp1-problem-discovery':
    'A neighborhood service requests a mobile app while observed handoffs suggest the delay comes from policy, language access, and incomplete intake information.',
  'pp1-ethical-user-research':
    'A research plan recruits only friends, records full sessions indefinitely, and excludes participants who need captions, flexible timing, or nonvisual materials.',
  'pp1-outcomes-success':
    'A team targets engagement growth without a baseline, causal path, burden guardrail, or threshold for stopping a harmful direction.',
  'pp1-hypotheses-prototypes':
    'A polished coded prototype appears persuasive, but it tests no predeclared assumption and quietly becomes production code after one positive comment.',
  'pp1-scope-roadmap':
    'A six-week backlog completes database, API, and interface layers separately while no affected user can finish one end-to-end task.',
  'pp1-repository-toolchain':
    'A promising product works only in a warm local directory with floating dependencies, an exposed sample token, unclear license, and no recovery anchor.',
  'pp1-architecture-data-contracts':
    'Framework handlers mutate shared records and call storage and services directly, making one changed rule require edits across the product.',
  'pp1-incremental-core':
    'A large feature branch presents plausible screens but cannot demonstrate an invariant, rejected transition, deployable slice, or causal defect repair.',
  'pp1-inclusive-experience':
    'The primary workflow works by mouse at one desktop width but loses reading order, focus, status, error recovery, and meaning under changed access needs.',
  'pp1-trust-quality':
    'A familiar happy-path test passes while hostile input, duplicate action, partial write, privacy deletion, dependency timeout, and restart remain unexamined.',
  'pp1-release-defense':
    'A polished developer-machine demo has no immutable artifact identity, clean setup, user-outcome evidence, restored backup, explicit limit, or unseen defense.',
  'pp2-prior-product-audit':
    'A first product has dependency drift, support burden, unresolved accessibility feedback, stale assumptions, and pressure for a feature-rich sequel.',
  'pp2-multi-actor-discovery':
    'End users, operators, administrators, support staff, and affected non-users disagree about speed, control, workload, privacy, and recourse.',
  'pp2-codesign-equity':
    'Affected people are invited after scope is fixed, receive inaccessible materials, and never learn which input changed the decision.',
  'pp2-workflow-state':
    'Two actors approve and cancel stale copies of one request while a support override bypasses the mutable status field and erases history.',
  'pp2-architecture-interfaces':
    'A team proposes five services without quality scenarios, independent deployment need, compatibility policy, failure containment, or ownership capacity.',
  'pp2-data-lifecycle':
    'Three stores claim authority for the same entity while copied data, conflicting meanings, irreversible migration, and deletion gaps accumulate.',
  'pp2-identity-authentication':
    'Account, person, credential, tenant, role, and session are conflated, and the accessible recovery path is weaker than ordinary sign-in.',
  'pp2-authorization-tenancy-abuse':
    'An authenticated member changes an identifier, crosses organization data, automates an expensive action, and exploits a standing administrator role.',
  'pp2-distributed-correctness':
    'A timed-out request succeeds remotely, its retry duplicates the effect, a delayed event arrives out of order, and automated recovery compounds the conflict.',
  'pp2-collaboration-governance':
    'Parallel contributors create oversized changes, invisible decisions, ambiguous ownership, rubber-stamp review, and a release nobody can fully explain.',
  'pp2-observability-slo-support':
    'Many logs report healthy servers while users cannot complete the task and support cannot correlate the failure with actor, workflow, dependency, or revision.',
  'pp2-performance-cost':
    'A fast average hides slow devices, large payloads, p99 queue growth, inaccessible loading states, dependency quotas, and an unbounded bill.',
  'pp2-delivery-supply-chain':
    'Automation rebuilds mutable inputs with broad secrets in each environment, then moves full traffic before provenance, guardrails, or rollback are verified.',
  'pp2-migration-validation-defense':
    'A big-bang cutover relies on one launch-day study and a backup job that has never produced a clean, reconciled restore.',
  'capstone-mastery-contract':
    'An ambitious proposal lists technologies but cannot map independent competency claims to authentic artifacts, counterexamples, contribution limits, or unseen questions.',
  'capstone-significant-problem':
    'A novel technical demonstration lacks durable need evidence, reachable affected people, current alternatives, or a causal route to public value.',
  'capstone-stakeholders-harms':
    'Primary-user convenience shifts surveillance, exclusion, labor, safety, environmental, and appeal costs onto people with less product power.',
  'capstone-domain-regulation-license':
    'Secondary summaries, a draft framework, incompatible content licenses, and a broad compliance claim are treated as equal governing authority.',
  'capstone-measurement-baseline':
    'Impact is inferred from vanity metrics after launch without a baseline, comparison, guardrail, subgroup view, or precommitted interpretation.',
  'capstone-feasibility-options-stop':
    'The plan assumes unavailable data, participants, approval, services, expertise, operating budget, and time while rejecting no-build alternatives.',
  'capstone-scope-roadmap-risk':
    'Component deadlines conceal prerequisite gaps, external waits, integration risk, missing evidence milestones, and no trigger for releasing scope.',
  'capstone-architecture-decisions':
    'A box diagram omits quality tradeoffs, trust and failure boundaries, cost, evolution, dissent, review triggers, and rejected alternatives.',
  'capstone-data-api-invariants':
    'Schemas and endpoints look complete while identity, authorization, concurrency, numerical, lifecycle, compatibility, and recovery invariants remain implicit.',
  'capstone-security-privacy':
    'Authentication, encryption, a scanner, and a policy page substitute for a system-specific threat model, privacy risk assessment, abuse case, and response plan.',
  'capstone-walking-skeleton-core':
    'Infrastructure and design artifacts grow while no deployed end-to-end slice proves user value can coexist with the full quality floor.',
  'capstone-integrations-resilience':
    'A critical provider changes schema during an outage while retries duplicate effects, cached fallback misleads users, and no vendor-exit rehearsal exists.',
  'capstone-verification-human-eval':
    'A large automated suite passes familiar data while affected-user tasks, assistive technology, hostile cases, causal impact, and evidence limits remain untested.',
  'capstone-performance-operations':
    'Feature completion hides an unrealistic workload, system-centered metrics, inaccessible support, untested runbook, and no compound incident rehearsal.',
  'capstone-release-recovery':
    'A mutable release has unknown components, weak builder identity, risky migration, successful backup status, and no isolated application-level restore proof.',
  'capstone-documentation-defense':
    'A polished final story hides failed hypotheses, assistance, affected-user evidence, accessibility, threat decisions, incident recovery, and remaining non-claims.',
};

const CAREER_CASES = {
  'career-agency-constraints':
    'A candidate with limited runway, caregiving duties, an access need, location limits, and two acceptable work arrangements is pressured to maximize application volume.',
  'career-competency-evidence':
    'A course-rich skills list cannot identify one independently reproduced behavior, changed case, personal contribution, current artifact, or honest limitation.',
  'career-labor-market':
    'A viral salary post combines national medians, remote listings, senior titles, old data, and one technology trend into a guaranteed entry-level forecast.',
  'career-role-decomposition':
    'A listing mixes essential outcomes, preferences, recruiter keywords, copied requirements, legal text, and unknown team constraints behind a familiar title.',
  'career-gap-plan':
    'Three genuine evidence gaps trigger a six-month general course plan even though only one may block the candidate’s target work.',
  'career-public-identity':
    'A public profile leaks private email, precise location, commit identity, client screenshots, API history, availability, and a protected personal detail.',
  'career-github-proof':
    'A dense contribution graph and ten pinned tutorials hide the three relevant projects, setup path, tests, current status, contribution boundary, and limitations.',
  'career-case-studies':
    'A polished project story lists features and tools but invents user impact, hides failures, and links no accessibility, security, changed-case, or operations evidence.',
  'career-resume':
    'A two-column resume contains vague adjectives, hidden text, inconsistent dates, unsupported percentages, broken links, and a PDF with scrambled extraction order.',
  'career-application-package':
    'A generic packet mechanically mirrors a listing, exposes a private work sample, and supplies reference contact details without permission.',
  'career-search-system':
    'A search lives in tabs and memory, duplicates applications, loses artifact revisions, stores excessive contact notes, and reacts to each rejection as a trend.',
  'career-opportunity-trust':
    'An urgent remote offer uses a personal address, text-only interview, early identity request, equipment check, and no independently confirmed role or recruiter.',
  'career-relationships':
    'Automated messages ask strangers for referrals, ignore community norms and stop signals, and measure every relationship by immediate hiring access.',
  'career-informational-interviews':
    'A nominal learning conversation hides a referral request, asks generic questions, records without consent, and generalizes one practitioner view to a whole market.',
  'career-screening':
    'A rushed screen mixes role evidence, pay, location, authorization, access, sensitive history, unclear process, and an implied but unconfirmed next step.',
  'career-technical-interviews':
    'A timed task begins without contract or tool rules, optimizes before correctness, tests only the sample, and quietly resembles unpaid production work.',
  'career-collaborative-defense':
    'A candidate dominates a pair task, guesses at a bug, draws fashionable architecture, and claims a team project without separating personal work.',
  'career-behavioral-equity':
    'Memorized heroic stories erase collaborators, blame a former team, treat culture fit as objective, and presume every assessment is equally accessible.',
  'career-offers-negotiation':
    'A verbal offer creates urgency while level, manager, total compensation, contingencies, schedule, intellectual property terms, and decision time remain unclear.',
  'career-transition-resilience':
    'A candidate interprets sparse rejection as a skill verdict, retains confidential work, closes relationships poorly, and enters a new role without an onboarding evidence plan.',
};

const SUPPORT_CASES = {
  'support-evidence-method':
    'A vague intermittent ticket triggers an unauthorized familiar fix before impact, baseline, recent change, prediction, rollback, or changed-case proof exists.',
  'support-safety-hazards':
    'A repair bench combines a swollen battery, energized supply, heavy printer, loose jewelry, blocked exit, poor ventilation, and no disposal authority.',
  'support-requirements-compatibility':
    'A low-cost upgrade physically fits but conflicts with firmware, power, application, accessibility, warranty, lifecycle, and recovery requirements.',
  'support-display-audio-access':
    'A hybrid classroom has an intermittent external image, echo, camera privacy conflict, unreadable scaling, and color-only status.',
  'support-cables-connectors':
    'Look-alike USB-C cables and adapters expose different data, video, direction, bandwidth, and negotiated-power behavior through one dock.',
  'support-boards-cpu-firmware':
    'A board and CPU change follows a failed boot and thermal throttle, but socket, firmware, lanes, power, TPM, and cooling evidence conflict.',
  'support-memory-storage-raid':
    'Crashes, storage pressure, a degraded array, and a healthy-looking drive blur capacity, hardware, filesystem, redundancy, backup, and custody boundaries.',
  'support-power-workstations':
    'A specialized workstation list ignores measured workload, transient power, thermal path, acoustics, ergonomics, access needs, and failure cost.',
  'support-printer-mechanisms':
    'Faded pages, repeated marks, skewed scans, jams, and high consumable use cross laser, inkjet, thermal, and feeder mechanisms.',
  'support-printer-deployment':
    'A clinic print rollout leaks held documents, overprivileges address books, breaks mobile paths, and excludes nonvisual operation.',
  'support-printer-maintenance':
    'A technician replaces multiple printer parts before mapping jam position, repeated image interval, queue state, safe cleaning, or user outcome.',
  'support-mobile-hardware':
    'A thin laptop has cracked glass, unreliable charging, a damaged hinge, possible battery swelling, urgent data needs, and uncertain service documentation.',
  'support-mobile-accessories':
    'A dock, stylus, headset, biometric reader, and charger connect but fail under changed profiles, power, ports, sleep, and alternate-input use.',
  'support-mobile-management':
    'A mixed personal and managed fleet loses sync, exposes notifications, blocks accessibility services, and reports conflicting enrollment and radio state.',
  'support-transport-services':
    'Web content partly loads, mail sends but does not receive, and a firewall log uses familiar ports that do not prove the actual service.',
  'support-ip-config-services':
    'Duplicate addresses, stale names, a guest isolation leak, an unreachable subnet, and VPN split behavior are all blamed on DNS.',
  'support-network-media-devices':
    'An office combines mislabeled copper, fiber, PoE, switches, injectors, and access points with intermittent link and power evidence.',
  'support-wireless-radio':
    'A warehouse needs voice, scanners, guests, and tags while congestion, walls, roaming, channel width, power, and privacy vary by zone.',
  'support-soho-design':
    'A home business mixes work, family, guests, cameras, printers, IoT, backups, and remote access behind a default ISP gateway.',
  'support-network-troubleshooting':
    'Slow calls and sync coexist with good average speed while loss, jitter, queueing, Wi-Fi, DNS, path, and application evidence disagree.',
  'support-virtualization':
    'A lab treats VMs, containers, snapshots, VDI, device passthrough, and disposable sandboxes as equivalent isolation and recovery mechanisms.',
  'support-cloud-services':
    'Several cloud services hold files, identity, backups, and apps, but offline, sync, recovery, cost, deletion, and responsibility remain unassigned.',
  'support-os-landscape':
    'Windows, macOS, Linux, ChromeOS, mobile, and embedded devices need one support decision despite different filesystems, editions, and lifecycles.',
  'support-os-deployment':
    'An encrypted fleet deployment changes firmware, boot media, partitions, drivers, apps, profiles, access settings, licenses, and rollback at once.',
  'support-windows-editions-lifecycle':
    'Unsupported Windows 10 devices and specialized apps create pressure to bypass Windows 11 eligibility without current lifecycle or recovery evidence.',
  'support-windows-tools-settings':
    'Startup delay, storage pressure, device errors, and update failures send support through many tools without recording effective state or time.',
  'support-windows-cli-network':
    'Copied Windows command output lacks shell, directory, identity, time, exit status, redaction, prediction, and side-effect evidence.',
  'support-macos-ios':
    'Mixed Apple silicon and Intel devices have sync conflicts, trust prompts, full storage, managed policy, encrypted recovery, and peripheral failures.',
  'support-linux-chromeos-android':
    'Several Linux distributions, Chromebooks, Android work profiles, and kiosks expose different packages, accounts, updates, permissions, and reset effects.',
  'support-apps-remote-scripting-ai':
    'A team installs apps, remotes into endpoints, runs scripts, and trusts AI suggestions without provenance, consent, secrets, tests, or rollback.',
  'support-identity-access-controls':
    'People, accounts, credentials, devices, roles, badges, sessions, groups, guests, and service identities are conflated after unauthorized access.',
  'support-windows-security':
    'Sensitive Windows data has inherited share permissions, a missing recovery key, weakened protection, and an inaccessible sign-in fallback.',
  'support-endpoint-hardening':
    'Browsers, extensions, mobile apps, personal devices, home routers, and public Wi-Fi use defaults with inconsistent updates and recovery.',
  'support-threats-malware':
    'An urgent call, QR login, repeated MFA prompt, redirect, encrypted files, and disabled tools demand a proportionate first response.',
  'support-malware-sanitization-ir':
    'A compromised encrypted endpoint needs recovery and reuse while credential exposure, persistence, legal hold, custody, and media method remain unknown.',
  'support-hardware-integrated-triage':
    'A mobile workstation intermittently fails POST, throttles, loses storage, corrupts display, and recovers after cooling after several simultaneous repairs.',
  'support-software-security-triage':
    'Slow startup, crashes, redirects, lockouts, certificate warnings, mobile pop-ups, and network errors follow an unknown change.',
  'support-tickets-assets-knowledge':
    'Duplicate tickets, mismatched assets, copied workarounds, breached targets, excess personal data, and weak closure hide the causal record.',
  'support-change-backup-operations':
    'A fleet change affects encrypted devices, backups, batteries, licenses, personal data, access settings, and a narrow rollback window.',
  'support-professional-pbq-defense':
    'An anxious user, access and language needs, a safety stop, competing priorities, and an ambiguous PBQ tempt immediate action without a support contract.',
};

function words(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter((word) => word.length >= 4 && !STOP_WORDS.has(word));
}

function humanize(value) {
  return value
    .replace(
      /^(math-(?:beg|int|adv)|storage-(?:go|ts)|rabbit-(?:go|ts)|http-server-(?:go|ts)|httpsgo|httpsts|httpproto|http-(?:go|ts|py)|static-site|ssg|agentpy|crawler-(?:go|ts)|scraper|maze|asteroids|bookbot|cmem|prompt|loops|agent-ext|gates|pp1|pp2|capstone|career|support|fp|dsa2?|js|ts|go|sql|linux|git)-/,
      ''
    )
    .split('-')
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(' ');
}

function httpDomainCaseBase(family, moduleId, n, activityKind) {
  if (!/^http-(?:go|ts|py)-/.test(moduleId)) return null;
  const runtimes =
    family === 'go'
      ? {
          theory: 'Go fleet evidence model',
          workshop: 'Go staging control-plane client',
          debug: 'Go incident collection agent',
          lab: 'Go backup artifact client',
          review: 'Go security handoff client',
          quiz: 'Go vendor-release candidate',
          project: 'Go stakeholder SDK',
          exam: 'Go certification client',
        }
      : family === 'typescript'
        ? {
            theory: 'TypeScript Fetch evidence model',
            workshop: 'accessible staging dashboard SDK',
            debug: 'cross-runtime browser support client',
            lab: 'partner TypeScript SDK',
            review: 'offline design-system client',
            quiz: 'universal Fetch release candidate',
            project: 'TypeScript stakeholder SDK',
            exam: 'TypeScript certification client',
          }
        : {
            theory: 'Python protocol evidence model',
            workshop: 'civic-data staging importer',
            debug: 'overnight ingestion repair client',
            lab: 'research archive client',
            review: 'compliance handoff automation',
            quiz: 'production data release candidate',
            project: 'Python stakeholder client',
            exam: 'Python certification client',
          };
  const runtime = runtimes[activityKind] ?? runtimes.theory;
  const caseId = `${family === 'go' ? 'G' : family === 'typescript' ? 'T' : 'P'}-${n}`;
  if (/semantics-evidence/.test(moduleId)) {
    return `A ${activityKind} ${runtime} request ${caseId} crosses a resolver, TLS connection, gateway, cache, and origin before a changed payload is rejected. Separate every role, representation, state holder, and failure layer before editing code.`;
  }
  if (/uris-origins-dns/.test(moduleId)) {
    return `${runtime} receives base https://api${n}.example.test/v1/items/ and reference ../reports?q=a%2Fb. Resolve it structurally, compare origin and authority, trace two DNS answers, and reject any connected destination outside the approved range.`;
  }
  if (/requests-methods/.test(moduleId)) {
    return `${runtime} must repeat request ${caseId} after an uncertain timeout: GET status, POST job creation, PUT replacement, and PATCH transition are candidates. Classify safety, idempotency, body replay, and If-Match evidence before choosing.`;
  }
  if (/fields-representations/.test(moduleId)) {
    return `${runtime} asks for application/json and receives Content-Type application/json; charset=utf-8, Content-Encoding gzip, Vary Accept-Language, and field revision:${n}. Distinguish metadata layers, bound decoded bytes, and reject a changed value type.`;
  }
  if (/responses-errors/.test(moduleId)) {
    return `${runtime} observes 202 without a result, 204 with no content, 206 with a range, 429 with Retry-After, and 503 problem+json for case ${caseId}. Preserve status, transport, schema, domain, partial, and unknown-effect outcomes separately.`;
  }
  if (/body-streams-limits/.test(moduleId)) {
    return `${runtime} streams a ${n * 4} MiB upload and receives a 40 KiB compressed body that expands past ${n * 10} MiB. Define one-shot ownership, replay, compressed and decoded limits, cancellation, trailers, and cleanup.`;
  }
  if (/tls-trust/.test(moduleId)) {
    return `${runtime} connects to api${n}.internal.test through proxy.example.test using a private CA and optional client certificate. Verify requested identity, connected endpoint, roots, proxy authority, downgrade policy, and what evidence the browser lab cannot supply.`;
  }
  if (/redirects-policy/.test(moduleId)) {
    return `${runtime} sends POST ${caseId} with authorization, then receives 302 ../moved, 307 https://upload.example.test/next, and a loop back to the first URL. Predict method, body, credential, origin, hop-budget, and SSRF decisions per step.`;
  }
  if (/cookies-auth-secrets/.test(moduleId)) {
    return `${runtime} handles host-only session cookie SID-${n}, SameSite policy, API key, and expiring bearer token while two accounts run concurrently. Define jar isolation, CSRF, scope, rotation, redaction, and redirect boundaries.`;
  }
  if (/caching-validation/.test(moduleId)) {
    return `${runtime} stores a response with max-age=${n * 10}, ETag "rev-${n}", Age:${n}, and Vary: Accept-Language. A user-specific request arrives stale; compute reuse, revalidation, 304 metadata merge, cache key, and privacy policy.`;
  }
  if (/timeouts-cancellation/.test(moduleId)) {
    return `${runtime} has ${n * 150} ms end-to-end for DNS, connect, TLS, headers, streamed body, parse, and cleanup. A caller cancels during body read; allocate phase budgets, propagate the reason, stop owned work, and preserve unknown remote effect.`;
  }
  if (/retries-backoff/.test(moduleId)) {
    return `${runtime} sees one reset, Retry-After:${n}, then 503 while a nested helper also retries. Prove method and body replayability, cap attempts and elapsed budget, apply deterministic jitter, and prevent duplicate or amplified work.`;
  }
  if (/connections-protocols/.test(moduleId)) {
    return `${runtime} schedules ${n * 8} operations across HTTP/1.1 keep-alive, an HTTP/2 connection limited to ${n} streams, and optional HTTP/3. Bound queues and memory, reuse clients, finish bodies, and distinguish transport from semantics.`;
  }
  if (/api-traversal-rates/.test(moduleId)) {
    return `${runtime} follows cursor c${n}, repeated link c${n}, and rate limit ${n * 10}/minute while records change between pages. Encode filters, detect loops, checkpoint stable identity, resume after failure, and avoid duplicates or gaps.`;
  }
  if (/client-architecture/.test(moduleId)) {
    return `${runtime} library needs base authority, injected transport, auth, retry, cache, metrics, redaction, and typed operation ${caseId}. Order wrappers, separate per-request state, validate configuration, and keep protocol plumbing private.`;
  }
  if (/security-boundaries/.test(moduleId)) {
    return `${runtime} receives https://127.0.0.1:${8000 + n}/meta, a decimal IP alias, a hostname that rebinds, and a redirect to file://. Enforce scheme, resolution, connected-address, redirect, response, egress, and privacy defenses.`;
  }
  if (/testing-observability/.test(moduleId)) {
    return `${runtime} test ${caseId} injects a delayed header, truncated gzip body, malformed JSON, cross-origin redirect, and cancellation. Assert the outgoing request, cleanup, failure taxonomy, attempt count, low-cardinality telemetry, and no secret leakage.`;
  }
  return `${runtime} release ${caseId} doubles traffic and body size while p95 latency, memory, retries, and queue depth rise. Measure the bottleneck, preserve behavior, verify supply-chain gates and rollback, then defend production readiness.`;
}

function httpDomainCase(family, moduleId, n, activityKind, competency) {
  const base = httpDomainCaseBase(family, moduleId, n, activityKind);
  if (!base || !competency) return base;
  return `${base} Competency probe: ${competency.statement}`;
}

function dockerDomainCase(moduleId, n, activityKind, competency) {
  const probe = competency ? ` Competency probe: ${competency.statement}` : '';
  const cases = {
    'docker-architecture-isolation-evidence': `A ${activityKind} team sees Docker client 29.6.1, an unexpected remote context, Engine API 1.55, containerd-backed image storage, and a process sharing the host kernel. Trace pull and run authority without calling the container a virtual machine.`,
    'docker-containers-lifecycle-cli': `A ${activityKind} operator inherits ${n} similarly named containers: one created, one running, one exited with code 137, and one carrying the only writable-layer report. Inspect identity and state, preserve evidence, then perform label-scoped cleanup.`,
    'docker-images-layers-registries': `A ${activityKind} release tag moved between two manifest-list digests while linux/amd64 and linux/arm64 resolve to different image configs. Establish immutable identity, layer ownership, registry trust, and pull behavior.`,
    'dockerfile-build-context-instructions': `A ${activityKind} build sends a 780 MiB context containing .git and local.env, uses a floating base, copies the repository, runs as root, and wraps the process in /bin/sh. Redesign context and runtime contracts.`,
    'docker-buildkit-cache-multistage': `A ${activityKind} BuildKit run leaks a token through ARG, invalidates dependencies on every source edit, ships the compiler, and reuses a stale external cache. Separate stages, mounts, cache keys, outputs, and trust evidence.`,
    'docker-process-signals-health-resources': `A ${activityKind} queue worker ignores SIGTERM, leaves child processes, reports healthy while stalled, restarts forever, and consumes ${n * 128} MiB. Bound PID 1, health, shutdown, restart, and resources.`,
    'docker-storage-mounts-backup': `A ${activityKind} database writes into an anonymous volume while developers rely on a host-path bind mount. A backup archive exists but has never restored. Define ownership, consistency, lifecycle, checksum, and clean-volume recovery.`,
    'docker-networking-dns-publishing': `A ${activityKind} Compose stack publishes its database on every host interface, pins a container IP, and calls localhost from the API. Split trust networks, use service DNS, restrict publishing, and verify ingress separately from egress.`,
    'docker-compose-model-lifecycle': `A ${activityKind} three-service project has hidden interpolation, name collisions, start-order assumptions, a mutable image, and teardown that may delete intake data. Render the model, dry-run lifecycle, and prove preservation.`,
    'docker-compose-development-testing': `A ${activityKind} override bind-mounts production paths, watch rebuilds on generated files, and dev and test profiles silently change dependencies. Render every file combination and isolate disposable state.`,
    'docker-security-least-privilege': `A ${activityKind} document parser runs privileged as root, mounts daemon authority, writes the image filesystem, has network access, and no resource caps. Remove authority and state the remaining shared-kernel risk.`,
    'docker-config-secrets-environment': `A ${activityKind} build receives credentials through ARG and ENV; Compose interpolation prints them; image history and logs retain copies. Classify public config, build secrets, runtime secrets, redaction, and rotation.`,
    'docker-observability-debugging': `A ${activityKind} container exits only after revision ${n}; an operator restarts it and edits files with exec before collecting state. Reconstruct the first causal layer from inspect, events, logs, stats, and release identity.`,
    'docker-testing-validation-quality': `A ${activityKind} image builds and answers one happy-path request but fails read-only execution, slow dependency startup, SIGTERM, missing secrets, and clean-host pull. Design layered tests plus deterministic teardown.`,
    'docker-performance-reproducibility': `A ${activityKind} team compares a warm local build with a cold CI build and blames a large final image, while context transfer and cross-platform cache dominate. Measure each stage and compare controlled output digests.`,
    'docker-multiplatform-buildx-bake': `A ${activityKind} release must publish linux/amd64 and linux/arm64. The builder uses emulation, local load, undeclared platform inputs, and no per-platform tests. Define Bake targets, exporters, attestations, and index verification.`,
    'docker-supply-chain-registry-release': `A ${activityKind} candidate has a mutable tag, incomplete SBOM, minimal provenance, critical scanner finding, and unsigned exception. Bind source, base, builder, attestations, signature, policy, and promotion to a digest.`,
    'docker-production-operations-defense': `A ${activityKind} board reviews a digest-pinned multi-service release with an untested rollback, stale backup, daemon upgrade, capacity uncertainty, and unclear ownership. Defend rollout, recovery, compatibility, and residual limits.`,
  };
  const value = cases[moduleId];
  if (!value) return null;
  return `${value}${probe}`;
}

function kubernetesDomainCase(moduleId, n, activityKind, competency) {
  const probe = competency ? ` Competency probe: ${competency.statement}` : '';
  const cases = {
    'k8s-architecture-reconciliation-evidence': `A ${activityKind} team sees kubectl 1.36.2, an unfamiliar current context, a healthy API endpoint, and a Deployment whose desired replicas differ from observed status. Trace client, API server, admission, storage, controller, scheduler, kubelet, and runtime authority without treating reconciliation as application correctness.`,
    'k8s-api-objects-schema-status': `A ${activityKind} manifest is valid YAML but uses a removed API, contains an unknown field, and reports observedGeneration ${n} behind generation ${n + 1}. Establish discovery, schema, identity, spec, status, conditions, and compatibility evidence.`,
    'k8s-kubectl-contexts-declarative': `A ${activityKind} operator is pointed at production instead of training, relies on table output, runs client dry-run, and plans an unscoped prune. Make context, namespace, server validation, field ownership, diff, and UID-safe mutation explicit.`,
    'k8s-metadata-namespaces-ownership': `A ${activityKind} namespace contains similarly named objects, copied labels, a dangling owner reference, and a finalizer blocking deletion. Design names, labels, selectors, annotations, ownership, garbage collection, quota boundaries, and deletion evidence.`,
    'k8s-pods-lifecycle-composition': `A ${activityKind} Pod has an init container that never completes, a sidecar that outlives the app, an ephemeral debug container, restart count ${n}, and an emptyDir holding the only diagnosis. Explain phase, container state, restart, sharing, and replacement boundaries.`,
    'k8s-config-secrets-projection': `A ${activityKind} release embeds a credential in Git, mixes immutable and rotating config, uses env projection where a file watch is required, and grants broad Secret reads. Separate creation, consumption, update propagation, encryption, RBAC, and rotation evidence.`,
    'k8s-health-resources-qos': `A ${activityKind} service passes liveness while serving stale data, has no startup probe, requests 100m but uses ${n * 250}m CPU, and is OOMKilled under pressure. Redesign probes, requests, limits, QoS, graceful termination, and changed-load checks.`,
    'k8s-deployments-rollouts-recovery': `A ${activityKind} Deployment rolls out image tag latest, stalls at ${n} unavailable replicas, exceeds progress deadline, and has a bad ConfigMap change outside revision history. Bind immutable identity, strategy, conditions, pause, rollback, and verification.`,
    'k8s-workload-controller-selection': `A ${activityKind} platform runs a durable database as a Deployment, a node log agent as one replica, and a finite migration as a long-running Pod. Choose Deployment, StatefulSet, DaemonSet, Job, or CronJob from identity, placement, completion, concurrency, and retry contracts.`,
    'k8s-services-endpoints-dns': `A ${activityKind} Service selector matches the wrong Pods, EndpointSlices show no ready endpoints, a client calls localhost, and DNS search expansion reaches an unintended namespace. Trace selector, readiness, virtual IP, EndpointSlice, port mapping, DNS, and session behavior.`,
    'k8s-gateway-ingress-routing-tls': `A ${activityKind} Gateway API 1.5.1 route is not Accepted, a cross-namespace backend lacks permission, two rules conflict, and TLS terminates with the wrong certificate. Establish controller support, attachment, ReferenceGrant, matching, status, and conformance evidence.`,
    'k8s-network-model-policy-troubleshooting': `A ${activityKind} Pod can resolve DNS but cannot reach a backend after default deny; the policy selects only ingress, misses egress DNS, and assumes NetworkPolicy implementation behavior. Trace source, destination, port, direction, selector, CNI, and node boundary.`,
    'k8s-storage-persistence-recovery': `A ${activityKind} StatefulSet loses a node while its PVC is bound in another zone, reclaim policy is Delete, expansion is pending, and the backup has never restored. Defend StorageClass, binding, access mode, topology, snapshot, restore, and application consistency.`,
    'k8s-scheduling-placement-eviction': `A ${activityKind} Pod is Pending with an untolerated taint, required anti-affinity, insufficient memory, and topology spread skew ${n}. Reconstruct filtering, scoring, requests, selectors, affinity, taints, preemption, and eviction without forcing nodeName.`,
    'k8s-availability-disruption-autoscaling': `A ${activityKind} service has ${n} replicas but all share one zone, a strict disruption budget blocks drain, and HPA oscillates because requests and metrics are wrong. Balance failure domains, PDB, rollout surge, autoscaling signals, stabilization, and capacity.`,
    'k8s-identity-rbac-serviceaccounts': `A ${activityKind} workload uses the default ServiceAccount, automounts a broad token, and receives wildcard cluster-admin through a group binding. Derive subject, verb, resource, namespace, token audience, impersonation, and least-privilege proof.`,
    'k8s-workload-security-admission': `A ${activityKind} Pod runs as root, is privileged, adds capabilities, mounts hostPath, permits privilege escalation, and bypasses a namespace policy exception. Enforce Pod Security, securityContext, seccomp, admission, exception ownership, and residual shared-kernel risk.`,
    'k8s-observability-debugging-incidents': `A ${activityKind} workload restarts after revision ${n}; logs rotated, metrics aggregate away one replica, events are delayed, and an operator deletes the Pod first. Preserve object status, events, current and previous logs, metrics, traces, node evidence, and a causal timeline.`,
    'k8s-packaging-kustomize-helm-promotion': `A ${activityKind} environment overlay drifts from base, Helm values change immutable fields, rendered resources contain a secret, and promotion rebuilds a new image. Render, diff, validate, pin, sign, promote the same artifact, and retain rollback evidence.`,
    'k8s-extensions-admission-operators': `A ${activityKind} CRD changes schema without conversion, a webhook fails closed during outage, and an operator hot-loops while fighting field ownership. Bound extension API, defaulting, validation, conversion, admission availability, reconciliation, and uninstall.`,
    'k8s-cluster-lifecycle-upgrade-recovery': `A ${activityKind} board plans a 1.35 to 1.36 control-plane upgrade with skewed kubelets, deprecated APIs, expired recovery assumptions, untested etcd restore, and unclear rollback. Defend compatibility, drain, backup, staged upgrade, recovery, and ownership.`,
  };
  const value = cases[moduleId];
  if (!value) return null;
  return `${value}${probe}`;
}

function cicdDomainCase(moduleId, n, activityKind, competency) {
  const probe = competency ? ` Competency probe: ${competency.statement}` : '';
  const cases = {
    'ci-delivery-outcomes-flow-evidence': `A ${activityKind} service deploys ${n} times per week but cannot connect reviewed source, required checks, immutable artifact, production revision, user signal, abort decision, or recovery. Define value and delivery evidence without gaming one metric.`,
    'gha-execution-model-contexts': `A ${activityKind} run attempt ${n} loses a build result because the team confuses server expressions, runner environments, step processes, job outputs, artifacts, and caches. Trace identity, lifetime, authority, and cleanup.`,
    'gha-workflow-syntax-expressions': `A ${activityKind} workflow parses YAML but treats false as text, expands a multiline value unsafely, uses an unavailable context, and accepts a misspelled input. Validate syntax, types, timing, shell boundaries, and a changed event fixture.`,
    'gha-events-refs-trust-boundaries': `A ${activityKind} maintainer runs fork code through pull_request_target with write authority, then a privileged workflow_run consumes its artifact. Establish workflow source, tested revision, actor, permissions, producer trust, and data-only inspection.`,
    'gha-runners-isolation-capacity': `A ${activityKind} public pull request reaches a persistent self-hosted runner with Docker authority and cloud credentials while ${n * 8} jobs queue. Bound eligibility, ephemerality, compatibility, capacity, evidence, and destruction.`,
    'ci-node-typescript-reproducibility': `A ${activityKind} TypeScript build floats Node and npm, mutates its lockfile, runs dependency lifecycle scripts, calls a programmatic API that TypeScript 7 does not provide, and passes only with warm local residue. Prove Node 24, the TypeScript 7.0.2 native CLI, the TypeScript 6.0.2 compatibility API, npm ci, clean output, and changed-environment behavior.`,
    'ci-quality-gate-orchestration': `A ${activityKind} pipeline hides formatter, lint, type, test, and build failures behind continue-on-error and skipped jobs while branch rules require a renamed check. Rebuild the dependency graph and evidence ownership.`,
    'ci-testing-services-coverage': `A ${activityKind} suite mocks every boundary, starts an unready database, shares state across ${n} shards, retries flakes, and celebrates coverage while a changed case fails. Design risk-layered, isolated, diagnostic evidence.`,
    'gha-matrices-needs-outputs-artifacts': `A ${activityKind} matrix excludes one supported platform, overwrites artifact names, passes string outputs as booleans, and downloads an executable from another run. Prove graph results, types, producer identity, digest, layout, and trust.`,
    'gha-cache-performance-integrity': `A ${activityKind} privileged release restores executable cache content written by a fork through a broad fallback key. Compare cold and warm time, key scope, save authority, poisoning risk, and immutable artifact separation.`,
    'gha-concurrency-timeouts-flake-control': `A ${activityKind} older deployment finishes after a newer revision, cancellation skips cleanup, a child process exceeds ${n} minutes, and retries erase the first failure. Bound concurrency, staleness, timeouts, idempotency, and flake repair.`,
    'gha-secrets-tokens-injection': `A ${activityKind} job grants write-all, expands an issue title in a shell, prints a transformed secret, and sends a token to a mutable action. Reduce permissions, separate data from code, rotate exposure, and retain redacted evidence.`,
    'gha-actions-dependencies-supply-chain': `A ${activityKind} release uses mutable action tags, accepts automated updates without runtime review, and makes an SLSA claim from incomplete provenance. Pin immutable identities, review diffs, verify attestations, and state non-guarantees.`,
    'gha-reuse-composite-workflow-contracts': `A ${activityKind} reusable workflow hides permissions and secrets, nests mutable dependencies, loses typed outputs, and silently changes callers. Design explicit inputs, outputs, authority, versioning, tests, and migration.`,
    'ci-docker-build-test-cache': `A ${activityKind} Buildx workflow leaks a secret through ARG, trusts a fork cache, builds only amd64, pushes before tests, and cannot tie output to source. Separate builder, context, platforms, cache, test, secret, and digest evidence.`,
    'ci-image-release-attestations': `A ${activityKind} candidate is promoted by mutable tag with partial SBOM and provenance, an unverified attestation, and policy exception ${n}. Bind image index, platforms, signatures, attestations, verification policy, and exception expiry.`,
    'cd-environments-oidc-cloud-auth': `A ${activityKind} deployment stores a long-lived cloud key, requests broad id-token and repository permissions, and trusts ambiguous OIDC claims. Constrain environment, audience, subject, workflow, revision, service account, approval, and audit evidence.`,
    'cd-cloud-run-progressive-delivery': `A ${activityKind} Cloud Run release rebuilds after approval, sends all traffic before readiness, changes IAM, and cannot restore the prior digest. Deploy no-traffic, verify revision, canary signals, abort, rollback, and identity separation.`,
    'cd-releases-packages-change-control': `A ${activityKind} tag rebuild publishes npm and images with long-lived tokens, missing provenance, and one-person approval. Build once, promote immutable artifacts, use trusted publishing, verify contents, and separate duties.`,
    'ci-observability-incidents-governance': `A ${activityKind} delivery incident exposes identifiers in logs, consumes growing storage, receives blind reruns, and retains permanent exceptions. Reconstruct first cause, contain authority, restore known artifacts, govern retention, and expire risk.`,
  };
  const value = cases[moduleId];
  if (!value) return null;
  return `${value}${probe}`;
}

function domainCase(family, moduleId, seed, activityKind = 'practice', competency) {
  const n = (seed % 5) + 2;
  if (moduleId.startsWith('crawler-go-')) {
    return webScraperGoScenario(moduleId, seed, activityKind, competency);
  }
  if (moduleId.startsWith('crawler-ts-')) {
    return webScraperTypescriptScenario(moduleId, seed, activityKind, competency);
  }
  if (moduleId.startsWith('feed-go-')) {
    return blogAggregatorGoScenario(moduleId, seed, activityKind, competency);
  }
  if (moduleId.startsWith('feed-ts-')) {
    return blogAggregatorTypescriptScenario(moduleId, seed, activityKind, competency);
  }
  if (moduleId.startsWith('pokedex-go-')) {
    return pokedexGoScenario(moduleId, seed, activityKind, competency);
  }
  if (moduleId.startsWith('pokedex-ts-')) {
    return pokedexTypescriptScenario(moduleId, seed, activityKind, competency);
  }
  if (moduleId.startsWith('agentpy-')) {
    return aiAgentPythonScenario(moduleId, seed, activityKind, competency);
  }
  if (moduleId.startsWith('scraper-')) {
    return webScraperPythonScenario(moduleId, seed, activityKind, competency);
  }
  if (moduleId.startsWith('maze-')) {
    return mazePythonScenario(moduleId, seed, activityKind, competency);
  }
  if (moduleId.startsWith('static-site-')) {
    return staticSitePythonScenario(moduleId, seed, activityKind, competency);
  }
  if (moduleId.startsWith('asteroids-')) {
    return asteroidsPythonScenario(moduleId, seed, activityKind, competency);
  }
  if (moduleId.startsWith('bookbot-')) {
    return bookbotPythonScenario(moduleId, seed, activityKind, competency);
  }
  if (moduleId.startsWith('cmem-')) {
    return cMemoryManagementScenario(moduleId, seed, activityKind, competency);
  }
  if (moduleId.startsWith('rag-')) {
    return ragPythonScenario(moduleId, seed, activityKind, competency);
  }
  if (moduleId.startsWith('crypto-go-')) {
    return cryptographyGoScenario(moduleId, seed, activityKind, competency);
  }
  if (moduleId.startsWith('storage-ts-')) {
    return fileServersS3TypescriptScenario(moduleId, seed, activityKind, competency);
  }
  if (moduleId.startsWith('storage-go-')) {
    return fileServersS3GoScenario(moduleId, seed, activityKind, competency);
  }
  if (moduleId.startsWith('rabbit-go-')) {
    return rabbitmqGoScenario(moduleId, seed, activityKind, competency);
  }
  if (moduleId.startsWith('rabbit-ts-')) {
    return rabbitmqTypescriptScenario(moduleId, seed, activityKind, competency);
  }
  if (moduleId.startsWith('http-protocol-go-')) {
    return httpProtocolGoScenario(moduleId, seed, activityKind, competency);
  }
  if (moduleId.startsWith('http-server-go-')) {
    return httpServerGoScenario(moduleId, seed, activityKind, competency);
  }
  if (moduleId.startsWith('http-server-ts-')) {
    return httpServerTypescriptScenario(moduleId, seed, activityKind, competency);
  }
  const httpCase = httpDomainCase(family, moduleId, n, activityKind, competency);
  if (httpCase) return httpCase;
  if (family === 'docker') {
    return dockerDomainCase(moduleId, n, activityKind, competency);
  }
  if (family === 'kubernetes') {
    return kubernetesDomainCase(moduleId, n, activityKind, competency);
  }
  if (family === 'cicd') {
    return cicdDomainCase(moduleId, n, activityKind, competency);
  }
  if (family === 'portfolio') {
    const base =
      PORTFOLIO_CASES[moduleId] ?? `A product review changes ${moduleId.replaceAll('-', ' ')}.`;
    return `${base} The ${activityKind} variation ${n} changes the stakeholder, access need, evidence source, constraint, failure, and operating environment. Competency probe: ${competency?.statement ?? 'defend one bounded product claim'}`;
  }
  if (family === 'career') {
    const base =
      CAREER_CASES[moduleId] ?? `A career review changes ${moduleId.replaceAll('-', ' ')}.`;
    return `${base} The ${activityKind} variation ${n} changes the candidate background, target role, jurisdiction, access need, source date, process state, and decision constraint. Competency probe: ${competency?.statement ?? 'defend one bounded career decision'}`;
  }
  if (family === 'support') {
    const base =
      SUPPORT_CASES[moduleId] ?? `A support incident changes ${moduleId.replaceAll('-', ' ')}.`;
    return `${base} The ${activityKind} variation ${n} changes the user outcome, device, version, hazard, recent change, symptom, access need, competing cause, and transfer limit. Competency probe: ${competency?.statement ?? 'defend one safe causal support decision'}`;
  }
  if (family === 'linux') {
    if (/terminal-evidence|paths-hierarchy/.test(moduleId)) {
      return `On a ${activityKind} host, learner starts in /home/learner/lab with Bash 5.3, Coreutils 9.11, and exit status ${n % 2}. Resolve ./data/../scripts, identify command authority, and separate terminal, shell, process, and kernel evidence.`;
    }
    if (/files-links-metadata/.test(moduleId)) {
      return `Workspace contains README.md, data/incidents.csv, scripts/check.sh, and symbolic link current → data. Add reports/run-${n}.txt, preserve metadata, preview wildcard scope, and prove removal cannot escape /home/learner/lab.`;
    }
    if (/streams-quoting-pipelines/.test(moduleId)) {
      return `A ${n + 2}-record incident command writes selected rows to report.txt and diagnostics to report.err. One grep stage finds no matches; predict descriptor routing and final status with pipefail before running.`;
    }
    if (/text-search-transforms/.test(moduleId)) {
      return `Logs contain duplicate IDs, spaces, UTF-8 names, and severities high, low, and HIGH. Produce a stable ${n}-row summary with explicit locale, delimiter, regex, sort key, and duplicate policy.`;
    }
    if (/permissions-identity/.test(moduleId)) {
      return `Directory /srv/reports is owned by learner:lab with mode 2770 and umask 0027. A lab-group writer and outside reader attempt create, list, delete, and execute operations; derive each result before changing ACLs.`;
    }
    if (/processes-signals-jobs/.test(moduleId)) {
      return `Process tree has shell 2100, worker 2201, and child ${2201 + n}; the worker stops responding but owns a temporary report. Identify the intended process, capture state, send the least disruptive signal, and verify cleanup.`;
    }
    if (/environment-startup/.test(moduleId)) {
      return `check-report works in an interactive shell but fails from a service with PATH=/usr/bin:/bin, LANG=C.UTF-8, and HOME=/var/lib/lab. Trace command resolution and startup files without exporting a secret token.`;
    }
    if (/packages-provenance/.test(moduleId)) {
      return `Host proposes lab-tool ${n}.4.1 from a signed distribution repository and ${n}.5.0 from an unverified script. Inspect origin, dependencies, installed files, service impact, and rollback before choosing.`;
    }
    if (/storage-archives-backups/.test(moduleId)) {
      return `Filesystem / is 92% full with ${n * 100} free inodes while a deleted-open log consumes 1.4 GiB. Build an archive and restore proof without formatting, mounting, or deleting host data.`;
    }
    if (/services-logs/.test(moduleId)) {
      return `lab-worker.service is enabled and active, but readiness failed after configuration revision ${n}. Query effective unit settings and journal events from this boot before any restart or rollback.`;
    }
    if (/networking-remote/.test(moduleId)) {
      return `Host has 192.0.2.40/24, default route 192.0.2.1, DNS 192.0.2.53, and service port 443. Name lookup succeeds while the socket is absent; test layers and preserve SSH host-key trust.`;
    }
    if (/bash-automation/.test(moduleId)) {
      return `A report script receives filenames "north ${n}.csv" and "--dry-run" plus one missing file. Preserve argument boundaries, validate before mutation, clean temporary state, and prove rerunning is idempotent.`;
    }
    return `A ${activityKind} Linux incident crosses filesystem, permission, process, service, and network evidence. Preserve a baseline, change one bounded layer, record exit status, and verify rollback on case ${n}.`;
  }

  if (family === 'git') {
    if (moduleId.startsWith('git-advanced-')) {
      return gitAdvancedScenario(moduleId, seed, activityKind);
    }
    if (/model-setup/.test(moduleId)) {
      return `Repository /home/learner/lab uses branch main, local author scope, and Git ${n + 2}.x. Identify working tree, Git directory, config origins, installed help, and recovery reference before adopting it.`;
    }
    if (/working-index-commit/.test(moduleId)) {
      return `README.md has one intended line, data/incidents.csv has an accidental edit, and evidence.txt is untracked. Construct one atomic commit by comparing working tree, index, and HEAD, then verify the staged diff.`;
    }
    if (/history-objects/.test(moduleId)) {
      return `History has commits a11ce00 → b00b1e5 → c0ffee${n}; a file moved from notes.txt to docs/notes.txt with unchanged bytes. Explain graph, object identity, path evidence, and blame limits.`;
    }
    if (/branches-merges/.test(moduleId)) {
      return `Branches main and repair diverge from merge base b00b1e5. repair changes validation while main changes output formatting; predict fast-forward possibility, resulting parents, and post-merge behavior evidence.`;
    }
    if (/remotes-collaboration/.test(moduleId)) {
      return `Local main is ${n} commits ahead and one behind origin/main; fetch updates only remote-tracking refs. Compare ranges, choose integration policy, and name exact source/destination before push.`;
    }
    if (/conflicts-resolution/.test(moduleId)) {
      return `Merge conflict in policy.txt has base limit=2, main limit=${n}, and repair limit=${n + 1} plus retry tests. Inspect index stages, reconstruct intent, create a semantic result, and verify before continue.`;
    }
    if (/ignore-attributes-content/.test(moduleId)) {
      return `Repository tracks config.local, build/app.bin, and CRLF script check.sh; .gitignore is added afterward. Decide tracked cleanup, attribute normalization, secret rotation, and changed-platform evidence.`;
    }
    if (/tags-releases/.test(moduleId)) {
      return `Release v${n}.1.0 targets commit a11ce00, but the working tree has an unstaged version edit. Establish source identity, clean state, annotated tag evidence, checksum, and trust limits.`;
    }
    if (/revisions-search/.test(moduleId)) {
      return `Feature tip F has ${n} commits after merge base M while main has two. Compare M..F, main...F, HEAD~2, and path-limited pickaxe results without confusing commit sets with file diffs.`;
    }
    if (/undo-recovery/.test(moduleId)) {
      return `One unstaged edit, one staged file, local commit a11ce00, and published commit b00b1e5 each need different recovery. Preserve a temporary ref and choose restore, reset, revert, or reflog per layer.`;
    }
    if (/rebase-cherry-pick/.test(moduleId)) {
      return `Local series has commits parse → test → docs atop old main; new main changes the parser contract. Plan replay, conflict tests, range-diff, recovery ref, and force-with-lease boundary.`;
    }
    if (/hooks-quality-security/.test(moduleId)) {
      return `A cloned repository proposes a pre-commit hook, diff driver, and build script. Determine what Git runs automatically, what is bypassable, and which server or CI gate owns enforcement before trust.`;
    }
    if (/team-workflow/.test(moduleId)) {
      return `Issue ${n} requires one behavior and accessibility regression. A pull request contains five unrelated cleanup commits; define review range, split scope, required evidence, and authorized merge policy.`;
    }
    return `A ${activityKind} repository incident combines mixed work, divergent refs, one conflict, an incorrect public commit, and release v${n}.0. Preserve recovery refs, repair the least destructive layer, and verify graph plus tree.`;
  }

  if (family === 'typescript') {
    if (/compiler-runtime|tsconfig-projects|release-migration/.test(moduleId)) {
      return `A ${activityKind} build checks a two-package TypeScript 7 workspace with strict mode, ESM output, and one TypeScript 6 API-dependent tool. Record the emitted JavaScript, diagnostic code, runtime result, and the compatibility boundary before release ${n}.`;
    }
    if (/inference-literals/.test(moduleId)) {
      return `A service config begins as {status: "degraded", retries: ${n}, regions: ["west"]}. Preserve the status literal union and readonly region intent while proving a changed "offline" record fails at the correct boundary.`;
    }
    if (/unions-narrowing|runtime-validation/.test(moduleId)) {
      return `An unknown payload is alternately {kind:"ok", value:${n}}, {kind:"error", message:"timeout"}, and {kind:"ok", value:"${n}"}. Validate runtime shape before narrowing, retain the rejection reason, and make the final branch exhaustive.`;
    }
    if (/object-contracts|classes-encapsulation/.test(moduleId)) {
      return `A scheduling record has id "job-${n}", an optional owner, readonly creation time, and a mutable status transition. Reject a misspelled status field, protect the invariant, and show which readonly promise exists only at compile time.`;
    }
    if (/functions-overloads|generics-relationships/.test(moduleId)) {
      return `A lookup accepts keys "id" and "status" from records numbered ${n}–${n + 2}. Preserve the relationship between the selected key and return type, then reject a callback that handles a narrower record than callers may supply.`;
    }
    if (/type-transforms/.test(moduleId)) {
      return `Derive public patch, readonly view, and event-name types from a service model with id, status, and retryCount. A newly added region field must flow through the intended transform without exposing internal secret fields.`;
    }
    if (/state-machines/.test(moduleId)) {
      return `Model idle → loading → success|failure for request ${n}. Each state owns only valid fields, stale request ${n - 1} cannot overwrite the result, and adding "cancelled" must create an exhaustiveness diagnostic until handled.`;
    }
    if (/modules-declarations/.test(moduleId)) {
      return `Package @learn/status-${n} exports one ESM runtime function and one public type through package exports. Verify Node resolution, declaration lookup, type-only import erasure, and failure from an unexported internal path.`;
    }
    if (/async-platform/.test(moduleId)) {
      return `Two typed fetches race for service ${n}; abort the stale request, validate unknown JSON, update an aria-live status only from the winning response, and distinguish AbortError from a schema failure.`;
    }
    if (/testing-refactoring/.test(moduleId)) {
      return `A refactor renames retryCount to attempts while retaining runtime behavior. Require a runtime boundary test, a compile-time rejection fixture, and a changed schema with attempts:"${n}" that must not enter the trusted model.`;
    }
    return `A ${activityKind} TypeScript boundary receives unknown service record ${n}. Narrow it with runtime evidence, preserve the declared type relationship, emit and run JavaScript, and retain the diagnostic or assertion that proves the boundary.`;
  }

  if (family === 'javascript') {
    if (/runtime-evidence|values-types/.test(moduleId)) {
      return `Normalize service inputs [" ${n} ", ${n}, null, {value:${n}}] without implicit-coercion surprises. Record typeof, equality, parsed value, and the exact branch that rejects the object case.`;
    }
    if (/bindings-scope|functions-contracts/.test(moduleId)) {
      return `Create two independent status counters seeded at ${n} and ${n + 3}. Calls must preserve closure isolation, explicit inputs and returns, and a trace showing why a shadowed binding does not update outer state.`;
    }
    if (/control-expressions/.test(moduleId)) {
      return `Route tickets with priority ${n}, role "viewer", and maintenance=false through an explicit decision table. Then flip maintenance to true and prove exactly one branch owns the changed outcome.`;
    }
    if (/collections-iteration/.test(moduleId)) {
      return `Process incidents [{id:"a",minutes:${n}},{id:"b",minutes:${n + 3}},{id:"a",minutes:${n + 4}}]. Preserve stable order, state duplicate policy, avoid accidental mutation, and report every callback result.`;
    }
    if (/objects-prototypes|classes-composition/.test(moduleId)) {
      return `Build job "J-${n}" from validated input, compose retry and notification policies, and prove an inherited or delegated method reads the intended receiver without sharing mutable defaults.`;
    }
    if (/errors-debugging/.test(moduleId)) {
      return `Import ${n + 2} rows containing one malformed record and one simulated storage failure. Preserve the original error cause, clean up resources, recover only the expected row failure, and let programming defects surface.`;
    }
    if (/async-event-loop/.test(moduleId)) {
      return `Schedule a microtask, timer, and two fetch-like promises for request ${n}; abort the stale request and predict the observable log order before running it. No unhandled rejection may escape.`;
    }
    if (/modules-packages/.test(moduleId)) {
      return `Split status parsing, policy, and UI adapters into ESM modules for release ${n}. Verify live binding behavior, package export boundaries, dependency provenance, and a clean import in a fresh runtime.`;
    }
    if (/dom-events/.test(moduleId)) {
      return `An accessible status filter has ${n + 2} options, works by keyboard and pointer, survives dynamic list updates through delegation, restores focus after removal, and announces the changed result count.`;
    }
    if (/web-data-security/.test(moduleId)) {
      return `Fetch unknown status JSON containing a hostile "<img onerror>" label, cancel request ${n - 1}, render with textContent, minimize stored data, and expose a recoverable error without leaking credentials.`;
    }
    if (/testing-quality/.test(moduleId)) {
      return `A release candidate passes the familiar ${n}-record fixture but fails an empty list and a duplicate identifier. Reproduce both, add behavior and accessibility regressions, and reject release until the clean build agrees.`;
    }
    return `Run a changed ${activityKind} JavaScript case with ${n + 2} records. Trace values, state, queued work, and DOM or return output; then preserve the smallest assertion that would catch a regression.`;
  }

  if (family === 'go') {
    if (/toolchain-programs-packages/.test(moduleId)) {
      return `A ${activityKind} status command is tested with Go 1.26.5 for linux/amd64 and the browser Yaegi subset. Predict package initialization, output, artifact identity, and which go fmt, test, vet, build, env, doc, or version evidence is still missing before release ${n}.`;
    }
    if (/values-variables-types|control-flow-defer/.test(moduleId)) {
      return `Configuration case ${n} distinguishes omitted retries, explicit zero, a typed duration, a shadowed status, and two deferred cleanup records. Trace types, scope, conversion, branch, iteration, and final cleanup order before running.`;
    }
    if (/functions-closures-contracts/.test(moduleId)) {
      return `Build ${n} independent rule closures with thresholds ${n * 5} and ${n * 7}; preserve multiple-result failure evidence, forward one variadic slice deliberately, and prove recursion reaches a bounded base case.`;
    }
    if (/arrays-slices-memory/.test(moduleId)) {
      return `A batch slice exposes ${n + 2} of ${n + 6} records from shared storage. Append one result, mutate one element, clone one boundary, and predict length, capacity, aliasing, and retained storage after every operation.`;
    }
    if (/maps-strings-unicode/.test(moduleId)) {
      return `Incident labels include "café", "café", "東京", invalid UTF-8, and ${n} repeated ASCII keys. Count without confusing missing and zero, report byte and rune evidence, then sort keys for deterministic output.`;
    }
    if (/structs-methods-composition/.test(moduleId)) {
      return `Job J-${n} has a zero owner, embedded audit metadata, a pointer transition method, and a value summary method. Predict method sets, promoted names, copies, nil behavior, and which constructor invariant remains bypassable.`;
    }
    if (/interfaces-errors-boundaries|failures-resources-recovery/.test(moduleId)) {
      return `Notifier case ${n} receives a typed-nil implementation, wraps a sentinel timeout, joins cleanup failure, and panics in one isolated plugin. Preserve dynamic-type evidence, error causes, resource ownership, and the narrow recover boundary.`;
    }
    if (/packages-modules-workspaces/.test(moduleId)) {
      return `A two-module workspace proposes dependency v${n}.2.0, a local replace, toolchain go1.26.5, and a public v2 package path. Explain MVS, checksum and proxy evidence, workspace-only success, API naming, and release compatibility.`;
    }
    if (/generics-constraints-iterators/.test(moduleId)) {
      return `A collection helper relates key type K to value type V for ${n + 2} records. Compare concrete, interface, generic, and reflection designs; constrain only required operations and identify the Go 1.26 feature that the browser subset cannot certify.`;
    }
    if (/testing-fuzzing-quality/.test(moduleId)) {
      return `A parser passes ${n} table cases but fails malformed UTF-8 and aliases input. Add a changed subtest, a double-transform fuzz property, a controlled benchmark, and separate coverage, vet, race, and Go 1.26 modernizer claims.`;
    }
    if (/goroutines-channels-select/.test(moduleId)) {
      return `Pipeline ${n} starts ${n + 2} workers, has a two-slot buffer, one early consumer exit, two simultaneously ready select cases, and one unclosed output. Trace ownership, blocking, close authority, result order, and every goroutine's stop path.`;
    }
    if (/context-cancellation-backpressure/.test(moduleId)) {
      return `Request ${n} launches validation, lookup, and audit work under a ${n * 20}ms deadline. One stage blocks after cancellation and the input queue grows. Bound concurrency, propagate cause, choose overload behavior, and prove no goroutine remains.`;
    }
    if (/memory-model-synchronization/.test(moduleId)) {
      return `Workers concurrently publish a map-backed snapshot and increment two related counters. Output looks plausible in ${n} runs. Establish happens-before edges, choose channel, mutex, or atomic ownership, and state what go test -race can and cannot prove.`;
    }
    if (/io-serialization-cli/.test(moduleId)) {
      return `Command import-${n} reads chunked JSON with an unknown field and a 2 MiB string, writes a report through a temporary path, crosses a time-zone boundary, and receives cancellation. Define streaming limits, atomicity, cleanup, stderr, and exit evidence.`;
    }
    if (/http-services-security/.test(moduleId)) {
      return `Service request ${n} has a hostile label, oversized body, slow dependency, duplicate header, and client cancellation during shutdown. Bound resources, validate and encode by sink, preserve stable responses, and drain owned work without leaking internals.`;
    }
    return `Release candidate ${n} is slower under representative load, grows goroutines, allocates short-lived objects, and calls one vulnerable dependency symbol. Choose profiles and traces, validate behavior, evaluate PGO, gate the patched toolchain, and defend rollback.`;
  }

  if (family === 'sql') {
    if (/data-systems-lifecycle/.test(moduleId)) {
      return `A ${activityKind} support system has ${n} spreadsheets, repeated customer identifiers, conflicting ticket status values, and no destruction date. Trace one data item through its lifecycle and the query-processing components before selecting a storage boundary.`;
    }
    if (/relational-model-keys-nulls|modeling-normalization/.test(moduleId)) {
      return `Model teams, members, tickets, and events where members may be unassigned, ticket titles repeat, and one ticket has ${n} events. Declare row grain, candidate keys, cardinalities, NULL meaning, dependencies, and lossless relationships.`;
    }
    if (/select-expressions-types|filtering-logic-order/.test(moduleId)) {
      return `Return unresolved high-or-critical tickets plus unowned work from the seeded database. Expose ticket_id, a readable owner label, age bucket ${n}, and deterministic severity/opened ordering; then test a NULL owner and tied timestamp.`;
    }
    if (/aggregation-grouping|joins-cardinality/.test(moduleId)) {
      return `Report every team with ticket count, unresolved count, and total event minutes. Team Drift has no tickets and ticket 101 has ${n} events; predict result grain and prove joins do not multiply either measure.`;
    }
    if (/subqueries-ctes-sets|window-analytics-time/.test(moduleId)) {
      return `Compare each ticket with its team's effort and severity peers, retain teams with no resolved work, and rank ties deliberately. Build named query stages, one changed window of ${n} rows, and a reconciliation total.`;
    }
    if (/data-modification|ddl-constraints-migrations/.test(moduleId)) {
      return `Import ticket 20${n} twice, reassign one unowned ticket, reject an invalid severity, and migrate a required category field without breaking the old writer. Preview mutation scope and retain rollback plus changed-row evidence.`;
    }
    if (/transactions-concurrency-recovery/.test(moduleId)) {
      return `Operators A and B read ticket 103 as open; A assigns it while B resolves it and a failure occurs between event insert and status update. Identify the anomaly, transaction boundary, retry precondition, and restore evidence.`;
    }
    if (/views-triggers-programs/.test(moduleId)) {
      return `Publish a stable open_ticket_queue view and audit status changes for ticket 10${n}. Expose no private member fields, prevent recursive trigger behavior, and prove rollback removes both visible and audit effects.`;
    }
    if (/indexes-plans-performance/.test(moduleId)) {
      return `Queue queries filter status and severity, order by opened_at, and join owner_id across ${n * 1000} modeled rows. Compare baseline and indexed plans, preserve results, and account for insert and storage cost.`;
    }
    if (/security-privacy-programmatic/.test(moduleId)) {
      return `A viewer submits severity text "high' OR 1=1 --" and sort direction "desc" while requesting member details. Bind values, allow-list structure, minimize returned fields, apply least privilege, and redact audit evidence.`;
    }
    return `Move a SQLite 3.49.1 ${activityKind} artifact toward PostgreSQL 18.4 while preserving relational intent. Record one dialect difference, consistency boundary, restore signal, and changed case ${n}; justify any non-relational component.`;
  }

  if (family === 'functional') {
    if (/purity|immutability|effects/.test(moduleId)) {
      return `An order starts as {id: "A-${n}", subtotal: ${24 + n}, tags: ["member"]}. Two reruns must return the same discounted record while the original order and nested tags remain unchanged.`;
    }
    if (/iterator|itertools|streams/.test(moduleId)) {
      return `A one-pass sensor iterator yields [${n}, ${n + 3}, malformed, ${n + 8}, ${n + 13}]. Consume at most ${n + 2} records, report malformed input, and never restart or materialize the open-ended source.`;
    }
    if (/callables|composition|higher-order/.test(moduleId)) {
      return `Three intake records need normalize → validate → score transformations. A rejected record must retain its reason, and adding a fourth transformation must not change earlier function contracts.`;
    }
    if (/closures|decorators/.test(moduleId)) {
      return `Create two validators with thresholds ${n * 5} and ${(n + 1) * 5}. Their captured settings must remain isolated across repeated calls, and wrappers must preserve names, signatures, returns, and exceptions.`;
    }
    if (/errors|results|pattern/.test(moduleId)) {
      return `Batch rows include one valid mapping, one missing identifier, and one unsupported variant. Return explicit success or failure data for every row without swallowing an unexpected programming defect.`;
    }
    if (/testing|architecture/.test(moduleId)) {
      return `A local decision core receives an injected clock and storage callable. Replaying the same ${n}-event fixture must reproduce decisions while I/O failures stay at the imperative boundary.`;
    }
    return `Transform ${n + 2} service records through an explicit callable pipeline; preserve input ownership, failure information, deterministic order, and a rerunnable evidence trace.`;
  }

  if (family === 'algorithms') {
    if (/asymptotic|proof|recurrence|amortized|complexity/.test(moduleId)) {
      return `Compare input sizes ${n * 10}, ${n * 20}, and ${n * 40}; define the counted operation, predict the growth ratio, then challenge the claim with a reversed or duplicate-heavy input.`;
    }
    if (/sequence|sorting|search-selection/.test(moduleId)) {
      return `Use the sequence [${n + 4}, ${n}, ${n + 4}, ${n - 1}, ${n + 7}, ${n + 1}]. Preserve duplicate policy, identify the boundary target, and report comparisons rather than elapsed time alone.`;
    }
    if (/linked|stacks|queues|deques/.test(moduleId)) {
      return `Apply ${n + 4} mixed insert, remove, peek, and empty operations. After each operation, verify size, reachable links, boundary pointers, and underflow behavior.`;
    }
    if (/hash/.test(moduleId)) {
      return `Insert keys ["aa", "bb", "aa", "cc-${n}"] under a collision-heavy hash fixture, delete one key, then prove lookup and load-factor behavior still match the dictionary contract.`;
    }
    if (/tree|balanced/.test(moduleId)) {
      return `Insert keys [${n + 4}, ${n + 2}, ${n + 6}, ${n + 1}, ${n + 3}] in order, then update or rotate once and verify ordering, cached metadata, reachability, and height conditions.`;
    }
    if (/heap|priority/.test(moduleId)) {
      return `Schedule jobs [(2,"audit"), (1,"restore"), (2,"notify-${n}")]. Preserve stable ties, remove one stale entry, and verify every pop respects the documented priority contract.`;
    }
    if (/trie|string/.test(moduleId)) {
      return `Index ["resume", "résumé", "result", "rest"] under an explicit Unicode policy, then query "res" and a repeated-prefix failure case without claiming hash equality proves text equality.`;
    }
    if (/shortest-path/.test(moduleId)) {
      return `Route edges A→B:${n}, A→C:${n + 3}, B→C:-1, C→D:${n}. Select an algorithm from weight preconditions, return a concrete path, and report any reachable negative-cycle witness.`;
    }
    if (/graph|directed|component|topological/.test(moduleId)) {
      return `Analyze directed edges A→B, A→C, B→D, C→D, and D→B. Report traversal order separately from reachability, return a cycle witness, and reject invalid topological claims.`;
    }
    if (/spanning|disjoint/.test(moduleId)) {
      return `Connect four sites with weighted edges AB:${n}, AC:${n + 2}, BC:${n + 1}, BD:${n + 4}, CD:${n}. Trace representatives or safe edges and state what resilience the result does not guarantee.`;
    }
    if (/dynamic|knapsack/.test(moduleId)) {
      return `Choose from items (value,weight) [(6,2),(10,3),(${n + 9},4)] with capacity ${n + 4}. Define state meaning, transition order, and reconstruction before optimizing memory.`;
    }
    if (/greedy|backtracking|branch-bound/.test(moduleId)) {
      return `Schedule intervals [(1,3),(2,5),(4,6),(${n},${n + 2})]. Compare a tempting local choice with a counterexample, then justify every prune or exchange.`;
    }
    if (/flow|matching/.test(moduleId)) {
      return `Assign workers {A,B,C} to jobs {1,2,3} with one forbidden pair and capacity ${n}. Trace residual changes, reconstruct matched pairs, and use a cut as optimality evidence.`;
    }
    if (/randomized|approximation/.test(moduleId)) {
      return `Run ${n * 10} seeded trials on an adversarial ordering. Report expected cost, observed distribution, error probability, and approximation guarantee as separate claims.`;
    }
    return `Solve a bounded ${activityKind} instance with ${n + 3} inputs. State the invariant, trace each state change, count the chosen operation, and retain the smallest counterexample.`;
  }

  return `Use a changed ${activityKind} case derived from this module: ${moduleId.replaceAll('-', ' ')}. Preserve inputs, constraints, an observable trace, and a boundary result.`;
}

function domainReasoningMove(family, moduleId) {
  if (moduleId.startsWith('crawler-go-')) {
    return 'Name owner permission, stakeholder outcome, revision and Go version, seed and net/url identity, origin and robots policy, request and body state, parser and record provenance, graph and frontier transition, origin eligibility, goroutine and context owner, privacy and accessibility boundary, report, failure, cleanup, rollback, recovery, and native transfer limit; run one pure deterministic Go crawler decision model; then change one authority, URL, robots, response, HTML, selector, frontier, goroutine, Colly, report, deployment, or restore condition.';
  }
  if (moduleId.startsWith('crawler-ts-')) {
    return 'Name owner authorization, stakeholder outcome, source and emitted revision, Node and TypeScript versions, seed and WHATWG URL identity, robots and Fetch state, unknown parser value, record provenance, frontier and Promise settlement, AbortSignal reason, browser and accessibility boundary, report, failure, handle cleanup, rollback, recovery, and native transfer limit; run one pure deterministic TypeScript crawler decision model; then change one authority, URL, robots, stream, Cheerio, selector, Promise, checkpoint, axe, Playwright, package, or restore condition.';
  }
  if (moduleId.startsWith('feed-go-')) {
    return 'Name reader and publisher outcome, revision and Go version, tenant and source identity, discovery and resolved URL, RSS or Atom construct, XML and HTTP budgets, validator, normalized provenance, PostgreSQL transaction and lease, goroutine and cancellation ownership, API and accessible reader result, failure, cleanup, rollback, recovery, and native transfer limit; run one pure deterministic Go feed-service model; then change one format, URL, entity, response, constraint, migration, schedule, lease, tenant, cursor, reader state, deployment, or restore condition.';
  }
  if (moduleId.startsWith('feed-ts-')) {
    return 'Name reader and publisher outcome, source, compiler and emitted-runtime revision, tenant and URL identity, RSS or Atom construct, unknown parser value and runtime validation, Fetch stream and AbortSignal, Promise and timer ownership, PostgreSQL client and lease, Express response, accessible reader state, failure, handle cleanup, rollback, recovery, and native transfer limit; run one pure deterministic TypeScript feed-service model; then change one format, entity, dangerous key, stream, Promise order, query, migration, lease, tenant, cursor, sanitizer, package, deployment, or restore condition.';
  }
  if (moduleId.startsWith('pokedex-go-')) {
    return 'Name field user and command outcome, revision and Go version, resource and resolved identity, request, response and cache state, page or collection transition, goroutine and channel ownership, context and cancellation, output accessibility, failure, cleanup, rollback, recovery, and native transfer limit; run one pure deterministic Go Pokedex decision model; then change one command, API fixture, pagination link, cache age, schedule, cancellation, collection, location relation, file, package, or recovery condition.';
  }
  if (moduleId.startsWith('pokedex-ts-')) {
    return 'Name learner and command outcome, revision, Node and TypeScript versions, unknown runtime input and validation result, resource identity, request and Response state, Promise generation, cache and waiter ownership, AbortSignal reason, immutable view or collection transition, output accessibility, failure, cleanup, rollback, recovery, and Node transfer limit; run one pure deterministic TypeScript Pokedex decision model; then change one command, unknown payload, URL, status, Promise schedule, cache age, abort, collection, location relation, file, package, or recovery condition.';
  }
  if (moduleId.startsWith('agentpy-')) {
    return 'Name stakeholder task, risk tier, revision, Python, SDK, API and model identity, interaction and call IDs, tool schema and authority, state, loop and resource budgets, approval, memory and privacy boundary, evaluation version, trace, failure, rollback, recovery, and controlled provider transfer limit; run one fixed-fixture pure-Python agent decision model; then change one model capability, schema, tool call, permission, result, loop state, approval, memory, injection, evaluation, cost, framework, sandbox, deployment, or recovery condition.';
  }
  if (moduleId.startsWith('scraper-')) {
    return 'Name owner authorization, stakeholder outcome, revision, Python and dependency versions, seed and URL identity, origin and path policy, robots and sitemap evidence, request and response budgets, parser and selector contract, record and link provenance, frontier state, concurrency ownership, privacy and security boundary, report accessibility, failure, stop, rollback, recovery, and native transfer limit; run one fixed-fixture pure-Python crawler decision model; then change one authorization, URL, response, markup, selector, frontier, timing, session, dynamic-rendering, privacy, security, export, or recovery condition.';
  }
  if (moduleId.startsWith('maze-')) {
    return 'Name player goal, revision, Python and Tcl/Tk versions, grid and coordinate identity, seed, topology, algorithm frontier, action and event trace, state transition, render and accessibility evidence, resource budget, failure, recovery, and native transfer limit; run one pure deterministic Python model; then change one dimension, seed, wall, algorithm, heuristic, callback, focus path, scale, save, package, or release condition.';
  }
  if (moduleId.startsWith('static-site-')) {
    return 'Name reader outcome, content authority, revision, Python and tool versions, source span, parser scope, trust policy, route base, output and artifact identity, accessibility requirement, byte and work budgets, deployment boundary, failure, rollback, and recovery; run one pure deterministic Python publication model; then change one document, delimiter, route, link, asset, viewport, cache, deployment, or recovery condition.';
  }
  if (moduleId.startsWith('asteroids-')) {
    return 'Name player goal, revision, runtime, seed, input frame, time step, coordinate units, game state, entity ownership, collision phase, render and cue records, accessibility setting, resource budget, failure, recovery, and desktop transfer limit; run one pure deterministic Python model; then change one frame rate, stall, seam, device, collision, cue, save, package, or release condition.';
  }
  if (moduleId.startsWith('bookbot-')) {
    return 'Name user decision, corpus authority and identity, repository revision, path and byte boundary, encoding and Unicode policy, token and count invariants, deterministic rank, report and stream contracts, command status, test evidence, package artifact, rollback, recovery, and native transfer limit; run one pure deterministic Python model; then change one file, Unicode sequence, boundary split, tie, argument, failure, or release condition.';
  }
  if (moduleId.startsWith('storage-ts-')) {
    return 'Name stakeholder and file identity, unknown-input schema, object key and version, representation, tenant and authorization, byte, time, attempt, promise, stream, concurrency, cache, and cost budgets, state, checksum, AbortSignal, cleanup, rollback, and recovery; run a pure deterministic TypeScript model; then change one runtime input or failure and state the strict compiler, Node, stream and handle, AWS SDK v3, S3, CloudFront, IAM, KMS, WAF, load, cost, restore, or production transfer gate.';
  }
  if (moduleId.startsWith('storage-go-')) {
    return 'Name stakeholder and file identity, object key and version, representation, tenant and authorization, byte, time, attempt, concurrency, cache, and cost budgets, custody and state, checksum, cancellation, cleanup, rollback, and recovery; run a pure deterministic Go model; then change one file or failure and state the Go compiler, race, leak, controlled AWS SDK, S3, CloudFront, IAM, KMS, WAF, load, cost, restore, or production transfer gate.';
  }
  if (moduleId.startsWith('rabbit-go-')) {
    return 'Name publisher intent, topology and route evidence, connection and channel generation, notification and goroutine ownership, message identity, byte, time, attempt, prefetch, and in-flight budgets, terminal delivery decision, durable effect, cancellation, cleanup, and recovery; run a pure deterministic Go model; then change one message or failure and state the Go compiler, race, leak, amqp091-go, RabbitMQ, TLS, partition, restart, load, upgrade, or production transfer gate.';
  }
  if (moduleId.startsWith('rabbit-ts-')) {
    return 'Name publisher intent, exchange and routing evidence, queue responsibility, message identity, ownership transfer, byte, time, attempt, and concurrency budgets, terminal delivery decision, effect, cleanup, and recovery; run a pure deterministic TypeScript model; then change one message or failure and state the amqplib, RabbitMQ, TLS, partition, restart, load, upgrade, or production transfer gate.';
  }
  if (moduleId.startsWith('http-server-go-')) {
    return 'Name method, authority, route, identity, resource budgets, handler and dependency ownership, response effect, cleanup, and recovery; run a pure deterministic Go decision model; then change one request or failure and state the listener, TLS, database, proxy, race, load, or production transfer gate.';
  }
  if (moduleId.startsWith('http-server-ts-')) {
    return 'Name runtime, method, authority, route, unknown-input boundary, identity, resource budgets, middleware and dependency ownership, response effect, cleanup, and recovery; run a pure deterministic TypeScript decision model; then change one input or failure and state the Node, Express, listener, TLS, PostgreSQL, proxy, worker, load, or production transfer gate.';
  }
  if (/^http-(?:go|ts|py)-/.test(moduleId)) {
    return 'State method semantics, target authority, credential scope, body ownership, byte and time budgets, and expected status or schema; trace resolution, transport, redirects, and attempts; then test one changed failure with deterministic cleanup evidence.';
  }
  if (family === 'portfolio') {
    return 'Name the stakeholder decision, affected people, authority, assumption, revision, artifact, observable behavior, changed case, rejected failure, accessibility, security, privacy, operation, recovery, contribution, residual risk, and transfer limit; then calibrate the public claim to that exact evidence.';
  }
  if (family === 'career') {
    return 'Name learner goal, target role, jurisdiction, audience, claim, contribution, source date, evidence revision, accessibility, privacy, consent, process state, changed candidate, rejected failure, causal repair, decision owner, non-claim, and transfer limit; then calibrate the application or career decision to that exact evidence.';
  }
  if (family === 'support') {
    return 'Name user impact, fictional ticket, asset and environment identity, authorization, hazard and stop condition, baseline, symptom, timeline, competing hypotheses, bounded reversible test, prediction, observation, least-change repair, rollback, original and changed-case verification, prevention, escalation, accessible privacy-safe handoff, remaining uncertainty, and controlled transfer limit; then reject the first unsupported causal inference.';
  }
  if (family === 'linux') {
    return 'Capture identity, path, process, file, and service state; predict parsing and scope; run one safe simulated observation; interpret exit status; then change one bounded layer and verify rollback.';
  }
  if (family === 'git') {
    return 'Locate repository and operation state, compare working tree, index, refs, and graph, preserve a recovery reference, preview the smallest change, then verify both tree behavior and history topology.';
  }
  if (family === 'typescript') {
    return 'Separate compile-time claims from runtime facts, narrow every external unknown with executable evidence, inspect diagnostics and emitted JavaScript, then test a changed schema without assertions or suppression.';
  }
  if (family === 'javascript') {
    return 'Trace concrete runtime values, bindings, receiver, mutation, and queued work in order; assert the observable result, then change one input or event and seek the first causal divergence.';
  }
  if (family === 'go') {
    return 'Declare types, ownership, goroutine lifetime, failure contract, and observable result; trace value copies, aliases, blocking, and happens-before edges; run the smallest isolated program; then change one boundary input and retain a regression invariant.';
  }
  if (family === 'sql') {
    return 'Declare result or mutation grain, keys, NULL meaning, and transaction boundary; predict cardinality and invariants; run the smallest query; reconcile counts and plans; then test changed data and dialect limits.';
  }
  if (family === 'docker') {
    return 'Name client, daemon, builder, image, container, host-kernel, storage, network, registry, and supply-chain boundaries; predict state and authority; review the smallest deterministic manifest change; then verify a failure, repair, cleanup, and live-environment transfer limit.';
  }
  if (family === 'kubernetes') {
    return 'Name context, namespace, API identity, desired spec, observed status, controller authority, workload, network, storage, identity, policy, and failure-domain boundaries; predict reconciliation; review the smallest deterministic manifest change; then verify a failure, repair, rollback, and disposable-cluster transfer limit.';
  }
  if (family === 'cicd') {
    return 'Name event, workflow, revision, actor, permissions, runner, toolchain, dependency, artifact, environment, deployment, user-signal, and recovery boundaries; predict every state and trust transition; review the smallest deterministic workflow or release change; then verify a fault, repair, rollback, and authorized live-system transfer limit.';
  }
  if (family === 'functional') {
    return 'Mark values and effects, snapshot owned inputs, compose one transformation at a time, run the same case twice, then test a changed stream or failure.';
  }
  if (family === 'algorithms') {
    return 'Define input size and invariant, trace a minimal instance, count the governing operation, then seek an adversarial counterexample before optimizing.';
  }
  return null;
}

function domainOrderOptions(family, id, contextLabel, httpTrack) {
  const labels = httpTrack?.startsWith('CompTIA A+ support')
    ? [
        `Declare ${httpTrack} user outcome, fictional ticket, asset and environment identity, authorization, hazards, accessibility and privacy needs, baseline, and stop conditions`,
        `Predict ${httpTrack} reproduction, timeline, competing hypotheses, bounded test outcomes, evidence quality, escalation, and rollback triggers`,
        `Run the smallest deterministic ${httpTrack} manifest review and retain the actual observation, rejected inference, next decision, and remaining uncertainty`,
        `Change one ${httpTrack} user, device, version, hazard, symptom, access need, or competing cause; verify repair, rollback, original and changed cases, prevention, handoff, and controlled equipment transfer limits`,
      ]
    : httpTrack?.startsWith('Feed aggregation and Go')
      ? [
          `Declare ${httpTrack} reader and publisher outcome, revision, tenant, source and URL identity, feed format, PostgreSQL ownership, accessibility need, and byte, time, concurrency, retention, and recovery budgets`,
          `Predict ${httpTrack} discovery, fetch, XML admission, normalization, transaction, schedule, lease, API, reader, failure, cancellation, rollback, and recovery outcomes`,
          `Run the smallest deterministic ${httpTrack} pure-Go model and retain exact identity, provenance, state, ownership, changed-case, rejection, and cleanup evidence`,
          `Change one ${httpTrack} format, URL, response, XML, constraint, migration, schedule, lease, goroutine, tenant, reader, deployment, or restore condition, verify bounded rejection or repair, and state controlled native transfer limits`,
        ]
      : httpTrack?.startsWith('Feed aggregation and TypeScript')
        ? [
            `Declare ${httpTrack} reader and publisher outcome, source and emitted revision, tenant, URL, unknown XML, runtime validation, PostgreSQL ownership, accessibility need, and byte, time, Promise, handle, retention, and recovery budgets`,
            `Predict ${httpTrack} discovery, Fetch stream, XML parse, runtime admission, transaction, Promise, timer, lease, Express, reader, failure, abort, rollback, and recovery outcomes`,
            `Run the smallest deterministic ${httpTrack} pure-TypeScript model and retain exact unknown input, validation, identity, immutable state, settlement, changed-case, rejection, and cleanup evidence`,
            `Change one ${httpTrack} format, entity, dangerous key, stream, Promise order, query, migration, lease, tenant, sanitizer, package, deployment, or restore condition, verify bounded rejection or repair, and state controlled Node transfer limits`,
          ]
        : httpTrack?.startsWith('Safe AI agents')
          ? [
              `Declare ${httpTrack} stakeholder outcome, risk tier, revision, Python and dependency versions, model and tool boundaries, authority, data class, and turn, token, time, cost, and retry budgets`,
              `Predict ${httpTrack} validation, model, tool proposal, authorization, execution, state, stream, failure, stop, rollback, and recovery outcomes`,
              `Run the smallest deterministic ${httpTrack} pure-Python model and retain exact input, decision, trace, changed-case, rejection, and recovery evidence`,
              `Change one ${httpTrack} input, schema, model response, tool argument, approval, state, failure, security, evaluation, or release condition, verify bounded rejection or repair, and state controlled native-provider transfer limits`,
            ]
          : httpTrack?.startsWith('Authorized crawling')
            ? [
                `Declare ${httpTrack} owner authorization, stakeholder outcome, revision, runtime and dependency versions, seed and URL identity, scope, robots policy, privacy boundary, and page, byte, time, concurrency, and retention budgets`,
                `Predict ${httpTrack} admission, fetch, redirect, decode, parse, extract, normalize, schedule, render, report, failure, stop, rollback, and recovery outcomes`,
                `Run the smallest deterministic ${httpTrack} fixed-fixture pure-Python model and retain exact policy, provenance, frontier, changed-case, and rejection evidence`,
                `Change one ${httpTrack} authorization, URL, response, markup, selector, frontier, timing, session, browser, privacy, security, export, or recovery condition, verify bounded rejection or repair, and state controlled native and owner transfer limits`,
              ]
            : httpTrack?.startsWith('Maze')
              ? [
                  `Declare ${httpTrack} player outcome, revision, Python and Tcl/Tk versions, grid identity, coordinate units, seed, accessibility profile, and state, callback, render, memory, and time budgets`,
                  `Predict ${httpTrack} topology, frontier, state transition, event, callback, rendering, accessibility, failure, cancellation, rollback, and recovery outcomes`,
                  `Run the smallest deterministic ${httpTrack} pure-Python model and retain exact topology, state, frontier, event, and changed-case evidence`,
                  `Change one ${httpTrack} dimension, seed, wall, algorithm, heuristic, callback, focus path, scale, save, package, or release condition, verify bounded rejection or repair, and state native Tk transfer limits`,
                ]
              : httpTrack?.startsWith('Static-site')
                ? [
                    `Declare ${httpTrack} reader outcome, content authority, revision, source identity, parser scope, trust policy, route base, accessibility need, and byte, depth, work, and output budgets`,
                    `Predict ${httpTrack} admission, decoding, parsing, transformation, routing, rendering, validation, publication, failure, rollback, and recovery outcomes`,
                    `Run the smallest deterministic ${httpTrack} publication model and retain exact intermediate and changed-case results`,
                    `Change one ${httpTrack} document, delimiter, nesting, route, URL, asset, viewport, cache, deployment, or recovery condition, verify bounded rejection or repair, and state production transfer limits`,
                  ]
                : httpTrack?.startsWith('Asteroids')
                  ? [
                      `Declare ${httpTrack} player outcome, revision, runtime, seed, input trace, accessibility profile, and frame, entity, collision, audio, and memory budgets`,
                      `Predict ${httpTrack} event, intent, simulation, collision, cleanup, rendering, cue, failure, pause, rollback, and recovery outcomes`,
                      `Run the smallest deterministic ${httpTrack} simulation model and retain exact intermediate and changed-case results`,
                      `Change one ${httpTrack} frame rate, stall, seam, device, collision, cue, save, package, or release condition, verify bounded rejection or repair, and state desktop transfer limits`,
                    ]
                  : httpTrack?.startsWith('Bookbot')
                    ? [
                        `Declare ${httpTrack} user outcome, corpus authority and identity, revision, text policy, command contract, and byte, time, memory, and output budgets`,
                        `Predict ${httpTrack} admission, decoding, normalization, tokenization, counting, ranking, reporting, status, failure, cleanup, rollback, and recovery outcomes`,
                        `Run the smallest deterministic ${httpTrack} evidence model and retain exact intermediate and changed-case results`,
                        `Change one ${httpTrack} file, encoding, Unicode sequence, stream split, tie, argument, or release condition, verify bounded rejection or repair, and state native transfer limits`,
                      ]
                    : httpTrack?.startsWith('RAG')
                      ? [
                          `Declare ${httpTrack} stakeholder outcome, corpus, source, document, chunk, query, relevance, tenant, component versions, and time, token, memory, and cost budgets`,
                          `Predict ${httpTrack} ingestion, retrieval, filter, fusion, reranking, context, generation, citation, abstention, failure, cleanup, rollback, and recovery outcomes`,
                          `Run the smallest deterministic ${httpTrack} evidence model and retain exact intermediate and changed-case results`,
                          `Change one ${httpTrack} query, document, tenant, language, version, or attack condition, verify bounded rejection or abstention, and state native production transfer limits`,
                        ]
                      : httpTrack?.startsWith('Cryptography')
                        ? [
                            `Declare ${httpTrack} asset, adversary, required property, trust boundary, canonical bytes, suite, and byte, work, time, and secret-retention budgets`,
                            `Predict ${httpTrack} key and nonce ownership, state transition, tamper result, failure visibility, cleanup, rollback, and recovery outcomes`,
                            `Run the smallest deterministic ${httpTrack} decision or allowlisted API model and retain exact changed-case evidence`,
                            `Inject one changed ${httpTrack} byte, context, key, nonce, order, or policy failure, verify clean rejection, and state native transfer limits`,
                          ]
                        : httpTrack?.startsWith('S3')
                          ? [
                              `Declare ${httpTrack} stakeholder outcome, file and object identity, owner, state, and byte, time, concurrency, cache, and cost budgets`,
                              `Predict ${httpTrack} authorization, custody, transfer, integrity, cache, failure, cancellation, cleanup, rollback, and recovery outcomes`,
                              `Run the smallest deterministic ${httpTrack} storage decision model and retain inspectable changed-case evidence`,
                              `Inject one changed ${httpTrack} failure, verify bounded cleanup and recovery, and state controlled AWS transfer limits`,
                            ]
                          : httpTrack?.startsWith('RabbitMQ')
                            ? [
                                `Declare ${httpTrack} outcome, topology, ownership, identity, and byte, time, attempt, and concurrency budgets`,
                                `Predict ${httpTrack} publish, route, custody, delivery, effect, failure, cancellation, and recovery outcomes`,
                                `Run the smallest deterministic ${httpTrack} messaging model and retain inspectable changed-case evidence`,
                                `Inject one changed ${httpTrack} failure, verify bounded cleanup, and state live-broker transfer limits`,
                              ]
                            : httpTrack
                              ? [
                                  `Declare ${httpTrack} method semantics, target authority, credentials, body ownership, and byte and time budgets`,
                                  `Predict ${httpTrack} resolution, transport, redirect, status, representation, retry, and cleanup outcomes`,
                                  `Run the smallest deterministic ${httpTrack} request or response model and retain inspectable evidence`,
                                  `Inject one changed ${httpTrack} failure, verify bounded cleanup, and state live-network transfer limits`,
                                ]
                              : family === 'linux'
                                ? [
                                    'Capture user, directory, environment, target state, and authoritative command behavior',
                                    'Predict shell parsing, expansion, permissions, side effects, exit status, and safety boundary',
                                    'Run the smallest simulated observation or reversible change and retain exact output',
                                    'Verify changed state, failure path, rollback, and an accessible operations handoff',
                                  ]
                                : family === 'git'
                                  ? [
                                      'Inspect repository boundary, config origin, current operation, worktree, index, refs, and graph',
                                      'Preserve uncommitted work and a recovery ref, then state intended tree and topology',
                                      'Preview and perform the least destructive simulated Git operation',
                                      'Verify status, staged and range diffs, graph, tests, remote target, and recovery path',
                                    ]
                                  : family === 'typescript'
                                    ? [
                                        'Declare the domain relationship and identify every untrusted runtime boundary',
                                        'Infer or annotate the smallest sound type and validate unknown values before narrowing',
                                        'Run strict diagnostics, inspect emitted JavaScript, and execute the changed case',
                                        'Add compile-time rejection and runtime boundary evidence, then document remaining limits',
                                      ]
                                    : family === 'javascript'
                                      ? [
                                          'Declare inputs, observable output, ownership, and the runtime behavior being tested',
                                          'Trace values, bindings, receivers, mutations, and queued work before editing code',
                                          'Implement the smallest behavior and retain an assertion over the actual result',
                                          'Run boundary and changed-event cases, inspect failures, and remove accidental coupling',
                                        ]
                                      : family === 'go'
                                        ? [
                                            'Declare inputs, result and error contracts, ownership, and every goroutine stop condition',
                                            'Trace types, copies, aliases, deferred work, blocking points, and synchronization before editing',
                                            'Run the smallest isolated Go program and retain output or invariant evidence',
                                            'Change a boundary input or schedule, verify cleanup and races, then state toolchain limits',
                                          ]
                                        : family === 'sql'
                                          ? [
                                              'Declare stakeholder question, input relations, row grain, keys, NULL meaning, and expected cardinality',
                                              'Predict relational transformations, constraint or transaction effects, and dialect boundary before execution',
                                              'Run the smallest browser SQL statement and retain result rows, changed count, error, or query plan',
                                              'Reconcile totals and invariants, test changed data, and document security, recovery, and portability limits',
                                            ]
                                          : family === 'docker'
                                            ? [
                                                'Capture Docker versions, active context, desired artifact, current state, authority, and immutable identities',
                                                'Predict build, image, process, storage, network, Compose, security, and cleanup effects before mutation',
                                                'Review the smallest Dockerfile, Compose, Bake, or policy increment in the deterministic browser simulator',
                                                'Reject one failure, record repair and cleanup, then name the disposable live-environment transfer evidence',
                                              ]
                                            : family === 'kubernetes'
                                              ? [
                                                  'Capture client and server versions, context, namespace, API discovery, current object state, ownership, and immutable release identity',
                                                  'Predict admission, defaulting, scheduling, reconciliation, status, traffic, storage, security, disruption, and cleanup effects',
                                                  'Review the smallest manifest, Kustomize, Helm, policy, or runbook increment in the deterministic browser simulator',
                                                  'Reject one failure, record repair and rollback, then name authorized disposable-cluster transfer evidence',
                                                ]
                                              : family === 'cicd'
                                                ? [
                                                    'Capture event, workflow and revision identity, actor, permissions, runner, toolchain, dependency, artifact, environment, and release state',
                                                    'Predict expression, shell, graph, trust, cache, artifact, deployment, user-signal, failure, and cleanup effects before mutation',
                                                    'Review the smallest workflow, policy, build, attestation, or release increment in the deterministic browser simulator',
                                                    'Inject one fault, record causal evidence, repair and rollback, then name authorized disposable delivery-environment transfer evidence',
                                                  ]
                                                : family === 'functional'
                                                  ? [
                                                      'Separate immutable values from observable effects and ownership boundaries',
                                                      'Specify a total transformation contract and explicit failure representation',
                                                      'Compose and run the smallest pipeline while retaining an inspectable trace',
                                                      'Repeat with changed input, verify input preservation, and move effects to the shell',
                                                    ]
                                                  : family === 'algorithms'
                                                    ? [
                                                        'Define input, output, preconditions, size, and the operation being counted',
                                                        'Choose a correct baseline and state its loop or representation invariant',
                                                        'Trace the candidate on a minimal instance and derive time and space cost',
                                                        'Attack it with boundary and adversarial cases, then justify any optimization',
                                                      ]
                                                    : [
                                                        'Define the stakeholder decision, quantities, authority, and constraints',
                                                        'Choose and document the smallest defensible model or procedure',
                                                        'Execute the model while preserving inspectable intermediate evidence',
                                                        'Test boundaries and changed cases, communicate limits, and revise',
                                                      ];
  return labels.map((text, index) => ({
    id: `${id}-${['frame', 'model', 'execute', 'verify'][index]}`,
    text: contextLabel ? `${text} for the ${contextLabel} case` : text,
  }));
}

function httpDomainExample(family, moduleId, n) {
  if (!/^http-(?:go|ts|py)-/.test(moduleId)) return null;
  const target = family === 'go' ? 'go' : family === 'typescript' ? 'typescript' : 'python';
  const functionName = `worked_${moduleId.replaceAll('-', '_')}_${n}`;
  const contract = httpEvidenceContract({
    target,
    moduleId,
    functionName,
    marker: `// Evidence: ${moduleId}-worked-${n}`,
  });
  if (!contract) throw new Error(`Missing HTTP worked example for ${family} ${moduleId}`);
  return contract.example;
}

function domainExample(family, moduleId, seed) {
  const n = (seed % 4) + 2;
  if (moduleId.startsWith('crawler-go-')) {
    return webScraperGoWorkedExample(moduleId, n);
  }
  if (moduleId.startsWith('crawler-ts-')) {
    return webScraperTypescriptWorkedExample(moduleId, n);
  }
  if (moduleId.startsWith('feed-go-')) {
    return blogAggregatorGoWorkedExample(moduleId, n);
  }
  if (moduleId.startsWith('feed-ts-')) {
    return blogAggregatorTypescriptWorkedExample(moduleId, n);
  }
  if (moduleId.startsWith('pokedex-go-')) {
    return pokedexGoWorkedExample(moduleId, n);
  }
  if (moduleId.startsWith('pokedex-ts-')) {
    return pokedexTypescriptWorkedExample(moduleId, n);
  }
  if (moduleId.startsWith('agentpy-')) {
    return aiAgentPythonWorkedExample(moduleId, n);
  }
  if (moduleId.startsWith('scraper-')) {
    return webScraperPythonWorkedExample(moduleId, n);
  }
  if (moduleId.startsWith('maze-')) {
    return mazePythonWorkedExample(moduleId, n);
  }
  if (moduleId.startsWith('static-site-')) {
    return staticSitePythonWorkedExample(moduleId, n);
  }
  if (moduleId.startsWith('asteroids-')) {
    return asteroidsPythonWorkedExample(moduleId, n);
  }
  if (moduleId.startsWith('bookbot-')) {
    return bookbotPythonWorkedExample(moduleId, n);
  }
  if (moduleId.startsWith('cmem-')) {
    return cMemoryManagementWorkedExample(moduleId, n);
  }
  if (moduleId.startsWith('rag-')) {
    return ragPythonWorkedExample(moduleId, n);
  }
  if (moduleId.startsWith('crypto-go-')) {
    return cryptographyGoWorkedExample(moduleId, n);
  }
  if (moduleId.startsWith('storage-ts-')) {
    return fileServersS3TypescriptWorkedExample(moduleId, n);
  }
  if (moduleId.startsWith('storage-go-')) {
    return fileServersS3GoWorkedExample(moduleId, n);
  }
  if (moduleId.startsWith('rabbit-go-')) {
    return rabbitmqGoWorkedExample(moduleId, n);
  }
  if (moduleId.startsWith('rabbit-ts-')) {
    return rabbitmqTypescriptWorkedExample(moduleId, n);
  }
  if (moduleId.startsWith('http-protocol-go-')) {
    return httpProtocolGoWorkedExample(moduleId, n);
  }
  if (moduleId.startsWith('http-server-go-')) {
    return httpServerGoWorkedExample(moduleId, n);
  }
  if (moduleId.startsWith('http-server-ts-')) {
    return httpServerTypescriptWorkedExample(moduleId, n);
  }
  const httpExample = httpDomainExample(family, moduleId, n);
  if (httpExample) return httpExample;
  if (family === 'docker') return dockerWorkedExample(moduleId, n);
  if (family === 'kubernetes') return kubernetesWorkedExample(moduleId, n);
  if (family === 'cicd') return cicdWorkedExample(moduleId, n);
  if (family === 'portfolio') {
    return `workspace: portfolio
project-id: changed-product-${n}
stakeholder: affected-user review panel
decision: continue only if the changed task meets its outcome and guardrails
artifact: revision-bound evidence packet
claim: one bounded behavior survives the changed context
verify: reproduce the task, inspect the artifact, and compare the predeclared measure
changed-case: different access need, input, constraint, and dependency failure
failure: reject plausible output without causal, human, recovery, or ownership evidence
repair: isolate the first unsupported transition, correct it, and add a regression
owner: named learner and stakeholder reviewer
transfer-boundary: authorized controlled research and release environment`;
  }
  if (family === 'career') {
    return `workspace: career
candidate-id: fictional-candidate-${n}
target-role: accessible software quality engineer
jurisdiction: example location requiring current official review
audience: technical reviewer with ten minutes and keyboard-only access
claim: one bounded role behavior is supported by a revision-linked changed case
evidence: repository case study, exact test result, contribution note, and limitation
process-state: investigate before applying
accessibility: structured text, reflow, visible focus, plain-language status, and equivalent format
privacy-consent: publish no sensitive person or third-party data; contact only with explicit consent
decision: proceed only after identity, role, evidence, access, and risk checks pass
verify: inspect links, extraction order, revision, changed case, disclosure, and source date
failure: reject invented impact, hidden assistance, exposed data, or unverified recruiter identity
repair: correct the first unsupported claim and add a changed-candidate regression
owner: learner controls every external action
transfer-boundary: manual learner-approved profile, application, conversation, interview, and offer decisions`;
  }
  if (family === 'support') {
    return `workspace: support
ticket-id: fictional-ticket-${n}
user-impact: one user cannot complete the scheduled accessible service task
environment: fictional managed device, version, configuration, owner, dependency, and evidence time
safety-authority: consented text simulation only with hazard, privacy, access, and escalation stop rules
baseline: known-good fixture completes the task and records expected state plus user-visible status
symptom: changed fixture fails reproducibly under one recorded condition and preserves exact evidence
recent-change: one versioned change precedes the symptom while a competing unchanged case remains
hypothesis: the changed layer causes the symptom; a neighboring layer is the competing explanation
test: compare one safe reversible changed fixture with predicted outcomes and no real device mutation
observation: the actual result rejects one explanation and changes the next bounded decision
repair-rollback: restore the reviewed fixture state and revert on the named regression signal
verify: repeat original, changed user, changed input, restart, side-effect, and recurrence cases
prevention: monitor the causal signal, retain recovery evidence, assign an owner, and review on change
escalation: stop for physical, electrical, credential, malware, data, legal, or production authority
documentation: structured plain-language status, redaction, keyboard route, user handoff, and uncertainty
transfer-boundary: authorized disposable equipment or simulator only`;
  }
  if (family === 'linux') {
    if (/terminal-evidence|paths-hierarchy/.test(moduleId)) {
      return `pwd\nprintf 'shell=%s\\n' "$BASH_VERSION"\ntype -a printf\ncommand -V pwd\nprintf 'status=%d\\n' "$?"`;
    }
    if (/files-links-metadata/.test(moduleId)) {
      return `set -o noglob\nprintf 'target=%q\\n' "reports/run-${n}.txt"\nmkdir -p -- reports\ntouch -- "reports/run-${n}.txt"\nstat -- "reports/run-${n}.txt"`;
    }
    if (/streams-quoting-pipelines/.test(moduleId)) {
      return `set -o pipefail\ngrep -E '^INC-[0-9]+,high,' data/incidents.csv \\\n  >report.txt 2>report.err\nstatus=$?\nprintf 'pipeline_status=%d\\n' "$status"`;
    }
    if (/text-search-transforms/.test(moduleId)) {
      return `LC_ALL=C awk -F, 'NR > 1 { print $2, $1 }' data/incidents.csv \\\n  | sort -k1,1 -k2,2 \\\n  | uniq -c`;
    }
    if (/permissions-identity/.test(moduleId)) {
      return `id\numask\nstat -c 'mode=%a owner=%U group=%G path=%n' reports\n# Derive directory create/delete behavior before any chmod or ACL change.`;
    }
    if (/processes-signals-jobs/.test(moduleId)) {
      return `pgrep -a -P 2100\nps -o pid,ppid,stat,ni,cmd -p 2201\nkill -TERM 2201\n# Verify exit and cleanup before considering a stronger signal.`;
    }
    if (/services-logs/.test(moduleId)) {
      return `systemctl show lab-worker.service -p ActiveState -p SubState -p Result\njournalctl -u lab-worker.service -b --since '10 minutes ago'\n# Restart only after evidence identifies a reversible cause.`;
    }
    if (/bash-automation/.test(moduleId)) {
      return `#!/usr/bin/env bash\nset -Eeuo pipefail\ntmp=$(mktemp -d)\ntrap 'rm -rf -- "$tmp"' EXIT\n(( $# > 0 )) || { printf 'usage: %s FILE...\\n' "$0" >&2; exit 64; }\nprintf 'validated=%d\\n' "$#"`;
    }
    return `# Evidence: changed Linux case ${n}\n# hypothesis: one bounded state difference explains the observed symptom\npwd\nid\nstat README.md\n# observation: retain exact output and exit status before changing state`;
  }

  if (family === 'git') {
    if (moduleId.startsWith('git-advanced-')) return gitAdvancedWorkedExample(moduleId, seed);
    if (/working-index-commit/.test(moduleId)) {
      return `git status --short --branch\ngit diff -- README.md\ngit add --patch README.md\ngit diff --staged --check\ngit commit -m 'Document verified status behavior'`;
    }
    if (/history-objects/.test(moduleId)) {
      return `git log --graph --decorate --oneline --all\ngit show --stat --summary HEAD\ngit cat-file -t HEAD^{tree}\ngit log --follow -- docs/notes.txt`;
    }
    if (/branches-merges|conflicts-resolution/.test(moduleId)) {
      return `base=$(git merge-base main repair)\nprintf 'base=%s\\n' "$base"\ngit diff "$base"..repair\ngit ls-files --unmerged\n# Resolve intent, stage, test, then continue.`;
    }
    if (/remotes-collaboration/.test(moduleId)) {
      return `git remote -v\ngit fetch --prune origin\ngit log --left-right --graph --oneline main...origin/main\ngit push --dry-run origin main:main`;
    }
    if (/undo-recovery/.test(moduleId)) {
      return `git status --short\ngit branch recovery/before-repair\ngit diff\ngit reflog -n ${n + 2}\n# Choose restore, revert, or reset only after naming the affected layer.`;
    }
    if (/rebase-cherry-pick/.test(moduleId)) {
      return `git branch recovery/pre-rebase\ngit rebase --rebase-merges main\ngit range-diff recovery/pre-rebase...HEAD\ngit diff recovery/pre-rebase^{tree} HEAD^{tree}`;
    }
    if (/tags-releases/.test(moduleId)) {
      return `git status --porcelain=v1\ngit show --no-patch --format=fuller HEAD\ngit tag -a "v${n}.1.0" -m 'Verified release candidate' HEAD\ngit show --no-patch "v${n}.1.0^{commit}"`;
    }
    return `# Evidence: changed Git case ${n}\n# hypothesis: the mismatch is isolated to one repository layer\ngit status --short --branch\ngit diff\ngit diff --staged\ngit log --graph --decorate --oneline -n 6\n# observation: name worktree, index, ref, and graph evidence separately`;
  }

  if (family === 'typescript') {
    if (/compiler-runtime|tsconfig-projects|release-migration/.test(moduleId)) {
      return `type Status = "ok" | "degraded";\nconst status: Status = "degraded";\nconsole.assert(status === "degraded");\n// Run: npx tsc --noEmit, then inspect and execute emitted JavaScript separately.`;
    }
    if (/inference-literals|type-transforms/.test(moduleId)) {
      return `const config = { status: "degraded", retries: ${n} } as const satisfies {\n  status: "ok" | "degraded";\n  retries: number;\n};\ntype Patch = Partial<typeof config>;\nconsole.assert(config.status === "degraded");`;
    }
    if (/unions-narrowing|runtime-validation/.test(moduleId)) {
      return `type Result = { kind: "ok"; value: number } | { kind: "error"; message: string };\nfunction parse(input: unknown): Result {\n  if (typeof input === "object" && input !== null && "value" in input && typeof input.value === "number") {\n    return { kind: "ok", value: input.value };\n  }\n  return { kind: "error", message: "invalid payload" };\n}\nconsole.assert(parse({ value: ${n} }).kind === "ok");`;
    }
    if (/generics-relationships|functions-overloads/.test(moduleId)) {
      return `function select<T, K extends keyof T>(record: T, key: K): T[K] {\n  return record[key];\n}\nconst status = select({ id: "job-${n}", status: "ready" as const }, "status");\nconsole.assert(status === "ready");`;
    }
    if (/state-machines|async-platform/.test(moduleId)) {
      return `type State =\n  | { kind: "idle" }\n  | { kind: "loading"; requestId: number }\n  | { kind: "success"; requestId: number; value: string };\nfunction label(state: State): string {\n  switch (state.kind) {\n    case "idle": return "Idle";\n    case "loading": return \`Loading \${state.requestId}\`;\n    case "success": return state.value;\n  }\n}`;
    }
    if (/object-contracts|classes-encapsulation/.test(moduleId)) {
      return `interface Job { readonly id: string; owner?: string; status: "queued" | "running" }\nfunction start(job: Job): Job {\n  if (job.status !== "queued") throw new Error("job is not queued");\n  return { ...job, status: "running" };\n}\nconsole.assert(start({ id: "J-${n}", status: "queued" }).status === "running");`;
    }
    return `function evidence(input: unknown): { accepted: boolean; value?: number } {\n  if (typeof input !== "number" || !Number.isFinite(input)) return { accepted: false };\n  return { accepted: true, value: input * ${n} };\n}\nconsole.assert(evidence(${n}).value === ${n * n});`;
  }

  if (family === 'javascript') {
    if (/bindings-scope|functions-contracts/.test(moduleId)) {
      return `function counter(start = 0) {\n  let value = start;\n  return () => ++value;\n}\nconst left = counter(${n});\nconst right = counter(${n + 3});\nconsole.assert(left() === ${n + 1} && right() === ${n + 4});`;
    }
    if (/collections-iteration/.test(moduleId)) {
      return `const incidents = [{ id: "a", minutes: ${n} }, { id: "b", minutes: ${n + 3} }];\nconst total = incidents.reduce((sum, item) => sum + item.minutes, 0);\nconsole.assert(total === ${n * 2 + 3});\nconsole.assert(incidents[0].minutes === ${n});`;
    }
    if (/async-event-loop/.test(moduleId)) {
      return `const trace = [];\nqueueMicrotask(() => trace.push("microtask"));\nsetTimeout(() => {\n  trace.push("timer");\n  console.assert(trace.join(",") === "microtask,timer");\n}, 0);`;
    }
    if (/dom-events/.test(moduleId)) {
      return `const button = document.querySelector("button[data-filter]");\nbutton?.addEventListener("click", (event) => {\n  const filter = event.currentTarget.dataset.filter;\n  document.querySelector("[role=status]").textContent = \`Filter: \${filter}\`;\n});`;
    }
    if (/web-data-security/.test(moduleId)) {
      return `const controller = new AbortController();\nconst response = await fetch("/api/status", { signal: controller.signal });\nif (!response.ok) throw new Error(\`HTTP \${response.status}\`);\nconst payload = await response.json();\nconsole.assert(typeof payload === "object" && payload !== null);`;
    }
    return `function normalize(input) {\n  if (typeof input !== "string") return { ok: false, reason: "expected string" };\n  return { ok: true, value: input.trim().toLowerCase() };\n}\nconsole.assert(normalize(" READY ").value === "ready");`;
  }

  if (family === 'go') {
    if (/toolchain-programs-packages/.test(moduleId)) {
      return `package main

import "fmt"

func main() {
	version, target := "go1.26", "browser/wasm"
	fmt.Printf("language=%s target=%s case=${n}\\n", version, target)
}`;
    }
    if (/values-variables-types|control-flow-defer/.test(moduleId)) {
      return `package main

import "fmt"

func classify(retries int) (label string) {
	defer func() { label = fmt.Sprintf("%s:%d", label, retries) }()
	switch {
	case retries < 0:
		return "invalid"
	case retries == 0:
		return "disabled"
	default:
		return "bounded"
	}
}

func main() { fmt.Println(classify(${n})) }`;
    }
    if (/functions-closures-contracts/.test(moduleId)) {
      return `package main

import "fmt"

func counter(start int) func() int {
	value := start
	return func() int { value++; return value }
}

func main() {
	left, right := counter(${n}), counter(${n + 3})
	fmt.Println(left(), left(), right())
}`;
    }
    if (/arrays-slices-memory/.test(moduleId)) {
      return `package main

import "fmt"

func ownedWindow(values []int, end int) []int {
	window := values[:end:end]
	return append(window, 99)
}

func main() {
	source := []int{${n}, ${n + 1}, ${n + 2}, ${n + 3}}
	result := ownedWindow(source, 2)
	fmt.Println(source, result)
}`;
    }
    if (/maps-strings-unicode/.test(moduleId)) {
      return `package main

import (
	"fmt"
	"sort"
	"unicode/utf8"
)

func main() {
	counts := map[string]int{"café": ${n}, "東京": ${n + 1}}
	keys := make([]string, 0, len(counts))
	for key := range counts { keys = append(keys, key) }
	sort.Strings(keys)
	for _, key := range keys { fmt.Println(key, utf8.RuneCountInString(key), counts[key]) }
}`;
    }
    if (/structs-methods-composition/.test(moduleId)) {
      return `package main

import "fmt"

type Audit struct{ Revision int }
type Job struct { Audit; ID string; State string }

func (job *Job) Start() bool {
	if job == nil || job.State != "queued" { return false }
	job.State = "running"
	job.Revision++
	return true
}

func main() {
	job := Job{Audit: Audit{Revision: ${n}}, ID: "J-${n}", State: "queued"}
	fmt.Println(job.Start(), job.State, job.Revision)
}`;
    }
    if (/interfaces-errors-boundaries|failures-resources-recovery/.test(moduleId)) {
      return `package main

import (
	"errors"
	"fmt"
)

var ErrUnavailable = errors.New("unavailable")

func notify(target string) error {
	if target == "" { return fmt.Errorf("notify %q: %w", target, ErrUnavailable) }
	return nil
}

func main() { fmt.Println(errors.Is(notify(""), ErrUnavailable)) }`;
    }
    if (/packages-modules-workspaces/.test(moduleId)) {
      return `package main

import "fmt"

type Version struct { Major, Minor, Patch int }

func (version Version) Compatible(required Version) bool {
	return version.Major == required.Major && version.Minor >= required.Minor
}

func main() { fmt.Println((Version{1, ${n}, 0}).Compatible(Version{1, 2, 0})) }`;
    }
    if (/generics-constraints-iterators/.test(moduleId)) {
      return `package main

import "fmt"

func Lookup[K comparable, V any](items map[K]V, key K) (V, bool) {
	value, ok := items[key]
	return value, ok
}

func main() {
	value, ok := Lookup(map[string]int{"ready": ${n}}, "ready")
	fmt.Println(value, ok)
}`;
    }
    if (/testing-fuzzing-quality/.test(moduleId)) {
      return `package main

import "fmt"

func reverse(values []rune) []rune {
	result := append([]rune(nil), values...)
	for left, right := 0, len(result)-1; left < right; left, right = left+1, right-1 {
		result[left], result[right] = result[right], result[left]
	}
	return result
}

func main() {
	input := []rune("Go✓${n}")
	double := reverse(reverse(input))
	fmt.Println(string(input) == string(double))
}`;
    }
    if (/goroutines-channels-select/.test(moduleId)) {
      return `package main

import "fmt"

func main() {
	results := make(chan int, 1)
	go func() { results <- ${n} * ${n}; close(results) }()
	value, ok := <-results
	fmt.Println(value, ok)
}`;
    }
    if (/context-cancellation-backpressure/.test(moduleId)) {
      return `package main

import (
	"context"
	"fmt"
)

func main() {
	ctx, cancel := context.WithCancel(context.Background())
	cancel()
	select {
	case <-ctx.Done(): fmt.Println("stopped", ctx.Err())
	default: fmt.Println("still running")
	}
}`;
    }
    if (/memory-model-synchronization/.test(moduleId)) {
      return `package main

import (
	"fmt"
	"sync"
)

func main() {
	var mutex sync.Mutex
	count := 0
	var group sync.WaitGroup
	for worker := 0; worker < ${n}; worker++ {
		group.Add(1)
		go func() { defer group.Done(); mutex.Lock(); count++; mutex.Unlock() }()
	}
	group.Wait()
	fmt.Println(count)
}`;
    }
    if (/io-serialization-cli/.test(moduleId)) {
      return `package main

import (
	"encoding/json"
	"fmt"
	"strings"
)

type Record struct { ID int \`json:"id"\`; Label string \`json:"label"\` }

func main() {
	decoder := json.NewDecoder(strings.NewReader(\`{"id":${n},"label":"ready"}\`))
	decoder.DisallowUnknownFields()
	var record Record
	err := decoder.Decode(&record)
	fmt.Println(record.ID, record.Label, err)
}`;
    }
    if (/http-services-security/.test(moduleId)) {
      return `package main

import (
	"fmt"
	"strings"
)

type Request struct { Method, Label string; BodyBytes int }
type Response struct { Status int; Body string }

func handle(request Request) Response {
	if request.Method != "POST" { return Response{405, "method not allowed"} }
	if request.BodyBytes > 1024 || strings.TrimSpace(request.Label) == "" { return Response{400, "invalid request"} }
	return Response{201, "accepted"}
}

func main() { fmt.Printf("%+v\\n", handle(Request{"POST", "case-${n}", 32})) }`;
    }
    return `package main

import "fmt"

func measured(values []int) (sum int, operations int) {
	for _, value := range values { sum += value; operations++ }
	return sum, operations
}

func main() { fmt.Println(measured([]int{${n}, ${n + 1}, ${n + 2}})) }`;
  }

  if (family === 'sql') {
    if (/data-systems-lifecycle/.test(moduleId)) {
      return `SELECT sqlite_version() AS runtime_version;\nSELECT name, type\nFROM sqlite_schema\nWHERE type IN ('table', 'view')\nORDER BY type, name;`;
    }
    if (/relational-model-keys-nulls/.test(moduleId)) {
      return `SELECT t.ticket_id, t.owner_id, m.name AS owner_name\nFROM tickets AS t\nLEFT JOIN members AS m ON m.member_id = t.owner_id\nWHERE t.owner_id IS NULL OR m.active = 1\nORDER BY t.ticket_id;`;
    }
    if (/select-expressions-types|filtering-logic-order/.test(moduleId)) {
      return `SELECT ticket_id,\n       COALESCE(CAST(owner_id AS TEXT), 'unassigned') AS owner,\n       CASE severity WHEN 'critical' THEN 1 WHEN 'high' THEN 2 ELSE 3 END AS severity_order\nFROM tickets\nWHERE resolved_at IS NULL\nORDER BY severity_order, opened_at, ticket_id\nLIMIT ${n + 2};`;
    }
    if (/aggregation-grouping|joins-cardinality/.test(moduleId)) {
      return `WITH effort AS (\n  SELECT ticket_id, SUM(minutes_spent) AS minutes\n  FROM ticket_events\n  GROUP BY ticket_id\n)\nSELECT teams.name, COUNT(tickets.ticket_id) AS tickets,\n       COALESCE(SUM(effort.minutes), 0) AS minutes\nFROM teams\nLEFT JOIN tickets ON tickets.team_id = teams.team_id\nLEFT JOIN effort ON effort.ticket_id = tickets.ticket_id\nGROUP BY teams.team_id, teams.name\nORDER BY teams.name;`;
    }
    if (/subqueries-ctes-sets/.test(moduleId)) {
      return `WITH team_counts AS (\n  SELECT team_id, COUNT(*) AS ticket_count\n  FROM tickets\n  GROUP BY team_id\n)\nSELECT teams.name, COALESCE(team_counts.ticket_count, 0) AS ticket_count\nFROM teams\nLEFT JOIN team_counts USING (team_id)\nWHERE NOT EXISTS (\n  SELECT 1 FROM tickets\n  WHERE tickets.team_id = teams.team_id AND status = 'investigating'\n)\nORDER BY teams.name;`;
    }
    if (/data-modification|ddl-constraints-migrations/.test(moduleId)) {
      return `BEGIN;\nINSERT INTO tickets\n  (ticket_id, team_id, owner_id, title, severity, status, opened_at)\nVALUES\n  (20${n}, 3, 5, 'Changed-case import', 'medium', 'open', '2026-07-14T08:00:00Z')\nON CONFLICT(ticket_id) DO UPDATE SET title = excluded.title;\nSELECT changes() AS changed_rows;\nROLLBACK;`;
    }
    if (/transactions-concurrency-recovery/.test(moduleId)) {
      return `BEGIN;\nUPDATE tickets\nSET owner_id = 3, status = 'investigating'\nWHERE ticket_id = 103 AND status = 'open';\nSELECT changes() AS transition_count;\nINSERT INTO ticket_events (ticket_id, event_type, occurred_at, minutes_spent)\nSELECT 103, 'assigned', '2026-07-14T08:10:00Z', ${n}\nWHERE changes() = 1;\nCOMMIT;`;
    }
    if (/window-analytics-time/.test(moduleId)) {
      return `SELECT team_id, ticket_id, severity,\n       ROW_NUMBER() OVER (PARTITION BY team_id ORDER BY opened_at, ticket_id) AS arrival,\n       LAG(opened_at) OVER (PARTITION BY team_id ORDER BY opened_at, ticket_id) AS previous_opened,\n       COUNT(*) OVER (PARTITION BY team_id) AS team_ticket_count\nFROM tickets\nORDER BY team_id, arrival;`;
    }
    if (/views-triggers-programs/.test(moduleId)) {
      return `CREATE TEMP VIEW open_ticket_queue AS\nSELECT ticket_id, team_id, owner_id, severity, opened_at\nFROM tickets\nWHERE status <> 'resolved';\nSELECT ticket_id, severity\nFROM open_ticket_queue\nORDER BY opened_at, ticket_id;`;
    }
    if (/indexes-plans-performance/.test(moduleId)) {
      return `EXPLAIN QUERY PLAN\nSELECT ticket_id, owner_id, opened_at\nFROM tickets\nWHERE status = 'open' AND severity IN ('high', 'critical')\nORDER BY opened_at, ticket_id;\nCREATE INDEX IF NOT EXISTS idx_tickets_queue\n  ON tickets(status, severity, opened_at, ticket_id);`;
    }
    if (/security-privacy-programmatic/.test(moduleId)) {
      return `-- Application contract: prepare once and bind :severity as data.\nSELECT ticket_id, title, status\nFROM tickets\nWHERE severity = 'high'\nORDER BY opened_at, ticket_id;\n-- Structural choices such as sort direction require an application allow-list.`;
    }
    return `SELECT ticket_id, status, opened_at\nFROM tickets\nWHERE status <> 'resolved'\nORDER BY opened_at, ticket_id;\n-- Record SQLite behavior, then verify syntax and semantics against PostgreSQL 18.4.`;
  }

  if (family === 'functional') {
    if (/purity|immutability|effects/.test(moduleId)) {
      return `def discounted(order: dict, rate: float) -> dict:\n    before = repr(order)\n    result = {**order, "total": round(order["subtotal"] * (1 - rate), 2)}\n    assert repr(order) == before\n    return result\n\norder = {"subtotal": ${20 + n}, "tags": ("member",)}\nassert discounted(order, 0.1) == discounted(order, 0.1)`;
    }
    if (/iterator|itertools|streams/.test(moduleId)) {
      return `from collections.abc import Iterable, Iterator\nfrom itertools import islice\n\ndef valid_prefix(records: Iterable[object], limit: int) -> Iterator[int]:\n    for record in islice(records, limit):\n        if isinstance(record, int):\n            yield record\n\nassert list(valid_prefix(iter([${n}, "bad", ${n + 3}]), 3)) == [${n}, ${n + 3}]`;
    }
    if (/closures|decorators/.test(moduleId)) {
      return `from functools import wraps\n\ndef at_least(limit: int):\n    def decorate(check):\n        @wraps(check)\n        def wrapped(value):\n            return value >= limit and check(value)\n        return wrapped\n    return decorate`;
    }
    if (/errors|results|pattern/.test(moduleId)) {
      return `from dataclasses import dataclass\n\n@dataclass(frozen=True)\nclass Rejected:\n    reason: str\n\ndef parse(row: dict) -> int | Rejected:\n    match row:\n        case {"id": int(identifier)}: return identifier\n        case _: return Rejected("missing integer id")`;
    }
    return `def compose(first, second):\n    return lambda value: second(first(value))\n\ndef normalize(value: str) -> str:\n    return " ".join(value.split()).casefold()\n\nassert compose(normalize, len)("  A  B ") == 3`;
  }

  if (family === 'algorithms') {
    if (/sorting|sequence/.test(moduleId)) {
      return `def insertion_sort(values: list[int]) -> list[int]:\n    result = values.copy()\n    for end in range(1, len(result)):\n        key = result[end]\n        cursor = end - 1\n        while cursor >= 0 and result[cursor] > key:\n            result[cursor + 1] = result[cursor]\n            cursor -= 1\n        result[cursor + 1] = key\n        assert result[: end + 1] == sorted(result[: end + 1])\n    return result`;
    }
    if (/search-selection/.test(moduleId)) {
      return `def lower_bound(values: list[int], target: int) -> int:\n    low, high = 0, len(values)\n    while low < high:\n        middle = (low + high) // 2\n        if values[middle] < target: low = middle + 1\n        else: high = middle\n    assert all(value < target for value in values[:low])\n    return low`;
    }
    if (/hash/.test(moduleId)) {
      return `class CollisionKey:\n    def __init__(self, value: str): self.value = value\n    def __hash__(self): return ${n}\n    def __eq__(self, other): return isinstance(other, CollisionKey) and self.value == other.value\n\nindex = {CollisionKey("aa"): 1, CollisionKey("bb"): 2}\nassert len(index) == 2`;
    }
    if (/shortest-path/.test(moduleId)) {
      return `def relax(distance: dict[str, float], previous: dict[str, str], left: str, right: str, weight: float) -> bool:\n    candidate = distance[left] + weight\n    if candidate >= distance.get(right, float("inf")): return False\n    distance[right], previous[right] = candidate, left\n    return True`;
    }
    if (/graph|directed|component|topological/.test(moduleId)) {
      return `from collections import deque\n\ndef bfs(graph: dict[str, list[str]], start: str) -> list[str]:\n    queue, seen, order = deque([start]), {start}, []\n    while queue:\n        node = queue.popleft(); order.append(node)\n        for neighbor in graph.get(node, []):\n            if neighbor not in seen: seen.add(neighbor); queue.append(neighbor)\n    return order`;
    }
    if (/dynamic|knapsack/.test(moduleId)) {
      return `def capacity_values(items: list[tuple[int, int]], capacity: int) -> list[int]:\n    best = [0] * (capacity + 1)\n    for value, weight in items:\n        for room in range(capacity, weight - 1, -1):\n            best[room] = max(best[room], best[room - weight] + value)\n    return best`;
    }
    if (/heap|priority/.test(moduleId)) {
      return `from heapq import heappop, heappush\n\nqueue: list[tuple[int, int, str]] = []\nfor sequence, (priority, name) in enumerate([(2, "audit"), (1, "restore"), (2, "notify")]):\n    heappush(queue, (priority, sequence, name))\nassert heappop(queue)[2] == "restore"`;
    }
    return `def traced_baseline(values: list[int]) -> dict[str, object]:\n    comparisons = 0\n    best = None\n    for value in values:\n        comparisons += 1\n        if best is None or value < best: best = value\n    assert comparisons == len(values)\n    return {"result": best, "comparisons": comparisons}`;
  }
  return null;
}

function compactTitle(moduleTitle, kind, primaryId, activityId, family) {
  const labels = ACTIVITY_LABELS[family][kind];
  const label = labels[hash(activityId) % labels.length];
  const concept = kind === 'theory' ? `: ${humanize(primaryId)}` : '';
  const available = Math.max(24, 136 - label.length - concept.length);
  const module =
    moduleTitle.length <= available
      ? moduleTitle
      : `${moduleTitle.slice(0, available - 1).trim()}…`;
  return `${module} · ${label}${concept}`;
}

function boundedText(value, maximum) {
  return value.length <= maximum ? value : `${value.slice(0, maximum - 1).trim()}…`;
}

function coverageFrom(plan) {
  const byStage = (stages) =>
    unique(
      plan.coverage
        .filter((entry) => entry.stages.some((stage) => stages.includes(stage)))
        .map((entry) => entry.competencyId)
    );
  return {
    introduces: byStage(['I']),
    reinforces: byStage(['G', 'F', 'R']),
    assesses: byStage(['A', 'T']),
  };
}

function targetFor(family, moduleId) {
  if (family === 'c') return 'c';
  if (family === 'linux' || family === 'git') return 'shell';
  if (family === 'typescript') return 'typescript';
  if (family === 'javascript') return 'javascript';
  if (family === 'go') return 'go';
  if (family === 'math') return 'python';
  if (family === 'python' || family === 'functional' || family === 'algorithms') return 'python';
  if (family === 'sql') return 'sql';
  if (family === 'network') return 'shell';
  if (family === 'prompt') return 'prompt';
  if (family === 'support') return 'config';
  if (family === 'portfolio') return 'config';
  if (family === 'career') return 'config';
  if (family === 'gates') return 'config';
  if (family === 'docker') return 'config';
  if (family === 'kubernetes') return 'config';
  if (family === 'cicd') return 'config';
  if (family === 'skills') return moduleId.includes('mcp-') ? 'python' : 'config';
  return /tool|retr|checkpoint|retry|eval|long-running|subagent/.test(moduleId)
    ? 'python'
    : 'prompt';
}

function starterFiles(family, courseId) {
  const files = {
    html: '',
    css: '',
    javascript: '',
    typescript: '',
    python: '',
    go: '',
    sql: '',
    shell: '',
    prompt: '',
    config: '',
    c: '',
  };
  if (family === 'support') {
    files.config = `# ${courseId} cumulative fictional support evidence portfolio
# Browser labs perform deterministic text-contract review only. They never execute learner
# commands, inspect the host, touch devices or accounts, connect to networks, open equipment,
# handle malware, erase media, contact people, or claim certification.
workspace: support
ticket-id: fictional-ticket
user-impact: [replace with user outcome, scope, severity, and urgency]
environment: [replace with asset, version, configuration, owner, dependency, and evidence time]
safety-authority: [replace with consent, hazards, data custody, privacy, access, and stop rules]
baseline: [replace with expected behavior, known-good state, conditions, and measurement]
symptom: [replace with observed behavior, reproduction, frequency, timing, and evidence]
recent-change: [replace with timeline, relevant changes, counterevidence, and unknowns]
hypothesis: [replace with falsifiable cause, competing explanation, prediction, and confidence]
test: [replace with one safe reversible discriminating test, changed case, and stop rule]
observation: [replace with actual result, provenance, rejected inference, and next decision]
repair-rollback: [replace with least-change repair, authority, backup, trigger, and restored state]
verify: [replace with user outcome, original, changed, side-effect, restart, and recurrence checks]
prevention: [replace with prevention, monitoring, owner, review date, and residual risk]
escalation: [replace with stop threshold, destination, evidence packet, and requested decision]
documentation: [replace with plain structured status, redaction, access, handoff, and uncertainty]
transfer-boundary: authorized disposable equipment or simulator only
review:
`;
  } else if (family === 'portfolio') {
    files.config = `# ${courseId} cumulative independent product evidence portfolio
# Browser labs perform deterministic evidence-contract review only.
# They never contact participants or services, execute commands, deploy, or claim live conformance.
workspace: portfolio
project-id: ${courseId}
stakeholder: [replace with affected people and accountable decision owner]
decision: [replace with the decision this evidence changes]
problem-evidence: [replace with observed need, counterevidence, and uncertainty]
accessibility: [replace with keyboard, structure, reflow, status, alternatives, and human review]
security: [replace with threat, authorization, abuse, response, and residual risk]
privacy: [replace with purpose, minimization, retention, access, correction, and deletion]
test-strategy: [replace with behavior, changed case, fault, accessibility, security, and recovery]
release-evidence: [replace with revision, artifact, inventory, provenance, validation, and rollback]
recovery: [replace with backup, clean restore, reconciliation, communication, and ownership]
portfolio-proof: [replace with contribution, limitations, counterexample, and unseen defense]
transfer-boundary: authorized controlled research, toolchain, deployment, and review environments
evidence:
`;
  } else if (family === 'career') {
    files.config = `# ${courseId} cumulative learner-controlled career campaign
# Browser labs review fictional evidence contracts only. They never contact people,
# submit applications, access accounts, expose personal data, negotiate, or accept offers.
workspace: career
candidate-id: fictional-learner
target-role: [replace with role family, work outcomes, and bounded level]
jurisdiction: [replace with location and current official guidance boundary]
audience: [replace with reviewer need, time, format, and access context]
claim: [replace with one truthful role-relevant behavior claim]
evidence: [replace with revision, artifact, observation, changed case, contribution, and limit]
process-state: [replace with discover, investigate, apply, interview, offer, close, or archive]
accessibility: [replace with keyboard, structure, reflow, status, alternatives, and human review]
privacy-consent: [replace with purpose, minimization, permission, retention, deletion, and safe contact]
decision: [replace with learner-owned next decision and stop rule]
transfer-boundary: learner-approved external actions only
review:
`;
  } else if (courseId === 'build-web-scraper-go') {
    files.go = `// ${courseId} cumulative owner-approved accessible site-audit portfolio.
// Browser execution uses deterministic pure-Go policy, URL, robots, response, tree, record,
// frontier, scheduling, report, security, deployment, and recovery models with original fixtures.
// DNS, sockets, x/net/html, goquery, Colly, files, processes, race, load, containers,
// accessibility review, legal review, restore, and production behavior require controlled gates.
package main

import "fmt"

type CrawlPolicy struct {
\tAuthorizationID string
\tAllowedOrigin string
\tMaximumPages int
\tMaximumResponseBytes int
\tMinimumOriginSpacingMillis int
}

type CrawlEvidence struct {
\tRevision string
\tURLKey string
\tPolicyDigest string
\tFrontierDigest string
\tReportDigest string
\tRecoveryID string
}

func main() { fmt.Println("Owner-approved accessible Go crawler portfolio ready") }
`;
  } else if (courseId === 'build-web-scraper-typescript') {
    files.typescript = `// ${courseId} cumulative owner-authorized accessible site-audit portfolio.
// Browser execution uses deterministic pure-TypeScript policy, URL, robots, Response, unknown,
// frontier, Promise, browser, accessibility, report, security, and recovery models with original fixtures.
// DNS, Fetch streams, Cheerio, Playwright, axe-core, files, Node handles, packages, containers,
// accessibility review, legal review, restore, and production behavior require controlled gates.

type CrawlPolicy = Readonly<{
  authorizationId: string;
  allowedOrigin: string;
  maximumPages: number;
  maximumResponseBytes: number;
  minimumOriginSpacingMilliseconds: number;
}>;

type CrawlEvidence = Readonly<{
  revision: string;
  urlKey: string;
  policyDigest: string;
  frontierDigest: string;
  reportDigest: string;
  recoveryId: string;
}>;

const portfolioReady = (): string => "Owner-authorized accessible TypeScript crawler portfolio ready";
void portfolioReady;
`;
  } else if (courseId === 'build-blog-aggregator-go') {
    files.go = `// ${courseId} cumulative accessible publisher-respecting feed-service portfolio.
// Browser execution uses deterministic pure-Go models with original RSS, Atom, HTTP, PostgreSQL,
// scheduling, API, reader, security, deployment, and recovery fixtures only.
// DNS, sockets, native XML, PostgreSQL, processes, signals, race and load claims, containers,
// accessibility review, backups, restores, and production behavior require controlled transfer gates.
package main

import "fmt"

type FeedPolicy struct {
\tMaximumWireBytes int
\tMaximumXMLDepth int
\tMaximumOriginConcurrency int
\tMaximumPageSize int
}

type FeedEvidence struct {
\tRevision string
\tTenantKey string
\tSourceKey string
\tAttemptKey string
\tStateDigest string
\tRecoveryID string
}

func main() { fmt.Println("Accessible publisher-respecting Go feed-service portfolio ready") }
`;
  } else if (courseId === 'build-blog-aggregator-typescript') {
    files.typescript = `// ${courseId} cumulative inclusive runtime-validated feed-service portfolio.
// Browser execution uses deterministic pure-TypeScript models with original RSS, Atom, unknown XML,
// HTTP, PostgreSQL, Promise, Express, reader, security, deployment, and recovery fixtures only.
// DNS, Fetch streams, fast-xml-parser, Express, PostgreSQL, Node handles, containers, accessibility
// review, backups, restores, and production behavior require controlled transfer gates.

type FeedPolicy = Readonly<{
  maximumWireBytes: number;
  maximumXmlDepth: number;
  maximumOriginConcurrency: number;
  maximumPageSize: number;
}>;

type FeedEvidence = Readonly<{
  revision: string;
  tenantKey: string;
  sourceKey: string;
  attemptKey: string;
  stateDigest: string;
  recoveryId: string;
}>;

const portfolioReady = (): string => "Inclusive runtime-validated TypeScript feed-service portfolio ready";
void portfolioReady;
`;
  } else if (courseId === 'build-pokedex-go') {
    files.go = `// ${courseId} cumulative accessible fair-use Pokedex decision portfolio.
// Browser execution uses deterministic pure-Go command, validation, state, cache, concurrency,
// cancellation, persistence, security, and recovery models with original fixed fixtures only.
// PokéAPI traffic, DNS, sockets, TLS, host files, terminals, signals, race and leak claims, load,
// cross-platform packaging, accessibility review, and production behavior require controlled transfer gates.
package main

import "fmt"

type PokedexPolicy struct {
\tBaseOrigin        string
\tPageLimit         int
\tMaximumConcurrent int
\tCacheCapacity     int
}

type PokedexEvidence struct {
\tRevision     string
\tResourceKey  string
\tStateDigest  string
\tTraceDigest  string
\tRecoveryID   string
}

func main() { fmt.Println("Accessible fair-use Go Pokedex portfolio ready") }
`;
  } else if (courseId === 'build-pokedex-typescript') {
    files.typescript = `// ${courseId} cumulative inclusive runtime-validated Pokedex decision portfolio.
// Browser execution uses deterministic pure-TypeScript command, unknown validation, immutable state,
// cache, Promise, abort, persistence, security, and recovery models with original fixed fixtures only.
// PokéAPI traffic, Node readline, streams, signals, host files, package installs, handle and load claims,
// accessibility review, and production behavior require controlled transfer gates.

type PokedexPolicy = Readonly<{
  baseOrigin: "https://pokeapi.co";
  pageLimit: number;
  maximumConcurrent: number;
  cacheCapacity: number;
}>;

type PokedexEvidence = Readonly<{
  revision: string;
  resourceKey: string;
  stateDigest: string;
  traceDigest: string;
  recoveryId: string;
}>;

const portfolioReady = (): string => "Inclusive runtime-validated TypeScript Pokedex portfolio ready";
void portfolioReady;
`;
  } else if (courseId === 'build-ai-agent-python') {
    files.python = `"""${courseId} cumulative safe evaluated AI agent portfolio.

Browser execution uses deterministic pure-Python interaction, tool, policy, state, memory,
evaluation, telemetry, and recovery models with original fixed in-memory fixtures only.
Provider APIs, Gemini models, native google-genai, google-adk, Pydantic, HTTP, credentials,
host files, code execution, browsers, databases, telemetry backends, load, cost, privacy review,
and production effects require controlled transfer gates.
"""

from dataclasses import dataclass


@dataclass(frozen=True)
class AgentPolicy:
    stakeholder_task_id: str
    allowed_tool_names: tuple[str, ...]
    maximum_steps: int = 12
    maximum_tool_calls: int = 8
    approval_required_for_writes: bool = True


@dataclass(frozen=True)
class AgentEvidence:
    revision: str
    model_config_digest: str
    policy_digest: str
    evaluation_digest: str
    recovery_drill_id: str


def portfolio_ready() -> str:
    return "Safe evaluated Python AI agent portfolio ready"
`;
  } else if (courseId === 'build-web-scraper-python') {
    files.python = `"""${courseId} cumulative authorized crawler and accessible site-audit portfolio.

Browser execution uses deterministic pure-Python policy, URL, response, tree, frontier, record,
and report models with original fixed in-memory fixtures only. Sockets, DNS, public or private
sites, credentials, host files, native HTTPX, Beautiful Soup, lxml, Scrapy, Playwright browsers,
accessibility claims, legal review, load, schedules, and production effects require controlled transfer gates.
"""

from dataclasses import dataclass


@dataclass(frozen=True)
class CrawlPolicy:
    owner_authorization_id: str
    allowed_origins: tuple[str, ...]
    maximum_pages: int = 240
    maximum_response_bytes: int = 2_000_000
    minimum_origin_spacing_seconds: float = 1.0


@dataclass(frozen=True)
class CrawlEvidence:
    revision: str
    policy_digest: str
    frontier_digest: str
    report_digest: str
    accessibility_review_id: str


def portfolio_ready() -> str:
    return "Authorized Python crawler portfolio ready"
`;
  } else if (courseId === 'build-maze-solver-python') {
    files.python = `"""${courseId} cumulative accessible desktop maze portfolio.

Browser execution uses deterministic pure-Python grid, graph, search, state, and scheduler models
with original fixed in-memory fixtures only. Native Tcl, Tk, tkinter, windows, Canvas, fonts,
focus, input devices, assistive technology, files, platform timing, installers, display scaling,
packaging, and production effects require controlled transfer gates.
"""

from dataclasses import dataclass


@dataclass(frozen=True)
class MazePolicy:
    rows: int = 12
    columns: int = 16
    seed: int = 314159
    maximum_cells: int = 16_384
    reduced_motion: bool = False


@dataclass(frozen=True)
class MazeEvidence:
    revision: str
    topology_digest: str
    action_trace_digest: str
    accessibility_review_id: str
    artifact_digest: str


def portfolio_ready() -> str:
    return "Python maze solver portfolio ready"
`;
  } else if (courseId === 'build-static-site-python') {
    files.python = `"""${courseId} cumulative production static-site generator portfolio.

Browser execution uses deterministic pure-Python parser, route, render, graph, and publication models
with original fixed in-memory fixtures only. Native filesystems, full CommonMark, markdown-it-py,
Jinja, validators, browsers, GitHub Actions, Pages, DNS, TLS, CDN caches, and production effects
require controlled transfer gates.
"""

from dataclasses import dataclass


@dataclass(frozen=True)
class PublicationPolicy:
    base_path: str = "/handbook/"
    encoding: str = "utf-8"
    raw_html_allowed: bool = False
    max_document_bytes: int = 262_144
    max_nesting_depth: int = 64


@dataclass(frozen=True)
class BuildEvidence:
    revision: str
    content_manifest_digest: str
    route_manifest_digest: str
    artifact_digest: str
    accessibility_review_id: str


def portfolio_ready() -> str:
    return "Python static-site generator portfolio ready"
`;
  } else if (courseId === 'build-asteroids-python') {
    files.python = `"""${courseId} cumulative accessible real-time game portfolio.

Browser execution uses deterministic pure-Python simulation models and fixed fixtures only.
Native pygame-ce, SDL, windows, controllers, audio devices, assets, files, installers,
GPU behavior, frame pacing, accessibility playtests, packaging, and production effects require controlled transfer gates.
"""

from dataclasses import dataclass


@dataclass(frozen=True)
class SimulationPolicy:
    fixed_step_seconds: float = 1 / 120
    max_frame_seconds: float = 0.1
    max_updates_per_frame: int = 8
    logical_width: int = 960
    logical_height: int = 540


@dataclass(frozen=True)
class RunEvidence:
    revision: str
    seed: int
    input_trace_id: str
    runtime_id: str
    accessibility_profile: str


def portfolio_ready() -> str:
    return "Python Asteroids portfolio ready"
`;
  } else if (courseId === 'build-bookbot-python') {
    files.python = `"""${courseId} cumulative Unicode-safe text-analysis portfolio.

Browser execution uses original fixed in-memory fixtures and deterministic pure-Python models only.
Host files, terminals, subprocesses, Git mutations, package installation, native profiling, load,
operating-system races, publication, and production effects require controlled transfer gates.
"""

from dataclasses import dataclass


@dataclass(frozen=True)
class TextPolicy:
    encoding: str = "utf-8"
    normalization: str = "NFC"
    casefold: bool = True
    top_k: int = 10


@dataclass(frozen=True)
class RunEvidence:
    corpus_id: str
    revision: str
    policy_version: str
    command_id: str


def portfolio_ready() -> str:
    return "Python Bookbot portfolio ready"
`;
  } else if (courseId === 'rag-retrieval-augmented-generation') {
    files.python = `"""${courseId} cumulative evidence-grounded retrieval portfolio.

Browser execution uses deterministic pure-Python models and fixed fixtures only.
Native ML packages, files, models, vector stores, provider APIs, networks, credentials,
OCR, load, faults, recovery systems, and production effects require authorized transfer gates.
"""

from dataclasses import dataclass


@dataclass(frozen=True)
class RagEvidence:
    corpus_version: str
    document_id: str
    chunk_id: str
    query_id: str
    source_span: str


@dataclass(frozen=True)
class RetrievalBoundary:
    tenant_id: str
    authorized: bool
    answerable: bool
    context_budget: int


def portfolio_ready() -> str:
    return "Python RAG engineering portfolio ready"
`;
  } else if (courseId === 'c-memory-management') {
    files.c = `/* ${courseId} cumulative memory-safety decision portfolio. */
/* Instant code runs only in PicoC 3.2.2: C89/C90 plus selected C99. */
/* C23, GCC, Clang, optimization, ABI, threads, sanitizers, analyzers, fuzzers, OS resources, FFI, load, and production claims require explicit controlled transfer gates. */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct cmem_evidence {
  size_t bytes;
  unsigned generation;
  int live;
  int invariant;
};
`;
  } else if (courseId === 'cryptography-go') {
    files.go = `// ${courseId} cumulative cryptographic-engineering decision portfolio.
// Browser execution uses deterministic pure-Go models plus a narrow side-effect-free cryptographic package allowlist with fixed fixtures.
// Production entropy and keys, secret erasure, native timing and side channels, networks, TLS, HSM/KMS, PKI, FIPS/compliance, load, faults, recovery, and production changes require explicit authorized transfer gates.
package main

import "fmt"

type CryptoEvidence struct {
\tArtifactID string
\tVersion    string
\tPurpose    string
\tKeyID      string
\tEpoch      int
}

type SecurityBoundary struct {
\tAsset      string
\tAdversary  string
\tProperty   string
\tAuthorized bool
}

func main() { fmt.Println("Go cryptographic-engineering portfolio ready") }
`;
  } else if (courseId === 'file-servers-s3-typescript') {
    files.typescript = `// ${courseId} cumulative file-delivery decision portfolio.
// Browser execution uses deterministic pure-TypeScript runtime validation, identity, range, integrity, policy, lifecycle, cache, cost, and recovery models only.
// Node and AWS SDK packages, S3, CloudFront, KMS, IAM, WAF, networks, PostgreSQL, credentials, host state, stream and handle checks, load, faults, restore, billing, and production changes require explicit authorized transfer gates.

type FileEvidence = Readonly<{
  fileId: string;
  objectKey: string;
  versionId: string;
  bytes: number;
  checksum: string;
}>;

type DeliveryEvidence = Readonly<{
  authorized: boolean;
  state: "intent" | "quarantined" | "published" | "failed";
  range?: readonly [start: number, end: number];
}>;

const portfolioReady = (file: FileEvidence, delivery: DeliveryEvidence): boolean =>
  file.fileId.length > 0 && file.bytes >= 0 && delivery.authorized;

void portfolioReady;
`;
  } else if (courseId === 'file-servers-s3-go') {
    files.go = `// ${courseId} cumulative file-delivery decision portfolio.
// Browser execution uses deterministic pure-Go identity, range, integrity, policy, lifecycle, cache, cost, and recovery models only.
// AWS SDK packages, S3, CloudFront, KMS, IAM, WAF, networks, databases, credentials, host state, race and leak checks, load, faults, restore, billing, and production changes require explicit authorized transfer gates.
package main

import "fmt"

type FileEvidence struct {
\tFileID      string
\tObjectKey   string
\tVersionID   string
\tBytes       int
\tChecksum    string
}

type DeliveryEvidence struct {
\tAuthorized bool
\tState      string
\tRangeStart int
\tRangeEnd   int
}

func main() { fmt.Println("Go file-delivery portfolio ready") }
`;
  } else if (courseId === 'pubsub-rabbitmq-go') {
    files.go = `// ${courseId} cumulative reliable-messaging decision portfolio.
// Browser execution uses deterministic pure-Go topology, routing, ownership, acknowledgement, retry, concurrency, and recovery models only.
// amqp091-go, AMQP sockets, RabbitMQ, TLS, partitions, restarts, Docker, databases, race and leak checks, external effects, load, upgrades, credentials, host state, and production changes require explicit authorized transfer gates.
package main

import "fmt"

type MessageEvidence struct {
	ID            string
	Type          string
	SchemaVersion int
	BodyBytes     int
}

type DeliveryEvidence struct {
	Route            string
	Owner            string
	TerminalDecision string
	Attempt          int
}

func main() { fmt.Println("Go messaging portfolio ready") }
`;
  } else if (courseId === 'pubsub-rabbitmq-typescript') {
    files.typescript = `// ${courseId} cumulative reliable-messaging decision portfolio.
// Browser execution uses deterministic pure-TypeScript topology, routing, ownership, acknowledgement, retry, and recovery models only.
// amqplib, AMQP sockets, RabbitMQ, TLS, partitions, restarts, Docker, databases, external effects, load, upgrades, credentials, host state, and production changes require explicit authorized transfer gates.

type MessageEvidence = Readonly<{
  id: string;
  type: string;
  schemaVersion: number;
  bodyBytes: number;
}>;

type DeliveryEvidence = Readonly<{
  route: string;
  owner: string;
  terminalDecision: string;
  attempt: number;
}>;

const messagingPortfolioReady = true;
void messagingPortfolioReady;
`;
  } else if (courseId === 'http-protocol-go') {
    files.go = `// ${courseId} cumulative protocol-engineering decision portfolio.
// Browser execution uses deterministic pure-Go octet, framing, parser-state, and protocol-decision models only.
// Sockets, listeners, live TLS, proxies, packet capture, fuzz campaigns, races, load, HTTP/2, HTTP/3, credentials, host state, and production changes require explicit authorized Go 1.26 protocol transfer gates.
package main

import "fmt"

type ByteEvidence struct { Consumed, Remaining int; Complete bool; State string }
type ProtocolEvidence struct { Version, Framing, TerminalReason string; Reusable bool }

func main() {
\tfmt.Println("Go HTTP protocol decision portfolio ready")
}
`;
  } else if (courseId === 'http-servers-go') {
    files.go = `// ${courseId} cumulative secure server decision portfolio.
// Browser execution uses deterministic pure-Go request, handler, dependency, response, and cleanup models only.
// Listeners, TLS, net/http, databases, proxies, races, load, credentials, host state, and production changes require explicit authorized Go 1.26 transfer gates.
package main

import "fmt"

type RequestEvidence struct { Method, Path, Authority string; BodyBytes int }
type ResponseEvidence struct { Status int; Effect, Cleanup string; Accepted bool }

func main() {
\tfmt.Println("Go HTTP server decision portfolio ready")
}
`;
  } else if (courseId === 'http-servers-typescript') {
    files.typescript = `// ${courseId} cumulative secure server decision portfolio.
// Browser execution uses deterministic pure-TypeScript request, middleware, policy, dependency, response, and cleanup models only.
// Node built-ins, Express, listeners, TLS, PostgreSQL, proxies, worker threads, load, credentials, host state, and production changes require explicit authorized Node 24 and Express 5 transfer gates.

type RequestEvidence = Readonly<{
  method: string;
  path: string;
  authority: string;
  bodyBytes: number;
}>;

type ResponseEvidence = Readonly<{
  status: number;
  effect: string;
  cleanup: string;
  accepted: boolean;
}>;

const portfolioReady = true;
void portfolioReady;
`;
  } else if (courseId === 'http-clients-go') {
    files.go = `// ${courseId} cumulative protocol-correct client portfolio.
// Browser execution uses deterministic request and response models only.
// Live DNS, TLS, sockets, net/http, races, and load require full Go 1.26 transfer gates.
package main

import "fmt"

type RequestEvidence struct { Method, Target string; Attempt int }
type ResponseEvidence struct { Status, BodyBytes int; Valid bool }

func main() {
	fmt.Println("Go HTTP client portfolio ready")
}
`;
  } else if (courseId === 'http-clients-typescript') {
    files.typescript = `// ${courseId} cumulative strict Fetch client portfolio.
// This workspace performs strict diagnostics and deterministic contract modeling only.
type RequestEvidence = Readonly<{ method: string; target: string; attempt: number }>;
type ResponseEvidence = Readonly<{ status: number; bodyBytes: number; valid: boolean }>;

const baselineRequest: RequestEvidence = {
  method: "GET",
  target: "https://api.example.test/status",
  attempt: 1,
};
console.assert(baselineRequest.attempt === 1);
`;
  } else if (courseId === 'http-clients-python') {
    files.python = `"""${courseId} cumulative safe data-client portfolio.

Browser labs use deterministic request and response models only. Live urllib,
DNS, TLS, sockets, concurrency, and load require local Python 3.14 transfer gates.
"""

from dataclasses import dataclass

@dataclass(frozen=True)
class RequestEvidence:
    method: str
    target: str
    attempt: int

@dataclass(frozen=True)
class ResponseEvidence:
    status: int
    body_bytes: int
    valid: bool

print("Python HTTP client portfolio ready")
`;
  } else if (family === 'docker') {
    files.config = `# ${courseId} cumulative container delivery portfolio
# Browser labs perform deterministic manifest and evidence review only.
# They never connect to a Docker daemon, mount a socket, or execute learner commands.
workspace: docker
version-baseline:
  engine: 29.6.1
  compose: 5.3.1
  buildx: 0.35.0
  buildkit: 0.31.1
  dockerfile-frontend: 1.25
transfer-boundary: authorized-disposable-environment
evidence:
`;
  } else if (family === 'kubernetes') {
    files.config = `# ${courseId} cumulative orchestration portfolio
# Browser labs perform deterministic manifest and evidence review only.
# They never invoke kubectl, read kubeconfig, contact a cluster API, or execute host commands.
workspace: kubernetes
version-baseline:
  kubernetes: 1.36.2
  minikube: 1.38.1
  gateway-api: 1.5.1
  helm: 4.2.2
transfer-boundary: authorized-disposable-cluster
evidence:
`;
  } else if (family === 'cicd') {
    files.config = `# ${courseId} cumulative delivery-system portfolio
# Browser labs perform deterministic workflow, policy, artifact, and release evidence review only.
# They never call GitHub APIs, start runners, execute learner commands, access Docker or registries, exchange OIDC tokens, or contact cloud services.
workspace: cicd
version-baseline:
  checkout: 7.0.0
  setup-node: 7.0.0
  upload-artifact: 7.0.1
  download-artifact: 8.0.1
  attest: 4.1.1
  node: 24-lts
  typescript-native: 7.0.2
  typescript-api-compatibility: 6.0.2
  build-push-action: 7
  google-auth: 3
  deploy-cloudrun: 3
transfer-boundary: authorized-disposable-delivery-environment
evidence:
`;
  } else if (family === 'linux') {
    files.shell = `# ${courseId} cumulative operations evidence notebook\n# Commands run only in the deterministic stateful terminal simulator.\n# Record hypothesis, command, expected signal, observation, conclusion, and recovery.\n`;
  } else if (family === 'git') {
    files.shell = `# ${courseId} cumulative repository evidence notebook\n# Git operations change only disposable simulated repository state.\n# Inspect status, diffs, graph, refs, and recovery before every mutation.\n`;
  } else if (family === 'math') {
    files.python = `"""${courseId} cumulative model portfolio."""\n\nfrom math import exp, log, sqrt\n\n\ndef reasonableness(value: float, lower: float, upper: float) -> bool:\n    return lower <= value <= upper\n\n# Add one tested model increment per activity.\n`;
  } else if (family === 'typescript') {
    files.typescript = `// ${courseId} cumulative strict TypeScript portfolio.\n// Add one typed behavior, runtime boundary, changed case, and evidence return per activity.\n`;
  } else if (family === 'javascript') {
    files.javascript = `// ${courseId} cumulative stakeholder program.\n// Add one runnable behavior, assertion, changed case, and evidence return per activity.\n`;
  } else if (family === 'go') {
    files.go = `// ${courseId} cumulative Go systems portfolio.
// Each increment names ownership, failure, boundary, and observable behavior.
// Browser execution uses an isolated Yaegi subset; transfer evidence names full Go 1.26 toolchain gates.
package main

import "fmt"

func main() {
	fmt.Println("Go systems portfolio ready")
}
`;
  } else if (family === 'sql') {
    files.sql = `-- ${courseId} cumulative relational data portfolio.\n-- Each increment declares grain, predicts cardinality or changed rows, runs in fresh browser SQLite,\n-- reconciles results, tests changed data, and records PostgreSQL or standard-SQL boundaries.\n\nSELECT sqlite_version() AS browser_sqlite_version;\n`;
  } else if (family === 'python') {
    files.python = `"""${courseId} cumulative stakeholder program."""\n\nfrom pathlib import Path\nfrom typing import Any\n\n# Add one tested, typed, inspectable program increment per activity.\n`;
  } else if (family === 'functional') {
    files.python = `"""${courseId} immutable transformation portfolio."""\n\nfrom collections.abc import Callable, Iterable, Iterator\nfrom functools import partial, reduce\nfrom itertools import chain, islice\nfrom typing import TypeVar\n\nT = TypeVar('T')\nU = TypeVar('U')\n\n# Extend one pure, lazy, tested pipeline increment per activity.\n`;
  } else if (family === 'algorithms') {
    files.python = `"""${courseId} algorithm evidence portfolio."""\n\nfrom collections import deque\nfrom dataclasses import dataclass\nfrom heapq import heappop, heappush\nfrom typing import TypeVar\n\nT = TypeVar('T')\n\n# Add implementation, invariant, counterexample, and measured cost evidence per activity.\n`;
  } else if (family === 'network') {
    files.shell = `# ${courseId} safe operations evidence notebook\n# Commands run only in the deterministic browser simulator.\n# Add one observation, command, expected signal, and conclusion per activity.\n`;
  } else if (family === 'prompt') {
    files.prompt = `# Cross-agent prompt portfolio\n# Add tested contracts below. Keep shared intent separate from Claude and Codex adaptations.\n`;
  } else if (family === 'loops') {
    files.prompt = `# Persistent goal and operator-control portfolio\n`;
    files.python = `"""Bounded agent-loop portfolio. No external effects occur in this browser lab."""\n\nfrom dataclasses import dataclass\n\n# Add explicit state, stop, recovery, and evidence increments below.\n`;
  } else if (family === 'skills') {
    files.config = `# Skill and MCP integration portfolio\n# Record scope, triggers, permissions, tests, and maintenance evidence.\n`;
    files.python = `"""Local MCP protocol and tool-contract portfolio."""\n\n# Add typed, bounded protocol increments below.\n`;
  } else {
    files.config = `# Risk-profiled repository gate portfolio\n# Each gate needs purpose, command, failure fixture, owner, and suppression policy.\n`;
  }
  return files;
}

function sqlEvidenceSpec(competencyId, suffix) {
  const variant = Number.parseInt(suffix.slice(-2), 36) % 4;
  const numericSuffix = (Number.parseInt(suffix, 36) % 900) + 3000;
  const choose = (focus, featurePattern, examples) => ({
    focus,
    featurePattern,
    example: examples[variant],
  });

  if (/^sql-(?:data-|dbms-|declarative)/.test(competencyId)) {
    return choose(
      'database-system and data-lifecycle evidence',
      '(?:sqlite_version|sqlite_schema|PRAGMA|SELECT)',
      [
        `SELECT sqlite_version() AS runtime_version;`,
        `SELECT name, type\nFROM sqlite_schema\nWHERE type IN ('table', 'view')\nORDER BY type, name;`,
        `PRAGMA table_info(tickets);`,
        `EXPLAIN QUERY PLAN\nSELECT ticket_id, status FROM tickets WHERE status = 'open';`,
      ]
    );
  }
  if (/^sql-(?:relation-|super-|foreign-|null-meaning|table-grain)/.test(competencyId)) {
    return choose(
      'relation grain, key, reference, or NULL evidence',
      '(?:PRAGMA|LEFT\\s+JOIN|IS\\s+NULL|GROUP\\s+BY)',
      [
        `PRAGMA foreign_key_list(tickets);`,
        `SELECT ticket_id, owner_id\nFROM tickets\nWHERE owner_id IS NULL\nORDER BY ticket_id;`,
        `SELECT team_id, COUNT(*) AS tickets_at_team_grain\nFROM tickets\nGROUP BY team_id\nORDER BY team_id;`,
        `SELECT tickets.ticket_id, members.name AS owner_name\nFROM tickets\nLEFT JOIN members ON members.member_id = tickets.owner_id\nORDER BY tickets.ticket_id;`,
      ]
    );
  }
  if (
    /^sql-(?:select-from|alias-contracts|scalar-expressions|type-conversion|distinct-duplicates)/.test(
      competencyId
    )
  ) {
    return choose(
      'projection, expression, type, alias, or duplicate evidence',
      '(?:SELECT|CASE|CAST|DISTINCT)',
      [
        `SELECT ticket_id, title, severity\nFROM tickets\nORDER BY ticket_id;`,
        `SELECT t.ticket_id AS id, t.status AS current_status\nFROM tickets AS t\nORDER BY t.ticket_id;`,
        `SELECT ticket_id,\n       CASE severity WHEN 'critical' THEN 1 WHEN 'high' THEN 2 ELSE 3 END AS urgency\nFROM tickets\nORDER BY urgency, ticket_id;`,
        `SELECT DISTINCT status\nFROM tickets\nORDER BY status;`,
      ]
    );
  }
  if (
    /^sql-(?:where-|three-valued|null-predicates|pattern-filtering|order-limit)/.test(competencyId)
  ) {
    return choose(
      'predicate, NULL logic, pattern, or deterministic-order evidence',
      '(?:WHERE|IS\\s+NULL|LIKE|ORDER\\s+BY)',
      [
        `SELECT ticket_id, severity, status\nFROM tickets\nWHERE status <> 'resolved' AND severity IN ('high', 'critical')\nORDER BY ticket_id;`,
        `SELECT ticket_id, owner_id, owner_id = 1 AS owner_is_one\nFROM tickets\nWHERE owner_id = 1 OR owner_id IS NULL\nORDER BY ticket_id;`,
        `SELECT ticket_id, COALESCE(CAST(owner_id AS TEXT), 'unassigned') AS owner\nFROM tickets\nWHERE owner_id IS NULL\nORDER BY ticket_id;`,
        `SELECT ticket_id, title\nFROM tickets\nWHERE title LIKE '%i%'\nORDER BY opened_at, ticket_id\nLIMIT 4;`,
      ]
    );
  }
  if (
    /^sql-(?:aggregate-|group-by|having-|conditional-aggregation|metric-validation)/.test(
      competencyId
    )
  ) {
    return choose(
      'aggregate grain, denominator, or reconciliation evidence',
      '(?:COUNT|SUM|AVG|GROUP\\s+BY|HAVING)',
      [
        `SELECT COUNT(*) AS all_tickets, COUNT(owner_id) AS owned_tickets\nFROM tickets;`,
        `SELECT team_id, COUNT(*) AS ticket_count\nFROM tickets\nGROUP BY team_id\nORDER BY team_id;`,
        `SELECT team_id, COUNT(*) AS unresolved_count\nFROM tickets\nWHERE status <> 'resolved'\nGROUP BY team_id\nHAVING COUNT(*) >= 1\nORDER BY team_id;`,
        `SELECT SUM(CASE WHEN status = 'resolved' THEN 1 ELSE 0 END) AS resolved,\n       COUNT(*) AS total\nFROM tickets;`,
      ]
    );
  }
  if (/^sql-(?:inner-join|outer-join|many-to-many|self-cross|fanout)/.test(competencyId)) {
    return choose(
      'join relationship, unmatched-row, or fanout evidence',
      '(?:JOIN|CROSS\\s+JOIN|WITH)',
      [
        `SELECT tickets.ticket_id, teams.name AS team_name\nFROM tickets\nINNER JOIN teams ON teams.team_id = tickets.team_id\nORDER BY tickets.ticket_id;`,
        `SELECT teams.name, COUNT(tickets.ticket_id) AS ticket_count\nFROM teams\nLEFT JOIN tickets ON tickets.team_id = teams.team_id\nGROUP BY teams.team_id, teams.name\nORDER BY teams.name;`,
        `SELECT left_member.name AS first_member, right_member.name AS second_member\nFROM members AS left_member\nJOIN members AS right_member\n  ON right_member.team_id = left_member.team_id\n AND right_member.member_id > left_member.member_id\nORDER BY first_member, second_member;`,
        `WITH effort AS (\n  SELECT ticket_id, SUM(minutes_spent) AS minutes\n  FROM ticket_events GROUP BY ticket_id\n)\nSELECT tickets.ticket_id, COALESCE(effort.minutes, 0) AS minutes\nFROM tickets\nLEFT JOIN effort ON effort.ticket_id = tickets.ticket_id\nORDER BY tickets.ticket_id;`,
      ]
    );
  }
  if (
    /^sql-(?:scalar-table-subqueries|correlated-exists|common-table|recursive-ctes|set-operations)/.test(
      competencyId
    )
  ) {
    return choose(
      'subquery, CTE, recursion, or set-operation evidence',
      '(?:EXISTS|WITH|UNION|INTERSECT|EXCEPT|IN\\s*\\()',
      [
        `SELECT ticket_id, severity\nFROM tickets\nWHERE team_id IN (SELECT team_id FROM teams WHERE region IN ('north', 'east'))\nORDER BY ticket_id;`,
        `SELECT teams.name\nFROM teams\nWHERE NOT EXISTS (SELECT 1 FROM tickets WHERE tickets.team_id = teams.team_id)\nORDER BY teams.name;`,
        `WITH unresolved AS (\n  SELECT ticket_id, team_id FROM tickets WHERE status <> 'resolved'\n)\nSELECT team_id, COUNT(*) AS unresolved_count\nFROM unresolved GROUP BY team_id ORDER BY team_id;`,
        `SELECT team_id FROM tickets WHERE status = 'open'\nUNION\nSELECT team_id FROM tickets WHERE severity = 'critical'\nORDER BY team_id;`,
      ]
    );
  }
  if (/^sql-(?:insert-|update-|delete-|upsert-|mutation-)/.test(competencyId)) {
    return choose(
      'bounded mutation and changed-row evidence',
      '(?:INSERT|UPDATE|DELETE|ON\\s+CONFLICT|changes)',
      [
        `BEGIN;\nINSERT INTO tickets\n  (ticket_id, team_id, title, severity, status, opened_at)\nVALUES (${numericSuffix}, 4, 'Practice import', 'low', 'open', '2026-07-14T09:00:00Z');\nSELECT changes() AS changed_rows;\nROLLBACK;`,
        `BEGIN;\nUPDATE tickets SET owner_id = 3\nWHERE ticket_id = 104 AND owner_id IS NULL;\nSELECT changes() AS changed_rows;\nROLLBACK;`,
        `BEGIN;\nDELETE FROM ticket_events\nWHERE ticket_id = 101 AND event_type = 'reproduced';\nSELECT changes() AS changed_rows;\nROLLBACK;`,
        `BEGIN;\nINSERT INTO teams (team_id, name, region) VALUES (${numericSuffix}, 'Practice ${suffix}', 'west')\nON CONFLICT(name) DO UPDATE SET region = excluded.region;\nSELECT changes() AS changed_rows;\nROLLBACK;`,
      ]
    );
  }
  if (
    /^sql-(?:requirements-|relationship-cardinality|functional-dependencies|normal-forms|lossless-)/.test(
      competencyId
    )
  ) {
    return choose(
      'schema grain, relationship, dependency, or decomposition evidence',
      '(?:CREATE\\s+TABLE|REFERENCES|UNIQUE|PRIMARY\\s+KEY)',
      [
        `CREATE TABLE model_ticket_tags_${suffix} (\n  ticket_id INTEGER NOT NULL REFERENCES tickets(ticket_id),\n  tag TEXT NOT NULL,\n  PRIMARY KEY (ticket_id, tag)\n);`,
        `CREATE TABLE model_services_${suffix} (\n  service_id INTEGER PRIMARY KEY,\n  name TEXT NOT NULL UNIQUE,\n  owning_team_id INTEGER NOT NULL REFERENCES teams(team_id)\n);`,
        `CREATE TABLE model_status_history_${suffix} (\n  ticket_id INTEGER NOT NULL REFERENCES tickets(ticket_id),\n  changed_at TEXT NOT NULL,\n  status TEXT NOT NULL,\n  PRIMARY KEY (ticket_id, changed_at)\n);`,
        `CREATE TABLE model_regions_${suffix} (\n  region_code TEXT PRIMARY KEY,\n  display_name TEXT NOT NULL UNIQUE\n);`,
      ]
    );
  }
  if (
    /^sql-(?:create-table|integrity-constraints|referential-actions|migration-|integrity-repair)/.test(
      competencyId
    )
  ) {
    return choose(
      'DDL constraint, migration, or integrity-repair evidence',
      '(?:CREATE\\s+TABLE|CHECK|REFERENCES|ALTER\\s+TABLE)',
      [
        `CREATE TABLE lab_categories_${suffix} (\n  category_id INTEGER PRIMARY KEY,\n  name TEXT NOT NULL UNIQUE\n);`,
        `CREATE TABLE lab_priorities_${suffix} (\n  priority TEXT PRIMARY KEY CHECK (priority IN ('low', 'normal', 'urgent'))\n);`,
        `CREATE TABLE lab_assignments_${suffix} (\n  ticket_id INTEGER PRIMARY KEY REFERENCES tickets(ticket_id) ON DELETE CASCADE,\n  assigned_at TEXT NOT NULL\n);`,
        `ALTER TABLE tickets ADD COLUMN practice_category_${suffix} TEXT;`,
      ]
    );
  }
  if (/^sql-(?:acid-|begin-|isolation-|concurrency-|recovery-)/.test(competencyId)) {
    return choose(
      'transaction boundary, concurrency, or recovery evidence',
      '(?:BEGIN|SAVEPOINT|COMMIT|ROLLBACK|changes|PRAGMA)',
      [
        `BEGIN;\nUPDATE tickets SET status = 'investigating'\nWHERE ticket_id = 103 AND status = 'open';\nSELECT changes() AS transition_count;\nROLLBACK;`,
        `BEGIN;\nSAVEPOINT before_assignment;\nUPDATE tickets SET owner_id = 3 WHERE ticket_id = 104;\nROLLBACK TO before_assignment;\nCOMMIT;`,
        `BEGIN IMMEDIATE;\nUPDATE tickets SET status = 'resolved', resolved_at = '2026-07-14T10:00:00Z'\nWHERE ticket_id = 103 AND status = 'open';\nSELECT changes() AS won_transition;\nROLLBACK;`,
        `PRAGMA integrity_check;`,
      ]
    );
  }
  if (/^sql-(?:window-|ranking-|offset-|running-|time-semantics)/.test(competencyId)) {
    return choose(
      'window partition, ordering, frame, rank, or time evidence',
      '(?:OVER\\s*\\(|ROW_NUMBER|RANK|LAG|ROWS\\s+BETWEEN)',
      [
        `SELECT ticket_id, team_id,\n       ROW_NUMBER() OVER (PARTITION BY team_id ORDER BY opened_at, ticket_id) AS arrival\nFROM tickets ORDER BY team_id, arrival;`,
        `SELECT ticket_id, severity,\n       DENSE_RANK() OVER (ORDER BY CASE severity WHEN 'critical' THEN 1 WHEN 'high' THEN 2 ELSE 3 END) AS severity_rank\nFROM tickets ORDER BY severity_rank, ticket_id;`,
        `SELECT ticket_id, opened_at,\n       LAG(opened_at) OVER (PARTITION BY team_id ORDER BY opened_at, ticket_id) AS previous_opened\nFROM tickets ORDER BY team_id, opened_at, ticket_id;`,
        `SELECT event_id, ticket_id, minutes_spent,\n       SUM(minutes_spent) OVER (PARTITION BY ticket_id ORDER BY occurred_at, event_id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_minutes\nFROM ticket_events ORDER BY ticket_id, occurred_at, event_id;`,
      ]
    );
  }
  if (/^sql-(?:view-|materialized-|trigger-|database-logic)/.test(competencyId)) {
    return choose(
      'view, trigger, reusable-logic, or side-effect evidence',
      '(?:CREATE\\s+TEMP\\s+(?:VIEW|TRIGGER|TABLE)|SELECT)',
      [
        `CREATE TEMP VIEW queue_${suffix} AS\nSELECT ticket_id, team_id, owner_id, severity, opened_at\nFROM tickets WHERE status <> 'resolved';\nSELECT ticket_id FROM queue_${suffix} ORDER BY opened_at, ticket_id;`,
        `CREATE TEMP TABLE audit_${suffix} (ticket_id INTEGER, old_status TEXT, new_status TEXT);`,
        `CREATE TEMP TRIGGER audit_status_${suffix}\nAFTER UPDATE OF status ON tickets\nBEGIN\n  SELECT CASE WHEN NEW.status = OLD.status THEN RAISE(IGNORE) END;\nEND;`,
        `SELECT ticket_id,\n       CASE WHEN status = 'resolved' THEN resolved_at ELSE opened_at END AS relevant_time\nFROM tickets ORDER BY relevant_time, ticket_id;`,
      ]
    );
  }
  if (/^sql-(?:index-|composite-|selectivity-|explain-|performance-)/.test(competencyId)) {
    return choose(
      'index, access-path, plan, or controlled-performance evidence',
      '(?:CREATE\\s+INDEX|EXPLAIN\\s+QUERY\\s+PLAN|ANALYZE)',
      [
        `EXPLAIN QUERY PLAN\nSELECT ticket_id FROM tickets WHERE owner_id = 1 ORDER BY opened_at;`,
        `CREATE INDEX idx_queue_${suffix}\nON tickets(status, severity, opened_at, ticket_id);`,
        `EXPLAIN QUERY PLAN\nSELECT ticket_id, opened_at FROM tickets\nWHERE status = 'open' AND severity = 'high'\nORDER BY opened_at, ticket_id;`,
        `ANALYZE;\nSELECT COUNT(*) AS tickets_after_analyze FROM tickets;`,
      ]
    );
  }
  if (/^sql-(?:injection-|parameterized-|least-privilege|privacy-|audit-)/.test(competencyId)) {
    return choose(
      'parameterization, authorization, minimization, or audit evidence',
      '(?:SELECT|:[a-z_]+|CREATE\\s+VIEW)',
      [
        `SELECT ticket_id, title, status\nFROM tickets\nWHERE severity = :severity\nORDER BY opened_at, ticket_id;`,
        `SELECT ticket_id, title, status\nFROM tickets\nWHERE status = :status AND team_id = :authorized_team_id\nORDER BY ticket_id;`,
        `CREATE TEMP VIEW public_queue_${suffix} AS\nSELECT ticket_id, severity, status, opened_at\nFROM tickets;\nSELECT * FROM public_queue_${suffix} ORDER BY ticket_id;`,
        `SELECT ticket_id, status, opened_at\nFROM tickets\nWHERE opened_at >= :retention_boundary\nORDER BY opened_at, ticket_id;`,
      ]
    );
  }
  return choose(
    'dialect, storage-model, distribution, or production evidence',
    '(?:SELECT|PRAGMA|EXPLAIN)',
    [
      `SELECT sqlite_version() AS tested_sqlite_version,\n       CURRENT_TIMESTAMP AS observed_at;`,
      `SELECT typeof(owner_id) AS sqlite_runtime_type, COUNT(*) AS rows\nFROM tickets GROUP BY typeof(owner_id) ORDER BY sqlite_runtime_type;`,
      `PRAGMA integrity_check;`,
      `EXPLAIN QUERY PLAN\nSELECT team_id, COUNT(*) AS backlog\nFROM tickets WHERE status <> 'resolved'\nGROUP BY team_id ORDER BY team_id;`,
    ]
  );
}

function sourcePattern(target, competencyId, evidenceKey, family, moduleId, activityKind) {
  const suffix = hash(evidenceKey).toString(36).slice(0, 6);
  const httpCompetency = /^http-(?:go|ts|py)-/.test(competencyId);
  const httpFunctionName = `evidence_${competencyId.replaceAll('-', '_')}_${suffix}`;
  const httpMarker = `// Evidence: ${competencyId}-${suffix}`;
  if (moduleId.startsWith('crawler-go-')) {
    return webScraperGoEvidenceContract({
      activityKind,
      competencyId,
      moduleId,
      functionName: httpFunctionName,
      marker: httpMarker,
      suffix,
    });
  }
  if (moduleId.startsWith('crawler-ts-')) {
    return webScraperTypescriptEvidenceContract({
      activityKind,
      competencyId,
      moduleId,
      functionName: httpFunctionName,
      marker: httpMarker,
      suffix,
    });
  }
  if (moduleId.startsWith('feed-go-')) {
    return blogAggregatorGoEvidenceContract({
      activityKind,
      competencyId,
      moduleId,
      functionName: httpFunctionName,
      marker: httpMarker,
      suffix,
    });
  }
  if (moduleId.startsWith('feed-ts-')) {
    return blogAggregatorTypescriptEvidenceContract({
      activityKind,
      competencyId,
      moduleId,
      functionName: httpFunctionName,
      marker: httpMarker,
      suffix,
    });
  }
  if (moduleId.startsWith('pokedex-go-')) {
    return pokedexGoEvidenceContract({
      activityKind,
      competencyId,
      moduleId,
      functionName: httpFunctionName,
      marker: httpMarker,
      suffix,
    });
  }
  if (moduleId.startsWith('pokedex-ts-')) {
    return pokedexTypescriptEvidenceContract({
      activityKind,
      competencyId,
      moduleId,
      functionName: httpFunctionName,
      marker: httpMarker,
      suffix,
    });
  }
  if (moduleId.startsWith('agentpy-')) {
    const functionName = `evidence_${competencyId.replaceAll('-', '_')}_${suffix}`;
    const marker = `# Evidence: ${competencyId}-${suffix}`;
    return aiAgentPythonEvidenceContract({
      activityKind,
      competencyId,
      moduleId,
      functionName,
      marker,
      suffix,
    });
  }
  if (moduleId.startsWith('scraper-')) {
    const functionName = `evidence_${competencyId.replaceAll('-', '_')}_${suffix}`;
    const marker = `# Evidence: ${competencyId}-${suffix}`;
    return webScraperPythonEvidenceContract({
      activityKind,
      competencyId,
      moduleId,
      functionName,
      marker,
      suffix,
    });
  }
  if (moduleId.startsWith('maze-')) {
    const functionName = `evidence_${competencyId.replaceAll('-', '_')}_${suffix}`;
    const marker = `# Evidence: ${competencyId}-${suffix}`;
    return mazePythonEvidenceContract({
      activityKind,
      competencyId,
      moduleId,
      functionName,
      marker,
      suffix,
    });
  }
  if (moduleId.startsWith('static-site-')) {
    const functionName = `evidence_${competencyId.replaceAll('-', '_')}_${suffix}`;
    const marker = `# Evidence: ${competencyId}-${suffix}`;
    return staticSitePythonEvidenceContract({
      activityKind,
      competencyId,
      moduleId,
      functionName,
      marker,
      suffix,
    });
  }
  if (moduleId.startsWith('asteroids-')) {
    const functionName = `evidence_${competencyId.replaceAll('-', '_')}_${suffix}`;
    const marker = `# Evidence: ${competencyId}-${suffix}`;
    return asteroidsPythonEvidenceContract({
      activityKind,
      competencyId,
      moduleId,
      functionName,
      marker,
      suffix,
    });
  }
  if (moduleId.startsWith('bookbot-')) {
    const functionName = `evidence_${competencyId.replaceAll('-', '_')}_${suffix}`;
    const marker = `# Evidence: ${competencyId}-${suffix}`;
    return bookbotPythonEvidenceContract({
      activityKind,
      competencyId,
      moduleId,
      functionName,
      marker,
      suffix,
    });
  }
  if (moduleId.startsWith('rag-')) {
    const functionName = `evidence_${competencyId.replaceAll('-', '_')}_${suffix}`;
    const marker = `# Evidence: ${competencyId}-${suffix}`;
    return ragPythonEvidenceContract({
      activityKind,
      competencyId,
      moduleId,
      functionName,
      marker,
      suffix,
    });
  }
  if (moduleId.startsWith('cmem-')) {
    const functionName = `evidence_${competencyId.replaceAll('-', '_')}_${suffix}`;
    const marker = `/* Evidence: ${competencyId}-${suffix} */`;
    return cMemoryManagementEvidenceContract({
      activityKind,
      competencyId,
      moduleId,
      functionName,
      marker,
      suffix,
    });
  }
  if (moduleId.startsWith('crypto-go-')) {
    return cryptographyGoEvidenceContract({
      activityKind,
      competencyId,
      moduleId,
      functionName: httpFunctionName,
      marker: httpMarker,
      suffix,
    });
  }
  if (moduleId.startsWith('storage-ts-')) {
    return fileServersS3TypescriptEvidenceContract({
      activityKind,
      competencyId,
      moduleId,
      functionName: httpFunctionName,
      marker: httpMarker,
      suffix,
    });
  }
  if (moduleId.startsWith('storage-go-')) {
    return fileServersS3GoEvidenceContract({
      competencyId,
      moduleId,
      functionName: httpFunctionName,
      marker: httpMarker,
      suffix,
    });
  }
  if (moduleId.startsWith('rabbit-go-')) {
    return rabbitmqGoEvidenceContract({
      competencyId,
      moduleId,
      functionName: httpFunctionName,
      marker: httpMarker,
      suffix,
    });
  }
  if (moduleId.startsWith('rabbit-ts-')) {
    return rabbitmqTypescriptEvidenceContract({
      competencyId,
      moduleId,
      functionName: httpFunctionName,
      marker: httpMarker,
      suffix,
    });
  }
  if (moduleId.startsWith('http-protocol-go-')) {
    return httpProtocolGoEvidenceContract({
      competencyId,
      moduleId,
      functionName: httpFunctionName,
      marker: httpMarker,
      suffix,
    });
  }
  if (moduleId.startsWith('http-server-go-')) {
    return httpServerGoEvidenceContract({
      competencyId,
      moduleId,
      functionName: httpFunctionName,
      marker: httpMarker,
      suffix,
    });
  }
  if (moduleId.startsWith('http-server-ts-')) {
    return httpServerTypescriptEvidenceContract({
      competencyId,
      moduleId,
      functionName: httpFunctionName,
      marker: httpMarker,
      suffix,
    });
  }
  if (httpCompetency) {
    const contract = httpEvidenceContract({
      target,
      moduleId,
      functionName: httpFunctionName,
      marker: httpMarker,
    });
    if (!contract) throw new Error(`Missing HTTP evidence contract for ${target} ${moduleId}`);
    return contract;
  }
  if (family === 'docker') {
    const marker = `  # Evidence: ${competencyId}-${suffix}`;
    return dockerEvidenceContract({ competencyId, moduleId, marker, suffix });
  }
  if (family === 'kubernetes') {
    const marker = `  # Evidence: ${competencyId}-${suffix}`;
    return kubernetesEvidenceContract({
      competencyId,
      moduleId,
      marker,
      suffix,
    });
  }
  if (family === 'cicd') {
    const marker = `  # Evidence: ${competencyId}-${suffix}`;
    return cicdEvidenceContract({ competencyId, moduleId, marker, suffix });
  }
  if (family === 'git' && moduleId.startsWith('git-advanced-')) {
    const marker = `# Evidence: ${competencyId}-${suffix}`;
    return gitAdvancedEvidenceContract({ moduleId, marker, suffix });
  }
  if (target === 'typescript') {
    const functionName = `evidence_${competencyId.replaceAll('-', '_')}_${suffix}`;
    return {
      marker: functionName,
      pattern: `function\\s+${functionName}\\s*\\([^)]*:[^)]*\\)\\s*:\\s*[^\\s{]+\\s*\\{[\\s\\S]*?(?:if\\s*\\(|console\\.assert\\s*\\()[\\s\\S]*?return`,
      example: `function ${functionName}(input: unknown): unknown {\n  // Narrow the external value and return typed evidence.\n  throw new Error('replace with narrowing, a runtime invariant, and an evidence return');\n}`,
      requirement: `Add a ${functionName} function with typed input and output, narrow the changed external value, enforce one runtime invariant, and return inspectable evidence.`,
    };
  }
  if (target === 'javascript') {
    const functionName = `evidence_${competencyId.replaceAll('-', '_')}_${suffix}`;
    return {
      marker: functionName,
      pattern: `function\\s+${functionName}\\s*\\([^)]*\\)\\s*\\{[\\s\\S]*?console\\.assert\\s*\\([\\s\\S]*?return`,
      example: `function ${functionName}(input) {\n  // Derive evidence from the changed case.\n  throw new Error('replace with behavior, console.assert(...), and an evidence return');\n}`,
      requirement: `Add a ${functionName} function that derives the changed-case result, asserts one meaningful invariant with console.assert, and returns inspectable evidence.`,
    };
  }
  if (target === 'go') {
    const functionName = `evidence_${competencyId.replaceAll('-', '_')}_${suffix}`;
    const marker = `// Evidence: ${competencyId}-${suffix}`;
    const withinEvidenceBlock = '(?:(?!// Evidence:)[\\s\\S])';
    const concurrency =
      /goroutine|channel|select|pipeline|context|cancel|backpressure|race|mutex|atomic|once|cond/.test(
        competencyId
      );
    const collection = /array|slice|map|string|rune|utf8|deterministic/.test(competencyId);
    const failure = /error|panic|recover|failure|resource/.test(competencyId);
    const generic = /generic|constraint|type-parameter|iterator/.test(competencyId);
    const variant = hash(`${competencyId}-${suffix}`) % 4;

    if (concurrency) {
      return {
        marker,
        pattern: `${marker}${withinEvidenceBlock}*?func\\s+${functionName}\\s*\\([^)]*\\)\\s*\\([^)]*\\)\\s*\\{${withinEvidenceBlock}*?(?:go\\s+func|make\\s*\\(\\s*chan|select\\s*\\{|sync\\.)${withinEvidenceBlock}*?return`,
        example: `${marker}
func ${functionName}(input int) (int, bool) {
	if input < 0 { return 0, false }
	result := make(chan int, 1)
	go func() { result <- input * ${variant + 2} }()
	observed := <-result
	return observed, observed >= input
}`,
        requirement: `Append a runnable Go function headed "${marker}" that bounds the changed case, uses explicit goroutine or synchronization ownership, proves a stop path or invariant, and returns inspectable evidence.`,
      };
    }
    if (collection) {
      return {
        marker,
        pattern: `${marker}${withinEvidenceBlock}*?func\\s+${functionName}\\s*\\([^)]*\\)\\s*\\([^)]*\\)\\s*\\{${withinEvidenceBlock}*?(?:map\\[|\\[\\]|append\\s*\\(|range\\s+)${withinEvidenceBlock}*?if\\s+${withinEvidenceBlock}*?return`,
        example: `${marker}
func ${functionName}(input int) (int, bool) {
	values := []int{input, input + 1, input + ${variant + 2}}
	if input < 0 { return 0, false }
	total := 0
	for _, value := range values { total += value }
	return total, len(values) == 3
}`,
        requirement: `Append a runnable Go function headed "${marker}" that handles a concrete collection or text boundary, makes copy or iteration behavior observable, checks one invariant, and returns evidence.`,
      };
    }
    if (failure) {
      return {
        marker,
        pattern: `${marker}${withinEvidenceBlock}*?func\\s+${functionName}\\s*\\([^)]*\\)\\s*\\([^)]*error\\)\\s*\\{${withinEvidenceBlock}*?if\\s+${withinEvidenceBlock}*?(?:fmt\\.Errorf|errors\\.|error)${withinEvidenceBlock}*?return`,
        example: `${marker}
func ${functionName}(input int) (int, error) {
	if input < 0 { return 0, fmt.Errorf("input %d: must be non-negative", input) }
	result := input * ${variant + 2}
	return result, nil
}`,
        requirement: `Append a runnable Go function headed "${marker}" with a concrete invalid or failure case, a preserved error cause or resource boundary, and a successful evidence result.`,
      };
    }
    if (generic) {
      return {
        marker,
        pattern: `${marker}${withinEvidenceBlock}*?func\\s+${functionName}\\s*\\[[^\\]]+\\]\\s*\\([^)]*\\)\\s*\\([^)]*\\)\\s*\\{${withinEvidenceBlock}*?if\\s+${withinEvidenceBlock}*?return`,
        example: `${marker}
func ${functionName}[T ~int](input T) (T, bool) {
	if input < 0 { var zero T; return zero, false }
	result := input * ${variant + 2}
	return result, result >= input
}`,
        requirement: `Append a runnable generic Go function headed "${marker}" whose minimal constraint permits every used operation, rejects one boundary, and preserves a type relationship in returned evidence.`,
      };
    }
    return {
      marker,
      pattern: `${marker}${withinEvidenceBlock}*?func\\s+${functionName}\\s*\\([^)]*\\)\\s*\\([^)]*\\)\\s*\\{${withinEvidenceBlock}*?if\\s+${withinEvidenceBlock}*?return`,
      example: `${marker}
func ${functionName}(input int) (int, bool) {
	if input < 0 { return 0, false }
	result := input * ${variant + 2}
	if result < input { return 0, false }
	return result, true
}`,
      requirement: `Append a runnable Go function headed "${marker}" that handles one concrete boundary, computes the changed case, verifies an invariant, and returns inspectable value plus validity evidence.`,
    };
  }
  if (target === 'python') {
    const functionName = `evidence_${competencyId.replaceAll('-', '_')}_${suffix}`;
    return {
      marker: functionName,
      pattern: `def\\s+${functionName}\\s*\\([^)]*\\)[\\s\\S]*?assert[\\s\\S]*?return`,
      example: `def ${functionName}(case):\n    # Compute or trace the current changed case.\n    raise NotImplementedError("replace with a model, meaningful invariant, and evidence return")`,
      requirement: `Add a ${functionName} function that computes or traces the changed case, asserts one meaningful invariant, and returns inspectable evidence.`,
    };
  }
  if (target === 'sql') {
    const marker = `-- Evidence: ${competencyId}-${suffix}`;
    const spec = sqlEvidenceSpec(competencyId, suffix);
    const withinEvidenceBlock = '(?:(?!-- Evidence:)[\\s\\S])';
    return {
      marker,
      pattern: `${marker}${withinEvidenceBlock}*?--\\s*(?:grain|hypothesis|prediction):\\s*(?!\\[|todo)[^\\n]{12,}${withinEvidenceBlock}*?${spec.featurePattern}${withinEvidenceBlock}*?;${withinEvidenceBlock}*?--\\s*(?:observation|reconciliation|verify):\\s*(?!\\[|todo)[^\\n]{12,}`,
      example: `${marker}\n-- grain: declare the exact row or mutation grain before running\n${spec.example}\n-- observation: reconcile the returned rows, changed count, error, or plan with the prediction`,
      requirement: `Append a runnable SQLite increment headed "${marker}" with a concrete grain, hypothesis, or prediction; ${spec.focus}; and an observation, reconciliation, or verification tied to returned rows, changed rows, an error, or a plan.`,
    };
  }
  if (target === 'prompt') {
    const marker = `Evidence: ${competencyId}-${suffix}`;
    return {
      marker,
      pattern: `${marker}[\\s\\S]*?(?:Goal|Objective):[\\s\\S]*?(?:Done when|Acceptance|Verify):`,
      example: `${marker}\nGoal: [replace with one observable outcome]\nContext: [replace with decision-relevant facts]\nConstraints: [replace with authority and safety boundaries]\nOutput: [replace with the artifact and evidence shape]\nDone when: [replace with changed-case acceptance criteria]`,
      requirement: `Append a contract headed "${marker}" with concrete Goal, Context, Constraints, Output, and Done when sections tailored to this case.`,
    };
  }
  if (target === 'shell') {
    const marker = `# Evidence: ${competencyId}-${suffix}`;
    const commandPattern =
      family === 'git'
        ? 'git\\s+(?:status|diff|log|show|branch|switch|merge-base|merge|remote|fetch|pull|push|tag|restore|revert|reset|reflog|add|commit)'
        : family === 'linux'
          ? '(?:pwd|ls|stat|find|grep|rg|sort|uniq|cut|sed|awk|id|umask|chmod|ps|pgrep|kill|systemctl|journalctl|df|du|lsblk|findmnt|tar|sha256sum|type|command)'
          : '(?:ping|dig|traceroute|tracepath|ip\\s|ss\\s|arp\\s|show\\s|nslookup)';
    return {
      marker,
      pattern: `${marker}[\\s\\S]*?#\\s*hypothesis:\\s*(?!\\[|todo)[^\\n]{12,}[\\s\\S]*?${commandPattern}[^\\n]*[\\s\\S]*?#\\s*(?:observation|expected):\\s*(?!\\[|todo)[^\\n]{12,}`,
      example: `${marker}\n# hypothesis: [replace with one falsifiable cause]\n# command: choose one bounded simulator observation\n# observation: [replace with the result that changes the next decision]`,
      requirement: `Append a safe ${family === 'git' ? 'repository' : family === 'linux' ? 'Linux operations' : 'network'} investigation headed "${marker}" with a concrete hypothesis, one bounded simulator command, and an observation that changes the next decision.`,
    };
  }
  if (target === 'config' && family === 'support') {
    const marker = `${competencyId}-${suffix}:`;
    const concrete = '(?!\\[|describe|name|replace|todo)[^\\n]{12,}';
    return {
      marker,
      pattern: `${marker}[\\s\\S]*?user-impact:\\s*${concrete}[\\s\\S]*?safety-authority:\\s*${concrete}[\\s\\S]*?hypothesis:\\s*${concrete}[\\s\\S]*?test:\\s*${concrete}[\\s\\S]*?observation:\\s*${concrete}[\\s\\S]*?repair-rollback:\\s*${concrete}[\\s\\S]*?verify:\\s*${concrete}[\\s\\S]*?escalation:\\s*${concrete}`,
      example: `${marker}\n  user-impact: [replace with the bounded user outcome]\n  safety-authority: [replace with consent, hazards, and stop rule]\n  hypothesis: [replace with a falsifiable cause and competing explanation]\n  test: [replace with one reversible discriminating simulator test]\n  observation: [replace with the actual result and rejected inference]\n  repair-rollback: [replace with least-change repair and rollback trigger]\n  verify: [replace with original, changed, and side-effect checks]\n  escalation: [replace with threshold, destination, and evidence packet]`,
      requirement: `Append a fictional support incident block headed "${marker}" with concrete user impact, safety and authority, competing hypothesis, bounded test, observation, repair and rollback, changed-case verification, and escalation evidence.`,
    };
  }
  const marker = `${competencyId}-${suffix}:`;
  return {
    marker,
    pattern: `${marker}[\\s\\S]*?verify:\\s*(?!\\[|describe|todo)[^\\n]{12,}[\\s\\S]*?(?:failure|owner|repair):\\s*(?!\\[|name|give|todo)[^\\n]{12,}`,
    example: `${marker}\n  verify: [replace with a deterministic check]\n  failure: [replace with the rejected condition]\n  repair: [replace with a local reproduction and correction path]`,
    requirement: `Append a ${marker} manifest entry with concrete verify plus failure, owner, or repair evidence.`,
  };
}

function mathCalculation(moduleId, seed) {
  const n = (seed % 4) + 1;
  if (moduleId.includes('percent')) {
    const base = 80 + n * 10;
    const rate = 10 + n * 2;
    return {
      prompt: `A price of $${base} is reduced by ${rate}%. What is the new price?`,
      method: `Use ${base} × (1 − ${rate}/100), then compare the result with the original price.`,
      expected: base * (1 - rate / 100),
      tolerance: 0.01,
      units: ['$', 'dollars'],
    };
  }
  if (/measurement|geometry|vector-geometry/.test(moduleId)) {
    const length = 4 + n;
    const width = 2 + n;
    return {
      prompt: `A rectangular working area measures ${length} m by ${width} m. Calculate its area.`,
      method: `Multiply perpendicular lengths and square the length unit: ${length} m × ${width} m.`,
      expected: length * width,
      tolerance: 0.001,
      units: ['m²', 'm^2', 'square meters'],
    };
  }
  if (/financial|growth|logarithm/.test(moduleId)) {
    const principal = 1000 + n * 100;
    const rate = 0.04 + n * 0.005;
    return {
      prompt: `$${principal} grows once per year at ${(rate * 100).toFixed(1)}% for 2 years. Calculate the compounded value.`,
      method: `Use P(1 + r)^t with P=${principal}, r=${rate.toFixed(3)}, and t=2.`,
      expected: principal * (1 + rate) ** 2,
      tolerance: 0.01,
      units: ['$', 'dollars'],
    };
  }
  if (/probability|stochastic/.test(moduleId)) {
    const gain = 20 + n * 5;
    const probability = 0.2 + n * 0.05;
    return {
      prompt: `An outcome pays $${gain} with probability ${probability.toFixed(2)} and $0 otherwise. Calculate its expected value.`,
      method: `Weight each outcome by its probability: ${gain} × ${probability.toFixed(2)} + 0 × ${(1 - probability).toFixed(2)}.`,
      expected: gain * probability,
      tolerance: 0.01,
      units: ['$', 'dollars'],
    };
  }
  if (/data|statistics|inference|bayesian/.test(moduleId)) {
    const values = [10 + n, 14 + n, 18 + n, 14 + n];
    return {
      prompt: `The observed values are ${values.join(', ')} minutes. Calculate their mean.`,
      method: `Add all ${values.length} observations and divide by ${values.length}; retain the time unit.`,
      expected: values.reduce((sum, value) => sum + value, 0) / values.length,
      tolerance: 0.001,
      units: ['minutes', 'min'],
    };
  }
  if (/graph|function|linear|calculus|differential/.test(moduleId)) {
    const x1 = n;
    const x2 = n + 4;
    const y1 = 3 * x1 + 2;
    const y2 = 3 * x2 + 2;
    return {
      prompt: `A model passes through (${x1}, ${y1}) and (${x2}, ${y2}). Calculate its average rate of change.`,
      method: `Use Δoutput/Δinput = (${y2} − ${y1}) / (${x2} − ${x1}).`,
      expected: 3,
      tolerance: 0.001,
      units: ['units per input', 'per input'],
    };
  }
  if (/logic|set|combinator|network|operations-research/.test(moduleId)) {
    const left = 25 + n;
    const right = 18 + n;
    const overlap = 7 + n;
    return {
      prompt: `${left} records meet rule A, ${right} meet rule B, and ${overlap} meet both. How many meet A or B?`,
      method: `Use inclusion-exclusion: |A ∪ B| = |A| + |B| − |A ∩ B|.`,
      expected: left + right - overlap,
      tolerance: 0,
      units: ['records'],
    };
  }
  if (/trigonometry|signals|fourier/.test(moduleId)) {
    const a = 3 * n;
    const b = 4 * n;
    return {
      prompt: `Perpendicular components are ${a} units and ${b} units. Calculate the resultant magnitude.`,
      method: `Use √(${a}² + ${b}²) and check that the result exceeds either component.`,
      expected: 5 * n,
      tolerance: 0.001,
      units: ['units'],
    };
  }
  if (/matrix|spectral|transformation|optimization|numerical/.test(moduleId)) {
    const a = 2 + n;
    const d = 5 + n;
    const b = 1;
    const c = 2;
    return {
      prompt: `Calculate the determinant of [[${a}, ${b}], [${c}, ${d}]].`,
      method: `For a 2×2 matrix, determinant = ad − bc. Use (${a} × ${d}) − (${b} × ${c}).`,
      expected: a * d - b * c,
      tolerance: 0,
      units: [],
    };
  }
  const start = 18 + n;
  const loss = 5 + n;
  const gain = 2 * n;
  return {
    prompt: `A measured quantity starts at ${start} units, changes by −${loss} units, then by +${gain} units. Calculate the final quantity.`,
    method: `Preserve the signs and compute ${start} − ${loss} + ${gain}; compare with the starting scale.`,
    expected: start - loss + gain,
    tolerance: 0.001,
    units: ['units'],
  };
}

function contentBlocks({ competency, moduleProfile, source, family, moduleId, seed }) {
  const typeGuidance = {
    conceptual:
      'Name the boundaries of the idea, compare a valid case with a near miss, and trace the causal difference.',
    procedural:
      'Check preconditions, perform the operation in an inspectable order, then verify the result and a boundary case.',
    strategic:
      'Compare plausible approaches against the decision, constraints, evidence quality, and cost of being wrong.',
    metacognitive:
      'State the current model, seek disconfirming evidence, and record what would make the conclusion change.',
    professional:
      'Preserve authority, safety, accessibility, traceability, and stakeholder consequences alongside technical correctness.',
  }[competency.knowledgeType];
  const changedCase = domainCase(family, moduleId, seed, 'worked example', competency);
  const reasoningMove = domainReasoningMove(family, moduleId) ?? typeGuidance;
  const example = domainExample(family, moduleId, seed);
  return [
    {
      type: 'paragraph',
      text: `${competency.statement} Use this as an observable contract: name its preconditions, trace the state or value change, and state what evidence would disprove the result.`,
    },
    {
      type: 'callout',
      tone: 'note',
      title: 'Reasoning move',
      text: reasoningMove,
    },
    {
      type: 'callout',
      tone: 'success',
      title: 'Worked case pattern',
      text: `${changedCase} A defensible solution applies ${humanize(competency.id)}, preserves the governing invariant or value contract, and connects the observed result to ${moduleProfile.artifact}.`,
    },
    ...(example
      ? [
          {
            type: 'code',
            language:
              family === 'linux' || family === 'git'
                ? 'bash'
                : family === 'typescript'
                  ? 'typescript'
                  : family === 'javascript'
                    ? 'javascript'
                    : family === 'go'
                      ? 'go'
                      : family === 'c'
                        ? 'c'
                        : family === 'sql'
                          ? 'sql'
                          : family === 'docker' || family === 'kubernetes' || family === 'cicd'
                            ? 'yaml'
                            : 'python',
            code: example,
            caption: moduleId.startsWith('crawler-go-')
              ? 'Compile-ready deterministic pure-Go crawler decision model; trace one accepted and one rejected authorization, URL, robots, HTTP, tree, record, frontier, goroutine, Colly, accessibility, report, deployment, or recovery case, then state which Go compiler, network, DNS, x/net/html, goquery, Colly, race, process, browser, accessibility, load, legal, restore, or production claim still needs controlled transfer evidence.'
              : moduleId.startsWith('crawler-ts-')
                ? 'Compile-ready deterministic pure-TypeScript crawler decision model; trace one accepted and one rejected authorization, URL, robots, Fetch, unknown value, Cheerio tree, frontier, Promise, browser, accessibility, report, package, or recovery case, then state which compiler, emitted Node, network, DNS, Cheerio, Playwright, axe-core, handle, accessibility, load, legal, restore, or production claim still needs controlled transfer evidence.'
                : moduleId.startsWith('feed-go-')
                  ? 'Compile-ready deterministic pure-Go feed-service decision model; trace one accepted and one rejected discovery, RSS or Atom, XML, HTTP, PostgreSQL, schedule, lease, worker, API, tenant, reader, deployment, or recovery case, then state which Go compiler, network, native XML, PostgreSQL, race, process, container, accessibility, load, backup, restore, or production claim still needs controlled transfer evidence.'
                  : moduleId.startsWith('feed-ts-')
                    ? 'Compile-ready deterministic pure-TypeScript feed-service decision model; trace one accepted and one rejected discovery, unknown XML, runtime validation, Fetch stream, Promise, PostgreSQL, lease, Express, tenant, reader, package, deployment, or recovery case, then state which compiler, emitted Node, network, fast-xml-parser, Express, PostgreSQL, handle, container, accessibility, load, backup, restore, or production claim still needs controlled transfer evidence.'
                    : moduleId.startsWith('pokedex-go-')
                      ? 'Compile-ready deterministic pure-Go Pokedex decision model; trace one accepted and one rejected command, resource, response, page, cache, goroutine, cancellation, collection, persistence, security, package, or recovery case, then state which Go compiler, PokéAPI, network, race, signal, filesystem, terminal, accessibility, load, platform, or production claim still needs controlled transfer evidence.'
                      : moduleId.startsWith('pokedex-ts-')
                        ? 'Compile-ready deterministic pure-TypeScript Pokedex decision model; trace one accepted and one rejected command, unknown payload, Response, Promise generation, cache waiter, abort, immutable state, persistence, security, package, or recovery case, then state which TypeScript compiler, Node, PokéAPI, network, stream, signal, filesystem, terminal, accessibility, load, platform, or production claim still needs controlled transfer evidence.'
                        : moduleId.startsWith('agentpy-')
                          ? 'Runnable deterministic fixed-fixture pure-Python agent decision model; trace one accepted and one rejected model, interaction, schema, tool, authority, state, approval, memory, evaluation, security, telemetry, sandbox, deployment, or recovery case, then state which provider, Gemini, google-genai, google-adk, Pydantic, HTTP, identity, storage, browser, accessibility, privacy, load, cost, or production claim still needs controlled transfer evidence.'
                          : moduleId.startsWith('scraper-')
                            ? 'Runnable deterministic fixed-fixture pure-Python crawler decision model; trace one accepted and one rejected authorization, URL, response, tree, record, frontier, browser, report, or recovery case, then state which network, owner, robots, HTTPX, Beautiful Soup, lxml, Scrapy, Playwright, accessibility, privacy, security, legal, load, schedule, or production claim still needs controlled transfer evidence.'
                            : moduleId.startsWith('maze-')
                              ? 'Runnable deterministic pure-Python maze decision model; trace one accepted and one rejected grid, topology, frontier, path, callback, state, accessibility, save, package, or recovery case, then state which Tcl, Tk, tkinter, Canvas, display, focus, input, assistive-technology, filesystem, timing, installer, or production claim still needs controlled native transfer evidence.'
                              : moduleId.startsWith('static-site-')
                                ? 'Runnable deterministic pure-Python static-site decision model; trace one accepted and one rejected source, parse, route, render, asset, accessibility, cache, deployment, or recovery case, then state which filesystem, full CommonMark, markdown-it-py, Jinja, validator, browser, GitHub, Pages, DNS, TLS, CDN, or production claim still needs controlled transfer evidence.'
                                : moduleId.startsWith('asteroids-')
                                  ? 'Runnable deterministic pure-Python Asteroids decision model; trace one accepted and one rejected frame, input, seam, collision, cue, save, package, or release case, then state which native pygame-ce, SDL, display, controller, audio, filesystem, GPU, accessibility playtest, installer, performance, recovery, or publication claim still needs controlled transfer evidence.'
                                  : moduleId.startsWith('bookbot-')
                                    ? 'Runnable deterministic pure-Python Bookbot decision model; trace one accepted and one rejected file, Unicode, stream, CLI, test, package, or release case, then state which host filesystem, terminal, subprocess, Git, install, native profile, load, security, recovery, or publication claim still needs controlled transfer evidence.'
                                    : moduleId.startsWith('rag-')
                                      ? 'Runnable deterministic pure-Python RAG decision model; trace one accepted and one rejected query or corpus case, then state which native model, vector-store, provider, network, load, privacy, security, recovery, or deployment claim still needs controlled transfer evidence.'
                                      : moduleId.startsWith('crypto-go-')
                                        ? 'Runnable deterministic Go cryptographic decision or allowlisted API model; trace one accepted and one rejected case, then state which production entropy, key custody, native side-channel, network, HSM/KMS, PKI, compliance, or deployment claim still needs controlled transfer evidence.'
                                        : moduleId.startsWith('storage-ts-')
                                          ? 'Compile-ready deterministic TypeScript storage and delivery model; trace one accepted and one rejected runtime case, then state which Node, AWS, network, stream, security, cost, or recovery claim still needs controlled transfer evidence.'
                                          : moduleId.startsWith('storage-go-')
                                            ? 'Compile-ready deterministic Go storage and delivery model; trace one accepted and one rejected file case, then state which AWS, network, security, cost, or recovery claim still needs controlled transfer evidence.'
                                            : /^(?:http-(?:go|ts|py)|http-server-(?:go|ts))-/u.test(
                                                  moduleId
                                                )
                                              ? 'Compile-ready deterministic HTTP decision model; trace each return, call it with one accepted and one rejected boundary, then state which live-network claim still needs transfer evidence.'
                                              : `Runnable ${family === 'linux' ? 'safe terminal evidence' : family === 'git' ? 'repository-state trace' : family === 'algorithms' ? 'trace or invariant' : family === 'typescript' ? 'type-and-runtime contract' : family === 'javascript' ? 'runtime trace' : family === 'go' ? 'Go value, failure, or concurrency contract' : family === 'c' ? 'C size, lifetime, ownership, cleanup, or memory invariant' : family === 'sql' ? 'relational query or data-system contract' : family === 'docker' ? 'Docker artifact and transfer-evidence contract' : family === 'kubernetes' ? 'Kubernetes object and transfer-evidence contract' : family === 'cicd' ? 'CI/CD workflow, artifact, release, and transfer-evidence contract' : 'transformation'} example; predict its result before running, then change one boundary input.`,
          },
        ]
      : []),
    {
      type: 'callout',
      tone: 'warning',
      title: 'Non-worked case',
      text: `${competency.misconceptions[0]} This fails the ${humanize(competency.id)} contract because it omits a precondition, invariant, ownership rule, or counterexample needed by this exact case.`,
    },
    {
      type: 'evidence',
      label: 'Research anchor',
      value: `${source.title} (${source.version}) — ${source.scope}`,
    },
    {
      type: 'evidence',
      label: 'Mastery evidence',
      value: competency.masteryEvidence[0],
    },
  ];
}

function createBuilder({
  competencyById,
  moduleProfile,
  source,
  family,
  moduleId,
  activityKind,
  seed,
  competencyModuleById,
}) {
  const steps = [];
  const checks = [];
  const crawlerGoEvidence = moduleId.startsWith('crawler-go-');
  const crawlerTypescriptEvidence = moduleId.startsWith('crawler-ts-');
  const feedGoEvidence = moduleId.startsWith('feed-go-');
  const feedTypescriptEvidence = moduleId.startsWith('feed-ts-');
  const pokedexGoEvidence = moduleId.startsWith('pokedex-go-');
  const pokedexTypescriptEvidence = moduleId.startsWith('pokedex-ts-');
  const aiAgentPythonEvidence = moduleId.startsWith('agentpy-');
  const webScraperPythonEvidence = moduleId.startsWith('scraper-');
  const mazePythonEvidence = moduleId.startsWith('maze-');
  const staticSitePythonEvidence = moduleId.startsWith('static-site-');
  const asteroidsPythonEvidence = moduleId.startsWith('asteroids-');
  const bookbotPythonEvidence = moduleId.startsWith('bookbot-');
  const ragPythonEvidence = moduleId.startsWith('rag-');
  const cryptographyGoEvidence = moduleId.startsWith('crypto-go-');
  const storageTypescriptEvidence = moduleId.startsWith('storage-ts-');
  const storageGoEvidence = moduleId.startsWith('storage-go-');
  const rabbitGoEvidence = moduleId.startsWith('rabbit-go-');
  const rabbitTypescriptEvidence = moduleId.startsWith('rabbit-ts-');
  const rabbitEvidence = rabbitGoEvidence || rabbitTypescriptEvidence;
  const storageEvidence = storageGoEvidence || storageTypescriptEvidence;
  const httpEvidence = /^(?:http-(?:go|ts|py)|http-server-(?:go|ts))-/u.test(moduleId);
  const portfolioEvidence = family === 'portfolio';
  const careerEvidence = family === 'career';
  const supportEvidence = family === 'support';
  const httpTrack = supportEvidence
    ? 'CompTIA A+ support'
    : crawlerGoEvidence
      ? 'Authorized site auditing and Go'
      : crawlerTypescriptEvidence
        ? 'Authorized site auditing and TypeScript'
        : feedGoEvidence
          ? 'Feed aggregation and Go'
          : feedTypescriptEvidence
            ? 'Feed aggregation and TypeScript'
            : pokedexGoEvidence
              ? 'Pokedex product engineering and Go'
              : pokedexTypescriptEvidence
                ? 'Pokedex product engineering and TypeScript'
                : aiAgentPythonEvidence
                  ? 'Safe AI agents and Python'
                  : webScraperPythonEvidence
                    ? 'Authorized crawling and Python'
                    : mazePythonEvidence
                      ? 'Maze solving, Tkinter, and Python'
                      : staticSitePythonEvidence
                        ? 'Static-site publishing and Python'
                        : asteroidsPythonEvidence
                          ? 'Asteroids, pygame-ce, and Python'
                          : bookbotPythonEvidence
                            ? 'Bookbot and Python'
                            : ragPythonEvidence
                              ? 'RAG and Python'
                              : cryptographyGoEvidence
                                ? 'Cryptography and Go'
                                : storageTypescriptEvidence
                                  ? 'S3, CloudFront, and TypeScript'
                                  : storageGoEvidence
                                    ? 'S3, CloudFront, and Go'
                                    : rabbitGoEvidence
                                      ? 'RabbitMQ and Go'
                                      : rabbitTypescriptEvidence
                                        ? 'RabbitMQ and TypeScript'
                                        : moduleId.startsWith('http-go-')
                                          ? 'Go'
                                          : moduleId.startsWith('http-server-go-')
                                            ? 'Go server'
                                            : moduleId.startsWith('http-server-ts-')
                                              ? 'Node and Express server'
                                              : moduleId.startsWith('http-ts-')
                                                ? 'Fetch and TypeScript'
                                                : moduleId.startsWith('http-py-')
                                                  ? 'Python'
                                                  : null;
  const usesExecutableEvidence =
    portfolioEvidence ||
    careerEvidence ||
    supportEvidence ||
    family === 'sql' ||
    family === 'go' ||
    family === 'c' ||
    family === 'docker' ||
    family === 'kubernetes' ||
    family === 'cicd' ||
    storageEvidence ||
    rabbitEvidence ||
    crawlerGoEvidence ||
    crawlerTypescriptEvidence ||
    feedGoEvidence ||
    feedTypescriptEvidence ||
    aiAgentPythonEvidence ||
    webScraperPythonEvidence ||
    mazePythonEvidence ||
    staticSitePythonEvidence ||
    asteroidsPythonEvidence ||
    bookbotPythonEvidence ||
    ragPythonEvidence ||
    httpEvidence;

  function baseStep(id, title, interaction, instruction, why, competencyIds, extra = {}) {
    const previous = steps.at(-1)?.id;
    const competency = competencyById.get(competencyIds[0]);
    const concept = humanize(competencyIds[0]);
    const contextualTitle = usesExecutableEvidence
      ? boundedText(
          `${httpTrack ? `${httpTrack} ` : ''}${title} · ${activityKind.charAt(0).toUpperCase()}${activityKind.slice(1)} ${concept}`,
          100
        )
      : title;
    const changedCase = domainCase(family, moduleId, seed + steps.length, activityKind, competency);
    const step = {
      id,
      title: contextualTitle,
      interaction,
      instruction: usesExecutableEvidence
        ? `${instruction}\n\nEvidence target: ${contextualTitle}.`
        : instruction,
      why: usesExecutableEvidence
        ? `${why} For ${contextualTitle}, keep ${concept} connected to ${crawlerGoEvidence ? 'executable Go authorization, URL, robots, response, tree, frontier, goroutine, report, deployment, and recovery decision' : crawlerTypescriptEvidence ? 'executable TypeScript authorization, URL, runtime admission, Fetch, Promise, browser, accessibility, report, package, and recovery decision' : feedGoEvidence ? 'executable Go feed, XML, HTTP, PostgreSQL, schedule, API, reader, deployment, and recovery decision' : feedTypescriptEvidence ? 'executable TypeScript unknown-validation, async, PostgreSQL, Express, reader, package, deployment, and recovery decision' : aiAgentPythonEvidence ? 'executable Python model, interaction, tool, policy, state, approval, evaluation, security, deployment, and recovery decision' : webScraperPythonEvidence ? 'executable Python authorization, URL, response, parse, provenance, frontier, report, and recovery decision' : mazePythonEvidence ? 'executable Python grid, topology, search, event, state, accessibility, package, and recovery decision' : staticSitePythonEvidence ? 'executable Python source, parse, route, render, accessibility, artifact, deployment, and recovery decision' : asteroidsPythonEvidence ? 'executable Python game-state, timing, input, collision, accessibility, test, package, and release decision' : bookbotPythonEvidence ? 'executable Python text-analysis, command, test, package, and release decision' : ragPythonEvidence ? 'executable Python retrieval, grounding, evaluation, and evidence decision' : supportEvidence ? 'mechanically reviewable user-impact, asset, safety, baseline, symptom, hypothesis, test, observation, repair, rollback, verification, escalation, documentation, and transfer decision' : portfolioEvidence ? 'mechanically reviewable stakeholder, affected-user, artifact, changed-case, failure, repair, release, recovery, and transfer decision' : careerEvidence ? 'mechanically reviewable target-role, truthful-claim, contribution, accessibility, privacy, consent, process-state, changed-candidate, failure, repair, decision, and transfer' : family === 'sql' ? 'executable relational' : family === 'c' ? 'executable C memory invariant and explicit native transfer' : storageTypescriptEvidence ? 'executable TypeScript storage and delivery decision' : storageGoEvidence ? 'executable Go storage and delivery decision' : rabbitGoEvidence ? 'executable Go messaging decision' : rabbitTypescriptEvidence ? 'executable TypeScript messaging decision' : httpEvidence ? 'executable HTTP client decision' : family === 'docker' ? 'mechanically reviewable Docker artifact and transfer' : family === 'kubernetes' ? 'mechanically reviewable Kubernetes object, status, and transfer' : family === 'cicd' ? 'mechanically reviewable workflow, trust, artifact, deployment, and recovery' : 'executable Go behavior'} evidence.`
        : why,
      buildsOnStepIds: previous ? [previous] : [],
      content: extra.content ?? [],
      checkIds: [],
      competencyIds,
      hints:
        extra.hints ??
        (usesExecutableEvidence
          ? [
              `For ${contextualTitle}, name the ${crawlerGoEvidence ? 'owner, permission, revision, Go, seed, URL, scope, robots, response, body, tree, record, frontier, goroutine, accessibility, report, cleanup, recovery, and native-transfer boundary' : crawlerTypescriptEvidence ? 'owner, authorization, source and emitted revision, Node, TypeScript, URL, robots, unknown value, Fetch, Promise, AbortSignal, browser, accessibility, report, handle, recovery, and native-transfer boundary' : feedGoEvidence ? 'reader, publisher, revision, Go, source, tenant, URL, feed format, XML, HTTP, PostgreSQL, transaction, lease, goroutine, API, accessibility, recovery, and native-transfer boundary' : feedTypescriptEvidence ? 'reader, publisher, source and emitted revision, Node, TypeScript, tenant, URL, unknown XML, runtime validation, Fetch, Promise, AbortSignal, PostgreSQL, Express, handle, accessibility, recovery, and native-transfer boundary' : aiAgentPythonEvidence ? 'stakeholder, risk, revision, Python, SDK, API, model, interaction, call, tool, authority, state, budget, approval, memory, evaluation, trace, privacy, security, accessibility, recovery, and provider-transfer boundary' : webScraperPythonEvidence ? 'owner, authorization, stakeholder, revision, runtime, dependency, seed, URL, origin, robots, response, parser, selector, record, frontier, privacy, report, stop, recovery, and transfer boundary' : mazePythonEvidence ? 'player, revision, Python, Tcl and Tk versions, grid, coordinate, seed, topology, frontier, path, event, state, render, accessibility, package, recovery, and native-transfer boundary' : staticSitePythonEvidence ? 'reader, content authority, revision, source, span, parser, trust, route, render, asset, accessibility, artifact, deployment, and recovery boundary' : asteroidsPythonEvidence ? 'player, revision, runtime, seed, input, time, coordinate, state, entity, collision, render, cue, accessibility, package, release, and desktop-transfer boundary' : bookbotPythonEvidence ? 'stakeholder, corpus authority, revision, path, bytes, encoding, Unicode, token, count, rank, report, command, test, package, release, and transfer boundary' : ragPythonEvidence ? 'stakeholder, corpus, source, document, chunk, model, index, query, relevance, tenant, context, citation, evaluation, and transfer boundary' : supportEvidence ? 'user impact, fictional ticket, asset, environment, authorization, hazard, baseline, symptom, timeline, hypothesis, test, observation, repair, rollback, verification, prevention, escalation, accessible documentation, and transfer boundary' : careerEvidence ? 'learner goal, target role, jurisdiction, audience, truthful claim, contribution, source date, evidence revision, accessibility, privacy, consent, process state, decision owner, non-claim, and transfer boundary' : family === 'sql' ? 'row grain' : family === 'c' ? 'size, bounds, object, lifetime, owner, borrow, allocation, cleanup, representation, ABI, thread, and transfer boundary' : storageTypescriptEvidence ? 'stakeholder, unknown schema, file, object version, authorization, byte, time, promise, stream, cache, cost, abort, cleanup, and recovery boundary' : storageGoEvidence ? 'stakeholder, file, object version, authorization, byte, time, concurrency, cache, cost, cleanup, and recovery boundary' : httpEvidence ? 'method, authority, body, byte, time, and credential boundary' : family === 'docker' ? 'daemon authority, immutable identity, process, storage, network, secret, and cleanup boundary' : family === 'kubernetes' ? 'context, namespace, API identity, desired state, observed status, controller, policy, and failure-domain boundary' : family === 'cicd' ? 'event, revision, actor, permission, runner, dependency, artifact, environment, deployment, and recovery boundary' : 'types, ownership, and stop path'}, ${concept} precondition, or invariant that must hold.`,
              `At ${contextualTitle}, trace this concrete input and predict ${aiAgentPythonEvidence ? 'model request, interaction step, schema validation, tool choice, authorization, approval, result, state transition, memory, evaluation, trace, rejection, stop, rollback, recovery, and controlled-provider evidence' : webScraperPythonEvidence ? 'authorization, URL admission, robots, fetch, redirect, decode, parse, extract, provenance, schedule, report, rejection, stop, rollback, recovery, and native evidence' : mazePythonEvidence ? 'coordinate, wall, topology, frontier, route, callback, transition, render, accessibility, failure, rollback, recovery, and native evidence' : staticSitePythonEvidence ? 'admission, decoding, tokenization, parsing, transformation, routing, rendering, validation, publication, failure, rollback, and recovery evidence' : asteroidsPythonEvidence ? 'event, intent, simulation, collision, cleanup, rendering, cue, accessibility, failure, pause, rollback, recovery, and desktop evidence' : bookbotPythonEvidence ? 'admission, decoding, normalization, tokenization, counting, ranking, formatting, stdout, stderr, status, test, package, failure, and recovery evidence' : ragPythonEvidence ? 'ingestion, normalization, retrieval, filter, fusion, reranking, context, claim, citation, abstention, latency, cost, failure, and recovery evidence' : supportEvidence ? 'user impact, safety and authority, baseline, reproduction, timeline, hypothesis, bounded test, observation, rejection, repair, rollback, original and changed-case verification, prevention, escalation, and controlled transfer evidence' : careerEvidence ? 'targeting, source, evidence, contribution, access, privacy, consent, process, decision, rejection, repair, follow-up, and learner-controlled transfer evidence' : family === 'sql' ? 'rows or changes' : family === 'c' ? 'size arithmetic, pointer range, lifetime transition, allocation result, cleanup order, printed output, and native evidence still missing' : storageEvidence ? 'runtime validation, authorization, custody, integrity, range, stream, cache, retry, cost, cleanup, and recovery evidence' : httpEvidence ? 'resolution, redirect, status, representation, retry, and cleanup evidence' : family === 'docker' ? 'build, image, container, mount, network, Compose, policy, and teardown evidence' : family === 'kubernetes' ? 'admission, defaulting, scheduling, reconciliation, status, traffic, storage, policy, disruption, and cleanup evidence' : family === 'cicd' ? 'evaluation, shell, job graph, cache, artifact, trust, deployment, signal, rollback, and cleanup evidence' : 'values, errors, blocking, and output'} before reviewing it: ${changedCase}`,
              `For ${contextualTitle}, challenge the documented misconception with ${aiAgentPythonEvidence ? 'changed-model, API, schema, tool, authority, result, state, loop, approval, context, memory, retry, injection, evaluation, telemetry, rate, cost, framework, sandbox, deployment, recovery, and controlled provider-transfer' : webScraperPythonEvidence ? 'changed-authorization, URL, robots rule, response, encoding, markup, selector, frontier, timing, session, browser, privacy, security, export, failure, recovery, and controlled owner transfer' : mazePythonEvidence ? 'changed-grid, seed, wall, generator, solver, weight, heuristic, callback, state, focus, scale, save, package, recovery, and controlled native-transfer' : staticSitePythonEvidence ? 'changed-source, delimiter, Unicode, nesting, route, URL, asset, viewport, cache, security, deployment, recovery, and controlled production-transfer' : asteroidsPythonEvidence ? 'changed-frame-rate, stall, seam, input, device, collision, cue, accessibility, save, package, failure, recovery, and controlled desktop-transfer' : bookbotPythonEvidence ? 'changed-file, changed-encoding, Unicode, token, ranking, stream, CLI, test, package, security, accessibility, failure, recovery, and controlled native-transfer' : ragPythonEvidence ? 'changed-query, changed-corpus, relevance, retrieval, grounding, citation, adversarial, accessibility, failure, recovery, and controlled native or production-transfer' : supportEvidence ? 'changed-user, device, version, hazard, baseline, symptom, timeline, access need, hypothesis, test result, repair, restart, recurrence, escalation, and controlled equipment-transfer' : careerEvidence ? 'changed-candidate, target-role, source-date, jurisdiction, audience, access, privacy, consent, process-state, interview, offer, rejection, repair, and learner-controlled transfer' : family === 'sql' ? 'result, constraint, or plan' : family === 'c' ? 'changed-size, failure-injection, printed invariant, compiler, sanitizer, analyzer, fuzz, ABI, concurrency, or production-transfer' : storageEvidence ? 'runtime, file, object, policy, transfer, integrity, cache, fault, cost, restore, and controlled AWS transfer' : httpEvidence ? 'request, response, fault, policy, and transfer' : family === 'docker' ? 'manifest, inspect, lifecycle, failure, repair, and transfer' : family === 'kubernetes' ? 'object, condition, event, policy, failure, repair, rollback, and transfer' : family === 'cicd' ? 'workflow, run, artifact, policy, fault, repair, rollback, and transfer' : 'runtime, failure, race, or toolchain'} evidence: ${competency?.misconceptions[0] ?? 'find the first violated contract'}`,
            ]
          : [
              `Name the ${concept} precondition or invariant that the ${activityKind} case must preserve.`,
              `Trace this concrete case before choosing: ${changedCase}`,
              `Use the documented misconception as a counterexample target: ${competency?.misconceptions[0] ?? 'find the first violated contract'}`,
            ]),
      xp: extra.xp ?? 10,
      ...(extra.stimulus ? { stimulus: extra.stimulus } : {}),
      ...(extra.targetFile ? { targetFile: extra.targetFile } : {}),
      ...(extra.options ? { options: extra.options } : {}),
    };
    steps.push(step);
    return step;
  }

  function addChoice(id, title, interaction, competencyId, prompt, correct, wrong, extra = {}) {
    const competency = competencyById.get(competencyId);
    const changedCase = domainCase(family, moduleId, seed + steps.length, activityKind, competency);
    const correctId = `${id}-sound`;
    const options = [
      { id: correctId, text: correct },
      {
        id: `${id}-misread`,
        text: usesExecutableEvidence
          ? `${wrong ?? competency.misconceptions[0]} That claim fails the evidence boundary for ${humanize(competencyId)}.`
          : (wrong ?? competency.misconceptions[0]),
      },
      {
        id: `${id}-overreach`,
        text: crawlerGoEvidence
          ? `For ${title.toLowerCase()}, crawl one convenient page, omit owner permission, revision, URL and robots policy, body and parser limits, record and graph provenance, frontier and goroutine ownership, Colly differences, changed fixtures, privacy, accessibility, recovery, and controlled native transfer, then accept plausible rows as Go crawler proof.`
          : crawlerTypescriptEvidence
            ? `For ${title.toLowerCase()}, fetch one convenient page, omit owner authorization, source and emitted revision, URL and robots policy, runtime admission, stream and Promise ownership, Cheerio and browser differences, accessibility states, changed fixtures, recovery, and controlled Node transfer, then accept plausible objects as TypeScript crawler proof.`
            : feedGoEvidence
              ? `For ${title.toLowerCase()}, import one convenient trusted RSS feed, omit reader and publisher outcomes, revision, discovery and SSRF scope, Atom and namespace cases, XML and HTTP budgets, PostgreSQL constraints and transaction, schedule, lease, goroutine cleanup, tenant, accessibility, recovery, and controlled native transfer, then accept plausible rows as feed-service proof.`
              : feedTypescriptEvidence
                ? `For ${title.toLowerCase()}, cast one convenient XML object as a feed, omit reader and publisher outcomes, source and emitted revision, discovery and SSRF scope, Atom and namespace cases, entity and dangerous-key limits, unknown runtime validation, Fetch stream and AbortSignal ownership, PostgreSQL client, Promise settlement, tenant, accessibility, recovery, and controlled Node transfer, then accept plausible objects as feed-service proof.`
                : aiAgentPythonEvidence
                  ? `For ${title.toLowerCase()}, run one convenient fluent model response, omit stakeholder risk, revision, model and API identity, interaction and call correlation, tool schema and authority, state and resource budgets, approval, changed fixtures, injection, privacy, accessibility, evaluation, recovery, and controlled provider transfer, then accept plausible text as agent proof.`
                  : webScraperPythonEvidence
                    ? `For ${title.toLowerCase()}, crawl one convenient page, omit owner authorization, revision, URL and robots policy, response budgets, parser and selector limits, provenance, frontier and concurrency evidence, changed fixtures, privacy, security, accessibility, stop, recovery, and controlled native transfer, then accept plausible rows as crawler proof.`
                    : mazePythonEvidence
                      ? `For ${title.toLowerCase()}, solve one convenient seeded maze, omit revision, coordinate and wall invariants, topology oracle, frontier trace, changed algorithm or heuristic, callback ownership, keyboard and structured-text access, native Tk evidence, failure, recovery, and package transfer, then accept a screenshot as maze proof.`
                      : staticSitePythonEvidence
                        ? `For ${title.toLowerCase()}, render one trusted short page at the root, omit content authority, source spans, parser limits, route base, URL and asset reconciliation, contextual encoding, accessibility, clean-build comparison, deployment, rollback, recovery, and production transfer, then accept plausible HTML as publication proof.`
                        : asteroidsPythonEvidence
                          ? `For ${title.toLowerCase()}, run one convenient high-frame-rate happy path, omit revision, seed, input and time trace, units, seams, device changes, entity reconciliation, multichannel cues, accessibility settings, failures, recovery, and desktop transfer, then accept a playable animation as Asteroids proof.`
                          : bookbotPythonEvidence
                            ? `For ${title.toLowerCase()}, run one convenient ASCII text, omit corpus authority, repository and policy identity, bytes, encoding, Unicode, offsets, reconciliation, ties, stderr, status, changed cases, tests, recovery, and native transfer, then accept a plausible report as Bookbot proof.`
                            : ragPythonEvidence
                              ? `For ${title.toLowerCase()}, run one convenient ${humanize(competencyId)} query, omit corpus and version identity, relevance judgments, tenant policy, changed documents, abstention, citations, failure and recovery, then accept a plausible answer as RAG proof.`
                              : httpEvidence
                                ? `For ${title.toLowerCase()}, run one convenient ${humanize(competencyId)} happy path, omit method, authority, credential, byte, time, redirect, retry, and cleanup boundaries, then accept plausible output.`
                                : supportEvidence
                                  ? `For ${title.toLowerCase()}, apply one familiar repair, omit user impact, authorization, safety, asset and version identity, baseline, recent change, competing cause, prediction, observation, rollback, changed-case verification, accessibility, privacy, escalation, and controlled transfer, then accept a missing symptom as support proof.`
                                  : family === 'algorithms'
                                    ? `Optimize from one happy-path timing, without defining input size, invariant, or an adversarial case for ${humanize(competencyId)}.`
                                    : family === 'functional'
                                      ? `Hide effects inside the transformation, mutate its input, and accept one plausible return value as proof of ${humanize(competencyId)}.`
                                      : family === 'sql'
                                        ? `Run a convenient ${humanize(competencyId)} query for ${title.toLowerCase()}, omit grain, NULL, cardinality, and dialect checks, then accept one plausible result grid.`
                                        : family === 'c'
                                          ? `For ${title.toLowerCase()}, run one convenient ${humanize(competencyId)} case, omit size, bounds, lifetime, owner, allocation failure, cleanup, invariant output, and native transfer gates, then call the browser result production-safe.`
                                          : cryptographyGoEvidence
                                            ? `For ${title.toLowerCase()}, run one deterministic ${humanize(competencyId)} model, omit canonical bytes, asset, adversary, key and nonce ownership, tamper rejection, secret-safe failure, and native transfer gates, then call the browser result cryptographically secure.`
                                            : family === 'go'
                                              ? `For ${title.toLowerCase()}, run one convenient ${humanize(competencyId)} happy path, omit ownership, error, changed input, goroutine stop, and full-toolchain checks, then accept plausible output.`
                                              : family === 'docker'
                                                ? `For ${title.toLowerCase()}, copy one familiar Docker command, omit daemon authority, immutable identity, failure, cleanup, and disposable-environment transfer checks, then accept a successful build as production proof.`
                                                : family === 'kubernetes'
                                                  ? `For ${title.toLowerCase()}, copy one familiar manifest or kubectl command, omit context, API discovery, desired-versus-observed status, failure, rollback, and disposable-cluster transfer checks, then accept an Applied response as production proof.`
                                                  : family === 'cicd'
                                                    ? `For ${title.toLowerCase()}, copy one familiar workflow, omit event and revision identity, permissions, runner, immutable artifact, failure, rollback, and disposable delivery-environment transfer checks, then accept a green run as production proof.`
                                                    : 'Apply the visible technique immediately, omit assumptions, and treat one successful output as complete proof.',
      },
    ];
    const rotation = (seed + steps.length) % options.length;
    const rotated = [...options.slice(rotation), ...options.slice(0, rotation)];
    const defaultContent =
      interaction === 'read'
        ? contentBlocks({
            competency,
            moduleProfile,
            source,
            family,
            moduleId,
            seed,
          })
        : [
            {
              type: 'paragraph',
              text: changedCase,
            },
            {
              type: 'callout',
              tone: interaction === 'debug' ? 'warning' : 'question',
              title:
                interaction === 'debug'
                  ? 'Fault-isolation decision'
                  : interaction === 'inspect'
                    ? 'Evidence inspection'
                    : 'Commit before feedback',
              text:
                interaction === 'debug'
                  ? `Select evidence that identifies a cause, not a patch that only hides the ${humanize(competencyId)} symptom.`
                  : interaction === 'inspect'
                    ? `Use the supplied trace to distinguish an observed ${humanize(competencyId)} result from an unsupported claim.`
                    : `Choose from the stated data before opening the worked model. Record which ${humanize(competencyId)} condition decided your prediction.`,
            },
            {
              type: 'evidence',
              label: 'Authority to consult after committing',
              value: `${source.title} — ${source.scope}`,
            },
          ];
    const step = baseStep(
      id,
      title,
      interaction,
      `${activityKind} case — ${changedCase}\n\n${prompt}`,
      extra.why ??
        `The decision supplies observable evidence for ${competency.statement.toLowerCase()}`,
      [competencyId],
      {
        ...extra,
        options: rotated,
        stimulus:
          extra.stimulus ??
          (interaction === 'debug' || interaction === 'inspect'
            ? {
                kind:
                  family === 'network' || family === 'support'
                    ? 'network-map'
                    : family === 'math'
                      ? 'terminal'
                      : 'code-diff',
                title: `${humanize(competencyId)} ${interaction === 'debug' ? 'failure' : 'case'} evidence`,
                caption:
                  interaction === 'debug'
                    ? 'A plausible visible result conflicts with the governing contract and requires a cause-level repair.'
                    : 'Inspect the observation, governing requirement, and mastery evidence before deciding.',
                lines: [
                  {
                    id: `${id}-observed`,
                    label: 'observed',
                    text: competency.misconceptions[0],
                    tone: 'problem',
                  },
                  {
                    id: `${id}-required`,
                    label: 'required',
                    text: competency.masteryEvidence[0],
                    tone: 'focus',
                  },
                ],
              }
            : undefined),
        content: extra.content ?? defaultContent,
      }
    );
    const checkId = `${id}-check`;
    checks.push({
      id: checkId,
      type: 'choice-equals',
      description: `The decision applies ${humanize(competencyId)} to the changed stakeholder case.`,
      failureMessage: `Recheck the conditions and reject the documented misconception about ${humanize(competencyId)}.`,
      hidden: Boolean(extra.hidden),
      competencyIds: [competencyId],
      expectedOptionId: correctId,
    });
    step.checkIds.push(checkId);
  }

  function addOrder(id, title, competencyId, extra = {}) {
    const options = domainOrderOptions(
      family,
      id,
      usesExecutableEvidence ? `${activityKind} ${humanize(competencyId)}` : undefined,
      httpTrack
    );
    const changedCase = domainCase(
      family,
      moduleId,
      seed + steps.length,
      activityKind,
      competencyById.get(competencyId)
    );
    const step = baseStep(
      id,
      title,
      'arrange',
      extra.instruction ??
        `Order the ${humanize(competencyId)} ${family === 'algorithms' ? 'correctness-and-cost proof' : family === 'functional' ? 'value-and-effect pipeline' : httpTrack?.startsWith('Feed aggregation') ? `${httpTrack} source-to-reader-and-recovery evidence cycle` : httpTrack?.startsWith('Safe AI agents') ? `${httpTrack} task-to-recovery evidence cycle` : httpTrack?.startsWith('Authorized crawling') ? `${httpTrack} authorization-to-recovery evidence cycle` : httpTrack?.startsWith('Maze') ? `${httpTrack} player-to-native-release evidence cycle` : httpTrack?.startsWith('Static-site') ? `${httpTrack} source-to-publication evidence cycle` : httpTrack?.startsWith('Asteroids') ? `${httpTrack} player-input-to-release evidence cycle` : httpTrack?.startsWith('Bookbot') ? `${httpTrack} corpus-to-release evidence cycle` : httpTrack?.startsWith('RAG') ? `${httpTrack} source-to-claim evidence cycle` : httpTrack?.startsWith('Cryptography') ? `${httpTrack} threat-to-evidence cycle` : httpTrack?.startsWith('S3') ? `${httpTrack} storage-delivery evidence cycle` : httpTrack?.startsWith('RabbitMQ') ? `${httpTrack} messaging evidence cycle` : httpTrack ? `${httpTrack} HTTP evidence cycle` : family === 'docker' ? 'container delivery evidence cycle' : family === 'kubernetes' ? 'orchestration evidence cycle' : family === 'cicd' ? 'delivery-system evidence cycle' : 'evidence cycle'} for this ${activityKind} task before implementing it.`,
      `Correct order keeps ${humanize(competencyId)} assumptions visible before execution and verifies its result against a boundary case afterward.`,
      [competencyId],
      {
        ...extra,
        options,
        content: extra.content ?? [
          { type: 'paragraph', text: changedCase },
          {
            type: 'callout',
            tone: 'question',
            title: 'Ordering constraint',
            text: `Order work so ${humanize(competencyId)} has a declared contract before execution and a boundary or counterexample after it.`,
          },
        ],
      }
    );
    const checkId = `${id}-check`;
    checks.push({
      id: checkId,
      type: 'order-equals',
      description: 'The evidence cycle runs from problem framing through changed-case validation.',
      failureMessage: 'Frame the decision before modeling, and validate after obtaining a result.',
      hidden: Boolean(extra.hidden),
      competencyIds: [competencyId],
      expectedOptionIds: options.map((option) => option.id),
    });
    step.checkIds.push(checkId);
  }

  function addInspect(id, title, competencyId, extra = {}) {
    const competency = competencyById.get(competencyId);
    addChoice(
      id,
      title,
      'inspect',
      competencyId,
      `Inspect the ${humanize(competencyId)} trace for this ${activityKind} case. Which record connects a precondition, observed state change, and boundary result?`,
      `The record names the assumption, applies ${humanize(competencyId)}, and reports a changed-case check tied to the stakeholder decision.`,
      'The record says the result looks right but supplies no quantity, trace, condition, or counterexample.',
      {
        ...extra,
        stimulus: {
          kind: family === 'math' ? 'terminal' : 'code-diff',
          title: `${humanize(competencyId)} case record`,
          caption:
            'Three excerpts from a learner evidence packet; only one connects a claim to a reproducible check.',
          lines: [
            {
              id: `${id}-line-assumption`,
              label: 'assumption',
              text: domainCase(family, moduleId, seed + steps.length, activityKind, competency),
              tone: 'focus',
            },
            {
              id: `${id}-line-risk`,
              label: 'risk',
              text: competency.misconceptions[0],
              tone: 'problem',
            },
            {
              id: `${id}-line-evidence`,
              label: 'evidence',
              text: `${competency.masteryEvidence[0]} Artifact under review: ${moduleProfile.artifact}.`,
              tone: 'good',
            },
          ],
        },
        content: [
          {
            type: 'paragraph',
            text: `For ${humanize(competencyId)}, distinguish a claim from evidence by locating the relevant precondition, trace or invariant, and changed input result.`,
          },
        ],
      }
    );
  }

  function addReflection(id, title, competencyId, extra = {}) {
    const competency = competencyById.get(competencyId);
    const requiredTerms = unique(words(competency.statement)).slice(0, 2);
    const changedCase = domainCase(family, moduleId, seed + steps.length, activityKind, competency);
    const step = baseStep(
      id,
      title,
      'reflect',
      extra.instruction ??
        `Write the ${activityKind} evidence note for ${humanize(competencyId)}: explain the governing condition, one failure, and how this concrete case was verified — ${changedCase}`,
      'Retrieval and explanation expose gaps that recognition questions can hide.',
      [competencyId],
      {
        ...extra,
        content: [
          {
            type: 'callout',
            tone: 'question',
            title: 'Evidence defense',
            text: `Use the case, one assumption, one observable result, and one limitation. Do not copy the competency statement: ${competency.statement}`,
          },
        ],
      }
    );
    const checkId = `${id}-check`;
    checks.push({
      id: checkId,
      type: 'text-response',
      description:
        'The evidence note explains the model, failure risk, and verification in the learner’s own words.',
      failureMessage: `Add a causal explanation using ${requiredTerms.join(' and ')} plus specific case evidence.`,
      hidden: false,
      competencyIds: [competencyId],
      minimumCharacters: extra.minimumCharacters ?? 100,
      requiredTerms,
    });
    step.checkIds.push(checkId);
  }

  function addCalculation(id, title, competencyId, moduleId, extra = {}) {
    const calculation = mathCalculation(moduleId, seed + steps.length);
    const step = baseStep(
      id,
      title,
      'calculate',
      calculation.prompt,
      'A numerical result is not complete until its unit, assumptions, scale, and tolerance survive a reasonableness check.',
      [competencyId],
      {
        ...extra,
        content: [
          { type: 'paragraph', text: calculation.method },
          {
            type: 'callout',
            tone: 'question',
            title: 'Before calculating',
            text: 'Predict the sign and approximate magnitude. Enter the requested quantity with a unit, then compare it with that prediction.',
          },
        ],
        hints: [
          calculation.method,
          'Keep full working precision and round only the final reported value.',
          `The accepted result is within ${calculation.tolerance} of the exact value${calculation.units.length ? ` and includes ${calculation.units.join(' or ')}` : ''}.`,
        ],
      }
    );
    const checkId = `${id}-check`;
    checks.push({
      id: checkId,
      type: 'number-equals',
      description:
        'The calculated quantity is accurate to the stated tolerance and carries its requested unit.',
      failureMessage:
        'Recalculate from the documented model, check the scale, and include the requested unit.',
      hidden: Boolean(extra.hidden),
      competencyIds: [competencyId],
      expected: calculation.expected,
      tolerance: calculation.tolerance,
      acceptedUnits: calculation.units,
    });
    step.checkIds.push(checkId);
  }

  function addCode(id, title, competencyId, moduleId, extra = {}) {
    const target = targetFor(family, moduleId);
    const evidenceModuleId = competencyModuleById.get(competencyId) ?? moduleId;
    const contract = sourcePattern(
      target,
      competencyId,
      `${moduleId}-${id}-${seed}`,
      family,
      evidenceModuleId,
      activityKind
    );
    const step = baseStep(
      id,
      title,
      'code',
      contract.requirement,
      `Building a runnable or mechanically reviewable artifact turns ${humanize(competencyId)} into observable performance evidence.`,
      [competencyId],
      {
        ...extra,
        targetFile: target,
        content: [
          {
            type: 'code',
            language:
              target === 'python'
                ? 'python'
                : target === 'typescript'
                  ? 'typescript'
                  : target === 'javascript'
                    ? 'javascript'
                    : target === 'go'
                      ? 'go'
                      : target === 'c'
                        ? 'c'
                        : target === 'sql'
                          ? 'sql'
                          : target === 'shell'
                            ? 'bash'
                            : target === 'prompt'
                              ? 'text'
                              : 'yaml',
            code: contract.example,
            caption:
              'Shape of the required increment; replace generic language with the current stakeholder case.',
          },
          {
            type: 'callout',
            tone: 'warning',
            title: 'Evidence is more than syntax',
            text: 'The structural check is only one gate. The following changed-case decision and explanation must also hold.',
          },
        ],
      }
    );
    const markerCheck = `${id}-marker`;
    const structureCheck = `${id}-structure`;
    const structuralCheck =
      target === 'prompt'
        ? {
            type: 'prompt-contract',
            requiredCriteria: ['goal', 'context', 'boundaries', 'output', 'done'],
            afterMarker: contract.marker,
          }
        : {
            type: 'source-matches',
            file: target,
            pattern: contract.pattern,
            flags: 'i',
          };
    checks.push(
      {
        id: markerCheck,
        type: 'source-includes',
        description: `The cumulative ${target} portfolio contains this competency’s named evidence increment.`,
        failureMessage: `Add the exact evidence marker ${contract.marker}.`,
        hidden: false,
        competencyIds: [competencyId],
        file: target,
        expected: contract.marker,
      },
      {
        id: structureCheck,
        ...structuralCheck,
        description:
          'The increment includes the required executable or reviewable evidence structure.',
        failureMessage:
          'Complete the full function, prompt contract, or gate record shown in the brief.',
        hidden: true,
        competencyIds: [competencyId],
      }
    );
    step.checkIds.push(markerCheck, structureCheck);
  }

  return {
    steps,
    checks,
    addChoice,
    addOrder,
    addInspect,
    addReflection,
    addCalculation,
    addCode,
  };
}

function buildTheory(builder, context) {
  const { primary, moduleId, variant, family } = context;
  const concept = humanize(primary.id);
  const actions = {
    predict: () =>
      builder.addChoice(
        'commit-prediction',
        `Predict ${concept}`,
        'predict',
        primary.id,
        `Before reading, predict which action preserves the ${concept} contract for the supplied data.`,
        `${primary.statement} Apply it to the concrete input and state the observable result.`,
        primary.misconceptions[0]
      ),
    brief: () =>
      builder.addChoice(
        'test-concept',
        `Bound ${concept}`,
        'read',
        primary.id,
        `After tracing the worked code, choose the ${concept} application whose preconditions and limits still match the supplied case.`,
        `Use ${concept} after naming its inputs, invariant or ownership condition, observable evidence, and failure boundary.`,
        primary.misconceptions[0]
      ),
    inspect: () => builder.addInspect('inspect-case', `Inspect ${concept} evidence`, primary.id),
    order: () => builder.addOrder('rebuild-process', `Sequence ${concept} evidence`, primary.id),
    apply: () =>
      family === 'math'
        ? builder.addCalculation(
            'solve-changed-case',
            `Calculate ${concept} evidence`,
            primary.id,
            moduleId
          )
        : builder.addCode('build-evidence', `Build ${concept} evidence`, primary.id, moduleId),
    debug: () =>
      builder.addChoice(
        'repair-misconception',
        `Repair the ${concept} defect`,
        'debug',
        primary.id,
        `A teammate acts on this belief: “${primary.misconceptions[0]}” Which repair addresses the cause?`,
        `Reconstruct the conditions for ${humanize(primary.id)}, gather a counterexample, repair the artifact, and add a regression case.`,
        'Keep the artifact unchanged and rewrite the explanation so the current output appears intentional.'
      ),
    reflect: () => builder.addReflection('defend-model', `Defend the ${concept} model`, primary.id),
  };
  const sequences = [
    ['predict', 'brief', 'inspect', 'order', 'apply', 'debug', 'reflect'],
    ['predict', 'brief', 'order', 'inspect', 'debug', 'apply', 'reflect'],
    ['predict', 'brief', 'inspect', 'apply', 'debug', 'order', 'reflect'],
    ['predict', 'brief', 'order', 'apply', 'inspect', 'debug', 'reflect'],
  ];
  sequences[variant % sequences.length].forEach((action) => {
    actions[action]();
  });
}

function buildPractice(builder, context) {
  const { kind, competencies, moduleId, moduleProfile, family, variant } = context;
  const primary = competencies[0];
  const last = competencies.at(-1);
  const addScenario = (competency, index, interaction = index % 2 ? 'predict' : 'answer') => {
    builder.addChoice(
      `scenario-${index + 1}`,
      `${humanize(competency.id)} · changed case`,
      interaction,
      competency.id,
      `Which action demonstrates ${humanize(competency.id)} without dropping earlier contracts?`,
      `${competency.statement} Apply it to the stated input and retain a reproducible trace for ${moduleProfile.artifact}.`,
      competency.misconceptions[0],
      { hidden: kind === 'quiz' || kind === 'exam' }
    );
  };

  if (kind === 'exam') {
    builder.addOrder('exam-plan', 'Plan the cumulative evidence run', primary.id, { hidden: true });
    competencies.forEach((competency, index) => {
      addScenario(
        competency,
        index,
        index % 3 === 0 ? 'inspect' : index % 2 ? 'predict' : 'answer'
      );
    });
    builder.addInspect('exam-forensics', 'Audit a conflicting evidence packet', last.id, {
      hidden: true,
    });
    if (family === 'math')
      builder.addCalculation('exam-performance', 'Solve the performance case', last.id, moduleId, {
        hidden: true,
      });
    else
      builder.addCode('exam-performance', 'Build the performance evidence', last.id, moduleId, {
        hidden: true,
      });
    builder.addChoice(
      'exam-regression',
      'Choose the regression defense',
      'debug',
      last.id,
      'A polished result passes one familiar case but fails a boundary case. What is the defensible release decision?',
      'Stop release, localize the cause, repair the smallest responsible layer, and rerun the full changed-case set.',
      'Ignore the boundary result because the primary demonstration passed.',
      { hidden: true }
    );
    builder.addReflection('exam-defense', 'Submit the certification defense', last.id, {
      minimumCharacters: 160,
    });
    return;
  }

  if (kind === 'debug') {
    const addFaults = () => {
      competencies.forEach((competency, index) => {
        builder.addChoice(
          `fault-${index + 1}`,
          `${humanize(competency.id)} · fault isolation`,
          index % 2 ? 'predict' : 'debug',
          competency.id,
          `Which observation would disprove this suspected cause: “${competency.misconceptions[0]}”?`,
          `A minimal trace that preserves the preconditions, contradicts the misconception, and satisfies ${humanize(competency.id)}.`,
          'Another successful run of the same happy-path example.'
        );
      });
    };
    const addRepair = () =>
      family === 'math'
        ? builder.addCalculation(
            'repair-result',
            'Recalculate the repaired case',
            last.id,
            moduleId
          )
        : builder.addCode('repair-artifact', 'Implement the cause-level repair', last.id, moduleId);
    if (variant === 1)
      builder.addOrder('regression-sequence', 'Order the regression proof', last.id);
    builder.addInspect('incident-record', 'Inspect the failure record', primary.id);
    if (variant === 2) addRepair();
    addFaults();
    if (variant === 3)
      builder.addOrder('regression-sequence', 'Order the regression proof', last.id);
    if (variant !== 2) addRepair();
    if (variant === 0 || variant === 2)
      builder.addOrder('regression-sequence', 'Order the regression proof', last.id);
    builder.addReflection('incident-report', 'Publish the incident record', last.id, {
      minimumCharacters: 130,
    });
    return;
  }

  if (kind === 'review') {
    if (variant === 1)
      builder.addOrder('retrieval-order', 'Retrieve the complete evidence cycle', primary.id);
    if (variant === 2)
      builder.addInspect('mixed-evidence', 'Separate evidence from confidence', last.id);
    competencies.forEach((competency, index) => {
      addScenario(competency, index, index % 3 === 0 ? 'predict' : 'answer');
    });
    if (variant !== 1)
      builder.addOrder('retrieval-order', 'Retrieve the complete evidence cycle', primary.id);
    if (variant !== 2)
      builder.addInspect('mixed-evidence', 'Separate evidence from confidence', last.id);
    builder.addReflection('retrieval-note', 'Record what required effort', last.id);
    return;
  }

  if (kind === 'quiz') {
    const addPerformance = () =>
      family === 'math'
        ? builder.addCalculation(
            'quiz-calculation',
            'Calculate the unfamiliar quantity',
            last.id,
            moduleId,
            { hidden: true }
          )
        : builder.addChoice(
            'quiz-failure',
            'Diagnose the hidden failure',
            'debug',
            last.id,
            'The visible result looks correct, but its invariant or value contract is unverified. What must happen next?',
            `Run the boundary case, inspect the ${family === 'algorithms' ? 'state invariant and operation count' : family === 'functional' ? 'input snapshot, returned value, and effect boundary' : 'actual mechanism'}, then accept or repair the claim.`,
            'Accept the result because visible output is the highest authority.',
            { hidden: true }
          );
    if (variant === 1)
      builder.addOrder('quiz-process', 'Reconstruct the defensible process', primary.id, {
        hidden: true,
      });
    if (variant === 3) addPerformance();
    competencies.forEach((competency, index) => {
      addScenario(competency, index, index % 2 ? 'predict' : 'inspect');
    });
    if (variant === 2)
      builder.addOrder('quiz-process', 'Reconstruct the defensible process', primary.id, {
        hidden: true,
      });
    if (variant !== 3) addPerformance();
    if (variant === 0 || variant === 3)
      builder.addOrder('quiz-process', 'Reconstruct the defensible process', primary.id, {
        hidden: true,
      });
    builder.addReflection('quiz-defense', 'Defend one difficult decision', last.id);
    return;
  }

  builder.addChoice(
    'mission-brief',
    'Commit to the mission model',
    'predict',
    primary.id,
    'What must be established before implementation?',
    `State the ${humanize(primary.id)} preconditions, preserve earlier contracts, and name the trace or changed-input result that will decide success.`,
    primary.misconceptions[0]
  );
  if (variant === 0) builder.addOrder('mission-plan', 'Plan the evidence sequence', primary.id);
  if (variant === 1)
    builder.addInspect('mission-audit', 'Audit the initial evidence packet', last.id);
  competencies.forEach((competency, index) => {
    addScenario(competency, index, index % 2 ? 'inspect' : 'answer');
  });
  if (variant === 2) builder.addOrder('mission-plan', 'Plan the evidence sequence', primary.id);
  if (variant === 3)
    builder.addInspect('mission-audit', 'Audit the proposed evidence packet', last.id);
  if (family === 'math') {
    builder.addCalculation('model-result', 'Produce a checked model result', last.id, moduleId, {
      hidden: kind === 'lab' || kind === 'project',
    });
    builder.addCode('reproducible-model', 'Encode a reproducible check', last.id, moduleId, {
      hidden: kind === 'lab' || kind === 'project',
    });
  } else {
    builder.addCode('artifact-build', 'Extend the cumulative artifact', last.id, moduleId, {
      hidden: kind === 'lab' || kind === 'project',
    });
  }
  builder.addChoice(
    'acceptance-test',
    'Test an acceptance boundary',
    'debug',
    last.id,
    'One precondition fails while output still looks plausible. What is the correct response?',
    `Reject the unsupported conclusion, name the violated ${humanize(last.id)} condition, repair the responsible layer, and rerun the boundary trace.`,
    'Keep the plausible output and hide the assumption to avoid confusing the stakeholder.',
    { hidden: kind === 'lab' || kind === 'project' }
  );
  builder.addReflection(
    'mission-defense',
    kind === 'project' ? 'Defend the stakeholder delivery' : 'Defend the transferred model',
    last.id,
    { minimumCharacters: kind === 'project' ? 160 : 120 }
  );
}

function activityDifficulty(kind) {
  return {
    theory: 'foundation',
    workshop: 'practice',
    debug: 'challenge',
    lab: 'challenge',
    review: 'practice',
    quiz: 'challenge',
    project: 'mastery',
    exam: 'mastery',
  }[kind];
}

function researchSourceFor(config, family, moduleId, activityIndex) {
  const byTitle = (pattern) => config.sources.find((source) => pattern.test(source.title));
  if (family === 'support') {
    if (/safety-hazards|power-workstations/.test(moduleId))
      return byTitle(/OSHA Computer Workstations|EPA Electronics/i) ?? config.sources[0];
    if (/cables-connectors/.test(moduleId))
      return byTitle(/USB-IF Document Library|Core 1/i) ?? config.sources[0];
    if (/boards-cpu-firmware|memory-storage-raid/.test(moduleId))
      return byTitle(/PCI Express|Core 1/i) ?? config.sources[0];
    if (/printer|mobile-hardware|mobile-accessories/.test(moduleId))
      return byTitle(/Core 1 220-1201/i) ?? config.sources[0];
    if (/mobile-management|linux-chromeos-android/.test(moduleId))
      return byTitle(/Android Enterprise|Core 2/i) ?? config.sources[0];
    if (/transport-services|ip-config-services/.test(moduleId))
      return byTitle(/IANA Service|Core 1/i) ?? config.sources[0];
    if (/wireless-radio/.test(moduleId))
      return byTitle(/IEEE 802\.11|Core 1/i) ?? config.sources[0];
    if (/network-media-devices|soho-design|network-troubleshooting/.test(moduleId))
      return byTitle(/Core 1 220-1201|Core 2 220-1202/i) ?? config.sources[0];
    if (/virtualization/.test(moduleId))
      return byTitle(/Full Virtualization/i) ?? config.sources[0];
    if (/cloud-services/.test(moduleId))
      return byTitle(/Definition of Cloud/i) ?? config.sources[0];
    if (/windows-editions-lifecycle/.test(moduleId))
      return byTitle(/Windows 10 End|Windows 11 Home/i) ?? config.sources[0];
    if (/windows-tools-settings|windows-cli-network|os-deployment/.test(moduleId))
      return byTitle(/Windows Commands|Windows 11 Requirements|Core 2/i) ?? config.sources[0];
    if (/windows-security|endpoint-hardening/.test(moduleId))
      return byTitle(/Windows Security Documentation/i) ?? config.sources[0];
    if (/macos-ios/.test(moduleId)) return byTitle(/Apple Platform Security/i) ?? config.sources[0];
    if (/malware-sanitization-ir/.test(moduleId))
      return byTitle(/Media Sanitization|Incident Response/i) ?? config.sources[0];
    if (/threats-malware|software-security-triage/.test(moduleId))
      return byTitle(/Incident Response|Core 2/i) ?? config.sources[0];
    if (/professional-pbq-defense/.test(moduleId))
      return (
        byTitle(/Web Content Accessibility|ACM Code|CompTIA A\+ Certification/i) ??
        config.sources[0]
      );
    if (/tickets-assets-knowledge|change-backup-operations|apps-remote-scripting-ai/.test(moduleId))
      return byTitle(/Core 2 220-1202|ACM Code|Web Content Accessibility/i) ?? config.sources[0];
    return (
      byTitle(/CompTIA A\+ Core [12]/i) ?? config.sources[activityIndex % config.sources.length]
    );
  }
  if (moduleId.startsWith('crawler-go-') || moduleId.startsWith('crawler-ts-')) {
    if (
      /outcomes|owner-duty|authorization-charter|session-security|authenticated-privacy/.test(
        moduleId
      )
    )
      return byTitle(/Privacy Framework|Robots Exclusion|CS2023/i) ?? config.sources[0];
    if (/toolchain|runtime-emission|supply-chain/.test(moduleId))
      return (
        byTitle(/Go 1\.26|Node\.js 24|TypeScript Documentation|NIST Secure/i) ?? config.sources[0]
      );
    if (/packages-ownership|architecture-async|worker-pool|bounded-promise/.test(moduleId))
      return byTitle(/Go 1\.26|Node\.js 24|p-limit/i) ?? config.sources[0];
    if (/scope|url-space-traps/.test(moduleId))
      return byTitle(/Robots Exclusion|WHATWG URL|OWASP SSRF/i) ?? config.sources[0];
    if (/neturl|whatwg-url/.test(moduleId))
      return byTitle(/WHATWG URL|Go net\/url/i) ?? config.sources[0];
    if (/robots-rfc9309/.test(moduleId)) return byTitle(/Robots Exclusion/i) ?? config.sources[0];
    if (/sitemap/.test(moduleId)) return byTitle(/Sitemaps XML/i) ?? config.sources[0];
    if (/http-transport|fetch-stream|representation|bytes-media/.test(moduleId))
      return byTitle(/Go net\/http|Node\.js 24|HTTP Semantics/i) ?? config.sources[0];
    if (/ssrf|dial-ssrf|redirect-dns/.test(moduleId))
      return byTitle(/OWASP SSRF/i) ?? config.sources[0];
    if (/html-tokenizer|cheerio-html/.test(moduleId))
      return byTitle(/Go HTML Package|Cheerio Documentation|WHATWG HTML/i) ?? config.sources[0];
    if (/selector|record-provenance/.test(moduleId))
      return byTitle(/goquery|Cheerio Documentation|CS2023/i) ?? config.sources[0];
    if (/link-graph|link-semantics/.test(moduleId))
      return byTitle(/WHATWG HTML|WHATWG URL/i) ?? config.sources[0];
    if (/frontier|origin-politeness|origin-fair|checkpoint|dedup/.test(moduleId))
      return byTitle(/Go 1\.26|Node\.js 24|HTTP Caching|CS2023/i) ?? config.sources[0];
    if (/colly/.test(moduleId)) return byTitle(/Colly Documentation/i) ?? config.sources[0];
    if (/metadata|search-metadata/.test(moduleId))
      return byTitle(/WHATWG HTML|Robots Exclusion/i) ?? config.sources[0];
    if (/accessibility|axe-browser/.test(moduleId))
      return byTitle(/WCAG|Playwright Accessibility/i) ?? config.sources[0];
    if (/resource|performance/.test(moduleId))
      return byTitle(/HTTP Caching|WHATWG HTML/i) ?? config.sources[0];
    if (/dynamic-browser|playwright/.test(moduleId))
      return byTitle(/Playwright Documentation/i) ?? config.sources[0];
    if (/security|untrusted-content/.test(moduleId))
      return byTitle(/OWASP XSS|OWASP SSRF/i) ?? config.sources[0];
    if (/report/.test(moduleId)) return byTitle(/WCAG|Go 1\.26|Node\.js 24/i) ?? config.sources[0];
    if (/httptest|node-test/.test(moduleId))
      return byTitle(/Go 1\.26|Node\.js 24|TypeScript/i) ?? config.sources[0];
    if (/operations|recovery|release/.test(moduleId))
      return byTitle(/NIST Secure|Privacy Framework|CS2023/i) ?? config.sources[0];
    return config.sources[activityIndex % config.sources.length];
  }
  if (moduleId.startsWith('agentpy-')) {
    if (/product-risk-contract/.test(moduleId))
      return byTitle(/NIST AI RMF|ACM Code|OWASP Top 10/i) ?? config.sources[0];
    if (/repo-runtime-dependencies/.test(moduleId))
      return (
        byTitle(/Gen AI Python SDK 2\.11\.0 Release|Python Packaging|Git 2\.55/i) ??
        config.sources[0]
      );
    if (/model-api-capabilities/.test(moduleId))
      return (
        byTitle(
          /Interactions API Overview|Models and Capabilities|Gen AI Python SDK Documentation/i
        ) ?? config.sources[0]
      );
    if (/deterministic-model-port/.test(moduleId))
      return byTitle(/pytest 9\.1\.1|Gen AI Python SDK Documentation/i) ?? config.sources[0];
    if (/interaction-state-parts/.test(moduleId))
      return byTitle(/Interactions API Overview/i) ?? config.sources[0];
    if (/structured-output-validation/.test(moduleId))
      return byTitle(/Structured Outputs|Pydantic 2\.13\.4|JSON Schema/i) ?? config.sources[0];
    if (/tool-schema-design/.test(moduleId))
      return byTitle(/Function Calling|Gemini API Tools|JSON Schema/i) ?? config.sources[0];
    if (/tool-registry-dispatch/.test(moduleId))
      return byTitle(/Function Calling|Python 3\.14\.6/i) ?? config.sources[0];
    if (/tool-authorization-policy/.test(moduleId))
      return byTitle(/OWASP AI Agent Security|OWASP Top 10|ACM Code/i) ?? config.sources[0];
    if (/single-tool-turn/.test(moduleId))
      return byTitle(/Function Calling|Interactions API Overview/i) ?? config.sources[0];
    if (/bounded-control-loop/.test(moduleId))
      return (
        byTitle(/Python 3\.14 asyncio|Google Agent Development Kit Documentation/i) ??
        config.sources[0]
      );
    if (/parallel-tool-calls/.test(moduleId))
      return byTitle(/Python 3\.14 asyncio/i) ?? config.sources[0];
    if (/human-approval-resume/.test(moduleId))
      return (
        byTitle(/Google Agent Development Kit Documentation|OWASP AI Agent Security/i) ??
        config.sources[0]
      );
    if (/session-checkpoint-replay/.test(moduleId))
      return (
        byTitle(/Interactions API Overview|Google Agent Development Kit Documentation/i) ??
        config.sources[0]
      );
    if (/context-assembly-compaction/.test(moduleId))
      return byTitle(/Context Caching|Interactions API Overview/i) ?? config.sources[0];
    if (/memory-policy/.test(moduleId))
      return (
        byTitle(/OWASP Top 10|Google Agent Development Kit Documentation|NIST AI RMF/i) ??
        config.sources[0]
      );
    if (/errors-retries-idempotency/.test(moduleId))
      return byTitle(/Rate Limits|Python 3\.14 asyncio/i) ?? config.sources[0];
    if (/streaming-events-accessibility/.test(moduleId))
      return byTitle(/Interactions API Overview|WCAG 2\.2/i) ?? config.sources[0];
    if (/injection-output-security/.test(moduleId))
      return byTitle(/OWASP AI Agent Security|OWASP Top 10/i) ?? config.sources[0];
    if (/secrets-privacy-governance/.test(moduleId))
      return byTitle(/Data Logging and Sharing|Additional Terms|NIST AI RMF/i) ?? config.sources[0];
    if (/eval-dataset-oracles/.test(moduleId))
      return byTitle(/ADK Evaluation|NIST AI RMF/i) ?? config.sources[0];
    if (/trajectory-tool-evals/.test(moduleId))
      return byTitle(/ADK Evaluation/i) ?? config.sources[0];
    if (/rubrics-judge-calibration/.test(moduleId))
      return byTitle(/ADK Evaluation|NIST AI RMF/i) ?? config.sources[0];
    if (/observability-token-cost/.test(moduleId))
      return byTitle(/OpenTelemetry Python SDK/i) ?? config.sources[0];
    if (/performance-concurrency-cache/.test(moduleId))
      return byTitle(/Rate Limits|Context Caching/i) ?? config.sources[0];
    if (/adk-framework-translation/.test(moduleId))
      return (
        byTitle(/Agent Development Kit 2\.4\.0 Release|Agent Development Kit Documentation/i) ??
        config.sources[0]
      );
    if (/multi-agent-delegation/.test(moduleId))
      return byTitle(/Agent Development Kit Documentation|OWASP Top 10/i) ?? config.sources[0];
    if (/code-computer-use-sandbox/.test(moduleId))
      return byTitle(/OWASP AI Agent Security|OWASP Top 10/i) ?? config.sources[0];
    if (/package-api-deployment/.test(moduleId))
      return byTitle(/Python Packaging|Vertex AI Agent Engine/i) ?? config.sources[0];
    if (/release-recovery-defense/.test(moduleId))
      return (
        byTitle(
          /Gen AI Python SDK 2\.11\.0 Release|Agent Development Kit 2\.4\.0 Release|NIST AI RMF/i
        ) ?? config.sources[0]
      );
  }
  if (moduleId.startsWith('scraper-')) {
    if (/outcomes-authorization-evidence/.test(moduleId))
      return byTitle(/ACM Code|NIST Privacy|CS2023/i) ?? config.sources[0];
    if (/repo-runtime-dependencies/.test(moduleId))
      return byTitle(/Python 3.14.6|Python Packaging|Git 2.55/i) ?? config.sources[0];
    if (/crawl-scope-policy/.test(moduleId))
      return byTitle(/ACM Code|RFC 9309|OWASP SSRF/i) ?? config.sources[0];
    if (/url-identity-canonicalization/.test(moduleId))
      return byTitle(/^WHATWG URL/i) ?? config.sources[0];
    if (/robots-sitemaps/.test(moduleId)) return byTitle(/^RFC 9309/i) ?? config.sources[0];
    if (/http-fetch-contract/.test(moduleId))
      return byTitle(/^HTTPX 0\.28\.1/i) ?? config.sources[0];
    if (/bytes-encoding-admission/.test(moduleId))
      return byTitle(/^WHATWG HTML Living/i) ?? config.sources[0];
    if (/html-parser-models/.test(moduleId))
      return byTitle(/^Beautiful Soup/i) ?? config.sources[0];
    if (/selectors-tree-extraction/.test(moduleId))
      return byTitle(/Selectors Level 4|Beautiful Soup/i) ?? config.sources[0];
    if (/typed-records-provenance/.test(moduleId))
      return byTitle(/Python 3\.14\.6|CS2023/i) ?? config.sources[0];
    if (/link-discovery-relations/.test(moduleId))
      return byTitle(/WHATWG HTML Living|WHATWG URL/i) ?? config.sources[0];
    if (/crawl-graph-frontier|url-traps-infinite-spaces/.test(moduleId))
      return byTitle(/CS2023|WHATWG URL|Google Search Crawling/i) ?? config.sources[0];
    if (/politeness-rate-retries/.test(moduleId))
      return byTitle(/RFC 9309|HTTPX 0\.28\.1|Scrapy 2\.17/i) ?? config.sources[0];
    if (/async-structured-concurrency/.test(moduleId))
      return byTitle(/asyncio Task Groups|HTTPX 0\.28\.1/i) ?? config.sources[0];
    if (/session-auth-boundaries/.test(moduleId))
      return byTitle(/HTTPX 0\.28\.1|RFC 9110|NIST Privacy/i) ?? config.sources[0];
    if (/incremental-checkpoint-cache/.test(moduleId))
      return byTitle(/RFC 9111|Scrapy 2\.17/i) ?? config.sources[0];
    if (/content-dedup-change/.test(moduleId))
      return byTitle(/Python 3\.14\.6|Google Search Crawling/i) ?? config.sources[0];
    if (/indexing-canonical-hreflang/.test(moduleId))
      return byTitle(/Google Search Crawling/i) ?? config.sources[0];
    if (/structured-social-metadata/.test(moduleId))
      return byTitle(/Google Structured Data|WHATWG HTML Living/i) ?? config.sources[0];
    if (/accessibility-audit/.test(moduleId))
      return byTitle(/WCAG 2\.2|WAI Images/i) ?? config.sources[0];
    if (/performance-resource-audit/.test(moduleId))
      return byTitle(/Google Search Crawling|HTTPX 0\.28\.1/i) ?? config.sources[0];
    if (/dynamic-rendering-playwright/.test(moduleId))
      return byTitle(/Playwright for Python 1\.61\.0/i) ?? config.sources[0];
    if (/blocks-anti-bot-boundary/.test(moduleId))
      return byTitle(/ACM Code|RFC 9309/i) ?? config.sources[0];
    if (/security-untrusted-content/.test(moduleId))
      return byTitle(/^OWASP SSRF/i) ?? config.sources[0];
    if (/export-accessible-reports/.test(moduleId))
      return byTitle(/Python csv|WCAG 2\.2/i) ?? config.sources[0];
    if (/testing-fixtures-faults/.test(moduleId))
      return byTitle(/Python 3\.14\.6|HTTPX 0\.28\.1/i) ?? config.sources[0];
    if (/scrapy-scale-observability/.test(moduleId))
      return byTitle(/Scrapy 2\.17\.0/i) ?? config.sources[0];
    if (/packaging-scheduling-operations/.test(moduleId))
      return byTitle(/Python Packaging|Git 2\.55/i) ?? config.sources[0];
    if (/release-recovery-defense/.test(moduleId))
      return byTitle(/Git 2\.55|NIST Privacy|WCAG 2\.2/i) ?? config.sources[0];
    return config.sources[activityIndex % config.sources.length];
  }
  if (moduleId.startsWith('maze-')) {
    if (/outcomes-repo-accessibility/.test(moduleId))
      return byTitle(/Xbox Accessibility|Git 2.55|CS2023/i) ?? config.sources[0];
    if (/runtime-tk-event-loop/.test(moduleId))
      return byTitle(/Python tkinter Documentation|Tcl and Tk 8.6/i) ?? config.sources[0];
    if (/grid-coordinate-model|wall-cell-invariants/.test(moduleId))
      return byTitle(/Python 3.14.6|CS2023/i) ?? config.sources[0];
    if (/canvas-rendering-tags/.test(moduleId))
      return byTitle(/Tk Canvas Manual/i) ?? config.sources[0];
    if (/layout-resize-scaling/.test(moduleId))
      return byTitle(/Tk grid Manual|tkinter\.ttk/i) ?? config.sources[0];
    if (/input-focus-bindings/.test(moduleId))
      return byTitle(/Tk bind Manual|Xbox Accessibility/i) ?? config.sources[0];
    if (/graph-topology|generation-backtracker|dfs-solver-recursion/.test(moduleId))
      return byTitle(/CS2023|Python 3.14.6/i) ?? config.sources[0];
    if (/generation-alternatives-bias/.test(moduleId))
      return byTitle(/Generating Random Spanning Trees|Python random/i) ?? config.sources[0];
    if (/bfs-shortest-path/.test(moduleId))
      return byTitle(/Python collections|CS2023/i) ?? config.sources[0];
    if (/weighted-dijkstra-astar/.test(moduleId))
      return byTitle(/Minimum Cost Paths|Python heapq/i) ?? config.sources[0];
    if (/solver-evidence-comparison/.test(moduleId))
      return byTitle(/CS2023|Python Profiling/i) ?? config.sources[0];
    if (/animation-after-cancel/.test(moduleId))
      return byTitle(/Tcl after Manual|Python tkinter Documentation/i) ?? config.sources[0];
    if (/state-machine-controls|architecture-pure-core/.test(moduleId))
      return byTitle(/Python 3.14.6|CS2023/i) ?? config.sources[0];
    if (/accessible-interface/.test(moduleId))
      return byTitle(/WCAG 2.2|Xbox Accessibility/i) ?? config.sources[0];
    if (/determinism-replay-save/.test(moduleId))
      return byTitle(/Python json|Python random/i) ?? config.sources[0];
    if (/testing-properties-headless/.test(moduleId))
      return byTitle(/Python unittest|Python tkinter Documentation/i) ?? config.sources[0];
    if (/performance-profiling/.test(moduleId))
      return byTitle(/Python Profiling|Tk Canvas/i) ?? config.sources[0];
    if (/packaging-platforms/.test(moduleId))
      return byTitle(/PyInstaller 6.21|Python Packaging/i) ?? config.sources[0];
    if (/security-local-files/.test(moduleId))
      return byTitle(/Python json|Python 3.14.6/i) ?? config.sources[0];
    if (/release-recovery-defense/.test(moduleId))
      return byTitle(/Git 2.55|WCAG 2.2|Xbox Accessibility/i) ?? config.sources[0];
    return config.sources[activityIndex % config.sources.length];
  }
  if (moduleId.startsWith('static-site-')) {
    if (/outcomes-repo-architecture/.test(moduleId))
      return byTitle(/Git 2.55|WCAG 2.2|CS2023/i) ?? config.sources[0];
    if (/http-url-model|slugs-permalinks/.test(moduleId))
      return byTitle(/URL Living|HTTP Semantics|urllib\.parse/i) ?? config.sources[0];
    if (/cli-pipeline/.test(moduleId))
      return byTitle(/argparse|Python 3.14.6/i) ?? config.sources[0];
    if (/paths-content-discovery/.test(moduleId))
      return byTitle(/pathlib|OWASP File Upload/i) ?? config.sources[0];
    if (/text-encoding-metadata|document-ast|nesting-recursion/.test(moduleId))
      return byTitle(/Python 3.14.6|CommonMark/i) ?? config.sources[0];
    if (/inline-tokenization|inline-links-media|block-parsing/.test(moduleId))
      return byTitle(/CommonMark|markdown-it-py/i) ?? config.sources[0];
    if (/html-rendering-escaping/.test(moduleId))
      return byTitle(/HTML Living|OWASP Cross Site/i) ?? config.sources[0];
    if (/templates-jinja/.test(moduleId)) return byTitle(/Jinja|MarkupSafe/i) ?? config.sources[0];
    if (/navigation-taxonomy/.test(moduleId))
      return byTitle(/HTML Living|URL Living/i) ?? config.sources[0];
    if (/assets-fingerprints/.test(moduleId))
      return byTitle(/OWASP File Upload|Python 3.14.6/i) ?? config.sources[0];
    if (/incremental-dependencies|diagnostics-observability/.test(moduleId))
      return byTitle(/Python 3.14.6|Reproducible Builds/i) ?? config.sources[0];
    if (/accessibility-semantics/.test(moduleId))
      return byTitle(/WCAG 2.2|WAI Page Structure/i) ?? config.sources[0];
    if (/responsive-performance/.test(moduleId))
      return byTitle(/CSS Snapshot|WCAG 2.2/i) ?? config.sources[0];
    if (/security-trust/.test(moduleId))
      return (
        byTitle(/markdown-it-py Security|OWASP Cross Site|Content Security/i) ?? config.sources[0]
      );
    if (/testing-validation/.test(moduleId))
      return byTitle(/pytest|CommonMark|HTML Living/i) ?? config.sources[0];
    if (/packaging-cli/.test(moduleId)) return byTitle(/Python Packaging/i) ?? config.sources[0];
    if (/ci-deployment/.test(moduleId))
      return byTitle(/GitHub Pages|Reproducible Builds/i) ?? config.sources[0];
    if (/release-recovery-defense/.test(moduleId))
      return byTitle(/Git 2.55|GitHub Pages|WCAG 2.2/i) ?? config.sources[0];
    return config.sources[activityIndex % config.sources.length];
  }
  if (moduleId.startsWith('asteroids-')) {
    if (/outcomes-repo-accessibility/.test(moduleId))
      return byTitle(/Xbox Accessibility|Git 2.55|CS2023/i) ?? config.sources[0];
    if (/runtime-sdl-loop/.test(moduleId))
      return byTitle(/pygame-ce 2.5.7 Release|Package Index/i) ?? config.sources[0];
    if (/coordinate-vector-units|ship-motion-physics/.test(moduleId))
      return byTitle(/Vector Mathematics/i) ?? config.sources[0];
    if (/time-step-simulation/.test(moduleId))
      return byTitle(/Time and Clock/i) ?? config.sources[0];
    if (/input-events-remapping/.test(moduleId))
      return (
        byTitle(/Event Queue|Joystick and Controller|Xbox Accessibility/i) ?? config.sources[0]
      );
    if (/game-state-scenes|architecture-pure-core/.test(moduleId))
      return byTitle(/Python 3.14.6|CS2023/i) ?? config.sources[0];
    if (/wrap-viewport-resize/.test(moduleId))
      return byTitle(/Display and Window|Rect and FRect/i) ?? config.sources[0];
    if (/render-surfaces-assets/.test(moduleId))
      return byTitle(/Surface, Draw, Transform/i) ?? config.sources[0];
    if (/projectiles-cooldowns-pools|sprites-groups-ownership/.test(moduleId))
      return byTitle(/Sprites and Groups|Time and Clock/i) ?? config.sources[0];
    if (/generation-polygons-difficulty|determinism-replay-save/.test(moduleId))
      return byTitle(/Python Random|Vector Mathematics/i) ?? config.sources[0];
    if (/collision-detection|collision-response-damage/.test(moduleId))
      return byTitle(/Masks|Sprites and Groups|Rect and FRect/i) ?? config.sources[0];
    if (/score-progression-spawning|hud-menus-accessibility/.test(moduleId))
      return byTitle(/Xbox Accessibility|WCAG 2.2/i) ?? config.sources[0];
    if (/audio-mixer-cues/.test(moduleId))
      return byTitle(/Mixer and Sound|Xbox Accessibility/i) ?? config.sources[0];
    if (/testing-headless-fixtures/.test(moduleId))
      return byTitle(/Python unittest|pygame-ce Documentation/i) ?? config.sources[0];
    if (/performance-profiling/.test(moduleId))
      return byTitle(/Python Profiling/i) ?? config.sources[0];
    if (/packaging-assets-platforms/.test(moduleId))
      return byTitle(/PyInstaller 6.21|Python Packaging/i) ?? config.sources[0];
    if (/security-save-assets|release-recovery-defense/.test(moduleId))
      return byTitle(/Python 3.14.6|Xbox Accessibility|Git 2.55/i) ?? config.sources[0];
    return config.sources[activityIndex % config.sources.length];
  }
  if (moduleId.startsWith('bookbot-')) {
    if (/outcomes-repo-evidence/.test(moduleId))
      return byTitle(/Git 2.55|CS2023/i) ?? config.sources[0];
    if (/cli-lifecycle-contract/.test(moduleId))
      return byTitle(/Python 3.14.6 Documentation/i) ?? config.sources[0];
    if (/paths-file-admission/.test(moduleId))
      return byTitle(/Python pathlib/i) ?? config.sources[0];
    if (/text-io-encoding/.test(moduleId)) return byTitle(/Python I\/O/i) ?? config.sources[0];
    if (/unicode-normalization/.test(moduleId))
      return byTitle(/Unicode Normalization|Unicode Standard/i) ?? config.sources[0];
    if (/tokenization-word-policy|character-grapheme/.test(moduleId))
      return byTitle(/Unicode Text Segmentation/i) ?? config.sources[0];
    if (/frequency-counter/.test(moduleId))
      return byTitle(/Python Collections/i) ?? config.sources[0];
    if (/ranking-determinism/.test(moduleId))
      return byTitle(/Python Sorting/i) ?? config.sources[0];
    if (/streaming-bounded-memory/.test(moduleId))
      return byTitle(/Python I\/O|Python Security/i) ?? config.sources[0];
    if (/domain-model-pipeline/.test(moduleId))
      return byTitle(/Python 3.14.6 Documentation/i) ?? config.sources[0];
    if (/report-format-accessibility/.test(moduleId))
      return byTitle(/WCAG 2.2/i) ?? config.sources[0];
    if (/errors-exit-status|argparse-interface/.test(moduleId))
      return byTitle(/Python argparse/i) ?? config.sources[0];
    if (/testing-fixtures/.test(moduleId))
      return byTitle(/^Python unittest Documentation$/i) ?? config.sources[0];
    if (/performance-profiling/.test(moduleId))
      return byTitle(/Python Profiling/i) ?? config.sources[0];
    if (/packaging-release/.test(moduleId))
      return byTitle(/Python Packaging Command-Line Tools|PEP 621/i) ?? config.sources[0];
    if (/security-recovery-defense/.test(moduleId))
      return byTitle(/Python Security|Python hashlib/i) ?? config.sources[0];
    return config.sources[activityIndex % config.sources.length];
  }
  if (moduleId.startsWith('rag-')) {
    if (/outcomes-task-evidence/.test(moduleId))
      return byTitle(/NIST Retrieval-Augmented Generation|Original Paper/i) ?? config.sources[0];
    if (/ir-foundations-index/.test(moduleId))
      return byTitle(/^NIST Text REtrieval Conference$/i) ?? config.sources[0];
    if (/ingestion-provenance/.test(moduleId))
      return byTitle(/NIST NCCoE RAG|OWASP RAG Security/i) ?? config.sources[0];
    if (/normalization-tokenization/.test(moduleId))
      return byTitle(/Unicode Normalization|Unicode Text Segmentation/i) ?? config.sources[0];
    if (/chunking-structure/.test(moduleId))
      return byTitle(/OpenAI Retrieval Guide|NIST NCCoE RAG/i) ?? config.sources[0];
    if (/lexical-tfidf-bm25/.test(moduleId))
      return byTitle(/scikit-learn Text|BM25/i) ?? config.sources[0];
    if (/retrieval-metrics/.test(moduleId))
      return byTitle(/NIST Text REtrieval Conference/i) ?? config.sources[0];
    if (/embeddings-vector-semantics/.test(moduleId))
      return byTitle(/^MTEB Massive Text Embedding Benchmark$/i) ?? config.sources[0];
    if (/dense-retrieval/.test(moduleId))
      return byTitle(/Dense Passage Retrieval|BEIR/i) ?? config.sources[0];
    if (/ann-indexes/.test(moduleId)) return byTitle(/HNSW|Faiss/i) ?? config.sources[0];
    if (/vector-store-lifecycle/.test(moduleId))
      return byTitle(/pgvector|OpenAI Retrieval Guide/i) ?? config.sources[0];
    if (/hybrid-fusion/.test(moduleId))
      return byTitle(/Reciprocal Rank Fusion/i) ?? config.sources[0];
    if (/query-understanding/.test(moduleId)) return byTitle(/HyDE|BEIR/i) ?? config.sources[0];
    if (/reranking/.test(moduleId))
      return byTitle(/Sentence Transformers|ColBERTv2/i) ?? config.sources[0];
    if (/context-selection/.test(moduleId))
      return byTitle(/Lost in the Middle/i) ?? config.sources[0];
    if (/grounded-generation/.test(moduleId))
      return byTitle(/Original Paper|OWASP RAG Security/i) ?? config.sources[0];
    if (/citations-user-experience/.test(moduleId))
      return byTitle(/WCAG 2.2|NIST Retrieval-Augmented/i) ?? config.sources[0];
    if (/pipeline-architecture/.test(moduleId))
      return byTitle(/NIST NCCoE RAG|OpenAI Retrieval Guide/i) ?? config.sources[0];
    if (/end-to-end-evaluation|eval-datasets-judgments/.test(moduleId))
      return byTitle(/^RAG Evaluation Survey$/i) ?? config.sources[0];
    if (/security-poisoning-injection/.test(moduleId))
      return byTitle(/^OWASP RAG Security/i) ?? config.sources[0];
    if (/privacy-governance/.test(moduleId))
      return byTitle(/NIST AI RMF|OWASP LLM Verification/i) ?? config.sources[0];
    if (/observability-reliability/.test(moduleId))
      return byTitle(/OpenTelemetry GenAI/i) ?? config.sources[0];
    if (/performance-cost-capacity/.test(moduleId))
      return byTitle(/OpenAI Retrieval Guide|Faiss/i) ?? config.sources[0];
    if (/ingestion-operations-recovery/.test(moduleId))
      return byTitle(/pgvector|NIST NCCoE RAG/i) ?? config.sources[0];
    if (/structured-graph-rag/.test(moduleId))
      return byTitle(/Microsoft GraphRAG/i) ?? config.sources[0];
    if (/agentic-adaptive-rag/.test(moduleId))
      return byTitle(/OWASP RAG Security|NIST AI RMF/i) ?? config.sources[0];
    if (/multimodal-rag/.test(moduleId)) return byTitle(/ColPali|WCAG 2.2/i) ?? config.sources[0];
    if (/architecture-selection-evolution/.test(moduleId))
      return byTitle(/Lost in the Middle|Original Paper/i) ?? config.sources[0];
    if (/testing-release-defense/.test(moduleId))
      return byTitle(/OWASP LLM Verification|NIST AI RMF/i) ?? config.sources[0];
    return config.sources[activityIndex % config.sources.length];
  }
  if (moduleId.startsWith('crypto-go-')) {
    if (/outcomes-threat-evidence|primitives-encoding/.test(moduleId))
      return byTitle(/^CS2023 Cryptography Curriculum$/i) ?? config.sources[0];
    if (/randomness-nonces/.test(moduleId))
      return byTitle(/Cryptographic Randomness/i) ?? config.sources[0];
    if (/secret-bytes-lifecycle|side-channels-misuse/.test(moduleId))
      return byTitle(/Constant-Time|Security Best Practices/i) ?? config.sources[0];
    if (/classical-cryptanalysis|modular-arithmetic/.test(moduleId))
      return byTitle(/CS2023 Cryptography/i) ?? config.sources[0];
    if (/aes-block-ciphers/.test(moduleId))
      return byTitle(/^NIST FIPS 197 AES$/i) ?? config.sources[0];
    if (/modes-padding|aead-aes-gcm/.test(moduleId))
      return byTitle(/^NIST SP 800-38D GCM$/i) ?? config.sources[0];
    if (/chacha-poly1305/.test(moduleId))
      return byTitle(/^ChaCha20-Poly1305 RFC 8439$/i) ?? config.sources[0];
    if (/hashes-sha3/.test(moduleId)) return byTitle(/SHA-2 and SHA-3/i) ?? config.sources[0];
    if (/mac-hmac/.test(moduleId)) return byTitle(/HMAC Package/i) ?? config.sources[0];
    if (/kdf-hkdf/.test(moduleId)) return byTitle(/HKDF Package/i) ?? config.sources[0];
    if (/password-hashing/.test(moduleId))
      return byTitle(/^OWASP Password Storage$/i) ?? config.sources[0];
    if (/rsa-oaep-pss/.test(moduleId)) return byTitle(/RSA Package/i) ?? config.sources[0];
    if (/ecdh-x25519/.test(moduleId)) return byTitle(/ECDH Package/i) ?? config.sources[0];
    if (/ed25519-ecdsa/.test(moduleId))
      return byTitle(/Ed25519 Package|ECDSA Package/i) ?? config.sources[0];
    if (/hpke-envelope/.test(moduleId)) return byTitle(/HPKE Package/i) ?? config.sources[0];
    if (/key-management/.test(moduleId))
      return byTitle(/SP 800-57 Key Management/i) ?? config.sources[0];
    if (/x509-pki/.test(moduleId)) return byTitle(/X.509 Package/i) ?? config.sources[0];
    if (/tls13/.test(moduleId)) return byTitle(/^TLS 1.3 RFC 8446$/i) ?? config.sources[0];
    if (/protocol-design/.test(moduleId))
      return byTitle(/TLS 1.3 RFC|CS2023 Cryptography/i) ?? config.sources[0];
    if (/file-stream-formats/.test(moduleId))
      return byTitle(/Cipher and AEAD|Cryptographic Storage/i) ?? config.sources[0];
    if (/post-quantum/.test(moduleId))
      return byTitle(/FIPS 203 ML-KEM|FIPS 204 ML-DSA|FIPS 205 SLH-DSA/i) ?? config.sources[0];
    if (/testing-vectors-fuzz/.test(moduleId))
      return byTitle(/Security Best Practices|ChaCha20-Poly1305 RFC/i) ?? config.sources[0];
    if (/agility-compliance/.test(moduleId))
      return byTitle(/^Go FIPS 140-3 Compliance$/i) ?? config.sources[0];
    if (/operations-release/.test(moduleId))
      return byTitle(/Security Best Practices|SP 800-57 Key Management/i) ?? config.sources[0];
    return config.sources[activityIndex % config.sources.length];
  }
  if (moduleId.startsWith('cmem-')) {
    if (
      /outcomes-evidence|values-integers|objects-storage|representation|indeterminate|aliasing/.test(
        moduleId
      )
    )
      return byTitle(/ISO C23|WG14/i) ?? config.sources[0];
    if (/translation-diagnostics/.test(moduleId))
      return byTitle(/GCC 16|Clang 22/i) ?? config.sources[0];
    if (
      /arrays-pointers|strings-bytes|structs-unions|heap-allocator|allocation-size|ownership|cleanup|realloc|uaf|buffer-overflow/.test(
        moduleId
      )
    )
      return byTitle(/SEI CERT C|POSIX.*Memory|CWE/i) ?? config.sources[0];
    if (/automatic-lifetime/.test(moduleId))
      return byTitle(/SEI CERT C|GCC 16/i) ?? config.sources[0];
    if (/functions-callbacks|resource-ownership/.test(moduleId))
      return byTitle(/SEI CERT C|POSIX/i) ?? config.sources[0];
    if (/arenas-pools|profiling-performance/.test(moduleId))
      return byTitle(/mimalloc|jemalloc/i) ?? config.sources[0];
    if (/reference-counting|tracing-garbage/.test(moduleId))
      return byTitle(/Boehm|Python 3\.14 C API Memory/i) ?? config.sources[0];
    if (/concurrency-atomics/.test(moduleId))
      return byTitle(/ThreadSanitizer|POSIX.*Threads/i) ?? config.sources[0];
    if (/abi-ffi/.test(moduleId))
      return (
        byTitle(/Python 3\.14 C API Stability|Rust Reference|WebAssembly Core/i) ??
        config.sources[0]
      );
    if (/sanitizers-static/.test(moduleId))
      return byTitle(/AddressSanitizer|libFuzzer|Static Analyzer/i) ?? config.sources[0];
    if (/testing-release/.test(moduleId))
      return byTitle(/GCC 16|Clang 22|ACM IEEE/i) ?? config.sources[0];
    return config.sources[activityIndex % config.sources.length];
  }
  if (moduleId.startsWith('storage-ts-')) {
    if (/outcomes-evidence|architecture-selection/.test(moduleId))
      return byTitle(/CS2023|HTTP Semantics/i) ?? config.sources[0];
    if (/http-representation|http-gateway|download-operations/.test(moduleId))
      return byTitle(/HTTP Semantics|S3 Client Package/i) ?? config.sources[0];
    if (/s3-object-model/.test(moduleId))
      return byTitle(/Data Consistency|Object Key Naming/i) ?? config.sources[0];
    if (/buckets-endpoints/.test(moduleId))
      return byTitle(/Directory Buckets/i) ?? config.sources[0];
    if (/sdk-v2-contract|client-resilience/.test(moduleId))
      return (
        byTitle(/SDK for JavaScript v3 Developer Guide|S3 Client Package/i) ?? config.sources[0]
      );
    if (/putobject-integrity/.test(moduleId))
      return byTitle(/Checking Object Integrity/i) ?? config.sources[0];
    if (/upload-admission/.test(moduleId))
      return byTitle(/S3 Client Package|Checking Object Integrity/i) ?? config.sources[0];
    if (/transfermanager/.test(moduleId))
      return byTitle(/S3 lib-storage Package/i) ?? config.sources[0];
    if (/multipart-upload/.test(moduleId)) return byTitle(/Multipart Upload/i) ?? config.sources[0];
    if (/direct-browser-upload/.test(moduleId))
      return byTitle(/S3 Request Presigner|Presigned URL Upload|S3 CORS/i) ?? config.sources[0];
    if (/metadata-transactions|events-observability/.test(moduleId))
      return byTitle(/S3 Client Package|Data Consistency/i) ?? config.sources[0];
    if (/object-mutations|versioning-recovery/.test(moduleId))
      return byTitle(/S3 Versioning|Object Lock/i) ?? config.sources[0];
    if (/lifecycle-storage/.test(moduleId))
      return byTitle(/Lifecycle Management|Storage Classes/i) ?? config.sources[0];
    if (/iam-bucket-security/.test(moduleId))
      return byTitle(/S3 Security Best Practices/i) ?? config.sources[0];
    if (/encryption-key/.test(moduleId))
      return byTitle(/Server-Side Encryption/i) ?? config.sources[0];
    if (/signed-access/.test(moduleId))
      return byTitle(/CloudFront Signer|Signed URLs and Cookies/i) ?? config.sources[0];
    if (/cloudfront-oac/.test(moduleId))
      return byTitle(/Restrict S3 Origins with OAC/i) ?? config.sources[0];
    if (/cloudfront-cache/.test(moduleId))
      return byTitle(/Cache Key and Origin Requests|Invalidation/i) ?? config.sources[0];
    if (/media-range/.test(moduleId))
      return byTitle(/Range GET Requests|HTTP Semantics/i) ?? config.sources[0];
    if (/edge-security/.test(moduleId))
      return byTitle(/CloudFront Security Best Practices/i) ?? config.sources[0];
    if (/durability-disaster/.test(moduleId))
      return byTitle(/S3 Replication/i) ?? config.sources[0];
    if (/testing-release/.test(moduleId))
      return byTitle(/Node\.js 24|TypeScript 7\.0 Release/i) ?? config.sources[0];
    return config.sources[activityIndex % config.sources.length];
  }
  if (moduleId.startsWith('storage-go-')) {
    if (/outcomes-evidence|architecture-selection/.test(moduleId))
      return byTitle(/CS2023|HTTP Semantics/i) ?? config.sources[0];
    if (/http-representation|http-gateway|download-operations/.test(moduleId))
      return byTitle(/HTTP Semantics|S3 API/i) ?? config.sources[0];
    if (/s3-object-model/.test(moduleId))
      return byTitle(/Data Consistency|Object Key Naming/i) ?? config.sources[0];
    if (/buckets-endpoints/.test(moduleId))
      return byTitle(/Directory Buckets/i) ?? config.sources[0];
    if (/sdk-v2-contract|client-resilience/.test(moduleId))
      return byTitle(/SDK for Go v2 Core|SDK for Go v2 S3/i) ?? config.sources[0];
    if (/putobject-integrity/.test(moduleId))
      return byTitle(/Checking Object Integrity/i) ?? config.sources[0];
    if (/upload-admission/.test(moduleId))
      return byTitle(/S3 API|Checking Object Integrity/i) ?? config.sources[0];
    if (/transfermanager/.test(moduleId))
      return byTitle(/Transfer Manager for Go/i) ?? config.sources[0];
    if (/multipart-upload/.test(moduleId)) return byTitle(/Multipart Upload/i) ?? config.sources[0];
    if (/direct-browser-upload/.test(moduleId))
      return byTitle(/Presigned URL Upload|S3 CORS/i) ?? config.sources[0];
    if (/metadata-transactions|events-observability/.test(moduleId))
      return byTitle(/S3 API|Data Consistency/i) ?? config.sources[0];
    if (/object-mutations|versioning-recovery/.test(moduleId))
      return byTitle(/S3 Versioning|Object Lock/i) ?? config.sources[0];
    if (/lifecycle-storage/.test(moduleId))
      return byTitle(/Lifecycle Management|Storage Classes/i) ?? config.sources[0];
    if (/iam-bucket-security/.test(moduleId))
      return byTitle(/S3 Security Best Practices/i) ?? config.sources[0];
    if (/encryption-key/.test(moduleId))
      return byTitle(/Server-Side Encryption/i) ?? config.sources[0];
    if (/signed-access/.test(moduleId))
      return byTitle(/CloudFront Sign for Go|Signed URLs and Cookies/i) ?? config.sources[0];
    if (/cloudfront-oac/.test(moduleId))
      return byTitle(/Restrict S3 Origins with OAC/i) ?? config.sources[0];
    if (/cloudfront-cache/.test(moduleId))
      return byTitle(/Cache Key and Origin Requests|Invalidation/i) ?? config.sources[0];
    if (/media-range/.test(moduleId))
      return byTitle(/Range GET Requests|HTTP Semantics/i) ?? config.sources[0];
    if (/edge-security/.test(moduleId))
      return byTitle(/CloudFront Security Best Practices/i) ?? config.sources[0];
    if (/durability-disaster/.test(moduleId))
      return byTitle(/S3 Replication/i) ?? config.sources[0];
    if (/testing-release/.test(moduleId))
      return byTitle(/Go 1.26 Release|SDK for Go v2 Core/i) ?? config.sources[0];
    return config.sources[activityIndex % config.sources.length];
  }
  if (moduleId.startsWith('rabbit-go-')) {
    if (/outcomes-delivery|architecture-pattern/.test(moduleId)) {
      return byTitle(/Reliability Guide|Computer Science Curricula/i) ?? config.sources[0];
    }
    if (/amqp-model|direct-routing|fanout|topic-headers|topology-declarations/.test(moduleId)) {
      return byTitle(/AMQP 0-9-1 Model|Exchanges and Queues/i) ?? config.sources[0];
    }
    if (
      /go-amqp091|connections-channels|publisher-admission|unroutable|consumer-goroutines/.test(
        moduleId
      )
    ) {
      return byTitle(/amqp091-go 1\.12 API/i) ?? config.sources[0];
    }
    if (/message-envelope/.test(moduleId)) {
      return byTitle(/AsyncAPI Specification|CloudEvents Specification/i) ?? config.sources[0];
    }
    if (/publisher-confirms|delivery-tags|prefetch/.test(moduleId)) {
      return byTitle(/Acknowledgements and Publisher Confirms/i) ?? config.sources[0];
    }
    if (/idempotency|failure-retry|transactional-outbox/.test(moduleId)) {
      return byTitle(/Reliability Guide/i) ?? config.sources[0];
    }
    if (/dead-letter/.test(moduleId)) return byTitle(/Dead Letter Exchanges/i) ?? config.sources[0];
    if (/quorum-queues|ordering-single-active/.test(moduleId)) {
      return byTitle(/Quorum Queues/i) ?? config.sources[0];
    }
    if (/rabbitmq43/.test(moduleId)) return byTitle(/4\.3 Delayed Retries/i) ?? config.sources[0];
    if (/streams-superstreams/.test(moduleId)) {
      return (
        byTitle(/Stream Go Client/i) ?? byTitle(/Streams and Super Streams/i) ?? config.sources[0]
      );
    }
    if (/security-vhosts/.test(moduleId))
      return byTitle(/Access Control and TLS/i) ?? config.sources[0];
    if (/observability-capacity/.test(moduleId)) {
      return byTitle(/Prometheus Monitoring|Flow Control/i) ?? config.sources[0];
    }
    if (/testing-race/.test(moduleId)) {
      return (
        byTitle(/Go Testing, Fuzzing/i) ??
        byTitle(/Release Information and 4\.3 Upgrade Path/i) ??
        config.sources[0]
      );
    }
    return config.sources[activityIndex % config.sources.length];
  }
  if (moduleId.startsWith('rabbit-ts-')) {
    if (/outcomes-delivery|architecture-pattern/.test(moduleId)) {
      return byTitle(/Reliability Guide|Computer Science Curricula/i) ?? config.sources[0];
    }
    if (/amqp-model|direct-routing|fanout|topic-headers/.test(moduleId)) {
      return byTitle(/AMQP 0-9-1 Model|Exchanges and Queues/i) ?? config.sources[0];
    }
    if (/node-amqplib/.test(moduleId)) {
      return byTitle(/amqplib 2\.0\.1 Channel API/i) ?? config.sources[0];
    }
    if (/connections-channels/.test(moduleId)) {
      return byTitle(/Connections, Channels, and Heartbeats/i) ?? config.sources[0];
    }
    if (/topology-declarations/.test(moduleId)) {
      return byTitle(/Exchanges and Queues/i) ?? config.sources[0];
    }
    if (/message-envelope/.test(moduleId)) {
      return byTitle(/AsyncAPI Specification|CloudEvents Specification/i) ?? config.sources[0];
    }
    if (/publisher-buffer|unroutable/.test(moduleId)) {
      return byTitle(/Publishers and Consumers|amqplib 2\.0\.1 Channel API/i) ?? config.sources[0];
    }
    if (/publisher-confirms|acknowledgements|prefetch/.test(moduleId)) {
      return byTitle(/Acknowledgements and Publisher Confirms/i) ?? config.sources[0];
    }
    if (/consumer-lifecycle/.test(moduleId)) {
      return byTitle(/Publishers and Consumers/i) ?? config.sources[0];
    }
    if (/idempotency|failure-retry|transactional-outbox/.test(moduleId)) {
      return byTitle(/Reliability Guide/i) ?? config.sources[0];
    }
    if (/dead-letter/.test(moduleId)) {
      return byTitle(/Dead Letter Exchanges/i) ?? config.sources[0];
    }
    if (/quorum-queues|ordering-single-active/.test(moduleId)) {
      return byTitle(/Quorum Queues/i) ?? config.sources[0];
    }
    if (/rabbitmq43/.test(moduleId)) {
      return byTitle(/4\.3 Delayed Retries/i) ?? config.sources[0];
    }
    if (/streams-superstreams/.test(moduleId)) {
      return byTitle(/Streams and Super Streams/i) ?? config.sources[0];
    }
    if (/security-vhosts/.test(moduleId)) {
      return byTitle(/Access Control and TLS/i) ?? config.sources[0];
    }
    if (/observability-capacity/.test(moduleId)) {
      return byTitle(/Prometheus Monitoring|Flow Control/i) ?? config.sources[0];
    }
    if (/testing-chaos/.test(moduleId)) {
      return byTitle(/Release Information and 4\.3 Upgrade Path/i) ?? config.sources[0];
    }
    return config.sources[activityIndex % config.sources.length];
  }
  if (moduleId.startsWith('http-protocol-go-')) {
    if (/octets-streams/.test(moduleId)) {
      return byTitle(/Go bufio, io/i) ?? config.sources[0];
    }
    if (/tcp-connections/.test(moduleId)) {
      return byTitle(/Transmission Control Protocol/i) ?? config.sources[0];
    }
    if (/semantics-wire/.test(moduleId)) {
      return byTitle(/HTTP Semantics/i) ?? config.sources[0];
    }
    if (/fields-structured/.test(moduleId)) {
      return byTitle(/Structured Field Values/i) ?? config.sources[0];
    }
    if (/tls13-alpn/.test(moduleId)) {
      return byTitle(/Transport Layer Security Protocol/i) ?? config.sources[0];
    }
    if (/upgrade-connect/.test(moduleId)) {
      return byTitle(/Optimistic Protocol Transitions/i) ?? config.sources[0];
    }
    if (/tests-differential-fuzz/.test(moduleId)) {
      return byTitle(/Go Fuzzing and Security/i) ?? config.sources[0];
    }
    if (/http2-frames/.test(moduleId)) {
      return byTitle(/^HTTP\/2$/i) ?? config.sources[0];
    }
    if (/http3-quic/.test(moduleId)) {
      return byTitle(/^HTTP\/3$/i) ?? config.sources[0];
    }
    if (/outcomes-layers/.test(moduleId)) {
      return byTitle(/Computer Science Curricula/i) ?? config.sources[0];
    }
    return byTitle(/^HTTP\/1\.1$/i) ?? config.sources[0];
  }
  if (moduleId.startsWith('http-server-go-')) {
    if (
      /outcomes-lifecycle|servemux-routing|handlers-middleware|bodies-json|context-deadlines|server-protocols|browser-cors/.test(
        moduleId
      )
    ) {
      return byTitle(/Go 1\.26\.5 net\/http Package/i) ?? config.sources[0];
    }
    if (/request-target-host-proxy|reverse-proxy-smuggling/.test(moduleId)) {
      return byTitle(/HTTP\/1\.1 Message Syntax/i) ?? config.sources[0];
    }
    if (/fields-representations-cache/.test(moduleId)) {
      return byTitle(/HTTP Caching/i) ?? config.sources[0];
    }
    if (/responses-problems-streams/.test(moduleId)) {
      return byTitle(/Problem Details/i) ?? config.sources[0];
    }
    if (/sql-repositories-transactions/.test(moduleId)) {
      return byTitle(/PostgreSQL 18\.4/i) ?? config.sources[0];
    }
    if (/authentication-sessions-tokens/.test(moduleId)) {
      return byTitle(/OAuth 2\.0 Security/i) ?? config.sources[0];
    }
    if (/authorization-tenancy|webhooks-abuse-ssrf/.test(moduleId)) {
      return byTitle(/OWASP API Security/i) ?? config.sources[0];
    }
    if (/testing-fuzz-race/.test(moduleId)) {
      return byTitle(/Security Best Practices/i) ?? config.sources[0];
    }
    if (/observability-health-performance/.test(moduleId)) {
      return byTitle(/OpenTelemetry HTTP/i) ?? config.sources[0];
    }
    if (/contracts-versioning-release/.test(moduleId)) {
      return byTitle(/OpenAPI Specification/i) ?? config.sources[0];
    }
    return byTitle(/HTTP Semantics/i) ?? config.sources[0];
  }
  if (moduleId.startsWith('http-server-ts-')) {
    if (/outcomes-toolchain/.test(moduleId)) {
      return byTitle(/Node\.js 24\.18\.0 Release/i) ?? config.sources[0];
    }
    if (/node-runtime-lifecycle|node-http-protocol|async-context-cancellation/.test(moduleId)) {
      return byTitle(/Node\.js 24 HTTP API|Node\.js Async Context/i) ?? config.sources[0];
    }
    if (/express-routing|middleware-errors|bodies-webhooks/.test(moduleId)) {
      return byTitle(/Express 5\.2 API|Express 5 Migration/i) ?? config.sources[0];
    }
    if (/runtime-validation-types/.test(moduleId)) {
      return byTitle(/Zod 4 Documentation/i) ?? config.sources[0];
    }
    if (/request-authority-proxy|proxy-framing-smuggling/.test(moduleId)) {
      return byTitle(/HTTP\/1\.1 Message Syntax/i) ?? config.sources[0];
    }
    if (/fields-representations-cache/.test(moduleId)) {
      return byTitle(/HTTP Caching/i) ?? config.sources[0];
    }
    if (/responses-problems-streaming/.test(moduleId)) {
      return byTitle(/Problem Details/i) ?? config.sources[0];
    }
    if (/postgres-pools-transactions/.test(moduleId)) {
      return byTitle(/node-postgres Documentation/i) ?? config.sources[0];
    }
    if (/authentication-sessions-jose/.test(moduleId)) {
      return byTitle(/jose Documentation/i) ?? config.sources[0];
    }
    if (/authorization-tenancy|webhooks-ssrf-abuse/.test(moduleId)) {
      return byTitle(/OWASP API Security/i) ?? config.sources[0];
    }
    if (/testing-contracts-fuzz/.test(moduleId)) {
      return byTitle(/Node\.js Async Context/i) ?? config.sources[0];
    }
    if (/observability-health/.test(moduleId)) {
      return byTitle(/OpenTelemetry HTTP/i) ?? config.sources[0];
    }
    if (/openapi-release-recovery/.test(moduleId)) {
      return byTitle(/OpenAPI Specification/i) ?? config.sources[0];
    }
    return byTitle(/HTTP Semantics/i) ?? config.sources[0];
  }
  if (/^http-(?:go|ts|py)-/.test(moduleId)) {
    if (/uris-origins-dns/.test(moduleId)) {
      return byTitle(/RFC 3986/i) ?? config.sources[0];
    }
    if (/caching-validation/.test(moduleId)) {
      return byTitle(/RFC 9111/i) ?? config.sources[0];
    }
    if (/responses-errors/.test(moduleId)) {
      return byTitle(/RFC 9457/i) ?? config.sources[0];
    }
    if (/cookies-auth-secrets/.test(moduleId)) {
      return byTitle(/RFC 6265/i) ?? config.sources[0];
    }
    if (/security-boundaries|tls-trust/.test(moduleId)) {
      return byTitle(/OWASP SSRF/i) ?? config.sources[0];
    }
    if (/connections-protocols/.test(moduleId)) {
      return byTitle(/RFC 9112/i) ?? config.sources[0];
    }
    if (/testing-observability|performance-release-defense/.test(moduleId)) {
      return byTitle(/OpenTelemetry/i) ?? config.sources[0];
    }
    if (
      /client-architecture|body-streams-limits|timeouts-cancellation|retries-backoff/.test(moduleId)
    ) {
      return (
        byTitle(
          family === 'go'
            ? /Go 1.26 net\/http/i
            : family === 'typescript'
              ? /WHATWG Fetch/i
              : /Python 3.14 urllib/i
        ) ?? config.sources[0]
      );
    }
    return byTitle(/RFC 9110/i) ?? config.sources[0];
  }
  if (family === 'docker') {
    if (/architecture-isolation|containers-lifecycle/.test(moduleId)) {
      return byTitle(/Engine 29 Architecture/i) ?? config.sources[0];
    }
    if (/images-layers-registries/.test(moduleId)) {
      return byTitle(/OCI Image, Runtime/i) ?? config.sources[0];
    }
    if (/dockerfile-build-context/.test(moduleId)) {
      return byTitle(/Dockerfile Reference/i) ?? config.sources[0];
    }
    if (/buildkit-cache|multiplatform-buildx|performance-reproducibility/.test(moduleId)) {
      return byTitle(/BuildKit 0\.31/i) ?? config.sources[0];
    }
    if (/process-signals|observability-debugging/.test(moduleId)) {
      return byTitle(/Container Runtime and Resource/i) ?? config.sources[0];
    }
    if (/storage-mounts/.test(moduleId)) {
      return byTitle(/Storage and Containerd/i) ?? config.sources[0];
    }
    if (/networking-dns/.test(moduleId)) {
      return byTitle(/Networking and Port/i) ?? config.sources[0];
    }
    if (/compose-model|compose-development|testing-validation/.test(moduleId)) {
      return byTitle(/Compose Specification and Docker Compose/i) ?? config.sources[0];
    }
    if (/security-least|config-secrets/.test(moduleId)) {
      return byTitle(/Security, Rootless/i) ?? config.sources[0];
    }
    if (/supply-chain|production-operations/.test(moduleId)) {
      return byTitle(/Build Attestations/i) ?? config.sources[0];
    }
    return byTitle(/Computer Science Curricula/i) ?? config.sources[0];
  }
  if (family === 'kubernetes') {
    if (/architecture-reconciliation|api-objects|cluster-lifecycle/.test(moduleId)) {
      return byTitle(/Kubernetes 1\.36 Releases|Architecture, Objects/i) ?? config.sources[0];
    }
    if (/kubectl-contexts|metadata-namespaces/.test(moduleId)) {
      return byTitle(/Architecture, Objects, and Cluster Administration/i) ?? config.sources[0];
    }
    if (
      /pods-lifecycle|config-secrets|health-resources|deployments-rollouts|workload-controller|availability-disruption/.test(
        moduleId
      )
    ) {
      return byTitle(/Workloads, Configuration, Probes, and Autoscaling/i) ?? config.sources[0];
    }
    if (/services-endpoints|network-model/.test(moduleId)) {
      return byTitle(/Services, Networking, DNS, and NetworkPolicy/i) ?? config.sources[0];
    }
    if (/gateway-ingress/.test(moduleId)) {
      return byTitle(/Gateway API Specification and Conformance/i) ?? config.sources[0];
    }
    if (/storage-persistence/.test(moduleId)) {
      return byTitle(/Storage and CSI/i) ?? config.sources[0];
    }
    if (/scheduling-placement/.test(moduleId)) {
      return byTitle(/Scheduling, Preemption, Eviction, and Topology/i) ?? config.sources[0];
    }
    if (/identity-rbac|workload-security/.test(moduleId)) {
      return byTitle(/Security, RBAC, Pod Security, and Multi-Tenancy/i) ?? config.sources[0];
    }
    if (/observability-debugging/.test(moduleId)) {
      return byTitle(/Observability and Debugging/i) ?? config.sources[0];
    }
    if (/packaging-kustomize/.test(moduleId)) {
      return byTitle(/Kustomize and Helm/i) ?? config.sources[0];
    }
    if (/extensions-admission/.test(moduleId)) {
      return byTitle(/Architecture, Objects, and Cluster Administration/i) ?? config.sources[0];
    }
    return byTitle(/Computer Science Curricula/i) ?? config.sources[0];
  }
  if (family === 'cicd') {
    if (/delivery-outcomes-flow/.test(moduleId)) {
      return byTitle(/Computer Science Curricula/i) ?? config.sources[0];
    }
    if (/node-typescript-reproducibility/.test(moduleId)) {
      return byTitle(/TypeScript 7\.0 Native Compiler/i) ?? config.sources[0];
    }
    if (/docker-build-test-cache/.test(moduleId)) {
      return byTitle(/Docker Build GitHub Actions/i) ?? config.sources[0];
    }
    if (/image-release-attestations/.test(moduleId)) {
      return byTitle(/SLSA Supply-Chain/i) ?? config.sources[0];
    }
    if (/environments-oidc-cloud-auth/.test(moduleId)) {
      return byTitle(/Google GitHub Actions Authentication/i) ?? config.sources[0];
    }
    if (/cloud-run-progressive/.test(moduleId)) {
      return byTitle(/Google Cloud Run Deployment/i) ?? config.sources[0];
    }
    if (/releases-packages-change-control/.test(moduleId)) {
      return byTitle(/npm Trusted Publishing/i) ?? config.sources[0];
    }
    if (/observability-incidents-governance/.test(moduleId)) {
      return byTitle(/NIST Secure Software/i) ?? config.sources[0];
    }
    if (
      /secrets-tokens-injection|events-refs|actions-dependencies|environments-oidc/.test(moduleId)
    ) {
      return byTitle(/Secure Use, OIDC/i) ?? config.sources[0];
    }
    if (/runner|artifact|actions-dependencies/.test(moduleId)) {
      return byTitle(/Official GitHub Actions Releases/i) ?? config.sources[0];
    }
    return byTitle(/GitHub Actions Concepts/i) ?? config.sources[0];
  }
  if (family !== 'sql' && family !== 'go') {
    return config.sources[activityIndex % config.sources.length];
  }

  if (family === 'go') {
    if (
      /toolchain-programs-packages|values-variables-types|control-flow-defer|functions-closures-contracts|arrays-slices-memory|maps-strings-unicode|structs-methods-composition|interfaces-errors-boundaries|failures-resources-recovery|generics-constraints-iterators/.test(
        moduleId
      )
    ) {
      return byTitle(/Language Specification/i) ?? config.sources[0];
    }
    if (/packages-modules-workspaces/.test(moduleId)) {
      return byTitle(/Modules Reference/i) ?? config.sources[0];
    }
    if (/testing-fuzzing-quality/.test(moduleId)) {
      return byTitle(/Testing, Fuzzing/i) ?? config.sources[0];
    }
    if (/goroutines-channels-select|context-cancellation-backpressure/.test(moduleId)) {
      return byTitle(/Concurrency Patterns/i) ?? config.sources[0];
    }
    if (/memory-model-synchronization/.test(moduleId)) {
      return byTitle(/Memory Model/i) ?? config.sources[0];
    }
    if (/http-services-security/.test(moduleId)) {
      return byTitle(/Security Best Practices/i) ?? config.sources[0];
    }
    if (/diagnostics-performance-release/.test(moduleId)) {
      return byTitle(/Diagnostics/i) ?? config.sources[0];
    }
    if (/io-serialization-cli/.test(moduleId)) {
      return byTitle(/Code Review Comments/i) ?? config.sources[0];
    }
    return byTitle(/Go 1.26 Release/i) ?? config.sources[0];
  }
  if (/security-privacy-programmatic/.test(moduleId)) {
    return byTitle(/OWASP SQL Injection/i) ?? config.sources[0];
  }
  if (/indexes-plans-performance|window-analytics-time/.test(moduleId)) {
    return byTitle(/SQLite Query Planning/i) ?? config.sources[0];
  }
  if (/transactions-concurrency-recovery|dialects-distribution-capstone/.test(moduleId)) {
    return byTitle(/PostgreSQL Concurrency/i) ?? config.sources[0];
  }
  if (/relational-model-keys-nulls|ddl-constraints-migrations/.test(moduleId)) {
    return byTitle(/SQLite Foreign Key/i) ?? config.sources[0];
  }
  if (/data-systems-lifecycle|modeling-normalization/.test(moduleId)) {
    return byTitle(/Curricula 2023/i) ?? config.sources[0];
  }
  return byTitle(/SQLite SQL Language/i) ?? config.sources[0];
}

function plannedActivityToContent({
  plan,
  modulePlan,
  moduleProfile,
  blueprint,
  config,
  previousActivityId,
  activityIndex,
}) {
  const competencyById = new Map(blueprint.competencies.map((entry) => [entry.id, entry]));
  const coverage = coverageFrom(plan);
  const coveredIds = unique(plan.coverage.map((entry) => entry.competencyId));
  const competencies = coveredIds.map((id) => competencyById.get(id)).filter(Boolean);
  const primary = competencies[0];
  const family = familyFor(blueprint.id);
  const source = researchSourceFor(config, family, modulePlan.id, activityIndex);
  const variant = hash(plan.id) % 4;
  const competencyModuleById = new Map();
  for (const candidateModule of blueprint.modules) {
    for (const candidateActivity of candidateModule.activities) {
      for (const entry of candidateActivity.coverage) {
        if (entry.stages.includes('I') && !competencyModuleById.has(entry.competencyId)) {
          competencyModuleById.set(entry.competencyId, candidateModule.id);
        }
      }
    }
  }
  const builder = createBuilder({
    competencyById,
    moduleProfile,
    source,
    family,
    moduleId: modulePlan.id,
    activityKind: plan.kind,
    seed: hash(plan.id),
    competencyModuleById,
  });
  const context = {
    kind: plan.kind,
    competencies,
    primary,
    moduleId: modulePlan.id,
    moduleProfile,
    family,
    variant,
  };

  if (plan.kind === 'theory') buildTheory(builder, context);
  else buildPractice(builder, context);

  return {
    schemaVersion: 2,
    id: plan.id,
    courseId: blueprint.id,
    moduleId: modulePlan.id,
    kind: plan.kind,
    title: compactTitle(modulePlan.title, plan.kind, primary.id, plan.id, family),
    summary: boundedText(
      `${plan.authenticContext} Planned artifact: ${plan.learningDesign.learnerArtifact} Learners progress through prediction, explicit theory, changed-case practice, causal debugging, and evidence defense.`,
      500
    ),
    objectives: unique([
      ...competencies.slice(0, 3).map((entry) => entry.statement),
      'Preserve previously learned constraints and attach observable changed-case evidence.',
    ]).slice(0, 4),
    competencyCoverage: coverage,
    prerequisites: previousActivityId ? [previousActivityId] : [],
    difficulty: activityDifficulty(plan.kind),
    estimatedMinutes: Math.max(plan.estimatedMinutes, builder.steps.length * 8),
    artifactId: `${blueprint.id}-cumulative-portfolio`,
    starterFiles: starterFiles(family, blueprint.id),
    steps: builder.steps,
    checks: builder.checks,
    mastery: {
      passingPercent:
        plan.kind === 'exam' ? config.masteryThresholdPercent : plan.kind === 'project' ? 90 : 85,
      maxHintsForMastery:
        plan.kind === 'exam' ? 0 : plan.kind === 'project' || plan.kind === 'lab' ? 2 : 6,
      spacedReviewDays: [1, 7, 21, 60],
    },
  };
}

export async function generateExpandedCourseContent(config) {
  const blueprintPath = path.join(process.cwd(), 'blueprints', `${config.id}.json`);
  const blueprint = JSON.parse(await readFile(blueprintPath, 'utf8'));
  const courseRoot = path.join(process.cwd(), 'content', 'v2', 'courses', config.id);
  const moduleRoot = path.join(courseRoot, 'modules');
  const activityRoot = path.join(courseRoot, 'activities');
  await mkdir(moduleRoot, { recursive: true });
  await mkdir(activityRoot, { recursive: true });

  const activities = [];
  const modules = [];
  let previousActivityId = null;
  let activityIndex = 0;

  for (const modulePlan of blueprint.modules) {
    const moduleProfile = config.modules.find((entry) => entry.id === modulePlan.id);
    if (!moduleProfile) throw new Error(`Missing module profile for ${config.id}/${modulePlan.id}`);
    const moduleActivities = [];
    for (const plan of modulePlan.activities) {
      const activity = plannedActivityToContent({
        plan,
        modulePlan,
        moduleProfile,
        blueprint,
        config,
        previousActivityId,
        activityIndex,
      });
      activities.push(activity);
      moduleActivities.push(activity);
      previousActivityId = activity.id;
      activityIndex += 1;
      await writeFile(
        path.join(activityRoot, `${activity.id}.json`),
        `${JSON.stringify(activity, null, 2)}\n`
      );
    }
    const module = {
      schemaVersion: 2,
      id: modulePlan.id,
      courseId: config.id,
      title: modulePlan.title,
      description: `${moduleProfile.context} Learners cumulatively produce ${moduleProfile.artifact} through theory, guided work, debugging, transfer, retrieval, and assessment.`,
      order: modulePlan.order,
      sourceObjectiveIds: modulePlan.sourceObjectiveIds ?? [],
      objectives: modulePlan.objectives,
      competencyIds: unique(
        modulePlan.activities.flatMap((activity) =>
          activity.coverage.map((entry) => entry.competencyId)
        )
      ),
      prerequisites: modulePlan.prerequisiteModuleIds,
      activityIds: moduleActivities.map((activity) => activity.id),
    };
    modules.push(module);
    await writeFile(
      path.join(moduleRoot, `${module.id}.json`),
      `${JSON.stringify(module, null, 2)}\n`
    );
  }

  const projectActivityIds = activities
    .filter((activity) => activity.kind === 'project')
    .map((activity) => activity.id);
  const exam = activities.find((activity) => activity.kind === 'exam');
  if (!exam) throw new Error(`Missing exam activity for ${config.id}`);
  const totalMinutes = activities.reduce((sum, activity) => sum + activity.estimatedMinutes, 0);
  const course = {
    schemaVersion: 2,
    id: config.id,
    title: config.title,
    description: `${config.audience.description} This original, research-backed path uses repeated retrieval, cumulative artifacts, changed-case labs, stakeholder projects, and a performance exam.`,
    outcomes: config.scope.includes.map(
      (entry) =>
        `Demonstrate ${entry.toLowerCase()} through an independently verified stakeholder artifact.`
    ),
    sharedRequirements: blueprint.sharedRequirements ?? config.sharedRequirements ?? [],
    prerequisites: blueprint.pathways.prerequisiteCourseIds,
    competencies: blueprint.competencies,
    moduleIds: modules.map((module) => module.id),
    estimatedHours: Math.round((totalMinutes / 60) * 10) / 10,
    credential: {
      title: `${config.title} Certificate`,
      requiredProjectIds: projectActivityIds,
      finalExamId: exam.id,
      passingPercent: config.masteryThresholdPercent,
    },
    status: 'preview',
  };
  const removeStaleGeneratedJson = async (root, expectedIds) => {
    const expectedFiles = new Set(expectedIds.map((id) => `${id}.json`));
    const fileNames = await readdir(root);
    await Promise.all(
      fileNames
        .filter((fileName) => fileName.endsWith('.json') && !expectedFiles.has(fileName))
        .map((fileName) => unlink(path.join(root, fileName)))
    );
  };
  await removeStaleGeneratedJson(
    moduleRoot,
    modules.map((module) => module.id)
  );
  await removeStaleGeneratedJson(
    activityRoot,
    activities.map((activity) => activity.id)
  );
  await writeFile(path.join(courseRoot, 'course.json'), `${JSON.stringify(course, null, 2)}\n`);

  return {
    courseId: config.id,
    modules: modules.length,
    activities: activities.length,
    steps: activities.reduce((sum, activity) => sum + activity.steps.length, 0),
    checks: activities.reduce((sum, activity) => sum + activity.checks.length, 0),
  };
}

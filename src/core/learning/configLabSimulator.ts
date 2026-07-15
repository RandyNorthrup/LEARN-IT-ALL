import { evaluateQualityGates } from './qualityGateSimulator';

interface ConfigCriterion {
  id: string;
  label: string;
  patterns: RegExp[];
  remediation: string;
}

const SKILL_CRITERIA: ConfigCriterion[] = [
  {
    id: 'name',
    label: 'Stable skill name',
    patterns: [/^\s*name\s*:/im],
    remediation: 'Add a stable name field.',
  },
  {
    id: 'description',
    label: 'Discovery description',
    patterns: [/^\s*description\s*:/im],
    remediation: 'Describe what the skill does and when it applies.',
  },
  {
    id: 'triggers',
    label: 'Trigger contract',
    patterns: [/^\s*triggers?\s*:/im, /\bwhen to use\b/i],
    remediation: 'Define explicit and implicit trigger behavior.',
  },
  {
    id: 'instructions',
    label: 'Progressive instructions',
    patterns: [/^\s*instructions?\s*:/im],
    remediation: 'Add bounded operating instructions.',
  },
  {
    id: 'constraints',
    label: 'Authority boundaries',
    patterns: [/^\s*constraints?\s*:/im, /\bdo not\b/i],
    remediation: 'State safety, authority, and scope limits.',
  },
  {
    id: 'verification',
    label: 'Evaluation cases',
    patterns: [/^\s*verification\s*:/im, /^\s*evals?\s*:/im],
    remediation: 'Add positive, negative, and changed-context evaluations.',
  },
];

const MCP_CRITERIA: ConfigCriterion[] = [
  {
    id: 'transport',
    label: 'Transport',
    patterns: [/^\s*transport\s*:/im],
    remediation: 'Name STDIO or Streamable HTTP transport.',
  },
  {
    id: 'tools',
    label: 'Tool surface',
    patterns: [/^\s*tools?\s*:/im],
    remediation: 'Declare narrowly scoped tools.',
  },
  {
    id: 'input',
    label: 'Input schema',
    patterns: [/^\s*input[-_ ]schema\s*:/im],
    remediation: 'Provide a strict input schema.',
  },
  {
    id: 'output',
    label: 'Output schema',
    patterns: [/^\s*output[-_ ]schema\s*:/im],
    remediation: 'Provide a structured output schema.',
  },
  {
    id: 'authorization',
    label: 'Authorization',
    patterns: [/^\s*auth(?:orization)?\s*:/im],
    remediation: 'Define least-privilege authorization and token handling.',
  },
  {
    id: 'approval',
    label: 'Consequential approval',
    patterns: [/^\s*approval\s*:/im],
    remediation: 'Mark consequential actions for informed approval.',
  },
  {
    id: 'errors',
    label: 'Typed failure behavior',
    patterns: [/^\s*errors?\s*:/im],
    remediation: 'Return actionable typed errors without leaking secrets.',
  },
];

const DOCKER_CRITERIA: ConfigCriterion[] = [
  {
    id: 'artifact',
    label: 'Named Docker artifact',
    patterns: [
      /^\s*artifact\s*:/im,
      /^\s*(?:services|target\s+"[^"]+")\s*(?::|\{)/im,
      /^\s*FROM\s+/im,
    ],
    remediation:
      'Name the Dockerfile, Compose, Bake, runtime, network, storage, or release artifact being changed.',
  },
  {
    id: 'immutable',
    label: 'Immutable identity',
    patterns: [
      /@sha256:/i,
      /\bdigest[-_ ]pinned\b/i,
      /\bimmutable[-_ ](?:image|registry|identity|config)/i,
    ],
    remediation: 'Record the reviewed image digest or another explicit immutable release identity.',
  },
  {
    id: 'build',
    label: 'Build and context boundary',
    patterns: [/\b(?:buildx|buildkit|dockerfile|build[-_ ]context|COPY\s+--from|--mount=type=)\b/i],
    remediation:
      'Define build context, Dockerfile, BuildKit, cache, stage, mount, or output evidence.',
  },
  {
    id: 'lifecycle',
    label: 'Process and lifecycle contract',
    patterns: [
      /\b(?:entrypoint|PID\s*1|stop_grace_period|healthcheck|restart|graceful[-_ ]shutdown)\b/i,
    ],
    remediation:
      'State process ownership, signal, shutdown, health, restart, or resource behavior.',
  },
  {
    id: 'state',
    label: 'Storage or network state',
    patterns: [
      /\b(?:volume|mount[-_ ]type|restore[-_ ]test|network|service[-_ ]discovery|host[-_ ]binding|published)\b/i,
    ],
    remediation:
      'Define persistent storage, backup/restore, network, DNS, or port-publishing state.',
  },
  {
    id: 'privilege',
    label: 'Least-privilege boundary',
    patterns: [
      /\b(?:non[-_ ]root|read_only|cap_drop|no-new-privileges|rootless|userns|network_mode:\s*none)\b/i,
    ],
    remediation:
      'Remove unnecessary user, capability, filesystem, device, network, or daemon authority.',
  },
  {
    id: 'secrets',
    label: 'Secret and configuration boundary',
    patterns: [
      /\b(?:runtime[-_ ]secret|build[-_ ]secret|secret[-_ ]mount|redact[-_ ]values|public[-_ ]config)\b/i,
    ],
    remediation:
      'Separate public configuration from build and runtime secrets, including redaction and rotation.',
  },
  {
    id: 'verification',
    label: 'Deterministic verification',
    patterns: [/^\s*verify\s*:\s*\S[^\n]*/im],
    remediation:
      'Add a deterministic inspection, render, policy, or changed-case verification command.',
  },
  {
    id: 'failure',
    label: 'Rejected failure',
    patterns: [/^\s*failure\s*:\s*\S/im],
    remediation: 'Name a concrete failure or unsafe claim this evidence rejects.',
  },
  {
    id: 'repair',
    label: 'Repair and transfer evidence',
    patterns: [/^\s*repair\s*:\s*\S/im, /^\s*transfer-boundary\s*:/im],
    remediation:
      'Record the bounded repair, cleanup, and authorized disposable-environment transfer evidence.',
  },
  {
    id: 'supply-chain',
    label: 'Supply-chain and release evidence',
    patterns: [
      /\b(?:sbom|provenance|attestation|signature|vulnerability[-_ ]policy|approved[-_ ]digest)\b/i,
    ],
    remediation:
      'Bind source, inputs, output digest, SBOM, provenance, signature, scan policy, and promotion evidence.',
  },
];

const KUBERNETES_CRITERIA: ConfigCriterion[] = [
  {
    id: 'object',
    label: 'API object and artifact identity',
    patterns: [
      /^\s*artifact\s*:/im,
      /\bapiVersion:\s*\S+[\s\S]*?\bkind:\s*\S+/i,
      /\b(?:manifest|api[-_ ]object|custom[-_ ]resource)\b/i,
    ],
    remediation: 'Name the manifest, API version, kind, namespace, and stable object identity.',
  },
  {
    id: 'reconciliation',
    label: 'Desired and observed state',
    patterns: [
      /\b(?:desired[-_ ]state|observed[-_ ]status|observedGeneration|reconcil(?:e|iation)|status[-_ ]condition)\b/i,
    ],
    remediation: 'Separate desired spec from observed status, conditions, events, and convergence.',
  },
  {
    id: 'release',
    label: 'Immutable release and rollout',
    patterns: [
      /@sha256:/i,
      /\b(?:digest[-_ ]pinned|immutable[-_ ]release|rollout[-_ ]status|rollback[-_ ]evidence|same[-_ ]artifact)\b/i,
    ],
    remediation: 'Bind rollout, promotion, and rollback to one immutable release identity.',
  },
  {
    id: 'workload',
    label: 'Workload lifecycle and health',
    patterns: [
      /\b(?:Pod|Deployment|StatefulSet|DaemonSet|CronJob|startupProbe|readinessProbe|livenessProbe|graceful[-_ ]termination|resource[-_ ]requests)\b/i,
    ],
    remediation:
      'Define controller, lifecycle, probe, resource, termination, and restart behavior.',
  },
  {
    id: 'network',
    label: 'Traffic and discovery contract',
    patterns: [
      /\b(?:Service|EndpointSlice|Gateway|HTTPRoute|Ingress|NetworkPolicy|cluster[-_ ]dns|service[-_ ]discovery)\b/i,
    ],
    remediation:
      'Trace selector, endpoint, DNS, route, policy, TLS, and traffic-direction evidence.',
  },
  {
    id: 'storage',
    label: 'Persistent state and recovery',
    patterns: [
      /\b(?:PersistentVolume|PersistentVolumeClaim|StorageClass|volumeSnapshot|reclaim[-_ ]policy|restore[-_ ]test|application[-_ ]consistent)\b/i,
    ],
    remediation:
      'Define storage class, claim, topology, reclaim, backup, and clean restore evidence.',
  },
  {
    id: 'placement',
    label: 'Placement and availability',
    patterns: [
      /\b(?:nodeSelector|nodeAffinity|topologySpreadConstraints|taint|toleration|PodDisruptionBudget|HorizontalPodAutoscaler|failure[-_ ]domain)\b/i,
    ],
    remediation: 'State scheduling, failure-domain, disruption, eviction, and scaling constraints.',
  },
  {
    id: 'identity-security',
    label: 'Identity, policy, and secret boundary',
    patterns: [
      /\b(?:ServiceAccount|RoleBinding|ClusterRole|least[-_ ]privilege|Pod[-_ ]Security|securityContext|seccomp|Secret|admission[-_ ]policy)\b/i,
    ],
    remediation: 'Bound service identity, RBAC, admission, workload privilege, and secret access.',
  },
  {
    id: 'observability',
    label: 'Status and incident evidence',
    patterns: [
      /\b(?:events?|previous[-_ ]logs|metrics?|traces?|causal[-_ ]timeline|debug[-_ ]evidence|audit[-_ ]log)\b/i,
    ],
    remediation:
      'Retain status, conditions, events, logs, metrics, traces, and causal incident evidence.',
  },
  {
    id: 'verification',
    label: 'Deterministic verification',
    patterns: [/^\s*verify\s*:\s*\S[^\n]*/im],
    remediation:
      'Add a deterministic schema, render, diff, policy, status, or changed-case review.',
  },
  {
    id: 'failure',
    label: 'Rejected failure',
    patterns: [/^\s*failure\s*:\s*\S/im],
    remediation: 'Name a concrete unsafe object state, platform failure, or unsupported claim.',
  },
  {
    id: 'repair',
    label: 'Repair, rollback, and transfer evidence',
    patterns: [/^\s*repair\s*:\s*\S/im, /^\s*transfer-boundary\s*:/im],
    remediation:
      'Record repair, rollback or cleanup, and authorized disposable-cluster transfer evidence.',
  },
];

const CICD_CRITERIA: ConfigCriterion[] = [
  {
    id: 'identity',
    label: 'Workflow, run, and revision identity',
    patterns: [
      /\b(?:workflow[-_ ]ref|workflow[-_ ]sha|source[-_ ]revision|run[-_ ]id|run[-_ ]attempt)\b/i,
    ],
    remediation:
      'Bind the event, workflow file, workflow SHA, source revision, run ID, and attempt.',
  },
  {
    id: 'trust',
    label: 'Event, permission, and trust boundary',
    patterns: [
      /\b(?:pull_request_target|fork[-_ ]policy|permissions?|token[-_ ]scope|untrusted[-_ ]input|producer[-_ ]trust)\b/i,
    ],
    remediation:
      'State event trust, actor, fork policy, least permissions, and data-versus-code handling.',
  },
  {
    id: 'runner-toolchain',
    label: 'Runner and reproducible toolchain',
    patterns: [
      /\b(?:ephemeral[-_ ]runner|runner[-_ ]image|node:\s*24|node[-_ ]24|typescript[-_ ]native:\s*7\.0\.2|typescript[-_ ]api[-_ ]compatibility:\s*6\.0\.2|npm[-_ ]ci|frozen[-_ ]lock)\b/i,
    ],
    remediation:
      'Name runner isolation, supported action runtime, Node, TypeScript, npm, and lockfile behavior.',
  },
  {
    id: 'gates-tests',
    label: 'Quality gates and changed-case tests',
    patterns: [
      /\b(?:required[-_ ]check|quality[-_ ]gate|lint|type[-_ ]check|test[-_ ]layers|changed[-_ ]case|service[-_ ]health)\b/i,
    ],
    remediation:
      'Define deterministic gate order, exit semantics, test layers, changed cases, and ownership.',
  },
  {
    id: 'state-handoff',
    label: 'Outputs, artifacts, and cache integrity',
    patterns: [
      /\b(?:job[-_ ]output|artifact[-_ ]digest|immutable[-_ ]artifact|cache[-_ ]key|cache[-_ ]writer|retention)\b/i,
    ],
    remediation:
      'Separate typed outputs, immutable artifacts, and disposable caches by identity and trust.',
  },
  {
    id: 'bounded-execution',
    label: 'Concurrency, timeout, retry, and cleanup',
    patterns: [
      /\b(?:concurrency|cancel[-_ ]in[-_ ]progress|timeout|retry[-_ ]policy|idempotenc|cleanup[-_ ]evidence|stale[-_ ]run)\b/i,
    ],
    remediation:
      'Bound concurrency, staleness, timeouts, retries, cancellation, idempotency, and cleanup.',
  },
  {
    id: 'supply-chain',
    label: 'Action and artifact supply chain',
    patterns: [
      /\b(?:full[-_ ]sha|sha[-_ ]pinned|sbom|provenance|attestation|slsa|signature|verified[-_ ]action)\b/i,
    ],
    remediation:
      'Pin and review actions, bind source and build inputs, and verify SBOM, provenance, and attestations.',
  },
  {
    id: 'image-release',
    label: 'Container build and immutable release',
    patterns: [
      /\b(?:buildx|build[-_ ]push|image[-_ ]digest|manifest[-_ ]index|multiplatform|same[-_ ]artifact|build[-_ ]once)\b/i,
    ],
    remediation:
      'Bind Buildx inputs, platform tests, output digest, promotion, and rollback to one artifact.',
  },
  {
    id: 'identity-environment',
    label: 'OIDC, environment, and cloud authority',
    patterns: [
      /\b(?:oidc|id[-_ ]token|workload[-_ ]identity|environment[-_ ]approval|audience|subject[-_ ]claim|service[-_ ]account)\b/i,
    ],
    remediation:
      'Constrain OIDC claims, environment approval, cloud identity, permissions, and audit evidence.',
  },
  {
    id: 'deployment-recovery',
    label: 'Progressive deployment and recovery',
    patterns: [
      /\b(?:cloud[-_ ]run|no[-_ ]traffic|revision[-_ ]identity|traffic[-_ ]split|canary|abort[-_ ]signal|rollback|rollforward)\b/i,
    ],
    remediation:
      'Deploy one immutable revision, verify readiness, move bounded traffic, and rehearse rollback.',
  },
  {
    id: 'verification',
    label: 'Deterministic verification',
    patterns: [/^\s*verify\s*:\s*\S/im],
    remediation: 'Add deterministic workflow, graph, artifact, policy, or release verification.',
  },
  {
    id: 'failure-repair',
    label: 'Rejected failure, repair, and transfer',
    patterns: [/^\s*failure\s*:\s*\S/im, /^\s*repair\s*:\s*\S/im, /^\s*transfer-boundary\s*:/im],
    remediation:
      'Name a concrete failure, bounded repair or rollback, and authorized live-system transfer evidence.',
  },
];

const PORTFOLIO_CRITERIA: ConfigCriterion[] = [
  {
    id: 'stakeholder-decision',
    label: 'Stakeholder and decision',
    patterns: [
      /^\s*stakeholder\s*:(?![ \t]*(?:\[|todo\b))[ \t]*.{12,}[\s\S]*?^\s*decision\s*:(?![ \t]*(?:\[|todo\b))[ \t]*.{12,}/im,
    ],
    remediation:
      'Name affected people, the accountable stakeholder, and the decision this evidence changes.',
  },
  {
    id: 'problem-evidence',
    label: 'Problem and counterevidence',
    patterns: [/^\s*problem-evidence\s*:(?![ \t]*(?:\[|todo\b))[ \t]*.{12,}/im],
    remediation: 'Link observed need, existing alternatives, counterevidence, and uncertainty.',
  },
  {
    id: 'accessibility',
    label: 'Accessibility and human review',
    patterns: [/^\s*accessibility\s*:(?![ \t]*(?:\[|todo\b))[ \t]*.{12,}/im],
    remediation:
      'Define keyboard, structure, reflow, status, alternatives, and knowledgeable human review.',
  },
  {
    id: 'security',
    label: 'Security and abuse boundary',
    patterns: [/^\s*security\s*:(?![ \t]*(?:\[|todo\b))[ \t]*.{12,}/im],
    remediation: 'Name threat, authorization, abuse, response, and residual-risk evidence.',
  },
  {
    id: 'privacy',
    label: 'Privacy lifecycle',
    patterns: [/^\s*privacy\s*:(?![ \t]*(?:\[|todo\b))[ \t]*.{12,}/im],
    remediation: 'Define purpose, minimization, retention, access, correction, and deletion.',
  },
  {
    id: 'testing',
    label: 'Changed-case test strategy',
    patterns: [/^\s*test-strategy\s*:(?![ \t]*(?:\[|todo\b))[ \t]*.{12,}/im],
    remediation:
      'Map behavior, changed, fault, accessibility, security, and recovery claims to tests.',
  },
  {
    id: 'release',
    label: 'Release identity and provenance',
    patterns: [/^\s*release-evidence\s*:(?![ \t]*(?:\[|todo\b))[ \t]*.{12,}/im],
    remediation:
      'Bind revision, artifact, inventory, provenance, validation, deployment, and rollback.',
  },
  {
    id: 'recovery',
    label: 'Recovery and reconciliation',
    patterns: [/^\s*recovery\s*:(?![ \t]*(?:\[|todo\b))[ \t]*.{12,}/im],
    remediation: 'Define backup, clean restore, reconciliation, communication, and ownership.',
  },
  {
    id: 'portfolio-proof',
    label: 'Contribution and defense proof',
    patterns: [/^\s*portfolio-proof\s*:(?![ \t]*(?:\[|todo\b))[ \t]*.{12,}/im],
    remediation:
      'Disclose contribution, assistance, limits, counterexamples, and unseen defense evidence.',
  },
  {
    id: 'verification',
    label: 'Deterministic verification',
    patterns: [/^\s*verify\s*:\s*\S/im],
    remediation:
      'Add a deterministic artifact, behavior, human-evidence, or recovery verification.',
  },
  {
    id: 'failure-repair',
    label: 'Rejected failure and causal repair',
    patterns: [/^\s*failure\s*:\s*\S[^\n]*[\s\S]*?^\s*repair\s*:\s*\S[^\n]*/im],
    remediation:
      'Name the unsupported claim or failure and its cause-level repair and regression evidence.',
  },
  {
    id: 'transfer',
    label: 'Controlled transfer boundary',
    patterns: [/^\s*transfer-boundary\s*:\s*\S/im],
    remediation:
      'Name the authorized research, toolchain, deployment, review, and production transfer gates.',
  },
];

const CAREER_CRITERIA: ConfigCriterion[] = [
  {
    id: 'target-role',
    label: 'Target role and work outcomes',
    patterns: [/^\s*target-role\s*:(?![ \t]*(?:\[|todo\b))[ \t]*.{12,}/im],
    remediation: 'Name a bounded role family, level, work outcomes, and material constraints.',
  },
  {
    id: 'jurisdiction',
    label: 'Jurisdiction and current authority',
    patterns: [/^\s*jurisdiction\s*:(?![ \t]*(?:\[|todo\b))[ \t]*.{12,}/im],
    remediation:
      'Name the location, source date, governing official guidance, and qualified-review boundary.',
  },
  {
    id: 'audience',
    label: 'Audience and review context',
    patterns: [/^\s*audience\s*:(?![ \t]*(?:\[|todo\b))[ \t]*.{12,}/im],
    remediation: 'Define the reviewer need, available time, format, and access context.',
  },
  {
    id: 'claim',
    label: 'Truthful bounded claim',
    patterns: [/^\s*claim\s*:(?![ \t]*(?:\[|todo\b))[ \t]*.{12,}/im],
    remediation:
      'State one role-relevant behavior claim without invented impact, hidden assistance, or inflated mastery.',
  },
  {
    id: 'evidence',
    label: 'Revision-linked evidence',
    patterns: [/^\s*evidence\s*:(?![ \t]*(?:\[|todo\b))[ \t]*.{12,}/im],
    remediation:
      'Link revision, artifact, observation, changed case, personal contribution, and explicit limit.',
  },
  {
    id: 'process-state',
    label: 'Hiring process state',
    patterns: [
      /^\s*process-state\s*:\s*(?:discover|investigate|apply|interview|offer|close|archive)\b/im,
    ],
    remediation:
      'Name the current discover, investigate, apply, interview, offer, close, or archive state.',
  },
  {
    id: 'accessibility',
    label: 'Accessible artifact and process',
    patterns: [/^\s*accessibility\s*:(?![ \t]*(?:\[|todo\b))[ \t]*.{12,}/im],
    remediation:
      'Define keyboard, structure, reflow, focus, status, alternative format, and human review.',
  },
  {
    id: 'privacy-consent',
    label: 'Privacy and consent boundary',
    patterns: [/^\s*privacy-consent\s*:(?![ \t]*(?:\[|todo\b))[ \t]*.{12,}/im],
    remediation:
      'Define purpose, minimization, permission, contact choice, retention, deletion, and third-party protection.',
  },
  {
    id: 'decision',
    label: 'Learner-owned decision and stop rule',
    patterns: [/^\s*decision\s*:(?![ \t]*(?:\[|todo\b))[ \t]*.{12,}/im],
    remediation:
      'Name the learner-controlled next decision, accountable evidence, uncertainty, and stop rule.',
  },
  {
    id: 'verification',
    label: 'Deterministic verification',
    patterns: [/^\s*verify\s*:\s*\S[^\n]*/im],
    remediation:
      'Add deterministic link, extraction, revision, changed-case, disclosure, permission, and source-date checks.',
  },
  {
    id: 'failure-repair',
    label: 'Rejected failure and causal repair',
    patterns: [/^\s*failure\s*:\s*\S[^\n]*[\s\S]*?^\s*repair\s*:\s*\S[^\n]*/im],
    remediation:
      'Name the deceptive, unsafe, inaccessible, or unsupported case and its cause-level repair.',
  },
  {
    id: 'transfer',
    label: 'Learner-controlled transfer boundary',
    patterns: [/^\s*transfer-boundary\s*:\s*\S[^\n]*/im],
    remediation:
      'Keep profiles, applications, contact, interviews, negotiation, and offer decisions learner approved.',
  },
];

function evaluateCriteria(source: string, criteria: ConfigCriterion[]) {
  return criteria.map((criterion) => {
    const match = criterion.patterns
      .map((pattern) => source.match(pattern))
      .find((candidate) => candidate?.[0]);
    return {
      id: criterion.id,
      label: criterion.label,
      passed: Boolean(match),
      evidence: match?.[0].trim() ?? criterion.remediation,
    };
  });
}

export type ConfigWorkspaceKind =
  | 'quality'
  | 'skill'
  | 'mcp'
  | 'docker'
  | 'kubernetes'
  | 'cicd'
  | 'portfolio'
  | 'career';

export function detectConfigWorkspace(source: string): ConfigWorkspaceKind {
  if (/^workspace\s*:\s*career\b/im.test(source)) return 'career';
  if (/^workspace\s*:\s*portfolio\b/im.test(source)) return 'portfolio';
  if (/^workspace\s*:\s*cicd\b/im.test(source)) return 'cicd';
  if (/^workspace\s*:\s*kubernetes\b/im.test(source)) return 'kubernetes';
  if (/^workspace\s*:\s*docker\b/im.test(source)) return 'docker';
  if (/^workspace\s*:\s*mcp\b/im.test(source)) return 'mcp';
  if (/^workspace\s*:\s*skill\b/im.test(source)) return 'skill';
  return 'quality';
}

export function evaluateConfigContract(source: string, kind: ConfigWorkspaceKind) {
  if (kind === 'quality') return evaluateQualityGates(source);
  if (kind === 'docker') return evaluateCriteria(source, DOCKER_CRITERIA);
  if (kind === 'kubernetes') return evaluateCriteria(source, KUBERNETES_CRITERIA);
  if (kind === 'cicd') return evaluateCriteria(source, CICD_CRITERIA);
  if (kind === 'career') return evaluateCriteria(source, CAREER_CRITERIA);
  if (kind === 'portfolio') return evaluateCriteria(source, PORTFOLIO_CRITERIA);
  return evaluateCriteria(source, kind === 'mcp' ? MCP_CRITERIA : SKILL_CRITERIA);
}

export function formatConfigLabReport(source: string): string {
  if (source.trim().length === 0)
    return 'No manifest supplied. Add a workspace contract, then run review.';
  const kind = detectConfigWorkspace(source);
  const results = evaluateConfigContract(source, kind);
  const passed = results.filter((result) => result.passed).length;
  const labels = {
    quality: 'QUALITY GATE REVIEW',
    skill: 'AGENT SKILL REVIEW',
    mcp: 'MCP CONTRACT REVIEW',
    docker: 'DOCKER CONTRACT REVIEW',
    kubernetes: 'KUBERNETES CONTRACT REVIEW',
    cicd: 'CI/CD CONTRACT REVIEW',
    portfolio: 'PRODUCT EVIDENCE REVIEW',
    career: 'CAREER EVIDENCE REVIEW',
  };
  return [
    `${labels[kind]}: ${passed}/${results.length}`,
    ...results.map(
      (result) => `${result.passed ? 'PASS' : 'MISS'}  ${result.label} — ${result.evidence}`
    ),
    '',
    passed === results.length
      ? 'Baseline contract is represented. Continue with positive, negative, changed-case, and hostile evaluation.'
      : 'Missing contract fields remain. Add or justify each field before integration.',
    'Safety: this review analyzes text and never executes learner commands.',
  ].join('\n');
}

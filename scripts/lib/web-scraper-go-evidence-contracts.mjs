function escaped(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function profile(
  task,
  totalName,
  acceptedName,
  changedName,
  defectName,
  minimumTotal,
  minimumAccepted,
  minimumChanged,
  label
) {
  const checks = [
    [`${totalName} < ${minimumTotal}`, totalName, `${totalName}-depth`],
    [
      `${acceptedName} < ${minimumAccepted} || ${acceptedName} > ${totalName}`,
      acceptedName,
      `${acceptedName}-bound`,
    ],
    [`${changedName} < ${minimumChanged}`, changedName, `${changedName}-depth`],
    [`${defectName} > 0`, defectName, `${defectName}-present`],
  ];
  return {
    task,
    parameters: `${totalName} int, ${acceptedName} int, ${changedName} int, ${defectName} int`,
    anchors: checks.map(([condition]) => escaped(condition)),
    body: `${checks.map(([condition, metric, failure]) => `\tif ${condition} { return false, ${metric}, "${failure}" }`).join('\n')}
\tif !(${acceptedName} <= ${totalName} && ${changedName} >= ${minimumChanged} && ${defectName} == 0) { return false, ${acceptedName}, "invariant" }
\treturn true, ${acceptedName}, "${label}"`,
  };
}

const SPECS = {
  'crawler-go-outcomes-owner-duty': profile(
    'gate owner permission, stakeholder value, privacy minimization, legal routing, and evidence layers',
    'charterCases',
    'provenCases',
    'revocationCases',
    'authorityGaps',
    10,
    8,
    4,
    'owner-approved-charter'
  ),
  'crawler-go-toolchain-module-reproduction': profile(
    'reconcile Go, pinned modules, build identity, clean gates, and baseline recovery',
    'cleanGates',
    'passedGates',
    'binarySmokes',
    'versionGaps',
    12,
    11,
    4,
    'reproducible-go-crawler'
  ),
  'crawler-go-packages-ownership-lifecycle': profile(
    'prove directed packages, value ownership, interfaces, resources, errors, and lifecycle closure',
    'ownedResources',
    'closedResources',
    'errorCases',
    'leakedOwners',
    14,
    13,
    6,
    'owned-go-architecture'
  ),
  'crawler-go-crawl-charter-scope': profile(
    'admit seeds through owner, origin, path, method, query, budget, kill, and contact policy',
    'candidatePaths',
    'admittedPaths',
    'stopCases',
    'scopeEscapes',
    14,
    5,
    5,
    'bounded-crawl-charter'
  ),
  'crawler-go-neturl-identity-scope': profile(
    'reconcile net/url structure, references, escaping, IDNA, host identity, and conservative keys',
    'urlCases',
    'stableKeys',
    'boundaryCases',
    'unsafeMerges',
    16,
    9,
    6,
    'conservative-go-url-key'
  ),
  'crawler-go-robots-rfc9309-conformance': profile(
    'prove RFC 9309 matching, response states, caching, Go package conformance, and extension restraint',
    'robotsFixtures',
    'conformantFixtures',
    'failureCases',
    'unsafeAllows',
    16,
    15,
    6,
    'rfc9309-go-adapter'
  ),
  'crawler-go-sitemap-streaming-xml': profile(
    'stream bounded sitemap XML and index graphs through host, scope, hint, and provenance admission',
    'sitemapEntries',
    'accountedEntries',
    'indexCases',
    'unboundedEdges',
    15,
    14,
    5,
    'bounded-sitemap-graph'
  ),
  'crawler-go-http-transport-body': profile(
    'prove Transport reuse, request identity, redirect checks, body limits, deadlines, and closure',
    'httpCases',
    'closedBodies',
    'timeoutCases',
    'liveBodies',
    15,
    14,
    5,
    'owned-http-retrieval'
  ),
  'crawler-go-dial-ssrf-defense': profile(
    'block unsafe schemes, netip classes, mixed DNS, rebinding, proxy, metadata, and redirect destinations',
    'destinationCases',
    'classifiedCases',
    'blockedCases',
    'privateConnections',
    18,
    17,
    8,
    'controlled-dial-defense'
  ),
  'crawler-go-representation-decoding': profile(
    'reconcile wire and decoded budgets, coding chains, media, charsets, partial bodies, and stage digests',
    'representationCases',
    'accountedCases',
    'rejectedCases',
    'partialRecords',
    15,
    14,
    5,
    'decoded-representation-ledger'
  ),
  'crawler-go-html-tokenizer-goquery': profile(
    'prove tokenizer versus tree choice, goquery documents, malformed repair, browser differentials, and budgets',
    'htmlFixtures',
    'explainedTrees',
    'differentialCases',
    'unboundedTrees',
    16,
    15,
    5,
    'evidenced-go-html-tree'
  ),
  'crawler-go-selector-typed-extraction': profile(
    'prove selector scope, cardinality, domain constructors, field normalization, and drift evidence',
    'fieldCases',
    'accountedFields',
    'rejectedFields',
    'silentFallbacks',
    18,
    17,
    5,
    'typed-go-extraction'
  ),
  'crawler-go-record-provenance-quality': profile(
    'reconcile versioned records, field lineage, rejection ledgers, counts, corrections, and deletions',
    'sourceFields',
    'accountedFields',
    'correctionCases',
    'lineageGaps',
    16,
    15,
    5,
    'auditable-go-records'
  ),
  'crawler-go-link-graph-semantics': profile(
    'classify link elements, base and relation semantics, rejected references, and provenance-rich graph edges',
    'linkCases',
    'classifiedLinks',
    'relationCases',
    'unexplainedEdges',
    18,
    17,
    6,
    'semantic-link-graph'
  ),
  'crawler-go-frontier-queue-state': profile(
    'prove legal frontier transitions, reserve-on-schedule, stable heap order, one owner, and state invariants',
    'stateTransitions',
    'legalTransitions',
    'scheduleCases',
    'lostItems',
    20,
    19,
    7,
    'race-safe-frontier'
  ),
  'crawler-go-url-space-traps': profile(
    'contain calendar, query, session, structure, and soft-error traps with bounded incident evidence',
    'trapCases',
    'containedCases',
    'spaceChanges',
    'runawayBranches',
    16,
    15,
    6,
    'contained-url-space'
  ),
  'crawler-go-origin-politeness-retry': profile(
    'prove per-origin state, start spacing, retry classes, Retry-After, bounded jitter, and fairness',
    'scheduleEvents',
    'fairEvents',
    'clockCases',
    'spacingViolations',
    18,
    17,
    6,
    'publisher-fair-go-schedule'
  ),
  'crawler-go-worker-pool-context': profile(
    'prove multiresource backpressure, channel ownership, context causes, error aggregation, and graceful join',
    'workerItems',
    'settledItems',
    'cancelCases',
    'leakedGoroutines',
    18,
    17,
    6,
    'bounded-go-worker-pool'
  ),
  'crawler-go-colly-callback-adapter': profile(
    'map Colly lifecycle, policy, callbacks, storage, and differentials without losing owned invariants',
    'frameworkCases',
    'reconciledCases',
    'asyncCases',
    'policyGaps',
    16,
    15,
    6,
    'policy-preserving-colly'
  ),
  'crawler-go-checkpoint-resume-state': profile(
    'prove durable-state boundaries, versioned formats, atomic replacement, in-flight recovery, and offline audit',
    'checkpointCases',
    'recoveredCases',
    'crashPoints',
    'lostRecords',
    14,
    13,
    6,
    'crash-consistent-go-state'
  ),
  'crawler-go-content-change-dedup': profile(
    'separate digest stages, exact and near identity, change classes, versions, tombstones, and deletion',
    'observationCases',
    'classifiedCases',
    'changedVersions',
    'falseMerges',
    18,
    17,
    6,
    'versioned-content-ledger'
  ),
  'crawler-go-search-metadata-signals': profile(
    'reconcile visible purpose, canonicals, index directives, hreflang graphs, JSON-LD, and non-claims',
    'metadataSignals',
    'explainedSignals',
    'conflictCases',
    'rankingClaims',
    18,
    17,
    6,
    'cross-signal-search-audit'
  ),
  'crawler-go-static-accessibility-evidence': profile(
    'map static image, structure, semantics, interaction risks, uncertainty, and WCAG review boundaries',
    'staticChecks',
    'evidencedChecks',
    'reviewCases',
    'conformanceClaims',
    18,
    17,
    6,
    'bounded-static-a11y'
  ),
  'crawler-go-resource-delivery-audit': profile(
    'reconcile resource graph, size dimensions, cache evidence, budgets, and performance non-claims',
    'resourceCases',
    'accountedResources',
    'budgetChanges',
    'fieldClaims',
    18,
    17,
    5,
    'bounded-resource-report'
  ),
  'crawler-go-dynamic-browser-service-boundary': profile(
    'prove render necessity, typed browser port, subresource policy, untrusted results, and lifecycle evidence',
    'browserCases',
    'accountedCases',
    'readinessChanges',
    'policyEscapes',
    14,
    13,
    5,
    'least-authority-browser-port'
  ),
  'crawler-go-session-security-privacy': profile(
    'defend authenticated authority, secrets, request effects, output sinks, retention, and derived privacy state',
    'securityCases',
    'containedCases',
    'revocationCases',
    'sensitiveLeaks',
    18,
    17,
    6,
    'secure-private-crawl-boundary'
  ),
  'crawler-go-accessible-report-formats': profile(
    'prove streaming JSON, CSV dialect, deterministic order, accessible HTML, and remediation lineage',
    'reportCases',
    'accessibleCases',
    'correctionCases',
    'orphanFindings',
    18,
    17,
    6,
    'accessible-go-reports'
  ),
  'crawler-go-httptest-fuzz-race': profile(
    'prove original fixtures, RoundTrippers, httptest faults, fuzz and race invariants, and mutation detection',
    'testCases',
    'detectedCases',
    'seededMutations',
    'survivingMutations',
    22,
    21,
    8,
    'risk-layered-go-tests'
  ),
  'crawler-go-operations-deployment-recovery': profile(
    'reconcile telemetry, capacity, durable schedules, immutable deployment, backup, restore, and safe resume',
    'operationCases',
    'ownedCases',
    'recoveryDrills',
    'unownedAlerts',
    20,
    19,
    7,
    'operable-go-crawler'
  ),
  'crawler-go-release-incident-defense': profile(
    'defend release matrices, end-to-end counts, incident drills, rollback containment, non-claims, and risks',
    'releaseGates',
    'passedGates',
    'incidentDrills',
    'openCriticalRisks',
    24,
    23,
    10,
    'defensible-go-crawler-release'
  ),
};

const ENVIRONMENTS = [
  'an owner-approved community information audit',
  'a malformed HTML and parser differential clinic',
  'a mixed-origin fairness and race rehearsal',
  'a redirect, DNS, body, and checkpoint fault exercise',
  'a keyboard-first accessible report review',
  'an isolated binary, deployment, and restore defense',
];

const CHANGES = [
  'change one owner, seed, net/url, robots, sitemap, redirect, DNS, transport, media, or charset condition and reconcile provenance',
  'change one tokenizer, goquery, selector, domain constructor, record, link, frontier, or trap case and retain rejected evidence',
  'reorder one origin, retry, channel, context, goroutine, Colly callback, checkpoint, or shutdown event and prove ownership',
  'change one content version, metadata, accessibility, resource, browser-service, or report condition without overclaiming',
  'inject one session, secret, SSRF, output, path, log, privacy, or retention fault and contain every derivative',
  'change one fuzz, race, mutation, capacity, binary, deployment, incident, restore, rollback, or residual-risk condition and reconcile release evidence',
];

const CONSTRAINTS = [
  'owner permission, robots preference, and legal-review conclusions stay distinct',
  'every URL, body, tree, record, frontier transition, and report row retains causal identity',
  'every body, file, timer, transport, goroutine, channel, collector, and browser-service request needs one owner',
  'failed, canceled, stale, over-budget, and revoked work preserves prior admitted state',
  'browser Go remains deterministic and free of native network, parser, filesystem, process, and host effects',
  'release evidence binds source, modules, build settings, binary or image, configuration, policy, and restored state',
];

function details(seed) {
  const cleaned = seed.replace(/[^a-z0-9]/giu, '').toLowerCase() || '0';
  let value = 2166136261;
  for (const character of cleaned) {
    value ^= character.charCodeAt(0);
    value = Math.imul(value, 16777619);
  }
  value >>>= 0;
  return {
    caseNumber: (value % 9000) + 1000,
    environment: ENVIRONMENTS[value % ENVIRONMENTS.length],
    change: CHANGES[(value >>> 4) % CHANGES.length],
    constraint: CONSTRAINTS[(value >>> 8) % CONSTRAINTS.length],
  };
}

function lookaheads(anchors, scope) {
  return anchors.map((anchor) => `(?=${scope}*?${anchor})`).join('');
}

export function webScraperGoScenario(moduleId, seed, activityKind = 'practice', competency) {
  const spec = SPECS[moduleId];
  if (!spec) throw new Error(`Missing Go crawler scenario profile for ${moduleId}`);
  const chosen = details(seed.toString(36));
  const probe = competency ? ` Competency probe: ${competency.statement}` : '';
  return `A ${activityKind} Go team handles case ${chosen.caseNumber} during ${chosen.environment}. Build deterministic Go evidence to ${spec.task}; ${chosen.constraint}; then ${chosen.change}. Browser Go uses pure bounded models and original URL, robots, sitemap, HTTP, HTML, frontier, accessibility, browser-service, and report fixtures only. Real DNS, sockets, x/net/html, goquery, Colly, files, processes, race, load, assistive-technology review, containers, legal review, restore, and production behavior require explicit controlled transfer gates.${probe}`;
}

export function webScraperGoEvidenceContract({
  competencyId,
  moduleId,
  functionName,
  marker,
  suffix,
}) {
  const spec = SPECS[moduleId];
  if (!spec) throw new Error(`Missing Go crawler evidence profile for ${moduleId}`);
  const chosen = details(suffix);
  const scope = '(?:(?!// Evidence:)[\\s\\S])';
  return {
    marker,
    pattern: `${escaped(marker)}${scope}*?func\\s+${functionName}\\s*\\([^)]*\\)\\s*\\(bool,\\s*int,\\s*string\\)\\s*\\{${lookaheads(spec.anchors, scope)}(?=${scope}*?return)${scope}*?return`,
    example: `${marker}
// Competency: ${competencyId}.
// Case ${chosen.caseNumber}: ${chosen.environment}.
// Operating constraint: ${chosen.constraint}.
// Changed case: ${chosen.change}.
func ${functionName}(${spec.parameters}) (bool, int, string) {
\tevidenceVariant${suffix} := "${suffix}-${[...suffix].reverse().join('')}-${chosen.caseNumber}"
\tif evidenceVariant${suffix} == "" { return false, 0, "variant" }
${spec.body}
}
`,
    requirement: `Append a compile-ready pure-Go function headed "${marker}" that uses case ${chosen.caseNumber} to ${spec.task}. Return observable changed-case evidence. Browser code must not open sockets, resolve DNS, import x/net/html, goquery, Colly, or robotstxt, access host files, retain credentials, launch processes or unbounded goroutines, or claim native parser, race, load, accessibility, privacy, legal, container, restore, or production behavior; verify those boundaries later with Go 1.26.5, x/net 0.57.0, goquery 1.12.0, Colly 2.3.0, robotstxt 1.1.2, original fixtures, custom RoundTrippers, httptest servers, controlled DNS and browser-service environments, race and fuzz runs, subprocesses, inspected binaries and containers, accessibility review, capacity, backup, restore, rollback, legal review, and release gates.`,
  };
}

export function webScraperGoWorkedExample(moduleId, seed) {
  return webScraperGoEvidenceContract({
    competencyId: `crawler-go-worked-${moduleId}-${seed}`,
    moduleId,
    functionName: `worked_${moduleId.replaceAll('-', '_')}_${seed}`,
    marker: `// Evidence: crawler-go-worked-${moduleId}-${seed}`,
    suffix: `Worked${seed}`,
  }).example;
}

export const webScraperGoEvidenceModuleIds = Object.freeze(Object.keys(SPECS));

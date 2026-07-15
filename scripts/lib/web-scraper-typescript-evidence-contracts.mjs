function escaped(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function profile(task, total, accepted, changed, defects, label) {
  const [totalName, totalDefault, totalMinimum] = total;
  const [acceptedName, acceptedDefault, acceptedMinimum] = accepted;
  const [changedName, changedDefault, changedMinimum] = changed;
  const [defectName, defectDefault] = defects;
  const checks = [
    [`${totalName} < ${totalMinimum}`, totalName, `${totalName}-depth`],
    [
      `${acceptedName} < ${acceptedMinimum} || ${acceptedName} > ${totalName}`,
      acceptedName,
      `${acceptedName}-bound`,
    ],
    [`${changedName} < ${changedMinimum}`, changedName, `${changedName}-depth`],
    [`${defectName} > 0`, defectName, `${defectName}-present`],
  ];
  return {
    task,
    parameters: `${totalName} = ${totalDefault}, ${acceptedName} = ${acceptedDefault}, ${changedName} = ${changedDefault}, ${defectName} = ${defectDefault}`,
    anchors: checks.map(([condition]) => escaped(condition)),
    body: `${checks.map(([condition, metric, failure]) => `  if (${condition}) return { ok: false, metric: ${metric}, label: "${failure}" };`).join('\n')}
  if (!(${acceptedName} <= ${totalName} && ${changedName} >= ${changedMinimum} && ${defectName} === 0)) return { ok: false, metric: ${acceptedName}, label: "invariant" };
  return { ok: true, metric: ${acceptedName}, label: "${label}" };`,
  };
}

const SPECS = {
  'crawler-ts-outcomes-authorization-charter': profile(
    'gate useful owner-authorized, privacy-minimized, inclusive crawl outcomes and claim layers',
    ['charterCases', 12, 10],
    ['provenCases', 11, 9],
    ['revocationCases', 6, 4],
    ['authorityGaps', 0],
    'authorized-crawl-charter'
  ),
  'crawler-ts-runtime-emission-repository': profile(
    'reconcile Node, TypeScript, pinned crawler packages, emitted artifacts, clean gates, and recovery anchors',
    ['cleanGates', 14, 12],
    ['passedGates', 14, 12],
    ['emittedSmokes', 6, 4],
    ['unresolvedVersions', 0],
    'reproducible-ts-crawler'
  ),
  'crawler-ts-architecture-async-ownership': profile(
    'prove port direction, admitted values, Promise and AbortSignal ownership, and handle-clean lifecycle',
    ['ownedResources', 15, 12],
    ['settledResources', 15, 12],
    ['abortCases', 8, 6],
    ['leakedHandles', 0],
    'owned-crawler-architecture'
  ),
  'crawler-ts-scope-seeds-budgets': profile(
    'admit authorized seeds through origin, path, query, multiresource budget, stop, and contact policy',
    ['candidatePaths', 14, 12],
    ['admittedPaths', 8, 5],
    ['stopCases', 7, 5],
    ['scopeEscapes', 0],
    'bounded-crawl-scope'
  ),
  'crawler-ts-whatwg-url-identity': profile(
    'reconcile URL parsing, base resolution, fetch identity, conservative keys, IDNA, and rejected schemes',
    ['urlCases', 16, 14],
    ['stableKeys', 12, 9],
    ['boundaryCases', 8, 6],
    ['unsafeMerges', 0],
    'conservative-url-identity'
  ),
  'crawler-ts-robots-rfc9309-adapter': profile(
    'prove RFC 9309 product, group, encoding, longest-match, response-state, cache, and library adapter behavior',
    ['robotsFixtures', 18, 15],
    ['conformantFixtures', 18, 15],
    ['failureCases', 8, 6],
    ['unsafeAllows', 0],
    'rfc9309-adapter'
  ),
  'crawler-ts-sitemap-xml-discovery': profile(
    'admit bounded sitemap XML and index graphs through host, scope, hint, and provenance policy',
    ['sitemapEntries', 16, 13],
    ['admittedEntries', 10, 7],
    ['indexCases', 7, 5],
    ['unboundedEdges', 0],
    'bounded-sitemap-discovery'
  ),
  'crawler-ts-fetch-stream-contract': profile(
    'prove honest Fetch requests, response admission, streaming byte limits, composed timeouts, and cleanup',
    ['fetchCases', 15, 12],
    ['settledBodies', 15, 12],
    ['abortCases', 7, 5],
    ['liveReaders', 0],
    'bounded-fetch-adapter'
  ),
  'crawler-ts-redirect-dns-ssrf': profile(
    'block unsafe schemes, addresses, redirects, rebinding, proxies, and metadata while retaining causal evidence',
    ['destinationCases', 18, 15],
    ['safeDestinations', 8, 5],
    ['blockedDestinations', 10, 8],
    ['privateConnections', 0],
    'connection-time-ssrf-defense'
  ),
  'crawler-ts-bytes-media-encoding': profile(
    'reconcile coding, media, charset, source identity, truncation, and stage-specific digests',
    ['representationCases', 15, 12],
    ['admittedRepresentations', 9, 6],
    ['rejectedRepresentations', 6, 4],
    ['partialRecords', 0],
    'decoded-source-ledger'
  ),
  'crawler-ts-cheerio-html-model': profile(
    'prove Cheerio loading modes, malformed tree repair, parser differentials, budgets, and source-tree distinctions',
    ['htmlFixtures', 16, 13],
    ['explainedTrees', 16, 13],
    ['differentialCases', 7, 5],
    ['unboundedTrees', 0],
    'evidenced-cheerio-tree'
  ),
  'crawler-ts-selectors-runtime-extraction': profile(
    'prove selector cardinality, missingness, unknown runtime validation, field normalization, and drift alarms',
    ['fieldCases', 18, 15],
    ['admittedFields', 12, 8],
    ['rejectedFields', 6, 4],
    ['uncheckedCasts', 0],
    'runtime-validated-extraction'
  ),
  'crawler-ts-provenance-quality-records': profile(
    'reconcile versioned records, field provenance, confidence evidence, quality counts, and corrections',
    ['sourceFields', 16, 13],
    ['accountedFields', 16, 13],
    ['correctionCases', 6, 4],
    ['lineageGaps', 0],
    'loss-aware-records'
  ),
  'crawler-ts-link-semantics-discovery': profile(
    'classify link-bearing elements, base and relation semantics, rejected references, and discovery provenance',
    ['linkCases', 18, 15],
    ['classifiedLinks', 18, 15],
    ['relationCases', 8, 6],
    ['unexplainedLinks', 0],
    'semantic-link-ledger'
  ),
  'crawler-ts-frontier-state-machine': profile(
    'prove legal frontier states, reservation timing, stable priorities, graph evidence, and invariants',
    ['stateTransitions', 20, 16],
    ['legalTransitions', 20, 16],
    ['duplicateSchedules', 6, 4],
    ['lostItems', 0],
    'deterministic-frontier'
  ),
  'crawler-ts-url-traps-space-control': profile(
    'contain calendar, facet, session, template, soft-error, and query-cardinality traps with stop evidence',
    ['trapCases', 16, 13],
    ['containedCases', 16, 13],
    ['spaceChanges', 7, 5],
    ['runawayBranches', 0],
    'bounded-url-space'
  ),
  'crawler-ts-origin-fair-scheduling': profile(
    'prove per-origin eligibility, retry classification, Retry-After, bounded jitter, p-limit boundaries, and clock control',
    ['scheduleEvents', 18, 15],
    ['fairEvents', 18, 15],
    ['clockChanges', 8, 6],
    ['spacingViolations', 0],
    'publisher-fair-schedule'
  ),
  'crawler-ts-bounded-promise-workers': profile(
    'prove multiresource admission, rejection isolation, backpressure, abort propagation, and handle-clean drain',
    ['workerItems', 18, 15],
    ['settledItems', 18, 15],
    ['abortSchedules', 8, 6],
    ['unhandledRejections', 0],
    'bounded-promise-pipeline'
  ),
  'crawler-ts-checkpoint-resume': profile(
    'prove state boundaries, atomic replacement, in-flight recovery, policy-version admission, and resume reconciliation',
    ['checkpointCases', 14, 12],
    ['recoveredCases', 13, 11],
    ['crashPoints', 8, 6],
    ['lostRecords', 0],
    'crash-consistent-checkpoint'
  ),
  'crawler-ts-dedup-change-classification': profile(
    'separate stage digests, exact identity, near-duplicate review, change classes, versions, and tombstones',
    ['observationCases', 18, 15],
    ['classifiedCases', 18, 15],
    ['changedVersions', 8, 6],
    ['falseMerges', 0],
    'versioned-content-evidence'
  ),
  'crawler-ts-indexing-metadata-audit': profile(
    'reconcile title, canonical, robots directives, hreflang graphs, JSON-LD, and explicit search non-claims',
    ['metadataSignals', 18, 15],
    ['explainedSignals', 18, 15],
    ['conflictCases', 8, 6],
    ['rankingClaims', 0],
    'cross-signal-metadata-audit'
  ),
  'crawler-ts-static-accessibility-audit': profile(
    'map static image, structure, language, semantics, and interaction risks to WCAG with review handoff',
    ['staticChecks', 18, 15],
    ['evidencedChecks', 18, 15],
    ['reviewCases', 8, 6],
    ['conformanceClaims', 0],
    'bounded-static-accessibility'
  ),
  'crawler-ts-axe-browser-a11y': profile(
    'prove versioned axe scans across interaction states plus triage, manual coverage, and regression evidence',
    ['pageStates', 14, 12],
    ['reviewedStates', 14, 12],
    ['manualJourneys', 8, 6],
    ['suppressionGaps', 0],
    'stateful-a11y-review'
  ),
  'crawler-ts-resource-performance-audit': profile(
    'reconcile resource graphs, size dimensions, cache context, budgets, and static-versus-user performance claims',
    ['resourceCases', 18, 15],
    ['accountedResources', 18, 15],
    ['budgetChanges', 7, 5],
    ['fieldClaims', 0],
    'bounded-resource-evidence'
  ),
  'crawler-ts-playwright-dynamic-rendering': profile(
    'prove necessity, context isolation, readiness, browser network policy, provenance, and closure',
    ['browserCases', 14, 12],
    ['closedContexts', 14, 12],
    ['readinessChanges', 7, 5],
    ['policyEscapes', 0],
    'isolated-dynamic-rendering'
  ),
  'crawler-ts-authenticated-privacy-boundary': profile(
    'prove least-authority sessions, secrets, safe methods, isolation, minimization, and derived-data deletion',
    ['sessionCases', 14, 12],
    ['isolatedCases', 14, 12],
    ['revocationCases', 7, 5],
    ['sensitiveLeaks', 0],
    'least-authority-session'
  ),
  'crawler-ts-untrusted-content-security': profile(
    'defend HTML, CSV, paths, archives, logs, terminals, and plugins against untrusted crawler content',
    ['payloadCases', 18, 15],
    ['neutralizedCases', 18, 15],
    ['sinkChanges', 8, 6],
    ['unsafeEffects', 0],
    'safe-content-boundary'
  ),
  'crawler-ts-accessible-report-exports': profile(
    'prove JSONL and CSV contracts, accessible HTML, chart alternatives, corrections, and deterministic evidence',
    ['reportCases', 18, 15],
    ['accessibleCases', 18, 15],
    ['correctionCases', 8, 6],
    ['orphanFindings', 0],
    'accessible-report-suite'
  ),
  'crawler-ts-node-test-fault-evidence': profile(
    'prove original fixtures, pure models, compile-negative tests, loopback faults, and mutation detection',
    ['testCases', 22, 18],
    ['detectedCases', 22, 18],
    ['seededMutations', 10, 8],
    ['survivingMutations', 0],
    'risk-layered-ts-tests'
  ),
  'crawler-ts-observability-capacity-operations': profile(
    'reconcile causal telemetry, bounded metrics, event-loop capacity, non-overlap schedules, and runbooks',
    ['operationCases', 18, 15],
    ['ownedCases', 18, 15],
    ['capacityChanges', 8, 6],
    ['unownedAlerts', 0],
    'operable-ts-crawler'
  ),
  'crawler-ts-supply-chain-package-container': profile(
    'prove dependency and browser provenance, package contents, least-authority containers, and immutable rollout',
    ['artifactGates', 18, 15],
    ['passedGates', 18, 15],
    ['platformCases', 7, 5],
    ['untrackedArtifacts', 0],
    'source-bound-crawler-release'
  ),
  'crawler-ts-recovery-release-defense': profile(
    'defend backup objectives, isolated restore, incident drills, release gates, non-claims, and residual-risk ownership',
    ['releaseGates', 26, 22],
    ['passedGates', 26, 22],
    ['incidentDrills', 12, 10],
    ['openCriticalRisks', 0],
    'defensible-ts-crawler-release'
  ),
};

const ENVIRONMENTS = [
  'an authorized municipal service audit',
  'a multilingual archive markup migration',
  'a narrow-screen keyboard and screen-reader review',
  'a hostile redirect, stream, and checkpoint drill',
  'an origin-fairness and event-loop capacity rehearsal',
  'an isolated browser, package, and restore smoke',
];

const CHANGES = [
  'change one owner permission, seed, URL, robots, sitemap, redirect, DNS, media, or encoding decision and reconcile provenance',
  'change one HTML repair, Cheerio mode, selector, unknown value, record schema, link relation, or metadata case and retain rejected evidence',
  'reorder one frontier, p-limit, Promise, AbortSignal, stream, retry, checkpoint, or shutdown event and prove ownership',
  'change one duplicate, accessibility state, axe result, resource budget, browser readiness, or manual-review condition without overclaiming',
  'inject one authenticated, private-data, output-injection, path, log, plugin, or correction fault and contain it',
  'change one test, mutation, package, browser binary, container, capacity, incident, restore, rollback, or residual-risk condition and reconcile release evidence',
];

const CONSTRAINTS = [
  'owner authorization and revocation must remain separate from robots and legal-review claims',
  'every external value remains unknown until runtime admission produces an owned value',
  'every Promise, stream, listener, timer, socket, file, browser context, and report sink needs one cleanup owner',
  'URL, robots, body, parser, frontier, privacy, accessibility, and report budgets stay explicit',
  'browser TypeScript remains deterministic and free of Node, network, filesystem, browser, and host effects',
  'release evidence binds source, compiler, emitted JavaScript, lockfile, package, browser revision, container, configuration, and restored state',
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

export function webScraperTypescriptScenario(
  moduleId,
  seed,
  activityKind = 'practice',
  competency
) {
  const spec = SPECS[moduleId];
  if (!spec) throw new Error(`Missing TypeScript crawler scenario profile for ${moduleId}`);
  const chosen = details(seed.toString(36));
  const probe = competency ? ` Competency probe: ${competency.statement}` : '';
  return `A ${activityKind} TypeScript team handles case ${chosen.caseNumber} during ${chosen.environment}. Build deterministic TypeScript evidence to ${spec.task}; ${chosen.constraint}; then ${chosen.change}. Browser TypeScript uses pure bounded models and original URL, robots, sitemap, HTTP, HTML, frontier, accessibility, browser, and report fixtures only. Real DNS, Fetch, streams, Cheerio, Playwright, axe-core, files, processes, packages, containers, assistive-technology review, load, legal review, restore, and production behavior require explicit controlled transfer gates.${probe}`;
}

export function webScraperTypescriptEvidenceContract({
  competencyId,
  moduleId,
  functionName,
  marker,
  suffix,
}) {
  const spec = SPECS[moduleId];
  if (!spec) throw new Error(`Missing TypeScript crawler evidence profile for ${moduleId}`);
  const chosen = details(suffix);
  const scope = '(?:(?!// Evidence:)[\\s\\S])';
  return {
    marker,
    pattern: `${escaped(marker)}${scope}*?function\\s+${functionName}\\s*\\([^)]*\\)\\s*:\\s*Readonly<\\{[^}]+\\}>\\s*\\{${lookaheads(spec.anchors, scope)}(?=${scope}*?return)${scope}*?return`,
    example: `${marker}
// Competency: ${competencyId}.
// Case ${chosen.caseNumber}: ${chosen.environment}.
// Operating constraint: ${chosen.constraint}.
// Changed case: ${chosen.change}.
function ${functionName}(${spec.parameters}): Readonly<{ ok: boolean; metric: number; label: string }> {
  const evidenceVariant${suffix} = "${suffix}-${[...suffix].reverse().join('')}-${chosen.caseNumber}";
  if (evidenceVariant${suffix}.length === 0) return { ok: false, metric: 0, label: "variant" };
${spec.body}
}
`,
    requirement: `Append a compile-ready pure-TypeScript function headed "${marker}" that uses case ${chosen.caseNumber} to ${spec.task}. Keep defaults runnable and return observable changed-case evidence. Browser code must not import Node APIs, open streams or sockets, resolve DNS, parse through Cheerio, launch Playwright or axe-core, access files or packages, retain credentials, leave handles, or claim native runtime, accessibility, privacy, legal, load, container, restore, or production behavior; verify those boundaries later with Node 24.18.0, TypeScript 7.0.2 and the TypeScript 6.0.2 compatibility compiler API, Cheerio 1.2.0, robots-parser 3.0.1, p-limit 7.3.0, csv-stringify 6.8.1, Playwright 1.61.1, axe-core 4.12.1, original fixtures, loopback servers, emitted-runtime and handle tests, controlled DNS and browser environments, accessibility review, packages, containers, capacity, backup, restore, rollback, legal review, and release gates.`,
  };
}

export function webScraperTypescriptWorkedExample(moduleId, seed) {
  return webScraperTypescriptEvidenceContract({
    competencyId: `crawler-ts-worked-${moduleId}-${seed}`,
    moduleId,
    functionName: `worked_${moduleId.replaceAll('-', '_')}_${seed}`,
    marker: `// Evidence: crawler-ts-worked-${moduleId}-${seed}`,
    suffix: `Worked${seed}`,
  }).example;
}

export const webScraperTypescriptEvidenceModuleIds = Object.freeze(Object.keys(SPECS));

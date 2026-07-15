function escaped(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function profile(parameters, task, checks, metric, assertion, label) {
  const anchors = checks.map(([condition]) => escaped(condition));
  return {
    parameters,
    task,
    anchors,
    body: `${checks
      .map(
        ([condition, failedMetric, failure]) =>
          `\tif ${condition} {\n\t\treturn false, ${failedMetric}, "${failure}"\n\t}`
      )
      .join('\n')}
\tif !(${assertion}) {
\t\treturn false, ${metric}, "invariant"
\t}
\treturn true, ${metric}, "${label}"`,
  };
}

const SPECS = {
  'pokedex-go-outcomes-repl-contract': profile(
    'commands int, changedCases int, exitPaths int, accessible bool',
    'gate a useful, bounded, accessible REPL contract on observable command and lifecycle evidence',
    [
      ['commands < 5', 'commands', 'command-vocabulary'],
      ['changedCases < 6', 'changedCases', 'changed-cases'],
      ['exitPaths < 2', 'exitPaths', 'session-exit'],
      ['!accessible', 'commands', 'accessibility'],
    ],
    'changedCases',
    'commands >= 5 && exitPaths >= 2',
    'bounded-repl-charter'
  ),
  'pokedex-go-repository-toolchain-baseline': profile(
    'declaredGo int, cleanGates int, supportedTargets int, unresolvedFindings int',
    'reconcile Go toolchain, module, clean-build, target, and dependency evidence',
    [
      ['declaredGo != 12605', 'declaredGo', 'go-version'],
      ['cleanGates < 5', 'cleanGates', 'clean-gates'],
      ['supportedTargets < 2', 'supportedTargets', 'target-matrix'],
      ['unresolvedFindings > 0', 'unresolvedFindings', 'dependency-finding'],
    ],
    'cleanGates',
    'declaredGo == 12605 && cleanGates >= 5',
    'reproducible-go-baseline'
  ),
  'pokedex-go-input-tokenization-dispatch': profile(
    'lines int, parsed int, rejected int, dispatches int',
    'reconcile line admission, argument validation, registry lookup, and deterministic dispatch',
    [
      ['lines < 4', 'lines', 'input-coverage'],
      ['parsed < 0 || rejected < 0', 'parsed', 'parse-count'],
      ['parsed+rejected != lines', 'parsed', 'parse-reconciliation'],
      ['dispatches > parsed', 'dispatches', 'dispatch-admission'],
    ],
    'dispatches',
    'parsed+rejected == lines && dispatches <= parsed',
    'validated-dispatch'
  ),
  'pokedex-go-help-output-accessibility': profile(
    'registered int, documented int, stableRows int, colorOnly int',
    'verify generated help coverage, stable formatting, stream intent, and non-color meaning',
    [
      ['registered < 1', 'registered', 'registry-empty'],
      ['documented != registered', 'documented', 'help-drift'],
      ['stableRows < registered', 'stableRows', 'unstable-output'],
      ['colorOnly > 0', 'colorOnly', 'color-only'],
    ],
    'documented',
    'documented == registered && colorOnly == 0',
    'accessible-output-contract'
  ),
  'pokedex-go-pokeapi-resource-contract': profile(
    'fixedOrigins int, encodedInputs int, pageLimit int, requestBudget int',
    'admit fixed-origin resource URLs, bounded pagination, and fair-use request policy',
    [
      ['fixedOrigins != 1', 'fixedOrigins', 'origin-policy'],
      ['encodedInputs < 4', 'encodedInputs', 'input-cases'],
      ['pageLimit < 1 || pageLimit > 100', 'pageLimit', 'page-limit'],
      ['requestBudget < 1 || requestBudget > 8', 'requestBudget', 'request-budget'],
    ],
    'pageLimit',
    'fixedOrigins == 1 && requestBudget <= 8',
    'fair-use-resource-policy'
  ),
  'pokedex-go-json-domain-boundary': profile(
    'fixtures int, admitted int, rejected int, trailingRejected bool',
    'reconcile bounded JSON fixtures with typed domain admission and trailing-document rejection',
    [
      ['fixtures < 6', 'fixtures', 'fixture-depth'],
      ['admitted < 1 || rejected < 1', 'admitted', 'validation-split'],
      ['admitted+rejected != fixtures', 'admitted', 'fixture-reconciliation'],
      ['!trailingRejected', 'rejected', 'trailing-json'],
    ],
    'admitted',
    'admitted+rejected == fixtures && trailingRejected',
    'typed-json-boundary'
  ),
  'pokedex-go-http-client-lifecycle': profile(
    'requests int, closedBodies int, boundedBodies int, canceled int',
    'prove client reuse, response admission, bounded bodies, context cancellation, and cleanup',
    [
      ['requests < 3', 'requests', 'request-coverage'],
      ['closedBodies != requests', 'closedBodies', 'body-cleanup'],
      ['boundedBodies != requests', 'boundedBodies', 'body-budget'],
      ['canceled < 1', 'canceled', 'cancellation-case'],
    ],
    'closedBodies',
    'closedBodies == requests && boundedBodies == requests',
    'bounded-http-lifecycle'
  ),
  'pokedex-go-map-pagination-state': profile(
    'attempts int, committed int, failed int, invalidOffsets int',
    'commit only admitted page transitions while preserving cursor state on failure',
    [
      ['attempts < 4', 'attempts', 'transition-depth'],
      ['committed < 1 || failed < 1', 'committed', 'transition-split'],
      ['committed+failed != attempts', 'committed', 'transition-reconciliation'],
      ['invalidOffsets > 0', 'invalidOffsets', 'offset-invariant'],
    ],
    'committed',
    'committed+failed == attempts && invalidOffsets == 0',
    'transactional-page-state'
  ),
  'pokedex-go-history-back-recovery': profile(
    'successfulViews int, historyEntries int, failedPushes int, capacity int',
    'validate bounded successful-view snapshots and failure-safe back behavior',
    [
      ['successfulViews < 3', 'successfulViews', 'view-depth'],
      ['historyEntries < 1 || historyEntries > successfulViews', 'historyEntries', 'history-shape'],
      ['failedPushes > 0', 'failedPushes', 'failed-history'],
      ['capacity < historyEntries', 'capacity', 'history-capacity'],
    ],
    'historyEntries',
    'historyEntries <= successfulViews && failedPushes == 0',
    'bounded-history'
  ),
  'pokedex-go-cache-ttl-identity': profile(
    'lookups int, hits int, misses int, evictions int',
    'reconcile canonical cache decisions, freshness, ownership, and capacity eviction',
    [
      ['lookups < 4', 'lookups', 'lookup-depth'],
      ['hits < 1 || misses < 1', 'hits', 'cache-branches'],
      ['hits+misses != lookups', 'hits', 'lookup-reconciliation'],
      ['evictions < 1', 'evictions', 'capacity-evidence'],
    ],
    'hits',
    'hits+misses == lookups && evictions >= 1',
    'bounded-ttl-cache'
  ),
  'pokedex-go-concurrent-cache-flight': profile(
    'waiters int, fetches int, published int, leakedFlights int',
    'prove duplicate suppression, independent waiters, safe publication, and in-flight cleanup',
    [
      ['waiters < 3', 'waiters', 'waiter-depth'],
      ['fetches != 1', 'fetches', 'duplicate-fetch'],
      ['published != waiters', 'published', 'publication-gap'],
      ['leakedFlights > 0', 'leakedFlights', 'flight-leak'],
    ],
    'published',
    'fetches == 1 && published == waiters && leakedFlights == 0',
    'race-free-shared-load'
  ),
  'pokedex-go-pokemon-inspect-view': profile(
    'fields int, validated int, convertedUnits int, provenanceLinks int',
    'validate Pokemon detail fields, unit conversions, ordered presentation, and provenance',
    [
      ['fields < 8', 'fields', 'detail-depth'],
      ['validated != fields', 'validated', 'validation-gap'],
      ['convertedUnits < 2', 'convertedUnits', 'unit-evidence'],
      ['provenanceLinks < 1', 'provenanceLinks', 'provenance-gap'],
    ],
    'validated',
    'validated == fields && convertedUnits >= 2',
    'validated-detail-view'
  ),
  'pokedex-go-catch-collection-invariants': profile(
    'attempts int, caught int, missed int, duplicateMutations int',
    'reconcile deterministic catch decisions with stable identity and unchanged duplicate state',
    [
      ['attempts < 4', 'attempts', 'catch-depth'],
      ['caught < 1 || missed < 1', 'caught', 'catch-branches'],
      ['caught+missed != attempts', 'caught', 'catch-reconciliation'],
      ['duplicateMutations > 0', 'duplicateMutations', 'duplicate-state'],
    ],
    'caught',
    'caught+missed == attempts && duplicateMutations == 0',
    'deterministic-collection-transition'
  ),
  'pokedex-go-owned-inspect-release': profile(
    'owned int, listed int, remoteFallbacks int, confirmedReleases int',
    'verify offline owned inspection, stable listing, no hidden fetch, and confirmed release',
    [
      ['owned < 2', 'owned', 'collection-depth'],
      ['listed != owned', 'listed', 'listing-gap'],
      ['remoteFallbacks > 0', 'remoteFallbacks', 'hidden-network'],
      ['confirmedReleases < 1 || confirmedReleases > owned', 'confirmedReleases', 'release-policy'],
    ],
    'listed',
    'listed == owned && remoteFallbacks == 0',
    'offline-collection-interface'
  ),
  'pokedex-go-location-explore-encounters': profile(
    'relations int, validated int, displayed int, provenanceRows int',
    'admit bounded location-area encounters and preserve relation provenance through display',
    [
      ['relations < 4', 'relations', 'relation-depth'],
      ['validated != relations', 'validated', 'relation-validation'],
      ['displayed < 1 || displayed > validated', 'displayed', 'display-bound'],
      ['provenanceRows != displayed', 'provenanceRows', 'provenance-gap'],
    ],
    'displayed',
    'validated == relations && provenanceRows == displayed',
    'provenance-encounter-view'
  ),
  'pokedex-go-errors-recovery-contract': profile(
    'failures int, classified int, recoverable int, lostCauses int',
    'classify causal failures, preserve matching, bound retry, and isolate session recovery',
    [
      ['failures < 6', 'failures', 'failure-depth'],
      ['classified != failures', 'classified', 'classification-gap'],
      ['recoverable < 2 || recoverable > failures', 'recoverable', 'recovery-policy'],
      ['lostCauses > 0', 'lostCauses', 'cause-loss'],
    ],
    'classified',
    'classified == failures && lostCauses == 0',
    'causal-error-contract'
  ),
  'pokedex-go-context-signal-shutdown': profile(
    'ownedWorkers int, completedWorkers int, stopCalls int, stateLosses int',
    'prove root signal cancellation, context propagation, worker completion, and idempotent cleanup',
    [
      ['ownedWorkers < 2', 'ownedWorkers', 'worker-depth'],
      ['completedWorkers != ownedWorkers', 'completedWorkers', 'worker-leak'],
      ['stopCalls != 1', 'stopCalls', 'signal-stop'],
      ['stateLosses > 0', 'stateLosses', 'shutdown-state'],
    ],
    'completedWorkers',
    'completedWorkers == ownedWorkers && stopCalls == 1',
    'graceful-signal-shutdown'
  ),
  'pokedex-go-bounded-prefetch-pipeline': profile(
    'jobs int, maximumActive int, observedActive int, unpublishedFailures int',
    'enforce prefetch concurrency, queue, ordering, cancellation, and partial-failure ownership',
    [
      ['jobs < 5', 'jobs', 'job-depth'],
      ['maximumActive < 1 || maximumActive > 8', 'maximumActive', 'worker-budget'],
      ['observedActive > maximumActive', 'observedActive', 'concurrency-breach'],
      ['unpublishedFailures > 0', 'unpublishedFailures', 'hidden-failure'],
    ],
    'observedActive',
    'observedActive <= maximumActive && unpublishedFailures == 0',
    'bounded-prefetch-pipeline'
  ),
  'pokedex-go-persistence-schema-atomicity': profile(
    'fixtures int, admitted int, rejected int, atomicReplacements int',
    'validate versioned collection bytes and prove failure-safe atomic replacement and restore',
    [
      ['fixtures < 8', 'fixtures', 'persistence-depth'],
      ['admitted < 1 || rejected < 1', 'admitted', 'persistence-branches'],
      ['admitted+rejected != fixtures', 'admitted', 'fixture-reconciliation'],
      ['atomicReplacements < 2', 'atomicReplacements', 'atomic-evidence'],
    ],
    'admitted',
    'admitted+rejected == fixtures && atomicReplacements >= 2',
    'versioned-atomic-store'
  ),
  'pokedex-go-security-data-boundaries': profile(
    'redirectCases int, rejectedRedirects int, escapedControls int, boundedResources int',
    'enforce destination, terminal, file, privacy, and resource trust boundaries',
    [
      ['redirectCases < 3', 'redirectCases', 'redirect-depth'],
      ['rejectedRedirects < 1', 'rejectedRedirects', 'redirect-policy'],
      ['escapedControls < 2', 'escapedControls', 'terminal-safety'],
      ['boundedResources < 8', 'boundedResources', 'resource-ceilings'],
    ],
    'boundedResources',
    'rejectedRedirects >= 1 && escapedControls >= 2',
    'deny-by-default-boundaries'
  ),
  'pokedex-go-testing-fuzz-race': profile(
    'testLayers int, changedFixtures int, fuzzSeeds int, raceFindings int',
    'gate layered unit, HTTP, CLI, fuzz, race, and leak evidence on changed behavior',
    [
      ['testLayers < 6', 'testLayers', 'test-layer-depth'],
      ['changedFixtures < 8', 'changedFixtures', 'fixture-depth'],
      ['fuzzSeeds < 4', 'fuzzSeeds', 'fuzz-seeds'],
      ['raceFindings > 0', 'raceFindings', 'race-finding'],
    ],
    'changedFixtures',
    'testLayers >= 6 && raceFindings == 0',
    'layered-go-evidence'
  ),
  'pokedex-go-observability-performance-fairuse': profile(
    'operations int, traced int, p95Millis int, requestBudget int',
    'reconcile bounded causal traces, percentile latency, cache value, and fair-use traffic',
    [
      ['operations < 8', 'operations', 'workload-depth'],
      ['traced != operations', 'traced', 'trace-gap'],
      ['p95Millis < 0 || p95Millis > 1500', 'p95Millis', 'latency-budget'],
      ['requestBudget < 1 || requestBudget > operations', 'requestBudget', 'traffic-budget'],
    ],
    'p95Millis',
    'traced == operations && p95Millis <= 1500',
    'fair-use-capacity-report'
  ),
  'pokedex-go-packaging-crossplatform-release': profile(
    'targets int, built int, smokePassed int, inspectedArtifacts int',
    'bind reviewed source to cross-platform builds, inspected archives, checksums, and installed smoke behavior',
    [
      ['targets < 2', 'targets', 'target-depth'],
      ['built != targets', 'built', 'build-gap'],
      ['smokePassed != targets', 'smokePassed', 'smoke-gap'],
      ['inspectedArtifacts != targets', 'inspectedArtifacts', 'artifact-inspection'],
    ],
    'smokePassed',
    'built == targets && smokePassed == targets',
    'cross-platform-artifact'
  ),
  'pokedex-go-release-recovery-defense': profile(
    'releaseGates int, passedGates int, rehearsedFailures int, openCriticalRisks int',
    'defend reconciled release, migration, rollback, restore, recovery, and residual-risk ownership',
    [
      ['releaseGates < 16', 'releaseGates', 'release-depth'],
      ['passedGates != releaseGates', 'passedGates', 'failed-gate'],
      ['rehearsedFailures < 8', 'rehearsedFailures', 'recovery-depth'],
      ['openCriticalRisks > 0', 'openCriticalRisks', 'critical-risk'],
    ],
    'passedGates',
    'passedGates == releaseGates && openCriticalRisks == 0',
    'defensible-go-release'
  ),
};

const ENVIRONMENTS = [
  'an accessible regional field-guide session',
  'a disconnected community-lab recovery drill',
  'a fair-use API stewardship review',
  'a race-instrumented cache stress case',
  'a narrow-terminal ranger workflow',
  'a clean cross-platform package smoke',
];

const CHANGES = [
  'change one command, argument, EOF, or output-width condition and preserve the session contract',
  'change one resource identity, pagination link, JSON field, status, or body budget and revalidate admission',
  'inject one cache, waiter, goroutine, cancellation, or queue schedule and retain ownership evidence',
  'change one catch, owned record, encounter relation, or history state and prove the prior invariant',
  'inject one redirect, control sequence, file, timeout, or persistence failure and reject it safely',
  'change one toolchain, target, artifact, migration, rollback, or restore condition and reconcile the release',
];

const CONSTRAINTS = [
  'no user-visible meaning may rely on color or cursor motion',
  'the fixed PokéAPI origin and fair-use traffic budget must remain enforced',
  'all goroutines, bodies, signals, timers, and files require named cleanup ownership',
  'failed and canceled commands must preserve the prior admitted state',
  'browser code must remain deterministic and side-effect-free',
  'the release claim must identify the exact source and artifact revision',
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

export function pokedexGoScenario(moduleId, seed, activityKind = 'practice', competency) {
  const spec = SPECS[moduleId];
  if (!spec) throw new Error(`Missing Go Pokedex scenario profile for ${moduleId}`);
  const chosen = details(seed.toString(36));
  const probe = competency ? ` Competency probe: ${competency.statement}` : '';
  return `A ${activityKind} Go team handles case ${chosen.caseNumber} during ${chosen.environment}. Build deterministic Go evidence to ${spec.task}; ${chosen.constraint}; then ${chosen.change}. Browser Go uses pure bounded models and original fixtures only. Real PokéAPI traffic, DNS, sockets, TLS, host files, terminals, signals, race and leak claims, load, cross-platform packaging, accessibility review, and production behavior require explicit controlled transfer gates.${probe}`;
}

export function pokedexGoEvidenceContract({
  competencyId,
  moduleId,
  functionName,
  marker,
  suffix,
}) {
  const spec = SPECS[moduleId];
  if (!spec) throw new Error(`Missing Go Pokedex evidence profile for ${moduleId}`);
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
\tif evidenceVariant${suffix} == "" {
\t\treturn false, 0, "variant"
\t}
${spec.body}
}
`,
    requirement: `Append a compile-ready pure-Go function headed "${marker}" that uses case ${chosen.caseNumber} to ${spec.task}. Keep defaults runnable and return observable changed-case evidence. Browser code must not open sockets, resolve DNS, contact PokéAPI, read or write host files, handle real terminal or OS signals, spawn unbounded work, or claim race, leak, load, accessibility, cross-platform, package, or production behavior; verify those boundaries later with Go 1.26.5, original fixtures, controlled RoundTrippers and httptest servers, race and fuzz runs, temporary files, subprocess and signal harnesses, inspected artifacts, representative platforms, accessibility review, capacity, rollback, recovery, and release gates.`,
  };
}

export function pokedexGoWorkedExample(moduleId, seed) {
  return pokedexGoEvidenceContract({
    competencyId: `pokedex-go-worked-${moduleId}-${seed}`,
    moduleId,
    functionName: `worked_${moduleId.replaceAll('-', '_')}_${seed}`,
    marker: `// Evidence: pokedex-go-worked-${moduleId}-${seed}`,
    suffix: `Worked${seed}`,
  }).example;
}

export const pokedexGoEvidenceModuleIds = Object.freeze(Object.keys(SPECS));

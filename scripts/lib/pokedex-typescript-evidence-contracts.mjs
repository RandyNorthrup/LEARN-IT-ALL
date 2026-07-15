function escaped(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function profile(parameters, task, checks, metric, assertion, label) {
  return {
    parameters,
    task,
    anchors: checks.map(([condition]) => escaped(condition)),
    body: `${checks
      .map(
        ([condition, failedMetric, failure]) =>
          `  if (${condition}) return { ok: false, metric: ${failedMetric}, label: "${failure}" };`
      )
      .join('\n')}
  if (!(${assertion})) return { ok: false, metric: ${metric}, label: "invariant" };
  return { ok: true, metric: ${metric}, label: "${label}" };`,
  };
}

const SPECS = {
  'pokedex-ts-product-command-contract': profile(
    'commands = 6, changedCases = 8, closePaths = 3, accessible = true',
    'gate a useful inclusive command product on observable learning, lifecycle, and recovery evidence',
    [
      ['commands < 5', 'commands', 'command-depth'],
      ['changedCases < 6', 'changedCases', 'changed-case-depth'],
      ['closePaths < 2', 'closePaths', 'close-paths'],
      ['!accessible', 'commands', 'accessibility'],
    ],
    'changedCases',
    'commands >= 5 && closePaths >= 2',
    'bounded-learning-product'
  ),
  'pokedex-ts-repo-node-toolchain': profile(
    'nodeMajor = 24, typescriptMajor = 7, cleanGates = 7, compatibilityFindings = 0',
    'reconcile Node, native TypeScript, compatibility, clean install, emitted runtime, and package evidence',
    [
      ['nodeMajor !== 24', 'nodeMajor', 'node-version'],
      ['typescriptMajor !== 7', 'typescriptMajor', 'typescript-version'],
      ['cleanGates < 6', 'cleanGates', 'clean-gates'],
      ['compatibilityFindings > 0', 'compatibilityFindings', 'compatibility-gap'],
    ],
    'cleanGates',
    'nodeMajor === 24 && typescriptMajor === 7',
    'reproducible-typescript-baseline'
  ),
  'pokedex-ts-readline-lifecycle': profile(
    'questions = 4, settled = 4, closeCalls = 1, leakedListeners = 0',
    'prove one readline interface, abortable questions, EOF handling, ownership, and idempotent close',
    [
      ['questions < 3', 'questions', 'question-depth'],
      ['settled !== questions', 'settled', 'pending-question'],
      ['closeCalls !== 1', 'closeCalls', 'close-ownership'],
      ['leakedListeners > 0', 'leakedListeners', 'listener-leak'],
    ],
    'settled',
    'settled === questions && closeCalls === 1',
    'owned-readline-lifecycle'
  ),
  'pokedex-ts-tokenizer-command-registry': profile(
    'inputs = 8, admitted = 5, rejected = 3, unsafeLookups = 0',
    'reconcile runtime token admission, argument schemas, own-key lookup, and exhaustive dispatch',
    [
      ['inputs < 6', 'inputs', 'input-depth'],
      ['admitted < 1 || rejected < 1', 'admitted', 'parse-branches'],
      ['admitted + rejected !== inputs', 'admitted', 'parse-reconciliation'],
      ['unsafeLookups > 0', 'unsafeLookups', 'unsafe-registry'],
    ],
    'admitted',
    'admitted + rejected === inputs && unsafeLookups === 0',
    'runtime-validated-dispatch'
  ),
  'pokedex-ts-help-output-accessibility': profile(
    'registered = 6, documented = 6, stableRows = 8, colorOnly = 0',
    'verify generated help, typed results, stable formatting, output routing, and accessible status',
    [
      ['registered < 1', 'registered', 'registry-empty'],
      ['documented !== registered', 'documented', 'help-drift'],
      ['stableRows < registered', 'stableRows', 'unstable-output'],
      ['colorOnly > 0', 'colorOnly', 'color-only'],
    ],
    'documented',
    'documented === registered && colorOnly === 0',
    'inclusive-output-contract'
  ),
  'pokedex-ts-pokeapi-url-fairuse': profile(
    'fixedOrigins = 1, validatedInputs = 6, pageLimit = 20, concurrentRequests = 3',
    'admit fixed-origin PokéAPI URLs, validated pagination shapes, and fair-use request budgets',
    [
      ['fixedOrigins !== 1', 'fixedOrigins', 'origin-policy'],
      ['validatedInputs < 4', 'validatedInputs', 'input-depth'],
      ['pageLimit < 1 || pageLimit > 100', 'pageLimit', 'page-limit'],
      [
        'concurrentRequests < 1 || concurrentRequests > 6',
        'concurrentRequests',
        'concurrency-budget',
      ],
    ],
    'pageLimit',
    'fixedOrigins === 1 && concurrentRequests <= 6',
    'fair-use-url-policy'
  ),
  'pokedex-ts-unknown-json-validation': profile(
    'fixtures = 10, admitted = 4, rejected = 6, unvalidatedReads = 0',
    'reconcile unknown payload fixtures with deep validation, structured failures, and exact optional meaning',
    [
      ['fixtures < 8', 'fixtures', 'fixture-depth'],
      ['admitted < 1 || rejected < 1', 'admitted', 'validation-branches'],
      ['admitted + rejected !== fixtures', 'admitted', 'fixture-reconciliation'],
      ['unvalidatedReads > 0', 'unvalidatedReads', 'unknown-read'],
    ],
    'admitted',
    'admitted + rejected === fixtures && unvalidatedReads === 0',
    'strict-unknown-boundary'
  ),
  'pokedex-ts-fetch-response-abort': profile(
    'requests = 6, admitted = 3, rejected = 3, leakedTimers = 0',
    'validate Fetch status, bytes, unknown JSON, composed abort, causes, and timer cleanup',
    [
      ['requests < 5', 'requests', 'request-depth'],
      ['admitted < 1 || rejected < 1', 'admitted', 'response-branches'],
      ['admitted + rejected !== requests', 'admitted', 'response-reconciliation'],
      ['leakedTimers > 0', 'leakedTimers', 'timer-leak'],
    ],
    'admitted',
    'admitted + rejected === requests && leakedTimers === 0',
    'bounded-fetch-lifecycle'
  ),
  'pokedex-ts-pagination-view-model': profile(
    'operations = 6, committed = 3, rejected = 3, staleCommits = 0',
    'commit immutable validated pages while excluding failed and out-of-order stale results',
    [
      ['operations < 5', 'operations', 'operation-depth'],
      ['committed < 1 || rejected < 1', 'committed', 'transition-branches'],
      ['committed + rejected !== operations', 'committed', 'transition-reconciliation'],
      ['staleCommits > 0', 'staleCommits', 'stale-result'],
    ],
    'committed',
    'committed + rejected === operations && staleCommits === 0',
    'stale-safe-pagination'
  ),
  'pokedex-ts-history-undo-state': profile(
    'admittedViews = 5, snapshots = 4, failedPushes = 0, capacity = 8',
    'verify immutable successful-view history, offline back, stale exclusion, and capacity bounds',
    [
      ['admittedViews < 3', 'admittedViews', 'view-depth'],
      ['snapshots < 1 || snapshots > admittedViews', 'snapshots', 'snapshot-shape'],
      ['failedPushes > 0', 'failedPushes', 'failed-history'],
      ['capacity < snapshots', 'capacity', 'history-capacity'],
    ],
    'snapshots',
    'snapshots <= admittedViews && failedPushes === 0',
    'bounded-immutable-history'
  ),
  'pokedex-ts-cache-ttl-copy': profile(
    'lookups = 8, hits = 3, misses = 5, evictions = 2',
    'reconcile canonical TTL cache decisions, runtime ownership, error policy, and capacity eviction',
    [
      ['lookups < 6', 'lookups', 'lookup-depth'],
      ['hits < 1 || misses < 1', 'hits', 'cache-branches'],
      ['hits + misses !== lookups', 'hits', 'lookup-reconciliation'],
      ['evictions < 1', 'evictions', 'eviction-evidence'],
    ],
    'hits',
    'hits + misses === lookups && evictions >= 1',
    'bounded-runtime-cache'
  ),
  'pokedex-ts-promise-dedup-ownership': profile(
    'waiters = 4, fetches = 1, resolvedWaiters = 3, leakedEntries = 0',
    'prove one shared load, independent waiter abort, safe publication, rejection handling, and cleanup',
    [
      ['waiters < 3', 'waiters', 'waiter-depth'],
      ['fetches !== 1', 'fetches', 'duplicate-fetch'],
      ['resolvedWaiters < 1 || resolvedWaiters > waiters', 'resolvedWaiters', 'waiter-outcome'],
      ['leakedEntries > 0', 'leakedEntries', 'inflight-leak'],
    ],
    'resolvedWaiters',
    'fetches === 1 && leakedEntries === 0',
    'waiter-aware-shared-load'
  ),
  'pokedex-ts-pokemon-detail-view': profile(
    'fields = 10, validated = 10, convertedUnits = 2, accessibleSections = 5',
    'validate Pokemon detail JSON, derived view types, units, ordered sections, and inclusive output',
    [
      ['fields < 8', 'fields', 'detail-depth'],
      ['validated !== fields', 'validated', 'validation-gap'],
      ['convertedUnits < 2', 'convertedUnits', 'unit-evidence'],
      ['accessibleSections < 4', 'accessibleSections', 'presentation-depth'],
    ],
    'validated',
    'validated === fields && convertedUnits >= 2',
    'validated-inclusive-detail'
  ),
  'pokedex-ts-catch-immutable-collection': profile(
    'attempts = 6, caught = 2, missed = 4, priorStateMutations = 0',
    'reconcile replayable catch decisions with immutable collection state and stable identity',
    [
      ['attempts < 5', 'attempts', 'catch-depth'],
      ['caught < 1 || missed < 1', 'caught', 'catch-branches'],
      ['caught + missed !== attempts', 'caught', 'catch-reconciliation'],
      ['priorStateMutations > 0', 'priorStateMutations', 'prior-state-mutation'],
    ],
    'caught',
    'caught + missed === attempts && priorStateMutations === 0',
    'immutable-catch-transition'
  ),
  'pokedex-ts-owned-inspect-export': profile(
    'owned = 4, listed = 4, remoteFallbacks = 0, exportSections = 5',
    'verify offline owned inspection, stable listing, exact release preview, and accessible export',
    [
      ['owned < 2', 'owned', 'collection-depth'],
      ['listed !== owned', 'listed', 'listing-gap'],
      ['remoteFallbacks > 0', 'remoteFallbacks', 'hidden-fetch'],
      ['exportSections < 4', 'exportSections', 'export-structure'],
    ],
    'listed',
    'listed === owned && remoteFallbacks === 0',
    'offline-accessible-collection'
  ),
  'pokedex-ts-location-explore-relations': profile(
    'relations = 12, validated = 12, displayed = 7, provenanceRows = 7',
    'admit nested location-area encounter relations and preserve filtered provenance under budgets',
    [
      ['relations < 8', 'relations', 'relation-depth'],
      ['validated !== relations', 'validated', 'relation-validation'],
      ['displayed < 1 || displayed > validated', 'displayed', 'display-bound'],
      ['provenanceRows !== displayed', 'provenanceRows', 'provenance-gap'],
    ],
    'displayed',
    'validated === relations && provenanceRows === displayed',
    'validated-encounter-view'
  ),
  'pokedex-ts-error-result-recovery': profile(
    'failures = 8, normalized = 8, recoverable = 5, unhandled = 0',
    'normalize unknown throws, classify causal results, bound retry, and preserve session recovery',
    [
      ['failures < 6', 'failures', 'failure-depth'],
      ['normalized !== failures', 'normalized', 'normalization-gap'],
      ['recoverable < 2 || recoverable > failures', 'recoverable', 'recovery-policy'],
      ['unhandled > 0', 'unhandled', 'unhandled-rejection'],
    ],
    'normalized',
    'normalized === failures && unhandled === 0',
    'causal-result-recovery'
  ),
  'pokedex-ts-signals-abort-shutdown': profile(
    'ownedTasks = 5, settledTasks = 5, listenerDelta = 0, stateLosses = 0',
    'prove signal-to-abort translation, composed reasons, listener cleanup, ordered close, and state safety',
    [
      ['ownedTasks < 4', 'ownedTasks', 'task-depth'],
      ['settledTasks !== ownedTasks', 'settledTasks', 'pending-task'],
      ['listenerDelta !== 0', 'listenerDelta', 'listener-leak'],
      ['stateLosses > 0', 'stateLosses', 'shutdown-state'],
    ],
    'settledTasks',
    'settledTasks === ownedTasks && listenerDelta === 0',
    'graceful-abort-shutdown'
  ),
  'pokedex-ts-bounded-async-prefetch': profile(
    'jobs = 10, maximumActive = 3, observedActive = 3, hiddenRejections = 0',
    'enforce async queue and concurrency budgets, ordering, partial results, abort, and rejection ownership',
    [
      ['jobs < 6', 'jobs', 'job-depth'],
      ['maximumActive < 1 || maximumActive > 6', 'maximumActive', 'concurrency-budget'],
      ['observedActive > maximumActive', 'observedActive', 'concurrency-breach'],
      ['hiddenRejections > 0', 'hiddenRejections', 'hidden-rejection'],
    ],
    'observedActive',
    'observedActive <= maximumActive && hiddenRejections === 0',
    'bounded-async-scheduler'
  ),
  'pokedex-ts-persistence-schema-atomic': profile(
    'fixtures = 12, admitted = 3, rejected = 9, atomicReplacements = 2',
    'validate unknown versioned file data and prove failure-safe Node replacement, migration, and restore',
    [
      ['fixtures < 10', 'fixtures', 'persistence-depth'],
      ['admitted < 1 || rejected < 1', 'admitted', 'persistence-branches'],
      ['admitted + rejected !== fixtures', 'admitted', 'fixture-reconciliation'],
      ['atomicReplacements < 2', 'atomicReplacements', 'atomic-evidence'],
    ],
    'admitted',
    'admitted + rejected === fixtures && atomicReplacements >= 2',
    'validated-versioned-store'
  ),
  'pokedex-ts-security-runtime-boundaries': profile(
    'redirectCases = 5, rejectedRedirects = 3, unsafeKeysRejected = 4, resourceCeilings = 10',
    'enforce redirect, prototype, terminal, path, privacy, and resource boundaries',
    [
      ['redirectCases < 4', 'redirectCases', 'redirect-depth'],
      ['rejectedRedirects < 2', 'rejectedRedirects', 'redirect-policy'],
      ['unsafeKeysRejected < 3', 'unsafeKeysRejected', 'prototype-defense'],
      ['resourceCeilings < 8', 'resourceCeilings', 'resource-ceilings'],
    ],
    'resourceCeilings',
    'rejectedRedirects >= 2 && unsafeKeysRejected >= 3',
    'deny-by-default-runtime-boundaries'
  ),
  'pokedex-ts-node-test-type-evidence': profile(
    'testLayers = 7, runtimeFixtures = 12, expectedDiagnostics = 5, leakedHandles = 0',
    'gate runtime, compile-negative, async, emitted CLI, and cleanup evidence on changed cases',
    [
      ['testLayers < 6', 'testLayers', 'test-layer-depth'],
      ['runtimeFixtures < 10', 'runtimeFixtures', 'runtime-fixtures'],
      ['expectedDiagnostics < 4', 'expectedDiagnostics', 'compile-evidence'],
      ['leakedHandles > 0', 'leakedHandles', 'handle-leak'],
    ],
    'runtimeFixtures',
    'testLayers >= 6 && leakedHandles === 0',
    'layered-typescript-evidence'
  ),
  'pokedex-ts-observability-performance': profile(
    'operations = 12, traced = 12, p95Millis = 900, eventLoopDelayMillis = 25',
    'reconcile bounded causal telemetry, percentile latency, event-loop responsiveness, cache value, and capacity',
    [
      ['operations < 10', 'operations', 'workload-depth'],
      ['traced !== operations', 'traced', 'trace-gap'],
      ['p95Millis < 0 || p95Millis > 1500', 'p95Millis', 'latency-budget'],
      [
        'eventLoopDelayMillis < 0 || eventLoopDelayMillis > 50',
        'eventLoopDelayMillis',
        'event-loop-budget',
      ],
    ],
    'p95Millis',
    'traced === operations && eventLoopDelayMillis <= 50',
    'interactive-capacity-report'
  ),
  'pokedex-ts-package-distribution': profile(
    'targets = 3, cleanInstalls = 3, smokePassed = 3, inspectedPacks = 3',
    'bind ESM source and emitted JavaScript to inspected packages, executable smoke, and platform behavior',
    [
      ['targets < 2', 'targets', 'target-depth'],
      ['cleanInstalls !== targets', 'cleanInstalls', 'install-gap'],
      ['smokePassed !== targets', 'smokePassed', 'smoke-gap'],
      ['inspectedPacks !== targets', 'inspectedPacks', 'pack-inspection'],
    ],
    'smokePassed',
    'cleanInstalls === targets && smokePassed === targets',
    'inspected-node-package'
  ),
  'pokedex-ts-release-recovery-defense': profile(
    'releaseGates = 18, passedGates = 18, rehearsedFailures = 10, openCriticalRisks = 0',
    'defend emitted and packed artifacts, migration, rollback, restore, recovery, and residual-risk ownership',
    [
      ['releaseGates < 16', 'releaseGates', 'release-depth'],
      ['passedGates !== releaseGates', 'passedGates', 'failed-gate'],
      ['rehearsedFailures < 8', 'rehearsedFailures', 'recovery-depth'],
      ['openCriticalRisks > 0', 'openCriticalRisks', 'critical-risk'],
    ],
    'passedGates',
    'passedGates === releaseGates && openCriticalRisks === 0',
    'defensible-typescript-release'
  ),
};

const ENVIRONMENTS = [
  'an inclusive museum learning kiosk',
  'a shared classroom network exercise',
  'an out-of-order Promise fault rehearsal',
  'an offline mobile-library catalog migration',
  'a narrow-terminal community science event',
  'a clean emitted-package smoke project',
];

const CHANGES = [
  'change one command, token, EOF, abort, or output-width case and preserve the session model',
  'change one unknown JSON field, nested member, status, URL, or byte budget and re-run validation',
  'reorder one Promise, waiter, cache, timeout, or queue settlement and exclude stale state',
  'change one catch, owned record, export, location relation, or history transition without mutating prior state',
  'inject one redirect, prototype-like key, terminal control, path, file, or signal failure and reject it safely',
  'change one compiler, Node runtime, emitted artifact, package, migration, rollback, or restore condition and reconcile evidence',
];

const CONSTRAINTS = [
  'unknown external values must not cross the runtime validator',
  'no user-visible meaning may rely on color, cursor motion, or pointer input',
  'each Promise, AbortSignal listener, timer, stream, and handle needs explicit ownership',
  'the fixed PokéAPI origin and fair-use budget must remain enforced',
  'browser TypeScript must remain deterministic and free of Node or network effects',
  'the release claim must bind source, compiler, emitted JavaScript, and packed artifact',
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

export function pokedexTypescriptScenario(moduleId, seed, activityKind = 'practice', competency) {
  const spec = SPECS[moduleId];
  if (!spec) throw new Error(`Missing TypeScript Pokedex scenario profile for ${moduleId}`);
  const chosen = details(seed.toString(36));
  const probe = competency ? ` Competency probe: ${competency.statement}` : '';
  return `A ${activityKind} TypeScript team handles case ${chosen.caseNumber} during ${chosen.environment}. Build deterministic TypeScript evidence to ${spec.task}; ${chosen.constraint}; then ${chosen.change}. Browser code uses pure bounded runtime models and original fixtures only. Real PokéAPI traffic, Node readline, host streams, signals, files, package installs, handle and load claims, accessibility review, and production behavior require explicit controlled transfer gates.${probe}`;
}

export function pokedexTypescriptEvidenceContract({
  competencyId,
  moduleId,
  functionName,
  marker,
  suffix,
}) {
  const spec = SPECS[moduleId];
  if (!spec) throw new Error(`Missing TypeScript Pokedex evidence profile for ${moduleId}`);
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
    requirement: `Append a compile-ready pure-TypeScript function headed "${marker}" that uses case ${chosen.caseNumber} to ${spec.task}. Keep its defaults runnable and return observable changed-case evidence. Browser code must not import Node APIs, open streams or sockets, contact PokéAPI, read or write host files, handle real signals, leave timers or Promise rejections, or claim native runtime, load, accessibility, packaging, or production behavior; verify those boundaries later with TypeScript 7.0.2, the TypeScript 6.0.2 compatibility surface where required, Node 24.18.0, original unknown fixtures, controlled fetch and stream adapters, emitted-runtime and subprocess tests, temporary files, package inspection, representative platforms, accessibility review, capacity, rollback, recovery, and release gates.`,
  };
}

export function pokedexTypescriptWorkedExample(moduleId, seed) {
  return pokedexTypescriptEvidenceContract({
    competencyId: `pokedex-ts-worked-${moduleId}-${seed}`,
    moduleId,
    functionName: `worked_${moduleId.replaceAll('-', '_')}_${seed}`,
    marker: `// Evidence: pokedex-ts-worked-${moduleId}-${seed}`,
    suffix: `Worked${seed}`,
  }).example;
}

export const pokedexTypescriptEvidenceModuleIds = Object.freeze(Object.keys(SPECS));

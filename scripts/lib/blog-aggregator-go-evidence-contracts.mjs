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
          `\tif ${condition} {\n\t\treturn false, ${failedMetric}, "${failure}"\n\t}`
      )
      .join('\n')}
\tif !(${assertion}) { return false, ${metric}, "invariant" }
\treturn true, ${metric}, "${label}"`,
  };
}

const SPECS = {
  'feed-go-reader-outcomes-service-charter': profile(
    'readerTasks int, publisherRules int, changedCases int, accessible bool',
    'gate a useful reader and publisher service charter on observable decisions and inclusive evidence',
    [
      ['readerTasks < 5', 'readerTasks', 'reader-depth'],
      ['publisherRules < 5', 'publisherRules', 'publisher-duty'],
      ['changedCases < 7', 'changedCases', 'changed-cases'],
      ['!accessible', 'readerTasks', 'accessibility'],
    ],
    'changedCases',
    'readerTasks >= 5 && publisherRules >= 5 && accessible',
    'reader-publisher-charter'
  ),
  'feed-go-repository-toolchain-dependencies': profile(
    'goVersion int, pinnedDependencies int, cleanGates int, unresolvedFindings int',
    'reconcile Go, pgx, migration, dependency, clean-build, and artifact evidence',
    [
      ['goVersion != 12605', 'goVersion', 'go-version'],
      ['pinnedDependencies < 3', 'pinnedDependencies', 'dependency-lock'],
      ['cleanGates < 9', 'cleanGates', 'clean-gates'],
      ['unresolvedFindings > 0', 'unresolvedFindings', 'finding'],
    ],
    'cleanGates',
    'goVersion == 12605 && cleanGates >= 9',
    'reproducible-go-feed-repository'
  ),
  'feed-go-discovery-url-scope': profile(
    'candidates int, admitted int, blockedTargets int, provenanceRows int',
    'reconcile bounded feed discovery, URL identity, SSRF decisions, and provenance',
    [
      ['candidates < 5', 'candidates', 'candidate-depth'],
      ['admitted < 1 || admitted >= candidates', 'admitted', 'admission-split'],
      ['blockedTargets < 2', 'blockedTargets', 'ssrf-cases'],
      ['provenanceRows != candidates', 'provenanceRows', 'provenance-gap'],
    ],
    'admitted',
    'provenanceRows == candidates && blockedTargets >= 2',
    'authorized-discovery'
  ),
  'feed-go-rss-atom-standards': profile(
    'rssCases int, atomCases int, namespaceCases int, inventedSemantics int',
    'prove RSS and Atom format semantics, expanded names, variance, and extension restraint',
    [
      ['rssCases < 5', 'rssCases', 'rss-depth'],
      ['atomCases < 5', 'atomCases', 'atom-depth'],
      ['namespaceCases < 3', 'namespaceCases', 'namespace-depth'],
      ['inventedSemantics > 0', 'inventedSemantics', 'extension-invention'],
    ],
    'namespaceCases',
    'rssCases >= 5 && atomCases >= 5 && inventedSemantics == 0',
    'standards-aware-feed-model'
  ),
  'feed-go-xml-admission-security': profile(
    'fixtures int, rejected int, maximumDepth int, externalReads int',
    'admit bounded strict XML while rejecting malformed, deep, entity, encoding, and trailing cases',
    [
      ['fixtures < 8', 'fixtures', 'fixture-depth'],
      ['rejected < 4 || rejected >= fixtures', 'rejected', 'rejection-split'],
      ['maximumDepth < 1 || maximumDepth > 32', 'maximumDepth', 'depth-budget'],
      ['externalReads > 0', 'externalReads', 'external-entity'],
    ],
    'rejected',
    'rejected < fixtures && maximumDepth <= 32 && externalReads == 0',
    'bounded-xml-admission'
  ),
  'feed-go-normalized-domain-provenance': profile(
    'sourceFields int, admittedFields int, reportedLosses int, unsafeContent int',
    'reconcile format-specific source values with normalized identity, content kinds, and loss evidence',
    [
      ['sourceFields < 8', 'sourceFields', 'source-depth'],
      ['admittedFields < 3 || admittedFields > sourceFields', 'admittedFields', 'admission-bound'],
      ['admittedFields+reportedLosses != sourceFields', 'reportedLosses', 'loss-reconciliation'],
      ['unsafeContent > 0', 'unsafeContent', 'unsafe-content'],
    ],
    'admittedFields',
    'admittedFields+reportedLosses == sourceFields && unsafeContent == 0',
    'loss-aware-domain'
  ),
  'feed-go-conditional-fetch-publisher-budget': profile(
    'responses int, conditionalHits int, admittedBodies int, budgetViolations int',
    'prove conditional HTTP, redirect and compression admission, cleanup, and publisher budgets',
    [
      ['responses < 6', 'responses', 'response-depth'],
      ['conditionalHits < 1', 'conditionalHits', 'validator-evidence'],
      ['admittedBodies < 1 || admittedBodies >= responses', 'admittedBodies', 'body-split'],
      ['budgetViolations > 0', 'budgetViolations', 'publisher-budget'],
    ],
    'conditionalHits',
    'conditionalHits >= 1 && admittedBodies < responses && budgetViolations == 0',
    'publisher-friendly-fetch'
  ),
  'feed-go-postgres-domain-schema': profile(
    'tables int, constraints int, tenantKeys int, unjustifiedIndexes int',
    'reconcile feed-service entities, database invariants, tenant keys, and query-driven indexes',
    [
      ['tables < 9', 'tables', 'schema-depth'],
      ['constraints < tables*2', 'constraints', 'constraint-depth'],
      ['tenantKeys < 4', 'tenantKeys', 'tenant-keying'],
      ['unjustifiedIndexes > 0', 'unjustifiedIndexes', 'index-evidence'],
    ],
    'constraints',
    'constraints >= tables*2 && tenantKeys >= 4',
    'constrained-feed-schema'
  ),
  'feed-go-migrations-forward-backward': profile(
    'migrationCases int, resumedBackfills int, compatibilityVersions int, unreconciledRows int',
    'prove immutable migrations, expand-contract compatibility, bounded backfill, and recovery',
    [
      ['migrationCases < 7', 'migrationCases', 'migration-depth'],
      ['resumedBackfills < 2', 'resumedBackfills', 'resume-depth'],
      ['compatibilityVersions < 2', 'compatibilityVersions', 'version-skew'],
      ['unreconciledRows > 0', 'unreconciledRows', 'backfill-gap'],
    ],
    'migrationCases',
    'resumedBackfills >= 2 && compatibilityVersions >= 2 && unreconciledRows == 0',
    'rehearsed-migration-chain'
  ),
  'feed-go-pgx-pool-transaction-ownership': profile(
    'acquired int, released int, transactions int, mixedConnections int',
    'prove pgx pool, rows, one-connection transactions, cancellation, and error ownership',
    [
      ['acquired < 4', 'acquired', 'pool-depth'],
      ['released != acquired', 'released', 'client-leak'],
      ['transactions < 2', 'transactions', 'transaction-depth'],
      ['mixedConnections > 0', 'mixedConnections', 'transaction-connection'],
    ],
    'released',
    'released == acquired && mixedConnections == 0',
    'owned-pgx-lifecycle'
  ),
  'feed-go-source-subscription-state': profile(
    'registrations int, sources int, subscriptions int, crossTenantLinks int',
    'reconcile shared source identity, tenant subscriptions, lifecycle, authorization, and registration races',
    [
      ['registrations < 5', 'registrations', 'registration-depth'],
      ['sources < 1 || sources >= registrations', 'sources', 'source-dedup'],
      ['subscriptions < sources', 'subscriptions', 'subscription-depth'],
      ['crossTenantLinks > 0', 'crossTenantLinks', 'tenant-isolation'],
    ],
    'subscriptions',
    'sources < registrations && crossTenantLinks == 0',
    'shared-source-subscriptions'
  ),
  'feed-go-entry-identity-upsert-versions': profile(
    'attempts int, inserted int, revised int, duplicateEffects int',
    'prove scoped identity, idempotent outcomes, revision history, tombstones, and replay convergence',
    [
      ['attempts < 7', 'attempts', 'replay-depth'],
      ['inserted < 1', 'inserted', 'insert-evidence'],
      ['revised < 1', 'revised', 'revision-evidence'],
      ['duplicateEffects > 0', 'duplicateEffects', 'duplicate-effect'],
    ],
    'revised',
    'inserted+revised < attempts && duplicateEffects == 0',
    'versioned-idempotent-entries'
  ),
  'feed-go-ingestion-unit-of-work': profile(
    'fetched int, admitted int, committed int, partialVisible int',
    'reconcile fetch, parse, normalize, atomic commit, validators, checkpoints, and post-commit effects',
    [
      ['fetched < 5', 'fetched', 'ingestion-depth'],
      ['admitted < 1 || admitted > fetched', 'admitted', 'admission-bound'],
      ['committed != admitted', 'committed', 'commit-gap'],
      ['partialVisible > 0', 'partialVisible', 'partial-state'],
    ],
    'committed',
    'committed == admitted && partialVisible == 0',
    'atomic-ingestion-unit'
  ),
  'feed-go-scheduler-clocks-backoff': profile(
    'scheduleCases int, dueCases int, jitterCases int, overlappingRuns int',
    'prove persisted due state, injected clocks, adaptive backoff, jitter, pause, and non-overlap',
    [
      ['scheduleCases < 8', 'scheduleCases', 'schedule-depth'],
      ['dueCases < 3', 'dueCases', 'due-boundaries'],
      ['jitterCases < 3', 'jitterCases', 'jitter-depth'],
      ['overlappingRuns > 0', 'overlappingRuns', 'overlap'],
    ],
    'dueCases',
    'dueCases >= 3 && jitterCases >= 3 && overlappingRuns == 0',
    'adaptive-durable-schedule'
  ),
  'feed-go-postgres-leases-fencing': profile(
    'claims int, uniqueOwners int, staleCommits int, openLocks int',
    'prove short SKIP LOCKED claims, fenced leases, conditional finalize, and fault recovery',
    [
      ['claims < 6', 'claims', 'claim-depth'],
      ['uniqueOwners < 2', 'uniqueOwners', 'owner-depth'],
      ['staleCommits > 0', 'staleCommits', 'stale-commit'],
      ['openLocks > 0', 'openLocks', 'lock-leak'],
    ],
    'claims',
    'uniqueOwners >= 2 && staleCommits == 0 && openLocks == 0',
    'fenced-work-claims'
  ),
  'feed-go-worker-pool-cancellation': profile(
    'jobs int, settled int, origins int, leakedWorkers int',
    'prove bounded origin-aware worker ownership, failure isolation, cancellation, and joined shutdown',
    [
      ['jobs < 8', 'jobs', 'job-depth'],
      ['settled != jobs', 'settled', 'settlement-gap'],
      ['origins < 3', 'origins', 'origin-depth'],
      ['leakedWorkers > 0', 'leakedWorkers', 'worker-leak'],
    ],
    'settled',
    'settled == jobs && origins >= 3 && leakedWorkers == 0',
    'bounded-origin-workers'
  ),
  'feed-go-http-api-resources': profile(
    'operations int, consistentResponses int, canceledDependencies int, leakedInternals int',
    'reconcile resource semantics, layered handlers, problem details, cancellation, and response finality',
    [
      ['operations < 8', 'operations', 'operation-depth'],
      ['consistentResponses != operations', 'consistentResponses', 'response-gap'],
      ['canceledDependencies < 1', 'canceledDependencies', 'cancel-evidence'],
      ['leakedInternals > 0', 'leakedInternals', 'internal-leak'],
    ],
    'consistentResponses',
    'consistentResponses == operations && leakedInternals == 0',
    'consistent-feed-api'
  ),
  'feed-go-auth-tenant-privacy': profile(
    'accessCases int, authorized int, denied int, privacyLeaks int',
    'prove verified identity, resource authorization, tenant query scope, privacy, and redacted audit evidence',
    [
      ['accessCases < 8', 'accessCases', 'access-depth'],
      ['authorized < 1 || denied < 1', 'authorized', 'decision-split'],
      ['authorized+denied != accessCases', 'denied', 'decision-reconciliation'],
      ['privacyLeaks > 0', 'privacyLeaks', 'privacy-leak'],
    ],
    'denied',
    'authorized+denied == accessCases && privacyLeaks == 0',
    'tenant-private-access'
  ),
  'feed-go-cursor-pagination-consistency': profile(
    'rows int, traversed int, duplicates int, missingStableRows int',
    'prove total ordering, validated cursors, keyset navigation, change behavior, and accessible controls',
    [
      ['rows < 8', 'rows', 'row-depth'],
      ['traversed < rows', 'traversed', 'traversal-gap'],
      ['duplicates > 0', 'duplicates', 'duplicate-row'],
      ['missingStableRows > 0', 'missingStableRows', 'missing-row'],
    ],
    'traversed',
    'traversed >= rows && duplicates == 0 && missingStableRows == 0',
    'stable-cursor-timeline'
  ),
  'feed-go-postgres-search-ranking': profile(
    'queries int, boundedQueries int, indexedPlans int, unsafeSnippets int',
    'prove admitted full-text queries, language policy, GIN plans, deterministic ranking, and safe snippets',
    [
      ['queries < 6', 'queries', 'query-depth'],
      ['boundedQueries != queries', 'boundedQueries', 'query-budget'],
      ['indexedPlans < 2', 'indexedPlans', 'plan-evidence'],
      ['unsafeSnippets > 0', 'unsafeSnippets', 'unsafe-snippet'],
    ],
    'indexedPlans',
    'boundedQueries == queries && indexedPlans >= 2 && unsafeSnippets == 0',
    'bounded-explainable-search'
  ),
  'feed-go-accessible-reader-content-safety': profile(
    'readerTasks int, keyboardTasks int, safeContentCases int, colorOnlyStates int',
    'prove content-safe semantic reader structure, keyboard and focus behavior, reflow, and non-color evidence',
    [
      ['readerTasks < 8', 'readerTasks', 'reader-depth'],
      ['keyboardTasks != readerTasks', 'keyboardTasks', 'keyboard-gap'],
      ['safeContentCases < 6', 'safeContentCases', 'content-safety'],
      ['colorOnlyStates > 0', 'colorOnlyStates', 'color-only'],
    ],
    'keyboardTasks',
    'keyboardTasks == readerTasks && safeContentCases >= 6 && colorOnlyStates == 0',
    'inclusive-safe-reader'
  ),
  'feed-go-reader-state-commands': profile(
    'commands int, idempotent int, reconciledBulk int, countDrift int',
    'prove private reader state, desired-state commands, bulk semantics, conflicts, and count repair',
    [
      ['commands < 8', 'commands', 'command-depth'],
      ['idempotent < 4', 'idempotent', 'idempotency-depth'],
      ['reconciledBulk < 2', 'reconciledBulk', 'bulk-evidence'],
      ['countDrift > 0', 'countDrift', 'count-drift'],
    ],
    'idempotent',
    'idempotent >= 4 && reconciledBulk >= 2 && countDrift == 0',
    'consistent-reader-state'
  ),
  'feed-go-api-cache-preconditions': profile(
    'representations int, validValidators int, preconditionCases int, privacyLeaks int',
    'reconcile private cache classification, ETags, conditional reads, write preconditions, and invalidation',
    [
      ['representations < 6', 'representations', 'representation-depth'],
      ['validValidators != representations', 'validValidators', 'validator-gap'],
      ['preconditionCases < 4', 'preconditionCases', 'precondition-depth'],
      ['privacyLeaks > 0', 'privacyLeaks', 'cache-privacy'],
    ],
    'validValidators',
    'validValidators == representations && privacyLeaks == 0',
    'privacy-safe-api-cache'
  ),
  'feed-go-observability-slos-capacity': profile(
    'operations int, correlated int, sloIndicators int, highCardinalityLabels int',
    'prove privacy-minimized causal telemetry, freshness SLOs, bounded cardinality, and representative capacity',
    [
      ['operations < 12', 'operations', 'operation-depth'],
      ['correlated != operations', 'correlated', 'correlation-gap'],
      ['sloIndicators < 6', 'sloIndicators', 'slo-depth'],
      ['highCardinalityLabels > 0', 'highCardinalityLabels', 'cardinality'],
    ],
    'sloIndicators',
    'correlated == operations && sloIndicators >= 6 && highCardinalityLabels == 0',
    'feed-operations-report'
  ),
  'feed-go-tests-fixtures-fuzz-race': profile(
    'fixtures int, properties int, raceCases int, unsupportedClaims int',
    'reconcile original fixture coverage, pure units, fuzz properties, race and leak cases, and evidence non-claims',
    [
      ['fixtures < 12', 'fixtures', 'fixture-depth'],
      ['properties < 6', 'properties', 'property-depth'],
      ['raceCases < 4', 'raceCases', 'race-depth'],
      ['unsupportedClaims > 0', 'unsupportedClaims', 'unsupported-claim'],
    ],
    'properties',
    'fixtures >= 12 && raceCases >= 4 && unsupportedClaims == 0',
    'layered-go-feed-evidence'
  ),
  'feed-go-integration-postgres-http-faults': profile(
    'faults int, recovered int, reconciledStages int, leakedResources int',
    'prove disposable PostgreSQL, controlled origins, process behavior, injected faults, and end-to-end reconciliation',
    [
      ['faults < 10', 'faults', 'fault-depth'],
      ['recovered < 6 || recovered > faults', 'recovered', 'recovery-depth'],
      ['reconciledStages < 8', 'reconciledStages', 'reconciliation-depth'],
      ['leakedResources > 0', 'leakedResources', 'resource-leak'],
    ],
    'recovered',
    'reconciledStages >= 8 && leakedResources == 0',
    'disposable-integration-evidence'
  ),
  'feed-go-security-abuse-retention': profile(
    'threatCases int, blocked int, retainedDataClasses int, unownedCriticalRisks int',
    'prove defense-in-depth SSRF, parser and query budgets, secrets, retention, deletion, and residual ownership',
    [
      ['threatCases < 12', 'threatCases', 'threat-depth'],
      ['blocked < 8 || blocked > threatCases', 'blocked', 'control-depth'],
      ['retainedDataClasses < 6', 'retainedDataClasses', 'retention-depth'],
      ['unownedCriticalRisks > 0', 'unownedCriticalRisks', 'risk-owner'],
    ],
    'blocked',
    'blocked <= threatCases && unownedCriticalRisks == 0',
    'feed-defense-controls'
  ),
  'feed-go-deployment-health-migrations': profile(
    'artifacts int, inspected int, healthStates int, rolloutFailures int',
    'bind non-root artifacts, startup, health, migration ownership, compatibility, canary, and rollback evidence',
    [
      ['artifacts < 3', 'artifacts', 'artifact-depth'],
      ['inspected != artifacts', 'inspected', 'inspection-gap'],
      ['healthStates < 5', 'healthStates', 'health-depth'],
      ['rolloutFailures > 0', 'rolloutFailures', 'rollout-failure'],
    ],
    'inspected',
    'inspected == artifacts && healthStates >= 5 && rolloutFailures == 0',
    'deployable-go-feed-service'
  ),
  'feed-go-backup-restore-disaster': profile(
    'dataClasses int, restoredClasses int, drills int, unreconciledInvariants int',
    'prove data-class objectives, backup eligibility, isolated restore, safe resume order, and disaster drills',
    [
      ['dataClasses < 7', 'dataClasses', 'data-class-depth'],
      ['restoredClasses != dataClasses', 'restoredClasses', 'restore-gap'],
      ['drills < 6', 'drills', 'drill-depth'],
      ['unreconciledInvariants > 0', 'unreconciledInvariants', 'restore-invariant'],
    ],
    'restoredClasses',
    'restoredClasses == dataClasses && drills >= 6 && unreconciledInvariants == 0',
    'rehearsed-feed-recovery'
  ),
  'feed-go-release-production-defense': profile(
    'releaseGates int, passedGates int, rehearsedIncidents int, openCriticalRisks int',
    'defend source-to-artifact provenance, unfamiliar end-to-end behavior, incidents, recovery, and residual risk',
    [
      ['releaseGates < 20', 'releaseGates', 'release-depth'],
      ['passedGates != releaseGates', 'passedGates', 'gate-gap'],
      ['rehearsedIncidents < 10', 'rehearsedIncidents', 'incident-depth'],
      ['openCriticalRisks > 0', 'openCriticalRisks', 'critical-risk'],
    ],
    'passedGates',
    'passedGates == releaseGates && rehearsedIncidents >= 10 && openCriticalRisks == 0',
    'defensible-go-feed-release'
  ),
};

const ENVIRONMENTS = [
  'an accessible community-news reader review',
  'a multilingual university archive import',
  'a publisher-fairness incident rehearsal',
  'a PostgreSQL claim and failover drill',
  'a cross-tenant privacy audit',
  'an isolated backup restore exercise',
];

const CHANGES = [
  'change one RSS, Atom, namespace, date, identity, content, or encoding case and reconcile provenance',
  'inject one URL, DNS, redirect, compression, entity, depth, timeout, or publisher-budget failure and reject it safely',
  'change one schema, constraint, transaction, upsert, migration, query, or search plan and preserve admitted state',
  'interleave one schedule, lease, fencing, goroutine, cancellation, or shutdown path and prove ownership',
  'change one tenant, cursor, reader-state, authorization, cache, or accessibility condition without leaking state',
  'change one artifact, deployment, incident, backup, restore, rollback, or capacity condition and reconcile the release',
];

const CONSTRAINTS = [
  'publisher fetch and retention budgets must remain explicit',
  'untrusted XML and feed content must not cross admission or rendering boundaries',
  'every goroutine, body, row set, transaction, lease, timer, and pool needs named cleanup ownership',
  'failed, canceled, stale, and cross-tenant operations must preserve the prior admitted state',
  'browser Go must remain deterministic and free of network, database, process, and host effects',
  'the release claim must bind source, migrations, dependencies, binary, image, configuration, and restored state',
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

export function blogAggregatorGoScenario(moduleId, seed, activityKind = 'practice', competency) {
  const spec = SPECS[moduleId];
  if (!spec) throw new Error(`Missing Go feed scenario profile for ${moduleId}`);
  const chosen = details(seed.toString(36));
  const probe = competency ? ` Competency probe: ${competency.statement}` : '';
  return `A ${activityKind} Go team handles case ${chosen.caseNumber} during ${chosen.environment}. Build deterministic Go evidence to ${spec.task}; ${chosen.constraint}; then ${chosen.change}. Browser Go uses pure bounded models and original RSS, Atom, HTTP, PostgreSQL, and reader fixtures only. Real DNS, sockets, XML libraries, PostgreSQL, processes, signals, race, load, containers, accessibility review, backups, and production behavior require explicit controlled transfer gates.${probe}`;
}

export function blogAggregatorGoEvidenceContract({
  competencyId,
  moduleId,
  functionName,
  marker,
  suffix,
}) {
  const spec = SPECS[moduleId];
  if (!spec) throw new Error(`Missing Go feed evidence profile for ${moduleId}`);
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
    requirement: `Append a compile-ready pure-Go function headed "${marker}" that uses case ${chosen.caseNumber} to ${spec.task}. Return observable changed-case evidence. Browser code must not open sockets, resolve DNS, parse through native XML libraries, contact publishers, access PostgreSQL, read host files, handle real signals, launch unbounded goroutines, or claim race, load, accessibility, container, backup, restore, or production behavior; verify those boundaries later with Go 1.26.5, pgx 5.10.0, goose 3.27.2, PostgreSQL 18.4, original fixtures, controlled RoundTrippers and httptest servers, disposable databases, race and fuzz runs, subprocesses, inspected images, accessibility review, capacity, backup, restore, rollback, and release gates.`,
  };
}

export function blogAggregatorGoWorkedExample(moduleId, seed) {
  return blogAggregatorGoEvidenceContract({
    competencyId: `feed-go-worked-${moduleId}-${seed}`,
    moduleId,
    functionName: `worked_${moduleId.replaceAll('-', '_')}_${seed}`,
    marker: `// Evidence: feed-go-worked-${moduleId}-${seed}`,
    suffix: `Worked${seed}`,
  }).example;
}

export const blogAggregatorGoEvidenceModuleIds = Object.freeze(Object.keys(SPECS));

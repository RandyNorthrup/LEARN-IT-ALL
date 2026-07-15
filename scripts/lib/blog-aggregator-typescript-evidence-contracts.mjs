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
    body: `${checks
      .map(
        ([condition, metric, failure]) =>
          `  if (${condition}) return { ok: false, metric: ${metric}, label: "${failure}" };`
      )
      .join('\n')}
  if (!(${acceptedName} <= ${totalName} && ${changedName} >= ${changedMinimum} && ${defectName} === 0)) return { ok: false, metric: ${acceptedName}, label: "invariant" };
  return { ok: true, metric: ${acceptedName}, label: "${label}" };`,
  };
}

const SPECS = {
  'feed-ts-reader-outcomes-product-contract': profile(
    'gate reader, publisher, inclusive, privacy, and changed-case product outcomes',
    ['readerTasks', 9, 7],
    ['provenTasks', 8, 6],
    ['publisherCases', 7, 5],
    ['accessibilityDefects', 0],
    'inclusive-feed-product'
  ),
  'feed-ts-runtime-repository-stack': profile(
    'reconcile Node, TypeScript, dependency, emitted-package, and clean-reproduction evidence',
    ['cleanGates', 12, 10],
    ['passedGates', 12, 10],
    ['runtimeSmokes', 5, 4],
    ['unresolvedFindings', 0],
    'reproducible-ts-feed-stack'
  ),
  'feed-ts-architecture-async-ownership': profile(
    'prove directed ports, immutable admission, Promise ownership, AbortSignal trees, and handle closure',
    ['ownedResources', 12, 10],
    ['settledResources', 12, 10],
    ['abortCases', 6, 4],
    ['leakedHandles', 0],
    'owned-async-architecture'
  ),
  'feed-ts-discovery-url-ssrf': profile(
    'reconcile direct and autodiscovery, URL identity, redirects, SSRF, and provenance',
    ['candidates', 9, 7],
    ['admittedCandidates', 4, 2],
    ['blockedTargets', 5, 4],
    ['scopeEscapes', 0],
    'authorized-ts-discovery'
  ),
  'feed-ts-rss-atom-format-model': profile(
    'prove RSS and Atom semantics, namespaces, content variance, and extension restraint',
    ['formatCases', 14, 12],
    ['admittedCases', 11, 8],
    ['namespaceCases', 6, 4],
    ['inventedSemantics', 0],
    'standards-aware-ts-feed-model'
  ),
  'feed-ts-xml-parser-security': profile(
    'prove bounded XML options, entities, depth, dangerous-key rejection, and causal failures',
    ['xmlFixtures', 14, 12],
    ['classifiedFixtures', 14, 12],
    ['securityCases', 8, 6],
    ['dangerousObjects', 0],
    'hardened-xml-adapter'
  ),
  'feed-ts-unknown-validation-normalization': profile(
    'reconcile unknown parser values, discriminated formats, identity, provenance, and normalization loss',
    ['externalFields', 14, 12],
    ['admittedFields', 10, 6],
    ['reportedLosses', 4, 2],
    ['unvalidatedValues', 0],
    'runtime-validated-feed-domain'
  ),
  'feed-ts-fetch-stream-abort-budget': profile(
    'prove Fetch stream limits, signal composition, validators, redirect policy, and publisher budgets',
    ['fetchCases', 12, 10],
    ['settledFetches', 12, 10],
    ['conditionalCases', 5, 3],
    ['budgetViolations', 0],
    'bounded-publisher-fetch'
  ),
  'feed-ts-postgres-schema-constraints': profile(
    'reconcile relational entities, stable keys, constraints, tenant scope, and query-driven indexes',
    ['schemaObjects', 16, 14],
    ['constrainedObjects', 16, 14],
    ['tenantCases', 6, 4],
    ['unjustifiedIndexes', 0],
    'constrained-ts-feed-schema'
  ),
  'feed-ts-migrations-expand-contract': profile(
    'prove immutable migrations, expand-contract compatibility, resumable backfill, and recovery',
    ['migrationCases', 10, 8],
    ['recoveredCases', 9, 7],
    ['versionSkewCases', 5, 3],
    ['unreconciledRows', 0],
    'compatible-migration-chain'
  ),
  'feed-ts-pg-pool-transaction-lifecycle': profile(
    'prove Pool, checked-out client, transaction connection, row validation, error, and close ownership',
    ['databaseCases', 12, 10],
    ['releasedClients', 10, 8],
    ['transactionCases', 6, 4],
    ['leakedClients', 0],
    'owned-node-postgres-lifecycle'
  ),
  'feed-ts-source-subscription-lifecycle': profile(
    'reconcile shared sources, tenant subscriptions, lifecycle transitions, authorization, and registration races',
    ['registrationAttempts', 10, 8],
    ['reconciledAttempts', 10, 8],
    ['stateTransitions', 7, 5],
    ['crossTenantLinks', 0],
    'shared-ts-source-subscriptions'
  ),
  'feed-ts-entry-upsert-revision-history': profile(
    'prove scoped identity, typed upsert outcomes, revisions, tombstones, and replay convergence',
    ['ingestionAttempts', 12, 10],
    ['convergedAttempts', 12, 10],
    ['revisionCases', 5, 3],
    ['duplicateEffects', 0],
    'versioned-ts-entries'
  ),
  'feed-ts-ingestion-orchestration': profile(
    'reconcile exhaustive async states, immutable stages, atomic commit, post-commit effects, and counts',
    ['stageTransitions', 14, 12],
    ['settledTransitions', 14, 12],
    ['failureCases', 6, 4],
    ['partialCommits', 0],
    'atomic-async-ingestion'
  ),
  'feed-ts-scheduler-timer-ownership': profile(
    'prove durable due state, injected clocks, non-overlapping timers, backoff, pause, and handle cleanup',
    ['scheduleCases', 12, 10],
    ['settledSchedules', 12, 10],
    ['clockChanges', 6, 4],
    ['liveTimersAfterClose', 0],
    'handle-clean-scheduler'
  ),
  'feed-ts-postgres-lease-fencing': profile(
    'prove short SKIP LOCKED claims, fenced tokens, affected-row finalize, fairness, and lease faults',
    ['claimCases', 12, 10],
    ['fencedClaims', 11, 9],
    ['failureCases', 7, 5],
    ['staleCommits', 0],
    'fenced-ts-work-claims'
  ),
  'feed-ts-bounded-promise-workers': profile(
    'prove multiresource budgets, owned workers, origin fairness, rejection isolation, and drain',
    ['workerJobs', 14, 12],
    ['settledJobs', 14, 12],
    ['originCases', 6, 4],
    ['unhandledRejections', 0],
    'bounded-promise-workers'
  ),
  'feed-ts-express-resource-layers': profile(
    'reconcile resource decisions, middleware order, async errors, request abort, and response finality',
    ['requestCases', 14, 12],
    ['terminalResponses', 14, 12],
    ['abortCases', 5, 3],
    ['doubleResponses', 0],
    'layered-express-api'
  ),
  'feed-ts-runtime-request-problem-contracts': profile(
    'prove runtime request admission, coercion, problem details, negotiation, and OpenAPI conformance',
    ['contractCases', 14, 12],
    ['validatedCases', 14, 12],
    ['problemCases', 6, 4],
    ['schemaDrift', 0],
    'runtime-documented-api'
  ),
  'feed-ts-auth-tenant-privacy': profile(
    'prove token verification, resource policy, tenant repositories, data minimization, and audit redaction',
    ['accessCases', 14, 12],
    ['decidedCases', 14, 12],
    ['deniedCases', 6, 4],
    ['privacyLeaks', 0],
    'tenant-private-ts-access'
  ),
  'feed-ts-cursor-pagination-timeline': profile(
    'prove deterministic ordering, signed cursors, keyset directions, changing data, and accessible navigation',
    ['timelineRows', 14, 12],
    ['traversedRows', 14, 12],
    ['changedPages', 6, 4],
    ['duplicateRows', 0],
    'stable-ts-cursor-timeline'
  ),
  'feed-ts-postgres-search-safe-snippets': profile(
    'prove admitted search, GIN plan evidence, language and rank policy, budgets, and safe snippets',
    ['searchCases', 12, 10],
    ['boundedSearches', 12, 10],
    ['indexedPlans', 5, 3],
    ['unsafeSnippets', 0],
    'safe-explainable-search'
  ),
  'feed-ts-accessible-reader-rendering': profile(
    'prove untrusted content safety, semantic reading, keyboard focus, status, reflow, media, and motion',
    ['readerCases', 14, 12],
    ['keyboardCases', 14, 12],
    ['contentSafetyCases', 8, 6],
    ['colorOnlyStates', 0],
    'inclusive-ts-reader'
  ),
  'feed-ts-reader-state-conflicts': profile(
    'prove private reader state, idempotent desired commands, bulk results, conflicts, and count repair',
    ['stateCommands', 14, 12],
    ['reconciledCommands', 14, 12],
    ['conflictCases', 6, 4],
    ['countDrift', 0],
    'consistent-ts-reader-state'
  ),
  'feed-ts-api-cache-etag-preconditions': profile(
    'reconcile private cache classes, representation validators, conditional reads, writes, and invalidation',
    ['representationCases', 12, 10],
    ['validValidators', 12, 10],
    ['preconditionCases', 6, 4],
    ['cachePrivacyLeaks', 0],
    'privacy-safe-ts-cache'
  ),
  'feed-ts-observability-als-slos': profile(
    'prove async context boundaries, redacted events, freshness SLOs, bounded cardinality, and event-loop capacity',
    ['operations', 16, 14],
    ['correlatedOperations', 16, 14],
    ['sloIndicators', 7, 5],
    ['contextLeaks', 0],
    'causal-ts-operations'
  ),
  'feed-ts-node-test-types-fixtures': profile(
    'reconcile original fixtures, deterministic async tests, compile-negative cases, and evidence non-claims',
    ['testCases', 18, 16],
    ['passingCases', 18, 16],
    ['compileNegativeCases', 7, 5],
    ['unsupportedClaims', 0],
    'layered-ts-feed-evidence'
  ),
  'feed-ts-integration-fault-handle-evidence': profile(
    'prove loopback origins, disposable PostgreSQL, injected faults, emitted subprocesses, and handle reconciliation',
    ['integrationCases', 16, 14],
    ['reconciledCases', 15, 13],
    ['faultCases', 9, 7],
    ['leakedHandles', 0],
    'emitted-integration-evidence'
  ),
  'feed-ts-security-supply-retention': profile(
    'prove threat controls, SSRF and amplification budgets, package and secret policy, retention, and erasure',
    ['threatCases', 16, 14],
    ['controlledCases', 14, 12],
    ['retentionClasses', 8, 6],
    ['unownedCriticalRisks', 0],
    'ts-feed-defense-controls'
  ),
  'feed-ts-container-rollout-migrations': profile(
    'bind package, non-root container, health, migration ownership, compatibility, canary, and rollback evidence',
    ['releaseArtifacts', 8, 6],
    ['inspectedArtifacts', 8, 6],
    ['healthStates', 6, 4],
    ['rolloutFailures', 0],
    'deployable-ts-feed-service'
  ),
  'feed-ts-backup-restore-recovery': profile(
    'prove data-class objectives, backup eligibility, isolated restore, safe resume sequence, and drills',
    ['dataClasses', 9, 7],
    ['restoredClasses', 9, 7],
    ['recoveryDrills', 8, 6],
    ['restoreInvariantFailures', 0],
    'rehearsed-ts-feed-recovery'
  ),
  'feed-ts-release-production-defense': profile(
    'defend source-to-package provenance, unfamiliar end-to-end behavior, incidents, recovery, and residual risks',
    ['releaseGates', 24, 20],
    ['passedGates', 24, 20],
    ['incidentDrills', 12, 10],
    ['openCriticalRisks', 0],
    'defensible-ts-feed-release'
  ),
};

const ENVIRONMENTS = [
  'an inclusive cross-device research reader review',
  'a hostile XML and unknown-value admission drill',
  'an out-of-order Promise and AbortSignal rehearsal',
  'a PostgreSQL lease and migration fault exercise',
  'a cross-tenant privacy and cache audit',
  'a clean emitted-package and restore smoke',
];

const CHANGES = [
  'change one RSS, Atom, namespace, entity, date, identity, or runtime-validation case and reconcile provenance',
  'inject one URL, DNS, redirect, stream, compression, timeout, abort, or publisher-budget failure and settle ownership',
  'change one PostgreSQL constraint, transaction, migration, upsert, query, or search plan and preserve admitted state',
  'reorder one timer, Promise, claim, lease, fencing, worker, disconnect, or shutdown settlement and exclude stale effects',
  'change one tenant, cursor, reader command, authorization, validator, sanitizer, or accessibility condition without leaking state',
  'change one emitted artifact, package, container, incident, backup, restore, rollback, or capacity condition and reconcile evidence',
];

const CONSTRAINTS = [
  'every external value must remain unknown until current runtime validation admits it',
  'publisher fetch and retention budgets must remain explicit',
  'every Promise, AbortSignal listener, timer, stream, pool client, transaction, lease, and handle needs an owner',
  'failed, canceled, stale, and cross-tenant work must preserve the prior admitted state',
  'browser TypeScript must remain deterministic and free of Node, network, database, and host effects',
  'the release claim must bind source, compiler, emitted JavaScript, migrations, lockfile, package, image, configuration, and restored state',
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

export function blogAggregatorTypescriptScenario(
  moduleId,
  seed,
  activityKind = 'practice',
  competency
) {
  const spec = SPECS[moduleId];
  if (!spec) throw new Error(`Missing TypeScript feed scenario profile for ${moduleId}`);
  const chosen = details(seed.toString(36));
  const probe = competency ? ` Competency probe: ${competency.statement}` : '';
  return `A ${activityKind} TypeScript team handles case ${chosen.caseNumber} during ${chosen.environment}. Build deterministic TypeScript evidence to ${spec.task}; ${chosen.constraint}; then ${chosen.change}. Browser TypeScript uses pure bounded models and original RSS, Atom, HTTP, PostgreSQL, and reader fixtures only. Real DNS, Fetch, streams, fast-xml-parser, Express, PostgreSQL, processes, signals, handle and load claims, containers, accessibility review, backups, and production behavior require explicit controlled transfer gates.${probe}`;
}

export function blogAggregatorTypescriptEvidenceContract({
  competencyId,
  moduleId,
  functionName,
  marker,
  suffix,
}) {
  const spec = SPECS[moduleId];
  if (!spec) throw new Error(`Missing TypeScript feed evidence profile for ${moduleId}`);
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
    requirement: `Append a compile-ready pure-TypeScript function headed "${marker}" that uses case ${chosen.caseNumber} to ${spec.task}. Keep defaults runnable and return observable changed-case evidence. Browser code must not import Node APIs, open streams or sockets, parse through native XML libraries, contact publishers, access PostgreSQL, read host files, handle real signals, leave timers, handles, or Promise rejections, or claim native runtime, load, accessibility, container, backup, restore, or production behavior; verify those boundaries later with TypeScript 7.0.2, the TypeScript 6.0.2 compatibility surface, Node 24.18.0, Express 5.2.1, pg 8.22.0, fast-xml-parser 5.10.0, Zod 4.4.3, PostgreSQL 18.4, original unknown fixtures, controlled Fetch and stream adapters, emitted-runtime and subprocess tests, disposable databases, handle inspection, package and image review, accessibility, capacity, backup, restore, rollback, and release gates.`,
  };
}

export function blogAggregatorTypescriptWorkedExample(moduleId, seed) {
  return blogAggregatorTypescriptEvidenceContract({
    competencyId: `feed-ts-worked-${moduleId}-${seed}`,
    moduleId,
    functionName: `worked_${moduleId.replaceAll('-', '_')}_${seed}`,
    marker: `// Evidence: feed-ts-worked-${moduleId}-${seed}`,
    suffix: `Worked${seed}`,
  }).example;
}

export const blogAggregatorTypescriptEvidenceModuleIds = Object.freeze(Object.keys(SPECS));

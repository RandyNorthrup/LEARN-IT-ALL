const SPECS = {
  'storage-go-outcomes-evidence': {
    parameters:
      'authorized, durable, retrievable, accessible bool, costCents, maximumCostCents int',
    results: '(bool, string)',
    body: `\tif !authorized { return false, "authorization" }
\tif !durable || !retrievable { return false, "custody" }
\tif !accessible { return false, "accessibility" }
\tif costCents < 0 || maximumCostCents <= 0 || costCents > maximumCostCents { return false, "cost" }
\treturn true, "stakeholder-outcome"`,
    anchors: [
      '!authorized',
      '!durable\\s*\\|\\|\\s*!retrievable',
      '!accessible',
      'costCents\\s*>\\s*maximumCostCents',
    ],
    task: 'gate stakeholder outcome on authorization, custody, accessibility, and cost evidence',
  },
  'storage-go-architecture-selection': {
    parameters: 'private, transformed, highVolume, applicationBytes bool',
    results: '(string, bool)',
    body: `\tif private && transformed { return "authorized-go-gateway", true }
\tif private && highVolume { return "signed-direct-or-edge", !applicationBytes }
\tif highVolume { return "object-origin-cdn", !applicationBytes }
\treturn "bounded-origin", applicationBytes`,
    anchors: [
      'private\\s*&&\\s*transformed',
      'private\\s*&&\\s*highVolume',
      'object-origin-cdn',
      'applicationBytes',
    ],
    task: 'select a file, object, gateway, direct, or CDN path from trust and volume evidence',
  },
  'storage-go-http-representation-transfer': {
    parameters: 'start, end, objectBytes int, conditionMatches, bodyClosed bool',
    results: '(int, int, string)',
    body: `\tif !conditionMatches { return 0, 0, "precondition" }
\tif objectBytes < 0 || start < 0 || end < start || start >= objectBytes { return 0, 0, "range" }
\tif end >= objectBytes { end = objectBytes - 1 }
\tif !bodyClosed { return start, end, "cleanup" }
\treturn start, end, "partial-content"`,
    anchors: [
      '!conditionMatches',
      'end\\s*<\\s*start',
      'end\\s*=\\s*objectBytes\\s*-\\s*1',
      '!bodyClosed',
    ],
    task: 'validate conditional inclusive byte ranges and response-body cleanup',
  },
  'storage-go-s3-object-model': {
    parameters: 'key, version string, pageItems, continuationCount int, strongRead bool',
    results: '(bool, string)',
    body: `\tif key == "" { return false, "key" }
\tif pageItems < 0 || continuationCount < 0 { return false, "pagination" }
\tif version == "" { return false, "current-version-only" }
\tif !strongRead { return false, "read-evidence" }
\treturn true, "versioned-object"`,
    anchors: ['key\\s*==\\s*""', 'pageItems\\s*<\\s*0', 'version\\s*==\\s*""', '!strongRead'],
    task: 'separate object key, version, pagination, and strong-read evidence',
  },
  'storage-go-buckets-endpoints-regions': {
    parameters: 'bucketType, region, zone string, pathStyle, sessionValid, reactivating bool',
    results: '(bool, string)',
    body: `\tif region == "" { return false, "region" }
\tif bucketType == "directory" {
\t\tif zone == "" || pathStyle { return false, "zonal-endpoint" }
\t\tif reactivating { return false, "retry-503" }
\t\tif !sessionValid { return false, "session" }
\t}
\treturn true, "endpoint"`,
    anchors: [
      'region\\s*==\\s*""',
      'bucketType\\s*==\\s*"directory"',
      'zone\\s*==\\s*""\\s*\\|\\|\\s*pathStyle',
      '!sessionValid',
    ],
    task: 'validate general or directory bucket region, zone, endpoint, reactivation, and session rules',
  },
  'storage-go-sdk-v2-contract': {
    parameters:
      'goVersion, coreVersion, s3Version string, configShared, runtimeValid, typedError bool',
    results: '(bool, string)',
    body: `\tversions := goVersion == "1.26.5" && coreVersion == "1.42.1" && s3Version == "1.105.0"
\tif !versions { return false, "version-contract" }
\tif !configShared { return false, "client-lifecycle" }
\tif !runtimeValid { return false, "runtime-validation" }
\tif !typedError { return false, "errors-is-as" }
\treturn true, "sdk-v2-contract"`,
    anchors: ['goVersion\\s*==\\s*"1.26.5"', '!configShared', '!runtimeValid', '!typedError'],
    task: 'enforce pinned Go and AWS SDK v2 versions, client lifetime, runtime validation, and typed errors',
  },
  'storage-go-client-resilience': {
    parameters:
      'classification string, attempt, maximumAttempts, elapsedMillis, deadlineMillis int, identityStable bool',
    results: '(bool, string)',
    body: `\tif !identityStable { return false, "identity" }
\tif classification == "permanent" || classification == "cancelled" { return false, classification }
\tif classification == "ambiguous-write" { return false, "reconcile" }
\twithin := attempt >= 0 && attempt < maximumAttempts && elapsedMillis >= 0 && elapsedMillis < deadlineMillis
\tif !within { return false, "budget" }
\treturn true, "bounded-retry"`,
    anchors: [
      '!identityStable',
      'classification\\s*==\\s*"permanent"',
      'ambiguous-write',
      'attempt\\s*<\\s*maximumAttempts',
    ],
    task: 'classify S3 outcomes and bound retries while preserving write ambiguity',
  },
  'storage-go-upload-admission': {
    parameters:
      'declaredBytes, observedBytes, maximumBytes, active, maximumActive int, filenameSafe, quarantined bool',
    results: '(bool, string)',
    body: `\tif declaredBytes < 0 || observedBytes < 0 || maximumBytes <= 0 { return false, "invalid-size" }
\tif declaredBytes > maximumBytes || observedBytes > maximumBytes { return false, "byte-limit" }
\tif active < 0 || active >= maximumActive { return false, "concurrency" }
\tif !filenameSafe { return false, "display-name" }
\tif !quarantined { return false, "publish-denied" }
\treturn true, "admitted-quarantine"`,
    anchors: [
      'declaredBytes\\s*>\\s*maximumBytes',
      'observedBytes\\s*>\\s*maximumBytes',
      'active\\s*>=\\s*maximumActive',
      '!quarantined',
    ],
    task: 'bound upload bytes and concurrency before quarantined publication state',
  },
  'storage-go-putobject-integrity': {
    parameters:
      'sentBytes, acceptedBytes int, checksumSent, checksumReturned string, metadataPreserved, encrypted bool',
    results: '(bool, string)',
    body: `\tif sentBytes < 0 || acceptedBytes != sentBytes { return false, "byte-count" }
\tif checksumSent == "" || checksumReturned != checksumSent { return false, "checksum" }
\tif !metadataPreserved { return false, "metadata" }
\tif !encrypted { return false, "encryption" }
\treturn true, "accepted-object"`,
    anchors: [
      'acceptedBytes\\s*!=\\s*sentBytes',
      'checksumReturned\\s*!=\\s*checksumSent',
      '!metadataPreserved',
      '!encrypted',
    ],
    task: 'prove accepted bytes, checksum, metadata, and encryption without using ETag as a universal digest',
  },
  'storage-go-transfermanager': {
    parameters:
      'version string, deprecated bool, transfers, partsPerTransfer, maximumWorkers int, rollbackReady bool',
    results: '(bool, int, string)',
    body: `\tif version != "0.3.2" || deprecated { return false, 0, "migration-version" }
\tif transfers < 0 || partsPerTransfer < 0 || maximumWorkers <= 0 { return false, 0, "capacity-input" }
\tworkers := transfers * partsPerTransfer
\tif workers > maximumWorkers { return false, workers, "aggregate-concurrency" }
\tif !rollbackReady { return false, workers, "pre-v1-rollback" }
\treturn true, workers, "transfer-admitted"`,
    anchors: [
      'version\\s*!=\\s*"0.3.2"',
      'workers\\s*:=\\s*transfers\\s*\\*\\s*partsPerTransfer',
      'workers\\s*>\\s*maximumWorkers',
      '!rollbackReady',
    ],
    task: 'adopt transfermanager 0.3.2 while rejecting deprecated use and bounding aggregate concurrency',
  },
  'storage-go-multipart-upload': {
    parameters:
      'partNumber, partBytes, completedParts, maximumParts int, etagRecorded, cancelled, aborted bool',
    results: '(bool, string)',
    body: `\tif partNumber < 1 || partBytes <= 0 || maximumParts <= 0 || partNumber > maximumParts { return false, "part" }
\tif completedParts < 0 || completedParts > maximumParts { return false, "ledger" }
\tif !etagRecorded { return false, "etag-ledger" }
\tif cancelled && !aborted { return false, "cleanup-required" }
\treturn true, "recoverable-multipart"`,
    anchors: [
      'partNumber\\s*<\\s*1',
      'completedParts\\s*>\\s*maximumParts',
      '!etagRecorded',
      'cancelled\\s*&&\\s*!aborted',
    ],
    task: 'validate multipart part state, retained ETag evidence, cancellation, and abort cleanup',
  },
  'storage-go-direct-browser-upload': {
    parameters:
      'expectedBytes, observedBytes int, expectedType, observedType, expectedChecksum, observedChecksum string, corsPassed, iamAllowed bool',
    results: '(bool, string)',
    body: `\tif expectedBytes < 0 || observedBytes != expectedBytes { return false, "size" }
\tif expectedType == "" || observedType != expectedType { return false, "content-type" }
\tif expectedChecksum == "" || observedChecksum != expectedChecksum { return false, "checksum" }
\tif corsPassed && !iamAllowed { return false, "cors-not-auth" }
\tif !iamAllowed { return false, "authorization" }
\treturn true, "finalized-intent"`,
    anchors: [
      'observedBytes\\s*!=\\s*expectedBytes',
      'observedType\\s*!=\\s*expectedType',
      'observedChecksum\\s*!=\\s*expectedChecksum',
      'corsPassed\\s*&&\\s*!iamAllowed',
    ],
    task: 'finalize a direct upload against intent while separating CORS from IAM authorization',
  },
  'storage-go-download-operations': {
    parameters: 'start, end, size int, versionFound, conditionMatches, bodyClosed bool',
    results: '(bool, int, string)',
    body: `\tif !versionFound { return false, 0, "missing-version" }
\tif !conditionMatches { return false, 0, "precondition" }
\tif size < 0 || start < 0 || end < start || start >= size { return false, 0, "range" }
\tif end >= size { end = size - 1 }
\tlength := end - start + 1
\tif !bodyClosed { return false, length, "body-leak" }
\treturn true, length, "bounded-download"`,
    anchors: [
      '!versionFound',
      '!conditionMatches',
      'length\\s*:=\\s*end\\s*-\\s*start\\s*\\+\\s*1',
      '!bodyClosed',
    ],
    task: 'validate a versioned conditional range and prove S3 response-body cleanup',
  },
  'storage-go-http-gateway': {
    parameters:
      'authenticated, authorized, methodAllowed, bodyBound, clientCancelled, goroutinesStopped bool',
    results: '(bool, string)',
    body: `\tif !authenticated { return false, "authenticate" }
\tif !authorized { return false, "authorize-object" }
\tif !methodAllowed || !bodyBound { return false, "request-admission" }
\tif clientCancelled && !goroutinesStopped { return false, "cancellation-leak" }
\tif !goroutinesStopped { return false, "shutdown-leak" }
\treturn true, "streaming-gateway"`,
    anchors: [
      '!authenticated',
      '!authorized',
      '!methodAllowed\\s*\\|\\|\\s*!bodyBound',
      'clientCancelled\\s*&&\\s*!goroutinesStopped',
    ],
    task: 'gate a streaming Go file handler on request admission and goroutine cleanup',
  },
  'storage-go-metadata-transactions': {
    parameters: 'intentStored, objectAccepted, databaseCommitted, eventCommitted, reconciled bool',
    results: '(string, bool)',
    body: `\tif !intentStored { return "reject-upload", false }
\tif objectAccepted && !databaseCommitted { return "orphan-object", reconciled }
\tif databaseCommitted && !objectAccepted { return "orphan-row", reconciled }
\tif objectAccepted && databaseCommitted && !eventCommitted { return "outbox-pending", true }
\treturn "consistent", objectAccepted && databaseCommitted`,
    anchors: [
      '!intentStored',
      'objectAccepted\\s*&&\\s*!databaseCommitted',
      'databaseCommitted\\s*&&\\s*!objectAccepted',
      '!eventCommitted',
    ],
    task: 'expose object and database crash windows and require idempotent reconciliation',
  },
  'storage-go-object-mutations': {
    parameters:
      'sourceVersion, currentVersion string, copied, metadataPreserved, destinationValidated, sourceDeleted bool',
    results: '(bool, string)',
    body: `\tif sourceVersion == "" || currentVersion != sourceVersion { return false, "stale-source" }
\tif !copied { return false, "copy-pending" }
\tif !metadataPreserved || !destinationValidated { return false, "copy-validation" }
\tif !sourceDeleted { return false, "rename-incomplete" }
\treturn true, "rename-complete"`,
    anchors: [
      'currentVersion\\s*!=\\s*sourceVersion',
      '!copied',
      '!metadataPreserved\\s*\\|\\|\\s*!destinationValidated',
      '!sourceDeleted',
    ],
    task: 'model a non-atomic version-aware copy, validate, and delete rename protocol',
  },
  'storage-go-versioning-recovery': {
    parameters: 'versioning string, versionKnown, retained, legalHold, restoreVerified bool',
    results: '(bool, string)',
    body: `\tif versioning != "enabled" && versioning != "suspended" { return false, "versioning-state" }
\tif !versionKnown { return false, "version-identity" }
\tif legalHold && !retained { return false, "retention-model" }
\tif !restoreVerified { return false, "restore-drill" }
\treturn true, "version-recoverable"`,
    anchors: [
      'versioning\\s*!=\\s*"enabled"',
      '!versionKnown',
      'legalHold\\s*&&\\s*!retained',
      '!restoreVerified',
    ],
    task: 'validate version identity, immutable retention meaning, and executed restore evidence',
  },
  'storage-go-lifecycle-storage-classes': {
    parameters:
      'ageDays, transitionDays, retentionDays, minimumDurationDays int, locked, restored bool',
    results: '(bool, string)',
    body: `\tif ageDays < 0 || transitionDays < 0 || retentionDays < 0 || minimumDurationDays < 0 { return false, "timeline" }
\tif locked && ageDays >= retentionDays { return false, "lock-prevents-expiry" }
\tif ageDays < transitionDays { return true, "current-class" }
\tif ageDays < minimumDurationDays && !restored { return false, "early-transition-cost" }
\treturn true, "lifecycle-eligible"`,
    anchors: [
      'ageDays\\s*<\\s*0',
      'locked\\s*&&\\s*ageDays\\s*>=\\s*retentionDays',
      'ageDays\\s*<\\s*transitionDays',
      'ageDays\\s*<\\s*minimumDurationDays',
    ],
    task: 'evaluate lifecycle transition, retention lock, restore, and minimum-duration cost',
  },
  'storage-go-iam-bucket-security': {
    parameters:
      'principal, action, resource string, explicitDeny, publicBlocked, ownerEnforced, tenantBound bool',
    results: '(bool, string)',
    body: `\tif principal == "" || action == "" || resource == "" { return false, "policy-input" }
\tif explicitDeny { return false, "explicit-deny" }
\tif !publicBlocked || !ownerEnforced { return false, "bucket-posture" }
\tif !tenantBound { return false, "tenant-boundary" }
\treturn true, "least-privilege"`,
    anchors: [
      'principal\\s*==\\s*""',
      'if\\s+explicitDeny',
      '!publicBlocked\\s*\\|\\|\\s*!ownerEnforced',
      '!tenantBound',
    ],
    task: 'prove explicit-deny-aware least privilege, public block, ownership, and tenant scope',
  },
  'storage-go-encryption-key-management': {
    parameters:
      'transportTLS, encrypted, kmsAllowed, contextBound, rotationTested, oldReadTested bool',
    results: '(bool, string)',
    body: `\tif !transportTLS { return false, "transport" }
\tif !encrypted { return false, "at-rest" }
\tif !kmsAllowed || !contextBound { return false, "kms-policy" }
\tif !rotationTested || !oldReadTested { return false, "rotation-drill" }
\treturn true, "encryption-contract"`,
    anchors: [
      '!transportTLS',
      '!encrypted',
      '!kmsAllowed\\s*\\|\\|\\s*!contextBound',
      '!rotationTested\\s*\\|\\|\\s*!oldReadTested',
    ],
    task: 'separate transport, storage, KMS authorization, context, and rotation evidence',
  },
  'storage-go-signed-access': {
    parameters: 'now, notBefore, expires int, resourceExact, keyActive, sha256 bool',
    results: '(bool, string)',
    body: `\tif expires <= notBefore || now < notBefore { return false, "time-window" }
\tif now >= expires { return false, "expired" }
\tif !resourceExact { return false, "resource-scope" }
\tif !keyActive { return false, "key-group" }
\tif !sha256 { return false, "hash-algorithm-review" }
\treturn true, "signed-access"`,
    anchors: ['expires\\s*<=\\s*notBefore', 'now\\s*>=\\s*expires', '!resourceExact', '!sha256'],
    task: 'bound signed access by time, resource, key group, and explicit SHA-256 review',
  },
  'storage-go-cloudfront-oac-origin': {
    parameters:
      'regularOrigin, alwaysSign, sourceArnExact, bucketOwnerEnforced, kmsPolicyAllows bool',
    results: '(bool, string)',
    body: `\tif !regularOrigin { return false, "website-origin-unsupported" }
\tif !alwaysSign { return false, "origin-signing" }
\tif !sourceArnExact { return false, "distribution-scope" }
\tif !bucketOwnerEnforced { return false, "ownership" }
\tif !kmsPolicyAllows { return false, "kms-service-policy" }
\treturn true, "private-oac-origin"`,
    anchors: ['!regularOrigin', '!alwaysSign', '!sourceArnExact', '!kmsPolicyAllows'],
    task: 'validate a regular S3 OAC origin with exact distribution and KMS authorization',
  },
  'storage-go-cloudfront-cache': {
    parameters:
      'representationDimensions, cacheDimensions, forwardedOnlyDimensions, ttlSeconds int, versionedName, urgentPurge bool',
    results: '(bool, string)',
    body: `\tif representationDimensions < 0 || cacheDimensions != representationDimensions { return false, "cache-identity" }
\tif forwardedOnlyDimensions < 0 { return false, "origin-policy" }
\tif ttlSeconds < 0 { return false, "ttl" }
\tif !versionedName && !urgentPurge { return false, "freshness-plan" }
\tif urgentPurge { return true, "bounded-invalidation" }
\treturn true, "immutable-version"`,
    anchors: [
      'cacheDimensions\\s*!=\\s*representationDimensions',
      'forwardedOnlyDimensions\\s*<\\s*0',
      'ttlSeconds\\s*<\\s*0',
      '!versionedName\\s*&&\\s*!urgentPurge',
    ],
    task: 'align cache identity, origin forwarding, TTL, versioned names, and urgent invalidation',
  },
  'storage-go-media-range-streaming': {
    parameters: 'start, end, size int, ascending, nonoverlap, fastStart, captions, keyboard bool',
    results: '(bool, int, string)',
    body: `\tif size <= 0 || start < 0 || end < start || end >= size { return false, 0, "range" }
\tif !ascending || !nonoverlap { return false, 0, "cloudfront-range" }
\tlength := end - start + 1
\tif !fastStart { return false, length, "mp4-layout" }
\tif !captions || !keyboard { return false, length, "accessibility" }
\treturn true, length, "media-ready"`,
    anchors: [
      'end\\s*>=\\s*size',
      '!ascending\\s*\\|\\|\\s*!nonoverlap',
      '!fastStart',
      '!captions\\s*\\|\\|\\s*!keyboard',
    ],
    task: 'validate CloudFront range shape, progressive media layout, and accessible playback',
  },
  'storage-go-edge-security': {
    parameters:
      'authorized, wafAllowed, refererOnly, securityHeaders, originProtected, privateErrorCached bool',
    results: '(bool, string)',
    body: `\tif !authorized { return false, "application-authorization" }
\tif !wafAllowed { return false, "edge-control" }
\tif refererOnly { return false, "weak-hotlink-control" }
\tif !securityHeaders || !originProtected { return false, "edge-posture" }
\tif privateErrorCached { return false, "private-error-cache" }
\treturn true, "layered-edge-defense"`,
    anchors: ['!authorized', '!wafAllowed', 'if\\s+refererOnly', 'privateErrorCached'],
    task: 'layer application authorization, WAF, origin protection, headers, and safe error caching',
  },
  'storage-go-durability-disaster-recovery': {
    parameters:
      'members, healthy int, replicationCurrent, backupIndependent, restorePassed, failoverTested bool',
    results: '(bool, string)',
    body: `\tif members < 2 || healthy < 0 || healthy > members { return false, "region-model" }
\tif !replicationCurrent { return false, "replication-lag" }
\tif !backupIndependent { return false, "account-boundary" }
\tif !restorePassed { return false, "restore" }
\tif !failoverTested { return false, "failover" }
\treturn true, "recovery-evidence"`,
    anchors: ['members\\s*<\\s*2', '!replicationCurrent', '!backupIndependent', '!failoverTested'],
    task: 'separate replication, independent backup, restore, and failover evidence',
  },
  'storage-go-events-observability-cost': {
    parameters:
      'eventID string, duplicate, ordered bool, metricLabels, maximumLabels, observedCost, budget int',
    results: '(bool, string)',
    body: `\tif eventID == "" { return false, "event-identity" }
\tif duplicate { return false, "idempotent-suppress" }
\tif ordered { return false, "ordering-overclaim" }
\tif metricLabels < 0 || metricLabels > maximumLabels { return false, "cardinality" }
\tif observedCost < 0 || observedCost > budget { return false, "cost-budget" }
\treturn true, "observable-capacity"`,
    anchors: [
      'eventID\\s*==\\s*""',
      'if\\s+duplicate',
      'if\\s+ordered',
      'observedCost\\s*>\\s*budget',
    ],
    task: 'handle duplicate unordered events with bounded telemetry cardinality and cost',
  },
  'storage-go-testing-release-defense': {
    parameters: 'unit, fuzz, race, leak, awsContract, fault, load, restore, rollback bool',
    results: '(bool, string)',
    body: `\tif !unit || !fuzz { return false, "deterministic-gates" }
\tif !race || !leak { return false, "go-runtime-gates" }
\tif !awsContract { return false, "aws-transfer-gate" }
\tif !fault || !load || !restore { return false, "resilience-gates" }
\tif !rollback { return false, "release-recovery" }
\treturn true, "production-defense"`,
    anchors: ['!unit\\s*\\|\\|\\s*!fuzz', '!race\\s*\\|\\|\\s*!leak', '!awsContract', '!rollback'],
    task: 'gate release on deterministic, Go runtime, controlled AWS, fault, load, restore, and rollback evidence',
  },
};

const ENVIRONMENTS = [
  'a high-traffic evidence intake window',
  'a private media release',
  'a regional dependency incident',
  'a compliance restore drill',
  'a cost-anomaly investigation',
  'an SDK and infrastructure canary',
];

const CHANGES = [
  'change the object version and prove stale authority is rejected',
  'double concurrent transfers and keep process resource limits intact',
  'cancel halfway through and prove every body, part, and goroutine reaches a terminal state',
  'change region, range, or signed header and explain the exact failure boundary',
  'introduce a duplicate event or ambiguous response and reconcile without duplicate effect',
  'change cache and retrieval cost assumptions and defend the new budget result',
];

const CONSTRAINTS = [
  'retain stable tenant and file identity without exposing it in metric labels',
  'cap bytes, time, attempts, concurrency, and spend before starting work',
  'keep browser execution deterministic and move AWS claims to an authorized transfer gate',
  'preserve accessible progress, cancellation, status, and recovery evidence',
  'do not treat an ETag, CORS result, emulator, or successful SDK call as stronger proof than it is',
  'record cleanup, rollback, restoration, and residual-risk ownership',
];

function details(suffix) {
  const cleaned = suffix.replace(/[^a-z0-9]/giu, '').toLowerCase() || '0';
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

export function fileServersS3GoScenario(moduleId, seed, activityKind = 'practice', competency) {
  const spec = SPECS[moduleId];
  if (!spec) throw new Error(`Missing S3 and Go scenario profile for ${moduleId}`);
  const chosen = details(seed.toString(36));
  const probe = competency ? ` Competency probe: ${competency.statement}` : '';
  return `A ${activityKind} Go file-delivery team handles case ${chosen.caseNumber} during ${chosen.environment}. Build deterministic Go evidence to ${spec.task}; ${chosen.constraint}; then ${chosen.change}. Browser code uses pure values and state transitions only. AWS SDK packages, networks, S3, CloudFront, KMS, IAM, WAF, databases, credentials, host state, race and leak checks, load, faults, restore, billing, and production behavior require explicit authorized transfer gates.${probe}`;
}

export function fileServersS3GoEvidenceContract({
  competencyId,
  moduleId,
  functionName,
  marker,
  suffix,
}) {
  const spec = SPECS[moduleId];
  if (!spec) throw new Error(`Missing S3 and Go evidence profile for ${moduleId}`);
  const chosen = details(suffix);
  const scope = '(?:(?!// Evidence:)[\\s\\S])';
  return {
    marker,
    pattern: `${marker}${scope}*?func\\s+${functionName}\\s*\\([^)]*\\)\\s*\\([^)]*\\)\\s*\\{${lookaheads(spec.anchors, scope)}(?=${scope}*?return)${scope}*?return`,
    example: `${marker}
// Competency: ${competencyId}.
// Case ${chosen.caseNumber}: ${chosen.environment}.
// Operating constraint: ${chosen.constraint}.
// Changed case: ${chosen.change}.
func ${functionName}(${spec.parameters}) ${spec.results} {
\tevidenceVariant${suffix} := "${suffix}-${[...suffix].reverse().join('')}-${chosen.caseNumber}"
\t_ = evidenceVariant${suffix}
${spec.body}
}`,
    requirement: `Append a compile-ready pure-Go function headed "${marker}" that uses case ${chosen.caseNumber} to ${spec.task}. Return observable changed-case evidence. Browser code must not import AWS SDK packages, open sockets, contact S3, CloudFront, KMS, IAM, WAF, networks, databases, or external effects, read host state, execute host commands, or use credentials; verify those boundaries later with Go 1.26.5 compile, vet, fuzz, race, leak, controlled AWS, load, fault, security, cost, restore, and production gates.`,
  };
}

export function fileServersS3GoWorkedExample(moduleId, seed) {
  return fileServersS3GoEvidenceContract({
    competencyId: `storage-go-worked-${moduleId}-${seed}`,
    moduleId,
    functionName: `worked_${moduleId.replaceAll('-', '_')}_${seed}`,
    marker: `// Evidence: storage-go-worked-${moduleId}-${seed}`,
    suffix: `worked${seed}`,
  }).example;
}

export const fileServersS3GoEvidenceModuleIds = Object.freeze(Object.keys(SPECS));

const SPECS = {
  'storage-ts-outcomes-evidence': {
    parameters:
      'input: Readonly<{ authorized: boolean; durable: boolean; retrievable: boolean; accessible: boolean; costCents: number; maximumCostCents: number }>',
    result: '{ ok: boolean; reason: string }',
    body: `  if (!input.authorized) return { ok: false, reason: "authorization" };
  if (!input.durable || !input.retrievable) return { ok: false, reason: "custody" };
  if (!input.accessible) return { ok: false, reason: "accessibility" };
  if (input.costCents < 0 || input.maximumCostCents <= 0 || input.costCents > input.maximumCostCents) return { ok: false, reason: "cost" };
  return { ok: true, reason: "stakeholder-outcome" };`,
    anchors: [
      '!input\\.authorized',
      '!input\\.durable\\s*\\|\\|\\s*!input\\.retrievable',
      '!input\\.accessible',
      'input\\.costCents\\s*>\\s*input\\.maximumCostCents',
    ],
    task: 'evaluate a discriminated stakeholder outcome from authorization, custody, accessibility, and cost',
  },
  'storage-ts-architecture-selection': {
    parameters:
      'input: Readonly<{ privateContent: boolean; transformed: boolean; highVolume: boolean; applicationBytes: boolean }>',
    result: '{ path: string; bounded: boolean }',
    body: `  if (input.privateContent && input.transformed) return { path: "authorized-node-gateway", bounded: true };
  if (input.privateContent && input.highVolume) return { path: "signed-direct-or-edge", bounded: !input.applicationBytes };
  if (input.highVolume) return { path: "object-origin-cdn", bounded: !input.applicationBytes };
  return { path: "bounded-origin", bounded: input.applicationBytes };`,
    anchors: [
      'input\\.privateContent\\s*&&\\s*input\\.transformed',
      'input\\.privateContent\\s*&&\\s*input\\.highVolume',
      'object-origin-cdn',
      '!input\\.applicationBytes',
    ],
    task: 'select a typed control and data plane from trust, transformation, and volume evidence',
  },
  'storage-ts-http-representation-transfer': {
    parameters:
      'input: Readonly<{ start: number; end: number; objectBytes: number; conditionMatches: boolean; streamClosed: boolean }>',
    result: '{ status: string; length: number }',
    body: `  if (!input.conditionMatches) return { status: "precondition", length: 0 };
  if (input.objectBytes < 0 || input.start < 0 || input.end < input.start || input.start >= input.objectBytes) return { status: "range", length: 0 };
  const end = Math.min(input.end, input.objectBytes - 1);
  const length = end - input.start + 1;
  if (!input.streamClosed) return { status: "cleanup", length };
  return { status: "partial-content", length };`,
    anchors: [
      '!input\\.conditionMatches',
      'input\\.end\\s*<\\s*input\\.start',
      'Math\\.min\\(input\\.end',
      '!input\\.streamClosed',
    ],
    task: 'validate inclusive HTTP byte ranges and TypeScript stream cleanup',
  },
  'storage-ts-s3-object-model': {
    parameters:
      'input: Readonly<{ key: string; version: string; pageItems: number; continuationCount: number; strongRead: boolean }>',
    result: '{ valid: boolean; identity: string }',
    body: `  if (input.key.length === 0) return { valid: false, identity: "key" };
  if (input.pageItems < 0 || input.continuationCount < 0) return { valid: false, identity: "pagination" };
  if (input.version.length === 0) return { valid: false, identity: "current-version-only" };
  if (!input.strongRead) return { valid: false, identity: "read-evidence" };
  return { valid: true, identity: input.key + "@" + input.version };`,
    anchors: [
      'input\\.key\\.length\\s*===\\s*0',
      'input\\.pageItems\\s*<\\s*0',
      'input\\.version\\.length\\s*===\\s*0',
      '!input\\.strongRead',
    ],
    task: 'separate runtime-valid object key, version, pagination, and strong-read evidence',
  },
  'storage-ts-buckets-endpoints-regions': {
    parameters:
      'input: Readonly<{ bucketType: "general" | "directory"; region: string; zone: string; pathStyle: boolean; sessionValid: boolean; reactivating: boolean }>',
    result: '{ usable: boolean; reason: string }',
    body: `  if (input.region.length === 0) return { usable: false, reason: "region" };
  if (input.bucketType === "directory") {
    if (input.zone.length === 0 || input.pathStyle) return { usable: false, reason: "zonal-endpoint" };
    if (input.reactivating) return { usable: false, reason: "retry-503" };
    if (!input.sessionValid) return { usable: false, reason: "session" };
  }
  return { usable: true, reason: "endpoint" };`,
    anchors: [
      'input\\.region\\.length\\s*===\\s*0',
      'input\\.bucketType\\s*===\\s*"directory"',
      'input\\.zone\\.length\\s*===\\s*0\\s*\\|\\|\\s*input\\.pathStyle',
      '!input\\.sessionValid',
    ],
    task: 'narrow bucket type before validating directory-bucket endpoint and session state',
  },
  'storage-ts-sdk-v2-contract': {
    parameters:
      'input: Readonly<{ node: string; typescript: string; sdk: string; modularClient: boolean; runtimeValid: boolean; serviceErrorNarrowed: boolean }>',
    result: '{ accepted: boolean; boundary: string }',
    body: `  const versions = input.node === "24.18.0" && input.typescript === "7.0.2" && input.sdk === "3.1087.0";
  if (!versions) return { accepted: false, boundary: "version-contract" };
  if (!input.modularClient) return { accepted: false, boundary: "client-command" };
  if (!input.runtimeValid) return { accepted: false, boundary: "unknown-input" };
  if (!input.serviceErrorNarrowed) return { accepted: false, boundary: "service-exception" };
  return { accepted: true, boundary: "sdk-v3-contract" };`,
    anchors: [
      'input\\.node\\s*===\\s*"24\\.18\\.0"',
      '!input\\.modularClient',
      '!input\\.runtimeValid',
      '!input\\.serviceErrorNarrowed',
    ],
    task: 'enforce pinned Node, TypeScript, AWS SDK v3, modular client, runtime validation, and service-error narrowing',
  },
  'storage-ts-client-resilience': {
    parameters:
      'input: Readonly<{ classification: "transient" | "permanent" | "cancelled" | "ambiguous-write"; attempt: number; maximumAttempts: number; elapsedMs: number; deadlineMs: number; identityStable: boolean }>',
    result: '{ retry: boolean; reason: string }',
    body: `  if (!input.identityStable) return { retry: false, reason: "identity" };
  if (input.classification === "permanent" || input.classification === "cancelled") return { retry: false, reason: input.classification };
  if (input.classification === "ambiguous-write") return { retry: false, reason: "reconcile" };
  const within = input.attempt >= 0 && input.attempt < input.maximumAttempts && input.elapsedMs >= 0 && input.elapsedMs < input.deadlineMs;
  return { retry: within, reason: within ? "bounded-retry" : "budget" };`,
    anchors: [
      '!input\\.identityStable',
      'input\\.classification\\s*===\\s*"permanent"',
      'input\\.classification\\s*===\\s*"ambiguous-write"',
      'input\\.attempt\\s*<\\s*input\\.maximumAttempts',
    ],
    task: 'narrow retry outcomes and preserve AbortSignal and ambiguous-write reconciliation',
  },
  'storage-ts-upload-admission': {
    parameters:
      'input: Readonly<{ declaredBytes: number; observedBytes: number; maximumBytes: number; active: number; maximumActive: number; displayNameSafe: boolean; quarantined: boolean }>',
    result: '{ admitted: boolean; state: string }',
    body: `  if (input.declaredBytes < 0 || input.observedBytes < 0 || input.maximumBytes <= 0) return { admitted: false, state: "invalid-size" };
  if (input.declaredBytes > input.maximumBytes || input.observedBytes > input.maximumBytes) return { admitted: false, state: "byte-limit" };
  if (input.active < 0 || input.active >= input.maximumActive) return { admitted: false, state: "concurrency" };
  if (!input.displayNameSafe) return { admitted: false, state: "display-name" };
  return { admitted: input.quarantined, state: input.quarantined ? "quarantine" : "publish-denied" };`,
    anchors: [
      'input\\.declaredBytes\\s*>\\s*input\\.maximumBytes',
      'input\\.observedBytes\\s*>\\s*input\\.maximumBytes',
      'input\\.active\\s*>=\\s*input\\.maximumActive',
      'input\\.quarantined\\s*\\?',
    ],
    task: 'validate upload byte and concurrency budgets before a quarantined state transition',
  },
  'storage-ts-putobject-integrity': {
    parameters:
      'input: Readonly<{ sentBytes: number; acceptedBytes: number; checksumSent: string; checksumReturned: string; metadataPreserved: boolean; encrypted: boolean }>',
    result: '{ verified: boolean; reason: string }',
    body: `  if (input.sentBytes < 0 || input.acceptedBytes !== input.sentBytes) return { verified: false, reason: "byte-count" };
  if (input.checksumSent.length === 0 || input.checksumReturned !== input.checksumSent) return { verified: false, reason: "checksum" };
  if (!input.metadataPreserved) return { verified: false, reason: "metadata" };
  if (!input.encrypted) return { verified: false, reason: "encryption" };
  return { verified: true, reason: "accepted-object" };`,
    anchors: [
      'input\\.acceptedBytes\\s*!==\\s*input\\.sentBytes',
      'input\\.checksumReturned\\s*!==\\s*input\\.checksumSent',
      '!input\\.metadataPreserved',
      '!input\\.encrypted',
    ],
    task: 'verify PutObject bytes, checksum, metadata, and encryption without ETag overclaim',
  },
  'storage-ts-transfermanager': {
    parameters:
      'input: Readonly<{ sdkVersion: string; queueSize: number; partSize: number; activeUploads: number; maximumWorkers: number; leavePartsOnError: boolean; abortOwned: boolean }>',
    result: '{ admitted: boolean; workers: number; reason: string }',
    body: `  if (input.sdkVersion !== "3.1087.0") return { admitted: false, workers: 0, reason: "version" };
  if (input.queueSize <= 0 || input.partSize <= 0 || input.activeUploads < 0 || input.maximumWorkers <= 0) return { admitted: false, workers: 0, reason: "capacity-input" };
  const workers = input.queueSize * input.activeUploads;
  if (workers > input.maximumWorkers) return { admitted: false, workers, reason: "aggregate-concurrency" };
  if (input.leavePartsOnError || !input.abortOwned) return { admitted: false, workers, reason: "cleanup-policy" };
  return { admitted: true, workers, reason: "lib-storage-upload" };`,
    anchors: [
      'input\\.sdkVersion\\s*!==\\s*"3\\.1087\\.0"',
      'workers\\s*=\\s*input\\.queueSize\\s*\\*\\s*input\\.activeUploads',
      'workers\\s*>\\s*input\\.maximumWorkers',
      'input\\.leavePartsOnError\\s*\\|\\|\\s*!input\\.abortOwned',
    ],
    task: 'bound @aws-sdk/lib-storage Upload workers, part buffers, abort ownership, and cleanup policy',
  },
  'storage-ts-multipart-upload': {
    parameters:
      'input: Readonly<{ partNumber: number; partBytes: number; completedParts: number; maximumParts: number; etagRecorded: boolean; aborted: boolean; signalAborted: boolean }>',
    result: '{ recoverable: boolean; reason: string }',
    body: `  if (input.partNumber < 1 || input.partBytes <= 0 || input.maximumParts <= 0 || input.partNumber > input.maximumParts) return { recoverable: false, reason: "part" };
  if (input.completedParts < 0 || input.completedParts > input.maximumParts) return { recoverable: false, reason: "ledger" };
  if (!input.etagRecorded) return { recoverable: false, reason: "etag-ledger" };
  if (input.signalAborted && !input.aborted) return { recoverable: false, reason: "cleanup-required" };
  return { recoverable: true, reason: "multipart-state" };`,
    anchors: [
      'input\\.partNumber\\s*<\\s*1',
      'input\\.completedParts\\s*>\\s*input\\.maximumParts',
      '!input\\.etagRecorded',
      'input\\.signalAborted\\s*&&\\s*!input\\.aborted',
    ],
    task: 'validate readonly multipart part evidence and AbortSignal-driven cleanup',
  },
  'storage-ts-direct-browser-upload': {
    parameters:
      'input: Readonly<{ expectedBytes: number; observedBytes: number; expectedType: string; observedType: string; expectedChecksum: string; observedChecksum: string; corsPassed: boolean; iamAllowed: boolean }>',
    result: '{ finalized: boolean; reason: string }',
    body: `  if (input.expectedBytes < 0 || input.observedBytes !== input.expectedBytes) return { finalized: false, reason: "size" };
  if (input.expectedType.length === 0 || input.observedType !== input.expectedType) return { finalized: false, reason: "content-type" };
  if (input.expectedChecksum.length === 0 || input.observedChecksum !== input.expectedChecksum) return { finalized: false, reason: "checksum" };
  if (input.corsPassed && !input.iamAllowed) return { finalized: false, reason: "cors-not-auth" };
  return { finalized: input.iamAllowed, reason: input.iamAllowed ? "intent-complete" : "authorization" };`,
    anchors: [
      'input\\.observedBytes\\s*!==\\s*input\\.expectedBytes',
      'input\\.observedType\\s*!==\\s*input\\.expectedType',
      'input\\.observedChecksum\\s*!==\\s*input\\.expectedChecksum',
      'input\\.corsPassed\\s*&&\\s*!input\\.iamAllowed',
    ],
    task: 'finalize a browser upload intent while separating CORS from IAM and promise completion',
  },
  'storage-ts-download-operations': {
    parameters:
      'input: Readonly<{ start: number; end: number; size: number; versionFound: boolean; conditionMatches: boolean; streamClosed: boolean }>',
    result: '{ allowed: boolean; length: number; reason: string }',
    body: `  if (!input.versionFound) return { allowed: false, length: 0, reason: "missing-version" };
  if (!input.conditionMatches) return { allowed: false, length: 0, reason: "precondition" };
  if (input.size < 0 || input.start < 0 || input.end < input.start || input.start >= input.size) return { allowed: false, length: 0, reason: "range" };
  const end = Math.min(input.end, input.size - 1);
  const length = end - input.start + 1;
  return { allowed: input.streamClosed, length, reason: input.streamClosed ? "bounded-download" : "stream-leak" };`,
    anchors: [
      '!input\\.versionFound',
      '!input\\.conditionMatches',
      'length\\s*=\\s*end\\s*-\\s*input\\.start\\s*\\+\\s*1',
      'input\\.streamClosed\\s*\\?',
    ],
    task: 'validate a versioned conditional range and prove SdkStream cleanup',
  },
  'storage-ts-http-gateway': {
    parameters:
      'input: Readonly<{ authenticated: boolean; authorized: boolean; methodAllowed: boolean; bodyBound: boolean; signalAborted: boolean; tasksStopped: boolean }>',
    result: '{ handled: boolean; reason: string }',
    body: `  if (!input.authenticated) return { handled: false, reason: "authenticate" };
  if (!input.authorized) return { handled: false, reason: "authorize-object" };
  if (!input.methodAllowed || !input.bodyBound) return { handled: false, reason: "request-admission" };
  if (input.signalAborted && !input.tasksStopped) return { handled: false, reason: "abort-leak" };
  return { handled: input.tasksStopped, reason: input.tasksStopped ? "streaming-gateway" : "shutdown-leak" };`,
    anchors: [
      '!input\\.authenticated',
      '!input\\.authorized',
      '!input\\.methodAllowed\\s*\\|\\|\\s*!input\\.bodyBound',
      'input\\.signalAborted\\s*&&\\s*!input\\.tasksStopped',
    ],
    task: 'gate a Node file handler on runtime admission, AbortSignal, and async-task cleanup',
  },
  'storage-ts-metadata-transactions': {
    parameters:
      'input: Readonly<{ intentStored: boolean; objectAccepted: boolean; databaseCommitted: boolean; eventCommitted: boolean; reconciled: boolean }>',
    result: '{ state: string; complete: boolean }',
    body: `  if (!input.intentStored) return { state: "reject-upload", complete: false };
  if (input.objectAccepted && !input.databaseCommitted) return { state: "orphan-object", complete: input.reconciled };
  if (input.databaseCommitted && !input.objectAccepted) return { state: "orphan-row", complete: input.reconciled };
  if (input.objectAccepted && input.databaseCommitted && !input.eventCommitted) return { state: "outbox-pending", complete: true };
  return { state: "consistent", complete: input.objectAccepted && input.databaseCommitted };`,
    anchors: [
      '!input\\.intentStored',
      'input\\.objectAccepted\\s*&&\\s*!input\\.databaseCommitted',
      'input\\.databaseCommitted\\s*&&\\s*!input\\.objectAccepted',
      '!input\\.eventCommitted',
    ],
    task: 'expose PostgreSQL and S3 crash windows through an exhaustive workflow-state result',
  },
  'storage-ts-object-mutations': {
    parameters:
      'input: Readonly<{ sourceVersion: string; currentVersion: string; copied: boolean; metadataPreserved: boolean; destinationValidated: boolean; sourceDeleted: boolean }>',
    result: '{ complete: boolean; state: string }',
    body: `  if (input.sourceVersion.length === 0 || input.currentVersion !== input.sourceVersion) return { complete: false, state: "stale-source" };
  if (!input.copied) return { complete: false, state: "copy-pending" };
  if (!input.metadataPreserved || !input.destinationValidated) return { complete: false, state: "copy-validation" };
  if (!input.sourceDeleted) return { complete: false, state: "rename-incomplete" };
  return { complete: true, state: "rename-complete" };`,
    anchors: [
      'input\\.currentVersion\\s*!==\\s*input\\.sourceVersion',
      '!input\\.copied',
      '!input\\.metadataPreserved\\s*\\|\\|\\s*!input\\.destinationValidated',
      '!input\\.sourceDeleted',
    ],
    task: 'model a version-aware non-atomic copy, validate, and delete rename workflow',
  },
  'storage-ts-versioning-recovery': {
    parameters:
      'input: Readonly<{ versioning: "enabled" | "suspended" | "unversioned"; versionKnown: boolean; retained: boolean; legalHold: boolean; restoreVerified: boolean }>',
    result: '{ recoverable: boolean; reason: string }',
    body: `  if (input.versioning === "unversioned") return { recoverable: false, reason: "versioning-state" };
  if (!input.versionKnown) return { recoverable: false, reason: "version-identity" };
  if (input.legalHold && !input.retained) return { recoverable: false, reason: "retention-model" };
  if (!input.restoreVerified) return { recoverable: false, reason: "restore-drill" };
  return { recoverable: true, reason: "version-recoverable" };`,
    anchors: [
      'input\\.versioning\\s*===\\s*"unversioned"',
      '!input\\.versionKnown',
      'input\\.legalHold\\s*&&\\s*!input\\.retained',
      '!input\\.restoreVerified',
    ],
    task: 'narrow versioning state and require version-specific retention and restore evidence',
  },
  'storage-ts-lifecycle-storage-classes': {
    parameters:
      'input: Readonly<{ ageDays: number; transitionDays: number; retentionDays: number; minimumDurationDays: number; locked: boolean; restored: boolean }>',
    result: '{ eligible: boolean; reason: string }',
    body: `  if (input.ageDays < 0 || input.transitionDays < 0 || input.retentionDays < 0 || input.minimumDurationDays < 0) return { eligible: false, reason: "timeline" };
  if (input.locked && input.ageDays >= input.retentionDays) return { eligible: false, reason: "lock-prevents-expiry" };
  if (input.ageDays < input.transitionDays) return { eligible: true, reason: "current-class" };
  if (input.ageDays < input.minimumDurationDays && !input.restored) return { eligible: false, reason: "early-transition-cost" };
  return { eligible: true, reason: "lifecycle-eligible" };`,
    anchors: [
      'input\\.ageDays\\s*<\\s*0',
      'input\\.locked\\s*&&\\s*input\\.ageDays\\s*>=\\s*input\\.retentionDays',
      'input\\.ageDays\\s*<\\s*input\\.transitionDays',
      'input\\.ageDays\\s*<\\s*input\\.minimumDurationDays',
    ],
    task: 'evaluate lifecycle and archive state with retention and minimum-duration cost',
  },
  'storage-ts-iam-bucket-security': {
    parameters:
      'input: Readonly<{ principal: string; action: string; resource: string; explicitDeny: boolean; publicBlocked: boolean; ownerEnforced: boolean; tenantBound: boolean }>',
    result: '{ allowed: boolean; reason: string }',
    body: `  if (input.principal.length === 0 || input.action.length === 0 || input.resource.length === 0) return { allowed: false, reason: "policy-input" };
  if (input.explicitDeny) return { allowed: false, reason: "explicit-deny" };
  if (!input.publicBlocked || !input.ownerEnforced) return { allowed: false, reason: "bucket-posture" };
  if (!input.tenantBound) return { allowed: false, reason: "tenant-boundary" };
  return { allowed: true, reason: "least-privilege" };`,
    anchors: [
      'input\\.principal\\.length\\s*===\\s*0',
      'input\\.explicitDeny',
      '!input\\.publicBlocked\\s*\\|\\|\\s*!input\\.ownerEnforced',
      '!input\\.tenantBound',
    ],
    task: 'evaluate a runtime-validated explicit-deny-aware tenant authorization record',
  },
  'storage-ts-encryption-key-management': {
    parameters:
      'input: Readonly<{ transportTls: boolean; encrypted: boolean; kmsAllowed: boolean; contextBound: boolean; rotationTested: boolean; oldReadTested: boolean }>',
    result: '{ verified: boolean; boundary: string }',
    body: `  if (!input.transportTls) return { verified: false, boundary: "transport" };
  if (!input.encrypted) return { verified: false, boundary: "at-rest" };
  if (!input.kmsAllowed || !input.contextBound) return { verified: false, boundary: "kms-policy" };
  if (!input.rotationTested || !input.oldReadTested) return { verified: false, boundary: "rotation-drill" };
  return { verified: true, boundary: "encryption-contract" };`,
    anchors: [
      '!input\\.transportTls',
      '!input\\.encrypted',
      '!input\\.kmsAllowed\\s*\\|\\|\\s*!input\\.contextBound',
      '!input\\.rotationTested\\s*\\|\\|\\s*!input\\.oldReadTested',
    ],
    task: 'separate TLS, server encryption, KMS policy, context, and rotation evidence',
  },
  'storage-ts-signed-access': {
    parameters:
      'input: Readonly<{ now: number; notBefore: number; expires: number; resourceExact: boolean; keyActive: boolean; bearerLogged: boolean }>',
    result: '{ valid: boolean; reason: string }',
    body: `  if (input.expires <= input.notBefore || input.now < input.notBefore) return { valid: false, reason: "time-window" };
  if (input.now >= input.expires) return { valid: false, reason: "expired" };
  if (!input.resourceExact) return { valid: false, reason: "resource-scope" };
  if (!input.keyActive) return { valid: false, reason: "key-group" };
  if (input.bearerLogged) return { valid: false, reason: "bearer-leak" };
  return { valid: true, reason: "signed-access" };`,
    anchors: [
      'input\\.expires\\s*<=\\s*input\\.notBefore',
      'input\\.now\\s*>=\\s*input\\.expires',
      '!input\\.resourceExact',
      'input\\.bearerLogged',
    ],
    task: 'bound SDK v3 signed access by exact time, resource, key, and bearer handling',
  },
  'storage-ts-cloudfront-oac-origin': {
    parameters:
      'input: Readonly<{ regularOrigin: boolean; alwaysSign: boolean; sourceArnExact: boolean; ownerEnforced: boolean; kmsPolicyAllows: boolean }>',
    result: '{ privateOrigin: boolean; reason: string }',
    body: `  if (!input.regularOrigin) return { privateOrigin: false, reason: "website-origin-unsupported" };
  if (!input.alwaysSign) return { privateOrigin: false, reason: "origin-signing" };
  if (!input.sourceArnExact) return { privateOrigin: false, reason: "distribution-scope" };
  if (!input.ownerEnforced) return { privateOrigin: false, reason: "ownership" };
  if (!input.kmsPolicyAllows) return { privateOrigin: false, reason: "kms-service-policy" };
  return { privateOrigin: true, reason: "oac-origin" };`,
    anchors: [
      '!input\\.regularOrigin',
      '!input\\.alwaysSign',
      '!input\\.sourceArnExact',
      '!input\\.kmsPolicyAllows',
    ],
    task: 'validate an OAC origin with exact distribution, ownership, and KMS policy',
  },
  'storage-ts-cloudfront-cache': {
    parameters:
      'input: Readonly<{ representationDimensions: number; cacheDimensions: number; forwardedOnlyDimensions: number; ttlSeconds: number; versionedName: boolean; urgentPurge: boolean }>',
    result: '{ safe: boolean; strategy: string }',
    body: `  if (input.representationDimensions < 0 || input.cacheDimensions !== input.representationDimensions) return { safe: false, strategy: "cache-identity" };
  if (input.forwardedOnlyDimensions < 0) return { safe: false, strategy: "origin-policy" };
  if (input.ttlSeconds < 0) return { safe: false, strategy: "ttl" };
  if (!input.versionedName && !input.urgentPurge) return { safe: false, strategy: "freshness-plan" };
  return { safe: true, strategy: input.urgentPurge ? "bounded-invalidation" : "immutable-version" };`,
    anchors: [
      'input\\.cacheDimensions\\s*!==\\s*input\\.representationDimensions',
      'input\\.forwardedOnlyDimensions\\s*<\\s*0',
      'input\\.ttlSeconds\\s*<\\s*0',
      '!input\\.versionedName\\s*&&\\s*!input\\.urgentPurge',
    ],
    task: 'align typed cache identity, origin forwarding, TTL, and release freshness',
  },
  'storage-ts-media-range-streaming': {
    parameters:
      'input: Readonly<{ start: number; end: number; size: number; ascending: boolean; nonoverlap: boolean; fastStart: boolean; captions: boolean; keyboard: boolean }>',
    result: '{ ready: boolean; length: number; reason: string }',
    body: `  if (input.size <= 0 || input.start < 0 || input.end < input.start || input.end >= input.size) return { ready: false, length: 0, reason: "range" };
  if (!input.ascending || !input.nonoverlap) return { ready: false, length: 0, reason: "cloudfront-range" };
  const length = input.end - input.start + 1;
  if (!input.fastStart) return { ready: false, length, reason: "mp4-layout" };
  if (!input.captions || !input.keyboard) return { ready: false, length, reason: "accessibility" };
  return { ready: true, length, reason: "media-ready" };`,
    anchors: [
      'input\\.end\\s*>=\\s*input\\.size',
      '!input\\.ascending\\s*\\|\\|\\s*!input\\.nonoverlap',
      '!input\\.fastStart',
      '!input\\.captions\\s*\\|\\|\\s*!input\\.keyboard',
    ],
    task: 'validate CloudFront ranges, progressive layout, and accessible media evidence',
  },
  'storage-ts-edge-security': {
    parameters:
      'input: Readonly<{ authorized: boolean; wafAllowed: boolean; refererOnly: boolean; securityHeaders: boolean; originProtected: boolean; privateErrorCached: boolean }>',
    result: '{ defended: boolean; reason: string }',
    body: `  if (!input.authorized) return { defended: false, reason: "application-authorization" };
  if (!input.wafAllowed) return { defended: false, reason: "edge-control" };
  if (input.refererOnly) return { defended: false, reason: "weak-hotlink-control" };
  if (!input.securityHeaders || !input.originProtected) return { defended: false, reason: "edge-posture" };
  if (input.privateErrorCached) return { defended: false, reason: "private-error-cache" };
  return { defended: true, reason: "layered-edge-defense" };`,
    anchors: [
      '!input\\.authorized',
      '!input\\.wafAllowed',
      'input\\.refererOnly',
      'input\\.privateErrorCached',
    ],
    task: 'exhaustively evaluate application, WAF, origin, header, and private-error controls',
  },
  'storage-ts-durability-disaster-recovery': {
    parameters:
      'input: Readonly<{ regions: number; healthy: number; replicationCurrent: boolean; backupIndependent: boolean; restorePassed: boolean; failoverTested: boolean }>',
    result: '{ recoverable: boolean; reason: string }',
    body: `  if (input.regions < 2 || input.healthy < 0 || input.healthy > input.regions) return { recoverable: false, reason: "region-model" };
  if (!input.replicationCurrent) return { recoverable: false, reason: "replication-lag" };
  if (!input.backupIndependent) return { recoverable: false, reason: "account-boundary" };
  if (!input.restorePassed) return { recoverable: false, reason: "restore" };
  if (!input.failoverTested) return { recoverable: false, reason: "failover" };
  return { recoverable: true, reason: "recovery-evidence" };`,
    anchors: [
      'input\\.regions\\s*<\\s*2',
      '!input\\.replicationCurrent',
      '!input\\.backupIndependent',
      '!input\\.failoverTested',
    ],
    task: 'separate replication, isolated backup, restore, and failover state evidence',
  },
  'storage-ts-events-observability-cost': {
    parameters:
      'input: Readonly<{ eventId: string; duplicate: boolean; claimsOrdered: boolean; metricLabels: number; maximumLabels: number; observedCost: number; budget: number }>',
    result: '{ accepted: boolean; reason: string }',
    body: `  if (input.eventId.length === 0) return { accepted: false, reason: "event-identity" };
  if (input.duplicate) return { accepted: false, reason: "idempotent-suppress" };
  if (input.claimsOrdered) return { accepted: false, reason: "ordering-overclaim" };
  if (input.metricLabels < 0 || input.metricLabels > input.maximumLabels) return { accepted: false, reason: "cardinality" };
  if (input.observedCost < 0 || input.observedCost > input.budget) return { accepted: false, reason: "cost-budget" };
  return { accepted: true, reason: "observable-capacity" };`,
    anchors: [
      'input\\.eventId\\.length\\s*===\\s*0',
      'input\\.duplicate',
      'input\\.claimsOrdered',
      'input\\.observedCost\\s*>\\s*input\\.budget',
    ],
    task: 'parse duplicate unordered events into bounded telemetry and cost decisions',
  },
  'storage-ts-testing-release-defense': {
    parameters:
      'input: Readonly<{ strict: boolean; runtime: boolean; property: boolean; handles: boolean; awsContract: boolean; fault: boolean; load: boolean; restore: boolean; rollback: boolean }>',
    result: '{ release: boolean; reason: string }',
    body: `  if (!input.strict || !input.runtime || !input.property) return { release: false, reason: "deterministic-gates" };
  if (!input.handles) return { release: false, reason: "stream-handle-leak" };
  if (!input.awsContract) return { release: false, reason: "aws-transfer-gate" };
  if (!input.fault || !input.load || !input.restore) return { release: false, reason: "resilience-gates" };
  if (!input.rollback) return { release: false, reason: "release-recovery" };
  return { release: true, reason: "production-defense" };`,
    anchors: [
      '!input\\.strict\\s*\\|\\|\\s*!input\\.runtime\\s*\\|\\|\\s*!input\\.property',
      '!input\\.handles',
      '!input\\.awsContract',
      '!input\\.rollback',
    ],
    task: 'gate release on strict, runtime, property, leak, AWS, fault, load, restore, and rollback evidence',
  },
};

const ENVIRONMENTS = [
  'browser upload compatibility rollout',
  'Node stream backpressure incident',
  'private media entitlement change',
  'multi-tenant authorization audit',
  'AWS SDK v3 dependency canary',
  'regional recovery and budget exercise',
];

const CHANGES = [
  'replace one typed fixture with unknown runtime input and prove rejection before AWS use',
  'abort during a stream or multipart promise and prove every task and part reaches a terminal state',
  'change object version, signed header, or cache dimension and reject stale authority',
  'double concurrent Upload instances and preserve aggregate memory and worker budgets',
  'deliver a duplicate or reordered event and prevent duplicate stakeholder effect',
  'change region, retrieval, or transfer cost and defend the revised budget action',
];

const CONSTRAINTS = [
  'retain keyboard and screen-reader progress, cancellation, error, and recovery evidence',
  'keep every external value unknown until a runtime validator accepts it',
  'bound bytes, time, attempts, promises, streams, concurrency, cache, and spend',
  'keep AbortSignal and stream cleanup under one named owner',
  'do not treat TypeScript types, a resolved promise, CORS, ETag, or an emulator as stronger proof than it is',
  'separate deterministic browser evidence from controlled Node and AWS transfer gates',
];

const EVIDENCE_MODES = {
  theory:
    'Concept boundary: contrast one accepted path, one near miss, and the claim that still needs transfer evidence.',
  workshop:
    'Guided rehearsal: predict the branch, make one bounded increment, and inspect peer-readable changed output.',
  debug:
    'Incident diagnosis: preserve the symptom, isolate first cause, and prove a regression case before repair.',
  lab: 'Independent transfer: choose the fixture, defend the invariant, and document a counterexample without scaffold.',
  review:
    'Retrieval check: reconstruct the rule from memory, classify the failure, and compare against prior evidence.',
  quiz: 'Assessment probe: commit to a prediction, justify the governing boundary, and reject the strongest distractor.',
  project:
    'Authentic delivery: integrate prior contracts, expose stakeholder evidence, and defend residual risk.',
  exam: 'Unfamiliar transfer: diagnose the new constraint, select the governing contract, and defend changed behavior.',
};

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

export function fileServersS3TypescriptScenario(
  moduleId,
  seed,
  activityKind = 'practice',
  competency
) {
  const spec = SPECS[moduleId];
  if (!spec) throw new Error(`Missing S3 TypeScript scenario profile for ${moduleId}`);
  const chosen = details(seed.toString(36));
  const probe = competency ? ` Competency probe: ${competency.statement}` : '';
  return `A ${activityKind} TypeScript file-delivery team handles case ${chosen.caseNumber} during a ${chosen.environment}. Build deterministic TypeScript evidence to ${spec.task}; ${chosen.constraint}; then ${chosen.change}. Browser code uses pure values and state transitions only. Node and AWS SDK packages, networks, S3, CloudFront, KMS, IAM, WAF, PostgreSQL, credentials, host state, handle and stream checks, load, faults, restore, billing, and production behavior require explicit authorized transfer gates.${probe}`;
}

export function fileServersS3TypescriptEvidenceContract({
  activityKind = 'theory',
  competencyId,
  moduleId,
  functionName,
  marker,
  suffix,
}) {
  const spec = SPECS[moduleId];
  if (!spec) throw new Error(`Missing S3 TypeScript evidence profile for ${moduleId}`);
  const chosen = details(suffix);
  const evidenceMode = EVIDENCE_MODES[activityKind] ?? EVIDENCE_MODES.theory;
  const scope = '(?:(?!// Evidence:)[\\s\\S])';
  return {
    marker,
    pattern: `${marker}${scope}*?function\\s+${functionName}\\s*\\([^)]*\\)\\s*:\\s*\\{[^}]+\\}\\s*\\{${lookaheads(spec.anchors, scope)}(?=${scope}*?return)${scope}*?return`,
    example: `${marker}
// Competency: ${competencyId}.
// Case ${chosen.caseNumber}: ${chosen.environment}.
// ${evidenceMode}
// Operating constraint: ${chosen.constraint}.
// Changed case: ${chosen.change}.
function ${functionName}(${spec.parameters}): ${spec.result} {
  const evidenceVariant_${suffix} = "${suffix}-${[...suffix].reverse().join('')}-${chosen.caseNumber}";
  void evidenceVariant_${suffix};
${spec.body}
}`,
    requirement: `Append a compile-ready pure-TypeScript function headed "${marker}" that uses case ${chosen.caseNumber} to ${spec.task}. ${evidenceMode} Return observable changed-case evidence. Browser code must not import Node or AWS SDK packages, open sockets, contact S3, CloudFront, KMS, IAM, WAF, PostgreSQL, networks, or external effects, read host state, execute host commands, or use credentials; verify those boundaries later with the TypeScript 7.0.2 native compiler and the @typescript/typescript6 package 6.0.2 compiler that reports 6.0.3, Node 24.18.0, AWS SDK v3.1087.0, controlled AWS, stream and handle, load, fault, security, cost, restore, and production gates.`,
  };
}

export function fileServersS3TypescriptWorkedExample(moduleId, seed) {
  return fileServersS3TypescriptEvidenceContract({
    competencyId: `storage-ts-worked-${moduleId}-${seed}`,
    moduleId,
    functionName: `worked_${moduleId.replaceAll('-', '_')}_${seed}`,
    marker: `// Evidence: storage-ts-worked-${moduleId}-${seed}`,
    suffix: `worked${seed}`,
  }).example;
}

export const fileServersS3TypescriptEvidenceModuleIds = Object.freeze(Object.keys(SPECS));

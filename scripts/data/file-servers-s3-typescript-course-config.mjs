import { finalizeCourse, project, skill } from './course-config-helpers.mjs';
import { fileServersS3GoConfig } from './file-servers-s3-go-course-config.mjs';

const REVIEWED_AT = '2026-07-14';
const RESEARCHED_AT = '2026-07-14T21:15:00.000Z';

const profiles = {
  'outcomes-evidence': [
    'File-Delivery Outcomes and Typed Evidence',
    'discriminated result unions and exhaustive changed-outcome evaluation',
    'typed file-delivery outcome dossier',
  ],
  'architecture-selection': [
    'Node File Services, Object Storage, and CDN Architecture',
    'a typed control plane separated from bounded direct or streamed data planes',
    'Node storage-architecture decision record',
  ],
  'http-representation-transfer': [
    'HTTP Representations, Web Standards, and Node Streams',
    'validated inclusive-range values, Web and Node stream adapters, AbortSignal, and pipeline cleanup',
    'TypeScript representation and stream contract',
  ],
  's3-object-model': [
    'S3 Objects, Keys, Listings, and Runtime Shapes',
    'opaque application identifiers, readonly object records, paginator async iteration, and runtime validation',
    'typed S3 object-model ledger',
  ],
  'buckets-endpoints-regions': [
    'Typed Bucket Endpoint and S3 Express Compatibility',
    'explicit bucket-type unions, region and zone configuration, session state, and exhaustive unsupported-feature checks',
    'bucket and endpoint compatibility matrix',
  ],
  'sdk-v2-contract': [
    'Node 24, TypeScript 7, and AWS SDK for JavaScript v3',
    'modular clients and commands, strict compiler settings, unknown-input schemas, middleware ownership, and pinned 3.1087.0 packages',
    'AWS SDK v3 TypeScript client contract',
  ],
  'client-resilience': [
    'AWS Credential Providers, Abort Signals, Retries, and Errors',
    'short-lived provider ownership, AbortSignal propagation, S3ServiceException narrowing, $metadata evidence, and ambiguous-write reconciliation',
    'typed request and retry state machine',
  ],
  'upload-admission': [
    'Bounded Node Upload Admission and Quarantine',
    'streaming request limits, runtime schemas, safe display names, backpressure, cancellation, and explicit quarantine states',
    'Node upload-admission workflow',
  ],
  'putobject-integrity': [
    'PutObject, Streaming Bodies, Metadata, and Checksums',
    'SdkStream boundaries, exact command inputs, checksum response evidence, metadata preservation, and no ETag overclaim',
    'TypeScript single-object integrity record',
  ],
  transfermanager: [
    '@aws-sdk/lib-storage Upload and Resource Budgets',
    'Upload queueSize and partSize budgets, progress-event validation, leavePartsOnError policy, AbortController, and stable wrapper contracts',
    'lib-storage multipart adoption contract',
  ],
  'multipart-upload': [
    'Multipart Commands, Part Ledgers, and Cleanup',
    'readonly part ledgers, bounded promise pools, abort ownership, ordered completion, and ambiguous response reconciliation',
    'typed multipart state machine',
  ],
  'direct-browser-upload': [
    'Browser Presigning, POST Policy, and CORS',
    'server-created intents, exact signed headers, browser runtime constraints, CORS separation, and idempotent finalization',
    'least-privilege browser upload session',
  ],
  'download-operations': [
    'HeadObject, GetObject, Ranges, and SdkStream Cleanup',
    'unknown response validation, transform helpers only under byte limits, streaming body ownership, conditions, and partial downstream states',
    'bounded TypeScript download flow',
  ],
  'http-gateway': [
    'Node and Express File Gateways',
    'trusted proxy and route inputs, streaming multipart parsers, pipeline and AbortController ownership, late-error handling, and overload admission',
    'streaming Node file gateway',
  ],
  'metadata-transactions': [
    'PostgreSQL Metadata, Outbox Events, and Orphan Repair',
    'transaction-scoped metadata repositories, discriminated workflow states, idempotent outbox consumers, and bounded reconciliation',
    'typed metadata and object reconciliation model',
  ],
  'object-mutations': [
    'Conditional Copy, Replace, Rename, Delete, and Batch',
    'readonly mutation intents, exact source versions, concurrency preconditions, per-item results, and exhaustive partial-failure handling',
    'conditional TypeScript mutation protocol',
  ],
  'versioning-recovery': [
    'Versioning, Delete Markers, Object Lock, and Restore',
    'version-specific branded identities, irreversible retention confirmation, recovery commands behind authorization, and executed restore evidence',
    'immutable-retention and recovery runbook',
  ],
  'lifecycle-storage-classes': [
    'Typed Lifecycle Policy, Archive Restore, and Cost Modeling',
    'validated lifecycle configuration, temporal state unions, archive restore polling, retention conflicts, and executable cost models',
    'lifecycle and storage-cost model',
  ],
  'iam-bucket-security': [
    'IAM, Bucket Policies, Access Points, and Tenant Isolation',
    'server-derived resource scopes, schema-validated policy inputs, explicit-deny evaluation, credential isolation, and negative authorization tests',
    'least-privilege TypeScript authorization proof',
  ],
  'encryption-key-management': [
    'TLS, SSE-KMS, Bucket Keys, and Key Operations',
    'exact command encryption fields, KMS policy boundaries, redacted context, rotation states, and revoked-access drills',
    'encryption and key-lifecycle contract',
  ],
  'signed-access': [
    'S3 Presigning and CloudFront Signed Access in TypeScript',
    '@aws-sdk/s3-request-presigner and @aws-sdk/cloudfront-signer with exact bearer scope, key ownership, policies, expiry, and revocation limits',
    'typed signed-delivery contract',
  ],
  'cloudfront-oac-origin': [
    'CloudFront OAC, Private S3 Origins, and SSE-KMS',
    'infrastructure configuration schemas, exact distribution SourceArn policy, KMS service authorization, deployment observation, and reversible OAI migration',
    'private origin authorization contract',
  ],
  'cloudfront-cache': [
    'CloudFront Cache Keys, Origin Requests, and Invalidation',
    'canonical representation dimensions, readonly policy records, versioned asset manifests, urgent purge state, and changed-request tests',
    'cache identity and freshness contract',
  ],
  'media-range-streaming': [
    'Accessible Media, Ranges, MP4, HLS, and DASH',
    'validated range models, manifest schemas, atomic asset publication, signed segment access, and accessible player evidence',
    'private accessible media-delivery plan',
  ],
  'edge-security': [
    'Edge Security, WAF, Headers, and Origin Containment',
    'schema-controlled edge policies, layered authorization, observable false positives, private-error cache rules, and bounded degradation states',
    'layered edge-security plan',
  ],
  'durability-disaster-recovery': [
    'Replication, Multi-Region Access, and Disaster Recovery',
    'typed RPO and RTO cases, replication-state polling, failover decision records, independent restore evidence, and conflict handling',
    'multi-region recovery dossier',
  ],
  'events-observability-cost': [
    'S3 Events, Telemetry, Inventory, Capacity, and Cost',
    'unknown event parsing, duplicate-safe consumers, bounded metric labels, trace correlation, inventory schemas, and budget-triggered admission',
    'observable storage and cost control model',
  ],
  'testing-release-defense': [
    'TypeScript Tests, AWS Faults, Release, and Production Defense',
    'strict dual-compiler checks, property tests, fake-boundary contracts, leak and handle checks, controlled AWS faults, canaries, rollback, and restore drills',
    'TypeScript production defense dossier',
  ],
};

const skillOverrides = {
  'storage-ts-transfer-evidence-plan': {
    statement:
      'Plan deterministic browser models, both strict TypeScript compiler paths, runtime schema tests, Node stream and handle checks, controlled AWS integration, load, fault, restore, security, cost, and production evidence.',
    misconception:
      'A clean TypeScript compile, browser model, or local S3 emulator proves runtime input, Node stream, IAM, KMS, CDN, billing, and recovery behavior.',
  },
  'storage-ts-runtime-sdk-version': {
    statement:
      'Pin Node 24.18.0, the TypeScript 7.0.2 native CLI, the @typescript/typescript6 package 6.0.2 whose compiler reports 6.0.3, and @aws-sdk/client-s3, lib-storage, s3-request-presigner, and cloudfront-signer 3.1087.0 as one reviewed compatibility contract.',
    misconception:
      'All AWS SDK for JavaScript v3 packages, Node releases, compiler paths, and examples can float independently without compatibility evidence.',
  },
  'storage-ts-config-client-lifecycle': {
    statement:
      'Construct S3Client from immutable process configuration, short-lived credential and region providers, one owned request handler, and explicit shutdown and test lifetimes.',
    misconception:
      'Creating a new S3Client and HTTP handler for every request improves isolation without connection, credential, memory, or shutdown cost.',
  },
  'storage-ts-pointer-enum-document-types': {
    id: 'storage-ts-command-shapes-runtime-validation',
    statement:
      'Treat command inputs, optional output fields, enums, paginators, metadata, and streaming bodies as SDK transport shapes that still require runtime and business validation.',
    misconception:
      'Generated TypeScript command and output types prove that optional AWS response fields and decoded business values exist and are valid at runtime.',
  },
  'storage-ts-operation-options-scope': {
    id: 'storage-ts-command-middleware-scope',
    statement:
      'Scope command inputs, per-call abort signals, endpoint overrides, middleware, and request-handler options without mutating shared client or tenant state.',
    misconception:
      'Adding middleware or endpoint state to a shared S3Client for one request cannot affect concurrent or later tenant operations.',
  },
  'storage-ts-sdk-error-interface': {
    id: 'storage-ts-service-exception-narrowing',
    statement:
      'Catch unknown, preserve cause, distinguish AbortError, narrow S3ServiceException and named service cases, and retain $metadata request evidence without string-matching messages.',
    misconception:
      'Every rejected client.send promise is an S3ServiceException with a stable message and retryable status.',
  },
  'storage-ts-transfermanager-version-status': {
    id: 'storage-ts-lib-storage-version-contract',
    statement:
      'Pin @aws-sdk/lib-storage 3.1087.0 with its peer S3 client line and wrap Upload behind characterized queueSize, partSize, leavePartsOnError, progress, abort, cleanup, and result contracts.',
    misconception:
      'A same-version @aws-sdk package number guarantees Upload defaults and multipart behavior need no characterization or wrapper.',
  },
  'storage-ts-manager-deprecation-migration': {
    id: 'storage-ts-managed-upload-migration',
    statement:
      'Inventory v2 ManagedUpload and hand-written multipart behavior, map queue, part, progress, abort, cleanup, and result differences, then migrate to v3 Upload behind contract tests.',
    misconception:
      'Changing an import from AWS SDK v2 ManagedUpload to v3 Upload preserves all defaults, events, cleanup, and return semantics.',
  },
  'storage-ts-upload-download-object-api': {
    id: 'storage-ts-upload-body-progress-contract',
    statement:
      'Choose PutObjectCommand or lib-storage Upload from body size and replayability, and validate Node Readable, Web stream, Blob, progress-event, checksum, and completion ownership.',
    misconception:
      'A resolved Upload.done promise proves every progress event, source stream, checksum, and downstream stakeholder state completed correctly.',
  },
  'storage-ts-directory-transfer-failure-policy': {
    id: 'storage-ts-directory-orchestration-policy',
    statement:
      'Build directory transfer as explicit traversal, path and symlink policy, bounded Upload work, per-object idempotency, partial-result reporting, cancellation, and resumable cleanup.',
    misconception: '@aws-sdk/lib-storage recursively uploads a directory as one atomic operation.',
  },
  'storage-ts-transfer-resource-budget': {
    statement:
      'Bound aggregate Upload queueSize workers, part buffers, active source streams, sockets, progress listeners, AbortControllers, descriptors, and caller admission across simultaneous transfers.',
    misconception:
      'queueSize limits the entire Node process rather than multiplying workers and buffered parts for every active Upload instance.',
  },
  'storage-ts-maxbytes-multipart-reader': {
    id: 'storage-ts-streaming-multipart-admission',
    statement:
      'Reject oversized request bodies before and during streaming, configure a bounded multipart parser, cap parts and fields, and clean temporary or partial state on abort.',
    misconception:
      'Express body limits automatically bound streaming multipart file parts, fields, memory, disk, and slow-client time.',
  },
  'storage-ts-context-goroutine-cleanup': {
    id: 'storage-ts-abort-stream-task-cleanup',
    statement:
      'Connect request closure and shutdown to one owned AbortController, propagate its AbortSignal through pipeline and storage promises, remove progress listeners and timers, and prove every async owner terminates.',
    misconception:
      'Rejecting an HTTP promise automatically destroys every Node stream, aborts every AWS command, removes listeners, and waits for spawned async work.',
  },
  'storage-ts-presigned-put-header-parity': {
    statement:
      'Use @aws-sdk/s3-request-presigner 3.1087.0 getSignedUrl with an exact PutObjectCommand region, expiry, key, checksum, content type, encryption choice, and required browser-header parity.',
    misconception:
      'A browser may add, remove, or change headers signed into a presigned PUT without invalidating the URL or changing its admitted representation.',
  },
  'storage-ts-compatible-release-defense': {
    statement:
      'Canary immutable Node and TypeScript artifacts with infrastructure, compare changed behavior and cost, preserve rollback data and policies, rehearse recovery, and defend residual risk.',
    misconception:
      'Rolling back Node and TypeScript code automatically restores overwritten objects, expired URLs, cache state, IAM, KMS, and lifecycle policy.',
  },
  'storage-ts-cloudfront-signer-crypto': {
    id: 'storage-ts-cloudfront-signer-key-contract',
    statement:
      'Use @aws-sdk/cloudfront-signer 3.1087.0 with protected private-key material, exact key-pair identity, canned or custom policy, deterministic time tests, rotation, and no bearer logging.',
    misconception:
      'The CloudFront signer package chooses, stores, rotates, and revokes trusted key-group material automatically.',
  },
  'storage-ts-go-quality-race-leak': {
    id: 'storage-ts-quality-stream-handle-gates',
    statement:
      'Gate format, lint, both strict compiler paths, unit, property and integration tests, dependency review, stream and listener cleanup, open-handle checks, benchmarks, profiles, and reproducible artifacts.',
    misconception:
      'A clean strict compile and passing unit suite prove runtime schemas, promise rejection ownership, stream cleanup, memory bounds, and absence of open handles.',
  },
};

function lowerFirst(value) {
  return `${value.charAt(0).toLowerCase()}${value.slice(1)}`;
}

function boundedStatement(value, maximum = 296) {
  if (value.length <= maximum) return value;
  const boundary = value.lastIndexOf(' ', maximum - 1);
  return `${value.slice(0, boundary > 0 ? boundary : maximum - 1).replace(/[,:;]$/u, '')}.`;
}

function adaptText(value) {
  return value
    .replaceAll('Go 1.26.5', 'Node 24.18.0 and TypeScript 7.0.2')
    .replaceAll('Go 1.26', 'Node 24 and TypeScript 7')
    .replaceAll('Go HTTP', 'Node and Express HTTP')
    .replaceAll('Go service', 'Node service')
    .replaceAll('Go handler', 'Node handler')
    .replaceAll('Go gateway', 'Node gateway')
    .replaceAll('Go function', 'TypeScript function')
    .replaceAll('goroutine', 'async task')
    .replaceAll('io.Copy', 'stream.pipeline')
    .replaceAll('filepath.Base', 'path.basename');
}

function adaptModule(sourceModule) {
  const suffix = sourceModule.id.replace('storage-go-', '');
  const profile = profiles[suffix];
  if (!profile) throw new Error(`Missing S3 TypeScript profile for ${suffix}`);
  const [title, languageMove, artifact] = profile;
  const skills = sourceModule.skills.map(([id, statement, misconception, knowledgeType, level]) => {
    const typescriptId = id.replace('storage-go-', 'storage-ts-');
    const override = skillOverrides[typescriptId];
    return skill(
      override?.id ?? typescriptId,
      override?.statement ??
        boundedStatement(
          `In a strict Node 24 and TypeScript 7 service, ${lowerFirst(adaptText(statement))}`
        ),
      override?.misconception ??
        `${adaptText(misconception)} Type annotations, generated SDK shapes, and resolved promises do not strengthen that runtime claim.`,
      knowledgeType,
      level
    );
  });
  return {
    id: `storage-ts-${suffix}`,
    title,
    context: boundedStatement(
      `A Node 24 and TypeScript 7 team receives a changed file-delivery case: ${adaptText(sourceModule.context)} The existing implementation trusts one compile-time or promise-level claim that runtime evidence does not support.`,
      310
    ),
    artifact,
    objectives: skills.slice(0, 3).map((entry) => entry[1]),
    skills,
    contexts: {
      theory: `Predict unknown input, typed state, command, stream, promise, storage, cache, security, cost, and recovery outcomes before reviewing ${artifact}; use ${languageMove}.`,
      workshop: `A TypeScript pairing room incrementally builds ${artifact}, validates one changed runtime input, and keeps earlier HTTP, accessibility, security, stream, AbortSignal, and resource-budget rules active.`,
      debug: `A Node incident packet contains a plausible ${artifact} with one unsafe assertion, stale object identity, unbounded stream, lost rejection, abort leak, cache defect, policy gap, or recovery overclaim; preserve the symptom and isolate first cause.`,
      lab: `An independent TypeScript team receives different tenants, browsers, file sizes, media, regions, compliance, traffic, and cost constraints and transfers ${title.toLowerCase()} into a new ${artifact}.`,
      review: `A delayed handoff reconstructs ${title.toLowerCase()} from browser, Node, TypeScript, AWS SDK v3, S3, CloudFront, security, billing, and stakeholder evidence and challenges one compile-time misconception.`,
      quiz: `A production board compares near-miss TypeScript and AWS decisions for ${title.toLowerCase()} and accepts only runtime validation, bounded ownership, causal changed-case evidence, and an explicit controlled AWS transfer gate.`,
    },
  };
}

const modules = fileServersS3GoConfig.modules.map(adaptModule);
const retainedSources = fileServersS3GoConfig.sources.filter(
  (source) =>
    !/Go 1\.26|SDK for Go|Transfer Manager for Go|S3 Manager for Go|CloudFront Sign for Go/i.test(
      source.title
    )
);

const languageSources = [
  [
    'Node.js 24.18.0 Documentation',
    'https://nodejs.org/docs/latest-v24.x/api/',
    'Node.js 24.18.0 LTS',
    'Streams, Web streams, pipeline, AbortSignal, HTTP, buffers, crypto, testing, diagnostics, permissions, and process lifecycle.',
  ],
  [
    'TypeScript 7.0 Release Contract',
    'https://www.typescriptlang.org/docs/handbook/release-notes/typescript-7-0.html',
    'TypeScript 7.0.2 native CLI; @typescript/typescript6 package 6.0.2, compiler reports 6.0.3',
    'Strict language and compiler behavior, native compiler boundaries, runtime erasure, module resolution, and dual-compiler gates.',
  ],
  [
    'AWS SDK for JavaScript v3 Developer Guide',
    'https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/welcome.html',
    'AWS SDK for JavaScript v3.1087.0',
    'Modular clients, commands, configuration, credentials, middleware, retries, errors, paginators, presigning, Node, and browser boundaries.',
  ],
  [
    'AWS SDK v3 S3 Client Package',
    'https://www.npmjs.com/package/@aws-sdk/client-s3',
    '@aws-sdk/client-s3 3.1087.0; published 2026-07-14',
    'S3Client commands, inputs, outputs, exceptions, paginators, waiters, stream bodies, checksums, multipart, and endpoint behavior.',
  ],
  [
    'AWS SDK v3 S3 lib-storage Package',
    'https://www.npmjs.com/package/@aws-sdk/lib-storage',
    '@aws-sdk/lib-storage 3.1087.0; published 2026-07-14',
    'Upload multipart abstraction, queueSize, partSize, leavePartsOnError, progress events, abort behavior, and browser or Node body support.',
  ],
  [
    'AWS SDK v3 S3 Request Presigner',
    'https://www.npmjs.com/package/@aws-sdk/s3-request-presigner',
    '@aws-sdk/s3-request-presigner 3.1087.0; published 2026-07-14',
    'getSignedUrl and low-level presigning, exact command and header parity, expiry, region, checksums, and browser upload boundaries.',
  ],
  [
    'AWS SDK v3 CloudFront Signer',
    'https://www.npmjs.com/package/@aws-sdk/cloudfront-signer',
    '@aws-sdk/cloudfront-signer 3.1087.0; published 2026-07-14',
    'CloudFront signed URL and cookie functions, canned and custom policy, key material, expiry, IP and resource constraints.',
  ],
  [
    'AWS SDK JavaScript S3 Examples',
    'https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/javascript_s3_code_examples.html',
    'official v3 examples reviewed 2026-07-14',
    'Current TypeScript and JavaScript examples for buckets, objects, multipart, presigning, versioning, encryption, and error handling.',
  ],
].map(([title, url, version, scope]) => ({
  title,
  authority: 'official-docs',
  url,
  version,
  reviewedAt: REVIEWED_AT,
  scope,
}));

export const fileServersS3TypescriptConfig = finalizeCourse(
  {
    id: 'file-servers-s3-typescript',
    competencyIdPrefix: 'storage-ts-',
    title: 'Production File Delivery with Amazon S3 and CloudFront in TypeScript 7',
    version: '2026.07',
    audience: {
      description:
        'TypeScript backend developers who can defend production Node and Express services and need to build, secure, test, operate, and recover high-volume file and media delivery with AWS SDK v3, Amazon S3, and CloudFront.',
      entryKnowledge: [
        'Build and defend a production Node 24 and TypeScript 7 HTTP service with strict unknown-input validation, bounded streams, AbortSignal, authorization, PostgreSQL, observability, tests, and graceful shutdown.',
        'Explain HTTP representation metadata, validators, conditional requests, ranges, caches, promises, Node and Web streams, runtime type erasure, database transactions, and failure ownership.',
      ],
      deviceConstraints: [
        'Modern browser; learner TypeScript runs only in the isolated compiler worker. Browser tasks model storage identity, policy, ranges, checksums, state, cache, retry, cost, and recovery without importing AWS SDK or Node packages, opening networks, contacting AWS, reading host state, using credentials, or causing external effects.',
      ],
      accessibilityAssumptions: [
        'File pickers, progress and error status, media controls, stream diagrams, byte-range traces, policy tables, cache timelines, cost charts, and dashboards have keyboard operation, announced status, large targets, structured text, reduced motion, and non-color meaning.',
      ],
    },
    scope: {
      includes: [
        'Node.js 24.18.0, TypeScript 7.0.2, AWS SDK for JavaScript v3.1087.0, @aws-sdk/client-s3, @aws-sdk/lib-storage, @aws-sdk/s3-request-presigner, @aws-sdk/cloudfront-signer, strict runtime validation, promises, Node and Web streams, AbortSignal, HTTP file semantics, S3 object and bucket models, credentials, retries, bounded upload and download, integrity, multipart, direct browser upload, Node gateways, PostgreSQL metadata transactions, versioning, Object Lock, lifecycle, IAM, encryption, signed access, OAC, CloudFront caching, media ranges, edge security, replication, recovery, events, observability, capacity, cost, tests, faults, and release defense',
        'Runnable deterministic pure-TypeScript storage decision functions plus explicit dual-compiler, controlled Node, AWS integration, load, security, cost, restore, and production transfer gates',
        'Five cumulative real-world TypeScript file-delivery systems and a performance-based production defense examination',
      ],
      excludes: [
        'Browser access to AWS SDK or Node packages, networks, S3, CloudFront, KMS, IAM, WAF, PostgreSQL, Docker, credentials, host processes, billing actions, or production infrastructure',
        'Claiming runtime schema safety, AWS authorization, encryption, durability, replication, CDN, range, billing, stream cleanup, throughput, or recovery behavior from TypeScript types, deterministic browser models, or emulators without the named authorized transfer gate',
      ],
      nextCourses: ['build-ecommerce-api-typescript', 'build-social-media-api-typescript'],
    },
    sources: [...languageSources, ...retainedSources],
    sharedRequirements: [
      'Every activity retrieves TypeScript runtime erasure, Node and Web streams, HTTP semantics, accessibility, security, validation, PostgreSQL, tests, AbortSignal, async ownership, resource budgets, and evidence habits before adding one storage boundary.',
      'Browser TypeScript is deterministic and isolated. It models identity, ranges, policy, integrity, lifecycle, caching, cost, and recovery decisions but never imports AWS SDK or Node packages, opens sockets, contacts AWS or databases, reads host state, executes commands, uses credentials, or causes external effects.',
      'Passing work requires stable file and scenario identity, runtime-validated unknown input, a named owner and state, bounded bytes, time, attempts, promises, streams, concurrency, cache, and cost, observable changed and failure results, cleanup and recovery, and explicit compiler, controlled Node, AWS, security, load, cost, restore, or production transfer limits.',
    ],
    modules,
    projects: [
      project(
        'storage-ts-library-contribution-intake',
        'Accessible Digital Library Contribution Intake',
        'storage-ts-direct-browser-upload',
        'A statewide accessible digital library',
        'They need schema-validated upload intents, bounded browser-direct contributions, checksum evidence, quarantine and moderation, accessible progress, CORS separation, exact presigning, and private publication without treating a resolved promise as completed review.',
        [
          'storage-ts-upload-byte-time-count-budget',
          'storage-ts-quarantine-publish-state',
          'storage-ts-upload-session-intent',
          'storage-ts-presigned-put-header-parity',
          'storage-ts-direct-upload-finalization',
        ]
      ),
      project(
        'storage-ts-design-asset-api',
        'Collaborative Design Asset API and Reconciler',
        'storage-ts-object-mutations',
        'A multi-tenant design collaboration service',
        'They need Node stream admission, runtime tenant authorization, versioned ranges and writes, PostgreSQL and S3 reconciliation, non-atomic rename recovery, partial batch results, and duplicate-safe asset events.',
        [
          'storage-ts-http-request-admission',
          'storage-ts-range-download',
          'storage-ts-database-object-ordering',
          'storage-ts-rename-nonatomic',
          'storage-ts-batch-partial-failure',
        ]
      ),
      project(
        'storage-ts-consent-record-vault',
        'Research Consent Record Vault',
        'storage-ts-encryption-key-management',
        'A multi-institution health-research consortium',
        'They need immutable consent versions, governed retention, archive retrieval, least-privilege access points, SSE-KMS, key rotation, legal-hold evidence, independent backup, and timed restore defense.',
        [
          'storage-ts-object-lock-modes',
          'storage-ts-worm-not-backup',
          'storage-ts-archive-restore-state',
          'storage-ts-access-point-boundary',
          'storage-ts-key-rotation-revocation-drill',
        ]
      ),
      project(
        'storage-ts-performing-arts-media',
        'Private Performing-Arts Media Platform',
        'storage-ts-edge-security',
        'A nonprofit live-arts archive',
        'They need private OAC origins, signed season access, exact cache identity, range-aware recordings and adaptive segments, captions and transcripts, accessible controls, WAF protection, urgent purge, and bearer-leakage limits.',
        [
          'storage-ts-oac-sourcearn-policy',
          'storage-ts-cloudfront-url-cookie-choice',
          'storage-ts-cache-key-identity',
          'storage-ts-private-media-authorization',
          'storage-ts-media-accessibility-quality',
        ]
      ),
      project(
        'storage-ts-global-saas-defense',
        'Global SaaS Asset Platform Production Defense',
        'storage-ts-testing-release-defense',
        'An engineering, security, accessibility, privacy, finance, and operations review board',
        'The board needs @aws-sdk/lib-storage capacity evidence, strict and runtime validation, replication and failover, duplicate-safe events, bounded telemetry, budget controls, handle and stream cleanup, controlled AWS fault and restore drills, immutable canaries, rollback, and residual-risk ownership.',
        [
          'storage-ts-transfer-resource-budget',
          'storage-ts-replication-prerequisites-status',
          'storage-ts-event-delivery-semantics',
          'storage-ts-capacity-cost-alerts',
          'storage-ts-aws-fault-load-security-tests',
          'storage-ts-compatible-release-defense',
        ]
      ),
    ],
    examContext:
      'Unfamiliar Node 24, TypeScript 7, AWS SDK v3, S3, and CloudFront cases spanning unknown input, strict types, promises, streams, AbortSignal, file identity, HTTP representations, storage architecture, bucket types, modular clients and commands, credentials, retries, uploads, checksums, lib-storage, multipart state, browser presigning, downloads, Express gateways, PostgreSQL transactions, mutations, versioning, Object Lock, lifecycle, IAM, encryption, signed access, OAC, cache identity, media, edge security, replication, recovery, events, telemetry, cost, tests, faults, release, rollback, and production defense with explicit runtime and live-transfer limits.',
    minimumQuestionBankSize: 900,
  },
  { researchedAt: RESEARCHED_AT, prerequisiteCourseIds: ['http-servers-typescript'] }
);

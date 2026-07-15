import { finalizeCourse, project, skill } from './course-config-helpers.mjs';

const REVIEWED_AT = '2026-07-14';
const RESEARCHED_AT = '2026-07-14T23:45:00.000Z';

function outcome(id, statement, misconception, knowledgeType = 'procedural', level = 'apply') {
  if (!misconception) throw new Error(`Missing misconception for S3 and Go competency ${id}`);
  return skill(id, statement, misconception, knowledgeType, level);
}

function storageModule(id, title, context, artifact, skills) {
  return {
    id,
    title,
    context,
    artifact,
    objectives: skills.slice(0, 3).map((entry) => entry[1]),
    skills,
    contexts: {
      theory: `${context} Predict the representation, storage, trust, cost, and recovery evidence before inspecting a model.`,
      workshop: `A delivery team incrementally builds ${artifact}, changes one file or failure, and keeps earlier HTTP, Go, accessibility, security, and resource-budget invariants active.`,
      debug: `An incident packet contains a plausible ${artifact} with one identity, byte, checksum, policy, cache, ownership, cancellation, cleanup, or recovery defect; preserve the symptom and isolate first cause before repair.`,
      lab: `An independent team receives different tenants, file sizes, media types, regions, compliance duties, traffic, failures, and cost limits and transfers ${title.toLowerCase()} into a new ${artifact}.`,
      review: `A delayed handoff reconstructs ${title.toLowerCase()} from browser, Go service, S3, CloudFront, security, billing, and stakeholder evidence, then challenges one retained misconception.`,
      quiz: `A production review compares near-miss decisions for ${title.toLowerCase()} and accepts only bounded behavior, causal changed-case evidence, and an explicit AWS transfer gate.`,
    },
  };
}

const modules = [
  storageModule(
    'storage-go-outcomes-evidence',
    'File-Delivery Outcomes, Boundaries, and Evidence',
    'A public-service portal reports successful uploads and fast downloads but cannot prove that the intended bytes are authorized, durable, retrievable, accessible, affordable, or recoverable.',
    'file-delivery outcome and evidence map',
    [
      outcome(
        'storage-go-stakeholder-outcome',
        'Define file-delivery success with learner, uploader, viewer, owner, security, accessibility, operations, and finance evidence.',
        'A 200 response and an S3 object key prove the stakeholder outcome.',
        'professional',
        'create'
      ),
      outcome(
        'storage-go-custody-effect-boundary',
        'Trace browser, Go service, object store, CDN, identity provider, scanner, database, and stakeholder custody without assigning evidence a boundary cannot observe.',
        'Once a request body reaches the Go handler, the file is durably stored and usable.'
      ),
      outcome(
        'storage-go-file-identity-bytes',
        'Separate business file identity, object key, object version, representation bytes, metadata, checksum, URL, and cache entry.',
        'A filename, S3 key, URL, and file identity are interchangeable.'
      ),
      outcome(
        'storage-go-service-level-budget',
        'Set observable availability, latency, integrity, freshness, recovery, accessibility, privacy, and cost targets with measurement windows.',
        'A vague goal of fast and reliable is an actionable service-level contract.',
        'strategic',
        'evaluate'
      ),
      outcome(
        'storage-go-transfer-evidence-plan',
        'Plan deterministic browser models, Go compile and race gates, disposable integration, controlled AWS tests, load, fault, restore, security, cost, and production evidence.',
        'A browser simulation or local emulator proves AWS storage, CDN, IAM, encryption, and recovery behavior.',
        'metacognitive',
        'create'
      ),
    ]
  ),
  storageModule(
    'storage-go-architecture-selection',
    'File Servers, Object Storage, CDNs, and Architecture Selection',
    'A product sends every byte through one web process, stores uploads on an ephemeral disk, and adds a CDN without deciding authority, mutation, privacy, or failure boundaries.',
    'architecture and responsibility decision record',
    [
      outcome(
        'storage-go-filesystem-object-cdn',
        'Compare local filesystems, shared filesystems, object storage, databases, origin services, and CDNs by interface, consistency, scale, trust, and operations.',
        'S3 is a mounted POSIX filesystem with CDN behavior included.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'storage-go-control-data-plane',
        'Separate control-plane metadata and authorization from high-volume data transfer while preserving one auditable decision.',
        'All bytes must traverse the application server for the application to retain control.'
      ),
      outcome(
        'storage-go-origin-path-selection',
        'Choose server upload, direct upload, redirect, proxy, signed edge delivery, or public delivery from threat, transformation, audit, and performance evidence.',
        'Direct-to-S3 upload always improves security because the application handles fewer bytes.',
        'strategic',
        'evaluate'
      ),
      outcome(
        'storage-go-ownership-lifecycle',
        'Assign creation, quarantine, scan, publish, replace, archive, restore, revoke, and delete ownership with terminal states.',
        'The component that uploads an object automatically owns its full business lifecycle.'
      ),
      outcome(
        'storage-go-cost-failure-model',
        'Model storage, request, transfer, retrieval, invalidation, compute, and operational cost together with regional and dependency failures.',
        'S3 storage price alone determines the cheapest architecture.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  storageModule(
    'storage-go-http-representation-transfer',
    'HTTP Representations, Validators, Ranges, and File Transfer',
    'A download endpoint guesses MIME types, buffers large bodies, ignores validators and Range, and treats Content-Disposition text as trusted HTML.',
    'HTTP file-representation and transfer contract',
    [
      outcome(
        'storage-go-representation-metadata',
        'Define media type, content length, content encoding, language, disposition, filename parameters, and cache metadata as representation facts.',
        'A filename extension is authoritative proof of safe content type.'
      ),
      outcome(
        'storage-go-validators-conditionals',
        'Apply ETag and Last-Modified validators with If-Match, If-None-Match, If-Range, 304, 412, and changed-state evidence.',
        'An S3 ETag is always the MD5 checksum and can be reused as every validator.'
      ),
      outcome(
        'storage-go-byte-range-semantics',
        'Parse and evaluate single byte ranges, suffix ranges, satisfiable bounds, 206, Content-Range, Accept-Ranges, and 416.',
        'A Range header requests a byte count rather than inclusive byte positions.'
      ),
      outcome(
        'storage-go-stream-backpressure',
        'Stream through bounded buffers with cancellation, backpressure, body ownership, partial-write awareness, and cleanup.',
        'io.Copy makes transfer memory, cancellation, and partial-response behavior automatically safe.'
      ),
      outcome(
        'storage-go-download-accessibility',
        'Provide accessible file names, types, sizes, progress, cancellation, error recovery, transcripts or alternatives, and keyboard-operable controls.',
        'A browser download link is accessible without contextual text or status.',
        'professional',
        'create'
      ),
    ]
  ),
  storageModule(
    'storage-go-s3-object-model',
    'S3 Objects, Keys, Metadata, Tags, Listing, and Consistency',
    'A team encodes tenant authority in free-form key strings, overwrites metadata accidentally, assumes folders are directories, and scans one unpaginated listing as a transaction.',
    'S3 object-model and listing invariant table',
    [
      outcome(
        'storage-go-bucket-key-version-identity',
        'Distinguish bucket, key, version ID, delete marker, upload ID, part number, and application identity.',
        'A key uniquely identifies immutable bytes across versioned writes.'
      ),
      outcome(
        'storage-go-key-prefix-design',
        'Design opaque or structured keys with explicit delimiter, normalization, tenant, cardinality, migration, and disclosure rules.',
        'A slash in an S3 key creates a secured directory boundary.'
      ),
      outcome(
        'storage-go-metadata-tag-boundary',
        'Choose system metadata, user metadata, object tags, database metadata, and event payloads by mutability, limits, query, trust, and lifecycle needs.',
        'All descriptive and authorization data belongs in S3 user metadata.'
      ),
      outcome(
        'storage-go-list-pagination-order',
        'Paginate ListObjectsV2 with continuation tokens, delimiter and prefix rules, duplicate-safe consumers, and no universal ordering assumption.',
        'One listing response is complete and lexicographically ordered for every S3 bucket type.'
      ),
      outcome(
        'storage-go-strong-consistency-atomicity',
        'Use S3 strong read-after-write consistency while preserving single-key atomicity and cross-object transaction limits.',
        'Strong consistency makes a multi-object workflow an atomic transaction.',
        'conceptual',
        'analyze'
      ),
    ]
  ),
  storageModule(
    'storage-go-buckets-endpoints-regions',
    'Bucket Types, Endpoints, Regions, and S3 Express',
    'A client hard-codes path-style URLs, assumes global ordering and lifecycle features, and deploys latency-sensitive work without selecting a compatible bucket type or zone.',
    'bucket-type and endpoint compatibility matrix',
    [
      outcome(
        'storage-go-general-directory-bucket',
        'Compare general-purpose and directory buckets by namespace, endpoint, zone, ordering, throughput, durability scope, versioning, lifecycle, and feature support.',
        'Directory buckets are faster general-purpose buckets with identical APIs and guarantees.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'storage-go-virtual-hosted-zonal-endpoint',
        'Construct regional virtual-hosted and zonal endpoints without confusing region, availability zone, bucket name, TLS name, or path style.',
        'Every S3 bucket supports path-style endpoints and the same hostname format.'
      ),
      outcome(
        'storage-go-region-location-routing',
        'Resolve intended region and endpoint explicitly and reject redirects, signing-region drift, and accidental cross-region transfer.',
        'The SDK can safely discover any bucket region after signing every request for a default region.'
      ),
      outcome(
        'storage-go-directory-session-reactivation',
        'Model directory-bucket session authorization, inactivity, 503 reactivation, retry boundaries, and unsupported lifecycle or versioning.',
        'A dormant directory bucket either responds normally or is permanently unavailable.'
      ),
      outcome(
        'storage-go-bucket-naming-creation-gate',
        'Validate globally or zonally scoped naming, ownership, location, public-block, encryption, versioning, tags, and rollback before bucket creation.',
        'Creating a bucket is a harmless runtime operation that needs no reviewed infrastructure gate.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  storageModule(
    'storage-go-sdk-v2-contract',
    'Go 1.26 and AWS SDK for Go v2 Client Contract',
    'A service copies an SDK v1 tutorial, floats module versions, shares request options incorrectly, and treats generated Go types as runtime validation.',
    'pinned Go and AWS SDK v2 client contract',
    [
      outcome(
        'storage-go-runtime-sdk-version',
        'Pin Go 1.26.5, aws-sdk-go-v2 1.42.1, S3 1.105.0, CloudFront sign 1.11.7, and tested operating targets as one compatibility contract.',
        'Any AWS SDK for Go example compiles and behaves unchanged across major and service module versions.'
      ),
      outcome(
        'storage-go-config-client-lifecycle',
        'Load immutable shared configuration once, construct scoped clients, pass context, and assign transport and credential lifetimes.',
        'A new S3 client and default transport should be created for every request.'
      ),
      outcome(
        'storage-go-pointer-enum-document-types',
        'Use SDK pointers, enums, document types, output metadata, paginators, and nil handling without losing API semantics.',
        'Generated SDK types guarantee required values and non-nil outputs at runtime.'
      ),
      outcome(
        'storage-go-operation-options-scope',
        'Apply per-operation functional options without mutating shared client configuration or leaking tenant-specific endpoints.',
        'Changing one operation option safely reconfigures the shared client for later calls.'
      ),
      outcome(
        'storage-go-sdk-error-interface',
        'Inspect smithy operation, API, transport, cancellation, and response errors with errors.Is and errors.As while preserving request evidence.',
        'String matching an AWS error message is the stable way to classify failures.'
      ),
    ]
  ),
  storageModule(
    'storage-go-client-resilience',
    'Credentials, Signing, Retries, Timeouts, and Client Resilience',
    'A process accepts static keys from request data, retries every failure beyond its caller deadline, and records neither attempt identity nor ambiguous write state.',
    'bounded S3 request and retry state machine',
    [
      outcome(
        'storage-go-credential-provider-chain',
        'Use short-lived credential providers with explicit workload identity, refresh ownership, least privilege, and redaction.',
        'Hard-coded access keys are acceptable when the repository is private.'
      ),
      outcome(
        'storage-go-sigv4-region-time',
        'Explain SigV4 canonical request, region, service, signed headers, payload mode, clock, and credential scope without hand-building production signatures.',
        'A valid access key alone makes a request signature portable across regions and headers.'
      ),
      outcome(
        'storage-go-context-timeout-ownership',
        'Compose request, attempt, transfer, and shutdown deadlines and propagate cancellation through body and goroutine ownership.',
        'SDK retry time is automatically bounded by an HTTP handler timeout even if its context is discarded.'
      ),
      outcome(
        'storage-go-retry-classification-budget',
        'Classify throttling, transient transport, server, permanent, cancellation, conflict, and ambiguous write outcomes with bounded attempts, time, delay, and bytes.',
        'All 5xx and network failures are safe to retry without reconciliation.'
      ),
      outcome(
        'storage-go-idempotency-reconciliation',
        'Make stable identity, conditional requests, upload records, checksums, and post-failure reconciliation explicit for repeatable operations.',
        'Repeating PutObject after an unknown response cannot create an unintended overwrite.'
      ),
    ]
  ),
  storageModule(
    'storage-go-upload-admission',
    'Upload Admission, Untrusted Files, and Quarantine',
    'An upload handler trusts client filenames and content types, accepts unlimited bodies, publishes bytes before scanning, and leaves partial state when the caller disconnects.',
    'bounded upload-admission and quarantine workflow',
    [
      outcome(
        'storage-go-upload-byte-time-count-budget',
        'Enforce per-file, request, tenant, concurrent, time, and aggregate byte budgets before and during transfer.',
        'Content-Length alone prevents oversized or chunked uploads.'
      ),
      outcome(
        'storage-go-filename-normalization',
        'Treat filenames as display metadata, normalize safely, reject controls and path confusion, and generate storage keys independently.',
        'filepath.Base turns every untrusted filename into a safe object key and response header value.'
      ),
      outcome(
        'storage-go-media-type-sniff-policy',
        'Combine bounded signature inspection, declared media type, extension, parser or scanner evidence, and allow-list policy without executing content.',
        'http.DetectContentType proves a file is harmless and correctly named.'
      ),
      outcome(
        'storage-go-quarantine-publish-state',
        'Model admitted, uploading, quarantined, scanning, accepted, rejected, published, and deleted transitions with authorized owners.',
        'Successful PutObject means an upload may immediately be served to users.'
      ),
      outcome(
        'storage-go-upload-accessible-feedback',
        'Expose preflight limits, progress, cancellation, validation details, recovery, and non-color status to keyboard and assistive-technology users.',
        'A spinning progress icon is sufficient upload feedback.',
        'professional',
        'create'
      ),
    ]
  ),
  storageModule(
    'storage-go-putobject-integrity',
    'PutObject, Metadata, Checksums, and Encryption Defaults',
    'A service uploads an unbounded reader, uses the returned ETag as a universal digest, loses content metadata on replacement, and cannot prove which bytes S3 accepted.',
    'single-object upload and integrity evidence record',
    [
      outcome(
        'storage-go-putobject-body-ownership',
        'Own and close input bodies, preserve cancellation, bound bytes, and distinguish request completion from later business publication.',
        'A nil PutObject error proves the original reader was fully and correctly consumed for the user outcome.'
      ),
      outcome(
        'storage-go-checksum-algorithm-contract',
        'Select supported checksum algorithms, send full-object evidence, validate service response, and retain an application integrity record.',
        'ETag is the canonical content MD5 for every object and upload mode.'
      ),
      outcome(
        'storage-go-content-metadata-preservation',
        'Set and preserve Content-Type, Content-Disposition, Cache-Control, encoding, language, custom metadata, and tags during replacements and copies.',
        'Updating an object body automatically retains all previous metadata.'
      ),
      outcome(
        'storage-go-server-encryption-default',
        'Verify S3 default encryption and choose SSE-S3 or SSE-KMS requirements without claiming transport or client-side confidentiality.',
        'Default server-side encryption removes the need for TLS, IAM, or key policy.'
      ),
      outcome(
        'storage-go-write-result-evidence',
        'Record bucket, key, version, checksum, size, request ID, encryption, policy decision, and changed-read verification without logging secrets.',
        'The object key is enough evidence to audit a write.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  storageModule(
    'storage-go-transfermanager',
    'AWS Transfer Manager, Concurrency, and Migration',
    'A large-transfer service starts new work on deprecated s3/manager, accepts unstable defaults, multiplies concurrency per request, and cannot bound memory, descriptors, or partial failures.',
    'transfer-manager adoption and resource budget',
    [
      outcome(
        'storage-go-transfermanager-version-status',
        'Adopt feature/s3/transfermanager 0.3.2 as a pinned pre-v1 dependency with explicit compatibility review and rollback.',
        'A newly published pre-v1 transfer manager has a stable API and production history equivalent to the core S3 client.'
      ),
      outcome(
        'storage-go-manager-deprecation-migration',
        'Inventory deprecated feature/s3/manager use, map behavior and options, characterize outputs, and migrate behind contract tests.',
        'A package rename is sufficient migration evidence from s3/manager to transfermanager.'
      ),
      outcome(
        'storage-go-upload-download-object-api',
        'Choose UploadObject, DownloadObject, and GetObject by streaming, seekability, checksum, destination, and ownership requirements.',
        'All transfer-manager download APIs have the same buffering and resume behavior.'
      ),
      outcome(
        'storage-go-directory-transfer-failure-policy',
        'Use directory transfer with explicit traversal, path mapping, symlink, overwrite, partial-success, cancellation, and failure policy.',
        'UploadDirectory is an atomic recursive transaction.'
      ),
      outcome(
        'storage-go-transfer-resource-budget',
        'Bound aggregate part concurrency, buffers, descriptors, NICs, DNS behavior, progress callbacks, and caller admission across simultaneous transfers.',
        'Per-transfer concurrency can be tuned independently without affecting process-wide capacity.'
      ),
    ]
  ),
  storageModule(
    'storage-go-multipart-upload',
    'Multipart Upload State, Parts, Checksums, and Cleanup',
    'A worker starts multipart uploads without durable state, chooses tiny parts, loses ETags, retries concurrent parts blindly, and never aborts abandoned uploads.',
    'recoverable multipart-upload state machine',
    [
      outcome(
        'storage-go-multipart-threshold-part-size',
        'Choose single versus multipart transfer and part size from object size, part-count limits, memory, network, retry, and completion constraints.',
        'Smaller parts always improve throughput and recovery.'
      ),
      outcome(
        'storage-go-uploadid-part-etag-ledger',
        'Persist upload ID, part number, offset, size, checksum, ETag, attempt, and owner so completion uses the exact accepted part list.',
        'S3 reconstructs the intended ordered part list without the client retaining it.'
      ),
      outcome(
        'storage-go-multipart-concurrency-cancel',
        'Bound part workers and bytes, cancel safely, drain results, preserve completed evidence, and prevent goroutine or buffer leaks.',
        'Canceling the request automatically deletes uploaded parts and upload state.'
      ),
      outcome(
        'storage-go-complete-ambiguous-reconcile',
        'Validate ordered parts, complete once, and reconcile timeout or connection-loss ambiguity with object metadata and upload state.',
        'A failed CompleteMultipartUpload response proves the object does not exist.'
      ),
      outcome(
        'storage-go-abort-lifecycle-cleanup',
        'Abort known failures, inventory abandoned uploads, and configure AbortIncompleteMultipartUpload lifecycle cleanup where supported.',
        'Incomplete multipart parts expire automatically and never incur storage cost.'
      ),
    ]
  ),
  storageModule(
    'storage-go-direct-browser-upload',
    'Presigned Browser Uploads, POST Policies, and CORS',
    'A browser receives a broad week-long upload URL, changes signed headers, overwrites a shared key, and mistakes CORS success for storage authorization.',
    'least-privilege direct-upload session contract',
    [
      outcome(
        'storage-go-upload-session-intent',
        'Create a one-object upload intent with tenant, generated key, expected size, type, checksum, expiry, status, and replay policy before signing.',
        'A presigned URL can safely authorize any file that the browser chooses later.'
      ),
      outcome(
        'storage-go-presigned-put-header-parity',
        'Presign PUT with exact region, expiry, key, checksum, content type, encryption, and required header parity.',
        'A browser may add, remove, or change signed headers without invalidating the URL.'
      ),
      outcome(
        'storage-go-presigned-post-policy',
        'Use a POST policy when browser-enforced key, size, metadata, and field conditions are required and validate the completed object independently.',
        'A POST policy reports the application-level validity of uploaded content.'
      ),
      outcome(
        'storage-go-cors-not-authentication',
        'Configure the smallest origin, method, header, exposure, and age CORS rules while keeping IAM and bucket policy as authorization.',
        'If a browser passes CORS, an S3 request is authorized and safe.'
      ),
      outcome(
        'storage-go-direct-upload-finalization',
        'Finalize by matching intent to HEAD or event evidence, checksum, version, size, owner, scan result, and idempotent state transition.',
        'The browser success event alone proves the expected object is complete and belongs to the session.'
      ),
    ]
  ),
  storageModule(
    'storage-go-download-operations',
    'HeadObject, GetObject, Conditions, Ranges, and Cleanup',
    'A download service calls GET to discover metadata, leaks response bodies, retries after sending headers, and returns full private objects for malformed ranges.',
    'bounded S3 download decision and cleanup flow',
    [
      outcome(
        'storage-go-head-vs-get',
        'Choose HEAD, GET, conditional GET, or a metadata database lookup without doubling requests or trusting stale authority.',
        'Every download should call HeadObject immediately before GetObject.'
      ),
      outcome(
        'storage-go-get-body-lifecycle',
        'Check response and metadata, own and close the body, propagate cancellation, handle partial reads, and distinguish transport from caller writes.',
        'Garbage collection promptly closes every unread S3 response body.'
      ),
      outcome(
        'storage-go-conditional-download',
        'Map application validators and preconditions to S3 requests and preserve 304, 412, not-found, and version-specific meaning.',
        'A conditional S3 failure should always become a generic 500 response.'
      ),
      outcome(
        'storage-go-range-download',
        'Validate one bounded range, map inclusive offsets, cap response bytes, preserve Content-Range, and reject unsatisfiable or abusive requests.',
        'Forwarding an arbitrary Range header to S3 is a complete range policy.'
      ),
      outcome(
        'storage-go-download-error-boundary',
        'Classify missing key, missing version, delete marker, denied access, archive restore state, throttling, cancellation, and partial downstream response.',
        'Returning 404 for every S3 failure prevents information disclosure without operational cost.'
      ),
    ]
  ),
  storageModule(
    'storage-go-http-gateway',
    'Go HTTP Upload and Download Gateways',
    'A Go handler buffers multipart forms and S3 objects in memory, trusts proxy headers, writes status too early, and continues transferring after the client leaves.',
    'streaming Go file-gateway handler',
    [
      outcome(
        'storage-go-http-request-admission',
        'Apply trusted authority, authentication, authorization, method, route, headers, body, multipart, rate, and concurrency admission before storage work.',
        'Authentication alone makes an upload or download request authorized for its object.'
      ),
      outcome(
        'storage-go-maxbytes-multipart-reader',
        'Use MaxBytesReader or bounded readers and streaming multipart iteration without ParseMultipartForm disk or memory surprises.',
        'ParseMultipartForm keeps all large file parts safely in bounded memory.'
      ),
      outcome(
        'storage-go-streaming-response-commit',
        'Delay response commitment until safe, set representation headers, stream bounded data, and record partial-write terminal states.',
        'After WriteHeader, any later S3 failure can still be returned as a JSON error.'
      ),
      outcome(
        'storage-go-context-goroutine-cleanup',
        'Tie storage calls, progress work, pipes, and goroutines to request and shutdown contexts and prove termination.',
        'Starting an io.Pipe goroutine automatically ends it when the HTTP client disconnects.'
      ),
      outcome(
        'storage-go-gateway-abuse-defense',
        'Defend slow bodies, range amplification, decompression, content sniffing, hot keys, tenant exhaustion, and response-header injection.',
        'The S3 service absorbs all resource-exhaustion risk behind a Go gateway.'
      ),
    ]
  ),
  storageModule(
    'storage-go-metadata-transactions',
    'Application Metadata, Transactions, Events, and Orphans',
    'A database row says ready before S3 accepts bytes, an object exists without an owner row after rollback, and events race ahead of scan and authorization state.',
    'file metadata and object reconciliation state machine',
    [
      outcome(
        'storage-go-system-of-record-boundary',
        'Assign authoritative fields to application database, S3 object state, tags, events, or derived indexes and document reconciliation.',
        'One system can atomically own database rows and S3 objects in a normal transaction.'
      ),
      outcome(
        'storage-go-upload-intent-state-machine',
        'Persist idempotent intent, reservation, object identity, expected integrity, upload, quarantine, publish, failure, and expiry transitions.',
        'A boolean uploaded column captures every important file state.'
      ),
      outcome(
        'storage-go-database-object-ordering',
        'Choose database-first, object-first, or direct-upload ordering and expose each crash window, compensation, and user-visible state.',
        'Putting the database write and SDK call in one Go function makes them transactional.'
      ),
      outcome(
        'storage-go-outbox-event-reconciliation',
        'Publish file events from committed state with outbox, stable identity, duplicate-safe consumers, and observed object-version evidence.',
        'S3 event delivery alone supplies exactly-once ordered application events.'
      ),
      outcome(
        'storage-go-orphan-repair',
        'Detect and safely repair orphan objects, orphan rows, stale upload intents, missing scans, and mismatched versions under bounded listing cost.',
        'Deleting every unreferenced key found in one list pass is safe garbage collection.'
      ),
    ]
  ),
  storageModule(
    'storage-go-object-mutations',
    'Copy, Replace, Rename, Delete, Batch, and Concurrency',
    'A rename is presented as atomic, replacement loses metadata, delete hides a live version, and concurrent writers silently overwrite each other.',
    'conditional object-mutation protocol',
    [
      outcome(
        'storage-go-copy-replace-metadata',
        'Copy or replace with explicit source version, conditional evidence, metadata directive, encryption, checksum, tags, and destination validation.',
        'CopyObject automatically preserves every source property and authorization rule.'
      ),
      outcome(
        'storage-go-rename-nonatomic',
        'Implement rename as version-aware copy, validation, metadata update, reference switch, and safe source deletion with recoverable intermediate states.',
        'S3 rename is one atomic operation like filesystem rename.'
      ),
      outcome(
        'storage-go-conditional-write-conflict',
        'Use validators, version IDs, idempotency records, or application locks to detect stale concurrent mutation and expose 409 or 412 meaning.',
        'Strong consistency prevents lost updates between concurrent writers.'
      ),
      outcome(
        'storage-go-delete-version-marker',
        'Distinguish unversioned deletion, current-version delete markers, version-specific deletion, retention, legal hold, and recovery.',
        'DELETE always erases the object bytes immediately and permanently.'
      ),
      outcome(
        'storage-go-batch-partial-failure',
        'Chunk batch operations, correlate per-object outcomes, retry only eligible items, preserve authorization, and report partial success accessibly.',
        'One successful batch HTTP response means every requested object changed.'
      ),
    ]
  ),
  storageModule(
    'storage-go-versioning-recovery',
    'Versioning, Delete Markers, Object Lock, and Recovery',
    'A team enables versioning after an incident, assumes delete markers are backups, and applies compliance retention without testing irreversible governance and restore procedures.',
    'version and immutable-retention recovery runbook',
    [
      outcome(
        'storage-go-versioning-state-transition',
        'Distinguish unversioned, enabled, and suspended versioning and test null versions, overwrite behavior, and lifecycle impact.',
        'Suspending versioning returns a bucket to its original unversioned behavior.'
      ),
      outcome(
        'storage-go-delete-marker-resolution',
        'List versions and delete markers, resolve current reads, restore by removing a marker or copying a version, and preserve audit identity.',
        'A delete marker contains a recoverable copy of the deleted bytes.'
      ),
      outcome(
        'storage-go-object-lock-modes',
        'Apply governance, compliance, legal hold, retention date, and authorized bypass by version with irreversible-risk review.',
        'Object Lock prevents new versions and delete markers from being created.'
      ),
      outcome(
        'storage-go-worm-not-backup',
        'Separate WORM retention, version recovery, replication, independent backup, restore testing, and account-compromise boundaries.',
        'Versioning plus Object Lock is a complete independent backup strategy.'
      ),
      outcome(
        'storage-go-restore-drill-evidence',
        'Run sampled restore drills with authorization, known bytes, metadata, dependencies, time objectives, audit evidence, and safe cleanup.',
        'A documented restore command proves recovery without executing a drill.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  storageModule(
    'storage-go-lifecycle-storage-classes',
    'Lifecycle, Storage Classes, Archive Restore, and Cost',
    'A policy transitions active content immediately, expires current versions but not hidden history, and promises instant archive access without retrieval or minimum-duration cost.',
    'lifecycle and storage-cost decision table',
    [
      outcome(
        'storage-go-storage-class-access-pattern',
        'Select storage class from access frequency, object size, retrieval latency, resilience, minimum duration, monitoring, and transition cost.',
        'The lowest per-gigabyte storage class is always cheapest.'
      ),
      outcome(
        'storage-go-lifecycle-rule-precedence',
        'Model filters, current and noncurrent transitions, expiration, delete markers, multipart cleanup, precedence, propagation, and unsupported bucket features.',
        'Lifecycle rules run immediately and in authored order like a script.'
      ),
      outcome(
        'storage-go-archive-restore-state',
        'Request, monitor, authorize, and communicate temporary archive restoration with tier, expiry, duplicate request, and failure states.',
        'Restoring an archived object permanently changes its storage class.'
      ),
      outcome(
        'storage-go-retention-policy-conflict',
        'Resolve lifecycle expiration against versioning, Object Lock, legal hold, replication, business retention, and deletion evidence.',
        'An expiration rule overrides Object Lock when storage cost is high.'
      ),
      outcome(
        'storage-go-cost-model-changed-traffic',
        'Calculate storage, requests, transitions, retrieval, early deletion, transfer, CDN, invalidation, logs, and operational labor under changed traffic.',
        'Cost estimation can ignore failure retries and cache-miss behavior.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  storageModule(
    'storage-go-iam-bucket-security',
    'IAM, Bucket Policies, Ownership, Access Points, and Public Access',
    'A bucket is private by convention, one application role has s3:*, tenant prefixes are interpolated from user input, and ACLs conflict with ownership and public-block assumptions.',
    'least-privilege S3 authorization proof',
    [
      outcome(
        'storage-go-principal-action-resource-condition',
        'Evaluate identity and resource policies by principal, action, exact resource, condition, session, explicit deny, and organization boundary.',
        'An IAM allow always wins over a bucket-policy deny.'
      ),
      outcome(
        'storage-go-block-public-ownership',
        'Enforce Block Public Access and bucket-owner-enforced Object Ownership while explaining what each does and does not authorize.',
        'Block Public Access makes all bucket access private and least-privileged.'
      ),
      outcome(
        'storage-go-prefix-tenant-isolation',
        'Derive tenant-safe keys and list prefixes server-side and bind allowed actions and conditions without trusting user-supplied policy fragments.',
        'A key prefix containing the tenant ID is an authorization boundary by itself.'
      ),
      outcome(
        'storage-go-access-point-boundary',
        'Use access points and VPC restrictions to separate application or dataset access while retaining bucket-policy and network evidence.',
        'An access point creates a separate copy of the bucket data and policies.'
      ),
      outcome(
        'storage-go-policy-simulation-negative-tests',
        'Review effective permissions with policy analysis, simulation, denied changed cases, temporary credentials, and CloudTrail evidence.',
        'One successful authorized request proves there is no broader unintended access.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  storageModule(
    'storage-go-encryption-key-management',
    'TLS, SSE-S3, SSE-KMS, Bucket Keys, and Encryption Boundaries',
    'A service labels default encryption end-to-end, grants a broad KMS key policy, logs encryption context, and cannot rotate or revoke access without breaking unknown consumers.',
    'encryption and key-authorization contract',
    [
      outcome(
        'storage-go-transport-at-rest-client',
        'Separate TLS in transit, S3 server-side encryption, KMS envelope encryption, and application client-side encryption by threat and feature tradeoff.',
        'SSE-KMS keeps plaintext hidden from the application and S3 service.'
      ),
      outcome(
        'storage-go-sse-s3-kms-choice',
        'Choose SSE-S3, SSE-KMS, dual-layer KMS where required, or client encryption from audit, tenancy, performance, cost, and service integration needs.',
        'SSE-KMS is automatically the safest and cheapest choice for every object.'
      ),
      outcome(
        'storage-go-kms-key-policy-context',
        'Constrain IAM and KMS key policy, grants, service principal, encryption context, region, rotation, disable, deletion, and break-glass ownership.',
        'IAM permission to an S3 object automatically grants use of its KMS key.'
      ),
      outcome(
        'storage-go-bucket-key-cost-boundary',
        'Evaluate S3 Bucket Keys for KMS request cost while documenting encryption-context and audit changes.',
        'Bucket Keys change only billing and never authorization or audit semantics.'
      ),
      outcome(
        'storage-go-key-rotation-revocation-drill',
        'Prove new writes, old reads, role rotation, key disable recovery, compromised-session revocation limits, and residual cached or signed access.',
        'Rotating a KMS key immediately re-encrypts every existing object and revokes every URL.'
      ),
    ]
  ),
  storageModule(
    'storage-go-signed-access',
    'Presigned Downloads, CloudFront Signatures, Cookies, and Revocation',
    'A product places long-lived S3 presigned URLs in logs, uses one shared CloudFront key, signs with legacy assumptions, and promises immediate revocation after links escape.',
    'time-bounded signed-delivery decision record',
    [
      outcome(
        'storage-go-s3-presigned-download',
        'Presign the exact version, response metadata, method, region, credential scope, and shortest useful expiry while treating the URL as a bearer secret.',
        'A presigned S3 URL has permissions independent from the signing principal.'
      ),
      outcome(
        'storage-go-cloudfront-url-cookie-choice',
        'Choose signed URL or signed cookie by object count, path scope, player behavior, client constraints, and leakage surface.',
        'Signed cookies are always more secure because the URL contains no signature.'
      ),
      outcome(
        'storage-go-canned-custom-policy',
        'Choose canned or custom CloudFront policy and constrain expiry, optional start time, resource wildcard, and IP range without accidental overbreadth.',
        'A wildcard resource in a custom policy is equivalent to signing one exact object.'
      ),
      outcome(
        'storage-go-cloudfront-signer-crypto',
        'Use CloudFront sign 1.11.7 with reviewed RSA or ECDSA keys and explicit HashSHA256 support while preserving compatibility evidence for zero-value SHA-1 behavior.',
        'Selecting a modern Go crypto default automatically changes every CloudFront signature to SHA-256.'
      ),
      outcome(
        'storage-go-signed-access-revocation',
        'Model expiry-at-request-start, range continuation, key-group rotation, authorization changes, logs and referrers, cache behavior, and emergency revocation limits.',
        'Deleting an application session immediately revokes every issued S3 or CloudFront URL.'
      ),
    ]
  ),
  storageModule(
    'storage-go-cloudfront-oac-origin',
    'CloudFront Origins, OAC, SSE-KMS, and Private Delivery',
    'A distribution points at an S3 website endpoint, retains legacy OAI by habit, permits the CloudFront service principal globally, and forgets the KMS key policy.',
    'private CloudFront-to-S3 origin contract',
    [
      outcome(
        'storage-go-s3-origin-website-boundary',
        'Distinguish regular S3 origins from website endpoints by HTTPS, OAC, redirects, error pages, methods, and public-access requirements.',
        'An S3 website endpoint can remain private behind OAC.'
      ),
      outcome(
        'storage-go-oac-signing-behavior',
        'Configure OAC with always-sign where appropriate and define viewer protocol, origin protocol, request signing, and forwarded Authorization behavior.',
        'OAC authenticates viewers as well as CloudFront to the S3 origin.'
      ),
      outcome(
        'storage-go-oac-sourcearn-policy',
        'Scope the CloudFront service principal to the exact distribution SourceArn and required object actions without public or cross-distribution access.',
        'Allowing cloudfront.amazonaws.com in a bucket policy is sufficiently narrow by default.'
      ),
      outcome(
        'storage-go-oac-kms-policy',
        'Grant the exact distribution use of the KMS key separately from S3 bucket access and verify encrypted read and write cases.',
        'A correct S3 bucket policy is enough for CloudFront to read SSE-KMS objects.'
      ),
      outcome(
        'storage-go-oai-oac-migration',
        'Migrate OAI to OAC with temporary dual authorization, deployed distribution evidence, negative tests, monitoring, and policy rollback.',
        'Replacing the origin identity ID in one policy statement is a zero-risk migration.'
      ),
    ]
  ),
  storageModule(
    'storage-go-cloudfront-cache',
    'CloudFront Cache Keys, Origin Requests, TTLs, and Invalidation',
    'A cache key includes every viewer header, authorization is omitted, the origin receives different data than the cache varies on, and releases rely on global invalidation as routine deployment.',
    'cache-key, forwarding, and freshness contract',
    [
      outcome(
        'storage-go-cache-key-identity',
        'Include only representation-changing path, query, header, cookie, encoding, and authorization dimensions in the cache key.',
        'Forwarding a value to the origin automatically places it in the cache key.'
      ),
      outcome(
        'storage-go-origin-request-policy',
        'Use origin request policy for additional required viewer data without unnecessary cache fragmentation or trust escalation.',
        'Cache policy and origin request policy are two names for the same configuration.'
      ),
      outcome(
        'storage-go-ttl-revalidation-errors',
        'Combine origin Cache-Control, minimum, default, maximum, stale behavior, validators, and error caching with content-change and privacy requirements.',
        'A short default TTL guarantees private or changed content cannot be served stale.'
      ),
      outcome(
        'storage-go-versioned-name-invalidation',
        'Prefer content-versioned names for routine immutable releases and reserve path or cache-tag invalidation for bounded urgent purge with completion evidence.',
        'Invalidating /* is the safest and cheapest deployment strategy.'
      ),
      outcome(
        'storage-go-compression-vary',
        'Configure Brotli or gzip variants, Accept-Encoding cache behavior, already-compressed media, content length, and changed client capability evidence.',
        'CloudFront compression reduces every file type and never changes cache identity.'
      ),
    ]
  ),
  storageModule(
    'storage-go-media-range-streaming',
    'Media Delivery, Range Requests, MP4, HLS, and Streaming Boundaries',
    'A video player downloads whole large files for seeking, an origin emits invalid range responses, MP4 metadata sits at the end, and private segment access differs from manifest access.',
    'accessible media-delivery and range plan',
    [
      outcome(
        'storage-go-cloudfront-range-behavior',
        'Meet ascending, nonoverlapping, valid Range behavior, understand larger origin fetches, 200 fallbacks, chunked-origin limits, and cache chunking.',
        'CloudFront forwards every Range byte boundary unchanged and always returns 206.'
      ),
      outcome(
        'storage-go-mp4-progressive-download',
        'Prepare correct media type, length, validators, byte ranges, and fast-start MP4 metadata for progressive download and seeking.',
        'Serving video/mp4 with Accept-Ranges automatically makes every MP4 seek efficiently.'
      ),
      outcome(
        'storage-go-hls-dash-object-model',
        'Model manifests, variant playlists, segments, codecs, durations, naming, cache lifetimes, and atomic publication for adaptive delivery.',
        'HLS or DASH is one continuously growing S3 object.'
      ),
      outcome(
        'storage-go-private-media-authorization',
        'Align manifest and segment authorization, signed cookies or URLs, CORS, key delivery, expiry, seeking, and leakage boundaries.',
        'Protecting the manifest URL alone keeps its media segments private.'
      ),
      outcome(
        'storage-go-media-accessibility-quality',
        'Provide captions, transcripts, audio description where needed, player keyboard operation, status, quality fallback, and representative network tests.',
        'CDN throughput is the only quality metric that matters to media users.',
        'professional',
        'create'
      ),
    ]
  ),
  storageModule(
    'storage-go-edge-security',
    'Edge Security, WAF, Hotlinking, Headers, and Failure Containment',
    'A public distribution trusts Referer as authorization, caches private errors, lacks browser security headers, and forwards bot bursts to an expensive origin.',
    'layered edge-security and abuse-control plan',
    [
      outcome(
        'storage-go-waf-rate-bot-boundary',
        'Apply WAF, rate limits, bot controls, request size and method rules with false-positive, cost, accessibility, and bypass evidence.',
        'A WAF managed ruleset replaces application authorization and upload validation.'
      ),
      outcome(
        'storage-go-hotlink-origin-secret',
        'Treat Referer hotlink controls as a weak cost signal and use signed access or a controlled origin header only within its actual threat boundary.',
        'Blocking unknown Referer values securely prevents content theft.'
      ),
      outcome(
        'storage-go-response-header-policy',
        'Set HSTS, MIME sniffing, frame, referrer, content security, cross-origin, and content-disposition headers appropriate to file types and embedding.',
        'One generic security-header policy is correct for downloads, media, and embeddable assets.'
      ),
      outcome(
        'storage-go-geo-privacy-boundary',
        'Use geographic restrictions only with documented business, legal, accuracy, accessibility, VPN, and privacy limits.',
        'CloudFront country detection proves a viewer legal residence or identity.'
      ),
      outcome(
        'storage-go-origin-shield-error-containment',
        'Use Origin Shield, request collapsing, failover, bounded error caching, stale delivery, and load shedding without hiding recovery or serving private content.',
        'Long error-cache TTL always protects the origin safely during incidents.'
      ),
    ]
  ),
  storageModule(
    'storage-go-durability-disaster-recovery',
    'Replication, Multi-Region Access, Backup, and Disaster Recovery',
    'A team equates regional S3 durability with application recovery, enables replication without version or KMS testing, and promises zero data loss and instant failover.',
    'RPO, RTO, replication, failover, and restore dossier',
    [
      outcome(
        'storage-go-durability-availability-recovery',
        'Separate object durability, request availability, regional reachability, accidental deletion, corruption, account compromise, and application recovery.',
        'Eleven-nines durability guarantees the application can recover every file immediately.'
      ),
      outcome(
        'storage-go-replication-prerequisites-status',
        'Configure versioning, destination ownership, IAM, KMS, filters, delete-marker behavior, replication status, metrics, and failure remediation.',
        'Cross-Region Replication copies all existing objects and every delete automatically.'
      ),
      outcome(
        'storage-go-mrap-routing-failover',
        'Evaluate Multi-Region Access Points, latency routing, active-active writes, consistency, replication lag, failover controls, and client endpoint support.',
        'A multi-region endpoint creates synchronous cross-region writes with zero conflicts.'
      ),
      outcome(
        'storage-go-rpo-rto-threat-matrix',
        'Set RPO and RTO per failure and data class and connect them to replication, backup isolation, detection, decision, restore, and validation evidence.',
        'One RPO and RTO pair covers deletion, corruption, region loss, and account compromise equally.'
      ),
      outcome(
        'storage-go-disaster-recovery-drill',
        'Run controlled region, credential, deletion, corruption, dependency, and restore drills with abort, stakeholder communication, integrity checks, and lessons.',
        'A replication dashboard in a healthy region proves disaster recovery.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  storageModule(
    'storage-go-events-observability-cost',
    'Events, Observability, Capacity, Inventory, and Cost Control',
    'Operators have high-cardinality object-key metrics, duplicate unordered events, incomplete request traces, no inventory reconciliation, and no alert tied to a user or cost outcome.',
    'storage telemetry, inventory, capacity, and cost model',
    [
      outcome(
        'storage-go-event-delivery-semantics',
        'Consume S3 notifications through supported destinations with duplicate, ordering, filtering, recursion, schema, delay, and lost-consumer recovery limits.',
        'S3 event notifications are exactly once and globally ordered by key.'
      ),
      outcome(
        'storage-go-request-trace-audit',
        'Correlate application operation, AWS request IDs, CloudTrail data events where justified, access logs, CloudFront logs, and stakeholder result without secrets.',
        'One distributed trace contains every authoritative AWS audit fact.'
      ),
      outcome(
        'storage-go-low-cardinality-metrics',
        'Measure admitted and completed bytes, latency, failures, cache hit, range behavior, retries, backlog, replication, restore, and spend with bounded labels.',
        'Object key and user ID are safe metric labels because they improve debugging.'
      ),
      outcome(
        'storage-go-inventory-storage-lens',
        'Use S3 Inventory, Storage Lens, analytics, and sampled reconciliation for object estate, encryption, replication, lifecycle, ownership, and cost evidence.',
        'A live ListObjects scan is always cheaper and more complete than inventory reports.'
      ),
      outcome(
        'storage-go-capacity-cost-alerts',
        'Forecast request, byte, concurrency, part, KMS, origin, egress, log, and budget limits and connect alerts to admission, degradation, and owner actions.',
        'S3 scales automatically, so application capacity and cost alarms are unnecessary.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  storageModule(
    'storage-go-testing-release-defense',
    'Testing, Fault Injection, Release, and Production Defense',
    'A service passes mocked unit tests and a local emulator demo, then deploys new SDK and CDN settings without race, AWS contract, security, load, rollback, restore, or cost evidence.',
    'production file-delivery defense dossier',
    [
      outcome(
        'storage-go-pure-contract-property-tests',
        'Use table, property, and fuzz tests for key, range, policy, lifecycle, state-machine, checksum, retry, and cache invariants with changed cases.',
        'High line coverage proves file-delivery behavior under boundary inputs.'
      ),
      outcome(
        'storage-go-fake-emulator-boundary',
        'Use fakes and emulators for deterministic feedback while listing unsupported AWS semantics and assigning controlled integration tests.',
        'A local S3-compatible emulator proves IAM, KMS, OAC, CloudFront, replication, and billing behavior.'
      ),
      outcome(
        'storage-go-go-quality-race-leak',
        'Gate formatting, vet, static analysis, tests, fuzz seeds, race, goroutine and body leaks, benchmarks, profiles, reproducible build, and dependency review.',
        'Passing go test once proves race freedom and resource cleanup.'
      ),
      outcome(
        'storage-go-aws-fault-load-security-tests',
        'Run least-privilege controlled AWS tests for integrity, multipart ambiguity, throttling, cancellation, cache, signatures, WAF, KMS, replication, restore, load, and cost caps.',
        'A production smoke upload is sufficient integration and resilience evidence.'
      ),
      outcome(
        'storage-go-compatible-release-defense',
        'Canary immutable artifacts and infrastructure, compare changed behavior and cost, preserve rollback data and policies, rehearse recovery, and defend residual risk.',
        'Rolling back Go code automatically restores overwritten objects, expired URLs, cache state, IAM, KMS, and lifecycle policy.',
        'professional',
        'create'
      ),
    ]
  ),
];

const sources = [
  [
    'Go 1.26 Release Contract',
    'https://go.dev/doc/go1.26',
    'Go 1.26.5 toolchain',
    'Language, runtime, build, testing, and compatibility boundaries.',
  ],
  [
    'AWS SDK for Go v2 Core API',
    'https://pkg.go.dev/github.com/aws/aws-sdk-go-v2@v1.42.1',
    'aws-sdk-go-v2 1.42.1; published 2026-07-01',
    'Shared configuration, credentials, middleware, request, retry, and error contracts.',
  ],
  [
    'AWS SDK for Go v2 S3 API',
    'https://pkg.go.dev/github.com/aws/aws-sdk-go-v2/service/s3@v1.105.0',
    'service/s3 1.105.0; published 2026-07-06',
    'S3 client, inputs, outputs, paginators, waiters, presigning, checksums, multipart, and errors.',
  ],
  [
    'AWS S3 Transfer Manager for Go',
    'https://pkg.go.dev/github.com/aws/aws-sdk-go-v2/feature/s3/transfermanager@v0.3.2',
    'transfermanager 0.3.2; published 2026-07-13; pre-v1',
    'Current upload, download, get, directory, progress, failure-policy, DNS, and concurrency APIs.',
  ],
  [
    'Deprecated AWS S3 Manager for Go',
    'https://pkg.go.dev/github.com/aws/aws-sdk-go-v2/feature/s3/manager@v1.22.33',
    'manager 1.22.33; published 2026-07-13; deprecated',
    'Migration boundary from the deprecated upload and download manager package.',
  ],
  [
    'AWS CloudFront Sign for Go',
    'https://pkg.go.dev/github.com/aws/aws-sdk-go-v2/feature/cloudfront/sign@v1.11.7',
    'cloudfront/sign 1.11.7; published 2026-07-01',
    'Signed URLs, signed cookies, canned and custom policy, RSA and ECDSA, SHA-1 compatibility, and HashSHA256.',
  ],
  [
    'Amazon S3 Data Consistency Model',
    'https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html#ConsistencyModel',
    'current Amazon S3 user guide reviewed 2026-07-14',
    'Strong read-after-write behavior and single-object operation boundaries.',
  ],
  [
    'Amazon S3 Object Key Naming',
    'https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-keys.html',
    'current Amazon S3 user guide reviewed 2026-07-14',
    'Object key, prefix, delimiter, encoding, relative segment, and virtual-hosted constraints.',
  ],
  [
    'Amazon S3 Directory Buckets',
    'https://docs.aws.amazon.com/AmazonS3/latest/userguide/directory-buckets-overview.html',
    'current S3 Express One Zone guidance reviewed 2026-07-14',
    'Directory-bucket zones, endpoints, session auth, performance, ordering, inactivity, and unsupported features.',
  ],
  [
    'Amazon S3 Multipart Upload',
    'https://docs.aws.amazon.com/AmazonS3/latest/userguide/mpuoverview.html',
    'current Amazon S3 user guide reviewed 2026-07-14',
    'Multipart state, parts, ETags, checksums, completion, abort, limits, and billing.',
  ],
  [
    'Amazon S3 Checking Object Integrity',
    'https://docs.aws.amazon.com/AmazonS3/latest/userguide/checking-object-integrity.html',
    'current Amazon S3 checksum guidance reviewed 2026-07-14',
    'Full and composite checksums, supported algorithms, upload validation, and ETag limits.',
  ],
  [
    'Amazon S3 Presigned URL Upload',
    'https://docs.aws.amazon.com/AmazonS3/latest/userguide/PresignedUrlUploadObject.html',
    'current Amazon S3 user guide reviewed 2026-07-14',
    'Signer authority, expiry, overwrite, region, and signed upload behavior.',
  ],
  [
    'Amazon S3 CORS',
    'https://docs.aws.amazon.com/AmazonS3/latest/userguide/cors.html',
    'current Amazon S3 user guide reviewed 2026-07-14',
    'Browser cross-origin rules and separation from IAM and bucket authorization.',
  ],
  [
    'Amazon S3 Versioning',
    'https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html',
    'current Amazon S3 user guide reviewed 2026-07-14',
    'Version states, version IDs, overwrites, delete markers, recovery, and lifecycle interaction.',
  ],
  [
    'Amazon S3 Object Lock',
    'https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html',
    'current Amazon S3 user guide reviewed 2026-07-14',
    'WORM retention, governance, compliance, legal holds, version scope, and deletion limits.',
  ],
  [
    'Amazon S3 Lifecycle Management',
    'https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html',
    'current Amazon S3 user guide reviewed 2026-07-14',
    'Transitions, expiration, noncurrent versions, delete markers, multipart cleanup, and propagation.',
  ],
  [
    'Amazon S3 Storage Classes',
    'https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html',
    'current Amazon S3 storage-class guidance reviewed 2026-07-14',
    'Access, resilience, retrieval, minimum duration, archive, and cost selection.',
  ],
  [
    'Amazon S3 Security Best Practices',
    'https://docs.aws.amazon.com/AmazonS3/latest/userguide/security-best-practices.html',
    'current Amazon S3 security guidance reviewed 2026-07-14',
    'Public block, least privilege, ownership, encryption, logging, monitoring, and detective controls.',
  ],
  [
    'Amazon S3 Server-Side Encryption',
    'https://docs.aws.amazon.com/AmazonS3/latest/userguide/serv-side-encryption.html',
    'current Amazon S3 encryption guidance reviewed 2026-07-14',
    'Default encryption, SSE-S3, SSE-KMS, and encryption boundaries.',
  ],
  [
    'Amazon S3 Replication',
    'https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html',
    'current Amazon S3 replication guidance reviewed 2026-07-14',
    'Versioning prerequisites, rules, destinations, status, metrics, KMS, and recovery limits.',
  ],
  [
    'CloudFront Restrict S3 Origins with OAC',
    'https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html',
    'current CloudFront OAC guidance reviewed 2026-07-14',
    'OAC versus OAI, regular S3 origins, bucket ownership, methods, SourceArn policy, and SSE-KMS policy.',
  ],
  [
    'CloudFront Signed URLs and Cookies',
    'https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/PrivateContent.html',
    'current CloudFront private-content guidance reviewed 2026-07-14',
    'Trusted key groups, signed URLs, signed cookies, policies, expiry, and private delivery.',
  ],
  [
    'CloudFront Cache Key and Origin Requests',
    'https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/understanding-the-cache-key.html',
    'current CloudFront caching guidance reviewed 2026-07-14',
    'Cache-key values, cache policies, origin request policies, variations, and forwarding.',
  ],
  [
    'CloudFront Range GET Requests',
    'https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/RangeGETs.html',
    'current CloudFront range guidance reviewed 2026-07-14',
    'Valid ranges, origin fetch behavior, cache chunks, full-object fallbacks, and large files.',
  ],
  [
    'CloudFront Invalidation and Versioned Names',
    'https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Invalidation.html',
    'current CloudFront invalidation guidance reviewed 2026-07-14',
    'Versioned file names, path and cache-tag invalidation, propagation, logs, and cost.',
  ],
  [
    'CloudFront Security Best Practices',
    'https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/security-best-practices.html',
    'current CloudFront security guidance reviewed 2026-07-14',
    'TLS, origin protection, WAF, logging, permissions, geographic controls, and response headers.',
  ],
  [
    'HTTP Semantics RFC 9110',
    'https://www.rfc-editor.org/rfc/rfc9110',
    'RFC 9110',
    'Representations, methods, validators, conditional requests, ranges, partial content, and metadata.',
  ],
  [
    'CS2023 Curricula',
    'https://csed.acm.org/wp-content/uploads/2024/04/Version-Gamma.pdf',
    'ACM/IEEE-CS/AAAI CS2023 version gamma',
    'Recognized curricular expectations for systems, networking, security, professional practice, and mastery evidence.',
  ],
].map(([title, url, version, scope]) => ({
  title,
  authority: 'official-docs',
  url,
  version,
  reviewedAt: REVIEWED_AT,
  scope,
}));

export const fileServersS3GoConfig = finalizeCourse(
  {
    id: 'file-servers-s3-go',
    competencyIdPrefix: 'storage-go-',
    title: 'Production File Delivery with Amazon S3 and CloudFront in Go 1.26',
    version: '2026.07',
    audience: {
      description:
        'Go backend developers who can defend production HTTP services and need to build, secure, test, operate, and recover high-volume file and media delivery with Amazon S3 and CloudFront.',
      entryKnowledge: [
        'Build and defend a production Go 1.26 HTTP service with bounded streaming, contexts, validation, authorization, persistence, observability, testing, and graceful shutdown.',
        'Explain HTTP representation metadata, validators, conditional requests, range semantics, caches, TLS, concurrency, database transactions, and failure ownership.',
      ],
      deviceConstraints: [
        'Modern browser; learner Go runs only in the isolated deterministic interpreter. Browser tasks model storage identity, policy, ranges, checksums, state, cache, retry, cost, and recovery without importing AWS SDK packages, opening networks, contacting AWS, reading host state, using credentials, or causing external effects.',
      ],
      accessibilityAssumptions: [
        'File pickers, progress and error status, media controls, storage diagrams, byte-range traces, policy tables, cache timelines, cost charts, and dashboards have keyboard operation, announced status, large targets, structured text, reduced motion, and non-color meaning.',
      ],
    },
    scope: {
      includes: [
        'Go 1.26.5, AWS SDK for Go v2 1.42.1, S3 1.105.0, transfermanager 0.3.2, cloudfront/sign 1.11.7, HTTP file semantics, S3 object and bucket models, SDK clients, credentials, retries, bounded upload and download, integrity, multipart, direct browser upload, Go gateways, metadata transactions, versioning, Object Lock, lifecycle, IAM, encryption, signed access, OAC, CloudFront caching, media ranges, edge security, replication, recovery, events, observability, capacity, cost, tests, faults, and release defense',
        'Runnable deterministic pure-Go storage decision functions plus explicit Go compile, vet, race, fuzz, leak, controlled AWS integration, load, security, cost, restore, and production transfer gates',
        'Five cumulative real-world file-delivery systems and a performance-based production defense examination',
      ],
      excludes: [
        'Browser access to AWS SDKs, networks, S3, CloudFront, KMS, IAM, WAF, databases, Docker, credentials, host processes, billing actions, or production infrastructure',
        'Claiming AWS authorization, encryption, durability, replication, CDN, range, billing, race, throughput, or recovery behavior from deterministic browser models or emulators without the named authorized transfer gate',
      ],
      nextCourses: ['build-ecommerce-api-go', 'build-social-media-api-go'],
    },
    sources,
    sharedRequirements: [
      'Every activity retrieves Go, HTTP semantics, accessibility, security, validation, persistence, testing, context, goroutine ownership, resource budgets, and evidence habits before adding one storage or delivery boundary.',
      'Browser Go is deterministic and isolated. It models identity, ranges, policy, integrity, lifecycle, caching, cost, and recovery decisions but never imports AWS SDK packages, opens sockets, contacts AWS or databases, reads host state, executes commands, uses credentials, or causes external effects.',
      'Passing work requires stable file and scenario identity, a named owner and state, bounded bytes, time, attempts, concurrency, cache and cost, observable changed and failure results, cleanup and recovery, and explicit compiler, controlled AWS, security, load, cost, restore, or production transfer limits.',
    ],
    modules,
    projects: [
      project(
        'storage-go-accessible-evidence-portal',
        'Accessible Evidence Upload Portal',
        'storage-go-direct-browser-upload',
        'A state civil-rights evidence office',
        'They need bounded accessible direct uploads, generated keys, integrity, quarantine, malware-scan handoff, presigned browser policy, CORS, finalization, and private retrieval without confusing browser success with publication.',
        [
          'storage-go-upload-byte-time-count-budget',
          'storage-go-quarantine-publish-state',
          'storage-go-upload-session-intent',
          'storage-go-cors-not-authentication',
          'storage-go-direct-upload-finalization',
        ]
      ),
      project(
        'storage-go-tenant-file-api',
        'Tenant-Safe File API and Metadata Reconciler',
        'storage-go-object-mutations',
        'A multi-tenant case-management provider',
        'They need a streaming Go gateway, strict tenant authorization, conditional ranges and writes, database and object reconciliation, recoverable rename and delete, duplicate-safe events, and orphan repair.',
        [
          'storage-go-http-request-admission',
          'storage-go-range-download',
          'storage-go-upload-intent-state-machine',
          'storage-go-rename-nonatomic',
          'storage-go-orphan-repair',
        ]
      ),
      project(
        'storage-go-regulated-records-vault',
        'Regulated Records Vault and Restore Drill',
        'storage-go-encryption-key-management',
        'A regulated public records archive',
        'They need versioning, immutable retention, lifecycle and archive restoration, least-privilege IAM, SSE-KMS, key rotation, deletion proof, independent recovery, and timed restore evidence.',
        [
          'storage-go-object-lock-modes',
          'storage-go-worm-not-backup',
          'storage-go-lifecycle-rule-precedence',
          'storage-go-kms-key-policy-context',
          'storage-go-key-rotation-revocation-drill',
        ]
      ),
      project(
        'storage-go-private-media-platform',
        'Private Accessible Media Delivery Platform',
        'storage-go-edge-security',
        'A regional education broadcaster',
        'They need OAC-protected encrypted origins, time-bounded viewer access, correct cache identity, range-aware MP4 and adaptive media, accessible players, WAF and origin protection, urgent purge, and leakage limits.',
        [
          'storage-go-oac-sourcearn-policy',
          'storage-go-cloudfront-signer-crypto',
          'storage-go-cache-key-identity',
          'storage-go-cloudfront-range-behavior',
          'storage-go-media-accessibility-quality',
        ]
      ),
      project(
        'storage-go-multiregion-production-defense',
        'Multi-Region File Platform Production Defense',
        'storage-go-testing-release-defense',
        'An engineering, security, accessibility, compliance, finance, and operations board',
        'The board needs transfer-manager migration evidence, bounded large transfers, replication and failover, event reconciliation, low-cardinality telemetry, capacity and cost controls, race and leak gates, AWS fault and restore drills, compatible rollout, rollback, and residual-risk ownership.',
        [
          'storage-go-manager-deprecation-migration',
          'storage-go-transfer-resource-budget',
          'storage-go-replication-prerequisites-status',
          'storage-go-capacity-cost-alerts',
          'storage-go-aws-fault-load-security-tests',
          'storage-go-compatible-release-defense',
        ]
      ),
    ],
    examContext:
      'Unfamiliar Go 1.26, S3, and CloudFront cases spanning file identity, HTTP representations, storage architecture, bucket types, AWS SDK v2, credentials, retries, uploads, checksums, transfer manager, multipart state, direct browser transfer, downloads, Go gateways, metadata transactions, mutations, versioning, Object Lock, lifecycle, IAM, encryption, signed access, OAC, cache identity, ranges and media, edge security, replication, recovery, events, observability, capacity, cost, tests, fault injection, release, rollback, and production defense with explicit live-transfer limits.',
    minimumQuestionBankSize: 900,
  },
  { researchedAt: RESEARCHED_AT, prerequisiteCourseIds: ['http-servers-go'] }
);

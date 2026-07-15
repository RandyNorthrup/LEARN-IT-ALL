import { finalizeCourse, module, project, skill } from './course-config-helpers.mjs';

const REVIEWED_AT = '2026-07-14';
const RESEARCHED_AT = '2026-07-14T18:15:00.000Z';

function outcome(id, statement, misconception, knowledgeType = 'procedural', level = 'apply') {
  if (!misconception) {
    throw new Error(`Missing misconception for TypeScript HTTP server competency ${id}`);
  }
  return skill(id, statement, misconception, knowledgeType, level);
}

function serverModule(id, title, context, artifact, skills) {
  return {
    ...module(id, title, context, artifact, skills),
    contexts: {
      theory: context,
      workshop: `A backend pairing room predicts runtime, request, middleware, dependency, response, and cleanup transitions before assembling the first ${artifact} for ${title.toLowerCase()}.`,
      debug: `An incident engineer receives a plausible but broken ${artifact}; preserve the failing exchange, locate the first causal Node or Express boundary, and retain a regression probe.`,
      lab: `An independent service team receives a different tenant, traffic, trust, persistence, and failure profile and transfers ${title.toLowerCase()} into a new ${artifact}.`,
      review: `A delayed operations handoff reconstructs ${title.toLowerCase()} from bounded code and request evidence, challenges one misconception, and revises the ${artifact}.`,
      quiz: `A production review compares near-miss TypeScript decisions for ${title.toLowerCase()} and demands the smallest safe ${artifact} with changed-input evidence.`,
    },
  };
}

const modules = [
  serverModule(
    'http-server-ts-outcomes-toolchain',
    'Service Outcomes, Node 24 LTS, and the TypeScript Toolchain',
    'A community-service API counts routes as value, floats Node and npm versions, confuses TypeScript type erasure with validation, and cannot reproduce its build or startup decision.',
    'outcome, runtime, compiler, and reproducibility charter',
    [
      outcome(
        'httpsts-outcome-evidence-contract',
        'Define user, client, operator, security, accessibility, and recovery evidence for a service outcome before choosing endpoints.',
        'A larger route inventory proves the server creates more value for its users.',
        'professional',
        'create'
      ),
      outcome(
        'httpsts-node-lts-runtime-contract',
        'Pin Node 24.18 LTS, npm 12, architecture, package policy, lockfile, environment, and supported deployment assumptions as one reproducible runtime contract.',
        'Any recent Node major behaves identically once TypeScript source compiles.'
      ),
      outcome(
        'httpsts-typescript-native-compatibility',
        'Separate the TypeScript 7 native CLI from the TypeScript 6 compatibility API and prove which tool owns checking, emission, editor APIs, and build gates.',
        'The native TypeScript 7 compiler exposes every JavaScript compiler API provided by TypeScript 6.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'httpsts-node-type-stripping-boundary',
        'Use Node type stripping only for erasable syntax while keeping type checking, path transformation, module resolution, and production emission explicit.',
        'Node running a dot-ts file means it type-checked the program and honored tsconfig paths.'
      ),
      outcome(
        'httpsts-clean-build-changed-environment',
        'Prove a clean npm ci, type gate, test, build, artifact, and startup under a changed environment without warm local residue.',
        'A successful developer-server start proves a clean production build is reproducible.',
        'metacognitive',
        'evaluate'
      ),
    ]
  ),
  serverModule(
    'http-server-ts-node-runtime-lifecycle',
    'Node Process, Event Loop, Modules, Configuration, and Lifecycle',
    'The service reads configuration during requests, starts background promises without ownership, mixes module systems, treats signals as ordinary exceptions, and reports ready before dependencies exist.',
    'process, event-loop, configuration, and lifecycle state model',
    [
      outcome(
        'httpsts-event-loop-work-queues',
        'Trace call stack, timers, pending callbacks, poll, check, close callbacks, microtasks, and next-tick work without assuming one request owns one event-loop turn.',
        'Node completes one HTTP request before beginning work for another request.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'httpsts-esm-cjs-resolution',
        'Configure ESM, CommonJS interop, package exports, file extensions, and NodeNext resolution without relying on accidental development-loader behavior.',
        'Changing import syntax alone converts every CommonJS dependency and runtime into ESM.'
      ),
      outcome(
        'httpsts-config-parse-validate-freeze',
        'Parse, validate, normalize, redact, and freeze configuration once before acquiring resources or accepting traffic.',
        'Environment variables become trustworthy typed values when an interface declares their intended shape.'
      ),
      outcome(
        'httpsts-startup-readiness-liveness',
        'Sequence configuration, dependency creation, listener binding, liveness, readiness, background ownership, and atomic startup failure.',
        'Listening on a port proves the service and every required dependency are ready.'
      ),
      outcome(
        'httpsts-signal-drain-exit',
        'Handle termination signals with idempotent draining, bounded cleanup, rejection tracking, exit-code ownership, and forced-stop evidence.',
        'Calling process.exit immediately after receiving SIGTERM gives pending responses time to finish.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  serverModule(
    'http-server-ts-http-semantics-resources',
    'HTTP Semantics, Resources, Methods, Preconditions, and Status',
    'A task API uses POST for every action, changes state on GET, returns 200 for rejected work, and retries duplicate writes without resource or precondition semantics.',
    'resource, method, status, validator, and retry contract',
    [
      outcome(
        'httpsts-resource-representation-storage',
        'Separate resource identity, server state, selected representation, transfer content, TypeScript model, and PostgreSQL rows.',
        'A JSON value, TypeScript type, database row, and HTTP resource are necessarily the same thing.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'httpsts-safe-idempotent-cacheable',
        'Apply safe, idempotent, and cacheable method properties independently and preserve them through application effects.',
        'PUT and DELETE are safe because repeating them should have the same intended effect.'
      ),
      outcome(
        'httpsts-write-method-status-location',
        'Choose POST, PUT, PATCH, DELETE, status, Location, representation, and asynchronous completion behavior from the resource contract.',
        'Every successful write returns status 200 and the complete updated object.'
      ),
      outcome(
        'httpsts-conditional-request-preconditions',
        'Use validators and If-Match, If-None-Match, dates, 304, 412, and 428 to prevent lost updates and unnecessary transfer.',
        'ETags only optimize caches and cannot protect a mutation from stale client state.'
      ),
      outcome(
        'httpsts-semantics-retry-proof',
        'Test methods against retries, duplicate delivery, stale validators, HEAD, OPTIONS, changed state, and durable effects.',
        'One expected status assertion proves an endpoint obeys HTTP semantics.',
        'metacognitive',
        'evaluate'
      ),
    ]
  ),
  serverModule(
    'http-server-ts-node-http-protocol-timeouts',
    'Node HTTP Primitives, Connections, Protocols, Timeouts, and Shutdown',
    'A Node server inherits defaults without understanding header, request, keep-alive, upgrade, idle-socket, HTTP/2, or graceful-close behavior.',
    'Node HTTP server protocol and timeout budget',
    [
      outcome(
        'httpsts-node-request-response-streams',
        'Trace IncomingMessage and ServerResponse as streams with header commitment, body ownership, backpressure, abort, error, and close lifetimes.',
        'A Node request and response are fully buffered plain objects owned by Express.'
      ),
      outcome(
        'httpsts-server-timeout-budget',
        'Configure requestTimeout, headersTimeout, keepAliveTimeout, keepAliveTimeoutBuffer, maxHeadersCount, and maximum header size from a threat and latency budget.',
        'The default Node HTTP timeouts are universally safe for slow clients and production traffic.'
      ),
      outcome(
        'httpsts-http1-http2-http3-boundary',
        'Distinguish HTTP/1.1, Node HTTP/2 compatibility behavior, ALPN, TLS, upgrades, CONNECT, and the explicit external boundary for HTTP/3.',
        'Express automatically enables equivalent HTTP/1.1, HTTP/2, and HTTP/3 behavior on one listener.'
      ),
      outcome(
        'httpsts-close-idle-active-upgrades',
        'Separate server.close, closeIdleConnections, closeAllConnections, upgraded sockets, active responses, and forced shutdown.',
        'server.close immediately terminates every active request and upgraded connection.'
      ),
      outcome(
        'httpsts-protocol-transfer-evidence',
        'Require live TLS identity, proxy, slow-client, protocol negotiation, upgrade, drain, and packet-level evidence beyond deterministic browser models.',
        'A pure request-decision function proves listener and wire-protocol behavior.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  serverModule(
    'http-server-ts-express-routing-paths',
    'Express 5 Routing, Path Syntax, Parameters, and Dispatch',
    'An Express 4 route table is moved unchanged, wildcard values change shape, optional syntax breaks, route order shadows literals, and decoded parameters are trusted as identifiers.',
    'Express 5 route grammar and dispatch table',
    [
      outcome(
        'httpsts-express5-path-syntax',
        'Author Express 5.2 string paths with named wildcards, braces, reserved characters, and supported path-to-regexp syntax.',
        'Express 4 wildcard, question-mark, and unnamed capture syntax behaves unchanged in Express 5.'
      ),
      outcome(
        'httpsts-route-order-shadowing',
        'Derive dispatch from registration order, method, path, router mounting, next-route behavior, and literal-versus-parameter overlap.',
        'Express always selects the most specific matching route regardless of registration order.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'httpsts-params-decoding-validation',
        'Treat decoded string or wildcard-array parameters as untrusted input and validate identifier grammar, length, canonical form, and existence separately.',
        'A matched route parameter is a valid domain identifier because Express decoded it.'
      ),
      outcome(
        'httpsts-router-mount-base-original-url',
        'Reason about app, Router, mount paths, baseUrl, originalUrl, path, route, mergeParams, strict routing, and case sensitivity.',
        'req.url, req.originalUrl, req.path, and req.baseUrl are interchangeable inside mounted routers.'
      ),
      outcome(
        'httpsts-route-table-gate',
        'Enumerate literal, parameter, wildcard, HEAD, OPTIONS, 404, 405, encoded, and near-miss cases before accepting a route table.',
        'If each intended endpoint succeeds once, routing is complete and conflict free.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  serverModule(
    'http-server-ts-middleware-errors-architecture',
    'Express Middleware, Promise Errors, Dependencies, and Response Ownership',
    'Middleware runs in an unsafe order, async rejections are wrapped twice, error handlers use the wrong signature, dependencies are created per request, and multiple layers write responses.',
    'composed middleware, dependency, and error boundary',
    [
      outcome(
        'httpsts-middleware-order-short-circuit',
        'Compose request identity, trust, limits, parsing, authentication, authorization, application, error, and observation middleware in a defended order.',
        'Middleware functions commute, so reordering them cannot change security or response behavior.'
      ),
      outcome(
        'httpsts-express5-promise-errors',
        'Use Express 5 automatic Promise rejection forwarding while preserving causal error identity and avoiding duplicate next calls.',
        'Every async Express handler still requires a catch wrapper that calls next manually.'
      ),
      outcome(
        'httpsts-error-middleware-headers-sent',
        'Implement four-argument error middleware, normalized failure taxonomy, disclosure policy, and headersSent delegation without double writes.',
        'An error handler with three parameters is recognized from its TypeScript annotation as error middleware.'
      ),
      outcome(
        'httpsts-dependency-lifetime-injection',
        'Construct long-lived dependencies at startup and inject narrow capabilities without request-time pools, mutable service locators, or hidden globals.',
        'Creating a new database pool in every handler improves isolation and resource cleanup.'
      ),
      outcome(
        'httpsts-transport-domain-response-owner',
        'Separate transport parsing, domain decisions, persistence, external effects, and serialization while assigning exactly one response owner.',
        'A layered service requires many pass-through classes and lets any layer send the response.',
        'professional',
        'create'
      ),
    ]
  ),
  serverModule(
    'http-server-ts-runtime-validation-types',
    'Unknown Input, Zod 4 Validation, Domain Types, and Output Contracts',
    'The service casts req.body, accepts unknown keys, transforms before authorization, returns internal objects directly, and treats TypeScript inference as runtime proof.',
    'runtime schema and trusted domain boundary',
    [
      outcome(
        'httpsts-unknown-before-validation',
        'Model body, params, query, fields, configuration, token claims, database rows, and upstream data as unknown until runtime validation succeeds.',
        'Express generic parameters make an incoming JSON body satisfy the declared TypeScript interface.'
      ),
      outcome(
        'httpsts-zod4-strict-safeparse',
        'Use Zod 4 strict objects, safeParse, issue paths, bounds, unions, refinements, and error mapping without accepting undeclared properties.',
        'A successful JSON parse rejects unknown keys and proves all domain invariants.'
      ),
      outcome(
        'httpsts-normalization-authorization-order',
        'Order decoding, validation, canonicalization, authorization, and effect so normalization cannot change the resource or policy target after checks.',
        'Normalization is harmless presentation cleanup that can occur after authorization.'
      ),
      outcome(
        'httpsts-branded-domain-types',
        'Construct narrow branded identifiers and domain values only through validated factories while avoiding unsafe assertions and impossible-state widening.',
        'A branded intersection type validates a string automatically at runtime.'
      ),
      outcome(
        'httpsts-output-schema-minimization',
        'Map domain results through explicit response schemas that minimize fields, stabilize nullability, and detect accidental secret or internal-property disclosure.',
        'Returning a database row directly is safe when TypeScript knows its compile-time type.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  serverModule(
    'http-server-ts-request-authority-proxy',
    'Request Targets, Host Authority, Proxy Trust, and Client Identity',
    'An origin trusts arbitrary Host and X-Forwarded values, builds reset links from the request, rate-limits the proxy address, and logs raw URLs containing secrets.',
    'request authority and trusted-proxy decision record',
    [
      outcome(
        'httpsts-express-request-field-meaning',
        'Interpret method, url, originalUrl, path, protocol, secure, hostname, host, ip, ips, headers, route, params, query, body, and socket using server-side semantics.',
        'req.hostname, req.get host, req.ip, and socket.remoteAddress always describe the original client request.'
      ),
      outcome(
        'httpsts-host-port-allowlist',
        'Validate canonical host and port against configured authority before routing, link generation, cache keys, redirects, or tenant selection.',
        'A syntactically valid Host header is trustworthy because Node required it.'
      ),
      outcome(
        'httpsts-express-trust-proxy-function',
        'Configure trust proxy by explicit addresses or hop logic and derive client, protocol, and host only when every trusted hop overwrites forwarded fields.',
        'Setting trust proxy to true always reveals the real client securely.'
      ),
      outcome(
        'httpsts-forwarded-chain-traversal',
        'Traverse Forwarded or X-Forwarded chains from the trusted socket boundary and reject malformed, excessive, or topology-inconsistent claims.',
        'The leftmost X-Forwarded-For entry always identifies the user agent.'
      ),
      outcome(
        'httpsts-authority-redaction-evidence',
        'Record bounded route, request ID, trusted peer, and redacted target evidence without logging credentials, tokens, personal data, or unbounded query values.',
        'Logging originalUrl is safe because secrets appear only in authorization headers.',
        'professional',
        'create'
      ),
    ]
  ),
  serverModule(
    'http-server-ts-fields-representations-cache',
    'Fields, Negotiation, Compression, Validators, and Caching',
    'The service naïvely splits repeated fields, sniffs content, omits Vary, compresses secrets, caches personalized responses, and computes unstable validators.',
    'representation selection, compression, and cache contract',
    [
      outcome(
        'httpsts-field-multivalue-parsing',
        'Handle case-insensitive names, repeated lines, list grammar, whitespace, forbidden hop-by-hop fields, header size, and Node joining behavior by field semantics.',
        'A comma split over req.headers values correctly parses every repeated HTTP field.'
      ),
      outcome(
        'httpsts-content-type-accept-negotiation',
        'Validate Content-Type parameters and select an acceptable representation with quality, specificity, fallback, and 406 or 415 behavior.',
        'Content-Type and Accept describe the same side of an HTTP exchange.'
      ),
      outcome(
        'httpsts-compression-vary-secrets',
        'Negotiate content coding, emit correct Vary, bound decoded size, avoid secret-dependent compression, and preserve streaming backpressure.',
        'Compression changes only transfer size and therefore cannot affect security or caching.'
      ),
      outcome(
        'httpsts-etag-last-modified-preconditions',
        'Create stable strong or weak validators and apply read and write preconditions with correct precedence and representation scope.',
        'Hashing JSON.stringify of an arbitrary object always yields a stable strong validator.'
      ),
      outcome(
        'httpsts-cache-privacy-invalidation',
        'Define freshness, private versus shared storage, authorization interactions, stale behavior, invalidation, and CDN evidence for each route.',
        'Private data is safe whenever the response omits an explicit public directive.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  serverModule(
    'http-server-ts-bodies-webhooks-uploads',
    'Body Parsing, Raw Webhooks, Forms, Multipart Uploads, and Byte Limits',
    'Parsers accept decompression bombs, req.body is assumed present, raw webhook bytes are lost, multipart data is buffered without caps, and aborted uploads leak work.',
    'bounded body ownership and parser matrix',
    [
      outcome(
        'httpsts-express-json-limit-inflate-verify',
        'Configure express.json type, limit, inflate, strict, reviver, and verify behavior while treating req.body as undefined until parsing succeeds.',
        'Express always parses JSON and req.body is an object even before body middleware runs.'
      ),
      outcome(
        'httpsts-declared-decoded-byte-limits',
        'Enforce declared, compressed, decoded, field-count, nesting, and semantic-size budgets before expensive parsing or effects.',
        'A Content-Length limit bounds the decompressed body the application will allocate.'
      ),
      outcome(
        'httpsts-raw-webhook-byte-ownership',
        'Preserve exact raw bytes for signature verification while separating timestamp, replay, media type, decode, validation, and enqueue decisions.',
        'Parsing JSON and serializing it again produces the same bytes that a webhook provider signed.'
      ),
      outcome(
        'httpsts-urlencoded-multipart-files',
        'Bound URL-encoded parameters and stream multipart parts with filename, type, count, size, storage, scanning, cleanup, and path authority controls.',
        'A multipart filename supplied by the client is a safe local storage path.'
      ),
      outcome(
        'httpsts-body-abort-cleanup-evidence',
        'Stop reads and downstream work on abort, remove partial artifacts, record bounded causal evidence, and test slow, truncated, malformed, oversized, and changed bodies.',
        'When the client disconnects, Node automatically rolls back every application effect and removes temporary files.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  serverModule(
    'http-server-ts-responses-problems-streaming',
    'Response Commitment, Problem Details, Streaming, and Downloads',
    'Handlers write success before work completes, expose stack traces, send inconsistent problem objects, ignore stream backpressure, and assume errors can replace committed headers.',
    'single-owner response and bounded stream protocol',
    [
      outcome(
        'httpsts-response-commit-single-owner',
        'Choose status and fields before commitment, assign one response owner, return after terminal sends, and observe writableEnded, headersSent, finish, close, and error distinctly.',
        'A later res.status call replaces the status after headers or body bytes were sent.'
      ),
      outcome(
        'httpsts-rfc9457-problem-mapping',
        'Map stable internal failures to RFC 9457 types, status, title, detail, instance, extensions, localization, and disclosure policy.',
        'The human-readable problem detail is a stable machine error code and may include internal diagnostics.'
      ),
      outcome(
        'httpsts-json-null-bigint-serialization',
        'Control JSON nullability, undefined omission, BigInt, dates, non-finite numbers, property order, cycles, and serialization failure before commitment.',
        'Any valid TypeScript value can be passed to res.json without loss or runtime failure.'
      ),
      outcome(
        'httpsts-stream-backpressure-pipeline',
        'Use stream pipeline, write backpressure, bounded buffers, cancellation, error ownership, trailers, and finish-versus-close evidence for large responses.',
        'Calling response.write repeatedly cannot increase memory because Node streams always pause the producer automatically.'
      ),
      outcome(
        'httpsts-download-range-filename',
        'Serve downloads with authorized resource lookup, content disposition, safe filenames, media type, validators, ranges, HEAD parity, byte accounting, and abort cleanup.',
        'res.download makes any caller-supplied filesystem path and filename safe.',
        'professional',
        'create'
      ),
    ]
  ),
  serverModule(
    'http-server-ts-async-context-cancellation',
    'Async Context, Abort Signals, Deadlines, and Cleanup',
    'Request context is stored globally, promises continue after disconnect, timeouts race without cancellation, dependency budgets consume cleanup time, and rejected work becomes unhandled.',
    'request context, budget, cancellation, and cleanup ledger',
    [
      outcome(
        'httpsts-async-local-storage-scope',
        'Use AsyncLocalStorage run, enterWith limits, snapshot, name, and bounded request metadata without treating context as authorization.',
        'AsyncLocalStorage values are safe global mutable state and prove the current user is authorized.'
      ),
      outcome(
        'httpsts-abortsignal-timeout-any',
        'Compose client disconnect, service deadline, dependency timeout, and shutdown with AbortSignal.timeout and AbortSignal.any while preserving the first cause.',
        'Promise.race stops losing asynchronous work after one promise settles.'
      ),
      outcome(
        'httpsts-deadline-budget-allocation',
        'Allocate request time among queueing, dependencies, response, and cleanup with monotonic evidence and no negative or expanding child budgets.',
        'Every downstream operation should receive the full original request timeout.'
      ),
      outcome(
        'httpsts-resource-cleanup-finally',
        'Release clients, streams, files, locks, timers, listeners, and spans exactly once across success, rejection, abort, timeout, and shutdown.',
        'Garbage collection promptly closes every external resource when a promise is abandoned.'
      ),
      outcome(
        'httpsts-unhandled-rejection-policy',
        'Own background promise lifetimes, observe rejection and multiple-resolution failures, fail safely, and distinguish crash recovery from request error handling.',
        'A global unhandledRejection listener makes ignored promises safe to continue in production.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  serverModule(
    'http-server-ts-concurrency-backpressure-workers',
    'Concurrency Budgets, Backpressure, Rate Limits, and Worker Threads',
    'The service launches unbounded promises, blocks the event loop with CPU work, uses one global rate counter, buffers queues without rejection, and cannot explain overload recovery.',
    'admission, concurrency, queue, rate, and CPU-work budget',
    [
      outcome(
        'httpsts-event-loop-lag-blocking',
        'Distinguish asynchronous concurrency from parallelism and measure CPU blocking, synchronous I/O, long callbacks, and event-loop delay.',
        'An async function automatically moves CPU-intensive work off the event-loop thread.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'httpsts-admission-concurrency-queue',
        'Bound active requests, per-dependency concurrency, queue length, queue age, memory, rejection, Retry-After, and fairness separately.',
        'A larger in-memory queue always increases availability during traffic bursts.'
      ),
      outcome(
        'httpsts-rate-limit-identity-cost',
        'Apply rate and quota policies to trusted identities, tenant and operation cost, distributed storage, clock behavior, headers, exemptions, and failure mode.',
        'Rate limiting by req.ip alone fairly protects every API behind proxies.'
      ),
      outcome(
        'httpsts-worker-thread-transfer-pool',
        'Use worker threads for justified CPU work with bounded pools, structured clone or transfer ownership, cancellation, failure replacement, and shutdown.',
        'Creating one worker thread per request is the safest and fastest CPU isolation strategy.'
      ),
      outcome(
        'httpsts-overload-recovery-evidence',
        'Test saturation, noisy neighbors, dependency slowdown, queue shedding, readiness degradation, recovery time, and invariant preservation.',
        'Returning some 503 responses proves the service has a complete overload strategy.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  serverModule(
    'http-server-ts-postgres-pools-transactions',
    'node-postgres Pools, Queries, Transactions, and Failure Semantics',
    'Handlers create pools, transactions use pool.query across clients, SQL interpolates identifiers and values, clients leak on error, and ambiguous commits are blindly retried.',
    'bounded pg repository and transaction outcome contract',
    [
      outcome(
        'httpsts-pg-pool-lifecycle',
        'Create one bounded pg Pool per service role with connection, idle, acquisition, maximum-lifetime, error, statistics, readiness, and pool.end behavior.',
        'A new Pool per request maximizes isolation and automatically prevents connection leaks.'
      ),
      outcome(
        'httpsts-pg-parameterized-query',
        'Use parameterized values, allowlisted identifiers, explicit columns, row validation, cardinality checks, timeouts, and cancellation without SQL string concatenation.',
        'Template literals are safe SQL parameterization when values came through TypeScript types.'
      ),
      outcome(
        'httpsts-pg-client-release',
        'Acquire and release a client exactly once with finally while distinguishing acquisition, query, protocol, server, timeout, cancellation, and application failures.',
        'A client borrowed from Pool is automatically released when its promise settles.'
      ),
      outcome(
        'httpsts-pg-single-client-transaction',
        'Run BEGIN, all statements, COMMIT or ROLLBACK on one client with isolation, constraints, locking, retries, and domain invariant evidence.',
        'pool.query calls participate in one transaction after any client executes BEGIN.'
      ),
      outcome(
        'httpsts-pg-ambiguous-commit',
        'Classify known commit, known rollback, and unknown commit outcomes and reconcile by operation identity instead of replaying uncertain effects.',
        'A connection error during COMMIT proves the transaction rolled back and is safe to retry.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  serverModule(
    'http-server-ts-resource-apis-consistency',
    'Resource APIs, Idempotency, Concurrency, Pagination, and Consistency',
    'The API exposes table-shaped routes, replays writes by key without comparing content, uses offset pagination under mutation, and publishes events outside transaction consistency.',
    'consistent resource API and operation ledger',
    [
      outcome(
        'httpsts-resource-state-machine',
        'Model resource states, legal transitions, commands, representations, invariants, tombstones, and conflict outcomes independently of table layout.',
        'CRUD endpoints directly mirror database tables and therefore define a complete resource model.'
      ),
      outcome(
        'httpsts-idempotency-key-fingerprint',
        'Scope idempotency keys to principal and operation, compare canonical request fingerprints, store outcome atomically, expire deliberately, and reject mismatches.',
        'Any repeated idempotency key should return the first response even when the body or user changed.'
      ),
      outcome(
        'httpsts-optimistic-concurrency-etag',
        'Connect version columns, ETags, preconditions, atomic updates, affected-row checks, conflict disclosure, and safe retry behavior.',
        'Reading a version and later comparing it in application code prevents concurrent lost updates.'
      ),
      outcome(
        'httpsts-cursor-pagination-snapshot',
        'Design stable cursor ordering, tie breakers, direction, signed opaque cursors, filters, snapshot expectations, limits, and insert or delete behavior.',
        'Offset pagination returns stable non-duplicated pages while rows are inserted or removed.'
      ),
      outcome(
        'httpsts-outbox-consistency',
        'Persist state and an outbox fact atomically, publish with deduplication and ordering assumptions, and reconcile stuck or duplicate delivery.',
        'Publishing an event immediately after COMMIT makes state and message delivery atomic.',
        'professional',
        'create'
      ),
    ]
  ),
  serverModule(
    'http-server-ts-authentication-sessions-jose',
    'Authentication, Passwords, Sessions, Cookies, and JOSE',
    'The server stores weak password material, keeps session identifiers across privilege changes, decodes JWTs without validating them, accepts arbitrary algorithms, and treats possession as authorization.',
    'credential verification and principal-construction contract',
    [
      outcome(
        'httpsts-password-verifier-policy',
        'Apply modern password hashing, salt, work policy, input bounds, constant-behavior comparison, breach and reset controls, rehash migration, and secret separation.',
        'Hashing a password once with a fast general-purpose hash is sufficient secure storage.'
      ),
      outcome(
        'httpsts-session-id-rotation-store',
        'Generate opaque session identifiers, store server-side state, rotate at authentication and privilege changes, expire idle and absolute lifetime, revoke, and prevent fixation.',
        'A signed cookie containing all session data is automatically revocable and safe from fixation.'
      ),
      outcome(
        'httpsts-jose-jwt-verify-claims',
        'Use jose verification with explicit algorithms, trusted keys, issuer, audience, expiration, not-before, clock tolerance, token type, and bounded claim validation.',
        'Base64-decoding a JWT and checking its exp claim authenticates the token.'
      ),
      outcome(
        'httpsts-jwks-rotation-cache',
        'Bound JWKS retrieval, issuer mapping, cache lifetime, refresh, key rotation, key identifiers, algorithm confusion, stale behavior, and outage response.',
        'Fetching whatever jku or key URL a token names is a safe way to discover its verification key.'
      ),
      outcome(
        'httpsts-authentication-principal-audit',
        'Construct the smallest principal after full credential validation and record redacted success, failure class, rotation, revocation, and recovery evidence.',
        'An authenticated principal is authorized for every operation its token can name.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  serverModule(
    'http-server-ts-authorization-tenancy',
    'Authorization, Tenancy, Object, Function, and Property Policy',
    'Routes check a broad role but not object ownership, tenant filters are optional, update bodies bind protected fields, and denials leak which records exist.',
    'deny-by-default resource authorization decision',
    [
      outcome(
        'httpsts-authz-subject-resource-action',
        'Authorize a validated subject, resource, action, context, and requested properties at the resource boundary before effects.',
        'Authentication middleware plus a role string completes authorization for every route.'
      ),
      outcome(
        'httpsts-object-level-authorization',
        'Load only enough identity or policy data to enforce ownership and object access without trusting a user-selected identifier.',
        'An unpredictable UUID prevents users from accessing another user resource.'
      ),
      outcome(
        'httpsts-tenant-query-enforcement',
        'Derive tenant from the principal, carry it through repository interfaces, constrain every query and cache key, and test cross-tenant changed cases.',
        'Checking tenant in the route is sufficient even when repository methods accept arbitrary tenant identifiers.'
      ),
      outcome(
        'httpsts-property-function-policy',
        'Allowlist writable and readable properties and privileged functions so mass assignment, hidden fields, and broad serializers cannot bypass policy.',
        'Zod validation makes every declared request property safe for every authenticated user to update.'
      ),
      outcome(
        'httpsts-denial-disclosure-audit',
        'Choose 401, 403, or concealed 404 behavior consistently and preserve bounded decision evidence without leaking sensitive resource existence or policy internals.',
        'Every authorization denial should explain the complete policy failure to the caller.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  serverModule(
    'http-server-ts-browser-cors-csrf-cookies',
    'Browser Trust, CORS, CSRF, Cookies, and Security Headers',
    'A browser API reflects origins, combines credentials with wildcard sharing, treats CORS as access control, relies only on SameSite, and emits weak cookie and framing policy.',
    'browser request and response-sharing policy matrix',
    [
      outcome(
        'httpsts-cors-origin-method-fields',
        'Implement an exact origin allowlist, preflight method and field checks, credentials, exposed fields, Vary, cache duration, null origin policy, and failure behavior.',
        'Access-Control-Allow-Origin star can safely be combined with credentialed browser requests.'
      ),
      outcome(
        'httpsts-cors-not-authorization',
        'Separate browser response-sharing controls from server authentication, authorization, network clients, and cross-origin request sending.',
        'CORS blocks attackers from sending requests and therefore replaces authorization.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'httpsts-csrf-token-origin-fetch-metadata',
        'Protect cookie-authenticated mutations with safe-method semantics, tokens, trusted Origin or Referer, Fetch Metadata, and explicit exceptional-client handling.',
        'SameSite cookies eliminate every CSRF risk, including sibling-domain and legacy-client cases.'
      ),
      outcome(
        'httpsts-cookie-prefix-samesite',
        'Set Secure, HttpOnly, SameSite, Path, Domain, lifetime, host-only or prefix constraints, partitioning decisions, rotation, and deletion consistently.',
        'HttpOnly prevents a cookie from being sent in a forged cross-site request.'
      ),
      outcome(
        'httpsts-security-header-policy',
        'Deploy CSP, frame-ancestors, HSTS at the correct authority, MIME sniffing prevention, referrer policy, permissions policy, and cache controls with browser tests.',
        'Installing Helmet proves every browser security header is correct for every route.',
        'professional',
        'create'
      ),
    ]
  ),
  serverModule(
    'http-server-ts-webhooks-ssrf-abuse',
    'Webhooks, Replay Defense, SSRF, Unsafe Consumption, and Business Abuse',
    'A gateway parses before signature verification, accepts stale duplicates, follows arbitrary callback URLs, trusts upstream JSON, and protects expensive workflows only with request counts.',
    'signed ingress, bounded egress, and abuse decision model',
    [
      outcome(
        'httpsts-webhook-signature-freshness',
        'Verify provider identity, algorithm, exact bytes, timestamp freshness, constant-behavior signature comparison, key rotation, and failure disclosure before parsing.',
        'HTTPS proves a webhook body came from the expected provider and has not been replayed.'
      ),
      outcome(
        'httpsts-webhook-replay-enqueue',
        'Deduplicate stable delivery identifiers, persist acceptance atomically, return promptly, process asynchronously, and classify retryable provider responses.',
        'Returning 200 before durable enqueue guarantees the webhook will be processed exactly once.'
      ),
      outcome(
        'httpsts-ssrf-egress-destination',
        'Allowlist scheme and port, canonicalize host, resolve and revalidate every destination, block private or metadata ranges, control redirects, and enforce egress network policy.',
        'Rejecting localhost text in the submitted URL prevents SSRF.'
      ),
      outcome(
        'httpsts-unsafe-upstream-consumption',
        'Authenticate upstreams, bound redirects, time and bytes, validate response type and schema, sanitize content, minimize authority, and contain upstream failure.',
        'A successful response from a trusted vendor can be stored and rendered without validation.'
      ),
      outcome(
        'httpsts-business-flow-abuse',
        'Model automation-sensitive business operations with actor, cost, inventory, velocity, sequence, idempotency, anomaly, friction, appeal, and recovery evidence.',
        'A generic per-IP rate limit prevents every form of automated business-flow abuse.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  serverModule(
    'http-server-ts-proxy-framing-smuggling',
    'Reverse Proxies, Forwarded Fields, Framing, and Request Smuggling Defense',
    'The origin and proxy disagree about framing, forwarded fields are appended without trust, hop-by-hop fields cross boundaries, and parser tolerance is enabled to fix malformed clients.',
    'proxy hop, framing, and parser-consistency contract',
    [
      outcome(
        'httpsts-proxy-hop-by-hop-fields',
        'Strip and regenerate hop-by-hop fields per connection, control Host and authority, handle Connection-nominated fields, and document request and response rewriting.',
        'A reverse proxy may forward every incoming field unchanged because Node will normalize it.'
      ),
      outcome(
        'httpsts-forwarded-overwrite-topology',
        'Require trusted proxies to overwrite client-controlled Forwarded and X-Forwarded values and validate the observed hop count against every reachable topology.',
        'Appending the proxy address to any client-supplied forwarded chain makes the chain trustworthy.'
      ),
      outcome(
        'httpsts-message-framing-ambiguity',
        'Reject conflicting Content-Length, transfer-coding ambiguity, invalid field syntax, premature EOF, excess body, and front-end or origin disagreement.',
        'Node and the edge proxy necessarily parse every HTTP/1.1 message identically.'
      ),
      outcome(
        'httpsts-insecure-parser-smuggling',
        'Keep insecure parsing disabled, align parser and normalization policies across hops, test differential cases, and close connections on ambiguous messages.',
        'Setting insecureHTTPParser improves compatibility without affecting security boundaries.'
      ),
      outcome(
        'httpsts-proxy-drain-upgrade-evidence',
        'Test keep-alive reuse, upgrades, CONNECT, streaming, trailers, retries, draining, malformed requests, and changed proxy topology with wire evidence.',
        'One proxied health request proves the full proxy and origin contract.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  serverModule(
    'http-server-ts-testing-contracts-fuzz',
    'node:test, Supertest, Contracts, Properties, Fuzzing, and Fault Injection',
    'Tests call live dependencies, assert only status 200, share mutable state, never vary malformed inputs, and mistake mocks or coverage for behavioral proof.',
    'layered deterministic server verification matrix',
    [
      outcome(
        'httpsts-pure-domain-node-test',
        'Use node:test suites, subtests, assertions, fixtures, hooks, concurrency, timers, and cleanup to prove domain decisions independently of Express.',
        'A test framework automatically isolates mutable module state between concurrent tests.'
      ),
      outcome(
        'httpsts-supertest-handler-integration',
        'Exercise Express handlers with Supertest using exact methods, paths, fields, bodies, identity, effects, errors, and cleanup without unnecessary public listeners.',
        'One Supertest response status proves middleware order, persistence, and side effects.'
      ),
      outcome(
        'httpsts-contract-openapi-drift',
        'Verify runtime requests and responses against schemas and consumer cases while detecting undocumented statuses, fields, nullability, security, and behavioral drift.',
        'Generating an OpenAPI document from route annotations guarantees the running service conforms to it.'
      ),
      outcome(
        'httpsts-property-fuzz-parser',
        'Generate bounded valid and invalid values for parsers, routes, canonicalization, authorization, pagination, and idempotency while shrinking reproducible counterexamples.',
        'Random strings without stated invariants constitute complete fuzz testing.'
      ),
      outcome(
        'httpsts-fault-time-load-leak-gates',
        'Inject aborts, timeouts, pool exhaustion, ambiguous commits, proxy faults, slow streams, clock shifts, load, and resource leaks with invariant and recovery gates.',
        'High statement coverage and green mocks prove the server survives production faults.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  serverModule(
    'http-server-ts-observability-health',
    'Async Context, Logs, Metrics, Traces, Health, and Incident Evidence',
    'The service logs secrets and raw paths, labels metrics by identifiers, loses trace context, reports healthy during saturation, and cannot connect an alert to a user outcome.',
    'bounded telemetry and health evidence contract',
    [
      outcome(
        'httpsts-structured-log-redaction',
        'Emit structured events with timestamp, severity, stable event name, bounded route, request and trace correlation, outcome, latency, and field-level redaction.',
        'Logging the complete request object is the fastest safe way to diagnose production incidents.'
      ),
      outcome(
        'httpsts-low-cardinality-metrics',
        'Define request, error, duration, saturation, queue, pool, event-loop, process, and business metrics with bounded labels and histogram semantics.',
        'Using user ID and raw URL as metric labels makes dashboards more precise without cost.'
      ),
      outcome(
        'httpsts-otel-server-span-semantics',
        'Create OpenTelemetry server spans with stable route names, span kind, method, status, error, network, server, propagation, sampling, and sensitive-data policy.',
        'Every HTTP 4xx response should mark the server span as an internal server error.'
      ),
      outcome(
        'httpsts-liveness-readiness-startup',
        'Separate liveness, readiness, startup, dependency state, saturation, draining, and management endpoint protection without causing probe storms.',
        'A database ping returning successfully proves the service should receive new traffic.'
      ),
      outcome(
        'httpsts-slo-alert-incident',
        'Connect service-level indicators and objectives to multi-window alerts, deploy and trace evidence, bounded incident diagnosis, mitigation, recovery, and learning.',
        'An alert on average latency alone identifies both user impact and root cause.',
        'professional',
        'create'
      ),
    ]
  ),
  serverModule(
    'http-server-ts-performance-capacity',
    'Profiling, Event-Loop Health, Memory, Load, and Capacity',
    'A team optimizes microbenchmarks, measures only average latency, ignores coordinated omission and warmup, raises concurrency until throughput peaks, and has no resource or cost model.',
    'performance experiment and capacity envelope',
    [
      outcome(
        'httpsts-performance-hypothesis-budget',
        'Translate user latency and throughput outcomes into request-path budgets, resource hypotheses, experiment controls, and stop conditions before optimizing.',
        'Any code change that improves a microbenchmark improves end-to-end server performance.'
      ),
      outcome(
        'httpsts-cpu-memory-eventloop-profile',
        'Use CPU profiles, heap snapshots, allocation, garbage collection, event-loop delay, handles, and request traces to locate causal bottlenecks safely.',
        'High CPU usage proves JavaScript execution is the bottleneck.'
      ),
      outcome(
        'httpsts-load-model-percentiles',
        'Model arrival rate, concurrency, payload, endpoint mix, warmup, caches, connection reuse, percentiles, coordinated omission, errors, and saturation.',
        'Average latency and requests per second are sufficient to characterize a load test.'
      ),
      outcome(
        'httpsts-capacity-littles-law',
        'Relate arrival rate, concurrency, service time, queueing, utilization, memory, pool limits, instance count, cost, and headroom without treating estimates as guarantees.',
        'Doubling instances always doubles throughput and halves latency.'
      ),
      outcome(
        'httpsts-performance-regression-recovery',
        'Gate changed builds with noise-aware baselines, representative cases, resource ceilings, overload recovery, rollback thresholds, and retained profiles.',
        'One faster benchmark run proves a performance regression has been fixed.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  serverModule(
    'http-server-ts-openapi-release-recovery',
    'OpenAPI 3.2, Compatibility, Deployment, Draining, and Recovery',
    'Documentation differs from runtime, examples contain secrets, additive changes break strict clients, storage contracts before old revisions drain, and rollback cannot restore invariants.',
    'versioned API contract and production release defense',
    [
      outcome(
        'httpsts-openapi32-operation-schema',
        'Describe operations, parameters, request bodies, responses, schemas, security, callbacks, webhooks, examples, links, servers, and reusable components in OpenAPI 3.2.',
        'An OpenAPI schema is the same as a TypeScript type and a database schema.'
      ),
      outcome(
        'httpsts-contract-runtime-generation',
        'Choose a source of truth and gate generated clients, runtime validation, examples, operation IDs, security behavior, unknown fields, and spec-to-service drift.',
        'Generating either code or a document automatically keeps all other contracts synchronized.'
      ),
      outcome(
        'httpsts-api-compatibility-evolution',
        'Classify additive and breaking changes across fields, nullability, validation, ordering, status, errors, authentication, caching, timing, and business behavior.',
        'Adding an optional response field is non-breaking for every strict client and signature scheme.'
      ),
      outcome(
        'httpsts-expand-canary-drain-contract',
        'Build once, verify provenance and configuration, expand storage, stage readiness, canary, observe, stop admission, drain HTTP and background work, then contract safely.',
        'A green health check permits immediate full traffic and destructive schema contraction.'
      ),
      outcome(
        'httpsts-production-defense-recovery',
        'Defend outcomes, toolchain, semantics, Node and Express behavior, validation, limits, persistence, identity, policy, browser and proxy trust, tests, telemetry, capacity, compatibility, release, rollback, data recovery, and residual risk.',
        'A successful deployment and smoke request eliminate the need for rollback and recovery rehearsals.',
        'professional',
        'create'
      ),
    ]
  ),
];

export const httpServerTypescriptConfig = finalizeCourse(
  {
    id: 'http-servers-typescript',
    title: 'HTTP Servers in TypeScript: Node 24 and Express 5 Production APIs',
    version: '2026.07',
    audience: {
      description:
        'TypeScript developers who can build robust HTTP clients and relational data systems and now need production-grade Node and Express origin services.',
      entryKnowledge: [
        'Use strict TypeScript types, runtime narrowing, asynchronous control flow, modules, tests, and toolchain gates without unsafe assertions.',
        'Build and diagnose TypeScript HTTP clients with semantics, validation, cancellation, streaming, retries, observability, and trust boundaries.',
        'Design, query, transact, secure, and diagnose relational data with SQL, constraints, indexes, isolation, and parameterized operations.',
      ],
      deviceConstraints: [
        'Modern browser; learner TypeScript runs only in the isolated deterministic worker. Browser activities model pure server decisions without importing Node or Express, opening listeners, contacting networks or databases, reading host files, spawning workers, or using credentials.',
      ],
      accessibilityAssumptions: [
        'Request flows, middleware chains, route tables, schemas, traces, profiles, and dashboards include structured text equivalents, announced status, non-color meaning, and full keyboard operation.',
      ],
    },
    scope: {
      includes: [
        'Node 24.18 LTS, npm 12, TypeScript 7 native and TypeScript 6 compatibility toolchains, Node HTTP, Express 5.2.1, Zod 4.4, node-postgres 8.22, jose 6.2, HTTP semantics, routing, middleware, validation, bodies, streaming, async context, cancellation, concurrency, PostgreSQL, consistency, authentication, authorization, browser and proxy trust, webhooks, SSRF, smuggling defense, node:test, Supertest, fuzzing, OpenTelemetry 1.43, profiling, OpenAPI 3.2, deployment, draining, and recovery',
        'Runnable deterministic pure-TypeScript decision functions plus explicit Node, Express, listener, TLS, PostgreSQL, proxy, worker, load, and production transfer gates',
        'Five cumulative production service projects and a performance-based certification exam',
      ],
      excludes: [
        'Building an HTTP parser from raw TCP, which belongs in a protocol implementation course',
        'Browser execution of Node built-ins, Express, listeners, sockets, host processes, live databases, worker threads, credentials, third-party webhooks, proxy traffic, or untrusted generated code',
      ],
      nextCourses: ['pubsub-rabbitmq-typescript', 'file-servers-s3-typescript'],
    },
    sources: [
      {
        title: 'Node.js 24.18.0 Release and LTS Documentation',
        authority: 'official-docs',
        url: 'https://nodejs.org/en/blog/release/v24.18.0',
        version: 'Node.js 24.18.0 LTS; released 2026-06-23',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls the supported production runtime, current LTS patch, bundled npm baseline, security and compatibility assumptions.',
      },
      {
        title: 'Node.js 24 HTTP API',
        authority: 'official-docs',
        url: 'https://nodejs.org/docs/latest-v24.x/api/http.html',
        version: 'Node.js 24.18.0',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls messages, streams, headers, request and response behavior, server options, timeouts, close methods, upgrades, parsers, and connection lifecycle.',
      },
      {
        title: 'Node.js TypeScript Modules',
        authority: 'official-docs',
        url: 'https://nodejs.org/docs/latest-v24.x/api/typescript.html',
        version: 'Node.js 24.18.0 type stripping',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls erasable syntax, type stripping, transform-types limits, tsconfig behavior, module determination, and production guidance.',
      },
      {
        title: 'Node.js Async Context, Abort, Test, Streams, and Worker Threads',
        authority: 'official-docs',
        url: 'https://nodejs.org/docs/latest-v24.x/api/async_context.html',
        version: 'Node.js 24.18.0',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls AsyncLocalStorage, snapshot, request context, AbortSignal composition, node:test, stream cleanup, worker ownership, and transfer boundaries.',
      },
      {
        title: 'Express 5.2 API',
        authority: 'official-docs',
        url: 'https://expressjs.com/en/5x/api.html',
        version: 'Express 5.2.1',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls application, request, response, Router, middleware, body parsing, routing, trust proxy, errors, fields, and Express 5 behavior.',
      },
      {
        title: 'Express 5 Migration Guide',
        authority: 'official-docs',
        url: 'https://expressjs.com/en/guide/migrating-5.html',
        version: 'Express 5.2.1 migration behavior',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls path syntax, wildcard arrays, rejected promises, req.body, req.host, req.params, MIME types, Brotli parsing, and changed APIs.',
      },
      {
        title: 'TypeScript 7 Native Compiler and TypeScript 6 Compatibility API',
        authority: 'official-docs',
        url: 'https://devblogs.microsoft.com/typescript/',
        version: 'TypeScript 7.0.2 native CLI; TypeScript 6.0.2 compatibility API',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls the dual compiler strategy, native checking and emission, compatibility API boundary, strict types, and migration evidence.',
      },
      {
        title: 'Zod 4 Documentation',
        authority: 'official-docs',
        url: 'https://zod.dev/',
        version: 'Zod 4.4.3',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls runtime schemas, strict objects, safe parsing, errors, refinements, transforms, codecs, JSON Schema conversion, and type inference.',
      },
      {
        title: 'node-postgres Documentation',
        authority: 'official-docs',
        url: 'https://node-postgres.com/',
        version: 'node-postgres 8.22.0',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls Pool and Client lifecycle, parameterized queries, transactions on one client, timeouts, errors, types, and shutdown.',
      },
      {
        title: 'jose Documentation',
        authority: 'official-docs',
        url: 'https://github.com/panva/jose',
        version: 'jose 6.2.3',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls ESM JOSE support, JWT verification, claims, algorithm constraints, local and remote JWKS, key rotation, and runtime support.',
      },
      {
        title: 'HTTP Semantics',
        authority: 'standard',
        url: 'https://www.rfc-editor.org/rfc/rfc9110.html',
        version: 'RFC 9110',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls resources, methods, status, fields, conditional requests, negotiation, authentication semantics, intermediaries, and caching relationships.',
      },
      {
        title: 'HTTP/1.1 Message Syntax and Routing',
        authority: 'standard',
        url: 'https://www.rfc-editor.org/rfc/rfc9112.html',
        version: 'RFC 9112',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls request targets, Host, framing, connections, hop-by-hop fields, robustness, request smuggling, and response splitting.',
      },
      {
        title: 'HTTP Caching',
        authority: 'standard',
        url: 'https://www.rfc-editor.org/rfc/rfc9111.html',
        version: 'RFC 9111',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls freshness, private and shared caches, authorization, validators, Vary, invalidation, and cache privacy.',
      },
      {
        title: 'Problem Details for HTTP APIs',
        authority: 'standard',
        url: 'https://www.rfc-editor.org/rfc/rfc9457.html',
        version: 'RFC 9457',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls problem JSON, type, title, status, detail, instance, extensions, client use, localization, and disclosure.',
      },
      {
        title: 'OAuth 2.0 Security Best Current Practice',
        authority: 'standard',
        url: 'https://www.rfc-editor.org/rfc/rfc9700.html',
        version: 'RFC 9700 BCP 240',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls token replay, privilege restriction, clients, proxies, redirects, flows, and refresh-token security boundaries.',
      },
      {
        title: 'JSON Web Token',
        authority: 'standard',
        url: 'https://www.rfc-editor.org/rfc/rfc7519.html',
        version: 'RFC 7519',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls issuer, subject, audience, expiration, not-before, issued-at, ID, and claim-processing requirements.',
      },
      {
        title: 'OWASP API Security Top 10',
        authority: 'official-docs',
        url: 'https://owasp.org/API-Security/editions/2023/en/0x11-t10/',
        version: 'OWASP API Security Top 10 2023',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls object, authentication, property, resource, function, business-flow, SSRF, inventory, and unsafe-consumption threats.',
      },
      {
        title: 'OWASP REST Security Cheat Sheet',
        authority: 'official-docs',
        url: 'https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html',
        version: 'Current 2026-07',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls HTTPS, access control, JWT, keys, status, audit, input, methods, content types, secrets, and management endpoints.',
      },
      {
        title: 'PostgreSQL 18.4 Documentation',
        authority: 'official-docs',
        url: 'https://www.postgresql.org/docs/18/',
        version: 'PostgreSQL 18.4',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls transaction atomicity, isolation, constraints, extended-query binding, concurrency, indexes, migration, and recovery evidence.',
      },
      {
        title: 'OpenTelemetry HTTP Semantic Conventions',
        authority: 'official-docs',
        url: 'https://opentelemetry.io/docs/specs/semconv/http/http-spans/',
        version: 'Semantic conventions 1.43.0',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls HTTP server span names, kind, route, method, status, error, network, server, client, propagation, and cardinality.',
      },
      {
        title: 'OpenAPI Specification',
        authority: 'standard',
        url: 'https://spec.openapis.org/oas/v3.2.0.html',
        version: 'OpenAPI 3.2.0',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls API descriptions, operations, schemas, security, callbacks, webhooks, examples, references, sanitization, and interoperability.',
      },
    ],
    sharedRequirements: [
      'Every activity retrieves strict TypeScript, HTTP client, SQL, accessibility, security, cancellation, testing, and causal-evidence habits before adding one server boundary.',
      'Browser TypeScript is deterministic and isolated. It models request, middleware, policy, dependency, response, and cleanup decisions but never imports Node or Express, opens a listener, contacts a network or database, spawns a worker, executes host commands, reads host state, or handles real credentials.',
      'Passing work requires exact request and route inputs, trusted authority, type and runtime validation, resource budgets, response and durable-effect evidence, changed and failure cases, cleanup and recovery, and explicit full-stack transfer limits.',
    ],
    modules,
    projects: [
      project(
        'httpsts-node-express-service-core',
        'Reproducible Node and Express Civic Service Core',
        'http-server-ts-express-routing-paths',
        'A municipal incident-response team and public client developers',
        'They need an outcome-driven TypeScript service with a reproducible Node toolchain, explicit lifecycle, correct HTTP semantics, Node protocol limits, and an unambiguous Express 5 route table.',
        [
          'httpsts-outcome-evidence-contract',
          'httpsts-signal-drain-exit',
          'httpsts-semantics-retry-proof',
          'httpsts-server-timeout-budget',
          'httpsts-route-table-gate',
        ]
      ),
      project(
        'httpsts-bounded-streaming-api',
        'Validated and Bounded Streaming API',
        'http-server-ts-responses-problems-streaming',
        'A regional public-status and document operations team',
        'They need defended middleware, runtime validation, trusted authority, cache-safe representations, bounded bodies and uploads, useful problem responses, and cancellation-safe streaming.',
        [
          'httpsts-transport-domain-response-owner',
          'httpsts-output-schema-minimization',
          'httpsts-authority-redaction-evidence',
          'httpsts-body-abort-cleanup-evidence',
          'httpsts-stream-backpressure-pipeline',
        ]
      ),
      project(
        'httpsts-consistent-multitenant-api',
        'Consistent Multi-Tenant Case API',
        'http-server-ts-authorization-tenancy',
        'A nonprofit case-management organization',
        'It needs cancellation and overload budgets, safe PostgreSQL transactions, consistent resources and events, strong authentication, and deny-by-default object, tenant, property, and function authorization.',
        [
          'httpsts-deadline-budget-allocation',
          'httpsts-overload-recovery-evidence',
          'httpsts-pg-ambiguous-commit',
          'httpsts-outbox-consistency',
          'httpsts-denial-disclosure-audit',
        ]
      ),
      project(
        'httpsts-browser-webhook-gateway',
        'Browser-Safe Webhook and Proxy Gateway',
        'http-server-ts-proxy-framing-smuggling',
        'A payment and fulfillment integration team',
        'It needs exact CORS and CSRF policy, secure cookies and headers, signed replay-resistant webhooks, bounded egress, business-abuse controls, trusted forwarding, parser consistency, and drain evidence.',
        [
          'httpsts-csrf-token-origin-fetch-metadata',
          'httpsts-security-header-policy',
          'httpsts-webhook-replay-enqueue',
          'httpsts-ssrf-egress-destination',
          'httpsts-proxy-drain-upgrade-evidence',
        ]
      ),
      project(
        'httpsts-production-api-defense',
        'Production TypeScript API and Recovery Defense',
        'http-server-ts-openapi-release-recovery',
        'An engineering, security, accessibility, data, client, and operations review board',
        'The board needs layered tests, fault and load evidence, bounded telemetry and health, profiles and capacity, an accurate OpenAPI 3.2 contract, compatibility policy, safe migrations, canary and drain proof, rollback, data recovery, and a defended runbook.',
        [
          'httpsts-fault-time-load-leak-gates',
          'httpsts-slo-alert-incident',
          'httpsts-performance-regression-recovery',
          'httpsts-contract-runtime-generation',
          'httpsts-production-defense-recovery',
        ]
      ),
    ],
    examContext:
      'Unfamiliar Node 24, npm 12, TypeScript 7 and 6, HTTP semantics, Node HTTP, Express 5, middleware, validation, authority, caching, body, response, streaming, async context, cancellation, concurrency, workers, PostgreSQL, consistency, authentication, authorization, browser, webhook, SSRF, proxy, smuggling, testing, telemetry, performance, OpenAPI, compatibility, deployment, draining, and recovery cases requiring deterministic TypeScript evidence plus explicit full-stack transfer limits.',
    minimumQuestionBankSize: 750,
  },
  {
    researchedAt: RESEARCHED_AT,
    prerequisiteCourseIds: ['http-clients-typescript', 'sql-basics'],
  }
);

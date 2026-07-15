import { finalizeCourse, module, project, skill } from './course-config-helpers.mjs';

const REVIEWED_AT = '2026-07-14';
const RESEARCHED_AT = '2026-07-14T20:45:00.000Z';

function outcome(id, statement, misconception, knowledgeType = 'procedural', level = 'apply') {
  if (!misconception) throw new Error(`Missing misconception for Go HTTP server competency ${id}`);
  return skill(id, statement, misconception, knowledgeType, level);
}

function serverModule(id, title, context, artifact, skills) {
  return {
    ...module(id, title, context, artifact, skills),
    contexts: {
      theory: context,
      workshop: `A server pairing session predicts request, handler, dependency, response, and cleanup transitions before building the first ${artifact} for ${title.toLowerCase()}.`,
      debug: `An incident responder inherits a plausible but defective ${artifact}; retain the failing request and response, isolate the first causal server boundary, and keep a regression probe.`,
      lab: `An independent service team receives a different API, load, trust, persistence, and failure constraint and must transfer ${title.toLowerCase()} into a new ${artifact}.`,
      review: `A delayed operations handoff reconstructs ${title.toLowerCase()} from bounded request and server evidence, challenges one retained misconception, and revises the ${artifact}.`,
      quiz: `A production-readiness review compares near-miss decisions for ${title.toLowerCase()} and requires the smallest safe ${artifact} with changed-request evidence.`,
    },
  };
}

const modules = [
  serverModule(
    'http-server-go-outcomes-lifecycle',
    'Service Outcomes, Boundaries, and Server Lifecycle',
    'A civic incident API has endpoints but no stated user outcome, ownership boundary, startup contract, dependency readiness, shutdown policy, or evidence connecting a request to durable effect.',
    'service outcome, boundary, and lifecycle map',
    [
      outcome(
        'httpsgo-service-outcome-contract',
        'Define a server outcome with user, client, operator, security, and accessibility evidence instead of treating endpoint count as success.',
        'More routes and higher request throughput necessarily mean the service creates more user value.',
        'professional',
        'create'
      ),
      outcome(
        'httpsgo-client-server-intermediary-boundary',
        'Trace user agent, client, proxy, gateway, origin handler, dependency, and response roles without assigning one component evidence it cannot observe.',
        'The origin server receives the exact bytes, address, scheme, and authority originally sent by every client.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'httpsgo-process-listener-handler-state',
        'Distinguish process, listener, connection, stream, request, handler, goroutine, dependency, and durable-state lifetimes.',
        'One Go server process handles requests sequentially unless handlers explicitly start goroutines.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'httpsgo-startup-readiness-dependency',
        'Validate configuration, bind the intended listener, initialize dependencies, expose liveness separately from readiness, and fail startup atomically.',
        'Listening on a port proves the service and all required dependencies are ready.'
      ),
      outcome(
        'httpsgo-lifecycle-evidence-ownership',
        'Assign startup, request, dependency, shutdown, rollback, alert, and data-recovery evidence to named owners and done conditions.',
        'A 200 health response is a complete operational ownership and recovery plan.',
        'professional',
        'create'
      ),
    ]
  ),
  serverModule(
    'http-server-go-semantics-resources',
    'HTTP Semantics, Resources, Methods, and Status Contracts',
    'A task service uses POST for every action, mutates state on GET, returns 200 for rejected work, and retries duplicate writes without a resource or method contract.',
    'resource, method, status, and retry semantics table',
    [
      outcome(
        'httpsgo-resource-representation-state',
        'Separate resource identity, current server state, selected representation, transfer content, and backing storage model.',
        'A JSON object, database row, and HTTP resource are necessarily the same entity.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'httpsgo-method-safe-idempotent-cacheable',
        'Apply safe, idempotent, and cacheable method semantics independently and preserve them through handler behavior.',
        'PUT and DELETE are safe because repeated requests are expected to have the same intended effect.'
      ),
      outcome(
        'httpsgo-create-update-delete-status',
        'Choose status, Location, validators, and response content for create, replace, partial update, asynchronous work, and deletion.',
        'Every successful write should return 200 with the updated object.'
      ),
      outcome(
        'httpsgo-preconditions-conditional-methods',
        'Use If-Match, If-None-Match, dates, 304, 412, and 428 to prevent lost updates and unnecessary transfer.',
        'ETags are cache decorations and cannot protect a write against stale state.'
      ),
      outcome(
        'httpsgo-semantics-changed-request-proof',
        'Test method semantics against retries, duplicate delivery, stale validators, HEAD, OPTIONS, and changed resource state.',
        'One happy-path status assertion proves an endpoint obeys HTTP semantics.',
        'metacognitive',
        'evaluate'
      ),
    ]
  ),
  serverModule(
    'http-server-go-servemux-routing',
    'ServeMux Patterns, Precedence, Path Values, and Route Safety',
    'A Go 1.26 service mixes legacy prefix routes with method and wildcard patterns, conflicts at startup, misroutes escaped slashes, and assumes slash redirects still use a permanent status.',
    'validated ServeMux route and precedence table',
    [
      outcome(
        'httpsgo-pattern-method-host-path',
        'Author Go 1.26 ServeMux patterns with optional method, host, literal segments, single wildcards, remainder wildcards, and end markers.',
        'ServeMux patterns can match methods or paths but not a host and method together.'
      ),
      outcome(
        'httpsgo-pattern-precedence-conflict',
        'Derive most-specific precedence as request-set inclusion and detect conflicting patterns before startup.',
        'The last registered overlapping route always wins, so registration order resolves ambiguity.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'httpsgo-pathvalue-escaped-segments',
        'Use Request.PathValue while distinguishing segment unescaping, escaped slash data, raw query, cleaned paths, and invalid identifiers.',
        'PathValue always returns the exact percent-encoded bytes present in RequestURI.'
      ),
      outcome(
        'httpsgo-head-options-redirects',
        'Account for GET matching HEAD, method-specific 405 Allow responses, OPTIONS behavior, host routes, and Go 1.26 temporary slash redirects.',
        'A GET pattern rejects HEAD and trailing-slash redirects always use 301.'
      ),
      outcome(
        'httpsgo-route-registration-gate',
        'Compile route registration, recover only to report startup conflicts, enumerate method-path cases, and test near-miss patterns.',
        'If every intended path has a handler, the route table is complete and non-conflicting.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  serverModule(
    'http-server-go-handlers-middleware-architecture',
    'Handlers, Middleware, Dependencies, and Application Architecture',
    'Handlers construct database pools and loggers per request, middleware changes response order, mutable globals leak across tests, and business rules cannot run without HTTP fixtures.',
    'composed handler and dependency boundary',
    [
      outcome(
        'httpsgo-handler-interface-contract',
        'Use http.Handler and HandlerFunc as request-to-response boundaries while keeping response ownership and handler lifetime explicit.',
        'A handler returns a response value after ServeHTTP completes, like an ordinary function.'
      ),
      outcome(
        'httpsgo-middleware-order-shortcircuit',
        'Compose recovery, request ID, trust, authentication, authorization, limit, observation, and application middleware in a defended order.',
        'Middleware wrappers commute, so changing their order cannot change security or response behavior.'
      ),
      outcome(
        'httpsgo-dependency-injection-lifetime',
        'Construct long-lived immutable dependencies at startup and inject narrow interfaces without service locators or per-request pool creation.',
        'Creating dependencies inside each handler improves isolation and connection reuse.'
      ),
      outcome(
        'httpsgo-domain-transport-separation',
        'Separate transport parsing, domain decisions, persistence, serialization, and external effects so core rules are testable without HTTP.',
        'A layered architecture requires one package per technical noun and many pass-through interfaces.'
      ),
      outcome(
        'httpsgo-response-single-owner',
        'Guarantee one response owner, stop after terminal writes, preserve error identity internally, and prevent double status or body writes.',
        'Calling WriteHeader again replaces the earlier status when a downstream error occurs.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  serverModule(
    'http-server-go-request-target-host-proxy',
    'Request Targets, Host Authority, Client Identity, and Proxy Trust',
    'An origin accepts arbitrary Host values, constructs password-reset links from untrusted forwarded fields, rate-limits a proxy address, and logs raw targets containing secrets.',
    'request authority and trusted-proxy decision record',
    [
      outcome(
        'httpsgo-server-request-field-meaning',
        'Interpret Method, URL, Host, RequestURI, Header, Body, Trailer, RemoteAddr, TLS, Pattern, and Context using server-side semantics.',
        'Request.URL.Host always contains the authority used by an incoming origin-form request.'
      ),
      outcome(
        'httpsgo-host-allowlist-rebinding',
        'Validate authoritative host and port against a configured allowlist before routing, link construction, cache keys, or tenant selection.',
        'A syntactically valid Host header is trustworthy because net/http parsed it.'
      ),
      outcome(
        'httpsgo-forwarded-header-trust-chain',
        'Accept Forwarded or X-Forwarded values only from configured proxy hops and derive client, scheme, and host with a documented traversal rule.',
        'The leftmost X-Forwarded-For value always identifies the real client.'
      ),
      outcome(
        'httpsgo-query-target-canonicalization',
        'Parse query values, duplicate keys, empty values, encoding, canonicalization, and sensitive parameters without rebuilding ambiguous URLs.',
        'Calling URL.Query removes all ambiguity and preserves the original query byte-for-byte.'
      ),
      outcome(
        'httpsgo-request-identity-redaction',
        'Record low-cardinality route, request ID, trusted peer, and redacted target evidence without logging credentials, tokens, or personal data.',
        'Logging RequestURI is safe because authorization values appear only in headers.',
        'professional',
        'create'
      ),
    ]
  ),
  serverModule(
    'http-server-go-fields-representations-cache',
    'Header Fields, Representations, Negotiation, Validators, and Caching',
    'Clients send repeated and malformed media fields, the server sniffs content, omits Vary, caches personalized responses, and computes validators from unstable JSON ordering.',
    'representation selection and cache contract',
    [
      outcome(
        'httpsgo-header-multivalue-canonicalization',
        'Handle case-insensitive field names, repeated values, list syntax, hop-by-hop fields, size limits, and canonical map behavior without naïve splitting.',
        'Header.Get exposes every field value exactly as received and is sufficient for every repeated field.'
      ),
      outcome(
        'httpsgo-content-type-accept-negotiation',
        'Validate request Content-Type and parameters, select an acceptable response representation, and return 415 or 406 with a documented default.',
        'A JSON decoder proves the request media type is JSON and Accept can always be ignored.'
      ),
      outcome(
        'httpsgo-response-metadata-order',
        'Set Content-Type, Content-Length strategy, Location, validators, Cache-Control, Vary, security fields, and trailers before committing response headers.',
        'Headers can be changed after Write or WriteHeader and will update the transmitted response.'
      ),
      outcome(
        'httpsgo-etag-lastmodified-generation',
        'Generate stable strong or weak validators from the selected representation or resource version and apply comparison semantics correctly.',
        'A database update timestamp is automatically a strong validator for every negotiated representation.'
      ),
      outcome(
        'httpsgo-cache-privacy-vary',
        'Design shared and private caching, freshness, revalidation, no-store, stale behavior, invalidation, and Vary without exposing user-specific data.',
        'Cache-Control private prevents browsers from storing a response.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  serverModule(
    'http-server-go-bodies-json-uploads',
    'Bounded Bodies, JSON, Forms, Multipart Uploads, and Validation',
    'A create endpoint trusts Content-Length, decodes one JSON value but ignores trailing data, accepts unknown fields, buffers uploads in memory, and reports internal parser errors to clients.',
    'bounded request decoding and validation pipeline',
    [
      outcome(
        'httpsgo-maxbytesreader-contentlength',
        'Use MaxBytesReader and server limits to bound actual body reads independently of absent, false, compressed, or chunked Content-Length.',
        'Rejecting a large Content-Length guarantees the handler never reads excessive body bytes.'
      ),
      outcome(
        'httpsgo-json-single-value-unknown',
        'Decode exactly one JSON value, reject trailing content and unknown fields when the contract is closed, and distinguish syntax, type, and size failures.',
        'Decoder.Decode once proves the body contains exactly one valid contract object.'
      ),
      outcome(
        'httpsgo-validation-field-domain',
        'Separate transport shape validation from domain invariants, normalize only defined values, accumulate safe field errors, and preserve causality internally.',
        'Database constraint errors are the clearest client-facing field validation format.'
      ),
      outcome(
        'httpsgo-form-multipart-file-boundaries',
        'Bound URL-encoded and multipart parsing, memory and disk use, file count, part headers, filenames, content, temporary cleanup, and storage authority.',
        'ParseMultipartForm maxMemory caps the total request and prevents temporary disk use.'
      ),
      outcome(
        'httpsgo-body-close-drain-stream',
        'Understand server-owned body closure, early rejection, draining and connection reuse, trailers, compression expansion, and read-before-write compatibility.',
        'Handlers must always defer Request.Body.Close and fully drain attacker-controlled bodies.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  serverModule(
    'http-server-go-responses-problems-streams',
    'Responses, Problem Details, Streaming, and Protocol-Aware Output',
    'A service writes bodies before status and headers, exposes stack traces, treats cancellation as 500, flushes unbounded streams, and assumes optional ResponseWriter interfaces always exist.',
    'single-commit response and streaming contract',
    [
      outcome(
        'httpsgo-writeheader-implicit-commit',
        'Predict implicit 200, content sniffing, automatic length, one final status, informational responses, and header commitment order.',
        'Writing a JSON body before WriteHeader still allows the handler to send a later 422 status.'
      ),
      outcome(
        'httpsgo-problem-details-rfc9457',
        'Serialize RFC 9457 problem type, title, status, detail, instance, extensions, and application/problem+json without leaking implementation data.',
        'Problem detail should include stack traces and SQL errors so clients can debug the server.'
      ),
      outcome(
        'httpsgo-error-taxonomy-mapping',
        'Map validation, authentication, authorization, absence, conflict, precondition, limit, timeout, cancellation, dependency, and internal failures consistently.',
        'Every returned Go error should become status 500 because callers cannot safely distinguish it.'
      ),
      outcome(
        'httpsgo-responsecontroller-streaming',
        'Use ResponseController capability errors, flush, deadlines, full duplex, trailers, disconnects, heartbeats, and bounded producers deliberately.',
        'Type-asserting http.Flusher is portable through every middleware and protocol wrapper.'
      ),
      outcome(
        'httpsgo-stream-backpressure-cleanup',
        'Stop stream producers on context cancellation, bound queues and bytes, preserve partial-response evidence, and avoid goroutine or resource leaks.',
        'Once headers are sent, a streaming handler can report any later failure with a new HTTP status.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  serverModule(
    'http-server-go-context-deadlines-cleanup',
    'Request Context, Deadlines, Cancellation, and Cleanup',
    'A request starts database and outbound work with background contexts, ignores disconnects, exhausts its entire deadline before cleanup, and leaks goroutines after middleware returns.',
    'deadline budget and cancellation propagation trace',
    [
      outcome(
        'httpsgo-request-context-lifecycle',
        'Trace when an incoming request context is canceled and pass it through every request-scoped operation without storing it in long-lived structs.',
        'Request.Context remains valid until all goroutines started by the handler decide to finish.'
      ),
      outcome(
        'httpsgo-deadline-budget-allocation',
        'Allocate caller deadline across validation, database, outbound dependency, response, and cleanup reserves instead of stacking independent full timeouts.',
        'Giving each dependency the full request timeout keeps total latency within the request deadline.'
      ),
      outcome(
        'httpsgo-cancel-cause-classification',
        'Distinguish client cancellation, server deadline, dependency timeout, shutdown, overload, and internal failure for response and observability decisions.',
        'All context cancellation is a server error that should increment the 5xx failure rate.'
      ),
      outcome(
        'httpsgo-goroutine-result-channel-ownership',
        'Give every request goroutine a stop path, bounded result channel, single closer, retained error, and join or deliberate ownership transfer.',
        'A buffered result channel automatically prevents goroutine leaks after request cancellation.'
      ),
      outcome(
        'httpsgo-cleanup-compensation',
        'Reserve cleanup time, release rows and transactions, compensate partial external effects, and verify no work outlives its intended authority.',
        'Deferred cleanup always completes even after the request deadline expires.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  serverModule(
    'http-server-go-server-protocols-timeouts',
    'Server Configuration, HTTP/1.1, HTTP/2, TLS, and Graceful Shutdown',
    'A public server uses package defaults, has zero timeouts, trusts unlimited headers, enables cleartext HTTP/2 accidentally, serves weak TLS, and terminates active requests on deploy.',
    'explicit http.Server protocol and shutdown configuration',
    [
      outcome(
        'httpsgo-server-timeout-header-limits',
        'Configure ReadHeaderTimeout, body strategy, WriteTimeout, IdleTimeout, MaxHeaderBytes, and per-handler deadlines from threat and workload evidence.',
        'ReadTimeout alone safely handles every streaming upload and slow-client scenario.'
      ),
      outcome(
        'httpsgo-protocols-http1-http2-h2c',
        'Configure Server.Protocols for HTTP/1 and TLS HTTP/2, treat UnencryptedHTTP2 as explicit h2c authority, and name HTTP/3 as outside net/http server support.',
        'Go 1.26 net/http automatically serves HTTP/3 whenever HTTP/2 is enabled.'
      ),
      outcome(
        'httpsgo-http2-config-capacity',
        'Set HTTP2Config stream, frame, compression-table, flow-control, ping, write-byte, and error-count boundaries without confusing transport and server fields.',
        'StrictMaxConcurrentRequests limits concurrent streams accepted by an HTTP/2 Server.'
      ),
      outcome(
        'httpsgo-tls-listener-identity',
        'Configure TLS identity, versions, certificates, ALPN, rotation, proxy termination, redirects, and plaintext policy with end-to-end scheme evidence.',
        'TLS termination at any proxy proves the origin may trust every forwarded scheme and client field.'
      ),
      outcome(
        'httpsgo-shutdown-close-register',
        'Use Shutdown deadlines, readiness withdrawal, listener stop, in-flight drain, hijacked-connection handling, RegisterOnShutdown, Close fallback, and exit evidence.',
        'Server.Shutdown waits for hijacked connections and guarantees every cleanup callback has finished.',
        'professional',
        'create'
      ),
    ]
  ),
  serverModule(
    'http-server-go-concurrency-backpressure-limits',
    'Concurrency, Shared State, Backpressure, Rate Limits, and Load Shedding',
    'Concurrent handlers race on a map, launch unbounded goroutines, queue work after clients leave, share one global rate limit, and accept more expensive work than dependencies can sustain.',
    'concurrency budget and overload decision model',
    [
      outcome(
        'httpsgo-handler-concurrency-race',
        'Treat handlers as concurrent, protect shared state with ownership or synchronization, and verify with race tests under changed schedules.',
        'A map is safe in handlers when each request modifies a different key.'
      ),
      outcome(
        'httpsgo-concurrency-budget-semaphore',
        'Bound active expensive work with semaphores, worker pools, queue capacity, context-aware admission, fairness, and per-tenant partitions.',
        'Starting one goroutine per request is bounded because the server controls request concurrency automatically.'
      ),
      outcome(
        'httpsgo-rate-limit-identity-algorithm',
        'Choose trusted identity, token bucket or window semantics, burst, refill, distributed consistency, Retry-After, and bypass policy from abuse risk.',
        'Rate limiting solely by RemoteAddr gives fair per-user protection behind proxies and NAT.'
      ),
      outcome(
        'httpsgo-load-shed-priority',
        'Reject before expensive work when queue, dependency, memory, deadline, or priority budgets are exhausted and preserve recovery capacity.',
        'Accepting and timing out excess work is fairer and safer than early load shedding.'
      ),
      outcome(
        'httpsgo-overload-observability-recovery',
        'Measure active, queued, rejected, canceled, completed, saturated, and recovered work without high-cardinality labels and rehearse changed-load recovery.',
        'A low average latency proves the server has enough capacity during burst and tail conditions.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  serverModule(
    'http-server-go-sql-repositories-transactions',
    'SQL Repositories, Pools, Transactions, and Request Consistency',
    'Handlers open a new database handle per request, concatenate resource IDs, leak rows, perform multi-step writes outside transactions, and return before commit ambiguity is resolved.',
    'context-bound repository and transaction contract',
    [
      outcome(
        'httpsgo-db-handle-pool-lifecycle',
        'Treat sql.DB as a concurrent pool, open once, verify readiness, tune open and idle capacity and lifetime, observe Stats, and close at process shutdown.',
        'sql.Open creates and verifies one dedicated database connection for each handler.'
      ),
      outcome(
        'httpsgo-parameterized-query-row-close',
        'Use dialect parameters, QueryContext, Scan, rows Close and Err, bounded result sets, and error identity without constructing SQL from input.',
        'Escaping quote characters makes string-concatenated SQL equivalent to parameter binding.'
      ),
      outcome(
        'httpsgo-transaction-boundary-isolation',
        'Define atomic invariants, BeginTx with context and isolation, defer rollback, commit exactly once, and handle PostgreSQL Read Committed changes.',
        'A transaction makes every repeated SELECT observe one fixed snapshot under PostgreSQL defaults.'
      ),
      outcome(
        'httpsgo-http-db-error-mapping',
        'Map no rows, uniqueness, foreign key, serialization, deadline, cancellation, unavailable, and unknown failures without exposing schema internals.',
        'Every database error is either 404 or 500 and may be matched from its message text.'
      ),
      outcome(
        'httpsgo-request-commit-ambiguity',
        'Handle canceled requests and ambiguous commit results with idempotency, reconciliation, durable identifiers, and no claim unsupported by storage evidence.',
        'If the client disconnects before the response, the database transaction necessarily rolled back.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  serverModule(
    'http-server-go-resource-apis-consistency',
    'Resource APIs, Pagination, Idempotency, and Concurrency Control',
    'A list endpoint skips and duplicates rows during concurrent writes, create retries duplicate charges, PATCH silently overwrites fields, and response schemas expose storage columns.',
    'stable resource and mutation consistency contract',
    [
      outcome(
        'httpsgo-resource-schema-boundary',
        'Define stable transport schemas, domain models, persistence records, optional and null semantics, field ownership, and evolution boundaries separately.',
        'Reusing database structs as JSON responses keeps the API and storage safely synchronized.'
      ),
      outcome(
        'httpsgo-cursor-pagination-order',
        'Build opaque cursor pagination from a unique stable order, bound page size, preserve filters and authorization, and test inserts and deletes between pages.',
        'OFFSET pagination cannot skip or duplicate results when rows are inserted concurrently.'
      ),
      outcome(
        'httpsgo-idempotency-key-replay',
        'Scope and validate idempotency keys, bind request fingerprints, serialize first execution, persist terminal outcome, expire records, and reject mismatched replay.',
        'An Idempotency-Key header alone makes any handler idempotent without storage.'
      ),
      outcome(
        'httpsgo-optimistic-concurrency-version',
        'Use version fields or validators with conditional updates, distinguish absence from conflict, and return current-state recovery information safely.',
        'Last-write-wins is optimistic concurrency control because every update eventually succeeds.'
      ),
      outcome(
        'httpsgo-partial-update-field-authority',
        'Model PATCH semantics, missing versus explicit zero or null, immutable and server-owned fields, property authorization, atomic validation, and response evidence.',
        'Decoding PATCH into the full resource struct reliably distinguishes omitted fields from zero values.',
        'professional',
        'create'
      ),
    ]
  ),
  serverModule(
    'http-server-go-authentication-sessions-tokens',
    'Authentication, Sessions, Passwords, Bearer Tokens, and Credential Recovery',
    'A service invents password hashing, trusts JWT payloads before verification, accepts any algorithm and audience, stores long-lived bearer tokens in logs, and leaves sessions valid after recovery.',
    'authentication and credential lifecycle policy',
    [
      outcome(
        'httpsgo-authn-proof-principal-session',
        'Separate presented credential, verification, authenticated principal, session, assurance, freshness, and downstream authorization.',
        'Possession of any syntactically valid token proves the current user identity and permissions.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'httpsgo-password-storage-login-defense',
        'Use reviewed password hashing, bounded comparison, generic failures, rate and abuse controls, MFA or step-up policy, and secure recovery lifecycle.',
        'A fast general-purpose hash with a unique salt is ideal for password storage.'
      ),
      outcome(
        'httpsgo-cookie-session-security',
        'Issue opaque sessions with rotation, server-side state or revocation, Secure, HttpOnly, SameSite, Path, Domain, expiry, fixation defense, and logout invalidation.',
        'A signed cookie is encrypted and therefore safe for secrets and unrestricted personal data.'
      ),
      outcome(
        'httpsgo-jwt-validation-contract',
        'Pin allowed algorithms and keys; verify signature, type, issuer, audience, expiration, not-before, subject, token use, key rotation, and clock policy before claims.',
        'A decoded JWT with a future exp claim is authenticated even if issuer and audience are unchecked.'
      ),
      outcome(
        'httpsgo-oauth-resource-server-boundary',
        'Treat bearer access tokens as scoped resource-server credentials under RFC 6750 and BCP 9700 without implementing an authorization server casually.',
        'OAuth access tokens are login sessions and an API key is equivalent to user authentication.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  serverModule(
    'http-server-go-authorization-tenancy',
    'Authorization, Object Ownership, Properties, Functions, and Tenancy',
    'Authenticated users can enumerate another tenant’s records, mass-assign privileged fields, call admin actions through hidden routes, and infer denied objects from response differences.',
    'deny-by-default authorization decision matrix',
    [
      outcome(
        'httpsgo-authz-subject-action-resource',
        'Define subject, action, resource, tenant, properties, relationship, context, policy version, and decision evidence for every protected operation.',
        'A role string alone completely describes authorization for every resource instance.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'httpsgo-object-level-authorization',
        'Load or constrain the target within the authorized tenant and ownership relationship before read, write, delete, export, or nested access.',
        'Unpredictable UUIDs make object-level authorization checks optional.'
      ),
      outcome(
        'httpsgo-property-mass-assignment',
        'Allowlist readable and writable properties by operation and principal, reject server-owned fields, and prevent over-posting through explicit command types.',
        'JSON tags and omitempty prevent clients from setting privileged fields.'
      ),
      outcome(
        'httpsgo-function-policy-centralization',
        'Enforce function-level policy at a shared application boundary while retaining resource-specific checks and testing every route alias.',
        'Hiding admin links in the client prevents ordinary users from invoking admin handlers.'
      ),
      outcome(
        'httpsgo-denial-disclosure-audit',
        'Choose 401, 403, or concealed 404 consistently, limit side channels, record privacy-safe decision evidence, and test cross-tenant changed cases.',
        'Returning 404 for every denial removes all authorization side channels and audit needs.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  serverModule(
    'http-server-go-browser-cors-csrf-cookies',
    'Browser Origins, CORS, CSRF, Cookies, and Security Fields',
    'A browser API reflects arbitrary Origin with credentials, mutates state on GET, accepts ambient cookies cross-site, caches preflight incorrectly, and treats CORS as server authorization.',
    'browser request trust and cross-origin policy',
    [
      outcome(
        'httpsgo-origin-site-cors-boundary',
        'Distinguish origin, site, same-origin policy, CORS read permission, preflight, credentials, and server authorization.',
        'CORS blocks non-browser clients and therefore protects an API from unauthorized writes.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'httpsgo-cors-allowlist-preflight',
        'Validate exact origins, methods, requested headers, credential mode, exposed headers, max age, Vary, null origin, and rejection behavior.',
        'Reflecting Origin is safe whenever Access-Control-Allow-Credentials is false.'
      ),
      outcome(
        'httpsgo-csrf-crossoriginprotection',
        'Use safe-method invariants, Go CrossOriginProtection, Sec-Fetch-Site and Origin policy, tokens when needed, and narrowly reviewed bypasses.',
        'SameSite cookies alone prevent every cross-site request forgery and browser edge case.'
      ),
      outcome(
        'httpsgo-cookie-prefix-samesite',
        'Select host-only scope, __Host or __Secure prefixes, Secure, HttpOnly, SameSite, Partitioned, expiry, and rotation for the intended browser flow.',
        'HttpOnly prevents a browser from sending the cookie in a cross-site request.'
      ),
      outcome(
        'httpsgo-browser-security-headers',
        'Set content-type protection, framing, referrer, transport, content security, permissions, and cache policy according to whether responses are API data or HTML.',
        'Security headers are interchangeable boilerplate and stricter values cannot break required browser flows.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  serverModule(
    'http-server-go-webhooks-abuse-ssrf',
    'Webhooks, Replay Defense, SSRF, Abuse, and Sensitive Business Flows',
    'A webhook parses JSON before verifying raw bytes, accepts replay forever, fetches callback URLs from users, retries non-idempotent work, and rate-limits requests but not expensive business actions.',
    'webhook authenticity, replay, and abuse defense',
    [
      outcome(
        'httpsgo-webhook-raw-signature',
        'Bound and retain exact raw body bytes, select expected signature scheme and key, compare in constant time, and only then parse and authorize the event.',
        'Re-encoding decoded JSON produces the same bytes and is safe for webhook signature verification.'
      ),
      outcome(
        'httpsgo-webhook-replay-ordering',
        'Validate timestamp or nonce window, event ID uniqueness, tenant, type, ordering, duplicate delivery, and durable processing state before effects.',
        'A valid signature proves a webhook event is new and has not already been processed.'
      ),
      outcome(
        'httpsgo-webhook-ack-async-retry',
        'Acknowledge only after durable acceptance, move long work to bounded processing, classify retries, make effects idempotent, and expose operator recovery.',
        'Returning 2xx before recording the event is safe because the provider can always retry.'
      ),
      outcome(
        'httpsgo-server-ssrf-egress',
        'Treat server-side URLs, redirects, DNS results, IP ranges, schemes, ports, credentials, and response size as egress policy enforced on every hop.',
        'Validating the input hostname once prevents redirects and DNS rebinding from reaching private services.'
      ),
      outcome(
        'httpsgo-business-flow-abuse',
        'Bound costly domain actions by principal, resource, workflow state, velocity, inventory, and anomaly evidence beyond raw request rate.',
        'A generic requests-per-minute limit prevents scraping, scalping, spam, and workflow automation abuse.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  serverModule(
    'http-server-go-reverse-proxy-smuggling',
    'Reverse Proxies, Forwarded Trust, Message Framing, and Smuggling Defense',
    'A gateway preserves client Forwarded fields, uses deprecated ReverseProxy.Director, disagrees with an upstream about malformed framing, forwards hop-by-hop fields, and constructs unsafe backend queries.',
    'proxy rewrite and parser-consistency threat model',
    [
      outcome(
        'httpsgo-proxy-hop-origin-model',
        'Trace downstream and upstream connections, hop-by-hop versus end-to-end fields, termination points, authority, scheme, client address, and failure ownership.',
        'A reverse proxy makes one transparent end-to-end HTTP connection from client to origin.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'httpsgo-reverseproxy-rewrite-director',
        'Use ReverseProxy.Rewrite with separate inbound and outbound requests, SetURL and reviewed SetXForwarded behavior, and reject deprecated Director trust assumptions.',
        'Director is equivalent to Rewrite and remains safe when it adds an authentication header.'
      ),
      outcome(
        'httpsgo-forwarded-strip-rebuild',
        'Strip untrusted forwarding fields, rebuild them only at trusted hops, constrain backend targets, remove hop-by-hop state, and prevent header spoofing.',
        'Appending a trusted proxy value to client-supplied X-Forwarded-For makes the entire chain trustworthy.'
      ),
      outcome(
        'httpsgo-framing-smuggling-consistency',
        'Prevent request smuggling by rejecting ambiguous Content-Length and Transfer-Encoding, malformed whitespace, conflicting parsers, oversized fields, and unsafe downgrade paths per RFC 9112.',
        'Because Go parses the front-end request safely, every downstream proxy and application will interpret it identically.'
      ),
      outcome(
        'httpsgo-proxy-query-response-defense',
        'Handle unparsable query parameters, backend timeouts, bounded bodies, ModifyResponse, ErrorHandler, streaming, Alt-Svc, and sanitized failure evidence.',
        'Copying RawQuery always preserves intent and cannot create a parser differential with the backend.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  serverModule(
    'http-server-go-testing-fuzz-race',
    'Handler Tests, Live-Protocol Tests, Fuzzing, Race Detection, and Contracts',
    'Tests call handler functions directly, inspect ResponseRecorder fields incorrectly, omit middleware and cancellation, never use TLS or concurrency, and assert only one status code.',
    'layered deterministic server test system',
    [
      outcome(
        'httpsgo-httptest-request-recorder',
        'Use httptest.NewRequestWithContext, NewRecorder, Result, headers, body limits, route values, and table cases while naming recorder limitations.',
        'ResponseRecorder.Code always contains the implicit 200 even when a handler writes nothing.'
      ),
      outcome(
        'httpsgo-httptest-server-tls-client',
        'Use NewServer or NewTLSServer for routing, middleware, redirects, cookies, protocol, streaming, and client-server integration with deterministic cleanup.',
        'A ResponseRecorder test proves listener, TLS, connection, flush, and full middleware behavior.'
      ),
      outcome(
        'httpsgo-handler-contract-changed-cases',
        'Test accepted, invalid, absent, unauthorized, forbidden, stale, duplicate, oversized, canceled, timed-out, dependency-failed, and changed-schema cases.',
        'High line coverage proves the handler contract and error mapping are correct.'
      ),
      outcome(
        'httpsgo-fuzz-parser-router-invariants',
        'Fuzz bounded request targets, headers, JSON, cursors, signatures, and policy inputs with invariants, seed corpus, reproducibility, and no live authority.',
        'A fuzz test is useful only if it discovers a crash rather than a semantic invariant violation.'
      ),
      outcome(
        'httpsgo-race-leak-load-test',
        'Run race detection, concurrency schedules, leak checks, load profiles, resource limits, and failure injection while separating correctness from capacity claims.',
        'Passing go test -race proves production has no races, deadlocks, leaks, or overload failures.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  serverModule(
    'http-server-go-observability-health-performance',
    'Structured Observability, Health, Profiling, Capacity, and Incidents',
    'Logs contain tokens and raw paths, metrics use user IDs, traces mark every 404 as a server error, readiness ignores database saturation, and a p50 benchmark drives release.',
    'low-cardinality service evidence and incident dashboard',
    [
      outcome(
        'httpsgo-slog-request-record',
        'Emit one structured request completion record with request and trace IDs, method, route pattern, status, duration, bytes, trusted peer class, and redaction.',
        'Logging the raw URL and all request headers is the most useful production diagnostic record.'
      ),
      outcome(
        'httpsgo-http-metrics-cardinality',
        'Measure duration distributions, active requests, request and response bytes, status classes, cancellations, rejects, saturation, and dependencies with bounded attributes.',
        'Using resource ID as a metric label makes endpoint latency easier to diagnose safely.'
      ),
      outcome(
        'httpsgo-otel-server-spans',
        'Apply current OpenTelemetry server span kind, low-cardinality route, method, status, error.type, network and server attributes, propagation, sampling, and 4xx semantics.',
        'Every HTTP 4xx response should set a server span status of Error.'
      ),
      outcome(
        'httpsgo-health-live-ready-startup',
        'Separate liveness, readiness, startup, dependency, drain, and deep diagnostics; bound their cost; and prevent sensitive disclosure.',
        'Liveness should fail whenever a downstream database is briefly unavailable so the process restarts.'
      ),
      outcome(
        'httpsgo-profile-capacity-incident',
        'Use benchmarks, pprof in a protected plane, traces, saturation, tail latency, allocation, contention, load shape, and changed-fault evidence for capacity and incidents.',
        'A lower microbenchmark nanoseconds-per-operation proves the deployed server can handle more user traffic.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  serverModule(
    'http-server-go-contracts-versioning-release',
    'OpenAPI 3.2, Compatibility, Deployment, and Production Defense',
    'An undocumented API changes nullable fields, serves stale generated docs, deploys a new binary before migrations, drains no traffic, and cannot tie an incident response to source or schema.',
    'versioned API contract and production release defense',
    [
      outcome(
        'httpsgo-openapi32-contract',
        'Describe OpenAPI 3.2 operations, servers, parameters, request bodies, responses, problems, schemas, security, callbacks, and webhooks with tool limits.',
        'Generated OpenAPI is automatically complete and correct when every route appears once.'
      ),
      outcome(
        'httpsgo-contract-runtime-drift',
        'Compare specification, route registration, transport types, validators, examples, tests, auth policy, and observed responses to detect bidirectional drift.',
        'Schema validation alone proves handler semantics, authorization, and side effects match documentation.'
      ),
      outcome(
        'httpsgo-api-compatibility-evolution',
        'Classify additive and breaking changes across fields, nullability, validation, status, errors, ordering, auth, caching, and behavior; then plan deprecation and migration.',
        'Adding an optional response field is always non-breaking for every client and signature scheme.'
      ),
      outcome(
        'httpsgo-deploy-migrate-drain-rollback',
        'Build once, verify artifact and config, expand storage safely, stage readiness, canary, observe, drain with Shutdown, contract storage, and rollback by invariant.',
        'If the new binary starts and health is green, schema contraction and full traffic are safe immediately.'
      ),
      outcome(
        'httpsgo-production-server-defense',
        'Defend outcomes, semantics, routes, architecture, limits, persistence, identity, policy, browser and proxy trust, tests, observability, capacity, documentation, release, recovery, and residual risk.',
        'A green deployment and passing smoke request complete production readiness and eliminate the need for rollback drills.',
        'professional',
        'create'
      ),
    ]
  ),
];

export const httpServerGoConfig = finalizeCourse(
  {
    id: 'http-servers-go',
    title: 'HTTP Servers in Go 1.26: Secure Production APIs',
    version: '2026.07',
    audience: {
      description:
        'Go developers who can build robust clients and relational data systems and now need production-grade origin services and HTTP APIs.',
      entryKnowledge: [
        'Build, test, secure, observe, and troubleshoot Go 1.26 HTTP clients with protocol semantics, context, streaming, retries, and trust boundaries.',
        'Design, query, transact, secure, and diagnose relational data with SQL, keys, constraints, indexes, isolation, and parameterized operations.',
      ],
      deviceConstraints: [
        'Modern browser; learner Go runs only in the isolated deterministic Go worker. Browser tasks model handlers and server decisions without opening listeners, contacting networks or databases, reading host files, or using credentials.',
      ],
      accessibilityAssumptions: [
        'Request flows, middleware chains, route tables, API schemas, traces, and dashboards include structured text equivalents and keyboard-operable evidence.',
      ],
    },
    scope: {
      includes: [
        'Go 1.26.5 net/http service lifecycle, semantics, ServeMux, handlers, middleware, request and response boundaries, body limits, streaming, context, Server protocols and timeouts, concurrency, PostgreSQL-backed repositories, consistency, authentication, authorization, CORS and CSRF, webhooks, SSRF, reverse proxies, smuggling defense, tests, fuzzing, race detection, observability, health, OpenAPI 3.2, compatibility, deployment, and recovery',
        'Runnable deterministic pure-Go decision models plus explicit compile, race, listener, TLS, PostgreSQL, proxy, load, and production transfer gates',
        'Five cumulative production service projects and a performance-based certification exam',
      ],
      excludes: [
        'Building an HTTP parser from raw TCP, which belongs in HTTP Protocol in Go',
        'Browser execution of listeners, sockets, host processes, live databases, credentials, third-party webhooks, proxy traffic, or untrusted historical and generated code',
      ],
      nextCourses: ['http-protocol-go', 'pubsub-rabbitmq-go', 'file-servers-s3-go'],
    },
    sources: [
      {
        title: 'Go 1.26.5 Release History and Notes',
        authority: 'official-docs',
        url: 'https://go.dev/doc/devel/release',
        version: 'Go 1.26.5 released 2026-07-07',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls current supported toolchain, net/http fixes, ServeMux 307 redirects, HTTP2 additions, httptest changes, and ReverseProxy deprecation.',
      },
      {
        title: 'Go 1.26.5 net/http Package',
        authority: 'official-docs',
        url: 'https://pkg.go.dev/net/http@go1.26.5',
        version: 'Go 1.26.5',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls handlers, requests, responses, ServeMux, Server, protocols, HTTP2Config, body limits, CrossOriginProtection, cookies, files, and response control.',
      },
      {
        title: 'Go 1.26.5 httptest and httputil Packages',
        authority: 'official-docs',
        url: 'https://pkg.go.dev/net/http/httptest@go1.26.5',
        version: 'Go 1.26.5',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls deterministic handler and live test servers, recorders, request fixtures, reverse proxy rewriting, forwarding, response handling, and deprecated Director behavior.',
      },
      {
        title: 'Go database/sql Package',
        authority: 'official-docs',
        url: 'https://pkg.go.dev/database/sql@go1.26.5',
        version: 'Go 1.26.5',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls database handle pools, context-aware queries, rows, transactions, isolation, errors, statistics, and lifecycle.',
      },
      {
        title: 'HTTP Semantics',
        authority: 'standard',
        url: 'https://www.rfc-editor.org/rfc/rfc9110.html',
        version: 'RFC 9110',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls resources, methods, status codes, fields, conditional requests, content negotiation, authentication semantics, intermediaries, and caching relationships.',
      },
      {
        title: 'HTTP/1.1 Message Syntax and Routing',
        authority: 'standard',
        url: 'https://www.rfc-editor.org/rfc/rfc9112.html',
        version: 'RFC 9112',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls request targets, message framing, Host, connections, hop-by-hop behavior, robustness limits, request smuggling, and response splitting.',
      },
      {
        title: 'HTTP Caching',
        authority: 'standard',
        url: 'https://www.rfc-editor.org/rfc/rfc9111.html',
        version: 'RFC 9111',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls freshness, shared and private caches, validators, Vary, invalidation, and cache privacy.',
      },
      {
        title: 'Problem Details for HTTP APIs',
        authority: 'standard',
        url: 'https://www.rfc-editor.org/rfc/rfc9457.html',
        version: 'RFC 9457',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls problem JSON media type, core members, extensions, status consistency, client usability, and disclosure risks.',
      },
      {
        title: 'OAuth 2.0 Security Best Current Practice',
        authority: 'standard',
        url: 'https://www.rfc-editor.org/rfc/rfc9700.html',
        version: 'RFC 9700 BCP 240',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls current token replay, privilege restriction, proxy, redirect, flow, client, and refresh-token security boundaries.',
      },
      {
        title: 'JSON Web Token',
        authority: 'standard',
        url: 'https://www.rfc-editor.org/rfc/rfc7519.html',
        version: 'RFC 7519',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls issuer, subject, audience, expiration, not-before, issued-at, ID, and token processing claims.',
      },
      {
        title: 'OWASP API Security Top 10',
        authority: 'official-docs',
        url: 'https://owasp.org/API-Security/editions/2023/en/0x11-t10/',
        version: 'OWASP API Security Top 10 2023',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls object, authentication, property, resource, function, business-flow, SSRF, inventory, and unsafe-consumption threat coverage.',
      },
      {
        title: 'OWASP REST Security Cheat Sheet',
        authority: 'official-docs',
        url: 'https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html',
        version: 'Current 2026-07',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls HTTPS, access control, JWT, API keys, status codes, audit, input, methods, content types, secrets, and management endpoints.',
      },
      {
        title: 'PostgreSQL 18.4 Documentation',
        authority: 'official-docs',
        url: 'https://www.postgresql.org/docs/18/',
        version: 'PostgreSQL 18.4',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls transaction atomicity, Read Committed behavior, constraints, extended-query binding, concurrency, indexes, migration, and operational evidence.',
      },
      {
        title: 'OpenTelemetry HTTP Semantic Conventions',
        authority: 'official-docs',
        url: 'https://opentelemetry.io/docs/specs/semconv/http/http-spans/',
        version: 'Semantic conventions 1.43.0',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls HTTP server span names, kind, route, method, status, error, network, server, client, cardinality, and 4xx or 5xx recording behavior.',
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
      {
        title: 'Security Best Practices for Go Developers',
        authority: 'official-docs',
        url: 'https://go.dev/doc/security/best-practices',
        version: 'Current 2026-07',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls supported versions, vulnerability scanning, fuzzing, race detection, vetting, and security update practice.',
      },
    ],
    sharedRequirements: [
      'Every activity retrieves Go, HTTP client, SQL, accessibility, security, context, testing, and evidence habits before adding one server boundary.',
      'Browser Go is deterministic and isolated. It models request, handler, dependency, response, and cleanup decisions but never opens a listener, contacts a network or database, executes host commands, reads host state, or handles real credentials.',
      'Passing work requires exact request and route inputs, authority and resource limits, response and effect evidence, changed and failure cases, cleanup and recovery, and explicit full-toolchain transfer limits.',
    ],
    modules,
    projects: [
      project(
        'httpsgo-routed-service-core',
        'Routed and Bounded Civic Service Core',
        'http-server-go-request-target-host-proxy',
        'A municipal incident-response team and public client developers',
        'They need an outcome-driven Go service with explicit lifecycle, HTTP semantics, conflict-free ServeMux routes, composed handlers, trusted host and proxy rules, redacted evidence, and accessible API behavior.',
        [
          'httpsgo-service-outcome-contract',
          'httpsgo-semantics-changed-request-proof',
          'httpsgo-route-registration-gate',
          'httpsgo-response-single-owner',
          'httpsgo-request-identity-redaction',
        ]
      ),
      project(
        'httpsgo-resilient-protocol-server',
        'Resilient Protocol and Streaming Server',
        'http-server-go-server-protocols-timeouts',
        'A regional live-status operations team',
        'They need bounded JSON and upload handling, correct problem responses, cancellation-safe streaming, explicit HTTP/1 and HTTP/2 configuration, TLS identity, timeouts, and graceful deploy behavior.',
        [
          'httpsgo-maxbytesreader-contentlength',
          'httpsgo-problem-details-rfc9457',
          'httpsgo-stream-backpressure-cleanup',
          'httpsgo-deadline-budget-allocation',
          'httpsgo-shutdown-close-register',
        ]
      ),
      project(
        'httpsgo-consistent-multitenant-api',
        'Consistent Multi-Tenant Work API',
        'http-server-go-authorization-tenancy',
        'A nonprofit case-management organization',
        'It needs concurrency and overload controls, PostgreSQL transaction consistency, stable pagination and idempotency, secure sessions and token validation, and deny-by-default tenant, object, property, and function authorization.',
        [
          'httpsgo-overload-observability-recovery',
          'httpsgo-request-commit-ambiguity',
          'httpsgo-idempotency-key-replay',
          'httpsgo-jwt-validation-contract',
          'httpsgo-denial-disclosure-audit',
        ]
      ),
      project(
        'httpsgo-trusted-webhook-gateway',
        'Browser-Safe Webhook and Reverse Proxy Gateway',
        'http-server-go-reverse-proxy-smuggling',
        'A payment and fulfillment integration team',
        'It needs exact CORS and CSRF behavior, secure cookies, signed replay-resistant webhooks, bounded egress, abuse protection, trusted forwarding, Rewrite-based proxying, and parser-consistency defense.',
        [
          'httpsgo-csrf-crossoriginprotection',
          'httpsgo-webhook-raw-signature',
          'httpsgo-server-ssrf-egress',
          'httpsgo-reverseproxy-rewrite-director',
          'httpsgo-framing-smuggling-consistency',
        ]
      ),
      project(
        'httpsgo-production-api-defense',
        'Production Go API and Incident Defense',
        'http-server-go-contracts-versioning-release',
        'An engineering, security, accessibility, data, client, and operations review board',
        'The board needs layered test and fuzz evidence, race and load gates, observable health and incidents, an accurate OpenAPI 3.2 contract, compatibility policy, safe migrations, canary and drain evidence, rollback, and a defended production runbook.',
        [
          'httpsgo-race-leak-load-test',
          'httpsgo-otel-server-spans',
          'httpsgo-profile-capacity-incident',
          'httpsgo-contract-runtime-drift',
          'httpsgo-production-server-defense',
        ]
      ),
    ],
    examContext:
      'Unfamiliar Go 1.26 server lifecycle, HTTP semantics, ServeMux, handler, request, representation, body, response, streaming, context, protocol, concurrency, PostgreSQL, consistency, authentication, authorization, browser, webhook, SSRF, proxy, smuggling, testing, observability, OpenAPI, compatibility, deployment, and incident cases requiring deterministic code evidence plus explicit listener, network, database, proxy, and production transfer limits.',
    minimumQuestionBankSize: 650,
  },
  { researchedAt: RESEARCHED_AT, prerequisiteCourseIds: ['http-clients-go', 'sql-basics'] }
);

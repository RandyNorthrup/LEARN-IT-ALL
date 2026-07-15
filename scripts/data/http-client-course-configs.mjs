import { finalizeCourse, module, project, skill } from './course-config-helpers.mjs';

const REVIEWED_AT = '2026-07-14';
const RESEARCHED_AT = '2026-07-14T16:30:00.000Z';

const definitions = [
  {
    id: 'semantics-evidence',
    title: 'HTTP Semantics, Roles, Representations, and Layered Evidence',
    artifact: 'protocol evidence map',
    skills: [
      [
        'client-server-roles',
        'Distinguish client, server, user agent, origin, intermediary, gateway, proxy, and cache roles per exchange.',
        'A program has one permanent client-or-server identity.',
        'conceptual',
        'explain',
      ],
      [
        'resources-representations',
        'Separate a resource from the selected representation and its metadata, content, and current validity.',
        'An HTTP response transfers the resource itself rather than a representation.',
      ],
      [
        'message-lifecycle',
        'Trace request construction, routing, transport, intermediary handling, response interpretation, and cleanup as distinct stages.',
        'One status line reveals every network and application stage that occurred.',
        'procedural',
        'analyze',
      ],
      [
        'stateless-application-state',
        'Explain protocol statelessness while locating cookies, tokens, caches, and workflow state outside core request semantics.',
        'Stateless HTTP prevents an application from maintaining sessions.',
        'conceptual',
        'analyze',
      ],
      [
        'layered-failure-evidence',
        'Classify name resolution, connection, TLS, protocol, status, representation, and business failures without collapsing them.',
        'Every failed operation should be reported as an HTTP status error.',
        'metacognitive',
        'evaluate',
      ],
    ],
  },
  {
    id: 'uris-origins-dns',
    title: 'URIs, URL Resolution, Origins, DNS, and Destination Identity',
    artifact: 'destination-resolution and origin contract',
    skills: [
      [
        'uri-components-resolution',
        'Parse scheme, authority, host, port, path, query, and fragment and resolve relative references against the correct base.',
        'String concatenation is a correct general URL-resolution algorithm.',
      ],
      [
        'percent-encoding-query',
        'Encode path segments and query names or values at the correct structural layer without double encoding.',
        'Spaces and slashes use the same encoding rule everywhere in a URI.',
      ],
      [
        'origin-authority-host',
        'Compare origins from scheme, host, and effective port while separating URI authority, Host, and connection address.',
        'Matching host text alone proves two URLs have the same origin.',
        'conceptual',
        'analyze',
      ],
      [
        'dns-address-port',
        'Trace a hostname through DNS answers, address selection, route, port, connection, and certificate identity.',
        'A successful DNS lookup proves the intended service is reachable and trusted.',
        'procedural',
        'analyze',
      ],
      [
        'destination-validation',
        'Canonicalize and validate schemes, hosts, IP literals, ports, IDNs, and resolved destinations before granting network authority.',
        'A regular expression over the original URL text is sufficient destination security.',
        'professional',
        'evaluate',
      ],
    ],
  },
  {
    id: 'requests-methods',
    title: 'Request Construction, Method Semantics, Safety, and Idempotency',
    artifact: 'method-aware request builder',
    skills: [
      [
        'request-components',
        'Construct a request with an intentional method, target, fields, body, context, and caller-owned policy.',
        'A convenience GET or POST helper is sufficient for every request contract.',
      ],
      [
        'safe-idempotent-methods',
        'Distinguish safe and idempotent method semantics from what one particular server happens to do.',
        'All read-looking requests are safe and all repeated requests are idempotent.',
        'conceptual',
        'analyze',
      ],
      [
        'get-head-retrieval',
        'Use GET and HEAD with conditional, range, cache, and body expectations that preserve their defined semantics.',
        'HEAD is implemented correctly by downloading a GET body and discarding it.',
      ],
      [
        'write-method-contracts',
        'Choose POST, PUT, PATCH, or DELETE from resource, replacement, partial-change, and repeat behavior.',
        'PUT means update, POST means create, and DELETE guarantees physical deletion.',
        'strategic',
        'evaluate',
      ],
      [
        'preconditions-concurrency',
        'Apply If-Match, If-None-Match, and related preconditions to prevent lost updates and duplicate effects.',
        'A client-side timestamp check prevents concurrent write conflicts.',
        'procedural',
        'apply',
      ],
    ],
  },
  {
    id: 'fields-representations',
    title: 'Header Fields, Media Types, Negotiation, JSON, and Runtime Validation',
    artifact: 'representation negotiation and validation boundary',
    skills: [
      [
        'field-semantics',
        'Handle field names, repeated lines, combination rules, whitespace, size, and hop-by-hop boundaries by specification.',
        'HTTP header fields are an ordinary case-sensitive string dictionary.',
        'conceptual',
        'analyze',
      ],
      [
        'content-type-accept',
        'Use Content-Type for enclosed content and Accept for preferred response media ranges with explicit fallback.',
        'Accept and Content-Type describe the same side of an exchange.',
      ],
      [
        'content-codings-length',
        'Distinguish representation content coding, message delimitation, content length, and decoded size.',
        'Content-Length always equals the number of decoded bytes the application receives.',
        'conceptual',
        'analyze',
      ],
      [
        'json-boundary-validation',
        'Serialize intentional JSON and validate unknown decoded values before admitting them to trusted domain types.',
        'Successful JSON parsing proves the payload matches the application schema.',
        'procedural',
        'apply',
      ],
      [
        'language-charset-negotiation',
        'Interpret charset and language metadata, negotiation quality values, and Unicode boundaries without locale guesses.',
        'JSON, text, bytes, Unicode code points, and user-perceived characters are interchangeable.',
        'professional',
        'evaluate',
      ],
    ],
  },
  {
    id: 'responses-errors',
    title: 'Response Status, Success Variants, Failure Taxonomy, and Problem Details',
    artifact: 'typed response and failure classifier',
    skills: [
      [
        'status-families',
        'Interpret informational, successful, redirection, client-error, and server-error status codes as protocol metadata.',
        'Only status 200 represents a successful HTTP operation.',
        'conceptual',
        'analyze',
      ],
      [
        'success-variants',
        'Handle 201, 202, 204, 206, and other success responses with their location, body, and completion implications.',
        'Every successful status contains a complete JSON response body.',
      ],
      [
        'transport-status-domain-errors',
        'Separate request construction, transport, status, representation, and domain failures in a stable client contract.',
        'A non-2xx response is the same kind of error as a failed TCP connection.',
        'strategic',
        'evaluate',
      ],
      [
        'problem-details',
        'Parse RFC 9457 problem details by type and extensions without scraping human-readable title or detail text.',
        'The detail string is a stable machine-readable error code.',
      ],
      [
        'partial-and-ambiguous-outcomes',
        'Represent partial results and unknown write outcomes so callers do not silently retry or declare success.',
        'A timeout proves the server did not perform the requested operation.',
        'metacognitive',
        'evaluate',
      ],
    ],
  },
  {
    id: 'body-streams-limits',
    title: 'One-Shot Bodies, Streaming, Uploads, Decompression, and Resource Limits',
    artifact: 'bounded streaming body pipeline',
    skills: [
      [
        'one-shot-body-ownership',
        'Treat request and response bodies as owned one-shot streams with explicit read, close, replay, and cleanup rules.',
        'A body can always be reread after parsing without buffering or reconstruction.',
      ],
      [
        'bounded-response-reads',
        'Limit compressed and decoded response reads before allocation, parsing, logging, or persistence.',
        'A Content-Length check alone bounds every response body.',
        'professional',
        'apply',
      ],
      [
        'streaming-uploads',
        'Stream large uploads with known ownership, backpressure, progress, cancellation, and retryability.',
        'Streaming an upload automatically makes it resumable and safe to retry.',
      ],
      [
        'message-delimitation-trailers',
        'Reason about known lengths, HTTP/1.1 chunked delimitation, end of stream, and trailers without exposing framing details as semantics.',
        'Chunked transfer encoding is an application-level compression format.',
        'conceptual',
        'analyze',
      ],
      [
        'decompression-expansion',
        'Defend against decompression bombs, oversized structured values, deep nesting, and unbounded field counts.',
        'A small compressed response is necessarily cheap and safe to decode.',
        'professional',
        'evaluate',
      ],
    ],
  },
  {
    id: 'tls-trust',
    title: 'HTTPS, TLS Identity, Certificate Trust, Proxies, and Downgrade Boundaries',
    artifact: 'transport trust and certificate evidence record',
    skills: [
      [
        'https-identity',
        'Bind HTTPS authority to the requested host, certificate identity, authenticated transport, and application expectation.',
        'Encryption without authenticated identity is sufficient HTTPS trust.',
        'conceptual',
        'analyze',
      ],
      [
        'certificate-validation',
        'Preserve hostname, chain, validity, algorithm, and revocation-policy checks without disabling verification.',
        'Skipping certificate verification is acceptable when payloads are not secret.',
        'professional',
        'evaluate',
      ],
      [
        'trust-roots-private-ca',
        'Add an intended private trust root or test certificate without replacing or weakening unrelated trust.',
        'A self-signed certificate must be accepted globally to reach an internal service.',
      ],
      [
        'proxy-mtls-boundaries',
        'Model forward proxies, CONNECT tunnels, TLS interception, and mutual TLS credentials as separate authority boundaries.',
        'A proxy URL and a client certificate grant equivalent authority.',
        'strategic',
        'analyze',
      ],
      [
        'downgrade-mixed-content',
        'Reject unintended HTTP downgrades, insecure redirects, mixed content, and credential forwarding across weaker channels.',
        'A final HTTPS URL makes an earlier plaintext hop harmless.',
        'professional',
        'evaluate',
      ],
    ],
  },
  {
    id: 'redirects-policy',
    title: 'Redirect Semantics, Method Rewriting, Credential Scope, and Loop Control',
    artifact: 'auditable redirect policy engine',
    skills: [
      [
        'redirect-status-semantics',
        'Differentiate 301, 302, 303, 307, and 308 cache, permanence, method, and body consequences.',
        'All redirect status codes preserve the original method and body.',
        'conceptual',
        'analyze',
      ],
      [
        'relative-location-resolution',
        'Resolve Location references against the current request URL and validate the resulting destination each hop.',
        'A relative Location value is always same-origin and therefore safe.',
      ],
      [
        'redirect-loop-budget',
        'Bound redirect hops, detect loops, retain the chain, and expose the policy decision to callers.',
        'A library default prevents every redirect loop and resource-exhaustion case.',
      ],
      [
        'sensitive-field-forwarding',
        'Strip or deliberately reissue authorization, cookies, origin-sensitive fields, and bodies when authority changes.',
        'Authorization headers may follow any redirect when TLS remains enabled.',
        'professional',
        'evaluate',
      ],
      [
        'manual-redirect-defense',
        'Choose automatic, manual, or rejected redirects from method replay, SSRF, credential, audit, and user-consent risk.',
        'Following redirects is transport plumbing with no application or security semantics.',
        'strategic',
        'evaluate',
      ],
    ],
  },
  {
    id: 'cookies-auth-secrets',
    title: 'Cookies, Credential Modes, API Keys, Bearer Tokens, and Secret Hygiene',
    artifact: 'least-authority credential and session policy',
    skills: [
      [
        'cookie-jar-scope',
        'Apply cookie domain, host-only, path, expiry, Secure, HttpOnly, and SameSite scope through a deliberate jar policy.',
        'A cookie Path attribute is an authorization boundary between applications.',
      ],
      [
        'ambient-authority-csrf',
        'Recognize ambient cookie authority and require CSRF defenses for state-changing browser requests.',
        'Same-origin reads prevent cross-site requests from exercising cookie authority.',
        'conceptual',
        'analyze',
      ],
      [
        'api-key-placement',
        'Place API keys in approved headers or signing inputs and exclude them from URLs, source, telemetry, and error text.',
        'HTTPS makes query-string API keys safe to log and share.',
        'professional',
        'apply',
      ],
      [
        'bearer-token-scope',
        'Acquire, attach, scope, refresh, expire, and revoke bearer tokens without treating possession as identity proof.',
        'A bearer token can be safely forwarded to any service that returns 401.',
      ],
      [
        'credential-provider-design',
        'Inject short-lived credentials through a testable provider with rotation, concurrency, redaction, and failure policy.',
        'Reading one global token at startup is a complete credential lifecycle.',
        'strategic',
        'evaluate',
      ],
    ],
  },
  {
    id: 'caching-validation',
    title: 'HTTP Caching, Freshness, Validators, Vary, and Invalidation',
    artifact: 'spec-aware cache decision notebook',
    skills: [
      [
        'private-shared-cache',
        'Distinguish private, shared, gateway, browser, and application caches plus who may reuse stored responses.',
        'Cache-Control private prevents every form of local response storage.',
        'conceptual',
        'analyze',
      ],
      [
        'freshness-age',
        'Compute freshness from explicit directives, dates, age, and response context rather than wall-clock intuition.',
        'A cached response is valid until its local file timestamp becomes old.',
      ],
      [
        'validators-conditional-requests',
        'Use ETag and Last-Modified validators with If-None-Match or If-Modified-Since and interpret 304 correctly.',
        'A 304 response is an empty successful representation that replaces cached metadata.',
      ],
      [
        'vary-cache-key',
        'Construct cache keys that respect method, target URI, Vary fields, authorization policy, and representation selection.',
        'The request URL alone is a sufficient cache key for every GET response.',
        'professional',
        'evaluate',
      ],
      [
        'stale-revalidation-invalidation',
        'Choose revalidation, stale serving, explicit invalidation, or bypass while preserving correctness during failure.',
        'Deleting a local entry guarantees every intermediary stops serving stale content.',
        'strategic',
        'evaluate',
      ],
    ],
  },
  {
    id: 'timeouts-cancellation',
    title: 'Timeout Layers, Deadlines, Cancellation, Cleanup, and Budget Allocation',
    artifact: 'end-to-end request budget and cancellation model',
    skills: [
      [
        'timeout-layers',
        'Separate name resolution, connect, TLS, response-header, body-read, idle, and whole-operation timeout controls.',
        'One socket timeout bounds the entire HTTP operation.',
        'conceptual',
        'analyze',
      ],
      [
        'caller-deadline-propagation',
        'Propagate caller cancellation and deadlines through request creation, helpers, parsing, retries, and downstream work.',
        'A helper may replace the caller deadline with its own longer timeout.',
      ],
      [
        'phase-budget-allocation',
        'Allocate an end-to-end latency budget across attempts and phases while preserving time for cleanup and fallback.',
        'Each retry may consume the original full timeout without affecting the caller budget.',
        'strategic',
        'evaluate',
      ],
      [
        'cancellation-cleanup',
        'Stop body processing, producers, timers, and queued work after cancellation and release every owned resource.',
        'Canceling the visible request automatically stops every spawned task and stream.',
        'procedural',
        'apply',
      ],
      [
        'timeout-classification',
        'Report which phase and policy ended an operation without exposing secrets or claiming the remote effect is known.',
        'All timeout errors are safely retryable and prove no server-side effect.',
        'metacognitive',
        'evaluate',
      ],
    ],
  },
  {
    id: 'retries-backoff',
    title: 'Retry Safety, Replayability, Backoff, Jitter, and Retry Budgets',
    artifact: 'bounded retry and replay decision engine',
    skills: [
      [
        'retryable-classification',
        'Classify retry candidates from operation semantics, failure phase, response status, caller budget, and server guidance.',
        'Every 5xx response and network error should be retried.',
        'strategic',
        'evaluate',
      ],
      [
        'body-replayability',
        'Prove request bodies and credential state can be reconstructed before replaying an attempt.',
        'An in-memory body value means every request body is automatically replayable.',
      ],
      [
        'backoff-jitter',
        'Apply capped exponential backoff with an explicit jitter strategy and deterministic test clock.',
        'Identical exponential delays across clients reduce overload fastest.',
        'procedural',
        'apply',
      ],
      [
        'retry-after-rate-status',
        'Interpret Retry-After for 429 or 503, bound unreasonable values, and reconcile it with the caller deadline.',
        'Retry-After always contains a small integer number of milliseconds.',
      ],
      [
        'retry-budget-amplification',
        'Limit total attempts across nested callers and prevent retry storms, duplicate effects, and load amplification.',
        'Each service layer may retry independently because retries are local implementation details.',
        'professional',
        'evaluate',
      ],
    ],
  },
  {
    id: 'connections-protocols',
    title: 'Connection Reuse, Pools, HTTP/1.1, HTTP/2, HTTP/3, and Concurrency',
    artifact: 'connection lifecycle and concurrency plan',
    skills: [
      [
        'client-reuse-pooling',
        'Reuse configured clients and connection pools while separating per-request state from long-lived transport state.',
        'Creating a fresh client per request guarantees isolation with no performance cost.',
      ],
      [
        'http1-persistence',
        'Explain persistent HTTP/1.1 connections, body completion, idle reuse, pipelining limits, and close behavior.',
        'Calling close on a response always closes the underlying TCP connection.',
        'conceptual',
        'analyze',
      ],
      [
        'http2-multiplexing',
        'Model HTTP/2 streams, field compression, flow control, concurrency limits, and connection-level failure.',
        'HTTP/2 removes every head-of-line and overload risk.',
        'conceptual',
        'analyze',
      ],
      [
        'http3-quic',
        'Explain HTTP/3 over QUIC, independent streams, connection migration, negotiation, fallback, and observability limits.',
        'HTTP/3 changes method, status, caching, and representation semantics.',
        'conceptual',
        'explain',
      ],
      [
        'concurrency-saturation',
        'Bound concurrent requests, queued work, connections, streams, memory, and downstream pressure from measured capacity.',
        'Launching one task per item maximizes throughput without affecting reliability.',
        'professional',
        'evaluate',
      ],
    ],
  },
  {
    id: 'api-traversal-rates',
    title: 'Pagination, Filtering, Links, Rate Limits, Versioning, and Resumable Work',
    artifact: 'resumable rate-aware API traversal',
    skills: [
      [
        'pagination-models',
        'Traverse offset, page-number, cursor, and link pagination while detecting repeats, gaps, and termination.',
        'Incrementing a page number until an empty array is universally correct pagination.',
      ],
      [
        'query-filter-encoding',
        'Encode repeated parameters, arrays, dates, sorting, and filters according to the API contract without manual concatenation.',
        'Every API interprets repeated query keys and comma-separated values identically.',
      ],
      [
        'rate-limit-coordination',
        'Coordinate server guidance, local quotas, concurrency, backoff, and caller priorities without synchronized bursts.',
        'Sleeping after 429 is sufficient rate-limit coordination for concurrent workers.',
        'strategic',
        'evaluate',
      ],
      [
        'links-versioning-discovery',
        'Follow documented links and version boundaries while preventing untrusted relation targets from expanding authority.',
        'A version number in the path is the only meaningful API compatibility contract.',
      ],
      [
        'checkpoint-resume-deduplication',
        'Checkpoint traversal state, persist stable identities, resume after failure, and deduplicate without losing changed records.',
        'Writing each page immediately makes a long import exactly-once and resumable.',
        'professional',
        'evaluate',
      ],
    ],
  },
  {
    id: 'client-architecture',
    title: 'Reusable Client Architecture, Transport Abstractions, Middleware, and Configuration',
    artifact: 'small composable client library boundary',
    skills: [
      [
        'client-configuration',
        'Centralize base authority, transport, timeout, user agent, credentials, limits, and defaults in an explicit client configuration.',
        'Scattered call-site defaults are easier to reason about than one client policy.',
      ],
      [
        'transport-abstraction',
        'Inject the narrow request execution capability needed for deterministic tests without cloning the whole HTTP library.',
        'A useful test seam requires a mock interface for every HTTP type.',
        'strategic',
        'apply',
      ],
      [
        'middleware-ordering',
        'Compose authentication, retries, metrics, tracing, caching, and redaction with documented ordering and ownership.',
        'HTTP client middleware order never changes behavior.',
        'procedural',
        'analyze',
      ],
      [
        'typed-operation-contracts',
        'Expose small operation methods with typed inputs, trusted outputs, stable failures, and hidden protocol plumbing.',
        'Returning the raw response from every method creates the most stable client API.',
      ],
      [
        'configuration-secret-sources',
        'Validate environment, file, runtime, and secret-provider configuration with precedence, rotation, and safe diagnostics.',
        'A missing endpoint or credential should silently fall back to a production default.',
        'professional',
        'evaluate',
      ],
    ],
  },
  {
    id: 'security-boundaries',
    title: 'SSRF, DNS Rebinding, Injection, Response Validation, and Least Authority',
    artifact: 'defense-in-depth outbound request policy',
    skills: [
      [
        'ssrf-destination-policy',
        'Allow-list required schemes, ports, hosts, and destinations and enforce network egress limits for server-side fetching.',
        'Blocking localhost text prevents server-side request forgery.',
        'professional',
        'evaluate',
      ],
      [
        'dns-rebinding-toctou',
        'Address DNS rebinding and validation-to-connect races by binding policy to resolved and connected destinations.',
        'Validating a hostname once guarantees every later connection reaches the same allowed address.',
        'conceptual',
        'analyze',
      ],
      [
        'request-field-injection',
        'Reject control characters and unsafe dynamic structure in targets and fields and rely on maintained encoders.',
        'Removing newline characters after concatenation makes arbitrary request fields safe.',
      ],
      [
        'response-content-trust',
        'Verify media type, size, schema, provenance, redirects, signatures when required, and sink-specific encoding before use.',
        'A 2xx status over TLS makes response content trusted application data.',
        'professional',
        'evaluate',
      ],
      [
        'privacy-redaction-authority',
        'Minimize outbound data and authority and redact credentials, personal data, URLs, and bodies from logs and errors.',
        'Complete request and response dumps are necessary production debugging evidence.',
        'professional',
        'evaluate',
      ],
    ],
  },
  {
    id: 'testing-observability',
    title: 'Deterministic Tests, Fault Injection, Contract Evidence, and Observability',
    artifact: 'fault-injected client verification harness',
    skills: [
      [
        'fake-transport-fixtures',
        'Test request construction and response handling with an injected deterministic transport and sanitized fixtures.',
        'A fake response body alone verifies the request sent by the client.',
      ],
      [
        'local-test-server',
        'Use a local test server for protocol integration while controlling redirects, delays, truncation, TLS, and cleanup.',
        'Public production endpoints are the most realistic and reliable unit-test dependency.',
        'procedural',
        'apply',
      ],
      [
        'contract-changed-case-tests',
        'Verify documented provider and consumer contracts against changed schemas, status codes, and version boundaries.',
        'One golden happy-path payload is complete API compatibility evidence.',
        'strategic',
        'evaluate',
      ],
      [
        'fault-injection',
        'Inject cancellation, timeout, reset, partial body, malformed fields, bad media type, redirect, and retry exhaustion deterministically.',
        'Network faults are too nondeterministic to test before production.',
      ],
      [
        'http-telemetry',
        'Record stable client duration, method, route or safe target, status, error type, attempts, bytes, and trace context without high-cardinality secrets.',
        'Logging the complete URL and headers produces ideal HTTP observability.',
        'professional',
        'evaluate',
      ],
    ],
  },
  {
    id: 'performance-release-defense',
    title: 'Performance, Load, Supply-Chain Gates, and Production Client Defense',
    artifact: 'production HTTP client release dossier',
    skills: [
      [
        'latency-throughput-budget',
        'Measure latency distributions, queue time, throughput, error rate, and saturation against an end-to-end service objective.',
        'Average request duration is sufficient performance evidence.',
        'strategic',
        'evaluate',
      ],
      [
        'memory-stream-profile',
        'Profile allocations, buffering, decoding, connection reuse, and response retention with representative sizes.',
        'Streaming always uses constant memory and is automatically faster than buffering.',
      ],
      [
        'load-fairness-overload',
        'Test concurrency, fairness, quotas, backpressure, retry amplification, and graceful overload under changed demand.',
        'Increasing connection and worker counts always reduces latency.',
        'strategic',
        'evaluate',
      ],
      [
        'release-supply-chain-gates',
        'Gate runtime patches, dependencies, tests, static analysis, vulnerability reachability, provenance, configuration, and rollback.',
        'A passing unit suite proves the HTTP client and dependencies are safe to release.',
        'professional',
        'evaluate',
      ],
      [
        'capstone-client-defense',
        'Defend protocol semantics, runtime behavior, security, reliability, testing, accessibility, operations, and changed-load evidence as one system.',
        'A successful demo request proves production readiness.',
        'metacognitive',
        'evaluate',
      ],
    ],
  },
];

const profiles = [
  {
    id: 'http-clients-go',
    code: 'go',
    label: 'Go 1.26 net/http',
    moduleLabel: 'Go Client Systems',
    title: 'HTTP Clients in Go 1.26: Reliable Integrations',
    description:
      'Build secure, bounded, observable Go HTTP clients from protocol semantics through redirects, streaming, retries, connection reuse, testing, and production defense.',
    prerequisites: ['go-basics'],
    evidence:
      'Go 1.26 net/http, net/url, context, io, crypto/tls, RoundTripper, and httptest evidence',
    starterBoundary:
      'Browser labs execute deterministic request and response models in the isolated Go WebAssembly runtime; full net/http, DNS, TLS, socket, race, and load evidence transfers to the local Go 1.26 toolchain.',
    scenarios: [
      'A fleet-control CLI calls an inventory service through a cache and gateway, but operators cannot tell whether failures come from naming, transport, status, or decoding.',
      'A release mirror accepts a configurable upstream URL and must prove the canonical origin, DNS answer, certificate name, and connected destination before download.',
      'A deployment controller creates and cancels rollout jobs, where duplicate writes could launch the same change twice.',
      'An incident collector consumes JSON and compressed text from versioned services with inconsistent media types and one changed schema.',
      'A package-signing client must distinguish protocol failure, rejected policy, malformed problem details, and an unknown write outcome.',
      'A backup agent uploads multi-gigabyte artifacts and downloads compressed manifests without unbounded memory or leaked bodies.',
      'An internal control-plane client uses private roots and optional mTLS through an audited proxy without disabling ordinary certificate validation.',
      'A webhook verifier encounters cross-host redirects, rewritten methods, and sensitive authorization headers while resolving a vendor migration.',
      'A multi-tenant operator client rotates short-lived bearer tokens and isolated cookie jars without logging or forwarding credentials.',
      'A metadata synchronizer uses ETags and shared gateways but has served a private stale representation after a Vary mistake.',
      'A health aggregator has a 900 ms caller deadline spanning DNS, TLS, headers, streamed content, parsing, and cleanup.',
      'A regional control client sees resets, 429, 503, replayable and non-replayable bodies, and nested retry policies during overload.',
      'A daemon sends concurrent requests through HTTP/1.1 and HTTP/2 pools while idle connections, bodies, and stream limits affect capacity.',
      'A cluster inventory traversal follows cursors across thousands of resources, honors quotas, checkpoints progress, and resumes after cancellation.',
      'A reusable Go SDK needs one configured Client, narrow RoundTripper seams, ordered middleware, typed operations, and rotating configuration.',
      'An image-import service accepts tenant URLs and must stop SSRF, DNS rebinding, unsafe redirects, hostile content, and secret-bearing logs.',
      'A client library release needs RoundTripper fakes, httptest servers, TLS fixtures, truncation faults, contract tests, and low-cardinality telemetry.',
      'A production Go integration must defend latency, memory, concurrency, dependency provenance, rollback, and behavior under doubled load.',
    ],
    projects: [
      [
        'go-incident-client',
        'Resilient Go Incident API Client',
        8,
        'http-status-failure-taxonomy',
        'http-redirect-sensitive-fields',
        'http-request-components',
        'http-destination-validation',
      ],
      [
        'go-artifact-fetcher',
        'Bounded Artifact Fetch and Verification Agent',
        10,
        'http-body-bounded-reads',
        'http-cache-validators',
        'http-json-boundary',
        'http-destination-validation',
      ],
      [
        'go-retry-orchestrator',
        'Deadline-Aware Retry Orchestrator',
        13,
        'http-deadline-budget',
        'http-retry-budget',
        'http-timeout-classification',
        'http-retry-replayability',
      ],
      [
        'go-sdk-harness',
        'Observable Go Service SDK and Fault Harness',
        17,
        'http-client-transport-abstraction',
        'http-test-fault-injection',
        'http-privacy-redaction',
        'http-telemetry',
      ],
      [
        'go-client-defense',
        'Production Go Client Defense',
        18,
        'http-performance-load',
        'http-capstone-defense',
        'http-release-gates',
        'http-privacy-redaction',
      ],
    ],
    languageSources: [
      {
        title: 'Go 1.26 net/http Package Documentation',
        authority: 'official-docs',
        url: 'https://pkg.go.dev/net/http',
        version: 'Go 1.26.5, released 2026-07-07',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls Client, Request, Response, Transport, RoundTripper, redirects, cookies, body ownership, timeouts, connection reuse, HTTP/2 configuration, and Go 1.26 ClientConn boundaries.',
      },
      {
        title: 'Go context, net/url, crypto/tls, and httptest Documentation',
        authority: 'official-docs',
        url: 'https://pkg.go.dev/context',
        version: 'Go 1.26.5 standard library',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls cancellation, deadlines, URL parsing, TLS configuration, test servers, and deterministic client seams.',
      },
    ],
  },
  {
    id: 'http-clients-typescript',
    code: 'ts',
    label: 'TypeScript 7 standards-based Fetch',
    moduleLabel: 'Browser and Node Client Systems',
    title: 'HTTP Clients in TypeScript 7: Fetch to Production SDKs',
    description:
      'Build typed browser and Node HTTP clients with Fetch, runtime validation, cancellation, CORS, caching, security, deterministic tests, and accessible application evidence.',
    prerequisites: ['typescript-basics'],
    evidence:
      'TypeScript 7 strict types plus WHATWG Fetch Request, Response, Headers, URL, streams, and AbortSignal contracts',
    starterBoundary:
      'Browser labs run strict TypeScript diagnostics only and never execute learner source on the server; request behavior uses deterministic fixtures, while real Fetch, CORS, TLS, and load evidence transfers to an isolated browser or Node 26.5 test environment.',
    scenarios: [
      'An accessible operations dashboard calls a browser API through service workers and gateways, but one visible error collapses CORS, network, status, and schema failures.',
      'A Node-based partner SDK accepts tenant endpoints and must preserve URL, origin, IDN, DNS, and certificate distinctions across environments.',
      'A typed deployment console creates jobs from repeated clicks and stale tabs, requiring method semantics, preconditions, and duplicate-effect controls.',
      'A browser data panel negotiates JSON and CSV, receives compressed content, and must validate unknown fields before rendering an aria-live update.',
      'A support SDK receives 202, 204, redirects, problem details, opaque browser failures, and incompatible success payloads.',
      'A media uploader streams files and reads large responses through Web Streams without accidental cloning, locked bodies, or unbounded decoding.',
      'A universal browser-and-Node library must state what HTTPS trust it can configure in each runtime and where proxies or mTLS require Node boundaries.',
      'A sign-in flow follows relative and cross-origin redirects while Fetch redirect modes, credentials, methods, and authorization scope differ.',
      'A browser client selects omit, same-origin, or include credentials and separates cookies, CSRF, API keys, and bearer-token authority.',
      'An offline-first dashboard combines browser HTTP caching, a service-worker cache, ETags, Vary, and user-specific responses.',
      'A search-as-you-type interface cancels stale requests with composed AbortSignals while preserving the winning result and announced status.',
      'A high-traffic web SDK retries selected reads under 429 and 503 without replaying one-shot streams or synchronizing every browser tab.',
      'A Node rendering service and browsers use Fetch over different pools and protocol negotiation while concurrency and stream backpressure remain bounded.',
      'An infinite-scroll accessibility view traverses cursor links, rate limits, filter encodings, resumable state, and focus restoration.',
      'A published TypeScript SDK needs typed operation boundaries, an injected fetch function, ordered wrappers, runtime validators, and environment-safe configuration.',
      'A server-rendering image proxy and browser preview must address SSRF, DNS rebinding, CORS limits, hostile media types, and privacy-safe diagnostics.',
      'A cross-runtime SDK needs deterministic fetch fakes, local integration tests, abort and truncation faults, contract fixtures, and Web Performance telemetry.',
      'A production TypeScript client must defend Core Web UX, p95 latency, bundle and memory cost, dependency gates, rollback, and changed traffic.',
    ],
    projects: [
      [
        'ts-status-sdk',
        'Accessible Typed Service Status SDK',
        8,
        'http-status-failure-taxonomy',
        'http-redirect-sensitive-fields',
        'http-request-components',
        'http-destination-validation',
      ],
      [
        'ts-offline-dashboard',
        'Offline-First Conditional Data Dashboard',
        10,
        'http-cache-validators',
        'http-json-boundary',
        'http-body-bounded-reads',
        'http-destination-validation',
      ],
      [
        'ts-resumable-upload',
        'Abortable Resumable Upload Coordinator',
        13,
        'http-body-streaming',
        'http-retry-replayability',
        'http-deadline-budget',
        'http-timeout-classification',
      ],
      [
        'ts-contract-harness',
        'Cross-Runtime Fetch Contract Harness',
        17,
        'http-client-transport-abstraction',
        'http-test-fault-injection',
        'http-privacy-redaction',
        'http-telemetry',
      ],
      [
        'ts-client-defense',
        'Production TypeScript Client Defense',
        18,
        'http-performance-load',
        'http-capstone-defense',
        'http-release-gates',
        'http-privacy-redaction',
      ],
    ],
    languageSources: [
      {
        title: 'WHATWG Fetch Living Standard',
        authority: 'standard',
        url: 'https://fetch.spec.whatwg.org/',
        version: 'Living Standard, last updated 2026-05-08',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls Request, Response, Headers, bodies, fetch, redirects, credentials, CORS, cache modes, origins, streams, timing, and browser security behavior.',
      },
      {
        title: 'Node.js 26.5 Web-Compatible Fetch and Abort APIs',
        authority: 'official-docs',
        url: 'https://nodejs.org/api/globals.html#fetch',
        version: 'Node.js 26.5.0 documentation',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls current Node Fetch, Request, Response, Headers, FormData, AbortController, AbortSignal.timeout, and AbortSignal.any transfer behavior.',
      },
    ],
  },
  {
    id: 'http-clients-python',
    code: 'py',
    label: 'Python 3.14 urllib and HTTP client layers',
    moduleLabel: 'Automation and Data Client Systems',
    title: 'HTTP Clients in Python 3.14: Safe Data Automation',
    description:
      'Build bounded Python HTTP automation with urllib, typed fixture transports, streaming, TLS, retries, rate limits, security, tests, observability, and resilient data ingestion.',
    prerequisites: ['python-basics'],
    evidence: 'Python 3.14 urllib, http.client, ssl, typed protocols, and fixture transports',
    starterBoundary:
      'Browser Python labs run deterministic request and response models in an isolated Pyodide worker with no authorized live-network task; urllib, sockets, TLS, concurrency, and load behavior transfers to a local Python 3.14.6 test environment.',
    scenarios: [
      'A civic-data importer calls several public catalogs, but one catch-all exception erases DNS, TLS, status, decode, and data-quality evidence.',
      'A research archive ingests contributor-supplied links and must preserve URI structure, origin identity, DNS evidence, and safe destination policy.',
      'A grant-report automation creates export jobs where interrupted POST requests and duplicate submissions can produce conflicting artifacts.',
      'A dataset harvester negotiates JSON and CSV, receives mislabeled UTF-8, and must validate records before adding them to analysis tables.',
      'A compliance collector encounters accepted jobs, no-content results, partial ranges, problem details, and uncertain remote effects.',
      'A climate archive streams large compressed files and uploads generated reports while bounding bytes, decompression, parsing, and temporary storage.',
      'A laboratory integration uses a private CA and outbound proxy while keeping hostname checks, public roots, and optional client certificates explicit.',
      'A document resolver follows vendor redirects but must preserve relative resolution, method intent, credential scope, and an inspectable chain.',
      'A scheduled automation rotates API keys and OAuth bearer tokens and isolates cookie jars by account without leaking secrets to notebooks.',
      'A public-data mirror uses validators and local metadata but has confused stale files, 304 metadata, Vary, and authenticated responses.',
      'A nightly reconciliation has a fixed run window and must divide deadlines across resolution, connect, headers, streamed body, parsing, and cleanup.',
      'A rate-limited data collector handles 429, 503, resets, replayable requests, jittered backoff, and nested library retry settings.',
      'A threaded and async ingestion design must bound pools, per-host connections, response ownership, queues, and downstream database pressure.',
      'A longitudinal dataset traversal uses cursor and link pagination, changing records, quotas, checkpoints, and crash-safe resumption.',
      'A maintainable Python package needs a typed transport protocol, immutable configuration, operation methods, decorators, and explicit exception taxonomy.',
      'A server-side preview fetcher accepts source URLs and must defeat SSRF, DNS rebinding, redirect bypass, hostile response data, and unsafe logging.',
      'A data client needs injected openers, local HTTP fixtures, fake clocks, malformed and partial bodies, contract checks, and privacy-safe telemetry.',
      'A production Python automation must defend duration, memory, concurrency, package provenance, restart checkpoints, rollback, and doubled volume.',
    ],
    projects: [
      [
        'py-dataset-harvester',
        'Verified Public Dataset Harvester',
        8,
        'http-status-failure-taxonomy',
        'http-body-bounded-reads',
        'http-json-boundary',
        'http-destination-validation',
      ],
      [
        'py-cache-mirror',
        'Conditional Research Archive Mirror',
        10,
        'http-cache-validators',
        'http-json-boundary',
        'http-body-bounded-reads',
        'http-destination-validation',
      ],
      [
        'py-rate-ingestor',
        'Rate-Limited Resumable Ingestion Client',
        14,
        'http-retry-budget',
        'http-pagination-resume',
        'http-deadline-budget',
        'http-timeout-classification',
      ],
      [
        'py-transport-harness',
        'Python Client Fault and Contract Harness',
        17,
        'http-client-transport-abstraction',
        'http-test-fault-injection',
        'http-privacy-redaction',
        'http-telemetry',
      ],
      [
        'py-client-defense',
        'Production Python Automation Defense',
        18,
        'http-performance-load',
        'http-capstone-defense',
        'http-release-gates',
        'http-privacy-redaction',
      ],
    ],
    languageSources: [
      {
        title: 'Python 3.14 urllib URL Handling Documentation',
        authority: 'official-docs',
        url: 'https://docs.python.org/3/library/urllib.html',
        version: 'Python 3.14.6 documentation, updated 2026-07-10',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls urllib.request, urllib.error, urllib.parse, URL opening, request metadata, handlers, openers, errors, redirects, proxies, cookies, and URL parsing.',
      },
      {
        title: 'Python 3.14 http.client, ssl, and asyncio Documentation',
        authority: 'official-docs',
        url: 'https://docs.python.org/3/library/http.client.html',
        version: 'Python 3.14.6 documentation, updated 2026-07-10',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls lower-level connection and response behavior, HTTPS contexts, body reads, exceptions, concurrency boundaries, and standard-library transfer evidence.',
      },
    ],
  },
];

function commonSources(profile) {
  return [
    {
      title: 'ACM/IEEE-CS/AAAI Computer Science Curricula 2023',
      authority: 'curriculum-framework',
      url: 'https://csed.acm.org/final-report/',
      version: 'CS2023 final report, 2024 publication files',
      reviewedAt: REVIEWED_AT,
      scope:
        'Controls institutional networking, software development, security, data, systems, testing, professional practice, and distributed-computing outcomes.',
    },
    {
      title: 'RFC 9110: HTTP Semantics',
      authority: 'standard',
      url: 'https://www.rfc-editor.org/rfc/rfc9110.html',
      version: 'Internet Standard STD 97, June 2022',
      reviewedAt: REVIEWED_AT,
      scope:
        'Controls resources, representations, messages, URI schemes, fields, methods, status codes, conditional requests, ranges, authentication, and shared semantics across HTTP versions.',
    },
    {
      title: 'RFC 9111: HTTP Caching',
      authority: 'standard',
      url: 'https://www.rfc-editor.org/rfc/rfc9111.html',
      version: 'Internet Standard STD 98, June 2022',
      reviewedAt: REVIEWED_AT,
      scope:
        'Controls cache storage, keys, freshness, age, validation, Vary, stale handling, invalidation, private and shared caches, and security limits.',
    },
    {
      title: 'RFC 9112, RFC 9113, and RFC 9114 HTTP Version Specifications',
      authority: 'standard',
      url: 'https://www.rfc-editor.org/rfc/rfc9112.html',
      version: 'HTTP/1.1, HTTP/2, and HTTP/3 standards published June 2022',
      reviewedAt: REVIEWED_AT,
      scope:
        'Controls HTTP/1.1 messaging and persistence, HTTP/2 streams and flow control, and HTTP/3 QUIC mappings while preserving RFC 9110 semantics.',
    },
    {
      title: 'RFC 3986: Uniform Resource Identifier Generic Syntax',
      authority: 'standard',
      url: 'https://www.rfc-editor.org/rfc/rfc3986.html',
      version: 'Internet Standard STD 66 with current errata',
      reviewedAt: REVIEWED_AT,
      scope:
        'Controls URI components, parsing, percent encoding, normalization, comparison, relative resolution, and security considerations.',
    },
    {
      title: 'RFC 9457: Problem Details for HTTP APIs',
      authority: 'standard',
      url: 'https://www.rfc-editor.org/rfc/rfc9457.html',
      version: 'Standards Track, July 2023',
      reviewedAt: REVIEWED_AT,
      scope:
        'Controls application/problem+json structure, type, status, title, detail, instance, extension fields, and client interpretation boundaries.',
    },
    {
      title: 'RFC 6265: HTTP State Management Mechanism',
      authority: 'standard',
      url: 'https://www.rfc-editor.org/rfc/rfc6265.html',
      version: 'Standards Track with current errata; successor work noted separately',
      reviewedAt: REVIEWED_AT,
      scope:
        'Controls Cookie and Set-Cookie scope, jars, expiry, Secure and HttpOnly behavior, ambient authority, privacy, and security limitations.',
    },
    {
      title: 'OWASP SSRF Prevention and REST Security Cheat Sheets',
      authority: 'official-docs',
      url: 'https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html',
      version: 'Current 2026-07-14',
      reviewedAt: REVIEWED_AT,
      scope:
        'Controls outbound destination allow-lists, redirect policy, DNS rebinding, network segmentation, response handling, secrets, TLS, validation, logging, and least authority.',
    },
    {
      title: 'OpenTelemetry HTTP Semantic Conventions',
      authority: 'standard',
      url: 'https://opentelemetry.io/docs/specs/semconv/http/',
      version: 'Semantic conventions 1.43.0, current 2026-07-14',
      reviewedAt: REVIEWED_AT,
      scope:
        'Controls HTTP client span, metric, error, duration, method, status, network, and cardinality conventions plus stability boundaries.',
    },
    ...profile.languageSources,
  ];
}

function courseModules(profile) {
  const actors =
    profile.code === 'go'
      ? {
          workshop: 'A platform SDK team integrating a staging control plane',
          debug: 'An on-call reliability engineer tracing a production client incident',
          lab: 'A backup automation team integrating an unfamiliar artifact service',
          review: 'A security reviewer reconstructing an expired incident handoff',
          quiz: 'A release board evaluating a changed infrastructure-provider contract',
        }
      : profile.code === 'ts'
        ? {
            workshop: 'An accessibility product team integrating a staging browser API',
            debug: 'A browser support engineer tracing a cross-runtime client incident',
            lab: 'A partner SDK team integrating an unfamiliar third-party endpoint',
            review: 'A design-system maintainer reconstructing an offline failure handoff',
            quiz: 'A cross-runtime release reviewer evaluating a changed provider contract',
          }
        : {
            workshop: 'A civic-data automation team integrating a staging catalog',
            debug: 'A data reliability engineer tracing a failed overnight import',
            lab: 'A research archive team integrating an unfamiliar public dataset',
            review: 'A compliance analyst reconstructing a partial ingestion handoff',
            quiz: 'A production data release board evaluating a changed source contract',
          };
  const challenge = {
    workshop:
      'build a first protocol model from narrated fixtures and explain each policy boundary',
    debug:
      'isolate a plausible but incorrect result from conflicting traces, repair its cause, and retain a regression witness',
    lab: 'satisfy changed endpoint, payload, authority, byte, and time constraints without a recipe',
    review:
      'reconstruct the governing policy from partial evidence after delay and distinguish current rules from tempting earlier ones',
    quiz: 'defend independent decisions across fresh cases, including one ambiguous failure and one changed boundary',
  };
  return definitions.map((definition, moduleIndex) => {
    const plannedModule = module(
      `http-${profile.code}-${definition.id}`,
      `${definition.title} · ${profile.moduleLabel}`,
      profile.scenarios[moduleIndex],
      `a ${profile.label} ${definition.artifact}`,
      definition.skills.map(
        ([id, statement, misconception, knowledgeType = 'procedural', level = 'apply']) =>
          skill(
            `http-${profile.code}-${id}`,
            `${statement} Demonstrate the result through ${profile.evidence}.`,
            `${misconception} This remains false for ${profile.label}.`,
            knowledgeType,
            level
          )
      )
    );
    return {
      ...plannedModule,
      contexts: {
        theory: profile.scenarios[moduleIndex],
        workshop: `${actors.workshop} must ${challenge.workshop} for ${definition.title.toLowerCase()}, producing ${definition.artifact}.`,
        debug: `${actors.debug} must ${challenge.debug} for ${definition.title.toLowerCase()}, producing ${definition.artifact}.`,
        lab: `${actors.lab} must ${challenge.lab} for ${definition.title.toLowerCase()}, producing ${definition.artifact}.`,
        review: `${actors.review} must ${challenge.review} for ${definition.title.toLowerCase()}, producing ${definition.artifact}.`,
        quiz: `${actors.quiz} must ${challenge.quiz} for ${definition.title.toLowerCase()}, producing ${definition.artifact}.`,
      },
    };
  });
}

function competencyId(profile, commonId) {
  const aliases = {
    'http-status-failure-taxonomy': 'transport-status-domain-errors',
    'http-request-components': 'request-components',
    'http-destination-validation': 'destination-validation',
    'http-redirect-sensitive-fields': 'sensitive-field-forwarding',
    'http-body-bounded-reads': 'bounded-response-reads',
    'http-body-streaming': 'streaming-uploads',
    'http-cache-validators': 'validators-conditional-requests',
    'http-json-boundary': 'json-boundary-validation',
    'http-deadline-budget': 'phase-budget-allocation',
    'http-retry-budget': 'retry-budget-amplification',
    'http-retry-replayability': 'body-replayability',
    'http-pagination-resume': 'checkpoint-resume-deduplication',
    'http-client-transport-abstraction': 'transport-abstraction',
    'http-test-fault-injection': 'fault-injection',
    'http-timeout-classification': 'timeout-classification',
    'http-privacy-redaction': 'privacy-redaction-authority',
    'http-telemetry': 'http-telemetry',
    'http-performance-load': 'load-fairness-overload',
    'http-release-gates': 'release-supply-chain-gates',
    'http-capstone-defense': 'capstone-client-defense',
  };
  return `http-${profile.code}-${aliases[commonId]}`;
}

const httpProjectEvidence = {
  'go-incident-client': {
    userNeed:
      'On-call operators need a Go client that preserves redirect hops and separates transport, HTTP status, problem-detail, decode, and uncertain-write failures in one incident timeline.',
    constraints: [
      'Record method, authority, redirect decision, status class, and cleanup outcome without exposing credentials.',
      'Do not retry an uncertain state-changing request unless replay safety or an idempotency control is proven.',
      'Reproduce one gateway redirect and one malformed problem response with an httptest incident fixture.',
    ],
  },
  'go-artifact-fetcher': {
    userNeed:
      'Release engineers need a Go artifact fetcher that admits only approved destinations, bounds compressed and decoded bytes, validates metadata, and proves the downloaded digest before promotion.',
    constraints: [
      'Pin the canonical origin policy across DNS results and every redirect before reading artifact bytes.',
      'Stream to a quarantined destination with byte, time, media-type, and decompression limits.',
      'Reject digest, validator, truncation, and content-type changes while preserving cleanup evidence.',
    ],
  },
  'go-retry-orchestrator': {
    userNeed:
      'Deployment controllers need a Go retry coordinator that divides one caller deadline across attempts without replaying unsafe bodies or multiplying nested retries during overload.',
    constraints: [
      'Model attempt cost, backoff, Retry-After, remaining budget, and the maximum downstream amplification.',
      'Distinguish replayable reads, idempotency-controlled writes, and writes with unknown remote effect.',
      'Verify cancellation during backoff and during body streaming with no leaked goroutine or response body.',
    ],
  },
  'go-sdk-harness': {
    userNeed:
      'Go SDK maintainers need a reusable client and fault harness that tests transport seams, middleware order, typed operations, privacy-safe telemetry, and rotating configuration.',
    constraints: [
      'Use narrow RoundTripper fakes for unit boundaries and httptest servers for observable protocol behavior.',
      'Inject timeout, truncation, redirect, TLS, and malformed-payload failures with deterministic clocks and fixtures.',
      'Keep metrics low-cardinality and prove that tokens, cookies, bodies, and tenant identifiers are redacted.',
    ],
  },
  'go-client-defense': {
    userNeed:
      'A reliability release board needs a production Go client defense covering latency, memory, concurrency, dependency provenance, rollback, and behavior at doubled traffic.',
    constraints: [
      'Defend connection-pool, stream, queue, memory, and retry limits with measured load evidence.',
      'Inventory module and toolchain provenance and connect each critical update to a verified compatibility decision.',
      'Demonstrate staged rollout, rollback trigger, recovery verification, and named residual operational risk.',
    ],
  },
  'ts-status-sdk': {
    userNeed:
      'Keyboard and screen-reader users need a typed status SDK that validates unknown responses, preserves distinct failure states, and announces meaningful progress across browser and Node consumers.',
    constraints: [
      'Represent network, CORS, status, problem-detail, decode, schema, abort, and stale-result outcomes explicitly.',
      'Keep focus stable and announce status changes without duplicate, color-only, or continuously noisy updates.',
      'Test the same injected Fetch contract in browser-like and Node runtimes with changed payload fixtures.',
    ],
  },
  'ts-offline-dashboard': {
    userNeed:
      'Field coordinators need an offline-first dashboard that distinguishes fresh, validated, stale, private, and unavailable data while reconnecting without overwriting newer work.',
    constraints: [
      'Partition browser and service-worker cache entries by every representation-selecting and authorization boundary.',
      'Expose freshness, sync, conflict, and offline states through text, focus-safe updates, and keyboard operation.',
      'Verify ETag, Vary, 304 metadata, reconnection, and changed-user cases with deterministic fixtures.',
    ],
  },
  'ts-resumable-upload': {
    userNeed:
      'Media contributors need an abortable upload coordinator that streams bounded chunks, resumes from verified offsets, and never reports completion before server state is reconciled.',
    constraints: [
      'Own each ReadableStream, AbortSignal, request body generation, offset, checksum, and cleanup transition explicitly.',
      'Resume only after querying authoritative server progress; never infer accepted bytes from a dropped connection.',
      'Test cancellation, tab replacement, expired credentials, changed file content, and inaccessible progress feedback.',
    ],
  },
  'ts-contract-harness': {
    userNeed:
      'Cross-runtime SDK maintainers need a Fetch contract harness that reveals browser and Node differences while injecting redirects, aborts, truncation, malformed data, and timing faults.',
    constraints: [
      'Exercise an injected fetch function and validate every unknown body before exposing typed operations.',
      'Model opaque browser failures separately from inspectable Node transport and TLS failures.',
      'Prove stream, Promise, timer, listener, and AbortSignal cleanup with privacy-safe low-cardinality traces.',
    ],
  },
  'ts-client-defense': {
    userNeed:
      'A product release board needs a TypeScript client defense covering accessible task completion, Core Web responsiveness, bundle cost, memory, provider faults, dependency gates, and rollback.',
    constraints: [
      'Measure task and announcement latency alongside p95 request time, memory, connection, and bundle budgets.',
      'Verify browser, Node, service-worker, offline, slow-network, and doubled-traffic behavior with immutable fixtures.',
      'Tie dependency provenance, staged rollout, rollback, recovery, and residual UX risk to named owners.',
    ],
  },
  'py-dataset-harvester': {
    userNeed:
      'Research analysts need a Python harvester that preserves source provenance while bounding downloads and rejecting incompatible encoding, media type, schema, and record changes.',
    constraints: [
      'Record canonical source, retrieval time, validators, media type, byte count, encoding decision, and schema revision.',
      'Quarantine malformed or changed records instead of silently coercing them into analysis tables.',
      'Reproduce truncation, mislabeled UTF-8, duplicate records, and a changed source URL with local fixtures.',
    ],
  },
  'py-cache-mirror': {
    userNeed:
      'Archive curators need a conditional Python mirror that reconciles validators and representation metadata without leaking private responses across accounts or replacing a valid file partially.',
    constraints: [
      'Key metadata by canonical source, authorization partition, and every relevant Vary dimension.',
      'Treat 304 as metadata reconciliation, stream replacements atomically, and retain the prior valid object on failure.',
      'Test validator rotation, stale policy, changed credentials, interrupted replacement, and recovery from corrupt metadata.',
    ],
  },
  'py-rate-ingestor': {
    userNeed:
      'Data operations staff need a rate-limited Python ingestor that checkpoints cursor progress, deduplicates changed pages, and finishes within a fixed run window without retry storms.',
    constraints: [
      'Budget pagination, Retry-After, jittered backoff, parsing, persistence, and cleanup under one run deadline.',
      'Commit a cursor only with the corresponding durable records and an explicit source-version boundary.',
      'Verify crash resume, repeated pages, deleted records, quota exhaustion, and concurrent scheduler exclusion.',
    ],
  },
  'py-transport-harness': {
    userNeed:
      'Python client maintainers need a transport contract harness with injected openers, clocks, and local servers for deterministic exception, streaming, redirect, and telemetry tests.',
    constraints: [
      'Separate pure request-policy tests from local HTTP behavior and optional controlled TLS integration evidence.',
      'Inject partial bodies, malformed headers, redirect loops, deadline expiry, cancellation, and decode failures.',
      'Assert response, temporary-file, timer, task, and secret-safe logging cleanup after every rejected case.',
    ],
  },
  'py-client-defense': {
    userNeed:
      'A research governance board needs a production Python automation defense covering dataset integrity, duration, memory, package provenance, privacy, restart checkpoints, rollback, and doubled volume.',
    constraints: [
      'Measure record throughput, peak memory, open resources, retry volume, and end-to-end completion under changed load.',
      'Connect package and interpreter provenance to compatibility, vulnerability, and reproducible-build evidence.',
      'Demonstrate checkpoint restore, release rollback, data reconciliation, privacy review, and named residual research risk.',
    ],
  },
};

function courseProjects(profile) {
  return profile.projects.map(([id, title, afterModuleNumber, ...competencies]) => {
    const evidence = httpProjectEvidence[id];
    if (!evidence) throw new Error(`Missing project evidence for ${id}`);
    return {
      ...project(
        id,
        title,
        `http-${profile.code}-${definitions[afterModuleNumber - 1].id}`,
        profile.code === 'go'
          ? 'A platform reliability team'
          : profile.code === 'ts'
            ? 'A product accessibility and SDK team'
            : 'A research data operations team',
        evidence.userNeed,
        competencies.map((competency) => competencyId(profile, competency))
      ),
      constraints: evidence.constraints,
    };
  });
}

function makeCourse(profile) {
  return finalizeCourse(
    {
      id: profile.id,
      title: profile.title,
      version: '2026.07',
      audience: {
        description: profile.description,
        entryKnowledge: [
          `Demonstrate the prerequisite ${profile.prerequisites[0]} course outcomes or equivalent language, testing, and debugging skill.`,
          'Use basic networking terms such as host, IP address, port, request, response, and TLS; the course rebuilds each concept before application.',
        ],
        deviceConstraints: [profile.starterBoundary],
        accessibilityAssumptions: [
          'All request traces, redirect chains, stream diagrams, timing records, tables, code, and failures require structured text, keyboard operation, announced status, and non-color-only meaning.',
        ],
      },
      scope: {
        includes: [
          'HTTP semantics through RFC 9110, caching, HTTP/1.1, HTTP/2, HTTP/3, URI resolution, problem details, cookies, HTTPS, redirects, credentials, streaming, conditional requests, retries, rate limits, pagination, and observability',
          `${profile.label} request construction, response handling, runtime validation, cancellation, testing seams, resource ownership, and production transfer evidence`,
          'Cumulative projects spanning protocol reasoning, safe destination policy, bounded resources, fault injection, accessibility, privacy, performance, release gates, and production defense',
        ],
        excludes: [
          'Treating deterministic browser fixtures as live-network, DNS, TLS, protocol-negotiation, race, or production-load evidence',
          'Server framework implementation, vendor API memorization, offensive exploitation, and undocumented dependency-specific retry magic',
        ],
        nextCourses:
          profile.code === 'go'
            ? ['http-servers-go', 'http-protocol-go', 'build-pokedex-go']
            : profile.code === 'ts'
              ? ['http-servers-typescript', 'cicd-github-actions', 'build-pokedex-typescript']
              : ['build-web-scraper-python', 'build-ai-agent-python'],
      },
      sources: commonSources(profile),
      modules: courseModules(profile),
      projects: courseProjects(profile),
      examContext: `Unfamiliar ${profile.label} URI, method, representation, status, body, TLS, redirect, credential, cache, timeout, retry, protocol-version, pagination, security, test, telemetry, and production cases requiring deterministic evidence plus live-environment transfer limits.`,
      minimumQuestionBankSize: 540,
    },
    {
      researchedAt: RESEARCHED_AT,
      prerequisiteCourseIds: profile.prerequisites,
    }
  );
}

export const httpClientCourseConfigs = profiles.map(makeCourse);

export const httpClientsGoConfig = httpClientCourseConfigs.find(
  (course) => course.id === 'http-clients-go'
);
export const httpClientsTypeScriptConfig = httpClientCourseConfigs.find(
  (course) => course.id === 'http-clients-typescript'
);
export const httpClientsPythonConfig = httpClientCourseConfigs.find(
  (course) => course.id === 'http-clients-python'
);

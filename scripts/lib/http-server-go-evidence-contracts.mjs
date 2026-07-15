const SPECS = {
  'http-server-go-outcomes-lifecycle': {
    parameters: 'listening bool, dependencyReady bool, draining bool',
    result: '(string, bool)',
    body: `\tphase := "starting"
\tready := listening && dependencyReady && !draining
\tif ready { phase = "serving" }
\tif draining { phase = "draining" }
\treturn phase, ready`,
    anchors: ['listening\\s*&&\\s*dependencyReady', 'draining'],
    task: 'separate listener liveness, dependency readiness, and draining state',
  },
  'http-server-go-semantics-resources': {
    parameters: 'method string, exists bool, changed bool',
    result: '(int, bool)',
    body: `\tstatus := 200
\tstoresEffect := false
\tif method == "POST" && changed { status, storesEffect = 201, true }
\tif method == "DELETE" && !exists { status = 404 }
\tif method == "HEAD" { storesEffect = false }
\treturn status, storesEffect`,
    anchors: ['method\\s*==\\s*"POST"', 'method\\s*==\\s*"HEAD"'],
    task: 'connect method semantics, resource state, status, and durable effect',
  },
  'http-server-go-servemux-routing': {
    parameters: 'method string, path string, owner string',
    result: '(string, int)',
    body: `\tpattern, status := "", 404
\tif method == "GET" && path == "/incidents/latest" { pattern, status = "GET /incidents/latest", 200 }
\tif method == "GET" && len(path) > 11 { pattern, status = "GET /incidents/{id}", 200 }
\tif owner == "" { status = 500 }
\treturn pattern, status`,
    anchors: ['GET /incidents/latest', 'GET /incidents/\\{id\\}'],
    task: 'choose a specific method-and-path route and preserve one registration owner',
  },
  'http-server-go-handlers-middleware-architecture': {
    parameters: 'authenticated bool, bodyValid bool, wroteHeader bool',
    result: '(string, int, bool)',
    body: `\tstage, status := "authenticate", 401
\tif authenticated { stage, status = "validate", 400 }
\tif authenticated && bodyValid { stage, status = "handle", 204 }
\tresponseOwned := !wroteHeader || stage == "handle"
\treturn stage, status, responseOwned`,
    anchors: ['stage,\\s*status\\s*=\\s*"validate"', 'responseOwned'],
    task: 'trace middleware order while keeping response ownership explicit',
  },
  'http-server-go-request-target-host-proxy': {
    parameters: 'host string, forwardedHost string, trustedProxy bool',
    result: '(string, bool)',
    body: `\teffectiveHost := host
\tif trustedProxy && forwardedHost != "" { effectiveHost = forwardedHost }
\tallowed := effectiveHost == "api.example.test"
\tif host == "" { allowed = false }
\treturn effectiveHost, allowed`,
    anchors: ['trustedProxy\\s*&&\\s*forwardedHost', 'api\\.example\\.test'],
    task: 'derive effective authority only through an explicit trusted-proxy boundary',
  },
  'http-server-go-fields-representations-cache': {
    parameters: 'acceptJSON bool, etagMatches bool, privateData bool',
    result: '(string, int, bool)',
    body: `\tmediaType, status := "application/json", 200
\tcacheable := !privateData
\tif !acceptJSON { mediaType, status, cacheable = "", 406, false }
\tif etagMatches && status == 200 { status = 304 }
\treturn mediaType, status, cacheable`,
    anchors: ['status\\s*=\\s*304', 'privateData'],
    task: 'negotiate a representation and keep validator and privacy decisions independent',
  },
  'http-server-go-bodies-json-uploads': {
    parameters: 'declaredBytes int, decodedBytes int, maximumBytes int',
    result: '(int, string, bool)',
    body: `\tif maximumBytes <= 0 { return 500, "invalid-limit", false }
\tif declaredBytes > maximumBytes { return 413, "declared-too-large", false }
\tif decodedBytes < 0 || decodedBytes > maximumBytes { return 413, "decoded-too-large", false }
\tif decodedBytes == 0 { return 400, "empty-body", false }
\treturn 200, "bounded-body", true`,
    anchors: ['declaredBytes\\s*>\\s*maximumBytes', 'decodedBytes\\s*>\\s*maximumBytes'],
    task: 'bound declared and actually decoded bodies before accepting structured input',
  },
  'http-server-go-responses-problems-streams': {
    parameters: 'status int, problemType string, queuedChunks int',
    result: '(string, bool, int)',
    body: `\tkind, flush := "response", false
\tif status >= 400 { kind = "application/problem+json" }
\tif status >= 400 && problemType == "" { kind = "invalid-problem" }
\tif status == 200 && queuedChunks > 0 { flush = true }
\treturn kind, flush, queuedChunks`,
    anchors: ['application/problem\\+json', 'queuedChunks\\s*>\\s*0'],
    task: 'choose one response shape and bound streaming flush evidence',
  },
  'http-server-go-context-deadlines-cleanup': {
    parameters: 'requestBudgetMs int, dependencyBudgetMs int, cleanupReserveMs int',
    result: '(int, bool)',
    body: `\tusable := requestBudgetMs - cleanupReserveMs
\tif usable < 0 { usable = 0 }
\tif dependencyBudgetMs < usable { usable = dependencyBudgetMs }
\tstart := usable > 0 && cleanupReserveMs >= 0
\treturn usable, start`,
    anchors: ['requestBudgetMs\\s*-\\s*cleanupReserveMs', 'dependencyBudgetMs\\s*<\\s*usable'],
    task: 'derive a dependency budget while reserving time for cancellation cleanup',
  },
  'http-server-go-server-protocols-timeouts': {
    parameters: 'protocol string, headerMs int, idleMs int, draining bool',
    result: '(bool, string)',
    body: `\tsupported := protocol == "http/1.1" || protocol == "h2"
\treason := "serve"
\tif protocol == "h3" { reason = "outside-net-http-server" }
\tif headerMs <= 0 || idleMs <= headerMs { supported, reason = false, "invalid-timeouts" }
\tif draining { supported, reason = false, "draining" }
\treturn supported, reason`,
    anchors: ['protocol\\s*==\\s*"h3"', 'idleMs\\s*<=\\s*headerMs'],
    task: 'gate HTTP/1.1 and HTTP/2 service by timeout and graceful-drain policy while excluding HTTP/3',
  },
  'http-server-go-concurrency-backpressure-limits': {
    parameters: 'active int, capacity int, tenantTokens int',
    result: '(int, bool, string)',
    body: `\tqueueRemaining := capacity - active
\tadmit, reason := queueRemaining > 0, "capacity"
\tif tenantTokens <= 0 { admit, reason = false, "tenant-rate" }
\tif active < 0 || capacity <= 0 { admit, reason = false, "invalid-budget" }
\treturn queueRemaining, admit, reason`,
    anchors: ['capacity\\s*-\\s*active', 'tenantTokens\\s*<=\\s*0'],
    task: 'combine concurrency capacity with a separate tenant rate budget',
  },
  'http-server-go-sql-repositories-transactions': {
    parameters: 'rowsAffected int, commitKnown bool, invariantHolds bool',
    result: '(string, bool)',
    body: `\toutcome, retry := "rolled-back", false
\tif rowsAffected == 1 && commitKnown && invariantHolds { outcome = "committed" }
\tif !commitKnown { outcome, retry = "ambiguous", false }
\tif rowsAffected > 1 || !invariantHolds { outcome = "invariant-failed" }
\treturn outcome, retry`,
    anchors: ['rowsAffected\\s*==\\s*1', '!commitKnown'],
    task: 'classify transaction outcome without retrying an ambiguous commit',
  },
  'http-server-go-resource-apis-consistency': {
    parameters: 'expectedVersion int, actualVersion int, idempotencyMatch bool',
    result: '(int, string, bool)',
    body: `\tstatus, decision := 409, "version-conflict"
\treplay := false
\tif expectedVersion == actualVersion { status, decision = 200, "updated" }
\tif idempotencyMatch { status, decision, replay = 200, "replayed", true }
\tif expectedVersion < 0 { status, decision = 400, "invalid-version" }
\treturn status, decision, replay`,
    anchors: ['expectedVersion\\s*==\\s*actualVersion', 'idempotencyMatch'],
    task: 'separate optimistic version conflicts from valid idempotency replay',
  },
  'http-server-go-authentication-sessions-tokens': {
    parameters: 'issuerOK bool, audienceOK bool, expiresInSeconds int, sessionRotated bool',
    result: '(string, bool)',
    body: `\tprincipal, accepted := "anonymous", false
\tif issuerOK && audienceOK && expiresInSeconds > 0 { principal, accepted = "member", true }
\tif expiresInSeconds > 3600 { accepted = false }
\tif accepted && !sessionRotated { principal, accepted = "stale-session", false }
\treturn principal, accepted`,
    anchors: ['issuerOK\\s*&&\\s*audienceOK', '!sessionRotated'],
    task: 'validate token claims and session rotation before constructing a principal',
  },
  'http-server-go-authorization-tenancy': {
    parameters: 'subjectTenant string, resourceTenant string, action string, propertyAllowed bool',
    result: '(bool, string)',
    body: `\tallowed, reason := false, "deny-by-default"
\tif subjectTenant != "" && subjectTenant == resourceTenant && action == "read" { allowed, reason = true, "tenant-read" }
\tif !propertyAllowed { allowed, reason = false, "property-denied" }
\treturn allowed, reason`,
    anchors: ['subjectTenant\\s*==\\s*resourceTenant', 'propertyAllowed'],
    task: 'enforce tenant, action, and property authorization as resource policy',
  },
  'http-server-go-browser-cors-csrf-cookies': {
    parameters: 'originAllowed bool, methodSafe bool, csrfTokenMatches bool, sameSite bool',
    result: '(bool, bool, string)',
    body: `\tshareResponse := originAllowed
\tmutate, reason := methodSafe, "safe-method"
\tif !methodSafe { mutate, reason = csrfTokenMatches && sameSite, "csrf-check" }
\tif !originAllowed { shareResponse = false }
\treturn shareResponse, mutate, reason`,
    anchors: ['csrfTokenMatches\\s*&&\\s*sameSite', 'shareResponse'],
    task: 'keep CORS response sharing separate from CSRF mutation authorization',
  },
  'http-server-go-webhooks-abuse-ssrf': {
    parameters: 'signatureValid bool, ageSeconds int, replaySeen bool, destinationPublic bool',
    result: '(int, string, bool)',
    body: `\tstatus, reason, enqueue := 401, "signature", false
\tif signatureValid && ageSeconds >= 0 && ageSeconds <= 300 { status, reason, enqueue = 202, "accepted", true }
\tif replaySeen { status, reason, enqueue = 409, "replay", false }
\tif !destinationPublic { status, reason, enqueue = 403, "egress-denied", false }
\treturn status, reason, enqueue`,
    anchors: ['ageSeconds\\s*<=\\s*300', '!destinationPublic'],
    task: 'combine raw-message webhook authentication, replay bounds, and SSRF egress policy',
  },
  'http-server-go-reverse-proxy-smuggling': {
    parameters: 'trustedHops int, contentLength int, transferEncoding bool, rewriteSafe bool',
    result: '(bool, string, int)',
    body: `\tforward, reason := rewriteSafe, "rewrite"
\tif trustedHops < 0 || trustedHops > 2 { forward, reason = false, "forwarded-chain" }
\tif contentLength >= 0 && transferEncoding { forward, reason = false, "ambiguous-framing" }
\tif !rewriteSafe { forward, reason = false, "director-rejected" }
\treturn forward, reason, trustedHops`,
    anchors: ['contentLength\\s*>=\\s*0\\s*&&\\s*transferEncoding', 'director-rejected'],
    task: 'reject ambiguous framing and deprecated Director-style proxy mutation',
  },
  'http-server-go-testing-fuzz-race': {
    parameters: 'handlerCases int, fuzzCases int, raceFree bool, leakedGoroutines int',
    result: '(bool, string)',
    body: `\tpassed, layer := handlerCases >= 3, "handler"
\tif fuzzCases <= 0 { passed, layer = false, "fuzz" }
\tif !raceFree { passed, layer = false, "race" }
\tif leakedGoroutines != 0 { passed, layer = false, "leak" }
\treturn passed, layer`,
    anchors: ['fuzzCases\\s*<=\\s*0', 'leakedGoroutines\\s*!=\\s*0'],
    task: 'gate release on handler, fuzz, race, and goroutine-lifecycle evidence',
  },
  'http-server-go-observability-health-performance': {
    parameters: 'routeKnown bool, status int, queueDepth int, queueCapacity int',
    result: '(string, bool, bool)',
    body: `\tspanName := "HTTP request"
\tif routeKnown { spanName = "GET /incidents/{id}" }
\terrorStatus := status >= 500
\tready := queueCapacity > 0 && queueDepth < queueCapacity
\treturn spanName, errorStatus, ready`,
    anchors: ['status\\s*>=\\s*500', 'queueDepth\\s*<\\s*queueCapacity'],
    task: 'use bounded route telemetry and distinguish server errors from readiness capacity',
  },
  'http-server-go-contracts-versioning-release': {
    parameters:
      'specMatches bool, migrationExpanded bool, canaryHealthy bool, drainingComplete bool',
    result: '(bool, string)',
    body: `\trelease, gate := false, "contract"
\tif specMatches && migrationExpanded { release, gate = true, "canary" }
\tif release && !canaryHealthy { release, gate = false, "rollback" }
\tif release && !drainingComplete { release, gate = false, "drain" }
\treturn release, gate`,
    anchors: ['specMatches\\s*&&\\s*migrationExpanded', '!canaryHealthy'],
    task: 'gate one OpenAPI-compatible, expand-first, canary, drain, and rollback release',
  },
};

const ENVIRONMENTS = [
  'civic incident API behind one trusted regional proxy',
  'multi-tenant case service with a bounded PostgreSQL pool',
  'public status API serving assistive and low-bandwidth clients',
  'signed fulfillment webhook gateway under replay attack',
  'canary service revision draining long-lived streams',
  'partner API with an outdated generated client',
  'internal administrative API crossing two trust zones',
  'bursting intake service near its concurrency ceiling',
  'privacy-sensitive records API using conditional requests',
  'recovery rehearsal with an ambiguous database commit',
];

const CHANGES = [
  'repeat the request with a different method and retain status plus durable-effect evidence',
  'lower the byte or time budget and prove rejection occurs at the owning boundary',
  'remove one trusted intermediary and recompute authority without forwarded fields',
  'change the tenant and show deny-by-default before repository access',
  'cancel during the dependency phase and preserve cleanup plus response ownership',
  'saturate one admission budget while another tenant remains serviceable',
  'replay the same operation key with different content and reject the mismatch',
  'return a five-hundred response and retain a low-cardinality causal trace',
  'drain the old revision while a canary fails its changed-case invariant',
  'make specification and runtime disagree on one nullable field and block release',
];

function requiredLookaheads(anchors, scope) {
  return anchors.map((anchor) => `(?=${scope}*?${anchor})`).join('');
}

function details(suffix) {
  const value = Number.parseInt(suffix.replace(/[^a-z0-9]/gi, '').slice(-6), 36) || 0;
  return {
    caseNumber: (value % 9000) + 1000,
    environment: ENVIRONMENTS[value % ENVIRONMENTS.length],
    changedCase: CHANGES[Math.floor(value / 7) % CHANGES.length],
  };
}

export function httpServerGoScenario(moduleId, seed, activityKind = 'practice', competency) {
  const spec = SPECS[moduleId];
  if (!spec) throw new Error(`Missing Go HTTP server scenario profile for ${moduleId}`);
  const chosen = details(seed.toString(36));
  const probe = competency ? ` Competency probe: ${competency.statement}` : '';
  return `A ${activityKind} team handles case ${chosen.caseNumber} in a ${chosen.environment}. Build deterministic Go evidence to ${spec.task}; then ${chosen.changedCase}. Browser code models decisions only. Listener, TLS, database, proxy, race, load, and production behavior require explicit authorized transfer gates.${probe}`;
}

export function httpServerGoEvidenceContract({
  competencyId,
  moduleId,
  functionName,
  marker,
  suffix,
}) {
  const spec = SPECS[moduleId];
  if (!spec) throw new Error(`Missing Go HTTP server evidence profile for ${moduleId}`);
  const chosen = details(suffix);
  const withinEvidenceBlock = '(?:(?!// Evidence:)[\\s\\S])';
  return {
    marker,
    pattern: `${marker}${withinEvidenceBlock}*?func\\s+${functionName}\\s*\\([^)]*\\)\\s*(?:\\([^)]*\\)|[A-Za-z][A-Za-z0-9]*)\\s*\\{${requiredLookaheads(spec.anchors, withinEvidenceBlock)}(?=${withinEvidenceBlock}*?return)${withinEvidenceBlock}*?return`,
    example: `${marker}
// Competency: ${competencyId}.
// Case ${chosen.caseNumber}: ${chosen.environment}.
// Changed case: ${chosen.changedCase}.
func ${functionName}(${spec.parameters}) ${spec.result} {
${spec.body}
}`,
    requirement: `Append a compile-ready pure-Go function headed "${marker}" that uses case ${chosen.caseNumber} to ${spec.task}. Return observable changed-case evidence. The browser must not open listeners, contact networks or databases, read host state, or use credentials; verify those boundaries later with the named Go 1.26 transfer gates.`,
  };
}

export function httpServerGoWorkedExample(moduleId, seed) {
  const suffix = `worked${seed}`;
  return httpServerGoEvidenceContract({
    competencyId: `httpsgo-worked-${moduleId}-${seed}`,
    moduleId,
    functionName: `worked_${moduleId.replaceAll('-', '_')}_${seed}`,
    marker: `// Evidence: httpsgo-worked-${moduleId}-${seed}`,
    suffix,
  }).example;
}

export const httpServerGoEvidenceModuleIds = Object.freeze(Object.keys(SPECS));

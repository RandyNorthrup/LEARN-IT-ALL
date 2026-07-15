const SPECS = {
  'http-server-ts-outcomes-toolchain': {
    parameters: 'runtime: string, cleanInstall: boolean, typeGate: boolean',
    result: '{ reproducible: boolean; gate: string }',
    body: `  const supported = runtime === "node-24.18";
  if (!supported) return { reproducible: false, gate: "runtime" };
  if (!cleanInstall) return { reproducible: false, gate: "lock-install" };
  return { reproducible: typeGate, gate: typeGate ? "artifact" : "types" };`,
    anchors: ['runtime\\s*===\\s*["\']node-24\\.18["\']', '!cleanInstall', 'typeGate'],
    task: 'gate a reproducible Node and TypeScript artifact instead of trusting local residue',
  },
  'http-server-ts-node-runtime-lifecycle': {
    parameters: 'configured: boolean, dependencyReady: boolean, draining: boolean',
    result: '{ phase: string; admit: boolean }',
    body: `  let phase = configured ? "starting" : "configuration-failed";
  let admit = configured && dependencyReady && !draining;
  if (admit) phase = "ready";
  if (draining) {
    phase = "draining";
    admit = false;
  }
  return { phase, admit };`,
    anchors: ['configured\\s*&&\\s*dependencyReady', 'if\\s*\\(draining\\)'],
    task: 'separate configuration, readiness, admission, and signal-driven draining',
  },
  'http-server-ts-http-semantics-resources': {
    parameters: 'method: string, exists: boolean, validatorMatches: boolean',
    result: '{ status: number; mutates: boolean }',
    body: `  const normalized = method.toUpperCase();
  if (normalized === "GET") return { status: exists ? 200 : 404, mutates: false };
  if (normalized === "PUT" && !validatorMatches) return { status: 412, mutates: false };
  if (normalized === "PUT") return { status: exists ? 200 : 201, mutates: true };
  return { status: 405, mutates: false };`,
    anchors: ['toUpperCase', 'validatorMatches', 'status:\\s*412'],
    task: 'connect method semantics, resource state, preconditions, status, and durable effect',
  },
  'http-server-ts-node-http-protocol-timeouts': {
    parameters:
      'protocol: "http/1.1" | "h2" | "h3", headersMs: number, requestMs: number, draining: boolean',
    result: '{ serve: boolean; reason: string }',
    body: `  if (protocol === "h3") return { serve: false, reason: "external-http3-boundary" };
  if (headersMs <= 0 || requestMs < headersMs) {
    return { serve: false, reason: "invalid-timeout-budget" };
  }
  if (draining) return { serve: false, reason: "draining" };
  return { serve: true, reason: protocol };`,
    anchors: ['protocol\\s*===\\s*["\']h3["\']', 'requestMs\\s*<\\s*headersMs', 'draining'],
    task: 'gate protocol support with explicit header, request, and drain policy',
  },
  'http-server-ts-express-routing-paths': {
    parameters: 'method: string, path: string, wildcardParts: readonly string[]',
    result: '{ route: string; status: number }',
    body: `  const normalized = method.toUpperCase();
  if (normalized === "GET" && path === "/incidents/latest") {
    return { route: "GET /incidents/latest", status: 200 };
  }
  if (normalized === "GET" && wildcardParts.length === 1) {
    return { route: "GET /incidents/{*parts}", status: 200 };
  }
  return { route: "unmatched", status: 404 };`,
    anchors: ['incidents/latest', 'wildcardParts\\.length\\s*===\\s*1'],
    task: 'preserve Express 5 route order and named wildcard-array evidence',
  },
  'http-server-ts-middleware-errors-architecture': {
    parameters: 'trusted: boolean, parsed: boolean, authorized: boolean, headersSent: boolean',
    result: '{ stage: string; status: number; delegate: boolean }',
    body: `  if (headersSent) return { stage: "error-delegate", status: 500, delegate: true };
  if (!trusted) return { stage: "trust", status: 400, delegate: false };
  if (!parsed) return { stage: "parse", status: 422, delegate: false };
  if (!authorized) return { stage: "authorize", status: 403, delegate: false };
  return { stage: "handler", status: 204, delegate: false };`,
    anchors: ['headersSent', '!parsed', '!authorized'],
    task: 'trace defended middleware order while keeping error and response ownership explicit',
  },
  'http-server-ts-runtime-validation-types': {
    parameters: 'knownKeys: boolean, identifierValid: boolean, outputMinimal: boolean',
    result: '{ trusted: boolean; boundary: string }',
    body: `  if (!knownKeys) return { trusted: false, boundary: "strict-object" };
  if (!identifierValid) return { trusted: false, boundary: "identifier" };
  if (!outputMinimal) return { trusted: false, boundary: "response-schema" };
  return { trusted: true, boundary: "domain" };`,
    anchors: ['!knownKeys', '!identifierValid', '!outputMinimal'],
    task: 'admit unknown input through strict runtime and output schemas',
  },
  'http-server-ts-request-authority-proxy': {
    parameters: 'host: string, forwardedHost: string, trustedProxy: boolean',
    result: '{ authority: string; allowed: boolean }',
    body: `  const authority = trustedProxy && forwardedHost.length > 0 ? forwardedHost : host;
  const normalized = authority.toLowerCase();
  const allowed = normalized === "api.example.test" || normalized === "api.example.test:443";
  return { authority: normalized, allowed };`,
    anchors: ['trustedProxy\\s*&&\\s*forwardedHost', 'api\\.example\\.test:443'],
    task: 'derive authority only across an explicit trusted-proxy and host allow-list boundary',
  },
  'http-server-ts-fields-representations-cache': {
    parameters: 'acceptJson: boolean, etagMatches: boolean, privateData: boolean',
    result: '{ status: number; cacheControl: string; vary: string }',
    body: `  if (!acceptJson) return { status: 406, cacheControl: "no-store", vary: "Accept" };
  const cacheControl = privateData ? "private, no-store" : "public, max-age=60";
  const status = etagMatches ? 304 : 200;
  return { status, cacheControl, vary: "Accept, Accept-Encoding" };`,
    anchors: ['status\\s*=\\s*etagMatches\\s*\\?\\s*304', 'privateData', 'Accept-Encoding'],
    task: 'keep negotiation, validators, compression variance, and privacy decisions separate',
  },
  'http-server-ts-bodies-webhooks-uploads': {
    parameters:
      'declaredBytes: number, decodedBytes: number, maximumBytes: number, rawPreserved: boolean',
    result: '{ status: number; parse: boolean; reason: string }',
    body: `  if (maximumBytes <= 0) return { status: 500, parse: false, reason: "invalid-limit" };
  if (declaredBytes > maximumBytes) {
    return { status: 413, parse: false, reason: "declared-size" };
  }
  if (decodedBytes < 0 || decodedBytes > maximumBytes) {
    return { status: 413, parse: false, reason: "decoded-size" };
  }
  return { status: rawPreserved ? 202 : 400, parse: rawPreserved, reason: "raw-signature" };`,
    anchors: [
      'declaredBytes\\s*>\\s*maximumBytes',
      'decodedBytes\\s*>\\s*maximumBytes',
      'rawPreserved',
    ],
    task: 'bound declared and decoded bodies while preserving exact signed webhook bytes',
  },
  'http-server-ts-responses-problems-streaming': {
    parameters: 'status: number, problemType: string, bufferedBytes: number, highWaterMark: number',
    result: '{ mediaType: string; continueWriting: boolean }',
    body: `  const mediaType = status >= 400 ? "application/problem+json" : "application/json";
  if (status >= 400 && problemType.length === 0) {
    return { mediaType: "invalid-problem", continueWriting: false };
  }
  const continueWriting = bufferedBytes >= 0 && bufferedBytes < highWaterMark;
  return { mediaType, continueWriting };`,
    anchors: ['application/problem\\+json', 'bufferedBytes\\s*<\\s*highWaterMark'],
    task: 'choose one response shape and stop a producer at the stream backpressure boundary',
  },
  'http-server-ts-async-context-cancellation': {
    parameters: 'remainingMs: number, cleanupReserveMs: number, disconnected: boolean',
    result: '{ start: boolean; dependencyMs: number; reason: string }',
    body: `  const dependencyMs = Math.max(0, remainingMs - cleanupReserveMs);
  if (disconnected) return { start: false, dependencyMs, reason: "client-abort" };
  if (cleanupReserveMs < 0 || dependencyMs === 0) {
    return { start: false, dependencyMs: 0, reason: "budget" };
  }
  return { start: true, dependencyMs, reason: "bounded-context" };`,
    anchors: ['remainingMs\\s*-\\s*cleanupReserveMs', 'disconnected', 'dependencyMs\\s*===\\s*0'],
    task: 'reserve cleanup time and combine client abort with one dependency budget',
  },
  'http-server-ts-concurrency-backpressure-workers': {
    parameters: 'active: number, capacity: number, queueDepth: number, tenantTokens: number',
    result: '{ admit: boolean; offloadCpu: boolean; reason: string }',
    body: `  if (active < 0 || capacity <= 0 || queueDepth < 0) {
    return { admit: false, offloadCpu: false, reason: "invalid-budget" };
  }
  if (tenantTokens <= 0) return { admit: false, offloadCpu: false, reason: "tenant-rate" };
  const admit = active < capacity && queueDepth < capacity * 2;
  return { admit, offloadCpu: admit && active > capacity / 2, reason: admit ? "capacity" : "shed" };`,
    anchors: [
      'tenantTokens\\s*<=\\s*0',
      'queueDepth\\s*<\\s*capacity\\s*\\*\\s*2',
      'capacity\\s*\\/\\s*2',
    ],
    task: 'combine concurrency, queue, tenant-rate, and bounded CPU-offload decisions',
  },
  'http-server-ts-postgres-pools-transactions': {
    parameters: 'clientAcquired: boolean, statementsSucceeded: boolean, commitKnown: boolean',
    result: '{ outcome: string; release: boolean; retry: boolean }',
    body: `  if (!clientAcquired) return { outcome: "pool-unavailable", release: false, retry: true };
  if (!statementsSucceeded) return { outcome: "rollback", release: true, retry: false };
  if (!commitKnown) return { outcome: "ambiguous-commit", release: true, retry: false };
  return { outcome: "committed", release: true, retry: false };`,
    anchors: ['!clientAcquired', '!commitKnown', 'ambiguous-commit'],
    task: 'classify pool, transaction, release, and ambiguous-commit evidence without blind replay',
  },
  'http-server-ts-resource-apis-consistency': {
    parameters:
      'fingerprintMatches: boolean, expectedVersion: number, actualVersion: number, outboxStored: boolean',
    result: '{ status: number; decision: string; publish: boolean }',
    body: `  if (!fingerprintMatches) return { status: 409, decision: "idempotency-mismatch", publish: false };
  if (expectedVersion !== actualVersion) {
    return { status: 412, decision: "version-conflict", publish: false };
  }
  return { status: outboxStored ? 200 : 503, decision: "updated", publish: outboxStored };`,
    anchors: ['!fingerprintMatches', 'expectedVersion\\s*!==\\s*actualVersion', 'outboxStored'],
    task: 'join idempotency fingerprints, optimistic concurrency, and transactional outbox evidence',
  },
  'http-server-ts-authentication-sessions-jose': {
    parameters:
      'issuerOk: boolean, audienceOk: boolean, expiresInSeconds: number, sessionRotated: boolean',
    result: '{ principal: string; accepted: boolean }',
    body: `  const claimsValid = issuerOk && audienceOk && expiresInSeconds > 0 && expiresInSeconds <= 3600;
  if (!claimsValid) return { principal: "anonymous", accepted: false };
  if (!sessionRotated) return { principal: "stale-session", accepted: false };
  return { principal: "member", accepted: true };`,
    anchors: ['issuerOk\\s*&&\\s*audienceOk', 'expiresInSeconds\\s*<=\\s*3600', '!sessionRotated'],
    task: 'validate bounded token claims and session rotation before constructing a principal',
  },
  'http-server-ts-authorization-tenancy': {
    parameters:
      'subjectTenant: string, resourceTenant: string, action: string, propertyAllowed: boolean',
    result: '{ allowed: boolean; reason: string }',
    body: `  if (subjectTenant.length === 0 || subjectTenant !== resourceTenant) {
    return { allowed: false, reason: "tenant-denied" };
  }
  if (action !== "read" && action !== "update") return { allowed: false, reason: "function-denied" };
  if (!propertyAllowed) return { allowed: false, reason: "property-denied" };
  return { allowed: true, reason: "resource-policy" };`,
    anchors: [
      'subjectTenant\\s*!==\\s*resourceTenant',
      'action\\s*!==\\s*["\']read["\']',
      '!propertyAllowed',
    ],
    task: 'enforce tenant, object action, and property policy as one deny-by-default decision',
  },
  'http-server-ts-browser-cors-csrf-cookies': {
    parameters:
      'originAllowed: boolean, safeMethod: boolean, csrfMatches: boolean, sameSite: boolean',
    result: '{ share: boolean; mutate: boolean; reason: string }',
    body: `  const share = originAllowed;
  if (safeMethod) return { share, mutate: false, reason: "safe-method" };
  const mutate = csrfMatches && sameSite;
  return { share, mutate, reason: mutate ? "csrf-defended" : "csrf-denied" };`,
    anchors: ['const\\s+share\\s*=\\s*originAllowed', 'csrfMatches\\s*&&\\s*sameSite'],
    task: 'keep CORS response sharing distinct from CSRF mutation authorization',
  },
  'http-server-ts-webhooks-ssrf-abuse': {
    parameters:
      'signatureValid: boolean, ageSeconds: number, replaySeen: boolean, publicDestination: boolean',
    result: '{ status: number; enqueue: boolean; egress: boolean }',
    body: `  const fresh = ageSeconds >= 0 && ageSeconds <= 300;
  if (!signatureValid || !fresh) return { status: 401, enqueue: false, egress: false };
  if (replaySeen) return { status: 409, enqueue: false, egress: false };
  if (!publicDestination) return { status: 403, enqueue: false, egress: false };
  return { status: 202, enqueue: true, egress: true };`,
    anchors: ['ageSeconds\\s*<=\\s*300', 'replaySeen', '!publicDestination'],
    task: 'combine signed ingress freshness, replay defense, and SSRF egress policy',
  },
  'http-server-ts-proxy-framing-smuggling': {
    parameters:
      'trustedHops: number, contentLengthCount: number, hasTransferEncoding: boolean, insecureParser: boolean',
    result: '{ forward: boolean; reason: string }',
    body: `  if (trustedHops < 0 || trustedHops > 2) return { forward: false, reason: "forwarded-topology" };
  if (contentLengthCount !== 1 || hasTransferEncoding) {
    return { forward: false, reason: "ambiguous-framing" };
  }
  if (insecureParser) return { forward: false, reason: "parser-policy" };
  return { forward: true, reason: "consistent-hops" };`,
    anchors: ['trustedHops\\s*>\\s*2', 'contentLengthCount\\s*!==\\s*1', 'insecureParser'],
    task: 'reject untrusted topology, ambiguous framing, and insecure parser policy',
  },
  'http-server-ts-testing-contracts-fuzz': {
    parameters:
      'domainCases: number, handlerCases: number, fuzzFailures: number, leakedResources: number',
    result: '{ release: boolean; gate: string }',
    body: `  if (domainCases < 3) return { release: false, gate: "domain" };
  if (handlerCases < 3) return { release: false, gate: "handler" };
  if (fuzzFailures !== 0) return { release: false, gate: "fuzz" };
  if (leakedResources !== 0) return { release: false, gate: "leak" };
  return { release: true, gate: "fault-matrix" };`,
    anchors: ['handlerCases\\s*<\\s*3', 'fuzzFailures\\s*!==\\s*0', 'leakedResources\\s*!==\\s*0'],
    task: 'gate release on layered domain, handler, fuzz, and resource-lifecycle evidence',
  },
  'http-server-ts-observability-health': {
    parameters: 'routeKnown: boolean, status: number, queueDepth: number, queueCapacity: number',
    result: '{ spanName: string; error: boolean; ready: boolean }',
    body: `  const spanName = routeKnown ? "GET /incidents/{id}" : "HTTP request";
  const error = status >= 500;
  const ready = queueCapacity > 0 && queueDepth >= 0 && queueDepth < queueCapacity;
  return { spanName, error, ready };`,
    anchors: ['routeKnown\\s*\\?', 'status\\s*>=\\s*500', 'queueDepth\\s*<\\s*queueCapacity'],
    task: 'emit bounded route telemetry and distinguish server errors from readiness capacity',
  },
  'http-server-ts-performance-capacity': {
    parameters: 'p95Ms: number, budgetMs: number, eventLoopLagMs: number, utilization: number',
    result: '{ pass: boolean; bottleneck: string }',
    body: `  if (p95Ms < 0 || budgetMs <= 0 || eventLoopLagMs < 0 || utilization < 0) {
    return { pass: false, bottleneck: "invalid-measurement" };
  }
  const bottleneck = eventLoopLagMs > 50 ? "event-loop" : utilization > 0.8 ? "capacity" : "none";
  return { pass: p95Ms <= budgetMs && bottleneck === "none", bottleneck };`,
    anchors: ['eventLoopLagMs\\s*>\\s*50', 'utilization\\s*>\\s*0\\.8', 'p95Ms\\s*<=\\s*budgetMs'],
    task: 'gate tail latency with event-loop and utilization capacity evidence',
  },
  'http-server-ts-openapi-release-recovery': {
    parameters:
      'contractMatches: boolean, migrationExpanded: boolean, canaryHealthy: boolean, drained: boolean',
    result: '{ release: boolean; gate: string }',
    body: `  if (!contractMatches) return { release: false, gate: "contract" };
  if (!migrationExpanded) return { release: false, gate: "expand" };
  if (!canaryHealthy) return { release: false, gate: "rollback" };
  if (!drained) return { release: false, gate: "drain" };
  return { release: true, gate: "recoverable" };`,
    anchors: ['!contractMatches', '!migrationExpanded', '!canaryHealthy', '!drained'],
    task: 'gate one contract-compatible, expand-first, canary, drain, and recoverable release',
  },
};

const ENVIRONMENTS = [
  'public incident API behind one regional edge proxy',
  'multi-tenant case service with a bounded PostgreSQL pool',
  'accessible status API serving assistive and low-bandwidth clients',
  'signed fulfillment webhook gateway under replay pressure',
  'canary revision draining long-lived response streams',
  'partner integration using an older generated TypeScript client',
  'administrative API crossing two identity and network trust zones',
  'burst intake service near its event-loop and queue limits',
  'privacy-sensitive records API using conditional requests',
  'recovery drill following an uncertain transaction commit',
  'document service receiving slow compressed uploads',
  'browser application using cookie authentication across approved origins',
];

const CHANGES = [
  'change the method and preserve both status and durable-effect evidence',
  'lower a byte or time budget and prove rejection occurs at its owner',
  'remove one trusted proxy hop and recompute authority from the socket boundary',
  'change the tenant and prove denial before repository access',
  'abort during a dependency phase and preserve cleanup plus response ownership',
  'saturate one tenant budget while another tenant remains serviceable',
  'reuse an idempotency key with different input and reject the fingerprint mismatch',
  'emit a server error and retain one low-cardinality causal trace',
  'fail the canary while the old revision drains and prove rollback remains safe',
  'make OpenAPI and runtime disagree on nullability and block the release',
  'replace an average latency claim with p95 and event-loop saturation evidence',
  'rotate a signing key while an old valid session remains within policy',
];

const CONSTRAINTS = [
  'retain a screen-reader-readable decision trace',
  'preserve one tenant fairness invariant',
  'keep peak memory below the stated byte ceiling',
  'prove cleanup before the service deadline expires',
  'record only bounded redacted diagnostic fields',
  'survive a dependency slowdown without queue growth',
  'retain compatibility with one older generated client',
  'keep rollback safe during a storage expansion',
  'reject a replay before any external effect',
  'distinguish proxy evidence from origin evidence',
  'preserve response ownership after a client abort',
  'show recovery after the overload input is removed',
];

function requiredLookaheads(anchors, scope) {
  return anchors.map((anchor) => `(?=${scope}*?${anchor})`).join('');
}

function details(suffix) {
  const cleaned = suffix.replace(/[^a-z0-9]/gi, '').toLowerCase() || '000';
  let value = 2166136261;
  for (const character of cleaned) {
    value ^= character.charCodeAt(0);
    value = Math.imul(value, 16777619);
  }
  value >>>= 0;
  const first = Number.parseInt(cleaned[0] ?? '0', 36);
  const second = Number.parseInt(cleaned[1] ?? '0', 36);
  const last = Number.parseInt(cleaned.at(-1) ?? '0', 36);
  return {
    caseNumber: (value % 9000) + 1000,
    environment: ENVIRONMENTS[first % ENVIRONMENTS.length],
    changedCase: CHANGES[last % CHANGES.length],
    constraint: CONSTRAINTS[second % CONSTRAINTS.length],
  };
}

export function httpServerTypescriptScenario(
  moduleId,
  seed,
  activityKind = 'practice',
  competency
) {
  const spec = SPECS[moduleId];
  if (!spec) throw new Error(`Missing TypeScript HTTP server scenario profile for ${moduleId}`);
  const chosen = details(seed.toString(36));
  const probe = competency ? ` Competency probe: ${competency.statement}` : '';
  return `A ${activityKind} team handles case ${chosen.caseNumber} in a ${chosen.environment}. Build deterministic TypeScript evidence to ${spec.task}; ${chosen.constraint}; then ${chosen.changedCase}. Browser code models pure decisions only. Node, Express, listener, TLS, PostgreSQL, proxy, worker, load, and production behavior require explicit authorized transfer gates.${probe}`;
}

export function httpServerTypescriptEvidenceContract({
  competencyId,
  moduleId,
  functionName,
  marker,
  suffix,
}) {
  const spec = SPECS[moduleId];
  if (!spec) throw new Error(`Missing TypeScript HTTP server evidence profile for ${moduleId}`);
  const chosen = details(suffix);
  const withinEvidenceBlock = '(?:(?!// Evidence:)[\\s\\S])';
  return {
    marker,
    pattern: `${marker}${withinEvidenceBlock}*?function\\s+${functionName}\\s*\\([^)]*\\)\\s*:\\s*\\{[^}]+\\}\\s*\\{${requiredLookaheads(spec.anchors, withinEvidenceBlock)}(?=${withinEvidenceBlock}*?return)${withinEvidenceBlock}*?return`,
    example: `${marker}
// Competency: ${competencyId}.
// Case ${chosen.caseNumber}: ${chosen.environment}.
// Operating constraint: ${chosen.constraint}.
// Changed case: ${chosen.changedCase}.
function ${functionName}(${spec.parameters}): ${spec.result} {
${spec.body}
}`,
    requirement: `Append a compile-ready pure-TypeScript function headed "${marker}" that uses case ${chosen.caseNumber} to ${spec.task}. Return observable changed-case evidence. Browser code must not import Node or Express, open listeners, contact networks or databases, spawn workers, read host state, or use credentials; verify those boundaries later with the named Node 24 and Express 5 transfer gates.`,
  };
}

export function httpServerTypescriptWorkedExample(moduleId, seed) {
  return httpServerTypescriptEvidenceContract({
    competencyId: `httpsts-worked-${moduleId}-${seed}`,
    moduleId,
    functionName: `worked_${moduleId.replaceAll('-', '_')}_${seed}`,
    marker: `// Evidence: httpsts-worked-${moduleId}-${seed}`,
    suffix: `worked${seed}`,
  }).example;
}

export const httpServerTypescriptEvidenceModuleIds = Object.freeze(Object.keys(SPECS));

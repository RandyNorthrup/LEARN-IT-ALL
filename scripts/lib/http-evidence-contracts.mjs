function moduleArea(moduleId) {
  return moduleId.replace(/^http-(?:go|ts|py)-/, '');
}

function requiredLookaheads(anchors, scope = '[\\s\\S]') {
  return anchors.map((anchor) => `(?=${scope}*?${anchor})`).join('');
}

function typeScriptSpec(area) {
  const specs = {
    'semantics-evidence': {
      parameters: 'role: "client" | "server" | "proxy", status: number',
      result: '{ stage: string; accepted: boolean }',
      body: `  if (!Number.isInteger(status) || status < 100 || status > 599) {
    return { stage: "invalid status", accepted: false };
  }
  const stage = role === "proxy" ? "intermediary" : role;
  return { stage, accepted: status >= 200 && status < 400 };`,
      anchors: ['status\\s*<\\s*100', 'role\\s*===\\s*["\']proxy["\']'],
      task: 'classify one protocol role and status without collapsing intermediary or failure stages',
    },
    'uris-origins-dns': {
      parameters: 'target: string, allowedHosts: readonly string[]',
      result: '{ accepted: boolean; host: string }',
      body: `  try {
    const parsed = new URL(target);
    const accepted = parsed.protocol === "https:" && allowedHosts.includes(parsed.hostname);
    return { accepted, host: parsed.hostname };
  } catch {
    return { accepted: false, host: "invalid" };
  }`,
      anchors: ['new\\s+URL', 'allowedHosts\\.includes'],
      task: 'parse a target, preserve its host identity, and enforce an HTTPS host allow-list',
    },
    'requests-methods': {
      parameters: 'method: string, replayable: boolean',
      result: '{ method: string; safe: boolean; retryable: boolean }',
      body: `  const normalized = method.toUpperCase();
  const safe = normalized === "GET" || normalized === "HEAD" || normalized === "OPTIONS";
  const idempotent = safe || normalized === "PUT" || normalized === "DELETE";
  if (!replayable && !safe) return { method: normalized, safe, retryable: false };
  return { method: normalized, safe, retryable: idempotent && replayable };`,
      anchors: ['toUpperCase', 'idempotent'],
      task: 'derive safe, idempotent, and replayable request evidence instead of guessing from one verb',
    },
    'fields-representations': {
      parameters: 'contentType: string, acceptedTypes: readonly string[], bodyBytes: number',
      result: '{ mediaType: string; accepted: boolean }',
      body: `  const mediaType = contentType.split(";", 1)[0]?.trim().toLowerCase() ?? "";
  if (bodyBytes < 0 || bodyBytes > 1_048_576) return { mediaType, accepted: false };
  return { mediaType, accepted: acceptedTypes.includes(mediaType) };`,
      anchors: ['split\\s*\\(', 'acceptedTypes\\.includes'],
      task: 'separate media type parameters from bounded representation acceptance',
    },
    'responses-errors': {
      parameters: 'status: number, problemType: string | null',
      result: '{ kind: "success" | "redirect" | "problem" | "invalid"; terminal: boolean }',
      body: `  if (!Number.isInteger(status) || status < 100 || status > 599) {
    return { kind: "invalid", terminal: true };
  }
  if (status >= 200 && status < 300) return { kind: "success", terminal: status !== 202 };
  if (status >= 300 && status < 400) return { kind: "redirect", terminal: false };
  return { kind: problemType ? "problem" : "invalid", terminal: true };`,
      anchors: ['status\\s*>=\\s*200', 'problemType'],
      task: 'classify success variants, redirects, and typed problem responses without treating every non-200 alike',
    },
    'body-streams-limits': {
      parameters: 'compressedBytes: number, decodedBytes: number, maximumDecodedBytes: number',
      result: '{ accepted: boolean; expansionRatio: number }',
      body: `  if (compressedBytes <= 0 || decodedBytes < 0 || maximumDecodedBytes <= 0) {
    return { accepted: false, expansionRatio: Number.POSITIVE_INFINITY };
  }
  const expansionRatio = decodedBytes / compressedBytes;
  return { accepted: decodedBytes <= maximumDecodedBytes && expansionRatio <= 100, expansionRatio };`,
      anchors: ['decodedBytes\\s*\\/\\s*compressedBytes', 'maximumDecodedBytes'],
      task: 'bound decoded bytes and compression expansion rather than trusting Content-Length alone',
    },
    'tls-trust': {
      parameters: 'scheme: string, hostnameMatches: boolean, chainTrusted: boolean',
      result: '{ accepted: boolean; reason: string }',
      body: `  if (scheme.toLowerCase() !== "https") return { accepted: false, reason: "downgrade" };
  if (!hostnameMatches) return { accepted: false, reason: "hostname" };
  if (!chainTrusted) return { accepted: false, reason: "trust chain" };
  return { accepted: true, reason: "authenticated transport" };`,
      anchors: ['https', 'hostnameMatches', 'chainTrusted'],
      task: 'require HTTPS, hostname identity, and chain trust as separate transport evidence',
    },
    'redirects-policy': {
      parameters: 'status: number, sameOrigin: boolean, hop: number, hasCredentials: boolean',
      result: '{ follow: boolean; preserveMethod: boolean; forwardCredentials: boolean }',
      body: `  const preserveMethod = status === 307 || status === 308;
  if (hop < 0 || hop >= 8) return { follow: false, preserveMethod, forwardCredentials: false };
  const redirectStatus = status >= 300 && status < 400;
  return {
    follow: redirectStatus,
    preserveMethod,
    forwardCredentials: redirectStatus && sameOrigin && hasCredentials,
  };`,
      anchors: ['status\\s*===\\s*307', 'hop\\s*>=\\s*8', 'sameOrigin'],
      task: 'decide redirect following, method preservation, hop limits, and credential forwarding independently',
    },
    'cookies-auth-secrets': {
      parameters:
        'credentialKind: "cookie" | "bearer" | "api-key", sameOrigin: boolean, redacted: boolean',
      result: '{ attach: boolean; loggable: boolean }',
      body: `  const ambient = credentialKind === "cookie";
  if (ambient && !sameOrigin) return { attach: false, loggable: false };
  if (!redacted) return { attach: false, loggable: false };
  return { attach: sameOrigin || !ambient, loggable: redacted };`,
      anchors: ['credentialKind\\s*===\\s*["\']cookie["\']', 'redacted'],
      task: 'separate ambient cookies, explicit credentials, origin scope, and redacted diagnostics',
    },
    'caching-validation': {
      parameters: 'ageSeconds: number, maxAgeSeconds: number, etag: string | null',
      result: '{ reusable: boolean; revalidate: boolean }',
      body: `  if (ageSeconds < 0 || maxAgeSeconds < 0) return { reusable: false, revalidate: false };
  const reusable = ageSeconds <= maxAgeSeconds;
  return { reusable, revalidate: !reusable && etag !== null && etag.length > 0 };`,
      anchors: ['ageSeconds\\s*<=\\s*maxAgeSeconds', 'etag\\s*!==\\s*null'],
      task: 'compute freshness and validator-driven revalidation as different cache decisions',
    },
    'timeouts-cancellation': {
      parameters: 'remainingMs: number, phaseBudgetMs: number, cleanupReserveMs: number',
      result: '{ start: boolean; usableMs: number }',
      body: `  if (remainingMs <= 0 || phaseBudgetMs <= 0 || cleanupReserveMs < 0) {
    return { start: false, usableMs: 0 };
  }
  const usableMs = Math.min(phaseBudgetMs, Math.max(0, remainingMs - cleanupReserveMs));
  return { start: usableMs > 0, usableMs };`,
      anchors: ['remainingMs\\s*-\\s*cleanupReserveMs', 'Math\\.min'],
      task: 'reserve cleanup time while allocating one phase from the caller deadline',
    },
    'retries-backoff': {
      parameters: 'method: string, replayable: boolean, attempt: number, maximumAttempts: number',
      result: '{ retry: boolean; delayMs: number }',
      body: `  const normalized = method.toUpperCase();
  const idempotent = normalized === "GET" || normalized === "HEAD" || normalized === "PUT";
  if (!replayable || !idempotent || attempt < 1 || attempt >= maximumAttempts) {
    return { retry: false, delayMs: 0 };
  }
  const delayMs = Math.min(8_000, 250 * 2 ** (attempt - 1));
  return { retry: true, delayMs };`,
      anchors: ['idempotent', 'maximumAttempts', '2\\s*\\*\\*'],
      task: 'gate retries by semantics, replayability, attempt budget, and capped backoff',
    },
    'connections-protocols': {
      parameters: 'protocol: "http/1.1" | "h2" | "h3", activeStreams: number, streamLimit: number',
      result: '{ admit: boolean; multiplexed: boolean }',
      body: `  if (activeStreams < 0 || streamLimit <= 0) return { admit: false, multiplexed: false };
  const multiplexed = protocol === "h2" || protocol === "h3";
  const effectiveLimit = multiplexed ? streamLimit : Math.min(1, streamLimit);
  return { admit: activeStreams < effectiveLimit, multiplexed };`,
      anchors: ['protocol\\s*===\\s*["\']h2["\']', 'effectiveLimit'],
      task: 'model protocol multiplexing and stream capacity without changing HTTP semantics',
    },
    'api-traversal-rates': {
      parameters: 'cursor: string | null, seenCursors: readonly string[], remainingBudget: number',
      result: '{ continue: boolean; reason: string }',
      body: `  if (remainingBudget <= 0) return { continue: false, reason: "budget" };
  if (cursor === null) return { continue: false, reason: "complete" };
  if (seenCursors.includes(cursor)) return { continue: false, reason: "cursor loop" };
  return { continue: true, reason: "checkpoint cursor" };`,
      anchors: ['remainingBudget', 'seenCursors\\.includes'],
      task: 'stop on budget exhaustion, completion, or repeated cursors while preserving resumable state',
    },
    'client-architecture': {
      parameters: 'baseUrl: string, timeoutMs: number, credentialProviderReady: boolean',
      result: '{ valid: boolean; origin: string }',
      body: `  try {
    const parsed = new URL(baseUrl);
    const valid = parsed.protocol === "https:" && timeoutMs > 0 && credentialProviderReady;
    return { valid, origin: parsed.origin };
  } catch {
    return { valid: false, origin: "invalid" };
  }`,
      anchors: ['new\\s+URL', 'credentialProviderReady'],
      task: 'validate one immutable client configuration boundary and expose only its origin',
    },
    'security-boundaries': {
      parameters:
        'scheme: string, hostAllowed: boolean, privateAddress: boolean, redirectAllowed: boolean',
      result: '{ accepted: boolean; reason: string }',
      body: `  if (scheme.toLowerCase() !== "https") return { accepted: false, reason: "scheme" };
  if (!hostAllowed || privateAddress) return { accepted: false, reason: "destination" };
  if (!redirectAllowed) return { accepted: false, reason: "redirect" };
  return { accepted: true, reason: "bounded authority" };`,
      anchors: ['hostAllowed', 'privateAddress', 'redirectAllowed'],
      task: 'enforce scheme, destination, address, and redirect policy as independent SSRF defenses',
    },
    'testing-observability': {
      parameters:
        'fault: "none" | "timeout" | "truncated", expectedStatus: number, observedStatus: number',
      result: '{ passed: boolean; errorType: string }',
      body: `  if (fault !== "none") return { passed: false, errorType: fault };
  const passed = expectedStatus === observedStatus;
  return { passed, errorType: passed ? "none" : "status-mismatch" };`,
      anchors: ['fault\\s*!==\\s*["\']none["\']', 'expectedStatus\\s*===\\s*observedStatus'],
      task: 'compare deterministic fault and status evidence using a low-cardinality error type',
    },
    'performance-release-defense': {
      parameters:
        'p95Ms: number, latencyBudgetMs: number, queueDepth: number, queueCapacity: number',
      result: '{ release: boolean; saturated: boolean }',
      body: `  if (p95Ms < 0 || latencyBudgetMs <= 0 || queueDepth < 0 || queueCapacity <= 0) {
    return { release: false, saturated: true };
  }
  const saturated = queueDepth >= queueCapacity;
  return { release: p95Ms <= latencyBudgetMs && !saturated, saturated };`,
      anchors: ['queueDepth\\s*>=\\s*queueCapacity', 'p95Ms\\s*<=\\s*latencyBudgetMs'],
      task: 'gate release on tail latency and saturation rather than one successful request',
    },
  };
  return specs[area];
}

function pythonSpec(area) {
  const specs = {
    'semantics-evidence': [
      'role: str, status: int',
      'dict[str, object]',
      `    assert role in {"client", "server", "proxy"}
    if not 100 <= status <= 599:
        return {"stage": "invalid status", "accepted": False}
    stage = "intermediary" if role == "proxy" else role
    return {"stage": stage, "accepted": 200 <= status < 400}`,
      ['role\\s*==\\s*["\']proxy["\']'],
      'classify protocol role and status evidence',
    ],
    'uris-origins-dns': [
      'target: str, host: str, allowed_hosts: set[str]',
      'dict[str, object]',
      `    assert isinstance(target, str) and isinstance(host, str)
    https = target.startswith("https://")
    accepted = https and host.casefold() in {item.casefold() for item in allowed_hosts}
    return {"accepted": accepted, "host": host.casefold()}`,
      ['startswith\\s*\\(["\']https://', 'allowed_hosts'],
      'validate HTTPS target and canonical host membership',
    ],
    'requests-methods': [
      'method: str, replayable: bool',
      'dict[str, object]',
      `    assert isinstance(method, str) and isinstance(replayable, bool)
    normalized = method.upper()
    safe = normalized in {"GET", "HEAD", "OPTIONS"}
    idempotent = safe or normalized in {"PUT", "DELETE"}
    return {"method": normalized, "safe": safe, "retryable": idempotent and replayable}`,
      ['idempotent', 'replayable'],
      'derive safe, idempotent, and replayable request evidence',
    ],
    'fields-representations': [
      'content_type: str, accepted_types: set[str], body_bytes: int',
      'dict[str, object]',
      `    assert isinstance(content_type, str) and isinstance(body_bytes, int)
    media_type = content_type.partition(";")[0].strip().casefold()
    accepted = 0 <= body_bytes <= 1_048_576 and media_type in accepted_types
    return {"media_type": media_type, "accepted": accepted}`,
      ['partition\\s*\\(["\'];["\']', 'accepted_types'],
      'separate media type parameters from bounded representation acceptance',
    ],
    'responses-errors': [
      'status: int, problem_type: str | None',
      'dict[str, object]',
      `    assert isinstance(status, int)
    if not 100 <= status <= 599:
        return {"kind": "invalid", "terminal": True}
    if 200 <= status < 300:
        return {"kind": "success", "terminal": status != 202}
    if 300 <= status < 400:
        return {"kind": "redirect", "terminal": False}
    return {"kind": "problem" if problem_type else "invalid", "terminal": True}`,
      ['200\\s*<=\\s*status', 'problem_type'],
      'classify success variants, redirects, and typed problems',
    ],
    'body-streams-limits': [
      'compressed_bytes: int, decoded_bytes: int, maximum_decoded_bytes: int',
      'dict[str, object]',
      `    assert all(isinstance(value, int) for value in (compressed_bytes, decoded_bytes, maximum_decoded_bytes))
    if compressed_bytes <= 0 or decoded_bytes < 0 or maximum_decoded_bytes <= 0:
        return {"accepted": False, "expansion_ratio": float("inf")}
    expansion_ratio = decoded_bytes / compressed_bytes
    return {"accepted": decoded_bytes <= maximum_decoded_bytes and expansion_ratio <= 100, "expansion_ratio": expansion_ratio}`,
      ['decoded_bytes\\s*/\\s*compressed_bytes', 'maximum_decoded_bytes'],
      'bound decoded bytes and compression expansion',
    ],
    'tls-trust': [
      'scheme: str, hostname_matches: bool, chain_trusted: bool',
      'dict[str, object]',
      `    assert isinstance(scheme, str)
    if scheme.casefold() != "https":
        return {"accepted": False, "reason": "downgrade"}
    if not hostname_matches:
        return {"accepted": False, "reason": "hostname"}
    if not chain_trusted:
        return {"accepted": False, "reason": "trust chain"}
    return {"accepted": True, "reason": "authenticated transport"}`,
      ['hostname_matches', 'chain_trusted'],
      'require HTTPS, hostname identity, and chain trust separately',
    ],
    'redirects-policy': [
      'status: int, same_origin: bool, hop: int, has_credentials: bool',
      'dict[str, object]',
      `    assert isinstance(status, int) and isinstance(hop, int)
    preserve_method = status in {307, 308}
    if not 0 <= hop < 8:
        return {"follow": False, "preserve_method": preserve_method, "forward_credentials": False}
    redirect_status = 300 <= status < 400
    return {"follow": redirect_status, "preserve_method": preserve_method, "forward_credentials": redirect_status and same_origin and has_credentials}`,
      ['307', 'hop\\s*<\\s*8', 'same_origin'],
      'decide redirect, method, hop, and credential policy',
    ],
    'cookies-auth-secrets': [
      'credential_kind: str, same_origin: bool, redacted: bool',
      'dict[str, bool]',
      `    assert credential_kind in {"cookie", "bearer", "api-key"}
    ambient = credential_kind == "cookie"
    if ambient and not same_origin:
        return {"attach": False, "loggable": False}
    if not redacted:
        return {"attach": False, "loggable": False}
    return {"attach": same_origin or not ambient, "loggable": redacted}`,
      ['credential_kind\\s*==\\s*["\']cookie["\']', 'redacted'],
      'separate ambient authority, origin scope, and redaction',
    ],
    'caching-validation': [
      'age_seconds: int, max_age_seconds: int, etag: str | None',
      'dict[str, bool]',
      `    assert isinstance(age_seconds, int) and isinstance(max_age_seconds, int)
    if age_seconds < 0 or max_age_seconds < 0:
        return {"reusable": False, "revalidate": False}
    reusable = age_seconds <= max_age_seconds
    return {"reusable": reusable, "revalidate": not reusable and bool(etag)}`,
      ['age_seconds\\s*<=\\s*max_age_seconds', 'etag'],
      'compute freshness and validator revalidation separately',
    ],
    'timeouts-cancellation': [
      'remaining_ms: int, phase_budget_ms: int, cleanup_reserve_ms: int',
      'dict[str, object]',
      `    assert all(isinstance(value, int) for value in (remaining_ms, phase_budget_ms, cleanup_reserve_ms))
    if remaining_ms <= 0 or phase_budget_ms <= 0 or cleanup_reserve_ms < 0:
        return {"start": False, "usable_ms": 0}
    usable_ms = min(phase_budget_ms, max(0, remaining_ms - cleanup_reserve_ms))
    return {"start": usable_ms > 0, "usable_ms": usable_ms}`,
      ['remaining_ms\\s*-\\s*cleanup_reserve_ms', 'min\\s*\\('],
      'reserve cleanup time inside caller deadline',
    ],
    'retries-backoff': [
      'method: str, replayable: bool, attempt: int, maximum_attempts: int',
      'dict[str, object]',
      `    assert isinstance(method, str) and isinstance(attempt, int)
    idempotent = method.upper() in {"GET", "HEAD", "PUT"}
    if not replayable or not idempotent or not 1 <= attempt < maximum_attempts:
        return {"retry": False, "delay_ms": 0}
    delay_ms = min(8_000, 250 * (2 ** (attempt - 1)))
    return {"retry": True, "delay_ms": delay_ms}`,
      ['idempotent', 'maximum_attempts', '2\\s*\\*\\*'],
      'gate retries by semantics, replayability, attempts, and backoff',
    ],
    'connections-protocols': [
      'protocol: str, active_streams: int, stream_limit: int',
      'dict[str, bool]',
      `    assert protocol in {"http/1.1", "h2", "h3"}
    if active_streams < 0 or stream_limit <= 0:
        return {"admit": False, "multiplexed": False}
    multiplexed = protocol in {"h2", "h3"}
    effective_limit = stream_limit if multiplexed else min(1, stream_limit)
    return {"admit": active_streams < effective_limit, "multiplexed": multiplexed}`,
      ['multiplexed', 'effective_limit'],
      'model protocol multiplexing and stream capacity',
    ],
    'api-traversal-rates': [
      'cursor: str | None, seen_cursors: set[str], remaining_budget: int',
      'dict[str, object]',
      `    assert cursor is None or isinstance(cursor, str)
    if remaining_budget <= 0:
        return {"continue": False, "reason": "budget"}
    if cursor is None:
        return {"continue": False, "reason": "complete"}
    if cursor in seen_cursors:
        return {"continue": False, "reason": "cursor loop"}
    return {"continue": True, "reason": "checkpoint cursor"}`,
      ['remaining_budget', 'seen_cursors'],
      'stop on budget, completion, or cursor loop',
    ],
    'client-architecture': [
      'base_url: str, timeout_ms: int, credential_provider_ready: bool',
      'dict[str, object]',
      `    assert isinstance(base_url, str) and isinstance(timeout_ms, int)
    https = base_url.startswith("https://")
    valid = https and timeout_ms > 0 and credential_provider_ready
    origin = base_url.split("/", 3)[:3]
    return {"valid": valid, "origin": "/".join(origin) if len(origin) == 3 else "invalid"}`,
      ['startswith\\s*\\(["\']https://', 'credential_provider_ready'],
      'validate immutable client configuration and origin',
    ],
    'security-boundaries': [
      'scheme: str, host_allowed: bool, private_address: bool, redirect_allowed: bool',
      'dict[str, object]',
      `    assert isinstance(scheme, str)
    if scheme.casefold() != "https":
        return {"accepted": False, "reason": "scheme"}
    if not host_allowed or private_address:
        return {"accepted": False, "reason": "destination"}
    if not redirect_allowed:
        return {"accepted": False, "reason": "redirect"}
    return {"accepted": True, "reason": "bounded authority"}`,
      ['host_allowed', 'private_address', 'redirect_allowed'],
      'enforce layered SSRF destination and redirect policy',
    ],
    'testing-observability': [
      'fault: str, expected_status: int, observed_status: int',
      'dict[str, object]',
      `    assert fault in {"none", "timeout", "truncated"}
    if fault != "none":
        return {"passed": False, "error_type": fault}
    passed = expected_status == observed_status
    return {"passed": passed, "error_type": "none" if passed else "status-mismatch"}`,
      ['fault\\s*!=\\s*["\']none["\']', 'expected_status\\s*==\\s*observed_status'],
      'compare deterministic fault and low-cardinality status evidence',
    ],
    'performance-release-defense': [
      'p95_ms: int, latency_budget_ms: int, queue_depth: int, queue_capacity: int',
      'dict[str, bool]',
      `    assert all(isinstance(value, int) for value in (p95_ms, latency_budget_ms, queue_depth, queue_capacity))
    if p95_ms < 0 or latency_budget_ms <= 0 or queue_depth < 0 or queue_capacity <= 0:
        return {"release": False, "saturated": True}
    saturated = queue_depth >= queue_capacity
    return {"release": p95_ms <= latency_budget_ms and not saturated, "saturated": saturated}`,
      ['queue_depth\\s*>=\\s*queue_capacity', 'p95_ms\\s*<=\\s*latency_budget_ms'],
      'gate release on tail latency and saturation',
    ],
  };
  return specs[area];
}

function goSpec(area) {
  const specs = {
    'semantics-evidence': [
      'role string, status int',
      '(string, bool)',
      `	if status < 100 || status > 599 { return "invalid status", false }
	stage := role
	if role == "proxy" { stage = "intermediary" }
	return stage, status >= 200 && status < 400`,
      ['role\\s*==\\s*"proxy"'],
      'classify protocol role and status evidence',
    ],
    'uris-origins-dns': [
      'target string, https bool, hostAllowed bool',
      '(string, bool)',
      `	if target == "" || !https { return "invalid target", false }
	if !hostAllowed { return target, false }
	return target, true`,
      ['!https', 'hostAllowed'],
      'preserve a target while enforcing HTTPS and host policy',
    ],
    'requests-methods': [
      'method string, replayable bool',
      '(string, bool)',
      `	safe := method == "GET" || method == "HEAD" || method == "OPTIONS"
	idempotent := safe || method == "PUT" || method == "DELETE"
	if !replayable && !safe { return method, false }
	return method, idempotent && replayable`,
      ['idempotent', 'replayable'],
      'derive safe, idempotent, and replayable request evidence',
    ],
    'fields-representations': [
      'mediaType string, bodyBytes int, acceptedType bool',
      '(string, bool)',
      `	if mediaType == "" || bodyBytes < 0 || bodyBytes > 1_048_576 { return mediaType, false }
	if !acceptedType { return mediaType, false }
	return mediaType, true`,
      ['bodyBytes\\s*>\\s*1_048_576', 'acceptedType'],
      'separate bounded body evidence from media-type acceptance',
    ],
    'responses-errors': [
      'status int, hasProblemType bool',
      '(string, bool)',
      `	if status < 100 || status > 599 { return "invalid", false }
	if status >= 200 && status < 300 { return "success", status != 202 }
	if status >= 300 && status < 400 { return "redirect", false }
	if hasProblemType { return "problem", true }
	return "untyped failure", false`,
      ['status\\s*>=\\s*200', 'hasProblemType'],
      'classify success variants, redirects, and typed problems',
    ],
    'body-streams-limits': [
      'compressedBytes int, decodedBytes int, maximumDecodedBytes int',
      '(int, bool)',
      `	if compressedBytes <= 0 || decodedBytes < 0 || maximumDecodedBytes <= 0 { return 0, false }
	expansionRatio := decodedBytes / compressedBytes
	return expansionRatio, decodedBytes <= maximumDecodedBytes && expansionRatio <= 100`,
      ['decodedBytes\\s*/\\s*compressedBytes', 'maximumDecodedBytes'],
      'bound decoded bytes and compression expansion',
    ],
    'tls-trust': [
      'scheme string, hostnameMatches bool, chainTrusted bool',
      '(string, bool)',
      `	if scheme != "https" { return "downgrade", false }
	if !hostnameMatches { return "hostname", false }
	if !chainTrusted { return "trust chain", false }
	return "authenticated transport", true`,
      ['hostnameMatches', 'chainTrusted'],
      'require HTTPS, hostname identity, and chain trust separately',
    ],
    'redirects-policy': [
      'status int, sameOrigin bool, hop int, hasCredentials bool',
      '(bool, bool)',
      `	preserveMethod := status == 307 || status == 308
	if hop < 0 || hop >= 8 { return false, false }
	follow := status >= 300 && status < 400
	forwardCredentials := follow && sameOrigin && hasCredentials
	return follow && preserveMethod, forwardCredentials`,
      ['status\\s*==\\s*307', 'hop\\s*>=\\s*8', 'sameOrigin'],
      'decide redirect, method, hop, and credential policy',
    ],
    'cookies-auth-secrets': [
      'credentialKind string, sameOrigin bool, redacted bool',
      '(bool, bool)',
      `	ambient := credentialKind == "cookie"
	if ambient && !sameOrigin { return false, false }
	if !redacted { return false, false }
	return sameOrigin || !ambient, redacted`,
      ['credentialKind\\s*==\\s*"cookie"', 'redacted'],
      'separate ambient authority, origin scope, and redaction',
    ],
    'caching-validation': [
      'ageSeconds int, maxAgeSeconds int, hasETag bool',
      '(bool, bool)',
      `	if ageSeconds < 0 || maxAgeSeconds < 0 { return false, false }
	reusable := ageSeconds <= maxAgeSeconds
	revalidate := !reusable && hasETag
	return reusable, revalidate`,
      ['ageSeconds\\s*<=\\s*maxAgeSeconds', 'hasETag'],
      'compute freshness and validator revalidation separately',
    ],
    'timeouts-cancellation': [
      'remainingMs int, phaseBudgetMs int, cleanupReserveMs int',
      '(int, bool)',
      `	if remainingMs <= 0 || phaseBudgetMs <= 0 || cleanupReserveMs < 0 { return 0, false }
	usableMs := remainingMs - cleanupReserveMs
	if phaseBudgetMs < usableMs { usableMs = phaseBudgetMs }
	return usableMs, usableMs > 0`,
      ['remainingMs\\s*-\\s*cleanupReserveMs', 'phaseBudgetMs\\s*<\\s*usableMs'],
      'reserve cleanup time inside caller deadline',
    ],
    'retries-backoff': [
      'method string, replayable bool, attempt int, maximumAttempts int',
      '(int, bool)',
      `	idempotent := method == "GET" || method == "HEAD" || method == "PUT"
	if !replayable || !idempotent || attempt < 1 || attempt >= maximumAttempts { return 0, false }
	delayMs := 250 << (attempt - 1)
	if delayMs > 8_000 { delayMs = 8_000 }
	return delayMs, true`,
      ['idempotent', 'maximumAttempts', '250\\s*<<'],
      'gate retries by semantics, replayability, attempts, and capped backoff',
    ],
    'connections-protocols': [
      'protocol string, activeStreams int, streamLimit int',
      '(bool, bool)',
      `	if activeStreams < 0 || streamLimit <= 0 { return false, false }
	multiplexed := protocol == "h2" || protocol == "h3"
	effectiveLimit := streamLimit
	if !multiplexed && effectiveLimit > 1 { effectiveLimit = 1 }
	return activeStreams < effectiveLimit, multiplexed`,
      ['protocol\\s*==\\s*"h2"', 'effectiveLimit'],
      'model protocol multiplexing and stream capacity',
    ],
    'api-traversal-rates': [
      'cursor string, seen bool, remainingBudget int',
      '(string, bool)',
      `	if remainingBudget <= 0 { return "budget", false }
	if cursor == "" { return "complete", false }
	if seen { return "cursor loop", false }
	return cursor, true`,
      ['remainingBudget', 'cursor\\s*==\\s*""', 'seen'],
      'stop on budget, completion, or repeated cursor',
    ],
    'client-architecture': [
      'baseAuthority string, timeoutMs int, credentialProviderReady bool',
      '(string, bool)',
      `	if baseAuthority == "" || timeoutMs <= 0 { return "invalid configuration", false }
	if !credentialProviderReady { return baseAuthority, false }
	return baseAuthority, true`,
      ['timeoutMs\\s*<=\\s*0', 'credentialProviderReady'],
      'validate immutable client configuration and authority',
    ],
    'security-boundaries': [
      'scheme string, hostAllowed bool, privateAddress bool, redirectAllowed bool',
      '(string, bool)',
      `	if scheme != "https" { return "scheme", false }
	if !hostAllowed || privateAddress { return "destination", false }
	if !redirectAllowed { return "redirect", false }
	return "bounded authority", true`,
      ['hostAllowed', 'privateAddress', 'redirectAllowed'],
      'enforce layered SSRF destination and redirect policy',
    ],
    'testing-observability': [
      'fault string, expectedStatus int, observedStatus int',
      '(string, bool)',
      `	if fault != "none" { return fault, false }
	passed := expectedStatus == observedStatus
	if !passed { return "status-mismatch", false }
	return "none", true`,
      ['fault\\s*!=\\s*"none"', 'expectedStatus\\s*==\\s*observedStatus'],
      'compare deterministic fault and low-cardinality status evidence',
    ],
    'performance-release-defense': [
      'p95Ms int, latencyBudgetMs int, queueDepth int, queueCapacity int',
      '(bool, bool)',
      `	if p95Ms < 0 || latencyBudgetMs <= 0 || queueDepth < 0 || queueCapacity <= 0 { return false, true }
	saturated := queueDepth >= queueCapacity
	release := p95Ms <= latencyBudgetMs && !saturated
	return release, saturated`,
      ['queueDepth\\s*>=\\s*queueCapacity', 'p95Ms\\s*<=\\s*latencyBudgetMs'],
      'gate release on tail latency and saturation',
    ],
  };
  return specs[area];
}

export function httpEvidenceContract({ target, moduleId, functionName, marker }) {
  const area = moduleArea(moduleId);
  if (target === 'typescript') {
    const spec = typeScriptSpec(area);
    if (!spec) return null;
    return {
      marker: functionName,
      pattern: `function\\s+${functionName}\\s*\\([^)]*\\)\\s*:\\s*\\{[^}]+\\}\\s*\\{${requiredLookaheads(spec.anchors)}(?=[\\s\\S]*?return)[\\s\\S]*?return`,
      example: `function ${functionName}(${spec.parameters}): ${spec.result} {\n${spec.body}\n}`,
      requirement: `Add a typed ${functionName} function that uses deterministic TypeScript evidence to ${spec.task}.`,
      area,
    };
  }
  if (target === 'python') {
    const [parameters, result, body, anchors, task] = pythonSpec(area) ?? [];
    if (!parameters) return null;
    return {
      marker: functionName,
      pattern: `def\\s+${functionName}\\s*\\([^)]*\\)\\s*->[^:]+:${requiredLookaheads(anchors)}(?=[\\s\\S]*?assert)(?=[\\s\\S]*?return)[\\s\\S]*?return`,
      example: `def ${functionName}(${parameters}) -> ${result}:\n${body}`,
      requirement: `Add a typed ${functionName} function that asserts its deterministic input contract and ${task}.`,
      area,
    };
  }
  if (target === 'go') {
    const [parameters, result, body, anchors, task] = goSpec(area) ?? [];
    if (!parameters) return null;
    const withinEvidenceBlock = '(?:(?!// Evidence:)[\\s\\S])';
    return {
      marker,
      pattern: `${marker}${withinEvidenceBlock}*?func\\s+${functionName}\\s*\\([^)]*\\)\\s*\\([^)]*\\)\\s*\\{${requiredLookaheads(anchors, withinEvidenceBlock)}(?=${withinEvidenceBlock}*?return)${withinEvidenceBlock}*?return`,
      example: `${marker}\nfunc ${functionName}(${parameters}) ${result} {\n${body}\n}`,
      requirement: `Append a runnable Go function headed "${marker}" that uses deterministic value evidence to ${task}.`,
      area,
    };
  }
  return null;
}

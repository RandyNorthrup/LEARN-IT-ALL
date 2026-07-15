const SPECS = {
  'http-protocol-go-outcomes-layers-evidence': {
    parameters: 'wireObserved bool, stateObserved bool, liveTransfer bool',
    result: '(string, bool)',
    body: `\tlevel, sufficient := "model", wireObserved && stateObserved
\tif liveTransfer && sufficient { level = "transfer" }
\tif liveTransfer && !wireObserved { level, sufficient = "missing-wire", false }
\treturn level, sufficient`,
    anchors: ['wireObserved\\s*&&\\s*stateObserved', 'liveTransfer\\s*&&\\s*!wireObserved'],
    task: 'separate model, wire, state, and authorized live-transfer evidence',
  },
  'http-protocol-go-octets-streams-partial-io': {
    parameters: 'available int, requested int, readErr bool',
    result: '(int, bool, string)',
    body: `\tconsumed, complete, reason := available, false, "fragment"
\tif consumed > requested { consumed = requested }
\tif consumed == requested { complete, reason = true, "complete" }
\tif readErr && consumed < requested { reason = "incomplete" }
\treturn consumed, complete, reason`,
    anchors: ['consumed\\s*>\\s*requested', 'readErr\\s*&&\\s*consumed\\s*<\\s*requested'],
    task: 'preserve partial bytes while distinguishing fragmentation from incomplete input',
  },
  'http-protocol-go-tcp-connections-deadlines': {
    parameters: 'accepted bool, readComplete bool, deadlineExpired bool, peerClosed bool',
    result: '(string, bool)',
    body: `\tstate, reusable := "accept", false
\tif accepted { state = "reading" }
\tif accepted && readComplete { state, reusable = "message-complete", true }
\tif deadlineExpired { state, reusable = "timeout", false }
\tif peerClosed && !readComplete { state, reusable = "incomplete-eof", false }
\treturn state, reusable`,
    anchors: ['accepted\\s*&&\\s*readComplete', 'peerClosed\\s*&&\\s*!readComplete'],
    task: 'classify connection, deadline, completion, and close state without inventing message boundaries',
  },
  'http-protocol-go-semantics-wire-model': {
    parameters: 'method string, status int, contentLength int, headRequest bool',
    result: '(bool, string)',
    body: `\thasContent, meaning := contentLength > 0, "representation"
\tif headRequest || status == 204 || status < 200 { hasContent = false }
\tif method == "CONNECT" && status >= 200 && status < 300 { hasContent, meaning = false, "tunnel" }
\treturn hasContent, meaning`,
    anchors: ['status\\s*==\\s*204', 'method\\s*==\\s*"CONNECT"'],
    task: 'derive message content from method and status semantics before wire framing',
  },
  'http-protocol-go-abnf-parser-architecture': {
    parameters: 'lineBytes int, fieldBytes int, controls int, sideEffects int',
    result: '(bool, string)',
    body: `\tvalid, phase := lineBytes > 0 && lineBytes <= 8192, "syntax"
\tif fieldBytes < 0 || fieldBytes > 32768 { valid, phase = false, "limit" }
\tif controls != 0 { valid, phase = false, "grammar" }
\tif sideEffects != 0 { valid, phase = false, "effect-before-validation" }
\treturn valid, phase`,
    anchors: ['lineBytes\\s*<=\\s*8192', 'sideEffects\\s*!=\\s*0'],
    task: 'gate strict grammar and resource limits before any application effect',
  },
  'http-protocol-go-request-line-targets': {
    parameters: 'method string, target string, version string',
    result: '(string, bool)',
    body: `\tform, valid := "origin", version == "HTTP/1.1"
\tif method == "CONNECT" { form = "authority" }
\tif target == "*" { form = "asterisk" }
\tif len(target) >= 7 && target[:7] == "http://" { form = "absolute" }
\tif target == "" || method == "" { valid = false }
\treturn form, valid`,
    anchors: ['method\\s*==\\s*"CONNECT"', 'target\\s*==\\s*"\\*"'],
    task: 'select the request-target form without normalizing away the raw routing boundary',
  },
  'http-protocol-go-fields-structured-values': {
    parameters: 'nameValid bool, repeated int, combinable bool, totalBytes int',
    result: '(bool, int, string)',
    body: `\taccepted, retained, reason := nameValid, repeated, "fields"
\tif repeated > 1 && !combinable { reason = "preserve-lines" }
\tif totalBytes > 32768 { accepted, reason = false, "field-limit" }
\tif repeated < 0 { accepted, retained, reason = false, 0, "invalid-count" }
\treturn accepted, retained, reason`,
    anchors: ['repeated\\s*>\\s*1\\s*&&\\s*!combinable', 'totalBytes\\s*>\\s*32768'],
    task: 'preserve repeated field lines and reject sections beyond a bounded policy',
  },
  'http-protocol-go-message-framing-precedence': {
    parameters: 'status int, head bool, contentLength int, transferChunked bool',
    result: '(string, bool)',
    body: `\tframing, closeAfter := "none", false
\tif !head && status >= 200 && status != 204 && contentLength >= 0 { framing = "length" }
\tif !head && status >= 200 && status != 204 && transferChunked { framing = "chunked" }
\tif contentLength >= 0 && transferChunked { framing, closeAfter = "ambiguous", true }
\treturn framing, closeAfter`,
    anchors: ['status\\s*!=\\s*204', 'contentLength\\s*>=\\s*0\\s*&&\\s*transferChunked'],
    task: 'apply framing precedence and close on Transfer-Encoding plus Content-Length ambiguity',
  },
  'http-protocol-go-fixed-length-close-delimited': {
    parameters: 'declared int, observed int, policyLimit int, responseSide bool',
    result: '(string, int, bool)',
    body: `\tstate, remaining, reusable := "complete", declared-observed, true
\tif declared > policyLimit { state, reusable = "too-large", false }
\tif observed < declared { state, reusable = "incomplete", false }
\tif declared < 0 && responseSide { state, remaining, reusable = "close-delimited", 0, false }
\treturn state, remaining, reusable`,
    anchors: ['observed\\s*<\\s*declared', 'declared\\s*<\\s*0\\s*&&\\s*responseSide'],
    task: 'separate exact-length, incomplete, and response-only close-delimited content',
  },
  'http-protocol-go-chunked-trailers': {
    parameters: 'chunkSize int, decodedTotal int, maximum int, zeroChunk bool, trailerAllowed bool',
    result: '(string, int, bool)',
    body: `\tstate, nextTotal, complete := "chunk-data", decodedTotal+chunkSize, false
\tif chunkSize < 0 || nextTotal > maximum { state = "chunk-limit" }
\tif zeroChunk { state = "trailers" }
\tif zeroChunk && trailerAllowed { state, complete = "complete", true }
\treturn state, nextTotal, complete`,
    anchors: ['decodedTotal\\s*\\+\\s*chunkSize', 'zeroChunk\\s*&&\\s*trailerAllowed'],
    task: 'bound chunk accumulation and require trailer validation after the zero chunk',
  },
  'http-protocol-go-response-control-content': {
    parameters: 'status int, informationalCount int, head bool, connect bool',
    result: '(string, bool, bool)',
    body: `\tphase, final, content := "status", status >= 200, status >= 200
\tif informationalCount > 8 { phase, final = "too-many-informational", false }
\tif head || status == 204 { content = false }
\tif connect && status >= 200 && status < 300 { phase, content = "tunnel", false }
\treturn phase, final, content`,
    anchors: ['informationalCount\\s*>\\s*8', 'connect\\s*&&\\s*status\\s*>=\\s*200'],
    task: 'bound informational responses and transition HEAD, no-content, and CONNECT responses correctly',
  },
  'http-protocol-go-response-serialization-writes': {
    parameters: 'status int, fieldsValid bool, knownLength int, streaming bool, written int',
    result: '(string, int, bool)',
    body: `\tframing, remaining, committed := "length", knownLength-written, fieldsValid
\tif streaming { framing = "chunked" }
\tif knownLength < 0 && !streaming { framing = "close" }
\tif status < 200 || status == 204 { framing, remaining = "none", 0 }
\tif !fieldsValid { committed = false }
\treturn framing, remaining, committed`,
    anchors: ['knownLength\\s*-\\s*written', 'status\\s*==\\s*204'],
    task: 'select one output framing mode while retaining partial-write and field-validation evidence',
  },
  'http-protocol-go-persistence-pipelining-order': {
    parameters: 'requestIndex int, responseIndex int, bodyComplete bool, framingValid bool',
    result: '(bool, string)',
    body: `\treuse, reason := bodyComplete && framingValid, "reusable"
\tif responseIndex != requestIndex { reuse, reason = false, "response-order" }
\tif !bodyComplete { reuse, reason = false, "body-incomplete" }
\tif !framingValid { reuse, reason = false, "framing-error" }
\treturn reuse, reason`,
    anchors: ['responseIndex\\s*!=\\s*requestIndex', '!framingValid'],
    task: 'preserve HTTP/1.1 response order and reject reuse after incomplete or ambiguous input',
  },
  'http-protocol-go-expect-early-response': {
    parameters: 'expectContinue bool, headersAccepted bool, finalSent bool, remainingBody int',
    result: '(string, bool)',
    body: `\taction, reuse := "read-body", true
\tif expectContinue && headersAccepted && !finalSent { action = "send-100" }
\tif !headersAccepted { action = "reject" }
\tif finalSent && remainingBody > 4096 { action, reuse = "reject-close", false }
\treturn action, reuse`,
    anchors: ['expectContinue\\s*&&\\s*headersAccepted', 'remainingBody\\s*>\\s*4096'],
    task: 'coordinate 100-continue and bounded early rejection without deadlock or unsafe reuse',
  },
  'http-protocol-go-intermediaries-hop-fields': {
    parameters: 'connectionNamed int, removed int, transformed bool, metadataUpdated bool',
    result: '(bool, string)',
    body: `\tforward, reason := removed >= connectionNamed, "hop-fields"
\tif transformed && !metadataUpdated { forward, reason = false, "stale-metadata" }
\tif connectionNamed < 0 || removed < 0 { forward, reason = false, "invalid-count" }
\treturn forward, reason`,
    anchors: ['removed\\s*>=\\s*connectionNamed', 'transformed\\s*&&\\s*!metadataUpdated'],
    task: 'strip dynamically nominated hop fields and repair metadata after transformations',
  },
  'http-protocol-go-authority-host-routing': {
    parameters: 'hostCount int, host string, targetAuthority string, configuredHost string',
    result: '(string, bool)',
    body: `\teffective, valid := host, hostCount == 1 && host != ""
\tif targetAuthority != "" { effective = targetAuthority }
\tif targetAuthority != "" && host != "" && targetAuthority != host { valid = false }
\tif configuredHost != "" && effective != configuredHost { valid = false }
\treturn effective, valid`,
    anchors: ['hostCount\\s*==\\s*1', 'targetAuthority\\s*!=\\s*host'],
    task: 'derive and allowlist one effective request authority without trusting disagreement',
  },
  'http-protocol-go-tls13-alpn-identity': {
    parameters: 'certificateNameOK bool, alpn string, tlsVersion int, earlyData bool',
    result: '(bool, string)',
    body: `\taccepted, protocol := certificateNameOK && tlsVersion >= 13, alpn
\tif alpn != "http/1.1" && alpn != "h2" { accepted, protocol = false, "unsupported-alpn" }
\tif earlyData { accepted, protocol = false, "replay-review" }
\treturn accepted, protocol`,
    anchors: ['certificateNameOK\\s*&&\\s*tlsVersion\\s*>=\\s*13', 'earlyData'],
    task: 'gate HTTPS on certificate identity, TLS policy, ALPN, and explicit early-data review',
  },
  'http-protocol-go-upgrade-connect-transitions': {
    parameters: 'requested bool, accepted bool, requestComplete bool, optimisticBytes int',
    result: '(string, bool)',
    body: `\tstate, reusable := "http", true
\tif requested && accepted && requestComplete { state = "transition" }
\tif optimisticBytes > 0 && !accepted { state, reusable = "unsafe-optimistic", false }
\tif accepted && !requestComplete { state, reusable = "incomplete-request", false }
\treturn state, reusable`,
    anchors: [
      'requested\\s*&&\\s*accepted\\s*&&\\s*requestComplete',
      'optimisticBytes\\s*>\\s*0\\s*&&\\s*!accepted',
    ],
    task: 'wait for confirmed Upgrade or CONNECT acceptance before transferring parser ownership',
  },
  'http-protocol-go-smuggling-splitting-differentials': {
    parameters: 'frontLength int, backLength int, transferEncoding bool, containsCRLF bool',
    result: '(bool, string)',
    body: `\tforward, reason := frontLength == backLength, "consistent"
\tif transferEncoding && (frontLength >= 0 || backLength >= 0) { forward, reason = false, "te-cl" }
\tif frontLength != backLength { forward, reason = false, "length-differential" }
\tif containsCRLF { forward, reason = false, "splitting" }
\treturn forward, reason`,
    anchors: [
      'frontLength\\s*==\\s*backLength',
      'transferEncoding\\s*&&\\s*\\(frontLength\\s*>=\\s*0',
    ],
    task: 'reject framing and control-byte differentials before a message crosses recipients',
  },
  'http-protocol-go-resource-limits-slow-clients': {
    parameters:
      'elapsedMs int, absoluteBudgetMs int, bufferedBytes int, byteBudget int, queueDepth int',
    result: '(bool, string)',
    body: `\tadmit, reason := elapsedMs <= absoluteBudgetMs, "time"
\tif bufferedBytes > byteBudget { admit, reason = false, "memory" }
\tif queueDepth > 32 { admit, reason = false, "backpressure" }
\tif absoluteBudgetMs <= 0 || byteBudget <= 0 { admit, reason = false, "invalid-budget" }
\treturn admit, reason`,
    anchors: ['elapsedMs\\s*<=\\s*absoluteBudgetMs', 'queueDepth\\s*>\\s*32'],
    task: 'combine absolute phase time, memory, and output-queue budgets for slow-peer defense',
  },
  'http-protocol-go-state-machines-concurrency': {
    parameters: 'cursor int, inputBytes int, framingChoices int, readers int, terminalOwners int',
    result: '(bool, string)',
    body: `\tvalid, invariant := cursor >= 0 && cursor <= inputBytes, "cursor"
\tif framingChoices != 1 { valid, invariant = false, "framing" }
\tif readers != 1 { valid, invariant = false, "reader-owner" }
\tif terminalOwners != 1 { valid, invariant = false, "terminal-owner" }
\treturn valid, invariant`,
    anchors: ['cursor\\s*<=\\s*inputBytes', 'terminalOwners\\s*!=\\s*1'],
    task: 'enforce cursor, framing, reader, and terminal ownership invariants',
  },
  'http-protocol-go-tests-differential-fuzz-race': {
    parameters:
      'goldenCases int, fragmentSchedules int, differentialCases int, fuzzSeeds int, leaks int',
    result: '(bool, string)',
    body: `\tpassed, layer := goldenCases >= 4 && fragmentSchedules >= 4, "transcript"
\tif differentialCases < 2 { passed, layer = false, "differential" }
\tif fuzzSeeds < 8 { passed, layer = false, "fuzz-corpus" }
\tif leaks != 0 { passed, layer = false, "leak" }
\treturn passed, layer`,
    anchors: ['fragmentSchedules\\s*>=\\s*4', 'fuzzSeeds\\s*<\\s*8'],
    task: 'gate parser work on transcripts, fragmentation, differential, fuzz, and leak evidence',
  },
  'http-protocol-go-http2-frames-hpack-flow': {
    parameters: 'frameLength int, maxFrameSize int, streamOpen bool, window int, headerBytes int',
    result: '(bool, string)',
    body: `\taccepted, reason := frameLength >= 0 && frameLength <= maxFrameSize, "frame"
\tif !streamOpen { accepted, reason = false, "stream-state" }
\tif window < frameLength { accepted, reason = false, "flow-control" }
\tif headerBytes > 65536 { accepted, reason = false, "header-list" }
\treturn accepted, reason`,
    anchors: ['frameLength\\s*<=\\s*maxFrameSize', 'window\\s*<\\s*frameLength'],
    task: 'combine HTTP/2 frame, stream, flow-control, and header-list bounds',
  },
  'http-protocol-go-http3-quic-production': {
    parameters:
      'h3Healthy bool, h2Healthy bool, altSvcAge int, qpackBlocked int, rollbackReady bool',
    result: '(string, bool)',
    body: `\tprotocol, release := "http/1.1", h2Healthy && rollbackReady
\tif h2Healthy { protocol = "h2" }
\tif h3Healthy && altSvcAge >= 0 && qpackBlocked <= 4 { protocol, release = "h3", rollbackReady }
\tif !rollbackReady { protocol, release = "rollback", false }
\treturn protocol, release`,
    anchors: ['qpackBlocked\\s*<=\\s*4', '!rollbackReady'],
    task: 'stage HTTP/3 through bounded QPACK, fallback health, and explicit rollback evidence',
  },
};

const ENVIRONMENTS = [
  'municipal gateway receiving one-byte TCP fragments',
  'privacy-sensitive proxy translating between two parser implementations',
  'regional status service with slow assistive and low-bandwidth clients',
  'partner TLS endpoint negotiating HTTP/1.1 and HTTP/2 through ALPN',
  'incident replay lab retaining minimized request-smuggling corpora',
  'canary edge service advertising HTTP/3 with bounded fallback',
  'multi-tenant intake service near its connection and memory ceilings',
  'signed webhook receiver behind an HTTP/2 to HTTP/1.1 gateway',
  'archival client parsing incomplete close-delimited responses',
  'protocol upgrade gateway transferring buffered tunnel bytes',
  'field-normalizing cache with an independent origin parser',
  'fuzzing harness varying every legal input segmentation',
];

const CHANGES = [
  'split every structural delimiter across a different read and retain the same result',
  'lower one byte or time budget and prove rejection occurs before allocation or dispatch',
  'append a second pipelined message and prove the first parser leaves the exact residual bytes',
  'replace one field with repeated non-combinable lines and preserve their order',
  'inject Transfer-Encoding plus Content-Length and close before any downstream forwarding',
  'truncate one content octet and classify incomplete framing without connection reuse',
  'force a short write and retain the exact transmitted prefix plus remaining count',
  'reject a protocol transition while optimistic bytes are buffered and prevent desynchronization',
  'change certificate identity while ALPN stays valid and reject the connection',
  'saturate one stream window while another remains independently serviceable',
  'block extra QPACK streams and fall back without removing HTTP/2 availability',
  'minimize a fuzz failure and add it to the deterministic regression corpus',
];

const CONSTRAINTS = [
  'one parser state transition may consume bytes only after its full precondition holds',
  'all attacker-controlled counts must be validated before allocation or slicing',
  'one connection has exactly one read owner and one terminal close owner',
  'diagnostics must omit credentials and attacker-controlled metric labels',
  'no malformed framing may be normalized and forwarded to another recipient',
  'a timeout must reserve cleanup time and retain the terminal phase',
  'the browser model cannot open a socket or claim packet-level proof',
  'the maintained Go protocol stack remains the production transfer target',
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
    constraint: CONSTRAINTS[Math.floor(value / 13) % CONSTRAINTS.length],
  };
}

export function httpProtocolGoScenario(moduleId, seed, activityKind = 'practice', competency) {
  const spec = SPECS[moduleId];
  if (!spec) throw new Error(`Missing HTTP protocol scenario profile for ${moduleId}`);
  const chosen = details(seed.toString(36));
  const probe = competency ? ` Competency probe: ${competency.statement}` : '';
  return `A ${activityKind} protocol team handles case ${chosen.caseNumber} in a ${chosen.environment}. Build deterministic Go evidence to ${spec.task}; preserve this operating constraint: ${chosen.constraint}; then ${chosen.changedCase}. Browser code models bounded byte and state decisions only. Sockets, listeners, live TLS, proxies, packet capture, fuzz campaigns, races, load, HTTP/2, HTTP/3, and production behavior require explicit authorized transfer gates.${probe}`;
}

export function httpProtocolGoEvidenceContract({
  competencyId,
  moduleId,
  functionName,
  marker,
  suffix,
}) {
  const spec = SPECS[moduleId];
  if (!spec) throw new Error(`Missing HTTP protocol evidence profile for ${moduleId}`);
  const chosen = details(suffix);
  const withinEvidenceBlock = '(?:(?!// Evidence:)[\\s\\S])';
  return {
    marker,
    pattern: `${marker}${withinEvidenceBlock}*?func\\s+${functionName}\\s*\\([^)]*\\)\\s*(?:\\([^)]*\\)|[A-Za-z][A-Za-z0-9]*)\\s*\\{${requiredLookaheads(spec.anchors, withinEvidenceBlock)}(?=${withinEvidenceBlock}*?return)${withinEvidenceBlock}*?return`,
    example: `${marker}
// Competency: ${competencyId}.
// Case ${chosen.caseNumber}: ${chosen.environment}.
// Operating constraint: ${chosen.constraint}.
// Changed case: ${chosen.changedCase}.
func ${functionName}(${spec.parameters}) ${spec.result} {
${spec.body}
}`,
    requirement: `Append a compile-ready pure-Go function headed "${marker}" that uses case ${chosen.caseNumber} to ${spec.task}. Return observable changed-case evidence. Browser code must not open sockets or listeners, negotiate TLS, contact networks or proxies, capture packets, read host state, or use credentials; verify those boundaries later with the named Go 1.26 protocol transfer gates.`,
  };
}

export function httpProtocolGoWorkedExample(moduleId, seed) {
  return httpProtocolGoEvidenceContract({
    competencyId: `httpproto-worked-${moduleId}-${seed}`,
    moduleId,
    functionName: `worked_${moduleId.replaceAll('-', '_')}_${seed}`,
    marker: `// Evidence: httpproto-worked-${moduleId}-${seed}`,
    suffix: `worked${seed}`,
  }).example;
}

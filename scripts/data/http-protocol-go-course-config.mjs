import { finalizeCourse, module, project, skill } from './course-config-helpers.mjs';

const REVIEWED_AT = '2026-07-14';
const RESEARCHED_AT = '2026-07-14T18:45:00.000Z';

function outcome(id, statement, misconception, knowledgeType = 'procedural', level = 'apply') {
  if (!misconception) throw new Error(`Missing misconception for HTTP protocol competency ${id}`);
  return skill(id, statement, misconception, knowledgeType, level);
}

function protocolModule(id, title, context, artifact, skills) {
  return {
    ...module(id, title, context, artifact, skills),
    contexts: {
      theory: context,
      workshop: `A protocol pairing room predicts byte, parser, state, ownership, and cleanup transitions before assembling the first ${artifact} for ${title.toLowerCase()}.`,
      debug: `An incident engineer receives a plausible but defective ${artifact}; retain the raw transcript, isolate the first divergent state, and preserve a regression corpus entry.`,
      lab: `An independent protocol team receives different fragmentation, peer, trust, timing, and failure constraints and transfers ${title.toLowerCase()} into a new ${artifact}.`,
      review: `A delayed handoff reconstructs ${title.toLowerCase()} from bounded byte and state evidence, challenges one misconception, and revises the ${artifact}.`,
      quiz: `A security review compares near-miss parser decisions for ${title.toLowerCase()} and requires the smallest strict ${artifact} with changed-input evidence.`,
    },
  };
}

const modules = [
  protocolModule(
    'http-protocol-go-outcomes-layers-evidence',
    'Protocol Outcomes, Layers, Standards, and Evidence',
    'A team says it built HTTP from scratch because one request works, but it cannot separate application semantics, wire syntax, transport behavior, implementation policy, or user and operator evidence.',
    'protocol outcome, layer, authority, and evidence charter',
    [
      outcome(
        'httpproto-outcome-evidence-contract',
        'Define user, client, operator, security, accessibility, interoperability, and recovery evidence for a protocol implementation.',
        'Successfully serving one browser request proves a protocol implementation is correct.',
        'professional',
        'create'
      ),
      outcome(
        'httpproto-layer-boundary-map',
        'Trace application policy, HTTP semantics, HTTP/1.1 syntax, TLS records, TCP byte streams, IP delivery, and local socket APIs without collapsing layers.',
        'An HTTP message maps one-to-one onto a TCP packet and arrives as one socket read.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'httpproto-normative-authority',
        'Use current RFC requirements, errata, Go documentation, and implementation tests as distinct authorities and resolve conflicts explicitly.',
        'The behavior of one popular server overrides normative protocol requirements.'
      ),
      outcome(
        'httpproto-conformance-policy-extension',
        'Separate required conformance, optional tolerance, local policy, registered extensions, and unsupported behavior in parser decisions.',
        'A parser is more interoperable when it accepts every malformed variation.'
      ),
      outcome(
        'httpproto-transfer-evidence-plan',
        'Plan deterministic browser models, Go compilation, net.Pipe tests, loopback sockets, TLS, packet capture, proxy, fuzz, race, load, and production transfer gates.',
        'Pure string parsing in a browser proves live socket, TLS, proxy, and production behavior.',
        'metacognitive',
        'evaluate'
      ),
    ]
  ),
  protocolModule(
    'http-protocol-go-octets-streams-partial-io',
    'Octets, Byte Streams, Fragmentation, Buffering, and Partial I/O',
    'A parser assumes one Read returns a complete line, converts arbitrary bytes to text too early, loses buffered bytes, and treats a short read or write as end-of-message.',
    'fragment-safe byte-stream reader and writer contract',
    [
      outcome(
        'httpproto-octet-text-boundary',
        'Keep protocol data as octets until grammar permits text interpretation and distinguish ASCII tokens, opaque content, and invalid control bytes.',
        'Go strings guarantee protocol input is valid UTF-8 text.'
      ),
      outcome(
        'httpproto-read-count-error-contract',
        'Interpret Read results using both byte count and error, including data with io.EOF, zero-byte reads, and temporary fragmentation.',
        'Any non-nil read error means returned bytes must be discarded.'
      ),
      outcome(
        'httpproto-short-write-loop',
        'Complete bounded output across short writes while retaining progress, error, and ownership evidence.',
        'A Writer either writes the entire slice or returns an error, so retry loops are unnecessary.'
      ),
      outcome(
        'httpproto-buffered-reader-ownership',
        'Use bufio.Reader without losing peeked, unread, or already-buffered bytes when protocol phases change.',
        'Replacing a buffered reader around the same connection preserves all unread bytes.'
      ),
      outcome(
        'httpproto-fragmentation-invariance',
        'Prove the same bounded message result for every legal segmentation of an identical byte sequence.',
        'A parser that passes one whole-buffer test is independent of network fragmentation.',
        'metacognitive',
        'evaluate'
      ),
    ]
  ),
  protocolModule(
    'http-protocol-go-tcp-connections-deadlines',
    'TCP Connections, Accept Loops, Half-Closes, Deadlines, and Failure',
    'A raw server treats TCP as messages, leaks accepted connections, uses no deadlines, retries ambiguous writes, and cannot distinguish peer close, timeout, reset, or local shutdown.',
    'bounded TCP connection lifecycle state machine',
    [
      outcome(
        'httpproto-tcp-reliable-stream-model',
        'Explain ordered reliable byte-stream delivery while accounting for segmentation, retransmission, flow control, congestion, and missing message boundaries.',
        'TCP preserves application write boundaries and delivers each Write through one matching Read.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'httpproto-listener-accept-ownership',
        'Assign listener, accepted connection, goroutine, buffer, deadline, and close ownership with bounded accept-error handling.',
        'Closing the listener automatically closes every accepted connection and handler goroutine.'
      ),
      outcome(
        'httpproto-read-write-deadlines',
        'Set and refresh absolute read and write deadlines by protocol phase and classify timeout evidence without assuming cancellation.',
        'A connection deadline is a relative duration that automatically refreshes after progress.'
      ),
      outcome(
        'httpproto-half-close-reset-eof',
        'Distinguish orderly EOF, CloseRead, CloseWrite, full close, reset, timeout, and local shutdown effects on protocol completeness.',
        'Receiving EOF always means the current HTTP message completed successfully.'
      ),
      outcome(
        'httpproto-write-ambiguity-retry',
        'Treat failed or timed-out writes as potentially partially observed and avoid blind replay of non-idempotent protocol effects.',
        'A failed socket write proves the peer received none of the bytes.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  protocolModule(
    'http-protocol-go-semantics-wire-model',
    'HTTP Semantics, Messages, Versions, and the Wire Model',
    'A raw implementation copies endpoint behavior into its parser, confuses resources with representations, infers message bodies from method names, and treats HTTP/1.1 syntax as universal HTTP semantics.',
    'version-neutral message and semantics model',
    [
      outcome(
        'httpproto-semantics-syntax-separation',
        'Separate version-neutral method, status, field, content, and resource semantics from HTTP/1.1 textual serialization.',
        'HTTP semantics are defined by the exact capitalization and line layout of HTTP/1.1.'
      ),
      outcome(
        'httpproto-message-component-model',
        'Model control data, header fields, content, trailer fields, and message metadata without inventing content where semantics forbid it.',
        'Every request and response contains a body after its header section.'
      ),
      outcome(
        'httpproto-method-status-body-semantics',
        'Determine content meaning and permission from request method, response status, request context, and connection mode rather than one field alone.',
        'Content-Length greater than zero guarantees a response carries content for every method and status.'
      ),
      outcome(
        'httpproto-version-conformance',
        'Interpret HTTP version as capability and conformance information while rejecting unsupported major versions and unsafe downgrade assumptions.',
        'A higher minor HTTP version requires rejecting all messages from older peers.'
      ),
      outcome(
        'httpproto-intermediary-transformation',
        'Trace origin, proxy, gateway, tunnel, cache, and user-agent transformations while retaining end-to-end and hop evidence.',
        'An intermediary forwards the original request bytes unchanged to the origin.',
        'conceptual',
        'analyze'
      ),
    ]
  ),
  protocolModule(
    'http-protocol-go-abnf-parser-architecture',
    'ABNF, Tokens, Whitespace, Line Endings, Limits, and Parser Architecture',
    'A parser splits strings freely, accepts bare line feeds and whitespace before fields, has no byte limits, and mixes syntax recognition with application side effects.',
    'strict bounded incremental parser architecture',
    [
      outcome(
        'httpproto-abnf-derivation',
        'Translate RFC ABNF alternatives, repetition, terminals, lists, and prose constraints into explicit parser states and tests.',
        'ABNF alone expresses every semantic and security requirement in an HTTP specification.'
      ),
      outcome(
        'httpproto-token-control-validation',
        'Validate tokens and visible bytes using octet classes while rejecting separators, controls, NUL, and forbidden whitespace.',
        'Trimming a parsed token after acceptance makes any surrounding bytes harmless.'
      ),
      outcome(
        'httpproto-crlf-line-policy',
        'Require CRLF at HTTP/1.1 structural boundaries and document any local robustness exception without parser disagreement.',
        'Accepting bare LF everywhere is required for HTTP/1.1 interoperability.'
      ),
      outcome(
        'httpproto-parser-limit-budget',
        'Bound start line, each field line, total fields, field count, content, trailers, states, allocations, and parse time before consuming them.',
        'A maximum total request size alone prevents all parser memory and CPU exhaustion.'
      ),
      outcome(
        'httpproto-parse-validate-effect-phases',
        'Separate byte recognition, structural validation, semantic validation, policy, and effects so failure cannot partially authorize work.',
        'Calling application code while each line arrives reduces latency without changing security.',
        'professional',
        'create'
      ),
    ]
  ),
  protocolModule(
    'http-protocol-go-request-line-targets',
    'Request Lines, Methods, Target Forms, Versions, and Routing Inputs',
    'A parser uses Fields on the request line, normalizes targets before validation, treats every target as origin-form, and accepts invalid CONNECT authorities and absolute-form credentials.',
    'strict request-line and request-target parser',
    [
      outcome(
        'httpproto-request-line-delimiters',
        'Parse method, one-space delimiters, request target, HTTP version, and CRLF without accepting ambiguous extra components.',
        'Splitting a request line on arbitrary whitespace is equivalent to the strict HTTP/1.1 grammar.'
      ),
      outcome(
        'httpproto-method-token-policy',
        'Recognize any valid method token, preserve case, then apply supported-method policy separately.',
        'A parser should reject every syntactically valid method it does not already know.'
      ),
      outcome(
        'httpproto-target-form-selection',
        'Distinguish origin-form, absolute-form, authority-form, and asterisk-form using method and recipient role.',
        'Every HTTP/1.1 request target begins with a slash and names an origin path.'
      ),
      outcome(
        'httpproto-target-raw-canonical-boundary',
        'Preserve raw target evidence while parsing URI components, percent encodings, query delimiters, and canonical routing values without double decoding.',
        'Percent-decoding the entire request target before splitting components is always safe.'
      ),
      outcome(
        'httpproto-request-line-changed-case',
        'Test unknown methods, empty targets, fragments, userinfo, encoded delimiters, invalid versions, excess whitespace, and bounded lengths.',
        'A request line parser is complete after GET slash HTTP slash one-point-one succeeds.',
        'metacognitive',
        'evaluate'
      ),
    ]
  ),
  protocolModule(
    'http-protocol-go-fields-structured-values',
    'Field Lines, Repetition, Combination, Structured Fields, and Limits',
    'A parser stores one value per name, splits every comma, accepts obsolete folding, merges Set-Cookie, and treats all field values as trusted UTF-8 text.',
    'loss-aware bounded field-section model',
    [
      outcome(
        'httpproto-field-name-value-grammar',
        'Parse case-insensitive token field names, colon delimiters, optional field whitespace, and field values while rejecting whitespace before the colon.',
        'Whitespace before a field colon is cosmetic and can be trimmed safely.'
      ),
      outcome(
        'httpproto-repeated-field-combination',
        'Preserve field-line order and repeated values, combining only when that field definition permits it.',
        'Every repeated HTTP field can be joined with a comma without changing meaning.'
      ),
      outcome(
        'httpproto-hop-field-connection-options',
        'Parse Connection options and nominate hop-by-hop fields dynamically instead of relying only on a fixed list.',
        'Removing the standard hop-by-hop names is sufficient even when Connection names more fields.'
      ),
      outcome(
        'httpproto-structured-fields-rfc9651',
        'Parse RFC 9651 items, lists, dictionaries, parameters, numbers, strings, tokens, bytes, booleans, dates, and display strings strictly when a field opts in.',
        'Every HTTP field uses Structured Fields syntax and can be parsed by one generic comma splitter.'
      ),
      outcome(
        'httpproto-field-resource-disclosure',
        'Bound field bytes and count, reject obsolete folding and controls, redact secrets, and preserve only safe diagnostic evidence.',
        'Logging every raw field is necessary for parser debugging and has no security cost.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  protocolModule(
    'http-protocol-go-message-framing-precedence',
    'HTTP/1.1 Message Framing and Length Precedence',
    'A recipient reads until EOF for every body, trusts duplicate Content-Length values, accepts Transfer-Encoding plus Content-Length, and makes a framing decision before status and method semantics are known.',
    'RFC 9112 message-body length decision table',
    [
      outcome(
        'httpproto-body-length-precedence',
        'Apply the RFC 9112 message-body length precedence in order using request or response role, method, status, transfer coding, content length, and connection closure.',
        'Content-Length always determines message framing whenever the field appears.'
      ),
      outcome(
        'httpproto-no-content-responses',
        'Forbid content framing for HEAD responses, 1xx, 204, successful CONNECT, and other context-specific cases while retaining metadata meaning.',
        'A positive Content-Length means a 204 response includes that many content bytes.'
      ),
      outcome(
        'httpproto-transfer-encoding-precedence',
        'Validate transfer-coding order, require final chunked coding for request framing, and close after ambiguous Transfer-Encoding plus Content-Length input.',
        'Transfer-Encoding and Content-Length can be used together safely when both predict the same size.'
      ),
      outcome(
        'httpproto-content-length-list-validation',
        'Parse decimal Content-Length values without overflow and accept repeated or list values only when every valid value is identical.',
        'Selecting the first Content-Length value is safe when later values differ.'
      ),
      outcome(
        'httpproto-framing-completeness-evidence',
        'Record framing source, expected bytes, observed bytes, completion, residual buffer, close requirement, and rejection reason.',
        'A valid start line and field section prove the complete message is safe to dispatch.',
        'professional',
        'create'
      ),
    ]
  ),
  protocolModule(
    'http-protocol-go-fixed-length-close-delimited',
    'Fixed-Length, Close-Delimited, Absent, and Incomplete Content',
    'A body reader allocates from attacker Content-Length, treats premature EOF as success, consumes the next pipelined message, and reuses a connection after incomplete content.',
    'bounded fixed-length and close-delimited content reader',
    [
      outcome(
        'httpproto-bounded-content-length-reader',
        'Stream exactly the validated content length through independent policy limits without allocating the declared size.',
        'A validated Content-Length is safe to use directly as a slice allocation length.'
      ),
      outcome(
        'httpproto-premature-eof-incomplete',
        'Classify EOF before the required octet count as incomplete framing and prevent dispatch or connection reuse.',
        'EOF terminates any HTTP content successfully regardless of expected length.'
      ),
      outcome(
        'httpproto-residual-byte-boundary',
        'Stop after exactly the framed content and retain buffered residual bytes for the next message.',
        'Reading until no bytes are immediately available is equivalent to reading one HTTP body.'
      ),
      outcome(
        'httpproto-close-delimited-response',
        'Use close-delimited response content only in permitted response contexts and mark the connection non-reusable.',
        'Requests without Content-Length are safely framed by closing the connection.'
      ),
      outcome(
        'httpproto-content-decoding-limit',
        'Keep message framing separate from content coding and bound both encoded and decoded sizes against expansion attacks.',
        'A small framed gzip body guarantees a small decoded representation.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  protocolModule(
    'http-protocol-go-chunked-trailers',
    'Chunked Transfer Coding, Extensions, Trailers, and Decoding',
    'A decoder parses chunk sizes as decimal, trusts extensions, misses overflow, forgets the zero chunk, merges forbidden trailers into headers, and leaves bytes misaligned.',
    'incremental chunked decoder and trailer policy',
    [
      outcome(
        'httpproto-chunk-size-hex-overflow',
        'Parse bounded hexadecimal chunk size with extensions, overflow checks, exact CRLF, and cumulative decoded limits.',
        'Chunk sizes use decimal notation and can be parsed with ordinary base-ten conversion.'
      ),
      outcome(
        'httpproto-chunk-data-boundary',
        'Read exactly each chunk-data length plus its terminating CRLF across arbitrary fragmentation.',
        'A short read at a chunk boundary means the sender finished that chunk.'
      ),
      outcome(
        'httpproto-zero-chunk-completion',
        'Treat the last zero-sized chunk as the transition to trailer parsing rather than immediate message completion.',
        'The zero chunk ends the message before any trailer section is parsed.'
      ),
      outcome(
        'httpproto-trailer-field-policy',
        'Validate trailer declarations and forbidden fields, retain trailers separately, and merge only when the field definition explicitly permits.',
        'Trailer fields can always overwrite corresponding header fields after content arrives.'
      ),
      outcome(
        'httpproto-chunked-changed-corpus',
        'Test extensions, leading zeros, split size lines, missing CRLF, overflow, excess trailer bytes, forbidden fields, and a pipelined next message.',
        'One multi-chunk happy path proves a chunked decoder preserves every message boundary.',
        'metacognitive',
        'evaluate'
      ),
    ]
  ),
  protocolModule(
    'http-protocol-go-response-control-content',
    'Status Lines, Informational Responses, Content Rules, and Response Parsing',
    'A client parser accepts malformed status codes, stops at 100 Continue, assigns content to HEAD and 204, treats successful CONNECT as ordinary HTTP, and retries after an incomplete response.',
    'response control-data and content decision parser',
    [
      outcome(
        'httpproto-status-line-parser',
        'Parse HTTP version, three-digit status code, optional reason phrase, and CRLF while treating the reason phrase as non-authoritative.',
        'The reason phrase defines response semantics and must match a standard English phrase.'
      ),
      outcome(
        'httpproto-informational-response-loop',
        'Process zero or more permitted informational responses before the final response with bounded count and protocol-specific handling.',
        'The first received status line always begins the final response.'
      ),
      outcome(
        'httpproto-head-response-metadata',
        'Parse HEAD response metadata as if GET were selected while never consuming response content bytes.',
        'A HEAD response with Content-Length must consume that many content bytes.'
      ),
      outcome(
        'httpproto-connect-tunnel-transition',
        'Transition a successful CONNECT response from HTTP message parsing to opaque tunnel bytes without losing buffered data.',
        'A successful CONNECT response is followed by an ordinary HTTP response body.'
      ),
      outcome(
        'httpproto-response-retry-ambiguity',
        'Classify incomplete, malformed, unsolicited, and connection-lost responses without blindly replaying methods whose effects may have occurred.',
        'No final response means the server certainly did not process the request.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  protocolModule(
    'http-protocol-go-response-serialization-writes',
    'HTTP/1.1 Response Serialization, Field Order, Framing, and Writes',
    'A writer emits content before headers, injects unchecked field values, chooses conflicting framing, assumes one Write completes, and cannot prove exact transmitted bytes.',
    'canonical bounded HTTP/1.1 response serializer',
    [
      outcome(
        'httpproto-response-commit-order',
        'Commit one status line, validated field section, empty line, framed content, and trailers in protocol order.',
        'A later status line can replace an earlier one after response content starts.'
      ),
      outcome(
        'httpproto-field-output-injection',
        'Reject CR, LF, NUL, controls, invalid names, and unsafe values before serializing any response field.',
        'Escaping newline characters after concatenation prevents every response-splitting attack.'
      ),
      outcome(
        'httpproto-output-framing-selection',
        'Choose no-content, fixed-length, chunked, or close-delimited output from method, status, known length, streaming, version, and reuse policy.',
        'Chunked encoding is always the best response framing for HTTP/1.1.'
      ),
      outcome(
        'httpproto-short-write-transcript',
        'Drive all header and content bytes through a checked full-write loop and retain an exact bounded transcript for tests.',
        'bytes.Buffer tests prove a serializer handles short network writes correctly.'
      ),
      outcome(
        'httpproto-serializer-roundtrip',
        'Round-trip supported messages through independent parse and serialize paths while preserving semantics, limits, and declared normalization.',
        'Byte-for-byte round-trip identity is required even for field-name case and permitted whitespace normalization.',
        'metacognitive',
        'evaluate'
      ),
    ]
  ),
  protocolModule(
    'http-protocol-go-persistence-pipelining-order',
    'Persistent Connections, Pipelining, Ordering, Reuse, and Closure',
    'A server dispatches the next request before consuming the current body, writes responses out of order, reuses connections after framing errors, and waits forever for idle peers.',
    'persistent-connection request and response state machine',
    [
      outcome(
        'httpproto-persistence-defaults',
        'Determine HTTP/1.0 and HTTP/1.1 persistence from version, Connection options, framing completeness, errors, and local policy.',
        'Every HTTP/1.1 connection remains reusable until the peer closes it.'
      ),
      outcome(
        'httpproto-request-body-before-next',
        'Consume, reject-and-close, or deliberately drain the current framed request before parsing a subsequent request.',
        'A server can ignore an unread request body and immediately parse the next start line safely.'
      ),
      outcome(
        'httpproto-pipeline-response-order',
        'Preserve request-response ordering across pipelined HTTP/1.1 messages even when application work finishes out of order.',
        'HTTP/1.1 response order may follow handler completion because each response carries an identifier.'
      ),
      outcome(
        'httpproto-idle-timeout-reuse-budget',
        'Bound requests per connection, idle time, lifetime, buffered residual data, and closure reasons without truncating active messages.',
        'One generous idle timeout protects equally against slow clients and resource retention.'
      ),
      outcome(
        'httpproto-desynchronization-close',
        'Close and discard connection state after ambiguous framing, parse failure, incomplete output, unexpected residual bytes, or state disagreement.',
        'Returning 400 is enough to resynchronize a persistent connection after malformed framing.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  protocolModule(
    'http-protocol-go-expect-early-response',
    'Expect 100-continue, Early Responses, Body Rejection, and Draining',
    'A server reads a huge body before authentication, sends 100 after a final response, drains attacker bytes without bounds, and lets client and server wait on each other forever.',
    'expectation and early-response coordination state machine',
    [
      outcome(
        'httpproto-expectation-grammar-policy',
        'Parse Expect, support 100-continue deliberately, and return appropriate final failure for unsupported expectations.',
        'Any Expect field requires sending status 100 before validation.'
      ),
      outcome(
        'httpproto-continue-timing',
        'Send 100 Continue only after header-level policy accepts receiving content and before a final response commits.',
        'A server may send 100 Continue after it has already sent a final rejection.'
      ),
      outcome(
        'httpproto-client-continue-timeout',
        'Bound client waiting for 100, handle early final responses, and avoid sending content after rejection.',
        'A client must wait forever for 100 Continue before sending its request body.'
      ),
      outcome(
        'httpproto-early-reject-drain-close',
        'Choose bounded drain versus connection close after early rejection based on remaining framing, risk, reuse value, and deadline.',
        'Fully draining every rejected body is always safer than closing the connection.'
      ),
      outcome(
        'httpproto-expect-deadlock-proof',
        'Test client and server state transitions under delayed, missing, duplicate, fragmented, and rejected expectations without deadlock.',
        'A happy-path continue exchange proves both peers avoid coordination deadlocks.',
        'metacognitive',
        'evaluate'
      ),
    ]
  ),
  protocolModule(
    'http-protocol-go-intermediaries-hop-fields',
    'Intermediaries, Hop-by-Hop Fields, Forwarding, and Transformation',
    'A proxy forwards Connection-nominated fields, copies raw forwarding claims, changes content without metadata repair, and assumes downstream and upstream share one connection and parser.',
    'intermediary forwarding and transformation contract',
    [
      outcome(
        'httpproto-hop-by-hop-removal',
        'Remove Connection and every nominated hop-by-hop field before forwarding, then establish fields for the new hop.',
        'Hop-by-hop fields are a fixed list that never depends on the Connection field value.'
      ),
      outcome(
        'httpproto-downstream-upstream-separation',
        'Model downstream and upstream connections, framing, versions, deadlines, addresses, TLS, and failures as independent protocol hops.',
        'A reverse proxy transparently extends the client TCP connection to the origin.'
      ),
      outcome(
        'httpproto-message-transformation-metadata',
        'Update framing, validators, digests, content codings, warnings, and signatures when an intermediary transforms content.',
        'Changing representation bytes does not affect HTTP metadata if the media type stays the same.'
      ),
      outcome(
        'httpproto-via-forwarding-evidence',
        'Construct trusted Via and forwarding evidence at controlled hops without accepting client-supplied identity as authoritative.',
        'Appending one trusted value makes all earlier X-Forwarded values trustworthy.'
      ),
      outcome(
        'httpproto-intermediary-failure-ownership',
        'Assign parse, policy, connect, timeout, upstream, transform, and downstream-write failures to the correct hop and safe response boundary.',
        'Every failure observed by a proxy should be reported as an origin status 500.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  protocolModule(
    'http-protocol-go-authority-host-routing',
    'Request Authority, Host, Target Reconstruction, and Routing',
    'A server trusts any Host, accepts duplicate authority sources, reconstructs links from forwarded input, routes before validating the target, and confuses TLS identity with request authority.',
    'authority validation and target reconstruction table',
    [
      outcome(
        'httpproto-host-field-requirement',
        'Require exactly one valid Host field for HTTP/1.1 where applicable and reject missing, empty, duplicate, or invalid authority.',
        'The TCP destination address supplies HTTP authority, so Host is optional in HTTP/1.1.'
      ),
      outcome(
        'httpproto-effective-request-uri',
        'Reconstruct the effective request URI from target form, request-target, Host, connection security, and trusted configuration.',
        'The request-target alone always contains the complete effective URI.'
      ),
      outcome(
        'httpproto-absolute-form-host-consistency',
        'Handle proxy absolute-form authority and Host according to RFC rules while rejecting unsafe disagreement.',
        'When absolute-form and Host disagree, whichever appears first should control routing.'
      ),
      outcome(
        'httpproto-authority-allowlist-routing',
        'Normalize host and port only as specified, validate against configured authority, then route, cache, authorize tenants, or construct links.',
        'A syntactically valid authority is safe for password-reset links and tenant routing.'
      ),
      outcome(
        'httpproto-tls-sni-host-boundary',
        'Distinguish connection IP, TLS SNI, certificate identity, ALPN, HTTP Host or authority, and application tenant evidence.',
        'Matching SNI and Host proves the authenticated user and intended application tenant.',
        'conceptual',
        'analyze'
      ),
    ]
  ),
  protocolModule(
    'http-protocol-go-tls13-alpn-identity',
    'TLS 1.3, Certificate Identity, ALPN, and HTTPS',
    'A service enables TLS without certificate-name validation, chooses HTTP after reading encrypted application bytes, allows unsafe versions, and treats encryption as authorization and content integrity proof.',
    'TLS identity, negotiation, and protocol boundary record',
    [
      outcome(
        'httpproto-tls-record-handshake-boundary',
        'Distinguish TCP connection, TLS records, handshake, authenticated peer identity, traffic keys, alerts, application data, and closure.',
        'TLS preserves HTTP message boundaries and turns each HTTP message into one TLS record.'
      ),
      outcome(
        'httpproto-certificate-name-validation',
        'Validate certificate chain, time, DNS or IP reference identity, key usage, revocation policy, and trust roots without insecure skip flags.',
        'A certificate signed by any trusted root is valid for every requested hostname.'
      ),
      outcome(
        'httpproto-alpn-selection',
        'Offer and select application protocols with ALPN before application data and reject unsupported or inconsistent negotiation.',
        'A server can inspect the first HTTP request to decide retroactively whether ALPN selected h2.'
      ),
      outcome(
        'httpproto-tls-policy-resumption-zero-rtt',
        'Define supported versions, cipher and curve policy, session resumption, client authentication, and replay boundaries while treating early data explicitly.',
        'TLS session resumption proves a replayed application request is new.'
      ),
      outcome(
        'httpproto-https-non-guarantees',
        'State that TLS protects a connection hop but does not provide application authorization, safe methods, trusted intermediaries, malware safety, or end-to-end storage secrecy.',
        'HTTPS alone makes every request authorized and every received payload safe.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  protocolModule(
    'http-protocol-go-upgrade-connect-transitions',
    'Upgrade, CONNECT, Tunnels, WebSocket Boundaries, and Safe Transitions',
    'A client sends new-protocol bytes before acceptance, a server parses tunneled data as another HTTP request, buffered bytes disappear during handoff, and rejected transitions desynchronize the connection.',
    'confirmed protocol-transition and buffered-byte handoff state machine',
    [
      outcome(
        'httpproto-upgrade-handshake',
        'Validate Connection upgrade, Upgrade tokens, request completion, status 101, selected protocol, and ownership transfer before switching parsers.',
        'An Upgrade request authorizes the client to send the new protocol immediately.'
      ),
      outcome(
        'httpproto-connect-authority-policy',
        'Parse CONNECT authority-form, validate host and port policy, authenticate proxy use, establish the target, then transition after a successful response.',
        'CONNECT may target any supplied host and port because the server only transports bytes.'
      ),
      outcome(
        'httpproto-buffered-handoff',
        'Transfer connection, buffered unread octets, deadlines, close ownership, and cancellation atomically to the selected protocol or tunnel.',
        'Changing parser functions is enough; bufio cannot hold bytes beyond the HTTP message.'
      ),
      outcome(
        'httpproto-rfc9931-no-optimistic-bytes',
        'Apply RFC 9931 by forbidding unsafe optimistic new-protocol bytes in HTTP/1.1 until transition acceptance is known.',
        'Completing the transition request guarantees the server accepted the new protocol.'
      ),
      outcome(
        'httpproto-transition-rejection-recovery',
        'Continue HTTP/1.1 safely after a rejected transition only when buffered bytes, framing, peer behavior, and parser state remain unambiguous.',
        'Every rejected Upgrade or CONNECT must close the connection even when no optimistic bytes were sent.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  protocolModule(
    'http-protocol-go-smuggling-splitting-differentials',
    'Request Smuggling, Response Splitting, Parser Differentials, and Downgrades',
    'A front end and origin disagree on length, whitespace, duplicate fields, target decoding, and line endings; the team tests each parser alone and forwards ambiguous messages after normalization.',
    'multi-recipient parser-consistency threat model',
    [
      outcome(
        'httpproto-clte-tecl-defense',
        'Reject Transfer-Encoding plus Content-Length and conflicting length signals, consume no ambiguous next message, and close the connection.',
        'CL.TE and TE.CL ambiguity is harmless when the local parser chooses one framing rule consistently.'
      ),
      outcome(
        'httpproto-whitespace-line-differential',
        'Reject or consistently handle bare line endings, whitespace before colons, obsolete folding, leading blank lines, and invalid request-line separators across every hop.',
        'Normalizing malformed whitespace before forwarding removes all request-smuggling risk.'
      ),
      outcome(
        'httpproto-target-decoding-differential',
        'Compare raw and decoded targets, path separators, percent encodings, authority, query boundaries, and routing between policy and downstream recipients.',
        'If two parsers produce the same visible path, they necessarily enforce the same request boundary.'
      ),
      outcome(
        'httpproto-response-splitting-defense',
        'Prevent attacker-controlled CRLF and control bytes from creating new fields, responses, logs, caches, or downstream protocol records.',
        'HTML escaping is sufficient to prevent HTTP response splitting.'
      ),
      outcome(
        'httpproto-downgrade-consistency-gate',
        'Test HTTP/2 or HTTP/3 to HTTP/1.1 translation, proxy chains, cache parsing, and backend normalization with the same adversarial corpus.',
        'A safe HTTP/2 front end guarantees the translated HTTP/1.1 backend request cannot be ambiguous.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  protocolModule(
    'http-protocol-go-resource-limits-slow-clients',
    'Slow Clients, Resource Limits, Backpressure, Admission, and Cleanup',
    'A server gives every connection a goroutine and unlimited buffer, refreshes deadlines on single-byte trickles, queues output without bounds, and retries accept failures until the process collapses.',
    'connection resource budget and overload policy',
    [
      outcome(
        'httpproto-slow-header-body-defense',
        'Bound start-line, header, content, trailer, idle, and total-phase time using both progress and absolute budgets.',
        'Refreshing a read deadline after every byte defeats slow-client resource exhaustion.'
      ),
      outcome(
        'httpproto-memory-allocation-budget',
        'Bound per-connection buffers, retained slices, field maps, content queues, trailer data, and pooled-object capacity before allocation.',
        'A bounded content body guarantees total memory per connection is bounded.'
      ),
      outcome(
        'httpproto-write-backpressure',
        'Propagate slow peer writes through bounded queues, cancellation, deadlines, partial output evidence, and producer shutdown.',
        'Buffering all response bytes in memory eliminates backpressure problems.'
      ),
      outcome(
        'httpproto-admission-fairness-overload',
        'Limit connections, active parsers, work, tenant share, and output while rejecting early and preserving fairness and health evidence.',
        'A single global connection limit guarantees fair service for every tenant and request cost.'
      ),
      outcome(
        'httpproto-resource-cleanup-proof',
        'Prove connection, goroutine, timer, buffer, queue, tunnel, temporary data, and metric-cardinality cleanup for every terminal state.',
        'Defers guarantee cleanup finishes within budget after every timeout and forced shutdown.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  protocolModule(
    'http-protocol-go-state-machines-concurrency',
    'Incremental State Machines, Concurrency, Cancellation, and Ownership',
    'A parser is recursive and side-effectful, multiple goroutines read one connection, cancellation races with response writes, and error paths cannot state which component owns the buffer or close.',
    'explicit protocol state, event, invariant, and ownership model',
    [
      outcome(
        'httpproto-incremental-state-machine',
        'Represent protocol phase, required input, transition, emitted event, retained buffer, limit, and terminal result explicitly across fragmented reads.',
        'A parser that returns need-more-data has no state worth testing separately.'
      ),
      outcome(
        'httpproto-state-invariants',
        'Define invariants for cursor bounds, monotonic consumption, one framing choice, one response order, one close owner, and no effects before validation.',
        'Valid output examples are stronger evidence than invariants over every parser transition.'
      ),
      outcome(
        'httpproto-single-reader-writer-ownership',
        'Assign one coordinated reader and ordered writer per HTTP/1.1 connection with explicit handoff for tunnels and shutdown.',
        'Multiple goroutines may read one TCP stream safely because each request has a separate boundary.'
      ),
      outcome(
        'httpproto-cancellation-error-arbitration',
        'Arbitrate parse, application, peer, timeout, cancellation, write, and shutdown failures so exactly one terminal decision owns response and cleanup.',
        'The last goroutine to report an error should choose the connection outcome.'
      ),
      outcome(
        'httpproto-state-observability',
        'Record low-cardinality phase, framing source, bytes, duration, terminal reason, peer class, and correlation without raw secrets or attacker-controlled labels.',
        'Logging the entire raw message is the only way to diagnose parser state failures.',
        'professional',
        'create'
      ),
    ]
  ),
  protocolModule(
    'http-protocol-go-tests-differential-fuzz-race',
    'Golden Transcripts, net.Pipe, Differential Tests, Fuzzing, Race, and Benchmarks',
    'Tests send one complete request through loopback, compare only status, reuse the implementation as its own oracle, fuzz without invariants, and publish benchmark throughput without fragmentation or adversarial peers.',
    'layered deterministic protocol verification system',
    [
      outcome(
        'httpproto-golden-byte-transcripts',
        'Use exact byte fixtures for valid, incomplete, malformed, normalized, serialized, and residual-buffer cases with readable semantic assertions.',
        'Golden bytes should replace semantic assertions because byte equality proves every behavior.'
      ),
      outcome(
        'httpproto-netpipe-fragment-schedules',
        'Use net.Pipe or a scripted short reader and writer to test fragmentation, blocking, deadlines, half-close, cancellation, and cleanup deterministically.',
        'Loopback TCP reliably produces every fragmentation and short-write schedule needed for tests.'
      ),
      outcome(
        'httpproto-differential-nethttp',
        'Compare supported inputs with Go net/http and independent recipients while treating deliberate strictness and implementation quirks as reviewed differences.',
        'Any difference from net/http means the custom parser is wrong, even when its documented policy is stricter.'
      ),
      outcome(
        'httpproto-fuzz-properties-corpus',
        'Fuzz parser and serializer with seed corpora, fragmentation, invariants, round trips, bounds, no panic, no hang, and retained minimized failures.',
        'A fuzz target is useful only when it discovers a crash rather than a semantic or resource invariant violation.'
      ),
      outcome(
        'httpproto-race-leak-benchmark-gate',
        'Run race, leak, allocation, benchmark, profiling, and changed-load gates while separating correctness from capacity claims.',
        'Passing the race detector and a fast microbenchmark proves production protocol safety and capacity.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  protocolModule(
    'http-protocol-go-http2-frames-hpack-flow',
    'HTTP/2 Frames, Streams, HPACK, Flow Control, and Go Boundaries',
    'A team assumes HTTP/2 is compressed HTTP/1.1 text, shares one parser state across streams, ignores SETTINGS and flow control, indexes secrets into HPACK, and maps every stream failure to connection failure.',
    'HTTP/2 connection, stream, frame, and compression model',
    [
      outcome(
        'httpproto-h2-preface-settings-frames',
        'Trace connection preface, SETTINGS exchange and acknowledgement, frame header, payload length, type, flags, stream identifier, and connection errors.',
        'HTTP/2 begins with an HTTP/1.1 request line followed by binary response frames.'
      ),
      outcome(
        'httpproto-h2-stream-state-lifecycle',
        'Apply idle, open, half-closed, closed, reserved, reset, and connection shutdown transitions independently per stream.',
        'Closing one HTTP/2 stream closes the underlying TCP connection and every other stream.'
      ),
      outcome(
        'httpproto-h2-header-fields-hpack',
        'Map pseudo-fields and regular fields, enforce ordering and connection-field rules, bound HPACK tables and header lists, and avoid indexing secrets.',
        'HPACK compression is stateless per request and cannot expose cross-stream information.'
      ),
      outcome(
        'httpproto-h2-flow-priority-concurrency',
        'Coordinate stream and connection flow control, frame size, concurrent streams, backpressure, fairness, reset, GOAWAY, and retry evidence.',
        'TCP flow control alone prevents one HTTP/2 stream from consuming all application buffers.'
      ),
      outcome(
        'httpproto-h2-go-transfer-boundary',
        'Use Go 1.26 net/http and current HTTP/2 implementation for production while limiting custom work to models, frame labs, tests, and authorized disposable environments.',
        'A training frame decoder should replace the maintained Go HTTP/2 stack in production.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  protocolModule(
    'http-protocol-go-http3-quic-production',
    'HTTP/3, QUIC, QPACK, Migration, and Production Protocol Defense',
    'A release claims HTTP/3 because UDP is open, ignores QUIC connection identity and migration, treats QPACK like HPACK, advertises Alt-Svc without rollback, and cannot defend parser, TLS, proxy, or capacity evidence.',
    'multi-version protocol release and incident defense',
    [
      outcome(
        'httpproto-quic-stream-connection-model',
        'Distinguish QUIC connection IDs, encrypted packets, transport parameters, bidirectional and unidirectional streams, migration, loss recovery, and UDP path behavior.',
        'QUIC is TCP over UDP and preserves the same connection and head-of-line behavior.'
      ),
      outcome(
        'httpproto-h3-control-request-streams',
        'Trace HTTP/3 control streams, SETTINGS, request streams, frame placement, cancellation, GOAWAY, and connection versus stream errors.',
        'HTTP/3 sends every request and response through one ordered application stream.'
      ),
      outcome(
        'httpproto-qpack-blocking-limits',
        'Explain QPACK encoder and decoder streams, dynamic-table capacity, blocked streams, acknowledgements, confidentiality, and decompression limits.',
        'QPACK is identical to HPACK because both compress field sections.'
      ),
      outcome(
        'httpproto-alt-svc-negotiation-fallback',
        'Stage Alt-Svc discovery, certificate and authority checks, version negotiation, fallback, cache lifetime, disablement, and rollback without breaking HTTP/1.1 or HTTP/2.',
        'Advertising h3 causes every client to switch immediately and permanently.'
      ),
      outcome(
        'httpproto-production-protocol-defense',
        'Defend standards scope, byte parsing, framing, transitions, TLS identity, intermediaries, limits, state invariants, tests, observability, version negotiation, deployment, rollback, and residual risk.',
        'A green HTTP/3 smoke request proves all protocol versions, proxies, clients, and failure paths are production ready.',
        'professional',
        'create'
      ),
    ]
  ),
];

export const httpProtocolGoConfig = finalizeCourse(
  {
    id: 'http-protocol-go',
    competencyIdPrefix: 'httpproto-',
    title: 'HTTP Protocol Engineering in Go 1.26: Bytes to HTTP/3',
    version: '2026.07',
    audience: {
      description:
        'Go service developers who can build production HTTP clients and servers and now need byte-level protocol, parser, interoperability, and security mastery.',
      entryKnowledge: [
        'Build and defend production Go 1.26 HTTP origin services with lifecycle, semantics, limits, tests, observability, and recovery.',
        'Build robust Go HTTP clients with context, streaming, retries, TLS, redirects, and explicit trust boundaries.',
      ],
      deviceConstraints: [
        'Modern browser; learner Go runs only in the isolated deterministic Go worker. Browser tasks model octets, framing, parser states, and protocol decisions without opening sockets, contacting networks, reading host files, using credentials, or negotiating live TLS.',
      ],
      accessibilityAssumptions: [
        'Byte diagrams, protocol state machines, frame layouts, packet traces, timelines, and parser tables include equivalent structured text and keyboard-operable evidence.',
      ],
    },
    scope: {
      includes: [
        'Go 1.26.5 octet and stream handling, partial I/O, TCP lifecycle, strict bounded HTTP/1.1 parsing and serialization, request targets, fields, framing, fixed and chunked content, trailers, response control data, persistence, expectations, intermediaries, authority, TLS 1.3, ALPN, Upgrade, CONNECT, request smuggling and response splitting defense, slow-client limits, state machines, differential and fuzz testing, HTTP/2 frames and HPACK, HTTP/3 QUIC and QPACK, deployment, and incident defense',
        'Runnable deterministic pure-Go protocol decision models plus explicit compilation, net.Pipe, loopback socket, TLS, proxy, packet-capture, fuzz, race, load, HTTP/2, HTTP/3, and production transfer gates',
        'Five cumulative protocol-engineering projects and a performance-based certification exam',
      ],
      excludes: [
        'Replacing maintained Go net/http, HTTP/2, HTTP/3, TLS, or QUIC implementations in production with training parsers',
        'Browser execution of sockets, listeners, host processes, packet capture, live TLS, proxies, external networks, credentials, or untrusted code',
      ],
      nextCourses: ['pubsub-rabbitmq-go', 'file-servers-s3-go'],
    },
    sources: [
      {
        title: 'Go 1.26 Release Notes and Current Release',
        authority: 'official-docs',
        url: 'https://go.dev/doc/go1.26',
        version: 'Go 1.26.5 current stable release, reviewed 2026-07-14',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls the supported language and standard-library baseline and current network, TLS, testing, and runtime behavior.',
      },
      {
        title: 'Go net Package',
        authority: 'official-docs',
        url: 'https://pkg.go.dev/net@go1.26.5',
        version: 'Go 1.26.5',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls Conn and Listener interfaces, TCP reads and writes, deadlines, half-close behavior, addresses, Dial, Listen, and net.Pipe transfer work.',
      },
      {
        title: 'Go bufio, io, and net/textproto Packages',
        authority: 'official-docs',
        url: 'https://pkg.go.dev/bufio@go1.26.5',
        version: 'Go 1.26.5',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls buffered byte ownership, incremental reads, Writer behavior, limited readers, full reads and writes, MIME-style field parsing, and documented limits.',
      },
      {
        title: 'Go crypto/tls Package',
        authority: 'official-docs',
        url: 'https://pkg.go.dev/crypto/tls@go1.26.5',
        version: 'Go 1.26.5',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls TLS connections, configuration, certificate verification, ALPN, versions, resumption, client authentication, and close behavior.',
      },
      {
        title: 'Go net/http Package as Differential Reference',
        authority: 'official-docs',
        url: 'https://pkg.go.dev/net/http@go1.26.5',
        version: 'Go 1.26.5',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls maintained production behavior, request and response semantics, ReadRequest, server and transport boundaries, protocol configuration, and differential test expectations.',
      },
      {
        title: 'Go Fuzzing and Security Best Practices',
        authority: 'official-docs',
        url: 'https://go.dev/doc/security/fuzz/',
        version: 'Current 2026-07',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls coverage-guided fuzzing, seed corpora, minimized regression cases, race and vulnerability practice, and supported-toolchain security gates.',
      },
      {
        title: 'HTTP Semantics',
        authority: 'standard',
        url: 'https://www.rfc-editor.org/rfc/rfc9110.html',
        version: 'RFC 9110 STD 97',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls version-neutral HTTP architecture, resources, messages, fields, methods, status, content, routing, intermediaries, and Upgrade and CONNECT semantics.',
      },
      {
        title: 'HTTP Caching',
        authority: 'standard',
        url: 'https://www.rfc-editor.org/rfc/rfc9111.html',
        version: 'RFC 9111',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls cache participation, transformations, freshness, validators, invalidation, and intermediary metadata boundaries.',
      },
      {
        title: 'HTTP/1.1',
        authority: 'standard',
        url: 'https://www.rfc-editor.org/rfc/rfc9112.html',
        version: 'RFC 9112 STD 99 updated by RFC 9931',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls textual message grammar, parsing, request targets, fields, body length precedence, chunked coding, persistence, connection management, smuggling, and splitting defense.',
      },
      {
        title: 'HTTP/2',
        authority: 'standard',
        url: 'https://www.rfc-editor.org/rfc/rfc9113.html',
        version: 'RFC 9113',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls binary frames, streams, settings, flow control, field mapping, errors, GOAWAY, security, and HTTP/1.1 translation boundaries.',
      },
      {
        title: 'HPACK Header Compression for HTTP/2',
        authority: 'standard',
        url: 'https://www.rfc-editor.org/rfc/rfc7541.html',
        version: 'RFC 7541',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls HTTP/2 static and dynamic tables, integer and string encoding, indexing policy, limits, and compression security.',
      },
      {
        title: 'HTTP/3',
        authority: 'standard',
        url: 'https://www.rfc-editor.org/rfc/rfc9114.html',
        version: 'RFC 9114',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls HTTP over QUIC, control and request streams, settings, frame placement, cancellation, GOAWAY, priorities, and security.',
      },
      {
        title: 'QUIC Transport Protocol',
        authority: 'standard',
        url: 'https://www.rfc-editor.org/rfc/rfc9000.html',
        version: 'RFC 9000',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls QUIC connections, stream types, connection IDs, flow control, migration, loss behavior, transport parameters, and termination.',
      },
      {
        title: 'QPACK Field Compression for HTTP/3',
        authority: 'standard',
        url: 'https://www.rfc-editor.org/rfc/rfc9204.html',
        version: 'RFC 9204',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls QPACK tables, encoder and decoder streams, blocking, acknowledgements, limits, and confidentiality boundaries.',
      },
      {
        title: 'Transmission Control Protocol',
        authority: 'standard',
        url: 'https://www.rfc-editor.org/rfc/rfc9293.html',
        version: 'RFC 9293 STD 7',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls TCP reliable byte streams, states, sequencing, flow control, resets, closes, robustness, and application-facing transport assumptions.',
      },
      {
        title: 'The Transport Layer Security Protocol Version 1.3',
        authority: 'standard',
        url: 'https://www.rfc-editor.org/rfc/rfc8446.html',
        version: 'RFC 8446',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls TLS 1.3 handshake, records, authentication, resumption, early data, alerts, closure, and security boundaries.',
      },
      {
        title: 'TLS Application-Layer Protocol Negotiation',
        authority: 'standard',
        url: 'https://www.rfc-editor.org/rfc/rfc7301.html',
        version: 'RFC 7301',
        reviewedAt: REVIEWED_AT,
        scope: 'Controls ALPN protocol offers and server selection during the TLS handshake.',
      },
      {
        title: 'Structured Field Values for HTTP',
        authority: 'standard',
        url: 'https://www.rfc-editor.org/rfc/rfc9651.html',
        version: 'RFC 9651, 2024',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls strict typed HTTP field lists, dictionaries, items, serialization, parsing, extensibility, and resource limits.',
      },
      {
        title: 'Security Considerations for Optimistic Protocol Transitions in HTTP/1.1',
        authority: 'standard',
        url: 'https://www.rfc-editor.org/rfc/rfc9931.html',
        version: 'RFC 9931, March 2026',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls current HTTP/1.1 Upgrade and CONNECT transition safety, rejection behavior, optimistic bytes, and request-smuggling prevention.',
      },
      {
        title: 'ACM IEEE-CS AAAI Computer Science Curricula 2023',
        authority: 'curriculum-framework',
        url: 'https://csed.acm.org/wp-content/uploads/2025/11/CS2023-Report.htm',
        version: 'CS2023 final report',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls networking application-layer protocol, TCP and socket API, state-machine, reliability, security, systems-thinking, implementation, analysis, and meticulous professional-outcome coverage.',
      },
    ],
    sharedRequirements: [
      'Every activity retrieves Go, HTTP client and server, accessibility, security, testing, context, cleanup, and evidence habits before adding one protocol boundary.',
      'Browser Go is deterministic and isolated. It models octets, framing, state, policy, and changed cases but never opens sockets, negotiates TLS, contacts networks or proxies, captures packets, executes host commands, reads host state, or handles credentials.',
      'Passing work requires exact bytes or state input, a named invariant and owner, bounded resource and time policy, observable changed and failure results, cleanup and recovery, and explicit full-toolchain transfer limits.',
    ],
    modules,
    projects: [
      project(
        'httpproto-request-parser-core',
        'Fragment-Safe HTTP/1.1 Request Parser',
        'http-protocol-go-request-line-targets',
        'A municipal gateway and assistive-client integration team',
        'They need a strict bounded Go parser that preserves layer evidence, handles fragmented TCP bytes, enforces deadlines, separates semantics from syntax, applies ABNF limits, and parses all request-target forms without side effects.',
        [
          'httpproto-outcome-evidence-contract',
          'httpproto-fragmentation-invariance',
          'httpproto-read-write-deadlines',
          'httpproto-parse-validate-effect-phases',
          'httpproto-request-line-changed-case',
        ]
      ),
      project(
        'httpproto-framing-serializer-engine',
        'Bounded Framing, Chunking, and Response Engine',
        'http-protocol-go-response-serialization-writes',
        'A regional emergency-status protocol team',
        'They need exact field handling, RFC 9112 body-length precedence, fixed and chunked content, trailers, response semantics, short-write-safe serialization, and round-trip evidence under changed fragmentation.',
        [
          'httpproto-field-resource-disclosure',
          'httpproto-framing-completeness-evidence',
          'httpproto-content-decoding-limit',
          'httpproto-chunked-changed-corpus',
          'httpproto-serializer-roundtrip',
        ]
      ),
      project(
        'httpproto-secure-connection-gateway',
        'Persistent TLS and Protocol-Transition Gateway',
        'http-protocol-go-upgrade-connect-transitions',
        'A privacy-sensitive partner gateway team',
        'They need ordered persistent HTTP/1.1 connections, bounded expectations, trusted intermediary behavior, validated authority, TLS 1.3 identity and ALPN, and confirmed Upgrade and CONNECT handoff without optimistic bytes.',
        [
          'httpproto-desynchronization-close',
          'httpproto-expect-deadlock-proof',
          'httpproto-intermediary-failure-ownership',
          'httpproto-tls-sni-host-boundary',
          'httpproto-rfc9931-no-optimistic-bytes',
        ]
      ),
      project(
        'httpproto-adversarial-parser-lab',
        'Adversarial Multi-Hop Protocol Verification Lab',
        'http-protocol-go-tests-differential-fuzz-race',
        'A proxy, origin, and security response group',
        'They need shared parser-differential corpora, smuggling and splitting defense, bounded slow-client behavior, explicit state invariants, golden transcripts, net.Pipe schedules, differential tests, fuzzing, race, leak, and capacity gates.',
        [
          'httpproto-downgrade-consistency-gate',
          'httpproto-resource-cleanup-proof',
          'httpproto-state-invariants',
          'httpproto-netpipe-fragment-schedules',
          'httpproto-race-leak-benchmark-gate',
        ]
      ),
      project(
        'httpproto-multiversion-production-defense',
        'HTTP/1.1, HTTP/2, and HTTP/3 Production Defense',
        'http-protocol-go-http3-quic-production',
        'An engineering, security, accessibility, client, network, and operations review board',
        'The board needs a defended multi-version protocol model, HPACK and QPACK limits, stream and connection error isolation, Go production-library boundaries, safe Alt-Svc rollout, observability, rollback, incident evidence, and residual-risk ownership.',
        [
          'httpproto-h2-stream-state-lifecycle',
          'httpproto-h2-flow-priority-concurrency',
          'httpproto-h2-go-transfer-boundary',
          'httpproto-alt-svc-negotiation-fallback',
          'httpproto-production-protocol-defense',
        ]
      ),
    ],
    examContext:
      'Unfamiliar Go 1.26 protocol cases spanning octets, fragmented I/O, TCP, strict HTTP/1.1 grammar, request targets, fields, framing, fixed and chunked content, response semantics and serialization, persistence, expectations, intermediaries, authority, TLS, ALPN, Upgrade, CONNECT, smuggling, splitting, slow clients, state invariants, differential and fuzz tests, HTTP/2, HTTP/3, rollout, rollback, and incident defense with explicit live transfer limits.',
    minimumQuestionBankSize: 760,
  },
  { researchedAt: RESEARCHED_AT, prerequisiteCourseIds: ['http-servers-go'] }
);

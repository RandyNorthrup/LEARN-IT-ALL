import { finalizeCourse, project, skill } from './course-config-helpers.mjs';

const REVIEWED_AT = '2026-07-15';
const RESEARCHED_AT = '2026-07-15T23:45:00.000Z';

function outcome(id, statement, misconception, knowledgeType = 'procedural', level = 'apply') {
  if (!misconception) throw new Error(`Missing Go crawler misconception for ${id}`);
  return skill(id, statement, misconception, knowledgeType, level);
}

function crawlerModule(id, title, context, artifact, specs) {
  const skills = specs.map((entry) => outcome(...entry));
  return {
    id,
    title,
    context,
    artifact,
    objectives: skills.slice(0, 3).map((entry) => entry[1]),
    skills,
    contexts: {
      theory: `${context} Predict owner authority, URL and HTTP state, Go ownership, bounded work, accessibility impact, failure, cleanup, and evidence before reading the governing source.`,
      workshop: `A cooperative of small public-service publishers incrementally builds ${artifact} from original deterministic HTTP, robots, sitemap, HTML, graph, and report fixtures while retaining prior Go, web, Git, accessibility, security, testing, and recovery requirements.`,
      debug: `A preserved Go crawl trace contains one plausible scope, URL, robots, transport, body, tokenizer, goquery, frontier, goroutine, Colly callback, report, security, or shutdown defect; identify the first broken invariant before editing.`,
      lab: `An independent community information owner supplies a different origin, HTML structure, rate contract, accessibility need, resource ceiling, and injected failure and transfers ${title.toLowerCase()} into a changed ${artifact}.`,
      review: `A delayed operations review reconstructs ${title.toLowerCase()} from revision, authorization, seed, URL, robots decision, request, response bytes, tree identity, record provenance, frontier transition, goroutine owner, report row, failure, cleanup, and recovery evidence.`,
      quiz: `A release reviewer compares near-miss Go decisions for ${title.toLowerCase()} and accepts only compile and runtime changed-case evidence, explicit non-claims, and named network, DNS, parser, browser, accessibility, security, load, legal-review, and production transfer gates.`,
    },
  };
}

const modules = [
  crawlerModule(
    'crawler-go-outcomes-owner-duty',
    'Owner Duty, Stakeholder Outcomes, Privacy, and Evidence',
    'A team proposes a fast crawler because pages are public but cannot name the site owner, affected users, permitted purpose, stop contact, retained fields, or useful decision.',
    'owner-approved site-quality mission charter',
    [
      [
        'crawler-go-stakeholder-outcome',
        'Define stakeholder, affected users, decision, page population, acceptable delay, success, failure harm, and observable value.',
        'Collecting more pages automatically creates more stakeholder value.',
        'strategic',
        'create',
      ],
      [
        'crawler-go-owner-permission',
        'Record controlling owner, allowed product identity, origins, paths, methods, schedule, purpose, expiry, and revocation contact.',
        'Public accessibility means automation is authorized.',
        'professional',
        'evaluate',
      ],
      [
        'crawler-go-policy-vs-law',
        'Separate robots preferences and technical access from contracts, privacy, copyright, jurisdiction, and qualified legal review.',
        'robots.txt decides every ethical and legal question.',
        'professional',
        'evaluate',
      ],
      [
        'crawler-go-minimum-data',
        'Define necessary fields, purpose, access, retention, correction, deletion, aggregation risk, and derived-artifact propagation.',
        'Public personal data can be retained indefinitely without harm.',
        'professional',
        'create',
      ],
      [
        'crawler-go-claim-layers',
        'Separate pure model, compile, unit, httptest, local DNS, controlled site, race, browser, accessibility, load, and production evidence.',
        'A green unit test proves live crawler behavior.',
        'metacognitive',
        'evaluate',
      ],
    ]
  ),
  crawlerModule(
    'crawler-go-toolchain-module-reproduction',
    'Go 1.26 Toolchain, Module Graph, Dependencies, and Reproduction',
    'The binary comes from an unknown revision with floating modules, undocumented build tags, warm caches, unreviewed transitive code, and no clean rebuild.',
    'reproducible Go crawler repository baseline',
    [
      [
        'crawler-go-version-contract',
        'Pin Go 1.26.5, platform, architecture, module mode, build tags, toolchain directive, and supported runtime matrix.',
        'Any recent Go compiler produces identical network and runtime behavior.',
      ],
      [
        'crawler-go-library-contract',
        'Pin goquery 1.12.0, Colly 2.3.0, robotstxt 1.1.2, and x/net 0.57.0 with compatibility, provenance, license, and maintenance evidence.',
        'go.sum proves every module is safe and compatible.',
      ],
      [
        'crawler-go-build-identity',
        'Bind source revision, module graph, generated fixtures, embed inputs, build settings, VCS metadata, binary digest, and configuration schema.',
        'A binary filename identifies its source and dependency inputs.',
      ],
      [
        'crawler-go-clean-gates',
        'Prove format, generate, module verification, tests, race, fuzz, vet, vulnerability review, build, binary metadata, and smoke from clean state.',
        'Cached go test and go build results are clean reproduction evidence.',
      ],
      [
        'crawler-go-baseline-recovery',
        'Capture existing behavior, configuration, secrets inventory, repository status, artifacts, fixtures, and rollback anchor before change.',
        'A guided project does not need a recovery point.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-go-packages-ownership-lifecycle',
    'Package Boundaries, Interfaces, Value Ownership, and Lifecycle',
    'Callbacks mutate shared maps, packages import concrete clients and global loggers, byte slices outlive response bodies, and shutdown cannot account for goroutines.',
    'directed owned Go crawler graph',
    [
      [
        'crawler-go-directed-packages',
        'Direct policy, fetch, robots, parse, extract, frontier, audit, store, report, and command dependencies inward through consumer-owned interfaces.',
        'One package per technical noun guarantees useful separation.',
        'strategic',
        'create',
      ],
      [
        'crawler-go-value-ownership',
        'Specify ownership and copy rules for URLs, headers, byte slices, DOM selections, records, errors, and report rows crossing boundaries.',
        'Go values are always copied deeply and cannot share mutable state.',
      ],
      [
        'crawler-go-interface-placement',
        'Define minimal interfaces at use sites and retain concrete constructors and lifecycle ownership at composition boundaries.',
        'Every dependency should expose a large provider-owned interface.',
      ],
      [
        'crawler-go-resource-ledger',
        'Assign owners and close order for bodies, files, timers, transports, goroutines, channels, Colly collectors, and browser-service clients.',
        'defer automatically closes every resource at the correct lifetime.',
      ],
      [
        'crawler-go-error-taxonomy',
        'Wrap causal errors with operation and identity while preserving cancellation, timeout, policy rejection, retryability, and operator action.',
        'Formatted error strings are enough for reliable program decisions.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-go-crawl-charter-scope',
    'Seeds, Origins, Paths, Budgets, and Kill Policy',
    'One starting URL expands to subdomains, calendar archives, query permutations, media files, logout actions, and endless retries with no explicit resource ceiling.',
    'testable bounded crawl charter',
    [
      [
        'crawler-go-seed-record',
        'Bind each seed to owner authorization, purpose, expected page class, policy revision, contact, start window, and expiry.',
        'Host plus start path is sufficient crawl evidence.',
      ],
      [
        'crawler-go-origin-allowlist',
        'Define allowed schemes, ASCII hosts, ports, subdomains, redirects, and embedded resources under deny-by-default policy.',
        'Same registrable domain always shares control and authorization.',
      ],
      [
        'crawler-go-path-method-query',
        'Express methods, path prefixes, queries, fragments, pagination, downloads, forms, and content types as deterministic admission rules.',
        'Same-host links are necessarily safe and in scope.',
      ],
      [
        'crawler-go-resource-ceilings',
        'Bound pages, depth, requests, redirects, wire and decoded bytes, duration, retries, goroutines, open bodies, disk, and report rows.',
        'Per-request delay prevents every runaway resource failure.',
      ],
      [
        'crawler-go-kill-contact-policy',
        'Provide automatic stop signals, owner pause, context cancellation, partial-output rules, cleanup, incident notification, and restart authorization.',
        'Workers should finish the queue after an owner revokes permission.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-go-neturl-identity-scope',
    'net/url References, Escaping, Host Identity, and Conservative Keys',
    'Opaque and hierarchical URLs, RawPath, default ports, fragments, Unicode hosts, query encoding, and base resolution are reduced to unsafe string operations.',
    'Go URL identity and scope admission pipeline',
    [
      [
        'crawler-go-url-structure',
        'Use net/url parsing while distinguishing scheme, opaque data, userinfo, host, port, Path, RawPath, RawQuery, and Fragment.',
        'Splitting strings on slash and question mark matches Go URL semantics.',
      ],
      [
        'crawler-go-reference-resolution',
        'Resolve reference forms against final response and valid document base URLs while retaining raw and resolved provenance.',
        'path.Join correctly resolves web references.',
      ],
      [
        'crawler-go-escaped-path-policy',
        'Compare decoded and escaped paths deliberately and reject ambiguous, invalid, double-encoded, or policy-changing representations.',
        'URL.Path contains complete original escaping evidence.',
      ],
      [
        'crawler-go-host-idna-boundary',
        'Separate Unicode display, IDNA network host, IP literal, zone, port, and confusable evidence before dialing or reporting.',
        'Lowercasing Host is enough canonicalization for every host.',
      ],
      [
        'crawler-go-url-key-policy',
        'Define conservative fragment, default-port, path, percent-encoding, query, and tracking rules without collapsing distinct resources.',
        'URL.String returns a universal canonical crawl key.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-go-robots-rfc9309-conformance',
    'RFC 9309 Matching, Failure Semantics, Caching, and Go Adapter',
    'The crawler trusts a Go package name, matches the first rule, fetches robots from the wrong service, ignores encoded paths, and treats an outage as permission.',
    'conformance-tested robots decision engine',
    [
      [
        'crawler-go-robots-origin-agent',
        'Fetch `/robots.txt` at the correct service origin with an honest stable product token and contact identity.',
        'Any robots path or generic browser label has equivalent policy meaning.',
      ],
      [
        'crawler-go-robots-group-match',
        'Apply RFC 9309 product-token matching, group merge, percent encoding, longest rule, and allow tie behavior.',
        'The earliest textual rule that resembles a path wins.',
      ],
      [
        'crawler-go-robots-response-state',
        'Classify success, redirects, unavailable, unreachable, oversized, malformed, stale cache, and owner-stop states conservatively.',
        'Every 4xx, 5xx, timeout, and DNS failure has the same allow result.',
      ],
      [
        'crawler-go-robotstxt-adapter',
        'Wrap temoto/robotstxt behind owned types and compare library behavior to RFC 9309 conformance fixtures and documented deviations.',
        'Using a mature package removes need for protocol tests.',
      ],
      [
        'crawler-go-robots-extension-policy',
        'Treat sitemap, crawl-delay, request-rate, and other extensions as separately documented hints or owner policy.',
        'RFC 9309 standardizes crawl-delay across crawlers.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-go-sitemap-streaming-xml',
    'Streaming Sitemap XML, Index Graphs, and Admission Bounds',
    'The program unmarshals entire sitemap indexes, accepts foreign locations, follows nested cycles, trusts lastmod, and loses the index path that discovered each URL.',
    'streaming bounded sitemap graph',
    [
      [
        'crawler-go-sitemap-token-stream',
        'Use encoding/xml tokens to validate namespace, root, UTF-8, loc, escaping, depth, counts, bytes, and trailing content without whole-tree allocation.',
        'xml.Unmarshal is automatically safe for any sitemap size.',
      ],
      [
        'crawler-go-sitemap-index-graph',
        'Model sitemap indexes as a bounded directed graph with unique identities, depth limits, cycle detection, and stable traversal.',
        'Sitemap index files cannot form cycles.',
      ],
      [
        'crawler-go-sitemap-host-rules',
        'Apply protocol location rules plus authorization, URL, robots, redirect, DNS, and SSRF policy to every sitemap and page entry.',
        'Owner-provided sitemap URLs bypass normal scope checks.',
      ],
      [
        'crawler-go-sitemap-hint-evidence',
        'Treat lastmod, changefreq, and priority as untrusted scheduling hints verified against observed representation history.',
        'lastmod guarantees the actual page change time.',
      ],
      [
        'crawler-go-sitemap-provenance',
        'Retain source digest, index chain, entry position, raw loc, resolved key, decision, and rejection cause.',
        'Final URL alone explains sitemap discovery.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-go-http-transport-body',
    'net/http Transport Ownership, Redirects, Bodies, and Timeouts',
    'Every request creates a Client, redirects escape policy, response bodies leak on errors, Client.Timeout hides phase causes, and ReadAll ignores size.',
    'owned bounded net/http retrieval adapter',
    [
      [
        'crawler-go-transport-reuse',
        'Configure and reuse one owned Transport with explicit proxy, dial, TLS, idle pool, compression, limits, and CloseIdleConnections policy.',
        'Creating a new Client and Transport per URL improves isolation.',
      ],
      [
        'crawler-go-request-identity',
        'Build safe retrieval requests with context, honest User-Agent and contact, Accept, validators, method, credentials, and trace identity.',
        'Imitating a consumer browser is required for compliant crawling.',
      ],
      [
        'crawler-go-checkredirect-policy',
        'Use CheckRedirect to reapply authorization, URL, credentials, method, DNS, loop, and hop budgets while retaining the chain.',
        'net/http redirect defaults preserve crawler scope automatically.',
      ],
      [
        'crawler-go-bounded-body-read',
        'Layer wire and decoded limits, inspect media and coding, detect truncation, and close on every admitted and rejected path.',
        'io.LimitReader alone tells callers when a body exceeded the limit.',
      ],
      [
        'crawler-go-timeout-context',
        'Assign dial, TLS, header, body, attempt, job, and shutdown deadlines through Transport settings and context causes.',
        'One Client.Timeout value gives precise timeout ownership and diagnosis.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-go-dial-ssrf-defense',
    'DNS Resolution, Address Classes, Redirects, Proxies, and SSRF',
    'A host passes validation before DNS then resolves or redirects to loopback, private, link-local, metadata, IPv4-mapped, zone-scoped, or rebinding targets.',
    'validated connection-time dial policy',
    [
      [
        'crawler-go-scheme-port-userinfo',
        'Allowlist HTTP schemes and ports, reject userinfo and ambiguous host syntax, and prohibit unsupported protocols.',
        'url.Parse success makes a destination safe to dial.',
      ],
      [
        'crawler-go-netip-classification',
        'Use net/netip to classify all IPv4 and IPv6 answers including mapped, loopback, private, link-local, multicast, unspecified, and metadata ranges.',
        'Blocking RFC 1918 strings covers private destinations.',
      ],
      [
        'crawler-go-controlled-dial',
        'Bind admitted addresses to DialContext or a controlled egress proxy and verify each new connection and re-resolution.',
        'DNS validation before Client.Do prevents rebinding.',
      ],
      [
        'crawler-go-mixed-answer-policy',
        'Reject, filter, or pin mixed public and forbidden address sets under explicit fail-closed policy and causal evidence.',
        'Choosing the first public DNS answer is always safe.',
      ],
      [
        'crawler-go-egress-defense-depth',
        'Combine application checks with proxy rules, firewall egress, metadata denial, network namespace, and production observation.',
        'Correct Go code alone can guarantee every network route.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-go-representation-decoding',
    'Content Codings, Character Sets, Media Admission, and Digests',
    'Compressed and decoded sizes are conflated, unknown encodings are guessed, binary responses reach HTML parsing, and one digest represents every stage.',
    'representation decoding and identity ledger',
    [
      [
        'crawler-go-wire-decoded-budgets',
        'Track wire, compressed, decoded, retained, parsed, and extracted sizes and stop before resource ceilings.',
        'Small compressed input is necessarily safe to decode.',
      ],
      [
        'crawler-go-coding-chain',
        'Validate content-coding order and classify unsupported, corrupt, partial, over-budget, and cancellation outcomes.',
        'Unknown compression can be ignored and parsed as text.',
      ],
      [
        'crawler-go-media-admission',
        'Use transport media type plus conservative sniff evidence to accept HTML or XML and reject binary and ambiguous bodies.',
        'A .html path guarantees HTML representation bytes.',
      ],
      [
        'crawler-go-charset-reader',
        'Reconcile transport, BOM, HTML declarations, decoder support, replacement errors, and source offsets with an allowlisted decoder.',
        'Converting response bytes directly to string correctly decodes the web.',
      ],
      [
        'crawler-go-stage-digests',
        'Keep raw, decoded, tree, main-content, record, and rendered digests separate with algorithm and version.',
        'One SHA-256 value is complete representation identity.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-go-html-tokenizer-goquery',
    'HTML Tokenization, Tree Construction, goquery, and Parser Differentials',
    'Source markup is treated as browser DOM, tokenizer and tree APIs are mixed, goquery is assumed to run JavaScript, malformed HTML repair is never tested.',
    'budgeted Go HTML tree adapter',
    [
      [
        'crawler-go-token-vs-tree',
        'Choose streaming tokenizer or x/net/html tree from required context, memory, malformed-input behavior, and selector needs.',
        'Tokenizer and DOM tree APIs expose equivalent information and cost.',
      ],
      [
        'crawler-go-goquery-document',
        'Construct goquery documents from admitted readers and preserve base, source, parser, and response identity outside selections.',
        'goquery selections retain complete network and source provenance automatically.',
      ],
      [
        'crawler-go-malformed-tree-fixtures',
        'Test implied elements, misnesting, tables, templates, foreign content, comments, duplicate attributes, and deep input.',
        'Malformed HTML returns a parser error instead of a repaired tree.',
      ],
      [
        'crawler-go-parser-browser-diff',
        'Compare Go tree results with controlled browser DOM for risk-bearing cases and classify every material difference.',
        'Matching text output proves tree equivalence.',
      ],
      [
        'crawler-go-node-work-budget',
        'Bound input bytes, tokens, nodes, depth, attributes, text, selector work, and parse time with explicit rejection.',
        'Body byte limit bounds all parser CPU and memory.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-go-selector-typed-extraction',
    'Selectors, Cardinality, Domain Types, and Extraction Drift',
    'A goquery Find call takes the first match, strings flow directly into records, absent and empty collapse, and selector drift silently changes meaning.',
    'typed cardinality-aware extraction pipeline',
    [
      [
        'crawler-go-selector-scope',
        'Define selection root, selector support, expected cardinality, fallback, exclusion, and source evidence for each field.',
        'A non-empty Selection proves selector correctness.',
      ],
      [
        'crawler-go-cardinality-result',
        'Return explicit zero, one, many, invalid, conflicting, and fallback outcomes rather than hiding them behind Find and First.',
        'Taking First is safe whenever multiple nodes exist.',
      ],
      [
        'crawler-go-domain-constructors',
        'Parse external strings through constructors for URLs, language, dates, identifiers, enumerations, and bounded text.',
        'Named Go string types validate their contents automatically.',
      ],
      [
        'crawler-go-field-normalization',
        'Apply field-specific entity, Unicode, whitespace, line, hidden-text, and alternate-text rules with retained raw evidence.',
        'strings.TrimSpace creates canonical extracted text.',
      ],
      [
        'crawler-go-selector-drift',
        'Track cardinalities, fallback use, rejection rate, representative fixtures, schema revision, and changed markup alerts.',
        'Broken selectors always panic or return zero matches.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-go-record-provenance-quality',
    'Versioned Records, Field Provenance, Reconciliation, and Corrections',
    'The tool emits structs without source spans, parser versions, transformations, rejected values, or lineage and cannot explain or correct a field.',
    'loss-aware auditable Go record model',
    [
      [
        'crawler-go-record-version',
        'Version record schema, semantic meaning, missingness, invariants, serialization, and migration separately from source markup.',
        'Changing a struct and recompiling migrates stored records.',
      ],
      [
        'crawler-go-field-lineage',
        'Attach run, URL, response, node or attribute, raw digest, transform, timestamp, and decision evidence to each admitted field.',
        'Source URL is enough provenance for every field.',
      ],
      [
        'crawler-go-rejection-ledger',
        'Preserve bounded causal rejected values and counts without leaking sensitive content or silently inventing defaults.',
        'Invalid fields should be dropped so output stays clean.',
      ],
      [
        'crawler-go-count-reconciliation',
        'Reconcile discovered, admitted, fetched, parsed, extracted, rejected, duplicated, changed, and reported populations.',
        'Many emitted rows prove crawler completeness.',
      ],
      [
        'crawler-go-correction-propagation',
        'Propagate owner correction, deletion, retention expiry, parser fix, and schema migration through versions and reports.',
        'Regenerating current output automatically repairs all historical derivatives.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-go-link-graph-semantics',
    'Link-Bearing Elements, Relations, Base URLs, and Crawl Graph',
    'Only anchor tags are inspected, every href becomes a page, relation and base semantics disappear, and fetched URL sets stand in for a graph.',
    'semantic provenance-rich link graph',
    [
      [
        'crawler-go-link-elements',
        'Distinguish navigation, resource, metadata, embedded, form, media, and alternate URL-bearing HTML elements.',
        'All relevant crawl links are anchor href values.',
      ],
      [
        'crawler-go-base-resolution',
        'Use first valid base semantics against final response URL and retain accepted and rejected base evidence.',
        'Every base element should update resolution for later links.',
      ],
      [
        'crawler-go-rel-policy',
        'Interpret rel tokens, canonical, alternate, hreflang, download, media, nofollow, and target under explicit owner policy.',
        'nofollow is an authorization control.',
      ],
      [
        'crawler-go-reference-classification',
        'Reject or classify fragment, empty, malformed, mailto, tel, javascript, data, credentials, and unsupported schemes before scheduling.',
        'Every successfully parsed reference is fetchable.',
      ],
      [
        'crawler-go-edge-evidence',
        'Store source and target identity, element, attribute, raw value, relation, scope decision, and observation separately from fetch state.',
        'A URL set is enough to explain site structure.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-go-frontier-queue-state',
    'Frontier Queues, Visited Reservation, State Transitions, and Determinism',
    'Workers share slices and maps, visited is marked after success, duplicate discoveries race, retries overwrite terminal state, and ordering changes every run.',
    'race-safe deterministic frontier state machine',
    [
      [
        'crawler-go-frontier-transition',
        'Define discovered, rejected, queued, claimed, fetching, fetched, parsed, retryable, terminal, and canceled states with legal transitions.',
        'Queued, visited, and complete are equivalent crawler states.',
      ],
      [
        'crawler-go-reserve-on-schedule',
        'Reserve admitted URL keys atomically before enqueue so concurrent discoveries cannot duplicate effects.',
        'Marking visited after fetch prevents duplicate requests.',
      ],
      [
        'crawler-go-priority-heap',
        'Use stable priority and tie keys for owner commitments, depth, page class, freshness, origin fairness, and retry readiness.',
        'Map iteration and channel arrival provide acceptable deterministic order.',
      ],
      [
        'crawler-go-frontier-owner',
        'Make one component own transitions and expose messages or methods instead of sharing mutable queue and maps among workers.',
        'A mutex around each map makes combined frontier transitions atomic.',
      ],
      [
        'crawler-go-frontier-invariants',
        'Check unique active owner, bounded counts, terminal immutability, no lost work, stable ordering, and graph reconciliation.',
        'Race-detector silence proves logical frontier correctness.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-go-url-space-traps',
    'URL Space Traps, Structural Fingerprints, Soft Errors, and Stop Evidence',
    'Calendars, facets, search pages, sessions, sort orders, repeated path segments, and soft errors create limitless unique keys under the page cap.',
    'trap detection and bounded containment policy',
    [
      [
        'crawler-go-trap-features',
        'Detect temporal, pagination, facet, search, session, nonce, sort, repeated-segment, depth, and parameter-combination expansion.',
        'Only exact duplicate links cause crawl loops.',
      ],
      [
        'crawler-go-template-budget',
        'Bound distinct path templates, query keys, values, combinations, depths, and pages per class with owned exceptions.',
        'One total page limit fully explains and controls infinite spaces.',
      ],
      [
        'crawler-go-soft-error-signals',
        'Combine status, redirect, title, main text, structure, known markers, and repetition to classify soft error and challenge pages.',
        'HTTP 200 means useful content.',
      ],
      [
        'crawler-go-structural-similarity',
        'Use versioned structural and content fingerprints for review signals without silently merging distinct resources.',
        'Similar DOM trees prove pages are duplicates.',
      ],
      [
        'crawler-go-containment-incident',
        'Pause smallest affected scope, retain trigger and state counts, notify owner, preserve partial evidence, and require restart approval.',
        'Skipping trap-looking URLs silently is safe and auditable.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-go-origin-politeness-retry',
    'Per-Origin Politeness, Token Timing, Retry Budgets, and Fairness',
    'A shared ticker spaces starts globally, one origin monopolizes slots, Retry-After is ignored, jitter is unbounded, and transient failures retry forever.',
    'monotonic per-origin eligibility scheduler',
    [
      [
        'crawler-go-origin-state',
        'Track per-origin active requests, last start, next eligibility, request and byte budgets, robots state, and owner override.',
        'Global worker count guarantees respectful origin behavior.',
      ],
      [
        'crawler-go-start-spacing',
        'Enforce minimum spacing between request starts with monotonic time and avoid holding shared locks while sleeping.',
        'Limiting concurrent requests is equivalent to request spacing.',
      ],
      [
        'crawler-go-retryability',
        'Classify transport and HTTP failures by method safety, response evidence, attempt, elapsed, and crawl budgets.',
        'All failures deserve exponential retry.',
      ],
      [
        'crawler-go-retry-after-jitter',
        'Parse valid Retry-After and combine with capped exponential backoff and bounded jitter while recording the chosen schedule.',
        'Random sleeps are sufficient politeness and retry evidence.',
      ],
      [
        'crawler-go-origin-fairness',
        'Select among eligible origins with starvation bounds, stable priorities, owner commitments, and visible queue-age evidence.',
        'One FIFO channel is fair across origins.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-go-worker-pool-context',
    'Goroutine Pools, Context Causes, Backpressure, and Shutdown',
    'A goroutine is launched per URL, workers close shared channels, cancellation stops fetch but not parsing or writes, and main returns before cleanup.',
    'bounded leak-free Go crawl pipeline',
    [
      [
        'crawler-go-work-budget-chain',
        'Bound frontier, workers, open bodies, parser memory, report buffers, files, and browser-service requests with end-to-end backpressure.',
        'Fixed worker count bounds every resource.',
      ],
      [
        'crawler-go-channel-ownership',
        'Assign channel creation, senders, receiver, closer, buffering rationale, and cancellation behavior without double close or blocked send.',
        'Any goroutine that notices completion may close a shared channel.',
      ],
      [
        'crawler-go-context-cause-tree',
        'Derive owner, run, item, attempt, deadline, and shutdown contexts and preserve the first meaningful cancellation cause.',
        'Passing context.Background through all functions enables cancellation.',
      ],
      [
        'crawler-go-error-aggregation',
        'Collect per-item outcomes without abandoning siblings, leaking goroutines, hiding first cause, or converting policy stops into errors.',
        'Returning the first worker error safely ends the pool.',
      ],
      [
        'crawler-go-graceful-join',
        'Stop admission, cancel permitted operations, close by owner, await goroutines, flush durable state, close transports, and prove no leak.',
        'Exiting main cleans goroutines and network resources gracefully.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-go-colly-callback-adapter',
    'Colly Collectors, Callback Order, Limits, Storage, and Adoption Boundaries',
    'The code moves directly to Colly, mutates collector callbacks concurrently, enables Async without Wait, trusts IgnoreRobotsTxt defaults, and loses the hand-built policy model.',
    'policy-preserving Colly adapter and decision record',
    [
      [
        'crawler-go-colly-lifecycle',
        'Map Collector creation, callback registration, Visit, Request, Async, Wait, error, and close-related ownership into the application lifecycle.',
        'Setting Async true automatically waits for all callbacks.',
      ],
      [
        'crawler-go-colly-policy-map',
        'Translate allowed domains, depth, body size, redirects, robots, rate limits, revisit, and user agent from owned policy and verify gaps.',
        'Colly defaults necessarily match the course crawl charter.',
      ],
      [
        'crawler-go-callback-state',
        'Keep callbacks thin, order-independent where required, concurrency-safe, context-rich, and delegated to testable application services.',
        'Callback registration order defines a safe business transaction.',
      ],
      [
        'crawler-go-colly-storage',
        'Choose memory or persistent visited and cookie storage from scale, privacy, crash, tenant, and cleanup requirements.',
        'Persistent Colly storage can be shared across all runs safely.',
      ],
      [
        'crawler-go-framework-differential',
        'Run equivalent fixtures through the owned engine and Colly adapter, reconcile requests and records, and document accepted differences.',
        'Framework adoption removes need for lower-level invariant tests.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-go-checkpoint-resume-state',
    'Checkpoint Files, Atomic Replacement, Versioning, and Resume',
    'State is gob-encoded in place, partial writes look valid, policies drift, in-flight work becomes complete, and resuming can contact sites before review.',
    'crash-consistent policy-bound checkpoint',
    [
      [
        'crawler-go-durable-state-boundary',
        'Choose policy, seed, frontier, attempts, digests, records, reports, and counters that must survive versus recomputable state.',
        'Serializing every Go object is the most reliable checkpoint.',
      ],
      [
        'crawler-go-versioned-format',
        'Use explicit portable schema, size limits, checksums, compatibility rules, and unknown-field policy rather than implicit struct layout.',
        'gob files remain stable across every code and type change.',
      ],
      [
        'crawler-go-atomic-replace',
        'Write temporary state, flush and sync under declared durability, validate, rename atomically, sync directory where required, and retain fallback.',
        'os.Rename alone guarantees durable valid state after power loss.',
      ],
      [
        'crawler-go-inflight-requeue',
        'Recover claimed and fetching items into bounded retry or review states using attempt and idempotency evidence.',
        'Marking in-flight work complete avoids duplicate requests safely.',
      ],
      [
        'crawler-go-offline-resume-audit',
        'Load and reconcile checkpoints without network effects, require current authorization, then prove no lost or duplicated state before restart.',
        'Successful decoding is sufficient resume validation.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-go-content-change-dedup',
    'Content Digests, Near-Duplicate Evidence, Change Classes, and History',
    'Canonical URLs, byte hashes, text similarity, DOM structure, and latest records are collapsed into one destructive duplicate decision.',
    'multi-stage versioned content evidence store',
    [
      [
        'crawler-go-digest-stage',
        'Label raw, decoded, DOM, selected-content, record, and rendered digests with algorithm and transformation version.',
        'One hash identifies content across every representation stage.',
      ],
      [
        'crawler-go-exact-equivalence',
        'Distinguish URL alias, byte identity, admitted-record equality, replay, and observation duplication while retaining lineage.',
        'Byte-identical pages have no separate audit relevance.',
      ],
      [
        'crawler-go-near-duplicate-review',
        'Use token and structure features, thresholds, counterexamples, false-merge sampling, and stakeholder consequences.',
        'A similarity threshold proves duplicate identity objectively.',
      ],
      [
        'crawler-go-change-types',
        'Classify content, template, metadata, accessibility, redirect, policy, parser, disappearance, and restoration changes.',
        'Any digest difference means user-facing content changed.',
      ],
      [
        'crawler-go-version-tombstone',
        'Preserve observation history, supersession, tombstones, owner deletion, retention expiry, and report effects.',
        'Overwriting a map entry provides enough change history.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-go-search-metadata-signals',
    'Indexing Directives, Canonical Graphs, Hreflang, and Structured Data',
    'The auditor trusts tags as commands, merges crawl and index policies, accepts malformed JSON-LD, and promises ranking or rich results from syntax.',
    'cross-signal search metadata report',
    [
      [
        'crawler-go-title-visible-purpose',
        'Compare titles and descriptions with visible purpose, uniqueness, language, changed versions, and stakeholder task without universal length claims.',
        'Fixed title length predicts search quality.',
      ],
      [
        'crawler-go-canonical-graph',
        'Resolve canonical references and compare redirects, sitemap, internal links, content identity, reachability, and cycles.',
        'Canonical link always forces duplicate consolidation.',
      ],
      [
        'crawler-go-index-directives',
        'Parse robots meta and X-Robots-Tag by product token, response, precedence, and scope while separating crawling from indexing.',
        'Disallow and noindex mean the same thing.',
      ],
      [
        'crawler-go-hreflang-components',
        'Validate codes, self links, reciprocity, canonical compatibility, reachability, and connected language alternatives.',
        'Syntactically valid hreflang proves localization accuracy.',
      ],
      [
        'crawler-go-jsonld-untrusted',
        'Decode bounded JSON-LD as untrusted values, validate supported shapes, preserve unknowns, and state eligibility non-claims.',
        'json.Valid proves structured-data meaning and consumer eligibility.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-go-static-accessibility-evidence',
    'Static Accessibility Evidence, WCAG Mapping, and Review Handoff',
    'The crawler counts alt values and headings then declares WCAG compliance without computed names, interactions, contrast, reflow, or disabled-user review.',
    'WCAG-linked static finding ledger',
    [
      [
        'crawler-go-image-purpose',
        'Classify informative, decorative, functional, linked, complex, grouped, and text images using surrounding purpose and review uncertainty.',
        'Every img requires non-empty alt text.',
      ],
      [
        'crawler-go-structure-language',
        'Audit document language, headings, landmarks, labels, instructions, table relationships, and duplicate identifiers as evidence, not templates.',
        'Every page must have exactly one h1 and no skipped heading numbers.',
      ],
      [
        'crawler-go-name-role-limit',
        'Identify native semantics and attribute risks while noting accessible names, roles, values, and states may need browser computation.',
        'Static HTML attributes determine every accessibility tree value.',
      ],
      [
        'crawler-go-interaction-limit',
        'Flag keyboard, focus, motion, timing, status, target, contrast, and responsive risks and route them to controlled interaction review.',
        'Go HTML parsing can prove keyboard access and visual contrast.',
      ],
      [
        'crawler-go-conformance-boundary',
        'Link findings to WCAG 2.2 criteria, affected users, page state, severity rationale, evidence, uncertainty, and human owner without conformance claims.',
        'Zero static findings means the full site conforms to WCAG.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-go-resource-delivery-audit',
    'Resource Graphs, Cache Evidence, Budgets, and Performance Non-Claims',
    'The tool reports document bytes as total page weight, ignores encoded versus decoded sizes and browser discovery, and turns one server timing into user performance.',
    'static resource and delivery evidence dossier',
    [
      [
        'crawler-go-resource-reference-graph',
        'Inventory document, style, script, image, font, media, module, preload, and third-party references with source and scope.',
        'All page resources are visible as simple src attributes.',
      ],
      [
        'crawler-go-size-dimensions',
        'Separate wire, decoded, retained, intrinsic-media, rendered, and duplicate-transfer sizes with missing evidence visible.',
        'Content-Length equals browser memory and rendered cost.',
      ],
      [
        'crawler-go-cache-validator-evidence',
        'Report cache fields, validators, variation, redirects, compression, and cold or warm assumptions without simulating browser cache blindly.',
        'Long max-age alone proves efficient delivery.',
      ],
      [
        'crawler-go-stakeholder-budget',
        'Set page-class count, byte, third-party, image, font, script, and uncertainty budgets with owners and exceptions.',
        'One universal page-weight budget fits every public service.',
      ],
      [
        'crawler-go-performance-nonclaim',
        'Separate static resource inventory, controlled browser lab metrics, field telemetry, accessibility effects, and production claims.',
        'net/http duration measures complete user-perceived performance.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-go-dynamic-browser-service-boundary',
    'Dynamic Rendering Decision and Isolated Browser-Service Boundary',
    'The Go crawler cannot satisfy one dynamic requirement, so it shells out to an uncontrolled browser process for every page and trusts returned HTML.',
    'least-authority dynamic-rendering service contract',
    [
      [
        'crawler-go-render-necessity',
        'Require evidence that static retrieval cannot meet an authorized stakeholder need before admitting browser rendering.',
        'JavaScript source means the page must be rendered.',
      ],
      [
        'crawler-go-browser-port-contract',
        'Define typed request, origin policy, viewport, actions, readiness, budgets, response, errors, trace, and cancellation for a separate controlled service.',
        'Executing a browser CLI command is a sufficient integration contract.',
      ],
      [
        'crawler-go-subresource-policy',
        'Apply authorization, SSRF, resource type, download, WebSocket, worker, and byte rules to every browser-initiated request.',
        'Safe top-level URL validation controls all browser traffic.',
      ],
      [
        'crawler-go-rendered-admission',
        'Validate returned DOM, findings, screenshots, console events, digests, versions, and completeness as untrusted external data.',
        'Output from an internal browser service is trusted Go data.',
      ],
      [
        'crawler-go-browser-lifecycle-proof',
        'Require context isolation, closure, timeout, crash, leak, queue, version, and capacity evidence from the service without claiming it from Go models.',
        'Closing the RPC response proves browser contexts and processes closed.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-go-session-security-privacy',
    'Authenticated Scope, Secrets, SSRF, Untrusted Content, and Privacy',
    'Credentials enter config files, cookies cross accounts, GET endpoints mutate state, extracted text reaches HTML and spreadsheets, and sensitive state persists in shared caches.',
    'least-authority secure crawl boundary',
    [
      [
        'crawler-go-authenticated-authority',
        'Require explicit owner, account, role, purpose, paths, time, data, environment, and revocation authorization for sessions.',
        'Possessing valid credentials permits every accessible action.',
      ],
      [
        'crawler-go-secret-cookies',
        'Acquire, scope, redact, rotate, destroy, and isolate secrets, cookies, CSRF material, caches, checkpoints, and reports per run and account.',
        'Environment variables and CookieJar automatically protect secrets.',
      ],
      [
        'crawler-go-safe-request-effects',
        'Allow safe retrieval only, block state-changing forms, logout and destructive routes, and test unexpected GET side effects.',
        'GET requests can never mutate server state.',
      ],
      [
        'crawler-go-output-injection',
        'Use safe text sinks, context encoding, reviewed sanitization, CSV formula defense, path confinement, and structured control-safe logs.',
        'html.EscapeString makes data safe in HTML, CSV, filenames, and logs.',
      ],
      [
        'crawler-go-sensitive-retention',
        'Minimize, classify, encrypt where required, restrict, expire, delete, and audit sensitive values across all derivatives.',
        'Redacting final reports eliminates privacy risk from crawl state.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-go-accessible-report-formats',
    'Streaming JSON, CSV, Accessible HTML, and Remediation Workflows',
    'Outputs lack version and provenance, CSV formulas stay active, maps randomize order, giant tables fail reflow, and findings have no correction lifecycle.',
    'deterministic accessible report suite',
    [
      [
        'crawler-go-json-stream-contract',
        'Version record envelopes, ordering, missingness, error rows, provenance, encoding, newline, and digest manifests for streaming JSON.',
        'Encoder output is inherently deterministic and self-documenting.',
      ],
      [
        'crawler-go-csv-dialect-defense',
        'Define headers, ordering, delimiter, quoting, newline, Unicode, nulls, formula defense, row limits, and round-trip tests with encoding/csv.',
        'CSV quoting prevents spreadsheet formulas and dialect ambiguity.',
      ],
      [
        'crawler-go-deterministic-order',
        'Sort every externally visible map-derived set by stable typed keys and separate semantic order from serialization order.',
        'Go map iteration order is stable within one binary.',
      ],
      [
        'crawler-go-accessible-html',
        'Create landmarks, headings, summaries, paged or filtered tables, keyboard controls, focus, status, reflow, print, and non-color severity.',
        'Using table elements guarantees accessible large reports.',
      ],
      [
        'crawler-go-remediation-lineage',
        'Link finding evidence, owner, severity rationale, status, exception expiry, correction, retest, changed page, and stakeholder outcome.',
        'Removing a finding row is enough remediation history.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-go-httptest-fuzz-race',
    'httptest, Custom RoundTrippers, Fuzzing, Race Evidence, and Mutations',
    'Tests use only friendly HTML and mocked functions, race tests replace logical invariants, fuzz targets accept everything, and no test catches a seeded defect.',
    'risk-layered native Go crawler test system',
    [
      [
        'crawler-go-original-fixtures',
        'Build original accepted, malformed, adversarial, Unicode, boundary, duplicate, inaccessible, privacy-sensitive, and changed fixtures with provenance.',
        'One representative page covers crawler behavior.',
      ],
      [
        'crawler-go-roundtripper-tests',
        'Use custom RoundTrippers for request, redirect, body, cancellation, cleanup, and deterministic address decisions without network.',
        'RoundTripper tests prove kernel DNS and socket behavior.',
      ],
      [
        'crawler-go-httptest-faults',
        'Use loopback HTTP and TLS servers for redirects, truncation, compression, encoding, slow headers and bodies, disconnects, retries, and shutdown.',
        'httptest exactly reproduces internet and production proxy behavior.',
      ],
      [
        'crawler-go-fuzz-race-invariants',
        'Fuzz URL, robots, XML, HTML, extraction, checkpoints, and reports with bounded oracles and run race tests under adversarial schedules.',
        'No crash is a sufficient fuzz oracle and no race proves correctness.',
      ],
      [
        'crawler-go-mutation-evidence',
        'Seed defects in scope, robots, byte limits, visited reservation, channel closure, CSV defense, and recovery and require tests to fail.',
        'High coverage proves harmful mutations are detected.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-go-operations-deployment-recovery',
    'Telemetry, Capacity, Scheduling, Deployment, Backup, and Recovery',
    'Metrics use raw URLs, goroutine counts climb, cron overlaps jobs, binaries rebuild after approval, checkpoints are copied but never restored, and rollback contacts targets immediately.',
    'operable recoverable Go crawler service',
    [
      [
        'crawler-go-causal-observability',
        'Correlate run, policy, URL key, attempt, response, parser, frontier, goroutine, report, and recovery while redacting content and bounding labels.',
        'Logging every raw URL makes operations evidence complete.',
      ],
      [
        'crawler-go-capacity-profile',
        'Measure CPU, heap, allocations, goroutines, open files, sockets, queue age, bytes, throughput, and origin fairness under representative fixtures.',
        'More goroutines always improve crawl throughput.',
      ],
      [
        'crawler-go-durable-schedule',
        'Use one schedule owner, overlap lock, missed-run policy, configuration and artifact identity, owner pause, signal handling, and clean shutdown.',
        'cron plus a binary is a durable non-overlapping service.',
      ],
      [
        'crawler-go-immutable-deployment',
        'Bind source, modules, build settings, binary or image, config schema, policy, platform, and scan evidence; promote without rebuild.',
        'Rebuilding the same commit creates the same approved binary.',
      ],
      [
        'crawler-go-backup-restore',
        'Set RPO, RTO, retention, encrypted backup, isolated restore, offline reconciliation, secret rotation, and safe-resume evidence for each data class.',
        'A successful copy command proves recoverable crawler state.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-go-release-incident-defense',
    'Release Gates, Incident Drills, Rollback, and Residual-Risk Defense',
    'A successful demonstration becomes release approval despite open owner, parser, accessibility, capacity, recovery, and incident questions.',
    'Go crawler production defense dossier',
    [
      [
        'crawler-go-release-matrix',
        'Require clean source-to-binary, module, unit, fuzz, race, mutation, loopback, accessibility, security, capacity, deployment, restore, and rollback gates.',
        'go test and go vet are sufficient release gates.',
      ],
      [
        'crawler-go-end-to-end-reconcile',
        'Trace unfamiliar authorized seed through robots, scope, request, bytes, tree, record, graph, report, shutdown, checkpoint, and restored state with exact counts.',
        'One expected output file proves end-to-end correctness.',
      ],
      [
        'crawler-go-incident-rehearsal',
        'Rehearse owner revoke, runaway frontier, private redirect, credential leak, parser drift, inaccessible report, goroutine leak, corrupt checkpoint, and unsafe output.',
        'Process restart and rollback resolve every crawler incident.',
      ],
      [
        'crawler-go-rollback-containment',
        'Stop effects first, preserve evidence, revoke authority, restore known artifact and state, validate offline, resume narrowly, and document corrections.',
        'Deploying prior binary immediately restores safe operation.',
      ],
      [
        'crawler-go-residual-risk-board',
        'State non-claims, close critical findings, assign accepted risks owners and expiries, and defend evidence before owner, accessibility, privacy, security, operations, and legal-review stakeholders.',
        'Passing the planned demo eliminates residual risk.',
        'metacognitive',
        'create',
      ],
    ]
  ),
];

const sources = [
  [
    'Robots Exclusion Protocol',
    'standard',
    'https://www.rfc-editor.org/rfc/rfc9309',
    'RFC 9309',
    'Controls product tokens, group and path matching, percent encoding, failure semantics, redirects, caching, and protocol limits.',
  ],
  [
    'Sitemaps XML Protocol',
    'standard',
    'https://www.sitemaps.org/protocol.html',
    'Protocol current 2026-07-15',
    'Controls sitemap and index XML, UTF-8, locations, escaping, size, count, and hint semantics.',
  ],
  [
    'WHATWG URL Living Standard',
    'standard',
    'https://url.spec.whatwg.org/',
    'Living Standard current 2026-07-15',
    'Controls web URL parsing, hosts, IDNA, resolution, serialization, and origin evidence compared with Go APIs.',
  ],
  [
    'WHATWG HTML Living Standard',
    'standard',
    'https://html.spec.whatwg.org/',
    'Living Standard current 2026-07-15',
    'Controls HTML tree construction, link and base semantics, metadata, parsing, and browser differences.',
  ],
  [
    'HTTP Semantics',
    'standard',
    'https://www.rfc-editor.org/rfc/rfc9110',
    'RFC 9110',
    'Controls methods, fields, status, representations, redirects, validators, and intermediaries.',
  ],
  [
    'HTTP Caching',
    'standard',
    'https://www.rfc-editor.org/rfc/rfc9111',
    'RFC 9111',
    'Controls freshness, validation, storage, cache keys, and invalidation boundaries.',
  ],
  [
    'Go 1.26 Release Notes',
    'official-docs',
    'https://go.dev/doc/go1.26',
    'Go 1.26.5',
    'Controls language, standard library, runtime, compiler, platform, testing, networking, and compatibility changes.',
  ],
  [
    'Go net/http Documentation',
    'official-docs',
    'https://pkg.go.dev/net/http',
    'Go 1.26.5',
    'Controls Client, Transport, redirects, bodies, timeouts, servers, tests, and lifecycle ownership.',
  ],
  [
    'Go net/url Documentation',
    'official-docs',
    'https://pkg.go.dev/net/url',
    'Go 1.26.5',
    'Controls URL parsing, escaping, references, serialization, and query behavior.',
  ],
  [
    'Go HTML Package',
    'official-docs',
    'https://pkg.go.dev/golang.org/x/net/html',
    'golang.org/x/net 0.57.0',
    'Controls tokenizer and HTML5-inspired node tree behavior and parser boundaries.',
  ],
  [
    'goquery Documentation',
    'official-docs',
    'https://pkg.go.dev/github.com/PuerkitoBio/goquery',
    'goquery 1.12.0',
    'Controls document construction, selections, traversal, selectors, extraction, and iterator behavior.',
  ],
  [
    'Colly Documentation',
    'official-docs',
    'https://go-colly.org/docs/',
    'Colly 2.3.0',
    'Controls Collector callbacks, configuration, limits, async execution, storage, rate control, and lifecycle.',
  ],
  [
    'temoto robotstxt Source',
    'official-docs',
    'https://github.com/temoto/robotstxt',
    'robotstxt 1.1.2',
    'Controls Go package API behavior subject to owned RFC 9309 conformance fixtures and adapter limits.',
  ],
  [
    'Web Content Accessibility Guidelines 2.2',
    'standard',
    'https://www.w3.org/TR/WCAG22/',
    'W3C Recommendation 2024-12-12',
    'Controls accessibility criteria, page states, conformance, and boundaries of static and automated evidence.',
  ],
  [
    'OWASP SSRF Prevention',
    'standard',
    'https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html',
    'Current 2026-07-15',
    'Controls URL, DNS, address, redirect, proxy, metadata, network, and allowlist defense.',
  ],
  [
    'OWASP XSS Prevention',
    'standard',
    'https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html',
    'Current 2026-07-15',
    'Controls output context, encoding, sanitization, safe sinks, and untrusted content.',
  ],
  [
    'NIST Privacy Framework',
    'standard',
    'https://www.nist.gov/privacy-framework',
    'Privacy Framework 1.0 current 2026-07-15',
    'Controls purpose, processing, governance, correction, protection, retention, and deletion risk.',
  ],
  [
    'NIST Secure Software Development Framework',
    'standard',
    'https://csrc.nist.gov/pubs/sp/800/218/final',
    'SP 800-218',
    'Controls development, dependencies, provenance, release integrity, and vulnerability response.',
  ],
  [
    'ACM IEEE AAAI Computer Science Curricula',
    'standard',
    'https://csed.acm.org/',
    'CS2023',
    'Controls networking, systems, software, data, security, ethics, accessibility, professional, and project evidence.',
  ],
].map(([title, authority, url, version, scope]) => ({
  title,
  authority,
  url,
  version,
  reviewedAt: REVIEWED_AT,
  scope,
}));

export const buildWebScraperGoConfig = finalizeCourse(
  {
    id: 'build-web-scraper-go',
    title: 'Build and Ship an Authorized Web Crawler and Accessible Site Auditor in Go 1.26',
    version: '2026.07',
    audience: {
      description:
        'Advanced Go backend and web learners ready to integrate authorization, web standards, net/http ownership, bounded goroutine scheduling, x/net/html, goquery, Colly, accessibility auditing, secure reporting, native testing, deployment, and recovery into one cumulative crawler product.',
      entryKnowledge: [
        'Build, test, and operate multi-package Go 1.26 programs with interfaces, errors, context, goroutines, channels, net/http, files, modules, and structured cleanup.',
        'Construct bounded secure Go HTTP clients with redirects, caching, authentication, SSRF defense, custom transports, fault injection, and observability.',
        'Read semantic HTML, CSS selectors, accessibility requirements, responsive behavior, metadata, browser evidence, and web security at Responsive Web Design depth.',
        'Use queues, heaps, sets, maps, graphs, traversal invariants, complexity, Git, and repository quality gates for repeatable engineering evidence.',
      ],
      deviceConstraints: [
        'Modern browser for deterministic pure-Go practice; controlled Go 1.26 compiler, loopback network, DNS, filesystem, x/net/html, goquery, Colly, race, fuzz, browser-service, assistive-technology, package, container, load, restore, and production transfer labs require an authorized local environment.',
      ],
      accessibilityAssumptions: [
        'Every URL, graph, transition trace, HTML tree, audit finding, report, code task, chart, and project artifact requires structured text, keyboard operation, visible focus, announced status, non-color meaning, reflow, large targets, and reduced-motion support.',
      ],
    },
    scope: {
      includes: [
        'A cumulative crawler and accessible site auditor from explicit owner authorization through URL and robots policy, bounded net/http retrieval, goquery extraction, race-safe frontiers, per-origin goroutine scheduling, Colly adoption, durable checkpoints, site-quality audits, safe reports, native tests, operations, and recovery',
        'Go 1.26.5 source-to-binary proof; RFC 9309; sitemaps; net/url; net/http; net/netip; x/net/html 0.57; goquery 1.12; Colly 2.3; robotstxt 1.1; concurrency, security, accessibility, privacy, testing, deployment, and incident evidence',
        'Original deterministic browser models plus controlled compiler, httptest, DNS, filesystem, parser, race, fuzz, Colly, browser service, accessibility, load, binary, container, restore, rollback, legal-review, and production transfer gates',
        'Five distinct stakeholder projects and a cumulative unfamiliar-site production defense',
      ],
      excludes: [
        'Copied curricula or tutorials, unauthorized targets, access-control or CAPTCHA evasion, proxy or identity rotation, destructive requests, private-network access, personal-data hoarding, ranking guarantees, automated WCAG-conformance claims, live public-site routine tests, or arbitrary host execution',
        'Claims that browser Go, successful compilation, or one controlled crawl proves internet, DNS, parser, Colly, browser, accessibility, privacy, legal, load, container, recovery, or production behavior',
      ],
      nextCourses: ['personal-project-1', 'capstone-project', 'job-search'],
    },
    sources,
    sharedRequirements: [
      'Every activity retrieves stakeholder outcome, owner permission, revision and Go version, seed and URL key, origin and path policy, robots and sitemap evidence, request and response budgets, parser and record provenance, frontier and goroutine ownership, privacy and accessibility requirement, failure, cleanup, recovery, and controlled transfer limit before adding one boundary.',
      'Browser Go uses original fixed fixtures and pure bounded models only. It does not open sockets, resolve DNS, import native parser or crawler packages, read host files, retain credentials, launch processes or unbounded goroutines, or claim live accessibility, privacy, legal, race, load, binary, container, restore, or production behavior.',
      'Passing work requires prediction, exact intermediate evidence, compile-ready accepted and rejected cases, a changed case, a test that catches a deliberate defect, accessible stakeholder output, count reconciliation, and explicit ownership of remaining risk.',
    ],
    modules,
    projects: [
      project(
        'crawler-go-owner-extractor',
        'Owner-Approved Bounded Page Extractor',
        'crawler-go-http-transport-body',
        'A community health information publisher and its accessibility editor',
        'They need explicit authorization, conservative URL and robots decisions, bounded net/http retrieval, correct body cleanup, decoded source identity, and auditable claims.',
        [
          'crawler-go-owner-permission',
          'crawler-go-claim-layers',
          'crawler-go-url-key-policy',
          'crawler-go-robotstxt-adapter',
          'crawler-go-bounded-body-read',
        ]
      ),
      project(
        'crawler-go-fair-site-graph',
        'Race-Safe Fair Documentation Site Graph',
        'crawler-go-worker-pool-context',
        'A consortium of small public documentation owners',
        'They need streaming sitemap and semantic link discovery, trap containment, deterministic frontier state, per-origin fairness, bounded goroutines, cancellation, and leak-free shutdown.',
        [
          'crawler-go-sitemap-index-graph',
          'crawler-go-edge-evidence',
          'crawler-go-reserve-on-schedule',
          'crawler-go-origin-fairness',
          'crawler-go-graceful-join',
        ]
      ),
      project(
        'crawler-go-resumable-colly-audit',
        'Resumable Colly Site-Quality Auditor',
        'crawler-go-content-change-dedup',
        'A regional open-data publishing cooperative',
        'They need policy-preserving Colly adoption, callback and storage ownership, offline checkpoint review, crash-safe resume, content change history, and no unexplained duplicate effects.',
        [
          'crawler-go-colly-policy-map',
          'crawler-go-framework-differential',
          'crawler-go-atomic-replace',
          'crawler-go-offline-resume-audit',
          'crawler-go-change-types',
        ]
      ),
      project(
        'crawler-go-accessible-secure-reports',
        'Accessible Secure Search and Site-Quality Report System',
        'crawler-go-httptest-fuzz-race',
        'A municipal search, accessibility, privacy, and security team',
        'They need cross-signal metadata, WCAG-linked static findings, resource non-claims, controlled dynamic-service handoff, secure outputs, accessible remediation workflows, and adversarial native tests.',
        [
          'crawler-go-canonical-graph',
          'crawler-go-conformance-boundary',
          'crawler-go-performance-nonclaim',
          'crawler-go-output-injection',
          'crawler-go-mutation-evidence',
        ]
      ),
      project(
        'crawler-go-production-defense',
        'Go Crawler Release, Incident, and Recovery Defense',
        'crawler-go-release-incident-defense',
        'A joint site-owner, accessibility, privacy, security, Go, operations, legal-review, and support board',
        'The board needs source-to-binary provenance, representative capacity, immutable deployment, restored state, incident containment, rollback, explicit non-claims, and owned residual risks.',
        [
          'crawler-go-capacity-profile',
          'crawler-go-immutable-deployment',
          'crawler-go-backup-restore',
          'crawler-go-incident-rehearsal',
          'crawler-go-residual-risk-board',
        ]
      ),
    ],
    examContext:
      'Unfamiliar authorized Go crawler and accessible site-auditor cases spanning owner and stakeholder duty, privacy and legal-review routing, Go 1.26 source-to-binary reproduction, package and value ownership, crawl charter, net/url identity, RFC 9309 package conformance, streaming sitemap XML, owned net/http transports and bodies, DNS and DialContext SSRF defense, representation decoding, x/net/html and goquery parser models, typed extraction and provenance, semantic link graphs, race-safe deterministic frontiers, URL traps, per-origin fairness, bounded goroutines and context causes, policy-preserving Colly adoption, crash-consistent offline resume, exact and near duplicate change history, search metadata, WCAG-linked static evidence, resource delivery non-claims, controlled browser-service boundaries, authenticated privacy and output security, deterministic accessible reports, custom RoundTrippers, httptest, fuzz, race and mutations, telemetry, capacity, durable scheduling, immutable deployment, backup, restore, incidents, rollback, and residual-risk defense with explicit browser and controlled native boundaries.',
    minimumQuestionBankSize: 960,
  },
  {
    researchedAt: RESEARCHED_AT,
    prerequisiteCourseIds: [
      'go-basics',
      'http-clients-go',
      'responsive-web-design',
      'git-basics',
      'repository-quality-gates',
    ],
  }
);

import { finalizeCourse, project, skill } from './course-config-helpers.mjs';

const REVIEWED_AT = '2026-07-15';
const RESEARCHED_AT = '2026-07-15T23:30:00.000Z';

function outcome(id, statement, misconception, knowledgeType = 'procedural', level = 'apply') {
  if (!misconception) throw new Error(`Missing TypeScript crawler misconception for ${id}`);
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
      theory: `${context} Predict authorization, URL identity, runtime admission, Promise ownership, resource bounds, accessibility impact, failure, and evidence before reading the governing source.`,
      workshop: `A disability-led public-interest technology team incrementally builds ${artifact} from original deterministic HTTP, robots, sitemap, HTML, browser, and report fixtures while retaining prior TypeScript, Node, web, Git, accessibility, security, testing, and recovery requirements.`,
      debug: `A preserved TypeScript crawl trace contains one plausible scope, URL, robots, Fetch, stream, Cheerio, selector, frontier, Promise, browser, axe, report, security, or shutdown defect; identify the first invalid transition before editing.`,
      lab: `An independent municipal service owner supplies a different origin, markup family, dynamic boundary, accessibility need, resource budget, and injected failure and transfers ${title.toLowerCase()} into a changed ${artifact}.`,
      review: `A delayed incident review reconstructs ${title.toLowerCase()} from revision, authorization, seed, URL, policy, response bytes, parsed identity, record provenance, frontier transition, Promise settlement, browser state, report row, failure, cleanup, and recovery evidence.`,
      quiz: `A release reviewer compares near-miss TypeScript decisions for ${title.toLowerCase()} and accepts only compiler plus runtime changed-case evidence, explicit non-claims, and named network, DNS, browser, accessibility, security, load, legal-review, and production transfer gates.`,
    },
  };
}

const modules = [
  crawlerModule(
    'crawler-ts-outcomes-authorization-charter',
    'Stakeholder Outcomes, Owner Authorization, Ethics, and Evidence',
    'A request to audit a public website names pages to collect but no owner, user decision, permitted purpose, stop contact, privacy boundary, or proof that findings are useful.',
    'authorized inclusive site-audit charter',
    [
      [
        'crawler-ts-stakeholder-decision',
        'Define stakeholder, affected users, decision, site population, success, failure harm, and observable value before choosing crawler features.',
        'Downloading many pages is itself a valuable stakeholder outcome.',
        'strategic',
        'create',
      ],
      [
        'crawler-ts-owner-authorization',
        'Record who controls each target, permitted identities, paths, methods, times, data uses, and revocation contact before any automated request.',
        'Public reachability grants authorization for unrestricted automation.',
        'professional',
        'evaluate',
      ],
      [
        'crawler-ts-robots-legal-boundary',
        'Separate RFC 9309 crawl preferences from contracts, copyright, privacy, jurisdiction, and qualified legal review.',
        'A robots allow rule is complete legal permission to collect and reuse content.',
        'professional',
        'evaluate',
      ],
      [
        'crawler-ts-data-minimization',
        'Define necessary fields, purpose, retention, access, correction, deletion, and aggregation risk before collection.',
        'Public personal information has no privacy or retention risk.',
        'professional',
        'create',
      ],
      [
        'crawler-ts-evidence-layers',
        'Separate pure model, compiler, emitted Node, local HTTP, controlled site, browser, accessibility, security, load, and production claims.',
        'One successful fetch proves the crawler and audit are production-ready.',
        'metacognitive',
        'evaluate',
      ],
    ]
  ),
  crawlerModule(
    'crawler-ts-runtime-emission-repository',
    'Node 24, TypeScript 7, ESM, Dependencies, and Emitted Artifacts',
    'The tool runs through a development loader from an unknown revision with floating packages, unchecked emitted JavaScript, warm residue, and no clean-install proof.',
    'reproducible source-to-emitted crawler repository',
    [
      [
        'crawler-ts-runtime-matrix',
        'Pin Node 24.18.0, TypeScript 7.0.2 and the TypeScript 6.0.2 compatibility API, ESM semantics, package manager, and supported platforms.',
        'TypeScript erases every Node, module, and platform compatibility difference.',
      ],
      [
        'crawler-ts-dependency-lock',
        'Pin Cheerio 1.2.0, robots-parser 3.0.1, p-limit 7.3.0, csv-stringify 6.8.1, Playwright 1.61.1, and axe-core 4.12.1 with provenance and license review.',
        'A lockfile proves dependencies are safe, maintained, and mutually compatible.',
      ],
      [
        'crawler-ts-source-emission-map',
        'Bind strict source, declarations, maps, generated fixtures, package exports, emitted JavaScript, and startup entry to one revision.',
        'A noEmit type-check proves shipped JavaScript exists and runs.',
      ],
      [
        'crawler-ts-clean-reproduction',
        'Prove clean install, generation, strict and compatibility types, lint, unit, integration, emitted smoke, browser install, and package inspection.',
        'A hot-reload run with warm node_modules is reproducible release evidence.',
      ],
      [
        'crawler-ts-recovery-anchor',
        'Capture baseline behavior, configuration, fixtures, secrets inventory, status, dependency graph, and rollback anchor before editing.',
        'Small guided projects do not need before-state or recovery evidence.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-ts-architecture-async-ownership',
    'Ports, Immutable Values, Promise Ownership, and Lifecycle',
    'Modules call global fetch, mutate shared URL and record objects, float Promises, replace AbortSignals, and cannot list remaining handles at shutdown.',
    'explicitly owned crawler component graph',
    [
      [
        'crawler-ts-directed-ports',
        'Direct policy, fetch, robots, parse, extract, frontier, render, audit, storage, and report dependencies through narrow typed ports.',
        'An interface around every function automatically creates sound architecture.',
        'strategic',
        'create',
      ],
      [
        'crawler-ts-runtime-admitted-values',
        'Create readonly branded identities only after unknown runtime values pass current validation and normalization.',
        'Readonly and branded TypeScript types validate external data at runtime.',
      ],
      [
        'crawler-ts-promise-owner',
        'Assign each Promise a caller, settlement path, concurrency slot, cancellation rule, error destination, and shutdown consequence.',
        'Unawaited Promises safely finish before Node exits.',
      ],
      [
        'crawler-ts-abort-tree',
        'Compose caller, per-attempt, deadline, budget, owner-stop, and process-shutdown signals while preserving reasons and removing listeners.',
        'One global AbortController is correct for every crawl operation.',
      ],
      [
        'crawler-ts-handle-ledger',
        'Inventory streams, sockets, timers, browser contexts, files, listeners, workers, and close order with post-run handle evidence.',
        'Returning from main proves all resources closed.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-ts-scope-seeds-budgets',
    'Seed Registry, Origin Scope, Budgets, and Stop Policy',
    'A seed silently expands through subdomains, downloads, calendars, search forms, query permutations, and logout URLs without page, byte, time, or incident limits.',
    'deny-by-default crawl-scope policy',
    [
      [
        'crawler-ts-seed-registry',
        'Bind each seed to owner authorization, purpose, expected content class, policy version, contact, and expiry.',
        'A hostname alone is a sufficient seed and audit identity.',
      ],
      [
        'crawler-ts-origin-policy',
        'Define allowed schemes, hosts, ports, subdomains, redirects, and cross-origin resources with deny-by-default admission.',
        'Sharing a registrable domain always means sharing authority and risk.',
      ],
      [
        'crawler-ts-path-query-policy',
        'Specify methods, path prefixes, query keys and values, fragments, pagination, downloads, forms, and content types as testable rules.',
        'Following every same-host href keeps a crawl in scope.',
      ],
      [
        'crawler-ts-multiresource-budget',
        'Budget pages, depth, requests, redirects, bytes, decompressed bytes, duration, concurrency, retries, browser contexts, disk, and report rows.',
        'Request delay alone prevents every overload or runaway crawl.',
      ],
      [
        'crawler-ts-stop-contact',
        'Implement automatic stop triggers, owner pause, kill path, partial-output policy, cleanup, incident contact, and restart authorization.',
        'A crawler should retry until completion regardless of owner or failure state.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-ts-whatwg-url-identity',
    'WHATWG URL Resolution, Identity, Unicode, and Scope Admission',
    'Relative links, base elements, default ports, fragments, percent encodings, Unicode hosts, credentials, and query order create duplicates or cross policy boundaries.',
    'conservative WHATWG URL identity pipeline',
    [
      [
        'crawler-ts-url-parse-components',
        'Parse URLs with WHATWG URL and inspect scheme, credentials, host, port, path, query, and fragment before trust decisions.',
        'Splitting a URL string on punctuation preserves URL semantics.',
      ],
      [
        'crawler-ts-reference-base',
        'Resolve relative references against the final response URL and the first valid document base while retaining both provenance values.',
        'String concatenation correctly resolves every relative reference.',
      ],
      [
        'crawler-ts-fetch-vs-report-identity',
        'Remove fragments from fetch identity while preserving document-location fragments when findings need them.',
        'Every fragment identifies a separate network representation.',
      ],
      [
        'crawler-ts-conservative-key',
        'Define explicit scheme, host, port, path, percent-encoding, query, and tracking normalization without merging distinct resources.',
        'Sorting every query and lowercasing every component is universally safe.',
      ],
      [
        'crawler-ts-idna-display-boundary',
        'Keep display and network host forms separate, reject credentials and unsafe schemes, and expose failed or confusable IDNA decisions.',
        'Unicode and ASCII host forms can be interchanged without validation.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-ts-robots-rfc9309-adapter',
    'RFC 9309 Robots Semantics and Library Conformance Adapter',
    'The crawler fetches robots from the wrong origin, trusts a library without conformance fixtures, applies first-match rules, and treats outages as permission.',
    'RFC 9309 decision adapter around robots-parser',
    [
      [
        'crawler-ts-robots-location-agent',
        'Construct the RFC 9309 retrieval URL from the target service origin and send one stable truthful crawler product token with an accountable contact.',
        'Any robots path and generic browser user agent represent the same crawler.',
      ],
      [
        'crawler-ts-group-rule-match',
        'Apply group selection, percent encoding, longest-match precedence, and allow-over-disallow tie behavior from RFC 9309.',
        'The first textual path rule always wins.',
      ],
      [
        'crawler-ts-robots-status-policy',
        'Classify successful, redirecting, unavailable, unreachable, oversized, malformed, and stale robots responses conservatively.',
        'Every robots retrieval failure means unrestricted crawling.',
      ],
      [
        'crawler-ts-library-conformance',
        'Wrap robots-parser behind owned types and test its outputs against RFC 9309 fixtures before accepting library decisions.',
        'A package named robots-parser necessarily implements current RFC semantics exactly.',
      ],
      [
        'crawler-ts-extension-restraint',
        'Treat crawl-delay, request-rate, sitemap, and other extensions as documented policy inputs without claiming RFC 9309 requires them.',
        'crawl-delay is a normative RFC 9309 directive with universal behavior.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-ts-sitemap-xml-discovery',
    'Sitemap XML, Index Traversal, Location Rules, and Admission',
    'A sitemap parser accepts unlimited nested indexes, non-UTF-8 surprises, foreign hosts, duplicate URLs, invalid escaping, and freshness hints as commands.',
    'bounded sitemap discovery ledger',
    [
      [
        'crawler-ts-sitemap-format',
        'Validate sitemap and sitemap-index namespaces, UTF-8 XML, escaping, location count, size, and required loc values.',
        'Any XML file containing loc elements is a valid sitemap.',
      ],
      [
        'crawler-ts-index-bounds',
        'Bound index depth, files, URLs, bytes, redirects, duplicate entries, duration, and cycles before traversal.',
        'Sitemap index traversal is finite because files are static.',
      ],
      [
        'crawler-ts-sitemap-location-scope',
        'Resolve and admit sitemap and page locations through authorization, origin, robots, URL, and SSRF policy.',
        'Every URL advertised by an authorized sitemap is safe and in scope.',
      ],
      [
        'crawler-ts-hints-not-truth',
        'Treat lastmod, changefreq, and priority as untrusted hints and compare them with observed response evidence.',
        'Sitemap metadata guarantees freshness and crawl priority.',
      ],
      [
        'crawler-ts-sitemap-provenance',
        'Retain index chain, source bytes digest, entry position, normalized key, admission decision, and rejection cause.',
        'The final page URL fully explains sitemap discovery.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-ts-fetch-stream-contract',
    'Node Fetch, Redirect Control, Streams, Timeouts, and Bounded Bodies',
    'Each request creates unrelated policy, follows redirects automatically, checks only Content-Length, buffers unlimited decoded bodies, and loses abort causes.',
    'bounded Fetch response adapter',
    [
      [
        'crawler-ts-fetch-request-contract',
        'Set honest User-Agent, Accept, conditional validators, safe methods, credentials policy, and manual redirect handling through one adapter.',
        'Copying consumer browser headers makes a crawler compliant.',
      ],
      [
        'crawler-ts-response-admission',
        'Classify transport, status, media type, length, encoding, validator, and domain outcome before parsing.',
        'Status 200 or an html extension proves the body is acceptable HTML.',
      ],
      [
        'crawler-ts-stream-byte-limit',
        'Count compressed, decoded, consumed, and retained bytes during stream processing and cancel over-budget bodies.',
        'Content-Length alone prevents oversized or compressed-bomb responses.',
      ],
      [
        'crawler-ts-timeout-signal',
        'Compose connection-adjacent, response, body, attempt, job, and shutdown deadlines while retaining the first abort reason.',
        'Promise.race timeout code automatically cancels network work.',
      ],
      [
        'crawler-ts-body-cleanup',
        'Cancel or drain bodies by explicit policy and prove sockets, readers, timers, and listeners settle on every exit.',
        'Garbage collection promptly releases abandoned Response bodies.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-ts-redirect-dns-ssrf',
    'Redirect Revalidation, DNS, Address Classes, Proxies, and SSRF',
    'A URL passes string validation once, then redirects or resolves to loopback, private, link-local, metadata, mixed-address, or rebinding targets through an ambient proxy.',
    'connection-time SSRF defense record',
    [
      [
        'crawler-ts-scheme-port-credentials',
        'Allowlist schemes and ports, reject embedded credentials, and prohibit non-HTTP destinations before resolution.',
        'Zod URL validation prevents SSRF.',
      ],
      [
        'crawler-ts-address-classification',
        'Classify all IPv4 and IPv6 answers including mapped, loopback, private, link-local, multicast, unspecified, and metadata ranges.',
        'Blocking RFC 1918 IPv4 addresses covers private-network SSRF.',
      ],
      [
        'crawler-ts-redirect-hop-policy',
        'Resolve every Location and reapply authorization, scope, credential, method, DNS, loop, and budget rules per hop.',
        'A safe initial URL makes every redirect destination safe.',
      ],
      [
        'crawler-ts-dns-rebinding-boundary',
        'Bind validated resolution to connection behavior or an egress proxy and verify re-resolution and mixed-answer cases.',
        'Checking DNS once before fetch defeats rebinding.',
      ],
      [
        'crawler-ts-proxy-egress-policy',
        'Make proxy inheritance, bypass rules, egress allowlists, metadata blocks, and connection evidence explicit.',
        'Application URL validation alone controls all outbound destinations.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-ts-bytes-media-encoding',
    'Media Types, Content Codings, Character Encodings, and Source Identity',
    'The parser consumes a partial compressed response, guesses platform encoding, ignores conflicting declarations, and hashes normalized text as source bytes.',
    'byte-to-Unicode admission ledger',
    [
      [
        'crawler-ts-content-coding-chain',
        'Validate declared content codings and distinguish unsupported, corrupt, truncated, and over-budget representations.',
        'Unknown compression should be passed to the HTML parser.',
      ],
      [
        'crawler-ts-media-sniff-policy',
        'Use a documented media-type and conservative sniff policy while rejecting binary, multipart, and ambiguous content.',
        'A page-looking URL guarantees an HTML response.',
      ],
      [
        'crawler-ts-charset-precedence',
        'Reconcile transport, BOM, HTML declarations, decoder support, replacement characters, and confidence with source offsets.',
        'TextDecoder default behavior correctly decodes every web page.',
      ],
      [
        'crawler-ts-source-vs-dom-digest',
        'Keep wire-byte, decoded-text, parsed-tree, extracted-record, and rendered-state digests as distinct identities.',
        'One hash can identify every transformation stage.',
      ],
      [
        'crawler-ts-partial-response-rejection',
        'Reject premature EOF, length mismatch, decode failure, and cancellation without publishing partial records.',
        'Useful fields from an incomplete body are safe to keep silently.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-ts-cheerio-html-model',
    'WHATWG-Informed HTML Trees, Cheerio, parse5, and Parser Differentials',
    'Learners treat source indentation as the DOM, assume Cheerio runs browser JavaScript, ignore malformed-tree repair, and never compare parser options.',
    'Cheerio tree-construction evidence adapter',
    [
      [
        'crawler-ts-source-tree-distinction',
        'Distinguish source tokens, parse5-repaired tree, Cheerio selections, browser DOM, accessibility tree, and rendered state.',
        'HTML source and browser DOM always have identical structure.',
      ],
      [
        'crawler-ts-cheerio-load-mode',
        'Choose document, fragment, HTML, or XML loading options deliberately and test wrapper insertion and case behavior.',
        'cheerio.load has one parsing mode suitable for every input.',
      ],
      [
        'crawler-ts-malformed-repair-fixtures',
        'Test misnesting, omitted elements, tables, templates, foreign content, duplicate attributes, and foster parenting.',
        'Malformed HTML fails instead of producing a repaired tree.',
      ],
      [
        'crawler-ts-parser-differential',
        'Compare Cheerio/parse5 with controlled browser DOM for risk-bearing fixtures and classify explained differences.',
        'Matching selector counts prove two parsers produced equivalent trees.',
      ],
      [
        'crawler-ts-tree-budget',
        'Bound source, nodes, depth, attributes, text, selector work, and parse duration and expose rejection causes.',
        'A byte limit automatically bounds DOM memory and selector cost.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-ts-selectors-runtime-extraction',
    'Selectors, Cardinality, Unknown Values, and Typed Extraction',
    'A broad selector takes the first node, missing and empty values collapse together, strings are cast into domain types, and markup drift silently corrupts output.',
    'runtime-validated extraction contract',
    [
      [
        'crawler-ts-selector-contract',
        'Define selector scope, expected cardinality, fallback order, exclusions, and source location before extracting.',
        'A selector that matches something is correct.',
      ],
      [
        'crawler-ts-missing-empty-invalid',
        'Represent absent, empty, malformed, duplicate, conflicting, and admitted values as distinct outcomes.',
        'Falsy checks safely classify all missing fields.',
      ],
      [
        'crawler-ts-unknown-field-validation',
        'Keep attributes, text, JSON-LD, configuration, and plugin output unknown until validators produce domain values.',
        'Type assertions convert runtime strings into validated records.',
      ],
      [
        'crawler-ts-text-normalization',
        'Normalize whitespace, entities, Unicode, line breaks, and hidden or alternate text only under field-specific policy.',
        'Calling trim creates a canonical text value.',
      ],
      [
        'crawler-ts-drift-detection',
        'Use fixtures, cardinality histograms, rejection rates, schema versions, and changed markup to surface selector drift.',
        'Selectors either work or throw when site markup changes.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-ts-provenance-quality-records',
    'Record Schemas, Field Provenance, Confidence, and Data Quality',
    'Extracted strings lose page, response, selector, transform, and rejection evidence, making corrections and quality claims impossible.',
    'loss-aware versioned site record',
    [
      [
        'crawler-ts-record-schema-version',
        'Version admitted records, field meanings, missingness, constraints, and compatible migrations independently from source markup.',
        'A TypeScript interface is a persistent schema and migration plan.',
      ],
      [
        'crawler-ts-field-provenance',
        'Attach source URL, response identity, node or attribute path, raw value digest, transform version, time, and decision to each field.',
        'Page URL alone is enough provenance for every extracted value.',
      ],
      [
        'crawler-ts-confidence-evidence',
        'Use confidence only when tied to observable rule evidence, calibration, thresholds, and review consequences.',
        'A numeric confidence score makes uncertain extraction objective.',
      ],
      [
        'crawler-ts-quality-reconciliation',
        'Reconcile discovered, fetched, parsed, extracted, admitted, rejected, duplicated, and reported counts.',
        'A large output row count proves high data quality.',
      ],
      [
        'crawler-ts-correction-deletion',
        'Propagate owner corrections, privacy deletions, retention expiry, schema changes, and record tombstones through derived artifacts.',
        'Regenerating a report automatically removes every stale copy.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-ts-link-semantics-discovery',
    'HTML Link Semantics, Base URLs, Relations, and Discovery Decisions',
    'Every href becomes a page request; base, rel, hreflang, media, downloads, forms, non-navigation links, and nofollow policy are ignored.',
    'semantic link-discovery ledger',
    [
      [
        'crawler-ts-link-bearing-elements',
        'Enumerate link-bearing HTML elements and distinguish navigation, resource, metadata, form, media, and embedded destinations.',
        'Only anchor href attributes contain crawl-relevant URLs.',
      ],
      [
        'crawler-ts-base-url-evidence',
        'Apply first-valid-base rules against the final response URL and retain base source and rejected alternatives.',
        'Every base element should be applied in source order.',
      ],
      [
        'crawler-ts-relation-policy',
        'Interpret rel tokens, download, target, media, hreflang, canonical, alternate, and nofollow under an explicit discovery policy.',
        'rel=nofollow is an authorization rule with one universal meaning.',
      ],
      [
        'crawler-ts-reference-rejection',
        'Classify empty, fragment-only, mailto, tel, javascript, data, malformed, credentialed, and unsupported references without fetching.',
        'Every URL constructor success indicates a fetchable page.',
      ],
      [
        'crawler-ts-discovery-provenance',
        'Retain source page, element, attribute, raw reference, resolved URL, relation tokens, scope decision, and frontier result.',
        'The destination URL fully explains how it was discovered.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-ts-frontier-state-machine',
    'Crawl Graph, Frontier State Machine, Scheduling Identity, and Invariants',
    'URLs move through ad hoc arrays, visited is marked after fetch, duplicates race into workers, and retry or cancellation loses causal state.',
    'deterministic frontier transition model',
    [
      [
        'crawler-ts-frontier-states',
        'Define discovered, rejected, queued, claimed, fetching, fetched, parsed, failed, retryable, terminal, and canceled transitions.',
        'Queued, visited, fetched, and complete are interchangeable states.',
      ],
      [
        'crawler-ts-visited-at-schedule',
        'Atomically reserve admitted URL identity when scheduling so concurrent discovery cannot duplicate effects.',
        'Marking visited after a successful response prevents duplicates.',
      ],
      [
        'crawler-ts-frontier-priority',
        'Prioritize owner commitments, depth, page classes, freshness, origin fairness, and retries with stable tie rules.',
        'FIFO is inherently fairest and most useful for every crawl.',
      ],
      [
        'crawler-ts-link-graph-evidence',
        'Retain discovered edges separately from fetch identity and annotate source, relation, decision, and response outcomes.',
        'A set of fetched URLs is a complete crawl graph.',
      ],
      [
        'crawler-ts-state-invariants',
        'Check unique active ownership, bounded work, legal transitions, terminal immutability, count reconciliation, and recoverability.',
        'Exhaustive union types alone prevent invalid distributed transitions.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-ts-url-traps-space-control',
    'Infinite URL Spaces, Calendars, Facets, Sessions, and Budget Defense',
    'Calendar next links, faceted queries, session IDs, sort permutations, soft errors, and generated paths consume the crawl while each URL looks valid.',
    'URL-space trap classifier and containment policy',
    [
      [
        'crawler-ts-trap-patterns',
        'Detect calendar, pagination, faceting, sorting, search, session, nonce, path-depth, repeated-segment, and parameter-combination expansion.',
        'Duplicate URL strings are the only cause of infinite crawls.',
      ],
      [
        'crawler-ts-query-cardinality-budget',
        'Budget distinct keys, values, combinations, orderings, and per-template pages with stakeholder-approved exceptions.',
        'An overall page cap makes query explosion harmless and explainable.',
      ],
      [
        'crawler-ts-soft-error-detection',
        'Classify soft 404, login, challenge, empty shell, redirect loop, and repeated-template responses using multiple signals.',
        'HTTP status alone identifies every error page.',
      ],
      [
        'crawler-ts-structural-fingerprint',
        'Compare conservative URL templates, DOM structure, content digests, and navigation patterns without merging distinct content blindly.',
        'Similar pages are safe to discard as duplicates.',
      ],
      [
        'crawler-ts-trap-stop-evidence',
        'Stop the smallest affected scope, retain trigger and frontier counts, notify owner, and require explicit restart policy.',
        'Trap handling should silently skip suspicious URLs and continue.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-ts-origin-fair-scheduling',
    'Origin Fairness, Politeness, Retries, Backoff, and p-limit',
    'One global concurrency number bursts a single origin, retries synchronize, Retry-After is ignored, and p-limit is treated as a complete scheduler.',
    'publisher-respecting origin scheduler',
    [
      [
        'crawler-ts-origin-buckets',
        'Maintain per-origin concurrency, minimum spacing, next-eligible time, request and byte budgets, and owner overrides.',
        'Global concurrency alone guarantees publisher fairness.',
      ],
      [
        'crawler-ts-retry-classification',
        'Retry only classified transient and idempotent cases with attempt, elapsed, and owner budgets.',
        'Every non-200 response should be retried.',
      ],
      [
        'crawler-ts-retry-after-backoff',
        'Parse valid Retry-After, combine it with capped exponential backoff and bounded jitter, and record the chosen delay.',
        'Random delay without caps is a sound backoff policy.',
      ],
      [
        'crawler-ts-p-limit-boundary',
        'Use p-limit for bounded Promise admission while retaining separate origin eligibility, priority, cancellation, and drain state.',
        'p-limit automatically implements robots, delays, fairness, and shutdown.',
      ],
      [
        'crawler-ts-clock-injection',
        'Inject monotonic and wall clocks so spacing, deadlines, backoff, fairness, and clock jumps are deterministic in tests.',
        'Real sleeps are the most trustworthy scheduler test.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-ts-bounded-promise-workers',
    'Promise Workers, Backpressure, Abort Propagation, and Clean Drain',
    'Promise.all starts the whole frontier, one rejection abandons siblings, streams outlive jobs, and shutdown clears timers without awaiting owned work.',
    'bounded abortable worker pipeline',
    [
      [
        'crawler-ts-work-admission',
        'Admit work through page, origin, byte, memory, browser, file, and report budgets before creating expensive Promises.',
        'Limiting worker count bounds every downstream resource.',
      ],
      [
        'crawler-ts-rejection-isolation',
        'Classify per-item failure without losing sibling settlements, aggregate cause, or crawl-level stop conditions.',
        'Promise.all is always correct because it fails fast.',
      ],
      [
        'crawler-ts-backpressure-chain',
        'Propagate capacity from report and storage sinks through parsing, fetch, frontier, and discovery instead of buffering without bound.',
        'Async iteration automatically supplies end-to-end backpressure.',
      ],
      [
        'crawler-ts-abort-propagation',
        'Propagate cancellation into queued, fetching, parsing, browser, audit, writing, and retry operations and reject late results.',
        'Aborting fetch cancels the complete work item.',
      ],
      [
        'crawler-ts-drain-proof',
        'Stop admission, abort permitted work, await settlements, flush durable state, close resources, and inspect live handles.',
        'Calling process.exit is a graceful crawler shutdown.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-ts-checkpoint-resume',
    'Checkpoints, Write-Ahead State, Crash Consistency, and Resume',
    'The process serializes mutable objects occasionally, writes in place, cannot distinguish complete from partial files, and resumes stale in-flight work as success.',
    'versioned crash-consistent crawl checkpoint',
    [
      [
        'crawler-ts-checkpoint-boundary',
        'Define which policy, seed, frontier, attempt, digest, report, and output states must survive and which can be recomputed.',
        'Dumping every in-memory object is the safest checkpoint.',
      ],
      [
        'crawler-ts-atomic-file-replace',
        'Write bounded versioned state to a temporary file, sync by declared durability, validate, rename atomically, and retain recovery copies.',
        'One successful write call makes a durable checkpoint.',
      ],
      [
        'crawler-ts-inflight-recovery',
        'Return claimed or fetching items to an explicit retry state using attempt and idempotency rules after a crash.',
        'In-flight work should be marked complete to avoid duplicates.',
      ],
      [
        'crawler-ts-policy-version-resume',
        'Reject or migrate checkpoints whose authorization, URL identity, schema, dependency, or crawl policy no longer matches.',
        'Old checkpoints are safe whenever JSON.parse succeeds.',
      ],
      [
        'crawler-ts-resume-reconciliation',
        'Prove no lost terminal records, duplicate external effects, missing frontier items, or unexplained count changes across interruption.',
        'A resumed process reaching the end proves correct recovery.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-ts-dedup-change-classification',
    'Exact Duplicates, Near Duplicates, Change Detection, and Version History',
    'URL equality, source hash, normalized text, SimHash-like similarity, and canonical hints are mixed into one destructive dedup decision.',
    'multi-signal content identity and change ledger',
    [
      [
        'crawler-ts-stage-specific-digests',
        'Compute and label wire, decoded, DOM, main-content, record, and rendered digests for distinct questions.',
        'One content hash answers identity at every stage.',
      ],
      [
        'crawler-ts-exact-duplicate-policy',
        'Separate URL aliases, byte-identical responses, equivalent admitted records, and replayed observations without deleting provenance.',
        'Exact content duplicates have no independent audit value.',
      ],
      [
        'crawler-ts-near-duplicate-evidence',
        'Use tokenization, boilerplate policy, thresholds, examples, and false-merge review for similarity decisions.',
        'A similarity percentage objectively proves two pages are duplicates.',
      ],
      [
        'crawler-ts-change-classification',
        'Classify metadata, template, content, accessibility, policy, redirect, disappearance, and parse changes with prior version evidence.',
        'Any hash change means stakeholder content changed.',
      ],
      [
        'crawler-ts-version-tombstone',
        'Retain version lineage, supersession, disappearance, deletion, restoration, and report impact under retention policy.',
        'Overwriting latest records is enough for audits and corrections.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-ts-indexing-metadata-audit',
    'Titles, Canonicals, Robots Directives, Hreflang, and Structured Metadata',
    'The audit equates metadata with search-engine truth, trusts canonical and hreflang strings, ignores HTTP directives, and reports isolated tags without graph context.',
    'evidence-linked indexing and metadata audit',
    [
      [
        'crawler-ts-title-description',
        'Audit title and description presence, uniqueness, length evidence, visible consistency, and stakeholder intent without ranking promises.',
        'A fixed character count determines search quality.',
      ],
      [
        'crawler-ts-canonical-signals',
        'Resolve canonical links and reconcile redirects, sitemap URLs, internal links, content identity, and scope before reporting conflicts.',
        'A canonical tag forces all consumers to merge pages.',
      ],
      [
        'crawler-ts-robots-meta-header',
        'Parse robots meta and X-Robots-Tag directives by agent, precedence, response, and scope while keeping crawl and index policy distinct.',
        'robots.txt and noindex are interchangeable controls.',
      ],
      [
        'crawler-ts-hreflang-graph',
        'Validate language-region codes, self references, reciprocal alternates, canonical compatibility, reachability, and graph components.',
        'Valid hreflang syntax proves localization relationships are correct.',
      ],
      [
        'crawler-ts-jsonld-admission',
        'Parse bounded JSON-LD as untrusted data, validate known shapes, preserve unknowns, and avoid eligibility or ranking claims.',
        'Valid JSON syntax proves structured data meaning and search eligibility.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-ts-static-accessibility-audit',
    'Static Accessibility Heuristics, Semantics, and Human Review',
    'The crawler counts alt attributes and headings, then declares WCAG conformance without rendered states, names, keyboard use, contrast, or human judgment.',
    'WCAG-linked static audit with explicit limits',
    [
      [
        'crawler-ts-image-alt-context',
        'Classify informative, decorative, functional, linked, complex, grouped, and text images using context and route uncertain cases to review.',
        'Every image needs non-empty alt text.',
      ],
      [
        'crawler-ts-language-heading-landmarks',
        'Audit page language, heading outline evidence, landmark purpose, labels, table relationships, and duplicate identifiers without enforcing cosmetic templates.',
        'Every page must use exactly one h1 followed by every heading level.',
      ],
      [
        'crawler-ts-name-role-value-limit',
        'Identify native control and relationship evidence while acknowledging accessible names and states can depend on computed browser semantics.',
        'Static attributes fully determine every accessible name and role.',
      ],
      [
        'crawler-ts-keyboard-motion-limit',
        'Report code-level risks for keyboard traps, focus, motion, timing, targets, and status while requiring interaction evidence.',
        'A source scan can prove keyboard and reduced-motion behavior.',
      ],
      [
        'crawler-ts-conformance-nonclaim',
        'Map findings to WCAG 2.2 criteria, page states, severity rationale, affected users, and human verification without claiming automated conformance.',
        'Zero static findings means the site conforms to WCAG.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-ts-axe-browser-a11y',
    'axe-core Browser Scans, Interaction States, and Manual Accessibility Evidence',
    'One axe scan at page load becomes a conformance certificate; hidden menus, errors, dialogs, narrow layouts, keyboard paths, and false positives are ignored.',
    'stateful automated-plus-manual accessibility review',
    [
      [
        'crawler-ts-axe-rule-scope',
        'Run axe-core with declared version, rules, tags, inclusions, exclusions, page state, and complete result evidence.',
        'axe defaults and one URL represent the complete site.',
      ],
      [
        'crawler-ts-interaction-state-matrix',
        'Scan initial, navigation, dialog, form error, authenticated, loading, empty, and changed responsive states reached through user actions.',
        'Accessibility defects only exist in initial DOM state.',
      ],
      [
        'crawler-ts-violation-triage',
        'Preserve rule, impact, targets, HTML snippet digest, help, occurrence grouping, false-positive review, owner, and retest evidence.',
        'Every automated violation should be accepted or suppressed without review.',
      ],
      [
        'crawler-ts-manual-test-matrix',
        'Add keyboard-only, focus order and visibility, zoom and reflow, screen-reader, motion, contrast, target, and cognitive review.',
        'Automated accessibility tools detect all WCAG failures.',
      ],
      [
        'crawler-ts-accessibility-regression',
        'Version fixtures and state journeys, compare resolved and new findings, and prevent baselines from hiding regressions.',
        'Snapshotting a violation count is a sufficient regression test.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-ts-resource-performance-audit',
    'Resource Inventory, Delivery Evidence, Budgets, and Performance Boundaries',
    'The audit sums HTML attributes as transfer size, confuses lab and field data, ignores cache and render context, and claims user performance from a crawler timer.',
    'bounded resource and performance evidence report',
    [
      [
        'crawler-ts-resource-graph',
        'Inventory document, script, style, image, font, media, preload, module, and third-party references with initiator and scope evidence.',
        'The HTML page byte count represents total page weight.',
      ],
      [
        'crawler-ts-transfer-vs-decoded',
        'Separate encoded transfer, decoded body, in-memory, intrinsic media, and rendered dimensions.',
        'Content-Length is the actual user memory and rendering cost.',
      ],
      [
        'crawler-ts-cache-delivery-context',
        'Record cache headers, validators, redirects, protocol, compression, connection context, and cold or warm assumptions.',
        'One local fetch duration measures production user experience.',
      ],
      [
        'crawler-ts-budget-policy',
        'Set stakeholder-approved count, byte, third-party, font, image, script, browser-time, and uncertainty budgets with exceptions.',
        'Universal page-weight thresholds fit every user task.',
      ],
      [
        'crawler-ts-performance-nonclaim',
        'Separate static resource evidence, controlled browser lab evidence, real-user field data, accessibility impact, and production conclusions.',
        'Crawler timing can replace browser metrics and field data.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-ts-playwright-dynamic-rendering',
    'Playwright Rendering, Isolation, Readiness, and Dynamic-DOM Evidence',
    'Every page launches a browser, shares cookies and storage, waits for network idle, captures unstable DOM, and leaves contexts or downloads alive.',
    'isolated evidence-driven rendering adapter',
    [
      [
        'crawler-ts-render-necessity',
        'Render only when static evidence cannot satisfy an authorized stakeholder requirement and retain the decision cause.',
        'JavaScript presence means every page requires a browser.',
      ],
      [
        'crawler-ts-context-isolation',
        'Create bounded incognito-like BrowserContexts with explicit storage, permission, download, service-worker, locale, viewport, and close policy.',
        'Opening a new Page fully isolates cookies, cache, permissions, and workers.',
      ],
      [
        'crawler-ts-readiness-contract',
        'Wait for application-specific stable evidence under time and request budgets instead of treating network idle as universal readiness.',
        'networkidle means every dynamic application is complete.',
      ],
      [
        'crawler-ts-browser-network-policy',
        'Reapply origin, request type, redirect, download, WebSocket, worker, and SSRF rules to browser-initiated traffic.',
        'Validating the navigation URL controls all subresource requests.',
      ],
      [
        'crawler-ts-rendered-provenance',
        'Bind browser version, context policy, viewport, actions, DOM digest, screenshot or trace identity, console errors, and closure evidence.',
        'Rendered HTML alone explains the browser state that produced it.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-ts-authenticated-privacy-boundary',
    'Authenticated Crawls, Sessions, Tenant Isolation, and Privacy',
    'Credentials are copied into configs, sessions cross origins and users, logout links execute, sensitive pages enter shared caches, and retained reports leak personal data.',
    'least-authority session and privacy policy',
    [
      [
        'crawler-ts-session-authorization',
        'Require explicit owner and account authorization, purpose, role, environment, page scope, time window, and revocation for authenticated access.',
        'Valid credentials authorize every action available to the account.',
      ],
      [
        'crawler-ts-secret-lifecycle',
        'Acquire secrets through approved channels, avoid source and logs, scope them minimally, rotate exposure, and destroy temporary material.',
        'Environment variables make secrets inherently safe.',
      ],
      [
        'crawler-ts-safe-method-navigation',
        'Permit safe retrieval only, block state-changing forms and logout or destructive routes, and test same-site side effects.',
        'GET requests can never change server state.',
      ],
      [
        'crawler-ts-session-isolation',
        'Partition cookies, storage, caches, checkpoints, reports, and browser contexts by owner, tenant, account, purpose, and run.',
        'Different targets can share one authenticated browser context for efficiency.',
      ],
      [
        'crawler-ts-sensitive-data-controls',
        'Minimize, redact, encrypt where required, restrict access, expire, delete, and audit sensitive content through every derived artifact.',
        'Redacting final CSV removes sensitive values from all intermediate state.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-ts-untrusted-content-security',
    'Untrusted Markup, Formula Injection, Paths, Logs, and Plugin Boundaries',
    'Extracted text becomes HTML, CSV formulas execute, URLs create paths, terminal controls poison logs, and third-party plugins receive raw secrets and network authority.',
    'safe untrusted-content processing boundary',
    [
      [
        'crawler-ts-safe-rendering-sinks',
        'Render findings through text-safe sinks or context-specific encoding and narrowly reviewed sanitization.',
        'Escaping HTML once makes content safe in every output context.',
      ],
      [
        'crawler-ts-csv-formula-defense',
        'Preserve data while neutralizing spreadsheet formula triggers under an explicit export and consumer contract.',
        'Quoting CSV fields prevents spreadsheet formula execution.',
      ],
      [
        'crawler-ts-path-archive-defense',
        'Generate owned filenames, confine paths, reject traversal and unsafe archive entries, and handle collisions and Unicode deliberately.',
        'Removing ../ makes an untrusted path safe.',
      ],
      [
        'crawler-ts-log-terminal-safety',
        'Structure logs, bound and encode untrusted values, remove control sequences, redact secrets, and prevent log-shape injection.',
        'JSON.stringify alone makes logs and terminals safe.',
      ],
      [
        'crawler-ts-plugin-capability',
        'Give parsers and plugins typed bounded inputs, no ambient secrets or network, deadlines, output validation, versioning, and kill boundaries.',
        'npm package sandboxing protects the host by default.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-ts-accessible-report-exports',
    'JSON Lines, CSV, HTML Reports, Accessibility, and Correction Workflows',
    'Exports omit schema and provenance, spreadsheet formulas remain active, large tables trap keyboard users, charts rely on color, and corrections cannot trace source findings.',
    'versioned accessible site-quality report suite',
    [
      [
        'crawler-ts-jsonl-contract',
        'Version JSON Lines records, encoding, ordering, missingness, provenance, error rows, and digest manifest for streaming consumers.',
        'One JSON object per line is self-documenting and interoperable.',
      ],
      [
        'crawler-ts-csv-contract',
        'Define headers, delimiters, newline, quoting, Unicode, formula defense, nulls, row limits, and round-trip fixtures with csv-stringify.',
        'CSV has one universal dialect and missing-value representation.',
      ],
      [
        'crawler-ts-accessible-html-report',
        'Provide landmarks, headings, summaries, sortable-table alternatives, keyboard controls, focus, reflow, status, print, and non-color severity.',
        'A semantic table alone makes any large report accessible.',
      ],
      [
        'crawler-ts-chart-text-equivalent',
        'Pair charts and relationship views with structured tables, descriptions, filters, units, scales, and source links.',
        'An aria-label containing chart title is a complete text alternative.',
      ],
      [
        'crawler-ts-correction-workflow',
        'Link findings to evidence, owner, status, decision, suppression expiry, retest, changed version, and stakeholder-readable resolution.',
        'Deleting a report row is a valid correction history.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-ts-node-test-fault-evidence',
    'node:test, Fixtures, Compile-Negative Cases, Faults, and Mutation Evidence',
    'Tests mock all networking, reuse friendly HTML, assert snapshots only, skip emitted code, and never prove a deliberate defect is detected.',
    'risk-layered deterministic crawler test system',
    [
      [
        'crawler-ts-fixture-taxonomy',
        'Build original accepted, malformed, adversarial, boundary, changed, Unicode, duplicate, inaccessible, and privacy-sensitive fixtures with provenance.',
        'One representative HTML fixture covers parser and crawler behavior.',
      ],
      [
        'crawler-ts-pure-model-tests',
        'Test URL, robots, sitemap, state, scheduling, extraction, dedup, report, and recovery invariants with deterministic clocks and schedules.',
        'Only end-to-end browser tests reveal meaningful defects.',
      ],
      [
        'crawler-ts-compile-negative-tests',
        'Use expected TypeScript errors to prove invalid state, unsafe narrowing, mutable values, and missing exhaustive cases are rejected.',
        'Passing runtime tests proves the type boundary is useful.',
      ],
      [
        'crawler-ts-local-integration-faults',
        'Use loopback servers and adapters for redirects, truncation, encoding, delay, disconnect, compression, retry, cancellation, and shutdown faults.',
        'Mocked fetch responses prove Node network lifecycle behavior.',
      ],
      [
        'crawler-ts-mutation-detection',
        'Seed defects in scope, robots, byte limits, selector cardinality, visited timing, abort, report escaping, and recovery and require tests to fail.',
        'High statement coverage proves tests detect harmful changes.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-ts-observability-capacity-operations',
    'Causal Telemetry, Event-Loop Capacity, Scheduling, and Operations',
    'Logs lack run and URL identity, metrics have unbounded labels, event-loop delay is ignored, schedules overlap, retention grows forever, and alerts lack owner action.',
    'operable privacy-aware crawler service',
    [
      [
        'crawler-ts-causal-telemetry',
        'Correlate run, policy, URL, attempt, redirect, response, parse, frontier, browser, audit, export, and recovery events without logging content secrets.',
        'A timestamp and URL in console.log are sufficient causal evidence.',
      ],
      [
        'crawler-ts-bounded-metrics',
        'Define low-cardinality request, byte, queue, age, error, rejection, browser, report, and budget metrics with units and labels.',
        'Using raw URLs as metric labels helps debugging without cost.',
      ],
      [
        'crawler-ts-eventloop-capacity',
        'Measure event-loop delay, CPU, heap, streams, sockets, browser contexts, queue age, throughput, and origin fairness under representative fixtures.',
        'High concurrency always increases useful throughput.',
      ],
      [
        'crawler-ts-nonoverlap-schedule',
        'Use one durable schedule owner, overlap exclusion, missed-run policy, owner pause, configuration identity, and shutdown evidence.',
        'setInterval is a durable production scheduler.',
      ],
      [
        'crawler-ts-runbook-retention',
        'Define startup, pause, incident, partial output, retention, deletion, correction, restart, rollback, and escalation procedures with owners.',
        'Logs and reports should be retained indefinitely for debugging.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-ts-supply-chain-package-container',
    'Supply Chain, Browser Binaries, Packages, Containers, and Rollout',
    'The release trusts lifecycle scripts, downloads an untracked browser, ships dev residue and root permissions, rebuilds after approval, and rolls out without evidence comparison.',
    'source-bound least-authority crawler release',
    [
      [
        'crawler-ts-dependency-provenance',
        'Review direct purpose, transitive graph, lifecycle scripts, integrity, provenance, licenses, advisories, reachability, and upgrade ownership.',
        'npm audit output alone proves dependency safety.',
      ],
      [
        'crawler-ts-browser-binary-provenance',
        'Bind Playwright package, browser revision, download source, digest, platform libraries, sandbox policy, and patch process.',
        'Pinning the Playwright npm package pins every browser artifact automatically.',
      ],
      [
        'crawler-ts-package-inspection',
        'Inspect packed files, exports, declarations, source maps, licenses, fixtures, secrets, generated files, and emitted smoke before publish.',
        'A successful npm pack means package contents are correct.',
      ],
      [
        'crawler-ts-container-hardening',
        'Use pinned multi-stage images, non-root user, read-only runtime where possible, explicit browser dependencies, limits, signals, and inspected contents.',
        'Containers sandbox untrusted pages and plugins by default.',
      ],
      [
        'crawler-ts-progressive-rollout',
        'Promote one immutable artifact through canary scopes, compare correctness and resource evidence, pause automatically, and rehearse rollback.',
        'Rebuilding from the same commit produces the same approved release.',
      ],
    ]
  ),
  crawlerModule(
    'crawler-ts-recovery-release-defense',
    'Backup, Restore, Incident Response, Release Gates, and Residual Risk',
    'A team calls a successful crawl complete without restored checkpoints, corrected exports, browser cleanup, unfamiliar-site evidence, incident drills, or owned residual risks.',
    'production release and recovery defense dossier',
    [
      [
        'crawler-ts-backup-objectives',
        'Classify policies, authorization records, checkpoints, extracted data, reports, corrections, secrets, and logs by RPO, RTO, retention, and restore order.',
        'Backing up output reports is enough to resume and audit a crawl.',
      ],
      [
        'crawler-ts-isolated-restore',
        'Restore into isolation, validate versions and digests, reconcile frontier and records, rotate secrets, and prove safe resume without contacting targets.',
        'A backup command exit code proves restorable state.',
      ],
      [
        'crawler-ts-incident-drills',
        'Rehearse owner revoke, runaway space, private-address redirect, secret leak, bad selector, accessibility regression, corrupt checkpoint, browser leak, and unsafe export.',
        'Rollback alone handles crawler security, privacy, and data incidents.',
      ],
      [
        'crawler-ts-release-gates',
        'Require source-to-emission, clean install, types, lint, tests, mutations, local faults, browser, accessibility, security, capacity, package, container, restore, and rollback evidence.',
        'Passing compiler and unit tests is sufficient release evidence.',
      ],
      [
        'crawler-ts-residual-risk-defense',
        'Defend unfamiliar authorized cases, state non-claims, assign every accepted risk an owner and expiry, and preserve stakeholder sign-off.',
        'A polished demonstration eliminates need for residual-risk ownership.',
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
    'Controls product tokens, group and rule matching, percent encoding, status failures, redirects, caching, and protocol limits.',
  ],
  [
    'Sitemaps XML Protocol',
    'standard',
    'https://www.sitemaps.org/protocol.html',
    'Protocol current 2026-07-15',
    'Controls sitemap and index XML, UTF-8, location, count, size, escaping, and hint semantics.',
  ],
  [
    'WHATWG URL Living Standard',
    'standard',
    'https://url.spec.whatwg.org/',
    'Living Standard current 2026-07-15',
    'Controls parsing, resolution, serialization, origin, host, IDNA, and URL state.',
  ],
  [
    'WHATWG HTML Living Standard',
    'standard',
    'https://html.spec.whatwg.org/',
    'Living Standard current 2026-07-15',
    'Controls parsing, tree construction, links, base URLs, metadata, semantics, and browser document behavior.',
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
    'Controls cache keys, freshness, validation, storage, and invalidation boundaries.',
  ],
  [
    'Node.js 24 Globals',
    'official-docs',
    'https://nodejs.org/download/release/latest-v24.x/docs/api/globals.html',
    'Node 24.18.0',
    'Controls Fetch, URL-adjacent web APIs, AbortController, AbortSignal composition, streams, and runtime stability.',
  ],
  [
    'TypeScript Documentation',
    'official-docs',
    'https://www.typescriptlang.org/docs/',
    'TypeScript 7.0.2 and 6.0.2 compatibility surface',
    'Controls strict types, narrowing, modules, declarations, emit, compiler behavior, and migration evidence.',
  ],
  [
    'Cheerio Documentation',
    'official-docs',
    'https://cheerio.js.org/docs/',
    'Cheerio 1.2.0',
    'Controls document loading, parse5 behavior, selectors, traversal, extraction, and parser configuration.',
  ],
  [
    'robots-parser Source',
    'official-docs',
    'https://github.com/samclarke/robots-parser',
    'robots-parser 3.0.1',
    'Controls package API behavior subject to owned RFC 9309 conformance tests and adapter limits.',
  ],
  [
    'p-limit Source',
    'official-docs',
    'https://github.com/sindresorhus/p-limit',
    'p-limit 7.3.0',
    'Controls bounded Promise concurrency while leaving scheduling, fairness, and cancellation policy to the application.',
  ],
  [
    'Playwright Documentation',
    'official-docs',
    'https://playwright.dev/docs/intro',
    'Playwright 1.61.1',
    'Controls browser installation, contexts, pages, network routing, locators, tracing, accessibility testing, and cleanup.',
  ],
  [
    'Playwright Accessibility Testing',
    'official-docs',
    'https://playwright.dev/docs/accessibility-testing',
    'Playwright 1.61.1 with axe-core 4.12.1',
    'Controls automated browser scan integration and explicit manual-testing limits.',
  ],
  [
    'Web Content Accessibility Guidelines 2.2',
    'standard',
    'https://www.w3.org/TR/WCAG22/',
    'W3C Recommendation 2024-12-12',
    'Controls testable accessibility criteria, full-page states, conformance, and automated-test non-coverage.',
  ],
  [
    'OWASP SSRF Prevention',
    'standard',
    'https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html',
    'Current 2026-07-15',
    'Controls URL, address, DNS, redirect, proxy, metadata, network, and allowlist defenses.',
  ],
  [
    'OWASP XSS Prevention',
    'standard',
    'https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html',
    'Current 2026-07-15',
    'Controls safe output contexts, encoding, sanitization, dangerous sinks, and untrusted markup.',
  ],
  [
    'NIST Privacy Framework',
    'standard',
    'https://www.nist.gov/privacy-framework',
    'Privacy Framework 1.0 current 2026-07-15',
    'Controls purpose, data processing, governance, communication, protection, retention, and correction risk.',
  ],
  [
    'NIST Secure Software Development Framework',
    'standard',
    'https://csrc.nist.gov/pubs/sp/800/218/final',
    'SP 800-218',
    'Controls secure development, provenance, dependencies, release integrity, and vulnerability response.',
  ],
  [
    'ACM IEEE AAAI Computer Science Curricula',
    'standard',
    'https://csed.acm.org/',
    'CS2023',
    'Controls networking, software, data, security, ethics, accessibility, professional practice, and project evidence.',
  ],
].map(([title, authority, url, version, scope]) => ({
  title,
  authority,
  url,
  version,
  reviewedAt: REVIEWED_AT,
  scope,
}));

export const buildWebScraperTypescriptConfig = finalizeCourse(
  {
    id: 'build-web-scraper-typescript',
    title:
      'Build and Ship an Authorized Web Crawler and Accessible Site Auditor in TypeScript 7 and Node 24',
    version: '2026.07',
    audience: {
      description:
        'Advanced TypeScript backend and web learners ready to integrate authorization, web standards, runtime validation, bounded Fetch and Promise ownership, Cheerio, Playwright, accessibility auditing, secure reporting, testing, operations, and recovery into one cumulative crawler product.',
      entryKnowledge: [
        'Build strict ESM TypeScript and Node 24 applications with unknown-value validation, exhaustive unions, async ownership, tests, emitted artifacts, and clean shutdown.',
        'Construct secure bounded HTTP clients with redirects, caching, authentication, SSRF defense, fault injection, and observability evidence.',
        'Read semantic HTML, CSS selectors, accessibility requirements, responsive states, metadata, browser tools, and web security at Responsive Web Design depth.',
        'Use queues, sets, maps, graphs, traversal invariants, complexity, Git, and repository quality gates to preserve repeatable engineering evidence.',
      ],
      deviceConstraints: [
        'Modern browser for deterministic pure-TypeScript practice; controlled Node 24, loopback network, DNS, filesystem, Cheerio, Playwright browsers, axe-core, package, container, load, assistive-technology, and production transfer labs require an authorized local environment.',
      ],
      accessibilityAssumptions: [
        'Every URL, graph, state trace, HTML tree, audit finding, report, code task, chart, and project artifact requires structured text, keyboard operation, visible focus, announced status, non-color meaning, reflow, large targets, and reduced-motion support.',
      ],
    },
    scope: {
      includes: [
        'A cumulative crawler and accessible site auditor from explicit owner authorization through URL and robots policy, bounded Fetch, Cheerio extraction, fair Promise scheduling, durable checkpoints, metadata and accessibility audits, Playwright rendering, secure reports, operations, and recovery',
        'Node 24 and TypeScript 7 source-to-emission proof; WHATWG URL and HTML; RFC 9309; sitemaps; robots-parser conformance adapter; p-limit; Cheerio 1.2; Playwright 1.61; axe-core 4.12; runtime, security, accessibility, privacy, testing, package, container, and incident evidence',
        'Original deterministic browser models plus controlled compiler, emitted Node, loopback HTTP, DNS, filesystem, browser, accessibility, load, package, container, restore, rollback, legal-review, and production transfer gates',
        'Five distinct stakeholder projects and a cumulative unfamiliar-site production defense',
      ],
      excludes: [
        'Copied curricula or tutorials, unauthorized targets, access-control or CAPTCHA evasion, identity or proxy rotation, destructive requests, private-network access, personal-data hoarding, ranking guarantees, automated WCAG-conformance claims, or routine tests against public sites',
        'Claims that browser TypeScript, compiler checks, or a successful local crawl prove native network, DNS, Cheerio, Playwright, accessibility, privacy, legal, load, package, container, recovery, or production behavior',
      ],
      nextCourses: ['personal-project-1', 'capstone-project', 'job-search'],
    },
    sources,
    sharedRequirements: [
      'Every activity retrieves stakeholder outcome, owner authorization, revision and runtime, seed and URL identity, origin and path policy, robots decision, response and byte budgets, parser and extraction provenance, frontier and Promise ownership, privacy and accessibility requirement, failure, cleanup, recovery, and controlled transfer limit before adding one boundary.',
      'Browser TypeScript uses original fixed fixtures and pure bounded models only. It does not import Node APIs, contact sites, resolve DNS, read host files, run Cheerio, Playwright, or axe-core, retain credentials, start timers or processes, or claim live accessibility, privacy, legal, load, package, container, or production behavior.',
      'Passing work requires prediction, exact intermediate evidence, runnable accepted and rejected cases, a changed case, a test that catches a deliberate defect, accessible stakeholder output, count reconciliation, and explicit ownership of remaining risk.',
    ],
    modules,
    projects: [
      project(
        'crawler-ts-authorized-extractor',
        'Authorized Runtime-Validated Page Extractor',
        'crawler-ts-fetch-stream-contract',
        'A disability-led local-history archive and its website owner',
        'They need a reproducible bounded extractor that proves owner authorization, URL and robots decisions, Fetch cleanup, byte admission, and evidence-layer limits without claiming live-site permission.',
        [
          'crawler-ts-owner-authorization',
          'crawler-ts-evidence-layers',
          'crawler-ts-conservative-key',
          'crawler-ts-library-conformance',
          'crawler-ts-stream-byte-limit',
        ]
      ),
      project(
        'crawler-ts-polite-frontier',
        'Fair Crash-Resumable Documentation Crawler',
        'crawler-ts-checkpoint-resume',
        'A university documentation platform and independent departmental publishers',
        'They need bounded sitemap and link discovery, trap containment, origin fairness, Promise backpressure, cancellation, crash-consistent checkpoints, and restart evidence.',
        [
          'crawler-ts-index-bounds',
          'crawler-ts-visited-at-schedule',
          'crawler-ts-query-cardinality-budget',
          'crawler-ts-origin-buckets',
          'crawler-ts-resume-reconciliation',
        ]
      ),
      project(
        'crawler-ts-inclusive-auditor',
        'Inclusive Search, Accessibility, and Resource Auditor',
        'crawler-ts-resource-performance-audit',
        'A municipal digital-services accessibility and content team',
        'They need changed metadata, static WCAG-linked heuristics, stateful axe scans, manual review routes, resource budgets, and accessible evidence without search-ranking or conformance overclaims.',
        [
          'crawler-ts-canonical-signals',
          'crawler-ts-conformance-nonclaim',
          'crawler-ts-interaction-state-matrix',
          'crawler-ts-manual-test-matrix',
          'crawler-ts-performance-nonclaim',
        ]
      ),
      project(
        'crawler-ts-secure-dynamic-reporting',
        'Secure Dynamic Crawl and Correction System',
        'crawler-ts-node-test-fault-evidence',
        'An authorized public-benefit product quality group',
        'They need necessary-only isolated rendering, authenticated-session separation, safe untrusted-content exports, accessible reports, deterministic browser and network faults, and mutation evidence.',
        [
          'crawler-ts-render-necessity',
          'crawler-ts-browser-network-policy',
          'crawler-ts-session-isolation',
          'crawler-ts-accessible-html-report',
          'crawler-ts-mutation-detection',
        ]
      ),
      project(
        'crawler-ts-production-defense',
        'TypeScript Crawler Release and Recovery Defense',
        'crawler-ts-recovery-release-defense',
        'A joint target-owner, accessibility, privacy, security, Node, operations, legal-review, and support board',
        'The board needs source-to-emitted-artifact evidence, bounded capacity, controlled rollout, restored state, incident drills, rollback, explicit non-claims, and owned residual risks.',
        [
          'crawler-ts-eventloop-capacity',
          'crawler-ts-browser-binary-provenance',
          'crawler-ts-progressive-rollout',
          'crawler-ts-isolated-restore',
          'crawler-ts-residual-risk-defense',
        ]
      ),
    ],
    examContext:
      'Unfamiliar authorized TypeScript crawler and site-auditor cases spanning stakeholder value, authorization, privacy and legal-review routing, Node 24 and TypeScript 7 source-to-emission evidence, async ownership, scope, WHATWG URL identity, RFC 9309 library conformance, sitemap XML, bounded Fetch streams, redirect and DNS SSRF defense, encodings, Cheerio and parse5 trees, runtime-validated extraction and provenance, semantic links, frontier states, URL traps, origin-fair scheduling, Promise backpressure and abort, crash-consistent checkpoints, exact and near duplicate evidence, indexing metadata, static and axe accessibility audits, resource evidence, isolated Playwright rendering, authenticated privacy, untrusted-content security, accessible exports, node:test and mutation evidence, telemetry and event-loop capacity, supply-chain and browser-binary provenance, packages, containers, backup, restore, incident response, rollback, and residual-risk defense with explicit browser and controlled native boundaries.',
    minimumQuestionBankSize: 1020,
  },
  {
    researchedAt: RESEARCHED_AT,
    prerequisiteCourseIds: [
      'typescript-basics',
      'http-clients-typescript',
      'responsive-web-design',
      'git-basics',
      'repository-quality-gates',
    ],
  }
);

import { finalizeCourse, project, skill } from './course-config-helpers.mjs';

const REVIEWED_AT = '2026-07-14';
const RESEARCHED_AT = '2026-07-15T14:00:00.000Z';

function outcome(id, statement, misconception, knowledgeType = 'procedural', level = 'apply') {
  if (!misconception) throw new Error(`Missing misconception for scraper competency ${id}`);
  return skill(id, statement, misconception, knowledgeType, level);
}

function scraperModule(id, title, context, artifact, skills) {
  return {
    id,
    title,
    context,
    artifact,
    objectives: skills.slice(0, 3).map((entry) => entry[1]),
    skills,
    contexts: {
      theory: `${context} Predict authorization, identity, scope, parsing, extraction, crawl state, resource use, privacy, accessibility, failure, and evidence before reading the governing source.`,
      workshop: `A public-interest site-quality team incrementally builds ${artifact} from original fixed response and HTML fixtures while retaining earlier authorization, HTTP, URL, provenance, politeness, accessibility, testing, security, and recovery requirements.`,
      debug: `A preserved crawl trace contains one plausible authorization, URL, robots, HTTP, decoding, parser, selector, frontier, concurrency, metadata, accessibility, privacy, export, browser, or release defect; locate the first failed invariant before editing.`,
      lab: `An independent site owner provides a different origin, URL space, markup fault, indexing policy, accessibility need, resource budget, dynamic boundary, and failure condition and transfers ${title.toLowerCase()} into a changed ${artifact}.`,
      review: `A delayed crawl review reconstructs ${title.toLowerCase()} from authorization, revision, seed, URL key, response identity, robots decision, parse record, extraction provenance, frontier event, report row, failure, and recovery evidence.`,
      quiz: `A release reviewer compares near-miss decisions for ${title.toLowerCase()} and accepts only runnable changed-case evidence, explicit non-claims, and named browser, network, DNS, parser, filesystem, privacy, accessibility, legal-review, scale, and production transfer gates.`,
    },
  };
}

const modules = [
  scraperModule(
    'scraper-outcomes-authorization-evidence',
    'Stakeholder Outcomes, Authorization, Ethics, Privacy, and Evidence',
    'A team says “scrape this public site” without a site owner, permitted purpose, data policy, stop contact, accessibility outcome, or proof that the result helps anyone.',
    'authorized stakeholder and evidence charter',
    [
      outcome(
        'scraper-stakeholder-outcome',
        'Define the stakeholder decision, users, page population, evidence, success, failure, review cadence, and observable value before choosing crawler technology.',
        'Collecting many pages is itself a useful stakeholder outcome.',
        'strategic',
        'create'
      ),
      outcome(
        'scraper-source-authorization',
        'Record who controls the target, what access is authorized, which identities and paths are permitted, and who can pause or revoke the crawl.',
        'Public reachability alone implies authorization to automate access.',
        'professional',
        'evaluate'
      ),
      outcome(
        'scraper-rules-legal-review',
        'Separate technical policy from terms, contracts, copyright, privacy, and jurisdiction questions and route uncertain cases to qualified review.',
        'robots.txt is a universal legal permission document.',
        'professional',
        'evaluate'
      ),
      outcome(
        'scraper-privacy-minimization',
        'Define purpose, minimum fields, consent or authority, retention, access, deletion, and aggregation risk before collecting personal data.',
        'Public personal data has no privacy or retention boundary.',
        'professional',
        'create'
      ),
      outcome(
        'scraper-evidence-boundaries',
        'Separate deterministic model, parser, local-server, controlled-site, browser-render, load, privacy, accessibility, legal-review, and production evidence.',
        'A successful request and CSV file prove a crawler is correct and acceptable.',
        'metacognitive',
        'evaluate'
      ),
    ]
  ),
  scraperModule(
    'scraper-repo-runtime-dependencies',
    'Repository, Python Runtime, Dependencies, Parsers, and Reproducibility',
    'The crawler runs from an unknown revision with floating packages, an undocumented parser, no license inventory, and no clean-environment proof.',
    'reproducible crawler repository baseline',
    [
      outcome(
        'scraper-repository-baseline',
        'Inspect revision, status, existing behavior, tests, configuration, data fixtures, licenses, secrets, and a recovery anchor before editing.',
        'A small scraper does not need repository or rollback evidence.'
      ),
      outcome(
        'scraper-python-runtime-contract',
        'Record Python implementation and version, platform, SSL backend, event-loop assumptions, encoding environment, and supported runtime matrix.',
        'Any Python 3 interpreter gives identical networking, parser, and concurrency behavior.'
      ),
      outcome(
        'scraper-dependency-lock',
        'Pin direct and resolved dependencies, verify hashes and sources, review licenses and advisories, and prove clean installation.',
        'Listing broad minimum versions is enough for reproducible crawler behavior.'
      ),
      outcome(
        'scraper-parser-choice-evidence',
        'Choose html.parser, Beautiful Soup, lxml, or browser parsing from malformed-input behavior, performance, portability, and security evidence.',
        'All HTML parsers build the same tree from real-world markup.'
      ),
      outcome(
        'scraper-environment-reproducibility',
        'Recreate the tool from a clean environment and reconcile versions, fixtures, default configuration, output digest, and shutdown state.',
        'A working developer environment proves the declared dependency set is complete.'
      ),
    ]
  ),
  scraperModule(
    'scraper-crawl-scope-policy',
    'Seeds, Origins, Paths, Query Space, Budgets, and Stop Policy',
    'A seed expands to subdomains, downloads, calendars, search results, and logout links while the crawler has no page, byte, time, or incident limit.',
    'bounded crawl-scope policy',
    [
      outcome(
        'scraper-seed-identity',
        'Record each seed URL, stakeholder, purpose, authorization source, expected content class, and crawl revision.',
        'A hostname is a sufficient crawl seed and evidence identity.'
      ),
      outcome(
        'scraper-origin-allowlist',
        'Define allowed schemes, normalized hosts, ports, subdomains, redirects, and cross-origin resources with deny-by-default rules.',
        'Same registrable domain always means same authority and risk.'
      ),
      outcome(
        'scraper-path-query-policy',
        'Express permitted paths, methods, query keys, values, pagination, fragments, and content types as testable admission rules.',
        'Following every same-host href keeps a crawler in scope.'
      ),
      outcome(
        'scraper-resource-budgets',
        'Budget pages, depth, requests, redirects, bytes, decompressed bytes, time, concurrency, retries, disk, browser contexts, and report rows.',
        'A delay between requests prevents every form of crawler overload.'
      ),
      outcome(
        'scraper-stop-and-contact-policy',
        'Define automatic stop signals, manual kill paths, owner contact, partial-output handling, cleanup, and restart authorization.',
        'A crawler should keep retrying until it eventually completes.'
      ),
    ]
  ),
  scraperModule(
    'scraper-url-identity-canonicalization',
    'URL References, Resolution, Identity Keys, Unicode, and Canonicalization',
    'Relative references, fragments, default ports, dot segments, percent encodings, Unicode hosts, and tracking parameters produce duplicates or escape scope.',
    'URL resolution and identity pipeline',
    [
      outcome(
        'scraper-url-component-model',
        'Parse scheme, authority, userinfo, host, port, path, query, and fragment without treating a URL as a trustworthy string.',
        'Splitting a URL on slashes and question marks preserves its meaning.'
      ),
      outcome(
        'scraper-reference-resolution',
        'Resolve relative, scheme-relative, path-relative, query-only, and fragment-only references against the effective document base.',
        'String concatenation correctly resolves every relative link.'
      ),
      outcome(
        'scraper-fragment-fetch-identity',
        'Remove fragments from network-fetch identity while preserving them when the stakeholder report needs document-location evidence.',
        'Different fragments always require separate HTTP requests.'
      ),
      outcome(
        'scraper-canonical-url-key',
        'Define conservative scheme, host, port, path, percent-encoding, query-order, and tracking-parameter normalization without merging distinct resources.',
        'Lowercasing and sorting every URL component is safe canonicalization.'
      ),
      outcome(
        'scraper-unicode-idna-boundary',
        'Keep display and network host forms distinct, validate Unicode and IDNA conversions, and make confusable or failed conversions visible.',
        'Unicode hostnames and their ASCII forms are interchangeable without validation.'
      ),
    ]
  ),
  scraperModule(
    'scraper-robots-sitemaps',
    'Robots Exclusion Protocol, Failure Semantics, Caching, and Sitemaps',
    'The crawler fetches robots.txt from the wrong path, merges groups incorrectly, treats an outage as permission, obeys nonstandard delay blindly, and trusts cross-host sitemap URLs.',
    'RFC 9309 robots and sitemap decision record',
    [
      outcome(
        'scraper-robots-location-agent',
        'Fetch `/robots.txt` at the correct service origin and use an honest stable product token and contact identity.',
        'Any robots.txt path or wildcard user-agent label represents the same crawler.'
      ),
      outcome(
        'scraper-robots-group-matching',
        'Apply RFC 9309 group selection, rule matching, percent encoding, longest-match precedence, and allow-over-disallow tie behavior.',
        'The first textual rule that mentions a path always wins.'
      ),
      outcome(
        'scraper-robots-failure-cache-policy',
        'Handle successful, unavailable, unreachable, redirect, oversized, and stale robots responses with explicit cache and conservative stop policy.',
        'Every robots fetch failure means unrestricted crawling.'
      ),
      outcome(
        'scraper-robots-extension-boundary',
        'Treat crawl-delay, request-rate, and other extensions as documented policy inputs without claiming RFC 9309 requires them.',
        'crawl-delay is a normative RFC 9309 directive supported identically everywhere.'
      ),
      outcome(
        'scraper-sitemap-boundaries',
        'Parse bounded UTF-8 sitemap and index files, enforce location and host rules, validate escaping, and treat change and priority fields as hints.',
        'Every sitemap URL is authorized, current, unique, and mandatory to crawl.'
      ),
    ]
  ),
  scraperModule(
    'scraper-http-fetch-contract',
    'HTTP Client Reuse, Retrieval, Redirects, Validators, and Bounded Bodies',
    'Each page creates a new client, sends browser-like lies, follows redirects outside scope, reads unlimited bodies, and accepts an HTML-looking error page.',
    'bounded HTTP page-fetch contract',
    [
      outcome(
        'scraper-http-client-reuse',
        'Reuse one configured client or bounded pool and close it deliberately so connection, proxy, TLS, cookie, and resource ownership are visible.',
        'Creating one client per URL is the cleanest isolation strategy.'
      ),
      outcome(
        'scraper-fetch-method-fields',
        'Use safe retrieval methods and an honest User-Agent, Accept, Accept-Encoding, conditional, and contact policy without impersonation.',
        'Copying a consumer browser header set makes a crawler compliant.'
      ),
      outcome(
        'scraper-response-admission',
        'Classify transport, status, media type, length, content coding, and domain outcomes before parsing the representation.',
        'Status 200 or an html suffix proves the body is usable HTML.'
      ),
      outcome(
        'scraper-redirect-revalidation',
        'Resolve each redirect, reapply authorization, origin, credential, method, loop, and budget policy, and retain the complete chain.',
        'A permitted initial URL makes every redirect destination permitted.'
      ),
      outcome(
        'scraper-bounded-streaming',
        'Enforce compressed and expanded byte limits during streaming, close partial bodies, and retain a visible rejection reason.',
        'Checking Content-Length before a full read prevents oversized responses.'
      ),
    ]
  ),
  scraperModule(
    'scraper-bytes-encoding-admission',
    'Response Bytes, Content Codings, Character Encodings, and Source Identity',
    'The parser receives truncated compressed bytes, guesses the platform encoding, ignores a conflicting declaration, and hashes normalized text as if it were the source.',
    'byte-to-Unicode admission ledger',
    [
      outcome(
        'scraper-compressed-byte-budget',
        'Track wire, compressed, decompressed, decoded, and retained sizes and stop before an expansion or memory budget is exceeded.',
        'A small compressed response is necessarily cheap to decode.'
      ),
      outcome(
        'scraper-content-coding-chain',
        'Validate and apply declared content codings in order while distinguishing unsupported, corrupt, partial, and over-budget representations.',
        'Unknown or corrupt compression should be passed to the HTML parser.'
      ),
      outcome(
        'scraper-charset-decision',
        'Record transport declarations, byte-order marks, HTML declarations, parser detection, replacement behavior, and the final chosen encoding.',
        'Calling response.text makes character decoding objectively correct.'
      ),
      outcome(
        'scraper-nonhtml-rejection',
        'Reject or separately route images, archives, PDFs, XML, JSON, binary downloads, and mislabeled bodies using type and content evidence.',
        'Anything linked from an HTML page should be parsed as HTML.'
      ),
      outcome(
        'scraper-source-digest-provenance',
        'Retain effective URL, response metadata, byte digest, decode decision, parser choice, retrieval time, and fixture or authorization identity.',
        'A normalized text hash is enough to reproduce the fetched source.'
      ),
    ]
  ),
  scraperModule(
    'scraper-html-parser-models',
    'HTML Tokens, Error Recovery, Parser Selection, and Differential Evidence',
    'A selector works under one parser but fails under another because omitted elements, foster parenting, broken nesting, and script or noscript state produce different trees.',
    'bounded parser and tree-behavior comparison',
    [
      outcome(
        'scraper-token-tree-model',
        'Distinguish source bytes, decoded text, tokens, parse errors, the constructed tree, serialized markup, and browser DOM state.',
        'The DOM is a lossless copy of the original HTML source.'
      ),
      outcome(
        'scraper-malformed-html-recovery',
        'Predict omitted tags, mismatched nesting, duplicate attributes, character references, templates, foreign content, and recovery effects on target nodes.',
        'Malformed HTML either raises an error or produces one obvious tree.'
      ),
      outcome(
        'scraper-parser-selection',
        'Select html.parser, lxml HTML, lxml XML, or html5lib deliberately and pin that parser in code, tests, and metadata.',
        'Beautiful Soup automatically selects the same best parser on every machine.'
      ),
      outcome(
        'scraper-script-noscript-boundary',
        'Handle script, style, template, comments, noscript, and raw-text elements without executing them or mistaking directives for visible content.',
        'Parsing HTML safely evaluates page JavaScript and reveals final visible text.'
      ),
      outcome(
        'scraper-parser-differential',
        'Compare parser trees on adversarial fixtures and require extraction contracts to state which differences are acceptable.',
        'Parser differential tests are unnecessary once the happy fixture passes.'
      ),
    ]
  ),
  scraperModule(
    'scraper-selectors-tree-extraction',
    'CSS Selectors, Tree Navigation, Cardinality, Text, and Attributes',
    'A brittle absolute selector returns the wrong repeated card, missing attributes become strings, nested text collapses, and a parser upgrade silently changes cardinality.',
    'selector and extraction contract',
    [
      outcome(
        'scraper-css-selector-semantics',
        'Use type, class, ID, attribute, combinator, grouping, and supported pseudo-class selectors with explicit scope and library support.',
        'A CSS selector behaves like a regular expression over source text.'
      ),
      outcome(
        'scraper-selector-cardinality',
        'State zero, one, optional, at-least-one, and many cardinality expectations and reject ambiguous or duplicate matches.',
        'Taking the first match is harmless when a selector returns too many nodes.'
      ),
      outcome(
        'scraper-relative-component-extraction',
        'Anchor extraction at a stable semantic component and resolve fields relative to it instead of coupling to page-wide positions.',
        'Long absolute descendant selectors are more precise and durable.'
      ),
      outcome(
        'scraper-text-whitespace-policy',
        'Define included descendants, excluded elements, separators, Unicode normalization, whitespace collapse, line boundaries, and empty text.',
        'get_text always reproduces what every user sees and hears.'
      ),
      outcome(
        'scraper-attribute-optional-policy',
        'Distinguish missing, empty, malformed, relative, repeated, and multi-valued attributes and retain the source node for diagnosis.',
        'A missing attribute can be safely coerced into an empty string.'
      ),
    ]
  ),
  scraperModule(
    'scraper-typed-records-provenance',
    'Typed Records, Missingness, Provenance, Validation, and Rejection',
    'The scraper emits loose dictionaries, converts missing prices to zero, drops source locations, and keeps partly invalid rows because most fields look useful.',
    'typed provenance-preserving extraction record',
    [
      outcome(
        'scraper-typed-record-schema',
        'Model raw, parsed, normalized, validated, and exported fields with dataclasses or typed records and a versioned schema.',
        'A dictionary with familiar keys is a sufficient data contract.'
      ),
      outcome(
        'scraper-missing-empty-invalid',
        'Keep missing, empty, unknown, redacted, malformed, not-applicable, and zero values distinct through validation and export.',
        'Empty string, zero, false, and missing all mean no data.'
      ),
      outcome(
        'scraper-field-provenance',
        'Attach source URL, response identity, selector or rule, node evidence, retrieval time, parser, and transformation history to decisions.',
        'The final field value is enough evidence to debug extraction.'
      ),
      outcome(
        'scraper-normalization-boundary',
        'Normalize Unicode, whitespace, units, dates, numbers, URLs, and labels only after preserving raw input and locale assumptions.',
        'Early normalization cannot erase evidence or merge distinct values.'
      ),
      outcome(
        'scraper-validation-rejection',
        'Reject, quarantine, or downgrade records by explicit invariant and report the exact field, evidence, and repair owner.',
        'Keeping invalid rows with a warning is always safer than data loss.'
      ),
    ]
  ),
  scraperModule(
    'scraper-link-discovery-relations',
    'Link-Bearing Elements, Base URLs, Relations, Discovery, and Scheduling',
    'The crawler follows canonical, alternate, preload, form, script, mailto, and base-altered references as if every discovered URL were a navigational page.',
    'typed link-discovery record',
    [
      outcome(
        'scraper-link-bearing-elements',
        'Extract navigational, embedded, form, metadata, refresh, and structured-data URLs by element and attribute with distinct policies.',
        'Only anchor href attributes contain URLs worth analyzing.'
      ),
      outcome(
        'scraper-base-url-precedence',
        'Apply effective response URL and the first valid HTML base element deliberately and retain both source and resolved references.',
        'Relative links always resolve against the original seed URL.'
      ),
      outcome(
        'scraper-link-relation-semantics',
        'Interpret rel tokens such as canonical, alternate, next, prev, nofollow, sponsored, and ugc as evidence or hints, not universal commands.',
        'Every rel token directly controls whether a general-purpose crawler may fetch a link.'
      ),
      outcome(
        'scraper-discovery-admission-order',
        'Resolve, validate syntax, remove fetch fragments, canonicalize conservatively, apply authorization and robots policy, then deduplicate before scheduling.',
        'Deduplicating raw href strings before resolution prevents repeat work.'
      ),
      outcome(
        'scraper-link-provenance',
        'Retain parent page, node or metadata source, raw reference, resolved URL, relation, anchor context, decision, and rejection reason.',
        'A queue of URLs is enough to explain why each request happened.'
      ),
    ]
  ),
  scraperModule(
    'scraper-crawl-graph-frontier',
    'Crawl Graphs, Frontier Strategy, Visited State, Depth, and Determinism',
    'URLs are marked visited after download, duplicates race into the queue, depth changes with concurrency, and restart cannot explain which parent discovered a page.',
    'deterministic crawl-frontier state machine',
    [
      outcome(
        'scraper-crawl-graph-model',
        'Represent pages, fetch identities, redirect edges, discovery edges, canonical hints, embedded resources, and rejection states separately.',
        'A flat visited set captures the complete crawl graph.'
      ),
      outcome(
        'scraper-frontier-strategy',
        'Choose FIFO, depth-first, priority, sitemap, recrawl, or hybrid ordering from stakeholder value and fairness requirements.',
        'Breadth-first order is objectively correct for every crawler.'
      ),
      outcome(
        'scraper-visited-at-schedule',
        'Reserve an admitted URL atomically before scheduling and reconcile queued, active, completed, redirected, rejected, and retry states.',
        'Marking visited only after success cannot produce duplicate concurrent work.'
      ),
      outcome(
        'scraper-depth-parent-provenance',
        'Record first and alternate parents, discovery depth, relation, priority, and scope decision without making completion order define depth.',
        'Async completion order is a stable crawl-depth definition.'
      ),
      outcome(
        'scraper-deterministic-frontier-evidence',
        'Use stable tie-breakers and seeded fixtures so the same admitted graph yields a reproducible decision and report order.',
        'Deterministic tests require disabling concurrency entirely.'
      ),
    ]
  ),
  scraperModule(
    'scraper-url-traps-infinite-spaces',
    'Facets, Calendars, Sessions, Pagination, Search, and Infinite URL Spaces',
    'A finite site generates unbounded filter permutations, dates, tracking IDs, sort orders, empty searches, and repeated pagination paths.',
    'URL-space trap detector and budget policy',
    [
      outcome(
        'scraper-faceted-navigation-traps',
        'Detect repeated filter dimensions, permutations, empty states, sort variants, and low-value combinations using explicit site knowledge.',
        'Removing duplicate query keys eliminates faceted navigation traps.'
      ),
      outcome(
        'scraper-calendar-range-traps',
        'Bound date ranges, next and previous traversal, generated archives, and cyclic calendar links against stakeholder time scope.',
        'A maximum depth automatically bounds calendar URLs.'
      ),
      outcome(
        'scraper-session-tracking-identifiers',
        'Identify session, tracking, nonce, cache-buster, and personalized parameters without deleting unknown keys by guesswork.',
        'Every long or random query value can be stripped safely.'
      ),
      outcome(
        'scraper-pagination-termination',
        'Stop pagination on semantic end evidence, repeated content identity, next-link cycles, page budget, or contract violation.',
        'Incrementing a page number until a request fails is robust pagination.'
      ),
      outcome(
        'scraper-url-space-budget-defense',
        'Measure discovery growth, unique-content yield, rejection ratios, queue age, and owner-defined value to stop expanding traps early.',
        'A global request cap is sufficient diagnosis for an infinite URL space.'
      ),
    ]
  ),
  scraperModule(
    'scraper-politeness-rate-retries',
    'Per-Origin Politeness, Concurrency, Retry Classification, and Adaptive Rate',
    'A global sleep still sends bursts per host, retries permanent blocks, ignores Retry-After, synchronizes workers, and increases load after slow responses.',
    'per-origin politeness and retry controller',
    [
      outcome(
        'scraper-per-origin-spacing',
        'Schedule requests by effective origin with minimum start spacing, stable crawler identity, robots and owner policy, and monotonic time.',
        'Sleeping after every response guarantees evenly spaced request starts.'
      ),
      outcome(
        'scraper-origin-concurrency-cap',
        'Limit active work per origin and globally while accounting for redirects, browser resources, retries, and queued fairness.',
        'One global semaphore prevents one origin from being overloaded.'
      ),
      outcome(
        'scraper-retry-classification',
        'Retry only transient, safe, replayable failures under an attempt and elapsed-time budget and stop on denial or policy signals.',
        'Every timeout, 403, 404, 429, and 503 should receive the same retry policy.'
      ),
      outcome(
        'scraper-retry-after-backoff',
        'Parse applicable Retry-After forms, combine server guidance with bounded exponential backoff and jitter, and prevent amplification.',
        'Exponential backoff alone guarantees polite retries.'
      ),
      outcome(
        'scraper-adaptive-rate-evidence',
        'Adjust rate from measured latency, errors, owner constraints, and target concurrency without turning transient fast responses into bursts.',
        'Lower latency always justifies a faster crawl rate.'
      ),
    ]
  ),
  scraperModule(
    'scraper-async-structured-concurrency',
    'Asyncio Task Groups, Backpressure, Queues, Cancellation, and Cleanup',
    'Fire-and-forget tasks outlive the crawl, an unbounded queue grows, workers swallow cancellation, results depend on race order, and the client leaks.',
    'structured concurrent crawl engine',
    [
      outcome(
        'scraper-taskgroup-lifecycle',
        'Own related crawl tasks in TaskGroup scopes and define how one failure cancels, aggregates, or isolates sibling work.',
        'create_task calls without retained ownership form a reliable worker pool.'
      ),
      outcome(
        'scraper-queue-backpressure',
        'Bound frontier and result queues, state who can close them, and make producers wait or shed work under explicit policy.',
        'An asyncio queue is naturally bounded by available memory.'
      ),
      outcome(
        'scraper-semaphore-resource-order',
        'Acquire global, origin, browser, and output capacity in one documented order and release every permit in finally paths.',
        'Nested semaphores cannot deadlock in a single event loop.'
      ),
      outcome(
        'scraper-cancellation-cleanup',
        'Propagate cancellation after bounded cleanup of responses, tasks, queues, browser contexts, checkpoints, and output transactions.',
        'Catching CancelledError and returning normally is safe cleanup.'
      ),
      outcome(
        'scraper-concurrent-determinism',
        'Separate concurrent execution order from stable report order and test changed schedules, partial failure, and cancellation.',
        'Sorting final rows proves the concurrent state machine is correct.'
      ),
    ]
  ),
  scraperModule(
    'scraper-session-auth-boundaries',
    'Cookies, Authentication, Private Data, Write Avoidance, and Session Cleanup',
    'A crawler logs in with a personal account, stores cookies in logs, follows logout and mutation links, and exports fields beyond the authorized purpose.',
    'authorized session and data-custody contract',
    [
      outcome(
        'scraper-cookie-scope',
        'Use a dedicated cookie jar, inspect domain, path, Secure, HttpOnly, SameSite, partition, expiry, and redirect scope, and avoid ambient sharing.',
        'Cookies returned by one authorized page are safe on every related host.'
      ),
      outcome(
        'scraper-credential-authorization',
        'Use dedicated least-privilege identities, approved secret sources, documented pages and fields, rotation, revocation, and audit ownership.',
        'A valid username and password authorize automated collection of every visible field.'
      ),
      outcome(
        'scraper-safe-method-write-avoidance',
        'Restrict crawler navigation to safe retrieval and block logout, unsubscribe, cart, form, API mutation, and side-effecting endpoints.',
        'Following links with GET cannot change server state.'
      ),
      outcome(
        'scraper-private-data-minimization',
        'Filter, redact, aggregate, encrypt, retain, and delete private records according to the authorized purpose before export.',
        'Authentication makes all collected private data appropriate to retain.'
      ),
      outcome(
        'scraper-session-cleanup-evidence',
        'Close sessions, erase transient credentials and storage, record revocation or logout limits, and verify logs and artifacts contain no secrets.',
        'Process exit reliably clears every credential and browser storage artifact.'
      ),
    ]
  ),
  scraperModule(
    'scraper-incremental-checkpoint-cache',
    'Validators, Incremental Crawls, Checkpoints, Resume, and Deletion',
    'Every run downloads everything, a 304 loses prior content, checkpoints duplicate rows after crash, and disappeared pages remain reported as current.',
    'incremental crawl and recovery ledger',
    [
      outcome(
        'scraper-http-validator-reuse',
        'Store ETag and Last-Modified with representation identity and issue correct conditional requests without treating validators as content hashes.',
        'An ETag has the same meaning and stability across all origins.'
      ),
      outcome(
        'scraper-not-modified-reconciliation',
        'On 304, reconnect current response metadata to a compatible retained representation and reject missing or mismatched cache state.',
        'A 304 response contains the previously fetched body.'
      ),
      outcome(
        'scraper-atomic-checkpoint',
        'Checkpoint frontier, visited states, response identity, output transaction, schema, and revision atomically or through a replayable log.',
        'Saving only the URL queue is enough to resume exactly.'
      ),
      outcome(
        'scraper-idempotent-resume',
        'Reprocess ambiguous in-flight work safely and deduplicate output by stable run, page, record, and schema identities.',
        'A crashed async request is always known to have failed before producing output.'
      ),
      outcome(
        'scraper-deletion-tombstone-policy',
        'Distinguish temporary failure, redirect, noindex, permission loss, deletion, and absence from discovery before expiring prior records.',
        'A URL missing from one crawl should be deleted immediately.'
      ),
    ]
  ),
  scraperModule(
    'scraper-content-dedup-change',
    'Exact Duplicates, Boilerplate, Similarity, Canonicals, and Change Detection',
    'Tracking variants duplicate pages, shared navigation dominates hashes, a canonical hint suppresses evidence, and a similarity score is treated as proof of sameness.',
    'content identity and change-evidence model',
    [
      outcome(
        'scraper-exact-byte-text-hashes',
        'Keep response-byte, decoded-source, normalized-text, extracted-record, and report hashes distinct and version their transformations.',
        'One SHA-256 value can represent every useful notion of page identity.'
      ),
      outcome(
        'scraper-boilerplate-boundary',
        'Separate repeated navigation, templates, legal text, and page-specific main content with site-tested rules and retained raw evidence.',
        'The longest text block is always the page main content.'
      ),
      outcome(
        'scraper-near-duplicate-nonclaim',
        'Use documented tokenization, fingerprints, thresholds, and labeled evaluation and report uncertain similarity without claiming semantic equality.',
        'A high similarity score proves two pages are duplicates.'
      ),
      outcome(
        'scraper-canonical-content-separation',
        'Treat rel=canonical, redirects, normalized URL keys, exact content, and near duplicates as separate signals that may disagree.',
        'The declared canonical URL is always authoritative and correct.'
      ),
      outcome(
        'scraper-change-classification',
        'Classify transport, metadata, template, content, accessibility, structured-data, and extraction-rule changes with prior and current evidence.',
        'Any changed source digest means stakeholder-visible content changed.'
      ),
    ]
  ),
  scraperModule(
    'scraper-indexing-canonical-hreflang',
    'Search Metadata, Indexing Directives, Canonical Signals, and Language Alternates',
    'The audit equates crawl permission with indexability, trusts one canonical tag, ignores HTTP robots fields, and reports hreflang without reciprocal or language checks.',
    'search discovery and indexability audit record',
    [
      outcome(
        'scraper-title-description-evidence',
        'Extract title and description candidates with cardinality, location, text quality, changed-case, and stakeholder-specific non-ranking claims.',
        'A title and meta description of a recommended character count prove good search performance.'
      ),
      outcome(
        'scraper-canonical-signal-reconciliation',
        'Reconcile redirects, HTTP canonical links, HTML canonical links, sitemap entries, internal links, and content identity without forcing agreement.',
        'One rel=canonical element settles duplicate selection.'
      ),
      outcome(
        'scraper-robots-meta-xheader',
        'Parse page-level robots meta and X-Robots-Tag directives by applicable user agent and separate crawling from indexing and serving.',
        'robots.txt nofollow and noindex have identical effects.'
      ),
      outcome(
        'scraper-hreflang-reciprocity',
        'Validate language-region syntax, self and reciprocal links, canonical compatibility, response status, and alternate-set completeness.',
        'Any alternate link with a lang attribute forms a valid hreflang cluster.'
      ),
      outcome(
        'scraper-indexability-decision',
        'Report status, content type, robots directives, canonical signals, authentication, rendered state, and search-engine-specific limits as evidence, not a guaranteed index outcome.',
        'A technically crawlable page is guaranteed to be indexed.'
      ),
    ]
  ),
  scraperModule(
    'scraper-structured-social-metadata',
    'JSON-LD, Structured Data, Open Graph, Social Metadata, and Non-Guarantees',
    'Malformed JSON-LD is silently accepted, remote contexts are fetched, structured claims conflict with visible content, and complete metadata is reported as a guaranteed rich result.',
    'structured and social metadata evidence report',
    [
      outcome(
        'scraper-jsonld-bounded-parse',
        'Locate JSON-LD scripts, enforce byte and depth limits, parse without fetching remote contexts, preserve duplicates, and surface malformed documents.',
        'JSON-LD parsing should automatically retrieve every referenced context.'
      ),
      outcome(
        'scraper-schema-context-type',
        'Validate context, graph, type, identifier, required properties, arrays, language, URLs, and supported vocabulary against a versioned policy.',
        'Valid JSON syntax means structured data has valid schema semantics.'
      ),
      outcome(
        'scraper-visible-content-consistency',
        'Compare structured claims with visible page evidence and flag missing, contradictory, hidden, stale, or unverifiable values.',
        'Structured data can truthfully describe content not available to users.'
      ),
      outcome(
        'scraper-social-metadata-contract',
        'Audit Open Graph and other selected social fields by declared platform contract, URL identity, image evidence, locale, and fallback behavior.',
        'One universal set of social tags is interpreted identically by every platform.'
      ),
      outcome(
        'scraper-rich-result-nonclaim',
        'Distinguish syntax, schema, visible-content, vendor-eligibility, policy, rendering, and live search evidence and avoid ranking or display guarantees.',
        'Passing a structured-data validator guarantees a rich result.'
      ),
    ]
  ),
  scraperModule(
    'scraper-accessibility-audit',
    'Accessible Names, Images, Language, Headings, Landmarks, and Human Review',
    'The tool counts alt attributes, assumes heading rank alone proves structure, ignores accessible names and language, and labels automated checks WCAG conformance.',
    'accessible page-quality audit with human-review handoff',
    [
      outcome(
        'scraper-page-language-title',
        'Check declared page and part language, document title presence and purpose, and conflicts with observed content while retaining human-review limits.',
        'Any nonempty lang and title values prove readability and identification.'
      ),
      outcome(
        'scraper-headings-landmarks',
        'Extract headings, labels, sections, and landmarks in document context and flag missing or misleading structure without enforcing a simplistic numeric ladder.',
        'Every skipped heading rank is automatically a WCAG failure.'
      ),
      outcome(
        'scraper-image-alternative-context',
        'Classify informative, decorative, functional, complex, grouped, linked, and text images and assess alternative evidence in context.',
        'Every image needs a nonempty alt attribute.'
      ),
      outcome(
        'scraper-link-control-name-evidence',
        'Collect link and control text, labels, ARIA naming sources, context, duplicate names, target purpose, and keyboard-relevant markup for review.',
        'Visible text alone always determines an element accessible name and purpose.'
      ),
      outcome(
        'scraper-automated-accessibility-limit',
        'Map each automated finding to testable evidence, confidence, false-positive risk, required manual checks, and no-conformance claim.',
        'Zero automated findings proves WCAG 2.2 conformance.',
        'metacognitive',
        'evaluate'
      ),
    ]
  ),
  scraperModule(
    'scraper-performance-resource-audit',
    'Timing, Resource Graphs, Transfer, Caching, and User-Performance Boundaries',
    'The audit calls server response time page speed, double-counts cached resources, ignores compression and render work, and reports one lab run as user experience.',
    'bounded page-resource and timing audit',
    [
      outcome(
        'scraper-response-timing-phases',
        'Separate queue, DNS, connect, TLS, request, first-byte, body, parse, render, and total timing with clock and instrumentation limits.',
        'One elapsed request duration explains page performance.'
      ),
      outcome(
        'scraper-resource-inventory-graph',
        'Classify document, stylesheet, script, image, font, media, API, iframe, preload, and redirect resources with initiator and origin.',
        'Counting HTML tags accurately counts every resource a browser loads.'
      ),
      outcome(
        'scraper-transfer-expansion-evidence',
        'Reconcile compressed transfer, decoded body, cached reuse, duplicate URLs, variant keys, and large-resource policy.',
        'Content-Length equals the user download and memory cost.'
      ),
      outcome(
        'scraper-cache-signal-audit',
        'Inspect Cache-Control, Age, validators, Vary, content identity, and browser observations without predicting every intermediary.',
        'A long max-age always means a resource was served from cache.'
      ),
      outcome(
        'scraper-user-performance-boundary',
        'Separate crawler timings, controlled browser lab evidence, field data, accessibility, network profile, device profile, and user experience claims.',
        'Fast crawler retrieval proves fast and usable pages for real users.'
      ),
    ]
  ),
  scraperModule(
    'scraper-dynamic-rendering-playwright',
    'Dynamic Rendering Need, Browser Contexts, Network Budgets, Readiness, and Cleanup',
    'Every page launches a browser, waits for networkidle forever, loads third-party resources, shares cookies, and extracts an unstable animation state.',
    'authorized bounded Playwright render adapter',
    [
      outcome(
        'scraper-render-necessity-decision',
        'Compare server HTML, embedded data, public API, progressive enhancement, and browser output and render only when the stakeholder evidence requires it.',
        'Modern websites always require a headless browser to scrape correctly.'
      ),
      outcome(
        'scraper-isolated-browser-context',
        'Use isolated nonpersistent contexts with explicit viewport, locale, timezone, permissions, service-worker, storage, and credential policy.',
        'One shared browser page is isolated enough for all crawl targets.'
      ),
      outcome(
        'scraper-browser-network-budget',
        'Route, observe, allow, block, and count document and subresource requests by type, origin, bytes, redirects, and owner policy.',
        'Blocking images alone makes browser crawling bounded and private.'
      ),
      outcome(
        'scraper-render-readiness-evidence',
        'Wait for a stakeholder-defined locator, state, response, or application signal under a deadline and record why the snapshot is ready.',
        'networkidle is a universal proof that dynamic content is complete.'
      ),
      outcome(
        'scraper-browser-cleanup',
        'Close pages, contexts, browser processes, downloads, traces, temporary storage, and pending routes on success, error, timeout, and cancellation.',
        'Closing the Python process is adequate browser cleanup evidence.'
      ),
    ]
  ),
  scraperModule(
    'scraper-blocks-anti-bot-boundary',
    'Blocks, CAPTCHAs, Rate Signals, Identity, and No-Evasion Boundary',
    'A 200 challenge page is parsed as content, the team rotates identities, solves CAPTCHAs, hides automation, and treats owner defenses as an engineering obstacle.',
    'block detection and owner-escalation policy',
    [
      outcome(
        'scraper-block-detection',
        'Detect denial, challenge, login, consent, interstitial, throttling, suspicious redirects, and semantic block pages from multiple signals.',
        'Only 401, 403, and 429 responses indicate blocking.'
      ),
      outcome(
        'scraper-captcha-stop',
        'Treat CAPTCHA and human-verification challenges as stop and owner-coordination signals rather than puzzles to automate around.',
        'Solving a CAPTCHA automatically is normal crawler reliability work.',
        'professional',
        'evaluate'
      ),
      outcome(
        'scraper-no-identity-evasion',
        'Use an honest stable identity and refuse proxy rotation, fingerprint spoofing, account cycling, stealth plugins, or other defense evasion.',
        'Rotating IPs and browser fingerprints is equivalent to retry backoff.',
        'professional',
        'evaluate'
      ),
      outcome(
        'scraper-owner-coordination',
        'Pause, preserve evidence, contact the owner, request an API or export, negotiate rate and fields, and record changed authorization.',
        'The crawler team can infer owner intent from public page behavior without contact.'
      ),
      outcome(
        'scraper-block-false-positive-review',
        'Test block classification against changed fixtures and require human review before deleting data, escalating, or resuming.',
        'Every page containing words like verify or denied is a confirmed anti-bot block.'
      ),
    ]
  ),
  scraperModule(
    'scraper-security-untrusted-content',
    'SSRF, DNS Rebinding, Redirects, Parser Limits, and Output Injection',
    'User-provided seeds reach local services, DNS changes after validation, redirects escape the allowlist, XML resolves entities, and spreadsheet formulas execute from exported cells.',
    'untrusted-input security boundary',
    [
      outcome(
        'scraper-ssrf-destination-policy',
        'Allowlist schemes and destinations, reject credentials and dangerous address classes, constrain ports, and separate user input from fetch authority.',
        'Blocking localhost strings prevents SSRF.'
      ),
      outcome(
        'scraper-dns-rebinding-defense',
        'Resolve and classify every connection destination at the correct time, bind policy to the connected peer where possible, and recheck changes.',
        'Validating the hostname once before queuing prevents DNS rebinding.'
      ),
      outcome(
        'scraper-redirect-destination-defense',
        'Apply full destination, credential, DNS, port, method, and budget policy on every redirect and browser subrequest.',
        'Redirects inherit the initial destination authorization.'
      ),
      outcome(
        'scraper-parser-resource-security',
        'Disable external entities and network resolution, retain parser protections, cap depth and text, reject archives, and avoid unsafe object deserialization.',
        'HTML and XML parsers cannot perform network or file access.'
      ),
      outcome(
        'scraper-output-injection-defense',
        'Encode HTML reports, neutralize spreadsheet formulas, validate URLs, escape logs, and keep untrusted content out of commands and templates.',
        'CSV quoting prevents formula execution and every downstream injection.'
      ),
    ]
  ),
  scraperModule(
    'scraper-export-accessible-reports',
    'CSV, JSON Lines, Schemas, Stable Output, Redaction, and Accessible Reports',
    'Columns reorder between runs, newlines corrupt CSV, None becomes ambiguous, JSON arrays cannot stream, secrets enter logs, and the visual report has no table semantics.',
    'versioned machine and accessible human report',
    [
      outcome(
        'scraper-csv-contract',
        'Define UTF-8, newline handling, dialect, ordered fields, quoting, formula policy, missing values, limits, and atomic replacement.',
        'Joining values with commas produces portable CSV.'
      ),
      outcome(
        'scraper-jsonl-schema',
        'Emit one bounded versioned JSON record per line with stable types, Unicode policy, provenance, and explicit invalid-record handling.',
        'A single giant JSON array is the most resilient streaming format.'
      ),
      outcome(
        'scraper-stable-report-order',
        'Sort by documented semantic keys and stable tie-breakers so concurrency, retries, and resume do not change comparable output.',
        'Filesystem or task completion order is stable enough for reports.'
      ),
      outcome(
        'scraper-accessible-report',
        'Provide headings, summaries, table headers, scopes, captions, filters, text alternatives, keyboard access, announced updates, reflow, and non-color status.',
        'A colorful sortable table is automatically an accessible report.'
      ),
      outcome(
        'scraper-provenance-redaction',
        'Retain decision evidence while removing secrets, unnecessary personal data, query tokens, cookies, source excerpts, and unsafe raw markup by policy.',
        'Complete provenance requires storing every header and source fragment forever.'
      ),
    ]
  ),
  scraperModule(
    'scraper-testing-fixtures-faults',
    'HTML Fixtures, Fake Transports, Local Servers, Properties, Faults, and Mutation',
    'Tests hit live websites, fixtures contain one perfect page, retries never fail midway, URL properties are untested, and snapshots pass after a broken selector returns nothing.',
    'layered deterministic crawler verification suite',
    [
      outcome(
        'scraper-html-fixture-design',
        'Build minimal, representative, malformed, Unicode, oversized, dynamic, accessibility, and changed-site fixtures with exact purpose labels.',
        'Saving one production page is a complete parser test corpus.'
      ),
      outcome(
        'scraper-fake-transport-local-server',
        'Use fake transports for deterministic units and a controlled local server for redirect, streaming, timeout, encoding, cache, and connection evidence.',
        'Live public endpoints are the most realistic and reliable automated tests.'
      ),
      outcome(
        'scraper-url-policy-properties',
        'Test URL resolution, idempotent canonical keys, scope monotonicity, fragment behavior, query policies, and adversarial address forms as properties.',
        'A list of ordinary absolute URLs covers URL policy risk.'
      ),
      outcome(
        'scraper-fault-injection',
        'Inject DNS, connect, TLS, redirect, truncated body, corrupt encoding, parser, queue, disk, cancellation, browser, and checkpoint failures.',
        'HTTP status fixtures alone cover crawler failure behavior.'
      ),
      outcome(
        'scraper-mutation-evidence',
        'Deliberately break selectors, budgets, visited timing, redirect checks, robots precedence, redaction, output escaping, and cleanup and prove tests fail.',
        'High line coverage proves crawler tests detect meaningful defects.'
      ),
    ]
  ),
  scraperModule(
    'scraper-scrapy-scale-observability',
    'Scrapy Architecture, Scheduler, Middleware, AutoThrottle, and Observability',
    'A hand-built crawler grows hidden hooks, middleware order changes behavior, duplicate filters lose identity, AutoThrottle is treated as permission, and metrics cannot reconstruct failures.',
    'Scrapy 2.17 scale and observability transfer plan',
    [
      outcome(
        'scraper-scrapy-component-flow',
        'Trace engine, scheduler, downloader, spider, item pipeline, signals, extensions, requests, responses, failures, and ownership in Scrapy.',
        'A Scrapy spider directly downloads, parses, stores, and retries every page.'
      ),
      outcome(
        'scraper-scheduler-dupefilter-contract',
        'Map canonical request identity, priorities, persistence, depth, retries, duplicate filtering, and resume semantics into scheduler evidence.',
        'Scrapy duplicate filtering automatically matches every project URL policy.'
      ),
      outcome(
        'scraper-middleware-order',
        'Reason about request and response traversal order, built-in middleware, exceptions, short-circuiting, and settings merge before customization.',
        'Downloader middleware order is irrelevant when every component is enabled.'
      ),
      outcome(
        'scraper-autothrottle-boundary',
        'Configure latency target, concurrency, delay bounds, errors, robots and owner limits and treat AutoThrottle as load control, not authorization.',
        'AutoThrottle alone guarantees a polite and authorized crawl.'
      ),
      outcome(
        'scraper-crawl-observability',
        'Correlate crawl, request, response, page, extraction, queue, retry, block, privacy, output, and recovery events with bounded labels and redaction.',
        'Aggregate request and item counts are sufficient production diagnostics.'
      ),
    ]
  ),
  scraperModule(
    'scraper-packaging-scheduling-operations',
    'CLI, Configuration, Packaging, Scheduling, Overlap, Logs, and Recovery',
    'The script embeds targets and secrets, has ambiguous exit status, runs overlapping cron jobs, writes partial reports, logs content forever, and cannot restore a prior release.',
    'installable and operable crawler release candidate',
    [
      outcome(
        'scraper-cli-configuration',
        'Design typed CLI and configuration precedence for targets, policy, budgets, output, dry-run, checkpoint, resume, revision, and secret references.',
        'Environment variables alone form a clear validated crawler interface.'
      ),
      outcome(
        'scraper-package-entrypoint',
        'Build an import-safe package with declared dependencies, console entry point, resources, metadata, license, and reproducible artifact identity.',
        'A directly executed script is equivalent to an installable package.'
      ),
      outcome(
        'scraper-clean-install-smoke',
        'Install the immutable artifact into a clean environment and run help, fixture crawl, controlled local crawl, output validation, and clean shutdown.',
        'A wheel that builds successfully is proven runnable.'
      ),
      outcome(
        'scraper-scheduler-overlap-lock',
        'Define scheduler identity, timezone, missed runs, overlap, distributed lock, lease expiry, idempotency, signal shutdown, and stale-job recovery.',
        'Cron guarantees exactly one crawler run at the intended local time.'
      ),
      outcome(
        'scraper-operations-retention-recovery',
        'Set log, trace, checkpoint, raw-source, report, personal-data, backup, deletion, incident, restore, and owner policies and rehearse recovery.',
        'Keeping every crawl artifact indefinitely makes operations safer.'
      ),
    ]
  ),
  scraperModule(
    'scraper-release-recovery-defense',
    'Release Gates, Capacity, Compliance, Migration, Rollback, and Defense',
    'The candidate passes fixture tests but lacks owner signoff, load evidence, privacy review, parser migration proof, rollback rehearsal, residual-risk ownership, and support documentation.',
    'production crawler evidence and recovery defense',
    [
      outcome(
        'scraper-correctness-reconciliation',
        'Reconcile authorization, scope, robots, HTTP, URL, parse, extraction, crawl graph, metadata, accessibility, output, and changed-case evidence.',
        'Each component passing separately proves the end-to-end crawler result.'
      ),
      outcome(
        'scraper-capacity-defense',
        'Measure pages, resources, bytes, parse time, memory, queue, concurrency, browser load, output, cancellation, and recovery at representative scale.',
        'A high requests-per-second benchmark proves safe production capacity.'
      ),
      outcome(
        'scraper-compliance-signoff',
        'Obtain accountable owner, privacy, security, accessibility, data, legal-review, operations, and target-site approvals with expiry and revocation paths.',
        'A developer can self-approve crawler policy because implementation is technical.'
      ),
      outcome(
        'scraper-release-migration-gates',
        'Gate immutable artifacts, dependency and parser changes, schemas, checkpoints, clean installs, canaries, monitoring, stop controls, rollback, and restore.',
        'Deploying a new parser or canonicalization rule needs no data migration plan.'
      ),
      outcome(
        'scraper-production-defense',
        'Defend the system under an unfamiliar site, block, malformed page, privacy request, overload, partial failure, browser fault, and owner revocation and state residual risk.',
        'A polished dashboard and completed crawl are sufficient production defense.',
        'metacognitive',
        'create'
      ),
    ]
  ),
];

function source(title, url, version, scope, authority = 'official-docs') {
  return { title, authority, url, version, reviewedAt: REVIEWED_AT, scope };
}

const sources = [
  source(
    'Python 3.14.6 Documentation',
    'https://docs.python.org/3.14/',
    'Python 3.14.6 current 2026-07-14',
    'Language, typing, dataclasses, collections, exceptions, testing, profiling, packaging boundaries, and platform behavior.'
  ),
  source(
    'Python urllib.parse Documentation',
    'https://docs.python.org/3.14/library/urllib.parse.html',
    'Python 3.14.6 current 2026-07-14',
    'URL parsing, joining, defragmenting, quoting, normalization limits, and security cautions.'
  ),
  source(
    'Python urllib.robotparser Documentation',
    'https://docs.python.org/3.14/library/urllib.robotparser.html',
    'Python 3.14.6 current 2026-07-14',
    'RobotFileParser behavior, can_fetch, modification time, extensions, and sitemap discovery.'
  ),
  source(
    'Python html.parser Documentation',
    'https://docs.python.org/3.14/library/html.parser.html',
    'Python 3.14.6 current 2026-07-14',
    'Streaming HTML token callbacks, invalid markup, scripting state, entity conversion, and non-browser tree limits.'
  ),
  source(
    'Python asyncio Task Groups Documentation',
    'https://docs.python.org/3.14/library/asyncio-task.html#task-groups',
    'Python 3.14.6 current 2026-07-14',
    'Structured concurrency, TaskGroup failure semantics, cancellation, cleanup, timeouts, and task ownership.'
  ),
  source(
    'Python csv Documentation',
    'https://docs.python.org/3.14/library/csv.html',
    'Python 3.14.6 current 2026-07-14',
    'Dialects, newline handling, ordered fields, quoting, field limits, Unicode, and irreversible None behavior.'
  ),
  source(
    'RFC 9309 Robots Exclusion Protocol',
    'https://www.rfc-editor.org/rfc/rfc9309.html',
    'IETF Standards Track RFC 9309 reviewed 2026-07-14',
    'Product tokens, group and rule matching, percent encoding, access method, caching, and unavailable or unreachable handling.',
    'standard'
  ),
  source(
    'RFC 9110 HTTP Semantics',
    'https://www.rfc-editor.org/rfc/rfc9110.html',
    'IETF Standards Track RFC 9110 reviewed 2026-07-14',
    'Methods, status, fields, representations, validators, redirects, authentication, and semantics reused from the prerequisite HTTP client course.',
    'standard'
  ),
  source(
    'RFC 9111 HTTP Caching',
    'https://www.rfc-editor.org/rfc/rfc9111.html',
    'IETF Standards Track RFC 9111 reviewed 2026-07-14',
    'Freshness, validators, Vary, Age, invalidation, and cache evidence.',
    'standard'
  ),
  source(
    'WHATWG HTML Living Standard Parsing',
    'https://html.spec.whatwg.org/multipage/parsing.html',
    'Living Standard updated 2026-07-13 and reviewed 2026-07-14',
    'Byte streams, encodings, tokenization, parse errors, tree construction, scripting state, templates, and malformed markup.',
    'standard'
  ),
  source(
    'WHATWG URL Living Standard',
    'https://url.spec.whatwg.org/',
    'Living Standard current 2026-07-14',
    'URL parsing, serialization, hosts, origins, percent encoding, IDNA, and browser URL behavior.',
    'standard'
  ),
  source(
    'Selectors Level 4',
    'https://www.w3.org/TR/selectors-4/',
    'W3C specification current 2026-07-14',
    'Selector syntax, specificity concepts, combinators, attributes, pseudo-classes, scoping, and implementation boundaries.',
    'standard'
  ),
  source(
    'Sitemaps XML Protocol',
    'https://www.sitemaps.org/protocol.html',
    'Sitemaps protocol reviewed 2026-07-14',
    'UTF-8 XML, escaping, host and location constraints, indexes, URL and byte limits, and hint semantics.'
  ),
  source(
    'Beautiful Soup 4.15.0 Documentation',
    'https://www.crummy.com/software/BeautifulSoup/bs4/doc/',
    'Beautiful Soup 4.15.0 released 2026-06-07 and reviewed 2026-07-14',
    'Parse trees, parser selection and differences, navigation, CSS selection, text, attributes, encoding, memory, and diagnostics.'
  ),
  source(
    'lxml 6.1.1 Documentation and Release',
    'https://lxml.de/',
    'lxml 6.1.1 stable released 2026-05-18 and reviewed 2026-07-14',
    'HTML and XML parsing, parser configuration, network and entity restrictions, streaming, XPath, CSS selection, security fixes, and native dependency boundaries.'
  ),
  source(
    'HTTPX 0.28.1 Documentation and Release',
    'https://www.python-httpx.org/',
    'HTTPX 0.28.1 stable reviewed 2026-07-14; 1.0 dev releases excluded',
    'Sync and async clients, connection pooling, timeouts, streaming, redirects, transports, testing, and resource ownership.'
  ),
  source(
    'Scrapy 2.17.0 Documentation',
    'https://docs.scrapy.org/en/2.17/',
    'Scrapy 2.17.0 released 2026-07-07 and reviewed 2026-07-14',
    'Engine, scheduler, downloader, spiders, pipelines, middleware, robots, AutoThrottle, feeds, persistence, signals, statistics, and operations.'
  ),
  source(
    'Playwright for Python 1.61.0 Documentation',
    'https://playwright.dev/python/docs/intro',
    'Playwright 1.61.0 released 2026-06-29 and reviewed 2026-07-14',
    'Browser installation, isolated contexts, pages, locators, network routing, events, timeouts, traces, cleanup, and browser-version coupling.'
  ),
  source(
    'Google Search Crawling and Indexing Documentation',
    'https://developers.google.com/search/docs/crawling-indexing',
    'Google Search Central current 2026-07-14',
    'Robots, sitemaps, URL structure, canonicals, JavaScript, status, metadata, indexing controls, and vendor-specific limitations.'
  ),
  source(
    'Google Structured Data Documentation',
    'https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data',
    'Google Search Central current 2026-07-14',
    'JSON-LD, visible-content consistency, eligibility, validation, policies, and no-rich-result guarantees.'
  ),
  source(
    'WCAG 2.2 Recommendation',
    'https://www.w3.org/TR/WCAG22/',
    'W3C Recommendation current 2026-07-14',
    'Text alternatives, language, headings, labels, names, relationships, keyboard, reflow, targets, status, testing, and conformance limits.',
    'standard'
  ),
  source(
    'WAI Images Tutorial',
    'https://www.w3.org/WAI/tutorials/images/',
    'W3C WAI tutorial current 2026-07-14',
    'Informative, decorative, functional, linked, complex, grouped, and text-image alternative decisions.'
  ),
  source(
    'OWASP SSRF Prevention Cheat Sheet',
    'https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html',
    'OWASP guidance current 2026-07-14',
    'Destination allowlists, URL and IP validation, DNS pinning and monitoring, network controls, redirects, and layered SSRF defense.'
  ),
  source(
    'ACM Code of Ethics and Professional Conduct',
    'https://www.acm.org/code-of-ethics',
    'ACM Code reviewed 2026-07-14',
    'Avoiding harm, honesty, privacy, work ownership, rules, authorized access, security, review, and professional responsibility.',
    'curriculum-framework'
  ),
  source(
    'NIST Privacy Framework',
    'https://www.nist.gov/privacy-framework',
    'NIST Privacy Framework current 2026-07-14',
    'Privacy risk identification, governance, data processing, control, communication, protection, and lifecycle evidence.',
    'curriculum-framework'
  ),
  source(
    'Python Packaging User Guide',
    'https://packaging.python.org/en/latest/',
    'PyPA guide current 2026-07-14',
    'Project layout, metadata, dependencies, console entry points, build artifacts, clean installation, and distribution.'
  ),
  source(
    'Git 2.55 Documentation',
    'https://git-scm.com/docs',
    'Git 2.55 current 2026-07-14',
    'Repository state, revisions, diffs, tags, artifact identity, rollback, and recovery evidence.'
  ),
  source(
    'ACM IEEE AAAI CS2023 Curriculum',
    'https://csed.acm.org/',
    'CS2023 reviewed 2026-07-14',
    'Software development, algorithms, networking, security, data management, accessibility, ethics, testing, and professional outcomes.',
    'curriculum-framework'
  ),
];

export const buildWebScraperPythonConfig = finalizeCourse(
  {
    id: 'build-web-scraper-python',
    competencyIdPrefix: 'scraper-',
    title: 'Build and Ship an Authorized Web Crawler and Accessible Site Auditor with Python 3.14',
    version: '2026.07',
    audience: {
      description:
        'Python, HTTP, web, data-structure, and Git learners who need to design, build, test, operate, and defend an authorized bounded crawler and accessible site-quality auditor instead of copy a brittle requests-and-selector script.',
      entryKnowledge: [
        'Write and test Python functions and classes; use dataclasses, collections, exceptions, iterators, async concepts, type hints, JSON-shaped data, packages, command-line tools, and Git repository workflows.',
        'Apply HTTP method, status, representation, redirect, cache, timeout, retry, connection, authentication, SSRF, test-transport, and observability evidence from HTTP Clients in Python.',
        'Represent queues, sets, maps, graphs, traversal state, priorities, invariants, and asymptotic costs at Python Data Structures and Algorithms course depth.',
        'Read semantic HTML, CSS selectors, accessible page structure, responsive behavior, forms, media, metadata, and browser developer evidence at Responsive Web Design course depth.',
      ],
      deviceConstraints: [
        'Modern browser; instant Python practice uses deterministic pure URL, robots, response, parser, selector, crawl-state, metadata, accessibility, and report models with original fixed in-memory fixtures in an isolated Pyodide 3.14 worker. Real DNS, sockets, TLS, HTTPX, Beautiful Soup, lxml, Scrapy, Playwright, browsers, files, credentials, target sites, load, scheduling, privacy review, and production effects remain explicit controlled transfer gates.',
      ],
      accessibilityAssumptions: [
        'Authorization, URL decisions, robots results, page and crawl graphs, parser evidence, extracted fields, indexing and accessibility findings, resource budgets, failures, and reports have structured text, explicit labels, keyboard operation, announced status, large targets, reduced motion, reflow, and no color-only meaning.',
      ],
    },
    scope: {
      includes: [
        'Python 3.14.6; authorization, ethics, privacy, and legal-review routing; reproducible environments; bounded crawl scope; URL resolution and conservative identity; RFC 9309 robots and sitemaps; HTTPX retrieval and prerequisite HTTP reuse; response bytes and encoding; WHATWG-informed HTML parsing and parser differentials; Beautiful Soup 4.15 and lxml 6.1; CSS selectors and typed extraction; provenance; link discovery; crawl graphs and frontier state; URL traps; per-origin politeness; structured asyncio concurrency; authenticated-session boundaries; incremental validators and checkpoints; exact and near duplicate evidence; search indexing, canonical, hreflang, JSON-LD, and social metadata; WCAG-informed accessibility auditing with human review; resource and performance evidence; Playwright 1.61 authorized dynamic rendering; block and CAPTCHA stop policy with no evasion; SSRF and untrusted-content defense; CSV, JSON Lines, and accessible reports; deterministic fixtures, local servers, property and mutation evidence; Scrapy 2.17 architecture and AutoThrottle; packaging, scheduling, operations, migration, rollback, recovery, and production defense',
        'Runnable deterministic pure-Python evidence using original fixed fixtures plus explicit DNS, network, HTTP library, parser, filesystem, browser, target-owner, accessibility, privacy, security, legal-review, load, and production transfer gates',
        'Five cumulative authentic crawler and site-audit deliveries and a performance-based unfamiliar-site defense examination',
      ],
      excludes: [
        'Copied scraping tutorials, unauthorized targets, defense or CAPTCHA evasion, proxy or identity rotation, fingerprint spoofing, account cycling, credential theft, destructive methods, personal-data hoarding, ranking guarantees, automated WCAG-conformance claims, live public-site tests in routine grading, arbitrary host execution, or production release based only on a successful crawl.',
      ],
      nextCourses: ['build-web-scraper-typescript', 'build-web-scraper-go', 'personal-project-1'],
    },
    sources,
    sharedRequirements: [
      'Every activity retrieves stakeholder outcome, authorization, revision, Python and dependency versions, seed and origin, URL and scope policy, robots decision, response and parser identity, extraction provenance, crawl state, privacy and accessibility requirement, bounded work, changed-case test, failure, recovery, and explicit browser-versus-controlled-system limits before adding one crawler boundary.',
      'Browser Python uses original fixed in-memory fixtures and deterministic pure functions. It does not open sockets, resolve DNS, contact sites, import or claim native HTTPX, Beautiful Soup, lxml, Scrapy, or Playwright behavior, read or write host files, use credentials, launch browsers, schedule host jobs, or claim live accessibility, privacy, legal, load, or production behavior; those require controlled evidence.',
      'Passing work requires stable scenario and artifact identity, prediction, intermediate URL, response, tree, field, graph, or state evidence, exact observable output, a changed and rejected case, a test that detects a deliberate defect, accessible stakeholder evidence, and a named owner for remaining risk.',
    ],
    modules,
    projects: [
      project(
        'scraper-authorized-page-extractor',
        'Authorized Provenance-Preserving Page Extractor',
        'scraper-typed-records-provenance',
        'A small nonprofit website owner and accessibility editor',
        'They need a reproducible single-page extractor that proves authorization, bounded retrieval, encoding and parser choice, selector cardinality, typed missingness, field provenance, rejection, and explicit network and legal-review limits.',
        [
          'scraper-source-authorization',
          'scraper-response-admission',
          'scraper-parser-selection',
          'scraper-selector-cardinality',
          'scraper-field-provenance',
        ]
      ),
      project(
        'scraper-polite-site-crawler',
        'Polite Bounded Site Crawler',
        'scraper-async-structured-concurrency',
        'A university documentation platform owner',
        'They need RFC 9309 and sitemap handling, conservative URL identity, graph and frontier evidence, trap prevention, per-origin spacing, retry control, structured concurrency, cancellation, and a reliable stop contact.',
        [
          'scraper-robots-group-matching',
          'scraper-canonical-url-key',
          'scraper-visited-at-schedule',
          'scraper-url-space-budget-defense',
          'scraper-cancellation-cleanup',
        ]
      ),
      project(
        'scraper-accessible-site-auditor',
        'Incremental Accessible Search and Site-Quality Auditor',
        'scraper-accessibility-audit',
        'A public-service content, search, localization, and accessibility team',
        'They need repeatable canonical, indexing, hreflang, structured-data, image, heading, language, accessible-name, and changed-content evidence with clear automated limits and human-review handoff.',
        [
          'scraper-change-classification',
          'scraper-canonical-signal-reconciliation',
          'scraper-robots-meta-xheader',
          'scraper-visible-content-consistency',
          'scraper-automated-accessibility-limit',
        ]
      ),
      project(
        'scraper-secure-dynamic-reporting-system',
        'Secure Dynamic Crawl, Export, and Verification System',
        'scraper-testing-fixtures-faults',
        'An internal authorized product-quality engineering group',
        'They need rendering only when necessary, isolated Playwright contexts, block stop policy, SSRF and output-injection defense, versioned accessible reports, deterministic local-server faults, properties, and mutation evidence.',
        [
          'scraper-render-necessity-decision',
          'scraper-captcha-stop',
          'scraper-ssrf-destination-policy',
          'scraper-accessible-report',
          'scraper-mutation-evidence',
        ]
      ),
      project(
        'scraper-production-defense',
        'Crawler Production, Recovery, and Residual-Risk Defense',
        'scraper-release-recovery-defense',
        'A joint target-owner, data, privacy, accessibility, security, legal-review, search, operations, and support board',
        'The board needs reconciled authorization and technical evidence, closed critical findings, representative capacity, immutable packages, scheduler and retention controls, parser and schema migration, owner pause, rollback and restore rehearsals, and explicit residual-risk acceptance.',
        [
          'scraper-crawl-observability',
          'scraper-clean-install-smoke',
          'scraper-operations-retention-recovery',
          'scraper-compliance-signoff',
          'scraper-production-defense',
        ]
      ),
    ],
    examContext:
      'Unfamiliar authorized site cases spanning stakeholder outcome, repository and dependency evidence, ethics, privacy and legal-review routing, scope, URL identity, robots and sitemaps, HTTP retrieval, bytes and encoding, HTML parser models, selectors, typed provenance, link discovery, crawl graphs, traps, politeness, structured concurrency, authentication, incremental state, duplicate and change evidence, search metadata, JSON-LD, accessibility, resource performance, Playwright rendering, blocks and no-evasion, SSRF, safe reports, fixtures and fault injection, Scrapy scaling, packaging, scheduling, operations, migration, rollback, recovery, support, and residual-risk defense with explicit browser and controlled production boundaries.',
    minimumQuestionBankSize: 950,
  },
  {
    researchedAt: RESEARCHED_AT,
    prerequisiteCourseIds: [
      'python-basics',
      'python-dsa',
      'http-clients-python',
      'responsive-web-design',
      'git-basics',
    ],
  }
);

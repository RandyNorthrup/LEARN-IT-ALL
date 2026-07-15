import { finalizeCourse, project, skill } from './course-config-helpers.mjs';

const REVIEWED_AT = '2026-07-15';
const RESEARCHED_AT = '2026-07-15T08:00:00.000Z';

function outcome(id, statement, misconception, knowledgeType = 'procedural', level = 'apply') {
  if (!misconception) throw new Error(`Missing misconception for Go Pokedex competency ${id}`);
  return skill(id, statement, misconception, knowledgeType, level);
}

function pokegoModule(id, title, context, artifact, skillSpecs) {
  const skills = skillSpecs.map((entry) => outcome(...entry));
  return {
    id,
    title,
    context,
    artifact,
    objectives: skills.slice(0, 3).map((entry) => entry[1]),
    skills,
    contexts: {
      theory: `${context} Predict the user decision, Go ownership, command state, API contract, resource budget, failure, and observable evidence before reading the governing source.`,
      workshop: `A regional field-research team incrementally builds ${artifact} from original fixed PokéAPI fixtures while retaining prior Go, HTTP, Git, quality-gate, accessibility, security, testing, cancellation, and recovery requirements.`,
      debug: `A preserved Go Pokedex run contains one plausible command, parsing, URL, JSON, client, cache, ownership, goroutine, cancellation, persistence, security, test, packaging, or release defect; locate the first failed invariant before editing.`,
      lab: `An independent conservation group receives a different region, command sequence, API fixture, cache age, concurrency budget, accessibility need, platform, and injected failure and transfers ${title.toLowerCase()} into a changed ${artifact}.`,
      review: `A delayed ranger review reconstructs ${title.toLowerCase()} from revision, command, arguments, request identity, response fixture, state transition, cache decision, goroutine ownership, output, failure, cleanup, and recovery evidence.`,
      quiz: `A release reviewer compares near-miss Go decisions for ${title.toLowerCase()} and accepts only runnable changed-case evidence, explicit non-claims, and named browser, compiler, race, network, filesystem, terminal, load, accessibility, and production transfer gates.`,
    },
  };
}

const modules = [
  pokegoModule(
    'pokedex-go-outcomes-repl-contract',
    'Field-Guide Outcomes, Command Language, and REPL Contract',
    'A ranger team asks for a Pokedex but has not defined who uses it, which decisions it supports, what commands exist, how sessions end, or what evidence makes the command useful.',
    'bounded field-guide product and REPL charter',
    [
      [
        'pokedex-go-user-decision',
        'Define learner, field user, decision, command sequence, accepted latency, failure consequence, and observable value before coding.',
        'Printing one Pokemon record proves the product is useful.',
        'strategic',
        'create',
      ],
      [
        'pokedex-go-command-language',
        'Specify command names, argument grammar, whitespace policy, help text, aliases, unknown-command behavior, and stable output contracts.',
        'A REPL can infer any command grammar from arbitrary user text.',
      ],
      [
        'pokedex-go-session-lifecycle',
        'Model start, prompt, read, parse, dispatch, result, continue, EOF, quit, cancellation, and cleanup as explicit session states.',
        'A for loop alone defines a complete REPL lifecycle.',
        'conceptual',
        'analyze',
      ],
      [
        'pokedex-go-accessible-terminal-contract',
        'Keep prompts, progress, errors, and results understandable without color, animation, pointer input, or fragile terminal width.',
        'Terminal software is automatically accessible because it contains only text.',
        'professional',
        'evaluate',
      ],
      [
        'pokedex-go-acceptance-evidence',
        'Define runnable happy, changed, invalid, EOF, timeout, cancellation, and recovery cases plus exact stakeholder evidence.',
        'A screenshot of a successful command is sufficient acceptance evidence.',
        'metacognitive',
        'create',
      ],
    ]
  ),
  pokegoModule(
    'pokedex-go-repository-toolchain-baseline',
    'Repository Baseline, Go 1.26 Toolchain, Modules, and Reproduction',
    'The prototype runs from an unknown revision, uses an unrecorded Go toolchain, has no module identity, relies on warm caches, and cannot be rebuilt from a clean checkout.',
    'reproducible Go Pokedex repository baseline',
    [
      [
        'pokedex-go-repository-state',
        'Inspect revision, branch, worktree, ignored files, configuration, tests, fixtures, secrets, licenses, and recovery anchor before editing.',
        'A small learning repository does not need baseline or rollback evidence.',
      ],
      [
        'pokedex-go-toolchain-contract',
        'Record Go 1.26.5, GOOS, GOARCH, GOTOOLCHAIN, module mode, build tags, and supported platform matrix.',
        'All Go 1.x releases compile and run a project identically.',
      ],
      [
        'pokedex-go-module-layout',
        'Choose module path, command and internal package boundaries, dependency direction, and import visibility before growth.',
        'A package per file always creates clean Go architecture.',
        'strategic',
        'create',
      ],
      [
        'pokedex-go-dependency-provenance',
        'Prefer the standard library, pin justified modules, verify sums and licenses, scan vulnerabilities, and record upgrade ownership.',
        'go.sum proves every dependency is safe and intentionally chosen.',
      ],
      [
        'pokedex-go-clean-reproduction',
        'Run format, test, vet, race-capable tests, build, and a fixture smoke command from a clean compatible environment.',
        'A binary built from a dirty developer cache is reproducible evidence.',
      ],
    ]
  ),
  pokegoModule(
    'pokedex-go-input-tokenization-dispatch',
    'Input Reading, Tokenization, Command Registry, and Dispatch',
    'The loop assumes every read succeeds, splits arguments inconsistently, indexes missing tokens, hard-codes a growing switch, and cannot test dispatch without real stdin and stdout.',
    'deterministic command parser and injected dispatcher',
    [
      [
        'pokedex-go-reader-choice',
        'Choose bufio.Reader or Scanner from line-size, token, error, cancellation, and testability requirements and configure any explicit limit.',
        'Scanner and Reader have identical limits and error behavior.',
      ],
      [
        'pokedex-go-line-token-policy',
        'Normalize line endings and whitespace under a documented grammar without corrupting names or silently accepting extra arguments.',
        'strings.Split on one space is a complete shell-like parser.',
      ],
      [
        'pokedex-go-argument-cardinality',
        'Validate required, optional, repeated, missing, and extra arguments before handler access and return actionable usage.',
        'Handlers may index argument slices because users will follow help text.',
      ],
      [
        'pokedex-go-command-registry',
        'Represent command name, purpose, usage, aliases, and handler in an injected registry with deterministic help order.',
        'Replacing a switch with a map automatically makes dispatch extensible and deterministic.',
      ],
      [
        'pokedex-go-dispatch-evidence',
        'Test blank, known, aliased, unknown, malformed, EOF, and read-error cases with injected streams and exact outputs.',
        'Testing handlers directly proves stdin parsing and dispatch behavior.',
      ],
    ]
  ),
  pokegoModule(
    'pokedex-go-help-output-accessibility',
    'Help, Result Formatting, Streams, and Terminal Accessibility',
    'Commands mix data and prose, errors appear on stdout, help order changes across runs, long records become unreadable, and progress depends on color and cursor motion.',
    'screen-reader-friendly deterministic terminal presenter',
    [
      [
        'pokedex-go-help-information',
        'Generate concise overview and per-command help from one registry while showing syntax, examples, defaults, and exit paths.',
        'Listing command names alone teaches users how to operate the program.',
      ],
      [
        'pokedex-go-stdout-stderr-status',
        'Assign data, diagnostics, progress, and usage to deliberate streams and return stable command outcomes or exit statuses.',
        'All terminal text belongs on stdout because users see both streams together.',
      ],
      [
        'pokedex-go-deterministic-formatting',
        'Sort maps and sets, label units, preserve stable field order, and distinguish absent, zero, empty, and unknown values.',
        'Go map iteration is stable enough for user output and tests.',
      ],
      [
        'pokedex-go-width-motion-color',
        'Use plain structured text by default, bound line width, avoid color-only meaning, and honor reduced or absent motion.',
        'ANSI color and spinners always improve terminal usability.',
      ],
      [
        'pokedex-go-output-golden-evidence',
        'Combine focused formatter assertions with changed-width, no-color, Unicode, empty, and snapshot-review evidence.',
        'A golden file should be accepted whenever the diff looks small.',
      ],
    ]
  ),
  pokegoModule(
    'pokedex-go-pokeapi-resource-contract',
    'PokéAPI Resource Identity, URL Construction, Pagination, and Fair Use',
    'The client concatenates user input into arbitrary URLs, treats list and detail resources alike, ignores pagination links, and sends repeated requests despite the API fair-use cache request.',
    'fixed-origin PokéAPI resource and fair-use policy',
    [
      [
        'pokedex-go-fixed-origin-policy',
        'Keep scheme and authority fixed to the approved PokéAPI origin and map commands only to enumerated resource paths.',
        'Valid URL syntax makes any user-supplied destination safe.',
      ],
      [
        'pokedex-go-resource-identity',
        'Distinguish resource type, numeric ID, canonical lowercase name, list query, and response self URL without unsafe equivalence.',
        'A displayed name, user input, URL, and resource identity are always interchangeable.',
      ],
      [
        'pokedex-go-path-query-encoding',
        'Construct path segments and limit or offset queries with net/url while rejecting slash, control, and oversized input.',
        'String concatenation is safe when the base URL is constant.',
      ],
      [
        'pokedex-go-pagination-contract',
        'Model count, next, previous, and results while treating absent links as boundaries and validating configured page sizes.',
        'A list endpoint always returns all Pokemon in one response.',
      ],
      [
        'pokedex-go-fair-use-policy',
        'Cache every requested resource, limit frequency and concurrency, identify the client responsibly, and avoid unsupported availability claims.',
        'No published rate limit means unlimited parallel requests are acceptable.',
        'professional',
        'evaluate',
      ],
    ]
  ),
  pokegoModule(
    'pokedex-go-json-domain-boundary',
    'JSON Decoding, DTOs, Domain Types, Unknown Fields, and Schema Drift',
    'The program decodes into map[string]any, asserts nested types, confuses absent with zero, trusts response identity, and breaks when harmless unknown fields appear.',
    'typed PokéAPI DTO-to-domain admission boundary',
    [
      [
        'pokedex-go-response-dto',
        'Define narrow transport structs with exact JSON tags, nested shapes, optionality, and only fields needed by the command.',
        'Mirroring the entire public response creates a safer and more stable client.',
      ],
      [
        'pokedex-go-decoder-policy',
        'Choose unknown-field tolerance deliberately, bound the body before decoding, reject trailing JSON, and preserve decode causes.',
        'json.Decoder.Decode once guarantees exactly one valid JSON document.',
      ],
      [
        'pokedex-go-domain-conversion',
        'Validate ID, name, dimensions, stats, types, abilities, URLs, and collection bounds before constructing domain values.',
        'Successful JSON unmarshalling proves domain invariants.',
      ],
      [
        'pokedex-go-absence-zero-empty',
        'Represent omitted, null, zero, empty, and unknown states according to the endpoint contract instead of collapsing them.',
        'Go zero values always have the same meaning as an absent API field.',
      ],
      [
        'pokedex-go-schema-fixtures',
        'Maintain minimal valid, full, missing, wrong-type, out-of-range, trailing, extra-field, and changed-version fixtures.',
        'One copied production response is an adequate schema test set.',
      ],
    ]
  ),
  pokegoModule(
    'pokedex-go-http-client-lifecycle',
    'HTTP Client Ownership, Context, Status, Body Limits, and Cleanup',
    'Each command creates a new client, uses context.Background inside dependencies, ignores non-2xx status, decodes unbounded bodies, and forgets to close responses.',
    'reusable bounded context-aware PokéAPI client',
    [
      [
        'pokedex-go-client-reuse',
        'Inject and reuse one configured http.Client or narrow transport port because transports retain connection state and support concurrent use.',
        'Creating a fresh http.Client per request is safer and frees every connection immediately.',
      ],
      [
        'pokedex-go-request-context',
        'Create requests with caller-owned context and derive request deadlines without hiding cancellation behind Background.',
        'Client.Timeout makes request context unnecessary.',
      ],
      [
        'pokedex-go-status-admission',
        'Classify success, not found, client, server, redirect, and unexpected status before domain decoding and retain bounded error evidence.',
        'Any JSON body should be decoded as success regardless of HTTP status.',
      ],
      [
        'pokedex-go-body-ownership-limit',
        'Close every non-nil response body, bound bytes, distinguish read and decode failure, and preserve connection-reuse implications.',
        'defer response.Body.Close is sufficient even before checking whether response exists.',
      ],
      [
        'pokedex-go-roundtripper-tests',
        'Use injected RoundTripper and httptest server cases for headers, URL, context, status, body limit, cancellation, and cleanup.',
        'Testing only the returned Pokemon proves request construction and lifecycle.',
      ],
    ]
  ),
  pokegoModule(
    'pokedex-go-map-pagination-state',
    'Map Command, Page State, Navigation Invariants, and Transactional Updates',
    'The map command prints names but loses the page identity, advances before a request succeeds, permits negative offsets, and cannot explain what back should restore.',
    'transactional Pokemon page navigator',
    [
      [
        'pokedex-go-page-state-model',
        'Store current resource, offset, limit, next, previous, result identities, and revision as one explicit page state.',
        'Current offset alone fully describes a page.',
      ],
      [
        'pokedex-go-map-transition',
        'Compute candidate navigation, fetch and validate it, then commit state only after success.',
        'Updating offset before the network call makes navigation more responsive.',
      ],
      [
        'pokedex-go-page-boundaries',
        'Disable or explain next and back at absent-link boundaries and reject negative, excessive, or mismatched pagination state.',
        'Subtracting the page size always reaches the correct previous page.',
      ],
      [
        'pokedex-go-list-presentation',
        'Number results, preserve canonical identity, show page position when count is known, and remain readable at narrow widths.',
        'Names alone provide enough orientation in a long paginated list.',
      ],
      [
        'pokedex-go-map-transition-tests',
        'Prove first, middle, last, empty, short, changed-count, failed-fetch, and repeated-command state invariants.',
        'One next-then-back test proves pagination correctness.',
      ],
    ]
  ),
  pokegoModule(
    'pokedex-go-history-back-recovery',
    'Navigation History, Back Semantics, Snapshots, and Failure Recovery',
    'Back recomputes offsets instead of restoring observed state, failed requests corrupt history, repeated pages grow memory forever, and concurrent prefetch mutates the visible cursor.',
    'bounded snapshot navigation history',
    [
      [
        'pokedex-go-history-semantics',
        'Define whether back means prior successful view, API previous link, or numeric page and expose that contract in help.',
        'Every user interprets back as offset minus limit.',
      ],
      [
        'pokedex-go-state-snapshot',
        'Store immutable-enough page snapshots or identifiers with explicit copy boundaries so later mutation cannot rewrite history.',
        'Appending a struct containing slices always creates a deep historical snapshot.',
      ],
      [
        'pokedex-go-history-commit',
        'Push history only after a new view is admitted and leave cursor plus history unchanged on failure or cancellation.',
        'A failed navigation should still appear in back history for transparency.',
      ],
      [
        'pokedex-go-history-budget',
        'Bound entries or bytes and choose eviction, compaction, or persisted checkpoint behavior with visible limits.',
        'A command session cannot consume meaningful memory through history.',
      ],
      [
        'pokedex-go-history-property-tests',
        'Generate navigation sequences and verify cursor, stack, boundary, idempotence, and failure invariants across changed page sizes.',
        'A few manually chosen navigation sequences cover every history defect.',
      ],
    ]
  ),
  pokegoModule(
    'pokedex-go-cache-ttl-identity',
    'Fair-Use Cache Keys, TTL, Clock Injection, Copies, and Eviction',
    'The cache keys raw commands, uses time.Now deep inside methods, returns mutable shared slices, never expires failures, and grows without a capacity policy.',
    'bounded TTL resource cache with observable decisions',
    [
      [
        'pokedex-go-cache-key',
        'Canonicalize endpoint, resource identity, and representation into a typed cache key without mixing user spelling or presentation.',
        'Raw command text is the most accurate cache identity.',
      ],
      [
        'pokedex-go-ttl-clock',
        'Inject a clock, define freshness at exact boundaries, and distinguish fetched, stored, observed, and expires times.',
        'Sleeping in tests is the only realistic way to validate TTL behavior.',
      ],
      [
        'pokedex-go-cache-copy-ownership',
        'Choose immutable values, deep copies, or documented ownership so callers cannot mutate cached history or other results.',
        'Returning a cached struct by value prevents all aliasing through nested slices.',
      ],
      [
        'pokedex-go-negative-error-cache',
        'Decide which not-found, transient, malformed, and canceled outcomes may be cached and for how long.',
        'Caching every error prevents unnecessary traffic without downside.',
        'strategic',
        'evaluate',
      ],
      [
        'pokedex-go-cache-capacity-evidence',
        'Bound entries and bytes, define eviction, expose hit, miss, stale, eviction, and bypass counters, and test each transition.',
        'A TTL automatically bounds cache memory.',
      ],
    ]
  ),
  pokegoModule(
    'pokedex-go-concurrent-cache-flight',
    'Concurrent Cache Access, Duplicate Suppression, Ownership, and Race Evidence',
    'Prefetch and commands access a map without synchronization, duplicate misses launch identical requests, a canceled waiter kills shared work, and tests pass without the race detector.',
    'race-free duplicate-suppressed resource loader',
    [
      [
        'pokedex-go-cache-synchronization',
        'Protect shared cache invariants with a mutex or owned goroutine and keep lock scope away from slow network work.',
        'Concurrent reads make an ordinary map safe while one goroutine writes.',
      ],
      [
        'pokedex-go-inflight-registry',
        'Represent one canonical in-flight fetch, waiters, completion, result, and cleanup without leaking entries.',
        'A cache mutex alone prevents duplicate requests after concurrent misses.',
      ],
      [
        'pokedex-go-waiter-cancellation',
        'Let each waiter cancel independently while defining when shared underlying work should continue or stop.',
        'The first canceled caller should always cancel work needed by every waiter.',
      ],
      [
        'pokedex-go-result-publication',
        'Publish value and error with a happens-before edge and copy or freeze nested data before waking waiters.',
        'Closing a channel after mutating arbitrary shared fields is always race-free.',
      ],
      [
        'pokedex-go-concurrency-test-evidence',
        'Use barriers, controlled transports, many interleavings, race runs, duplicate-count assertions, and leak-sensitive cleanup checks.',
        'A normal fast unit-test run can prove absence of data races.',
      ],
    ]
  ),
  pokegoModule(
    'pokedex-go-pokemon-inspect-view',
    'Pokemon Detail Lookup, Derived Views, Units, and Provenance',
    'The inspect command dumps transport JSON, displays raw decimeter and hectogram values without labels, loses API provenance, and panics when optional nested entries are empty.',
    'human-readable validated Pokemon detail view',
    [
      [
        'pokedex-go-pokemon-lookup-identity',
        'Accept numeric ID or constrained canonical name, retain requested and resolved identity, and reject ambiguous or hostile input.',
        'Any non-empty string is a valid Pokemon name.',
      ],
      [
        'pokedex-go-detail-domain-model',
        'Model stable identity, species, types, abilities, stats, dimensions, and optional fields separately from the transport DTO.',
        'The endpoint response struct should also be the terminal view model.',
      ],
      [
        'pokedex-go-unit-conversion',
        'Convert height and weight only under documented API units, label original and displayed units, and test rounding boundaries.',
        'Dividing raw numbers by ten is self-explanatory and cannot lose meaning.',
      ],
      [
        'pokedex-go-derived-presentation',
        'Compute ordered summaries without inventing facts, preserve hidden-ability status, and distinguish empty from unavailable.',
        'A visually compact JSON dump is a designed information hierarchy.',
      ],
      [
        'pokedex-go-detail-provenance-tests',
        'Verify request identity, response identity, source URL, cache state, unit conversion, sorting, missing fields, and changed fixtures.',
        'Correct displayed values make source and transformation evidence unnecessary.',
      ],
    ]
  ),
  pokegoModule(
    'pokedex-go-catch-collection-invariants',
    'Catch Semantics, Collection Identity, Randomness, and Deterministic Evidence',
    'Catch uses a hidden global random source, stores partial response pointers, duplicates the same Pokemon unpredictably, and makes tests depend on luck and request timing.',
    'deterministic owned Pokemon collection transition',
    [
      [
        'pokedex-go-catch-product-rule',
        'Define whether catch is guaranteed, probabilistic, skill-based, or a collection action and state duplicate and failure semantics.',
        'A familiar game mechanic may be copied without explaining its learning or user contract.',
        'strategic',
        'evaluate',
      ],
      [
        'pokedex-go-random-source-injection',
        'If probability is used, inject a narrow source, record seed or draw evidence, bound values, and keep policy separate from randomness.',
        'Calling rand.Intn directly is adequately testable because failures are rare.',
      ],
      [
        'pokedex-go-collection-identity',
        'Key owned entries by resolved stable ID while retaining display name and capture evidence without raw-input duplicates.',
        'Case-folded names are the strongest possible collection keys.',
      ],
      [
        'pokedex-go-owned-copy',
        'Store a deliberately owned domain value rather than a transport pointer or cache alias and define mutation policy.',
        'Adding a pointer to a map gives the collection independent ownership.',
      ],
      [
        'pokedex-go-catch-transition-tests',
        'Prove success, miss, duplicate, lookup failure, cancellation, seeded boundary, and unchanged-collection failure cases.',
        'Testing only a seeded successful catch validates the feature.',
      ],
    ]
  ),
  pokegoModule(
    'pokedex-go-owned-inspect-release',
    'Owned Inspection, Ordering, Release, and Collection Integrity',
    'Inspect silently falls back to the network, list order changes with map iteration, release deletes before confirmation, and aliases let cached updates rewrite owned records.',
    'offline inspectable and reversible collection interface',
    [
      [
        'pokedex-go-owned-lookup',
        'Distinguish owned inspection from remote lookup and return a clear not-owned result without hidden traffic.',
        'Inspecting a missing owned record should automatically fetch and add it.',
      ],
      [
        'pokedex-go-collection-order',
        'Present collection records in a documented stable order with identifiers and totals independent of map iteration.',
        'Users do not notice nondeterministic collection order.',
      ],
      [
        'pokedex-go-release-transition',
        'Validate target, preview the exact owned record, require deliberate confirmation policy, then commit deletion atomically.',
        'Delete-first is safe because the record can always be fetched again.',
      ],
      [
        'pokedex-go-collection-copy-integrity',
        'Prevent output formatting, cache refresh, and remote DTO reuse from mutating owned collection state.',
        'Value receiver methods guarantee every nested field is immutable.',
      ],
      [
        'pokedex-go-collection-sequence-tests',
        'Run catch, duplicate, inspect, list, release, cancel, and retry sequences while checking counts and identities after every step.',
        'Individual command tests prove multi-command state integrity.',
      ],
    ]
  ),
  pokegoModule(
    'pokedex-go-location-explore-encounters',
    'Location Areas, Encounter Relations, Filtering, and Exploration',
    'Explore confuses locations with location areas, requests unbounded encounter data, prints duplicates, ignores empty relations, and loses which area produced each Pokemon.',
    'provenance-preserving location encounter explorer',
    [
      [
        'pokedex-go-location-resource-model',
        'Distinguish region, location, and location-area resources and map the command to the endpoint whose relation answers the user need.',
        'All place-related PokéAPI resources contain the same Pokemon list.',
      ],
      [
        'pokedex-go-location-input',
        'Validate numeric or canonical area identity, retain requested and resolved values, and construct only fixed-origin resource paths.',
        'Adding location input to the base URL cannot create an unsafe path.',
      ],
      [
        'pokedex-go-encounter-dedup',
        'Deduplicate Pokemon by stable identity while retaining area, version, method, chance, or condition provenance needed by the view.',
        'Removing duplicate display names preserves all encounter meaning.',
      ],
      [
        'pokedex-go-explore-budget',
        'Bound response bytes, records processed, output rows, optional filters, cache use, and prefetch concurrency.',
        'One location-area response is always small enough to process and print in full.',
      ],
      [
        'pokedex-go-explore-fixtures',
        'Test empty, duplicate, multi-version, malformed relation, large, filtered, cached, and changed-area fixtures.',
        'A popular area with many encounters represents all explore cases.',
      ],
    ]
  ),
  pokegoModule(
    'pokedex-go-errors-recovery-contract',
    'Error Taxonomy, Wrapping, Retry Decisions, User Recovery, and Exit',
    'Every failure becomes unable to fetch, handlers log and return nil, retries include invalid input, wrapped causes are discarded, and one command failure terminates the session.',
    'causal recoverable Pokedex error contract',
    [
      [
        'pokedex-go-error-taxonomy',
        'Classify input, not found, protocol, timeout, cancellation, transport, decode, invariant, persistence, and internal errors by caller decision.',
        'A unique error string for every branch is a maintainable taxonomy.',
      ],
      [
        'pokedex-go-wrap-match',
        'Wrap context with percent-w while preserving sentinel or typed matching and avoid exposing unstable internal prose as API.',
        'Comparing error strings is the clearest way to choose recovery.',
      ],
      [
        'pokedex-go-retry-eligibility',
        'Retry only explicitly transient idempotent work under attempt, time, spacing, cancellation, and fair-use budgets.',
        'All failed GET requests should be retried until one succeeds.',
      ],
      [
        'pokedex-go-user-recovery-message',
        'Provide concise cause class, safe context, next action, and unchanged-state assurance without leaking URLs or internals.',
        'The full Go error chain should always be printed to end users.',
      ],
      [
        'pokedex-go-session-failure-isolation',
        'Keep recoverable command failures local, terminate on deliberate quit or unrecoverable lifecycle failure, and always clean up.',
        'Returning any error from a handler should end the whole REPL.',
      ],
    ]
  ),
  pokegoModule(
    'pokedex-go-context-signal-shutdown',
    'Context Propagation, Deadlines, OS Signals, and Graceful Shutdown',
    'Handlers create background contexts, Ctrl-C exits before cleanup, signal notifications are never stopped, blocked input and fetch work outlive the session, and cancellation is reported as failure.',
    'signal-aware graceful command lifecycle',
    [
      [
        'pokedex-go-root-signal-context',
        'Create one root context with signal.NotifyContext, call its stop function, and define portable interrupt behavior.',
        'Registering a signal context requires no resource cleanup.',
      ],
      [
        'pokedex-go-context-tree',
        'Propagate caller context through session, handler, loader, transport, cache wait, and persistence without storing it in long-lived structs.',
        'A Context belongs as a field on every service object.',
      ],
      [
        'pokedex-go-deadline-budget',
        'Reserve cleanup time, derive bounded operation deadlines, and distinguish parent cancellation from local timeout.',
        'Every layer should set the same independent timeout.',
      ],
      [
        'pokedex-go-cancel-blocked-work',
        'Ensure requests, waits, worker sends, sleeps, and any supported input path observe cancellation without abandoned goroutines.',
        'Closing the REPL loop automatically stops every goroutine it started.',
      ],
      [
        'pokedex-go-shutdown-evidence',
        'Test cancel before, during, and after work; second interrupt policy; state preservation; output; goroutine completion; and idempotent cleanup.',
        'A manual Ctrl-C demonstration proves graceful shutdown.',
      ],
    ]
  ),
  pokegoModule(
    'pokedex-go-bounded-prefetch-pipeline',
    'Bounded Prefetch, Worker Ownership, Ordering, and Backpressure',
    'Every map result launches a goroutine, concurrency is unbounded, jobs block after cancellation, output follows completion order, and prefetched failures poison visible state.',
    'bounded cancellable Pokemon prefetch pipeline',
    [
      [
        'pokedex-go-prefetch-value',
        'Define which next-view latency benefit justifies prefetch traffic and when no prefetch should occur.',
        'Any work done in the background is free to users and the API.',
        'strategic',
        'evaluate',
      ],
      [
        'pokedex-go-concurrency-budget',
        'Set worker, queue, request, byte, and time ceilings from fair-use and resource evidence rather than input size.',
        'One goroutine per Pokemon is idiomatic and therefore bounded.',
      ],
      [
        'pokedex-go-channel-ownership',
        'Assign which goroutine creates, sends, closes, drains, cancels, and waits for each channel and result.',
        'Receivers should close channels when they no longer want data.',
      ],
      [
        'pokedex-go-order-and-partial-failure',
        'Preserve requested order or label completion order, isolate per-item failure, and never commit speculative visible state.',
        'Concurrency may reorder results because users only care that all records arrive.',
      ],
      [
        'pokedex-go-pipeline-stress-tests',
        'Use blocked workers, tiny queues, cancellation, duplicate jobs, partial failures, and race or leak evidence under deterministic fixtures.',
        'A fast all-success pipeline test exercises backpressure.',
      ],
    ]
  ),
  pokegoModule(
    'pokedex-go-persistence-schema-atomicity',
    'Collection Persistence, Versioned Schemas, Atomic Replacement, and Restore',
    'The program writes live maps directly to the final file, trusts arbitrary JSON on load, has no schema version, loses permissions on replacement, and cannot recover from interruption.',
    'versioned atomic offline collection store',
    [
      [
        'pokedex-go-persistence-boundary',
        'Keep browser lessons on pure byte models and place native filesystem effects behind an injected save and load port.',
        'Browser Go execution can prove host filesystem behavior.',
      ],
      [
        'pokedex-go-save-schema',
        'Define version, application identity, timestamp policy, records, provenance, and checksum or integrity scope with deterministic encoding.',
        'encoding/json output alone is a durable file format contract.',
      ],
      [
        'pokedex-go-load-validation',
        'Bound bytes, decode exactly one document, validate schema and every record, reject duplicates, and preserve the last valid in-memory state on error.',
        'If JSON syntax is valid, saved collection data is trustworthy.',
      ],
      [
        'pokedex-go-atomic-replacement',
        'Write and sync a temporary file as required, preserve intended permissions, replace safely per platform, and clean abandoned temporary state.',
        'os.Rename has identical crash and replacement behavior on every platform.',
      ],
      [
        'pokedex-go-migration-restore-tests',
        'Test old, current, future, truncated, oversized, duplicate, corrupt, permission, interrupted-write, backup, and restore cases.',
        'Loading one current fixture proves persistence reliability.',
      ],
    ]
  ),
  pokegoModule(
    'pokedex-go-security-data-boundaries',
    'URL Allowlisting, Untrusted API Data, Terminal Safety, Files, and Resource Abuse',
    'The client follows redirects anywhere, prints control characters from remote data, accepts arbitrary save paths, logs full responses, and lets crafted records exhaust memory or terminal output.',
    'deny-by-default Pokedex trust-boundary policy',
    [
      [
        'pokedex-go-redirect-egress-policy',
        'Revalidate scheme, host, port, redirect count, and destination policy on every hop and reject user-controlled egress.',
        'A fixed initial URL prevents redirects from reaching other hosts.',
      ],
      [
        'pokedex-go-terminal-control-safety',
        'Normalize or visibly escape control, bidi, and ANSI sequences from API, file, and user data before terminal presentation.',
        'Remote Pokemon names are trusted because PokéAPI is public.',
      ],
      [
        'pokedex-go-file-path-policy',
        'Choose application-owned storage roots, reject traversal or unexpected file types, and minimize permission and symlink assumptions.',
        'filepath.Clean guarantees a path remains inside the intended directory.',
      ],
      [
        'pokedex-go-secret-privacy-logging',
        'Avoid credentials, minimize retained data, redact diagnostic fields, and document that public API data can still become unsafe output.',
        'A no-auth API eliminates every privacy and logging concern.',
      ],
      [
        'pokedex-go-resource-abuse-defense',
        'Bound command length, response bytes, decoded records, cache, history, collection, concurrency, retries, output, and persistence size.',
        'Only network rate limits matter for denial-of-service defense.',
      ],
    ]
  ),
  pokegoModule(
    'pokedex-go-testing-fuzz-race',
    'Unit, Integration, Fuzz, Race, Leak, and CLI Behavior Evidence',
    'Tests call the live API, share cache state, assert implementation details, never run the binary, ignore fuzz seeds and race findings, and pass despite goroutine leaks.',
    'layered deterministic Go verification harness',
    [
      [
        'pokedex-go-test-layer-map',
        'Assign pure domain, handler, cache, transport, persistence, subprocess, race, fuzz, and controlled live-smoke evidence to separate risks.',
        'More end-to-end tests always create stronger and faster diagnosis.',
      ],
      [
        'pokedex-go-table-fixtures',
        'Use named table cases with minimal original fixtures, changed inputs, explicit wants, and isolated setup without loop-variable mistakes.',
        'A large copied fixture is more realistic and therefore better for every unit test.',
      ],
      [
        'pokedex-go-fakes-httptest',
        'Prefer narrow fakes for decisions and httptest for real HTTP boundaries while asserting requests, responses, lifecycle, and faults.',
        'Mocking every http.Client method is the most faithful integration test.',
      ],
      [
        'pokedex-go-fuzz-invariants',
        'Fuzz parsers, resource input, JSON admission, state transitions, and persistence with deterministic seeds and invariant assertions.',
        'A fuzz run that finds no panic proves semantic correctness.',
      ],
      [
        'pokedex-go-race-leak-cli',
        'Run race-capable suites, force overlapping work, track completion, and test built-command streams, status, signals, working directory, and installed behavior.',
        'Calling main-like functions directly proves executable lifecycle and concurrency.',
      ],
    ]
  ),
  pokegoModule(
    'pokedex-go-observability-performance-fairuse',
    'Telemetry, Latency, Capacity, Cache Effectiveness, and Fair-Use Operations',
    'Logs contain full URLs and bodies, metrics use Pokemon names as labels, average latency hides stalls, cache hit rate lacks workload context, and optimization increases API traffic.',
    'privacy-minimized capacity and fair-use evidence report',
    [
      [
        'pokedex-go-causal-run-record',
        'Correlate command, operation, cache decision, request class, attempt, status class, duration, outcome, and cleanup without sensitive or unbounded fields.',
        'Raw verbose logs are the best incident evidence.',
      ],
      [
        'pokedex-go-bounded-metrics',
        'Use low-cardinality counters and distributions for commands, outcomes, cache, requests, bytes, latency, cancellation, and queue depth.',
        'Pokemon name is a safe metric label because the dataset is finite.',
      ],
      [
        'pokedex-go-latency-percentiles',
        'Measure representative cold and warm command latency with percentile, workload, environment, sample, and correctness context.',
        'One average duration summarizes interactive responsiveness.',
      ],
      [
        'pokedex-go-cache-fairuse-evaluation',
        'Relate cache hit, miss, stale, duplicate suppression, request frequency, and user latency under changed workloads.',
        'A higher cache hit rate always means a better user and API outcome.',
        'strategic',
        'evaluate',
      ],
      [
        'pokedex-go-capacity-regression',
        'Gate bounded CPU, memory, goroutines, requests, bytes, output, and shutdown under a representative scripted session.',
        'Performance optimization is complete when one microbenchmark gets faster.',
      ],
    ]
  ),
  pokegoModule(
    'pokedex-go-packaging-crossplatform-release',
    'Command Packaging, Build Identity, Cross-Platform Behavior, and Distribution',
    'The binary works only from the repository root, embeds no version identity, writes beside itself, assumes Unix signals and paths, and ships an untested archive from a dirty tree.',
    'reproducible cross-platform Go Pokedex artifact',
    [
      [
        'pokedex-go-command-package-layout',
        'Keep cmd entrypoint thin, internal packages directional, fixtures separate, and runtime paths independent of source checkout.',
        'A Go binary automatically finds repository-relative assets after installation.',
      ],
      [
        'pokedex-go-version-build-identity',
        'Expose semantic version, revision, build time policy, Go version, platform, and dirty-state evidence without making builds unnecessarily nondeterministic.',
        'Embedding the current timestamp always improves artifact reproducibility.',
      ],
      [
        'pokedex-go-crossplatform-contract',
        'Test path, newline, signal, terminal, rename, permission, and architecture assumptions on supported platforms and document differences.',
        'Successful linux/amd64 execution proves all Go-supported platforms.',
      ],
      [
        'pokedex-go-release-artifact',
        'Build from reviewed source, inspect binary and archive contents, generate checksums and provenance, scan, and smoke the extracted artifact.',
        'A successful go build proves the distributed archive is correct.',
      ],
      [
        'pokedex-go-install-upgrade-uninstall',
        'Document install, data location, upgrade compatibility, rollback, backup, uninstall, and support without deleting user collections silently.',
        'Replacing the binary is the complete upgrade and rollback plan.',
      ],
    ]
  ),
  pokegoModule(
    'pokedex-go-release-recovery-defense',
    'End-to-End Release, Incident Recovery, and Engineering Defense',
    'A candidate passes unit tests but lacks clean-build, race, accessibility, fair-use, failure, migration, rollback, restore, and stakeholder evidence, while residual risks have no owners.',
    'defensible recoverable Go Pokedex release dossier',
    [
      [
        'pokedex-go-e2e-reconciliation',
        'Reconcile source, module graph, fixtures, tests, binary, command behavior, saved data, checksum, documentation, and stakeholder acceptance to one revision.',
        'Each green tool independently proves the same artifact was tested and shipped.',
      ],
      [
        'pokedex-go-failure-rehearsal',
        'Rehearse invalid input, API not found, timeout, malformed response, cancellation, cache corruption, write interruption, disk failure, and signal shutdown.',
        'Rare failures can be documented instead of executed before release.',
      ],
      [
        'pokedex-go-migration-rollback',
        'Prove forward migration, old-binary compatibility limits, backup, rollback, restored collection integrity, and support decision points.',
        'Rolling back the binary always restores the old data format.',
      ],
      [
        'pokedex-go-release-board-defense',
        'Defend product value, Go design, API use, accessibility, security, testing, capacity, fair use, operations, and non-claims with traceable evidence.',
        'A polished demonstration is stronger than a reviewable evidence packet.',
        'professional',
        'create',
      ],
      [
        'pokedex-go-residual-risk-ownership',
        'Record remaining uncertainty, affected users, severity, mitigation, detection, owner, expiry, escalation, and re-review trigger.',
        'Low-severity residual risk needs no named owner or expiration.',
        'professional',
        'evaluate',
      ],
    ]
  ),
];

const sources = [
  [
    'PokéAPI v2 Documentation',
    'official-docs',
    'https://pokeapi.co/docs/v2',
    'API v2 current 2026-07-15',
    'Controls GET-only consumption, resource lists, pagination, Pokemon and location-area endpoint contracts, caching request, and fair use.',
  ],
  [
    'PokéAPI OpenAPI Description',
    'official-specification',
    'https://github.com/PokeAPI/pokeapi/blob/master/openapi.yml',
    'Repository main reviewed 2026-07-15',
    'Controls machine-readable paths, parameters, response schemas, and endpoint examples.',
  ],
  [
    'PokéAPI Repository and Release History',
    'official-source',
    'https://github.com/PokeAPI/pokeapi/releases',
    'PokeAPI 2.9.0 current 2026-07-15',
    'Controls current server release identity, schema evolution, and documented changes.',
  ],
  [
    'Go Release History',
    'official-docs',
    'https://go.dev/doc/devel/release',
    'Go 1.26.5 released 2026-07-07',
    'Controls stable Go security and bug-fix baseline.',
  ],
  [
    'Go 1.26 Release Notes',
    'official-docs',
    'https://go.dev/doc/go1.26',
    'Go 1.26',
    'Controls current language, toolchain, runtime, and standard-library changes.',
  ],
  [
    'The Go Programming Language Specification',
    'official-specification',
    'https://go.dev/ref/spec',
    'Go 1.26 language version',
    'Controls types, values, methods, interfaces, statements, initialization, and concurrency language semantics.',
  ],
  [
    'Go Modules Reference',
    'official-specification',
    'https://go.dev/ref/mod',
    'Current 2026-07-15',
    'Controls module paths, versions, sums, workspaces, and dependency reproducibility.',
  ],
  [
    'Go Command Documentation',
    'official-docs',
    'https://pkg.go.dev/cmd/go',
    'Go 1.26.5',
    'Controls fmt, test, vet, build, install, environment, fuzz, race flags, and tool evidence.',
  ],
  [
    'Go bufio Package',
    'official-docs',
    'https://pkg.go.dev/bufio@go1.26.5',
    'Go 1.26.5',
    'Controls Reader and Scanner buffering, tokenization, limits, and error behavior.',
  ],
  [
    'Go encoding/json Package',
    'official-docs',
    'https://pkg.go.dev/encoding/json@go1.26.5',
    'Go 1.26.5',
    'Controls JSON tags, decoding, unknown fields, numbers, streaming, and error behavior.',
  ],
  [
    'Go net/http Package',
    'official-docs',
    'https://pkg.go.dev/net/http@go1.26.5',
    'Go 1.26.5',
    'Controls client reuse, transports, request contexts, redirects, responses, bodies, and timeouts.',
  ],
  [
    'Go context Package',
    'official-docs',
    'https://pkg.go.dev/context@go1.26.5',
    'Go 1.26.5',
    'Controls cancellation, deadlines, propagation, causes, and API boundary conventions.',
  ],
  [
    'Go os/signal Package',
    'official-docs',
    'https://pkg.go.dev/os/signal@go1.26.5',
    'Go 1.26.5',
    'Controls NotifyContext, interrupt handling, stop cleanup, and platform limits.',
  ],
  [
    'Go sync Package',
    'official-docs',
    'https://pkg.go.dev/sync@go1.26.5',
    'Go 1.26.5',
    'Controls mutexes, once, wait groups, maps, pools, and happens-before guarantees.',
  ],
  [
    'Go Testing Package',
    'official-docs',
    'https://pkg.go.dev/testing@go1.26.5',
    'Go 1.26.5',
    'Controls tests, benchmarks, examples, fuzz targets, cleanup, and test execution.',
  ],
  [
    'Go httptest Package',
    'official-docs',
    'https://pkg.go.dev/net/http/httptest@go1.26.5',
    'Go 1.26.5',
    'Controls deterministic HTTP handler, request, recorder, and local-server verification.',
  ],
  [
    'Go Fuzzing Tutorial',
    'official-docs',
    'https://go.dev/doc/tutorial/fuzz',
    'Current 2026-07-15',
    'Controls fuzz target construction, seed corpus, failure preservation, and limits.',
  ],
  [
    'Go Data Race Detector',
    'official-docs',
    'https://go.dev/doc/articles/race_detector',
    'Current 2026-07-15',
    'Controls race instrumentation, execution, reports, build tags, and limitations.',
  ],
  [
    'Go Vulnerability Management',
    'official-docs',
    'https://go.dev/doc/security/vuln/',
    'Current 2026-07-15',
    'Controls govulncheck use, reachability context, database, and remediation evidence.',
  ],
  [
    'HTTP Semantics RFC 9110',
    'standards-body',
    'https://www.rfc-editor.org/rfc/rfc9110',
    'RFC 9110',
    'Controls GET, status, fields, redirects, representations, and HTTP semantics.',
  ],
  [
    'HTTP Caching RFC 9111',
    'standards-body',
    'https://www.rfc-editor.org/rfc/rfc9111',
    'RFC 9111',
    'Controls cache freshness, validators, storage, invalidation, and shared versus private cache reasoning.',
  ],
  [
    'OWASP SSRF Prevention Cheat Sheet',
    'recognized-security-framework',
    'https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html',
    'Current 2026-07-15',
    'Controls fixed destinations, allowlists, redirects, validation, and network-layer transfer checks.',
  ],
  [
    'POSIX Utility Conventions',
    'standards-body',
    'https://pubs.opengroup.org/onlinepubs/9799919799/basedefs/V1_chap12.html',
    'POSIX.1-2024 Issue 8',
    'Controls portable utility argument and option conventions used in command-interface review.',
  ],
  [
    'Web Content Accessibility Guidelines 2.2',
    'standards-body',
    'https://www.w3.org/TR/WCAG22/',
    'W3C Recommendation 2024-12-12',
    'Controls platform-rendered text alternatives, keyboard operation, focus, target size, status, contrast, and motion requirements around the course and transferable terminal guidance.',
  ],
].map(([title, authority, url, version, scope]) => ({
  title,
  authority:
    authority === 'official-docs' || authority === 'official-source' ? 'official-docs' : 'standard',
  url,
  version,
  reviewedAt: REVIEWED_AT,
  scope,
}));

export const buildPokedexGoConfig = finalizeCourse(
  {
    id: 'build-pokedex-go',
    title: 'Build a Production-Grade Pokedex in Go',
    version: '2026.07',
    audience: {
      description:
        'Go learners ready to integrate commands, HTTP, typed JSON, state, caching, concurrency, cancellation, persistence, security, testing, packaging, and operations into one cumulative user-facing product.',
      entryKnowledge: [
        'Write, test, format, and build multi-package Go programs with structs, interfaces, errors, slices, maps, and goroutines.',
        'Construct bounded context-aware HTTP requests and validate status, bytes, JSON, retries, and cleanup.',
        'Use Git and repository quality gates to preserve revision, test, lint, security, and release evidence.',
      ],
      deviceConstraints: [
        'Desktop or tablet with a modern browser; native HTTP, race, filesystem, signal, packaging, and cross-platform transfer labs require a local Go 1.26.5 environment.',
      ],
      accessibilityAssumptions: [
        'All terminal traces, state diagrams, tables, code, and project evidence require structured text, keyboard operation, visible focus, non-color meaning, restrained announcements, zoom, and reduced-motion support.',
      ],
    },
    scope: {
      includes: [
        'A cumulative accessible REPL Pokedex using PokéAPI resource, pagination, Pokemon, and location-area contracts',
        'Go ownership, typed JSON, reusable HTTP clients, fair-use caching, duplicate suppression, goroutines, cancellation, persistence, and recovery',
        'Original deterministic browser models plus controlled Go compiler, httptest, race, fuzz, filesystem, signal, package, and release transfer gates',
        'Five distinct stakeholder projects and a cumulative performance defense',
      ],
      excludes: [
        'Copying another curriculum, tutorial prose, solution, or project implementation',
        'Unbounded live PokéAPI traffic, scraping, undocumented endpoints, authentication bypass, or availability guarantees',
        'Claims that browser Go execution proves native network, filesystem, terminal, race, signal, load, accessibility, or production behavior',
      ],
      nextCourses: ['build-blog-aggregator-go', 'build-web-scraper-go', 'capstone-project'],
    },
    sources,
    modules,
    projects: [
      project(
        'pokedex-go-field-guide',
        'Accessible Regional Field-Guide REPL',
        'pokedex-go-map-pagination-state',
        'A regional parks field-guide and accessibility team',
        'They need a keyboard-first deterministic command guide with discoverable help, bounded paginated Pokemon browsing, clear errors, stable output, and exact changed-session evidence.',
        [
          'pokedex-go-user-decision',
          'pokedex-go-command-registry',
          'pokedex-go-accessible-terminal-contract',
          'pokedex-go-pagination-contract',
          'pokedex-go-map-transition-tests',
        ]
      ),
      project(
        'pokedex-go-expedition-cache',
        'Fair-Use Expedition Browser and Shared Cache',
        'pokedex-go-concurrent-cache-flight',
        'A volunteer expedition training program and PokéAPI service steward',
        'They need repeatable list and detail exploration with canonical resource keys, TTL and capacity limits, duplicate suppression, independent cancellation, API-friendly traffic, and race evidence.',
        [
          'pokedex-go-fair-use-policy',
          'pokedex-go-client-reuse',
          'pokedex-go-cache-key',
          'pokedex-go-inflight-registry',
          'pokedex-go-concurrency-test-evidence',
        ]
      ),
      project(
        'pokedex-go-ranger-notebook',
        'Cancellable Ranger Encounter Notebook',
        'pokedex-go-bounded-prefetch-pipeline',
        'A wildlife-education ranger cohort using unreliable field connections',
        'They need Pokemon detail, catch, owned inspection, location encounters, recoverable errors, bounded prefetch, Ctrl-C cleanup, and unchanged-state guarantees when work fails.',
        [
          'pokedex-go-detail-domain-model',
          'pokedex-go-owned-copy',
          'pokedex-go-encounter-dedup',
          'pokedex-go-root-signal-context',
          'pokedex-go-channel-ownership',
        ]
      ),
      project(
        'pokedex-go-offline-recovery',
        'Offline Collection Migration and Recovery Kit',
        'pokedex-go-testing-fuzz-race',
        'A community computer lab with intermittent connectivity and shared machines',
        'They need versioned bounded collection files, atomic replacement, safe terminal and path handling, migration and restore drills, layered fixtures, fuzz invariants, and built-command evidence.',
        [
          'pokedex-go-load-validation',
          'pokedex-go-atomic-replacement',
          'pokedex-go-terminal-control-safety',
          'pokedex-go-fuzz-invariants',
          'pokedex-go-race-leak-cli',
        ]
      ),
      project(
        'pokedex-go-production-defense',
        'Go Pokedex Release and Incident Defense',
        'pokedex-go-release-recovery-defense',
        'A joint learner, product, accessibility, security, API-steward, release, operations, and support board',
        'The board needs a source-bound cross-platform artifact, fair-use and capacity report, end-to-end reconciliation, rehearsed failure and migration, rollback and restore, accessible stakeholder proof, and owned residual risk.',
        [
          'pokedex-go-capacity-regression',
          'pokedex-go-release-artifact',
          'pokedex-go-e2e-reconciliation',
          'pokedex-go-release-board-defense',
          'pokedex-go-residual-risk-ownership',
        ]
      ),
    ],
    examContext:
      'Unfamiliar Go Pokedex cases spanning product and REPL contracts, Go 1.26 repository reproduction, input and dispatch, accessible help and formatting, fixed-origin PokéAPI resources, typed JSON, reusable context-aware HTTP, transactional pagination and history, fair-use TTL caching, duplicate suppression and race freedom, Pokemon details, deterministic catch and owned collection integrity, location encounters, causal errors, signal shutdown, bounded prefetch, versioned atomic persistence, URL, terminal, file and resource security, unit, integration, fuzz, race, leak and CLI evidence, privacy-minimized observability, capacity, cross-platform packaging, migration, rollback, restore, recovery, and residual-risk defense with explicit browser and controlled native boundaries.',
    minimumQuestionBankSize: 760,
  },
  {
    researchedAt: RESEARCHED_AT,
    prerequisiteCourseIds: [
      'go-basics',
      'http-clients-go',
      'git-basics',
      'repository-quality-gates',
    ],
  }
);

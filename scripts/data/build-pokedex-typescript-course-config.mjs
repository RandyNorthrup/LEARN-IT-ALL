import { finalizeCourse, project, skill } from './course-config-helpers.mjs';

const REVIEWED_AT = '2026-07-15';
const RESEARCHED_AT = '2026-07-15T08:15:00.000Z';

function outcome(id, statement, misconception, knowledgeType = 'procedural', level = 'apply') {
  if (!misconception) {
    throw new Error(`Missing misconception for TypeScript Pokedex competency ${id}`);
  }
  return skill(id, statement, misconception, knowledgeType, level);
}

function pokedextsModule(id, title, context, artifact, skillSpecs) {
  const skills = skillSpecs.map((entry) => outcome(...entry));
  return {
    id,
    title,
    context,
    artifact,
    objectives: skills.slice(0, 3).map((entry) => entry[1]),
    skills,
    contexts: {
      theory: `${context} Predict the user decision, runtime value, strict type claim, promise state, API boundary, failure, and observable evidence before reading the governing source.`,
      workshop: `A public science-learning team incrementally builds ${artifact} from original fixed PokéAPI payloads while retaining prior TypeScript, HTTP, Git, repository-gate, accessibility, security, testing, cancellation, and recovery requirements.`,
      debug: `A preserved TypeScript Pokedex interaction contains one plausible readline, token, type, validation, URL, fetch, promise, cache, abort, persistence, security, test, package, or release defect; find the first runtime or compile-time boundary failure before editing.`,
      lab: `An independent museum program receives a different audience, command script, unknown JSON payload, cache age, async schedule, accessibility need, Node platform, and injected failure and transfers ${title.toLowerCase()} into a changed ${artifact}.`,
      review: `A delayed maintainer review reconstructs ${title.toLowerCase()} from revision, runtime, command, unknown input, validation result, request identity, response fixture, promise state, cache decision, output, abort, cleanup, and recovery evidence.`,
      quiz: `A release reviewer compares near-miss TypeScript decisions for ${title.toLowerCase()} and accepts only runnable changed-case evidence, compile diagnostics, explicit non-claims, and named browser, TypeScript, Node, network, filesystem, terminal, load, accessibility, and production transfer gates.`,
    },
  };
}

const modules = [
  pokedextsModule(
    'pokedex-ts-product-command-contract',
    'Learning Product Outcomes, Command Vocabulary, and Session Contract',
    'A science museum wants a Pokedex kiosk command but has not defined its learner decision, audience needs, command vocabulary, session boundaries, or evidence of understanding.',
    'bounded learner-facing command product charter',
    [
      [
        'pokedex-ts-learner-outcome',
        'Define learner population, science or coding decision, command journey, accepted failure, feedback, and observable learning value.',
        'A themed API lookup automatically creates a useful learning experience.',
        'strategic',
        'create',
      ],
      [
        'pokedex-ts-command-vocabulary',
        'Specify commands, arguments, examples, aliases, case and whitespace policy, invalid forms, and stable results as a small language.',
        'Natural-language-like command parsing needs no explicit grammar.',
      ],
      [
        'pokedex-ts-session-state',
        'Model ready, prompting, parsing, dispatching, waiting, reporting, aborted, closing, and closed states with legal transitions.',
        'An async while loop prevents invalid session states.',
        'conceptual',
        'analyze',
      ],
      [
        'pokedex-ts-inclusive-cli-contract',
        'Make help, progress, errors, and results usable by keyboard, screen readers, high zoom, narrow terminals, and users who cannot rely on color or motion.',
        'Text interfaces need no accessibility design because assistive technology reads text.',
        'professional',
        'evaluate',
      ],
      [
        'pokedex-ts-acceptance-matrix',
        'Define happy, changed, invalid, EOF, abort, timeout, stale-response, schema, persistence, and recovery evidence with explicit non-claims.',
        'One successful interactive recording proves the session contract.',
        'metacognitive',
        'create',
      ],
    ]
  ),
  pokedextsModule(
    'pokedex-ts-repo-node-toolchain',
    'Repository Baseline, Node 24, TypeScript 7, Compatibility, and Reproduction',
    'The prototype floats Node and TypeScript versions, confuses native TypeScript 7 CLI support with TypeScript 6 programmatic API compatibility, relies on generated residue, and lacks clean-install evidence.',
    'reproducible strict TypeScript Pokedex repository',
    [
      [
        'pokedex-ts-repository-baseline',
        'Inspect revision, worktree, package metadata, lockfile, configuration inheritance, tests, fixtures, secrets, licenses, and recovery anchor.',
        'A package lock removes the need to inspect repository state.',
      ],
      [
        'pokedex-ts-node-runtime-contract',
        'Record supported Node 24 release, module system, platform, built-in fetch and readline surfaces, signal behavior, and package-manager contract.',
        'Any maintained Node release behaves identically for fetch, readline, signals, and tests.',
      ],
      [
        'pokedex-ts-compiler-compatibility',
        'Use TypeScript 7 CLI deliberately while retaining the documented TypeScript 6 compatibility package where programmatic tooling still requires it.',
        'Installing TypeScript 7 guarantees every TypeScript 6 tool API remains available.',
      ],
      [
        'pokedex-ts-strict-config',
        'Enable strict checking plus justified indexed-access, optional-property, unused-code, module, emit, and source-map policies without suppressions.',
        'The strict flag catches every unsafe external value and unused branch.',
      ],
      [
        'pokedex-ts-clean-reproduction',
        'Prove npm clean install, format, lint, type, tests, build, emitted-JavaScript execution, package contents, and fixture smoke from clean state.',
        'A passing editor type check proves emitted Node behavior.',
      ],
    ]
  ),
  pokedextsModule(
    'pokedex-ts-readline-lifecycle',
    'Readline Promises, Stream Injection, EOF, Abort, and Close Ownership',
    'The loop creates multiple interfaces, reads global process streams inside domain code, ignores EOF and rejection, leaves question promises pending, and closes streams it does not own.',
    'injected abortable readline session adapter',
    [
      [
        'pokedex-ts-readline-interface',
        'Create one readline promises interface from injected input and output and distinguish interface ownership from stream ownership.',
        'Closing readline should always destroy stdin and stdout.',
      ],
      [
        'pokedex-ts-question-abort',
        'Pass an AbortSignal to pending questions, classify abort separately, and remove or one-shot listeners without leaks.',
        'Promise cancellation occurs automatically when a parent function returns.',
      ],
      [
        'pokedex-ts-eof-close',
        'Handle EOF, close, error, quit, and repeated close idempotently while preserving an explicit final session outcome.',
        'EOF is just an empty string command.',
      ],
      [
        'pokedex-ts-process-boundary',
        'Keep process, stdin, stdout, stderr, exitCode, and signal effects in a thin executable shell around testable session logic.',
        'Importing process globally in every module is harmless dependency injection.',
      ],
      [
        'pokedex-ts-readline-behavior-tests',
        'Use controlled readable and writable streams to prove prompts, commands, EOF, abort, error, close, and post-close behavior.',
        'Calling a dispatch function proves readline lifecycle.',
      ],
    ]
  ),
  pokedextsModule(
    'pokedex-ts-tokenizer-command-registry',
    'Runtime Tokenization, Argument Validation, Registry Types, and Exhaustive Dispatch',
    'The parser splits on literal spaces, casts the first token to a command union, lets missing arguments become undefined, and uses an untyped object whose prototype can affect lookup.',
    'runtime-validated exhaustive command registry',
    [
      [
        'pokedex-ts-tokenizer-policy',
        'Normalize line endings and allowed whitespace under a bounded documented grammar while retaining raw input only when needed.',
        'line.split one space handles every reasonable command line.',
      ],
      [
        'pokedex-ts-command-runtime-narrowing',
        'Narrow arbitrary strings against an own-key command registry instead of asserting they are CommandName.',
        'A TypeScript assertion validates user input at runtime.',
      ],
      [
        'pokedex-ts-argument-schema',
        'Validate cardinality, emptiness, length, syntax, and command-specific arguments before constructing trusted handler input.',
        'A string array type proves required positions exist.',
      ],
      [
        'pokedex-ts-registry-safety',
        'Represent metadata and handlers with readonly precise types, own-key lookup, deterministic order, and an exhaustive command relationship.',
        'Record<string, Handler> prevents missing, extra, and inherited runtime keys.',
      ],
      [
        'pokedex-ts-dispatch-changed-cases',
        'Test blank, tabs, known, alias, unknown, prototype-like, missing, extra, oversized, and changed commands without type assertions.',
        'Compiler exhaustiveness covers every runtime dispatch failure.',
      ],
    ]
  ),
  pokedextsModule(
    'pokedex-ts-help-output-accessibility',
    'Generated Help, Structured Results, Output Channels, and Accessibility',
    'Help and dispatch drift apart, handlers print directly, object iteration changes display order, errors use color alone, and progress rewrites one terminal line that assistive technology cannot follow.',
    'accessible deterministic terminal view layer',
    [
      [
        'pokedex-ts-generated-help',
        'Generate overview and command help from registry metadata with usage, examples, defaults, invalid forms, and close instructions.',
        'Hand-maintained help is safer because metadata should not affect user text.',
      ],
      [
        'pokedex-ts-result-union',
        'Return a discriminated command result for data, usage, recoverable error, quit, and aborted outcomes before presentation.',
        'Throwing strings is simpler than a typed result model.',
      ],
      [
        'pokedex-ts-output-channels',
        'Separate structured data, human status, diagnostics, and exit behavior through injected writers and stable formatting.',
        'console.log is sufficient for every output and test boundary.',
      ],
      [
        'pokedex-ts-accessible-status',
        'Prefer append-only restrained status, plain labels, stable headings, no color-only meaning, and narrow-width readability.',
        'Spinners and cursor rewrites are harmless in every terminal and screen reader.',
      ],
      [
        'pokedex-ts-output-contract-tests',
        'Test ordering, empty and unknown fields, Unicode, control characters, no-color mode, narrow width, and stdout or stderr routing.',
        'A snapshot alone proves output remains understandable.',
      ],
    ]
  ),
  pokedextsModule(
    'pokedex-ts-pokeapi-url-fairuse',
    'PokéAPI Resources, URL API, Pagination Shapes, and Fair-Use Policy',
    'User input becomes a full fetch destination, URL strings are concatenated, pagination fields are assumed present, and repeated commands bypass the API request to cache every resource.',
    'fixed-origin typed PokéAPI request policy',
    [
      [
        'pokedex-ts-fixed-destination',
        'Hold scheme and authority in trusted configuration and map commands only to enumerated PokéAPI resource paths.',
        'The URL constructor makes any user-supplied origin safe.',
      ],
      [
        'pokedex-ts-resource-input',
        'Validate resource kind, numeric identifier or canonical constrained name, and preserve requested versus resolved identity.',
        'Lowercasing an arbitrary string makes it a valid Pokemon identifier.',
      ],
      [
        'pokedex-ts-url-construction',
        'Use URL and URLSearchParams for encoded path and limit or offset values while rejecting slash, control, oversized, and unexpected input.',
        'Template literals are adequate encoding for API paths.',
      ],
      [
        'pokedex-ts-pagination-runtime-shape',
        'Validate count, nullable next and previous, and result records before trusted pagination state.',
        'A TypeScript Page interface validates response JSON.',
      ],
      [
        'pokedex-ts-fair-use-contract',
        'Cache every requested resource, bound frequency and concurrency, use responsible client identity, and avoid availability claims.',
        'The removed rate limit authorizes unlimited concurrent traffic.',
        'professional',
        'evaluate',
      ],
    ]
  ),
  pokedextsModule(
    'pokedex-ts-unknown-json-validation',
    'Unknown JSON, Runtime Validators, Type Guards, Errors, and Schema Evolution',
    'response.json is typed as a trusted Pokemon, validators check only top-level keys, arrays contain unchecked members, optional fields are confused with undefined, and casts silence drift.',
    'strict unknown-to-domain validation pipeline',
    [
      [
        'pokedex-ts-json-unknown-boundary',
        'Treat parsed external JSON as unknown and prevent it from entering domain or presentation code before validation.',
        'A generic argument to response.json performs runtime validation.',
      ],
      [
        'pokedex-ts-object-array-guards',
        'Check non-null plain-enough objects, own keys, arrays, every member, primitive finiteness, bounds, and nesting explicitly.',
        'typeof value object is enough to safely read nested properties.',
      ],
      [
        'pokedex-ts-validation-result',
        'Return a discriminated success or structured failure with path, expected shape, observed class, and bounded safe detail.',
        'Validators should return boolean only so callers stay simple.',
      ],
      [
        'pokedex-ts-exact-optional-meaning',
        'Distinguish absent, optional, nullable, empty, zero, and unknown fields under exact optional-property semantics.',
        'An optional property is identical to a property explicitly set to undefined.',
      ],
      [
        'pokedex-ts-schema-evolution-fixtures',
        'Verify minimal valid, complete, extra-field, missing, null, wrong-type, non-finite, oversized, prototype-like, and changed fixtures.',
        'Rejecting every unknown field is the only schema-safe policy.',
      ],
    ]
  ),
  pokedextsModule(
    'pokedex-ts-fetch-response-abort',
    'Fetch, Response Admission, Abort Signals, Time Budgets, and Error Causes',
    'The client calls fetch globally, assumes only rejection means failure, parses every status as Pokemon, creates timeout controllers that outlive requests, and loses abort causes.',
    'injected bounded abort-aware Fetch client',
    [
      [
        'pokedex-ts-fetch-port',
        'Inject a narrow fetch-compatible port and keep Request, Response, and validation policy separate from domain commands.',
        'Monkey-patching global fetch is the cleanest test seam.',
      ],
      [
        'pokedex-ts-response-status',
        'Classify ok, not found, other 4xx, 5xx, redirects, media type, and unexpected response before parsing domain JSON.',
        'fetch rejects its Promise for HTTP 404 and 500.',
      ],
      [
        'pokedex-ts-abort-composition',
        'Compose caller cancellation with bounded timeout using AbortSignal APIs and preserve the first meaningful reason.',
        'Creating an AbortController automatically connects it to fetch.',
      ],
      [
        'pokedex-ts-response-byte-boundary',
        'Bound response bytes before or while consuming, reject truncated or oversized data, and avoid unbounded diagnostic copies.',
        'Content-Length always exists and truthfully bounds decoded JSON.',
      ],
      [
        'pokedex-ts-fetch-fault-tests',
        'Test exact URL, options, headers, status, media type, JSON, timeout, caller abort, network failure, oversized response, and cause mapping.',
        'A mocked resolved JSON object proves Fetch semantics.',
      ],
    ]
  ),
  pokedextsModule(
    'pokedex-ts-pagination-view-model',
    'Pagination View Models, Immutable State, Map Transitions, and Stale Results',
    'The map command mutates offset before validation, exposes transport results to the UI, allows an older promise to overwrite a newer page, and assumes previous means offset minus limit.',
    'immutable stale-safe Pokemon page state',
    [
      [
        'pokedex-ts-page-domain-model',
        'Convert validated transport pages into readonly resource, cursor, result identity, count, and source metadata.',
        'Readonly array syntax freezes every nested object at runtime.',
      ],
      [
        'pokedex-ts-candidate-state',
        'Derive candidate navigation and commit only a validated successful page while preserving prior state on failure.',
        'Optimistic offset mutation is harmless because a later catch block can subtract it.',
      ],
      [
        'pokedex-ts-request-generation',
        'Assign operation identity or generation so late responses cannot overwrite current state after newer commands.',
        'Promises always settle in the order they were started.',
      ],
      [
        'pokedex-ts-pagination-boundaries',
        'Honor nullable next and previous, validate returned cursor identity, and explain first, last, empty, and changed-count states.',
        'A constant page size is enough to reconstruct all API navigation.',
      ],
      [
        'pokedex-ts-pagination-sequence-tests',
        'Script rapid next, back, abort, failure, short page, repeated view, and out-of-order responses and assert every state.',
        'Testing one awaited command at a time covers async pagination.',
      ],
    ]
  ),
  pokedextsModule(
    'pokedex-ts-history-undo-state',
    'Navigation History, Immutable Snapshots, Back, and Bounded Undo',
    'History stores mutable references, pushes attempts before success, back triggers new hidden network work, unlimited pages accumulate, and undo can resurrect a stale pending request.',
    'bounded immutable navigation timeline',
    [
      [
        'pokedex-ts-back-user-contract',
        'Define back as prior admitted view, not arithmetic or browser history, and expose when no snapshot exists.',
        'Back has an obvious universal meaning in every command application.',
      ],
      [
        'pokedex-ts-history-snapshot',
        'Store readonly copied domain snapshots or stable cache identities without shared mutable arrays or pending controllers.',
        'Spreading an object deeply clones its complete graph.',
      ],
      [
        'pokedex-ts-history-transaction',
        'Push only after success, restore without hidden traffic when promised, and cancel or supersede pending operations safely.',
        'A failed request should be added so history records every attempt.',
      ],
      [
        'pokedex-ts-history-capacity',
        'Bound history by entries or bytes and define eviction, collection interaction, and persistence behavior visibly.',
        'Garbage collection prevents application-level history growth.',
      ],
      [
        'pokedex-ts-history-model-tests',
        'Generate command sequences and verify cursor, identity, ordering, bounds, stale-result exclusion, and state after every transition.',
        'Example-based tests alone cover all history state machines.',
      ],
    ]
  ),
  pokedextsModule(
    'pokedex-ts-cache-ttl-copy',
    'Cache Identity, TTL, Clock Injection, Readonly Copies, and Capacity',
    'The cache keys raw input, reads Date.now internally, shares mutable objects, conflates stale with absent, stores aborted promises, and has no entry or byte ceiling.',
    'observable bounded TypeScript resource cache',
    [
      [
        'pokedex-ts-cache-key',
        'Create a canonical typed key from endpoint, resolved identity, page parameters, and representation rather than user spelling.',
        'Stringifying the whole request object always gives a stable key.',
      ],
      [
        'pokedex-ts-clock-freshness',
        'Inject a clock and define fresh, stale, expired, and boundary instants without timer sleeps in unit tests.',
        'Date.now calls are too simple to need injection.',
      ],
      [
        'pokedex-ts-cache-value-ownership',
        'Use immutable domain values, controlled cloning, or copy-on-read so consumers cannot rewrite cached or historical data.',
        'TypeScript readonly modifiers prevent runtime mutation from JavaScript or aliases.',
      ],
      [
        'pokedex-ts-error-cache-policy',
        'Specify whether not-found, transient, validation, timeout, and abort outcomes may be retained and for what shorter lifetime.',
        'Every rejected Promise should be cached to reduce requests.',
      ],
      [
        'pokedex-ts-cache-eviction-metrics',
        'Bound entries and approximate bytes, implement deterministic eviction policy, and expose hit, miss, stale, eviction, bypass, and load decisions.',
        'TTL makes a separate capacity limit unnecessary.',
      ],
    ]
  ),
  pokedextsModule(
    'pokedex-ts-promise-dedup-ownership',
    'In-Flight Promise Deduplication, Waiters, Abort Ownership, and Cleanup',
    'Concurrent misses create duplicate fetches, a shared promise retains one caller signal, first cancellation rejects all waiters, and settled entries remain in the in-flight map.',
    'waiter-aware duplicate-suppressed async loader',
    [
      [
        'pokedex-ts-inflight-key',
        'Use the canonical resource key to register exactly one controlled load separate from the completed-value cache.',
        'Caching Promise values alone correctly handles every in-flight case.',
      ],
      [
        'pokedex-ts-shared-operation-owner',
        'Give the loader its own controller and define waiter registration, completion, publication, and final cleanup.',
        'The first caller naturally owns work shared by later callers.',
      ],
      [
        'pokedex-ts-independent-waiter-abort',
        'Allow a waiter to stop observing without necessarily aborting work required by others and cancel shared work only under policy.',
        'Promise.race cancels the losing operation.',
      ],
      [
        'pokedex-ts-rejection-cleanup',
        'Remove settled in-flight entries on success, validation failure, network failure, timeout, and abort without unhandled rejection.',
        'finally handlers cannot create new unhandled Promise paths.',
      ],
      [
        'pokedex-ts-dedup-schedule-tests',
        'Control settlement order and assert fetch count, waiter outcomes, abort reasons, cleanup, cache publication, and no dangling listeners.',
        'Awaiting Promise.all on successful calls proves deduplication.',
      ],
    ]
  ),
  pokedextsModule(
    'pokedex-ts-pokemon-detail-view',
    'Pokemon Detail Validation, Derived Types, Units, and Inclusive Presentation',
    'The inspect command trusts a cast response, renders raw API JSON, treats unit conversion as formatting, assumes arrays are nonempty, and hides which fields were unavailable.',
    'validated inclusive Pokemon detail card',
    [
      [
        'pokedex-ts-detail-identity',
        'Validate numeric ID or constrained canonical name and retain both requested input and resolved resource identity.',
        'encodeURIComponent turns any string into a valid Pokemon identifier.',
      ],
      [
        'pokedex-ts-detail-validator',
        'Validate ID, name, types, abilities, stats, height, weight, sprites or references, bounds, and member shapes from unknown.',
        'Checking id and name is enough to trust the rest of a Pokemon payload.',
      ],
      [
        'pokedex-ts-detail-domain-view',
        'Map transport fields into a readonly discriminated view that separates available, empty, and unsupported information.',
        'The API response type is already the best view model.',
      ],
      [
        'pokedex-ts-detail-units-order',
        'Convert and label documented units, sort fields deliberately, preserve hidden ability meaning, and avoid invented conclusions.',
        'Users can infer all units and ordering from field names.',
      ],
      [
        'pokedex-ts-detail-accessibility-tests',
        'Test narrow output, headings, stable order, no-color status, missing values, hostile text, unit boundaries, and changed payloads.',
        'Correct data values guarantee an understandable terminal card.',
      ],
    ]
  ),
  pokedextsModule(
    'pokedex-ts-catch-immutable-collection',
    'Catch Policy, Injected Randomness, Immutable Collection State, and Updates',
    'Catch calls Math.random inside the handler, mutates a Map in shared state, stores transport objects, accepts duplicate names with different casing, and cannot replay outcomes.',
    'replayable immutable Pokemon collection reducer',
    [
      [
        'pokedex-ts-catch-learning-rule',
        'Define what catch teaches, whether chance is justified, its visible probability contract, and duplicate and failure behavior.',
        'A familiar mechanic is engaging even when its randomness obscures learning.',
        'strategic',
        'evaluate',
      ],
      [
        'pokedex-ts-random-port',
        'Inject a bounded random-number port or deterministic policy and record draw evidence needed to replay a decision.',
        'Seeding Math.random is portable built-in behavior.',
      ],
      [
        'pokedex-ts-collection-reducer',
        'Return a new collection state and typed event for caught, missed, duplicate, failed, or aborted transitions without partial mutation.',
        'Using const Map prevents its contents from changing.',
      ],
      [
        'pokedex-ts-collection-key',
        'Key entries by validated resolved ID and retain canonical name, detail view, catch evidence, and schema version.',
        'Lowercase names are guaranteed stable primary keys.',
      ],
      [
        'pokedex-ts-catch-reducer-tests',
        'Prove threshold boundaries, duplicate, changed identity, lookup failure, abort, replay, and previous-state immutability.',
        'One deterministic success and failure test proves collection behavior.',
      ],
    ]
  ),
  pokedextsModule(
    'pokedex-ts-owned-inspect-export',
    'Owned Inspection, Stable Listing, Release Preview, and Accessible Export',
    'Owned inspect fetches remotely when absent, list order follows Map insertion accidents, release mutates before confirmation, and export dumps internal JSON without a version or accessibility structure.',
    'offline collection manager and structured export',
    [
      [
        'pokedex-ts-owned-only-inspection',
        'Keep owned inspection offline and return a typed not-owned outcome with explicit next commands.',
        'Convenient hidden fetching has no effect on user expectations or fair use.',
      ],
      [
        'pokedex-ts-stable-collection-list',
        'Sort by documented ID or name policy, label totals and empty state, and retain stable output across reloads.',
        'Map iteration order is the intended user-facing sort order.',
      ],
      [
        'pokedex-ts-release-preview',
        'Construct an immutable preview, validate confirmation against exact identity, then return a new state and release event.',
        'Deleting first and undoing later is equivalent to previewing safely.',
      ],
      [
        'pokedex-ts-accessible-export',
        'Define versioned text or JSON export with headings or structured fields, provenance, no control injection, and bounded size.',
        'Pretty-printed internal JSON is automatically an accessible public report.',
      ],
      [
        'pokedex-ts-collection-flow-tests',
        'Script catch, duplicate, offline inspect, list, release, reject, export, reload, and abort while checking prior and next states.',
        'Testing reducers individually proves the whole user flow.',
      ],
    ]
  ),
  pokedextsModule(
    'pokedex-ts-location-explore-relations',
    'Location-Area Validation, Encounter Relations, Filters, and Provenance',
    'The explore command confuses location endpoints, casts nested encounter arrays, filters before validation, collapses duplicate relationships, and produces an unbounded result list.',
    'validated provenance-rich encounter explorer',
    [
      [
        'pokedex-ts-location-resource-choice',
        'Distinguish region, location, and location-area endpoints and choose the relation that answers the stakeholder question.',
        'Every geographic resource exposes the same encounter data.',
      ],
      [
        'pokedex-ts-location-validator',
        'Validate area identity and every nested Pokemon, version detail, method, condition, chance, and level shape needed by the view.',
        'Validating the outer pokemon_encounters array validates its nested members.',
      ],
      [
        'pokedex-ts-encounter-provenance',
        'Deduplicate only chosen display rows while retaining source area, version, method, chance, conditions, and original identity.',
        'Duplicate Pokemon names mean duplicate records with no unique information.',
      ],
      [
        'pokedex-ts-explore-filter-budget',
        'Validate filters, bound response bytes, nested items, output rows, sort work, cache use, and optional detail concurrency.',
        'A single endpoint response cannot create meaningful CPU or output pressure.',
      ],
      [
        'pokedex-ts-explore-changed-fixtures',
        'Test empty, malformed nested, duplicate, multi-version, filtered, large, aborted, cached, and changed-area payloads.',
        'One complete popular location fixture represents the endpoint contract.',
      ],
    ]
  ),
  pokedextsModule(
    'pokedex-ts-error-result-recovery',
    'Error Classes, Discriminated Results, Causes, Retry, and Session Recovery',
    'Catch blocks treat unknown as Error without narrowing, HTTP and validation failures share prose, retry wraps non-idempotent state transitions, causes are lost, and any rejection closes the session.',
    'causal typed recovery decision model',
    [
      [
        'pokedex-ts-catch-unknown',
        'Treat caught values as unknown and normalize Error, DOMException, abort reasons, and non-Error throws at one boundary.',
        'Every JavaScript throw value is an Error instance.',
      ],
      [
        'pokedex-ts-error-taxonomy',
        'Represent input, not-found, HTTP, network, timeout, abort, validation, invariant, storage, and internal failures as exhaustive variants.',
        'A message string union is enough for stable recovery logic.',
      ],
      [
        'pokedex-ts-error-cause',
        'Retain safe causal chains and operation identity while separating internal diagnostics from user-facing recovery text.',
        'Printing error.stack to users is the most transparent error handling.',
      ],
      [
        'pokedex-ts-retry-policy',
        'Retry only transient idempotent fetches under attempt, total time, spacing, fair-use, and AbortSignal limits.',
        'Promise retry helpers should rerun any rejected operation.',
      ],
      [
        'pokedex-ts-session-recovery',
        'Return recoverable command errors to the prompt, close only on explicit lifecycle outcomes, and prevent unhandled rejections.',
        'An awaited rejection cannot become an unhandled rejection elsewhere.',
      ],
    ]
  ),
  pokedextsModule(
    'pokedex-ts-signals-abort-shutdown',
    'Process Signals, Abort Trees, Listener Cleanup, and Graceful Shutdown',
    'Every request owns an unrelated controller, SIGINT calls process.exit immediately, event listeners accumulate, pending readline and fetch work survive close, and aborted work prints as a defect.',
    'composed abort-aware Node session lifecycle',
    [
      [
        'pokedex-ts-root-abort-controller',
        'Translate approved process signals into one root AbortController in the executable shell and define first and repeated signal behavior.',
        'AbortController listens to operating-system signals automatically.',
      ],
      [
        'pokedex-ts-abort-tree',
        'Compose session, command, timeout, and waiter signals while preserving reason and avoiding controller ownership confusion.',
        'One shared AbortController should be aborted and replaced for every command.',
      ],
      [
        'pokedex-ts-listener-lifecycle',
        'Use once or signal-bound listeners, remove handlers on completion, and prove no listener-count growth across commands.',
        'Garbage collection removes every event listener once a Promise settles.',
      ],
      [
        'pokedex-ts-graceful-close-order',
        'Stop admission, abort pending questions and fetches, await owned work, persist valid state if policy allows, close readline, then set exit status.',
        'process.exit allows asynchronous finally blocks to finish.',
      ],
      [
        'pokedex-ts-shutdown-tests',
        'Test abort before and during question, fetch, cache wait, prefetch, and save plus repeated signal, cleanup order, state, and output.',
        'A manual Ctrl-C run proves all async resources terminate.',
      ],
    ]
  ),
  pokedextsModule(
    'pokedex-ts-bounded-async-prefetch',
    'Bounded Promise Concurrency, Queueing, Ordering, Backpressure, and Cancellation',
    'Promise.all launches one fetch per result, queues grow without limits, abort rejects the aggregate and hides partial evidence, completion order changes output, and background rejections escape.',
    'bounded abortable detail-prefetch scheduler',
    [
      [
        'pokedex-ts-prefetch-decision',
        'Justify prefetch from learner latency and API fair-use evidence and identify views where it must remain disabled.',
        'Background network work has no user or service cost.',
        'strategic',
        'evaluate',
      ],
      [
        'pokedex-ts-concurrency-queue-budget',
        'Set active, queued, byte, request, time, and retry budgets independent of result count.',
        'Promise.all is an acceptable concurrency limiter for finite arrays.',
      ],
      [
        'pokedex-ts-task-ownership',
        'Track queued, active, settled, canceled, and published tasks with exactly one owner for scheduling and cleanup.',
        'A Promise owns and cancels the underlying operation by itself.',
      ],
      [
        'pokedex-ts-order-partial-results',
        'Choose stable input-order or labeled completion-order results and preserve per-item failures without corrupting visible state.',
        'Promise.allSettled automatically provides correct domain recovery.',
      ],
      [
        'pokedex-ts-scheduler-tests',
        'Use deferred Promises to force saturation, reordered settlement, abort, duplicate, partial failure, queue drain, and zero-unhandled-rejection evidence.',
        'Fast resolved promises exercise concurrency and backpressure adequately.',
      ],
    ]
  ),
  pokedextsModule(
    'pokedex-ts-persistence-schema-atomic',
    'Unknown File Data, Versioned Schemas, Atomic Save, Migration, and Restore',
    'Load casts parsed JSON, saves mutable state directly to the final path, lacks a version discriminator, assumes rename behavior, and replaces valid memory before all records pass validation.',
    'versioned validated collection persistence adapter',
    [
      [
        'pokedex-ts-filesystem-transfer-boundary',
        'Keep browser work on pure string or byte models and isolate Node filesystem effects behind injected asynchronous ports.',
        'Browser TypeScript execution proves Node filesystem atomicity.',
      ],
      [
        'pokedex-ts-persistence-schema',
        'Define an explicit versioned JSON schema for metadata, records, provenance, and integrity with deterministic serialization.',
        'A TypeScript interface is a persistent file schema.',
      ],
      [
        'pokedex-ts-file-unknown-validation',
        'Bound bytes, parse into unknown, validate own keys and every member, reject duplicates and future versions, then commit state.',
        'JSON.parse returning an object means the file is safe to trust.',
      ],
      [
        'pokedex-ts-atomic-node-save',
        'Write a temporary file with intended mode, flush where required, replace under documented platform behavior, and clean failure residue.',
        'fs.rename provides identical atomic replacement semantics on every supported OS.',
      ],
      [
        'pokedex-ts-migration-restore-matrix',
        'Test current, prior, future, truncated, oversized, hostile-key, duplicate, interrupted, permission, backup, rollback, and restore cases.',
        'One migration fixture proves every historical collection can be upgraded.',
      ],
    ]
  ),
  pokedextsModule(
    'pokedex-ts-security-runtime-boundaries',
    'SSRF Defense, Prototype-Safe Data, Terminal Injection, Paths, and Resource Limits',
    'Redirects escape the fixed host, parsed objects are merged into state, remote text contains ANSI or bidi controls, save paths are arbitrary, and response or command sizes are unbounded.',
    'deny-by-default TypeScript trust-boundary policy',
    [
      [
        'pokedex-ts-redirect-policy',
        'Revalidate scheme, hostname, port, path class, and redirect count for every destination and reject user-controlled egress.',
        'A fixed first URL prevents SSRF through redirects or alternative schemes.',
      ],
      [
        'pokedex-ts-prototype-safe-validation',
        'Use own-property checks, explicit field construction, safe records, and no blind assignment from unknown objects.',
        'JSON.parse cannot produce dangerous keys because JSON has no prototypes.',
      ],
      [
        'pokedex-ts-terminal-text-safety',
        'Normalize or visibly escape control, ANSI, bidi, and non-printing sequences from commands, API payloads, and files.',
        'A public curated API makes all response strings safe terminal text.',
      ],
      [
        'pokedex-ts-path-data-policy',
        'Use an application-owned data location, reject traversal and unexpected file types, minimize permissions, and document symlink limits.',
        'path.resolve plus startsWith is a complete containment check.',
      ],
      [
        'pokedex-ts-resource-ceilings',
        'Bound input, URL, response, nested arrays, cache, history, collection, queue, retries, output, file size, and diagnostic detail.',
        'Node memory limits are an adequate application resource policy.',
      ],
    ]
  ),
  pokedextsModule(
    'pokedex-ts-node-test-type-evidence',
    'Node Test Runner, Runtime Faults, Compile Rejections, Async Leaks, and CLI Tests',
    'Tests cast fixtures, mock global fetch across files, assert only snapshots, omit compile-negative cases, leave timers and listeners active, and never execute emitted JavaScript.',
    'layered runtime and compile-time evidence harness',
    [
      [
        'pokedex-ts-test-layer-map',
        'Separate pure validator and reducer, fetch, readline, cache, persistence, subprocess, compile-negative, fuzz-like, and controlled live smoke evidence.',
        'One end-to-end suite gives the strongest and clearest diagnosis.',
      ],
      [
        'pokedex-ts-node-test-isolation',
        'Use node:test hooks, deterministic fixtures, scoped mocks, injected ports, fake clocks or deferred promises, and independent state.',
        'Tests run sequentially enough that global mocks cannot interfere.',
      ],
      [
        'pokedex-ts-runtime-changed-fixtures',
        'Use original minimal unknown payloads that cover valid, changed, malformed, hostile, oversized, aborted, and reordered behavior.',
        'A fully realistic copied API response is the best fixture for every unit.',
      ],
      [
        'pokedex-ts-compile-negative-evidence',
        'Maintain expected-diagnostic fixtures for invalid command, unvalidated unknown, non-exhaustive variant, optional misuse, and unsafe mutation.',
        'Runtime tests can prove every important TypeScript guarantee.',
      ],
      [
        'pokedex-ts-async-cli-leak-tests',
        'Test emitted command stdout, stderr, status, EOF, signal, working directory, listener and handle cleanup, and unhandled rejection policy.',
        'Importing and calling main proves packaged Node CLI behavior.',
      ],
    ]
  ),
  pokedextsModule(
    'pokedex-ts-observability-performance',
    'Causal Telemetry, Event-Loop Responsiveness, Latency, Cache Value, and Capacity',
    'Logs capture full payloads, metric labels contain Pokemon names and commands, average latency hides event-loop stalls, cache hit rate ignores workload, and optimization increases async fan-out.',
    'privacy-minimized interactive capacity report',
    [
      [
        'pokedex-ts-causal-operation-trace',
        'Correlate command, operation generation, cache decision, request class, attempt, status class, duration, outcome, abort reason, and cleanup with bounded fields.',
        'Verbose payload logging is required to diagnose asynchronous code.',
      ],
      [
        'pokedex-ts-low-cardinality-metrics',
        'Count commands, outcomes, cache decisions, requests, bytes, aborts, queue depth, validation and persistence failures without unbounded labels.',
        'A finite API dataset makes resource names safe metric dimensions.',
      ],
      [
        'pokedex-ts-event-loop-latency',
        'Measure user-visible cold and warm percentiles plus event-loop delay under a declared scripted workload and environment.',
        'Promise-based code cannot block the event loop.',
      ],
      [
        'pokedex-ts-cache-value-study',
        'Compare request frequency, duplicate suppression, cache freshness, memory, and user latency across changed navigation patterns.',
        'Maximizing hit rate always optimizes both user experience and fair use.',
        'strategic',
        'evaluate',
      ],
      [
        'pokedex-ts-capacity-regression',
        'Gate bounded heap, listeners, handles, queue, requests, bytes, output, latency, and shutdown while preserving exact behavior.',
        'One faster benchmark is enough to accept an optimization.',
      ],
    ]
  ),
  pokedextsModule(
    'pokedex-ts-package-distribution',
    'ESM Packaging, Exports, Executable Entry, Artifact Inspection, and Platform Support',
    'The command runs only through tsx in the source tree, package exports expose internals, the bin entry points at TypeScript, files include fixtures and secrets, and support claims ignore Node and OS behavior.',
    'installable inspected Node Pokedex package',
    [
      [
        'pokedex-ts-esm-boundaries',
        'Define package type, source and output roots, explicit extensions, imports, exports, internal boundaries, and supported Node resolution.',
        'TypeScript path aliases become Node runtime aliases automatically.',
      ],
      [
        'pokedex-ts-bin-entry',
        'Publish an executable JavaScript entry with portable launcher behavior, thin process wiring, correct permissions, and no source-tree assumptions.',
        'A bin path may point directly to a ts file on every user machine.',
      ],
      [
        'pokedex-ts-package-contents',
        'Use package files or ignore rules, inspect npm pack output, include license and docs, exclude secrets and residue, and verify dependency provenance.',
        'npm publish includes only the files imported by the entrypoint.',
      ],
      [
        'pokedex-ts-artifact-smoke-matrix',
        'Install the packed artifact into clean temporary projects and test commands, data paths, signals, newlines, Node versions, and supported platforms.',
        'Running npm start in the repository proves installed package behavior.',
      ],
      [
        'pokedex-ts-upgrade-uninstall',
        'Document configuration and data locations, schema compatibility, backup, upgrade, rollback, uninstall, support, and retained user data.',
        'npm uninstall should remove every file the application created.',
      ],
    ]
  ),
  pokedextsModule(
    'pokedex-ts-release-recovery-defense',
    'End-to-End Release, Migration, Recovery, and TypeScript Engineering Defense',
    'A polished candidate passes type checking and familiar tests but lacks emitted-runtime, abort, accessibility, fair-use, package, failure, migration, rollback, restore, and residual-risk proof.',
    'defensible recoverable TypeScript Pokedex release dossier',
    [
      [
        'pokedex-ts-e2e-artifact-reconciliation',
        'Bind source, lockfile, compiler, tests, emitted JavaScript, packed artifact, command behavior, saved data, checksums, and stakeholder review to one revision.',
        'A green type check proves the packed runtime is the tested artifact.',
      ],
      [
        'pokedex-ts-failure-rehearsal',
        'Execute invalid input, not found, HTTP failure, malformed JSON, stale Promise, abort, cache corruption, write interruption, signal, and listener-leak cases.',
        'Documented catch blocks make failure rehearsal optional.',
      ],
      [
        'pokedex-ts-migration-rollback',
        'Prove schema migration, old-package compatibility limits, backup, rollback, restored data identity, and support decisions.',
        'Rolling back npm package version always rolls back persisted schema.',
      ],
      [
        'pokedex-ts-release-defense',
        'Defend learning value, runtime validation, TypeScript claims, async ownership, API fair use, accessibility, security, tests, capacity, packaging, and non-claims.',
        'A visually appealing live demo is stronger than traceable changed-case evidence.',
        'professional',
        'create',
      ],
      [
        'pokedex-ts-residual-risk',
        'Record remaining uncertainty, affected users, severity, mitigation, detection, accountable owner, expiry, escalation, and re-review trigger.',
        'A preview application can carry unnamed permanent risks.',
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
    'Controls GET-only use, resource lists, pagination, Pokemon and location-area response contracts, local caching request, and fair use.',
  ],
  [
    'PokéAPI OpenAPI Description',
    'official-specification',
    'https://github.com/PokeAPI/pokeapi/blob/master/openapi.yml',
    'Repository main reviewed 2026-07-15',
    'Controls endpoint paths, parameters, response schemas, and machine-readable examples.',
  ],
  [
    'PokéAPI Repository Releases',
    'official-source',
    'https://github.com/PokeAPI/pokeapi/releases',
    'PokeAPI 2.9.0 current 2026-07-15',
    'Controls current release identity and recorded API evolution.',
  ],
  [
    'Announcing TypeScript 7.0',
    'official-vendor-docs',
    'https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/',
    'TypeScript 7.0.2 and TypeScript 6.0.2 compatibility guidance',
    'Controls native TypeScript 7 CLI, compatibility alias, migration, and supported tool surface.',
  ],
  [
    'TypeScript Handbook',
    'official-docs',
    'https://www.typescriptlang.org/docs/handbook/',
    'TypeScript 7 current 2026-07-15',
    'Controls strict types, narrowing, functions, objects, modules, classes, and runtime versus compile-time reasoning.',
  ],
  [
    'TypeScript Strictness Basics',
    'official-docs',
    'https://www.typescriptlang.org/docs/handbook/2/basic-types.html',
    'Current 2026-07-15',
    'Controls strict, noImplicitAny, strictNullChecks, and current new-project guidance.',
  ],
  [
    'TypeScript Narrowing',
    'official-docs',
    'https://www.typescriptlang.org/docs/handbook/2/narrowing.html',
    'Current 2026-07-15',
    'Controls unknown admission, guards, discriminated unions, control flow, and exhaustiveness.',
  ],
  [
    'TypeScript TSConfig Reference',
    'official-docs',
    'https://www.typescriptlang.org/tsconfig/',
    'TypeScript 7 current 2026-07-15',
    'Controls strict, exact optional properties, indexed access, unused code, modules, emit, and compatibility options.',
  ],
  [
    'Node.js 24 Documentation',
    'official-docs',
    'https://nodejs.org/download/release/latest-v24.x/docs/api/',
    'Node.js 24.18.0',
    'Controls supported Node runtime and stable API baseline.',
  ],
  [
    'Node.js Readline',
    'official-docs',
    'https://nodejs.org/download/release/latest-v24.x/docs/api/readline.html',
    'Node.js 24.18.0',
    'Controls promise readline, question AbortSignal, interface lifecycle, close, and stream behavior.',
  ],
  [
    'Node.js Global Objects',
    'official-docs',
    'https://nodejs.org/download/release/latest-v24.x/docs/api/globals.html',
    'Node.js 24.18.0',
    'Controls stable fetch, Request, Response, AbortController, AbortSignal timeout and composition, and reasons.',
  ],
  [
    'Node.js Process',
    'official-docs',
    'https://nodejs.org/download/release/latest-v24.x/docs/api/process.html',
    'Node.js 24.18.0',
    'Controls signals, exitCode, lifecycle events, warnings, unhandled rejection policy, and platform behavior.',
  ],
  [
    'Node.js Test Runner',
    'official-docs',
    'https://nodejs.org/download/release/latest-v24.x/docs/api/test.html',
    'Node.js 24.18.0',
    'Controls node:test suites, hooks, mocking, timers, concurrency, snapshots, coverage, and execution.',
  ],
  [
    'Node.js File System',
    'official-docs',
    'https://nodejs.org/download/release/latest-v24.x/docs/api/fs.html',
    'Node.js 24.18.0',
    'Controls promise filesystem operations, flags, sync, rename, permissions, path effects, and platform caveats.',
  ],
  [
    'Node.js Performance Hooks',
    'official-docs',
    'https://nodejs.org/download/release/latest-v24.x/docs/api/perf_hooks.html',
    'Node.js 24.18.0',
    'Controls performance timing, event-loop delay monitoring, histograms, and measurement boundaries.',
  ],
  [
    'npm package.json Documentation',
    'official-docs',
    'https://docs.npmjs.com/cli/v11/configuring-npm/package-json',
    'npm current 2026-07-15',
    'Controls package type, main, exports, files, bin, engines, dependencies, and publishing metadata.',
  ],
  [
    'HTTP Semantics RFC 9110',
    'standards-body',
    'https://www.rfc-editor.org/rfc/rfc9110',
    'RFC 9110',
    'Controls GET, status, representations, fields, redirects, and HTTP semantics.',
  ],
  [
    'HTTP Caching RFC 9111',
    'standards-body',
    'https://www.rfc-editor.org/rfc/rfc9111',
    'RFC 9111',
    'Controls cache storage, freshness, validators, invalidation, and private versus shared semantics.',
  ],
  [
    'OWASP SSRF Prevention Cheat Sheet',
    'recognized-security-framework',
    'https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html',
    'Current 2026-07-15',
    'Controls fixed destinations, allowlists, validation, redirect policy, and controlled network transfer checks.',
  ],
  [
    'Web Content Accessibility Guidelines 2.2',
    'standards-body',
    'https://www.w3.org/TR/WCAG22/',
    'W3C Recommendation 2024-12-12',
    'Controls keyboard operation, focus, non-color meaning, target size, status messages, contrast, text alternatives, and motion in the course UI and transferable output design.',
  ],
].map(([title, authority, url, version, scope]) => ({
  title,
  authority:
    authority === 'official-docs' ||
    authority === 'official-source' ||
    authority === 'official-vendor-docs'
      ? 'official-docs'
      : 'standard',
  url,
  version,
  reviewedAt: REVIEWED_AT,
  scope,
}));

export const buildPokedexTypescriptConfig = finalizeCourse(
  {
    id: 'build-pokedex-typescript',
    title: 'Build a Production-Grade Pokedex in TypeScript',
    version: '2026.07',
    audience: {
      description:
        'TypeScript learners ready to integrate strict runtime boundaries, a Node command lifecycle, Fetch, async state, fair-use caching, cancellation, persistence, security, testing, packaging, and operations into one cumulative learning product.',
      entryKnowledge: [
        'Write, strictly type, test, emit, and run modular TypeScript with unions, narrowing, generics, promises, modules, and immutable state patterns.',
        'Construct bounded Fetch requests and validate status, response bytes, unknown JSON, retries, cancellation, and error causes.',
        'Use Git and repository quality gates to preserve revision, lockfile, format, lint, type, test, security, package, and release evidence.',
      ],
      deviceConstraints: [
        'Desktop or tablet with a modern browser; native readline, Fetch, signal, filesystem, package, handle, and cross-platform transfer labs require a supported Node 24 environment.',
      ],
      accessibilityAssumptions: [
        'All terminal traces, async timelines, tables, code, and project evidence require structured text, keyboard operation, visible focus, non-color meaning, restrained announcements, zoom, and reduced-motion support.',
      ],
    },
    scope: {
      includes: [
        'A cumulative accessible TypeScript and Node Pokedex command product using documented PokéAPI pagination, Pokemon, and location-area contracts',
        'Unknown JSON validation, strict view models, Fetch and AbortSignal ownership, immutable async state, fair-use caching, Promise deduplication, persistence, and recovery',
        'Original deterministic browser models plus controlled TypeScript 7, Node 24, emitted-runtime, readline, network, filesystem, package, handle, load, and release transfer gates',
        'Five distinct stakeholder projects and a cumulative performance defense',
      ],
      excludes: [
        'Translated copies of the Go course, copied curriculum prose, copied solutions, or copied project implementations',
        'Unbounded live PokéAPI traffic, scraping, undocumented endpoints, authentication bypass, or availability guarantees',
        'Claims that TypeScript types or browser execution prove runtime JSON, Node, filesystem, network, terminal, load, accessibility, or production behavior',
      ],
      nextCourses: [
        'build-blog-aggregator-typescript',
        'build-web-scraper-typescript',
        'capstone-project',
      ],
    },
    sources,
    modules,
    projects: [
      project(
        'pokedex-ts-museum-kiosk',
        'Inclusive Museum Pokedex Kiosk Command',
        'pokedex-ts-pagination-view-model',
        'A natural-history museum education and accessibility group',
        'They need an understandable keyboard-first command journey with generated help, runtime-validated PokéAPI pagination, stale-response protection, stable structured output, and exact learning evidence.',
        [
          'pokedex-ts-learner-outcome',
          'pokedex-ts-readline-interface',
          'pokedex-ts-command-runtime-narrowing',
          'pokedex-ts-pagination-runtime-shape',
          'pokedex-ts-request-generation',
        ]
      ),
      project(
        'pokedex-ts-classroom-research',
        'Fair-Use Classroom Research Navigator',
        'pokedex-ts-promise-dedup-ownership',
        'A classroom research program and public API stewardship team',
        'They need repeatable page and detail research with strict unknown validation, canonical cache identity, TTL and capacity, Promise duplicate suppression, independent abort, and responsible request evidence.',
        [
          'pokedex-ts-json-unknown-boundary',
          'pokedex-ts-fair-use-contract',
          'pokedex-ts-cache-key',
          'pokedex-ts-independent-waiter-abort',
          'pokedex-ts-dedup-schedule-tests',
        ]
      ),
      project(
        'pokedex-ts-event-collection',
        'Async Community Event Collection Desk',
        'pokedex-ts-bounded-async-prefetch',
        'A community science event serving families on unstable shared networks',
        'They need validated details and encounters, replayable catch state, offline owned inspection, recoverable failures, bounded async prefetch, signal-aware closure, and no stale or hidden state changes.',
        [
          'pokedex-ts-detail-validator',
          'pokedex-ts-collection-reducer',
          'pokedex-ts-encounter-provenance',
          'pokedex-ts-abort-tree',
          'pokedex-ts-task-ownership',
        ]
      ),
      project(
        'pokedex-ts-offline-catalog',
        'Offline Inclusive Catalog Migration',
        'pokedex-ts-node-test-type-evidence',
        'A mobile library technology team maintaining donated computers',
        'They need versioned bounded collection files, pure migration models, safe Node transfer, accessible exports, SSRF and terminal defenses, runtime fault cases, compile-negative evidence, and installed CLI tests.',
        [
          'pokedex-ts-accessible-export',
          'pokedex-ts-file-unknown-validation',
          'pokedex-ts-prototype-safe-validation',
          'pokedex-ts-compile-negative-evidence',
          'pokedex-ts-async-cli-leak-tests',
        ]
      ),
      project(
        'pokedex-ts-production-defense',
        'TypeScript Pokedex Release and Recovery Defense',
        'pokedex-ts-release-recovery-defense',
        'A joint learner, product, accessibility, security, API-steward, Node, release, operations, and support board',
        'The board needs source-bound emitted and packed artifacts, strict and runtime evidence, fair-use capacity findings, rehearsed async and persistence failures, migration, rollback, restore, stakeholder proof, and owned residual risks.',
        [
          'pokedex-ts-capacity-regression',
          'pokedex-ts-artifact-smoke-matrix',
          'pokedex-ts-e2e-artifact-reconciliation',
          'pokedex-ts-release-defense',
          'pokedex-ts-residual-risk',
        ]
      ),
    ],
    examContext:
      'Unfamiliar TypeScript Pokedex cases spanning learning and session contracts, Node 24 and TypeScript 7 reproduction, readline lifecycle, runtime command narrowing, accessible output, fixed-origin PokéAPI resources, unknown JSON admission, Fetch and AbortSignal ownership, stale-safe pagination and history, fair-use TTL caching, Promise duplicate suppression, detail views, immutable catch and owned collection flows, location encounters, causal error results, signal shutdown, bounded async scheduling, versioned atomic Node persistence, SSRF, prototype, terminal, path and resource security, node:test runtime and compile-negative evidence, handle and rejection cleanup, privacy-minimized observability, event-loop capacity, ESM package distribution, migration, rollback, restore, recovery, and residual-risk defense with explicit browser, compiler, and controlled Node boundaries.',
    minimumQuestionBankSize: 760,
  },
  {
    researchedAt: RESEARCHED_AT,
    prerequisiteCourseIds: [
      'typescript-basics',
      'http-clients-typescript',
      'git-basics',
      'repository-quality-gates',
    ],
  }
);

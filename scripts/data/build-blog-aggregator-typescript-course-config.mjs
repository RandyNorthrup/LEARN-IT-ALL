import { finalizeCourse, project, skill } from './course-config-helpers.mjs';

const REVIEWED_AT = '2026-07-15';
const RESEARCHED_AT = '2026-07-15T20:00:00.000Z';

function outcome(id, statement, misconception, knowledgeType = 'procedural', level = 'apply') {
  if (!misconception) throw new Error(`Missing misconception for TypeScript feed competency ${id}`);
  return skill(id, statement, misconception, knowledgeType, level);
}

function feedModule(id, title, context, artifact, skillSpecs) {
  const skills = skillSpecs.map((entry) => outcome(...entry));
  return {
    id,
    title,
    context,
    artifact,
    objectives: skills.slice(0, 3).map((entry) => entry[1]),
    skills,
    contexts: {
      theory: `${context} Predict the reader decision, external-unknown boundary, Promise and AbortSignal ownership, PostgreSQL transaction, failure, and observable evidence before reading the governing source.`,
      workshop: `A disability-led research network incrementally builds ${artifact} from original RSS, Atom, HTTP, PostgreSQL, and browser fixtures while retaining prior TypeScript, Node, HTTP-client, Express, SQL, Git, accessibility, security, testing, async-cleanup, and recovery requirements.`,
      debug: `A preserved TypeScript feed-service trace contains one plausible discovery, URL, XML, validator, Fetch, stream, SQL, transaction, Promise, lease, Express, accessibility, migration, or release defect; find the earliest invalid transition before editing.`,
      lab: `An independent university archive receives a different publisher mix, unknown XML shape, validator state, tenant, async schedule, database condition, accessibility need, platform, and injected failure and transfers ${title.toLowerCase()} into a changed ${artifact}.`,
      review: `A delayed incident review reconstructs ${title.toLowerCase()} from source and emitted revision, tenant, URL, validator, bytes, runtime validation, Promise settlement, transaction, lease, response, failure, handle cleanup, and recovery evidence.`,
      quiz: `A release reviewer compares near-miss TypeScript decisions for ${title.toLowerCase()} and accepts only runtime and compiler evidence, explicit non-claims, and named browser, Node, network, XML, PostgreSQL, handle, load, accessibility, deployment, and production transfer gates.`,
    },
  };
}

const modules = [
  feedModule(
    'feed-ts-reader-outcomes-product-contract',
    'Reader Outcomes, Publisher Respect, and Product Contract',
    'A team proposes a blog aggregator from a feature list but has not defined reader decisions, publisher obligations, freshness, content harm, accessibility, privacy, or mastery evidence.',
    'inclusive feed-reader product contract',
    [
      [
        'feed-ts-reader-job',
        'Define reader population, decision, task journey, accepted delay, failure harm, and observable learning or research value.',
        'More aggregated posts automatically create more reader value.',
        'strategic',
        'create',
      ],
      [
        'feed-ts-publisher-duty',
        'Specify respectful identification, fetch cadence, caching, correction, deletion, source pause, and incident contact behavior.',
        'A public feed has no publisher-side operational or ethical constraints.',
        'professional',
        'evaluate',
      ],
      [
        'feed-ts-product-boundaries',
        'Separate source discovery, ingestion, storage, scheduling, API, reader state, and presentation with explicit accepted unknowns.',
        'A single Express application object is the complete architecture.',
      ],
      [
        'feed-ts-inclusive-outcomes',
        'Require keyboard, semantics, reflow, focus, status, non-color, content-safety, and assistive-technology evidence for core reader tasks.',
        'Backend projects have no accessibility outcomes.',
      ],
      [
        'feed-ts-acceptance-matrix',
        'Define changed-format, malformed XML, stale response, async reorder, tenant, cancellation, restore, and unfamiliar-reader cases.',
        'One successful end-to-end demonstration proves mastery.',
        'metacognitive',
        'create',
      ],
    ]
  ),
  feedModule(
    'feed-ts-runtime-repository-stack',
    'Node 24, TypeScript 7, ESM, Dependencies, and Clean Reproduction',
    'The prototype runs through a development loader with floating packages, unchecked emitted JavaScript, no migration version, warm installs, and uncertain Node compatibility.',
    'reproducible TypeScript feed-service repository',
    [
      [
        'feed-ts-runtime-contract',
        'Pin Node 24.18.0, TypeScript 7.0.2 plus the TypeScript 6.0.2 compatibility surface, ESM semantics, package manager, and platform matrix.',
        'TypeScript types erase all Node runtime and module-version differences.',
      ],
      [
        'feed-ts-dependency-contract',
        'Pin Express 5.2.1, pg 8.22.0, fast-xml-parser 5.10.0, Zod 4.4.3, Pino 10.3.1, PostgreSQL 18.4, and migration tooling from reviewed sources.',
        'Latest package versions are compatible because npm resolves them.',
      ],
      [
        'feed-ts-source-emission-map',
        'Bind strict source, configuration, generated migrations or schemas, source maps, emitted JavaScript, package exports, and startup entry.',
        'Passing noEmit type-check proves the shipped JavaScript works.',
      ],
      [
        'feed-ts-supply-chain-baseline',
        'Review dependency purpose, transitive graph, lifecycle scripts, provenance, licenses, advisories, secrets, and upgrade owner.',
        'A lockfile proves package safety and provenance.',
      ],
      [
        'feed-ts-clean-reproduction',
        'Run clean install, generation, migration validation, strict and compatibility types, lint, tests, package inspection, emitted smoke, and vulnerability gates.',
        'A hot-reload development run is reproducible evidence.',
      ],
    ]
  ),
  feedModule(
    'feed-ts-architecture-async-ownership',
    'Ports, Immutable Domain Values, Promise Ownership, and Lifecycle',
    'Modules import global pools and fetch directly, promises float, AbortSignals are replaced, mutable objects cross layers, and shutdown cannot enumerate active handles.',
    'explicitly owned TypeScript service graph',
    [
      [
        'feed-ts-directed-dependencies',
        'Direct domain, application, fetch, parser, repository, scheduler, HTTP, and presentation dependencies through narrow typed ports.',
        'Interfaces around every function automatically create useful boundaries.',
      ],
      [
        'feed-ts-immutable-domain',
        'Represent admitted identifiers, instants, URLs, states, and results as readonly values created only after runtime checks.',
        'Readonly TypeScript declarations make external objects immutable at runtime.',
      ],
      [
        'feed-ts-promise-ownership',
        'Assign every Promise a caller, awaited settlement, cancellation policy, error path, concurrency budget, and shutdown consequence.',
        'The event loop will safely finish floating Promises before exit.',
      ],
      [
        'feed-ts-abort-tree',
        'Compose caller, timeout, shutdown, and job-ownership signals without losing the abort reason or leaking listeners.',
        'One global AbortController is sufficient for every request and worker.',
      ],
      [
        'feed-ts-lifecycle-ledger',
        'Inventory timers, streams, sockets, pool clients, background tasks, listeners, and close order with live-handle evidence.',
        'Returning from main proves all Node resources closed.',
      ],
    ]
  ),
  feedModule(
    'feed-ts-discovery-url-ssrf',
    'Feed Discovery, WHATWG URL Identity, Redirects, and SSRF',
    'User input becomes a Fetch destination, HTML links are selected by substring, URL objects are mutated as cache keys, redirects bypass address checks, and DNS rebinding is ignored.',
    'authorized TypeScript discovery policy',
    [
      [
        'feed-ts-direct-discovery-mode',
        'Distinguish direct feeds from bounded HTML autodiscovery and require explicit source intent and supported media evidence.',
        'Every website has exactly one discoverable feed.',
      ],
      [
        'feed-ts-alternate-link-admission',
        'Admit supported alternate RSS or Atom links, resolve against the final document URL, deduplicate, rank transparently, and bound candidates.',
        'A link whose href contains feed is trustworthy discovery evidence.',
      ],
      [
        'feed-ts-url-identity',
        'Use WHATWG URL parsing and a documented equivalence policy without collapsing query, case, port, path, fragment, or percent-encoding distinctions unsafely.',
        'Calling URL.toString produces a universally canonical source identity.',
      ],
      [
        'feed-ts-ssrf-network-policy',
        'Validate schemes, credentials, ports, redirect hops, proxy use, DNS answers, address ranges, re-resolution, and egress controls at connection time.',
        'Zod URL validation prevents SSRF.',
      ],
      [
        'feed-ts-discovery-audit',
        'Retain submitted, parsed, resolved, redirected, selected, and rejected URL evidence with tenant, actor, policy, and bounded causes.',
        'The stored final URL fully explains source admission.',
      ],
    ]
  ),
  feedModule(
    'feed-ts-rss-atom-format-model',
    'RSS 2.0, Atom 1.0, Namespaces, Text Constructs, and Extensions',
    'One object shape is cast as every feed, prefixes stand in for namespaces, Atom content is treated as text, optional RSS fields are assumed, and extensions disappear.',
    'format-aware syndication model',
    [
      [
        'feed-ts-rss-semantics',
        'Model RSS channel and item requirements, GUID semantics, dates, links, authors, categories, enclosures, source, and optional variance.',
        'RSS 2.0 guarantees each item has an immutable URL.',
      ],
      [
        'feed-ts-atom-semantics',
        'Model Atom feed and entry IDs, authors, links, text and content constructs, categories, dates, xml:base, xml:lang, and source.',
        'Atom content is always plain text inside one field.',
      ],
      [
        'feed-ts-namespace-expanded-name',
        'Interpret expanded namespace names independently from chosen prefixes and preserve unsupported extension provenance.',
        'The literal prefix identifies an XML vocabulary.',
      ],
      [
        'feed-ts-date-content-variance',
        'Parse only explicit date and content variants, keep original values, and reject or quarantine ambiguity without silent invention.',
        'Date.parse accepts every meaningful syndication date correctly.',
      ],
      [
        'feed-ts-extension-governance',
        'Allowlist interpreted extensions, retain bounded unknowns, version policies, and test collisions or namespace changes.',
        'Casting unknown extensions to a record is forward compatible.',
      ],
    ]
  ),
  feedModule(
    'feed-ts-xml-parser-security',
    'fast-xml-parser Configuration, Entity Limits, Depth, and Dangerous Keys',
    'The parser accepts unbounded strings with defaults, expands document entities, permits dangerous property names, coerces values unpredictably, ignores depth, and returns any.',
    'hardened bounded XML parse adapter',
    [
      [
        'feed-ts-xml-byte-depth-limits',
        'Enforce wire, decoded, character, entity, expansion, nesting, attribute, item, text, and duration budgets before and during parsing.',
        'A maximum HTTP response size bounds all parser expansion and object allocation.',
      ],
      [
        'feed-ts-parser-option-contract',
        'Configure namespaces, attributes, text nodes, value coercion, arrays, order, entities, dangerous properties, allowed tags, and validation deliberately.',
        'Parser defaults are a stable security and domain contract.',
      ],
      [
        'feed-ts-doctype-entity-limits',
        'Reject or tightly bound DOCTYPE and custom entities using current max-count, depth, total-expansion, expanded-length, and external-reference policy.',
        'Pure JavaScript XML parsers cannot have entity-expansion failures.',
      ],
      [
        'feed-ts-dangerous-object-keys',
        'Reject or isolate prototype-like tag and attribute names before values enter normal objects, spreads, logs, or validators.',
        'TypeScript Record types prevent prototype pollution at runtime.',
      ],
      [
        'feed-ts-parser-failure-taxonomy',
        'Classify validation, malformed, depth, entity, encoding, dangerous-key, oversized, cancellation, and unsupported-format failures with bounded evidence.',
        'Catching Error and returning invalid feed is adequate diagnostics.',
      ],
    ]
  ),
  feedModule(
    'feed-ts-unknown-validation-normalization',
    'Unknown XML Objects, Zod Admission, Loss-Aware Normalization, and Provenance',
    'Parser output is asserted as a feed, unions narrow by property guesses, defaults erase absence, HTML enters domain values, and identity decisions cannot be reconstructed.',
    'runtime-validated normalized feed boundary',
    [
      [
        'feed-ts-unknown-boundary',
        'Keep parser and database JSON values unknown until discriminated format, structural, scalar, cardinality, and semantic runtime validation passes.',
        'A type assertion converts an unknown object into trustworthy data.',
      ],
      [
        'feed-ts-format-discriminated-union',
        'Build distinct validated RSS and Atom transport variants and exhaustively normalize each supported case.',
        'One permissive optional-field schema models every feed safely.',
      ],
      [
        'feed-ts-entry-identity-policy',
        'Select scoped stable identity from Atom ID, RSS GUID meaning, canonical link, or bounded fingerprint and report collisions.',
        'Title plus publication date is a safe universal entry key.',
      ],
      [
        'feed-ts-content-provenance',
        'Preserve text, escaped HTML, XHTML, external content, summary, raw date, timezone, language, base URL, and source field evidence.',
        'Converting everything to one string is harmless normalization.',
      ],
      [
        'feed-ts-normalization-loss-report',
        'Return admitted, defaulted, dropped, conflicting, and unsupported fields with parser and policy version for each changed fixture.',
        'A successful schema parse means normalization lost no meaning.',
      ],
    ]
  ),
  feedModule(
    'feed-ts-fetch-stream-abort-budget',
    'Fetch, Streams, AbortSignal, Conditional Requests, and Publisher Budgets',
    'The service calls response.text on unbounded bodies, uses one timeout signal, overwrites validators on parse failure, follows automatic redirects without policy, and retries every origin together.',
    'bounded publisher-friendly Fetch adapter',
    [
      [
        'feed-ts-fetch-signal-composition',
        'Compose caller, deadline, shutdown, and attempt signals, preserve abort reasons, and remove listeners through settled ownership.',
        'AbortSignal.timeout alone covers caller disconnect and shutdown.',
      ],
      [
        'feed-ts-stream-byte-budget',
        'Read response streams incrementally with wire, decoded, compression, character, time, and cancellation limits and release or cancel the body.',
        'response.text is safe when Content-Length looks small.',
      ],
      [
        'feed-ts-conditional-validator',
        'Send ETag and Last-Modified validators correctly, give If-None-Match precedence, handle 304 without a body, and commit validators only with admitted state.',
        'A 304 response should be reparsed from its empty body.',
      ],
      [
        'feed-ts-manual-redirect-policy',
        'Evaluate every redirect target, hop, loop, address, credential, method, and permanent-move decision before following.',
        'Fetch redirect follow mode preserves the original SSRF decision.',
      ],
      [
        'feed-ts-origin-rate-policy',
        'Enforce per-origin concurrency, minimum intervals, Retry-After, bounded backoff, jitter, identification, and stale escalation.',
        'A Promise concurrency limit distributes requests fairly across publishers.',
      ],
    ]
  ),
  feedModule(
    'feed-ts-postgres-schema-constraints',
    'PostgreSQL 18 Schema, Constraints, Keys, and Query-Driven Indexes',
    'The schema stores nested parser objects as JSON, URLs are mutable keys, tenant relationships are unchecked, text fields are unlimited, and indexes have no query evidence.',
    'constrained TypeScript feed-service relational model',
    [
      [
        'feed-ts-relational-domain',
        'Model tenants, principals, sources, feeds, subscriptions, entries, versions, people, categories, fetches, leases, and reader state with explicit ownership.',
        'One JSONB feed document preserves the best relational design.',
      ],
      [
        'feed-ts-stable-key-policy',
        'Use stable internal identifiers plus tenant-scoped external identities and preserve URL moves, aliases, and provenance.',
        'The latest normalized URL should be the primary key.',
      ],
      [
        'feed-ts-database-invariants',
        'Encode required fields, lengths, checks, states, unique scopes, foreign keys, cascades, and temporal rules in PostgreSQL.',
        'Zod validation makes database constraints unnecessary.',
      ],
      [
        'feed-ts-index-evidence',
        'Pair B-tree, partial, expression, covering, and GIN indexes with actual query shapes, selectivity, write cost, plans, and removal criteria.',
        'Adding an index to every filter column is harmless.',
      ],
      [
        'feed-ts-tenant-keying',
        'Carry tenant scope through keys, constraints, repository signatures, SQL, tests, metrics, caches, and exports.',
        'Express middleware that sets tenantId prevents cross-tenant rows.',
      ],
    ]
  ),
  feedModule(
    'feed-ts-migrations-expand-contract',
    'Versioned SQL Migrations, Backfills, Compatibility, and Recovery',
    'Startup mutates schema, migration files change after release, long updates block service, old and new binaries disagree, and rollback has never been rehearsed.',
    'compatible TypeScript service migration chain',
    [
      [
        'feed-ts-migration-ledger',
        'Keep immutable ordered migrations, checksums, ownership, lock behavior, status inspection, and generated artifact review under source control.',
        'Editing an applied migration is safe if production already succeeded.',
      ],
      [
        'feed-ts-ddl-transaction-policy',
        'Choose transactional and nontransactional boundaries for locks, concurrent indexes, data changes, and failure recovery.',
        'Every migration should run in one JavaScript transaction callback.',
      ],
      [
        'feed-ts-expand-contract-sequence',
        'Stage additive schema, bounded backfill, compatibility reads and writes, validation, cutover, and cleanup across deployed versions.',
        'A database rename becomes visible atomically to every Node process.',
      ],
      [
        'feed-ts-resumable-backfill',
        'Batch, checkpoint, throttle, cancel, retry, observe, and reconcile data backfills without event-loop or lock starvation.',
        'One SQL UPDATE is always the safest and fastest backfill.',
      ],
      [
        'feed-ts-migration-test-matrix',
        'Test empty install, real upgrade, version skew, interruption, retry, forward repair, rollback boundary, backup restore, and deployment coordination.',
        'An empty-database migration test proves production upgrade behavior.',
      ],
    ]
  ),
  feedModule(
    'feed-ts-pg-pool-transaction-lifecycle',
    'node-postgres Pool, Client Ownership, Transactions, and Shutdown',
    'Each request creates a pool, transaction statements call pool.query, checked-out clients leak on error, row values are trusted, and process exit races pool timers.',
    'bounded pg repository and transaction port',
    [
      [
        'feed-ts-pool-lifecycle',
        'Create one bounded Pool, handle background errors, observe acquire waits, reject work during closure, and await pool.end after workers settle.',
        'A pool per handler isolates transactions and frees connections sooner.',
      ],
      [
        'feed-ts-client-release',
        'Release every successfully acquired client in finally, preserve the original error, and test error, cancellation, and shutdown paths.',
        'The pool automatically reclaims clients when a Promise rejects.',
      ],
      [
        'feed-ts-one-client-transaction',
        'Run BEGIN, every statement, COMMIT or ROLLBACK on the same checked-out client and prohibit pool.query inside the unit of work.',
        'Queries issued through one Pool automatically share a transaction.',
      ],
      [
        'feed-ts-row-runtime-validation',
        'Treat query rows as external values, request explicit columns, validate scalar and null states, and reject cardinality or schema drift.',
        'Generic query result types verify PostgreSQL values at runtime.',
      ],
      [
        'feed-ts-postgres-error-policy',
        'Narrow unknown errors into constraint, serialization, deadlock, timeout, cancel, connection, and unknown causes without message matching or leakage.',
        'All pg errors are safe Error instances with stable text.',
      ],
    ]
  ),
  feedModule(
    'feed-ts-source-subscription-lifecycle',
    'Shared Sources, Tenant Subscriptions, State Machines, and Races',
    'Equivalent URLs create duplicate pollers, unfollow removes shared entries, source state is a boolean, IDs imply authorization, and check-then-insert races remain.',
    'idempotent shared-source subscription service',
    [
      [
        'feed-ts-source-registration',
        'Register an approved discovered source idempotently from identity, provenance, parser evidence, and current policy.',
        'Every tenant requires a separate publisher source and fetch schedule.',
      ],
      [
        'feed-ts-subscription-state',
        'Create and remove tenant-scoped follows without deleting shared source history and expose explicit desired-state semantics.',
        'A toggle follow endpoint is retry safe.',
      ],
      [
        'feed-ts-source-state-machine',
        'Model pending, active, paused, moved, failing, disabled, deleted, and appealed transitions with actors and causes.',
        'An active boolean captures every operational state.',
      ],
      [
        'feed-ts-source-authorization',
        'Authorize administration, subscription, moderation, export, and deletion from principal, tenant, role, relationship, and state.',
        'Possession of a UUID is sufficient authorization.',
      ],
      [
        'feed-ts-registration-race',
        'Use unique constraints, conflict reads, transaction retry, and equivalent-identity tests to reconcile concurrent registration.',
        'Checking before inserting prevents duplicate sources.',
      ],
    ]
  ),
  feedModule(
    'feed-ts-entry-upsert-revision-history',
    'Entry Identity, Idempotent Upserts, Version History, and Tombstones',
    'Repeated polls duplicate entries, corrected content overwrites evidence, GUID collisions merge sources, missing items disappear immediately, and retries repeat notifications.',
    'versioned idempotent entry repository',
    [
      [
        'feed-ts-scoped-entry-key',
        'Scope external IDs to feed and format semantics, detect collisions, and preserve the raw identity basis and parser version.',
        'RSS GUID values are globally unique URLs.',
      ],
      [
        'feed-ts-upsert-outcome-union',
        'Return explicit inserted, unchanged, revised, conflicting, quarantined, or rejected results from atomic constraints and comparison.',
        'ON CONFLICT DO UPDATE is self-explanatory idempotency.',
      ],
      [
        'feed-ts-content-versioning',
        'Store bounded meaningful revisions with field diff, fetch identity, timestamps, and correction or moderation cause.',
        'Only the newest normalized object is useful evidence.',
      ],
      [
        'feed-ts-disappearance-tombstone',
        'Treat absence as weak evidence and apply policy-driven retention, publisher deletion, correction, hidden, or tombstone states.',
        'If an item is absent from one response it should be deleted.',
      ],
      [
        'feed-ts-replay-convergence',
        'Test repeated, reordered, corrected, collided, moved, partial, and retried feed versions converge without duplicate effects.',
        'Calling the same async function twice proves replay safety.',
      ],
    ]
  ),
  feedModule(
    'feed-ts-ingestion-orchestration',
    'Async Fetch-to-Commit Orchestration, Results, and Side-Effect Ordering',
    'Nested promises mutate shared state, validators save before entries, half-imports become visible, telemetry reports success before commit, and post-commit work can duplicate.',
    'atomic typed ingestion orchestration',
    [
      [
        'feed-ts-ingestion-state-union',
        'Represent claim, fetch, parse, validate, normalize, commit, publish, fail, cancel, and supersede states as exhaustive discriminated results.',
        'Thrown exceptions alone describe the ingestion state machine.',
      ],
      [
        'feed-ts-no-shared-mutation',
        'Pass immutable stage outputs and commit only one admitted unit rather than mutating a shared feed object across awaits.',
        'Single-threaded JavaScript prevents async state races.',
      ],
      [
        'feed-ts-transactional-commit',
        'Commit feed, entries, revisions, validators, schedule, lease, and audit evidence together or retain the previous admitted version.',
        'Awaiting inserts sequentially creates an atomic import.',
      ],
      [
        'feed-ts-postcommit-effects',
        'Publish notifications or downstream tasks only from durable outbox or equivalent committed evidence with stable idempotency keys.',
        'A safe HTTP fetch makes every later side effect retry safe.',
      ],
      [
        'feed-ts-ingestion-reconciliation',
        'Reconcile bytes, parsed, admitted, inserted, revised, unchanged, rejected, committed, and published counts across changed cases.',
        'The parser item count is the ingestion success metric.',
      ],
    ]
  ),
  feedModule(
    'feed-ts-scheduler-timer-ownership',
    'Durable Due Scheduling, Clock Injection, Timers, Backoff, and Pause',
    'setInterval scans every source, timers overlap when work is slow, system clock changes reorder jobs, failures synchronize retries, and close leaves handles active.',
    'durable handle-clean adaptive scheduler',
    [
      [
        'feed-ts-persisted-due-state',
        'Persist next attempt, last success, failure streak, publisher guidance, pause cause, and schedule reason outside process timers.',
        'setInterval is a durable job scheduler.',
      ],
      [
        'feed-ts-clock-port',
        'Inject clock and sleep ports, distinguish elapsed from civil time, define boundary equality, and test skew and jumps.',
        'Date.now calls are deterministic enough for scheduler tests.',
      ],
      [
        'feed-ts-nonoverlap-timer',
        'Schedule the next bounded timer only after ownership and settlement, unref deliberately, clear on close, and expose handle evidence.',
        'setInterval never overlaps because JavaScript is single threaded.',
      ],
      [
        'feed-ts-backoff-jitter',
        'Compute bounded retry delay from failure class, streak, Retry-After, deterministic-testable jitter, reset, and maximum staleness.',
        'Math.random plus exponential delay is a complete retry contract.',
      ],
      [
        'feed-ts-pause-resume-policy',
        'Model manual, policy, repeated-failure, incident, deletion, and maintenance pauses with authorization, evidence, and safe resume.',
        'Removing a timer fully explains why a source is paused.',
      ],
    ]
  ),
  feedModule(
    'feed-ts-postgres-lease-fencing',
    'SKIP LOCKED Claims, Lease Tokens, Fencing, and Multi-Instance Fairness',
    'Replicas select the same due rows, transactions remain open during fetch, stale workers commit late data, heartbeats renew foreign work, and priority starves small tenants.',
    'fenced PostgreSQL fetch-claim protocol',
    [
      [
        'feed-ts-short-claim',
        'Claim a small ordered due batch with FOR UPDATE SKIP LOCKED in one short transaction and return immutable attempt records.',
        'Keeping the transaction open across Fetch preserves ownership safely.',
      ],
      [
        'feed-ts-fencing-token',
        'Issue owner, attempt, generation, expiry, and heartbeat budgets so stale or replaced workers cannot finalize.',
        'A worker ID and future timestamp prove ownership.',
      ],
      [
        'feed-ts-affected-row-finalize',
        'Finalize only when source, attempt, token, generation, state, and lease match and require exactly one affected row.',
        'Late successful work may overwrite a newer failed attempt.',
      ],
      [
        'feed-ts-queue-fairness',
        'Define due, priority, tenant, origin, failure, and starvation ordering with bounded batches and changed-load tests.',
        'ORDER BY due_at ensures fair multi-tenant service.',
      ],
      [
        'feed-ts-lease-fault-matrix',
        'Test crash, timeout, heartbeat loss, duplicate claim, connection loss, cancellation, stale completion, and database recovery.',
        'SKIP LOCKED prevents every duplicate or lost job.',
      ],
    ]
  ),
  feedModule(
    'feed-ts-bounded-promise-workers',
    'Bounded Promise Workers, Origin Fairness, Failure Isolation, and Drain',
    'Promise.all launches every source, one rejection hides other settlements, one publisher consumes slots, abort listeners accumulate, and shutdown does not await workers.',
    'origin-aware bounded async ingestion pool',
    [
      [
        'feed-ts-multiresource-budget',
        'Derive global, origin, tenant, database, memory, queue, and event-loop budgets and enforce the tightest active limit.',
        'Promise.allSettled makes unbounded work safe.',
      ],
      [
        'feed-ts-worker-ownership',
        'Track queued, running, settling, canceled, failed, and completed jobs with exactly one owner and one terminal result.',
        'An array of Promises is a sufficient worker registry.',
      ],
      [
        'feed-ts-origin-fairness',
        'Schedule per-origin work without monopolization while respecting per-publisher cadence and useful global throughput.',
        'A FIFO array automatically treats publishers fairly.',
      ],
      [
        'feed-ts-error-isolation',
        'Capture unknown rejection causes, settle every owned task, release claims, avoid unhandled rejections, and preserve pool health.',
        'Attaching one catch to Promise.all records every worker error.',
      ],
      [
        'feed-ts-drain-handles',
        'Stop claims, abort fetches, await settlements, expire or finalize leases, clear timers and listeners, close the pool, and assert no unexpected handles.',
        'Calling process.exit is a reliable graceful shutdown.',
      ],
    ]
  ),
  feedModule(
    'feed-ts-express-resource-layers',
    'Express 5 Resource Design, Middleware Order, Async Errors, and Cancellation',
    'Routes mirror tables, middleware mutates unvalidated request objects, async failures fall through inconsistently, responses double-send, and disconnects do not cancel dependencies.',
    'layered Express 5 feed-reader API',
    [
      [
        'feed-ts-api-resource-decisions',
        'Design sources, subscriptions, entries, timelines, search, and reader-state resources around client decisions and method semantics.',
        'A CRUD router for each table is a coherent public API.',
      ],
      [
        'feed-ts-middleware-order',
        'Order authority, request identity, limits, authentication, negotiation, validation, authorization, handlers, not-found, and error middleware explicitly.',
        'Express automatically chooses the safest middleware order.',
      ],
      [
        'feed-ts-async-error-path',
        'Use Express 5 Promise rejection flow while preventing double next, double send, partial response, and lost unknown causes.',
        'Any thrown async value is a safe Error with a public message.',
      ],
      [
        'feed-ts-request-abort',
        'Compose request close, timeout, shutdown, and application ownership and propagate cancellation without undoing committed background jobs.',
        'Node automatically cancels Fetch and PostgreSQL work on client disconnect.',
      ],
      [
        'feed-ts-response-finality',
        'Track headers, streaming, terminal response, cleanup, and error behavior so every request has one bounded outcome.',
        'Checking res.headersSent eliminates every response race.',
      ],
    ]
  ),
  feedModule(
    'feed-ts-runtime-request-problem-contracts',
    'Runtime Request Schemas, Negotiation, Problem Details, and OpenAPI',
    'Request types are trusted from Express generics, coercion changes meaning, unknown keys pass silently, errors expose internals, and documentation drifts from runtime behavior.',
    'runtime-validated documented API boundary',
    [
      [
        'feed-ts-request-unknown-admission',
        'Validate params, query, headers, body, content type, size, cardinality, and unknown fields before constructing a command.',
        'Express request generic parameters validate client data at runtime.',
      ],
      [
        'feed-ts-coercion-policy',
        'Define string, number, boolean, date, enum, array, empty, repeated, and default coercion explicitly and test ambiguity.',
        'Zod coercion always matches HTTP client intent.',
      ],
      [
        'feed-ts-problem-details',
        'Map stable domain and infrastructure causes to bounded RFC 9457 types, statuses, field evidence, correlation, and retry guidance.',
        'Returning error.message is the most transparent API design.',
      ],
      [
        'feed-ts-content-negotiation',
        'Negotiate media, charset, language, compression, conditional behavior, and unsupported variants without accidental fallbacks.',
        'JSON endpoints can ignore Accept and Content-Type.',
      ],
      [
        'feed-ts-openapi-conformance',
        'Generate or compare OpenAPI 3.2 operations and schemas against runtime validators, auth, examples, errors, pagination, and compatibility tests.',
        'A generated OpenAPI file cannot drift from actual middleware.',
      ],
    ]
  ),
  feedModule(
    'feed-ts-auth-tenant-privacy',
    'Authentication, Resource Authorization, Tenant Isolation, and Reader Privacy',
    'User identity comes from arbitrary headers, middleware role checks replace resource policy, shared sources expose private follows, logs contain tokens and searches, and deletion is undefined.',
    'privacy-minimized tenant authorization system',
    [
      [
        'feed-ts-token-verification',
        'Verify issuer, audience, allowed algorithm, signature, time, key lifecycle, and transport before creating a minimal readonly principal.',
        'Parsing JWT claims proves authentication.',
      ],
      [
        'feed-ts-resource-policy',
        'Authorize application commands from principal, tenant, role, ownership, relationship, purpose, and current state rather than route alone.',
        'Authentication middleware makes later resource access safe.',
      ],
      [
        'feed-ts-tenant-repository-contract',
        'Require tenant scope in repository methods, SQL, keys, constraints, caches, tests, metrics, exports, support, and admin operations.',
        'A request-scoped tenant property prevents repository mistakes.',
      ],
      [
        'feed-ts-reader-data-minimization',
        'Limit collection, use, retention, access, export, and deletion of follows, read state, searches, content warnings, and device metadata.',
        'Personalization data is operational and therefore nonsensitive.',
      ],
      [
        'feed-ts-security-audit-redaction',
        'Audit actor, decision, resource, outcome, and correlation while redacting tokens, private URLs, feed content, search text, SQL, and secrets.',
        'Logging full request objects provides the best security audit.',
      ],
    ]
  ),
  feedModule(
    'feed-ts-cursor-pagination-timeline',
    'Stable Cursor Timelines, Filters, Reverse Navigation, and Reflow',
    'Offset pages drift under inserts, timestamps tie, cursor JSON is trusted, filter changes reuse cursors, backward queries invert incorrectly, and UI requires infinite scroll.',
    'stable accessible entry timeline',
    [
      [
        'feed-ts-deterministic-sort',
        'Choose a documented total order with unique tie-breaker and state which edits can move an entry.',
        'publishedAt alone orders every row stably.',
      ],
      [
        'feed-ts-signed-cursor-schema',
        'Runtime-validate version, tenant, direction, sort values, filters, expiry, and integrity without granting authority or query control.',
        'Base64 encoding makes cursor JSON safe.',
      ],
      [
        'feed-ts-keyset-predicate',
        'Implement forward and reverse keyset predicates aligned with sort, null policy, index, limit-plus-one, and output reversal.',
        'Changing greater-than to less-than is complete backward pagination.',
      ],
      [
        'feed-ts-changing-page-tests',
        'Test ties, inserts, revisions, deletions, hidden entries, filter drift, expiry, empty pages, and repeated navigation.',
        'A seeded static table proves cursor correctness.',
      ],
      [
        'feed-ts-pagination-reader-ux',
        'Provide keyboard-operable next and previous navigation, focus continuity, result context, URL state, reflow, and no infinite-scroll dependency.',
        'Cursor APIs require endless scrolling in the UI.',
      ],
    ]
  ),
  feedModule(
    'feed-ts-postgres-search-safe-snippets',
    'PostgreSQL Search, Language Policy, Ranking, Plans, and Safe Snippets',
    'Queries concatenate text, raw HTML becomes tsvector input, one language is assumed, rank looks objective, snippets return unsafe tags, and expensive searches lack budgets.',
    'bounded runtime-validated reader search',
    [
      [
        'feed-ts-search-document',
        'Build weighted tsvector documents from admitted safe text with language, provenance, refresh, and deletion policy.',
        'Raw publisher HTML produces the most accurate full-text index.',
      ],
      [
        'feed-ts-search-query-admission',
        'Validate length, token count, mode, language, filters, and empty results before using parameterized plainto, websearch, or explicit tsquery.',
        'Parameterized to_tsquery makes every user search valid and cheap.',
      ],
      [
        'feed-ts-gin-plan-regression',
        'Verify representative GIN-backed plans, selectivity, scale, write amplification, latency, row limits, and plan-change thresholds.',
        'Creating a GIN index proves PostgreSQL will always choose it.',
      ],
      [
        'feed-ts-ranking-policy',
        'Combine text rank, recency, source preferences, and deterministic tie-breakers with transparent non-objective semantics.',
        'ts_rank_cd is a universally fair relevance score.',
      ],
      [
        'feed-ts-safe-search-snippet',
        'Return bounded safe text snippets or sanitize controlled markers and validate every field before rendering.',
        'ts_headline output is trusted HTML because PostgreSQL generated it.',
      ],
    ]
  ),
  feedModule(
    'feed-ts-accessible-reader-rendering',
    'Accessible Reader UI, Untrusted Markup, Safe Links, and Dynamic Status',
    'React renders sanitized content inconsistently, source links can deceive, cards rely on color, live refresh steals focus, images lack useful alternatives, and narrow layouts clip metadata.',
    'content-safe inclusive research reader',
    [
      [
        'feed-ts-untrusted-publisher-values',
        'Treat every title, person, summary, content, image, category, language, date, and URL as untrusted even after XML validation.',
        'Zod string validation makes publisher content safe to render.',
      ],
      [
        'feed-ts-render-sanitization-port',
        'Prefer text, isolate a versioned allowlist sanitizer for justified HTML, rewrite links, block active content, and test changed policies.',
        'React escaping and dangerouslySetInnerHTML cover all content cases automatically.',
      ],
      [
        'feed-ts-semantic-reading-structure',
        'Use logical headings, landmarks, lists, source and date metadata, language, descriptive links, content warnings, and provenance.',
        'Card components communicate enough semantic structure.',
      ],
      [
        'feed-ts-focus-live-status',
        'Keep complete keyboard operation, visible focus, large targets, polite refresh and error announcements, and stable focus after updates or pagination.',
        'A live region can announce every update without overwhelming users.',
      ],
      [
        'feed-ts-reflow-media-motion',
        'Support zoom and narrow reflow, reduced motion, non-color state, image alternatives, user-controlled media, and structured text fallback.',
        'Passing one automated accessibility scan proves the reader experience.',
      ],
    ]
  ),
  feedModule(
    'feed-ts-reader-state-conflicts',
    'Personal Reader State, Idempotent Commands, Bulk Results, and Conflicts',
    'Toggle endpoints are retried, shared entries hold user state, bulk updates partially vanish, device writes overwrite silently, tags cross tenants, and unread counts drift.',
    'consistent private reader-state service',
    [
      [
        'feed-ts-personal-state-scope',
        'Model read, unread, star, hide, save, tag, and note relationships by principal, tenant, and entry without changing shared content.',
        'Adding readAt to the entry row is sufficient personalization.',
      ],
      [
        'feed-ts-desired-state-command',
        'Accept explicit desired state with idempotency and optional version preconditions instead of ambiguous toggles.',
        'POST toggle is safe because each user clicks once.',
      ],
      [
        'feed-ts-bulk-result-union',
        'Define bounded atomic or per-item bulk behavior with authorization, typed results, retry identity, and complete reconciliation.',
        'Promise.all bulk writes either all succeed or all roll back.',
      ],
      [
        'feed-ts-device-conflict-policy',
        'Detect stale versions and apply a declared resolution policy with user-visible recovery rather than silent last-write assumptions.',
        'Last write wins is always acceptable for reader preferences.',
      ],
      [
        'feed-ts-unread-count-repair',
        'Maintain or derive counts transactionally, invalidate caches, detect drift, repair safely, and test concurrent state changes.',
        'Incrementing a counter after each command cannot drift.',
      ],
    ]
  ),
  feedModule(
    'feed-ts-api-cache-etag-preconditions',
    'Private API Caching, Representation ETags, Preconditions, and Invalidation',
    'Authenticated timelines use public cache headers, ETags ignore principal and filters, 304 bypasses policy changes, writes accept stale state, and deployment leaves validators unchanged.',
    'privacy-safe conditional TypeScript API',
    [
      [
        'feed-ts-cache-privacy-class',
        'Classify representations as public, tenant-private, user-private, sensitive, non-storeable, or invalidation-sensitive before emitting fields.',
        'Safe GET means shared-cacheable.',
      ],
      [
        'feed-ts-representation-validator',
        'Compute validator identity from authorized representation revision, tenant, principal scope, query, locale, negotiation, and weak or strong needs.',
        'A body hash is always the correct ETag.',
      ],
      [
        'feed-ts-if-none-match-order',
        'Authenticate and select the representation before evaluating If-None-Match precedence and If-Modified-Since fallback.',
        'A matching validator can skip current authorization.',
      ],
      [
        'feed-ts-if-match-write',
        'Require If-Match or explicit version for conflicting reader or source changes and return typed recovery on mismatch.',
        'Idempotent desired-state commands cannot have concurrency conflicts.',
      ],
      [
        'feed-ts-cache-change-matrix',
        'Test ingestion, revision, subscribe, reader state, authorization, locale, sanitizer, parser, schema, and deployment changes against keys and validators.',
        'Short cache lifetime replaces invalidation reasoning.',
      ],
    ]
  ),
  feedModule(
    'feed-ts-observability-als-slos',
    'AsyncLocalStorage Context, Redacted Telemetry, Freshness SLOs, and Capacity',
    'Global correlation state crosses requests, background tasks lose context, logs serialize feed objects, metric labels use URLs, averages hide stale sources, and load ignores event-loop delay.',
    'privacy-minimized causal TypeScript operations model',
    [
      [
        'feed-ts-als-context-boundary',
        'Create minimal immutable request and job contexts, propagate deliberately through async boundaries, and prevent tenant or attempt leakage across work.',
        'AsyncLocalStorage automatically supplies correct context to detached jobs.',
      ],
      [
        'feed-ts-redacted-structured-events',
        'Log bounded typed events with unknown-error causes and tested redaction for tokens, URLs, content, searches, SQL, headers, and personal state.',
        'Pino serializers make full objects safe by default.',
      ],
      [
        'feed-ts-freshness-indicators',
        'Measure publisher respect, poll success, ingestion lag, reader latency, search latency, queue age, and restore behavior with windows and error budgets.',
        'Mean response time captures reader and publisher health.',
      ],
      [
        'feed-ts-cardinality-retention',
        'Bound label sets, trace sampling, event size, retention, tenant visibility, and telemetry cost while preserving causal incidents.',
        'Raw feed URL is the most useful metric label.',
      ],
      [
        'feed-ts-eventloop-capacity',
        'Load representative fetch, parse, validation, PostgreSQL, search, reader, failure, and restore mixes while measuring event-loop delay, heap, handles, pools, and budgets.',
        'HTTP requests per second proves async ingestion capacity.',
      ],
    ]
  ),
  feedModule(
    'feed-ts-node-test-types-fixtures',
    'node:test, Original Feed Fixtures, Property Cases, and Compile-Negative Evidence',
    'Tests use one production feed, mock every module, cast fixtures, skip async reordering, contact public sites, and treat type success as runtime correctness.',
    'layered TypeScript feed evidence suite',
    [
      [
        'feed-ts-original-fixture-matrix',
        'Create small original RSS, Atom, namespace, encoding, entity, depth, date, identity, revision, malformed, and oversized fixtures with exact expectations.',
        'One copied real feed is the most comprehensive fixture.',
      ],
      [
        'feed-ts-deterministic-unit-ports',
        'Test URL, discovery, parser options, unknown validation, normalization, schedule, cursor, state, and policy with injected clocks and ports.',
        'Backend value comes only from full integration tests.',
      ],
      [
        'feed-ts-async-schedule-cases',
        'Control deferred settlement, abort order, time, lease expiry, pool error, listener cleanup, and unhandled rejection evidence deterministically.',
        'Normal event-loop scheduling exercises every Promise race.',
      ],
      [
        'feed-ts-compile-negative-tests',
        'Assert invalid states, unchecked unknown values, mutation, missing result cases, and incompatible interfaces fail compilation while runtime fixtures remain necessary.',
        'A passing strict compilation proves external data safety.',
      ],
      [
        'feed-ts-test-layer-nonclaims',
        'Separate browser, compiler, emitted Node, loopback HTTP, PostgreSQL, handle, load, accessibility, platform, deployment, and production evidence.',
        'One green node:test command supports all release claims.',
      ],
    ]
  ),
  feedModule(
    'feed-ts-integration-fault-handle-evidence',
    'Loopback Origins, PostgreSQL Integration, Fault Injection, and Handle Proof',
    'HTTP mocks skip streams and redirects, query mocks ignore constraints, failures are generic rejections, subprocess behavior is inferred, and tests exit while handles remain.',
    'disposable emitted-runtime integration harness',
    [
      [
        'feed-ts-controlled-origin',
        'Use loopback servers and injectable dispatch for validators, redirects, compressed streams, slow bodies, malformed XML, disconnects, and publisher budgets.',
        'Public feed requests are required for realistic integration tests.',
      ],
      [
        'feed-ts-disposable-postgres',
        'Start PostgreSQL 18 in isolation, apply actual migrations, seed original tenants and feeds, isolate tests, and prove pool and database cleanup.',
        'SQLite or SQL-text snapshots prove pg locking and constraints.',
      ],
      [
        'feed-ts-fault-adapters',
        'Inject serialization, deadlock, constraint, pool exhaustion, stream error, abort, timer, lease, commit ambiguity, and shutdown faults with typed recovery.',
        'Rejecting a Promise with Error covers every infrastructure fault.',
      ],
      [
        'feed-ts-emitted-subprocess',
        'Run emitted JavaScript in subprocesses for startup, migration, signal, health, exit code, stderr, package, and clean-handle evidence.',
        'Importing TypeScript modules proves Node process behavior.',
      ],
      [
        'feed-ts-end-to-end-reconciliation',
        'Reconcile bytes, validated values, normalized entries, committed rows, versions, schedule, API output, telemetry, handles, and cleanup after changed success and failure.',
        'Matching one API JSON payload proves the service.',
      ],
    ]
  ),
  feedModule(
    'feed-ts-security-supply-retention',
    'Threat Modeling, SSRF, XML and Content Budgets, Supply Chain, Secrets, and Retention',
    'Controls live in middleware only, admin fetches bypass policy, parser and sanitizer limits differ, package scripts are trusted, secrets enter diagnostics, and public feeds are stored forever.',
    'defense-in-depth TypeScript feed control set',
    [
      [
        'feed-ts-threat-dataflow',
        'Trace assets, actors, trust boundaries, entry points, abuse cases, controls, detection, response, and residual risk through every async data flow.',
        'HTTPS, Zod, and parameterized SQL form a complete threat model.',
      ],
      [
        'feed-ts-ssrf-defense-layers',
        'Combine URL admission, redirect and address checks, proxy controls, egress policy, metadata blocking, DNS rebinding evidence, and operational response.',
        'WHATWG URL parsing alone prevents SSRF.',
      ],
      [
        'feed-ts-amplification-budgets',
        'Align compressed bytes, decoded XML, entity expansion, object depth, normalization, sanitizer, search, pagination, bulk, export, and telemetry limits.',
        'Independent generous subsystem limits cannot amplify each other.',
      ],
      [
        'feed-ts-package-secret-policy',
        'Review lifecycle scripts and provenance, pin packages, scan reachable advisories, load typed secrets, redact diagnostics, rotate credentials, and reject insecure defaults.',
        'package-lock and environment variables settle supply-chain and secret safety.',
      ],
      [
        'feed-ts-retention-erasure',
        'Set purpose-bound retention and verified deletion for raw feeds, revisions, reader state, searches, telemetry, accounts, backups, and legal holds.',
        'Public publisher content removes privacy and retention duties.',
      ],
    ]
  ),
  feedModule(
    'feed-ts-container-rollout-migrations',
    'Container Packaging, Startup, Health, Migration Coordination, and Rollout',
    'The development loader ships to production, the image runs as root, every replica migrates schema, readiness ignores backlog, shutdown leaves timers, and rollout cannot compare artifacts.',
    'deployable emitted TypeScript feed service',
    [
      [
        'feed-ts-package-artifact',
        'Inspect packed ESM exports, emitted JavaScript, maps, production dependencies, migrations, licenses, and startup command in a clean Node 24 environment.',
        'A TypeScript source tree is the deployable artifact.',
      ],
      [
        'feed-ts-reproducible-container',
        'Build a pinned non-root minimal image with exact package, certificates, ownership, metadata, SBOM, signature, and vulnerability evidence.',
        'A small mutable base tag is reproducible.',
      ],
      [
        'feed-ts-startup-health',
        'Validate configuration, dependency compatibility, migration state, secrets, budgets, and separate startup, liveness, readiness, degradation, and maintenance semantics.',
        'One 200 health endpoint describes service readiness.',
      ],
      [
        'feed-ts-migration-owner',
        'Run migrations through one release-owned step with locking, timeout, version compatibility, evidence, and explicit failure recovery.',
        'Every Express replica may safely migrate on startup.',
      ],
      [
        'feed-ts-progressive-release',
        'Canary source, package, schema, parser, sanitizer, worker, and API versions with SLO, capacity, kill-switch, rollback, and handle evidence.',
        'A successful container smoke justifies full rollout.',
      ],
    ]
  ),
  feedModule(
    'feed-ts-backup-restore-recovery',
    'Backup, Point-in-Time Restore, Rebuild, and Recovery Ordering',
    'Backups are never restored, feeds are assumed refetchable, personal state has no RPO, workers start during inspection, cache and validators disagree, and corrupted revisions stay hidden.',
    'rehearsed TypeScript service recovery system',
    [
      [
        'feed-ts-recovery-data-classes',
        'Assign RPO, RTO, encryption, retention, restore, and rebuild strategy to accounts, subscriptions, reader state, feeds, revisions, raw evidence, and telemetry.',
        'All aggregator data can be rebuilt from publishers.',
      ],
      [
        'feed-ts-backup-eligibility',
        'Verify backup schedule, WAL continuity, age, checksum, encryption, access, capacity, catalog, and application compatibility.',
        'A backup job exit code proves recoverability.',
      ],
      [
        'feed-ts-isolated-restore',
        'Restore into isolation, block outbound fetch, validate schema and app versions, run invariants, reconcile counts, and review tenant and reader data.',
        'Restoring directly over production is acceptable practice evidence.',
      ],
      [
        'feed-ts-recovery-sequence',
        'Order migration, restore, secret rotation, scheduler pause, validator and lease review, worker resume, cache rebuild, and client reopening.',
        'Workers should start first to refresh stale sources.',
      ],
      [
        'feed-ts-recovery-drills',
        'Rehearse deletion, corruption, bad migration, package regression, credential leak, SSRF, parser incident, region loss, and partial restore.',
        'One normal restore test covers every incident.',
      ],
    ]
  ),
  feedModule(
    'feed-ts-release-production-defense',
    'Source-to-Package Release, Incident Command, and Production Defense',
    'Checks pass independently but the team cannot bind source to package and image, explain missing entries, prove async cleanup, protect publishers, restore state, or name residual risk.',
    'defensible production TypeScript feed aggregator',
    [
      [
        'feed-ts-release-provenance',
        'Bind reviewed source, compiler surfaces, generated artifacts, migrations, lockfile, package contents, emitted JavaScript, image digest, SBOM, signature, configuration, and deployment.',
        'A version string proves which JavaScript is running.',
      ],
      [
        'feed-ts-unfamiliar-e2e',
        'Demonstrate unfamiliar RSS and Atom sources through authorized discovery, bounded Fetch and XML, runtime normalization, transaction, scheduling, API, accessible reader, and cleanup.',
        'Repeating guided workshop fixtures is independent mastery.',
      ],
      [
        'feed-ts-incident-command',
        'Triage publisher overload, stale ingestion, SSRF, entity, sanitizer, search, pool, tenant, async-handle, rollout, and restore incidents with evidence-preserving containment.',
        'Restarting Node is the universal first response.',
      ],
      [
        'feed-ts-crossfunctional-defense',
        'Present reader, publisher, accessibility, runtime, security, privacy, database, capacity, cost, migration, rollback, and recovery evidence to a review board.',
        'Passing compiler and unit tests answers every stakeholder question.',
        'professional',
        'evaluate',
      ],
      [
        'feed-ts-residual-risk-register',
        'Own unsupported feed constructs, runtime limits, false positives, accessibility findings, capacity boundaries, package risks, deadlines, and stop conditions.',
        'A released service has no unresolved risk.',
        'metacognitive',
        'create',
      ],
    ]
  ),
];

const sources = [
  [
    'RSS 2.0 Specification',
    'official-docs',
    'https://www.rssboard.org/rss-specification',
    'RSS 2.0.11',
    'Controls RSS channel, item, GUID, dates, media, categories, source, and extensions.',
  ],
  [
    'Atom Syndication Format',
    'standards-body',
    'https://www.rfc-editor.org/rfc/rfc4287',
    'RFC 4287',
    'Controls Atom namespaces, IDs, links, people, dates, text, content, extensions, and security.',
  ],
  [
    'XML 1.0 Fifth Edition',
    'standards-body',
    'https://www.w3.org/TR/xml/',
    'W3C Recommendation',
    'Controls XML documents, encodings, entities, references, and well-formedness.',
  ],
  [
    'URI Generic Syntax',
    'standards-body',
    'https://www.rfc-editor.org/rfc/rfc3986',
    'RFC 3986',
    'Controls URI resolution, normalization, and comparison boundaries.',
  ],
  [
    'WHATWG URL Standard',
    'standards-body',
    'https://url.spec.whatwg.org/',
    'Living Standard 2026-07-15',
    'Controls Node and browser URL parsing, serialization, origins, hosts, and references.',
  ],
  [
    'WHATWG Feed Autodiscovery',
    'standards-body',
    'https://blog.whatwg.org/feed-autodiscovery',
    'Current 2026-07-15',
    'Controls alternate-link RSS and Atom discovery.',
  ],
  [
    'HTTP Semantics',
    'standards-body',
    'https://www.rfc-editor.org/rfc/rfc9110',
    'RFC 9110',
    'Controls methods, status, validators, conditional requests, redirects, representations, and fields.',
  ],
  [
    'HTTP Caching',
    'standards-body',
    'https://www.rfc-editor.org/rfc/rfc9111',
    'RFC 9111',
    'Controls cache freshness, validation, storage, invalidation, and privacy.',
  ],
  [
    'Node 24 Documentation',
    'official-docs',
    'https://nodejs.org/download/release/latest-v24.x/docs/api/',
    'Node 24.18.0',
    'Controls runtime, ESM, process, events, streams, timers, tests, async context, diagnostics, and shutdown.',
  ],
  [
    'Node Globals and Fetch',
    'official-docs',
    'https://nodejs.org/download/release/latest-v24.x/docs/api/globals.html',
    'Node 24.18.0',
    'Controls Fetch, AbortController, AbortSignal timeout and any, URL-adjacent globals, and web streams.',
  ],
  [
    'Node HTTP',
    'official-docs',
    'https://nodejs.org/download/release/latest-v24.x/docs/api/http.html',
    'Node 24.18.0',
    'Controls request signals, streaming, limits, lifecycle, status, and cleanup.',
  ],
  [
    'Node Async Context',
    'official-docs',
    'https://nodejs.org/download/release/latest-v24.x/docs/api/async_context.html',
    'Node 24.18.0',
    'Controls AsyncLocalStorage propagation, snapshots, ownership, and boundaries.',
  ],
  [
    'Node Test Runner',
    'official-docs',
    'https://nodejs.org/download/release/latest-v24.x/docs/api/test.html',
    'Node 24.18.0',
    'Controls deterministic runtime tests, mocks, timers, subprocesses, and coverage.',
  ],
  [
    'TypeScript 7 Announcement',
    'official-docs',
    'https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/',
    'TypeScript 7.0.2',
    'Controls the current native compiler baseline and migration differences.',
  ],
  [
    'TypeScript Handbook',
    'official-docs',
    'https://www.typescriptlang.org/docs/handbook/2/narrowing.html',
    'Current 2026-07-15',
    'Controls unknown values, narrowing, exhaustive unions, and safe type reasoning.',
  ],
  [
    'Express 5 API',
    'official-docs',
    'https://expressjs.com/en/5x/api.html',
    'Express 5.2.1',
    'Controls routers, middleware, requests, responses, settings, and error flow.',
  ],
  [
    'node-postgres Documentation',
    'official-docs',
    'https://node-postgres.com/',
    'pg 8.22.0',
    'Controls Node 24 compatibility, parameterized queries, pooling, clients, transactions, types, and shutdown.',
  ],
  [
    'fast-xml-parser',
    'official-docs',
    'https://www.npmjs.com/package/fast-xml-parser',
    '5.10.0',
    'Controls TypeScript XML validation, parsing, namespaces, arrays, entities, depth, dangerous keys, and limits.',
  ],
  [
    'Zod Documentation',
    'official-docs',
    'https://zod.dev/',
    'Zod 4.4.3',
    'Controls external unknown runtime validation and typed admitted values.',
  ],
  [
    'Pino Documentation',
    'official-docs',
    'https://getpino.io/',
    'Pino 10.3.1',
    'Controls structured logging, serializers, redaction, transports, and performance boundaries.',
  ],
  [
    'PostgreSQL 18 Documentation',
    'official-docs',
    'https://www.postgresql.org/docs/18/',
    'PostgreSQL 18.4',
    'Controls schema, SQL, transactions, locking, indexing, search, backup, and recovery.',
  ],
  [
    'PostgreSQL SELECT and SKIP LOCKED',
    'official-docs',
    'https://www.postgresql.org/docs/18/sql-select.html',
    'PostgreSQL 18.4',
    'Controls ordered row claims, NOWAIT, SKIP LOCKED, and lock scope.',
  ],
  [
    'PostgreSQL Full Text Search',
    'official-docs',
    'https://www.postgresql.org/docs/18/textsearch.html',
    'PostgreSQL 18.4',
    'Controls search documents, queries, ranking, highlighting, dictionaries, and indexes.',
  ],
  [
    'OpenAPI Specification',
    'standards-body',
    'https://spec.openapis.org/oas/v3.2.0.html',
    'OpenAPI 3.2.0',
    'Controls API operations, schemas, responses, security, and compatibility.',
  ],
  [
    'Problem Details for HTTP APIs',
    'standards-body',
    'https://www.rfc-editor.org/rfc/rfc9457',
    'RFC 9457',
    'Controls stable bounded machine-readable API failures.',
  ],
  [
    'OWASP SSRF Prevention',
    'recognized-security-framework',
    'https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html',
    'Current 2026-07-15',
    'Controls URL, address, redirect, proxy, egress, metadata, and rebinding defenses.',
  ],
  [
    'OWASP XSS Prevention',
    'recognized-security-framework',
    'https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html',
    'Current 2026-07-15',
    'Controls untrusted feed rendering, encoding, sanitization, and safe sinks.',
  ],
  [
    'Web Content Accessibility Guidelines 2.2',
    'standards-body',
    'https://www.w3.org/TR/WCAG22/',
    'W3C Recommendation 2024-12-12',
    'Controls semantics, keyboard, focus, status, target size, reflow, contrast, motion, and alternatives.',
  ],
  [
    'OpenTelemetry Semantic Conventions',
    'official-docs',
    'https://opentelemetry.io/docs/specs/semconv/',
    'Current 2026-07-15',
    'Controls HTTP, database, error, messaging-adjacent, and privacy-aware telemetry meaning.',
  ],
  [
    'NIST Secure Software Development Framework',
    'recognized-security-framework',
    'https://csrc.nist.gov/pubs/sp/800/218/final',
    'SP 800-218',
    'Controls provenance, dependency, secure release, and vulnerability response.',
  ],
  [
    'ACM IEEE AAAI Computer Science Curricula',
    'recognized-curriculum-framework',
    'https://csed.acm.org/',
    'CS2023',
    'Controls systems, data, security, software, professional, and project coverage.',
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

export const buildBlogAggregatorTypescriptConfig = finalizeCourse(
  {
    id: 'build-blog-aggregator-typescript',
    title: 'Build and Ship a Production Feed Aggregator in TypeScript 7 and Node 24',
    version: '2026.07',
    audience: {
      description:
        'Advanced TypeScript backend learners ready to integrate syndication standards, hostile XML, runtime validation, Fetch and Promise ownership, PostgreSQL, Express, accessible presentation, security, testing, deployment, and recovery into one cumulative service.',
      entryKnowledge: [
        'Build strict ESM TypeScript and Node 24 services with exhaustive unions, unknown-value narrowing, async ownership, tests, emitted artifacts, and clean shutdown.',
        'Construct bounded HTTP clients and Express 5 servers with runtime admission, authentication, caching, observability, and fault evidence.',
        'Design constrained PostgreSQL schemas, parameterized queries, transactions, indexes, migrations, and recovery evidence.',
        'Use Git, Docker, and repository quality gates to preserve revision, dependency, test, lint, security, package, release, and rollback evidence.',
      ],
      deviceConstraints: [
        'Desktop or tablet with a modern browser; native Fetch, DNS, streams, Express, PostgreSQL, subprocess, handles, package, container, load, backup, and deployment transfer labs require Node 24.18.0 and PostgreSQL 18.4.',
      ],
      accessibilityAssumptions: [
        'All XML, object, Promise, SQL, state, API, reader UI, code, chart, and project evidence requires structured text, keyboard operation, visible focus, non-color meaning, zoom, and reduced-motion support.',
      ],
    },
    scope: {
      includes: [
        'A cumulative multi-tenant RSS 2.0 and Atom 1.0 service from authorized discovery through secure runtime validation, publisher-friendly ingestion, PostgreSQL search, Express APIs, and an accessible content-safe reader',
        'TypeScript 7 and Node 24 source-to-emission evidence, fast-xml-parser hardening, Zod admission, Fetch streams and AbortSignal ownership, pg transactions, durable scheduling, fenced workers, AsyncLocalStorage telemetry, security, testing, packaging, deployment, backup, and recovery',
        'Original deterministic browser models plus controlled compiler, emitted Node, loopback HTTP, PostgreSQL, handle, subprocess, container, load, accessibility, backup, restore, and release transfer gates',
        'Five distinct stakeholder projects and a cumulative production defense',
      ],
      excludes: [
        'Copying another curriculum, tutorial prose, feed implementation, assessment, or solution',
        'Unbounded crawling, access-control bypass, private-network access, publisher overload, arbitrary markup or code execution, unsafe package scripts, or indefinite retention',
        'Claims that browser TypeScript or compiler checks prove native network, XML library, Express, PostgreSQL, event-loop, handle, package, accessibility, deployment, or production behavior',
      ],
      nextCourses: ['build-web-scraper-typescript', 'capstone-project', 'job-search'],
    },
    sources,
    modules,
    projects: [
      project(
        'feed-ts-research-source-registry',
        'Inclusive Research Source Registry',
        'feed-ts-unknown-validation-normalization',
        'A disability-led university research network and independent publishers',
        'They need authorized direct and autodiscovery, RSS and Atom semantics, hardened XML parsing, runtime-validated normalized records, content provenance, and publisher correction evidence.',
        [
          'feed-ts-reader-job',
          'feed-ts-alternate-link-admission',
          'feed-ts-parser-option-contract',
          'feed-ts-format-discriminated-union',
          'feed-ts-normalization-loss-report',
        ]
      ),
      project(
        'feed-ts-transactional-ingestion',
        'Async Transactional Publisher Ingestion',
        'feed-ts-ingestion-orchestration',
        'A nonprofit newsroom operating on shared cloud capacity',
        'They need conditional bounded Fetch, strict runtime admission, constrained PostgreSQL state, compatible migrations, versioned idempotent entries, and no stale Promise or partial-commit effects.',
        [
          'feed-ts-fetch-signal-composition',
          'feed-ts-database-invariants',
          'feed-ts-expand-contract-sequence',
          'feed-ts-upsert-outcome-union',
          'feed-ts-transactional-commit',
        ]
      ),
      project(
        'feed-ts-fenced-async-workers',
        'Fenced Multi-Instance Async Freshness Workers',
        'feed-ts-bounded-promise-workers',
        'A regional public-information exchange with strict publisher budgets',
        'They need durable adaptive scheduling, non-overlapping timers, short PostgreSQL claims, fencing against stale workers, origin-fair Promise concurrency, abort ownership, and handle-clean drain.',
        [
          'feed-ts-nonoverlap-timer',
          'feed-ts-short-claim',
          'feed-ts-affected-row-finalize',
          'feed-ts-origin-fairness',
          'feed-ts-drain-handles',
        ]
      ),
      project(
        'feed-ts-private-accessible-reader',
        'Private Accessible Cross-Device Reader',
        'feed-ts-api-cache-etag-preconditions',
        'A civic evidence team using keyboards, screen readers, narrow devices, and multiple signed-in clients',
        'They need tenant-safe source and reader state, stable timelines, bounded explainable search, safe publisher content, runtime-documented APIs, privacy-safe caching, and conflict recovery.',
        [
          'feed-ts-tenant-repository-contract',
          'feed-ts-keyset-predicate',
          'feed-ts-safe-search-snippet',
          'feed-ts-focus-live-status',
          'feed-ts-if-match-write',
        ]
      ),
      project(
        'feed-ts-production-defense',
        'TypeScript Feed Service Release and Recovery Defense',
        'feed-ts-release-production-defense',
        'A joint reader, publisher, accessibility, Node, security, privacy, database, operations, and support board',
        'The board needs source-to-emitted-package proof, dependency and container provenance, SLO and event-loop capacity evidence, threat controls, migration and rollout safety, backup restore, incident containment, rollback, and owned residual risks.',
        [
          'feed-ts-eventloop-capacity',
          'feed-ts-end-to-end-reconciliation',
          'feed-ts-progressive-release',
          'feed-ts-recovery-drills',
          'feed-ts-residual-risk-register',
        ]
      ),
    ],
    examContext:
      'Unfamiliar TypeScript feed-service cases spanning reader and publisher outcomes, Node 24 and TypeScript 7 source-to-emission reproduction, Promise and AbortSignal ownership, authorized discovery and SSRF, RSS 2.0 and Atom 1.0, hardened fast-xml-parser entity and dangerous-key limits, unknown runtime validation, loss-aware normalization, conditional streamed Fetch, PostgreSQL schema and compatible migrations, node-postgres pool and transaction ownership, shared source subscriptions, versioned idempotent entries, atomic async ingestion, handle-clean scheduling, SKIP LOCKED leases and fencing, origin-fair Promise workers, Express 5 resource and error layers, runtime request and OpenAPI contracts, tenant privacy, stable cursor timelines, full-text search, accessible content-safe rendering, personal state conflicts, private validators, AsyncLocalStorage observability, SLO and event-loop capacity, original fixtures, compile-negative, loopback and PostgreSQL faults, supply-chain and retention defense, package and container rollout, backup, restore, incident response, rollback, and residual-risk defense with explicit browser, compiler, and controlled native boundaries.',
    minimumQuestionBankSize: 980,
  },
  {
    researchedAt: RESEARCHED_AT,
    prerequisiteCourseIds: [
      'typescript-basics',
      'http-clients-typescript',
      'http-servers-typescript',
      'sql-basics',
      'git-basics',
      'repository-quality-gates',
      'docker-basics',
    ],
  }
);

import { finalizeCourse, project, skill } from './course-config-helpers.mjs';

const REVIEWED_AT = '2026-07-15';
const RESEARCHED_AT = '2026-07-15T20:00:00.000Z';

function outcome(id, statement, misconception, knowledgeType = 'procedural', level = 'apply') {
  if (!misconception) throw new Error(`Missing misconception for Go feed competency ${id}`);
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
      theory: `${context} Predict the reader decision, feed or API contract, Go and PostgreSQL ownership, bounded failure, and observable evidence before reading the governing source.`,
      workshop: `A public-interest newsroom incrementally builds ${artifact} from original RSS, Atom, HTTP, and PostgreSQL fixtures while retaining prior Go, HTTP-client, HTTP-server, SQL, Git, accessibility, security, testing, cancellation, and recovery requirements.`,
      debug: `A preserved Go feed-service run contains one plausible discovery, URL, XML, normalization, fetch, SQL, transaction, lease, goroutine, handler, accessibility, migration, or release defect; locate the first failed invariant before editing.`,
      lab: `An independent community archive receives a different publisher mix, malformed feed, validator state, tenant, schedule, database condition, accessibility need, platform, and injected failure and transfers ${title.toLowerCase()} into a changed ${artifact}.`,
      review: `A delayed operations review reconstructs ${title.toLowerCase()} from revision, tenant, source URL, request validators, response bytes, parsed identity, transaction, lease, state transition, output, failure, cleanup, and recovery evidence.`,
      quiz: `A release reviewer compares near-miss Go decisions for ${title.toLowerCase()} and accepts only runnable changed-case evidence, explicit non-claims, and named browser, compiler, network, XML, PostgreSQL, race, load, accessibility, deployment, and production transfer gates.`,
    },
  };
}

const modules = [
  feedModule(
    'feed-go-reader-outcomes-service-charter',
    'Reader Outcomes, Publisher Stewardship, and Service Charter',
    'A coalition asks for a blog aggregator but has not named its readers, publisher obligations, freshness promise, moderation boundary, accessibility needs, or evidence of usefulness.',
    'reader-centered feed-service charter',
    [
      [
        'feed-go-reader-decision',
        'Define reader group, decision, task journey, freshness need, harm, and observable value before choosing architecture.',
        'Collecting many links automatically creates a useful reader product.',
        'strategic',
        'create',
      ],
      [
        'feed-go-publisher-stewardship',
        'Define respectful fetch frequency, identification, caching, opt-out, correction, deletion, and incident contacts for publishers.',
        'Public feed URLs grant unlimited collection and permanent retention rights.',
        'professional',
        'evaluate',
      ],
      [
        'feed-go-service-boundary',
        'Separate discovery, fetch, parse, normalize, persist, schedule, serve, and present responsibilities with explicit ports.',
        'A single handler that performs every operation is simpler and therefore safer.',
      ],
      [
        'feed-go-accessibility-outcomes',
        'Set keyboard, heading, status, reflow, non-color, text-alternative, and reading-order acceptance evidence for the reader surface.',
        'A JSON API makes accessibility someone else’s responsibility.',
      ],
      [
        'feed-go-acceptance-evidence',
        'Require changed feeds, malformed input, stale validators, tenant isolation, shutdown, restore, and reader-task evidence.',
        'One successful local import proves the complete service.',
        'metacognitive',
        'create',
      ],
    ]
  ),
  feedModule(
    'feed-go-repository-toolchain-dependencies',
    'Go 1.26 Repository, pgx, Migrations, and Reproduction',
    'The service runs from an unknown revision with an unrecorded compiler, floating PostgreSQL libraries, ad hoc schema edits, warm caches, and no clean reproduction.',
    'reproducible Go feed-service repository baseline',
    [
      [
        'feed-go-revision-baseline',
        'Capture revision, worktree, configuration, fixtures, secrets, migrations, licenses, and recovery anchor before editing.',
        'A guided project does not need a before-state or rollback anchor.',
      ],
      [
        'feed-go-toolchain-contract',
        'Pin Go 1.26.5, pgx v5.10.0, goose v3.27.2, PostgreSQL 18.4, module sums, and supported platforms.',
        'Any current Go, driver, migrator, and PostgreSQL combination behaves identically.',
      ],
      [
        'feed-go-package-architecture',
        'Keep command, application, domain, repository, fetch, parser, scheduler, HTTP, and presentation dependencies directed inward.',
        'One package per technical noun guarantees clean architecture.',
        'strategic',
        'create',
      ],
      [
        'feed-go-dependency-provenance',
        'Justify each non-standard module, pin versions, verify sums and licenses, scan reachable vulnerabilities, and assign upgrade ownership.',
        'go.sum establishes safety and maintenance ownership.',
      ],
      [
        'feed-go-clean-gates',
        'Reproduce format, generated artifacts, migration validation, unit, integration, race, fuzz, vet, vulnerability, build, and smoke evidence from clean state.',
        'A cached developer build is reproducible release evidence.',
      ],
    ]
  ),
  feedModule(
    'feed-go-discovery-url-scope',
    'Feed Discovery, URL Identity, Scope, and SSRF Boundary',
    'Users can submit arbitrary URLs, discovery follows every alternate link, redirects change authority silently, and hostname checks occur only before DNS resolution.',
    'authorized feed discovery and network-scope policy',
    [
      [
        'feed-go-direct-vs-discovery',
        'Distinguish a direct feed URL from HTML autodiscovery and require an explicit bounded discovery policy.',
        'Every submitted page necessarily exposes one valid feed.',
      ],
      [
        'feed-go-autodiscovery-links',
        'Admit only alternate links with supported RSS or Atom media types, resolve references against the response URL, and bound candidates.',
        'Any link element containing rss in its path is a feed.',
      ],
      [
        'feed-go-canonical-url-identity',
        'Normalize only justified URI components while preserving distinctions that can identify different publisher resources.',
        'Lowercasing and stripping every query creates a universally canonical URL.',
      ],
      [
        'feed-go-ssrf-resolution',
        'Restrict schemes, ports, redirects, resolved addresses, proxy behavior, and re-resolution to block private, local, metadata, and rebinding targets.',
        'Checking that a URL begins with https prevents SSRF.',
      ],
      [
        'feed-go-discovery-provenance',
        'Retain submitted URL, response URL, selected candidate, redirect chain, resolution evidence, and operator decision.',
        'The final URL alone explains how a source entered the system.',
      ],
    ]
  ),
  feedModule(
    'feed-go-rss-atom-standards',
    'RSS 2.0, Atom 1.0, Namespaces, and Extension Policy',
    'The parser assumes RSS only, ignores Atom namespaces, treats optional fields as required, loses xml:base and language, and guesses extension meaning.',
    'standards-aware syndication vocabulary map',
    [
      [
        'feed-go-rss-channel-item',
        'Map RSS channel and item required, optional, repeated, GUID, enclosure, category, source, date, and extension constructs.',
        'Every RSS item has a globally unique link and RFC 3339 date.',
      ],
      [
        'feed-go-atom-feed-entry',
        'Map Atom feed and entry identifiers, authors, links, text constructs, content, categories, dates, xml:base, and xml:lang.',
        'Atom is RSS with different element names.',
      ],
      [
        'feed-go-namespace-identity',
        'Compare XML expanded names rather than prefixes and preserve unknown extension provenance without inventing semantics.',
        'The atom prefix always identifies the Atom namespace.',
      ],
      [
        'feed-go-date-media-variance',
        'Admit documented date and media-type variants through explicit parsers and retain original values on rejection.',
        'time.Parse with one layout covers real RSS and Atom dates.',
      ],
      [
        'feed-go-extension-policy',
        'Allowlist interpreted extensions, bound ignored markup, and surface unsupported constructs for review.',
        'Ignoring every unknown element is always forward compatible.',
      ],
    ]
  ),
  feedModule(
    'feed-go-xml-admission-security',
    'Bounded XML Decoding, Encodings, Entities, and Structural Security',
    'The service unmarshals an unbounded body, disables strict decoding to accept broken feeds, expands custom entities, ignores depth, and silently replaces unsupported encodings.',
    'strict bounded XML admission boundary',
    [
      [
        'feed-go-byte-depth-budgets',
        'Enforce compressed and decoded byte, token, element-depth, attribute, text, item, and duration limits before allocation grows unbounded.',
        'An HTTP body limit alone bounds XML parser work and memory.',
      ],
      [
        'feed-go-strict-decoder',
        'Keep encoding/xml strict mode, inspect tokens, reject malformed nesting and trailing documents, and never install arbitrary entity maps.',
        'Setting Decoder.Strict false is required for feed compatibility.',
      ],
      [
        'feed-go-charset-contract',
        'Use an allowlisted CharsetReader, reconcile transport and XML declarations, and reject unsupported or conflicting encodings.',
        'Every XML feed is valid UTF-8 regardless of declarations.',
      ],
      [
        'feed-go-doctype-entity-defense',
        'Reject or tightly constrain DOCTYPE and entity constructs and test expansion, recursion, and external-reference fixtures.',
        'Go encoding/xml automatically makes every XML resource-exhaustion pattern impossible.',
      ],
      [
        'feed-go-xml-failure-evidence',
        'Classify malformed, oversized, too-deep, unsupported-encoding, entity, cancellation, and trailing-document failures with bounded diagnostics.',
        'Returning invalid feed is enough causal evidence for operators.',
      ],
    ]
  ),
  feedModule(
    'feed-go-normalized-domain-provenance',
    'Normalized Feed Domain, Content Variants, and Provenance',
    'RSS and Atom transport structs leak into storage, missing data is invented, HTML and text are conflated, source identifiers are discarded, and updates cannot be explained.',
    'loss-aware normalized feed and entry model',
    [
      [
        'feed-go-transport-domain-separation',
        'Convert format-specific transport values into validated feed, entry, person, link, category, content, and provenance domain types.',
        'Successful XML decoding establishes domain validity.',
      ],
      [
        'feed-go-identity-precedence',
        'Choose entry identity from stable Atom ID, RSS GUID semantics, canonical link, or scoped content fingerprint with explicit precedence.',
        'The newest title is a safe permanent entry key.',
      ],
      [
        'feed-go-content-kind',
        'Preserve plain text, escaped HTML, XHTML, external content, summary, and missing content as distinct bounded states.',
        'All content strings can be rendered or searched as trusted plain text.',
      ],
      [
        'feed-go-time-language-base',
        'Normalize instants while retaining raw date, precision, timezone, language, and base-URI provenance.',
        'Converting to UTC removes every temporal and localization ambiguity.',
      ],
      [
        'feed-go-loss-report',
        'Emit field-level admitted, defaulted, dropped, conflicted, and unsupported evidence for each normalization run.',
        'A normalized row need not explain information loss.',
      ],
    ]
  ),
  feedModule(
    'feed-go-conditional-fetch-publisher-budget',
    'Conditional HTTP Fetching, Redirects, Compression, and Publisher Budgets',
    'Every poll downloads a full feed, validators are overwritten on failure, redirects bypass scope, compressed bytes expand without limit, and retries synchronize across publishers.',
    'publisher-friendly conditional fetch client',
    [
      [
        'feed-go-validator-precedence',
        'Store and send ETag and Last-Modified validators correctly, interpret 304 without parsing a body, and update validators only from admitted responses.',
        'If-Modified-Since should replace an available ETag validator.',
      ],
      [
        'feed-go-status-content-admission',
        'Classify 200, 304, redirect, temporary, permanent, auth, missing, rate-limit, and unexpected responses before XML admission.',
        'Every non-200 feed response should be retried immediately.',
      ],
      [
        'feed-go-redirect-scope',
        'Reapply scheme, authority, address, hop, credential, and loop policy at each redirect and record permanent moves separately.',
        'The original URL allowlist automatically covers redirect destinations.',
      ],
      [
        'feed-go-compression-budget',
        'Bound wire bytes, decoded bytes, compression ratio, read time, and cleanup while preserving response causes.',
        'Limiting Content-Length bounds chunked and compressed responses.',
      ],
      [
        'feed-go-publisher-rate-policy',
        'Apply per-origin concurrency, minimum intervals, Retry-After, exponential backoff, jitter, identification, and operator override.',
        'A global worker limit alone prevents one publisher from being overloaded.',
      ],
    ]
  ),
  feedModule(
    'feed-go-postgres-domain-schema',
    'PostgreSQL 18 Domain Schema, Keys, Constraints, and Index Intent',
    'The database uses URLs as mutable primary keys, repeats publisher strings, permits cross-tenant references, lacks temporal constraints, and indexes without query evidence.',
    'constrained relational feed-service schema',
    [
      [
        'feed-go-relational-entities',
        'Model tenants, users, sources, feeds, subscriptions, entries, authors, categories, content versions, fetches, and reader state with clear ownership.',
        'One wide posts table is simpler and preserves every invariant.',
      ],
      [
        'feed-go-stable-keys',
        'Use stable internal keys plus scoped external identities and preserve canonical URL changes without breaking references.',
        'The current feed URL is the best immutable database key.',
      ],
      [
        'feed-go-schema-constraints',
        'Encode nullability, checks, unique scopes, foreign keys, cascades, timestamps, states, and length budgets in PostgreSQL.',
        'Application validation makes database constraints redundant.',
      ],
      [
        'feed-go-index-query-pairing',
        'Pair B-tree, partial, covering, expression, and GIN indexes with measured queries, selectivity, write cost, and removal evidence.',
        'Adding indexes to every column always improves performance.',
      ],
      [
        'feed-go-tenant-schema-isolation',
        'Include tenant ownership in keys, constraints, queries, tests, and audit evidence so cross-tenant references cannot form.',
        'A tenant filter in HTTP handlers is sufficient isolation.',
      ],
    ]
  ),
  feedModule(
    'feed-go-migrations-forward-backward',
    'Versioned Migrations, Expand-Contract Changes, and Rollback Evidence',
    'Developers edit production tables manually, migrations mix irreversible data loss with schema changes, deploys assume zero old binaries, and rollback has never run.',
    'rehearsed schema and data migration chain',
    [
      [
        'feed-go-migration-ledger',
        'Keep ordered immutable migration files, checksums, ownership, lock behavior, and applied-state inspection under revision control.',
        'Renaming an already-applied migration is harmless cleanup.',
      ],
      [
        'feed-go-transactional-ddl',
        'Decide transaction boundaries from each PostgreSQL operation and separate concurrent index, long data, and lock-sensitive work.',
        'Every PostgreSQL migration can run inside one short transaction.',
      ],
      [
        'feed-go-expand-contract',
        'Stage additive schema, backfill, dual-read or dual-write, validation, cutover, cleanup, and old-version compatibility.',
        'A column rename is atomic from the perspective of every deployed binary.',
      ],
      [
        'feed-go-backfill-evidence',
        'Make backfills bounded, resumable, idempotent, observable, cancelable, and reconciled before constraints tighten.',
        'One unbounded UPDATE is the simplest safe backfill.',
      ],
      [
        'feed-go-migration-recovery',
        'Test fresh install, upgrade, interrupted backfill, retry, rollback or forward repair, backup restore, and version skew.',
        'A successful migration on an empty database proves upgrade safety.',
      ],
    ]
  ),
  feedModule(
    'feed-go-pgx-pool-transaction-ownership',
    'pgx Pooling, Query Contracts, Transactions, and Cancellation',
    'Handlers create pools, query rows are not closed, transactions use the wrong connection, contexts are replaced, SQL errors lose identity, and shutdown races active work.',
    'bounded pgx repository and unit-of-work layer',
    [
      [
        'feed-go-pool-lifecycle',
        'Create one bounded pgxpool, verify startup deliberately, observe acquire wait, and close after admission and worker shutdown.',
        'A pool per request guarantees connection freshness.',
      ],
      [
        'feed-go-query-contract',
        'Use parameterized typed queries, explicit columns, row closure, iteration errors, cardinality expectations, and explainable mapping.',
        'Scanning without error proves the query returned the intended row set.',
      ],
      [
        'feed-go-transaction-connection',
        'Run every unit-of-work statement on one transaction, defer rollback safely, commit once, and preserve the original cause.',
        'Calls through the pool automatically join the active transaction.',
      ],
      [
        'feed-go-context-cancellation',
        'Propagate request or worker context through acquire, query, transaction, and retry without substituting Background.',
        'A database statement timeout makes caller cancellation unnecessary.',
      ],
      [
        'feed-go-sql-error-policy',
        'Classify constraint, serialization, deadlock, cancellation, timeout, connection, and unknown failures without leaking SQL or secrets.',
        'String matching PostgreSQL error messages is a stable API.',
      ],
    ]
  ),
  feedModule(
    'feed-go-source-subscription-state',
    'Source Registration, Subscriptions, Following, and Ownership',
    'Each user creates duplicate fetch jobs for the same feed, unfollow deletes shared data, ownership is ambiguous, and source verification happens outside a transaction.',
    'shared-source and tenant subscription model',
    [
      [
        'feed-go-source-registration',
        'Register a discovered source idempotently from normalized identity, provenance, scope decision, and initial fetch evidence.',
        'Two users submitting one URL should create two independent source records.',
      ],
      [
        'feed-go-follow-idempotency',
        'Create and remove tenant-scoped subscriptions idempotently while preserving a shared publisher source and entry history.',
        'Unfollowing a source should immediately delete its global feed and posts.',
      ],
      [
        'feed-go-source-lifecycle',
        'Model pending, active, paused, moved, failing, disabled, deleted, and appeal states with allowed transitions.',
        'A boolean active field captures the complete source lifecycle.',
      ],
      [
        'feed-go-ownership-authorization',
        'Authorize source administration, subscription access, and moderation by tenant role and resource relationship in repositories.',
        'Knowing a source ID is proof of permission to change it.',
      ],
      [
        'feed-go-concurrent-registration',
        'Use unique constraints and transaction retry to reconcile simultaneous equivalent source registrations.',
        'Checking for an existing row before insert prevents every duplicate race.',
      ],
    ]
  ),
  feedModule(
    'feed-go-entry-identity-upsert-versions',
    'Entry Identity, Idempotent Upsert, Revisions, and Deletion Semantics',
    'Every poll inserts duplicates, title edits create new posts, reused GUIDs overwrite unrelated content, disappeared entries are deleted immediately, and revision causes vanish.',
    'idempotent versioned entry ingestion model',
    [
      [
        'feed-go-entry-key-scope',
        'Bind external entry identity to feed scope and format semantics, detect collisions, and retain the raw identity basis.',
        'A GUID is globally unique even when isPermaLink is false.',
      ],
      [
        'feed-go-upsert-invariants',
        'Insert new, ignore unchanged, version changed, and quarantine conflicting entries atomically under unique constraints.',
        'ON CONFLICT DO UPDATE makes any feed import idempotent.',
      ],
      [
        'feed-go-content-revisions',
        'Store meaningful normalized revisions with source fetch, field diff, timestamps, and bounded retention instead of overwriting evidence.',
        'Only the newest entry content matters to readers and operators.',
      ],
      [
        'feed-go-disappearance-policy',
        'Treat absence from one finite feed page as weak evidence and apply explicit tombstone, retention, correction, and publisher-delete policy.',
        'An entry missing from the latest response has been deleted by its author.',
      ],
      [
        'feed-go-reingestion-reconciliation',
        'Prove replay, reordered items, duplicate IDs, corrected dates, moved links, and partial failure converge on the same admitted state.',
        'Running the same parser twice is enough idempotency evidence.',
      ],
    ]
  ),
  feedModule(
    'feed-go-ingestion-unit-of-work',
    'Fetch-to-Commit Ingestion Unit, Checkpoints, and Partial Failure',
    'Validators commit before entries, half a feed becomes visible, parse failure erases the last good state, metrics report success before commit, and retries duplicate side effects.',
    'atomic feed ingestion unit of work',
    [
      [
        'feed-go-ingestion-state-machine',
        'Model claimed, fetching, fetched, parsed, normalized, committing, committed, failed, canceled, and superseded states.',
        'A function call stack is sufficient ingestion state evidence.',
      ],
      [
        'feed-go-atomic-visible-state',
        'Commit feed metadata, entries, revisions, validators, next schedule, and audit record together or preserve the prior admitted version.',
        'Individual successful inserts may become visible before the batch completes.',
      ],
      [
        'feed-go-checkpoint-boundary',
        'Checkpoint only replay-safe boundaries and bind each checkpoint to source, validator, parser version, schema, and attempt identity.',
        'Checkpointing after every line always improves recovery.',
      ],
      [
        'feed-go-side-effect-idempotency',
        'Use stable attempt keys, database constraints, and post-commit publication so retries do not duplicate events or notifications.',
        'At-least-once retries are harmless when HTTP GET is safe.',
      ],
      [
        'feed-go-ingestion-reconciliation',
        'Reconcile fetched, admitted, inserted, updated, unchanged, rejected, quarantined, and committed counts exactly.',
        'Logging total parsed items proves database ingestion completeness.',
      ],
    ]
  ),
  feedModule(
    'feed-go-scheduler-clocks-backoff',
    'Due Scheduling, Monotonic Clocks, Backoff, Jitter, and Pause Policy',
    'A ticker polls every feed at one interval, wall-clock jumps duplicate work, failures retry in lockstep, successful publishers never adapt, and paused sources remain due.',
    'deterministic adaptive polling scheduler',
    [
      [
        'feed-go-due-state',
        'Persist next attempt, last success, failure streak, publisher hints, pause state, and scheduling reason independently from process memory.',
        'A process-local ticker is a durable scheduler.',
      ],
      [
        'feed-go-clock-injection',
        'Inject wall and monotonic time roles, define inclusive due comparisons, and test forward, backward, and boundary changes.',
        'time.Now calls throughout the code are harmless to deterministic tests.',
      ],
      [
        'feed-go-backoff-jitter',
        'Apply bounded exponential backoff with deterministic-testable jitter, reset rules, Retry-After, and maximum staleness escalation.',
        'Random sleep after failure is a complete retry policy.',
      ],
      [
        'feed-go-success-adaptation',
        'Adjust cadence from update history and publisher guidance without exceeding freshness or publisher budgets.',
        'Every feed should be fetched at exactly the same fixed interval.',
      ],
      [
        'feed-go-pause-resume',
        'Make manual, policy, repeated-failure, deletion, and incident pauses explicit, authorized, observable, and safely resumable.',
        'Setting next_fetch_at to NULL explains every pause reason.',
      ],
    ]
  ),
  feedModule(
    'feed-go-postgres-leases-fencing',
    'PostgreSQL Work Claims, SKIP LOCKED, Leases, and Fencing',
    'Multiple instances poll one source, row locks span network calls, expired workers commit late results, leases renew silently after ownership loss, and queue fairness is unknown.',
    'multi-instance fenced fetch-claim protocol',
    [
      [
        'feed-go-short-claim-transaction',
        'Claim a bounded due batch with ordered FOR UPDATE SKIP LOCKED work in a short transaction and release locks before network I/O.',
        'Holding a row lock during the HTTP fetch guarantees the safest ownership.',
      ],
      [
        'feed-go-lease-token',
        'Issue attempt and fencing tokens with owner, expiry, heartbeat budget, and state so stale workers cannot commit.',
        'An unexpired timestamp alone proves the current worker owns the job.',
      ],
      [
        'feed-go-conditional-finalize',
        'Finalize success or failure only when source, attempt, token, and current lease match in one affected-row check.',
        'A late worker can safely overwrite a newer result if its fetch began first.',
      ],
      [
        'feed-go-fair-queue-order',
        'Define due, priority, tenant, publisher, and starvation policy and test busy, empty, skewed, and repeatedly failing queues.',
        'ORDER BY next_fetch_at alone guarantees fairness at scale.',
      ],
      [
        'feed-go-lease-fault-evidence',
        'Test crash after claim, expiry during fetch, duplicate claim, heartbeat loss, database failover, cancellation, and stale completion.',
        'Two workers never overlap when SKIP LOCKED is present.',
      ],
    ]
  ),
  feedModule(
    'feed-go-worker-pool-cancellation',
    'Bounded Worker Pool, Origin Fairness, Cancellation, and Shutdown',
    'The scheduler launches one goroutine per source, results block after cancellation, one origin occupies all workers, panics leak claims, and shutdown exits before commits settle.',
    'bounded origin-aware ingestion worker pool',
    [
      [
        'feed-go-concurrency-budget',
        'Derive global, tenant, origin, database, memory, and queue budgets and enforce the minimum active constraint.',
        'More goroutines always increase feed freshness.',
      ],
      [
        'feed-go-channel-ownership',
        'Assign producers, closers, receivers, buffers, and terminal states so sends, closes, and drains cannot race or block forever.',
        'Any worker may close a shared results channel when it finishes.',
      ],
      [
        'feed-go-origin-fairness',
        'Prevent one publisher from consuming all slots while preserving useful throughput and explicit per-origin limits.',
        'A global semaphore automatically provides publisher fairness.',
      ],
      [
        'feed-go-panic-error-containment',
        'Convert controlled worker failure into claimed-job evidence, preserve cause, release or expire ownership, and keep the pool observable.',
        'Recovering every panic and continuing is always safe.',
      ],
      [
        'feed-go-shutdown-join',
        'Stop claims, cancel fetches, bound drain time, join workers, finalize or abandon leases safely, close pools, and report incomplete work.',
        'Canceling the root context proves every goroutine and database operation stopped.',
      ],
    ]
  ),
  feedModule(
    'feed-go-http-api-resources',
    'HTTP API Resources, Representations, Errors, and Handler Layers',
    'Routes mirror tables, handlers parse, query, and render directly, status codes are ad hoc, response shapes drift, and request cancellation never reaches storage.',
    'consistent feed-reader HTTP API',
    [
      [
        'feed-go-resource-model',
        'Design tenant, source, subscription, entry, collection, search, and reader-state resources around client decisions rather than tables.',
        'A CRUD endpoint for every table is a coherent API.',
      ],
      [
        'feed-go-handler-layers',
        'Separate routing, authority, request admission, application command, repository, representation, and observability with narrow interfaces.',
        'One large handler minimizes bugs by avoiding abstractions.',
      ],
      [
        'feed-go-method-status-contract',
        'Apply safe and idempotent method semantics, success statuses, preconditions, redirects, and retry guidance consistently.',
        'Returning 200 with an error field is simpler for clients.',
      ],
      [
        'feed-go-problem-responses',
        'Return bounded stable problem details with correlation identity and field causes without leaking internals, SQL, URLs, or secrets.',
        'Raw Go errors are the most useful API response.',
      ],
      [
        'feed-go-request-cancellation',
        'Propagate the request context through application, database, and downstream work while preventing client disconnect from corrupting durable jobs.',
        'Every disconnect should cancel already-committed ingestion work.',
      ],
    ]
  ),
  feedModule(
    'feed-go-auth-tenant-privacy',
    'Authentication, Authorization, Tenant Isolation, and Privacy',
    'User IDs arrive in headers, handlers authorize by route presence, shared source data leaks private follows, audit logs capture tokens and reading history, and deletion scope is unclear.',
    'tenant-safe identity and privacy boundary',
    [
      [
        'feed-go-authentication-boundary',
        'Verify configured token issuer, audience, algorithm, time, key rotation, and transport before constructing a minimal principal.',
        'Decoding a token proves it is authentic and intended for this service.',
      ],
      [
        'feed-go-resource-authorization',
        'Authorize each command from principal, tenant, role, ownership, relationship, and current resource state inside the application boundary.',
        'Authenticated users may access any resource ID they can guess.',
      ],
      [
        'feed-go-tenant-query-proof',
        'Require tenant scope in repository APIs, SQL predicates, unique keys, tests, metrics, exports, and administrative paths.',
        'A tenant field in application structs prevents cross-tenant database reads.',
      ],
      [
        'feed-go-reading-privacy',
        'Minimize follows, read state, search, telemetry, retention, access, export, deletion, and support exposure by purpose.',
        'Reading history is harmless operational metadata.',
      ],
      [
        'feed-go-audit-redaction',
        'Record actor, decision, resource, outcome, and correlation evidence while redacting tokens, feed content, private URLs, SQL, and sensitive queries.',
        'More audit detail always improves security.',
      ],
    ]
  ),
  feedModule(
    'feed-go-cursor-pagination-consistency',
    'Cursor Pagination, Ordering, Filters, and Snapshot Behavior',
    'Entry lists use offset only, equal timestamps reorder, inserts create duplicates between pages, cursor fields are trusted, filters bypass indexes, and end boundaries are ambiguous.',
    'stable bounded reader timeline query',
    [
      [
        'feed-go-total-order',
        'Choose a deterministic immutable-enough order with unique tie-breaker and document updates that can move entries.',
        'published_at alone creates a total stable order.',
      ],
      [
        'feed-go-cursor-envelope',
        'Encode version, tenant, sort values, direction, filters, expiry, and integrity without exposing authority or accepting arbitrary SQL.',
        'Base64 makes a cursor trustworthy and opaque.',
      ],
      [
        'feed-go-keyset-query',
        'Build forward and backward keyset predicates that match sort direction, null policy, indexes, and limit-plus-one boundaries.',
        'Replacing OFFSET with one greater-than predicate is always correct.',
      ],
      [
        'feed-go-page-change-evidence',
        'Test equal timestamps, inserts, edits, deletes, filter changes, reverse navigation, empty pages, and cursor expiry.',
        'One static fixture proves pagination consistency.',
      ],
      [
        'feed-go-pagination-accessibility',
        'Expose next and previous links, result counts or bounded uncertainty, stable headings, focus behavior, and no infinite-scroll requirement.',
        'Cursor pagination must be implemented as endless scrolling.',
      ],
    ]
  ),
  feedModule(
    'feed-go-postgres-search-ranking',
    'PostgreSQL Full-Text Search, Ranking, Language, and Abuse Budgets',
    'Search concatenates SQL, indexes raw HTML, assumes one language, ranking is unexplained, snippets render unsafe markup, and broad queries consume unbounded work.',
    'bounded explainable entry search',
    [
      [
        'feed-go-search-document',
        'Build a provenance-aware tsvector from admitted title, summary, safe text content, author, and categories with weighting and language policy.',
        'Indexing raw feed HTML creates the best search document.',
      ],
      [
        'feed-go-query-admission',
        'Convert bounded user input through an explicit plainto, websearch, or structured tsquery policy and reject pathological or empty requests.',
        'Passing user text directly to to_tsquery is safe and intuitive.',
      ],
      [
        'feed-go-gin-plan-evidence',
        'Pair GIN and supporting indexes with representative EXPLAIN evidence, data scale, selectivity, write cost, and regression thresholds.',
        'The presence of a GIN index proves every search uses it efficiently.',
      ],
      [
        'feed-go-ranking-tiebreak',
        'Combine text rank, recency, source, and deterministic tie-breakers without claiming objective relevance.',
        'ts_rank alone is a universally fair relevance score.',
      ],
      [
        'feed-go-safe-snippets',
        'Generate bounded snippets from safe text or sanitize marked fragments and expose matched terms without unsafe feed markup.',
        'ts_headline output can always be injected into HTML unchanged.',
      ],
    ]
  ),
  feedModule(
    'feed-go-accessible-reader-content-safety',
    'Accessible Reader Surface, Untrusted Content, and Safe Links',
    'The UI injects feed HTML, opens deceptive links, depends on card color, loses focus after updates, hides source context, and forces infinite scroll.',
    'keyboard-first content-safe feed reader',
    [
      [
        'feed-go-untrusted-content',
        'Treat titles, authors, summaries, HTML, images, categories, and URLs as untrusted publisher input through render-time safety boundaries.',
        'XML parsing makes feed content safe HTML.',
      ],
      [
        'feed-go-content-render-policy',
        'Prefer safe text, use a tested allowlist sanitizer only where needed, rewrite links, block active content, and preserve readable structure.',
        'Escaping every string and allowing raw HTML are the only two choices.',
      ],
      [
        'feed-go-reader-semantics',
        'Use one page heading, feed and entry landmarks, descriptive link text, metadata lists, dates, language, and source provenance.',
        'Visual cards provide enough structure for assistive technology.',
      ],
      [
        'feed-go-keyboard-focus-status',
        'Support complete keyboard flow, visible focus, large targets, announced refresh and errors, and stable focus after dynamic updates.',
        'Browsers automatically place focus correctly after content changes.',
      ],
      [
        'feed-go-reflow-motion-media',
        'Support narrow reflow, zoom, reduced motion, non-color state, image alternatives, content warnings, and user-controlled media.',
        'Responsive CSS alone proves the reader is accessible.',
      ],
    ]
  ),
  feedModule(
    'feed-go-reader-state-commands',
    'Read, Unread, Star, Tag, Bulk Action, and Conflict Semantics',
    'Reading an entry mutates global source state, bulk operations partially apply silently, device updates overwrite each other, tags leak across tenants, and unread counts drift.',
    'consistent personal reader-state model',
    [
      [
        'feed-go-personal-state-ownership',
        'Keep read, unread, starred, hidden, saved, and tag relationships scoped to principal, tenant, and entry without mutating shared content.',
        'Marking an entry read should change the shared entry row.',
      ],
      [
        'feed-go-idempotent-state-api',
        'Make set-state commands idempotent with explicit desired state, preconditions where needed, and stable response semantics.',
        'A toggle endpoint is naturally retry safe.',
      ],
      [
        'feed-go-bulk-transaction-policy',
        'Define bounded all-or-nothing or per-item bulk semantics, authorization, result reconciliation, and retry behavior.',
        'Bulk updates may succeed partially without item-level evidence.',
      ],
      [
        'feed-go-conflict-resolution',
        'Use versions or timestamps deliberately for multi-device conflicts and distinguish stale writes from repeated commands.',
        'Last write wins is always acceptable for personal state.',
      ],
      [
        'feed-go-count-reconciliation',
        'Derive or maintain unread and saved counts with transaction, cache, repair, and changed-case evidence.',
        'A displayed counter cannot drift if each command updates it.',
      ],
    ]
  ),
  feedModule(
    'feed-go-api-cache-preconditions',
    'Reader API Caching, ETags, Preconditions, and Invalidation',
    'Personal timelines are cached publicly, validators omit tenant and filters, 304 responses ignore authorization changes, writes leave stale pages, and weak and strong tags are confused.',
    'privacy-safe conditional reader API',
    [
      [
        'feed-go-cache-classification',
        'Classify public, tenant-private, user-private, sensitive, non-storeable, and invalidation-sensitive representations before fields are set.',
        'GET responses are safe for shared caches by default.',
      ],
      [
        'feed-go-representation-etag',
        'Derive validators from authorized representation version, query, locale, content negotiation, and principal scope and choose weak or strong semantics.',
        'Hashing the response body creates the right ETag for every client.',
      ],
      [
        'feed-go-conditional-get',
        'Evaluate If-None-Match precedence and If-Modified-Since correctly after authentication and representation selection.',
        'A matching ETag can bypass current authorization.',
      ],
      [
        'feed-go-write-preconditions',
        'Apply If-Match or version preconditions to conflict-sensitive writes and return current recovery evidence on mismatch.',
        'Idempotent methods never need concurrency preconditions.',
      ],
      [
        'feed-go-invalidation-proof',
        'Test subscribe, ingest, edit, delete, read-state, authorization, locale, and deployment changes against cache keys and validators.',
        'A short max-age removes the need for invalidation tests.',
      ],
    ]
  ),
  feedModule(
    'feed-go-observability-slos-capacity',
    'Causal Observability, Freshness SLOs, Capacity, and Cost',
    'Logs contain feed bodies and tokens, traces lose attempt identity, averages hide stale publishers, metrics explode by URL, and load tests ignore PostgreSQL and origin budgets.',
    'privacy-minimized feed-service operations report',
    [
      [
        'feed-go-correlation-model',
        'Correlate request, tenant-safe source key, schedule claim, fetch attempt, validator, parse, transaction, and response without leaking raw private identifiers.',
        'One request ID explains background work across retries and processes.',
      ],
      [
        'feed-go-structured-redacted-logs',
        'Emit bounded structured events with causal error identity and tested redaction for URLs, content, queries, headers, tokens, SQL, and personal state.',
        'Debug logging full feed payloads is acceptable outside production.',
      ],
      [
        'feed-go-freshness-slos',
        'Define availability, successful-poll, publisher-respect, ingestion-lag, reader-latency, and restore indicators with windows and error budgets.',
        'Average fetch duration measures reader freshness.',
      ],
      [
        'feed-go-cardinality-budgets',
        'Bound metric labels, trace sampling, event retention, tenant exposure, and telemetry cost while retaining incident usefulness.',
        'Using source URL as a metric label makes dashboards easier.',
      ],
      [
        'feed-go-capacity-model',
        'Load representative publishers, item sizes, update rates, tenants, reads, searches, failures, and restores against CPU, memory, connections, locks, and budgets.',
        'A handler requests-per-second benchmark proves ingestion capacity.',
      ],
    ]
  ),
  feedModule(
    'feed-go-tests-fixtures-fuzz-race',
    'Unit Fixtures, Properties, Fuzzing, Race Detection, and Leak Evidence',
    'Tests use one copied feed, assert only counts, contact public sites, share mutable clocks, skip malformed XML, and infer race freedom from normal runs.',
    'layered deterministic Go evidence suite',
    [
      [
        'feed-go-original-fixture-matrix',
        'Create small original RSS, Atom, namespace, encoding, date, identity, update, malformed, entity, oversized, and extension fixtures with explicit expected evidence.',
        'One real-world feed fixture provides broad coverage.',
      ],
      [
        'feed-go-pure-unit-boundaries',
        'Test URL, discovery, parse, normalize, schedule, state, cursor, search, and policy functions with injected clocks and deterministic inputs.',
        'Only integration tests can prove meaningful backend behavior.',
      ],
      [
        'feed-go-property-fuzz-invariants',
        'Fuzz XML tokens, URLs, dates, cursors, state transitions, and normalization with bounded invariants and preserved minimal failures.',
        'A fuzzer finding no panic proves semantic correctness.',
      ],
      [
        'feed-go-race-leak-evidence',
        'Run targeted concurrent claims, workers, caches, cancellation, pool shutdown, and handler tests under the race detector with goroutine and resource completion checks.',
        'The race detector proves there are no deadlocks or leaks.',
      ],
      [
        'feed-go-test-nonclaims',
        'Label browser models, unit fixtures, loopback HTTP, temporary PostgreSQL, race, fuzz, load, accessibility, platform, and production evidence separately.',
        'A green test suite supports every production claim.',
      ],
    ]
  ),
  feedModule(
    'feed-go-integration-postgres-http-faults',
    'PostgreSQL Integration, Loopback HTTP, Fault Injection, and Reconciliation',
    'Mocks confirm SQL strings but not constraints, HTTP tests skip redirects and compression, retries never meet real transaction errors, and cleanup is not asserted.',
    'disposable end-to-end ingestion harness',
    [
      [
        'feed-go-disposable-postgres',
        'Start an isolated compatible PostgreSQL 18 database, apply real migrations, seed original data, isolate tests, and prove teardown.',
        'SQLite or a query mock proves PostgreSQL constraints and locking.',
      ],
      [
        'feed-go-controlled-http-origin',
        'Use httptest origins and custom transports for validators, redirects, DNS decisions, compression, slow bodies, malformed bytes, disconnects, and publisher budgets.',
        'Public feed URLs are the most realistic integration test dependency.',
      ],
      [
        'feed-go-database-faults',
        'Inject constraint, serialization, deadlock, lock wait, pool exhaustion, cancellation, connection loss, and commit ambiguity with expected recovery.',
        'Database failures can be represented by returning one generic error.',
      ],
      [
        'feed-go-process-signal-harness',
        'Run built commands or services in subprocesses for startup, migration, health, signal, drain, exit status, and incomplete-work evidence.',
        'Calling main-like functions proves OS signal and process behavior.',
      ],
      [
        'feed-go-e2e-reconciliation',
        'Reconcile HTTP bytes, parsed entries, committed rows, versions, validators, queue state, API output, telemetry, and cleanup after success and failure.',
        'Matching one API response proves the ingestion pipeline.',
      ],
    ]
  ),
  feedModule(
    'feed-go-security-abuse-retention',
    'SSRF, XML, Content, Query, Abuse, Secrets, and Retention Defense',
    'Security is split across ad hoc checks, admin paths bypass URL policy, XML and HTML have different budgets, search supports denial of service, secrets enter logs, and data is kept forever.',
    'threat-modeled feed-service control set',
    [
      [
        'feed-go-threat-model',
        'Trace assets, actors, trust boundaries, entry points, abuse cases, controls, detection, response, and residual risk across every data flow.',
        'Using HTTPS and parameterized SQL covers the service threat model.',
      ],
      [
        'feed-go-ssrf-defense-in-depth',
        'Combine URL grammar, allow or deny policy, address validation, redirect checks, proxy controls, egress isolation, metadata blocking, and rebinding tests.',
        'Application string validation alone is a complete SSRF defense.',
      ],
      [
        'feed-go-parser-render-query-budgets',
        'Align wire, decompression, XML, text, HTML sanitation, search, pagination, bulk, and export limits so one stage cannot amplify another.',
        'Each subsystem can choose an unrelated generous limit safely.',
      ],
      [
        'feed-go-secret-configuration',
        'Load typed configuration from approved sources, separate environments, redact values, rotate credentials, and reject insecure defaults.',
        'Environment variables may be printed because operators already have access.',
      ],
      [
        'feed-go-retention-deletion',
        'Set purpose-bound retention for raw responses, content revisions, logs, reading state, accounts, backups, legal holds, and deletion verification.',
        'Feed content is public, so retention and deletion do not matter.',
      ],
    ]
  ),
  feedModule(
    'feed-go-deployment-health-migrations',
    'Container Delivery, Health, Migration Coordination, and Safe Rollout',
    'The image runs as root, startup mutates schema on every replica, readiness ignores PostgreSQL and backlog, shutdown drops leases, and rollout lacks version compatibility.',
    'deployable Go feed-service release unit',
    [
      [
        'feed-go-reproducible-image',
        'Build a minimal non-root pinned multi-stage image with exact binary, migrations, certificates, ownership, metadata, SBOM, signature, and vulnerability evidence.',
        'A small image tag is automatically reproducible and trustworthy.',
      ],
      [
        'feed-go-config-startup',
        'Validate configuration, secrets references, database compatibility, migration state, network policy, budgets, and dependency reachability before serving.',
        'The service should start and discover configuration errors on first request.',
      ],
      [
        'feed-go-health-semantics',
        'Separate liveness, readiness, startup, degraded ingestion, backlog, database, and maintenance states without exposing secrets or causing restart loops.',
        'One endpoint that returns 200 when the process runs is complete health evidence.',
      ],
      [
        'feed-go-migration-coordination',
        'Run migrations through one owned release step with locks, timeout, compatibility gates, evidence, and explicit failure handling.',
        'Every application replica may run migrations concurrently at startup.',
      ],
      [
        'feed-go-progressive-rollout',
        'Canary compatible binaries and schema with traffic, worker, freshness, error-budget, rollback, and kill-switch evidence.',
        'A successful container launch justifies immediate full rollout.',
      ],
    ]
  ),
  feedModule(
    'feed-go-backup-restore-disaster',
    'Backup, Point-in-Time Recovery, Rebuild, and Disaster Reconciliation',
    'Backups exist but are untested, feed content is assumed refetchable, reader state shares no recovery objective, restore replays workers early, and corruption remains hidden.',
    'rehearsed feed-service recovery system',
    [
      [
        'feed-go-data-class-recovery',
        'Assign RPO, RTO, retention, encryption, restore, and rebuild strategy separately to accounts, subscriptions, reader state, feeds, entries, raw evidence, and telemetry.',
        'All feed data can simply be fetched again after loss.',
      ],
      [
        'feed-go-backup-verification',
        'Verify scheduled backups, WAL continuity, encryption, access, checksums, catalog, age, capacity, and restore eligibility.',
        'A successful backup command proves the backup is usable.',
      ],
      [
        'feed-go-isolated-restore',
        'Restore into isolation, validate schema and application versions, reconcile counts and invariants, and prevent outbound fetching during inspection.',
        'Restoring directly over production is the fastest recovery test.',
      ],
      [
        'feed-go-replay-order',
        'Define migration, database restore, secret rotation, scheduler pause, validator review, worker resume, cache rebuild, and client reopening order.',
        'Workers should resume immediately so stale content refreshes sooner.',
      ],
      [
        'feed-go-disaster-drill',
        'Rehearse region loss, corruption, accidental deletion, bad migration, credential leak, publisher incident, and partial restore with owned timelines.',
        'One happy-path restore exercise covers every disaster.',
      ],
    ]
  ),
  feedModule(
    'feed-go-release-production-defense',
    'Release Reconciliation, Incident Response, and Production Defense',
    'The team has many passing checks but cannot bind source to artifact, explain feed loss, prove publisher respect, restore service, or identify residual risks.',
    'defensible production Go feed aggregator',
    [
      [
        'feed-go-release-chain',
        'Bind reviewed revision, generated code, migrations, dependency graph, tests, image digest, SBOM, signature, configuration, and deployment identity.',
        'A mutable image tag identifies the reviewed release.',
      ],
      [
        'feed-go-end-to-end-proof',
        'Demonstrate unfamiliar RSS and Atom sources from authorized discovery through bounded fetch, normalization, transaction, scheduling, API, accessible reader, and cleanup.',
        'Replaying workshop fixtures is sufficient final mastery evidence.',
      ],
      [
        'feed-go-incident-command',
        'Triage freshness, publisher overload, SSRF, parser, database, tenant, content, search, rollout, and restore incidents with evidence-preserving containment.',
        'Restarting the service is the first response to every incident.',
      ],
      [
        'feed-go-stakeholder-defense',
        'Present useful, accessible, security, privacy, publisher, capacity, cost, migration, rollback, and recovery evidence to a cross-functional review board.',
        'Technical test output alone answers every stakeholder concern.',
        'professional',
        'evaluate',
      ],
      [
        'feed-go-residual-risk-ownership',
        'Record unsupported feed constructs, platform limits, false-positive controls, accessibility findings, capacity boundaries, owners, deadlines, and stop conditions.',
        'Passing release gates means no residual risk remains.',
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
    'Controls RSS channel, item, GUID, date, enclosure, category, source, and extension coverage.',
  ],
  [
    'Atom Syndication Format',
    'standards-body',
    'https://www.rfc-editor.org/rfc/rfc4287',
    'RFC 4287',
    'Controls Atom documents, namespaces, text constructs, IDs, links, dates, content, extensions, and security.',
  ],
  [
    'XML 1.0 Fifth Edition',
    'standards-body',
    'https://www.w3.org/TR/xml/',
    'W3C Recommendation',
    'Controls well-formedness, encodings, namespaces-adjacent processing, entities, and document structure.',
  ],
  [
    'URI Generic Syntax',
    'standards-body',
    'https://www.rfc-editor.org/rfc/rfc3986',
    'RFC 3986',
    'Controls URI resolution, normalization, identity, and comparison boundaries.',
  ],
  [
    'WHATWG Feed Autodiscovery',
    'standards-body',
    'https://blog.whatwg.org/feed-autodiscovery',
    'Current 2026-07-15',
    'Controls alternate-link feed discovery and supported media types.',
  ],
  [
    'HTTP Semantics',
    'standards-body',
    'https://www.rfc-editor.org/rfc/rfc9110',
    'RFC 9110',
    'Controls methods, status, fields, validators, conditional requests, redirects, and representations.',
  ],
  [
    'HTTP Caching',
    'standards-body',
    'https://www.rfc-editor.org/rfc/rfc9111',
    'RFC 9111',
    'Controls freshness, validation, storage, invalidation, and private versus shared caching.',
  ],
  [
    'Go 1.26 Release Notes',
    'official-docs',
    'https://go.dev/doc/go1.26',
    'Go 1.26.5',
    'Controls the course compiler and standard-library baseline.',
  ],
  [
    'Go encoding/xml',
    'official-docs',
    'https://pkg.go.dev/encoding/xml@go1.26.5',
    'Go 1.26.5',
    'Controls token decoding, strict mode, entities, charset readers, namespaces, and cleanup.',
  ],
  [
    'Go net/http',
    'official-docs',
    'https://pkg.go.dev/net/http@go1.26.5',
    'Go 1.26.5',
    'Controls client and server ownership, limits, contexts, redirects, transports, and test boundaries.',
  ],
  [
    'Go context',
    'official-docs',
    'https://pkg.go.dev/context@go1.26.5',
    'Go 1.26.5',
    'Controls cancellation, deadlines, values, and ownership propagation.',
  ],
  [
    'Go Testing',
    'official-docs',
    'https://pkg.go.dev/testing@go1.26.5',
    'Go 1.26.5',
    'Controls unit, benchmark, example, fuzz, and cleanup evidence.',
  ],
  [
    'Go Race Detector',
    'official-docs',
    'https://go.dev/doc/articles/race_detector',
    'Current 2026-07-15',
    'Controls race-instrumented execution and non-claims.',
  ],
  [
    'pgx v5',
    'official-docs',
    'https://pkg.go.dev/github.com/jackc/pgx/v5',
    'v5.10.0',
    'Controls PostgreSQL connections, queries, transactions, errors, copying, and protocol behavior.',
  ],
  [
    'pgxpool v5',
    'official-docs',
    'https://pkg.go.dev/github.com/jackc/pgx/v5/pgxpool',
    'v5.10.0',
    'Controls concurrency-safe pooling, acquisition, health, statistics, and shutdown.',
  ],
  [
    'goose migrations',
    'official-docs',
    'https://github.com/pressly/goose',
    'v3.27.2',
    'Controls versioned SQL migrations, status, validation, and execution.',
  ],
  [
    'PostgreSQL 18 Documentation',
    'official-docs',
    'https://www.postgresql.org/docs/18/',
    'PostgreSQL 18.4',
    'Controls schema, constraints, transactions, locking, indexes, text search, backup, and recovery.',
  ],
  [
    'PostgreSQL SELECT and SKIP LOCKED',
    'official-docs',
    'https://www.postgresql.org/docs/18/sql-select.html',
    'PostgreSQL 18.4',
    'Controls row claims, ordering, NOWAIT, SKIP LOCKED, and lock boundaries.',
  ],
  [
    'PostgreSQL Full Text Search',
    'official-docs',
    'https://www.postgresql.org/docs/18/textsearch.html',
    'PostgreSQL 18.4',
    'Controls documents, queries, ranking, highlighting, dictionaries, and indexes.',
  ],
  [
    'OpenAPI Specification',
    'standards-body',
    'https://spec.openapis.org/oas/v3.2.0.html',
    'OpenAPI 3.2.0',
    'Controls API operation, schema, response, security, and compatibility evidence.',
  ],
  [
    'Problem Details for HTTP APIs',
    'standards-body',
    'https://www.rfc-editor.org/rfc/rfc9457',
    'RFC 9457',
    'Controls bounded machine-readable API failure representations.',
  ],
  [
    'OWASP SSRF Prevention',
    'recognized-security-framework',
    'https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html',
    'Current 2026-07-15',
    'Controls URL, DNS, redirect, address, proxy, egress, metadata, and rebinding defenses.',
  ],
  [
    'OWASP Cross Site Scripting Prevention',
    'recognized-security-framework',
    'https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html',
    'Current 2026-07-15',
    'Controls untrusted feed-content rendering, encoding, sanitization, and safe sinks.',
  ],
  [
    'Web Content Accessibility Guidelines 2.2',
    'standards-body',
    'https://www.w3.org/TR/WCAG22/',
    'W3C Recommendation 2024-12-12',
    'Controls keyboard, focus, target size, status, reflow, contrast, motion, semantics, and text alternatives.',
  ],
  [
    'OpenTelemetry Semantic Conventions',
    'official-docs',
    'https://opentelemetry.io/docs/specs/semconv/',
    'Current 2026-07-15',
    'Controls HTTP, database, error, and privacy-aware telemetry meaning.',
  ],
  [
    'NIST Secure Software Development Framework',
    'recognized-security-framework',
    'https://csrc.nist.gov/pubs/sp/800/218/final',
    'SP 800-218',
    'Controls release integrity, provenance, vulnerability response, and secure development evidence.',
  ],
  [
    'ACM IEEE AAAI Computer Science Curricula',
    'recognized-curriculum-framework',
    'https://csed.acm.org/',
    'CS2023',
    'Controls systems, networking, data, security, software, professional, and project coverage.',
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

export const buildBlogAggregatorGoConfig = finalizeCourse(
  {
    id: 'build-blog-aggregator-go',
    title: 'Build and Ship a Production Feed Aggregator in Go 1.26',
    version: '2026.07',
    audience: {
      description:
        'Advanced Go backend learners ready to integrate feed standards, bounded XML and HTTP, PostgreSQL, scheduling, multi-instance concurrency, APIs, accessible presentation, security, testing, deployment, and recovery into one cumulative service.',
      entryKnowledge: [
        'Build, test, and operate multi-package Go 1.26 services with context, goroutines, errors, interfaces, net/http, and structured cleanup.',
        'Construct secure bounded HTTP clients and servers with authentication, validation, caching, observability, and fault evidence.',
        'Design constrained relational schemas, parameterized queries, transactions, indexes, migrations, and recovery evidence in PostgreSQL.',
        'Use Git and repository quality gates to preserve revision, tests, lint, security, release, and rollback evidence.',
      ],
      deviceConstraints: [
        'Desktop or tablet with a modern browser; native HTTP, DNS, PostgreSQL, race, process, container, load, backup, and deployment transfer labs require a local Go 1.26.5 and PostgreSQL 18.4 environment.',
      ],
      accessibilityAssumptions: [
        'All feed examples, XML, SQL, state traces, API output, reader UI, charts, code, and project evidence require structured text, keyboard operation, visible focus, non-color meaning, zoom, and reduced-motion support.',
      ],
    },
    scope: {
      includes: [
        'A cumulative multi-tenant RSS 2.0 and Atom 1.0 service from authorized discovery through publisher-friendly ingestion, PostgreSQL storage, search, APIs, and an accessible content-safe reader',
        'Go ownership, pgx pooling and transactions, migrations, conditional HTTP, bounded XML, normalization, durable scheduling, fenced claims, worker pools, observability, security, testing, deployment, backup, and recovery',
        'Original deterministic browser models plus controlled Go compiler, httptest, PostgreSQL, race, fuzz, subprocess, container, load, accessibility, backup, restore, and release transfer gates',
        'Five distinct stakeholder projects and a cumulative production defense',
      ],
      excludes: [
        'Copying another curriculum, tutorial prose, feed implementation, assessment, or solution',
        'Unbounded crawling, paywall or access-control bypass, CAPTCHA evasion, private-network access, publisher overload, arbitrary content execution, or retention without purpose',
        'Claims that browser Go execution proves native HTTP, DNS, XML library, PostgreSQL, process, race, load, accessibility, backup, deployment, or production behavior',
      ],
      nextCourses: ['build-web-scraper-go', 'capstone-project', 'job-search'],
    },
    sources,
    modules,
    projects: [
      project(
        'feed-go-community-source-registry',
        'Authorized Community Source Registry',
        'feed-go-normalized-domain-provenance',
        'A multilingual public-library news desk and local publishers',
        'They need explicit source approval, safe direct and autodiscovery flows, RSS and Atom parsing, URL and namespace provenance, bounded XML, loss reports, and publisher correction evidence.',
        [
          'feed-go-reader-decision',
          'feed-go-autodiscovery-links',
          'feed-go-ssrf-resolution',
          'feed-go-atom-feed-entry',
          'feed-go-loss-report',
        ]
      ),
      project(
        'feed-go-publisher-ingestion',
        'Publisher-Friendly Transactional Ingestion Service',
        'feed-go-ingestion-unit-of-work',
        'A nonprofit investigative newsroom and participating publishers',
        'They need conditional fetching, strict byte and parser budgets, constrained PostgreSQL records, reversible migrations, idempotent versioned entries, and exact fetch-to-commit reconciliation.',
        [
          'feed-go-validator-precedence',
          'feed-go-schema-constraints',
          'feed-go-expand-contract',
          'feed-go-upsert-invariants',
          'feed-go-atomic-visible-state',
        ]
      ),
      project(
        'feed-go-freshness-workers',
        'Fair Multi-Instance Freshness Scheduler',
        'feed-go-worker-pool-cancellation',
        'A regional emergency-information cooperative with many independent sources',
        'They need adaptive publisher-respecting schedules, short database claims, fencing against late workers, bounded origin-aware concurrency, graceful shutdown, and failure-recovery evidence.',
        [
          'feed-go-backoff-jitter',
          'feed-go-short-claim-transaction',
          'feed-go-conditional-finalize',
          'feed-go-origin-fairness',
          'feed-go-shutdown-join',
        ]
      ),
      project(
        'feed-go-accessible-reader',
        'Accessible Private Research Reader',
        'feed-go-api-cache-preconditions',
        'A disability-led civic research group working across shared and personal devices',
        'They need tenant-safe subscriptions, stable cursor timelines, bounded search, keyboard-first safe content, reliable personal state, privacy-aware validators, and recovery from conflicting updates.',
        [
          'feed-go-tenant-query-proof',
          'feed-go-keyset-query',
          'feed-go-safe-snippets',
          'feed-go-keyboard-focus-status',
          'feed-go-write-preconditions',
        ]
      ),
      project(
        'feed-go-production-defense',
        'Go Feed Service Release and Disaster Defense',
        'feed-go-release-production-defense',
        'A joint reader, publisher, accessibility, security, privacy, database, operations, and support board',
        'The board needs source-bound artifacts, migration and container evidence, publisher and reader SLOs, capacity findings, security controls, rehearsed backup and restore, incident containment, rollback, and owned residual risks.',
        [
          'feed-go-capacity-model',
          'feed-go-e2e-reconciliation',
          'feed-go-progressive-rollout',
          'feed-go-disaster-drill',
          'feed-go-residual-risk-ownership',
        ]
      ),
    ],
    examContext:
      'Unfamiliar Go feed-service cases spanning reader and publisher outcomes, Go 1.26 repository reproduction, authorized discovery and SSRF, RSS 2.0 and Atom 1.0, strict bounded XML and encodings, loss-aware normalization, conditional publisher-friendly HTTP, PostgreSQL schema and migrations, pgx pool and transaction ownership, shared sources and subscriptions, versioned idempotent entries, atomic ingestion, adaptive scheduling, SKIP LOCKED leases and fencing, bounded origin-aware workers, consistent HTTP resources, tenant privacy, cursor timelines, full-text search, accessible content-safe presentation, personal state, API validators, causal observability, SLOs and capacity, original fixtures, fuzz, race, PostgreSQL and loopback integration, threat and retention controls, container rollout, backup, point-in-time recovery, incident response, rollback, and residual-risk defense with explicit browser and controlled native boundaries.',
    minimumQuestionBankSize: 920,
  },
  {
    researchedAt: RESEARCHED_AT,
    prerequisiteCourseIds: [
      'go-basics',
      'http-clients-go',
      'http-servers-go',
      'sql-basics',
      'git-basics',
      'repository-quality-gates',
      'docker-basics',
    ],
  }
);

import { finalizeCourse, module, project, skill } from './course-config-helpers.mjs';

const REVIEWED_AT = '2026-07-14';
const RESEARCHED_AT = '2026-07-14T08:20:00.000Z';

const modules = [
  module(
    'sql-data-systems-lifecycle',
    'Data, Database Systems, and the Query Journey',
    'A support organization has inconsistent spreadsheets, duplicated customer facts, and no defensible retention process.',
    'a database adoption and data-lifecycle decision record',
    [
      skill(
        'sql-data-lifecycle',
        'Trace data through creation, processing, review, retention, retrieval, and defensible destruction.',
        'Keeping every field forever is the safest data policy.',
        'professional',
        'evaluate'
      ),
      skill(
        'sql-dbms-purpose',
        'Compare a DBMS with files and spreadsheets using integrity, concurrency, independence, recovery, and query needs.',
        'A database is just a larger spreadsheet.',
        'conceptual',
        'analyze'
      ),
      skill(
        'sql-dbms-components',
        'Trace a query through parser, planner, executor, storage, buffer, transaction, and recovery responsibilities.',
        'The database executes SQL directly in the order it is typed.',
        'conceptual',
        'explain'
      ),
      skill(
        'sql-declarative-thinking',
        'State the required result as a declarative relation while separating it from execution strategy.',
        'SQL requires the author to prescribe every loop and access path.',
        'conceptual',
        'apply'
      ),
      skill(
        'sql-data-custodianship',
        'Classify data purpose, owner, sensitivity, quality risk, retention, and downstream harm before storage.',
        'If collection is legal, every later use is automatically ethical.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  module(
    'sql-relational-model-keys-nulls',
    'Relations, Rows, Domains, Keys, and Missing Information',
    'Support tickets, teams, members, and events must become a precise relational model without duplicate identity or invented missing values.',
    'a key-and-null-aware relational model',
    [
      skill(
        'sql-relation-domain',
        'Explain relations, tuples, attributes, domains, degree, cardinality, and why row order is not relational meaning.',
        'A table is defined by its visible row order.',
        'conceptual',
        'explain'
      ),
      skill(
        'sql-super-candidate-primary-keys',
        'Distinguish superkeys, candidate keys, primary keys, alternate keys, and stable surrogate identifiers.',
        'Any unique-looking field is a durable primary key.',
        'conceptual',
        'analyze'
      ),
      skill(
        'sql-foreign-referential-keys',
        'Model optional and required references with foreign keys and predict update or delete consequences.',
        'A foreign-key value must be globally unique.',
        'procedural',
        'apply'
      ),
      skill(
        'sql-null-meaning',
        'Represent unknown, missing, inapplicable, and not-yet-known values without substituting misleading sentinels.',
        'NULL is the same as zero, an empty string, or the word unknown.',
        'conceptual',
        'analyze'
      ),
      skill(
        'sql-table-grain',
        'Declare the one-row meaning and reject mixed-grain tables before writing queries.',
        'A table can safely combine event, ticket, and monthly summary rows.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  module(
    'sql-select-expressions-types',
    'SELECT, Projection, Expressions, Types, and Result Contracts',
    'An operations analyst needs a readable, reproducible ticket extract whose columns carry explicit meaning.',
    'a typed ticket projection query pack',
    [
      skill(
        'sql-select-from',
        'Compose SELECT and FROM clauses that project only required columns from a named relation.',
        'SELECT * is the clearest and most stable production contract.',
        'procedural',
        'apply'
      ),
      skill(
        'sql-alias-contracts',
        'Use relation and column aliases to make provenance and output contracts unambiguous.',
        'Aliases change the stored schema.',
        'procedural',
        'apply'
      ),
      skill(
        'sql-scalar-expressions',
        'Build arithmetic, text, date, and CASE expressions while tracing input and output meaning.',
        'Every expression is evaluated before rows are selected.',
        'procedural',
        'apply'
      ),
      skill(
        'sql-type-conversion',
        'Distinguish implicit affinity from explicit conversion and test malformed or lossy values.',
        'The database always converts text to numbers safely.',
        'strategic',
        'analyze'
      ),
      skill(
        'sql-distinct-duplicates',
        'Use duplicate-preserving and duplicate-eliminating results intentionally and explain their cost and semantics.',
        'Duplicate output always proves duplicate stored rows.',
        'conceptual',
        'analyze'
      ),
    ]
  ),
  module(
    'sql-filtering-logic-order',
    'Filtering, Three-Valued Logic, Patterns, Ordering, and Pagination',
    'A queue view must include the correct unresolved tickets, handle missing owners, and remain deterministic across pages.',
    'a deterministic queue-filter query suite',
    [
      skill(
        'sql-where-predicates',
        'Combine comparison, range, membership, and boolean predicates with explicit grouping.',
        'AND and OR can be mixed safely without parentheses.',
        'procedural',
        'apply'
      ),
      skill(
        'sql-three-valued-logic',
        'Predict TRUE, FALSE, and UNKNOWN through comparisons and boolean operators involving NULL.',
        'A comparison with NULL returns FALSE.',
        'conceptual',
        'analyze'
      ),
      skill(
        'sql-null-predicates',
        'Use IS NULL, IS NOT NULL, COALESCE, and NULLIF only when their business meaning is justified.',
        'Equals NULL is the normal missing-value test.',
        'procedural',
        'apply'
      ),
      skill(
        'sql-pattern-filtering',
        'Apply LIKE and explicit escaping or case rules without confusing substring search with equality.',
        'LIKE automatically provides portable case-insensitive search.',
        'procedural',
        'apply'
      ),
      skill(
        'sql-order-limit-pagination',
        'Create deterministic multi-key ordering and evaluate offset and keyset pagination tradeoffs.',
        'LIMIT alone guarantees repeatable page membership.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  module(
    'sql-aggregation-grouping',
    'Aggregation, Grouping, HAVING, and Honest Metrics',
    'A service lead needs ticket counts and response effort by team without double counting or hiding teams with no work.',
    'an audited service-metrics query pack',
    [
      skill(
        'sql-aggregate-functions',
        'Use COUNT, SUM, AVG, MIN, and MAX while predicting empty-set, NULL, and type behavior.',
        'COUNT(column) and COUNT(*) always count the same rows.',
        'procedural',
        'apply'
      ),
      skill(
        'sql-group-by-grain',
        'Set result grain with GROUP BY and verify that every selected value is grouped or aggregated.',
        'GROUP BY merely sorts similar rows together.',
        'conceptual',
        'analyze'
      ),
      skill(
        'sql-having-filter',
        'Separate row filtering in WHERE from group filtering in HAVING.',
        'HAVING is a slower spelling of WHERE.',
        'procedural',
        'apply'
      ),
      skill(
        'sql-conditional-aggregation',
        'Produce multiple defensible measures with CASE or FILTER while preserving one clear denominator.',
        'A CASE expression inside an aggregate cannot change a metric denominator.',
        'procedural',
        'apply'
      ),
      skill(
        'sql-metric-validation',
        'Reconcile totals, denominators, missing groups, and changed cases before publishing an aggregate claim.',
        'A plausible dashboard total is sufficient validation.',
        'metacognitive',
        'evaluate'
      ),
    ]
  ),
  module(
    'sql-joins-cardinality',
    'Joins, Cardinality, Unmatched Rows, and Fanout Control',
    'Ticket, team, owner, and event data must be combined without losing unassigned work or multiplying effort totals.',
    'a cardinality-safe support investigation',
    [
      skill(
        'sql-inner-join',
        'Write explicit inner joins from relationship predicates and predict result cardinality before execution.',
        'JOIN automatically infers the correct relationship.',
        'procedural',
        'apply'
      ),
      skill(
        'sql-outer-join',
        'Use left, right, or full outer-join reasoning to retain required unmatched entities.',
        'A WHERE predicate on the optional side cannot change an outer join.',
        'conceptual',
        'analyze'
      ),
      skill(
        'sql-many-to-many-bridge',
        'Model and query many-to-many relationships through an associative relation with its own grain.',
        'A comma-separated identifier list is a relational many-to-many design.',
        'procedural',
        'apply'
      ),
      skill(
        'sql-self-cross-join',
        'Use self and cross joins only with explicit pair semantics and bounded cardinality.',
        'A self join compares each row only with itself.',
        'procedural',
        'apply'
      ),
      skill(
        'sql-fanout-diagnosis',
        'Detect join fanout with pre/post counts and repair aggregation at the correct grain.',
        'DISTINCT is a safe universal repair for duplicated join results.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  module(
    'sql-subqueries-ctes-sets',
    'Subqueries, CTEs, Set Operations, and Relational Reasoning',
    'Operations needs reusable query stages for backlog comparisons, missing relationships, and cohorts across time windows.',
    'a composable backlog-analysis query pipeline',
    [
      skill(
        'sql-scalar-table-subqueries',
        'Choose scalar, row, and table subqueries whose cardinality matches their surrounding expression.',
        'Every subquery may return any number of rows.',
        'procedural',
        'apply'
      ),
      skill(
        'sql-correlated-exists',
        'Distinguish correlated subqueries and use EXISTS or NOT EXISTS for semijoin and antijoin questions.',
        'NOT IN is always equivalent to NOT EXISTS when NULL appears.',
        'strategic',
        'analyze'
      ),
      skill(
        'sql-common-table-expressions',
        'Use CTEs to name query stages while distinguishing readability from materialization guarantees.',
        'A CTE always creates a temporary indexed table.',
        'procedural',
        'apply'
      ),
      skill(
        'sql-recursive-ctes',
        'Define anchor, recursive step, termination, and cycle or depth safeguards for hierarchical queries.',
        'A recursive CTE stops automatically when the desired row appears.',
        'procedural',
        'apply'
      ),
      skill(
        'sql-set-operations',
        'Use UNION, UNION ALL, INTERSECT, and EXCEPT with compatible columns and deliberate duplicate semantics.',
        'UNION ALL and JOIN combine relations in the same way.',
        'conceptual',
        'analyze'
      ),
    ]
  ),
  module(
    'sql-data-modification',
    'INSERT, UPDATE, DELETE, Upsert, and Mutation Evidence',
    'A ticket import and reassignment workflow must change only intended rows and retain evidence of what happened.',
    'a guarded ticket-mutation workflow',
    [
      skill(
        'sql-insert-values-select',
        'Insert validated rows from explicit values or a query while naming target columns.',
        'Omitting the target column list remains safe as schemas evolve.',
        'procedural',
        'apply'
      ),
      skill(
        'sql-update-scope',
        'Preview an UPDATE predicate as a SELECT and verify changed-row count and postconditions.',
        'An UPDATE without a WHERE clause is easy to undo later.',
        'procedural',
        'apply'
      ),
      skill(
        'sql-delete-scope',
        'Distinguish row deletion, truncation, and retention-safe archival while predicting referential effects.',
        'Deleting a parent can never affect related rows.',
        'procedural',
        'apply'
      ),
      skill(
        'sql-upsert-conflict',
        'Use a named uniqueness conflict and explicit update policy for idempotent ingestion.',
        'Upsert means overwrite every existing column.',
        'procedural',
        'apply'
      ),
      skill(
        'sql-mutation-returning-audit',
        'Capture affected identity, before/after evidence, actor, reason, and changed count for mutations.',
        'A successful command message proves the correct rows changed.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  module(
    'sql-modeling-normalization',
    'Requirements, ER Modeling, Functional Dependencies, and Normalization',
    'A growing incident system repeats team and member facts, mixes multiple values per cell, and produces update anomalies.',
    'a normalized incident-system schema defense',
    [
      skill(
        'sql-requirements-entities',
        'Derive entities, attributes, identifiers, relationships, optionality, and business rules from stakeholder language.',
        'Every noun in a requirement becomes its own table.',
        'strategic',
        'analyze'
      ),
      skill(
        'sql-relationship-cardinality',
        'Model one-to-one, one-to-many, and many-to-many relationships with minimum and maximum cardinality.',
        'A foreign key alone documents every optionality rule.',
        'conceptual',
        'apply'
      ),
      skill(
        'sql-functional-dependencies',
        'Identify functional dependencies and candidate keys from semantics rather than sample coincidence.',
        'If two sample columns match uniquely, one functionally determines the other.',
        'conceptual',
        'analyze'
      ),
      skill(
        'sql-normal-forms',
        'Transform repeating or partially dependent data through 1NF, 2NF, 3NF, and BCNF reasoning.',
        'Normalization means creating as many tables as possible.',
        'procedural',
        'apply'
      ),
      skill(
        'sql-lossless-dependency-design',
        'Defend decomposition with lossless-join and dependency-preservation evidence and justify bounded denormalization.',
        'Any decomposition that removes duplication is automatically correct.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  module(
    'sql-ddl-constraints-migrations',
    'DDL, Constraints, Schema Evolution, and Integrity Repair',
    'The support schema must reject impossible states and evolve while old application versions are still active.',
    'a constraint-rich, reversible schema migration',
    [
      skill(
        'sql-create-table-domains',
        'Define tables with deliberate types, defaults, generated values, and named constraints.',
        'Choosing a broad text type eliminates domain design work.',
        'procedural',
        'apply'
      ),
      skill(
        'sql-integrity-constraints',
        'Enforce NOT NULL, UNIQUE, CHECK, primary-key, and foreign-key invariants at the database boundary.',
        'Application validation makes database constraints redundant.',
        'procedural',
        'apply'
      ),
      skill(
        'sql-referential-actions',
        'Choose restrict, cascade, set-null, or set-default actions from lifecycle ownership semantics.',
        'Cascade delete is the cleanest default for every relationship.',
        'strategic',
        'evaluate'
      ),
      skill(
        'sql-migration-expand-contract',
        'Plan backward-compatible expand, backfill, verify, switch, and contract phases with rollback evidence.',
        'A migration is safe if its DDL succeeds on an empty database.',
        'professional',
        'apply'
      ),
      skill(
        'sql-integrity-repair',
        'Profile legacy violations, quarantine ambiguity, repair deterministically, and validate constraints before enforcement.',
        'Invalid legacy data should be silently coerced during migration.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  module(
    'sql-transactions-concurrency-recovery',
    'Transactions, Isolation, Concurrency, and Recovery',
    'Two operators reassign and resolve the same ticket while a failure occurs between related writes.',
    'a concurrency-safe ticket transition protocol',
    [
      skill(
        'sql-acid-transactions',
        'Explain atomicity, consistency, isolation, and durability using a multi-statement business invariant.',
        'ACID means every transaction runs one at a time.',
        'conceptual',
        'explain'
      ),
      skill(
        'sql-begin-commit-rollback',
        'Bound a unit of work with BEGIN, COMMIT, ROLLBACK, and savepoints and verify failure behavior.',
        'Errors always roll back every earlier statement automatically.',
        'procedural',
        'apply'
      ),
      skill(
        'sql-isolation-anomalies',
        'Recognize dirty read, nonrepeatable read, phantom, lost update, and write-skew schedules.',
        'A transaction prevents all concurrency anomalies at every isolation level.',
        'conceptual',
        'analyze'
      ),
      skill(
        'sql-concurrency-control',
        'Compare locking, multiversion, optimistic, and serialization-retry strategies from workload evidence.',
        'Retrying any failed transaction is always safe.',
        'strategic',
        'evaluate'
      ),
      skill(
        'sql-recovery-backup-restore',
        'Distinguish rollback, crash recovery, backup, replication, and tested point-in-time restoration.',
        'A replica is automatically a complete backup.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  module(
    'sql-window-analytics-time',
    'Window Functions, Analytical Grain, and Time-Aware SQL',
    'Service leaders need rankings, running effort, previous-event comparisons, and rolling metrics without collapsing detail rows.',
    'a time-aware service-level analytics report',
    [
      skill(
        'sql-window-partition-order',
        'Define window partition, order, and frame independently from final result ordering.',
        'ORDER BY inside OVER also sorts the final output.',
        'procedural',
        'apply'
      ),
      skill(
        'sql-ranking-functions',
        'Choose ROW_NUMBER, RANK, DENSE_RANK, and NTILE with explicit tie semantics.',
        'All ranking functions assign the same values when ties occur.',
        'procedural',
        'apply'
      ),
      skill(
        'sql-offset-functions',
        'Use LAG, LEAD, FIRST_VALUE, and LAST_VALUE with deliberate ordering and frame behavior.',
        'LAST_VALUE always means the final row in the partition.',
        'strategic',
        'analyze'
      ),
      skill(
        'sql-running-rolling-metrics',
        'Build running and rolling aggregates with explicit ROWS or RANGE frames and edge-case checks.',
        'The default frame is portable and always matches a running total.',
        'procedural',
        'apply'
      ),
      skill(
        'sql-time-semantics',
        'Separate instants, local civil time, duration, calendar boundaries, and incomplete reporting windows.',
        'A timestamp string without zone context identifies one universal instant.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  module(
    'sql-views-triggers-programs',
    'Views, Triggers, Reusable Database Logic, and Boundaries',
    'Multiple applications need a stable read contract and audited state transitions without hidden business behavior.',
    'a versioned read model and audited transition design',
    [
      skill(
        'sql-view-contracts',
        'Design views as named query contracts with explicit columns, ownership, and change policy.',
        'A view stores an independent copy of its result by default.',
        'procedural',
        'apply'
      ),
      skill(
        'sql-materialized-results',
        'Choose live views, materialized views, summary tables, and cache refresh strategies from freshness needs.',
        'Materialized results stay current without refresh.',
        'strategic',
        'evaluate'
      ),
      skill(
        'sql-trigger-semantics',
        'Predict trigger timing, row versus statement scope, recursion, ordering limits, and failure behavior.',
        'Triggers are visible and run identically across SQL dialects.',
        'conceptual',
        'analyze'
      ),
      skill(
        'sql-database-logic-boundary',
        'Place constraints, derived data, transitions, and orchestration in database or application layers deliberately.',
        'All business logic belongs either entirely in SQL or entirely in application code.',
        'strategic',
        'evaluate'
      ),
      skill(
        'sql-trigger-audit-test',
        'Test trigger side effects, recursion guards, changed rows, rollback, and accessible audit evidence.',
        'If the initiating statement succeeds, hidden trigger effects need no separate test.',
        'procedural',
        'apply'
      ),
    ]
  ),
  module(
    'sql-indexes-plans-performance',
    'Indexes, Query Plans, Operator Costs, and Responsible Tuning',
    'A growing ticket dataset makes queue and analytics queries slow, but each new index adds write and storage cost.',
    'an evidence-backed query performance dossier',
    [
      skill(
        'sql-index-structures',
        'Explain B-tree and hash-style index strengths, ordering, lookup, storage, and update tradeoffs.',
        'An index is a free sorted copy of the whole table.',
        'conceptual',
        'analyze'
      ),
      skill(
        'sql-composite-covering-indexes',
        'Order composite keys from predicates and sorting needs and identify prefix and covering behavior.',
        'A composite index works equally well from any column position.',
        'procedural',
        'apply'
      ),
      skill(
        'sql-selectivity-access-paths',
        'Estimate selectivity and compare scans, seeks, lookups, and join access paths from data distribution.',
        'An indexed predicate always uses its index.',
        'strategic',
        'analyze'
      ),
      skill(
        'sql-explain-plans',
        'Read EXPLAIN evidence while separating estimates, actual measurements, and engine-specific plan vocabulary.',
        'A lower estimated cost proves a query is faster in production.',
        'procedural',
        'apply'
      ),
      skill(
        'sql-performance-experiment',
        'Benchmark representative warmed and cold cases, verify unchanged results, and account for write amplification.',
        'One faster timing on a tiny fixture proves an optimization.',
        'metacognitive',
        'evaluate'
      ),
    ]
  ),
  module(
    'sql-security-privacy-programmatic',
    'Parameterized Access, Authorization, Privacy, and Audit',
    'A web service accepts user filters, exposes support data by role, and must resist injection and excessive collection.',
    'a least-privilege parameterized data-access contract',
    [
      skill(
        'sql-injection-boundaries',
        'Identify code-data boundary failures in dynamic SQL and demonstrate why escaping alone is incomplete.',
        'SQL injection is prevented by removing apostrophes.',
        'conceptual',
        'analyze'
      ),
      skill(
        'sql-parameterized-queries',
        'Bind untrusted values through prepared statements while allow-listing unavoidable identifiers or directions.',
        'Parameters can safely replace table names and SQL keywords.',
        'procedural',
        'apply'
      ),
      skill(
        'sql-least-privilege',
        'Design separate identities, roles, grants, views, and row or column controls for minimum required authority.',
        'The application needs owner or administrator access to run migrations and queries.',
        'professional',
        'evaluate'
      ),
      skill(
        'sql-privacy-minimization',
        'Minimize collected fields, purpose, access, retention, export, and re-identification risk across the lifecycle.',
        'Hashing a direct identifier automatically anonymizes a dataset.',
        'professional',
        'evaluate'
      ),
      skill(
        'sql-audit-provenance',
        'Record actor, authority, purpose, input provenance, query or change identity, and tamper-evident outcomes without logging secrets.',
        'Logging every SQL statement with all values is the safest audit policy.',
        'professional',
        'apply'
      ),
    ]
  ),
  module(
    'sql-dialects-distribution-capstone',
    'Dialect Portability, NoSQL Tradeoffs, Distribution, and Production Defense',
    'A team must move a browser prototype toward PostgreSQL, justify any non-relational component, and defend the complete data system.',
    'a production-ready cross-dialect data system portfolio',
    [
      skill(
        'sql-dialect-portability',
        'Separate standard relational intent from SQLite and PostgreSQL syntax, typing, NULL, date, and feature behavior.',
        'SQL behaves identically across all conforming databases.',
        'strategic',
        'analyze'
      ),
      skill(
        'sql-nosql-model-choice',
        'Choose relational, document, key-value, graph, or mixed models from access, integrity, evolution, and consistency needs.',
        'NoSQL is automatically faster and more scalable than relational storage.',
        'strategic',
        'evaluate'
      ),
      skill(
        'sql-distribution-consistency',
        'Explain replication, partitioning, distributed transactions, consistency choices, and failure boundaries.',
        'Adding replicas creates unlimited write scale with no consistency tradeoff.',
        'conceptual',
        'analyze'
      ),
      skill(
        'sql-production-observability',
        'Define correctness, latency, saturation, lock, plan-regression, backup, and data-quality signals with response thresholds.',
        'Database monitoring is complete when CPU and disk are graphed.',
        'professional',
        'apply'
      ),
      skill(
        'sql-capstone-defense',
        'Defend schema, queries, mutations, transactions, security, performance, portability, recovery, and ethical limits under changed evidence.',
        'Passing the original demo proves the database system is production ready.',
        'metacognitive',
        'evaluate'
      ),
    ]
  ),
];

export const sqlBasicsConfig = finalizeCourse(
  {
    id: 'sql-basics',
    title: 'SQL and Relational Data Systems',
    version: '2026.07',
    audience: {
      description:
        'Beginners through early professional developers and analysts who need to design, query, change, secure, tune, and defend relational data systems.',
      entryKnowledge: [
        'Navigate the learning platform, edit text, and reason about rows and columns in a small table.',
        'Use basic arithmetic, comparisons, and plain-language if/then reasoning.',
      ],
      deviceConstraints: [
        'All executable SQL labs run locally in a disposable browser SQLite worker; a physical keyboard is recommended for longer projects.',
      ],
      accessibilityAssumptions: [
        'All schemas, plans, tables, query results, and traces require structured text, keyboard operation, announced status, and non-color-only meaning.',
      ],
    },
    scope: {
      includes: [
        'CS2023 Data Management core and applied KA topics: lifecycle, systems, modeling, relational design, querying, processing, internals, security, analytics, and distribution',
        'Runnable SQLite 3.49.1 labs with explicit PostgreSQL 18.4 and current SQLite 3.53.3 dialect boundaries',
        'Relational algebra intuition, SQL queries and mutations, constraints, normalization, transactions, windows, views, triggers, indexes, plans, parameterization, privacy, backup, and production defense',
      ],
      excludes: [
        'Vendor administration certification, kernel-level DBMS implementation, and formal proofs beyond those needed to defend practical schema and query decisions',
        'Treating browser SQLite behavior as universal SQL behavior',
      ],
      nextCourses: ['database-administration', 'data-engineering', 'web-development'],
    },
    sources: [
      {
        title: 'ACM/IEEE-CS/AAAI Computer Science Curricula 2023: Data Management',
        authority: 'curriculum-framework',
        url: 'https://csed.acm.org/final-report/',
        version: 'CS2023 final report, 2024 publication files',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls institutional breadth, learning outcomes, modeling, querying, processing, internals, security, privacy, analytics, and distributed-system coverage.',
      },
      {
        title: 'SQLite SQL Language Documentation',
        authority: 'official-docs',
        url: 'https://www.sqlite.org/lang.html',
        version: 'SQLite 3.53.3 current; browser labs pinned to sql.js SQLite 3.49.1',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls executable browser syntax, expressions, query, DDL, DML, transaction, trigger, and dialect behavior.',
      },
      {
        title: 'SQLite Foreign Key Support',
        authority: 'official-docs',
        url: 'https://www.sqlite.org/foreignkeys.html',
        version: 'Current 2026-07-14',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls referential-integrity activation, actions, indexes, and engine-specific limitations.',
      },
      {
        title: 'SQLite Query Planning and Window Function Documentation',
        authority: 'official-docs',
        url: 'https://www.sqlite.org/queryplanner.html',
        version: 'Current 2026-07-14',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls browser-lab plan evidence, index reasoning, sorting, covering indexes, windows, and frame behavior.',
      },
      {
        title: 'PostgreSQL SQL Language and Tutorial',
        authority: 'official-docs',
        url: 'https://www.postgresql.org/docs/current/sql.html',
        version: 'PostgreSQL 18.4 stable documentation',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls production-grade relational semantics, SQL breadth, data definition, manipulation, queries, types, functions, concurrency, and portability comparisons.',
      },
      {
        title: 'PostgreSQL Concurrency Control and Indexes',
        authority: 'official-docs',
        url: 'https://www.postgresql.org/docs/current/mvcc.html',
        version: 'PostgreSQL 18.4 stable documentation',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls transaction isolation, concurrency phenomena, locking, serialization, index types, access paths, and operational tradeoffs.',
      },
      {
        title: 'OWASP SQL Injection Prevention Cheat Sheet',
        authority: 'standard',
        url: 'https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html',
        version: 'Current 2026-07-14',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls prepared statements, parameterization, allow-list validation, stored-procedure cautions, and least-privilege practice.',
      },
    ],
    modules,
    projects: [
      project(
        'sql-support-query-pack',
        'Support Queue Query Pack',
        'sql-joins-cardinality',
        'A support operations lead',
        'The lead needs deterministic queue, ownership, backlog, and effort queries that preserve unmatched teams and prevent fanout.',
        [
          'sql-order-limit-pagination',
          'sql-metric-validation',
          'sql-outer-join',
          'sql-fanout-diagnosis',
        ]
      ),
      project(
        'sql-integrity-workflow',
        'Integrity-Safe Ticket Workflow',
        'sql-ddl-constraints-migrations',
        'A product engineering team',
        'The team needs a normalized schema, constraints, repeatable import, guarded changes, and a reversible migration.',
        [
          'sql-upsert-conflict',
          'sql-lossless-dependency-design',
          'sql-integrity-constraints',
          'sql-migration-expand-contract',
        ]
      ),
      project(
        'sql-service-analytics',
        'Service-Level Analytics and Tuning Dossier',
        'sql-indexes-plans-performance',
        'A service reliability manager',
        'The manager needs time-aware metrics whose grain, windows, plans, and performance claims survive changed data.',
        [
          'sql-running-rolling-metrics',
          'sql-time-semantics',
          'sql-explain-plans',
          'sql-performance-experiment',
        ]
      ),
      project(
        'sql-production-capstone',
        'Production Data System Defense',
        'sql-dialects-distribution-capstone',
        'A privacy-conscious software organization',
        'The organization needs a portable data system plan with safe access, least privilege, recovery, observability, and justified storage choices.',
        [
          'sql-parameterized-queries',
          'sql-privacy-minimization',
          'sql-dialect-portability',
          'sql-capstone-defense',
        ]
      ),
    ],
    examContext:
      'Unfamiliar support and public-service datasets requiring model repair, query composition, mutation safety, transaction diagnosis, analytical SQL, plan evidence, parameterization, privacy, portability, and recovery decisions.',
    minimumQuestionBankSize: 480,
  },
  { researchedAt: RESEARCHED_AT }
);

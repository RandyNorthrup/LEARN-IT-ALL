function escaped(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function profile(parameters, task, checks, metric, assertion, label) {
  return {
    parameters,
    task,
    anchors: checks.map(([condition]) => escaped(condition)),
    body: `${checks
      .map(
        ([condition, failedMetric, failure]) =>
          `    if ${condition}:\n        return False, ${failedMetric}, "${failure}"`
      )
      .join('\n')}
    assert ${assertion}
    return True, ${metric}, "${label}"`,
  };
}

const SPECS = {
  'scraper-outcomes-authorization-evidence': profile(
    'authorized: bool = True, acceptance_cases: int = 8, minimized_fields: int = 6, retained_fields: int = 6, transfer_gates_named: bool = True',
    'gate the crawl charter on authorization, stakeholder value, minimized data, and honest evidence limits',
    [
      ['not authorized', 'acceptance_cases', 'authorization-missing'],
      ['acceptance_cases < 4', 'acceptance_cases', 'outcome-underdefined'],
      [
        'minimized_fields < 1 or retained_fields != minimized_fields',
        'retained_fields',
        'data-minimization',
      ],
      ['not transfer_gates_named', 'retained_fields', 'evidence-overclaim'],
    ],
    'acceptance_cases',
    'authorized and acceptance_cases >= 4',
    'authorized-crawl-charter'
  ),
  'scraper-repo-runtime-dependencies': profile(
    'declared_dependencies: int = 5, resolved_dependencies: int = 5, clean_installs: int = 3, parser_profiles: int = 4, unresolved_advisories: int = 0',
    'reconcile revision, runtime, dependency, parser, license, advisory, and clean-environment evidence',
    [
      [
        'declared_dependencies < 1 or resolved_dependencies < 1',
        'resolved_dependencies',
        'dependency-shape',
      ],
      [
        'resolved_dependencies != declared_dependencies',
        'resolved_dependencies',
        'dependency-drift',
      ],
      ['clean_installs < 2 or parser_profiles < 3', 'clean_installs', 'reproduction-gap'],
      ['unresolved_advisories > 0', 'unresolved_advisories', 'advisory-gap'],
    ],
    'clean_installs',
    'resolved_dependencies == declared_dependencies and clean_installs >= 2',
    'reproducible-crawler-baseline'
  ),
  'scraper-crawl-scope-policy': profile(
    'admitted_origins: int = 1, admitted_paths: int = 8, page_budget: int = 240, byte_budget: int = 12000000, stop_paths: int = 5',
    'validate seed identity, origin and path admission, resource budgets, and automatic and manual stop policy',
    [
      ['admitted_origins != 1', 'admitted_origins', 'origin-scope'],
      ['admitted_paths < 1', 'admitted_paths', 'path-policy'],
      ['page_budget < 1 or byte_budget < 1024', 'page_budget', 'resource-budget'],
      ['stop_paths < 3', 'stop_paths', 'stop-policy'],
    ],
    'page_budget',
    'admitted_origins == 1 and stop_paths >= 3',
    'bounded-crawl-scope'
  ),
  'scraper-url-identity-canonicalization': profile(
    'references: int = 24, resolved: int = 24, fetch_keys: int = 18, unsafe_merges: int = 0, idna_failures_visible: int = 2',
    'reconcile URL parsing, base resolution, fragment handling, conservative fetch identity, and Unicode host evidence',
    [
      ['references < 1 or resolved < 0', 'resolved', 'url-count'],
      ['resolved != references', 'resolved', 'resolution-gap'],
      ['fetch_keys < 1 or fetch_keys > resolved', 'fetch_keys', 'identity-key'],
      ['unsafe_merges > 0 or idna_failures_visible < 1', 'unsafe_merges', 'url-security'],
    ],
    'fetch_keys',
    'resolved == references and unsafe_merges == 0',
    'conservative-url-identity'
  ),
  'scraper-robots-sitemaps': profile(
    'robot_cases: int = 16, correct_decisions: int = 16, failure_modes: int = 5, sitemap_urls: int = 40, cross_host_rejections: int = 3',
    'validate RFC 9309 matching and failure behavior plus bounded same-authority sitemap discovery',
    [
      ['robot_cases < 8 or correct_decisions < 0', 'correct_decisions', 'robots-cases'],
      ['correct_decisions != robot_cases', 'correct_decisions', 'robots-decision'],
      ['failure_modes < 4', 'failure_modes', 'robots-failure-policy'],
      [
        'sitemap_urls < 1 or cross_host_rejections < 1',
        'cross_host_rejections',
        'sitemap-boundary',
      ],
    ],
    'correct_decisions',
    'correct_decisions == robot_cases',
    'bounded-robots-sitemap-policy'
  ),
  'scraper-http-fetch-contract': profile(
    'responses: int = 12, admitted_html: int = 8, rejected_bodies: int = 4, redirect_hops: int = 3, leaked_clients: int = 0',
    'validate client ownership, response admission, redirect revalidation, bounded streaming, and cleanup',
    [
      ['responses < 1 or admitted_html < 0 or rejected_bodies < 0', 'responses', 'response-count'],
      ['admitted_html + rejected_bodies != responses', 'admitted_html', 'admission-reconciliation'],
      ['redirect_hops < 0 or redirect_hops > 5', 'redirect_hops', 'redirect-budget'],
      ['leaked_clients > 0', 'leaked_clients', 'client-cleanup'],
    ],
    'admitted_html',
    'admitted_html + rejected_bodies == responses and leaked_clients == 0',
    'bounded-page-fetch'
  ),
  'scraper-bytes-encoding-admission': profile(
    'wire_bytes: int = 48000, expanded_bytes: int = 120000, byte_budget: int = 250000, decoded_pages: int = 6, visible_decode_failures: int = 2',
    'reconcile compressed and expanded bytes, character decisions, non-HTML rejection, and source identity',
    [
      ['wire_bytes < 0 or expanded_bytes < wire_bytes', 'expanded_bytes', 'byte-accounting'],
      ['expanded_bytes > byte_budget', 'expanded_bytes', 'expansion-budget'],
      ['decoded_pages < 1', 'decoded_pages', 'decode-coverage'],
      ['visible_decode_failures < 1', 'visible_decode_failures', 'decode-evidence'],
    ],
    'expanded_bytes',
    'expanded_bytes <= byte_budget',
    'bounded-decoding-ledger'
  ),
  'scraper-html-parser-models': profile(
    'fixtures: int = 18, tokenized: int = 18, compared_parsers: int = 4, explained_differences: int = 7, executed_scripts: int = 0',
    'validate malformed HTML recovery, explicit parser identity, script boundaries, and differential tree evidence',
    [
      ['fixtures < 8 or tokenized < 0', 'tokenized', 'parser-fixtures'],
      ['tokenized != fixtures', 'tokenized', 'parse-reconciliation'],
      [
        'compared_parsers < 3 or explained_differences < 3',
        'compared_parsers',
        'parser-differential',
      ],
      ['executed_scripts > 0', 'executed_scripts', 'script-execution'],
    ],
    'explained_differences',
    'tokenized == fixtures and executed_scripts == 0',
    'explicit-parser-model'
  ),
  'scraper-selectors-tree-extraction': profile(
    'component_nodes: int = 8, extracted_records: int = 8, ambiguous_matches: int = 0, missing_fields: int = 3, provenance_nodes: int = 8',
    'reconcile selector scope, cardinality, relative fields, text policy, missingness, and node provenance',
    [
      ['component_nodes < 1 or extracted_records < 0', 'extracted_records', 'selector-count'],
      ['extracted_records != component_nodes', 'extracted_records', 'record-cardinality'],
      ['ambiguous_matches > 0', 'ambiguous_matches', 'ambiguous-selector'],
      [
        'missing_fields < 0 or provenance_nodes != extracted_records',
        'provenance_nodes',
        'field-provenance',
      ],
    ],
    'extracted_records',
    'extracted_records == component_nodes and ambiguous_matches == 0',
    'provenance-selector-contract'
  ),
  'scraper-typed-records-provenance': profile(
    'raw_records: int = 12, valid_records: int = 9, quarantined_records: int = 3, provenance_records: int = 12, schema_version: int = 3',
    'validate typed missingness, raw and normalized fields, provenance, schema identity, and explicit rejection',
    [
      [
        'raw_records < 1 or valid_records < 0 or quarantined_records < 0',
        'raw_records',
        'record-count',
      ],
      [
        'valid_records + quarantined_records != raw_records',
        'valid_records',
        'record-reconciliation',
      ],
      ['provenance_records != raw_records', 'provenance_records', 'provenance-gap'],
      ['schema_version < 1', 'schema_version', 'schema-version'],
    ],
    'valid_records',
    'valid_records + quarantined_records == raw_records',
    'typed-extraction-records'
  ),
  'scraper-link-discovery-relations': profile(
    'raw_references: int = 36, resolved_references: int = 34, scheduled_pages: int = 18, rejected_references: int = 16, unexplained_decisions: int = 0',
    'validate link types, base resolution, relation semantics, admission order, deduplication, and discovery provenance',
    [
      ['raw_references < 1 or resolved_references < 0', 'resolved_references', 'link-count'],
      ['resolved_references > raw_references', 'resolved_references', 'resolution-accounting'],
      [
        'scheduled_pages + rejected_references != resolved_references',
        'scheduled_pages',
        'admission-reconciliation',
      ],
      ['unexplained_decisions > 0', 'unexplained_decisions', 'link-provenance'],
    ],
    'scheduled_pages',
    'scheduled_pages + rejected_references == resolved_references',
    'typed-link-discovery'
  ),
  'scraper-crawl-graph-frontier': profile(
    'admitted_urls: int = 64, reserved_urls: int = 64, completed_urls: int = 58, rejected_urls: int = 6, duplicate_schedules: int = 0',
    'reconcile crawl graph, atomic scheduling, frontier state, parents, depth, and deterministic order',
    [
      ['admitted_urls < 1 or reserved_urls < 0', 'reserved_urls', 'frontier-count'],
      ['reserved_urls != admitted_urls', 'reserved_urls', 'reservation-gap'],
      ['completed_urls + rejected_urls != reserved_urls', 'completed_urls', 'state-reconciliation'],
      ['duplicate_schedules > 0', 'duplicate_schedules', 'duplicate-schedule'],
    ],
    'completed_urls',
    'completed_urls + rejected_urls == reserved_urls and duplicate_schedules == 0',
    'deterministic-crawl-frontier'
  ),
  'scraper-url-traps-infinite-spaces': profile(
    'discovered_urls: int = 240, admitted_urls: int = 72, trap_rejections: int = 168, content_identities: int = 60, budget_breaches: int = 0',
    'detect faceted, calendar, session, pagination, search, and query-space traps before resource budgets fail',
    [
      [
        'discovered_urls < 1 or admitted_urls < 0 or trap_rejections < 0',
        'discovered_urls',
        'url-space-count',
      ],
      [
        'admitted_urls + trap_rejections != discovered_urls',
        'admitted_urls',
        'trap-reconciliation',
      ],
      [
        'content_identities < 1 or content_identities > admitted_urls',
        'content_identities',
        'content-yield',
      ],
      ['budget_breaches > 0', 'budget_breaches', 'budget-breach'],
    ],
    'trap_rejections',
    'admitted_urls + trap_rejections == discovered_urls',
    'bounded-url-space'
  ),
  'scraper-politeness-rate-retries': profile(
    'origins: int = 3, minimum_spacing_ms: int = 800, maximum_origin_concurrency: int = 2, retry_budget: int = 3, policy_violations: int = 0',
    'validate per-origin spacing, concurrency, transient retry, Retry-After, jitter, and adaptive rate evidence',
    [
      ['origins < 1 or minimum_spacing_ms < 0', 'origins', 'politeness-shape'],
      [
        'maximum_origin_concurrency < 1 or maximum_origin_concurrency > 4',
        'maximum_origin_concurrency',
        'origin-concurrency',
      ],
      ['retry_budget < 0 or retry_budget > 5', 'retry_budget', 'retry-amplification'],
      ['policy_violations > 0', 'policy_violations', 'politeness-violation'],
    ],
    'minimum_spacing_ms',
    'maximum_origin_concurrency <= 4 and policy_violations == 0',
    'polite-origin-controller'
  ),
  'scraper-async-structured-concurrency': profile(
    'scheduled_tasks: int = 32, completed_tasks: int = 32, queue_peak: int = 12, queue_limit: int = 16, leaked_tasks: int = 0',
    'validate TaskGroup ownership, bounded queues, semaphore order, cancellation, cleanup, and stable result evidence',
    [
      ['scheduled_tasks < 0 or completed_tasks < 0', 'completed_tasks', 'task-count'],
      ['completed_tasks != scheduled_tasks', 'completed_tasks', 'task-reconciliation'],
      ['queue_peak < 0 or queue_peak > queue_limit', 'queue_peak', 'queue-backpressure'],
      ['leaked_tasks > 0', 'leaked_tasks', 'task-leak'],
    ],
    'completed_tasks',
    'completed_tasks == scheduled_tasks and leaked_tasks == 0',
    'structured-crawl-concurrency'
  ),
  'scraper-session-auth-boundaries': profile(
    'authorized_pages: int = 24, collected_pages: int = 24, retained_private_fields: int = 4, approved_private_fields: int = 4, leaked_secrets: int = 0',
    'reconcile cookie and credential scope, safe retrieval, private-data minimization, and session cleanup',
    [
      ['authorized_pages < 1 or collected_pages < 0', 'collected_pages', 'session-count'],
      ['collected_pages != authorized_pages', 'collected_pages', 'authorization-scope'],
      [
        'retained_private_fields != approved_private_fields',
        'retained_private_fields',
        'private-field-scope',
      ],
      ['leaked_secrets > 0', 'leaked_secrets', 'secret-leak'],
    ],
    'collected_pages',
    'collected_pages == authorized_pages and leaked_secrets == 0',
    'authorized-session-custody'
  ),
  'scraper-incremental-checkpoint-cache': profile(
    'known_pages: int = 80, reused_pages: int = 52, refreshed_pages: int = 24, tombstones: int = 4, duplicate_outputs: int = 0',
    'validate validators, 304 reuse, atomic checkpoints, idempotent resume, deletion evidence, and output identity',
    [
      [
        'known_pages < 1 or reused_pages < 0 or refreshed_pages < 0 or tombstones < 0',
        'known_pages',
        'incremental-count',
      ],
      [
        'reused_pages + refreshed_pages + tombstones != known_pages',
        'refreshed_pages',
        'incremental-reconciliation',
      ],
      ['duplicate_outputs > 0', 'duplicate_outputs', 'resume-duplication'],
      ['reused_pages < 1', 'reused_pages', 'validator-reuse'],
    ],
    'reused_pages',
    'reused_pages + refreshed_pages + tombstones == known_pages',
    'idempotent-incremental-crawl'
  ),
  'scraper-content-dedup-change': profile(
    'fetched_pages: int = 80, exact_groups: int = 7, near_groups: int = 5, changed_pages: int = 18, unsupported_equivalence_claims: int = 0',
    'separate byte, source, text, record, canonical, similarity, boilerplate, and change evidence',
    [
      ['fetched_pages < 1 or exact_groups < 0 or near_groups < 0', 'fetched_pages', 'dedup-count'],
      ['changed_pages < 0 or changed_pages > fetched_pages', 'changed_pages', 'change-count'],
      [
        'unsupported_equivalence_claims > 0',
        'unsupported_equivalence_claims',
        'similarity-overclaim',
      ],
      ['exact_groups + near_groups < 2', 'exact_groups + near_groups', 'dedup-evidence'],
    ],
    'changed_pages',
    'changed_pages <= fetched_pages and unsupported_equivalence_claims == 0',
    'bounded-content-identity'
  ),
  'scraper-indexing-canonical-hreflang': profile(
    'pages: int = 36, indexing_decisions: int = 36, canonical_conflicts: int = 4, alternate_sets: int = 6, unsupported_index_guarantees: int = 0',
    'reconcile search metadata, robots directives, canonical signals, language alternates, and indexability non-claims',
    [
      ['pages < 1 or indexing_decisions < 0', 'indexing_decisions', 'indexing-count'],
      ['indexing_decisions != pages', 'indexing_decisions', 'indexing-reconciliation'],
      [
        'canonical_conflicts < 0 or alternate_sets < 1',
        'canonical_conflicts',
        'search-signal-evidence',
      ],
      ['unsupported_index_guarantees > 0', 'unsupported_index_guarantees', 'index-guarantee'],
    ],
    'indexing_decisions',
    'indexing_decisions == pages and unsupported_index_guarantees == 0',
    'evidence-based-indexability-audit'
  ),
  'scraper-structured-social-metadata': profile(
    'documents: int = 20, parsed_documents: int = 17, rejected_documents: int = 3, visible_conflicts: int = 4, remote_context_fetches: int = 0',
    'validate bounded JSON-LD, schema and visible-content evidence, social metadata, and rich-result non-guarantees',
    [
      [
        'documents < 1 or parsed_documents < 0 or rejected_documents < 0',
        'documents',
        'metadata-count',
      ],
      [
        'parsed_documents + rejected_documents != documents',
        'parsed_documents',
        'metadata-reconciliation',
      ],
      ['visible_conflicts < 0', 'visible_conflicts', 'visible-content-evidence'],
      ['remote_context_fetches > 0', 'remote_context_fetches', 'remote-context-fetch'],
    ],
    'parsed_documents',
    'parsed_documents + rejected_documents == documents and remote_context_fetches == 0',
    'bounded-structured-metadata'
  ),
  'scraper-accessibility-audit': profile(
    'pages: int = 24, automated_findings: int = 38, manual_checks: int = 42, conformance_claims: int = 0, findings_with_evidence: int = 38',
    'audit language, title, structure, images, names, and relationships with evidence and mandatory human review',
    [
      ['pages < 1 or automated_findings < 0', 'pages', 'accessibility-count'],
      [
        'findings_with_evidence != automated_findings',
        'findings_with_evidence',
        'finding-evidence',
      ],
      ['manual_checks < pages', 'manual_checks', 'manual-review-gap'],
      ['conformance_claims > 0', 'conformance_claims', 'conformance-overclaim'],
    ],
    'automated_findings',
    'findings_with_evidence == automated_findings and conformance_claims == 0',
    'bounded-accessibility-audit'
  ),
  'scraper-performance-resource-audit': profile(
    'pages: int = 12, resources: int = 180, transfer_bytes: int = 2400000, expanded_bytes: int = 6700000, user_experience_claims: int = 0',
    'separate crawler timings, resource graphs, transfer, cache evidence, controlled browser evidence, and user-performance limits',
    [
      ['pages < 1 or resources < pages', 'resources', 'resource-count'],
      [
        'transfer_bytes < 0 or expanded_bytes < transfer_bytes',
        'expanded_bytes',
        'transfer-accounting',
      ],
      ['user_experience_claims > 0', 'user_experience_claims', 'user-performance-overclaim'],
      ['resources > 1000', 'resources', 'resource-budget'],
    ],
    'resources',
    'expanded_bytes >= transfer_bytes and user_experience_claims == 0',
    'bounded-resource-audit'
  ),
  'scraper-dynamic-rendering-playwright': profile(
    'candidate_pages: int = 20, rendered_pages: int = 6, server_html_pages: int = 14, network_requests: int = 54, leaked_contexts: int = 0',
    'gate dynamic rendering need and validate isolated browser contexts, network budgets, readiness, and cleanup',
    [
      [
        'candidate_pages < 1 or rendered_pages < 0 or server_html_pages < 0',
        'candidate_pages',
        'render-count',
      ],
      [
        'rendered_pages + server_html_pages != candidate_pages',
        'rendered_pages',
        'render-necessity',
      ],
      [
        'network_requests < rendered_pages or network_requests > 200',
        'network_requests',
        'browser-network-budget',
      ],
      ['leaked_contexts > 0', 'leaked_contexts', 'browser-context-leak'],
    ],
    'rendered_pages',
    'rendered_pages + server_html_pages == candidate_pages and leaked_contexts == 0',
    'bounded-dynamic-rendering'
  ),
  'scraper-blocks-anti-bot-boundary': profile(
    'responses: int = 30, normal_pages: int = 24, blocked_pages: int = 6, evasion_attempts: int = 0, owner_escalations: int = 6',
    'detect blocks and challenges, stop without evasion, preserve evidence, and coordinate with the target owner',
    [
      ['responses < 1 or normal_pages < 0 or blocked_pages < 0', 'responses', 'block-count'],
      ['normal_pages + blocked_pages != responses', 'blocked_pages', 'block-reconciliation'],
      ['evasion_attempts > 0', 'evasion_attempts', 'evasion-boundary'],
      ['owner_escalations != blocked_pages', 'owner_escalations', 'owner-coordination'],
    ],
    'blocked_pages',
    'normal_pages + blocked_pages == responses and evasion_attempts == 0',
    'no-evasion-block-policy'
  ),
  'scraper-security-untrusted-content': profile(
    'candidate_destinations: int = 24, admitted_destinations: int = 14, rejected_destinations: int = 10, redirect_rechecks: int = 6, injection_findings: int = 0',
    'validate SSRF destination policy, DNS and redirect checks, parser limits, and output injection defense',
    [
      [
        'candidate_destinations < 1 or admitted_destinations < 0 or rejected_destinations < 0',
        'candidate_destinations',
        'security-count',
      ],
      [
        'admitted_destinations + rejected_destinations != candidate_destinations',
        'admitted_destinations',
        'destination-reconciliation',
      ],
      ['redirect_rechecks < 1', 'redirect_rechecks', 'redirect-revalidation'],
      ['injection_findings > 0', 'injection_findings', 'output-injection'],
    ],
    'rejected_destinations',
    'admitted_destinations + rejected_destinations == candidate_destinations and injection_findings == 0',
    'secured-crawl-boundary'
  ),
  'scraper-export-accessible-reports': profile(
    'valid_records: int = 48, csv_rows: int = 48, jsonl_rows: int = 48, accessible_findings: int = 48, leaked_sensitive_fields: int = 0',
    'reconcile stable CSV and JSON Lines exports, accessible human reports, provenance, and redaction',
    [
      ['valid_records < 1 or csv_rows < 0 or jsonl_rows < 0', 'valid_records', 'export-count'],
      [
        'csv_rows != valid_records or jsonl_rows != valid_records',
        'csv_rows',
        'export-reconciliation',
      ],
      ['accessible_findings != valid_records', 'accessible_findings', 'accessible-report-gap'],
      ['leaked_sensitive_fields > 0', 'leaked_sensitive_fields', 'redaction-gap'],
    ],
    'csv_rows',
    'csv_rows == valid_records and jsonl_rows == valid_records',
    'stable-accessible-reports'
  ),
  'scraper-testing-fixtures-faults': profile(
    'fixtures: int = 72, changed_cases: int = 36, injected_faults: int = 18, killed_mutants: int = 16, live_public_requests: int = 0',
    'combine fixed HTML, fake transports, local servers, URL properties, fault injection, and mutation evidence',
    [
      ['fixtures < 24 or changed_cases < 12', 'fixtures', 'test-depth'],
      ['injected_faults < 8', 'injected_faults', 'fault-depth'],
      ['killed_mutants < 8', 'killed_mutants', 'mutation-evidence'],
      ['live_public_requests > 0', 'live_public_requests', 'nondeterministic-live-test'],
    ],
    'killed_mutants',
    'killed_mutants >= 8 and live_public_requests == 0',
    'layered-crawler-verification'
  ),
  'scraper-scrapy-scale-observability': profile(
    'component_boundaries: int = 8, verified_boundaries: int = 8, middleware_orders: int = 6, metric_families: int = 10, hidden_failures: int = 0',
    'map the crawler into Scrapy architecture, scheduler, middleware, AutoThrottle, and reconstructable telemetry',
    [
      [
        'component_boundaries < 6 or verified_boundaries < 0',
        'verified_boundaries',
        'scrapy-architecture',
      ],
      [
        'verified_boundaries != component_boundaries',
        'verified_boundaries',
        'component-reconciliation',
      ],
      ['middleware_orders < 4 or metric_families < 8', 'metric_families', 'scale-evidence'],
      ['hidden_failures > 0', 'hidden_failures', 'observability-gap'],
    ],
    'metric_families',
    'verified_boundaries == component_boundaries and hidden_failures == 0',
    'observable-scrapy-transfer'
  ),
  'scraper-packaging-scheduling-operations': profile(
    'target_platforms: int = 3, clean_installs: int = 3, scheduled_runs: int = 12, overlap_incidents: int = 0, restore_minutes: int = 6',
    'validate CLI and package contracts, clean installs, scheduler overlap control, retention, restore, and operational ownership',
    [
      ['target_platforms < 1 or clean_installs < 0', 'clean_installs', 'package-matrix'],
      ['clean_installs != target_platforms', 'clean_installs', 'clean-install-gap'],
      ['scheduled_runs < 1 or overlap_incidents > 0', 'overlap_incidents', 'schedule-overlap'],
      ['restore_minutes < 0 or restore_minutes > 20', 'restore_minutes', 'restore-budget'],
    ],
    'clean_installs',
    'clean_installs == target_platforms and overlap_incidents == 0',
    'operable-crawler-release'
  ),
  'scraper-release-recovery-defense': profile(
    'release_gates: int = 16, passed_gates: int = 16, rehearsed_failures: int = 8, open_critical_findings: int = 0, owner_pause_seconds: int = 20',
    'defend end-to-end correctness, capacity, accountable approvals, migration, owner pause, rollback, recovery, and residual risk',
    [
      ['release_gates < 12 or passed_gates < 0', 'passed_gates', 'release-depth'],
      ['passed_gates != release_gates', 'passed_gates', 'failed-release-gate'],
      [
        'rehearsed_failures < 6 or open_critical_findings > 0',
        'open_critical_findings',
        'recovery-gap',
      ],
      [
        'owner_pause_seconds < 0 or owner_pause_seconds > 60',
        'owner_pause_seconds',
        'owner-stop-budget',
      ],
    ],
    'passed_gates',
    'passed_gates == release_gates and open_critical_findings == 0',
    'defensible-crawler-production'
  ),
};

const ENVIRONMENTS = [
  'an authorized nonprofit content audit',
  'a local-server failure rehearsal',
  'a multilingual public-service site review',
  'a privacy-minimized internal crawl',
  'a keyboard and screen-reader report review',
  'a clean package and recovery drill',
];

const CHANGES = [
  'change one base URL, fragment, query, Unicode host, or redirect and reapply scope',
  'change malformed markup or parser choice and preserve extraction provenance',
  'inject one retry, cancellation, queue, checkpoint, or output failure and recover cleanly',
  'replace a static fixture with an explicitly authorized dynamic case and restate the browser budget',
  'change a robots, canonical, indexing, structured-data, or accessibility signal and retain the conflict',
  'introduce a block, private field, dangerous destination, or spreadsheet formula and stop or reject it',
];

const CONSTRAINTS = [
  'the target owner must be able to pause the crawl',
  'personal data must remain minimized and redacted',
  'no block, CAPTCHA, identity, or fingerprint evasion is permitted',
  'all network and parser work must remain below explicit budgets',
  'automated findings must not claim ranking or WCAG conformance',
  'the prior valid checkpoint and report must survive failure',
];

function details(seed) {
  const cleaned = seed.replace(/[^a-z0-9]/giu, '').toLowerCase() || '0';
  let value = 2166136261;
  for (const character of cleaned) {
    value ^= character.charCodeAt(0);
    value = Math.imul(value, 16777619);
  }
  value >>>= 0;
  return {
    caseNumber: (value % 9000) + 1000,
    environment: ENVIRONMENTS[value % ENVIRONMENTS.length],
    change: CHANGES[(value >>> 4) % CHANGES.length],
    constraint: CONSTRAINTS[(value >>> 8) % CONSTRAINTS.length],
  };
}

function lookaheads(anchors, scope) {
  return anchors.map((anchor) => `(?=${scope}*?${anchor})`).join('');
}

export function webScraperPythonScenario(moduleId, seed, activityKind = 'practice', competency) {
  const spec = SPECS[moduleId];
  if (!spec) throw new Error(`Missing web scraper scenario profile for ${moduleId}`);
  const chosen = details(seed.toString(36));
  const probe = competency ? ` Competency probe: ${competency.statement}` : '';
  return `A ${activityKind} site-quality team handles case ${chosen.caseNumber} during ${chosen.environment}. Build deterministic Python evidence to ${spec.task}; ${chosen.constraint}; then ${chosen.change}. Browser code uses pure bounded models and original fixed fixtures only. Real DNS, sockets, TLS, HTTPX, Beautiful Soup, lxml, Scrapy, Playwright, browsers, files, credentials, target sites, accessibility evaluation, privacy or legal review, load, schedulers, and production behavior require explicit controlled transfer gates.${probe}`;
}

export function webScraperPythonEvidenceContract({
  competencyId,
  moduleId,
  functionName,
  marker,
  suffix,
}) {
  const spec = SPECS[moduleId];
  if (!spec) throw new Error(`Missing web scraper evidence profile for ${moduleId}`);
  const chosen = details(suffix);
  const scope = '(?:(?!# Evidence:)[\\s\\S])';
  return {
    marker,
    pattern: `${marker}${scope}*?def\\s+${functionName}\\s*\\(${scope}*?\\)\\s*(?:->[^:]+)?\\s*:${lookaheads(spec.anchors, scope)}(?=${scope}*?assert)(?=${scope}*?return)${scope}*?return`,
    example: `${marker}
# Competency: ${competencyId}.
# Case ${chosen.caseNumber}: ${chosen.environment}.
# Operating constraint: ${chosen.constraint}.
# Changed case: ${chosen.change}.
def ${functionName}(${spec.parameters}) -> tuple[bool, int | float, str]:
    evidence_variant_${suffix} = "${suffix}-${[...suffix].reverse().join('')}-${chosen.caseNumber}"
    assert evidence_variant_${suffix}
    evidence_axes_${suffix} = (
        "authorization${suffix}",
        "url${chosen.caseNumber}",
        "response${[...suffix].reverse().join('')}",
        "tree${suffix}${chosen.caseNumber}",
        "frontier${chosen.caseNumber}${suffix}",
        "report${[...suffix].reverse().join('')}${chosen.caseNumber}",
    )
    assert len(set(evidence_axes_${suffix})) == 6
${spec.body}
`,
    requirement: `Append a runnable pure-Python function headed "${marker}" that uses case ${chosen.caseNumber} to ${spec.task}. Keep its defaults runnable, assert an invariant, and return observable changed-case evidence. Browser code must not open sockets, resolve DNS, contact sites, import or claim native HTTPX, Beautiful Soup, lxml, Scrapy, or Playwright behavior, read or write host files, use credentials, launch browsers, schedule host jobs, or claim live accessibility, privacy, legal, load, or production behavior; verify those boundaries later with Python 3.14.6, the recorded stable package versions, fixed and malformed fixtures, fake transports, controlled local servers, authorized disposable target sites, representative browser profiles, privacy, security, accessibility and legal review, load, migration, rollback, recovery, and release gates.`,
  };
}

export function webScraperPythonWorkedExample(moduleId, seed) {
  return webScraperPythonEvidenceContract({
    competencyId: `scraper-worked-${moduleId}-${seed}`,
    moduleId,
    functionName: `worked_${moduleId.replaceAll('-', '_')}_${seed}`,
    marker: `# Evidence: scraper-worked-${moduleId}-${seed}`,
    suffix: `worked${seed}`,
  }).example;
}

export const webScraperPythonEvidenceModuleIds = Object.freeze(Object.keys(SPECS));

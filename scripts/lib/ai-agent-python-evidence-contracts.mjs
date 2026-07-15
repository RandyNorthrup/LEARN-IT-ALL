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
  'agentpy-product-risk-contract': profile(
    'authorized: bool = True, acceptance_cases: int = 8, risk_controls: int = 6, unresolved_high_risks: int = 0, escalation_paths: int = 4',
    'gate agent construction on stakeholder value, workflow fit, authority, measurable failure, risk controls, and escalation',
    [
      ['not authorized', 'acceptance_cases', 'authority-missing'],
      ['acceptance_cases < 4', 'acceptance_cases', 'outcome-underdefined'],
      ['risk_controls < 4 or unresolved_high_risks > 0', 'risk_controls', 'risk-uncontrolled'],
      ['escalation_paths < 2', 'escalation_paths', 'escalation-missing'],
    ],
    'acceptance_cases',
    'authorized and acceptance_cases >= 4 and unresolved_high_risks == 0',
    'bounded-agent-charter'
  ),
  'agentpy-repo-runtime-dependencies': profile(
    'declared_dependencies: int = 7, resolved_dependencies: int = 7, clean_installs: int = 3, supported_python_versions: int = 2, unresolved_advisories: int = 0',
    'reconcile repository, Python, SDK, dependency, license, advisory, and clean-environment evidence',
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
      ['clean_installs < 2 or supported_python_versions < 1', 'clean_installs', 'reproduction-gap'],
      ['unresolved_advisories > 0', 'unresolved_advisories', 'advisory-gap'],
    ],
    'clean_installs',
    'resolved_dependencies == declared_dependencies and clean_installs >= 2',
    'reproducible-agent-baseline'
  ),
  'agentpy-model-api-capabilities': profile(
    'required_capabilities: int = 7, verified_capabilities: int = 7, stable_features: int = 5, preview_features: int = 2, undocumented_assumptions: int = 0',
    'select model, endpoint, API version, and provider adapter from verified capabilities and explicit stability boundaries',
    [
      [
        'required_capabilities < 1 or verified_capabilities < 0',
        'verified_capabilities',
        'capability-shape',
      ],
      ['verified_capabilities != required_capabilities', 'verified_capabilities', 'capability-gap'],
      ['stable_features < 1 or preview_features < 0', 'stable_features', 'stability-boundary'],
      ['undocumented_assumptions > 0', 'undocumented_assumptions', 'undocumented-assumption'],
    ],
    'verified_capabilities',
    'verified_capabilities == required_capabilities and undocumented_assumptions == 0',
    'verified-model-surface'
  ),
  'agentpy-deterministic-model-port': profile(
    'scripted_turns: int = 18, replayed_turns: int = 18, fixture_versions: int = 3, leaked_live_calls: int = 0, unexplained_differences: int = 0',
    'define a provider port, scripted fake, versioned recordings, request identity, and deterministic no-live default',
    [
      ['scripted_turns < 8 or replayed_turns < 0', 'replayed_turns', 'fake-depth'],
      ['replayed_turns != scripted_turns', 'replayed_turns', 'replay-gap'],
      ['fixture_versions < 2 or unexplained_differences > 0', 'fixture_versions', 'fixture-drift'],
      ['leaked_live_calls > 0', 'leaked_live_calls', 'live-call-leak'],
    ],
    'replayed_turns',
    'replayed_turns == scripted_turns and leaked_live_calls == 0',
    'deterministic-model-port'
  ),
  'agentpy-interaction-state-parts': profile(
    'interactions: int = 12, correlated_interactions: int = 12, part_types: int = 5, redeclared_configs: int = 12, ambiguous_state_links: int = 0',
    'reconcile interaction resources, typed parts, previous identifiers, per-turn configuration, state choice, and retention evidence',
    [
      [
        'interactions < 1 or correlated_interactions < 0',
        'correlated_interactions',
        'interaction-count',
      ],
      [
        'correlated_interactions != interactions',
        'correlated_interactions',
        'interaction-correlation',
      ],
      ['part_types < 3 or redeclared_configs != interactions', 'part_types', 'part-or-config-gap'],
      ['ambiguous_state_links > 0', 'ambiguous_state_links', 'state-ambiguity'],
    ],
    'correlated_interactions',
    'correlated_interactions == interactions and ambiguous_state_links == 0',
    'typed-interaction-state'
  ),
  'agentpy-structured-output-validation': profile(
    'candidate_outputs: int = 24, valid_outputs: int = 15, rejected_outputs: int = 9, schema_versions: int = 3, unsafe_coercions: int = 0',
    'validate structured final output with versioned Pydantic and JSON Schema contracts, explicit rejection, and bounded repair',
    [
      [
        'candidate_outputs < 1 or valid_outputs < 0 or rejected_outputs < 0',
        'candidate_outputs',
        'output-count',
      ],
      [
        'valid_outputs + rejected_outputs != candidate_outputs',
        'valid_outputs',
        'output-reconciliation',
      ],
      ['schema_versions < 2', 'schema_versions', 'schema-version'],
      ['unsafe_coercions > 0', 'unsafe_coercions', 'unsafe-coercion'],
    ],
    'valid_outputs',
    'valid_outputs + rejected_outputs == candidate_outputs and unsafe_coercions == 0',
    'strict-structured-output'
  ),
  'agentpy-tool-schema-design': profile(
    'tool_schemas: int = 8, valid_schemas: int = 8, ambiguous_parameters: int = 0, bounded_enums: int = 6, schema_versions: int = 3',
    'design narrow typed tool contracts with purpose, descriptions, domains, required fields, rejection, and version identity',
    [
      ['tool_schemas < 3 or valid_schemas < 0', 'valid_schemas', 'tool-schema-count'],
      ['valid_schemas != tool_schemas', 'valid_schemas', 'tool-schema-invalid'],
      [
        'ambiguous_parameters > 0 or bounded_enums < 2',
        'ambiguous_parameters',
        'parameter-ambiguity',
      ],
      ['schema_versions < 2', 'schema_versions', 'tool-schema-version'],
    ],
    'valid_schemas',
    'valid_schemas == tool_schemas and ambiguous_parameters == 0',
    'typed-tool-catalog'
  ),
  'agentpy-tool-registry-dispatch': profile(
    'received_calls: int = 20, dispatched_calls: int = 14, rejected_calls: int = 6, correlated_results: int = 20, duplicate_dispatches: int = 0',
    'dispatch only allowlisted validated tools while preserving call identity, result envelopes, unknown-tool rejection, and exactly-once evidence',
    [
      [
        'received_calls < 1 or dispatched_calls < 0 or rejected_calls < 0',
        'received_calls',
        'dispatch-count',
      ],
      [
        'dispatched_calls + rejected_calls != received_calls',
        'dispatched_calls',
        'dispatch-reconciliation',
      ],
      ['correlated_results != received_calls', 'correlated_results', 'result-correlation'],
      ['duplicate_dispatches > 0', 'duplicate_dispatches', 'duplicate-dispatch'],
    ],
    'dispatched_calls',
    'dispatched_calls + rejected_calls == received_calls and duplicate_dispatches == 0',
    'allowlisted-tool-dispatch'
  ),
  'agentpy-tool-authorization-policy': profile(
    'requested_actions: int = 24, authorized_actions: int = 10, denied_actions: int = 8, approval_actions: int = 6, privilege_leaks: int = 0',
    'separate user, agent, and tool authority with least privilege, effect classes, dry runs, denials, approvals, and revocation',
    [
      [
        'requested_actions < 1 or authorized_actions < 0 or denied_actions < 0',
        'requested_actions',
        'authorization-count',
      ],
      [
        'authorized_actions + denied_actions + approval_actions != requested_actions',
        'authorized_actions',
        'authorization-reconciliation',
      ],
      ['approval_actions < 1', 'approval_actions', 'approval-boundary'],
      ['privilege_leaks > 0', 'privilege_leaks', 'privilege-leak'],
    ],
    'authorized_actions',
    'authorized_actions + denied_actions + approval_actions == requested_actions and privilege_leaks == 0',
    'least-agency-policy'
  ),
  'agentpy-single-tool-turn': profile(
    'model_steps: int = 6, tool_calls: int = 2, tool_results: int = 2, final_outputs: int = 1, lost_provider_context: int = 0',
    'execute one complete Interactions API tool turn with step classification, call-result correlation, provider context preservation, and final provenance',
    [
      ['model_steps < 3 or tool_calls < 1', 'model_steps', 'tool-turn-shape'],
      ['tool_results != tool_calls', 'tool_results', 'tool-result-gap'],
      ['final_outputs != 1', 'final_outputs', 'final-output-count'],
      ['lost_provider_context > 0', 'lost_provider_context', 'provider-context-loss'],
    ],
    'tool_results',
    'tool_results == tool_calls and final_outputs == 1',
    'complete-tool-turn'
  ),
  'agentpy-bounded-control-loop': profile(
    'step_budget: int = 12, used_steps: int = 7, repeated_call_limit: int = 2, repeated_calls: int = 1, terminal_events: int = 1',
    'implement an explicit agent state machine with progress, budgets, repeated-call detection, cancellation, and one terminal reason',
    [
      [
        'step_budget < 1 or used_steps < 0 or used_steps > step_budget',
        'used_steps',
        'step-budget',
      ],
      [
        'repeated_calls < 0 or repeated_calls > repeated_call_limit',
        'repeated_calls',
        'loop-stall',
      ],
      ['terminal_events != 1', 'terminal_events', 'terminal-ambiguity'],
      ['used_steps < 1', 'used_steps', 'no-progress'],
    ],
    'used_steps',
    'used_steps <= step_budget and terminal_events == 1',
    'bounded-agent-loop'
  ),
  'agentpy-parallel-tool-calls': profile(
    'scheduled_calls: int = 12, completed_calls: int = 12, parallel_limit: int = 4, peak_parallel: int = 3, leaked_tasks: int = 0',
    'run independent tools with bounded TaskGroup ownership, stable call-result correlation, serialized shared effects, cancellation, and cleanup',
    [
      ['scheduled_calls < 0 or completed_calls < 0', 'completed_calls', 'parallel-count'],
      ['completed_calls != scheduled_calls', 'completed_calls', 'parallel-reconciliation'],
      ['parallel_limit < 1 or peak_parallel > parallel_limit', 'peak_parallel', 'parallel-budget'],
      ['leaked_tasks > 0', 'leaked_tasks', 'task-leak'],
    ],
    'completed_calls',
    'completed_calls == scheduled_calls and leaked_tasks == 0',
    'structured-tool-concurrency'
  ),
  'agentpy-human-approval-resume': profile(
    'sensitive_actions: int = 8, approval_requests: int = 8, immutable_previews: int = 8, approved_actions: int = 5, expired_or_rejected: int = 3',
    'pause before sensitive effects, present trustworthy immutable previews, bind decisions to requests, expire approvals, and resume safely',
    [
      ['sensitive_actions < 1 or approval_requests < 0', 'approval_requests', 'approval-count'],
      [
        'approval_requests != sensitive_actions or immutable_previews != sensitive_actions',
        'immutable_previews',
        'approval-preview-gap',
      ],
      [
        'approved_actions + expired_or_rejected != sensitive_actions',
        'approved_actions',
        'approval-reconciliation',
      ],
      ['expired_or_rejected < 1', 'expired_or_rejected', 'approval-expiry'],
    ],
    'approved_actions',
    'approval_requests == sensitive_actions and approved_actions + expired_or_rejected == sensitive_actions',
    'bound-human-approval'
  ),
  'agentpy-session-checkpoint-replay': profile(
    'events: int = 36, persisted_events: int = 36, checkpoints: int = 6, replayed_checkpoints: int = 6, duplicate_effects: int = 0',
    'persist append-only session events and atomic checkpoints that support idempotent resume, fork, replay, and effect reconciliation',
    [
      ['events < 1 or persisted_events < 0', 'persisted_events', 'session-event-count'],
      ['persisted_events != events', 'persisted_events', 'event-loss'],
      [
        'checkpoints < 2 or replayed_checkpoints != checkpoints',
        'replayed_checkpoints',
        'checkpoint-replay',
      ],
      ['duplicate_effects > 0', 'duplicate_effects', 'replay-effect-duplication'],
    ],
    'replayed_checkpoints',
    'persisted_events == events and replayed_checkpoints == checkpoints and duplicate_effects == 0',
    'replayable-agent-session'
  ),
  'agentpy-context-assembly-compaction': profile(
    'candidate_tokens: int = 18000, admitted_tokens: int = 12000, token_budget: int = 14000, trust_labeled_items: int = 42, unlabeled_items: int = 0',
    'assemble context by relevance, authority, provenance, recency, token budget, compaction loss tests, and explicit untrusted labels',
    [
      ['candidate_tokens < 1 or admitted_tokens < 0', 'admitted_tokens', 'context-count'],
      ['admitted_tokens > token_budget', 'admitted_tokens', 'context-budget'],
      ['trust_labeled_items < 1 or unlabeled_items > 0', 'unlabeled_items', 'trust-label-gap'],
      ['candidate_tokens < admitted_tokens', 'candidate_tokens', 'context-accounting'],
    ],
    'admitted_tokens',
    'admitted_tokens <= token_budget and unlabeled_items == 0',
    'bounded-context-assembly'
  ),
  'agentpy-memory-policy': profile(
    'memory_candidates: int = 30, admitted_memories: int = 12, rejected_memories: int = 18, provenance_records: int = 30, cross_tenant_leaks: int = 0',
    'separate working and durable memory, gate writes, preserve provenance, isolate tenants, expire data, and reject poisoning',
    [
      [
        'memory_candidates < 1 or admitted_memories < 0 or rejected_memories < 0',
        'memory_candidates',
        'memory-count',
      ],
      [
        'admitted_memories + rejected_memories != memory_candidates',
        'admitted_memories',
        'memory-reconciliation',
      ],
      ['provenance_records != memory_candidates', 'provenance_records', 'memory-provenance'],
      ['cross_tenant_leaks > 0', 'cross_tenant_leaks', 'tenant-memory-leak'],
    ],
    'admitted_memories',
    'admitted_memories + rejected_memories == memory_candidates and cross_tenant_leaks == 0',
    'provenance-gated-memory'
  ),
  'agentpy-errors-retries-idempotency': profile(
    'failures: int = 18, retryable_failures: int = 8, terminal_failures: int = 10, successful_retries: int = 7, duplicate_effects: int = 0',
    'classify provider and tool failures, retry only safe cases with bounded backoff, preserve idempotency, compensate, and stop visibly',
    [
      [
        'failures < 1 or retryable_failures < 0 or terminal_failures < 0',
        'failures',
        'failure-count',
      ],
      [
        'retryable_failures + terminal_failures != failures',
        'retryable_failures',
        'failure-classification',
      ],
      [
        'successful_retries < 0 or successful_retries > retryable_failures',
        'successful_retries',
        'retry-evidence',
      ],
      ['duplicate_effects > 0', 'duplicate_effects', 'retry-duplicate-effect'],
    ],
    'successful_retries',
    'retryable_failures + terminal_failures == failures and duplicate_effects == 0',
    'idempotent-agent-recovery'
  ),
  'agentpy-streaming-events-accessibility': profile(
    'events: int = 80, assembled_events: int = 80, announced_milestones: int = 8, cancellable_states: int = 5, duplicate_events: int = 0',
    'render typed streaming events with deterministic assembly, restrained announcements, keyboard cancellation, reconnect identity, and no color-only state',
    [
      ['events < 1 or assembled_events < 0', 'assembled_events', 'stream-event-count'],
      ['assembled_events != events', 'assembled_events', 'stream-assembly'],
      [
        'announced_milestones < 4 or cancellable_states < 2',
        'announced_milestones',
        'accessible-stream-control',
      ],
      ['duplicate_events > 0', 'duplicate_events', 'stream-duplication'],
    ],
    'assembled_events',
    'assembled_events == events and duplicate_events == 0',
    'accessible-agent-event-stream'
  ),
  'agentpy-injection-output-security': profile(
    'untrusted_inputs: int = 40, rejected_instructions: int = 18, admitted_data: int = 22, exfiltration_events: int = 0, unsafe_renderings: int = 0',
    'separate instructions from data, resist direct and indirect injection, constrain tools, prevent exfiltration, and encode rendered output',
    [
      [
        'untrusted_inputs < 1 or rejected_instructions < 0 or admitted_data < 0',
        'untrusted_inputs',
        'security-input-count',
      ],
      [
        'rejected_instructions + admitted_data != untrusted_inputs',
        'rejected_instructions',
        'instruction-data-reconciliation',
      ],
      ['exfiltration_events > 0', 'exfiltration_events', 'data-exfiltration'],
      ['unsafe_renderings > 0', 'unsafe_renderings', 'unsafe-output-rendering'],
    ],
    'rejected_instructions',
    'rejected_instructions + admitted_data == untrusted_inputs and exfiltration_events == 0',
    'secured-agent-boundary'
  ),
  'agentpy-secrets-privacy-governance': profile(
    'data_fields: int = 28, approved_fields: int = 12, rejected_fields: int = 16, redacted_logs: int = 28, leaked_secrets: int = 0',
    'enforce secret custody, data minimization, provider terms, retention, deletion, regional and sensitive-use review, and redacted evidence',
    [
      [
        'data_fields < 1 or approved_fields < 0 or rejected_fields < 0',
        'data_fields',
        'privacy-field-count',
      ],
      ['approved_fields + rejected_fields != data_fields', 'approved_fields', 'data-minimization'],
      ['redacted_logs != data_fields', 'redacted_logs', 'log-redaction'],
      ['leaked_secrets > 0', 'leaked_secrets', 'secret-leak'],
    ],
    'approved_fields',
    'approved_fields + rejected_fields == data_fields and leaked_secrets == 0',
    'governed-agent-data'
  ),
  'agentpy-eval-dataset-oracles': profile(
    'eval_cases: int = 72, normal_cases: int = 30, boundary_cases: int = 18, adversarial_cases: int = 18, accessibility_cases: int = 6',
    'build a versioned representative evaluation set with deterministic oracles, changed cases, adversarial cases, accessibility needs, and baselines',
    [
      ['eval_cases < 40', 'eval_cases', 'eval-depth'],
      [
        'normal_cases + boundary_cases + adversarial_cases + accessibility_cases != eval_cases',
        'normal_cases',
        'eval-reconciliation',
      ],
      ['boundary_cases < 8 or adversarial_cases < 8', 'adversarial_cases', 'eval-risk-coverage'],
      ['accessibility_cases < 4', 'accessibility_cases', 'eval-accessibility'],
    ],
    'eval_cases',
    'normal_cases + boundary_cases + adversarial_cases + accessibility_cases == eval_cases',
    'representative-agent-evals'
  ),
  'agentpy-trajectory-tool-evals': profile(
    'trajectories: int = 48, valid_trajectories: int = 39, invalid_trajectories: int = 9, correlated_effects: int = 48, hidden_steps: int = 0',
    'evaluate final outcome, tool trajectory, order flexibility, precision, recall, arguments, effects, stop reason, and visible failures',
    [
      [
        'trajectories < 20 or valid_trajectories < 0 or invalid_trajectories < 0',
        'trajectories',
        'trajectory-depth',
      ],
      [
        'valid_trajectories + invalid_trajectories != trajectories',
        'valid_trajectories',
        'trajectory-reconciliation',
      ],
      ['correlated_effects != trajectories', 'correlated_effects', 'effect-correlation'],
      ['hidden_steps > 0', 'hidden_steps', 'trajectory-observability'],
    ],
    'valid_trajectories',
    'valid_trajectories + invalid_trajectories == trajectories and hidden_steps == 0',
    'trajectory-aware-agent-evals'
  ),
  'agentpy-rubrics-judge-calibration': profile(
    'rubric_cases: int = 60, blinded_cases: int = 60, human_calibration_cases: int = 18, disagreement_cases: int = 7, silent_overrides: int = 0',
    'use task-specific rubrics, blinded comparisons, judge variance tests, human calibration, disagreement review, and uncertainty escalation',
    [
      ['rubric_cases < 30 or blinded_cases != rubric_cases', 'blinded_cases', 'rubric-blinding'],
      ['human_calibration_cases < 12', 'human_calibration_cases', 'human-calibration'],
      ['disagreement_cases < 1', 'disagreement_cases', 'judge-disagreement'],
      ['silent_overrides > 0', 'silent_overrides', 'silent-judge-override'],
    ],
    'human_calibration_cases',
    'blinded_cases == rubric_cases and silent_overrides == 0',
    'calibrated-agent-judgment'
  ),
  'agentpy-observability-token-cost': profile(
    'invocations: int = 40, traced_invocations: int = 40, usage_records: int = 40, redacted_records: int = 40, unbounded_content_logs: int = 0',
    'emit reconstructable agent, model, tool, approval, retry, token, latency, cost, error, and privacy-safe trace evidence',
    [
      ['invocations < 1 or traced_invocations < 0', 'traced_invocations', 'trace-count'],
      [
        'traced_invocations != invocations or usage_records != invocations',
        'usage_records',
        'telemetry-gap',
      ],
      ['redacted_records != invocations', 'redacted_records', 'telemetry-redaction'],
      ['unbounded_content_logs > 0', 'unbounded_content_logs', 'content-log-leak'],
    ],
    'traced_invocations',
    'traced_invocations == invocations and usage_records == invocations',
    'observable-agent-operations'
  ),
  'agentpy-performance-concurrency-cache': profile(
    'requests: int = 120, completed_requests: int = 114, rejected_overload: int = 6, cache_hits: int = 32, budget_breaches: int = 0',
    'bound queueing, concurrency, tokens, spend, latency, rate limits, context caching, overload rejection, and representative load evidence',
    [
      [
        'requests < 20 or completed_requests < 0 or rejected_overload < 0',
        'requests',
        'load-count',
      ],
      [
        'completed_requests + rejected_overload != requests',
        'completed_requests',
        'load-reconciliation',
      ],
      ['cache_hits < 0 or cache_hits > completed_requests', 'cache_hits', 'cache-accounting'],
      ['budget_breaches > 0', 'budget_breaches', 'resource-budget-breach'],
    ],
    'completed_requests',
    'completed_requests + rejected_overload == requests and budget_breaches == 0',
    'bounded-agent-capacity'
  ),
  'agentpy-adk-framework-translation': profile(
    'core_contracts: int = 10, mapped_contracts: int = 10, framework_callbacks: int = 5, confirmation_paths: int = 3, hidden_framework_effects: int = 0',
    'map the verified custom core into ADK agent, runner, tools, sessions, callbacks, plugins, confirmation, evaluation, and deployment boundaries',
    [
      [
        'core_contracts < 6 or mapped_contracts < 0',
        'mapped_contracts',
        'framework-contract-count',
      ],
      ['mapped_contracts != core_contracts', 'mapped_contracts', 'framework-mapping-gap'],
      [
        'framework_callbacks < 3 or confirmation_paths < 2',
        'framework_callbacks',
        'framework-control-gap',
      ],
      ['hidden_framework_effects > 0', 'hidden_framework_effects', 'framework-hidden-effect'],
    ],
    'mapped_contracts',
    'mapped_contracts == core_contracts and hidden_framework_effects == 0',
    'auditable-adk-translation'
  ),
  'agentpy-multi-agent-delegation': profile(
    'delegated_tasks: int = 18, accepted_results: int = 12, rejected_results: int = 6, minimized_contexts: int = 18, cascading_failures: int = 0',
    'delegate bounded tasks with typed contracts, minimum context, independent authority, result validation, conflict resolution, and failure containment',
    [
      [
        'delegated_tasks < 6 or accepted_results < 0 or rejected_results < 0',
        'delegated_tasks',
        'delegation-count',
      ],
      [
        'accepted_results + rejected_results != delegated_tasks',
        'accepted_results',
        'delegation-reconciliation',
      ],
      ['minimized_contexts != delegated_tasks', 'minimized_contexts', 'delegation-context'],
      ['cascading_failures > 0', 'cascading_failures', 'delegation-cascade'],
    ],
    'accepted_results',
    'accepted_results + rejected_results == delegated_tasks and cascading_failures == 0',
    'contained-agent-delegation'
  ),
  'agentpy-code-computer-use-sandbox': profile(
    'requested_actions: int = 30, sandboxed_actions: int = 12, denied_actions: int = 12, approval_actions: int = 6, host_escapes: int = 0',
    'gate code and computer-use actions through disposable sandboxes, deny-by-default capabilities, injection-resistant previews, approvals, and artifact inspection',
    [
      [
        'requested_actions < 1 or sandboxed_actions < 0 or denied_actions < 0',
        'requested_actions',
        'sandbox-action-count',
      ],
      [
        'sandboxed_actions + denied_actions + approval_actions != requested_actions',
        'sandboxed_actions',
        'sandbox-reconciliation',
      ],
      ['approval_actions < 2', 'approval_actions', 'computer-use-approval'],
      ['host_escapes > 0', 'host_escapes', 'sandbox-escape'],
    ],
    'sandboxed_actions',
    'sandboxed_actions + denied_actions + approval_actions == requested_actions and host_escapes == 0',
    'contained-agent-actions'
  ),
  'agentpy-package-api-deployment': profile(
    'target_environments: int = 3, clean_installs: int = 3, lifecycle_smokes: int = 12, healthy_shutdowns: int = 12, leaked_credentials: int = 0',
    'package the agent core, CLI and API with typed configuration, secret injection, async lifecycle, health, readiness, identity, and clean shutdown',
    [
      ['target_environments < 1 or clean_installs < 0', 'clean_installs', 'package-matrix'],
      ['clean_installs != target_environments', 'clean_installs', 'clean-install-gap'],
      [
        'lifecycle_smokes < 3 or healthy_shutdowns != lifecycle_smokes',
        'healthy_shutdowns',
        'lifecycle-gap',
      ],
      ['leaked_credentials > 0', 'leaked_credentials', 'deployment-secret-leak'],
    ],
    'healthy_shutdowns',
    'clean_installs == target_environments and healthy_shutdowns == lifecycle_smokes',
    'operable-agent-service'
  ),
  'agentpy-release-recovery-defense': profile(
    'release_gates: int = 18, passed_gates: int = 18, rehearsed_incidents: int = 10, open_critical_findings: int = 0, kill_switch_seconds: int = 20',
    'defend model and SDK migration, evaluation, security, approvals, capacity, canary, rollback, kill switch, recovery, support, and residual risk',
    [
      ['release_gates < 14 or passed_gates < 0', 'passed_gates', 'release-depth'],
      ['passed_gates != release_gates', 'passed_gates', 'failed-release-gate'],
      [
        'rehearsed_incidents < 8 or open_critical_findings > 0',
        'open_critical_findings',
        'incident-readiness',
      ],
      [
        'kill_switch_seconds < 0 or kill_switch_seconds > 60',
        'kill_switch_seconds',
        'kill-switch-budget',
      ],
    ],
    'passed_gates',
    'passed_gates == release_gates and open_critical_findings == 0',
    'defensible-agent-production'
  ),
};

const ENVIRONMENTS = [
  'an accessible public-service intake assistant',
  'a controlled support-operations rehearsal',
  'a privacy-minimized nonprofit workflow',
  'a multilingual case-routing evaluation',
  'a keyboard and screen-reader interaction review',
  'a clean package, canary, and recovery drill',
];

const CHANGES = [
  'change model capability, API version, schema, or provider state and revalidate the adapter',
  'change one tool call, argument, authority, result, or failure and preserve correlation',
  'inject cancellation, retry, repeated-call, checkpoint, or replay failure and recover without duplicate effects',
  'replace trusted context with untrusted indirect instructions and preserve data-versus-instruction boundaries',
  'change one eval case, rubric, model version, token price, rate limit, or latency distribution and rerun release gates',
  'introduce a sensitive action, poisoned memory, leaking log, or computer-use request and deny or pause it',
];

const CONSTRAINTS = [
  'every external effect requires explicit least-authority policy',
  'model output and tool arguments remain untrusted until validated',
  'sensitive actions require a trustworthy user approval bound to exact arguments',
  'loops, concurrency, tokens, time, retries, and spend stay below explicit budgets',
  'telemetry and memory must remain tenant-isolated, minimized, redacted, and attributable',
  'last valid checkpoint, audit trail, kill switch, and rollback path must survive failure',
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

export function aiAgentPythonScenario(moduleId, seed, activityKind = 'practice', competency) {
  const spec = SPECS[moduleId];
  if (!spec) throw new Error(`Missing AI agent scenario profile for ${moduleId}`);
  const chosen = details(seed.toString(36));
  const probe = competency ? ` Competency probe: ${competency.statement}` : '';
  return `A ${activityKind} agent engineering team handles case ${chosen.caseNumber} during ${chosen.environment}. Build deterministic Python evidence to ${spec.task}; ${chosen.constraint}; then ${chosen.change}. Browser code uses pure bounded state machines and original fixed fixtures only. Real provider APIs, Gemini models, google-genai, google-adk, Pydantic native validation, HTTP, files, credentials, code execution, browsers, databases, telemetry backends, load, privacy review, and production effects require explicit controlled transfer gates.${probe}`;
}

export function aiAgentPythonEvidenceContract({
  competencyId,
  moduleId,
  functionName,
  marker,
  suffix,
}) {
  const spec = SPECS[moduleId];
  if (!spec) throw new Error(`Missing AI agent evidence profile for ${moduleId}`);
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
        "authority${suffix}",
        "interaction${chosen.caseNumber}",
        "tool${[...suffix].reverse().join('')}",
        "state${suffix}${chosen.caseNumber}",
        "evaluation${chosen.caseNumber}${suffix}",
        "recovery${[...suffix].reverse().join('')}${chosen.caseNumber}",
    )
    assert len(set(evidence_axes_${suffix})) == 6
${spec.body}
`,
    requirement: `Append a runnable pure-Python function headed "${marker}" that uses case ${chosen.caseNumber} to ${spec.task}. Keep its defaults runnable, assert an invariant, and return observable changed-case evidence. Browser code must not contact provider APIs, invoke Gemini models, import or claim native google-genai, google-adk, or Pydantic behavior, open sockets, read or write host files, use credentials, execute generated code, launch browsers, reach databases or telemetry backends, or claim live privacy, load, safety, cost, or production behavior; verify those boundaries later with Python 3.14.6, google-genai 2.11.0, google-adk 2.4.0, Pydantic 2.13.4, fixed provider fixtures, fake transports, controlled local services, disposable cloud projects, representative eval sets, accessibility, privacy and security review, load, canary, rollback, recovery, and release gates.`,
  };
}

export function aiAgentPythonWorkedExample(moduleId, seed) {
  return aiAgentPythonEvidenceContract({
    competencyId: `agentpy-worked-${moduleId}-${seed}`,
    moduleId,
    functionName: `worked_${moduleId.replaceAll('-', '_')}_${seed}`,
    marker: `# Evidence: agentpy-worked-${moduleId}-${seed}`,
    suffix: `worked${seed}`,
  }).example;
}

export const aiAgentPythonEvidenceModuleIds = Object.freeze(Object.keys(SPECS));

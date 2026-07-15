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
  'maze-outcomes-repo-accessibility': profile(
    'player_task: str = "compare-solvers", acceptance_cases: int = 8, repository_clean: bool = True, accessibility_plan: bool = True, native_limits_named: bool = True',
    'gate the maze charter on player value, repository evidence, accessibility, and honest native limits',
    [
      ['not player_task.strip() or acceptance_cases < 4', 'acceptance_cases', 'undefined-outcome'],
      ['not repository_clean', 'acceptance_cases', 'repository-baseline'],
      ['not accessibility_plan', 'acceptance_cases', 'accessibility-gap'],
      ['not native_limits_named', 'acceptance_cases', 'native-overclaim'],
    ],
    'acceptance_cases',
    'acceptance_cases >= 4',
    'bounded-maze-charter'
  ),
  'maze-runtime-tk-event-loop': profile(
    'roots: int = 1, pending_callbacks: int = 0, longest_callback_ms: int = 7, ui_thread_owned: bool = True, clean_shutdown: bool = True',
    'model a single-root cooperative event loop with bounded callbacks and deliberate shutdown',
    [
      ['roots != 1', 'roots', 'root-lifecycle'],
      ['pending_callbacks < 0', 'pending_callbacks', 'callback-count'],
      [
        'longest_callback_ms < 0 or longest_callback_ms > 16',
        'longest_callback_ms',
        'blocking-callback',
      ],
      ['not ui_thread_owned or not clean_shutdown', 'pending_callbacks', 'runtime-ownership'],
    ],
    'longest_callback_ms',
    'roots == 1 and pending_callbacks == 0',
    'cooperative-runtime'
  ),
  'maze-grid-coordinate-model': profile(
    'rows: int = 6, columns: int = 8, cell_size: int = 24, mapped_cells: int = 48, round_trips: int = 48',
    'reconcile logical grid identity, viewport geometry, units, and coordinate round trips',
    [
      ['rows < 1 or columns < 1 or cell_size < 1', 'mapped_cells', 'geometry-shape'],
      ['mapped_cells != rows * columns', 'mapped_cells', 'cell-identity'],
      ['round_trips != mapped_cells', 'round_trips', 'coordinate-round-trip'],
      ['rows * columns > 1000000', 'mapped_cells', 'grid-budget'],
    ],
    'mapped_cells',
    'mapped_cells == rows * columns',
    'bounded-grid-geometry'
  ),
  'maze-wall-cell-invariants': profile(
    'cells: int = 48, reciprocal_openings: int = 47, passage_edges: int = 47, boundary_breaches: int = 0, illegal_diagonals: int = 0',
    'validate reciprocal passages, boundary policy, and model topology before rendering',
    [
      ['cells < 1 or passage_edges < 0', 'passage_edges', 'topology-count'],
      ['reciprocal_openings != passage_edges', 'reciprocal_openings', 'reciprocal-wall'],
      ['boundary_breaches > 0', 'boundary_breaches', 'boundary-policy'],
      ['illegal_diagonals > 0', 'illegal_diagonals', 'illegal-neighbor'],
    ],
    'passage_edges',
    'reciprocal_openings == passage_edges',
    'valid-wall-model'
  ),
  'maze-canvas-rendering-tags': profile(
    'expected_items: int = 126, actual_items: int = 126, semantic_tags: int = 5, duplicate_items: int = 0, layer_errors: int = 0',
    'reconcile retained render items, semantic tags, layer order, and redraw cleanup',
    [
      ['expected_items < 1 or actual_items < 0', 'actual_items', 'render-count'],
      ['actual_items != expected_items', 'actual_items', 'item-reconciliation'],
      ['semantic_tags < 4', 'semantic_tags', 'tag-contract'],
      [
        'duplicate_items > 0 or layer_errors > 0',
        'duplicate_items + layer_errors',
        'render-invariant',
      ],
    ],
    'actual_items',
    'actual_items == expected_items',
    'tagged-render-plan'
  ),
  'maze-layout-resize-scaling': profile(
    'available_width: int = 720, available_height: int = 540, grid_extent: int = 18, cell_size: int = 28, visible_controls: int = 7',
    'derive a responsive cell scale while retaining visible controls and valid geometry',
    [
      [
        'min(available_width, available_height, grid_extent, cell_size) < 1',
        'cell_size',
        'layout-shape',
      ],
      [
        'cell_size * grid_extent > min(available_width, available_height)',
        'cell_size',
        'viewport-overflow',
      ],
      ['visible_controls < 5', 'visible_controls', 'control-clipping'],
      ['grid_extent > 512', 'grid_extent', 'resize-budget'],
    ],
    'cell_size',
    'cell_size * grid_extent <= min(available_width, available_height)',
    'responsive-maze-layout'
  ),
  'maze-input-focus-bindings': profile(
    'actions: int = 9, keyboard_equivalents: int = 9, focus_stops: int = 7, trapped_stops: int = 0, ambiguous_bindings: int = 0',
    'reconcile named actions, keyboard equivalence, focus order, and binding scope',
    [
      ['actions < 1 or keyboard_equivalents < 0', 'keyboard_equivalents', 'action-count'],
      ['keyboard_equivalents != actions', 'keyboard_equivalents', 'input-equivalence'],
      ['focus_stops < 1 or trapped_stops > 0', 'trapped_stops', 'focus-order'],
      ['ambiguous_bindings > 0', 'ambiguous_bindings', 'binding-scope'],
    ],
    'keyboard_equivalents',
    'keyboard_equivalents == actions',
    'equivalent-input-map'
  ),
  'maze-graph-topology': profile(
    'vertices: int = 48, edges: int = 47, reachable: int = 48, components: int = 1, cycle_witnesses: int = 0',
    'validate graph mapping, connectivity, components, cycles, and tree claims',
    [
      ['vertices < 1 or edges < 0', 'vertices', 'graph-count'],
      ['reachable != vertices or components != 1', 'reachable', 'connectivity'],
      ['cycle_witnesses > 0', 'cycle_witnesses', 'cycle-detected'],
      ['edges != vertices - 1', 'edges', 'tree-edge-count'],
    ],
    'reachable',
    'edges == vertices - 1 and reachable == vertices',
    'validated-maze-tree'
  ),
  'maze-generation-backtracker': profile(
    'cells: int = 48, visited: int = 48, carved_edges: int = 47, stack_peak: int = 21, replay_match: bool = True',
    'validate seeded backtracking progress, completion, topology, depth, and replay',
    [
      ['cells < 1 or visited < 0 or carved_edges < 0', 'visited', 'generation-count'],
      ['visited != cells', 'visited', 'unvisited-cell'],
      ['carved_edges != cells - 1', 'carved_edges', 'tree-shape'],
      ['stack_peak < 1 or not replay_match', 'stack_peak', 'replay-invariant'],
    ],
    'visited',
    'visited == cells and carved_edges == cells - 1',
    'seeded-backtracker'
  ),
  'maze-generation-alternatives-bias': profile(
    'seeds: int = 64, valid_trees: int = 64, algorithms: int = 4, measured_metrics: int = 5, uniformity_claim_bounded: bool = True',
    'compare multiple generators across seeded topology and bias evidence without unsupported distribution claims',
    [
      ['seeds < 16 or valid_trees < 0', 'valid_trees', 'sample-budget'],
      ['valid_trees != seeds', 'valid_trees', 'invalid-generated-tree'],
      ['algorithms < 4 or measured_metrics < 4', 'algorithms', 'comparison-coverage'],
      ['not uniformity_claim_bounded', 'measured_metrics', 'distribution-overclaim'],
    ],
    'valid_trees',
    'valid_trees == seeds',
    'bounded-generator-comparison'
  ),
  'maze-dfs-solver-recursion': profile(
    'path_steps: int = 31, valid_steps: int = 31, explored: int = 42, repeated_vertices: int = 0, recursion_safe: bool = True',
    'validate DFS visitation, backtracking, route witness, termination, and depth limits',
    [
      ['path_steps < 1 or valid_steps < 0 or explored < path_steps', 'valid_steps', 'dfs-count'],
      ['valid_steps != path_steps', 'valid_steps', 'invalid-path-step'],
      ['repeated_vertices > 0', 'repeated_vertices', 'visited-policy'],
      ['not recursion_safe', 'explored', 'recursion-limit'],
    ],
    'path_steps',
    'valid_steps == path_steps',
    'valid-dfs-route'
  ),
  'maze-bfs-shortest-path': profile(
    'reported_edges: int = 18, oracle_edges: int = 18, discovered: int = 39, predecessor_links: int = 38, fifo_order_valid: bool = True',
    'prove an unweighted shortest route through FIFO layers and stable predecessors',
    [
      ['reported_edges < 0 or oracle_edges < 0 or discovered < 1', 'reported_edges', 'bfs-count'],
      ['reported_edges != oracle_edges', 'reported_edges', 'nonshortest-route'],
      ['predecessor_links != discovered - 1', 'predecessor_links', 'predecessor-map'],
      ['not fifo_order_valid', 'discovered', 'frontier-order'],
    ],
    'reported_edges',
    'reported_edges == oracle_edges',
    'shortest-unweighted-route'
  ),
  'maze-weighted-dijkstra-astar': profile(
    'reported_cost: int = 27, oracle_cost: int = 27, expansions: int = 34, stale_entries_skipped: int = 6, heuristic_admissible: bool = True',
    'validate weighted relaxation, heap staleness, heuristic limits, route cost, and optimality',
    [
      ['reported_cost < 0 or oracle_cost < 0 or expansions < 1', 'reported_cost', 'weighted-count'],
      ['reported_cost != oracle_cost', 'reported_cost', 'nonoptimal-cost'],
      ['stale_entries_skipped < 0', 'stale_entries_skipped', 'heap-accounting'],
      ['not heuristic_admissible', 'expansions', 'heuristic-overestimate'],
    ],
    'reported_cost',
    'reported_cost == oracle_cost',
    'optimal-weighted-route'
  ),
  'maze-solver-evidence-comparison': profile(
    'fixtures: int = 24, valid_results: int = 24, solvers: int = 4, changed_cases: int = 8, isolated_metrics: bool = True',
    'compare solver correctness, completeness, optimality, work, memory, and selection on identical fixtures',
    [
      ['fixtures < 8 or valid_results < 0', 'valid_results', 'benchmark-fixtures'],
      ['valid_results != fixtures', 'valid_results', 'invalid-solver-result'],
      ['solvers < 4 or changed_cases < 4', 'solvers', 'solver-coverage'],
      ['not isolated_metrics', 'changed_cases', 'confounded-metrics'],
    ],
    'valid_results',
    'valid_results == fixtures',
    'defensible-solver-comparison'
  ),
  'maze-animation-after-cancel': profile(
    'scheduled_steps: int = 42, completed_steps: int = 42, pending_callbacks: int = 0, stale_callbacks: int = 0, pause_stable: bool = True',
    'model bounded scheduled animation with pause, changed speed, cancellation, and stale-work rejection',
    [
      ['scheduled_steps < 0 or completed_steps < 0', 'completed_steps', 'animation-count'],
      ['completed_steps != scheduled_steps', 'completed_steps', 'missing-step'],
      [
        'pending_callbacks > 0 or stale_callbacks > 0',
        'pending_callbacks + stale_callbacks',
        'callback-leak',
      ],
      ['not pause_stable', 'completed_steps', 'pause-mutation'],
    ],
    'completed_steps',
    'completed_steps == scheduled_steps and pending_callbacks == 0',
    'cancellable-animation'
  ),
  'maze-state-machine-controls': profile(
    'allowed_transitions: int = 18, verified_transitions: int = 18, rejected_commands: int = 9, unsafe_transitions: int = 0, recoverable_failures: int = 4',
    'verify explicit application transitions, command rejection, control projection, and recoverable failure states',
    [
      [
        'allowed_transitions < 1 or verified_transitions < 0',
        'verified_transitions',
        'transition-count',
      ],
      [
        'verified_transitions != allowed_transitions',
        'verified_transitions',
        'transition-coverage',
      ],
      [
        'rejected_commands < 1 or unsafe_transitions > 0',
        'unsafe_transitions',
        'command-admission',
      ],
      ['recoverable_failures < 1', 'recoverable_failures', 'recovery-path'],
    ],
    'verified_transitions',
    'verified_transitions == allowed_transitions',
    'verified-state-machine'
  ),
  'maze-architecture-pure-core': profile(
    'domain_modules: int = 7, ui_imports_in_core: int = 0, adapter_ports: int = 6, fake_adapter_cases: int = 18, snapshot_mutations: int = 0',
    'enforce a pure domain core, narrow UI ports, immutable snapshots, and testable dependency direction',
    [
      ['domain_modules < 1 or adapter_ports < 4', 'adapter_ports', 'architecture-shape'],
      ['ui_imports_in_core > 0', 'ui_imports_in_core', 'dependency-inversion'],
      ['fake_adapter_cases < 8', 'fake_adapter_cases', 'adapter-evidence'],
      ['snapshot_mutations > 0', 'snapshot_mutations', 'snapshot-isolation'],
    ],
    'fake_adapter_cases',
    'ui_imports_in_core == 0 and snapshot_mutations == 0',
    'pure-core-boundary'
  ),
  'maze-accessible-interface': profile(
    'essential_states: int = 9, text_equivalents: int = 9, keyboard_actions: int = 9, color_only_states: int = 0, open_barriers: int = 0',
    'reconcile visual maze state with structured text, keyboard control, multichannel cues, and barrier closure',
    [
      ['essential_states < 1 or text_equivalents < 0', 'text_equivalents', 'accessibility-count'],
      [
        'text_equivalents != essential_states or keyboard_actions < essential_states',
        'text_equivalents',
        'equivalent-experience',
      ],
      ['color_only_states > 0', 'color_only_states', 'color-only-cue'],
      ['open_barriers > 0', 'open_barriers', 'unclosed-barrier'],
    ],
    'text_equivalents',
    'text_equivalents == essential_states',
    'multichannel-maze-interface'
  ),
  'maze-determinism-replay-save': profile(
    'recorded_actions: int = 36, replayed_actions: int = 36, schema_version: int = 3, invalid_fields: int = 0, replay_digest_match: bool = True',
    'validate replay identity, logical actions, bounded JSON state, atomic replacement, and version migration',
    [
      ['recorded_actions < 0 or replayed_actions < 0', 'replayed_actions', 'replay-count'],
      ['replayed_actions != recorded_actions', 'replayed_actions', 'action-reconciliation'],
      ['schema_version < 1 or invalid_fields > 0', 'invalid_fields', 'schema-validation'],
      ['not replay_digest_match', 'replayed_actions', 'replay-divergence'],
    ],
    'replayed_actions',
    'replayed_actions == recorded_actions',
    'versioned-replay-state'
  ),
  'maze-testing-properties-headless': profile(
    'model_tests: int = 96, property_cases: int = 240, killed_mutants: int = 12, surviving_mutants: int = 0, native_gates_named: bool = True',
    'combine pure properties, deliberate defects, headless checks, native GUI gates, and player evidence',
    [
      ['model_tests < 24 or property_cases < 64', 'model_tests', 'test-depth'],
      ['killed_mutants < 8', 'killed_mutants', 'mutation-coverage'],
      ['surviving_mutants > 0', 'surviving_mutants', 'undetected-defect'],
      ['not native_gates_named', 'property_cases', 'headless-overclaim'],
    ],
    'killed_mutants',
    'surviving_mutants == 0',
    'layered-maze-verification'
  ),
  'maze-performance-profiling': profile(
    'cells: int = 4096, solver_ms: int = 18, render_ms: int = 26, cancellation_ms: int = 41, event_budget_ms: int = 50',
    'separate algorithm, render, and cancellation profiles under a representative responsiveness budget',
    [
      [
        'cells < 1 or min(solver_ms, render_ms, cancellation_ms, event_budget_ms) < 0',
        'cells',
        'profile-shape',
      ],
      ['solver_ms > event_budget_ms', 'solver_ms', 'solver-budget'],
      ['render_ms > event_budget_ms', 'render_ms', 'render-budget'],
      ['cancellation_ms > event_budget_ms', 'cancellation_ms', 'cancel-budget'],
    ],
    'max(solver_ms, render_ms, cancellation_ms)',
    'max(solver_ms, render_ms, cancellation_ms) <= event_budget_ms',
    'responsive-capacity-profile'
  ),
  'maze-packaging-platforms': profile(
    'target_platforms: int = 3, native_builds: int = 3, clean_launches: int = 3, missing_tk_assets: int = 0, artifact_digests: int = 3',
    'reconcile package metadata, resources, Tcl and Tk assets, native artifacts, and clean-install launches',
    [
      ['target_platforms < 1 or native_builds < 0', 'native_builds', 'platform-matrix'],
      [
        'native_builds != target_platforms or clean_launches != target_platforms',
        'clean_launches',
        'clean-install-gap',
      ],
      ['missing_tk_assets > 0', 'missing_tk_assets', 'tk-resource-gap'],
      ['artifact_digests != target_platforms', 'artifact_digests', 'artifact-identity'],
    ],
    'clean_launches',
    'clean_launches == target_platforms',
    'platform-native-release'
  ),
  'maze-security-local-files': profile(
    'admitted_cells: int = 4096, maximum_cells: int = 16384, rejected_documents: int = 7, executable_formats: int = 0, retained_log_days: int = 7',
    'bound local inputs, reject executable serialization, constrain resources, and minimize diagnostics',
    [
      ['admitted_cells < 1 or maximum_cells < 1', 'admitted_cells', 'resource-shape'],
      ['admitted_cells > maximum_cells', 'admitted_cells', 'cell-budget'],
      ['rejected_documents < 1', 'rejected_documents', 'rejection-evidence'],
      ['executable_formats > 0 or retained_log_days > 30', 'executable_formats', 'local-trust'],
    ],
    'admitted_cells',
    'admitted_cells <= maximum_cells',
    'bounded-local-data'
  ),
  'maze-release-recovery-defense': profile(
    'release_gates: int = 12, passed_gates: int = 12, rehearsed_failures: int = 6, open_critical_barriers: int = 0, rollback_minutes: int = 4',
    'defend release evidence, migrations, recovery rehearsals, support ownership, and residual risk',
    [
      ['release_gates < 8 or passed_gates < 0', 'passed_gates', 'release-depth'],
      ['passed_gates != release_gates', 'passed_gates', 'failed-gate'],
      [
        'rehearsed_failures < 4 or open_critical_barriers > 0',
        'open_critical_barriers',
        'recovery-gap',
      ],
      ['rollback_minutes < 0 or rollback_minutes > 15', 'rollback_minutes', 'rollback-budget'],
    ],
    'passed_gates',
    'passed_gates == release_gates',
    'defensible-maze-release'
  ),
};

const ENVIRONMENTS = [
  'a museum kiosk accessibility review',
  'a classroom algorithm comparison',
  'a low-vision player session',
  'a keyboard-only puzzle tournament',
  'a clean desktop release rehearsal',
  'a corrupted-state recovery drill',
];

const CHANGES = [
  'change the grid dimensions and preserve every invariant',
  'change the seed and retain replay identity',
  'replace pointer input with a single-action keyboard path',
  'inject one invalid wall, stale callback, or corrupted field and reject it',
  'change display scale and retain focus and control access',
  'switch the solver or generator and restate each guarantee',
];

const CONSTRAINTS = [
  'the player cannot rely on color or animation',
  'event-loop work must remain cancellable',
  'all graph claims need an independent witness',
  'resource use must remain below an explicit budget',
  'native Tk behavior must not be inferred from browser execution',
  'the prior good state must survive failure',
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

export function mazePythonScenario(moduleId, seed, activityKind = 'practice', competency) {
  const spec = SPECS[moduleId];
  if (!spec) throw new Error(`Missing maze scenario profile for ${moduleId}`);
  const chosen = details(seed.toString(36));
  const probe = competency ? ` Competency probe: ${competency.statement}` : '';
  return `A ${activityKind} puzzle team handles case ${chosen.caseNumber} during ${chosen.environment}. Build deterministic Python evidence to ${spec.task}; ${chosen.constraint}; then ${chosen.change}. Browser code uses pure bounded models and original fixed fixtures only. Real Tcl, Tk, tkinter, windows, Canvas, fonts, focus, input devices, assistive technology, files, platform timing, installers, and packaged desktop behavior require explicit controlled native transfer gates.${probe}`;
}

export function mazePythonEvidenceContract({
  competencyId,
  moduleId,
  functionName,
  marker,
  suffix,
}) {
  const spec = SPECS[moduleId];
  if (!spec) throw new Error(`Missing maze evidence profile for ${moduleId}`);
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
        "grid${suffix}",
        "topology${chosen.caseNumber}",
        "search${[...suffix].reverse().join('')}",
        "event${suffix}${chosen.caseNumber}",
        "access${chosen.caseNumber}${suffix}",
        "recovery${[...suffix].reverse().join('')}${chosen.caseNumber}",
    )
    assert len(set(evidence_axes_${suffix})) == 6
${spec.body}
`,
    requirement: `Append a runnable pure-Python function headed "${marker}" that uses case ${chosen.caseNumber} to ${spec.task}. Keep its defaults runnable, assert an invariant, and return observable changed-case evidence. Browser code must not import or claim native tkinter, Tcl, Tk, windows, Canvas, fonts, focus, input devices, assistive technology, files, platform timing, installers, or packaged release behavior; verify those boundaries later with Python 3.14.6, recorded Tcl and Tk patch levels, native widget and display tests, keyboard and assistive-technology playtests, representative profiles, clean platform-native PyInstaller 6.21 builds, migration, rollback, recovery, and release gates.`,
  };
}

export function mazePythonWorkedExample(moduleId, seed) {
  return mazePythonEvidenceContract({
    competencyId: `maze-worked-${moduleId}-${seed}`,
    moduleId,
    functionName: `worked_${moduleId.replaceAll('-', '_')}_${seed}`,
    marker: `# Evidence: maze-worked-${moduleId}-${seed}`,
    suffix: `worked${seed}`,
  }).example;
}

export const mazePythonEvidenceModuleIds = Object.freeze(Object.keys(SPECS));

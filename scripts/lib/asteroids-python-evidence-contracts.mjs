const SPECS = {
  'asteroids-outcomes-repo-accessibility': {
    parameters:
      'player_goal: str = "survive-and-score", acceptance_cases: int = 8, repository_clean: bool = True, accessibility_plan: bool = True, playtest_owner: bool = True',
    body: `    if not player_goal.strip() or acceptance_cases < 4:
        return False, acceptance_cases, "undefined-game"
    if not repository_clean:
        return False, acceptance_cases, "repository-baseline"
    if not accessibility_plan:
        return False, acceptance_cases, "accessibility-gap"
    if not playtest_owner:
        return False, acceptance_cases, "unowned-evidence"
    assert acceptance_cases >= 4
    return True, acceptance_cases, "bounded-game-charter"`,
    anchors: [
      'not player_goal\\.strip',
      'not repository_clean',
      'not accessibility_plan',
      'not playtest_owner',
    ],
    task: 'gate the game charter on player value, repository state, accessibility, and observable playtest evidence',
  },
  'asteroids-runtime-sdl-loop': {
    parameters:
      'python_minor: int = 14, pygame_ce_minor: int = 7, initialized_modules: int = 5, quit_handled: bool = True, cleanup_called: bool = True',
    body: `    if python_minor < 14 or pygame_ce_minor < 7:
        return False, python_minor, "unsupported-runtime"
    if initialized_modules < 3:
        return False, initialized_modules, "partial-init"
    if not quit_handled:
        return False, initialized_modules, "missing-quit"
    if not cleanup_called:
        return False, initialized_modules, "missing-cleanup"
    assert initialized_modules >= 3
    return True, initialized_modules, "owned-runtime"`,
    anchors: [
      'python_minor < 14',
      'initialized_modules < 3',
      'not quit_handled',
      'not cleanup_called',
    ],
    task: 'own initialization, the event-render loop, quit handling, and cleanup under a versioned Python and SDL boundary',
  },
  'asteroids-coordinate-vector-units': {
    parameters:
      'x: float = 3.0, y: float = 4.0, pixels_per_second: float = 120.0, seconds: float = 0.25, zero_normalized: bool = False',
    body: `    magnitude = (x * x + y * y) ** 0.5
    if magnitude <= 0.0:
        return False, magnitude, "zero-vector"
    if pixels_per_second < 0.0 or seconds < 0.0:
        return False, seconds, "unit-domain"
    if zero_normalized:
        return False, magnitude, "zero-normalization"
    displacement = pixels_per_second * seconds
    assert abs(magnitude - 5.0) < 1e-9
    return True, displacement, "explicit-units"`,
    anchors: [
      'magnitude <= 0.0',
      'pixels_per_second < 0.0',
      'zero_normalized',
      'pixels_per_second \\* seconds',
    ],
    task: 'reconcile screen coordinates, Vector2 magnitude and direction, angle convention, and explicit motion units',
  },
  'asteroids-time-step-simulation': {
    parameters:
      'frame_seconds: float = 0.016, max_frame_seconds: float = 0.1, fixed_step: float = 1 / 120, accumulator: float = 0.0, max_updates: int = 8',
    body: `    if frame_seconds < 0.0 or fixed_step <= 0.0:
        return False, frame_seconds, "time-domain"
    clamped = min(frame_seconds, max_frame_seconds)
    updates = int((accumulator + clamped) / fixed_step)
    if updates > max_updates:
        return False, updates, "spiral-guard"
    if clamped > max_frame_seconds:
        return False, clamped, "clamp-failure"
    assert 0 <= updates <= max_updates
    return True, updates, "bounded-time-step"`,
    anchors: [
      'frame_seconds < 0.0',
      'min\\(frame_seconds',
      'updates > max_updates',
      '0 <= updates',
    ],
    task: 'bound delta time, fixed simulation updates, interpolation debt, and the spiral-of-death guard',
  },
  'asteroids-input-events-remapping': {
    parameters:
      'event_frames: int = 6, pumped_frames: int = 6, actions_bound: int = 5, duplicate_bindings: int = 0, focus_lost_released: bool = True',
    body: `    if event_frames < 1 or actions_bound < 3:
        return False, actions_bound, "input-shape"
    if pumped_frames != event_frames:
        return False, pumped_frames, "event-starvation"
    if duplicate_bindings > 0:
        return False, duplicate_bindings, "binding-conflict"
    if not focus_lost_released:
        return False, actions_bound, "stuck-input"
    assert pumped_frames == event_frames
    return True, actions_bound, "remappable-input"`,
    anchors: [
      'pumped_frames != event_frames',
      'duplicate_bindings > 0',
      'not focus_lost_released',
      'pumped_frames == event_frames',
    ],
    task: 'separate discrete events from held actions while preserving remapping, focus-loss release, and device-independent intent',
  },
  'asteroids-game-state-scenes': {
    parameters:
      'states: int = 6, valid_transitions: int = 9, invalid_transitions: int = 0, pause_freezes_simulation: bool = True, restart_resets_run: bool = True',
    body: `    if states < 4 or valid_transitions < states:
        return False, states, "state-graph"
    if invalid_transitions > 0:
        return False, invalid_transitions, "illegal-transition"
    if not pause_freezes_simulation:
        return False, valid_transitions, "pause-leak"
    if not restart_resets_run:
        return False, valid_transitions, "restart-leak"
    assert valid_transitions >= states
    return True, valid_transitions, "explicit-scenes"`,
    anchors: [
      'states < 4',
      'invalid_transitions > 0',
      'not pause_freezes_simulation',
      'not restart_resets_run',
    ],
    task: 'model menu, playing, paused, life-lost, game-over, and restart transitions without hidden scene state',
  },
  'asteroids-ship-motion-physics': {
    parameters:
      'speed: float = 140.0, thrust: float = 80.0, drag: float = 0.15, max_speed: float = 260.0, dt: float = 0.016',
    body: `    if min(speed, thrust, drag, max_speed, dt) < 0.0:
        return False, speed, "motion-domain"
    accelerated = speed + thrust * dt
    damped = accelerated * max(0.0, 1.0 - drag * dt)
    bounded = min(damped, max_speed)
    if bounded > max_speed:
        return False, bounded, "speed-cap"
    assert 0.0 <= bounded <= max_speed
    return True, round(bounded, 3), "inertial-ship"`,
    anchors: ['min\\(speed', 'thrust \\* dt', '1.0 - drag \\* dt', 'min\\(damped, max_speed'],
    task: 'integrate rotation, thrust, inertia, drag, and speed limits with frame-rate-independent Vector2 motion',
  },
  'asteroids-wrap-viewport-resize': {
    parameters:
      'x: float = -4.0, y: float = 605.0, width: float = 800.0, height: float = 600.0, radius: float = 12.0, resize_preserves_world: bool = True',
    body: `    if width <= 0.0 or height <= 0.0 or radius < 0.0:
        return False, width, "viewport-domain"
    wrapped_x = ((x + radius) % (width + 2 * radius)) - radius
    wrapped_y = ((y + radius) % (height + 2 * radius)) - radius
    if not resize_preserves_world:
        return False, wrapped_x, "resize-teleport"
    if not (-radius <= wrapped_x < width + radius):
        return False, wrapped_x, "wrap-x"
    assert -radius <= wrapped_y < height + radius
    return True, round(wrapped_x, 3), "seam-safe-wrap"`,
    anchors: [
      'width <= 0.0',
      '% \\(width \\+ 2 \\* radius\\)',
      'not resize_preserves_world',
      '-radius <= wrapped_x',
    ],
    task: 'wrap full object bounds across seams while preserving logical world state through resize and display scaling',
  },
  'asteroids-render-surfaces-assets': {
    parameters:
      'logical_draws: int = 14, presented_frames: int = 14, alpha_assets: int = 4, converted_assets: int = 4, transform_from_original: bool = True',
    body: `    if logical_draws < 1 or alpha_assets < 0:
        return False, logical_draws, "render-shape"
    if presented_frames != logical_draws:
        return False, presented_frames, "presentation-drift"
    if converted_assets != alpha_assets:
        return False, converted_assets, "surface-format"
    if not transform_from_original:
        return False, alpha_assets, "destructive-transform"
    assert presented_frames == logical_draws
    return True, converted_assets, "owned-render-pipeline"`,
    anchors: [
      'presented_frames != logical_draws',
      'converted_assets != alpha_assets',
      'not transform_from_original',
      'presented_frames == logical_draws',
    ],
    task: 'compose draw order, surfaces, alpha, asset conversion, transforms, and one explicit frame presentation',
  },
  'asteroids-projectiles-cooldowns-pools': {
    parameters:
      'requested_shots: int = 12, accepted_shots: int = 5, cooldown_ms: int = 180, lifetime_ms: int = 900, live_cap: int = 6, leaked_projectiles: int = 0',
    body: `    if requested_shots < 0 or accepted_shots < 0 or cooldown_ms < 1:
        return False, accepted_shots, "projectile-domain"
    if accepted_shots > requested_shots or accepted_shots > live_cap:
        return False, accepted_shots, "fire-budget"
    if lifetime_ms <= cooldown_ms:
        return False, lifetime_ms, "lifetime-policy"
    if leaked_projectiles > 0:
        return False, leaked_projectiles, "ownership-leak"
    assert accepted_shots <= live_cap
    return True, accepted_shots, "bounded-projectiles"`,
    anchors: [
      'accepted_shots > requested_shots',
      'accepted_shots > live_cap',
      'lifetime_ms <= cooldown_ms',
      'leaked_projectiles > 0',
    ],
    task: 'gate edge-triggered firing on cooldown, lifetime, live-count, reuse, and deterministic projectile ownership',
  },
  'asteroids-generation-polygons-difficulty': {
    parameters:
      'vertices: int = 11, min_radius: float = 18.0, max_radius: float = 31.0, seeded_equal: bool = True, self_intersections: int = 0, spawn_budget: int = 7',
    body: `    if vertices < 5 or min_radius <= 0.0 or max_radius < min_radius:
        return False, vertices, "polygon-domain"
    if not seeded_equal:
        return False, vertices, "rng-drift"
    if self_intersections > 0:
        return False, self_intersections, "invalid-polygon"
    if spawn_budget < 1:
        return False, spawn_budget, "spawn-budget"
    assert max_radius >= min_radius
    return True, spawn_budget, "seeded-asteroids"`,
    anchors: ['vertices < 5', 'not seeded_equal', 'self_intersections > 0', 'spawn_budget < 1'],
    task: 'generate readable seeded asteroid polygons under geometry, size, spawn, and difficulty budgets',
  },
  'asteroids-collision-detection': {
    parameters:
      'distance_squared: float = 400.0, radius_sum: float = 24.0, broad_phase_pairs: int = 18, narrow_phase_pairs: int = 3, swept_tested: bool = True',
    body: `    if distance_squared < 0.0 or radius_sum < 0.0:
        return False, distance_squared, "collision-domain"
    if narrow_phase_pairs > broad_phase_pairs:
        return False, narrow_phase_pairs, "phase-inversion"
    overlaps = distance_squared <= radius_sum * radius_sum
    if not swept_tested:
        return False, narrow_phase_pairs, "tunneling-gap"
    if broad_phase_pairs < 1:
        return False, broad_phase_pairs, "missing-broad-phase"
    assert narrow_phase_pairs <= broad_phase_pairs
    return True, int(overlaps), "layered-collision"`,
    anchors: [
      'narrow_phase_pairs > broad_phase_pairs',
      'radius_sum \\* radius_sum',
      'not swept_tested',
      'narrow_phase_pairs <= broad_phase_pairs',
    ],
    task: 'layer broad-phase pruning, circle or rectangle checks, masks where justified, seam cases, and swept tests for tunneling',
  },
  'asteroids-collision-response-damage': {
    parameters:
      'collisions: int = 3, resolved_once: int = 3, invulnerability_ms: int = 1200, duplicate_damage: int = 0, fragments_spawned: int = 6',
    body: `    if collisions < 0 or resolved_once < 0:
        return False, collisions, "response-domain"
    if resolved_once != collisions:
        return False, resolved_once, "response-count"
    if invulnerability_ms < 0 or duplicate_damage > 0:
        return False, duplicate_damage, "damage-window"
    if fragments_spawned < collisions:
        return False, fragments_spawned, "fragment-policy"
    assert resolved_once == collisions
    return True, fragments_spawned, "single-response"`,
    anchors: [
      'resolved_once != collisions',
      'duplicate_damage > 0',
      'fragments_spawned < collisions',
      'resolved_once == collisions',
    ],
    task: 'resolve each collision once with explicit destruction, fragments, lives, invulnerability, feedback, and event ordering',
  },
  'asteroids-score-progression-spawning': {
    parameters:
      'destroyed: int = 9, score_per_hit: int = 100, score: int = 900, wave: int = 3, safe_spawn: bool = True, difficulty_bounded: bool = True',
    body: `    if destroyed < 0 or score_per_hit < 0 or wave < 1:
        return False, score, "progression-domain"
    if score != destroyed * score_per_hit:
        return False, score, "score-drift"
    if not safe_spawn:
        return False, wave, "unsafe-spawn"
    if not difficulty_bounded:
        return False, wave, "difficulty-runaway"
    assert score == destroyed * score_per_hit
    return True, wave, "fair-progression"`,
    anchors: [
      'score != destroyed \\* score_per_hit',
      'not safe_spawn',
      'not difficulty_bounded',
      'score == destroyed \\* score_per_hit',
    ],
    task: 'reconcile scoring, waves, spawn safety, pacing, difficulty options, and non-denigrating progression evidence',
  },
  'asteroids-sprites-groups-ownership': {
    parameters:
      'created: int = 20, active: int = 13, killed: int = 7, group_memberships_released: bool = True, update_before_draw: bool = True',
    body: `    if min(created, active, killed) < 0:
        return False, active, "group-domain"
    if active + killed != created:
        return False, active, "lifecycle-reconciliation"
    if not group_memberships_released:
        return False, killed, "group-leak"
    if not update_before_draw:
        return False, active, "stale-render"
    assert active + killed == created
    return True, active, "owned-sprites"`,
    anchors: [
      'active \\+ killed != created',
      'not group_memberships_released',
      'not update_before_draw',
      'active \\+ killed == created',
    ],
    task: 'reconcile sprite creation, group membership, update and draw order, kill semantics, and entity ownership',
  },
  'asteroids-audio-mixer-cues': {
    parameters:
      'critical_events: int = 5, visual_alternatives: int = 5, channels_reserved: int = 3, clipped_sounds: int = 0, mute_available: bool = True, separate_volume: bool = True',
    body: `    if critical_events < 0 or channels_reserved < 1:
        return False, critical_events, "audio-domain"
    if visual_alternatives != critical_events:
        return False, visual_alternatives, "cue-alternative"
    if clipped_sounds > 0:
        return False, clipped_sounds, "channel-starvation"
    if not mute_available or not separate_volume:
        return False, channels_reserved, "audio-control"
    assert visual_alternatives == critical_events
    return True, channels_reserved, "accessible-audio"`,
    anchors: [
      'visual_alternatives != critical_events',
      'clipped_sounds > 0',
      'not mute_available',
      'not separate_volume',
    ],
    task: 'own mixer initialization, channel budgets, latency, volume and mute controls, and non-audio alternatives for every critical cue',
  },
  'asteroids-hud-menus-accessibility': {
    parameters:
      'critical_signals: int = 8, multi_channel_signals: int = 8, focusable_controls: int = 7, focused_controls: int = 7, reduced_motion: bool = True, scalable_text: bool = True',
    body: `    if critical_signals < 1 or focusable_controls < 1:
        return False, critical_signals, "ui-domain"
    if multi_channel_signals != critical_signals:
        return False, multi_channel_signals, "color-only-signal"
    if focused_controls != focusable_controls:
        return False, focused_controls, "focus-gap"
    if not reduced_motion or not scalable_text:
        return False, focusable_controls, "display-access"
    assert focused_controls == focusable_controls
    return True, focused_controls, "accessible-game-ui"`,
    anchors: [
      'multi_channel_signals != critical_signals',
      'focused_controls != focusable_controls',
      'not reduced_motion',
      'not scalable_text',
    ],
    task: 'build readable keyboard and controller menus, HUD, focus, status, multi-channel cues, text scaling, and reduced-motion options',
  },
  'asteroids-determinism-replay-save': {
    parameters:
      'seed: int = 4217, input_frames: int = 3600, replay_frames: int = 3600, state_hash_equal: bool = True, schema_version: int = 2, corrupted_save_rejected: bool = True',
    body: `    if seed < 0 or input_frames < 1:
        return False, input_frames, "replay-domain"
    if replay_frames != input_frames:
        return False, replay_frames, "replay-length"
    if not state_hash_equal:
        return False, replay_frames, "simulation-drift"
    if schema_version < 1 or not corrupted_save_rejected:
        return False, schema_version, "save-contract"
    assert replay_frames == input_frames
    return True, schema_version, "reproducible-run"`,
    anchors: [
      'replay_frames != input_frames',
      'not state_hash_equal',
      'schema_version < 1',
      'not corrupted_save_rejected',
    ],
    task: 'separate seeded randomness and input frames from rendering so replay, save migration, and corruption rejection are reproducible',
  },
  'asteroids-architecture-pure-core': {
    parameters:
      'pure_systems: int = 8, effect_adapters: int = 4, hidden_globals: int = 0, dependency_cycles: int = 0, immutable_events: bool = True',
    body: `    if pure_systems < 4 or effect_adapters < 1:
        return False, pure_systems, "architecture-shape"
    if hidden_globals > 0:
        return False, hidden_globals, "hidden-state"
    if dependency_cycles > 0:
        return False, dependency_cycles, "dependency-cycle"
    if not immutable_events:
        return False, pure_systems, "mutable-events"
    assert pure_systems > effect_adapters
    return True, pure_systems, "testable-game-core"`,
    anchors: [
      'pure_systems < 4',
      'hidden_globals > 0',
      'dependency_cycles > 0',
      'not immutable_events',
    ],
    task: 'separate deterministic domain state and systems from Pygame display, input, audio, clock, assets, and persistence adapters',
  },
  'asteroids-testing-headless-fixtures': {
    parameters:
      'unit_cases: int = 24, property_cases: int = 40, headless_cases: int = 9, changed_defect_detected: bool = True, dummy_driver_verified: bool = True, render_contract_checked: bool = True',
    body: `    if min(unit_cases, property_cases, headless_cases) < 1:
        return False, unit_cases, "test-layers"
    if not changed_defect_detected:
        return False, unit_cases, "mutation-survived"
    if not dummy_driver_verified:
        return False, headless_cases, "headless-gap"
    if not render_contract_checked:
        return False, headless_cases, "render-gap"
    total = unit_cases + property_cases + headless_cases
    assert total >= 3
    return True, total, "risk-layered-game-tests"`,
    anchors: [
      'min\\(unit_cases',
      'not changed_defect_detected',
      'not dummy_driver_verified',
      'not render_contract_checked',
    ],
    task: 'layer pure unit and property tests, deterministic replay, headless SDL integration, render contracts, changed defects, and manual accessibility playtests',
  },
  'asteroids-performance-profiling': {
    parameters:
      'updates: int = 120, draws: int = 60, frame_p95_ms: float = 12.4, frame_budget_ms: float = 16.667, allocations_per_frame: int = 3, allocation_budget: int = 8, output_equal: bool = True',
    body: `    if updates < 1 or draws < 1 or frame_p95_ms < 0.0:
        return False, frame_p95_ms, "profile-domain"
    if frame_p95_ms > frame_budget_ms:
        return False, frame_p95_ms, "frame-budget"
    if allocations_per_frame > allocation_budget:
        return False, allocations_per_frame, "allocation-budget"
    if not output_equal:
        return False, frame_p95_ms, "semantic-regression"
    assert frame_p95_ms <= frame_budget_ms
    return True, round(frame_p95_ms, 3), "profiled-frame"`,
    anchors: [
      'frame_p95_ms > frame_budget_ms',
      'allocations_per_frame > allocation_budget',
      'not output_equal',
      'frame_p95_ms <= frame_budget_ms',
    ],
    task: 'profile update and render phases against percentile frame-time, allocation, entity, collision, and responsiveness budgets without changing behavior',
  },
  'asteroids-packaging-assets-platforms': {
    parameters:
      'target_platforms: int = 3, clean_installs: int = 3, declared_assets: int = 12, packaged_assets: int = 12, licenses_recorded: bool = True, offline_launch: bool = True',
    body: `    if target_platforms < 1 or clean_installs < 0:
        return False, target_platforms, "package-domain"
    if clean_installs != target_platforms:
        return False, clean_installs, "platform-gap"
    if packaged_assets != declared_assets:
        return False, packaged_assets, "asset-gap"
    if not licenses_recorded or not offline_launch:
        return False, packaged_assets, "release-input"
    assert packaged_assets == declared_assets
    return True, target_platforms, "portable-build"`,
    anchors: [
      'clean_installs != target_platforms',
      'packaged_assets != declared_assets',
      'not licenses_recorded',
      'not offline_launch',
    ],
    task: 'package code and licensed assets from an identified revision and prove clean offline launch on supported platforms',
  },
  'asteroids-security-save-assets': {
    parameters:
      'untrusted_paths: int = 6, rejected_paths: int = 6, save_size: int = 4096, save_limit: int = 65536, remote_content: bool = False, telemetry_opt_in: bool = True',
    body: `    if untrusted_paths < 0 or rejected_paths < 0:
        return False, rejected_paths, "security-domain"
    if rejected_paths != untrusted_paths:
        return False, rejected_paths, "path-admission"
    if save_size < 0 or save_size > save_limit:
        return False, save_size, "save-budget"
    if remote_content or not telemetry_opt_in:
        return False, save_size, "external-data"
    assert save_size <= save_limit
    return True, rejected_paths, "bounded-local-data"`,
    anchors: [
      'rejected_paths != untrusted_paths',
      'save_size > save_limit',
      'remote_content',
      'not telemetry_opt_in',
    ],
    task: 'bound asset and save paths, sizes, parsing, integrity purpose, privacy, telemetry consent, and untrusted-content behavior',
  },
  'asteroids-release-recovery-defense': {
    parameters:
      'correctness: bool = True, accessibility: bool = True, performance: bool = True, portability: bool = True, security: bool = True, rollback: bool = True, recovery: bool = True, residual_risk_owned: bool = True',
    body: `    gates = (correctness, accessibility, performance, portability, security, rollback, recovery)
    passed = sum(1 for gate in gates if gate)
    if not correctness or not accessibility:
        return False, passed, "player-quality"
    if not performance or not portability or not security:
        return False, passed, "release-quality"
    if not rollback or not recovery:
        return False, passed, "recovery-gap"
    if not residual_risk_owned:
        return False, passed, "unowned-risk"
    assert passed == len(gates)
    return True, passed, "production-game-defense"`,
    anchors: ['not correctness', 'not performance', 'not rollback', 'not residual_risk_owned'],
    task: 'defend an immutable game release across player value, accessibility, determinism, performance, portability, security, rollback, recovery, and owned residual risk',
  },
};

const ENVIRONMENTS = [
  'a keyboard-only community arcade night',
  'a low-vision laptop playtest at 125 percent scaling',
  'a controller-remapping accessibility review',
  'a headless continuous-integration replay',
  'a low-power integrated-GPU frame-budget trial',
  'an offline cross-platform release rehearsal',
];

const CHANGES = [
  'replay the same input trace at 30, 60, and 144 presentation frames per second and compare simulation state',
  'cross both screen seams in one update and retain collision and rendering continuity',
  'lose window focus while thrust and fire are held, then prove both actions release safely',
  'replace an audio-only collision cue with synchronized text, shape, and optional sound evidence',
  'inject a 400 millisecond frame stall and prove the update budget prevents a spiral of death',
  'run the packaged build with dummy video and audio drivers, missing optional sound, and a corrupted save',
];

const CONSTRAINTS = [
  'retain player goal, revision, Python, pygame-ce, SDL, fixture, seed, input trace, viewport, and result identity',
  'keep browser work pure, deterministic, bounded, and free of native display, device, audio, file, package, and operating-system effects',
  'preserve explicit pixels, seconds, radians or degrees, frames, entity counts, collision units, and budgets',
  'keep every critical cue available through more than color or sound and every action remappable without timing precision',
  'test empty, zero-vector, seam, low-frame-rate, focus-loss, device-loss, missing-asset, corrupted-save, and rejected cases',
  'record the first failed invariant, repair, regression evidence, playtest observation, rollback, recovery, and residual-risk owner',
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

export function asteroidsPythonScenario(moduleId, seed, activityKind = 'practice', competency) {
  const spec = SPECS[moduleId];
  if (!spec) throw new Error(`Missing Asteroids scenario profile for ${moduleId}`);
  const chosen = details(seed.toString(36));
  const probe = competency ? ` Competency probe: ${competency.statement}` : '';
  return `A ${activityKind} Asteroids team handles case ${chosen.caseNumber} during ${chosen.environment}. Build deterministic Python evidence to ${spec.task}; ${chosen.constraint}; then ${chosen.change}. Browser code uses pure bounded models and original fixed fixtures only. Real pygame-ce, SDL, windows, controllers, audio devices, assets, files, installers, frame timing, GPUs, packaging, and production behavior require explicit controlled desktop transfer gates.${probe}`;
}

export function asteroidsPythonEvidenceContract({
  competencyId,
  moduleId,
  functionName,
  marker,
  suffix,
}) {
  const spec = SPECS[moduleId];
  if (!spec) throw new Error(`Missing Asteroids evidence profile for ${moduleId}`);
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
        "player${suffix}",
        "seed${chosen.caseNumber}",
        "input${[...suffix].reverse().join('')}",
        "frame${suffix}${chosen.caseNumber}",
        "state${chosen.caseNumber}${suffix}",
        "playtest${[...suffix].reverse().join('')}${chosen.caseNumber}",
    )
    assert len(set(evidence_axes_${suffix})) == 6
${spec.body}
`,
    requirement: `Append a runnable pure-Python function headed "${marker}" that uses case ${chosen.caseNumber} to ${spec.task}. Keep its defaults runnable, assert an invariant, and return observable changed-case evidence. Browser code must not claim native pygame-ce, SDL, window, controller, mixer, filesystem, package, GPU, installer, or production behavior; verify those boundaries later with Python 3.14.6, released pygame-ce 2.5.7, fixed and headless SDL fixtures, real devices, licensed assets, accessibility playtests, profiling, clean installations, rollback, recovery, and release gates.`,
  };
}

export function asteroidsPythonWorkedExample(moduleId, seed) {
  return asteroidsPythonEvidenceContract({
    competencyId: `asteroids-worked-${moduleId}-${seed}`,
    moduleId,
    functionName: `worked_${moduleId.replaceAll('-', '_')}_${seed}`,
    marker: `# Evidence: asteroids-worked-${moduleId}-${seed}`,
    suffix: `worked${seed}`,
  }).example;
}

export const asteroidsPythonEvidenceModuleIds = Object.freeze(Object.keys(SPECS));

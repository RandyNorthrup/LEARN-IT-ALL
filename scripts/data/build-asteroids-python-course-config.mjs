import { finalizeCourse, project, skill } from './course-config-helpers.mjs';

const REVIEWED_AT = '2026-07-14';
const RESEARCHED_AT = '2026-07-15T08:00:00.000Z';

function outcome(id, statement, misconception, knowledgeType = 'procedural', level = 'apply') {
  if (!misconception) throw new Error(`Missing misconception for Asteroids competency ${id}`);
  return skill(id, statement, misconception, knowledgeType, level);
}

function gameModule(id, title, context, artifact, skills) {
  return {
    id,
    title,
    context,
    artifact,
    objectives: skills.slice(0, 3).map((entry) => entry[1]),
    skills,
    contexts: {
      theory: `${context} Predict player-visible behavior, state, units, timing, input, rendering, feedback, failure, accessibility, and evidence before reading the governing source.`,
      workshop: `A two-person studio incrementally builds ${artifact} from original geometric fixtures while retaining earlier Python, repository, determinism, frame-budget, accessibility, testing, and recovery requirements.`,
      debug: `A preserved game trace contains one plausible state, timing, input, vector, rendering, collision, ownership, audio, accessibility, packaging, or release defect; locate the first failed invariant before editing.`,
      lab: `An independent adaptive-arcade team receives a different viewport, device, frame rate, seed, entity count, accessibility profile, platform, and delivery constraint and transfers ${title.toLowerCase()} into a changed ${artifact}.`,
      review: `A delayed playtest review reconstructs ${title.toLowerCase()} from revision, seed, input frames, simulation snapshots, draw records, audio cues, accessibility settings, profiles, package artifacts, and release evidence.`,
      quiz: `A release reviewer compares near-miss decisions for ${title.toLowerCase()} and accepts only runnable changed-case evidence, explicit limitations, and named browser, pygame-ce, SDL, display, input, audio, filesystem, packaging, GPU, and production transfer gates.`,
    },
  };
}

const modules = [
  gameModule(
    'asteroids-outcomes-repo-accessibility',
    'Player Outcomes, Repository Baseline, Accessibility, and Evidence',
    'A studio says “make Asteroids” but has not defined the player, verbs, success, failure, control needs, sensory alternatives, supported devices, repository state, or acceptance evidence.',
    'player, repository, accessibility, and evidence charter',
    [
      outcome(
        'asteroids-player-outcome',
        'Define player, play goal, core verbs, feedback, consequence, session length, and observable success before choosing mechanics.',
        'A recognizable triangle and rocks constitute a complete game outcome.',
        'strategic',
        'create'
      ),
      outcome(
        'asteroids-acceptance-evidence',
        'Translate fun, fairness, responsiveness, and clarity into repeatable playtest tasks, traces, thresholds, and changed cases.',
        'Fun cannot be investigated with observable evidence.',
        'strategic',
        'evaluate'
      ),
      outcome(
        'asteroids-repository-baseline',
        'Inspect status, diff, revision, ignore rules, environment files, assets, licenses, and existing tests before editing.',
        'A game prototype is too small to need a clean repository baseline.'
      ),
      outcome(
        'asteroids-accessibility-charter',
        'Record input, vision, hearing, motion, cognition, timing, text, difficulty, and assistive-technology needs before implementation.',
        'Accessibility is a post-release options-menu polish task.',
        'professional',
        'create'
      ),
      outcome(
        'asteroids-evidence-ladder',
        'Separate pure simulation, headless integration, visual review, device playtest, accessibility review, package, and release evidence.',
        'A passing unit test proves the game feels responsive and accessible.',
        'metacognitive',
        'evaluate'
      ),
    ]
  ),
  gameModule(
    'asteroids-runtime-sdl-loop',
    'Python 3.14, pygame-ce 2.5.7, SDL, Initialization, and the Main Loop',
    'A script imports an incompatible pygame distribution, opens a window during import, ignores failed modules and quit events, presents twice, and never cleans up.',
    'owned runtime and minimal event-update-render loop',
    [
      outcome(
        'asteroids-runtime-choice',
        'Pin Python 3.14 and released pygame-ce 2.5.7 as a mutually supported stack while distinguishing package name from import name.',
        'Classic pygame and pygame-ce can safely coexist in one environment.'
      ),
      outcome(
        'asteroids-sdl-boundary',
        'Explain how pygame calls into SDL and identify display, event, input, audio, timer, filesystem, and platform boundaries.',
        'Pygame is a game engine that owns every application decision.'
      ),
      outcome(
        'asteroids-init-results',
        'Initialize only required modules, inspect failures, create the display before dependent conversions, and preserve causal diagnostics.',
        'pygame.init returning is proof that every subsystem works.'
      ),
      outcome(
        'asteroids-loop-phases',
        'Order event intake, intent, simulation, collision, cleanup, rendering, presentation, and timing once per frame.',
        'Any loop order is equivalent if the screen changes.'
      ),
      outcome(
        'asteroids-quit-cleanup',
        'Handle window and program exit through one owned stop path that releases resources and returns a status.',
        'Closing the terminal is an adequate game shutdown design.'
      ),
    ]
  ),
  gameModule(
    'asteroids-coordinate-vector-units',
    'Coordinates, Scalars, Vector2, Angles, and Units',
    'The ship stores integer x and y, mixes degrees with radians, normalizes a zero vector, treats screen y as mathematical y, and adds pixels per second directly to position.',
    'unit-labeled 2D geometry model',
    [
      outcome(
        'asteroids-coordinate-convention',
        'Declare screen origin, axes, handedness, logical viewport, centers, bounds, and world-to-screen conversion.',
        'Positive y always means visually upward.'
      ),
      outcome(
        'asteroids-vector-semantics',
        'Use Vector2 addition, subtraction, scaling, magnitude, squared distance, dot, cross, copy, and mutation with explicit meaning.',
        'Every Vector2 operation returns a new value and cannot alias state.'
      ),
      outcome(
        'asteroids-direction-rotation',
        'Derive facing vectors from a named zero-angle and degree convention and test clockwise screen appearance.',
        'Vector2.rotate visually follows the usual mathematical counterclockwise direction on screen.'
      ),
      outcome(
        'asteroids-zero-vector',
        'Guard normalization and scale-to-length operations when a vector has no direction.',
        'Normalizing a zero vector returns another zero vector.'
      ),
      outcome(
        'asteroids-motion-units',
        'Label position, velocity, acceleration, angle, angular velocity, seconds, and frame counts and reject unit-invalid formulas.',
        'Multiplying or dividing by delta time is optional style.'
      ),
    ]
  ),
  gameModule(
    'asteroids-time-step-simulation',
    'Clock, Delta Time, Fixed Steps, Interpolation, and Stalls',
    'Movement is tuned per frame, a long pause launches the ship across the map, collision results change with monitor refresh rate, and catch-up updates freeze the process.',
    'bounded deterministic time-step policy',
    [
      outcome(
        'asteroids-clock-contract',
        'Call Clock.tick once per presented frame, convert milliseconds to seconds, and distinguish measured, capped, and simulation time.',
        'Clock.tick returns seconds and enforces exact frame pacing.'
      ),
      outcome(
        'asteroids-variable-step',
        'Use variable delta time only where stability and determinism evidence justify it and test multiple presentation rates.',
        'Multiplying by delta time makes every simulation frame-rate independent.'
      ),
      outcome(
        'asteroids-fixed-step',
        'Accumulate real time into bounded fixed simulation updates and preserve remainder for interpolation.',
        'A fixed step means sleeping for a fixed amount before every update.'
      ),
      outcome(
        'asteroids-stall-clamp',
        'Clamp pathological frame time and cap catch-up updates while recording discarded debt and player impact.',
        'The simulation should always process every missed update regardless of delay.'
      ),
      outcome(
        'asteroids-time-evidence',
        'Replay identical inputs across 30, 60, 144, jittered, paused, and stalled presentation traces and compare state tolerances.',
        'Average frames per second proves timing correctness.'
      ),
    ]
  ),
  gameModule(
    'asteroids-input-events-remapping',
    'Events, Held State, Actions, Remapping, Focus, and Devices',
    'The ship fires every frame a key is held, misses quit events, keeps thrust after focus loss, hard-codes WASD, assumes one controller identity, and requires precise simultaneous presses.',
    'device-independent remappable action layer',
    [
      outcome(
        'asteroids-event-queue',
        'Drain or pump the bounded event queue every frame and distinguish ordered events from sampled device state.',
        'Polling key state eliminates the need to process events.'
      ),
      outcome(
        'asteroids-edge-held-actions',
        'Map press, release, repeat, held, analog, and one-shot behavior to named actions with testable transitions.',
        'KEYDOWN and get_pressed are interchangeable input models.'
      ),
      outcome(
        'asteroids-remapping',
        'Store configurable action bindings, detect conflicts, offer alternatives, and avoid unmodified character-key shortcuts where inappropriate.',
        'One familiar keyboard layout works for every player.'
      ),
      outcome(
        'asteroids-focus-device-loss',
        'Release latched actions and degrade safely when window focus, controller instance, battery, or audio device changes.',
        'Input state stays valid until a matching key-up event arrives.'
      ),
      outcome(
        'asteroids-input-accessibility',
        'Support keyboard and controller, reduced-complexity modes, toggle or hold options, sensitivity, dead zones, timing relief, and pause.',
        'Adding controller support automatically makes input accessible.'
      ),
    ]
  ),
  gameModule(
    'asteroids-game-state-scenes',
    'Game State, Scenes, Pause, Life Loss, Restart, and Ownership',
    'Menus, play, pause, death, and game over are booleans that form impossible combinations; pause leaves timers running; restart retains old projectiles and score.',
    'explicit scene and run-lifecycle state machine',
    [
      outcome(
        'asteroids-state-model',
        'Represent boot, menu, playing, paused, life-lost, game-over, settings, and exit as explicit valid states.',
        'Several booleans are simpler and just as safe as a state machine.'
      ),
      outcome(
        'asteroids-transition-contract',
        'Define trigger, guard, exit work, entry work, resulting state, and rejected transitions.',
        'A scene can mutate directly into any other scene without a transition contract.'
      ),
      outcome(
        'asteroids-pause-semantics',
        'Freeze simulation clocks and dangerous input while keeping menus, status, audio control, and window events responsive.',
        'Pause is implemented by skipping display updates.'
      ),
      outcome(
        'asteroids-run-reset',
        'Reset run-scoped entities, timers, score, lives, seed, and transient effects without destroying user settings.',
        'Recreating the player is sufficient restart cleanup.'
      ),
      outcome(
        'asteroids-scene-evidence',
        'Test every legal and illegal transition including focus loss, quit, device loss, corrupted settings, and rapid restart.',
        'If menu-to-play works, the scene graph is tested.'
      ),
    ]
  ),
  gameModule(
    'asteroids-ship-motion-physics',
    'Ship Rotation, Thrust, Inertia, Drag, and Speed Limits',
    'Thrust teleports position, diagonal motion is faster, velocity aliases facing, turning changes old momentum, drag depends on frames, and speed caps each component independently.',
    'frame-rate-independent inertial ship controller',
    [
      outcome(
        'asteroids-ship-facing',
        'Update angle from action intent and derive a normalized facing vector without overwriting velocity direction.',
        'The ship must always move exactly where it faces.'
      ),
      outcome(
        'asteroids-thrust-integration',
        'Integrate acceleration into velocity and velocity into position with explicit seconds and bounded time.',
        'Thrust should be added directly to position for responsive controls.'
      ),
      outcome(
        'asteroids-inertia-drag',
        'Preserve momentum and apply a time-scaled damping model whose behavior is tested across frame rates.',
        'Multiplying velocity by one constant each frame is frame-rate independent.'
      ),
      outcome(
        'asteroids-speed-clamp',
        'Clamp vector magnitude rather than components and define reverse, zero, and boost behavior.',
        'Clamping x and y separately preserves the same maximum speed in every direction.'
      ),
      outcome(
        'asteroids-ship-feel-evidence',
        'Tune rotation, acceleration, drag, cap, input latency, and feedback against recorded player tasks and objective traces.',
        'Good game feel is only a personal numeric preference.'
      ),
    ]
  ),
  gameModule(
    'asteroids-wrap-viewport-resize',
    'Toroidal Wrapping, Object Bounds, Viewports, Resize, and Scaling',
    'Objects wrap when centers cross, disappear at seams, collide incorrectly across edges, resize teleports the world, high-DPI scaling distorts input, and zero-sized windows divide by zero.',
    'seam-safe logical viewport and resize policy',
    [
      outcome(
        'asteroids-center-vs-bounds',
        'Choose center, radius, Rect, FRect, and visual bounds deliberately and keep float world state separate from raster bounds.',
        'A Rect center can preserve arbitrary subpixel world motion.'
      ),
      outcome(
        'asteroids-toroidal-wrap',
        'Wrap complete object bounds with modular arithmetic and test overshoot across corners and large time steps.',
        'Setting x to zero at width creates seamless wrapping.'
      ),
      outcome(
        'asteroids-seam-collision',
        'Compare shortest toroidal displacement or ghost proxies so collisions remain continuous across seams.',
        'Rendering a duplicate at the edge automatically fixes collision detection.'
      ),
      outcome(
        'asteroids-logical-scaling',
        'Separate logical resolution from window pixels and map rendering and input through one letterbox or scaling transform.',
        'Resizable display flags automatically preserve game coordinates and aspect ratio.'
      ),
      outcome(
        'asteroids-resize-dpi',
        'Handle resize, minimize, restore, high-DPI, fullscreen, and zero extents without corrupting world state.',
        'Window size and drawable pixel size are always identical.'
      ),
    ]
  ),
  gameModule(
    'asteroids-render-surfaces-assets',
    'Surfaces, Draw Order, Alpha, Transforms, Assets, and Presentation',
    'Every frame reloads assets, repeatedly rotates transformed images, mixes alpha modes, draws UI behind the world, converts before display setup, and calls flip from several objects.',
    'owned layered rendering and asset pipeline',
    [
      outcome(
        'asteroids-surface-model',
        'Distinguish display and off-screen surfaces, pixel formats, per-surface and per-pixel alpha, color keys, locks, and conversion timing.',
        'A Surface is only a filename-backed image.'
      ),
      outcome(
        'asteroids-draw-layers',
        'Define clear, background, world, effects, HUD, focus, diagnostics, and presentation order once per frame.',
        'Each entity should call display.flip after drawing itself.'
      ),
      outcome(
        'asteroids-transform-source',
        'Rotate and scale from an immutable source, recenter output bounds, cache justified variants, and avoid cumulative degradation.',
        'Repeatedly rotating the last rotated surface preserves quality and center.'
      ),
      outcome(
        'asteroids-asset-admission',
        'Load licensed assets through versioned paths, validate dimensions and formats, provide fallbacks, and surface causal failures.',
        'If pygame.image.load succeeds, the asset is production-ready.'
      ),
      outcome(
        'asteroids-render-alternatives',
        'Make ship, hazard, projectile, focus, damage, and status distinguishable without color alone and under reduced effects.',
        'A neon palette is readable and accessible by default.'
      ),
    ]
  ),
  gameModule(
    'asteroids-projectiles-cooldowns-pools',
    'Projectiles, Edge Triggers, Cooldowns, Lifetimes, and Reuse',
    'Held fire spawns unbounded bullets, cooldown uses frame count, expired bullets remain in collision groups, pool reuse keeps old velocity, and rapid restart leaks projectiles.',
    'bounded projectile lifecycle',
    [
      outcome(
        'asteroids-fire-intent',
        'Convert action edges and held auto-fire policy into deterministic fire requests separate from object creation.',
        'The projectile constructor should read the keyboard directly.'
      ),
      outcome(
        'asteroids-fire-cooldown',
        'Gate shots using simulation time, inclusive boundary tests, pause semantics, and a visible or audible readiness cue.',
        'Checking frame count creates the same cooldown on every machine.'
      ),
      outcome(
        'asteroids-projectile-spawn',
        'Derive muzzle position and velocity from ship transform while deciding whether ship momentum contributes.',
        'Every bullet should spawn at the ship center with one global velocity.'
      ),
      outcome(
        'asteroids-projectile-lifetime',
        'Expire projectiles by world distance or simulation time and remove every group and collision reference exactly once.',
        'Off-screen wrapping means projectiles never need a lifetime.'
      ),
      outcome(
        'asteroids-pool-reset',
        'If reuse is justified, reset all position, velocity, age, owner, collision, render, and active fields and prove reconciliation.',
        'Object pooling is automatically faster and safe if instances are recycled.'
      ),
    ]
  ),
  gameModule(
    'asteroids-generation-polygons-difficulty',
    'Seeded Asteroid Generation, Polygons, Sizes, and Difficulty Inputs',
    'Random points self-intersect, seeds are global and hidden, small rocks award less but move impossibly, spawns overlap the ship, and difficulty grows without bound.',
    'seeded readable asteroid factory',
    [
      outcome(
        'asteroids-seeded-rng',
        'Inject a dedicated random generator and record seed and draw order without claiming cryptographic randomness.',
        'Calling random.seed once makes an entire program reproducible regardless of code changes.'
      ),
      outcome(
        'asteroids-polygon-generation',
        'Generate ordered angular vertices with bounded radius variation and validate minimum size, winding, and intersections.',
        'Random x-y points connected in generation order always form an asteroid outline.'
      ),
      outcome(
        'asteroids-size-tier',
        'Define large, medium, and small radius, speed, score, fragment, rendering, and collision contracts.',
        'Scaling one sprite changes every physical and gameplay property correctly.'
      ),
      outcome(
        'asteroids-spawn-policy',
        'Sample spawn edges or zones under distance, visibility, seam, entity-cap, retry, and safe-fallback constraints.',
        'Random placement becomes fair after enough retries.'
      ),
      outcome(
        'asteroids-difficulty-inputs',
        'Bound count, speed, size, spawn interval, aim burden, cue clarity, and selectable assistance as separate difficulty inputs.',
        'Difficulty is one multiplier applied to every number.'
      ),
    ]
  ),
  gameModule(
    'asteroids-collision-detection',
    'Broad Phase, Circle, Rect, Mask, Seam, and Swept Collision Detection',
    'The game tests every pair, uses transformed Rect overlap as exact geometry, constructs masks every frame, misses seam pairs, and lets fast bullets tunnel through small rocks.',
    'layered collision detection pipeline',
    [
      outcome(
        'asteroids-collision-shapes',
        'Choose circle, AABB, rotated bound, polygon, or mask from acceptable false positives, cost, and player expectation.',
        'Pixel-perfect collision is always the fairest and best choice.'
      ),
      outcome(
        'asteroids-broad-phase',
        'Use groups, spatial partitioning, sweep, or bounded pair sets to reduce candidates without dropping possible overlaps.',
        'With a small prototype, quadratic collision work never needs a budget.'
      ),
      outcome(
        'asteroids-circle-distance',
        'Compare squared center distance with squared radius sum and test tangent, overlap, separation, zero radius, and float tolerance.',
        'Distance must always take a square root to be correct.'
      ),
      outcome(
        'asteroids-mask-contract',
        'Build masks only from current transformed surfaces when needed and align offsets to matching coordinate systems.',
        'spritecollide with a mask automatically understands world centers and rotation.'
      ),
      outcome(
        'asteroids-swept-seam-cases',
        'Test segment or swept motion and toroidal images for fast movement and edge crossings.',
        'Increasing the display frame rate reliably prevents tunneling.'
      ),
    ]
  ),
  gameModule(
    'asteroids-collision-response-damage',
    'Collision Events, Single Resolution, Fragments, Damage, and Lives',
    'One projectile damages the same rock twice, both loops delete the same sprite, fragments recursively collide during creation, ship damage repeats every frame, and feedback arrives after state removal.',
    'ordered single-resolution collision response',
    [
      outcome(
        'asteroids-detection-response',
        'Separate collision facts from response decisions so detection stays pure and effects occur in an owned phase.',
        'Collision detection should immediately mutate every involved object.'
      ),
      outcome(
        'asteroids-single-resolution',
        'Assign pair identity and terminal ownership so score, deletion, sound, fragments, and telemetry happen once.',
        'Removing a sprite from one group prevents every duplicate response.'
      ),
      outcome(
        'asteroids-fragment-contract',
        'Spawn child sizes, positions, velocities, immunity, and counts after parent resolution under entity budgets.',
        'Fragments can safely inherit every parent field.'
      ),
      outcome(
        'asteroids-damage-window',
        'Model lives, invulnerability, respawn safety, visible and nonvisual feedback, and pause behavior using simulation time.',
        'Blinking the ship is sufficient damage and invulnerability logic.'
      ),
      outcome(
        'asteroids-response-order',
        'Specify response event ordering and test simultaneous projectile-rock, ship-rock, wave-clear, and life-loss cases.',
        'Whatever collision loop runs first defines acceptable game rules.'
      ),
    ]
  ),
  gameModule(
    'asteroids-score-progression-spawning',
    'Score Reconciliation, Waves, Safe Spawns, Pacing, and Difficulty Options',
    'Score drifts from destruction records, waves advance before fragments resolve, the ship respawns inside danger, pacing accelerates without respite, and assistance modes shame the player.',
    'fair progression and difficulty model',
    [
      outcome(
        'asteroids-score-ledger',
        'Derive score from immutable resolved events and reconcile totals by entity tier, streak, bonus, and run.',
        'The HUD integer is the authoritative score record.'
      ),
      outcome(
        'asteroids-wave-completion',
        'Advance only when active, queued, and pending-fragment counts satisfy a declared completion invariant.',
        'An empty visible sprite group always means a wave is complete.'
      ),
      outcome(
        'asteroids-safe-respawn',
        'Select and verify a respawn zone using predicted hazards, toroidal distance, grace time, fallback, and player communication.',
        'Center screen is inherently a safe respawn location.'
      ),
      outcome(
        'asteroids-pacing-curve',
        'Shape action and recovery intervals using bounded curves, playtest cohorts, and separate parameter evidence.',
        'Difficulty should increase linearly forever to remain challenging.'
      ),
      outcome(
        'asteroids-difficulty-access',
        'Offer descriptive presets and independent assistance for speed, lives, damage, aim, controls, cues, motion, and timing.',
        'An easy mode changes game integrity and should be hidden.'
      ),
    ]
  ),
  gameModule(
    'asteroids-sprites-groups-ownership',
    'Sprites, Groups, Update Contracts, Kill Semantics, and Entity Ownership',
    'Sprites add themselves to global groups, update signatures differ, draw order depends on set iteration, killed objects keep external references, and restart doubles group membership.',
    'reconciled sprite and group lifecycle',
    [
      outcome(
        'asteroids-sprite-contract',
        'Define image, rect or FRect, world position, update inputs, draw responsibility, and lifecycle for every Sprite subtype.',
        'Subclassing Sprite automatically gives an object correct update and rendering behavior.'
      ),
      outcome(
        'asteroids-group-purpose',
        'Use separate update, draw-layer, collision, projectile, hazard, and UI groups only when ownership and membership are explicit.',
        'Every sprite should belong to one universal group.'
      ),
      outcome(
        'asteroids-update-signature',
        'Keep group update inputs consistent or route context through an explicit system boundary.',
        'Group.update checks and adapts to each sprite method signature.'
      ),
      outcome(
        'asteroids-kill-cleanup',
        'Understand kill as group removal, release external indexes and resources, and reconcile created, active, and retired counts.',
        'Sprite.kill destroys the Python object and every reference.'
      ),
      outcome(
        'asteroids-layered-groups',
        'Make render order deterministic through LayeredUpdates or explicit sorting and test focus and HUD precedence.',
        'Current group iteration order is a stable rendering contract.'
      ),
    ]
  ),
  gameModule(
    'asteroids-audio-mixer-cues',
    'Mixer Initialization, Channels, Latency, Volume, Mute, and Cue Alternatives',
    'Audio initializes late with wrong parameters, rapid shots cut off critical warnings, one slider controls everything, mute is unavailable, missing audio crashes launch, and gameplay meaning is sound-only.',
    'bounded accessible audio and cue system',
    [
      outcome(
        'asteroids-mixer-init',
        'Configure mixer frequency, format, channels, buffer, and initialization before loading sounds and record platform limits.',
        'Default mixer settings guarantee low latency on every device.'
      ),
      outcome(
        'asteroids-channel-budget',
        'Reserve or prioritize channels for critical cues and define overlap, stealing, cooldown, and device-loss behavior.',
        'Calling Sound.play guarantees the cue will be heard.'
      ),
      outcome(
        'asteroids-volume-controls',
        'Provide master and separate effects and music control, mute, remembered settings, and safe defaults.',
        'Operating-system volume is enough game audio control.'
      ),
      outcome(
        'asteroids-cue-alternatives',
        'Pair every gameplay-critical sound with clear visual, text, shape, spatial, or optional haptic information.',
        'A loud sound is accessible because it is noticeable.'
      ),
      outcome(
        'asteroids-audio-failure',
        'Continue play with missing files, unavailable mixer, device change, interruption, or mute while preserving diagnostics.',
        'A game without audio output should refuse to start.'
      ),
    ]
  ),
  gameModule(
    'asteroids-hud-menus-accessibility',
    'HUD, Text, Menus, Focus, Multichannel Cues, and Motion Settings',
    'Tiny centered text scales poorly, focus is color-only, menus require a mouse, damage flashes rapidly, status disappears immediately, and reduced motion removes essential information.',
    'accessible responsive game interface and settings flow',
    [
      outcome(
        'asteroids-readable-text',
        'Choose scalable fonts, line spacing, contrast, alignment, safe areas, localization space, and structured labels for essential text.',
        'High resolution makes any font size readable.'
      ),
      outcome(
        'asteroids-menu-navigation',
        'Support predictable keyboard and controller navigation, wrap policy, back, confirmation, cancellation, and no traps.',
        'If gameplay uses keys, menus are keyboard accessible automatically.'
      ),
      outcome(
        'asteroids-focus-status',
        'Render persistent non-color focus and announce or retain important state, errors, destructive actions, and setting changes.',
        'A brighter button color is sufficient focus evidence.'
      ),
      outcome(
        'asteroids-multichannel-cues',
        'Encode hazards, hits, readiness, life loss, score, pause, and game over through multiple perceivable channels.',
        'Shape plus color makes information available to players without vision.'
      ),
      outcome(
        'asteroids-motion-photosensitivity',
        'Offer reduced motion and effects, avoid unsafe flashes, cap screen shake, allow pause, and preserve essential alternatives.',
        'Retro flashing is harmless when individual flashes are short.'
      ),
    ]
  ),
  gameModule(
    'asteroids-determinism-replay-save',
    'Seeded Simulation, Input Replay, State Hashes, Settings, and Save Migration',
    'Rendering consumes random draws, replay stores key state without timing, floats are compared as formatted text, settings overwrite atomically unsafe, and corrupted saves silently reset.',
    'reproducible replay and versioned local state',
    [
      outcome(
        'asteroids-rng-streams',
        'Inject separate seeded random streams for gameplay and cosmetic effects and record draw-order compatibility.',
        'One global seed guarantees replay after any rendering change.'
      ),
      outcome(
        'asteroids-input-replay',
        'Record simulation-step actions, seed, version, settings, viewport policy, and checkpoints rather than device events alone.',
        'A list of pressed keys is enough to reproduce a run.'
      ),
      outcome(
        'asteroids-state-hash',
        'Canonicalize relevant simulation state and compare tolerant numeric fields without including display-only noise.',
        'Hashing repr of every object creates a stable replay checksum.'
      ),
      outcome(
        'asteroids-settings-save',
        'Validate versioned settings and scores, write atomically, limit size, reject corruption, and retain recovery guidance.',
        'JSON parsing success proves a save file is valid and safe.'
      ),
      outcome(
        'asteroids-schema-migration',
        'Migrate supported versions explicitly and preserve backups while rejecting unknown future state without data loss.',
        'Adding defaults to a dictionary is a complete save migration strategy.'
      ),
    ]
  ),
  gameModule(
    'asteroids-architecture-pure-core',
    'Pure Simulation Core, Effect Adapters, Events, and Dependency Direction',
    'Entities read global input, clock, screen, sound, and random state; constructors load files; collisions mutate UI; tests require a window; and modules import each other cyclically.',
    'testable game core and adapter architecture',
    [
      outcome(
        'asteroids-pure-simulation',
        'Model state transitions as deterministic functions over state, actions, time step, and injected randomness where practical.',
        'Pure functions cannot express a responsive real-time game.'
      ),
      outcome(
        'asteroids-effect-adapters',
        'Keep display, events, devices, audio, assets, persistence, clock, logging, and packaging behind thin owned adapters.',
        'Wrapping pygame calls in classes automatically creates clean architecture.'
      ),
      outcome(
        'asteroids-domain-events',
        'Emit immutable collision, score, life, wave, cue, and transition records and consume them in explicit order.',
        'An event bus removes the need to define event ownership and ordering.'
      ),
      outcome(
        'asteroids-dependency-direction',
        'Direct dependencies from orchestration toward stable domain contracts and reject import cycles and hidden singletons.',
        'Small games benefit from global state because architecture is unnecessary.'
      ),
      outcome(
        'asteroids-architecture-evidence',
        'Prove the pure core runs without pygame and the adapter composition runs headlessly without claiming visual or device quality.',
        'Headless import success proves the complete desktop game works.'
      ),
    ]
  ),
  gameModule(
    'asteroids-testing-headless-fixtures',
    'Unit, Property, Replay, Headless SDL, Render, and Playtest Evidence',
    'Tests assert implementation details, use real time and global random state, compare one screenshot, never inject failures, and call dummy video proof of usability.',
    'risk-layered automated and human game test suite',
    [
      outcome(
        'asteroids-pure-unit-tests',
        'Test vector, wrap, time, input, state, score, collision, spawn, and migration invariants with fixed fixtures.',
        'Testing individual methods establishes end-to-end game correctness.'
      ),
      outcome(
        'asteroids-property-changed-tests',
        'Generate bounded cases for wrap, collision symmetry, conservation, reconciliation, replay, and invalid input and retain smallest failures.',
        'Random tests are useful even without reproducible seeds or invariants.'
      ),
      outcome(
        'asteroids-headless-sdl',
        'Use dummy video and audio drivers for adapter integration while labeling missing window, GPU, timing, device, and sensory evidence.',
        'SDL dummy drivers accurately simulate player hardware.'
      ),
      outcome(
        'asteroids-render-contract',
        'Test draw records, layers, transforms, asset bounds, and selected golden outputs with controlled tolerances and review.',
        'One pixel-perfect screenshot is a stable cross-platform rendering test.'
      ),
      outcome(
        'asteroids-playtest-accessibility',
        'Run structured tasks with varied players and devices, capture barriers and observations ethically, repair, and retest.',
        'Automated accessibility checks can certify game playability.'
      ),
    ]
  ),
  gameModule(
    'asteroids-performance-profiling',
    'Frame Budgets, Profiling, Allocations, Collision Cost, and Responsiveness',
    'The team optimizes by feel, reports average FPS, profiles menus instead of peak play, allocates every draw, rebuilds masks per frame, and changes physics for speed.',
    'representative frame-time and capacity evidence',
    [
      outcome(
        'asteroids-frame-budget',
        'Allocate a target frame budget across event, simulation, collision, rendering, presentation, and audio work using percentiles.',
        'Average FPS reveals every visible hitch.'
      ),
      outcome(
        'asteroids-representative-profile',
        'Profile warm representative waves, worst supported entity counts, stalls, resize, pause, and low-power targets before optimizing.',
        'The profiler identifies which change to make without a performance question.'
      ),
      outcome(
        'asteroids-allocation-control',
        'Measure per-frame allocations and cache immutable assets, transforms, masks, text, or pools only when evidence justifies complexity.',
        'Object allocation is always the main Python game bottleneck.'
      ),
      outcome(
        'asteroids-collision-capacity',
        'Measure candidate and narrow-phase pairs, entity caps, spatial index cost, and changed distribution cases.',
        'The same collision algorithm scales linearly until the screen looks crowded.'
      ),
      outcome(
        'asteroids-performance-regression',
        'Gate percentile frame time, input-to-feedback latency, memory, load time, and semantic replay equivalence by target.',
        'A faster build is acceptable if it merely feels the same.'
      ),
    ]
  ),
  gameModule(
    'asteroids-packaging-assets-platforms',
    'Project Metadata, Assets, PyInstaller 6.21, Platforms, and Clean Launch',
    'The game depends on the current directory, omits fonts and sound, builds one executable on Linux and calls it cross-platform, lacks licenses, and is never installed fresh.',
    'portable inspected game release candidate',
    [
      outcome(
        'asteroids-project-metadata',
        'Declare Python and dependency bounds, entry point, package data, license, authorship, version, and reproducible environment metadata.',
        'A requirements file and main.py fully describe a distributable game.'
      ),
      outcome(
        'asteroids-resource-paths',
        'Resolve packaged resources through supported APIs instead of current working directory or mutable source paths.',
        'Relative asset paths behave the same from source and a bundled executable.'
      ),
      outcome(
        'asteroids-pyinstaller-boundary',
        'Build with PyInstaller on each target OS, inspect analysis and contents, handle data and native libraries, and test one-folder before one-file.',
        'PyInstaller cross-compiles Windows and macOS executables from Linux.'
      ),
      outcome(
        'asteroids-platform-matrix',
        'Test supported OS, architecture, scaling, display, audio, input, permissions, offline, locale, and clean-profile combinations.',
        'A successful developer-machine launch covers the supported platform matrix.'
      ),
      outcome(
        'asteroids-asset-licenses',
        'Inventory origin, permission, transformation, attribution, package inclusion, fallback, and removal for every asset.',
        'Free-to-download game assets are automatically distributable.'
      ),
    ]
  ),
  gameModule(
    'asteroids-security-save-assets',
    'Untrusted Assets, Save Parsing, Paths, Privacy, and Local Security',
    'A mod folder escapes its root, decompression consumes memory, pickle loads scores, save files are unlimited, crash reports include home paths, and telemetry starts without consent.',
    'bounded local-data and privacy policy',
    [
      outcome(
        'asteroids-threat-model',
        'Identify protected player data and availability, untrusted files and paths, package supply chain, local attackers, and realistic consequences.',
        'An offline single-player game has no security boundary.'
      ),
      outcome(
        'asteroids-path-admission',
        'Constrain asset, settings, replay, and score paths to approved roots and reject traversal, symlink, type, and size violations.',
        'Joining a trusted directory with a filename prevents path escape.'
      ),
      outcome(
        'asteroids-safe-serialization',
        'Use bounded validated data formats, reject unsafe object loading, write atomically, and recover without hiding corruption.',
        'Local pickle data is safe because only the player can edit it.'
      ),
      outcome(
        'asteroids-resource-defense',
        'Bound image dimensions, decoded memory, sound duration, file count, replay length, event volume, and diagnostic output.',
        'A small compressed file cannot exhaust local resources.'
      ),
      outcome(
        'asteroids-privacy-telemetry',
        'Minimize diagnostics, redact paths and identifiers, require informed opt-in for telemetry, and document retention and deletion.',
        'Anonymous crash logs never contain personal information.'
      ),
    ]
  ),
  gameModule(
    'asteroids-release-recovery-defense',
    'Playtest Closure, Release Gates, Rollback, Recovery, and Production Defense',
    'A polished demo becomes release by copying the latest executable; no one owns accessibility findings, performance budgets, package provenance, crash recovery, rollback, or support.',
    'production game release and defense dossier',
    [
      outcome(
        'asteroids-playtest-closure',
        'Trace each observed barrier or defect through cause, priority, repair, regression evidence, retest, disposition, and owner.',
        'Collecting positive playtest comments is sufficient launch evidence.'
      ),
      outcome(
        'asteroids-release-gates',
        'Gate an immutable identified artifact on correctness, replay, accessibility, performance, portability, security, licenses, and clean launch.',
        'If CI passes, the newest local executable is the release artifact.'
      ),
      outcome(
        'asteroids-crash-recovery',
        'Preserve bounded diagnostics and settings backups, recover corrupted local state safely, and provide accessible support instructions.',
        'Restarting the game is an adequate recovery plan for every failure.'
      ),
      outcome(
        'asteroids-rollback',
        'Retain verified prior artifacts and compatible save handling, rehearse downgrade boundaries, and define abort and restore decisions.',
        'Rebuilding an old Git tag produces a guaranteed identical rollback artifact.'
      ),
      outcome(
        'asteroids-production-defense',
        'Defend player value, game rules, determinism, accessibility, performance, portability, security, support, ownership, and residual risk together.',
        'A final high-score run proves production readiness.',
        'strategic',
        'create'
      ),
    ]
  ),
];

function source(title, url, version, scope) {
  return {
    title,
    authority: 'official-docs',
    url,
    version,
    reviewedAt: REVIEWED_AT,
    scope,
  };
}

const sources = [
  source(
    'Python 3.14.6 Documentation',
    'https://docs.python.org/3.14/',
    'Python 3.14.6 current 2026-07-14',
    'Language, data model, typing, dataclasses, randomness, testing, profiling, paths, files, and platform behavior.'
  ),
  source(
    'pygame-ce 2.5.7 Release',
    'https://github.com/pygame-community/pygame-ce/releases/tag/2.5.7',
    'Released 2.5.7 current 2026-07-14',
    'Python 3.10 through 3.14 support, wheel platforms, changes, fixes, and release identity.'
  ),
  source(
    'pygame-ce Package Index',
    'https://pypi.org/project/pygame-ce/',
    'pygame-ce 2.5.7 current 2026-07-14',
    'Released distributions, Python 3.14 wheels, package metadata, provenance, supported platforms, and installation identity.'
  ),
  source(
    'pygame-ce Documentation',
    'https://pyga.me/docs/',
    '2.5.8 documentation snapshot reviewed against released 2.5.7 APIs',
    'Initialization, display, events, surfaces, drawing, image, input, audio, time, sprites, masks, vectors, examples, and platform caveats.'
  ),
  source(
    'pygame-ce Event Queue',
    'https://pyga.me/docs/ref/event.html',
    'Documentation current 2026-07-14',
    'Queue limits, pumping, event attributes, custom events, focus, window, keyboard, mouse, joystick, and controller boundaries.'
  ),
  source(
    'pygame-ce Time and Clock',
    'https://pyga.me/docs/ref/time.html',
    'Documentation current 2026-07-14',
    'Milliseconds, timers, Clock tick behavior, frame limits, raw time, and accuracy limitations.'
  ),
  source(
    'pygame-ce Vector Mathematics',
    'https://pyga.me/docs/ref/math.html',
    'Documentation current 2026-07-14',
    'Vector2 operations, magnitude, normalization failures, rotation convention, interpolation, projection, reflection, and clamps.'
  ),
  source(
    'pygame-ce Display and Window',
    'https://pyga.me/docs/ref/display.html',
    'Documentation current 2026-07-14',
    'Display initialization, modes, resize, scaling, fullscreen, vsync caveats, presentation, and desktop boundaries.'
  ),
  source(
    'pygame-ce Surface, Draw, Transform, and Image',
    'https://pyga.me/docs/ref/surface.html',
    'Documentation current 2026-07-14',
    'Surface formats, alpha, conversion, blitting, locks, drawing, image loading, transformations, and resource behavior.'
  ),
  source(
    'pygame-ce Rect and FRect',
    'https://pyga.me/docs/ref/rect.html',
    'Documentation current 2026-07-14',
    'Integer and floating rectangles, coordinates, collision helpers, clipping, bounds, and mutation semantics.'
  ),
  source(
    'pygame-ce Sprites and Groups',
    'https://pyga.me/docs/ref/sprite.html',
    'Documentation current 2026-07-14',
    'Sprite lifecycle, Group update and draw, layered groups, kill semantics, group and mask collision helpers, and thread-safety caveats.'
  ),
  source(
    'pygame-ce Masks',
    'https://pyga.me/docs/ref/mask.html',
    'Documentation current 2026-07-14',
    'Bit masks, overlap and offset contracts, source surfaces, transforms, connected components, and cost boundaries.'
  ),
  source(
    'pygame-ce Mixer and Sound',
    'https://pyga.me/docs/ref/mixer.html',
    'Documentation current 2026-07-14',
    'Pre-initialization, buffer and format, channels, playback, volume, device behavior, and failure boundaries.'
  ),
  source(
    'pygame-ce Joystick and Controller',
    'https://pyga.me/docs/ref/joystick.html',
    'Documentation current 2026-07-14',
    'Device initialization, instance identity, axes, hats, buttons, events, hotplug, power, and rumble limits.'
  ),
  source(
    'Python Random Documentation',
    'https://docs.python.org/3.14/library/random.html',
    'Python 3.14.6 current 2026-07-14',
    'Generator state, seeds, deterministic pseudo-random sequences, distributions, and security non-guarantees.'
  ),
  source(
    'Python unittest Documentation',
    'https://docs.python.org/3.14/library/unittest.html',
    'Python 3.14.6 current 2026-07-14',
    'Fixtures, assertions, subtests, discovery, cleanup, command execution, and test result evidence.'
  ),
  source(
    'Python Profiling Documentation',
    'https://docs.python.org/3.14/library/profile.html',
    'Python 3.14.6 current 2026-07-14',
    'Deterministic profiling, stats, callers and callees, command-line profiling, and measurement interpretation.'
  ),
  source(
    'PyInstaller 6.21 Manual',
    'https://pyinstaller.org/en/v6.21.0/',
    'PyInstaller 6.21.0 current 2026-07-14',
    'Python 3.14 support, platform-native builds, analysis, data and binary inclusion, one-folder and one-file artifacts, debugging, and release limits.'
  ),
  source(
    'Python Packaging User Guide',
    'https://packaging.python.org/en/latest/',
    'PyPA guide current 2026-07-14',
    'Project metadata, dependency specifications, build artifacts, package data, virtual environments, installation, and distribution.'
  ),
  source(
    'Git 2.55 Documentation',
    'https://git-scm.com/docs',
    'Git 2.55 current 2026-07-14',
    'Repository status, revisions, diffs, tags, recovery, artifact identity, and release evidence.'
  ),
  source(
    'Xbox Accessibility Guidelines 3.2',
    'https://learn.microsoft.com/en-us/xbox/accessibility/guidelines',
    'XAG 3.2 current guidance reviewed 2026-07-14',
    'Text, contrast, multichannel cues, audio, input, difficulty, focus, timing, motion, photosensitivity, documentation, and testing guidance.'
  ),
  source(
    'WCAG 2.2 Recommendation',
    'https://www.w3.org/TR/WCAG22/',
    'W3C Recommendation current 2026-07-14',
    'Keyboard access, focus, reflow, target size, status, errors, audio control, timing, pause, animation, flashing, and no color-only meaning.'
  ),
  source(
    'ACM IEEE AAAI CS2023 Curriculum',
    'https://csed.acm.org/',
    'CS2023 reviewed 2026-07-14',
    'Recognized programming, software development, graphics, human-computer interaction, accessibility, testing, security, ethics, and professional outcomes.'
  ),
];

export const buildAsteroidsPythonConfig = finalizeCourse(
  {
    id: 'build-asteroids-python',
    competencyIdPrefix: 'asteroids-',
    title: 'Build and Ship Accessible Asteroids with Python 3.14 and pygame-ce 2.5.7',
    version: '2026.07',
    audience: {
      description:
        'Python and object-oriented programming learners who need to design, build, test, package, playtest, and defend a complete accessible real-time 2D game rather than copy a monolithic arcade tutorial.',
      entryKnowledge: [
        'Write and test Python functions and classes; use dataclasses, collections, loops, conditions, exceptions, imports, type hints, files, packages, and basic Git workflows.',
        'Reason about simple Cartesian coordinates, rates, elapsed time, and square roots; missing vector and game mathematics are taught from first principles in this course.',
      ],
      deviceConstraints: [
        'Modern browser; instant Python practice uses deterministic pure simulation models and fixed in-memory fixtures in an isolated Pyodide 3.14 worker. Real pygame-ce, SDL, windows, displays, controllers, audio devices, native files, installers, timing, GPUs, and packaged desktop releases remain explicit controlled transfer gates.',
      ],
      accessibilityAssumptions: [
        'Code, state, input traces, time steps, vectors, collision pairs, draw records, cue maps, settings, profiles, package records, and release evidence have structured text, explicit units and labels, keyboard operation, announced status, large targets, reduced motion, reflow, and no color-only meaning.',
      ],
    },
    scope: {
      includes: [
        'Python 3.14.6 and released pygame-ce 2.5.7; SDL boundaries; initialization and game loops; Vector2 and explicit units; variable and fixed time steps; events, held input, remapping, focus and controllers; scenes; ship physics; toroidal wrapping; responsive viewports; surfaces, draw order, transforms, and assets; projectiles; seeded asteroid geometry; layered collision detection and response; scoring, waves, safe spawns, and difficulty; sprites and groups; audio; accessible HUD and menus; deterministic replay and saves; pure-core architecture; unit, property, headless, render, and playtest evidence; performance; PyInstaller 6.21 packaging; local security and privacy; release, rollback, recovery, and production defense',
        'Runnable deterministic pure-Python evidence using original fixed fixtures plus explicit native pygame-ce, SDL, display, input, audio, asset, file, platform, profiler, package, accessibility playtest, performance, recovery, and release transfer gates',
        'Five cumulative authentic game deliveries and a performance-based unfamiliar-platform defense examination',
      ],
      excludes: [
        'Copied tutorial prose or code, proprietary Asteroids assets, browser claims about native Pygame behavior, inaccessible input or sensory assumptions, hidden test answers, arbitrary host execution, online multiplayer, 3D rendering, custom engine development, or production release based only on a playable happy path.',
      ],
      nextCourses: ['build-maze-solver-python', 'personal-project-1', 'python-dsa'],
    },
    sources,
    sharedRequirements: [
      'Every activity retrieves player goal, revision, Python and pygame-ce versions, explicit units, seed, input and time trace, state invariant, bounded entities and work, accessible multichannel feedback, changed-case tests, failure and recovery evidence, and explicit browser-versus-desktop limits before adding one game boundary.',
      'Browser Python uses original fixed in-memory fixtures and deterministic pure functions. It does not claim native pygame-ce, SDL, window, controller, mixer, asset, filesystem, GPU, frame-pacing, installer, or release behavior; those require controlled desktop evidence.',
      'Passing work requires a stable scenario and artifact identity, prediction, intermediate state evidence, at least one changed frame-rate, seam, input, collision, device, accessibility, or failure case, exact observable results, a test that detects a deliberate defect, and a named owner for remaining risk.',
    ],
    modules,
    projects: [
      project(
        'asteroids-loop-and-ship-prototype',
        'Accessible Input and Ship Prototype',
        'asteroids-ship-motion-physics',
        'A community arcade accessibility coordinator',
        'They need a versioned event-update-render loop with remappable keyboard and controller actions, focus-loss safety, explicit vector units, frame-rate-independent ship motion, pause, and text traces that make every critical state inspectable without relying on animation.',
        [
          'asteroids-runtime-choice',
          'asteroids-loop-phases',
          'asteroids-remapping',
          'asteroids-motion-units',
          'asteroids-ship-feel-evidence',
        ]
      ),
      project(
        'asteroids-playable-combat-slice',
        'Toroidal Combat and Collision Slice',
        'asteroids-collision-response-damage',
        'A small adaptive-game studio',
        'They need seam-safe wrapping, layered rendering, bounded projectiles, seeded readable asteroids, broad and narrow collision evidence, single response, fragments, lives, and multichannel damage feedback across changed frame rates.',
        [
          'asteroids-toroidal-wrap',
          'asteroids-draw-layers',
          'asteroids-projectile-lifetime',
          'asteroids-swept-seam-cases',
          'asteroids-single-resolution',
        ]
      ),
      project(
        'asteroids-accessible-progression',
        'Accessible Progression, Audio, and Interface',
        'asteroids-hud-menus-accessibility',
        'A mixed-input public game-night team',
        'They need reconciled score and waves, safe respawn, descriptive difficulty and assistance options, explicit sprite ownership, bounded audio channels, separate volume and mute, scalable text, visible focus, multichannel cues, pause, and reduced effects.',
        [
          'asteroids-score-ledger',
          'asteroids-difficulty-access',
          'asteroids-kill-cleanup',
          'asteroids-cue-alternatives',
          'asteroids-motion-photosensitivity',
        ]
      ),
      project(
        'asteroids-tested-release-candidate',
        'Deterministic Tested Cross-Platform Release Candidate',
        'asteroids-packaging-assets-platforms',
        'An internal Python game release engineer',
        'They need replayable simulation, versioned settings, a pure core, layered unit and headless SDL tests, representative profiles, licensed packaged assets, PyInstaller builds produced on each supported OS, and clean offline launch evidence.',
        [
          'asteroids-input-replay',
          'asteroids-pure-simulation',
          'asteroids-headless-sdl',
          'asteroids-performance-regression',
          'asteroids-platform-matrix',
        ]
      ),
      project(
        'asteroids-production-defense',
        'Asteroids Production and Recovery Defense',
        'asteroids-release-recovery-defense',
        'A joint player, accessibility, security, quality, performance, packaging, and support review board',
        'The board needs complete player-outcome evidence, barrier closure, bounded local data, immutable artifacts, accessibility and capacity gates, clean installs, staged release, corrupted-state recovery, rollback rehearsal, support ownership, and explicit residual-risk acceptance.',
        [
          'asteroids-acceptance-evidence',
          'asteroids-playtest-accessibility',
          'asteroids-safe-serialization',
          'asteroids-release-gates',
          'asteroids-production-defense',
        ]
      ),
    ],
    examContext:
      'Unfamiliar real-time game cases spanning player outcome, repository evidence, Python and pygame-ce runtime, SDL, vectors and units, clocks and fixed steps, input and devices, state machines, ship physics, wrapping and resize, rendering and assets, projectiles, seeded generation, collision detection and response, scoring and difficulty, sprite ownership, audio, accessible UI, replay and saves, architecture, testing, profiling, packaging, security, privacy, release, rollback, recovery, and residual-risk defense with explicit browser and desktop boundaries.',
    minimumQuestionBankSize: 760,
  },
  {
    researchedAt: RESEARCHED_AT,
    prerequisiteCourseIds: ['python-basics', 'python-oop'],
  }
);

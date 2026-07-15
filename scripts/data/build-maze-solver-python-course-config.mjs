import { finalizeCourse, project, skill } from './course-config-helpers.mjs';

const REVIEWED_AT = '2026-07-14';
const RESEARCHED_AT = '2026-07-15T12:00:00.000Z';

function outcome(id, statement, misconception, knowledgeType = 'procedural', level = 'apply') {
  if (!misconception) throw new Error(`Missing misconception for maze competency ${id}`);
  return skill(id, statement, misconception, knowledgeType, level);
}

function mazeModule(id, title, context, artifact, skills) {
  return {
    id,
    title,
    context,
    artifact,
    objectives: skills.slice(0, 3).map((entry) => entry[1]),
    skills,
    contexts: {
      theory: `${context} Predict the model, event, graph, solver, accessibility, failure, and evidence before reading the governing source.`,
      workshop: `A museum puzzle team incrementally builds ${artifact} from original seeded fixtures while retaining earlier Python, graph, determinism, accessibility, testing, performance, and recovery requirements.`,
      debug: `A preserved maze trace contains one plausible coordinate, wall, graph, search, event-loop, focus, render, persistence, package, or release defect; locate the first failed invariant before editing.`,
      lab: `An independent accessibility club receives a different grid, seed, algorithm, input profile, display scale, assistance need, platform, and failure condition and transfers ${title.toLowerCase()} into a changed ${artifact}.`,
      review: `A delayed puzzle review reconstructs ${title.toLowerCase()} from revision, configuration, seed, topology, frontier, predecessor map, state transition, draw record, accessibility report, profile, artifact, and recovery evidence.`,
      quiz: `A release reviewer compares near-miss decisions for ${title.toLowerCase()} and accepts only runnable changed-case evidence, explicit limitations, and named browser, Tcl, Tk, display, input, assistive-technology, file, package, and production transfer gates.`,
    },
  };
}

const modules = [
  mazeModule(
    'maze-outcomes-repo-accessibility',
    'Maze Product Outcomes, Repository Baseline, Accessibility, and Evidence',
    'A team says “build a maze solver” without defining the player task, puzzle rules, assistance, supported input, repository state, or proof of success.',
    'player, repository, accessibility, and evidence charter',
    [
      outcome(
        'maze-player-outcome',
        'Define player, task, puzzle rules, success, failure, session length, and observable value before selecting algorithms.',
        'A window containing a grid is a complete player outcome.',
        'strategic',
        'create'
      ),
      outcome(
        'maze-repository-baseline',
        'Inspect revision, status, environment, dependencies, licenses, existing tests, and recovery anchors before changing the project.',
        'A small learning project does not need repository or dependency evidence.'
      ),
      outcome(
        'maze-accessibility-charter',
        'Record keyboard, pointer, vision, color, motion, timing, cognition, text, and assistive-technology needs as design inputs.',
        'Accessibility can be added after the maze looks attractive.',
        'professional',
        'create'
      ),
      outcome(
        'maze-acceptance-evidence',
        'Separate pure-model, algorithm, Tcl interpreter, Tk widget, display, input, accessibility, package, and player evidence.',
        'A solved screenshot proves correctness and usability.',
        'metacognitive',
        'evaluate'
      ),
      outcome(
        'maze-scope-transfer',
        'State which claims browser models can establish and which require a controlled native desktop transfer.',
        'Pyodide behavior proves Tkinter behavior on every desktop.',
        'metacognitive',
        'evaluate'
      ),
    ]
  ),
  mazeModule(
    'maze-runtime-tk-event-loop',
    'Python, Tcl, Tkinter, Threads, and the Event Loop',
    'The interface creates multiple roots, blocks callbacks with work, calls widgets from an arbitrary thread, and exits with scheduled callbacks still alive.',
    'single-root event-loop lifecycle contract',
    [
      outcome(
        'maze-python-tcl-tk-layers',
        'Trace Python calls through tkinter into one Tcl interpreter and the Tk widget toolkit with recorded patch levels.',
        'Tkinter is a Python-drawn GUI with no Tcl runtime boundary.'
      ),
      outcome(
        'maze-single-root-mainloop',
        'Create one application root, initialize state before mainloop, and shut down widgets and callbacks deliberately.',
        'Every dialog should create its own independent Tk root.'
      ),
      outcome(
        'maze-cooperative-events',
        'Keep event handlers short and divide long generation or search work into bounded event-loop turns.',
        'A long callback is harmless because the interface has a mainloop.'
      ),
      outcome(
        'maze-thread-boundary',
        'Explain tkinter thread routing and keep UI mutation on the owning event-loop path.',
        'Any Python thread can safely update a widget directly.'
      ),
      outcome(
        'maze-runtime-evidence',
        'Record Python, Tcl, Tk, operating system, display, scaling, and startup or shutdown evidence without overgeneralizing.',
        'One successful launch proves every platform configuration.'
      ),
    ]
  ),
  mazeModule(
    'maze-grid-coordinate-model',
    'Grid Identity, Coordinates, Geometry, and Units',
    'Rows and columns are mixed with pixels, the y-axis is assumed to point upward, resize changes cell identity, and rounding leaves gaps.',
    'typed logical-grid and viewport geometry model',
    [
      outcome(
        'maze-cell-identity',
        'Represent stable row-column identity separately from storage offset, graph vertex, pixel rectangle, and display label.',
        'A pixel coordinate is a stable cell identifier.'
      ),
      outcome(
        'maze-coordinate-conversion',
        'Convert between row-column, linear index, logical point, and Canvas coordinates with explicit origins and axis direction.',
        'Cartesian and Canvas y coordinates increase in the same direction.'
      ),
      outcome(
        'maze-geometry-units',
        'Name cells, pixels, logical units, scale factors, padding, and line widths in every geometry formula.',
        'Numbers used in geometry are interchangeable when magnitudes look plausible.'
      ),
      outcome(
        'maze-cell-bounds',
        'Derive half-open cell bounds and shared edges so every viewport point has an intentional ownership rule.',
        'Independent rounding of every corner cannot create gaps or overlaps.'
      ),
      outcome(
        'maze-geometry-properties',
        'Test round trips, adjacency, boundary ownership, positive sizes, and changed viewport dimensions.',
        'Checking the four corner cells is enough geometry evidence.'
      ),
    ]
  ),
  mazeModule(
    'maze-wall-cell-invariants',
    'Cells, Walls, Passages, Boundaries, and Invariants',
    'One cell opens east while its neighbor stays closed west, boundary walls disappear, and rendering data becomes the maze source of truth.',
    'reciprocal wall and passage model',
    [
      outcome(
        'maze-wall-representation',
        'Represent north, east, south, and west walls or passage edges with one documented ownership policy.',
        'Four unrelated booleans cannot contradict each other.'
      ),
      outcome(
        'maze-reciprocal-passage',
        'Carve a passage as one atomic reciprocal update between adjacent cells.',
        'Changing the current cell wall is sufficient to connect two cells.'
      ),
      outcome(
        'maze-boundary-invariant',
        'Preserve outer-boundary rules while supporting explicit entrance and exit exceptions.',
        'A perfect maze must keep every outside edge closed.'
      ),
      outcome(
        'maze-model-view-separation',
        'Keep maze topology independent from Canvas item identifiers, colors, widths, and animation state.',
        'The lines currently visible on Canvas are the simplest maze model.'
      ),
      outcome(
        'maze-topology-validation',
        'Reconcile cell count, neighbor pairs, reciprocal openings, boundary exceptions, and illegal diagonal links.',
        'A maze that renders symmetrically has valid topology.'
      ),
    ]
  ),
  mazeModule(
    'maze-canvas-rendering-tags',
    'Canvas Items, Tags, Layers, Rendering, and Redraw',
    'Redraw duplicates thousands of line items, solver marks cover walls, stale IDs are mutated, and hit testing scans every object.',
    'tagged layered Canvas render plan',
    [
      outcome(
        'maze-canvas-item-model',
        'Distinguish retained Canvas items, integer IDs, tags, configuration, coordinates, stacking order, and deletion.',
        'Canvas draw calls disappear after presentation like immediate-mode graphics.'
      ),
      outcome(
        'maze-render-layers',
        'Define wall, terrain, solution, focus, annotation, and status layers with stable stacking rules.',
        'Creation order will remain obvious as the interface grows.'
      ),
      outcome(
        'maze-tag-addressing',
        'Use semantic tags for groups and stable model keys rather than retaining fragile positional ID lists.',
        'A list index always identifies the same Canvas item after redraw.'
      ),
      outcome(
        'maze-diff-redraw',
        'Choose full, regional, or item-diff redraw from measured complexity while preventing duplicate artifacts.',
        'Redrawing everything on every step is always the safest strategy.'
      ),
      outcome(
        'maze-render-evidence',
        'Verify item counts, coordinates, tags, layer order, changed topology, and native screenshot or inspection evidence separately.',
        'A screenshot can prove hidden item identity and cleanup.'
      ),
    ]
  ),
  mazeModule(
    'maze-layout-resize-scaling',
    'Layout Managers, Resize, Scaling, High DPI, and Reflow',
    'The Canvas has fixed pixels, controls vanish on a small window, pack and grid conflict in one parent, and high-DPI text clips.',
    'responsive desktop layout and resize policy',
    [
      outcome(
        'maze-layout-manager-scope',
        'Use one geometry manager per parent and configure grid weights, sticky behavior, minimum sizes, and padding intentionally.',
        'Mixing pack and grid anywhere in one application is forbidden.'
      ),
      outcome(
        'maze-responsive-cell-size',
        'Derive cell size and offsets from current available space, grid dimensions, minimum target, and aspect policy.',
        'A single fixed cell size is responsive if the window is resizable.'
      ),
      outcome(
        'maze-configure-debounce',
        'Handle configure events with bounded coalescing and redraw only from committed current dimensions.',
        'Every intermediate resize event requires an immediate full redraw.'
      ),
      outcome(
        'maze-display-scaling',
        'Test Tk scaling, font metrics, line widths, focus indicators, and platform display settings instead of assuming raw pixels.',
        'High DPI only affects image assets.'
      ),
      outcome(
        'maze-small-window-recovery',
        'Provide a usable minimum, scroll or alternate representation, and reversible recovery when the visual grid cannot fit.',
        'Clipping controls is acceptable for unusually small windows.'
      ),
    ]
  ),
  mazeModule(
    'maze-input-focus-bindings',
    'Input Actions, Bindings, Focus, and Keyboard Equivalence',
    'Canvas clicks are the only navigation method, global key bindings fire inside text fields, focus becomes invisible, and repeat events race state changes.',
    'remappable action and focus-navigation map',
    [
      outcome(
        'maze-action-abstraction',
        'Map keys, pointer gestures, buttons, and assistive commands onto named actions separated from solver state changes.',
        'Each device event should directly mutate maze state.'
      ),
      outcome(
        'maze-bind-scope-order',
        'Choose widget, class, toplevel, tag, and bindtag scope while preserving expected default behavior.',
        'bind always appends a handler without affecting existing bindings.'
      ),
      outcome(
        'maze-focus-order',
        'Provide logical focus order, programmatic focus placement, visible focus, escape paths, and focus restoration after dialogs.',
        'Canvas keyboard control works whenever the mouse is over it.'
      ),
      outcome(
        'maze-input-equivalence',
        'Give pointer-only operations keyboard or single-action alternatives without imposing holds, repeats, or precise timing.',
        'A clickable cell is accessible because every desktop has a mouse.'
      ),
      outcome(
        'maze-input-trace',
        'Record action, source, focus owner, prior state, accepted transition, feedback, and changed binding evidence.',
        'A keypress log alone proves the intended action occurred.'
      ),
    ]
  ),
  mazeModule(
    'maze-graph-topology',
    'Maze Graphs, Connectivity, Cycles, Components, and Trees',
    'The solver treats walls as edges, generation visits display objects, disconnected cells are hidden, and tree claims rely on appearance.',
    'validated maze graph adapter',
    [
      outcome(
        'maze-graph-mapping',
        'Map each cell to a vertex and each reciprocal open passage to an undirected edge without leaking render state.',
        'Every neighboring cell pair is a graph edge even when a wall separates them.'
      ),
      outcome(
        'maze-connectivity',
        'Use traversal evidence to count connected components and produce a witness for an unreachable cell.',
        'An entrance and exit path proves every cell is connected.'
      ),
      outcome(
        'maze-cycle-evidence',
        'Detect or construct a cycle witness rather than infer cycles from edge count alone on an unvalidated graph.',
        'Any graph with vertex count minus one edges is a tree.'
      ),
      outcome(
        'maze-tree-invariants',
        'Establish connectedness plus acyclicity or the equivalent finite undirected edge condition before calling a maze perfect.',
        'Perfect means visually difficult rather than graph-theoretically unique-path.'
      ),
      outcome(
        'maze-graph-complexity',
        'State vertices, edges, representation, traversal work, memory, and grid-specific bounds.',
        'Algorithm complexity can be reported without defining graph representation.'
      ),
    ]
  ),
  mazeModule(
    'maze-generation-backtracker',
    'Seeded Recursive Backtracking Generation',
    'Generation chooses visited neighbors, recursive depth overflows silently, random state is global, and completion is confused with connectivity.',
    'seeded iterative and recursive backtracker',
    [
      outcome(
        'maze-backtracker-invariant',
        'Maintain a current cell, visited set, frontier stack or call path, reciprocal passages, and a progress invariant.',
        'Randomly removing walls eventually creates a valid maze.'
      ),
      outcome(
        'maze-unvisited-neighbors',
        'Enumerate in-bounds unvisited neighbors before randomized selection and retain deterministic ordering before shuffling.',
        'A set iteration order plus a seed is reproducible.'
      ),
      outcome(
        'maze-seed-ownership',
        'Inject and record a dedicated random generator and seed without contaminating global random state.',
        'Calling seed once makes every future run independently reproducible.'
      ),
      outcome(
        'maze-recursive-iterative-tradeoff',
        'Compare recursive and explicit-stack backtracking for clarity, depth, pause, serialization, and failure behavior.',
        'Recursion is the algorithm while a stack would change its result.'
      ),
      outcome(
        'maze-generation-validation',
        'Verify all cells visited, edge count, reciprocal walls, connectivity, acyclicity, seed replay, and changed dimensions.',
        'Reaching the initial cell again proves generation completed correctly.'
      ),
    ]
  ),
  mazeModule(
    'maze-generation-alternatives-bias',
    'Prim, Kruskal, Wilson, Bias, and Distribution Claims',
    'Algorithms are judged from one attractive screenshot, “random” is called uniform, and difficulty is inferred from generation time.',
    'comparative seeded generation laboratory',
    [
      outcome(
        'maze-randomized-prim',
        'Generate a spanning tree from a randomized frontier while preventing duplicate or stale frontier choices.',
        'Randomized Prim is the same procedure and distribution as depth-first backtracking.'
      ),
      outcome(
        'maze-randomized-kruskal',
        'Shuffle candidate walls and use disjoint sets to admit only edges joining different components.',
        'Kruskal needs to check graph connectivity after every accepted wall.'
      ),
      outcome(
        'maze-wilson-loop-erasure',
        'Construct a uniform spanning tree with loop-erased random walks and state termination assumptions.',
        'Every randomized spanning-tree algorithm samples trees uniformly.'
      ),
      outcome(
        'maze-bias-metrics',
        'Measure corridor length, turns, dead ends, path stretch, branching, and distributions across many recorded seeds.',
        'One maze screenshot establishes algorithm bias and player difficulty.'
      ),
      outcome(
        'maze-generator-selection',
        'Select a generator from player, performance, reproducibility, topology, and accessibility goals with explicit non-guarantees.',
        'The fastest generator is automatically the best game design.'
      ),
    ]
  ),
  mazeModule(
    'maze-dfs-solver-recursion',
    'Depth-First Search, Recursion, Paths, and Backtracking',
    'DFS marks on return, confuses visitation with solution path, fails to undo dead ends, and promises shortest routes.',
    'traceable DFS solver with path witness',
    [
      outcome(
        'maze-dfs-contract',
        'Define start, goal, passable-neighbor order, visited policy, result, and failure contract before traversal.',
        'DFS behavior is fully defined by saying search recursively.'
      ),
      outcome(
        'maze-dfs-visit-timing',
        'Mark a vertex when discovered so cycles and converging paths cannot schedule repeated work.',
        'Marking only after exploring a cell is equivalent on every maze.'
      ),
      outcome(
        'maze-dfs-path-reconstruction',
        'Separate explored vertices, active route, rejected branches, and final start-to-goal witness.',
        'The visited set is the solution path.'
      ),
      outcome(
        'maze-dfs-recursion-limits',
        'Bound or replace recursion for deep mazes and report failure without leaving partial UI state.',
        'Grid size alone guarantees recursion will remain safe.'
      ),
      outcome(
        'maze-dfs-evidence',
        'Verify valid adjacent steps, no wall crossing, correct endpoints, termination, unsolvable behavior, and non-optimality limits.',
        'Finding any path proves a shortest path.'
      ),
    ]
  ),
  mazeModule(
    'maze-bfs-shortest-path',
    'Breadth-First Search, Queues, and Unweighted Shortest Paths',
    'The queue uses slow front deletion, predecessors change after discovery, distances mix cells and pixels, and shortest is claimed on weighted edges.',
    'deque-based shortest-path solver',
    [
      outcome(
        'maze-bfs-layer-invariant',
        'Maintain a FIFO frontier whose discovered distances advance in nondecreasing edge count.',
        'BFS is DFS with a different variable name.'
      ),
      outcome(
        'maze-deque-frontier',
        'Use deque append and popleft with explicit membership state and bounded duplicate work.',
        'Removing index zero from a list has constant cost.'
      ),
      outcome(
        'maze-bfs-predecessors',
        'Assign distance and predecessor at first discovery and reconstruct a valid route after reaching the goal.',
        'A predecessor may be replaced freely without changing shortest-path proof.'
      ),
      outcome(
        'maze-unweighted-optimality',
        'Explain why BFS minimizes edge count only when every admitted passage has equal cost.',
        'BFS always finds the cheapest route through any maze.'
      ),
      outcome(
        'maze-bfs-changed-cases',
        'Compare reachable, unreachable, start-equals-goal, multiple-shortest-path, cyclic, and changed-neighbor-order cases.',
        'One perfect maze is enough to test BFS.'
      ),
    ]
  ),
  mazeModule(
    'maze-weighted-dijkstra-astar',
    'Weighted Mazes, Dijkstra, Heaps, and A*',
    'The heuristic overestimates, heap priorities are mutated in place, stale entries finalize wrong costs, and geometric distance ignores movement rules.',
    'weighted Dijkstra and A-star comparison engine',
    [
      outcome(
        'maze-weight-contract',
        'Define nonnegative passage costs, units, blocked edges, accumulated route cost, and the player meaning of weight.',
        'Adding decorative terrain colors creates a weighted graph automatically.'
      ),
      outcome(
        'maze-dijkstra-relaxation',
        'Relax an edge only through a lower tentative cost and finalize vertices under the nonnegative-weight contract.',
        'Dijkstra can safely handle negative passage costs.'
      ),
      outcome(
        'maze-heap-stale-entries',
        'Push improved priorities and reject stale heap entries by comparing popped and recorded costs.',
        'heapq updates the priority of an existing tuple automatically.'
      ),
      outcome(
        'maze-astar-heuristic',
        'Choose and scale an admissible, consistent heuristic for the actual movement and cost model.',
        'Manhattan distance is valid regardless of diagonal moves or minimum edge cost.'
      ),
      outcome(
        'maze-weighted-evidence',
        'Compare route validity, total cost, expansions, frontier peak, heuristic zero case, unreachable case, and changed weights.',
        'Fewer expanded cells proves A-star returned the optimal route.'
      ),
    ]
  ),
  mazeModule(
    'maze-solver-evidence-comparison',
    'Correctness, Completeness, Optimality, Metrics, and Selection',
    'A solver wins from one timing, path length is compared across different mazes, and explored-cell animation is mistaken for useful work.',
    'solver benchmark and decision report',
    [
      outcome(
        'maze-correctness-witness',
        'Validate endpoints, adjacency, passability, uniqueness policy, and reported cost against an independent route checker.',
        'A solver returning true is self-authenticating evidence.'
      ),
      outcome(
        'maze-completeness-claim',
        'State the finite graph and resource assumptions under which a solver will find a path if one exists.',
        'Every search implementation is complete because the maze is finite.'
      ),
      outcome(
        'maze-optimality-claim',
        'Tie shortest or least-cost claims to edge weights, heuristic properties, termination rule, and verified route cost.',
        'The first goal added to a frontier always establishes optimality.'
      ),
      outcome(
        'maze-benchmark-design',
        'Compare algorithms on identical recorded mazes with warm-up, repeated trials, separated generation time, and distributions.',
        'One elapsed-time measurement ranks algorithms reliably.'
      ),
      outcome(
        'maze-solver-selection',
        'Choose DFS, BFS, Dijkstra, or A-star from task, graph, evidence, latency, memory, pedagogy, and accessibility needs.',
        'There is one universally best maze solver.'
      ),
    ]
  ),
  mazeModule(
    'maze-animation-after-cancel',
    'Animation Steps, after, Pause, Speed, and Cancellation',
    'The solver sleeps inside a callback, recursively calls update, schedules duplicate timers, and reset leaves old animation mutating new state.',
    'cancellable event-loop animation scheduler',
    [
      outcome(
        'maze-step-generator',
        'Expose generation and solving as bounded state transitions or iterator steps independent from presentation timing.',
        'An algorithm must know animation delay to be visualized.'
      ),
      outcome(
        'maze-after-scheduling',
        'Schedule one future callback with after and retain its identifier and owning run generation.',
        'after(delay, callback) blocks until the callback completes.'
      ),
      outcome(
        'maze-pause-resume-speed',
        'Pause without losing algorithm state, resume once, and apply changed speed to future turns predictably.',
        'Changing a speed variable updates callbacks already queued.'
      ),
      outcome(
        'maze-cancel-stale-work',
        'Cancel pending callbacks and reject late work using a run token during reset, close, or new generation.',
        'Destroying visible items prevents stale callbacks from running.'
      ),
      outcome(
        'maze-animation-evidence',
        'Verify callback count, state order, pause stability, changed delay, cancellation, close behavior, and native event timing.',
        'A smooth recording proves callback ownership and cancellation.'
      ),
    ]
  ),
  mazeModule(
    'maze-state-machine-controls',
    'Application State Machine, Commands, and Recovery',
    'Solve can run during generation, pause is a boolean with ambiguous meaning, controls disagree with state, and errors leave the app unusable.',
    'explicit application transition table',
    [
      outcome(
        'maze-state-enumeration',
        'Define idle, generating, ready, solving, paused, completed, cancelled, failed, and closing states with owned data.',
        'Two booleans can represent every meaningful application state clearly.'
      ),
      outcome(
        'maze-transition-table',
        'Admit commands through an explicit current-state transition table with effects and rejection feedback.',
        'Disabling buttons is enough to prevent invalid programmatic transitions.'
      ),
      outcome(
        'maze-control-projection',
        'Derive enabled controls, labels, focus targets, status, and progress from state rather than mutating them independently.',
        'Each callback should configure whichever controls it remembers.'
      ),
      outcome(
        'maze-failure-recovery',
        'Move failures into a stable state with causal diagnostics, preserved evidence, safe cleanup, and a recovery command.',
        'Unexpected errors should terminate the desktop process immediately.'
      ),
      outcome(
        'maze-transition-testing',
        'Cover every allowed and rejected edge, repeated command, cancellation race, failure, and close transition.',
        'Testing the happy path visits every meaningful state.'
      ),
    ]
  ),
  mazeModule(
    'maze-architecture-pure-core',
    'Pure Core, UI Adapters, Dependency Direction, and Snapshots',
    'Cells call Canvas methods, algorithms read widgets, tests require a display, and mutable state leaks across attempts.',
    'pure maze core with Tk adapter ports',
    [
      outcome(
        'maze-domain-core',
        'Keep topology, generation, search, state transitions, and evidence free of Tk widget and operating-system dependencies.',
        'A GUI project cannot have a pure domain model.'
      ),
      outcome(
        'maze-ui-ports',
        'Define narrow render, scheduling, input, status, dialog, persistence, and clock ports owned by the application layer.',
        'Passing the root object everywhere is simpler than interfaces.'
      ),
      outcome(
        'maze-immutable-snapshot',
        'Publish immutable or copied snapshots so rendering and tests cannot mutate authoritative state accidentally.',
        'A frozen dataclass makes every nested collection immutable.'
      ),
      outcome(
        'maze-command-event-flow',
        'Translate input into commands, domain transitions into events, and events into adapter effects without cycles.',
        'Widgets should call each other directly to keep latency low.'
      ),
      outcome(
        'maze-architecture-evidence',
        'Demonstrate pure-core tests, fake adapters, dependency inspection, native adapter smoke, and changed implementation evidence.',
        'A class diagram proves runtime dependency direction.'
      ),
    ]
  ),
  mazeModule(
    'maze-accessible-interface',
    'Accessible Puzzle Interface and Multichannel Feedback',
    'Walls, visited cells, current focus, route, and errors are communicated only by color and animation, while the Canvas has no usable alternative.',
    'keyboard-first visual and structured-text maze interface',
    [
      outcome(
        'maze-text-alternative',
        'Provide a synchronized structured-text grid, route or step list, coordinates, and status that convey essential puzzle state.',
        'A short Canvas description is an equivalent alternative for an interactive maze.'
      ),
      outcome(
        'maze-multichannel-cues',
        'Communicate wall, focus, visited, frontier, route, success, and error through redundant text, shape, pattern, position, and optional sound.',
        'High-contrast red and green are sufficient distinct cues.'
      ),
      outcome(
        'maze-accessible-controls',
        'Provide keyboard navigation, remapping, visible focus, large targets, clear labels, no traps, and announced state changes.',
        'Native Tk widgets are automatically accessible in every composition.'
      ),
      outcome(
        'maze-motion-timing-assistance',
        'Offer pause, instant mode, adjustable speed, reduced motion, hints, route reveal, and difficulty dimensions without penalty.',
        'Animation speed and maze size are the same difficulty setting.'
      ),
      outcome(
        'maze-accessibility-evidence',
        'Combine automated checks with keyboard, zoom, scaling, contrast, screen-reader, switch-like input, and disability-led playtest evidence.',
        'WCAG-oriented code inspection alone proves the desktop puzzle is accessible.'
      ),
    ]
  ),
  mazeModule(
    'maze-determinism-replay-save',
    'Seeds, Replay, Settings, Save Data, and Migration',
    'A seed is saved without algorithm version, action times drive logic, JSON fields are trusted, and corrupted data erases the previous session.',
    'versioned replay and safe-state schema',
    [
      outcome(
        'maze-replay-identity',
        'Record generator and solver versions, seed, dimensions, policies, assistance, action sequence, and deterministic state identity.',
        'Saving only the random seed reproduces every future maze session.'
      ),
      outcome(
        'maze-action-replay',
        'Replay logical commands and algorithm steps independently from wall-clock animation timing.',
        'Recorded callback timestamps are the authoritative game logic.'
      ),
      outcome(
        'maze-json-schema',
        'Validate version, types, bounds, enums, lengths, unknown fields, and cross-field invariants before constructing state.',
        'json.loads returns trustworthy application objects.'
      ),
      outcome(
        'maze-save-atomicity',
        'Write or replace state through a controlled adapter that preserves the last known good save on failure.',
        'Writing directly over the only save is adequate for local software.'
      ),
      outcome(
        'maze-state-migration',
        'Migrate supported versions explicitly, reject unsupported or corrupted data safely, and retain recovery evidence.',
        'Adding defaults silently makes every old save compatible.'
      ),
    ]
  ),
  mazeModule(
    'maze-testing-properties-headless',
    'Unit, Property, Mutation, Headless, GUI, and Play Tests',
    'Tests assert internal lists, fake a green result, require the developer display, and never prove a deliberate defect is detected.',
    'layered maze verification suite',
    [
      outcome(
        'maze-test-layers',
        'Separate pure unit, property, mutation, integration, Tcl, Tk widget, display, accessibility, package, and player tests.',
        'A headless Tk test replaces real display and assistive-technology testing.'
      ),
      outcome(
        'maze-property-tests',
        'Generate bounded grids and assert reciprocal walls, connectivity, tree rules, route validity, cost, determinism, and state invariants.',
        'Many random examples prove an invariant without an independent oracle.'
      ),
      outcome(
        'maze-mutation-evidence',
        'Introduce deliberate wall, queue, heuristic, cancellation, focus, and schema defects and prove named tests fail causally.',
        'Passing tests demonstrate they would catch a realistic regression.'
      ),
      outcome(
        'maze-headless-boundaries',
        'Use pure fakes and Tcl-only checks where valid, then run Tk and display tests under a controlled platform matrix.',
        'Creating Tcl without Tk proves Canvas, focus, fonts, and bindings.'
      ),
      outcome(
        'maze-playtest-protocol',
        'Define representative tasks, accommodations, observation boundaries, barrier severity, consent, privacy, and closure evidence.',
        'Watching one developer solve a maze is a learner usability study.'
      ),
    ]
  ),
  mazeModule(
    'maze-performance-profiling',
    'Complexity, Profiling, Rendering Budgets, and Responsiveness',
    'Optimization starts from intuition, solver and drawing time are combined, huge mazes freeze the event loop, and average latency hides stalls.',
    'representative performance and responsiveness report',
    [
      outcome(
        'maze-complexity-model',
        'Derive time and space from cells, passages, frontier, item count, algorithm, and representation before measuring.',
        'Every grid algorithm is linear because the screen is two-dimensional.'
      ),
      outcome(
        'maze-profile-separation',
        'Measure generation, solving, state conversion, drawing, callback delay, startup, save, and package behavior separately.',
        'One end-to-end timer identifies the bottleneck.'
      ),
      outcome(
        'maze-event-latency-budget',
        'Define response, animation, cancellation, and redraw budgets and report percentiles or worst representative stalls.',
        'High average frame rate guarantees responsive controls.'
      ),
      outcome(
        'maze-render-optimization',
        'Reduce item churn, batch or diff changes, bound annotations, and retest visual and accessibility correctness.',
        'A faster Canvas item count is automatically equivalent output.'
      ),
      outcome(
        'maze-capacity-defense',
        'Set supported grid and action limits, reject excess early, compare representative devices, and name residual risks.',
        'If a large maze eventually completes it is supported.'
      ),
    ]
  ),
  mazeModule(
    'maze-packaging-platforms',
    'Project Metadata, Resources, PyInstaller, and Platform Builds',
    'A one-file artifact is copied across operating systems, Tcl/Tk data is assumed present, assets depend on the working directory, and only the build machine launches it.',
    'platform-native signed-off release artifact matrix',
    [
      outcome(
        'maze-pyproject-entrypoint',
        'Define package layout, metadata, Python requirement, dependencies, console or GUI entry point, and import-safe startup.',
        'A desktop script needs no package metadata or entry point.'
      ),
      outcome(
        'maze-resource-access',
        'Load licensed package resources without assuming source checkout or current working directory layout.',
        'Relative paths beside the source file work unchanged in every bundle.'
      ),
      outcome(
        'maze-pyinstaller-analysis',
        'Inspect PyInstaller analysis, tkinter hooks, Tcl/Tk libraries and data, hidden imports, warnings, and artifact contents.',
        'PyInstaller success proves every runtime dependency was discovered.'
      ),
      outcome(
        'maze-platform-native-build',
        'Produce and test separate artifacts on each supported operating system and architecture with recorded toolchains.',
        'PyInstaller cross-compiles portable desktop executables from one host.'
      ),
      outcome(
        'maze-clean-install-smoke',
        'Launch from a clean user account or machine, exercise create-solve-save-recover-close, and retain artifact identity and diagnostics.',
        'Running from the dist directory on the build host is a clean-install test.'
      ),
    ]
  ),
  mazeModule(
    'maze-security-local-files',
    'Local Input Security, Resource Limits, Privacy, and Diagnostics',
    'Imported mazes allocate from untrusted dimensions, pickle is accepted, paths escape their root, and logs retain player data indefinitely.',
    'bounded local-data threat model and controls',
    [
      outcome(
        'maze-local-threat-model',
        'Identify untrusted files, dimensions, strings, paths, package resources, environment state, logs, and denial-of-service consequences.',
        'Offline desktop software has no meaningful attack surface.'
      ),
      outcome(
        'maze-safe-serialization',
        'Use bounded data-only formats and reject pickle or executable object reconstruction for untrusted saves.',
        'A local pickle is safe because the learner created the file.'
      ),
      outcome(
        'maze-input-resource-limits',
        'Validate dimensions, cell counts, edge counts, nesting, string length, numeric ranges, and total work before allocation.',
        'Catching MemoryError is a sufficient size policy.'
      ),
      outcome(
        'maze-path-resource-trust',
        'Keep imported data and package resources within explicit authorities and avoid user-controlled executable lookup.',
        'Joining a chosen filename to a safe directory prevents every escape.'
      ),
      outcome(
        'maze-privacy-diagnostics',
        'Collect minimal redacted diagnostics with consent, bounded retention, export control, and deletion while preserving causal evidence.',
        'Verbose logs are harmless because they stay on the same computer.'
      ),
    ]
  ),
  mazeModule(
    'maze-release-recovery-defense',
    'Release Gates, Migration, Recovery, Support, and Defense',
    'The team ships from generated volume, closes no playtest barriers, cannot identify an artifact, and treats reinstall as the recovery plan.',
    'production release, rollback, and residual-risk defense',
    [
      outcome(
        'maze-release-gates',
        'Require schema, order, duplication, source, model, algorithm, native GUI, accessibility, performance, security, package, and learner-flow gates.',
        'Thousands of generated learning steps establish release readiness.',
        'professional',
        'evaluate'
      ),
      outcome(
        'maze-migration-compatibility',
        'Compare behavior, saves, settings, key maps, artifacts, and accessibility across upgrades with rollback-safe migrations.',
        'A new version only needs to open its own newly created state.'
      ),
      outcome(
        'maze-recovery-rehearsal',
        'Rehearse corrupted state, cancelled work, missing resources, display failure, bad release, rollback, and last-good restoration.',
        'Restarting the program is adequate recovery evidence.'
      ),
      outcome(
        'maze-support-ownership',
        'Publish accessible controls, known limitations, diagnostics, safe reset, data location, support path, and accountable owners.',
        'Self-explanatory software needs no support documentation.'
      ),
      outcome(
        'maze-production-defense',
        'Defend player value, algorithms, accessibility, correctness, performance, security, packaging, recovery, and residual risk together.',
        'A correct solver is sufficient evidence for a production learning project.',
        'strategic',
        'create'
      ),
    ]
  ),
];

function source(title, url, version, scope) {
  return { title, authority: 'official-docs', url, version, reviewedAt: REVIEWED_AT, scope };
}

const sources = [
  source(
    'Python 3.14.6 Documentation',
    'https://docs.python.org/3.14/',
    'Python 3.14.6 current 2026-07-14',
    'Language, data model, typing, exceptions, iterators, dataclasses, testing, profiling, packaging boundaries, and platform behavior.'
  ),
  source(
    'Python tkinter Documentation',
    'https://docs.python.org/3.14/library/tkinter.html',
    'Python 3.14.6 current 2026-07-14',
    'Tcl and Tk architecture, event loop, threading model, widget lifecycle, version evidence, and native boundaries.'
  ),
  source(
    'Python tkinter.ttk Documentation',
    'https://docs.python.org/3.14/library/tkinter.ttk.html',
    'Python 3.14.6 current 2026-07-14',
    'Themed widgets, states, styles, focus, layout, and platform-native presentation boundaries.'
  ),
  source(
    'Python collections Documentation',
    'https://docs.python.org/3.14/library/collections.html',
    'Python 3.14.6 current 2026-07-14',
    'deque semantics and efficient FIFO frontier operations.'
  ),
  source(
    'Python heapq Documentation',
    'https://docs.python.org/3.14/library/heapq.html',
    'Python 3.14.6 current 2026-07-14',
    'Priority queues, tuple ordering, stale-entry patterns, and heap complexity.'
  ),
  source(
    'Python random Documentation',
    'https://docs.python.org/3.14/library/random.html',
    'Python 3.14.6 current 2026-07-14',
    'Dedicated generators, seeds, reproducibility limits, state, and non-cryptographic behavior.'
  ),
  source(
    'Python json Documentation',
    'https://docs.python.org/3.14/library/json.html',
    'Python 3.14.6 current 2026-07-14',
    'Data serialization, parser limits, type boundaries, repeated names, numeric behavior, and untrusted-input cautions.'
  ),
  source(
    'Python unittest Documentation',
    'https://docs.python.org/3.14/library/unittest.html',
    'Python 3.14.6 current 2026-07-14',
    'Fixtures, subtests, mocks, cleanup, failure evidence, and layered verification.'
  ),
  source(
    'Python Profiling Documentation',
    'https://docs.python.org/3.14/library/profile.html',
    'Python 3.14.6 current 2026-07-14',
    'Deterministic profiling, statistics, callers, callees, and measurement limits.'
  ),
  source(
    'Tcl and Tk 8.6 Command Reference',
    'https://www.tcl-lang.org/man/tcl8.6/TkCmd/contents.htm',
    'Tcl and Tk 8.6.18 reference current 2026-07-14',
    'Tk commands, version checks, widget lifecycle, focus, geometry, images, and platform behavior.'
  ),
  source(
    'Tk Canvas Manual',
    'https://www.tcl-lang.org/man/tcl8.6/TkCmd/canvas.htm',
    'Tk 8.6.18 current 2026-07-14',
    'Retained items, IDs, tags, bindings, coordinates, stacking, scrolling, focus, hit testing, configuration, and deletion.'
  ),
  source(
    'Tk bind Manual',
    'https://www.tcl-lang.org/man/tcl8.6/TkCmd/bind.htm',
    'Tk 8.6.18 current 2026-07-14',
    'Event patterns, binding tags, order, replacement, append behavior, focus events, key and pointer details.'
  ),
  source(
    'Tcl after Manual',
    'https://www.tcl-lang.org/man/tcl8.6/TclCmd/after.htm',
    'Tcl 8.6.18 current 2026-07-14',
    'Delayed and idle scheduling, callback identifiers, cancellation, queued work, and event-loop behavior.'
  ),
  source(
    'Tk grid Manual',
    'https://www.tcl-lang.org/man/tcl8.6/TkCmd/grid.htm',
    'Tk 8.6.18 current 2026-07-14',
    'Grid geometry, weights, minimums, padding, sticky placement, propagation, and responsive resize behavior.'
  ),
  source(
    'A Formal Basis for the Heuristic Determination of Minimum Cost Paths',
    'https://doi.org/10.1109/TSSC.1968.300136',
    'Hart, Nilsson, and Raphael 1968 primary paper reviewed 2026-07-14',
    'A-star formulation, admissibility, consistency history, optimality claims, and heuristic search evidence.'
  ),
  source(
    'Generating Random Spanning Trees More Quickly than the Cover Time',
    'https://doi.org/10.1145/237814.237880',
    'Wilson 1996 primary paper reviewed 2026-07-14',
    'Loop-erased random walks and uniform random spanning-tree generation.'
  ),
  source(
    'WCAG 2.2 Recommendation',
    'https://www.w3.org/TR/WCAG22/',
    'W3C Recommendation current 2026-07-14',
    'Keyboard access, focus order and appearance, use of color, reflow, target size, status, timing, motion, errors, and alternatives.'
  ),
  source(
    'Xbox Accessibility Guidelines 3.2',
    'https://learn.microsoft.com/en-us/xbox/accessibility/guidelines',
    'XAG 3.2 guidance updated 2026-03-04 and reviewed 2026-07-14',
    'Text, contrast, multichannel cues, input, difficulty, UI navigation and focus, errors, timing, motion, documentation, and testing.'
  ),
  source(
    'Python Packaging User Guide',
    'https://packaging.python.org/en/latest/',
    'PyPA guide current 2026-07-14',
    'Project metadata, package layout, dependencies, resources, entry points, build artifacts, clean installation, and distribution.'
  ),
  source(
    'PyInstaller 6.21 Manual',
    'https://pyinstaller.org/en/v6.21.0/',
    'PyInstaller 6.21.0 current 2026-07-14',
    'Python 3.14 support, Tcl and Tk collection, hooks, data, binaries, platform-native artifacts, debugging, and release boundaries.'
  ),
  source(
    'Git 2.55 Documentation',
    'https://git-scm.com/docs',
    'Git 2.55 current 2026-07-14',
    'Repository state, revisions, diffs, tags, recovery, artifact identity, and release evidence.'
  ),
  source(
    'ACM IEEE AAAI CS2023 Curriculum',
    'https://csed.acm.org/',
    'CS2023 reviewed 2026-07-14',
    'Algorithms, data structures, software development, HCI, accessibility, testing, security, ethics, and professional outcomes.'
  ),
];

export const buildMazeSolverPythonConfig = finalizeCourse(
  {
    id: 'build-maze-solver-python',
    competencyIdPrefix: 'maze-',
    title: 'Build and Ship an Accessible Maze Solver with Python 3.14 and Tkinter',
    version: '2026.07',
    audience: {
      description:
        'Python and data-structure learners who need to model, generate, solve, animate, test, package, playtest, and defend a complete accessible desktop maze application rather than copy one recursive tutorial.',
      entryKnowledge: [
        'Write and test Python functions and classes; use dataclasses, collections, recursion, iteration, exceptions, imports, type hints, JSON-shaped data, packages, and basic repository workflows.',
        'Represent graphs, stacks, queues, sets, maps, recursion, traversal invariants, asymptotic costs, and path reconstruction at Python Data Structures and Algorithms course depth.',
      ],
      deviceConstraints: [
        'Modern browser; instant Python practice uses deterministic pure grid, graph, search, state, and scheduling models with fixed in-memory fixtures in an isolated Pyodide 3.14 worker. Real Tcl, Tk, tkinter, windows, Canvas, fonts, focus, input devices, assistive technology, files, installers, timing, display scaling, and packaged desktop releases remain explicit controlled transfer gates.',
      ],
      accessibilityAssumptions: [
        'Topology, coordinates, walls, frontiers, paths, focus, controls, state changes, failures, profiles, package records, and release evidence have structured text, explicit labels, keyboard operation, announced status, large targets, reduced motion, reflow, and no color-only meaning.',
      ],
    },
    scope: {
      includes: [
        'Python 3.14.6; Tcl and Tk 8.6 behavior exposed by tkinter; event-driven lifecycle and thread boundary; grid identity and geometry; reciprocal wall models; Canvas items, tags, layers, resize, scaling, input and focus; graph topology; seeded backtracking, randomized Prim and Kruskal, Wilson loop-erased walks and distribution claims; DFS, BFS, Dijkstra, A-star and solver evidence; cancellable after-based animation; explicit application states; pure-core architecture; accessible visual and structured-text puzzle experience; replay and safe JSON state; layered property, mutation, headless, GUI and play testing; profiling and capacity; PyInstaller 6.21 platform-native packaging; local security and privacy; release, migration, rollback, recovery, support, and production defense',
        'Runnable deterministic pure-Python evidence using original fixed fixtures plus explicit Tcl interpreter, Tk widget, display, input, assistive-technology, filesystem, native timing, package, accessibility playtest, performance, and release transfer gates',
        'Five cumulative authentic maze deliveries and a performance-based unfamiliar-platform defense examination',
      ],
      excludes: [
        'Copied tutorial prose or code, claims that one generator samples uniformly, browser claims about native Tk behavior, inaccessible color-only or pointer-only puzzles, hidden answers, arbitrary host execution, networked multiplayer, custom GUI toolkit development, or production release based only on a solved happy path.',
      ],
      nextCourses: ['build-web-scraper-python', 'personal-project-1', 'python-dsa-2'],
    },
    sources,
    sharedRequirements: [
      'Every activity retrieves player goal, repository revision, Python and Tcl/Tk versions, grid and coordinate identity, seed, topology, algorithm state, action and event trace, accessibility requirement, bounded work, changed-case test, failure, recovery, and explicit browser-versus-desktop limits before adding one maze boundary.',
      'Browser Python uses original fixed in-memory fixtures and deterministic pure functions. It does not import or claim native tkinter, Tcl, Tk, Canvas, windows, fonts, focus, input devices, assistive technology, files, installers, display scaling, platform timing, or packaged release behavior; those require controlled native evidence.',
      'Passing work requires stable scenario and artifact identity, prediction, intermediate graph or state evidence, exact observable output, a changed and rejected case, a test that detects a deliberate defect, accessible player evidence, and a named owner for remaining risk.',
    ],
    modules,
    projects: [
      project(
        'maze-model-canvas-prototype',
        'Accessible Grid and Canvas Prototype',
        'maze-input-focus-bindings',
        'A disability-led science museum exhibit team',
        'They need a reciprocal logical maze model rendered through tagged layers, responsive scaling, keyboard and pointer action equivalence, visible focus, a structured-text alternative, and native Tk evidence that remains honest about browser limits.',
        [
          'maze-reciprocal-passage',
          'maze-tag-addressing',
          'maze-responsive-cell-size',
          'maze-input-equivalence',
          'maze-scope-transfer',
        ]
      ),
      project(
        'maze-generation-laboratory',
        'Seeded Maze Generation and Bias Laboratory',
        'maze-generation-alternatives-bias',
        'A university algorithms outreach coordinator',
        'They need reproducible backtracker, Prim, Kruskal, and Wilson generators; independent topology validation; multi-seed bias metrics; accessible explanations; and defensible uniformity and difficulty non-claims.',
        [
          'maze-backtracker-invariant',
          'maze-seed-ownership',
          'maze-randomized-kruskal',
          'maze-wilson-loop-erasure',
          'maze-bias-metrics',
        ]
      ),
      project(
        'maze-solver-animation-studio',
        'Solver Comparison and Cancellable Animation Studio',
        'maze-state-machine-controls',
        'A public puzzle library facilitator',
        'They need DFS, BFS, Dijkstra, and A-star routes checked by an independent oracle, comparable metrics, pause and speed controls, stale-callback cancellation, explicit state transitions, and nonvisual progress evidence.',
        [
          'maze-dfs-path-reconstruction',
          'maze-unweighted-optimality',
          'maze-astar-heuristic',
          'maze-benchmark-design',
          'maze-cancel-stale-work',
        ]
      ),
      project(
        'maze-accessible-tested-release',
        'Accessible Tested Cross-Platform Release Candidate',
        'maze-packaging-platforms',
        'An internal desktop software release engineer',
        'They need a pure core, safe versioned replay, keyboard-first and multichannel puzzle interface, property and mutation evidence, representative profiles, platform-native PyInstaller builds, and clean create-solve-save-recover-close launch evidence.',
        [
          'maze-domain-core',
          'maze-json-schema',
          'maze-accessibility-evidence',
          'maze-mutation-evidence',
          'maze-clean-install-smoke',
        ]
      ),
      project(
        'maze-production-defense',
        'Maze Production, Recovery, and Residual-Risk Defense',
        'maze-release-recovery-defense',
        'A joint player, accessibility, algorithms, security, quality, packaging, and support board',
        'The board needs reconciled player outcomes, topology and solver proof, closed accessibility barriers, bounded local data, immutable artifacts, migration checks, failure and rollback rehearsals, support ownership, and explicit residual-risk acceptance.',
        [
          'maze-correctness-witness',
          'maze-capacity-defense',
          'maze-safe-serialization',
          'maze-release-gates',
          'maze-production-defense',
        ]
      ),
    ],
    examContext:
      'Unfamiliar desktop puzzle cases spanning player outcome, repository evidence, Python, Tcl and Tkinter runtime, event loop and threads, coordinates and wall invariants, Canvas, layout, scaling, bindings and focus, graph topology, generator distributions, DFS, BFS, Dijkstra, A-star, correctness and optimality, animation cancellation, application state, pure architecture, accessibility, replay, safe state, layered testing, profiling, packaging, local security, privacy, migration, rollback, recovery, support, and residual-risk defense with explicit browser and native boundaries.',
    minimumQuestionBankSize: 760,
  },
  {
    researchedAt: RESEARCHED_AT,
    prerequisiteCourseIds: ['python-basics', 'python-dsa'],
  }
);

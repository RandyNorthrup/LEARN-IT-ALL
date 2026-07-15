const REVIEWED_AT = '2026-07-13';
const RESEARCHED_AT = '2026-07-13T23:30:00.000Z';

function skill(id, statement, misconception, knowledgeType = 'procedural', level = 'apply') {
  return [id, statement, misconception, knowledgeType, level];
}

function module(id, title, context, artifact, skills) {
  return {
    id,
    title,
    context,
    artifact,
    objectives: skills.slice(0, 3).map((entry) => entry[1]),
    skills,
  };
}

function buildCourse(config) {
  const competencyIds = config.modules.flatMap((entry) => entry.skills.map((item) => item[0]));
  const moduleIndex = new Map(config.modules.map((entry, index) => [entry.id, index]));
  const projects = config.projectSpecs.map((spec, projectIndex) => {
    const end = moduleIndex.get(spec.afterModuleId);
    if (end === undefined) throw new Error(`Unknown project module ${spec.afterModuleId}`);
    const start = projectIndex === 0 ? 0 : Math.max(0, end - 3);
    const covered = config.modules
      .slice(start, end + 1)
      .flatMap((entry) => entry.skills.map((item) => item[0]));
    return {
      id: spec.id,
      title: spec.title,
      afterModuleId: spec.afterModuleId,
      stakeholder: spec.stakeholder,
      userNeed: spec.userNeed,
      constraints: spec.constraints,
      competencyIds: covered,
      rubricDimensions: spec.rubricDimensions,
    };
  });
  return {
    ...config,
    researchedAt: RESEARCHED_AT,
    projects,
    pathways: {
      prerequisiteCourseIds: config.prerequisiteCourseIds,
      placementEvidence: config.audience.entryKnowledge.map(
        (entry) => `Placement evidence must show this entry skill in working code: ${entry}`
      ),
      completionEvidence: [
        `Complete and defend all ${projects.length} changed-case software projects with tests, trace evidence, and stakeholder acceptance.`,
        'Pass the cumulative performance examination at 85 percent or higher without solution-shape hints.',
      ],
    },
    finalExamCompetencyIds: competencyIds.filter(
      (_, index) => index % 3 === 0 || index === competencyIds.length - 1
    ),
    masteryThresholdPercent: 85,
    minimumQuestionBankSize: Math.max(180, competencyIds.length * 4),
  };
}

const pythonFunctionalSources = [
  {
    title: 'Python 3.14 Functional Programming HOWTO',
    authority: 'official-docs',
    url: 'https://docs.python.org/3.14/howto/functional.html',
    version: 'Python 3.14.6',
    reviewedAt: REVIEWED_AT,
    scope:
      'Functional style, iterators, generators, comprehensions, and functional library patterns.',
  },
  {
    title: 'Python 3.14 Functional Programming Modules',
    authority: 'official-docs',
    url: 'https://docs.python.org/3.14/library/functional.html',
    version: 'Python 3.14.6',
    reviewedAt: REVIEWED_AT,
    scope:
      'itertools, functools, and operator behavior used by production transformation pipelines.',
  },
  {
    title: 'Python 3.14 Data Model',
    authority: 'official-docs',
    url: 'https://docs.python.org/3.14/reference/datamodel.html',
    version: 'Python 3.14.6',
    reviewedAt: REVIEWED_AT,
    scope:
      'Object identity, mutability, callables, iteration protocols, descriptors, and data behavior.',
  },
  {
    title: 'Python Structural Pattern Matching Specification',
    authority: 'standard',
    url: 'https://peps.python.org/pep-0634/',
    version: 'PEP 634 final',
    reviewedAt: REVIEWED_AT,
    scope:
      'Normative matching semantics for explicit data-oriented branching and exhaustive case design.',
  },
];

const dsaSources = [
  {
    title: 'NIST Dictionary of Algorithms and Data Structures',
    authority: 'standard',
    url: 'https://www.nist.gov/dads/',
    version: 'NIST DADS reviewed 2026',
    reviewedAt: REVIEWED_AT,
    scope:
      'Canonical algorithm, complexity, abstract data type, graph, tree, sorting, and search terminology.',
  },
  {
    title: 'MIT 6.006 Introduction to Algorithms',
    authority: 'curriculum-framework',
    url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/',
    version: 'MIT OpenCourseWare 6.006',
    reviewedAt: REVIEWED_AT,
    scope:
      'University sequence for analysis, structures, sorting, searching, graphs, and dynamic programming.',
  },
  {
    title: 'Python 3.14 Collections and Container Datatypes',
    authority: 'official-docs',
    url: 'https://docs.python.org/3.14/library/collections.html',
    version: 'Python 3.14.6',
    reviewedAt: REVIEWED_AT,
    scope:
      'Deque, Counter, defaultdict, named tuple, and ChainMap contracts and complexity-relevant use.',
  },
  {
    title: 'Python 3.14 Sorting Techniques',
    authority: 'official-docs',
    url: 'https://docs.python.org/3.14/howto/sorting.html',
    version: 'Python 3.14.6',
    reviewedAt: REVIEWED_AT,
    scope:
      'Stable sorting, keys, decorate-sort-undecorate, comparison functions, and performance guidance.',
  },
];

const advancedDsaSources = [
  dsaSources[0],
  {
    title: 'MIT 6.046J Design and Analysis of Algorithms',
    authority: 'curriculum-framework',
    url: 'https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/',
    version: 'MIT OpenCourseWare 6.046J',
    reviewedAt: REVIEWED_AT,
    scope:
      'Advanced analysis, divide and conquer, randomization, optimization, approximation, and graph algorithms.',
  },
  {
    title: 'Python 3.14 Heap Queue Algorithms',
    authority: 'official-docs',
    url: 'https://docs.python.org/3.14/library/heapq.html',
    version: 'Python 3.14.6',
    reviewedAt: REVIEWED_AT,
    scope: 'Heap invariants, priority queues, merging, selection, and max-heap operations.',
  },
  {
    title: 'Python 3.14 Graphlib Topological Ordering',
    authority: 'official-docs',
    url: 'https://docs.python.org/3.14/library/graphlib.html',
    version: 'Python 3.14.6',
    reviewedAt: REVIEWED_AT,
    scope:
      'Directed acyclic graph preparation, topological ordering, cycle detection, and parallel readiness.',
  },
];

const functionalModules = [
  module(
    'functional-model-effects',
    'Functional Models, Values, and Observable Effects',
    'Refactor a mutable billing script whose hidden state makes reruns disagree.',
    'an effect map and behavior-preserving functional baseline',
    [
      skill(
        'fp-value-model',
        'Distinguish value transformations from identity-changing commands in an execution trace.',
        'Functional programming means banning every object.',
        'conceptual',
        'analyze'
      ),
      skill(
        'fp-effect-boundary',
        'Locate I/O, mutation, time, randomness, and exceptions and move them behind explicit boundaries.',
        'A function is pure whenever it has a return statement.',
        'strategic',
        'evaluate'
      ),
      skill(
        'fp-referential-transparency',
        'Test whether an expression can be replaced by its value without changing program behavior.',
        'Same-looking outputs prove referential transparency.',
        'conceptual',
        'analyze'
      ),
      skill(
        'fp-expression-reasoning',
        'Trace expression evaluation without relying on hidden statement order.',
        'Expressions and statements have identical substitution rules.'
      ),
      skill(
        'fp-functional-tradeoffs',
        'Choose functional, imperative, or mixed structure from change risk and evidence needs.',
        'Functional style is automatically faster and shorter.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  module(
    'functional-purity-immutability',
    'Pure Functions, Immutability, and Data Copies',
    'Repair a pricing pipeline where aliases mutate shared orders during validation.',
    'a pure price transformation with alias-safety tests',
    [
      skill(
        'fp-pure-contract',
        'Write deterministic pure functions whose outputs and failures depend only on explicit inputs.',
        'Avoiding global variables alone guarantees purity.'
      ),
      skill(
        'fp-mutation-aliasing',
        'Predict mutation through shared aliases in nested Python containers.',
        'A new outer list also copies every nested value.',
        'conceptual',
        'analyze'
      ),
      skill(
        'fp-immutable-update',
        'Return updated immutable records while preserving unchanged data and input values.',
        'Immutability requires copying the entire object graph every time.'
      ),
      skill(
        'fp-copy-boundary',
        'Select shallow copy, deep copy, immutable representation, or ownership transfer deliberately.',
        'Deep copying is always safest and cheapest.',
        'strategic',
        'evaluate'
      ),
      skill(
        'fp-purity-tests',
        'Test determinism, input preservation, and order independence with changed data.',
        'One repeated example proves absence of side effects.'
      ),
    ]
  ),
  module(
    'functional-callables-composition',
    'Functions as Values, Signatures, and Composition',
    'Turn repeated validation branches into reusable transformations for an intake service.',
    'a typed composition library with signature evidence',
    [
      skill(
        'fp-first-class-functions',
        'Pass, store, return, and inspect callables while preserving clear input-output contracts.',
        'First-class functions execute as soon as referenced.'
      ),
      skill(
        'fp-callable-signatures',
        'Model callable parameter and return relationships with precise type annotations.',
        'Callable without details communicates every signature.'
      ),
      skill(
        'fp-function-composition',
        'Compose compatible unary transformations and explain data flow across boundaries.',
        'Any two functions compose regardless of their domains.'
      ),
      skill(
        'fp-pipeline-adapters',
        'Create small adapters when neighboring transformation signatures do not align.',
        'Adapters should silently discard mismatched data.'
      ),
      skill(
        'fp-composition-law-tests',
        'Test identity and associativity expectations where a composition abstraction claims them.',
        'Composition laws hold automatically for effectful functions.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  module(
    'functional-higher-order',
    'Higher-Order Operations, Map, Filter, and Fold',
    'Summarize a stream of service records without hand-written accumulator loops.',
    'a tested map-filter-fold analytics pipeline',
    [
      skill(
        'fp-map-transform',
        'Use mapping for one-output-per-input transformations without smuggling filtering effects.',
        'Map may freely change collection length.'
      ),
      skill(
        'fp-filter-predicate',
        'Design total predicates that retain records for explicit, testable reasons.',
        'Filter transforms values while preserving all inputs.'
      ),
      skill(
        'fp-fold-invariant',
        'Define an accumulator identity and invariant before implementing a fold.',
        'Reduce can infer a safe initial value for every operation.',
        'strategic',
        'analyze'
      ),
      skill(
        'fp-comprehension-choice',
        'Choose comprehensions, generator expressions, or functional calls by clarity and evaluation needs.',
        'Functional syntax is always more functional than a comprehension.',
        'strategic',
        'evaluate'
      ),
      skill(
        'fp-operation-fusion',
        'Combine adjacent transformations only when semantics, readability, and failure evidence remain intact.',
        'Fewer passes always produce meaningfully faster code.'
      ),
    ]
  ),
  module(
    'functional-iterators-laziness',
    'Iteration Protocols, Generators, and Lazy Evaluation',
    'Process records larger than memory while exposing malformed rows at a controlled boundary.',
    'a bounded-memory lazy ingestion pipeline',
    [
      skill(
        'fp-iteration-protocol',
        'Trace iter, next, StopIteration, and single-pass iterator state exactly.',
        'Iterable and iterator mean the same reusable object.',
        'conceptual',
        'analyze'
      ),
      skill(
        'fp-generator-suspension',
        'Explain generator suspension, local state retention, send points, and termination.',
        'A generator computes and stores every result at creation.'
      ),
      skill(
        'fp-lazy-memory',
        'Measure memory and latency tradeoffs between eager and lazy transformation.',
        'Lazy evaluation is always faster and lower risk.',
        'strategic',
        'evaluate'
      ),
      skill(
        'fp-one-shot-hazards',
        'Prevent accidental exhaustion, duplicate consumption, and hidden ordering dependencies.',
        'An iterator restarts automatically in each loop.'
      ),
      skill(
        'fp-generator-cleanup',
        'Close generators and preserve cleanup behavior during early exit and exceptions.',
        'Leaving a lazy pipeline early cannot retain resources.'
      ),
    ]
  ),
  module(
    'functional-itertools-streams',
    'Itertools, Infinite Streams, and Bounded Pipelines',
    'Create schedule combinations and rolling windows without materializing an unbounded search space.',
    'a lazy scheduling and windowing toolkit',
    [
      skill(
        'fp-itertools-building-blocks',
        'Combine chain, repeat, cycle, count, and islice with explicit termination.',
        'Every itertools function eventually stops on its own.'
      ),
      skill(
        'fp-groupby-adjacency',
        'Sort or otherwise establish adjacency before using groupby for complete groups.',
        'Groupby gathers equal values from anywhere in a stream.'
      ),
      skill(
        'fp-combinatoric-growth',
        'Estimate product, permutation, and combination growth before enumeration.',
        'Lazy combinatorics remove exponential runtime cost.',
        'strategic',
        'evaluate'
      ),
      skill(
        'fp-stream-windowing',
        'Implement pairwise, batched, accumulated, and sliding-window transformations with edge cases.',
        'All window operations handle short streams identically.'
      ),
      skill(
        'fp-bounded-consumption',
        'Attach explicit limits, backpressure decisions, and cancellation to open-ended iterators.',
        'Calling next repeatedly is sufficient resource control.'
      ),
    ]
  ),
  module(
    'functional-functools-operator',
    'Functools, Operator Functions, Caching, and Dispatch',
    'Build reusable scoring functions without obscuring cache validity or dispatch behavior.',
    'a measured callable utility and dispatch package',
    [
      skill(
        'fp-partial-binding',
        'Use partial application to bind stable configuration without hiding required arguments.',
        'Partial evaluates the function immediately.'
      ),
      skill(
        'fp-cache-validity',
        'Use cache and lru_cache only for hashable inputs with stable effect-free semantics.',
        'Caching any function preserves correctness.'
      ),
      skill(
        'fp-singledispatch-contract',
        'Design singledispatch registrations around first-argument type contracts and safe fallbacks.',
        'Single dispatch chooses an implementation from every argument type.'
      ),
      skill(
        'fp-operator-functions',
        'Use operator callables when they make key extraction and composition more inspectable.',
        'Operator functions avoid all runtime attribute errors.'
      ),
      skill(
        'fp-wrapper-metadata',
        'Preserve wrapped function identity, signature, and documentation with update_wrapper or wraps.',
        'A wrapper automatically retains metadata.'
      ),
    ]
  ),
  module(
    'functional-closures-currying',
    'Closures, Lexical State, Currying, and Factories',
    'Create configurable validators without mutable module globals or late-binding bugs.',
    'a closure-based validator factory with capture tests',
    [
      skill(
        'fp-closure-capture',
        'Trace lexical name capture and cell lookup after the enclosing call returns.',
        'Closures copy every captured value at definition time.',
        'conceptual',
        'analyze'
      ),
      skill(
        'fp-late-binding',
        'Detect and repair late-bound loop variables in generated callables.',
        'Default arguments and closures always bind at the same time.'
      ),
      skill(
        'fp-nonlocal-state',
        'Distinguish deliberate nonlocal state from pure closure configuration and document the effect.',
        'Using nonlocal leaves a function pure.'
      ),
      skill(
        'fp-currying-partial',
        'Distinguish currying from partial application and choose only when APIs become clearer.',
        'Currying and partial application are identical operations.',
        'conceptual',
        'analyze'
      ),
      skill(
        'fp-function-factory-tests',
        'Test factory isolation, captured configuration, invalid inputs, and repeated invocation.',
        'Testing one produced function proves every factory instance.'
      ),
    ]
  ),
  module(
    'functional-decorators',
    'Decorators, Cross-Cutting Behavior, and Transparent Wrappers',
    'Add retries, timing, authorization checks, and telemetry without changing business function contracts.',
    'a transparent decorator stack with order tests',
    [
      skill(
        'fp-decorator-desugaring',
        'Translate decorator syntax into explicit rebinding and predict application order.',
        'Decorators run only when the decorated function is called.',
        'conceptual',
        'analyze'
      ),
      skill(
        'fp-parameterized-decorators',
        'Separate decorator configuration, function wrapping, and call execution across closure layers.',
        'A parameterized decorator needs only one callable layer.'
      ),
      skill(
        'fp-decorator-transparency',
        'Preserve signatures, metadata, return values, exceptions, and async behavior through wrappers.',
        'Using wraps preserves all behavioral contracts automatically.'
      ),
      skill(
        'fp-decorator-order',
        'Test how stacked decorators change control flow, data, and failure handling.',
        'Decorator order is cosmetic.'
      ),
      skill(
        'fp-decorator-restraint',
        'Reject decorators that hide material domain behavior or make dependencies untestable.',
        'Every repeated line belongs in a decorator.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  module(
    'functional-errors-results',
    'Total Functions, Result Values, and Pattern Matching',
    'Make a batch import explain every rejected record rather than aborting or returning ambiguous sentinels.',
    'a typed parse-validate-result pipeline',
    [
      skill(
        'fp-total-functions',
        'Define outputs for every admitted input or narrow the domain with an explicit validation boundary.',
        'A function is total when common inputs work.'
      ),
      skill(
        'fp-result-model',
        'Represent success and failure as explicit immutable variants with useful evidence.',
        'Returning None communicates every failure reason.'
      ),
      skill(
        'fp-pattern-matching',
        'Use structural pattern matching with guarded, ordered, and intentionally exhaustive cases.',
        'Match automatically warns about every missing case.'
      ),
      skill(
        'fp-error-accumulation',
        'Choose fail-fast or error accumulation from stakeholder correction needs.',
        'Fail-fast is always simpler for users.',
        'strategic',
        'evaluate'
      ),
      skill(
        'fp-exception-boundary',
        'Convert expected domain failures to values while preserving unexpected exceptions and tracebacks.',
        'Functional code must never raise an exception.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  module(
    'functional-testing-laws',
    'Property Tests, Algebraic Laws, and Pipeline Diagnostics',
    'Prove a normalization and aggregation library across generated changed cases and injected faults.',
    'a law-oriented regression and diagnostics suite',
    [
      skill(
        'fp-example-properties',
        'Separate concrete examples from general properties and generate boundary-rich cases.',
        'Many random examples constitute a proof.'
      ),
      skill(
        'fp-algebraic-laws',
        'Test identity, associativity, idempotence, or round-trip laws only where contracts claim them.',
        'Every transformation should satisfy every algebraic law.',
        'strategic',
        'evaluate'
      ),
      skill(
        'fp-pipeline-observability',
        'Attach diagnostic taps at effect boundaries without changing transformed values.',
        'Logging inside every pure function keeps it pure.'
      ),
      skill(
        'fp-shrinking-counterexamples',
        'Reduce a failing input to the smallest case that still violates the property.',
        'The first large random failure is the best explanation.'
      ),
      skill(
        'fp-performance-properties',
        'Measure bounded consumption and scaling without turning timing noise into correctness claims.',
        'A single fast run proves complexity.'
      ),
    ]
  ),
  module(
    'functional-architecture-capstone',
    'Functional Core, Imperative Shell, and Production Integration',
    'Rebuild an unreliable data-processing service as a pure decision core with explicit operational effects.',
    'a production-shaped functional service and decision record',
    [
      skill(
        'fp-functional-core-shell',
        'Separate pure domain decisions from I/O orchestration with explicit data contracts.',
        'A functional core means the whole application has no I/O.'
      ),
      skill(
        'fp-dependency-injection',
        'Pass clocks, randomness, storage, and transport behavior through narrow callable interfaces.',
        'Dependency injection requires a class framework.'
      ),
      skill(
        'fp-streaming-architecture',
        'Compose ingestion, validation, transformation, aggregation, and emission with bounded resource use.',
        'A generator pipeline alone supplies backpressure.'
      ),
      skill(
        'fp-refactor-equivalence',
        'Demonstrate behavior preservation with characterization tests and changed-case comparisons.',
        'Cleaner-looking code proves a safe refactor.',
        'strategic',
        'evaluate'
      ),
      skill(
        'fp-architecture-defense',
        'Defend functional and imperative boundaries using correctness, operability, and team-maintenance evidence.',
        'Paradigm purity is more important than stakeholder outcomes.',
        'professional',
        'create'
      ),
    ]
  ),
];

const dsaModules = [
  module(
    'dsa-problem-contracts',
    'Algorithmic Problems, Contracts, and Evidence',
    'Turn vague routing and lookup requests into measurable input-output problems.',
    'an algorithm contract and adversarial case catalog',
    [
      skill(
        'dsa-problem-specification',
        'Specify inputs, outputs, preconditions, postconditions, and invalid cases before selecting an algorithm.',
        'An example input fully specifies a problem.'
      ),
      skill(
        'dsa-correctness-claim',
        'State partial and total correctness claims that can be challenged by counterexamples.',
        'Passing tests is the same as proving correctness.',
        'conceptual',
        'analyze'
      ),
      skill(
        'dsa-case-design',
        'Construct normal, boundary, duplicate, empty, sorted, reversed, and adversarial cases.',
        'Random inputs reliably cover boundary behavior.'
      ),
      skill(
        'dsa-model-choice',
        'Choose a computational model and counted operation that matches stakeholder cost.',
        'Runtime seconds are the only valid cost model.',
        'strategic',
        'evaluate'
      ),
      skill(
        'dsa-baseline-first',
        'Implement a clear correct baseline before optimizing and preserve it as an oracle.',
        'A baseline is wasted work once optimization starts.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  module(
    'dsa-asymptotic-analysis',
    'Asymptotic Time, Space, and Growth',
    'Predict which ingestion design survives tenfold and thousandfold load increases.',
    'a measured growth-rate decision notebook',
    [
      skill(
        'dsa-input-size',
        'Define input size and dominant operations for scalar, sequence, graph, and numeric problems.',
        'Input size always equals one list length.'
      ),
      skill(
        'dsa-big-o-theta-omega',
        'Distinguish upper, tight, and lower asymptotic bounds without dropping relevant variables.',
        'Big O always means exact worst-case runtime.',
        'conceptual',
        'analyze'
      ),
      skill(
        'dsa-growth-simplification',
        'Simplify sums, products, and nested-loop costs while preserving independent dimensions.',
        'Every nested loop is quadratic.'
      ),
      skill(
        'dsa-time-space-tradeoff',
        'Compare auxiliary space, retained memory, recomputation, and latency explicitly.',
        'Using less memory automatically makes an algorithm better.',
        'strategic',
        'evaluate'
      ),
      skill(
        'dsa-empirical-complexity',
        'Benchmark geometric input sizes and compare measurements with the analytical model.',
        'A benchmark can replace asymptotic analysis.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  module(
    'dsa-sequences-arrays',
    'Arrays, Dynamic Sequences, and Locality',
    'Design an event buffer with predictable indexing, insertion, and memory behavior.',
    'an array-backed sequence with operation traces',
    [
      skill(
        'dsa-contiguous-layout',
        'Explain indexing and cache-local traversal from contiguous logical storage.',
        'Python lists store full arbitrary objects inline.'
      ),
      skill(
        'dsa-dynamic-array-growth',
        'Trace capacity growth and amortized append behavior through resize events.',
        'Every append has constant worst-case cost.'
      ),
      skill(
        'dsa-sequence-operations',
        'Compare indexed access, search, middle insertion, deletion, slicing, and copying costs.',
        'All list operations are constant time.'
      ),
      skill(
        'dsa-two-pointer',
        'Maintain explicit two-pointer invariants for partition and interval problems.',
        'Two pointers work only on sorted numeric arrays.'
      ),
      skill(
        'dsa-prefix-aggregation',
        'Precompute prefix information to answer repeated range queries with validated boundaries.',
        'Prefix structures remove all update cost.'
      ),
    ]
  ),
  module(
    'dsa-linked-structures',
    'Linked Lists, Nodes, and Pointer Invariants',
    'Build a mutable work queue where stable node links matter more than random access.',
    'a linked structure with diagrammed invariants',
    [
      skill(
        'dsa-node-link-model',
        'Trace singly and doubly linked node references without losing head, tail, or reachability.',
        'Variables holding nodes contain copied node values.'
      ),
      skill(
        'dsa-linked-insert-delete',
        'Insert and delete at boundaries while preserving connectivity and size invariants.',
        'Relinking one neighboring node is sufficient for every deletion.'
      ),
      skill(
        'dsa-linked-traversal',
        'Implement traversal with termination evidence and malformed-cycle protection.',
        'Following next eventually reaches None in every linked structure.'
      ),
      skill(
        'dsa-fast-slow-pointers',
        'Use fast and slow pointers for cycle, midpoint, and phase-offset reasoning.',
        'Fast and slow pointers reveal cycle entry immediately.'
      ),
      skill(
        'dsa-array-list-choice',
        'Choose contiguous or linked storage from measured access, mutation, allocation, and locality needs.',
        'Linked lists are always faster for insertion.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  module(
    'dsa-stacks-queues-deques',
    'Stacks, Queues, Deques, and Monotonic Structures',
    'Coordinate undo history, request scheduling, and sliding-window alerts.',
    'a suite of bounded linear abstract data types',
    [
      skill(
        'dsa-adt-contracts',
        'Define stack, queue, and deque behavior independently from implementation details.',
        'An abstract data type is a specific class layout.',
        'conceptual',
        'analyze'
      ),
      skill(
        'dsa-stack-applications',
        'Apply LIFO state to parsing, undo, traversal, and nested-delimiter validation.',
        'Recursion never uses stack-like state.'
      ),
      skill(
        'dsa-queue-applications',
        'Apply FIFO ordering with bounded capacity and explicit overload behavior.',
        'A Python list front deletion is an efficient queue.'
      ),
      skill(
        'dsa-monotonic-deque',
        'Maintain a monotonic deque invariant for window extrema without stale entries.',
        'Sorting each window has equivalent scaling.'
      ),
      skill(
        'dsa-structure-tests',
        'Test underflow, overflow, wraparound, duplicates, and long operation sequences.',
        'Testing push then pop proves an ADT implementation.'
      ),
    ]
  ),
  module(
    'dsa-hash-tables',
    'Hash Tables, Dictionaries, Sets, and Collision Policy',
    'Create a deduplication and lookup service that remains correct under collision-heavy data.',
    'a hash-table model and workload benchmark',
    [
      skill(
        'dsa-hash-contract',
        'Relate hash stability, equality, and immutable key requirements.',
        'Different values must always have different hashes.'
      ),
      skill(
        'dsa-collision-resolution',
        'Trace separate chaining and open addressing through collision and deletion cases.',
        'A collision means the hash table is incorrect.'
      ),
      skill(
        'dsa-load-factor',
        'Explain how load factor and resizing influence expected cost and memory.',
        'Hash lookup is constant time under every input.'
      ),
      skill(
        'dsa-dict-set-modeling',
        'Use dictionaries, sets, counters, and default mappings according to semantic need.',
        'A set is merely a list without duplicates.'
      ),
      skill(
        'dsa-adversarial-hashing',
        'Test collision stress and avoid claims based only on average benign keys.',
        'Random-looking keys prevent all worst cases.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  module(
    'dsa-recursion-divide-conquer',
    'Recursion, Recurrences, and Divide-and-Conquer',
    'Break a large document and spatial search problem into independently checkable subproblems.',
    'a recursive solver with recurrence evidence',
    [
      skill(
        'dsa-recursive-contract',
        'Define base cases, progress measures, and combination rules before recursive calls.',
        'A recursive function only needs a base case somewhere.'
      ),
      skill(
        'dsa-call-tree',
        'Trace call trees, stack depth, repeated subproblems, and returned values.',
        'Recursive calls run in parallel by default.'
      ),
      skill(
        'dsa-recurrence-model',
        'Write and interpret recurrences for divide, solve, and combine costs.',
        'Every halving recurrence is logarithmic overall.'
      ),
      skill(
        'dsa-divide-conquer',
        'Design balanced subproblems and prove the combine step preserves correctness.',
        'Splitting a problem automatically improves runtime.'
      ),
      skill(
        'dsa-recursion-iteration-choice',
        'Choose recursion, explicit stack, or iteration from depth, clarity, and resource constraints.',
        'Recursion is always less efficient than iteration.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  module(
    'dsa-sorting',
    'Sorting Algorithms, Stability, and Ordering Contracts',
    'Order customer records by multiple keys while preserving meaningful prior order.',
    'a sorting laboratory with operation counts',
    [
      skill(
        'dsa-ordering-contract',
        'Define total, partial, and key-based orderings including tie and missing-value policy.',
        'A comparison function may return inconsistent answers.'
      ),
      skill(
        'dsa-elementary-sorts',
        'Trace insertion and selection sorting invariants and identify useful input regimes.',
        'Quadratic algorithms have no legitimate use.'
      ),
      skill(
        'dsa-merge-sort',
        'Implement stable merge sort and account for auxiliary space and copying.',
        'Merge sort always operates in place.'
      ),
      skill(
        'dsa-quicksort',
        'Trace partition invariants and pivot effects across duplicate and ordered inputs.',
        'Quicksort is guaranteed n log n.'
      ),
      skill(
        'dsa-python-sort',
        'Use Python stable key sorting and multi-pass ordering without comparator mistakes.',
        'Reverse sorting reverses every tie relationship.'
      ),
    ]
  ),
  module(
    'dsa-search-selection',
    'Binary Search, Selection, and Boundary Finding',
    'Locate inventory thresholds and percentiles without off-by-one failures.',
    'a boundary-safe search and selection toolkit',
    [
      skill(
        'dsa-binary-search-invariant',
        'Maintain a precise candidate interval and prove each binary-search update shrinks it.',
        'Binary search only needs a midpoint formula.'
      ),
      skill(
        'dsa-lower-upper-bounds',
        'Find first true, last false, lower bound, and upper bound under duplicate values.',
        'Finding any equal item solves every boundary query.'
      ),
      skill(
        'dsa-search-monotone-answer',
        'Binary-search an answer space only after proving a monotone feasibility predicate.',
        'Any numeric answer can be binary searched.'
      ),
      skill(
        'dsa-quickselect',
        'Trace partition-based selection and distinguish expected from worst-case cost.',
        'Selecting the kth item requires fully sorting input.'
      ),
      skill(
        'dsa-search-counterexamples',
        'Generate empty, singleton, duplicate, extreme, and impossible-target cases.',
        'One successful middle target catches off-by-one errors.'
      ),
    ]
  ),
  module(
    'dsa-trees-bst',
    'Trees, Traversals, and Binary Search Trees',
    'Index hierarchical records and ordered keys with explicit structural invariants.',
    'a traversable search tree with validity checks',
    [
      skill(
        'dsa-tree-vocabulary',
        'Distinguish root, edge, parent, child, ancestor, depth, height, leaf, and subtree.',
        'Depth and height are interchangeable for every node.',
        'conceptual',
        'analyze'
      ),
      skill(
        'dsa-tree-traversals',
        'Implement preorder, inorder, postorder, and level-order traversal iteratively and recursively.',
        'Inorder traversal sorts every kind of tree.'
      ),
      skill(
        'dsa-bst-invariant',
        'Preserve a documented duplicate policy and global ordering invariant during updates.',
        'Checking each node against its children proves a BST valid.'
      ),
      skill(
        'dsa-bst-operations',
        'Implement search, insert, successor, and deletion across zero, one, and two-child cases.',
        'Deleting a two-child node means dropping its subtree.'
      ),
      skill(
        'dsa-bst-degeneration',
        'Measure how insertion order changes height and operation cost.',
        'A binary search tree is automatically balanced.'
      ),
    ]
  ),
  module(
    'dsa-heaps-priority',
    'Heaps, Priority Queues, and Scheduling',
    'Schedule incidents by urgency, arrival, and changing operational priority.',
    'a stable priority scheduler with heap invariants',
    [
      skill(
        'dsa-heap-invariant',
        'Relate complete-tree shape to array indices and parent-child heap order.',
        'A heap keeps every element globally sorted.'
      ),
      skill(
        'dsa-heap-operations',
        'Trace sift-up, sift-down, push, pop, replace, and heapify costs.',
        'Building a heap by heapify is n log n.'
      ),
      skill(
        'dsa-priority-ties',
        'Add stable tie breakers without comparing unrelated payload objects.',
        'Equal priorities can always compare their payloads safely.'
      ),
      skill(
        'dsa-lazy-deletion',
        'Handle updated or removed priorities with entry finders and stale-entry cleanup.',
        'A standard heap supports arbitrary update in constant time.'
      ),
      skill(
        'dsa-top-k-merge',
        'Use bounded heaps for top-k, streaming selection, and multiway merge problems.',
        'Top-k always requires storing and sorting every item.'
      ),
    ]
  ),
  module(
    'dsa-tries-strings',
    'Tries, Prefix Search, and String Algorithms',
    'Build an autocomplete and route-prefix service with predictable matching behavior.',
    'a Unicode-aware prefix index and matcher',
    [
      skill(
        'dsa-trie-invariant',
        'Represent shared prefixes, terminal markers, and child transitions without confusing words and prefixes.',
        'Every trie node represents a complete key.'
      ),
      skill(
        'dsa-trie-operations',
        'Implement insert, exact lookup, prefix lookup, delete, and bounded suggestions.',
        'Removing a word always removes its full path.'
      ),
      skill(
        'dsa-string-normalization',
        'Define Unicode normalization and case policy before indexing or comparison.',
        'Lowercasing alone gives universal text equivalence.'
      ),
      skill(
        'dsa-prefix-complexity',
        'Analyze prefix operations by key length and output size rather than record count alone.',
        'Trie lookup is constant time.'
      ),
      skill(
        'dsa-naive-string-search',
        'Trace brute-force substring matching and construct its worst-case repeated-prefix input.',
        'Nested scanning always examines every pair of characters.'
      ),
    ]
  ),
  module(
    'dsa-graphs-representation',
    'Graphs, Representations, and Traversal',
    'Model service dependencies, social links, and routes without losing direction or weight.',
    'a graph library with BFS and DFS traces',
    [
      skill(
        'dsa-graph-model',
        'Define vertices, edges, direction, weights, self-loops, and parallel-edge policy from the domain.',
        'Every relationship should be an undirected simple edge.'
      ),
      skill(
        'dsa-graph-representation',
        'Choose adjacency lists, matrices, edge lists, or implicit neighbors from density and operations.',
        'Adjacency matrices are always faster because indexing is constant.'
      ),
      skill(
        'dsa-bfs',
        'Maintain BFS frontier and discovery invariants for unweighted shortest paths and layers.',
        'BFS uses a stack and explores depth first.'
      ),
      skill(
        'dsa-dfs',
        'Maintain DFS color or visited state for components, cycles, and traversal structure.',
        'Marking visited after recursion is always safe.'
      ),
      skill(
        'dsa-traversal-complexity',
        'Analyze traversal over reachable vertices and represented edges with representation costs.',
        'Graph traversal is always quadratic.'
      ),
    ]
  ),
  module(
    'dsa-graph-applications',
    'Components, Cycles, Topological Order, and Unweighted Paths',
    'Validate a deployment dependency plan and explain unreachable service routes.',
    'a dependency analyzer with path evidence',
    [
      skill(
        'dsa-components',
        'Find connected components and explain what connectivity means for the modeled domain.',
        'A disconnected graph necessarily indicates bad data.'
      ),
      skill(
        'dsa-cycle-detection',
        'Detect undirected and directed cycles with the correct parent or active-path state.',
        'Any visited neighbor proves a directed cycle.'
      ),
      skill(
        'dsa-topological-sort',
        'Produce and validate a topological order or return concrete cycle evidence.',
        'A DAG has exactly one topological order.'
      ),
      skill(
        'dsa-path-reconstruction',
        'Reconstruct an actual path from predecessor evidence instead of reporting reachability alone.',
        'Visited state is enough to recover every path.'
      ),
      skill(
        'dsa-multi-source-bfs',
        'Use multiple initial frontier nodes for nearest-source and propagation problems.',
        'Running separate BFS from every source has the same cost.'
      ),
    ]
  ),
  module(
    'dsa-testing-benchmarking',
    'Invariant Testing, Fuzzing, and Reproducible Benchmarks',
    'Audit custom structures whose happy paths pass but long random operation sequences corrupt state.',
    'a model-based test and benchmark harness',
    [
      skill(
        'dsa-invariant-checkers',
        'Write executable representation invariants that fail near the corrupting operation.',
        'Invariant checks belong only in final tests.'
      ),
      skill(
        'dsa-model-based-tests',
        'Compare custom operations against a simpler trusted reference model.',
        'Using a library oracle makes the custom implementation pointless.'
      ),
      skill(
        'dsa-random-sequences',
        'Generate reproducible operation sequences and retain seeds for failures.',
        'Randomized tests cannot be debugged.'
      ),
      skill(
        'dsa-benchmark-design',
        'Control setup, warmup, repetition, input distribution, and measured operation.',
        'Timing an entire script isolates algorithm cost.'
      ),
      skill(
        'dsa-optimization-proof',
        'Require correctness equivalence and measured stakeholder benefit before keeping an optimization.',
        'Lower Big O guarantees faster production behavior.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  module(
    'dsa-capstone',
    'Data Structure and Algorithm Design Capstone',
    'Design a dispatch index for mixed lookup, priority, path, and update workloads.',
    'a defended multi-structure dispatch system',
    [
      skill(
        'dsa-workload-analysis',
        'Translate operation frequency, scale, latency, memory, and consistency needs into structure criteria.',
        'Choose structures from their most famous operation only.',
        'strategic',
        'evaluate'
      ),
      skill(
        'dsa-composite-design',
        'Combine structures while documenting duplicated state and synchronization invariants.',
        'Combining fast structures preserves each operation cost automatically.'
      ),
      skill(
        'dsa-correctness-argument',
        'Present loop invariants, induction, or contradiction arguments appropriate to each component.',
        'Informal intuition is enough for high-impact correctness.'
      ),
      skill(
        'dsa-scale-validation',
        'Test realistic, boundary, and adversarial workloads against analytical predictions.',
        'Average sample data represents adversarial production input.'
      ),
      skill(
        'dsa-design-defense',
        'Defend alternatives, limitations, failure recovery, and measured tradeoffs to reviewers.',
        'Fast benchmark results alone justify the design.',
        'professional',
        'create'
      ),
    ]
  ),
];

const advancedDsaModules = [
  module(
    'dsa2-proof-recurrences',
    'Proof Techniques, Invariants, and Recurrence Bounds',
    'Review a proposed optimization whose runtime and correctness claims lack evidence.',
    'a formal algorithm review packet',
    [
      skill(
        'dsa2-induction',
        'Use induction on input size or recursive structure to prove algorithm properties.',
        'Checking several sizes completes an induction proof.'
      ),
      skill(
        'dsa2-loop-invariants',
        'State initialization, maintenance, and termination for nontrivial loop invariants.',
        'A loop invariant only needs to be true after the loop.'
      ),
      skill(
        'dsa2-contradiction-exchange',
        'Use contradiction and exchange arguments where direct construction is awkward.',
        'Exchange arguments apply to every greedy choice automatically.'
      ),
      skill(
        'dsa2-recurrence-solving',
        'Solve recurrences with substitution, recursion trees, or master-method conditions.',
        'Master theorem handles every recurrence.'
      ),
      skill(
        'dsa2-lower-bounds',
        'Argue comparison or information lower bounds without confusing them with one implementation.',
        'A slow implementation proves a problem lower bound.',
        'conceptual',
        'analyze'
      ),
    ]
  ),
  module(
    'dsa2-amortized-analysis',
    'Amortized Analysis and Dynamic Structures',
    'Guarantee long-run latency for a structure with occasional expensive rebuilds.',
    'an amortized-cost ledger and implementation',
    [
      skill(
        'dsa2-aggregate-method',
        'Bound total operation cost over a sequence and derive amortized cost.',
        'Amortized cost is the same as average random-case cost.'
      ),
      skill(
        'dsa2-accounting-method',
        'Assign credits that cover future expensive operations without negative balances.',
        'Credits represent actual runtime memory.'
      ),
      skill(
        'dsa2-potential-method',
        'Define a nonnegative potential and calculate amortized cost changes.',
        'Any quantity can serve as a valid potential function.'
      ),
      skill(
        'dsa2-resizing-policy',
        'Compare growth and shrink thresholds for time, slack, and thrashing behavior.',
        'Halving capacity whenever half full is always safe.'
      ),
      skill(
        'dsa2-adversarial-sequences',
        'Construct operation sequences that expose weak amortized claims and latency spikes.',
        'A benign benchmark validates every operation sequence.'
      ),
    ]
  ),
  module(
    'dsa2-balanced-trees',
    'Balanced Search Trees and Order Statistics',
    'Maintain an ordered index with predictable latency during sorted and mixed updates.',
    'a balanced-tree trace and order-statistic extension',
    [
      skill(
        'dsa2-rotation-invariants',
        'Trace rotations while preserving binary-search order and reconnecting every affected link.',
        'A rotation changes the inorder key sequence.'
      ),
      skill(
        'dsa2-avl-balance',
        'Maintain AVL heights and select single or double rotations from imbalance shape.',
        'Any rotation at an imbalanced node restores AVL balance.'
      ),
      skill(
        'dsa2-red-black-properties',
        'Use red-black color properties to bound height and guide update repair.',
        'A red-black tree is perfectly balanced.'
      ),
      skill(
        'dsa2-augmented-trees',
        'Maintain subtree aggregates for rank, select, interval, or range queries.',
        'Adding cached fields cannot affect update complexity.'
      ),
      skill(
        'dsa2-balanced-tree-choice',
        'Compare balanced trees with sorted arrays, heaps, and hash tables by workload.',
        'Balanced trees dominate hash tables for every lookup.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  module(
    'dsa2-disjoint-sets',
    'Disjoint Sets, Connectivity, and Offline Grouping',
    'Track changing network connectivity across merges without scanning every member.',
    'a union-find service with measured compression',
    [
      skill(
        'dsa2-set-forest',
        'Represent disjoint sets as parent forests with explicit representative invariants.',
        'Every element directly points to the representative.'
      ),
      skill(
        'dsa2-union-rank',
        'Apply union by rank or size without corrupting representative metadata.',
        'Rank always equals exact tree height after compression.'
      ),
      skill(
        'dsa2-path-compression',
        'Trace path compression and explain its interaction with later finds.',
        'Path compression makes every operation strict constant time.'
      ),
      skill(
        'dsa2-inverse-ackermann',
        'Interpret the inverse-Ackermann amortized bound without presenting it as a worst-case constant.',
        'A tiny growth function means analysis is unnecessary.',
        'conceptual',
        'analyze'
      ),
      skill(
        'dsa2-offline-connectivity',
        'Use disjoint sets for batch connectivity while recognizing unsupported deletion and path needs.',
        'Union-find can return actual graph paths.'
      ),
    ]
  ),
  module(
    'dsa2-directed-graphs',
    'Directed Graphs, Strong Components, and Condensation',
    'Analyze circular dependencies and group mutually reachable services.',
    'a strongly-connected dependency report',
    [
      skill(
        'dsa2-directed-dfs-times',
        'Use discovery and finish structure to reason about directed reachability.',
        'DFS timestamps depend only on graph structure, not traversal order.'
      ),
      skill(
        'dsa2-strong-components',
        'Compute strongly connected components and validate mutual reachability within each result.',
        'Connected components and strong components are identical.'
      ),
      skill(
        'dsa2-condensation-dag',
        'Collapse strong components into an acyclic condensation graph.',
        'Collapsing cycles loses all useful dependency information.'
      ),
      skill(
        'dsa2-cycle-witness',
        'Return a concrete directed cycle witness for invalid dependency plans.',
        'A boolean cycle flag is sufficient operational evidence.'
      ),
      skill(
        'dsa2-topological-scheduling',
        'Use DAG order with readiness and parallel-resource constraints without implying arbitrary tasks can overlap.',
        'Topological order is a complete scheduler.'
      ),
    ]
  ),
  module(
    'dsa2-shortest-paths',
    'Weighted Shortest Paths and Relaxation',
    'Choose safe routes across positive, negative, and unreachable weighted networks.',
    'a multi-algorithm route engine with path proofs',
    [
      skill(
        'dsa2-relaxation',
        'State and apply edge relaxation while preserving predecessor evidence.',
        'Relaxing an edge permanently finalizes its endpoint.'
      ),
      skill(
        'dsa2-dijkstra',
        'Run Dijkstra only under compatible nonnegative weights and stale-entry handling.',
        'Dijkstra works with negative edges if no negative cycle exists.'
      ),
      skill(
        'dsa2-bellman-ford',
        'Use repeated relaxation to find shortest paths and reachable negative-cycle evidence.',
        'Bellman-Ford reports every negative cycle in the graph.'
      ),
      skill(
        'dsa2-dag-shortest',
        'Exploit topological order for weighted DAG shortest paths including negative edges.',
        'Negative weights always require Bellman-Ford.'
      ),
      skill(
        'dsa2-path-correctness',
        'Validate reported cost, edge sequence, reachability, and algorithm preconditions.',
        'Matching a distance value proves the reconstructed path.'
      ),
    ]
  ),
  module(
    'dsa2-minimum-spanning',
    'Minimum Spanning Trees and Network Design',
    'Connect sites at minimum build cost while explaining redundancy limits.',
    'a minimum-network design and sensitivity brief',
    [
      skill(
        'dsa2-cut-property',
        'Use safe-edge cut arguments to justify minimum-spanning-tree choices.',
        'The lightest remaining edge is always safe.'
      ),
      skill(
        'dsa2-kruskal',
        'Run Kruskal with deterministic edge ordering and disjoint-set cycle prevention.',
        'Kruskal requires a connected input to produce useful output.'
      ),
      skill(
        'dsa2-prim',
        'Run Prim with frontier priorities and stale-entry handling.',
        'Prim and Dijkstra maintain the same path distances.'
      ),
      skill(
        'dsa2-mst-nonuniqueness',
        'Detect ties and avoid claiming uniqueness without sufficient weight conditions.',
        'Every weighted graph has one unique MST.'
      ),
      skill(
        'dsa2-mst-limitations',
        'Distinguish minimum construction cost from shortest routes, resilience, and capacity.',
        'An MST is the best operational network.'
      ),
    ]
  ),
  module(
    'dsa2-greedy-design',
    'Greedy Algorithms and Exchange Arguments',
    'Allocate rooms, bandwidth, and deadlines under competing local choices.',
    'a greedy-design decision and proof notebook',
    [
      skill(
        'dsa2-greedy-choice',
        'Define a locally optimal choice and the remaining subproblem precisely.',
        'Choosing the largest immediate gain is universally greedy.'
      ),
      skill(
        'dsa2-optimal-substructure',
        'Distinguish optimal substructure from the stronger greedy-choice property.',
        'Optimal substructure guarantees a greedy solution.'
      ),
      skill(
        'dsa2-exchange-proof',
        'Transform an optimal solution to include the greedy choice without worsening it.',
        'An exchange proof may assume the transformed solution remains feasible.'
      ),
      skill(
        'dsa2-greedy-counterexample',
        'Construct smallest counterexamples for plausible but invalid heuristics.',
        'A heuristic that works on sample data is a greedy algorithm.'
      ),
      skill(
        'dsa2-interval-huffman',
        'Apply proven greedy structures to interval scheduling and prefix-code construction.',
        'All interval problems use earliest-start choice.'
      ),
    ]
  ),
  module(
    'dsa2-dynamic-programming',
    'Dynamic Programming States, Transitions, and Reconstruction',
    'Optimize resource allocation where overlapping choices defeat local heuristics.',
    'a bottom-up optimizer with reconstructed decisions',
    [
      skill(
        'dsa2-dp-subproblems',
        'Define minimal subproblem state that preserves all future-relevant information.',
        'More state dimensions always make a DP more correct.'
      ),
      skill(
        'dsa2-dp-recurrence',
        'Derive transitions from exhaustive final choices and valid base cases.',
        'A recurrence is correct because it resembles known DP code.'
      ),
      skill(
        'dsa2-memo-tabulation',
        'Choose memoization or tabulation from reachability, order, depth, and memory needs.',
        'Top-down and bottom-up always evaluate identical states.'
      ),
      skill(
        'dsa2-dp-reconstruction',
        'Store or recompute choices to recover an optimal solution, not only its value.',
        'The optimal score uniquely identifies chosen items.'
      ),
      skill(
        'dsa2-dp-correctness',
        'Prove state meaning and transition completeness by induction.',
        'Testing many inputs replaces a DP correctness argument.'
      ),
    ]
  ),
  module(
    'dsa2-dp-optimization',
    'Advanced Dynamic Programming and State Compression',
    'Scale sequence alignment and constrained-selection models beyond naive tables.',
    'an optimized DP with equivalence evidence',
    [
      skill(
        'dsa2-sequence-dp',
        'Model longest-common-subsequence and edit-distance choices with boundary rows and reconstruction.',
        'Greedy character matching always yields a longest subsequence.'
      ),
      skill(
        'dsa2-knapsack-variants',
        'Distinguish zero-one, unbounded, subset-sum, and value-indexed knapsack states.',
        'One knapsack loop order works for every variant.'
      ),
      skill(
        'dsa2-space-compression',
        'Compress DP rows only when overwritten states are no longer needed.',
        'Any two-dimensional DP can use one row safely.'
      ),
      skill(
        'dsa2-loop-order',
        'Derive iteration order from transition dependencies rather than coding habit.',
        'Loop order affects speed but not semantics.'
      ),
      skill(
        'dsa2-dp-bounds',
        'Estimate pseudo-polynomial state growth and reject impractical exact models.',
        'Polynomial in a numeric value is polynomial in input length.',
        'conceptual',
        'analyze'
      ),
    ]
  ),
  module(
    'dsa2-backtracking-branch-bound',
    'Backtracking, Constraint Propagation, and Branch-and-Bound',
    'Search schedules and assignments while proving why pruned branches cannot help.',
    'a bounded combinatorial solver with pruning audit',
    [
      skill(
        'dsa2-search-state',
        'Define partial assignments, legal extensions, completion, and undo invariants.',
        'Copying all state is required for correct backtracking.'
      ),
      skill(
        'dsa2-pruning-soundness',
        'Prune only with a condition that cannot remove a valid or better solution.',
        'A branch that looks unlikely may be discarded safely.'
      ),
      skill(
        'dsa2-variable-ordering',
        'Use constrained-first and value-order heuristics without confusing speed with correctness.',
        'A heuristic ordering changes the solution set.'
      ),
      skill(
        'dsa2-branch-bound',
        'Maintain incumbent solutions and optimistic bounds for optimization search.',
        'Any estimated score is a valid pruning bound.'
      ),
      skill(
        'dsa2-search-instrumentation',
        'Measure expanded nodes, pruned reasons, depth, and incumbent improvements.',
        'Elapsed time alone explains search behavior.'
      ),
    ]
  ),
  module(
    'dsa2-string-algorithms',
    'Linear-Time String Search and Prefix Structure',
    'Scan large logs for many repeated patterns without repeated restart work.',
    'a verified prefix-based matching engine',
    [
      skill(
        'dsa2-prefix-function',
        'Compute prefix-function fallback lengths while preserving matched-prefix meaning.',
        'Fallback always resets matching to zero.'
      ),
      skill(
        'dsa2-kmp',
        'Use prefix evidence to avoid rechecking characters in Knuth-Morris-Pratt search.',
        'KMP skips text characters that might begin a match.'
      ),
      skill(
        'dsa2-rolling-hash',
        'Use rolling hashes with explicit modulus, collision verification, and numeric limits.',
        'Equal hashes prove equal substrings.'
      ),
      skill(
        'dsa2-multi-pattern-trie',
        'Extend trie state with failure transitions for multi-pattern matching.',
        'Running one trie lookup from each text position is linear.'
      ),
      skill(
        'dsa2-string-adversaries',
        'Construct repeated-prefix, Unicode, empty-pattern, and collision-heavy cases.',
        'Natural-language samples expose worst-case string behavior.'
      ),
    ]
  ),
  module(
    'dsa2-network-flow-matching',
    'Network Flow, Cuts, and Bipartite Matching',
    'Assign workers to constrained jobs and identify capacity bottlenecks.',
    'a flow-based assignment model and cut explanation',
    [
      skill(
        'dsa2-flow-model',
        'Translate capacities, conservation, source, sink, and residual choices from a stakeholder problem.',
        'Every graph optimization problem is naturally a flow network.'
      ),
      skill(
        'dsa2-residual-graph',
        'Trace forward and reverse residual capacity after augmentation.',
        'A reverse residual edge means physical flow moves backward.'
      ),
      skill(
        'dsa2-augmenting-path',
        'Find augmenting paths and update flow without violating capacity or conservation.',
        'Any source-to-sink path increases flow by one.'
      ),
      skill(
        'dsa2-maxflow-mincut',
        'Use a final residual reachability cut as optimality evidence.',
        'Maximum flow and minimum cut are the same edge set.'
      ),
      skill(
        'dsa2-bipartite-matching',
        'Reduce bipartite matching to flow and reconstruct matched stakeholder pairs.',
        'A maximum matching assigns every participant.'
      ),
    ]
  ),
  module(
    'dsa2-randomized-approximation',
    'Randomized Algorithms, Approximation, and Honest Guarantees',
    'Choose scalable methods when exact optimization is too expensive or adversarial.',
    'a probabilistic and approximation guarantee report',
    [
      skill(
        'dsa2-randomized-models',
        'Distinguish Las Vegas and Monte Carlo guarantees, failure probability, and expected cost.',
        'Randomized algorithms are merely nondeterministic heuristics.'
      ),
      skill(
        'dsa2-random-pivots',
        'Analyze random pivot selection against input-order adversaries and seeded tests.',
        'Random pivots guarantee balanced partitions.'
      ),
      skill(
        'dsa2-probability-amplification',
        'Reduce independent error probability through repeated trials and justified aggregation.',
        'Repeating correlated trials multiplies confidence.'
      ),
      skill(
        'dsa2-approximation-ratio',
        'State objective direction and worst-case approximation ratio relative to optimum.',
        'A solution within ten units has a ten-percent guarantee.'
      ),
      skill(
        'dsa2-guarantee-communication',
        'Report assumptions, randomness source, error chance, quality bound, and observed evidence separately.',
        'Observed good quality proves the theoretical guarantee.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  module(
    'dsa2-complexity-limits',
    'Complexity Classes, Reductions, and Feasibility Boundaries',
    'Explain why a requested exact optimizer needs changed scope or a bounded alternative.',
    'a feasibility and reduction decision memo',
    [
      skill(
        'dsa2-decision-problems',
        'Translate optimization questions to decision form without losing the threshold meaning.',
        'Decision and optimization versions always have identical implementations.'
      ),
      skill(
        'dsa2-p-np',
        'Describe polynomial verification and solution concepts without claiming unresolved equalities.',
        'NP means not polynomial.'
      ),
      skill(
        'dsa2-reductions',
        'Map instances and answers through a polynomial reduction in the correct hardness direction.',
        'Reducing an easy problem to a hard problem proves the easy one hard.'
      ),
      skill(
        'dsa2-hardness-response',
        'Choose exact bounded, parameterized, approximation, or heuristic responses from constraints.',
        'NP-hard means no useful solution can exist.',
        'strategic',
        'evaluate'
      ),
      skill(
        'dsa2-feasibility-communication',
        'Explain computational limits with options and evidence rather than jargon or certainty.',
        'Naming NP-hardness ends stakeholder discussion.',
        'professional',
        'create'
      ),
    ]
  ),
  module(
    'dsa2-capstone',
    'Advanced Algorithm Engineering Capstone',
    'Build and defend a planning engine across graph, optimization, and uncertain-load requirements.',
    'an advanced algorithm system with proof and operations packet',
    [
      skill(
        'dsa2-algorithm-portfolio',
        'Compare exact, approximate, randomized, and baseline candidates under one evidence model.',
        'Only the asymptotically best candidate deserves implementation.',
        'strategic',
        'evaluate'
      ),
      skill(
        'dsa2-proof-test-bridge',
        'Connect proof obligations to executable invariants, oracle comparisons, and counterexamples.',
        'Formal reasoning and testing are interchangeable.'
      ),
      skill(
        'dsa2-resource-budget',
        'Enforce time, memory, recursion, and output budgets under adversarial scale.',
        'Average benchmark performance sets a safe resource ceiling.'
      ),
      skill(
        'dsa2-failure-operations',
        'Design timeout, partial-result, retry, and diagnostic behavior without corrupting claims.',
        'An algorithm failure should always retry unchanged.'
      ),
      skill(
        'dsa2-review-defense',
        'Defend correctness, cost, alternatives, limits, and operational behavior to a technical review board.',
        'A complex implementation demonstrates advanced mastery.',
        'professional',
        'create'
      ),
    ]
  ),
];

export const pythonFunctionalConfig = buildCourse({
  id: 'python-functional',
  title: 'Functional Programming in Modern Python',
  version: '2026.1',
  audience: {
    description:
      'Python developers ready to design transformation-heavy systems with explicit effects, reusable callables, lazy data flow, and law-oriented tests.',
    entryKnowledge: [
      'Write tested Python functions, collections, modules, exceptions, and type annotations.',
      'Explain object identity, aliasing, iteration, and ordinary imperative control flow.',
    ],
    deviceConstraints: [
      'Keyboard-only completion is supported.',
      'All programs run in the local browser Python worker without host access.',
    ],
    accessibilityAssumptions: [
      'Execution traces and pipeline diagrams have structured text equivalents.',
      'No task depends on color, pointer precision, audio, or time pressure.',
    ],
  },
  prerequisiteCourseIds: ['python-basics', 'python-oop'],
  scope: {
    includes: [
      'functional problem decomposition and explicit effect boundaries',
      'pure transformations, immutable updates, and function composition',
      'iterators, generators, itertools, functools, closures, and decorators',
      'result modeling, pattern matching, property tests, and functional-core architecture',
    ],
    excludes: [
      'introductory Python syntax already assessed in prerequisite courses',
      'category theory notation beyond what production design decisions require',
    ],
    nextCourses: ['python-dsa', 'build-ai-agent-python'],
  },
  sources: pythonFunctionalSources,
  modules: functionalModules,
  projectSpecs: [
    {
      id: 'fp-project-price-audit',
      title: 'Pure Pricing and Audit Pipeline',
      afterModuleId: 'functional-callables-composition',
      stakeholder:
        'A cooperative store needs repeatable pricing decisions after a mutation incident',
      userNeed:
        'Transform orders, discounts, and validation outcomes without hidden state and prove rerun equivalence.',
      constraints: [
        'Inputs remain unchanged after every run.',
        'Effect boundaries and invalid cases are inspectable.',
        'Changed pricing rules require local composition changes.',
      ],
      rubricDimensions: [
        'Purity and alias safety',
        'Composition contracts and tests',
        'Stakeholder audit clarity',
      ],
    },
    {
      id: 'fp-project-stream-monitor',
      title: 'Bounded Stream Monitor',
      afterModuleId: 'functional-itertools-streams',
      stakeholder: 'A facilities team receives an open-ended sensor event stream',
      userNeed:
        'Produce rolling summaries with bounded memory, cancellation, and malformed-record evidence.',
      constraints: [
        'Unbounded streams are never materialized.',
        'Early termination releases resources.',
        'Window and grouping edge cases are tested.',
      ],
      rubricDimensions: [
        'Lazy evaluation correctness',
        'Resource bounds and cleanup',
        'Changed-stream evidence',
      ],
    },
    {
      id: 'fp-project-validation-engine',
      title: 'Composable Intake Validation Engine',
      afterModuleId: 'functional-errors-results',
      stakeholder: 'A community service intake team must explain every rejected record',
      userNeed:
        'Compose validators and decorators while returning explicit success and failure data.',
      constraints: [
        'Expected failures remain typed data.',
        'Decorator ordering is observable and tested.',
        'Batch policy states fail-fast versus accumulation.',
      ],
      rubricDimensions: [
        'Explicit result modeling',
        'Transparent reusable callables',
        'Human-usable failure evidence',
      ],
    },
    {
      id: 'fp-project-decision-service',
      title: 'Functional Decision Service',
      afterModuleId: 'functional-architecture-capstone',
      stakeholder: 'An operations group needs a maintainable transformation service',
      userNeed:
        'Deliver a functional core, imperative shell, property suite, and evidence-backed migration plan.',
      constraints: [
        'Core decisions are deterministic under injected dependencies.',
        'Characterization tests prove preserved behavior.',
        'Operational effects, limits, and diagnostics remain explicit.',
      ],
      rubricDimensions: [
        'Architecture boundary quality',
        'Law and regression evidence',
        'Operational and maintenance defense',
      ],
    },
  ],
  examContext:
    'Independently repair and extend unfamiliar functional Python systems, trace lazy evaluation and closures, test claimed laws, and defend effect boundaries under changed constraints.',
});

export const pythonDsaConfig = buildCourse({
  id: 'python-dsa',
  title: 'Data Structures and Algorithms in Python',
  version: '2026.1',
  audience: {
    description:
      'Python developers who need durable algorithmic reasoning, implementation skill, counterexample habits, and evidence-based data-structure selection.',
    entryKnowledge: [
      'Write tested Python classes and functions using collections, recursion, and type annotations.',
      'Use basic algebra and explain ordinary program control flow.',
    ],
    deviceConstraints: [
      'Keyboard-only completion is supported.',
      'Benchmarks and programs run in a local browser worker with bounded inputs.',
    ],
    accessibilityAssumptions: [
      'Every structure diagram has an ordered text trace.',
      'No assessment relies on animation speed, color, or drag-only interaction.',
    ],
  },
  prerequisiteCourseIds: ['python-basics', 'python-oop'],
  scope: {
    includes: [
      'algorithm contracts, correctness evidence, complexity, and benchmarking',
      'linear structures, hash tables, trees, heaps, tries, and graph representations',
      'sorting, searching, recursion, traversal, components, cycles, and path reconstruction',
      'invariant testing, adversarial inputs, composite design, and stakeholder defense',
    ],
    excludes: [
      'advanced optimization, flow, approximation, and complexity reductions reserved for the sequel',
      'language syntax and object design already assessed by prerequisites',
    ],
    nextCourses: ['python-dsa-2', 'build-maze-solver-python', 'c-memory-management'],
  },
  sources: dsaSources,
  modules: dsaModules,
  projectSpecs: [
    {
      id: 'dsa-project-buffer-engine',
      title: 'Reliable Event Buffer Engine',
      afterModuleId: 'dsa-stacks-queues-deques',
      stakeholder: 'A monitoring team needs predictable history and alert-window operations',
      userNeed:
        'Implement and compare sequence, linked, stack, queue, and deque structures under boundary workloads.',
      constraints: [
        'Every structure publishes its invariant.',
        'Operation sequences include underflow and capacity edges.',
        'Selection is defended from measured workload evidence.',
      ],
      rubricDimensions: [
        'ADT correctness and invariants',
        'Complexity and benchmark reasoning',
        'Workload-driven choice',
      ],
    },
    {
      id: 'dsa-project-record-index',
      title: 'Collision-Resistant Record Index',
      afterModuleId: 'dsa-search-selection',
      stakeholder: 'A records office needs fast duplicate, ordering, and threshold queries',
      userNeed:
        'Combine hashing, sorting, and boundary-safe search with explicit worst-case handling.',
      constraints: [
        'Collision-heavy cases remain correct.',
        'Stable tie policy is documented.',
        'Baseline and optimized outputs agree.',
      ],
      rubricDimensions: [
        'Lookup and ordering correctness',
        'Adversarial-case evidence',
        'Optimization justification',
      ],
    },
    {
      id: 'dsa-project-route-index',
      title: 'Route and Prefix Index',
      afterModuleId: 'dsa-graph-applications',
      stakeholder:
        'A transit information team needs route reachability and stop-name prefix lookup',
      userNeed:
        'Deliver graph traversal, path reconstruction, dependency checks, and a normalized prefix index.',
      constraints: [
        'Direction and normalization policy are explicit.',
        'Unreachable and cyclic cases return evidence.',
        'Paths and suggestions are bounded and reproducible.',
      ],
      rubricDimensions: [
        'Graph and trie invariants',
        'Path and prefix evidence',
        'Domain-model accuracy',
      ],
    },
    {
      id: 'dsa-project-dispatch-system',
      title: 'Multi-Workload Dispatch System',
      afterModuleId: 'dsa-capstone',
      stakeholder: 'An incident center needs lookup, priority, update, and route operations',
      userNeed:
        'Select and combine structures while preserving synchronized state and operational diagnostics.',
      constraints: [
        'Composite invariants are executable.',
        'Adversarial scale matches analytical expectations.',
        'Alternatives and recovery behavior are defended.',
      ],
      rubricDimensions: [
        'Composite correctness',
        'Scale and failure validation',
        'Technical design defense',
      ],
    },
  ],
  examContext:
    'Independently specify, implement, trace, test, benchmark, and defend unfamiliar algorithms and data structures under empty, duplicate, adversarial, and changed-scale cases.',
});

export const pythonDsa2Config = buildCourse({
  id: 'python-dsa-2',
  title: 'Advanced Algorithm Design in Python',
  version: '2026.1',
  audience: {
    description:
      'Developers who already implement foundational structures and now need proof-driven graph, optimization, randomized, approximation, and feasibility techniques.',
    entryKnowledge: [
      'Implement and analyze foundational sorting, searching, trees, heaps, hash tables, and graph traversals.',
      'State invariants, build adversarial cases, and benchmark geometric input sizes.',
    ],
    deviceConstraints: [
      'Keyboard-only completion is supported.',
      'All solvers use bounded local browser-worker instances and deterministic seeds.',
    ],
    accessibilityAssumptions: [
      'Proofs, graphs, tables, and residual networks have structured text forms.',
      'No task depends on visual-only geometry, color, audio, or time pressure.',
    ],
  },
  prerequisiteCourseIds: ['python-dsa'],
  scope: {
    includes: [
      'proof techniques, amortized analysis, balanced trees, and disjoint sets',
      'strong components, shortest paths, spanning trees, greedy design, and dynamic programming',
      'backtracking, string algorithms, network flow, matching, randomization, and approximation',
      'complexity boundaries, feasibility communication, resource budgets, and advanced review defense',
    ],
    excludes: [
      'foundational structure implementation already assessed in the prerequisite',
      'research-level algorithm theory without an applied implementation or decision artifact',
    ],
    nextCourses: ['c-memory-management', 'rag-retrieval-augmented-generation', 'capstone-project'],
  },
  sources: advancedDsaSources,
  modules: advancedDsaModules,
  projectSpecs: [
    {
      id: 'dsa2-project-dynamic-index',
      title: 'Predictable Dynamic Index',
      afterModuleId: 'dsa2-disjoint-sets',
      stakeholder:
        'A data platform needs ordered queries and changing connectivity with bounded long-run cost',
      userNeed:
        'Combine balanced indexing and disjoint-set operations with formal and measured amortized evidence.',
      constraints: [
        'Every cached field has an update invariant.',
        'Adversarial operation sequences are retained.',
        'Amortized claims distinguish sequence cost from worst-case latency.',
      ],
      rubricDimensions: [
        'Structural and amortized correctness',
        'Counterexample quality',
        'Operational cost communication',
      ],
    },
    {
      id: 'dsa2-project-network-planner',
      title: 'Weighted Network Planning Board',
      afterModuleId: 'dsa2-minimum-spanning',
      stakeholder: 'A regional planner must compare route, connection, and dependency decisions',
      userNeed:
        'Deliver strong-component, shortest-path, and minimum-spanning analyses with precondition and limitation evidence.',
      constraints: [
        'Algorithm choice follows weight and direction conditions.',
        'Paths, cycles, and cuts are concrete artifacts.',
        'Minimum cost is not misreported as resilience.',
      ],
      rubricDimensions: [
        'Graph algorithm correctness',
        'Witness and proof evidence',
        'Planning interpretation',
      ],
    },
    {
      id: 'dsa2-project-constraint-optimizer',
      title: 'Constraint and Allocation Optimizer',
      afterModuleId: 'dsa2-network-flow-matching',
      stakeholder: 'A staffing group needs feasible assignments and transparent tradeoffs',
      userNeed:
        'Compare greedy, dynamic-programming, search, and flow models on changed constraints.',
      constraints: [
        'State and pruning rules are explicit.',
        'Assignments reconstruct stakeholder-facing decisions.',
        'Exact-model limits trigger a documented alternative.',
      ],
      rubricDimensions: [
        'Optimization model quality',
        'Correctness and pruning defense',
        'Changed-constraint usefulness',
      ],
    },
    {
      id: 'dsa2-project-planning-engine',
      title: 'Bounded Planning Engine',
      afterModuleId: 'dsa2-capstone',
      stakeholder: 'A technical review board needs a safe optimizer under uncertain scale',
      userNeed:
        'Ship exact, approximate, or randomized behavior with honest guarantees, budgets, and failure operations.',
      constraints: [
        'Guarantees and empirical outcomes are reported separately.',
        'Timeout and partial-result semantics preserve truth.',
        'Baseline, proof, tests, and resource evidence agree.',
      ],
      rubricDimensions: [
        'Algorithm portfolio judgment',
        'Guarantee and resource integrity',
        'Review-board defense',
      ],
    },
  ],
  examContext:
    'Independently prove, implement, compare, and operate unfamiliar advanced algorithms across graph, optimization, randomized, approximation, and computational-limit scenarios.',
});

export const pythonSpecializationConfigs = [
  pythonFunctionalConfig,
  pythonDsaConfig,
  pythonDsa2Config,
];

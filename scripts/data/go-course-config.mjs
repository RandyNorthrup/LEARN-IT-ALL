import { finalizeCourse, module, project, skill } from './course-config-helpers.mjs';

const REVIEWED_AT = '2026-07-14';
const RESEARCHED_AT = '2026-07-14T14:30:00.000Z';

const modules = [
  module(
    'go-toolchain-programs-packages',
    'Go 1.26 Toolchain, Programs, Packages, and Evidence',
    'A small operations team needs a reproducible status tool, but its source, package boundary, formatter, build, runtime, and release identity are unclear.',
    'a reproducible first-program and toolchain evidence record',
    [
      skill(
        'go-program-package-main',
        'Explain how source files, package declarations, imports, init order, and package main produce an executable program.',
        'Every Go source file is an independently executable script.',
        'conceptual',
        'explain'
      ),
      skill(
        'go-toolchain-commands',
        'Choose and interpret go run, build, install, test, fmt, vet, doc, env, version, and help evidence for a bounded task.',
        'go run and go build produce the same durable artifact and evidence.',
        'procedural',
        'apply'
      ),
      skill(
        'go-source-lexical-rules',
        'Apply UTF-8 source, identifiers, keywords, tokens, semicolon insertion, comments, and formatting rules without relying on visual coincidence.',
        'A newline can be inserted anywhere because gofmt always repairs it.',
        'conceptual',
        'analyze'
      ),
      skill(
        'go-version-runtime-boundary',
        'Separate language version, toolchain version, runtime behavior, GOOS and GOARCH target, and browser-interpreter limitations.',
        'Code accepted by one interpreter proves compatibility with every current Go toolchain and target.',
        'strategic',
        'evaluate'
      ),
      skill(
        'go-first-evidence-loop',
        'Predict output, run the smallest program, inspect diagnostics, change one input, and preserve a regression assertion.',
        'One successful hello-world run demonstrates programming mastery.',
        'metacognitive',
        'apply'
      ),
    ]
  ),
  module(
    'go-values-variables-types',
    'Values, Variables, Constants, Types, Zero Values, and Pointers',
    'A configuration loader must distinguish omitted values, explicit zeroes, constants, aliases, defined types, conversions, and optional fields.',
    'a typed configuration and value-semantics model',
    [
      skill(
        'go-basic-types-zero-values',
        'Use booleans, strings, integers, floating-point, complex values, bytes, runes, and their zero values with explicit domain meaning.',
        'A zero value is always invalid and should be replaced immediately.'
      ),
      skill(
        'go-declarations-assignment-scope',
        'Choose var, short declaration, assignment, multiple assignment, and lexical scope while detecting shadowed state.',
        'The short declaration operator always creates every name on its left side.'
      ),
      skill(
        'go-constants-iota-representation',
        'Use typed and untyped constants, iota, representability, and explicit conversion without hiding unit or overflow risk.',
        'Untyped constants use one fixed machine representation.'
      ),
      skill(
        'go-defined-alias-conversion-types',
        'Distinguish defined types, aliases, underlying types, assignability, conversion, and type identity.',
        'Two defined types with the same underlying representation are freely assignable.'
      ),
      skill(
        'go-pointers-new-optionals',
        'Use addresses, dereferencing, pointer parameters, escape-aware ownership, and Go 1.26 new(expression) optionals deliberately.',
        'A pointer automatically provides shared mutable ownership and nil safety.',
        'strategic',
        'analyze'
      ),
    ]
  ),
  module(
    'go-control-flow-defer',
    'Expressions, Control Flow, Iteration, Switches, and Deferred Work',
    'A retry policy must classify states, bound attempts, accumulate evidence, and guarantee cleanup across early returns.',
    'a bounded retry and classification engine',
    [
      skill(
        'go-operators-evaluation',
        'Trace arithmetic, comparison, logical, bitwise, shift, precedence, conversion, and evaluation-order guarantees from concrete values.',
        'Operands and function arguments always evaluate strictly left to right.'
      ),
      skill(
        'go-if-initializers',
        'Use if statements with optional initializers and narrow variable scope around the decision they support.',
        'A variable declared in an if initializer remains available after the if statement.'
      ),
      skill(
        'go-for-range-iteration',
        'Build bounded for loops and range loops while reasoning about copied iteration values, indexes, order, and Go 1.22 loop variables.',
        'Range always yields references to stable collection elements in a deterministic order.'
      ),
      skill(
        'go-switch-type-select-control',
        'Choose expression switches, type switches, labeled control, and select only when their matching and termination behavior is explicit.',
        'Go switch cases fall through by default like C switch cases.'
      ),
      skill(
        'go-defer-order-capture',
        'Predict deferred-call argument capture, last-in-first-out execution, named-result interaction, and cleanup timing.',
        'A deferred call evaluates all arguments only when the surrounding function returns.',
        'procedural',
        'analyze'
      ),
    ]
  ),
  module(
    'go-functions-closures-contracts',
    'Functions, Multiple Results, Closures, Recursion, and Contracts',
    'A rule engine needs small composable functions, explicit failure results, isolated stateful closures, and bounded recursive traversal.',
    'a composable rule and transformation library',
    [
      skill(
        'go-function-signatures-values',
        'Design function signatures, named types, parameters, results, and first-class function values around one responsibility.',
        'Parameter names participate in function type identity.'
      ),
      skill(
        'go-multiple-results-blank',
        'Use multiple results and the blank identifier without discarding failure or evidence that the caller needs.',
        'Ignoring a returned error is harmless when another result looks usable.'
      ),
      skill(
        'go-variadic-forwarding',
        'Define and call variadic functions, distinguish the slice parameter, and forward existing slices with explicit ownership.',
        'Passing a slice to a variadic function never aliases its backing array.'
      ),
      skill(
        'go-closures-capture-lifetime',
        'Build closures while tracing captured variables, independent state, loop capture, lifetime, and concurrency risk.',
        'Each closure automatically receives a frozen copy of every captured value.'
      ),
      skill(
        'go-recursion-bounds',
        'Use recursion only with a demonstrable base case, progress measure, depth bound, and iterative comparison.',
        'A logically correct recursive definition cannot exhaust stack or time.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  module(
    'go-arrays-slices-memory',
    'Arrays, Slices, Backing Storage, Append, Copy, and Capacity',
    'A batch processor must window records, grow buffers, preserve caller data, and avoid retention or aliasing defects.',
    'an alias-safe batch and buffer toolkit',
    [
      skill(
        'go-arrays-value-semantics',
        'Use arrays as fixed-length value types and explain how length participates in type identity and copying.',
        'Arrays and slices have the same assignment and parameter semantics.'
      ),
      skill(
        'go-slice-header-nil-empty',
        'Reason about slice length, capacity, backing storage, nil slices, empty non-nil slices, and observable API differences.',
        'Every zero-length slice is nil and serializes identically.'
      ),
      skill(
        'go-slicing-full-expressions',
        'Use two-index and full slice expressions while proving bounds, capacity, and append authority.',
        'A subslice owns only its visible elements and cannot affect hidden capacity.'
      ),
      skill(
        'go-append-copy-aliasing',
        'Predict whether append reuses or replaces storage and use copy or clone patterns to establish ownership.',
        'append always allocates a new backing array.'
      ),
      skill(
        'go-slice-retention-growth',
        'Diagnose accidental large-array retention and evaluate preallocation from measured size and growth evidence.',
        'Preallocating the largest imaginable capacity is always the fastest and cheapest choice.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  module(
    'go-maps-strings-unicode',
    'Maps, Strings, Bytes, Runes, Unicode, and Deterministic Results',
    'An incident summarizer must count labels, normalize text, preserve UTF-8, and publish stable output despite unordered maps.',
    'a Unicode-safe deterministic incident summarizer',
    [
      skill(
        'go-map-create-access',
        'Create, update, delete, clear, and query maps while distinguishing missing keys from stored zero values.',
        'A map lookup alone always reveals whether the key existed.'
      ),
      skill(
        'go-map-key-alias-concurrency',
        'Choose comparable key types and explain map reference behavior, iteration instability, mutation rules, and concurrency limits.',
        'Maps are safe for simultaneous reads and writes because they are reference-like.'
      ),
      skill(
        'go-string-bytes-immutability',
        'Treat strings as immutable byte sequences and convert to or from byte slices with explicit allocation and encoding intent.',
        'String length reports the number of user-perceived characters.'
      ),
      skill(
        'go-runes-utf8-range',
        'Decode UTF-8 with range and unicode/utf8 while handling byte indexes, replacement runes, invalid input, and grapheme limits.',
        'One rune always equals one visible character.'
      ),
      skill(
        'go-deterministic-map-output',
        'Produce stable map-derived output by extracting and sorting keys under a documented comparison rule.',
        'Repeated map iteration in one process guarantees the same order.',
        'procedural',
        'apply'
      ),
    ]
  ),
  module(
    'go-structs-methods-composition',
    'Structs, Methods, Method Sets, Embedding, and Composition',
    'A job scheduler needs explicit domain records, validated transitions, method behavior, and composition without accidental promotion.',
    'a validated job-domain model',
    [
      skill(
        'go-struct-fields-literals-tags',
        'Design structs, field visibility, literals, zero states, comparison, and tags as explicit data contracts.',
        'Struct tags enforce validation automatically at compile time.'
      ),
      skill(
        'go-method-receivers',
        'Choose value or pointer receivers from mutation, copying, nil behavior, consistency, and method-set evidence.',
        'Pointer receivers are always faster and therefore always correct.'
      ),
      skill(
        'go-method-sets-addressability',
        'Predict method sets, implicit address-taking, interface satisfaction, and behavior of named pointer and value types.',
        'A value and pointer to that value always satisfy exactly the same interfaces.',
        'conceptual',
        'analyze'
      ),
      skill(
        'go-embedding-promotion',
        'Use embedding for promotion only after resolving name collisions, initialization, API exposure, and substitution limits.',
        'Embedding creates inheritance and makes the outer type a subtype of the embedded type.'
      ),
      skill(
        'go-composition-invariants',
        'Compose small types and constructors so invalid state, ownership, and transitions remain observable and testable.',
        'A constructor can guarantee invariants even when callers may still use a public zero-value struct.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  module(
    'go-interfaces-errors-boundaries',
    'Interfaces, Dynamic Types, Errors, and API Boundaries',
    'A notification service must accept narrow capabilities, preserve error causes, and distinguish nil interfaces from typed nil values.',
    'a capability-oriented notification boundary',
    [
      skill(
        'go-interface-satisfaction',
        'Define small consumer-owned interfaces and use implicit satisfaction without premature abstraction.',
        'Types must explicitly declare that they implement an interface.'
      ),
      skill(
        'go-interface-values-nil',
        'Trace interface dynamic type and value, nil interfaces, typed nil pointers, comparison, and method dispatch.',
        'An interface containing a typed nil pointer compares equal to nil.'
      ),
      skill(
        'go-type-assertions-switches',
        'Use checked type assertions and type switches only where dynamic behavior is part of the boundary contract.',
        'A failed one-result type assertion returns the target type zero value.'
      ),
      skill(
        'go-error-values-wrapping',
        'Create, return, wrap, join, inspect, and classify error values with errors.Is and errors.As while preserving causes.',
        'Matching errors by message text is the most stable classification method.'
      ),
      skill(
        'go-api-capability-boundaries',
        'Place interfaces at consumer boundaries, return concrete useful types, and evaluate mocks, adapters, and evolution cost.',
        'Every exported concrete type should immediately receive a matching interface.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  module(
    'go-failures-resources-recovery',
    'Failure Design, Defer, Panic, Recover, and Resource Ownership',
    'A multi-stage import must close owned resources, preserve partial-progress policy, and avoid converting programming defects into success.',
    'a resource-safe import workflow',
    [
      skill(
        'go-error-contract-design',
        'Design error contracts that state operation, relevant identity, cause, retry meaning, and partial-result policy.',
        'Every error should be logged and wrapped at every call layer.'
      ),
      skill(
        'go-defer-resource-ownership',
        'Acquire and release resources in the owning scope, check close or flush failures when relevant, and avoid loop-defer retention.',
        'defer inside a long loop releases each resource at the end of its iteration.'
      ),
      skill(
        'go-panic-programmer-failures',
        'Reserve panic for unrecoverable invariants or initialization failures and keep expected input failures as errors.',
        'Panic is Go exception handling and should replace ordinary error returns.'
      ),
      skill(
        'go-recover-boundaries',
        'Recover only in the same goroutine at a deliberate isolation boundary, restore invariants, and convert or report the failure honestly.',
        'A recover call anywhere in the process catches panics from every goroutine.'
      ),
      skill(
        'go-failure-regression-evidence',
        'Reproduce the smallest failure, identify its causal layer, repair it, and retain a test or invariant over changed input.',
        'Removing the observed error message proves the underlying defect is fixed.',
        'metacognitive',
        'evaluate'
      ),
    ]
  ),
  module(
    'go-packages-modules-workspaces',
    'Package Design, Modules, Versions, Workspaces, and Dependency Provenance',
    'A team must split a command and library, publish a stable module, test a two-module workspace, and review dependency changes.',
    'a versioned multi-package module plan',
    [
      skill(
        'go-package-api-layout',
        'Organize commands, internal packages, public packages, names, imports, cycles, and documentation around cohesive APIs.',
        'A package named util is a good universal home for unrelated helpers.'
      ),
      skill(
        'go-mod-file-semantics',
        'Interpret module, go, toolchain, require, replace, exclude, retract, and godebug directives without treating local overrides as releases.',
        'A replace directive in a consumer module publishes the replacement for all downstream users.'
      ),
      skill(
        'go-module-version-selection',
        'Explain semantic import versioning, minimal version selection, module graphs, sums, proxies, and private-module boundaries.',
        'Minimal version selection always chooses the newest version available on the internet.',
        'conceptual',
        'analyze'
      ),
      skill(
        'go-workspaces-multimodule',
        'Use go.work for local multi-module development while proving builds remain correct outside the workspace.',
        'A committed go.work file is always required for a multi-module repository.'
      ),
      skill(
        'go-dependency-provenance-upgrades',
        'Review direct and transitive dependency additions, version upgrades, licenses, checksums, vulnerability evidence, and rollback.',
        'A green go mod tidy proves a dependency is trustworthy and necessary.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  module(
    'go-generics-constraints-iterators',
    'Generics, Type Sets, Constraints, Inference, and Iteration',
    'A collection library needs reusable operations without reflection, lost relationships, over-broad constraints, or unreadable APIs.',
    'a constrained reusable collection library',
    [
      skill(
        'go-type-parameters-inference',
        'Define generic functions and types, follow type inference, and retain relationships among parameters and results.',
        'Generics erase all static type relationships at the call site.'
      ),
      skill(
        'go-constraints-type-sets',
        'Build minimal constraints from method elements, unions, underlying-type approximations, comparable, and intersection semantics.',
        'A constraint interface can always be used as an ordinary runtime value type.'
      ),
      skill(
        'go-generic-operations-limits',
        'Use only operations guaranteed by the type set and explain why fields, methods, conversions, and nil differ across type arguments.',
        'Any operation valid for one member of a type set is valid in generic code.'
      ),
      skill(
        'go-generic-design-tradeoffs',
        'Compare generics, interfaces, concrete functions, code generation, and reflection from relationship, performance, and API needs.',
        'Replacing every interface with a type parameter makes code more reusable.'
      ),
      skill(
        'go-iterators-self-constraints-126',
        'Use range-over-function iteration and evaluate Go 1.26 self-referential constraints while preserving cancellation and readability.',
        'A current language feature is automatically supported by every older toolchain and embedded interpreter.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  module(
    'go-testing-fuzzing-quality',
    'Tests, Examples, Fuzzing, Benchmarks, Coverage, and Static Analysis',
    'A parser passes familiar examples but fails malformed UTF-8, aliases caller memory, and regresses under a dependency update.',
    'a layered parser quality dossier',
    [
      skill(
        'go-table-subtests',
        'Write table-driven tests and subtests whose names, fixtures, assertions, and changed cases expose the failed contract.',
        'A table-driven test is automatically clearer than focused individual tests.'
      ),
      skill(
        'go-test-boundaries-doubles',
        'Choose unit, integration, end-to-end, golden, example, and contract tests with narrow fakes at owned boundaries.',
        'Mocking every collaborator produces the most realistic confidence.'
      ),
      skill(
        'go-fuzz-properties-corpus',
        'Define fuzz properties, seed corpora, bounds, failure minimization, and retained regression inputs.',
        'Fuzzing proves the absence of defects once it runs without failure.'
      ),
      skill(
        'go-benchmarks-coverage',
        'Design benchmarks with controlled work and allocations, compare statistically, and interpret coverage as location evidence rather than quality.',
        'A single benchmark number and high statement coverage prove production performance and correctness.'
      ),
      skill(
        'go-fmt-vet-fix-analysis',
        'Gate formatting, tests, vet analyzers, Go 1.26 modernizers, race checks, and relevant static analysis with explicit ownership.',
        'go vet is a complete lint, security, and correctness proof.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  module(
    'go-goroutines-channels-select',
    'Goroutines, Channels, Select, Ownership, and Pipelines',
    'A report pipeline must process bounded work concurrently, preserve result ownership, close channels correctly, and terminate every goroutine.',
    'a bounded concurrent report pipeline',
    [
      skill(
        'go-goroutine-lifecycle',
        'Start goroutines only with named ownership, inputs, outputs, stop conditions, panic boundary, and completion evidence.',
        'Goroutines are free and automatically stop when their caller returns.'
      ),
      skill(
        'go-channel-direction-close',
        'Use unbuffered, buffered, and directional channels while assigning close authority to the sender that knows no values remain.',
        'A receiver should close a channel when it no longer wants values.'
      ),
      skill(
        'go-channel-range-state',
        'Distinguish open, closed, empty, nil, and buffered channel states and interpret two-result receives and range termination.',
        'Receiving from a closed channel blocks forever.'
      ),
      skill(
        'go-select-fairness-timeouts',
        'Use select, nil-channel disabling, default, timers, and explicit deadlines without assuming deterministic ready-case choice.',
        'select always chooses the first ready case in source order.'
      ),
      skill(
        'go-pipeline-fanout-fanin',
        'Build bounded fan-out and fan-in stages with one ownership model, ordered-result policy, error propagation, and leak checks.',
        'Closing the final output channel is enough to stop every upstream stage.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  module(
    'go-context-cancellation-backpressure',
    'Context, Cancellation, Backpressure, Structured Concurrency, and Leaks',
    'A request launches several operations; one fails, one blocks, one outlives the caller, and overload grows without bound.',
    'a cancelable bounded worker group',
    [
      skill(
        'go-context-propagation',
        'Pass context as the first operation parameter across call boundaries and avoid storing it as durable domain state.',
        'A Context belongs in every struct so future methods can reuse it.'
      ),
      skill(
        'go-cancel-deadline-cause',
        'Derive, propagate, call, and observe cancellation, deadlines, timeouts, and causes while releasing timer resources.',
        'Discarding a CancelFunc is harmless because timeout cleanup is immediate.'
      ),
      skill(
        'go-context-values-boundary',
        'Use context values only for request-scoped cross-boundary metadata with collision-safe keys, not optional parameters.',
        'Context values are a type-safe replacement for all function parameters.'
      ),
      skill(
        'go-backpressure-bounded-work',
        'Bound queues and concurrency, choose block, reject, shed, or degrade behavior, and measure saturation.',
        'A larger buffered channel permanently fixes overload.'
      ),
      skill(
        'go-goroutine-leak-diagnosis',
        'Detect leaked goroutines with ownership traces, cancellation tests, profiles, and changed failure cases.',
        'A stable process response proves no goroutines are leaking.',
        'metacognitive',
        'evaluate'
      ),
    ]
  ),
  module(
    'go-memory-model-synchronization',
    'Shared Memory, Mutexes, Atomics, the Memory Model, and Race Evidence',
    'Concurrent workers update shared counters, caches, and snapshots; plausible output hides races and broken publication.',
    'a race-free shared-state component',
    [
      skill(
        'go-data-races-happens-before',
        'Identify conflicting memory operations and establish sequenced-before, synchronized-before, and happens-before evidence.',
        'Plausible output means concurrent reads observed the latest writes.',
        'conceptual',
        'analyze'
      ),
      skill(
        'go-mutex-rwmutex-invariants',
        'Protect one documented invariant with Mutex or RWMutex while minimizing lock scope and avoiding copy or reentrancy errors.',
        'RWMutex is always faster whenever reads outnumber writes.'
      ),
      skill(
        'go-once-cond-coordination',
        'Use Once, OnceValue, Cond, and channel alternatives only when their wakeup, predicate-loop, and failure semantics fit.',
        'One Cond signal permanently records an event for future waiters.'
      ),
      skill(
        'go-atomic-publication',
        'Use typed atomics for isolated counters or immutable snapshot publication and reject multi-variable invariants without coordination.',
        'Making each field atomic makes a compound state transition atomic.'
      ),
      skill(
        'go-race-detector-limits',
        'Run representative workloads with the race detector, interpret reports, retain reproductions, and state unexecuted-path limits.',
        'A clean go test -race run proves every possible execution is race-free.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  module(
    'go-io-serialization-cli',
    'I/O Contracts, Files, Serialization, Time, and Command-Line Programs',
    'A command must stream records, validate JSON, write atomically, handle time and cancellation, and produce useful exit evidence.',
    'a deterministic import and reporting command',
    [
      skill(
        'go-reader-writer-streaming',
        'Compose io.Reader and io.Writer boundaries, buffering, limited reads, copying, and streaming without assuming one read fills a buffer.',
        'Reader.Read always returns either data or an error, never both.'
      ),
      skill(
        'go-files-paths-atomic-write',
        'Open files with explicit ownership and permissions, handle paths safely, and design temp-write, sync, rename, and cleanup evidence.',
        'Writing directly to the destination and calling Close guarantees an atomic durable update.'
      ),
      skill(
        'go-json-encoding-contracts',
        'Encode and decode JSON with field visibility, tags, unknown-field policy, numbers, nulls, optional values, and streaming limits.',
        'Successful json.Unmarshal proves every input field matched the intended schema.'
      ),
      skill(
        'go-time-duration-boundaries',
        'Use time values, durations, locations, monotonic comparisons, timers, tickers, parsing, and serialization with explicit clock assumptions.',
        'A time.Duration stores a calendar-aware number of days and months.'
      ),
      skill(
        'go-cli-flags-exits-signals',
        'Design command flags, stdin/stdout/stderr, exit status, signal cancellation, help, and machine-readable output as an interface contract.',
        'Printing an error to stdout and returning from main guarantees a nonzero exit status.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  module(
    'go-http-services-security',
    'HTTP Services, Clients, Boundaries, Security, and Graceful Shutdown',
    'A small service accepts hostile input, calls a slow dependency, serves concurrent requests, and must shut down without losing work.',
    'a resilient secure HTTP service design',
    [
      skill(
        'go-http-handler-routing',
        'Design Handler and ServeMux boundaries, method and path semantics, request limits, response status, headers, and streaming order.',
        'Writing a response body before WriteHeader still allows any later status code.'
      ),
      skill(
        'go-http-client-lifecycle',
        'Reuse configured clients and transports, set request contexts and timeouts, close bodies, bound reads, and classify status separately from transport errors.',
        'http.Client.Get returns an error for every non-2xx response.'
      ),
      skill(
        'go-service-validation-security',
        'Validate untrusted input, escape output for its sink, minimize authority and data, protect secrets, and set explicit server resource limits.',
        'Using a memory-safe language removes injection, authorization, resource-exhaustion, and logic risks.'
      ),
      skill(
        'go-service-errors-observability',
        'Map internal failures to stable external responses while retaining structured correlation, cause, latency, and privacy-safe logs.',
        'Returning the full internal error text gives clients the most useful and secure diagnosis.'
      ),
      skill(
        'go-graceful-shutdown-readiness',
        'Coordinate signal handling, readiness withdrawal, server shutdown, in-flight deadlines, background-worker completion, and forced-exit evidence.',
        'Calling Server.Close immediately is equivalent to graceful Shutdown.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  module(
    'go-diagnostics-performance-release',
    'Diagnostics, Profiling, Allocation, PGO, Security Gates, and Production Defense',
    'A release is slow under load, grows memory, has a suspected goroutine leak, and includes a dependency advisory.',
    'a measured production release and operations dossier',
    [
      skill(
        'go-runtime-allocation-gc',
        'Explain stack and heap escape, allocation, garbage-collection cost, Go 1.26 Green Tea behavior, and measurement limits without manual-memory myths.',
        'Every pointer allocates on the heap and every allocation should be eliminated.'
      ),
      skill(
        'go-profile-trace-diagnostics',
        'Choose CPU, heap, block, mutex, goroutine, execution trace, metrics, logs, or debugger evidence for the observed question.',
        'A CPU profile is the correct first tool for every latency or memory problem.'
      ),
      skill(
        'go-performance-experiment-pgo',
        'Benchmark a representative baseline, form a causal hypothesis, inspect profiles, change one factor, validate behavior, and evaluate PGO portability.',
        'A microbenchmark improvement guarantees lower production latency.'
      ),
      skill(
        'go-security-supply-chain-release',
        'Gate current toolchain patches, tests, race and fuzz evidence, govulncheck reachability, dependency provenance, reproducible builds, and rollback.',
        'A dependency advisory always proves the built binary is exploitable, while no advisory proves safety.',
        'professional',
        'evaluate'
      ),
      skill(
        'go-capstone-production-defense',
        'Defend a complete Go system through API contracts, failure paths, concurrency ownership, security, diagnostics, deployment, and changed-load evidence.',
        'Passing unit tests is sufficient production-readiness evidence.',
        'metacognitive',
        'evaluate'
      ),
    ]
  ),
];

export const goBasicsConfig = finalizeCourse(
  {
    id: 'go-basics',
    title: 'Modern Go 1.26: Reliable Concurrent Systems',
    version: '2026.07',
    audience: {
      description:
        'New programmers and working developers who need to build, test, secure, diagnose, and defend current Go programs from first execution through production-shaped concurrent services.',
      entryKnowledge: [
        'Navigate files, edit text, use a browser, and follow exact punctuation and indentation.',
        'Reason with basic arithmetic, comparisons, plain-language conditions, and step-by-step procedures; prior programming is helpful but not required.',
      ],
      deviceConstraints: [
        'Core language labs execute locally in browser WebAssembly through a restricted Yaegi interpreter; a physical keyboard is recommended for projects.',
        'Toolchain, filesystem, test-command, network, race-detector, profiler, and deployment work uses deterministic evidence simulations and explicit real-toolchain transfer instructions.',
      ],
      accessibilityAssumptions: [
        'All code, traces, channel timelines, profiles, request flows, tables, and diagnostics require structured text, keyboard operation, announced status, and non-color-only meaning.',
      ],
    },
    scope: {
      includes: [
        'Go language specification through Go 1.26, the Go 1 compatibility model, current toolchain behavior, packages, modules, workspaces, testing, and standard-library design',
        'Cumulative runnable work across values, control flow, functions, collections, Unicode, structs, methods, interfaces, errors, generics, goroutines, channels, context, synchronization, I/O, JSON, and service boundaries',
        'Production practice covering fuzzing, race evidence, security, vulnerability management, HTTP lifecycles, diagnostics, profiling, PGO, release gates, and graceful operations',
      ],
      excludes: [
        'Treating the browser Yaegi subset as proof of full Go 1.26 toolchain compatibility, host access, race-detector behavior, or production performance',
        'Framework-specific certification, kernel implementation, unsafe programming, cgo internals, and exhaustive standard-library API memorization',
      ],
      nextCourses: ['http-clients-go', 'build-pokedex-go', 'build-blog-aggregator-go'],
    },
    sources: [
      {
        title: 'ACM/IEEE-CS/AAAI Computer Science Curricula 2023',
        authority: 'curriculum-framework',
        url: 'https://csed.acm.org/final-report/',
        version: 'CS2023 final report, 2024 publication files',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls institutional software-development breadth, programming-language foundations, algorithms, testing, professional practice, security, systems, and concurrency outcomes.',
      },
      {
        title: 'The Go Programming Language Specification',
        authority: 'official-docs',
        url: 'https://go.dev/ref/spec',
        version: 'Language version go1.26, 2026-01-12',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls lexical, type, declaration, expression, statement, function, method, interface, generic, initialization, and program semantics.',
      },
      {
        title: 'Go 1.26 Release Notes and Release History',
        authority: 'official-docs',
        url: 'https://go.dev/doc/go1.26',
        version: 'Go 1.26.5 stable, released 2026-07-07',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls current language changes, toolchain modernizers, module defaults, Green Tea GC, standard-library changes, compatibility, and supported-platform boundaries.',
      },
      {
        title: 'Go Modules Reference',
        authority: 'official-docs',
        url: 'https://go.dev/ref/mod',
        version: 'Current 2026-07-14 for Go 1.26',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls module, package, version, minimal-version-selection, checksum, proxy, private-module, workspace, and toolchain-directive behavior.',
      },
      {
        title: 'The Go Memory Model and Data Race Detector',
        authority: 'official-docs',
        url: 'https://go.dev/ref/mem',
        version: 'Memory model 2022-06-06; race detector current for Go 1.26',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls data-race definitions, happens-before reasoning, channel and lock synchronization, atomic publication, detector evidence, and limitations.',
      },
      {
        title: 'Go Testing, Fuzzing, and Command Documentation',
        authority: 'official-docs',
        url: 'https://go.dev/doc/tutorial/fuzz',
        version: 'Current 2026-07-14 for Go 1.26',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls unit tests, subtests, examples, fuzz targets and corpora, benchmarks, coverage, test caching, and changed-case quality evidence.',
      },
      {
        title: 'Go Concurrency Patterns: Context, Pipelines, and Cancellation',
        authority: 'official-docs',
        url: 'https://go.dev/blog/pipelines',
        version: 'Official Go guidance reviewed 2026-07-14',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls pipeline ownership, explicit cancellation, context propagation, deadlines, goroutine termination, fan-out, fan-in, and leak prevention.',
      },
      {
        title: 'Security Best Practices for Go Developers',
        authority: 'official-docs',
        url: 'https://go.dev/doc/security/best-practices',
        version: 'Current 2026-07-14',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls patched toolchains, dependency review, govulncheck, fuzzing, race checks, input limits, secrets, and secure release practice.',
      },
      {
        title: 'Go Diagnostics and Profile-Guided Optimization',
        authority: 'official-docs',
        url: 'https://go.dev/doc/diagnostics',
        version: 'Current 2026-07-14 for Go 1.26',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls selection and interpretation of profiles, traces, runtime evidence, debugging, production diagnostics, and PGO experiments.',
      },
      {
        title: 'Go Code Review Comments and Doc Comments',
        authority: 'official-docs',
        url: 'https://go.dev/wiki/CodeReviewComments',
        version: 'Official guidance reviewed 2026-07-14',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls idiomatic API naming, package design, receiver choices, error style, documentation, readability, and maintainable review decisions.',
      },
    ],
    modules,
    projects: [
      project(
        'go-incident-summarizer',
        'Unicode-Safe Incident Summarizer',
        'go-maps-strings-unicode',
        'A support operations lead',
        'The lead needs deterministic counts and summaries from multilingual incident records without aliasing input or confusing bytes, runes, and user-visible text.',
        [
          'go-append-copy-aliasing',
          'go-map-create-access',
          'go-runes-utf8-range',
          'go-deterministic-map-output',
        ]
      ),
      project(
        'go-versioned-parser-library',
        'Versioned Validated Parser Library',
        'go-testing-fuzzing-quality',
        'A platform engineering team',
        'The team needs a documented reusable parser module with narrow APIs, typed errors, generic helpers, examples, changed cases, fuzz properties, and dependency evidence.',
        [
          'go-error-values-wrapping',
          'go-module-version-selection',
          'go-generic-design-tradeoffs',
          'go-fuzz-properties-corpus',
        ]
      ),
      project(
        'go-concurrent-job-orchestrator',
        'Cancelable Concurrent Job Orchestrator',
        'go-memory-model-synchronization',
        'A batch processing team',
        'The team needs bounded parallel work, ordered result policy, failure cancellation, race-free metrics, leak evidence, and overload behavior.',
        [
          'go-pipeline-fanout-fanin',
          'go-backpressure-bounded-work',
          'go-goroutine-leak-diagnosis',
          'go-data-races-happens-before',
        ]
      ),
      project(
        'go-resilient-http-service',
        'Resilient HTTP Intake Service',
        'go-http-services-security',
        'A public-service delivery team',
        'The team needs a bounded intake API with strict validation, stable responses, dependency deadlines, privacy-safe observability, graceful shutdown, and abuse cases.',
        [
          'go-json-encoding-contracts',
          'go-http-client-lifecycle',
          'go-service-validation-security',
          'go-graceful-shutdown-readiness',
        ]
      ),
      project(
        'go-production-capstone',
        'Production Go System Defense',
        'go-diagnostics-performance-release',
        'An engineering review board',
        'The board needs a release candidate defended with language and API contracts, tests, fuzz and race evidence, concurrency ownership, security gates, profiles, deployment signals, and rollback.',
        [
          'go-profile-trace-diagnostics',
          'go-performance-experiment-pgo',
          'go-security-supply-chain-release',
          'go-capstone-production-defense',
        ]
      ),
    ],
    examContext:
      'Unfamiliar command, library, concurrent pipeline, parser, HTTP, dependency, failure, race, diagnostics, and release cases requiring runnable behavior plus causal and operational defense.',
    minimumQuestionBankSize: 540,
  },
  { researchedAt: RESEARCHED_AT, prerequisiteCourseIds: [] }
);

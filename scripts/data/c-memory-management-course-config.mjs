import { finalizeCourse, project, skill } from './course-config-helpers.mjs';

const REVIEWED_AT = '2026-07-14';
const RESEARCHED_AT = '2026-07-14T23:15:00.000Z';

const profiles = [
  [
    'outcomes-evidence-toolchain',
    'C Memory Outcomes, Evidence, and Toolchain Boundaries',
    'A civic sensor team must distinguish a passing browser model from evidence that its native C release is safe on supported targets.',
    'memory-safety evidence and transfer matrix',
    [
      [
        'transfer-evidence-plan',
        'Separate deterministic browser practice from C23 compiler, sanitizer, ABI, concurrency, fuzz, load, and production evidence.',
        'A browser interpreter proves current native compiler, sanitizer, ABI, and operating-system behavior.',
        'metacognitive',
        'evaluate',
      ],
      [
        'c23-version-contract',
        'Pin ISO/IEC 9899:2024, reviewed implementation support, diagnostics, extensions, and target ABI as a compatibility contract.',
        'Selecting a C23 mode makes every C23 facility available and identical on every compiler and library.',
        'conceptual',
        'analyze',
      ],
      [
        'translation-execution-model',
        'Trace source, preprocessing, translation, linking, loading, execution, and observable output without collapsing their failure layers.',
        'If a program starts, every earlier translation and linkage assumption was correct.',
        'conceptual',
        'explain',
      ],
      [
        'memory-safety-properties',
        'Define spatial, temporal, initialization, type, ownership, resource, and concurrency properties as observable claims.',
        'Memory safety means only that a program does not visibly crash.',
        'conceptual',
        'evaluate',
      ],
      [
        'evidence-limits',
        'State what tests, warnings, analyzers, sanitizers, proofs, reviews, and production telemetry can and cannot establish.',
        'One clean sanitizer run proves absence of memory defects.',
        'metacognitive',
        'evaluate',
      ],
    ],
  ],
  [
    'translation-diagnostics',
    'Translation Units, Declarations, Diagnostics, and Linking',
    'A portable telemetry library compiles in one file but fails or silently changes behavior after its API is split across files.',
    'warning-clean multi-file interface dossier',
    [
      [
        'preprocessing-boundaries',
        'Predict macro expansion, conditional compilation, include guards, and header ownership before translation.',
        'The preprocessor follows C scope and type rules.',
        'conceptual',
        'analyze',
      ],
      [
        'declaration-definition-contract',
        'Distinguish declarations, tentative and full definitions, linkage, compatible types, and one-definition responsibilities.',
        'Repeating a declaration and repeating a definition have the same program effect.',
      ],
      [
        'prototype-call-contract',
        'Use complete prototypes and compatible parameter and return types across every caller boundary.',
        'A linker can validate argument count, promotions, and return types between separately translated files.',
      ],
      [
        'diagnostic-baseline',
        'Compile with strict language mode, high-value warnings, warnings as errors, debug information, and a documented extension policy.',
        'No warning means the source has defined behavior and a correct interface.',
        'strategic',
        'evaluate',
      ],
      [
        'link-symbol-forensics',
        'Diagnose duplicate, missing, hidden, weak, and mismatched symbols from object and linker evidence.',
        'Every undefined symbol is caused by forgetting to write the function body.',
        'strategic',
        'analyze',
      ],
    ],
  ],
  [
    'values-integers-overflow',
    'C Values, Integer Conversions, and Size Arithmetic',
    'A binary record parser receives attacker-controlled counts that cross signedness and multiplication boundaries before allocation.',
    'checked size and conversion policy',
    [
      [
        'integer-ranges-ranks',
        'Select integer types from range, signedness, rank, width, and representation requirements rather than familiar spelling.',
        'int, long, and pointers have fixed widths on all supported targets.',
        'conceptual',
        'analyze',
      ],
      [
        'integer-promotions-conversions',
        'Trace integer promotions and usual arithmetic conversions before comparing, shifting, indexing, or sizing.',
        'A negative signed value stays negative when compared with an unsigned size.',
      ],
      [
        'size-ptrdiff-contract',
        'Use size_t for object sizes, ptrdiff_t for valid pointer differences, and guarded conversions at API boundaries.',
        'size_t is always unsigned long and therefore safe for arbitrary subtraction.',
      ],
      [
        'checked-size-arithmetic',
        'Reject overflowing addition, multiplication, alignment, and growth calculations before allocation using portable checked patterns or C23 checked arithmetic.',
        'malloc reports an error when its size expression overflowed before the call.',
      ],
      [
        'bitint-c23-boundary',
        'Evaluate C23 _BitInt and implementation limits without assuming a novel width improves ABI portability.',
        'An exact bit width automatically has the same calling convention and library support everywhere.',
      ],
    ],
  ],
  [
    'objects-storage-lifetime',
    'Objects, Scope, Linkage, Storage Duration, and Lifetime',
    'An embedded controller caches addresses across callbacks while automatic, static, thread, and allocated objects begin and end at different times.',
    'object lifetime and address ledger',
    [
      [
        'object-value-identity',
        'Distinguish an object, its value, representation bytes, address, declared type, and current lifetime.',
        'A pointer value is the object itself.',
      ],
      [
        'scope-linkage-duration',
        'Map scope, linkage, and storage duration independently for block, file, static, thread, and allocated objects.',
        'File scope implies static linkage and immutable lifetime.',
      ],
      [
        'lifetime-begin-end',
        'Identify precisely when each object lifetime begins and ends, including allocated storage and subobjects.',
        'Allocated storage has a live typed object from malloc until free regardless of how it is accessed.',
      ],
      [
        'address-reuse-generation',
        'Treat a reused address as a new lifetime and preserve generation or identity evidence where stale handles are possible.',
        'The same numeric address proves the same object still exists.',
      ],
      [
        'const-volatile-limits',
        'Use const for mutation contracts and volatile only for its defined access semantics, never as ownership or synchronization.',
        'const owns a value and volatile makes concurrent access race-free.',
      ],
    ],
  ],
  [
    'representation-alignment-padding',
    'Bytes, Object Representation, Alignment, Padding, and Endianness',
    'A device protocol works on one architecture but leaks padding and faults on a stricter-alignment target.',
    'portable binary representation codec',
    [
      [
        'byte-object-representation',
        'Inspect object representations through character types while separating value representation, padding, and trap risks.',
        'Every byte pattern is a valid value for every C type.',
        'conceptual',
        'analyze',
      ],
      [
        'alignment-requirements',
        'Compute and satisfy fundamental, extended, member, and allocated alignment requirements before access.',
        'malloc alignment and packed structures make every cast suitably aligned.',
      ],
      [
        'struct-padding-layout',
        'Measure rather than assume member offsets, tail padding, and layout changes across ABI targets.',
        'Structure members are always adjacent in declaration order with no unused bytes.',
      ],
      [
        'endianness-serialization',
        'Encode and decode external integers byte-by-byte or with defined conversion APIs instead of dumping native objects.',
        'Endianness is the only portability problem in raw structure serialization.',
      ],
      [
        'explicit-clearing',
        'Use C23 memset_explicit or a reviewed non-elidable alternative for secrets and verify compiler and library support.',
        'Ordinary memset is guaranteed to remain when the cleared object is no longer read.',
      ],
    ],
  ],
  [
    'arrays-pointers-bounds',
    'Arrays, Pointers, Arithmetic, and Bounds',
    'A raster pipeline slices rows and subviews while changed dimensions expose one-past, negative-offset, and lost-bound defects.',
    'bounded image-slice library',
    [
      [
        'array-pointer-distinction',
        'Preserve array extent where possible and predict array-to-pointer conversion at expressions and parameters.',
        'An array parameter carries its declared bound into the called function.',
      ],
      [
        'pointer-arithmetic-domain',
        'Perform pointer arithmetic only within one array object or one-past it and avoid dereferencing one-past pointers.',
        'Numerically adjacent allocations form one legal pointer-arithmetic range.',
      ],
      [
        'index-bound-invariant',
        'State and check lower and upper index invariants before access, including zero-length and changed-shape cases.',
        'Checking only index < length is sufficient when index may be signed.',
      ],
      [
        'slice-pointer-length',
        'Represent a borrowed slice with pointer, length, mutability, lifetime, and aliasing contracts that travel together.',
        'A non-null pointer reveals how many elements may be read or written.',
      ],
      [
        'multidimensional-stride',
        'Calculate multidimensional offsets with checked dimensions, row stride, element size, and layout evidence.',
        'A pointer-to-pointer is interchangeable with a contiguous two-dimensional array.',
      ],
    ],
  ],
  [
    'strings-bytes-encoding',
    'Strings, Byte Buffers, Length, Capacity, and Encoding',
    'An accessible terminal application receives filenames, UTF-8 labels, and binary payloads through APIs that disagree about termination and length.',
    'length-aware text and byte boundary',
    [
      [
        'string-buffer-distinction',
        'Distinguish C strings, unterminated character arrays, byte buffers, string literals, and encoded text.',
        'Every char pointer names a writable null-terminated string.',
      ],
      [
        'length-capacity-termination',
        'Track logical length, allocated capacity, required terminator space, and maximum scan distance separately.',
        'A capacity of n always permits n visible characters plus a terminator.',
      ],
      [
        'bounded-copy-format',
        'Use size-aware copying and formatting with return-value checks and truncation policy.',
        'Replacing strcpy with strncpy automatically produces a valid terminated string.',
      ],
      [
        'encoding-boundaries',
        'Validate and preserve encoding at system boundaries without splitting multibyte sequences or equating bytes with characters.',
        'char stores one user-visible character.',
      ],
      [
        'legacy-api-defense',
        'Recognize unbounded and ambiguous string APIs as defect-analysis material and migrate them behind tested contracts.',
        'A larger destination makes an unbounded legacy copy safe enough.',
      ],
    ],
  ],
  [
    'structs-unions-flexible-arrays',
    'Structures, Unions, Tagged Variants, and Flexible Arrays',
    'A packet queue combines headers and payloads while a changed variant exposes padding, inactive-union, and size-formula errors.',
    'tagged packet representation',
    [
      [
        'aggregate-invariants',
        'Initialize, copy, compare, and validate structures by members and invariants rather than raw-byte assumptions.',
        'memcmp is a portable semantic equality test for structures.',
      ],
      [
        'tagged-union-access',
        'Pair a union with an explicit discriminant and access only the active, validated member.',
        'Reading a different union member is a portable conversion mechanism for all representations.',
      ],
      [
        'flexible-array-allocation',
        'Allocate flexible-array objects with checked header-plus-elements arithmetic and record their element count.',
        'sizeof a flexible-array structure includes space for the requested payload.',
      ],
      [
        'bitfield-portability',
        'Confine bit-fields to implementation-characterized layouts and use masks for external formats.',
        'Bit-field order and packing follow declaration order on every ABI.',
      ],
      [
        'opaque-structure-evolution',
        'Hide representation behind incomplete types and constructor, observer, mutation, and destructor contracts.',
        'Publishing structure fields cannot constrain future ABI-compatible changes.',
      ],
    ],
  ],
  [
    'functions-callbacks-interfaces',
    'Functions, Callbacks, Context, and Memory Interfaces',
    'A plugin registry invokes callbacks after their contexts change ownership and one implementation uses an incompatible signature.',
    'typed callback and context registry',
    [
      [
        'function-pointer-compatibility',
        'Declare and call function pointers with exactly compatible prototypes and return conventions.',
        'Any function address can be cast and called through any callback type.',
      ],
      [
        'callback-context-lifetime',
        'Bind callback, context pointer, ownership, thread, and unregister lifetime into one interface contract.',
        'Registering a callback copies or extends the life of its context automatically.',
      ],
      [
        'allocator-injection',
        'Inject matched allocate, resize, and release operations with context and failure semantics.',
        'A library may allocate with one heap and let any caller free with another.',
      ],
      [
        'out-parameter-transaction',
        'Leave out-parameters in documented states on success and every failure, with ownership transfer made explicit.',
        'A function that fails before its final line cannot have changed an out-parameter.',
      ],
      [
        'api-contract-documentation',
        'Document nullability, bounds, aliasing, mutation, ownership, lifetime, errors, and thread rules at declarations.',
        'A descriptive function name is a sufficient memory contract.',
        'professional',
        'create',
      ],
    ],
  ],
  [
    'automatic-lifetime-stack',
    'Automatic Storage, Recursion, VLAs, and Escaping Addresses',
    'A recursive document walker succeeds in tests but overflows a constrained worker and returns pointers into expired frames.',
    'bounded stack-use redesign',
    [
      [
        'automatic-object-lifetime',
        'Keep pointers to automatic objects within the execution and subobject lifetimes that make them valid.',
        'A returned pointer remains valid if the stack bytes have not yet been overwritten.',
      ],
      [
        'recursion-depth-budget',
        'Bound recursion by adversarial input depth, frame cost, and target stack limits or replace it with explicit storage.',
        'Tail recursion is guaranteed to consume constant stack space in C.',
      ],
      [
        'vla-risk-policy',
        'Use variable-length arrays only under explicit positive bounds and stack budgets, with portable alternatives.',
        'A VLA allocation fails like malloc and can be checked for null.',
      ],
      [
        'alloca-portability-risk',
        'Treat alloca-like facilities as nonstandard stack allocation with lifetime, overflow, loop, and portability hazards.',
        'alloca is a faster malloc with equivalent failure and release behavior.',
      ],
      [
        'escape-analysis-review',
        'Trace every stored or returned pointer back to its referent lifetime, including compound literals and callback contexts.',
        'Only return statements can cause a local address to escape.',
      ],
    ],
  ],
  [
    'heap-allocator-contracts',
    'Heap Allocation Contracts and Failure Handling',
    'A batch importer assumes allocation succeeds and treats zero-byte requests differently across supported C libraries.',
    'allocation wrapper with explicit outcomes',
    [
      [
        'malloc-calloc-contracts',
        'Apply malloc and calloc size, initialization, alignment, zero-size, and failure contracts without dereferencing assumptions.',
        'calloc is merely malloc followed by a universally equivalent zero value for every type.',
      ],
      [
        'allocation-failure-path',
        'Propagate allocation failure without partial-state leaks, null dereferences, or impossible-error assumptions.',
        'Small allocations cannot fail on a modern virtual-memory system.',
      ],
      [
        'zero-size-policy',
        'Choose and test a project policy for zero elements rather than depending on an implementation-specific returned pointer.',
        'malloc(0) must return null and may therefore be used as a portable emptiness test.',
      ],
      [
        'aligned-allocation',
        'Satisfy size-multiple, alignment, release-family, and implementation-support rules for aligned storage.',
        'Any power-of-two alignment request is portable and free always matches every aligned allocator.',
      ],
      [
        'sized-free-c23',
        'Adopt C23 free_sized and free_aligned_sized only behind exact size, alignment, availability, and fallback contracts.',
        'Supplying an approximate size to a sized deallocation is an optimization-only mistake.',
      ],
    ],
  ],
  [
    'allocation-size-overflow',
    'Allocation Formulas, Overflow, and Capacity Proofs',
    'A scientific grid grows from untrusted dimensions and allocates too little after an apparently reasonable multiplication wraps.',
    'overflow-safe grid allocator',
    [
      [
        'multiply-before-allocation',
        'Prove count times element-size representability before calling allocation functions.',
        'A cast to size_t before multiplication prevents wraparound.',
      ],
      [
        'header-payload-addition',
        'Check header, padding, alignment, terminator, and payload additions in a safe order.',
        'Only multiplication can overflow allocation formulas.',
      ],
      [
        'calloc-overflow-contract',
        'Characterize whether the target calloc detects product overflow while retaining caller-side policy and tests.',
        'Every conforming calloc must diagnose multiplication overflow identically.',
      ],
      [
        'reallocarray-portability',
        'Use POSIX reallocarray where available with feature tests and a portable transactional fallback.',
        'reallocarray is part of every C23 standard library.',
      ],
      [
        'capacity-model-proof',
        'Derive maximum capacity from object limit, element size, metadata, and stakeholder workload before allocation.',
        'If the arithmetic fits size_t, the requested object is operationally acceptable.',
      ],
    ],
  ],
  [
    'ownership-borrowing-contracts',
    'Ownership, Borrowing, Aliasing, and API Contracts',
    'A media index passes buffers through parsers, caches, and callbacks where no component knows who must release or may mutate them.',
    'ownership-annotated buffer API',
    [
      [
        'unique-shared-borrowed',
        'Classify each pointer as unique owner, shared owner, mutable borrow, immutable borrow, weak observation, or non-owning handle.',
        'Pointer syntax reveals ownership automatically.',
      ],
      [
        'transfer-on-success',
        'Make ownership transfer conditional on observable success and leave failure states unambiguous.',
        'Passing a pointer to a function always transfers responsibility to free it.',
      ],
      [
        'borrow-lifetime-bound',
        'Bound every borrow by owner lifetime, mutation rules, callback duration, and asynchronous retention.',
        'const extends a borrowed object lifetime.',
      ],
      [
        'alias-mutation-policy',
        'Prevent surprising mutation through aliases with interface design, copying, or explicit synchronization.',
        'Two restrict-qualified pointers are checked for non-aliasing at runtime.',
      ],
      [
        'ownership-table-review',
        'Review public APIs with an ownership table covering inputs, outputs, globals, nested allocations, and cleanup.',
        'A destructor alone makes a multi-allocation API ownership-complete.',
        'professional',
        'evaluate',
      ],
    ],
  ],
  [
    'cleanup-error-paths',
    'Cleanup, Partial Initialization, and Error Paths',
    'A configuration loader acquires buffers, files, locks, and parsed objects before failures at each stage.',
    'failure-atomic resource constructor',
    [
      [
        'partial-initialization-state',
        'Represent which subresources are initialized so cleanup is valid after every acquisition point.',
        'A partially initialized structure can always use the normal destructor unchanged.',
      ],
      [
        'reverse-order-cleanup',
        'Release acquired resources in dependency-safe reverse order with idempotent or guarded cleanup.',
        'Cleanup order does not matter after an error.',
      ],
      [
        'goto-cleanup-discipline',
        'Use structured goto cleanup when it centralizes unwinding without skipping initialization or obscuring ownership.',
        'Every goto in C is evidence of poor control flow.',
      ],
      [
        'failure-atomic-update',
        'Build replacement state separately and commit only after validation so callers retain a usable old value on failure.',
        'Returning an error automatically rolls back earlier writes.',
      ],
      [
        'error-cause-preservation',
        'Preserve the first causal error while still recording cleanup failures and resource state.',
        'The last cleanup error is always the most useful return value.',
      ],
    ],
  ],
  [
    'realloc-transactional-growth',
    'realloc Semantics and Transactional Growth',
    'A dynamic event list grows under memory pressure and loses its only pointer when resizing fails.',
    'amortized vector with failure invariants',
    [
      [
        'realloc-temporary-pointer',
        'Store realloc results transactionally so allocation failure preserves the original live block.',
        'Assigning realloc directly to the owner is safe because failure frees the old block.',
      ],
      [
        'realloc-move-aliases',
        'Invalidate or rebase all interior pointers and aliases when realloc may move storage.',
        'Only the owner pointer changes when realloc moves a block.',
      ],
      [
        'growth-factor-budget',
        'Choose bounded geometric growth from amortized cost, overflow, maximum capacity, and memory-pressure evidence.',
        'Doubling capacity is universally optimal and cannot overflow.',
      ],
      [
        'shrink-policy',
        'Define shrink success, failure, fragmentation, hysteresis, and old-value preservation rather than assuming space returns.',
        'A smaller realloc always moves less memory and immediately reduces process RSS.',
      ],
      [
        'zero-realloc-policy',
        'Avoid ambiguous zero-size realloc dependencies by handling logical empty state explicitly.',
        'realloc(pointer, 0) has one portable free-and-null outcome.',
      ],
    ],
  ],
  [
    'uaf-double-free-dangling',
    'Use-After-Free, Double Free, and Stale Aliases',
    'An asynchronous job queue keeps aliases after cancellation and occasionally corrupts a newly allocated job at the same address.',
    'generation-checked handle repair',
    [
      [
        'uaf-causal-trace',
        'Trace allocation, publication, last valid use, deallocation, stale use, and address reuse to diagnose use-after-free.',
        'The crash site is necessarily where the object was freed.',
      ],
      [
        'double-free-ownership',
        'Prevent double free by assigning exactly one release responsibility per live ownership state.',
        'Setting one local pointer to null prevents other aliases from freeing the block.',
      ],
      [
        'dangling-interior-pointer',
        'Invalidate pointers to subobjects and one-past positions when the containing allocation lifetime ends.',
        'An interior pointer remains usable for its offset after the base is freed.',
      ],
      [
        'nulling-limitations',
        'Use nulling as a local state aid without claiming it repairs aliases, temporal races, or ownership ambiguity.',
        'Free automatically changes every copy of the pointer to null.',
      ],
      [
        'quarantine-generation-defense',
        'Use generation counters, handles, quarantine, or delayed reclamation where stale asynchronous references cannot be excluded.',
        'Address uniqueness across time is a dependable object identity.',
      ],
    ],
  ],
  [
    'buffer-overflow-underflow',
    'Buffer Overflow, Underflow, and Copy Boundaries',
    'A network frame rewriter moves overlapping regions and an off-by-one defect writes before or beyond the packet buffer.',
    'bounded frame transformation',
    [
      [
        'off-by-one-proof',
        'Derive half-open ranges and prove start, count, end, and terminator relationships for changed empty and maximum cases.',
        'Testing length one and a typical length catches every off-by-one defect.',
      ],
      [
        'copy-source-destination-bounds',
        'Validate both readable source and writable destination extents before memcpy-like operations.',
        'The destination size alone determines whether a copy is safe.',
      ],
      [
        'memcpy-memmove-overlap',
        'Choose memcpy only for proven non-overlap and memmove for overlapping byte ranges.',
        'memcpy implementations always behave like memmove on small overlaps.',
      ],
      [
        'pointer-underflow',
        'Prevent subtraction and backward scans from forming pointers before the first element.',
        'A pointer may temporarily move before an array if it is not dereferenced.',
      ],
      [
        'fortify-runtime-limits',
        'Treat fortified libraries and object-size checks as defense layers with optimization and visibility limits.',
        'A fortified build makes all dynamic buffer operations memory safe.',
      ],
    ],
  ],
  [
    'indeterminate-undefined-behavior',
    'Initialization, Indeterminate Values, and Undefined Behavior',
    'An optimized release makes an uninitialized-state bug disappear in debug and reappear with a different compiler.',
    'defined-state initialization audit',
    [
      [
        'initialization-state-machine',
        'Initialize every read-reachable scalar, member, padding-sensitive operation, and error-path state before use.',
        'malloc and automatic storage begin as zero-filled objects.',
      ],
      [
        'indeterminate-value-risk',
        'Avoid evaluating indeterminate values and understand when unsigned-char inspection is and is not permitted.',
        'Reading any uninitialized unsigned integer merely gives an unpredictable ordinary value.',
      ],
      [
        'undefined-behavior-optimization',
        'Explain how undefined behavior removes semantic constraints and invalidates debug-build intuition.',
        'Undefined behavior must produce a crash or diagnostic at the offending statement.',
        'conceptual',
        'explain',
      ],
      [
        'unspecified-implementation-defined',
        'Distinguish undefined, unspecified, implementation-defined, locale-specific, and defined behavior and collect required documentation.',
        'All portable variability is undefined behavior.',
      ],
      [
        'c23-initialization-tools',
        'Use empty initialization and reviewed C23 facilities where supported while preserving explicit invariants and fallback tests.',
        'New syntax removes the need to reason about subobject initialization.',
      ],
    ],
  ],
  [
    'aliasing-effective-type-provenance',
    'Aliasing, Effective Type, Provenance, and Type Punning',
    'A high-performance decoder casts byte storage into structures and changes output only under optimization.',
    'defined binary decoder with provenance notes',
    [
      [
        'effective-type-access',
        'Access allocated and copied storage through types permitted by effective-type rules or defined character-byte paths.',
        'Any suitably aligned pointer cast creates an object of the destination type.',
      ],
      [
        'strict-aliasing-contract',
        'Preserve optimizer-visible non-aliasing rules and test any deliberate compiler-extension policy.',
        'Turning off one optimization flag gives portable semantics to invalid aliasing.',
      ],
      [
        'memcpy-type-punning',
        'Use memcpy into a live destination object for representation transfer and validate the resulting value domain.',
        'A byte copy makes every source representation a valid destination value.',
      ],
      [
        'pointer-integer-roundtrip',
        'Treat pointer-integer conversions as implementation-defined boundaries and avoid manufacturing dereference authority from numbers.',
        'Equal uintptr_t values always carry equivalent dereference provenance.',
      ],
      [
        'provenance-ts-review',
        'Apply ISO/IEC TS 6010 provenance concepts as reviewed guidance without mislabeling them as universally implemented C23 behavior.',
        'The provenance technical specification is already identical to every production compiler memory model.',
        'conceptual',
        'evaluate',
      ],
    ],
  ],
  [
    'arenas-pools-slabs',
    'Arenas, Pools, Slabs, and Fragmentation',
    'A game simulation creates millions of short-lived entities and must trade individual release for bounded phase ownership.',
    'instrumented arena and object pool',
    [
      [
        'arena-bump-invariant',
        'Implement checked alignment and bump arithmetic with capacity, high-water, reset, and out-of-memory evidence.',
        'A bump allocator cannot overflow because it only adds small objects.',
      ],
      [
        'arena-lifetime-domain',
        'Bind every arena allocation to a phase or owner whose reset cannot race with surviving borrows.',
        'Arena reset is equivalent to individually running every object destructor.',
      ],
      [
        'pool-free-list-integrity',
        'Maintain free-list membership, generation, duplicate-release, and exhaustion invariants.',
        'A singly linked free list needs no corruption checks because nodes are fixed size.',
      ],
      [
        'slab-size-class',
        'Choose size classes, alignment, page ownership, and internal-fragmentation metrics from workload evidence.',
        'One size class minimizes both waste and allocator overhead.',
      ],
      [
        'fragmentation-measurement',
        'Measure internal and external fragmentation, peak live bytes, reserved bytes, churn, and locality before redesign.',
        'RSS alone identifies allocator fragmentation.',
      ],
    ],
  ],
  [
    'reference-counting-cycles',
    'Reference Counting, Weak References, and Cycles',
    'A document graph shares nodes across views and leaks after parent-child cycles appear.',
    'overflow-safe reference-counted graph',
    [
      [
        'retain-release-invariant',
        'Maintain a reference count equal to defined strong ownership edges and release exactly when the last edge ends.',
        'Every pointer copy should increment a reference count.',
      ],
      [
        'refcount-overflow-underflow',
        'Prevent count overflow, underflow, resurrection, and release reentrancy with explicit states.',
        'Reference counts cannot overflow in realistic programs.',
      ],
      [
        'cycle-leak-diagnosis',
        'Demonstrate why pure reference counting cannot reclaim strong cycles and locate cycle-forming edges.',
        'A reference count reaching zero eventually is guaranteed if the program stops using an object.',
      ],
      [
        'weak-reference-generation',
        'Validate weak handles against liveness and generation before acquiring a new strong reference.',
        'A weak pointer can be safely inspected after the object is destroyed.',
      ],
      [
        'threaded-refcount-cost',
        'Evaluate atomicity, contention, batching, deferred release, and memory-order requirements for shared counts.',
        'Making the count atomic makes the whole referenced object thread-safe.',
      ],
    ],
  ],
  [
    'tracing-garbage-collection',
    'Tracing Garbage Collection and Conservative Limits',
    'A language runtime must reclaim cyclic object graphs while preserving roots held by stacks, globals, and foreign code.',
    'small mark-and-sweep collector model',
    [
      [
        'reachability-roots',
        'Define objects, edges, roots, reachability, and collection safety independently from application usefulness.',
        'An unreachable object is necessarily unused and safe to finalize immediately.',
      ],
      [
        'mark-sweep-invariant',
        'Mark reachable objects, sweep only unmarked allocations, and reset metadata without losing new or mutated edges.',
        'A single graph walk is enough without a complete allocation registry.',
      ],
      [
        'conservative-pointer-risk',
        'Explain false retention and invalid reclamation risks when arbitrary words may be treated as pointers.',
        'Conservative collection finds every true pointer and no false pointer.',
      ],
      [
        'finalizer-resurrection',
        'Constrain finalizer order, reentrancy, resurrection, external resources, and repeated collection behavior.',
        'A garbage collector provides deterministic file and lock release.',
      ],
      [
        'gc-barriers-pauses',
        'Relate generational and concurrent collection to write barriers, mutator cooperation, pause, throughput, and memory tradeoffs.',
        'Concurrent collection removes every stop-the-world phase and synchronization cost.',
      ],
    ],
  ],
  [
    'resource-ownership-raii-patterns',
    'Files, Descriptors, Locks, and RAII-Like C Patterns',
    'A service reload path owns heap buffers, FILE streams, descriptors, sockets, and mutexes across cancellation and errors.',
    'uniform resource-lifetime wrapper',
    [
      [
        'resource-not-memory',
        'Model external handles as scarce lifetime-bound resources even when their storage is not heap memory.',
        'Memory leak tools detect every leaked file, descriptor, socket, and lock.',
      ],
      [
        'constructor-destructor-pair',
        'Pair acquisition with one idempotent or guarded release operation and a valid empty state.',
        'Closing or destroying a resource twice is harmless if free(NULL) is harmless.',
      ],
      [
        'cleanup-attribute-portability',
        'Use compiler cleanup attributes only behind a documented extension boundary with equivalent standard-C control flow.',
        'Compiler cleanup attributes have standard C23 semantics on every toolchain.',
      ],
      [
        'mutex-lock-ownership',
        'Record which thread owns each lock and guarantee unlock on normal, error, cancellation, and early-return paths.',
        'Freeing an object containing a locked mutex releases the lock safely.',
      ],
      [
        'composite-resource-object',
        'Design one lifecycle object that owns nested memory and operating-system resources with failure-atomic construction.',
        'A structure assignment safely duplicates ownership of every nested handle.',
      ],
    ],
  ],
  [
    'concurrency-atomics-races',
    'Threads, Atomics, Data Races, and Safe Reclamation',
    'A lock-free metrics cache removes nodes while readers still hold addresses and ordinary tests rarely reproduce the race.',
    'threaded lifetime and reclamation proof',
    [
      [
        'data-race-undefined',
        'Identify conflicting non-atomic accesses without happens-before ordering as undefined behavior.',
        'Aligned word reads and writes are automatically race-free.',
      ],
      [
        'atomic-memory-order',
        'Select atomic operations and memory order from a stated synchronization proof instead of folklore.',
        'Atomic variables make neighboring non-atomic data visible in every order.',
      ],
      [
        'publication-lifetime',
        'Publish fully initialized objects with ordering and retain their lifetime until every reader is finished.',
        'A release store alone prevents an object from being freed too soon.',
      ],
      [
        'reclamation-strategy',
        'Compare locks, reference counts, hazard pointers, epochs, RCU-like schemes, and ownership transfer for safe reclamation.',
        'Lock-free deletion may free a node immediately after unlinking it.',
      ],
      [
        'threadsanitizer-limit',
        'Use ThreadSanitizer on supported configurations while preserving stress, model, code-review, and platform evidence.',
        'A clean ThreadSanitizer run proves all schedules race-free.',
      ],
    ],
  ],
  [
    'abi-ffi-shared-boundaries',
    'ABI, Shared Libraries, and Foreign-Function Memory',
    'A C library shares opaque handles and buffers with Rust, Python, and WebAssembly consumers that use different allocators and unwind rules.',
    'versioned cross-language ownership ABI',
    [
      [
        'abi-layout-call-contract',
        'Characterize calling convention, symbol visibility, integer widths, alignment, layout, and compiler flags for each supported ABI.',
        'A shared C header guarantees binary compatibility across all targets.',
      ],
      [
        'opaque-handle-api',
        'Expose stable opaque handles with versioned constructors, operations, observers, and same-library destruction.',
        'Foreign callers may free an opaque C handle with their native allocator.',
      ],
      [
        'buffer-length-allocator-family',
        'Pass buffers with lengths, ownership direction, allocator family, and release callback across FFI.',
        'A pointer and null terminator fully describe every foreign buffer.',
      ],
      [
        'unwind-error-boundary',
        'Convert errors to stable status and out-value contracts and prevent language exceptions or panics from crossing unsupported C frames.',
        'Rust panic or Python exception propagation through C is automatically ABI-safe.',
      ],
      [
        'wasm-linear-memory',
        'Treat WebAssembly pointers as offsets into bounded linear memory with copy, growth, lifetime, and host-reference rules.',
        'A WebAssembly pointer is a host pointer and remains valid after memory growth.',
      ],
    ],
  ],
  [
    'sanitizers-static-analysis-fuzzing',
    'Sanitizers, Static Analysis, and Fuzzing',
    'A security parser needs fast local feedback, nightly deep instrumentation, adversarial generation, and reproducible findings.',
    'layered memory-defect test matrix',
    [
      [
        'asan-lsan-evidence',
        'Build and run representative tests with AddressSanitizer and LeakSanitizer, symbols, fatal findings, and supported-target notes.',
        'ASan detects uninitialized reads, every leak, and every temporal defect.',
      ],
      [
        'ubsan-msan-evidence',
        'Use UndefinedBehaviorSanitizer and fully instrumented MemorySanitizer environments for their distinct defect classes.',
        'UBSan and MSan are interchangeable memory-error modes.',
      ],
      [
        'static-analyzer-triage',
        'Run Clang and GCC static analyzers, preserve paths and assumptions, classify findings, and regression-test repairs.',
        'Static analyzer warnings are either proofs or ignorable false positives.',
      ],
      [
        'coverage-guided-fuzzing',
        'Build a deterministic libFuzzer target with bounded input, sanitizer instrumentation, corpus, dictionary, timeout, and minimized regressions.',
        'High line coverage means a parser has been fuzzed thoroughly.',
      ],
      [
        'tool-limit-matrix',
        'Maintain a defect-by-tool and platform matrix so unsupported configurations and blind spots remain explicit.',
        'Running every tool once is better than selecting compatible complementary gates.',
      ],
    ],
  ],
  [
    'profiling-performance-hardening',
    'Profiling, Allocator Performance, and Hardening',
    'A low-latency gateway reduces allocations but increases peak memory, fragmentation, and tail pauses under changed traffic.',
    'measured allocator optimization report',
    [
      [
        'allocation-telemetry',
        'Measure allocation rate, size distribution, lifetime, peak live bytes, failures, and call sites with bounded telemetry.',
        'The number of malloc calls alone explains memory performance.',
      ],
      [
        'cache-locality-layout',
        'Relate object layout, traversal order, working set, cache behavior, false sharing, and measured latency.',
        'Smaller source code or fewer pointers guarantees better cache locality.',
      ],
      [
        'allocator-selection',
        'Compare system allocator, mimalloc, jemalloc, arenas, and pools using representative workloads and operational constraints.',
        'A benchmark winner on one micro-test is the best allocator for production.',
      ],
      [
        'hardening-options',
        'Evaluate allocator checks, guard pages, canaries, randomization, control-flow defenses, fortification, and production cost.',
        'Hardening flags repair undefined behavior in source code.',
      ],
      [
        'optimization-preserves-contract',
        'Require functional, sanitizer, resource, load, and changed-workload evidence before accepting a memory optimization.',
        'A faster benchmark permits weaker cleanup or failure behavior.',
        'strategic',
        'evaluate',
      ],
    ],
  ],
  [
    'testing-release-incident-defense',
    'Testing, Release Gates, and Memory Incident Defense',
    'A critical native agent must ship a memory rewrite with compatibility, rollback, observability, and practiced incident recovery.',
    'production memory-safety defense dossier',
    [
      [
        'memory-test-layers',
        'Combine unit, property, integration, fault, stress, sanitizer, fuzz, ABI, resource, load, and restore evidence by risk.',
        'A large unit-test count substitutes for boundary and fault evidence.',
      ],
      [
        'compiler-target-matrix',
        'Test supported GCC and Clang versions, optimization modes, architectures, libraries, feature macros, and warning baselines.',
        'Passing one debug compiler build proves optimized portability.',
      ],
      [
        'reproducible-release',
        'Pin source, dependencies, compiler, flags, generated files, symbols, SBOM, provenance, and artifact identity.',
        'The same version label proves two native binaries are equivalent.',
      ],
      [
        'canary-rollback-observability',
        'Canary immutable artifacts against memory, crash, latency, allocator, and correctness signals with a tested rollback trigger.',
        'A rollback is safe without state and ABI compatibility evidence.',
      ],
      [
        'memory-incident-response',
        'Preserve first-failure artifacts, symbolize safely, contain exposure, reproduce, repair causally, and verify recovery and prevention.',
        'Restarting the process and adding memory is sufficient incident resolution.',
        'professional',
        'evaluate',
      ],
    ],
  ],
];

const modules = profiles.map(([slug, title, context, artifact, skills]) => ({
  id: `cmem-${slug}`,
  title,
  context,
  contexts: {
    theory: context,
    workshop: `A guided implementation pair receives a clean input trace and acceptance examples, then builds the first working ${artifact} while narrating each size, lifetime, ownership, and cleanup decision.`,
    debug: `An incident responder inherits a corrupted ${artifact}, the earliest failing input, and two plausible hypotheses; they must preserve first-failure evidence, repair the cause, and add a regression.`,
    lab: `An independent maintainer ports the ${artifact} to a changed target with tighter memory, different input shape, injected allocation failure, and no worked solution.`,
    review: `After a delay, a release reviewer reconstructs the ${artifact} contract from partial traces, compares two near-miss implementations, and retrieves prior bounds and lifetime rules before feedback.`,
    quiz: `A safety board presents unfamiliar ${title.toLowerCase()} decisions across code, diagrams, diagnostics, and stakeholder evidence; each distractor corresponds to a named misconception.`,
  },
  artifact,
  objectives: skills.slice(0, 3).map((entry) => entry[1]),
  skills: skills.map(([id, statement, misconception, knowledgeType, level]) =>
    skill(`cmem-${id}`, statement, misconception, knowledgeType, level)
  ),
}));

const sources = [
  [
    'ISO C23 Project and Working Draft',
    'official-specification',
    'https://www9.open-std.org/JTC1/SC22/WG14/www/projects.html',
    'ISO/IEC 9899:2024; WG14 N3220 project index',
    'C23 language, library, conformance, implementation status, and current WG14 work.',
  ],
  [
    'WG14 C Issues Tracker',
    'official-specification',
    'https://www.open-std.org/jtc1/sc22/wg14/issues/',
    'current issues reviewed 2026-07-14',
    'Defect reports, clarifications, open interpretation questions, and issue status.',
  ],
  [
    'ISO Provenance-Aware Memory Object Model',
    'official-specification',
    'https://www.iso.org/standard/81899.html',
    'ISO/IEC TS 6010:2025; Edition 1, 2025-05',
    'Pointer provenance concepts and explicit separation from baseline C23 implementation claims.',
  ],
  [
    'GCC 16.1 Manual',
    'official-docs',
    'https://gcc.gnu.org/onlinedocs/gcc-16.1.0/gcc/',
    'GCC 16.1',
    'C dialects, diagnostics, optimization, sanitizers, hardening, extensions, linking, and target options.',
  ],
  [
    'GCC Static Analyzer Options',
    'official-docs',
    'https://gcc.gnu.org/onlinedocs/gcc-16.1.0/gcc/Static-Analyzer-Options.html',
    'GCC 16.1',
    'Path-sensitive diagnostics, memory defect coverage, analyzer assumptions, and limitations.',
  ],
  [
    'Clang 22.1.0 Release Notes',
    'official-docs',
    'https://releases.llvm.org/22.1.0/tools/clang/docs/ReleaseNotes.html',
    'Clang 22.1.0',
    'Current stable compiler changes, C language support, diagnostics, attributes, and compatibility.',
  ],
  [
    'Clang AddressSanitizer',
    'official-docs',
    'https://clang.llvm.org/docs/AddressSanitizer.html',
    'current Clang documentation reviewed 2026-07-14',
    'Spatial and temporal memory-error detection, build flags, symbols, limits, and security notes.',
  ],
  [
    'Clang UndefinedBehaviorSanitizer',
    'official-docs',
    'https://clang.llvm.org/docs/UndefinedBehaviorSanitizer.html',
    'current Clang documentation reviewed 2026-07-14',
    'Undefined-behavior instrumentation, recovery, traps, diagnostics, and runtime limits.',
  ],
  [
    'Clang MemorySanitizer',
    'official-docs',
    'https://clang.llvm.org/docs/MemorySanitizer.html',
    'current Clang documentation reviewed 2026-07-14',
    'Uninitialized-value detection, full instrumentation needs, origin tracking, and supported targets.',
  ],
  [
    'Clang LeakSanitizer',
    'official-docs',
    'https://clang.llvm.org/docs/LeakSanitizer.html',
    'current Clang documentation reviewed 2026-07-14',
    'Leak detection, integration with ASan, supported platforms, and non-production runtime warning.',
  ],
  [
    'Clang ThreadSanitizer',
    'official-docs',
    'https://clang.llvm.org/docs/ThreadSanitizer.html',
    'current Clang documentation reviewed 2026-07-14',
    'Data-race detection, instrumentation, supported targets, overhead, and limitations.',
  ],
  [
    'Clang Static Analyzer',
    'official-docs',
    'https://clang.llvm.org/docs/ClangStaticAnalyzer.html',
    'current Clang documentation reviewed 2026-07-14',
    'Path-sensitive analysis, checkers, bug reports, assumptions, and workflow.',
  ],
  [
    'LLVM libFuzzer',
    'official-docs',
    'https://llvm.org/docs/LibFuzzer.html',
    'current LLVM documentation reviewed 2026-07-14',
    'Coverage-guided fuzz targets, corpora, sanitizers, dictionaries, resource limits, and regression artifacts.',
  ],
  [
    'SEI CERT C Coding Standard',
    'recognized-standard',
    'https://wiki.sei.cmu.edu/confluence/display/c',
    'current wiki reviewed 2026-07-14',
    'Memory, arrays, strings, integers, expressions, concurrency, resources, APIs, and secure coding rules.',
  ],
  [
    'POSIX.1-2024 Memory Allocation Interfaces',
    'official-specification',
    'https://pubs.opengroup.org/onlinepubs/9799919799/functions/malloc.html',
    'POSIX.1-2024',
    'malloc, calloc, realloc, reallocarray, free, alignment, thread safety, and error behavior.',
  ],
  [
    'POSIX.1-2024 Threads and Synchronization',
    'official-specification',
    'https://pubs.opengroup.org/onlinepubs/9799919799/functions/pthread_create.html',
    'POSIX.1-2024',
    'Thread creation, mutexes, synchronization, resource lifetime, and error contracts.',
  ],
  [
    'CWE-119 Improper Restriction of Operations within Memory Buffer Bounds',
    'recognized-standard',
    'https://cwe.mitre.org/data/definitions/119.html',
    'CWE current view reviewed 2026-07-14',
    'Buffer-bound weakness taxonomy, consequences, mitigations, and related weaknesses.',
  ],
  [
    'CWE-415 Double Free',
    'recognized-standard',
    'https://cwe.mitre.org/data/definitions/415.html',
    'CWE current view reviewed 2026-07-14',
    'Double-free causes, consequences, examples, and mitigations.',
  ],
  [
    'CWE-416 Use After Free',
    'recognized-standard',
    'https://cwe.mitre.org/data/definitions/416.html',
    'CWE current view reviewed 2026-07-14',
    'Use-after-free causes, consequences, examples, and mitigations.',
  ],
  [
    'CWE-190 Integer Overflow or Wraparound',
    'recognized-standard',
    'https://cwe.mitre.org/data/definitions/190.html',
    'CWE current view reviewed 2026-07-14',
    'Integer overflow as a precursor to allocation and buffer defects.',
  ],
  [
    'Python 3.14 C API Memory Management',
    'official-docs',
    'https://docs.python.org/3.14/c-api/memory.html',
    'Python 3.14.6',
    'Allocator domains, matching allocation families, object memory, debug hooks, and free-threaded requirements.',
  ],
  [
    'Python 3.14 C API Stability',
    'official-docs',
    'https://docs.python.org/3.14/c-api/stable.html',
    'Python 3.14.6',
    'Stable ABI, Limited API, unstable interfaces, extension compatibility, and versioning.',
  ],
  [
    'Rust Reference and Rustonomicon FFI',
    'official-docs',
    'https://doc.rust-lang.org/nomicon/ffi.html',
    'Rust stable documentation reviewed 2026-07-14',
    'C ABI declarations, ownership, callbacks, panic boundaries, opaque objects, and foreign allocation.',
  ],
  [
    'WebAssembly Core Specification',
    'official-specification',
    'https://webassembly.github.io/spec/core/',
    'WebAssembly Core 3.0',
    'Linear memory, loads, stores, bounds traps, memory growth, and host boundary semantics.',
  ],
  [
    'Emscripten 6.0.3 Release',
    'official-docs',
    'https://github.com/emscripten-core/emscripten/releases/tag/6.0.3',
    'Emscripten 6.0.3; released 2026-07-13',
    'Reviewed browser runtime build toolchain and WebAssembly compatibility.',
  ],
  [
    'PicoC Source Release',
    'official-source',
    'https://gitlab.com/zsaleeba/picoc/-/tags/v3.2.2',
    'PicoC 3.2.2',
    'Bounded instant-practice interpreter source, license, supported C89/C90 and selected C99 subset, and limitations.',
  ],
  [
    'ACM IEEE CS2023 Curriculum',
    'recognized-framework',
    'https://csed.acm.org/wp-content/uploads/2024/04/Version-Gamma.pdf',
    'CS2023 Version Gamma',
    'Systems fundamentals, architecture, operating systems, programming-language, security, and professional evidence expectations.',
  ],
  [
    'Boehm-Demers-Weiser Conservative Garbage Collector',
    'official-docs',
    'https://www.hboehm.info/gc/',
    'current project documentation reviewed 2026-07-14',
    'Conservative tracing, roots, reachability, finalization, threading, and integration limits.',
  ],
  [
    'mimalloc Documentation',
    'official-docs',
    'https://microsoft.github.io/mimalloc/',
    'current project documentation reviewed 2026-07-14',
    'Allocator design, statistics, secure modes, performance claims, and workload measurement.',
  ],
  [
    'jemalloc Manual',
    'official-docs',
    'https://jemalloc.net/jemalloc.3.html',
    'current project manual reviewed 2026-07-14',
    'Arenas, size classes, fragmentation, profiling, statistics, decay, and operational controls.',
  ],
].map(([title, authority, url, version, scope]) => ({
  title,
  authority:
    {
      'official-specification': 'standard',
      'recognized-standard': 'standard',
      'official-source': 'official-docs',
      'recognized-framework': 'curriculum-framework',
    }[authority] ?? authority,
  url,
  version,
  reviewedAt: REVIEWED_AT,
  scope,
}));

export const cMemoryManagementConfig = finalizeCourse(
  {
    id: 'c-memory-management',
    title: 'Memory Management and Memory Safety in Modern C23',
    version: '2026.07',
    audience: {
      description:
        'Learners who can reason about data structures and algorithms but are new to C and need to design, test, diagnose, optimize, and defend explicit memory and resource lifetimes from first principles through production systems.',
      entryKnowledge: [
        'Trace common data structures and algorithms, state invariants, analyze asymptotic cost, and test changed and adversarial inputs.',
        'Use a terminal, edit source files, interpret test failures, and explain rather than merely report program output.',
      ],
      deviceConstraints: [
        'Modern browser. Instant code practice runs only in a disposable Web Worker using PicoC 3.2.2, a clearly labeled C89/C90 and selected C99 subset rebuilt with Emscripten 6.0.3. C23 features, GCC and Clang diagnostics, native ABI, threads, sanitizers, fuzzing, profiling, and operating-system resources require explicit controlled transfer gates.',
      ],
      accessibilityAssumptions: [
        'Memory maps, pointer traces, allocation timelines, object graphs, sanitizer output, tables, code, terminals, charts, and status use structured text alternatives, keyboard operation, visible focus, announced updates, large targets, reduced motion, and no color-only meaning.',
      ],
    },
    scope: {
      includes: [
        'C23 foundations needed for memory work; translation, types, conversions, objects, lifetime, representation, alignment, arrays, pointers, strings, structures, unions, callbacks, automatic storage, heap allocation, size arithmetic, ownership, cleanup, realloc, temporal and spatial defects, initialization, undefined behavior, aliasing, provenance, arenas, pools, reference counting, tracing collection, external resources, concurrency, ABI, FFI, WebAssembly linear memory, sanitizers, static analysis, fuzzing, profiling, hardening, testing, release, rollback, and incident defense',
        'More than two hundred exact runnable changed-case C programs in isolated browser practice, plus explicit C23, GCC 16, Clang 22, sanitizer, analyzer, fuzz, ABI, thread, Python, Rust, WebAssembly, load, fault, release, and production transfer evidence',
        'Five cumulative stakeholder projects and a performance-based memory-safety certification defense',
      ],
      excludes: [
        'Claiming that PicoC implements C23 or proves native compiler optimization, ABI, sanitizer, concurrency, operating-system, foreign-runtime, load, or production behavior',
        'Sending learner source to a host process, server compiler, network, filesystem, shell, or production system; unsafe legacy APIs appear only in bounded defect diagnosis and migration work',
      ],
      nextCourses: ['python-c-extension-development', 'rust-basics'],
    },
    sources,
    sharedRequirements: [
      'Every activity retrieves earlier size, bounds, lifetime, ownership, cleanup, accessibility, security, testing, and evidence habits before adding one bounded memory concept.',
      'Every coding task produces changed-case output and an inspectable invariant. Code shape alone, a clean compile, one passing browser run, or one sanitizer run is never sufficient mastery evidence.',
      'Browser code stays inside the PicoC subset and disposable worker. C23 syntax and semantics, optimizing compilers, native libraries, ABI, threads, sanitizers, analyzers, fuzzers, operating-system resources, foreign runtimes, load, and production claims name an explicit controlled transfer gate.',
      'Unsafe examples are presented as defects to predict, diagnose, repair, and regression-test; they are never copied into starter patterns as acceptable production code.',
    ],
    modules,
    projects: [
      project(
        'cmem-sensor-buffer',
        'Bounded Environmental Sensor Buffer',
        'cmem-strings-bytes-encoding',
        'A rural air-quality network',
        'The network needs a portable record buffer and text boundary with checked dimensions, stable binary encoding, explicit length and capacity, accessible diagnostics, and changed device profiles.',
        [
          'cmem-checked-size-arithmetic',
          'cmem-index-bound-invariant',
          'cmem-endianness-serialization',
          'cmem-length-capacity-termination',
          'cmem-encoding-boundaries',
        ]
      ),
      project(
        'cmem-document-index',
        'Failure-Atomic Document Index',
        'cmem-realloc-transactional-growth',
        'A public-interest document archive',
        'The archive needs a growing C index with opaque ownership, transactional updates, partial-initialization cleanup, bounded strings, allocation failure injection, and preserved old state.',
        [
          'cmem-opaque-structure-evolution',
          'cmem-allocator-injection',
          'cmem-partial-initialization-state',
          'cmem-failure-atomic-update',
          'cmem-growth-factor-budget',
        ]
      ),
      project(
        'cmem-packet-engine',
        'Memory-Safe Packet Transformation Engine',
        'cmem-aliasing-effective-type-provenance',
        'A small network monitoring team',
        'The team needs a binary packet transformer with checked sizes, tagged representations, overlap-safe moves, no stale aliases, defined initialization, and optimization-stable decoding.',
        [
          'cmem-flexible-array-allocation',
          'cmem-copy-source-destination-bounds',
          'cmem-uaf-causal-trace',
          'cmem-initialization-state-machine',
          'cmem-memcpy-type-punning',
        ]
      ),
      project(
        'cmem-shared-runtime',
        'Shared Object Runtime and Foreign API',
        'cmem-abi-ffi-shared-boundaries',
        'A language tools cooperative',
        'The cooperative needs pooled and traced objects, cycle policy, thread-safe publication and reclamation, opaque C handles, and allocator-safe Rust, Python, and WebAssembly boundaries.',
        [
          'cmem-pool-free-list-integrity',
          'cmem-cycle-leak-diagnosis',
          'cmem-mark-sweep-invariant',
          'cmem-reclamation-strategy',
          'cmem-buffer-length-allocator-family',
          'cmem-wasm-linear-memory',
        ]
      ),
      project(
        'cmem-production-defense',
        'Native Memory-Safety Production Defense',
        'cmem-testing-release-incident-defense',
        'An engineering, security, accessibility, operations, and reliability review board',
        'The board needs complementary compiler, sanitizer, analyzer, fuzz, resource, ABI, concurrency, load, allocator, hardening, canary, rollback, and incident evidence for an immutable native release.',
        [
          'cmem-asan-lsan-evidence',
          'cmem-static-analyzer-triage',
          'cmem-coverage-guided-fuzzing',
          'cmem-optimization-preserves-contract',
          'cmem-compiler-target-matrix',
          'cmem-memory-incident-response',
        ]
      ),
    ],
    examContext:
      'Unfamiliar C23 and native systems cases spanning translation, representation, sizes, objects, arrays, pointers, strings, ownership, allocation, cleanup, temporal and spatial defects, undefined behavior, aliasing, provenance, custom allocation, collection, resources, concurrency, ABI, FFI, WebAssembly, diagnostics, sanitizers, analyzers, fuzzing, performance, hardening, reproducibility, canary, rollback, and incident defense with explicit browser and native evidence limits.',
    minimumQuestionBankSize: 900,
  },
  { researchedAt: RESEARCHED_AT, prerequisiteCourseIds: ['python-dsa'] }
);

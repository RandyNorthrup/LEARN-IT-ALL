import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateCourseBlueprint } from './lib/generate-course-blueprint.mjs';

const modules = [
  {
    id: 'python-execution-tooling',
    title: 'Python Execution, Tools, and Evidence',
    context:
      'Build and diagnose a small command-line learning log across REPL, script, editor, and terminal workflows.',
    artifact: 'a reproducible command-line learning log',
    objectives: [
      'Run Python code predictably in interactive and script contexts.',
      'Read tracebacks and collect evidence before changing code.',
      'Use formatting, documentation, source control, and environment records from the first program.',
    ],
    skills: [
      [
        'python-runtime-model',
        'Explain how source, the interpreter, objects, and standard streams participate when a Python program runs.',
        'Python source is converted directly into hardware instructions without a runtime.',
      ],
      [
        'python-repl-script',
        'Choose REPL, script, module, or notebook execution based on the task and reproducibility needs.',
        'Interactive history is automatically a reproducible application artifact.',
      ],
      [
        'python-syntax-traceback',
        'Read syntax errors and tracebacks from the final exception back to the relevant source cause.',
        'The first line of every traceback always names the root cause.',
      ],
      [
        'python-editor-terminal',
        'Use an editor, terminal, working directory, and command history without losing file or environment context.',
        'The current working directory is always the directory containing the script.',
      ],
      [
        'python-style-formatting',
        'Apply readable naming, formatting, comments, docstrings, and small commits as correctness-supporting tools.',
        'Style matters only after a program is complete and cannot prevent defects.',
      ],
    ],
  },
  {
    id: 'python-values-expressions',
    title: 'Values, Expressions, Names, and Types',
    context:
      'Build a transparent unit and budget calculator whose intermediate values can be inspected and tested.',
    artifact: 'an inspectable unit and budget calculator',
    objectives: [
      'Reason about values, objects, names, identity, and mutability.',
      'Use numeric, Boolean, None, and conversion operations without silent assumption errors.',
      'Predict expression evaluation and assignment effects before execution.',
    ],
    skills: [
      [
        'python-values-objects-names',
        'Distinguish values, objects, names, assignment, equality, and identity in Python execution.',
        'Assignment copies every object into a new independent memory location.',
      ],
      [
        'python-numeric-expressions',
        'Use integers, floating-point values, decimal-sensitive decisions, arithmetic precedence, and division operators accurately.',
        'Binary floating-point represents every decimal fraction exactly.',
      ],
      [
        'python-booleans-none',
        'Use Boolean values and None as distinct domain states instead of ambiguous numeric or text sentinels.',
        'None, zero, false, and an empty string always mean the same thing.',
      ],
      [
        'python-type-inspection',
        'Inspect runtime types and supported operations without treating type names as user-facing validation.',
        'Calling type on a value proves every later operation will succeed.',
      ],
      [
        'python-conversion-validation',
        'Convert external text to typed values with explicit validation and recoverable failure behavior.',
        'Calling int or float on user input is complete input validation.',
      ],
      [
        'python-assignment-unpacking',
        'Use multiple assignment, unpacking, starred targets, and constants conventions without obscuring data shape.',
        'Uppercase names create values that Python prevents from changing.',
      ],
    ],
  },
  {
    id: 'python-text-unicode',
    title: 'Text, Unicode, Formatting, and Parsing',
    context: 'Normalize multilingual community-event records and generate readable confirmations.',
    artifact: 'a multilingual event text normalizer',
    objectives: [
      'Manipulate strings while preserving Unicode meaning and boundaries.',
      'Format user-facing text without mixing presentation and data logic.',
      'Parse structured text with deliberate methods and regular expressions only when justified.',
    ],
    skills: [
      [
        'python-string-literals',
        'Create string literals with correct quoting, escapes, raw forms, multiline content, and Unicode characters.',
        'Raw strings disable every form of backslash processing in every position.',
      ],
      [
        'python-string-sequences',
        'Use string indexing, slicing, membership, length, and immutability without off-by-one assumptions.',
        'Changing one indexed character mutates the original string in place.',
      ],
      [
        'python-string-methods',
        'Choose search, split, join, strip, replace, case, and predicate methods from the actual text contract.',
        'Strip removes matching characters from anywhere inside a string.',
      ],
      [
        'python-fstrings-format',
        'Use f-strings and format specifications for readable values, alignment, precision, dates, and debug output.',
        'Formatting a value changes the value stored in the underlying variable.',
      ],
      [
        'python-unicode-encoding',
        'Distinguish text from bytes and encode or decode at explicit system boundaries with named error policy.',
        'A Python string is a sequence of UTF-8 bytes.',
      ],
      [
        'python-regex-boundaries',
        'Use regular expressions for justified pattern structure while preferring simpler string operations for simple parsing.',
        'A single large regular expression is always clearer than staged text parsing.',
      ],
    ],
  },
  {
    id: 'python-control-flow',
    title: 'Decisions, Pattern Matching, and Iteration',
    context:
      'Route support requests through priority rules, repeated records, and changed data conditions.',
    artifact: 'a support-request routing engine',
    objectives: [
      'Build mutually understandable decisions from truth, comparisons, and guards.',
      'Use structural pattern matching when data shape—not simple equality—drives behavior.',
      'Select loops and control statements that terminate and preserve data order.',
    ],
    skills: [
      [
        'python-truth-comparison',
        'Predict truth testing, chained comparisons, equality, identity, membership, and Boolean operator results.',
        'And and or always return a Boolean rather than one of their operands.',
      ],
      [
        'python-conditionals-guards',
        'Use if, elif, else, conditional expressions, and guard clauses to express exclusive and early-exit decisions.',
        'Deep nesting is necessary whenever a rule has several conditions.',
      ],
      [
        'python-match-patterns',
        'Use match and case for structural patterns, captures, guards, alternatives, and exhaustive fallback behavior.',
        'Match case is a faster replacement for every if and elif chain.',
      ],
      [
        'python-for-iteration',
        'Iterate directly over values and use range only when a numeric sequence is part of the task.',
        'Every for loop should iterate over indexes and then look up values.',
      ],
      [
        'python-while-termination',
        'Design while loops with explicit state progress, termination evidence, and recoverable input behavior.',
        'A while true loop is safe whenever a break appears somewhere in its body.',
      ],
      [
        'python-enumerate-zip',
        'Use enumerate and zip to preserve index or parallel-sequence meaning without manual counter drift.',
        'Zip raises an error automatically whenever input lengths differ.',
      ],
      [
        'python-loop-control',
        'Use break, continue, loop else, and nested-loop extraction without skipping required work or hiding termination.',
        'Loop else runs only when the loop body executes at least once.',
      ],
    ],
  },
  {
    id: 'python-functions-contracts',
    title: 'Functions, Scope, and Callable Contracts',
    context:
      'Refactor the routing engine into testable calculations, validators, and reporting functions.',
    artifact: 'a function-oriented support workflow',
    objectives: [
      'Design functions around one observable responsibility and explicit inputs and outputs.',
      'Use Python parameter kinds, scope, closures, and annotations accurately.',
      'Treat exceptions and side effects as part of a callable contract.',
    ],
    skills: [
      [
        'python-function-definition',
        'Define and call functions with purposeful names, small responsibilities, docstrings, and testable behavior.',
        'Moving lines under def automatically creates a reusable abstraction.',
      ],
      [
        'python-parameter-kinds',
        'Use positional-only, positional-or-keyword, keyword-only, default, variadic positional, and variadic keyword parameters deliberately.',
        'Args and kwargs are required whenever a function accepts more than two inputs.',
      ],
      [
        'python-default-arguments',
        'Choose defaults without shared mutable state and distinguish omitted values from explicit None when needed.',
        'A mutable default is recreated for every function call.',
      ],
      [
        'python-return-contracts',
        'Return coherent values and avoid mixing computation, printing, mutation, and error signaling without a contract.',
        'A function that prints a value also returns that printed value.',
      ],
      [
        'python-scope-legb',
        'Trace local, enclosing, global, and built-in name resolution plus variable lifetime before using global or nonlocal.',
        'Python resolves every name from the global scope first.',
      ],
      [
        'python-closures-higher-order',
        'Use closures, functions as values, lambda expressions, and higher-order operations when they simplify a stable behavior boundary.',
        'A lambda is inherently faster and more reusable than a named function.',
      ],
      [
        'python-function-annotations',
        'Write modern annotations for function inputs and outputs while recognizing that Python does not enforce them at runtime.',
        'A type annotation makes the interpreter reject every mismatched argument.',
      ],
      [
        'python-recursion-iteration',
        'Choose recursion or iteration from data shape, termination, depth, state, and readability constraints.',
        'Recursion is always the most Pythonic approach to nested data.',
      ],
    ],
  },
  {
    id: 'python-sequences',
    title: 'Lists, Tuples, Ranges, and Comprehensions',
    context:
      'Model and transform ordered service records while preserving aliasing and order requirements.',
    artifact: 'an ordered service-record processor',
    objectives: [
      'Choose mutable and immutable sequence types from ownership and update needs.',
      'Use indexing, slicing, sorting, copying, and comprehensions without aliasing surprises.',
      'Analyze sequence cost under realistic data sizes.',
    ],
    skills: [
      [
        'python-list-operations',
        'Create, update, search, append, extend, insert, remove, and clear lists with explicit mutation intent.',
        'Every list method returns the changed list for chaining.',
      ],
      [
        'python-index-slice',
        'Use positive and negative indexing, slicing, strides, and bounds behavior without losing required elements.',
        'A slice stop index is included in the result.',
      ],
      [
        'python-copy-aliasing',
        'Distinguish aliasing, shallow copy, nested mutable sharing, and deliberate independent copies.',
        'Using list on a nested list recursively copies every contained object.',
      ],
      [
        'python-tuple-records',
        'Use tuples and unpacking for fixed-position records while choosing named structures when field meaning matters.',
        'Tuples are immutable so every object they contain is also immutable.',
      ],
      [
        'python-sort-key',
        'Use sorted, list sort, key functions, reverse order, and stable multi-pass sorting with clear mutation behavior.',
        'Sort and sorted both return a new list and preserve the original.',
      ],
      [
        'python-comprehensions',
        'Build readable list comprehensions with mapping and filtering while replacing deeply nested forms with explicit loops.',
        'A comprehension is always clearer and faster than an equivalent loop.',
      ],
      [
        'python-sequence-complexity',
        'Estimate common sequence operation costs and measure performance before changing a correct data structure.',
        'Big-O notation predicts exact wall-clock time for a program.',
      ],
    ],
  },
  {
    id: 'python-mappings-sets',
    title: 'Mappings, Sets, and Nested Data',
    context:
      'Index community resources, remove duplicates, compare inventories, and merge changed records.',
    artifact: 'a deduplicated resource inventory',
    objectives: [
      'Choose mappings and sets from lookup, uniqueness, and ordering needs.',
      'Transform nested data without missing-key or mutation-during-iteration defects.',
      'Use specialized collections only when their semantics improve the design.',
    ],
    skills: [
      [
        'python-dict-operations',
        'Create, access, update, delete, and test dictionary entries with deliberate missing-key behavior.',
        'Dictionary get inserts the default into the mapping when a key is absent.',
      ],
      [
        'python-dict-views-iteration',
        'Iterate keys, values, and item views while preserving insertion order and avoiding size changes during iteration.',
        'Dictionary views are frozen copies made when keys or values is called.',
      ],
      [
        'python-dict-merge-nested',
        'Merge mappings and update nested records with explicit conflict, copy, and schema policies.',
        'The dictionary union operator recursively merges nested dictionaries.',
      ],
      [
        'python-set-algebra',
        'Use membership, union, intersection, difference, symmetric difference, and subset relations for uniqueness tasks.',
        'Sets preserve insertion order as a portable language guarantee.',
      ],
      [
        'python-frozenset-hash',
        'Use frozenset and hashable keys when immutable set identity is part of a mapping or cache contract.',
        'Any tuple can be a dictionary key even when it contains a list.',
      ],
      [
        'python-mapping-set-comprehensions',
        'Write mapping and set comprehensions whose key collisions and filtering behavior are explicit.',
        'Duplicate dictionary-comprehension keys raise an exception automatically.',
      ],
      [
        'python-collections-tools',
        'Use Counter, defaultdict, deque, ChainMap, and named records when their specialized behavior matches the task.',
        'Specialized collections are always faster and should replace built-ins by default.',
      ],
    ],
  },
  {
    id: 'python-errors-resources',
    title: 'Exceptions, Cleanup, and Context Managers',
    context:
      'Make the resource inventory survive invalid records, unavailable files, and partial operations.',
    artifact: 'a failure-resilient inventory importer',
    objectives: [
      'Handle only expected failures at boundaries while preserving diagnostic causes.',
      'Design exception types and messages that support recovery.',
      'Guarantee cleanup with finally and context managers.',
    ],
    skills: [
      [
        'python-exception-hierarchy',
        'Match exception handlers to the hierarchy and catch the narrow failures the current boundary can recover from.',
        'Catching Exception around an entire program is a reliable recovery strategy.',
      ],
      [
        'python-try-else-finally',
        'Use try, except, else, and finally so protected work, success work, and cleanup have distinct roles.',
        'Finally runs only when an exception was raised.',
      ],
      [
        'python-raise-chaining',
        'Raise meaningful exceptions and preserve or suppress causes deliberately with exception chaining syntax.',
        'Raising a new exception automatically keeps the original message visible without chaining.',
      ],
      [
        'python-domain-exceptions',
        'Define small domain-specific exception types only when callers need a meaningful recovery distinction.',
        'Every validation rule needs its own exception class.',
      ],
      [
        'python-context-managers',
        'Use with and context-manager protocols to guarantee acquisition and release across success and failure.',
        'A with statement suppresses every exception raised inside the block.',
      ],
      [
        'python-failure-observability',
        'Log actionable context without secrets, preserve tracebacks, and distinguish user messages from operator evidence.',
        'Printing the exception text always provides enough production diagnostics.',
      ],
    ],
  },
  {
    id: 'python-files-serialization',
    title: 'Files, Paths, CSV, JSON, and Data Boundaries',
    context: 'Import, validate, transform, and safely publish local nonprofit program data.',
    artifact: 'a repeatable data-quality reporting pipeline',
    objectives: [
      'Read and write text and binary files with explicit paths, encoding, newline, and lifetime.',
      'Serialize CSV and JSON without confusing transport format with trusted schema.',
      'Protect original data through validation and safe output replacement.',
    ],
    skills: [
      [
        'python-pathlib-paths',
        'Use pathlib to compose, inspect, resolve, traverse, and constrain filesystem paths portably.',
        'String concatenation with slash characters is the most portable path strategy.',
      ],
      [
        'python-file-text-binary',
        'Open text or binary files with explicit mode, encoding, newline, and context-managed lifetime.',
        'The platform default text encoding is guaranteed to be UTF-8.',
      ],
      [
        'python-streaming-files',
        'Process large files incrementally and choose whole-file reads only when bounded size and simplicity justify them.',
        'Readlines streams one line at a time without storing the file.',
      ],
      [
        'python-csv-contracts',
        'Read and write CSV with dialect, header, newline, type-conversion, and malformed-row policies.',
        'Splitting each line on commas correctly parses every CSV file.',
      ],
      [
        'python-json-contracts',
        'Encode and decode JSON while validating required shape, types, missing values, and unsupported Python objects.',
        'JSON loading validates application schema and converts every date automatically.',
      ],
      [
        'python-safe-file-updates',
        'Write outputs through backup or temporary-file replacement so partial failure does not destroy the last good artifact.',
        'Opening a destination in write mode preserves the previous content until close.',
      ],
    ],
  },
  {
    id: 'python-modules-environments',
    title: 'Modules, Packages, Environments, and Command Lines',
    context: 'Turn the reporting pipeline into an installable and repeatable command-line tool.',
    artifact: 'an installable data-report command',
    objectives: [
      'Separate module APIs from script entry points and import-time side effects.',
      'Use virtual environments and declared dependencies for reproducibility.',
      'Design a usable command-line interface with help, errors, and exit status.',
    ],
    skills: [
      [
        'python-import-model',
        'Explain module search, import caching, names, qualified access, and circular-import failure conditions.',
        'Import executes a module from scratch every time the statement appears.',
      ],
      [
        'python-module-api',
        'Organize public module functions, constants, docstrings, and private implementation names around stable responsibilities.',
        'A leading underscore makes an attribute inaccessible outside the module.',
      ],
      [
        'python-main-guard',
        'Use the main guard to separate importable behavior from command-line execution and testing.',
        'The main guard prevents the file from being imported.',
      ],
      [
        'python-packages-layout',
        'Create package and subpackage layouts with deliberate absolute or relative imports and no hidden path mutation.',
        'Adding directories to sys.path inside code is normal package configuration.',
      ],
      [
        'python-venv-dependencies',
        'Create isolated virtual environments and record direct dependency and supported-Python constraints reproducibly.',
        'A virtual environment makes dependency versions identical without a lock or constraints record.',
      ],
      [
        'python-pyproject-basics',
        'Read and author basic pyproject metadata, build-system, script entry point, and tool configuration boundaries.',
        'Pyproject configuration is used only when publishing to a public package index.',
      ],
      [
        'python-argparse-cli',
        'Build a command-line interface with argparse subcommands, validated options, useful help, standard streams, and exit codes.',
        'A command-line tool should print every error to standard output and exit zero.',
      ],
    ],
  },
  {
    id: 'python-iteration-laziness',
    title: 'Iterators, Generators, and Lazy Pipelines',
    context:
      'Stream large activity exports through bounded-memory validation and aggregation stages.',
    artifact: 'a lazy activity-processing pipeline',
    objectives: [
      'Implement and consume iterator protocol behavior without accidental exhaustion.',
      'Use generators and itertools for readable bounded-memory transformations.',
      'Make pipeline errors and resource lifetime observable.',
    ],
    skills: [
      [
        'python-iterable-iterator',
        'Distinguish iterable, iterator, iter, next, StopIteration, restartability, and one-pass consumption.',
        'Calling iter on any iterator always creates a fresh independent iterator.',
      ],
      [
        'python-generator-functions',
        'Write generator functions with yield, local suspended state, return behavior, and cleanup-aware consumption.',
        'Calling a generator function executes its body immediately and returns the first value.',
      ],
      [
        'python-generator-expressions',
        'Use generator expressions for single-pass pipelines while materializing when reuse or random access is required.',
        'Generator expressions can be iterated repeatedly like lists.',
      ],
      [
        'python-itertools-pipelines',
        'Compose islice, chain, pairwise, groupby, accumulate, and combinatoric tools with sortedness and memory constraints.',
        'Groupby finds all equal values anywhere in an unsorted input.',
      ],
      [
        'python-lazy-debugging',
        'Diagnose iterator exhaustion, late exceptions, retained resources, and partial consumption with explicit probes and tests.',
        'Lazy pipelines raise every possible error when the pipeline is defined.',
      ],
    ],
  },
  {
    id: 'python-standard-library',
    title: 'Standard Library Problem Solving',
    context:
      'Add time, statistics, secure identifiers, text search, process, and logging features to the data tool.',
    artifact: 'a standard-library operations toolkit',
    objectives: [
      'Select standard-library modules from task contracts rather than memorized recipes.',
      'Handle time zones, randomness, processes, and text patterns safely.',
      'Keep external effects injectable and testable.',
    ],
    skills: [
      [
        'python-datetime-timezone',
        'Use date, time, datetime, timedelta, and timezone-aware values without comparing naive and aware timestamps.',
        'A naive datetime automatically represents the local timezone unambiguously.',
      ],
      [
        'python-math-statistics',
        'Use math and statistics functions with explicit domain, empty-input, precision, and outlier assumptions.',
        'A mean is always the most representative summary of numeric data.',
      ],
      [
        'python-random-secrets',
        'Use random for simulation and secrets for security-sensitive tokens while controlling reproducibility where appropriate.',
        'Seeding random makes its output suitable for passwords and reset tokens.',
      ],
      [
        'python-re-patterns',
        'Compile and test regular expressions with groups, boundaries, flags, escaping, and pathological-input awareness.',
        'A greedy pattern always produces the most semantically correct match.',
      ],
      [
        'python-subprocess-boundaries',
        'Run external commands with argument lists, checked results, timeouts, captured streams, and no unsafe shell interpolation.',
        'Shell true is required whenever a command contains more than one argument.',
      ],
      [
        'python-logging-configuration',
        'Use named loggers, levels, structured context, handlers, and secret-safe messages without configuring libraries globally.',
        'Library modules should call basicConfig so application logs always appear.',
      ],
    ],
  },
  {
    id: 'python-testing-debugging',
    title: 'Testing, Debugging, and Quality Evidence',
    context:
      'Verify the command-line data tool across pure logic, filesystem boundaries, failures, and changed inputs.',
    artifact: 'a tested data-report release candidate',
    objectives: [
      'Design tests from observable contracts, boundaries, and failure modes.',
      'Use fixtures, parametrization, test doubles, and integration tests without coupling to implementation.',
      'Debug from reproduction and evidence and measure coverage as a map, not a target.',
    ],
    skills: [
      [
        'python-assert-contracts',
        'Use assertions for programmer invariants and tests rather than recoverable user validation.',
        'Running Python normally guarantees every assert statement remains enabled.',
      ],
      [
        'python-unit-test-design',
        'Test one observable behavior with arrange-act-assert structure, deterministic data, and meaningful failure output.',
        'A unit test must correspond to exactly one function in the implementation.',
      ],
      [
        'python-fixtures-parametrize',
        'Use fixtures and parametrized cases to expose meaningful variation without shared mutable test state.',
        'A large fixture that builds the full application makes every unit test more realistic.',
      ],
      [
        'python-test-doubles',
        'Choose fakes, stubs, spies, and mocks at external boundaries without asserting private call choreography unnecessarily.',
        'Mocking every collaborator makes a test independent and therefore more valuable.',
      ],
      [
        'python-integration-tests',
        'Test filesystem, process, serialization, and package boundaries with controlled temporary environments.',
        'Integration tests should use the developer machine home directory for realism.',
      ],
      [
        'python-debug-method',
        'Reproduce, minimize, hypothesize, inspect state, repair one cause, and rerun a named regression set.',
        'Trying several changes together is faster because one of them may solve the defect.',
      ],
      [
        'python-coverage-quality',
        'Use coverage, mutation ideas, static analysis, formatting, and review as complementary evidence rather than score chasing.',
        'One hundred percent line coverage proves the program is correct.',
      ],
    ],
  },
  {
    id: 'python-release-capstone',
    title: 'Secure, Performant, and Maintainable Python Delivery',
    context:
      'Deliver a trustworthy local automation product for a community program with operator and learner documentation.',
    artifact: 'a production-shaped local automation capstone',
    objectives: [
      'Translate stakeholder needs into bounded acceptance and failure criteria.',
      'Handle secrets, external input, performance, and release packaging deliberately.',
      'Publish tests, operational evidence, reflection, and extension decisions.',
    ],
    skills: [
      [
        'python-requirements-decomposition',
        'Turn stakeholder stories into explicit inputs, outputs, invariants, failures, acceptance checks, and staged implementation work.',
        'Starting with all requested features is the fastest path to validated requirements.',
      ],
      [
        'python-input-security',
        'Treat files, arguments, environment values, paths, and subprocess data as untrusted boundaries with least authority.',
        'A local command-line program does not need input or path security.',
      ],
      [
        'python-secrets-configuration',
        'Keep secrets out of source and logs while validating configuration presence, provenance, and safe defaults.',
        'Environment variables are automatically safe to print and commit.',
      ],
      [
        'python-performance-profiling',
        'Measure time and memory on representative workloads before optimizing algorithms, data structures, or I/O.',
        'Shorter source code is a reliable indicator of faster execution.',
      ],
      [
        'python-release-packaging',
        'Produce a clean environment install, command entry point, version, dependency record, tests, and reproducible release checklist.',
        'A program that runs from the source directory is proven installable.',
      ],
      [
        'python-capstone-evidence',
        'Defend architecture, correctness, accessibility of terminal output, security, failure recovery, and future extensions with evidence.',
        'A demonstration of the happy path is sufficient capstone evidence.',
      ],
    ],
  },
];

const projects = [
  {
    id: 'cli-field-journal',
    afterModuleId: 'python-functions-contracts',
    title: 'Command-Line Learning Field Journal',
    stakeholder: 'An adult education facilitator supporting offline learners',
    userNeed:
      'Learners need a fast local journal with validation, search, summaries, and recoverable errors.',
    constraints: [
      'Runs without network access',
      'Keyboard and screen-reader friendly output',
      'No lost entries after invalid input',
    ],
    competencyIds: [
      'python-runtime-model',
      'python-string-methods',
      'python-conditionals-guards',
      'python-function-definition',
      'python-return-contracts',
    ],
    rubricDimensions: [
      'Functional correctness and recovery',
      'Readable command interaction',
      'Function contract quality',
    ],
  },
  {
    id: 'data-quality-report',
    afterModuleId: 'python-files-serialization',
    title: 'Community Program Data Quality Report',
    stakeholder: 'A nonprofit operations coordinator',
    userNeed:
      'Staff need repeatable CSV and JSON validation with explainable corrections and safe outputs.',
    constraints: [
      'Original input remains unchanged',
      'Large files use bounded memory',
      'Every rejected record has a reason',
    ],
    competencyIds: [
      'python-dict-merge-nested',
      'python-exception-hierarchy',
      'python-pathlib-paths',
      'python-csv-contracts',
      'python-json-contracts',
      'python-safe-file-updates',
    ],
    rubricDimensions: [
      'Data boundary correctness',
      'Failure and recovery evidence',
      'Report usefulness and traceability',
    ],
  },
  {
    id: 'tested-expense-tracker',
    afterModuleId: 'python-testing-debugging',
    title: 'Tested Household Expense Tracker',
    stakeholder: 'A community financial coaching program',
    userNeed:
      'Participants need a private local tracker with imports, summaries, tests, and understandable failures.',
    constraints: [
      'No financial data leaves the device',
      'Tests cover changed and invalid records',
      'Time and currency assumptions are explicit',
    ],
    competencyIds: [
      'python-argparse-cli',
      'python-datetime-timezone',
      'python-unit-test-design',
      'python-fixtures-parametrize',
      'python-integration-tests',
      'python-debug-method',
    ],
    rubricDimensions: [
      'Correct calculations and assumptions',
      'Test design and boundary control',
      'Privacy and recovery behavior',
    ],
  },
  {
    id: 'python-automation-capstone',
    afterModuleId: 'python-release-capstone',
    title: 'Local Operations Automation Capstone',
    stakeholder: 'A small community service organization',
    userNeed:
      'Operators need a maintainable automation tool that transforms local records and produces an auditable result.',
    constraints: [
      'Clean-environment installation',
      'No plaintext secrets or destructive default',
      'Measured performance on representative data',
    ],
    competencyIds: [
      'python-requirements-decomposition',
      'python-input-security',
      'python-secrets-configuration',
      'python-performance-profiling',
      'python-release-packaging',
      'python-capstone-evidence',
    ],
    rubricDimensions: [
      'Stakeholder acceptance evidence',
      'Security and data integrity',
      'Maintainability and release quality',
    ],
  },
];

const finalExamCompetencyIds = [
  'python-runtime-model',
  'python-values-objects-names',
  'python-unicode-encoding',
  'python-match-patterns',
  'python-function-definition',
  'python-scope-legb',
  'python-copy-aliasing',
  'python-dict-merge-nested',
  'python-exception-hierarchy',
  'python-json-contracts',
  'python-import-model',
  'python-generator-functions',
  'python-subprocess-boundaries',
  'python-unit-test-design',
  'python-debug-method',
  'python-input-security',
  'python-release-packaging',
];

export const pythonBasicsConfig = {
  id: 'python-basics',
  title: 'Modern Python Foundations',
  version: '3.14-2.0.0',
  researchedAt: '2026-07-13T00:00:00.000Z',
  modules,
  projects,
  finalExamCompetencyIds,
  masteryThresholdPercent: 85,
  minimumQuestionBankSize: 320,
  examContext:
    'Solve unfamiliar command-line, data, filesystem, packaging, testing, security, and debugging incidents without workshop solutions.',
  audience: {
    description:
      'Beginning programmers and career changers who need a rigorous path from first Python execution to a tested, installable local automation product.',
    entryKnowledge: ['Use a keyboard, browser, terminal, and basic local file system.'],
    deviceConstraints: [
      'Desktop or tablet with a modern browser and optional local Python 3.14 runtime',
    ],
    accessibilityAssumptions: [
      'Learners may use keyboard navigation, zoom, screen readers, voice input, or reduced motion.',
    ],
  },
  scope: {
    includes: [
      'Python 3.14 language foundations',
      'Files, modules, environments, testing, and debugging',
      'Four cumulative command-line and data projects',
    ],
    excludes: [
      'Web frameworks and production distributed systems',
      'Advanced object-oriented architecture taught in the next course',
    ],
    nextCourses: ['python-oop'],
  },
  sources: [
    {
      title: 'The Python Tutorial',
      authority: 'official-docs',
      url: 'https://docs.python.org/3.14/tutorial/',
      version: 'Python 3.14.6',
      reviewedAt: '2026-07-13',
      scope:
        'Controls current language, control-flow, data-structure, module, I/O, and error-handling coverage.',
    },
    {
      title: 'The Python Language Reference',
      authority: 'official-docs',
      url: 'https://docs.python.org/3.14/reference/',
      version: 'Python 3.14.6',
      reviewedAt: '2026-07-13',
      scope:
        'Controls execution, expressions, statements, functions, imports, and data-model accuracy.',
    },
    {
      title: 'The Python Standard Library',
      authority: 'official-docs',
      url: 'https://docs.python.org/3.14/library/',
      version: 'Python 3.14.6',
      reviewedAt: '2026-07-13',
      scope:
        'Controls files, paths, serialization, command-line, testing, logging, processes, and standard tools.',
    },
    {
      title: 'Python Packaging User Guide',
      authority: 'official-docs',
      url: 'https://packaging.python.org/en/latest/',
      version: '2026-07',
      reviewedAt: '2026-07-13',
      scope:
        'Controls virtual environment, pyproject, dependency, installation, and distribution practice.',
    },
  ],
};

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = await generateCourseBlueprint(pythonBasicsConfig);
  console.log(
    `Generated Python Basics blueprint: ${result.competencies} competencies, ${result.modules} modules, ${result.activities} activities.`
  );
}

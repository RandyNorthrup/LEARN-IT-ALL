const REVIEWED_AT = '2026-07-13';

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

function project(id, title, afterModuleId, stakeholder, userNeed, competencyIds) {
  return {
    id,
    title,
    afterModuleId,
    stakeholder,
    userNeed,
    constraints: [
      'All changed inputs, failures, and user-visible states have reproducible evidence.',
      'Keyboard use, readable output, reduced motion, and narrow screens remain supported.',
      'No secret, unsafe dynamic execution, or unbounded external effect is introduced.',
    ],
    competencyIds,
    rubricDimensions: [
      'Runtime correctness and changed-case evidence',
      'Accessibility, resilience, and security',
      'Maintainability and stakeholder usefulness',
    ],
  };
}

const javascriptModules = [
  module(
    'javascript-runtime-evidence',
    'JavaScript Runtime, Tooling, and Evidence',
    'Trace a small service-status script from source through parsing, execution, console evidence, and a user-visible result.',
    'a reproducible service-status runtime notebook',
    [
      skill(
        'js-runtime-host',
        'Distinguish ECMAScript language behavior from browser, worker, and server host APIs.',
        'JavaScript and the browser are the same runtime specification.',
        'conceptual',
        'analyze'
      ),
      skill(
        'js-source-execution',
        'Trace source parsing, module instantiation, execution contexts, jobs, and observable output.',
        'JavaScript executes every line immediately from top to bottom without setup.',
        'conceptual',
        'analyze'
      ),
      skill(
        'js-console-debugger',
        'Use console evidence, breakpoints, scope inspection, watch expressions, and stack traces without relying on logging alone.',
        'Adding more console logs always reveals the root cause.',
        'strategic',
        'evaluate'
      ),
      skill(
        'js-strict-mode',
        'Explain strict-mode behavior and use modules without depending on error-prone sloppy-mode semantics.',
        'Strict mode only changes formatting and performance.',
        'conceptual',
        'analyze'
      ),
      skill(
        'js-source-maps',
        'Relate transformed output to authored source with source maps while verifying the actual shipped artifact.',
        'A source map proves the deployed bundle matches local source.',
        'professional',
        'evaluate'
      ),
      skill(
        'js-reproducible-environment',
        'Record runtime, module mode, inputs, locale, time, and dependency conditions needed to reproduce behavior.',
        'The same script behaves identically in every JavaScript host.',
        'metacognitive',
        'evaluate'
      ),
    ]
  ),
  module(
    'javascript-values-types',
    'Values, Types, Coercion, and Equality',
    'Normalize prices, quantities, identifiers, optional fields, and validity signals from a mixed service-data feed.',
    'a value-normalization and validation pipeline',
    [
      skill(
        'js-primitive-types',
        'Distinguish undefined, null, Boolean, Number, BigInt, String, Symbol, and object values by behavior and use.',
        'Null and undefined are interchangeable empty strings.'
      ),
      skill(
        'js-typeof-inspection',
        'Use typeof, Array.isArray, instanceof, and explicit predicates while accounting for their boundaries.',
        'Typeof precisely identifies every JavaScript value.'
      ),
      skill(
        'js-coercion-conversion',
        'Predict implicit coercion and prefer explicit conversion at external data boundaries.',
        'The plus operator always performs numeric addition.'
      ),
      skill(
        'js-equality-sameness',
        'Choose strict equality, Object.is, or collection sameness based on NaN, signed zero, identity, and domain needs.',
        'Double and triple equals differ only in coding style.'
      ),
      skill(
        'js-number-semantics',
        'Handle IEEE-754 precision, NaN, Infinity, safe integers, parsing, rounding, and decimal-sensitive decisions.',
        'Every integer and decimal is represented exactly as a Number.'
      ),
      skill(
        'js-bigint-symbol',
        'Use BigInt and Symbol only where their arithmetic, serialization, identity, and interoperability limits fit.',
        'BigInt can mix directly with Number in any arithmetic expression.'
      ),
    ]
  ),
  module(
    'javascript-bindings-scope',
    'Bindings, Scope, Closures, and Lifetime',
    'Build configurable counters and validators without leaking mutable state across community-service widgets.',
    'a closure-backed state and validation library',
    [
      skill(
        'js-let-const-var',
        'Choose const, let, or legacy var from reassignment, scope, and initialization behavior.',
        'Const makes the referenced object deeply immutable.'
      ),
      skill(
        'js-lexical-scope',
        'Resolve names through lexical environments and identify shadowing without guessing from call order.',
        'A function reads variables from wherever it is called.'
      ),
      skill(
        'js-hoisting-tdz',
        'Predict declaration instantiation, function hoisting, and temporal dead-zone failures.',
        'Let and const are not hoisted in any sense.'
      ),
      skill(
        'js-closure-state',
        'Use closures to retain purposeful private state while recognizing capture and lifetime costs.',
        'A closure copies each captured value at function creation.'
      ),
      skill(
        'js-loop-capture',
        'Preserve per-iteration bindings in callbacks and asynchronous work without index drift.',
        'Every loop callback automatically receives a frozen index.'
      ),
      skill(
        'js-garbage-reachability',
        'Reason about reachability, event-listener cleanup, weak references, and accidental retention without manual memory control.',
        'The garbage collector removes every object as soon as a function returns.',
        'conceptual',
        'analyze'
      ),
    ]
  ),
  module(
    'javascript-control-expressions',
    'Expressions, Decisions, and Iteration',
    'Route support cases through explicit rules and iterate changing record sets without truthiness or termination defects.',
    'a transparent support-case routing engine',
    [
      skill(
        'js-operator-precedence',
        'Predict expression grouping, short-circuit evaluation, assignment, optional chaining, and nullish coalescing.',
        'Nullish coalescing and logical OR reject the same values.'
      ),
      skill(
        'js-truthiness-guards',
        'Use truthiness only when every falsy value shares the same domain meaning and otherwise write explicit guards.',
        'A falsy value always means missing data.'
      ),
      skill(
        'js-conditional-branches',
        'Express mutually exclusive branches, guard clauses, and exhaustive fallbacks without unreachable paths.',
        'Nested conditionals are required for every multi-rule decision.'
      ),
      skill(
        'js-switch-semantics',
        'Use switch matching, scoped cases, fallthrough, and default behavior deliberately.',
        'Every switch case stops automatically after its statements.'
      ),
      skill(
        'js-loop-selection',
        'Choose for, while, for-of, or collection operations from iteration meaning, mutation, and termination needs.',
        'For-in is the standard way to iterate array values.'
      ),
      skill(
        'js-loop-control',
        'Use break, continue, labels, and early return without skipping cleanup or required records.',
        'A continue statement always advances every loop state variable safely.'
      ),
    ]
  ),
  module(
    'javascript-functions-contracts',
    'Functions, Parameters, this, and Callable Contracts',
    'Refactor the routing engine into testable transformations, callbacks, methods, and boundary adapters.',
    'a function-oriented routing toolkit',
    [
      skill(
        'js-function-forms',
        'Choose function declarations, expressions, arrows, and methods from hoisting, this, construction, and readability needs.',
        'Arrow functions are shorter replacements for every function form.'
      ),
      skill(
        'js-parameter-contracts',
        'Use defaults, rest parameters, destructuring, and validation without hiding required inputs.',
        'Default parameters run only when an argument is null.'
      ),
      skill(
        'js-return-side-effects',
        'Separate returned values, mutations, I/O, and thrown failures into an understandable callable contract.',
        'A function that logs a value also returns that logged value.'
      ),
      skill(
        'js-this-binding',
        'Predict this from call form and use bind, call, apply, or lexical capture only when the ownership model requires it.',
        'This refers to the function where it was written.'
      ),
      skill(
        'js-higher-order-functions',
        'Design callbacks and higher-order functions with explicit timing, error, and return-value contracts.',
        'Passing a function always executes it immediately.'
      ),
      skill(
        'js-recursion-stack',
        'Choose recursion or iteration from data shape, stack depth, termination, and clarity constraints.',
        'Tail-recursive JavaScript is guaranteed to use constant stack space in all engines.'
      ),
    ]
  ),
  module(
    'javascript-collections-iteration',
    'Arrays, Collections, Iterables, and Generators',
    'Transform ordered requests, unique identifiers, lookup tables, and streaming batches while preserving ownership and order.',
    'a collection-processing and streaming pipeline',
    [
      skill(
        'js-array-mutation',
        'Choose mutating or copying array operations and document ownership before updating shared data.',
        'Every array method returns a new independent array.'
      ),
      skill(
        'js-array-transformations',
        'Use map, filter, reduce, find, some, every, flat, and flatMap from the required output and early-exit behavior.',
        'Reduce is always clearer and faster than named intermediate operations.'
      ),
      skill(
        'js-array-sort',
        'Sort with a valid comparator, copying policy, stability expectations, and locale-aware text rules.',
        'Default array sorting orders numbers numerically.'
      ),
      skill(
        'js-map-set',
        'Choose Map, Set, WeakMap, or WeakSet from key identity, enumeration, retention, and lookup needs.',
        'Map and plain object keys have identical behavior.'
      ),
      skill(
        'js-iterable-protocol',
        'Implement and consume iterable and iterator protocols with correct done and value transitions.',
        'Any object with a length property is automatically iterable.'
      ),
      skill(
        'js-generators',
        'Use generators for lazy staged iteration while handling inputs, return, throw, and cleanup behavior.',
        'Calling a generator function immediately runs its body to completion.'
      ),
    ]
  ),
  module(
    'javascript-objects-prototypes',
    'Objects, Prototypes, Properties, and Data Shape',
    'Model service records and shared behavior while defending against accidental mutation and unsafe property input.',
    'a validated service-record domain model',
    [
      skill(
        'js-object-properties',
        'Create, read, update, delete, enumerate, and compute properties while distinguishing own and inherited state.',
        'In and Object.hasOwn report exactly the same property set.'
      ),
      skill(
        'js-destructuring-spread',
        'Use object destructuring, rest, and spread while accounting for shallow copies, accessors, and overwrite order.',
        'Object spread creates a deep clone of nested state.'
      ),
      skill(
        'js-prototype-chain',
        'Trace property lookup and method sharing through the prototype chain without class-only mental models.',
        'Each instance stores a private copy of every prototype method.'
      ),
      skill(
        'js-property-descriptors',
        'Use data or accessor descriptors and explain writable, enumerable, and configurable constraints.',
        'Object.freeze recursively freezes every reachable object.'
      ),
      skill(
        'js-object-integrity',
        'Apply preventExtensions, seal, freeze, or immutable update patterns at deliberate ownership boundaries.',
        'Freezing every object is a complete state-management strategy.'
      ),
      skill(
        'js-prototype-pollution',
        'Validate external keys and use safe containers or allowlists to prevent prototype-pollution paths.',
        'JSON data cannot affect object prototypes because it is only text.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  module(
    'javascript-classes-composition',
    'Classes, Private State, Inheritance, and Composition',
    'Build maintainable scheduling components with explicit invariants and replaceable policies.',
    'a policy-driven scheduling component library',
    [
      skill(
        'js-class-semantics',
        'Explain classes as prototype-based constructs with strict bodies, constructors, methods, and fields.',
        'JavaScript classes replace and bypass prototypes.'
      ),
      skill(
        'js-private-static',
        'Use private fields, static fields, and static blocks without confusing instance and constructor state.',
        'A naming underscore creates language-enforced privacy.'
      ),
      skill(
        'js-getters-setters',
        'Use accessors for stable property semantics without hiding expensive work or surprising side effects.',
        'A getter is equivalent to a cached public field.'
      ),
      skill(
        'js-inheritance-super',
        'Use extends and super with correct construction and method lookup while avoiding fragile base-class contracts.',
        'Inheritance is the safest default for sharing any behavior.'
      ),
      skill(
        'js-composition-policies',
        'Prefer composition and injected policies when behaviors vary independently or require isolated testing.',
        'Composition means copying methods into every object.'
      ),
      skill(
        'js-instance-contracts',
        'Enforce constructor and method invariants with changed-case tests rather than relying on nominal class names.',
        'Instanceof proves an object satisfies every behavioral requirement.'
      ),
    ]
  ),
  module(
    'javascript-errors-debugging',
    'Errors, Cleanup, and Root-Cause Debugging',
    'Diagnose malformed records and failed operations while keeping cleanup, user recovery, and causal evidence intact.',
    'a recoverable import and diagnostics workflow',
    [
      skill(
        'js-error-types',
        'Differentiate syntax, reference, type, range, aggregate, DOM, and domain errors by evidence and recovery boundary.',
        'Every JavaScript failure is a generic Error with equivalent meaning.'
      ),
      skill(
        'js-throw-cause',
        'Throw Error objects with stable messages, structured context, and preserved causes without exposing secrets.',
        'Throwing a string is equivalent to throwing an Error.'
      ),
      skill(
        'js-try-catch-finally',
        'Place try, catch, and finally around the smallest recoverable boundary without swallowing failures or overriding control flow.',
        'A finally block runs only when catch handles an error.'
      ),
      skill(
        'js-custom-errors',
        'Create domain error types only when callers need stable programmatic distinctions and recovery actions.',
        'Every unique message needs a unique error subclass.'
      ),
      skill(
        'js-debug-hypotheses',
        'Reduce failures, form falsifiable hypotheses, inspect state and stacks, repair causes, and rerun regression cases.',
        'The line that throws is always the line that created the defect.',
        'strategic',
        'evaluate'
      ),
      skill(
        'js-resource-cleanup',
        'Release listeners, timers, streams, locks, and disposable resources on success, failure, and cancellation.',
        'Garbage collection automatically cancels all external resources.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  module(
    'javascript-async-event-loop',
    'Promises, Async Functions, and the Event Loop',
    'Coordinate status requests, deadlines, retries, and user cancellation without races or unhandled failures.',
    'a bounded asynchronous status coordinator',
    [
      skill(
        'js-event-loop-jobs',
        'Trace call stack, task, microtask, rendering, and worker boundaries without treating timing as random.',
        'Promise callbacks run immediately when a promise settles.',
        'conceptual',
        'analyze'
      ),
      skill(
        'js-promise-contracts',
        'Create, return, chain, and observe promises while preserving values and rejection paths.',
        'A fulfilled promise means the underlying user task succeeded.'
      ),
      skill(
        'js-async-await',
        'Use async and await as promise control flow without serializing independent work accidentally.',
        'Await blocks the entire JavaScript runtime thread until completion.'
      ),
      skill(
        'js-promise-combinators',
        'Choose all, allSettled, race, or any from failure, completion, and cancellation semantics.',
        'Promise.race cancels every losing operation automatically.'
      ),
      skill(
        'js-abort-timeout',
        'Propagate AbortSignal, deadlines, and cleanup through every cancellable asynchronous boundary.',
        'Ignoring a late result is equivalent to cancelling its work.'
      ),
      skill(
        'js-async-error-handling',
        'Handle asynchronous failures at the owning boundary and prevent floating or unhandled promises.',
        'A surrounding synchronous try-catch catches any later promise rejection.'
      ),
    ]
  ),
  module(
    'javascript-modules-packages',
    'Modules, Packages, and Dependency Boundaries',
    'Split the status coordinator into explicit browser modules and verify clean-environment loading and dependency behavior.',
    'a modular status application with a dependency record',
    [
      skill(
        'js-esm-import-export',
        'Use named, default, namespace, side-effect, and re-export forms with explicit public boundaries.',
        'Default exports are required for one-value modules.'
      ),
      skill(
        'js-module-graph',
        'Trace static module graph linking, live bindings, execution order, and cyclic dependency risks.',
        'Imports copy a snapshot of exported values.'
      ),
      skill(
        'js-dynamic-import',
        'Use dynamic import for conditional capability or measured loading needs with complete error states.',
        'Dynamic import automatically improves performance in every case.'
      ),
      skill(
        'js-esm-commonjs',
        'Distinguish ESM and CommonJS resolution and interop without mixing assumptions across runtimes.',
        'Require and import are interchangeable spellings.'
      ),
      skill(
        'js-package-metadata',
        'Interpret package exports, imports, type, engines, scripts, lockfiles, and semantic versions at install and runtime boundaries.',
        'A permissive version range guarantees compatible behavior.'
      ),
      skill(
        'js-dependency-security',
        'Minimize, verify, update, and audit dependencies while treating install scripts and transitive code as executable supply-chain input.',
        'A popular package is automatically a safe dependency.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  module(
    'javascript-dom-events',
    'DOM State, Events, and Accessible Interaction',
    'Build a keyboard-operable service-status interface whose DOM, focus, announcements, and visual state stay synchronized.',
    'an accessible interactive service-status interface',
    [
      skill(
        'js-dom-query-create',
        'Query, create, move, replace, and remove DOM nodes with explicit missing-element and ownership handling.',
        'Changing an HTML string is always safer than constructing DOM nodes.'
      ),
      skill(
        'js-dom-state-render',
        'Derive DOM output from application state without duplicating conflicting sources of truth.',
        'The DOM and an in-memory state object synchronize automatically.'
      ),
      skill(
        'js-event-propagation',
        'Trace event target, currentTarget, capture, bubble, composed paths, and cancellation before delegating behavior.',
        'StopPropagation also prevents the browser default action.'
      ),
      skill(
        'js-event-delegation',
        'Delegate stable event behavior using safe target narrowing and boundaries that survive dynamic content.',
        'Every event bubbles through every DOM boundary.'
      ),
      skill(
        'js-keyboard-focus',
        'Preserve native keyboard behavior, visible focus, logical focus movement, and restoration after dynamic changes.',
        'Click handlers automatically provide complete keyboard interaction.',
        'professional',
        'evaluate'
      ),
      skill(
        'js-live-updates',
        'Announce meaningful asynchronous changes without noisy live regions or focus theft.',
        'Moving focus to every updated message is the most accessible announcement.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  module(
    'javascript-web-data-security',
    'Web Data, Fetch, Storage, and Security Boundaries',
    'Load and cache public service data while handling hostile input, offline states, privacy, and response failures.',
    'a resilient privacy-aware service-data client',
    [
      skill(
        'js-fetch-response',
        'Use fetch with explicit method, headers, body, status checks, parsing, abort, and failure-state behavior.',
        'Fetch rejects its promise for every HTTP error status.'
      ),
      skill(
        'js-url-formdata',
        'Construct and parse URL, URLSearchParams, FormData, and encoded payloads without manual delimiter bugs.',
        'String concatenation is sufficient for every URL and form body.'
      ),
      skill(
        'js-json-boundaries',
        'Parse, validate, transform, and serialize JSON while accounting for unsupported values and hostile object shape.',
        'Successful JSON.parse proves the data satisfies the application schema.'
      ),
      skill(
        'js-storage-lifecycle',
        'Choose memory, sessionStorage, localStorage, Cache, or IndexedDB from size, lifetime, concurrency, privacy, and transaction needs.',
        'LocalStorage is a secure database for secrets and user records.'
      ),
      skill(
        'js-xss-injection',
        'Keep untrusted data in text or validated structured sinks and avoid dynamic code or unsafe markup construction.',
        'Escaping angle brackets once makes a value safe in every browser context.',
        'professional',
        'evaluate'
      ),
      skill(
        'js-origin-permissions',
        'Explain origin, CORS, CSP, credentials, workers, and permission prompts as layered browser boundaries.',
        'CORS is an authentication system that protects server data from all clients.',
        'conceptual',
        'analyze'
      ),
    ]
  ),
  module(
    'javascript-testing-quality',
    'Testing, Static Quality, Performance, and Release',
    'Harden the service-data client with behavioral tests, deterministic fixtures, performance evidence, and a clean release.',
    'a tested and release-ready JavaScript application',
    [
      skill(
        'js-test-behavior',
        'Design tests around observable behavior, changed inputs, boundaries, and failures rather than implementation lines.',
        'High line coverage proves the important behavior is correct.',
        'strategic',
        'evaluate'
      ),
      skill(
        'js-test-doubles',
        'Use fakes, stubs, spies, and controlled clocks only at owned boundaries without mocking away the behavior under test.',
        'Every dependency should be mocked in a unit test.'
      ),
      skill(
        'js-async-testing',
        'Await asynchronous outcomes, control timers and network fixtures, and fail on unhandled work deterministically.',
        'Adding a delay is a reliable way to test asynchronous completion.'
      ),
      skill(
        'js-static-gates',
        'Enforce formatting, linting, type-aware JavaScript checks, tests, dead-code detection, and dependency audit in local and CI gates.',
        'A passing linter proves runtime behavior and domain correctness.',
        'professional',
        'evaluate'
      ),
      skill(
        'js-performance-measurement',
        'Measure startup, long tasks, memory retention, network, rendering, and algorithm cost before optimizing a bottleneck.',
        'Shorter source code is necessarily faster JavaScript.',
        'strategic',
        'evaluate'
      ),
      skill(
        'js-release-evidence',
        'Produce a clean-environment build, supported-runtime record, accessibility checks, rollback plan, and stakeholder acceptance evidence.',
        'A successful local run is sufficient release proof.',
        'professional',
        'evaluate'
      ),
    ]
  ),
];

const javascriptProjects = [
  project(
    'js-data-normalizer',
    'Public Service Data Normalizer',
    'javascript-control-expressions',
    'A civic information coordinator',
    'Staff need mixed public records normalized with explainable rejection and summary evidence.',
    ['js-coercion-conversion', 'js-number-semantics', 'js-truthiness-guards', 'js-loop-selection']
  ),
  project(
    'js-scheduling-library',
    'Accessible Scheduling Domain Library',
    'javascript-classes-composition',
    'A volunteer scheduling team',
    'Maintainers need replaceable scheduling rules with explicit state invariants and independent tests.',
    [
      'js-closure-state',
      'js-array-transformations',
      'js-prototype-chain',
      'js-composition-policies',
    ]
  ),
  project(
    'js-status-interface',
    'Accessible Live Service Status Interface',
    'javascript-dom-events',
    'Residents using varied devices and assistive technology',
    'People need keyboard-operable status filtering, updates, errors, and recovery without losing context.',
    [
      'js-async-await',
      'js-abort-timeout',
      'js-dom-state-render',
      'js-keyboard-focus',
      'js-live-updates',
    ]
  ),
  project(
    'js-resilient-client',
    'Resilient Public Data Client Capstone',
    'javascript-testing-quality',
    'A small public-service organization',
    'Operators need a privacy-aware modular client that survives invalid data, slow networks, offline states, and deployment changes.',
    [
      'js-module-graph',
      'js-fetch-response',
      'js-json-boundaries',
      'js-xss-injection',
      'js-async-testing',
      'js-release-evidence',
    ]
  ),
];

export const javascriptBasicsConfig = {
  id: 'javascript-basics',
  title: 'Modern JavaScript: Runtime to Accessible Application',
  version: 'es2026-2.0.0',
  researchedAt: '2026-07-13T00:00:00.000Z',
  modules: javascriptModules,
  projects: javascriptProjects,
  finalExamCompetencyIds: javascriptModules
    .flatMap((entry) => entry.skills.map((item) => item[0]))
    .filter((_, index) => index % 5 === 0),
  masteryThresholdPercent: 85,
  minimumQuestionBankSize: 320,
  examContext:
    'Solve unfamiliar JavaScript runtime, data, asynchronous, module, DOM, accessibility, security, testing, and release incidents without workshop solutions.',
  pathways: {
    prerequisiteCourseIds: ['responsive-web-design'],
    placementEvidence: [
      'Build and explain a semantic responsive page with accessible controls and browser developer-tool evidence.',
    ],
    completionEvidence: [
      'Defend four cumulative JavaScript projects against changed inputs and accessibility requirements.',
      'Pass the cumulative performance exam at or above 85 percent.',
    ],
  },
  audience: {
    description:
      'Learners moving from HTML and CSS into rigorous modern JavaScript application development.',
    entryKnowledge: [
      'Semantic HTML, accessible controls, responsive CSS, browser files, and basic developer tools.',
    ],
    deviceConstraints: [
      'Modern browser with workers enabled; all required JavaScript execution occurs locally in disposable browser workers.',
    ],
    accessibilityAssumptions: [
      'Every interaction supports keyboard navigation, zoom, readable text output, reduced motion, and assistive technology.',
    ],
  },
  scope: {
    includes: [
      'ECMAScript 2026 fundamentals and runtime semantics',
      'Asynchronous JavaScript, modules, DOM, accessible interaction, web data, security, testing, and release',
      'Four cumulative stakeholder projects',
    ],
    excludes: [
      'Framework-specific component APIs',
      'Production HTTP servers, taught in later TypeScript and backend courses',
    ],
    nextCourses: ['typescript-basics', 'http-clients-typescript'],
  },
  sources: [
    {
      title: 'MDN JavaScript Guide',
      authority: 'official-docs',
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide',
      version: '2026-07',
      reviewedAt: REVIEWED_AT,
      scope:
        'Controls language sequence, collections, objects, promises, modules, resource management, and advanced concepts.',
    },
    {
      title: 'ECMAScript 2026 Language Specification',
      authority: 'standard',
      url: 'https://tc39.es/ecma262/2026/',
      version: 'ECMAScript 2026',
      reviewedAt: REVIEWED_AT,
      scope:
        'Controls runtime semantics, types, expressions, execution contexts, jobs, modules, and language accuracy.',
    },
    {
      title: 'MDN Web API Reference',
      authority: 'official-docs',
      url: 'https://developer.mozilla.org/en-US/docs/Web/API',
      version: '2026-07',
      reviewedAt: REVIEWED_AT,
      scope:
        'Controls DOM, events, workers, fetch, storage, abort, and browser security boundary coverage.',
    },
    {
      title: 'WAI-ARIA Authoring Practices Guide',
      authority: 'standard',
      url: 'https://www.w3.org/WAI/ARIA/apg/',
      version: '2026-07',
      reviewedAt: REVIEWED_AT,
      scope: 'Controls keyboard, focus, status update, and accessible interaction requirements.',
    },
  ],
};

export const coreLanguageConfigs = [javascriptBasicsConfig, typescriptBasicsConfig];

import { typescriptBasicsConfig } from './typescript-course-config.mjs';

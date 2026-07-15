const REVIEWED_AT = '2026-07-14';

const skill = (id, statement, misconception, knowledgeType = 'procedural', level = 'apply') => [
  id,
  statement,
  misconception,
  knowledgeType,
  level,
];

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
      'Strict compiler diagnostics pass without any, unsafe assertions, or hidden suppression.',
      'External values are validated at runtime before trusted domain use.',
      'Changed schemas, failures, keyboard use, and narrow screens have reproducible evidence.',
    ],
    competencyIds,
    rubricDimensions: [
      'Type and runtime contract correctness',
      'Changed-schema and failure evidence',
      'API clarity, accessibility, and maintainability',
    ],
  };
}

const modules = [
  module(
    'typescript-compiler-runtime',
    'TypeScript, JavaScript, and the TypeScript 7 Toolchain',
    'Trace a service-status module through TypeScript 7 checking, JavaScript emission, module loading, and runtime behavior.',
    'a compiler-to-runtime evidence notebook',
    [
      skill(
        'ts-static-runtime-boundary',
        'Distinguish compile-time type evidence from emitted JavaScript and runtime validation.',
        'A passing type check proves every runtime input is valid.',
        'conceptual',
        'analyze'
      ),
      skill(
        'ts-erasure-emission',
        'Predict which TypeScript constructs erase, transform, or affect emitted JavaScript and source maps.',
        'Type annotations remain available as runtime metadata.'
      ),
      skill(
        'ts7-native-toolchain',
        'Use the TypeScript 7 native compiler and explain when a TypeScript 6 API compatibility tool remains necessary.',
        'TypeScript 7 exposes the same programmatic compiler API as TypeScript 6.',
        'professional',
        'evaluate'
      ),
      skill(
        'ts-diagnostics-evidence',
        'Read diagnostic codes, primary locations, related information, and causal type relationships before changing code.',
        'The first diagnostic is always the root cause.',
        'strategic',
        'evaluate'
      ),
      skill(
        'ts-clean-environment',
        'Record compiler, runtime, configuration, dependency, and module conditions needed to reproduce a type result.',
        'Editor success guarantees the clean command-line build uses the same project.'
      ),
    ]
  ),
  module(
    'typescript-inference-literals',
    'Inference, Annotations, Literals, and Widening',
    'Model service categories, thresholds, identifiers, and configuration without widening away domain meaning.',
    'a literal-safe service configuration model',
    [
      skill(
        'ts-inference-context',
        'Predict best-common, contextual, return, and evolving inference from the surrounding expression and use site.',
        'TypeScript infers the narrowest possible type in every context.',
        'conceptual',
        'analyze'
      ),
      skill(
        'ts-annotation-boundary',
        'Add annotations at public, recursive, overloaded, and external boundaries without redundantly annotating obvious locals.',
        'More annotations always make a program safer.'
      ),
      skill(
        'ts-literal-widening',
        'Control literal widening with const bindings, readonly context, const assertions, and const type parameters.',
        'A const variable always has a literal type for every nested property.'
      ),
      skill(
        'ts-satisfies-operator',
        'Use satisfies to check a value against a contract while retaining useful inferred literal information.',
        'Satisfies changes the runtime value into the target type.'
      ),
      skill(
        'ts-primitive-wrapper-types',
        'Use lowercase primitive types and distinguish them from boxed wrapper object types.',
        'String and string are interchangeable type spellings.'
      ),
    ]
  ),
  module(
    'typescript-unions-narrowing',
    'Unions, Unknown Values, and Control-Flow Narrowing',
    'Convert an unknown status feed into trusted records using evidence-producing guards and exhaustive decisions.',
    'an unknown-to-domain validation pipeline',
    [
      skill(
        'ts-union-common-operations',
        'Use only operations valid for every union member until evidence supports narrowing.',
        'A union value exposes all properties from every member.'
      ),
      skill(
        'ts-unknown-any-never',
        'Choose unknown, any, and never from trust, escape-hatch, and impossibility semantics.',
        'Unknown and any permit the same unchecked operations.'
      ),
      skill(
        'ts-built-in-narrowing',
        'Narrow with typeof, equality, truthiness, in, instanceof, and discriminant checks while respecting edge cases.',
        'A truthiness check safely removes only missing values.'
      ),
      skill(
        'ts-user-type-guards',
        'Write boolean predicates and type predicates whose runtime checks actually justify their claimed types.',
        'A type-predicate return annotation makes an incomplete check true.'
      ),
      skill(
        'ts-assertion-functions',
        'Use assertion functions only when failure behavior and the asserted runtime evidence are explicit.',
        'An assertion signature performs validation by itself.'
      ),
    ]
  ),
  module(
    'typescript-object-contracts',
    'Object Types, Interfaces, Aliases, and Structural Compatibility',
    'Design public service records that evolve without silently accepting misspelled, mutable, or incompatible fields.',
    'an evolvable service-record contract library',
    [
      skill(
        'ts-object-property-modifiers',
        'Model required, optional, readonly, indexed, and exact-optional property behavior under strict configuration.',
        'An optional property is always identical to a required property whose value includes undefined.'
      ),
      skill(
        'ts-interface-type-alias',
        'Choose interface or type alias from extension, unions, declaration merging, diagnostics, and API intent.',
        'Interfaces are for objects while type aliases cannot describe objects.'
      ),
      skill(
        'ts-structural-compatibility',
        'Predict structural assignability while identifying where extra members, methods, and variance create risk.',
        'Matching a type name is required for assignment.'
      ),
      skill(
        'ts-excess-property-checks',
        'Explain fresh object literal checks and preserve validation after values pass through variables or spreads.',
        'Excess-property checks reject extra keys in every assignment path.'
      ),
      skill(
        'ts-readonly-depth',
        'Distinguish readonly property, readonly collection, const assertion, and deep immutable domain policy.',
        'Readonly recursively freezes runtime objects.'
      ),
    ]
  ),
  module(
    'typescript-functions-overloads',
    'Function Types, Parameters, Overloads, and Callable APIs',
    'Refactor status calculations and adapters into callable contracts that preserve inputs, failures, and return relationships.',
    'a callable service transformation toolkit',
    [
      skill(
        'ts-function-type-contracts',
        'Model parameter, return, callback, this, and side-effect expectations with readable function types.',
        'A void callback cannot return any runtime value.'
      ),
      skill(
        'ts-parameter-variance',
        'Reason about callback parameter compatibility under strictFunctionTypes without accepting unsound narrower handlers.',
        'Function parameters are always covariant.'
      ),
      skill(
        'ts-optional-default-rest',
        'Model optional, default, rest, tuple-rest, and destructured parameters without ambiguous call shapes.',
        'Optional and default parameters have identical call and runtime behavior.'
      ),
      skill(
        'ts-overload-design',
        'Write visible overload signatures with one compatible implementation and prefer unions when return relationships do not vary.',
        'Callers can use the implementation signature of an overloaded function.'
      ),
      skill(
        'ts-void-unknown-errors',
        'Represent callbacks, thrown failures, and unknown catch values without pretending exceptions appear in return types.',
        'A function returning void cannot throw.'
      ),
    ]
  ),
  module(
    'typescript-generics-relationships',
    'Generics, Constraints, Inference, and Variance',
    'Build reusable selectors and repositories that preserve relationships between keys, inputs, outputs, and callbacks.',
    'a relationship-preserving generic data toolkit',
    [
      skill(
        'ts-generic-relationships',
        'Introduce a type parameter only when multiple positions share a relationship that callers need preserved.',
        'Every reusable function needs a generic type parameter.'
      ),
      skill(
        'ts-generic-constraints',
        'Constrain operations while returning the caller-specific subtype rather than widening to the constraint.',
        'A constrained generic always returns exactly the constraint type.'
      ),
      skill(
        'ts-keyof-indexed-access',
        'Use keyof and indexed access types to connect property names with their corresponding value types.',
        'Keyof an object always produces string.'
      ),
      skill(
        'ts-generic-inference',
        'Predict inference candidates, defaults, contextual inference, and when an explicit type argument hides a design problem.',
        'Type arguments should always be written explicitly.'
      ),
      skill(
        'ts-variance-behavior',
        'Analyze covariance, contravariance, invariance, and bivariant compatibility from producer and consumer positions.',
        'All generic containers are covariant because their element types are related.',
        'conceptual',
        'analyze'
      ),
    ]
  ),
  module(
    'typescript-classes-encapsulation',
    'Classes, Modifiers, Private State, and Abstract Contracts',
    'Implement scheduling components with runtime invariants, replaceable policies, and explicit construction rules.',
    'a typed scheduling component library',
    [
      skill(
        'ts-class-instance-static',
        'Distinguish instance-side and static-side class types, fields, methods, and constructor signatures.',
        'The class name describes only its constructor object.'
      ),
      skill(
        'ts-public-protected-private',
        'Use public, protected, TypeScript private, and JavaScript hash-private fields with their actual compile-time and runtime boundaries.',
        'The private keyword creates the same runtime privacy as a hash field.'
      ),
      skill(
        'ts-parameter-properties',
        'Use parameter properties only when concise construction does not hide validation or ownership transitions.',
        'Every constructor parameter should be a parameter property.'
      ),
      skill(
        'ts-abstract-implements',
        'Use abstract classes and implements clauses while recognizing that implementation checks do not change inferred member types.',
        'Implements copies the interface members and runtime validation into the class.'
      ),
      skill(
        'ts-composition-inheritance',
        'Choose composition or inheritance from substitution, state ownership, variation axes, and test isolation.',
        'Typing makes deep inheritance safe by default.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  module(
    'typescript-type-transforms',
    'Type Operators, Mapped Types, Conditional Types, and Templates',
    'Derive form, event, and patch contracts from one domain model without duplicating names or accepting impossible states.',
    'a derived contract and event-type library',
    [
      skill(
        'ts-typeof-type-context',
        'Use type-context typeof to derive from runtime declarations without confusing it with runtime typeof.',
        'Type-context typeof executes the referenced value.'
      ),
      skill(
        'ts-mapped-types',
        'Map over property keys with modifiers, key remapping, and value transforms while preserving intended optionality.',
        'A mapped type iterates over runtime object properties.'
      ),
      skill(
        'ts-conditional-types',
        'Use distributive and non-distributive conditional types with explicit true and false branch meaning.',
        'Every conditional type distributes over every input.'
      ),
      skill(
        'ts-infer-patterns',
        'Use infer inside conditional patterns to extract relationships without turning readable APIs into type puzzles.',
        'Infer can declare a type variable anywhere in a type alias.'
      ),
      skill(
        'ts-template-literal-types',
        'Build bounded template literal contracts while accounting for Unicode, combinatorial growth, and runtime validation.',
        'A template literal type parses and validates runtime strings automatically.'
      ),
    ]
  ),
  module(
    'typescript-state-machines',
    'Discriminated Unions, Exhaustiveness, and Result Models',
    'Replace boolean status flags and ambiguous errors with explicit request, success, failure, and cancellation states.',
    'an exhaustive asynchronous state machine',
    [
      skill(
        'ts-discriminated-unions',
        'Design variants with stable literal discriminants and variant-specific required data.',
        'Several optional properties express states as safely as a discriminated union.'
      ),
      skill(
        'ts-exhaustive-never',
        'Use never assignments or exhaustive helpers to make newly added variants produce actionable diagnostics.',
        'A default branch automatically proves every union member was handled.'
      ),
      skill(
        'ts-result-values',
        'Represent expected domain failure as typed result variants while preserving unexpected exceptions.',
        'Every exception should be converted into a success-or-error union.'
      ),
      skill(
        'ts-state-transition-contracts',
        'Constrain legal state transitions and outputs without permitting impossible intermediate combinations.',
        'If each state is typed, every transition between them is automatically legal.'
      ),
      skill(
        'ts-pattern-evolution',
        'Add, deprecate, and migrate variants with compatibility tests and consumer impact evidence.',
        'Adding a union member is always backward compatible.'
      ),
    ]
  ),
  module(
    'typescript-modules-declarations',
    'Modules, Resolution, Packages, and Declaration Files',
    'Publish a small typed library whose runtime exports, package metadata, and declaration surface agree in clean consumers.',
    'a consumable ESM package with declaration evidence',
    [
      skill(
        'ts-module-resolution',
        'Choose bundler or NodeNext resolution and trace file, extension, package exports, and type lookup decisions.',
        'Module resolution only searches for a matching source filename.'
      ),
      skill(
        'ts-type-value-imports',
        'Distinguish type-only and value imports and preserve runtime side effects intentionally.',
        'Import type and ordinary import always emit identical JavaScript.'
      ),
      skill(
        'ts-package-exports-types',
        'Align package exports, imports, type, declaration paths, runtime format, and supported environments.',
        'A types field alone makes every package subpath typed and loadable.'
      ),
      skill(
        'ts-declaration-files',
        'Author or inspect declaration files that describe real runtime values without implementations or false guarantees.',
        'A declaration file supplies the missing runtime implementation.'
      ),
      skill(
        'ts-module-augmentation',
        'Use augmentation or declaration merging only for owned, documented extension points with load-order evidence.',
        'Module augmentation can create any new runtime export.'
      ),
    ]
  ),
  module(
    'typescript-tsconfig-projects',
    'Strict TSConfig, TypeScript 7 Defaults, and Project Graphs',
    'Create a clean multi-package configuration that fails on unsafe boundaries, unused work, and incompatible module assumptions.',
    'a strict TypeScript 7 project configuration',
    [
      skill(
        'ts-strict-options',
        'Use strict, noUncheckedIndexedAccess, exactOptionalPropertyTypes, useUnknownInCatchVariables, and override checks from actual risk.',
        'The strict flag enables every possible safety option.'
      ),
      skill(
        'ts7-default-changes',
        'Account for TypeScript 7 strict, target, module, rootDir, types, and side-effect import defaults without legacy no-op flags.',
        'A TypeScript 5 configuration behaves identically under TypeScript 7.'
      ),
      skill(
        'ts-include-exclude-files',
        'Predict root files from files, include, exclude, imports, types, and library selection.',
        'Exclude prevents an imported file from joining the program.'
      ),
      skill(
        'ts-project-references',
        'Split projects with composite references, explicit outputs, graph ordering, and incremental clean-build evidence.',
        'Project references are ordinary path aliases.'
      ),
      skill(
        'ts-config-verification',
        'Use showConfig, traceResolution, explainFiles, clean builds, and fixed parallelism to diagnose configuration rather than guess.',
        'Deleting random cache files is the first reliable configuration repair.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  module(
    'typescript-runtime-validation',
    'Runtime Validation, Parsing, and Trust Boundaries',
    'Parse API, storage, URL, form, and message values into trustworthy domain records without unsafe casts.',
    'a runtime-validated public data adapter',
    [
      skill(
        'ts-external-unknown',
        'Receive external JSON, storage, DOM, environment, and message data as unknown until evidence narrows it.',
        'A generic JSON request helper can know the server response type without validation.'
      ),
      skill(
        'ts-parser-contracts',
        'Build parsers that return typed values or structured failure paths rather than booleans that discard evidence.',
        'A type guard is always a complete parser.'
      ),
      skill(
        'ts-schema-evolution',
        'Handle required, optional, deprecated, defaulted, and versioned fields with changed-schema fixtures.',
        'Making a field optional is always a harmless compatibility change.'
      ),
      skill(
        'ts-branded-refined-types',
        'Use brands or refined constructors only after runtime validation establishes the represented invariant.',
        'A brand prevents invalid values from entering through assertions or JavaScript.'
      ),
      skill(
        'ts-unsafe-assertion-audit',
        'Locate and replace as, non-null, double assertions, any, and suppression directives with evidence-producing boundaries.',
        'Type assertions convert and validate runtime values.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  module(
    'typescript-async-platform',
    'Typed Async Work, Platform APIs, and Cancellation',
    'Coordinate public-data requests, cancellation, retries, and UI state across browser and server boundaries.',
    'a typed cancellable data coordinator',
    [
      skill(
        'ts-promise-types',
        'Model promise fulfillment values and rejection handling without pretending rejected types are encoded in Promise.',
        'Promise has a second generic parameter for its rejection type.'
      ),
      skill(
        'ts-async-inference',
        'Predict async return inference and retain discriminated result relationships across awaits.',
        'An async function can directly return a non-Promise type annotation.'
      ),
      skill(
        'ts-abort-contracts',
        'Propagate AbortSignal and distinguish cancellation, timeout, transport, parsing, and domain failures.',
        'A timeout wrapper automatically cancels its underlying work.'
      ),
      skill(
        'ts-dom-event-types',
        'Narrow event targets and DOM queries without non-null assertions or unsound global casts.',
        'An event target always has the properties of the element receiving the handler.'
      ),
      skill(
        'ts-platform-lib-types',
        'Select DOM, worker, iterable, and server type libraries that match the real runtime without leaking incompatible globals.',
        'Including every lib makes a project support every runtime.'
      ),
    ]
  ),
  module(
    'typescript-testing-refactoring',
    'Behavior Tests, Type Tests, and Safe Refactoring',
    'Evolve a public API while behavior, diagnostics, inferred types, and downstream consumers remain intentionally compatible.',
    'a behavior-and-type regression suite',
    [
      skill(
        'ts-behavior-type-tests',
        'Separate runtime behavior tests from compile-time assignability, inference, and expected-error tests.',
        'A type test proves the emitted JavaScript behaves correctly.'
      ),
      skill(
        'ts-negative-type-tests',
        'Write stable rejected-usage tests that fail when diagnostics disappear or move for the wrong reason.',
        'A ts-expect-error comment is acceptable without explaining the expected failure.'
      ),
      skill(
        'ts-fixtures-boundaries',
        'Build changed-schema, invalid-value, async, and clean-consumer fixtures around public boundaries.',
        'Testing only well-typed calls covers runtime JavaScript consumers.'
      ),
      skill(
        'ts-refactor-compiler-evidence',
        'Use rename, references, deprecation, declaration diffs, and consumer builds to bound a refactor.',
        'No local diagnostics prove a public refactor is safe.'
      ),
      skill(
        'ts-type-complexity-restraint',
        'Replace clever types when diagnostics, performance, or maintenance cost exceeds their safety value.',
        'The most precise possible type is always the best API.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  module(
    'typescript-release-migration',
    'Performance, Migration, API Design, and Release Evidence',
    'Migrate and publish a production-shaped TypeScript 7 library with measurable compiler performance and consumer proof.',
    'a TypeScript 7 migration and release portfolio',
    [
      skill(
        'ts-compiler-performance',
        'Measure cold and warm checks, project graphs, declarations, memory, and parallelism before changing configuration.',
        'Type-level cleverness has no compiler performance cost.'
      ),
      skill(
        'ts-js-migration',
        'Migrate JavaScript incrementally with checkJs, JSDoc, allowJs, boundary validation, and shrinking suppression budgets.',
        'Renaming every file to ts completes a safe migration.'
      ),
      skill(
        'ts7-compatibility-migration',
        'Remove TypeScript 6 deprecations, compare TS6 and TS7 diagnostics, and document temporary API-tool compatibility.',
        'TypeScript 7 accepts every legacy compiler option and plugin API unchanged.'
      ),
      skill(
        'ts-public-api-design',
        'Design minimum expressive public types, declarations, errors, and compatibility policy around user tasks.',
        'Exporting every inferred implementation type makes an API easiest to use.',
        'professional',
        'evaluate'
      ),
      skill(
        'ts-release-evidence',
        'Verify clean install, strict build, tests, declarations, package exports, runtime smoke use, audit, rollback, and consumer acceptance.',
        'Publishing successfully proves consumers can load and use the package.',
        'professional',
        'evaluate'
      ),
    ]
  ),
];

const projects = [
  project(
    'ts-service-contracts',
    'Strict Public Service Contract Library',
    'typescript-object-contracts',
    'A civic data team',
    'Maintainers need literal-safe, evolvable records and unknown-input validation without unsafe assertions.',
    [
      'ts-literal-widening',
      'ts-satisfies-operator',
      'ts-user-type-guards',
      'ts-object-property-modifiers',
      'ts-structural-compatibility',
    ]
  ),
  project(
    'ts-domain-toolkit',
    'Relationship-Preserving Domain Toolkit',
    'typescript-type-transforms',
    'A scheduling platform team',
    'Developers need reusable callable, generic, class, and derived event contracts that preserve domain relationships.',
    [
      'ts-overload-design',
      'ts-generic-relationships',
      'ts-variance-behavior',
      'ts-composition-inheritance',
      'ts-conditional-types',
    ]
  ),
  project(
    'ts-validated-client',
    'Validated Cancellable Data Client',
    'typescript-async-platform',
    'Residents using a public status interface',
    'The client must validate changing external data, represent every request state, cancel work, and preserve accessible UI behavior.',
    [
      'ts-discriminated-unions',
      'ts-exhaustive-never',
      'ts-external-unknown',
      'ts-schema-evolution',
      'ts-abort-contracts',
      'ts-dom-event-types',
    ]
  ),
  project(
    'ts7-library-capstone',
    'TypeScript 7 Library Migration Capstone',
    'typescript-release-migration',
    'A library team and its downstream consumers',
    'The team needs a strict TypeScript 7 package with compatible declarations, measured builds, migration evidence, and rollback.',
    [
      'ts7-default-changes',
      'ts-project-references',
      'ts-negative-type-tests',
      'ts-refactor-compiler-evidence',
      'ts7-compatibility-migration',
      'ts-release-evidence',
    ]
  ),
];

export const typescriptBasicsConfig = {
  id: 'typescript-basics',
  title: 'Modern TypeScript 7: Contracts to Production',
  version: '7.0-2.0.0',
  researchedAt: '2026-07-14T00:00:00.000Z',
  modules,
  projects,
  finalExamCompetencyIds: modules
    .flatMap((entry) => entry.skills.map((item) => item[0]))
    .filter((_, index) => index % 4 === 0),
  masteryThresholdPercent: 85,
  minimumQuestionBankSize: 320,
  examContext:
    'Solve unfamiliar TypeScript 7 inference, narrowing, generic, module, configuration, runtime-validation, async, testing, migration, and release incidents without workshop solution shapes.',
  pathways: {
    prerequisiteCourseIds: ['javascript-basics'],
    placementEvidence: [
      'Build and explain a tested modern JavaScript module using objects, functions, promises, ESM, and explicit runtime validation.',
    ],
    completionEvidence: [
      'Complete and defend four cumulative TypeScript projects against changed schemas and clean-consumer fixtures.',
      'Pass the TypeScript 7 cumulative performance examination at or above 85 percent.',
    ],
  },
  audience: {
    description:
      'JavaScript developers who need rigorous TypeScript reasoning from first inference through safe public library release.',
    entryKnowledge: [
      'Modern JavaScript values, functions, objects, classes, promises, modules, DOM events, testing, and runtime validation.',
    ],
    deviceConstraints: [
      'Modern browser; strict diagnostics run server-side without executing learner source.',
    ],
    accessibilityAssumptions: [
      'All diagnostics are available as selectable text with line and column positions.',
      'Every interaction supports keyboard navigation, zoom, narrow screens, and assistive technology.',
    ],
  },
  scope: {
    includes: [
      'TypeScript 7 language, compiler, configuration, and migration behavior',
      'Inference, narrowing, object and function types, generics, classes, type transforms, modules, declarations, runtime validation, async work, testing, and release',
      'Four cumulative stakeholder projects and an independent performance exam',
    ],
    excludes: [
      'Framework-specific template compilers that still require separate TypeScript 6 integrations',
      'Production HTTP server architecture, taught in later backend courses',
    ],
    nextCourses: ['http-clients-typescript', 'cicd-github-actions', 'http-servers-typescript'],
  },
  sources: [
    {
      title: 'Announcing TypeScript 7.0',
      authority: 'official-docs',
      url: 'https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/',
      version: 'TypeScript 7.0.2',
      reviewedAt: REVIEWED_AT,
      scope:
        'Controls native compiler behavior, parallelism, TypeScript 7 defaults, removed options, JS changes, and TS6 API compatibility.',
    },
    {
      title: 'The TypeScript Handbook',
      authority: 'official-docs',
      url: 'https://www.typescriptlang.org/docs/handbook/intro.html',
      version: '2026-07',
      reviewedAt: REVIEWED_AT,
      scope:
        'Controls everyday types, narrowing, functions, objects, generics, classes, modules, and type manipulation sequence.',
    },
    {
      title: 'TypeScript TSConfig Reference',
      authority: 'official-docs',
      url: 'https://www.typescriptlang.org/tsconfig/',
      version: 'TypeScript 7 compatible',
      reviewedAt: REVIEWED_AT,
      scope:
        'Controls strictness, files, libraries, module resolution, project references, diagnostics, and emission configuration.',
    },
    {
      title: 'TypeScript Modules Reference',
      authority: 'official-docs',
      url: 'https://www.typescriptlang.org/docs/handbook/modules/reference.html',
      version: '2026-07',
      reviewedAt: REVIEWED_AT,
      scope:
        'Controls ESM, CommonJS, package resolution, declaration lookup, and runtime/type package alignment.',
    },
  ],
};

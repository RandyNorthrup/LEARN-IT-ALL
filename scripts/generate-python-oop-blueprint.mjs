import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateCourseBlueprint } from './lib/generate-course-blueprint.mjs';

const modules = [
  {
    id: 'python-object-model',
    title: 'Objects, Classes, Namespaces, and Binding',
    context:
      'Model a library circulation domain while tracing real Python object and attribute behavior.',
    artifact: 'an inspectable library domain model',
    objectives: [
      'Explain class creation, instance creation, namespaces, and method binding.',
      'Distinguish identity, type, value, class state, and instance state.',
      'Use introspection as evidence without coupling production code to implementation details.',
    ],
    skills: [
      [
        'oop-object-identity-type',
        'Reason about object identity, type, value, mutability, equality, and lifetime in an object-oriented design.',
        'Two objects with equal values are always the same object.',
      ],
      [
        'oop-class-instance',
        'Define classes and create instances while distinguishing class objects from the instances they construct.',
        'A class is only a static template and is not itself a runtime object.',
      ],
      [
        'oop-class-instance-namespaces',
        'Trace class, instance, module, and local namespaces during attribute lookup and assignment.',
        'Assigning an instance attribute changes the class attribute for every instance.',
      ],
      [
        'oop-method-binding',
        'Explain function descriptors, bound methods, self, cls, and how attribute access supplies the receiver.',
        'Python copies every method into each instance when it is created.',
      ],
      [
        'oop-class-static-methods',
        'Choose instance, class, and static methods from ownership of state and alternate-constructor needs.',
        'Static methods are faster instance methods and should replace them when self is unused.',
      ],
    ],
  },
  {
    id: 'python-construction-invariants',
    title: 'Construction, Invariants, Dataclasses, and Slots',
    context: 'Build trustworthy catalog, member, and loan objects from validated external records.',
    artifact: 'validated library entity types',
    objectives: [
      'Separate allocation, initialization, validation, and alternate construction.',
      'Use dataclasses and immutable value objects where generated behavior matches the domain.',
      'Preserve invariants across every construction and mutation path.',
    ],
    skills: [
      [
        'oop-new-init',
        'Distinguish object allocation in __new__ from initialization in __init__ and override either only for justified behavior.',
        'The return value of __init__ becomes the newly created instance.',
      ],
      [
        'oop-constructor-invariants',
        'Establish complete valid object invariants during construction or reject invalid input with meaningful errors.',
        'Partially initialized objects are acceptable when later methods fill required fields.',
      ],
      [
        'oop-alternate-constructors',
        'Implement classmethod alternate constructors that normalize external representations through one invariant path.',
        'Each alternate constructor should duplicate initialization so formats stay independent.',
      ],
      [
        'oop-dataclasses',
        'Use dataclass fields, defaults, factories, ordering, frozen behavior, and post-init validation deliberately.',
        'A frozen dataclass makes every referenced nested object immutable.',
      ],
      [
        'oop-slots-memory',
        'Use slots only after measuring memory or attribute-control needs and accounting for inheritance and weak references.',
        'Slots are a universal performance optimization for every class.',
      ],
      [
        'oop-value-objects',
        'Design immutable value objects with coherent equality, hashing, normalization, and validation semantics.',
        'Any object with an equals method is automatically safe as a dictionary key.',
      ],
    ],
  },
  {
    id: 'python-encapsulation-descriptors',
    title: 'Encapsulation, Properties, and Descriptors',
    context:
      'Protect borrower limits, item status, and identifier rules while keeping a small usable public API.',
    artifact: 'an invariant-protecting circulation model',
    objectives: [
      'Hide representation through behavior-oriented public APIs rather than access-modifier imitation.',
      'Use properties and descriptors only when managed attribute behavior is valuable.',
      'Design mutation, validation, and immutability contracts that callers can trust.',
    ],
    skills: [
      [
        'oop-public-private-conventions',
        'Use public APIs, leading-underscore conventions, and name mangling according to collaboration and subclass risks.',
        'Double-underscore names provide security and make data inaccessible.',
      ],
      [
        'oop-properties',
        'Use properties to preserve attribute-like access when validation, computation, compatibility, or read-only behavior is needed.',
        'Every attribute should have a getter and setter property for encapsulation.',
      ],
      [
        'oop-property-invariants',
        'Keep validation and invariants consistent across constructor, property setter, methods, deserialization, and copying paths.',
        'Validation in one setter guarantees no other path can violate the object.',
      ],
      [
        'oop-descriptor-protocol',
        'Explain __get__, __set__, __delete__, __set_name__, and data-versus-non-data descriptor precedence.',
        'Properties are special syntax unrelated to Python descriptors.',
      ],
      [
        'oop-reusable-descriptors',
        'Build a descriptor only when repeated managed-attribute behavior outweighs simpler property or composition designs.',
        'Descriptors are the clearest solution for any validation shared by two classes.',
      ],
      [
        'oop-immutability-defensive-copy',
        'Use immutability, snapshots, read-only views, and defensive copies according to ownership and performance needs.',
        'Returning a tuple always prevents callers from mutating the underlying nested state.',
      ],
    ],
  },
  {
    id: 'python-composition-collaboration',
    title: 'Composition, Collaboration, and Dependency Boundaries',
    context:
      'Connect catalog, lending policy, notification, clock, and persistence collaborators without hidden globals.',
    artifact: 'a composed circulation service',
    objectives: [
      'Prefer composition when behavior varies independently or ownership is has-a.',
      'Make dependencies and side effects visible at construction or call boundaries.',
      'Control coupling through small role-oriented interfaces and delegation.',
    ],
    skills: [
      [
        'oop-composition-ownership',
        'Model has-a relationships with explicit ownership, lifetime, and mutation responsibilities.',
        'Composition means the parent must always create and destroy every collaborator.',
      ],
      [
        'oop-delegation',
        'Delegate behavior through a narrow collaborator API without leaking its complete representation.',
        'Delegation is unnecessary indirection whenever one method calls another object.',
      ],
      [
        'oop-dependency-injection',
        'Supply time, storage, messaging, and policy dependencies explicitly so behavior is replaceable and testable.',
        'Dependency injection requires a framework or global service container.',
      ],
      [
        'oop-coupling-cohesion',
        'Evaluate coupling, cohesion, fan-in, change reasons, and information hiding when assigning class responsibilities.',
        'More small classes always means lower coupling and higher cohesion.',
      ],
      [
        'oop-aggregation-lifecycle',
        'Distinguish shared aggregation from owned composition and document collaborator lifecycle and failure behavior.',
        'Every has-a relationship has identical ownership and lifecycle semantics.',
      ],
      [
        'oop-tell-dont-ask',
        'Move decisions toward objects that own relevant information without creating command-heavy anemic or god objects.',
        'Tell-dont-ask forbids reading any attribute or query result from another object.',
      ],
    ],
  },
  {
    id: 'python-inheritance-mro',
    title: 'Inheritance, MRO, Super, and Mixins',
    context: 'Evaluate extension designs for physical, digital, and restricted library resources.',
    artifact: 'an extensible resource type hierarchy',
    objectives: [
      'Use inheritance only for substitutable is-a behavior.',
      'Predict method resolution and cooperative super calls in multiple inheritance.',
      'Choose composition when variation does not belong in one hierarchy.',
    ],
    skills: [
      [
        'oop-inheritance-is-a',
        'Use inheritance when a subtype preserves the semantic contract and reusable implementation of its base type.',
        'Code reuse alone is sufficient reason to create a subclass.',
      ],
      [
        'oop-method-overriding',
        'Override methods while preserving input, output, state, exception, and side-effect expectations of callers.',
        'A subtype may narrow accepted inputs because its implementation is more specific.',
      ],
      [
        'oop-super-cooperation',
        'Use zero-argument super for cooperative method chains and pass compatible arguments through participating classes.',
        'Super always calls the immediate parent named in the class definition.',
      ],
      [
        'oop-mro-c3',
        'Predict C3 method resolution order and diagnose inconsistent or surprising multiple-inheritance graphs.',
        'Python searches direct parents left to right without considering their ancestors together.',
      ],
      [
        'oop-mixins',
        'Design narrow stateless or low-state mixins with explicit requirements instead of partial domain base classes.',
        'A mixin can assume any attribute exists because subclasses will provide it.',
      ],
      [
        'oop-composition-vs-inheritance',
        'Choose composition, protocols, delegation, or inheritance by variability, substitutability, ownership, and change cost.',
        'Inheritance is more object-oriented than composition.',
      ],
    ],
  },
  {
    id: 'python-polymorphism-protocols',
    title: 'Polymorphism, Protocols, and Abstract Contracts',
    context:
      'Support interchangeable storage, notification, pricing, and item-policy implementations.',
    artifact: 'a protocol-driven circulation application',
    objectives: [
      'Use duck typing and structural protocols for small consumer-driven roles.',
      'Use abstract base classes when shared nominal identity or implementation is meaningful.',
      'Test substitutability through behavior contracts rather than type labels.',
    ],
    skills: [
      [
        'oop-duck-typing',
        'Use behavior-based polymorphism where callers depend on supported operations rather than concrete class identity.',
        'Duck typing means errors should be ignored until production calls fail.',
      ],
      [
        'oop-abc-contracts',
        'Define abstract base classes with required operations and optional shared behavior when nominal hierarchy is justified.',
        'An abstract method cannot contain any reusable implementation.',
      ],
      [
        'oop-typing-protocols',
        'Define structural Protocol roles that match consumer needs and support static checking without forced inheritance.',
        'Every class satisfying a Protocol must explicitly inherit from it.',
      ],
      [
        'oop-runtime-checks',
        'Use isinstance, issubclass, runtime-checkable protocols, and explicit capability checks only at justified boundaries.',
        'Runtime type checks are always safer than attempting the supported operation.',
      ],
      [
        'oop-liskov-contracts',
        'Evaluate subtypes against preconditions, postconditions, invariants, exceptions, and semantic expectations.',
        'Matching method names and annotations proves Liskov substitutability.',
      ],
      [
        'oop-null-object-strategy',
        'Use null objects or strategies when they preserve a real role contract better than repeated None branching.',
        'A null object should silently swallow every operation and failure.',
      ],
    ],
  },
  {
    id: 'python-special-methods',
    title: 'Special Methods and Pythonic Object Behavior',
    context:
      'Make domain values readable, comparable, hashable, iterable, callable, and resource-safe only where meaningful.',
    artifact: 'Pythonic domain and collection objects',
    objectives: [
      'Implement data-model protocols as coherent semantic sets.',
      'Keep equality, ordering, hashing, representation, and container behavior internally consistent.',
      'Avoid surprising operator overloads that obscure domain meaning.',
    ],
    skills: [
      [
        'oop-repr-str',
        'Implement __repr__ for unambiguous developer evidence and __str__ for user-facing text without leaking secrets.',
        'Repr and str should always return the same formatted text.',
      ],
      [
        'oop-equality-ordering',
        'Implement equality and ordering with NotImplemented, compatible types, and a coherent domain comparison key.',
        'Returning False is always correct when equality sees an unknown type.',
      ],
      [
        'oop-hash-contract',
        'Implement hashing only for stable equality state and preserve the rule that equal objects have equal hashes.',
        'Adding __hash__ to a mutable object makes it safe as a set member.',
      ],
      [
        'oop-operator-overloading',
        'Overload arithmetic or other operators only when algebraic meaning, result types, and reverse operations are unsurprising.',
        'Any domain method becomes more Pythonic when exposed through an operator.',
      ],
      [
        'oop-container-protocols',
        'Implement length, iteration, membership, indexing, and containment protocols with standard exception and performance behavior.',
        'Defining __getitem__ requires supporting every kind of slice and negative index.',
      ],
      [
        'oop-context-callable',
        'Implement context-manager or callable protocols when object lifetime or invocation genuinely matches those language roles.',
        'Making an object callable is equivalent to giving it a run method with no design tradeoff.',
      ],
    ],
  },
  {
    id: 'python-generics-typing',
    title: 'Modern Typing, Generics, and API Evolution',
    context:
      'Type-check interchangeable repositories, policies, events, and domain collections in Python 3.14.',
    artifact: 'a statically checked domain API',
    objectives: [
      'Use modern built-in generics, unions, Self, type parameters, and protocols.',
      'Reason about variance and callable compatibility instead of silencing type errors.',
      'Treat annotations as tooling contracts with runtime introspection risks.',
    ],
    skills: [
      [
        'oop-modern-annotations',
        'Use Python 3.14 annotation syntax, built-in generics, unions, aliases, and forward references consistently.',
        'Annotations are eagerly evaluated and runtime-enforced in every Python 3.14 program.',
      ],
      [
        'oop-generic-classes',
        'Define generic classes and functions whose type parameters express a real input-output relationship.',
        'Adding a type parameter automatically makes an implementation type safe.',
      ],
      [
        'oop-variance',
        'Reason about covariance, contravariance, invariance, mutation, and substitutability in generic APIs.',
        'A container of subtypes can always replace a container of base types.',
      ],
      [
        'oop-self-class-types',
        'Use Self and type of class annotations for fluent APIs, alternate constructors, and class factories.',
        'An annotation of C and type of C describe the same runtime value.',
      ],
      [
        'oop-callable-param-spec',
        'Type callback and decorator signatures with callable protocols, ParamSpec, and return type parameters when needed.',
        'Callable ellipsis preserves complete parameter type safety.',
      ],
      [
        'oop-annotation-introspection',
        'Inspect annotations with supported APIs while accounting for lazy evaluation, forward references, and arbitrary-code risk.',
        'Reading __annotations__ directly is always safe and returns fully evaluated values.',
      ],
    ],
  },
  {
    id: 'python-object-errors-lifecycle',
    title: 'Domain Errors, State, and Resource Lifecycles',
    context:
      'Keep loan state transitions, storage sessions, and notification failures recoverable and observable.',
    artifact: 'a stateful failure-resilient service',
    objectives: [
      'Model valid state transitions explicitly and reject impossible states.',
      'Translate infrastructure failures at clear domain boundaries.',
      'Manage resources and partial operations without corrupting object invariants.',
    ],
    skills: [
      [
        'oop-state-machines',
        'Model allowed states and transitions explicitly so every method preserves domain invariants.',
        'Boolean flags remain clearer than a state model as transitions grow.',
      ],
      [
        'oop-domain-errors',
        'Define a small domain error hierarchy that communicates recoverable business failures without leaking infrastructure details.',
        'Every lower-level exception should pass unchanged through the domain API.',
      ],
      [
        'oop-exception-translation',
        'Translate storage, network, and parsing failures at ownership boundaries while preserving causes for operators.',
        'Exception translation should suppress the original cause to keep messages simple.',
      ],
      [
        'oop-resource-lifecycle',
        'Make acquisition, commit, rollback, close, and retry responsibilities explicit across collaborating objects.',
        'Garbage collection provides deterministic release for every external resource.',
      ],
      [
        'oop-transaction-boundaries',
        'Group state changes into atomic application operations with clear success, rollback, and idempotency behavior.',
        'A transaction is only a database feature and has no object-design implications.',
      ],
    ],
  },
  {
    id: 'python-solid-refactoring',
    title: 'SOLID, Code Smells, and Evidence-Driven Refactoring',
    context: 'Evolve a growing circulation system without changing its verified external behavior.',
    artifact: 'a refactored maintainable service',
    objectives: [
      'Use design principles as diagnostic questions rather than rigid rules.',
      'Identify change friction, coupling, duplication, and leaky abstraction from evidence.',
      'Refactor in small behavior-preserving steps with tests and measurements.',
    ],
    skills: [
      [
        'oop-single-responsibility',
        'Assign responsibilities by cohesive reason to change rather than forcing one method or one field per class.',
        'Single responsibility means every class contains exactly one method.',
      ],
      [
        'oop-open-closed',
        'Create extension points around observed stable variation without prebuilding speculative plugin systems.',
        'Open-closed design requires inheritance for every future feature.',
      ],
      [
        'oop-interface-segregation',
        'Expose small client-specific roles so consumers do not depend on operations they cannot or should not use.',
        'Many tiny interfaces always reduce complexity regardless of consumers.',
      ],
      [
        'oop-dependency-inversion',
        'Make high-level policy depend on stable roles while concrete infrastructure implements those boundaries.',
        'Dependency inversion means every class needs an interface and dependency container.',
      ],
      [
        'oop-code-smells',
        'Use smells such as feature envy, shotgun surgery, long parameter lists, and god objects as investigation prompts.',
        'A named code smell proves a specific refactoring is required.',
      ],
      [
        'oop-safe-refactoring',
        'Refactor through characterization tests, small transformations, reviewable diffs, and unchanged external behavior.',
        'A refactor may change behavior as long as the architecture becomes cleaner.',
      ],
    ],
  },
  {
    id: 'python-patterns',
    title: 'Problem-Driven Design Patterns',
    context:
      'Add pricing, notifications, imports, commands, and persistence without turning patterns into ceremony.',
    artifact: 'an extensible library operations toolkit',
    objectives: [
      'Select patterns from a demonstrated variation or boundary problem.',
      'Compare simpler functions and composition before adding pattern structure.',
      'Test extension and failure behavior through stable roles.',
    ],
    skills: [
      [
        'oop-strategy-pattern',
        'Use strategy objects or callables when an algorithm varies independently and must be selected or tested explicitly.',
        'Strategy requires one subclass for every branch even when functions suffice.',
      ],
      [
        'oop-factory-pattern',
        'Use factory functions or objects when construction choice, configuration, validation, or lifecycle must be centralized.',
        'Every constructor call should be hidden behind an abstract factory.',
      ],
      [
        'oop-adapter-pattern',
        'Wrap an incompatible external API behind the small role the application actually needs.',
        'An adapter should expose every feature of the wrapped library.',
      ],
      [
        'oop-observer-events',
        'Publish domain events to decouple secondary reactions while defining ordering, failure, duplication, and delivery semantics.',
        'Observer callbacks automatically run reliably and in parallel.',
      ],
      [
        'oop-command-pattern',
        'Represent operations as command values when queuing, logging, undo, authorization, or scheduling justifies it.',
        'Turning each method call into a command always improves testability.',
      ],
      [
        'oop-repository-pattern',
        'Use a repository boundary when domain collection semantics and persistence replacement justify abstraction.',
        'A repository is merely a class that copies every database method.',
      ],
      [
        'oop-state-pattern',
        'Use state objects when behavior varies substantially by state and explicit transition logic outgrows simpler representations.',
        'The State pattern is required whenever an object has more than one Boolean flag.',
      ],
    ],
  },
  {
    id: 'python-oop-testing',
    title: 'Testing Object Collaborations and Contracts',
    context:
      'Verify domain invariants, substitute implementations, event effects, persistence, and refactoring safety.',
    artifact: 'a contract-tested object system',
    objectives: [
      'Test observable state and collaboration outcomes instead of private implementation.',
      'Use fakes and contract suites to verify interchangeable implementations.',
      'Exercise mutation, errors, serialization, and state transitions.',
    ],
    skills: [
      [
        'oop-invariant-tests',
        'Test constructor and mutation invariants across valid boundaries, invalid inputs, and unchanged-state failures.',
        'One happy-path constructor test proves an object remains valid after mutations.',
      ],
      [
        'oop-collaboration-tests',
        'Test object collaboration through outcomes and role boundaries without over-specifying internal call order.',
        'Verifying every mock call makes collaboration tests robust to refactoring.',
      ],
      [
        'oop-fakes-mocks',
        'Choose real objects, fakes, stubs, spies, or mocks based on speed, determinism, behavior fidelity, and diagnostic value.',
        'Mocks are always more isolated and therefore preferable to fakes.',
      ],
      [
        'oop-contract-tests',
        'Run one reusable behavior contract against every protocol, repository, or strategy implementation.',
        'Static type checking proves all implementations share runtime semantics.',
      ],
      [
        'oop-property-based-invariants',
        'Generate varied values and operation sequences to test invariants when examples cannot cover the state space.',
        'Random generated tests need no reproducible seeds or minimized failures.',
      ],
      [
        'oop-serialization-tests',
        'Verify round-trip, version, missing-field, unknown-field, and invalid-data behavior at serialization boundaries.',
        'A successful round trip proves backward and forward compatibility.',
      ],
    ],
  },
  {
    id: 'python-oop-architecture-capstone',
    title: 'Object-Oriented Architecture and Capstone Delivery',
    context:
      'Deliver an extensible community-resource workflow with a domain core, replaceable boundaries, migrations, and operator evidence.',
    artifact: 'a production-shaped object-oriented capstone',
    objectives: [
      'Separate domain, application, infrastructure, and interface responsibilities.',
      'Support plugins and persistence evolution without weakening core invariants.',
      'Publish architecture, tests, failure recovery, and extension evidence.',
    ],
    skills: [
      [
        'oop-layered-boundaries',
        'Separate domain rules, application orchestration, infrastructure adapters, and user interface concerns with explicit dependencies.',
        'Layered architecture requires each layer to live in a separate deployed service.',
      ],
      [
        'oop-domain-services',
        'Use domain services only for cohesive rules that do not naturally belong to one entity or value object.',
        'Any operation involving two objects belongs in a domain service.',
      ],
      [
        'oop-serialization-versioning',
        'Version persisted representations and migrate data without coupling domain objects directly to historical storage schemas.',
        'Pickling domain objects is a stable long-term storage and migration format.',
      ],
      [
        'oop-plugin-boundaries',
        'Design plugin discovery, capability contracts, isolation, configuration, and failure behavior around a narrow extension surface.',
        'Loading arbitrary plugin code is safe when it implements the expected Protocol.',
      ],
      [
        'oop-architecture-decisions',
        'Record context, options, consequences, and reversal conditions for major object and dependency decisions.',
        'Architecture decisions are self-evident from class diagrams and need no written context.',
      ],
      [
        'oop-capstone-evidence',
        'Defend substitutability, invariants, typing, tests, persistence, failures, security, and maintainability with changed-case evidence.',
        'A class count and UML diagram demonstrate object-oriented mastery.',
      ],
    ],
  },
];

const projects = [
  {
    id: 'library-domain-model',
    afterModuleId: 'python-encapsulation-descriptors',
    title: 'Trustworthy Library Domain Model',
    stakeholder: 'A community library circulation coordinator',
    userNeed:
      'Staff need valid item, member, and loan objects that reject impossible state and explain corrections.',
    constraints: [
      'No partially valid domain objects',
      'Public API hides storage representation',
      'Equality and printed representations are coherent',
    ],
    competencyIds: [
      'oop-class-instance',
      'oop-constructor-invariants',
      'oop-dataclasses',
      'oop-properties',
      'oop-property-invariants',
      'oop-value-objects',
    ],
    rubricDimensions: [
      'Invariant and API quality',
      'Python data-model correctness',
      'Failure explanation and tests',
    ],
  },
  {
    id: 'notification-extension-system',
    afterModuleId: 'python-polymorphism-protocols',
    title: 'Extensible Notification and Policy System',
    stakeholder: 'A nonprofit program operations team',
    userNeed:
      'Operators need interchangeable email, file, and test notification channels plus configurable policy rules.',
    constraints: [
      'Core domain imports no provider SDK',
      'Failed channels preserve actionable causes',
      'Substitutes pass one shared contract suite',
    ],
    competencyIds: [
      'oop-dependency-injection',
      'oop-composition-vs-inheritance',
      'oop-duck-typing',
      'oop-typing-protocols',
      'oop-liskov-contracts',
    ],
    rubricDimensions: [
      'Boundary and substitution quality',
      'Failure isolation and observability',
      'Contract test evidence',
    ],
  },
  {
    id: 'tested-booking-engine',
    afterModuleId: 'python-oop-testing',
    title: 'Tested Resource Booking Engine',
    stakeholder: 'A community center scheduling team',
    userNeed:
      'Staff need conflict-safe bookings with replaceable repositories, notifications, and auditable state transitions.',
    constraints: [
      'Conflicting bookings never partially commit',
      'Time and persistence are injected',
      'Every implementation passes contract tests',
    ],
    competencyIds: [
      'oop-state-machines',
      'oop-transaction-boundaries',
      'oop-strategy-pattern',
      'oop-repository-pattern',
      'oop-invariant-tests',
      'oop-contract-tests',
    ],
    rubricDimensions: [
      'State and transaction correctness',
      'Pattern justification and simplicity',
      'Test depth and diagnostics',
    ],
  },
  {
    id: 'oop-workflow-capstone',
    afterModuleId: 'python-oop-architecture-capstone',
    title: 'Extensible Community Workflow Capstone',
    stakeholder: 'A small organization with changing intake and fulfillment processes',
    userNeed:
      'Maintainers need a typed, tested domain core with replaceable storage and bounded workflow extensions.',
    constraints: [
      'Clean environment install and tests',
      'Versioned persisted data migrations',
      'Untrusted plugins cannot silently corrupt domain state',
    ],
    competencyIds: [
      'oop-layered-boundaries',
      'oop-domain-services',
      'oop-serialization-versioning',
      'oop-plugin-boundaries',
      'oop-architecture-decisions',
      'oop-capstone-evidence',
    ],
    rubricDimensions: [
      'Architecture and dependency direction',
      'Evolution and failure resilience',
      'Evidence-backed maintainability',
    ],
  },
];

const finalExamCompetencyIds = [
  'oop-object-identity-type',
  'oop-method-binding',
  'oop-constructor-invariants',
  'oop-dataclasses',
  'oop-property-invariants',
  'oop-descriptor-protocol',
  'oop-dependency-injection',
  'oop-coupling-cohesion',
  'oop-super-cooperation',
  'oop-mro-c3',
  'oop-liskov-contracts',
  'oop-typing-protocols',
  'oop-hash-contract',
  'oop-container-protocols',
  'oop-generic-classes',
  'oop-variance',
  'oop-state-machines',
  'oop-transaction-boundaries',
  'oop-dependency-inversion',
  'oop-safe-refactoring',
  'oop-repository-pattern',
  'oop-contract-tests',
  'oop-layered-boundaries',
  'oop-capstone-evidence',
];

export const pythonOopConfig = {
  id: 'python-oop',
  title: 'Modern Object-Oriented Python',
  version: '3.14-2.0.0',
  researchedAt: '2026-07-13T00:00:00.000Z',
  modules,
  projects,
  finalExamCompetencyIds,
  masteryThresholdPercent: 87,
  minimumQuestionBankSize: 280,
  examContext:
    'Solve unfamiliar object-model, invariant, collaboration, inheritance, protocol, typing, lifecycle, pattern, testing, persistence, and architecture incidents.',
  audience: {
    description:
      'Python developers who can write functions, collections, files, modules, and tests and now need rigorous object design and maintainable application architecture.',
    entryKnowledge: [
      'Complete Modern Python Foundations or demonstrate equivalent functions, collections, exceptions, modules, typing, and testing skill.',
    ],
    deviceConstraints: [
      'Desktop or tablet with a modern browser and optional local Python 3.14 type-checking environment',
    ],
    accessibilityAssumptions: [
      'Learners may use keyboard navigation, zoom, screen readers, voice input, or reduced motion.',
    ],
  },
  pathways: {
    prerequisiteCourseIds: ['python-basics'],
    placementEvidence: [
      'Complete Modern Python Foundations or pass a placement build covering functions, collections, exceptions, modules, typing, files, and tests.',
    ],
    completionEvidence: [
      'Complete and defend all four typed stakeholder projects against their acceptance constraints and rubrics.',
      'Pass the cumulative object-oriented Python performance examination at or above 87 percent in changed cases.',
    ],
  },
  scope: {
    includes: [
      'Python 3.14 object and data model',
      'Composition, inheritance, protocols, generics, patterns, and refactoring',
      'Four cumulative typed and tested domain projects',
    ],
    excludes: [
      'Framework-specific web architecture',
      'Distributed systems and deployment orchestration',
    ],
    nextCourses: ['software-architecture'],
  },
  sources: [
    {
      title: 'Python Data Model Reference',
      authority: 'official-docs',
      url: 'https://docs.python.org/3.14/reference/datamodel.html',
      version: 'Python 3.14.6',
      reviewedAt: '2026-07-13',
      scope:
        'Controls object identity, classes, descriptors, method binding, special methods, MRO, and runtime behavior.',
    },
    {
      title: 'Python Tutorial Classes',
      authority: 'official-docs',
      url: 'https://docs.python.org/3.14/tutorial/classes.html',
      version: 'Python 3.14.6',
      reviewedAt: '2026-07-13',
      scope:
        'Controls introductory class, instance, namespace, inheritance, iterator, and generator explanations.',
    },
    {
      title: 'Descriptor Guide',
      authority: 'official-docs',
      url: 'https://docs.python.org/3.14/howto/descriptor.html',
      version: 'Python 3.14.6',
      reviewedAt: '2026-07-13',
      scope:
        'Controls descriptor precedence, properties, functions, methods, and managed attribute implementation.',
    },
    {
      title: 'Dataclasses Documentation',
      authority: 'official-docs',
      url: 'https://docs.python.org/3.14/library/dataclasses.html',
      version: 'Python 3.14.6',
      reviewedAt: '2026-07-13',
      scope:
        'Controls generated methods, fields, factories, frozen behavior, slots, and post-initialization.',
    },
    {
      title: 'Typing Documentation',
      authority: 'official-docs',
      url: 'https://docs.python.org/3.14/library/typing.html',
      version: 'Python 3.14.6',
      reviewedAt: '2026-07-13',
      scope:
        'Controls protocols, generics, class object types, Self, callable typing, annotation introspection, and deprecations.',
    },
  ],
};

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = await generateCourseBlueprint(pythonOopConfig);
  console.log(
    `Generated Python OOP blueprint: ${result.competencies} competencies, ${result.modules} modules, ${result.activities} activities.`
  );
}

import { finalizeCourse, project, skill } from './course-config-helpers.mjs';
import { rabbitmqTypescriptConfig } from './rabbitmq-typescript-course-config.mjs';

const REVIEWED_AT = '2026-07-14';
const RESEARCHED_AT = '2026-07-14T22:30:00.000Z';

const profiles = [
  [
    'outcomes-delivery-claims',
    'Messaging Outcomes and Delivery Evidence in Go',
    'a typed outcome and ownership evidence record',
    'separate protocol custody from application effects with explicit structs and table-driven outcomes',
    'a goroutine completing does not prove a stakeholder effect',
  ],
  [
    'architecture-pattern-selection',
    'Asynchronous Architecture Decisions for Go Services',
    'a Go service coupling and broker-fit decision record',
    'make coupling, buffering, fan-out, replay, and failure costs observable at Go service boundaries',
    'adding a channel or broker wrapper does not remove temporal coupling',
  ],
  [
    'amqp-model-routing',
    'AMQP 0-9-1 Topology and Routing Models',
    'an executable Go topology and destination model',
    'encode exchanges, bindings, routing keys, and zero-to-many destinations as deterministic Go values',
    'an amqp091 Publishing never names a destination queue directly',
  ],
  [
    'go-amqp091-contract',
    'Go 1.26 and amqp091-go 1.12 Client Contract',
    'a reviewed Go client API and lifecycle contract',
    'use amqp091-go APIs, errors, notifications, contexts, and version pins without hiding protocol meaning',
    'static Go types do not validate delivered bytes or guarantee broker custody',
  ],
  [
    'connections-channels-recovery',
    'Connections, Channel Ownership, Heartbeats, and Recovery',
    'a cancellable connection and channel recovery state machine',
    'assign one recovery owner, reject stale generations, drain notifications, and test amqp091-go 1.12 recovery limits',
    'automatic recovery does not make stale deliveries or channel references safe',
  ],
  [
    'topology-declarations-policies',
    'Topology Declarations, Policies, and Migration',
    'a versioned Go topology ownership manifest',
    'make declaration equivalence, policy ownership, precondition errors, and rollback explicit in Go configuration',
    'retrying a QueueDeclare precondition error cannot mutate the existing queue',
  ],
  [
    'direct-routing-work-queues',
    'Direct Routing and Bounded Worker Pools',
    'a capacity-aware Go work distribution service',
    'combine direct routing with bounded goroutines, prefetch, dependency capacity, and acknowledgement after durable effect',
    'one goroutine per delivery is not a capacity or fairness policy',
  ],
  [
    'fanout-publish-subscribe',
    'Fanout Pub/Sub and Subscriber Responsibilities',
    'a Go subscriber responsibility and queue lifecycle map',
    'prove one queue per responsibility, late-subscriber behavior, cancellation, and independent consumer ownership',
    'multiple goroutines consuming one queue still implement competing consumers, not broadcast',
  ],
  [
    'topic-headers-alternate-routing',
    'Topic, Headers, and Alternate Routing',
    'a deterministic Go routing and unroutable-decision table',
    'parse topic segments, match bindings, model headers, and separate alternate custody from mandatory returns',
    'a nil publish error does not establish that any primary queue received the message',
  ],
  [
    'message-envelope-schema',
    'Message Envelopes, Bytes, and Schema Evolution',
    'a bounded Go envelope decoder and compatibility matrix',
    'bound bytes before decoding, validate content metadata, preserve unknown-field policy, and test old/new schema cases',
    'decoding JSON into a struct is not complete runtime validation',
  ],
  [
    'publisher-admission-backpressure',
    'Publisher Admission, Buffering, and Backpressure',
    'a cancellable Go publisher admission controller',
    'bound in-flight confirms and bytes, consume blocked signals, serialize channel use, and propagate saturation upstream',
    'PublishWithContext is not proof that broker I/O stopped when its context ended',
  ],
  [
    'unroutable-returns',
    'Mandatory Returns and Unroutable Publication',
    'a correlated Go return and route-evidence ledger',
    'continuously consume return notifications and correlate them without assuming cross-channel event ordering',
    'publisher confirms and basic.return notifications have one guaranteed combined order',
  ],
  [
    'publisher-confirms-ambiguity',
    'Publisher Confirms, Windows, and Ambiguity',
    'a bounded Go confirm-window ledger',
    'enable confirms before publishing, drain confirmation channels, bound outstanding sequence numbers, and reconcile close ambiguity',
    'a nil PublishWithContext result is equivalent to a positive publisher confirmation',
  ],
  [
    'consumer-goroutines-shutdown',
    'Consumer Goroutines, Cancellation, and Shutdown',
    'a leak-resistant Go consumer lifecycle state machine',
    'own ConsumeWithContext channels, cancellation, in-flight handlers, deadlines, and close order under one supervisor',
    'closing a context automatically waits for every handler and acknowledgement to finish',
  ],
  [
    'delivery-tags-redelivery',
    'Delivery Tags, Acknowledgements, and Redelivery',
    'a same-channel terminal delivery decision record',
    'keep delivery tags scoped to the owning channel generation and choose exactly one Ack, Nack, or Reject after effect evidence',
    'delivery tags are globally reusable after reconnect',
  ],
  [
    'prefetch-goroutine-capacity',
    'Prefetch, Goroutine Concurrency, and Capacity',
    'a measured consumer-capacity budget',
    'relate Qos prefetch, handler goroutines, bytes, downstream pools, service time, and recovery backlog',
    'unbounded goroutines compensate for an oversized prefetch safely',
  ],
  [
    'idempotency-inbox-effects',
    'Idempotency, Inbox Transactions, and Effects',
    'a duplicate-safe Go effect state machine',
    'validate stable identity and fingerprint, compose inbox and domain mutation, and preserve external-effect ambiguity',
    'a sync.Map of seen IDs supplies durable cross-process idempotency',
  ],
  [
    'failure-retry-classification',
    'Failure Classification and Retry Budgets',
    'a typed Go failure and retry policy',
    'use errors.Is and errors.As with bounded attempt, age, delay, cancellation, and terminal-disposition evidence',
    'wrapping every failure as retryable improves resilience',
  ],
  [
    'dead-letter-poison-parking',
    'Dead Lettering, Poison Messages, and Parking',
    'a Go poison-message remediation workflow',
    'interpret x-death evidence defensively, prevent cycles, retain bounded context, and authorize replay through a separate path',
    'Nack with requeue false always preserves a message for later recovery',
  ],
  [
    'quorum-queues-replication',
    'Quorum Queues and Replicated Delivery Claims',
    'a Go quorum-availability and delivery-limit model',
    'compute majority availability, leader disruption, poison limits, confirm evidence, and restore limits without overstating safety',
    'persistent delivery mode alone proves replicated durable storage',
  ],
  [
    'rabbitmq43-retries-priorities-timeouts',
    'RabbitMQ 4.3 Retries, Priorities, and Consumer Timeouts',
    'a Go client and broker-policy compatibility record',
    'model 4.3 delayed retries, strict priorities, consumer timeouts, delivery counts, and feature-state rollout with client evidence',
    'a new broker policy can be assumed safe for existing Go consumers without a compatibility drill',
  ],
  [
    'ordering-single-active-partitioning',
    'Ordering, Single Active Consumer, and Partitioning',
    'a keyed order and failover state machine in Go',
    'scope order, partition by stable key, detect versions and gaps, and measure failover under bounded concurrency',
    'one Go receive channel guarantees global business-event order',
  ],
  [
    'streams-superstreams-choice',
    'Streams, Super Streams, and Workload Choice',
    'a queue-versus-stream Go client decision record',
    'select queue, stream, or super stream from retention, replay, throughput, partition, client, and operations evidence',
    'amqp091-go queue consumption automatically exposes every stream protocol capability',
  ],
  [
    'transactional-outbox-sagas',
    'Transactional Outbox, Inbox, and Sagas',
    'a Go outbox relay and saga recovery model',
    'compose database transaction ownership, relay confirms, duplicate-safe inbox effects, timeouts, and compensation state',
    'a goroutine that publishes after commit closes the dual-write failure window',
  ],
  [
    'security-vhosts-tls-authz',
    'TLS, Virtual Hosts, Credentials, and Authorization',
    'a Go TLS and least-privilege connection contract',
    'verify server identity, roots, client credentials, vhost permissions, rotation, redaction, and tenant abuse boundaries',
    'tls.Config with InsecureSkipVerify is acceptable inside a private network',
  ],
  [
    'observability-capacity-alarms',
    'Go Messaging Observability, Capacity, and Alarms',
    'a low-cardinality messaging telemetry and capacity plan',
    'propagate trace context, correlate publish-to-effect evidence, monitor Go runtime and broker signals, and shed load on alarms',
    'message IDs are safe Prometheus labels because they make incidents easier to trace',
  ],
  [
    'testing-race-chaos-release',
    'Contract Tests, Race and Leak Checks, Chaos, and Release',
    'a production Go messaging defense dossier',
    'layer pure tests, fuzzing, race and leak checks, disposable-broker faults, compatible rollout, upgrade, rollback, and recovery proof',
    'passing go test and a local broker demo proves production recovery',
  ],
];

const baseModules = new Map(
  rabbitmqTypescriptConfig.modules.map((entry) => [entry.id.replace('rabbit-ts-', ''), entry])
);

const skillOverrides = {
  'transfer-evidence-plan': {
    statement:
      'Plan browser models, Go compilation, vet, table tests, fuzzing, race and leak checks, disposable RabbitMQ integration, partition, restart, load, upgrade, and production transfer gates.',
    misconception:
      'A deterministic browser model or ordinary go test run proves broker replication, goroutine scheduling, and network recovery behavior.',
  },
  'runtime-client-version': {
    statement:
      'Pin Go 1.26.5, amqp091-go 1.12.0, AMQP 0-9-1, RabbitMQ 4.3.2, and the tested operating targets as one reviewed compatibility contract.',
    misconception:
      'Any Go RabbitMQ tutorial compiles and behaves unchanged across client and broker release lines.',
  },
  'promise-callback-api': {
    id: 'amqp091-api-contract',
    statement:
      'Classify amqp091-go methods, synchronous errors, notification channels, delivery channels, contexts, and confirmation streams by ownership and completion meaning.',
    misconception:
      'A nil method error means every asynchronous broker and application outcome has completed successfully.',
  },
  'unknown-message-validation': {
    statement:
      'Treat Delivery fields, properties, headers, and body bytes as untrusted data and validate decoded Go values before domain use.',
    misconception:
      'Decoding JSON into a typed Go struct validates all required business invariants.',
  },
  'event-handler-errors': {
    id: 'notification-channel-ownership',
    statement:
      'Register and continuously drain close, return, confirm, blocked, cancellation, and state-change notifications without blocking dispatch or leaking goroutines.',
    misconception:
      'Reading a notification channel only when an incident is suspected cannot block client internals or lose lifecycle evidence.',
  },
  'clean-client-build': {
    statement:
      'Prove a clean Go module download, formatting, vet, tests, race checks, compiled artifact, configuration validation, and graceful teardown under changed inputs.',
    misconception:
      'A successful go run against one local broker proves a reproducible release artifact and production contract.',
  },
  'recovery-order-generation': {
    statement:
      'Recover connection, channels, topology, confirm state, prefetch, consumers, and publisher admission in generation order while rejecting stale notifications and deliveries.',
    misconception:
      'Once automatic recovery reports open, old channel references, deliveries, and consumer tags become valid again.',
  },
  'property-equivalence': {
    statement:
      'Make QueueDeclare and ExchangeDeclare calls equivalent in type, durability, exclusivity, auto-delete, and immutable arguments and classify precondition errors.',
    misconception:
      'Repeating QueueDeclare with new fields updates an existing queue without closing the channel.',
  },
  'runtime-schema-validation': {
    statement:
      'Validate unknown envelopes and payloads after bounded decoding with required fields, semantic checks, collection limits, and explicit rejection evidence.',
    misconception:
      'The amqp091-go Delivery and Publishing types make application headers and body bytes trustworthy.',
  },
  'publish-boolean-contract': {
    id: 'publish-context-admission',
    statement:
      'Treat a nil PublishWithContext error as local call acceptance only and separately track flow control, routing, confirmation, and stakeholder effect.',
    misconception:
      'A nil PublishWithContext error proves RabbitMQ durably accepted and routed the publication.',
  },
  'mandatory-return-sequence': {
    statement:
      'Register and drain return notifications before mandatory publication and correlate content, exchange, routing key, properties, and publisher intent.',
    misconception:
      'An unroutable mandatory publication is returned as the direct error from PublishWithContext.',
  },
  'confirm-channel-contract': {
    statement:
      'Enable confirm mode before publication, continuously consume confirmations, and account for ack, nack, return, close, and unresolved sequence state.',
    misconception:
      'Confirm mode makes PublishWithContext block until the individual broker acknowledgement arrives.',
  },
  'publisher-ledger-cleanup': {
    statement:
      'Retire confirmed sequence entries, reject nacked entries, preserve ambiguous entries, cancel waiters, and prove no ledger or goroutine leak across generations.',
    misconception:
      'Automatic connection recovery reconstructs the application confirm ledger and resolves every previous publication.',
  },
  'broker-cancellation': {
    statement:
      'Treat a closed delivery channel and consumer-cancellation notifications as lifecycle events with cause, readiness, recovery, and ownership evidence.',
    misconception:
      'The deliveries channel remains open until the application explicitly calls Channel.Cancel.',
  },
  'transient-permanent-ambiguous': {
    statement:
      'Classify wrapped Go failures with errors.Is and errors.As, then combine typed cause evidence with bounded attempt, age, delay, cancellation, and terminal disposition.',
    misconception:
      'A concrete Go error type alone proves whether a failed message is safe to retry.',
  },
  'feature-version-gate': {
    statement:
      'Gate RabbitMQ 4.3 behavior on deployed broker version, queue type, policy, feature state, amqp091-go behavior, migration state, and tested fallback.',
    misconception:
      'Compiling with amqp091-go 1.12.0 guarantees the connected broker enables every RabbitMQ 4.3 feature.',
  },
  'fault-injection-matrix': {
    statement:
      'Inject return, nack, channel close, heartbeat loss, blocked connection, duplicate, poison, dependency timeout, majority loss, restart, stale generation, race, and goroutine-leak failures.',
    misconception:
      'Killing one broker process is sufficient fault and concurrency coverage for every Go messaging failure.',
  },
};

function trimPeriod(value) {
  return value.replace(/[.]$/u, '');
}

function goSpecificStatement(statement) {
  const suffix = '; in Go, retain ownership, stop-path, and changed-case evidence.';
  const maximumStem = 299 - suffix.length;
  const stem = trimPeriod(statement);
  const boundedStem =
    stem.length <= maximumStem
      ? stem
      : stem
          .slice(0, maximumStem)
          .replace(/\s+\S*$/u, '')
          .trimEnd();
  return `${boundedStem}${suffix}`;
}

function goModule([suffix, title, artifact, lens, goMisconception]) {
  const baseSuffix =
    {
      'go-amqp091-contract': 'node-amqplib-contract',
      'connections-channels-recovery': 'connections-channels-heartbeats',
      'publisher-admission-backpressure': 'publisher-buffer-backpressure',
      'consumer-goroutines-shutdown': 'consumer-lifecycle-shutdown',
      'delivery-tags-redelivery': 'acknowledgements-redelivery',
      'prefetch-goroutine-capacity': 'prefetch-concurrency-capacity',
      'testing-race-chaos-release': 'testing-chaos-recovery-release',
    }[suffix] ?? suffix;
  const base = baseModules.get(baseSuffix);
  if (!base) throw new Error(`Missing RabbitMQ base module for ${suffix}`);
  const skills = base.skills.map(([id, statement, misconception, knowledgeType, level]) => {
    const baseSkillId = id.replace('rabbit-ts-', '');
    const override = skillOverrides[baseSkillId];
    return skill(
      `rabbit-go-${override?.id ?? baseSkillId}`,
      override?.statement ?? goSpecificStatement(statement),
      override?.misconception ?? `${trimPeriod(misconception)}. In Go, ${goMisconception}.`,
      knowledgeType,
      level
    );
  });
  const context = `A Go 1.26 service team must ${lens}; reviewers reject hidden goroutine ownership, unbounded work, stale channel state, and claims that stop at a nil client error.`;
  return {
    id: `rabbit-go-${suffix}`,
    title,
    context,
    artifact,
    objectives: skills.slice(0, 3).map((entry) => entry[1]),
    skills,
    contexts: {
      theory: `${context} The learner predicts values, ownership transitions, and stop paths before seeing a model.`,
      workshop: `A Go pairing room incrementally implements ${artifact}, first with deterministic values and then with a changed failure, while keeping prior messaging invariants active.`,
      debug: `An incident packet contains a plausible ${artifact} with one stale generation, blocked notification, goroutine leak, acknowledgement, route, or effect defect; locate cause before repair.`,
      lab: `An independent Go integration team receives different topology, traffic, schema, tenant, dependency, and shutdown constraints and transfers the module into a new ${artifact}.`,
      review: `A delayed handoff reconstructs ${title.toLowerCase()} from producer, broker, queue, delivery, Go runtime, and stakeholder evidence, then challenges one protocol or concurrency misconception.`,
      quiz: `A release board compares near-miss Go and RabbitMQ decisions for ${title.toLowerCase()} and accepts only bounded ownership, causal evidence, and an explicit live-broker transfer gate.`,
    },
  };
}

const modules = profiles.map(goModule);
const retainedSources = rabbitmqTypescriptConfig.sources.filter(
  (source) => !/(amqplib|Node[.]js 24|TypeScript 7)/iu.test(source.title)
);

export const rabbitmqGoConfig = finalizeCourse(
  {
    id: 'pubsub-rabbitmq-go',
    competencyIdPrefix: 'rabbit-go-',
    title: 'RabbitMQ 4.3 Reliable Messaging with Go 1.26',
    version: '2026.07',
    audience: {
      description:
        'Go backend developers who can build production HTTP services and need to design, implement, test, operate, and defend asynchronous RabbitMQ systems without leaking goroutines or overstating delivery guarantees.',
      entryKnowledge: [
        'Build and defend a production Go 1.26 HTTP service with context cancellation, bounded concurrency, validation, persistence, security, observability, testing, and graceful shutdown.',
        'Explain Go errors, interfaces, goroutine and channel ownership, the memory model, race detection, idempotency, transactions, timeouts, backpressure, and failure ownership.',
      ],
      deviceConstraints: [
        'Modern browser; learner Go runs only in the isolated deterministic interpreter. Browser tasks model messaging values, state, routing, delivery, acknowledgement, retry, and recovery without importing amqp091-go, opening sockets, contacting RabbitMQ or Docker, reading host state, using credentials, or executing external effects.',
      ],
      accessibilityAssumptions: [
        'Topology graphs, goroutine and channel timelines, delivery state machines, routing tables, traces, and dashboards have equivalent structured text, keyboard operation, announced status, large targets, and non-color meaning.',
      ],
    },
    scope: {
      includes: [
        'RabbitMQ 4.3.2, AMQP 0-9-1, Go 1.26.5, rabbitmq/amqp091-go 1.12.0, architecture selection, exchanges, queues, bindings, client APIs, contexts, goroutine and channel ownership, connections, heartbeats, automatic and supervised recovery, topology, routing, envelopes, publisher admission, returns, confirms, consumers, delivery tags, prefetch, idempotency, retries, dead lettering, quorum queues, RabbitMQ 4.3 policies, ordering, streams, outbox and sagas, TLS, authorization, OpenTelemetry, Prometheus, Go runtime telemetry, race and leak checks, chaos, upgrades, rollback, and recovery',
        'Runnable deterministic pure-Go messaging decision functions plus explicit Go compilation, vet, race, fuzz, leak, disposable RabbitMQ, TLS, partition, restart, load, upgrade, and production transfer gates',
        'Five cumulative Go messaging systems and a performance-based production defense exam',
      ],
      excludes: [
        'Browser access to amqp091-go, RabbitMQ, AMQP sockets, Docker, host processes, credentials, external databases, management APIs, third-party effects, or production infrastructure',
        'Claiming broker, replication, TLS, partition, goroutine scheduling, race freedom, throughput, or recovery behavior from deterministic browser models without the named authorized transfer gate',
      ],
      nextCourses: ['file-servers-s3-go', 'build-ecommerce-api-go'],
    },
    sources: [
      ...retainedSources,
      {
        title: 'rabbitmq amqp091-go 1.12 API and Design',
        authority: 'official-docs',
        url: 'https://pkg.go.dev/github.com/rabbitmq/amqp091-go@v1.12.0',
        version: 'amqp091-go 1.12.0; published 2026-06-16',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls connection and channel APIs, PublishWithContext limits, ConsumeWithContext, notifications, confirms, delivery tags, queue arguments, TLS, blocked state, reconnect, state recovery, and concurrency caveats.',
      },
      {
        title: 'Go 1.26 Language and Release Contract',
        authority: 'official-docs',
        url: 'https://go.dev/doc/go1.26',
        version: 'Go 1.26.5 toolchain; Go 1.26 language and runtime',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls supported language behavior, context and signal changes, runtime and scheduler evidence, compatibility, build, vet, test, artifacts, and production transfer boundaries.',
      },
      {
        title: 'Go Memory Model, Race Detector, and Concurrency Patterns',
        authority: 'official-docs',
        url: 'https://go.dev/ref/mem',
        version: 'Go 1.26 memory model and current race detector guidance',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls happens-before reasoning, synchronization, channel ownership, cancellation, race evidence, and the limits of successful test runs.',
      },
      {
        title: 'Go Testing, Fuzzing, and Diagnostics',
        authority: 'official-docs',
        url: 'https://go.dev/doc/security/fuzz/',
        version: 'Go 1.26 testing, fuzzing, race, pprof, trace, and artifact workflows',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls table and property tests, fuzz targets, race and leak checks, benchmarks, profiles, traces, fault evidence, and reproducible release gates.',
      },
      {
        title: 'RabbitMQ Stream Go Client',
        authority: 'official-docs',
        url: 'https://github.com/rabbitmq/rabbitmq-stream-go-client',
        version: 'current RabbitMQ-maintained Go stream client reviewed 2026-07-14',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls the client boundary between AMQP 0-9-1 queue and stream use and the native RabbitMQ stream protocol for retention, replay, super streams, and high throughput.',
      },
    ],
    sharedRequirements: [
      'Every activity retrieves Go, HTTP service, accessibility, security, validation, persistence, testing, context, goroutine ownership, and evidence habits before adding one messaging boundary.',
      'Browser Go is deterministic and isolated. It models topology, routing, delivery, acknowledgement, retry, concurrency, and recovery decisions but never imports amqp091-go, opens sockets, contacts RabbitMQ, Docker, networks, databases, management APIs, or external effects, reads host state, or uses credentials.',
      'Passing work requires stable message and scenario identity, a named ownership transfer, bounded bytes, time, attempts, goroutines, and in-flight work, observable changed and failure results, cleanup and recovery, and explicit compiler, race, leak, disposable-broker, or production transfer limits.',
    ],
    modules,
    projects: [
      project(
        'rabbit-go-public-records-work-engine',
        'Bounded Public-Records Work Engine',
        'rabbit-go-direct-routing-work-queues',
        'A state public-records accessibility unit',
        'They need a Go work service with explicit claims, long-lived connection ownership, versioned topology, bounded goroutines, direct routing, fair consumers, context cancellation, and acknowledgement only after durable effect.',
        [
          'rabbit-go-outcome-evidence-contract',
          'rabbit-go-channel-ownership',
          'rabbit-go-recovery-order-generation',
          'rabbit-go-worker-effect-evidence',
        ]
      ),
      project(
        'rabbit-go-emergency-event-backbone',
        'Emergency Multi-Subscriber Event Backbone',
        'rabbit-go-publisher-confirms-ambiguity',
        'A regional emergency coordination network',
        'They need Go publishers and independent subscriber responsibilities with compatible envelopes, bounded admission, return handling, confirmation windows, late-subscriber policy, and ambiguous-publication reconciliation.',
        [
          'rabbit-go-subscriber-queue-per-responsibility',
          'rabbit-go-compatible-schema-evolution',
          'rabbit-go-drain-single-waiter',
          'rabbit-go-ambiguous-publish-recovery',
        ]
      ),
      project(
        'rabbit-go-benefit-effect-processor',
        'Duplicate-Safe Benefit Effect Processor',
        'rabbit-go-dead-letter-poison-parking',
        'A benefit eligibility notification program',
        'They need leak-resistant consumers, same-generation delivery decisions, bounded prefetch, transactional inbox effects, typed failure classification, delayed retry budgets, parking, and an audited replay tool.',
        [
          'rabbit-go-cancel-inflight-boundary',
          'rabbit-go-delivery-tag-channel-scope',
          'rabbit-go-concurrency-resource-budget',
          'rabbit-go-transactional-inbox',
          'rabbit-go-parking-remediation-workflow',
        ]
      ),
      project(
        'rabbit-go-incident-workflow-platform',
        'Replicated Incident Workflow Platform',
        'rabbit-go-transactional-outbox-sagas',
        'A multi-county incident response partnership',
        'They need quorum safety, 4.3 retry and timeout policy, keyed ordering, stream selection, a cancellable outbox relay, duplicate-safe inbox effects, and compensated workflows with operator recovery.',
        [
          'rabbit-go-replica-majority-safety',
          'rabbit-go-delayed-retry-policy',
          'rabbit-go-keyed-causal-order',
          'rabbit-go-outbox-relay-confirm',
          'rabbit-go-saga-compensation',
        ]
      ),
      project(
        'rabbit-go-production-defense',
        'RabbitMQ 4.3 and Go Production Defense',
        'rabbit-go-testing-race-chaos-release',
        'An engineering, security, accessibility, data, and operations review board',
        'The board needs least privilege, verified TLS, causal telemetry, Go runtime and broker capacity evidence, race and leak gates, broker and dependency fault drills, a supported 4.3 upgrade, compatible rollout, rollback, recovery objectives, and residual-risk ownership.',
        [
          'rabbit-go-amqps-identity-verification',
          'rabbit-go-message-flow-telemetry',
          'rabbit-go-resource-alarm-flow-control',
          'rabbit-go-fault-injection-matrix',
          'rabbit-go-rabbitmq43-upgrade-gate',
          'rabbit-go-production-defense',
        ]
      ),
    ],
    examContext:
      'Unfamiliar Go 1.26 and RabbitMQ 4.3 cases spanning architecture, AMQP entities, amqp091-go APIs and recovery, contexts, goroutine ownership, connections, channels, topology, routing, envelopes, admission, returns, confirms, consumers, delivery tags, prefetch, idempotency, retries, dead letters, quorum queues, ordering, streams, outbox, sagas, TLS, authorization, telemetry, race and leak checks, faults, upgrades, rollback, and production recovery with explicit live transfer limits.',
    minimumQuestionBankSize: 840,
  },
  { researchedAt: RESEARCHED_AT, prerequisiteCourseIds: ['http-servers-go'] }
);

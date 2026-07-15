import { finalizeCourse, module, project, skill } from './course-config-helpers.mjs';

const REVIEWED_AT = '2026-07-14';
const RESEARCHED_AT = '2026-07-14T20:00:00.000Z';

function outcome(id, statement, misconception, knowledgeType = 'procedural', level = 'apply') {
  if (!misconception) throw new Error(`Missing RabbitMQ TypeScript misconception for ${id}`);
  return skill(id, statement, misconception, knowledgeType, level);
}

function messagingModule(id, title, context, artifact, skills) {
  return {
    ...module(id, title, context, artifact, skills),
    contexts: {
      theory: context,
      workshop: `A messaging pairing room predicts publisher, exchange, queue, consumer, ownership, and failure transitions before assembling the first ${artifact} for ${title.toLowerCase()}.`,
      debug: `An incident engineer receives a plausible but defective ${artifact}; preserve message identity and timing, locate the first broken ownership boundary, and retain a deterministic regression case.`,
      lab: `An independent integration team receives different traffic, tenant, topology, schema, and failure constraints and transfers ${title.toLowerCase()} into a new ${artifact}.`,
      review: `A delayed handoff reconstructs ${title.toLowerCase()} from bounded publish, route, delivery, acknowledgement, and recovery evidence, challenges one misconception, and revises the ${artifact}.`,
      quiz: `A production review compares near-miss TypeScript messaging decisions for ${title.toLowerCase()} and requires the smallest defensible ${artifact} with changed-case evidence.`,
    },
  };
}

const modules = [
  messagingModule(
    'rabbit-ts-outcomes-delivery-claims',
    'Messaging Outcomes, Delivery Claims, and Evidence',
    'A team calls every background task reliable pub/sub, promises exactly-once delivery, and reports publish calls instead of stakeholder, ownership, loss, duplicate, latency, and recovery evidence.',
    'messaging outcome, delivery claim, and evidence charter',
    [
      outcome(
        'rabbit-ts-outcome-evidence-contract',
        'Define producer, consumer, operator, security, accessibility, latency, loss, duplicate, and recovery evidence for one messaging outcome.',
        'A successful publish call proves the user-visible workflow completed.',
        'professional',
        'create'
      ),
      outcome(
        'rabbit-ts-command-event-document',
        'Distinguish commands, events, notifications, documents, and queries by ownership, audience, expected handling, and change semantics.',
        'Every message is an event and can be named with a past-tense verb.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'rabbit-ts-delivery-guarantee-claim',
        'State at-most-once, at-least-once, effectively-once effect, ordering, and durability claims without promising impossible end-to-end exactly-once delivery.',
        'RabbitMQ can guarantee exactly one business effect across brokers, databases, and external APIs.'
      ),
      outcome(
        'rabbit-ts-ownership-handoff-map',
        'Map message ownership from producer intent through local buffer, broker confirmation, queue, delivery, consumer acknowledgement, and durable effect.',
        'TCP acceptance transfers durable responsibility to RabbitMQ.'
      ),
      outcome(
        'rabbit-ts-transfer-evidence-plan',
        'Plan browser models, TypeScript compilation, contract tests, disposable RabbitMQ integration, partition, restart, load, and production transfer gates.',
        'A deterministic browser simulation proves broker replication and network recovery behavior.',
        'metacognitive',
        'evaluate'
      ),
    ]
  ),
  messagingModule(
    'rabbit-ts-architecture-pattern-selection',
    'Asynchronous Architecture and Pattern Selection',
    'A request path adds a broker without a latency or failure reason, hides synchronous coupling behind RPC messages, and uses one global queue for work distribution, broadcasting, and replay.',
    'pattern selection and coupling decision record',
    [
      outcome(
        'rabbit-ts-temporal-coupling-decision',
        'Choose asynchronous messaging only when temporal decoupling, buffering, fan-out, failure isolation, or replay creates measurable value.',
        'A broker automatically makes a system less coupled and faster.'
      ),
      outcome(
        'rabbit-ts-work-queue-vs-pubsub',
        'Distinguish competing consumers on one queue from publish/subscribe using one queue per subscriber responsibility.',
        'Adding more consumers to one queue broadcasts every message to all consumers.'
      ),
      outcome(
        'rabbit-ts-request-reply-boundary',
        'Evaluate request/reply over messaging against ordinary HTTP using correlation, timeout, cancellation, failure ambiguity, and capacity evidence.',
        'Message-based RPC removes synchronous dependency and timeout coupling.'
      ),
      outcome(
        'rabbit-ts-choreography-orchestration',
        'Choose choreography or orchestration by workflow visibility, policy ownership, compensation, evolution, and failure diagnosis needs.',
        'Choreography has no coupling because services do not call each other directly.'
      ),
      outcome(
        'rabbit-ts-broker-fit-boundary',
        'Compare RabbitMQ queues, streams, databases, job schedulers, and logs against ordering, retention, replay, routing, throughput, and operational constraints.',
        'RabbitMQ queues are a durable event log and should retain all history indefinitely.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  messagingModule(
    'rabbit-ts-amqp-model-routing',
    'AMQP 0-9-1 Model, Virtual Hosts, Exchanges, Queues, and Bindings',
    'A diagram sends publishers directly to shared queues, confuses exchanges with storage, ignores virtual-host isolation, and cannot explain how routing keys and bindings produce zero, one, or many destinations.',
    'AMQP entity and routing graph',
    [
      outcome(
        'rabbit-ts-amqp-entity-model',
        'Trace producers, connections, channels, exchanges, bindings, queues, consumers, deliveries, and acknowledgements without collapsing their roles.',
        'An exchange stores messages until consumers become available.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'rabbit-ts-vhost-namespace-isolation',
        'Use virtual hosts as separate topology and permission namespaces while recognizing they are not complete process or resource isolation.',
        'Two virtual hosts guarantee CPU, memory, disk, and failure isolation from each other.'
      ),
      outcome(
        'rabbit-ts-routing-key-binding-match',
        'Derive destination sets from exchange type, routing key, binding key, headers, and exchange-to-exchange bindings.',
        'A routing key names the queue that must receive the message.'
      ),
      outcome(
        'rabbit-ts-zero-many-route-evidence',
        'Prove unroutable, single-route, fan-out, and overlapping multi-route outcomes with an explicit topology table.',
        'A successful exchange publish implies at least one queue accepted the message.'
      ),
      outcome(
        'rabbit-ts-amqp-error-scope',
        'Classify connection-level, channel-level, topology precondition, return, confirm, and consumer cancellation outcomes by recovery scope.',
        'Every AMQP error requires terminating the process and rebuilding the entire connection.'
      ),
    ]
  ),
  messagingModule(
    'rabbit-ts-node-amqplib-contract',
    'Node 24, TypeScript 7, and amqplib 2.0.1 Contract',
    'A service mixes callback and promise APIs, assumes publish returns a Promise, trusts TypeScript types as runtime validation, and exits before asynchronous close and confirms settle.',
    'typed amqplib lifecycle and boundary contract',
    [
      outcome(
        'rabbit-ts-runtime-client-version',
        'Pin Node 24.18, npm 12, TypeScript 7, amqplib 2.0.1, AMQP 0-9-1, and RabbitMQ 4.3.2 as one reviewed compatibility contract.',
        'Any RabbitMQ tutorial code works unchanged across client and broker major versions.'
      ),
      outcome(
        'rabbit-ts-promise-callback-api',
        'Choose one amqplib promise or callback API and account for RPC methods, event emitters, callback-only confirms, and non-RPC methods.',
        'Every amqplib method in the promise API returns an awaitable Promise.'
      ),
      outcome(
        'rabbit-ts-unknown-message-validation',
        'Treat delivered bytes, fields, properties, headers, and decoded payload as untrusted runtime data despite TypeScript declarations.',
        'A TypeScript interface validates JSON parsed from a message body.'
      ),
      outcome(
        'rabbit-ts-event-handler-errors',
        'Own connection, channel, return, drain, close, error, blocked, unblocked, cancellation, and handler-error events without unhandled process failure.',
        'A surrounding async try/catch captures errors emitted later by EventEmitter listeners.'
      ),
      outcome(
        'rabbit-ts-clean-client-build',
        'Prove clean install, strict type checking, deterministic tests, compiled artifact, connection configuration, and graceful teardown under changed inputs.',
        'A local tsx run proves the production artifact and broker contract are reproducible.'
      ),
    ]
  ),
  messagingModule(
    'rabbit-ts-connections-channels-heartbeats',
    'Connections, Channels, Heartbeats, Errors, and Recovery',
    'A service opens one TCP connection per message, shares one channel across unrelated concurrent owners, disables heartbeats, retries instantly, and redeclares consumers before topology or credentials recover.',
    'connection, channel, heartbeat, and recovery state machine',
    [
      outcome(
        'rabbit-ts-long-lived-connection',
        'Use bounded long-lived AMQP connections and explain multiplexed channels, negotiated limits, names, TLS, and lifecycle cost.',
        'Opening a new connection for every publish provides the safest isolation with negligible cost.'
      ),
      outcome(
        'rabbit-ts-channel-ownership',
        'Assign channel ownership by publisher or consumer lifecycle and prevent concurrent confirm, acknowledgement, and topology operations from corrupting assumptions.',
        'Channels are stateless thread-safe handles that can be shared across all work.'
      ),
      outcome(
        'rabbit-ts-heartbeat-timeout',
        'Choose a heartbeat timeout with network and flow-control evidence and distinguish heartbeat interval, TCP keepalive, and false-positive failure.',
        'A one-second heartbeat timeout always detects failures faster without risk.'
      ),
      outcome(
        'rabbit-ts-reconnect-backoff-jitter',
        'Reconnect with bounded exponential backoff, jitter, cancellation, credential refresh, readiness, and a single recovery owner.',
        'Every close should trigger an immediate recursive reconnect from every channel.'
      ),
      outcome(
        'rabbit-ts-recovery-order-generation',
        'Recreate connection, channels, topology, confirm state, prefetch, consumers, and publisher admission in generation order while rejecting stale callbacks.',
        'Once TCP reconnects, old channel references and consumer tags become valid again.'
      ),
    ]
  ),
  messagingModule(
    'rabbit-ts-topology-declarations-policies',
    'Topology Declarations, Property Equivalence, Policies, and Ownership',
    'Multiple services declare the same queue with different durability and arguments, hardcode every operational x-argument, delete shared topology at startup, and turn precondition failures into reconnect loops.',
    'versioned topology declaration and ownership manifest',
    [
      outcome(
        'rabbit-ts-topology-owner-contract',
        'Assign ownership for exchanges, queues, bindings, policies, migrations, rollback, and deletion across application and platform teams.',
        'Every consumer should independently create and delete all topology it can see.'
      ),
      outcome(
        'rabbit-ts-property-equivalence',
        'Make repeated declarations equivalent in type, durability, exclusivity, auto-delete, and immutable arguments and diagnose precondition mismatch.',
        'assertQueue silently updates existing queue properties to the new options.'
      ),
      outcome(
        'rabbit-ts-durable-temporary-queue',
        'Choose durable, exclusive server-named, auto-delete, and queue-TTL lifecycles from responsibility and race evidence.',
        'A non-durable named shared queue is the normal choice for temporary work in RabbitMQ 4.3.'
      ),
      outcome(
        'rabbit-ts-policy-vs-xargument',
        'Place operator-changeable TTL, limits, dead lettering, delivery limits, and queue behavior in policies instead of immutable client x-arguments where supported.',
        'Hardcoded x-arguments are preferable because applications can change them without queue recreation.'
      ),
      outcome(
        'rabbit-ts-topology-migration',
        'Migrate incompatible topology with versioned names, dual bindings, drain evidence, producer and consumer ordering, and rollback.',
        'Redeploying all services simultaneously makes destructive queue changes atomic.'
      ),
    ]
  ),
  messagingModule(
    'rabbit-ts-direct-routing-work-queues',
    'Default and Direct Exchanges, Work Queues, and Fair Dispatch',
    'A task service publishes through the default exchange without naming the coupling, assumes one queue broadcasts, uses auto-ack workers, and calls round-robin dispatch fair despite unequal task cost.',
    'direct-routing work distribution service',
    [
      outcome(
        'rabbit-ts-default-exchange-coupling',
        'Explain the default exchange queue-name binding and choose it only when direct queue-name coupling is intentional.',
        'sendToQueue bypasses exchange routing and writes directly into queue storage.'
      ),
      outcome(
        'rabbit-ts-direct-exchange-routing',
        'Design direct exchange bindings that keep producer intent stable while consumer queues evolve.',
        'A direct exchange can route only to one queue for each routing key.'
      ),
      outcome(
        'rabbit-ts-competing-consumer-semantics',
        'Use one queue with multiple consumers for load distribution and state that each delivery goes to one active consumer at a time.',
        'Every active worker receives a copy of each queued task.'
      ),
      outcome(
        'rabbit-ts-task-cost-fairness',
        'Measure service time, prefetch, unacknowledged work, capacity, and tenant fairness instead of equating round robin with fair completion.',
        'Round-robin delivery guarantees equal workload and completion latency.'
      ),
      outcome(
        'rabbit-ts-worker-effect-evidence',
        'Acknowledge only after a durable effect or safely repeatable handoff and retain message identity, attempt, result, and failure evidence.',
        'A worker should acknowledge before starting slow work to prevent duplicates.'
      ),
    ]
  ),
  messagingModule(
    'rabbit-ts-fanout-publish-subscribe',
    'Fanout Exchanges and True Publish/Subscribe',
    'Audit, notification, search, and analytics consumers share one queue and steal work from each other; a fanout exchange exists but late or disconnected subscriber behavior is undocumented.',
    'fanout subscription topology and lifecycle map',
    [
      outcome(
        'rabbit-ts-subscriber-queue-per-responsibility',
        'Give each independent subscriber responsibility its own queue so every responsibility can receive and acknowledge its copy.',
        'Multiple consumers on one queue implement publish/subscribe fan-out.'
      ),
      outcome(
        'rabbit-ts-fanout-routing-contract',
        'Use fanout routing when every binding should match and record the resulting copy count and storage responsibility.',
        'Fanout exchanges ignore bindings entirely and deliver to every queue in the virtual host.'
      ),
      outcome(
        'rabbit-ts-ephemeral-subscription',
        'Design exclusive server-named subscriptions for session-scoped state and account for disconnect, binding, declaration, and cleanup races.',
        'A well-known auto-delete queue is always safe for many reconnecting client instances.'
      ),
      outcome(
        'rabbit-ts-durable-subscription-backlog',
        'Design durable subscription queues with retention, offline backlog, capacity, replay alternatives, and ownership limits.',
        'A durable queue preserves every transient message across restart and unlimited subscriber downtime.'
      ),
      outcome(
        'rabbit-ts-late-subscriber-semantics',
        'State whether late subscribers miss prior events, receive retained queue backlog, or require a stream or database replay path.',
        'A new fanout binding automatically receives messages published before it existed.'
      ),
    ]
  ),
  messagingModule(
    'rabbit-ts-topic-headers-alternate-routing',
    'Topic, Headers, Alternate, and Exchange-to-Exchange Routing',
    'Routing keys encode unstable JSON, topic wildcards overlap unexpectedly, headers matching trusts absent fields, and unroutable messages vanish because mandatory and alternate behavior are not designed together.',
    'multi-strategy routing and unroutable-message table',
    [
      outcome(
        'rabbit-ts-topic-segment-design',
        'Design bounded dot-separated topic taxonomies whose stable semantic segments support exact, star, and hash matching.',
        'Topic wildcards match arbitrary substrings inside each routing-key segment.'
      ),
      outcome(
        'rabbit-ts-overlapping-binding-analysis',
        'Enumerate overlapping topic bindings and prove which queues receive one copy even when multiple bindings on the same queue match.',
        'A queue receives one duplicate for every matching binding from the same exchange.'
      ),
      outcome(
        'rabbit-ts-headers-exchange-contract',
        'Use headers exchanges only with typed bounded metadata and explicit all-versus-any matching, not as a schema-free routing escape hatch.',
        'Headers exchanges validate message payload fields and ignore application headers.'
      ),
      outcome(
        'rabbit-ts-alternate-exchange-routing',
        'Route unmatched messages to an alternate exchange with observable ownership and distinguish it from mandatory returns.',
        'An alternate exchange and mandatory publish produce the same publisher-visible outcome.'
      ),
      outcome(
        'rabbit-ts-exchange-chain-cycle',
        'Use exchange-to-exchange bindings with bounded graph analysis, route evidence, permission checks, and cycle-safe topology review.',
        'Exchange chains cannot create duplicate or cyclic routing behavior.'
      ),
    ]
  ),
  messagingModule(
    'rabbit-ts-message-envelope-schema',
    'Message Envelopes, Binary Bodies, Schemas, and Evolution',
    'Consumers parse Buffer content directly into trusted domain types, overload routing keys with identity data, lack stable event IDs and versions, and break when producers add or remove fields.',
    'versioned message envelope and compatibility matrix',
    [
      outcome(
        'rabbit-ts-buffer-decoding-boundary',
        'Bound message bytes, verify content type and encoding, decode once, parse safely, and keep malformed content out of domain effects.',
        'Calling JSON.parse on Buffer content validates size, encoding, and schema.'
      ),
      outcome(
        'rabbit-ts-envelope-identity-causality',
        'Define message ID, type, schema version, source, subject, occurrence time, correlation, causation, tenant, and trace context without conflating them.',
        'Correlation ID and message ID identify the same concept and can always be reused.'
      ),
      outcome(
        'rabbit-ts-runtime-schema-validation',
        'Validate unknown envelopes and payloads with strict runtime schemas, bounded collections, semantic refinements, and explicit rejection evidence.',
        'Bundled amqplib TypeScript definitions make application message headers and bodies trustworthy.'
      ),
      outcome(
        'rabbit-ts-compatible-schema-evolution',
        'Test producer and consumer compatibility for additive, optional, renamed, split, semantic, and removal changes across an overlap window.',
        'Adding an optional field is always backward and forward compatible regardless of consumer behavior.'
      ),
      outcome(
        'rabbit-ts-asyncapi-cloudevents-contract',
        'Use AsyncAPI 3.1 and CloudEvents 1.0.2 selectively to document channels, operations, messages, bindings, examples, and event metadata while testing runtime truth.',
        'A valid AsyncAPI document proves deployed routing and message behavior conform.'
      ),
    ]
  ),
  messagingModule(
    'rabbit-ts-publisher-buffer-backpressure',
    'Publisher Buffers, Drain, Admission, and Bounded Batching',
    'A publisher awaits a boolean from publish, ignores false, buffers unbounded work during broker flow control, and batches until memory exhaustion while upstream requests continue to receive success.',
    'publisher admission and buffer-pressure controller',
    [
      outcome(
        'rabbit-ts-publish-boolean-contract',
        'Treat amqplib publish and sendToQueue return values as writable-buffer admission signals rather than delivery confirmations or Promises.',
        'A true return means RabbitMQ durably accepted the message.'
      ),
      outcome(
        'rabbit-ts-drain-single-waiter',
        'Pause admission after false, coordinate a bounded drain waiter, handle close and abort, and avoid lost wakeups or listener leaks.',
        'Every blocked publish should attach an unlimited permanent drain listener.'
      ),
      outcome(
        'rabbit-ts-upstream-admission-budget',
        'Propagate publisher capacity to HTTP or job admission with queue, byte, time, tenant, and rejection budgets.',
        'Local memory can safely absorb any broker outage if requests are small.'
      ),
      outcome(
        'rabbit-ts-bounded-batch-window',
        'Batch by count, bytes, age, confirm window, and cancellation while retaining each message result and fairness.',
        'Larger batches always improve throughput without changing latency or loss exposure.'
      ),
      outcome(
        'rabbit-ts-blocked-unblocked-flow',
        'Respond to blocked and unblocked connection events, broker flow control, alarms, and local drain evidence without confusing their scopes.',
        'A drain event proves RabbitMQ resource alarms and queue backlog have cleared.'
      ),
    ]
  ),
  messagingModule(
    'rabbit-ts-unroutable-returns',
    'Mandatory Publishing, Returns, Alternate Exchanges, and Route Audits',
    'The service publishes with mandatory false, treats confirms as proof of routing, attaches the return listener after publishing, and retries unroutable messages forever without fixing topology.',
    'unroutable publication detection and ownership record',
    [
      outcome(
        'rabbit-ts-mandatory-return-sequence',
        'Register return handling before mandatory publication and correlate returned content, exchange, routing key, properties, and publisher intent.',
        'A mandatory return is thrown as a rejected publish Promise.'
      ),
      outcome(
        'rabbit-ts-confirm-vs-route',
        'Distinguish broker confirms from consumer processing and combine mandatory returns or alternate routing with confirm results.',
        'A positive publisher confirm proves a message was routed to at least one queue and processed.'
      ),
      outcome(
        'rabbit-ts-route-audit-fixture',
        'Build topology fixtures that assert expected destination sets, forbidden routes, unroutable cases, permissions, and changed bindings.',
        'Counting bindings is enough to prove routing behavior for topic and headers exchanges.'
      ),
      outcome(
        'rabbit-ts-unroutable-failure-policy',
        'Classify unroutable messages as contract, deployment, tenant, or malicious failures and choose alert, quarantine, reject, or repair ownership.',
        'Unroutable messages are transient and should always be retried with the same route.'
      ),
      outcome(
        'rabbit-ts-alternate-return-tradeoff',
        'Choose mandatory returns, alternate exchanges, or both from publisher feedback, broker custody, operational ownership, and observability needs.',
        'Alternate exchanges provide the publisher the same immediate route-failure evidence as mandatory returns.'
      ),
    ]
  ),
  messagingModule(
    'rabbit-ts-publisher-confirms-ambiguity',
    'Publisher Confirms, Windows, Failure Ambiguity, and Republish',
    'A producer opens a normal channel, calls waitForConfirms after every message, discards sequence identity, and blindly republishes all work after a connection loss even when the broker may already own it.',
    'confirm-window and ambiguous-publication ledger',
    [
      outcome(
        'rabbit-ts-confirm-channel-contract',
        'Use confirm channels and account for callback results, waitForConfirms, nack, return ordering, close, and unresolved publication state.',
        'waitForConfirms converts each publish call into an ordinary Promise-returning RPC.'
      ),
      outcome(
        'rabbit-ts-confirm-window-bounds',
        'Bound unconfirmed count, bytes, and age while preserving throughput, memory, fairness, and per-message outcome evidence.',
        'Waiting synchronously after every publish is the only safe confirm strategy.'
      ),
      outcome(
        'rabbit-ts-confirm-queue-semantics',
        'Explain when confirms occur for unroutable messages, persistent classic queues, quorum queues, and multiple routed queues.',
        'A confirm is issued as soon as bytes reach any RabbitMQ node socket.'
      ),
      outcome(
        'rabbit-ts-ambiguous-publish-recovery',
        'Classify unresolved confirms after failure as ambiguous, retain stable message identity, and republish only through a duplicate-safe downstream contract.',
        'No confirm means the broker definitely did not accept the message.'
      ),
      outcome(
        'rabbit-ts-publisher-ledger-cleanup',
        'Retire confirmed entries, reject nacked entries, preserve ambiguous entries, cancel waiters, and prove zero memory or callback leaks across channel generations.',
        'The client library automatically retains a durable application ledger across reconnection.'
      ),
    ]
  ),
  messagingModule(
    'rabbit-ts-consumer-lifecycle-shutdown',
    'Consumer Lifecycle, Cancellation, Readiness, and Graceful Shutdown',
    'A consumer reports ready before consume-ok, ignores broker cancellation, closes the connection while handlers run, and assumes cancel immediately stops every in-flight delivery.',
    'consumer registration, readiness, and shutdown state machine',
    [
      outcome(
        'rabbit-ts-consume-registration-readiness',
        'Report ready only after connection, topology, channel, prefetch, consume registration, and required dependencies are ready.',
        'An open TCP connection proves the consumer can receive and safely process messages.'
      ),
      outcome(
        'rabbit-ts-consumer-tag-generation',
        'Track consumer tags and channel generations so stale cancellation, delivery, and close events cannot mutate current state.',
        'Consumer tags remain valid after a channel is recreated.'
      ),
      outcome(
        'rabbit-ts-broker-cancellation',
        'Handle a null delivery callback and cancellation notifications as lifecycle events with cause, readiness, recovery, and ownership evidence.',
        'The delivery callback always receives a message object until the application calls cancel.'
      ),
      outcome(
        'rabbit-ts-cancel-inflight-boundary',
        'Cancel new deliveries, then await, finish, nack, or abandon in-flight work under a deadline before closing the channel.',
        'basic.cancel automatically requeues all deliveries already dispatched to the consumer.'
      ),
      outcome(
        'rabbit-ts-shutdown-ack-policy',
        'Choose acknowledgement, requeue, dead-letter, or channel-close behavior for in-flight work during graceful and forced shutdown.',
        'Acknowledging every in-flight message during shutdown prevents both loss and duplicates.'
      ),
    ]
  ),
  messagingModule(
    'rabbit-ts-acknowledgements-redelivery',
    'Acknowledgements, Delivery Tags, Redelivery, and Effect Ownership',
    'A handler acknowledges on a different channel, auto-acks before validation, nacks every error with requeue, treats redelivered false as first-ever processing, and double-acks after a timeout race.',
    'delivery ownership and acknowledgement decision table',
    [
      outcome(
        'rabbit-ts-manual-auto-ack-tradeoff',
        'Choose manual or automatic acknowledgement from loss tolerance, consumer memory, work duration, and effect ownership.',
        'Automatic acknowledgement means RabbitMQ waits for handler success before deleting the message.'
      ),
      outcome(
        'rabbit-ts-delivery-tag-channel-scope',
        'Acknowledge, nack, or reject a delivery exactly once on its owning channel and prevent stale or cross-channel tag use.',
        'Delivery tags are globally unique across a connection and survive channel recovery.'
      ),
      outcome(
        'rabbit-ts-ack-after-durable-effect',
        'Transfer ownership only after the intended durable effect, transactional inbox record, or safely repeatable handoff succeeds.',
        'Acknowledging before a database commit improves safety because it shortens the unacked window.'
      ),
      outcome(
        'rabbit-ts-redelivered-evidence-limit',
        'Use redelivered and delivery-count evidence as hints while relying on stable application identity and durable deduplication for correctness.',
        'redelivered false proves no consumer has ever seen the message.'
      ),
      outcome(
        'rabbit-ts-ack-race-single-owner',
        'Use one terminal delivery decision owner to prevent timeout, abort, handler, and shutdown paths from double acknowledging or conflicting.',
        'Calling ack twice is idempotent and safely ignored by RabbitMQ.'
      ),
    ]
  ),
  messagingModule(
    'rabbit-ts-prefetch-concurrency-capacity',
    'Prefetch, Consumer Concurrency, Capacity, and Fairness',
    'A consumer sets prefetch zero for maximum speed, starts unbounded promises, ignores message bytes and dependency pools, and scales consumers from queue depth alone.',
    'prefetch, concurrency, and capacity budget model',
    [
      outcome(
        'rabbit-ts-prefetch-window-semantics',
        'Explain RabbitMQ per-consumer prefetch, deprecated global QoS, in-flight races, quorum caps, and the zero-means-unbounded hazard.',
        'Prefetch controls the total number of ready messages stored in the queue.'
      ),
      outcome(
        'rabbit-ts-concurrency-resource-budget',
        'Bound concurrent handlers by CPU, memory, message bytes, downstream pools, deadlines, tenant fairness, and shutdown capacity.',
        'Setting prefetch alone limits every asynchronous task a handler may start.'
      ),
      outcome(
        'rabbit-ts-consumer-capacity-metric',
        'Interpret consumer capacity with delivery rate, processing latency, ready and unacked depth, dependency saturation, and queue single-core limits.',
        'Consumer capacity below 100 percent always means adding consumers will fix throughput.'
      ),
      outcome(
        'rabbit-ts-adaptive-prefetch-caution',
        'Change prefetch only with bounded measurement windows, hysteresis, safe limits, in-flight accounting, and rollback evidence.',
        'Prefetch can be continuously maximized from one recent latency sample without instability.'
      ),
      outcome(
        'rabbit-ts-fair-tenant-dispatch',
        'Prevent one tenant or expensive message class from monopolizing consumers using topology, admission, bounded scheduling, and separate evidence.',
        'One shared FIFO queue guarantees fair service across tenants and task costs.'
      ),
    ]
  ),
  messagingModule(
    'rabbit-ts-idempotency-inbox-effects',
    'Idempotent Consumers, Inbox Records, and External Effects',
    'A consumer uses an in-memory set, marks messages complete before effects, reuses IDs across tenants, and assumes an idempotency key makes non-transactional email and payment calls exactly once.',
    'durable inbox and duplicate-safe effect protocol',
    [
      outcome(
        'rabbit-ts-stable-idempotency-key',
        'Derive a stable scoped operation identity from producer intent, tenant, message type, and semantic version rather than delivery metadata.',
        'RabbitMQ delivery tags are suitable permanent idempotency keys.'
      ),
      outcome(
        'rabbit-ts-transactional-inbox',
        'Record inbox identity, input fingerprint, state transition, domain effect, and completion atomically in one database transaction where possible.',
        'Checking then inserting an inbox row in separate transactions prevents concurrent duplicates.'
      ),
      outcome(
        'rabbit-ts-idempotency-fingerprint',
        'Reject reuse of an operation identity with a different payload fingerprint or semantic intent and retain conflict evidence.',
        'Any later message with the same ID should return the first result even if its payload changed.'
      ),
      outcome(
        'rabbit-ts-external-effect-dedup',
        'Use provider idempotency, effect ledgers, reconciliation, or compensation for non-transactional external effects and state residual ambiguity.',
        'A local inbox transaction makes an external API call exactly once.'
      ),
      outcome(
        'rabbit-ts-inbox-retention-replay',
        'Set inbox retention from maximum redelivery, replay, audit, privacy, and disaster-recovery windows and test expired-key behavior.',
        'Inbox records can be deleted immediately after acknowledgement because RabbitMQ will not redeliver.'
      ),
    ]
  ),
  messagingModule(
    'rabbit-ts-failure-retry-classification',
    'Failure Classification, Retry Budgets, Backoff, and Load Shedding',
    'Every exception is requeued immediately, permanent schema failures block healthy work, a database outage causes a retry storm, and attempt counts exist only in process memory.',
    'failure taxonomy and bounded retry policy',
    [
      outcome(
        'rabbit-ts-transient-permanent-ambiguous',
        'Classify malformed, unauthorized, missing dependency, rate limit, timeout, conflict, transient, permanent, and ambiguous effect failures by evidence.',
        'Exception class alone reliably determines whether a message should be retried.'
      ),
      outcome(
        'rabbit-ts-retry-budget-deadline',
        'Bound attempts, total age, delay, processing deadline, queue residence, and operator escalation as one retry budget.',
        'A maximum attempt count alone prevents stale work and retry storms.'
      ),
      outcome(
        'rabbit-ts-backoff-jitter-scheduling',
        'Apply exponential backoff and jitter without blocking consumer slots or requeueing hot loops and preserve intended availability time.',
        'Sleeping inside each consumer handler is an efficient delayed retry mechanism.'
      ),
      outcome(
        'rabbit-ts-dependency-outage-pause',
        'Pause or shed broad consumer work when a shared dependency is unavailable instead of scheduling delayed retries for every message.',
        'Returning every message with delay is always safer than pausing consumers during a total outage.'
      ),
      outcome(
        'rabbit-ts-retry-observability-ownership',
        'Record original identity, attempt, reason, first and next time, owner, budget, terminal disposition, and causal metrics without high-cardinality leaks.',
        'Queue depth alone explains whether retries are healthy.'
      ),
    ]
  ),
  messagingModule(
    'rabbit-ts-dead-letter-poison-parking',
    'Dead Lettering, Poison Messages, Delivery Limits, and Parking',
    'A queue hardcodes a missing DLX, cycles messages indefinitely, drops quorum poison messages after the default delivery limit, and treats a dead-letter queue as an unowned archive.',
    'dead-letter, poison, and remediation topology',
    [
      outcome(
        'rabbit-ts-dead-letter-trigger-route',
        'Trace nack or reject without requeue, expiry, length overflow, and quorum delivery-limit dead lettering through exchange and routing policy.',
        'Deleting or expiring an entire queue dead-letters all of its messages.'
      ),
      outcome(
        'rabbit-ts-dlx-policy-permission',
        'Configure dead lettering through mutable policy where possible and verify source read, target write, exchange existence, binding, and route permissions.',
        'RabbitMQ creates a missing dead-letter exchange automatically when the first message fails.'
      ),
      outcome(
        'rabbit-ts-dead-letter-cycle',
        'Detect and bound dead-letter cycles using history, stable identity, attempt policy, route analysis, and a terminal parking destination.',
        'RabbitMQ always detects every dead-letter cycle and reports it to publishers.'
      ),
      outcome(
        'rabbit-ts-quorum-delivery-limit',
        'Account for RabbitMQ 4.x quorum delivery limit defaults, x-delivery-count, policy changes, group requeues, and intentional dead-letter retention.',
        'Quorum queues retry poison messages forever unless an application counts attempts.'
      ),
      outcome(
        'rabbit-ts-parking-remediation-workflow',
        'Give parked messages bounded retention, searchable redacted evidence, owner, repair, replay authorization, duplicate safety, and closure criteria.',
        'Moving a message to a dead-letter queue completes incident handling.'
      ),
    ]
  ),
  messagingModule(
    'rabbit-ts-quorum-queues-replication',
    'Quorum Queues, Raft Replication, Availability, and Data Safety',
    'A team declares quorum queues for ephemeral sessions, assumes any replica count survives any failure, omits confirms and manual acknowledgements, and ignores leader locality, majority loss, backlog, and upgrade behavior.',
    'quorum queue safety and availability decision record',
    [
      outcome(
        'rabbit-ts-quorum-use-case-fit',
        'Choose quorum queues for durable replicated data safety and reject them for high-churn temporary queues, lowest latency, or extreme backlogs better served by streams.',
        'Quorum queues are the best default for every queue regardless of lifetime or workload.'
      ),
      outcome(
        'rabbit-ts-replica-majority-safety',
        'Derive tolerated failures and availability from odd replica count, online majority, leader election, placement, and maintenance sequence.',
        'A three-member quorum queue remains available after any two members fail.'
      ),
      outcome(
        'rabbit-ts-quorum-confirm-ack',
        'Combine persistent messages, publisher confirms, manual consumer acknowledgements, and duplicate-safe applications for quorum data safety.',
        'Declaring x-queue-type quorum alone guarantees no loss or duplicates end to end.'
      ),
      outcome(
        'rabbit-ts-quorum-leader-locality',
        'Measure queue leader placement, client connection locality, cross-node routing, rebalance, and single-core hot-path constraints.',
        'Clients must connect to the leader node or RabbitMQ rejects queue operations.'
      ),
      outcome(
        'rabbit-ts-majority-loss-recovery',
        'Plan majority loss, delayed confirms, redelivery, operator checks, replica repair, and residual data-risk evidence without unsafe force recovery.',
        'Automatic reconnect immediately restores a quorum queue that permanently lost its majority.'
      ),
    ]
  ),
  messagingModule(
    'rabbit-ts-rabbitmq43-retries-priorities-timeouts',
    'RabbitMQ 4.3 Delayed Retries, Priorities, and Consumer Timeouts',
    'A design copies old TTL dead-letter retry loops into RabbitMQ 4.3, uses priority as unlimited preemption, leaves consumer timeouts unrelated to handler deadlines, and assumes new broker behavior exists on older clusters.',
    'RabbitMQ 4.3 feature and fallback compatibility plan',
    [
      outcome(
        'rabbit-ts-delayed-retry-policy',
        'Use RabbitMQ 4.3 quorum delayed-retry policies for returned or failed deliveries with explicit delay, eligibility, attempt, and compatibility evidence.',
        'Delayed retry is enabled by default for every quorum queue in RabbitMQ 4.3.'
      ),
      outcome(
        'rabbit-ts-delayed-retry-vs-ttl',
        'Compare native delayed retries with TTL and DLX cycles by rewrite cost, loss and duplicate windows, head-of-line effects, topology, and version support.',
        'TTL dead-letter cycles and native delayed retry have identical safety and resource behavior.'
      ),
      outcome(
        'rabbit-ts-quorum-priority-levels',
        'Use RabbitMQ 4.3 quorum 32 strict priority levels with bounded use, starvation evidence, prefetch interaction, and per-priority monitoring.',
        'Strict priority guarantees low-priority messages eventually run under continuous high-priority load.'
      ),
      outcome(
        'rabbit-ts-consumer-timeout-contract',
        'Align broker consumer timeout, handler deadline, dependency timeout, cancellation, redelivery, and channel recovery without duplicate terminal decisions.',
        'A consumer timeout cleanly cancels application work and proves no external effect completed.'
      ),
      outcome(
        'rabbit-ts-feature-version-gate',
        'Gate 4.3-only behavior on deployed broker, queue type, policy support, client behavior, migration state, and tested fallback.',
        'Compiling against amqplib 2.0.1 guarantees the connected broker supports RabbitMQ 4.3 features.'
      ),
    ]
  ),
  messagingModule(
    'rabbit-ts-ordering-single-active-partitioning',
    'Ordering, Single Active Consumer, Keys, and Partitioning',
    'A service promises global order across publishers and channels, adds parallel consumers, requeues failures, uses priority, then depends on exact FIFO completion for each customer.',
    'ordering scope and partition strategy',
    [
      outcome(
        'rabbit-ts-ordering-scope-contract',
        'State ordering scope across producer channel, exchange route, one queue, delivery, completion, redelivery, priority, and multiple consumers.',
        'RabbitMQ preserves one global order across all publishers, queues, and consumer completion.'
      ),
      outcome(
        'rabbit-ts-keyed-causal-order',
        'Partition related messages by stable business key while bounding skew, hot keys, resharding, and cross-key independence.',
        'Hashing a key across queues preserves order when partition count changes.'
      ),
      outcome(
        'rabbit-ts-single-active-consumer',
        'Use single active consumer when one active delivery stream is required and account for failover, prefetch, recovery, and throughput limits.',
        'An exclusive consumer and single active consumer provide identical failover behavior.'
      ),
      outcome(
        'rabbit-ts-version-sequence-defense',
        'Defend state with entity version, sequence, monotonic transition, deduplication, gap detection, and reconciliation rather than transport order alone.',
        'Discarding any message older than the latest timestamp safely resolves all ordering races.'
      ),
      outcome(
        'rabbit-ts-ordering-throughput-tradeoff',
        'Measure throughput, tail latency, skew, recovery, and correctness when selecting queue count, consumer concurrency, and order scope.',
        'Strict global order can scale horizontally without coordination cost.'
      ),
    ]
  ),
  messagingModule(
    'rabbit-ts-streams-superstreams-choice',
    'Queues, Streams, Super Streams, Retention, and Replay',
    'A high-throughput replay workload uses one quorum queue with a ten-million-message backlog, while another service selects streams but expects destructive consumption and ordinary queue client locality.',
    'queue-versus-stream workload decision and replay plan',
    [
      outcome(
        'rabbit-ts-queue-stream-semantics',
        'Compare destructive queue consumption with retained stream offsets, replay, retention, protocol clients, and consumer responsibility.',
        'Streams are simply queues that keep acknowledged messages a little longer.'
      ),
      outcome(
        'rabbit-ts-stream-retention-offset',
        'Define age and byte retention, segment behavior, start offset, consumer progress, replay authorization, and late-reader expectations.',
        'A stream retains all messages forever unless every consumer acknowledges them.'
      ),
      outcome(
        'rabbit-ts-superstream-partitioning',
        'Use super streams to partition throughput by key while accounting for partitions, routing, per-partition order, skew, and consumer coordination.',
        'A super stream provides global ordering across all partitions.'
      ),
      outcome(
        'rabbit-ts-stream-client-locality',
        'Account for stream protocol, replica locality, leader and follower reads, connection routing, confirms, and failure recovery.',
        'Stream clients can use any cluster node with the same transparent routing as queues.'
      ),
      outcome(
        'rabbit-ts-workload-selection-evidence',
        'Select classic queue, quorum queue, stream, super stream, or external log using loss, latency, throughput, backlog, replay, routing, and operational evidence.',
        'One RabbitMQ data type is always best if tuned with enough memory and prefetch.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  messagingModule(
    'rabbit-ts-transactional-outbox-sagas',
    'Transactional Outbox, Relay, Inbox, Sagas, and Compensation',
    'An HTTP transaction commits database state then publishes, or publishes then rolls back; a relay deletes outbox rows before confirms; a multi-service workflow treats retries as rollback.',
    'outbox, relay, inbox, and compensation protocol',
    [
      outcome(
        'rabbit-ts-dual-write-failure-matrix',
        'Enumerate database-first, publish-first, timeout, crash, confirm-loss, rollback, and duplicate failure windows for a dual write.',
        'Publishing immediately after a database commit makes the two operations atomic enough.'
      ),
      outcome(
        'rabbit-ts-transactional-outbox-record',
        'Store domain mutation and immutable outbox message identity, type, payload, destination intent, and availability atomically.',
        'An outbox row written in a separate transaction closes the dual-write gap.'
      ),
      outcome(
        'rabbit-ts-outbox-relay-confirm',
        'Claim bounded outbox rows, publish with backpressure and confirms, mark completion safely, and recover ambiguous attempts through stable identity.',
        'The relay can delete a row as soon as publish returns true.'
      ),
      outcome(
        'rabbit-ts-inbox-outbox-composition',
        'Combine consumer inbox deduplication, local domain effect, and outgoing outbox writes in one transaction to propagate effectively-once effects.',
        'Inbox plus outbox provides exactly-once transport and removes all duplicates.'
      ),
      outcome(
        'rabbit-ts-saga-compensation',
        'Design saga state, commands, events, timeouts, idempotent steps, compensations, irreversibility, operator intervention, and audit evidence.',
        'A compensation always restores the world to its exact state before the original action.'
      ),
    ]
  ),
  messagingModule(
    'rabbit-ts-security-vhosts-tls-authz',
    'TLS, Authentication, Virtual Hosts, Authorization, and Secrets',
    'A production client uses amqp with guest credentials, grants configure/write/read wildcards across the default virtual host, logs connection URLs, disables certificate verification, and cannot rotate credentials without downtime.',
    'messaging identity, transport, and least-privilege matrix',
    [
      outcome(
        'rabbit-ts-amqps-identity-verification',
        'Use TLS with trusted CA, hostname and SNI verification, minimum protocol policy, client identity where required, and tested certificate rotation.',
        'Encrypting AMQP without verifying the broker certificate prevents man-in-the-middle attacks.'
      ),
      outcome(
        'rabbit-ts-authentication-mechanism',
        'Choose generated credentials, x509 EXTERNAL, or OAuth 2 identity with explicit broker, client, token, renewal, and revocation support.',
        'RabbitMQ user tags grant applications exchange and queue permissions.'
      ),
      outcome(
        'rabbit-ts-vhost-resource-permissions',
        'Grant minimum configure, write, and read regex permissions per virtual host and separately evaluate topic authorization.',
        'Read permission allows publishing and write permission allows consuming.'
      ),
      outcome(
        'rabbit-ts-secret-loading-rotation',
        'Load credentials from approved secret delivery, redact URLs and errors, update or reconnect under bounded rotation, and prove old access revocation.',
        'Embedding credentials in an AMQP URL is safe because URL objects automatically redact passwords.'
      ),
      outcome(
        'rabbit-ts-tenant-isolation-abuse',
        'Defend tenant topology, message size, route, rate, queue count, headers, permissions, and noisy-neighbor budgets without trusting publisher metadata.',
        'A tenant header is sufficient authorization for routing and consuming tenant data.'
      ),
    ]
  ),
  messagingModule(
    'rabbit-ts-observability-capacity-alarms',
    'Observability, Capacity, Flow Control, Alarms, and SLOs',
    'A dashboard shows only queue depth, creates message-ID metric labels, ignores unacknowledged work and oldest age, and responds to memory alarms by adding publishers and increasing prefetch.',
    'messaging telemetry, capacity, and SLO evidence board',
    [
      outcome(
        'rabbit-ts-message-flow-telemetry',
        'Instrument publish, confirm, return, route, deliver, process, ack, retry, dead-letter, and effect phases with bounded identities and causal links.',
        'One end-to-end span can stay open for every message until all subscribers finish.'
      ),
      outcome(
        'rabbit-ts-rabbitmq-core-metrics',
        'Interpret ready, unacknowledged, total, ingress, delivery, ack, redelivery, consumers, consumer capacity, connections, channels, and node resource metrics together.',
        'A queue depth of zero proves consumers are healthy and caught up.'
      ),
      outcome(
        'rabbit-ts-backlog-age-capacity',
        'Model arrival rate, service rate, concurrency, oldest age, burst, retry amplification, byte volume, and recovery time for capacity decisions.',
        'Average message rate alone determines required consumer count.'
      ),
      outcome(
        'rabbit-ts-resource-alarm-flow-control',
        'Trace memory and disk alarms, connection blocking, client blocked events, broker flow control, local publish drain, and upstream load shedding.',
        'Increasing prefetch or publisher concurrency clears a broker memory alarm faster.'
      ),
      outcome(
        'rabbit-ts-messaging-slo-alert',
        'Define availability, acceptance, routing, processing latency, age, loss, duplicate, poison, recovery, and capacity SLOs with symptom and cause alerts.',
        'Broker uptime is an adequate end-to-end messaging SLO.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  messagingModule(
    'rabbit-ts-testing-chaos-recovery-release',
    'Contract Tests, Fault Injection, Deployment, Upgrade, and Recovery',
    'Tests mock amqplib method calls but never assert routing or failure behavior; deployment starts consumers before topology migration; a reconnect storm follows broker restart; rollback cannot read new message schemas.',
    'tested, recoverable RabbitMQ production release',
    [
      outcome(
        'rabbit-ts-layered-test-strategy',
        'Test pure policy, envelope schema, topology routes, publisher confirms, consumer effects, disposable broker integration, and production probes at distinct layers.',
        'Mocking channel.publish and channel.consume proves RabbitMQ integration behavior.'
      ),
      outcome(
        'rabbit-ts-fault-injection-matrix',
        'Inject return, nack, close, heartbeat loss, blocked connection, duplicate, poison, dependency timeout, majority loss, restart, and stale callback failures deterministically.',
        'Killing one broker process is sufficient chaos coverage for every messaging failure.'
      ),
      outcome(
        'rabbit-ts-compatible-rollout-order',
        'Roll out schema, topology, publisher, consumer, policy, and broker changes in a compatibility-safe order with shadow evidence and rollback.',
        'Deploying producers before consumers is always backward compatible when JSON is used.'
      ),
      outcome(
        'rabbit-ts-rabbitmq43-upgrade-gate',
        'Gate RabbitMQ 4.3 upgrade on supported 4.2 path, Erlang compatibility, feature state, alarms, replica health, client tests, rolling sequence, and rollback limits.',
        'RabbitMQ 3.13 clusters can roll directly to 4.3 one node at a time.'
      ),
      outcome(
        'rabbit-ts-production-defense',
        'Defend architecture, contracts, live drills, capacity, security, dashboards, runbooks, rollback, recovery objectives, residual risks, and ownership before release.',
        'Passing unit tests and a local Docker demo proves production messaging readiness.',
        'metacognitive',
        'create'
      ),
    ]
  ),
];

export const rabbitmqTypescriptConfig = finalizeCourse(
  {
    id: 'pubsub-rabbitmq-typescript',
    competencyIdPrefix: 'rabbit-ts-',
    title: 'RabbitMQ 4.3 Pub/Sub and Reliable Messaging with TypeScript 7',
    version: '2026.07',
    audience: {
      description:
        'TypeScript backend developers who can build production HTTP services and need to design, implement, test, operate, and defend asynchronous RabbitMQ systems.',
      entryKnowledge: [
        'Build and defend a production Node 24 and TypeScript HTTP service with validation, persistence, lifecycle, security, observability, and recovery.',
        'Explain transactions, idempotency, concurrency, timeouts, backpressure, and failure ownership across HTTP and PostgreSQL boundaries.',
      ],
      deviceConstraints: [
        'Modern browser; learner TypeScript runs only in the isolated deterministic compiler runtime. Browser tasks model topology, routing, delivery, acknowledgement, retry, and recovery decisions without connecting to RabbitMQ, opening sockets, reading host state, using credentials, or executing external effects.',
      ],
      accessibilityAssumptions: [
        'Topology diagrams, message timelines, delivery state machines, routing tables, traces, and dashboards include equivalent structured text, keyboard operation, announced status, and non-color meaning.',
      ],
    },
    scope: {
      includes: [
        'RabbitMQ 4.3.2, AMQP 0-9-1, Node 24.18, npm 12, TypeScript 7, amqplib 2.0.1, architecture selection, exchanges, queues, bindings, connections, channels, heartbeats, recovery, topology, direct and fanout pub/sub, topic and headers routing, envelopes, AsyncAPI 3.1, CloudEvents 1.0.2, publisher backpressure, returns, confirms, consumers, acknowledgements, prefetch, idempotency, retries, dead lettering, quorum queues, RabbitMQ 4.3 delayed retry and priorities, ordering, streams, outbox and sagas, TLS, authorization, OpenTelemetry 1.43, Prometheus, capacity, testing, upgrades, and recovery',
        'Runnable deterministic pure-TypeScript messaging decision functions plus explicit clean compilation and disposable RabbitMQ, TLS, partition, restart, load, upgrade, and production transfer gates',
        'Five cumulative messaging systems and a performance-based production defense exam',
      ],
      excludes: [
        'Browser access to RabbitMQ, AMQP sockets, Docker, host processes, credentials, external databases, third-party effects, management APIs, or production infrastructure',
        'Claiming exact broker, replication, TLS, partition, throughput, or recovery behavior from pure browser models without the named authorized live transfer gate',
      ],
      nextCourses: ['pubsub-rabbitmq-go', 'build-ecommerce-api-typescript'],
    },
    sources: [
      {
        title: 'RabbitMQ 4.3.2 Documentation',
        authority: 'official-docs',
        url: 'https://www.rabbitmq.com/docs',
        version: 'RabbitMQ 4.3.2; released 2026-06-15',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls current broker version, developer and operator boundaries, feature behavior, and links to versioned guidance.',
      },
      {
        title: 'RabbitMQ Release Information and 4.3 Upgrade Path',
        authority: 'official-docs',
        url: 'https://www.rabbitmq.com/release-information',
        version: 'RabbitMQ 4.3.2 and supported 4.2 to 4.3 upgrade path',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls current release, support window, release notes, and prerequisite upgrade sequence.',
      },
      {
        title: 'AMQP 0-9-1 Model and Protocol Specification',
        authority: 'standard',
        url: 'https://www.rabbitmq.com/tutorials/amqp-concepts',
        version: 'AMQP 0-9-1 with RabbitMQ extensions',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls connections, channels, virtual hosts, exchanges, queues, bindings, messages, consumers, acknowledgements, and protocol error scope.',
      },
      {
        title: 'RabbitMQ Exchanges and Queues',
        authority: 'official-docs',
        url: 'https://www.rabbitmq.com/docs/exchanges',
        version: 'RabbitMQ 4.3.2',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls exchange types, default and alternate exchanges, routing, queue names, properties, durability, ordering, arguments, limits, and queue choice.',
      },
      {
        title: 'RabbitMQ Connections, Channels, and Heartbeats',
        authority: 'official-docs',
        url: 'https://www.rabbitmq.com/docs/connections',
        version: 'RabbitMQ 4.3.2',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls long-lived connections, channel multiplexing, negotiated limits, TLS, lifecycle, heartbeats, errors, churn, and network recovery.',
      },
      {
        title: 'RabbitMQ Publishers and Consumers',
        authority: 'official-docs',
        url: 'https://www.rabbitmq.com/docs/publishers',
        version: 'RabbitMQ 4.3.2',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls publishing, unroutable messages, mandatory and alternate behavior, consumer lifecycle, cancellation, prefetch, capacity, and concurrency.',
      },
      {
        title: 'RabbitMQ Consumer Acknowledgements and Publisher Confirms',
        authority: 'official-docs',
        url: 'https://www.rabbitmq.com/docs/confirms',
        version: 'RabbitMQ 4.3.2',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls delivery tags, ack modes, requeue, prefetch, redelivery, confirm timing, multi-ack, data safety, and common client errors.',
      },
      {
        title: 'RabbitMQ Reliability Guide',
        authority: 'official-docs',
        url: 'https://www.rabbitmq.com/docs/reliability',
        version: 'RabbitMQ 4.3.2',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls failure ownership, reconnect, retransmission ambiguity, acknowledgements, confirms, replication, and reliable-delivery limits.',
      },
      {
        title: 'RabbitMQ Quorum Queues',
        authority: 'official-docs',
        url: 'https://www.rabbitmq.com/docs/quorum-queues',
        version: 'RabbitMQ 4.3.2 quorum queues',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls Raft replication, majority, confirms, use-case fit, poison handling, delivery limits, dead lettering, priorities, and failure behavior.',
      },
      {
        title: 'RabbitMQ 4.3 Delayed Retries, Priorities, and Consumer Timeouts',
        authority: 'official-docs',
        url: 'https://www.rabbitmq.com/blog/2026/04/23/rabbitmq-4.3-release',
        version: 'RabbitMQ 4.3',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls new 4.3 quorum delayed retry, 32 strict priority levels, consumer timeouts, Khepri-only metadata, and migration-sensitive behavior.',
      },
      {
        title: 'RabbitMQ Dead Letter Exchanges, TTL, and Limits',
        authority: 'official-docs',
        url: 'https://www.rabbitmq.com/docs/dlx',
        version: 'RabbitMQ 4.3.2',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls dead-letter triggers, policy, permissions, routes, cycles, TTL, queue limits, delivery limits, and parking behavior.',
      },
      {
        title: 'RabbitMQ Streams and Super Streams',
        authority: 'official-docs',
        url: 'https://www.rabbitmq.com/docs/streams',
        version: 'RabbitMQ 4.3.2',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls retained streams, offsets, retention, replay, super-stream partitioning, protocol choice, locality, replication, and workload fit.',
      },
      {
        title: 'RabbitMQ Access Control and TLS',
        authority: 'official-docs',
        url: 'https://www.rabbitmq.com/docs/access-control',
        version: 'RabbitMQ 4.3.2',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls authentication, authorization, virtual hosts, resource and topic permissions, x509, OAuth 2, credential rotation, and production defaults.',
      },
      {
        title: 'RabbitMQ Flow Control, Alarms, and Production Guidelines',
        authority: 'official-docs',
        url: 'https://www.rabbitmq.com/docs/flow-control',
        version: 'RabbitMQ 4.3.2',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls publisher flow control, blocked connections, memory and disk alarms, resource limits, capacity, load shedding, and deployment readiness.',
      },
      {
        title: 'RabbitMQ Prometheus Monitoring',
        authority: 'official-docs',
        url: 'https://www.rabbitmq.com/docs/prometheus',
        version: 'RabbitMQ 4.3.2 Prometheus plugin',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls node, connection, channel, queue, delivery, acknowledgement, redelivery, consumer capacity, resource, and cardinality metrics.',
      },
      {
        title: 'amqplib 2.0.1 Channel API',
        authority: 'official-docs',
        url: 'https://amqp-node.github.io/amqplib/channel_api.html',
        version: 'amqplib 2.0.1; released 2026-05-10',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls promise and callback APIs, connection and channel events, declarations, publishing, drain, returns, consume, ack, nack, prefetch, confirm callbacks, and waitForConfirms.',
      },
      {
        title: 'amqplib 2.0.1 Releases and Bundled TypeScript Types',
        authority: 'official-docs',
        url: 'https://github.com/amqp-node/amqplib/releases',
        version: 'amqplib 2.0.1 with bundled TypeScript declarations',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls current client version, TypeScript declaration support, Node compatibility, heartbeat zero behavior, TLS SNI, and migration changes.',
      },
      {
        title: 'Node.js 24 Events, Buffers, Streams, and TLS',
        authority: 'official-docs',
        url: 'https://nodejs.org/docs/latest-v24.x/api/events.html',
        version: 'Node.js 24.18.0 LTS',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls EventEmitter failure behavior, Buffer boundaries, Writable backpressure, TLS identity, AbortSignal, process lifecycle, and testing assumptions.',
      },
      {
        title: 'TypeScript 7 Native Compiler and TypeScript 6 Compatibility API',
        authority: 'official-docs',
        url: 'https://devblogs.microsoft.com/typescript/',
        version: 'TypeScript 7.0.2 native CLI; TypeScript 6.0.2 compatibility API',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls strict type checking, native build behavior, compatibility tooling, runtime erasure boundaries, and current repository compilation.',
      },
      {
        title: 'AsyncAPI Specification 3.1.0',
        authority: 'standard',
        url: 'https://github.com/asyncapi/spec/tree/v3.1.0',
        version: 'AsyncAPI 3.1.0; released 2026-01-31',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls asynchronous API channels, operations, messages, correlation, bindings, schemas, examples, servers, and contract documentation.',
      },
      {
        title: 'CloudEvents Specification 1.0.2',
        authority: 'standard',
        url: 'https://github.com/cloudevents/spec/tree/ce@v1.0.2',
        version: 'CloudEvents 1.0.2',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls vendor-neutral event context identity, source, type, subject, time, data schema, content type, and AMQP binding boundaries.',
      },
      {
        title: 'OpenTelemetry Messaging Semantic Conventions',
        authority: 'standard',
        url: 'https://opentelemetry.io/docs/specs/semconv/messaging/',
        version: 'OpenTelemetry semantic conventions 1.43.0; messaging status development',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls messaging spans, metrics, exceptions, RabbitMQ attributes, propagation, cardinality, and stability migration caveats.',
      },
      {
        title: 'Computer Science Curricula 2023',
        authority: 'curriculum-framework',
        url: 'https://csed.acm.org/wp-content/uploads/2024/04/Computer-Science-Curricula-2023.pdf',
        version: 'CS2023 final report',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls distributed systems, networking, reliability, security, software engineering, testing, observability, professional practice, and competency depth.',
      },
    ],
    sharedRequirements: [
      'Every activity retrieves TypeScript, HTTP service, accessibility, security, validation, persistence, testing, lifecycle, and evidence habits before adding one messaging boundary.',
      'Browser TypeScript is deterministic and isolated. It models topology, routing, delivery, acknowledgement, retry, and recovery decisions but never imports amqplib or Node built-ins, opens sockets, contacts RabbitMQ, Docker, networks, management APIs, databases, or external effects, reads host state, or uses credentials.',
      'Passing work requires stable message and scenario identity, a named ownership transfer, bounded bytes, time, attempts, and concurrency, observable changed and failure results, cleanup and recovery, and explicit disposable-broker or production transfer limits.',
    ],
    modules,
    projects: [
      project(
        'rabbit-ts-work-distribution-service',
        'Defended Work Distribution Service',
        'rabbit-ts-direct-routing-work-queues',
        'A municipal accessibility remediation team',
        'They need a TypeScript task intake and worker system with explicit delivery claims, AMQP topology, typed client lifecycle, heartbeat recovery, versioned declarations, direct routing, fair competing consumers, and durable effect evidence.',
        [
          'rabbit-ts-outcome-evidence-contract',
          'rabbit-ts-work-queue-vs-pubsub',
          'rabbit-ts-amqp-entity-model',
          'rabbit-ts-event-handler-errors',
          'rabbit-ts-recovery-order-generation',
          'rabbit-ts-topology-migration',
          'rabbit-ts-worker-effect-evidence',
        ]
      ),
      project(
        'rabbit-ts-versioned-pubsub-backbone',
        'Versioned Multi-Subscriber Event Backbone',
        'rabbit-ts-publisher-confirms-ambiguity',
        'A privacy-sensitive case-management platform',
        'They need durable and ephemeral subscribers, fanout and topic routing, strict event envelopes, compatible schemas, bounded publisher buffers, unroutable detection, confirm windows, and ambiguous-publication recovery.',
        [
          'rabbit-ts-subscriber-queue-per-responsibility',
          'rabbit-ts-overlapping-binding-analysis',
          'rabbit-ts-compatible-schema-evolution',
          'rabbit-ts-drain-single-waiter',
          'rabbit-ts-confirm-vs-route',
          'rabbit-ts-ambiguous-publish-recovery',
        ]
      ),
      project(
        'rabbit-ts-duplicate-safe-processing',
        'Duplicate-Safe Processing and Poison Recovery System',
        'rabbit-ts-dead-letter-poison-parking',
        'A regional benefit-notification service',
        'They need graceful consumers, same-channel acknowledgements, bounded prefetch, durable inbox effects, failure classification, retry budgets, dead lettering, quorum delivery limits, and an authorized remediation workflow.',
        [
          'rabbit-ts-cancel-inflight-boundary',
          'rabbit-ts-delivery-tag-channel-scope',
          'rabbit-ts-concurrency-resource-budget',
          'rabbit-ts-transactional-inbox',
          'rabbit-ts-retry-budget-deadline',
          'rabbit-ts-parking-remediation-workflow',
        ]
      ),
      project(
        'rabbit-ts-resilient-workflow-platform',
        'Replicated, Ordered, Replayable Workflow Platform',
        'rabbit-ts-transactional-outbox-sagas',
        'A multi-agency incident coordination program',
        'They need quorum data safety, RabbitMQ 4.3 delayed retry and timeout policy, keyed order, stream-versus-queue decisions, a transactional outbox relay, duplicate-safe inbox effects, and compensated cross-service workflows.',
        [
          'rabbit-ts-replica-majority-safety',
          'rabbit-ts-delayed-retry-policy',
          'rabbit-ts-keyed-causal-order',
          'rabbit-ts-workload-selection-evidence',
          'rabbit-ts-outbox-relay-confirm',
          'rabbit-ts-saga-compensation',
        ]
      ),
      project(
        'rabbit-ts-production-messaging-defense',
        'RabbitMQ 4.3 Production Messaging Defense',
        'rabbit-ts-testing-chaos-recovery-release',
        'An engineering, security, accessibility, data, and operations review board',
        'The board needs TLS and least privilege, bounded tenant isolation, causal telemetry, capacity and alarm policy, layered tests, broker and dependency fault drills, compatible deployment, a supported 4.3 upgrade path, rollback, recovery objectives, and residual-risk ownership.',
        [
          'rabbit-ts-amqps-identity-verification',
          'rabbit-ts-tenant-isolation-abuse',
          'rabbit-ts-message-flow-telemetry',
          'rabbit-ts-resource-alarm-flow-control',
          'rabbit-ts-fault-injection-matrix',
          'rabbit-ts-rabbitmq43-upgrade-gate',
          'rabbit-ts-production-defense',
        ]
      ),
    ],
    examContext:
      'Unfamiliar TypeScript and RabbitMQ 4.3 cases spanning architecture choice, AMQP entities, amqplib lifecycle, connections, channels, topology, work queues, fanout, topic and headers routing, envelopes, schemas, publisher drain, returns, confirms, consumer lifecycle, acknowledgements, prefetch, idempotency, retries, dead letters, quorum queues, delayed retries, priorities, timeouts, ordering, streams, outbox, sagas, TLS, authorization, observability, capacity, faults, upgrade, rollback, and production recovery with explicit live transfer limits.',
    minimumQuestionBankSize: 840,
  },
  { researchedAt: RESEARCHED_AT, prerequisiteCourseIds: ['http-servers-typescript'] }
);

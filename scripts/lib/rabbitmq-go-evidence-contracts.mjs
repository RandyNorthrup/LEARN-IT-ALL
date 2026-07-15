const SPECS = {
  'rabbit-go-outcomes-delivery-claims': {
    parameters: 'published, confirmed, effectObserved bool',
    results: '(string, bool)',
    body: `	if !published { return "not-published", false }
	if !confirmed { return "publisher-ambiguous", false }
	if effectObserved { return "effect-observed", true }
	return "broker-owned", false`,
    anchors: ['!published', '!confirmed', 'effectObserved'],
    task: 'separate local publication, broker custody, and observable stakeholder effect',
  },
  'rabbit-go-architecture-pattern-selection': {
    parameters: 'buffering bool, subscribers int, replay, immediateReply bool',
    results: '(string, bool)',
    body: `	if replay { return "retained-stream", true }
	if subscribers > 1 { return "pubsub", true }
	if buffering { return "work-queue", true }
	if immediateReply { return "http", false }
	return "direct-call", false`,
    anchors: ['replay', 'subscribers\\s*>\\s*1', 'buffering', 'immediateReply'],
    task: 'choose HTTP, work distribution, pub/sub, or retained streams from coupling evidence',
  },
  'rabbit-go-amqp-model-routing': {
    parameters: 'exchangeType, routingKey string, bindings []string',
    results: '(int, bool)',
    body: `	destinations := 0
	for _, binding := range bindings {
		if exchangeType == "fanout" || binding == routingKey || (exchangeType == "topic" && binding == "#") { destinations++ }
	}
	return destinations, destinations == 0`,
    anchors: [
      'range\\s+bindings',
      'exchangeType\\s*==\\s*"fanout"',
      'binding\\s*==\\s*routingKey',
      'destinations\\s*==\\s*0',
    ],
    task: 'derive zero, one, or many queue destinations from AMQP exchange and binding values',
  },
  'rabbit-go-go-amqp091-contract': {
    parameters: 'bodyBytes, maximumBytes int, notificationOwned, runtimeValid bool',
    results: '(bool, string)',
    body: `	if bodyBytes < 0 || maximumBytes <= 0 || bodyBytes > maximumBytes { return false, "body-limit" }
	if !runtimeValid { return false, "runtime-schema" }
	if !notificationOwned { return false, "notification-lifecycle" }
	return true, "client-contract"`,
    anchors: ['bodyBytes\\s*>\\s*maximumBytes', '!runtimeValid', '!notificationOwned'],
    task: 'gate delivered bytes and amqp091 notification ownership without mistaking Go types for validation',
  },
  'rabbit-go-connections-channels-recovery': {
    parameters: 'heartbeatSeconds, generation, callbackGeneration, attempt int',
    results: '(bool, int, bool)',
    body: `	healthy := heartbeatSeconds >= 5 && heartbeatSeconds <= 20
	useCallback := generation > 0 && callbackGeneration == generation
	if attempt < 0 { attempt = 0 }
	if attempt > 6 { attempt = 6 }
	delay := 250 << attempt
	if delay > 30000 { delay = 30000 }
	return useCallback, delay, healthy`,
    anchors: [
      'heartbeatSeconds\\s*>=\\s*5',
      'callbackGeneration\\s*==\\s*generation',
      'delay\\s*>\\s*30000',
    ],
    task: 'bound heartbeat and recovery delay while rejecting stale channel-generation notifications',
  },
  'rabbit-go-topology-declarations-policies': {
    parameters: 'existingDurable, requestedDurable, mutablePolicy, destructive bool',
    results: '(bool, bool, string)',
    body: `	if existingDurable != requestedDurable { return false, true, "property-mismatch" }
	if destructive { return false, true, "versioned-topology" }
	if mutablePolicy { return true, false, "operator-policy" }
	return true, false, "equivalent"`,
    anchors: ['existingDurable\\s*!=\\s*requestedDurable', 'if\\s+destructive', 'mutablePolicy'],
    task: 'protect declaration equivalence and route mutable changes through policy or migration',
  },
  'rabbit-go-direct-routing-work-queues': {
    parameters: 'routeValid bool, capacity, inFlight int, effectDurable bool',
    results: '(bool, bool, string)',
    body: `	if !routeValid { return false, false, "route" }
	deliver := capacity > 0 && inFlight >= 0 && inFlight < capacity
	if !deliver { return false, false, "backpressure" }
	return true, effectDurable, "capacity"`,
    anchors: ['!routeValid', 'capacity\\s*>\\s*0', 'inFlight\\s*<\\s*capacity', 'effectDurable'],
    task: 'combine direct routing, worker capacity, and acknowledgement-after-effect evidence',
  },
  'rabbit-go-fanout-publish-subscribe': {
    parameters: 'responsibilities, queues int, durable, late bool',
    results: '(bool, string)',
    body: `	complete := responsibilities > 0 && queues == responsibilities
	if !late { return complete, "not-applicable" }
	if durable { return complete, "retained-backlog-only" }
	return complete, "missed"`,
    anchors: ['queues\\s*==\\s*responsibilities', '!late', 'if\\s+durable'],
    task: 'prove one queue per subscriber responsibility and explicit late-subscriber behavior',
  },
  'rabbit-go-topic-headers-alternate-routing': {
    parameters: 'validKey bool, matches int, alternate, mandatory bool',
    results: '(string, bool)',
    body: `	if !validKey { return "invalid-key", true }
	if matches > 0 { return "primary", false }
	if alternate { return "alternate", false }
	return "unroutable", mandatory`,
    anchors: ['!validKey', 'matches\\s*>\\s*0', 'if\\s+alternate', 'mandatory'],
    task: 'classify primary, alternate, returned, and invalid routing outcomes',
  },
  'rabbit-go-message-envelope-schema': {
    parameters: 'bytes, maximumBytes int, contentType, id string, schemaVersion int',
    results: '(bool, string)',
    body: `	if bytes < 0 || maximumBytes <= 0 || bytes > maximumBytes { return false, "size" }
	if contentType != "application/json" { return false, "content-type" }
	if id == "" || schemaVersion < 1 { return false, "envelope" }
	return true, "versioned-envelope"`,
    anchors: [
      'bytes\\s*>\\s*maximumBytes',
      'contentType\\s*!=\\s*"application/json"',
      'schemaVersion\\s*<\\s*1',
    ],
    task: 'bound bytes and validate content metadata, identity, and version before decoding effects',
  },
  'rabbit-go-publisher-admission-backpressure': {
    parameters: 'blocked bool, bufferedBytes, maximumBytes, inFlight, maximumInFlight int',
    results: '(bool, string)',
    body: `	if blocked { return false, "unblocked-signal" }
	if bufferedBytes < 0 || maximumBytes <= 0 || bufferedBytes >= maximumBytes { return false, "byte-capacity" }
	if inFlight < 0 || inFlight >= maximumInFlight { return false, "confirm-window" }
	return true, "admit"`,
    anchors: [
      'if\\s+blocked',
      'bufferedBytes\\s*>=\\s*maximumBytes',
      'inFlight\\s*>=\\s*maximumInFlight',
    ],
    task: 'propagate broker blocking, byte capacity, and confirm-window saturation into admission',
  },
  'rabbit-go-unroutable-returns': {
    parameters: 'returned, confirmed, alternateOwned, mandatory bool',
    results: '(string, bool)',
    body: `	if returned { return "unroutable-return", false }
	if alternateOwned { return "alternate-owned", false }
	if !confirmed { return "publisher-ambiguous", false }
	if mandatory { return "primary-owned", false }
	return "route-unknown", false`,
    anchors: ['if\\s+returned', 'alternateOwned', '!confirmed', 'route-unknown'],
    task: 'keep return, alternate custody, confirmation, and unknown route evidence separate',
  },
  'rabbit-go-publisher-confirms-ambiguity': {
    parameters: 'outstanding, maximum int, confirmed, channelClosed bool',
    results: '(bool, string)',
    body: `	if outstanding < 0 || maximum <= 0 { return false, "invalid-window" }
	if channelClosed && !confirmed { return false, "ambiguous" }
	if !confirmed { return outstanding < maximum, "pending" }
	return true, "broker-owned"`,
    anchors: [
      'outstanding\\s*<\\s*0',
      'channelClosed\\s*&&\\s*!confirmed',
      'outstanding\\s*<\\s*maximum',
    ],
    task: 'bound outstanding confirms and preserve ambiguity when a channel closes before proof',
  },
  'rabbit-go-consumer-goroutines-shutdown': {
    parameters: 'registered, cancelled bool, inFlight int, deadlineExpired bool',
    results: '(bool, string)',
    body: `	ready := registered && !cancelled && !deadlineExpired
	if ready { return true, "consume" }
	if inFlight > 0 && !deadlineExpired { return false, "drain" }
	if inFlight > 0 { return false, "close-requeue" }
	return false, "close"`,
    anchors: ['registered\\s*&&\\s*!cancelled', 'inFlight\\s*>\\s*0', 'close-requeue'],
    task: 'sequence consumer readiness, cancellation, handler draining, deadline, and close',
  },
  'rabbit-go-delivery-tags-redelivery': {
    parameters: 'owningGeneration, currentGeneration int, terminalChosen, effectDurable bool',
    results: '(string, bool)',
    body: `	if owningGeneration != currentGeneration { return "stale-delivery", false }
	if terminalChosen { return "already-decided", false }
	if !effectDurable { return "nack-with-policy", true }
	return "ack", true`,
    anchors: ['owningGeneration\\s*!=\\s*currentGeneration', 'terminalChosen', '!effectDurable'],
    task: 'enforce same-generation exactly-one terminal delivery decision after durable effect',
  },
  'rabbit-go-prefetch-goroutine-capacity': {
    parameters: 'prefetch, active, dependencyCapacity, messageBytes, byteBudget int',
    results: '(bool, string)',
    body: `	if prefetch <= 0 { return false, "unbounded-prefetch" }
	if messageBytes < 0 || messageBytes > byteBudget { return false, "bytes" }
	capacity := prefetch
	if dependencyCapacity < capacity { capacity = dependencyCapacity }
	if active >= 0 && active < capacity { return true, "capacity" }
	return false, "saturated"`,
    anchors: [
      'prefetch\\s*<=\\s*0',
      'messageBytes\\s*>\\s*byteBudget',
      'dependencyCapacity\\s*<\\s*capacity',
      'active\\s*<\\s*capacity',
    ],
    task: 'combine prefetch, active goroutines, dependency capacity, and message-byte budgets',
  },
  'rabbit-go-idempotency-inbox-effects': {
    parameters:
      'storedFingerprint, incomingFingerprint string, effectCommitted, externalKnown bool',
    results: '(bool, string)',
    body: `	if storedFingerprint != "" && storedFingerprint != incomingFingerprint { return false, "idempotency-conflict" }
	if effectCommitted { return false, "duplicate-complete" }
	if !externalKnown { return false, "external-ambiguous" }
	return true, "transactional-inbox"`,
    anchors: [
      'storedFingerprint\\s*!=\\s*incomingFingerprint',
      'effectCommitted',
      '!externalKnown',
    ],
    task: 'reject fingerprint conflicts, suppress completed duplicates, and preserve external ambiguity',
  },
  'rabbit-go-failure-retry-classification': {
    parameters: 'classification string, attempt, maximumAttempts, ageMillis, maximumAgeMillis int',
    results: '(bool, string)',
    body: `	if classification == "permanent" { return false, "park" }
	if classification == "ambiguous" { return false, "reconcile" }
	within := attempt >= 0 && attempt < maximumAttempts && ageMillis >= 0 && ageMillis < maximumAgeMillis
	if within { return true, "delayed-retry" }
	return false, "exhausted"`,
    anchors: [
      'classification\\s*==\\s*"permanent"',
      'classification\\s*==\\s*"ambiguous"',
      'attempt\\s*<\\s*maximumAttempts',
      'ageMillis\\s*<\\s*maximumAgeMillis',
    ],
    task: 'classify failures and enforce attempt, age, delay, and terminal retry budgets',
  },
  'rabbit-go-dead-letter-poison-parking': {
    parameters:
      'deadLettered bool, deathCount, maximumDeaths int, parkingBound, cycleDetected bool',
    results: '(string, bool)',
    body: `	if cycleDetected { return "dead-letter-cycle", false }
	if !deadLettered { return "source-queue", false }
	if deathCount >= maximumDeaths { return "park", parkingBound }
	return "retry-tier", true`,
    anchors: [
      'cycleDetected',
      '!deadLettered',
      'deathCount\\s*>=\\s*maximumDeaths',
      'parkingBound',
    ],
    task: 'bound dead-letter history, stop cycles, and separate retry tiers from authorized parking',
  },
  'rabbit-go-quorum-queues-replication': {
    parameters: 'members, available int, confirmed, effectObserved bool',
    results: '(bool, string)',
    body: `	if members < 1 || available < 0 || available > members { return false, "invalid-membership" }
	majority := members/2 + 1
	if available < majority { return false, "minority-unavailable" }
	if !confirmed { return true, "publisher-ambiguous" }
	if effectObserved { return true, "effect-observed" }
	return true, "quorum-owned"`,
    anchors: [
      'members/2\\s*\\+\\s*1',
      'available\\s*<\\s*majority',
      '!confirmed',
      'effectObserved',
    ],
    task: 'compute majority availability while separating quorum custody from stakeholder effect',
  },
  'rabbit-go-rabbitmq43-retries-priorities-timeouts': {
    parameters:
      'attempt, maximumAttempts, priority, maximumPriority int, consumerMillis, timeoutMillis int',
    results: '(bool, string)',
    body: `	if priority < 0 || priority > maximumPriority || maximumPriority > 32 { return false, "priority" }
	if consumerMillis >= timeoutMillis { return false, "consumer-timeout" }
	if attempt >= maximumAttempts { return false, "retry-exhausted" }
	return true, "rabbitmq43-policy"`,
    anchors: [
      'maximumPriority\\s*>\\s*32',
      'consumerMillis\\s*>=\\s*timeoutMillis',
      'attempt\\s*>=\\s*maximumAttempts',
    ],
    task: 'enforce RabbitMQ 4.3 delayed retry, strict priority, and consumer-timeout policy limits',
  },
  'rabbit-go-ordering-single-active-partitioning': {
    parameters: 'sequence, lastSequence int64, sameKey, singleActive bool',
    results: '(bool, string)',
    body: `	if !sameKey { return false, "different-partition" }
	if sequence <= lastSequence { return false, "duplicate-or-old" }
	if sequence > lastSequence+1 { return false, "gap" }
	if !singleActive { return false, "concurrency-risk" }
	return true, "next"`,
    anchors: [
      '!sameKey',
      'sequence\\s*<=\\s*lastSequence',
      'sequence\\s*>\\s*lastSequence\\+1',
      '!singleActive',
    ],
    task: 'enforce keyed sequence progression and single-active failover limits',
  },
  'rabbit-go-streams-superstreams-choice': {
    parameters: 'needsReplay bool, retentionHours, throughput, partitions int',
    results: '(string, int)',
    body: `	if needsReplay || retentionHours > 24 {
		if throughput > 100000 { return "super-stream", partitions }
		return "stream", 1
	}
	return "quorum-queue", 1`,
    anchors: [
      'needsReplay\\s*\\|\\|\\s*retentionHours\\s*>\\s*24',
      'throughput\\s*>\\s*100000',
      'super-stream',
    ],
    task: 'select queue, stream, or super stream from retention, replay, throughput, and partition evidence',
  },
  'rabbit-go-transactional-outbox-sagas': {
    parameters: 'domainCommitted, outboxStored, confirmed, effectAmbiguous bool',
    results: '(bool, string)',
    body: `	if domainCommitted != outboxStored { return false, "dual-write-gap" }
	if !domainCommitted { return false, "nothing-committed" }
	if effectAmbiguous { return false, "reconcile" }
	if confirmed { return false, "published" }
	return true, "outbox-pending"`,
    anchors: [
      'domainCommitted\\s*!=\\s*outboxStored',
      '!domainCommitted',
      'effectAmbiguous',
      'if\\s+confirmed',
    ],
    task: 'compose domain mutation, outbox record, confirmation, and ambiguous-effect recovery',
  },
  'rabbit-go-security-vhosts-tls-authz': {
    parameters: 'tlsVerified, vhostAllowed, configure, write, read, secretRedacted bool',
    results: '(bool, string)',
    body: `	if !tlsVerified || !vhostAllowed { return false, "identity-or-vhost" }
	if !secretRedacted { return false, "secret-exposure" }
	permissions := ""
	if configure { permissions += "c" }
	if write { permissions += "w" }
	if read { permissions += "r" }
	return permissions != "", permissions`,
    anchors: [
      '!tlsVerified\\s*\\|\\|\\s*!vhostAllowed',
      '!secretRedacted',
      'if\\s+configure',
      'permissions\\s*!=\\s*""',
    ],
    task: 'verify TLS and vhost identity, redact secrets, and compute least-privilege permissions',
  },
  'rabbit-go-observability-capacity-alarms': {
    parameters: 'ready, unacked int, oldestMillis, sloMillis int64, alarm bool',
    results: '(bool, string)',
    body: `	if ready < 0 || unacked < 0 || oldestMillis < 0 || sloMillis <= 0 { return false, "invalid-metrics" }
	if alarm { return false, "shed-publishers" }
	if oldestMillis > sloMillis {
		if unacked > ready { return false, "inspect-consumers" }
		return false, "add-bounded-capacity"
	}
	return true, "observe"`,
    anchors: [
      'oldestMillis\\s*<\\s*0',
      'if\\s+alarm',
      'oldestMillis\\s*>\\s*sloMillis',
      'unacked\\s*>\\s*ready',
    ],
    task: 'combine backlog, age, alarm, consumer, and bounded-capacity evidence',
  },
  'rabbit-go-testing-race-chaos-release': {
    parameters:
      'contractPass, raceLeakPass, brokerFaultPass, compatibleRollout, rollbackProven, upgradePathValid bool',
    results: '(bool, string)',
    body: `	if !contractPass { return false, "contract" }
	if !raceLeakPass { return false, "race-or-leak" }
	if !brokerFaultPass { return false, "faults" }
	if !compatibleRollout { return false, "rollout" }
	if !rollbackProven { return false, "rollback" }
	if !upgradePathValid { return false, "upgrade-path" }
	return true, "production-defense"`,
    anchors: [
      '!contractPass',
      '!raceLeakPass',
      '!brokerFaultPass',
      '!compatibleRollout',
      '!rollbackProven',
      '!upgradePathValid',
    ],
    task: 'gate release on contracts, race and leak evidence, broker faults, compatibility, rollback, and upgrade path',
  },
};

const ENVIRONMENTS = [
  'Go publisher supervisor losing one state notification',
  'bounded worker pool during a dependency slowdown',
  'table-driven topology review for a tenant migration',
  'consumer shutdown drill with one blocked handler goroutine',
  'quorum failover exercise during a rolling broker restart',
  'canary Go consumer decoding old and new envelopes',
  'confirm-window load test with broker flow control',
  'outbox relay recovery after a database commit',
  'race-enabled integration test with duplicate delivery',
  'stream-versus-queue architecture board',
];

const CHANGES = [
  'cancel the parent context while a result is still ambiguous',
  'close the owning channel before one delivery decision',
  'make one state notification stale after recovery generation changes',
  'add a subscriber responsibility without changing publisher intent',
  'lower the byte and goroutine budget and preserve rejection evidence',
  'reuse a message identity with a different payload fingerprint',
  'lose a quorum member and recompute majority availability',
  'raise a broker resource alarm and halt new admission',
  'introduce a keyed sequence gap during single-active failover',
  'fail the canary and prove older Go consumers remain compatible',
  'exhaust retry age before attempts reach their maximum',
  'remove the parking binding and expose the remediation gap',
];

const CONSTRAINTS = [
  'name the owner and stop path for every goroutine and notification channel',
  'retain screen-reader-readable topology and delivery evidence',
  'bound payload, queue, confirm-ledger, and handler bytes',
  'keep message identity out of metric labels while preserving causal traces',
  'allow exactly one terminal acknowledgement owner',
  'reject stale connection and channel generations',
  'keep credentials and connection URLs out of output',
  'separate deterministic browser proof from race-enabled and live-broker evidence',
  'prove cleanup under a single deadline and cancellation cause',
  'retain rollback topology before deleting old bindings',
];

function details(suffix) {
  const cleaned = suffix.replace(/[^a-z0-9]/giu, '').toLowerCase() || '0';
  let value = 2166136261;
  for (const character of cleaned) {
    value ^= character.charCodeAt(0);
    value = Math.imul(value, 16777619);
  }
  value >>>= 0;
  return {
    caseNumber: (value % 9000) + 1000,
    environment: ENVIRONMENTS[value % ENVIRONMENTS.length],
    change: CHANGES[(value >>> 4) % CHANGES.length],
    constraint: CONSTRAINTS[(value >>> 8) % CONSTRAINTS.length],
  };
}

function lookaheads(anchors, scope) {
  return anchors.map((anchor) => `(?=${scope}*?${anchor})`).join('');
}

export function rabbitmqGoScenario(moduleId, seed, activityKind = 'practice', competency) {
  const spec = SPECS[moduleId];
  if (!spec) throw new Error(`Missing RabbitMQ Go scenario profile for ${moduleId}`);
  const chosen = details(seed.toString(36));
  const probe = competency ? ` Competency probe: ${competency.statement}` : '';
  return `A ${activityKind} Go messaging team handles case ${chosen.caseNumber} during ${chosen.environment}. Build deterministic Go evidence to ${spec.task}; ${chosen.constraint}; then ${chosen.change}. Browser code uses pure values and state transitions only. amqp091-go, AMQP sockets, RabbitMQ, TLS, partitions, restarts, Docker, databases, race and leak checks, load, upgrades, and production behavior require explicit authorized transfer gates.${probe}`;
}

export function rabbitmqGoEvidenceContract({
  competencyId,
  moduleId,
  functionName,
  marker,
  suffix,
}) {
  const spec = SPECS[moduleId];
  if (!spec) throw new Error(`Missing RabbitMQ Go evidence profile for ${moduleId}`);
  const chosen = details(suffix);
  const scope = '(?:(?!// Evidence:)[\\s\\S])';
  return {
    marker,
    pattern: `${marker}${scope}*?func\\s+${functionName}\\s*\\([^)]*\\)\\s*\\([^)]*\\)\\s*\\{${lookaheads(spec.anchors, scope)}(?=${scope}*?return)${scope}*?return`,
    example: `${marker}
// Competency: ${competencyId}.
// Case ${chosen.caseNumber}: ${chosen.environment}.
// Operating constraint: ${chosen.constraint}.
// Changed case: ${chosen.change}.
func ${functionName}(${spec.parameters}) ${spec.results} {
	evidenceVariant${suffix} := "${suffix}-${[...suffix].reverse().join('')}-${chosen.caseNumber}"
	_ = evidenceVariant${suffix}
${spec.body}
}`,
    requirement: `Append a compile-ready pure-Go function headed "${marker}" that uses case ${chosen.caseNumber} to ${spec.task}. Return observable changed-case evidence. Browser code must not import amqp091-go, open sockets, contact RabbitMQ, Docker, networks, databases, or external effects, read host state, execute host commands, or use credentials; verify those boundaries later with Go 1.26.5 compile, vet, race, fuzz, leak, amqp091-go 1.12.0, RabbitMQ 4.3, TLS, partition, restart, load, upgrade, and production gates.`,
  };
}

export function rabbitmqGoWorkedExample(moduleId, seed) {
  return rabbitmqGoEvidenceContract({
    competencyId: `rabbit-go-worked-${moduleId}-${seed}`,
    moduleId,
    functionName: `worked_${moduleId.replaceAll('-', '_')}_${seed}`,
    marker: `// Evidence: rabbit-go-worked-${moduleId}-${seed}`,
    suffix: `worked${seed}`,
  }).example;
}

export const rabbitmqGoEvidenceModuleIds = Object.freeze(Object.keys(SPECS));

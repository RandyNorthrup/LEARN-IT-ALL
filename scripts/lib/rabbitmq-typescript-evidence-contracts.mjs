const SPECS = {
  'rabbit-ts-outcomes-delivery-claims': {
    parameters: 'publishCalled: boolean, brokerConfirmed: boolean, effectObserved: boolean',
    result: '{ claim: string; complete: boolean }',
    body: `  if (!publishCalled) return { claim: "not-published", complete: false };
  if (!brokerConfirmed) return { claim: "publisher-ambiguous", complete: false };
  return { claim: effectObserved ? "effect-observed" : "broker-owned", complete: effectObserved };`,
    anchors: ['!publishCalled', '!brokerConfirmed', 'effectObserved\\s*\\?'],
    task: 'separate local publish, broker ownership, and observable stakeholder effect',
  },
  'rabbit-ts-architecture-pattern-selection': {
    parameters:
      'needsBuffering: boolean, subscriberCount: number, needsReplay: boolean, immediateReply: boolean',
    result: '{ pattern: string; useBroker: boolean }',
    body: `  if (needsReplay) return { pattern: "retained-stream", useBroker: true };
  if (subscriberCount > 1) return { pattern: "pubsub", useBroker: true };
  if (needsBuffering) return { pattern: "work-queue", useBroker: true };
  return { pattern: immediateReply ? "http" : "direct-call", useBroker: false };`,
    anchors: ['needsReplay', 'subscriberCount\\s*>\\s*1', 'needsBuffering', 'immediateReply'],
    task: 'choose HTTP, work queue, pub/sub, or retained stream from explicit coupling needs',
  },
  'rabbit-ts-amqp-model-routing': {
    parameters:
      'exchangeType: "direct" | "fanout" | "topic", routingKey: string, bindings: readonly string[]',
    result: '{ destinations: number; unroutable: boolean }',
    body: `  const destinations = exchangeType === "fanout"
    ? bindings.length
    : bindings.filter((binding) => exchangeType === "direct"
      ? binding === routingKey
      : binding === "#" || binding === routingKey).length;
  return { destinations, unroutable: destinations === 0 };`,
    anchors: [
      'exchangeType\\s*===\\s*["\']fanout["\']',
      'binding\\s*===\\s*routingKey',
      'destinations\\s*===\\s*0',
    ],
    task: 'derive zero, one, or many queue destinations from exchange and binding evidence',
  },
  'rabbit-ts-node-amqplib-contract': {
    parameters:
      'api: "promise" | "callback", publishReturned: boolean, payloadValid: boolean, eventsOwned: boolean',
    result: '{ accepted: boolean; boundary: string }',
    body: `  if (api !== "promise") return { accepted: false, boundary: "single-api" };
  if (!payloadValid) return { accepted: false, boundary: "runtime-schema" };
  if (!eventsOwned) return { accepted: false, boundary: "event-lifecycle" };
  return { accepted: publishReturned, boundary: publishReturned ? "local-buffer" : "drain" };`,
    anchors: ['api\\s*!==\\s*["\']promise["\']', '!payloadValid', '!eventsOwned', 'local-buffer'],
    task: 'gate a typed amqplib client without treating types or publish booleans as broker proof',
  },
  'rabbit-ts-connections-channels-heartbeats': {
    parameters:
      'heartbeatSeconds: number, generation: number, callbackGeneration: number, attempt: number',
    result: '{ useCallback: boolean; delayMs: number; healthyPolicy: boolean }',
    body: `  const healthyPolicy = heartbeatSeconds >= 5 && heartbeatSeconds <= 20;
  const useCallback = generation > 0 && callbackGeneration === generation;
  const exponent = Math.min(Math.max(attempt, 0), 6);
  const delayMs = Math.min(30_000, 250 * (2 ** exponent));
  return { useCallback, delayMs, healthyPolicy };`,
    anchors: [
      'heartbeatSeconds\\s*>=\\s*5',
      'callbackGeneration\\s*===\\s*generation',
      'Math\\.min\\(30_000',
    ],
    task: 'bound heartbeat and reconnect policy while rejecting stale channel-generation callbacks',
  },
  'rabbit-ts-topology-declarations-policies': {
    parameters:
      'existingDurable: boolean, requestedDurable: boolean, mutablePolicy: boolean, destructive: boolean',
    result: '{ declare: boolean; migrate: boolean; reason: string }',
    body: `  if (existingDurable !== requestedDurable) {
    return { declare: false, migrate: true, reason: "property-mismatch" };
  }
  if (destructive) return { declare: false, migrate: true, reason: "versioned-topology" };
  return { declare: true, migrate: false, reason: mutablePolicy ? "operator-policy" : "equivalent" };`,
    anchors: [
      'existingDurable\\s*!==\\s*requestedDurable',
      'if\\s*\\(destructive\\)',
      'mutablePolicy\\s*\\?',
    ],
    task: 'protect property equivalence and route mutable operations through policy or versioned migration',
  },
  'rabbit-ts-direct-routing-work-queues': {
    parameters:
      'routingKey: string, workerCapacity: number, inFlight: number, effectDurable: boolean',
    result: '{ deliver: boolean; ack: boolean; reason: string }',
    body: `  if (!/^tasks\\.[a-z]+$/.test(routingKey)) {
    return { deliver: false, ack: false, reason: "route" };
  }
  const deliver = workerCapacity > 0 && inFlight >= 0 && inFlight < workerCapacity;
  return { deliver, ack: deliver && effectDurable, reason: deliver ? "capacity" : "backpressure" };`,
    anchors: [
      'workerCapacity\\s*>\\s*0',
      'inFlight\\s*<\\s*workerCapacity',
      'deliver\\s*&&\\s*effectDurable',
    ],
    task: 'combine direct routing, worker capacity, and acknowledgement-after-effect evidence',
  },
  'rabbit-ts-fanout-publish-subscribe': {
    parameters:
      'subscriberResponsibilities: number, queues: number, durable: boolean, late: boolean',
    result: '{ completeFanout: boolean; priorEvents: string }',
    body: `  const completeFanout = subscriberResponsibilities > 0 && queues === subscriberResponsibilities;
  const priorEvents = !late ? "not-applicable" : durable ? "retained-backlog-only" : "missed";
  return { completeFanout, priorEvents };`,
    anchors: [
      'queues\\s*===\\s*subscriberResponsibilities',
      'durable\\s*\\?',
      '["\']retained-backlog-only["\']',
    ],
    task: 'prove one subscription queue per responsibility and explicit late-subscriber behavior',
  },
  'rabbit-ts-topic-headers-alternate-routing': {
    parameters:
      'segments: readonly string[], matchedBindings: number, alternateBound: boolean, mandatory: boolean',
    result: '{ route: string; publisherFeedback: boolean }',
    body: `  if (segments.length < 2 || segments.some((part) => part.length === 0)) {
    return { route: "invalid-key", publisherFeedback: true };
  }
  if (matchedBindings > 0) return { route: "primary", publisherFeedback: false };
  if (alternateBound) return { route: "alternate", publisherFeedback: false };
  return { route: "unroutable", publisherFeedback: mandatory };`,
    anchors: [
      'segments\\.length\\s*<\\s*2',
      'matchedBindings\\s*>\\s*0',
      'alternateBound',
      'mandatory',
    ],
    task: 'classify primary, alternate, returned, and invalid routing outcomes',
  },
  'rabbit-ts-message-envelope-schema': {
    parameters:
      'bytes: number, maximumBytes: number, contentType: string, id: string, schemaVersion: number',
    result: '{ parse: boolean; reason: string }',
    body: `  if (bytes < 0 || maximumBytes <= 0 || bytes > maximumBytes) {
    return { parse: false, reason: "size" };
  }
  if (contentType !== "application/json") return { parse: false, reason: "content-type" };
  if (id.length === 0 || schemaVersion < 1) return { parse: false, reason: "envelope" };
  return { parse: true, reason: "versioned-envelope" };`,
    anchors: [
      'bytes\\s*>\\s*maximumBytes',
      'contentType\\s*!==\\s*["\']application/json["\']',
      'schemaVersion\\s*<\\s*1',
    ],
    task: 'bound bytes and validate content type, identity, and schema version before parsing effects',
  },
  'rabbit-ts-publisher-buffer-backpressure': {
    parameters:
      'publishReturned: boolean, bufferedBytes: number, maximumBytes: number, blocked: boolean',
    result: '{ admit: boolean; waitFor: string }',
    body: `  if (blocked) return { admit: false, waitFor: "unblocked" };
  if (bufferedBytes < 0 || maximumBytes <= 0 || bufferedBytes >= maximumBytes) {
    return { admit: false, waitFor: "capacity" };
  }
  return { admit: publishReturned, waitFor: publishReturned ? "none" : "drain" };`,
    anchors: [
      'if\\s*\\(blocked\\)',
      'bufferedBytes\\s*>=\\s*maximumBytes',
      'publishReturned\\s*\\?',
    ],
    task: 'propagate blocked, byte capacity, publish boolean, and drain state into upstream admission',
  },
  'rabbit-ts-unroutable-returns': {
    parameters:
      'mandatory: boolean, returned: boolean, confirmed: boolean, alternateAccepted: boolean',
    result: '{ routed: string; retry: boolean }',
    body: `  if (returned) return { routed: "unroutable-return", retry: false };
  if (alternateAccepted) return { routed: "alternate-owned", retry: false };
  if (!confirmed) return { routed: "publisher-ambiguous", retry: false };
  return { routed: mandatory ? "primary-owned" : "route-unknown", retry: false };`,
    anchors: ['if\\s*\\(returned\\)', 'alternateAccepted', '!confirmed', 'route-unknown'],
    task: 'keep mandatory return, alternate custody, confirmation, and route uncertainty separate',
  },
  'rabbit-ts-publisher-confirms-ambiguity': {
    parameters: 'unconfirmed: number, maximum: number, confirmed: boolean, channelClosed: boolean',
    result: '{ admit: boolean; outcome: string }',
    body: `  if (unconfirmed < 0 || maximum <= 0) return { admit: false, outcome: "invalid-window" };
  if (channelClosed && !confirmed) return { admit: false, outcome: "ambiguous" };
  if (!confirmed) return { admit: unconfirmed < maximum, outcome: "pending" };
  return { admit: true, outcome: "broker-owned" };`,
    anchors: [
      'unconfirmed\\s*<\\s*0',
      'channelClosed\\s*&&\\s*!confirmed',
      'unconfirmed\\s*<\\s*maximum',
    ],
    task: 'bound the confirm window and preserve ambiguity when a channel closes before proof',
  },
  'rabbit-ts-consumer-lifecycle-shutdown': {
    parameters:
      'registered: boolean, cancelled: boolean, inFlight: number, deadlineExpired: boolean',
    result: '{ ready: boolean; action: string }',
    body: `  const ready = registered && !cancelled && !deadlineExpired;
  if (ready) return { ready: true, action: "consume" };
  if (inFlight > 0 && !deadlineExpired) return { ready: false, action: "drain" };
  return { ready: false, action: inFlight > 0 ? "close-requeue" : "close" };`,
    anchors: ['registered\\s*&&\\s*!cancelled', 'inFlight\\s*>\\s*0', 'close-requeue'],
    task: 'sequence readiness, cancellation, in-flight draining, deadline, and channel close',
  },
  'rabbit-ts-acknowledgements-redelivery': {
    parameters:
      'owningGeneration: number, currentGeneration: number, terminalChosen: boolean, effectDurable: boolean',
    result: '{ decision: string; terminal: boolean }',
    body: `  if (owningGeneration !== currentGeneration) return { decision: "stale-delivery", terminal: false };
  if (terminalChosen) return { decision: "already-decided", terminal: false };
  if (!effectDurable) return { decision: "nack-with-policy", terminal: true };
  return { decision: "ack", terminal: true };`,
    anchors: [
      'owningGeneration\\s*!==\\s*currentGeneration',
      'if\\s*\\(terminalChosen\\)',
      '!effectDurable',
    ],
    task: 'enforce same-generation, exactly-one terminal acknowledgement after durable effect',
  },
  'rabbit-ts-prefetch-concurrency-capacity': {
    parameters:
      'prefetch: number, active: number, dependencyCapacity: number, messageBytes: number, byteBudget: number',
    result: '{ start: boolean; reason: string }',
    body: `  if (prefetch <= 0) return { start: false, reason: "unbounded-prefetch" };
  if (messageBytes < 0 || messageBytes > byteBudget) return { start: false, reason: "bytes" };
  const capacity = Math.min(prefetch, dependencyCapacity);
  return { start: active >= 0 && active < capacity, reason: active < capacity ? "capacity" : "saturated" };`,
    anchors: [
      'prefetch\\s*<=\\s*0',
      'messageBytes\\s*>\\s*byteBudget',
      'Math\\.min\\(prefetch',
      'active\\s*<\\s*capacity',
    ],
    task: 'combine prefetch, active handlers, downstream capacity, and message-byte budgets',
  },
  'rabbit-ts-idempotency-inbox-effects': {
    parameters:
      'storedFingerprint: string | undefined, incomingFingerprint: string, effectCommitted: boolean, externalKnown: boolean',
    result: '{ apply: boolean; outcome: string }',
    body: `  if (storedFingerprint && storedFingerprint !== incomingFingerprint) {
    return { apply: false, outcome: "idempotency-conflict" };
  }
  if (effectCommitted) return { apply: false, outcome: "duplicate-complete" };
  if (!externalKnown) return { apply: false, outcome: "external-ambiguous" };
  return { apply: true, outcome: "transactional-inbox" };`,
    anchors: [
      'storedFingerprint\\s*!==\\s*incomingFingerprint',
      'effectCommitted',
      '!externalKnown',
    ],
    task: 'reject fingerprint conflicts, suppress completed duplicates, and preserve external ambiguity',
  },
  'rabbit-ts-failure-retry-classification': {
    parameters:
      'classification: "transient" | "permanent" | "ambiguous", attempt: number, maximumAttempts: number, ageMs: number, maximumAgeMs: number',
    result: '{ retry: boolean; disposition: string }',
    body: `  if (classification === "permanent") return { retry: false, disposition: "park" };
  if (classification === "ambiguous") return { retry: false, disposition: "reconcile" };
  const withinBudget = attempt >= 0 && attempt < maximumAttempts && ageMs >= 0 && ageMs < maximumAgeMs;
  return { retry: withinBudget, disposition: withinBudget ? "delayed-retry" : "exhausted" };`,
    anchors: [
      'classification\\s*===\\s*["\']permanent["\']',
      'classification\\s*===\\s*["\']ambiguous["\']',
      'attempt\\s*<\\s*maximumAttempts',
      'ageMs\\s*<\\s*maximumAgeMs',
    ],
    task: 'classify permanent and ambiguous outcomes before applying both attempt and age budgets',
  },
  'rabbit-ts-dead-letter-poison-parking': {
    parameters:
      'deliveryCount: number, deliveryLimit: number, dlxBound: boolean, ownerAssigned: boolean',
    result: '{ route: string; retained: boolean }',
    body: `  if (deliveryCount < 0 || deliveryLimit < 0) return { route: "invalid", retained: false };
  if (deliveryCount <= deliveryLimit) return { route: "retry-policy", retained: true };
  if (!dlxBound) return { route: "drop-risk", retained: false };
  return { route: ownerAssigned ? "parking-remediation" : "unowned-parking", retained: true };`,
    anchors: ['deliveryCount\\s*<=\\s*deliveryLimit', '!dlxBound', 'ownerAssigned\\s*\\?'],
    task: 'route exhausted poison messages through a bound, owned, and retained remediation path',
  },
  'rabbit-ts-quorum-queues-replication': {
    parameters:
      'members: number, online: number, persistent: boolean, confirms: boolean, manualAck: boolean',
    result: '{ available: boolean; defended: boolean }',
    body: `  const majority = Math.floor(members / 2) + 1;
  const available = members >= 3 && members % 2 === 1 && online >= majority;
  const defended = available && persistent && confirms && manualAck;
  return { available, defended };`,
    anchors: [
      'Math\\.floor\\(members\\s*/\\s*2\\)\\s*\\+\\s*1',
      'members\\s*%\\s*2\\s*===\\s*1',
      'persistent\\s*&&\\s*confirms\\s*&&\\s*manualAck',
    ],
    task: 'derive majority availability and combine it with publisher and consumer data-safety evidence',
  },
  'rabbit-ts-rabbitmq43-retries-priorities-timeouts': {
    parameters:
      'brokerMinor: number, quorum: boolean, retryDelayMs: number, priority: number, handlerMs: number, consumerTimeoutMs: number',
    result: '{ supported: boolean; reason: string }',
    body: `  if (brokerMinor < 3 || !quorum) return { supported: false, reason: "compatibility" };
  if (retryDelayMs < 0 || priority < 0 || priority > 31) {
    return { supported: false, reason: "policy-range" };
  }
  if (handlerMs < 0 || consumerTimeoutMs <= handlerMs) return { supported: false, reason: "timeout-budget" };
  return { supported: true, reason: "rabbitmq-4.3" };`,
    anchors: [
      'brokerMinor\\s*<\\s*3',
      '!quorum',
      'priority\\s*>\\s*31',
      'consumerTimeoutMs\\s*<=\\s*handlerMs',
    ],
    task: 'gate RabbitMQ 4.3 quorum retry, priority, and timeout behavior on version and valid budgets',
  },
  'rabbit-ts-ordering-single-active-partitioning': {
    parameters:
      'sequence: number, lastSequence: number, partition: string, expectedPartition: string, singleActive: boolean',
    result: '{ apply: boolean; reason: string }',
    body: `  if (partition !== expectedPartition) return { apply: false, reason: "wrong-partition" };
  if (sequence <= lastSequence) return { apply: false, reason: "duplicate-or-old" };
  if (sequence > lastSequence + 1) return { apply: false, reason: "gap" };
  return { apply: singleActive, reason: singleActive ? "next" : "concurrency-risk" };`,
    anchors: [
      'partition\\s*!==\\s*expectedPartition',
      'sequence\\s*<=\\s*lastSequence',
      'lastSequence\\s*\\+\\s*1',
      'singleActive\\s*\\?',
    ],
    task: 'enforce partition, version, gap, and single-active evidence instead of claiming global order',
  },
  'rabbit-ts-streams-superstreams-choice': {
    parameters: 'needsReplay: boolean, backlog: number, throughput: number, orderedKeys: number',
    result: '{ type: string; partitions: number }',
    body: `  if (needsReplay || backlog > 5_000_000) {
    const partitions = Math.max(1, Math.min(32, orderedKeys));
    return { type: throughput > 100_000 ? "super-stream" : "stream", partitions };
  }
  return { type: "quorum-queue", partitions: 1 };`,
    anchors: [
      'backlog\\s*>\\s*5_000_000',
      'Math\\.min\\(32',
      'throughput\\s*>\\s*100_000',
      'quorum-queue',
    ],
    task: 'choose queue, stream, or super stream from replay, backlog, throughput, and order-key evidence',
  },
  'rabbit-ts-transactional-outbox-sagas': {
    parameters:
      'domainCommitted: boolean, outboxStored: boolean, confirmed: boolean, effectAmbiguous: boolean',
    result: '{ relay: boolean; state: string }',
    body: `  if (domainCommitted !== outboxStored) return { relay: false, state: "dual-write-gap" };
  if (!domainCommitted) return { relay: false, state: "nothing-committed" };
  if (effectAmbiguous) return { relay: false, state: "reconcile" };
  return { relay: !confirmed, state: confirmed ? "published" : "outbox-pending" };`,
    anchors: [
      'domainCommitted\\s*!==\\s*outboxStored',
      '!domainCommitted',
      'effectAmbiguous',
      'relay:\\s*!confirmed',
    ],
    task: 'close the local dual-write gap and preserve confirm or external-effect ambiguity',
  },
  'rabbit-ts-security-vhosts-tls-authz': {
    parameters:
      'tlsVerified: boolean, vhostAllowed: boolean, canConfigure: boolean, canWrite: boolean, canRead: boolean',
    result: '{ connect: boolean; permissions: string }',
    body: `  if (!tlsVerified || !vhostAllowed) return { connect: false, permissions: "denied" };
  const permissions = [canConfigure ? "configure" : "", canWrite ? "write" : "", canRead ? "read" : ""]
    .filter(Boolean).join(",");
  return { connect: permissions.length > 0, permissions: permissions || "none" };`,
    anchors: [
      '!tlsVerified\\s*\\|\\|\\s*!vhostAllowed',
      'canConfigure\\s*\\?',
      'canWrite\\s*\\?',
      'canRead\\s*\\?',
    ],
    task: 'gate verified TLS and vhost access while preserving separate configure, write, and read permissions',
  },
  'rabbit-ts-observability-capacity-alarms': {
    parameters: 'ready: number, unacked: number, oldestMs: number, sloMs: number, alarm: boolean',
    result: '{ healthy: boolean; action: string }',
    body: `  if (ready < 0 || unacked < 0 || oldestMs < 0 || sloMs <= 0) {
    return { healthy: false, action: "invalid-metrics" };
  }
  if (alarm) return { healthy: false, action: "shed-publishers" };
  if (oldestMs > sloMs) return { healthy: false, action: unacked > ready ? "inspect-consumers" : "add-bounded-capacity" };
  return { healthy: true, action: "observe" };`,
    anchors: ['if\\s*\\(alarm\\)', 'oldestMs\\s*>\\s*sloMs', 'unacked\\s*>\\s*ready'],
    task: 'combine backlog state, oldest age, SLO, and resource alarms into bounded operations action',
  },
  'rabbit-ts-testing-chaos-recovery-release': {
    parameters:
      'contractPass: boolean, brokerFaultPass: boolean, compatibleRollout: boolean, rollbackProven: boolean, upgradePathValid: boolean',
    result: '{ release: boolean; gate: string }',
    body: `  if (!contractPass) return { release: false, gate: "contract" };
  if (!brokerFaultPass) return { release: false, gate: "faults" };
  if (!compatibleRollout) return { release: false, gate: "rollout" };
  if (!rollbackProven) return { release: false, gate: "rollback" };
  return { release: upgradePathValid, gate: upgradePathValid ? "production-defense" : "upgrade-path" };`,
    anchors: [
      '!contractPass',
      '!brokerFaultPass',
      '!compatibleRollout',
      '!rollbackProven',
      'upgradePathValid\\s*\\?',
    ],
    task: 'gate release on contracts, broker faults, compatible rollout, rollback, and supported upgrade path',
  },
};

const ENVIRONMENTS = [
  'accessible municipal task intake with two worker pools',
  'multi-tenant case event backbone with three subscriber responsibilities',
  'benefit-notification consumer near its database pool limit',
  'regional incident workflow during one broker-node restart',
  'privacy-sensitive audit fanout with an offline subscriber',
  'payment-effect relay after an ambiguous provider timeout',
  'high-volume telemetry route with one hot customer key',
  'canary consumer reading old and new envelope versions',
  'quorum queue during a planned rolling maintenance window',
  'partner publisher using an unroutable changed topic key',
  'consumer fleet under a shared dependency outage',
  'recovery drill with stale callbacks from an old channel generation',
];

const CHANGES = [
  'make the broker confirmation disappear after the message may have committed',
  'add one subscriber responsibility without changing publisher intent',
  'change one routing segment and prove the exact destination set',
  'lower the byte or in-flight budget and preserve upstream rejection evidence',
  'close the channel while one acknowledgement decision is still pending',
  'reuse one message identity with a different payload fingerprint',
  'exhaust the retry age before the attempt count reaches its maximum',
  'remove the dead-letter binding and expose the resulting retention risk',
  'lose a quorum member and recompute majority availability',
  'introduce a sequence gap for one partition while another stays healthy',
  'raise a broker resource alarm and stop new publisher admission',
  'fail the canary and prove older consumers remain compatible during rollback',
];

const CONSTRAINTS = [
  'retain a screen-reader-readable delivery and ownership trace',
  'keep every queue and subscriber responsibility explicitly named',
  'bound payload, buffer, and retained-ledger bytes',
  'preserve one tenant fairness invariant',
  'record causal telemetry without message IDs as metric labels',
  'allow exactly one terminal acknowledgement decision owner',
  'keep reconnection and retry work cancellable under one deadline',
  'retain duplicate-safe identity through every ambiguous handoff',
  'prove topology rollback before deleting the old binding',
  'separate browser evidence from disposable live-broker proof',
  'keep credentials and connection URLs out of learner output',
  'show recovery after the changed failure is removed',
];

function requiredLookaheads(anchors, scope) {
  return anchors.map((anchor) => `(?=${scope}*?${anchor})`).join('');
}

function details(suffix) {
  const cleaned = suffix.replace(/[^a-z0-9]/gi, '').toLowerCase() || '000';
  let value = 2166136261;
  for (const character of cleaned) {
    value ^= character.charCodeAt(0);
    value = Math.imul(value, 16777619);
  }
  value >>>= 0;
  const first = Number.parseInt(cleaned[0] ?? '0', 36);
  const second = Number.parseInt(cleaned[1] ?? '0', 36);
  const last = Number.parseInt(cleaned.at(-1) ?? '0', 36);
  return {
    caseNumber: (value % 9000) + 1000,
    environment: ENVIRONMENTS[first % ENVIRONMENTS.length],
    changedCase: CHANGES[last % CHANGES.length],
    constraint: CONSTRAINTS[second % CONSTRAINTS.length],
  };
}

export function rabbitmqTypescriptScenario(moduleId, seed, activityKind = 'practice', competency) {
  const spec = SPECS[moduleId];
  if (!spec) throw new Error(`Missing RabbitMQ TypeScript scenario profile for ${moduleId}`);
  const chosen = details(seed.toString(36));
  const probe = competency ? ` Competency probe: ${competency.statement}` : '';
  return `A ${activityKind} messaging team handles case ${chosen.caseNumber} in a ${chosen.environment}. Build deterministic TypeScript evidence to ${spec.task}; ${chosen.constraint}; then ${chosen.changedCase}. Browser code models pure messaging decisions only. amqplib, AMQP sockets, RabbitMQ, TLS, partitions, restarts, Docker, databases, external effects, load, upgrades, and production behavior require explicit authorized transfer gates.${probe}`;
}

export function rabbitmqTypescriptEvidenceContract({
  competencyId,
  moduleId,
  functionName,
  marker,
  suffix,
}) {
  const spec = SPECS[moduleId];
  if (!spec) throw new Error(`Missing RabbitMQ TypeScript evidence profile for ${moduleId}`);
  const chosen = details(suffix);
  const withinEvidenceBlock = '(?:(?!// Evidence:)[\\s\\S])';
  return {
    marker,
    pattern: `${marker}${withinEvidenceBlock}*?function\\s+${functionName}\\s*\\([^)]*\\)\\s*:\\s*\\{[^}]+\\}\\s*\\{${requiredLookaheads(spec.anchors, withinEvidenceBlock)}(?=${withinEvidenceBlock}*?return)${withinEvidenceBlock}*?return`,
    example: `${marker}
// Competency: ${competencyId}.
// Case ${chosen.caseNumber}: ${chosen.environment}.
// Operating constraint: ${chosen.constraint}.
// Changed case: ${chosen.changedCase}.
function ${functionName}(${spec.parameters}): ${spec.result} {
  const evidenceVariant_${suffix} = "${suffix}-${[...suffix].reverse().join('')}-${chosen.caseNumber}";
  void evidenceVariant_${suffix};
${spec.body}
}`,
    requirement: `Append a compile-ready pure-TypeScript function headed "${marker}" that uses case ${chosen.caseNumber} to ${spec.task}. Return observable changed-case evidence. Browser code must not import amqplib or Node built-ins, open sockets, contact RabbitMQ, Docker, networks, databases, or external effects, read host state, or use credentials; verify those boundaries later with the named Node 24, amqplib 2.0.1, RabbitMQ 4.3, TLS, partition, restart, load, upgrade, and production transfer gates.`,
  };
}

export function rabbitmqTypescriptWorkedExample(moduleId, seed) {
  return rabbitmqTypescriptEvidenceContract({
    competencyId: `rabbit-ts-worked-${moduleId}-${seed}`,
    moduleId,
    functionName: `worked_${moduleId.replaceAll('-', '_')}_${seed}`,
    marker: `// Evidence: rabbit-ts-worked-${moduleId}-${seed}`,
    suffix: `worked${seed}`,
  }).example;
}

export const rabbitmqTypescriptEvidenceModuleIds = Object.freeze(Object.keys(SPECS));

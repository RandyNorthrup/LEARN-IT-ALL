const MODULE_EVIDENCE = {
  'k8s-architecture-reconciliation-evidence': {
    artifact: 'architecture-evidence.yaml',
    change:
      'request-path: kubectl -> api-server -> admission -> etcd\ncontroller-watch: desired-vs-observed\nnode-path: scheduler -> kubelet -> runtime\nconvergence: status-condition',
    verify: 'kubectl version && kubectl cluster-info && kubectl get --raw /readyz?verbose',
    failure:
      'Reject client-version-only evidence, direct-etcd application access, or a claim that reconciliation guarantees application correctness.',
    repair:
      'Capture current context, server APIs, component authority, desired state, observed status, and the remaining distribution-specific boundary.',
    feature: '(?:api-server\\s*->\\s*admission|controller-watch|scheduler\\s*->\\s*kubelet)',
  },
  'k8s-api-objects-schema-status': {
    artifact: 'api-object.yaml',
    change:
      'apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: status-api\nspec:\n  replicas: 3\nstatus-evidence: observedGeneration-and-conditions',
    verify:
      'kubectl explain deployment.spec --api-version=apps/v1 && kubectl get deployment status-api -o json',
    failure:
      'Reject valid-YAML-only evidence, stale status, unknown fields, or an API selected without feature-state and deprecation review.',
    repair:
      'Use live discovery and schema, separate spec from status, compare generation with observedGeneration, and preserve object UID and resourceVersion.',
    feature: '(?:apiVersion:\\s*apps/v1|observedGeneration-and-conditions|kubectl\\s+explain)',
  },
  'k8s-kubectl-contexts-declarative': {
    artifact: 'kubectl-plan.yaml',
    change:
      'context: training-cluster\nnamespace: intake\nmanager: learn-it-all\npreview: server-dry-run-and-diff\nmutation: server-side-apply\ndelete: uid-precondition',
    verify: 'kubectl config current-context && kubectl diff --server-side -f release.yaml',
    failure:
      'Reject implicit context, human-table parsing, client dry run as admission proof, unscoped prune, or field ownership theft.',
    repair:
      'Name cluster and namespace, use discovery and structured output, preview server behavior, scope ownership, and verify changed status.',
    feature: '(?:server-dry-run-and-diff|server-side-apply|kubectl\\s+config\\s+current-context)',
  },
  'k8s-metadata-namespaces-ownership': {
    artifact: 'metadata-policy.yaml',
    change:
      'namespace: intake\nlabels: app.kubernetes.io/name=status-api\nselector-owner: deployment-status-api\nowner-uid: retained\ndeletion: foreground\nfinalizer-controller: archive-cleanup',
    verify:
      'kubectl get all -n intake --show-labels -o json && kubectl get namespace intake -o json',
    failure:
      'Reject namespace-as-sandbox claims, overlapping selectors, name-only owner matching, or blind finalizer removal.',
    repair:
      'Separate scope and security, stabilize identity labels, trace owner UIDs and dependents, and identify external cleanup before deletion.',
    feature: '(?:app\\.kubernetes\\.io/name|owner-uid:\\s*retained|finalizer-controller)',
  },
  'k8s-pods-lifecycle-composition': {
    artifact: 'pod.yaml',
    change:
      'apiVersion: v1\nkind: Pod\nmetadata:\n  name: status-api\nspec:\n  initContainers: [schema-check]\n  containers: [api, telemetry-sidecar]\n  terminationGracePeriodSeconds: 30',
    verify: 'kubectl get pod status-api -o json && kubectl logs status-api --previous -c api',
    failure:
      'Reject durable-Pod assumptions, unbounded sidecars, swallowed signals, missing previous logs, or debug mutation presented as image repair.',
    repair:
      'Assign container ownership, bound startup and shutdown, capture states and exit causes, and prove a clean replacement preserves required behavior.',
    feature: '(?:kind:\\s*Pod|initContainers|terminationGracePeriodSeconds)',
  },
  'k8s-config-secrets-projection': {
    artifact: 'config-secret-policy.yaml',
    change:
      'public-config: immutable-configmap\nruntime-secret: projected-bound-source\ntoken-audience: intake-api\nenvironment-refresh: rollout-required\nmounted-refresh: observed\nredaction: enforced',
    verify:
      'kubectl get configmap status-config -o json && kubectl auth can-i get secrets --as system:serviceaccount:intake:status-api',
    failure:
      'Reject base64-as-encryption, static environment rotation, broad secret reads, subPath refresh claims, or values leaked through rendered output.',
    repair:
      'Separate config and secret authority, scope projections and audiences, trigger observable rollouts, rotate credentials, and verify redaction.',
    feature: '(?:immutable-configmap|projected-bound-source|token-audience)',
  },
  'k8s-health-resources-qos': {
    artifact: 'health-resource-policy.yaml',
    change:
      'requests: {cpu: 200m, memory: 256Mi}\nlimits: {memory: 512Mi}\nstartupProbe: bounded-cold-start\nreadinessProbe: traffic-contract\nlivenessProbe: process-deadlock-only\nfault-test: throttling-and-oom',
    verify: 'kubectl get pod status-api -o json && kubectl top pod status-api --containers',
    failure:
      'Reject dependency-based liveness, requests as runtime caps, green idle probes as capacity proof, or unexplained OOM and eviction.',
    repair:
      'Measure workload demand, separate probe purposes, calculate QoS, inject startup and pressure faults, and correlate container and node evidence.',
    feature: '(?:startupProbe|readinessProbe|livenessProbe|requests:\\s*\\{cpu)',
  },
  'k8s-deployments-rollouts-recovery': {
    artifact: 'deployment.yaml',
    change:
      'apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: status-api\nspec:\n  replicas: 4\n  strategy: {maxSurge: 1, maxUnavailable: 0}\n  image: registry.example.test/status@sha256:verified',
    verify:
      'kubectl rollout status deployment/status-api && kubectl get rs,pods -l app=status-api -o json',
    failure:
      'Reject mutable release identity, readiness-free rollout success, capacity arithmetic errors, or rollback presented as external-state recovery.',
    repair:
      'Bind image and config identity, calculate surge and unavailable capacity, inspect conditions and ReplicaSets, and coordinate roll forward or rollback.',
    feature: '(?:kind:\\s*Deployment|maxSurge:\\s*1|@sha256:verified)',
  },
  'k8s-workload-controller-selection': {
    artifact: 'controller-selection.yaml',
    change:
      'stateless-api: Deployment\nidentity-bound-worker: StatefulSet\nnode-agent: DaemonSet\none-time-migration: Job\nscheduled-reconcile: CronJob\nselection-proof: identity-completion-placement-update',
    verify: 'kubectl get deploy,sts,ds,job,cronjob -n intake -o json',
    failure:
      'Reject Deployment-for-everything, exactly-once Job claims, CronJob clock certainty, or StatefulSet as automatic data replication.',
    repair:
      'Select from identity, completion, placement, update, storage, retry, idempotency, and failure evidence; then test controller-specific recovery.',
    feature:
      '(?:identity-bound-worker:\\s*StatefulSet|node-agent:\\s*DaemonSet|one-time-migration:\\s*Job)',
  },
  'k8s-services-endpoints-dns': {
    artifact: 'service-discovery.yaml',
    change:
      'apiVersion: v1\nkind: Service\nmetadata:\n  name: status-api\nspec:\n  type: ClusterIP\n  selector: {app: status-api}\nendpoint-evidence: ready-serving-terminating\ndns: status-api.intake.svc.cluster.local',
    verify: 'kubectl get service,endpointslice -l kubernetes.io/service-name=status-api -o json',
    failure:
      'Reject Pod IP pinning, short-name cross-namespace assumptions, Service-as-health-probe claims, or locality policy as automatic availability.',
    repair:
      'Align selectors, inspect EndpointSlice conditions, use qualified DNS, test bind and route layers, and document platform-specific exposure.',
    feature: '(?:kind:\\s*Service|endpoint-evidence|svc\\.cluster\\.local)',
  },
  'k8s-gateway-ingress-routing-tls': {
    artifact: 'gateway-route.yaml',
    change:
      'gatewayClassName: conformant-public\nlistener: https-status-example-test\ntls-certificate: platform/status-cert\nroute: intake/status-route\nbackend: intake/status-api:8080\nreferenceGrant: platform-to-intake\nstatus: Accepted-Programmed-ResolvedRefs',
    verify: 'kubectl get gateway,httproute,referencegrant -A -o json',
    failure:
      'Reject controller-free Gateway assumptions, cross-namespace references without grants, rule-order myths, stale status, or unverified TLS ownership.',
    repair:
      'Select a conformant implementation, bind listeners and Routes, authorize references, inspect observedGeneration conditions, and transfer-test traffic.',
    feature: '(?:gatewayClassName|referenceGrant|Accepted-Programmed-ResolvedRefs)',
  },
  'k8s-network-model-policy-troubleshooting': {
    artifact: 'network-policy.yaml',
    change:
      'pod-network: cni-implementation-boundary\nip-family-policy: PreferDualStack\ningress: default-deny-plus-gateway\negress: default-deny-plus-dns-and-api\nmetadata-endpoint: denied\nreturn-path: stateful-implementation-verified',
    verify: 'kubectl get networkpolicy,pod,service,endpointslice -n intake -o json',
    failure:
      'Reject policy override semantics, automatic return-path claims, DNS-success as endpoint proof, or a CNI-independent packet conclusion.',
    repair:
      'Derive additive ingress and egress allows, preserve DNS and required control paths, then test name, endpoint, route, policy, and application layers.',
    feature: '(?:cni-implementation-boundary|PreferDualStack|default-deny-plus-dns)',
  },
  'k8s-storage-persistence-recovery': {
    artifact: 'storage-recovery.yaml',
    change:
      'claim: intake-data\nstorageClass: retained-zonal\nvolumeBindingMode: WaitForFirstConsumer\nreclaimPolicy: Retain\nsnapshot: application-quiesced\nrestore: fresh-namespace-and-claim\nchecksum: verified',
    verify: 'kubectl get pv,pvc,storageclass,volumesnapshot -A -o json',
    failure:
      'Reject Bound as durability proof, Delete reclaim surprises, arbitrary-zone binding, snapshot-as-backup claims, or restore without application validation.',
    repair:
      'Trace claim and volume lifecycle, align topology and access, quiesce the application, protect metadata and keys, and rehearse clean restore.',
    feature: '(?:WaitForFirstConsumer|reclaimPolicy:\\s*Retain|restore:\\s*fresh-namespace)',
  },
  'k8s-scheduling-placement-eviction': {
    artifact: 'placement-policy.yaml',
    change:
      'node-affinity: trusted-workload-class\ntoleration: dedicated=intake:NoSchedule\ntopologySpread: zones-maxSkew-1\npriorityClass: intake-critical\npreemption-policy: evidence-gated\neviction: graceful-and-budgeted',
    verify:
      'kubectl get pod status-api -o wide && kubectl get events --field-selector involvedObject.name=status-api',
    failure:
      'Reject toleration-as-attraction, preferred-as-required, replica count as spread proof, or priority as permission for unbounded disruption.',
    repair:
      'Derive eligible nodes and domains, calculate skew, inspect unschedulable reasons, separate preemption from eviction, and preserve graceful recovery.',
    feature: '(?:dedicated=intake:NoSchedule|zones-maxSkew-1|priorityClass)',
  },
  'k8s-availability-disruption-autoscaling': {
    artifact: 'availability-policy.yaml',
    change:
      'objective: 99.9-percent-availability\nreplicas: 4-across-2-zones\npdb: minAvailable-3\nhpa: autoscaling-v2-cpu-and-queue\nstabilization: bounded\nnode-headroom: measured\nfaults: drain-zone-loss-metrics-gap',
    verify: 'kubectl get deployment,pdb,hpa -n intake -o json',
    failure:
      'Reject replica-count-only HA, PDB as involuntary-failure protection, limit-based HPA math, or autoscalers without capacity and feedback analysis.',
    repair:
      'Tie replicas and topology to objectives, calculate disruption and scaling, reserve headroom, inject lag and failure, and measure user-visible service.',
    feature: '(?:minAvailable-3|autoscaling-v2-cpu-and-queue|drain-zone-loss)',
  },
  'k8s-identity-rbac-serviceaccounts': {
    artifact: 'rbac-policy.yaml',
    change:
      'serviceAccount: intake/status-api\nautomountServiceAccountToken: false\ntoken: projected-audience-intake-api\nrole: get-configmap-status-only\nbinding: namespace-intake\nreview: auth-can-i-and-escalation-map',
    verify: 'kubectl auth can-i --list --as system:serviceaccount:intake:status-api -n intake',
    failure:
      'Reject broad ClusterRoleBinding, long-lived static tokens, wildcard verbs, secret reads, bind or escalate paths, or workload creation as harmless.',
    repair:
      'Separate human and workload identity, scope verbs and resources, use bound audience tokens, test authorization, and review escalation periodically.',
    feature: '(?:automountServiceAccountToken:\\s*false|projected-audience|auth-can-i)',
  },
  'k8s-workload-security-admission': {
    artifact: 'restricted-workload-policy.yaml',
    change:
      'pod-security: restricted-v1.36\nrunAsNonRoot: true\nallowPrivilegeEscalation: false\ncapabilities-drop: ALL\nseccompProfile: RuntimeDefault\nreadOnlyRootFilesystem: true\nimage: digest-and-signature-required\nadmission: fail-closed-with-breakglass',
    verify:
      'kubectl auth can-i create pods -n intake && kubectl apply --server-side --dry-run=server -f restricted.yaml',
    failure:
      'Reject removed PodSecurityPolicy, namespace-only multi-tenancy, mutable images, privileged host access, broad secrets, or unavailable admission without a plan.',
    repair:
      'Enforce versioned Pod Security, minimize container and API authority, isolate network and storage, verify supply chain, and test break-glass recovery.',
    feature: '(?:restricted-v1\\.36|allowPrivilegeEscalation:\\s*false|capabilities-drop:\\s*ALL)',
  },
  'k8s-observability-debugging-incidents': {
    artifact: 'incident-evidence.yaml',
    change:
      'correlation: release-uid-request-trace\nstatus: generation-and-conditions\nevents: timestamped-short-retention\nlogs: current-previous-and-node\nmetrics: resource-system-application\naudit: identity-verb-resource\ndiagnosis: first-causal-layer',
    verify:
      'kubectl get deployment,pod,endpointslice -o json && kubectl logs status-api --previous --timestamps',
    failure:
      'Reject green replica count as user proof, restart as diagnosis, events as durable history, kubectl logs as archival storage, or unbounded cardinality.',
    repair:
      'Preserve identity and time, correlate desired and observed layers, reproduce one fault cleanly, retain the regression, and document telemetry limits.',
    feature: '(?:release-uid-request-trace|current-previous-and-node|first-causal-layer)',
  },
  'k8s-packaging-kustomize-helm-promotion': {
    artifact: 'release-package.yaml',
    change:
      'base: reviewed-kubernetes-resources\noverlay: production-patches\ngenerators: hashed-config-no-secret-output\nhelm: 4.2.2-oci-digest-pinned\nrender: offline-and-server-validated\nfield-manager: platform-reconciler\npromotion: immutable-digest\nrollback: compatibility-tested',
    verify:
      'kubectl kustomize overlays/production && helm template status oci://registry.example.test/status --version 1.4.0',
    failure:
      'Reject copied manifests, unpinned chart dependencies, secrets in values, render-only confidence, field ownership theft, or Git history as safe rollback proof.',
    repair:
      'Compose reviewed bases, render deterministically, validate schemas and policy, diff server behavior, preserve ownership, and promote immutable artifacts.',
    feature: '(?:production-patches|4\\.2\\.2-oci-digest-pinned|field-manager)',
  },
  'k8s-extensions-admission-operators': {
    artifact: 'extension-contract.yaml',
    change:
      'crd: structural-schema-with-status\nstorage-version: v1\nconversion: tested\ncontroller: idempotent-rate-limited-reconcile\nfinalizer: external-state-owned\nadmission: validating-policy-first\nwebhook: bounded-fail-policy\nuninstall: dependency-ordered',
    verify: 'kubectl get crd,validatingadmissionpolicy,validatingwebhookconfiguration -o json',
    failure:
      'Reject schema-free CRDs, event-script controllers, unbounded webhooks, fail-open-by-default, or operator deletion as external-state cleanup.',
    repair:
      'Version and validate the API, test conversion, bound reconciliation and admission, preserve status, contain failure, and rehearse upgrade and uninstall.',
    feature:
      '(?:structural-schema-with-status|idempotent-rate-limited-reconcile|validating-policy-first)',
  },
  'k8s-cluster-lifecycle-upgrade-recovery': {
    artifact: 'cluster-recovery-defense.yaml',
    change:
      'baseline: kubernetes-1.36.2\nlocal-proof: minikube-1.38.1\ndistribution: supported-and-conformant\nupgrade: patch-current-then-next-minor\norder: api-server-then-controllers-then-kubelet\ndrain: capacity-and-pdb-verified\netcd: encrypted-snapshot-restored\napplication-state: independently-restored\nrto-rpo: rehearsed',
    verify:
      'kubectl get nodes -o json && kubeadm upgrade plan && etcdctl snapshot status backup.db',
    failure:
      'Reject minikube as production proof, skipped minor upgrades, kubelet-first order, drain without capacity, etcd-only recovery, or backup without restore.',
    repair:
      'Confirm support and skew, scan removed APIs, canary components and workloads, preserve keys and state, rehearse restore order, and verify user service.',
    feature: '(?:kubernetes-1\\.36\\.2|minikube-1\\.38\\.1|etcd:\\s*encrypted-snapshot-restored)',
  },
};

const ENVIRONMENTS = [
  'single-node minikube profile with a constrained Docker driver',
  'three-node dual-stack staging cluster across two zones',
  'rootless development cluster with an empty namespace',
  'shared multi-tenant cluster under Restricted Pod Security',
  'air-gapped release cluster using an internal registry mirror',
  'managed canary cluster with provider-specific load balancing',
  'kubeadm recovery cluster restored onto replacement nodes',
  'remote context with short-lived federated workload identity',
  'high-latency edge cluster with intermittent control-plane access',
  'clean conformance cluster with only required add-ons installed',
];

const FAULTS = [
  'delete one ready Pod during a configuration rollout',
  'rotate a projected token while the API dependency slows',
  'drain a node while the disruption budget has no headroom',
  'withdraw the selected image digest after one node pulls it',
  'remove DNS egress from an otherwise ready workload',
  'fill ephemeral storage before graceful termination',
  'change a selector so one canary endpoint overlaps production',
  'restore a claim in a different topology and numeric identity',
  'make an admission dependency unavailable during an upgrade',
  'drop one metrics series during an autoscaling surge',
];

const PROOFS = [
  'object UID generation observedGeneration and status conditions',
  'server-side diff managed fields and admission decision',
  'Pod state previous exit endpoint readiness and request result',
  'EndpointSlice DNS policy route and packet-path correlation',
  'bound claim snapshot checksum and application consistency query',
  'scheduler event eligible domains skew and placement result',
  'authorization review token audience and audit correlation',
  'rendered manifests immutable digest policy and rollout status',
  'component versions skew drain timing and recovery rehearsal',
  'accessible incident timeline with causal regression evidence',
];

function indent(value) {
  return value
    .split('\n')
    .map((line) => `      ${line.trimStart()}`)
    .join('\n');
}

function scenarioDetails(suffix) {
  const value = Number.parseInt(suffix, 36);
  return {
    environment: ENVIRONMENTS[value % ENVIRONMENTS.length],
    fault: FAULTS[Math.floor(value / 7) % FAULTS.length],
    proof: PROOFS[Math.floor(value / 13) % PROOFS.length],
  };
}

export function kubernetesEvidenceContract({ competencyId, moduleId, marker, suffix }) {
  const profile = MODULE_EVIDENCE[moduleId];
  if (!profile) throw new Error(`Missing Kubernetes evidence profile for ${moduleId}`);
  const details = scenarioDetails(suffix);
  const decision = competencyId.replace(/^k8s-/, '').replaceAll('-', ' ');
  const withinEvidenceBlock = '(?:(?!  # Evidence:)[\\s\\S])';
  return {
    marker,
    pattern: `${marker}${withinEvidenceBlock}*?competency:\\s*${competencyId}${withinEvidenceBlock}*?artifact:\\s*${profile.artifact.replaceAll('.', '\\.')}${withinEvidenceBlock}*?change:\\s*\\|${withinEvidenceBlock}*?${profile.feature}${withinEvidenceBlock}*?verify:\\s*(?!\\[|todo)[^\\n]{12,}${withinEvidenceBlock}*?failure:\\s*(?!\\[|todo)[^\\n]{20,}${withinEvidenceBlock}*?repair:\\s*(?!\\[|todo)[^\\n]{20,}`,
    example: `${marker}
  - competency: ${competencyId}
    artifact: ${profile.artifact}
    decision: ${decision}
    environment: ${details.environment}
    fault-injection: ${details.fault}
    retained-proof: ${details.proof}
    case-key: ${suffix}
    change: |
${indent(profile.change)}
    verify: ${profile.verify}
    failure: ${profile.failure}
    repair: ${profile.repair}`,
    requirement: `Append the Kubernetes evidence item headed "${marker}". Tailor its ${profile.artifact} change to the current stakeholder case, retain a deterministic API or manifest review command, reject one concrete failure, and record a repair. The browser analyzes text only; run kubectl, Helm, kubeadm, and cluster commands later in an authorized disposable transfer environment.`,
  };
}

export function kubernetesWorkedExample(moduleId, seed) {
  const suffix = `worked${seed}`;
  return kubernetesEvidenceContract({
    competencyId: `k8s-worked-${moduleId}-${seed}`,
    moduleId,
    marker: `  # Evidence: k8s-worked-${moduleId}-${seed}`,
    suffix,
  }).example;
}

export const kubernetesEvidenceModuleIds = Object.freeze(Object.keys(MODULE_EVIDENCE));

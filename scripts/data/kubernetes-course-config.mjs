import { finalizeCourse, module, project, skill } from './course-config-helpers.mjs';

const REVIEWED_AT = '2026-07-14';
const RESEARCHED_AT = '2026-07-14T16:30:00.000Z';

function outcome(id, statement, misconception, knowledgeType = 'procedural', level = 'apply') {
  return skill(id, statement, misconception, knowledgeType, level);
}

function kubernetesModule(id, title, context, artifact, skills) {
  return {
    ...module(id, title, context, artifact, skills),
    contexts: {
      theory: context,
      workshop: `A platform pairing session predicts each API transition before producing the first working ${artifact} for ${title.toLowerCase()}.`,
      debug: `An incident responder inherits a plausible but defective ${artifact}; preserve status and events, isolate the first causal fault in ${title.toLowerCase()}, and retain a regression check.`,
      lab: `An independent delivery team receives an unfamiliar namespace, failure domain, and policy constraint and must transfer ${title.toLowerCase()} into a new ${artifact}.`,
      review: `An on-call handoff reconstructs ${title.toLowerCase()} from delayed object status, challenges one retained misconception, and revises the ${artifact} under changed capacity.`,
      quiz: `A release review compares fresh ${title.toLowerCase()} choices and accepts only answers tied to observable API, controller, workload, network, storage, or policy evidence.`,
    },
  };
}

const modules = [
  kubernetesModule(
    'k8s-architecture-reconciliation-evidence',
    'Kubernetes Purpose, Architecture, Reconciliation, and Environment Evidence',
    'A civic platform team must decide which availability problem Kubernetes can solve without mistaking orchestration for application correctness or infrastructure durability.',
    'cluster architecture and reconciliation evidence map',
    [
      outcome(
        'k8s-control-plane-node-components',
        'Trace API server, etcd, scheduler, controller manager, kubelet, container runtime, network proxy, DNS, and add-on responsibilities for one workload transition.',
        'The scheduler starts containers and continuously repairs every unhealthy application.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'k8s-api-etcd-source-truth',
        'Explain how API requests, admission, persisted desired state, watches, caches, and component status relate without treating any one cache as authority.',
        'Reading etcd directly is the normal and safest way for applications to discover Kubernetes state.',
        'conceptual',
        'explain'
      ),
      outcome(
        'k8s-declarative-reconciliation-loop',
        'Trace desired state, observed state, controller decisions, idempotent actions, status updates, and eventual convergence through a changed failure.',
        'Applying a manifest runs its YAML instructions once in top-to-bottom order.'
      ),
      outcome(
        'k8s-cluster-distribution-boundaries',
        'Distinguish Kubernetes core, distribution, cloud provider, CNI, CSI, CRI, Gateway implementation, add-on, and application responsibilities.',
        'Every conformant Kubernetes cluster includes identical storage, networking, ingress, observability, and backup behavior.',
        'strategic',
        'evaluate'
      ),
      outcome(
        'k8s-version-context-baseline',
        'Capture client, server, API discovery, context, cluster identity, node, runtime, add-on, feature-state, and support-window evidence before mutation.',
        'kubectl version alone proves the current context, server compatibility, and enabled APIs.',
        'metacognitive',
        'apply'
      ),
    ]
  ),
  kubernetesModule(
    'k8s-api-objects-schema-status',
    'API Resources, Object Identity, Schemas, Desired State, and Status',
    'A shared cluster rejects and defaults manifests differently across supported API versions while stale status leads a release team toward the wrong repair.',
    'versioned API object contract',
    [
      outcome(
        'k8s-group-version-kind-resource',
        'Resolve API group, version, kind, plural resource, scope, endpoint, and served or stored version for a concrete object.',
        'A Kind name, command-line resource alias, and REST resource path are interchangeable identifiers.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'k8s-spec-status-generation',
        'Separate desired spec, controller-owned status, metadata generation, observedGeneration, and status conditions before judging convergence.',
        'metadata.generation increments for every status update and proves the controller observed it.'
      ),
      outcome(
        'k8s-object-uid-resourceversion',
        'Use namespace, name, UID, resourceVersion, generation, timestamps, and managed fields to distinguish identity, concurrency, and history.',
        'Recreating an object with the same name preserves its UID, ownership, and watch identity.'
      ),
      outcome(
        'k8s-schema-defaulting-validation',
        'Predict decoding, defaulting, validation, admission, conversion, persistence, and unknown-field behavior from the published schema.',
        'Valid YAML syntax guarantees that the API server accepts and stores every supplied field.'
      ),
      outcome(
        'k8s-api-stability-deprecation',
        'Evaluate alpha, beta, stable, feature-gate, deprecation, removal, conversion, and version-skew evidence before selecting an API.',
        'A stable Kubernetes release makes every documented alpha and extension API safe for production.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  kubernetesModule(
    'k8s-kubectl-contexts-declarative',
    'kubectl Discovery, Contexts, Queries, Diff, Apply, and Safe Mutation',
    'An operator has two similarly named clusters and a manifest owned by multiple field managers; a convenient imperative edit could hit the wrong authority and steal fields.',
    'safe kubectl investigation and apply record',
    [
      outcome(
        'k8s-kubeconfig-context-authority',
        'Trace kubeconfig loading, merged files, context, cluster, user, namespace, credentials, impersonation, and TLS server identity before a request.',
        'The current namespace determines which cluster and credentials kubectl uses.'
      ),
      outcome(
        'k8s-discovery-explain-api-resources',
        'Use API discovery, api-resources, api-versions, explain, raw endpoints, and versioned reference material to identify authoritative fields.',
        'Memorized YAML from another cluster version is more reliable than live discovery.'
      ),
      outcome(
        'k8s-get-describe-structured-output',
        'Choose get, describe, events, logs, JSONPath, custom columns, selectors, and raw JSON or YAML without parsing human tables as stable interfaces.',
        'kubectl describe output is a stable machine-readable API contract.'
      ),
      outcome(
        'k8s-apply-diff-field-management',
        'Preview and apply declarative changes while tracing field managers, conflicts, pruning scope, server-side apply, and changed status.',
        'kubectl apply safely owns every field in an object regardless of other actors.'
      ),
      outcome(
        'k8s-imperative-dry-run-safety',
        'Use imperative generation, client and server dry runs, validation, preconditions, wait, patch types, and explicit deletion propagation as bounded tools.',
        'A client-side dry run proves admission, defaulting, authorization, and controller behavior on the server.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  kubernetesModule(
    'k8s-metadata-namespaces-ownership',
    'Namespaces, Metadata, Labels, Selectors, Ownership, and Deletion',
    'Several teams share a cluster where a selector overlaps another release, an owner is recreated, and a finalizer leaves a namespace terminating.',
    'resource identity and lifecycle policy',
    [
      outcome(
        'k8s-namespace-scope-boundaries',
        'Distinguish namespaced and cluster-scoped resources, default namespaces, cross-namespace references, quotas, and isolation limits.',
        'A namespace is a security sandbox that automatically isolates network, nodes, storage, and administrators.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'k8s-label-selector-contracts',
        'Design stable recommended labels and equality or set selectors without accidental overlap, mutable identity, or controller mismatch.',
        'Changing a controller selector is a harmless way to retarget an existing workload.'
      ),
      outcome(
        'k8s-annotations-managed-metadata',
        'Separate identifying labels from non-identifying annotations and preserve controller, tooling, audit, and rollout metadata ownership.',
        'Large arbitrary application data belongs in labels because selectors can ignore it.'
      ),
      outcome(
        'k8s-ownerrefs-garbage-collection',
        'Trace owner references, UIDs, controller ownership, dependents, and foreground, background, or orphan deletion propagation.',
        'Matching object names are sufficient for garbage collection after an owner is recreated.'
      ),
      outcome(
        'k8s-finalizers-deletion-recovery',
        'Interpret deletionTimestamp and finalizers, identify the responsible controller, preserve external cleanup evidence, and repair stuck deletion safely.',
        'Deleting finalizers immediately is the normal first repair for any terminating resource.',
        'metacognitive',
        'evaluate'
      ),
    ]
  ),
  kubernetesModule(
    'k8s-pods-lifecycle-composition',
    'Pods, Multi-Container Composition, Lifecycle, Termination, and Debug Containers',
    'An accessible status service shares a Pod with initialization and support containers but loses requests during termination and hides its first crash.',
    'bounded Pod composition and lifecycle manifest',
    [
      outcome(
        'k8s-pod-shared-boundaries',
        'Explain Pod identity, scheduling unit, shared network and volumes, isolated process and filesystem boundaries, and ephemeral replacement.',
        'A Pod is a durable virtual machine and its IP, local data, and identity survive replacement.',
        'conceptual',
        'explain'
      ),
      outcome(
        'k8s-init-app-sidecar-contracts',
        'Choose init, app, native sidecar, adapter, ambassador, and helper containers from startup, restart, ownership, shutdown, and resource contracts.',
        'Every cooperating process belongs in a sidecar inside the same Pod.'
      ),
      outcome(
        'k8s-container-states-restart-backoff',
        'Trace waiting, running, terminated, reasons, exit codes, restartPolicy, backoff, previous state, and Pod phase without equating them.',
        'CrashLoopBackOff is a permanent Pod phase and identifies the application root cause.'
      ),
      outcome(
        'k8s-hooks-signals-termination',
        'Design preStop, stop signals, termination grace, endpoint removal, application draining, child cleanup, and forced termination evidence.',
        'A preStop hook replaces application signal handling and always runs before every termination.'
      ),
      outcome(
        'k8s-ephemeral-debug-container-limits',
        'Use ephemeral containers and shared process evidence for bounded debugging while preserving image immutability and naming remaining node-level limits.',
        'An ephemeral debug container can modify the original image and proves the clean replacement will work.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  kubernetesModule(
    'k8s-config-secrets-projection',
    'ConfigMaps, Secrets, Environment, Projection, Rotation, and Change Propagation',
    'A payment-free intake service mixes public config with credentials, assumes environment values rotate, and releases without proving how changed data reaches running Pods.',
    'configuration and secret propagation contract',
    [
      outcome(
        'k8s-configmap-source-consumption',
        'Create and consume ConfigMaps through keys, files, env, envFrom, command arguments, immutable objects, and size or naming boundaries.',
        'Every ConfigMap update immediately and atomically changes all container environment variables.'
      ),
      outcome(
        'k8s-secret-encoding-encryption',
        'Distinguish base64 representation, API and etcd encryption, transport protection, RBAC, node exposure, application use, and external secret authority.',
        'A Kubernetes Secret is encrypted and inaccessible to cluster administrators merely because its data is base64 encoded.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'k8s-projected-volumes-downward-api',
        'Compose Secret, ConfigMap, service account token, downward API, and cluster trust bundle projections with scoped paths, modes, audiences, and refresh behavior.',
        'Projected volumes make every source writable and preserve arbitrary subPath refresh semantics.'
      ),
      outcome(
        'k8s-config-change-rollout',
        'Trace mounted refresh latency, environment immutability, checksum or generated-name rollout triggers, readiness, and rollback for changed configuration.',
        'Updating a ConfigMap automatically creates a safe Deployment rollout.'
      ),
      outcome(
        'k8s-secret-rotation-boundary',
        'Design short-lived credentials, audience, rotation, revocation, redaction, audit, reload, failure, and recovery evidence across workload and external systems.',
        'Replacing a Secret object proves every consumer stopped using the old credential.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  kubernetesModule(
    'k8s-health-resources-qos',
    'Requests, Limits, QoS, Probes, Startup, Readiness, and Resource Failure',
    'A slow-starting API is killed by liveness checks, serves traffic before warmup, and competes for memory without meaningful requests or limits.',
    'health and resource behavior policy',
    [
      outcome(
        'k8s-requests-limits-scheduling-runtime',
        'Relate CPU and memory requests to scheduling and accounting, limits to runtime enforcement, and application concurrency to measured capacity.',
        'Requests reserve dedicated physical resources while limits determine scheduler placement.'
      ),
      outcome(
        'k8s-qos-oom-eviction',
        'Derive Guaranteed, Burstable, and BestEffort QoS, container OOM, Pod eviction, node pressure, and restart evidence from effective resources.',
        'A memory limit prevents node pressure and guarantees that the Pod is never evicted.'
      ),
      outcome(
        'k8s-startup-readiness-liveness',
        'Separate startup gating, traffic readiness, process liveness, container restart, endpoint conditions, and dependency health.',
        'Liveness should fail whenever any external dependency is temporarily unavailable.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'k8s-probe-design-budgets',
        'Design HTTP, TCP, gRPC, or exec probes with correct target, timeout, period, thresholds, resource cost, failure budget, and diagnostic output.',
        'Fast probe intervals and tiny timeouts always improve recovery.'
      ),
      outcome(
        'k8s-resource-probe-fault-tests',
        'Test cold start, overload, dependency loss, memory pressure, CPU throttling, termination, and recovery without turning probes into cascading failure.',
        'A green readiness check under one idle run proves production capacity and resilience.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  kubernetesModule(
    'k8s-deployments-rollouts-recovery',
    'Deployments, ReplicaSets, Rollouts, Strategies, Conditions, and Recovery',
    'A release changes image and config while progress stalls, old ReplicaSets remain, and a rollback would restore code without restoring external state.',
    'observable Deployment rollout and recovery plan',
    [
      outcome(
        'k8s-deployment-replicaset-ownership',
        'Trace Deployment template hash, ReplicaSet ownership, desired replicas, Pod replacement, adoption boundaries, and observed status.',
        'A Deployment directly owns and individually updates every Pod.'
      ),
      outcome(
        'k8s-rollout-surge-unavailable',
        'Calculate RollingUpdate maxSurge, maxUnavailable, total capacity, readiness, termination, and rollout duration under a changed replica count.',
        'maxUnavailable zero guarantees no failed requests during every rollout.'
      ),
      outcome(
        'k8s-image-config-rollout-identity',
        'Bind Pod template changes to immutable image digests, configuration identity, pull policy, provenance, and selected platform evidence.',
        'Reapplying the same mutable tag always creates a new Deployment revision.'
      ),
      outcome(
        'k8s-rollout-status-history-control',
        'Interpret progress and availability conditions, pause and resume, revision history, deadlines, events, and wait semantics without trusting command completion alone.',
        'kubectl rollout status success proves application behavior and every downstream dependency.'
      ),
      outcome(
        'k8s-rollback-causal-recovery',
        'Choose roll forward or rollback from causal evidence while coordinating schemas, config, traffic, durable state, compatibility, and post-recovery verification.',
        'kubectl rollout undo reverses every application, configuration, database, and external side effect.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  kubernetesModule(
    'k8s-workload-controller-selection',
    'StatefulSets, DaemonSets, Jobs, CronJobs, and Controller Selection',
    'A data intake system has interchangeable APIs, identity-bound workers, node agents, finite migrations, and scheduled reconciliation tasks requiring different controllers.',
    'controller selection and completion contract',
    [
      outcome(
        'k8s-statefulset-identity-storage',
        'Design StatefulSet ordinal identity, headless discovery, stable claims, ordering, update partition, scaling, and failure recovery around application guarantees.',
        'StatefulSet automatically replicates application data and makes every database highly available.'
      ),
      outcome(
        'k8s-daemonset-node-coverage',
        'Use DaemonSets for node-local facilities with selectors, tolerations, priority, rolling updates, resource bounds, and control-plane coverage decisions.',
        'A DaemonSet always runs exactly one Pod on every node regardless of eligibility or updates.'
      ),
      outcome(
        'k8s-job-completion-parallelism',
        'Model Job completions, parallelism, indexed work, retries, backoff, deadlines, success policy, duplicate execution, and cleanup.',
        'A completed Job proves each unit of external work happened exactly once.'
      ),
      outcome(
        'k8s-cronjob-time-idempotency',
        'Design CronJob schedules, time zones, deadlines, concurrency policy, history, missed runs, clock assumptions, and idempotent work.',
        'CronJob guarantees exactly one execution at every scheduled instant.'
      ),
      outcome(
        'k8s-controller-choice-defense',
        'Defend Deployment, StatefulSet, DaemonSet, Job, CronJob, bare Pod, or custom controller selection from identity, completion, placement, update, and ownership evidence.',
        'Deployment is the safest default for every long-running or finite workload.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  kubernetesModule(
    'k8s-services-endpoints-dns',
    'Services, EndpointSlices, DNS, Discovery, and Traffic Policies',
    'A frontend loses backends as Pods rotate because it pins Pod IPs; a Service selector overlaps a canary and traffic policies change source and locality behavior.',
    'service discovery and endpoint evidence map',
    [
      outcome(
        'k8s-pod-network-identity',
        'Explain Pod IP identity, node routing, ports, host network exceptions, replacement, dual-stack boundaries, and application bind behavior.',
        'Containers in the same Pod need a Service to reach each other on localhost.',
        'conceptual',
        'explain'
      ),
      outcome(
        'k8s-service-selector-endpointslices',
        'Trace Service selectors, EndpointSlices, readiness and serving conditions, manual endpoints, topology hints, and stale endpoint diagnosis.',
        'A Service continuously probes Pods and includes every healthy Pod in its namespace.'
      ),
      outcome(
        'k8s-service-types-exposure',
        'Choose ClusterIP, headless, NodePort, LoadBalancer, ExternalName, or selectorless Service from discovery, exposure, platform, and security constraints.',
        'LoadBalancer replaces ClusterIP and works identically without a provider implementation.'
      ),
      outcome(
        'k8s-dns-service-discovery',
        'Resolve namespace-qualified Service and Pod records, search paths, headless answers, readiness publication, caching, and application retry behavior.',
        'A short Service name resolves identically from every namespace and external client.'
      ),
      outcome(
        'k8s-traffic-session-locality-policy',
        'Evaluate session affinity, internal and external traffic policies, source preservation, locality, health checks, uneven load, and failure-domain tradeoffs.',
        'Local traffic policy always improves availability and balances requests evenly.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  kubernetesModule(
    'k8s-gateway-ingress-routing-tls',
    'Ingress, Gateway API 1.5.1, Routing, TLS, Delegation, and Status',
    'Platform and application teams must share external HTTP routing without annotation-specific coupling, cross-namespace privilege, stale status, or unverified TLS ownership.',
    'Gateway API routing and delegation policy',
    [
      outcome(
        'k8s-ingress-gateway-boundary',
        'Compare Service, Ingress, implementation-specific annotations, Gateway API, controller installation, data plane, and conformance boundaries.',
        'Creating an Ingress or Gateway automatically installs a conformant traffic controller.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'k8s-gatewayclass-controller-capabilities',
        'Select GatewayClass and implementation from controller identity, parameters, supported features, conformance reports, release channel, and operational ownership.',
        'Every Gateway API implementation supports every Standard and Experimental feature identically.'
      ),
      outcome(
        'k8s-gateway-listener-tls',
        'Design Gateway addresses and listeners with protocol, port, hostname, namespace attachment, certificate reference, TLS mode, and conflict behavior.',
        'A TLS Secret reference is permitted from any namespace that can create an HTTPRoute.'
      ),
      outcome(
        'k8s-httproute-match-filter-backend',
        'Compose HTTPRoute parent references, hostnames, path and header matches, precedence, filters, weighted backends, timeouts, retries, and backend TLS policy.',
        'HTTPRoute rules are evaluated strictly in manifest order and always forward to the first match.'
      ),
      outcome(
        'k8s-referencegrant-status-conformance',
        'Authorize cross-namespace references with ReferenceGrant and verify Accepted, Programmed, ResolvedRefs, observedGeneration, attached routes, and implementation conformance.',
        'A syntactically valid HTTPRoute is active even when status conditions reject its references.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  kubernetesModule(
    'k8s-network-model-policy-troubleshooting',
    'Cluster Networking, CNI, NetworkPolicy, Dual Stack, and Layered Troubleshooting',
    'A multi-tier application has working DNS but failed connections, an additive policy gap, asymmetric dual-stack behavior, and a provider-specific data plane.',
    'network intent and isolation evidence policy',
    [
      outcome(
        'k8s-cni-cluster-network-model',
        'Trace Pod addressing, routing, CNI responsibilities, Service implementation, node paths, NAT, MTU, and platform-specific exceptions.',
        'The Kubernetes API specification installs and configures one universal network data plane.'
      ),
      outcome(
        'k8s-ip-families-service-proxy',
        'Interpret single or dual-stack families, family policy, ClusterIPs, EndpointSlices, service proxies, source addresses, and asymmetric reachability.',
        'Dual-stack configuration guarantees every workload and external path supports both families.'
      ),
      outcome(
        'k8s-networkpolicy-additive-isolation',
        'Derive ingress and egress isolation from Pod and namespace selectors, ipBlock, ports, peers, policy types, and additive allow rules.',
        'One allow policy overrides every other policy and permits the return path automatically.'
      ),
      outcome(
        'k8s-default-deny-dns-egress',
        'Build default-deny baselines while explicitly allowing DNS, required dependencies, control paths, metadata restrictions, and tested egress destinations.',
        'Default-deny ingress also blocks all egress and DNS without an egress policy.'
      ),
      outcome(
        'k8s-network-layered-diagnosis',
        'Diagnose name, endpoint, bind, policy, route, proxy, gateway, certificate, and application failures with source and destination evidence.',
        'Successful DNS resolution proves the Service has reachable ready backends.',
        'metacognitive',
        'evaluate'
      ),
    ]
  ),
  kubernetesModule(
    'k8s-storage-persistence-recovery',
    'Volumes, PersistentVolumes, Claims, StorageClasses, CSI, Snapshots, and Recovery',
    'A stateful intake service binds storage in the wrong zone, deletes data through a reclaim policy, and treats a crash-consistent snapshot as a proven application restore.',
    'stateful storage and recovery contract',
    [
      outcome(
        'k8s-volume-lifecycle-types',
        'Distinguish image, writable layer, emptyDir, projected, hostPath, ephemeral CSI, persistent, and external application storage lifecycles and authority.',
        'Every volume outlives its Pod and can be mounted from any replacement node.'
      ),
      outcome(
        'k8s-pv-pvc-binding-access',
        'Trace PV and PVC capacity, access modes, volume mode, selectors, binding, claim references, node affinity, phases, expansion, and release.',
        'ReadWriteMany means every storage implementation supports simultaneous multi-node writes safely.'
      ),
      outcome(
        'k8s-storageclass-dynamic-reclaim',
        'Design StorageClasses with provisioner, parameters, defaulting, reclaim policy, expansion, mount options, and WaitForFirstConsumer topology behavior.',
        'The default StorageClass and Delete reclaim policy preserve data unless a Pod is explicitly removed.'
      ),
      outcome(
        'k8s-csi-snapshot-migration',
        'Explain CSI controller and node roles, drivers, snapshots, clones, expansion, topology, credentials, feature support, and deprecated in-tree migration boundaries.',
        'Kubernetes core implements snapshots, backups, and restore semantics for every CSI driver.'
      ),
      outcome(
        'k8s-app-consistent-backup-restore',
        'Define application quiescence, snapshot or logical backup, metadata, encryption, checksums, retention, cross-cluster restore, and changed-case validation.',
        'A Bound PVC and successful VolumeSnapshot prove the application can recover within its objectives.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  kubernetesModule(
    'k8s-scheduling-placement-eviction',
    'Scheduling, Affinity, Taints, Topology, Priority, Preemption, and Eviction',
    'A critical workload remains Pending despite free aggregate capacity and later concentrates replicas into one failure domain while lower-priority work is disrupted.',
    'placement and disruption decision record',
    [
      outcome(
        'k8s-node-selector-affinity',
        'Use trusted node labels, nodeSelector, required and preferred node affinity, operators, weights, and ignored-during-execution semantics.',
        'Preferred node affinity is a hard requirement that remains enforced after scheduling.'
      ),
      outcome(
        'k8s-pod-affinity-anti-affinity',
        'Design inter-Pod affinity and anti-affinity with selectors, namespaces, topology keys, scheduler cost, and failure-domain consequences.',
        'Hard Pod anti-affinity automatically spreads replicas evenly across every zone.'
      ),
      outcome(
        'k8s-taints-tolerations-conditions',
        'Trace NoSchedule, PreferNoSchedule, and NoExecute taints, matching tolerations, toleration time, node conditions, and admission-added behavior.',
        'A toleration attracts a Pod to the tainted node and guarantees placement there.'
      ),
      outcome(
        'k8s-topology-spread-skew',
        'Calculate eligible domains, global minimum, maxSkew, minDomains, selectors, node inclusion policies, and DoNotSchedule or ScheduleAnyway behavior.',
        'Topology spread constraints continuously rebalance already running Pods after scale-down.'
      ),
      outcome(
        'k8s-priority-preemption-eviction',
        'Separate scheduling priority, preemption, nomination, PodDisruptionBudget interaction, node-pressure eviction, API eviction, graceful termination, and fairness.',
        'A higher priority Pod immediately and safely evicts any lower priority Pod until it runs.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  kubernetesModule(
    'k8s-availability-disruption-autoscaling',
    'Availability, Disruption Budgets, Graceful Draining, Autoscaling, and Capacity',
    'A two-zone service scales from noisy metrics, violates its recovery target during drain, and has enough replicas but insufficient failure-domain and resource headroom.',
    'availability and autoscaling operating policy',
    [
      outcome(
        'k8s-replica-failure-domain-capacity',
        'Translate service objectives into replica count, failure domains, topology placement, readiness, surge capacity, dependency limits, and recovery evidence.',
        'Three replicas always provide high availability regardless of nodes, zones, storage, or shared dependencies.'
      ),
      outcome(
        'k8s-pdb-voluntary-disruption',
        'Calculate minAvailable or maxUnavailable, unhealthy eviction policy, controller scale, simultaneous drains, and voluntary versus involuntary disruption limits.',
        'A PodDisruptionBudget prevents node failures and guarantees that applications remain available.'
      ),
      outcome(
        'k8s-hpa-metrics-control-behavior',
        'Derive HPA desired replicas from requests, utilization, custom or external metrics, missing samples, tolerance, stabilization, and scale policies.',
        'HPA uses CPU limits and reacts continuously without delay or stabilization.'
      ),
      outcome(
        'k8s-vertical-node-autoscale-boundaries',
        'Compare vertical resource recommendation or mutation, in-place resize support, node autoscaling, workload disruption, scheduling, quotas, and provider dependencies.',
        'HPA, vertical scaling, and node autoscaling can be enabled together without feedback or capacity interactions.'
      ),
      outcome(
        'k8s-capacity-chaos-recovery-evidence',
        'Test load, Pod loss, node drain, zone loss, slow dependency, scaling lag, quota, and recovery while measuring user-visible service objectives.',
        'A successful kubectl drain and replica count prove the availability objective under real traffic.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  kubernetesModule(
    'k8s-identity-rbac-serviceaccounts',
    'Authentication, Authorization, RBAC, Service Accounts, Tokens, and Impersonation',
    'A CI workload uses the default service account and a long-lived token while a broad ClusterRoleBinding permits secret reads and workload creation across tenants.',
    'least-privilege identity and authorization policy',
    [
      outcome(
        'k8s-authn-authz-admission-chain',
        'Trace TLS identity, authentication, user and group information, authorization, admission, validation, persistence, and audit for one request.',
        'RBAC authenticates users and admission decides whether they can connect to the API server.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'k8s-human-workload-identities',
        'Separate external human users and groups, ServiceAccounts, node identities, workload identity federation, image pull identity, and bootstrap credentials.',
        'Creating a ServiceAccount creates a safe long-lived Secret token for external automation.'
      ),
      outcome(
        'k8s-role-binding-scope',
        'Construct namespace-scoped Roles and RoleBindings or justified ClusterRoles and ClusterRoleBindings from verbs, resources, names, non-resource URLs, and subjects.',
        'A RoleBinding can grant a Role access to resources in every namespace.'
      ),
      outcome(
        'k8s-rbac-escalation-aggregation',
        'Detect bind, escalate, impersonate, service account, secret, workload-creation, node-proxy, CSR, aggregation, and wildcard privilege escalation paths.',
        'Read-only access to Pods and Secrets cannot lead to stronger credentials or code execution.',
        'strategic',
        'evaluate'
      ),
      outcome(
        'k8s-token-audience-rotation-review',
        'Use TokenRequest and projected bound tokens with audience, expiry, rotation, revocation, automount controls, authorization checks, and periodic review.',
        'A projected service account token is valid forever and for every service that trusts the cluster issuer.',
        'professional',
        'apply'
      ),
    ]
  ),
  kubernetesModule(
    'k8s-workload-security-admission',
    'Pod Security, Security Contexts, Images, Admission, Secrets, and Multi-Tenancy',
    'A hostile document workload requests privileged host access, mutable images, broad credentials, unrestricted egress, and co-location with sensitive tenants.',
    'restricted workload and admission policy',
    [
      outcome(
        'k8s-pod-security-standards-admission',
        'Apply Privileged, Baseline, and Restricted Pod Security Standards with enforce, audit, warn, version pinning, exemptions, namespace labels, and rollout evidence.',
        'The removed PodSecurityPolicy API is the current built-in way to enforce Restricted workloads.'
      ),
      outcome(
        'k8s-securitycontext-least-privilege',
        'Set non-root identity, groups, filesystem ownership, read-only root, capabilities, privilege escalation, seccomp, host namespaces, devices, and writable mounts from threat evidence.',
        'runAsNonRoot alone removes capabilities, blocks host access, and makes the filesystem read-only.'
      ),
      outcome(
        'k8s-image-supply-chain-admission',
        'Require immutable images, provenance, signatures, vulnerability policy, registry allowlists, architecture, pull credentials, and admission decisions with exceptions.',
        'imagePullPolicy Always makes a mutable tag immutable and verifies its publisher.'
      ),
      outcome(
        'k8s-secrets-encryption-audit',
        'Protect Secret access with least RBAC, encryption at rest, key rotation, audit, node and backup controls, external identity, redaction, and incident response.',
        'Encrypting etcd means any Pod in the namespace can safely read every Secret.'
      ),
      outcome(
        'k8s-multitenancy-isolation-defense',
        'Combine namespaces, RBAC, quotas, network policy, storage classes, scheduling isolation, Pod security, admission, audit, and dedicated clusters according to trust.',
        'Namespaces alone create a complete hard multi-tenant security boundary.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  kubernetesModule(
    'k8s-observability-debugging-incidents',
    'Status, Events, Logs, Metrics, Traces, Audit, and Layered Incident Response',
    'A release has green desired replicas but user failures, overwritten events, restarted containers, missing cluster logs, high-cardinality metrics, and no cross-layer correlation.',
    'cluster and workload incident evidence record',
    [
      outcome(
        'k8s-status-conditions-events',
        'Correlate spec, observedGeneration, conditions, reasons, messages, events, resource versions, controller ownership, and event retention without treating event order as durable history.',
        'A Ready condition and desired replica count prove the application serves correct user responses.'
      ),
      outcome(
        'k8s-container-node-logs',
        'Collect current and previous container logs, multi-container streams, timestamps, kubelet and runtime logs, rotation, retention, and node-loss boundaries.',
        'kubectl logs is a durable cluster-wide log archive that survives Pod and node deletion.'
      ),
      outcome(
        'k8s-metrics-resource-system',
        'Distinguish resource metrics, component metrics, application metrics, state metrics, cardinality, scrape, storage, alert, and autoscaling evidence.',
        'metrics-server provides durable application monitoring, dashboards, and alert history.'
      ),
      outcome(
        'k8s-traces-audit-correlation',
        'Correlate request IDs, trace context, API audit events, release identity, workload logs, metrics, and policy decisions without leaking secrets or high-cardinality labels.',
        'Distributed traces replace logs, metrics, events, and security audit records.'
      ),
      outcome(
        'k8s-layered-debugging-method',
        'Diagnose desired state, admission, scheduling, image, mount, process, probe, endpoint, DNS, policy, routing, storage, node, and application layers using the least invasive evidence.',
        'Restarting or exec-editing the failing Pod is the fastest reliable root-cause method.',
        'metacognitive',
        'evaluate'
      ),
    ]
  ),
  kubernetesModule(
    'k8s-packaging-kustomize-helm-promotion',
    'Kustomize, Helm 4, Rendering, Validation, Field Ownership, and Promotion',
    'A platform team copies environment manifests, renders an unreviewed chart, stores credentials in values, and promotes mutable images without diff, ownership, or rollback evidence.',
    'rendered environment release package',
    [
      outcome(
        'k8s-kustomize-resources-patches',
        'Compose Kustomize resources, components, overlays, prefixes, namespaces, labels, images, replacements, and patches without corrupting selectors or source bases.',
        'Kustomize templates arbitrary YAML and safely infers every selector relationship.'
      ),
      outcome(
        'k8s-kustomize-generators-hashes',
        'Generate ConfigMaps and Secrets from external sources, reason about name hashes and references, restrict loading, and keep secret values out of rendered evidence.',
        'Disabling generator name hashes is always necessary to keep references stable.'
      ),
      outcome(
        'k8s-helm-chart-values-lifecycle',
        'Inspect Helm 4 charts, templates, values schema, dependencies, hooks, release state, OCI identity, install, upgrade, rollback, uninstall, and ownership boundaries.',
        'A successful helm install proves rendered objects are secure, compatible, and healthy.'
      ),
      outcome(
        'k8s-render-validate-diff-policy',
        'Render locally, pin dependencies, validate schemas, scan policy, detect removed APIs, diff server defaults, test changed values, and record implementation-specific transfer gates.',
        'Template rendering alone proves admission, authorization, defaulting, and controller convergence.'
      ),
      outcome(
        'k8s-gitops-field-ownership-promotion',
        'Design pull-based reconciliation, field ownership, drift policy, secret authority, immutable promotion, health gates, rollback, and break-glass recovery without vendor coupling.',
        'Git history automatically makes cluster state convergent and every rollback safe.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  kubernetesModule(
    'k8s-extensions-admission-operators',
    'CRDs, Controllers, Operators, Admission Policies, Webhooks, and Extension Trust',
    'A cluster extension stores an underspecified custom resource, mutates workloads through an unavailable webhook, and upgrades without conversion or rollback evidence.',
    'trusted extension API and controller contract',
    [
      outcome(
        'k8s-crd-schema-status-conversion',
        'Design CRD names, scope, versions, structural OpenAPI schemas, defaulting, validation, pruning, status subresource, scale, storage version, and conversion.',
        'A CRD automatically supplies a controller and preserves unknown fields and old versions forever.'
      ),
      outcome(
        'k8s-controller-operator-contract',
        'Build or evaluate controllers from watches, work queues, level-based reconciliation, ownership, idempotency, finalizers, status, retries, leader election, and rate limits.',
        'An operator is simply a script that runs kubectl whenever an event occurs.'
      ),
      outcome(
        'k8s-admission-policy-webhook',
        'Choose built-in admission, ValidatingAdmissionPolicy, validating webhook, or mutating webhook from expressiveness, failure policy, ordering, timeout, availability, and audit needs.',
        'Fail-open admission is always safer because it preserves cluster availability.'
      ),
      outcome(
        'k8s-extension-interface-boundaries',
        'Distinguish aggregated APIs, CRDs, admission, scheduler plugins, device resource APIs, CNI, CSI, CRI, and Gateway implementations by authority and conformance.',
        'Every extension interface has the same versioning, isolation, and conformance guarantees as core stable APIs.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'k8s-extension-upgrade-trust',
        'Evaluate extension provenance, permissions, webhooks, CRDs, conversion, compatibility, backup, canary, observability, failure containment, and uninstall safety.',
        'Deleting an operator safely removes all custom resources, external state, and admission dependencies.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  kubernetesModule(
    'k8s-cluster-lifecycle-upgrade-recovery',
    'Local Clusters, Cluster Lifecycle, Conformance, Upgrades, Backup, and Production Defense',
    'An operations board must distinguish a local minikube proof from production, upgrade a supported cluster without skipped minors, recover control-plane state, and defend remaining risks.',
    'cluster lifecycle and recovery defense',
    [
      outcome(
        'k8s-minikube-local-transfer',
        'Create and inspect a minikube 1.38.1 learning cluster while naming driver, node, runtime, networking, storage, add-on, tunnel, resource, and production-transfer limits.',
        'A successful minikube workload proves multi-node production networking, storage, load balancing, and failure recovery.'
      ),
      outcome(
        'k8s-kubeadm-controlplane-etcd',
        'Trace kubeadm bootstrap, certificates, static Pods, control-plane endpoints, etcd membership, kubelet configuration, CNI installation, join tokens, and high-availability responsibilities.',
        'kubeadm installs a complete production network, storage, load balancer, backup, and observability platform.'
      ),
      outcome(
        'k8s-conformance-addons-support',
        'Evaluate Kubernetes conformance, supported versions, distribution lifecycle, cloud integration, add-ons, feature gates, APIs, operational ownership, and vendor support.',
        'Conformance guarantees identical performance, security configuration, add-ons, and implementation behavior.'
      ),
      outcome(
        'k8s-version-skew-upgrade-drain',
        'Plan supported patch and minor upgrades in component order with release notes, deprecated API scans, capacity, drain, disruption, skew, canary, verification, and rollback.',
        'Skipping minor versions and upgrading kubelets before API servers is a supported shortcut when workloads still run.'
      ),
      outcome(
        'k8s-disaster-recovery-capstone',
        'Defend control-plane and application backups, etcd snapshots, encryption keys, manifests, external state, restore order, DNS and traffic cutover, recovery objectives, drills, and residual risk.',
        'An etcd snapshot alone restores every application volume, external dependency, credential, and user-visible service.',
        'strategic',
        'create'
      ),
    ]
  ),
];

export const kubernetesBasicsConfig = finalizeCourse(
  {
    id: 'kubernetes-basics',
    title: 'Modern Kubernetes 1.36: Workloads, Security, Networking, and Operations',
    version: '2026.07',
    audience: {
      description:
        'Developers and operators who understand Linux and Docker and need to design, deploy, secure, debug, package, scale, upgrade, and defend production-shaped Kubernetes applications.',
      entryKnowledge: [
        'Demonstrate Linux Foundations and Modern Docker outcomes or equivalent process, permission, network, storage, container image, Compose, and diagnostic skill.',
        'Read YAML, reason about HTTP and DNS, and distinguish desired configuration from observed runtime evidence.',
      ],
      deviceConstraints: [
        'Browser labs analyze Kubernetes manifests, API state, kubectl plans, policies, events, and release evidence deterministically; learner input never reaches kubectl, a kubeconfig, cluster API, Docker socket, or host command execution.',
        'Full transfer work requires an authorized disposable Kubernetes cluster such as minikube plus separately verified network, storage, Gateway, policy, and backup implementations.',
      ],
      accessibilityAssumptions: [
        'Every topology, object graph, lifecycle, manifest, terminal trace, event table, metric, status condition, and policy decision requires structured text, keyboard operation, announced status, and non-color-only meaning.',
      ],
    },
    scope: {
      includes: [
        'Kubernetes 1.36.2 architecture, API discovery, reconciliation, kubectl context safety, metadata, namespaces, Pods, configuration, and observable object-state evidence',
        'Workload controllers, probes, resources, Services, EndpointSlices, DNS, NetworkPolicy, Gateway API 1.5.1, persistent storage, scheduling, disruption, and autoscaling',
        'Service accounts, least-privilege RBAC, secrets, Pod Security, workload isolation, admission, multi-tenancy, observability, debugging, and incident reconstruction',
        'Kustomize through kubectl 1.36, Helm 4.2.2, extensions, operators, minikube 1.38.1, immutable promotion, conformance, upgrades, fault testing, disaster recovery, and production transfer',
      ],
      excludes: [
        'Treating deterministic browser review as proof of a live cluster, CNI, CSI, Gateway, cloud load balancer, admission webhook, autoscaler, etcd restore, production capacity, or failure-domain behavior',
        'Provider-specific managed-cluster administration, exhaustive service meshes, every controller ecosystem, kernel exploit development, or vendor-specific GitOps implementation details',
      ],
      nextCourses: ['cicd-github-actions', 'terraform-basics', 'ansible-basics'],
    },
    sources: [
      {
        title: 'ACM/IEEE-CS/AAAI Computer Science Curricula 2023',
        authority: 'curriculum-framework',
        url: 'https://csed.acm.org/final-report/',
        version: 'CS2023 final report, 2024 publication files',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls institutional distributed-systems, operating-system, networking, security, data-management, software-engineering, testing, and professional-practice breadth.',
      },
      {
        title: 'Kubernetes 1.36 Releases, Version Skew, and API Reference',
        authority: 'official-docs',
        url: 'https://kubernetes.io/releases/',
        version: 'Kubernetes 1.36.2, 2026-06-09',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls supported releases, patch lifecycle, component skew, API groups, schemas, feature states, deprecations, downloads, and upgrade compatibility.',
      },
      {
        title: 'Kubernetes Architecture, Objects, and Cluster Administration',
        authority: 'official-docs',
        url: 'https://kubernetes.io/docs/concepts/architecture/',
        version: 'Kubernetes 1.36 documentation, current 2026-07-14',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls control-plane and node components, API and etcd boundaries, reconciliation, object identity and status, namespaces, ownership, cluster lifecycle, conformance, and recovery.',
      },
      {
        title: 'Kubernetes Workloads, Configuration, Probes, and Autoscaling',
        authority: 'official-docs',
        url: 'https://kubernetes.io/docs/concepts/workloads/',
        version: 'Kubernetes 1.36 documentation, current 2026-07-14',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls Pods, init and sidecar containers, Deployments, StatefulSets, DaemonSets, Jobs, CronJobs, configuration, lifecycle, probes, resources, QoS, disruption, and HPA.',
      },
      {
        title: 'Kubernetes Services, Networking, DNS, and NetworkPolicy',
        authority: 'official-docs',
        url: 'https://kubernetes.io/docs/concepts/services-networking/',
        version: 'Kubernetes 1.36 documentation, current 2026-07-14',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls Pod networking, Services, EndpointSlices, DNS, traffic policies, dual stack, NetworkPolicy, ingress boundaries, source preservation, and layered diagnosis.',
      },
      {
        title: 'Kubernetes Gateway API Specification and Conformance',
        authority: 'standard',
        url: 'https://gateway-api.sigs.k8s.io/',
        version: 'Gateway API 1.5.1, 2026-03-14',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls GatewayClass, Gateway, listeners, HTTPRoute, TLS, BackendTLSPolicy, ReferenceGrant, cross-namespace delegation, status, release channels, and implementation conformance.',
      },
      {
        title: 'Kubernetes Storage and CSI Documentation',
        authority: 'official-docs',
        url: 'https://kubernetes.io/docs/concepts/storage/',
        version: 'Kubernetes 1.36 storage guidance, current 2026-07-14',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls volumes, PVs, PVCs, StorageClasses, dynamic provisioning, topology, reclaim, expansion, CSI, snapshots, ownership, backup, and restore boundaries.',
      },
      {
        title: 'Kubernetes Scheduling, Preemption, Eviction, and Topology',
        authority: 'official-docs',
        url: 'https://kubernetes.io/docs/concepts/scheduling-eviction/',
        version: 'Kubernetes 1.36 scheduling guidance, current 2026-07-14',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls node and Pod affinity, taints, tolerations, topology spread, priority, preemption, disruption, eviction, resource placement, and emerging feature boundaries.',
      },
      {
        title: 'Kubernetes Security, RBAC, Pod Security, and Multi-Tenancy',
        authority: 'official-docs',
        url: 'https://kubernetes.io/docs/concepts/security/',
        version: 'Kubernetes 1.36 security guidance, current 2026-07-14',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls identities, authentication, authorization, RBAC, service accounts, bound tokens, Pod Security Standards and Admission, security contexts, Secrets, admission, isolation, and audit.',
      },
      {
        title: 'Kubernetes Observability and Debugging Documentation',
        authority: 'official-docs',
        url: 'https://kubernetes.io/docs/concepts/cluster-administration/observability/',
        version: 'Kubernetes 1.36 observability guidance, current 2026-07-14',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls status, conditions, events, application and system logs, metrics, traces, audit correlation, retention, cardinality, and layered incident response.',
      },
      {
        title: 'kubectl Kustomize and Helm Package Documentation',
        authority: 'official-docs',
        url: 'https://kubernetes.io/docs/tasks/manage-kubernetes-objects/kustomization/',
        version: 'kubectl 1.36 Kustomize and Helm 4.2.2, current 2026-07-14',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls resource composition, overlays, generators, patches, rendered manifests, charts, values, dependencies, OCI identity, lifecycle, validation, diff, and promotion boundaries.',
      },
      {
        title: 'minikube Local Cluster Documentation and Releases',
        authority: 'official-docs',
        url: 'https://minikube.sigs.k8s.io/docs/',
        version: 'minikube 1.38.1, 2026-02-19',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls disposable local cluster profiles, drivers, runtimes, networking, storage, add-ons, tunnels, resources, cleanup, CI use, and production-transfer limitations.',
      },
    ],
    modules,
    projects: [
      project(
        'k8s-accessible-status-workload',
        'Accessible Status Workload Rollout',
        'k8s-pods-lifecycle-composition',
        'A municipal service-status team',
        'The team needs an immutable multi-container Pod design with config, startup/readiness/liveness intent, bounded resources, graceful termination, structured status evidence, and a changed-failure rehearsal.',
        [
          'k8s-declarative-reconciliation-loop',
          'k8s-apply-diff-field-management',
          'k8s-init-app-sidecar-contracts',
          'k8s-hooks-signals-termination',
        ]
      ),
      project(
        'k8s-zero-trust-service-gateway',
        'Zero-Trust Service and Gateway Boundary',
        'k8s-network-model-policy-troubleshooting',
        'A public-interest data platform',
        'The platform needs Service discovery, explicit NetworkPolicy, Gateway API routing and TLS, cross-namespace delegation, least exposure, status-driven diagnosis, and conformance limits.',
        [
          'k8s-service-selector-endpointslices',
          'k8s-default-deny-dns-egress',
          'k8s-gateway-listener-tls',
          'k8s-referencegrant-status-conformance',
        ]
      ),
      project(
        'k8s-recoverable-intake-state',
        'Recoverable Stateful Intake Platform',
        'k8s-storage-persistence-recovery',
        'A nonprofit intake operations team',
        'The team needs identity-bound stateful workloads, topology-aware claims, safe reclaim, application-consistent backup, clean-cluster restore, checksum evidence, and recovery-objective defense.',
        [
          'k8s-statefulset-identity-storage',
          'k8s-storageclass-dynamic-reclaim',
          'k8s-csi-snapshot-migration',
          'k8s-app-consistent-backup-restore',
        ]
      ),
      project(
        'k8s-least-privilege-tenant',
        'Least-Privilege Tenant Workload Boundary',
        'k8s-workload-security-admission',
        'A legal-aid document processing team',
        'The team needs scoped identity, restricted Pod security, immutable images, secrets protection, network and storage isolation, admission evidence, fault containment, and an honest residual-risk statement.',
        [
          'k8s-rbac-escalation-aggregation',
          'k8s-pod-security-standards-admission',
          'k8s-securitycontext-least-privilege',
          'k8s-multitenancy-isolation-defense',
        ]
      ),
      project(
        'k8s-production-platform-defense',
        'Production Kubernetes Release and Recovery Defense',
        'k8s-cluster-lifecycle-upgrade-recovery',
        'An engineering, operations, accessibility, and security review board',
        'The board needs a rendered immutable application release, tested rollout and scaling, observability, policy, extension trust, supported upgrade, control-plane and application recovery drills, accessible runbook, and defended transfer limits.',
        [
          'k8s-capacity-chaos-recovery-evidence',
          'k8s-layered-debugging-method',
          'k8s-gitops-field-ownership-promotion',
          'k8s-disaster-recovery-capstone',
        ]
      ),
    ],
    examContext:
      'Unfamiliar Kubernetes architecture, API, kubectl, Pod, configuration, workload, probe, rollout, network, Gateway, storage, scheduling, scaling, identity, security, observability, packaging, extension, upgrade, and recovery cases requiring deterministic evidence plus explicit live-cluster transfer limits.',
    minimumQuestionBankSize: 630,
  },
  { researchedAt: RESEARCHED_AT, prerequisiteCourseIds: ['docker-basics'] }
);

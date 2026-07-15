import { finalizeCourse, module, project, skill } from './course-config-helpers.mjs';

const REVIEWED_AT = '2026-07-14';
const RESEARCHED_AT = '2026-07-14T17:45:00.000Z';

function dockerModule(id, title, context, artifact, skills) {
  return {
    ...module(id, title, context, artifact, skills),
    contexts: {
      theory: context,
      workshop: `A platform pairing session must produce the first working ${artifact} for ${title.toLowerCase()}, with predictions recorded before each simulated build or lifecycle change.`,
      debug: `An incident responder inherits a plausible but defective ${artifact}; isolate the first causal fault in ${title.toLowerCase()} and preserve a regression check before repair.`,
      lab: `An independent delivery team receives unfamiliar application constraints and must transfer ${title.toLowerCase()} into a new ${artifact} without copying the workshop scenario.`,
      review: `An operations reviewer reconstructs ${title.toLowerCase()} from delayed evidence, challenges one retained misconception, and extends the ${artifact} under a changed constraint.`,
      quiz: `A release board compares fresh ${title.toLowerCase()} decisions and accepts only answers tied to observable image, container, build, or Compose evidence.`,
    },
  };
}

const modules = [
  dockerModule(
    'docker-architecture-isolation-evidence',
    'Docker Architecture, OCI Boundaries, Isolation, and Environment Evidence',
    'A civic data team must decide whether containers solve its reproducibility problem without claiming virtual-machine isolation or ignoring daemon authority.',
    'container architecture and environment evidence map',
    [
      skill(
        'docker-client-daemon-api',
        'Trace Docker CLI, contexts, Engine API, daemon, containerd, runtime, registry, and host-kernel responsibilities for one operation.',
        'The Docker CLI directly creates isolated processes without a daemon or API.',
        'conceptual',
        'analyze'
      ),
      skill(
        'docker-container-vm-process',
        'Distinguish a container, image, process, namespace, cgroup, virtual machine, and host kernel without overstating isolation.',
        'Every container includes and boots a private guest kernel.',
        'conceptual',
        'explain'
      ),
      skill(
        'docker-oci-runtime-image-distribution',
        'Separate OCI image, runtime, and distribution contracts from Docker-specific implementation and product behavior.',
        'OCI defines every Docker CLI, Compose, networking, and build feature.'
      ),
      skill(
        'docker-editions-platform-boundaries',
        'Compare Docker Engine and Docker Desktop host, VM, filesystem, networking, licensing, and Linux-versus-Windows container boundaries.',
        'Docker Desktop and native Linux Engine have identical host and filesystem behavior.',
        'strategic',
        'evaluate'
      ),
      skill(
        'docker-version-context-baseline',
        'Capture client, server, API, context, platform, storage, security-option, and plugin versions before changing Docker state.',
        'A docker --version string proves the client is connected to the intended compatible daemon.',
        'metacognitive',
        'apply'
      ),
    ]
  ),
  dockerModule(
    'docker-containers-lifecycle-cli',
    'Container Creation, Process Lifecycle, CLI State, and Cleanup',
    'A support utility must run repeatedly with explicit inputs, observable exit behavior, bounded names, and cleanup that never deletes unrelated state.',
    'deterministic container lifecycle runbook',
    [
      skill(
        'docker-create-run-start-boundary',
        'Distinguish create, run, start, attach, exec, stop, kill, restart, pause, wait, remove, and auto-remove state transitions.',
        'docker run restarts the same stopped container whenever it is repeated.'
      ),
      skill(
        'docker-container-config-overrides',
        'Apply names, environment, working directory, user, entrypoint, command, labels, hosts, and platform overrides with correct precedence.',
        'Every docker run argument replaces the image entrypoint and command in the same way.'
      ),
      skill(
        'docker-foreground-detached-io',
        'Choose foreground, detached, interactive, TTY, attach, and log behavior while preserving standard streams and exit evidence.',
        'Interactive and TTY flags are required for every process that reads standard input.'
      ),
      skill(
        'docker-inspect-filter-format',
        'Use ps, inspect, filters, formats, diff, top, port, and wait to query exact container identity and state before mutation.',
        'Human-readable docker ps output is a stable machine interface for scripts.'
      ),
      skill(
        'docker-cleanup-scope-labels',
        'Use labels, explicit identifiers, dry evidence, and dependency checks to remove only intended containers and resources.',
        'docker system prune is the safest first response to any disk or naming problem.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  dockerModule(
    'docker-images-layers-registries',
    'Images, Layers, Manifests, Tags, Digests, and Registry Identity',
    'A release team must prove exactly which immutable multi-layer artifact ran even after a mutable tag moves in the registry.',
    'image identity and layer provenance ledger',
    [
      skill(
        'docker-image-config-rootfs-layers',
        'Relate image configuration, root filesystem diff layers, history, chain identity, and a container writable layer.',
        'Every Dockerfile instruction produces one filesystem layer containing the whole image.'
      ),
      skill(
        'docker-tag-digest-reference',
        'Distinguish names, repositories, tags, manifest digests, config digests, layer digests, and local image IDs.',
        'A tag is an immutable content checksum suitable for permanent deployment identity.',
        'conceptual',
        'analyze'
      ),
      skill(
        'docker-pull-platform-resolution',
        'Trace registry authentication, manifest-index selection, platform resolution, blob reuse, verification, and unpacking during pull.',
        'Pulling one tag always downloads one architecture-specific image and every layer again.'
      ),
      skill(
        'docker-image-inspect-history',
        'Inspect image metadata, history, labels, users, entrypoint, command, exposed ports, healthcheck, platform, and size without confusing declared intent with runtime truth.',
        'docker history reveals every original build command and secret with complete provenance.'
      ),
      skill(
        'docker-registry-push-retention',
        'Plan tag, digest, push, retention, deletion, garbage-collection, and rollback evidence across local and remote stores.',
        'Removing a local image tag deletes the corresponding remote registry artifact.'
      ),
    ]
  ),
  dockerModule(
    'dockerfile-build-context-instructions',
    'Dockerfile Frontend, Build Context, Instructions, and Process Contracts',
    'A small accessible web application needs a readable Dockerfile whose build inputs, defaults, process model, and runtime files are explicit.',
    'reviewed application Dockerfile and build-context contract',
    [
      skill(
        'dockerfile-syntax-parser-directives',
        'Use a pinned stable Dockerfile syntax frontend and explain parser directives, escape behavior, comments, continuations, and version boundaries.',
        'The syntax directive is a comment with no effect on available Dockerfile features.'
      ),
      skill(
        'docker-build-context-dockerignore',
        'Define local, Git, named, empty, and remote build contexts and use Dockerfile-specific ignore rules to minimize authority and invalidation.',
        '.gitignore automatically controls every Docker build context.'
      ),
      skill(
        'dockerfile-from-copy-add-workdir',
        'Use FROM, WORKDIR, COPY, and justified ADD behavior with explicit ownership, paths, checksums, and context boundaries.',
        'ADD and COPY are interchangeable and may read any host path.'
      ),
      skill(
        'dockerfile-run-shell-exec',
        'Distinguish build-time RUN from runtime process configuration and choose shell or exec form with deliberate expansion and signal behavior.',
        'Shell-form and exec-form commands have identical parsing, environment expansion, and PID behavior.'
      ),
      skill(
        'dockerfile-cmd-entrypoint-contract',
        'Compose ENTRYPOINT and CMD into an override-friendly PID 1 contract and test arguments, signals, and exit status.',
        'Multiple CMD instructions combine into a sequence of default commands.',
        'procedural',
        'apply'
      ),
    ]
  ),
  dockerModule(
    'docker-buildkit-cache-multistage',
    'BuildKit Graphs, Cache, Multi-Stage Builds, Mounts, and Secret Boundaries',
    'A CI build is slow, leaks credentials through configuration, and ships compilers that production never needs.',
    'cache-efficient multi-stage BuildKit pipeline',
    [
      skill(
        'docker-buildkit-llb-graph',
        'Explain frontend-to-LLB conversion, content-addressed operations, parallel stages, skipped work, builder drivers, and output exporters.',
        'BuildKit executes every Dockerfile line sequentially and always emits a local image.'
      ),
      skill(
        'docker-cache-keys-invalidation',
        'Predict cache keys for instructions, files, metadata, arguments, mounts, and parent state and isolate frequently changing inputs.',
        'A cache hit proves remote dependencies and package indexes are current.'
      ),
      skill(
        'docker-multistage-target-copy',
        'Design named build, test, debug, and minimal runtime stages and copy only verified artifacts across stage boundaries.',
        'Multi-stage builds automatically make every stage smaller and secure.'
      ),
      skill(
        'docker-build-mounts-secrets-ssh',
        'Use bind, cache, tmpfs, secret, and SSH RUN mounts with scoped lifetime, ownership, and cache behavior.',
        'Build arguments and ENV are safe ways to pass credentials because later RUN steps can unset them.',
        'professional',
        'apply'
      ),
      skill(
        'docker-external-cache-reproducibility',
        'Import and export bounded CI cache while separating acceleration from reproducibility, freshness, and trust evidence.',
        'A remote cache makes builds bit-for-bit reproducible and safe to trust without source verification.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  dockerModule(
    'docker-process-signals-health-resources',
    'PID 1, Signals, Shutdown, Health, Restart, and Resource Constraints',
    'A queue worker ignores termination, accumulates zombies, reports healthy while stalled, and can exhaust host memory.',
    'bounded process lifecycle and health policy',
    [
      skill(
        'docker-pid1-signal-reaping',
        'Trace PID 1 signal handling, child reaping, shell wrappers, init helpers, stop signals, and grace periods.',
        'Docker always forwards every signal through any shell wrapper and reaps every child automatically.'
      ),
      skill(
        'docker-graceful-stop-exit',
        'Design readiness removal, graceful shutdown, deadlines, forced termination, exit codes, and durable-work recovery.',
        'A successful docker stop proves the application completed all in-flight work.'
      ),
      skill(
        'docker-healthcheck-readiness',
        'Create bounded healthchecks with start period, interval, timeout, retries, useful output, and a scope distinct from restart or dependency readiness.',
        'An unhealthy container is automatically restarted by Docker in every configuration.'
      ),
      skill(
        'docker-restart-policy-semantics',
        'Choose no, on-failure, always, or unless-stopped behavior while accounting for manual stops, daemon restarts, and dependency recovery.',
        'A restart policy preserves ordering and makes every application failure safe to retry.'
      ),
      skill(
        'docker-cpu-memory-pids-limits',
        'Set and verify CPU, memory, swap, PID, file, and device constraints and diagnose throttling, OOM, or unsupported host behavior.',
        'Containers receive safe CPU and memory limits by default.',
        'professional',
        'analyze'
      ),
    ]
  ),
  dockerModule(
    'docker-storage-mounts-backup',
    'Writable Layers, Volumes, Bind Mounts, tmpfs, Ownership, and Recovery',
    'A stateful service loses data after replacement, while a developer bind mount hides packaged files and writes host files as root.',
    'storage selection, ownership, backup, and restore plan',
    [
      skill(
        'docker-writable-layer-copy-on-write',
        'Explain immutable image layers, container writable-layer lifetime, copy-on-write costs, and containerd image-store versus classic-driver boundaries.',
        'The container writable layer is durable application storage that follows a replacement container.'
      ),
      skill(
        'docker-volume-lifecycle',
        'Create, inspect, mount, share, label, back up, restore, migrate, and remove named and anonymous volumes with explicit ownership.',
        'Removing a container always removes every named and anonymous volume it used.'
      ),
      skill(
        'docker-bind-mount-authority',
        'Use bind mounts with deliberate host path, existence, read-only mode, propagation, SELinux, UID/GID, and portability boundaries.',
        'A bind mount is isolated from the host and cannot overwrite host data.'
      ),
      skill(
        'docker-tmpfs-sensitive-ephemeral',
        'Choose tmpfs for bounded ephemeral or sensitive data while accounting for memory, swap, permissions, size, and restart loss.',
        'tmpfs guarantees secrets can never reach disk under any host configuration.'
      ),
      skill(
        'docker-storage-backup-restore-test',
        'Quiesce or snapshot consistently, create a bounded backup, verify integrity, restore into a fresh volume, and rehearse application recovery.',
        'A successful archive command proves the application can restore consistent data.',
        'metacognitive',
        'evaluate'
      ),
    ]
  ),
  dockerModule(
    'docker-networking-dns-publishing',
    'Bridge Networks, DNS, Ports, Routing, IPv6, and Exposure Policy',
    'A multi-service application works through localhost on one machine but fails by service name and accidentally exposes its database to every interface.',
    'least-exposure container network topology',
    [
      skill(
        'docker-network-namespace-veth-bridge',
        'Trace container interfaces, network namespaces, veth pairs, bridge networks, routes, NAT, firewall rules, and platform boundaries.',
        'A Docker bridge is the same object and trust boundary as a physical Ethernet switch.'
      ),
      skill(
        'docker-user-defined-dns-aliases',
        'Use user-defined networks, embedded DNS, service names, aliases, attach/detach behavior, and IP churn without hard-coded addresses.',
        'localhost inside one container reaches sibling containers and the host automatically.'
      ),
      skill(
        'docker-expose-publish-bind-address',
        'Distinguish listening, EXPOSE, expose, publish, host address, host port, container port, and direct-routing behavior.',
        'EXPOSE publishes a port to the host and internet.'
      ),
      skill(
        'docker-internal-multinetwork-segmentation',
        'Segment frontend, backend, data, egress, internal, and attachable networks and verify which paths remain reachable.',
        'Multiple Compose networks automatically enforce application-layer authorization.'
      ),
      skill(
        'docker-ipv6-host-platform-diagnostics',
        'Diagnose IPv4, IPv6, Desktop VM, host access, DNS, proxy, firewall, MTU, and published-path differences with layered evidence.',
        'One successful ping proves DNS, TCP, TLS, application readiness, and published-port policy.',
        'metacognitive',
        'analyze'
      ),
    ]
  ),
  dockerModule(
    'docker-compose-model-lifecycle',
    'Compose Specification, Services, Projects, Dependencies, and Lifecycle',
    'A web, worker, and database stack needs one portable declared model with predictable naming, dependencies, health gates, and teardown.',
    'validated multi-service Compose application model',
    [
      skill(
        'docker-compose-spec-model',
        'Explain the current Compose Specification and service, network, volume, config, secret, project, and optional implementation boundaries.',
        'Compose file version 3 is newer and more capable than the merged Compose Specification.'
      ),
      skill(
        'docker-compose-project-resolution',
        'Resolve project name, working directory, files, includes, merges, interpolation, environment sources, and canonical config output.',
        'Environment variables, env_file values, and Compose interpolation use one precedence rule.'
      ),
      skill(
        'docker-compose-service-image-build',
        'Define image or build source, command, entrypoint, environment, user, working directory, health, resources, and metadata per service.',
        'Specifying both build and image always causes Compose to build and ignore registry state.'
      ),
      skill(
        'docker-compose-dependency-readiness',
        'Use depends_on conditions, healthchecks, completed jobs, required dependencies, and application retry without confusing order with readiness.',
        'Short depends_on waits until every dependency is ready to serve requests.'
      ),
      skill(
        'docker-compose-up-down-state',
        'Predict pull, build, create, recreate, start, attach, stop, down, orphan, anonymous volume, and named volume effects before lifecycle commands.',
        'docker compose down removes every named volume and built image by default.',
        'procedural',
        'analyze'
      ),
    ]
  ),
  dockerModule(
    'docker-compose-development-testing',
    'Compose Development, Overrides, Profiles, Watch, and Test Workflows',
    'Developers need fast source sync and optional debugging while CI needs isolated dependencies, deterministic tests, and no production-only side effects.',
    'development and test Compose workflow matrix',
    [
      skill(
        'docker-compose-files-merge-reset',
        'Merge base, development, test, and local Compose files while predicting mapping, sequence, reset, replace, and path resolution behavior.',
        'Multiple Compose files concatenate every field and resolve every path relative to its own file.'
      ),
      skill(
        'docker-compose-profiles-targeting',
        'Use profiles and explicit service targeting for optional tools without silently omitting required dependencies.',
        'A profiled service is never started when explicitly targeted.'
      ),
      skill(
        'docker-compose-watch-inner-loop',
        'Choose sync, rebuild, restart, sync-and-restart, initial sync, and ignore behavior from code, dependency, config, and platform changes.',
        'Compose Watch replaces application-level hot reload and always works through bind mounts.'
      ),
      skill(
        'docker-compose-run-exec-test',
        'Choose run, exec, up, wait, exit-code-from, abort-on-exit, attach, and logs for repeatable test and migration jobs.',
        'docker compose run and exec create and target the same process and container state.'
      ),
      skill(
        'docker-compose-config-dry-run',
        'Use config, profiles, images, models, variables, consistency checks, dry-run, and changed-file review before mutating a stack.',
        'YAML parsing success proves a Compose application is valid, portable, and safe to apply.',
        'metacognitive',
        'evaluate'
      ),
    ]
  ),
  dockerModule(
    'docker-security-least-privilege',
    'Container Threat Models, Users, Capabilities, Seccomp, Rootless, and Daemon Authority',
    'A third-party document converter handles hostile files but requests root, privileged mode, every device, and the Docker socket.',
    'least-privilege container threat model and hardening profile',
    [
      skill(
        'docker-threat-boundary-host-kernel',
        'Model untrusted image, build, registry, daemon, runtime, kernel, mount, device, network, and supply-chain threats without treating containers as sandboxes by default.',
        'Any process inside a container is safe to run because namespaces prevent host impact.'
      ),
      skill(
        'docker-user-uid-gid-files',
        'Run as a deliberate non-root UID/GID and reconcile image ownership, mounted files, rootless mappings, and required privileged startup work.',
        'USER app guarantees the process is unprivileged on every host and mounted path.'
      ),
      skill(
        'docker-capabilities-privileged-devices',
        'Start from dropped capabilities and add only measured needs while treating privileged, devices, host namespaces, and Docker socket access as host authority.',
        '--privileged is a convenient compatibility switch with only container-local effects.'
      ),
      skill(
        'docker-seccomp-apparmor-selinux-no-new',
        'Retain or tighten seccomp, AppArmor or SELinux, no-new-privileges, read-only roots, masked paths, and writable tmpfs exceptions.',
        'Running as non-root makes seccomp, mandatory access control, and capability policy unnecessary.'
      ),
      skill(
        'docker-rootless-userns-daemon-socket',
        'Compare rootless mode, userns remap, rootful daemon groups, contexts, remote TLS, and socket proxies and document remaining authority.',
        'Membership in the docker group grants ordinary non-administrative access only.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  dockerModule(
    'docker-config-secrets-environment',
    'Runtime Configuration, Secrets, Environment Precedence, and Sensitive Data',
    'A service must receive database credentials and rotation-safe settings without baking them into images, logs, history, or source control.',
    'configuration and secret-flow contract',
    [
      skill(
        'docker-build-runtime-config-boundary',
        'Separate build arguments, build secrets, image environment, runtime environment, Compose interpolation, configs, and application configuration.',
        'ARG and ENV are equivalent inputs that disappear when the build completes.'
      ),
      skill(
        'docker-environment-precedence-escaping',
        'Resolve CLI, Compose, env_file, image, shell, quoting, unset, empty, required, default, and literal-dollar environment behavior.',
        'The .env file is automatically injected into every container as runtime environment.'
      ),
      skill(
        'docker-compose-secrets-configs',
        'Grant only named services access to declared secrets and configs and verify file path, permissions, rotation, and local Compose limitations.',
        'Compose secrets are encrypted at rest and dynamically rotated in every implementation.'
      ),
      skill(
        'docker-secret-leak-surfaces',
        'Audit source, context, layers, history, cache, provenance, logs, inspect output, environment, crash reports, and registries for secret exposure.',
        'Deleting a secret in a later image layer removes it from earlier layer content.'
      ),
      skill(
        'docker-credential-helper-rotation',
        'Use scoped tokens, credential stores or helpers, non-interactive CI login, logout, revocation, and rotation without command-line leakage.',
        'docker login credentials are always stored encrypted and cannot leak through process or CI output.',
        'professional',
        'apply'
      ),
    ]
  ),
  dockerModule(
    'docker-observability-debugging',
    'Logs, Events, Metrics, Inspect, Debugging, and Incident Evidence',
    'A service restarts intermittently with no useful application error while disk, memory, network, and health evidence disagree.',
    'layered Docker incident evidence packet',
    [
      skill(
        'docker-logs-drivers-rotation',
        'Design stdout and stderr logging plus driver, delivery, rotation, retention, metadata, backpressure, and secret-redaction policy.',
        'docker logs always reads every application log regardless of the configured logging driver.'
      ),
      skill(
        'docker-events-inspect-state',
        'Correlate time-bounded events with inspect state, exit cause, OOM, restart count, health output, mounts, networks, and effective configuration.',
        'The latest container log line is sufficient to identify every Docker lifecycle cause.'
      ),
      skill(
        'docker-stats-cgroups-disk',
        'Interpret CPU, memory, network, block I/O, PIDs, cgroups, writable-layer size, image store, volume, and host pressure evidence.',
        'A low docker stats percentage proves the host and application have no resource bottleneck.'
      ),
      skill(
        'docker-exec-debug-toolbox',
        'Choose inspect-first evidence, exec, cp, export, temporary toolboxes, debug images, namespace entry, and reproduction without mutating the production image blindly.',
        'Installing tools into a live container is the safest durable way to debug and repair it.'
      ),
      skill(
        'docker-layered-incident-method',
        'Isolate client, daemon, build, image, process, storage, network, health, application, and host causes with competing hypotheses and a recovery record.',
        'Recreating the container first is efficient because it preserves all causal evidence.',
        'metacognitive',
        'evaluate'
      ),
    ]
  ),
  dockerModule(
    'docker-testing-validation-quality',
    'Dockerfile and Compose Validation, Image Tests, Fault Injection, and Quality Gates',
    'A release builds successfully but fails at runtime on a clean host, ships a root default, and loses data when its dependency stalls.',
    'container release test and fault matrix',
    [
      skill(
        'docker-build-checks-lint',
        'Run Dockerfile syntax and build checks, policy lint, warnings-as-errors, and negative fixtures without treating style as behavior proof.',
        'A successful docker build proves Dockerfile quality and production behavior.'
      ),
      skill(
        'docker-compose-model-validation',
        'Validate canonical Compose configuration, profiles, variables, images, networks, dependency conditions, implementation support, and changed overrides.',
        'docker compose config validates that every referenced image can run and every healthcheck will pass.'
      ),
      skill(
        'docker-image-contract-tests',
        'Test default user, entrypoint, arguments, files, permissions, labels, health, ports, signals, filesystem mutability, and exit behavior from the built image.',
        'Application unit tests make image contract tests redundant.'
      ),
      skill(
        'docker-compose-integration-faults',
        'Inject slow start, crash, dependency refusal, DNS failure, read-only storage, full disk, termination, and resource limits into an isolated Compose project.',
        'Starting all services once is adequate multi-container integration evidence.'
      ),
      skill(
        'docker-clean-host-transfer',
        'Verify pull-by-digest, clean-cache build, clean-host startup, state recovery, architecture, shutdown, security, and rollback outside the developer machine.',
        'A local cached success proves another host can pull and reproduce the release.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  dockerModule(
    'docker-performance-reproducibility',
    'Image Size, Build Performance, Runtime Efficiency, and Reproducibility',
    'Build time and image size doubled after dependency changes, while production startup and memory regress despite a warm local cache.',
    'measured build and runtime optimization experiment',
    [
      skill(
        'docker-image-size-layer-analysis',
        'Measure compressed, unpacked, shared, unique, and writable size and trace which layer, package, or artifact owns the change.',
        'The docker images SIZE column is the exact additional disk and network cost for every host.'
      ),
      skill(
        'docker-cache-performance-experiment',
        'Measure cold, warm, changed-source, changed-lockfile, and remote-cache builds with plain progress and controlled inputs.',
        'Reordering Dockerfile lines for more cache hits cannot alter correctness or trust.'
      ),
      skill(
        'docker-base-runtime-minimization',
        'Compare trusted base, distroless or scratch, packages, debugging needs, certificates, locales, dynamic libraries, and patch workflow.',
        'The smallest byte count is always the most secure and operable production image.'
      ),
      skill(
        'docker-runtime-resource-profile',
        'Benchmark startup, steady CPU, memory, I/O, network, process count, and shutdown under representative limits and changed load.',
        'Container overhead is always negligible and needs no measurement.'
      ),
      skill(
        'docker-reproducible-build-evidence',
        'Control immutable inputs, time, order, package resolution, frontend and BuildKit compatibility, platform, metadata, and comparison while documenting unavoidable variance.',
        'Pinning the base image digest alone guarantees a reproducible image digest.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  dockerModule(
    'docker-multiplatform-buildx-bake',
    'Buildx Builders, Multi-Platform Images, Bake, and OCI Outputs',
    'A CLI release must support linux/amd64 and linux/arm64 without silently shipping an emulated, untested, or single-platform image.',
    'multi-platform build matrix and manifest evidence',
    [
      skill(
        'docker-buildx-builders-drivers',
        'Create, select, inspect, bootstrap, stop, and remove scoped builders and compare docker, docker-container, remote, Kubernetes, and cloud driver capabilities.',
        'Every Buildx builder shares the daemon image store, cache, platforms, and outputs.'
      ),
      skill(
        'docker-platform-index-selection',
        'Relate OS, architecture, variant, image manifest, index, local store, registry, pull selection, and runtime compatibility.',
        'A multi-platform tag points directly to one universal root filesystem.'
      ),
      skill(
        'docker-qemu-native-crosscompile',
        'Choose emulation, multiple native nodes, or language cross-compilation and verify build and target platform separately.',
        'A QEMU build result proves native runtime performance and compatibility.'
      ),
      skill(
        'docker-build-platform-arguments',
        'Use BUILDPLATFORM, TARGETPLATFORM, TARGETOS, TARGETARCH, and stage pinning without accidentally executing target binaries on the builder.',
        'Predefined platform arguments are automatically inherited inside every stage.'
      ),
      skill(
        'docker-bake-matrix-outputs',
        'Define inherited Bake targets, variables, matrices, groups, contexts, cache, attestations, outputs, and policy while preventing accidental pushes.',
        'docker buildx bake always builds one target and loads it into the local image store.',
        'procedural',
        'apply'
      ),
    ]
  ),
  dockerModule(
    'docker-supply-chain-registry-release',
    'Registry Publication, SBOM, Provenance, Vulnerabilities, Policies, and CI Release',
    'A regulated service needs evidence for what an image contains, how it was built, which base it used, who approved it, and how rollback selects immutable content.',
    'signed and policy-gated image release packet',
    [
      skill(
        'docker-registry-auth-push-pull',
        'Publish least-privilege authenticated content, verify digest after push, handle immutable tags, retention, mirrors, rate limits, and failure without credential leakage.',
        'A successful push proves every expected platform and attestation is present and trusted.'
      ),
      skill(
        'docker-sbom-attestation',
        'Generate, attach, inspect, export, validate, and interpret SPDX SBOM attestations including build-stage and final-image coverage.',
        'An SBOM proves every component is safe, licensed, used, and free of vulnerabilities.'
      ),
      skill(
        'docker-provenance-attestation',
        'Produce minimal or maximal SLSA provenance, locate materials and parameters, protect secret values, and verify the statement against source and builder policy.',
        'Provenance automatically proves source review, reproducibility, and builder trust.'
      ),
      skill(
        'docker-vulnerability-vex-policy',
        'Evaluate package and base vulnerabilities, exploitability evidence, VEX, exceptions, remediation, rescans, approved inputs, and non-root policy.',
        'Every high-severity CVE makes every image equally exploitable and requires the same response.'
      ),
      skill(
        'docker-ci-release-rollback',
        'Gate tests, builds, policies, multi-platform manifests, signatures, attestations, promotion, deployment digest, rollback, and post-release verification in CI.',
        'Retagging latest is sufficient promotion and rollback evidence for a production release.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  dockerModule(
    'docker-production-operations-defense',
    'Daemon Operations, Upgrades, Recovery, Cleanup, Orchestration Boundary, and Capstone Defense',
    'An operations board must approve a production container system through daemon upgrade, disk pressure, backup recovery, credential rotation, and migration pressure.',
    'production Docker operations and release defense',
    [
      skill(
        'docker-daemon-config-live-restore',
        'Validate daemon configuration, data root, logging, DNS, proxies, registries, authorization, metrics, reload boundaries, live restore, and rollback.',
        'Editing daemon.json changes every running container immediately and safely.'
      ),
      skill(
        'docker-upgrade-deprecation-compatibility',
        'Plan Engine, API, containerd, runtime, BuildKit, Buildx, Compose, plugin, storage, and deprecated-feature compatibility across staged upgrade and rollback.',
        'The newest Docker CLI guarantees compatibility with every older daemon and Compose model.'
      ),
      skill(
        'docker-disk-prune-recovery',
        'Attribute disk use to images, build cache, writable layers, logs, volumes, and snapshots; preserve owners and backups before scoped cleanup.',
        'Unused according to a prune command means unneeded by every application and recovery plan.'
      ),
      skill(
        'docker-compose-orchestration-boundary',
        'State when Compose is sufficient and when scheduling, replicas, rolling updates, secrets, policy, load balancing, self-healing, or multi-host needs another platform.',
        'A production Compose file automatically provides the same scheduling and availability model as Kubernetes.'
      ),
      skill(
        'docker-capstone-production-defense',
        'Defend architecture, image identity, build, runtime, storage, network, Compose, security, tests, observability, supply chain, recovery, accessibility, and rollback as one release.',
        'Passing isolated technical checks removes the need for an end-to-end production defense.',
        'metacognitive',
        'evaluate'
      ),
    ]
  ),
];

export const dockerBasicsConfig = finalizeCourse(
  {
    id: 'docker-basics',
    title: 'Modern Docker 29: Containers, Compose, BuildKit, and Secure Delivery',
    version: '2026.07',
    audience: {
      description:
        'Developers and operators who can use Linux and need to build, test, secure, debug, publish, and defend production-shaped container applications.',
      entryKnowledge: [
        'Demonstrate Linux Foundations outcomes or equivalent file, process, permission, service, network, shell, package, and troubleshooting skill.',
        'Read basic YAML and application configuration and distinguish a host, process, filesystem, IP address, port, and network service.',
      ],
      deviceConstraints: [
        'Browser labs analyze Dockerfile, Compose, command, image, network, storage, security, and release evidence deterministically; learner input never reaches the host Docker socket or command execution.',
        'Full transfer work requires a disposable Docker Engine or Docker Desktop environment with enough disk, memory, and authorization for the named exercise.',
      ],
      accessibilityAssumptions: [
        'Every layer graph, topology, lifecycle, terminal trace, Dockerfile, Compose model, table, metric, and policy result requires structured text, keyboard operation, announced status, and non-color-only meaning.',
      ],
    },
    scope: {
      includes: [
        'Docker Engine 29.6.1 architecture and lifecycle, OCI image/runtime/distribution boundaries, images, containers, registries, storage, networking, security, diagnostics, resource constraints, and daemon operations',
        'Dockerfile 1.25, BuildKit 0.31.1, Buildx 0.35.0, build contexts, multi-stage and multi-platform builds, cache, secrets, Bake, attestations, reproducibility, policies, and release evidence',
        'Compose Specification with Compose 5.3.1 services, dependencies, health, networks, volumes, configs, secrets, profiles, Watch, overrides, tests, faults, and production-boundary decisions',
      ],
      excludes: [
        'Treating browser simulations as proof of host kernel isolation, live Docker daemon behavior, network firewall behavior, registry trust, production load, or restore success',
        'Exhaustive Kubernetes, Swarm, Windows-container internals, registry administration, kernel exploit development, or vendor-specific cloud orchestration',
      ],
      nextCourses: ['kubernetes-basics', 'cicd-github-actions', 'build-blog-aggregator-go'],
    },
    sources: [
      {
        title: 'ACM/IEEE-CS/AAAI Computer Science Curricula 2023',
        authority: 'curriculum-framework',
        url: 'https://csed.acm.org/final-report/',
        version: 'CS2023 final report, 2024 publication files',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls institutional systems, operating-system, networking, security, software engineering, testing, professional practice, and distributed-system breadth.',
      },
      {
        title: 'Docker Engine 29 Architecture and 29.6.1 Release',
        authority: 'official-docs',
        url: 'https://github.com/moby/moby/releases/tag/v29.6.1',
        version: 'Docker Engine 29.6.1, 2026-06-26',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls current Engine, API, containerd, runtime, security update, deprecation, installation, architecture, and compatibility evidence.',
      },
      {
        title: 'OCI Image, Runtime, and Distribution Specifications',
        authority: 'standard',
        url: 'https://specs.opencontainers.org/',
        version: 'Current OCI specifications reviewed 2026-07-14',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls portable image layout, descriptors, manifests, indexes, configuration, runtime bundle, process, lifecycle, and registry-distribution contracts.',
      },
      {
        title: 'Dockerfile Reference and Building Best Practices',
        authority: 'official-docs',
        url: 'https://docs.docker.com/reference/dockerfile/',
        version: 'Dockerfile frontend 1.25; current 2026-07-14',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls parser directives, instructions, context, shell and exec forms, users, healthchecks, mounts, multi-stage builds, and Dockerfile behavior.',
      },
      {
        title: 'BuildKit 0.31.1 and Buildx 0.35 Documentation',
        authority: 'official-docs',
        url: 'https://docs.docker.com/build/buildkit/',
        version: 'BuildKit 0.31.1 and Buildx 0.35.0, current 2026-07-14',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls LLB, builders, drivers, caches, mounts, secrets, outputs, multi-platform builds, Bake, policies, resource limits, and compatibility versions.',
      },
      {
        title: 'Docker Storage and Containerd Image Store Documentation',
        authority: 'official-docs',
        url: 'https://docs.docker.com/engine/storage/',
        version: 'Docker Engine 29 storage guidance, current 2026-07-14',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls layers, writable storage, volumes, bind mounts, tmpfs, snapshotters, storage drivers, ownership, backup, restore, and cleanup.',
      },
      {
        title: 'Docker Networking and Port Publishing Documentation',
        authority: 'official-docs',
        url: 'https://docs.docker.com/engine/network/',
        version: 'Docker Engine 29 networking guidance, current 2026-07-14',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls bridge networks, DNS, aliases, routes, NAT, gateway modes, IPv6, port publishing, packet filtering, segmentation, and platform differences.',
      },
      {
        title: 'Compose Specification and Docker Compose 5.3.1',
        authority: 'standard',
        url: 'https://docs.docker.com/reference/compose-file/',
        version: 'Compose Specification with Docker Compose 5.3.1, 2026-07-07',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls services, projects, interpolation, merges, builds, dependencies, health, networks, volumes, configs, secrets, profiles, development, and lifecycle.',
      },
      {
        title: 'Docker Engine Container Runtime and Resource Documentation',
        authority: 'official-docs',
        url: 'https://docs.docker.com/engine/containers/resource_constraints/',
        version: 'Docker Engine 29 container guidance, current 2026-07-14',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls process lifecycle, PID 1, signals, restart policies, health, CPU, memory, PID, device, logging, events, metrics, and diagnostic evidence.',
      },
      {
        title: 'Docker Engine Security, Rootless, Seccomp, and API Protection',
        authority: 'official-docs',
        url: 'https://docs.docker.com/engine/security/',
        version: 'Docker Engine 29 security guidance, current 2026-07-14',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls daemon authority, rootless and user namespaces, users, capabilities, seccomp, mandatory access control, secrets, privileged boundaries, and socket protection.',
      },
      {
        title: 'Docker Build Attestations, SBOM, Provenance, and Policy',
        authority: 'official-docs',
        url: 'https://docs.docker.com/build/metadata/attestations/',
        version: 'BuildKit 0.31 and Docker Scout policy guidance, current 2026-07-14',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls SPDX SBOM and SLSA provenance creation, OCI attachment, inspection, vulnerability and VEX evidence, approved inputs, signatures, and policy gates.',
      },
    ],
    modules,
    projects: [
      project(
        'docker-accessible-status-app',
        'Accessible Status Application Image',
        'dockerfile-build-context-instructions',
        'A municipal service-status team',
        'The team needs a small accessible status application packaged with an immutable base, minimal context, predictable process contract, non-root runtime, and changed-argument tests.',
        [
          'docker-tag-digest-reference',
          'docker-build-context-dockerignore',
          'dockerfile-run-shell-exec',
          'dockerfile-cmd-entrypoint-contract',
        ]
      ),
      project(
        'docker-stateful-intake-stack',
        'Recoverable Intake Service Stack',
        'docker-compose-model-lifecycle',
        'A nonprofit intake operations team',
        'The team needs web, worker, and database services with least-exposure networks, durable volumes, dependency health, a verified backup, and teardown that preserves required data.',
        [
          'docker-storage-backup-restore-test',
          'docker-internal-multinetwork-segmentation',
          'docker-compose-dependency-readiness',
          'docker-compose-up-down-state',
        ]
      ),
      project(
        'docker-hostile-document-sandbox',
        'Least-Privilege Document Processing Boundary',
        'docker-security-least-privilege',
        'A legal-aid document processing team',
        'The team needs to process hostile files with non-root identity, read-only runtime, dropped capabilities, bounded resources, isolated mounts and network, and explicit remaining sandbox limitations.',
        [
          'docker-threat-boundary-host-kernel',
          'docker-capabilities-privileged-devices',
          'docker-seccomp-apparmor-selinux-no-new',
          'docker-rootless-userns-daemon-socket',
        ]
      ),
      project(
        'docker-fault-tested-release-candidate',
        'Fault-Tested Multi-Service Release Candidate',
        'docker-testing-validation-quality',
        'A platform reliability group',
        'The group needs a release candidate proven under slow dependencies, termination, read-only storage, resource pressure, clean-host startup, logs, health, and recoverable failure.',
        [
          'docker-layered-incident-method',
          'docker-image-contract-tests',
          'docker-compose-integration-faults',
          'docker-clean-host-transfer',
        ]
      ),
      project(
        'docker-production-release-defense',
        'Secure Multi-Platform Production Release Defense',
        'docker-production-operations-defense',
        'An engineering and security review board',
        'The board needs a two-platform image release with immutable identity, tested Compose operation, least privilege, SBOM, provenance, vulnerability policy, recovery rehearsal, upgrade plan, and rollback defense.',
        [
          'docker-reproducible-build-evidence',
          'docker-platform-index-selection',
          'docker-sbom-attestation',
          'docker-capstone-production-defense',
        ]
      ),
    ],
    examContext:
      'Unfamiliar Docker architecture, CLI lifecycle, image, Dockerfile, BuildKit, process, storage, network, Compose, security, secret, diagnostic, test, performance, multi-platform, supply-chain, upgrade, recovery, and production-boundary cases requiring deterministic evidence plus live-environment transfer limits.',
    minimumQuestionBankSize: 540,
  },
  { researchedAt: RESEARCHED_AT, prerequisiteCourseIds: ['linux-basics'] }
);

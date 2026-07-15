const REVIEWED_AT = '2026-07-14';
const RESEARCHED_AT = '2026-07-14T07:00:00Z';

const s = (id, statement, misconception, knowledgeType = 'procedural', level = 'apply') => [
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
      'All operations run in the disposable simulator and include before/after evidence.',
      'Dangerous or irreversible operations require a preview, bounded target, and recovery path.',
      'The final artifact must work from keyboard, narrow screens, and selectable text output.',
    ],
    competencyIds,
    rubricDimensions: [
      'Mental-model and command correctness',
      'Safe changed-case execution and recovery evidence',
      'Readable runbook quality and transfer reasoning',
    ],
  };
}

const linuxModules = [
  module(
    'linux-terminal-evidence',
    'Terminal Mental Models, Help, and Evidence',
    'Investigate an unfamiliar Linux workstation without guessing, changing host state, or treating copied commands as explanations.',
    'a terminal orientation and command-evidence notebook',
    [
      s(
        'linux-shell-terminal-kernel',
        'Distinguish terminal, shell, command, process, kernel, and operating-system responsibilities in an observed interaction.',
        'The terminal window is the Linux shell and executes commands itself.',
        'conceptual',
        'analyze'
      ),
      s(
        'linux-command-shape',
        'Parse command names, options, operands, quoting, and exit status before predicting behavior.',
        'Every token beginning with a hyphen is harmless formatting.'
      ),
      s(
        'linux-help-authority',
        'Use man pages, help, type, command -V, info, and project documentation to establish command authority and provenance.',
        'A search-result snippet is more authoritative than the installed manual.',
        'strategic',
        'evaluate'
      ),
      s(
        'linux-observation-before-change',
        'Capture current user, directory, platform, environment, and relevant state before making a bounded change.',
        'If a command is familiar, a baseline observation is unnecessary.'
      ),
      s(
        'linux-terminal-evidence-record',
        'Record command, expected signal, actual output, exit status, interpretation, and next decision as separate evidence.',
        'A screenshot of output proves the conclusion without context.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  module(
    'linux-paths-hierarchy',
    'Paths, Navigation, and Filesystem Hierarchy',
    'Locate application configuration and logs on a workstation whose current directory and distribution conventions differ from a familiar machine.',
    'a path-resolution and filesystem-map notebook',
    [
      s(
        'linux-absolute-relative-paths',
        'Resolve absolute, relative, home-relative, dot, and parent paths from a stated working directory.',
        'A path without a leading slash always starts from the home directory.'
      ),
      s(
        'linux-working-directory',
        'Use pwd, cd, and directory stacks while predicting the resulting working directory before each transition.',
        'The shell remembers file locations independently of its current directory.'
      ),
      s(
        'linux-hierarchy-purpose',
        'Relate root-level directories to boot, configuration, devices, variable data, user data, runtime state, and optional software roles.',
        'Every Linux distribution stores every application file in the same path.',
        'conceptual',
        'analyze'
      ),
      s(
        'linux-path-expansion',
        'Distinguish tilde, parameter, command, arithmetic, pathname, and quote-removal expansion before command execution.',
        'The shell passes wildcard characters unchanged to every program.',
        'conceptual',
        'analyze'
      ),
      s(
        'linux-path-portability',
        'Choose paths from documented interfaces and discovered configuration rather than hard-coded workstation assumptions.',
        'A path that exists on one distribution is a portable Linux interface.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  module(
    'linux-files-links-metadata',
    'Files, Directories, Links, and Metadata',
    'Prepare a service workspace while preserving names, metadata, link intent, and the ability to reverse every operation.',
    'a reversible filesystem-change plan and evidence tree',
    [
      s(
        'linux-file-types',
        'Identify regular files, directories, symbolic links, devices, sockets, and pipes from metadata rather than filename appearance.',
        'A filename extension determines the Linux file type.'
      ),
      s(
        'linux-create-copy-move-remove',
        'Use mkdir, touch, cp, mv, and rm with explicit targets, collision checks, and recovery-aware previews.',
        'rm moves files to a universal Linux recycle bin.'
      ),
      s(
        'linux-hard-symbolic-links',
        'Predict inode, path, deletion, filesystem, and permission behavior for hard and symbolic links.',
        'Hard links and symbolic links are interchangeable shortcuts.',
        'conceptual',
        'analyze'
      ),
      s(
        'linux-stat-metadata-time',
        'Interpret size, allocation, ownership, mode, inode, timestamps, and link count with stat and ls evidence.',
        'The modification timestamp records every metadata change.'
      ),
      s(
        'linux-safe-globbing',
        'Preview wildcard expansion and protect leading-hyphen, whitespace, newline, empty-match, and hidden-name cases.',
        'Quoting a wildcard still expands it safely.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  module(
    'linux-streams-quoting-pipelines',
    'Streams, Redirection, Quoting, and Pipelines',
    'Build a repeatable incident-report pipeline whose data and diagnostics remain distinct and whose failures cannot be hidden by downstream success.',
    'a stream-routing and pipeline-trace workbook',
    [
      s(
        'linux-stdin-stdout-stderr',
        'Trace standard input, standard output, standard error, file descriptors, and terminal attachment across a command.',
        'All command output travels through one stream.'
      ),
      s(
        'linux-redirection-order',
        'Predict truncating, appending, input, descriptor duplication, and combined redirection from left-to-right order.',
        '2>&1 >file and >file 2>&1 produce identical routing.',
        'conceptual',
        'analyze'
      ),
      s(
        'linux-quote-rules',
        'Apply unquoted, single-quoted, double-quoted, escaped, and ANSI-C quoted contexts to preserve intended arguments.',
        'Double quotes disable every shell expansion.'
      ),
      s(
        'linux-pipeline-status',
        'Build pipelines while accounting for per-stage exit status, pipefail, buffering, and stderr routing.',
        'A pipeline succeeds only when every stage succeeds by default.'
      ),
      s(
        'linux-command-substitution',
        'Use command substitution and grouping without losing newlines, status, scope, or observable failure evidence.',
        'Command substitution preserves trailing newlines and exit context automatically.'
      ),
    ]
  ),
  module(
    'linux-text-search-transforms',
    'Text Inspection, Search, and Structured Transformation',
    'Extract a defensible incident summary from mixed logs without silently corrupting delimiters, encodings, ordering, or duplicate policy.',
    'a tested text-processing pipeline with fixtures',
    [
      s(
        'linux-text-inspection',
        'Select cat, less, head, tail, wc, file, and od from file size, format, encoding, and inspection goal.',
        'cat is the safest viewer for every binary or unbounded file.'
      ),
      s(
        'linux-grep-regex',
        'Use fixed strings, basic or extended regular expressions, anchors, classes, context, and exit status with explicit locale assumptions.',
        'Regular expressions and shell globs use the same syntax.'
      ),
      s(
        'linux-find-selection-action',
        'Separate find traversal, predicates, grouping, pruning, printing, and actions while protecting path boundaries.',
        'find options are evaluated only after all paths are collected.'
      ),
      s(
        'linux-sort-uniq-locale',
        'Apply sort keys, numeric/version ordering, stable behavior, locale, and adjacent duplicate rules before using uniq.',
        'uniq removes duplicates anywhere in unsorted input.'
      ),
      s(
        'linux-field-transform-tools',
        'Choose cut, paste, tr, sed, awk, or a structured parser based on delimiter, record, escaping, and mutation requirements.',
        'Whitespace-delimited text can always be parsed safely with cut.'
      ),
    ]
  ),
  module(
    'linux-permissions-identity',
    'Identity, Permissions, Ownership, umask, and ACLs',
    'Create a shared operations directory that grants required access without world-writable shortcuts or unexplained privilege escalation.',
    'a least-privilege access matrix and permission lab',
    [
      s(
        'linux-user-group-identity',
        'Interpret real and effective user, primary and supplementary groups, and process credentials from id and process evidence.',
        'A username alone determines every permission decision.'
      ),
      s(
        'linux-mode-bits',
        'Calculate read, write, and execute effects for owner, group, and other on regular files and directories.',
        'Directory read permission allows creating and deleting entries.'
      ),
      s(
        'linux-symbolic-octal-modes',
        'Translate symbolic and octal chmod operations while preserving unrelated bits and verifying the result.',
        'chmod 777 is an acceptable general fix for access errors.'
      ),
      s(
        'linux-umask-defaults',
        'Derive default file and directory modes from requested modes and umask without treating umask as subtraction.',
        'A umask of 022 removes decimal twenty-two from a mode.'
      ),
      s(
        'linux-special-bits-acls',
        'Use setgid directories, sticky bit, setuid risk, and POSIX ACL masks only when the base ownership model is insufficient.',
        'An ACL entry always grants its listed permissions regardless of the ACL mask.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  module(
    'linux-processes-signals-jobs',
    'Processes, Signals, Jobs, and Resource Control',
    'Diagnose a worker that appears hung while preserving evidence, avoiding collateral termination, and distinguishing shell jobs from system processes.',
    'a process-tree incident and controlled-recovery runbook',
    [
      s(
        'linux-process-model',
        'Relate executable files, processes, threads, parentage, sessions, process groups, state, and open resources.',
        'A program file and a running process are the same object.',
        'conceptual',
        'analyze'
      ),
      s(
        'linux-process-observation',
        'Use ps, pgrep, pidof, top-like evidence, and proc data with filters that identify the intended process uniquely.',
        'A process name is always a stable unique identifier.'
      ),
      s(
        'linux-signals-escalation',
        'Send signals from least disruptive to forceful while accounting for handlers, permissions, descendants, and cleanup.',
        'SIGKILL gives a process time to save state.'
      ),
      s(
        'linux-shell-job-control',
        'Use foreground, background, jobs, fg, bg, wait, disown, and nohup with terminal and session behavior in mind.',
        'Appending an ampersand makes a process survive logout reliably.'
      ),
      s(
        'linux-priority-limits',
        'Interpret nice values, scheduling priority, resource limits, and pressure evidence without equating priority with guaranteed resources.',
        'A negative nice value means a process uses fewer resources.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  module(
    'linux-environment-startup',
    'Environment, Shell State, Startup Files, and Sessions',
    'Repair a command that works interactively but fails in automation by tracing environment and startup differences instead of adding global hacks.',
    'an environment-diff and startup-resolution notebook',
    [
      s(
        'linux-shell-variables-environment',
        'Distinguish shell variables, exported environment entries, positional parameters, and child-process inheritance.',
        'Assigning a shell variable automatically exports it to children.'
      ),
      s(
        'linux-path-command-resolution',
        'Trace aliases, functions, builtins, hashed commands, PATH search, and explicit paths with type and command evidence.',
        'which always reports the command the shell will execute.'
      ),
      s(
        'linux-startup-file-order',
        'Identify login, interactive, non-interactive, and remote shell startup paths before editing configuration.',
        'Every Bash invocation reads .bashrc and .profile in the same order.'
      ),
      s(
        'linux-locale-timezone',
        'Control locale, character encoding, collation, numeric formatting, and timezone when reproducibility depends on them.',
        'Locale changes only translated messages.'
      ),
      s(
        'linux-secret-environment-risk',
        'Avoid exposing secrets through environment, history, process arguments, logs, or world-readable startup files.',
        'Environment variables are a secret vault because child processes inherit them.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  module(
    'linux-packages-provenance',
    'Packages, Repositories, Dependencies, and Software Provenance',
    'Install or update a required tool while preserving repository trust, version evidence, rollback options, and the boundary between system and project dependencies.',
    'a distribution-aware package change record',
    [
      s(
        'linux-package-manager-model',
        'Distinguish repositories, metadata, packages, dependencies, installed files, scripts, and transaction history.',
        'A package manager merely downloads one executable file.',
        'conceptual',
        'analyze'
      ),
      s(
        'linux-package-query',
        'Query package origin, version, architecture, files, dependencies, reverse dependencies, and candidate changes before mutation.',
        'The command name uniquely identifies the package that installed it.'
      ),
      s(
        'linux-repository-trust',
        'Evaluate repository ownership, signing keys, transport, scope, pinning, and update policy before adding a source.',
        'HTTPS alone proves a package repository is trustworthy.',
        'strategic',
        'evaluate'
      ),
      s(
        'linux-system-project-dependencies',
        'Separate distribution packages, language/project environments, containers, and manually installed binaries by ownership and update path.',
        'Installing every dependency system-wide makes projects more reproducible.'
      ),
      s(
        'linux-package-rollback',
        'Plan configuration preservation, cache use, downgrade constraints, service impact, and verification for package rollback.',
        'Uninstalling a package always restores the machine to its previous state.'
      ),
    ]
  ),
  module(
    'linux-storage-archives-backups',
    'Storage, Filesystems, Archives, and Backups',
    'Respond to low disk space and protect service data without confusing filesystems, mounts, archives, snapshots, and verified backups.',
    'a storage map and restore-tested backup plan',
    [
      s(
        'linux-block-filesystem-mount',
        'Relate block devices, partitions, filesystems, mount points, namespaces, and directory visibility.',
        'A mounted device becomes a new drive letter independent of the directory tree.',
        'conceptual',
        'analyze'
      ),
      s(
        'linux-capacity-inodes-usage',
        'Distinguish apparent size, allocated blocks, free space, inodes, deleted-open files, and per-directory usage.',
        'A filesystem with free bytes cannot be full.'
      ),
      s(
        'linux-mount-observation-safety',
        'Use lsblk, findmnt, mount, and filesystem identifiers to observe topology before any mount or format action.',
        'Device names such as /dev/sdb are permanent identities.',
        'strategic',
        'evaluate'
      ),
      s(
        'linux-archive-compression',
        'Create, inspect, extract, and verify archives while protecting path traversal, ownership, permissions, and compression expectations.',
        'An archive and a compressed file provide the same structure and guarantees.'
      ),
      s(
        'linux-backup-restore-proof',
        'Define backup scope, consistency, retention, integrity, isolation, and restore testing as separate controls.',
        'A successful backup command proves the data can be restored.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  module(
    'linux-services-logs',
    'Services, Units, Boot State, and Logs',
    'Diagnose a service that is enabled but unavailable by separating desired boot state, current process state, dependencies, configuration, and logs.',
    'a service lifecycle and journal evidence packet',
    [
      s(
        'linux-service-unit-model',
        'Relate service managers, units, dependencies, targets, process supervision, and application readiness.',
        'An enabled service is necessarily running and healthy now.',
        'conceptual',
        'analyze'
      ),
      s(
        'linux-systemctl-observation',
        'Use status, is-active, is-enabled, show, list-dependencies, and failed-unit evidence before changing service state.',
        'Restarting is the first diagnostic step for every service issue.'
      ),
      s(
        'linux-journal-query',
        'Query journal fields, units, boots, priorities, time ranges, cursors, and follow mode without losing causal context.',
        'journalctl always shows every application log regardless of configuration.'
      ),
      s(
        'linux-unit-configuration',
        'Inspect vendor units, drop-ins, environment sources, daemon reload requirements, and effective configuration.',
        'Editing a vendor unit in place is the safest persistent customization.'
      ),
      s(
        'linux-service-recovery',
        'Define restart limits, readiness checks, dependency order, failure escalation, and rollback evidence for a service change.',
        'Automatic infinite restart is a complete availability strategy.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  module(
    'linux-networking-remote',
    'Local Networking, Name Resolution, and Secure Remote Access',
    'Restore access to a host by testing local configuration, route, name resolution, listening sockets, and SSH trust in causal order.',
    'a layered connectivity and SSH trust runbook',
    [
      s(
        'linux-interface-route-socket',
        'Interpret interface addresses, routes, neighbors, and listening or established sockets as different network evidence.',
        'A configured IP address proves the application port is reachable.'
      ),
      s(
        'linux-name-resolution-path',
        'Trace hosts files, resolver configuration, search domains, DNS queries, caches, and application lookup results.',
        'Successful ping proves DNS and the application are both healthy.'
      ),
      s(
        'linux-connectivity-sequence',
        'Test local process, local socket, route, name resolution, transport, and application protocol with the smallest useful probe.',
        'Repeated broad scanning is more informative than layered tests.',
        'strategic',
        'evaluate'
      ),
      s(
        'linux-ssh-host-user-trust',
        'Separate server host identity, user authentication, authorization, agent forwarding, and known-host decisions.',
        'Accepting a changed SSH host key is safe when the username and password still work.'
      ),
      s(
        'linux-remote-copy-tunnel',
        'Use scp, sftp, rsync, and SSH forwarding with explicit direction, permissions, resume, exposure, and verification.',
        'SSH port forwarding exposes only harmless local traffic by definition.'
      ),
    ]
  ),
  module(
    'linux-bash-automation',
    'Reliable Bash Automation and Tests',
    'Turn a fragile command history into a bounded script that validates inputs, preserves data, reports failures, and can be rerun safely.',
    'a tested idempotent Bash operations script',
    [
      s(
        'linux-script-contract',
        'Define script inputs, outputs, side effects, preconditions, exit codes, and rerun behavior before implementation.',
        'A script is correct if it succeeds once on the author’s machine.',
        'strategic',
        'evaluate'
      ),
      s(
        'linux-bash-strictness',
        'Use set options, traps, explicit conditionals, and status handling while understanding where errexit and pipefail do not behave intuitively.',
        'set -e converts any Bash script into fail-safe automation.'
      ),
      s(
        'linux-bash-parameters-arrays',
        'Handle positional parameters, defaults, validation, arrays, and quoted expansion without word splitting or glob injection.',
        'Using $@ without quotes preserves argument boundaries.'
      ),
      s(
        'linux-bash-temporary-cleanup',
        'Create temporary resources safely and guarantee cleanup across success, expected failure, signals, and partial work.',
        'A fixed /tmp filename is safe when a script runs quickly.'
      ),
      s(
        'linux-bash-test-evidence',
        'Test scripts with fixtures, changed inputs, failure injection, shell analysis, exit status, and idempotence checks.',
        'A syntax check exercises command behavior and cleanup.'
      ),
    ]
  ),
  module(
    'linux-operations-capstone',
    'Troubleshooting, Security, Recovery, and Operations Handoff',
    'Resolve a multi-layer workstation incident and hand off a safe, reproducible operating procedure to another technician.',
    'a complete Linux operations evidence portfolio',
    [
      s(
        'linux-hypothesis-ladder',
        'Form competing hypotheses, select discriminating observations, and update confidence without changing multiple layers at once.',
        'Trying plausible fixes quickly is equivalent to diagnosis.',
        'strategic',
        'evaluate'
      ),
      s(
        'linux-least-privilege-sudo',
        'Use privilege only for the smallest justified operation while preserving command provenance, environment boundaries, and audit evidence.',
        'Prefixing an entire workflow with sudo is safer than handling permissions deliberately.',
        'professional',
        'evaluate'
      ),
      s(
        'linux-change-preview-rollback',
        'Preview scope, snapshot relevant state, define stop conditions, and test rollback before risky filesystem, package, or service changes.',
        'A rollback plan can be invented after a failed change.'
      ),
      s(
        'linux-incident-timeline',
        'Build a timeline from clocks, journals, command history, process state, configuration changes, and observed symptoms.',
        'Log order always equals causal order across services and clocks.',
        'strategic',
        'evaluate'
      ),
      s(
        'linux-operations-handoff',
        'Write an accessible runbook with prerequisites, exact observations, safe actions, expected signals, exceptions, recovery, and ownership.',
        'A list of commands is a sufficient operations handoff.',
        'professional',
        'create'
      ),
    ]
  ),
];

const linuxProjects = [
  project(
    'linux-incident-pipeline',
    'Incident Evidence Pipeline',
    'linux-streams-quoting-pipelines',
    'A support lead needs a repeatable command notebook that separates report data from diagnostics',
    'Deliver a pipeline that preserves quoting, descriptor routing, stage failure, and changed-input evidence.',
    [
      'linux-command-shape',
      'linux-terminal-evidence-record',
      'linux-path-expansion',
      'linux-safe-globbing',
      'linux-stdin-stdout-stderr',
      'linux-redirection-order',
      'linux-quote-rules',
      'linux-pipeline-status',
    ]
  ),
  project(
    'linux-shared-service-workspace',
    'Least-Privilege Shared Service Workspace',
    'linux-processes-signals-jobs',
    'An operations team shares scripts and reports but must prevent accidental cross-team writes',
    'Create and defend ownership, mode, umask, group, process, signal, and recovery decisions.',
    [
      'linux-file-types',
      'linux-create-copy-move-remove',
      'linux-stat-metadata-time',
      'linux-user-group-identity',
      'linux-mode-bits',
      'linux-umask-defaults',
      'linux-special-bits-acls',
      'linux-process-model',
      'linux-signals-escalation',
    ]
  ),
  project(
    'linux-service-recovery',
    'Service and Backup Recovery Runbook',
    'linux-services-logs',
    'A small organization needs to recover a failed worker without losing its queued data',
    'Deliver storage, archive, restore, unit, log, readiness, and rollback evidence.',
    [
      'linux-package-query',
      'linux-package-rollback',
      'linux-capacity-inodes-usage',
      'linux-archive-compression',
      'linux-backup-restore-proof',
      'linux-service-unit-model',
      'linux-journal-query',
      'linux-unit-configuration',
      'linux-service-recovery',
    ]
  ),
  project(
    'linux-operations-portfolio',
    'Hardened Workstation Operations Portfolio',
    'linux-operations-capstone',
    'A new technician must independently operate and troubleshoot a Linux workstation',
    'Resolve a changed multi-layer incident and publish a least-privilege, recovery-tested handoff.',
    [
      'linux-connectivity-sequence',
      'linux-ssh-host-user-trust',
      'linux-script-contract',
      'linux-bash-strictness',
      'linux-bash-test-evidence',
      'linux-hypothesis-ladder',
      'linux-least-privilege-sudo',
      'linux-change-preview-rollback',
      'linux-incident-timeline',
      'linux-operations-handoff',
    ]
  ),
];

export const linuxBasicsConfig = {
  id: 'linux-basics',
  title: 'Linux Foundations: Evidence-Driven Operations',
  version: '2026.07',
  researchedAt: RESEARCHED_AT,
  masteryThresholdPercent: 85,
  minimumQuestionBankSize: 320,
  modules: linuxModules,
  projects: linuxProjects,
  finalExamCompetencyIds: linuxModules.flatMap((entry) => entry.skills.map((skill) => skill[0])),
  examContext:
    'Operate an unfamiliar simulated Linux host across filesystem, streams, identity, processes, packages, storage, services, networking, automation, security, and recovery without workshop prompts.',
  pathways: {
    prerequisiteCourseIds: [],
    placementEvidence: [
      'Navigate files and explain a simple command only if a changed terminal task independently verifies the skill.',
    ],
    completionEvidence: [
      'Defend four cumulative Linux operations projects against changed state and safety constraints.',
      'Pass the cumulative Linux performance exam at or above 85 percent.',
    ],
  },
  audience: {
    description:
      'First-time and early-career developers, technicians, and operators who need a rigorous Linux command-line and operations foundation.',
    entryKnowledge: [
      'Use a keyboard and browser, create files, and distinguish local work from an internet service.',
    ],
    deviceConstraints: [
      'Modern browser; every terminal command runs only in a deterministic disposable simulator.',
    ],
    accessibilityAssumptions: [
      'All terminal output is selectable text, keyboard reachable, zoomable, and never dependent on color alone.',
    ],
  },
  scope: {
    includes: [
      'POSIX and Bash command reasoning',
      'Filesystems, streams, text, identity, processes, packages, storage, services, networking, automation, security, and recovery',
      'Four cumulative operations projects',
    ],
    excludes: [
      'Kernel development and distribution packaging internals',
      'Production orchestration, taught in Docker and Kubernetes courses',
    ],
    nextCourses: ['git-basics', 'docker-basics', 'cicd-github-actions'],
  },
  sources: [
    {
      title: 'The Open Group Base Specifications Issue 8',
      authority: 'standard',
      url: 'https://pubs.opengroup.org/onlinepubs/9799919799/',
      version: 'POSIX.1-2024 Issue 8',
      reviewedAt: REVIEWED_AT,
      scope:
        'Controls portable shell, utility, process, file, environment, and system-interface semantics.',
    },
    {
      title: 'GNU Bash Reference Manual',
      authority: 'official-docs',
      url: 'https://www.gnu.org/software/bash/manual/bash.html',
      version: 'Bash 5.3',
      reviewedAt: REVIEWED_AT,
      scope:
        'Controls Bash parsing, expansion, quoting, redirection, pipelines, startup, job control, scripting, and error behavior.',
    },
    {
      title: 'GNU Coreutils Manual',
      authority: 'official-docs',
      url: 'https://www.gnu.org/software/coreutils/manual/coreutils.html',
      version: 'GNU Coreutils 9.11',
      reviewedAt: REVIEWED_AT,
      scope: 'Controls file, text, identity, process, filesystem, and common utility behavior.',
    },
    {
      title: 'systemd Manual Pages',
      authority: 'official-docs',
      url: 'https://www.freedesktop.org/software/systemd/man/latest/',
      version: 'systemd 261',
      reviewedAt: REVIEWED_AT,
      scope:
        'Controls unit, service, dependency, journal, boot, environment, and lifecycle behavior.',
    },
    {
      title: 'Linux Kernel Userspace API Guide',
      authority: 'official-docs',
      url: 'https://docs.kernel.org/userspace-api/',
      version: '2026-07',
      reviewedAt: REVIEWED_AT,
      scope:
        'Controls stable userspace interfaces and the boundary between command-line tools and kernel behavior.',
    },
  ],
};

const gitModules = [
  module(
    'git-model-setup',
    'Git Mental Model, Setup, Help, and Repository Safety',
    'Adopt an unfamiliar repository without overwriting identity, hooks, ignored files, or team policy.',
    'a repository orientation and configuration evidence notebook',
    [
      s(
        'git-snapshots-graph',
        'Explain Git history as content-addressed snapshots connected by parent links and named references.',
        'Git stores only line-by-line differences between every adjacent version.',
        'conceptual',
        'analyze'
      ),
      s(
        'git-repository-boundaries',
        'Distinguish working tree, Git directory, common directory, bare repository, linked worktree, and nested repository boundaries.',
        'Every .git path is necessarily a directory containing all repository data.',
        'conceptual',
        'analyze'
      ),
      s(
        'git-config-scope-origin',
        'Inspect system, global, local, worktree, command, and environment configuration with origin and scope evidence.',
        'The nearest config file always overrides every command-line setting.'
      ),
      s(
        'git-identity-editor-defaults',
        'Set and verify author identity, default branch, editor, pager, and line-ending policy without changing unrelated scopes.',
        'GitHub login identity automatically configures every local Git author.'
      ),
      s(
        'git-help-version-safety',
        'Use installed help, version evidence, dry runs, status, and backups before following repository-changing instructions.',
        'A command from a current web page behaves identically on every installed Git version.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  module(
    'git-working-index-commit',
    'Working Tree, Index, Commits, and Atomic History',
    'Turn a mixed set of feature, formatting, and accidental changes into reviewable commits without losing work.',
    'an atomic commit construction workbook',
    [
      s(
        'git-three-tree-model',
        'Trace HEAD, index, and working-tree versions of a path before using status, diff, add, restore, or commit.',
        'git add sends files directly from the working tree into permanent history.',
        'conceptual',
        'analyze'
      ),
      s(
        'git-status-evidence',
        'Read branch, staged, unstaged, untracked, rename, conflict, and ahead/behind status without treating short output as context-free.',
        'A clean working tree proves the local branch matches its remote.'
      ),
      s(
        'git-diff-scopes',
        'Select working-tree, staged, commit-to-commit, path-limited, word, and summary diffs from the review question.',
        'git diff always shows every change that the next commit will contain.'
      ),
      s(
        'git-selective-staging',
        'Stage whole files or selected hunks while verifying the exact index diff and preserving unrelated work.',
        'Interactive staging rewrites the working file to match selected hunks.'
      ),
      s(
        'git-atomic-commit-message',
        'Create a cohesive commit with an imperative summary, rationale, test evidence, and no accidental generated or secret data.',
        'A large commit is acceptable when its message lists every changed file.',
        'professional',
        'create'
      ),
    ]
  ),
  module(
    'git-history-objects',
    'History, Objects, References, and Forensic Inspection',
    'Explain when and why a behavior changed using graph, path, object, author, and content evidence.',
    'a history-forensics evidence packet',
    [
      s(
        'git-log-graph-format',
        'Query commit graph topology, decorations, authorship, dates, messages, and changed paths with an intentional log format.',
        'git log lists commits in a universal causal order.'
      ),
      s(
        'git-object-identity',
        'Relate blobs, trees, commits, tags, object IDs, content identity, and repository reachability.',
        'Renaming a file changes the stored blob bytes and therefore always creates a new blob.',
        'conceptual',
        'analyze'
      ),
      s(
        'git-show-cat-file',
        'Inspect commits, trees, blobs, tags, and object types without checking out or executing repository content.',
        'git show always displays a text patch regardless of object type.'
      ),
      s(
        'git-file-history-renames',
        'Investigate path history, content movement, follow heuristics, and limitations without assuming Git stores rename events.',
        'Git records rename operations as first-class history facts.'
      ),
      s(
        'git-blame-context',
        'Use blame as a line-origin clue and connect it to surrounding commits, review context, and later movement without assigning fault.',
        'The author shown by blame necessarily introduced the current bug.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  module(
    'git-branches-merges',
    'Branches, Integration, and Merge Evidence',
    'Integrate a short-lived change while preserving understandable topology and verifying both file content and combined behavior.',
    'a branch-and-merge topology lab',
    [
      s(
        'git-branch-reference',
        'Create, list, rename, copy, delete, and inspect branches as movable references with upstream metadata.',
        'A branch contains a private copy of every project file.',
        'conceptual',
        'analyze'
      ),
      s(
        'git-switch-worktree-state',
        'Switch branches only after predicting working-tree/index carryover, untracked collisions, and sparse or worktree constraints.',
        'Switching branches always discards uncommitted changes.'
      ),
      s(
        'git-merge-base',
        'Find merge bases and explain three-way integration from two tips and their best common ancestor.',
        'A merge compares only the two branch tips.',
        'conceptual',
        'analyze'
      ),
      s(
        'git-fast-forward-merge-commit',
        'Distinguish fast-forward, true merge, squash, and no-commit integration by topology and team intent.',
        'A squash merge is a merge commit with hidden parents.'
      ),
      s(
        'git-post-merge-verification',
        'Verify merged tree, combined tests, log topology, diff range, and push target before publishing integration.',
        'No conflict markers means the merged behavior is correct.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  module(
    'git-remotes-collaboration',
    'Remotes, Tracking, Fetch, Pull, and Push',
    'Synchronize with a shared repository while separating network transfer, local integration, authentication, and authorization decisions.',
    'a remote synchronization trace and collaboration runbook',
    [
      s(
        'git-remote-reference-model',
        'Distinguish remote names, URLs, remote-tracking references, local branches, upstreams, and push destinations.',
        'origin is a special central repository that Git discovers automatically.',
        'conceptual',
        'analyze'
      ),
      s(
        'git-fetch-observation',
        'Fetch explicit remotes and refspecs, inspect updates, and compare local work before integrating.',
        'git fetch modifies the current branch and working files.'
      ),
      s(
        'git-pull-decomposition',
        'Explain pull as fetch plus configured integration and select merge, rebase, or fast-forward-only deliberately.',
        'git pull has one universal safe integration behavior.'
      ),
      s(
        'git-push-refspec-safety',
        'Preview source and destination refs, upstream setup, force protections, tags, and deletion semantics before push.',
        'git push always publishes the currently checked-out branch to a branch with the same name.'
      ),
      s(
        'git-credential-transport',
        'Separate HTTPS or SSH transport, credentials, host trust, authorization, signing, and repository policy.',
        'A successful SSH connection proves permission to push every branch.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  module(
    'git-conflicts-resolution',
    'Conflict Diagnosis and Semantic Resolution',
    'Resolve an integration conflict by reconstructing both intents and verifying behavior rather than deleting markers until Git accepts the file.',
    'a conflict reproduction, resolution, and regression record',
    [
      s(
        'git-conflict-stages',
        'Inspect unmerged index stages, ours/theirs/base terminology, paths, and operation context before editing.',
        'Ours always means the feature branch and theirs always means main.'
      ),
      s(
        'git-conflict-marker-reading',
        'Read conflict markers and diff views while obtaining surrounding base and commit intent.',
        'Choosing both sides line-by-line necessarily preserves both behaviors.'
      ),
      s(
        'git-semantic-resolution',
        'Construct a new result from requirements, tests, and both histories rather than treating resolution as text selection.',
        'A syntactically marker-free file is a resolved conflict.',
        'strategic',
        'evaluate'
      ),
      s(
        'git-continue-abort',
        'Use continue, skip, quit, and abort controls for merge, rebase, and cherry-pick with operation-specific state awareness.',
        'git abort commands are interchangeable across every in-progress operation.'
      ),
      s(
        'git-rerere-regression',
        'Record or reuse conflict resolutions only after verifying context, tests, and changed-case behavior.',
        'rerere can safely accept every repeated textual resolution without review.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  module(
    'git-ignore-attributes-content',
    'Ignore Rules, Attributes, Line Endings, and Repository Content',
    'Keep generated output, local configuration, binaries, and secrets out of history while preserving cross-platform text behavior.',
    'a content-boundary and normalization policy',
    [
      s(
        'git-ignore-precedence',
        'Trace ignore sources, directory scope, pattern grammar, negation, tracked-state limits, and check-ignore evidence.',
        'Adding a tracked file to .gitignore removes it from history.'
      ),
      s(
        'git-global-local-ignore',
        'Choose repository ignore, info/exclude, and global excludes from whether a rule belongs to every collaborator or one environment.',
        'Personal editor files belong in the project .gitignore by default.'
      ),
      s(
        'git-attributes-effects',
        'Use attributes for text normalization, diff, merge, export, and binary behavior with check-attr evidence.',
        '.gitattributes is another spelling of .gitignore.'
      ),
      s(
        'git-line-ending-normalization',
        'Control repository and working-tree line endings while separating attributes from core.autocrlf and reviewing renormalization.',
        'Line-ending settings change only how diffs are displayed.'
      ),
      s(
        'git-secret-large-generated-data',
        'Prevent and respond to secrets, large binaries, generated artifacts, and sensitive history with policy and rotation boundaries.',
        'Deleting a secret in a later commit makes the exposed credential safe again.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  module(
    'git-tags-releases',
    'Tags, Versions, Releases, and Provenance',
    'Prepare a release candidate whose source identity, version, evidence, and published reference can be independently verified.',
    'a signed-off release evidence record',
    [
      s(
        'git-lightweight-annotated-tags',
        'Distinguish lightweight and annotated tag objects, messages, taggers, targets, and intended use.',
        'Every tag stores a message and tagger identity.'
      ),
      s(
        'git-tag-target-movement',
        'Create, inspect, verify, delete, and cautiously replace tags while recognizing immutable-release expectations.',
        'A tag automatically follows later commits on its branch.'
      ),
      s(
        'git-version-policy',
        'Apply an explicit version scheme and connect version changes to compatibility, release notes, and source identity.',
        'Semantic version numbers prove that compatibility was tested.'
      ),
      s(
        'git-release-reproducibility',
        'Record clean tree, exact commit, dependency state, build/test evidence, artifacts, and checksums for a release.',
        'A tag alone makes a build reproducible.'
      ),
      s(
        'git-signature-trust',
        'Distinguish commit or tag signature validity, signer identity, key trust, account verification, and policy compliance.',
        'A cryptographically valid signature proves the change is safe.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  module(
    'git-revisions-search',
    'Revision Selection, Ranges, Search, and Change Discovery',
    'Answer a focused history question without checking out candidate commits or mistaking range notation for set subtraction in every context.',
    'a revision-query and change-discovery workbook',
    [
      s(
        'git-revision-names',
        'Resolve full and abbreviated object IDs, refs, reflog selectors, ancestry suffixes, and peel operators with ambiguity checks.',
        'HEAD~2 and HEAD^2 always select the same commit.'
      ),
      s(
        'git-revision-ranges',
        'Interpret two-dot, three-dot, negative revisions, symmetric difference, and command-specific diff behavior.',
        'A..B always means the file changes required to transform A into B.',
        'conceptual',
        'analyze'
      ),
      s(
        'git-pathspecs',
        'Use pathspec magic, exclusions, attributes, top-level anchoring, and separator placement without confusing paths with revisions.',
        'A shell glob and a Git pathspec always select the same paths.'
      ),
      s(
        'git-history-search',
        'Search commit messages, changed lines, content occurrences, authors, dates, and paths with pickaxe and regex evidence.',
        'grep over current files can identify the commit that introduced a behavior.'
      ),
      s(
        'git-change-review-ranges',
        'Choose a review range that matches branch intent, merge base, stacked work, and force-push risk.',
        'Comparing two branch tips always isolates only the proposed work.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  module(
    'git-undo-recovery',
    'Undo, Restore, Revert, Reset, and Reflog Recovery',
    'Recover from an incorrect edit or commit using the least destructive operation and a verified recovery reference.',
    'an undo decision matrix and disaster-recovery lab',
    [
      s(
        'git-undo-layer-choice',
        'Select an undo operation from affected layer, publication state, collaboration, desired topology, and recovery evidence.',
        'There is one Git undo command that safely applies to every mistake.',
        'strategic',
        'evaluate'
      ),
      s(
        'git-restore-working-index',
        'Use restore for working-tree and index paths with explicit sources, patch selection, and pre-change diffs.',
        'git restore always recovers content from the last commit.'
      ),
      s(
        'git-revert-public-history',
        'Create and verify inverse commits for published changes, merges, and later dependencies without claiming history was erased.',
        'Reverting a merge permanently prevents all its changes from ever returning.'
      ),
      s(
        'git-reset-modes',
        'Predict reference, index, and working-tree effects of soft, mixed, hard, merge, and keep resets before execution.',
        'git reset --hard is safe when the target commit exists.'
      ),
      s(
        'git-reflog-object-recovery',
        'Use reflogs, dangling-object inspection, temporary references, and expiry limits to recover otherwise unreachable work.',
        'Reflog entries are shared remote backups that never expire.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  module(
    'git-rebase-cherry-pick',
    'History Editing, Rebase, and Selective Transfer',
    'Prepare a reviewable local series while preserving authorship intent, conflict evidence, and a recovery reference.',
    'a history-rewrite plan and verification graph',
    [
      s(
        'git-rebase-replay',
        'Explain rebase as selecting commits, resetting a base, and replaying new commits with new identities.',
        'Rebase moves existing commit objects without changing their IDs.',
        'conceptual',
        'analyze'
      ),
      s(
        'git-interactive-rebase',
        'Use pick, reword, edit, squash, fixup, drop, exec, and reorder with dependency and test awareness.',
        'Interactive rebase can safely reorder dependent commits without changing behavior.'
      ),
      s(
        'git-rebase-published-risk',
        'Limit history rewriting using collaboration state, force-with-lease, recovery refs, and explicit coordination.',
        'A successful force push proves no collaborator work was overwritten.',
        'professional',
        'evaluate'
      ),
      s(
        'git-cherry-pick-context',
        'Transfer selected changes while preserving provenance, resolving context, and testing interactions absent from the source branch.',
        'Cherry-pick copies the original commit object unchanged.'
      ),
      s(
        'git-rewrite-verification',
        'Compare old and rewritten ranges by patch, tree, tests, metadata, and range-diff before replacing a shared reference.',
        'Matching final files proves a rewritten series preserves review meaning.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  module(
    'git-hooks-quality-security',
    'Hooks, Quality Gates, Signing, and Repository Security',
    'Add useful local feedback without pretending client-side hooks enforce server policy or executing untrusted repository code silently.',
    'a bounded Git automation and trust policy',
    [
      s(
        'git-hook-lifecycle',
        'Map client and server hook names to operations, inputs, environment, bypass behavior, and failure effects.',
        'Cloning a repository installs and runs all versioned hooks automatically.',
        'conceptual',
        'analyze'
      ),
      s(
        'git-hook-portability',
        'Keep hook logic fast, deterministic, documented, opt-in where appropriate, and delegated to versioned scripts.',
        'A hook that works in one shell is a portable team gate.'
      ),
      s(
        'git-local-server-gates',
        'Separate local convenience hooks, CI checks, protected branches, reviews, and server-side enforcement by authority.',
        'A pre-commit hook prevents all invalid commits from reaching a shared repository.'
      ),
      s(
        'git-untrusted-repository',
        'Treat hooks, filters, diff drivers, submodules, config includes, and build scripts as executable trust boundaries.',
        'Inspecting source files is enough before running repository-provided tooling.',
        'professional',
        'evaluate'
      ),
      s(
        'git-safe-directory-ownership',
        'Respond to ownership and safe-directory warnings without broadly trusting unrelated repositories.',
        'Adding wildcard safe.directory is the correct fix for every ownership warning.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  module(
    'git-team-workflow',
    'Issues, Reviews, Pull Requests, and Team Workflow',
    'Move a change from issue to review to integration with traceable decisions, bounded branch scope, and respectful collaboration.',
    'a team contribution and review protocol',
    [
      s(
        'git-workflow-policy',
        'Choose trunk-based, feature-branch, release-branch, or fork collaboration from delivery, risk, ownership, and release constraints.',
        'One branching model is best for every team and release cadence.',
        'strategic',
        'evaluate'
      ),
      s(
        'git-issue-acceptance-link',
        'Connect issue context, acceptance criteria, branch scope, commits, tests, and review evidence without making the tracker the source code.',
        'Mentioning an issue number proves the implementation satisfies it.'
      ),
      s(
        'git-pull-request-scope',
        'Prepare a focused review range, description, changed-case evidence, migration notes, and explicit reviewer questions.',
        'A pull request should include every nearby cleanup to reduce future work.',
        'professional',
        'create'
      ),
      s(
        'git-review-feedback',
        'Review behavior, risks, tests, readability, and security with precise evidence while separating required changes from suggestions.',
        'Code review is primarily a style-correction process.',
        'professional',
        'evaluate'
      ),
      s(
        'git-integration-policy',
        'Apply approvals, required checks, merge queue, update policy, merge method, and branch cleanup consistently.',
        'Passing CI alone grants authority to merge a change.'
      ),
    ]
  ),
  module(
    'git-foundations-capstone',
    'Repository Repair, Release, and Collaboration Capstone',
    'Recover and ship a repository containing mixed work, a conflict, a mistaken commit, a remote update, and a release deadline.',
    'a complete Git foundations evidence portfolio',
    [
      s(
        'git-repository-triage',
        'Capture repository boundaries, config origins, current operation, worktree/index state, graph, remotes, and recovery refs before repair.',
        'git status alone captures all state needed for repository recovery.',
        'strategic',
        'evaluate'
      ),
      s(
        'git-minimal-repair-plan',
        'Order preservation, reproduction, local repair, tests, history cleanup, and publication from least to most irreversible.',
        'The shortest command sequence is the safest recovery plan.',
        'strategic',
        'evaluate'
      ),
      s(
        'git-collaboration-communication',
        'Coordinate rewritten history, conflicts, ownership, release changes, and recovery instructions with explicit affected refs and people.',
        'A force-push warning in chat is sufficient coordination regardless of response.',
        'professional',
        'evaluate'
      ),
      s(
        'git-release-audit',
        'Audit source identity, tree cleanliness, review range, checks, tag, artifact provenance, and remote references before release.',
        'A green release pipeline proves the selected source commit was intended.'
      ),
      s(
        'git-handoff-runbook',
        'Publish an accessible repository runbook covering setup, workflow, gates, release, recovery, and escalation with tested commands.',
        'Experienced contributors do not need repository-specific recovery documentation.',
        'professional',
        'create'
      ),
    ]
  ),
];

const gitProjects = [
  project(
    'git-history-forensics',
    'Repository History Forensics',
    'git-history-objects',
    'A maintainer needs to explain a regression without changing the repository',
    'Deliver object, graph, path, diff, and blame evidence that separates observation from conclusion.',
    [
      'git-snapshots-graph',
      'git-repository-boundaries',
      'git-three-tree-model',
      'git-status-evidence',
      'git-diff-scopes',
      'git-atomic-commit-message',
      'git-log-graph-format',
      'git-object-identity',
      'git-file-history-renames',
      'git-blame-context',
    ]
  ),
  project(
    'git-conflict-collaboration',
    'Conflict-Safe Feature Integration',
    'git-conflicts-resolution',
    'Two contributors changed a shared policy in different branches',
    'Integrate both intents with merge-base, staged conflict, semantic resolution, tests, and remote synchronization evidence.',
    [
      'git-branch-reference',
      'git-switch-worktree-state',
      'git-merge-base',
      'git-fast-forward-merge-commit',
      'git-post-merge-verification',
      'git-remote-reference-model',
      'git-fetch-observation',
      'git-push-refspec-safety',
      'git-conflict-stages',
      'git-semantic-resolution',
      'git-continue-abort',
    ]
  ),
  project(
    'git-release-recovery',
    'Release and Recovery Exercise',
    'git-undo-recovery',
    'A release owner discovers a secret-like fixture and incorrect commit after a tag candidate',
    'Protect credentials, choose safe undo layers, recover a lost commit, and publish a reproducible replacement release plan.',
    [
      'git-ignore-precedence',
      'git-attributes-effects',
      'git-line-ending-normalization',
      'git-secret-large-generated-data',
      'git-lightweight-annotated-tags',
      'git-release-reproducibility',
      'git-signature-trust',
      'git-undo-layer-choice',
      'git-revert-public-history',
      'git-reset-modes',
      'git-reflog-object-recovery',
    ]
  ),
  project(
    'git-team-portfolio',
    'Team Repository Operations Portfolio',
    'git-foundations-capstone',
    'A small engineering team needs a safe contribution, review, release, and recovery workflow',
    'Deliver a tested workflow and resolve a changed repository incident under collaboration constraints.',
    [
      'git-rebase-published-risk',
      'git-rewrite-verification',
      'git-hook-lifecycle',
      'git-local-server-gates',
      'git-untrusted-repository',
      'git-workflow-policy',
      'git-pull-request-scope',
      'git-review-feedback',
      'git-integration-policy',
      'git-repository-triage',
      'git-minimal-repair-plan',
      'git-release-audit',
      'git-handoff-runbook',
    ]
  ),
];

export const gitBasicsConfig = {
  id: 'git-basics',
  title: 'Git Foundations: Evidence, Collaboration, and Recovery',
  version: '2026.07',
  researchedAt: RESEARCHED_AT,
  masteryThresholdPercent: 85,
  minimumQuestionBankSize: 320,
  modules: gitModules,
  projects: gitProjects,
  finalExamCompetencyIds: gitModules.flatMap((entry) => entry.skills.map((skill) => skill[0])),
  examContext:
    'Operate an unfamiliar simulated Git repository across worktree, index, history, branches, remotes, conflicts, content policy, releases, revision queries, recovery, rewriting, gates, and collaboration without workshop solutions.',
  pathways: {
    prerequisiteCourseIds: ['linux-basics'],
    placementEvidence: [
      'Navigate a terminal, inspect files, interpret command options and exit evidence, and protect destructive operations.',
    ],
    completionEvidence: [
      'Defend four cumulative Git projects against changed history and collaboration constraints.',
      'Pass the cumulative Git performance exam at or above 85 percent.',
    ],
  },
  audience: {
    description:
      'Developers and technical collaborators who need Git understanding from first repository through safe team release and recovery.',
    entryKnowledge: [
      'Linux terminal navigation, file operations, quoting, help lookup, and evidence recording.',
    ],
    deviceConstraints: [
      'Modern browser; repository and remote operations occur only in a stateful deterministic simulator.',
    ],
    accessibilityAssumptions: [
      'Graphs include linear text equivalents; all terminal output and ordering controls are keyboard and screen-reader usable.',
    ],
  },
  scope: {
    includes: [
      'Git snapshots, index, objects, branches, merges, remotes, conflicts, content policy, tags, revisions, undo, rebase, hooks, reviews, release, and recovery',
      'Safe simulated repository operations with status, diff, graph, ref, and recovery evidence',
      'Four cumulative repository projects',
    ],
    excludes: [
      'Server administration, large-scale monorepo optimization, submodules, partial clone, worktrees, bisect automation, and history-filter tooling reserved for Git Advanced',
    ],
    nextCourses: ['git-advanced', 'build-bookbot-python', 'cicd-github-actions'],
  },
  sources: [
    {
      title: 'Git Reference',
      authority: 'official-docs',
      url: 'https://git-scm.com/docs',
      version: 'current as of 2026-07',
      reviewedAt: REVIEWED_AT,
      scope:
        'Controls porcelain and plumbing command behavior, configuration, revision syntax, hooks, workflows, and recovery.',
    },
    {
      title: 'Pro Git, Second Edition',
      authority: 'official-docs',
      url: 'https://git-scm.com/book/en/v2',
      version: 'current web edition 2026-07',
      reviewedAt: REVIEWED_AT,
      scope:
        'Controls cumulative conceptual sequence from setup through internals, collaboration, tooling, and distributed workflows.',
    },
    {
      title: 'gitworkflows Manual',
      authority: 'official-docs',
      url: 'https://git-scm.com/docs/gitworkflows',
      version: 'current as of 2026-07',
      reviewedAt: REVIEWED_AT,
      scope:
        'Controls integration, topic branch, merge, release, and distributed maintainer workflow guidance.',
    },
    {
      title: 'gitrevisions Manual',
      authority: 'official-docs',
      url: 'https://git-scm.com/docs/gitrevisions',
      version: 'current as of 2026-07',
      reviewedAt: REVIEWED_AT,
      scope:
        'Controls revision names, ancestry, range, exclusion, reflog, and object selection semantics.',
    },
    {
      title: 'githooks Manual',
      authority: 'official-docs',
      url: 'https://git-scm.com/docs/githooks',
      version: 'current as of 2026-07',
      reviewedAt: REVIEWED_AT,
      scope:
        'Controls client and server hook invocation, environment, parameters, bypass, and exit behavior.',
    },
  ],
};

export const foundationToolsConfigs = [linuxBasicsConfig, gitBasicsConfig];

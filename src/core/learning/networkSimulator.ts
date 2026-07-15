const SAMPLE_HOST = '192.0.2.24';
const HOME = '/home/learner';

interface TerminalState {
  cwd: string;
  directories: Set<string>;
  files: Set<string>;
  staged: Set<string>;
  modified: Set<string>;
  branch: string;
  branches: Set<string>;
  commits: string[];
  reflog: string[];
  tags: Map<string, string>;
  stashes: string[];
  worktrees: Map<string, { head: string; branch?: string; locked?: string }>;
  sparsePaths: Set<string>;
  remoteMain: string;
  bisectActive: boolean;
  objectFormat: 'sha1' | 'sha256';
  maintenanceRuns: string[];
  gitInitialized: boolean;
  umask: string;
}

function initialState(): TerminalState {
  return {
    cwd: `${HOME}/lab`,
    directories: new Set([HOME, `${HOME}/lab`, `${HOME}/lab/data`, `${HOME}/lab/scripts`]),
    files: new Set([
      `${HOME}/lab/README.md`,
      `${HOME}/lab/data/incidents.csv`,
      `${HOME}/lab/scripts/check.sh`,
    ]),
    staged: new Set(),
    modified: new Set(),
    branch: 'main',
    branches: new Set(['main']),
    commits: [],
    reflog: [],
    tags: new Map(),
    stashes: [],
    worktrees: new Map(),
    sparsePaths: new Set(),
    remoteMain: 'b00b1e5',
    bisectActive: false,
    objectFormat: 'sha256',
    maintenanceRuns: [],
    gitInitialized: false,
    umask: '0022',
  };
}

function seedRepository(state: TerminalState): void {
  state.gitInitialized = true;
  state.commits = [
    'c0ffee0 Harden release policy',
    'b00b1e5 Add parser boundary tests',
    'a11ce00 Establish repository baseline',
  ];
  state.reflog = [
    'c0ffee0 HEAD@{0}: checkout: moving from topic to main',
    'b00b1e5 HEAD@{1}: rebase (finish): returning to refs/heads/main',
    'a11ce00 HEAD@{2}: commit (initial): Establish repository baseline',
  ];
  state.branches = new Set(['main', 'release', 'topic', 'security-fix', 'stack-v1', 'stack-v2']);
  state.tags = new Map([['v2.4.0', 'c0ffee0']]);
  state.worktrees = new Map([
    [`${HOME}/lab`, { head: 'c0ffee0', branch: 'main' }],
    [`${HOME}/release-review`, { head: 'b00b1e5', branch: 'release', locked: 'release audit' }],
  ]);
  state.sparsePaths = new Set(['apps/status']);
}

function cleanCommand(line: string): string {
  return line.replace(/^\s*(?:\$|>|[A-Za-z]:\\[^>]*>)\s*/, '').trim();
}

function tokens(command: string): string[] {
  return [...command.matchAll(/"([^"]*)"|'([^']*)'|([^\s]+)/g)].map(
    (match) => match[1] ?? match[2] ?? match[3]
  );
}

function normalizePath(state: TerminalState, raw = '.'): string {
  const expanded = raw === '~' ? HOME : raw.startsWith('~/') ? `${HOME}/${raw.slice(2)}` : raw;
  const parts = (expanded.startsWith('/') ? expanded : `${state.cwd}/${expanded}`).split('/');
  const resolved: string[] = [];
  for (const part of parts) {
    if (!part || part === '.') continue;
    if (part === '..') resolved.pop();
    else resolved.push(part);
  }
  return `/${resolved.join('/')}`;
}

function displayPath(state: TerminalState, absolutePath: string): string {
  if (absolutePath === state.cwd) return '.';
  if (absolutePath.startsWith(`${state.cwd}/`)) return absolutePath.slice(state.cwd.length + 1);
  return absolutePath;
}

function operand(commandTokens: string[], start = 1): string | undefined {
  return commandTokens.slice(start).find((token) => !token.startsWith('-'));
}

function commandTarget(command: string): string {
  const parts = command.split(/\s+/);
  return parts.at(-1) || SAMPLE_HOST;
}

function simulateGit(commandTokens: string[], state: TerminalState): string[] {
  const subcommand = commandTokens[1] ?? 'help';
  if (subcommand === 'init') {
    state.gitInitialized = true;
    state.commits = [];
    state.reflog = [];
    state.worktrees = new Map([[state.cwd, { head: 'unborn', branch: state.branch }]]);
    return [`Initialized empty Git repository in ${state.cwd}/.git/`];
  }
  if (!state.gitInitialized) seedRepository(state);

  if (subcommand === 'status') {
    const staged = [...state.staged].map((file) => `  new file:   ${displayPath(state, file)}`);
    const modified = [...state.modified]
      .filter((file) => !state.staged.has(file))
      .map((file) => `  modified:   ${displayPath(state, file)}`);
    return [
      `On branch ${state.branch}`,
      ...(staged.length ? ['Changes to be committed:', ...staged] : []),
      ...(modified.length ? ['Changes not staged for commit:', ...modified] : []),
      ...(!staged.length && !modified.length ? ['nothing to commit, working tree clean'] : []),
    ];
  }
  if (subcommand === 'add') {
    const requested = commandTokens.slice(2).filter((token) => !token.startsWith('-'));
    const selected = requested.includes('.')
      ? [...state.files]
      : requested.map((file) => normalizePath(state, file));
    for (const file of selected) {
      if (state.files.has(file)) state.staged.add(file);
    }
    return [`Staged ${state.staged.size} path(s) in the simulated index.`];
  }
  if (subcommand === 'commit') {
    if (state.staged.size === 0) return ['nothing to commit, working tree clean'];
    const messageIndex = commandTokens.indexOf('-m');
    const message = messageIndex >= 0 ? commandTokens[messageIndex + 1] : 'record lab evidence';
    const id = (0xa11ce + state.commits.length * 7919).toString(16).slice(0, 7);
    state.commits.unshift(`${id} ${message}`);
    state.reflog.unshift(`${id} HEAD@{0}: commit: ${message}`);
    for (const file of state.staged) state.modified.delete(file);
    state.staged.clear();
    return [`[${state.branch} ${id}] ${message}`];
  }
  if (subcommand === 'log') {
    return state.commits.length
      ? state.commits.map((entry, index) => `${index === 0 ? '* ' : '  '}${entry}`)
      : ['fatal: your current branch has no commits yet'];
  }
  if (subcommand === 'rev-list') {
    return commandTokens.includes('--left-right')
      ? [
          '<c0ffee0 Harden release policy',
          '>b00b1e5 Add parser boundary tests',
          '>d15ea5e Add changed policy case',
        ]
      : state.commits.map((entry) => entry.split(' ')[0]);
  }
  if (subcommand === 'for-each-ref' || subcommand === 'show-ref') {
    return [
      'c0ffee0 refs/heads/main',
      'b00b1e5 refs/heads/release',
      'd15ea5e refs/heads/topic',
      `${state.remoteMain} refs/remotes/origin/main`,
      ...[...state.tags].map(([name, id]) => `${id} refs/tags/${name}`),
    ];
  }
  if (subcommand === 'cat-file') {
    return commandTokens.includes('-t')
      ? ['commit']
      : [
          'tree 7ee5eed',
          'parent b00b1e5',
          'author Learner <learner@example.test>',
          '',
          'Harden release policy',
        ];
  }
  if (subcommand === 'count-objects') {
    return [
      'count: 14',
      'size: 56',
      'in-pack: 428',
      'packs: 3',
      'size-pack: 912',
      'prune-packable: 0',
      'garbage: 0',
    ];
  }
  if (subcommand === 'verify-pack') {
    return [
      'c0ffee0 commit 241 163 12',
      '7ee5eed tree 188 142 175',
      'non delta: 2 objects',
      'chain length = 2: 8 objects',
    ];
  }
  if (subcommand === 'fsck') {
    return commandTokens.includes('--unreachable')
      ? ['unreachable commit d15ea5e', 'unreachable tree 7ee5eed', 'dangling blob deadbee']
      : [
          'Checking object directories: 100% (256/256)',
          'Checking objects: 100% (442/442)',
          'connectivity: valid',
        ];
  }
  if (subcommand === 'diff') {
    const scope = commandTokens.includes('--staged') || commandTokens.includes('--cached');
    const changed = scope ? [...state.staged] : [...state.modified];
    return changed.length
      ? changed.flatMap((file) => [
          `diff --git a/${displayPath(state, file)} b/${displayPath(state, file)}`,
          '-previous lab line',
          '+changed evidence line',
        ])
      : ['No differences in the requested simulated comparison.'];
  }
  if (subcommand === 'branch') {
    const name = operand(commandTokens, 2);
    if (name) {
      state.branches.add(name);
      return [`Created branch ${name} at the current simulated commit.`];
    }
    return [...state.branches].map((branch) => `${branch === state.branch ? '* ' : '  '}${branch}`);
  }
  if (subcommand === 'switch' || subcommand === 'checkout') {
    const create = commandTokens.includes('-c') || commandTokens.includes('-b');
    const name = operand(commandTokens, 2);
    if (!name) return ['A branch name is required.'];
    if (create) state.branches.add(name);
    if (!state.branches.has(name)) return [`error: pathspec '${name}' did not match a branch`];
    state.branch = name;
    return [`Switched to branch '${name}'`];
  }
  if (subcommand === 'merge') {
    const name = operand(commandTokens, 2);
    if (!name || !state.branches.has(name)) return ['merge requires an existing simulated branch'];
    return [
      `Merge made by the 'ort' strategy: ${name} → ${state.branch}`,
      '0 unresolved conflicts',
    ];
  }
  if (subcommand === 'merge-base') {
    return commandTokens.includes('--all') ? ['b00b1e5', 'deadbee'] : ['b00b1e5'];
  }
  if (subcommand === 'ls-files' && commandTokens.includes('--unmerged')) {
    return [
      '100644 7ba5e00 1\tpolicy.txt',
      '100644 0a11500 2\tpolicy.txt',
      '100644 7ee5eed 3\tpolicy.txt',
    ];
  }
  if (subcommand === 'rerere') {
    if (commandTokens.includes('forget')) return ['Forgotten resolution for policy.txt.'];
    return [
      'policy.txt',
      'Recorded preimage for policy.txt.',
      'Resolved policy.txt using previous resolution.',
    ];
  }
  if (subcommand === 'remote') {
    return commandTokens.includes('-v')
      ? [
          'origin  https://example.test/learner/lab.git (fetch)',
          'origin  https://example.test/learner/lab.git (push)',
        ]
      : ['origin'];
  }
  if (['fetch', 'pull'].includes(subcommand)) {
    return [
      `Simulated ${subcommand}: refs inspected; no network or credential operation occurred.`,
    ];
  }
  if (subcommand === 'push') {
    const lease = commandTokens.find((token) => token.startsWith('--force-with-lease='));
    const expected = lease?.split(':').at(-1);
    if (expected && expected !== state.remoteMain) {
      return [
        `rejected: stale lease expected ${expected}, observed ${state.remoteMain}`,
        'No simulated remote ref changed.',
      ];
    }
    if (commandTokens.includes('--dry-run')) {
      return [
        `dry-run: HEAD → refs/heads/main; expected-old=${expected ?? 'not-specified'}`,
        'No network or simulated remote ref changed.',
      ];
    }
    state.remoteMain = state.commits[0]?.split(' ')[0] ?? state.remoteMain;
    return [`updated refs/heads/main to ${state.remoteMain} in disposable simulated remote`];
  }
  if (subcommand === 'tag') {
    const name = operand(commandTokens, 2);
    if (name) {
      state.tags.set(name, state.commits[0]?.split(' ')[0] ?? 'a11ce00');
      return [`Created simulated tag ${name}.`];
    }
    return [...state.tags.keys()];
  }
  if (subcommand === 'restore') {
    const staged = commandTokens.includes('--staged');
    if (staged) state.staged.clear();
    else state.modified.clear();
    return [
      `Simulated restore updated the ${staged ? 'index' : 'working tree'} only; recovery ref retained.`,
    ];
  }
  if (subcommand === 'reset') {
    const old = state.commits[0]?.split(' ')[0] ?? 'unborn';
    if (commandTokens.some((token) => token.includes('HEAD^')) && state.commits.length > 1) {
      state.commits.shift();
    }
    if (!commandTokens.includes('--soft')) state.staged.clear();
    if (commandTokens.includes('--hard')) state.modified.clear();
    const current = state.commits[0]?.split(' ')[0] ?? 'unborn';
    state.reflog.unshift(`${current} HEAD@{0}: reset: moving from ${old} to ${current}`);
    return [
      `HEAD ${old} → ${current}`,
      `mode=${commandTokens.find((token) => token.startsWith('--')) ?? '--mixed'}`,
      'Recovery reference remains available.',
    ];
  }
  if (subcommand === 'revert') {
    const id = (0xdefaced + state.commits.length * 101).toString(16).slice(0, 7);
    state.commits.unshift(`${id} Revert published change`);
    state.reflog.unshift(`${id} HEAD@{0}: revert: Revert published change`);
    return [
      `[${state.branch} ${id}] Revert published change`,
      'Original commit remains in reachable history.',
    ];
  }
  if (subcommand === 'reflog') {
    return state.reflog;
  }
  if (subcommand === 'rebase') {
    const old = state.commits[0]?.split(' ')[0] ?? 'c0ffee0';
    const rewritten = 'f17e5e0';
    state.commits[0] = `${rewritten} Replayed release policy`;
    state.reflog.unshift(`${rewritten} HEAD@{0}: rebase (finish): ${old} → ${rewritten}`);
    return ['Successfully rebased and updated refs/heads/main.', `${old} => ${rewritten}`];
  }
  if (subcommand === 'range-diff') {
    return [
      '1: a11ce00 = 1: f17e5e0 Establish baseline',
      '2: b00b1e5 ! 2: d15ea5e Add parser boundary tests',
      '3: c0ffee0 = 3: 7ee5eed Harden release policy',
    ];
  }
  if (subcommand === 'cherry') {
    return ['- b00b1e5 Add parser boundary tests', '+ d15ea5e Add dependency-bound changed case'];
  }
  if (subcommand === 'cherry-pick' || subcommand === 'replay') {
    const id = subcommand === 'replay' ? '7e91a70' : 'bac9f17';
    state.commits.unshift(`${id} Backport verified change`);
    state.reflog.unshift(`${id} HEAD@{0}: ${subcommand}: Backport verified change`);
    return subcommand === 'replay'
      ? [`update refs/heads/${state.branch} ${id} c0ffee0`]
      : [`[${state.branch} ${id}] Backport verified change`];
  }
  if (subcommand === 'stash') {
    const action = commandTokens[2] ?? 'list';
    if (action === 'push' || action === 'save') {
      const label = `stash@{0}: On ${state.branch}: urgent-policy-wip`;
      state.stashes.unshift(label);
      if (commandTokens.includes('--staged')) state.staged.clear();
      else {
        state.staged.clear();
        state.modified.clear();
      }
      return [`Saved working directory and index state ${label}`];
    }
    if (action === 'pop') {
      const restored = state.stashes.shift();
      state.modified.add(`${state.cwd}/README.md`);
      return [restored ? `Applied and dropped ${restored}` : 'No stash entries found.'];
    }
    if (action === 'apply')
      return [state.stashes[0] ? `Applied ${state.stashes[0]}` : 'No stash entries found.'];
    if (action === 'branch') return ['Created branch stash-recovery and applied stash@{0}.'];
    return state.stashes.length ? state.stashes : ['No stash entries found.'];
  }
  if (subcommand === 'bisect') {
    const action = commandTokens[2] ?? 'help';
    if (action === 'start') {
      state.bisectActive = true;
      return [
        'Bisecting: 1199 revisions left to test after this (roughly 11 steps)',
        '[b00b1e5] Add parser boundary tests',
      ];
    }
    if (action === 'skip') return ['Bisecting: skipped untestable b00b1e5; 600 revisions remain.'];
    if (action === 'log')
      return [
        'git bisect start bad-tip known-good',
        '# bad: [c0ffee0] Harden release policy',
        '# good: [a11ce00] Establish baseline',
      ];
    if (action === 'reset') {
      state.bisectActive = false;
      return [`Previous HEAD position was b00b1e5; Switched to branch '${state.branch}'`];
    }
    if (action === 'run')
      return [
        'running bounded simulated regression probe',
        'b00b1e5 is the first bad commit (candidate, causal verification required)',
      ];
    return [`bisect-state=${state.bisectActive ? 'active' : 'inactive'}`];
  }
  if (subcommand === 'worktree') {
    const action = commandTokens[2] ?? 'list';
    if (action === 'list') {
      return [...state.worktrees].flatMap(([path, worktree]) => [
        `worktree ${path}`,
        `HEAD ${worktree.head}`,
        worktree.branch ? `branch refs/heads/${worktree.branch}` : 'detached',
        ...(worktree.locked ? [`locked ${worktree.locked}`] : []),
        '',
      ]);
    }
    if (action === 'add') {
      const values = commandTokens.slice(3).filter((token) => !token.startsWith('-'));
      const path = normalizePath(state, values[0] ?? '../review');
      const branch = values[1] ?? `review-${state.worktrees.size}`;
      state.worktrees.set(path, { head: state.commits[0]?.split(' ')[0] ?? 'c0ffee0', branch });
      return [
        `Preparing worktree (checking out '${branch}')`,
        `HEAD is now at ${state.commits[0]}`,
      ];
    }
    if (action === 'lock') {
      const path = normalizePath(state, commandTokens.at(-1));
      const entry = state.worktrees.get(path);
      if (entry) entry.locked = 'learner lock';
      return [`Locked worktree ${path}.`];
    }
    if (action === 'prune') return ['Examined stale worktree metadata; locked entries retained.'];
    if (action === 'repair') return ['Repaired administrative links for 2 simulated worktrees.'];
    return [`Simulated worktree ${action}; shared refs and objects preserved.`];
  }
  if (subcommand === 'verify-tag' || subcommand === 'verify-commit') {
    return [
      '[GNUPG:] GOODSIG A11CE00 Release Engineer',
      '[GNUPG:] VALIDSIG A11CE00 20260714 0 4 0 1 10 00 A11CE00',
      'cryptographic-validity=valid authorization=requires-policy-check',
    ];
  }
  if (subcommand === 'submodule') {
    const action = commandTokens[2] ?? 'status';
    if (action === 'status')
      return ['-c0ffee0 vendor/parser (v2.4.0)', ' b00b1e5 vendor/policy (heads/release)'];
    if (action === 'sync') return ['Synchronizing submodule url for vendor/parser'];
    if (action === 'update')
      return ['Submodule paths inspected; no hooks, network, or nested code executed.'];
    return [`Simulated submodule ${action}; gitlinks remain explicit.`];
  }
  if (subcommand === 'sparse-checkout') {
    const action = commandTokens[2] ?? 'list';
    if (action === 'list') return [...state.sparsePaths].sort();
    if (action === 'set' || action === 'add') {
      const paths = commandTokens.slice(3).filter((token) => !token.startsWith('-'));
      if (action === 'set') state.sparsePaths.clear();
      for (const path of paths) state.sparsePaths.add(path);
      return [`Sparse working set: ${[...state.sparsePaths].sort().join(', ')}`];
    }
    if (action === 'disable') {
      state.sparsePaths.clear();
      return ['Sparse checkout disabled; full simulated working tree restored.'];
    }
    return [`Sparse checkout ${action} completed in simulated state.`];
  }
  if (subcommand === 'check-attr') {
    const path = commandTokens.at(-1) ?? 'scripts/release.sh';
    return [
      `${path}: text: set`,
      `${path}: eol: crlf`,
      `${path}: filter: release-normalize`,
      `${path}: merge: text`,
    ];
  }
  if (subcommand === 'config') {
    return commandTokens.includes('--show-origin')
      ? [
          'global file:/home/learner/.gitconfig credential.helper=manager',
          'global file:/home/learner/.gitconfig includeIf.gitdir:/work/.path=/home/learner/.gitconfig-work',
          'local file:.git/config core.hooksPath=.githooks',
          'command command line: safe.directory=/home/learner/lab',
        ]
      : ['credential.helper=manager', 'core.hooksPath=.githooks'];
  }
  if (subcommand === 'maintenance') {
    const tasks = commandTokens
      .filter((token) => token.startsWith('--task='))
      .map((token) => token.slice(7));
    state.maintenanceRuns.push(...tasks);
    return [
      `Completed safe simulated tasks: ${tasks.join(', ') || 'configured schedule'}`,
      'connectivity: valid; reachable objects retained',
    ];
  }
  if (subcommand === 'commit-graph' || subcommand === 'multi-pack-index') {
    return [`${subcommand}: verified and updated acceleration metadata in simulated object store.`];
  }
  if (subcommand === 'gc' || subcommand === 'repack' || subcommand === 'prune') {
    return [
      `${subcommand}: dry simulated maintenance retained reachable and recovery objects.`,
      'No host object database changed.',
    ];
  }
  if (subcommand === 'bundle') {
    const action = commandTokens[2] ?? 'verify';
    return action === 'verify'
      ? [
          'The bundle contains this ref: c0ffee0 refs/heads/main',
          'The bundle records a complete history.',
          'connectivity: valid',
        ]
      : [
          `Bundle ${action} completed in simulated storage; hooks, config, reflogs, and external objects excluded.`,
        ];
  }
  if (subcommand === 'update-ref')
    return ['Updated disposable simulated ref atomically; old-value guard satisfied.'];
  if (subcommand === 'replace')
    return ['Replacement ref recorded for inspection only; original object unchanged.'];
  if (subcommand === 'pack-refs')
    return ['Packed refs in simulated repository; ref identities unchanged.'];
  if (subcommand === 'show' || subcommand === 'rev-parse') {
    if (commandTokens.some((token) => token.startsWith('--show-object-format'))) {
      return [`storage=${state.objectFormat}`, 'input=sha1,sha256', `output=${state.objectFormat}`];
    }
    return ['a11ce00 (simulated object identity)', `branch=${state.branch}`];
  }
  return [
    `Git ${subcommand} was parsed in the safe simulator; no repository or remote was changed.`,
    'Use status, diff, log, and reflog evidence to justify the next operation.',
  ];
}

function simulateTerminalCommand(command: string, state: TerminalState): string[] | null {
  const commandTokens = tokens(command);
  const name = commandTokens[0]?.toLowerCase();
  if (!name) return [];

  if (name === 'pwd') return [state.cwd];
  if (name === 'cd') {
    const destination = normalizePath(state, operand(commandTokens) ?? HOME);
    if (!state.directories.has(destination)) return [`bash: cd: ${destination}: No such directory`];
    state.cwd = destination;
    return [state.cwd];
  }
  if (name === 'ls') {
    const requested = operand(commandTokens);
    const directory = normalizePath(state, requested ?? '.');
    if (!state.directories.has(directory))
      return [`ls: cannot access '${requested}': No such directory`];
    const entries = [...state.directories, ...state.files]
      .filter(
        (entry) =>
          entry.startsWith(`${directory}/`) && !entry.slice(directory.length + 1).includes('/')
      )
      .map((entry) => entry.slice(directory.length + 1))
      .sort();
    return commandTokens.some((token) => token.includes('l'))
      ? entries.map((entry, index) =>
          state.directories.has(`${directory}/${entry}`)
            ? `drwxr-xr-x 2 learner learner 4096 Jul 14 09:0${index} ${entry}`
            : `-rw-r--r-- 1 learner learner ${80 + index * 17} Jul 14 09:0${index} ${entry}`
        )
      : [entries.join('  ') || '(empty directory)'];
  }
  if (name === 'mkdir') {
    const raw = operand(commandTokens);
    if (!raw) return ['mkdir: missing operand'];
    const directory = normalizePath(state, raw);
    state.directories.add(directory);
    return [`created directory '${displayPath(state, directory)}' (simulated)`];
  }
  if (name === 'touch') {
    const raw = operand(commandTokens);
    if (!raw) return ['touch: missing file operand'];
    const file = normalizePath(state, raw);
    state.files.add(file);
    state.modified.add(file);
    return [`updated timestamp for '${displayPath(state, file)}' (simulated)`];
  }
  if (name === 'cp' || name === 'mv') {
    const values = commandTokens.slice(1).filter((token) => !token.startsWith('-'));
    if (values.length < 2) return [`${name}: missing destination operand`];
    const source = normalizePath(state, values[0]);
    const destination = normalizePath(state, values.at(-1));
    if (!state.files.has(source)) return [`${name}: cannot stat '${values[0]}': No such file`];
    state.files.add(destination);
    state.modified.add(destination);
    if (name === 'mv') state.files.delete(source);
    return [`${name === 'cp' ? 'copied' : 'moved'} ${values[0]} → ${values.at(-1)} (simulated)`];
  }
  if (name === 'rm') {
    const raw = commandTokens.at(-1);
    const path = normalizePath(state, raw);
    if (path === '/' || path === HOME) {
      return [
        'Command recorded; this simulator never executes learner shell input.',
        'Safety refusal: root and home deletion are outside this disposable scenario.',
      ];
    }
    state.files.delete(path);
    state.modified.add(path);
    return [`removed '${displayPath(state, path)}' from simulated state`];
  }
  if (name === 'cat' || name === 'head' || name === 'tail') {
    const raw = commandTokens.at(-1) ?? '';
    const file = normalizePath(state, raw);
    if (!state.files.has(file)) return [`${name}: ${raw}: No such file`];
    if (file.endsWith('.csv'))
      return ['id,severity,status', 'INC-17,high,open', 'INC-21,low,closed'];
    if (file.endsWith('.sh'))
      return ['#!/usr/bin/env bash', 'set -Eeuo pipefail', 'printf "lab ready\\n"'];
    return ['# LEARN-IT-ALL terminal lab', 'Every command is simulated and evidence-driven.'];
  }
  if (name === 'echo' || name === 'printf') {
    const redirectIndex = commandTokens.findIndex((token) => token === '>' || token === '>>');
    if (redirectIndex >= 0 && commandTokens[redirectIndex + 1]) {
      const file = normalizePath(state, commandTokens[redirectIndex + 1]);
      state.files.add(file);
      state.modified.add(file);
      return [
        `wrote ${name === 'printf' ? 'formatted' : 'text'} output to ${displayPath(state, file)} (simulated)`,
      ];
    }
    return [commandTokens.slice(1).join(' ')];
  }
  if (['grep', 'rg', 'find', 'sort', 'uniq', 'cut', 'tr', 'sed', 'awk', 'wc'].includes(name)) {
    return [
      `pipeline stage ${name}: 3 input records → 2 selected records (simulated)`,
      'INC-17 high open',
      'INC-21 low closed',
    ];
  }
  if (name === 'stat') {
    const raw = commandTokens.at(-1) ?? 'README.md';
    return [
      `File: ${raw}`,
      'Size: 128  Blocks: 8  IO Block: 4096 regular file',
      'Access: (0644/-rw-r--r--)  Uid: (1000/learner)  Gid: (1000/learner)',
    ];
  }
  if (name === 'ln' || name === 'readlink' || name === 'realpath') {
    return [`${name}: ${commandTokens.slice(1).join(' ')} → ${state.cwd}/README.md (simulated)`];
  }
  if (name === 'umask') {
    const value = operand(commandTokens);
    if (value) state.umask = value;
    return [state.umask];
  }
  if (['chmod', 'chown', 'chgrp', 'getfacl', 'setfacl', 'id', 'groups'].includes(name)) {
    return [
      `uid=1000(learner) gid=1000(learner) groups=1000(learner),27(lab)`,
      `${name}: permission model inspected or changed only in simulated state`,
    ];
  }
  if (['ps', 'pgrep', 'jobs', 'kill', 'nice', 'renice', 'nohup'].includes(name)) {
    return [
      'PID  PPID STAT NI COMMAND',
      '2201 2100 S     0 lab-worker',
      `${name}: process evidence simulated; no host signal was sent`,
    ];
  }
  if (name === 'systemctl') {
    const unit = commandTokens.at(-1) ?? 'lab-worker.service';
    return [
      `● ${unit} - LEARN-IT-ALL simulated service`,
      'Active: active (running)',
      'Result: success',
    ];
  }
  if (name === 'journalctl') {
    return [
      'Jul 14 09:00:00 lab systemd[1]: Started lab-worker.service',
      'Jul 14 09:00:01 lab lab-worker[2201]: readiness check passed',
    ];
  }
  if (['df', 'du', 'lsblk', 'mount', 'findmnt'].includes(name)) {
    return [
      'NAME   SIZE FSTYPE MOUNTPOINT USE%',
      'vda1    20G ext4   /           42%',
      `${name}: storage observation simulated; no host mount changed`,
    ];
  }
  if (['tar', 'gzip', 'gunzip', 'sha256sum'].includes(name)) {
    return [
      `${name}: archive or digest operation completed in simulated lab state`,
      'digest: 8d4c…a17e',
    ];
  }
  if (['env', 'printenv', 'export', 'set'].includes(name)) {
    return [
      `HOME=${HOME}`,
      `PWD=${state.cwd}`,
      'PATH=/usr/local/bin:/usr/bin:/bin',
      'LANG=C.UTF-8',
    ];
  }
  if (['man', 'help', 'type', 'command', 'which'].includes(name)) {
    const topic = commandTokens.at(-1) ?? 'bash';
    return [
      `${topic} — simulated help lookup`,
      'SYNOPSIS: inspect options, operands, exit status, and examples',
    ];
  }
  if (['apt', 'dnf', 'rpm', 'dpkg', 'pacman'].includes(name)) {
    return [
      `${name}: package metadata inspected in read-only simulation`,
      'package: lab-tool  version: 2.4.1  origin: signed-example-repository',
    ];
  }
  if (name === 'git') return simulateGit(commandTokens, state);
  return null;
}

function simulateNetworkCommand(command: string): string[] | null {
  const normalized = command.toLowerCase();
  const target = commandTarget(command);

  if (/^(ping|ping6)\b/.test(normalized)) {
    return [
      `PING ${target} (${SAMPLE_HOST}) 56 data bytes`,
      `64 bytes from ${SAMPLE_HOST}: icmp_seq=1 ttl=57 time=18.4 ms`,
      `--- ${target} ping statistics ---`,
      '1 packets transmitted, 1 received, 0% packet loss',
    ];
  }
  if (/^(traceroute|tracert|tracepath)\b/.test(normalized)) {
    return [
      `trace to ${target} (${SAMPLE_HOST}), 3 hops max`,
      '1  192.0.2.1   1.2 ms  access-gateway',
      '2  198.51.100.8  8.7 ms  transit-router',
      `3  ${SAMPLE_HOST}  18.4 ms  destination`,
    ];
  }
  if (/^(dig|nslookup|host)\b/.test(normalized)) {
    return [
      `QUESTION: ${target}. IN A`,
      `ANSWER: ${target}. 300 IN A ${SAMPLE_HOST}`,
      'STATUS: NOERROR; SERVER: 192.0.2.53#53',
    ];
  }
  if (/^(ip\s|ifconfig\b|ipconfig\b)/.test(normalized)) {
    return [
      'eth0: state UP mtu 1500',
      'inet 192.0.2.40/24 brd 192.0.2.255 scope global',
      'inet6 2001:db8:40::10/64 scope global',
      'default via 192.0.2.1 metric 100',
    ];
  }
  if (/^(ss\b|netstat\b)/.test(normalized)) {
    return [
      'State  Local Address:Port  Peer Address:Port  Process',
      'LISTEN 192.0.2.40:443      0.0.0.0:*          web-service',
      'ESTAB  192.0.2.40:51822    192.0.2.53:53      dns-client',
    ];
  }
  if (/^(arp\b|ip\s+neigh\b)/.test(normalized)) {
    return [
      '192.0.2.1 dev eth0 lladdr 02:00:5e:10:00:01 REACHABLE',
      '192.0.2.53 dev eth0 lladdr 02:00:5e:10:00:35 STALE',
    ];
  }
  if (/^(route\b|ip\s+route\b|netstat\s+-r\b)/.test(normalized)) {
    return [
      'default via 192.0.2.1 dev eth0 proto dhcp metric 100',
      '192.0.2.0/24 dev eth0 proto kernel scope link src 192.0.2.40',
    ];
  }
  if (/^(curl|wget)\b/.test(normalized)) {
    return [
      'HTTP/1.1 200 OK',
      'content-type: text/plain',
      'x-lab-path: simulated',
      '',
      'service ready',
    ];
  }
  if (/^(tcpdump|tshark)\b/.test(normalized)) {
    return [
      '10:24:12.031 IP 192.0.2.40.51822 > 192.0.2.53.53: UDP, length 42',
      '10:24:12.049 IP 192.0.2.53.53 > 192.0.2.40.51822: UDP, length 58',
    ];
  }
  if (/^nmap\b/.test(normalized)) {
    return [
      `Nmap scan report for ${target}`,
      'Host is up (0.018s latency).',
      'PORT    STATE SERVICE',
      '443/tcp open  https',
    ];
  }
  if (/^(show|display)\b/.test(normalized)) {
    return [
      'Device: LAB-RTR-01  uptime 14d 03h',
      'Interface Gi0/1  status up  protocol up',
      'Interface Gi0/2  status down  protocol down',
    ];
  }
  return null;
}

export function simulateTerminalCommands(source: string): string {
  const commands = source
    .split('\n')
    .map(cleanCommand)
    .filter((line) => line.length > 0 && !line.startsWith('#'));

  if (commands.length === 0) return 'Enter a diagnostic command, then run the simulation.';
  const state = initialState();
  return commands
    .flatMap((command) => {
      const output = simulateTerminalCommand(command, state) ??
        simulateNetworkCommand(command) ?? [
          'Command recorded; this simulator never executes learner shell input.',
          'Use the scenario evidence and checks to evaluate the command choice and syntax.',
        ];
      return [`${state.cwd}$ ${command}`, ...output, ''];
    })
    .join('\n')
    .trimEnd();
}

export const simulateNetworkCommands = simulateTerminalCommands;

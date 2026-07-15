const SPECS = {
  'git-advanced-state-revisions': {
    command: 'git rev-list --left-right --ancestry-path release...topic -- src/policy.ts',
    hypothesis: 'the audit mismatch is confined to commits reachable from exactly one reviewed tip',
    expected: 'left and right markers expose exclusive ancestry without moving a reference',
    observation:
      'two right-only policy commits and one left-only release fix define the review set',
    changed:
      'replace topic with topic^{tree} and reject the query because a tree has no commit ancestry',
    recovery: 'read-only query; retain refs/audit/before-query at the reviewed release tip',
    limit:
      'verify revision parsing against installed Git help before applying the query to a real repository',
  },
  'git-advanced-objects-storage-integrity': {
    command: 'git fsck --full --no-reflogs --unreachable',
    hypothesis:
      'the reported tree is unreachable but still present rather than corrupt or promised',
    expected:
      'fsck classifies connectivity and names candidate unreachable objects without pruning them',
    observation:
      'the candidate tree is present and reachable from the retained incident commit only',
    changed:
      'remove the retained incident root in the simulator and observe the commit become unreachable',
    recovery: 'create refs/recovery/integrity before any repack expiration or prune operation',
    limit:
      'quarantine and copy real object storage before repair because this simulator has no pack corruption',
  },
  'git-advanced-reflog-reachability-recovery': {
    command: 'git reflog show --date=iso --all',
    hypothesis:
      'the lost topic tip remains named by a local reflog entry inside the expiration window',
    expected:
      'the timeline reveals the prior topic ID and force-update operation independently of ancestry',
    observation:
      'topic@{1} names b00b1e5 before the forced update and its tree matches the missing feature',
    changed:
      'expire the topic name in the scenario and recover the candidate through fsck content evidence',
    recovery: 'create refs/recovery/lost-topic at b00b1e5 before inspecting or integrating it',
    limit: 'reflogs are local retention aids, not shared audit logs or backup guarantees',
  },
  'git-advanced-undo-layered-repair': {
    command: 'git reset --mixed HEAD^',
    hypothesis:
      'only the local tip ref and index must move while the working content stays available',
    expected:
      'HEAD moves one parent, the index resets, and working-tree changes remain for reconstruction',
    observation:
      'the local commit disappeared from main while its paths remain unstaged and recoverable',
    changed:
      'treat the same commit as published and choose revert instead of moving shared history',
    recovery:
      'retain refs/recovery/pre-undo at the original tip and verify reflog plus tree identity',
    limit:
      'preview untracked and ignored data separately before any real hard reset or clean operation',
  },
  'git-advanced-merge-bases-strategies': {
    command: 'git merge-base --all release topic',
    hypothesis: 'criss-cross integration yields more than one best common ancestor',
    expected:
      'all best bases are listed so a synthetic merge base and strategy risk can be reviewed',
    observation:
      'two incomparable bases make a single-base mental model unsafe for this integration',
    changed: 'linearize one side branch and observe the candidate set collapse to one merge base',
    recovery: 'preserve both tips under refs/integration/before-merge before testing a strategy',
    limit:
      'validate resulting behavior in an authorized disposable clone because graph evidence is not semantic proof',
  },
  'git-advanced-conflict-stages-rerere': {
    command: 'git ls-files --unmerged',
    hypothesis: 'the clean-looking file hides a stage-level rename and content conflict',
    expected:
      'stage 1 base, stage 2 ours, and stage 3 theirs identify exact objects for reconstruction',
    observation: 'all three policy blobs differ and the base path proves the rename context',
    changed:
      'reuse a recorded resolution on a changed conflict and require the combined behavior test to fail',
    recovery: 'record MERGE_HEAD and both branch tips before aborting or continuing the sequencer',
    limit: 'rerere output remains a proposal and must pass semantic changed-case verification',
  },
  'git-advanced-rebase-sequencer': {
    command: 'git range-diff refs/recovery/pre-rebase...HEAD',
    hypothesis: 'the rewrite preserved patch intent while changing parentage and commit identity',
    expected:
      'range-diff maps old and new patches and exposes reordered, amended, dropped, or new entries',
    observation: 'four patches map cleanly and one amended policy patch requires focused review',
    changed:
      'drop a dependency patch in the scenario and observe the downstream mapping and behavior diverge',
    recovery:
      'keep refs/recovery/pre-rebase until tree, tests, authorship, and publication review pass',
    limit: 'coordinate real shared-history rewrites and publish with an explicit lease expectation',
  },
  'git-advanced-cherry-pick-replay': {
    command: 'git cherry -v release security-fix',
    hypothesis:
      'one differently named backport is patch-equivalent and should not be replayed twice',
    expected:
      'minus marks likely equivalent patches while plus marks changes absent from the target',
    observation:
      'the parser fix is equivalent but the dependency-bound test remains target-specific work',
    changed:
      'alter context without changing the logical patch and compare heuristic patch IDs with behavior',
    recovery: 'tag each target pre-backport tip under refs/recovery before sequencer operations',
    limit: 'patch equivalence is heuristic and each supported runtime needs changed-platform tests',
  },
  'git-advanced-stash-wip-patches': {
    command: 'git stash push --staged --message urgent-policy-wip',
    hypothesis: 'only reviewed staged work should move while unstaged experiments remain visible',
    expected: 'the stash records staged state and the working tree keeps unrelated unstaged paths',
    observation:
      'policy changes moved to stash@{0} while the experiment remains unstaged for inspection',
    changed:
      'add an untracked credential fixture and reject include-untracked until secret review passes',
    recovery:
      'create a named branch or bundle for valuable work before expiring the temporary stash',
    limit:
      'inspect real ignored and untracked paths because stash can store sensitive bytes in Git objects',
  },
  'git-advanced-bisect-regression': {
    command: 'git bisect start bad-tip known-good -- src/parser.ts tests/parser.test.ts',
    hypothesis: 'the regression entered within the ancestry and path-limited candidate set',
    expected: 'bisect selects a midpoint while preserving explicit good and bad polarity',
    observation: 'the first trial halves 2400 candidates and records the tested object ID',
    changed:
      'mark an unbuildable midpoint skip and report the remaining adjacent candidate range honestly',
    recovery:
      'save git bisect log and reset to the original branch after retaining the regression probe',
    limit:
      'execute real historical code only in an isolated environment with bounded credentials and network',
  },
  'git-advanced-worktrees-parallel': {
    command: 'git worktree list --porcelain',
    hypothesis:
      'a stale administrative entry is locking the release branch after its directory moved',
    expected:
      'porcelain output separates paths, HEAD IDs, branches, lock reasons, and prunable state',
    observation:
      'the release worktree points to a missing path and is locked with a documented owner reason',
    changed: 'move the main repository path and require worktree repair before any prune decision',
    recovery:
      'lock valuable external worktrees and back up untracked outputs before administrative repair',
    limit:
      'worktrees share refs and objects, so concurrent real maintenance and rewrites need coordination',
  },
  'git-advanced-remotes-refspecs-leases': {
    command:
      'git push --dry-run --force-with-lease=refs/heads/main:b00b1e5 origin HEAD:refs/heads/main',
    hypothesis:
      'publication is safe only if remote main still equals the reviewed b00b1e5 lease value',
    expected:
      'the explicit source, destination, and expected old ID expose overwrite authority before mutation',
    observation:
      'the dry run accepts the exact mapping in simulation and records that no network changed',
    changed: 'advance remote main to c0ffee0 and require the explicit lease to reject publication',
    recovery:
      'retain the old and proposed remote IDs plus a local recovery ref before authorized push',
    limit: 'a real server may add receive policies and background fetch can change tracking refs',
  },
  'git-advanced-collaboration-stacks-maintainers': {
    command: 'git range-diff main...stack-v1 main...stack-v2',
    hypothesis:
      'the reroll changes only the requested validation patch and preserves stack dependencies',
    expected: 'old and new series map by patch identity with reordered and amended entries visible',
    observation: 'one patch changed, two map exactly, and the dependent tip moved to a new parent',
    changed:
      'reorder the dependency after its consumer and reject the stack despite an equal final tree',
    recovery:
      'retain both series refs and review comments until the integrated exact revision is published',
    limit:
      'provider merge queues need separate event, identity, permission, and tested-revision verification',
  },
  'git-advanced-tags-signatures-releases': {
    command: 'git verify-tag --raw v2.4.0',
    hypothesis:
      'the annotated tag is cryptographically valid but the signer still needs authorization review',
    expected:
      'verification exposes signed payload, fingerprint, algorithm, and validity independently of policy',
    observation:
      'the signature is valid and the key fingerprint maps to the current release-role allowlist',
    changed:
      'move the tag to an unsigned commit and require identity plus artifact provenance checks to fail',
    recovery:
      'preserve the observed tag object, target ID, transparency evidence, and artifact digest',
    limit:
      'signature validity alone does not prove key ownership, authorization, build, or delivered bytes',
  },
  'git-advanced-submodules-boundaries': {
    command: 'git submodule status --recursive',
    hypothesis:
      'the release mismatch comes from an uninitialized nested gitlink rather than branch drift',
    expected:
      'prefixes and object IDs expose initialized, mismatched, and conflicted nested states',
    observation: 'the parser submodule is uninitialized and its recorded gitlink names c0ffee0',
    changed:
      'make the referenced dependency commit unreachable remotely and fail the release transfer gate',
    recovery: 'archive superproject and reachable dependency refs before URL or gitlink migration',
    limit: 'never execute untrusted nested hooks, builds, or recursive commands outside isolation',
  },
  'git-advanced-partial-sparse-scale': {
    command: 'git sparse-checkout list',
    hypothesis: 'the failing build omits a required shared package from the declared cone',
    expected:
      'the active sparse paths expose the intended working set without claiming object completeness',
    observation:
      'apps/status is present while packages/shared is absent from the build working set',
    changed:
      'add packages/shared and repeat both sparse-index status and full-object release verification',
    recovery:
      'retain the prior sparse specification and support disabling sparse checkout reversibly',
    limit:
      'full release and offline recovery need explicit promised-object and promisor-availability checks',
  },
  'git-advanced-attributes-filters-merges': {
    command: 'git check-attr --all -- scripts/release.sh',
    hypothesis: 'a directory-level attribute overrides expected line-ending and filter policy',
    expected:
      'the effective text, eol, filter, diff, and merge states are reported for the exact path',
    observation:
      'release.sh is text with eol=crlf because a nearer attribute rule overrides root policy',
    changed:
      'remove the required filter tool and require checkout to fail instead of silently losing data',
    recovery: 'record byte digests before renormalization and retain the pre-migration ref',
    limit: 'test real filters and encodings across supported platforms in disposable clones',
  },
  'git-advanced-hooks-config-trust': {
    command:
      'git config --show-origin --show-scope --get-regexp "^(core|credential|include|safe)\\."',
    hypothesis:
      'conditional user configuration injects a credential helper and hooks path for this repository',
    expected:
      'scope and origin identify the exact protected or local source of each effective value',
    observation:
      'a global includeIf sets credential.helper while local core.hooksPath points into repository data',
    changed: 'change repository ownership and refuse a wildcard safe.directory exception',
    recovery:
      'capture effective config, remove narrow trust grants, and rotate any exposed credential',
    limit:
      'inspect unknown repositories in isolation with hooks, filters, aliases, and external helpers disabled',
  },
  'git-advanced-maintenance-performance': {
    command: 'git maintenance run --task=commit-graph --task=incremental-repack',
    hypothesis:
      'measured history walks and pack fanout justify two incremental tasks without immediate pruning',
    expected:
      'commit graph and pack layout update while reachable objects and active writers remain protected',
    observation:
      'history latency drops and connectivity remains valid with no unreachable-object deletion',
    changed:
      'introduce a concurrent writer and defer destructive expiration while retaining maintenance logs',
    recovery:
      'verify a fresh bundle restore and preserve previous pack indexes before manual repair',
    limit:
      'benchmark and schedule real maintenance per filesystem, Git version, repository size, and uptime need',
  },
  'git-advanced-hash-transition-disaster': {
    command: 'git rev-parse --show-object-format=storage,input,output',
    hypothesis:
      'the repository stores SHA-256 objects while one integration still assumes 40-character IDs',
    expected:
      'format evidence separates storage identity from accepted input and displayed output formats',
    observation:
      'storage reports sha256 and the audit parser fails its fixed-width object-ID contract',
    changed:
      'restore a bundle into a fresh same-format repository and reject an incompatible toolchain',
    recovery:
      'preserve trusted refs, object stores, translation data, manifests, and exact loss accounting',
    limit:
      'object-format migration and Git 3.0 rollout require current hosting and tool compatibility trials',
  },
};

function specFor(moduleId) {
  const spec = SPECS[moduleId];
  if (!spec) throw new Error(`Missing Advanced Git evidence specification for ${moduleId}`);
  return spec;
}

export function gitAdvancedScenario(moduleId, seed, activityKind) {
  const spec = specFor(moduleId);
  const caseId = (seed % 89) + 11;
  return `Case G${caseId} is a ${activityKind} in a disposable repository. ${spec.hypothesis}. The learner must predict ${spec.expected}, run ${spec.command}, explain ${spec.observation}, test this changed condition: ${spec.changed}, and preserve this recovery boundary: ${spec.recovery}.`;
}

export function gitAdvancedWorkedExample(moduleId, seed) {
  const spec = specFor(moduleId);
  const variant = (seed % 4) + 1;
  return `# Advanced Git 2.55 deterministic scenario ${variant}\n# before-ref: main=a11ce00 candidate=b00b1e5\n# hypothesis: ${spec.hypothesis}\n${spec.command}\n# expected: ${spec.expected}\n# observation: ${spec.observation}\n# changed-case: ${spec.changed}\n# after-ref: main=a11ce00 candidate=b00b1e5\n# tree-proof: compare the exact affected tree and paths before judging success\n# behavior-proof: retain a changed-case test or invariant that can falsify the Git-only conclusion\n# recovery: ${spec.recovery}\n# transfer-limit: ${spec.limit}`;
}

export function gitAdvancedEvidenceContract({ moduleId, marker, suffix }) {
  const spec = specFor(moduleId);
  const before = `main=a11ce${suffix.slice(0, 2)} candidate=b00b1${suffix.slice(-2)}`;
  const after = `main=a11ce${suffix.slice(0, 2)} candidate=c0ffee${suffix.slice(-1)}`;
  const reversed = [...suffix].reverse().join('');
  const rotated = `${suffix.slice(2)}${suffix.slice(0, 2)}`;
  const withinEvidenceBlock = '(?:(?!# Evidence:)[\\s\\S])';
  return {
    marker,
    pattern: `${marker}${withinEvidenceBlock}*?#\\s*before-ref:\\s*[^\\n]{12,}${withinEvidenceBlock}*?#\\s*hypothesis:\\s*[^\\n]{12,}${withinEvidenceBlock}*?git\\s+(?:rev-list|rev-parse|fsck|reflog|reset|merge-base|ls-files|range-diff|cherry|stash|bisect|worktree|push|verify-tag|submodule|sparse-checkout|check-attr|config|maintenance)[^\\n]*${withinEvidenceBlock}*?#\\s*expected:\\s*[^\\n]{12,}${withinEvidenceBlock}*?#\\s*observation:\\s*[^\\n]{12,}${withinEvidenceBlock}*?#\\s*changed-case:\\s*[^\\n]{12,}${withinEvidenceBlock}*?#\\s*after-ref:\\s*[^\\n]{12,}${withinEvidenceBlock}*?#\\s*tree-proof:\\s*[^\\n]{12,}${withinEvidenceBlock}*?#\\s*behavior-proof:\\s*[^\\n]{12,}${withinEvidenceBlock}*?#\\s*recovery:\\s*[^\\n]{12,}${withinEvidenceBlock}*?#\\s*transfer-limit:\\s*[^\\n]{12,}`,
    example: `${marker}\n# scenario-key: trace-${suffix} probe-${reversed} boundary-${rotated} owner-${suffix}x fault-${suffix}z\n# before-ref: ${before}\n# hypothesis: ${spec.hypothesis}\n${spec.command}\n# expected: ${spec.expected}\n# observation: ${spec.observation}\n# changed-case: ${spec.changed}\n# after-ref: ${after}\n# tree-proof: the affected tree and path set match the predicted repository transition\n# behavior-proof: a changed input preserves the named product or release invariant\n# recovery: ${spec.recovery}\n# transfer-limit: ${spec.limit}`,
    requirement: `Append an Advanced Git evidence block headed "${marker}" with exact before and after refs; a falsifiable prediction; the bounded simulator command; expected, observed, tree, behavior, changed-case, and recovery evidence; and one honest real-repository transfer limit.`,
  };
}

export const gitAdvancedModuleIds = Object.freeze(Object.keys(SPECS));

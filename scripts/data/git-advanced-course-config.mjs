import { finalizeCourse, module, project, skill } from './course-config-helpers.mjs';

const REVIEWED_AT = '2026-07-14';
const RESEARCHED_AT = '2026-07-14T19:30:00.000Z';

const IMPLIED_MISCONCEPTIONS = {
  'gita-lost-tip-discovery':
    'Running gc first makes lost commits easier to discover because it organizes every object.',
  'gita-restore-source-staged-worktree':
    'git restore always changes HEAD together with the selected file content.',
  'gita-fastforward-noff-ffonly':
    'A fast-forward is determined by whether branch names share the same prefix.',
  'gita-conflict-taxonomy':
    'Every conflict can be completely diagnosed by reading only textual conflict markers.',
  'gita-semantic-resolution-invariants':
    'Removing all conflict markers proves the combined behavior preserves both sides.',
  'gita-rebase-onto-ranges':
    '--onto selects every commit reachable from the branch, including the upstream history.',
  'gita-interactive-todo-actions':
    'Interactive rebase actions may be reordered freely because the final tree is all reviewers need.',
  'gita-cherry-pick-set-order':
    'Multiple cherry-pick arguments are always replayed in command-line order regardless of revision traversal.',
  'gita-cherry-pick-mainline-empty':
    '--mainline chooses which branch name should receive the resulting commit.',
  'gita-stash-push-scope':
    'A path-limited stash cannot capture secrets because it does not create Git objects.',
  'gita-format-patch-am-bundle':
    'A plain diff preserves authorship, commit messages, prerequisite history, and signatures exactly like a bundle.',
  'gita-bisect-start-range-paths':
    'The bad endpoint should be the parent of the suspected change rather than a revision that demonstrates the failure.',
  'gita-bisect-run-exit-contract':
    'Any nonzero test exit means bad, so setup failures and timeouts need no separate contract.',
  'gita-bisect-skip-flaky-merge':
    'Skipping a trial preserves ordinary binary-search certainty and still identifies one exact first bad commit.',
  'gita-worktree-add-lock-move':
    'Moving a linked worktree directory manually updates its administrative link automatically.',
  'gita-worktree-branch-exclusivity':
    'Linked worktrees isolate branch refs, so rewriting main in one cannot affect another.',
  'gita-worktree-prune-repair':
    'Every missing worktree directory is abandoned and safe to prune immediately.',
  'gita-fetch-negotiation-prune-tags':
    '--prune deletes local branches and every tag absent from the remote.',
  'gita-push-fastforward-rules':
    'All namespaces use the same commit fast-forward rule and servers cannot impose stricter policy.',
  'gita-stacked-change-dependencies':
    'A stack is independently reviewable whenever its final tip builds, even if intermediate commits do not.',
  'gita-range-diff-review-reroll':
    'Range-diff proves semantic equivalence whenever old and new patches receive an equals marker.',
  'gita-maintainer-topic-integration':
    'A maintainer workflow is defined entirely by branch names rather than authority and evidence flow.',
  'gita-integration-queue-staleness':
    'Testing a pull request once keeps that evidence valid after its base and queue batch change.',
  'gita-tag-object-peeling':
    'An annotated tag points directly to file content and cannot target another tag or non-commit object.',
  'gita-signature-formats-trust':
    'A cryptographically valid signature proves the signer was authorized for that release.',
  'gita-signed-commit-merge-push':
    'Signing a push retroactively signs every commit and tree reachable from the updated ref.',
  'gita-tag-publication-movement':
    'Tags fetched once are immutable locally and remotely unless the object database is corrupt.',
  'gita-submodule-init-update-sync':
    'git submodule update --remote always records and publishes a new superproject gitlink automatically.',
  'gita-submodule-change-publication':
    'Publishing the superproject first guarantees the referenced submodule commit is available to every clone.',
  'gita-submodule-security-credentials':
    '.gitmodules is inert data and cannot influence protocols, paths, credentials, or recursive execution.',
  'gita-shallow-partial-sparse-distinction':
    'Shallow, partial, and sparse clones omit the same data and differ only in command syntax.',
  'gita-sparse-cone-noncone':
    'Skip-worktree is a promise that Git will never materialize or inspect the path.',
  'gita-large-repo-performance-evidence':
    'Repository size alone identifies the optimization and makes task-level measurements unnecessary.',
  'gita-text-normalization-renormalize':
    'Setting text=auto rewrites all existing index entries and safely fixes line endings without review.',
  'gita-diff-merge-driver-contract':
    'A custom diff driver changes stored blob bytes and therefore defines merge correctness.',
  'gita-config-origin-scope-include':
    'git config --list reports values in decisive precedence order, so origin and scope are unnecessary.',
  'gita-safe-directory-ownership':
    'safe.directory=* changes filesystem ownership and therefore repairs unsafe repository permissions.',
  'gita-hooks-lifecycle-bypass':
    'A committed hooks directory creates an unavoidable server-enforced policy for every contributor.',
  'gita-credential-helper-boundary':
    'Credential helpers match only host names and never vary by protocol, username, path, or configured context.',
  'gita-gc-repack-prune-safety':
    'git gc only compresses reachable data and can never expire recovery objects or race another process.',
  'gita-maintenance-tasks-schedule':
    'Enabling every maintenance task at the shortest interval always improves repository performance.',
  'gita-commitgraph-bloom-midx':
    'Commit graphs and Bloom filters change reachability truth rather than accelerate selected queries.',
  'gita-fsmonitor-untracked-cache-index':
    'Filesystem monitoring is a universal correctness layer and never needs platform or invalidation checks.',
  'gita-compat-object-format-transition':
    'A compatibility object format lets one repository switch storage hashes back and forth without rewriting objects.',
  'gita-disaster-recovery-runbook':
    'Fetching from origin is a complete repair because remotes necessarily contain every local ref, object, and release artifact.',
};

function outcome(
  id,
  statement,
  misconception = IMPLIED_MISCONCEPTIONS[id],
  knowledgeType = 'procedural',
  level = 'apply'
) {
  if (!misconception) throw new Error(`Missing misconception for Advanced Git competency ${id}`);
  return skill(id, statement, misconception, knowledgeType, level);
}

function advancedModule(id, title, context, artifact, skills) {
  return {
    ...module(id, title, context, artifact, skills),
    contexts: {
      theory: context,
      workshop: `A pairing session predicts each repository-state transition before building the first ${artifact} for ${title.toLowerCase()}.`,
      debug: `A responder inherits a plausible but defective ${artifact}; preserve reachable history, isolate the first causal Git-state mismatch, and retain a regression probe.`,
      lab: `An independent maintainer receives a different graph, repository policy, and failure constraint and must transfer ${title.toLowerCase()} into a new ${artifact}.`,
      review: `A delayed handoff reconstructs ${title.toLowerCase()} from terse repository evidence, challenges one retained misconception, and revises the ${artifact}.`,
      quiz: `A maintainer review compares near-miss operations for ${title.toLowerCase()} and requires the smallest safe ${artifact} with topology and content evidence.`,
    },
  };
}

const modules = [
  advancedModule(
    'git-advanced-state-revisions',
    'Repository State, References, and Revision Algebra',
    'A release repository uses symbolic refs, detached work, replace refs, ambiguous names, and complex revision sets; a maintainer must answer an audit question without moving any ref.',
    'repository-state and revision-query proof',
    [
      outcome(
        'gita-ref-symbolic-pseudoref',
        'Distinguish direct refs, symbolic refs, pseudorefs, remote-tracking refs, packed refs, and detached HEAD using plumbing evidence.',
        'Every ref is a loose text file under .git/refs.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'gita-revision-resolution-disambiguation',
        'Resolve revision names and disambiguate refs, object IDs, paths, reflog selectors, and peel operators before an operation.',
        'A short token is interpreted as a branch whenever a matching branch exists.'
      ),
      outcome(
        'gita-revision-set-algebra',
        'Construct inclusive, exclusive, symmetric-difference, ancestry, parent, and path-limited revision sets for an exact question.',
        'A..B and A...B select the same commits and differ only in patch formatting.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'gita-ancestry-first-parent',
        'Use parent selection, first-parent history, generation, and merge-base evidence without confusing display order with causality.',
        'The first commit printed by log is necessarily the direct cause of the observed change.'
      ),
      outcome(
        'gita-readonly-forensic-baseline',
        'Capture repository boundaries, object format, refs, worktrees, index state, operation state, and recovery anchors before investigation.',
        'A clean working tree is a complete forensic baseline.',
        'professional',
        'create'
      ),
    ]
  ),
  advancedModule(
    'git-advanced-objects-storage-integrity',
    'Objects, Packfiles, Reachability, and Integrity',
    'A long-lived repository grows unexpectedly, contains unreachable objects, and reports a missing tree after interrupted maintenance; the team needs causal storage evidence before cleanup.',
    'object-database integrity and reachability report',
    [
      outcome(
        'gita-object-graph-invariants',
        'Trace blobs, trees, commits, annotated tags, parent edges, and reference roots as an immutable reachable object graph.',
        'A commit contains file contents directly instead of naming a root tree.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'gita-loose-pack-delta-storage',
        'Explain loose objects, pack indexes, delta bases, multi-pack indexes, and why storage representation does not change object identity.',
        'A deltified object has an ID derived from its delta instructions.'
      ),
      outcome(
        'gita-reachability-unreachable-dangling',
        'Distinguish reachable, unreachable, dangling, promised, missing, and corrupt objects using fsck and reference evidence.',
        'Every dangling object is corrupt and should be deleted immediately.'
      ),
      outcome(
        'gita-object-inspection-batch',
        'Use rev-parse, cat-file, verify-pack, count-objects, and batch inspection to answer bounded questions without checkout or execution.',
        'git show is the safest and complete inspector for every object and storage problem.'
      ),
      outcome(
        'gita-integrity-preservation',
        'Quarantine suspect storage, preserve alternate copies and refs, verify object connectivity, and defer destructive pruning until recovery proof exists.',
        'Running gc is an appropriate first repair for a missing-object report.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  advancedModule(
    'git-advanced-reflog-reachability-recovery',
    'Reflogs, Reachability Windows, and Recovery',
    'A force update and expired topic branch hide two weeks of work while automatic maintenance approaches; recovery must preserve candidate objects and establish exact provenance.',
    'reflog-led recovery timeline and retained ref',
    [
      outcome(
        'gita-reflog-scope-lifetime',
        'Explain per-ref and HEAD reflogs, selector syntax, creation policy, worktree scope, expiration categories, and configuration.',
        'Reflogs are shared remotely and provide a permanent repository audit log.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'gita-reflog-timeline-causality',
        'Correlate ref updates, checkout history, operation messages, timestamps, actors, and graph evidence without treating reflog order as commit ancestry.',
        'HEAD@{1} always means the parent of the current commit.'
      ),
      outcome(
        'gita-lost-tip-discovery',
        'Discover lost tips with reflog, fsck, object inspection, and known content while avoiding commands that may expire or prune candidates.'
      ),
      outcome(
        'gita-recovery-ref-validation',
        'Create a protective ref, inspect recovered tree and history, compare intended content, and validate changed behavior before integration.',
        'Finding the old object ID completes recovery even when its tree and lineage are unverified.'
      ),
      outcome(
        'gita-expiration-retention-policy',
        'Design reflog expiration, gc grace, backup, and incident policy from collaboration and compliance needs without promising archival durability.',
        'Increasing reflog expiry converts local Git storage into a verified backup.',
        'professional',
        'create'
      ),
    ]
  ),
  advancedModule(
    'git-advanced-undo-layered-repair',
    'Layered Undo with Restore, Reset, Revert, and References',
    'An incident spans unstaged edits, staged policy, three local commits, one published merge, and a release tag; each layer requires a different reversible repair.',
    'layer-by-layer undo decision and verification matrix',
    [
      outcome(
        'gita-undo-layer-classification',
        'Classify the affected worktree, index, ref, graph, published history, and deployed-state layers before selecting an undo operation.',
        'Undo is one Git operation whose only variable is the target commit.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'gita-restore-source-staged-worktree',
        'Use restore source, staged, worktree, pathspec, patch, and conflict-stage controls while preserving unrelated changes.'
      ),
      outcome(
        'gita-reset-modes-paths',
        'Predict soft, mixed, hard, merge, keep, path-limited, and intent-to-add reset effects on HEAD, index, and worktree.',
        'git reset --hard affects only tracked files and therefore cannot destroy important work.'
      ),
      outcome(
        'gita-revert-mainline-sequence',
        'Revert ordinary commits, ranges, and merges with explicit mainline parent, sequencer handling, semantic tests, and publication evidence.',
        'Reverting a merge makes Git forget that the merged branch was ever integrated.'
      ),
      outcome(
        'gita-undo-recovery-verification',
        'Preserve refs or patches, preview affected paths and commits, perform the smallest repair, and verify topology, content, behavior, and remote impact.',
        'A successful exit status proves the undo restored the intended system behavior.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  advancedModule(
    'git-advanced-merge-bases-strategies',
    'Merge Bases, Topology, and Integration Strategies',
    'Two release lines contain criss-cross merges, a reverted integration, rename-heavy work, and policy requiring explainable ancestry; the integrator must choose and defend topology.',
    'merge topology and strategy decision record',
    [
      outcome(
        'gita-merge-base-multiple',
        'Compute one or multiple best common ancestors, octopus bases, fork points, and independent tips for complex graphs.',
        'Every pair of commits has exactly one merge base.'
      ),
      outcome(
        'gita-fastforward-noff-ffonly',
        'Choose fast-forward, no-ff, ff-only, or refusal from release policy and graph evidence rather than branch-name folklore.'
      ),
      outcome(
        'gita-ort-strategy-options',
        'Evaluate ort strategy behavior and bounded options for renames, whitespace, subtree shifts, and favoring conflict hunks without replacing semantic review.',
        'The ours strategy and the -X ours option preserve the same tree and history.'
      ),
      outcome(
        'gita-octopus-subtree-integration',
        'Recognize when octopus, subtree, or unrelated-history integration is appropriate and when staged pairwise review is safer.',
        'Octopus merge is a general conflict-resolution tool for many active feature branches.'
      ),
      outcome(
        'gita-merge-result-defense',
        'Verify merge parents, combined diff, resulting tree, tests, release invariants, signatures, and rollback path before publication.',
        'A conflict-free merge proves both sides remain behaviorally compatible.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  advancedModule(
    'git-advanced-conflict-stages-rerere',
    'Conflict Stages, Semantic Resolution, and Rerere',
    'A repeated long-running integration conflicts across generated code, renamed policy files, and tests; previous manual resolutions are inconsistent and one clean textual result changes behavior.',
    'three-stage conflict and rerere resolution dossier',
    [
      outcome(
        'gita-index-conflict-stages',
        'Inspect stage 1 base, stage 2 ours, stage 3 theirs, unmerged entries, and higher-order conflict metadata before editing.',
        'Conflict markers contain all base, rename, mode, and stage evidence needed for resolution.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'gita-conflict-taxonomy',
        'Distinguish content, add/add, delete/modify, rename, directory/file, binary, mode, submodule, and recursive conflicts and select evidence for each.'
      ),
      outcome(
        'gita-semantic-resolution-invariants',
        'Reconstruct intent from base and both histories, produce a semantic combined result, and test invariants that neither side tested alone.'
      ),
      outcome(
        'gita-rerere-record-reuse',
        'Enable, inspect, forget, retrain, and validate rerere preimages and postimages while understanding automatic staging and retention.',
        'Rerere records a universal correct answer keyed only by pathname.'
      ),
      outcome(
        'gita-conflict-regression-handoff',
        'Record conflict cause, chosen invariant, rerere provenance, changed-case tests, and abort or continuation evidence for future integrators.',
        'Once rerere applies cleanly, human and behavioral review are redundant.',
        'professional',
        'create'
      ),
    ]
  ),
  advancedModule(
    'git-advanced-rebase-sequencer',
    'Rebase, Sequencer, Autosquash, and Topology Preservation',
    'A stacked change series must move between release bases, preserve selected merges, reorder dependent commits, and satisfy a review policy without losing authorship or test evidence.',
    'rebase todo, mapping, and equivalence proof',
    [
      outcome(
        'gita-rebase-replay-model',
        'Model rebase as commit selection, temporary reset, ordered replay, new object creation, and ref movement rather than branch movement magic.',
        'Rebase moves existing commit objects to new parents without changing their IDs.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'gita-rebase-onto-ranges',
        'Use --onto, upstream, branch, fork-point, and explicit revision sets to select exactly which commits move and where.'
      ),
      outcome(
        'gita-interactive-todo-actions',
        'Use pick, reword, edit, squash, fixup, exec, drop, break, label, reset, and merge actions while preserving dependency order.'
      ),
      outcome(
        'gita-autosquash-merges-update-refs',
        'Evaluate autosquash, rebase-merges, update-refs, autostash, empty-commit, and backend tradeoffs against collaboration policy.',
        'Combining every convenience flag always produces the safest and most faithful rewrite.'
      ),
      outcome(
        'gita-rebase-equivalence-recovery',
        'Protect the old tip, inspect rewritten mapping, compare patch series and trees with range-diff, test changed behavior, and recover from abort or error.',
        'Equal final trees prove a rewrite preserved reviewable intent and authorship.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  advancedModule(
    'git-advanced-cherry-pick-replay',
    'Cherry-Pick, Replay, Patch Equivalence, and Backports',
    'A security fix must be backported across three maintained lines where commits differ, one patch is already present under a new ID, and the original series includes a merge.',
    'multi-line backport and patch-equivalence record',
    [
      outcome(
        'gita-cherry-pick-set-order',
        'Select and order commits for cherry-pick using explicit revision traversal while distinguishing argument order from revision-walk order.'
      ),
      outcome(
        'gita-cherry-pick-mainline-empty',
        'Handle merge mainline, empty, redundant, no-commit, signoff, and conflict continuation choices with release-policy evidence.'
      ),
      outcome(
        'gita-patch-id-equivalence',
        'Use patch-id, cherry marks, range-diff, and tree comparisons to detect likely equivalent changes while naming heuristic limits.',
        'Matching commit messages or issue IDs prove two patches are equivalent.'
      ),
      outcome(
        'gita-replay-plumbing-boundary',
        'Explain current git replay behavior, ref-update output, supported options, and why experimental plumbing needs version-gated adoption.',
        'git replay is a drop-in replacement for every interactive rebase workflow.'
      ),
      outcome(
        'gita-backport-verification',
        'Verify source provenance, target applicability, conflicts, changed-platform behavior, release notes, signatures, and rollback for each supported line.',
        'A clean cherry-pick means the fix is complete on an older dependency and runtime stack.',
        'professional',
        'create'
      ),
    ]
  ),
  advancedModule(
    'git-advanced-stash-wip-patches',
    'Stash Internals, Partial Work, and Portable Patches',
    'An urgent repair interrupts mixed staged, unstaged, untracked, and ignored experiments; some work must remain visible, some move across clones, and no secret may enter an object.',
    'work-in-progress preservation and transfer ledger',
    [
      outcome(
        'gita-stash-object-model',
        'Inspect stash commit structure, parents, refs, reflog, staged state, and untracked representation instead of treating a stash as an external bag.',
        'Stashed changes live outside the object database and cannot affect retention.'
      ),
      outcome(
        'gita-stash-push-scope',
        'Use pathspec, patch, staged, keep-index, include-untracked, and all controls while previewing secret and ignored-file consequences.'
      ),
      outcome(
        'gita-stash-apply-pop-branch',
        'Choose apply, pop, branch, store, create, export, or import from collision risk, portability, and retention needs.',
        'pop is always preferable because successful cleanup proves the stash is no longer needed.'
      ),
      outcome(
        'gita-format-patch-am-bundle',
        'Compare stash, diff, format-patch/am, and bundle transfer by metadata, prerequisites, reviewability, trust, and connectivity.'
      ),
      outcome(
        'gita-wip-recovery-policy',
        'Create named durable refs or encrypted external backups for important work, verify restoration on a changed base, and expire temporary objects deliberately.',
        'A stash is an appropriate durable backup and collaboration channel.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  advancedModule(
    'git-advanced-bisect-regression',
    'Bisect, Reproducible Diagnosis, and Automated Regression Search',
    'A nondeterministic performance regression lies within 2,400 commits, skips unbuildable revisions, depends on generated assets, and may have entered on a merged side branch.',
    'reproducible bisect harness and causal report',
    [
      outcome(
        'gita-bisect-search-invariant',
        'Explain binary search over candidate ancestry, good and bad polarity, convergence, and the assumptions that make a reported first bad commit meaningful.',
        'Bisect tests commits in timestamp order and always needs exactly log2(n) trials.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'gita-bisect-start-range-paths',
        'Define known good and bad endpoints, path limits, terms, first-parent choices, and ancestry validity before the first trial.'
      ),
      outcome(
        'gita-bisect-run-exit-contract',
        'Build a hermetic bisect run harness with explicit exit meanings, timeouts, cleanup, logs, deterministic fixtures, and no unsafe repository code execution.'
      ),
      outcome(
        'gita-bisect-skip-flaky-merge',
        'Handle untestable commits, flaky observations, merge topology, multiple introduction paths, and inconclusive adjacent candidates honestly.'
      ),
      outcome(
        'gita-bisect-cause-verification',
        'Reproduce the boundary, inspect the candidate diff and dependencies, revert or patch experimentally, retain a regression test, and distinguish correlation from cause.',
        'The commit printed by bisect is automatically the root cause and its author owns the incident.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  advancedModule(
    'git-advanced-worktrees-parallel',
    'Linked Worktrees and Parallel Branch Operations',
    'A maintainer must review a patch, repair production, compare two releases, and build documentation simultaneously without repeated checkout or duplicated object storage.',
    'multi-worktree ownership and cleanup map',
    [
      outcome(
        'gita-worktree-common-perworktree',
        'Distinguish common repository data from per-worktree HEAD, index, refs, operation state, config, and administrative links.',
        'Each linked worktree contains an independent clone and object database.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'gita-worktree-add-lock-move',
        'Add branch, detached, orphan, and relative-path worktrees; then lock, unlock, repair, and move them with path and device constraints.'
      ),
      outcome(
        'gita-worktree-branch-exclusivity',
        'Reason about checked-out branch exclusivity, shared refs, concurrent fetch or maintenance, and safe cross-worktree branch deletion and rewrite.'
      ),
      outcome(
        'gita-worktree-prune-repair',
        'Identify stale administrative entries, missing paths, moved repositories, expiration, and prunable worktrees before repair or cleanup.'
      ),
      outcome(
        'gita-parallel-operation-policy',
        'Design named purpose, directory, branch, owner, lock, tool-cache, secret, cleanup, and handoff rules for parallel work.',
        'Worktrees isolate hooks, config, ignored build outputs, and secrets by default.',
        'professional',
        'create'
      ),
    ]
  ),
  advancedModule(
    'git-advanced-remotes-refspecs-leases',
    'Remotes, Refspecs, Pruning, and Safe Publication',
    'A mirror, fork, upstream, deployment remote, and namespace-specific integration ref disagree after a rewrite; one stale client may overwrite reviewed work.',
    'distributed ref mapping and publication safety plan',
    [
      outcome(
        'gita-refspec-source-destination',
        'Parse positive and negative fetch and push refspecs, wildcard mappings, force markers, deletion, matching, and configured defaults.',
        'origin/main is a live alias that automatically follows the remote branch.'
      ),
      outcome(
        'gita-fetch-negotiation-prune-tags',
        'Reason about advertised refs, negotiation, shallow or filtered boundaries, tag following, prune, prune-tags, and remote-tracking updates.'
      ),
      outcome(
        'gita-push-fastforward-rules',
        'Predict fast-forward acceptance by namespace and object type and distinguish local preflight from server receive policy.'
      ),
      outcome(
        'gita-force-with-lease-atomic',
        'Use explicit force-with-lease expectations, force-if-includes, atomic push, dry-run, and signed-push evidence while accounting for background fetch.',
        'Bare --force-with-lease is a permanent guarantee that unseen remote work cannot be lost.'
      ),
      outcome(
        'gita-multi-remote-publication',
        'Capture remote URLs, authentication boundary, exact source and destination, expected old and new IDs, server result, and post-fetch verification.',
        'A successful push proves every collaborator and deployment now observes the same ref.',
        'professional',
        'create'
      ),
    ]
  ),
  advancedModule(
    'git-advanced-collaboration-stacks-maintainers',
    'Stacked Changes, Maintainer Workflows, and Integration Queues',
    'A distributed project receives dependent reviews, rerolls, hotfixes, subsystem branches, and release candidates from contributors with different trust and access.',
    'stacked-change and maintainer integration protocol',
    [
      outcome(
        'gita-stacked-change-dependencies',
        'Represent dependent changes as explicit base and tip relationships, keep each review independently testable, and update downstream stacks after revision.'
      ),
      outcome(
        'gita-range-diff-review-reroll',
        'Use range-diff and interdiff-style evidence to explain rerolls, reordered commits, changed commit messages, and semantic deltas between series.'
      ),
      outcome(
        'gita-maintainer-topic-integration',
        'Compare topic-branch, integration-branch, subsystem, patch-flow, merge-queue, and release-train workflows by authority and recovery cost.'
      ),
      outcome(
        'gita-integration-queue-staleness',
        'Model base freshness, batch size, speculative testing, queue invalidation, required evidence, and starvation without hiding the exact integrated revision.'
      ),
      outcome(
        'gita-collaboration-policy-defense',
        'Define authorship, signoff, review, update, merge, rewrite, rollback, deletion, archival, and exception rules with observable enforcement.',
        'One universal branching model is best for every project size, release cadence, and trust structure.',
        'professional',
        'create'
      ),
    ]
  ),
  advancedModule(
    'git-advanced-tags-signatures-releases',
    'Tags, Signatures, Verification, and Release Identity',
    'A release tag moved, a lightweight tag shadowed a branch name, signatures use different formats, and an artifact claims a source revision that was never built.',
    'release reference, signature, and artifact provenance packet',
    [
      outcome(
        'gita-tag-object-peeling',
        'Distinguish lightweight refs from annotated tag objects, nested tags, peeling, target types, messages, tagger identity, and replacement risk.'
      ),
      outcome(
        'gita-signature-formats-trust',
        'Verify supported GPG, SSH, or X.509 signatures while separating cryptographic validity, key identity, trust policy, authorization, and time evidence.'
      ),
      outcome(
        'gita-signed-commit-merge-push',
        'Compare signed commits, tags, merges, and pushes by what is covered, who verifies them, and which server or client policy applies.'
      ),
      outcome(
        'gita-tag-publication-movement',
        'Fetch and push tags explicitly, detect movement and namespace collisions, handle deletion, and apply immutable-release policy without assuming universal enforcement.'
      ),
      outcome(
        'gita-release-source-artifact-link',
        'Bind reviewed source, verified tag target, clean reproducible build, artifact digest, attestation, publication record, and rollback ref.',
        'A valid signed tag proves which artifact bytes users received and that the build was reproducible.',
        'professional',
        'create'
      ),
    ]
  ),
  advancedModule(
    'git-advanced-submodules-boundaries',
    'Submodules, Nested Repositories, and Dependency Boundaries',
    'A product pins three component repositories, one URL moved, a fork rewrites a dependency, recursive checkout executes untrusted configuration, and release builds disagree on nested state.',
    'submodule dependency and trust manifest',
    [
      outcome(
        'gita-gitlink-superproject-model',
        'Explain gitlink entries, superproject commits, submodule repositories, checked-out commits, .gitmodules, local config, and detached submodule HEAD.',
        'A submodule stores another repository and its full branch state inside the superproject commit.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'gita-submodule-init-update-sync',
        'Predict init, update, sync, set-url, set-branch, recursive, remote, merge, rebase, and shallow behavior across configuration layers.'
      ),
      outcome(
        'gita-submodule-change-publication',
        'Stage gitlink changes, publish dependency commits before superproject refs, review nested diffs, and verify that every referenced object is reachable.'
      ),
      outcome(
        'gita-submodule-security-credentials',
        'Treat URLs, protocols, hooks, recursive commands, credentials, relative paths, and untrusted nested code as explicit trust boundaries.'
      ),
      outcome(
        'gita-submodule-alternative-decision',
        'Compare submodules with package managers, subtree merges, vendoring, monorepos, and build-time fetches by reproducibility, ownership, atomicity, and operations.',
        'Submodules are always obsolete because package managers can represent every source dependency.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  advancedModule(
    'git-advanced-partial-sparse-scale',
    'Partial Clone, Sparse Checkout, and Large-Repository Scale',
    'A multi-gigabyte monorepo has slow clone and status operations, developers need different cones, CI requires complete release objects, and an unreliable promisor remote may disappear.',
    'large-repository data and working-set contract',
    [
      outcome(
        'gita-partial-clone-promisor-filter',
        'Explain promisor remotes, promised objects, filter specifications, lazy fetching, missing-object tolerance, and command compatibility.',
        'A blobless clone is shallow history with old commits removed.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'gita-shallow-partial-sparse-distinction',
        'Compare shallow clone, partial clone, sparse checkout, sparse index, single branch, and reference repositories by omitted data and semantic limits.'
      ),
      outcome(
        'gita-sparse-cone-noncone',
        'Use cone patterns, non-cone patterns, set, add, reapply, disable, skip-worktree state, and sparse index while detecting vivified paths.'
      ),
      outcome(
        'gita-large-repo-performance-evidence',
        'Measure clone transfer, object count, index size, status latency, checkout, fetch, build input, cache, and developer task before choosing an optimization.'
      ),
      outcome(
        'gita-scale-fallback-transfer',
        'Verify required commands and tools against changed working sets, define full-object release gates, preserve an offline fallback, and document experimental limits.',
        'If sparse status is fast, builds and releases necessarily have every required file and object.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  advancedModule(
    'git-advanced-attributes-filters-merges',
    'Attributes, Filters, Merge Drivers, and Content Policy',
    'A cross-platform repository normalizes text, stores generated and binary assets, uses custom merge behavior, and risks data loss through a missing clean filter.',
    'path-attribute and content-transformation policy',
    [
      outcome(
        'gita-attribute-precedence-query',
        'Resolve attributes from system, repository, info, directory, pattern, and negative states using check-attr evidence.',
        'Attributes use the same pattern semantics and precedence as .gitignore.'
      ),
      outcome(
        'gita-text-normalization-renormalize',
        'Design text, eol, working-tree-encoding, binary, and renormalization policy with byte-level and cross-platform verification.'
      ),
      outcome(
        'gita-diff-merge-driver-contract',
        'Configure diff drivers, textconv, binary markers, merge drivers, recursive behavior, and conflict-marker size without treating presentation as storage.'
      ),
      outcome(
        'gita-clean-smudge-process-filter',
        'Threat-model clean, smudge, and process filters; define required-filter failure, idempotence, delayed output, secrets, and missing-tool behavior.',
        'A clean filter may safely discard source because smudge can always reconstruct it.'
      ),
      outcome(
        'gita-large-content-policy',
        'Choose ordinary Git, LFS-style pointers, release artifacts, package registries, or external storage from review, locking, retention, availability, and migration needs.',
        'Any large file automatically belongs in a pointer-based extension regardless of access and history needs.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  advancedModule(
    'git-advanced-hooks-config-trust',
    'Hooks, Configuration, Credentials, and Repository Trust',
    'A cloned repository proposes hooks, includeIf config, credential helpers, aliases, filters, safe.directory exceptions, and a maintenance schedule on a shared build host.',
    'repository trust and local automation threat model',
    [
      outcome(
        'gita-config-origin-scope-include',
        'Inspect configuration origin, scope, type, includes, conditional includes, worktree config, environment, and command overrides before trusting behavior.'
      ),
      outcome(
        'gita-safe-directory-ownership',
        'Explain protected configuration and safe.directory ownership exceptions without using broad wildcards to conceal unsafe shared repositories.'
      ),
      outcome(
        'gita-hooks-lifecycle-bypass',
        'Map client and server hook timing, working directory, environment, parameters, exit behavior, bypass paths, distribution, and enforcement limits.'
      ),
      outcome(
        'gita-credential-helper-boundary',
        'Choose credential helpers, URL matching, useHttpPath, askpass, environment, token scope, and erasure behavior without writing secrets into repository state.'
      ),
      outcome(
        'gita-untrusted-repository-defense',
        'Inspect untrusted repositories as data in an isolated environment; disable execution paths, verify objects and config, and grant trust narrowly and reversibly.',
        'Git never executes repository-controlled programs until after the user explicitly runs a build.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  advancedModule(
    'git-advanced-maintenance-performance',
    'Maintenance, Commit Graphs, Index Acceleration, and Bundles',
    'A busy monorepo accumulates packs, stale worktrees, slow reachability walks, background jobs, and backup gaps while developers and CI operate concurrently.',
    'measured maintenance, acceleration, and backup schedule',
    [
      outcome(
        'gita-gc-repack-prune-safety',
        'Explain gc, repack, cruft packs, prune, expiration, concurrent writers, keep files, geometric repack, and why manual cleanup needs reachability proof.'
      ),
      outcome(
        'gita-maintenance-tasks-schedule',
        'Configure incremental-repack, loose-objects, commit-graph, prefetch, gc, worktree, rerere-gc, and scheduler strategy from measured need.'
      ),
      outcome(
        'gita-commitgraph-bloom-midx',
        'Explain commit-graph generations, changed-path Bloom filters, split chains, multi-pack indexes, bitmaps, and compatibility or invalidation boundaries.'
      ),
      outcome(
        'gita-fsmonitor-untracked-cache-index',
        'Evaluate built-in fsmonitor, untracked cache, split index, sparse index, preload index, and filesystem support using correctness-first benchmarks.'
      ),
      outcome(
        'gita-bundle-backup-verification',
        'Create full and incremental bundles, declare prerequisites, verify connectivity, restore refs into a fresh repository, and distinguish bundles from complete operational backup.',
        'A successfully created bundle necessarily contains every ref, reflog, hook, config, LFS object, and worktree needed for recovery.',
        'professional',
        'create'
      ),
    ]
  ),
  advancedModule(
    'git-advanced-hash-transition-disaster',
    'Object-Format Transition, Compatibility, and Disaster Defense',
    'An organization must prepare for Git 3.0 defaults and SHA-256 repositories while recovering a damaged mirror, validating tooling, and preserving collaboration across object formats.',
    'Git 3.0 readiness and disaster-recovery defense',
    [
      outcome(
        'gita-object-format-sha256',
        'Explain SHA-1 and SHA-256 repository object formats, repository initialization choice, ID length, storage identity, and why algorithms are not a cosmetic display option.',
        'Changing objectFormat rewrites only configuration while preserving every existing object ID.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'gita-compat-object-format-transition',
        'Evaluate compatibility object formats, translation tables, protocol exchange, clone and fetch interoperability, tooling assumptions, and repository immutability limits.'
      ),
      outcome(
        'gita-git3-breaking-readiness',
        'Inventory scripts, parsers, databases, APIs, hooks, CI, hosting, and documentation for Git 3.0 breaking defaults, long IDs, and version-gated behavior.',
        'If ordinary porcelain commands work, the full toolchain is ready for SHA-256 and Git 3.0.'
      ),
      outcome(
        'gita-disaster-recovery-runbook',
        'Triage ref, object, pack, index, worktree, remote, credential, and artifact damage; preserve evidence; rebuild from trusted copies; and verify exact losses.'
      ),
      outcome(
        'gita-production-repository-defense',
        'Defend repository policy, topology, recovery, scale, trust, release identity, maintenance, migration, drills, residual risks, and owner handoff under changed constraints.',
        'A successful restore drill proves future incidents will have identical data, access, timing, and failure modes.',
        'professional',
        'create'
      ),
    ]
  ),
];

export const gitAdvancedConfig = finalizeCourse(
  {
    id: 'git-advanced',
    title: 'Advanced Git 2.55: Internals, Recovery, Scale, and Production Workflows',
    version: '2026.07',
    audience: {
      description:
        'Developers, maintainers, release engineers, and incident responders who already use Git confidently and need production-grade repository reasoning.',
      entryKnowledge: [
        'Operate Git working tree, index, commits, branches, remotes, conflicts, tags, revisions, undo, rebase, hooks, and collaboration at Git Foundations mastery.',
        'Use a terminal safely, quote arguments, inspect installed help and versions, preserve evidence, and avoid destructive host operations.',
      ],
      deviceConstraints: [
        'Modern browser; all learner Git and shell operations run in a deterministic disposable simulator and never reach the host, network, credentials, or real repositories.',
      ],
      accessibilityAssumptions: [
        'Every graph has an ordered text equivalent; terminal output, topology choices, and evidence checks support keyboard-only and screen-reader use.',
      ],
    },
    scope: {
      includes: [
        'Advanced Git 2.55 reference and object model, revision algebra, storage, reflogs, recovery, layered undo, merge topology, conflict stages, rerere, rewriting, replay, bisect, worktrees, refspecs, maintainer workflows, signatures, submodules, partial clone, sparse checkout, attributes, filters, trust, maintenance, bundles, SHA-256 transition, and disaster defense',
        'Safe stateful repository simulation with changed graphs, exact commands, observable state transitions, causal diagnosis, and recovery verification',
        'Five cumulative production repository projects and a performance-based certification examination',
      ],
      excludes: [
        'Hosting-provider UI memorization, live credential use, live remote mutation, executing cloned hooks or repository programs, and unreviewed history filtering on real repositories',
        'Git Foundations topics except explicit retrieval and deeper mechanisms required by an advanced operation',
      ],
      nextCourses: ['cicd-github-actions', 'build-github-bot', 'build-pokedex'],
    },
    sources: [
      {
        title: 'Git 2.55 Reference and Release Notes',
        authority: 'official-docs',
        url: 'https://git-scm.com/docs',
        version: 'Git 2.55.0 released 2026-06-29',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls current porcelain, plumbing, configuration, option, safety, and compatibility behavior.',
      },
      {
        title: 'gitrevisions Manual',
        authority: 'official-docs',
        url: 'https://git-scm.com/docs/gitrevisions',
        version: 'Git 2.55.0',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls revision naming, peeling, ancestry, range algebra, reflog selectors, and exclusions.',
      },
      {
        title: 'Git Repository Layout and Object Model',
        authority: 'official-docs',
        url: 'https://git-scm.com/docs/gitrepository-layout',
        version: 'Git 2.55.0',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls repository, common-directory, object, ref, index, worktree, and administrative storage boundaries.',
      },
      {
        title: 'git-fsck and Packfile Documentation',
        authority: 'official-docs',
        url: 'https://git-scm.com/docs/git-fsck',
        version: 'Git 2.55.0',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls object connectivity, reachability, integrity, dangling-object, and recovery terminology.',
      },
      {
        title: 'git-reflog Manual',
        authority: 'official-docs',
        url: 'https://git-scm.com/docs/git-reflog',
        version: 'Git 2.55.0',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls reflog creation, selection, expiration, deletion, worktree scope, and recovery evidence.',
      },
      {
        title: 'Git Reset, Restore, and Revert Manuals',
        authority: 'official-docs',
        url: 'https://git-scm.com/docs/git-reset',
        version: 'Git 2.55.0',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls layered undo, reset modes, path restoration, published reversal, sequencer, and recovery behavior.',
      },
      {
        title: 'Git Merge and Merge-Base Manuals',
        authority: 'official-docs',
        url: 'https://git-scm.com/docs/git-merge',
        version: 'Git 2.55.0',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls merge bases, fast forwards, strategies, parents, conflicts, signatures, and integration state.',
      },
      {
        title: 'git-rerere Manual',
        authority: 'official-docs',
        url: 'https://git-scm.com/docs/git-rerere',
        version: 'Git 2.55.0',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls recorded-resolution preimages, postimages, reuse, forgetting, autoupdate, and retention.',
      },
      {
        title: 'Git Rebase, Cherry-Pick, Replay, and Range-Diff Manuals',
        authority: 'official-docs',
        url: 'https://git-scm.com/docs/git-rebase',
        version: 'Git 2.55.0',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls sequencer replay, onto selection, interactive actions, topology preservation, backports, and equivalence review.',
      },
      {
        title: 'git-bisect Manual',
        authority: 'official-docs',
        url: 'https://git-scm.com/docs/git-bisect',
        version: 'Git 2.55.0',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls regression search, automated exit contracts, path limits, skipping, replay logs, and convergence.',
      },
      {
        title: 'git-worktree Manual',
        authority: 'official-docs',
        url: 'https://git-scm.com/docs/git-worktree',
        version: 'Git 2.55.0',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls linked-worktree administration, shared and per-worktree state, locking, movement, repair, and pruning.',
      },
      {
        title: 'Git Fetch and Push Manuals',
        authority: 'official-docs',
        url: 'https://git-scm.com/docs/git-push',
        version: 'Git 2.55.0',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls refspec mappings, fast-forward rules, leases, atomic publication, pruning, tags, and remote ref updates.',
      },
      {
        title: 'gitworkflows Manual',
        authority: 'official-docs',
        url: 'https://git-scm.com/docs/gitworkflows',
        version: 'Git 2.55.0',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls topic, integration, subsystem, maintainer, patch-flow, and release workflow reasoning.',
      },
      {
        title: 'Git Signature Format and Tag Manuals',
        authority: 'official-docs',
        url: 'https://git-scm.com/docs/gitformat-signature',
        version: 'Git 2.55.0',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls supported signature formats, signed objects, tag objects, verification, and trust boundaries.',
      },
      {
        title: 'gitsubmodules Manual',
        authority: 'official-docs',
        url: 'https://git-scm.com/docs/gitsubmodules',
        version: 'Git 2.55.0',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls gitlinks, .gitmodules, nested repository state, recursion, configuration, security, and workflow.',
      },
      {
        title: 'Partial Clone and Sparse Checkout Documentation',
        authority: 'official-docs',
        url: 'https://git-scm.com/docs/partial-clone',
        version: 'Git 2.55.0',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls promisor objects, filters, lazy fetching, sparse patterns, sparse index, and experimental limitations.',
      },
      {
        title: 'gitattributes Manual',
        authority: 'official-docs',
        url: 'https://git-scm.com/docs/gitattributes',
        version: 'Git 2.55.0',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls attribute precedence, normalization, encodings, diff and merge drivers, and content filters.',
      },
      {
        title: 'Git Configuration, Hooks, and Credentials Manuals',
        authority: 'official-docs',
        url: 'https://git-scm.com/docs/git-config',
        version: 'Git 2.55.0',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls configuration scope and origin, protected config, safe.directory, hooks, credentials, aliases, and trust.',
      },
      {
        title: 'Git Maintenance, Commit-Graph, and Bundle Manuals',
        authority: 'official-docs',
        url: 'https://git-scm.com/docs/git-maintenance',
        version: 'Git 2.55.0',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls background tasks, pack maintenance, commit graphs, acceleration, scheduling, bundles, and restoration.',
      },
      {
        title: 'Git Hash Function Transition and Breaking Changes',
        authority: 'official-docs',
        url: 'https://git-scm.com/docs/hash-function-transition',
        version: 'Current transition plan and Git 3.0 breaking-changes plan, reviewed 2026-07-14',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls SHA-256 repository behavior, compatibility object formats, interoperability limits, and planned default changes.',
      },
    ],
    sharedRequirements: [
      'Every activity retrieves Git Foundations safety, worktree/index/ref/graph distinctions, accessibility, security, testing, and evidence habits before adding one advanced boundary.',
      'All browser Git work is deterministic simulation only. No learner command reaches host Git, files outside the scenario, credentials, hooks, network remotes, or executable repository content.',
      'Passing work requires exact before and after refs, graph and tree evidence, changed-case behavior, failure diagnosis, recovery anchor, residual risk, and live-environment transfer limits appropriate to the competency.',
    ],
    modules,
    projects: [
      project(
        'gita-repository-recovery-forensics',
        'Repository Recovery and Forensics Runbook',
        'git-advanced-undo-layered-repair',
        'A public-interest software incident team',
        'The team needs a nondestructive object and reflog investigation, retained recovery refs, layer-correct undo, changed-behavior validation, and an accessible evidence timeline.',
        [
          'gita-readonly-forensic-baseline',
          'gita-reachability-unreachable-dangling',
          'gita-recovery-ref-validation',
          'gita-undo-recovery-verification',
        ]
      ),
      project(
        'gita-integration-rewrite-system',
        'Defensible Integration and Rewrite System',
        'git-advanced-cherry-pick-replay',
        'A multi-release library maintainer group',
        'The group needs complex merge, rerere, rebase, and backport procedures that preserve provenance, semantic tests, review equivalence, and recovery across changed graphs.',
        [
          'gita-merge-result-defense',
          'gita-rerere-record-reuse',
          'gita-rebase-equivalence-recovery',
          'gita-backport-verification',
        ]
      ),
      project(
        'gita-parallel-regression-operations',
        'Parallel Regression Response Environment',
        'git-advanced-remotes-refspecs-leases',
        'A production platform response team',
        'The team needs a hermetic bisect harness, isolated parallel worktrees, explicit remote mappings, lease-safe publication, and cleanup that cannot overwrite unseen work.',
        [
          'gita-bisect-run-exit-contract',
          'gita-bisect-cause-verification',
          'gita-parallel-operation-policy',
          'gita-force-with-lease-atomic',
        ]
      ),
      project(
        'gita-scaled-trusted-release',
        'Scaled and Trusted Multi-Repository Release',
        'git-advanced-hooks-config-trust',
        'A regulated product release board',
        'The board needs reviewable stacked changes, verified release identity, pinned submodules, sparse developer workflows, byte-stable content policy, and defense against untrusted repository execution.',
        [
          'gita-collaboration-policy-defense',
          'gita-release-source-artifact-link',
          'gita-submodule-security-credentials',
          'gita-scale-fallback-transfer',
          'gita-untrusted-repository-defense',
        ]
      ),
      project(
        'gita-production-disaster-defense',
        'Production Repository Migration and Disaster Defense',
        'git-advanced-hash-transition-disaster',
        'An engineering, security, accessibility, release, and operations council',
        'The council needs measured maintenance and backup, fresh restore proof, Git 3.0 and SHA-256 readiness, damaged-mirror recovery, policy owners, drills, residual risks, and an accessible handoff.',
        [
          'gita-maintenance-tasks-schedule',
          'gita-bundle-backup-verification',
          'gita-git3-breaking-readiness',
          'gita-disaster-recovery-runbook',
          'gita-production-repository-defense',
        ]
      ),
    ],
    examContext:
      'Unfamiliar advanced Git graphs, objects, reflogs, undo layers, merges, conflicts, rewrites, backports, stashes, bisects, worktrees, remotes, workflows, signatures, submodules, large repositories, filters, trust, maintenance, object formats, and disaster cases requiring deterministic repository evidence plus explicit real-system transfer limits.',
    minimumQuestionBankSize: 600,
  },
  { researchedAt: RESEARCHED_AT, prerequisiteCourseIds: ['git-basics'] }
);

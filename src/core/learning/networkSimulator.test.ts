import { describe, expect, it } from 'vitest';
import { simulateNetworkCommands, simulateTerminalCommands } from './networkSimulator';

describe('simulateNetworkCommands', () => {
  it('returns deterministic diagnostic evidence for common network tools', () => {
    const output = simulateNetworkCommands('ping app.example.test\ndig app.example.test');
    expect(output).toContain('0% packet loss');
    expect(output).toContain('STATUS: NOERROR');
  });

  it('records unknown or destructive commands without executing them', () => {
    const output = simulateNetworkCommands('rm -rf /');
    expect(output).toContain('never executes learner shell input');
    expect(output).not.toContain('packets transmitted');
  });

  it('models filesystem changes across a terminal notebook', () => {
    const output = simulateTerminalCommands(
      'pwd\nmkdir reports\ncd reports\ntouch audit.txt\nls -la'
    );
    expect(output).toContain('/home/learner/lab');
    expect(output).toContain("created directory 'reports'");
    expect(output).toContain('/home/learner/lab/reports');
    expect(output).toContain('audit.txt');
  });

  it('models the Git working tree, index, commit, branch, and history', () => {
    const output = simulateTerminalCommands(
      'git init\ntouch evidence.txt\ngit status\ngit add evidence.txt\ngit commit -m "record evidence"\ngit branch repair\ngit switch repair\ngit log --oneline'
    );
    expect(output).toContain('Initialized empty Git repository');
    expect(output).toContain('Changes not staged for commit');
    expect(output).toContain('record evidence');
    expect(output).toContain("Switched to branch 'repair'");
  });

  it('models Advanced Git recovery, rewrite, bisect, worktree, and sparse state', () => {
    const output = simulateTerminalCommands(
      [
        'git reflog show --all',
        'git reset --mixed HEAD^',
        'git range-diff refs/recovery/pre-rebase...HEAD',
        'git bisect start bad-tip known-good -- src/parser.ts',
        'git bisect skip',
        'git worktree add ../incident incident',
        'git worktree list --porcelain',
        'git sparse-checkout set apps/status packages/shared',
        'git sparse-checkout list',
      ].join('\n')
    );

    expect(output).toContain('HEAD c0ffee0 → b00b1e5');
    expect(output).toContain('2: b00b1e5 ! 2: d15ea5e');
    expect(output).toContain('1199 revisions left');
    expect(output).toContain('skipped untestable');
    expect(output).toContain('/home/learner/incident');
    expect(output).toContain('packages/shared');
  });

  it('enforces an explicit simulated force-with-lease and never contacts a remote', () => {
    const accepted = simulateTerminalCommands(
      'git push --dry-run --force-with-lease=refs/heads/main:b00b1e5 origin HEAD:refs/heads/main'
    );
    const rejected = simulateTerminalCommands(
      'git push --force-with-lease=refs/heads/main:c0ffee0 origin HEAD:refs/heads/main'
    );

    expect(accepted).toContain('expected-old=b00b1e5');
    expect(accepted).toContain('No network or simulated remote ref changed.');
    expect(rejected).toContain('rejected: stale lease');
    expect(rejected).toContain('No simulated remote ref changed.');
  });

  it('reports Advanced Git trust, object-format, integrity, and maintenance evidence', () => {
    const output = simulateTerminalCommands(
      [
        'git config --show-origin --show-scope --get-regexp "^(core|credential|include|safe)\\."',
        'git rev-parse --show-object-format=storage,input,output',
        'git fsck --full --no-reflogs --unreachable',
        'git maintenance run --task=commit-graph --task=incremental-repack',
        'git bundle verify backup.bundle',
      ].join('\n')
    );

    expect(output).toContain('core.hooksPath=.githooks');
    expect(output).toContain('storage=sha256');
    expect(output).toContain('unreachable commit d15ea5e');
    expect(output).toContain('commit-graph, incremental-repack');
    expect(output).toContain('connectivity: valid');
  });

  it('provides inspectable permission, process, service, and storage evidence', () => {
    const output = simulateTerminalCommands(
      'stat README.md\nid\nps aux\nsystemctl status lab-worker.service\njournalctl -u lab-worker.service\nfindmnt'
    );
    expect(output).toContain('(0644/-rw-r--r--)');
    expect(output).toContain('uid=1000(learner)');
    expect(output).toContain('lab-worker');
    expect(output).toContain('Active: active (running)');
    expect(output).toContain('ext4');
  });
});

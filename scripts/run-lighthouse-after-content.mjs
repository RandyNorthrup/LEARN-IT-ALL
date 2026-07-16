import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const completionMarker = resolve(root, 'content/v2/CONTENT_COMPLETE');
const requestedProfile = process.argv[2] ?? 'all';
const profiles = requestedProfile === 'all' ? ['tablet', 'desktop'] : [requestedProfile];

if (!existsSync(completionMarker)) {
  console.log(
    'Lighthouse paused: complete and audit all course content before creating content/v2/CONTENT_COMPLETE.'
  );
  process.exit(0);
}

if (!profiles.every((profile) => ['tablet', 'desktop'].includes(profile))) {
  console.error(`Unknown Lighthouse profile: ${requestedProfile}`);
  process.exit(1);
}

function run(command, args, env = process.env) {
  const result = spawnSync(command, args, { cwd: root, env, stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

run('npm', ['run', 'build']);
for (const profile of profiles) {
  run('npx', ['lhci', 'autorun'], { ...process.env, LIGHTHOUSE_PROFILE: profile });
}

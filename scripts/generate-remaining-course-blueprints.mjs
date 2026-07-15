import { spawnSync } from 'node:child_process';

const generators = [
  'generate-python-basics-blueprint.mjs',
  'generate-python-oop-blueprint.mjs',
  'generate-network-plus-blueprint.mjs',
];

for (const generator of generators) {
  const result = spawnSync(process.execPath, [`scripts/${generator}`], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  if (result.status !== 0) throw new Error(`${generator} failed with exit code ${result.status}`);
}

console.log(`Generated ${generators.length} remaining platform course blueprints.`);

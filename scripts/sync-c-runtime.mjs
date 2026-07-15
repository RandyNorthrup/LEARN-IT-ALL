import { spawnSync } from 'node:child_process';
import { copyFile, mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const runtimeDirectory = resolve(root, 'runtimes/c-picoc');
const publicDirectory = resolve(root, 'public');
const outputDirectory = await mkdtemp(resolve(tmpdir(), 'learn-it-all-c-runtime-'));

try {
  const buildResult = spawnSync(
    'docker',
    [
      'build',
      '--file',
      resolve(runtimeDirectory, 'Dockerfile'),
      '--output',
      `type=local,dest=${outputDirectory}`,
      runtimeDirectory,
    ],
    { stdio: 'inherit' }
  );
  if (buildResult.status !== 0) {
    throw new Error(`C browser runtime build failed with status ${buildResult.status}.`);
  }

  for (const filename of ['c-picoc.js', 'c-picoc.wasm', 'c-picoc.sha256']) {
    const source = resolve(outputDirectory, filename);
    const content = await readFile(source);
    if (content.byteLength === 0) throw new Error(`${filename} was empty after the runtime build.`);
    await copyFile(source, resolve(publicDirectory, filename));
  }
} finally {
  await rm(outputDirectory, { recursive: true, force: true });
}

console.log('Built and synced the isolated PicoC browser practice runtime.');

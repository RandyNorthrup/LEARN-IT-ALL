import { spawnSync } from 'node:child_process';
import { copyFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const runtimeDirectory = resolve(root, 'runtimes/go-wasm');
const publicDirectory = resolve(root, 'public');
const wasmTarget = resolve(publicDirectory, 'go-runtime.wasm');

const goRootResult = spawnSync('go', ['env', 'GOROOT'], { encoding: 'utf8' });
if (goRootResult.status !== 0) {
  throw new Error(goRootResult.stderr || 'Could not locate GOROOT.');
}

await mkdir(publicDirectory, { recursive: true });
const buildResult = spawnSync('go', ['build', '-trimpath', '-ldflags=-s', '-o', wasmTarget, '.'], {
  cwd: runtimeDirectory,
  env: { ...process.env, GOOS: 'js', GOARCH: 'wasm' },
  stdio: 'inherit',
});
if (buildResult.status !== 0) {
  throw new Error(`Go browser runtime build failed with status ${buildResult.status}.`);
}

await copyFile(
  resolve(goRootResult.stdout.trim(), 'lib/wasm/wasm_exec.js'),
  resolve(publicDirectory, 'go-wasm-exec.js')
);

console.log('Built isolated Go browser runtime and synced matching WebAssembly support.');

import { copyFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sourceDirectory = resolve(root, 'node_modules/pyodide');
const publicDirectory = resolve(root, 'public/pyodide');
const runtimeFiles = [
  'pyodide.mjs',
  'pyodide.asm.mjs',
  'pyodide.asm.wasm',
  'pyodide-lock.json',
  'python_stdlib.zip',
];

await mkdir(publicDirectory, { recursive: true });
await Promise.all(
  runtimeFiles.map((fileName) =>
    copyFile(resolve(sourceDirectory, fileName), resolve(publicDirectory, fileName))
  )
);

console.log(`Synced ${runtimeFiles.length} pinned Pyodide browser runtime assets.`);

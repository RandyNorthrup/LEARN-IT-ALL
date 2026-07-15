# Browser Go runtime

This helper compiles Yaegi into a browser-only WebAssembly interpreter. The
runtime is intentionally narrower than a host Go installation:

- every run uses a new interpreter inside a dedicated worker; successful runs
  reuse the loaded worker, while stalled or failed workers are terminated;
- source and output are bounded;
- the UI kills work that exceeds its deadline;
- only explicitly allowed deterministic standard-library packages are exposed;
- filesystem, process, environment, system-call, and network packages are not
  exposed to learner programs.

`scripts/sync-go-runtime.mjs` builds the pinned runtime with the repository's
Go 1.26.5 toolchain and copies matching `wasm_exec.js` support into `public/`.
The Yaegi interpreter supports a subset of current Go language/toolchain
behavior; course content must label interpreter limits and use simulations for
host, module, test-command, filesystem, and network workflows.

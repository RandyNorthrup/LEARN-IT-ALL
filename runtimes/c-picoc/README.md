# C browser practice runtime

LEARN-IT-ALL builds PicoC 3.2.2 from the tagged upstream source with Emscripten
6.0.3. The tiny runtime powers bounded, browser-only practice for the C89/C90
core and selected C99 syntax. It is not presented as a C23 compiler.

The curriculum teaches current ISO C23. Full compiler, sanitizer, ABI,
concurrency, provenance, and platform transfer work targets current Clang and
GCC outside this deliberately narrow browser subset.

Run `npm run runtime:c:sync` to produce `public/c-picoc.js`,
`public/c-picoc.wasm`, and their checksum file. The source archive checksum is
verified before compilation. Learner source runs only inside a disposable Web
Worker with no host filesystem, process, environment, or network capability.

Upstream source: https://github.com/jpoirier/picoc/tree/v3.2.2

Build toolchain: https://github.com/emscripten-core/emscripten/releases/tag/6.0.3

#!/usr/bin/env bash
set -euo pipefail

readonly PICOC_VERSION='3.2.2'
readonly PICOC_ARCHIVE_SHA256='802cd342c7c89bc4b65fff68f8ee613b7ac5ac76492b7093717911c3481d0fc7'
readonly PICOC_ARCHIVE="picoc-v${PICOC_VERSION}.tar.gz"
readonly PICOC_URL="https://github.com/jpoirier/picoc/archive/refs/tags/v${PICOC_VERSION}.tar.gz"
readonly SOURCE_DIR='/build/picoc'
readonly OUTPUT_DIR='/build/output'

curl --fail --location --silent --show-error "${PICOC_URL}" --output "/build/${PICOC_ARCHIVE}"
printf '%s  %s\n' "${PICOC_ARCHIVE_SHA256}" "/build/${PICOC_ARCHIVE}" | sha256sum --check --strict

mkdir -p "${SOURCE_DIR}" "${OUTPUT_DIR}"
tar --extract --gzip --file "/build/${PICOC_ARCHIVE}" --directory "${SOURCE_DIR}" --strip-components=1
cd "${SOURCE_DIR}"

# Emscripten's libc intentionally keeps FILE opaque. PicoC only exposes an
# interpreter-side placeholder, so remove the unused by-value host FILE and
# retain pointer-sized opaque representations in its teaching standard library.
sed -i 's/^    IOFILE CStdOutBase;/    \/\* Host FILE is opaque under Emscripten. \*\//' interpreter.h
sed -i 's/sizeof(FILE)/sizeof(void*)/g' cstdlib/stdio.c
sed -i 's/^#ifdef USE_READLINE$/#if 0/' platform/platform_unix.c

sources=(
  picoc.c table.c lex.c parse.c expression.c heap.c type.c variable.c
  clibrary.c platform.c include.c debug.c
  platform/platform_unix.c platform/library_unix.c
  cstdlib/stdio.c cstdlib/math.c cstdlib/string.c cstdlib/stdlib.c
  cstdlib/time.c cstdlib/errno.c cstdlib/ctype.c cstdlib/stdbool.c
  cstdlib/unistd.c /build/runtime_stubs.c
)

emcc "${sources[@]}" \
  -O2 \
  -DUNIX_HOST \
  -DNO_READLINE \
  -I. \
  -s WASM=1 \
  -s MODULARIZE=1 \
  -s EXPORT_NAME=createPicocModule \
  -s 'EXPORTED_RUNTIME_METHODS=["callMain","FS"]' \
  -s FILESYSTEM=1 \
  -s FORCE_FILESYSTEM=1 \
  -s ALLOW_MEMORY_GROWTH=1 \
  -s INITIAL_MEMORY=16777216 \
  -s MAXIMUM_MEMORY=67108864 \
  -s 'ENVIRONMENT=["worker"]' \
  -s EXIT_RUNTIME=1 \
  -s INVOKE_RUN=0 \
  -s ASSERTIONS=0 \
  -s MALLOC=emmalloc \
  -o "${OUTPUT_DIR}/c-picoc.js"

test -s "${OUTPUT_DIR}/c-picoc.js"
test -s "${OUTPUT_DIR}/c-picoc.wasm"
(
  cd "${OUTPUT_DIR}"
  sha256sum c-picoc.js c-picoc.wasm > c-picoc.sha256
)

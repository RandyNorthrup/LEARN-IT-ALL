const MODULE_TASKS = {
  'cmem-outcomes-evidence-toolchain': 'separate browser evidence from native transfer evidence',
  'cmem-translation-diagnostics': 'model translation and diagnostic gates before execution',
  'cmem-values-integers-overflow': 'reject a size calculation that exceeds its bound',
  'cmem-objects-storage-lifetime': 'validate object lifetime and generation evidence',
  'cmem-representation-alignment-padding': 'encode values without copying native padding',
  'cmem-arrays-pointers-bounds': 'validate a half-open array slice before access',
  'cmem-strings-bytes-encoding': 'preserve length, capacity, and termination invariants',
  'cmem-structs-unions-flexible-arrays': 'validate a tagged payload and its allocation size',
  'cmem-functions-callbacks-interfaces': 'bind callback results to explicit context lifetime',
  'cmem-automatic-lifetime-stack': 'replace unbounded recursive work with bounded explicit storage',
  'cmem-heap-allocator-contracts': 'handle allocation failure and zero-size policy explicitly',
  'cmem-allocation-size-overflow': 'prove a header-plus-payload allocation formula',
  'cmem-ownership-borrowing-contracts': 'track owner, borrow, mutation, and release state',
  'cmem-cleanup-error-paths': 'unwind partially acquired resources in reverse order',
  'cmem-realloc-transactional-growth': 'grow capacity without losing the old allocation on failure',
  'cmem-uaf-double-free-dangling': 'reject stale handles with a generation check',
  'cmem-buffer-overflow-underflow': 'move overlapping bytes inside proven bounds',
  'cmem-indeterminate-undefined-behavior': 'read only fields proven initialized by state',
  'cmem-aliasing-effective-type-provenance': 'decode representation bytes through a defined copy',
  'cmem-arenas-pools-slabs': 'maintain checked arena offset and high-water invariants',
  'cmem-reference-counting-cycles': 'model strong counts and expose a cycle that cannot reach zero',
  'cmem-tracing-garbage-collection':
    'mark reachable objects and count only unreachable sweep candidates',
  'cmem-resource-ownership-raii-patterns':
    'release nested resources once in reverse acquisition order',
  'cmem-concurrency-atomics-races':
    'model publication and reclamation state without claiming thread proof',
  'cmem-abi-ffi-shared-boundaries': 'validate a versioned foreign buffer and allocator family',
  'cmem-sanitizers-static-analysis-fuzzing': 'classify a defect against complementary native tools',
  'cmem-profiling-performance-hardening':
    'compare live, reserved, and peak memory before optimizing',
  'cmem-testing-release-incident-defense':
    'decide release readiness from complementary memory evidence',
};

const PROGRAMS = {
  'cmem-outcomes-evidence-toolchain': (fn, n) => `
static int ${fn}(int browser_ok, int compiler_ok, int sanitizer_ok, int abi_ok) {
  int native_complete = compiler_ok && sanitizer_ok && abi_ok;
  if (!browser_ok) return 0;
  return native_complete ? ${n + 10} : ${n};
}

int main(void) {
  int browser_only = ${fn}(1, 0, 0, 0);
  int complete = ${fn}(1, 1, 1, 1);
  int invariant = browser_only != complete && complete > browser_only;
  printf("evidence browser=%d complete=%d invariant=%d\\n", browser_only, complete, invariant);
  return invariant ? 0 : 1;
}`,
  'cmem-translation-diagnostics': (fn, n) => `
static int ${fn}(int declared, int defined, int prototype_ok, int warning_clean) {
  if (!declared || !defined) return -1;
  if (!prototype_ok || !warning_clean) return -2;
  return ${n};
}

int main(void) {
  int rejected = ${fn}(1, 1, 0, 1);
  int accepted = ${fn}(1, 1, 1, 1);
  int invariant = rejected < 0 && accepted == ${n};
  printf("translation rejected=%d accepted=%d invariant=%d\\n", rejected, accepted, invariant);
  return invariant ? 0 : 1;
}`,
  'cmem-values-integers-overflow': (fn, n) => `
static int ${fn}(size_t count, size_t width, size_t limit, size_t *bytes) {
  if (bytes == NULL || width == 0) return 0;
  if (count > limit / width) return 0;
  *bytes = count * width;
  return 1;
}

int main(void) {
  size_t bytes = 99;
  int rejected = ${fn}((size_t)${n + 20}, (size_t)8, (size_t)64, &bytes);
  int accepted = ${fn}((size_t)${n}, (size_t)4, (size_t)64, &bytes);
  int invariant = !rejected && accepted && bytes == (size_t)${n * 4};
  printf("size bytes=%lu invariant=%d\\n", (unsigned long)bytes, invariant);
  return invariant ? 0 : 1;
}`,
  'cmem-objects-storage-lifetime': (fn, n) => `
struct lifetime_handle { int value; unsigned generation; int live; };

static int ${fn}(const struct lifetime_handle *item, unsigned expected) {
  if (item == NULL || !item->live) return -1;
  if (item->generation != expected) return -2;
  return item->value;
}

int main(void) {
  struct lifetime_handle item = { ${n * 3}, ${n}u, 1 };
  int stale = ${fn}(&item, ${n + 1}u);
  int live = ${fn}(&item, ${n}u);
  int invariant = stale == -2 && live == ${n * 3};
  printf("lifetime stale=%d live=%d invariant=%d\\n", stale, live, invariant);
  return invariant ? 0 : 1;
}`,
  'cmem-representation-alignment-padding': (fn, n) => `
static int ${fn}(unsigned value, unsigned char *out, size_t capacity, unsigned *decoded) {
  if (out == NULL || decoded == NULL || capacity < 4) return 0;
  out[0] = (unsigned char)((value >> 24) & 255u);
  out[1] = (unsigned char)((value >> 16) & 255u);
  out[2] = (unsigned char)((value >> 8) & 255u);
  out[3] = (unsigned char)(value & 255u);
  *decoded = ((unsigned)out[0] << 24) | ((unsigned)out[1] << 16) |
             ((unsigned)out[2] << 8) | (unsigned)out[3];
  return 1;
}

int main(void) {
  unsigned char bytes[4];
  unsigned input = 0x10203000u + ${n}u;
  unsigned decoded = 0u;
  int rejected = ${fn}(input, bytes, 3, &decoded);
  int accepted = ${fn}(input, bytes, 4, &decoded);
  int invariant = !rejected && accepted && decoded == input && bytes[0] == 0x10u;
  printf("representation last=%u invariant=%d\\n", (unsigned)bytes[3], invariant);
  return invariant ? 0 : 1;
}`,
  'cmem-arrays-pointers-bounds': (fn, n) => `
static int ${fn}(const int *values, size_t length, size_t start, size_t count, int *sum) {
  size_t index;
  int total = 0;
  if (values == NULL || sum == NULL || start > length || count > length - start) return 0;
  for (index = start; index < start + count; ++index) total += values[index];
  *sum = total;
  return 1;
}

int main(void) {
  int values[5] = { ${n}, ${n + 1}, ${n + 2}, ${n + 3}, ${n + 4} };
  int sum = 0;
  int rejected = ${fn}(values, 5, 4, 2, &sum);
  int accepted = ${fn}(values, 5, 1, 3, &sum);
  int invariant = !rejected && accepted && sum == ${3 * n + 6};
  printf("slice sum=%d invariant=%d\\n", sum, invariant);
  return invariant ? 0 : 1;
}`,
  'cmem-strings-bytes-encoding': (fn, n) => `
static int ${fn}(char *destination, size_t capacity, const char *source, size_t length) {
  if (destination == NULL || source == NULL || capacity == 0 || length >= capacity) return 0;
  memcpy(destination, source, length);
  destination[length] = '\\0';
  return 1;
}

int main(void) {
  char text[8];
  int rejected = ${fn}(text, sizeof text, "changed-case", 12);
  int accepted = ${fn}(text, sizeof text, "memory", 6);
  int invariant = !rejected && accepted && strlen(text) == 6 && text[6] == '\\0';
  printf("string length=%lu case=${n} invariant=%d\\n", (unsigned long)strlen(text), invariant);
  return invariant ? 0 : 1;
}`,
  'cmem-structs-unions-flexible-arrays': (fn, n) => `
struct packet_model { int tag; size_t count; int payload[4]; };

static int ${fn}(const struct packet_model *packet, int *sum) {
  size_t index;
  int total = 0;
  if (packet == NULL || sum == NULL || packet->tag != 1 || packet->count > 4) return 0;
  for (index = 0; index < packet->count; ++index) total += packet->payload[index];
  *sum = total;
  return 1;
}

int main(void) {
  struct packet_model packet = { 1, 3, { ${n}, ${n + 1}, ${n + 2}, 0 } };
  int sum = 0;
  int accepted = ${fn}(&packet, &sum);
  packet.tag = 9;
  int rejected = ${fn}(&packet, &sum);
  int invariant = accepted && !rejected && sum == ${3 * n + 3};
  printf("packet sum=%d invariant=%d\\n", sum, invariant);
  return invariant ? 0 : 1;
}`,
  'cmem-functions-callbacks-interfaces': (fn, n) => `
typedef int (*transform_callback)(int value, void *context);

static int add_context(int value, void *context) {
  int *offset = (int *)context;
  return offset == NULL ? value : value + *offset;
}

static int ${fn}(transform_callback callback, void *context, int context_live, int value) {
  if (callback == NULL || !context_live) return -1;
  return callback(value, context);
}

int main(void) {
  int offset = ${n};
  int stale = ${fn}(add_context, &offset, 0, 10);
  int live = ${fn}(add_context, &offset, 1, 10);
  int invariant = stale == -1 && live == ${n + 10};
  printf("callback live=%d invariant=%d\\n", live, invariant);
  return invariant ? 0 : 1;
}`,
  'cmem-automatic-lifetime-stack': (fn, n) => `
static int ${fn}(const int *work, size_t count, size_t maximum, int *sum) {
  size_t index;
  int total = 0;
  if (work == NULL || sum == NULL || count > maximum) return 0;
  for (index = 0; index < count; ++index) total += work[index];
  *sum = total;
  return 1;
}

int main(void) {
  int explicit_stack[4] = { ${n}, ${n + 1}, ${n + 2}, ${n + 3} };
  int sum = 0;
  int accepted = ${fn}(explicit_stack, 4, 4, &sum);
  int rejected = ${fn}(explicit_stack, 4, 3, &sum);
  int invariant = accepted && !rejected && sum == ${4 * n + 6};
  printf("stack sum=%d invariant=%d\\n", sum, invariant);
  return invariant ? 0 : 1;
}`,
  'cmem-heap-allocator-contracts': (fn, n) => `
static int ${fn}(size_t count, int simulate_failure, int *observed) {
  int *values;
  size_t index;
  if (observed == NULL || count == 0 || simulate_failure) return 0;
  values = (int *)calloc(count, sizeof *values);
  if (values == NULL) return 0;
  for (index = 0; index < count; ++index) values[index] = (int)index + ${n};
  *observed = values[count - 1];
  free(values);
  return 1;
}

int main(void) {
  int observed = -1;
  int rejected = ${fn}(3, 1, &observed);
  int accepted = ${fn}(3, 0, &observed);
  int invariant = !rejected && accepted && observed == ${n + 2};
  printf("heap observed=%d invariant=%d\\n", observed, invariant);
  return invariant ? 0 : 1;
}`,
  'cmem-allocation-size-overflow': (fn, n) => `
static int ${fn}(size_t header, size_t count, size_t width, size_t limit, size_t *total) {
  size_t payload;
  if (total == NULL || width == 0 || count > limit / width) return 0;
  payload = count * width;
  if (header > limit - payload) return 0;
  *total = header + payload;
  return 1;
}

int main(void) {
  size_t total = 0;
  int rejected = ${fn}(16, 20, 8, 100, &total);
  int accepted = ${fn}(8, ${n}, 4, 100, &total);
  int invariant = !rejected && accepted && total == (size_t)${8 + n * 4};
  printf("allocation total=%lu invariant=%d\\n", (unsigned long)total, invariant);
  return invariant ? 0 : 1;
}`,
  'cmem-ownership-borrowing-contracts': (fn, n) => `
struct ownership_model { int owner_live; int borrow_count; int mutable_borrow; int released; };

static int ${fn}(struct ownership_model *state, int request_release) {
  if (state == NULL || !state->owner_live || state->released) return 0;
  if (request_release && (state->borrow_count != 0 || state->mutable_borrow)) return 0;
  if (request_release) { state->released = 1; state->owner_live = 0; }
  return 1;
}

int main(void) {
  struct ownership_model state = { 1, 1, 0, 0 };
  int rejected = ${fn}(&state, 1);
  state.borrow_count = 0;
  int accepted = ${fn}(&state, 1);
  int invariant = !rejected && accepted && state.released && ${n} > 0;
  printf("ownership released=%d invariant=%d\\n", state.released, invariant);
  return invariant ? 0 : 1;
}`,
  'cmem-cleanup-error-paths': (fn, n) => `
static int ${fn}(int fail_stage, int released[3]) {
  int acquired = 0;
  int index;
  for (index = 0; index < 3; ++index) {
    if (fail_stage == index) break;
    acquired += 1;
  }
  while (acquired > 0) {
    acquired -= 1;
    released[acquired] = ${n} + acquired;
  }
  return fail_stage < 3 ? 0 : 1;
}

int main(void) {
  int released[3] = { 0, 0, 0 };
  int completed = ${fn}(3, released);
  int invariant = completed && released[2] == ${n + 2} && released[0] == ${n};
  printf("cleanup first=%d last=%d invariant=%d\\n", released[2], released[0], invariant);
  return invariant ? 0 : 1;
}`,
  'cmem-realloc-transactional-growth': (fn, n) => `
static int ${fn}(int **owner, size_t old_count, size_t new_count, int simulate_failure) {
  int *candidate;
  if (owner == NULL || *owner == NULL || new_count <= old_count || simulate_failure) return 0;
  candidate = (int *)realloc(*owner, new_count * sizeof **owner);
  if (candidate == NULL) return 0;
  *owner = candidate;
  (*owner)[new_count - 1] = ${n};
  return 1;
}

int main(void) {
  int *owner = (int *)malloc(2 * sizeof *owner);
  int rejected;
  int accepted;
  int invariant;
  if (owner == NULL) return 2;
  owner[0] = 7;
  rejected = ${fn}(&owner, 2, 4, 1);
  accepted = ${fn}(&owner, 2, 4, 0);
  invariant = !rejected && accepted && owner[0] == 7 && owner[3] == ${n};
  printf("realloc tail=%d invariant=%d\\n", owner[3], invariant);
  free(owner);
  return invariant ? 0 : 1;
}`,
  'cmem-uaf-double-free-dangling': (fn, n) => `
struct generation_slot { int value; unsigned generation; int occupied; };

static int ${fn}(const struct generation_slot *slot, unsigned handle_generation, int *value) {
  if (slot == NULL || value == NULL || !slot->occupied) return 0;
  if (slot->generation != handle_generation) return 0;
  *value = slot->value;
  return 1;
}

int main(void) {
  struct generation_slot slot = { ${n * 5}, ${n + 1}u, 1 };
  int value = 0;
  int stale = ${fn}(&slot, ${n}u, &value);
  int current = ${fn}(&slot, ${n + 1}u, &value);
  int invariant = !stale && current && value == ${n * 5};
  printf("generation value=%d invariant=%d\\n", value, invariant);
  return invariant ? 0 : 1;
}`,
  'cmem-buffer-overflow-underflow': (fn, n) => `
static int ${fn}(unsigned char *buffer, size_t length, size_t from, size_t to, size_t count) {
  if (buffer == NULL || from > length || count > length - from) return 0;
  if (to > length || count > length - to) return 0;
  memmove(buffer + to, buffer + from, count);
  return 1;
}

int main(void) {
  unsigned char buffer[8] = { 0, 1, 2, 3, 4, 5, 6, 7 };
  int rejected = ${fn}(buffer, 8, 7, 0, 2);
  int accepted = ${fn}(buffer, 8, 1, 2, 4);
  int invariant = !rejected && accepted && buffer[2] == 1 && buffer[5] == 4 && ${n} > 0;
  printf("move edge=%u invariant=%d\\n", (unsigned)buffer[5], invariant);
  return invariant ? 0 : 1;
}`,
  'cmem-indeterminate-undefined-behavior': (fn, n) => `
struct initialized_record { unsigned initialized; int value; };

static int ${fn}(const struct initialized_record *record, int fallback) {
  if (record == NULL || !record->initialized) return fallback;
  return record->value;
}

int main(void) {
  struct initialized_record record = { 0u, 0 };
  int before = ${fn}(&record, -1);
  record.value = ${n * 7};
  record.initialized = 1u;
  int after = ${fn}(&record, -1);
  int invariant = before == -1 && after == ${n * 7};
  printf("initialization value=%d invariant=%d\\n", after, invariant);
  return invariant ? 0 : 1;
}`,
  'cmem-aliasing-effective-type-provenance': (fn, n) => `
static int ${fn}(const unsigned char *bytes, size_t length, unsigned *decoded) {
  unsigned value = 0;
  unsigned char representation[sizeof value];
  if (bytes == NULL || decoded == NULL || length != 4 || sizeof value < 4) return 0;
  representation[0] = bytes[0];
  representation[1] = bytes[1];
  representation[2] = bytes[2];
  representation[3] = bytes[3];
  value = (unsigned)representation[0] | ((unsigned)representation[1] << 8) |
          ((unsigned)representation[2] << 16) | ((unsigned)representation[3] << 24);
  *decoded = value;
  return 1;
}

int main(void) {
  unsigned char bytes[4] = { ${n}u, 0u, 0u, 0u };
  unsigned value = 0u;
  int rejected = ${fn}(bytes, 3, &value);
  int accepted = ${fn}(bytes, 4, &value);
  int invariant = !rejected && accepted && value == ${n}u;
  printf("decode value=%u invariant=%d\\n", value, invariant);
  return invariant ? 0 : 1;
}`,
  'cmem-arenas-pools-slabs': (fn, n) => `
struct arena_model { size_t used; size_t capacity; size_t high_water; };

static int ${fn}(struct arena_model *arena, size_t bytes, size_t alignment, size_t *offset) {
  size_t padding;
  if (arena == NULL || offset == NULL || alignment == 0) return 0;
  padding = (alignment - (arena->used % alignment)) % alignment;
  if (padding > arena->capacity - arena->used) return 0;
  if (bytes > arena->capacity - arena->used - padding) return 0;
  *offset = arena->used + padding;
  arena->used = *offset + bytes;
  if (arena->used > arena->high_water) arena->high_water = arena->used;
  return 1;
}

int main(void) {
  struct arena_model arena = { 3, 32, 3 };
  size_t offset = 0;
  int accepted = ${fn}(&arena, ${n}, 4, &offset);
  int rejected = ${fn}(&arena, 40, 8, &offset);
  int invariant = accepted && !rejected && arena.high_water <= arena.capacity;
  printf("arena used=%lu invariant=%d\\n", (unsigned long)arena.used, invariant);
  return invariant ? 0 : 1;
}`,
  'cmem-reference-counting-cycles': (fn, n) => `
struct ref_model { unsigned strong; unsigned outgoing_cycle; int live; };

static int ${fn}(struct ref_model *object, int release_external) {
  if (object == NULL || !object->live || object->strong == 0u) return 0;
  if (release_external) object->strong -= 1u;
  if (object->strong == 0u) object->live = 0;
  return object->live;
}

int main(void) {
  struct ref_model acyclic = { 1u, 0u, 1 };
  struct ref_model cyclic = { 2u, 1u, 1 };
  int acyclic_live = ${fn}(&acyclic, 1);
  int cyclic_live = ${fn}(&cyclic, 1);
  int invariant = !acyclic_live && cyclic_live && cyclic.strong == 1u && ${n} > 0;
  printf("refcount cycle=%u invariant=%d\\n", cyclic.strong, invariant);
  return invariant ? 0 : 1;
}`,
  'cmem-tracing-garbage-collection': (fn, n) => `
struct gc_node { int child; int marked; };

static int ${fn}(struct gc_node nodes[4], int root) {
  int current = root;
  int swept = 0;
  int index;
  while (current >= 0 && current < 4 && !nodes[current].marked) {
    nodes[current].marked = 1;
    current = nodes[current].child;
  }
  for (index = 0; index < 4; ++index) if (!nodes[index].marked) swept += 1;
  return swept;
}

int main(void) {
  struct gc_node nodes[4] = { { 1, 0 }, { -1, 0 }, { 3, 0 }, { 2, 0 } };
  int swept = ${fn}(nodes, 0);
  int invariant = swept == 2 && nodes[0].marked && nodes[1].marked && ${n} > 0;
  printf("gc swept=%d invariant=%d\\n", swept, invariant);
  return invariant ? 0 : 1;
}`,
  'cmem-resource-ownership-raii-patterns': (fn, n) => `
struct resources { int buffer; int stream; int lock; int release_trace; };

static int ${fn}(struct resources *state) {
  if (state == NULL) return 0;
  if (state->lock) { state->release_trace = state->release_trace * 10 + 3; state->lock = 0; }
  if (state->stream) { state->release_trace = state->release_trace * 10 + 2; state->stream = 0; }
  if (state->buffer) { state->release_trace = state->release_trace * 10 + 1; state->buffer = 0; }
  return 1;
}

int main(void) {
  struct resources state = { 1, 1, 1, 0 };
  int first = ${fn}(&state);
  int second = ${fn}(&state);
  int invariant = first && second && state.release_trace == 321 && ${n} > 0;
  printf("resources trace=%d invariant=%d\\n", state.release_trace, invariant);
  return invariant ? 0 : 1;
}`,
  'cmem-concurrency-atomics-races': (fn, n) => `
struct publication_model { int initialized; int published; int readers; int retired; };

static int ${fn}(struct publication_model *state, int request_reclaim) {
  if (state == NULL || (state->published && !state->initialized)) return 0;
  if (request_reclaim && state->readers != 0) return 0;
  if (request_reclaim) state->retired = 1;
  return 1;
}

int main(void) {
  struct publication_model state = { 1, 1, 2, 0 };
  int rejected = ${fn}(&state, 1);
  state.readers = 0;
  int accepted = ${fn}(&state, 1);
  int invariant = !rejected && accepted && state.retired && ${n} > 0;
  printf("reclamation retired=%d invariant=%d\\n", state.retired, invariant);
  return invariant ? 0 : 1;
}`,
  'cmem-abi-ffi-shared-boundaries': (fn, n) => `
struct ffi_buffer { unsigned abi_version; size_t length; size_t capacity; unsigned allocator_id; };

static int ${fn}(const struct ffi_buffer *buffer, unsigned expected_allocator) {
  if (buffer == NULL || buffer->abi_version != 1u) return 0;
  if (buffer->length > buffer->capacity) return 0;
  if (buffer->allocator_id != expected_allocator) return 0;
  return (int)buffer->length;
}

int main(void) {
  struct ffi_buffer buffer = { 1u, ${n}u, ${n + 4}u, 7u };
  int wrong_heap = ${fn}(&buffer, 8u);
  int accepted = ${fn}(&buffer, 7u);
  int invariant = !wrong_heap && accepted == ${n};
  printf("ffi length=%d invariant=%d\\n", accepted, invariant);
  return invariant ? 0 : 1;
}`,
  'cmem-sanitizers-static-analysis-fuzzing': (fn, n) => `
static int ${fn}(int spatial, int temporal, int uninitialized, int race) {
  int tools = 0;
  if (spatial || temporal) tools |= 1;
  if (uninitialized) tools |= 2;
  if (race) tools |= 4;
  return tools;
}

int main(void) {
  int first = ${fn}(1, 0, 0, 0);
  int changed = ${fn}(0, 0, 1, 1);
  int invariant = first == 1 && changed == 6 && ${n} > 0;
  printf("tool-matrix first=%d changed=%d invariant=%d\\n", first, changed, invariant);
  return invariant ? 0 : 1;
}`,
  'cmem-profiling-performance-hardening': (fn, n) => `
static int ${fn}(size_t live, size_t reserved, size_t peak, size_t limit, size_t *waste) {
  if (waste == NULL || live > reserved || reserved > peak || peak > limit) return 0;
  *waste = reserved - live;
  return 1;
}

int main(void) {
  size_t waste = 0;
  int rejected = ${fn}(40, 32, 64, 128, &waste);
  int accepted = ${fn}(${n}, ${n + 8}, ${n + 16}, 128, &waste);
  int invariant = !rejected && accepted && waste == 8u;
  printf("profile waste=%lu invariant=%d\\n", (unsigned long)waste, invariant);
  return invariant ? 0 : 1;
}`,
  'cmem-testing-release-incident-defense': (fn, n) => `
static int ${fn}(int tests, int sanitizers, int fuzz, int abi, int rollback) {
  int evidence = tests + sanitizers + fuzz + abi + rollback;
  if (!tests || !sanitizers || !fuzz || !abi || !rollback) return 0;
  return evidence + ${n};
}

int main(void) {
  int incomplete = ${fn}(1, 1, 1, 1, 0);
  int ready = ${fn}(1, 1, 1, 1, 1);
  int invariant = incomplete == 0 && ready == ${n + 5};
  printf("release evidence=%d invariant=%d\\n", ready, invariant);
  return invariant ? 0 : 1;
}`,
};

function details(seed) {
  let value = 2166136261;
  for (const character of seed) {
    value ^= character.charCodeAt(0);
    value = Math.imul(value, 16777619);
  }
  return { caseNumber: ((value >>> 0) % 9000) + 1000, variant: ((value >>> 8) % 5) + 2 };
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function programFor(moduleId, functionName, marker, seed) {
  const build = PROGRAMS[moduleId];
  if (!build) throw new Error(`Missing C memory program profile for ${moduleId}`);
  const chosen = details(seed);
  return `${marker}
/* Browser practice: PicoC 3.2.2 C89/C90 plus selected C99. */
/* Changed case ${chosen.caseNumber}; native C23 claims require explicit transfer gates. */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

${build(functionName, chosen.variant)}`;
}

export function cMemoryManagementScenario(moduleId, seed, activityKind = 'practice', competency) {
  const task = MODULE_TASKS[moduleId];
  if (!task) throw new Error(`Missing C memory scenario profile for ${moduleId}`);
  const chosen = details(seed.toString(36));
  const probes = competency ? ` Competency probe: ${competency.statement}` : '';
  return `A ${activityKind} native-systems team handles memory case ${chosen.caseNumber}. Produce bounded C evidence to ${task}; change the size, lifetime, failure, or ownership condition; print the observed result and invariant. Instant code stays inside the PicoC practice subset. C23 syntax, current GCC and Clang, optimization, ABI, threads, sanitizers, analyzers, fuzzers, operating-system resources, foreign runtimes, load, and production behavior require named controlled transfer gates.${probes}`;
}

export function cMemoryManagementEvidenceContract({
  activityKind = 'theory',
  competencyId,
  moduleId,
  functionName,
  marker,
  suffix,
}) {
  const task = MODULE_TASKS[moduleId];
  if (!task) throw new Error(`Missing C memory evidence profile for ${moduleId}`);
  const chosen = details(suffix);
  const example = programFor(moduleId, functionName, marker, suffix);
  const escapedMarker = escapeRegExp(marker);
  const scope = '(?:(?!/\\* Evidence:)[\\s\\S])';
  return {
    marker,
    pattern: `${escapedMarker}${scope}*?static\\s+(?:int|unsigned)\\s+${functionName}\\s*\\([^)]*\\)${scope}*?\\{${scope}*?if\\s*\\(${scope}*?return${scope}*?int\\s+main\\s*\\(\\s*void\\s*\\)${scope}*?printf\\s*\\(${scope}*?invariant`,
    example,
    requirement: `For this ${activityKind} demonstration of ${competencyId}, write the complete compile-ready C program headed "${marker}" for changed case ${chosen.caseNumber}. It must ${task}, reject one changed boundary, print an observable result and invariant, and return nonzero when the invariant fails. Keep instant code within the PicoC 3.2.2 practice subset; do not claim C23, optimizing compiler, sanitizer, ABI, thread, operating-system, FFI, load, or production evidence until its explicit controlled transfer gate passes.`,
  };
}

export function cMemoryManagementWorkedExample(moduleId, seed) {
  return programFor(
    moduleId,
    `worked_${moduleId.replaceAll('-', '_')}_${seed}`,
    `/* Evidence: cmem-worked-${moduleId}-${seed} */`,
    `worked-${moduleId}-${seed}`
  );
}

export const cMemoryManagementEvidenceModuleIds = Object.freeze(Object.keys(MODULE_TASKS));

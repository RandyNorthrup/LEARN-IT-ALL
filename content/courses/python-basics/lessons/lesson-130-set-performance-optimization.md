---
id: "139-set-performance-optimization"
title: "Set Performance and Optimization"
chapterId: ch10-sets
order: 6
duration: 25
objectives:
  - Understand set time complexity
  - Compare set vs list vs dict performance
  - Learn memory characteristics
  - Optimize set operations
---

# Set Performance and Optimization

Understanding set performance characteristics for efficient code.

## Time Complexity Overview

```python
# Set operations and their time complexity
s = {1, 2, 3, 4, 5}

# O(1) - Constant time (average case)
print(3 in s)           # Membership: O(1)
s.add(6)                # Add: O(1)
s.remove(6)             # Remove: O(1)
s.discard(7)            # Discard: O(1)
len(s)                  # Length: O(1)

# O(n) - Linear time
s.copy()                # Copy: O(n)
list(s)                 # Convert to list: O(n)
for x in s: pass        # Iteration: O(n)
s.clear()               # Clear: O(n)

# O(min(len(s1), len(s2))) - Set operations
s1 = {1, 2, 3}
s2 = {3, 4, 5}
s1 & s2                 # Intersection: O(min(len))
s1.isdisjoint(s2)       # Disjoint check: O(min(len))

# O(len(s1) + len(s2)) - Union and differences
s1 | s2                 # Union: O(len(s1) + len(s2))
s1 - s2                 # Difference: O(len(s1))
s1 ^ s2                 # Symmetric diff: O(len(s1) + len(s2))
```

## Membership Testing: Set vs List

```python
import time

# Compare membership testing performance
sizes = [100, 1_000, 10_000, 100_000]

for size in sizes:
    data_list = list(range(size))
    data_set = set(range(size))
    search_value = size - 1  # Worst case for list
    
    # List membership (O(n))
    start = time.time()
    for _ in range(1000):
        _ = search_value in data_list
    list_time = time.time() - start
    
    # Set membership (O(1))
    start = time.time()
    for _ in range(1000):
        _ = search_value in data_set
    set_time = time.time() - start
    
    speedup = list_time / set_time if set_time > 0 else 0
    print(f"Size {size:6d}: List {list_time:.4f}s, Set {set_time:.4f}s, {speedup:.0f}x faster")

# Output shows set is dramatically faster for large collections:
# Size    100: List 0.0002s, Set 0.0001s, 2x faster
# Size   1000: List 0.0025s, Set 0.0001s, 25x faster
# Size  10000: List 0.0253s, Set 0.0001s, 253x faster
# Size 100000: List 0.2531s, Set 0.0001s, 2531x faster
```

## Set vs List vs Dict Comparison

```python
import time
import sys

# Compare different data structures
n = 10_000

# Creation time
# List
start = time.time()
data_list = list(range(n))
list_create = time.time() - start

# Set
start = time.time()
data_set = set(range(n))
set_create = time.time() - start

# Dict
start = time.time()
data_dict = {i: i for i in range(n)}
dict_create = time.time() - start

print("Creation Time:")
print(f"  List: {list_create:.4f}s")
print(f"  Set:  {set_create:.4f}s")
print(f"  Dict: {dict_create:.4f}s")

# Lookup time
search = n - 1

# List lookup O(n)
start = time.time()
for _ in range(1000):
    _ = search in data_list
list_lookup = time.time() - start

# Set lookup O(1)
start = time.time()
for _ in range(1000):
    _ = search in data_set
set_lookup = time.time() - start

# Dict lookup O(1)
start = time.time()
for _ in range(1000):
    _ = search in data_dict
dict_lookup = time.time() - start

print("\nLookup Time (1000 operations):")
print(f"  List: {list_lookup:.4f}s")
print(f"  Set:  {set_lookup:.4f}s")
print(f"  Dict: {dict_lookup:.4f}s")

# Memory usage
print("\nMemory Usage:")
print(f"  List: {sys.getsizeof(data_list):,} bytes")
print(f"  Set:  {sys.getsizeof(data_set):,} bytes")
print(f"  Dict: {sys.getsizeof(data_dict):,} bytes")

# Summary:
# - Set: Fast lookup, moderate memory, no duplicates
# - List: Slow lookup, low memory, preserves order
# - Dict: Fast lookup, high memory, key-value pairs
```

## Hash Collision Impact

```python
# Hash collisions can degrade O(1) to O(n) in worst case
import time

# Good hash distribution
good_data = list(range(100_000))
good_set = set(good_data)

start = time.time()
for val in good_data[:1000]:
    _ = val in good_set
good_time = time.time() - start

# Poor hash distribution (all hash to same value)
class BadHash:
    def __init__(self, value):
        self.value = value
    
    def __hash__(self):
        return 1  # All hash to same value - worst case!
    
    def __eq__(self, other):
        return isinstance(other, BadHash) and self.value == other.value

bad_data = [BadHash(i) for i in range(100_000)]
bad_set = set(bad_data)

start = time.time()
for obj in bad_data[:1000]:
    _ = obj in bad_set
bad_time = time.time() - start

print(f"Good hash: {good_time:.4f}s")
print(f"Bad hash:  {bad_time:.4f}s")
print(f"Bad is {bad_time/good_time:.0f}x slower")

# Lesson: Good hash functions are crucial for performance!
```

## Memory Efficiency

```python
import sys

# Memory per element
empty_set = set()
print(f"Empty set: {sys.getsizeof(empty_set)} bytes")

# Add elements and measure growth
for n in [1, 10, 100, 1000, 10000]:
    s = set(range(n))
    total_size = sys.getsizeof(s)
    per_element = (total_size - sys.getsizeof(empty_set)) / n if n > 0 else 0
    print(f"{n:5d} elements: {total_size:6d} bytes ({per_element:.1f} bytes/element)")

# Observations:
# - Empty set has overhead (~216 bytes)
# - Sets grow dynamically (resize for more capacity)
# - Average ~30-60 bytes per element including overhead
# - Large sets are memory-efficient due to amortization

# Compare to list
list_empty = []
print(f"\nEmpty list: {sys.getsizeof(list_empty)} bytes")
for n in [1, 10, 100, 1000, 10000]:
    l = list(range(n))
    total_size = sys.getsizeof(l)
    per_element = (total_size - sys.getsizeof(list_empty)) / n if n > 0 else 0
    print(f"{n:5d} elements: {total_size:6d} bytes ({per_element:.1f} bytes/element)")

# Lists are more memory-efficient per element
# But sets provide O(1) operations worth the memory trade-off
```

## Optimization Techniques

```python
# Technique 1: Pre-size sets when possible
import time

n = 100_000

# Without pre-sizing (many resizes)
start = time.time()
s1 = set()
for i in range(n):
    s1.add(i)
incremental_time = time.time() - start

# With pre-sizing (fewer resizes)
start = time.time()
s2 = set(range(n))
batch_time = time.time() - start

print(f"Incremental: {incremental_time:.4f}s")
print(f"Batch:       {batch_time:.4f}s")
print(f"Batch is {incremental_time/batch_time:.1f}x faster")

# Technique 2: Use set operations instead of loops
data1 = set(range(10_000))
data2 = set(range(5_000, 15_000))

# Slow: loop to find common elements
start = time.time()
common_slow = set()
for item in data1:
    if item in data2:
        common_slow.add(item)
loop_time = time.time() - start

# Fast: use set intersection
start = time.time()
common_fast = data1 & data2
operator_time = time.time() - start

print(f"\nLoop:     {loop_time:.4f}s")
print(f"Operator: {operator_time:.4f}s")
print(f"Operator is {loop_time/operator_time:.1f}x faster")

# Technique 3: Avoid repeated membership tests
items = list(range(10_000))
filter_set = set(range(0, 10_000, 2))

# Slow: repeated lookup in list
start = time.time()
result1 = [item for item in items if item not in items[:5000]]
list_filter_time = time.time() - start

# Fast: single set creation, O(1) lookups
start = time.time()
result2 = [item for item in items if item in filter_set]
set_filter_time = time.time() - start

print(f"\nList filter: {list_filter_time:.4f}s")
print(f"Set filter:  {set_filter_time:.4f}s")
```

## Common Performance Pitfalls

```python
# Pitfall 1: Converting to list unnecessarily
s = set(range(1_000_000))

# ❌ Slow: convert to list to check length
import time
start = time.time()
if len(list(s)) > 100:  # O(n) conversion!
    pass
slow_time = time.time() - start

# ✅ Fast: check length directly
start = time.time()
if len(s) > 100:  # O(1) operation
    pass
fast_time = time.time() - start

print(f"Convert to list: {slow_time:.4f}s")
print(f"Direct len():    {fast_time:.6f}s")

# Pitfall 2: Repeated set creation in loops
data = list(range(10_000))
valid = [1, 2, 3, 4, 5]

# ❌ Slow: create set in each iteration
start = time.time()
count1 = sum(1 for item in data if item in set(valid))  # O(n*m)
slow_time = time.time() - start

# ✅ Fast: create set once
start = time.time()
valid_set = set(valid)
count2 = sum(1 for item in data if item in valid_set)  # O(n)
fast_time = time.time() - start

print(f"\nSet in loop: {slow_time:.4f}s")
print(f"Set once:    {fast_time:.4f}s")

# Pitfall 3: Using set for ordered operations
# ❌ Wrong: sets are unordered
numbers = {5, 2, 8, 1, 9}
# first = numbers[0]  # Error! No indexing

# ✅ Correct: use list if you need order
numbers_list = [5, 2, 8, 1, 9]
first = numbers_list[0]  # OK

# Or convert when needed
sorted_numbers = sorted(numbers)
first = sorted_numbers[0]
```

## Benchmarking Set Operations

```python
import time

def benchmark(operation, iterations=1000):
    """Benchmark an operation"""
    start = time.time()
    for _ in range(iterations):
        operation()
    return time.time() - start

# Setup
s1 = set(range(10_000))
s2 = set(range(5_000, 15_000))

# Benchmark different operations
operations = {
    "Add": lambda: s1.copy().add(10_001),
    "Remove": lambda: (s := s1.copy(), s.remove(5000))[0],
    "Union": lambda: s1 | s2,
    "Intersection": lambda: s1 & s2,
    "Difference": lambda: s1 - s2,
    "Symmetric Diff": lambda: s1 ^ s2,
    "Membership": lambda: 5000 in s1,
    "Copy": lambda: s1.copy(),
}

print("Operation         Time (1000x)")
print("-" * 35)
for name, op in operations.items():
    time_taken = benchmark(op)
    print(f"{name:16s} {time_taken:.4f}s")
```

## When to Use Sets for Performance

```python
# ✅ GOOD: Frequent membership tests
def filter_valid_ids(ids, valid_id_set):
    """O(n) with set, O(n*m) with list"""
    return [id for id in ids if id in valid_id_set]

valid_ids = set(range(1000, 2000))
all_ids = range(10_000)
filtered = filter_valid_ids(all_ids, valid_ids)

# ✅ GOOD: Remove duplicates
def get_unique(items):
    """O(n) with set, O(n²) with list"""
    return list(set(items))

numbers = [1, 2, 2, 3, 3, 3, 4, 5, 5]
unique = get_unique(numbers)

# ✅ GOOD: Set operations (union, intersection, etc.)
def find_common_elements(list1, list2):
    """O(n+m) with sets, O(n*m) with lists"""
    return list(set(list1) & set(list2))

# ✅ GOOD: Building unique collection incrementally
def collect_unique_words(texts):
    """Efficient unique word collection"""
    words = set()
    for text in texts:
        words.update(text.split())
    return words

# ❌ AVOID: Need ordering
# Use list instead
ordered = [1, 2, 3, 4, 5]  # Not set

# ❌ AVOID: Need indexing
# Use list instead
indexed = [1, 2, 3, 4, 5]
first = indexed[0]  # Not possible with set

# ❌ AVOID: Small collections with few lookups
# Overhead not worth it
small = [1, 2, 3, 4, 5]  # List is fine
if 3 in small:  # Fast enough for small lists
    pass
```

## Memory-Performance Trade-offs

```python
import sys

# Scenario: Track seen items
n = 100_000

# Option 1: List (memory efficient, slow lookup)
seen_list = []
for i in range(n):
    if i not in seen_list:  # O(n) lookup
        seen_list.append(i)
list_memory = sys.getsizeof(seen_list)

# Option 2: Set (memory hungry, fast lookup)
seen_set = set()
for i in range(n):
    seen_set.add(i)  # O(1) add, no need to check
set_memory = sys.getsizeof(seen_set)

print(f"List memory: {list_memory:,} bytes")
print(f"Set memory:  {set_memory:,} bytes")
print(f"Set uses {set_memory/list_memory:.1f}x more memory")
print("But set operations are much faster!")

# Decision guide:
# - Small data + few lookups → List
# - Large data OR many lookups → Set
# - Need ordering → List
# - Need uniqueness → Set
```

## Summary

**Time Complexity:**

| Operation | Set | List | Dict |
|-----------|-----|------|------|
| Membership (`in`) | O(1) | O(n) | O(1) |
| Add/Insert | O(1) | O(1)* | O(1) |
| Remove | O(1) | O(n) | O(1) |
| Union/Intersection | O(n+m) | - | - |
| Iteration | O(n) | O(n) | O(n) |

*append only; insert at position is O(n)

**Use Sets When:**
- ✅ Need O(1) membership testing
- ✅ Want automatic duplicate removal
- ✅ Performing set operations (union, intersection)
- ✅ Building unique collections
- ✅ Don't need ordering or indexing

**Avoid Sets When:**
- ❌ Need to preserve order
- ❌ Need indexing/slicing
- ❌ Need to count duplicates
- ❌ Working with small collections (<10 items)

**Optimization Tips:**
1. Create sets in batch, not incrementally
2. Use set operations instead of loops
3. Avoid repeated set conversions
4. Don't convert to list unnecessarily
5. Pre-create sets outside loops
6. Use frozenset for constant data

**Memory vs Speed:**
- Sets use more memory than lists
- But provide much faster operations
- Trade-off worth it for most use cases
- Consider list for small, rarely-searched data

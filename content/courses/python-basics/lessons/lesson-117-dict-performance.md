---
id: "127-dict-performance"
title: "Dictionary Performance and Memory"
chapterId: ch9-dictionaries
order: 8
duration: 25
objectives:
  - Understand dictionary internal implementation
  - Learn time complexity of operations
  - Master performance optimization
  - Avoid common performance pitfalls
---

# Dictionary Performance and Memory

Understanding dictionary performance helps write efficient Python code.

## Hash Table Implementation

```python
# Dictionaries use hash tables
# Key → hash() → index in array → value

# Example of hash function
key = "example"
hash_value = hash(key)
print(f"Hash of '{key}': {hash_value}")

# Same key always has same hash
print(hash("test") == hash("test"))  # True

# Different objects have different hashes (usually)
print(hash("a") != hash("b"))  # True

# Hash determines bucket location
# Simplified: index = hash(key) % table_size

# Check hashability
from collections.abc import Hashable
print(isinstance("string", Hashable))  # True
print(isinstance([1, 2], Hashable))    # False
```

## Time Complexity

```python
# Dictionary operations time complexity

d = {"a": 1, "b": 2, "c": 3}

# O(1) - Average case constant time
value = d["a"]              # Access
d["d"] = 4                  # Insert
d["a"] = 99                 # Update
del d["a"]                  # Delete
exists = "b" in d           # Membership
value = d.get("c")          # get()
d.setdefault("e", 5)        # setdefault()
item = d.pop("b")           # pop()
item = d.popitem()          # popitem()

# O(n) - Linear time (n = number of items)
keys = list(d.keys())       # keys() view → list
values = list(d.values())   # values() view → list
items = list(d.items())     # items() view → list
d.clear()                   # Clear all
copy = d.copy()             # Shallow copy

# Views are O(1) to create
keys_view = d.keys()        # O(1) - creates view
values_view = d.values()    # O(1) - creates view
items_view = d.items()      # O(1) - creates view

# Iteration is O(n)
for k in d:                 # O(n)
    pass
for k, v in d.items():      # O(n)
    pass
```

## Performance Benchmarks

```python
import time

# Create large dictionary
n = 100000
large_dict = {i: i**2 for i in range(n)}

# Test access speed
start = time.time()
for i in range(10000):
    value = large_dict[i]
access_time = time.time() - start
print(f"Access 10k items: {access_time:.6f}s")

# Test insertion speed
start = time.time()
for i in range(n, n + 10000):
    large_dict[i] = i**2
insert_time = time.time() - start
print(f"Insert 10k items: {insert_time:.6f}s")

# Test membership testing
start = time.time()
for i in range(10000):
    exists = i in large_dict
membership_time = time.time() - start
print(f"Membership 10k: {membership_time:.6f}s")

# Test iteration
start = time.time()
count = 0
for k, v in large_dict.items():
    count += 1
iteration_time = time.time() - start
print(f"Iterate all items: {iteration_time:.6f}s")

# All operations are very fast!
```

## Dictionary vs List Performance

```python
import time

n = 10000

# Create data structures
dict_data = {i: i**2 for i in range(n)}
list_data = list(range(n))

# Search in dict - O(1)
start = time.time()
for i in range(1000):
    exists = i in dict_data
dict_search = time.time() - start

# Search in list - O(n)
start = time.time()
for i in range(1000):
    exists = i in list_data
list_search = time.time() - start

print(f"Dict search: {dict_search:.6f}s")
print(f"List search: {list_search:.6f}s")
print(f"Speedup: {list_search / dict_search:.1f}x")
# Dict is ~100-1000x faster for membership!

# Access by index
# List: O(1) by index
# Dict: O(1) by key
# Both very fast for direct access
```

## Dictionary vs Set Performance

```python
import time

n = 10000
data = list(range(n))

# Create structures
dict_data = {i: i**2 for i in data}
set_data = set(data)

# Membership testing (both O(1))
start = time.time()
for i in range(1000):
    exists = i in dict_data
dict_time = time.time() - start

start = time.time()
for i in range(1000):
    exists = i in set_data
set_time = time.time() - start

print(f"Dict membership: {dict_time:.6f}s")
print(f"Set membership:  {set_time:.6f}s")
# Similar performance for membership

# Sets are slightly faster and use less memory
# Use sets when you only need keys, not values
```

## Memory Usage

```python
import sys

# Empty dict overhead
empty = {}
print(f"Empty dict: {sys.getsizeof(empty)} bytes")  # ~232 bytes

# Small dict
small = {"a": 1, "b": 2, "c": 3}
print(f"3 items: {sys.getsizeof(small)} bytes")  # ~232 bytes

# Medium dict
medium = {i: i for i in range(100)}
print(f"100 items: {sys.getsizeof(medium)} bytes")  # ~4704 bytes

# Large dict
large = {i: i for i in range(10000)}
print(f"10k items: {sys.getsizeof(large)} bytes")  # ~393,208 bytes

# Memory per item
print(f"Bytes per item (10k): {sys.getsizeof(large) / 10000:.1f}")

# Dict resizes as it grows
# Capacity: 8 → 16 → 32 → 64 → 128 → 256 → ...
# Resize happens at ~2/3 full to maintain O(1) performance
```

## Comparing Memory Structures

```python
import sys

n = 1000

# Dictionary
d = {i: i**2 for i in range(n)}
print(f"Dict: {sys.getsizeof(d):,} bytes")

# List of tuples
lst = [(i, i**2) for i in range(n)]
print(f"List: {sys.getsizeof(lst):,} bytes")

# Two lists (keys and values)
keys = list(range(n))
values = [i**2 for i in range(n)]
print(f"Two lists: {sys.getsizeof(keys) + sys.getsizeof(values):,} bytes")

# Dict is more memory efficient than list of tuples
# But two separate lists use even less memory
# Trade-off: dict provides O(1) lookup
```

## Hash Collision Impact

```python
# Simulate hash collisions
class BadHash:
    """Object with terrible hash function"""
    def __init__(self, value):
        self.value = value
    
    def __hash__(self):
        # Always return same hash - worst case!
        return 42
    
    def __eq__(self, other):
        return isinstance(other, BadHash) and self.value == other.value
    
    def __repr__(self):
        return f"BadHash({self.value})"

# Create dict with many collisions
import time

# Good hashing (normal dict)
good_dict = {i: i**2 for i in range(1000)}

start = time.time()
for i in range(1000):
    val = good_dict[i]
good_time = time.time() - start

# Bad hashing (all same hash)
bad_dict = {BadHash(i): i**2 for i in range(1000)}

start = time.time()
for i in range(1000):
    val = bad_dict[BadHash(i)]
bad_time = time.time() - start

print(f"Good hashing: {good_time:.6f}s")
print(f"Bad hashing:  {bad_time:.6f}s")
print(f"Slowdown: {bad_time / good_time:.1f}x")
# Bad hashing can be 10-100x slower!

# With collisions, lookup becomes O(n) instead of O(1)
```

## Optimization Techniques

```python
# 1. Pre-size dictionaries if you know size
import sys

# Method 1: Build incrementally (triggers resizes)
d1 = {}
for i in range(1000):
    d1[i] = i**2
size1 = sys.getsizeof(d1)

# Method 2: Create all at once (more efficient)
d2 = {i: i**2 for i in range(1000)}
size2 = sys.getsizeof(d2)

print(f"Incremental: {size1} bytes")
print(f"At once:     {size2} bytes")
# Similar size, but at-once is faster

# 2. Use dict.fromkeys() for many keys same value
keys = range(10000)

import time
start = time.time()
d1 = {k: 0 for k in keys}
comp_time = time.time() - start

start = time.time()
d2 = dict.fromkeys(keys, 0)
fromkeys_time = time.time() - start

print(f"Comprehension: {comp_time:.6f}s")
print(f"fromkeys():    {fromkeys_time:.6f}s")
# fromkeys() is usually faster

# 3. Avoid repeated dict[key] lookups
data = {"a": [1, 2, 3], "b": [4, 5, 6]}

# Slow: Multiple lookups
for i in range(3):
    data["a"][i] *= 2  # Looks up "a" each time

# Fast: Look up once
lst = data["a"]
for i in range(3):
    lst[i] *= 2

# 4. Use get() with default instead of try-except
import time

d = {i: i**2 for i in range(1000)}

# Slow: try-except
start = time.time()
for i in range(2000):
    try:
        val = d[i]
    except KeyError:
        val = 0
except_time = time.time() - start

# Fast: get()
start = time.time()
for i in range(2000):
    val = d.get(i, 0)
get_time = time.time() - start

print(f"try-except: {except_time:.6f}s")
print(f"get():      {get_time:.6f}s")
# get() is much faster when key often missing
```

## Common Performance Pitfalls

```python
# ❌ Pitfall 1: Repeated lookups
d = {"data": [1, 2, 3, 4, 5]}

# Bad: Looks up "data" 5 times
total = sum(d["data"][i] for i in range(5))

# Good: Look up once
data = d["data"]
total = sum(data[i] for i in range(5))

# ❌ Pitfall 2: Checking membership before access
d = {"a": 1, "b": 2, "c": 3}

# Bad: Two lookups
if "a" in d:
    value = d["a"]  # Lookup again!

# Good: Single lookup with get()
value = d.get("a")
if value is not None:
    # Use value

# Or use try-except if KeyError is rare
try:
    value = d["a"]
except KeyError:
    value = None

# ❌ Pitfall 3: Building dict with many individual inserts
# Bad: Many resizes
d = {}
for i in range(10000):
    d[i] = i**2

# Good: Comprehension (more efficient)
d = {i: i**2 for i in range(10000)}

# ❌ Pitfall 4: Iterating and modifying
d = {"a": 1, "b": 2, "c": 3}

# Bad: Modifying during iteration
# for k in d:
#     if d[k] > 1:
#         del d[k]  # RuntimeError!

# Good: Iterate over copy
for k in list(d.keys()):
    if d[k] > 1:
        del d[k]

# Better: Build new dict
d = {k: v for k, v in d.items() if v <= 1}

# ❌ Pitfall 5: Using mutable default with fromkeys()
# Bad: All keys share same list!
d = dict.fromkeys(["a", "b", "c"], [])
d["a"].append(1)  # Affects all keys!

# Good: Comprehension creates separate lists
d = {k: [] for k in ["a", "b", "c"]}
d["a"].append(1)  # Only affects "a"
```

## When to Use Alternatives

```python
# Use regular dict when:
# - Need key-value mapping
# - Keys are hashable
# - Need O(1) lookup

# Use defaultdict when:
# - Need default values for missing keys
from collections import defaultdict
counts = defaultdict(int)
for item in [1, 2, 1, 3, 2, 1]:
    counts[item] += 1  # No KeyError

# Use Counter when:
# - Counting occurrences
from collections import Counter
counts = Counter([1, 2, 1, 3, 2, 1])
print(counts.most_common(2))  # [(1, 3), (2, 2)]

# Use OrderedDict when:
# - Need to maintain insertion order (Python < 3.7)
# - Need to reorder items
from collections import OrderedDict
od = OrderedDict([("a", 1), ("b", 2)])
od.move_to_end("a")  # Move "a" to end

# Use ChainMap when:
# - Need layered lookups without copying
from collections import ChainMap
defaults = {"theme": "light"}
user = {"theme": "dark"}
config = ChainMap(user, defaults)  # No copying

# Use array or list when:
# - Need integer keys 0, 1, 2, ...
# - Memory efficiency critical
# - Don't need O(1) by value lookup
```

## Best Practices

```python
# ✅ DO: Use comprehensions for creation
d = {k: v for k, v in items}

# ✅ DO: Use get() with defaults
value = d.get(key, default)

# ✅ DO: Use setdefault() for init-and-update
d.setdefault(key, []).append(value)

# ✅ DO: Pre-allocate if size known
d = {k: None for k in keys}  # Initialize

# ✅ DO: Use membership testing
if key in d:
    # Fast O(1) check

# ✅ DO: Iterate with items() when need both
for k, v in d.items():
    # Use both key and value

# ❌ DON'T: Lookup repeatedly
# Bad: d[key].method1(); d[key].method2()
# Good: obj = d[key]; obj.method1(); obj.method2()

# ❌ DON'T: Check then access
# Bad: if k in d: v = d[k]
# Good: v = d.get(k)

# ❌ DON'T: Modify during iteration
# Bad: for k in d: del d[k]
# Good: for k in list(d): del d[k]

# ❌ DON'T: Use unhashable keys
# Bad: d[[1, 2]] = value  # TypeError!
# Good: d[tuple([1, 2])] = value
```

## Summary

**Time Complexity:**

| Operation | Average | Worst Case |
|-----------|---------|------------|
| Access `d[key]` | O(1) | O(n) |
| Insert `d[key] = v` | O(1) | O(n) |
| Delete `del d[key]` | O(1) | O(n) |
| Membership `k in d` | O(1) | O(n) |
| Iteration | O(n) | O(n) |
| Copy | O(n) | O(n) |

**Memory:**
- Empty dict: ~232 bytes overhead
- Growth: Resizes at ~2/3 full
- Each entry: ~40-60 bytes (key + value + overhead)

**Optimization Tips:**
- ✅ Use comprehensions for bulk creation
- ✅ Use `get()` instead of try-except for missing keys
- ✅ Use `setdefault()` for initialize-and-update
- ✅ Look up once, use many times
- ✅ Use `in` for membership testing (O(1))
- ❌ Avoid modifying during iteration
- ❌ Avoid repeated lookups
- ❌ Avoid poor hash functions

**Remember:** Dictionaries are very fast - O(1) average case for all major operations!

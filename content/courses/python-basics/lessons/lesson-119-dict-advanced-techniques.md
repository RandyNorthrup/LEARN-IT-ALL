---
id: lesson-119-dict-advanced-techniques
title: "Advanced Dictionary Techniques"
chapterId: ch9-dictionaries
order: 10
duration: 30
objectives:
  - Master advanced dictionary patterns
  - Learn OrderedDict and ChainMap
  - Understand dictionary views in depth
  - Apply advanced techniques to problems
---

# Advanced Dictionary Techniques

Advanced patterns and specialized dict types for complex use cases.

## OrderedDict - Maintaining Order

```python
from collections import OrderedDict

# Python 3.7+: Regular dicts maintain insertion order
# OrderedDict provides additional ordering methods

# Regular dict (Python 3.7+)
regular = {"a": 1, "b": 2, "c": 3}
print(list(regular.keys()))  # ['a', 'b', 'c'] - ordered

# OrderedDict
ordered = OrderedDict([("a", 1), ("b", 2), ("c", 3)])
print(list(ordered.keys()))  # ['a', 'b', 'c']

# move_to_end() - unique to OrderedDict
ordered.move_to_end("a")  # Move to end
print(list(ordered.keys()))  # ['b', 'c', 'a']

ordered.move_to_end("a", last=False)  # Move to front
print(list(ordered.keys()))  # ['a', 'b', 'c']

# popitem() - LIFO in OrderedDict
ordered.popitem(last=True)  # Remove from end
print(list(ordered.keys()))  # ['a', 'b']

ordered.popitem(last=False)  # Remove from front
print(list(ordered.keys()))  # ['b']

# Use case: LRU Cache implementation using functions
def create_lru_cache(capacity):
    """Create a new LRU cache"""
    return {"_store": OrderedDict(), "_capacity": capacity}

def lru_get(cache, key):
    """Get value, mark as recently used"""
    if key not in cache["_store"]:
        return None
    cache["_store"].move_to_end(key)  # Mark as recently used
    return cache["_store"][key]

def lru_put(cache, key, value):
    """Put value, evict if over capacity"""
    if key in cache["_store"]:
        cache["_store"].move_to_end(key)
    cache["_store"][key] = value
    if len(cache["_store"]) > cache["_capacity"]:
        cache["_store"].popitem(last=False)  # Remove least recently used

cache = create_lru_cache(3)
lru_put(cache, "a", 1)
lru_put(cache, "b", 2)
lru_put(cache, "c", 3)
lru_get(cache, "a")  # Access "a"
lru_put(cache, "d", 4)  # Evicts "b" (least recently used)
print(list(cache["_store"].keys()))  # ['c', 'a', 'd']
```

## ChainMap - Layered Lookups

```python
from collections import ChainMap

# ChainMap groups multiple dicts without copying
defaults = {"color": "blue", "size": "medium"}
user_prefs = {"color": "red"}
runtime = {"theme": "dark"}

# Create chain
config = ChainMap(runtime, user_prefs, defaults)

# Lookup searches in order
print(config["color"])  # red (from user_prefs)
print(config["size"])   # medium (from defaults)
print(config["theme"])  # dark (from runtime)

# Modifications go to first dict
config["debug"] = True
print(runtime)  # {'theme': 'dark', 'debug': True}
print(user_prefs)  # {'color': 'red'} - unchanged

# Add new context
temporary = {}
config = config.new_child(temporary)
config["temp"] = "value"
print(temporary)  # {'temp': 'value'}

# Remove context
config = config.parents
print("temp" in config)  # False

# Use case: Nested scopes
global_scope = {"x": 1, "y": 2}
local_scope = {"x": 10}
scopes = ChainMap(local_scope, global_scope)
print(scopes["x"])  # 10 (local shadows global)
print(scopes["y"])  # 2 (from global)

# Use case: Configuration hierarchy
system_config = {"timeout": 30, "retries": 3}
app_config = {"timeout": 60}
user_config = {"theme": "dark"}

config = ChainMap(user_config, app_config, system_config)
print(config["timeout"])  # 60 (app overrides system)
print(config["retries"])  # 3 (from system)
```

## Dictionary Views in Depth

```python
# Dictionary views are dynamic
d = {"a": 1, "b": 2, "c": 3}

keys_view = d.keys()
values_view = d.values()
items_view = d.items()

# Views reflect changes
d["d"] = 4
print(keys_view)  # dict_keys(['a', 'b', 'c', 'd'])

# Views are iterable
for key in keys_view:
    print(key)

# Views support membership testing
print("a" in keys_view)  # True - O(1)
print(1 in values_view)  # True - O(n)
print(("a", 1) in items_view)  # True - O(1)

# Views are sized
print(len(keys_view))  # 4

# Set operations on keys views
dict1 = {"a": 1, "b": 2, "c": 3}
dict2 = {"b": 20, "c": 30, "d": 4}

# Union - all keys
all_keys = dict1.keys() | dict2.keys()
print(all_keys)  # {'a', 'b', 'c', 'd'}

# Intersection - common keys
common = dict1.keys() & dict2.keys()
print(common)  # {'b', 'c'}

# Difference - keys in dict1 but not dict2
unique = dict1.keys() - dict2.keys()
print(unique)  # {'a'}

# Symmetric difference - keys in either but not both
sym_diff = dict1.keys() ^ dict2.keys()
print(sym_diff)  # {'a', 'd'}

# Set operations on items views
common_items = dict1.items() & dict2.items()
print(common_items)  # set() - no items match exactly

# Find items with same key but different value
dict1 = {"a": 1, "b": 2}
dict2 = {"a": 1, "b": 20}
different = dict1.items() ^ dict2.items()
print(different)  # {('b', 2), ('b', 20)}
```

## Dictionary Subclassing Alternatives

```python
# Custom dictionary behavior using functions and built-in types

# Default value for missing keys — use collections.defaultdict
from collections import defaultdict

d = defaultdict(lambda: "N/A", {"a": 1, "b": 2})
print(d["a"])        # 1
print(d["missing"])  # N/A

# Or use a helper function with a regular dict
def get_with_default(d, key, default_value="N/A"):
    """Get value with a default for missing keys"""
    return d.get(key, default_value)

plain = {"a": 1, "b": 2}
print(get_with_default(plain, "a"))        # 1
print(get_with_default(plain, "missing"))  # N/A

# Case-insensitive dictionary using helper functions
def ci_set(d, key, value):
    """Set key-value with case-insensitive key"""
    d[key.lower()] = value

def ci_get(d, key):
    """Get value with case-insensitive key"""
    return d[key.lower()]

def ci_contains(d, key):
    """Check membership case-insensitively"""
    return key.lower() in d

d = {}
ci_set(d, "Name", "Alice")
print(ci_get(d, "name"))  # Alice
print(ci_get(d, "NAME"))  # Alice
print(ci_contains(d, "NaMe"))  # True

# Immutable (read-only) dictionary using types.MappingProxyType
from types import MappingProxyType

mutable_data = {"a": 1, "b": 2}
frozen = MappingProxyType(mutable_data)
print(frozen["a"])  # 1

try:
    frozen["c"] = 3
except TypeError as e:
    print(e)  # 'mappingproxy' object does not support item assignment

# MappingProxyType provides a read-only view of a dict
# Useful when you want to expose data without allowing modification
```

## Dictionary Unpacking Patterns

```python
# Basic unpacking
dict1 = {"a": 1, "b": 2}
dict2 = {"c": 3, "d": 4}
merged = {**dict1, **dict2}
print(merged)  # {'a': 1, 'b': 2, 'c': 3, 'd': 4}

# Unpack with additional keys
merged = {**dict1, "e": 5, "f": 6}
print(merged)  # {'a': 1, 'b': 2, 'e': 5, 'f': 6}

# Conditional unpacking
include_c = True
merged = {
    **dict1,
    **dict2,
    **({"c": 99} if include_c else {})
}

# Function with ** unpacking
def configure(**kwargs):
    config = {"debug": False, "port": 8000}
    config.update(kwargs)
    return config

result = configure(debug=True, host="localhost")
print(result)  # {'debug': True, 'port': 8000, 'host': 'localhost'}

# Unpack multiple dicts conditionally
dicts = [{"a": 1}, {"b": 2}, {"c": 3}]
merged = {}
for d in dicts:
    merged = {**merged, **d}
print(merged)  # {'a': 1, 'b': 2, 'c': 3}
```

## Dictionary Filtering Patterns

```python
# Filter by keys
data = {"a": 1, "b": 2, "c": 3, "d": 4}
keys_to_keep = ["a", "c"]
filtered = {k: data[k] for k in keys_to_keep if k in data}
print(filtered)  # {'a': 1, 'c': 3}

# Filter by value
filtered = {k: v for k, v in data.items() if v > 2}
print(filtered)  # {'c': 3, 'd': 4}

# Filter by key pattern
filtered = {k: v for k, v in data.items() if k.startswith('a')}

# Exclude keys
exclude = ["b", "d"]
filtered = {k: v for k, v in data.items() if k not in exclude}
print(filtered)  # {'a': 1, 'c': 3}

# Filter None values
data = {"a": 1, "b": None, "c": 3, "d": None}
filtered = {k: v for k, v in data.items() if v is not None}
print(filtered)  # {'a': 1, 'c': 3}

# Filter empty values
data = {"a": [1, 2], "b": [], "c": "hello", "d": ""}
filtered = {k: v for k, v in data.items() if v}
print(filtered)  # {'a': [1, 2], 'c': 'hello'}

# Complex filtering
data = {
    "user1": {"age": 30, "active": True},
    "user2": {"age": 25, "active": False},
    "user3": {"age": 35, "active": True}
}
filtered = {
    k: v for k, v in data.items()
    if v["active"] and v["age"] >= 30
}
print(filtered)  # {'user1': {...}, 'user3': {...}}
```

## Dictionary Transformation Patterns

```python
# Transform keys
data = {"first_name": "Alice", "last_name": "Smith"}
transformed = {k.replace("_", ""): v for k, v in data.items()}
print(transformed)  # {'firstname': 'Alice', 'lastname': 'Smith'}

# Transform values
data = {"a": "1", "b": "2", "c": "3"}
transformed = {k: int(v) for k, v in data.items()}
print(transformed)  # {'a': 1, 'b': 2, 'c': 3}

# Transform both
data = {"a": 1, "b": 2, "c": 3}
transformed = {k.upper(): v * 10 for k, v in data.items()}
print(transformed)  # {'A': 10, 'B': 20, 'C': 30}

# Nested transformation
data = {
    "user1": {"age": "30", "score": "100"},
    "user2": {"age": "25", "score": "85"}
}
transformed = {
    user: {k: int(v) for k, v in info.items()}
    for user, info in data.items()
}

# Apply function to all values
def process(value):
    return value * 2 if value > 5 else value

data = {"a": 3, "b": 7, "c": 10}
transformed = {k: process(v) for k, v in data.items()}
print(transformed)  # {'a': 3, 'b': 14, 'c': 20}
```

## Dictionary Inversion Techniques

```python
# Simple inversion
original = {"a": 1, "b": 2, "c": 3}
inverted = {v: k for k, v in original.items()}
print(inverted)  # {1: 'a', 2: 'b', 3: 'c'}

# Handle duplicate values
from collections import defaultdict

original = {"a": 1, "b": 2, "c": 1, "d": 2}
inverted = defaultdict(list)
for key, value in original.items():
    inverted[value].append(key)
print(dict(inverted))  # {1: ['a', 'c'], 2: ['b', 'd']}

# Invert nested dict
original = {
    "Alice": {"age": 30, "city": "NYC"},
    "Bob": {"age": 25, "city": "LA"}
}
by_city = defaultdict(list)
for name, info in original.items():
    by_city[info["city"]].append(name)
print(dict(by_city))  # {'NYC': ['Alice'], 'LA': ['Bob']}

# Multi-level inversion
original = {
    ("Alice", "Math"): 95,
    ("Alice", "Science"): 90,
    ("Bob", "Math"): 85
}
by_subject = defaultdict(dict)
for (name, subject), score in original.items():
    by_subject[subject][name] = score
print(dict(by_subject))
# {'Math': {'Alice': 95, 'Bob': 85}, 'Science': {'Alice': 90}}
```

## Functional Programming with Dicts

```python
from functools import reduce

# Map over dict
data = {"a": 1, "b": 2, "c": 3}
doubled = dict(map(lambda item: (item[0], item[1] * 2), data.items()))
print(doubled)  # {'a': 2, 'b': 4, 'c': 6}

# Filter dict
filtered = dict(filter(lambda item: item[1] > 1, data.items()))
print(filtered)  # {'b': 2, 'c': 3}

# Reduce dict values
total = reduce(lambda acc, item: acc + item[1], data.items(), 0)
print(total)  # 6

# Combine multiple dicts
dicts = [{"a": 1}, {"b": 2}, {"c": 3}]
merged = reduce(lambda a, b: {**a, **b}, dicts, {})
print(merged)  # {'a': 1, 'b': 2, 'c': 3}

# Chain operations
data = {"a": 1, "b": 2, "c": 3, "d": 4}
result = dict(
    filter(
        lambda item: item[1] > 1,
        map(lambda item: (item[0], item[1] * 2), data.items())
    )
)
print(result)  # {'b': 4, 'c': 6, 'd': 8}

# Or use comprehension (more readable)
result = {
    k: v * 2
    for k, v in data.items()
    if v > 1
}
```

## Performance Patterns

```python
import time

# Pattern 1: Batch operations
data = {i: i**2 for i in range(10000)}

# Slow: Individual updates
start = time.time()
for i in range(10000):
    data[i] = data[i] + 1
slow_time = time.time() - start

# Fast: Comprehension
data = {i: i**2 for i in range(10000)}
start = time.time()
data = {k: v + 1 for k, v in data.items()}
fast_time = time.time() - start

print(f"Individual: {slow_time:.6f}s")
print(f"Comprehension: {fast_time:.6f}s")

# Pattern 2: Lookup table
# Slow: Repeated computation
def compute_expensive(x):
    return x ** 2

values = list(range(1000))
start = time.time()
for _ in range(100):
    results = [compute_expensive(x) for x in values]
no_cache_time = time.time() - start

# Fast: Pre-compute with dict
cache = {x: compute_expensive(x) for x in values}
start = time.time()
for _ in range(100):
    results = [cache[x] for x in values]
cache_time = time.time() - start

print(f"No cache: {no_cache_time:.6f}s")
print(f"With cache: {cache_time:.6f}s")
```

## Summary

**Advanced Collections:**

| Type | Use Case | Key Feature |
|------|----------|-------------|
| `OrderedDict` | LRU cache, ordering | `move_to_end()` |
| `ChainMap` | Layered configs | No copying |
| Views | Set operations | Dynamic, efficient |
| Subclass | Custom behavior | Override methods |

**Advanced Patterns:**

| Pattern | Description | Example |
|---------|-------------|---------|
| Unpacking | Merge dicts | `{**d1, **d2}` |
| Filtering | Select items | `{k:v for k,v in d.items() if cond}` |
| Transform | Modify keys/values | `{k.upper(): v*2 for k,v in d.items()}` |
| Inversion | Swap keys/values | `{v: k for k,v in d.items()}` |
| Views | Set operations | `d1.keys() & d2.keys()` |

**Best Practices:**

- ✅ Use `OrderedDict` when need reordering methods
- ✅ Use `ChainMap` for layered lookups without copying
- ✅ Use views for set operations on keys
- ✅ Use comprehensions for filtering/transforming
- ✅ Cache expensive computations in dicts
- ❌ Don't subclass dict unnecessarily
- ❌ Don't forget views are dynamic
- ❌ Don't use OrderedDict just for order (use regular dict in Python 3.7+)

**Remember:** Choose the right tool for the job - Python has many dict variants!

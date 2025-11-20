---
id: "125-dict-copying-merging"
title: "Dictionary Copying and Merging"
chapterId: ch9-dictionaries
order: 7
duration: 25
objectives:
  - Understand shallow vs deep copying
  - Master dictionary merging techniques
  - Learn when to use each method
  - Avoid copying pitfalls
---

# Dictionary Copying and Merging

Understanding how to copy and merge dictionaries is essential for data manipulation.

## Shallow Copy Methods

```python
# Original dictionary
original = {"a": 1, "b": 2, "c": 3}

# Method 1: .copy()
copy1 = original.copy()

# Method 2: dict() constructor
copy2 = dict(original)

# Method 3: Dictionary comprehension
copy3 = {k: v for k, v in original.items()}

# Method 4: Dictionary unpacking (Python 3.5+)
copy4 = {**original}

# All create independent copies
copy1["d"] = 4
print(original)  # {'a': 1, 'b': 2, 'c': 3} - unchanged
print(copy1)     # {'a': 1, 'b': 2, 'c': 3, 'd': 4}

# Verify different objects
print(id(original) != id(copy1))  # True
```

## Shallow Copy Limitation

```python
# Shallow copy with nested structures
original = {
    "a": [1, 2, 3],
    "b": {"nested": "value"},
    "c": 42
}

shallow = original.copy()

# Modify top-level key (safe)
shallow["c"] = 99
print(original["c"])  # 42 - unchanged

# Modify nested list (dangerous!)
shallow["a"].append(4)
print(original["a"])  # [1, 2, 3, 4] - modified!

# Modify nested dict (dangerous!)
shallow["b"]["nested"] = "changed"
print(original["b"])  # {'nested': 'changed'} - modified!

# Why? Nested objects are shared
print(id(original["a"]) == id(shallow["a"]))  # True
print(id(original["b"]) == id(shallow["b"]))  # True

# Diagram of shallow copy:
# original = {"a": [1, 2, 3] ←┐, "b": {...} ←┐}
#                              │              │
# shallow  = {"a": ───────────┘, "b": ───────┘}
# Both dicts point to same nested objects!
```

## Deep Copy

```python
import copy

# Deep copy creates independent nested structures
original = {
    "a": [1, 2, 3],
    "b": {"nested": "value"},
    "c": 42
}

deep = copy.deepcopy(original)

# Modify nested structures (safe)
deep["a"].append(4)
deep["b"]["nested"] = "changed"
deep["c"] = 99

print(original)
# {'a': [1, 2, 3], 'b': {'nested': 'value'}, 'c': 42}

print(deep)
# {'a': [1, 2, 3, 4], 'b': {'nested': 'changed'}, 'c': 99}

# Different objects at all levels
print(id(original) != id(deep))            # True
print(id(original["a"]) != id(deep["a"]))  # True
print(id(original["b"]) != id(deep["b"]))  # True

# Diagram of deep copy:
# original = {"a": [1, 2, 3], "b": {...}}
# deep     = {"a": [1, 2, 3], "b": {...}}  (all new objects)
```

## When to Use Each

```python
# Use shallow copy when:
# 1. Values are immutable
config = {"host": "localhost", "port": 8000, "debug": True}
config_copy = config.copy()  # Shallow is fine

# 2. You want to share nested objects
shared_cache = {"cache": []}
worker1 = {"name": "Worker 1", "cache": shared_cache["cache"]}
worker2 = {"name": "Worker 2", "cache": shared_cache["cache"]}
# Both workers share the same cache list

# Use deep copy when:
# 1. Nested mutable structures
template = {
    "users": [],
    "settings": {"theme": "dark"},
    "data": [[1, 2], [3, 4]]
}
instance = copy.deepcopy(template)
# instance can modify without affecting template

# 2. You need complete independence
original_state = {
    "board": [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    "score": 0,
    "moves": []
}
saved_state = copy.deepcopy(original_state)
# Save game state for undo functionality
```

## Copy Performance Comparison

```python
import copy
import time

# Create test dictionary
data = {
    f"key_{i}": {
        "list": [1, 2, 3],
        "nested": {"value": i}
    }
    for i in range(1000)
}

# Shallow copy
start = time.time()
shallow = data.copy()
shallow_time = time.time() - start

# Deep copy
start = time.time()
deep = copy.deepcopy(data)
deep_time = time.time() - start

print(f"Shallow: {shallow_time:.6f}s")
print(f"Deep:    {deep_time:.6f}s")
print(f"Ratio:   {deep_time / shallow_time:.1f}x slower")
# Deep copy typically 10-100x slower
```

## Dictionary Merging - Python 3.9+

```python
# Merge operator | (creates new dict)
dict1 = {"a": 1, "b": 2}
dict2 = {"c": 3, "d": 4}
merged = dict1 | dict2
print(merged)  # {'a': 1, 'b': 2, 'c': 3, 'd': 4}

# Original dicts unchanged
print(dict1)  # {'a': 1, 'b': 2}
print(dict2)  # {'c': 3, 'd': 4}

# Later values override
dict1 = {"a": 1, "b": 2}
dict2 = {"b": 20, "c": 3}
merged = dict1 | dict2
print(merged)  # {'a': 1, 'b': 20, 'c': 3}

# Right side wins
print({"a": 1} | {"a": 2})  # {'a': 2}

# Chain multiple merges
base = {"a": 1}
updates1 = {"b": 2}
updates2 = {"c": 3}
result = base | updates1 | updates2
print(result)  # {'a': 1, 'b': 2, 'c': 3}

# In-place merge |=
config = {"debug": False, "port": 80}
config |= {"debug": True}
print(config)  # {'debug': True, 'port': 80}
```

## Dictionary Unpacking (Python 3.5+)

```python
# Unpack with ** operator
dict1 = {"a": 1, "b": 2}
dict2 = {"c": 3, "d": 4}
merged = {**dict1, **dict2}
print(merged)  # {'a': 1, 'b': 2, 'c': 3, 'd': 4}

# Later values override
dict1 = {"a": 1, "b": 2}
dict2 = {"b": 20, "c": 3}
merged = {**dict1, **dict2}
print(merged)  # {'a': 1, 'b': 20, 'c': 3}

# Merge with additional keys
merged = {**dict1, **dict2, "e": 5, "f": 6}
print(merged)  # {'a': 1, 'b': 20, 'c': 3, 'e': 5, 'f': 6}

# Merge multiple dicts
dicts = [{"a": 1}, {"b": 2}, {"c": 3}]
merged = {}
for d in dicts:
    merged = {**merged, **d}
print(merged)  # {'a': 1, 'b': 2, 'c': 3}

# Or use reduce
from functools import reduce
merged = reduce(lambda a, b: {**a, **b}, dicts, {})
```

## update() Method

```python
# In-place merge
dict1 = {"a": 1, "b": 2}
dict2 = {"c": 3, "d": 4}
dict1.update(dict2)
print(dict1)  # {'a': 1, 'b': 2, 'c': 3, 'd': 4}

# dict2 unchanged
print(dict2)  # {'c': 3, 'd': 4}

# Update with keyword arguments
config = {"debug": False}
config.update(port=8000, host="localhost")
print(config)  # {'debug': False, 'port': 8000, 'host': 'localhost'}

# Update from list of tuples
config.update([("timeout", 30), ("retry", 3)])
print(config)

# Multiple updates
base = {}
base.update({"a": 1})
base.update({"b": 2})
base.update({"c": 3})
print(base)  # {'a': 1, 'b': 2, 'c': 3}

# update() returns None (can't chain)
result = dict1.update(dict2)
print(result)  # None
```

## ChainMap - Virtual Merge

```python
from collections import ChainMap

# ChainMap doesn't copy - creates view
dict1 = {"a": 1, "b": 2}
dict2 = {"b": 20, "c": 3}
dict3 = {"c": 30, "d": 4}

chain = ChainMap(dict1, dict2, dict3)

# First occurrence wins
print(chain["b"])  # 2 (from dict1)
print(chain["c"])  # 3 (from dict2)
print(chain["d"])  # 4 (from dict3)

# Reflects changes
dict1["a"] = 99
print(chain["a"])  # 99

# Add new key (goes to first dict)
chain["e"] = 5
print(dict1)  # {'a': 99, 'b': 2, 'e': 5}

# Convert to regular dict
merged = dict(chain)
print(merged)  # {'d': 4, 'c': 3, 'b': 2, 'a': 99, 'e': 5}

# Use case: Configuration with defaults
defaults = {"theme": "light", "size": "medium"}
user_prefs = {"theme": "dark"}
config = ChainMap(user_prefs, defaults)
print(config["theme"])  # dark (from user_prefs)
print(config["size"])   # medium (from defaults)
```

## Conditional Merging

```python
# Merge only if key doesn't exist
dict1 = {"a": 1, "b": 2}
dict2 = {"b": 20, "c": 3}

# Keep existing values
merged = dict1.copy()
for key, value in dict2.items():
    if key not in merged:
        merged[key] = value
print(merged)  # {'a': 1, 'b': 2, 'c': 3} - b not overwritten

# Or use setdefault
merged = dict1.copy()
for key, value in dict2.items():
    merged.setdefault(key, value)

# Merge with function
def merge_with(f, d1, d2):
    """Merge dicts, applying f to conflicting values"""
    result = d1.copy()
    for key, value in d2.items():
        if key in result:
            result[key] = f(result[key], value)
        else:
            result[key] = value
    return result

dict1 = {"a": 1, "b": 2}
dict2 = {"b": 20, "c": 3}

# Sum conflicting values
merged = merge_with(lambda x, y: x + y, dict1, dict2)
print(merged)  # {'a': 1, 'b': 22, 'c': 3}

# Take max
merged = merge_with(max, dict1, dict2)
print(merged)  # {'a': 1, 'b': 20, 'c': 3}
```

## Nested Dictionary Merging

```python
# Shallow merge doesn't merge nested dicts
dict1 = {"a": 1, "b": {"x": 10, "y": 20}}
dict2 = {"b": {"y": 99, "z": 30}, "c": 3}

shallow = dict1 | dict2
print(shallow)
# {'a': 1, 'b': {'y': 99, 'z': 30}, 'c': 3}
# dict2's 'b' completely replaces dict1's 'b'

# Deep merge function
def deep_merge(dict1, dict2):
    """Recursively merge dict2 into dict1"""
    result = dict1.copy()
    for key, value in dict2.items():
        if key in result and isinstance(result[key], dict) and isinstance(value, dict):
            result[key] = deep_merge(result[key], value)
        else:
            result[key] = value
    return result

dict1 = {"a": 1, "b": {"x": 10, "y": 20}}
dict2 = {"b": {"y": 99, "z": 30}, "c": 3}

deep = deep_merge(dict1, dict2)
print(deep)
# {'a': 1, 'b': {'x': 10, 'y': 99, 'z': 30}, 'c': 3}
# Nested dicts are merged, not replaced
```

## Merging Lists of Dictionaries

```python
# Merge all dicts in list
dicts = [
    {"a": 1, "b": 2},
    {"c": 3, "d": 4},
    {"e": 5, "f": 6}
]

# Method 1: Loop with update
merged = {}
for d in dicts:
    merged.update(d)
print(merged)  # {'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6}

# Method 2: Reduce
from functools import reduce
merged = reduce(lambda a, b: {**a, **b}, dicts, {})

# Method 3: Chain unpacking
merged = dict(ChainMap(*reversed(dicts)))

# Method 4: Python 3.9+ (multiple | operators)
merged = {}
for d in dicts:
    merged = merged | d

# With conflicts - last dict wins
dicts = [
    {"a": 1, "b": 2},
    {"b": 20, "c": 3},
    {"c": 30, "d": 4}
]
merged = reduce(lambda a, b: a | b, dicts, {})
print(merged)  # {'a': 1, 'b': 20, 'c': 30, 'd': 4}
```

## Common Patterns

```python
# Pattern 1: Configuration hierarchy
defaults = {"timeout": 30, "retries": 3, "debug": False}
user_config = {"timeout": 60, "debug": True}
config = defaults | user_config
print(config)  # {'timeout': 60, 'retries': 3, 'debug': True}

# Pattern 2: Add default values
data = {"name": "Alice", "age": 30}
complete = {"email": "unknown", "city": "unknown"} | data
print(complete)
# {'email': 'unknown', 'city': 'unknown', 'name': 'Alice', 'age': 30}

# Pattern 3: Override specific keys
base = {"a": 1, "b": 2, "c": 3}
overrides = {"b": 99}
result = base | overrides
print(result)  # {'a': 1, 'b': 99, 'c': 3}

# Pattern 4: Combine data from multiple sources
db_data = {"id": 1, "name": "Alice"}
api_data = {"email": "alice@example.com", "age": 30}
cache_data = {"last_login": "2024-01-01"}
user = db_data | api_data | cache_data

# Pattern 5: Immutable update
def update_immutable(d, **updates):
    """Return new dict with updates"""
    return d | updates

config = {"debug": False, "port": 80}
new_config = update_immutable(config, debug=True)
print(config)      # {'debug': False, 'port': 80} - unchanged
print(new_config)  # {'debug': True, 'port': 80}
```

## Copy with Modifications

```python
# Copy and modify in one step
original = {"a": 1, "b": 2, "c": 3}

# Add keys while copying
copy = {**original, "d": 4, "e": 5}
print(copy)  # {'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5}

# Override keys while copying
copy = {**original, "b": 99}
print(copy)  # {'a': 1, 'b': 99, 'c': 3}

# Remove keys while copying
copy = {k: v for k, v in original.items() if k != "b"}
print(copy)  # {'a': 1, 'c': 3}

# Transform while copying
copy = {k: v * 10 for k, v in original.items()}
print(copy)  # {'a': 10, 'b': 20, 'c': 30}

# Filter and modify
copy = {k: v * 10 for k, v in original.items() if v > 1}
print(copy)  # {'b': 20, 'c': 30}
```

## Summary

**Copying Methods:**

| Method | Type | Speed | Nested Safety |
|--------|------|-------|---------------|
| `.copy()` | Shallow | Fast | No |
| `dict(d)` | Shallow | Fast | No |
| `{**d}` | Shallow | Fast | No |
| `{k:v for...}` | Shallow | Slower | No |
| `deepcopy()` | Deep | Slow | Yes |

**Merging Methods:**

| Method | Python | Modifies | Creates New |
|--------|--------|----------|-------------|
| `d1 \| d2` | 3.9+ | No | Yes |
| `d1 \|= d2` | 3.9+ | Yes (d1) | No |
| `{**d1, **d2}` | 3.5+ | No | Yes |
| `d1.update(d2)` | All | Yes (d1) | No |
| `ChainMap(d1, d2)` | All | No | View |

**Best Practices:**

- ✅ Use shallow copy for simple immutable values
- ✅ Use deep copy for nested mutable structures
- ✅ Use `|` operator for readable merges (Python 3.9+)
- ✅ Use `{**d1, **d2}` for older Python versions
- ✅ Use `update()` for in-place merges
- ✅ Use ChainMap for layered configs without copying
- ❌ Don't use shallow copy with nested mutables
- ❌ Don't forget deep copy is expensive
- ❌ Don't chain `update()` (returns None)

**Remember:** Shallow copy is fast but shares nested objects!

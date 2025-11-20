---
id: "130-dict-best-practices"
title: "Dictionary Best Practices and Patterns"
chapterId: ch9-dictionaries
order: 11
duration: 30
objectives:
  - Master dictionary best practices
  - Learn common anti-patterns to avoid
  - Understand idiomatic Python patterns
  - Apply professional coding standards
---

# Dictionary Best Practices and Patterns

Professional patterns and practices for writing clean, efficient dictionary code.

## Choosing the Right Dictionary Type

```python
from collections import defaultdict, Counter, OrderedDict, ChainMap

# Use regular dict when:
# - Simple key-value storage
# - Keys are known and fixed
data = {"name": "Alice", "age": 30}

# Use defaultdict when:
# - Auto-initialize missing keys
# - Grouping or accumulating
counts = defaultdict(int)
for item in ["a", "b", "a"]:
    counts[item] += 1

# Use Counter when:
# - Counting occurrences
# - Need most_common()
freq = Counter(["a", "b", "a", "c", "b", "a"])
print(freq.most_common(2))  # [('a', 3), ('b', 2)]

# Use OrderedDict when:
# - Need move_to_end() or popitem(last=False)
# - Building LRU cache
cache = OrderedDict()

# Use ChainMap when:
# - Layered configuration
# - Need to avoid copying
config = ChainMap(user_config, app_config, defaults)

# Example decision tree
def choose_dict_type(requirements):
    if "counting" in requirements:
        return Counter
    elif "auto_init" in requirements:
        return lambda: defaultdict(int)  # or list, set, etc.
    elif "ordering_methods" in requirements:
        return OrderedDict
    elif "layered_lookup" in requirements:
        return ChainMap
    else:
        return dict
```

## Safe Access Patterns

```python
# ❌ BAD: Check and access (two lookups)
if "key" in d:
    value = d["key"]  # Second lookup!
    process(value)

# ✅ GOOD: Use get() with default
value = d.get("key")
if value is not None:
    process(value)

# ✅ GOOD: Use try-except for rare misses
try:
    value = d["key"]
    process(value)
except KeyError:
    handle_missing()

# ❌ BAD: Repeated try-except
for key in keys:
    try:
        value = d[key]
    except KeyError:
        value = default
    process(value)

# ✅ GOOD: Use get() in loop
for key in keys:
    value = d.get(key, default)
    process(value)

# ✅ GOOD: Use setdefault() for initialize-and-use
d.setdefault("key", []).append(value)

# ❌ BAD: Check, initialize, then use
if "key" not in d:
    d["key"] = []
d["key"].append(value)
```

## Naming Conventions

```python
# ✅ GOOD: Descriptive names
user_by_id = {1: "Alice", 2: "Bob"}
grade_by_student = {"Alice": "A", "Bob": "B"}
count_by_word = {"hello": 2, "world": 1}

# ✅ GOOD: Plural for collections of key-value pairs
users = {"alice": {...}, "bob": {...}}
configs = {"dev": {...}, "prod": {...}}
scores = {"alice": 100, "bob": 85}

# ❌ BAD: Vague names
d = {}  # What does d contain?
data = {}  # Too generic
temp = {}  # Unclear purpose

# ✅ GOOD: Type hints
from typing import Dict

def process_users(users: Dict[str, dict]) -> None:
    """Process user data."""
    for name, info in users.items():
        print(f"{name}: {info}")

# ✅ GOOD: Specific types
from typing import Dict, List

scores: Dict[str, int] = {"alice": 100, "bob": 85}
groups: Dict[str, List[str]] = {"A": ["alice"], "B": ["bob"]}

# ✅ GOOD: Document dict structure
def load_config() -> dict:
    """
    Load application configuration.
    
    Returns:
        Dictionary with structure:
        {
            "database": {"host": str, "port": int},
            "cache": {"enabled": bool, "ttl": int}
        }
    """
    return {...}
```

## Initialization Patterns

```python
# ✅ GOOD: Empty dict
d = {}  # Clear and fast

# ❌ BAD: Unnecessary dict()
d = dict()  # Slower, less clear

# ✅ GOOD: Dict from pairs
d = {"a": 1, "b": 2, "c": 3}

# ✅ GOOD: Dict from sequence
keys = ["a", "b", "c"]
values = [1, 2, 3]
d = dict(zip(keys, values))

# ✅ GOOD: Initialize with defaults
keys = ["a", "b", "c"]
d = {k: 0 for k in keys}

# ❌ BAD: fromkeys() with mutable default
d = dict.fromkeys(keys, [])  # All share same list!

# ✅ GOOD: Comprehension for mutable defaults
d = {k: [] for k in keys}  # Each gets new list

# ✅ GOOD: Conditional initialization
include_optional = True
d = {
    "required": value,
    **{"optional": value2} if include_optional else {}
}

# ✅ GOOD: Build incrementally with clear intent
config = {}
config.update(load_defaults())
config.update(load_user_prefs())
config.update(load_runtime_overrides())
```

## Iteration Best Practices

```python
# ✅ GOOD: Iterate with items() when need both
for key, value in d.items():
    print(f"{key}: {value}")

# ❌ BAD: Lookup in loop
for key in d:
    value = d[key]  # Unnecessary lookup
    print(f"{key}: {value}")

# ✅ GOOD: Iterate keys only when appropriate
for key in d:
    if key.startswith("prefix_"):
        process(key)

# ✅ GOOD: Iterate values only
total = sum(d.values())

# ❌ BAD: Modify while iterating
for key in d:
    if d[key] < 0:
        del d[key]  # RuntimeError!

# ✅ GOOD: Iterate over copy
for key in list(d.keys()):
    if d[key] < 0:
        del d[key]

# ✅ BETTER: Build new dict
d = {k: v for k, v in d.items() if v >= 0}

# ✅ GOOD: Enumerate when need index
for i, (key, value) in enumerate(d.items()):
    print(f"{i}: {key} = {value}")
```

## Comprehension Best Practices

```python
# ✅ GOOD: Simple, readable comprehension
doubled = {k: v * 2 for k, v in d.items()}

# ✅ GOOD: Single condition
filtered = {k: v for k, v in d.items() if v > 0}

# ❌ BAD: Too complex, hard to read
result = {
    k: v * 2 if v > 5 else v / 2 if v > 2 else v
    for k, v in d.items()
    if k.startswith('a') and len(k) > 2 and v % 2 == 0
}

# ✅ GOOD: Break into steps
# Step 1: Filter
filtered = {
    k: v for k, v in d.items()
    if k.startswith('a') and len(k) > 2 and v % 2 == 0
}
# Step 2: Transform
result = {k: transform(v) for k, v in filtered.items()}

# ✅ GOOD: Use helper function
def transform_value(v):
    if v > 5:
        return v * 2
    elif v > 2:
        return v / 2
    return v

result = {k: transform_value(v) for k, v in d.items()}

# ✅ GOOD: Multi-line for readability
result = {
    k: v * 2
    for k, v in large_dict.items()
    if is_valid(k)
    if should_include(v)
}

# ❌ BAD: Nested comprehension (hard to read)
nested = {k: {k2: v2 for k2, v2 in v.items() if v2 > 0} for k, v in d.items() if v}

# ✅ GOOD: Break into steps
result = {}
for k, v in d.items():
    if v:
        result[k] = {k2: v2 for k2, v2 in v.items() if v2 > 0}
```

## Error Handling

```python
# ✅ GOOD: Use get() for optional keys
value = config.get("optional_key", default_value)

# ✅ GOOD: try-except for required keys
try:
    api_key = config["api_key"]
except KeyError:
    raise ConfigError("Missing required api_key")

# ✅ GOOD: Provide helpful error messages
def get_user(user_id):
    try:
        return users[user_id]
    except KeyError:
        raise ValueError(f"User {user_id} not found. Available: {list(users.keys())}")

# ❌ BAD: Catch and ignore
try:
    value = d["key"]
except KeyError:
    pass  # Silent failure - hard to debug

# ✅ GOOD: Explicit default handling
value = d.get("key")
if value is None:
    logger.warning("Key not found, using default")
    value = default

# ✅ GOOD: Validate after access
value = d.get("age")
if value is not None and not isinstance(value, int):
    raise TypeError(f"Expected int for age, got {type(value)}")
```

## Copying Best Practices

```python
# ✅ GOOD: Shallow copy for simple dicts
copy = original.copy()

# ✅ GOOD: Deep copy for nested structures
import copy
deep = copy.deepcopy(original)

# ✅ GOOD: Document copy behavior
def process_config(config: dict) -> dict:
    """
    Process configuration.
    
    Args:
        config: Configuration dict (not modified)
    
    Returns:
        New dict with processed values
    """
    return {k: process_value(v) for k, v in config.items()}

# ❌ BAD: Unexpected modification
def add_default(config):
    config["debug"] = False  # Modifies input!
    return config

# ✅ GOOD: Explicit copy
def add_default(config):
    result = config.copy()
    result.setdefault("debug", False)
    return result

# ✅ GOOD: Make intention clear
def merge_configs(base, override):
    """
    Merge configs. Does not modify inputs.
    
    Returns new dict with override taking precedence.
    """
    return base | override  # Creates new dict
```

## Common Anti-Patterns

```python
# ❌ ANTI-PATTERN 1: Using dict for switch/case
def handle_action(action, data):
    if action == "create":
        return create(data)
    elif action == "update":
        return update(data)
    elif action == "delete":
        return delete(data)
    # ... many more

# ✅ BETTER: Dict of functions
HANDLERS = {
    "create": create,
    "update": update,
    "delete": delete
}

def handle_action(action, data):
    handler = HANDLERS.get(action)
    if handler:
        return handler(data)
    raise ValueError(f"Unknown action: {action}")

# ❌ ANTI-PATTERN 2: Overusing dict for structured data
user = {
    "name": "Alice",
    "age": 30,
    "email": "alice@example.com"
}
# No type checking, typos cause bugs

# ✅ BETTER: Use dataclass
from dataclasses import dataclass

@dataclass
class User:
    name: str
    age: int
    email: str

user = User("Alice", 30, "alice@example.com")

# ❌ ANTI-PATTERN 3: Deeply nested dicts
config = {
    "app": {
        "database": {
            "primary": {
                "host": "localhost",
                "port": 5432
            }
        }
    }
}
host = config["app"]["database"]["primary"]["host"]  # Fragile!

# ✅ BETTER: Flat structure with composite keys
config = {
    "db_primary_host": "localhost",
    "db_primary_port": 5432
}

# Or use helper function
def get_nested(d, *keys, default=None):
    for key in keys:
        if isinstance(d, dict):
            d = d.get(key, default)
        else:
            return default
    return d

host = get_nested(config, "app", "database", "primary", "host")

# ❌ ANTI-PATTERN 4: Mutable default argument
def process_items(items, cache={}):  # DANGEROUS!
    # cache is shared across all calls!
    pass

# ✅ CORRECT: Use None as default
def process_items(items, cache=None):
    if cache is None:
        cache = {}
    # Now each call gets new cache

# ❌ ANTI-PATTERN 5: String keys for everything
data = {"user_1_name": "Alice", "user_1_age": 30}

# ✅ BETTER: Nested structure
data = {
    "users": {
        1: {"name": "Alice", "age": 30}
    }
}
```

## Performance Best Practices

```python
# ✅ GOOD: Pre-compute lookups
# Slow: List membership O(n)
valid_ids = [1, 2, 3, 4, 5]
if user_id in valid_ids:  # O(n)
    process(user_id)

# Fast: Dict/set membership O(1)
valid_ids = {1, 2, 3, 4, 5}  # Or dict
if user_id in valid_ids:  # O(1)
    process(user_id)

# ✅ GOOD: Batch operations
# Slow: Individual updates
for key, value in updates:
    d[key] = value

# Fast: Bulk update
d.update(updates)

# ✅ GOOD: Cache expensive computations
cache = {}
def expensive_func(x):
    if x not in cache:
        cache[x] = compute(x)  # Only once
    return cache[x]

# Or use lru_cache
from functools import lru_cache

@lru_cache(maxsize=128)
def expensive_func(x):
    return compute(x)

# ✅ GOOD: Use comprehension over loop
# Slower
result = {}
for k, v in data.items():
    result[k] = v * 2

# Faster
result = {k: v * 2 for k, v in data.items()}
```

## Documentation Best Practices

```python
# ✅ GOOD: Document dict structure
def load_user_data() -> dict:
    """
    Load user data from database.
    
    Returns:
        Dictionary with structure:
        {
            "id": int,
            "name": str,
            "email": str,
            "preferences": {
                "theme": str,
                "notifications": bool
            },
            "created_at": datetime
        }
    """
    pass

# ✅ GOOD: Type hints for complex dicts
from typing import Dict, List, Optional, TypedDict

class UserDict(TypedDict):
    id: int
    name: str
    email: str
    age: Optional[int]

def get_users() -> List[UserDict]:
    pass

# ✅ GOOD: Comment non-obvious dict usage
# Map from user_id to list of order_ids for fast lookup
user_orders: Dict[int, List[int]] = defaultdict(list)

# ✅ GOOD: Explain key choices
# Use tuples for composite keys to ensure immutability
coordinates: Dict[tuple[int, int], str] = {}
```

## Testing Dict Code

```python
import unittest

class TestDictOperations(unittest.TestCase):
    
    def test_safe_access(self):
        """Test safe dictionary access"""
        d = {"a": 1, "b": 2}
        self.assertEqual(d.get("a"), 1)
        self.assertIsNone(d.get("missing"))
        self.assertEqual(d.get("missing", 0), 0)
    
    def test_dict_merge(self):
        """Test dictionary merging preserves values"""
        d1 = {"a": 1, "b": 2}
        d2 = {"b": 20, "c": 3}
        merged = d1 | d2
        self.assertEqual(merged["a"], 1)
        self.assertEqual(merged["b"], 20)  # d2 wins
        self.assertEqual(merged["c"], 3)
        self.assertEqual(d1["b"], 2)  # Original unchanged
    
    def test_shallow_copy(self):
        """Test shallow copy creates independent dict"""
        original = {"a": 1, "b": 2}
        copy = original.copy()
        copy["c"] = 3
        self.assertNotIn("c", original)
    
    def test_defaultdict_behavior(self):
        """Test defaultdict auto-initialization"""
        from collections import defaultdict
        d = defaultdict(int)
        d["a"] += 1
        self.assertEqual(d["a"], 1)
        self.assertEqual(d["missing"], 0)  # Auto-created
```

## Summary

**Best Practices Checklist:**

**Choosing Types:**
- ✅ Use `dict` for simple key-value storage
- ✅ Use `defaultdict` for auto-initialization
- ✅ Use `Counter` for counting
- ✅ Use `OrderedDict` for ordering operations
- ✅ Use dataclasses for structured data

**Access:**
- ✅ Use `get()` for optional keys
- ✅ Use try-except for required keys
- ✅ Use `setdefault()` for initialize-and-use
- ❌ Don't check membership then access

**Iteration:**
- ✅ Use `items()` when need key and value
- ✅ Use comprehensions for transformations
- ✅ Copy keys before modifying during iteration
- ❌ Don't lookup in iteration loop

**Copying:**
- ✅ Use shallow copy for simple dicts
- ✅ Use deep copy for nested structures
- ✅ Document copy behavior
- ❌ Don't modify inputs unexpectedly

**Anti-Patterns to Avoid:**
- ❌ Mutable default arguments
- ❌ Deeply nested dicts
- ❌ Modifying while iterating
- ❌ Checking then accessing
- ❌ Using dicts for structured data

**Remember:** Write clear, idiomatic code - readability matters!

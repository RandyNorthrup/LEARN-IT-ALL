---
id: lesson-120-dict-best-practices
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
user_config = {"theme": "dark"}
app_config = {"theme": "light", "debug": True}
defaults = {"theme": "default", "debug": False, "verbose": False}
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
# Setup for examples below
d = {"key": "hello", "name": "Alice", "age": 30}
def process(value): print(f"Processing: {value}")
def handle_missing(): print("Key not found, handling gracefully")
keys = ["key", "name", "missing"]
default = "N/A"
value = "new_item"

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

# ✅ GOOD: Type hints (Python 3.9+ built-in syntax)
def process_users(users: dict[str, dict]) -> None:
    """Process user data."""
    for name, info in users.items():
        print(f"{name}: {info}")

# ✅ GOOD: Specific types (Python 3.9+ built-in syntax)
scores: dict[str, int] = {"alice": 100, "bob": 85}
groups: dict[str, list[str]] = {"A": ["alice"], "B": ["bob"]}

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
value = "main_data"
value2 = "extra_data"
d = {
    "required": value,
    **{"optional": value2} if include_optional else {}
}

# ✅ GOOD: Build incrementally with clear intent
def load_defaults(): return {"debug": False, "verbose": False}
def load_user_prefs(): return {"theme": "dark"}
def load_runtime_overrides(): return {"debug": True}

config = {}
config.update(load_defaults())
config.update(load_user_prefs())
config.update(load_runtime_overrides())
```

## Iteration Best Practices

```python
# Setup for iteration examples
d = {"prefix_name": "Alice", "prefix_age": "30", "status": "active"}
def process(item): print(f"Processing: {item}")

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
# Setup
d = {"abc": 6, "abd": 4, "xyz": -1, "ab": 8, "abcd": 2}

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
# Step 2: Transform (using transform_value defined below)
result = {k: transform_value(v) for k, v in filtered.items()}

# ✅ GOOD: Use helper function
def transform_value(v):
    if v > 5:
        return v * 2
    elif v > 2:
        return v / 2
    return v

result = {k: transform_value(v) for k, v in d.items()}

# ✅ GOOD: Multi-line for readability
large_dict = {"item1": 10, "item2": -5, "item3": 20}
def is_valid(k): return k.startswith("item")
def should_include(v): return v > 0

result = {
    k: v * 2
    for k, v in large_dict.items()
    if is_valid(k)
    if should_include(v)
}

# ❌ BAD: Nested comprehension (hard to read)
d = {"group1": {"a": 1, "b": -2}, "group2": {"c": 3}, "group3": {}}
nested = {k: {k2: v2 for k2, v2 in v.items() if v2 > 0} for k, v in d.items() if v}

# ✅ GOOD: Break into steps
result = {}
for k, v in d.items():
    if v:
        result[k] = {k2: v2 for k2, v2 in v.items() if v2 > 0}
```

## Error Handling

```python
# Setup for error handling examples
import logging
logger = logging.getLogger(__name__)
config = {"api_key": "abc123", "debug": True}
users = {1: "Alice", 2: "Bob"}
d = {"key": "value", "age": 25}
default_value = "fallback"
default = "N/A"

# ✅ GOOD: Use get() for optional keys
value = config.get("optional_key", default_value)

# ✅ GOOD: try-except for required keys
try:
    api_key = config["api_key"]
except KeyError:
    raise ValueError("Missing required api_key")  # or define a custom ConfigError

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
def process_value(v):
    """Example transformation."""
    return str(v).upper()

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
# Example action handler functions
def create(data): return f"Created: {data}"
def update(data): return f"Updated: {data}"
def delete(data): return f"Deleted: {data}"

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

# ✅ BETTER: Use namedtuple for structured data
from collections import namedtuple

User = namedtuple('User', ['name', 'age', 'email'])
user = User("Alice", 30, "alice@example.com")

# Provides named access, immutability, and clear structure
print(user.name)   # Alice
print(user.age)    # 30
print(user.email)  # alice@example.com

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
# Setup for performance examples
user_id = 3
def process(item): print(f"Processing: {item}")
def compute(x): return x ** 2 + x  # Simulating expensive computation

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

# ✅ GOOD: Document expected dict structure with comments
# User dict structure:
#   id: int
#   name: str
#   email: str
#   age: int or None (optional)
#
# Example:
user_record = {"id": 1, "name": "Alice", "email": "alice@example.com", "age": 30}

from collections import defaultdict

def get_users() -> list[dict]:
    """Return a list of user dicts matching the structure above."""
    pass

# ✅ GOOD: Comment non-obvious dict usage
# Map from user_id to list of order_ids for fast lookup
user_orders: dict[int, list[int]] = defaultdict(list)

# ✅ GOOD: Explain key choices
# Use tuples for composite keys to ensure immutability
coordinates: dict[tuple, str] = {}
```

## Testing Dict Code

```python
# Test dict operations using standalone functions
def test_safe_access():
    """Test safe dictionary access"""
    d = {"a": 1, "b": 2}
    assert d.get("a") == 1
    assert d.get("missing") is None
    assert d.get("missing", 0) == 0

def test_dict_merge():
    """Test dictionary merging preserves values"""
    d1 = {"a": 1, "b": 2}
    d2 = {"b": 20, "c": 3}
    merged = d1 | d2
    assert merged["a"] == 1
    assert merged["b"] == 20  # d2 wins
    assert merged["c"] == 3
    assert d1["b"] == 2  # Original unchanged

def test_shallow_copy():
    """Test shallow copy creates independent dict"""
    original = {"a": 1, "b": 2}
    copy = original.copy()
    copy["c"] = 3
    assert "c" not in original

def test_defaultdict_behavior():
    """Test defaultdict auto-initialization"""
    from collections import defaultdict
    d = defaultdict(int)
    d["a"] += 1
    assert d["a"] == 1
    assert d["missing"] == 0  # Auto-created

# Run tests
test_safe_access()
test_dict_merge()
test_shallow_copy()
test_defaultdict_behavior()
print("All tests passed!")
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

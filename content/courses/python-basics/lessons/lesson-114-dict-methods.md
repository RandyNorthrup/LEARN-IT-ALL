---
id: "123-dict-methods"
title: "Dictionary Methods Deep Dive"
chapterId: ch9-dictionaries
order: 5
duration: 30
objectives:
  - Master all dictionary methods
  - Understand when to use each method
  - Learn method combinations
  - Avoid common pitfalls
---

# Dictionary Methods Deep Dive

Python dictionaries have powerful built-in methods for manipulation and querying.

## get() - Safe Access

```python
# Basic get
person = {"name": "Alice", "age": 30}
name = person.get("name")
print(name)  # Alice

# Missing key returns None
email = person.get("email")
print(email)  # None

# Custom default value
email = person.get("email", "no-email@example.com")
print(email)  # no-email@example.com

# Doesn't modify dictionary
print(person)  # {'name': 'Alice', 'age': 30}

# Use in conditional
if person.get("is_admin"):
    print("Admin access")
else:
    print("Regular access")  # This runs

# Chain with operations
age = person.get("age", 0) + 1
print(age)  # 31

# Complex default
config = {}
timeout = config.get("timeout", 30 if config.get("debug") else 60)
print(timeout)  # 60
```

## setdefault() - Get and Set

```python
# Get existing key
person = {"name": "Alice"}
name = person.setdefault("name", "Unknown")
print(name)    # Alice
print(person)  # {'name': 'Alice'}

# Get and set missing key
age = person.setdefault("age", 0)
print(age)     # 0
print(person)  # {'name': 'Alice', 'age': 0}

# Build nested structures
data = {}
data.setdefault("users", []).append("alice")
data.setdefault("users", []).append("bob")
print(data)  # {'users': ['alice', 'bob']}

# Count occurrences
words = ["apple", "banana", "apple", "cherry"]
counts = {}
for word in words:
    counts[word] = counts.setdefault(word, 0) + 1
print(counts)  # {'apple': 2, 'banana': 1, 'cherry': 1}

# Initialize nested dict
config = {}
config.setdefault("database", {})["host"] = "localhost"
config.setdefault("database", {})["port"] = 5432
print(config)  # {'database': {'host': 'localhost', 'port': 5432}}

# ⚠️ Warning: Default is evaluated once
import datetime
cache = {}
# DON'T do this:
# cache.setdefault("timestamp", datetime.datetime.now())
# The timestamp is evaluated only once!
```

## update() - Merge Dictionaries

```python
# Update from dict
person = {"name": "Alice", "age": 30}
updates = {"age": 31, "city": "NYC"}
person.update(updates)
print(person)  # {'name': 'Alice', 'age': 31, 'city': 'NYC'}

# Update from keyword arguments
person.update(country="USA", job="Engineer")
print(person)

# Update from iterable of pairs
person.update([("email", "alice@example.com"), ("phone", "123-456")])
print(person)

# Multiple updates in chain
config = {}
config.update({"debug": True})
config.update({"port": 8000})
config.update({"host": "localhost"})

# Override behavior
settings = {"theme": "dark", "font": "mono"}
settings.update({"theme": "light"})  # Replaces existing
print(settings)  # {'theme': 'light', 'font': 'mono'}

# Conditional update
def safe_update(d, key, value):
    if key not in d:
        d.update({key: value})

data = {"a": 1}
safe_update(data, "a", 99)  # Won't update
safe_update(data, "b", 2)   # Will update
print(data)  # {'a': 1, 'b': 2}

# Merge multiple dicts
dicts = [{"a": 1}, {"b": 2}, {"c": 3}]
merged = {}
for d in dicts:
    merged.update(d)
print(merged)  # {'a': 1, 'b': 2, 'c': 3}
```

## pop() - Remove and Return

```python
# Basic pop
person = {"name": "Alice", "age": 30, "city": "NYC"}
age = person.pop("age")
print(age)     # 30
print(person)  # {'name': 'Alice', 'city': 'NYC'}

# Pop with default (no error if missing)
email = person.pop("email", "no-email")
print(email)  # no-email

# Pop without default raises KeyError
try:
    person.pop("salary")
except KeyError as e:
    print(f"Key not found: {e}")

# Use popped value
data = {"status": "pending", "value": 100}
if data.pop("status", None) == "pending":
    print(f"Processing value: {data['value']}")
# Processing value: 100

# Remove and process
tasks = {
    "task1": {"priority": "high", "done": False},
    "task2": {"priority": "low", "done": True},
    "task3": {"priority": "high", "done": True}
}

# Remove and return completed tasks
completed = {}
for task_id in list(tasks.keys()):
    if tasks[task_id]["done"]:
        completed[task_id] = tasks.pop(task_id)
print(f"Completed: {len(completed)}")  # 2
print(f"Remaining: {len(tasks)}")      # 1
```

## popitem() - Remove Last Item

```python
# Python 3.7+: LIFO order (stack behavior)
person = {"name": "Alice", "age": 30, "city": "NYC"}
item = person.popitem()
print(item)    # ('city', 'NYC')
print(person)  # {'name': 'Alice', 'age': 30}

# Pop until empty
while person:
    key, value = person.popitem()
    print(f"Removed: {key} = {value}")

# Empty dict raises KeyError
try:
    person.popitem()
except KeyError:
    print("Dictionary is empty")

# Use as stack
stack = {}
stack["first"] = 1
stack["second"] = 2
stack["third"] = 3

# Pop in LIFO order
print(stack.popitem())  # ('third', 3)
print(stack.popitem())  # ('second', 2)
print(stack.popitem())  # ('first', 1)

# Process in batches
data = {i: i**2 for i in range(100)}
batch_size = 10

while data:
    batch = {}
    for _ in range(min(batch_size, len(data))):
        if data:  # Check not empty
            key, value = data.popitem()
            batch[key] = value
    print(f"Processing batch of {len(batch)} items")
```

## clear() - Remove All Items

```python
# Remove all items
person = {"name": "Alice", "age": 30, "city": "NYC"}
person.clear()
print(person)  # {}

# After clear, dict still exists
person["name"] = "Bob"
print(person)  # {'name': 'Bob'}

# Clear vs reassignment
data1 = {"a": 1, "b": 2}
data2 = data1  # alias

data1.clear()  # Modifies original
print(data2)   # {} - also cleared

data1 = {"a": 1, "b": 2}
data2 = data1

data1 = {}     # Reassignment - creates new dict
print(data2)   # {'a': 1, 'b': 2} - not affected

# Reset to defaults
config = {"debug": True, "port": 8000}
config.clear()
config.update({"debug": False, "port": 80})
print(config)  # {'debug': False, 'port': 80}
```

## keys(), values(), items() - Views

```python
person = {"name": "Alice", "age": 30, "city": "NYC"}

# keys() - view of keys
keys = person.keys()
print(keys)        # dict_keys(['name', 'age', 'city'])
print(type(keys))  # <class 'dict_keys'>

# values() - view of values
values = person.values()
print(values)  # dict_values(['Alice', 30, 'NYC'])

# items() - view of (key, value) pairs
items = person.items()
print(items)
# dict_items([('name', 'Alice'), ('age', 30), ('city', 'NYC')])

# Views are dynamic - reflect changes
person["country"] = "USA"
print(keys)  # dict_keys(['name', 'age', 'city', 'country'])

# Convert to list
keys_list = list(person.keys())
values_list = list(person.values())
items_list = list(person.items())

# Membership testing
print("name" in person.keys())  # True - O(1)
print("Alice" in person.values())  # True - O(n)
print(("age", 30) in person.items())  # True - O(1)

# Iterate views
for key in person.keys():
    print(key)

for value in person.values():
    print(value)

for key, value in person.items():
    print(f"{key}: {value}")

# Set operations on keys views
dict1 = {"a": 1, "b": 2, "c": 3}
dict2 = {"b": 20, "c": 30, "d": 4}

# Keys in both
common = dict1.keys() & dict2.keys()
print(common)  # {'b', 'c'}

# Keys in either
all_keys = dict1.keys() | dict2.keys()
print(all_keys)  # {'a', 'b', 'c', 'd'}

# Keys in dict1 but not dict2
unique = dict1.keys() - dict2.keys()
print(unique)  # {'a'}

# Keys in either but not both
symmetric = dict1.keys() ^ dict2.keys()
print(symmetric)  # {'a', 'd'}
```

## copy() - Shallow Copy

```python
# Shallow copy
original = {"a": 1, "b": 2, "c": 3}
copy = original.copy()

# Modify copy
copy["d"] = 4
print(original)  # {'a': 1, 'b': 2, 'c': 3} - unchanged
print(copy)      # {'a': 1, 'b': 2, 'c': 3, 'd': 4}

# Shallow copy with nested dicts
original = {"a": {"nested": 1}, "b": 2}
shallow = original.copy()

# Modify nested dict
shallow["a"]["nested"] = 99
print(original)  # {'a': {'nested': 99}, 'b': 2} - affected!

# Both share the same nested dict
print(id(original["a"]) == id(shallow["a"]))  # True

# Deep copy for nested structures
import copy as copy_module
original = {"a": {"nested": 1}, "b": 2}
deep = copy_module.deepcopy(original)

deep["a"]["nested"] = 99
print(original)  # {'a': {'nested': 1}, 'b': 2} - unchanged

# Different objects
print(id(original["a"]) == id(deep["a"]))  # False

# Copy methods comparison
import copy as copy_module

original = {"a": [1, 2, 3], "b": {"nested": 4}}

# Method 1: .copy()
c1 = original.copy()

# Method 2: dict()
c2 = dict(original)

# Method 3: comprehension
c3 = {k: v for k, v in original.items()}

# Method 4: deep copy
c4 = copy_module.deepcopy(original)

# All shallow except c4
c1["a"].append(4)
print(original["a"])  # [1, 2, 3, 4] - modified
c4["a"].append(5)
print(original["a"])  # [1, 2, 3, 4] - not modified
```

## fromkeys() - Create from Keys

```python
# Create dict with None values
keys = ["a", "b", "c"]
d = dict.fromkeys(keys)
print(d)  # {'a': None, 'b': None, 'c': None}

# Create with default value
d = dict.fromkeys(keys, 0)
print(d)  # {'a': 0, 'b': 0, 'c': 0}

# From range
d = dict.fromkeys(range(5), "value")
print(d)  # {0: 'value', 1: 'value', ..., 4: 'value'}

# ⚠️ WARNING: Mutable default is shared!
keys = ["a", "b", "c"]
d = dict.fromkeys(keys, [])  # All keys share same list!
d["a"].append(1)
print(d)  # {'a': [1], 'b': [1], 'c': [1]}

# All values are the same object
print(id(d["a"]) == id(d["b"]) == id(d["c"]))  # True

# ✅ CORRECT: Use comprehension for mutable defaults
d = {key: [] for key in keys}
d["a"].append(1)
print(d)  # {'a': [1], 'b': [], 'c': []}

# Initialize with function calls
def default_user():
    return {"name": "", "age": 0}

# WRONG - function called once!
users = dict.fromkeys(["alice", "bob"], default_user())

# CORRECT - comprehension calls function each time
users = {name: default_user() for name in ["alice", "bob"]}
```

## Method Chaining Patterns

```python
# Chaining is limited (most methods return None)
data = {"a": 1, "b": 2}

# This doesn't work (update returns None)
# result = data.update({"c": 3}).update({"d": 4})

# Use sequential calls
data.update({"c": 3})
data.update({"d": 4})

# Or merge operator (Python 3.9+)
data = {"a": 1, "b": 2} | {"c": 3} | {"d": 4}

# Builder pattern for chaining
class DictBuilder:
    def __init__(self):
        self.data = {}
    
    def add(self, key, value):
        self.data[key] = value
        return self
    
    def update_from(self, other):
        self.data.update(other)
        return self
    
    def build(self):
        return self.data.copy()

# Chain calls
result = (DictBuilder()
    .add("a", 1)
    .add("b", 2)
    .update_from({"c": 3})
    .build())
print(result)  # {'a': 1, 'b': 2, 'c': 3}
```

## Combining Methods

```python
# get() with setdefault()
data = {}
count = data.get("count", 0)
data.setdefault("count", 0)
data["count"] = count + 1

# pop() with get()
cache = {"key1": "value1", "key2": "value2"}
value = cache.pop("key1", cache.get("default_key", "default"))

# update() with comprehension
base = {"a": 1, "b": 2}
updates = {"c": 3, "d": 4, "e": 5}
# Only update specific keys
base.update({k: v for k, v in updates.items() if k in ["c", "d"]})
print(base)  # {'a': 1, 'b': 2, 'c': 3, 'd': 4}

# setdefault() with nested operations
users = {}
users.setdefault("alice", {}).setdefault("scores", []).append(100)
users.setdefault("alice", {}).setdefault("scores", []).append(95)
print(users)  # {'alice': {'scores': [100, 95]}}

# copy() before destructive operation
original = {"a": 1, "b": 2, "c": 3}
filtered = original.copy()
for key in list(filtered.keys()):
    if filtered[key] % 2 == 0:
        filtered.pop(key)
print(original)  # {'a': 1, 'b': 2, 'c': 3} - unchanged
print(filtered)  # {'a': 1, 'c': 3}
```

## Summary

**Method Categories:**

| Category | Methods | Description |
|----------|---------|-------------|
| Access | `get()`, `setdefault()` | Safe value retrieval |
| Modify | `update()`, `pop()`, `popitem()`, `clear()` | Change dictionary |
| View | `keys()`, `values()`, `items()` | Iterate/inspect |
| Copy | `copy()`, `deepcopy()` | Duplicate dictionary |
| Create | `fromkeys()` | Initialize from keys |

**Method Returns:**

| Method | Returns | Modifies Dict |
|--------|---------|---------------|
| `get(key, default)` | Value or default | No |
| `setdefault(key, default)` | Value or default | Yes (if missing) |
| `update(other)` | None | Yes |
| `pop(key, default)` | Value or default | Yes |
| `popitem()` | (key, value) | Yes |
| `clear()` | None | Yes |
| `copy()` | New dict | No |
| `keys()` | View | No |
| `values()` | View | No |
| `items()` | View | No |

**Best Practices:**

- ✅ Use `get()` instead of `dict[key]` when key might not exist
- ✅ Use `setdefault()` for get-and-set operations
- ✅ Use `pop()` with default for safe removal
- ✅ Use views for iteration (memory efficient)
- ✅ Use `copy()` before destructive operations
- ✅ Use comprehension instead of `fromkeys()` for mutable defaults
- ❌ Don't use `setdefault()` with expensive default computation
- ❌ Don't use mutable defaults with `fromkeys()`
- ❌ Don't forget shallow vs deep copy distinction
- ❌ Don't chain methods (most return None)

**Remember:** Most dictionary methods are O(1) average case!

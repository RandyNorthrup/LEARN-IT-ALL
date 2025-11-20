---
id: "120-dict-creation-initialization"
title: "Dictionary Creation and Initialization"
chapterId: ch9-dictionaries
order: 2
duration: 25
objectives:
  - Master different ways to create dictionaries
  - Understand dictionary initialization patterns
  - Learn when to use each creation method
  - Build dictionaries efficiently
---

# Dictionary Creation and Initialization

Dictionaries are Python's built-in key-value data structure. Understanding how to create them efficiently is fundamental.

## Basic Dictionary Creation

```python
# Empty dictionary
empty1 = {}
empty2 = dict()

# Dictionary literal with initial values
person = {
    "name": "Alice",
    "age": 30,
    "city": "New York"
}

# Single line
point = {"x": 10, "y": 20}

# Different value types
mixed = {
    "string": "hello",
    "number": 42,
    "list": [1, 2, 3],
    "dict": {"nested": "value"},
    "bool": True,
    "none": None
}

# Keys must be immutable (hashable)
valid_keys = {
    "string": 1,
    42: 2,
    (1, 2): 3,  # Tuple is immutable
    True: 4,
    3.14: 5
}

# Invalid keys (unhashable)
try:
    invalid = {[1, 2]: "list key"}  # Lists are mutable!
except TypeError as e:
    print(f"Error: {e}")  # unhashable type: 'list'

try:
    invalid = {{}: "dict key"}  # Dicts are mutable!
except TypeError as e:
    print(f"Error: {e}")
```

## dict() Constructor

```python
# From keyword arguments
person = dict(name="Alice", age=30, city="New York")
print(person)  # {'name': 'Alice', 'age': 30, 'city': 'New York'}

# From list of tuples
pairs = [("a", 1), ("b", 2), ("c", 3)]
d = dict(pairs)
print(d)  # {'a': 1, 'b': 2, 'c': 3}

# From tuple of tuples
pairs = (("x", 10), ("y", 20))
d = dict(pairs)
print(d)  # {'x': 10, 'y': 20}

# From two lists with zip
keys = ["name", "age", "city"]
values = ["Bob", 25, "LA"]
person = dict(zip(keys, values))
print(person)  # {'name': 'Bob', 'age': 25, 'city': 'LA'}

# From another dictionary (shallow copy)
original = {"a": 1, "b": 2}
copy = dict(original)
copy["c"] = 3
print(original)  # {'a': 1, 'b': 2} - unchanged
print(copy)      # {'a': 1, 'b': 2, 'c': 3}
```

## dict.fromkeys()

```python
# Create dict with default value
keys = ["a", "b", "c"]
d = dict.fromkeys(keys)
print(d)  # {'a': None, 'b': None, 'c': None}

# With specific default value
d = dict.fromkeys(keys, 0)
print(d)  # {'a': 0, 'b': 0, 'c': 0}

# Create from range
d = dict.fromkeys(range(5), "value")
print(d)  # {0: 'value', 1: 'value', ..., 4: 'value'}

# ⚠️ WARNING: Mutable default is shared!
keys = ["a", "b", "c"]
d = dict.fromkeys(keys, [])
d["a"].append(1)
print(d)  # {'a': [1], 'b': [1], 'c': [1]} - all share same list!

# Each key references the same list object
print(id(d["a"]) == id(d["b"]))  # True

# CORRECT: Initialize mutable values separately
d = {key: [] for key in keys}
d["a"].append(1)
print(d)  # {'a': [1], 'b': [], 'c': []} - separate lists
```

## Dictionary Comprehensions

```python
# Basic comprehension
squares = {x: x**2 for x in range(5)}
print(squares)  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# With condition
evens = {x: x**2 for x in range(10) if x % 2 == 0}
print(evens)  # {0: 0, 2: 4, 4: 16, 6: 36, 8: 64}

# From list of items
words = ["apple", "banana", "cherry"]
word_lengths = {word: len(word) for word in words}
print(word_lengths)  # {'apple': 5, 'banana': 6, 'cherry': 6}

# Transform keys and values
data = {"a": 1, "b": 2, "c": 3}
uppercase = {k.upper(): v * 10 for k, v in data.items()}
print(uppercase)  # {'A': 10, 'B': 20, 'C': 30}

# Invert dictionary (swap keys and values)
original = {"a": 1, "b": 2, "c": 3}
inverted = {v: k for k, v in original.items()}
print(inverted)  # {1: 'a', 2: 'b', 3: 'c'}

# Filter dictionary
data = {"a": 1, "b": 2, "c": 3, "d": 4}
filtered = {k: v for k, v in data.items() if v > 2}
print(filtered)  # {'c': 3, 'd': 4}

# Nested comprehension
matrix_dict = {
    (i, j): i * j
    for i in range(3)
    for j in range(3)
}
print(matrix_dict[(1, 2)])  # 2
```

## From Lists and Tuples

```python
# List of tuples
items = [("name", "Alice"), ("age", 30), ("city", "NYC")]
person = dict(items)
print(person)

# Enumerate creates (index, value) pairs
fruits = ["apple", "banana", "cherry"]
fruit_indices = dict(enumerate(fruits))
print(fruit_indices)  # {0: 'apple', 1: 'banana', 2: 'cherry'}

# Start enumerate from different number
fruit_indices = dict(enumerate(fruits, start=1))
print(fruit_indices)  # {1: 'apple', 2: 'banana', 3: 'cherry'}

# List of lists
items = [["a", 1], ["b", 2], ["c", 3]]
d = dict(items)
print(d)  # {'a': 1, 'b': 2, 'c': 3}

# Unpack list of dicts into single dict
dicts = [{"a": 1}, {"b": 2}, {"c": 3}]
combined = {}
for d in dicts:
    combined.update(d)
print(combined)  # {'a': 1, 'b': 2, 'c': 3}

# Or use dictionary unpacking (Python 3.5+)
combined = {**dicts[0], **dicts[1], **dicts[2]}
print(combined)  # {'a': 1, 'b': 2, 'c': 3}
```

## Nested Dictionaries

```python
# Create nested structure
users = {
    "alice": {
        "age": 30,
        "city": "NYC",
        "email": "alice@example.com"
    },
    "bob": {
        "age": 25,
        "city": "LA",
        "email": "bob@example.com"
    }
}

# Access nested values
print(users["alice"]["city"])  # NYC

# Comprehension for nested dict
data = ["alice", "bob", "charlie"]
users = {
    name: {"id": i, "name": name.capitalize()}
    for i, name in enumerate(data, 1)
}
print(users)
# {'alice': {'id': 1, 'name': 'Alice'}, ...}

# Matrix as nested dict
matrix = {
    0: {0: 1, 1: 2, 2: 3},
    1: {0: 4, 1: 5, 2: 6},
    2: {0: 7, 1: 8, 2: 9}
}
print(matrix[1][2])  # 6
```

## Default Values with defaultdict

```python
from collections import defaultdict

# Regular dict requires checking
word_count = {}
for word in ["apple", "banana", "apple", "cherry"]:
    if word in word_count:
        word_count[word] += 1
    else:
        word_count[word] = 1
print(word_count)  # {'apple': 2, 'banana': 1, 'cherry': 1}

# defaultdict provides default automatically
word_count = defaultdict(int)  # int() returns 0
for word in ["apple", "banana", "apple", "cherry"]:
    word_count[word] += 1
print(dict(word_count))  # {'apple': 2, 'banana': 1, 'cherry': 1}

# Default list
groups = defaultdict(list)
items = [("a", 1), ("b", 2), ("a", 3), ("b", 4)]
for key, value in items:
    groups[key].append(value)
print(dict(groups))  # {'a': [1, 3], 'b': [2, 4]}

# Default set
unique_words = defaultdict(set)
sentences = [
    ("en", "hello world"),
    ("es", "hola mundo"),
    ("en", "hello python")
]
for lang, sentence in sentences:
    unique_words[lang].update(sentence.split())
print(dict(unique_words))
# {'en': {'hello', 'world', 'python'}, 'es': {'hola', 'mundo'}}

# Custom default factory
def default_list_with_zero():
    return [0]

d = defaultdict(default_list_with_zero)
d["a"].append(1)
print(dict(d))  # {'a': [0, 1]}
```

## Counter for Frequency Counting

```python
from collections import Counter

# Count elements
words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
counts = Counter(words)
print(counts)  # Counter({'apple': 3, 'banana': 2, 'cherry': 1})

# Counter is a dict subclass
print(counts["apple"])  # 3
print(counts["grape"])  # 0 - returns 0 for missing keys

# From string (character count)
text = "hello world"
char_count = Counter(text)
print(char_count)  # Counter({'l': 3, 'o': 2, ...})

# Most common
print(counts.most_common(2))  # [('apple', 3), ('banana', 2)]

# Arithmetic operations
c1 = Counter(["a", "b", "c", "a"])
c2 = Counter(["a", "b", "d", "b"])

print(c1 + c2)  # Counter({'a': 3, 'b': 3, 'c': 1, 'd': 1})
print(c1 - c2)  # Counter({'a': 1, 'c': 1})
print(c1 & c2)  # Counter({'a': 1, 'b': 1}) - intersection
print(c1 | c2)  # Counter({'a': 2, 'b': 2, 'c': 1, 'd': 1}) - union
```

## Merging Dictionaries

```python
# Python 3.9+ merge operator
dict1 = {"a": 1, "b": 2}
dict2 = {"c": 3, "d": 4}
merged = dict1 | dict2
print(merged)  # {'a': 1, 'b': 2, 'c': 3, 'd': 4}

# Later keys override
dict1 = {"a": 1, "b": 2}
dict2 = {"b": 20, "c": 3}
merged = dict1 | dict2
print(merged)  # {'a': 1, 'b': 20, 'c': 3}

# Dictionary unpacking (Python 3.5+)
merged = {**dict1, **dict2}
print(merged)  # {'a': 1, 'b': 20, 'c': 3}

# update() method (modifies in-place)
dict1 = {"a": 1, "b": 2}
dict2 = {"c": 3, "d": 4}
dict1.update(dict2)
print(dict1)  # {'a': 1, 'b': 2, 'c': 3, 'd': 4}

# Merge multiple dictionaries
dicts = [{"a": 1}, {"b": 2}, {"c": 3}]
merged = {}
for d in dicts:
    merged.update(d)
# Or: merged = {k: v for d in dicts for k, v in d.items()}

# ChainMap - virtual merge (no copying)
from collections import ChainMap

dict1 = {"a": 1, "b": 2}
dict2 = {"b": 20, "c": 3}
chain = ChainMap(dict1, dict2)
print(chain["b"])  # 2 - first dict takes precedence
print(chain["c"])  # 3
```

## Copying Dictionaries

```python
# Shallow copy methods
original = {"a": 1, "b": 2, "c": 3}

# Method 1: .copy()
copy1 = original.copy()

# Method 2: dict()
copy2 = dict(original)

# Method 3: dictionary comprehension
copy3 = {k: v for k, v in original.items()}

# All are independent
copy1["d"] = 4
print(original)  # {'a': 1, 'b': 2, 'c': 3} - unchanged

# ⚠️ Shallow copy limitation with nested dicts
original = {"a": {"nested": 1}, "b": 2}
shallow = original.copy()
shallow["a"]["nested"] = 99
print(original)  # {'a': {'nested': 99}, 'b': 2} - affected!

# Deep copy for nested structures
import copy
original = {"a": {"nested": 1}, "b": 2}
deep = copy.deepcopy(original)
deep["a"]["nested"] = 99
print(original)  # {'a': {'nested': 1}, 'b': 2} - unchanged
```

## Pre-populating Dictionaries

```python
# Initialize with same value
keys = ["a", "b", "c", "d"]
d = {key: 0 for key in keys}
print(d)  # {'a': 0, 'b': 0, 'c': 0, 'd': 0}

# Initialize with computed values
d = {key: len(key) for key in ["apple", "banana", "cherry"]}
print(d)  # {'apple': 5, 'banana': 6, 'cherry': 6}

# Initialize with range
d = {i: i**2 for i in range(5)}
print(d)  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# Initialize with function calls
def get_config(key):
    return f"config_{key}"

keys = ["db", "cache", "api"]
config = {key: get_config(key) for key in keys}
print(config)  # {'db': 'config_db', 'cache': 'config_cache', ...}
```

## Performance Comparison

```python
import time

# Compare creation methods
n = 100000

# Literal
start = time.time()
for _ in range(n):
    d = {"a": 1, "b": 2, "c": 3}
literal_time = time.time() - start

# dict() constructor
start = time.time()
for _ in range(n):
    d = dict(a=1, b=2, c=3)
dict_time = time.time() - start

# Comprehension
start = time.time()
for _ in range(n):
    d = {k: v for k, v in [("a", 1), ("b", 2), ("c", 3)]}
comp_time = time.time() - start

print(f"Literal:       {literal_time:.6f}s")
print(f"dict():        {dict_time:.6f}s")
print(f"Comprehension: {comp_time:.6f}s")
# Literal is fastest
```

## Summary

**Creation Methods:**

| Method | Example | Use Case |
|--------|---------|----------|
| Literal | `{"a": 1}` | Known key-value pairs |
| `dict()` | `dict(a=1, b=2)` | From iterables |
| `fromkeys()` | `dict.fromkeys(keys, 0)` | Same default value |
| Comprehension | `{k: v for ...}` | Transform/filter |
| `defaultdict` | `defaultdict(list)` | Auto-create values |
| `Counter` | `Counter(items)` | Frequency counting |

**Best Practices:**

- ✅ Use literals `{}` for known data
- ✅ Use comprehensions for transformations
- ✅ Use `defaultdict` when you need auto-creation
- ✅ Use `Counter` for counting/frequency
- ✅ Use `.copy()` or `dict()` for shallow copies
- ✅ Use `deepcopy()` for nested dictionaries
- ❌ Don't use mutable default with `fromkeys()`
- ❌ Don't forget keys must be immutable/hashable

**Remember:** Dictionary creation is fast - choose the method that makes your code clearest!

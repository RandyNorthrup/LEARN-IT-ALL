---
id: lesson-110-dict-introduction
title: "Introduction to Dictionaries"
chapterId: ch9-dictionaries
order: 1
duration: 30
objectives:
  - Understand what key-value pairs are with real-world analogies
  - Create dictionaries using literals, dict(), and zip
  - Access, add, update, and remove dictionary entries
  - Iterate over dictionaries with keys(), values(), and items()
  - Work with nested dictionaries
  - Apply common dictionary patterns like counting, grouping, and caching
  - Know when to use dictionaries vs lists
---

# Introduction to Dictionaries

## What Are Key-Value Pairs?

A **dictionary** stores data as **key-value pairs**. Each key maps to exactly one value, and you look up values by their key — not by a numeric index.

### Real-World Analogies

- **Phone book:** A name (key) maps to a phone number (value).
- **Word definitions:** A word (key) maps to its meaning (value). You don't read page-by-page — you jump straight to the entry.
- **Student ID system:** An ID number (key) maps to a student record (value).
- **Restaurant menu:** A dish name (key) maps to its price (value).

```python
phone_book = {
    "Alice": "555-1234",
    "Bob": "555-5678",
    "Charlie": "555-9012"
}
print(phone_book["Alice"])  # 555-1234
```

---

## Why Use Dictionaries?

### Fast Lookup — O(1) Average

Dictionaries use a **hash table** internally, giving near-instant lookups:

```python
# List — must scan element by element (O(n))
students = [("alice", 95), ("bob", 87), ("charlie", 92)]

# Dictionary — direct access (O(1))
grades = {"alice": 95, "bob": 87, "charlie": 92}
print(grades["bob"])  # 87
```

### Self-Documenting Code

```python
# List — what does index 2 mean?
student = ["Alice", 20, "Computer Science"]

# Dict — crystal clear
student = {"name": "Alice", "age": 20, "major": "Computer Science"}
```

---

## Creating Dictionaries

### Literal Syntax

```python
empty = {}
person = {"first_name": "John", "last_name": "Doe", "age": 30}
```

### Using `dict()` Constructor

```python
person = dict(name="Alice", age=25, city="NYC")

pairs = [("name", "Bob"), ("age", 30)]
person = dict(pairs)
```

### From Two Lists with `zip()`

```python
keys = ["name", "age", "city"]
values = ["Charlie", 35, "Chicago"]
person = dict(zip(keys, values))
```

### Dictionary Comprehension (Preview)

```python
squares = {x: x**2 for x in range(1, 6)}
print(squares)  # {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}
```

---

## Key Rules

1. **Keys must be immutable** — strings, numbers, and tuples work. Lists and dicts do **not**.
2. **Keys must be unique** — if repeated, the last value wins:
   ```python
   d = {"a": 1, "b": 2, "a": 3}
   print(d)  # {'a': 3, 'b': 2}
   ```
3. **Values can be anything** — numbers, strings, lists, other dicts, functions, etc.

---

## Accessing Values

### Bracket Notation `[]`

```python
student = {"name": "Alice", "grade": 95, "enrolled": True}
print(student["name"])   # Alice
print(student["email"])  # KeyError: 'email'
```

### `get()` — Safe Access

```python
print(student.get("grade"))         # 95
print(student.get("email"))         # None
print(student.get("email", "N/A"))  # N/A
```

**Best practice:** Use `get()` when the key might not exist. Use `[]` when you're certain and want an error if it's missing (fail fast).

---

## Adding and Updating Entries

```python
student = {"name": "Alice", "grade": 95}

# Add new key
student["email"] = "alice@example.com"

# Update existing key
student["grade"] = 98

print(student)
# {'name': 'Alice', 'grade': 98, 'email': 'alice@example.com'}
```

### `update()` — Merge Another Dictionary

```python
defaults = {"theme": "light", "language": "en", "font_size": 14}
user_prefs = {"theme": "dark", "font_size": 16}

defaults.update(user_prefs)
print(defaults)  # {'theme': 'dark', 'language': 'en', 'font_size': 16}
```

### Merge Operator `|` (Python 3.9+)

```python
merged = defaults | user_prefs   # New dict
defaults |= user_prefs           # Update in place
```

---

## Removing Entries

```python
config = {"host": "localhost", "port": 5432, "debug": True}

# del — raises KeyError if missing
del config["debug"]

# pop — remove and return; optional default
port = config.pop("port")         # 5432
missing = config.pop("x", None)   # None (no error)

# popitem — remove last inserted pair
d = {"a": 1, "b": 2, "c": 3}
last = d.popitem()  # ('c', 3)

# clear — remove everything
d.clear()  # {}
```

---

## Checking Keys with `in`

```python
inventory = {"apples": 30, "bananas": 12, "oranges": 25}

print("apples" in inventory)      # True
print("grapes" in inventory)      # False
print(30 in inventory.values())   # True  — check values explicitly
```

---

## Iterating Over Dictionaries

```python
student = {"name": "Alice", "age": 20, "major": "CS"}

# Keys (default)
for key in student:
    print(key)

# Values
for value in student.values():
    print(value)

# Both — most common and Pythonic
for key, value in student.items():
    print(f"{key}: {value}")
```

### Building a Formatted String

```python
config = {"host": "localhost", "port": 5432, "db": "myapp"}
summary = ", ".join(f"{k}={v}" for k, v in config.items())
print(summary)  # host=localhost, port=5432, db=myapp
```

---

## Dictionary Methods Overview

| Method | Description |
|--------|------------|
| `d.get(key, default)` | Return value or default |
| `d.keys()` | View of all keys |
| `d.values()` | View of all values |
| `d.items()` | View of (key, value) pairs |
| `d.update(other)` | Merge another dict |
| `d.pop(key, default)` | Remove and return value |
| `d.popitem()` | Remove last pair |
| `d.clear()` | Remove all entries |
| `d.copy()` | Shallow copy |
| `d.setdefault(key, default)` | Get value; insert default if missing |

---

## Nested Dictionaries

```python
school = {
    "alice": {
        "age": 20,
        "grades": {"math": 95, "science": 87}
    },
    "bob": {
        "age": 22,
        "grades": {"math": 88, "science": 91}
    }
}

print(school["alice"]["grades"]["math"])  # 95

# Iterate nested structure
for name, info in school.items():
    avg = sum(info["grades"].values()) / len(info["grades"])
    print(f"{name}: average = {avg:.1f}")
```

### Safe Nested Access

```python
grade = school.get("charlie", {}).get("grades", {}).get("math", "N/A")
print(grade)  # N/A
```

---

## Common Dictionary Patterns

### 1. Counting Occurrences

```python
text = "the quick brown fox jumps over the lazy dog the fox"
word_counts = {}
for word in text.split():
    word_counts[word] = word_counts.get(word, 0) + 1

print(word_counts)  # {'the': 3, 'fox': 2, ...}
```

### 2. Grouping Items

```python
students = [
    ("Alice", "CS"), ("Bob", "Math"), ("Charlie", "CS"),
    ("Diana", "Math"), ("Eve", "CS")
]
by_major = {}
for name, major in students:
    by_major.setdefault(major, []).append(name)

print(by_major)  # {'CS': ['Alice', 'Charlie', 'Eve'], 'Math': ['Bob', 'Diana']}
```

### 3. Inverting a Dictionary

```python
original = {"a": 1, "b": 2, "c": 3}
inverted = {v: k for k, v in original.items()}
print(inverted)  # {1: 'a', 2: 'b', 3: 'c'}
```

### 4. Caching / Memoization

```python
cache = {}

def fibonacci(n):
    if n in cache:
        return cache[n]
    if n <= 1:
        result = n
    else:
        result = fibonacci(n - 1) + fibonacci(n - 2)
    cache[n] = result
    return result

print(fibonacci(30))  # 832040 — fast thanks to caching
```

### 5. Using `defaultdict`

```python
from collections import defaultdict

counts = defaultdict(int)
for word in "the fox and the dog".split():
    counts[word] += 1

print(dict(counts))  # {'the': 2, 'fox': 1, 'and': 1, 'dog': 1}
```

---

## When to Use Dicts vs Lists

| Use a List when... | Use a Dict when... |
|---|---|
| Order matters, access by position | Look up values by meaningful key |
| Simple sequence of items | Need fast O(1) lookups |
| Maintaining sorted data | Data is key-value (name→phone) |
| Iterating through all elements | Counting, grouping, or caching |

---

## Python 3.7+ Insertion Order Guarantee

Since **Python 3.7**, dictionaries preserve **insertion order**:

```python
d = {}
d["banana"] = 2
d["apple"] = 5
d["cherry"] = 3

for key in d:
    print(key)
# banana, apple, cherry  — guaranteed order
```

To get a sorted view: `dict(sorted(d.items()))`.

---

## Try It Yourself

1. **Character counter:** Write a function that returns a dict mapping each character in a string to its count.
2. **Two-dict merge:** Merge two dicts; if a key exists in both, sum their values.
3. **Invert a dict:** Swap keys and values. Handle duplicate values by mapping to a list.
4. **Grade book:** Build a nested dict with students as keys and subject→grade dicts as values. Calculate each student's average.

---

## Key Takeaways

- Dictionaries store **key-value pairs** with O(1) average lookup time.
- Keys must be **immutable and unique**; values can be anything.
- Use **`[]`** for access when you're certain the key exists; use **`get()`** when it might not.
- **`del`**, **`pop()`**, **`popitem()`**, and **`clear()`** remove entries in different ways.
- Iterate with **`.items()`** to unpack both keys and values.
- **Nested dicts** model hierarchical data; use chained `.get()` for safe access.
- Common patterns: **counting**, **grouping**, **inverting**, and **caching**.
- Since **Python 3.7**, dicts preserve **insertion order**.
- Choose dicts over lists when you need fast lookups by meaningful keys.

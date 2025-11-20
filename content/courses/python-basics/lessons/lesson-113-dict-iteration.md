---
id: "122-dict-iteration"
title: "Dictionary Iteration Techniques"
chapterId: ch9-dictionaries
order: 4
duration: 25
objectives:
  - Master different ways to iterate dictionaries
  - Understand when to use each iteration method
  - Learn safe iteration patterns
  - Handle modification during iteration
---

# Dictionary Iteration Techniques

Understanding how to iterate over dictionaries efficiently is crucial for data processing.

## Iterating Keys (Default)

```python
# Default iteration is over keys
person = {"name": "Alice", "age": 30, "city": "NYC"}

for key in person:
    print(key)
# name
# age
# city

# Explicit .keys()
for key in person.keys():
    print(key)
# Same output

# Access values via keys
for key in person:
    print(f"{key}: {person[key]}")
# name: Alice
# age: 30
# city: NYC

# Filter while iterating
for key in person:
    if isinstance(person[key], str):
        print(f"{key} = {person[key]}")
# name = Alice
# city = NYC
```

## Iterating Values

```python
person = {"name": "Alice", "age": 30, "city": "NYC"}

# Use .values()
for value in person.values():
    print(value)
# Alice
# 30
# NYC

# Type checking
for value in person.values():
    print(f"{value} is {type(value).__name__}")
# Alice is str
# 30 is int
# NYC is str

# Sum numeric values
scores = {"alice": 100, "bob": 85, "charlie": 90}
total = sum(scores.values())
print(f"Total: {total}")  # Total: 275

# Find max/min values
print(f"Max: {max(scores.values())}")  # Max: 100
print(f"Min: {min(scores.values())}")  # Min: 85
```

## Iterating Key-Value Pairs

```python
person = {"name": "Alice", "age": 30, "city": "NYC"}

# Use .items() - most common pattern
for key, value in person.items():
    print(f"{key}: {value}")
# name: Alice
# age: 30
# city: NYC

# Without unpacking
for item in person.items():
    key, value = item
    print(f"{key} = {value}")

# Filter based on both key and value
for key, value in person.items():
    if key.startswith("a") and isinstance(value, int):
        print(f"{key}: {value}")
# age: 30

# Build new dictionary
uppercase = {}
for key, value in person.items():
    uppercase[key.upper()] = value
print(uppercase)  # {'NAME': 'Alice', 'AGE': 30, 'CITY': 'NYC'}

# Or use comprehension
uppercase = {k.upper(): v for k, v in person.items()}
```

## Dictionary Comprehensions

```python
# Basic transformation
numbers = {"a": 1, "b": 2, "c": 3}
squared = {k: v**2 for k, v in numbers.items()}
print(squared)  # {'a': 1, 'b': 4, 'c': 9}

# Filter with condition
data = {"a": 1, "b": 2, "c": 3, "d": 4}
evens = {k: v for k, v in data.items() if v % 2 == 0}
print(evens)  # {'b': 2, 'd': 4}

# Transform keys
person = {"name": "Alice", "age": 30}
upper_keys = {k.upper(): v for k, v in person.items()}
print(upper_keys)  # {'NAME': 'Alice', 'AGE': 30}

# Transform both keys and values
data = {"a": 1, "b": 2, "c": 3}
transformed = {k.upper(): v * 10 for k, v in data.items()}
print(transformed)  # {'A': 10, 'B': 20, 'C': 30}

# Conditional transformation
scores = {"alice": 100, "bob": 85, "charlie": 90}
passed = {
    name: "Pass" if score >= 90 else "Fail"
    for name, score in scores.items()
}
print(passed)  # {'alice': 'Pass', 'bob': 'Fail', 'charlie': 'Pass'}

# Nested comprehension
matrix = {
    (i, j): i * j
    for i in range(3)
    for j in range(3)
}
print(matrix[(2, 2)])  # 4
```

## Enumerate Dictionary

```python
# Enumerate keys
person = {"name": "Alice", "age": 30, "city": "NYC"}

for i, key in enumerate(person):
    print(f"{i}: {key} = {person[key]}")
# 0: name = Alice
# 1: age = 30
# 2: city = NYC

# Enumerate items
for i, (key, value) in enumerate(person.items()):
    print(f"Item {i}: {key} = {value}")
# Item 0: name = Alice
# Item 1: age = 30
# Item 2: city = NYC

# Start from different number
for i, (key, value) in enumerate(person.items(), start=1):
    print(f"{i}. {key}: {value}")
# 1. name: Alice
# 2. age: 30
# 3. city: NYC
```

## Iterating in Sorted Order

```python
person = {"name": "Alice", "age": 30, "city": "NYC", "email": "alice@example.com"}

# Sort by keys alphabetically
for key in sorted(person):
    print(f"{key}: {person[key]}")
# age: 30
# city: NYC
# email: alice@example.com
# name: Alice

# Sort by keys reverse
for key in sorted(person, reverse=True):
    print(f"{key}: {person[key]}")

# Sort by values
scores = {"alice": 100, "bob": 85, "charlie": 90}
for key in sorted(scores, key=lambda k: scores[k]):
    print(f"{key}: {scores[key]}")
# bob: 85
# charlie: 90
# alice: 100

# Sort by values descending
for key in sorted(scores, key=lambda k: scores[k], reverse=True):
    print(f"{key}: {scores[key]}")
# alice: 100
# charlie: 90
# bob: 85

# Sort items by value
for key, value in sorted(scores.items(), key=lambda item: item[1]):
    print(f"{key}: {value}")

# Sort by multiple criteria
data = {
    "alice": {"age": 30, "score": 100},
    "bob": {"age": 25, "score": 100},
    "charlie": {"age": 30, "score": 90}
}

# Sort by score desc, then age asc
for name in sorted(data, key=lambda n: (-data[n]["score"], data[n]["age"])):
    print(f"{name}: score={data[name]['score']}, age={data[name]['age']}")
# alice: score=100, age=25
# bob: score=100, age=30
# charlie: score=90, age=30
```

## Iterating Nested Dictionaries

```python
# Nested structure
company = {
    "engineering": {
        "alice": {"role": "senior", "salary": 120000},
        "bob": {"role": "junior", "salary": 80000}
    },
    "sales": {
        "charlie": {"role": "manager", "salary": 100000},
        "david": {"role": "rep", "salary": 60000}
    }
}

# Two-level iteration
for dept, employees in company.items():
    print(f"\n{dept.upper()}:")
    for name, info in employees.items():
        print(f"  {name}: {info['role']} - ${info['salary']}")

# ENGINEERING:
#   alice: senior - $120000
#   bob: junior - $80000
# SALES:
#   charlie: manager - $100000
#   david: rep - $60000

# Flatten nested dict
flat = {}
for dept, employees in company.items():
    for name, info in employees.items():
        flat[f"{dept}_{name}"] = info
print(flat)

# Find specific values
for dept, employees in company.items():
    for name, info in employees.items():
        if info["salary"] > 100000:
            print(f"{name} in {dept}: ${info['salary']}")
# alice in engineering: $120000

# Collect all salaries
salaries = []
for dept in company.values():
    for employee in dept.values():
        salaries.append(employee["salary"])
print(f"Average salary: ${sum(salaries) / len(salaries):.0f}")
```

## Parallel Iteration with zip()

```python
# Iterate two dicts in parallel
dict1 = {"a": 1, "b": 2, "c": 3}
dict2 = {"a": 10, "b": 20, "c": 30}

for key in dict1:
    if key in dict2:
        print(f"{key}: {dict1[key]} + {dict2[key]} = {dict1[key] + dict2[key]}")
# a: 1 + 10 = 11
# b: 2 + 20 = 22
# c: 3 + 30 = 33

# Zip values from two dicts (assumes same keys)
for v1, v2 in zip(dict1.values(), dict2.values()):
    print(f"{v1} + {v2} = {v1 + v2}")

# Zip items
for (k1, v1), (k2, v2) in zip(dict1.items(), dict2.items()):
    print(f"{k1}={v1}, {k2}={v2}")

# Merge two dicts
merged = {}
for key in set(dict1) | set(dict2):  # Union of keys
    merged[key] = dict1.get(key, 0) + dict2.get(key, 0)
print(merged)
```

## Filtering During Iteration

```python
data = {
    "alice": {"age": 30, "active": True},
    "bob": {"age": 25, "active": False},
    "charlie": {"age": 35, "active": True}
}

# Filter active users
active_users = {}
for name, info in data.items():
    if info["active"]:
        active_users[name] = info
print(active_users)

# Or with comprehension
active_users = {
    name: info
    for name, info in data.items()
    if info["active"]
}

# Multiple conditions
qualified = {
    name: info
    for name, info in data.items()
    if info["active"] and info["age"] >= 30
}
print(qualified)  # {'alice': {...}, 'charlie': {...}}

# Filter by key pattern
person = {
    "first_name": "Alice",
    "last_name": "Smith",
    "age": 30,
    "email": "alice@example.com"
}

names_only = {
    k: v for k, v in person.items()
    if "name" in k
}
print(names_only)  # {'first_name': 'Alice', 'last_name': 'Smith'}
```

## Modifying During Iteration

```python
# ❌ WRONG: Modify dict during iteration
scores = {"alice": 100, "bob": 85, "charlie": 90}

try:
    for key in scores:
        if scores[key] < 90:
            del scores[key]  # RuntimeError!
except RuntimeError as e:
    print(f"Error: {e}")  # dictionary changed size during iteration

# ✅ CORRECT: Iterate over copy of keys
scores = {"alice": 100, "bob": 85, "charlie": 90}
for key in list(scores.keys()):  # list() creates copy
    if scores[key] < 90:
        del scores[key]
print(scores)  # {'alice': 100, 'charlie': 90}

# ✅ CORRECT: Build new dictionary
scores = {"alice": 100, "bob": 85, "charlie": 90}
scores = {k: v for k, v in scores.items() if v >= 90}
print(scores)  # {'alice': 100, 'charlie': 90}

# Modify values (safe)
scores = {"alice": 100, "bob": 85, "charlie": 90}
for key in scores:
    scores[key] += 10  # Modifying values is safe
print(scores)  # {'alice': 110, 'bob': 95, 'charlie': 100}

# Add items (unsafe without copy)
scores = {"alice": 100, "bob": 85}
for key in list(scores):  # Need list() copy
    if scores[key] >= 90:
        scores[f"{key}_bonus"] = scores[key] + 10
print(scores)  # {'alice': 110, 'bob': 85, 'alice_bonus': 110}
```

## Iterating with itertools

```python
import itertools

# islice - iterate subset
data = {"a": 1, "b": 2, "c": 3, "d": 4, "e": 5}
first_three = dict(itertools.islice(data.items(), 3))
print(first_three)  # {'a': 1, 'b': 2, 'c': 3}

# chain - iterate multiple dicts
dict1 = {"a": 1, "b": 2}
dict2 = {"c": 3, "d": 4}
for key, value in itertools.chain(dict1.items(), dict2.items()):
    print(f"{key}: {value}")

# groupby - group by key/value
data = [
    ("fruit", "apple"),
    ("fruit", "banana"),
    ("veggie", "carrot"),
    ("fruit", "cherry"),
    ("veggie", "spinach")
]
data.sort(key=lambda x: x[0])  # Must be sorted
for category, items in itertools.groupby(data, key=lambda x: x[0]):
    print(f"{category}: {[item[1] for item in items]}")
# fruit: ['apple', 'banana', 'cherry']
# veggie: ['carrot', 'spinach']

# combinations - iterate all pairs
keys = ["a", "b", "c"]
for k1, k2 in itertools.combinations(keys, 2):
    print(f"Pair: {k1}, {k2}")
# Pair: a, b
# Pair: a, c
# Pair: b, c
```

## Performance Patterns

```python
import time

# Large dictionary
large_dict = {i: i**2 for i in range(100000)}

# Test iteration methods
methods = []

# Method 1: items()
start = time.time()
count = sum(1 for k, v in large_dict.items() if v > 50000)
methods.append(("items()", time.time() - start))

# Method 2: keys()
start = time.time()
count = sum(1 for k in large_dict.keys() if large_dict[k] > 50000)
methods.append(("keys()", time.time() - start))

# Method 3: Comprehension
start = time.time()
result = {k: v for k, v in large_dict.items() if v > 50000}
methods.append(("comprehension", time.time() - start))

# Print results
for method, elapsed in methods:
    print(f"{method}: {elapsed:.6f}s")

# items() is usually fastest for key-value operations
```

## Common Patterns

```python
# Count occurrences
words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
counts = {}
for word in words:
    counts[word] = counts.get(word, 0) + 1
print(counts)  # {'apple': 3, 'banana': 2, 'cherry': 1}

# Group by property
people = [
    {"name": "Alice", "age": 30},
    {"name": "Bob", "age": 25},
    {"name": "Charlie", "age": 30}
]
by_age = {}
for person in people:
    age = person["age"]
    by_age.setdefault(age, []).append(person["name"])
print(by_age)  # {30: ['Alice', 'Charlie'], 25: ['Bob']}

# Invert dictionary
original = {"a": 1, "b": 2, "c": 1}
from collections import defaultdict
inverted = defaultdict(list)
for key, value in original.items():
    inverted[value].append(key)
print(dict(inverted))  # {1: ['a', 'c'], 2: ['b']}

# Accumulate values
transactions = [
    {"account": "A", "amount": 100},
    {"account": "B", "amount": 50},
    {"account": "A", "amount": 200}
]
balances = {}
for t in transactions:
    account = t["account"]
    balances[account] = balances.get(account, 0) + t["amount"]
print(balances)  # {'A': 300, 'B': 50}
```

## Summary

**Iteration Methods:**

| Method | Use Case | Returns |
|--------|----------|---------|
| `for k in d:` | Iterate keys | Keys |
| `for k in d.keys():` | Explicit keys | Keys |
| `for v in d.values():` | Only need values | Values |
| `for k, v in d.items():` | Need both | Key-value pairs |

**Patterns:**

| Pattern | When to Use |
|---------|-------------|
| `for k in d:` | Process keys, lookup values |
| `for v in d.values():` | Process only values |
| `for k, v in d.items():` | Process key-value pairs |
| `{k: v for k, v in d.items() if ...}` | Filter/transform dict |
| `for k in sorted(d):` | Iterate in order |
| `for k in list(d):` | Modify dict during iteration |

**Best Practices:**

- ✅ Use `.items()` when you need both key and value
- ✅ Use `.values()` when you only need values
- ✅ Use `.keys()` or default iteration for keys
- ✅ Use comprehensions for filtering/transforming
- ✅ Use `list(d.keys())` when modifying during iteration
- ✅ Use `sorted()` for ordered iteration
- ❌ Don't modify dict size during iteration without copying
- ❌ Don't iterate and lookup when `.items()` is clearer
- ❌ Don't use `.keys()` unnecessarily (default iteration is keys)

**Remember:** Dictionary iteration order is insertion order (Python 3.7+)!

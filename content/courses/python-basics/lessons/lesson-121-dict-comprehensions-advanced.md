---
id: "126-dict-comprehensions-advanced"
title: "Advanced Dictionary Comprehensions"
chapterId: ch9-dictionaries
order: 12
duration: 25
objectives:
  - Master complex dictionary comprehensions
  - Learn filtering and transformation patterns
  - Understand nested comprehensions
  - Optimize comprehension performance
---

# Advanced Dictionary Comprehensions

Dictionary comprehensions provide powerful ways to create and transform dictionaries concisely.

## Basic Dictionary Comprehensions

```python
# Create from range
squares = {x: x**2 for x in range(6)}
print(squares)  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# From list
words = ["apple", "banana", "cherry"]
lengths = {word: len(word) for word in words}
print(lengths)  # {'apple': 5, 'banana': 6, 'cherry': 6}

# From enumerate
fruits = ["apple", "banana", "cherry"]
indexed = {i: fruit for i, fruit in enumerate(fruits)}
print(indexed)  # {0: 'apple', 1: 'banana', 2: 'cherry'}

# Transform existing dict
original = {"a": 1, "b": 2, "c": 3}
doubled = {k: v * 2 for k, v in original.items()}
print(doubled)  # {'a': 2, 'b': 4, 'c': 6}

# Swap keys and values
original = {"a": 1, "b": 2, "c": 3}
inverted = {v: k for k, v in original.items()}
print(inverted)  # {1: 'a', 2: 'b', 3: 'c'}
```

## Conditional Comprehensions

```python
# Filter with if
numbers = {x: x**2 for x in range(10) if x % 2 == 0}
print(numbers)  # {0: 0, 2: 4, 4: 16, 6: 36, 8: 64}

# Filter existing dict
data = {"a": 1, "b": 2, "c": 3, "d": 4}
filtered = {k: v for k, v in data.items() if v > 2}
print(filtered)  # {'c': 3, 'd': 4}

# Multiple conditions
data = {"a": 1, "b": 2, "c": 3, "d": 4, "e": 5}
result = {
    k: v for k, v in data.items()
    if v > 1 and v < 5
}
print(result)  # {'b': 2, 'c': 3, 'd': 4}

# Conditional on key
data = {"apple": 1, "banana": 2, "cherry": 3}
result = {k: v for k, v in data.items() if k.startswith('a')}
print(result)  # {'apple': 1}

# Conditional on both key and value
data = {"a": 1, "b": 2, "c": 3, "aa": 4}
result = {
    k: v for k, v in data.items()
    if len(k) == 1 and v % 2 == 0
}
print(result)  # {'b': 2}
```

## Conditional Expressions (if-else)

```python
# Transform with if-else
numbers = {x: "even" if x % 2 == 0 else "odd" for x in range(5)}
print(numbers)  # {0: 'even', 1: 'odd', 2: 'even', 3: 'odd', 4: 'even'}

# Conditional values
scores = {"alice": 95, "bob": 75, "charlie": 85}
results = {
    name: "pass" if score >= 80 else "fail"
    for name, score in scores.items()
}
print(results)  # {'alice': 'pass', 'bob': 'fail', 'charlie': 'pass'}

# Conditional keys
data = {i: i**2 for i in range(10)}
result = {
    (k if k % 2 == 0 else f"odd_{k}"): v
    for k, v in data.items()
}
print(result)
# {0: 0, 'odd_1': 1, 2: 4, 'odd_3': 9, ...}

# Complex conditional transformation
prices = {"apple": 1.0, "banana": 0.5, "cherry": 2.0}
discounted = {
    item: price * 0.9 if price > 1.0 else price
    for item, price in prices.items()
}
print(discounted)  # {'apple': 0.9, 'banana': 0.5, 'cherry': 1.8}
```

## Nested Dictionary Comprehensions

```python
# Create multiplication table
multiplication_table = {
    i: {j: i * j for j in range(1, 6)}
    for i in range(1, 6)
}
print(multiplication_table[3])  # {1: 3, 2: 6, 3: 9, 4: 12, 5: 15}

# Transform nested dict
data = {
    "user1": {"age": 30, "score": 100},
    "user2": {"age": 25, "score": 85}
}
transformed = {
    user: {k: v * 2 for k, v in info.items()}
    for user, info in data.items()
}
print(transformed)
# {'user1': {'age': 60, 'score': 200}, 'user2': {'age': 50, 'score': 170}}

# Filter nested dict
data = {
    "user1": {"age": 30, "active": True},
    "user2": {"age": 25, "active": False},
    "user3": {"age": 35, "active": True}
}
active_users = {
    user: info
    for user, info in data.items()
    if info["active"]
}
print(active_users)
# {'user1': {'age': 30, 'active': True}, 'user3': {'age': 35, 'active': True}}

# Create nested structure
matrix = {
    f"row_{i}": {f"col_{j}": i * j for j in range(3)}
    for i in range(3)
}
print(matrix["row_1"])  # {'col_0': 0, 'col_1': 1, 'col_2': 2}
```

## Multiple Input Iterables

```python
# Zip two lists
keys = ["a", "b", "c"]
values = [1, 2, 3]
d = {k: v for k, v in zip(keys, values)}
print(d)  # {'a': 1, 'b': 2, 'c': 3}

# Zip with transformation
names = ["alice", "bob", "charlie"]
ages = [30, 25, 35]
users = {name.upper(): age for name, age in zip(names, ages)}
print(users)  # {'ALICE': 30, 'BOB': 25, 'CHARLIE': 35}

# Multiple iterables with product
from itertools import product
coords = {
    (x, y): x + y
    for x, y in product(range(3), range(3))
}
print(coords[(1, 2)])  # 3

# Combine two dicts
dict1 = {"a": 1, "b": 2}
dict2 = {"a": 10, "c": 3}
combined = {
    k: dict1.get(k, 0) + dict2.get(k, 0)
    for k in set(dict1) | set(dict2)
}
print(combined)  # {'a': 11, 'b': 2, 'c': 3}
```

## Flattening Nested Structures

```python
# Flatten list of dicts
list_of_dicts = [
    {"a": 1, "b": 2},
    {"c": 3, "d": 4},
    {"e": 5, "f": 6}
]
flat = {k: v for d in list_of_dicts for k, v in d.items()}
print(flat)  # {'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6}

# Flatten nested dict (one level)
nested = {
    "group1": {"a": 1, "b": 2},
    "group2": {"c": 3, "d": 4}
}
flat = {
    f"{outer}_{inner}": value
    for outer, inner_dict in nested.items()
    for inner, value in inner_dict.items()
}
print(flat)  # {'group1_a': 1, 'group1_b': 2, 'group2_c': 3, 'group2_d': 4}

# Flatten list of tuples
pairs = [("a", 1), ("b", 2), ("c", 3), ("a", 4)]
# Last value wins for duplicate keys
flat = {k: v for k, v in pairs}
print(flat)  # {'a': 4, 'b': 2, 'c': 3}

# Collect all values for duplicate keys
from collections import defaultdict
result = defaultdict(list)
for k, v in pairs:
    result[k].append(v)
grouped = {k: v for k, v in result.items()}
print(grouped)  # {'a': [1, 4], 'b': [2], 'c': [3]}
```

## Grouping and Aggregation

```python
# Group by property
students = [
    {"name": "Alice", "grade": "A"},
    {"name": "Bob", "grade": "B"},
    {"name": "Charlie", "grade": "A"},
    {"name": "David", "grade": "B"}
]

# Group names by grade
from collections import defaultdict
groups = defaultdict(list)
for student in students:
    groups[student["grade"]].append(student["name"])
by_grade = {k: v for k, v in groups.items()}
print(by_grade)  # {'A': ['Alice', 'Charlie'], 'B': ['Bob', 'David']}

# Count by property
words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
counts = {}
for word in words:
    counts[word] = counts.get(word, 0) + 1
# Or with Counter
from collections import Counter
counts = {k: v for k, v in Counter(words).items()}
print(counts)  # {'apple': 3, 'banana': 2, 'cherry': 1}

# Sum by category
transactions = [
    {"category": "food", "amount": 50},
    {"category": "transport", "amount": 20},
    {"category": "food", "amount": 30},
    {"category": "transport", "amount": 15}
]
totals = defaultdict(int)
for t in transactions:
    totals[t["category"]] += t["amount"]
by_category = {k: v for k, v in totals.items()}
print(by_category)  # {'food': 80, 'transport': 35}
```

## String Processing

```python
# Character frequency
text = "hello world"
freq = {char: text.count(char) for char in set(text)}
print(freq)  # {'h': 1, 'e': 1, 'l': 3, 'o': 2, ...}

# Word positions
sentence = "the quick brown fox jumps over the lazy dog"
words = sentence.split()
positions = {word: i for i, word in enumerate(words)}
print(positions)  # {'the': 6, 'quick': 1, ...} - last occurrence wins

# All positions for each word
positions = defaultdict(list)
for i, word in enumerate(words):
    positions[word].append(i)
word_positions = {k: v for k, v in positions.items()}
print(word_positions["the"])  # [0, 6]

# First letter index
words = ["apple", "banana", "apricot", "cherry"]
first_letter = {word[0]: word for word in words}
print(first_letter)  # {'a': 'apricot', 'b': 'banana', 'c': 'cherry'}
# Last word starting with each letter wins
```

## Filtering with Functions

```python
# Filter with custom function
def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

primes = {x: x**2 for x in range(20) if is_prime(x)}
print(primes)  # {2: 4, 3: 9, 5: 25, 7: 49, 11: 121, 13: 169, 17: 289, 19: 361}

# Filter with lambda
data = {"a": 1, "b": 2, "c": 3, "d": 4}
filtered = {
    k: v for k, v in data.items()
    if (lambda x: x > 2)(v)
}
print(filtered)  # {'c': 3, 'd': 4}

# Transform with function
def process(value):
    return value * 2 if value > 2 else value

data = {"a": 1, "b": 2, "c": 3, "d": 4}
processed = {k: process(v) for k, v in data.items()}
print(processed)  # {'a': 1, 'b': 2, 'c': 6, 'd': 8}
```

## Performance Patterns

```python
import time

# Large dataset
data = {f"key_{i}": i for i in range(100000)}

# Method 1: Comprehension
start = time.time()
filtered1 = {k: v for k, v in data.items() if v % 2 == 0}
comp_time = time.time() - start

# Method 2: Loop with dict()
start = time.time()
filtered2 = {}
for k, v in data.items():
    if v % 2 == 0:
        filtered2[k] = v
loop_time = time.time() - start

# Method 3: filter() + dict()
start = time.time()
filtered3 = dict(filter(lambda item: item[1] % 2 == 0, data.items()))
filter_time = time.time() - start

print(f"Comprehension: {comp_time:.4f}s")
print(f"Loop:          {loop_time:.4f}s")
print(f"filter():      {filter_time:.4f}s")
# Comprehension is usually fastest
```

## Complex Transformations

```python
# Normalize data
data = {
    "alice": {"score": 100, "attempts": 2},
    "bob": {"score": 85, "attempts": 3},
    "charlie": {"score": 90, "attempts": 1}
}

normalized = {
    name: {
        "score": info["score"],
        "attempts": info["attempts"],
        "avg": info["score"] / info["attempts"]
    }
    for name, info in data.items()
}
print(normalized["alice"])  # {'score': 100, 'attempts': 2, 'avg': 50.0}

# Extract and transform
urls = [
    "https://example.com/page1",
    "https://example.com/page2",
    "https://test.com/page3"
]
domains = {
    url: url.split("//")[1].split("/")[0]
    for url in urls
}
print(domains)

# Multi-step transformation
raw_data = [
    "alice:100",
    "bob:85",
    "charlie:90"
]
parsed = {
    parts[0]: int(parts[1])
    for line in raw_data
    for parts in [line.split(":")]
}
print(parsed)  # {'alice': 100, 'bob': 85, 'charlie': 90}
```

## Common Patterns

```python
# Pattern 1: Index by property
users = [
    {"id": 1, "name": "Alice"},
    {"id": 2, "name": "Bob"},
    {"id": 3, "name": "Charlie"}
]
by_id = {user["id"]: user for user in users}
print(by_id[2])  # {'id': 2, 'name': 'Bob'}

# Pattern 2: Remove keys
original = {"a": 1, "b": 2, "c": 3, "d": 4}
exclude = ["b", "d"]
filtered = {k: v for k, v in original.items() if k not in exclude}
print(filtered)  # {'a': 1, 'c': 3}

# Pattern 3: Rename keys
original = {"first_name": "Alice", "last_name": "Smith"}
mapping = {"first_name": "firstName", "last_name": "lastName"}
renamed = {mapping.get(k, k): v for k, v in original.items()}
print(renamed)  # {'firstName': 'Alice', 'lastName': 'Smith'}

# Pattern 4: Type conversion
data = {"a": "1", "b": "2", "c": "3"}
converted = {k: int(v) for k, v in data.items()}
print(converted)  # {'a': 1, 'b': 2, 'c': 3}

# Pattern 5: Default values
keys = ["a", "b", "c"]
defaults = {key: 0 for key in keys}
print(defaults)  # {'a': 0, 'b': 0, 'c': 0}
```

## Readability Guidelines

```python
# ❌ BAD: Too complex, hard to read
result = {k: v * 2 if v > 5 else v / 2 if v > 2 else v for k, v in data.items() if k.startswith('a') and v % 2 == 0}

# ✅ GOOD: Break into steps
data = {"apple": 10, "apricot": 3, "banana": 6}

# Step 1: Filter
filtered = {k: v for k, v in data.items() if k.startswith('a') and v % 2 == 0}

# Step 2: Transform
result = {}
for k, v in filtered.items():
    if v > 5:
        result[k] = v * 2
    elif v > 2:
        result[k] = v / 2
    else:
        result[k] = v

# ✅ GOOD: Use helper function
def transform_value(v):
    if v > 5:
        return v * 2
    elif v > 2:
        return v / 2
    return v

result = {
    k: transform_value(v)
    for k, v in data.items()
    if k.startswith('a') and v % 2 == 0
}

# ✅ GOOD: Multi-line comprehension
result = {
    k: v * 2
    for k, v in data.items()
    if k.startswith('a')
    if v % 2 == 0
}
```

## Summary

**Common Patterns:**

| Pattern | Example | Use Case |
|---------|---------|----------|
| Transform values | `{k: f(v) for k,v in d.items()}` | Apply function |
| Filter | `{k: v for k,v in d.items() if cond}` | Select items |
| Swap | `{v: k for k,v in d.items()}` | Invert dict |
| Nested | `{k: {k2: v2 for...} for k,v in...}` | Create structure |
| Flatten | `{k: v for d in dicts for k,v in d.items()}` | Merge dicts |
| Group | Use `defaultdict` + comprehension | Aggregate data |

**Best Practices:**

- ✅ Use for simple transformations
- ✅ Keep comprehensions readable (< 80 chars)
- ✅ Break complex logic into steps
- ✅ Use helper functions for complex transforms
- ✅ Comment non-obvious comprehensions
- ❌ Don't nest too deeply (max 2 levels)
- ❌ Don't sacrifice readability for brevity
- ❌ Don't use for side effects

**Remember:** If comprehension is hard to read, use a regular loop!

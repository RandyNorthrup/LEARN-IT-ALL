---
id: "128-defaultdict-counter"
title: "defaultdict and Counter Collections"
chapterId: ch9-dictionaries
order: 9
duration: 30
objectives:
  - Master defaultdict for auto-initialization
  - Learn Counter for frequency counting
  - Understand when to use each collection
  - Apply to real-world problems
---

# defaultdict and Counter Collections

The `collections` module provides specialized dictionary subclasses for common patterns.

## defaultdict Basics

```python
from collections import defaultdict

# Problem with regular dict
regular = {}
try:
    regular["missing"] += 1
except KeyError:
    print("KeyError: must initialize first")

# Solution 1: Check before access
counts = {}
key = "apple"
if key not in counts:
    counts[key] = 0
counts[key] += 1

# Solution 2: Use get() with default
counts = {}
counts[key] = counts.get(key, 0) + 1

# Solution 3: defaultdict (cleanest!)
counts = defaultdict(int)  # int() returns 0
counts["apple"] += 1  # No KeyError!
print(counts["apple"])  # 1

# Missing keys automatically get default value
print(counts["banana"])  # 0 (auto-created)
print(counts)  # defaultdict(<class 'int'>, {'apple': 1, 'banana': 0})
```

## defaultdict with Different Types

```python
from collections import defaultdict

# Default: int (returns 0)
int_dict = defaultdict(int)
int_dict["count"] += 1
print(int_dict["count"])  # 1

# Default: list (returns [])
list_dict = defaultdict(list)
list_dict["fruits"].append("apple")
list_dict["fruits"].append("banana")
print(list_dict["fruits"])  # ['apple', 'banana']

# Default: set (returns set())
set_dict = defaultdict(set)
set_dict["tags"].add("python")
set_dict["tags"].add("tutorial")
print(set_dict["tags"])  # {'python', 'tutorial'}

# Default: dict (returns {})
dict_dict = defaultdict(dict)
dict_dict["user"]["name"] = "Alice"
dict_dict["user"]["age"] = 30
print(dict_dict["user"])  # {'name': 'Alice', 'age': 30}

# Default: lambda
default_value = defaultdict(lambda: "N/A")
print(default_value["missing"])  # N/A

# Default: custom function
def default_list_with_zero():
    return [0]

custom = defaultdict(default_list_with_zero)
custom["data"].append(1)
print(custom["data"])  # [0, 1]
```

## Counting with defaultdict

```python
from collections import defaultdict

# Count word occurrences
text = "the quick brown fox jumps over the lazy dog"
words = text.split()

word_count = defaultdict(int)
for word in words:
    word_count[word] += 1

print(dict(word_count))
# {'the': 2, 'quick': 1, 'brown': 1, ...}

# Count letter frequency
text = "hello world"
letter_count = defaultdict(int)
for char in text:
    if char.isalpha():
        letter_count[char] += 1

print(dict(letter_count))
# {'h': 1, 'e': 1, 'l': 3, 'o': 2, 'w': 1, 'r': 1, 'd': 1}

# Count by property
students = [
    {"name": "Alice", "grade": "A"},
    {"name": "Bob", "grade": "B"},
    {"name": "Charlie", "grade": "A"},
    {"name": "David", "grade": "B"}
]

grade_count = defaultdict(int)
for student in students:
    grade_count[student["grade"]] += 1

print(dict(grade_count))  # {'A': 2, 'B': 2}
```

## Grouping with defaultdict

```python
from collections import defaultdict

# Group by property
students = [
    {"name": "Alice", "grade": "A"},
    {"name": "Bob", "grade": "B"},
    {"name": "Charlie", "grade": "A"},
    {"name": "David", "grade": "B"}
]

by_grade = defaultdict(list)
for student in students:
    by_grade[student["grade"]].append(student["name"])

print(dict(by_grade))
# {'A': ['Alice', 'Charlie'], 'B': ['Bob', 'David']}

# Group transactions by category
transactions = [
    {"category": "food", "amount": 50},
    {"category": "transport", "amount": 20},
    {"category": "food", "amount": 30},
    {"category": "transport", "amount": 15}
]

by_category = defaultdict(list)
for t in transactions:
    by_category[t["category"]].append(t["amount"])

print(dict(by_category))
# {'food': [50, 30], 'transport': [20, 15]}

# Group with multiple criteria
people = [
    {"name": "Alice", "age": 30, "city": "NYC"},
    {"name": "Bob", "age": 25, "city": "LA"},
    {"name": "Charlie", "age": 30, "city": "NYC"},
    {"name": "David", "age": 25, "city": "LA"}
]

by_age_city = defaultdict(list)
for person in people:
    key = (person["age"], person["city"])
    by_age_city[key].append(person["name"])

print(dict(by_age_city))
# {(30, 'NYC'): ['Alice', 'Charlie'], (25, 'LA'): ['Bob', 'David']}
```

## Nested defaultdict

```python
from collections import defaultdict

# Two-level defaultdict
nested = defaultdict(lambda: defaultdict(int))

data = [
    ("Alice", "Math", 95),
    ("Alice", "Science", 90),
    ("Bob", "Math", 85),
    ("Bob", "Science", 88)
]

for name, subject, score in data:
    nested[name][subject] = score

print(dict(nested["Alice"]))  # {'Math': 95, 'Science': 90}

# Auto-create nested structure
nested["Charlie"]["English"] += 10
print(nested["Charlie"])  # defaultdict(<class 'int'>, {'English': 10})

# Three-level nesting
tree = lambda: defaultdict(tree)
multi_level = tree()
multi_level["a"]["b"]["c"] = 1
multi_level["a"]["b"]["d"] = 2
print(dict(multi_level["a"]["b"]))  # {'c': 1, 'd': 2}

# Build graph
graph = defaultdict(list)
edges = [("A", "B"), ("A", "C"), ("B", "D"), ("C", "D")]
for src, dst in edges:
    graph[src].append(dst)

print(dict(graph))
# {'A': ['B', 'C'], 'B': ['D'], 'C': ['D']}
```

## Counter Basics

```python
from collections import Counter

# Count elements in iterable
fruits = ["apple", "banana", "apple", "cherry", "banana", "apple"]
counts = Counter(fruits)
print(counts)
# Counter({'apple': 3, 'banana': 2, 'cherry': 1})

# Access counts
print(counts["apple"])   # 3
print(counts["grape"])   # 0 (returns 0 for missing)

# Create from string
text = "hello world"
char_count = Counter(text)
print(char_count)
# Counter({'l': 3, 'o': 2, 'h': 1, ...})

# Create from dict
counts = Counter({"a": 3, "b": 2, "c": 1})
print(counts)  # Counter({'a': 3, 'b': 2, 'c': 1})

# Create from keyword arguments
counts = Counter(apple=3, banana=2, cherry=1)
print(counts)  # Counter({'apple': 3, 'banana': 2, 'cherry': 1})
```

## Counter Methods

```python
from collections import Counter

counts = Counter(["a", "b", "a", "c", "b", "a"])

# most_common(n) - Get top N elements
print(counts.most_common())     # [('a', 3), ('b', 2), ('c', 1)]
print(counts.most_common(2))    # [('a', 3), ('b', 2)]

# elements() - Return iterator repeating each element
counts = Counter(a=3, b=2, c=1)
print(list(counts.elements()))
# ['a', 'a', 'a', 'b', 'b', 'c']

# total() - Sum of all counts (Python 3.10+)
# print(counts.total())  # 6

# Or compute manually
print(sum(counts.values()))  # 6

# update() - Add counts
more = Counter(["a", "b", "d"])
counts.update(more)
print(counts)  # Counter({'a': 4, 'b': 3, 'c': 1, 'd': 1})

# subtract() - Subtract counts
counts.subtract({"a": 1, "b": 1})
print(counts)  # Counter({'a': 3, 'b': 2, 'c': 1, 'd': 1})

# Can have zero or negative counts
counts.subtract({"a": 5})
print(counts["a"])  # -2
```

## Counter Arithmetic

```python
from collections import Counter

c1 = Counter(a=3, b=2, c=1)
c2 = Counter(a=1, b=2, d=3)

# Addition - add counts
print(c1 + c2)
# Counter({'a': 4, 'b': 4, 'd': 3, 'c': 1})

# Subtraction - subtract (keep only positive)
print(c1 - c2)
# Counter({'a': 2, 'c': 1})

# Intersection - minimum counts
print(c1 & c2)
# Counter({'b': 2, 'a': 1})

# Union - maximum counts
print(c1 | c2)
# Counter({'d': 3, 'a': 3, 'b': 2, 'c': 1})

# Unary operations
c = Counter(a=2, b=-1, c=0)
print(+c)  # Counter({'a': 2}) - keep positive only
print(-c)  # Counter({'b': 1}) - keep negative, negate
```

## Practical Examples

```python
from collections import Counter, defaultdict

# Example 1: Find most common words
text = """
Python is a great programming language.
Python is easy to learn and Python is powerful.
"""
words = text.lower().split()
word_freq = Counter(words)
print(word_freq.most_common(3))
# [('python', 3), ('is', 3), ('a', 1)]

# Example 2: Anagram detection
def are_anagrams(word1, word2):
    return Counter(word1) == Counter(word2)

print(are_anagrams("listen", "silent"))  # True
print(are_anagrams("hello", "world"))    # False

# Example 3: Find missing letters
alphabet = "abcdefghijklmnopqrstuvwxyz"
text = "the quick brown fox jumps over the lazy dog"
missing = Counter(alphabet) - Counter(text.lower())
print("".join(missing.elements()))  # (pangram has all letters)

# Example 4: Group anagrams
words = ["eat", "tea", "tan", "ate", "nat", "bat"]
anagrams = defaultdict(list)
for word in words:
    key = "".join(sorted(word))
    anagrams[key].append(word)
print(dict(anagrams))
# {'aet': ['eat', 'tea', 'ate'], 'ant': ['tan', 'nat'], 'abt': ['bat']}

# Example 5: Find duplicates
numbers = [1, 2, 3, 2, 4, 3, 5, 3]
counts = Counter(numbers)
duplicates = [num for num, count in counts.items() if count > 1]
print(duplicates)  # [2, 3]

# Example 6: Inventory management
inventory = Counter(apple=10, banana=5, cherry=8)
sold = Counter(apple=3, banana=2, cherry=1)
inventory.subtract(sold)
print(inventory)  # Counter({'apple': 7, cherry': 7, 'banana': 3})

# Check stock
for item, count in inventory.items():
    if count < 5:
        print(f"Low stock: {item}")
```

## defaultdict vs Counter

```python
from collections import defaultdict, Counter

# Use defaultdict when:
# - Need to group/accumulate data
# - Want automatic initialization
# - Need complex default values

# Example: Group by category
data = [("fruit", "apple"), ("veggie", "carrot"), ("fruit", "banana")]
groups = defaultdict(list)
for category, item in data:
    groups[category].append(item)

# Use Counter when:
# - Counting occurrences
# - Need most_common()
# - Want arithmetic operations

# Example: Count occurrences
items = ["apple", "banana", "apple", "cherry"]
counts = Counter(items)
print(counts.most_common(1))  # [('apple', 2)]

# Both can count, but Counter is cleaner
# defaultdict:
word_count_dd = defaultdict(int)
for word in ["a", "b", "a"]:
    word_count_dd[word] += 1

# Counter:
word_count_c = Counter(["a", "b", "a"])

# Counter has more counting-specific features
```

## Converting Back to Regular Dict

```python
from collections import defaultdict, Counter

# defaultdict to dict
dd = defaultdict(int, {"a": 1, "b": 2})
regular = dict(dd)
print(type(regular))  # <class 'dict'>

# Now missing keys raise KeyError
try:
    print(regular["missing"])
except KeyError:
    print("KeyError in regular dict")

# Counter to dict
counter = Counter(["a", "b", "a"])
regular = dict(counter)
print(regular)  # {'a': 2, 'b': 1}

# Missing keys raise KeyError (not return 0)
try:
    print(regular["missing"])
except KeyError:
    print("KeyError in regular dict")
```

## Performance Comparison

```python
import time
from collections import defaultdict, Counter

# Large dataset
data = ["apple", "banana"] * 5000 + ["cherry"] * 3000

# Method 1: Regular dict
start = time.time()
counts1 = {}
for item in data:
    counts1[item] = counts1.get(item, 0) + 1
method1_time = time.time() - start

# Method 2: defaultdict
start = time.time()
counts2 = defaultdict(int)
for item in data:
    counts2[item] += 1
method2_time = time.time() - start

# Method 3: Counter
start = time.time()
counts3 = Counter(data)
method3_time = time.time() - start

print(f"Regular dict:  {method1_time:.6f}s")
print(f"defaultdict:   {method2_time:.6f}s")
print(f"Counter:       {method3_time:.6f}s")
# Counter is usually fastest for counting
```

## Common Patterns

```python
from collections import defaultdict, Counter

# Pattern 1: Inverted index
documents = [
    (0, "python programming"),
    (1, "java programming"),
    (2, "python tutorial")
]

index = defaultdict(list)
for doc_id, text in documents:
    for word in text.split():
        index[word].append(doc_id)

print(index["python"])  # [0, 2]

# Pattern 2: Adjacency list (graph)
edges = [("A", "B"), ("A", "C"), ("B", "C")]
graph = defaultdict(list)
for src, dst in edges:
    graph[src].append(dst)

# Pattern 3: Count unique
data = [1, 2, 2, 3, 3, 3]
unique_count = len(Counter(data))
print(unique_count)  # 3

# Pattern 4: Top K frequent
items = ["a", "b", "a", "c", "b", "a"]
counter = Counter(items)
top_k = counter.most_common(2)
print(top_k)  # [('a', 3), ('b', 2)]

# Pattern 5: Multi-level grouping
data = [
    ("2024", "Jan", 100),
    ("2024", "Feb", 150),
    ("2024", "Jan", 200)
]
nested = defaultdict(lambda: defaultdict(list))
for year, month, value in data:
    nested[year][month].append(value)
```

## Summary

**defaultdict:**

| Feature | Description |
|---------|-------------|
| Purpose | Auto-initialize missing keys |
| Default types | `int`, `list`, `set`, `dict`, custom |
| Best for | Grouping, accumulating, building |
| Methods | Same as dict |

**Counter:**

| Feature | Description |
|---------|-------------|
| Purpose | Count occurrences |
| Specialty | `most_common()`, arithmetic |
| Best for | Frequency counting, statistics |
| Returns | 0 for missing keys (not KeyError) |

**When to Use:**

- ✅ Use **defaultdict** for grouping/accumulating
- ✅ Use **Counter** for counting/frequency
- ✅ Use **regular dict** when no default needed
- ✅ Convert back to dict to prevent auto-creation

**Best Practices:**

- ✅ Use `defaultdict(int)` for counting
- ✅ Use `defaultdict(list)` for grouping
- ✅ Use `Counter` with `most_common()` for top-K
- ✅ Use Counter arithmetic for set operations on counts
- ❌ Don't use `defaultdict` if you need KeyError
- ❌ Don't forget Counter returns 0 for missing keys

**Remember:** Choose the right tool - defaultdict for building, Counter for counting!

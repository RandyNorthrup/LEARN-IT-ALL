---
id: "134-set-introduction"
title: "Introduction to Sets"
chapterId: ch10-sets
order: 1
duration: 25
objectives:
  - Understand what sets are and why they exist
  - Learn set properties and characteristics
  - Create sets using different methods
  - Understand hashability requirements
---

# Introduction to Sets

Understanding Python sets: unordered collections of unique elements optimized for fast membership testing and mathematical operations.

## What Are Sets?

```python
# Set: unordered collection of unique elements
numbers = {1, 2, 3, 4, 5}
print(numbers)  # {1, 2, 3, 4, 5} (order may vary)
print(type(numbers))  # <class 'set'>

# Automatic duplicate removal
duplicates = {1, 2, 2, 3, 3, 3, 4, 4, 4, 4}
print(duplicates)  # {1, 2, 3, 4}

# Empty set (IMPORTANT: {} creates dict, not set!)
empty_set = set()
empty_dict = {}
print(type(empty_set))   # <class 'set'>
print(type(empty_dict))  # <class 'dict'>

# Sets are mutable (can add/remove elements)
fruits = {"apple", "banana"}
fruits.add("cherry")
print(fruits)  # {"apple", "banana", "cherry"}

# But elements must be immutable (hashable)
valid = {1, "hello", 3.14, (1, 2), True, None}
# invalid = {[1, 2], {3, 4}}  # TypeError: unhashable type
```

## Key Set Properties

```python
# 1. UNIQUE ELEMENTS - no duplicates allowed
numbers = {1, 1, 2, 2, 3, 3}
print(numbers)  # {1, 2, 3}
print(len(numbers))  # 3, not 6

# 2. UNORDERED - no indexing or positional access
colors = {"red", "green", "blue"}
# print(colors[0])  # TypeError: 'set' object is not subscriptable

# Order may vary between runs
for i in range(3):
    s = {1, 2, 3, 4, 5}
    print(list(s))  # Order unpredictable

# 3. MUTABLE - can add/remove elements
s = {1, 2, 3}
s.add(4)
s.remove(1)
print(s)  # {2, 3, 4}

# 4. ELEMENTS MUST BE HASHABLE (immutable)
# Valid: numbers, strings, tuples, frozensets
# Invalid: lists, dicts, sets

# 5. FAST MEMBERSHIP TESTING - O(1) average
large_set = set(range(1_000_000))
print(999_999 in large_set)  # Very fast, even with 1M elements
```

## Why Use Sets?

```python
# Use Case 1: Remove duplicates
numbers = [1, 2, 2, 3, 3, 3, 4, 5, 5]
unique = set(numbers)
print(unique)  # {1, 2, 3, 4, 5}
back_to_list = list(unique)
print(back_to_list)

# Use Case 2: Fast membership testing
# List approach - O(n)
users_list = ["alice", "bob", "charlie"] * 1000
print("alice" in users_list)  # Slow for large lists

# Set approach - O(1)
users_set = {"alice", "bob", "charlie"}
print("alice" in users_set)  # Very fast regardless of size

# Use Case 3: Mathematical set operations
team_a = {"alice", "bob", "charlie"}
team_b = {"bob", "david", "eve"}

# Who's on both teams?
both = team_a & team_b
print(both)  # {"bob"}

# Who's on at least one team?
any_team = team_a | team_b
print(any_team)  # {"alice", "bob", "charlie", "david", "eve"}

# Use Case 4: Finding unique items across collections
list1 = [1, 2, 3, 4, 5]
list2 = [4, 5, 6, 7, 8]
list3 = [1, 5, 9, 10]

# All unique numbers
all_numbers = set(list1) | set(list2) | set(list3)
print(all_numbers)  # {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}

# Numbers in all three lists
common = set(list1) & set(list2) & set(list3)
print(common)  # {5}
```

## Creating Sets

```python
# Method 1: Curly braces (most common)
fruits = {"apple", "banana", "cherry"}
print(fruits)

# Method 2: set() constructor from iterable
from_list = set([1, 2, 3, 4, 5])
from_tuple = set((1, 2, 3))
from_string = set("hello")  # {'h', 'e', 'l', 'o'}
from_range = set(range(5))  # {0, 1, 2, 3, 4}
print(from_string)

# Method 3: Set comprehension
squares = {x**2 for x in range(10)}
print(squares)  # {0, 1, 4, 9, 16, 25, 36, 49, 64, 81}

evens = {x for x in range(20) if x % 2 == 0}
print(evens)  # {0, 2, 4, 6, 8, 10, 12, 14, 16, 18}

# Method 4: From dict keys (automatic deduplication)
data = {"a": 1, "b": 2, "c": 3}
keys_set = set(data.keys())
values_set = set(data.values())
print(keys_set)    # {"a", "b", "c"}
print(values_set)  # {1, 2, 3}

# Method 5: Copy existing set
original = {1, 2, 3}
copy = set(original)  # or original.copy()
print(copy)  # {1, 2, 3}

# Empty set - MUST use set()
empty = set()  # Correct
# empty = {}   # Wrong! This creates empty dict
```

## Valid Set Elements (Hashable Types)

```python
# ✅ IMMUTABLE (HASHABLE) - Can be in sets

# Numbers
numbers = {1, 2, 3, -4, 0, 3.14, 2.5}
print(numbers)

# Strings
words = {"hello", "world", "python"}
print(words)

# Tuples (if they contain only immutable elements)
coordinates = {(0, 0), (1, 1), (2, 2)}
print(coordinates)

# Booleans
flags = {True, False}
print(flags)  # {False, True}

# None
values = {1, 2, None, "test"}
print(values)

# frozenset (immutable set)
frozen = frozenset([1, 2, 3])
nested = {frozen, 4, 5}
print(nested)  # {frozenset({1, 2, 3}), 4, 5}

# Mixed immutable types
mixed = {1, "hello", 3.14, (1, 2), True, None}
print(mixed)
```

## Invalid Set Elements (Unhashable Types)

```python
# ❌ MUTABLE (UNHASHABLE) - Cannot be in sets

# Lists - mutable
try:
    invalid = {[1, 2], [3, 4]}
except TypeError as e:
    print(f"Error: {e}")  # unhashable type: 'list'

# Dictionaries - mutable
try:
    invalid = {{"a": 1}, {"b": 2}}
except TypeError as e:
    print(f"Error: {e}")  # unhashable type: 'dict'

# Sets - mutable
try:
    invalid = {{1, 2}, {3, 4}}
except TypeError as e:
    print(f"Error: {e}")  # unhashable type: 'set'

# Tuples containing mutable elements
try:
    invalid = {(1, [2, 3]), (4, [5, 6])}
except TypeError as e:
    print(f"Error: {e}")  # unhashable type: 'list'

# ✅ WORKAROUNDS

# Use tuple instead of list
valid = {(1, 2), (3, 4)}

# Use frozenset instead of set
valid = {frozenset([1, 2]), frozenset([3, 4])}

# Use tuple of tuples instead of list of lists
valid = {((1, 2), (3, 4)), ((5, 6), (7, 8))}
```

## Boolean and Number Quirks

```python
# True equals 1, False equals 0 (only one kept)
quirky = {True, 1, False, 0, 2}
print(quirky)  # {False, True, 2} or {0, 1, 2}

# First occurrence determines which is kept
set1 = {True, 1}
print(set1)  # {True}

set2 = {1, True}
print(set2)  # {1}

set3 = {False, 0}
print(set3)  # {False}

set4 = {0, False}
print(set4)  # {0}

# This is because True == 1 and False == 0
print(True == 1)   # True
print(False == 0)  # True
print(hash(True) == hash(1))   # True
print(hash(False) == hash(0))  # True

# Float and int with same value
numbers = {1, 1.0, 2, 2.0}
print(numbers)  # {1, 2} (keeps first of each value)
```

## Set Size and Membership

```python
# Length
fruits = {"apple", "banana", "cherry"}
print(len(fruits))  # 3

# Empty check
if fruits:
    print("Set has elements")
else:
    print("Set is empty")

# Membership testing (O(1) average - very fast!)
print("apple" in fruits)      # True
print("grape" in fruits)      # False
print("banana" not in fruits) # False

# Count occurrences (always 0 or 1 due to uniqueness)
count = 1 if "apple" in fruits else 0
print(count)  # 1

# Membership is case-sensitive
names = {"Alice", "Bob", "Charlie"}
print("alice" in names)  # False
print("Alice" in names)  # True
```

## Performance Characteristics

```python
import time

# Set vs List membership testing
# Set: O(1) average
# List: O(n)

large_list = list(range(100_000))
large_set = set(range(100_000))
search_value = 99_999

# List search (slow)
start = time.time()
result = search_value in large_list
list_time = time.time() - start

# Set search (fast)
start = time.time()
result = search_value in large_set
set_time = time.time() - start

print(f"List search: {list_time:.6f}s")
print(f"Set search: {set_time:.6f}s")
print(f"Set is {list_time/set_time:.0f}x faster")

# Time complexity summary:
# Operation      Set      List
# -----------    ----     ----
# x in s         O(1)     O(n)
# s.add(x)       O(1)     O(1)*
# s.remove(x)    O(1)     O(n)
# len(s)         O(1)     O(1)
# *append only
```

## Common Patterns

```python
# Pattern 1: Remove duplicates while preserving some order
def remove_duplicates_ordered(items):
    """Remove duplicates, keep first occurrence order"""
    seen = set()
    result = []
    for item in items:
        if item not in seen:
            seen.add(item)
            result.append(item)
    return result

numbers = [1, 2, 2, 3, 1, 4, 3, 5]
unique = remove_duplicates_ordered(numbers)
print(unique)  # [1, 2, 3, 4, 5]

# Pattern 2: Check for duplicates
def has_duplicates(items):
    """Check if list contains duplicates"""
    return len(items) != len(set(items))

list1 = [1, 2, 3, 4, 5]
list2 = [1, 2, 2, 3, 4]
print(has_duplicates(list1))  # False
print(has_duplicates(list2))  # True

# Pattern 3: Count unique items
def count_unique(items):
    """Count unique items"""
    return len(set(items))

words = ["apple", "banana", "apple", "cherry", "banana"]
print(count_unique(words))  # 3

# Pattern 4: Get duplicates
def get_duplicates(items):
    """Return set of duplicate items"""
    seen = set()
    duplicates = set()
    for item in items:
        if item in seen:
            duplicates.add(item)
        else:
            seen.add(item)
    return duplicates

numbers = [1, 2, 2, 3, 3, 3, 4, 5, 5]
dupes = get_duplicates(numbers)
print(dupes)  # {2, 3, 5}

# Pattern 5: Unique pairs
def unique_pairs(items):
    """Generate all unique pairs"""
    pairs = set()
    for i, item1 in enumerate(items):
        for item2 in items[i+1:]:
            pairs.add((min(item1, item2), max(item1, item2)))
    return pairs

numbers = [1, 2, 3]
pairs = unique_pairs(numbers)
print(pairs)  # {(1, 2), (1, 3), (2, 3)}
```

## Set vs Other Data Structures

```python
# List: ordered, mutable, allows duplicates, indexed
list_data = [1, 2, 2, 3]
print(list_data[0])  # 1 (indexed)

# Tuple: ordered, immutable, allows duplicates, indexed
tuple_data = (1, 2, 2, 3)
print(tuple_data[0])  # 1 (indexed)

# Set: unordered, mutable, no duplicates, not indexed
set_data = {1, 2, 2, 3}
print(len(set_data))  # 3 (no duplicates)
# print(set_data[0])  # Error! (not indexed)

# Dict: ordered (3.7+), mutable, unique keys, key-value pairs
dict_data = {"a": 1, "b": 2}
print(dict_data["a"])  # 1 (key access)

# When to use what?
# - List: need order and/or duplicates
# - Tuple: need immutable list
# - Set: need uniqueness and/or fast membership testing
# - Dict: need key-value associations
```

## Summary

**Set Definition:**
- Unordered collection of unique elements
- Mutable (can add/remove)
- Elements must be immutable (hashable)
- No duplicates allowed

**Creation Methods:**
- `{1, 2, 3}` - literal
- `set([1, 2, 3])` - from iterable
- `{x for x in range(5)}` - comprehension
- `set()` - empty set

**Key Properties:**
- ✅ Automatic duplicate removal
- ✅ Fast O(1) membership testing
- ✅ Mathematical operations (union, intersection, etc.)
- ❌ No indexing or slicing
- ❌ Unordered (no guaranteed order)

**Valid Elements:**
- Numbers, strings, tuples, frozensets, None, booleans

**Invalid Elements:**
- Lists, dicts, sets (mutable types)

**Use Sets When:**
- Need unique elements only
- Fast membership testing required
- Mathematical set operations needed
- Removing duplicates from sequences

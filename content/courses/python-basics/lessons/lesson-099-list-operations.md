---
id: "113-list-operations"
title: "List Operations and Operators"
chapterId: ch8-lists
order: 5
duration: 20
objectives:
  - Master list arithmetic operators
  - Understand list comparison operators
  - Learn membership testing
  - Use list operations efficiently
---

# List Operations and Operators

Python provides several built-in operators for working with lists efficiently.

## Concatenation (+)

```python
# Combine lists
list1 = [1, 2, 3]
list2 = [4, 5, 6]
combined = list1 + list2
print(combined)  # [1, 2, 3, 4, 5, 6]

# Original lists unchanged
print(list1)  # [1, 2, 3]
print(list2)  # [4, 5, 6]

# Multiple concatenation
list1 = [1]
list2 = [2]
list3 = [3]
result = list1 + list2 + list3
print(result)  # [1, 2, 3]

# Different types
numbers = [1, 2]
strings = ["a", "b"]
mixed = numbers + strings
print(mixed)  # [1, 2, "a", "b"]

# Empty list
numbers = [1, 2, 3]
result = numbers + []
print(result)  # [1, 2, 3]

# Can't concatenate list with non-list
try:
    result = [1, 2] + 3  # TypeError!
except TypeError as e:
    print(f"Error: {e}")
```

## Repetition (*)

```python
# Repeat list
numbers = [1, 2, 3]
repeated = numbers * 3
print(repeated)  # [1, 2, 3, 1, 2, 3, 1, 2, 3]

# Repeat pattern
pattern = [0, 1] * 5
print(pattern)  # [0, 1, 0, 1, 0, 1, 0, 1, 0, 1]

# Zero or negative repetitions
numbers = [1, 2, 3]
print(numbers * 0)   # []
print(numbers * -1)  # []

# Order doesn't matter
numbers = [1, 2]
print(3 * numbers)  # [1, 2, 1, 2, 1, 2]
print(numbers * 3)  # [1, 2, 1, 2, 1, 2]

# ⚠️ WARNING: Shallow copy!
inner = [0]
matrix = [inner] * 3
print(matrix)  # [[0], [0], [0]]

# All reference same list!
matrix[0][0] = 1
print(matrix)  # [[1], [1], [1]] - all changed!

# Correct: use comprehension
matrix = [[0] for _ in range(3)]
matrix[0][0] = 1
print(matrix)  # [[1], [0], [0]] - only first changed
```

## Membership (in, not in)

```python
# Check if element exists
fruits = ["apple", "banana", "cherry"]
print("apple" in fruits)     # True
print("grape" in fruits)     # False
print("grape" not in fruits) # True

# Works with any type
numbers = [1, 2, 3, 4, 5]
print(3 in numbers)     # True
print(10 in numbers)    # False
print(10 not in numbers) # True

# Case sensitive for strings
names = ["Alice", "Bob"]
print("alice" in names)  # False
print("Alice" in names)  # True

# Checks value, not identity
list1 = [1, 2, [3, 4]]
list2 = [3, 4]
print(list2 in list1)  # True - checks value equality

# Doesn't check nested elements
numbers = [[1, 2], [3, 4]]
print(1 in numbers)  # False - 1 is not top-level
print([1, 2] in numbers)  # True

# Performance: O(n) - linear search
import time

small = list(range(100))
large = list(range(100000))

# Check last element
start = time.time()
result = 99 in small
small_time = time.time() - start

start = time.time()
result = 99999 in large
large_time = time.time() - start

print(f"Small list: {small_time:.10f}s")
print(f"Large list: {large_time:.10f}s")
# Larger list takes longer - O(n)
```

## Equality (==, !=)

```python
# Lists are equal if same length and elements
list1 = [1, 2, 3]
list2 = [1, 2, 3]
print(list1 == list2)  # True

# Different order = not equal
list1 = [1, 2, 3]
list2 = [3, 2, 1]
print(list1 == list2)  # False

# Different lengths
list1 = [1, 2]
list2 = [1, 2, 3]
print(list1 == list2)  # False

# Different types
list1 = [1, 2, 3]
tuple1 = (1, 2, 3)
print(list1 == tuple1)  # False

# Nested lists
list1 = [[1, 2], [3, 4]]
list2 = [[1, 2], [3, 4]]
print(list1 == list2)  # True

# Not equal
list1 = [1, 2, 3]
list2 = [1, 2, 4]
print(list1 != list2)  # True

# Empty lists
print([] == [])  # True
```

## Identity (is, is not)

```python
# Identity checks if same object
list1 = [1, 2, 3]
list2 = [1, 2, 3]
print(list1 == list2)   # True - same values
print(list1 is list2)   # False - different objects

# Same reference
list1 = [1, 2, 3]
list2 = list1  # Reference, not copy
print(list1 is list2)   # True - same object

# Modifying affects both
list2.append(4)
print(list1)  # [1, 2, 3, 4]

# Check with id()
list1 = [1, 2, 3]
list2 = [1, 2, 3]
print(id(list1) == id(list2))  # False

list2 = list1
print(id(list1) == id(list2))  # True

# is not
empty1 = []
empty2 = []
print(empty1 is not empty2)  # True - different objects
```

## Comparison (<, >, <=, >=)

```python
# Lexicographic comparison (like strings)
print([1, 2, 3] < [1, 2, 4])   # True
print([1, 2, 3] < [1, 3, 0])   # True
print([1, 2] < [1, 2, 3])      # True (shorter < longer if equal prefix)

# Compare element by element
print([2] > [1, 9, 9])  # True - first element decides

# Different lengths
print([1, 2] <= [1, 2])     # True - equal
print([1, 2] <= [1, 2, 3])  # True

# Empty list
print([] < [1])   # True
print([] == [])   # True

# Mixed types can cause errors
try:
    result = [1, 2] < ["a", "b"]
except TypeError as e:
    print(f"Error: {e}")

# Comparison stops at first difference
print([1, 9, 9, 9] < [2])  # True - first element determines

# Use case: sorting lists of lists
data = [[3, 1], [1, 2], [1, 1], [2, 5]]
data.sort()
print(data)  # [[1, 1], [1, 2], [2, 5], [3, 1]]
```

## Length (len())

```python
# Get list length
numbers = [1, 2, 3, 4, 5]
print(len(numbers))  # 5

# Empty list
print(len([]))  # 0

# Nested lists count as single elements
nested = [[1, 2], [3, 4, 5], [6]]
print(len(nested))  # 3 - not 6!

# String in list
words = ["hello", "world"]
print(len(words))         # 2
print(len(words[0]))      # 5

# Use in conditions
numbers = []
if len(numbers) == 0:
    print("Empty")

# More Pythonic
if not numbers:
    print("Empty")

# Check range
index = 10
if 0 <= index < len(numbers):
    print(numbers[index])
```

## Min, Max, Sum

```python
# Min and max
numbers = [3, 1, 4, 1, 5, 9, 2]
print(min(numbers))  # 1
print(max(numbers))  # 9

# Sum
print(sum(numbers))  # 25

# Works with different types
print(min(['c', 'a', 'b']))  # 'a'
print(max(['c', 'a', 'b']))  # 'c'

# Empty list raises error
try:
    min([])
except ValueError as e:
    print(f"Error: {e}")

# Safe min/max with default
def safe_min(lst, default=None):
    return min(lst) if lst else default

print(safe_min([]))      # None
print(safe_min([], 0))   # 0

# Min/max with key
words = ["python", "is", "awesome"]
print(min(words, key=len))  # "is"
print(max(words, key=len))  # "awesome"

# Complex objects
people = [
    {"name": "Alice", "age": 30},
    {"name": "Bob", "age": 25},
    {"name": "Charlie", "age": 35}
]

youngest = min(people, key=lambda x: x["age"])
print(youngest["name"])  # "Bob"

oldest = max(people, key=lambda x: x["age"])
print(oldest["name"])  # "Charlie"

# Sum with start value
numbers = [1, 2, 3, 4, 5]
print(sum(numbers, 10))  # 25 - starts from 10 + sum

# Can't sum non-numbers
try:
    sum(["a", "b"])
except TypeError as e:
    print(f"Error: {e}")
```

## Count and Index

```python
# Count occurrences
numbers = [1, 2, 3, 2, 4, 2]
print(numbers.count(2))  # 3
print(numbers.count(5))  # 0

# Works with any type
fruits = ["apple", "banana", "apple", "cherry"]
print(fruits.count("apple"))  # 2

# Find index
print(fruits.index("banana"))  # 1

# Not found raises error
try:
    fruits.index("grape")
except ValueError:
    print("Not found")

# Index with range
numbers = [1, 2, 3, 2, 4]
# Find second occurrence of 2
first = numbers.index(2)
second = numbers.index(2, first + 1)
print(second)  # 3
```

## Any and All

```python
# any() - True if any element is True
print(any([False, False, True]))   # True
print(any([False, False, False]))  # False
print(any([]))                     # False

# all() - True if all elements are True
print(all([True, True, True]))   # True
print(all([True, False, True]))  # False
print(all([]))                   # True (empty is all True!)

# Check if list has positive numbers
numbers = [1, -2, 3, -4]
has_positive = any(x > 0 for x in numbers)
print(has_positive)  # True

all_positive = all(x > 0 for x in numbers)
print(all_positive)  # False

# Check if all strings are capitalized
words = ["Hello", "World", "Python"]
all_capitalized = all(word[0].isupper() for word in words)
print(all_capitalized)  # True

# Empty string check
strings = ["hello", "", "world"]
all_non_empty = all(strings)
print(all_non_empty)  # False
```

## Enumerate

```python
# Get index and value
fruits = ["apple", "banana", "cherry"]

for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")
# 0: apple
# 1: banana
# 2: cherry

# Start from different number
for index, fruit in enumerate(fruits, start=1):
    print(f"{index}: {fruit}")
# 1: apple
# 2: banana
# 3: cherry

# Create dict from enumeration
fruits_dict = {index: fruit for index, fruit in enumerate(fruits)}
print(fruits_dict)  # {0: 'apple', 1: 'banana', 2: 'cherry'}

# Find indices matching condition
numbers = [1, 5, 3, 8, 2, 9]
large_indices = [i for i, x in enumerate(numbers) if x > 5]
print(large_indices)  # [3, 5]
```

## Zip

```python
# Combine lists
names = ["Alice", "Bob", "Charlie"]
ages = [30, 25, 35]

combined = list(zip(names, ages))
print(combined)  # [('Alice', 30), ('Bob', 25), ('Charlie', 35)]

# Unequal lengths - stops at shortest
list1 = [1, 2, 3]
list2 = ['a', 'b']
print(list(zip(list1, list2)))  # [(1, 'a'), (2, 'b')]

# Three or more lists
list1 = [1, 2, 3]
list2 = ['a', 'b', 'c']
list3 = [10, 20, 30]
print(list(zip(list1, list2, list3)))
# [(1, 'a', 10), (2, 'b', 20), (3, 'c', 30)]

# Unzip with *
pairs = [(1, 'a'), (2, 'b'), (3, 'c')]
numbers, letters = zip(*pairs)
print(numbers)  # (1, 2, 3)
print(letters)  # ('a', 'b', 'c')
```

## Summary

**Operators:**

| Operator | Operation | Returns | Example |
|----------|-----------|---------|---------|
| `+` | Concatenate | New list | `[1] + [2]` → `[1, 2]` |
| `*` | Repeat | New list | `[1] * 3` → `[1, 1, 1]` |
| `in` | Membership | Boolean | `2 in [1,2,3]` → `True` |
| `==` | Equality | Boolean | `[1,2] == [1,2]` → `True` |
| `is` | Identity | Boolean | `lst is lst2` |
| `<, >, <=, >=` | Compare | Boolean | `[1,2] < [1,3]` → `True` |

**Functions:**

| Function | Returns | Example |
|----------|---------|---------|
| `len()` | Integer | `len([1,2,3])` → `3` |
| `min()` | Element | `min([3,1,2])` → `1` |
| `max()` | Element | `max([3,1,2])` → `3` |
| `sum()` | Number | `sum([1,2,3])` → `6` |
| `any()` | Boolean | `any([True, False])` → `True` |
| `all()` | Boolean | `all([True, True])` → `True` |

**Best Practices:**

- ✅ Use `+` for clarity, `extend()` for efficiency
- ✅ Use `in` for membership testing
- ✅ Use `==` for value comparison, `is` for identity
- ✅ Use `any()`/`all()` with generators for conditions
- ❌ Don't use `*` with nested mutable elements
- ❌ Don't confuse `==` (equality) with `is` (identity)

**Remember:** Most operators create new lists - they don't modify originals!

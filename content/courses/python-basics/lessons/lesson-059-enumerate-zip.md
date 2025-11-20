---
id: "94-enumerate-zip"
title: "enumerate() and zip() Functions"
chapterId: ch5-loops
order: 5
duration: 25
objectives:
  - Master enumerate() for indexed iteration
  - Use zip() to combine multiple iterables
  - Understand practical applications
  - Learn advanced enumerate and zip patterns
---

# enumerate() and zip() Functions

Python's `enumerate()` and `zip()` functions make loops more elegant and Pythonic. They're essential tools for working with sequences efficiently.

## enumerate() Basics

```python
# Without enumerate (manual index tracking)
fruits = ["apple", "banana", "cherry"]
index = 0
for fruit in fruits:
    print(f"{index}: {fruit}")
    index += 1

# With enumerate (Pythonic way)
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

# Output (both methods):
# 0: apple
# 1: banana
# 2: cherry
```

## enumerate() with Custom Start

```python
# Start counting from 1 instead of 0
fruits = ["apple", "banana", "cherry", "date"]

for index, fruit in enumerate(fruits, start=1):
    print(f"{index}. {fruit}")

# Output:
# 1. apple
# 2. banana
# 3. cherry
# 4. date

# Start from any number
for index, fruit in enumerate(fruits, start=100):
    print(f"Item #{index}: {fruit}")

# Item #100: apple
# Item #101: banana
# Item #102: cherry
# Item #103: date
```

## enumerate() Returns Tuples

```python
# enumerate() returns (index, value) tuples
fruits = ["apple", "banana", "cherry"]

# See the tuples
enum_fruits = list(enumerate(fruits))
print(enum_fruits)
# [(0, 'apple'), (1, 'banana'), (2, 'cherry')]

# With custom start
enum_fruits_start = list(enumerate(fruits, start=1))
print(enum_fruits_start)
# [(1, 'apple'), (2, 'banana'), (3, 'cherry')]

# Unpacking in the loop
for item in enumerate(fruits):
    print(item)
    # (0, 'apple')
    # (1, 'banana')
    # (2, 'cherry')

# Unpacking directly
for index, fruit in enumerate(fruits):
    print(f"Index: {index}, Fruit: {fruit}")
```

## Practical enumerate() Examples

```python
# Finding positions of specific items
def find_positions(items, target):
    """Find all positions of target in items."""
    positions = []
    for index, item in enumerate(items):
        if item == target:
            positions.append(index)
    return positions

numbers = [1, 2, 3, 2, 4, 2, 5]
print(find_positions(numbers, 2))
# [1, 3, 5]

# Modifying list elements
scores = [85, 90, 78, 92, 88]
print("Original:", scores)

# Add 5 bonus points to each score
for index, score in enumerate(scores):
    scores[index] = score + 5

print("After bonus:", scores)
# After bonus: [90, 95, 83, 97, 93]

# Creating numbered list
def create_numbered_list(items):
    """Create numbered list as string."""
    lines = []
    for index, item in enumerate(items, start=1):
        lines.append(f"{index}. {item}")
    return "\n".join(lines)

tasks = ["Write code", "Test code", "Deploy code"]
print(create_numbered_list(tasks))
# 1. Write code
# 2. Test code
# 3. Deploy code
```

## zip() Basics

```python
# Combine two lists
names = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 35]

for name, age in zip(names, ages):
    print(f"{name} is {age} years old")

# Output:
# Alice is 25 years old
# Bob is 30 years old
# Charlie is 35 years old

# See the tuples
combined = list(zip(names, ages))
print(combined)
# [('Alice', 25), ('Bob', 30), ('Charlie', 35)]
```

## zip() with Multiple Iterables

```python
# Combine three lists
names = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 35]
cities = ["New York", "London", "Tokyo"]

for name, age, city in zip(names, ages, cities):
    print(f"{name}, {age}, lives in {city}")

# Output:
# Alice, 25, lives in New York
# Bob, 30, lives in London
# Charlie, 35, lives in Tokyo

# Combine four or more
names = ["Alice", "Bob"]
ages = [25, 30]
cities = ["NYC", "London"]
jobs = ["Engineer", "Designer"]

for name, age, city, job in zip(names, ages, cities, jobs):
    print(f"{name}, {age}, {city}, {job}")

# Alice, 25, NYC, Engineer
# Bob, 30, London, Designer
```

## zip() with Unequal Length Lists

```python
# zip() stops at shortest list
names = ["Alice", "Bob", "Charlie", "Diana"]
ages = [25, 30]  # Shorter list

result = list(zip(names, ages))
print(result)
# [('Alice', 25), ('Bob', 30)]
# Diana and Charlie are ignored!

# To include all elements, use itertools.zip_longest
from itertools import zip_longest

result = list(zip_longest(names, ages, fillvalue="Unknown"))
print(result)
# [('Alice', 25), ('Bob', 30), ('Charlie', 'Unknown'), ('Diana', 'Unknown')]
```

## Creating Dictionaries with zip()

```python
# Combine lists into dictionary
keys = ["name", "age", "city"]
values = ["Alice", 25, "New York"]

person = dict(zip(keys, values))
print(person)
# {'name': 'Alice', 'age': 25, 'city': 'New York'}

# Multiple records
names = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 35]

# Create list of dictionaries
people = []
for name, age in zip(names, ages):
    people.append({"name": name, "age": age})

print(people)
# [{'name': 'Alice', 'age': 25}, {'name': 'Bob', 'age': 30}, {'name': 'Charlie', 'age': 35}]

# Or using list comprehension
people = [{"name": name, "age": age} for name, age in zip(names, ages)]
print(people)
```

## Unzipping with zip()

```python
# Unzip pairs back into separate lists
pairs = [("Alice", 25), ("Bob", 30), ("Charlie", 35)]

# Unzip using zip with * operator
names, ages = zip(*pairs)
print("Names:", names)    # ('Alice', 'Bob', 'Charlie')
print("Ages:", ages)      # (25, 30, 35)

# Convert to lists
names_list = list(names)
ages_list = list(ages)
print(names_list)  # ['Alice', 'Bob', 'Charlie']
print(ages_list)   # [25, 30, 35]

# With three elements
data = [("Alice", 25, "NYC"), ("Bob", 30, "LA")]
names, ages, cities = zip(*data)
print(names)   # ('Alice', 'Bob')
print(ages)    # (25, 30)
print(cities)  # ('NYC', 'LA')
```

## Combining enumerate() and zip()

```python
# Use both together for indexed parallel iteration
names = ["Alice", "Bob", "Charlie"]
scores = [95, 87, 92]

print("Rankings:")
for index, (name, score) in enumerate(zip(names, scores), start=1):
    print(f"{index}. {name}: {score} points")

# Output:
# 1. Alice: 95 points
# 2. Bob: 87 points
# 3. Charlie: 92 points

# Processing multiple lists with indices
first_names = ["Alice", "Bob", "Charlie"]
last_names = ["Smith", "Jones", "Brown"]
ages = [25, 30, 35]

for i, (first, last, age) in enumerate(zip(first_names, last_names, ages)):
    full_name = f"{first} {last}"
    print(f"Person {i}: {full_name}, age {age}")

# Person 0: Alice Smith, age 25
# Person 1: Bob Jones, age 30
# Person 2: Charlie Brown, age 35
```

## Parallel Iteration Patterns

```python
# Comparing two lists
list1 = [1, 2, 3, 4, 5]
list2 = [1, 2, 4, 4, 6]

print("Comparison:")
for i, (a, b) in enumerate(zip(list1, list2)):
    match = "✓" if a == b else "✗"
    print(f"Position {i}: {a} vs {b} {match}")

# Position 0: 1 vs 1 ✓
# Position 1: 2 vs 2 ✓
# Position 2: 3 vs 4 ✗
# Position 3: 4 vs 4 ✓
# Position 4: 5 vs 6 ✗

# Calculate element-wise sum
list1 = [10, 20, 30, 40]
list2 = [5, 10, 15, 20]

sums = [a + b for a, b in zip(list1, list2)]
print("Element-wise sum:", sums)
# [15, 30, 45, 60]

# Find maximum of each pair
maxes = [max(a, b) for a, b in zip(list1, list2)]
print("Element-wise max:", maxes)
# [10, 20, 30, 40]
```

## Matrix Transpose with zip()

```python
# Transpose a matrix using zip
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

print("Original matrix:")
for row in matrix:
    print(row)

# Transpose using zip
transposed = list(zip(*matrix))
print("\nTransposed:")
for row in transposed:
    print(row)

# Original:
# [1, 2, 3]
# [4, 5, 6]
# [7, 8, 9]

# Transposed:
# (1, 4, 7)
# (2, 5, 8)
# (3, 6, 9)

# Convert tuples to lists
transposed_lists = [list(row) for row in zip(*matrix)]
print("\nAs lists:")
for row in transposed_lists:
    print(row)
# [1, 4, 7]
# [2, 5, 8]
# [3, 6, 9]
```

## Practical Applications

```python
# CSV-like data processing
headers = ["Name", "Age", "City", "Score"]
row1 = ["Alice", "25", "NYC", "95"]
row2 = ["Bob", "30", "LA", "87"]

# Create dictionaries from rows
def row_to_dict(headers, row):
    """Convert row to dictionary."""
    return dict(zip(headers, row))

person1 = row_to_dict(headers, row1)
person2 = row_to_dict(headers, row2)

print(person1)  # {'Name': 'Alice', 'Age': '25', 'City': 'NYC', 'Score': '95'}
print(person2)  # {'Name': 'Bob', 'Age': '30', 'City': 'LA', 'Score': '87'}

# Calculate weighted average
grades = [85, 90, 78, 92]
weights = [0.2, 0.3, 0.2, 0.3]

weighted_sum = sum(grade * weight for grade, weight in zip(grades, weights))
print(f"Weighted average: {weighted_sum:.1f}")
# Weighted average: 87.1

# Merging sorted lists
def merge_sorted(list1, list2):
    """Merge two sorted lists."""
    result = []
    i, j = 0, 0
    
    while i < len(list1) and j < len(list2):
        if list1[i] < list2[j]:
            result.append(list1[i])
            i += 1
        else:
            result.append(list2[j])
            j += 1
    
    result.extend(list1[i:])
    result.extend(list2[j:])
    return result

list1 = [1, 3, 5, 7]
list2 = [2, 4, 6, 8]
merged = merge_sorted(list1, list2)
print("Merged:", merged)
# Merged: [1, 2, 3, 4, 5, 6, 7, 8]
```

## enumerate() vs range(len())

```python
items = ["apple", "banana", "cherry"]

# ❌ Not Pythonic
for i in range(len(items)):
    print(f"{i}: {items[i]}")

# ✅ Pythonic with enumerate()
for i, item in enumerate(items):
    print(f"{i}: {item}")

# ✅ When you only need values (no index)
for item in items:
    print(item)

# ✅ When you need to modify by index
for i, item in enumerate(items):
    items[i] = item.upper()
print(items)  # ['APPLE', 'BANANA', 'CHERRY']
```

## Performance Considerations

```python
import time

# Performance test
n = 1000000

# Test enumerate()
start = time.time()
for i, x in enumerate(range(n)):
    pass
enum_time = time.time() - start

# Test range(len())
lst = list(range(n))
start = time.time()
for i in range(len(lst)):
    x = lst[i]
list_time = time.time() - start

print(f"enumerate(): {enum_time:.4f}s")
print(f"range(len()): {list_time:.4f}s")
print(f"enumerate() is {list_time/enum_time:.2f}x faster")

# enumerate() is more efficient and readable!
```

## Summary

**enumerate() Function:**
- Returns `(index, value)` tuples
- Syntax: `enumerate(iterable, start=0)`
- More Pythonic than `range(len())`
- Use when you need both index and value

**enumerate() Patterns:**
```python
# Basic
for i, item in enumerate(items):
    pass

# Custom start
for i, item in enumerate(items, start=1):
    pass

# Find positions
positions = [i for i, x in enumerate(items) if x == target]
```

**zip() Function:**
- Combines multiple iterables
- Returns tuples of corresponding elements
- Stops at shortest iterable
- Unzip with `zip(*pairs)`

**zip() Patterns:**
```python
# Combine two lists
for a, b in zip(list1, list2):
    pass

# Create dictionary
dict(zip(keys, values))

# Transpose matrix
list(zip(*matrix))

# Parallel iteration
for i, (a, b, c) in enumerate(zip(list1, list2, list3)):
    pass
```

**Best Practices:**
- Use `enumerate()` instead of `range(len())`
- Use `zip()` for parallel iteration
- Combine `enumerate()` and `zip()` when needed
- Remember: `zip()` stops at shortest list
- Unzip with `zip(*pairs)` for reverse operation

These functions make code more readable, efficient, and Pythonic!

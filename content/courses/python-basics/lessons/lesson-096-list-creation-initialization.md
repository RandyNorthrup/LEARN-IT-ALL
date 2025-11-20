---
id: "110-list-creation-initialization"
title: "List Creation and Initialization Patterns"
chapterId: ch8-lists
order: 2
duration: 20
objectives:
  - Master different ways to create lists
  - Understand list initialization patterns
  - Learn when to use each creation method
  - Build lists efficiently
---

# List Creation and Initialization Patterns

Lists can be created in many ways. Choosing the right method makes your code clearer and more efficient.

## Basic List Creation

```python
# Empty list
empty1 = []
empty2 = list()

# List with initial values
numbers = [1, 2, 3, 4, 5]
mixed = [1, "two", 3.0, True, None]

# Multi-line for readability
long_list = [
    "first_item",
    "second_item",
    "third_item",
    "fourth_item",
]  # Trailing comma is OK and preferred

# Nested lists
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
]

# List of different types
data = [
    {"name": "Alice", "age": 30},
    {"name": "Bob", "age": 25},
    {"name": "Charlie", "age": 35},
]
```

## list() Constructor

```python
# From string
chars = list("hello")
print(chars)  # ['h', 'e', 'l', 'l', 'o']

# From range
numbers = list(range(5))
print(numbers)  # [0, 1, 2, 3, 4]

numbers = list(range(1, 10, 2))
print(numbers)  # [1, 3, 5, 7, 9]

# From tuple
tuple_data = (1, 2, 3)
list_data = list(tuple_data)
print(list_data)  # [1, 2, 3]

# From set (order not guaranteed)
set_data = {3, 1, 2}
list_data = list(set_data)
print(list_data)  # [1, 2, 3] or similar

# From dictionary keys
dict_data = {"a": 1, "b": 2}
keys = list(dict_data)
print(keys)  # ['a', 'b']

keys = list(dict_data.keys())
values = list(dict_data.values())
items = list(dict_data.items())
print(items)  # [('a', 1), ('b', 2)]
```

## Repeating Elements

```python
# Repeat single value
zeros = [0] * 5
print(zeros)  # [0, 0, 0, 0, 0]

# Repeat pattern
pattern = [1, 2] * 3
print(pattern)  # [1, 2, 1, 2, 1, 2]

# ⚠️ WARNING: Shallow copy with mutable elements!
# BAD - All sublists are the same object
matrix = [[0] * 3] * 3
matrix[0][0] = 1
print(matrix)  # [[1, 0, 0], [1, 0, 0], [1, 0, 0]] - Oops!

# GOOD - Each sublist is separate
matrix = [[0] * 3 for _ in range(3)]
matrix[0][0] = 1
print(matrix)  # [[1, 0, 0], [0, 0, 0], [0, 0, 0]] - Correct!

# Why? Check object IDs
bad_matrix = [[0] * 3] * 3
print(id(bad_matrix[0]) == id(bad_matrix[1]))  # True - same object!

good_matrix = [[0] * 3 for _ in range(3)]
print(id(good_matrix[0]) == id(good_matrix[1]))  # False - different objects
```

## List Comprehensions

```python
# Basic comprehension
squares = [x**2 for x in range(10)]
print(squares)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# With condition
evens = [x for x in range(10) if x % 2 == 0]
print(evens)  # [0, 2, 4, 6, 8]

# Transform strings
names = ["alice", "bob", "charlie"]
capitalized = [name.capitalize() for name in names]
print(capitalized)  # ['Alice', 'Bob', 'Charlie']

# From function calls
def square(x):
    return x ** 2

squares = [square(x) for x in range(5)]
print(squares)  # [0, 1, 4, 9, 16]

# Nested comprehension for matrix
matrix = [[i * j for j in range(3)] for i in range(3)]
print(matrix)  # [[0, 0, 0], [0, 1, 2], [0, 2, 4]]
```

## Copying Lists

```python
# Shallow copy methods
original = [1, 2, 3]

# Method 1: slice
copy1 = original[:]

# Method 2: list()
copy2 = list(original)

# Method 3: .copy()
copy3 = original.copy()

# All are independent
copy1.append(4)
print(original)  # [1, 2, 3] - unchanged
print(copy1)     # [1, 2, 3, 4]

# ⚠️ Shallow copy warning with nested lists
original = [[1, 2], [3, 4]]
copy = original[:]

copy[0][0] = 99  # Modifies nested list
print(original)  # [[99, 2], [3, 4]] - affected!
print(copy)      # [[99, 2], [3, 4]]

# Deep copy for nested structures
import copy

original = [[1, 2], [3, 4]]
deep = copy.deepcopy(original)

deep[0][0] = 99
print(original)  # [[1, 2], [3, 4]] - unchanged
print(deep)      # [[99, 2], [3, 4]]
```

## Conditional Initialization

```python
# Initialize based on condition
numbers = [1, 2, 3, 4, 5]

# Include only if condition met
positive = [x for x in numbers if x > 0]
even = [x for x in numbers if x % 2 == 0]
large = [x for x in numbers if x > 10]  # []

# Transform based on condition
adjusted = [x * 2 if x % 2 == 0 else x for x in numbers]
print(adjusted)  # [1, 4, 3, 8, 5]

# Multiple conditions
filtered = [x for x in range(20) if x % 2 == 0 if x % 3 == 0]
print(filtered)  # [0, 6, 12, 18] - divisible by both 2 and 3

# Or use 'and'
filtered = [x for x in range(20) if x % 2 == 0 and x % 3 == 0]
print(filtered)  # [0, 6, 12, 18]
```

## From File or Input

```python
# Read lines from file into list
try:
    with open('data.txt', 'r') as f:
        lines = f.readlines()  # Includes '\n'
        
    # Strip whitespace
    lines = [line.strip() for line in lines]
    
    # Filter empty lines
    lines = [line for line in lines if line]
except FileNotFoundError:
    lines = []

# Parse CSV data
csv_data = "1,2,3\n4,5,6\n7,8,9"
rows = [line.split(',') for line in csv_data.strip().split('\n')]
print(rows)  # [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']]

# Convert to integers
rows = [[int(x) for x in row] for row in rows]
print(rows)  # [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

# Get input from user (mock example)
def get_numbers_from_user():
    """Simulate getting comma-separated numbers"""
    user_input = "1, 2, 3, 4, 5"
    return [int(x.strip()) for x in user_input.split(',')]

numbers = get_numbers_from_user()
print(numbers)  # [1, 2, 3, 4, 5]
```

## Pre-Allocated Lists

```python
# Pre-allocate with None
size = 5
items = [None] * size
print(items)  # [None, None, None, None, None]

# Fill later
for i in range(size):
    items[i] = i ** 2
print(items)  # [0, 1, 4, 9, 16]

# Pre-allocate for performance
# Good for known size, fill later
results = [0] * 1000
for i in range(1000):
    results[i] = i * 2

# Pre-allocate matrix
rows, cols = 3, 4
matrix = [[0 for _ in range(cols)] for _ in range(rows)]
print(matrix)  # [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
```

## From Generator Expressions

```python
# Generator to list
squares_gen = (x**2 for x in range(5))
squares_list = list(squares_gen)
print(squares_list)  # [0, 1, 4, 9, 16]

# Filtered generator
even_gen = (x for x in range(10) if x % 2 == 0)
evens = list(even_gen)
print(evens)  # [0, 2, 4, 6, 8]

# Complex generator
data = [
    {"name": "Alice", "age": 30},
    {"name": "Bob", "age": 25},
    {"name": "Charlie", "age": 35},
]

names_gen = (item["name"] for item in data if item["age"] >= 30)
names = list(names_gen)
print(names)  # ['Alice', 'Charlie']
```

## Using map() and filter()

```python
# map() converts iterable
numbers = [1, 2, 3, 4, 5]
squares = list(map(lambda x: x**2, numbers))
print(squares)  # [1, 4, 9, 16, 25]

# Multiple iterables
list1 = [1, 2, 3]
list2 = [10, 20, 30]
sums = list(map(lambda x, y: x + y, list1, list2))
print(sums)  # [11, 22, 33]

# filter() keeps matching items
numbers = range(10)
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)  # [0, 2, 4, 6, 8]

# Combine map and filter
numbers = range(10)
result = list(map(lambda x: x**2, filter(lambda x: x % 2 == 0, numbers)))
print(result)  # [0, 4, 16, 36, 64]

# List comprehension equivalent (often clearer)
result = [x**2 for x in range(10) if x % 2 == 0]
print(result)  # [0, 4, 16, 36, 64]
```

## Using zip()

```python
# Create tuples from multiple lists
names = ["Alice", "Bob", "Charlie"]
ages = [30, 25, 35]
cities = ["NYC", "LA", "Chicago"]

combined = list(zip(names, ages, cities))
print(combined)
# [('Alice', 30, 'NYC'), ('Bob', 25, 'LA'), ('Charlie', 35, 'Chicago')]

# Unpack tuples into list of dicts
people = [
    {"name": name, "age": age, "city": city}
    for name, age, city in zip(names, ages, cities)
]
print(people)
# [{'name': 'Alice', 'age': 30, 'city': 'NYC'}, ...]

# Transpose matrix
matrix = [[1, 2, 3], [4, 5, 6]]
transposed = list(zip(*matrix))
print(transposed)  # [(1, 4), (2, 5), (3, 6)]

# Convert to lists if needed
transposed = [list(row) for row in zip(*matrix)]
print(transposed)  # [[1, 4], [2, 5], [3, 6]]
```

## Performance Considerations

```python
import time

# List vs generator for large data
def time_creation():
    # List comprehension - creates entire list
    start = time.time()
    squares_list = [x**2 for x in range(1000000)]
    list_time = time.time() - start
    
    # Generator - lazy evaluation
    start = time.time()
    squares_gen = (x**2 for x in range(1000000))
    gen_time = time.time() - start
    
    print(f"List: {list_time:.6f}s")
    print(f"Gen:  {gen_time:.6f}s (much faster - lazy)")

# Pre-allocation vs append
def compare_append_vs_prealloc():
    n = 10000
    
    # Append (slower - resizes list)
    start = time.time()
    result = []
    for i in range(n):
        result.append(i)
    append_time = time.time() - start
    
    # Pre-allocate (faster - no resizing)
    start = time.time()
    result = [0] * n
    for i in range(n):
        result[i] = i
    prealloc_time = time.time() - start
    
    print(f"Append:    {append_time:.6f}s")
    print(f"Prealloc:  {prealloc_time:.6f}s")
    print(f"Speedup:   {append_time / prealloc_time:.2f}x")

# List comprehension vs append (comprehension faster)
def compare_comprehension():
    n = 10000
    
    start = time.time()
    result = []
    for i in range(n):
        result.append(i**2)
    loop_time = time.time() - start
    
    start = time.time()
    result = [i**2 for i in range(n)]
    comp_time = time.time() - start
    
    print(f"Loop:          {loop_time:.6f}s")
    print(f"Comprehension: {comp_time:.6f}s")
    print(f"Speedup:       {loop_time / comp_time:.2f}x")
```

## Summary

**Creation Methods:**

| Method | Use Case | Example |
|--------|----------|---------|
| `[]` | Literal values | `[1, 2, 3]` |
| `list()` | From iterable | `list(range(5))` |
| `*` operator | Repeat value | `[0] * 5` |
| Comprehension | Transform/filter | `[x**2 for x in range(5)]` |
| `map()` | Apply function | `list(map(str, numbers))` |
| `filter()` | Keep matching | `list(filter(lambda x: x > 0, nums))` |
| `zip()` | Combine lists | `list(zip(names, ages))` |

**Best Practices:**

- Use `[]` for literal values
- Use comprehensions for transformations
- Use `list()` constructor for type conversion
- Avoid `* operator` with mutable nested elements
- Pre-allocate for known size and better performance
- Use shallow copy `[:]` or `.copy()` for independence
- Use `deepcopy()` for nested structures

**Remember:** Choose the creation method that makes your intent clearest!

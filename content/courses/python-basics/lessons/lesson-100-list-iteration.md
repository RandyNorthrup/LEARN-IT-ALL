---
id: "114-list-iteration"
title: "List Iteration Techniques"
chapterId: ch8-lists
order: 6
duration: 25
objectives:
  - Master different list iteration patterns
  - Learn when to use each iteration method
  - Iterate efficiently and idiomatically
  - Avoid common iteration mistakes
---

# List Iteration Techniques

Iterating over lists is one of the most common operations. Python provides many ways to do it efficiently.

## Basic For Loop

```python
# Iterate over elements
fruits = ["apple", "banana", "cherry"]

for fruit in fruits:
    print(fruit)
# apple
# banana
# cherry

# Process each element
numbers = [1, 2, 3, 4, 5]
squares = []
for num in numbers:
    squares.append(num ** 2)
print(squares)  # [1, 4, 9, 16, 25]

# Conditional processing
numbers = [1, 2, 3, 4, 5, 6]
for num in numbers:
    if num % 2 == 0:
        print(f"{num} is even")
    else:
        print(f"{num} is odd")
```

## Enumerate for Index and Value

```python
# Get both index and value
fruits = ["apple", "banana", "cherry"]

for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")
# 0: apple
# 1: banana
# 2: cherry

# Start from different number
for i, fruit in enumerate(fruits, start=1):
    print(f"#{i}: {fruit}")
# #1: apple
# #2: banana
# #3: cherry

# Access previous element
numbers = [1, 2, 3, 4, 5]
for i, num in enumerate(numbers):
    if i > 0:
        prev = numbers[i - 1]
        print(f"{prev} → {num}")
# 1 → 2
# 2 → 3
# 3 → 4
# 4 → 5

# Modify during iteration (safe with index)
numbers = [1, 2, 3, 4, 5]
for i, num in enumerate(numbers):
    numbers[i] = num * 2
print(numbers)  # [2, 4, 6, 8, 10]
```

## Range and Index-Based Iteration

```python
# Iterate by index
fruits = ["apple", "banana", "cherry"]

for i in range(len(fruits)):
    print(f"Index {i}: {fruits[i]}")

# Useful for accessing adjacent elements
numbers = [1, 2, 3, 4, 5]
for i in range(len(numbers) - 1):
    current = numbers[i]
    next_item = numbers[i + 1]
    print(f"{current} → {next_item}")

# Modify based on condition
numbers = [1, 2, 3, 4, 5]
for i in range(len(numbers)):
    if numbers[i] % 2 == 0:
        numbers[i] = 0
print(numbers)  # [1, 0, 3, 0, 5]

# Reverse iteration by index
for i in range(len(fruits) - 1, -1, -1):
    print(fruits[i])
# cherry
# banana
# apple

# Skip elements
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
for i in range(0, len(numbers), 2):
    print(numbers[i])  # 0, 2, 4, 6, 8
```

## Reversed Iteration

```python
# reversed() function
numbers = [1, 2, 3, 4, 5]

for num in reversed(numbers):
    print(num)
# 5, 4, 3, 2, 1

# Original list unchanged
print(numbers)  # [1, 2, 3, 4, 5]

# Reverse iteration with index
for i, num in enumerate(reversed(numbers)):
    print(f"{i}: {num}")
# 0: 5
# 1: 4
# 2: 3
# ...

# Reverse slice (creates new list)
for num in numbers[::-1]:
    print(num)
# 5, 4, 3, 2, 1
```

## List Comprehensions

```python
# Transform each element
numbers = [1, 2, 3, 4, 5]
squares = [x ** 2 for x in numbers]
print(squares)  # [1, 4, 9, 16, 25]

# Filter while iterating
evens = [x for x in numbers if x % 2 == 0]
print(evens)  # [2, 4]

# Transform and filter
doubled_evens = [x * 2 for x in numbers if x % 2 == 0]
print(doubled_evens)  # [4, 8]

# Conditional expression
adjusted = [x if x % 2 == 0 else 0 for x in numbers]
print(adjusted)  # [0, 2, 0, 4, 0]

# Nested comprehension
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flattened = [num for row in matrix for num in row]
print(flattened)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]

# With enumerate
fruits = ["apple", "banana", "cherry"]
numbered = [f"{i+1}. {fruit}" for i, fruit in enumerate(fruits)]
print(numbered)  # ['1. apple', '2. banana', '3. cherry']
```

## While Loop

```python
# While with index
numbers = [1, 2, 3, 4, 5]
i = 0
while i < len(numbers):
    print(numbers[i])
    i += 1

# Process until condition
numbers = [1, 2, 3, 4, 5, 6]
i = 0
while i < len(numbers) and numbers[i] < 5:
    print(numbers[i])
    i += 1
# 1, 2, 3, 4

# Remove elements while iterating
numbers = [1, 2, 3, 4, 5]
while numbers:
    num = numbers.pop()
    print(num)
# 5, 4, 3, 2, 1

# Search with while
target = 3
numbers = [1, 2, 3, 4, 5]
i = 0
while i < len(numbers):
    if numbers[i] == target:
        print(f"Found at index {i}")
        break
    i += 1
```

## Zip for Parallel Iteration

```python
# Iterate two lists together
names = ["Alice", "Bob", "Charlie"]
ages = [30, 25, 35]

for name, age in zip(names, ages):
    print(f"{name} is {age} years old")
# Alice is 30 years old
# Bob is 25 years old
# Charlie is 35 years old

# Three or more lists
fruits = ["apple", "banana", "cherry"]
colors = ["red", "yellow", "red"]
prices = [1.0, 0.5, 2.0]

for fruit, color, price in zip(fruits, colors, prices):
    print(f"{fruit} ({color}): ${price}")

# Unequal lengths - stops at shortest
list1 = [1, 2, 3, 4]
list2 = ['a', 'b']
for num, letter in zip(list1, list2):
    print(num, letter)
# 1 a
# 2 b

# Combine with enumerate
for i, (name, age) in enumerate(zip(names, ages)):
    print(f"{i}: {name} is {age}")
```

## Iterator Protocol

```python
# Manual iteration
numbers = [1, 2, 3, 4, 5]

# Get iterator
iterator = iter(numbers)

# Get next elements
print(next(iterator))  # 1
print(next(iterator))  # 2
print(next(iterator))  # 3

# Iterate rest
for num in iterator:
    print(num)
# 4, 5

# Manually consume all
numbers = [1, 2, 3]
it = iter(numbers)
try:
    while True:
        print(next(it))
except StopIteration:
    print("Done")

# Use in custom functions
def process_in_batches(lst, batch_size):
    """Process list in batches"""
    iterator = iter(lst)
    while True:
        batch = []
        for _ in range(batch_size):
            try:
                batch.append(next(iterator))
            except StopIteration:
                if batch:
                    yield batch
                return
        yield batch

numbers = list(range(10))
for batch in process_in_batches(numbers, 3):
    print(batch)
# [0, 1, 2]
# [3, 4, 5]
# [6, 7, 8]
# [9]
```

## Nested List Iteration

```python
# 2D list
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# Iterate rows
for row in matrix:
    print(row)
# [1, 2, 3]
# [4, 5, 6]
# [7, 8, 9]

# Iterate all elements
for row in matrix:
    for element in row:
        print(element, end=" ")
    print()

# With row and column indices
for i, row in enumerate(matrix):
    for j, element in enumerate(row):
        print(f"matrix[{i}][{j}] = {element}")

# Flatten and iterate
for element in [item for row in matrix for item in row]:
    print(element)

# More efficient flattening
from itertools import chain
for element in chain.from_iterable(matrix):
    print(element)
```

## Iteration with Break and Continue

```python
# Break - stop iteration
numbers = [1, 2, 3, 4, 5, 6]
for num in numbers:
    if num == 4:
        print("Found 4, stopping")
        break
    print(num)
# 1, 2, 3

# Continue - skip to next iteration
for num in numbers:
    if num % 2 == 0:
        continue  # Skip even numbers
    print(num)
# 1, 3, 5

# else clause with loops
for num in numbers:
    if num > 10:
        print("Found number > 10")
        break
else:
    print("No number > 10 found")
# No number > 10 found

# Search pattern
def find_first_even(numbers):
    for num in numbers:
        if num % 2 == 0:
            return num
    return None

print(find_first_even([1, 3, 5, 8, 9]))  # 8
print(find_first_even([1, 3, 5]))        # None
```

## Iteration with Modification

```python
# ❌ BAD - Modifying while iterating directly
numbers = [1, 2, 3, 4, 5]
for num in numbers:
    if num % 2 == 0:
        numbers.remove(num)  # Causes issues!
print(numbers)  # [1, 3, 4, 5] - Missed 4!

# ✅ GOOD - Iterate over copy
numbers = [1, 2, 3, 4, 5]
for num in numbers[:]:
    if num % 2 == 0:
        numbers.remove(num)
print(numbers)  # [1, 3, 5]

# ✅ BETTER - Use comprehension
numbers = [1, 2, 3, 4, 5]
numbers = [x for x in numbers if x % 2 != 0]
print(numbers)  # [1, 3, 5]

# ✅ GOOD - Iterate backward with index
numbers = [1, 2, 3, 4, 5]
for i in range(len(numbers) - 1, -1, -1):
    if numbers[i] % 2 == 0:
        del numbers[i]
print(numbers)  # [1, 3, 5]

# Safe in-place modification with enumerate
numbers = [1, 2, 3, 4, 5]
for i, num in enumerate(numbers):
    numbers[i] = num * 2
print(numbers)  # [2, 4, 6, 8, 10]
```

## Chunking and Windowing

```python
# Iterate in chunks
def chunks(lst, size):
    """Yield successive chunks of size"""
    for i in range(0, len(lst), size):
        yield lst[i:i + size]

numbers = list(range(10))
for chunk in chunks(numbers, 3):
    print(chunk)
# [0, 1, 2]
# [3, 4, 5]
# [6, 7, 8]
# [9]

# Sliding window
def sliding_window(lst, size):
    """Yield sliding windows of size"""
    for i in range(len(lst) - size + 1):
        yield lst[i:i + size]

numbers = [1, 2, 3, 4, 5]
for window in sliding_window(numbers, 3):
    print(window)
# [1, 2, 3]
# [2, 3, 4]
# [3, 4, 5]

# Pairwise iteration
numbers = [1, 2, 3, 4, 5]
for i in range(len(numbers) - 1):
    pair = (numbers[i], numbers[i + 1])
    print(pair)
# (1, 2)
# (2, 3)
# (3, 4)
# (4, 5)

# Using zip
for a, b in zip(numbers, numbers[1:]):
    print(f"{a} → {b}")
```

## Performance Considerations

```python
import time

# List comprehension vs for loop
n = 100000

# For loop with append
start = time.time()
result = []
for i in range(n):
    result.append(i ** 2)
loop_time = time.time() - start

# List comprehension
start = time.time()
result = [i ** 2 for i in range(n)]
comp_time = time.time() - start

print(f"Loop:          {loop_time:.6f}s")
print(f"Comprehension: {comp_time:.6f}s")
print(f"Speedup:       {loop_time / comp_time:.2f}x")

# Generator for memory efficiency
def process_large_list():
    # Creates entire list in memory
    data = [x ** 2 for x in range(1000000)]
    for item in data:
        pass
    
    # Generator - one at a time
    data_gen = (x ** 2 for x in range(1000000))
    for item in data_gen:
        pass

# Enumerate vs range(len())
fruits = ["apple", "banana", "cherry"] * 1000

start = time.time()
for i in range(len(fruits)):
    fruit = fruits[i]
end_range = time.time() - start

start = time.time()
for i, fruit in enumerate(fruits):
    pass
end_enum = time.time() - start

print(f"\nrange(len()): {end_range:.6f}s")
print(f"enumerate():  {end_enum:.6f}s")
# enumerate() is cleaner and similar speed
```

## Summary

**Iteration Methods:**

| Method | Use When | Example |
|--------|----------|---------|
| `for item in lst` | Simple iteration | `for x in numbers` |
| `enumerate()` | Need index + value | `for i, x in enumerate(lst)` |
| `range(len())` | Need index only | `for i in range(len(lst))` |
| `reversed()` | Reverse order | `for x in reversed(lst)` |
| `zip()` | Parallel iteration | `for x, y in zip(l1, l2)` |
| Comprehension | Transform/filter | `[x*2 for x in lst]` |
| `while` | Complex conditions | `while i < len(lst) and ...` |

**Best Practices:**

- ✅ Use `for item in list` for simple iteration
- ✅ Use `enumerate()` when you need index
- ✅ Use comprehensions for transformations
- ✅ Use `zip()` for parallel iteration
- ✅ Use `reversed()` instead of `[::-1]` when possible
- ❌ Don't use `range(len())` unless you need index only
- ❌ Don't modify list while iterating directly
- ❌ Don't create intermediate lists unnecessarily

**Remember:** Choose the iteration method that makes your code clearest!

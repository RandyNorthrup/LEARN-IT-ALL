---
id: "111-list-indexing-access"
title: "List Indexing and Element Access"
chapterId: ch8-lists
order: 3
duration: 25
objectives:
  - Master positive and negative indexing
  - Handle index errors gracefully
  - Access nested list elements
  - Use indexing efficiently
---

# List Indexing and Element Access

Lists are ordered sequences. Understanding how to access elements is fundamental to working with lists.

## Basic Indexing

```python
# Positive indexing (0-based)
fruits = ["apple", "banana", "cherry", "date", "elderberry"]

print(fruits[0])  # "apple" - first element
print(fruits[1])  # "banana"
print(fruits[2])  # "cherry"
print(fruits[4])  # "elderberry" - last element

# Index corresponds to position
#  Index:    0        1         2        3          4
#  Value: "apple" "banana" "cherry" "date" "elderberry"
```

## Negative Indexing

```python
fruits = ["apple", "banana", "cherry", "date", "elderberry"]

# Negative indexing (from end)
print(fruits[-1])  # "elderberry" - last element
print(fruits[-2])  # "date"
print(fruits[-3])  # "cherry"
print(fruits[-5])  # "apple" - first element

# Visualization:
#  Positive:  0        1         2        3          4
#  Value:   "apple" "banana" "cherry" "date" "elderberry"
#  Negative: -5       -4        -3       -2         -1

# Relationship: fruits[i] == fruits[i - len(fruits)]
print(fruits[0] == fruits[-5])  # True
print(fruits[4] == fruits[-1])  # True
```

## Index Out of Range

```python
fruits = ["apple", "banana", "cherry"]

# Valid indices: 0, 1, 2 (or -3, -2, -1)
try:
    print(fruits[3])  # IndexError!
except IndexError as e:
    print(f"Error: {e}")  # "list index out of range"

try:
    print(fruits[-4])  # IndexError!
except IndexError:
    print("Negative index out of range")

# Safe access patterns
def safe_get(lst, index, default=None):
    """Get element or return default"""
    try:
        return lst[index]
    except IndexError:
        return default

fruits = ["apple", "banana"]
print(safe_get(fruits, 5))  # None
print(safe_get(fruits, 5, "unknown"))  # "unknown"

# Check bounds before accessing
index = 10
if 0 <= index < len(fruits):
    print(fruits[index])
else:
    print(f"Index {index} out of range")

# Or use get() pattern for dictionaries
# Lists don't have .get(), but you can:
def list_get(lst, index, default=None):
    if -len(lst) <= index < len(lst):
        return lst[index]
    return default

print(list_get(fruits, 0))   # "apple"
print(list_get(fruits, 10))  # None
```

## Dynamic Indexing

```python
numbers = [10, 20, 30, 40, 50]

# Use variable as index
i = 2
print(numbers[i])  # 30

# Calculate index
last_index = len(numbers) - 1
print(numbers[last_index])  # 50

# Loop through indices
for i in range(len(numbers)):
    print(f"Index {i}: {numbers[i]}")

# Better: use enumerate
for i, value in enumerate(numbers):
    print(f"Index {i}: {value}")

# Find and access
value_to_find = 30
if value_to_find in numbers:
    index = numbers.index(value_to_find)
    print(f"Found at index {index}")
```

## Accessing First and Last Elements

```python
numbers = [1, 2, 3, 4, 5]

# First element
first = numbers[0]
print(first)  # 1

# Last element (three ways)
last1 = numbers[-1]
last2 = numbers[len(numbers) - 1]
print(last1, last2)  # 5, 5

# Safe access for empty lists
def get_first(lst, default=None):
    return lst[0] if lst else default

def get_last(lst, default=None):
    return lst[-1] if lst else default

empty = []
print(get_first(empty))      # None
print(get_first(empty, 0))   # 0
print(get_last(empty, "N/A"))  # "N/A"
```

## Nested List Access

```python
# 2D list (matrix)
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# Access row
first_row = matrix[0]
print(first_row)  # [1, 2, 3]

# Access element: [row][column]
element = matrix[0][1]  # First row, second column
print(element)  # 2

# Access multiple levels
element = matrix[1][2]  # Second row, third column
print(element)  # 6

# Last element of last row
last = matrix[-1][-1]
print(last)  # 9

# Iterate through 2D list
for row in matrix:
    for element in row:
        print(element, end=" ")
    print()  # Newline after each row

# With indices
for i in range(len(matrix)):
    for j in range(len(matrix[i])):
        print(f"matrix[{i}][{j}] = {matrix[i][j]}")
```

## Deeply Nested Lists

```python
# 3D list
cube = [
    [[1, 2], [3, 4]],
    [[5, 6], [7, 8]]
]

# Access: [layer][row][column]
print(cube[0][0][0])  # 1
print(cube[0][1][1])  # 4
print(cube[1][0][1])  # 6
print(cube[1][1][1])  # 8

# Jagged list (uneven lengths)
jagged = [
    [1, 2],
    [3, 4, 5],
    [6]
]

# Safe access
def safe_nested_get(lst, *indices, default=None):
    """Safely access nested list with multiple indices"""
    current = lst
    for index in indices:
        try:
            current = current[index]
        except (IndexError, TypeError):
            return default
    return current

print(safe_nested_get(jagged, 0, 1))    # 2
print(safe_nested_get(jagged, 2, 0))    # 6
print(safe_nested_get(jagged, 2, 1))    # None (out of range)
print(safe_nested_get(jagged, 5, 0))    # None (out of range)
```

## Accessing Multiple Elements

```python
numbers = [10, 20, 30, 40, 50]

# Access multiple indices
indices = [0, 2, 4]
selected = [numbers[i] for i in indices]
print(selected)  # [10, 30, 50]

# Safely access multiple indices
def get_at_indices(lst, indices, default=None):
    """Get elements at specified indices"""
    result = []
    for i in indices:
        try:
            result.append(lst[i])
        except IndexError:
            result.append(default)
    return result

numbers = [10, 20, 30]
indices = [0, 2, 5]  # 5 is out of range
result = get_at_indices(numbers, indices, -1)
print(result)  # [10, 30, -1]
```

## Using index() Method

```python
fruits = ["apple", "banana", "cherry", "banana"]

# Find first occurrence
index = fruits.index("banana")
print(index)  # 1

# Find in range
index = fruits.index("banana", 2)  # Start from index 2
print(index)  # 3

# Not found raises ValueError
try:
    index = fruits.index("grape")
except ValueError:
    print("Value not found")

# Safe wrapper
def safe_index(lst, value, default=-1):
    """Find index or return default"""
    try:
        return lst.index(value)
    except ValueError:
        return default

print(safe_index(fruits, "cherry"))  # 2
print(safe_index(fruits, "grape"))   # -1

# Check before using index
if "banana" in fruits:
    index = fruits.index("banana")
    print(f"Found at {index}")
```

## Conditional Access

```python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Access based on condition
# First even number
first_even = next((x for x in numbers if x % 2 == 0), None)
print(first_even)  # 2

# Last odd number
last_odd = next((x for x in reversed(numbers) if x % 2 != 0), None)
print(last_odd)  # 9

# All elements matching condition
evens = [x for x in numbers if x % 2 == 0]
print(evens)  # [2, 4, 6, 8, 10]

# Access element at calculated index
middle_index = len(numbers) // 2
middle = numbers[middle_index]
print(middle)  # 5

# Access every nth element
step = 2
every_other = numbers[::step]
print(every_other)  # [1, 3, 5, 7, 9]
```

## Modifying via Index

```python
numbers = [1, 2, 3, 4, 5]

# Update element
numbers[0] = 10
print(numbers)  # [10, 2, 3, 4, 5]

# Update multiple
numbers[1] = numbers[2] = 0
print(numbers)  # [10, 0, 0, 4, 5]

# Update based on condition
for i in range(len(numbers)):
    if numbers[i] < 5:
        numbers[i] = 0
print(numbers)  # [10, 0, 0, 0, 5]

# Update nested list
matrix = [[1, 2], [3, 4]]
matrix[0][1] = 99
print(matrix)  # [[1, 99], [3, 4]]

# Swap elements
numbers = [1, 2, 3, 4, 5]
numbers[0], numbers[4] = numbers[4], numbers[0]
print(numbers)  # [5, 2, 3, 4, 1]
```

## Performance Considerations

```python
import time

# Index access is O(1) - constant time
numbers = list(range(1000000))

start = time.time()
value = numbers[0]
end = time.time()
print(f"First element: {end - start:.10f}s")

start = time.time()
value = numbers[500000]
end = time.time()
print(f"Middle element: {end - start:.10f}s")

start = time.time()
value = numbers[-1]
end = time.time()
print(f"Last element: {end - start:.10f}s")
# All approximately the same time - O(1)

# Compare with find (O(n) - linear time)
start = time.time()
index = numbers.index(500000)
end = time.time()
print(f"Find element: {end - start:.10f}s")  # Much slower
```

## Common Patterns

```python
# Check if index exists
def is_valid_index(lst, index):
    return -len(lst) <= index < len(lst)

numbers = [1, 2, 3]
print(is_valid_index(numbers, 0))   # True
print(is_valid_index(numbers, 5))   # False
print(is_valid_index(numbers, -3))  # True

# Get element or default
def get_or_default(lst, index, default=None):
    return lst[index] if is_valid_index(lst, index) else default

# Circular indexing
def circular_index(lst, index):
    """Access list as if it wraps around"""
    return lst[index % len(lst)] if lst else None

numbers = [1, 2, 3, 4, 5]
print(circular_index(numbers, 0))   # 1
print(circular_index(numbers, 5))   # 1 (wraps to 0)
print(circular_index(numbers, 7))   # 3 (wraps to 2)

# Relative indexing
def relative_get(lst, index, relative_to=0):
    """Get element relative to another index"""
    actual_index = relative_to + index
    return get_or_default(lst, actual_index)

numbers = [10, 20, 30, 40, 50]
print(relative_get(numbers, 1, relative_to=2))  # 40 (index 2 + 1)
```

## Summary

**Indexing Types:**

| Type | Syntax | Example | Result |
|------|--------|---------|--------|
| Positive | `lst[i]` | `[1,2,3][0]` | `1` |
| Negative | `lst[-i]` | `[1,2,3][-1]` | `3` |
| Nested | `lst[i][j]` | `[[1,2],[3,4]][0][1]` | `2` |
| Dynamic | `lst[expr]` | `lst[len(lst)-1]` | Last |

**Best Practices:**

- ✅ Use negative indices for access from end (`lst[-1]`)
- ✅ Check bounds before accessing if uncertain
- ✅ Use `enumerate()` instead of `range(len(lst))`
- ✅ Handle `IndexError` gracefully
- ✅ Use `in` operator before `.index()`
- ❌ Don't forget lists are 0-indexed
- ❌ Don't use bare `.index()` without error handling

**Remember:** Index access is O(1) - very fast! Use it confidently.

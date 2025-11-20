---
id: 45-multiple-assignment
title: Multiple Assignment and Unpacking
chapterId: ch2-variables
order: 6
duration: 25
objectives:
  - Master multiple assignment syntax
  - Understand tuple unpacking
  - Use unpacking with lists and strings
  - Apply the wildcard (*) operator for unpacking
  - Swap variables without a temporary variable
---

# Multiple Assignment and Unpacking

## Introduction

Python allows you to assign multiple variables in a single line and extract values from sequences. This makes code more concise and elegant.

## Multiple Assignment

Assign multiple variables at once:

```python
# Traditional way
x = 1
y = 2
z = 3

# Multiple assignment - much cleaner
x, y, z = 1, 2, 3
print(x, y, z)  # 1 2 3

# Works with any values
name, age, is_student = "Alice", 25, True
print(name)  # Alice
print(age)   # 25
```

## Unpacking Sequences

Extract values from lists, tuples, or any sequence:

```python
# Unpacking a list
coordinates = [10, 20]
x, y = coordinates
print(x)  # 10
print(y)  # 20

# Unpacking a tuple
person = ("Alice", 25, "Engineer")
name, age, job = person
print(name)  # Alice
print(age)   # 25
print(job)   # Engineer

# Unpacking a string
code = "AB"
first, second = code
print(first)   # A
print(second)  # B
```

## Swapping Variables

Swap two variables without a temporary variable:

```python
# Traditional way (other languages)
a = 10
b = 20
temp = a
a = b
b = temp
print(a, b)  # 20 10

# Python way - much cleaner!
a = 10
b = 20
a, b = b, a
print(a, b)  # 20 10

# Rotate three variables
x, y, z = 1, 2, 3
x, y, z = z, x, y
print(x, y, z)  # 3 1 2
```

## Extended Unpacking with *

Use `*` to collect remaining values:

```python
# Get first and rest
numbers = [1, 2, 3, 4, 5]
first, *rest = numbers
print(first)  # 1
print(rest)   # [2, 3, 4, 5]

# Get first, middle, and last
first, *middle, last = numbers
print(first)   # 1
print(middle)  # [2, 3, 4]
print(last)    # 5

# Get first two and rest
first, second, *rest = numbers
print(first)   # 1
print(second)  # 2
print(rest)    # [3, 4, 5]
```

## Unpacking in Function Returns

Functions can return multiple values:

```python
def get_user_info():
    return "Alice", 25, "alice@example.com"

# Unpack the return values
name, age, email = get_user_info()
print(name)   # Alice
print(age)    # 25
print(email)  # alice@example.com

# Get only what you need, ignore rest with _
name, _, email = get_user_info()
print(name)   # Alice
print(email)  # alice@example.com
# (age is ignored)
```

## Practical Examples

### Example 1: Splitting Full Name

```python
# Split name into parts
full_name = "Alice Johnson"
first_name, last_name = full_name.split()
print(first_name)  # Alice
print(last_name)   # Johnson

# Handle middle name with *
full_name = "Alice Marie Johnson"
first, *middle, last = full_name.split()
print(first)   # Alice
print(middle)  # ['Marie']
print(last)    # Johnson
```

### Example 2: Processing CSV Data

```python
# Parse CSV row
csv_row = "Alice,25,Engineer,New York"
name, age, job, city = csv_row.split(",")
print(f"{name} is a {age}-year-old {job} from {city}")
# Alice is a 25-year-old Engineer from New York
```

### Example 3: Dictionary Unpacking

```python
# Get key-value pairs
point = {"x": 10, "y": 20}

# Unpack into variables
x = point["x"]
y = point["y"]

# Or use .values()
x, y = point.values()
print(x, y)  # 10 20

# Unpack keys
x_key, y_key = point.keys()
print(x_key, y_key)  # x y
```

### Example 4: Splitting Head and Tail

```python
# Process first item differently
tasks = ["urgent", "important", "normal", "low"]

if tasks:
    current, *remaining = tasks
    print(f"Processing: {current}")
    print(f"Queued: {remaining}")
# Processing: urgent
# Queued: ['important', 'normal', 'low']
```

### Example 5: Min and Max

```python
# Get min and max from list
numbers = [3, 7, 1, 9, 2]
sorted_numbers = sorted(numbers)
min_val, *_, max_val = sorted_numbers
print(f"Min: {min_val}, Max: {max_val}")
# Min: 1, Max: 9
```

### Example 6: Coordinate System

```python
# 2D point
point = (5, 10)
x, y = point
distance = (x**2 + y**2) ** 0.5
print(f"Distance from origin: {distance:.2f}")

# 3D point
point_3d = (3, 4, 5)
x, y, z = point_3d
print(f"3D coordinates: x={x}, y={y}, z={z}")
```

## Unpacking with Nested Structures

```python
# Nested tuples
person = ("Alice", (25, "Engineer", "New York"))
name, (age, job, city) = person
print(name)  # Alice
print(age)   # 25
print(city)  # New York

# Nested lists
matrix = [[1, 2], [3, 4]]
(a, b), (c, d) = matrix
print(a, b, c, d)  # 1 2 3 4
```

## Common Mistakes

```python
# Mistake 1: Count mismatch
try:
    x, y = [1, 2, 3]  # Too many values
except ValueError as e:
    print(e)  # too many values to unpack

try:
    x, y, z = [1, 2]  # Not enough values
except ValueError as e:
    print(e)  # not enough values to unpack

# Solution: use *
x, y, *rest = [1, 2, 3]  # Works!

# Mistake 2: Unpacking empty sequence
try:
    first, *rest = []
except ValueError as e:
    print(e)  # not enough values to unpack

# Solution: check before unpacking
data = []
if data:
    first, *rest = data
else:
    print("No data to unpack")
```

## Ignoring Values with _

Use underscore to ignore unwanted values:

```python
# Ignore specific values
x, _, z = [1, 2, 3]
print(x, z)  # 1 3 (2 is ignored)

# Ignore multiple values
first, *_, last = [1, 2, 3, 4, 5]
print(first, last)  # 1 5

# Common pattern: ignore index in loop
names = ["Alice", "Bob", "Charlie"]
for _, name in enumerate(names):
    print(name)  # Just names, not indices
```

## Chaining Assignments

Assign the same value to multiple variables:

```python
# All variables get the same value
x = y = z = 0
print(x, y, z)  # 0 0 0

# Initialize multiple counters
count1 = count2 = count3 = 0

# Initialize with mutable - be careful!
# DON'T do this:
list1 = list2 = []  # Same list!
list1.append(1)
print(list2)  # [1] - surprise!

# DO this instead:
list1 = []
list2 = []
list1.append(1)
print(list2)  # [] - as expected
```

## Summary

- **Multiple assignment**: `x, y, z = 1, 2, 3`
- **Unpacking**: Extract values from sequences
- **Swapping**: `a, b = b, a` (no temp variable needed)
- **Extended unpacking**: Use `*` to collect remaining values
- **Ignoring values**: Use `_` for unwanted values
- **Count must match**: Unless using `*` for remaining values
- **Works with**: Lists, tuples, strings, any iterable
- **Nested unpacking**: `(a, b), (c, d) = [[1, 2], [3, 4]]`

## Next Steps

Next, you'll learn about string formatting methods including f-strings.

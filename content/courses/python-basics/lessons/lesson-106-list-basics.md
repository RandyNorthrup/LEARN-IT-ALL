---
id: list-basics
title: List Basics
chapterId: ch8-lists
order: 33
duration: 30
objectives:
  - Understand what lists are and why they're useful
  - Create and access lists using indexing
  - Use negative indexing to access elements from the end
  - Modify list elements and understand list mutability
  - Check list length and membership
---

# List Basics

Lists are one of Python's most versatile and commonly used data structures. They allow you to store multiple values in a single variable and work with collections of data efficiently.

## What Are Lists?

A **list** is an ordered, mutable collection of items. Lists can contain any type of data and can even mix different types.

```python
# Empty list
empty = []

# List of numbers
numbers = [1, 2, 3, 4, 5]

# List of strings
fruits = ["apple", "banana", "cherry"]

# Mixed types
mixed = [1, "hello", 3.14, True]

# Nested lists
matrix = [[1, 2], [3, 4], [5, 6]]
```

## Why Use Lists?

Lists are essential for:
- **Storing collections** of related data
- **Processing multiple values** efficiently
- **Managing dynamic data** that can grow or shrink
- **Organizing data** in a specific order

```python
# Store student scores
scores = [85, 92, 78, 90, 88]

# Store user names
users = ["alice", "bob", "charlie"]

# Store coordinates
points = [(0, 0), (1, 2), (3, 4)]
```

## Creating Lists

```python
# Using square brackets
numbers = [1, 2, 3]

# Using the list() constructor
letters = list("abc")  # ["a", "b", "c"]

# Using range with list()
evens = list(range(0, 10, 2))  # [0, 2, 4, 6, 8]

# Using list comprehension (covered later)
squares = [x**2 for x in range(5)]  # [0, 1, 4, 9, 16]
```

## Accessing List Elements

Use **indexing** with square brackets to access elements. Indexing starts at 0.

```python
fruits = ["apple", "banana", "cherry", "date"]

# Access by index
print(fruits[0])  # "apple"
print(fruits[1])  # "banana"
print(fruits[3])  # "date"

# Get the first element
first = fruits[0]

# Get the last element
last = fruits[3]
```

### Negative Indexing

Python supports **negative indexing** to access elements from the end of the list.

```python
fruits = ["apple", "banana", "cherry", "date"]

# Negative indices
print(fruits[-1])  # "date" (last item)
print(fruits[-2])  # "cherry" (second to last)
print(fruits[-3])  # "banana"
print(fruits[-4])  # "apple" (first item)
```

**Index mapping:**
```
 Index:     0         1          2         3
           ↓         ↓          ↓         ↓
fruits = ["apple", "banana", "cherry", "date"]
           ↑         ↑          ↑         ↑
 Index:    -4        -3         -2        -1
```

## Modifying List Elements

Lists are **mutable**, meaning you can change their contents after creation.

```python
numbers = [1, 2, 3, 4, 5]

# Change a single element
numbers[0] = 10
print(numbers)  # [10, 2, 3, 4, 5]

# Change last element
numbers[-1] = 50
print(numbers)  # [10, 2, 3, 4, 50]

# Modify multiple elements
numbers[1] = 20
numbers[2] = 30
print(numbers)  # [10, 20, 30, 4, 50]
```

### List Mutability Example

```python
# Original list
colors = ["red", "green", "blue"]

# Modify in place
colors[1] = "yellow"
print(colors)  # ["red", "yellow", "blue"]

# This changes the list permanently
original = [1, 2, 3]
modified = original
modified[0] = 99
print(original)  # [99, 2, 3] - both variables point to same list!
```

## List Length

Use `len()` to get the number of elements in a list.

```python
fruits = ["apple", "banana", "cherry"]
print(len(fruits))  # 3

# Empty list has length 0
empty = []
print(len(empty))  # 0

# Use length for safe indexing
if len(fruits) > 0:
    last_item = fruits[len(fruits) - 1]  # "cherry"
    # Or use negative indexing: fruits[-1]
```

## Checking Membership

Use the `in` operator to check if an item exists in a list.

```python
fruits = ["apple", "banana", "cherry"]

# Check membership
print("apple" in fruits)      # True
print("grape" in fruits)      # False
print("banana" not in fruits) # False

# Use in conditional
if "apple" in fruits:
    print("We have apples!")

# Check before accessing
item = "date"
if item in fruits:
    index = fruits.index(item)
else:
    print(f"{item} not found")
```

## Practical Examples

### Example 1: Shopping Cart
```python
cart = ["milk", "bread", "eggs"]

# Check if item already in cart
item = "milk"
if item in cart:
    print(f"{item} is already in your cart")
else:
    cart.append(item)

print(f"Cart has {len(cart)} items")
```

### Example 2: Grade Management
```python
grades = [85, 92, 78, 90, 88]

# Access and modify grades
first_grade = grades[0]
last_grade = grades[-1]

# Update a grade
grades[2] = 80  # Changed from 78 to 80

# Check if failing grade exists
if any(grade < 70 for grade in grades):
    print("Warning: Failing grade detected")
```

### Example 3: Top Scores
```python
scores = [100, 250, 180, 320, 290]

# Get top 3 scores using sorting (covered later)
top_score = max(scores)
print(f"Top score: {top_score}")

# Find position of top score
top_position = scores.index(top_score)
print(f"Position: {top_position + 1}")  # +1 for human-readable position
```

### Example 4: Dynamic Data
```python
# Start with empty list
tasks = []

# Add tasks dynamically
tasks.append("Buy groceries")
tasks.append("Call dentist")
tasks.append("Finish homework")

# Check number of tasks
print(f"You have {len(tasks)} tasks")

# Access first task
if len(tasks) > 0:
    next_task = tasks[0]
    print(f"Next task: {next_task}")
```

## Index Out of Range Error

Accessing an index that doesn't exist raises an `IndexError`.

```python
fruits = ["apple", "banana", "cherry"]

# This works
print(fruits[2])  # "cherry"

# This raises IndexError
# print(fruits[5])  # IndexError: list index out of range

# Safe access pattern
index = 5
if index < len(fruits):
    print(fruits[index])
else:
    print("Index out of range")
```

## Common Mistakes

### Mistake 1: Forgetting lists start at index 0
```python
fruits = ["apple", "banana", "cherry"]

# ❌ Wrong - trying to access "first" element
# first = fruits[1]  # This is actually "banana"

# ✅ Correct
first = fruits[0]  # "apple"
```

### Mistake 2: Accessing beyond list length
```python
items = [1, 2, 3]

# ❌ Wrong - index 3 doesn't exist
# last = items[3]  # IndexError

# ✅ Correct
last = items[2]  # or items[-1]
```

### Mistake 3: Assuming lists are immutable
```python
original = [1, 2, 3]
copy = original  # Both point to same list!

copy[0] = 99
# original is also [99, 2, 3]

# ✅ Correct - create actual copy
correct_copy = original.copy()  # or list(original) or original[:]
```

## Key Takeaways

- Lists are **ordered, mutable collections** enclosed in square brackets `[]`
- Indexing starts at **0** for the first element
- **Negative indices** access elements from the end (-1 is last item)
- Lists are **mutable** - you can change elements after creation
- Use `len()` to get the number of elements
- Use `in` to check if an item exists in the list
- Always check list length to avoid `IndexError`
- Lists can contain any type of data, including other lists

## Practice

Try these exercises:
1. Create a list of your favorite movies and access the second movie
2. Create a list of numbers and change the first and last elements
3. Check if a specific number exists in a list of scores
4. Write code that safely accesses the third element of a list (handle if list is too short)

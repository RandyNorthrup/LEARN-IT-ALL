---
id: lists
title: Python Lists
chapterId: ch8-lists
order: 1
duration: 35
objectives:
  - Understand list creation and indexing
  - Master list methods and operations
  - Learn list comprehensions
---

# Python Lists

Lists are ordered, mutable collections that can hold items of any type. They're one of Python's most powerful and commonly used data structures.

## Creating Lists

```python
# Empty list
empty_list = []

# List of numbers
numbers = [1, 2, 3, 4, 5]

# List of strings
fruits = ["apple", "banana", "orange"]

# Mixed types
mixed = [1, "hello", 3.14, True]

# Nested lists
matrix = [[1, 2], [3, 4], [5, 6]]
```

## Accessing Elements

```python
fruits = ["apple", "banana", "orange", "grape"]

# Positive indexing (starts at 0)
print(fruits[0])   # apple
print(fruits[1])   # banana

# Negative indexing (from end)
print(fruits[-1])  # grape
print(fruits[-2])  # orange
```

## Slicing Lists

```python
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

print(numbers[2:5])    # [2, 3, 4]
print(numbers[:3])     # [0, 1, 2]
print(numbers[7:])     # [7, 8, 9]
print(numbers[::2])    # [0, 2, 4, 6, 8]
print(numbers[::-1])   # [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
```

## Modifying Lists

```python
fruits = ["apple", "banana", "orange"]

# Change an element
fruits[1] = "blueberry"
print(fruits)  # ["apple", "blueberry", "orange"]

# Add element to end
fruits.append("grape")
print(fruits)  # ["apple", "blueberry", "orange", "grape"]

# Insert at position
fruits.insert(1, "mango")
print(fruits)  # ["apple", "mango", "blueberry", "orange", "grape"]

# Remove element
fruits.remove("orange")
print(fruits)  # ["apple", "mango", "blueberry", "grape"]

# Remove by index
deleted = fruits.pop(2)
print(deleted)  # blueberry
print(fruits)   # ["apple", "mango", "grape"]
```

## List Methods

```python
numbers = [3, 1, 4, 1, 5, 9, 2, 6]

# Sort list
numbers.sort()
print(numbers)  # [1, 1, 2, 3, 4, 5, 6, 9]

# Reverse list
numbers.reverse()
print(numbers)  # [9, 6, 5, 4, 3, 2, 1, 1]

# Count occurrences
count = numbers.count(1)
print(count)  # 2

# Find index
index = numbers.index(5)
print(index)  # 2

# Clear list
numbers.clear()
print(numbers)  # []
```

## Looping Through Lists

```python
fruits = ["apple", "banana", "orange"]

# Method 1: Direct iteration
for fruit in fruits:
    print(fruit)

# Method 2: With index
for i in range(len(fruits)):
    print(f"{i}: {fruits[i]}")

# Method 3: enumerate()
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")
```

## List Comprehensions

Create lists in one line:

```python
# Squares of numbers
squares = [x**2 for x in range(10)]
print(squares)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# Even numbers only
evens = [x for x in range(20) if x % 2 == 0]
print(evens)  # [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# Uppercase names
names = ["alice", "bob", "charlie"]
upper_names = [name.upper() for name in names]
print(upper_names)  # ["ALICE", "BOB", "CHARLIE"]
```

## Common List Operations

```python
# Length
numbers = [1, 2, 3, 4, 5]
print(len(numbers))  # 5

# Concatenation
list1 = [1, 2, 3]
list2 = [4, 5, 6]
combined = list1 + list2
print(combined)  # [1, 2, 3, 4, 5, 6]

# Repetition
repeated = [0] * 5
print(repeated)  # [0, 0, 0, 0, 0]

# Membership
print(3 in numbers)  # True
print(10 in numbers) # False

# Min, Max, Sum
print(min(numbers))  # 1
print(max(numbers))  # 5
print(sum(numbers))  # 15
```

## Practical Examples

### Example 1: Calculate Average

```python
scores = [85, 92, 78, 90, 88]
average = sum(scores) / len(scores)
print(f"Average: {average:.2f}")  # Average: 86.60
```

### Example 2: Filter List

```python
numbers = [1, 5, 12, 3, 18, 7, 20]
large_numbers = [n for n in numbers if n > 10]
print(large_numbers)  # [12, 18, 20]
```

### Example 3: Remove Duplicates

```python
numbers = [1, 2, 2, 3, 4, 4, 5]
unique = list(set(numbers))
print(unique)  # [1, 2, 3, 4, 5]
```

## Key Takeaways

- Lists are **ordered** and **mutable**
- **Indexing** starts at 0, negative indices count from end
- **Slicing** extracts sublists: `[start:end:step]`
- Use **append()** to add, **remove()** to delete
- **List comprehensions** create lists concisely
- Lists can contain **any type** of data

## What's Next?

You've mastered lists! Next, we'll learn about **dictionaries** for storing key-value pairs.

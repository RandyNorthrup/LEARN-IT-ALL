---
id: for-loops
title: For Loops and Iteration
chapterId: ch5-loops
order: 1
duration: 30
objectives:
  - Master for loop syntax
  - Iterate over sequences
  - Understand range() function
  - Learn enumerate() and zip()
---

# For Loops and Iteration

For loops let you repeat code for each item in a sequence. They're essential for processing collections of data efficiently.

## Basic For Loop Syntax

Loop through each item in a sequence:

```python
fruits = ["apple", "banana", "cherry"]

for fruit in fruits:
    print(fruit)

# Output:
# apple
# banana
# cherry
```

**Syntax**:
- `for` keyword
- Variable name (holds current item)
- `in` keyword
- Sequence to iterate over
- Colon `:`
- Indented code block

## Looping Over Strings

Strings are sequences of characters:

```python
for char in "Hello":
    print(char)

# Output:
# H
# e
# l
# l
# o
```

## The range() Function

Generate sequences of numbers:

```python
# range(stop) - from 0 to stop-1
for i in range(5):
    print(i)
# Output: 0, 1, 2, 3, 4

# range(start, stop)
for i in range(2, 6):
    print(i)
# Output: 2, 3, 4, 5

# range(start, stop, step)
for i in range(0, 10, 2):
    print(i)
# Output: 0, 2, 4, 6, 8

# Countdown with negative step
for i in range(10, 0, -1):
    print(i)
# Output: 10, 9, 8, 7, 6, 5, 4, 3, 2, 1
```

## Looping with Index: enumerate()

Get both index and value:

```python
fruits = ["apple", "banana", "cherry"]

for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

# Output:
# 0: apple
# 1: banana
# 2: cherry

# Start index from 1
for index, fruit in enumerate(fruits, start=1):
    print(f"{index}. {fruit}")

# Output:
# 1. apple
# 2. banana
# 3. cherry
```

## Looping Multiple Lists: zip()

Iterate over multiple sequences simultaneously:

```python
names = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 35]

for name, age in zip(names, ages):
    print(f"{name} is {age} years old")

# Output:
# Alice is 25 years old
# Bob is 30 years old
# Charlie is 35 years old
```

Zip stops at shortest list:

```python
numbers = [1, 2, 3]
letters = ["a", "b"]

for num, letter in zip(numbers, letters):
    print(num, letter)

# Output:
# 1 a
# 2 b
# (stops after 2 pairs)
```

## Nested For Loops

Loops inside loops:

```python
for i in range(3):
    for j in range(3):
        print(f"({i}, {j})", end=" ")
    print()  # New line after inner loop

# Output:
# (0, 0) (0, 1) (0, 2) 
# (1, 0) (1, 1) (1, 2) 
# (2, 0) (2, 1) (2, 2)
```

### Multiplication Table

```python
for i in range(1, 6):
    for j in range(1, 6):
        print(f"{i * j:3}", end=" ")
    print()

# Output:
#   1   2   3   4   5 
#   2   4   6   8  10 
#   3   6   9  12  15 
#   4   8  12  16  20 
#   5  10  15  20  25
```

## Loop Patterns

### Pattern 1: Accumulator

Sum values:

```python
numbers = [1, 2, 3, 4, 5]
total = 0

for num in numbers:
    total += num

print(total)  # 15
```

### Pattern 2: Counter

Count occurrences:

```python
fruits = ["apple", "banana", "apple", "cherry", "apple"]
apple_count = 0

for fruit in fruits:
    if fruit == "apple":
        apple_count += 1

print(apple_count)  # 3
```

### Pattern 3: Filter

Build new list with filtered items:

```python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = []

for num in numbers:
    if num % 2 == 0:
        evens.append(num)

print(evens)  # [2, 4, 6, 8, 10]
```

### Pattern 4: Transform

Create modified list:

```python
numbers = [1, 2, 3, 4, 5]
squared = []

for num in numbers:
    squared.append(num ** 2)

print(squared)  # [1, 4, 9, 16, 25]
```

### Pattern 5: Search

Find first match:

```python
names = ["Alice", "Bob", "Charlie", "David"]
target = "Charlie"

for i, name in enumerate(names):
    if name == target:
        print(f"Found at index {i}")
        break
# Output: Found at index 2
```

## Practical Examples

### Example 1: Calculate Average

```python
def calculate_average(numbers):
    """Calculate average of numbers"""
    if not numbers:
        return 0
    
    total = 0
    for num in numbers:
        total += num
    
    return total / len(numbers)

scores = [85, 92, 78, 90, 88]
print(f"Average: {calculate_average(scores):.1f}")  # 86.6
```

### Example 2: Find Maximum

```python
def find_max(numbers):
    """Find maximum value"""
    if not numbers:
        return None
    
    max_val = numbers[0]
    for num in numbers:
        if num > max_val:
            max_val = num
    
    return max_val

values = [3, 7, 2, 9, 5, 1]
print(f"Maximum: {find_max(values)}")  # 9
```

### Example 3: Count Vowels

```python
def count_vowels(text):
    """Count vowels in text"""
    vowels = "aeiouAEIOU"
    count = 0
    
    for char in text:
        if char in vowels:
            count += 1
    
    return count

sentence = "Hello World"
print(f"Vowels: {count_vowels(sentence)}")  # 3
```

### Example 4: Reverse String

```python
def reverse_string(text):
    """Reverse a string"""
    reversed_text = ""
    
    for char in text:
        reversed_text = char + reversed_text
    
    return reversed_text

print(reverse_string("hello"))  # olleh
```

### Example 5: Matrix Operations

```python
def print_matrix(matrix):
    """Print 2D matrix"""
    for row in matrix:
        for val in row:
            print(f"{val:4}", end=" ")
        print()

matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

print_matrix(matrix)
# Output:
#    1    2    3 
#    4    5    6 
#    7    8    9
```

### Example 6: Generate Pairs

```python
def generate_pairs(items):
    """Generate all unique pairs"""
    pairs = []
    
    for i in range(len(items)):
        for j in range(i + 1, len(items)):
            pairs.append((items[i], items[j]))
    
    return pairs

letters = ["A", "B", "C"]
print(generate_pairs(letters))
# [('A', 'B'), ('A', 'C'), ('B', 'C')]
```

### Example 7: Shopping Cart Total

```python
def calculate_cart_total(items):
    """Calculate shopping cart total"""
    total = 0
    
    for item in items:
        price = item["price"]
        quantity = item["quantity"]
        total += price * quantity
    
    return total

cart = [
    {"name": "Apple", "price": 1.50, "quantity": 3},
    {"name": "Banana", "price": 0.75, "quantity": 5},
    {"name": "Orange", "price": 2.00, "quantity": 2}
]

print(f"Total: ${calculate_cart_total(cart):.2f}")  # $12.25
```

### Example 8: Grade Report

```python
def generate_grade_report(students):
    """Generate grade report"""
    for student in students:
        name = student["name"]
        scores = student["scores"]
        average = sum(scores) / len(scores)
        
        if average >= 90:
            grade = "A"
        elif average >= 80:
            grade = "B"
        elif average >= 70:
            grade = "C"
        else:
            grade = "F"
        
        print(f"{name}: {average:.1f} ({grade})")

students = [
    {"name": "Alice", "scores": [92, 88, 95]},
    {"name": "Bob", "scores": [78, 82, 80]},
    {"name": "Charlie", "scores": [95, 98, 92]}
]

generate_grade_report(students)
# Alice: 91.7 (A)
# Bob: 80.0 (B)
# Charlie: 95.0 (A)
```

## Loop Performance Tips

### Tip 1: Avoid Growing Lists in Loops

```python
# ❌ Slower - repeated append operations
result = []
for i in range(1000000):
    result.append(i * 2)

# ✅ Faster - list comprehension
result = [i * 2 for i in range(1000000)]
```

### Tip 2: Don't Modify List While Iterating

```python
# ❌ Dangerous - modifying while iterating
numbers = [1, 2, 3, 4, 5]
for num in numbers:
    if num % 2 == 0:
        numbers.remove(num)  # Can skip items!

# ✅ Safe - iterate over copy or build new list
numbers = [1, 2, 3, 4, 5]
numbers = [num for num in numbers if num % 2 != 0]
```

### Tip 3: Use Built-in Functions

```python
# ❌ Manual loop
numbers = [1, 2, 3, 4, 5]
total = 0
for num in numbers:
    total += num

# ✅ Built-in function (faster)
total = sum(numbers)
```

## Common Mistakes

### Mistake 1: Off-by-One Errors

```python
# ❌ Misses last element
for i in range(len(items) - 1):  # Wrong!
    print(items[i])

# ✅ Includes all elements
for i in range(len(items)):
    print(items[i])

# ✅ Even better - iterate directly
for item in items:
    print(item)
```

### Mistake 2: Unnecessary Index

```python
# ❌ Unnecessary index
fruits = ["apple", "banana", "cherry"]
for i in range(len(fruits)):
    print(fruits[i])

# ✅ Direct iteration
for fruit in fruits:
    print(fruit)
```

### Mistake 3: Modifying Loop Variable

```python
# ❌ Doesn't affect loop
for i in range(5):
    i += 10  # This doesn't change the loop!
    print(i)  # Prints 10, 11, 12, 13, 14
```

## Key Takeaways

- **For loops** iterate over sequences
- **range()** generates number sequences
- **enumerate()** provides index and value
- **zip()** iterates multiple lists together
- **Nested loops** for multi-dimensional iteration
- Common patterns: accumulator, counter, filter, transform
- Prefer **direct iteration** over indexing
- Use **built-in functions** when available

## What's Next?

You've mastered for loops! Next, we'll explore **while loops** and **loop control statements** (break, continue, pass).

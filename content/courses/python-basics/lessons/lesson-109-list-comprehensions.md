---
id: list-comprehensions
title: List Comprehensions
chapterId: ch8-lists
order: 36
duration: 30
objectives:
  - Understand list comprehension syntax
  - Transform lists using comprehensions
  - Filter lists with conditional comprehensions
  - Use nested comprehensions for multi-dimensional data
  - Choose between comprehensions and loops
---

# List Comprehensions

List comprehensions provide a concise, Pythonic way to create and transform lists. They're more readable and often faster than traditional loops.

## Basic Syntax

The basic syntax: `[expression for item in iterable]`

```python
# Traditional loop
squares = []
for x in range(5):
    squares.append(x ** 2)
print(squares)  # [0, 1, 4, 9, 16]

# List comprehension (equivalent)
squares = [x ** 2 for x in range(5)]
print(squares)  # [0, 1, 4, 9, 16]
```

## Creating Lists

### Transform Elements

```python
# Double each number
numbers = [1, 2, 3, 4, 5]
doubled = [x * 2 for x in numbers]
print(doubled)  # [2, 4, 6, 8, 10]

# Convert to uppercase
words = ["hello", "world"]
upper = [word.upper() for word in words]
print(upper)  # ["HELLO", "WORLD"]

# Get lengths
names = ["Alice", "Bob", "Charlie"]
lengths = [len(name) for name in names]
print(lengths)  # [5, 3, 7]

# Extract first characters
first_chars = [name[0] for name in names]
print(first_chars)  # ["A", "B", "C"]
```

## Conditional Comprehensions

Add `if` condition to filter elements.

### Filter with Condition

```python
# Get even numbers only
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = [x for x in numbers if x % 2 == 0]
print(evens)  # [2, 4, 6, 8, 10]

# Get numbers greater than 5
greater_than_5 = [x for x in numbers if x > 5]
print(greater_than_5)  # [6, 7, 8, 9, 10]

# Get long words (length > 4)
words = ["hi", "hello", "world", "python", "code"]
long_words = [word for word in words if len(word) > 4]
print(long_words)  # ["hello", "world", "python"]
```

### Transform and Filter

```python
# Square only even numbers
numbers = [1, 2, 3, 4, 5, 6]
even_squares = [x ** 2 for x in numbers if x % 2 == 0]
print(even_squares)  # [4, 16, 36]

# Uppercase only words starting with 'p'
words = ["python", "java", "perl", "ruby"]
p_words = [word.upper() for word in words if word.startswith('p')]
print(p_words)  # ["PYTHON", "PERL"]

# Positive numbers only, doubled
numbers = [-2, -1, 0, 1, 2, 3]
positive_doubled = [x * 2 for x in numbers if x > 0]
print(positive_doubled)  # [2, 4, 6]
```

## If-Else in Comprehensions

Use if-else as part of the expression (ternary operator style).

```python
# Classify as even or odd
numbers = [1, 2, 3, 4, 5]
labels = ["even" if x % 2 == 0 else "odd" for x in numbers]
print(labels)  # ["odd", "even", "odd", "even", "odd"]

# Absolute values
numbers = [-2, -1, 0, 1, 2]
absolute = [x if x >= 0 else -x for x in numbers]
print(absolute)  # [2, 1, 0, 1, 2]

# Cap values at 10
values = [5, 15, 8, 20, 3]
capped = [x if x <= 10 else 10 for x in values]
print(capped)  # [5, 10, 8, 10, 3]
```

## Multiple Iterables

### Using zip()

```python
# Combine two lists
names = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 35]

# Create tuples
people = [(name, age) for name, age in zip(names, ages)]
print(people)  # [("Alice", 25), ("Bob", 30), ("Charlie", 35)]

# Create formatted strings
descriptions = [f"{name} is {age} years old" 
                for name, age in zip(names, ages)]
print(descriptions)
# ["Alice is 25 years old", "Bob is 30 years old", "Charlie is 35 years old"]
```

### Cartesian Product

```python
# Generate all combinations
colors = ["red", "green"]
sizes = ["S", "M", "L"]

combinations = [(color, size) for color in colors for size in sizes]
print(combinations)
# [("red", "S"), ("red", "M"), ("red", "L"),
#  ("green", "S"), ("green", "M"), ("green", "L")]

# Generate coordinate grid
coords = [(x, y) for x in range(3) for y in range(3)]
print(coords)
# [(0, 0), (0, 1), (0, 2), (1, 0), (1, 1), (1, 2), (2, 0), (2, 1), (2, 2)]
```

## Nested Comprehensions

Create nested lists (lists of lists).

```python
# Create 3x3 matrix
matrix = [[i * j for j in range(3)] for i in range(3)]
print(matrix)
# [[0, 0, 0], [0, 1, 2], [0, 2, 4]]

# Flatten nested list
nested = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat = [num for row in nested for num in row]
print(flat)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]

# Filter nested list
nested = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
evens = [num for row in nested for num in row if num % 2 == 0]
print(evens)  # [2, 4, 6, 8]
```

## Practical Examples

### Example 1: Parse Data
```python
# Extract numbers from strings
data = ["apple:5", "banana:3", "cherry:8"]
quantities = [int(item.split(':')[1]) for item in data]
print(quantities)  # [5, 3, 8]

# Parse CSV-like data
csv_data = ["John,25,NYC", "Jane,30,LA", "Bob,35,SF"]
names = [row.split(',')[0] for row in csv_data]
print(names)  # ["John", "Jane", "Bob"]
```

### Example 2: Data Validation
```python
# Filter valid emails
emails = ["user@example.com", "invalid", "admin@site.org", "bad@"]
valid = [email for email in emails if '@' in email and '.' in email]
print(valid)  # ["user@example.com", "admin@site.org"]

# Filter valid scores
scores = [85, -5, 102, 78, 95, 110]
valid_scores = [s for s in scores if 0 <= s <= 100]
print(valid_scores)  # [85, 78, 95]
```

### Example 3: Text Processing
```python
# Remove punctuation
text = "Hello, World! How are you?"
clean = [char for char in text if char.isalnum() or char.isspace()]
clean_text = ''.join(clean)
print(clean_text)  # "Hello World How are you"

# Extract digits
text = "Call 555-1234 or 555-5678"
digits = [char for char in text if char.isdigit()]
phone_digits = ''.join(digits)
print(phone_digits)  # "55512345555678"
```

### Example 4: Mathematical Operations
```python
# Fahrenheit to Celsius conversion
fahrenheit = [32, 68, 86, 104]
celsius = [(f - 32) * 5/9 for f in fahrenheit]
print(celsius)  # [0.0, 20.0, 30.0, 40.0]

# Calculate discounts
prices = [100, 200, 50, 150]
discounted = [p * 0.9 for p in prices]  # 10% off
print(discounted)  # [90.0, 180.0, 45.0, 135.0]
```

### Example 5: Generate Test Data
```python
# Generate user IDs
user_ids = [f"user_{i:03d}" for i in range(1, 6)]
print(user_ids)  # ["user_001", "user_002", "user_003", "user_004", "user_005"]

# Generate test scores
import random
random.seed(42)
scores = [random.randint(60, 100) for _ in range(10)]
print(scores)  # Random scores between 60-100
```

### Example 6: Working with Indices
```python
# Get indices of matching elements
numbers = [10, 20, 30, 20, 40, 20]
indices = [i for i, x in enumerate(numbers) if x == 20]
print(indices)  # [1, 3, 5]

# Swap pairs using indices
data = [1, 2, 3, 4, 5, 6]
swapped = [data[i+1] if i % 2 == 0 else data[i-1] 
           for i in range(len(data))]
print(swapped)  # [2, 1, 4, 3, 6, 5]
```

## Performance Considerations

List comprehensions are generally faster than loops.

```python
# Performance comparison (conceptual)
import time

# Using loop
start = time.time()
result1 = []
for i in range(1000000):
    result1.append(i * 2)
loop_time = time.time() - start

# Using comprehension
start = time.time()
result2 = [i * 2 for i in range(1000000)]
comp_time = time.time() - start

print(f"Loop: {loop_time:.4f}s")
print(f"Comprehension: {comp_time:.4f}s")
# Comprehension is typically 20-30% faster
```

## When to Use Comprehensions

### Use Comprehensions When:
- Creating simple transformations
- Filtering based on conditions
- Code fits on one or two lines
- Logic is straightforward

```python
# ✅ Good - simple and clear
squares = [x ** 2 for x in range(10)]
evens = [x for x in numbers if x % 2 == 0]
upper = [s.upper() for s in words]
```

### Use Loops When:
- Logic is complex
- Multiple statements needed
- Need intermediate variables
- Code becomes hard to read

```python
# ❌ Bad - too complex for comprehension
result = [
    process(x, y, z) 
    for x in range(10) 
    for y in range(10) 
    if x != y 
    for z in range(10) 
    if validate(x, y, z)
]

# ✅ Better - use loop for clarity
result = []
for x in range(10):
    for y in range(10):
        if x != y:
            for z in range(10):
                if validate(x, y, z):
                    result.append(process(x, y, z))
```

## Common Mistakes

### Mistake 1: If-else syntax confusion
```python
# ❌ Wrong - if at end is for filtering only
# result = [x ** 2 for x in numbers else 0]  # SyntaxError

# ✅ Correct - if-else goes before the for
result = [x ** 2 if x > 0 else 0 for x in numbers]
```

### Mistake 2: Overcomplicating
```python
# ❌ Bad - too complex, hard to read
result = [
    func1(func2(x)) if cond1(x) else func3(x) 
    for x in data 
    if cond2(x) and cond3(x)
]

# ✅ Better - use regular loop
result = []
for x in data:
    if cond2(x) and cond3(x):
        if cond1(x):
            result.append(func1(func2(x)))
        else:
            result.append(func3(x))
```

### Mistake 3: Unnecessary comprehensions
```python
# ❌ Bad - just use list()
digits = [d for d in "12345"]

# ✅ Better
digits = list("12345")

# ❌ Bad - just use range()
numbers = [i for i in range(10)]

# ✅ Better
numbers = list(range(10))
```

## Key Takeaways

- **Basic syntax**: `[expression for item in iterable]`
- **With filter**: `[expression for item in iterable if condition]`
- **With if-else**: `[expr1 if condition else expr2 for item in iterable]`
- **Nested**: `[expr for item1 in iter1 for item2 in iter2]`
- Comprehensions are more **concise and faster** than loops
- Use for **simple transformations and filters**
- Use **loops for complex logic**
- Keep comprehensions **readable** - one or two lines max

## Practice

Try these exercises:
1. Create a list of squares for numbers 1-20
2. Filter out all negative numbers from a list
3. Convert list of temperatures from Fahrenheit to Celsius
4. Create all coordinate pairs (x, y) where both x and y are 0-4
5. Flatten a nested list of numbers

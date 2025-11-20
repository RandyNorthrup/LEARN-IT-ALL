---
id: "96-list-comprehensions"
title: "List Comprehensions"
chapterId: ch5-loops
order: 7
duration: 25
objectives:
  - Master list comprehension syntax
  - Convert loops to comprehensions
  - Use conditional logic in comprehensions
  - Understand when to use comprehensions vs loops
---

# List Comprehensions

List comprehensions provide a concise way to create lists. They're faster and more Pythonic than traditional loops for transforming and filtering data.

## Basic Syntax

```python
# Traditional loop
squares = []
for i in range(10):
    squares.append(i ** 2)
print(squares)
# [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# List comprehension (equivalent)
squares = [i ** 2 for i in range(10)]
print(squares)
# [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# General syntax: [expression for item in iterable]
```

## Transforming Lists

```python
# Convert to uppercase
words = ["hello", "world", "python"]
upper_words = [word.upper() for word in words]
print(upper_words)
# ['HELLO', 'WORLD', 'PYTHON']

# Get string lengths
lengths = [len(word) for word in words]
print(lengths)
# [5, 5, 6]

# Multiply each number by 10
numbers = [1, 2, 3, 4, 5]
tens = [n * 10 for n in numbers]
print(tens)
# [10, 20, 30, 40, 50]

# Extract first character
first_chars = [word[0] for word in words]
print(first_chars)
# ['h', 'w', 'p']

# Complex transformation
prices = [10.00, 20.50, 30.75]
with_tax = [price * 1.08 for price in prices]
print(with_tax)
# [10.8, 22.14, 33.21]
```

## Filtering with Conditions

```python
# Syntax: [expression for item in iterable if condition]

# Get even numbers
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = [n for n in numbers if n % 2 == 0]
print(evens)
# [2, 4, 6, 8, 10]

# Get odd numbers
odds = [n for n in numbers if n % 2 != 0]
print(odds)
# [1, 3, 5, 7, 9]

# Filter strings by length
words = ["a", "ab", "abc", "abcd", "abcde"]
long_words = [word for word in words if len(word) >= 3]
print(long_words)
# ['abc', 'abcd', 'abcde']

# Get positive numbers
numbers = [-5, -2, 0, 3, 8, -1, 10]
positives = [n for n in numbers if n > 0]
print(positives)
# [3, 8, 10]

# Filter by string content
words = ["apple", "banana", "cherry", "apricot"]
a_words = [word for word in words if word.startswith('a')]
print(a_words)
# ['apple', 'apricot']
```

## Conditional Expressions

```python
# Syntax: [expr_if_true if condition else expr_if_false for item in iterable]

# Replace negatives with zero
numbers = [-5, 3, -2, 8, -1, 10]
non_negative = [n if n >= 0 else 0 for n in numbers]
print(non_negative)
# [0, 3, 0, 8, 0, 10]

# Label even/odd
numbers = [1, 2, 3, 4, 5]
labels = ["even" if n % 2 == 0 else "odd" for n in numbers]
print(labels)
# ['odd', 'even', 'odd', 'even', 'odd']

# Clamp values to range
values = [5, 15, 25, 35, 45]
clamped = [v if v <= 30 else 30 for v in values]
print(clamped)
# [5, 15, 25, 30, 30]

# Apply discount to expensive items
prices = [5, 15, 25, 35, 45]
sale_prices = [p * 0.8 if p > 20 else p for p in prices]
print(sale_prices)
# [5, 15, 20.0, 28.0, 36.0]
```

## Nested Comprehensions

```python
# Flatten 2D list
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat = [num for row in matrix for num in row]
print(flat)
# [1, 2, 3, 4, 5, 6, 7, 8, 9]

# Create pairs
colors = ["red", "green", "blue"]
sizes = ["S", "M", "L"]
products = [f"{size}-{color}" for color in colors for size in sizes]
print(products)
# ['S-red', 'M-red', 'L-red', 'S-green', 'M-green', 'L-green', 'S-blue', 'M-blue', 'L-blue']

# Create multiplication table
table = [[i * j for j in range(1, 6)] for i in range(1, 6)]
for row in table:
    print(row)
# [1, 2, 3, 4, 5]
# [2, 4, 6, 8, 10]
# [3, 6, 9, 12, 15]
# [4, 8, 12, 16, 20]
# [5, 10, 15, 20, 25]

# Coordinates grid
coords = [(x, y) for x in range(3) for y in range(3)]
print(coords)
# [(0, 0), (0, 1), (0, 2), (1, 0), (1, 1), (1, 2), (2, 0), (2, 1), (2, 2)]
```

## With Functions

```python
# Apply function to each element
def square(x):
    return x ** 2

numbers = [1, 2, 3, 4, 5]
squared = [square(n) for n in numbers]
print(squared)
# [1, 4, 9, 16, 25]

# Method calls
words = ["Hello", "World", "Python"]
lowercase = [word.lower() for word in words]
print(lowercase)
# ['hello', 'world', 'python']

# String operations
texts = ["  hello  ", "  world  ", "  python  "]
cleaned = [text.strip() for text in texts]
print(cleaned)
# ['hello', 'world', 'python']

# Type conversion
string_numbers = ["1", "2", "3", "4", "5"]
integers = [int(s) for s in string_numbers]
print(integers)
# [1, 2, 3, 4, 5]

# Complex functions
def process(x):
    return x * 2 if x % 2 == 0 else x * 3

numbers = [1, 2, 3, 4, 5]
processed = [process(n) for n in numbers]
print(processed)
# [3, 4, 9, 8, 15]
```

## Working with Strings

```python
# Split string into characters
text = "Python"
chars = [c for c in text]
print(chars)
# ['P', 'y', 't', 'h', 'o', 'n']

# Get ASCII values
ascii_vals = [ord(c) for c in text]
print(ascii_vals)
# [80, 121, 116, 104, 111, 110]

# Filter vowels
vowels = [c for c in text.lower() if c in 'aeiou']
print(vowels)
# ['o']

# Extract digits from string
text = "Room 42 at Building 7"
digits = [c for c in text if c.isdigit()]
print(''.join(digits))
# 427

# Process words in sentence
sentence = "The quick brown fox"
word_lengths = [len(word) for word in sentence.split()]
print(word_lengths)
# [3, 5, 5, 3]
```

## Working with Ranges

```python
# First 10 cubes
cubes = [i ** 3 for i in range(1, 11)]
print(cubes)
# [1, 8, 27, 64, 125, 216, 343, 512, 729, 1000]

# Fibonacci-like sequence
n = 10
fib = [0, 1]
fib.extend([fib[i-1] + fib[i-2] for i in range(2, n)])
print(fib)
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

# Alternating signs
alternating = [i if i % 2 == 0 else -i for i in range(1, 11)]
print(alternating)
# [-1, 2, -3, 4, -5, 6, -7, 8, -9, 10]

# Triangular numbers
triangular = [i * (i + 1) // 2 for i in range(1, 11)]
print(triangular)
# [1, 3, 6, 10, 15, 21, 28, 36, 45, 55]
```

## Dictionary and Set Operations

```python
# Extract values from list of dicts
users = [
    {"name": "Alice", "age": 25},
    {"name": "Bob", "age": 30},
    {"name": "Charlie", "age": 35}
]

names = [user["name"] for user in users]
print(names)
# ['Alice', 'Bob', 'Charlie']

ages = [user["age"] for user in users]
print(ages)
# [25, 30, 35]

# Filter dictionaries
adults = [user for user in users if user["age"] >= 18]
print(adults)
# [{'name': 'Alice', 'age': 25}, {'name': 'Bob', 'age': 30}, {'name': 'Charlie', 'age': 35}]

# Transform dictionary values
salaries = {"Alice": 50000, "Bob": 60000, "Charlie": 55000}
raised = {name: salary * 1.1 for name, salary in salaries.items()}
print(raised)
# {'Alice': 55000.0, 'Bob': 66000.0, 'Charlie': 60500.0}
```

## Performance Comparison

```python
import time

n = 100000

# Using loop
start = time.time()
result1 = []
for i in range(n):
    result1.append(i ** 2)
loop_time = time.time() - start

# Using list comprehension
start = time.time()
result2 = [i ** 2 for i in range(n)]
comp_time = time.time() - start

print(f"Loop: {loop_time:.4f}s")
print(f"Comprehension: {comp_time:.4f}s")
print(f"Comprehension is {loop_time/comp_time:.2f}x faster")

# Comprehension is typically 1.5-2x faster!
```

## When to Use Comprehensions

```python
# ✅ GOOD: Simple transformations
squares = [x ** 2 for x in range(10)]

# ✅ GOOD: Filtering
evens = [x for x in range(20) if x % 2 == 0]

# ✅ GOOD: String processing
upper_words = [word.upper() for word in words]

# ❌ BAD: Complex logic (use loop instead)
# Hard to read
result = [
    x * 2 if x > 10 else x * 3 if x > 5 else x * 4
    for x in numbers
    if x % 2 == 0 and x > 0 or x < -10
]

# ✅ BETTER: Use regular loop
result = []
for x in numbers:
    if (x % 2 == 0 and x > 0) or x < -10:
        if x > 10:
            result.append(x * 2)
        elif x > 5:
            result.append(x * 3)
        else:
            result.append(x * 4)

# ❌ BAD: Side effects
# Don't modify external state in comprehension
counter = 0
# Bad! Don't do this
# [counter := counter + 1 for _ in range(10)]

# ✅ GOOD: Use loop for side effects
counter = 0
for _ in range(10):
    counter += 1
```

## Common Patterns

```python
# Pattern 1: Transform and filter
numbers = range(1, 21)
even_squares = [n ** 2 for n in numbers if n % 2 == 0]
print(even_squares)
# [4, 16, 36, 64, 100, 144, 196, 256, 324, 400]

# Pattern 2: Nested iteration
matrix = [[1, 2, 3], [4, 5, 6]]
all_elements = [elem for row in matrix for elem in row]
print(all_elements)
# [1, 2, 3, 4, 5, 6]

# Pattern 3: Conditional transformation
numbers = [-5, 3, -2, 8, -1]
absolute = [abs(n) if n < 0 else n for n in numbers]
print(absolute)
# [5, 3, 2, 8, 1]

# Pattern 4: Zip with comprehension
names = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 35]
combined = [f"{name} ({age})" for name, age in zip(names, ages)]
print(combined)
# ['Alice (25)', 'Bob (30)', 'Charlie (35)']

# Pattern 5: Enumerate with comprehension
words = ["apple", "banana", "cherry"]
indexed = [f"{i}: {word}" for i, word in enumerate(words, 1)]
print(indexed)
# ['1: apple', '2: banana', '3: cherry']
```

## Practical Examples

```python
# Parse CSV-like data
csv_line = "Alice,25,NYC"
fields = [field.strip() for field in csv_line.split(',')]
print(fields)
# ['Alice', '25', 'NYC']

# Remove duplicates while preserving order
numbers = [1, 2, 2, 3, 1, 4, 3, 5]
seen = set()
unique = [x for x in numbers if not (x in seen or seen.add(x))]
print(unique)
# [1, 2, 3, 4, 5]

# Create file paths
folders = ["images", "videos", "documents"]
files = ["file1.txt", "file2.txt"]
paths = [f"{folder}/{file}" for folder in folders for file in files]
print(paths)
# ['images/file1.txt', 'images/file2.txt', 'videos/file1.txt', 'videos/file2.txt', 'documents/file1.txt', 'documents/file2.txt']

# Extract numbers from mixed list
mixed = [1, "hello", 2, "world", 3.5, True, None, 4]
numbers = [x for x in mixed if isinstance(x, (int, float)) and not isinstance(x, bool)]
print(numbers)
# [1, 2, 3.5, 4]

# Generate HTML list
items = ["Python", "JavaScript", "Ruby"]
html_items = [f"<li>{item}</li>" for item in items]
html_list = "<ul>\n  " + "\n  ".join(html_items) + "\n</ul>"
print(html_list)
# <ul>
#   <li>Python</li>
#   <li>JavaScript</li>
#   <li>Ruby</li>
# </ul>
```

## Summary

**Basic Syntax:**
```python
# Transform
[expression for item in iterable]

# Filter
[expression for item in iterable if condition]

# Conditional expression
[expr_if_true if condition else expr_if_false for item in iterable]

# Nested
[expr for item1 in iter1 for item2 in iter2]
```

**Advantages:**
- More concise than loops
- Often faster (1.5-2x)
- More Pythonic
- Returns new list automatically

**When to Use:**
- ✅ Simple transformations
- ✅ Filtering with simple conditions
- ✅ Mapping functions over sequences
- ✅ Flattening nested lists

**When NOT to Use:**
- ❌ Complex logic (hard to read)
- ❌ Side effects needed
- ❌ Multiple statements required
- ❌ Exception handling needed

**Best Practices:**
- Keep comprehensions simple and readable
- Use descriptive variable names
- Break complex comprehensions into regular loops
- One transformation or filter per comprehension
- Limit nesting to 2 levels maximum

List comprehensions are powerful, but readability always comes first!

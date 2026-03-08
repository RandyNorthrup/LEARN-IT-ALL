---
id: lesson-183-tuple-unpacking
title: "Tuple Unpacking and Multiple Assignment"
chapterId: ch15-tuples
order: 3
duration: 25
objectives:
  - Unpack tuples into individual variables using multiple assignment
  - Swap variable values elegantly using tuple unpacking
  - Use star expressions (*) to capture remaining elements
  - Apply tuple unpacking in for loops with dict.items() and enumerate()
  - Return and unpack multiple values from functions
  - Use advanced unpacking patterns for nested data and ignored values
---

# Tuple Unpacking and Multiple Assignment

One of Python's most elegant features is **tuple unpacking** (also called **destructuring** or **sequence unpacking**). It lets you extract individual values from a tuple and assign them to separate variables in a single statement. Once you internalize this pattern, you'll use it everywhere—in loops, function returns, data processing, and more.

This lesson covers basic unpacking, swapping, star expressions, unpacking in loops, function return values, and advanced patterns.

## Basic Unpacking

When you assign a tuple to multiple variables separated by commas, Python **unpacks** the tuple, matching each element to a variable by position:

```python
# Basic tuple unpacking
coordinates = (10, 20, 30)
x, y, z = coordinates

print(x)  # 10
print(y)  # 20
print(z)  # 30
```

The number of variables on the left **must match** the number of elements in the tuple, or Python raises a `ValueError`:

```python
point = (1, 2, 3)

# Too few variables
# a, b = point  # ValueError: too many values to unpack (expected 2)

# Too many variables
# a, b, c, d = point  # ValueError: not enough values to unpack (expected 4, got 3)
```

Unpacking works with any iterable, not just tuples—lists, strings, ranges, and more.

## Swapping Variables

In many languages, swapping two variables requires a temporary variable. Python's tuple unpacking makes swapping effortless:

```python
a = 10
b = 20

# Traditional swap (other languages)
# temp = a
# a = b
# b = temp

# Pythonic swap using tuple unpacking
a, b = b, a

print(a)  # 20
print(b)  # 10
```

This works because the right side `b, a` is evaluated as a tuple `(20, 10)` before it's unpacked into `a, b`.

This pattern is commonly used in algorithms. For example, in a Fibonacci sequence:

```python
def fibonacci(n):
    """Generate the first n Fibonacci numbers."""
    a, b = 0, 1
    result = []
    for _ in range(n):
        result.append(a)
        a, b = b, a + b  # Simultaneous update
    return tuple(result)

print(fibonacci(10))  # (0, 1, 1, 2, 3, 5, 8, 13, 21, 34)
```

## Star Expressions (*rest)

Sometimes you want to unpack some elements into individual variables and capture the **remaining** elements. Python 3's star expressions (`*`) handle this elegantly:

```python
numbers = (1, 2, 3, 4, 5, 6, 7)

# Capture the first element and the rest
first, *rest = numbers
print(first)  # 1
print(rest)   # [2, 3, 4, 5, 6, 7]  — note: rest is a list!

# Capture the last element and everything before it
*beginning, last = numbers
print(beginning)  # [1, 2, 3, 4, 5, 6]
print(last)       # 7

# Capture first, last, and everything in between
first, *middle, last = numbers
print(first)   # 1
print(middle)  # [2, 3, 4, 5, 6]
print(last)    # 7
```

Important details about star expressions:

1. The starred variable always becomes a **list**, even if it captures zero or one element.
2. You can only have **one** starred variable in an unpacking assignment.
3. The starred variable can be empty (an empty list):

```python
pair = (1, 2)
first, *middle, last = pair
print(first)   # 1
print(middle)  # []  — empty list
print(last)    # 2
```

Practical example—parsing a header and data rows:

```python
records = (
    ("Name", "Age", "City"),
    ("Alice", 30, "Paris"),
    ("Bob", 25, "Tokyo"),
)

header, *rows = records
print(f"Columns: {header}")
for row in rows:
    name, age, city = row
    print(f"  {name} ({age}) lives in {city}")
```

## Unpacking in For Loops

Tuple unpacking shines in `for` loops when you iterate over sequences of tuples.

### Iterating Over dict.items()

The `dict.items()` method returns key-value pairs as tuples. Unpacking them in a `for` loop is idiomatic Python:

```python
scores = {"Alice": 92, "Bob": 87, "Charlie": 95}

# Without unpacking
for item in scores.items():
    print(f"{item[0]}: {item[1]}")

# With unpacking — much cleaner
for name, score in scores.items():
    print(f"{name}: {score}")
# Alice: 92
# Bob: 87
# Charlie: 95
```

### Using enumerate()

The `enumerate()` function yields `(index, value)` tuples, perfect for unpacking:

```python
tasks = ("Write code", "Run tests", "Deploy", "Monitor")

for i, task in enumerate(tasks, start=1):
    print(f"Step {i}: {task}")
# Step 1: Write code
# Step 2: Run tests
# Step 3: Deploy
# Step 4: Monitor
```

### Iterating Over zip()

When you zip multiple sequences together, each iteration yields a tuple:

```python
names = ("Alice", "Bob", "Charlie")
ages = (30, 25, 35)
cities = ("Paris", "Tokyo", "Berlin")

for name, age, city in zip(names, ages, cities):
    print(f"{name}, age {age}, from {city}")
# Alice, age 30, from Paris
# Bob, age 25, from Tokyo
# Charlie, age 35, from Berlin
```

### Iterating Over Nested Tuples

```python
triangle = ((0, 0), (3, 0), (1.5, 4))

for x, y in triangle:
    print(f"Vertex at ({x}, {y})")
# Vertex at (0, 0)
# Vertex at (3, 0)
# Vertex at (1.5, 4)
```

## Function Return Values as Tuples

Python functions can return multiple values by returning a tuple. The caller can then unpack the result:

```python
def analyze_numbers(numbers):
    """Return statistics about a sequence of numbers."""
    return min(numbers), max(numbers), sum(numbers) / len(numbers)

data = (23, 45, 12, 67, 34, 89, 56)

minimum, maximum, average = analyze_numbers(data)
print(f"Min: {minimum}")      # Min: 12
print(f"Max: {maximum}")      # Max: 89
print(f"Average: {average:.1f}")  # Average: 46.6
```

You can also keep the result as a tuple if you prefer:

```python
stats = analyze_numbers(data)
print(stats)  # (12, 89, 46.57142857142857)
```

This pattern is used extensively in the standard library:

```python
# divmod returns (quotient, remainder)
quotient, remainder = divmod(17, 5)
print(f"17 ÷ 5 = {quotient} remainder {remainder}")
# 17 ÷ 5 = 3 remainder 2

# str.partition returns (before, separator, after)
before, sep, after = "user@example.com".partition("@")
print(f"Username: {before}, Domain: {after}")
# Username: user, Domain: example.com
```

## Unpacking Function Arguments

You can use the `*` operator to unpack a tuple as positional arguments to a function:

```python
def calculate_volume(length, width, height):
    return length * width * height

dimensions = (10, 5, 3)

# Without unpacking — doesn't work:
# calculate_volume(dimensions)  # TypeError: missing 2 required positional arguments

# With unpacking — works perfectly:
volume = calculate_volume(*dimensions)
print(f"Volume: {volume}")  # Volume: 150
```

## Ignoring Values with _

When you only need some of the values from a tuple, use `_` (underscore) as a throwaway variable by convention:

```python
# Only need the filename and extension
full_info = ("report", "2024-01-15", ".pdf", 2048)
name, _, extension, _ = full_info
print(f"File: {name}{extension}")  # File: report.pdf

# Only need the first and last from a long tuple
record = ("Alice", "M.", "Johnson", 30, "Engineer", "NYC")
first_name, *_, city = record
print(f"{first_name} from {city}")  # Alice from NYC
```

The `_` variable is just a convention—it signals that the value is intentionally ignored. Using `*_` ignores multiple values:

```python
# Get only the year from a date tuple
date = (2024, 12, 25, 14, 30, 0)
year, *_ = date
print(f"Year: {year}")  # Year: 2024

# Get the first and last only
data = (1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
first, *_, last = data
print(f"First: {first}, Last: {last}")  # First: 1, Last: 10
```

## Nested Unpacking

Python supports unpacking nested structures in a single statement:

```python
# Nested tuple unpacking
record = ("Alice", (92, 88, 95))
name, (score1, score2, score3) = record

print(f"{name}: {score1}, {score2}, {score3}")
# Alice: 92, 88, 95
```

You can nest to any depth:

```python
# Deeply nested unpacking
data = ("2024", ("Q1", (100, 200, 300)))
year, (quarter, (jan, feb, mar)) = data

print(f"{year} {quarter}: Jan={jan}, Feb={feb}, Mar={mar}")
# 2024 Q1: Jan=100, Feb=200, Mar=300
```

Nested unpacking works in `for` loops too:

```python
students = (
    ("Alice", (92, 88, 95)),
    ("Bob", (78, 85, 82)),
    ("Charlie", (95, 91, 89)),
)

for name, (test1, test2, test3) in students:
    avg = (test1 + test2 + test3) / 3
    print(f"{name}: avg = {avg:.1f}")
# Alice: avg = 91.7
# Bob: avg = 81.7
# Charlie: avg = 91.7
```

## Practical Patterns

### Coordinate Handling

```python
def distance(point1, point2):
    """Calculate distance between two 2D points."""
    x1, y1 = point1
    x2, y2 = point2
    return ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5

print(f"Distance: {distance((0, 0), (3, 4))}")  # Distance: 5.0
```

### Multiple Return Values with Error Handling

```python
def safe_divide(a, b):
    """Return (success, result_or_error)."""
    if b == 0:
        return False, "Division by zero"
    return True, a / b

success, result = safe_divide(10, 3)
if success:
    print(f"Result: {result:.2f}")  # Result: 3.33

success, result = safe_divide(10, 0)
if not success:
    print(f"Error: {result}")  # Error: Division by zero
```

## Try It Yourself

### Exercise 1: Swap Three Variables

Given `a = 1`, `b = 2`, `c = 3`, use tuple unpacking to rotate them so that `a = 3`, `b = 1`, `c = 2`. Print the values before and after.

```python
a, b, c = 1, 2, 3
print(f"Before: a={a}, b={b}, c={c}")

a, b, c = c, a, b
print(f"After:  a={a}, b={b}, c={c}")
```

### Exercise 2: Star Expression Parsing

Given a tuple of exam scores, use star expressions to separate the first score, the last score, and all middle scores. Print each group.

```python
scores = (85, 92, 78, 90, 88, 95, 76, 89)

first, *middle, last = scores
print(f"First: {first}")
print(f"Middle: {middle}")
print(f"Last: {last}")
```

### Exercise 3: Dictionary Unpacking Loop

Create a dictionary of at least five countries and their capitals. Use tuple unpacking on `dict.items()` to print each pair.

```python
capitals = {
    "France": "Paris", "Japan": "Tokyo",
    "Brazil": "Brasilia", "Australia": "Canberra", "Egypt": "Cairo",
}

for country, capital in capitals.items():
    print(f"The capital of {country} is {capital}.")
```

### Exercise 4: Multi-Value Function

Write a function `analyze_text(text)` that returns `(word_count, char_count, unique_words)`. Unpack the results.

```python
def analyze_text(text):
    words = text.split()
    return len(words), len(text), len(set(w.lower() for w in words))

words, chars, unique = analyze_text("the quick brown fox jumps over the lazy dog")
print(f"Words: {words}, Characters: {chars}, Unique: {unique}")
```

## Key Takeaways

- **Tuple unpacking** assigns individual tuple elements to separate variables: `a, b, c = (1, 2, 3)`.
- **Variable swapping** is clean and Pythonic: `a, b = b, a`—no temporary variable needed.
- **Star expressions** (`*rest`) capture remaining elements into a list. You can place the star at the beginning, middle, or end.
- **Loop unpacking** with `dict.items()`, `enumerate()`, and `zip()` makes iteration over structured data clear and concise.
- Functions can **return multiple values** as tuples, and callers unpack them naturally.
- Use `*` to **unpack a tuple as function arguments**: `func(*args_tuple)`.
- Use `_` to **ignore unwanted values** during unpacking; use `*_` to ignore multiple values.
- **Nested unpacking** lets you destructure complex structures in a single assignment.
- Tuple unpacking is one of Python's most distinctive and useful features—master it and your code becomes more readable and expressive.

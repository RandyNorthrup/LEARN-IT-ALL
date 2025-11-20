---
id: "69-variable-unpacking-patterns"
title: "Variable Unpacking Patterns"
chapterId: ch2-variables
order: 12
duration: 25
objectives:
  - Master sequence unpacking with multiple assignment
  - Use the * operator for collecting remaining values
  - Unpack nested data structures effectively
  - Apply unpacking in function arguments and returns
  - Leverage unpacking for cleaner, more Pythonic code
---

# Variable Unpacking Patterns

Variable unpacking allows you to assign multiple values from sequences (lists, tuples, strings) to multiple variables in a single statement. This powerful feature makes Python code more concise and readable.

## Basic Sequence Unpacking

Unpacking assigns each element of a sequence to a corresponding variable:

```python
# Basic tuple unpacking
coordinates = (10, 20)
x, y = coordinates
print(f"x={x}, y={y}")  # x=10, y=20

# List unpacking
colors = ["red", "green", "blue"]
primary1, primary2, primary3 = colors
print(primary1)  # red

# String unpacking
code = "ABC"
first, second, third = code
print(f"{first}-{second}-{third}")  # A-B-C

# Direct unpacking without intermediate variable
name, age = ("Alice", 30)
print(f"{name} is {age} years old")  # Alice is 30 years old
```

## The Star (*) Operator for Extended Unpacking

The `*` operator collects remaining values into a list:

```python
# Collect middle elements
first, *middle, last = [1, 2, 3, 4, 5]
print(f"First: {first}")    # First: 1
print(f"Middle: {middle}")  # Middle: [2, 3, 4]
print(f"Last: {last}")      # Last: 5

# Collect all remaining elements
head, *tail = [10, 20, 30, 40]
print(f"Head: {head}")   # Head: 10
print(f"Tail: {tail}")   # Tail: [20, 30, 40]

# Collect beginning elements
*beginning, end = ["a", "b", "c", "d"]
print(f"Beginning: {beginning}")  # Beginning: ['a', 'b', 'c']
print(f"End: {end}")              # End: d

# Star with only two elements
first, *rest = [100]
print(f"First: {first}")  # First: 100
print(f"Rest: {rest}")    # Rest: [] (empty list)
```

## Swapping Variables

Unpacking makes swapping values trivial:

```python
# Traditional swap (requires temporary variable)
a = 5
b = 10
temp = a
a = b
b = temp
print(f"a={a}, b={b}")  # a=10, b=5

# Python unpacking swap (no temporary needed)
x = 5
y = 10
x, y = y, x
print(f"x={x}, y={y}")  # x=10, y=5

# Rotate multiple variables
p, q, r = 1, 2, 3
p, q, r = r, p, q
print(f"p={p}, q={q}, r={r}")  # p=3, q=1, r=2
```

## Nested Unpacking

Unpack nested structures by matching the structure pattern:

```python
# Nested tuple unpacking
person = ("Alice", (25, "Engineer"))
name, (age, job) = person
print(f"{name}, {age}, {job}")  # Alice, 25, Engineer

# Nested list unpacking
matrix = [[1, 2], [3, 4]]
(a, b), (c, d) = matrix
print(f"a={a}, b={b}, c={c}, d={d}")  # a=1, b=2, c=3, d=4

# Mixed nesting with star operator
data = [1, [2, 3, 4], 5]
first, [*middle], last = data
print(f"First: {first}")    # First: 1
print(f"Middle: {middle}")  # Middle: [2, 3, 4]
print(f"Last: {last}")      # Last: 5

# Complex nested structure
record = ("Bob", {"city": "NYC", "zip": "10001"}, [90, 85, 95])
name, address, scores = record
print(f"{name} from {address['city']}")  # Bob from NYC
print(f"Average: {sum(scores) / len(scores)}")  # Average: 90.0
```

## Unpacking in Loops

Use unpacking to iterate over sequences of sequences:

```python
# Unpacking tuples in a list
points = [(1, 2), (3, 4), (5, 6)]
for x, y in points:
    print(f"Point: ({x}, {y})")
# Point: (1, 2)
# Point: (3, 4)
# Point: (5, 6)

# Unpacking with enumerate
names = ["Alice", "Bob", "Charlie"]
for index, name in enumerate(names):
    print(f"{index}: {name}")
# 0: Alice
# 1: Bob
# 2: Charlie

# Unpacking dictionary items
scores = {"Alice": 95, "Bob": 87, "Charlie": 92}
for name, score in scores.items():
    print(f"{name} scored {score}")
# Alice scored 95
# Bob scored 87
# Charlie scored 92

# Nested unpacking in loops
pairs = [((1, 2), (3, 4)), ((5, 6), (7, 8))]
for (a, b), (c, d) in pairs:
    print(f"Sum: {a + b + c + d}")
# Sum: 10
# Sum: 26
```

## Unpacking Function Returns

Functions can return multiple values as tuples, which can be unpacked:

```python
def get_user_info():
    """Return multiple values as a tuple."""
    return "Alice", 30, "alice@example.com"

# Unpack all return values
name, age, email = get_user_info()
print(f"{name}, {age}, {email}")  # Alice, 30, alice@example.com

def calculate_stats(numbers):
    """Return min, max, and average."""
    return min(numbers), max(numbers), sum(numbers) / len(numbers)

# Unpack calculation results
minimum, maximum, average = calculate_stats([10, 20, 30, 40, 50])
print(f"Min: {minimum}, Max: {maximum}, Avg: {average}")
# Min: 10, Max: 50, Avg: 30.0

def get_coordinates():
    """Return nested structure."""
    return (10, 20), (30, 40)

# Nested unpacking of return value
(x1, y1), (x2, y2) = get_coordinates()
print(f"Point 1: ({x1}, {y1}), Point 2: ({x2}, {y2})")
# Point 1: (10, 20), Point 2: (30, 40)
```

## Unpacking Function Arguments

Use `*` to unpack sequences into function arguments:

```python
def greet(first_name, last_name):
    """Greet someone by their full name."""
    print(f"Hello, {first_name} {last_name}!")

# Unpack list into arguments
name_parts = ["Alice", "Smith"]
greet(*name_parts)  # Hello, Alice Smith!

def calculate_total(a, b, c):
    """Calculate sum of three numbers."""
    return a + b + c

numbers = [10, 20, 30]
total = calculate_total(*numbers)
print(f"Total: {total}")  # Total: 60

# Use ** to unpack dictionaries into keyword arguments
def create_user(name, age, email):
    """Create user with named parameters."""
    print(f"User: {name}, Age: {age}, Email: {email}")

user_data = {"name": "Bob", "age": 25, "email": "bob@example.com"}
create_user(**user_data)  # User: Bob, Age: 25, Email: bob@example.com
```

## Ignoring Values with Underscore

Use `_` to explicitly ignore values you don't need:

```python
# Ignore specific values
name, _, age = ("Alice", "MiddleName", 30)
print(f"{name} is {age} years old")  # Alice is 30 years old

# Ignore multiple values with star
first, *_, last = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
print(f"First: {first}, Last: {last}")  # First: 1, Last: 10

# Ignore in loops
for _, value in [("a", 1), ("b", 2), ("c", 3)]:
    print(value)
# 1
# 2
# 3

# Ignore specific positions in nested structures
(x, _), (_, y) = [(1, 2), (3, 4)]
print(f"x={x}, y={y}")  # x=1, y=4
```

## Practical Unpacking Patterns

```python
# Parse CSV-like data
csv_line = "Alice,30,Engineer,NYC"
name, age, job, city = csv_line.split(",")
print(f"{name} ({age}) works as {job} in {city}")
# Alice (30) works as Engineer in NYC

# Process file paths
filepath = "/home/user/documents/report.pdf"
*directories, filename = filepath.split("/")
print(f"File: {filename}")  # File: report.pdf
print(f"Directories: {'/'.join(directories)}")  # Directories: /home/user/documents

# Parse key-value pairs
def parse_config(config_string):
    """Parse key=value configuration."""
    key, value = config_string.split("=")
    return key.strip(), value.strip()

setting = "max_connections = 100"
config_key, config_value = parse_config(setting)
print(f"{config_key}: {config_value}")  # max_connections: 100

# Working with ranges
first, *middle, last = range(1, 11)
print(f"First: {first}, Last: {last}")  # First: 1, Last: 10
print(f"Middle count: {len(middle)}")   # Middle count: 8
```

## Common Unpacking Errors

```python
# ValueError: Too many values to unpack
try:
    a, b = [1, 2, 3]  # 3 values, 2 variables
except ValueError as e:
    print(f"Error: {e}")  # Error: too many values to unpack (expected 2)

# ValueError: Not enough values to unpack
try:
    x, y, z = [1, 2]  # 2 values, 3 variables
except ValueError as e:
    print(f"Error: {e}")  # Error: not enough values to unpack (expected 3, got 2)

# Safe unpacking with default values
def safe_unpack(data, expected_count):
    """Safely unpack with padding."""
    data = list(data)
    # Pad with None if not enough values
    while len(data) < expected_count:
        data.append(None)
    return data[:expected_count]

# Example usage
values = safe_unpack([1, 2], 4)
a, b, c, d = values
print(f"a={a}, b={b}, c={c}, d={d}")  # a=1, b=2, c=None, d=None
```

## Best Practices

```python
# 1. Use unpacking for clarity
# Bad: Accessing indices
point = (10, 20)
x = point[0]
y = point[1]

# Good: Unpacking
x, y = point

# 2. Unpack in function signatures for clarity
def process_user((name, age)):  # Python 2 syntax (not valid in Python 3)
    pass

# Python 3 equivalent: unpack in function body
def process_user(user_tuple):
    name, age = user_tuple
    print(f"Processing {name}, age {age}")

user = ("Alice", 30)
process_user(user)  # Processing Alice, age 30

# 3. Use star for flexible functions
def log_message(level, *args):
    """Log message with variable arguments."""
    message = " ".join(str(arg) for arg in args)
    print(f"[{level}] {message}")

log_message("INFO", "User", "Alice", "logged in")
# [INFO] User Alice logged in

# 4. Combine unpacking with default values
def create_point(coordinates=(0, 0)):
    """Create point with default origin."""
    x, y = coordinates
    return {"x": x, "y": y}

print(create_point())          # {'x': 0, 'y': 0}
print(create_point((5, 10)))   # {'x': 5, 'y': 10}
```

## Summary

- **Basic unpacking**: Assign multiple values in one statement
- **Star operator** (`*`): Collect remaining values into a list
- **Swapping**: Exchange values without temporary variables
- **Nested unpacking**: Match nested structure patterns
- **Loop unpacking**: Iterate over sequences of sequences
- **Function returns**: Unpack multiple return values
- **Ignoring values**: Use `_` for values you don't need
- **Error handling**: Be aware of value count mismatches

Mastering unpacking patterns makes Python code more concise, readable, and Pythonic. Use it whenever you need to work with multiple values from sequences or function returns.

---
id: "119.5-dict-introduction"
title: "Introduction to Dictionaries"
chapterId: ch9-dictionaries
order: 1
duration: 25
objectives:
  - Understand what dictionaries are
  - Learn key-value pair concept
  - Compare dictionaries to lists
  - Create basic dictionaries
---

# Introduction to Dictionaries

Dictionaries are one of Python's most powerful and frequently used data structures. They store data as key-value pairs, allowing fast lookup by key.

## What Are Dictionaries?

A dictionary is a collection of key-value pairs where each key maps to a value.

```python
# Simple dictionary
student = {
    "name": "Alice",
    "age": 20,
    "major": "Computer Science"
}

print(student["name"])  # Output: Alice
print(student["age"])   # Output: 20
```

**Key characteristics:**
- **Unordered** (until Python 3.7, now insertion-ordered)
- **Mutable** (can be changed)
- **Keys must be unique**
- **Keys must be immutable** (strings, numbers, tuples)

## Why Use Dictionaries?

### Fast Lookup
```python
# List - slow lookup (O(n))
students_list = ["Alice", "Bob", "Charlie"]
if "Bob" in students_list:
    print("Found!")  # Must search through list

# Dictionary - fast lookup (O(1))
students_dict = {
    "alice": {"grade": 95},
    "bob": {"grade": 87},
    "charlie": {"grade": 92}
}
if "bob" in students_dict:
    print("Found!")  # Direct lookup
```

### Meaningful Keys
```python
# List - must remember index positions
student = ["Alice", 20, "Computer Science"]
print(student[0])  # What does index 0 mean?

# Dictionary - self-documenting
student = {
    "name": "Alice",
    "age": 20,
    "major": "Computer Science"
}
print(student["name"])  # Clear meaning
```

## Creating Dictionaries

### Literal Syntax
```python
# Empty dictionary
empty = {}

# With initial data
person = {
    "first_name": "John",
    "last_name": "Doe",
    "age": 30
}
```

### Using dict() Constructor
```python
# From keyword arguments
person = dict(name="Alice", age=25, city="NYC")

# From list of tuples
pairs = [("name", "Bob"), ("age", 30)]
person = dict(pairs)

# From two lists (zip)
keys = ["name", "age", "city"]
values = ["Charlie", 35, "Boston"]
person = dict(zip(keys, values))
```

## Accessing Values

```python
student = {
    "name": "Alice",
    "grade": 95,
    "enrolled": True
}

# Using square brackets
print(student["name"])  # Output: Alice

# Using get() method (safer)
print(student.get("grade"))  # Output: 95
print(student.get("email"))  # Output: None (no error)
print(student.get("email", "No email"))  # Output: No email
```

## Dictionaries vs Lists

| Feature | Dictionary | List |
|---------|-----------|------|
| Access | By key | By index |
| Order | Insertion order (3.7+) | Ordered |
| Lookup Speed | O(1) | O(n) |
| Keys | Any immutable type | Only integers |
| Duplicates | Keys must be unique | Values can duplicate |

## Common Use Cases

### 1. Configuration Settings
```python
config = {
    "database": "postgresql",
    "host": "localhost",
    "port": 5432,
    "debug": True
}
```

### 2. Counting Items
```python
word_count = {
    "python": 5,
    "java": 3,
    "javascript": 4
}
```

### 3. Storing Related Data
```python
user = {
    "username": "alice123",
    "email": "alice@example.com",
    "preferences": {
        "theme": "dark",
        "notifications": True
    }
}
```

### 4. Lookup Tables
```python
status_codes = {
    200: "OK",
    404: "Not Found",
    500: "Internal Server Error"
}
```

## Basic Operations

```python
# Create
grades = {"math": 95, "science": 87}

# Add/Update
grades["english"] = 92
grades["math"] = 98  # Update existing

# Check existence
if "math" in grades:
    print("Math grade exists")

# Get length
print(len(grades))  # Output: 3

# Delete
del grades["science"]
```

## Nested Dictionaries

```python
students = {
    "alice": {
        "age": 20,
        "grades": {"math": 95, "science": 87}
    },
    "bob": {
        "age": 22,
        "grades": {"math": 88, "science": 92}
    }
}

# Access nested values
print(students["alice"]["grades"]["math"])  # Output: 95
```

## Real-World Example: Contact Book

```python
contacts = {
    "Alice": {
        "phone": "555-1234",
        "email": "alice@example.com",
        "birthday": "1995-05-15"
    },
    "Bob": {
        "phone": "555-5678",
        "email": "bob@example.com",
        "birthday": "1992-08-22"
    }
}

# Look up contact
name = "Alice"
if name in contacts:
    print(f"Phone: {contacts[name]['phone']}")
    print(f"Email: {contacts[name]['email']}")
```

## Summary

Dictionaries are essential for:
- Fast data lookup by key
- Storing related information
- Configuration and settings
- Counting and grouping
- Mapping relationships

**Key points:**
- Use `{}` or `dict()` to create
- Keys must be unique and immutable
- Values can be any type
- Use `get()` for safe access
- O(1) lookup time makes them fast

In the next lessons, you'll learn advanced dictionary operations, methods, and patterns!

---
id: 14-advanced-type-conversion
title: Advanced Type Conversion and Casting
chapterId: ch2-variables
order: 11
duration: 25
objectives:
  - Master type conversion techniques
  - Handle conversion errors gracefully
  - Convert between complex types
  - Use custom conversion methods
  - Understand implicit vs explicit conversion
---

# Advanced Type Conversion and Casting

## Introduction

Type conversion is essential for working with different data types. This lesson covers advanced conversion techniques and best practices.

## Review: Basic Type Conversion

```python
# String to int
age = int("25")  # 25

# String to float
price = float("19.99")  # 19.99

# Number to string
count_str = str(100)  # "100"

# String to boolean
is_active = bool("True")  # True (non-empty string is truthy)
```

## Handling Conversion Errors

```python
# ✓ Good: Handle potential errors
def safe_int_convert(value, default=0):
    """Convert to int with fallback."""
    try:
        return int(value)
    except (ValueError, TypeError):
        return default

print(safe_int_convert("42"))      # 42
print(safe_int_convert("abc"))     # 0 (default)
print(safe_int_convert("42.5"))    # Raises ValueError!

# Better: Handle floats too
def safe_int_convert_v2(value, default=0):
    """Convert to int, handling floats."""
    try:
        return int(float(value))
    except (ValueError, TypeError):
        return default

print(safe_int_convert_v2("42.5"))  # 42
```

## String to Number with Validation

```python
def parse_number(value):
    """Parse string to appropriate number type."""
    if not isinstance(value, str):
        raise TypeError("Input must be string")
    
    # Remove whitespace
    value = value.strip()
    
    # Check if it's a valid number
    if not value.replace('.', '', 1).replace('-', '', 1).isdigit():
        raise ValueError(f"'{value}' is not a valid number")
    
    # Return int or float
    if '.' in value:
        return float(value)
    return int(value)

print(parse_number("42"))       # 42 (int)
print(parse_number("42.5"))     # 42.5 (float)
print(parse_number("  -10  "))  # -10 (int)
# print(parse_number("abc"))    # Raises ValueError
```

## Boolean Conversion Nuances

```python
# Truthy vs Falsy values
print(bool(1))        # True
print(bool(0))        # False
print(bool("hello"))  # True
print(bool(""))       # False
print(bool([1, 2]))   # True
print(bool([]))       # False
print(bool(None))     # False

# String "False" is truthy!
print(bool("False"))  # True (non-empty string)

# Proper string to boolean
def str_to_bool(value):
    """Convert string to boolean properly."""
    value = str(value).lower().strip()
    
    if value in ('true', '1', 'yes', 'on'):
        return True
    if value in ('false', '0', 'no', 'off', ''):
        return False
    
    raise ValueError(f"Cannot convert '{value}' to boolean")

print(str_to_bool("true"))    # True
print(str_to_bool("FALSE"))   # False
print(str_to_bool("1"))       # True
print(str_to_bool("no"))      # False
```

## List/Tuple/Set Conversion

```python
# Convert between collection types
numbers_list = [1, 2, 3, 2, 1]
numbers_tuple = tuple(numbers_list)  # (1, 2, 3, 2, 1)
numbers_set = set(numbers_list)      # {1, 2, 3} - removes duplicates

# Convert string to list
text = "hello"
chars_list = list(text)  # ['h', 'e', 'l', 'l', 'o']

# Convert range to list
numbers = list(range(5))  # [0, 1, 2, 3, 4]

# Dictionary to list
user = {"name": "Alice", "age": 30}
keys = list(user.keys())      # ['name', 'age']
values = list(user.values())  # ['Alice', 30]
items = list(user.items())    # [('name', 'Alice'), ('age', 30)]
```

## String Parsing

```python
# CSV-style string to list
data = "apple,banana,cherry"
fruits = data.split(",")  # ['apple', 'banana', 'cherry']

# Parse numbers from string
numbers_str = "10,20,30,40"
numbers = [int(x) for x in numbers_str.split(",")]  # [10, 20, 30, 40]

# With error handling
def parse_int_list(text, separator=","):
    """Parse comma-separated integers."""
    if not text:
        return []
    
    result = []
    for item in text.split(separator):
        try:
            result.append(int(item.strip()))
        except ValueError:
            print(f"Warning: Skipping invalid number '{item}'")
    
    return result

print(parse_int_list("10,20,abc,30"))  # [10, 20, 30]
# Warning: Skipping invalid number 'abc'
```

## Dictionary Conversion

```python
# List of tuples to dictionary
pairs = [("name", "Alice"), ("age", 30), ("city", "NYC")]
user = dict(pairs)  # {'name': 'Alice', 'age': 30, 'city': 'NYC'}

# Two lists to dictionary
keys = ["name", "age", "city"]
values = ["Bob", 25, "LA"]
person = dict(zip(keys, values))  # {'name': 'Bob', 'age': 25, 'city': 'LA'}

# String to dictionary (JSON-like)
import json

json_str = '{"name": "Charlie", "age": 35}'
data = json.loads(json_str)  # {'name': 'Charlie', 'age': 35}
```

## Custom Object Conversion

```python
class User:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def __str__(self):
        """String representation (informal)."""
        return f"User({self.name}, {self.age})"
    
    def __repr__(self):
        """String representation (official/debugging)."""
        return f"User(name='{self.name}', age={self.age})"
    
    def __int__(self):
        """Convert to int (returns age)."""
        return self.age
    
    def __bool__(self):
        """Convert to bool (True if age > 0)."""
        return self.age > 0

user = User("Alice", 30)
print(str(user))   # User(Alice, 30)
print(repr(user))  # User(name='Alice', age=30)
print(int(user))   # 30
print(bool(user))  # True
```

## Type Checking Before Conversion

```python
def safe_convert(value, target_type):
    """Safely convert value to target type."""
    # Already correct type
    if isinstance(value, target_type):
        return value
    
    # Convert to target type
    try:
        if target_type == bool:
            # Special handling for bool
            if isinstance(value, str):
                return str_to_bool(value)
            return bool(value)
        
        return target_type(value)
    
    except (ValueError, TypeError) as e:
        raise ValueError(
            f"Cannot convert {type(value).__name__} "
            f"to {target_type.__name__}: {e}"
        )

print(safe_convert("42", int))      # 42
print(safe_convert("42.5", float))  # 42.5
print(safe_convert(100, str))       # "100"
```

## Numeric Base Conversion

```python
# Decimal to binary/octal/hex
number = 42

binary = bin(number)   # '0b101010'
octal = oct(number)    # '0o52'
hexadecimal = hex(number)  # '0x2a'

# Remove prefix
binary_clean = bin(number)[2:]  # '101010'
hex_clean = hex(number)[2:]     # '2a'

# Binary/octal/hex to decimal
from_binary = int('101010', 2)  # 42
from_octal = int('52', 8)       # 42
from_hex = int('2a', 16)        # 42

# With error handling
def convert_base(value, from_base=10, to_base=10):
    """Convert between number bases."""
    try:
        # Convert to decimal first
        decimal = int(value, from_base) if from_base != 10 else int(value)
        
        # Convert to target base
        if to_base == 2:
            return bin(decimal)[2:]
        elif to_base == 8:
            return oct(decimal)[2:]
        elif to_base == 16:
            return hex(decimal)[2:]
        else:
            return str(decimal)
    
    except ValueError as e:
        raise ValueError(f"Conversion failed: {e}")

print(convert_base('101010', from_base=2, to_base=10))  # '42'
print(convert_base('42', from_base=10, to_base=16))     # '2a'
```

## Batch Conversion

```python
def convert_all(values, target_type, skip_errors=False):
    """Convert list of values to target type."""
    results = []
    errors = []
    
    for i, value in enumerate(values):
        try:
            converted = target_type(value)
            results.append(converted)
        except (ValueError, TypeError) as e:
            if skip_errors:
                errors.append((i, value, str(e)))
            else:
                raise ValueError(f"Error at index {i}: {e}")
    
    if errors:
        print(f"Skipped {len(errors)} invalid values")
    
    return results

# Convert string list to integers
strings = ["10", "20", "abc", "30", "xyz"]
integers = convert_all(strings, int, skip_errors=True)
print(integers)  # [10, 20, 30]
# Skipped 2 invalid values
```

## Summary

**Type Conversion Best Practices:**
- Always handle conversion errors
- Validate input before converting
- Use appropriate conversion methods
- Check types before converting
- Provide default values for errors

**Common Conversions:**
- `int()`, `float()`, `str()`: Basic types
- `bool()`: Boolean (watch for truthy/falsy)
- `list()`, `tuple()`, `set()`: Collections
- `dict()`: Dictionaries
- `json.loads()`: JSON strings

**Error Handling:**
- Use try-except for conversions
- Provide meaningful error messages
- Return defaults when appropriate
- Validate before converting

**Special Cases:**
- String "False" is truthy
- Empty collections are falsy
- Float to int truncates
- int() of float string needs float() first

## Next Steps

Next, you'll learn advanced variable unpacking and destructuring patterns.

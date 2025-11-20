---
id: 43-type-conversion
title: Type Conversion and Casting
chapterId: ch2-variables
order: 4
duration: 25
objectives:
  - Understand implicit vs explicit type conversion
  - Master type casting functions (int(), float(), str(), bool())
  - Handle conversion errors safely
  - Convert between different data types
---

# Type Conversion and Casting

## Introduction

Python can convert data from one type to another. This is called **type conversion** or **type casting**. Sometimes Python does this automatically (implicit conversion), and sometimes you need to do it manually (explicit conversion).

## Implicit Type Conversion

Python automatically converts smaller data types to larger ones to prevent data loss:

```python
# Integer + Float = Float
x = 5
y = 2.5
result = x + y
print(result)  # 7.5
print(type(result))  # <class 'float'>

# Python automatically converted 5 to 5.0
```

## Explicit Type Conversion

You explicitly convert types using built-in functions:

### Converting to Integer

```python
# String to int
age_str = "25"
age = int(age_str)
print(age + 5)  # 30

# Float to int (truncates decimal)
price = 19.99
price_int = int(price)
print(price_int)  # 19 (not 20!)

# Boolean to int
is_active = True
status = int(is_active)
print(status)  # 1 (True = 1, False = 0)
```

### Converting to Float

```python
# String to float
temperature = "98.6"
temp = float(temperature)
print(temp + 1.4)  # 100.0

# Integer to float
count = 42
count_float = float(count)
print(count_float)  # 42.0

# Boolean to float
completed = False
progress = float(completed)
print(progress)  # 0.0
```

### Converting to String

```python
# Integer to string
age = 25
age_str = str(age)
print("I am " + age_str + " years old")  # Works!

# Float to string
price = 19.99
price_str = str(price)
print("$" + price_str)  # $19.99

# Boolean to string
is_open = True
status = str(is_open)
print(status)  # "True"

# Any type to string
data = [1, 2, 3]
data_str = str(data)
print(data_str)  # "[1, 2, 3]"
```

### Converting to Boolean

```python
# Integer to bool (0 is False, everything else is True)
print(bool(0))   # False
print(bool(1))   # True
print(bool(-5))  # True
print(bool(100)) # True

# String to bool (empty string is False, anything else is True)
print(bool(""))      # False
print(bool("False")) # True (not empty!)
print(bool("0"))     # True (not empty!)

# Float to bool
print(bool(0.0))  # False
print(bool(0.1))  # True

# List to bool
print(bool([]))      # False (empty list)
print(bool([1, 2]))  # True (non-empty)
```

## Conversion Errors

Not all conversions work. You'll get a `ValueError` if the conversion is invalid:

```python
# This will crash:
try:
    age = int("twenty-five")
except ValueError:
    print("Cannot convert 'twenty-five' to int")

# This will also crash:
try:
    number = int("3.14")  # int() doesn't understand decimals
except ValueError:
    print("Cannot convert '3.14' to int - use float() first")

# This works:
number = int(float("3.14"))  # Convert to float first, then int
print(number)  # 3
```

## Safe Conversion Pattern

Always handle potential conversion errors:

```python
def safe_int(value):
    """Safely convert to int, return None if failed"""
    try:
        return int(value)
    except (ValueError, TypeError):
        return None

# Usage
print(safe_int("42"))      # 42
print(safe_int("3.14"))    # None
print(safe_int("hello"))   # None
print(safe_int(None))      # None
```

## Practical Examples

### Example 1: User Input

```python
# User input is always a string
age_input = input("Enter your age: ")
age = int(age_input)

# Calculate years until retirement
years_left = 65 - age
print(f"You have {years_left} years until retirement")
```

### Example 2: Data Cleaning

```python
# Clean and convert data
prices = ["19.99", "29.99", "invalid", "39.99"]

total = 0
for price_str in prices:
    try:
        price = float(price_str)
        total += price
    except ValueError:
        print(f"Skipping invalid price: {price_str}")

print(f"Total: ${total}")
```

### Example 3: Formatting Output

```python
# Calculate percentage
correct = 8
total_questions = 10
percentage = (correct / total_questions) * 100

# Convert to string for display
result = str(int(percentage)) + "%"
print(f"Score: {result}")  # Score: 80%
```

### Example 4: Boolean Conversion for Validation

```python
# Check if list has items
usernames = ["alice", "bob", "charlie"]

if bool(usernames):
    print(f"Found {len(usernames)} users")
else:
    print("No users found")

# Check if string is not empty
user_input = input("Enter your name: ")
if bool(user_input.strip()):
    print(f"Hello, {user_input}!")
else:
    print("Name cannot be empty")
```

## Common Conversion Patterns

```python
# String to number with default value
def to_number(s, default=0):
    try:
        return float(s)
    except (ValueError, TypeError):
        return default

# Number to string with formatting
price = 19.99
formatted = f"${price:.2f}"  # $19.99

# Boolean to yes/no
is_active = True
status = "Yes" if is_active else "No"

# List to comma-separated string
items = ["apple", "banana", "cherry"]
items_str = ", ".join(items)  # "apple, banana, cherry"

# String to list
text = "apple,banana,cherry"
items_list = text.split(",")  # ['apple', 'banana', 'cherry']
```

## Summary

- **Implicit conversion**: Python converts automatically (int + float = float)
- **Explicit conversion**: Use `int()`, `float()`, `str()`, `bool()`
- **int()**: Converts to integer (truncates decimals)
- **float()**: Converts to float
- **str()**: Converts anything to string
- **bool()**: Converts to True/False (0 and empty = False)
- **Always handle conversion errors** with try/except
- **Common pitfall**: `int("3.14")` fails - use `int(float("3.14"))`

## Next Steps

Next, you'll learn about constants and naming conventions in Python.

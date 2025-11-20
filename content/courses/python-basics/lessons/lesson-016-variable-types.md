---
id: variable-types
title: Variable Types and Type Checking
chapterId: ch2-variables
order: 3
duration: 25
objectives:
  - Understand Python's dynamic type system
  - Learn how to check variable types
  - Master type conversion (casting)
  - Understand type hints
---

# Variable Types and Type Checking

Python automatically determines variable types, but you can check and convert types when needed.

## Dynamic Typing

Python figures out types automatically:

```python
name = "Alice"      # Python knows this is a string
age = 25            # Python knows this is an integer
price = 99.99       # Python knows this is a float
is_active = True    # Python knows this is a boolean

# No need to declare types!
```

## Checking Types with type()

Use `type()` to see a variable's type:

```python
name = "Alice"
print(type(name))  # <class 'str'>

age = 25
print(type(age))   # <class 'int'>

price = 99.99
print(type(price)) # <class 'float'>

is_active = True
print(type(is_active))  # <class 'bool'>
```

## Common Python Types

```python
# String
text = "hello"
print(type(text))  # <class 'str'>

# Integer
number = 42
print(type(number))  # <class 'int'>

# Float
decimal = 3.14
print(type(decimal))  # <class 'float'>

# Boolean
flag = True
print(type(flag))  # <class 'bool'>

# List
items = [1, 2, 3]
print(type(items))  # <class 'list'>

# Dictionary
person = {"name": "Alice"}
print(type(person))  # <class 'dict'>

# NoneType
empty = None
print(type(empty))  # <class 'NoneType'>
```

## Type Checking with isinstance()

Check if a variable is a specific type:

```python
age = 25

if isinstance(age, int):
    print("age is an integer")  # This prints

if isinstance(age, str):
    print("age is a string")    # This doesn't print

# Check multiple types
value = 42
if isinstance(value, (int, float)):
    print("value is a number")  # This prints
```

## Type Conversion (Casting)

Convert between types explicitly:

### String to Number

```python
# String to int
age_str = "25"
age_int = int(age_str)
print(age_int, type(age_int))  # 25 <class 'int'>

# String to float
price_str = "99.99"
price_float = float(price_str)
print(price_float, type(price_float))  # 99.99 <class 'float'>
```

### Number to String

```python
age = 25
age_str = str(age)
print(age_str, type(age_str))  # 25 <class 'str'>

price = 99.99
price_str = str(price)
print(price_str, type(price_str))  # 99.99 <class 'str'>
```

### Float to Int (Truncates)

```python
price = 99.99
price_int = int(price)
print(price_int)  # 99 (decimal part removed)

# Be careful - it doesn't round!
value = 5.9
int_value = int(value)
print(int_value)  # 5 (not 6!)
```

### Int to Float

```python
age = 25
age_float = float(age)
print(age_float)  # 25.0
```

### String to Boolean

```python
# Empty string is False
empty = bool("")
print(empty)  # False

# Non-empty string is True
text = bool("hello")
print(text)  # True

# Note: "False" is a non-empty string!
wrong = bool("False")
print(wrong)  # True (not False!)
```

## Handling Conversion Errors

Not all conversions work:

```python
# ❌ This will cause an error
# number = int("hello")  # ValueError: invalid literal for int()

# ✅ Use try-except to handle errors
try:
    number = int("hello")
except ValueError:
    print("Cannot convert 'hello' to integer")
    number = 0
```

## Practical Examples

### Example 1: User Input (Always Strings)

```python
# input() always returns a string
age_input = input("Enter your age: ")
print(type(age_input))  # <class 'str'>

# Convert to int for calculations
age = int(age_input)
years_to_100 = 100 - age
print(f"You'll be 100 in {years_to_100} years")
```

### Example 2: Price Calculation

```python
# Get user input
price_str = input("Enter price: ")
quantity_str = input("Enter quantity: ")

# Convert to numbers
price = float(price_str)
quantity = int(quantity_str)

# Calculate total
total = price * quantity
print(f"Total: ${total:.2f}")
```

### Example 3: Type Validation

```python
def safe_divide(a, b):
    """Safely divide two numbers"""
    if not isinstance(a, (int, float)):
        return "First value must be a number"
    if not isinstance(b, (int, float)):
        return "Second value must be a number"
    if b == 0:
        return "Cannot divide by zero"
    return a / b

print(safe_divide(10, 2))      # 5.0
print(safe_divide("10", 2))    # First value must be a number
print(safe_divide(10, 0))      # Cannot divide by zero
```

## Type Hints (Python 3.5+)

You can add type hints for better code documentation:

```python
# Type hints don't enforce types, but help with documentation
def greet(name: str) -> str:
    return f"Hello, {name}!"

def add(a: int, b: int) -> int:
    return a + b

def calculate_price(price: float, quantity: int) -> float:
    return price * quantity

# Variables can have type hints too
age: int = 25
name: str = "Alice"
price: float = 99.99
is_active: bool = True
```

Type hints are optional and don't prevent wrong types:

```python
def add(a: int, b: int) -> int:
    return a + b

# This still works even though we pass strings!
result = add("Hello", "World")
print(result)  # HelloWorld

# Type hints are just hints, not enforcement
```

## Common Type Conversion Functions

```python
# To string
str(42)        # "42"
str(3.14)      # "3.14"
str(True)      # "True"

# To integer
int("42")      # 42
int(3.14)      # 3
int(True)      # 1
int(False)     # 0

# To float
float("3.14")  # 3.14
float(42)      # 42.0
float(True)    # 1.0

# To boolean
bool(1)        # True
bool(0)        # False
bool("")       # False
bool("text")   # True
bool([])       # False
bool([1, 2])   # True
```

## Key Takeaways

- Python uses **dynamic typing** - types determined automatically
- Use `type()` to check a variable's type
- Use `isinstance()` to validate types
- Convert types with `int()`, `float()`, `str()`, `bool()`
- Be careful with type conversions - they can fail
- Type hints provide documentation but don't enforce types

## What's Next?

You've mastered variable types! Next, we'll learn about **variable scope** and where variables can be accessed.

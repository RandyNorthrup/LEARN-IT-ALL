---
id: data-types
title: Data Types in Python
chapterId: ch1-intro
order: 3
duration: 25
objectives:
  - Understand Python's basic data types
  - Learn how to check variable types
  - Work with strings, numbers, and booleans
---

# Data Types in Python

Every value in Python has a **data type**. Python is dynamically typed, meaning you don't need to explicitly declare types, but understanding them is crucial for writing effective code.

## The Five Basic Data Types

Python has five fundamental data types:

1. **Integers** (`int`) - Whole numbers
2. **Floats** (`float`) - Decimal numbers
3. **Strings** (`str`) - Text
4. **Booleans** (`bool`) - True or False
5. **NoneType** (`None`) - Represents absence of value

## Integers (int)

Integers are whole numbers without decimal points:

```python
age = 25
year = 2025
temperature = -10
large_number = 1000000
```

Python integers have unlimited precision:

```python
huge = 999999999999999999999999999
print(huge)  # No overflow errors!
```

## Floats (float)

Floats are numbers with decimal points:

```python
price = 19.99
temperature = 98.6
pi = 3.14159
scientific = 1.5e-4  # 0.00015
```

**Important**: Floats have limited precision due to how computers store them:

```python
result = 0.1 + 0.2
print(result)  # 0.30000000000000004 (not exactly 0.3!)
```

## Strings (str)

Strings are sequences of characters enclosed in quotes:

```python
name = "Alice"
message = 'Hello, World!'
multiline = """This is a
multiline string"""
```

You can use single (`'`) or double (`"`) quotes:

```python
quote = "He said, 'Hello!'"
path = 'C:\\Users\\Documents'
```

### String Operations

```python
# Concatenation
first_name = "John"
last_name = "Doe"
full_name = first_name + " " + last_name  # "John Doe"

# Repetition
laugh = "ha" * 3  # "hahaha"

# Length
length = len("Python")  # 6

# Indexing (starts at 0)
word = "Python"
first_letter = word[0]   # "P"
last_letter = word[-1]   # "n"
```

## Booleans (bool)

Booleans represent truth values:

```python
is_student = True
has_license = False
is_adult = age >= 18  # Expression evaluates to True or False
```

Boolean values are case-sensitive (must be `True` or `False`, not `true` or `false`).

## None Type

`None` represents the absence of a value:

```python
result = None
middle_name = None

if result is None:
    print("No result yet")
```

Use `is None` instead of `== None` for checking.

## Checking Types

Use the `type()` function to check a variable's type:

```python
age = 25
print(type(age))  # <class 'int'>

price = 19.99
print(type(price))  # <class 'float'>

name = "Alice"
print(type(name))  # <class 'str'>

is_active = True
print(type(is_active))  # <class 'bool'>
```

## Type Conversion (Casting)

Convert between types using built-in functions:

```python
# String to integer
age_str = "25"
age_int = int(age_str)  # 25

# Integer to string
count = 100
count_str = str(count)  # "100"

# String to float
price = float("19.99")  # 19.99

# Integer to float
whole = 5
decimal = float(whole)  # 5.0

# To boolean
bool(1)      # True
bool(0)      # False
bool("")     # False
bool("Hi")   # True
```

**Warning**: Invalid conversions raise errors:

```python
int("hello")  # ValueError: invalid literal for int()
```

## Dynamic Typing Example

Variables can change types:

```python
value = 42        # int
print(type(value))  # <class 'int'>

value = "hello"   # now a string
print(type(value))  # <class 'str'>

value = 3.14      # now a float
print(type(value))  # <class 'float'>
```

While this is possible, it's usually better to keep variables consistently typed for clarity.

## Practical Examples

### Example 1: User Input

```python
name = input("Enter your name: ")
age = int(input("Enter your age: "))  # Convert input to int

print(f"Hello {name}, you are {age} years old.")
```

### Example 2: Calculations

```python
width = 10.5
height = 20.0
area = width * height

print(f"Area: {area} square units")  # Area: 210.0 square units
```

### Example 3: Type Checking

```python
def process_data(value):
    if type(value) == int:
        return value * 2
    elif type(value) == str:
        return value.upper()
    else:
        return None

print(process_data(5))       # 10
print(process_data("hello")) # HELLO
```

## Common Type Mistakes

### Mistake 1: String + Number
```python
age = 25
message = "I am " + age + " years old"  # TypeError!

# Fix: Convert to string
message = "I am " + str(age) + " years old"
# Or use f-string
message = f"I am {age} years old"
```

### Mistake 2: Division Types
```python
result = 5 / 2   # 2.5 (float division)
result = 5 // 2  # 2 (integer division)
```

### Mistake 3: Comparing Types
```python
if 5 == "5":  # False (different types)
    print("Equal")

if 5 == int("5"):  # True
    print("Equal")
```

## Key Takeaways

- Python has five basic types: `int`, `float`, `str`, `bool`, `None`
- Use `type()` to check a variable's type
- Use `int()`, `float()`, `str()`, `bool()` to convert types
- Strings can use single or double quotes
- Booleans must be capitalized: `True`, `False`
- `None` represents no value (use `is None` to check)
- Python is dynamically typed but still strongly typed

## What's Next?

In the next lesson, we'll dive deeper into **string manipulation** and learn powerful string methods!

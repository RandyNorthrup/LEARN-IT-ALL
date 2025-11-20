---
id: return-values
title: Return Values and Multiple Returns
chapterId: ch6-functions
order: 3
duration: 25
objectives:
  - Understand return statements
  - Master returning multiple values
  - Learn when to use return vs print
  - Understand None as default return
---

# Return Values and Multiple Returns

Return statements send data back from functions, making them powerful tools for data processing.

## The return Statement

Use `return` to send a value back to the caller:

```python
def add(a, b):
    return a + b

result = add(5, 3)
print(result)  # 8
```

Without `return`, functions do nothing with their computed values:

```python
# ❌ Bad - computes but doesn't return
def add_bad(a, b):
    sum_value = a + b
    # No return - value is lost!

result = add_bad(5, 3)
print(result)  # None
```

## Return vs Print

`return` sends data back, `print` displays it:

```python
def add_with_print(a, b):
    print(a + b)  # Displays but doesn't return

def add_with_return(a, b):
    return a + b  # Returns the value

# print version
result1 = add_with_print(5, 3)  # Prints: 8
print(result1)  # None (no return value)

# return version
result2 = add_with_return(5, 3)  # No output
print(result2)  # 8 (returned value)
```

**Key Difference:**
- `print` → Shows to user, can't use in calculations
- `return` → Gives back a value you can use

## Early Return

Return immediately exits the function:

```python
def check_age(age):
    if age < 0:
        return "Invalid age"
    if age < 18:
        return "Minor"
    if age < 65:
        return "Adult"
    return "Senior"

print(check_age(15))   # Minor
print(check_age(30))   # Adult
print(check_age(-5))   # Invalid age
```

## Default Return Value (None)

Functions without explicit return return `None`:

```python
def greet(name):
    print(f"Hello, {name}")
    # No return statement

result = greet("Alice")  # Prints: Hello, Alice
print(result)  # None
print(type(result))  # <class 'NoneType'>
```

## Returning Multiple Values

Python can return multiple values as a tuple:

```python
def get_user_info():
    name = "Alice"
    age = 25
    city = "New York"
    return name, age, city

# Unpack into variables
name, age, city = get_user_info()
print(name)  # Alice
print(age)   # 25
print(city)  # New York

# Or get as tuple
info = get_user_info()
print(info)  # ('Alice', 25, 'New York')
print(type(info))  # <class 'tuple'>
```

## Unpacking Return Values

```python
def calculate_stats(numbers):
    total = sum(numbers)
    average = total / len(numbers)
    minimum = min(numbers)
    maximum = max(numbers)
    return total, average, minimum, maximum

# Unpack all values
total, avg, min_val, max_val = calculate_stats([1, 2, 3, 4, 5])
print(f"Total: {total}, Avg: {avg}, Min: {min_val}, Max: {max_val}")
# Total: 15, Avg: 3.0, Min: 1, Max: 5

# Ignore some values with underscore
total, avg, _, _ = calculate_stats([10, 20, 30])
print(f"Total: {total}, Avg: {avg}")
# Total: 60, Avg: 20.0
```

## Returning Different Types

```python
def process_input(value):
    """Return different types based on input"""
    if value < 0:
        return None  # Error case
    if value == 0:
        return "Zero"  # String
    if value < 10:
        return value * 2  # Integer
    return [value, value * 2, value * 3]  # List

print(process_input(-5))   # None
print(process_input(0))    # Zero
print(process_input(5))    # 10
print(process_input(10))   # [10, 20, 30]
```

## Returning Data Structures

### Returning Lists

```python
def get_even_numbers(numbers):
    """Return list of even numbers"""
    evens = []
    for num in numbers:
        if num % 2 == 0:
            evens.append(num)
    return evens

result = get_even_numbers([1, 2, 3, 4, 5, 6])
print(result)  # [2, 4, 6]
```

### Returning Dictionaries

```python
def create_user_profile(name, age, email):
    """Return user profile as dictionary"""
    return {
        "name": name,
        "age": age,
        "email": email,
        "status": "active"
    }

user = create_user_profile("Alice", 25, "alice@email.com")
print(user)
# {'name': 'Alice', 'age': 25, 'email': 'alice@email.com', 'status': 'active'}
print(user["name"])  # Alice
```

## Conditional Returns

```python
def divide(a, b):
    """Safely divide two numbers"""
    if b == 0:
        return None  # Error case
    return a / b

result = divide(10, 2)
if result is not None:
    print(f"Result: {result}")
else:
    print("Cannot divide by zero")

result = divide(10, 0)
if result is not None:
    print(f"Result: {result}")
else:
    print("Cannot divide by zero")  # This prints
```

## Practical Examples

### Example 1: String Validator

```python
def validate_password(password):
    """Validate password and return (is_valid, message)"""
    if len(password) < 8:
        return False, "Password too short"
    if not any(c.isdigit() for c in password):
        return False, "Password needs a number"
    if not any(c.isupper() for c in password):
        return False, "Password needs an uppercase letter"
    return True, "Password is valid"

# Check password
is_valid, message = validate_password("abc123")
print(f"{message} - Valid: {is_valid}")
# Password too short - Valid: False

is_valid, message = validate_password("Secure123")
print(f"{message} - Valid: {is_valid}")
# Password is valid - Valid: True
```

### Example 2: Rectangle Calculator

```python
def rectangle_info(width, height):
    """Calculate area, perimeter, and diagonal"""
    area = width * height
    perimeter = 2 * (width + height)
    diagonal = (width**2 + height**2) ** 0.5
    return area, perimeter, diagonal

# Get all measurements
area, perimeter, diagonal = rectangle_info(3, 4)
print(f"Area: {area}")
print(f"Perimeter: {perimeter}")
print(f"Diagonal: {diagonal:.2f}")
# Area: 12
# Perimeter: 14
# Diagonal: 5.00
```

### Example 3: Data Parser

```python
def parse_name(full_name):
    """Parse full name into parts"""
    parts = full_name.strip().split()
    
    if len(parts) == 0:
        return None, None, None
    elif len(parts) == 1:
        return parts[0], None, None
    elif len(parts) == 2:
        return parts[0], None, parts[1]
    else:
        return parts[0], " ".join(parts[1:-1]), parts[-1]

first, middle, last = parse_name("John Smith")
print(f"First: {first}, Middle: {middle}, Last: {last}")
# First: John, Middle: None, Last: Smith

first, middle, last = parse_name("John Paul Jones")
print(f"First: {first}, Middle: {middle}, Last: {last}")
# First: John, Middle: Paul, Last: Jones
```

### Example 4: Success/Error Pattern

```python
def safe_divide(a, b):
    """Return (success, result) tuple"""
    if not isinstance(a, (int, float)):
        return False, "First argument must be a number"
    if not isinstance(b, (int, float)):
        return False, "Second argument must be a number"
    if b == 0:
        return False, "Cannot divide by zero"
    return True, a / b

# Check result
success, result = safe_divide(10, 2)
if success:
    print(f"Result: {result}")  # Result: 5.0
else:
    print(f"Error: {result}")

success, result = safe_divide(10, 0)
if success:
    print(f"Result: {result}")
else:
    print(f"Error: {result}")  # Error: Cannot divide by zero
```

## Using Return Values

```python
def square(x):
    return x * x

def cube(x):
    return x * x * x

# Chain function calls
result = square(3) + cube(2)  # 9 + 8 = 17
print(result)

# Use in expressions
numbers = [1, 2, 3, 4, 5]
squared = [square(n) for n in numbers]
print(squared)  # [1, 4, 9, 16, 25]

# Use in conditions
if square(5) > 20:
    print("Square of 5 is greater than 20")  # This prints
```

## Key Takeaways

- Use `return` to send values back from functions
- `return` exits the function immediately
- Functions without `return` return `None`
- Return multiple values as tuples
- Use tuple unpacking to get multiple returns
- `return` is different from `print`
- Return early for validation and error cases

## What's Next?

You've mastered return values! Next, we'll learn about **function scope** and variable visibility.

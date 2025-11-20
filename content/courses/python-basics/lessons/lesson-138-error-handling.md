---
id: error-handling
title: Error Handling with Try-Except
chapterId: ch11-error-handling
order: 1
duration: 30
objectives:
  - Understand common Python exceptions
  - Master try-except blocks for error handling
  - Learn best practices for handling errors
---

# Error Handling with Try-Except

Errors happen in every program. Good programmers anticipate errors and handle them gracefully using try-except blocks.

## Common Python Exceptions

```python
# ValueError - Invalid value
int("abc")  # Cannot convert to integer

# TypeError - Wrong type
"2" + 2  # Cannot add string and int

# ZeroDivisionError
10 / 0  # Division by zero

# IndexError
numbers = [1, 2, 3]
print(numbers[10])  # Index out of range

# KeyError
person = {"name": "Alice"}
print(person["age"])  # Key doesn't exist

# FileNotFoundError
open("nonexistent.txt")  # File doesn't exist
```

## Basic Try-Except

```python
try:
    number = int(input("Enter a number: "))
    result = 10 / number
    print(f"Result: {result}")
except:
    print("Something went wrong!")
```

## Catching Specific Exceptions

```python
try:
    number = int(input("Enter a number: "))
    result = 10 / number
    print(f"Result: {result}")
except ValueError:
    print("Please enter a valid number!")
except ZeroDivisionError:
    print("Cannot divide by zero!")
```

## Else and Finally

```python
try:
    file = open("data.txt", "r")
    content = file.read()
except FileNotFoundError:
    print("File not found")
else:
    print("File read successfully")
    print(content)
finally:
    print("Cleanup code runs always")
    # Close file if it was opened
```

## Getting Exception Details

```python
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"Error occurred: {e}")
    print(f"Error type: {type(e).__name__}")
```

## Multiple Exception Types

```python
try:
    data = {"name": "Alice", "age": "25"}
    age = int(data["age"])
    result = 100 / age
except (ValueError, ZeroDivisionError) as e:
    print(f"Calculation error: {e}")
except KeyError as e:
    print(f"Missing key: {e}")
```

## Practical Examples

### Example 1: Safe Input Conversion

```python
def get_integer(prompt):
    """Get valid integer from user"""
    while True:
        try:
            return int(input(prompt))
        except ValueError:
            print("Invalid input. Please enter a number.")

age = get_integer("Enter your age: ")
print(f"You are {age} years old")
```

### Example 2: Safe Dictionary Access

```python
def get_value(dictionary, key, default=None):
    """Safely get value from dictionary"""
    try:
        return dictionary[key]
    except KeyError:
        return default

person = {"name": "Alice"}
print(get_value(person, "age", 0))  # 0 (default)
print(get_value(person, "name"))    # Alice
```

### Example 3: Safe File Reading

```python
def read_file(filename):
    """Read file with error handling"""
    try:
        with open(filename, 'r') as file:
            return file.read()
    except FileNotFoundError:
        print(f"File '{filename}' not found")
        return None
    except PermissionError:
        print(f"No permission to read '{filename}'")
        return None

content = read_file("config.txt")
if content:
    print(content)
```

## Raising Exceptions

```python
def divide(a, b):
    """Divide two numbers"""
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

try:
    result = divide(10, 0)
except ValueError as e:
    print(f"Error: {e}")
```

## Custom Exceptions

```python
class NegativeNumberError(Exception):
    """Raised when negative number is not allowed"""
    pass

def sqrt(number):
    """Calculate square root"""
    if number < 0:
        raise NegativeNumberError("Cannot calculate sqrt of negative number")
    return number ** 0.5

try:
    result = sqrt(-4)
except NegativeNumberError as e:
    print(f"Error: {e}")
```

## Best Practices

### ✅ DO: Be Specific

```python
# Good - catch specific exceptions
try:
    value = int(user_input)
except ValueError:
    print("Invalid number")
```

### ❌ DON'T: Catch Everything

```python
# Bad - too broad
try:
    value = int(user_input)
except:
    print("Error")  # What error?
```

### ✅ DO: Handle Errors Close to Source

```python
# Good - handle where error occurs
def process_data(filename):
    try:
        with open(filename) as f:
            return f.read()
    except FileNotFoundError:
        return None
```

### ✅ DO: Provide Helpful Messages

```python
# Good - informative error messages
try:
    age = int(user_input)
except ValueError:
    print(f"'{user_input}' is not a valid age. Please enter a number.")
```

## Key Takeaways

- Use **try-except** to handle errors gracefully
- Catch **specific exceptions** when possible
- **else** block runs if no exception occurs
- **finally** block always runs (cleanup code)
- Use **as e** to get exception details
- **Raise** exceptions to signal errors

## What's Next?

You've learned error handling! Next, we'll explore **file I/O** for reading and writing files.

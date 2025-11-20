---
id: "146-exception-types"
title: "Python Exception Types Deep Dive"
chapterId: ch11-error-handling
order: 2
duration: 25
objectives:
  - Master built-in exception types
  - Understand exception hierarchy
  - Choose appropriate exceptions
  - Handle different error categories
---

# Python Exception Types Deep Dive

Understanding Python's exception hierarchy helps you handle errors effectively.

## Exception Hierarchy

```python
# All exceptions inherit from BaseException
# BaseException
#   ├── SystemExit
#   ├── KeyboardInterrupt
#   ├── GeneratorExit
#   └── Exception (most inherit from here)
#       ├── ArithmeticError
#       │   ├── ZeroDivisionError
#       │   ├── FloatingPointError
#       │   └── OverflowError
#       ├── LookupError
#       │   ├── IndexError
#       │   ├── KeyError
#       │   └── KeyError
#       ├── TypeError
#       ├── ValueError
#       ├── NameError
#       └── ... many more

# Why this matters:
# Catching Exception catches most errors
# But doesn't catch SystemExit, KeyboardInterrupt
```

## Arithmetic Exceptions

```python
# ZeroDivisionError - division by zero
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"Cannot divide by zero: {e}")

try:
    result = 10 // 0
except ZeroDivisionError:
    print("Integer division by zero")

try:
    result = 10 % 0
except ZeroDivisionError:
    print("Modulo by zero")

# OverflowError - result too large (rare in Python 3)
import math
try:
    result = math.exp(1000)  # e^1000
except OverflowError:
    print("Number too large to represent")

# FloatingPointError - floating point operation failed (rare)
# Usually requires special configuration to raise
```

## Lookup Exceptions

```python
# IndexError - sequence index out of range
numbers = [1, 2, 3]

try:
    value = numbers[10]
except IndexError as e:
    print(f"Index out of range: {e}")

# Negative index
try:
    value = numbers[-10]
except IndexError:
    print("Negative index out of range")

# KeyError - dictionary key not found
person = {"name": "Alice", "age": 30}

try:
    city = person["city"]
except KeyError as e:
    print(f"Key not found: {e}")

# Multiple key access
try:
    value = person["address"]["city"]
except KeyError as e:
    print(f"Missing key in chain: {e}")

# KeyError vs get() method
city = person.get("city", "Unknown")  # No exception
print(city)  # "Unknown"
```

## Type Exceptions

```python
# TypeError - wrong type for operation
try:
    result = "5" + 5
except TypeError as e:
    print(f"Type mismatch: {e}")

# Wrong number of arguments
def greet(name):
    return f"Hello, {name}!"

try:
    greet()  # Missing argument
except TypeError as e:
    print(f"Function call error: {e}")

# Unhashable type as dict key
try:
    d = {[1, 2]: "value"}
except TypeError as e:
    print(f"Unhashable type: {e}")

# Cannot iterate
try:
    for item in 123:
        print(item)
except TypeError:
    print("Object is not iterable")

# Wrong operation for type
try:
    result = len(5)
except TypeError:
    print("Object has no len()")
```

## Value Exceptions

```python
# ValueError - correct type, wrong value
try:
    number = int("abc")
except ValueError as e:
    print(f"Cannot convert to int: {e}")

try:
    number = float("not a number")
except ValueError:
    print("Cannot convert to float")

# Math domain errors
import math

try:
    result = math.sqrt(-1)
except ValueError:
    print("Math domain error: sqrt of negative")

try:
    result = math.log(-5)
except ValueError:
    print("Math domain error: log of negative")

# Unpacking errors
try:
    a, b = [1, 2, 3]  # Too many values
except ValueError:
    print("Too many values to unpack")

try:
    a, b, c = [1, 2]  # Too few values
except ValueError:
    print("Not enough values to unpack")
```

## Name Exceptions

```python
# NameError - name not defined
try:
    print(undefined_variable)
except NameError as e:
    print(f"Name error: {e}")

# Accessing before assignment
def func():
    try:
        print(x)
        x = 10
    except NameError:
        print("Variable used before assignment")

func()

# AttributeError - attribute doesn't exist
try:
    "hello".nonexistent_method()
except AttributeError as e:
    print(f"Attribute error: {e}")

try:
    number = 5
    number.upper()
except AttributeError:
    print("int has no upper() method")

# Module attribute
import math
try:
    math.nonexistent_function()
except AttributeError:
    print("Module has no such attribute")
```

## File and I/O Exceptions

```python
# FileNotFoundError - file doesn't exist
try:
    with open("nonexistent.txt", "r") as f:
        content = f.read()
except FileNotFoundError as e:
    print(f"File not found: {e}")

# PermissionError - insufficient permissions
try:
    with open("/etc/passwd", "w") as f:
        f.write("hack")
except PermissionError:
    print("Permission denied")

# IsADirectoryError - expected file, got directory
try:
    with open("/tmp", "r") as f:
        content = f.read()
except IsADirectoryError:
    print("Cannot read directory as file")

# NotADirectoryError - expected directory, got file
import os
try:
    os.listdir("somefile.txt")
except NotADirectoryError:
    print("Not a directory")

# OSError - general OS error
try:
    os.remove("protected_file.txt")
except OSError as e:
    print(f"OS error: {e}")
```

## Import Exceptions

```python
# ImportError - cannot import module/name
try:
    import nonexistent_module
except ImportError as e:
    print(f"Import error: {e}")

# ModuleNotFoundError - module not found (Python 3.6+)
try:
    import fake_module
except ModuleNotFoundError:
    print("Module not found")

# From import error
try:
    from math import nonexistent_function
except ImportError:
    print("Cannot import name")
```

## Runtime Exceptions

```python
# RecursionError - maximum recursion depth exceeded
def infinite_recursion(n):
    return infinite_recursion(n + 1)

try:
    infinite_recursion(0)
except RecursionError:
    print("Recursion limit reached")

# MemoryError - out of memory
try:
    # This might crash your system - use with caution
    # huge_list = [0] * (10 ** 10)
    pass
except MemoryError:
    print("Out of memory")

# StopIteration - next() on exhausted iterator
iterator = iter([1, 2, 3])
try:
    print(next(iterator))  # 1
    print(next(iterator))  # 2
    print(next(iterator))  # 3
    print(next(iterator))  # Raises StopIteration
except StopIteration:
    print("Iterator exhausted")
```

## Assertion Exceptions

```python
# AssertionError - assertion failed
def validate_age(age):
    assert age >= 0, "Age cannot be negative"
    assert age <= 150, "Age too high"
    return age

try:
    age = validate_age(-5)
except AssertionError as e:
    print(f"Assertion failed: {e}")

# Assertions are for debugging, not error handling
# Can be disabled with python -O
```

## System Exceptions

```python
# KeyboardInterrupt - user pressed Ctrl+C
import time

try:
    print("Press Ctrl+C to interrupt...")
    # time.sleep(10)
except KeyboardInterrupt:
    print("\nInterrupted by user")

# SystemExit - sys.exit() called
import sys

try:
    sys.exit(0)
except SystemExit as e:
    print(f"Exit with code: {e.code}")

# Note: Usually you don't catch these
```

## Exception Hierarchy Practice

```python
# Catching parent catches all children
try:
    result = 10 / 0  # ZeroDivisionError
except ArithmeticError:  # Parent of ZeroDivisionError
    print("Arithmetic error")

# Specific exceptions first, general later
try:
    numbers = [1, 2, 3]
    value = numbers[10]
except IndexError:
    print("Index error (specific)")
except LookupError:
    print("Lookup error (general)")
except Exception:
    print("Any other exception")

# Order matters!
try:
    result = int("abc")
except Exception:  # Catches everything
    print("Exception (too general)")
except ValueError:  # Never reached!
    print("ValueError (specific)")
```

## Multiple Exception Categories

```python
def safe_operation(data, key, divisor):
    """Handle multiple exception types"""
    try:
        value = data[key]  # KeyError
        result = value / divisor  # ZeroDivisionError, TypeError
        return int(result)  # ValueError if result is NaN
    except KeyError:
        print(f"Key '{key}' not found")
        return None
    except ZeroDivisionError:
        print("Cannot divide by zero")
        return None
    except TypeError:
        print("Value must be numeric")
        return None
    except ValueError:
        print("Cannot convert to integer")
        return None

# Test cases
data = {"x": 10, "y": "hello"}
print(safe_operation(data, "x", 2))      # 5
print(safe_operation(data, "z", 2))      # KeyError
print(safe_operation(data, "x", 0))      # ZeroDivisionError
print(safe_operation(data, "y", 2))      # TypeError
```

## Exception Cheat Sheet

| Exception | When It Occurs | Example |
|-----------|---------------|---------|
| `ZeroDivisionError` | Division by zero | `10 / 0` |
| `IndexError` | Index out of range | `[1,2][5]` |
| `KeyError` | Dict key not found | `{'a':1}['b']` |
| `TypeError` | Wrong type | `'5' + 5` |
| `ValueError` | Wrong value | `int('abc')` |
| `NameError` | Name not defined | `print(x)` |
| `AttributeError` | Attribute missing | `5.upper()` |
| `FileNotFoundError` | File not found | `open('x.txt')` |
| `ImportError` | Cannot import | `import fake` |
| `RecursionError` | Too deep recursion | Infinite recursion |
| `AssertionError` | Assertion failed | `assert False` |
| `KeyboardInterrupt` | Ctrl+C pressed | User interruption |

## Choosing the Right Exception

```python
# When validating input
def validate_input(value):
    if not isinstance(value, int):
        raise TypeError("Value must be integer")
    if value < 0:
        raise ValueError("Value must be non-negative")
    return value

# When dealing with collections
def get_first_item(items):
    if not items:
        raise IndexError("List is empty")
    return items[0]

# When dealing with resources
def load_config(filename):
    try:
        with open(filename) as f:
            return f.read()
    except FileNotFoundError:
        raise FileNotFoundError(f"Config file {filename} not found")

# When validating state
def process_order(order):
    if order.status != "pending":
        raise ValueError(f"Order must be pending, not {order.status}")
```

## Summary

**Exception Categories:**

1. **Arithmetic**: ZeroDivisionError, OverflowError
2. **Lookup**: IndexError, KeyError
3. **Type**: TypeError (wrong type for operation)
4. **Value**: ValueError (right type, wrong value)
5. **Name**: NameError, AttributeError
6. **File/IO**: FileNotFoundError, PermissionError
7. **Import**: ImportError, ModuleNotFoundError
8. **Runtime**: RecursionError, MemoryError
9. **System**: KeyboardInterrupt, SystemExit

**Key Principles:**
- Catch specific exceptions, not `Exception`
- Order matters: specific before general
- Understand exception hierarchy
- Choose appropriate exception types
- Don't catch SystemExit or KeyboardInterrupt unless needed
- Use parent classes to catch related exceptions

**Best Practices:**
- Be specific about which exception to catch
- Know when to use which exception type
- Understand parent-child relationships
- Provide helpful error messages
- Don't catch exceptions you can't handle

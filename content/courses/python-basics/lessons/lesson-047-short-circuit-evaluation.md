---
id: "85-short-circuit-evaluation"
title: "Short-Circuit Evaluation"
chapterId: ch4-comparisons
order: 7
duration: 20
objectives:
  - Understand how short-circuit evaluation works
  - Learn optimization benefits of short-circuiting
  - Master evaluation order in boolean expressions
  - Apply short-circuiting for efficient code
---

# Short-Circuit Evaluation

Short-circuit evaluation means Python stops evaluating boolean expressions as soon as the result is determined. Understanding this improves code efficiency and enables powerful patterns.

## How Short-Circuiting Works

### AND Operator

With `and`, if the first value is falsy, Python doesn't evaluate the rest:

```python
def expensive_check():
    """Simulate expensive operation."""
    print("Expensive check called")
    return True

# First condition is False, second never runs
result = False and expensive_check()
print(result)  # False
# Notice: "Expensive check called" never prints!

# First condition is True, second must run
result = True and expensive_check()
print(result)  # True
# Now "Expensive check called" prints

# Practical example
age = 15
has_license = True

# Safe: won't check license if underage
if age >= 18 and has_license:
    print("Can drive")
else:
    print("Cannot drive")  # This prints
```

### OR Operator

With `or`, if the first value is truthy, Python doesn't evaluate the rest:

```python
def backup_function():
    """Fallback function."""
    print("Backup called")
    return "Backup value"

# First is truthy, second never runs
result = "Primary" or backup_function()
print(result)  # "Primary"
# "Backup called" never prints

# First is falsy, second must run
result = None or backup_function()
print(result)  # "Backup value"
# "Backup called" prints

# Practical example
username = "Alice"
display_name = username or "Guest"
print(display_name)  # "Alice"
# "Guest" is never evaluated since username is truthy
```

## Evaluation Order Matters

```python
def check_a():
    print("Checking A")
    return False

def check_b():
    print("Checking B")
    return True

def check_c():
    print("Checking C")
    return True

# AND chain: stops at first False
print("\nAND evaluation:")
result = check_a() and check_b() and check_c()
print(f"Result: {result}")
# Output:
# Checking A
# Result: False
# (B and C never checked)

# OR chain: stops at first True
print("\nOR evaluation:")
result = check_b() or check_a() or check_c()
print(f"Result: {result}")
# Output:
# Checking B
# Result: True
# (A and C never checked)
```

## Practical Applications

### Safe Attribute Access

```python
# Problem: Accessing nested attributes can cause errors
user = None

# ❌ This will raise AttributeError
# name = user.profile.name

# ✅ Short-circuit saves us
name = user and user.profile and user.profile.name
print(name)  # None (safely handled)

# When user exists
class Profile:
    def __init__(self, name):
        self.name = name

class User:
    def __init__(self, profile):
        self.profile = profile

user = User(Profile("Alice"))
name = user and user.profile and user.profile.name
print(name)  # "Alice"

# Alternative: getattr with default
user = None
name = getattr(getattr(user, 'profile', None), 'name', 'Unknown')
print(name)  # "Unknown"
```

### Avoiding Division by Zero

```python
def safe_divide(a, b):
    """Divide with zero check."""
    # If b is 0 (falsy), returns 0 without dividing
    # Otherwise, performs division
    return b != 0 and a / b

print(safe_divide(10, 2))  # 5.0
print(safe_divide(10, 0))  # False (not 0, but falsy)

# Better version with explicit return
def safe_divide_v2(a, b):
    """Divide with zero check."""
    if b == 0:
        return None
    return a / b

print(safe_divide_v2(10, 2))  # 5.0
print(safe_divide_v2(10, 0))  # None
```

### Lazy Validation

```python
def validate_user(user):
    """Validate user data with short-circuit."""
    # Check in order of expense: cheap checks first
    return (
        user and                           # Not None/empty (cheap)
        'email' in user and                # Has email key (cheap)
        len(user['email']) > 0 and         # Email not empty (cheap)
        '@' in user['email'] and           # Basic format check (cheap)
        user['email'].endswith('.com')     # Domain check (cheap)
    )

# Valid user
valid = {"email": "alice@example.com"}
print(validate_user(valid))  # True

# Invalid users (stops early)
print(validate_user(None))              # False (stops at first check)
print(validate_user({}))                # False (stops at 'email' in user)
print(validate_user({"email": ""}))    # False (stops at len check)
print(validate_user({"email": "bad"})) # False (stops at @ check)
```

## Performance Optimization

```python
import time

def slow_check():
    """Simulate slow operation."""
    time.sleep(0.1)  # 100ms delay
    return True

def fast_check():
    """Fast operation."""
    return False

# ❌ Slow: expensive check first
start = time.time()
result = slow_check() and fast_check()
elapsed1 = time.time() - start
print(f"Slow first: {elapsed1:.3f}s, Result: {result}")

# ✅ Fast: cheap check first (short-circuits!)
start = time.time()
result = fast_check() and slow_check()
elapsed2 = time.time() - start
print(f"Fast first: {elapsed2:.3f}s, Result: {result}")

print(f"Speedup: {elapsed1/elapsed2:.1f}x faster")
# Slow first: 0.100s, Result: False
# Fast first: 0.000s, Result: False
# Speedup: ~1000x faster!
```

## Default Values Pattern

```python
# Using OR for defaults
def greet(name):
    """Greet user with default name."""
    display_name = name or "Guest"
    return f"Hello, {display_name}!"

print(greet("Alice"))  # Hello, Alice!
print(greet(""))       # Hello, Guest!
print(greet(None))     # Hello, Guest!

# Chain of fallbacks
def get_config_value(primary, secondary, default):
    """Get first available value."""
    return primary or secondary or default

print(get_config_value(None, "backup", "default"))  # backup
print(get_config_value("", "", "default"))          # default
print(get_config_value("main", "backup", "default")) # main

# With environment variables
import os

def get_api_url():
    """Get API URL with fallbacks."""
    return (
        os.getenv('API_URL') or           # Environment variable
        os.getenv('DEFAULT_API_URL') or   # Backup env var
        'http://localhost:3000'           # Hardcoded default
    )
```

## Return First Truthy Value

```python
def find_first_valid(*args):
    """Return first truthy argument."""
    for arg in args:
        if arg:
            return arg
    return None

# Using short-circuit OR
def find_first_valid_short(*args):
    """Using short-circuit evaluation."""
    result = None
    for arg in args:
        result = result or arg
    return result

print(find_first_valid(None, "", 0, "Found!", "Ignored"))
# "Found!"

print(find_first_valid_short(None, "", 0, "Found!", "Ignored"))
# "Found!"

# More concise with reduce
from functools import reduce
import operator

def find_first_valid_reduce(*args):
    """Using reduce with OR."""
    return reduce(operator.or_, args, None)

print(find_first_valid_reduce(None, "", 0, "Found!", "Ignored"))
# "Found!"
```

## Guard Clauses

```python
def process_order(order):
    """Process order with guard clauses."""
    # Early returns using short-circuit
    if not order:
        return "No order provided"
    
    if not order.get('items'):
        return "Order has no items"
    
    if not order.get('customer'):
        return "No customer specified"
    
    # Combine checks with and
    if not (order.get('items') and order.get('customer') and order.get('payment')):
        return "Incomplete order"
    
    # Process valid order
    return f"Processing order for {order['customer']}"

print(process_order(None))
# No order provided

print(process_order({'items': []}))
# Order has no items

print(process_order({'items': ['apple'], 'customer': 'Alice', 'payment': 'card'}))
# Processing order for Alice
```

## Chaining Comparisons

```python
# Short-circuit in chained comparisons
def validate_score(score):
    """Validate score range."""
    # All conditions must be True
    return 0 <= score <= 100

print(validate_score(50))   # True
print(validate_score(-10))  # False (stops at 0 <= score)
print(validate_score(150))  # False (stops at score <= 100)

# Multiple chains
def validate_triangle(a, b, c):
    """Check if sides form valid triangle."""
    # Triangle inequality: sum of any two sides > third side
    return (
        a > 0 and b > 0 and c > 0 and  # All positive
        a + b > c and                   # Side a + b > c
        b + c > a and                   # Side b + c > a
        c + a > b                       # Side c + a > b
    )

print(validate_triangle(3, 4, 5))    # True
print(validate_triangle(1, 2, 10))   # False
print(validate_triangle(-1, 2, 3))   # False (stops at a > 0)
```

## Common Patterns

```python
# Pattern 1: Safe method call
obj = None
result = obj and obj.some_method()  # Returns None, doesn't call method

# Pattern 2: Conditional execution
def debug(message):
    """Print debug message."""
    print(f"DEBUG: {message}")

DEBUG = False
DEBUG and debug("This only prints if DEBUG=True")  # Doesn't print

DEBUG = True
DEBUG and debug("Now this prints")  # Prints

# Pattern 3: First non-empty
def get_title(obj):
    """Get title with fallbacks."""
    return obj.get('title') or obj.get('name') or 'Untitled'

print(get_title({'name': 'Test'}))        # Test
print(get_title({'title': 'Document'}))   # Document
print(get_title({}))                      # Untitled

# Pattern 4: All conditions must pass
def can_vote(age, citizen, registered):
    """Check voting eligibility."""
    return age >= 18 and citizen and registered

print(can_vote(20, True, True))   # True
print(can_vote(16, True, True))   # False (stops at age check)
print(can_vote(20, False, True))  # False (stops at citizen)
```

## Gotchas and Best Practices

```python
# Gotcha 1: AND returns value, not just boolean
print(5 and 10)          # 10 (not True!)
print(0 and "hello")     # 0 (not False!)
print("a" and "b")       # "b"

# Gotcha 2: OR returns value, not just boolean
print(5 or 10)           # 5 (first truthy)
print(0 or "hello")      # "hello"
print(None or False or 0 or "found")  # "found"

# Best Practice 1: Put cheap checks first
# ❌ Slow check first
if expensive_database_call() and is_valid_format(data):
    process()

# ✅ Fast check first
if is_valid_format(data) and expensive_database_call():
    process()

# Best Practice 2: Put likely-false first in AND
if unlikely_condition() and likely_condition():
    # Saves time by short-circuiting more often
    pass

# Best Practice 3: Put likely-true first in OR
if likely_condition() or unlikely_condition():
    # Saves time by short-circuiting more often
    pass
```

## Summary

**Short-Circuit Evaluation:**
- **AND**: Stops at first falsy value
- **OR**: Stops at first truthy value
- **Benefits**: Performance, safety, concise code

**Key Patterns:**
1. **Defaults**: `value or default`
2. **Safe access**: `obj and obj.attr`
3. **Guard clauses**: `if not condition: return`
4. **Chained fallbacks**: `primary or backup or default`

**Optimization Tips:**
- Put cheap checks before expensive ones
- Put likely-to-fail checks first in AND
- Put likely-to-succeed checks first in OR
- Avoid unnecessary function calls

**Returns Values:**
- AND returns first falsy OR last value
- OR returns first truthy OR last value
- Not just True/False!

Short-circuit evaluation makes Python code more efficient and enables elegant patterns for defaults, safety checks, and conditional logic.

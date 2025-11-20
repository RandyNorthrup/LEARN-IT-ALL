---
id: "84-truth-testing"
title: "Truth Testing and Truthiness"
chapterId: ch4-comparisons
order: 6
duration: 25
objectives:
  - Understand truthy and falsy values in Python
  - Learn implicit boolean conversion
  - Master truth testing in conditionals
  - Recognize common truthiness patterns
---

# Truth Testing and Truthiness

Python evaluates values as True or False in boolean contexts even if they're not explicitly boolean. Understanding "truthiness" helps write concise, Pythonic conditionals.

## Truthy and Falsy Values

Every Python value has an inherent boolean value:

```python
# Falsy values (evaluate to False)
print(bool(False))     # False
print(bool(None))      # False
print(bool(0))         # False
print(bool(0.0))       # False
print(bool(""))        # False (empty string)
print(bool([]))        # False (empty list)
print(bool(()))        # False (empty tuple)
print(bool({}))        # False (empty dict)
print(bool(set()))     # False (empty set)

# Truthy values (evaluate to True)
print(bool(True))      # True
print(bool(1))         # True
print(bool(-5))        # True (any non-zero number)
print(bool("hello"))   # True (non-empty string)
print(bool([1, 2]))    # True (non-empty list)
print(bool({"a": 1}))  # True (non-empty dict)
```

**Key Rule**: Almost everything is truthy except the specific falsy values above.

## Implicit Boolean Conversion

Python automatically converts values in conditional contexts:

```python
# Checking if string is non-empty
name = "Alice"

# Explicit (verbose)
if len(name) > 0:
    print(f"Hello, {name}")

# Implicit (Pythonic)
if name:
    print(f"Hello, {name}")

# Both work the same way!
# Implicit is more concise and idiomatic

# Empty string
empty_name = ""
if empty_name:
    print("Has name")
else:
    print("No name")  # This prints

# Zero vs non-zero
count = 0
if count:
    print("Has items")
else:
    print("Empty")  # This prints

count = 5
if count:
    print("Has items")  # This prints
```

## Checking Collections

```python
# Lists
items = []
if items:
    print("List has items")
else:
    print("List is empty")  # This prints

items = [1, 2, 3]
if items:
    print("List has items")  # This prints

# Dictionaries
user = {}
if user:
    print("User has data")
else:
    print("User is empty")  # This prints

user = {"name": "Bob"}
if user:
    print("User has data")  # This prints

# Sets
tags = set()
if tags:
    print("Has tags")
else:
    print("No tags")  # This prints

# Pythonic pattern
def process_items(items):
    """Process items if list is not empty."""
    if not items:
        print("No items to process")
        return
    
    for item in items:
        print(f"Processing {item}")

process_items([])           # No items to process
process_items([1, 2, 3])    # Processes items
```

## None Checks

```python
# None is falsy
result = None

if result:
    print("Has result")
else:
    print("No result")  # This prints

# Common pattern: check for None explicitly vs implicitly
def get_user(user_id):
    """Simulate database lookup."""
    if user_id == 1:
        return {"name": "Alice", "age": 30}
    return None

# Explicit None check (when you specifically check for None)
user = get_user(2)
if user is None:
    print("User not found")

# Implicit truthiness (when any falsy value means failure)
user = get_user(1)
if user:
    print(f"Found: {user['name']}")

# Be careful with False, 0, empty string as valid values!
def get_score(player):
    """Get player score (0 is valid)."""
    scores = {"Alice": 0, "Bob": 5}
    return scores.get(player)

score = get_score("Alice")

# ❌ Wrong - 0 is falsy but valid!
if score:
    print(f"Score: {score}")
else:
    print("No score")  # Wrong! Score is 0

# ✅ Correct - explicitly check for None
if score is not None:
    print(f"Score: {score}")  # Correct!
else:
    print("No score")
```

## Using `not` for Negation

```python
# Check if empty
items = []
if not items:
    print("No items")  # This prints

# Check if None
result = None
if result is not None:
    print(f"Result: {result}")
else:
    print("No result")  # This prints

# Check if string is empty
message = ""
if not message:
    print("No message")  # This prints

# Double negative: check if NOT empty
items = [1, 2, 3]
if not not items:  # Not recommended! Hard to read
    print("Has items")

# Better: just check truthiness
if items:
    print("Has items")  # This prints
```

## Truthiness in Logical Operations

```python
# and returns first falsy or last value
print(0 and "hello")        # 0 (first falsy)
print("" and "world")       # "" (first falsy)
print("hi" and "bye")       # "bye" (both truthy, returns last)
print(5 and 10 and 20)      # 20 (all truthy, returns last)

# or returns first truthy or last value
print(0 or "hello")         # "hello" (first truthy)
print("" or "world")        # "world" (first truthy)
print(None or [] or "hi")   # "hi" (first truthy)
print(0 or False or "")     # "" (all falsy, returns last)

# Practical use: default values
name = ""
display_name = name or "Guest"
print(display_name)  # "Guest"

name = "Alice"
display_name = name or "Guest"
print(display_name)  # "Alice"

# Getting first non-empty value
def get_first_valid(*args):
    """Return first truthy argument."""
    for arg in args:
        if arg:
            return arg
    return None

print(get_first_valid(None, "", 0, "Found!"))  # "Found!"
print(get_first_valid(0, False, None))         # None
```

## Common Patterns

```python
# Pattern 1: Early return if invalid
def process_data(data):
    """Process data if valid."""
    if not data:
        return "No data provided"
    
    # Process data here
    return f"Processed {len(data)} items"

print(process_data([]))           # No data provided
print(process_data([1, 2, 3]))    # Processed 3 items

# Pattern 2: Default value
def greet(name):
    """Greet user with default."""
    display_name = name or "Guest"
    return f"Hello, {display_name}!"

print(greet("Alice"))  # Hello, Alice!
print(greet(""))       # Hello, Guest!
print(greet(None))     # Hello, Guest!

# Pattern 3: Chaining with or
def get_config_value(config, key, default):
    """Get config value with fallback."""
    return config.get(key) or default

config = {"theme": "dark", "font_size": 0}

# Be careful with 0!
font = get_config_value(config, "font_size", 12)
print(font)  # 12 (wrong! 0 is valid but falsy)

# Better: use dict.get() default
font = config.get("font_size", 12)
print(font)  # 0 (correct!)

# Pattern 4: All or any
numbers = [2, 4, 6, 8]
if all(n % 2 == 0 for n in numbers):
    print("All even")  # This prints

numbers = [1, 3, 5, 7]
if any(n % 2 == 0 for n in numbers):
    print("Has even number")
else:
    print("All odd")  # This prints
```

## Truthiness with Custom Objects

```python
class ShoppingCart:
    """Shopping cart with truthiness."""
    
    def __init__(self):
        self.items = []
    
    def add(self, item):
        self.items.append(item)
    
    def __bool__(self):
        """Cart is truthy if it has items."""
        return len(self.items) > 0
    
    def __len__(self):
        """Return number of items."""
        return len(self.items)

cart = ShoppingCart()

# Empty cart is falsy
if cart:
    print("Cart has items")
else:
    print("Cart is empty")  # This prints

cart.add("Apple")
cart.add("Banana")

# Non-empty cart is truthy
if cart:
    print(f"Cart has {len(cart)} items")  # This prints

# Without __bool__, object would always be truthy
class BadCart:
    def __init__(self):
        self.items = []

bad_cart = BadCart()
if bad_cart:
    print("This always prints even when empty!")
```

## When to Use Explicit vs Implicit

```python
# Use IMPLICIT (truthiness) when:
# - Checking if collection is empty
items = []
if items:  # Clear: checking if list has items
    process(items)

# - Checking if string is empty
name = ""
if name:  # Clear: checking if name exists
    print(name)

# - Getting first truthy value
display = username or email or "Guest"

# Use EXPLICIT when:
# - Checking specifically for None
result = get_result()
if result is None:  # Clear: checking for None, not any falsy
    handle_error()

# - Zero/False are valid values
score = 0  # Valid score
if score is not None:  # Correct: 0 is valid
    print(f"Score: {score}")

# - Clarity is more important
age = 0
if age > 0:  # Clearer than: if age:
    print(f"Age: {age}")

# - Type safety matters
value = ""
if isinstance(value, str) and value:  # Both type and emptiness
    print(value)
```

## Common Pitfalls

```python
# Pitfall 1: Confusing 0 or False as "no value"
def get_status():
    return 0  # 0 means "inactive" (valid state)

status = get_status()
if status:
    print("Active")
else:
    print("Inactive")  # Wrong! 0 is valid

# Fix: be explicit
if status == 1:
    print("Active")
else:
    print("Inactive")

# Pitfall 2: Using 'or' with 0
def calculate_tax(income, rate=None):
    # ❌ Wrong if rate is 0
    tax_rate = rate or 0.1
    return income * tax_rate

print(calculate_tax(1000, 0))    # Wrong! Uses 0.1 instead of 0
print(calculate_tax(1000, 0.05)) # 50.0 (correct)

# Fix: check for None explicitly
def calculate_tax(income, rate=None):
    tax_rate = 0.1 if rate is None else rate
    return income * tax_rate

print(calculate_tax(1000, 0))    # 0.0 (correct!)
print(calculate_tax(1000, 0.05)) # 50.0 (correct)
```

## Summary

**Falsy Values (only these):**
- `False`, `None`, `0`, `0.0`, `""`, `[]`, `()`, `{}`, `set()`

**Truthy Values:**
- Everything else!

**Best Practices:**
- Use implicit truthiness for empty checks: `if items:` not `if len(items) > 0:`
- Use explicit None checks: `if x is None:` not `if not x:`
- Be careful with 0, False, "" as valid values
- Use `or` for default values: `name or "Guest"`
- Use `and` for short-circuit evaluation

**When to Use:**
- **Implicit**: Empty collection checks, simple existence checks
- **Explicit**: None checks, when 0/False/empty are valid values

Understanding truthiness makes your Python code more concise and idiomatic while avoiding common bugs with falsy values that are actually valid.

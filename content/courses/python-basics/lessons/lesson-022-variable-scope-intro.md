---
id: 48-variable-scope-intro
title: Variable Scope Basics
chapterId: ch2-variables
order: 9
duration: 25
objectives:
  - Understand variable scope fundamentals
  - Distinguish between local and global variables
  - Learn variable shadowing
  - Understand variable lifetime
  - Preview scope concepts covered in detail later
---

# Variable Scope Basics

## Introduction

**Scope** determines where in your code a variable can be accessed. Understanding scope prevents bugs and helps you write cleaner code. This lesson introduces scope basics; we'll dive deeper in Chapter 4.

## What is Scope?

Scope is the region of code where a variable exists and can be accessed:

```python
# Global scope - accessible everywhere
global_var = "I'm global!"

def my_function():
    # Local scope - only inside this function
    local_var = "I'm local!"
    print(global_var)  # Can access global
    print(local_var)   # Can access local

my_function()
print(global_var)  # Works
print(local_var)   # Error! local_var doesn't exist here
```

## Local Variables

Variables created inside a function are **local** to that function:

```python
def calculate():
    result = 42  # Local variable
    return result

print(calculate())  # 42
print(result)       # NameError: result is not defined
```

Each function call creates new local variables:

```python
def greet(name):
    message = f"Hello, {name}!"  # Local to this call
    return message

print(greet("Alice"))  # Hello, Alice!
print(greet("Bob"))    # Hello, Bob!
print(message)         # Error! message doesn't exist outside
```

## Global Variables

Variables created outside functions are **global**:

```python
# Global variable
counter = 0

def increment():
    # Can read global variables
    print(f"Counter is: {counter}")

increment()  # Counter is: 0
print(counter)  # 0
```

### Reading vs Modifying Globals

You can read globals, but modifying requires the `global` keyword:

```python
count = 0

def increment():
    # This creates a NEW local variable called count!
    count = count + 1  # Error: can't access before assignment
    print(count)

# To modify global, use 'global' keyword
def increment_correct():
    global count
    count = count + 1
    print(count)

increment_correct()  # 1
print(count)         # 1
```

## Variable Shadowing

Local variables can "shadow" (hide) global variables with the same name:

```python
# Global variable
name = "Global Alice"

def greet():
    # Local variable shadows global
    name = "Local Bob"
    print(name)  # Prints local variable

greet()       # Local Bob
print(name)   # Global Alice (unchanged)
```

Another example:

```python
x = 100  # Global

def calculate():
    x = 10  # Local (shadows global)
    y = 20  # Local
    return x + y

result = calculate()
print(result)  # 30 (uses local x = 10)
print(x)       # 100 (global x unchanged)
```

## Variable Lifetime

Variables exist only within their scope:

```python
def process_data():
    data = [1, 2, 3]  # Created when function is called
    result = sum(data)
    return result
    # data and result are destroyed after function returns

answer = process_data()
print(answer)  # 6
print(data)    # Error! data no longer exists
```

## Function Parameters

Function parameters are local variables:

```python
def greet(name, age):
    # name and age are local variables
    message = f"{name} is {age} years old"
    return message

greet("Alice", 25)
print(name)  # Error! name doesn't exist outside function
```

## Nested Scopes (Preview)

Functions can be nested, creating multiple scope levels:

```python
# Global scope
x = "global"

def outer():
    # Outer function scope
    x = "outer"
    
    def inner():
        # Inner function scope
        x = "inner"
        print(f"Inner: {x}")
    
    inner()
    print(f"Outer: {x}")

outer()
print(f"Global: {x}")

# Output:
# Inner: inner
# Outer: outer
# Global: global
```

## Practical Examples

### Example 1: Counter with Global State

```python
# Global counter
total_requests = 0

def handle_request():
    global total_requests
    total_requests += 1
    print(f"Request #{total_requests} processed")

handle_request()  # Request #1 processed
handle_request()  # Request #2 processed
handle_request()  # Request #3 processed
```

### Example 2: Local vs Global

```python
# Global configuration
MAX_RETRIES = 3

def attempt_connection(url):
    # Local variables
    retries = 0
    connected = False
    
    while retries < MAX_RETRIES and not connected:
        print(f"Attempting connection to {url}...")
        retries += 1
        # Simulate connection logic
        connected = (retries == 2)
    
    return connected

result = attempt_connection("http://example.com")
print(f"Connected: {result}")
# MAX_RETRIES is accessible (global)
# retries is NOT accessible here (local)
```

### Example 3: Avoiding Global Variables

```python
# Bad: Using global variables
total = 0

def add_to_total(value):
    global total
    total += value

add_to_total(10)
add_to_total(20)
print(total)  # 30

# Better: Pass values and return results
def add_numbers(current_total, value):
    return current_total + value

total = 0
total = add_numbers(total, 10)
total = add_numbers(total, 20)
print(total)  # 30
```

### Example 4: Unintended Shadowing

```python
# Global variable
users = ["Alice", "Bob", "Charlie"]

def process_users():
    # Accidentally shadows global
    users = []  # New local variable!
    users.append("Dave")
    print(f"Local users: {users}")

process_users()  # Local users: ['Dave']
print(users)     # ['Alice', 'Bob', 'Charlie'] (global unchanged)

# If you meant to modify global:
def process_users_correct():
    global users
    users.append("Dave")
    print(f"Global users: {users}")
```

## Scope Best Practices

```python
# 1. Minimize global variables
# Bad:
data = []
def add_item(item):
    global data
    data.append(item)

# Good:
def add_item(data_list, item):
    data_list.append(item)
    return data_list

# 2. Use clear variable names
def calculate_price(quantity, unit_price):
    # Clear local variable
    total_price = quantity * unit_price
    discount = total_price * 0.1
    final_price = total_price - discount
    return final_price

# 3. Don't reuse variable names unnecessarily
# Confusing:
def process():
    data = get_data()
    data = clean_data(data)
    data = transform_data(data)
    return data

# Better:
def process():
    raw_data = get_data()
    cleaned_data = clean_data(raw_data)
    transformed_data = transform_data(cleaned_data)
    return transformed_data
```

## Common Scope Errors

```python
# Error 1: Using local before assignment
count = 10
def increment():
    count = count + 1  # UnboundLocalError
    return count

# Fix: Use global
def increment():
    global count
    count = count + 1
    return count

# Error 2: Accessing local outside scope
def calculate():
    result = 42
    return result

print(result)  # NameError

# Fix: Use return value
result = calculate()
print(result)  # 42

# Error 3: Shadowing unintentionally
max_value = 100
def process(max_value):  # Parameter shadows global
    return max_value * 2

print(process(50))  # 100 (uses parameter)
print(max_value)    # 100 (global unchanged)
```

## When to Use Global Variables

Global variables are okay for:

```python
# Constants (read-only values)
PI = 3.14159
MAX_USERS = 100
API_URL = "https://api.example.com"

# Configuration settings
DEBUG_MODE = True
LOG_LEVEL = "INFO"

# Shared state (use sparingly)
cache = {}
```

Avoid globals for:
- Data that changes frequently
- Values that should be encapsulated in functions
- Anything that makes testing harder

## Summary

- **Scope**: Where a variable can be accessed
- **Local scope**: Inside a function (created and destroyed with each call)
- **Global scope**: Outside all functions (exists for entire program)
- **Shadowing**: Local variable hides global with same name
- **global keyword**: Required to modify global variables in functions
- **Best practice**: Minimize global variables, use function parameters and return values
- **Variable lifetime**: Variables exist only within their scope

## Next Steps

Next, you'll learn about variable memory and how Python manages variable storage. In Chapter 4, you'll dive deep into scope with the LEGB rule, closures, and nested scope patterns.

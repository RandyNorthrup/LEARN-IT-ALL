---
id: 56-nested-functions-closures
title: Nested Functions and Closures
chapterId: ch6-functions
order: 12
duration: 25
objectives:
  - Create nested functions
  - Understand closures
  - Use nonlocal keyword
  - Build function factories
  - Apply closure patterns
---

# Nested Functions and Closures

## Introduction

Functions can be defined inside other functions. When an inner function references variables from the outer function, it creates a **closure**.

## Nested Functions

Define functions inside other functions:

```python
def outer():
    """Outer function"""
    print("Outer function")
    
    def inner():
        """Inner function"""
        print("Inner function")
    
    inner()  # Call inner function

outer()
# Outer function
# Inner function
```

## Closures

Inner functions can access outer function variables:

```python
def outer(x):
    """Outer function with variable"""
    
    def inner(y):
        """Inner function accesses outer variable"""
        return x + y
    
    return inner

# Create closure
add_five = outer(5)
print(add_five(3))  # 8 (5 + 3)
print(add_five(10)) # 15 (5 + 10)

# x is "remembered" even though outer() finished
```

## How Closures Work

```python
def create_multiplier(n):
    """Create a function that multiplies by n"""
    
    def multiplier(x):
        # Accesses n from enclosing scope
        return x * n
    
    return multiplier

# Create specialized functions
double = create_multiplier(2)
triple = create_multiplier(3)
quadruple = create_multiplier(4)

print(double(5))     # 10
print(triple(5))     # 15
print(quadruple(5))  # 20

# Each closure remembers its own n
```

## The nonlocal Keyword

Modify outer function variables:

```python
def counter():
    """Create a counter closure"""
    count = 0
    
    def increment():
        nonlocal count  # Required to modify outer variable
        count += 1
        return count
    
    return increment

# Create counter
count_up = counter()
print(count_up())  # 1
print(count_up())  # 2
print(count_up())  # 3
```

### Without nonlocal (Error)

```python
def broken_counter():
    count = 0
    
    def increment():
        count = count + 1  # Error! Can't access before assignment
        return count
    
    return increment

# counter = broken_counter()
# print(counter())  # UnboundLocalError!
```

## Practical Examples

### Example 1: Function Factory

```python
def create_greeting(greeting):
    """Create custom greeting function"""
    
    def greet(name):
        return f"{greeting}, {name}!"
    
    return greet

# Create different greeters
say_hello = create_greeting("Hello")
say_hi = create_greeting("Hi")
say_howdy = create_greeting("Howdy")

print(say_hello("Alice"))  # Hello, Alice!
print(say_hi("Bob"))       # Hi, Bob!
print(say_howdy("Charlie")) # Howdy, Charlie!
```

### Example 2: Adder Factory

```python
def make_adder(n):
    """Create function that adds n to its argument"""
    
    def add(x):
        return x + n
    
    return add

# Create specialized adders
add_10 = make_adder(10)
add_20 = make_adder(20)

print(add_10(5))  # 15
print(add_20(5))  # 25
```

### Example 3: Rate Limiter

```python
import time

def create_rate_limiter(max_calls, time_window):
    """Create a rate-limited function"""
    calls = []
    
    def rate_limited_function(func):
        def wrapper(*args, **kwargs):
            nonlocal calls
            
            # Remove old calls outside time window
            current_time = time.time()
            calls = [t for t in calls if current_time - t < time_window]
            
            # Check if we can make another call
            if len(calls) >= max_calls:
                raise Exception("Rate limit exceeded")
            
            # Record this call
            calls.append(current_time)
            return func(*args, **kwargs)
        
        return wrapper
    
    return rate_limited_function

# Allow 3 calls per 10 seconds
@create_rate_limiter(3, 10)
def api_call():
    print("API called")

# First 3 calls work
api_call()
api_call()
api_call()
# api_call()  # Would raise exception
```

### Example 4: Account Balance Tracker

```python
def create_account(initial_balance):
    """Create bank account with closure"""
    balance = initial_balance
    
    def deposit(amount):
        nonlocal balance
        balance += amount
        return balance
    
    def withdraw(amount):
        nonlocal balance
        if amount > balance:
            raise ValueError("Insufficient funds")
        balance -= amount
        return balance
    
    def get_balance():
        return balance
    
    return deposit, withdraw, get_balance

# Create account
deposit, withdraw, check = create_account(1000)

print(check())      # 1000
deposit(500)
print(check())      # 1500
withdraw(200)
print(check())      # 1300
```

### Example 5: Memoization Cache

```python
def memoize(func):
    """Create memoized version of function"""
    cache = {}
    
    def wrapper(*args):
        if args in cache:
            print(f"Cache hit for {args}")
            return cache[args]
        
        print(f"Computing {args}")
        result = func(*args)
        cache[args] = result
        return result
    
    return wrapper

@memoize
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(10))  # Computes once
print(fibonacci(10))  # Cache hit
```

### Example 6: Configuration Builder

```python
def create_config_builder():
    """Build configuration with closures"""
    config = {}
    
    def set_option(key, value):
        nonlocal config
        config[key] = value
        return set_option  # Return self for chaining
    
    def get_config():
        return config.copy()
    
    def reset():
        nonlocal config
        config = {}
        return set_option
    
    return set_option, get_config, reset

# Use builder pattern
set_opt, get_cfg, reset_cfg = create_config_builder()

set_opt("host", "localhost") \
    ("port", 5432) \
    ("database", "mydb")

config = get_cfg()
print(config)  # {'host': 'localhost', 'port': 5432, 'database': 'mydb'}
```

## Closure Scope Rules

```python
def outer():
    x = 10  # Outer scope
    
    def middle():
        x = 20  # Middle scope (shadows outer)
        
        def inner():
            x = 30  # Inner scope (shadows middle)
            print(f"Inner x: {x}")
        
        inner()
        print(f"Middle x: {x}")
    
    middle()
    print(f"Outer x: {x}")

outer()
# Inner x: 30
# Middle x: 20
# Outer x: 10
```

## Multiple Closures

```python
def create_counter():
    """Create increment and decrement functions"""
    count = 0
    
    def increment():
        nonlocal count
        count += 1
        return count
    
    def decrement():
        nonlocal count
        count -= 1
        return count
    
    def reset():
        nonlocal count
        count = 0
    
    return increment, decrement, reset

inc, dec, reset = create_counter()

print(inc())  # 1
print(inc())  # 2
print(dec())  # 1
reset()
print(inc())  # 1
```

## Closure vs Global

```python
# Global variable (avoid)
global_count = 0

def increment_global():
    global global_count
    global_count += 1
    return global_count

# Closure (better)
def create_counter():
    count = 0
    
    def increment():
        nonlocal count
        count += 1
        return count
    
    return increment

# Closures are better:
# - Encapsulated
# - Reusable
# - No global state pollution
```

## Common Patterns

```python
# Pattern 1: Private state
def create_secret_holder(secret):
    def get_secret():
        return secret
    return get_secret

# Pattern 2: Function customization
def create_validator(min_val, max_val):
    def validate(value):
        return min_val <= value <= max_val
    return validate

# Pattern 3: Event handlers
def create_button_handler(button_id):
    def handle_click():
        print(f"Button {button_id} clicked")
    return handle_click
```

## Summary

- **Nested functions**: Functions defined inside functions
- **Closures**: Inner function accessing outer function variables
- **nonlocal**: Modify outer function variables
- **Use cases**: Factories, counters, caching, configuration
- **Benefits**: Encapsulation, state preservation
- **LEGB rule**: Local, Enclosing, Global, Built-in
- **Better than globals**: More modular and testable

## Next Steps

You've completed Chapter 3: Functions! Next, you'll dive deep into Python scope with the LEGB rule and advanced scope concepts.

---
id: nested-scope-closures
title: Nested Scope and Closures
chapterId: ch7-scope
order: 2
duration: 30
objectives:
  - Understand nested function scope
  - Master the nonlocal keyword
  - Learn about closures
  - Create function factories with closures
---

# Nested Scope and Closures

Nested functions can access variables from their enclosing functions, creating powerful patterns called closures.

## Nested Functions

Functions inside functions:

```python
def outer():
    print("Outer function")
    
    def inner():
        print("Inner function")
    
    inner()  # Call inner function

outer()
# Outer function
# Inner function
```

Inner functions are only accessible inside outer functions:

```python
def outer():
    def inner():
        return "Hello"
    return inner()

print(outer())  # Hello

# ❌ Error - inner() not accessible here
# inner()  # NameError
```

## Accessing Enclosing Scope

Inner functions can read variables from outer functions:

```python
def outer():
    message = "Hello from outer"  # Enclosing variable
    
    def inner():
        print(message)  # Can access enclosing variable
    
    inner()

outer()  # Hello from outer
```

## The LEGB Rule

Python searches for variables in this order:

1. **L**ocal - Current function
2. **E**nclosing - Outer function(s)
3. **G**lobal - Module level
4. **B**uilt-in - Python built-ins

```python
x = "global"

def outer():
    x = "enclosing"
    
    def inner():
        x = "local"
        print(f"Local: {x}")
    
    inner()
    print(f"Enclosing: {x}")

outer()
print(f"Global: {x}")

# Local: local
# Enclosing: enclosing
# Global: global
```

## The nonlocal Keyword

Modify variables in enclosing scope:

```python
def outer():
    count = 0  # Enclosing variable
    
    def increment():
        nonlocal count  # Access enclosing count
        count += 1
        return count
    
    print(increment())  # 1
    print(increment())  # 2
    print(increment())  # 3

outer()
```

Without `nonlocal`, you create a new local variable:

```python
def outer():
    count = 0
    
    def increment_wrong():
        # ❌ Creates local variable
        count = count + 1  # UnboundLocalError
    
    def increment_creates_new():
        count = 1  # Creates new local, doesn't modify enclosing
        print(f"Local count: {count}")
    
    increment_creates_new()  # Local count: 1
    print(f"Enclosing count: {count}")  # Enclosing count: 0

outer()
```

## Closures

A closure is when an inner function "remembers" variables from its enclosing scope:

```python
def make_multiplier(factor):
    def multiply(number):
        return number * factor  # Remembers 'factor'
    return multiply  # Return the inner function

times_two = make_multiplier(2)
times_three = make_multiplier(3)

print(times_two(5))    # 10
print(times_two(10))   # 20
print(times_three(5))  # 15
print(times_three(10)) # 30
```

Each closure has its own copy of the enclosing variables.

## Practical Examples

### Example 1: Counter Factory

```python
def make_counter(start=0):
    count = start  # Enclosing variable
    
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
        count = start
        return count
    
    def get_value():
        return count
    
    return increment, decrement, reset, get_value

# Create counter
inc, dec, reset, get = make_counter(10)

print(inc())    # 11
print(inc())    # 12
print(dec())    # 11
print(get())    # 11
print(reset())  # 10
```

### Example 2: Bank Account

```python
def create_account(initial_balance):
    balance = initial_balance  # Enclosing variable
    transactions = []
    
    def deposit(amount):
        nonlocal balance
        if amount <= 0:
            return "Invalid amount"
        balance += amount
        transactions.append(f"Deposit: +${amount}")
        return balance
    
    def withdraw(amount):
        nonlocal balance
        if amount <= 0:
            return "Invalid amount"
        if amount > balance:
            return "Insufficient funds"
        balance -= amount
        transactions.append(f"Withdraw: -${amount}")
        return balance
    
    def get_balance():
        return balance
    
    def get_transactions():
        return transactions.copy()
    
    return {
        "deposit": deposit,
        "withdraw": withdraw,
        "balance": get_balance,
        "transactions": get_transactions
    }

# Create account
account = create_account(1000)

print(account["deposit"](500))    # 1500
print(account["withdraw"](200))   # 1300
print(account["balance"]())       # 1300
print(account["transactions"]())  
# ['Deposit: +$500', 'Withdraw: -$200']
```

### Example 3: Message Formatter

```python
def create_formatter(prefix, suffix):
    def format_message(message):
        return f"{prefix}{message}{suffix}"
    return format_message

# Create different formatters
bold = create_formatter("**", "**")
italic = create_formatter("*", "*")
code = create_formatter("`", "`")

print(bold("Hello"))    # **Hello**
print(italic("World"))  # *World*
print(code("python"))   # `python`
```

### Example 4: Rate Limiter

```python
def create_rate_limiter(max_calls, time_window):
    calls = []
    
    def can_call():
        nonlocal calls
        import time
        current_time = time.time()
        
        # Remove old calls outside time window
        calls = [t for t in calls if current_time - t < time_window]
        
        if len(calls) < max_calls:
            calls.append(current_time)
            return True
        return False
    
    def get_remaining():
        import time
        current_time = time.time()
        calls_in_window = [t for t in calls if current_time - t < time_window]
        return max_calls - len(calls_in_window)
    
    return can_call, get_remaining

# Create limiter: 3 calls per 60 seconds
can_call, get_remaining = create_rate_limiter(3, 60)

print(can_call())  # True
print(can_call())  # True
print(can_call())  # True
print(can_call())  # False (limit reached)
print(f"Remaining: {get_remaining()}")  # Remaining: 0
```

### Example 5: Function Cache (Memoization)

```python
def memoize(func):
    cache = {}
    
    def wrapper(n):
        if n in cache:
            print(f"Cache hit for {n}")
            return cache[n]
        print(f"Computing for {n}")
        result = func(n)
        cache[n] = result
        return result
    
    return wrapper

@memoize
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(5))
# Computing for 5
# Computing for 4
# Computing for 3
# Computing for 2
# Computing for 1
# Computing for 0
# Cache hit for 1
# Cache hit for 2
# Cache hit for 3
# 5
```

## Multiple Nested Levels

Functions can nest multiple levels deep:

```python
def level1():
    x = "Level 1"
    
    def level2():
        y = "Level 2"
        
        def level3():
            z = "Level 3"
            print(f"{x}, {y}, {z}")  # Can access all levels
        
        level3()
    
    level2()

level1()  # Level 1, Level 2, Level 3
```

## Closure State Preservation

Each closure maintains its own state:

```python
def make_adder(x):
    def add(y):
        return x + y
    return add

add_5 = make_adder(5)
add_10 = make_adder(10)

print(add_5(3))   # 8
print(add_5(7))   # 12
print(add_10(3))  # 13
print(add_10(7))  # 17

# Each closure has its own 'x'
```

## Common Patterns

### Pattern 1: Private Variables

```python
def create_person(name, age):
    # Private variables (not directly accessible)
    _name = name
    _age = age
    
    def get_name():
        return _name
    
    def get_age():
        return _age
    
    def set_age(new_age):
        nonlocal _age
        if new_age >= 0:
            _age = new_age
    
    return {
        "get_name": get_name,
        "get_age": get_age,
        "set_age": set_age
    }

person = create_person("Alice", 25)
print(person["get_name"]())  # Alice
print(person["get_age"]())   # 25
person["set_age"](26)
print(person["get_age"]())   # 26
```

### Pattern 2: Configuration Builder

```python
def create_config_builder():
    config = {}
    
    def set_value(key, value):
        nonlocal config
        config[key] = value
        return set_value  # Return self for chaining
    
    def build():
        return config.copy()
    
    set_value.build = build
    return set_value

# Build configuration with chaining
builder = create_config_builder()
config = builder("host", "localhost")("port", 8000)("debug", True).build()

print(config)
# {'host': 'localhost', 'port': 8000, 'debug': True}
```

## Key Takeaways

- Inner functions can access **enclosing scope** variables
- Use `nonlocal` to **modify** enclosing variables
- **Closures** remember enclosing variables after outer function returns
- LEGB rule: **L**ocal → **E**nclosing → **G**lobal → **B**uilt-in
- Closures enable **function factories** and **private state**
- Each closure maintains its own copy of enclosing variables

## What's Next?

You've mastered nested scope and closures! Next, we'll explore **namespace and scope resolution** in depth.

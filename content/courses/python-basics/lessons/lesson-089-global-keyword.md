---
id: 61-global-keyword
title: The global Keyword
chapterId: ch7-scope
order: 8
duration: 20
objectives:
  - Master the global keyword
  - Understand when to use global
  - Learn alternatives to global variables
  - Avoid global variable pitfalls
  - Write better code without globals
---

# The global Keyword

## Introduction

The `global` keyword allows you to modify module-level variables from within functions. However, it should be used sparingly.

## Basic global Usage

```python
count = 0  # Module-level variable

def increment():
    global count  # Declare we're using the global count
    count += 1

def get_count():
    return count  # No 'global' needed for reading

increment()
increment()
print(get_count())  # 2
```

## Without global (Creates Local Variable)

```python
count = 0

def increment():
    # count = count + 1  # Error! Can't access before assignment
    count = 5  # Creates NEW local variable, doesn't modify global

increment()
print(count)  # 0 (unchanged)
```

## Reading vs Modifying

```python
MAX_VALUE = 100

def check_value(x):
    # Can read global without 'global' keyword
    if x > MAX_VALUE:
        return "Too large"
    return "OK"

print(check_value(50))   # OK
print(check_value(150))  # Too large

# But modifying requires 'global'
def set_max(value):
    global MAX_VALUE
    MAX_VALUE = value

set_max(200)
print(check_value(150))  # Now OK
```

## Multiple Global Variables

```python
user_count = 0
error_count = 0

def process_user(user):
    global user_count, error_count  # Declare multiple globals
    
    if user:
        user_count += 1
    else:
        error_count += 1

process_user({"name": "Alice"})
process_user(None)
print(f"Users: {user_count}, Errors: {error_count}")  # Users: 1, Errors: 1
```

## When global Is Acceptable

### Configuration or Settings

```python
# Module-level configuration
DEBUG = False
LOG_LEVEL = "INFO"

def set_debug_mode(enabled):
    global DEBUG, LOG_LEVEL
    DEBUG = enabled
    LOG_LEVEL = "DEBUG" if enabled else "INFO"

def log(message):
    if DEBUG:
        print(f"[{LOG_LEVEL}] {message}")

set_debug_mode(True)
log("Application started")  # [DEBUG] Application started
```

### Simple Counters in Scripts

```python
# In a simple script, global counter is OK
processed = 0

def process_item(item):
    global processed
    # ... process item ...
    processed += 1

items = [1, 2, 3, 4, 5]
for item in items:
    process_item(item)

print(f"Processed {processed} items")
```

## When to AVOID global

### Use Function Return Values Instead

```python
# ❌ BAD: Using global for results
result = 0

def calculate(x, y):
    global result
    result = x + y

calculate(5, 3)
print(result)

# ✅ GOOD: Return the value
def calculate(x, y):
    return x + y

result = calculate(5, 3)
print(result)
```

### Use Class Instead

```python
# ❌ BAD: Multiple related globals
counter = 0
total = 0
average = 0.0

def add_value(value):
    global counter, total, average
    counter += 1
    total += value
    average = total / counter

# ✅ GOOD: Use a class
class Statistics:
    def __init__(self):
        self.counter = 0
        self.total = 0
    
    def add_value(self, value):
        self.counter += 1
        self.total += value
    
    @property
    def average(self):
        return self.total / self.counter if self.counter > 0 else 0

stats = Statistics()
stats.add_value(10)
stats.add_value(20)
print(stats.average)  # 15.0
```

### Use Closure Instead

```python
# ❌ BAD: Global for state
count = 0

def increment():
    global count
    count += 1
    return count

# ✅ GOOD: Closure for state
def create_counter():
    count = 0
    
    def increment():
        nonlocal count
        count += 1
        return count
    
    return increment

counter = create_counter()
print(counter())  # 1
print(counter())  # 2
```

## global vs nonlocal

```python
# Global: Module-level variable
global_var = 100

def outer():
    # Enclosing: Function-level variable
    enclosing_var = 50
    
    def inner():
        # Use global for module-level
        global global_var
        global_var += 1
        
        # Use nonlocal for enclosing scope
        nonlocal enclosing_var
        enclosing_var += 1
        
        print(f"Global: {global_var}, Enclosing: {enclosing_var}")
    
    inner()

outer()
print(f"Global var: {global_var}")  # 101
```

## Common Problems with global

### Problem 1: Hidden Dependencies

```python
# ❌ BAD: Function depends on global state
DATABASE_URL = "localhost"

def connect():
    # Hidden dependency on DATABASE_URL
    return f"Connected to {DATABASE_URL}"

# Hard to test, hard to reuse with different DB

# ✅ GOOD: Explicit parameter
def connect(database_url):
    return f"Connected to {database_url}"

# Easy to test and reuse
print(connect("localhost"))
print(connect("production-db"))
```

### Problem 2: Testing Difficulties

```python
# ❌ BAD: Hard to test
counter = 0

def increment_counter():
    global counter
    counter += 1

# Tests affect each other!
increment_counter()
assert counter == 1
increment_counter()
assert counter == 2  # But counter is still 2 from previous test!

# ✅ GOOD: Easy to test
def increment_counter(counter):
    return counter + 1

# Each test is independent
assert increment_counter(0) == 1
assert increment_counter(0) == 1  # Always starts fresh
```

### Problem 3: Parallel Execution Issues

```python
# ❌ BAD: Not thread-safe
total = 0

def add_to_total(value):
    global total
    total += value  # Race condition with multiple threads!

# ✅ GOOD: Return new value or use proper synchronization
def add_to_total(current_total, value):
    return current_total + value

# Or use threading.Lock() if globals are necessary
```

## Alternatives to global

### Alternative 1: Default Parameters

```python
# Instead of:
base_url = "https://api.example.com"

def fetch(endpoint):
    global base_url
    return f"{base_url}/{endpoint}"

# Use:
def fetch(endpoint, base_url="https://api.example.com"):
    return f"{base_url}/{endpoint}"
```

### Alternative 2: Configuration Objects

```python
# Instead of multiple globals:
# host = "localhost"
# port = 8000
# debug = True

# Use configuration object:
class Config:
    host = "localhost"
    port = 8000
    debug = True

def start_server(config):
    print(f"Starting server on {config.host}:{config.port}")
    if config.debug:
        print("Debug mode enabled")

start_server(Config())
```

### Alternative 3: Function Attributes

```python
# Instead of:
# call_count = 0

# Use function attribute:
def my_function():
    my_function.call_count += 1
    print(f"Called {my_function.call_count} times")

my_function.call_count = 0  # Initialize

my_function()
my_function()
my_function()
```

## Inspecting Global Variables

```python
# See all global variables
print(globals().keys())

# Get specific global
value = globals().get('MAX_VALUE', 'Not found')

# Set global dynamically (avoid this!)
globals()['new_var'] = 123

# Check if variable is global
x = 10

def check():
    print('x' in globals())  # True
    print('x' in locals())   # False

check()
```

## Best Practices Summary

**When global Is OK:**
- Configuration constants (read-only)
- Application-wide settings
- Simple scripts with single flow

**When to Avoid global:**
- Functions that should be pure
- Code that needs testing
- Reusable libraries
- Parallel/concurrent code

**Better Alternatives:**
- Function parameters and return values
- Classes for related state
- Closures for private state
- Configuration objects

**Code Smell:** If you find yourself writing `global` often, consider refactoring to use classes or closures.

## Summary

- **global keyword**: Modify module-level variables
- **Reading**: No `global` needed, just use the variable
- **Modifying**: Must declare with `global` keyword
- **Use sparingly**: Prefer parameters, return values, classes, closures
- **Testing**: Global variables make testing harder
- **Thread safety**: Global mutable state causes concurrency issues

## Next Steps

You've completed the Scope chapter! Next, you'll learn about testing and debugging Python code.

---
id: 59-closure-patterns
title: Closure Design Patterns
chapterId: ch7-scope
order: 6
duration: 30
objectives:
  - Master practical closure patterns
  - Implement function factories
  - Create stateful functions
  - Build decorators with closures
  - Apply closures to real problems
---

# Closure Design Patterns

## Introduction

Closures are functions that "remember" variables from their enclosing scope. They enable powerful design patterns for creating flexible, reusable code.

## Pattern 1: Function Factories

### Simple Factory

```python
def make_multiplier(factor):
    def multiply(number):
        return number * factor
    return multiply

# Create specialized functions
double = make_multiplier(2)
triple = make_multiplier(3)
times_ten = make_multiplier(10)

print(double(5))      # 10
print(triple(5))      # 15
print(times_ten(5))   # 50
```

### Greeter Factory

```python
def create_greeter(greeting, punctuation="!"):
    def greet(name):
        return f"{greeting}, {name}{punctuation}"
    return greet

# Create different greeters
hello = create_greeter("Hello")
hola = create_greeter("Hola", ".")
hey = create_greeter("Hey", "!!!")

print(hello("Alice"))  # Hello, Alice!
print(hola("Bob"))     # Hola, Bob.
print(hey("Charlie"))  # Hey, Charlie!!!
```

## Pattern 2: State Preservation

### Counter with State

```python
def create_counter(start=0, step=1):
    count = start
    
    def increment():
        nonlocal count
        count += step
        return count
    
    def decrement():
        nonlocal count
        count -= step
        return count
    
    def reset():
        nonlocal count
        count = start
    
    def current():
        return count
    
    return {
        'increment': increment,
        'decrement': decrement,
        'reset': reset,
        'current': current
    }

# Create counters with different behavior
counter1 = create_counter(0, 1)
counter2 = create_counter(100, 10)

print(counter1['increment']())  # 1
print(counter1['increment']())  # 2
print(counter2['increment']())  # 110
```

### Toggle Switch

```python
def create_switch(initial_state=False):
    state = initial_state
    
    def toggle():
        nonlocal state
        state = not state
        return state
    
    def set_state(new_state):
        nonlocal state
        state = bool(new_state)
    
    def get_state():
        return state
    
    return toggle, set_state, get_state

toggle, set_state, get_state = create_switch()
print(toggle())      # True
print(toggle())      # False
set_state(True)
print(get_state())   # True
```

## Pattern 3: Configuration Builders

### API Client Builder

```python
def create_api_client(base_url, api_key):
    def make_request(endpoint, method="GET", data=None):
        url = f"{base_url}/{endpoint}"
        headers = {"Authorization": f"Bearer {api_key}"}
        
        return {
            "url": url,
            "method": method,
            "headers": headers,
            "data": data
        }
    
    return make_request

# Create configured client
client = create_api_client("https://api.example.com", "secret123")

# Use client with configuration baked in
request1 = client("users", "GET")
request2 = client("posts", "POST", {"title": "Hello"})

print(request1)
# {'url': 'https://api.example.com/users', 'method': 'GET', ...}
```

### Logger Factory

```python
def create_logger(prefix, level="INFO"):
    log_count = 0
    
    def log(message):
        nonlocal log_count
        log_count += 1
        print(f"[{level}] [{prefix}] ({log_count}) {message}")
    
    def set_level(new_level):
        nonlocal level
        level = new_level
    
    def get_count():
        return log_count
    
    return log, set_level, get_count

log, set_level, get_count = create_logger("MyApp")
log("Application started")
log("Processing data")
set_level("ERROR")
log("Something went wrong")
print(f"Total logs: {get_count()}")
```

## Pattern 4: Memoization

### Simple Memoization

```python
def memoize(func):
    cache = {}
    
    def wrapper(n):
        if n not in cache:
            cache[n] = func(n)
        return cache[n]
    
    return wrapper

@memoize
def expensive_fibonacci(n):
    if n <= 1:
        return n
    return expensive_fibonacci(n-1) + expensive_fibonacci(n-2)

print(expensive_fibonacci(35))  # Fast with memoization
```

### Advanced Memoization with Stats

```python
def create_memoized(func):
    cache = {}
    stats = {'hits': 0, 'misses': 0}
    
    def wrapper(*args):
        if args in cache:
            stats['hits'] += 1
            return cache[args]
        else:
            stats['misses'] += 1
            result = func(*args)
            cache[args] = result
            return result
    
    def get_stats():
        return stats.copy()
    
    def clear_cache():
        cache.clear()
        stats['hits'] = 0
        stats['misses'] = 0
    
    wrapper.get_stats = get_stats
    wrapper.clear_cache = clear_cache
    return wrapper

@create_memoized
def slow_operation(x, y):
    return x ** y

print(slow_operation(2, 10))  # Miss
print(slow_operation(2, 10))  # Hit
print(slow_operation.get_stats())  # {'hits': 1, 'misses': 1}
```

## Pattern 5: Rate Limiting

### Simple Rate Limiter

```python
import time

def create_rate_limiter(max_calls, time_window):
    calls = []
    
    def call(func):
        def wrapper(*args, **kwargs):
            nonlocal calls
            now = time.time()
            
            # Remove old calls outside time window
            calls = [c for c in calls if now - c < time_window]
            
            if len(calls) >= max_calls:
                return f"Rate limit exceeded. Try again in {time_window - (now - calls[0]):.1f}s"
            
            calls.append(now)
            return func(*args, **kwargs)
        
        return wrapper
    
    return call

# Allow 3 calls per 5 seconds
rate_limiter = create_rate_limiter(max_calls=3, time_window=5)

@rate_limiter
def api_call(endpoint):
    return f"Fetching {endpoint}"

print(api_call("/users"))  # OK
print(api_call("/posts"))  # OK
print(api_call("/data"))   # OK
print(api_call("/more"))   # Rate limit exceeded
```

## Pattern 6: Partial Application

### Custom Partial Function

```python
def partial(func, *fixed_args, **fixed_kwargs):
    def wrapper(*args, **kwargs):
        combined_args = fixed_args + args
        combined_kwargs = {**fixed_kwargs, **kwargs}
        return func(*combined_args, **combined_kwargs)
    return wrapper

def power(base, exponent):
    return base ** exponent

# Create specialized functions
square = partial(power, exponent=2)
cube = partial(power, exponent=3)

print(square(5))  # 25
print(cube(5))    # 125
```

### URL Builder

```python
def create_url_builder(scheme, domain):
    def build_url(path, params=None):
        url = f"{scheme}://{domain}/{path.lstrip('/')}"
        if params:
            query = "&".join(f"{k}={v}" for k, v in params.items())
            url += f"?{query}"
        return url
    return build_url

# Create builder for specific domain
build_api_url = create_url_builder("https", "api.example.com")

print(build_api_url("/users"))
# https://api.example.com/users

print(build_api_url("/search", {"q": "python", "limit": "10"}))
# https://api.example.com/search?q=python&limit=10
```

## Pattern 7: Event Handlers

### Simple Event System

```python
def create_event_emitter():
    handlers = []
    
    def on(handler):
        handlers.append(handler)
    
    def emit(event):
        for handler in handlers:
            handler(event)
    
    def remove(handler):
        if handler in handlers:
            handlers.remove(handler)
    
    return on, emit, remove

on, emit, remove = create_event_emitter()

def log_event(event):
    print(f"Event logged: {event}")

def alert_event(event):
    print(f"ALERT: {event}")

on(log_event)
on(alert_event)

emit("User logged in")
# Event logged: User logged in
# ALERT: User logged in
```

## Pattern 8: Validators

### Field Validator Factory

```python
def create_validator(field_name, *validations):
    def validate(value):
        errors = []
        
        for validation in validations:
            result = validation(value)
            if result is not True:
                errors.append(result)
        
        if errors:
            return {field_name: errors}
        return None
    
    return validate

# Validation functions
def min_length(n):
    return lambda s: True if len(s) >= n else f"Must be at least {n} characters"

def max_length(n):
    return lambda s: True if len(s) <= n else f"Must be at most {n} characters"

def contains_digit():
    return lambda s: True if any(c.isdigit() for c in s) else "Must contain a digit"

# Create validators
validate_username = create_validator(
    "username",
    min_length(3),
    max_length(20)
)

validate_password = create_validator(
    "password",
    min_length(8),
    contains_digit()
)

print(validate_username("ab"))      # {'username': ['Must be at least 3 characters']}
print(validate_username("alice"))   # None (valid)
print(validate_password("short"))   # Error
```

## Summary

**Common Closure Patterns:**
1. **Function Factories**: Create specialized functions
2. **State Preservation**: Maintain private state
3. **Configuration Builders**: Bake in configuration
4. **Memoization**: Cache expensive results
5. **Rate Limiting**: Control function call frequency
6. **Partial Application**: Pre-fill function arguments
7. **Event Handlers**: Manage callbacks
8. **Validators**: Create reusable validation logic

**Key Benefits:**
- Encapsulation of state and logic
- Flexible function creation
- Avoiding global variables
- Creating specialized functions from general ones

## Next Steps

Next, you'll learn scope best practices and common pitfalls.

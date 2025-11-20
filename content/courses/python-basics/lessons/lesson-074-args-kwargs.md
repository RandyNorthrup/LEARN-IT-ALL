---
id: 50-args-kwargs
title: Variable Arguments (*args and **kwargs)
chapterId: ch6-functions
order: 6
duration: 30
objectives:
  - Master *args for variable positional arguments
  - Master **kwargs for variable keyword arguments
  - Combine regular parameters with *args and **kwargs
  - Understand argument unpacking
  - Use flexible function signatures
---

# Variable Arguments (*args and **kwargs)

## Introduction

Sometimes you don't know how many arguments a function will receive. Python's `*args` and `**kwargs` allow functions to accept any number of arguments.

## Understanding *args

`*args` collects all positional arguments into a tuple:

```python
def sum_all(*args):
    """Sum any number of arguments"""
    total = 0
    for num in args:
        total += num
    return total

print(sum_all(1, 2, 3))           # 6
print(sum_all(10, 20, 30, 40))    # 100
print(sum_all(5))                 # 5
print(sum_all())                  # 0
```

### What is *args?

```python
def show_args(*args):
    print(f"Type: {type(args)}")  # tuple
    print(f"Contents: {args}")
    
show_args(1, 2, 3)
# Type: <class 'tuple'>
# Contents: (1, 2, 3)
```

### Combining Regular Parameters with *args

```python
# Regular parameters come first
def greet(greeting, *names):
    for name in names:
        print(f"{greeting}, {name}!")

greet("Hello", "Alice", "Bob", "Charlie")
# Hello, Alice!
# Hello, Bob!
# Hello, Charlie!

# First arg is greeting, rest collected in names tuple
```

## Understanding **kwargs

`**kwargs` collects keyword arguments into a dictionary:

```python
def print_info(**kwargs):
    """Print any keyword arguments"""
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="Alice", age=25, city="NYC")
# name: Alice
# age: 25
# city: NYC
```

### What is **kwargs?

```python
def show_kwargs(**kwargs):
    print(f"Type: {type(kwargs)}")  # dict
    print(f"Contents: {kwargs}")

show_kwargs(a=1, b=2, c=3)
# Type: <class 'dict'>
# Contents: {'a': 1, 'b': 2, 'c': 3}
```

### Combining Parameters with **kwargs

```python
def create_user(username, email, **extra):
    user = {
        "username": username,
        "email": email
    }
    # Add all extra fields
    user.update(extra)
    return user

user = create_user(
    "alice",
    "alice@example.com",
    age=25,
    city="NYC",
    premium=True
)
print(user)
# {'username': 'alice', 'email': 'alice@example.com', 
#  'age': 25, 'city': 'NYC', 'premium': True}
```

## Combining *args and **kwargs

Use both in the same function:

```python
def flexible_function(*args, **kwargs):
    print(f"Positional args: {args}")
    print(f"Keyword args: {kwargs}")

flexible_function(1, 2, 3, name="Alice", age=25)
# Positional args: (1, 2, 3)
# Keyword args: {'name': 'Alice', 'age': 25}
```

### Parameter Order Rules

When combining different parameter types, order matters:

```python
# Correct order:
def function(
    regular_param,      # 1. Regular parameters
    *args,              # 2. *args
    keyword_only,       # 3. Keyword-only parameters
    **kwargs            # 4. **kwargs
):
    pass

# Example:
def process(name, *values, threshold=0, **options):
    print(f"Name: {name}")
    print(f"Values: {values}")
    print(f"Threshold: {threshold}")
    print(f"Options: {options}")

process("data", 1, 2, 3, threshold=10, debug=True)
# Name: data
# Values: (1, 2, 3)
# Threshold: 10
# Options: {'debug': True}
```

## Practical Examples

### Example 1: String Concatenation

```python
def join_strings(separator, *strings):
    """Join any number of strings"""
    return separator.join(strings)

print(join_strings(" ", "Hello", "World"))           # Hello World
print(join_strings(", ", "apple", "banana", "cherry"))  # apple, banana, cherry
print(join_strings("-", "2025", "11", "18"))         # 2025-11-18
```

### Example 2: Find Maximum

```python
def find_max(*numbers):
    """Find maximum of any number of values"""
    if not numbers:
        return None
    return max(numbers)

print(find_max(5, 2, 9, 1))        # 9
print(find_max(42))                # 42
print(find_max(-5, -10, -3))       # -3
```

### Example 3: Calculate Statistics

```python
def calculate_stats(*numbers):
    """Calculate min, max, average"""
    if not numbers:
        return None
    
    return {
        "count": len(numbers),
        "min": min(numbers),
        "max": max(numbers),
        "average": sum(numbers) / len(numbers)
    }

stats = calculate_stats(10, 20, 30, 40, 50)
print(stats)
# {'count': 5, 'min': 10, 'max': 50, 'average': 30.0}
```

### Example 4: API Request Builder

```python
def build_url(base_url, path, **params):
    """Build URL with query parameters"""
    url = f"{base_url}/{path}"
    
    if params:
        query = "&".join(f"{k}={v}" for k, v in params.items())
        url = f"{url}?{query}"
    
    return url

url = build_url(
    "https://api.example.com",
    "users",
    page=1,
    limit=10,
    sort="name"
)
print(url)
# https://api.example.com/users?page=1&limit=10&sort=name
```

### Example 5: Logger Function

```python
def log(level, message, **context):
    """Log message with context"""
    print(f"[{level}] {message}")
    if context:
        print("  Context:")
        for key, value in context.items():
            print(f"    {key}: {value}")

log("INFO", "User logged in", user_id=123, ip="192.168.1.1")
# [INFO] User logged in
#   Context:
#     user_id: 123
#     ip: 192.168.1.1
```

### Example 6: Decorator Pattern

```python
def make_tags(tag_name, *content, **attributes):
    """Generate HTML tag"""
    # Build attributes
    attrs = " ".join(f'{k}="{v}"' for k, v in attributes.items())
    attr_str = f" {attrs}" if attrs else ""
    
    # Build content
    content_str = " ".join(str(c) for c in content)
    
    return f"<{tag_name}{attr_str}>{content_str}</{tag_name}>"

print(make_tags("p", "Hello, World!"))
# <p>Hello, World!</p>

print(make_tags("a", "Click here", href="https://example.com", target="_blank"))
# <a href="https://example.com" target="_blank">Click here</a>

print(make_tags("div", "Content", class_="container", id="main"))
# <div class_="container" id="main">Content</div>
```

## Unpacking Arguments

Use `*` and `**` to unpack collections when calling functions:

```python
def add(a, b, c):
    return a + b + c

# Unpack list/tuple with *
numbers = [1, 2, 3]
print(add(*numbers))  # Same as add(1, 2, 3)

# Unpack dictionary with **
values = {"a": 10, "b": 20, "c": 30}
print(add(**values))  # Same as add(a=10, b=20, c=30)
```

### More Unpacking Examples

```python
# Unpack for print
items = ["apple", "banana", "cherry"]
print(*items)  # apple banana cherry

# Unpack in function call
def greet(greeting, name):
    return f"{greeting}, {name}!"

data = ["Hello", "Alice"]
print(greet(*data))  # Hello, Alice!

# Unpack dictionary
def create_user(name, age, email):
    return {"name": name, "age": age, "email": email}

user_data = {
    "name": "Alice",
    "age": 25,
    "email": "alice@example.com"
}
user = create_user(**user_data)
print(user)
```

## When to Use *args and **kwargs

Good use cases:

```python
# Wrapper functions
def logged_function(*args, **kwargs):
    print(f"Calling with args={args}, kwargs={kwargs}")
    return original_function(*args, **kwargs)

# Flexible builders
def create_dict(**kwargs):
    return kwargs

config = create_dict(host="localhost", port=5432, debug=True)

# Math functions
def multiply_all(*numbers):
    result = 1
    for num in numbers:
        result *= num
    return result
```

Avoid when:

```python
# Bad: Parameters have clear meaning
def create_user(*args):  # Which arg is name? age? email?
    pass

# Good: Use explicit parameters
def create_user(name, age, email):
    pass

# Bad: Too flexible
def do_something(**kwargs):  # What options are valid?
    pass

# Good: Define expected parameters
def do_something(mode, threshold, debug=False):
    pass
```

## Common Patterns

```python
# Pattern 1: Optional positional arguments
def format_name(first, last, *middles):
    name = first
    if middles:
        name += " " + " ".join(middles)
    name += " " + last
    return name

print(format_name("John", "Doe"))              # John Doe
print(format_name("John", "Jacob", "Doe"))     # John Jacob Doe

# Pattern 2: Optional configuration
def connect(host, port=5432, **options):
    config = {"host": host, "port": port}
    config.update(options)
    return config

conn = connect("localhost", timeout=30, ssl=True)

# Pattern 3: Argument forwarding
def wrapper(*args, **kwargs):
    print("Before")
    result = actual_function(*args, **kwargs)
    print("After")
    return result
```

## Summary

- **`*args`**: Collects positional arguments into a tuple
- **`**kwargs`**: Collects keyword arguments into a dictionary
- **Name convention**: args and kwargs are conventional names (can use any name with * or **)
- **Parameter order**: regular, *args, keyword-only, **kwargs
- **Unpacking**: Use * and ** to unpack collections in function calls
- **Use cases**: Wrappers, builders, flexible functions
- **Best practice**: Use explicit parameters when possible, *args/**kwargs when needed

## Next Steps

Next, you'll learn about Python's built-in functions and how to use them effectively.

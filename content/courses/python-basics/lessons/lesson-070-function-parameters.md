---
id: function-parameters
title: Function Parameters and Arguments
chapterId: ch6-functions
order: 2
duration: 30
objectives:
  - Understand function parameters vs arguments
  - Master positional and keyword arguments
  - Learn default parameter values
  - Understand *args and **kwargs
---

# Function Parameters and Arguments

Parameters make functions flexible and reusable by accepting input values.

## Parameters vs Arguments

**Parameters** are variables in the function definition.  
**Arguments** are the actual values passed when calling the function.

```python
def greet(name):  # 'name' is a parameter
    print(f"Hello, {name}!")

greet("Alice")  # "Alice" is an argument
```

## Positional Arguments

Arguments passed in order:

```python
def introduce(name, age, city):
    print(f"I'm {name}, {age} years old, from {city}")

introduce("Alice", 25, "New York")
# I'm Alice, 25 years old, from New York

# Order matters!
introduce(25, "Alice", "New York")
# I'm 25, Alice years old, from New York (wrong!)
```

## Keyword Arguments

Arguments passed by name:

```python
def introduce(name, age, city):
    print(f"I'm {name}, {age} years old, from {city}")

# Order doesn't matter with keyword arguments
introduce(name="Alice", age=25, city="New York")
introduce(city="New York", name="Alice", age=25)
introduce(age=25, city="New York", name="Alice")
# All produce: I'm Alice, 25 years old, from New York
```

## Mixing Positional and Keyword

You can mix both, but positional must come first:

```python
def create_user(username, email, age, country):
    return f"User: {username}, {email}, {age}, {country}"

# Mix positional and keyword
result = create_user("alice", "alice@email.com", age=25, country="USA")
print(result)

# ❌ Error - keyword before positional
# result = create_user(username="alice", "alice@email.com", 25, "USA")
```

## Default Parameter Values

Provide default values for optional parameters:

```python
def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Alice")              # Hello, Alice!
greet("Bob", "Hi")          # Hi, Bob!
greet("Charlie", greeting="Hey")  # Hey, Charlie!
```

### Default Values Must Be Last

```python
# ✅ Correct - defaults at the end
def create_user(username, email, age=18, country="USA"):
    return f"{username}, {email}, {age}, {country}"

# ❌ Error - non-default after default
# def create_user(username, age=18, email, country="USA"):
#     pass
```

## Multiple Default Parameters

```python
def order_pizza(size="medium", topping="cheese", quantity=1):
    return f"Ordered {quantity} {size} {topping} pizza(s)"

print(order_pizza())  
# Ordered 1 medium cheese pizza(s)

print(order_pizza("large"))
# Ordered 1 large cheese pizza(s)

print(order_pizza("large", "pepperoni"))
# Ordered 1 large pepperoni pizza(s)

print(order_pizza("small", "mushroom", 3))
# Ordered 3 small mushroom pizza(s)

# Using keyword arguments
print(order_pizza(quantity=2, topping="veggie"))
# Ordered 2 medium veggie pizza(s)
```

## Variable Number of Arguments (*args)

Accept any number of positional arguments:

```python
def sum_all(*numbers):
    """Sum all numbers passed"""
    total = 0
    for num in numbers:
        total += num
    return total

print(sum_all(1, 2, 3))           # 6
print(sum_all(10, 20, 30, 40))    # 100
print(sum_all(5))                 # 5
print(sum_all())                  # 0
```

### *args is a Tuple

```python
def show_args(*args):
    print(f"Type: {type(args)}")
    print(f"Values: {args}")
    for i, arg in enumerate(args):
        print(f"  Argument {i}: {arg}")

show_args("a", "b", "c")
# Type: <class 'tuple'>
# Values: ('a', 'b', 'c')
#   Argument 0: a
#   Argument 1: b
#   Argument 2: c
```

## Keyword Variable Arguments (**kwargs)

Accept any number of keyword arguments:

```python
def create_profile(**info):
    """Create user profile from keyword arguments"""
    for key, value in info.items():
        print(f"{key}: {value}")

create_profile(name="Alice", age=25, city="NYC")
# name: Alice
# age: 25
# city: NYC

create_profile(username="bob", email="bob@email.com", country="USA")
# username: bob
# email: bob@email.com
# country: USA
```

### **kwargs is a Dictionary

```python
def show_kwargs(**kwargs):
    print(f"Type: {type(kwargs)}")
    print(f"Keys: {list(kwargs.keys())}")
    print(f"Values: {list(kwargs.values())}")
    return kwargs

result = show_kwargs(a=1, b=2, c=3)
# Type: <class 'dict'>
# Keys: ['a', 'b', 'c']
# Values: [1, 2, 3]
print(result)  # {'a': 1, 'b': 2, 'c': 3}
```

## Combining All Parameter Types

Order matters when combining parameter types:

```python
def full_example(required, *args, default="value", **kwargs):
    print(f"Required: {required}")
    print(f"Args: {args}")
    print(f"Default: {default}")
    print(f"Kwargs: {kwargs}")

full_example(1, 2, 3, 4, default="custom", a=5, b=6)
# Required: 1
# Args: (2, 3, 4)
# Default: custom
# Kwargs: {'a': 5, 'b': 6}
```

### Parameter Order Rules

1. Positional parameters
2. *args (variable positional)
3. Default parameters
4. **kwargs (variable keyword)

```python
# ✅ Correct order
def func(pos1, pos2, *args, default=None, **kwargs):
    pass

# ❌ Wrong - default before *args
# def func(pos1, default=None, *args, **kwargs):
#     pass
```

## Practical Examples

### Example 1: Flexible Calculator

```python
def calculate(*numbers, operation="sum"):
    """Calculate result based on operation"""
    if not numbers:
        return 0
    
    if operation == "sum":
        return sum(numbers)
    elif operation == "product":
        result = 1
        for num in numbers:
            result *= num
        return result
    elif operation == "average":
        return sum(numbers) / len(numbers)
    else:
        return None

print(calculate(1, 2, 3, 4))                    # 10
print(calculate(2, 3, 4, operation="product"))  # 24
print(calculate(10, 20, 30, operation="average"))  # 20.0
```

### Example 2: HTML Tag Generator

```python
def create_tag(tag_name, content="", **attributes):
    """Generate HTML tag with attributes"""
    attrs = " ".join([f'{k}="{v}"' for k, v in attributes.items()])
    if attrs:
        return f"<{tag_name} {attrs}>{content}</{tag_name}>"
    return f"<{tag_name}>{content}</{tag_name}>"

print(create_tag("div", "Hello"))
# <div>Hello</div>

print(create_tag("a", "Click here", href="https://example.com", target="_blank"))
# <a href="https://example.com" target="_blank">Click here</a>

print(create_tag("img", src="photo.jpg", alt="Photo", width="300"))
# <img src="photo.jpg" alt="Photo" width="300"></img>
```

### Example 3: Logger Function

```python
def log(message, *tags, level="INFO", **metadata):
    """Flexible logging function"""
    tag_str = f"[{', '.join(tags)}]" if tags else ""
    meta_str = " ".join([f"{k}={v}" for k, v in metadata.items()])
    print(f"[{level}] {tag_str} {message} {meta_str}")

log("User logged in")
# [INFO]  User logged in 

log("Database error", "DB", "ERROR", level="ERROR", user_id=123)
# [ERROR] [DB, ERROR] Database error user_id=123

log("API call", "HTTP", "API", level="DEBUG", endpoint="/users", method="GET")
# [DEBUG] [HTTP, API] API call endpoint=/users method=GET
```

## Common Mistakes

### Mistake 1: Mutable Default Arguments

```python
# ❌ Dangerous - list is shared between calls!
def add_item(item, items=[]):
    items.append(item)
    return items

print(add_item("a"))  # ['a']
print(add_item("b"))  # ['a', 'b'] - Unexpected!

# ✅ Correct - use None as default
def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items

print(add_item("a"))  # ['a']
print(add_item("b"))  # ['b'] - Correct!
```

### Mistake 2: Keyword Before Positional

```python
# ❌ Error
# greet(name="Alice", "Hello")  # SyntaxError

# ✅ Correct
greet("Alice", greeting="Hello")
```

## Key Takeaways

- **Parameters** define what a function accepts
- **Arguments** are values passed to the function
- Use **default values** for optional parameters
- **\*args** collects extra positional arguments (tuple)
- **\*\*kwargs** collects extra keyword arguments (dict)
- Parameter order: positional → \*args → defaults → \*\*kwargs
- Avoid mutable default arguments

## What's Next?

You've mastered function parameters! Next, we'll learn about **return values** and how functions send data back.

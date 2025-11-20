---
id: namespace-resolution
title: Namespace and Scope Resolution
chapterId: ch7-scope
order: 3
duration: 25
objectives:
  - Understand Python namespaces
  - Master scope resolution order
  - Learn about the dir() and vars() functions
  - Avoid namespace pollution
---

# Namespace and Scope Resolution

A namespace is a mapping of names to objects. Understanding namespaces helps you write cleaner, bug-free code.

## What is a Namespace?

A namespace is like a dictionary that maps variable names to their values:

```python
# Global namespace
x = 10
y = 20
z = 30

# Each name maps to an object
print(globals()["x"])  # 10
print(globals()["y"])  # 20
```

Python has several namespaces:
1. **Built-in** namespace - Python's built-in functions and constants
2. **Global** namespace - Module-level names
3. **Local** namespace - Function-level names

## Built-in Namespace

Python's built-in functions and constants:

```python
# These are always available (built-in namespace)
print(len([1, 2, 3]))  # 3
print(max([1, 5, 3]))  # 5
print(abs(-10))        # 10
print(sum([1, 2, 3]))  # 6

# Built-in constants
print(True, False, None)
```

View all built-ins:

```python
import builtins
print(dir(builtins))
# ['ArithmeticError', 'AssertionError', ..., 'abs', 'all', 'any', ...]
```

## Global Namespace

Module-level variables:

```python
# Global namespace
name = "Alice"
age = 25

def show_globals():
    print(globals())  # Shows all global variables

# Each module has its own global namespace
```

## Local Namespace

Function-level variables:

```python
def calculate(x, y):
    # Local namespace
    result = x + y
    print(locals())  # {'x': 5, 'y': 3, 'result': 8}
    return result

calculate(5, 3)
```

## Scope Resolution (LEGB)

Python searches for variables in this order:

### 1. Local (L)

```python
def func():
    x = "local"  # Found here first
    print(x)

func()  # local
```

### 2. Enclosing (E)

```python
def outer():
    x = "enclosing"
    
    def inner():
        # Not in local, check enclosing
        print(x)
    
    inner()

outer()  # enclosing
```

### 3. Global (G)

```python
x = "global"

def func():
    # Not in local or enclosing, check global
    print(x)

func()  # global
```

### 4. Built-in (B)

```python
def func():
    # 'len' not in local/enclosing/global, check built-in
    print(len([1, 2, 3]))

func()  # 3
```

## Complete LEGB Example

```python
x = "global"  # Global

def outer():
    x = "enclosing"  # Enclosing
    
    def inner():
        x = "local"  # Local
        print(f"Local: {x}")
    
    inner()
    print(f"Enclosing: {x}")

outer()
print(f"Global: {x}")

# Local: local
# Enclosing: enclosing
# Global: global

# Built-in example
print(len([1, 2, 3]))  # Uses built-in 'len'
```

## The globals() Function

Returns global namespace as dictionary:

```python
name = "Alice"
age = 25

print(globals()["name"])  # Alice
print(globals()["age"])   # 25

# Modify global using globals()
globals()["score"] = 100
print(score)  # 100
```

## The locals() Function

Returns local namespace as dictionary:

```python
def calculate(x, y):
    result = x + y
    print(locals())
    # {'x': 5, 'y': 3, 'result': 8}
    return result

calculate(5, 3)
```

## The dir() Function

Lists names in current namespace:

```python
x = 10
y = 20

def func():
    pass

print(dir())
# ['__builtins__', '__doc__', '__name__', 'func', 'x', 'y', ...]
```

Dir of an object shows its attributes:

```python
name = "hello"
print(dir(name))
# ['capitalize', 'count', 'endswith', ..., 'upper', 'zfill']
```

## The vars() Function

Returns `__dict__` attribute of an object:

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

person = Person("Alice", 25)
print(vars(person))
# {'name': 'Alice', 'age': 25}
```

Without arguments, `vars()` is like `locals()`:

```python
def func():
    x = 10
    y = 20
    print(vars())  # {'x': 10, 'y': 20}

func()
```

## Namespace Pollution

Avoid cluttering namespaces with too many variables:

### ❌ Namespace Pollution

```python
# Global namespace polluted
user_name = "Alice"
user_age = 25
user_email = "alice@email.com"
user_city = "NYC"
product_name = "Widget"
product_price = 99.99
product_stock = 50
# ... too many globals!
```

### ✅ Clean Namespace

```python
# Organized in dictionaries
user = {
    "name": "Alice",
    "age": 25,
    "email": "alice@email.com",
    "city": "NYC"
}

product = {
    "name": "Widget",
    "price": 99.99,
    "stock": 50
}
```

## Shadowing Built-ins

Avoid using built-in names as variables:

```python
# ❌ Bad - shadows built-in
list = [1, 2, 3]  # Now 'list' is a variable, not the type
# list() no longer works!

# ✅ Good - use different name
numbers = [1, 2, 3]
```

Common built-ins to avoid shadowing:

```python
# Don't use these as variable names:
# list, dict, str, int, float, bool, type
# min, max, sum, len, range, input, print
# open, file, id, object, property
```

## Practical Examples

### Example 1: Namespace Inspection

```python
def inspect_namespace():
    local_var = 100
    
    print("Local namespace:")
    for name, value in locals().items():
        print(f"  {name} = {value}")
    
    print("\nGlobal namespace (sample):")
    for name in ["__name__", "__file__"]:
        if name in globals():
            print(f"  {name} = {globals()[name]}")

global_var = 200
inspect_namespace()
```

### Example 2: Dynamic Variable Access

```python
config = {
    "host": "localhost",
    "port": 8000,
    "debug": True
}

# Access config values dynamically
def get_config(key):
    return globals()["config"].get(key)

print(get_config("host"))   # localhost
print(get_config("port"))   # 8000
print(get_config("debug"))  # True
```

### Example 3: Safe Variable Lookup

```python
def safe_get_variable(name, default=None):
    """Safely get variable from global namespace"""
    return globals().get(name, default)

x = 10
y = 20

print(safe_get_variable("x"))      # 10
print(safe_get_variable("z", 0))   # 0 (default)
```

### Example 4: Scope Debugger

```python
def scope_debugger():
    local_x = "local"
    
    def inner():
        inner_x = "inner"
        
        print("=== Scope Information ===")
        print(f"Local namespace: {locals()}")
        print(f"Enclosing vars: local_x = {local_x}")
        print(f"Global sample: __name__ = {globals()['__name__']}")
        print(f"Built-in sample: len = {len}")
    
    inner()

scope_debugger()
```

## Namespace Lifetime

Different namespaces have different lifetimes:

```python
# Global namespace - exists throughout program
global_var = 100

def func():
    # Local namespace - created and destroyed each call
    local_var = 200
    print(f"Local: {local_var}")

func()  # Local namespace created
# Local namespace destroyed

func()  # New local namespace created
# Local namespace destroyed again
```

## Best Practices

### 1. Minimize Global Variables

```python
# ❌ Too many globals
total = 0
count = 0
average = 0

# ✅ Better - pass parameters
def calculate(numbers):
    total = sum(numbers)
    count = len(numbers)
    average = total / count
    return total, count, average
```

### 2. Use Descriptive Names

```python
# ❌ Unclear
x = 100
y = 200

# ✅ Clear
max_retries = 100
timeout_seconds = 200
```

### 3. Avoid Shadowing

```python
# ❌ Shadows built-in
sum = 10 + 20

# ✅ Different name
total = 10 + 20
```

### 4. Group Related Variables

```python
# ❌ Scattered
db_host = "localhost"
db_port = 5432
db_name = "mydb"

# ✅ Grouped
database = {
    "host": "localhost",
    "port": 5432,
    "name": "mydb"
}
```

## Key Takeaways

- **Namespaces** map names to objects
- Python has **built-in**, **global**, and **local** namespaces
- **LEGB** rule: Local → Enclosing → Global → Built-in
- Use `globals()` to access global namespace
- Use `locals()` to access local namespace
- Use `dir()` to list names in namespace
- Avoid **namespace pollution** and **shadowing built-ins**

## What's Next?

You've mastered namespaces! Next, we'll explore **testing and debugging** techniques in Chapter 5.

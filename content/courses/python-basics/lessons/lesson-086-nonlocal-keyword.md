---
id: 58-nonlocal-keyword
title: The nonlocal Keyword
chapterId: ch7-scope
order: 5
duration: 20
objectives:
  - Master the nonlocal keyword
  - Modify enclosing scope variables
  - Compare nonlocal vs global
  - Apply nonlocal in closures
  - Avoid common nonlocal pitfalls
---

# The nonlocal Keyword

## Introduction

The `nonlocal` keyword allows you to modify variables in an enclosing (outer) function scope. Without it, assigning to a variable creates a new local variable instead.

## Basic nonlocal Usage

```python
def outer():
    count = 0  # Enclosing scope variable
    
    def inner():
        nonlocal count  # Declare we're modifying outer's count
        count += 1
        return count
    
    print(inner())  # 1
    print(inner())  # 2
    print(count)    # 2

outer()
```

## Without nonlocal (Wrong)

```python
def outer():
    count = 0
    
    def inner():
        count = count + 1  # Error! Can't access before local assignment
        return count
    
    # inner()  # UnboundLocalError!
```

## nonlocal vs global

```python
# Global variable
global_var = 100

# Enclosing variable
def create_counter():
    enclosing_var = 0
    
    def increment_enclosing():
        nonlocal enclosing_var  # Modify enclosing
        enclosing_var += 1
        return enclosing_var
    
    def increment_global():
        global global_var  # Modify global
        global_var += 1
        return global_var
    
    return increment_enclosing, increment_global

inc_enc, inc_glob = create_counter()
print(inc_enc())   # 1 (enclosing)
print(inc_glob())  # 101 (global)
```

## Multiple Enclosing Levels

```python
def outer():
    x = 1
    
    def middle():
        x = 2
        
        def inner():
            nonlocal x  # Modifies nearest enclosing x (middle's x)
            x = 3
        
        inner()
        print(f"Middle x: {x}")  # 3
    
    middle()
    print(f"Outer x: {x}")  # 1 (unchanged)

outer()
```

## Practical nonlocal Examples

### Example 1: Counter Closure

```python
def make_counter(start=0):
    count = start
    
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
    
    def get():
        return count
    
    return increment, decrement, reset, get

# Create counter
inc, dec, reset, get = make_counter(10)
print(inc())    # 11
print(inc())    # 12
print(dec())    # 11
reset()
print(get())    # 10
```

### Example 2: State Machine

```python
def create_traffic_light():
    state = "red"
    
    def change():
        nonlocal state
        if state == "red":
            state = "green"
        elif state == "green":
            state = "yellow"
        elif state == "yellow":
            state = "red"
        return state
    
    def get_state():
        return state
    
    return change, get_state

change, get = create_traffic_light()
print(get())     # red
print(change())  # green
print(change())  # yellow
print(change())  # red
```

### Example 3: Accumulator

```python
def create_accumulator():
    total = 0
    items = []
    
    def add(value):
        nonlocal total
        total += value
        items.append(value)
        return total
    
    def get_average():
        if not items:
            return 0
        return total / len(items)
    
    def clear():
        nonlocal total
        total = 0
        items.clear()
    
    return add, get_average, clear

add, avg, clear = create_accumulator()
add(10)
add(20)
add(30)
print(avg())  # 20.0
```

## When to Use nonlocal

```python
# Good use: Maintaining state in closures
def create_logger():
    log_count = 0
    
    def log(message):
        nonlocal log_count
        log_count += 1
        print(f"[{log_count}] {message}")
    
    return log

# Good use: Multiple related functions sharing state
def create_bank_account(initial_balance):
    balance = initial_balance
    
    def deposit(amount):
        nonlocal balance
        balance += amount
    
    def withdraw(amount):
        nonlocal balance
        balance -= amount
    
    def get_balance():
        return balance
    
    return deposit, withdraw, get_balance
```

## When NOT to Use nonlocal

```python
# Bad: Simple read-only access (no nonlocal needed)
def outer():
    x = 10
    
    def inner():
        # nonlocal x  # NOT NEEDED - just reading
        print(x)
    
    inner()

# Bad: Modifying global (use 'global' instead)
count = 0

def increment():
    # nonlocal count  # WRONG! count is global, not enclosing
    global count      # CORRECT
    count += 1

# Bad: Creating new local (no keyword needed)
def outer():
    def inner():
        x = 10  # New local variable, no nonlocal needed
        print(x)
    inner()
```

## nonlocal Scope Resolution

```python
def level1():
    x = "level1"
    
    def level2():
        x = "level2"
        
        def level3():
            nonlocal x  # Which x? (nearest enclosing = level2's x)
            x = "modified"
        
        level3()
        print(f"Level2 x: {x}")  # modified
    
    level2()
    print(f"Level1 x: {x}")  # level1 (unchanged)

level1()
```

## Multiple nonlocal Variables

```python
def outer():
    x = 1
    y = 2
    z = 3
    
    def inner():
        nonlocal x, y, z  # Declare multiple nonlocal vars
        x += 1
        y += 1
        z += 1
    
    inner()
    print(x, y, z)  # 2 3 4

outer()
```

## nonlocal with Conditionals

```python
def create_toggle():
    state = False
    
    def toggle():
        nonlocal state
        state = not state
        return state
    
    return toggle

switch = create_toggle()
print(switch())  # True
print(switch())  # False
print(switch())  # True
```

## Summary

- **nonlocal**: Modify variables in enclosing function scope
- **Without nonlocal**: Assignment creates new local variable
- **vs global**: Use `global` for module-level, `nonlocal` for enclosing function
- **Scope resolution**: Finds nearest enclosing variable with that name
- **Use for**: Closures, state management, function factories
- **Not needed**: When only reading enclosing variables
- **Syntax**: `nonlocal var1, var2, var3`

## Next Steps

Next, you'll learn closure patterns and practical applications.

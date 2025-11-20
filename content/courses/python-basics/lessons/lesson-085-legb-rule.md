---
id: 57-legb-rule
title: The LEGB Rule
chapterId: ch7-scope
order: 4
duration: 30
objectives:
  - Master the LEGB scope resolution rule
  - Understand Local, Enclosing, Global, Built-in scopes
  - Predict variable resolution
  - Debug scope-related issues
  - Apply LEGB in complex scenarios
---

# The LEGB Rule

## Introduction

Python uses the **LEGB rule** to resolve variable names. LEGB stands for:
- **L**ocal
- **E**nclosing
- **G**lobal
- **B**uilt-in

Python searches these scopes in order until it finds the variable.

## The Four Scopes

```python
# B - Built-in scope (always available)
print(len([1, 2, 3]))  # len is built-in

# G - Global scope
global_var = "I'm global"

def outer():
    # E - Enclosing scope
    enclosing_var = "I'm enclosing"
    
    def inner():
        # L - Local scope
        local_var = "I'm local"
        
        print(local_var)       # L - Local
        print(enclosing_var)   # E - Enclosing
        print(global_var)      # G - Global
        print(len([1, 2]))     # B - Built-in
    
    inner()

outer()
```

## Local Scope (L)

Variables defined inside the current function:

```python
def calculate():
    result = 42  # Local variable
    print(result)

calculate()
# print(result)  # NameError: result not in scope
```

## Enclosing Scope (E)

Variables in outer function(s):

```python
def outer():
    x = "outer"
    
    def middle():
        y = "middle"
        
        def inner():
            z = "inner"
            print(z)  # Local
            print(y)  # Enclosing (middle)
            print(x)  # Enclosing (outer)
        
        inner()
    
    middle()

outer()
```

## Global Scope (G)

Variables at the module level:

```python
module_var = "module level"

def function():
    print(module_var)  # Access global

function()
```

## Built-in Scope (B)

Python's built-in functions and names:

```python
# These are always available (built-in scope)
print(len([1, 2, 3]))    # len
print(max(1, 2, 3))      # max
print(abs(-5))           # abs
print(sum([1, 2, 3]))    # sum
```

## LEGB in Action

```python
x = "global x"

def outer():
    x = "outer x"
    
    def inner():
        x = "inner x"
        print(x)  # Which x?
    
    inner()
    print(x)

outer()
print(x)

# Output:
# inner x    (Local scope of inner)
# outer x    (Local scope of outer)
# global x   (Global scope)
```

## Variable Shadowing

Inner scopes can shadow outer scopes:

```python
x = 100  # Global

def test():
    x = 10  # Local (shadows global)
    print(f"Inside function: {x}")

test()
print(f"Outside function: {x}")

# Output:
# Inside function: 10
# Outside function: 100
```

## Accessing vs Modifying

```python
# Can READ outer scope without keywords
count = 0

def read_global():
    print(count)  # OK - just reading

read_global()

# Cannot MODIFY without global/nonlocal
def modify_global():
    count = count + 1  # Error! Can't access before assignment

# Fix with global keyword
def modify_global_correct():
    global count
    count = count + 1

modify_global_correct()
print(count)  # 1
```

## Practical Examples

### Example 1: LEGB Resolution

```python
# Built-in
max_value = max

# Global
message = "Global message"

def outer():
    # Enclosing
    message = "Enclosing message"
    
    def middle():
        # Another enclosing level
        message = "Middle message"
        
        def inner():
            # Local
            message = "Local message"
            print(f"1. {message}")  # Local message
            print(f"2. {max_value([1, 2, 3])}")  # Built-in (max)
        
        inner()
        print(f"3. {message}")  # Middle message
    
    middle()
    print(f"4. {message}")  # Enclosing message

outer()
print(f"5. {message}")  # Global message
```

### Example 2: Modifying Enclosing Scope

```python
def create_counter():
    count = 0  # Enclosing scope
    
    def increment():
        nonlocal count  # Access enclosing scope
        count += 1
        return count
    
    def decrement():
        nonlocal count
        count -= 1
        return count
    
    def get_count():
        return count  # Read-only, no nonlocal needed
    
    return increment, decrement, get_count

inc, dec, get = create_counter()
print(inc())  # 1
print(inc())  # 2
print(dec())  # 1
print(get())  # 1
```

### Example 3: Multiple Enclosing Levels

```python
def level1():
    x = "level1"
    
    def level2():
        x = "level2"
        
        def level3():
            x = "level3"
            
            def level4():
                # Can access any enclosing scope
                print(f"Level 4 sees: {x}")
            
            level4()
            print(f"Level 3 has: {x}")
        
        level3()
        print(f"Level 2 has: {x}")
    
    level2()
    print(f"Level 1 has: {x}")

level1()
# Level 4 sees: level3
# Level 3 has: level3
# Level 2 has: level2
# Level 1 has: level1
```

### Example 4: Shadowing Built-ins (Bad Practice)

```python
# Don't shadow built-in names!
def bad_example():
    len = 42  # Shadows built-in len()
    print(len)  # 42
    # print(len([1, 2, 3]))  # Error! len is now an int

# Good: Use different names
def good_example():
    length = 42
    print(length)
    print(len([1, 2, 3]))  # Works!
```

### Example 5: Global vs Nonlocal

```python
# Global for module-level variables
global_count = 0

def increment_global():
    global global_count  # Modify global
    global_count += 1

# Nonlocal for enclosing function variables
def create_incrementer():
    enclosing_count = 0
    
    def increment():
        nonlocal enclosing_count  # Modify enclosing
        enclosing_count += 1
        return enclosing_count
    
    return increment

inc = create_incrementer()
print(inc())  # 1
print(inc())  # 2

increment_global()
print(global_count)  # 1
```

### Example 6: Complex Scope Chain

```python
x = "global"

def outer():
    x = "enclosing"
    
    def inner():
        # Access enclosing x
        print(f"Inner sees: {x}")
        
        def innermost():
            # Access enclosing x through two levels
            print(f"Innermost sees: {x}")
        
        innermost()
    
    inner()

outer()

# Output:
# Inner sees: enclosing
# Innermost sees: enclosing
```

## Common LEGB Mistakes

### Mistake 1: Accessing Before Assignment

```python
x = 10

def bad():
    print(x)  # Trying to read x
    x = 5     # But x is assigned locally
              # Python sees this as local variable

# bad()  # UnboundLocalError!

# Fix: Use global if you need to modify
def good():
    global x
    print(x)
    x = 5

good()
```

### Mistake 2: Forgetting nonlocal

```python
def outer():
    count = 0
    
    def increment():
        count = count + 1  # Error! Local assignment
        return count
    
    # return increment()  # UnboundLocalError!

# Fix:
def outer_fixed():
    count = 0
    
    def increment():
        nonlocal count
        count = count + 1
        return count
    
    return increment()

print(outer_fixed())  # 1
```

### Mistake 3: Shadowing Unintentionally

```python
data = [1, 2, 3]

def process():
    data = []  # Shadows global! Probably unintended
    data.append(4)
    print(data)

process()  # [4]
print(data)  # [1, 2, 3] - global unchanged
```

## LEGB Search Order

```python
# Python searches: L -> E -> G -> B

name = "Global"  # G

def outer():
    name = "Enclosing"  # E
    
    def inner():
        name = "Local"  # L
        print(name)  # Finds in L, stops searching
    
    inner()

outer()

# Search order:
# 1. Check Local scope (inner) - FOUND "Local"
# 2. Would check Enclosing scope (outer)
# 3. Would check Global scope (module)
# 4. Would check Built-in scope
```

## Inspecting Scopes

```python
# globals() - Returns global symbol table
x = 100
print("x" in globals())  # True

# locals() - Returns local symbol table
def test():
    y = 200
    print("y" in locals())  # True
    print("x" in locals())  # False

test()
```

## Summary

- **LEGB**: Local → Enclosing → Global → Built-in
- **Local**: Current function
- **Enclosing**: Outer function(s)
- **Global**: Module level
- **Built-in**: Python's built-in names
- **Shadowing**: Inner scope hides outer scope
- **global**: Modify global variables
- **nonlocal**: Modify enclosing variables
- **Read vs Write**: Reading is OK, writing needs keywords

## Next Steps

Next, you'll learn about the nonlocal keyword in depth and when to use it.

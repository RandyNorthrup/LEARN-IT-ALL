---
id: 49-variable-memory
title: Variable Memory and Identity
chapterId: ch2-variables
order: 10
duration: 25
objectives:
  - Understand how Python stores variables in memory
  - Learn about variable identity vs equality
  - Master the id() function
  - Understand mutable vs immutable types
  - Learn about variable references and aliasing
---

# Variable Memory and Identity

## Introduction

In Python, variables are references to objects in memory. Understanding how Python manages memory helps you write more efficient code and avoid common bugs.

## Variables as References

Variables don't contain values—they reference objects in memory:

```python
# Create an integer object and reference it with x
x = 42
print(x)  # 42

# y references the SAME object as x
y = x
print(y)  # 42

# Check if they reference the same object
print(id(x))  # Memory address (e.g., 140234567890)
print(id(y))  # Same memory address!
```

## The id() Function

Every object in Python has a unique identifier (memory address):

```python
# Get object identity
x = 100
print(id(x))  # e.g., 140234567890

# Different objects have different ids
a = [1, 2, 3]
b = [1, 2, 3]
print(id(a))  # e.g., 140234568000
print(id(b))  # e.g., 140234568100 (different!)
```

## Identity vs Equality

Two ways to compare objects:

```python
# == checks VALUE equality
a = [1, 2, 3]
b = [1, 2, 3]
print(a == b)  # True (same values)

# is checks IDENTITY (same object in memory)
print(a is b)  # False (different objects)

# Same reference
c = a
print(a is c)  # True (same object)
print(id(a) == id(c))  # True
```

## Immutable Types

Some types cannot be changed after creation:

```python
# Integers are immutable
x = 42
print(id(x))  # e.g., 140234567890

x = x + 1  # Creates NEW object, x references it
print(id(x))  # Different memory address!

# Strings are immutable
name = "Alice"
print(id(name))  # e.g., 140234568000

name = name + " Smith"  # Creates NEW string
print(id(name))  # Different address!

# Tuples are immutable
point = (10, 20)
print(id(point))  # e.g., 140234568100

# Can't change tuple contents
# point[0] = 30  # TypeError!
```

**Immutable types**: `int`, `float`, `str`, `tuple`, `bool`, `frozenset`

## Mutable Types

Some types CAN be changed in place:

```python
# Lists are mutable
numbers = [1, 2, 3]
print(id(numbers))  # e.g., 140234568200

numbers.append(4)  # Modifies SAME object
print(id(numbers))  # SAME address!
print(numbers)     # [1, 2, 3, 4]

# Dictionaries are mutable
person = {"name": "Alice"}
print(id(person))  # e.g., 140234568300

person["age"] = 25  # Modifies SAME object
print(id(person))   # SAME address!
```

**Mutable types**: `list`, `dict`, `set`

## Reference Aliasing

Multiple variables can reference the same object:

```python
# Create list
original = [1, 2, 3]
alias = original  # alias references SAME object

# Modify through alias
alias.append(4)

# Both variables see the change!
print(original)  # [1, 2, 3, 4]
print(alias)     # [1, 2, 3, 4]
print(original is alias)  # True (same object)
```

## Practical Examples

### Example 1: Unexpected List Behavior

```python
# Problem: Aliasing
list1 = [1, 2, 3]
list2 = list1  # Reference, not a copy!

list2.append(4)
print(list1)  # [1, 2, 3, 4] - surprise!

# Solution: Create a copy
list1 = [1, 2, 3]
list2 = list1.copy()  # or list(list1) or list1[:]

list2.append(4)
print(list1)  # [1, 2, 3] - unchanged
print(list2)  # [1, 2, 3, 4]
```

### Example 2: Function Arguments (Mutable)

```python
# Lists are passed by reference
def add_item(items, item):
    items.append(item)  # Modifies original list!

shopping_list = ["milk", "eggs"]
add_item(shopping_list, "bread")
print(shopping_list)  # ['milk', 'eggs', 'bread']

# To avoid modifying original:
def add_item_safe(items, item):
    new_items = items.copy()
    new_items.append(item)
    return new_items

shopping_list = ["milk", "eggs"]
new_list = add_item_safe(shopping_list, "bread")
print(shopping_list)  # ['milk', 'eggs'] - unchanged
print(new_list)       # ['milk', 'eggs', 'bread']
```

### Example 3: Function Arguments (Immutable)

```python
# Immutable types create new objects
def increment(x):
    x = x + 1  # Creates new integer object
    return x

count = 10
result = increment(count)
print(count)   # 10 (unchanged)
print(result)  # 11 (new value)
```

### Example 4: Default Mutable Arguments (DANGER!)

```python
# WRONG: Mutable default argument
def add_task(task, tasks=[]):  # DON'T DO THIS!
    tasks.append(task)
    return tasks

# Unexpected behavior:
print(add_task("Task 1"))  # ['Task 1']
print(add_task("Task 2"))  # ['Task 1', 'Task 2'] - huh?!

# RIGHT: Use None as default
def add_task_correct(task, tasks=None):
    if tasks is None:
        tasks = []
    tasks.append(task)
    return tasks

print(add_task_correct("Task 1"))  # ['Task 1']
print(add_task_correct("Task 2"))  # ['Task 2'] - correct!
```

### Example 5: Checking Object Identity

```python
# Use 'is' for None, True, False
value = None
if value is None:  # Correct
    print("Value is None")

if value == None:  # Works but not idiomatic
    print("Value equals None")

# Small integers are cached
a = 256
b = 256
print(a is b)  # True (Python caches small integers)

a = 257
b = 257
print(a is b)  # False (not cached)

# Always use == for value comparison
a = 1000
b = 1000
print(a == b)  # True (correct way to check value)
print(a is b)  # False (different objects)
```

## Memory Diagram

```python
# Visualization of references
x = [1, 2, 3]
y = x
z = [1, 2, 3]

# Memory layout:
# x, y -> [1, 2, 3] (same object in memory)
# z -> [1, 2, 3] (different object in memory)

print(x is y)  # True (same object)
print(x is z)  # False (different objects)
print(x == z)  # True (same values)
```

## Shallow vs Deep Copy

```python
# Shallow copy (copy module)
import copy

original = [[1, 2], [3, 4]]
shallow = copy.copy(original)

shallow[0].append(99)
print(original)  # [[1, 2, 99], [3, 4]] - nested list affected!

# Deep copy (copy everything)
original = [[1, 2], [3, 4]]
deep = copy.deepcopy(original)

deep[0].append(99)
print(original)  # [[1, 2], [3, 4]] - unchanged!
print(deep)      # [[1, 2, 99], [3, 4]]
```

## String Interning

Python caches some strings for efficiency:

```python
# String interning (optimization)
a = "hello"
b = "hello"
print(a is b)  # True (same string object cached)

# Longer strings may not be interned
a = "hello " * 100
b = "hello " * 100
print(a is b)  # Might be False

# Always use == for strings
print(a == b)  # True (correct comparison)
```

## When to Use `is` vs `==`

```python
# Use 'is' for:
# - None
if value is None:
    pass

# - True/False (though == works too)
if flag is True:
    pass

# - Checking if two variables reference same object
if list1 is list2:
    print("Same list object")

# Use '==' for:
# - Value comparison
if x == 42:
    pass

# - String comparison
if name == "Alice":
    pass

# - List/dict comparison
if list1 == list2:
    pass
```

## Performance Implications

```python
import sys

# Small integers (−5 to 256) are cached
x = 100
y = 100
print(x is y)  # True (same object)

# Saves memory
a = 1
b = 1
print(sys.getsizeof(a))  # e.g., 28 bytes
print(id(a) == id(b))    # True (same object)

# Large integers are not cached
x = 100000
y = 100000
print(x is y)  # False (different objects)
```

## Common Pitfalls

```python
# Pitfall 1: Assuming assignment copies
original = [1, 2, 3]
copy = original  # NOT a copy!
copy.append(4)
print(original)  # [1, 2, 3, 4] - modified!

# Pitfall 2: Modifying while iterating
numbers = [1, 2, 3, 4, 5]
for num in numbers:
    if num % 2 == 0:
        numbers.remove(num)  # DON'T DO THIS!
# Better: create new list
numbers = [num for num in numbers if num % 2 != 0]

# Pitfall 3: Mutable default arguments
def append_to(element, target=[]):  # BUG!
    target.append(element)
    return target

# Fix: Use None
def append_to(element, target=None):
    if target is None:
        target = []
    target.append(element)
    return target
```

## Summary

- **Variables are references** to objects in memory
- **id()**: Returns unique object identifier (memory address)
- **is**: Checks if two references point to same object
- **==**: Checks if two objects have same value
- **Immutable types**: int, str, tuple, float, bool (cannot change)
- **Mutable types**: list, dict, set (can change in place)
- **Aliasing**: Multiple variables referencing same object
- **Copy**: Use `.copy()` or `copy.deepcopy()` to duplicate objects
- **Use `is`** for None, True, False
- **Use `==`** for value comparison

## Next Steps

Next, you'll expand your knowledge of functions, including advanced parameter patterns like *args and **kwargs.

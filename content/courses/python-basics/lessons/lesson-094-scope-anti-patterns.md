---
id: "109-scope-anti-patterns"
title: "Common Scope Anti-Patterns"
chapterId: ch7-scope
order: 13
duration: 20
objectives:
  - Recognize common scope mistakes
  - Understand why anti-patterns are problematic
  - Learn correct alternatives
  - Write cleaner, more maintainable code
---

# Common Scope Anti-Patterns

Learning what NOT to do is as important as learning what to do. This lesson covers common scope mistakes and how to fix them.

## Anti-Pattern 1: Global Variable Abuse

```python
# ❌ BAD - Excessive use of globals
total = 0
count = 0
average = 0

def process_number(n):
    global total, count, average
    total += n
    count += 1
    average = total / count

def reset():
    global total, count, average
    total = 0
    count = 0
    average = 0

# Problems:
# - Hard to test
# - Hard to reason about
# - Functions have hidden dependencies
# - Can't run multiple calculations simultaneously

# ✅ GOOD - Use class or pass parameters
class Statistics:
    def __init__(self):
        self.total = 0
        self.count = 0
    
    def process_number(self, n):
        self.total += n
        self.count += 1
    
    @property
    def average(self):
        return self.total / self.count if self.count > 0 else 0
    
    def reset(self):
        self.total = 0
        self.count = 0

# Clear, testable, can have multiple instances
stats1 = Statistics()
stats2 = Statistics()

stats1.process_number(10)
stats2.process_number(20)
# Each independent!
```

## Anti-Pattern 2: Hidden Global Dependencies

```python
# ❌ BAD - Function depends on global state
config_value = 10

def calculate(x):
    return x * config_value  # Hidden dependency!

result = calculate(5)  # 50

config_value = 20
result = calculate(5)  # 100 - different result!

# Problems:
# - Hard to understand what function needs
# - Hard to test
# - Behavior changes based on global state

# ✅ GOOD - Explicit parameters
def calculate(x, multiplier):
    return x * multiplier

result = calculate(5, 10)  # 50
result = calculate(5, 20)  # 100
# Clear what affects the result

# ✅ ALSO GOOD - Default parameter
def calculate_with_default(x, multiplier=10):
    return x * multiplier

result = calculate_with_default(5)      # 50
result = calculate_with_default(5, 20)  # 100
# Default documented, can be overridden
```

## Anti-Pattern 3: Modifying Mutable Globals

```python
# ❌ BAD - Modifying global list
shared_list = []

def add_item(item):
    shared_list.append(item)  # Modifies global

def get_items():
    return shared_list  # Returns reference to global

# Problems:
# - Anyone can modify shared_list
# - Hard to track who modified what
# - Race conditions in multi-threaded code

add_item(1)
add_item(2)
items = get_items()
items.append(3)  # Modifies global directly!
print(shared_list)  # [1, 2, 3]

# ✅ GOOD - Encapsulate in class
class ItemManager:
    def __init__(self):
        self._items = []  # Private
    
    def add_item(self, item):
        self._items.append(item)
    
    def get_items(self):
        return self._items.copy()  # Return copy
    
    def get_item_count(self):
        return len(self._items)

manager = ItemManager()
manager.add_item(1)
manager.add_item(2)
items = manager.get_items()
items.append(3)  # Doesn't affect internal list
print(manager.get_item_count())  # 2
```

## Anti-Pattern 4: Leaking Loop Variables

```python
# ❌ BAD - Loop variable leaks into outer scope
for i in range(5):
    pass

print(i)  # 4 - i still exists!

# Even worse with nested loops
for i in range(3):
    for i in range(5):  # Shadows outer i!
        pass
    print(i)  # 4 - inner i overwrote outer i!

# ✅ GOOD - Use functions to create scope
def process_range():
    for i in range(5):
        pass
    # i destroyed here

process_range()
# print(i)  # NameError - i doesn't exist

# ✅ GOOD - Use meaningful names
for user_index in range(len(users)):
    user = users[user_index]
    # Clear what the variable represents

# ✅ BETTER - Use enumerate
for index, user in enumerate(users):
    # Clear and Pythonic
    pass
```

## Anti-Pattern 5: Mutable Default Arguments

```python
# ❌ BAD - Mutable default argument
def add_to_list(item, items=[]):
    items.append(item)
    return items

# Looks innocent but causes bugs!
list1 = add_to_list(1)  # [1]
list2 = add_to_list(2)  # [1, 2] - Oops!
list3 = add_to_list(3)  # [1, 2, 3] - Shared list!

# ✅ GOOD - Use None as default
def add_to_list_correct(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items

list1 = add_to_list_correct(1)  # [1]
list2 = add_to_list_correct(2)  # [2]
list3 = add_to_list_correct(3)  # [3]
# Each independent!

# Why it happens:
def show_problem(items=[]):
    print(f"ID of items: {id(items)}")
    items.append(1)

show_problem()  # Same ID
show_problem()  # Same ID - same object!
show_problem()  # Same ID - same object!
```

## Anti-Pattern 6: Unintentional Closure Capture

```python
# ❌ BAD - Closure captures loop variable
functions = []
for i in range(3):
    functions.append(lambda: i)

# What you expect: [0, 1, 2]
# What you get:
print([f() for f in functions])  # [2, 2, 2]

# All closures capture the same i, which ends up as 2

# ✅ GOOD - Use default argument
functions = []
for i in range(3):
    functions.append(lambda i=i: i)  # Capture current value

print([f() for f in functions])  # [0, 1, 2]

# ✅ ALSO GOOD - Use function factory
def make_function(value):
    return lambda: value

functions = [make_function(i) for i in range(3)]
print([f() for f in functions])  # [0, 1, 2]
```

## Anti-Pattern 7: Global in Every Function

```python
# ❌ BAD - Using global everywhere
counter = 0

def increment():
    global counter
    counter += 1

def decrement():
    global counter
    counter -= 1

def reset():
    global counter
    counter = 0

def get_value():
    global counter  # Unnecessary - just reading
    return counter

# ✅ GOOD - Use class
class Counter:
    def __init__(self):
        self._value = 0
    
    def increment(self):
        self._value += 1
    
    def decrement(self):
        self._value -= 1
    
    def reset(self):
        self._value = 0
    
    def get_value(self):
        return self._value

counter = Counter()
counter.increment()
```

## Anti-Pattern 8: Shadowing Built-ins

```python
# ❌ BAD - Shadowing built-in names
def calculate():
    sum = 0  # Shadows built-in sum()!
    list = []  # Shadows built-in list()!
    dict = {}  # Shadows built-in dict()!
    
    # Now can't use built-ins in this scope
    # sum([1, 2, 3])  # TypeError: 'int' object is not callable

# ✅ GOOD - Use different names
def calculate():
    total = 0  # Clear and doesn't shadow
    items = []  # Clear
    data = {}  # Clear
    
    # Can still use built-ins
    result = sum([1, 2, 3])

# Common names to avoid:
# list, dict, tuple, set, str, int, float, bool
# sum, max, min, len, range, zip, map, filter
# id, type, input, open, file
```

## Anti-Pattern 9: Confusion with Nonlocal

```python
# ❌ BAD - Unclear use of nonlocal
def outer():
    x = 10
    
    def inner1():
        nonlocal x
        x = 20
    
    def inner2():
        nonlocal x
        x = 30
    
    inner1()
    inner2()
    return x  # What's the value? Hard to track!

# ✅ GOOD - Return values explicitly
def outer():
    x = 10
    
    def inner1(value):
        return value + 10
    
    def inner2(value):
        return value + 20
    
    x = inner1(x)
    x = inner2(x)
    return x  # Clear: 10 + 10 + 20 = 40

# ✅ ALSO GOOD - Use class for state
class Calculator:
    def __init__(self, initial):
        self.value = initial
    
    def add_ten(self):
        self.value += 10
    
    def add_twenty(self):
        self.value += 20

calc = Calculator(10)
calc.add_ten()
calc.add_twenty()
print(calc.value)  # 40
```

## Anti-Pattern 10: Circular Dependencies

```python
# ❌ BAD - Circular module dependencies
# module_a.py
from module_b import function_b

def function_a():
    return function_b()

# module_b.py
from module_a import function_a  # Circular!

def function_b():
    return function_a()

# ✅ GOOD - Restructure to avoid circularity
# shared.py
def shared_function():
    return "shared"

# module_a.py
from shared import shared_function

def function_a():
    return shared_function()

# module_b.py
from shared import shared_function

def function_b():
    return shared_function()
```

## Anti-Pattern 11: Implicit Global Creation

```python
# ❌ BAD - Typo creates global
def calculate():
    result = 0
    for i in range(10):
        result += i
    return result

def process():
    total = calculate()
    # Typo: missing 'l'
    tota1 = total * 2  # Creates global tota1 (with number 1)!
    return total

process()
print(tota1)  # Works but shouldn't exist!

# ✅ GOOD - Use linter or type hints
def process() -> int:
    total: int = calculate()
    # Linter would catch:
    # tota1 = total * 2  # Undefined variable
    return total * 2
```

## Best Practices Summary

```python
# ✅ DO: Minimize global usage
class State:
    def __init__(self):
        self.data = []
    
    def add(self, item):
        self.data.append(item)

# ✅ DO: Explicit parameters
def process(data, config):
    return data * config['multiplier']

# ✅ DO: Return values, don't modify globals
def calculate(x):
    return x * 2

# ✅ DO: Use None for mutable defaults
def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items

# ✅ DO: Capture loop variables properly
functions = [lambda x=x: x for x in range(3)]

# ✅ DO: Use meaningful names
for user_index, user in enumerate(users):
    pass

# ❌ DON'T: Use globals unnecessarily
# ❌ DON'T: Modify mutable globals
# ❌ DON'T: Use mutable default arguments
# ❌ DON'T: Shadow built-ins
# ❌ DON'T: Create circular dependencies
```

## Summary

**Top Scope Anti-Patterns:**

1. **Global abuse** - Use classes or parameters instead
2. **Hidden dependencies** - Make dependencies explicit
3. **Mutable globals** - Encapsulate in classes
4. **Leaking loop vars** - Use functions for scope
5. **Mutable defaults** - Use `None` as default
6. **Closure capture** - Use default arguments
7. **Unnecessary global** - Only use when truly global
8. **Shadowing built-ins** - Choose different names
9. **Nonlocal confusion** - Return values explicitly
10. **Circular imports** - Restructure code

**Key Principles:**

- **Explicit is better than implicit**
- **Minimize scope** - smallest scope possible
- **Avoid side effects** - return values, don't modify globals
- **Encapsulate state** - use classes for related data
- **Clear dependencies** - parameters show what function needs

**Remember:**
> "Namespaces are one honking great idea -- let's do more of those!" - Zen of Python

Avoiding these anti-patterns leads to clearer, more maintainable code!

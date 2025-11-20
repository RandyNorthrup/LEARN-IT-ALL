---
id: 65-pdb-debugger
title: The pdb Debugger
chapterId: ch12-testing
order: 6
duration: 25
objectives:
  - Master the pdb debugger
  - Set and use breakpoints
  - Step through code
  - Inspect variables interactively
  - Debug complex issues
---

# The pdb Debugger

## Introduction

pdb (Python Debugger) is Python's built-in interactive debugger. It allows you to pause execution, inspect variables, and step through code line by line.

## Starting pdb

```python
import pdb

def calculate_total(prices):
    total = 0
    for price in prices:
        pdb.set_trace()  # Execution pauses here
        total += price
    return total

calculate_total([10, 20, 30])
# Enters interactive debugger
```

## Using breakpoint() (Python 3.7+)

```python
def process_data(data):
    result = []
    for item in data:
        breakpoint()  # Modern way to start debugger
        processed = item * 2
        result.append(processed)
    return result

process_data([1, 2, 3])
```

## Essential pdb Commands

```python
# In pdb session:
# l (list)     - Show current code
# n (next)     - Execute next line
# s (step)     - Step into function
# c (continue) - Continue until next breakpoint
# p variable   - Print variable value
# pp variable  - Pretty-print variable
# w (where)    - Show stack trace
# q (quit)     - Exit debugger

def example():
    x = 10
    y = 20
    breakpoint()
    result = x + y  # Step through here
    return result

example()
# (Pdb) p x        # Prints: 10
# (Pdb) p y        # Prints: 20
# (Pdb) n          # Execute next line
# (Pdb) p result   # Prints: 30
```

## Inspecting Variables

```python
def analyze_data(numbers):
    total = sum(numbers)
    average = total / len(numbers)
    breakpoint()
    
    max_val = max(numbers)
    min_val = min(numbers)
    return average

analyze_data([1, 2, 3, 4, 5])

# In pdb:
# (Pdb) p numbers       # [1, 2, 3, 4, 5]
# (Pdb) p total         # 15
# (Pdb) p average       # 3.0
# (Pdb) p len(numbers)  # 5
# (Pdb) p type(average) # <class 'float'>
```

## Stepping Through Code

```python
def outer():
    x = 10
    result = inner(x)
    return result

def inner(value):
    return value * 2

breakpoint()
outer()

# (Pdb) s      # Step into outer()
# (Pdb) n      # Next line (x = 10)
# (Pdb) n      # Next line (result = inner(x))
# (Pdb) s      # Step INTO inner() function
# (Pdb) p value  # Shows: 10
# (Pdb) n      # Execute return
# (Pdb) c      # Continue to end
```

## Conditional Breakpoints

```python
def process_items(items):
    for i, item in enumerate(items):
        # Only break on specific condition
        if i == 5:  # Break on 5th iteration
            breakpoint()
        
        result = item * 2
        print(result)

process_items(range(10))
```

## Using pdb.set_trace() vs breakpoint()

```python
import pdb

# Old way (Python < 3.7)
def old_style():
    x = 10
    pdb.set_trace()  # Works but verbose
    return x

# New way (Python 3.7+)
def new_style():
    x = 10
    breakpoint()  # Cleaner, configurable
    return x

# breakpoint() can be disabled with:
# PYTHONBREAKPOINT=0 python script.py
```

## Debugging Loops

```python
def find_bug():
    data = [1, 2, 3, 4, 5]
    
    for i, value in enumerate(data):
        result = value * 2
        
        # Only break when bug occurs
        if result > 6:
            breakpoint()
            # (Pdb) p i       # 3
            # (Pdb) p value   # 4
            # (Pdb) p result  # 8
        
        print(result)

find_bug()
```

## Examining Stack Trace

```python
def level1(x):
    return level2(x + 1)

def level2(x):
    return level3(x + 1)

def level3(x):
    breakpoint()
    return x * 2

level1(10)

# In pdb:
# (Pdb) w          # Show where we are
# Stack trace shows:
#   level1(10)
#   -> level2(11)
#     -> level3(12)
#       -> breakpoint()

# (Pdb) u          # Up one level (to level2)
# (Pdb) p x        # 11 (level2's x)
# (Pdb) d          # Down one level (back to level3)
# (Pdb) p x        # 12 (level3's x)
```

## Post-Mortem Debugging

```python
import pdb

def buggy_function():
    x = 10
    y = 0
    result = x / y  # Causes error
    return result

# Run with automatic post-mortem on error:
try:
    buggy_function()
except:
    pdb.post_mortem()
    # Enters debugger at point of error
    # (Pdb) p x  # 10
    # (Pdb) p y  # 0
```

## Debugging with List Comprehensions

```python
def process_numbers():
    numbers = [1, 2, 3, 4, 5]
    
    # Can't put breakpoint in comprehension
    # results = [x * 2 for x in numbers if breakpoint()]  # NO!
    
    # Use regular loop for debugging
    results = []
    for x in numbers:
        breakpoint()  # YES!
        result = x * 2
        results.append(result)
    
    return results
```

## Practical Debugging Example

```python
class BankAccount:
    def __init__(self, balance):
        self.balance = balance
        self.transactions = []
    
    def deposit(self, amount):
        breakpoint()  # Debug deposit
        self.balance += amount
        self.transactions.append(f"Deposit: ${amount}")
    
    def withdraw(self, amount):
        if amount > self.balance:
            print("Insufficient funds")
            return False
        
        breakpoint()  # Debug withdraw
        self.balance -= amount
        self.transactions.append(f"Withdraw: ${amount}")
        return True

account = BankAccount(100)
account.deposit(50)
account.withdraw(30)

# In debugger, can inspect:
# (Pdb) p self.balance
# (Pdb) p self.transactions
# (Pdb) p amount
```

## Common pdb Workflows

```python
# Workflow 1: Find where variable changes
def track_variable():
    x = 0
    x = calculate_a()  # Does it change here?
    breakpoint()
    x = calculate_b()  # Or here?
    return x

# Workflow 2: Understand function flow
def complex_logic():
    breakpoint()  # Start at beginning
    # Step through with 'n' to understand flow
    
# Workflow 3: Inspect data structures
def process_complex_data():
    data = get_complex_data()
    breakpoint()
    # Use 'pp data' to pretty-print structure
```

## Summary

**Essential pdb Commands:**
- `l` (list): Show code
- `n` (next): Next line
- `s` (step): Step into function
- `c` (continue): Resume execution
- `p var`: Print variable
- `w`: Show stack trace
- `q`: Quit debugger

**Debugging Workflow:**
1. Add `breakpoint()` where bug likely is
2. Run code to trigger breakpoint
3. Inspect variables with `p`
4. Step through with `n` or `s`
5. Continue with `c` or quit with `q`

**Pro Tips:**
- Use `breakpoint()` (Python 3.7+)
- Disable with `PYTHONBREAKPOINT=0`
- Use conditional breakpoints
- Inspect stack with `w`, `u`, `d`
- Post-mortem debugging for crashes

## Next Steps

Next, you'll learn common Python error patterns and how to fix them.

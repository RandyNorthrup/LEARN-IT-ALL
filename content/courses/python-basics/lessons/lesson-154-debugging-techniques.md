---
id: debugging-techniques
title: Debugging Techniques
chapterId: ch12-testing
order: 2
duration: 30
objectives:
  - Master print debugging
  - Understand common error types
  - Learn how to read stack traces
  - Use systematic debugging strategies
---

# Debugging Techniques

Debugging is finding and fixing errors in code. Mastering debugging makes you a more efficient programmer.

## Types of Errors

### 1. Syntax Errors

Code won't run - Python can't understand it:

```python
# ❌ Syntax errors
# print("Hello"  # Missing closing parenthesis
# if x = 10:     # Should be == not =
# def func(:      # Invalid syntax
```

Fix: Read the error message, check the line number.

### 2. Runtime Errors

Code runs but crashes during execution:

```python
# ❌ Runtime errors
# 10 / 0              # ZeroDivisionError
# int("hello")        # ValueError
# items[100]          # IndexError
# user["age"]         # KeyError (if key doesn't exist)
```

Fix: Handle with try-except or fix the logic.

### 3. Logic Errors

Code runs but produces wrong results:

```python
# ❌ Logic error - calculates area instead of perimeter
def calculate_perimeter(length, width):
    return length * width  # Should be 2 * (length + width)

print(calculate_perimeter(5, 3))  # 15 (wrong!) should be 16
```

Fix: Test thoroughly, use debugging techniques.

## Reading Stack Traces

Stack traces show where errors occur:

```python
def divide(a, b):
    return a / b

def calculate(x, y):
    result = divide(x, y)
    return result

calculate(10, 0)
```

Error output:
```
Traceback (most recent call last):
  File "test.py", line 7, in <module>
    calculate(10, 0)
  File "test.py", line 4, in calculate
    result = divide(x, y)
  File "test.py", line 2, in divide
    return a / b
ZeroDivisionError: division by zero
```

Read from **bottom to top**:
1. Error type and message at bottom
2. Line where error occurred
3. Call stack showing how you got there

## Print Debugging

The most common debugging technique:

```python
def calculate_average(numbers):
    print(f"Input: {numbers}")  # Debug print
    
    total = sum(numbers)
    print(f"Total: {total}")  # Debug print
    
    count = len(numbers)
    print(f"Count: {count}")  # Debug print
    
    average = total / count
    print(f"Average: {average}")  # Debug print
    
    return average

result = calculate_average([10, 20, 30])
# Input: [10, 20, 30]
# Total: 60
# Count: 3
# Average: 20.0
```

### Strategic Print Placement

```python
def process_data(items):
    print(f"START: items = {items}")  # Entry point
    
    # Step 1
    filtered = [x for x in items if x > 0]
    print(f"After filter: {filtered}")
    
    # Step 2
    doubled = [x * 2 for x in filtered]
    print(f"After doubling: {doubled}")
    
    # Step 3
    result = sum(doubled)
    print(f"RETURN: result = {result}")  # Exit point
    
    return result
```

## Debugging Variables

Check variable values at different points:

```python
def calculate_discount(price, discount_percent):
    print(f"price = {price}, type = {type(price)}")
    print(f"discount_percent = {discount_percent}, type = {type(discount_percent)}")
    
    discount_amount = price * (discount_percent / 100)
    print(f"discount_amount = {discount_amount}")
    
    final_price = price - discount_amount
    print(f"final_price = {final_price}")
    
    return final_price

result = calculate_discount(100, 20)
# price = 100, type = <class 'int'>
# discount_percent = 20, type = <class 'int'>
# discount_amount = 20.0
# final_price = 80.0
```

## Debugging Loops

Print iteration information:

```python
def find_max(numbers):
    max_val = numbers[0]
    
    for i, num in enumerate(numbers):
        print(f"Iteration {i}: num = {num}, current max = {max_val}")
        
        if num > max_val:
            max_val = num
            print(f"  → New max: {max_val}")
    
    return max_val

result = find_max([3, 7, 2, 9, 5])
# Iteration 0: num = 3, current max = 3
# Iteration 1: num = 7, current max = 3
#   → New max: 7
# Iteration 2: num = 2, current max = 7
# Iteration 3: num = 9, current max = 7
#   → New max: 9
# Iteration 4: num = 5, current max = 9
```

## Common Bug Patterns

### Bug 1: Off-by-One Errors

```python
# ❌ Wrong - misses last element
def sum_list(numbers):
    total = 0
    for i in range(len(numbers) - 1):  # Should be len(numbers)
        total += numbers[i]
    return total

print(sum_list([1, 2, 3, 4, 5]))  # 10, should be 15

# ✅ Fixed
def sum_list_fixed(numbers):
    total = 0
    for i in range(len(numbers)):
        total += numbers[i]
    return total
```

### Bug 2: Mutating Defaults

```python
# ❌ Bug - default list is shared!
def add_item(item, items=[]):
    items.append(item)
    return items

print(add_item(1))  # [1]
print(add_item(2))  # [1, 2] - unexpected!

# ✅ Fixed
def add_item_fixed(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items
```

### Bug 3: Integer Division

```python
# ❌ Python 3 - no issue, but good to be aware
def calculate_average_wrong(numbers):
    return sum(numbers) / len(numbers)  # Float division (correct)

# In Python 2, this would be integer division
# In Python 3, always use / for float division
# Use // for integer division explicitly
```

### Bug 4: Variable Scope

```python
# ❌ Bug - forgot to return
def multiply(a, b):
    result = a * b
    # Missing return!

x = multiply(5, 3)
print(x)  # None

# ✅ Fixed
def multiply_fixed(a, b):
    result = a * b
    return result
```

## Systematic Debugging Process

### Step 1: Reproduce the Bug

```python
def process_user(name, age):
    # Bug: crashes with certain inputs
    return f"{name.upper()} is {age} years old"

# Reproduce
# process_user(None, 25)  # Crashes!
```

### Step 2: Isolate the Problem

```python
def process_user_debug(name, age):
    print(f"Input: name={name}, age={age}")
    
    print(f"About to call name.upper()")
    name_upper = name.upper()  # Crash happens here
    
    print(f"Creating message")
    message = f"{name_upper} is {age} years old"
    
    return message
```

### Step 3: Form Hypothesis

"The bug happens when `name` is `None` because `None` has no `.upper()` method"

### Step 4: Test Hypothesis

```python
def process_user_fixed(name, age):
    if name is None:
        print("name is None!")  # Hypothesis confirmed
        return "Unknown is {age} years old"
    
    return f"{name.upper()} is {age} years old"
```

### Step 5: Fix and Verify

```python
def process_user_final(name, age):
    if name is None:
        name = "Unknown"
    return f"{name.upper()} is {age} years old"

# Test
assert process_user_final("Alice", 25) == "ALICE is 25 years old"
assert process_user_final(None, 25) == "UNKNOWN is 25 years old"
print("✓ Tests passed")
```

## Practical Debugging Examples

### Example 1: Shopping Cart Bug

```python
# Bug: total is always wrong
def calculate_total_buggy(items):
    total = 0
    for item in items:
        total + item["price"]  # Bug: missing =
    return total

# Debug
def calculate_total_debug(items):
    total = 0
    print(f"Initial total: {total}")
    
    for i, item in enumerate(items):
        print(f"Iteration {i}: item = {item}")
        print(f"  Before: total = {total}")
        total + item["price"]  # This line doesn't change total!
        print(f"  After: total = {total}")  # Still 0!
    
    return total

items = [{"name": "Apple", "price": 1.50}, {"name": "Banana", "price": 0.75}]
# calculate_total_debug(items)  # Shows total never changes

# Fix
def calculate_total_fixed(items):
    total = 0
    for item in items:
        total += item["price"]  # Added =
    return total
```

### Example 2: Password Validator Bug

```python
# Bug: returns wrong result
def is_strong_password_buggy(password):
    has_upper = False
    has_lower = False
    has_digit = False
    
    for char in password:
        if char.isupper():
            has_upper = True
        if char.islower():
            has_lower = True
        if char.isdigit():
            has_digit = True
    
    return has_upper and has_lower or has_digit  # Bug: operator precedence

# Debug
print(is_strong_password_buggy("HELLO123"))  # True - wrong!
print(is_strong_password_buggy("hello"))     # False - correct

# Add parentheses
def is_strong_password_debug(password):
    has_upper = False
    has_lower = False
    has_digit = False
    
    for char in password:
        if char.isupper():
            has_upper = True
        if char.islower():
            has_lower = True
        if char.isdigit():
            has_digit = True
    
    print(f"has_upper: {has_upper}, has_lower: {has_lower}, has_digit: {has_digit}")
    result = has_upper and has_lower or has_digit
    print(f"Result: {result}")
    return result

# is_strong_password_debug("HELLO123")
# has_upper: True, has_lower: False, has_digit: True
# Result: True (wrong because False or True = True)

# Fix
def is_strong_password_fixed(password):
    has_upper = any(c.isupper() for c in password)
    has_lower = any(c.islower() for c in password)
    has_digit = any(c.isdigit() for c in password)
    
    return has_upper and has_lower and has_digit  # All required
```

### Example 3: List Modification Bug

```python
# Bug: removes wrong items
def remove_evens_buggy(numbers):
    for num in numbers:
        if num % 2 == 0:
            numbers.remove(num)  # Bug: modifying while iterating
    return numbers

# Debug
def remove_evens_debug(numbers):
    print(f"Start: {numbers}")
    for i, num in enumerate(numbers):
        print(f"  Index {i}: num = {num}")
        if num % 2 == 0:
            print(f"    Removing {num}")
            numbers.remove(num)
            print(f"    List now: {numbers}")
    return numbers

# remove_evens_debug([1, 2, 3, 4, 5, 6])
# Skips some numbers because indices shift!

# Fix 1: Iterate backwards
def remove_evens_fixed1(numbers):
    for i in range(len(numbers) - 1, -1, -1):
        if numbers[i] % 2 == 0:
            numbers.pop(i)
    return numbers

# Fix 2: Create new list
def remove_evens_fixed2(numbers):
    return [num for num in numbers if num % 2 != 0]
```

## Debugging Tips

1. **Read error messages carefully** - they tell you what's wrong
2. **Add print statements** at key points
3. **Check variable types** - use `type(variable)`
4. **Test with simple inputs** first
5. **Isolate the problem** - comment out code sections
6. **Use descriptive variable names** - easier to debug
7. **Take breaks** - fresh eyes spot bugs faster

## Key Takeaways

- **Three error types**: Syntax, Runtime, Logic
- **Read stack traces** from bottom to top
- **Print debugging** is powerful and simple
- Follow **systematic debugging process**
- Test **edge cases** to find bugs
- Common bugs: off-by-one, mutable defaults, missing returns
- **Isolate** problems to find root cause

## What's Next?

You've mastered debugging! Next, we'll explore **how computers work** at a fundamental level.

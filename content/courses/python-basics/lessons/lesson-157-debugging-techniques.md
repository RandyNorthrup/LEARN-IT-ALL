---
id: 64-debugging-techniques
title: Debugging Techniques
chapterId: ch12-testing
order: 5
duration: 25
objectives:
  - Learn effective debugging strategies
  - Use print debugging wisely
  - Apply rubber duck debugging
  - Use logging for debugging
  - Master debugging workflows
---

# Debugging Techniques

## Introduction

Debugging is the process of finding and fixing bugs in code. Effective debugging combines systematic approaches with the right tools.

## Print Debugging

```python
def calculate_total(prices):
    total = 0
    for price in prices:
        print(f"Processing price: {price}")  # Debug print
        total += price
    print(f"Final total: {total}")  # Debug print
    return total

result = calculate_total([10, 20, 30])
# Processing price: 10
# Processing price: 20
# Processing price: 30
# Final total: 60
```

## Strategic Print Debugging

```python
def process_data(data):
    print(f"[DEBUG] Input data: {data}")  # Mark debug prints
    print(f"[DEBUG] Type: {type(data)}")
    
    result = []
    for i, item in enumerate(data):
        print(f"[DEBUG] Processing item {i}: {item}")
        processed = item * 2
        result.append(processed)
    
    print(f"[DEBUG] Result: {result}")
    return result

process_data([1, 2, 3])
```

## Variable State Inspection

```python
def find_bug():
    numbers = [1, 2, 3, 4, 5]
    target = 3
    
    # Print all relevant variables
    print(f"numbers = {numbers}")
    print(f"target = {target}")
    print(f"length = {len(numbers)}")
    
    for i, num in enumerate(numbers):
        print(f"Checking index {i}: {num} == {target}? {num == target}")
        if num == target:
            return i
    return -1

index = find_bug()
print(f"Found at index: {index}")
```

## Using Assertions for Assumptions

```python
def calculate_average(numbers):
    # Assert assumptions to catch bugs early
    assert len(numbers) > 0, "List cannot be empty"
    assert all(isinstance(n, (int, float)) for n in numbers), "All items must be numbers"
    
    total = sum(numbers)
    count = len(numbers)
    average = total / count
    
    # Assert post-conditions
    assert average >= min(numbers), "Average should be >= minimum"
    assert average <= max(numbers), "Average should be <= maximum"
    
    return average

print(calculate_average([1, 2, 3, 4, 5]))  # 3.0
# print(calculate_average([]))  # AssertionError!
```

## Logging for Debugging

```python
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG, format='%(levelname)s: %(message)s')

def process_user(user_data):
    logging.debug(f"Processing user: {user_data}")
    
    if 'email' not in user_data:
        logging.error("Missing email field")
        return False
    
    logging.info(f"User email: {user_data['email']}")
    
    # Process user...
    logging.debug("User processed successfully")
    return True

process_user({'name': 'Alice', 'email': 'alice@example.com'})
# DEBUG: Processing user: {'name': 'Alice', 'email': 'alice@example.com'}
# INFO: User email: alice@example.com
# DEBUG: User processed successfully
```

## Rubber Duck Debugging

```python
# Explain your code line by line to find bugs

def buggy_function(data):
    # "I'm creating an empty result list"
    result = []
    
    # "I'm looping through each item"
    for item in data:
        # "I'm checking if item is even"
        if item % 2 = 0:  # BUG! Should be == not =
            # "I'm adding it to result"
            result.append(item)
    
    # "I'm returning the result"
    return result

# Explaining the condition reveals the bug!
```

## Binary Search Debugging

```python
def long_function():
    # Comment out half of the code to isolate bug
    
    step1 = do_step_1()  # Works
    step2 = do_step_2()  # Works
    step3 = do_step_3()  # Bug is here!
    # step4 = do_step_4()
    # step5 = do_step_5()
    
    return result

# By commenting out the second half, we isolated the bug to step 3
```

## Debugging with Type Checking

```python
def safe_divide(a, b):
    # Type check arguments
    print(f"Type of a: {type(a)}, value: {a}")
    print(f"Type of b: {type(b)}, value: {b}")
    
    if not isinstance(a, (int, float)):
        raise TypeError(f"a must be numeric, got {type(a)}")
    if not isinstance(b, (int, float)):
        raise TypeError(f"b must be numeric, got {type(b)}")
    if b == 0:
        raise ValueError("Cannot divide by zero")
    
    return a / b

# safe_divide("10", 2)  # Reveals type error!
```

## Debugging Loops

```python
def debug_loop():
    data = [1, 2, 3, 4, 5]
    
    for i, value in enumerate(data):
        # Print loop state
        print(f"\nIteration {i}:")
        print(f"  Current value: {value}")
        print(f"  Remaining items: {len(data) - i - 1}")
        
        # Your logic here
        result = value * 2
        print(f"  Result: {result}")

debug_loop()
```

## Debugging Conditionals

```python
def check_eligibility(age, has_license, years_experience):
    print(f"\nChecking eligibility:")
    print(f"  age = {age} (>= 18? {age >= 18})")
    print(f"  has_license = {has_license}")
    print(f"  years_experience = {years_experience} (>= 2? {years_experience >= 2})")
    
    if age >= 18:
        print("  ✓ Age check passed")
        if has_license:
            print("  ✓ License check passed")
            if years_experience >= 2:
                print("  ✓ Experience check passed")
                return True
            else:
                print("  ✗ Experience check failed")
        else:
            print("  ✗ License check failed")
    else:
        print("  ✗ Age check failed")
    
    return False

check_eligibility(20, True, 1)
```

## Stack Trace Analysis

```python
def level1():
    level2()

def level2():
    level3()

def level3():
    buggy_operation()

def buggy_operation():
    result = 10 / 0  # Causes error
    return result

try:
    level1()
except ZeroDivisionError as e:
    print("Error occurred!")
    import traceback
    traceback.print_exc()
    # Shows: level1() -> level2() -> level3() -> buggy_operation()
```

## Summary

**Debugging Techniques:**
- **Print debugging**: Add strategic print statements
- **Assertions**: Validate assumptions
- **Logging**: Use logging module for production
- **Rubber duck**: Explain code to find bugs
- **Binary search**: Comment out half to isolate
- **Type checking**: Verify data types
- **Stack traces**: Read error traces carefully

**Best Practices:**
- Start with simplest explanation
- Change one thing at a time
- Use version control to track changes
- Take breaks when stuck
- Ask for help when needed

## Next Steps

Next, you'll learn the pdb debugger for interactive debugging.

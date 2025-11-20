---
id: unit-testing-basics
title: Unit Testing Basics
chapterId: ch12-testing
order: 1
duration: 30
objectives:
  - Understand what unit tests are
  - Write basic test cases
  - Use assert statements effectively
  - Learn test-driven development basics
---

# Unit Testing Basics

Unit tests verify that individual pieces of code work correctly. They help catch bugs early and make code more reliable.

## What is Unit Testing?

Unit testing means testing small "units" of code (functions, methods) in isolation:

```python
def add(a, b):
    return a + b

# Test the function
assert add(2, 3) == 5
assert add(0, 0) == 0
assert add(-1, 1) == 0
print("All tests passed!")
```

## Why Write Tests?

1. **Catch bugs early** - Find problems before users do
2. **Prevent regressions** - Ensure fixes don't break other code
3. **Document behavior** - Tests show how code should work
4. **Enable refactoring** - Change code confidently
5. **Improve design** - Testable code is usually better code

## The assert Statement

`assert` checks if a condition is True:

```python
x = 10
assert x == 10  # Passes (no error)
assert x > 5    # Passes
# assert x == 20  # Fails - raises AssertionError
```

Assert with error messages:

```python
def divide(a, b):
    assert b != 0, "Cannot divide by zero"
    return a / b

result = divide(10, 2)  # OK
# divide(10, 0)  # AssertionError: Cannot divide by zero
```

## Writing Test Cases

Test different scenarios:

```python
def is_even(n):
    return n % 2 == 0

# Test positive numbers
assert is_even(2) == True
assert is_even(3) == False
assert is_even(4) == True

# Test zero
assert is_even(0) == True

# Test negative numbers
assert is_even(-2) == True
assert is_even(-3) == False

print("All is_even tests passed!")
```

## Test Edge Cases

Always test boundary conditions:

```python
def get_grade(score):
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    elif score >= 60:
        return "D"
    else:
        return "F"

# Test boundaries
assert get_grade(100) == "A"  # Maximum
assert get_grade(90) == "A"   # Boundary
assert get_grade(89) == "B"   # Just below boundary
assert get_grade(80) == "B"   # Boundary
assert get_grade(70) == "C"
assert get_grade(60) == "D"
assert get_grade(59) == "F"
assert get_grade(0) == "F"    # Minimum

print("All grade tests passed!")
```

## Testing Return Values

```python
def calculate_area(length, width):
    return length * width

# Test normal cases
assert calculate_area(5, 3) == 15
assert calculate_area(10, 10) == 100

# Test edge cases
assert calculate_area(0, 5) == 0
assert calculate_area(5, 0) == 0
assert calculate_area(1, 1) == 1

print("Area tests passed!")
```

## Testing Multiple Outputs

```python
def get_min_max(numbers):
    return min(numbers), max(numbers)

# Test with tuple unpacking
min_val, max_val = get_min_max([1, 5, 3, 9, 2])
assert min_val == 1
assert max_val == 9

# Test edge case - single element
min_val, max_val = get_min_max([5])
assert min_val == 5
assert max_val == 5

print("Min/max tests passed!")
```

## Testing Exceptions

Test that functions raise errors when they should:

```python
def get_first_element(items):
    if not items:
        raise ValueError("List is empty")
    return items[0]

# Test normal case
assert get_first_element([1, 2, 3]) == 1

# Test exception
try:
    get_first_element([])
    assert False, "Should have raised ValueError"
except ValueError as e:
    assert str(e) == "List is empty"

print("Exception tests passed!")
```

## Organizing Tests

Group related tests:

```python
def test_addition():
    assert 1 + 1 == 2
    assert 2 + 3 == 5
    assert -1 + 1 == 0
    print("✓ Addition tests passed")

def test_subtraction():
    assert 5 - 3 == 2
    assert 10 - 5 == 5
    assert 0 - 5 == -5
    print("✓ Subtraction tests passed")

def run_all_tests():
    test_addition()
    test_subtraction()
    print("\n✅ All tests passed!")

run_all_tests()
```

## Test-Driven Development (TDD)

Write tests BEFORE writing code:

### Step 1: Write the test

```python
def test_multiply():
    assert multiply(2, 3) == 6
    assert multiply(5, 0) == 0
    assert multiply(-2, 3) == -6
```

### Step 2: Run test (it fails - function doesn't exist)

### Step 3: Write minimal code to pass

```python
def multiply(a, b):
    return a * b
```

### Step 4: Run test again (it passes!)

## Practical Examples

### Example 1: Password Validator

```python
def is_valid_password(password):
    if len(password) < 8:
        return False
    if not any(c.isupper() for c in password):
        return False
    if not any(c.isdigit() for c in password):
        return False
    return True

def test_password_validator():
    # Test minimum length
    assert is_valid_password("Short1") == False
    
    # Test missing uppercase
    assert is_valid_password("lowercase123") == False
    
    # Test missing number
    assert is_valid_password("NoNumbers") == False
    
    # Test valid passwords
    assert is_valid_password("ValidPass1") == True
    assert is_valid_password("AnotherGood123") == True
    
    print("✓ Password validator tests passed")

test_password_validator()
```

### Example 2: Temperature Converter

```python
def celsius_to_fahrenheit(celsius):
    return (celsius * 9/5) + 32

def test_temperature_converter():
    # Test known conversions
    assert celsius_to_fahrenheit(0) == 32
    assert celsius_to_fahrenheit(100) == 212
    assert celsius_to_fahrenheit(-40) == -40
    
    # Test precision (within 0.01)
    result = celsius_to_fahrenheit(37)
    assert abs(result - 98.6) < 0.01
    
    print("✓ Temperature converter tests passed")

test_temperature_converter()
```

### Example 3: Shopping Cart

```python
def calculate_total(items):
    """Calculate total with 10% discount if total > 100"""
    subtotal = sum(items)
    if subtotal > 100:
        return subtotal * 0.9  # 10% discount
    return subtotal

def test_shopping_cart():
    # Test no discount
    assert calculate_total([10, 20, 30]) == 60
    assert calculate_total([50, 50]) == 100
    
    # Test with discount
    assert calculate_total([60, 60]) == 108  # 120 * 0.9
    assert calculate_total([100, 50]) == 135  # 150 * 0.9
    
    # Test edge cases
    assert calculate_total([]) == 0
    assert calculate_total([0]) == 0
    
    print("✓ Shopping cart tests passed")

test_shopping_cart()
```

### Example 4: List Operations

```python
def remove_duplicates(items):
    """Remove duplicates while preserving order"""
    seen = set()
    result = []
    for item in items:
        if item not in seen:
            seen.add(item)
            result.append(item)
    return result

def test_remove_duplicates():
    # Test with duplicates
    assert remove_duplicates([1, 2, 2, 3, 1, 4]) == [1, 2, 3, 4]
    assert remove_duplicates(["a", "b", "a", "c"]) == ["a", "b", "c"]
    
    # Test no duplicates
    assert remove_duplicates([1, 2, 3]) == [1, 2, 3]
    
    # Test all duplicates
    assert remove_duplicates([1, 1, 1]) == [1]
    
    # Test empty list
    assert remove_duplicates([]) == []
    
    print("✓ Remove duplicates tests passed")

test_remove_duplicates()
```

## Testing Best Practices

### 1. Test One Thing at a Time

```python
# ❌ Bad - tests too much
def test_everything():
    assert add(1, 1) == 2
    assert subtract(5, 3) == 2
    assert multiply(2, 3) == 6
    # Hard to know what failed

# ✅ Good - separate tests
def test_add():
    assert add(1, 1) == 2

def test_subtract():
    assert subtract(5, 3) == 2
```

### 2. Use Descriptive Test Names

```python
# ❌ Bad
def test1():
    assert calculate_discount(100, 0.1) == 90

# ✅ Good
def test_calculate_discount_with_10_percent():
    assert calculate_discount(100, 0.1) == 90
```

### 3. Test Happy Path and Edge Cases

```python
def test_divide():
    # Happy path
    assert divide(10, 2) == 5
    assert divide(9, 3) == 3
    
    # Edge cases
    assert divide(0, 5) == 0
    assert divide(5, 1) == 5
    
    # Error cases
    try:
        divide(5, 0)
        assert False, "Should raise error"
    except ZeroDivisionError:
        pass
```

## Common Testing Mistakes

### Mistake 1: Not Testing Edge Cases

```python
# ❌ Incomplete tests
def test_get_first():
    assert get_first([1, 2, 3]) == 1
    # Missing: empty list test!

# ✅ Complete tests
def test_get_first_complete():
    assert get_first([1, 2, 3]) == 1
    assert get_first([5]) == 5
    try:
        get_first([])
        assert False
    except IndexError:
        pass
```

### Mistake 2: Testing Implementation, Not Behavior

```python
# ❌ Tests implementation detail
def test_sort_uses_quicksort():
    # Don't test HOW it sorts
    pass

# ✅ Tests behavior
def test_sort_returns_ascending_order():
    assert sort([3, 1, 2]) == [1, 2, 3]
```

## Key Takeaways

- **Unit tests** verify individual functions work correctly
- Use **assert** to check conditions
- Test **happy paths**, **edge cases**, and **error cases**
- Write tests **before or alongside** code (TDD)
- Tests are **documentation** showing how code should work
- **One test** should test **one behavior**
- Use descriptive test names

## What's Next?

You've learned unit testing basics! Next, we'll explore **debugging techniques** to find and fix bugs.

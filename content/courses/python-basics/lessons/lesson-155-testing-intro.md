---
id: 62-testing-intro
title: Introduction to Testing
chapterId: ch12-testing
order: 3
duration: 25
objectives:
  - Understand why testing matters
  - Learn testing terminology
  - Write basic assertions
  - Create simple test cases
  - Understand test-driven development
---

# Introduction to Testing

## Introduction

Testing ensures your code works correctly and continues to work as you make changes. Good tests catch bugs early and document how code should behave.

## Why Test?

```python
# Without tests, bugs hide
def calculate_discount(price, discount_percent):
    return price - (price * discount_percent / 100)

# Looks correct, but what about edge cases?
print(calculate_discount(100, 10))  # 90.0 ✓
print(calculate_discount(100, 0))   # 100.0 ✓
print(calculate_discount(100, 150)) # -50.0 ❌ Negative price!
print(calculate_discount(-50, 10))  # -45.0 ❌ Negative input!
```

## Basic Assertions

```python
# assert statement checks if condition is True
def add(a, b):
    return a + b

# Simple test
assert add(2, 3) == 5  # Passes
assert add(0, 0) == 0  # Passes
# assert add(1, 1) == 3  # AssertionError!

print("All tests passed!")
```

## Writing Test Functions

```python
def test_addition():
    """Test basic addition."""
    assert 2 + 2 == 4
    assert 1 + 1 == 2
    assert 0 + 0 == 0
    print("✓ test_addition passed")

def test_subtraction():
    """Test basic subtraction."""
    assert 5 - 3 == 2
    assert 10 - 10 == 0
    print("✓ test_subtraction passed")

# Run tests
test_addition()
test_subtraction()
```

## Testing with Custom Messages

```python
def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

def test_divide():
    # Test normal operation
    assert divide(10, 2) == 5, "10 / 2 should equal 5"
    assert divide(9, 3) == 3, "9 / 3 should equal 3"
    
    # Test error case
    try:
        divide(10, 0)
        assert False, "Should have raised ValueError"
    except ValueError as e:
        assert str(e) == "Cannot divide by zero"
    
    print("✓ test_divide passed")

test_divide()
```

## Testing Edge Cases

```python
def is_palindrome(text):
    """Check if text is a palindrome."""
    cleaned = text.replace(" ", "").lower()
    return cleaned == cleaned[::-1]

def test_is_palindrome():
    # Normal cases
    assert is_palindrome("racecar") == True
    assert is_palindrome("hello") == False
    
    # Edge cases
    assert is_palindrome("") == True  # Empty string
    assert is_palindrome("a") == True  # Single character
    assert is_palindrome("A") == True  # Case insensitive
    assert is_palindrome("A man a plan a canal Panama") == True
    
    print("✓ test_is_palindrome passed")

test_is_palindrome()
```

## Test Organization

```python
# group_operations.py
def calculate_average(numbers):
    """Calculate average of a list of numbers."""
    if not numbers:
        return 0
    return sum(numbers) / len(numbers)

def find_max(numbers):
    """Find maximum number in list."""
    if not numbers:
        return None
    return max(numbers)

# test_group_operations.py
def test_calculate_average():
    """Test average calculation."""
    # Normal cases
    assert calculate_average([1, 2, 3, 4, 5]) == 3.0
    assert calculate_average([10, 20]) == 15.0
    
    # Edge cases
    assert calculate_average([]) == 0
    assert calculate_average([5]) == 5.0
    
    # Negative numbers
    assert calculate_average([-5, 5]) == 0
    
    print("✓ test_calculate_average passed")

def test_find_max():
    """Test finding maximum."""
    assert find_max([1, 2, 3, 4, 5]) == 5
    assert find_max([5, 4, 3, 2, 1]) == 5
    assert find_max([1]) == 1
    assert find_max([]) is None
    assert find_max([-5, -1, -10]) == -1
    
    print("✓ test_find_max passed")

def run_all_tests():
    """Run all tests."""
    test_calculate_average()
    test_find_max()
    print("\n✓ All tests passed!")

run_all_tests()
```

## Test-Driven Development (TDD)

```python
# Step 1: Write the test first (it will fail)
def test_multiply():
    assert multiply(2, 3) == 6
    assert multiply(0, 5) == 0
    assert multiply(-2, 3) == -6
    print("✓ test_multiply passed")

# Step 2: Write minimum code to pass test
def multiply(a, b):
    return a * b

# Step 3: Run test
test_multiply()

# Step 4: Refactor if needed (test should still pass)
```

## Testing Function Behavior

```python
def validate_email(email):
    """Validate email format."""
    if not email or "@" not in email:
        return False
    
    parts = email.split("@")
    if len(parts) != 2:
        return False
    
    username, domain = parts
    if not username or not domain or "." not in domain:
        return False
    
    return True

def test_validate_email():
    # Valid emails
    assert validate_email("user@example.com") == True
    assert validate_email("test.user@domain.co.uk") == True
    
    # Invalid emails
    assert validate_email("") == False
    assert validate_email("notanemail") == False
    assert validate_email("@example.com") == False
    assert validate_email("user@") == False
    assert validate_email("user@domain") == False
    assert validate_email("user@@example.com") == False
    
    print("✓ test_validate_email passed")

test_validate_email()
```

## Testing Return Values vs Side Effects

```python
# Function with return value
def calculate_tax(amount, rate):
    return amount * rate

def test_calculate_tax():
    assert calculate_tax(100, 0.1) == 10.0
    assert calculate_tax(0, 0.1) == 0
    print("✓ test_calculate_tax passed")

# Function with side effects
class BankAccount:
    def __init__(self, balance=0):
        self.balance = balance
        self.transactions = []
    
    def deposit(self, amount):
        self.balance += amount
        self.transactions.append(f"Deposit: {amount}")

def test_bank_account():
    account = BankAccount(100)
    
    # Test initial state
    assert account.balance == 100
    assert len(account.transactions) == 0
    
    # Test deposit
    account.deposit(50)
    assert account.balance == 150
    assert len(account.transactions) == 1
    assert "Deposit: 50" in account.transactions[0]
    
    print("✓ test_bank_account passed")

test_calculate_tax()
test_bank_account()
```

## Common Testing Patterns

```python
# Pattern 1: Arrange-Act-Assert (AAA)
def test_shopping_cart():
    # Arrange: Set up test data
    cart = []
    item = {"name": "Book", "price": 10}
    
    # Act: Perform the action
    cart.append(item)
    
    # Assert: Check the result
    assert len(cart) == 1
    assert cart[0]["name"] == "Book"
    print("✓ test_shopping_cart passed")

# Pattern 2: Given-When-Then
def test_user_login():
    # Given: A user with credentials
    username = "alice"
    password = "secret123"
    
    # When: User attempts to login
    result = authenticate(username, password)
    
    # Then: Login succeeds
    assert result == True
    print("✓ test_user_login passed")

def authenticate(username, password):
    # Simple mock authentication
    return username == "alice" and password == "secret123"

test_shopping_cart()
test_user_login()
```

## Creating a Simple Test Runner

```python
def run_tests(*test_functions):
    """Run multiple test functions and report results."""
    passed = 0
    failed = 0
    
    for test_func in test_functions:
        try:
            test_func()
            passed += 1
        except AssertionError as e:
            failed += 1
            print(f"✗ {test_func.__name__} failed: {e}")
        except Exception as e:
            failed += 1
            print(f"✗ {test_func.__name__} error: {e}")
    
    print(f"\n{passed} passed, {failed} failed")
    return failed == 0

# Define tests
def test_pass():
    assert 1 + 1 == 2

def test_another_pass():
    assert "hello".upper() == "HELLO"

def test_fail():
    assert 1 + 1 == 3  # This will fail

# Run all tests
run_tests(test_pass, test_another_pass)  # Both pass
# run_tests(test_pass, test_fail)  # One fails
```

## Benefits of Testing

```python
# 1. Catch bugs early
def buggy_function(x):
    return x * 2  # Forgot to handle negative numbers

def test_buggy():
    assert buggy_function(5) == 10  # ✓
    assert buggy_function(-5) == -10  # ✓ Reveals behavior

# 2. Document behavior
def test_string_split_documentation():
    """Documents how split() handles different inputs."""
    assert "a,b,c".split(",") == ["a", "b", "c"]
    assert "a".split(",") == ["a"]
    assert "".split(",") == [""]

# 3. Enable refactoring
def slow_fibonacci(n):
    if n <= 1:
        return n
    return slow_fibonacci(n-1) + slow_fibonacci(n-2)

def test_fibonacci():
    assert slow_fibonacci(0) == 0
    assert slow_fibonacci(1) == 1
    assert slow_fibonacci(5) == 5
    assert slow_fibonacci(10) == 55

# Now we can optimize and ensure it still works
def fast_fibonacci(n):
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b

# Same tests should pass!
test_fibonacci()
```

## Summary

**Key Concepts:**
- **Testing**: Verifying code works correctly
- **Assertions**: Statements that must be true
- **Test cases**: Individual scenarios to test
- **Edge cases**: Unusual or boundary conditions
- **TDD**: Write tests before implementation

**Testing Pattern (AAA):**
1. **Arrange**: Set up test data
2. **Act**: Execute the function
3. **Assert**: Verify the result

**Benefits:**
- Catch bugs early
- Document code behavior
- Enable confident refactoring
- Improve code quality

## Next Steps

Next, you'll learn pytest, Python's most popular testing framework.

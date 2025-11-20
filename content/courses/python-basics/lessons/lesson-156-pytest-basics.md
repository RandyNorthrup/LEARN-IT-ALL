---
id: 63-pytest-basics
title: Introduction to pytest
chapterId: ch12-testing
order: 4
duration: 30
objectives:
  - Install and use pytest
  - Write pytest test functions
  - Run tests with pytest
  - Use pytest assertions
  - Organize test files
---

# Introduction to pytest

## Introduction

pytest is Python's most popular testing framework. It makes writing tests simple and powerful with clean syntax and excellent error messages.

## Installing pytest

```bash
pip install pytest
```

## Basic pytest Test

```python
# test_basics.py
def add(a, b):
    return a + b

def test_add():
    """Test addition function."""
    assert add(2, 3) == 5
    assert add(0, 0) == 0
    assert add(-1, 1) == 0
```

Run tests:
```bash
pytest test_basics.py
# Or run all tests in directory:
pytest
```

## pytest Naming Conventions

```python
# pytest discovers tests automatically:
# - Files: test_*.py or *_test.py
# - Functions: test_*()
# - Classes: Test*

# test_math_operations.py ✓
# math_test.py ✓
# my_tests.py ✗ (not discovered)

def test_multiplication():  # ✓ Discovered
    assert 2 * 3 == 6

def multiply_test():  # ✗ Not discovered
    assert 2 * 3 == 6

class TestCalculator:  # ✓ Discovered
    def test_add(self):
        assert 2 + 2 == 4
```

## Better Assertion Messages

```python
# test_strings.py
def test_string_operations():
    name = "alice"
    
    # pytest shows helpful diff on failure
    assert name.upper() == "ALICE"
    assert len(name) == 5
    assert name.startswith("a")
    assert "lic" in name
```

## Testing Exceptions

```python
# test_exceptions.py
import pytest

def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

def test_divide_by_zero():
    """Test that division by zero raises ValueError."""
    with pytest.raises(ValueError):
        divide(10, 0)
    
    with pytest.raises(ValueError, match="Cannot divide by zero"):
        divide(5, 0)

def test_divide_normal():
    """Test normal division."""
    assert divide(10, 2) == 5
    assert divide(9, 3) == 3
```

## Parametrized Tests

```python
# test_parametrize.py
import pytest

def is_even(n):
    return n % 2 == 0

@pytest.mark.parametrize("number,expected", [
    (2, True),
    (4, True),
    (1, False),
    (3, False),
    (0, True),
    (-2, True),
])
def test_is_even(number, expected):
    """Test is_even with multiple inputs."""
    assert is_even(number) == expected

# pytest runs this test 6 times with different inputs!
```

## Fixtures for Setup

```python
# test_fixtures.py
import pytest

@pytest.fixture
def sample_list():
    """Provide a sample list for tests."""
    return [1, 2, 3, 4, 5]

def test_list_length(sample_list):
    """Test uses the fixture."""
    assert len(sample_list) == 5

def test_list_sum(sample_list):
    """Another test using same fixture."""
    assert sum(sample_list) == 15

def test_list_max(sample_list):
    """Yet another test with same fixture."""
    assert max(sample_list) == 5
```

## Fixtures with Teardown

```python
# test_file_operations.py
import pytest
import os

@pytest.fixture
def temp_file():
    """Create temporary file, cleanup after test."""
    filename = "test_temp.txt"
    
    # Setup
    with open(filename, "w") as f:
        f.write("test content")
    
    yield filename  # Test runs here
    
    # Teardown
    if os.path.exists(filename):
        os.remove(filename)

def test_file_exists(temp_file):
    """Test file operations."""
    assert os.path.exists(temp_file)
    
    with open(temp_file) as f:
        content = f.read()
    
    assert content == "test content"
```

## Test Classes for Organization

```python
# test_calculator.py
import pytest

class Calculator:
    def add(self, a, b):
        return a + b
    
    def subtract(self, a, b):
        return a - b
    
    def multiply(self, a, b):
        return a * b

class TestCalculator:
    """Group related tests."""
    
    @pytest.fixture
    def calc(self):
        """Provide calculator instance."""
        return Calculator()
    
    def test_add(self, calc):
        assert calc.add(2, 3) == 5
        assert calc.add(-1, 1) == 0
    
    def test_subtract(self, calc):
        assert calc.subtract(5, 3) == 2
        assert calc.subtract(0, 5) == -5
    
    def test_multiply(self, calc):
        assert calc.multiply(2, 3) == 6
        assert calc.multiply(0, 10) == 0
```

## Marks and Test Selection

```python
# test_marks.py
import pytest

@pytest.mark.slow
def test_slow_operation():
    """This test is marked as slow."""
    import time
    time.sleep(1)
    assert True

@pytest.mark.fast
def test_fast_operation():
    """This test is marked as fast."""
    assert 1 + 1 == 2

# Run only fast tests:
# pytest -m fast

# Run only slow tests:
# pytest -m slow

# Skip tests
@pytest.mark.skip(reason="Not implemented yet")
def test_future_feature():
    assert False
```

## Testing Multiple Cases

```python
# test_validation.py
import pytest

def validate_password(password):
    """Validate password strength."""
    if len(password) < 8:
        return False, "Too short"
    if not any(c.isdigit() for c in password):
        return False, "No digit"
    if not any(c.isupper() for c in password):
        return False, "No uppercase"
    return True, "Valid"

class TestPasswordValidation:
    def test_valid_passwords(self):
        valid, msg = validate_password("Secure123")
        assert valid
        assert msg == "Valid"
    
    def test_too_short(self):
        valid, msg = validate_password("Short1")
        assert not valid
        assert msg == "Too short"
    
    def test_no_digit(self):
        valid, msg = validate_password("NoDigitPass")
        assert not valid
        assert msg == "No digit"
    
    def test_no_uppercase(self):
        valid, msg = validate_password("noupper123")
        assert not valid
        assert msg == "No uppercase"
```

## Pytest Output

```python
# test_output.py
def test_pass():
    assert True

def test_fail():
    assert 1 + 1 == 3  # Shows clear failure message

def test_verbose():
    """pytest shows detailed output."""
    data = {"name": "Alice", "age": 30}
    assert data["name"] == "Alice"
    assert data["age"] == 30

# Run with:
# pytest test_output.py -v  # Verbose
# pytest test_output.py -s  # Show print statements
```

## Practical Testing Example

```python
# shopping_cart.py
class ShoppingCart:
    def __init__(self):
        self.items = []
    
    def add_item(self, name, price, quantity=1):
        self.items.append({
            "name": name,
            "price": price,
            "quantity": quantity
        })
    
    def get_total(self):
        return sum(item["price"] * item["quantity"] for item in self.items)
    
    def get_item_count(self):
        return sum(item["quantity"] for item in self.items)

# test_shopping_cart.py
import pytest

class TestShoppingCart:
    @pytest.fixture
    def cart(self):
        """Provide fresh cart for each test."""
        return ShoppingCart()
    
    def test_empty_cart(self, cart):
        """Test empty cart."""
        assert cart.get_total() == 0
        assert cart.get_item_count() == 0
        assert len(cart.items) == 0
    
    def test_add_single_item(self, cart):
        """Test adding one item."""
        cart.add_item("Book", 10.0)
        assert cart.get_total() == 10.0
        assert cart.get_item_count() == 1
    
    def test_add_multiple_items(self, cart):
        """Test adding multiple items."""
        cart.add_item("Book", 10.0, 2)
        cart.add_item("Pen", 1.5, 3)
        
        assert cart.get_total() == 24.5  # (10*2) + (1.5*3)
        assert cart.get_item_count() == 5  # 2 + 3
    
    def test_get_total_precision(self, cart):
        """Test decimal precision."""
        cart.add_item("Item", 10.99, 3)
        assert abs(cart.get_total() - 32.97) < 0.01
```

## Test Discovery

```bash
# pytest finds tests in:
# - Current directory and subdirectories
# - Files matching test_*.py or *_test.py
# - Functions starting with test_
# - Classes starting with Test

# Project structure:
# project/
#   src/
#     calculator.py
#   tests/
#     test_calculator.py
#     test_utils.py

# Run all tests:
pytest

# Run specific file:
pytest tests/test_calculator.py

# Run specific test:
pytest tests/test_calculator.py::test_add

# Run tests matching pattern:
pytest -k "add or subtract"
```

## Common pytest Commands

```bash
# Run all tests
pytest

# Verbose output
pytest -v

# Show print statements
pytest -s

# Stop on first failure
pytest -x

# Run only failed tests from last run
pytest --lf

# Show test coverage
pytest --cov=src

# Run in parallel (requires pytest-xdist)
pytest -n 4
```

## Summary

**pytest Benefits:**
- Simple test syntax
- Automatic test discovery
- Excellent error messages
- Fixtures for setup/teardown
- Parametrized tests
- Powerful plugins

**Key Concepts:**
- Tests in `test_*.py` files
- Test functions start with `test_`
- Use `assert` statements
- Fixtures provide test data
- Marks for test organization

**Common Commands:**
- `pytest`: Run all tests
- `pytest -v`: Verbose output
- `pytest -k pattern`: Run matching tests
- `pytest --lf`: Re-run failures

## Next Steps

Next, you'll learn debugging techniques and the pdb debugger.

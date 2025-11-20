---
id: "162-test-coverage"
title: "Test Coverage and Quality"
chapterId: ch12-testing
order: 11
duration: 25
objectives:
  - Measure test coverage
  - Improve code coverage
  - Write meaningful tests
  - Identify untested code
---

# Test Coverage and Quality

Test coverage measures which parts of code are tested.

## Installing Coverage Tools

```bash
# Install coverage.py
pip install coverage pytest-cov

# Run tests with coverage
coverage run -m pytest
coverage report

# Generate HTML report
coverage html
# Open htmlcov/index.html in browser
```

## Basic Coverage Report

```python
# calculator.py
def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

# test_calculator.py
def test_add():
    assert add(2, 3) == 5

def test_subtract():
    assert subtract(5, 3) == 2

# Run: pytest --cov=calculator --cov-report=term-missing
#
# Output shows:
# calculator.py    50%    (multiply and divide not tested)
```

## Coverage with pytest-cov

```bash
# Basic coverage
pytest --cov=mymodule

# Coverage with missing lines
pytest --cov=mymodule --cov-report=term-missing

# HTML report
pytest --cov=mymodule --cov-report=html

# Fail if coverage below threshold
pytest --cov=mymodule --cov-fail-under=80

# Multiple modules
pytest --cov=module1 --cov=module2
```

## Understanding Coverage Metrics

```python
# user_service.py
class UserService:
    def __init__(self, database):
        self.database = database
    
    def get_user(self, user_id):
        # Line coverage: Is this line executed?
        user = self.database.query(user_id)
        
        # Branch coverage: Are both paths tested?
        if user:
            return user
        else:
            return None
    
    def delete_user(self, user_id):
        # Line coverage counts this as tested
        # even if we don't check the logic
        self.database.delete(user_id)

# Weak test - 100% line coverage but poor testing
def test_get_user():
    mock_db = Mock()
    mock_db.query.return_value = {"id": "user1"}
    
    service = UserService(mock_db)
    result = service.get_user("user1")
    
    # Only tests success path!
    assert result is not None

# Better test - covers both branches
def test_get_user_found():
    mock_db = Mock()
    mock_db.query.return_value = {"id": "user1"}
    
    service = UserService(mock_db)
    result = service.get_user("user1")
    assert result == {"id": "user1"}

def test_get_user_not_found():
    mock_db = Mock()
    mock_db.query.return_value = None
    
    service = UserService(mock_db)
    result = service.get_user("user1")
    assert result is None
```

## Branch Coverage

```python
# Enable branch coverage
# pytest --cov=mymodule --cov-branch

def validate_age(age):
    """Validate age with multiple branches"""
    # Branch 1: Check type
    if not isinstance(age, int):
        return False, "Age must be integer"
    
    # Branch 2: Check negative
    if age < 0:
        return False, "Age cannot be negative"
    
    # Branch 3: Check reasonable
    if age > 150:
        return False, "Age too large"
    
    # Success path
    return True, "Valid"

# Tests for all branches
def test_validate_age_not_int():
    valid, msg = validate_age("30")
    assert not valid
    assert "must be integer" in msg

def test_validate_age_negative():
    valid, msg = validate_age(-5)
    assert not valid
    assert "cannot be negative" in msg

def test_validate_age_too_large():
    valid, msg = validate_age(200)
    assert not valid
    assert "too large" in msg

def test_validate_age_valid():
    valid, msg = validate_age(30)
    assert valid
    assert msg == "Valid"

# Now have 100% branch coverage
```

## Coverage Configuration

```ini
# .coveragerc or setup.cfg
[coverage:run]
source = src/
omit =
    */tests/*
    */venv/*
    */__pycache__/*
    */site-packages/*
branch = True

[coverage:report]
precision = 2
show_missing = True
skip_covered = False

# Fail if coverage below threshold
fail_under = 80

# Ignore specific lines
exclude_lines =
    pragma: no cover
    def __repr__
    raise AssertionError
    raise NotImplementedError
    if __name__ == .__main__.:
    if TYPE_CHECKING:
    @abstract

[coverage:html]
directory = htmlcov
```

## Excluding Code from Coverage

```python
def debug_function():  # pragma: no cover
    """This function is excluded from coverage"""
    print("Debug info")

class BaseClass:
    def abstract_method(self):
        raise NotImplementedError  # Automatically excluded

def main():
    if __name__ == "__main__":  # Automatically excluded
        run_app()

# Exclude entire block
if TYPE_CHECKING:  # pragma: no cover
    from typing import Protocol
```

## Coverage Traps

```python
# ❌ BAD - High coverage, poor testing
def process_data(data):
    result = []
    for item in data:
        result.append(item * 2)
    return result

def test_process_data():
    result = process_data([1, 2, 3])
    # Only checks length, not values!
    assert len(result) == 3
# 100% coverage but doesn't verify correctness

# ✅ GOOD - Meaningful assertions
def test_process_data_correctly():
    result = process_data([1, 2, 3])
    assert result == [2, 4, 6]
    
def test_process_data_empty():
    result = process_data([])
    assert result == []

def test_process_data_negative():
    result = process_data([-1, -2])
    assert result == [-2, -4]
```

## Mutation Testing

```python
# mutation_example.py
def is_even(n):
    return n % 2 == 0

# Weak test - mutation testing would catch
def test_is_even_weak():
    assert is_even(2)  # Only tests one case

# Mutant: return n % 2 == 1
# This mutant would pass the weak test!

# Strong test - catches mutations
def test_is_even_strong():
    assert is_even(2) is True
    assert is_even(3) is False
    assert is_even(0) is True
    assert is_even(-2) is True

# Install mutmut for mutation testing
# pip install mutmut
# mutmut run
```

## Test Quality Metrics

```python
class UserValidator:
    """Example class for quality metrics"""
    
    def validate_email(self, email):
        if not email:
            return False
        if "@" not in email:
            return False
        if not email.endswith((".com", ".org", ".net")):
            return False
        return True

# Poor quality tests (high coverage, low quality)
def test_email_validation_poor():
    validator = UserValidator()
    validator.validate_email("test@example.com")
    # No assertions! Test passes but checks nothing

# Better quality tests
def test_email_validation_empty():
    validator = UserValidator()
    assert validator.validate_email("") is False

def test_email_validation_no_at():
    validator = UserValidator()
    assert validator.validate_email("invalid") is False

def test_email_validation_bad_domain():
    validator = UserValidator()
    assert validator.validate_email("test@example.xyz") is False

def test_email_validation_valid():
    validator = UserValidator()
    assert validator.validate_email("test@example.com") is True

# Quality metrics:
# - Assertion density: assertions per test
# - Branch coverage: all paths tested
# - Edge cases covered
# - Error cases tested
```

## Coverage Goals

```python
# Different modules may have different goals

# Core business logic - aim for 100%
class PaymentProcessor:
    def process_payment(self, amount, card):
        # Critical code - must be fully tested
        pass

# UI/View code - 70-80% acceptable
def render_user_page(user):
    # Some UI code is hard to test
    pass

# Configuration - may not need tests
CONFIG = {
    "api_url": "https://api.example.com",
    "timeout": 30
}

# Coverage goals by module type:
# - Critical business logic: 95-100%
# - Services/APIs: 90-95%
# - Utilities: 85-90%
# - UI/Views: 70-80%
# - Config/Constants: 0-50%
```

## Improving Coverage

```python
# Before: Untested edge cases
def calculate_discount(price, customer_type):
    if customer_type == "VIP":
        return price * 0.8  # 20% discount
    elif customer_type == "Regular":
        return price * 0.95  # 5% discount
    else:
        return price

def test_calculate_discount_basic():
    assert calculate_discount(100, "VIP") == 80

# Coverage report shows "Regular" and else branches untested

# After: Complete coverage
def test_calculate_discount_vip():
    assert calculate_discount(100, "VIP") == 80

def test_calculate_discount_regular():
    assert calculate_discount(100, "Regular") == 95

def test_calculate_discount_other():
    assert calculate_discount(100, "Guest") == 100

def test_calculate_discount_unknown():
    assert calculate_discount(100, "Unknown") == 100
```

## Coverage in CI/CD

```yaml
# .github/workflows/tests.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Set up Python
        uses: actions/setup-python@v2
        with:
          python-version: 3.9
      
      - name: Install dependencies
        run: |
          pip install pytest pytest-cov
          pip install -r requirements.txt
      
      - name: Run tests with coverage
        run: |
          pytest --cov=src --cov-report=xml --cov-report=term
      
      - name: Check coverage threshold
        run: |
          pytest --cov=src --cov-fail-under=80
      
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v2
        with:
          file: ./coverage.xml
```

## Coverage Best Practices

```python
# ✅ GOOD - Test behavior, not implementation
def test_user_creation():
    """Test what the function does, not how"""
    user = create_user("alice", "alice@example.com")
    assert user.username == "alice"
    assert user.email == "alice@example.com"

# ❌ BAD - Testing implementation details
def test_user_creation_implementation():
    """Don't test internal implementation"""
    # Bad: testing that specific method is called
    with patch('user_service.generate_id') as mock_gen:
        create_user("alice", "alice@example.com")
        assert mock_gen.called

# ✅ GOOD - Test edge cases
def test_divide_by_zero():
    with pytest.raises(ZeroDivisionError):
        divide(10, 0)

def test_divide_negative():
    assert divide(-10, 2) == -5

def test_divide_floats():
    assert divide(10, 3) == pytest.approx(3.333, rel=0.01)

# ✅ GOOD - Test error conditions
def test_invalid_email():
    with pytest.raises(ValueError, match="Invalid email"):
        create_user("alice", "invalid")

# ✅ GOOD - Test boundary conditions
def test_age_validation_boundaries():
    assert validate_age(0) is True   # Minimum
    assert validate_age(150) is True  # Maximum
    assert validate_age(-1) is False  # Below minimum
    assert validate_age(151) is False # Above maximum
```

## Coverage Reports

```python
# Command line report
"""
Name                Stmts   Miss  Cover   Missing
-------------------------------------------------
calculator.py          20      2    90%   45-46
user_service.py        30      0   100%
validators.py          15      5    67%   10, 15, 20-22
-------------------------------------------------
TOTAL                  65      7    89%
"""

# HTML report shows:
# - Line-by-line coverage
# - Missed lines highlighted
# - Branch coverage visualization
# - Files sorted by coverage %

# Use HTML report to find:
# - Completely untested functions
# - Partially tested branches
# - Dead code
# - Error handling gaps
```

## Summary

**Coverage Types:**
- **Line coverage**: Which lines executed
- **Branch coverage**: Which branches taken
- **Function coverage**: Which functions called
- **Statement coverage**: Which statements executed

**Coverage Tools:**
- `coverage.py`: Python coverage tool
- `pytest-cov`: pytest integration
- `mutmut`: Mutation testing
- `codecov`: Coverage tracking service

**Best Practices:**
- Aim for 80%+ coverage on critical code
- Focus on branch coverage, not just line coverage
- Test edge cases and error conditions
- Don't chase 100% everywhere
- Coverage is a tool, not a goal
- Quality > quantity
- Exclude non-testable code
- Track coverage in CI/CD

**Coverage ≠ Quality:**
- High coverage doesn't guarantee good tests
- Must verify correct behavior
- Test edge cases and errors
- Meaningful assertions required
- Consider mutation testing

**Remember:** 100% coverage with poor tests is worse than 80% coverage with quality tests. Focus on testing behavior and edge cases, not just executing code.

---
id: lesson-140-raising-exceptions
title: "Raising Exceptions and Error Design"
chapterId: ch11-error-handling
order: 3
duration: 25
objectives:
  - Master raising exceptions
  - Write descriptive error messages with context
  - Implement exception chaining
  - Use Python's built-in exception hierarchy
---

# Raising Exceptions and Error Design

Learn to raise exceptions and design descriptive error messages for your applications.

## Raising Built-in Exceptions

```python
# Basic raise
def validate_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative")
    if age > 150:
        raise ValueError("Age is unrealistic")
    return age

# Usage
try:
    age = validate_age(-5)
except ValueError as e:
    print(f"Validation error: {e}")

# Raise with custom message
def divide(a, b):
    if b == 0:
        raise ZeroDivisionError(f"Cannot divide {a} by zero")
    return a / b

# Raise without message
def check_positive(number):
    if number <= 0:
        raise ValueError  # No message
    return number
```

## When to Raise Exceptions

```python
# Input validation
def set_password(password):
    """Set password with validation"""
    if len(password) < 8:
        raise ValueError("Password must be at least 8 characters")
    if not any(c.isdigit() for c in password):
        raise ValueError("Password must contain at least one digit")
    if not any(c.isupper() for c in password):
        raise ValueError("Password must contain at least one uppercase letter")
    
    return password

# Precondition checking
def get_average(numbers):
    """Calculate average"""
    if not numbers:
        raise ValueError("Cannot calculate average of empty list")
    return sum(numbers) / len(numbers)

# State validation
def create_bank_account(balance=0):
    """Create a bank account"""
    return {"balance": balance}

def bank_withdraw(account, amount):
    """Withdraw from bank account"""
    if amount <= 0:
        raise ValueError("Withdrawal amount must be positive")
    if amount > account["balance"]:
        raise ValueError(f"Insufficient funds: {account['balance']} < {amount}")
    account["balance"] -= amount
    return account["balance"]

# Resource validation
def open_file_read(filename):
    """Open file for reading"""
    if not filename:
        raise ValueError("Filename cannot be empty")
    
    try:
        return open(filename, 'r')
    except FileNotFoundError:
        raise FileNotFoundError(f"File not found: {filename}")
```

## Using Descriptive Exceptions

```python
# Use built-in exceptions with descriptive messages
def validate_email(email):
    if "@" not in email:
        raise ValueError("Email must contain @")
    if "." not in email.split("@")[1]:
        raise ValueError("Email domain must contain .")
    return email

# Usage
try:
    email = validate_email("invalid")
except ValueError as e:
    print(f"Email validation failed: {e}")

# Providing error context with descriptive messages
def withdraw(balance, amount):
    if amount > balance:
        deficit = amount - balance
        raise ValueError(
            f"Insufficient funds: need {amount}, have {balance} "
            f"(deficit: {deficit})"
        )
    return balance - amount

# Usage
try:
    balance = withdraw(100, 150)
except ValueError as e:
    print(f"Error: {e}")

# Including context in error messages
def make_database_error(message, query=None, params=None):
    """Create a descriptive database error with full context"""
    full_message = message
    if query:
        full_message += f"\nQuery: {query}"
    if params:
        full_message += f"\nParams: {params}"
    return RuntimeError(full_message)

# Usage
try:
    raise make_database_error(
        "Failed to insert user",
        query="INSERT INTO users VALUES (?, ?)",
        params=("Alice", 30)
    )
except RuntimeError as e:
    print(e)
```

## Using Built-in Exception Types

```python
# Python provides a rich hierarchy of built-in exceptions:
#   PermissionError  → access/auth issues
#   ValueError       → invalid arguments
#   LookupError      → missing resources
#   RuntimeError     → operational failures

# Usage — pick the best built-in type for each error
def get_user(user_id, current_user):
    """Get user with permission check"""
    if not current_user:
        raise PermissionError("Must be logged in")
    
    if not user_id:
        raise ValueError("User ID is required")
    
    user = find_user(user_id)
    if not user:
        raise LookupError(f"User {user_id} not found")
    
    if not can_access(current_user, user):
        raise PermissionError(f"Cannot access user {user_id}")
    
    return user

def find_user(user_id):
    # Mock function
    return None

def can_access(current_user, user):
    # Mock function
    return True

# Catch at the right level of specificity
try:
    user = get_user("123", None)
except PermissionError:
    print("Access denied — please log in or check permissions")
except LookupError:
    print("User not found")
except ValueError:
    print("Invalid input")
except Exception as e:
    print(f"Unexpected error: {e}")
```

## Exception Chaining

```python
# Implicit chaining (automatic via __context__)
def process_data(filename):
    try:
        with open(filename) as f:
            data = f.read()
            return int(data)
    except FileNotFoundError:
        # Python sets __context__ automatically when raising inside except
        # This preserves the original exception for debugging
        raise ValueError(f"Cannot process {filename}")

# The traceback shows both exceptions
try:
    result = process_data("missing.txt")
except ValueError as e:
    print(f"Error: {e}")
    print(f"Cause: {e.__cause__}")
    print(f"Context: {e.__context__}")

# Explicit chaining with 'from'
def load_config(filename):
    try:
        with open(filename) as f:
            import json
            return json.load(f)
    except FileNotFoundError as e:
        raise ValueError("Config file missing") from e
    except json.JSONDecodeError as e:
        raise ValueError("Invalid config format") from e

try:
    config = load_config("config.json")
except ValueError as e:
    print(f"Error: {e}")
    print(f"Original cause: {e.__cause__}")

# Suppress chaining with 'from None'
def get_value(dictionary, key):
    try:
        return dictionary[key]
    except KeyError:
        # Suppress original KeyError
        raise ValueError(f"Invalid key: {key}") from None

try:
    d = {"a": 1}
    value = get_value(d, "b")
except ValueError as e:
    print(f"Error: {e}")
    # No KeyError in traceback
```

## Re-raising Exceptions

```python
# Re-raise with additional processing
def process_file(filename):
    try:
        with open(filename) as f:
            return f.read()
    except FileNotFoundError:
        print(f"Logging: File {filename} not found")
        raise  # Re-raise the same exception

# Re-raise after cleanup
def transaction(db, operation):
    try:
        db.begin()
        result = operation()
        db.commit()
        return result
    except Exception:
        db.rollback()  # Cleanup
        raise  # Re-raise original exception

# Transform and re-raise
def safe_divide(a, b):
    try:
        return a / b
    except ZeroDivisionError as e:
        # Transform to custom exception
        raise ValueError("Division by zero is not allowed") from e
```

## Defining Custom Exception Types

Built-in exceptions like `ValueError` and `TypeError` cover many situations, but sometimes your code needs error types that describe **your** specific problems. Custom exceptions make error handling clearer — the caller can catch `InvalidEmailError` instead of guessing which `ValueError` means what.

Defining a custom exception is a one-liner. You inherit from `Exception` and use `pass` for the body:

```python
# Define custom exceptions — one line each
class InvalidEmailError(Exception): pass
class InsufficientFundsError(Exception): pass
class ConfigurationError(Exception): pass
```

Use them exactly like built-in exceptions — raise with a message and catch by name:

```python
def validate_email(email):
    if "@" not in email:
        raise InvalidEmailError(f"Missing @ symbol: {email}")
    if "." not in email.split("@")[1]:
        raise InvalidEmailError(f"Invalid domain: {email}")
    return email

def process_signup(email):
    try:
        validate_email(email)
        print(f"Account created for {email}")
    except InvalidEmailError as e:
        print(f"Bad email: {e}")

process_signup("user@example.com")   # Account created for user@example.com
process_signup("not-an-email")       # Bad email: Missing @ symbol: not-an-email
```

Custom exceptions let you separate different error categories cleanly. Instead of catching a generic `ValueError` and inspecting the message, callers catch exactly the error type they expect. This makes `try/except` blocks more precise and your code easier to maintain.

## Exception Context Managers

```python
# Suppressing specific exceptions with a context manager
from contextlib import contextmanager

@contextmanager
def suppress_exception(*exceptions):
    """Context manager to suppress specific exceptions"""
    try:
        yield
    except exceptions:
        pass  # Suppress matching exceptions

# Usage
with suppress_exception(ValueError, TypeError):
    result = int("not a number")  # ValueError suppressed
    print("This won't execute")

print("Continues after suppression")

# Standard library version
from contextlib import suppress

with suppress(FileNotFoundError):
    with open("missing.txt") as f:
        content = f.read()

print("File not found, but we continue")
```

## Validation Functions

```python
# Comprehensive validation with helper functions
def validate_required(data, field_name):
    """Check that a required field is present"""
    if field_name not in data:
        raise ValueError(f"Required field missing: {field_name}")

def validate_format(field_name, value, expected_format, check_fn):
    """Check that a field matches the expected format"""
    if not check_fn(value):
        raise ValueError(
            f"Invalid format for {field_name}, expected {expected_format}"
        )

def validate_range(field_name, value, min_val, max_val):
    """Check that a value is within a valid range"""
    if not (min_val <= value <= max_val):
        raise ValueError(
            f"{field_name} must be between {min_val} and {max_val}, got {value}"
        )

def validate_user(data):
    """Validate user data"""
    # Required fields
    validate_required(data, "name")
    validate_required(data, "email")
    validate_required(data, "age")
    
    # Format validation
    validate_format(
        "email", data["email"], "user@domain.com",
        lambda e: "@" in e
    )
    
    # Range validation
    validate_range("age", data["age"], 0, 150)
    
    return True

# Usage
try:
    validate_user({"name": "Alice"})
except ValueError as e:
    print(f"Validation error: {e}")
```

## Exception Best Practices

```python
# DO: Provide helpful error messages
def raise_user_not_found(user_id):
    """Raise a descriptive error when user is not found"""
    raise LookupError(f"User not found: {user_id}")

# DO: Include relevant context in error messages
def raise_payment_error(amount, currency, error_code):
    """Raise a descriptive payment error with context"""
    raise RuntimeError(
        f"Payment failed: {amount} {currency} (code: {error_code})"
    )

# DON'T: Use generic messages
# raise RuntimeError("Something went wrong")  # Too vague!

# DO: Use specific built-in exceptions with clear messages
# raise ValueError("Email already registered: user@example.com")
# raise ValueError("Password too weak: must be 8+ chars with a digit")

# DON'T: Use vague exceptions for everything
# raise RuntimeError("error")  # Too generic!

# DO: Document exceptions
def process_payment(amount):
    """
    Process payment.
    
    Raises:
        ValueError: If amount is negative
        RuntimeError: If payment processing fails
    """
    if amount < 0:
        raise ValueError("Amount cannot be negative")
    # ... processing logic
```

## Summary

**Raising Exceptions:**
- Use `raise` to trigger exceptions
- Include helpful error messages
- Raise at the appropriate level
- Validate inputs and preconditions

**Descriptive Exceptions:**
- Use built-in exceptions with clear messages
- Include relevant context in error messages
- Create helper functions for formatted errors
- Leverage Python's built-in exception hierarchy

**Exception Chaining:**
- Implicit chaining: automatic
- Explicit: `raise ... from original`
- Suppress: `raise ... from None`
- Access via `__cause__` and `__context__`

**Best Practices:**
- Choose specific built-in exception types
- Provide helpful messages with context
- Leverage the built-in exception hierarchy
- Document raised exceptions
- Re-raise after cleanup when needed
- Chain exceptions to preserve context

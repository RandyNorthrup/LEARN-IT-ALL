---
id: "147-raising-exceptions"
title: "Raising and Custom Exceptions"
chapterId: ch11-error-handling
order: 3
duration: 25
objectives:
  - Master raising exceptions
  - Create custom exception classes
  - Implement exception chaining
  - Design exception hierarchies
---

# Raising and Custom Exceptions

Learn to raise exceptions and create custom exception types for your applications.

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
class BankAccount:
    def __init__(self, balance=0):
        self.balance = balance
    
    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive")
        if amount > self.balance:
            raise ValueError(f"Insufficient funds: {self.balance} < {amount}")
        self.balance -= amount
        return self.balance

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

## Custom Exception Classes

```python
# Basic custom exception
class ValidationError(Exception):
    """Raised when validation fails"""
    pass

def validate_email(email):
    if "@" not in email:
        raise ValidationError("Email must contain @")
    if "." not in email.split("@")[1]:
        raise ValidationError("Email domain must contain .")
    return email

# Usage
try:
    email = validate_email("invalid")
except ValidationError as e:
    print(f"Email validation failed: {e}")

# Custom exception with attributes
class InsufficientFundsError(Exception):
    """Raised when account has insufficient funds"""
    def __init__(self, balance, amount):
        self.balance = balance
        self.amount = amount
        self.deficit = amount - balance
        message = f"Insufficient funds: need {amount}, have {balance}"
        super().__init__(message)

def withdraw(balance, amount):
    if amount > balance:
        raise InsufficientFundsError(balance, amount)
    return balance - amount

# Usage
try:
    balance = withdraw(100, 150)
except InsufficientFundsError as e:
    print(f"Error: {e}")
    print(f"Deficit: ${e.deficit}")

# Custom exception with context
class DatabaseError(Exception):
    """Database operation error"""
    def __init__(self, message, query=None, params=None):
        self.query = query
        self.params = params
        super().__init__(message)
    
    def __str__(self):
        msg = super().__str__()
        if self.query:
            msg += f"\nQuery: {self.query}"
        if self.params:
            msg += f"\nParams: {self.params}"
        return msg

# Usage
try:
    raise DatabaseError(
        "Failed to insert user",
        query="INSERT INTO users VALUES (?, ?)",
        params=("Alice", 30)
    )
except DatabaseError as e:
    print(e)
```

## Exception Hierarchies

```python
# Base exception for application
class AppError(Exception):
    """Base exception for application errors"""
    pass

# Specific error types
class ValidationError(AppError):
    """Validation failed"""
    pass

class AuthenticationError(AppError):
    """Authentication failed"""
    pass

class AuthorizationError(AppError):
    """Authorization failed"""
    pass

class ResourceNotFoundError(AppError):
    """Resource not found"""
    pass

# Usage
def get_user(user_id, current_user):
    """Get user with permission check"""
    if not current_user:
        raise AuthenticationError("Must be logged in")
    
    if not user_id:
        raise ValidationError("User ID is required")
    
    user = find_user(user_id)
    if not user:
        raise ResourceNotFoundError(f"User {user_id} not found")
    
    if not can_access(current_user, user):
        raise AuthorizationError(f"Cannot access user {user_id}")
    
    return user

def find_user(user_id):
    # Mock function
    return None

def can_access(current_user, user):
    # Mock function
    return True

# Catch specific or general
try:
    user = get_user("123", None)
except AuthenticationError:
    print("Please log in")
except AuthorizationError:
    print("Access denied")
except ResourceNotFoundError:
    print("User not found")
except AppError as e:
    print(f"Application error: {e}")
```

## Exception Chaining

```python
# Implicit chaining (automatic)
def process_data(filename):
    try:
        with open(filename) as f:
            data = f.read()
            return int(data)
    except FileNotFoundError:
        # Original exception is automatically chained
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

## Exception Context Managers

```python
# Custom exception handling context
class suppress_exception:
    """Context manager to suppress specific exceptions"""
    def __init__(self, *exceptions):
        self.exceptions = exceptions
    
    def __enter__(self):
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type is None:
            return False
        return issubclass(exc_type, self.exceptions)

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

## Validation with Custom Exceptions

```python
# Comprehensive validation system
class ValidationError(Exception):
    """Base validation error"""
    pass

class RequiredFieldError(ValidationError):
    """Required field missing"""
    def __init__(self, field_name):
        self.field_name = field_name
        super().__init__(f"Required field missing: {field_name}")

class InvalidFormatError(ValidationError):
    """Invalid field format"""
    def __init__(self, field_name, expected_format):
        self.field_name = field_name
        self.expected_format = expected_format
        super().__init__(
            f"Invalid format for {field_name}, expected {expected_format}"
        )

class ValueOutOfRangeError(ValidationError):
    """Value out of valid range"""
    def __init__(self, field_name, min_val, max_val, actual_val):
        self.field_name = field_name
        self.min_val = min_val
        self.max_val = max_val
        self.actual_val = actual_val
        super().__init__(
            f"{field_name} must be between {min_val} and {max_val}, got {actual_val}"
        )

class Validator:
    """Data validator"""
    @staticmethod
    def validate_user(data):
        """Validate user data"""
        # Required fields
        if "name" not in data:
            raise RequiredFieldError("name")
        if "email" not in data:
            raise RequiredFieldError("email")
        if "age" not in data:
            raise RequiredFieldError("age")
        
        # Format validation
        if "@" not in data["email"]:
            raise InvalidFormatError("email", "user@domain.com")
        
        # Range validation
        age = data["age"]
        if not (0 <= age <= 150):
            raise ValueOutOfRangeError("age", 0, 150, age)
        
        return True

# Usage
try:
    Validator.validate_user({"name": "Alice"})
except RequiredFieldError as e:
    print(f"Missing field: {e.field_name}")
except InvalidFormatError as e:
    print(f"Format error: {e}")
except ValueOutOfRangeError as e:
    print(f"Range error: {e}")
except ValidationError as e:
    print(f"Validation error: {e}")
```

## Exception Best Practices

```python
# DO: Provide helpful error messages
class UserNotFoundError(Exception):
    def __init__(self, user_id):
        super().__init__(f"User not found: {user_id}")

# DO: Include relevant context
class PaymentError(Exception):
    def __init__(self, amount, currency, error_code):
        self.amount = amount
        self.currency = currency
        self.error_code = error_code
        super().__init__(
            f"Payment failed: {amount} {currency} (code: {error_code})"
        )

# DON'T: Use generic messages
class BadError(Exception):
    def __init__(self):
        super().__init__("Something went wrong")  # Too vague!

# DO: Create specific exception types
class EmailAlreadyExistsError(Exception):
    pass

class WeakPasswordError(Exception):
    pass

# DON'T: Use one exception for everything
class GenericError(Exception):
    pass  # Too generic!

# DO: Document exceptions
def process_payment(amount):
    """
    Process payment.
    
    Raises:
        ValueError: If amount is negative
        PaymentError: If payment processing fails
        InsufficientFundsError: If account has insufficient funds
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

**Custom Exceptions:**
- Inherit from `Exception` or specific built-in
- Add attributes for context
- Override `__str__` for custom formatting
- Create exception hierarchies

**Exception Chaining:**
- Implicit chaining: automatic
- Explicit: `raise ... from original`
- Suppress: `raise ... from None`
- Access via `__cause__` and `__context__`

**Best Practices:**
- Create specific exception types
- Provide helpful messages with context
- Use exception hierarchies
- Document raised exceptions
- Re-raise after cleanup when needed
- Chain exceptions to preserve context

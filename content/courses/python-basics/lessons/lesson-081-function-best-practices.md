---
id: "104-function-best-practices"
title: "Function Best Practices and Design Patterns"
chapterId: ch6-functions
order: 13
duration: 30
objectives:
  - Learn function design principles
  - Master best practices for writing functions
  - Recognize common function patterns
  - Write clean, maintainable function code
---

# Function Best Practices and Design Patterns

Well-designed functions are the foundation of clean code. This lesson covers principles and patterns for writing excellent functions.

## Single Responsibility Principle

```python
# ❌ BAD - Function does too many things
def process_user_order(user_id, items):
    """Process order (does everything!)."""
    # Validate user
    if not user_id:
        raise ValueError("Invalid user")
    
    # Calculate total
    total = sum(item['price'] * item['quantity'] for item in items)
    
    # Apply discount
    if total > 100:
        total *= 0.9
    
    # Update inventory
    for item in items:
        update_inventory(item['id'], -item['quantity'])
    
    # Send email
    send_confirmation_email(user_id, items, total)
    
    # Log transaction
    log_transaction(user_id, total)
    
    return total

# ✅ GOOD - Separate concerns into focused functions
def validate_user(user_id):
    """Validate user ID."""
    if not user_id:
        raise ValueError("Invalid user")

def calculate_order_total(items):
    """Calculate total price of items."""
    return sum(item['price'] * item['quantity'] for item in items)

def apply_discount(total, threshold=100, discount=0.1):
    """Apply discount if total exceeds threshold."""
    if total > threshold:
        return total * (1 - discount)
    return total

def update_inventory_for_items(items):
    """Update inventory for all items."""
    for item in items:
        update_inventory(item['id'], -item['quantity'])

def send_order_confirmation(user_id, items, total):
    """Send confirmation email to user."""
    send_confirmation_email(user_id, items, total)

def log_order_transaction(user_id, total):
    """Log transaction in system."""
    log_transaction(user_id, total)

def process_user_order(user_id, items):
    """Process complete user order.
    
    Orchestrates order processing by calling specialized functions.
    """
    validate_user(user_id)
    total = calculate_order_total(items)
    total = apply_discount(total)
    update_inventory_for_items(items)
    send_order_confirmation(user_id, items, total)
    log_order_transaction(user_id, total)
    return total
```

## Function Length and Complexity

```python
# ❌ BAD - Too long, hard to understand
def process_data(data):
    """Process data (100+ lines)."""
    # ... validation code (20 lines)
    # ... transformation code (30 lines)
    # ... filtering code (20 lines)
    # ... aggregation code (30 lines)
    # ... formatting code (20 lines)
    pass  # This would be huge!

# ✅ GOOD - Break into smaller functions
def validate_data(data):
    """Validate input data."""
    if not data:
        raise ValueError("Empty data")
    if not isinstance(data, list):
        raise TypeError("Data must be list")
    return True

def transform_data(data):
    """Transform data to standard format."""
    return [
        {
            'id': item.get('id'),
            'value': float(item.get('value', 0)),
            'timestamp': item.get('timestamp')
        }
        for item in data
    ]

def filter_valid_data(data):
    """Filter out invalid entries."""
    return [
        item for item in data
        if item['value'] > 0 and item['timestamp']
    ]

def aggregate_data(data):
    """Aggregate data by key metrics."""
    return {
        'count': len(data),
        'total': sum(item['value'] for item in data),
        'average': sum(item['value'] for item in data) / len(data) if data else 0
    }

def format_results(aggregated):
    """Format results for output."""
    return {
        'count': aggregated['count'],
        'total': f"${aggregated['total']:.2f}",
        'average': f"${aggregated['average']:.2f}"
    }

def process_data(data):
    """Process data through pipeline.
    
    Each step is a focused function that does one thing well.
    """
    validate_data(data)
    data = transform_data(data)
    data = filter_valid_data(data)
    aggregated = aggregate_data(data)
    return format_results(aggregated)
```

## Clear Function Names

```python
# ❌ BAD - Unclear names
def proc(x):
    return x * 2

def do_stuff(data):
    result = []
    for item in data:
        result.append(item + 10)
    return result

def func1(a, b):
    return a if a > b else b

# ✅ GOOD - Descriptive names
def double_value(number):
    """Double the given number."""
    return number * 2

def add_bonus_points(scores):
    """Add 10 bonus points to each score."""
    return [score + 10 for score in scores]

def get_maximum_value(value1, value2):
    """Return the larger of two values."""
    return value1 if value1 > value2 else value2

# Good naming patterns
def is_valid_email(email):
    """Check if email is valid."""
    return '@' in email and '.' in email

def has_permission(user, resource):
    """Check if user has access to resource."""
    return user['role'] == 'admin' or resource in user['permissions']

def calculate_monthly_payment(principal, rate, months):
    """Calculate monthly loan payment."""
    monthly_rate = rate / 12
    return principal * monthly_rate / (1 - (1 + monthly_rate) ** -months)

def fetch_user_orders(user_id):
    """Retrieve all orders for user from database."""
    # Implementation
    pass

def validate_credit_card(card_number):
    """Validate credit card number using Luhn algorithm."""
    # Implementation
    pass
```

## Parameter Best Practices

```python
# ❌ BAD - Too many parameters
def create_user(name, email, age, address, city, state, zip_code, 
                phone, country, occupation, company, preferences):
    """Too many parameters - hard to use correctly."""
    pass

# ✅ GOOD - Group related parameters
def create_user(name, email, age, contact_info, preferences=None):
    """Cleaner signature with grouped data.
    
    Args:
        name: User's full name
        email: Email address
        age: User's age
        contact_info: Dict with address, phone, etc.
        preferences: Optional user preferences dict
    """
    pass

# Better: Use data class or typed dict
from dataclasses import dataclass
from typing import Optional

@dataclass
class ContactInfo:
    address: str
    city: str
    state: str
    zip_code: str
    phone: str
    country: str

@dataclass
class UserPreferences:
    newsletter: bool = False
    notifications: bool = True

def create_user(name: str, email: str, age: int, 
                contact: ContactInfo, 
                preferences: Optional[UserPreferences] = None):
    """Clean signature with typed objects."""
    pass

# ❌ BAD - Boolean trap
def set_status(user_id, active):
    """What does True mean? active or inactive?"""
    pass

# Usage is unclear
set_status(123, True)  # Is user active or inactive?

# ✅ GOOD - Explicit naming
def activate_user(user_id):
    """Clearly activates user."""
    pass

def deactivate_user(user_id):
    """Clearly deactivates user."""
    pass

# Usage is clear
activate_user(123)
deactivate_user(456)

# ✅ GOOD - Use enum for options
from enum import Enum

class UserStatus(Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    SUSPENDED = "suspended"

def set_user_status(user_id, status: UserStatus):
    """Set user status explicitly."""
    pass

# Usage is clear and type-safe
set_user_status(123, UserStatus.ACTIVE)
```

## Return Values Best Practices

```python
# ❌ BAD - Inconsistent return types
def find_user(user_id):
    """Returns user dict or False or None - confusing!"""
    user = db.get(user_id)
    if user:
        return user
    return False  # Sometimes False, sometimes None

# ✅ GOOD - Consistent return type
def find_user(user_id):
    """Returns user dict or None.
    
    Args:
        user_id: ID of user to find
        
    Returns:
        User dictionary if found, None otherwise
    """
    return db.get(user_id)  # Always returns dict or None

# ❌ BAD - Returning error codes
def divide_numbers(a, b):
    """Returns result or -1 on error."""
    if b == 0:
        return -1  # Error code - but -1 could be valid result!
    return a / b

# ✅ GOOD - Raise exceptions for errors
def divide_numbers(a, b):
    """Divide a by b.
    
    Args:
        a: Numerator
        b: Denominator
        
    Returns:
        Result of division
        
    Raises:
        ZeroDivisionError: If b is zero
    """
    if b == 0:
        raise ZeroDivisionError("Cannot divide by zero")
    return a / b

# ❌ BAD - Returning tuple with unclear meaning
def get_user_stats(user_id):
    """Returns (count, total, avg) - which is which?"""
    return 42, 1050.5, 25.0

# ✅ GOOD - Return named tuple or dictionary
from collections import namedtuple

UserStats = namedtuple('UserStats', ['order_count', 'total_spent', 'average_order'])

def get_user_stats(user_id):
    """Get user statistics.
    
    Returns:
        UserStats with order_count, total_spent, average_order
    """
    return UserStats(
        order_count=42,
        total_spent=1050.5,
        average_order=25.0
    )

# Usage is clear
stats = get_user_stats(123)
print(stats.order_count)
print(stats.total_spent)

# ✅ ALSO GOOD - Return dictionary
def get_user_stats_dict(user_id):
    """Get user statistics as dictionary."""
    return {
        'order_count': 42,
        'total_spent': 1050.5,
        'average_order': 25.0
    }
```

## Guard Clauses Pattern

```python
# ❌ BAD - Deep nesting
def process_payment(amount, account):
    if amount > 0:
        if account:
            if account.is_active:
                if account.balance >= amount:
                    account.balance -= amount
                    return True
                else:
                    return False
            else:
                return False
        else:
            return False
    else:
        return False

# ✅ GOOD - Guard clauses (early returns)
def process_payment(amount, account):
    """Process payment with guard clauses.
    
    Args:
        amount: Payment amount
        account: Account object
        
    Returns:
        True if payment processed, False otherwise
    """
    # Guard clauses - check failure conditions first
    if amount <= 0:
        return False
    
    if not account:
        return False
    
    if not account.is_active:
        return False
    
    if account.balance < amount:
        return False
    
    # Main logic - only reached if all guards pass
    account.balance -= amount
    return True

# ✅ BETTER - Raise exceptions for errors
def process_payment_with_exceptions(amount, account):
    """Process payment with clear error messages.
    
    Raises:
        ValueError: If amount invalid
        RuntimeError: If account invalid or insufficient funds
    """
    if amount <= 0:
        raise ValueError(f"Invalid amount: {amount}")
    
    if not account:
        raise ValueError("Account is required")
    
    if not account.is_active:
        raise RuntimeError("Account is not active")
    
    if account.balance < amount:
        raise RuntimeError(f"Insufficient funds: {account.balance} < {amount}")
    
    account.balance -= amount
    return True
```

## Default Arguments Pattern

```python
# ❌ BAD - Mutable default argument
def add_item(item, items=[]):
    """Dangerous! Default list is shared across calls."""
    items.append(item)
    return items

# This causes bugs:
list1 = add_item(1)  # [1]
list2 = add_item(2)  # [1, 2] - NOT [2]!

# ✅ GOOD - Use None as default
def add_item(item, items=None):
    """Safe version with None default."""
    if items is None:
        items = []
    items.append(item)
    return items

# Now works correctly:
list1 = add_item(1)  # [1]
list2 = add_item(2)  # [2]

# ✅ GOOD - Immutable defaults are safe
def greet(name, greeting="Hello"):
    """Strings are immutable - safe as default."""
    return f"{greeting}, {name}!"

def multiply(x, factor=2):
    """Numbers are immutable - safe as default."""
    return x * factor

# ❌ BAD - Mutable defaults
def track_events(event, log={}):
    """Dangerous - dict shared across calls!"""
    log[event] = True
    return log

# ✅ GOOD - Use None
def track_events(event, log=None):
    """Safe version."""
    if log is None:
        log = {}
    log[event] = True
    return log
```

## Function Composition Pattern

```python
# ✅ GOOD - Small, composable functions
def remove_whitespace(text):
    """Remove extra whitespace from text."""
    return ' '.join(text.split())

def to_lowercase(text):
    """Convert text to lowercase."""
    return text.lower()

def remove_punctuation(text):
    """Remove punctuation from text."""
    import string
    return text.translate(str.maketrans('', '', string.punctuation))

def normalize_text(text):
    """Normalize text by composing operations."""
    text = remove_whitespace(text)
    text = to_lowercase(text)
    text = remove_punctuation(text)
    return text

# Example usage
original = "Hello,   WORLD!!!  How are   you?"
normalized = normalize_text(original)
print(normalized)  # "hello world how are you"

# ✅ ADVANCED - Function pipeline
def pipeline(*functions):
    """Create pipeline of functions."""
    def apply(value):
        result = value
        for func in functions:
            result = func(result)
        return result
    return apply

# Create reusable pipeline
text_normalizer = pipeline(
    remove_whitespace,
    to_lowercase,
    remove_punctuation
)

# Use pipeline
result = text_normalizer("Hello,   WORLD!!!")
print(result)  # "hello world"
```

## Factory Pattern

```python
# ✅ GOOD - Factory function for object creation
def create_database_connection(db_type, host, port, credentials):
    """Factory for creating database connections.
    
    Args:
        db_type: Type of database ('postgres', 'mysql', 'mongodb')
        host: Database host
        port: Database port
        credentials: Login credentials
        
    Returns:
        Appropriate database connection object
        
    Raises:
        ValueError: If db_type is not supported
    """
    if db_type == 'postgres':
        return PostgresConnection(host, port, credentials)
    elif db_type == 'mysql':
        return MySQLConnection(host, port, credentials)
    elif db_type == 'mongodb':
        return MongoDBConnection(host, port, credentials)
    else:
        raise ValueError(f"Unsupported database type: {db_type}")

# Usage
db = create_database_connection('postgres', 'localhost', 5432, creds)

# ✅ GOOD - Factory with configuration
def create_logger(level='INFO', output='console'):
    """Create configured logger.
    
    Args:
        level: Log level ('DEBUG', 'INFO', 'WARNING', 'ERROR')
        output: Output destination ('console', 'file', 'both')
    """
    import logging
    
    logger = logging.getLogger(__name__)
    logger.setLevel(getattr(logging, level))
    
    if output in ('console', 'both'):
        console_handler = logging.StreamHandler()
        logger.addHandler(console_handler)
    
    if output in ('file', 'both'):
        file_handler = logging.FileHandler('app.log')
        logger.addHandler(file_handler)
    
    return logger

# Usage
logger = create_logger('DEBUG', 'both')
logger.debug("Debug message")
```

## Caching Pattern

```python
# ✅ GOOD - Function result caching
from functools import lru_cache

@lru_cache(maxsize=128)
def fibonacci(n):
    """Calculate Fibonacci number with caching."""
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# Fast due to caching
print(fibonacci(100))  # Computed once, cached

# ✅ GOOD - Manual caching for custom logic
def cached_function(func):
    """Decorator for caching function results."""
    cache = {}
    
    def wrapper(*args):
        if args in cache:
            print(f"Cache hit for {args}")
            return cache[args]
        
        print(f"Computing for {args}")
        result = func(*args)
        cache[args] = result
        return result
    
    return wrapper

@cached_function
def expensive_calculation(x, y):
    """Simulate expensive operation."""
    import time
    time.sleep(1)  # Simulate work
    return x * y + x ** y

# First call - slow
result1 = expensive_calculation(2, 3)  # Computing...

# Second call - fast
result2 = expensive_calculation(2, 3)  # Cache hit!
```

## Error Handling Best Practices

```python
# ✅ GOOD - Specific exception handling
def read_config_file(filepath):
    """Read configuration file with proper error handling.
    
    Args:
        filepath: Path to config file
        
    Returns:
        Configuration dictionary
        
    Raises:
        FileNotFoundError: If file doesn't exist
        json.JSONDecodeError: If file is not valid JSON
        ValueError: If config is invalid
    """
    import json
    
    try:
        with open(filepath, 'r') as f:
            config = json.load(f)
    except FileNotFoundError:
        raise FileNotFoundError(f"Config file not found: {filepath}")
    except json.JSONDecodeError as e:
        raise json.JSONDecodeError(
            f"Invalid JSON in {filepath}: {e.msg}",
            e.doc, e.pos
        )
    
    # Validate config
    required_keys = ['api_key', 'endpoint', 'timeout']
    missing = [key for key in required_keys if key not in config]
    if missing:
        raise ValueError(f"Missing required config keys: {missing}")
    
    return config

# ✅ GOOD - Context manager pattern
from contextlib import contextmanager

@contextmanager
def database_transaction(connection):
    """Context manager for database transactions.
    
    Automatically commits on success, rolls back on error.
    """
    try:
        yield connection
        connection.commit()
        print("Transaction committed")
    except Exception as e:
        connection.rollback()
        print(f"Transaction rolled back: {e}")
        raise

# Usage
# with database_transaction(db_conn) as conn:
#     conn.execute("INSERT ...")
#     conn.execute("UPDATE ...")
```

## Documentation Best Practices

```python
# ✅ EXCELLENT - Complete docstring
def calculate_loan_payment(principal, annual_rate, years, payment_frequency=12):
    """Calculate periodic loan payment amount.
    
    Uses the standard amortization formula to calculate the payment
    amount for a fixed-rate loan with regular payments.
    
    Args:
        principal (float): Initial loan amount in dollars
        annual_rate (float): Annual interest rate as decimal (e.g., 0.05 for 5%)
        years (int): Loan term in years
        payment_frequency (int, optional): Payments per year. Defaults to 12 (monthly)
    
    Returns:
        float: Payment amount per period, rounded to 2 decimal places
    
    Raises:
        ValueError: If principal <= 0, rate < 0, years <= 0, or frequency < 1
    
    Examples:
        >>> calculate_loan_payment(200000, 0.04, 30)
        954.83
        
        >>> calculate_loan_payment(100000, 0.05, 15, payment_frequency=12)
        790.79
    
    Note:
        - Payment amount is constant for fixed-rate loans
        - Formula: P * (r * (1 + r)^n) / ((1 + r)^n - 1)
        - Where r is rate per period, n is total periods
    """
    # Validation
    if principal <= 0:
        raise ValueError(f"Principal must be positive: {principal}")
    if annual_rate < 0:
        raise ValueError(f"Rate cannot be negative: {annual_rate}")
    if years <= 0:
        raise ValueError(f"Years must be positive: {years}")
    if payment_frequency < 1:
        raise ValueError(f"Frequency must be at least 1: {payment_frequency}")
    
    # Calculate
    period_rate = annual_rate / payment_frequency
    num_periods = years * payment_frequency
    
    if period_rate == 0:
        # No interest - simple division
        payment = principal / num_periods
    else:
        # Standard amortization formula
        payment = principal * (
            period_rate * (1 + period_rate) ** num_periods
        ) / (
            (1 + period_rate) ** num_periods - 1
        )
    
    return round(payment, 2)
```

## Summary

**Function Design Principles:**

1. **Single Responsibility**
   - One clear purpose per function
   - Easy to name, test, and maintain

2. **Clear Naming**
   - Descriptive, verb-based names
   - Shows what function does

3. **Short and Focused**
   - 10-20 lines ideal
   - Extract complex logic to helper functions

4. **Proper Parameters**
   - 3-4 parameters maximum
   - Use dataclasses for many related parameters
   - No mutable defaults

5. **Consistent Returns**
   - Same type always
   - Use exceptions for errors
   - Return None or raise, not error codes

6. **Good Documentation**
   - Clear docstrings
   - Document parameters, returns, raises
   - Include examples

**Common Patterns:**

- **Guard Clauses**: Early returns for invalid cases
- **Composition**: Combine small functions
- **Factory**: Create objects based on parameters
- **Caching**: Store expensive results
- **Context Managers**: Resource management

**Best Practices:**

- ✅ Single responsibility
- ✅ Descriptive names
- ✅ Guard clauses over nesting
- ✅ None for mutable defaults
- ✅ Raise exceptions for errors
- ✅ Complete documentation
- ✅ Small, focused functions

**Anti-Patterns to Avoid:**

- ❌ Functions doing too many things
- ❌ Unclear parameter names
- ❌ Mutable default arguments
- ❌ Returning different types
- ❌ Deep nesting
- ❌ Missing documentation

Good functions are the building blocks of maintainable code!

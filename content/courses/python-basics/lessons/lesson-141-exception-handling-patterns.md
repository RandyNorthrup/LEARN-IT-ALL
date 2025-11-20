---
id: "148-exception-handling-patterns"
title: "Exception Handling Patterns and Strategies"
chapterId: ch11-error-handling
order: 4
duration: 30
objectives:
  - Master exception handling patterns
  - Implement retry logic
  - Handle exceptions in loops and functions
  - Apply defensive programming techniques
---

# Exception Handling Patterns and Strategies

Professional patterns for handling exceptions effectively in production code.

## EAFP vs LBYL

```python
# EAFP: Easier to Ask for Forgiveness than Permission
# Pythonic approach - try and handle exceptions
def get_value_eafp(dictionary, key):
    """EAFP style"""
    try:
        return dictionary[key]
    except KeyError:
        return None

# LBYL: Look Before You Leap
# Check before accessing
def get_value_lbyl(dictionary, key):
    """LBYL style"""
    if key in dictionary:
        return dictionary[key]
    return None

# EAFP is preferred in Python
data = {"name": "Alice", "age": 30}

# EAFP: One operation
value1 = get_value_eafp(data, "name")

# LBYL: Two operations (check + access)
value2 = get_value_lbyl(data, "name")

# EAFP handles race conditions better
# Example: file operations
# LBYL - file could be deleted between check and open
import os
if os.path.exists("file.txt"):
    file = open("file.txt")  # Might fail!

# EAFP - handles race condition
try:
    file = open("file.txt")
except FileNotFoundError:
    print("File not found")
```

## Retry Pattern

```python
# Basic retry with fixed attempts
def retry_operation(operation, max_attempts=3):
    """Retry operation up to max_attempts times"""
    for attempt in range(1, max_attempts + 1):
        try:
            return operation()
        except Exception as e:
            if attempt == max_attempts:
                raise
            print(f"Attempt {attempt} failed: {e}")
    return None

# Usage
def unstable_operation():
    import random
    if random.random() < 0.7:
        raise ConnectionError("Network error")
    return "Success"

# result = retry_operation(unstable_operation)

# Retry with exponential backoff
import time

def retry_with_backoff(operation, max_attempts=3, base_delay=1):
    """Retry with exponential backoff"""
    for attempt in range(1, max_attempts + 1):
        try:
            return operation()
        except Exception as e:
            if attempt == max_attempts:
                raise
            
            delay = base_delay * (2 ** (attempt - 1))
            print(f"Attempt {attempt} failed: {e}")
            print(f"Retrying in {delay} seconds...")
            # time.sleep(delay)
    
    return None

# Retry specific exceptions only
def retry_on_specific(operation, max_attempts=3, 
                     retry_exceptions=(ConnectionError, TimeoutError)):
    """Retry only on specific exceptions"""
    for attempt in range(1, max_attempts + 1):
        try:
            return operation()
        except retry_exceptions as e:
            if attempt == max_attempts:
                raise
            print(f"Retryable error on attempt {attempt}: {e}")
        except Exception:
            # Don't retry other exceptions
            raise
    return None

# Retry decorator
def retry(max_attempts=3, exceptions=(Exception,)):
    """Decorator for retrying functions"""
    def decorator(func):
        def wrapper(*args, **kwargs):
            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)
                except exceptions as e:
                    if attempt == max_attempts:
                        raise
                    print(f"Attempt {attempt} failed: {e}")
            return None
        return wrapper
    return decorator

@retry(max_attempts=3, exceptions=(ValueError,))
def parse_data(data):
    return int(data)

# Usage
# result = parse_data("123")
```

## Circuit Breaker Pattern

```python
# Circuit breaker for failing services
from datetime import datetime, timedelta

class CircuitBreaker:
    """Circuit breaker to prevent cascading failures"""
    def __init__(self, failure_threshold=5, timeout=60):
        self.failure_threshold = failure_threshold
        self.timeout = timeout
        self.failure_count = 0
        self.last_failure_time = None
        self.state = "closed"  # closed, open, half-open
    
    def call(self, operation):
        """Execute operation with circuit breaker"""
        if self.state == "open":
            if self._should_attempt_reset():
                self.state = "half-open"
            else:
                raise Exception("Circuit breaker is OPEN")
        
        try:
            result = operation()
            self._on_success()
            return result
        except Exception as e:
            self._on_failure()
            raise
    
    def _on_success(self):
        """Handle successful operation"""
        self.failure_count = 0
        self.state = "closed"
    
    def _on_failure(self):
        """Handle failed operation"""
        self.failure_count += 1
        self.last_failure_time = datetime.now()
        
        if self.failure_count >= self.failure_threshold:
            self.state = "open"
    
    def _should_attempt_reset(self):
        """Check if should attempt to reset"""
        if self.last_failure_time is None:
            return False
        
        elapsed = datetime.now() - self.last_failure_time
        return elapsed.total_seconds() >= self.timeout

# Usage
breaker = CircuitBreaker(failure_threshold=3, timeout=30)

def unreliable_service():
    import random
    if random.random() < 0.8:
        raise ConnectionError("Service down")
    return "Success"

for i in range(10):
    try:
        result = breaker.call(unreliable_service)
        print(f"Call {i+1}: {result}")
    except Exception as e:
        print(f"Call {i+1} failed: {e}")
```

## Exception Handling in Loops

```python
# Continue on error
def process_items_continue(items):
    """Process items, continue on error"""
    results = []
    errors = []
    
    for item in items:
        try:
            result = process_item(item)
            results.append(result)
        except Exception as e:
            errors.append((item, str(e)))
            continue  # Continue to next item
    
    return results, errors

def process_item(item):
    if item < 0:
        raise ValueError("Negative not allowed")
    return item * 2

# Usage
items = [1, 2, -3, 4, -5, 6]
results, errors = process_items_continue(items)
print(f"Results: {results}")
print(f"Errors: {errors}")

# Stop on first error
def process_items_stop(items):
    """Process items, stop on first error"""
    results = []
    
    for item in items:
        try:
            result = process_item(item)
            results.append(result)
        except Exception as e:
            print(f"Stopped at item {item}: {e}")
            break
    
    return results

results = process_items_stop(items)
print(f"Processed: {results}")

# Collect all errors, raise at end
def process_items_collect_errors(items):
    """Process items, collect all errors"""
    results = []
    errors = []
    
    for item in items:
        try:
            result = process_item(item)
            results.append(result)
        except Exception as e:
            errors.append((item, e))
    
    if errors:
        error_msg = "; ".join(f"{item}: {e}" for item, e in errors)
        raise ValueError(f"Processing failed for items: {error_msg}")
    
    return results

try:
    results = process_items_collect_errors(items)
except ValueError as e:
    print(f"Errors occurred: {e}")
```

## Fallback Pattern

```python
# Try multiple strategies
def get_data_with_fallback():
    """Try multiple data sources"""
    # Try primary source
    try:
        return fetch_from_primary()
    except ConnectionError:
        print("Primary source failed")
    
    # Try backup source
    try:
        return fetch_from_backup()
    except ConnectionError:
        print("Backup source failed")
    
    # Try cache
    try:
        return fetch_from_cache()
    except KeyError:
        print("Cache miss")
    
    # Return default
    return get_default_data()

def fetch_from_primary():
    raise ConnectionError("Primary down")

def fetch_from_backup():
    raise ConnectionError("Backup down")

def fetch_from_cache():
    raise KeyError("Not in cache")

def get_default_data():
    return {"default": True}

# Usage
data = get_data_with_fallback()
print(f"Got data: {data}")

# Fallback with priority list
def get_value_from_sources(key, sources):
    """Try to get value from multiple sources"""
    for source_name, source in sources:
        try:
            value = source.get(key)
            if value is not None:
                print(f"Found in {source_name}")
                return value
        except (KeyError, AttributeError, Exception) as e:
            print(f"{source_name} failed: {e}")
            continue
    
    raise KeyError(f"Key {key} not found in any source")

# Usage
primary_db = {"name": "Alice"}
cache = {"age": 30}
defaults = {"country": "USA"}

sources = [
    ("primary", primary_db),
    ("cache", cache),
    ("defaults", defaults)
]

name = get_value_from_sources("name", sources)
age = get_value_from_sources("age", sources)
country = get_value_from_sources("country", sources)
```

## Transaction Pattern

```python
# Transaction with rollback
class Transaction:
    """Transaction with commit/rollback"""
    def __init__(self):
        self.operations = []
        self.committed = False
    
    def add_operation(self, do_func, undo_func):
        """Add operation with undo"""
        self.operations.append((do_func, undo_func))
    
    def execute(self):
        """Execute all operations"""
        completed = []
        
        try:
            for do_func, undo_func in self.operations:
                do_func()
                completed.append(undo_func)
            
            self.committed = True
            return True
        
        except Exception as e:
            print(f"Transaction failed: {e}")
            print("Rolling back...")
            
            # Rollback completed operations in reverse order
            for undo_func in reversed(completed):
                try:
                    undo_func()
                except Exception as undo_error:
                    print(f"Rollback error: {undo_error}")
            
            raise

# Example: Bank transfer
class Account:
    def __init__(self, name, balance):
        self.name = name
        self.balance = balance
    
    def withdraw(self, amount):
        if amount > self.balance:
            raise ValueError("Insufficient funds")
        self.balance -= amount
    
    def deposit(self, amount):
        self.balance += amount

def transfer(from_account, to_account, amount):
    """Transfer money with transaction"""
    transaction = Transaction()
    
    # Add withdraw operation
    transaction.add_operation(
        do_func=lambda: from_account.withdraw(amount),
        undo_func=lambda: from_account.deposit(amount)
    )
    
    # Add deposit operation
    transaction.add_operation(
        do_func=lambda: to_account.deposit(amount),
        undo_func=lambda: to_account.withdraw(amount)
    )
    
    try:
        transaction.execute()
        print("Transfer successful")
        return True
    except Exception as e:
        print(f"Transfer failed: {e}")
        return False

# Usage
alice = Account("Alice", 1000)
bob = Account("Bob", 500)

print(f"Before: Alice={alice.balance}, Bob={bob.balance}")
transfer(alice, bob, 200)
print(f"After: Alice={alice.balance}, Bob={bob.balance}")

# Try invalid transfer
transfer(alice, bob, 2000)  # Should rollback
print(f"After failed: Alice={alice.balance}, Bob={bob.balance}")
```

## Resource Cleanup Pattern

```python
# Manual cleanup with try-finally
def process_with_cleanup():
    """Manual resource cleanup"""
    resource = None
    try:
        resource = acquire_resource()
        result = process_resource(resource)
        return result
    finally:
        if resource:
            release_resource(resource)

def acquire_resource():
    print("Resource acquired")
    return "resource"

def process_resource(resource):
    print(f"Processing {resource}")
    return "result"

def release_resource(resource):
    print(f"Released {resource}")

# Context manager (preferred)
class ManagedResource:
    """Resource with automatic cleanup"""
    def __enter__(self):
        print("Acquiring resource")
        self.resource = "managed_resource"
        return self.resource
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        print("Releasing resource")
        if exc_type:
            print(f"Exception occurred: {exc_val}")
        return False  # Don't suppress exceptions

# Usage
with ManagedResource() as resource:
    print(f"Using {resource}")
    # Automatic cleanup even if exception occurs

# Multiple resources
def process_multiple_resources():
    """Handle multiple resources"""
    with open("input.txt") as infile, \
         open("output.txt", "w") as outfile:
        content = infile.read()
        outfile.write(content.upper())
    # Both files automatically closed
```

## Exception Aggregation

```python
# Collect multiple exceptions
class AggregateException(Exception):
    """Exception containing multiple exceptions"""
    def __init__(self, exceptions):
        self.exceptions = exceptions
        messages = [str(e) for e in exceptions]
        super().__init__(f"Multiple errors: {'; '.join(messages)}")

def validate_all(data, validators):
    """Run all validators, collect all errors"""
    errors = []
    
    for validator in validators:
        try:
            validator(data)
        except Exception as e:
            errors.append(e)
    
    if errors:
        raise AggregateException(errors)
    
    return True

# Validators
def validate_not_empty(data):
    if not data:
        raise ValueError("Data cannot be empty")

def validate_has_name(data):
    if "name" not in data:
        raise KeyError("Name is required")

def validate_has_email(data):
    if "email" not in data:
        raise KeyError("Email is required")

# Usage
validators = [validate_not_empty, validate_has_name, validate_has_email]

try:
    validate_all({}, validators)
except AggregateException as e:
    print(f"Validation failed with {len(e.exceptions)} errors:")
    for error in e.exceptions:
        print(f"  - {error}")
```

## Logging with Exceptions

```python
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Log exceptions with context
def process_with_logging(data):
    """Process data with comprehensive logging"""
    logger.info(f"Processing data: {data}")
    
    try:
        result = risky_operation(data)
        logger.info(f"Success: {result}")
        return result
    
    except ValueError as e:
        logger.error(f"Validation error: {e}", exc_info=True)
        raise
    
    except Exception as e:
        logger.critical(f"Unexpected error: {e}", exc_info=True)
        raise

def risky_operation(data):
    if data < 0:
        raise ValueError("Data must be positive")
    return data * 2

# Usage with logging
try:
    result = process_with_logging(-5)
except ValueError:
    print("Validation failed (logged)")
```

## Summary

**Exception Handling Patterns:**

1. **EAFP vs LBYL**
   - EAFP: Try and handle (Pythonic)
   - LBYL: Check before access
   - EAFP handles race conditions better

2. **Retry Pattern**
   - Fixed attempts
   - Exponential backoff
   - Specific exception retry
   - Retry decorators

3. **Circuit Breaker**
   - Prevent cascading failures
   - States: closed, open, half-open
   - Automatic recovery

4. **Loop Handling**
   - Continue on error
   - Stop on first error
   - Collect all errors

5. **Fallback Pattern**
   - Try multiple sources
   - Priority-based fallback
   - Default values

6. **Transaction Pattern**
   - All-or-nothing operations
   - Automatic rollback
   - Undo operations

7. **Resource Cleanup**
   - Try-finally blocks
   - Context managers
   - Multiple resources

8. **Exception Aggregation**
   - Collect multiple errors
   - Report all issues together
   - Batch validation

**Best Practices:**
- Use EAFP for Pythonic code
- Implement retry for transient failures
- Use circuit breakers for external services
- Log exceptions with context
- Clean up resources properly
- Provide fallbacks for critical operations
- Aggregate related errors when appropriate

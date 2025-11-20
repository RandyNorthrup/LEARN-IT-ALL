---
id: "152-error-handling-best-practices"
title: "Error Handling Best Practices"
chapterId: ch11-error-handling
order: 8
duration: 25
objectives:
  - Follow error handling best practices
  - Write maintainable error handling code
  - Document errors effectively
  - Implement production-ready patterns
---

# Error Handling Best Practices

Professional patterns and practices for robust error handling.

## Catch Specific Exceptions

```python
# ❌ BAD: Catch everything
def bad_example():
    try:
        result = process_data()
    except:  # Catches EVERYTHING, even KeyboardInterrupt!
        print("Error occurred")

# ❌ BAD: Too broad
def still_bad():
    try:
        result = process_data()
    except Exception:  # Better, but still too broad
        print("Error occurred")

# ✅ GOOD: Specific exceptions
def good_example():
    try:
        result = process_data()
    except ValueError:
        print("Invalid value")
    except TypeError:
        print("Wrong type")
    except KeyError:
        print("Key not found")

# ✅ GOOD: Group related exceptions
def also_good():
    try:
        result = process_data()
    except (ValueError, TypeError) as e:
        print(f"Data error: {e}")
    except KeyError as e:
        print(f"Missing key: {e}")

def process_data():
    pass
```

## Don't Silence Exceptions

```python
# ❌ BAD: Silent failure
def bad_silent():
    try:
        critical_operation()
    except:
        pass  # Error ignored - very dangerous!

# ❌ BAD: Misleading message
def bad_message():
    try:
        critical_operation()
    except Exception:
        print("Everything is fine")  # Lying to user!

# ✅ GOOD: Log and re-raise
import logging

logger = logging.getLogger(__name__)

def good_logging():
    try:
        critical_operation()
    except Exception as e:
        logger.error(f"Operation failed: {e}", exc_info=True)
        raise  # Re-raise for caller to handle

# ✅ GOOD: Log and handle appropriately
def good_handling():
    try:
        critical_operation()
    except OperationError as e:
        logger.error(f"Known error: {e}")
        return fallback_value()
    except Exception as e:
        logger.critical(f"Unexpected error: {e}", exc_info=True)
        raise

def critical_operation():
    pass

def fallback_value():
    return None

class OperationError(Exception):
    pass
```

## Provide Helpful Error Messages

```python
# ❌ BAD: Vague messages
def bad_messages(user_input):
    try:
        value = int(user_input)
    except ValueError:
        print("Error")  # What error?

# ❌ BAD: Technical jargon for users
def bad_technical(user_input):
    try:
        value = int(user_input)
    except ValueError as e:
        print(f"ValueError: {e}")  # Too technical

# ✅ GOOD: Clear, actionable messages
def good_messages(user_input):
    try:
        value = int(user_input)
        return value
    except ValueError:
        print(f"'{user_input}' is not a valid number. Please enter digits only.")
        return None

# ✅ GOOD: Context-specific messages
def good_context(filename):
    try:
        with open(filename) as f:
            return f.read()
    except FileNotFoundError:
        print(f"The file '{filename}' was not found.")
        print(f"Please check the filename and try again.")
        return None
    except PermissionError:
        print(f"Permission denied for '{filename}'.")
        print(f"Please check file permissions.")
        return None

# ✅ GOOD: Include remediation steps
def good_remediation(config_file):
    try:
        import json
        with open(config_file) as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Configuration file '{config_file}' not found.")
        print(f"Create one with: {{\"key\": \"value\"}}")
        return {}
    except json.JSONDecodeError as e:
        print(f"Invalid JSON in '{config_file}': {e}")
        print(f"Fix the JSON syntax and try again.")
        return {}
```

## Clean Up Resources Properly

```python
# ❌ BAD: No cleanup
def bad_cleanup():
    file = open("data.txt")
    process(file)
    file.close()  # Might not execute if process() raises!

# ❌ BAD: Manual cleanup
def bad_manual():
    file = open("data.txt")
    try:
        process(file)
    finally:
        file.close()  # Better, but verbose

# ✅ GOOD: Use context managers
def good_cleanup():
    with open("data.txt") as file:
        process(file)
    # Automatically closed

# ✅ GOOD: Multiple resources
def good_multiple():
    with open("input.txt") as infile, \
         open("output.txt", "w") as outfile:
        content = infile.read()
        outfile.write(content.upper())
    # Both closed automatically

# ✅ GOOD: Custom context manager
from contextlib import contextmanager

@contextmanager
def database_connection():
    conn = connect_to_database()
    try:
        yield conn
    finally:
        conn.close()

def good_custom():
    with database_connection() as conn:
        execute_query(conn)
    # Connection closed

def process(file):
    pass

def connect_to_database():
    class MockConn:
        def close(self): pass
    return MockConn()

def execute_query(conn):
    pass
```

## Handle Exceptions at the Right Level

```python
# ❌ BAD: Handle too early
def bad_early():
    data = get_data()  # Handles exceptions internally
    if data is None:  # Now have to check None everywhere
        return None
    # ... more None checks

def get_data():
    try:
        return fetch_from_api()
    except Exception:
        return None  # Loses error information!

# ✅ GOOD: Let exceptions propagate
def good_propagate():
    data = get_data_better()  # Raises on error
    return process(data)

def get_data_better():
    # Let exceptions propagate to caller
    return fetch_from_api()

# ✅ GOOD: Handle at appropriate level
def good_level():
    try:
        data = get_data_better()
        result = process(data)
        return result
    except APIError as e:
        logger.error(f"API error: {e}")
        return default_data()
    except ProcessingError as e:
        logger.error(f"Processing error: {e}")
        return None

def fetch_from_api():
    pass

def default_data():
    return []

class APIError(Exception):
    pass

class ProcessingError(Exception):
    pass
```

## Document Expected Exceptions

```python
# ❌ BAD: No documentation
def bad_docs(filename):
    with open(filename) as f:
        return f.read()

# ✅ GOOD: Document exceptions
def good_docs(filename):
    """
    Read file contents.
    
    Args:
        filename (str): Path to file
    
    Returns:
        str: File contents
    
    Raises:
        FileNotFoundError: If file doesn't exist
        PermissionError: If file not readable
        UnicodeDecodeError: If file encoding invalid
    """
    with open(filename) as f:
        return f.read()

# ✅ GOOD: Document custom exceptions
class ValidationError(Exception):
    """
    Raised when data validation fails.
    
    Attributes:
        field: Name of field that failed validation
        value: Value that failed validation
        reason: Why validation failed
    """
    def __init__(self, field, value, reason):
        self.field = field
        self.value = value
        self.reason = reason
        super().__init__(f"{field}: {reason} (got {value})")

def validate_age(age):
    """
    Validate age value.
    
    Args:
        age: Age value to validate
    
    Returns:
        int: Validated age
    
    Raises:
        ValidationError: If age invalid
    """
    if not isinstance(age, int):
        raise ValidationError("age", age, "must be integer")
    if age < 0:
        raise ValidationError("age", age, "must be non-negative")
    if age > 150:
        raise ValidationError("age", age, "unrealistic value")
    return age
```

## Use Exception Hierarchies

```python
# ✅ GOOD: Create exception hierarchy
class AppError(Exception):
    """Base exception for application"""
    pass

class DatabaseError(AppError):
    """Database-related errors"""
    pass

class ConnectionError(DatabaseError):
    """Database connection errors"""
    pass

class QueryError(DatabaseError):
    """Database query errors"""
    pass

class ValidationError(AppError):
    """Validation errors"""
    pass

class AuthenticationError(AppError):
    """Authentication errors"""
    pass

# Now can catch at different levels
def example_hierarchy():
    try:
        operation()
    except ConnectionError:
        print("Connection failed")
    except QueryError:
        print("Query failed")
    except DatabaseError:  # Catches other DB errors
        print("Database error")
    except AppError:  # Catches all app errors
        print("Application error")

def operation():
    pass
```

## Avoid Common Pitfalls

```python
# ❌ PITFALL 1: Comparing exception by string
def pitfall_1():
    try:
        operation()
    except Exception as e:
        if "not found" in str(e):  # Fragile!
            handle_not_found()

# ✅ BETTER: Use exception types
def better_1():
    try:
        operation()
    except FileNotFoundError:
        handle_not_found()

# ❌ PITFALL 2: Creating exceptions expensively
def pitfall_2():
    try:
        operation()
    except Exception as e:
        # Creating exceptions is expensive
        for i in range(1000):
            raise ValueError(f"Error {i}")

# ✅ BETTER: Reuse exception instances
def better_2():
    error = ValueError("Error occurred")
    try:
        operation()
    except Exception:
        raise error

# ❌ PITFALL 3: Losing original exception
def pitfall_3():
    try:
        operation()
    except ValueError:
        raise TypeError("Different error")  # Lost original!

# ✅ BETTER: Chain exceptions
def better_3():
    try:
        operation()
    except ValueError as e:
        raise TypeError("Different error") from e

# ❌ PITFALL 4: Modifying during iteration
def pitfall_4():
    items = [1, 2, 3, 4, 5]
    try:
        for item in items:
            if item % 2 == 0:
                items.remove(item)  # Dangerous!
    except:
        pass

# ✅ BETTER: Iterate over copy
def better_4():
    items = [1, 2, 3, 4, 5]
    for item in items[:]:  # Copy
        if item % 2 == 0:
            items.remove(item)

def handle_not_found():
    pass
```

## Production-Ready Error Handling

```python
# Complete production example
import logging
from typing import Optional, Tuple

logger = logging.getLogger(__name__)

class UserService:
    """User service with production-ready error handling"""
    
    def get_user(self, user_id: str) -> Optional[dict]:
        """
        Get user by ID.
        
        Args:
            user_id: User ID to fetch
        
        Returns:
            User dict if found, None otherwise
        
        Raises:
            ValueError: If user_id is invalid
            DatabaseError: If database operation fails
        """
        # Validate input
        if not user_id or not isinstance(user_id, str):
            raise ValueError(f"Invalid user_id: {user_id}")
        
        logger.info(f"Fetching user {user_id}")
        
        try:
            # Attempt database query
            user = self._query_database(user_id)
            
            if user is None:
                logger.warning(f"User {user_id} not found")
                return None
            
            logger.info(f"User {user_id} fetched successfully")
            return user
        
        except ConnectionError as e:
            logger.error(f"Database connection failed: {e}")
            raise DatabaseError("Unable to connect to database") from e
        
        except QueryError as e:
            logger.error(f"Query failed for user {user_id}: {e}")
            raise DatabaseError(f"Failed to fetch user {user_id}") from e
        
        except Exception as e:
            logger.critical(f"Unexpected error fetching user {user_id}: {e}", exc_info=True)
            raise
    
    def create_user(self, user_data: dict) -> Tuple[bool, Optional[str]]:
        """
        Create new user.
        
        Args:
            user_data: User data dictionary
        
        Returns:
            Tuple of (success, error_message)
        """
        try:
            # Validate input
            self._validate_user_data(user_data)
            
            # Create user
            user_id = self._insert_user(user_data)
            
            logger.info(f"User created: {user_id}")
            return True, None
        
        except ValidationError as e:
            logger.warning(f"Validation failed: {e}")
            return False, str(e)
        
        except DatabaseError as e:
            logger.error(f"Database error: {e}")
            return False, "Unable to create user. Please try again."
        
        except Exception as e:
            logger.critical(f"Unexpected error creating user: {e}", exc_info=True)
            return False, "An unexpected error occurred."
    
    def _query_database(self, user_id):
        """Query database (mock)"""
        return {"id": user_id, "name": "Alice"}
    
    def _validate_user_data(self, data):
        """Validate user data"""
        if "name" not in data:
            raise ValidationError("name", None, "required")
    
    def _insert_user(self, data):
        """Insert user (mock)"""
        return "new_user_id"
```

## Error Handling Checklist

```python
"""
Error Handling Best Practices Checklist:

✅ Catch specific exceptions, not Exception or bare except
✅ Never silently ignore exceptions (no empty except)
✅ Provide clear, actionable error messages
✅ Include context in error messages (what, why, how to fix)
✅ Use context managers for resource cleanup
✅ Handle exceptions at the appropriate level
✅ Document exceptions in docstrings
✅ Use exception hierarchies for related errors
✅ Log exceptions with full context
✅ Chain exceptions to preserve context
✅ Re-raise after logging when appropriate
✅ Clean up resources in finally blocks
✅ Use assertions for debugging, not input validation
✅ Validate inputs early
✅ Test error handling paths
✅ Don't use exceptions for flow control
✅ Create custom exceptions for domain errors
✅ Use typing hints for better IDE support
"""
```

## Summary

**Core Principles:**

1. **Be Specific**
   - Catch specific exception types
   - Don't catch Exception unless necessary
   - Never use bare except

2. **Don't Silence**
   - Always log exceptions
   - Provide user feedback
   - Re-raise when appropriate

3. **Clear Messages**
   - Explain what happened
   - Include context
   - Suggest fixes

4. **Clean Up**
   - Use context managers
   - Always release resources
   - Handle cleanup in finally

5. **Right Level**
   - Handle where you can act
   - Let exceptions propagate otherwise
   - Transform at boundaries

6. **Document**
   - List exceptions in docstrings
   - Explain when raised
   - Include examples

7. **Use Hierarchies**
   - Group related exceptions
   - Catch at appropriate level
   - Provide base exception

**Anti-Patterns to Avoid:**
- Catching everything
- Silent failures
- Vague error messages
- No resource cleanup
- Handling too early
- No documentation
- String comparison of errors
- Losing exception context
- Using exceptions for control flow

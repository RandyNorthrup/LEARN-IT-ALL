---
id: "155-testing-error-handling"
title: "Testing Error Handling"
chapterId: ch11-error-handling
order: 10
duration: 25
objectives:
  - Test exception raising
  - Verify error messages
  - Test error recovery
  - Assert error conditions
---

# Testing Error Handling

Comprehensive testing ensures robust error handling.

## Testing Exception Raising

```python
import pytest

def divide(a, b):
    """Divide two numbers"""
    if b == 0:
        raise ZeroDivisionError("Cannot divide by zero")
    return a / b

# Test that exception is raised
def test_divide_by_zero():
    with pytest.raises(ZeroDivisionError):
        divide(10, 0)

# Test exception message
def test_divide_by_zero_message():
    with pytest.raises(ZeroDivisionError, match="Cannot divide by zero"):
        divide(10, 0)

# Test exception type
def test_divide_by_zero_type():
    with pytest.raises(ZeroDivisionError) as exc_info:
        divide(10, 0)
    
    assert exc_info.type is ZeroDivisionError
    assert str(exc_info.value) == "Cannot divide by zero"

# Test successful case
def test_divide_success():
    result = divide(10, 2)
    assert result == 5.0
```

## Testing Custom Exceptions

```python
class ValidationError(Exception):
    """Validation error"""
    def __init__(self, field: str, message: str):
        self.field = field
        self.message = message
        super().__init__(f"{field}: {message}")

def validate_email(email: str):
    """Validate email format"""
    if not isinstance(email, str):
        raise TypeError("Email must be string")
    
    if "@" not in email:
        raise ValidationError("email", "Must contain @")
    
    if not email.endswith((".com", ".org", ".net")):
        raise ValidationError("email", "Invalid domain")
    
    return True

# Test custom exception
def test_validate_email_no_at():
    with pytest.raises(ValidationError) as exc_info:
        validate_email("invalid_email")
    
    assert exc_info.value.field == "email"
    assert exc_info.value.message == "Must contain @"

def test_validate_email_invalid_domain():
    with pytest.raises(ValidationError, match="Invalid domain"):
        validate_email("user@example.xyz")

def test_validate_email_type_error():
    with pytest.raises(TypeError, match="Email must be string"):
        validate_email(123)

def test_validate_email_success():
    assert validate_email("user@example.com") is True
```

## Testing Error Messages

```python
class UserService:
    """User service with validation"""
    
    def __init__(self):
        self.users = {}
    
    def create_user(self, user_id: str, name: str, age: int):
        """Create user"""
        if not user_id:
            raise ValueError("User ID is required")
        
        if user_id in self.users:
            raise ValueError(f"User {user_id} already exists")
        
        if not name or not name.strip():
            raise ValueError("Name is required and cannot be empty")
        
        if age < 0:
            raise ValueError("Age cannot be negative")
        
        if age > 150:
            raise ValueError("Age must be less than 150")
        
        self.users[user_id] = {"name": name, "age": age}
        return self.users[user_id]

# Test error messages
def test_create_user_no_id():
    service = UserService()
    with pytest.raises(ValueError, match="User ID is required"):
        service.create_user("", "Alice", 30)

def test_create_user_duplicate():
    service = UserService()
    service.create_user("user1", "Alice", 30)
    
    with pytest.raises(ValueError, match="User user1 already exists"):
        service.create_user("user1", "Bob", 25)

def test_create_user_empty_name():
    service = UserService()
    with pytest.raises(ValueError, match="Name is required"):
        service.create_user("user1", "  ", 30)

def test_create_user_negative_age():
    service = UserService()
    with pytest.raises(ValueError, match="Age cannot be negative"):
        service.create_user("user1", "Alice", -5)

def test_create_user_invalid_age():
    service = UserService()
    with pytest.raises(ValueError, match="Age must be less than 150"):
        service.create_user("user1", "Alice", 200)

def test_create_user_success():
    service = UserService()
    user = service.create_user("user1", "Alice", 30)
    assert user == {"name": "Alice", "age": 30}
```

## Testing Error Recovery

```python
def process_items(items):
    """Process items with error recovery"""
    results = []
    errors = []
    
    for item in items:
        try:
            if not isinstance(item, (int, float)):
                raise TypeError(f"Expected number, got {type(item).__name__}")
            
            if item < 0:
                raise ValueError(f"Number must be positive: {item}")
            
            result = item * 2
            results.append(result)
        
        except (TypeError, ValueError) as e:
            errors.append(str(e))
    
    return results, errors

# Test successful processing
def test_process_items_success():
    results, errors = process_items([1, 2, 3])
    assert results == [2, 4, 6]
    assert errors == []

# Test error collection
def test_process_items_with_errors():
    results, errors = process_items([1, "invalid", -5, 3])
    assert results == [2, 6]
    assert len(errors) == 2
    assert "Expected number" in errors[0]
    assert "must be positive" in errors[1]

# Test all errors
def test_process_items_all_errors():
    results, errors = process_items(["a", "b", -1])
    assert results == []
    assert len(errors) == 3
```

## Testing Cleanup

```python
class Resource:
    """Resource that needs cleanup"""
    
    def __init__(self, name: str):
        self.name = name
        self.opened = False
        self.closed = False
    
    def open(self):
        """Open resource"""
        if self.opened:
            raise RuntimeError(f"Resource {self.name} already open")
        self.opened = True
    
    def close(self):
        """Close resource"""
        if not self.opened:
            raise RuntimeError(f"Resource {self.name} not open")
        if self.closed:
            raise RuntimeError(f"Resource {self.name} already closed")
        self.closed = True
    
    def __enter__(self):
        self.open()
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        self.close()
        return False

# Test cleanup on success
def test_resource_cleanup_success():
    resource = Resource("test")
    
    with resource:
        assert resource.opened is True
        assert resource.closed is False
    
    assert resource.closed is True

# Test cleanup on exception
def test_resource_cleanup_on_exception():
    resource = Resource("test")
    
    with pytest.raises(ValueError):
        with resource:
            assert resource.opened is True
            raise ValueError("Test error")
    
    # Cleanup still happened
    assert resource.closed is True

# Test double open error
def test_resource_double_open():
    resource = Resource("test")
    resource.open()
    
    with pytest.raises(RuntimeError, match="already open"):
        resource.open()
    
    resource.close()

# Test close before open
def test_resource_close_before_open():
    resource = Resource("test")
    
    with pytest.raises(RuntimeError, match="not open"):
        resource.close()
```

## Testing Retry Logic

```python
class APIClient:
    """API client with retry"""
    
    def __init__(self, max_retries=3):
        self.max_retries = max_retries
        self.call_count = 0
    
    def call_api(self, endpoint: str, fail_until: int = 0):
        """Call API (fails first N times for testing)"""
        self.call_count += 1
        
        if self.call_count <= fail_until:
            raise ConnectionError(f"Connection failed (attempt {self.call_count})")
        
        return {"data": f"Success from {endpoint}"}
    
    def call_with_retry(self, endpoint: str, fail_until: int = 0):
        """Call API with retry"""
        last_error = None
        
        for attempt in range(1, self.max_retries + 1):
            try:
                return self.call_api(endpoint, fail_until)
            except ConnectionError as e:
                last_error = e
                if attempt == self.max_retries:
                    raise
        
        if last_error:
            raise last_error

# Test successful call
def test_api_call_success():
    client = APIClient()
    result = client.call_with_retry("/users")
    assert result["data"] == "Success from /users"
    assert client.call_count == 1

# Test retry once
def test_api_call_retry_once():
    client = APIClient(max_retries=3)
    result = client.call_with_retry("/users", fail_until=1)
    assert result["data"] == "Success from /users"
    assert client.call_count == 2

# Test retry twice
def test_api_call_retry_twice():
    client = APIClient(max_retries=3)
    result = client.call_with_retry("/users", fail_until=2)
    assert result["data"] == "Success from /users"
    assert client.call_count == 3

# Test max retries exceeded
def test_api_call_max_retries():
    client = APIClient(max_retries=3)
    
    with pytest.raises(ConnectionError, match="attempt 3"):
        client.call_with_retry("/users", fail_until=10)
    
    assert client.call_count == 3
```

## Testing Exception Chaining

```python
def load_config(filename: str):
    """Load configuration"""
    try:
        with open(filename) as f:
            import json
            return json.load(f)
    except FileNotFoundError as e:
        raise RuntimeError(f"Config file not found: {filename}") from e
    except json.JSONDecodeError as e:
        raise RuntimeError(f"Invalid JSON in config file") from e

# Test exception chain
def test_load_config_not_found(tmp_path):
    filename = tmp_path / "missing.json"
    
    with pytest.raises(RuntimeError, match="Config file not found") as exc_info:
        load_config(str(filename))
    
    # Check original exception
    assert exc_info.value.__cause__.__class__ is FileNotFoundError

def test_load_config_invalid_json(tmp_path):
    filename = tmp_path / "invalid.json"
    filename.write_text("{invalid json}")
    
    with pytest.raises(RuntimeError, match="Invalid JSON") as exc_info:
        load_config(str(filename))
    
    # Check original exception
    import json
    assert exc_info.value.__cause__.__class__ is json.JSONDecodeError

def test_load_config_success(tmp_path):
    filename = tmp_path / "config.json"
    filename.write_text('{"key": "value"}')
    
    config = load_config(str(filename))
    assert config == {"key": "value"}
```

## Testing Warnings

```python
import warnings

def deprecated_function():
    """Deprecated function"""
    warnings.warn("This function is deprecated", DeprecationWarning)
    return "result"

# Test warning is raised
def test_deprecated_warning():
    with pytest.warns(DeprecationWarning, match="deprecated"):
        deprecated_function()

# Test function still works
def test_deprecated_function_works():
    with warnings.catch_warnings():
        warnings.simplefilter("ignore")
        result = deprecated_function()
        assert result == "result"
```

## Mock Exceptions

```python
from unittest.mock import Mock, patch

class Database:
    """Database class"""
    
    def connect(self):
        """Connect to database"""
        pass
    
    def query(self, sql: str):
        """Execute query"""
        pass

class UserRepository:
    """User repository"""
    
    def __init__(self, db: Database):
        self.db = db
    
    def get_user(self, user_id: str):
        """Get user by ID"""
        try:
            self.db.connect()
            result = self.db.query(f"SELECT * FROM users WHERE id = '{user_id}'")
            return result
        except ConnectionError:
            raise RuntimeError("Failed to connect to database")
        except Exception as e:
            raise RuntimeError(f"Failed to get user: {e}")

# Test connection error
def test_get_user_connection_error():
    mock_db = Mock(spec=Database)
    mock_db.connect.side_effect = ConnectionError("Connection refused")
    
    repo = UserRepository(mock_db)
    
    with pytest.raises(RuntimeError, match="Failed to connect"):
        repo.get_user("user1")

# Test query error
def test_get_user_query_error():
    mock_db = Mock(spec=Database)
    mock_db.query.side_effect = ValueError("Invalid query")
    
    repo = UserRepository(mock_db)
    
    with pytest.raises(RuntimeError, match="Failed to get user"):
        repo.get_user("user1")

# Test success
def test_get_user_success():
    mock_db = Mock(spec=Database)
    mock_db.query.return_value = {"id": "user1", "name": "Alice"}
    
    repo = UserRepository(mock_db)
    user = repo.get_user("user1")
    
    assert user["id"] == "user1"
    assert user["name"] == "Alice"
```

## Parametrized Error Tests

```python
def validate_age(age):
    """Validate age"""
    if not isinstance(age, int):
        raise TypeError("Age must be integer")
    
    if age < 0:
        raise ValueError("Age cannot be negative")
    
    if age > 150:
        raise ValueError("Age too large")
    
    return True

# Parametrize error cases
@pytest.mark.parametrize("age,exception,message", [
    ("30", TypeError, "Age must be integer"),
    (30.5, TypeError, "Age must be integer"),
    (-1, ValueError, "Age cannot be negative"),
    (-100, ValueError, "Age cannot be negative"),
    (151, ValueError, "Age too large"),
    (1000, ValueError, "Age too large"),
])
def test_validate_age_errors(age, exception, message):
    with pytest.raises(exception, match=message):
        validate_age(age)

# Parametrize success cases
@pytest.mark.parametrize("age", [0, 1, 18, 65, 100, 150])
def test_validate_age_success(age):
    assert validate_age(age) is True
```

## Testing Error Logging

```python
import logging
from io import StringIO

def process_data(data):
    """Process data with logging"""
    logger = logging.getLogger(__name__)
    
    try:
        if not data:
            raise ValueError("Data cannot be empty")
        
        result = data * 2
        logger.info(f"Processed data: {result}")
        return result
    
    except ValueError as e:
        logger.error(f"Validation error: {e}")
        raise
    except Exception as e:
        logger.error(f"Unexpected error: {e}", exc_info=True)
        raise

# Test error logging
def test_process_data_logs_error(caplog):
    with caplog.at_level(logging.ERROR):
        with pytest.raises(ValueError):
            process_data(None)
    
    assert "Validation error" in caplog.text
    assert "Data cannot be empty" in caplog.text

# Test success logging
def test_process_data_logs_success(caplog):
    with caplog.at_level(logging.INFO):
        result = process_data("test")
    
    assert "Processed data" in caplog.text
    assert result == "testtest"
```

## Testing Best Practices

```python
# ✅ GOOD - Test specific exception
def test_specific_exception():
    with pytest.raises(ValueError):
        int("not a number")

# ❌ BAD - Too broad
def test_broad_exception():
    with pytest.raises(Exception):  # Too broad!
        int("not a number")

# ✅ GOOD - Test error message
def test_with_message():
    with pytest.raises(ValueError, match="invalid literal"):
        int("not a number")

# ✅ GOOD - Test exception attributes
def test_exception_attributes():
    with pytest.raises(ValueError) as exc_info:
        raise ValueError("test error")
    
    assert str(exc_info.value) == "test error"
    assert exc_info.type is ValueError

# ✅ GOOD - Test both success and failure
def test_both_paths():
    # Test success
    assert divide(10, 2) == 5
    
    # Test failure
    with pytest.raises(ZeroDivisionError):
        divide(10, 0)

# ✅ GOOD - Test cleanup
def test_cleanup():
    resource = Resource("test")
    
    with pytest.raises(ValueError):
        with resource:
            raise ValueError()
    
    assert resource.closed is True
```

## Summary

**Testing Error Handling:**
- Use `pytest.raises()` to test exceptions
- Test exception messages with `match` parameter
- Access exception details with `exc_info`
- Test error recovery and collection
- Verify cleanup happens on errors
- Test retry logic thoroughly
- Check exception chaining with `__cause__`
- Test warnings with `pytest.warns()`
- Mock exceptions for testing error paths
- Parametrize error test cases
- Test error logging with `caplog`

**Best Practices:**
- Test specific exceptions, not `Exception`
- Verify error messages
- Test both success and failure paths
- Ensure cleanup happens on errors
- Test all error recovery paths
- Use fixtures for test resources
- Mock external dependencies
- Test exception attributes
- Parametrize similar error cases
- Check error logging

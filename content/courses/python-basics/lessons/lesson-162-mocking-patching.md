---
id: "161-mocking-patching"
title: "Mocking and Patching"
chapterId: ch12-testing
order: 10
duration: 30
objectives:
  - Mock external dependencies
  - Patch functions and methods
  - Control test behavior
  - Test isolated units
---

# Mocking and Patching

Mocking replaces real objects with test doubles to isolate code under test.

## Basic Mocking

```python
from unittest.mock import Mock

# Create a mock object
mock_db = Mock()

# Configure return value
mock_db.get_user.return_value = {"id": 1, "name": "Alice"}

# Use in code
user = mock_db.get_user("user123")
assert user["name"] == "Alice"

# Verify it was called
mock_db.get_user.assert_called_once_with("user123")
```

## Mock Return Values

```python
from unittest.mock import Mock

# Simple return value
mock_api = Mock()
mock_api.fetch_data.return_value = {"status": "success"}

result = mock_api.fetch_data()
assert result["status"] == "success"

# Multiple return values
mock_counter = Mock()
mock_counter.get_count.side_effect = [1, 2, 3]

assert mock_counter.get_count() == 1
assert mock_counter.get_count() == 2
assert mock_counter.get_count() == 3

# Return value based on arguments
def custom_get_user(user_id):
    if user_id == "user1":
        return {"id": "user1", "name": "Alice"}
    return None

mock_db = Mock()
mock_db.get_user.side_effect = custom_get_user

assert mock_db.get_user("user1")["name"] == "Alice"
assert mock_db.get_user("user2") is None
```

## Mock Exceptions

```python
from unittest.mock import Mock

# Raise exception
mock_api = Mock()
mock_api.fetch_data.side_effect = ConnectionError("API unavailable")

try:
    mock_api.fetch_data()
    assert False, "Should have raised exception"
except ConnectionError as e:
    assert str(e) == "API unavailable"

# Different exceptions for different calls
mock_retry = Mock()
mock_retry.try_operation.side_effect = [
    ConnectionError("Failed"),
    ConnectionError("Failed"),
    {"status": "success"}  # Third call succeeds
]

# First two calls raise, third succeeds
try:
    mock_retry.try_operation()
except ConnectionError:
    pass

try:
    mock_retry.try_operation()
except ConnectionError:
    pass

result = mock_retry.try_operation()
assert result["status"] == "success"
```

## Patching Functions

```python
from unittest.mock import patch

# Module function to test
def get_current_time():
    from datetime import datetime
    return datetime.now()

def format_timestamp():
    time = get_current_time()
    return time.strftime("%Y-%m-%d")

# Patch with decorator
@patch('__main__.get_current_time')
def test_format_timestamp(mock_get_time):
    from datetime import datetime
    mock_get_time.return_value = datetime(2024, 1, 15, 10, 30)
    
    result = format_timestamp()
    assert result == "2024-01-15"

# Patch with context manager
def test_format_timestamp_context():
    from datetime import datetime
    
    with patch('__main__.get_current_time') as mock_get_time:
        mock_get_time.return_value = datetime(2024, 1, 15, 10, 30)
        result = format_timestamp()
        assert result == "2024-01-15"
```

## Patching Methods

```python
from unittest.mock import patch

class UserService:
    def __init__(self, database):
        self.database = database
    
    def get_user(self, user_id):
        return self.database.query(f"SELECT * FROM users WHERE id = {user_id}")
    
    def is_active(self, user_id):
        user = self.get_user(user_id)
        return user.get("active", False)

# Patch instance method
@patch.object(UserService, 'get_user')
def test_is_active(mock_get_user):
    mock_get_user.return_value = {"id": "user1", "active": True}
    
    service = UserService(None)  # Database not needed
    assert service.is_active("user1") is True
    
    mock_get_user.assert_called_once_with("user1")
```

## Patching Classes

```python
from unittest.mock import patch, Mock

class Database:
    def __init__(self, connection_string):
        self.connection_string = connection_string
    
    def connect(self):
        # Complex connection logic
        pass
    
    def query(self, sql):
        # Real database query
        pass

# Patch entire class
@patch('__main__.Database')
def test_user_service(MockDatabase):
    # Configure mock
    mock_db_instance = Mock()
    mock_db_instance.query.return_value = [{"id": 1, "name": "Alice"}]
    MockDatabase.return_value = mock_db_instance
    
    # Use in code
    db = Database("connection_string")  # Returns mock
    result = db.query("SELECT * FROM users")
    
    assert len(result) == 1
    assert result[0]["name"] == "Alice"
    
    # Verify
    MockDatabase.assert_called_once_with("connection_string")
    mock_db_instance.query.assert_called_once()
```

## Multiple Patches

```python
from unittest.mock import patch

# Multiple decorators
@patch('requests.get')
@patch('time.sleep')
def test_api_with_retry(mock_sleep, mock_get):
    # Note: decorators apply bottom-to-top
    mock_get.side_effect = [
        ConnectionError("Failed"),
        Mock(status_code=200, json=lambda: {"data": "success"})
    ]
    
    # Call function that uses requests and sleep
    result = api_call_with_retry()
    
    assert result["data"] == "success"
    assert mock_get.call_count == 2
    assert mock_sleep.call_count == 1

# Patch multiple with context manager
def test_api_with_context():
    with patch('requests.get') as mock_get, \
         patch('time.sleep') as mock_sleep:
        
        mock_get.return_value = Mock(
            status_code=200,
            json=lambda: {"data": "success"}
        )
        
        result = api_call()
        assert result["data"] == "success"
```

## Patching Built-ins

```python
from unittest.mock import patch, mock_open

# Patch open()
def read_config():
    with open("config.txt") as f:
        return f.read()

@patch('builtins.open', mock_open(read_data='{"key": "value"}'))
def test_read_config():
    result = read_config()
    assert result == '{"key": "value"}'

# Patch input()
def get_user_input():
    name = input("Enter name: ")
    age = int(input("Enter age: "))
    return {"name": name, "age": age}

@patch('builtins.input', side_effect=["Alice", "30"])
def test_get_user_input(mock_input):
    result = get_user_input()
    assert result == {"name": "Alice", "age": 30}
    assert mock_input.call_count == 2

# Patch print()
@patch('builtins.print')
def test_print_output(mock_print):
    print("Hello, World!")
    mock_print.assert_called_once_with("Hello, World!")
```

## Mock Attributes

```python
from unittest.mock import Mock

# Configure attributes
mock_user = Mock()
mock_user.id = "user123"
mock_user.username = "alice"
mock_user.email = "alice@example.com"

assert mock_user.id == "user123"
assert mock_user.username == "alice"

# Configure with spec
class User:
    def __init__(self, username):
        self.username = username
    
    def get_profile(self):
        pass

mock_user = Mock(spec=User)
mock_user.username = "bob"
mock_user.get_profile.return_value = {"username": "bob"}

# This works
profile = mock_user.get_profile()

# This raises AttributeError (not in spec)
# mock_user.nonexistent_method()
```

## Verify Mock Calls

```python
from unittest.mock import Mock

mock_api = Mock()

# Make calls
mock_api.get_user("user1")
mock_api.get_user("user2")
mock_api.create_user("user3")

# Verify called
assert mock_api.get_user.called
assert mock_api.create_user.called

# Verify call count
assert mock_api.get_user.call_count == 2
assert mock_api.create_user.call_count == 1

# Verify called with specific arguments
mock_api.get_user.assert_called_with("user2")  # Last call
mock_api.get_user.assert_any_call("user1")  # Any call

# Verify called once
mock_api.create_user.assert_called_once_with("user3")

# Verify not called
assert not mock_api.delete_user.called

# Get call arguments
calls = mock_api.get_user.call_args_list
assert len(calls) == 2
assert calls[0][0][0] == "user1"
assert calls[1][0][0] == "user2"
```

## MagicMock

```python
from unittest.mock import MagicMock

# MagicMock supports magic methods
mock_list = MagicMock()
mock_list.__len__.return_value = 5
mock_list.__getitem__.return_value = "item"

assert len(mock_list) == 5
assert mock_list[0] == "item"

# Context manager protocol
mock_file = MagicMock()
mock_file.__enter__.return_value = mock_file
mock_file.read.return_value = "file content"

with mock_file as f:
    content = f.read()
    assert content == "file content"

# Iterator protocol
mock_iter = MagicMock()
mock_iter.__iter__.return_value = iter([1, 2, 3])

result = list(mock_iter)
assert result == [1, 2, 3]
```

## PropertyMock

```python
from unittest.mock import PropertyMock, patch

class User:
    def __init__(self, name):
        self._name = name
    
    @property
    def name(self):
        return self._name.upper()

# Patch property
@patch.object(User, 'name', new_callable=PropertyMock)
def test_user_name(mock_name):
    mock_name.return_value = "MOCKED"
    
    user = User("alice")
    assert user.name == "MOCKED"
```

## Partial Mocking

```python
from unittest.mock import Mock

class Calculator:
    def add(self, a, b):
        return a + b
    
    def subtract(self, a, b):
        return a - b
    
    def multiply(self, a, b):
        return a * b

# Mock only specific methods
calc = Calculator()
calc.multiply = Mock(return_value=100)

# Real methods work
assert calc.add(2, 3) == 5
assert calc.subtract(5, 3) == 2

# Mocked method returns fixed value
assert calc.multiply(2, 3) == 100
assert calc.multiply(10, 20) == 100
```

## Spies

```python
from unittest.mock import Mock

def process_data(data, callback):
    """Process data and call callback"""
    result = data * 2
    callback(result)
    return result

# Spy on callback
spy_callback = Mock()

result = process_data(5, spy_callback)

assert result == 10
spy_callback.assert_called_once_with(10)
```

## Mock Best Practices

```python
# ✅ GOOD - Mock external dependencies only
class UserService:
    def __init__(self, database, email_service):
        self.database = database
        self.email_service = email_service
    
    def create_user(self, username, email):
        user = self.database.save_user(username, email)
        self.email_service.send_welcome_email(email)
        return user

@patch.object(UserService, 'email_service')
@patch.object(UserService, 'database')
def test_create_user(mock_db, mock_email):
    mock_db.save_user.return_value = {"id": "user1", "username": "alice"}
    
    service = UserService(mock_db, mock_email)
    user = service.create_user("alice", "alice@example.com")
    
    assert user["username"] == "alice"
    mock_email.send_welcome_email.assert_called_once_with("alice@example.com")

# ❌ BAD - Mocking too much (over-mocking)
@patch('datetime.datetime')
@patch('random.randint')
@patch('os.path.exists')
@patch('json.dumps')
def test_simple_function(mock_json, mock_exists, mock_random, mock_datetime):
    # Too many mocks for simple function
    pass

# ✅ GOOD - Use spec to prevent typos
mock_api = Mock(spec=APIClient)
mock_api.get_user.return_value = {"name": "Alice"}

# This would raise AttributeError
# mock_api.get_usr()  # Typo caught

# ✅ GOOD - Clear mock names
mock_database = Mock()
mock_email_service = Mock()
mock_payment_gateway = Mock()

# ❌ BAD - Unclear names
mock1 = Mock()
mock2 = Mock()
m = Mock()
```

## Testing with Mocks

```python
import pytest
from unittest.mock import Mock, patch

class EmailService:
    def send_email(self, to, subject, body):
        # Real email sending
        pass

class UserService:
    def __init__(self, database, email_service):
        self.database = database
        self.email_service = email_service
    
    def register_user(self, username, email):
        if self.database.user_exists(email):
            raise ValueError("User already exists")
        
        user = self.database.create_user(username, email)
        self.email_service.send_email(
            to=email,
            subject="Welcome!",
            body=f"Welcome {username}!"
        )
        return user

# Test with mocks
def test_register_new_user():
    mock_db = Mock()
    mock_db.user_exists.return_value = False
    mock_db.create_user.return_value = {"id": "user1", "username": "alice"}
    
    mock_email = Mock(spec=EmailService)
    
    service = UserService(mock_db, mock_email)
    user = service.register_user("alice", "alice@example.com")
    
    assert user["username"] == "alice"
    mock_db.user_exists.assert_called_once_with("alice@example.com")
    mock_db.create_user.assert_called_once_with("alice", "alice@example.com")
    mock_email.send_email.assert_called_once()

def test_register_existing_user():
    mock_db = Mock()
    mock_db.user_exists.return_value = True
    mock_email = Mock()
    
    service = UserService(mock_db, mock_email)
    
    with pytest.raises(ValueError, match="User already exists"):
        service.register_user("alice", "alice@example.com")
    
    # Email should not be sent
    mock_email.send_email.assert_not_called()
```

## Summary

**Mocking Purposes:**
- Isolate code under test
- Replace slow/expensive operations
- Control test behavior
- Verify interactions
- Simulate errors

**Key Concepts:**
- `Mock`: Create test doubles
- `patch`: Replace objects temporarily
- `side_effect`: Control behavior
- `return_value`: Set return values
- `assert_called_*`: Verify calls
- `spec`: Ensure correct interface

**Best Practices:**
- Mock external dependencies only
- Use `spec` to catch errors
- Verify important interactions
- Don't over-mock
- Keep mocks simple
- Clear naming
- Reset mocks between tests

**When to Mock:**
- Database calls
- External APIs
- File operations
- Network requests
- Time-dependent code
- Random operations
- Email/SMS sending

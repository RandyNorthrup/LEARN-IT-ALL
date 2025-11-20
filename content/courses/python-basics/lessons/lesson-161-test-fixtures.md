---
id: "160-test-fixtures"
title: "Test Fixtures and Setup"
chapterId: ch12-testing
order: 9
duration: 25
objectives:
  - Create reusable test fixtures
  - Use setup and teardown methods
  - Manage test data effectively
  - Share fixtures across tests
---

# Test Fixtures and Setup

Fixtures provide consistent test environments and reusable test data.

## Basic Fixtures

```python
import pytest

# Simple fixture
@pytest.fixture
def sample_data():
    """Provide sample data for tests"""
    return [1, 2, 3, 4, 5]

# Use fixture in test
def test_sum(sample_data):
    assert sum(sample_data) == 15

def test_length(sample_data):
    assert len(sample_data) == 5

def test_first_element(sample_data):
    assert sample_data[0] == 1
```

## Fixture Scope

```python
# Function scope (default) - runs for each test
@pytest.fixture
def temp_file():
    """Create temp file for each test"""
    file = open("temp.txt", "w")
    file.write("test data")
    file.close()
    yield "temp.txt"
    # Cleanup
    import os
    os.remove("temp.txt")

# Module scope - runs once per module
@pytest.fixture(scope="module")
def database_connection():
    """Database connection shared by all tests in module"""
    db = connect_to_database()
    yield db
    db.close()

# Session scope - runs once for entire test session
@pytest.fixture(scope="session")
def test_config():
    """Configuration for entire test session"""
    return {
        "api_url": "http://test.example.com",
        "timeout": 30
    }

# Usage
def test_read_file(temp_file):
    with open(temp_file) as f:
        assert f.read() == "test data"

def test_query(database_connection):
    result = database_connection.query("SELECT 1")
    assert result is not None

def test_api_call(test_config):
    assert test_config["timeout"] == 30
```

## Fixture Dependencies

```python
@pytest.fixture
def database():
    """Create test database"""
    db = Database(":memory:")
    db.create_tables()
    return db

@pytest.fixture
def user(database):
    """Create test user (depends on database fixture)"""
    user = database.create_user("testuser", "test@example.com")
    return user

@pytest.fixture
def authenticated_session(user):
    """Create authenticated session (depends on user)"""
    session = Session()
    session.login(user.username, "password")
    return session

# Test uses nested fixtures
def test_user_profile(authenticated_session):
    profile = authenticated_session.get_profile()
    assert profile.username == "testuser"
```

## Fixture Factories

```python
@pytest.fixture
def make_user():
    """Fixture factory to create multiple users"""
    users = []
    
    def _make_user(username, email):
        user = User(username, email)
        users.append(user)
        return user
    
    yield _make_user
    
    # Cleanup all created users
    for user in users:
        user.delete()

# Use factory in test
def test_multiple_users(make_user):
    user1 = make_user("alice", "alice@example.com")
    user2 = make_user("bob", "bob@example.com")
    
    assert user1.username == "alice"
    assert user2.username == "bob"
```

## Parametrized Fixtures

```python
@pytest.fixture(params=["sqlite", "postgres", "mysql"])
def database_type(request):
    """Test with multiple database types"""
    return request.param

def test_database_operations(database_type):
    """This test runs 3 times, once for each database type"""
    db = create_database(database_type)
    assert db.is_connected()

# Parametrize with IDs
@pytest.fixture(params=[
    ("user1", "user1@example.com"),
    ("user2", "user2@example.com")
], ids=["first_user", "second_user"])
def user_data(request):
    return request.param

def test_user_creation(user_data):
    username, email = user_data
    user = User(username, email)
    assert user.username == username
    assert user.email == email
```

## Setup and Teardown

```python
import pytest

class TestUserService:
    """Test class with setup/teardown"""
    
    @pytest.fixture(autouse=True)
    def setup(self):
        """Runs before each test method"""
        self.service = UserService()
        self.service.connect()
        yield
        # Teardown
        self.service.disconnect()
        self.service.clear_cache()
    
    def test_create_user(self):
        user = self.service.create_user("alice")
        assert user.username == "alice"
    
    def test_get_user(self):
        self.service.create_user("bob")
        user = self.service.get_user("bob")
        assert user is not None

# Module-level setup/teardown
def setup_module(module):
    """Runs once before all tests in module"""
    print("\nSetting up module")
    module.test_data = {"key": "value"}

def teardown_module(module):
    """Runs once after all tests in module"""
    print("\nTearing down module")
    del module.test_data

# Class-level setup/teardown
class TestDatabase:
    @classmethod
    def setup_class(cls):
        """Runs once before all tests in class"""
        cls.db = Database(":memory:")
        cls.db.create_tables()
    
    @classmethod
    def teardown_class(cls):
        """Runs once after all tests in class"""
        cls.db.close()
    
    def test_insert(self):
        self.db.insert("users", {"name": "alice"})
        assert self.db.count("users") == 1
```

## Temporary Files and Directories

```python
import tempfile
import os

@pytest.fixture
def temp_dir():
    """Create temporary directory"""
    with tempfile.TemporaryDirectory() as tmpdir:
        yield tmpdir
        # Automatically cleaned up

@pytest.fixture
def temp_file():
    """Create temporary file"""
    fd, path = tempfile.mkstemp()
    os.close(fd)
    yield path
    os.remove(path)

# Use pytest's built-in tmp_path fixture
def test_write_file(tmp_path):
    """tmp_path is a pathlib.Path to temporary directory"""
    file = tmp_path / "test.txt"
    file.write_text("hello world")
    assert file.read_text() == "hello world"

# Use pytest's built-in tmpdir fixture
def test_create_file(tmpdir):
    """tmpdir is a py.path.local to temporary directory"""
    file = tmpdir.join("data.json")
    file.write('{"key": "value"}')
    assert file.read() == '{"key": "value"}'
```

## Database Fixtures

```python
import sqlite3

@pytest.fixture
def memory_db():
    """In-memory SQLite database"""
    conn = sqlite3.connect(":memory:")
    cursor = conn.cursor()
    
    # Create tables
    cursor.execute("""
        CREATE TABLE users (
            id INTEGER PRIMARY KEY,
            username TEXT NOT NULL,
            email TEXT NOT NULL
        )
    """)
    conn.commit()
    
    yield conn
    
    conn.close()

@pytest.fixture
def populated_db(memory_db):
    """Database with test data"""
    cursor = memory_db.cursor()
    
    test_users = [
        ("alice", "alice@example.com"),
        ("bob", "bob@example.com"),
        ("charlie", "charlie@example.com")
    ]
    
    cursor.executemany(
        "INSERT INTO users (username, email) VALUES (?, ?)",
        test_users
    )
    memory_db.commit()
    
    yield memory_db

def test_query_users(populated_db):
    cursor = populated_db.cursor()
    cursor.execute("SELECT COUNT(*) FROM users")
    count = cursor.fetchone()[0]
    assert count == 3

def test_insert_user(memory_db):
    cursor = memory_db.cursor()
    cursor.execute(
        "INSERT INTO users (username, email) VALUES (?, ?)",
        ("testuser", "test@example.com")
    )
    memory_db.commit()
    
    cursor.execute("SELECT username FROM users WHERE username = ?", ("testuser",))
    result = cursor.fetchone()
    assert result[0] == "testuser"
```

## Mock Data Fixtures

```python
@pytest.fixture
def sample_user():
    """Sample user for testing"""
    return {
        "id": "user123",
        "username": "testuser",
        "email": "test@example.com",
        "age": 30,
        "active": True
    }

@pytest.fixture
def sample_users():
    """Multiple sample users"""
    return [
        {"id": "user1", "username": "alice", "email": "alice@example.com"},
        {"id": "user2", "username": "bob", "email": "bob@example.com"},
        {"id": "user3", "username": "charlie", "email": "charlie@example.com"}
    ]

@pytest.fixture
def api_response():
    """Mock API response"""
    return {
        "status": "success",
        "data": {
            "users": [
                {"id": 1, "name": "Alice"},
                {"id": 2, "name": "Bob"}
            ]
        },
        "metadata": {
            "page": 1,
            "total": 2
        }
    }

def test_parse_users(api_response):
    users = parse_api_response(api_response)
    assert len(users) == 2
    assert users[0]["name"] == "Alice"
```

## Fixture Composition

```python
@pytest.fixture
def app_config():
    """Application configuration"""
    return {
        "database": "test.db",
        "debug": True,
        "port": 5000
    }

@pytest.fixture
def database(app_config):
    """Database using config"""
    db = Database(app_config["database"])
    db.connect()
    yield db
    db.close()

@pytest.fixture
def app(app_config, database):
    """Application with config and database"""
    app = Application(app_config)
    app.set_database(database)
    yield app
    app.shutdown()

@pytest.fixture
def client(app):
    """Test client for application"""
    return app.test_client()

# Test uses composed fixtures
def test_api_endpoint(client):
    response = client.get("/users")
    assert response.status_code == 200
```

## Sharing Fixtures with conftest.py

```python
# conftest.py - fixtures available to all tests
import pytest

@pytest.fixture
def database():
    """Shared database fixture"""
    db = Database(":memory:")
    db.create_tables()
    yield db
    db.close()

@pytest.fixture
def api_client():
    """Shared API client"""
    client = APIClient("http://test.example.com")
    yield client
    client.close()

# test_users.py - uses shared fixtures
def test_create_user(database):
    user = database.create_user("alice")
    assert user.username == "alice"

# test_api.py - also uses shared fixtures
def test_get_users(api_client):
    response = api_client.get("/users")
    assert response.status == 200
```

## Autouse Fixtures

```python
@pytest.fixture(autouse=True)
def reset_singleton():
    """Automatically reset singleton before each test"""
    Singleton.reset()
    yield
    Singleton.reset()

@pytest.fixture(autouse=True, scope="session")
def setup_logging():
    """Configure logging once for all tests"""
    import logging
    logging.basicConfig(level=logging.DEBUG)

# Tests automatically use these fixtures
def test_singleton():
    s1 = Singleton.instance()
    s2 = Singleton.instance()
    assert s1 is s2
```

## Fixture Best Practices

```python
# ✅ GOOD - Clear, focused fixtures
@pytest.fixture
def user():
    return User("testuser", "test@example.com")

@pytest.fixture
def admin_user():
    user = User("admin", "admin@example.com")
    user.grant_admin()
    return user

# ❌ BAD - Too complex, does too much
@pytest.fixture
def everything():
    db = setup_database()
    users = create_test_users(db)
    app = start_application(db)
    client = app.test_client()
    return db, users, app, client  # Too many things

# ✅ GOOD - Compose fixtures
@pytest.fixture
def database():
    db = Database(":memory:")
    db.create_tables()
    yield db
    db.close()

@pytest.fixture
def test_users(database):
    return create_test_users(database)

@pytest.fixture
def application(database):
    app = Application()
    app.set_database(database)
    yield app
    app.shutdown()

# ✅ GOOD - Named clearly
@pytest.fixture
def authenticated_user_session():
    """More descriptive than just 'session'"""
    pass

# ✅ GOOD - Document fixtures
@pytest.fixture
def api_client():
    """
    HTTP client for testing API endpoints.
    
    Automatically closes connection after test.
    """
    client = HTTPClient()
    yield client
    client.close()
```

## Summary

**Fixture Benefits:**
- Reusable test setup
- Clean test code
- Consistent test environment
- Automatic cleanup
- Easy dependency injection

**Fixture Scopes:**
- `function` (default): Runs for each test
- `class`: Runs once per test class
- `module`: Runs once per module
- `session`: Runs once for entire test session

**Best Practices:**
- Keep fixtures focused and simple
- Use appropriate scope
- Compose fixtures for complex setups
- Clean up resources in teardown
- Share fixtures via conftest.py
- Document fixture purpose
- Use descriptive names
- Parametrize for multiple scenarios

**Common Fixtures:**
- Database connections
- Test data
- Mock objects
- Temporary files
- Configuration
- Application instances
- API clients
- User sessions

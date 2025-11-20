---
id: "163-integration-testing"
title: "Integration Testing"
chapterId: ch12-testing
order: 12
duration: 25
objectives:
  - Write integration tests
  - Test component interactions
  - Set up test environments
  - Test database operations
---

# Integration Testing

Integration tests verify that multiple components work together correctly.

## Unit vs Integration Tests

```python
# Unit test - tests single function in isolation
def test_calculate_total_unit():
    items = [
        {"price": 10, "quantity": 2},
        {"price": 5, "quantity": 3}
    ]
    total = calculate_total(items)
    assert total == 35

# Integration test - tests multiple components
def test_order_processing_integration():
    # Create order (database)
    order = create_order(user_id="user1")
    
    # Add items (database)
    add_item(order.id, product_id="prod1", quantity=2)
    add_item(order.id, product_id="prod2", quantity=1)
    
    # Calculate total (business logic + database)
    total = calculate_order_total(order.id)
    
    # Process payment (external service)
    payment = process_payment(order.id, total)
    
    # Verify entire flow
    assert payment.status == "completed"
    assert get_order_status(order.id) == "paid"
```

## Database Integration Tests

```python
import pytest
import sqlite3

@pytest.fixture(scope="function")
def test_db():
    """Create test database for each test"""
    conn = sqlite3.connect(":memory:")
    cursor = conn.cursor()
    
    # Create schema
    cursor.execute("""
        CREATE TABLE users (
            id INTEGER PRIMARY KEY,
            username TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL
        )
    """)
    
    cursor.execute("""
        CREATE TABLE orders (
            id INTEGER PRIMARY KEY,
            user_id INTEGER NOT NULL,
            total REAL NOT NULL,
            status TEXT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    """)
    
    conn.commit()
    yield conn
    conn.close()

class UserRepository:
    def __init__(self, conn):
        self.conn = conn
    
    def create_user(self, username, email):
        cursor = self.conn.cursor()
        cursor.execute(
            "INSERT INTO users (username, email) VALUES (?, ?)",
            (username, email)
        )
        self.conn.commit()
        return cursor.lastrowid
    
    def get_user(self, user_id):
        cursor = self.conn.cursor()
        cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
        row = cursor.fetchone()
        if row:
            return {"id": row[0], "username": row[1], "email": row[2]}
        return None

class OrderRepository:
    def __init__(self, conn):
        self.conn = conn
    
    def create_order(self, user_id, total):
        cursor = self.conn.cursor()
        cursor.execute(
            "INSERT INTO orders (user_id, total, status) VALUES (?, ?, ?)",
            (user_id, total, "pending")
        )
        self.conn.commit()
        return cursor.lastrowid

# Integration tests
def test_create_user_and_order(test_db):
    """Test user and order creation together"""
    user_repo = UserRepository(test_db)
    order_repo = OrderRepository(test_db)
    
    # Create user
    user_id = user_repo.create_user("alice", "alice@example.com")
    assert user_id is not None
    
    # Verify user exists
    user = user_repo.get_user(user_id)
    assert user["username"] == "alice"
    
    # Create order for user
    order_id = order_repo.create_order(user_id, 100.0)
    assert order_id is not None
    
    # Verify order in database
    cursor = test_db.cursor()
    cursor.execute("SELECT * FROM orders WHERE id = ?", (order_id,))
    order = cursor.fetchone()
    assert order[1] == user_id
    assert order[2] == 100.0
```

## API Integration Tests

```python
import requests
from flask import Flask, jsonify, request

# Simple API
app = Flask(__name__)

users = {}
next_id = 1

@app.route("/users", methods=["POST"])
def create_user():
    global next_id
    data = request.json
    user = {
        "id": next_id,
        "username": data["username"],
        "email": data["email"]
    }
    users[next_id] = user
    next_id += 1
    return jsonify(user), 201

@app.route("/users/<int:user_id>", methods=["GET"])
def get_user(user_id):
    user = users.get(user_id)
    if user:
        return jsonify(user)
    return jsonify({"error": "User not found"}), 404

# Integration tests
@pytest.fixture
def api_client():
    """Test client for API"""
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client
    # Cleanup
    users.clear()
    global next_id
    next_id = 1

def test_create_and_get_user(api_client):
    """Test creating and retrieving user via API"""
    # Create user
    response = api_client.post(
        "/users",
        json={"username": "alice", "email": "alice@example.com"}
    )
    assert response.status_code == 201
    user_data = response.get_json()
    user_id = user_data["id"]
    
    # Get user
    response = api_client.get(f"/users/{user_id}")
    assert response.status_code == 200
    user = response.get_json()
    assert user["username"] == "alice"
    assert user["email"] == "alice@example.com"

def test_get_nonexistent_user(api_client):
    """Test getting user that doesn't exist"""
    response = api_client.get("/users/999")
    assert response.status_code == 404
    error = response.get_json()
    assert "not found" in error["error"].lower()
```

## File System Integration Tests

```python
import tempfile
import os
from pathlib import Path

class FileManager:
    """Manage file operations"""
    
    def __init__(self, base_dir):
        self.base_dir = Path(base_dir)
        self.base_dir.mkdir(exist_ok=True)
    
    def save_file(self, filename, content):
        file_path = self.base_dir / filename
        file_path.write_text(content)
        return str(file_path)
    
    def read_file(self, filename):
        file_path = self.base_dir / filename
        if file_path.exists():
            return file_path.read_text()
        return None
    
    def list_files(self):
        return [f.name for f in self.base_dir.iterdir() if f.is_file()]

@pytest.fixture
def temp_file_manager(tmp_path):
    """File manager with temporary directory"""
    manager = FileManager(tmp_path)
    yield manager
    # Cleanup handled by tmp_path fixture

def test_save_and_read_file(temp_file_manager):
    """Test file save and read integration"""
    # Save file
    path = temp_file_manager.save_file("test.txt", "Hello, World!")
    assert os.path.exists(path)
    
    # Read file
    content = temp_file_manager.read_file("test.txt")
    assert content == "Hello, World!"

def test_list_multiple_files(temp_file_manager):
    """Test listing multiple files"""
    temp_file_manager.save_file("file1.txt", "content1")
    temp_file_manager.save_file("file2.txt", "content2")
    temp_file_manager.save_file("file3.txt", "content3")
    
    files = temp_file_manager.list_files()
    assert len(files) == 3
    assert "file1.txt" in files
    assert "file2.txt" in files
    assert "file3.txt" in files
```

## External Service Integration

```python
import requests
from unittest.mock import patch

class WeatherService:
    """Service that calls external weather API"""
    
    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = "https://api.weather.com"
    
    def get_temperature(self, city):
        response = requests.get(
            f"{self.base_url}/current",
            params={"city": city, "key": self.api_key}
        )
        data = response.json()
        return data["temperature"]

class TemperatureAlert:
    """Send alert if temperature is extreme"""
    
    def __init__(self, weather_service, notification_service):
        self.weather = weather_service
        self.notifications = notification_service
    
    def check_and_alert(self, city, threshold=100):
        temp = self.weather.get_temperature(city)
        
        if temp > threshold:
            self.notifications.send_alert(
                f"High temperature in {city}: {temp}°F"
            )
            return True
        return False

# Integration test with mocked external service
@patch('requests.get')
def test_temperature_alert_integration(mock_get):
    """Test weather check and notification together"""
    # Mock weather API response
    mock_get.return_value.json.return_value = {
        "temperature": 105
    }
    
    # Real notification service (or mock)
    mock_notifications = Mock()
    
    # Create services
    weather = WeatherService("test_key")
    alert = TemperatureAlert(weather, mock_notifications)
    
    # Test integration
    result = alert.check_and_alert("Phoenix", threshold=100)
    
    assert result is True
    mock_notifications.send_alert.assert_called_once()
    call_args = mock_notifications.send_alert.call_args[0][0]
    assert "Phoenix" in call_args
    assert "105" in call_args
```

## Multi-Component Integration

```python
class Database:
    def __init__(self):
        self.users = {}
        self.sessions = {}
    
    def create_user(self, username, password_hash):
        user_id = len(self.users) + 1
        self.users[user_id] = {
            "id": user_id,
            "username": username,
            "password_hash": password_hash
        }
        return user_id
    
    def get_user_by_username(self, username):
        for user in self.users.values():
            if user["username"] == username:
                return user
        return None
    
    def create_session(self, user_id, token):
        self.sessions[token] = user_id

class AuthService:
    def __init__(self, database):
        self.db = database
    
    def register(self, username, password):
        # Hash password (simplified)
        password_hash = hash(password)
        user_id = self.db.create_user(username, password_hash)
        return user_id
    
    def login(self, username, password):
        user = self.db.get_user_by_username(username)
        if not user:
            return None
        
        # Verify password
        if user["password_hash"] == hash(password):
            token = f"token_{user['id']}"
            self.db.create_session(user["id"], token)
            return token
        return None

class UserService:
    def __init__(self, database, auth_service):
        self.db = database
        self.auth = auth_service
    
    def register_and_login(self, username, password):
        """Register user and automatically log in"""
        user_id = self.auth.register(username, password)
        token = self.auth.login(username, password)
        return {"user_id": user_id, "token": token}

# Integration test
def test_full_user_flow():
    """Test registration, login, and session creation together"""
    db = Database()
    auth = AuthService(db)
    user_service = UserService(db, auth)
    
    # Register and login
    result = user_service.register_and_login("alice", "password123")
    
    # Verify user created
    assert result["user_id"] is not None
    user = db.get_user_by_username("alice")
    assert user is not None
    assert user["username"] == "alice"
    
    # Verify session created
    assert result["token"] is not None
    assert result["token"] in db.sessions
    assert db.sessions[result["token"]] == result["user_id"]
```

## Test Data Management

```python
import json

class TestDataManager:
    """Manage test data for integration tests"""
    
    @staticmethod
    def load_test_users():
        """Load test user data"""
        return [
            {"username": "alice", "email": "alice@example.com", "role": "admin"},
            {"username": "bob", "email": "bob@example.com", "role": "user"},
            {"username": "charlie", "email": "charlie@example.com", "role": "user"}
        ]
    
    @staticmethod
    def load_test_products():
        """Load test product data"""
        return [
            {"id": 1, "name": "Product A", "price": 10.00},
            {"id": 2, "name": "Product B", "price": 20.00},
            {"id": 3, "name": "Product C", "price": 30.00}
        ]

@pytest.fixture
def populated_system(test_db):
    """System populated with test data"""
    data_manager = TestDataManager()
    
    # Add test users
    user_repo = UserRepository(test_db)
    for user_data in data_manager.load_test_users():
        user_repo.create_user(user_data["username"], user_data["email"])
    
    yield test_db

def test_with_populated_data(populated_system):
    """Test with pre-populated test data"""
    cursor = populated_system.cursor()
    cursor.execute("SELECT COUNT(*) FROM users")
    count = cursor.fetchone()[0]
    assert count == 3
```

## Integration Test Best Practices

```python
# ✅ GOOD - Test realistic scenarios
def test_complete_order_flow():
    """Test full order processing workflow"""
    # 1. Create user
    user = create_user("alice", "alice@example.com")
    
    # 2. Add items to cart
    cart = create_cart(user.id)
    add_to_cart(cart.id, product_id=1, quantity=2)
    add_to_cart(cart.id, product_id=2, quantity=1)
    
    # 3. Create order
    order = create_order_from_cart(cart.id)
    
    # 4. Process payment
    payment = process_payment(order.id, amount=30.00)
    
    # 5. Verify final state
    assert order.status == "completed"
    assert payment.status == "success"
    assert get_cart_items(cart.id) == []

# ✅ GOOD - Isolate tests with fixtures
@pytest.fixture(autouse=True)
def reset_database():
    """Reset database between integration tests"""
    db.clear_all_tables()
    yield
    db.clear_all_tables()

# ✅ GOOD - Test error scenarios
def test_order_with_insufficient_funds():
    """Test order failure with payment decline"""
    user = create_user("bob", "bob@example.com")
    order = create_order(user.id, total=1000.00)
    
    # Mock payment decline
    with patch('payment_service.charge') as mock_charge:
        mock_charge.side_effect = PaymentError("Insufficient funds")
        
        with pytest.raises(PaymentError):
            process_payment(order.id, amount=1000.00)
        
        # Verify order status
        order = get_order(order.id)
        assert order.status == "payment_failed"

# ❌ BAD - Testing too much at once
def test_entire_application():
    """Don't test everything in one test"""
    # This test is too broad
    test_user_registration()
    test_user_login()
    test_create_order()
    test_process_payment()
    test_send_email()
    # If this fails, hard to know what broke!
```

## Summary

**Integration Testing:**
- Tests multiple components together
- Verifies component interactions
- Uses real or test databases
- Tests with external services (mocked)
- Validates complete workflows

**Key Differences from Unit Tests:**
- Multiple components involved
- May use real databases/files
- Slower to run
- More complex setup
- Tests realistic scenarios

**Best Practices:**
- Use test databases (in-memory or separate)
- Clean up after each test
- Mock external services
- Test realistic workflows
- Keep tests independent
- Use fixtures for setup
- Test error scenarios
- Manage test data effectively

**When to Use:**
- Testing database operations
- API endpoint testing
- Multi-component workflows
- File system operations
- Service integration
- End-to-end scenarios

**Test Pyramid:**
- Many unit tests (fast, isolated)
- Some integration tests (medium speed)
- Few end-to-end tests (slow, comprehensive)

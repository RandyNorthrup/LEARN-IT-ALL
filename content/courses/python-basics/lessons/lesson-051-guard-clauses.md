---
id: "89-guard-clauses"
title: "Guard Clauses and Early Returns"
chapterId: ch4-comparisons
order: 11
duration: 20
objectives:
  - Master guard clause pattern
  - Reduce conditional nesting with early returns
  - Improve code readability and flow
  - Learn when to use guard clauses
---

# Guard Clauses and Early Returns

Guard clauses are conditional statements that handle edge cases early, allowing the main logic to stay clean and un-nested. This pattern dramatically improves code readability.

## The Problem: Deep Nesting

```python
# ❌ Deeply nested conditionals (hard to read!)
def process_order(order):
    """Process order with deep nesting."""
    if order is not None:
        if 'customer' in order:
            if order['customer'] is not None:
                if 'items' in order:
                    if len(order['items']) > 0:
                        if order.get('payment_method'):
                            # Finally! The actual logic
                            total = sum(item['price'] for item in order['items'])
                            return f"Processing ${total} order"
                        else:
                            return "No payment method"
                    else:
                        return "No items in order"
                else:
                    return "Missing items field"
            else:
                return "Customer is None"
        else:
            return "Missing customer field"
    else:
        return "Order is None"

# Test the nested version
order = {
    'customer': {'name': 'Alice'},
    'items': [{'price': 10}, {'price': 20}],
    'payment_method': 'credit_card'
}
print(process_order(order))
# Processing $30 order
```

## The Solution: Guard Clauses

```python
# ✅ Guard clauses (flat and readable!)
def process_order_guards(order):
    """Process order with guard clauses."""
    # Check each condition early and return
    if order is None:
        return "Order is None"
    
    if 'customer' not in order:
        return "Missing customer field"
    
    if order['customer'] is None:
        return "Customer is None"
    
    if 'items' not in order:
        return "Missing items field"
    
    if len(order['items']) == 0:
        return "No items in order"
    
    if not order.get('payment_method'):
        return "No payment method"
    
    # Main logic is clean and at the same indentation level
    total = sum(item['price'] for item in order['items'])
    return f"Processing ${total} order"

# Same test
print(process_order_guards(order))
# Processing $30 order

# Test error case
print(process_order_guards(None))
# Order is None
```

## Guard Clause Pattern

### Basic Structure

```python
def some_function(param):
    """Guard clause pattern."""
    # Guard 1: Handle invalid input
    if not param:
        return None
    
    # Guard 2: Handle edge case
    if param < 0:
        return "Negative value"
    
    # Guard 3: Handle another edge case
    if param > 100:
        return "Value too large"
    
    # Main logic (happy path)
    result = param * 2
    return result

print(some_function(50))   # 100
print(some_function(None)) # None
print(some_function(-5))   # Negative value
print(some_function(150))  # Value too large
```

### Multiple Validations

```python
def create_user(username, email, age):
    """Create user with validation guards."""
    # Guard: username validation
    if not username:
        return {"error": "Username required"}
    
    if len(username) < 3:
        return {"error": "Username too short"}
    
    if len(username) > 20:
        return {"error": "Username too long"}
    
    # Guard: email validation
    if not email:
        return {"error": "Email required"}
    
    if '@' not in email:
        return {"error": "Invalid email format"}
    
    # Guard: age validation
    if age is None:
        return {"error": "Age required"}
    
    if age < 13:
        return {"error": "Must be at least 13 years old"}
    
    if age > 120:
        return {"error": "Invalid age"}
    
    # All validations passed - create user
    user = {
        "username": username,
        "email": email,
        "age": age,
        "created": True
    }
    return user

# Test valid user
result = create_user("alice", "alice@example.com", 25)
print(result)
# {'username': 'alice', 'email': 'alice@example.com', 'age': 25, 'created': True}

# Test invalid cases
print(create_user("", "alice@example.com", 25))
# {'error': 'Username required'}

print(create_user("alice", "bad-email", 25))
# {'error': 'Invalid email format'}

print(create_user("alice", "alice@example.com", 10))
# {'error': 'Must be at least 13 years old'}
```

## Benefits of Guard Clauses

### 1. Improved Readability

```python
# ❌ Nested (following the happy path requires mental effort)
def calculate_discount(customer, purchase_amount):
    if customer:
        if customer.get('is_member'):
            if purchase_amount >= 100:
                return purchase_amount * 0.15
            else:
                return purchase_amount * 0.10
        else:
            return 0
    else:
        return 0

# ✅ Guards (happy path is obvious at the end)
def calculate_discount_guards(customer, purchase_amount):
    # Handle invalid/edge cases first
    if not customer:
        return 0
    
    if not customer.get('is_member'):
        return 0
    
    # Main business logic is clear
    if purchase_amount >= 100:
        return purchase_amount * 0.15
    
    return purchase_amount * 0.10

customer = {'is_member': True}
print(f"Discount: ${calculate_discount_guards(customer, 150)}")
# Discount: $22.5
```

### 2. Fail Fast Principle

```python
def process_payment(amount, card_number, cvv, expiry):
    """Process payment with fail-fast guards."""
    # Fail fast on invalid inputs
    if amount <= 0:
        raise ValueError("Amount must be positive")
    
    if not card_number or len(card_number) != 16:
        raise ValueError("Invalid card number")
    
    if not cvv or len(cvv) != 3:
        raise ValueError("Invalid CVV")
    
    if not expiry:
        raise ValueError("Expiry date required")
    
    # If we get here, all inputs are valid
    print(f"Processing payment of ${amount}")
    return {"success": True, "transaction_id": "TXN123"}

# Valid payment
try:
    result = process_payment(100, "1234567890123456", "123", "12/25")
    print(result)
except ValueError as e:
    print(f"Error: {e}")
# Processing payment of $100
# {'success': True, 'transaction_id': 'TXN123'}

# Invalid payment
try:
    result = process_payment(-50, "1234567890123456", "123", "12/25")
except ValueError as e:
    print(f"Error: {e}")
# Error: Amount must be positive
```

### 3. Easier Testing

```python
def send_notification(user, message):
    """Send notification with guards."""
    # Each guard is a testable condition
    if not user:
        return "No user provided"
    
    if not user.get('email'):
        return "User has no email"
    
    if not user.get('notifications_enabled', True):
        return "Notifications disabled"
    
    if not message:
        return "No message to send"
    
    if len(message) > 500:
        return "Message too long"
    
    # Send notification
    print(f"Sending to {user['email']}: {message[:50]}...")
    return "Sent"

# Test each guard condition independently
def test_notifications():
    """Test all guard conditions."""
    # Test 1: No user
    assert send_notification(None, "Hi") == "No user provided"
    
    # Test 2: No email
    assert send_notification({}, "Hi") == "User has no email"
    
    # Test 3: Notifications disabled
    user = {'email': 'test@test.com', 'notifications_enabled': False}
    assert send_notification(user, "Hi") == "Notifications disabled"
    
    # Test 4: No message
    user = {'email': 'test@test.com'}
    assert send_notification(user, "") == "No message to send"
    
    # Test 5: Message too long
    long_msg = "x" * 501
    assert send_notification(user, long_msg) == "Message too long"
    
    # Test 6: Success
    assert send_notification(user, "Hello!") == "Sent"
    
    print("All tests passed!")

test_notifications()
# Sending to test@test.com: Hello!...
# All tests passed!
```

## Guard Clauses with Loops

```python
def find_user_by_email(users, email):
    """Find user with guard clauses."""
    # Guard: validate inputs
    if not users:
        return None
    
    if not email:
        return None
    
    # Guard: check for valid email format
    if '@' not in email:
        return None
    
    # Main logic: search
    for user in users:
        # Guard: skip invalid user entries
        if not user or 'email' not in user:
            continue
        
        if user['email'] == email:
            return user
    
    return None

users = [
    {'name': 'Alice', 'email': 'alice@example.com'},
    None,  # Invalid entry
    {'name': 'Bob'},  # Missing email
    {'name': 'Charlie', 'email': 'charlie@example.com'}
]

result = find_user_by_email(users, 'charlie@example.com')
print(result)
# {'name': 'Charlie', 'email': 'charlie@example.com'}

print(find_user_by_email([], 'test@test.com'))
# None
```

## Combining Guards with Logic

```python
def process_file(filepath):
    """Process file with comprehensive guards."""
    import os
    
    # Guard: file path validation
    if not filepath:
        return "No file path provided"
    
    # Guard: file exists
    if not os.path.exists(filepath):
        return "File does not exist"
    
    # Guard: is a file (not directory)
    if not os.path.isfile(filepath):
        return "Path is not a file"
    
    # Guard: check file extension
    if not filepath.endswith('.txt'):
        return "Only .txt files supported"
    
    # Guard: file size check
    file_size = os.path.getsize(filepath)
    if file_size == 0:
        return "File is empty"
    
    if file_size > 10 * 1024 * 1024:  # 10MB
        return "File too large (max 10MB)"
    
    # All checks passed - process file
    with open(filepath, 'r') as f:
        content = f.read()
        lines = content.split('\n')
        return f"Processed {len(lines)} lines"

# Would work with real files
# print(process_file('/path/to/file.txt'))
```

## When NOT to Use Guard Clauses

```python
# ❌ Don't overuse guards for normal business logic
def calculate_price_bad(base_price, is_member, quantity):
    """Overusing guards."""
    if not is_member:
        return base_price * quantity
    
    if quantity < 10:
        return base_price * quantity * 0.95
    
    if quantity < 50:
        return base_price * quantity * 0.90
    
    return base_price * quantity * 0.85

# ✅ Use normal if-elif for business logic branches
def calculate_price_good(base_price, is_member, quantity):
    """Appropriate use of conditionals."""
    # Guard: only for validation
    if base_price <= 0 or quantity <= 0:
        raise ValueError("Invalid input")
    
    # Calculate base total
    total = base_price * quantity
    
    # Apply discount if member
    if is_member:
        if quantity >= 50:
            discount = 0.15
        elif quantity >= 10:
            discount = 0.10
        else:
            discount = 0.05
        
        total *= (1 - discount)
    
    return total

print(f"${calculate_price_good(10, True, 25)}")
# $225.0
```

## Guard Clauses in Classes

```python
class BankAccount:
    """Bank account with guard clauses."""
    
    def __init__(self, account_number, initial_balance=0):
        self.account_number = account_number
        self.balance = initial_balance
        self.is_active = True
    
    def deposit(self, amount):
        """Deposit money with guards."""
        # Guard: check account status
        if not self.is_active:
            return "Account is not active"
        
        # Guard: validate amount
        if amount is None:
            return "Amount cannot be None"
        
        if amount <= 0:
            return "Amount must be positive"
        
        # Perform deposit
        self.balance += amount
        return f"Deposited ${amount}. New balance: ${self.balance}"
    
    def withdraw(self, amount):
        """Withdraw money with guards."""
        # Guard: check account status
        if not self.is_active:
            return "Account is not active"
        
        # Guard: validate amount
        if amount is None:
            return "Amount cannot be None"
        
        if amount <= 0:
            return "Amount must be positive"
        
        # Guard: sufficient funds
        if amount > self.balance:
            return f"Insufficient funds. Balance: ${self.balance}"
        
        # Perform withdrawal
        self.balance -= amount
        return f"Withdrew ${amount}. New balance: ${self.balance}"
    
    def close_account(self):
        """Close account with guards."""
        # Guard: already closed
        if not self.is_active:
            return "Account already closed"
        
        # Guard: outstanding balance
        if self.balance > 0:
            return f"Cannot close account with balance ${self.balance}"
        
        # Close account
        self.is_active = False
        return "Account closed"

# Usage
account = BankAccount("ACC123", 100)

print(account.deposit(50))
# Deposited $50. New balance: $150

print(account.withdraw(200))
# Insufficient funds. Balance: $150

print(account.withdraw(50))
# Withdrew $50. New balance: $100

print(account.deposit(-10))
# Amount must be positive
```

## Summary

**Guard Clause Benefits:**
- ✅ Reduces nesting depth
- ✅ Improves readability
- ✅ Makes happy path obvious
- ✅ Fails fast on invalid input
- ✅ Easier to test each condition
- ✅ Easier to add new validations

**Guard Clause Pattern:**
1. **Validate inputs first** - Check for None, empty, invalid
2. **Check preconditions** - Permissions, state, requirements
3. **Handle edge cases** - Boundary conditions, special cases
4. **Main logic last** - Happy path with minimal nesting

**When to Use:**
- ✅ Input validation
- ✅ Precondition checking
- ✅ Handling null/empty cases
- ✅ Permission checks
- ✅ State validation

**When NOT to Use:**
- ❌ Normal business logic branches
- ❌ Mutually exclusive options
- ❌ Complex decision trees
- ❌ When multiple conditions lead to same action

Guard clauses are one of the most powerful patterns for writing clean, maintainable conditional code. Use them liberally for validation and edge cases!

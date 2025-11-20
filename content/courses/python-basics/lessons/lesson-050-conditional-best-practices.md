---
id: "88-conditional-best-practices"
title: "Conditional Best Practices"
chapterId: ch4-comparisons
order: 10
duration: 25
objectives:
  - Learn best practices for writing conditionals
  - Avoid common conditional anti-patterns
  - Write maintainable and testable conditional code
  - Understand when to refactor conditionals
---

# Conditional Best Practices

Writing good conditional code is essential for maintainability. Learn industry-standard practices and common pitfalls to avoid.

## Keep Conditions Simple and Readable

### Use Meaningful Names

```python
# ❌ Unclear variable names
if x and y and not z:
    do_something()

# ✅ Clear, descriptive names
is_authenticated = True
has_permission = True
is_banned = False

if is_authenticated and has_permission and not is_banned:
    allow_access()

# Function example
def can_user_edit_post(user, post):
    """Check if user can edit post."""
    is_author = user.id == post.author_id
    is_admin = user.role == 'admin'
    is_moderator = user.role == 'moderator'
    
    return is_author or is_admin or is_moderator

# Usage is self-documenting
user = {'id': 1, 'role': 'admin'}
post = {'author_id': 2}

if can_user_edit_post(user, post):
    print("Can edit")
```

### Extract Complex Conditions

```python
# ❌ Complex inline condition
def process_order(order):
    if (order.get('total', 0) > 100 and 
        order.get('customer', {}).get('is_premium', False) and 
        order.get('items') and 
        len(order.get('items', [])) > 0 and
        not order.get('is_cancelled', False)):
        return "Process order"
    return "Cannot process"

# ✅ Extract to well-named variables
def process_order_clean(order):
    """Process order if eligible."""
    # Extract conditions with clear names
    is_high_value = order.get('total', 0) > 100
    is_premium_customer = order.get('customer', {}).get('is_premium', False)
    has_items = len(order.get('items', [])) > 0
    is_active = not order.get('is_cancelled', False)
    
    # Clear combined condition
    can_process = is_high_value and is_premium_customer and has_items and is_active
    
    if can_process:
        return "Process order"
    return "Cannot process"

order = {
    'total': 150,
    'customer': {'is_premium': True},
    'items': ['item1'],
    'is_cancelled': False
}

print(process_order_clean(order))
# Process order
```

## Avoid Deep Nesting

### Use Guard Clauses

```python
# ❌ Deep nesting
def calculate_discount(user, cart):
    if user:
        if user.get('is_member'):
            if cart:
                if cart.get('total', 0) > 50:
                    return cart['total'] * 0.10
                else:
                    return 0
            else:
                return 0
        else:
            return 0
    else:
        return 0

# ✅ Guard clauses (early returns)
def calculate_discount_flat(user, cart):
    """Calculate discount with guard clauses."""
    # Check invalid cases first, return early
    if not user:
        return 0
    
    if not user.get('is_member'):
        return 0
    
    if not cart:
        return 0
    
    if cart.get('total', 0) <= 50:
        return 0
    
    # Happy path at the end
    return cart['total'] * 0.10

user = {'is_member': True}
cart = {'total': 100}

print(f"Discount: ${calculate_discount_flat(user, cart)}")
# Discount: $10.0
```

### Invert Conditions When Beneficial

```python
# ❌ Nested positive conditions
def send_email(user):
    if user:
        if user.get('email'):
            if user.get('email_verified'):
                send_message(user['email'])
                return "Sent"
    return "Cannot send"

# ✅ Inverted conditions (check negatives first)
def send_email_clean(user):
    """Send email with inverted guards."""
    if not user or not user.get('email') or not user.get('email_verified'):
        return "Cannot send"
    
    send_message(user['email'])
    return "Sent"

def send_message(email):
    """Mock send function."""
    print(f"Sending to {email}")

user = {'email': 'test@example.com', 'email_verified': True}
print(send_email_clean(user))
# Sending to test@example.com
# Sent
```

## Prefer Positive Conditions

```python
# ❌ Negative conditions (harder to read)
def process_item(item):
    if not item.get('is_invalid'):
        if not item.get('is_expired'):
            return "Process item"
    return "Cannot process"

# ✅ Positive conditions (easier to read)
def process_item_positive(item):
    """Process item with positive conditions."""
    is_valid = not item.get('is_invalid', False)
    is_current = not item.get('is_expired', False)
    
    if is_valid and is_current:
        return "Process item"
    return "Cannot process"

item = {'is_invalid': False, 'is_expired': False}
print(process_item_positive(item))
# Process item
```

## Avoid Magic Numbers

```python
# ❌ Magic numbers
def categorize_age(age):
    if age < 13:
        return "Child"
    elif age < 20:
        return "Teen"
    elif age < 60:
        return "Adult"
    else:
        return "Senior"

# ✅ Named constants
CHILD_MAX_AGE = 12
TEEN_MAX_AGE = 19
ADULT_MAX_AGE = 59

def categorize_age_clear(age):
    """Categorize age with named constants."""
    if age <= CHILD_MAX_AGE:
        return "Child"
    elif age <= TEEN_MAX_AGE:
        return "Teen"
    elif age <= ADULT_MAX_AGE:
        return "Adult"
    else:
        return "Senior"

print(categorize_age_clear(15))  # Teen
print(categorize_age_clear(65))  # Senior

# Even better: configuration
AGE_CATEGORIES = [
    (12, "Child"),
    (19, "Teen"),
    (59, "Adult"),
    (float('inf'), "Senior")
]

def categorize_age_config(age):
    """Categorize using configuration."""
    for max_age, category in AGE_CATEGORIES:
        if age <= max_age:
            return category
    return "Unknown"

print(categorize_age_config(25))  # Adult
```

## Be Explicit with Boolean Comparisons

```python
# When to be explicit vs implicit
def check_user_status(user):
    """Demonstrate explicit vs implicit."""
    
    # ✅ Implicit for truthiness (preferred)
    if user:
        print("User exists")
    
    # ✅ Implicit for collections
    items = user.get('items', [])
    if items:
        print(f"Has {len(items)} items")
    
    # ✅ Explicit for None checks
    email = user.get('email')
    if email is None:
        print("No email")
    
    # ✅ Explicit for False/True checks (when False is valid value)
    email_verified = user.get('email_verified')
    if email_verified is True:
        print("Email verified")
    elif email_verified is False:
        print("Email not verified")
    else:
        print("Email verification unknown")
    
    # ❌ Don't compare booleans to True/False unnecessarily
    is_active = user.get('is_active', True)
    if is_active == True:  # Redundant
        print("Active")
    
    # ✅ Direct boolean check
    if is_active:
        print("Active")

user = {
    'items': ['item1'],
    'email': None,
    'email_verified': False,
    'is_active': True
}

check_user_status(user)
# User exists
# Has 1 items
# No email
# Email not verified
# Active
# Active
```

## Handle Edge Cases

```python
def divide_numbers(a, b):
    """Division with comprehensive edge case handling."""
    # Handle None inputs
    if a is None or b is None:
        return None
    
    # Handle zero division
    if b == 0:
        return None
    
    # Handle infinity
    if abs(a) == float('inf') or abs(b) == float('inf'):
        return None
    
    # Perform division
    return a / b

print(divide_numbers(10, 2))      # 5.0
print(divide_numbers(10, 0))      # None
print(divide_numbers(None, 5))    # None
print(divide_numbers(10, float('inf')))  # None

# List operations with edge cases
def get_first_item(items):
    """Get first item safely."""
    # Handle None
    if items is None:
        return None
    
    # Handle empty collection
    if not items:
        return None
    
    # Return first item
    return items[0]

print(get_first_item([1, 2, 3]))  # 1
print(get_first_item([]))         # None
print(get_first_item(None))       # None
```

## Consistent Return Types

```python
# ❌ Inconsistent return types
def get_user_age(user):
    """Bad: returns int or string."""
    if user and 'age' in user:
        return user['age']
    return "Unknown"  # Inconsistent!

# ✅ Consistent return types
def get_user_age_consistent(user):
    """Good: always returns int or None."""
    if user and 'age' in user:
        return user['age']
    return None

# ✅ Use default value for consistency
def get_user_age_default(user, default=0):
    """Returns int with default."""
    if user and 'age' in user:
        return user['age']
    return default

print(get_user_age_consistent({'age': 25}))  # 25
print(get_user_age_consistent(None))         # None
print(get_user_age_default(None, default=0)) # 0
```

## Avoid Boolean Parameters

```python
# ❌ Boolean parameters (unclear at call site)
def create_user(name, email, flag):
    """What does flag mean?"""
    if flag:
        # Send welcome email
        print(f"Welcome email sent to {email}")
    else:
        # Don't send
        pass

create_user("Alice", "alice@test.com", True)  # What does True mean here?

# ✅ Named parameters or enums
def create_user_clear(name, email, send_welcome_email=False):
    """Clear parameter name."""
    if send_welcome_email:
        print(f"Welcome email sent to {email}")

create_user_clear("Alice", "alice@test.com", send_welcome_email=True)
# Now it's clear!

# ✅ Even better: separate functions
def create_user_with_welcome(name, email):
    """Create user and send welcome."""
    create_basic_user(name, email)
    send_welcome_email(email)

def create_basic_user(name, email):
    """Create user without welcome."""
    print(f"User {name} created")

def send_welcome_email(email):
    """Send welcome email."""
    print(f"Welcome email sent to {email}")

create_user_with_welcome("Bob", "bob@test.com")
# User Bob created
# Welcome email sent to bob@test.com
```

## Use Polymorphism Instead of Type Checking

```python
# ❌ Type checking with conditionals
def process_payment(payment):
    """Process different payment types."""
    if payment['type'] == 'credit_card':
        print(f"Processing credit card: {payment['card_number']}")
    elif payment['type'] == 'paypal':
        print(f"Processing PayPal: {payment['email']}")
    elif payment['type'] == 'crypto':
        print(f"Processing crypto: {payment['wallet']}")

# ✅ Use polymorphism (classes with common interface)
class Payment:
    """Base payment class."""
    def process(self):
        raise NotImplementedError

class CreditCardPayment(Payment):
    def __init__(self, card_number):
        self.card_number = card_number
    
    def process(self):
        print(f"Processing credit card: {self.card_number}")

class PayPalPayment(Payment):
    def __init__(self, email):
        self.email = email
    
    def process(self):
        print(f"Processing PayPal: {self.email}")

class CryptoPayment(Payment):
    def __init__(self, wallet):
        self.wallet = wallet
    
    def process(self):
        print(f"Processing crypto: {self.wallet}")

# Usage: no conditionals needed!
def process_payment_polymorphic(payment):
    """Process any payment type."""
    payment.process()

credit_card = CreditCardPayment("1234-5678-9012-3456")
paypal = PayPalPayment("user@paypal.com")
crypto = CryptoPayment("0x1234abcd")

process_payment_polymorphic(credit_card)
process_payment_polymorphic(paypal)
process_payment_polymorphic(crypto)
```

## Test Conditional Logic

```python
def is_eligible_for_discount(user, cart):
    """Check discount eligibility."""
    # Business rules
    is_member = user.get('membership_level') in ['gold', 'platinum']
    high_value_cart = cart.get('total', 0) >= 100
    first_purchase = cart.get('is_first_purchase', False)
    
    return is_member and (high_value_cart or first_purchase)

# Comprehensive test cases
def test_discount_eligibility():
    """Test all branches."""
    # Test 1: Member with high-value cart
    user1 = {'membership_level': 'gold'}
    cart1 = {'total': 150}
    assert is_eligible_for_discount(user1, cart1) == True
    
    # Test 2: Member with first purchase
    user2 = {'membership_level': 'platinum'}
    cart2 = {'total': 50, 'is_first_purchase': True}
    assert is_eligible_for_discount(user2, cart2) == True
    
    # Test 3: Non-member
    user3 = {'membership_level': 'basic'}
    cart3 = {'total': 150}
    assert is_eligible_for_discount(user3, cart3) == False
    
    # Test 4: Member with low cart, not first purchase
    user4 = {'membership_level': 'gold'}
    cart4 = {'total': 50, 'is_first_purchase': False}
    assert is_eligible_for_discount(user4, cart4) == False
    
    print("All tests passed!")

test_discount_eligibility()
# All tests passed!
```

## Document Complex Logic

```python
def calculate_shipping_cost(weight, distance, is_express, is_international):
    """
    Calculate shipping cost based on multiple factors.
    
    Args:
        weight: Package weight in kg
        distance: Shipping distance in km
        is_express: Whether express shipping is requested
        is_international: Whether shipping internationally
    
    Returns:
        Shipping cost in dollars
    
    Business Rules:
        - Base rate: $5 + ($0.50 per kg)
        - Distance surcharge: $0.01 per km over 100km
        - Express: 2x the base rate
        - International: additional $20 flat fee
    """
    # Base rate calculation
    base_rate = 5.0 + (weight * 0.50)
    
    # Distance surcharge (only for distances > 100km)
    distance_charge = max(0, distance - 100) * 0.01
    
    # Calculate total before modifiers
    subtotal = base_rate + distance_charge
    
    # Apply express multiplier if requested
    if is_express:
        subtotal *= 2
    
    # Add international fee if applicable
    if is_international:
        subtotal += 20.0
    
    return round(subtotal, 2)

# Examples with clear scenarios
print(f"Domestic, standard: ${calculate_shipping_cost(2, 50, False, False)}")
# Domestic, standard: $6.0

print(f"Domestic, express: ${calculate_shipping_cost(2, 50, True, False)}")
# Domestic, express: $12.0

print(f"International: ${calculate_shipping_cost(2, 50, False, True)}")
# International: $26.0
```

## Summary

**Core Principles:**
1. **Readability First** - Code is read more than written
2. **Avoid Nesting** - Use guard clauses and early returns
3. **Be Explicit** - Clear variable names and intentions
4. **Handle Edge Cases** - Null checks, empty collections, boundary values
5. **Test Thoroughly** - Cover all conditional branches

**Best Practices:**
- ✅ Extract complex conditions to named variables
- ✅ Use guard clauses to reduce nesting
- ✅ Prefer positive conditions over negative
- ✅ Use named constants instead of magic numbers
- ✅ Keep return types consistent
- ✅ Document complex business logic
- ✅ Test all conditional branches

**Anti-Patterns to Avoid:**
- ❌ Deep nesting (> 3 levels)
- ❌ Magic numbers without explanation
- ❌ Boolean parameters (unclear at call site)
- ❌ Type checking instead of polymorphism
- ❌ Comparing booleans to True/False
- ❌ Complex inline conditions

Following these practices makes your code easier to read, maintain, test, and debug!

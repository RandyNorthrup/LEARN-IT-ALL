---
id: logical-operators
title: Logical Operators and Boolean Logic
chapterId: ch4-comparisons
order: 3
duration: 25
objectives:
  - Master and, or, not operators
  - Understand short-circuit evaluation
  - Learn operator precedence
  - Combine multiple conditions effectively
---

# Logical Operators and Boolean Logic

Logical operators combine multiple conditions to create complex decision-making logic. They're essential for writing sophisticated conditional statements.

## The Three Logical Operators

### 1. and Operator

Returns `True` only if **both** conditions are True:

```python
print(True and True)    # True
print(True and False)   # False
print(False and True)   # False
print(False and False)  # False
```

Practical examples:

```python
age = 25
has_license = True

if age >= 18 and has_license:
    print("Can drive")

temperature = 22
if temperature > 15 and temperature < 30:
    print("Perfect weather")

# Better with chaining
if 15 < temperature < 30:
    print("Perfect weather")
```

### 2. or Operator

Returns `True` if **at least one** condition is True:

```python
print(True or True)     # True
print(True or False)    # True
print(False or True)    # True
print(False or False)   # False
```

Practical examples:

```python
is_weekend = True
is_holiday = False

if is_weekend or is_holiday:
    print("Day off!")

age = 15
if age < 13 or age > 65:
    print("Discount eligible")

day = "Saturday"
if day == "Saturday" or day == "Sunday":
    print("Weekend")
```

### 3. not Operator

Reverses the boolean value:

```python
print(not True)   # False
print(not False)  # True
```

Practical examples:

```python
is_raining = False
if not is_raining:
    print("Go outside")

user_logged_in = True
if not user_logged_in:
    print("Please log in")

items = []
if not items:  # Empty list is falsy
    print("Cart is empty")
```

## Combining Multiple Operators

You can combine `and`, `or`, and `not`:

```python
age = 25
has_license = True
has_insurance = True

if age >= 18 and has_license and has_insurance:
    print("Can rent a car")

is_admin = False
is_moderator = True
is_owner = False

if is_admin or is_moderator or is_owner:
    print("Can delete posts")

is_logged_in = True
is_banned = False

if is_logged_in and not is_banned:
    print("Welcome!")
```

## Operator Precedence

Logical operators have precedence order:

1. **not** (highest)
2. **and**
3. **or** (lowest)

```python
# Evaluated as: (not False) and (True or False)
result = not False and True or False
# True and True or False
# True or False
# True
print(result)  # True
```

Use parentheses for clarity:

```python
# Without parentheses (confusing)
if age > 18 and has_license or is_employee:
    pass

# With parentheses (clear intent)
if (age > 18 and has_license) or is_employee:
    pass
```

## Short-Circuit Evaluation

Python uses short-circuit evaluation for efficiency:

### and Short-Circuit

If first condition is False, second is **not evaluated**:

```python
def expensive_check():
    print("Expensive check called")
    return True

x = 5
# Second function never called because x > 10 is False
if x > 10 and expensive_check():
    print("Both true")
# Nothing printed - expensive_check() never called
```

### or Short-Circuit

If first condition is True, second is **not evaluated**:

```python
def expensive_check():
    print("Expensive check called")
    return False

x = 15
# Second function never called because x > 10 is True
if x > 10 or expensive_check():
    print("At least one true")
# Prints: "At least one true"
# expensive_check() never called
```

## Truthiness and Falsiness

Python treats many values as True or False in boolean context:

### Falsy Values

These evaluate to False:

```python
# Numbers
print(bool(0))        # False
print(bool(0.0))      # False

# Empty collections
print(bool(""))       # False (empty string)
print(bool([]))       # False (empty list)
print(bool({}))       # False (empty dict)
print(bool(set()))    # False (empty set)

# None
print(bool(None))     # False
```

### Truthy Values

Everything else evaluates to True:

```python
print(bool(1))        # True
print(bool(-1))       # True
print(bool("text"))   # True
print(bool([1]))      # True
print(bool({"a": 1})) # True
```

### Using in Conditions

```python
# Check if list is not empty
items = [1, 2, 3]
if items:  # Same as: if len(items) > 0
    print("Has items")

# Check if string is not empty
name = "Alice"
if name:  # Same as: if len(name) > 0
    print(f"Hello, {name}")

# Check if value is not None
result = get_data()
if result:  # Same as: if result is not None
    process(result)
```

## Practical Examples

### Example 1: User Authentication

```python
def can_access_admin_panel(user):
    """Check if user can access admin panel"""
    is_admin = user.get("role") == "admin"
    is_active = user.get("active", False)
    is_verified = user.get("verified", False)
    
    return is_admin and is_active and is_verified

user1 = {"role": "admin", "active": True, "verified": True}
user2 = {"role": "admin", "active": False, "verified": True}

print(can_access_admin_panel(user1))  # True
print(can_access_admin_panel(user2))  # False
```

### Example 2: Discount Eligibility

```python
def calculate_discount(age, is_student, is_military):
    """Calculate discount percentage"""
    if age < 18 or age >= 65:
        discount = 0.20  # 20% for children and seniors
    elif is_student or is_military:
        discount = 0.15  # 15% for students or military
    else:
        discount = 0.0   # No discount
    
    return discount

print(calculate_discount(70, False, False))   # 0.20
print(calculate_discount(25, True, False))    # 0.15
print(calculate_discount(30, False, False))   # 0.0
```

### Example 3: Input Validation

```python
def is_valid_username(username):
    """Validate username"""
    if not username:
        return False, "Username cannot be empty"
    
    if len(username) < 3 or len(username) > 20:
        return False, "Username must be 3-20 characters"
    
    if not username.isalnum():
        return False, "Username must be alphanumeric"
    
    return True, "Valid username"

valid, message = is_valid_username("user123")
print(message)  # Valid username

valid, message = is_valid_username("ab")
print(message)  # Username must be 3-20 characters
```

### Example 4: Date Range Checker

```python
def is_in_date_range(year, month, day):
    """Check if date is valid"""
    is_valid_year = 1900 <= year <= 2100
    is_valid_month = 1 <= month <= 12
    is_valid_day = 1 <= day <= 31
    
    return is_valid_year and is_valid_month and is_valid_day

print(is_in_date_range(2024, 6, 15))   # True
print(is_in_date_range(2024, 13, 15))  # False
print(is_in_date_range(1800, 6, 15))   # False
```

### Example 5: Complex Permission Check

```python
def can_edit_post(user, post):
    """Check if user can edit post"""
    is_author = user["id"] == post["author_id"]
    is_admin = user.get("role") == "admin"
    is_moderator = user.get("role") == "moderator"
    post_locked = post.get("locked", False)
    
    # Author can edit if not locked
    # Admin/moderator can always edit
    can_edit = (is_author and not post_locked) or is_admin or is_moderator
    
    return can_edit

user = {"id": 1, "role": "user"}
post = {"author_id": 1, "locked": False}
print(can_edit_post(user, post))  # True (author, not locked)

post["locked"] = True
print(can_edit_post(user, post))  # False (locked)

user["role"] = "admin"
print(can_edit_post(user, post))  # True (admin override)
```

## Common Patterns

### Pattern 1: Default Values with or

```python
# Use or for default values
name = user_input or "Guest"
timeout = config.get("timeout") or 30

# Equivalent to:
if not user_input:
    name = "Guest"
else:
    name = user_input
```

**⚠️ Warning**: This doesn't work with 0 or False:

```python
count = 0
result = count or 10  # 10, not 0!

# Better for numbers:
result = count if count is not None else 10
```

### Pattern 2: Guard Clauses

```python
def process_data(data):
    # Guard clauses at the top
    if not data:
        return "No data"
    
    if not isinstance(data, list):
        return "Invalid type"
    
    if len(data) > 1000:
        return "Too much data"
    
    # Main logic here
    return sum(data)
```

### Pattern 3: Multiple Condition Checks

```python
# Check multiple conditions with all()
conditions = [
    age >= 18,
    has_license,
    has_insurance,
    not is_suspended
]

if all(conditions):
    print("Can drive")

# Check if any condition is true
reasons_to_reject = [
    age < 18,
    not has_license,
    is_suspended
]

if any(reasons_to_reject):
    print("Cannot drive")
```

## Common Mistakes

### Mistake 1: Redundant Comparisons

```python
# ❌ Redundant
if is_valid == True:
    print("Valid")

# ✅ Better
if is_valid:
    print("Valid")

# ❌ Redundant
if is_valid == False:
    print("Invalid")

# ✅ Better
if not is_valid:
    print("Invalid")
```

### Mistake 2: Confusing and/or

```python
# ❌ Wrong logic
age = 25
if age < 18 or age > 65:  # Should be 'and' for range
    print("Not working age")

# ✅ Correct
if age < 18 or age > 65:  # Correct for outside range
    print("Not working age")

# For inside range, use 'and' or chaining
if 18 <= age <= 65:
    print("Working age")
```

### Mistake 3: Not Using Parentheses

```python
# ❌ Unclear precedence
if age > 18 and has_license or is_employee:
    pass

# ✅ Clear with parentheses
if (age > 18 and has_license) or is_employee:
    pass
```

## Key Takeaways

- **Three operators**: `and`, `or`, `not`
- **and**: Both conditions must be True
- **or**: At least one condition must be True
- **not**: Reverses boolean value
- **Precedence**: not > and > or
- **Short-circuit**: Python stops evaluating when result is known
- **Truthiness**: Empty collections, 0, None are falsy
- Use **parentheses** for complex conditions
- Avoid **redundant boolean comparisons**

## What's Next?

You've mastered logical operators! Next, we'll explore **nested conditionals** and **ternary operators**.

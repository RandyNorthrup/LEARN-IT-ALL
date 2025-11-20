---
id: nested-conditionals
title: Nested Conditionals and Ternary Operators
chapterId: ch4-comparisons
order: 4
duration: 25
objectives:
  - Understand nested if statements
  - Master ternary operators for concise code
  - Learn when to use each pattern
  - Avoid deeply nested conditionals
---

# Nested Conditionals and Ternary Operators

Nested conditionals allow complex decision trees, while ternary operators provide concise one-line conditionals. Both are powerful tools for control flow.

## Nested if Statements

Place if statements inside other if statements:

```python
age = 25
has_license = True

if age >= 18:
    if has_license:
        print("Can drive")
    else:
        print("Need license")
else:
    print("Too young to drive")
```

### Example: Multi-Level Checking

```python
def check_eligibility(age, citizenship, criminal_record):
    """Check voting eligibility"""
    if age >= 18:
        if citizenship == "US":
            if not criminal_record:
                return "Eligible to vote"
            else:
                return "Ineligible due to record"
        else:
            return "Must be US citizen"
    else:
        return "Must be 18 or older"

print(check_eligibility(25, "US", False))  # Eligible to vote
print(check_eligibility(25, "UK", False))  # Must be US citizen
print(check_eligibility(16, "US", False))  # Must be 18 or older
```

## Avoiding Deep Nesting

Deep nesting is hard to read. Use early returns or flatten logic:

### ❌ Deeply Nested (Hard to Read)

```python
def process_order(order):
    if order is not None:
        if order.get("items"):
            if order.get("payment"):
                if order["payment"]["status"] == "completed":
                    return "Order processed"
                else:
                    return "Payment incomplete"
            else:
                return "No payment info"
        else:
            return "No items"
    else:
        return "No order"
```

### ✅ Flattened with Guard Clauses

```python
def process_order(order):
    """Process order with guard clauses"""
    if order is None:
        return "No order"
    
    if not order.get("items"):
        return "No items"
    
    if not order.get("payment"):
        return "No payment info"
    
    if order["payment"]["status"] != "completed":
        return "Payment incomplete"
    
    return "Order processed"
```

## Combining Nested and Logical Operators

Often you can replace nesting with `and`/`or`:

### Before (Nested)

```python
age = 25
income = 50000

if age >= 18:
    if income >= 30000:
        print("Loan approved")
    else:
        print("Insufficient income")
else:
    print("Too young")
```

### After (Combined)

```python
age = 25
income = 50000

if age >= 18 and income >= 30000:
    print("Loan approved")
elif age < 18:
    print("Too young")
else:
    print("Insufficient income")
```

## The Ternary Operator

Ternary operator provides concise if-else in one line:

**Syntax**: `value_if_true if condition else value_if_false`

### Basic Examples

```python
# Traditional if-else
age = 20
if age >= 18:
    status = "adult"
else:
    status = "minor"

# ✅ Ternary operator
status = "adult" if age >= 18 else "minor"
print(status)  # adult

# More examples
score = 85
grade = "Pass" if score >= 60 else "Fail"

temperature = 30
weather = "Hot" if temperature > 25 else "Cool"

is_weekend = True
day_type = "Weekend" if is_weekend else "Weekday"
```

### Ternary in Expressions

```python
# Calculate discount
age = 70
discount = 0.20 if age >= 65 else 0.10

# Set default value
name = user_input if user_input else "Guest"

# Choose max/min
a, b = 10, 20
maximum = a if a > b else b
minimum = a if a < b else b

# Format output
count = 1
message = f"{count} item" if count == 1 else f"{count} items"
```

## Nested Ternary Operators

You can nest ternaries, but **use sparingly**:

```python
score = 85

# ❌ Hard to read
grade = "A" if score >= 90 else "B" if score >= 80 else "C" if score >= 70 else "F"

# ✅ Better - use regular if-elif
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"
```

**Rule of thumb**: If you need more than one else, use regular if-elif.

## When to Use Each Pattern

### Use Regular if-elif-else When:

- Multiple conditions (3+)
- Complex logic
- Multiple statements per branch
- Need readability

```python
def get_shipping_cost(weight):
    if weight <= 0:
        return 0
    elif weight <= 5:
        return 5.00
    elif weight <= 20:
        return 10.00
    else:
        return 15.00
```

### Use Ternary When:

- Simple two-way choice
- Single expression per branch
- Inline assignment
- One-liner is clearer

```python
def get_discount(is_member):
    return 0.10 if is_member else 0.00

# Setting defaults
timeout = config.get("timeout") if config.get("timeout") else 30

# Simple status
status = "Active" if user.is_active else "Inactive"
```

### Use Nested if When:

- Conditions depend on each other
- Need to check inner condition only if outer is true
- Complex validation flows

```python
def can_withdraw(balance, amount, daily_limit):
    if amount <= balance:
        if amount <= daily_limit:
            return True, "Withdrawal approved"
        else:
            return False, "Exceeds daily limit"
    else:
        return False, "Insufficient funds"
```

## Practical Examples

### Example 1: Access Control

```python
def check_access(user, resource):
    """Check if user can access resource"""
    # Guard clauses first
    if not user:
        return False, "No user"
    
    if not user.get("active"):
        return False, "User inactive"
    
    # Nested logic for permission check
    if user.get("role") == "admin":
        return True, "Admin access granted"
    elif user.get("role") == "moderator":
        if resource.get("type") in ["post", "comment"]:
            return True, "Moderator access granted"
        else:
            return False, "Moderators can only access posts/comments"
    elif user.get("id") == resource.get("owner_id"):
        return True, "Owner access granted"
    else:
        return False, "Access denied"

user = {"id": 1, "role": "moderator", "active": True}
resource = {"type": "post", "owner_id": 2}
can_access, message = check_access(user, resource)
print(message)  # Moderator access granted
```

### Example 2: Price Calculator with Ternary

```python
def calculate_price(base_price, quantity, is_member):
    """Calculate final price with discounts"""
    # Bulk discount (ternary)
    bulk_discount = 0.15 if quantity >= 10 else 0.05 if quantity >= 5 else 0
    
    # Member discount (ternary)
    member_discount = 0.10 if is_member else 0
    
    # Calculate
    total_discount = bulk_discount + member_discount
    final_price = base_price * quantity * (1 - total_discount)
    
    return final_price

print(calculate_price(100, 12, True))   # 12 items, member: $1020
print(calculate_price(100, 3, False))   # 3 items, no member: $300
```

### Example 3: Input Validation

```python
def validate_password(password):
    """Validate password with nested checks"""
    if not password:
        return False, "Password required"
    
    if len(password) < 8:
        return False, "Too short (min 8 characters)"
    
    # Nested checks for character types
    has_upper = any(c.isupper() for c in password)
    has_lower = any(c.islower() for c in password)
    has_digit = any(c.isdigit() for c in password)
    
    if not has_upper:
        return False, "Must contain uppercase letter"
    
    if not has_lower:
        return False, "Must contain lowercase letter"
    
    if not has_digit:
        return False, "Must contain digit"
    
    # All checks passed
    strength = "Strong" if len(password) >= 12 else "Medium"
    return True, f"Valid password ({strength})"

valid, message = validate_password("SecurePass123")
print(message)  # Valid password (Strong)
```

### Example 4: BMI Calculator

```python
def calculate_bmi_category(weight_kg, height_m):
    """Calculate BMI and category"""
    if weight_kg <= 0 or height_m <= 0:
        return "Invalid input"
    
    bmi = weight_kg / (height_m ** 2)
    
    # Nested ternary (use sparingly)
    category = (
        "Underweight" if bmi < 18.5 else
        "Normal" if bmi < 25 else
        "Overweight" if bmi < 30 else
        "Obese"
    )
    
    return f"BMI: {bmi:.1f} ({category})"

print(calculate_bmi_category(70, 1.75))  # BMI: 22.9 (Normal)
print(calculate_bmi_category(90, 1.75))  # BMI: 29.4 (Overweight)
```

### Example 5: Grade with Bonus

```python
def calculate_final_grade(exam_score, homework_score, attendance):
    """Calculate final grade with nested logic"""
    if exam_score < 0 or homework_score < 0:
        return "Invalid scores"
    
    # Base grade calculation
    base_grade = (exam_score * 0.7) + (homework_score * 0.3)
    
    # Attendance bonus (nested)
    if attendance >= 90:
        if base_grade >= 85:
            bonus = 5  # Extra bonus for high achievers
        else:
            bonus = 3
    elif attendance >= 75:
        bonus = 2
    else:
        bonus = 0
    
    final_grade = min(base_grade + bonus, 100)
    
    # Letter grade (ternary chain)
    letter = (
        "A" if final_grade >= 90 else
        "B" if final_grade >= 80 else
        "C" if final_grade >= 70 else
        "D" if final_grade >= 60 else
        "F"
    )
    
    return f"{final_grade:.1f} ({letter})"

print(calculate_final_grade(88, 92, 95))  # 94.2 (A)
print(calculate_final_grade(75, 80, 60))  # 76.5 (C)
```

## Best Practices

### 1. Keep Nesting Shallow

```python
# ❌ Too deep
if a:
    if b:
        if c:
            if d:
                do_something()

# ✅ Flatten with early returns
if not a:
    return
if not b:
    return
if not c:
    return
if not d:
    return
do_something()
```

### 2. Use Ternary for Simple Cases Only

```python
# ✅ Good - simple choice
status = "Active" if is_active else "Inactive"

# ❌ Bad - too complex
result = value1 if cond1 else value2 if cond2 else value3 if cond3 else value4
```

### 3. Prefer Logical Operators Over Nesting

```python
# ❌ Nested
if age >= 18:
    if has_id:
        enter()

# ✅ Combined
if age >= 18 and has_id:
    enter()
```

## Key Takeaways

- **Nested if**: Conditions inside conditions
- **Guard clauses**: Check error conditions first, return early
- **Ternary operator**: `value_if_true if condition else value_if_false`
- Use ternary for **simple** two-way choices
- Avoid **deep nesting** - flatten with early returns
- **Combine conditions** with and/or instead of nesting
- **Readability** is more important than brevity

## What's Next?

You've mastered conditionals! Next chapter, we'll explore **loops and iteration**.

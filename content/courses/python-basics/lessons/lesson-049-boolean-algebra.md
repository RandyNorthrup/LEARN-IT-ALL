---
id: "87-boolean-algebra"
title: "Boolean Algebra and Logic Laws"
chapterId: ch4-comparisons
order: 9
duration: 25
objectives:
  - Understand fundamental boolean algebra laws
  - Apply De Morgan's Laws to simplify conditions
  - Master logical equivalences
  - Optimize boolean expressions
---

# Boolean Algebra and Logic Laws

Boolean algebra provides mathematical rules for working with True and False values. Understanding these laws helps you write simpler, more efficient conditional logic.

## Basic Boolean Values

```python
# Boolean literals
true_value = True
false_value = False

print(type(True))   # <class 'bool'>
print(type(False))  # <class 'bool'>

# Boolean is a subclass of int
print(isinstance(True, int))   # True
print(isinstance(False, int))  # True

# Numeric values
print(int(True))   # 1
print(int(False))  # 0

# Arithmetic with booleans (not recommended, but possible)
print(True + True)    # 2
print(True * 10)      # 10
print(False + False)  # 0
```

## Identity Laws

```python
# OR Identity: A or False = A
x = True
print(x or False)  # True

y = False
print(y or False)  # False

# AND Identity: A and True = A
x = True
print(x and True)  # True

y = False
print(y and True)  # False

# Practical example
def is_eligible(age, override=False):
    """Check eligibility with override."""
    # override or (normal check) - identity law used here
    return override or age >= 18

print(is_eligible(15, override=True))   # True (override works)
print(is_eligible(20, override=False))  # True (normal check)
print(is_eligible(15, override=False))  # False
```

## Domination Laws

```python
# OR Domination: A or True = True (always)
x = False
print(x or True)  # True

x = True
print(x or True)  # True

# AND Domination: A and False = False (always)
x = True
print(x and False)  # False

x = False
print(x and False)  # False

# Short-circuit example
def expensive_check():
    """Simulate expensive operation."""
    print("This never runs!")
    return True

# Short-circuits, expensive_check never called
result = False and expensive_check()
print(result)  # False

# Short-circuits, expensive_check never called
result = True or expensive_check()
print(result)  # True
```

## Idempotent Laws

```python
# OR Idempotent: A or A = A
condition = True
print(condition or condition)  # True (not "True True")

condition = False
print(condition or condition)  # False

# AND Idempotent: A and A = A
condition = True
print(condition and condition)  # True

condition = False
print(condition and condition)  # False

# Practical: Redundant checks
age = 25

# ❌ Redundant
if age >= 18 or age >= 18:
    print("Adult")

# ✅ Simplified
if age >= 18:
    print("Adult")
```

## Complement Laws

```python
# OR Complement: A or not A = True (always)
x = True
print(x or not x)  # True

x = False
print(x or not x)  # True (still True!)

# AND Complement: A and not A = False (always)
x = True
print(x and not x)  # False

x = False
print(x and not x)  # False (still False!)

# Practical example
def check_status(is_active):
    """Demonstrate complement."""
    # This condition is always True (useless!)
    if is_active or not is_active:
        return "Status checked"
    return "Never reached"

print(check_status(True))   # Status checked
print(check_status(False))  # Status checked
```

## Double Negation

```python
# Double Negation: not (not A) = A
x = True
print(not not x)  # True

x = False
print(not not x)  # False

# Use to convert to boolean
value = "hello"
is_truthy = not not value
print(is_truthy)  # True (converted to bool)

# Better: use bool() constructor
is_truthy = bool(value)
print(is_truthy)  # True

# Practical example
items = [1, 2, 3]

# ❌ Double negation (confusing)
if not not items:
    print("Has items")

# ✅ Clear and direct
if items:
    print("Has items")
```

## De Morgan's Laws

### NOT (A AND B) = (NOT A) OR (NOT B)

```python
a = True
b = False

# These are equivalent
result1 = not (a and b)
result2 = (not a) or (not b)
print(f"{result1} == {result2}")  # True == True

# Practical example: Check if user is invalid
has_email = True
has_phone = False

# Original: neither email nor phone
if not (has_email and has_phone):
    print("Missing contact info")

# Equivalent using De Morgan
if (not has_email) or (not has_phone):
    print("Missing contact info")

# Real-world example
def validate_user(user):
    """Check if user data is incomplete."""
    has_name = bool(user.get('name'))
    has_email = bool(user.get('email'))
    has_age = bool(user.get('age'))
    
    # Using De Morgan: not all fields present = at least one missing
    if not (has_name and has_email and has_age):
        return "Incomplete profile"
    return "Complete profile"

print(validate_user({'name': 'Alice', 'email': 'a@test.com'}))
# Incomplete profile
```

### NOT (A OR B) = (NOT A) AND (NOT B)

```python
a = False
b = False

# These are equivalent
result1 = not (a or b)
result2 = (not a) and (not b)
print(f"{result1} == {result2}")  # True == True

# Practical example: Both conditions must fail
is_weekend = False
is_holiday = False

# Original: not weekend and not holiday
if not (is_weekend or is_holiday):
    print("Regular workday")

# Equivalent using De Morgan
if (not is_weekend) and (not is_holiday):
    print("Regular workday")

# Real-world: Error checking
def process_data(data):
    """Process only if no errors."""
    has_error = data.get('error') is not None
    is_empty = len(data.get('values', [])) == 0
    
    # Using De Morgan: not (error or empty) = (no error) and (not empty)
    if not (has_error or is_empty):
        return "Processing data"
    return "Cannot process"

print(process_data({'values': [1, 2, 3]}))
# Processing data

print(process_data({'error': 'Bad data'}))
# Cannot process
```

## Commutative Laws

```python
# OR Commutative: A or B = B or A
a = True
b = False
print((a or b) == (b or a))  # True

# AND Commutative: A and B = B and A
print((a and b) == (b and a))  # True

# Order doesn't matter for final result
x = 5
y = 10

result1 = (x > 0) and (y > 0)
result2 = (y > 0) and (x > 0)
print(f"{result1} == {result2}")  # True == True

# But short-circuit evaluation means order matters for performance!
def expensive():
    print("Expensive called")
    return True

def cheap():
    print("Cheap called")
    return False

print("\nCheap first:")
result = cheap() and expensive()
# Only "Cheap called" prints

print("\nExpensive first:")
result = expensive() and cheap()
# Both print - expensive called unnecessarily!
```

## Associative Laws

```python
# OR Associative: (A or B) or C = A or (B or C)
a, b, c = False, False, True

result1 = (a or b) or c
result2 = a or (b or c)
print(f"{result1} == {result2}")  # True == True

# AND Associative: (A and B) and C = A and (B and C)
a, b, c = True, True, False

result1 = (a and b) and c
result2 = a and (b and c)
print(f"{result1} == {result2}")  # False == False

# Chaining conditions
age = 25
citizen = True
registered = True

# These are equivalent
eligible1 = (age >= 18 and citizen) and registered
eligible2 = age >= 18 and (citizen and registered)
eligible3 = age >= 18 and citizen and registered  # Preferred (clearest)

print(eligible1, eligible2, eligible3)  # True True True
```

## Distributive Laws

```python
# AND distributes over OR: A and (B or C) = (A and B) or (A and C)
a, b, c = True, False, True

result1 = a and (b or c)
result2 = (a and b) or (a and c)
print(f"{result1} == {result2}")  # True == True

# OR distributes over AND: A or (B and C) = (A or B) and (A or C)
a, b, c = False, True, False

result1 = a or (b and c)
result2 = (a or b) and (a or c)
print(f"{result1} == {result2}")  # False == False

# Practical example: Eligibility rules
def is_eligible(age, has_license, has_permit):
    """Check driving eligibility."""
    # Can drive if: 18+ AND (has license OR permit)
    # Distributed: (18+ AND license) OR (18+ AND permit)
    return age >= 18 and (has_license or has_permit)

print(is_eligible(20, True, False))   # True (license)
print(is_eligible(20, False, True))   # True (permit)
print(is_eligible(20, False, False))  # False (neither)
print(is_eligible(16, True, False))   # False (too young)
```

## Absorption Laws

```python
# OR Absorption: A or (A and B) = A
a, b = True, False

result1 = a or (a and b)
result2 = a
print(f"{result1} == {result2}")  # True == True

# Why? If A is True, whole expression is True
# If A is False, (A and B) is False, so A or False = False = A

# AND Absorption: A and (A or B) = A
a, b = False, True

result1 = a and (a or b)
result2 = a
print(f"{result1} == {result2}")  # False == False

# Simplifying redundant conditions
age = 20
has_id = True

# ❌ Redundant
if age >= 18 or (age >= 18 and has_id):
    print("Can enter")

# ✅ Simplified using absorption
if age >= 18:
    print("Can enter")
```

## Conditional Equivalences

```python
# Implication: (A implies B) = (not A or B)
a = True
b = False

# "If A then B" is equivalent to "not A or B"
implies = (not a) or b
print(implies)  # False

# Practical: Default value logic
def get_value(use_default, default_val, actual_val):
    """Get value with default logic."""
    # If use_default, return default_val
    # Equivalent to: not use_default or return default_val
    if use_default:
        return default_val
    return actual_val

print(get_value(True, "default", "actual"))   # default
print(get_value(False, "default", "actual"))  # actual

# Biconditional: (A if and only if B) = (A and B) or (not A and not B)
a = True
b = True

# A and B have same truth value
same = (a and b) or (not a and not b)
print(same)  # True

# Different values
a, b = True, False
same = (a and b) or (not a and not b)
print(same)  # False
```

## Simplification Examples

```python
# Example 1: Simplify complex condition
def can_access_v1(is_admin, is_owner, is_member, is_public):
    """Complex version."""
    return (is_admin or is_owner) or (is_member and is_public) or is_admin

def can_access_v2(is_admin, is_owner, is_member, is_public):
    """Simplified using absorption: A or ... or A = A or ..."""
    return is_admin or is_owner or (is_member and is_public)

# Test both versions
print(can_access_v1(True, False, False, False))   # True
print(can_access_v2(True, False, False, False))   # True

# Example 2: Simplify negations
def is_invalid_v1(x, y):
    """Using De Morgan."""
    return not (x > 0 and y > 0)

def is_invalid_v2(x, y):
    """Simplified with De Morgan: not (A and B) = not A or not B."""
    return x <= 0 or y <= 0

print(is_invalid_v1(-5, 10))  # True
print(is_invalid_v2(-5, 10))  # True

# Example 3: Eliminate double negation
def process_v1(has_error):
    """Double negation."""
    if not (not has_error):
        return "Processing"
    return "Error"

def process_v2(has_error):
    """Simplified: not not A = A."""
    if has_error:
        return "Processing"
    return "Error"

print(process_v1(True))   # Processing
print(process_v2(True))   # Processing
```

## Truth Tables

```python
def print_truth_table():
    """Generate truth table for common operations."""
    print("A     B     | A and B | A or B | not A | A xor B")
    print("-" * 55)
    
    for a in [False, True]:
        for b in [False, True]:
            and_result = a and b
            or_result = a or b
            not_a = not a
            xor_result = a != b  # XOR: True if different
            
            print(f"{str(a):5} {str(b):5} | {str(and_result):7} | {str(or_result):6} | {str(not_a):5} | {str(xor_result):7}")

print_truth_table()
# A     B     | A and B | A or B | not A | A xor B
# -------------------------------------------------------
# False False | False   | False  | True  | False
# False True  | False   | True   | True  | True
# True  False | False   | True   | False | True
# True  True  | True    | True   | False | False
```

## Practical Application: Query Builder

```python
class QueryBuilder:
    """Build database queries with boolean logic."""
    
    def __init__(self):
        self.conditions = []
    
    def where(self, condition):
        """Add condition."""
        self.conditions.append(condition)
        return self
    
    def or_where(self, condition):
        """Add OR condition."""
        if self.conditions:
            self.conditions.append(f"OR {condition}")
        else:
            self.conditions.append(condition)
        return self
    
    def build(self):
        """Build query string."""
        if not self.conditions:
            return "SELECT * FROM table"
        return f"SELECT * FROM table WHERE {' '.join(self.conditions)}"

# Build complex query
query = (QueryBuilder()
         .where("age >= 18")
         .where("AND city = 'NYC'")
         .or_where("country = 'USA'")
         .build())

print(query)
# SELECT * FROM table WHERE age >= 18 AND city = 'NYC' OR country = 'USA'

# Applying De Morgan for optimization
# Original: NOT (age < 18 OR city != 'NYC')
# Simplified: (age >= 18) AND (city = 'NYC')
query2 = (QueryBuilder()
          .where("age >= 18")
          .where("AND city = 'NYC'")
          .build())

print(query2)
# SELECT * FROM table WHERE age >= 18 AND city = 'NYC'
```

## Summary

**Fundamental Laws:**
- **Identity**: `A or False = A`, `A and True = A`
- **Domination**: `A or True = True`, `A and False = False`
- **Idempotent**: `A or A = A`, `A and A = A`
- **Complement**: `A or not A = True`, `A and not A = False`
- **Double Negation**: `not not A = A`

**De Morgan's Laws (Most Important!):**
- `not (A and B) = (not A) or (not B)`
- `not (A or B) = (not A) and (not B)`

**Other Properties:**
- **Commutative**: `A or B = B or A`
- **Associative**: `(A or B) or C = A or (B or C)`
- **Distributive**: `A and (B or C) = (A and B) or (A and C)`
- **Absorption**: `A or (A and B) = A`

**Practical Benefits:**
- Simplify complex conditions
- Optimize short-circuit evaluation
- Write clearer logic
- Reduce redundancy
- Improve code performance

Understanding boolean algebra makes you a better programmer by helping you write simpler, more efficient conditional logic!

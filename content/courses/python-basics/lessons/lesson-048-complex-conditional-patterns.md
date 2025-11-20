---
id: "86-complex-conditional-patterns"
title: "Complex Conditional Patterns"
chapterId: ch4-comparisons
order: 8
duration: 25
objectives:
  - Master complex multi-condition logic
  - Learn to simplify nested conditionals
  - Understand conditional expression patterns
  - Apply advanced condition structuring
---

# Complex Conditional Patterns

As programs grow, conditional logic becomes more complex. Learn patterns and techniques to write clear, maintainable conditional code even with many conditions.

## Multiple Conditions

### Combining with AND/OR

```python
# Multiple AND conditions
age = 25
income = 50000
credit_score = 720

if age >= 18 and income >= 30000 and credit_score >= 650:
    print("Loan approved")
else:
    print("Loan denied")
# Loan approved

# Multiple OR conditions
day = "Saturday"

if day == "Saturday" or day == "Sunday":
    print("It's the weekend!")
# It's the weekend!

# Combining AND and OR
temperature = 75
humidity = 60
precipitation = 0

if (temperature > 70 and temperature < 85) and humidity < 70 and precipitation == 0:
    print("Perfect weather!")
# Perfect weather!
```

### Grouping with Parentheses

```python
# Explicit grouping for clarity
age = 20
student = True
income = 15000

# Senior discount OR (student AND low income)
if age >= 65 or (student and income < 20000):
    print("Eligible for discount")
    # Prints: Eligible for discount

# Without parentheses (wrong!)
# This would be: (age >= 65 or student) and income < 20000
if age >= 65 or student and income < 20000:
    print("Eligible for discount")

# Complex business rules
is_member = True
purchase_amount = 150
loyalty_points = 500

# Member with high purchase OR enough loyalty points
if (is_member and purchase_amount > 100) or loyalty_points >= 1000:
    print("Free shipping applied")
# Free shipping applied
```

## Refactoring Nested Conditionals

### Extract to Variables

```python
# ❌ Hard to read
def check_eligibility(person):
    if person['age'] >= 18:
        if person['citizen']:
            if person['registered']:
                if not person.get('convicted'):
                    return "Eligible to vote"
    return "Not eligible"

# ✅ Extract conditions to variables
def check_eligibility_clean(person):
    is_adult = person['age'] >= 18
    is_citizen = person['citizen']
    is_registered = person['registered']
    has_conviction = person.get('convicted', False)
    
    if is_adult and is_citizen and is_registered and not has_conviction:
        return "Eligible to vote"
    return "Not eligible"

person = {'age': 25, 'citizen': True, 'registered': True, 'convicted': False}
print(check_eligibility_clean(person))
# Eligible to vote
```

### Flatten with Guard Clauses

```python
# ❌ Deep nesting
def process_payment(order):
    if order:
        if order.get('items'):
            if order.get('payment_method'):
                if order['total'] > 0:
                    return "Payment processed"
                else:
                    return "Invalid amount"
            else:
                return "No payment method"
        else:
            return "No items"
    else:
        return "No order"

# ✅ Flattened with guards
def process_payment_flat(order):
    # Early returns for invalid cases
    if not order:
        return "No order"
    
    if not order.get('items'):
        return "No items"
    
    if not order.get('payment_method'):
        return "No payment method"
    
    if order['total'] <= 0:
        return "Invalid amount"
    
    # Happy path at the end
    return "Payment processed"

order = {'items': ['book'], 'payment_method': 'card', 'total': 29.99}
print(process_payment_flat(order))
# Payment processed
```

## Lookup Tables Instead of Conditionals

```python
# ❌ Long if-elif chain
def get_day_name(day_num):
    if day_num == 1:
        return "Monday"
    elif day_num == 2:
        return "Tuesday"
    elif day_num == 3:
        return "Wednesday"
    elif day_num == 4:
        return "Thursday"
    elif day_num == 5:
        return "Friday"
    elif day_num == 6:
        return "Saturday"
    elif day_num == 7:
        return "Sunday"
    else:
        return "Invalid day"

# ✅ Dictionary lookup
def get_day_name_lookup(day_num):
    days = {
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday",
        7: "Sunday"
    }
    return days.get(day_num, "Invalid day")

print(get_day_name_lookup(3))  # Wednesday
print(get_day_name_lookup(9))  # Invalid day

# Function dispatch table
def add(a, b): return a + b
def subtract(a, b): return a - b
def multiply(a, b): return a * b
def divide(a, b): return a / b if b != 0 else "Error"

operations = {
    '+': add,
    '-': subtract,
    '*': multiply,
    '/': divide
}

def calculate(a, operator, b):
    """Calculate using operator."""
    operation = operations.get(operator)
    if operation:
        return operation(a, b)
    return "Unknown operator"

print(calculate(10, '+', 5))  # 15
print(calculate(10, '*', 5))  # 50
print(calculate(10, '%', 5))  # Unknown operator
```

## State Machine Pattern

```python
class TrafficLight:
    """Traffic light with state transitions."""
    
    def __init__(self):
        self.state = "red"
        self.transitions = {
            "red": "green",
            "green": "yellow",
            "yellow": "red"
        }
    
    def next_state(self):
        """Transition to next state."""
        self.state = self.transitions[self.state]
        return self.state
    
    def can_go(self):
        """Check if vehicles can proceed."""
        return self.state == "green"
    
    def should_slow(self):
        """Check if vehicles should slow down."""
        return self.state == "yellow"

# Usage
light = TrafficLight()
print(f"Light: {light.state}, Can go: {light.can_go()}")  # red, False

light.next_state()
print(f"Light: {light.state}, Can go: {light.can_go()}")  # green, True

light.next_state()
print(f"Light: {light.state}, Should slow: {light.should_slow()}")  # yellow, True

light.next_state()
print(f"Light: {light.state}, Can go: {light.can_go()}")  # red, False
```

## Complex Range Checks

```python
def get_grade(score):
    """Convert score to letter grade."""
    if score < 0 or score > 100:
        return "Invalid score"
    elif score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    elif score >= 60:
        return "D"
    else:
        return "F"

print(get_grade(95))   # A
print(get_grade(75))   # C
print(get_grade(55))   # F

# Multiple range conditions
def classify_bmi(bmi):
    """Classify BMI into categories."""
    if bmi < 18.5:
        return "Underweight"
    elif 18.5 <= bmi < 25:
        return "Normal weight"
    elif 25 <= bmi < 30:
        return "Overweight"
    elif bmi >= 30:
        return "Obese"

print(classify_bmi(22.5))  # Normal weight
print(classify_bmi(28.0))  # Overweight

# Using bisect for efficient range lookups
import bisect

def get_tax_bracket(income):
    """Get tax rate based on income bracket."""
    brackets = [0, 10000, 40000, 85000, 160000]
    rates = [0, 0.10, 0.12, 0.22, 0.24, 0.32]
    
    index = bisect.bisect_right(brackets, income)
    return rates[index]

print(f"Tax rate: {get_tax_bracket(50000) * 100}%")  # 22.0%
print(f"Tax rate: {get_tax_bracket(8000) * 100}%")   # 0.0%
```

## Conditional Assignment Patterns

```python
# Ternary operator
age = 20
status = "Adult" if age >= 18 else "Minor"
print(status)  # Adult

# Multiple ternary (avoid deep nesting!)
score = 85
grade = "A" if score >= 90 else "B" if score >= 80 else "C" if score >= 70 else "F"
print(grade)  # B

# Better: use regular if-elif
def get_grade_clear(score):
    if score >= 90: return "A"
    if score >= 80: return "B"
    if score >= 70: return "C"
    return "F"

# Conditional in list/dict
numbers = [1, 2, 3, 4, 5, 6]
evens = [n for n in numbers if n % 2 == 0]
print(evens)  # [2, 4, 6]

# Transform with condition
doubled_evens = [n * 2 if n % 2 == 0 else n for n in numbers]
print(doubled_evens)  # [1, 4, 3, 8, 5, 12]
```

## Boolean Algebra Simplification

```python
# ❌ Redundant conditions
def is_weekday_verbose(day):
    if day == "Monday" or day == "Tuesday" or day == "Wednesday" or day == "Thursday" or day == "Friday":
        return True
    else:
        return False

# ✅ Direct return
def is_weekday_simple(day):
    return day in ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

# ❌ Redundant boolean check
def is_valid_verbose(value):
    if value > 0:
        return True
    else:
        return False

# ✅ Direct return
def is_valid_simple(value):
    return value > 0

print(is_valid_simple(10))   # True
print(is_valid_simple(-5))   # False

# De Morgan's Laws: not (A and B) == (not A) or (not B)
x = 5
y = 10

# These are equivalent
result1 = not (x > 10 and y < 5)
result2 = (x <= 10) or (y >= 5)
print(result1, result2)  # True True

# not (A or B) == (not A) and (not B)
result3 = not (x < 0 or y < 0)
result4 = (x >= 0) and (y >= 0)
print(result3, result4)  # True True
```

## Multi-Criteria Decision Making

```python
class JobApplication:
    """Evaluate job application."""
    
    def __init__(self, experience, education, skills, references):
        self.experience = experience
        self.education = education
        self.skills = skills
        self.references = references
    
    def calculate_score(self):
        """Calculate application score."""
        score = 0
        
        # Experience points
        if self.experience >= 5:
            score += 40
        elif self.experience >= 3:
            score += 30
        elif self.experience >= 1:
            score += 20
        else:
            score += 10
        
        # Education points
        if self.education == "PhD":
            score += 30
        elif self.education == "Masters":
            score += 25
        elif self.education == "Bachelor":
            score += 20
        else:
            score += 10
        
        # Skills points
        score += min(len(self.skills) * 5, 20)
        
        # References points
        score += min(len(self.references) * 5, 10)
        
        return score
    
    def get_decision(self):
        """Make hiring decision."""
        score = self.calculate_score()
        
        if score >= 80:
            return "Strong hire"
        elif score >= 60:
            return "Hire"
        elif score >= 40:
            return "Maybe"
        else:
            return "Pass"

# Strong candidate
app1 = JobApplication(
    experience=6,
    education="Masters",
    skills=["Python", "Java", "SQL", "AWS"],
    references=["ref1", "ref2"]
)

print(f"Score: {app1.calculate_score()}, Decision: {app1.get_decision()}")
# Score: 85, Decision: Strong hire

# Weak candidate
app2 = JobApplication(
    experience=0,
    education="Bachelor",
    skills=["Python"],
    references=[]
)

print(f"Score: {app2.calculate_score()}, Decision: {app2.get_decision()}")
# Score: 35, Decision: Pass
```

## Validation Chain Pattern

```python
class Validator:
    """Chainable validation."""
    
    def __init__(self, value):
        self.value = value
        self.errors = []
    
    def is_not_empty(self, message="Value cannot be empty"):
        """Check if value is not empty."""
        if not self.value:
            self.errors.append(message)
        return self
    
    def min_length(self, length, message=None):
        """Check minimum length."""
        if len(str(self.value)) < length:
            msg = message or f"Must be at least {length} characters"
            self.errors.append(msg)
        return self
    
    def max_length(self, length, message=None):
        """Check maximum length."""
        if len(str(self.value)) > length:
            msg = message or f"Must be at most {length} characters"
            self.errors.append(msg)
        return self
    
    def matches_pattern(self, pattern, message="Invalid format"):
        """Check if value matches pattern."""
        import re
        if not re.match(pattern, str(self.value)):
            self.errors.append(message)
        return self
    
    def is_valid(self):
        """Check if all validations passed."""
        return len(self.errors) == 0
    
    def get_errors(self):
        """Get all validation errors."""
        return self.errors

# Validate email
email = "user@example.com"
validator = (Validator(email)
             .is_not_empty()
             .min_length(5)
             .matches_pattern(r'^[\w\.-]+@[\w\.-]+\.\w+$', "Invalid email format"))

if validator.is_valid():
    print("Email is valid!")
else:
    print("Errors:", validator.get_errors())
# Email is valid!

# Validate invalid email
invalid_email = "bad"
validator2 = (Validator(invalid_email)
              .is_not_empty()
              .min_length(5)
              .matches_pattern(r'^[\w\.-]+@[\w\.-]+\.\w+$', "Invalid email format"))

print("Valid:", validator2.is_valid())
print("Errors:", validator2.get_errors())
# Valid: False
# Errors: ['Must be at least 5 characters', 'Invalid email format']
```

## Configuration-Driven Conditionals

```python
# Define rules in data structure
ACCESS_RULES = {
    'admin': {
        'min_age': 18,
        'required_fields': ['email', 'phone', 'address'],
        'permissions': ['read', 'write', 'delete', 'manage']
    },
    'editor': {
        'min_age': 16,
        'required_fields': ['email'],
        'permissions': ['read', 'write']
    },
    'viewer': {
        'min_age': 13,
        'required_fields': ['email'],
        'permissions': ['read']
    }
}

def check_access(user, role):
    """Check if user meets role requirements."""
    if role not in ACCESS_RULES:
        return False, "Invalid role"
    
    rules = ACCESS_RULES[role]
    
    # Check age
    if user.get('age', 0) < rules['min_age']:
        return False, f"Must be at least {rules['min_age']} years old"
    
    # Check required fields
    missing = [field for field in rules['required_fields'] if field not in user]
    if missing:
        return False, f"Missing required fields: {', '.join(missing)}"
    
    # Grant access with permissions
    return True, rules['permissions']

# Valid admin
admin = {'age': 25, 'email': 'admin@test.com', 'phone': '555-0100', 'address': '123 St'}
success, result = check_access(admin, 'admin')
print(f"Admin access: {success}, Permissions: {result}")
# Admin access: True, Permissions: ['read', 'write', 'delete', 'manage']

# Invalid viewer (too young)
young_user = {'age': 10, 'email': 'kid@test.com'}
success, result = check_access(young_user, 'viewer')
print(f"Viewer access: {success}, Reason: {result}")
# Viewer access: False, Reason: Must be at least 13 years old
```

## Summary

**Simplification Techniques:**
1. **Extract to variables** - Make conditions readable
2. **Guard clauses** - Flatten nested ifs with early returns
3. **Lookup tables** - Replace if-elif chains with dictionaries
4. **Boolean algebra** - Simplify redundant conditions

**Advanced Patterns:**
1. **State machines** - Manage complex state transitions
2. **Validation chains** - Fluent validation API
3. **Configuration-driven** - Define rules in data
4. **Multi-criteria scoring** - Weighted decision making

**Best Practices:**
- Keep conditions simple and readable
- Use meaningful variable names for complex conditions
- Prefer flat over nested code
- Extract complex logic to functions
- Use data structures instead of long if-elif chains
- Return early to avoid nesting
- Comment complex business logic

Complex conditionals are unavoidable, but with these patterns, you can keep them maintainable and understandable!

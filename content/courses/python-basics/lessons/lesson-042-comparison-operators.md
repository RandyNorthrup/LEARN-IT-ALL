---
id: comparison-operators
title: Comparison Operators Deep Dive
chapterId: ch4-comparisons
order: 2
duration: 25
objectives:
  - Master all comparison operators
  - Understand operator precedence
  - Compare different data types safely
  - Learn chaining comparisons
---

# Comparison Operators Deep Dive

Comparison operators evaluate relationships between values and return boolean results. Mastering them is essential for writing effective conditional logic.

## The Six Comparison Operators

### 1. Equal To (==)

Checks if two values are equal:

```python
print(5 == 5)        # True
print(5 == 10)       # False
print("hi" == "hi")  # True
print("Hi" == "hi")  # False (case-sensitive)
```

**Common mistake**: Using `=` instead of `==`:

```python
# ❌ Wrong - this is assignment
# if x = 5:  # SyntaxError

# ✅ Correct - this is comparison
if x == 5:
    print("x is 5")
```

### 2. Not Equal To (!=)

Checks if two values are different:

```python
print(5 != 10)       # True
print(5 != 5)        # False
print("cat" != "dog") # True
```

### 3. Greater Than (>)

```python
print(10 > 5)   # True
print(5 > 10)   # False
print(5 > 5)    # False (not greater, equal)
```

### 4. Less Than (<)

```python
print(5 < 10)   # True
print(10 < 5)   # False
print(5 < 5)    # False
```

### 5. Greater Than or Equal To (>=)

```python
print(10 >= 5)  # True
print(10 >= 10) # True (equal counts!)
print(5 >= 10)  # False
```

### 6. Less Than or Equal To (<=)

```python
print(5 <= 10)  # True
print(5 <= 5)   # True
print(10 <= 5)  # False
```

## Comparing Different Types

### Numbers

Python can compare int and float:

```python
print(5 == 5.0)     # True (values equal)
print(10 > 9.5)     # True
print(3.14 < 4)     # True
```

### Strings

Strings compare lexicographically (alphabetically):

```python
print("apple" < "banana")  # True
print("zebra" > "apple")   # True
print("ABC" < "abc")       # True (uppercase comes first in ASCII)
```

String comparison is case-sensitive:

```python
print("Hello" == "hello")  # False
print("Hello".lower() == "hello".lower())  # True
```

### Lists and Tuples

Compare element by element:

```python
print([1, 2] < [1, 3])     # True (2 < 3)
print([1, 2] < [2, 1])     # True (1 < 2)
print([1, 2, 3] > [1, 2])  # True (longer, all else equal)
```

## Chaining Comparisons

Python allows elegant comparison chains:

```python
x = 15

# Traditional way
if x > 10 and x < 20:
    print("Between 10 and 20")

# ✅ Pythonic way - chained comparison
if 10 < x < 20:
    print("Between 10 and 20")
```

More examples:

```python
age = 25
if 18 <= age <= 65:
    print("Working age")

score = 85
if 80 <= score <= 89:
    print("B grade")

# Multiple chains
x, y, z = 5, 10, 15
if x < y < z:
    print("Ascending order")  # Prints
```

## Operator Precedence

Comparison operators have lower precedence than arithmetic:

```python
# Arithmetic happens first, then comparison
result = 5 + 3 > 2 * 4
# Evaluates as: (5 + 3) > (2 * 4)
# 8 > 8 = False
print(result)  # False

# Use parentheses for clarity
result = (5 + 3) > (2 * 4)
print(result)  # False
```

All comparison operators have equal precedence:

```python
# Evaluated left to right
result = 5 < 10 == True
# (5 < 10) == True
# True == True = True
print(result)  # True
```

## Identity vs Equality

### == (Equality)

Checks if **values** are equal:

```python
a = [1, 2, 3]
b = [1, 2, 3]
print(a == b)  # True (same values)
```

### is (Identity)

Checks if **same object** in memory:

```python
a = [1, 2, 3]
b = [1, 2, 3]
c = a

print(a is b)  # False (different objects)
print(a is c)  # True (same object)
```

**Use `is` for None checks:**

```python
# ✅ Correct
if value is None:
    print("No value")

# ❌ Avoid (works but not idiomatic)
if value == None:
    print("No value")
```

## Comparing Booleans

Booleans can be compared:

```python
print(True == True)   # True
print(True == False)  # False
print(True > False)   # True (True = 1, False = 0)
```

**But prefer explicit checks:**

```python
is_valid = True

# ❌ Redundant
if is_valid == True:
    print("Valid")

# ✅ Better - boolean already True/False
if is_valid:
    print("Valid")
```

## Practical Examples

### Example 1: Age Validator

```python
def validate_age(age):
    """Check if age is valid for voting"""
    if age < 0:
        return "Invalid age"
    elif age < 18:
        return "Too young to vote"
    elif age >= 18:
        return "Eligible to vote"

print(validate_age(15))   # Too young to vote
print(validate_age(20))   # Eligible to vote
print(validate_age(-5))   # Invalid age
```

### Example 2: Grade Calculator

```python
def get_letter_grade(score):
    """Convert numeric score to letter grade"""
    if not 0 <= score <= 100:
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

print(get_letter_grade(95))   # A
print(get_letter_grade(75))   # C
print(get_letter_grade(150))  # Invalid score
```

### Example 3: Password Strength Checker

```python
def check_password_strength(password):
    """Rate password strength"""
    length = len(password)
    
    if length < 6:
        return "Weak"
    elif 6 <= length < 10:
        return "Medium"
    elif length >= 10:
        return "Strong"

print(check_password_strength("abc"))         # Weak
print(check_password_strength("password"))    # Medium
print(check_password_strength("superSecret123"))  # Strong
```

### Example 4: Temperature Classifier

```python
def classify_temperature(celsius):
    """Classify temperature"""
    if celsius < 0:
        return "Freezing"
    elif 0 <= celsius < 15:
        return "Cold"
    elif 15 <= celsius < 25:
        return "Mild"
    elif 25 <= celsius < 35:
        return "Warm"
    else:
        return "Hot"

print(classify_temperature(-5))   # Freezing
print(classify_temperature(20))   # Mild
print(classify_temperature(30))   # Warm
```

### Example 5: String Comparison

```python
def compare_versions(v1, v2):
    """Compare version strings"""
    if v1 == v2:
        return "Same version"
    elif v1 > v2:
        return f"{v1} is newer"
    else:
        return f"{v2} is newer"

print(compare_versions("1.2.0", "1.2.0"))  # Same version
print(compare_versions("2.0.0", "1.9.9"))  # 2.0.0 is newer
print(compare_versions("1.5.0", "1.10.0")) # 1.5.0 is newer (string comparison!)
```

## Common Mistakes

### Mistake 1: Comparing Floats Directly

```python
# ❌ Risky - floating point precision issues
result = 0.1 + 0.2
print(result == 0.3)  # False! (result is 0.30000000000000004)

# ✅ Better - use tolerance
TOLERANCE = 0.0001
print(abs(result - 0.3) < TOLERANCE)  # True
```

### Mistake 2: Using == with Mutable Defaults

```python
# ❌ Common bug
def add_item(item, my_list=[]):
    my_list.append(item)
    return my_list

list1 = add_item(1)
list2 = add_item(2)
print(list1 == list2)  # True - unexpected!

# ✅ Fixed
def add_item_fixed(item, my_list=None):
    if my_list is None:
        my_list = []
    my_list.append(item)
    return my_list
```

### Mistake 3: Confusing = and ==

```python
x = 10

# ❌ Assignment in condition (syntax error in Python)
# if x = 10:  # SyntaxError

# ✅ Comparison
if x == 10:
    print("x is 10")
```

## Comparison with None

Always use `is` or `is not` with None:

```python
value = None

# ✅ Correct
if value is None:
    print("No value")

if value is not None:
    print("Has value")

# ❌ Works but not idiomatic
if value == None:
    print("No value")
```

## Key Takeaways

- **Six comparison operators**: `==`, `!=`, `>`, `<`, `>=`, `<=`
- **Chaining comparisons**: `10 < x < 20` is more Pythonic
- **`==` vs `is`**: Equality vs identity
- Use `is` for **None checks**
- **Operator precedence**: Arithmetic before comparison
- String comparisons are **case-sensitive**
- Be careful with **float comparisons**
- All comparisons return **boolean** values

## What's Next?

You've mastered comparison operators! Next, we'll explore **logical operators** to combine multiple conditions.

---
id: conditionals
title: If Statements and Conditionals
chapterId: ch4-comparisons
order: 1
duration: 30
objectives:
  - Understand boolean logic and comparison operators
  - Learn if, elif, and else statements
  - Master logical operators (and, or, not)
---

# If Statements and Conditionals

Conditionals allow your programs to make decisions and execute different code based on conditions. They're essential for creating dynamic, intelligent programs.

## Boolean Values

Python has two boolean values: `True` and `False` (capitalized)

```python
is_raining = True
is_sunny = False

print(type(is_raining))  # <class 'bool'>
```

## Comparison Operators

Compare values using these operators:

```python
# Equal to
print(5 == 5)    # True
print(5 == 3)    # False

# Not equal to
print(5 != 3)    # True
print(5 != 5)    # False

# Greater than
print(10 > 5)    # True
print(3 > 10)    # False

# Less than
print(3 < 10)    # True
print(10 < 5)    # False

# Greater than or equal to
print(10 >= 10)  # True
print(10 >= 5)   # True

# Less than or equal to
print(5 <= 10)   # True
print(5 <= 5)    # True
```

## The if Statement

Execute code only if a condition is true:

```python
age = 20

if age >= 18:
    print("You are an adult")
    print("You can vote")
```

**Syntax**:
- `if` keyword
- Condition that evaluates to True/False
- Colon `:`
- Indented code block

## The else Statement

Execute alternative code when condition is false:

```python
age = 15

if age >= 18:
    print("You are an adult")
else:
    print("You are a minor")
```

## The elif Statement

Check multiple conditions:

```python
score = 85

if score >= 90:
    print("Grade: A")
elif score >= 80:
    print("Grade: B")
elif score >= 70:
    print("Grade: C")
elif score >= 60:
    print("Grade: D")
else:
    print("Grade: F")
```

## Logical Operators

### and Operator

Both conditions must be true:

```python
age = 25
has_license = True

if age >= 18 and has_license:
    print("You can drive")
```

### or Operator

At least one condition must be true:

```python
is_weekend = True
is_holiday = False

if is_weekend or is_holiday:
    print("No work today!")
```

### not Operator

Inverts the boolean value:

```python
is_raining = False

if not is_raining:
    print("Let's go outside!")
```

## Nested Conditionals

Put if statements inside other if statements:

```python
age = 25
has_ticket = True

if age >= 18:
    if has_ticket:
        print("Welcome to the concert!")
    else:
        print("You need a ticket")
else:
    print("Too young to attend")
```

## Practical Examples

### Example 1: Password Checker

```python
password = input("Enter password: ")

if len(password) >= 8:
    print("Strong password")
else:
    print("Password too short")
```

### Example 2: Temperature Advisory

```python
temperature = 75

if temperature > 90:
    print("It's very hot! Stay hydrated.")
elif temperature > 70:
    print("Nice weather!")
elif temperature > 50:
    print("A bit cool, bring a jacket")
else:
    print("It's cold! Bundle up.")
```

### Example 3: Login System

```python
username = "alice"
password = "secret123"

input_user = input("Username: ")
input_pass = input("Password: ")

if input_user == username and input_pass == password:
    print("Login successful!")
else:
    print("Invalid credentials")
```

## Key Takeaways

- Use **comparison operators**: `==`, `!=`, `>`, `<`, `>=`, `<=`
- **if** executes code when condition is True
- **elif** checks additional conditions
- **else** handles all other cases
- **Logical operators**: `and`, `or`, `not`
- **Indentation matters** - defines code blocks
- Conditions must evaluate to `True` or `False`

## What's Next?

Now that you can make decisions, let's learn about **loops** to repeat code automatically!

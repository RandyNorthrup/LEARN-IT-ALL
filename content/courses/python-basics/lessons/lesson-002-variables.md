---
id: variables
title: Variables and Assignment
chapterId: ch1-intro
order: 2
duration: 20
objectives:
  - Understand what variables are
  - Learn how to create and assign variables
  - Practice with different variable names
---

# Variables and Assignment

A **variable** is a named location in memory that stores a value. Think of it as a labeled box where you can put data and retrieve it later.

## Creating Variables

In Python, you create a variable by assigning a value to a name:

```python
age = 25
name = "Alice"
temperature = 98.6
is_student = True
```

Notice that:
- You don't need to declare the type (Python figures it out)
- Use `=` for assignment (not the same as "equals" in math)
- No semicolons needed at the end of lines

## Variable Naming Rules

Python has specific rules for variable names:

### ✅ Valid Names
```python
age = 30
first_name = "Bob"
total_count = 100
_private = "hidden"
MAX_SIZE = 1000
```

### ❌ Invalid Names
```python
2fast = "No"      # Can't start with a number
first-name = "No" # No hyphens allowed
class = "No"      # Can't use Python keywords
my var = "No"     # No spaces allowed
```

### Best Practices

1. **Use descriptive names**: `student_count` instead of `sc`
2. **Snake case for variables**: `first_name` not `firstName`
3. **UPPERCASE for constants**: `MAX_ATTEMPTS = 3`
4. **Avoid single letters** (except in loops): `name` not `n`

## Assigning Values

You can assign values in several ways:

```python
# Simple assignment
x = 10

# Multiple assignment
a = b = c = 0

# Multiple variables at once
x, y, z = 1, 2, 3

# Swapping values
a, b = b, a
```

## Reassignment

Variables can be reassigned to new values:

```python
score = 0
print(score)  # Output: 0

score = 10
print(score)  # Output: 10

score = score + 5
print(score)  # Output: 15
```

## Using Variables

Once created, you can use variables in expressions:

```python
price = 19.99
quantity = 3
total = price * quantity

print(f"Total: ${total}")  # Output: Total: $59.97
```

## Practice Exercise

Try creating variables for a simple profile:

```python
username = "pythondev"
age = 28
city = "San Francisco"
is_premium = False

print(f"User: {username}")
print(f"Age: {age}")
print(f"Location: {city}")
print(f"Premium: {is_premium}")
```

## Key Takeaways

- Variables store data for later use
- Use descriptive, snake_case names
- No type declaration needed in Python
- Variables can be reassigned anytime
- The `=` operator assigns values (right to left)

Next up, we'll explore the different **data types** that variables can hold!

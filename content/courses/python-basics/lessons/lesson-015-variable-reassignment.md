---
id: variable-reassignment
title: Variable Assignment and Reassignment
chapterId: ch2-variables
order: 2
duration: 25
objectives:
  - Understand variable assignment in Python
  - Master variable reassignment
  - Learn about multiple assignment
  - Understand variable references and mutability
---

# Variable Assignment and Reassignment

Variables in Python are flexible - you can change their values and even their types at any time.

## Basic Assignment

Use the equals sign (`=`) to assign values to variables:

```python
name = "Alice"
age = 25
price = 99.99
is_active = True
```

The variable name goes on the **left**, the value goes on the **right**.

## Reassignment

You can change a variable's value at any time:

```python
score = 0
print(score)  # 0

score = 10
print(score)  # 10

score = 20
print(score)  # 20
```

Each assignment **replaces** the previous value.

## Changing Types

Python allows you to change a variable's type:

```python
value = 42          # int
print(value, type(value))  # 42 <class 'int'>

value = "hello"     # str
print(value, type(value))  # hello <class 'str'>

value = True        # bool
print(value, type(value))  # True <class 'bool'>
```

This is called **dynamic typing** - types are determined at runtime.

## Assignment vs Equality

Don't confuse assignment (`=`) with comparison (`==`):

```python
# Assignment - sets a value
age = 25

# Comparison - checks if equal
if age == 25:
    print("Age is 25")

# Common mistake:
# if age = 25:  # Error! Cannot use = in conditions
```

## Multiple Assignment

Assign the same value to multiple variables:

```python
x = y = z = 0
print(x, y, z)  # 0 0 0

# Equivalent to:
x = 0
y = 0
z = 0
```

## Parallel Assignment (Unpacking)

Assign multiple values at once:

```python
# Assign multiple values
x, y, z = 10, 20, 30
print(x)  # 10
print(y)  # 20
print(z)  # 30

# Swap variables without temp variable
a = 5
b = 10
a, b = b, a
print(a, b)  # 10 5
```

## Augmented Assignment

Shortcut operators for common operations:

```python
# Addition
count = 10
count = count + 1   # Old way
count += 1          # Better way
print(count)        # 12

# Other operators
value = 100
value -= 20   # value = value - 20  → 80
value *= 2    # value = value * 2   → 160
value /= 4    # value = value / 4   → 40.0
value //= 3   # value = value // 3  → 13.0
value %= 5    # value = value % 5   → 3.0
value **= 2   # value = value ** 2  → 9.0
```

## String Augmented Assignment

```python
message = "Hello"
message += " World"
print(message)  # Hello World

name = "Alice"
name *= 3
print(name)  # AliceAliceAlice
```

## List Augmented Assignment

```python
numbers = [1, 2, 3]
numbers += [4, 5]
print(numbers)  # [1, 2, 3, 4, 5]

numbers *= 2
print(numbers)  # [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]
```

## Using Variables in Assignments

You can use a variable's current value to calculate its new value:

```python
price = 100
price = price * 1.1  # Increase by 10%
print(price)  # 110.0

# Or with augmented assignment
price = 100
price *= 1.1
print(price)  # 110.0
```

## Assignment from Expressions

Variables can store the result of calculations:

```python
width = 10
height = 20
area = width * height
print(area)  # 200

# Complex expressions
radius = 5
pi = 3.14159
circle_area = pi * radius ** 2
print(circle_area)  # 78.53975
```

## Practical Examples

### Example 1: Counter

```python
counter = 0

counter += 1  # Increment
print(counter)  # 1

counter += 1
print(counter)  # 2

counter += 5
print(counter)  # 7
```

### Example 2: Shopping Cart

```python
total = 0
print(f"Total: ${total}")

# Add item 1
total += 29.99
print(f"Total: ${total}")  # Total: $29.99

# Add item 2
total += 49.99
print(f"Total: ${total}")  # Total: $79.98

# Apply discount (10% off)
total *= 0.9
print(f"Total after discount: ${total:.2f}")  # Total after discount: $71.98
```

### Example 3: Score Tracking

```python
score = 0

# Player actions
score += 10   # Collected coin
score += 50   # Defeated enemy
score += 100  # Completed level
print(f"Score: {score}")  # Score: 160

# Penalty
score -= 20   # Hit obstacle
print(f"Score: {score}")  # Score: 140
```

### Example 4: Swapping Values

```python
a = 5
b = 10
print(f"Before: a={a}, b={b}")  # Before: a=5, b=10

# Swap using parallel assignment
a, b = b, a
print(f"After: a={a}, b={b}")   # After: a=10, b=5
```

## Common Mistakes

### Mistake 1: Using Before Assignment

```python
# ❌ Error - variable used before assignment
# print(name)  # NameError: name 'name' is not defined

# ✅ Correct - assign first, then use
name = "Alice"
print(name)
```

### Mistake 2: Confusing = and ==

```python
age = 25

# ❌ Wrong - using = instead of ==
# if age = 25:  # SyntaxError
#     print("Age is 25")

# ✅ Correct
if age == 25:
    print("Age is 25")
```

### Mistake 3: Unbalanced Unpacking

```python
# ❌ Error - too many values
# x, y = 1, 2, 3  # ValueError: too many values to unpack

# ✅ Correct - matching counts
x, y, z = 1, 2, 3
print(x, y, z)  # 1 2 3
```

## Key Takeaways

- Use `=` to **assign** values to variables
- Variables can be **reassigned** at any time
- Python uses **dynamic typing** - types can change
- Use `+=`, `-=`, `*=` for **augmented assignment**
- **Parallel assignment** allows multiple assignments at once
- Variables must be **assigned before use**

## What's Next?

You've mastered variable assignment! Next, we'll learn about **variable scope** and how Python finds variables.

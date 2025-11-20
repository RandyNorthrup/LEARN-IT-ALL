---
id: numbers-and-math
title: Numbers and Mathematical Operations
chapterId: ch1-intro
order: 5
duration: 25
objectives:
  - Understand integers and floating-point numbers
  - Master arithmetic operators in Python
  - Learn about operator precedence and built-in math functions
---

# Numbers and Mathematical Operations

Python provides powerful support for numerical computations. Let's explore how to work with numbers and perform mathematical operations.

## Number Types Review

Python has two primary numeric types:

### Integers (int)
Whole numbers without decimal points:

```python
positive = 42
negative = -17
zero = 0
large = 1000000000000
```

### Floats (float)
Numbers with decimal points:

```python
price = 19.99
temperature = -3.5
pi = 3.14159
scientific = 1.5e-4  # 0.00015
```

## Basic Arithmetic Operators

### Addition (+)
```python
result = 10 + 5
print(result)  # 15

price = 19.99
tax = 2.50
total = price + tax
print(total)  # 22.49
```

### Subtraction (-)
```python
result = 20 - 8
print(result)  # 12

balance = 100
withdrawal = 25
new_balance = balance - withdrawal
print(new_balance)  # 75
```

### Multiplication (*)
```python
result = 6 * 7
print(result)  # 42

price = 9.99
quantity = 3
total = price * quantity
print(total)  # 29.97
```

### Division (/)
Always returns a float:

```python
result = 10 / 2
print(result)  # 5.0 (float, not int!)

result = 10 / 3
print(result)  # 3.3333333333333335
```

### Floor Division (//)
Returns the quotient without remainder (integer division):

```python
result = 10 // 3
print(result)  # 3

result = 17 // 5
print(result)  # 3

# Works with negatives
result = -10 // 3
print(result)  # -4 (rounds down, not toward zero!)
```

### Modulus (%)
Returns the remainder after division:

```python
result = 10 % 3
print(result)  # 1

result = 17 % 5
print(result)  # 2

# Check if even or odd
number = 42
if number % 2 == 0:
    print("Even")
else:
    print("Odd")
```

### Exponentiation (**)
Raises a number to a power:

```python
result = 2 ** 3
print(result)  # 8 (2 * 2 * 2)

result = 5 ** 2
print(result)  # 25 (5 * 5)

# Square roots using fractional exponents
result = 16 ** 0.5
print(result)  # 4.0 (square root of 16)

result = 27 ** (1/3)
print(result)  # 3.0 (cube root of 27)
```

## Operator Precedence

Python follows standard mathematical order of operations (PEMDAS):

1. **P**arentheses `()`
2. **E**xponentiation `**`
3. **M**ultiplication and **D**ivision `*`, `/`, `//`, `%` (left to right)
4. **A**ddition and **S**ubtraction `+`, `-` (left to right)

```python
# Without parentheses
result = 2 + 3 * 4
print(result)  # 14 (not 20!)

# With parentheses
result = (2 + 3) * 4
print(result)  # 20

# Complex expression
result = 10 + 2 ** 3 * 4 / 2
print(result)  # 10 + 8 * 4 / 2 = 10 + 32 / 2 = 10 + 16 = 26
```

## Compound Assignment Operators

Shorthand for updating variables:

```python
# Addition
count = 10
count += 5  # Same as: count = count + 5
print(count)  # 15

# Subtraction
balance = 100
balance -= 25  # Same as: balance = balance - 25
print(balance)  # 75

# Multiplication
score = 10
score *= 2  # Same as: score = score * 2
print(score)  # 20

# Division
value = 100
value /= 4  # Same as: value = value / 4
print(value)  # 25.0

# Floor division
value = 17
value //= 3  # Same as: value = value // 3
print(value)  # 5

# Modulus
value = 17
value %= 5  # Same as: value = value % 5
print(value)  # 2

# Exponentiation
value = 2
value **= 3  # Same as: value = value ** 3
print(value)  # 8
```

## Built-in Math Functions

Python provides several useful built-in functions:

### abs() - Absolute Value
```python
print(abs(-10))    # 10
print(abs(10))     # 10
print(abs(-3.5))   # 3.5
```

### round() - Rounding
```python
print(round(3.14159))       # 3
print(round(3.14159, 2))    # 3.14 (2 decimal places)
print(round(3.5))           # 4 (rounds to nearest even)
print(round(2.5))           # 2 (rounds to nearest even)
```

### min() and max()
```python
print(min(5, 2, 8, 1))      # 1
print(max(5, 2, 8, 1))      # 8

numbers = [10, 25, 5, 40]
print(min(numbers))         # 5
print(max(numbers))         # 40
```

### sum()
```python
numbers = [1, 2, 3, 4, 5]
total = sum(numbers)
print(total)  # 15

# With start value
total = sum(numbers, 10)  # 10 + 1 + 2 + 3 + 4 + 5
print(total)  # 25
```

### pow() - Power
```python
print(pow(2, 3))      # 8 (same as 2 ** 3)
print(pow(5, 2))      # 25
print(pow(2, 3, 5))   # 3 (2^3 mod 5 = 8 mod 5 = 3)
```

## The math Module

For advanced mathematical operations, import the `math` module:

```python
import math

# Constants
print(math.pi)    # 3.141592653589793
print(math.e)     # 2.718281828459045

# Square root
print(math.sqrt(16))    # 4.0
print(math.sqrt(2))     # 1.4142135623730951

# Rounding functions
print(math.ceil(3.2))   # 4 (round up)
print(math.floor(3.8))  # 3 (round down)

# Trigonometry (angles in radians)
print(math.sin(math.pi / 2))   # 1.0
print(math.cos(0))             # 1.0
print(math.tan(math.pi / 4))   # 0.9999999999999999

# Logarithms
print(math.log(10))       # 2.302585092994046 (natural log)
print(math.log10(100))    # 2.0 (base 10 log)
print(math.log2(8))       # 3.0 (base 2 log)

# Factorials
print(math.factorial(5))  # 120 (5 * 4 * 3 * 2 * 1)

# Greatest common divisor
print(math.gcd(48, 18))   # 6
```

## Type Conversion in Math

### Int to Float
```python
x = 5
y = float(x)
print(y)  # 5.0
print(type(y))  # <class 'float'>
```

### Float to Int (Truncates)
```python
x = 5.9
y = int(x)
print(y)  # 5 (not 6!)
print(type(y))  # <class 'int'>

# Negative numbers
x = -5.9
y = int(x)
print(y)  # -5 (truncates toward zero)
```

### Division Always Returns Float
```python
result = 10 / 2
print(result)  # 5.0 (float)
print(type(result))  # <class 'float'>

# Convert to int if needed
result = int(10 / 2)
print(result)  # 5 (int)
```

## Practical Examples

### Example 1: Calculate Circle Area
```python
import math

radius = 5
area = math.pi * radius ** 2
print(f"Area of circle: {area:.2f}")  # Area of circle: 78.54
```

### Example 2: Convert Temperature
```python
# Celsius to Fahrenheit
celsius = 25
fahrenheit = (celsius * 9/5) + 32
print(f"{celsius}°C = {fahrenheit}°F")  # 25°C = 77.0°F

# Fahrenheit to Celsius
fahrenheit = 98.6
celsius = (fahrenheit - 32) * 5/9
print(f"{fahrenheit}°F = {celsius:.1f}°C")  # 98.6°F = 37.0°C
```

### Example 3: Calculate Average
```python
numbers = [85, 92, 78, 90, 88]
average = sum(numbers) / len(numbers)
print(f"Average: {average:.2f}")  # Average: 86.60
```

### Example 4: Compound Interest
```python
principal = 1000
rate = 0.05  # 5%
time = 10    # years

amount = principal * (1 + rate) ** time
interest = amount - principal

print(f"Final amount: ${amount:.2f}")      # Final amount: $1628.89
print(f"Interest earned: ${interest:.2f}") # Interest earned: $628.89
```

### Example 5: Check if Number is Prime
```python
import math

def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(math.sqrt(n)) + 1):
        if n % i == 0:
            return False
    return True

print(is_prime(17))  # True
print(is_prime(18))  # False
```

## Common Math Mistakes

### Mistake 1: Integer Division in Python 2 Style
```python
# In Python 3, / always does float division
result = 5 / 2
print(result)  # 2.5

# Use // for integer division
result = 5 // 2
print(result)  # 2
```

### Mistake 2: Comparing Floats
```python
# Wrong: Direct float comparison
result = 0.1 + 0.2
print(result == 0.3)  # False! (due to floating point precision)

# Right: Use a tolerance
tolerance = 0.0001
print(abs(result - 0.3) < tolerance)  # True
```

### Mistake 3: Forgetting Operator Precedence
```python
# Wrong: Unexpected result
result = 10 + 5 * 2
print(result)  # 20 (not 30!)

# Right: Use parentheses for clarity
result = (10 + 5) * 2
print(result)  # 30
```

### Mistake 4: Division by Zero
```python
# Error
result = 10 / 0  # ZeroDivisionError!

# Better: Check first
divisor = 0
if divisor != 0:
    result = 10 / divisor
else:
    print("Cannot divide by zero")
```

## Key Takeaways

- **Arithmetic operators**: `+`, `-`, `*`, `/`, `//`, `%`, `**`
- **Division `/`** always returns float; use **`//`** for integer division
- **Modulus `%`** returns remainder (useful for checking even/odd)
- **Operator precedence**: Parentheses → Exponents → Multiply/Divide → Add/Subtract
- **Compound operators**: `+=`, `-=`, `*=`, `/=`, etc.
- **Built-in functions**: `abs()`, `round()`, `min()`, `max()`, `sum()`, `pow()`
- **math module** for advanced operations: `math.sqrt()`, `math.ceil()`, `math.floor()`, etc.
- Floats have **precision limitations** - use tolerance for comparisons

## What's Next?

You've mastered numbers! Next, we'll learn about **user input** and how to make interactive programs!

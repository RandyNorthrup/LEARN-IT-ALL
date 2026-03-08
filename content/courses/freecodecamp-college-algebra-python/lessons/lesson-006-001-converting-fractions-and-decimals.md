---
id: lesson-006-001
title: Converting Fractions and Decimals
chapterId: chapter-06
order: 1
duration: 5
objectives:
  - Convert fractions to decimals and decimals to fractions
  - Understand repeating decimals and their fraction equivalents
  - Work with mixed numbers and improper fractions
  - Use Python's fractions.Fraction and decimal.Decimal modules
---

# Converting Fractions and Decimals

Fractions and decimals are two ways of representing the same values. Being fluent in converting between them is fundamental to algebra and essential for working with real data in Python.

## Fractions to Decimals

To convert a fraction to a decimal, simply divide the numerator by the denominator:

- 3/4 = 3 ÷ 4 = 0.75
- 1/3 = 1 ÷ 3 = 0.3333... (repeating)
- 7/8 = 7 ÷ 8 = 0.875

```python
# Basic conversion
print(3/4)    # 0.75
print(1/3)    # 0.3333333333333333
print(7/8)    # 0.875
print(5/6)    # 0.8333333333333334
print(22/7)   # 3.142857142857143
```

## Decimals to Fractions

The key is recognizing the place value:
- 0.75 = 75/100 = 3/4 (simplify by dividing both by 25)
- 0.6 = 6/10 = 3/5
- 0.125 = 125/1000 = 1/8

Python's `fractions` module handles this automatically:

```python
from fractions import Fraction

# Decimal to fraction (use string for exact representation)
print(Fraction('0.75'))    # 3/4
print(Fraction('0.6'))     # 3/5
print(Fraction('0.125'))   # 1/8
print(Fraction('0.375'))   # 3/8
print(Fraction('2.5'))     # 5/2

# From float (may have precision issues)
print(Fraction(0.1))  # 3602879701896397/36028797018963968 (not exact!)
# Always use strings for exact conversion:
print(Fraction('0.1'))  # 1/10
```

## Repeating Decimals

Some fractions produce decimals that repeat forever:

- 1/3 = 0.333... (3 repeating)
- 1/6 = 0.1666... (6 repeating)
- 1/7 = 0.142857142857... (142857 repeating)
- 1/9 = 0.111... (1 repeating)
- 1/11 = 0.090909... (09 repeating)

### Converting Repeating Decimals to Fractions

For 0.333...:
Let x = 0.333...
10x = 3.333...
10x - x = 3
9x = 3
x = 3/9 = 1/3

```python
from sympy import symbols, Eq, solve, Rational

# Method: algebraic approach for 0.272727...
x = symbols('x')
# 100x = 27.272727...
# 100x - x = 27
# 99x = 27
solution = solve(Eq(99*x, 27), x)
print(f"0.272727... = {solution[0]}")  # 3/11

# SymPy's Rational for exact fractions
print(Rational(3, 11))         # 3/11
print(float(Rational(3, 11)))  # 0.2727272727272727
```

## Mixed Numbers and Improper Fractions

A **mixed number** combines a whole number and a fraction: 3 1/2

An **improper fraction** has a numerator larger than its denominator: 7/2

Converting between them:
- Mixed to improper: 3 1/2 = (3*2 + 1)/2 = 7/2
- Improper to mixed: 7/2 = 3 remainder 1 = 3 1/2

```python
from fractions import Fraction

def mixed_to_improper(whole, numerator, denominator):
    """Convert mixed number to improper fraction."""
    return Fraction(whole * denominator + numerator, denominator)

def improper_to_mixed(fraction):
    """Convert improper fraction to mixed number string."""
    whole = fraction.numerator // fraction.denominator
    remainder = fraction.numerator % fraction.denominator
    if remainder == 0:
        return str(whole)
    return f"{whole} {remainder}/{fraction.denominator}"

# Mixed to improper
result = mixed_to_improper(3, 1, 2)
print(f"3 1/2 = {result}")  # 7/2

result = mixed_to_improper(2, 3, 4)
print(f"2 3/4 = {result}")  # 11/4

# Improper to mixed
print(improper_to_mixed(Fraction(7, 2)))   # 3 1/2
print(improper_to_mixed(Fraction(17, 5)))  # 3 2/5
print(improper_to_mixed(Fraction(9, 3)))   # 3
```

## Percentages

Percentages are fractions with denominator 100:
- 75% = 75/100 = 3/4 = 0.75
- 33.3% = 1/3

```python
from fractions import Fraction

def to_percent(fraction):
    return float(fraction) * 100

def from_percent(percent):
    return Fraction(percent, 100)

# Convert between all three representations
fractions_list = [Fraction(1, 4), Fraction(1, 3), Fraction(2, 5), Fraction(7, 8)]

print(f"{'Fraction':<12} {'Decimal':<12} {'Percent':<12}")
print("-" * 36)
for f in fractions_list:
    print(f"{str(f):<12} {float(f):<12.4f} {to_percent(f):<12.2f}%")

# Output:
# Fraction     Decimal      Percent
# ------------------------------------
# 1/4          0.2500       25.00%
# 1/3          0.3333       33.33%
# 2/5          0.4000       40.00%
# 7/8          0.8750       87.50%
```

## Decimal Precision with the decimal Module

Floating-point arithmetic can produce surprising results:

```python
# Floating point imprecision
print(0.1 + 0.2)        # 0.30000000000000004 (not exactly 0.3!)
print(0.1 + 0.2 == 0.3)  # False

# Using Decimal for exact arithmetic
from decimal import Decimal, getcontext

getcontext().prec = 50  # Set precision to 50 digits

a = Decimal('0.1')
b = Decimal('0.2')
print(a + b)         # 0.3
print(a + b == Decimal('0.3'))  # True

# High precision pi calculation check
pi = Decimal('3.14159265358979323846264338327950288419716939937510')
print(f"Pi to 50 digits: {pi}")
```

## Practical Application: Grade Calculator

```python
from fractions import Fraction

def grade_calculator(earned, total):
    fraction = Fraction(earned, total)
    percentage = float(fraction) * 100
    if percentage >= 90: letter = 'A'
    elif percentage >= 80: letter = 'B'
    elif percentage >= 70: letter = 'C'
    elif percentage >= 60: letter = 'D'
    else: letter = 'F'
    return fraction, percentage, letter

scores = [(45, 50), (38, 50), (82, 100), (17, 25), (28, 40)]

for earned, total in scores:
    frac, pct, grade = grade_calculator(earned, total)
    print(f"{earned}/{total} = {frac} = {pct:.1f}% = {grade}")
```

Understanding the relationship between fractions, decimals, and percentages is one of the most practical algebra skills you will use daily.

*Based on the [freeCodeCamp College Algebra with Python Certification](https://www.freecodecamp.org/learn/college-algebra-with-python/)*

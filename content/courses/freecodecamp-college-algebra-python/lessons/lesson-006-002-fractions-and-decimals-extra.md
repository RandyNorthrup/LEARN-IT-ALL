---
id: lesson-006-002
title: Fractions and Decimals: Extra
chapterId: chapter-06
order: 2
duration: 5
objectives:
  - Add, subtract, multiply, and divide fractions
  - Simplify complex fractions
  - Rationalize denominators containing square roots
  - Perform fraction arithmetic with Python
---

# Operations with Fractions

This lesson covers the mechanics of fraction arithmetic — the operations you need to manipulate algebraic expressions and solve equations involving fractions.

## Adding and Subtracting Fractions

To add or subtract fractions, you need a **common denominator**:

- 1/3 + 1/4 = 4/12 + 3/12 = 7/12
- 5/6 - 1/4 = 10/12 - 3/12 = 7/12

The **least common denominator (LCD)** is the least common multiple of the denominators.

```python
from fractions import Fraction
import math

# Python handles finding the LCD automatically
print(Fraction(1, 3) + Fraction(1, 4))   # 7/12
print(Fraction(5, 6) - Fraction(1, 4))   # 7/12
print(Fraction(2, 5) + Fraction(3, 7))   # 29/35
print(Fraction(7, 8) - Fraction(2, 3))   # 5/24

# Finding LCD manually
def find_lcd(a, b):
    return abs(a * b) // math.gcd(a, b)

print(f"LCD of 3 and 4: {find_lcd(3, 4)}")   # 12
print(f"LCD of 6 and 4: {find_lcd(6, 4)}")   # 12
print(f"LCD of 5 and 7: {find_lcd(5, 7)}")   # 35
```

### Step-by-Step Addition

```python
from fractions import Fraction
import math

def add_fractions_verbose(n1, d1, n2, d2):
    """Add two fractions with step-by-step output."""
    lcd = abs(d1 * d2) // math.gcd(d1, d2)
    new_n1 = n1 * (lcd // d1)
    new_n2 = n2 * (lcd // d2)
    
    print(f"  {n1}/{d1} + {n2}/{d2}")
    print(f"  LCD = {lcd}")
    print(f"  = {new_n1}/{lcd} + {new_n2}/{lcd}")
    print(f"  = {new_n1 + new_n2}/{lcd}")
    
    result = Fraction(new_n1 + new_n2, lcd)
    print(f"  = {result} (simplified)")
    return result

add_fractions_verbose(2, 3, 3, 5)
# 2/3 + 3/5
# LCD = 15
# = 10/15 + 9/15
# = 19/15
# = 19/15
```

## Multiplying Fractions

Multiply numerators together and denominators together. No common denominator needed:

- (2/3) * (4/5) = 8/15
- (3/7) * (14/9) = 42/63 = 2/3

```python
from fractions import Fraction

print(Fraction(2, 3) * Fraction(4, 5))    # 8/15
print(Fraction(3, 7) * Fraction(14, 9))   # 2/3 (auto-simplified)
print(Fraction(5, 6) * Fraction(3, 10))   # 1/4
```

**Cross-cancellation** simplifies before multiplying:
- (3/7) * (14/9): Cancel 3 with 9 (factor of 3) and 7 with 14 (factor of 7)
- = (1/1) * (2/3) = 2/3

## Dividing Fractions

Dividing by a fraction is the same as multiplying by its **reciprocal** (flipped):

- (2/3) ÷ (4/5) = (2/3) * (5/4) = 10/12 = 5/6
- (7/8) ÷ (3/4) = (7/8) * (4/3) = 28/24 = 7/6

```python
from fractions import Fraction

print(Fraction(2, 3) / Fraction(4, 5))   # 5/6
print(Fraction(7, 8) / Fraction(3, 4))   # 7/6
print(Fraction(5, 9) / Fraction(10, 3))  # 1/6
```

## Complex Fractions

A **complex fraction** is a fraction that contains fractions in its numerator, denominator, or both:

(1/2 + 1/3) / (1/4 - 1/6)

Simplify by computing numerator and denominator separately:

```python
from fractions import Fraction

numerator = Fraction(1, 2) + Fraction(1, 3)    # 5/6
denominator = Fraction(1, 4) - Fraction(1, 6)  # 1/12

result = numerator / denominator
print(f"({Fraction(1,2)} + {Fraction(1,3)}) / ({Fraction(1,4)} - {Fraction(1,6)})")
print(f"= {numerator} / {denominator}")
print(f"= {result}")  # 10
```

Alternatively, multiply numerator and denominator by the LCD of all inner fractions:

```python
from fractions import Fraction

# LCD of 2, 3, 4, 6 is 12
# Multiply top and bottom by 12:
# top: 12(1/2) + 12(1/3) = 6 + 4 = 10
# bottom: 12(1/4) - 12(1/6) = 3 - 2 = 1
# Result: 10/1 = 10
print("Multiply all parts by LCD (12):")
top = 12 * Fraction(1,2) + 12 * Fraction(1,3)
bottom = 12 * Fraction(1,4) - 12 * Fraction(1,6)
print(f"{top} / {bottom} = {top / bottom}")  # 10
```

## Rationalizing Denominators

In algebra, we often need to eliminate square roots from denominators.

**Single term:** Multiply top and bottom by the square root:
- 5/sqrt(3) = 5*sqrt(3)/(sqrt(3)*sqrt(3)) = 5*sqrt(3)/3

**Binomial with square root:** Multiply by the conjugate:
- 2/(3 + sqrt(5)) = 2(3 - sqrt(5))/((3 + sqrt(5))(3 - sqrt(5))) = 2(3 - sqrt(5))/(9 - 5) = (3 - sqrt(5))/2

```python
from sympy import sqrt, simplify, radsimp, Rational

# Single term rationalization
expr1 = 5 / sqrt(3)
print(f"5/sqrt(3) = {radsimp(expr1)}")  # 5*sqrt(3)/3

# Binomial rationalization (conjugate method)
expr2 = 2 / (3 + sqrt(5))
print(f"2/(3+sqrt(5)) = {radsimp(expr2)}")  # -sqrt(5)/2 + 3/2
print(f"Simplified: {simplify(expr2)}")

# More examples
expr3 = Rational(1, 1) / sqrt(2)
print(f"1/sqrt(2) = {radsimp(expr3)}")  # sqrt(2)/2

expr4 = 3 / (sqrt(7) - sqrt(2))
print(f"3/(sqrt(7)-sqrt(2)) = {radsimp(expr4)}")
# 3*(sqrt(2) + sqrt(7))/5
```

## Fraction Arithmetic Table Generator

```python
from fractions import Fraction

def fraction_table(f1, f2):
    """Show all four operations between two fractions."""
    print(f"Operations with {f1} and {f2}:")
    print(f"  Add:      {f1} + {f2} = {f1 + f2}")
    print(f"  Subtract: {f1} - {f2} = {f1 - f2}")
    print(f"  Multiply: {f1} * {f2} = {f1 * f2}")
    print(f"  Divide:   {f1} / {f2} = {f1 / f2}")
    print()

fraction_table(Fraction(2, 3), Fraction(3, 4))
fraction_table(Fraction(5, 8), Fraction(1, 6))
fraction_table(Fraction(7, 12), Fraction(5, 9))
```

Mastering fraction operations makes algebraic manipulation much smoother, especially when solving equations with rational expressions.

*Based on the [freeCodeCamp College Algebra with Python Certification](https://www.freecodecamp.org/learn/college-algebra-with-python/)*

---
id: lesson-004-001
title: Factoring
chapterId: chapter-04
order: 1
duration: 5
objectives:
  - Factor out the greatest common factor (GCF)
  - Factor difference of squares and perfect square trinomials
  - Factor general trinomials using the AC method
  - Factor sum and difference of cubes
  - Use SymPy's factor() function to verify results
---

# Factoring Polynomials

Factoring is the process of breaking an expression into a product of simpler expressions. It is the reverse of expanding (distributing). Factoring is essential for solving polynomial equations, simplifying expressions, and finding roots.

## Why Factor?

If you can factor x**2 - 5x + 6 into (x - 2)(x - 3), you immediately know the solutions to x**2 - 5x + 6 = 0 are x = 2 and x = 3 (since one of the factors must equal zero).

## Setting Up SymPy

```python
from sympy import symbols, factor, expand, solve
x = symbols('x')
```

## Method 1: Greatest Common Factor (GCF)

Always check for a GCF first. Pull out the largest factor common to all terms:

- 6x**3 + 9x**2 = 3x**2(2x + 3)
- 4x**2y - 8xy + 12xy**2 = 4xy(x - 2 + 3y)

```python
from sympy import symbols, factor
x, y = symbols('x y')

print(factor(6*x**3 + 9*x**2))          # 3*x**2*(2*x + 3)
print(factor(4*x**2*y - 8*x*y + 12*x*y**2))  # 4*x*y*(x + 3*y - 2)
```

Manual GCF finder:

```python
import math

def find_gcf(numbers):
    """Find the GCF of a list of numbers."""
    result = numbers[0]
    for n in numbers[1:]:
        result = math.gcd(result, n)
    return result

print(find_gcf([6, 9]))       # 3
print(find_gcf([12, 18, 24])) # 6
print(find_gcf([4, 8, 12]))   # 4
```

## Method 2: Difference of Squares

Pattern: **a**2 - b**2 = (a + b)(a - b)**

This only works for subtraction of two perfect squares:

- x**2 - 25 = (x + 5)(x - 5)
- 4x**2 - 9 = (2x + 3)(2x - 3)
- 16x**4 - 1 = (4x**2 + 1)(4x**2 - 1) = (4x**2 + 1)(2x + 1)(2x - 1)

```python
from sympy import symbols, factor
x = symbols('x')

print(factor(x**2 - 25))     # (x - 5)*(x + 5)
print(factor(4*x**2 - 9))    # (2*x - 3)*(2*x + 3)
print(factor(16*x**4 - 1))   # (2*x - 1)*(2*x + 1)*(4*x**2 + 1)
```

**Note:** a**2 + b**2 (sum of squares) does NOT factor over the real numbers.

## Method 3: Perfect Square Trinomials

Patterns:
- a**2 + 2ab + b**2 = (a + b)**2
- a**2 - 2ab + b**2 = (a - b)**2

Check: Is the first term a perfect square? Is the last term a perfect square? Is the middle term twice the product of their roots?

- x**2 + 10x + 25 = (x + 5)**2 because 2(x)(5) = 10x ✓
- 9x**2 - 12x + 4 = (3x - 2)**2 because 2(3x)(2) = 12x ✓

```python
from sympy import symbols, factor
x = symbols('x')

print(factor(x**2 + 10*x + 25))   # (x + 5)**2
print(factor(9*x**2 - 12*x + 4))  # (3*x - 2)**2
```

## Method 4: Factoring Trinomials (ax**2 + bx + c)

### When a = 1: x**2 + bx + c

Find two numbers that **multiply to c** and **add to b**:

- x**2 + 7x + 12: numbers that multiply to 12 and add to 7 are 3 and 4
  - Result: (x + 3)(x + 4)

- x**2 - 2x - 15: numbers that multiply to -15 and add to -2 are -5 and 3
  - Result: (x - 5)(x + 3)

### When a ≠ 1: The AC Method

For 2x**2 + 7x + 3:
1. Multiply a * c = 2 * 3 = 6
2. Find two numbers that multiply to 6 and add to 7: **1 and 6**
3. Rewrite: 2x**2 + 1x + 6x + 3
4. Factor by grouping: x(2x + 1) + 3(2x + 1) = (x + 3)(2x + 1)

```python
from sympy import symbols, factor
x = symbols('x')

print(factor(x**2 + 7*x + 12))   # (x + 3)*(x + 4)
print(factor(x**2 - 2*x - 15))   # (x - 5)*(x + 3)
print(factor(2*x**2 + 7*x + 3))  # (x + 3)*(2*x + 1)
print(factor(6*x**2 - 7*x - 3))  # (2*x - 3)*(3*x + 1)
```

## Method 5: Sum and Difference of Cubes

Patterns:
- a**3 + b**3 = (a + b)(a**2 - ab + b**2)
- a**3 - b**3 = (a - b)(a**2 + ab + b**2)

Memory aid: **SOAP** — Same sign, Opposite sign, Always Positive

```python
from sympy import symbols, factor
x = symbols('x')

print(factor(x**3 + 8))     # (x + 2)*(x**2 - 2*x + 4)
print(factor(x**3 - 27))    # (x - 3)*(x**2 + 3*x + 9)
print(factor(8*x**3 + 125)) # (2*x + 5)*(4*x**2 - 10*x + 25)
```

## Factoring Strategy Flowchart

1. **GCF first** — always
2. **Two terms?** → Check difference of squares or sum/difference of cubes
3. **Three terms?** → Check perfect square trinomial, then try AC method
4. **Four terms?** → Try grouping

## Complete Factoring Examples

```python
from sympy import symbols, factor, expand
x = symbols('x')

# Factor completely (may require multiple steps)
expressions = [
    2*x**3 - 18*x,             # 2x(x-3)(x+3)
    3*x**2 + 12*x + 12,         # 3*(x+2)**2
    x**4 - 16,                  # (x-2)*(x+2)*(x**2+4)
    5*x**3 - 40,                # 5*(x-2)*(x**2+2*x+4)
]

for expr in expressions:
    factored = factor(expr)
    print(f"{expr}  =  {factored}")
    # Verify by expanding back
    assert expand(factored) == expand(expr)
```

Factoring is a skill that improves dramatically with practice. Use SymPy's `factor()` to check your manual work, but always try by hand first.

*Based on the [freeCodeCamp College Algebra with Python Certification](https://www.freecodecamp.org/learn/college-algebra-with-python/)*

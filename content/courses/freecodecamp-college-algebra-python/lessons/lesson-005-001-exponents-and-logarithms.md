---
id: lesson-005-001
title: Exponents and Logarithms
chapterId: chapter-05
order: 1
duration: 5
objectives:
  - Apply exponent rules for simplifying expressions
  - Convert between exponential and logarithmic forms
  - Use common, natural, and arbitrary base logarithms
  - Solve exponential and logarithmic equations with Python
---

# Exponents and Logarithms

Exponents and logarithms are inverse operations, just like multiplication and division. Mastering both is essential for understanding growth, decay, compound interest, and many science/engineering applications.

## Exponent Rules

Let a and b be nonzero numbers and m, n be any real numbers:

| Rule | Formula | Example |
|------|---------|--------|
| Product Rule | a**m * a**n = a**(m+n) | x**3 * x**4 = x**7 |
| Quotient Rule | a**m / a**n = a**(m-n) | x**8 / x**3 = x**5 |
| Power Rule | (a**m)**n = a**(m*n) | (x**2)**3 = x**6 |
| Power of Product | (ab)**n = a**n * b**n | (2x)**3 = 8x**3 |
| Power of Quotient | (a/b)**n = a**n / b**n | (x/3)**2 = x**2/9 |
| Zero Exponent | a**0 = 1 | 5**0 = 1 |
| Negative Exponent | a**(-n) = 1/a**n | x**(-2) = 1/x**2 |
| Fractional Exponent | a**(1/n) = n-th root of a | 8**(1/3) = 2 |

### Verifying with Python

```python
# Product Rule
print(2**3 * 2**4 == 2**7)  # True (8 * 16 = 128)

# Quotient Rule
print(3**8 / 3**5 == 3**3)  # True (6561 / 243 = 27)

# Power Rule
print((2**3)**4 == 2**12)   # True (8**4 = 4096)

# Zero Exponent
print(999**0)  # 1

# Negative Exponent
print(2**(-3))     # 0.125 = 1/8
print(1 / 2**3)    # 0.125

# Fractional Exponent
print(8**(1/3))    # 2.0 (cube root of 8)
print(16**(1/4))   # 2.0 (fourth root of 16)
print(27**(2/3))   # 9.0 (cube root of 27, then squared)
```

### Simplifying with SymPy

```python
from sympy import symbols, simplify, powsimp
x, y = symbols('x y', positive=True)

print(powsimp(x**3 * x**5))         # x**8
print(powsimp(x**10 / x**4))        # x**6
print(powsimp((x**2 * y**3)**4))    # x**8*y**12
```

## Scientific Notation

Scientific notation uses powers of 10 to express very large or small numbers:

- 6,370,000 = 6.37 * 10**6
- 0.000042 = 4.2 * 10**(-5)

```python
# Python uses 'e' notation
print(6.37e6)    # 6370000.0
print(4.2e-5)    # 4.2e-05

# Formatting
print(f"{6370000:.2e}")    # 6.37e+06
print(f"{0.000042:.1e}")   # 4.2e-05
```

## What Is a Logarithm?

A logarithm answers: **"To what power must the base be raised to get this number?"**

If b**y = x, then log_b(x) = y.

- log_10(1000) = 3 because 10**3 = 1000
- log_2(32) = 5 because 2**5 = 32
- log_5(125) = 3 because 5**3 = 125

### Common and Natural Logarithms

- **Common log** (log or log10): base 10
- **Natural log** (ln): base e (Euler's number, approximately 2.71828)

```python
import math

# Common logarithm (base 10)
print(math.log10(1000))  # 3.0
print(math.log10(50))    # 1.699

# Natural logarithm (base e)
print(math.log(math.e))      # 1.0
print(math.log(100))         # 4.605

# Logarithm with any base
print(math.log(32, 2))   # 5.0 (log base 2 of 32)
print(math.log(125, 5))  # 3.0 (log base 5 of 125)
print(math.log(81, 3))   # 4.0 (log base 3 of 81)
```

## Logarithm Rules

| Rule | Formula |
|------|--------|
| Product Rule | log(a * b) = log(a) + log(b) |
| Quotient Rule | log(a / b) = log(a) - log(b) |
| Power Rule | log(a**n) = n * log(a) |
| Change of Base | log_b(a) = log(a) / log(b) |
| log(1) | log_b(1) = 0 for any base b |
| log(base) | log_b(b) = 1 |

```python
import math

# Product Rule: log(a*b) = log(a) + log(b)
print(math.log10(6))                           # 0.778
print(math.log10(2) + math.log10(3))           # 0.778 ✓

# Quotient Rule: log(a/b) = log(a) - log(b)
print(math.log10(5))                           # 0.699
print(math.log10(10) - math.log10(2))          # 0.699 ✓

# Power Rule: log(a^n) = n*log(a)
print(math.log10(1000))                        # 3.0
print(3 * math.log10(10))                      # 3.0 ✓

# Change of Base: log_b(a) = log(a) / log(b)
log_base_3_of_81 = math.log(81) / math.log(3)
print(log_base_3_of_81)  # 4.0
```

## Solving Exponential Equations

*"Solve 3**x = 243"*

Manual: x = log_3(243) = log(243)/log(3)

```python
import math
from sympy import symbols, Eq, solve, log

# Using math
x = math.log(243) / math.log(3)
print(f"3^x = 243 => x = {x}")  # x = 5.0

# Using SymPy
x = symbols('x')
solution = solve(Eq(3**x, 243), x)
print(f"SymPy solution: {solution}")  # [5]
```

*"Solve 2**(3x-1) = 64"*

```python
from sympy import symbols, Eq, solve

x = symbols('x')
solution = solve(Eq(2**(3*x - 1), 64), x)
print(f"Solution: x = {solution}")  # x = 7/3
```

## Solving Logarithmic Equations

*"Solve log_2(x) + log_2(x-2) = 3"*

Using the product rule: log_2(x(x-2)) = 3, so x(x-2) = 2**3 = 8.

```python
from sympy import symbols, Eq, solve

x = symbols('x')
# x(x-2) = 8 => x^2 - 2x - 8 = 0
equation = Eq(x**2 - 2*x - 8, 0)
solutions = solve(equation, x)
print(f"Solutions: {solutions}")  # [-2, 4]

# Check domain: x must be > 2 (both log arguments must be positive)
valid = [s for s in solutions if s > 2]
print(f"Valid solution: x = {valid[0]}")  # x = 4
```

## Exponential Growth and Decay

```python
import matplotlib.pyplot as plt
import numpy as np

t = np.linspace(0, 5, 100)

plt.figure(figsize=(10, 5))
plt.plot(t, 2**t, label='$y = 2^t$ (growth)', linewidth=2)
plt.plot(t, (1/2)**t, label='$y = (1/2)^t$ (decay)', linewidth=2)
plt.plot(t, np.e**t, label='$y = e^t$ (natural growth)', linewidth=2, linestyle='--')
plt.xlabel('t')
plt.ylabel('y')
plt.title('Exponential Growth and Decay')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()
```

Exponents and logarithms unlock the mathematics of change over time — from population growth to radioactive decay to investment returns.

*Based on the [freeCodeCamp College Algebra with Python Certification](https://www.freecodecamp.org/learn/college-algebra-with-python/)*

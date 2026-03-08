---
id: lesson-007-001
title: Functions
chapterId: chapter-07
order: 1
duration: 5
objectives:
  - Understand functions as input-output mappings
  - Determine domain and range of functions
  - Evaluate functions and apply the vertical line test
  - Work with piecewise, composite, and inverse functions
  - Define Python functions as mathematical functions
---

# Functions

Functions are the central concept of algebra and all of higher mathematics. A **function** is a rule that assigns exactly one output to each input.

## What Is a Function?

A function f takes an input x and produces an output f(x):

- f(x) = 2x + 3 means: "double the input and add 3"
- f(5) = 2(5) + 3 = 13
- f(-1) = 2(-1) + 3 = 1

The key requirement: **each input has exactly one output**. The input x = 5 cannot produce two different results.

### Python Functions as Mathematical Functions

```python
# Define a mathematical function in Python
def f(x):
    return 2 * x + 3

print(f(5))    # 13
print(f(-1))   # 1
print(f(0))    # 3

# Evaluate at multiple points
for x in range(-5, 6):
    print(f"f({x:3d}) = {f(x):5d}")
```

## Domain and Range

- **Domain**: the set of all valid inputs (x-values)
- **Range**: the set of all possible outputs (y-values)

Examples:
- f(x) = x**2: domain is all real numbers, range is y >= 0
- f(x) = sqrt(x): domain is x >= 0, range is y >= 0
- f(x) = 1/x: domain is all reals except x = 0, range is all reals except y = 0

```python
from sympy import symbols, sqrt, S, solveset, Reals

x = symbols('x')

# Domain of f(x) = 1/(x-3): all reals except x=3
# Find where denominator = 0
from sympy import denom, solve
expr = 1/(x - 3)
restriction = solve(x - 3, x)
print(f"f(x) = 1/(x-3): domain is all reals except x = {restriction}")  # [3]

# Domain of f(x) = sqrt(x + 4): need x + 4 >= 0
print(f"f(x) = sqrt(x+4): domain is x >= {solve(x + 4, x)[0] * -1 + solve(x + 4, x)[0]}")
# Simpler: x >= -4
```

## The Vertical Line Test

A graph represents a function if and only if every vertical line intersects it at **most once**. If a vertical line crosses the graph twice, the relation is not a function.

```python
import matplotlib.pyplot as plt
import numpy as np

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))

# Function: y = x^2 (passes vertical line test)
x = np.linspace(-3, 3, 200)
ax1.plot(x, x**2, 'b-', linewidth=2)
ax1.axvline(x=1.5, color='red', linestyle='--', label='Vertical line at x=1.5')
ax1.set_title('y = x² (IS a function)')
ax1.legend()
ax1.grid(True, alpha=0.3)
ax1.set_aspect('equal')

# Not a function: x = y^2 (fails vertical line test)
y_vals = np.linspace(-3, 3, 200)
ax2.plot(y_vals**2, y_vals, 'b-', linewidth=2)
ax2.axvline(x=4, color='red', linestyle='--', label='Vertical line at x=4')
ax2.plot(4, 2, 'ro', markersize=8)
ax2.plot(4, -2, 'ro', markersize=8)
ax2.set_title('x = y² (NOT a function)')
ax2.legend()
ax2.grid(True, alpha=0.3)
ax2.set_aspect('equal')

plt.tight_layout()
plt.show()
```

## Evaluating Functions

Evaluate means substitute a value (or expression) for x:

```python
def g(x):
    return x**2 - 4*x + 7

# Evaluate at specific values
print(f"g(0) = {g(0)}")    # 7
print(f"g(3) = {g(3)}")    # 4
print(f"g(-2) = {g(-2)}")  # 19

# Evaluate with expressions using SymPy
from sympy import symbols, expand
x, h = symbols('x h')

g_expr = x**2 - 4*x + 7

# g(x + h) - useful for calculus later
g_xh = g_expr.subs(x, x + h)
print(f"g(x+h) = {expand(g_xh)}")
# x**2 + 2*h*x + h**2 - 4*x - 4*h + 7
```

## Piecewise Functions

A piecewise function uses different formulas for different parts of the domain:

f(x) = { x**2, if x < 0
        { 2x + 1, if x >= 0

```python
import numpy as np
import matplotlib.pyplot as plt

def f_piecewise(x):
    if x < 0:
        return x**2
    else:
        return 2*x + 1

# Evaluate at several points
for val in [-3, -1, 0, 1, 3]:
    print(f"f({val}) = {f_piecewise(val)}")

# Plot
x1 = np.linspace(-4, 0, 100)
x2 = np.linspace(0, 4, 100)

plt.figure(figsize=(8, 5))
plt.plot(x1, x1**2, 'b-', linewidth=2, label='$x^2$ (x < 0)')
plt.plot(x2, 2*x2 + 1, 'r-', linewidth=2, label='$2x + 1$ (x ≥ 0)')
plt.plot(0, 1, 'ro', markersize=8)    # closed circle at (0, 1)
plt.plot(0, 0, 'bo', markersize=8, fillstyle='none')  # open circle at (0, 0)
plt.xlabel('x')
plt.ylabel('f(x)')
plt.title('Piecewise Function')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()
```

## Composite Functions

A **composite function** f(g(x)) means: first apply g, then apply f to the result.

If f(x) = x**2 and g(x) = x + 3:
- f(g(x)) = f(x + 3) = (x + 3)**2 = x**2 + 6x + 9
- g(f(x)) = g(x**2) = x**2 + 3

**Note:** f(g(x)) is generally NOT equal to g(f(x)).

```python
from sympy import symbols, expand

x = symbols('x')

def f(x): return x**2
def g(x): return x + 3

# f(g(x))
fog = f(g(x))
print(f"f(g(x)) = {expand(fog)}")  # x**2 + 6*x + 9

# g(f(x))
gof = g(f(x))
print(f"g(f(x)) = {expand(gof)}")  # x**2 + 3

# Verify with a number
print(f"f(g(2)) = f(5) = {f(g(2))}")  # 25
print(f"g(f(2)) = g(4) = {g(f(2))}")  # 7
```

## Inverse Functions

The **inverse function** f⁻¹(x) undoes f(x). If f(3) = 7, then f⁻¹(7) = 3.

To find the inverse:
1. Replace f(x) with y
2. Swap x and y
3. Solve for y

```python
from sympy import symbols, Eq, solve

x, y = symbols('x y')

# Find inverse of f(x) = 3x - 5
# Step 1: y = 3x - 5
# Step 2: x = 3y - 5 (swap x and y)
# Step 3: Solve for y
inverse = solve(Eq(x, 3*y - 5), y)
print(f"f(x) = 3x - 5")
print(f"f⁻¹(x) = {inverse[0]}")  # x/3 + 5/3

# Verify: f(f⁻¹(x)) should equal x
f_expr = 3*x - 5
f_inv = inverse[0]
check = f_expr.subs(x, f_inv)
from sympy import simplify
print(f"f(f⁻¹(x)) = {simplify(check)}")  # x ✓
```

Functions are the building blocks for everything that follows in mathematics. Understanding them deeply will make every future topic easier.

*Based on the [freeCodeCamp College Algebra with Python Certification](https://www.freecodecamp.org/learn/college-algebra-with-python/)*

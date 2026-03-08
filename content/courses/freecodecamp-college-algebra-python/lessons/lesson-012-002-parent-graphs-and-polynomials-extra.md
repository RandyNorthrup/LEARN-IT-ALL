---
id: lesson-012-002
title: Parent Graphs and Polynomials: Extra
chapterId: chapter-12
order: 2
duration: 5
objectives:
  - Identify polynomial degree, leading coefficient, and end behavior
  - Find zeros/roots and understand multiplicity
  - State the Fundamental Theorem of Algebra
  - Apply the Factor Theorem to factor polynomials
  - Graph polynomials with Python and analyze turning points
---

# Parent Graphs and Polynomials: Extra

Polynomial functions generalize linear and quadratic functions to higher degrees. This lesson covers their structure, behavior, and how to analyze them with Python.

## What Is a Polynomial?

A polynomial function of degree $n$ has the form:

$$f(x) = a_n x^n + a_{n-1} x^{n-1} + \cdots + a_1 x + a_0$$

where $a_n \neq 0$.

- **Degree:** The highest power of $x$ (determines the function's overall shape).
- **Leading coefficient:** $a_n$ (determines how the graph opens/scales).
- **Constant term:** $a_0$ (the y-intercept).

| Degree | Name | Example | Shape |
|---|---|---|---|
| 1 | Linear | $2x + 3$ | Straight line |
| 2 | Quadratic | $x^2 - 4x + 3$ | Parabola |
| 3 | Cubic | $x^3 - x$ | S-curve |
| 4 | Quartic | $x^4 - 5x^2 + 4$ | W or M shape |
| 5 | Quintic | $x^5 - 3x^3 + x$ | Extended S |

## End Behavior

End behavior describes what happens to $f(x)$ as $x \to \pm\infty$.

| Degree | Leading coefficient | As $x \to -\infty$ | As $x \to +\infty$ |
|---|---|---|---|
| Even | Positive ($+$) | $f(x) \to +\infty$ | $f(x) \to +\infty$ |
| Even | Negative ($-$) | $f(x) \to -\infty$ | $f(x) \to -\infty$ |
| Odd | Positive ($+$) | $f(x) \to -\infty$ | $f(x) \to +\infty$ |
| Odd | Negative ($-$) | $f(x) \to +\infty$ | $f(x) \to -\infty$ |

**Rule of thumb:** Even-degree polynomials have both ends going the same direction. Odd-degree polynomials have ends going opposite directions.

## Zeros, Roots, and Multiplicity

A **zero** (or root) of $f(x)$ is a value $r$ where $f(r) = 0$. If $f(x) = (x - r)^k \cdot g(x)$ where $g(r) \neq 0$, then $r$ has **multiplicity** $k$.

- **Odd multiplicity:** The graph **crosses** the x-axis at $r$.
- **Even multiplicity:** The graph **touches** the x-axis at $r$ and bounces back.

**Example:** $f(x) = (x - 1)^2 (x + 2)$

- $x = 1$ has multiplicity 2 (touches and bounces)
- $x = -2$ has multiplicity 1 (crosses)

## Turning Points

A polynomial of degree $n$ has **at most $n - 1$ turning points** (local maxima or minima).

- Degree 2: at most 1 turning point
- Degree 3: at most 2 turning points
- Degree 4: at most 3 turning points

## The Fundamental Theorem of Algebra

Every polynomial of degree $n \geq 1$ has **exactly $n$ roots** (counting multiplicity and complex roots). This means:

- A quadratic always has 2 roots (which may be complex).
- A cubic always has 3 roots (at least one is real).
- A degree-4 polynomial always has 4 roots.

## The Factor Theorem

If $f(c) = 0$, then $(x - c)$ is a factor of $f(x)$. Conversely, if $(x - c)$ divides $f(x)$, then $f(c) = 0$.

**Example:** Is $(x - 2)$ a factor of $f(x) = x^3 - 3x^2 - 4x + 12$?

Check: $f(2) = 8 - 12 - 8 + 12 = 0$. Yes!

```python
from sympy import symbols, factor, solve, Poly

x = symbols('x')
f = x**3 - 3*x**2 - 4*x + 12

# Factor the polynomial
print("Factored:", factor(f))  # (x - 3)*(x - 2)*(x + 2)

# Find all roots
roots = solve(f, x)
print("Roots:", roots)  # [-2, 2, 3]

# Check degree and leading coefficient
p = Poly(f, x)
print(f"Degree: {p.degree()}, Leading coeff: {p.LC()}")  # Degree: 3, Leading coeff: 1
```

## Graphing Polynomials with Python

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-3, 4, 400)

# f(x) = (x - 1)^2 * (x + 2)
y = (x - 1)**2 * (x + 2)

plt.figure(figsize=(8, 5))
plt.plot(x, y, 'b-', linewidth=2)
plt.scatter([1, -2], [0, 0], color='red', s=80, zorder=5,
            label='Zeros: x=1 (mult 2), x=-2 (mult 1)')
plt.axhline(0, color='k', linewidth=0.5)
plt.axvline(0, color='k', linewidth=0.5)
plt.grid(True, alpha=0.3)
plt.title('f(x) = (x-1)²(x+2): Multiplicity Demo')
plt.xlabel('x'); plt.ylabel('f(x)')
plt.legend(); plt.show()
```

## Comparing Polynomial Degrees

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-2, 2, 300)
plt.figure(figsize=(8, 6))
for n in [1, 2, 3, 4, 5]:
    plt.plot(x, x**n, label=f'y = x^{n}')
plt.legend(); plt.grid(True)
plt.title('Comparing Polynomial Parent Functions')
plt.xlabel('x'); plt.ylabel('y')
plt.ylim(-5, 5); plt.show()
```

## Key Takeaways

- The degree determines overall shape and maximum number of turning points ($n - 1$).
- The leading coefficient and degree together determine end behavior.
- The Fundamental Theorem guarantees $n$ roots for a degree-$n$ polynomial.
- Multiplicity determines whether the graph crosses or bounces at a root.
- The Factor Theorem connects roots to factors: $f(c) = 0 \iff (x - c)$ is a factor.

---

*Based on the [freeCodeCamp College Algebra with Python Certification](https://www.freecodecamp.org/learn/college-algebra-with-python/)*

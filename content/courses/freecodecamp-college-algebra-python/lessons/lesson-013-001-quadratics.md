---
id: lesson-013-001
title: Quadratics
chapterId: chapter-13
order: 1
duration: 5
objectives:
  - Write quadratics in standard, vertex, and factored form
  - Apply the quadratic formula and interpret the discriminant
  - Complete the square to convert standard form to vertex form
  - Find vertex and axis of symmetry
  - Solve and plot parabolas with Python
---

# Quadratics

Quadratic functions produce parabolas — one of the most common curves in mathematics and science. This lesson covers all three forms, the quadratic formula, completing the square, and Python visualization.

## Standard Form: $f(x) = ax^2 + bx + c$

This is the default form. The coefficients tell you:

- $a$: direction ($a > 0$ opens up, $a < 0$ opens down) and width
- $b$: influences the position of the vertex horizontally
- $c$: the y-intercept ($f(0) = c$)

**Example:** $f(x) = 2x^2 - 8x + 6$ has $a = 2$, $b = -8$, $c = 6$.

## Vertex Form: $f(x) = a(x - h)^2 + k$

The vertex is at $(h, k)$ and the axis of symmetry is $x = h$.

**Example:** $f(x) = 3(x - 1)^2 + 4$ has vertex $(1, 4)$ and opens upward.

## Factored Form: $f(x) = a(x - r_1)(x - r_2)$

The roots (x-intercepts) are $r_1$ and $r_2$.

**Example:** $f(x) = 2(x - 1)(x - 3)$ has roots at $x = 1$ and $x = 3$.

## Finding the Vertex from Standard Form

The x-coordinate of the vertex is:

$$h = -\frac{b}{2a}$$

The y-coordinate is $k = f(h)$.

**Example:** $f(x) = 2x^2 - 8x + 6$

$$h = -\frac{-8}{2(2)} = 2, \quad k = 2(4) - 8(2) + 6 = 8 - 16 + 6 = -2$$

Vertex: $(2, -2)$. Axis of symmetry: $x = 2$.

## The Quadratic Formula

For $ax^2 + bx + c = 0$:

$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

### The Discriminant: $\Delta = b^2 - 4ac$

The discriminant determines the nature of the roots:

| Discriminant | Roots |
|---|---|
| $\Delta > 0$ | Two distinct real roots |
| $\Delta = 0$ | One repeated real root (vertex touches x-axis) |
| $\Delta < 0$ | Two complex roots (parabola doesn't cross x-axis) |

**Example:** $2x^2 - 8x + 6 = 0$

$$\Delta = (-8)^2 - 4(2)(6) = 64 - 48 = 16 > 0$$
$$x = \frac{8 \pm \sqrt{16}}{4} = \frac{8 \pm 4}{4}$$
$$x = 3 \text{ or } x = 1$$

## Completing the Square

Converts standard form to vertex form.

**Example:** Convert $f(x) = x^2 + 6x + 2$ to vertex form.

1. Group: $f(x) = (x^2 + 6x) + 2$
2. Take half of $b$, square it: $(6/2)^2 = 9$
3. Add and subtract inside: $f(x) = (x^2 + 6x + 9) - 9 + 2$
4. Factor: $f(x) = (x + 3)^2 - 7$

Vertex: $(-3, -7)$.

With a leading coefficient $a \neq 1$, factor it out first:

$f(x) = 2x^2 - 12x + 5 = 2(x^2 - 6x) + 5 = 2(x^2 - 6x + 9 - 9) + 5 = 2(x - 3)^2 - 13$

## Python: Solving Quadratics

```python
from sympy import symbols, solve, sqrt, Eq
import numpy as np
import matplotlib.pyplot as plt

x = symbols('x')

# Solve 2x^2 - 8x + 6 = 0
roots = solve(2*x**2 - 8*x + 6, x)
print("Roots:", roots)  # [1, 3]

# Quadratic formula function
def quadratic_formula(a, b, c):
    discriminant = b**2 - 4*a*c
    if discriminant > 0:
        x1 = (-b + discriminant**0.5) / (2*a)
        x2 = (-b - discriminant**0.5) / (2*a)
        return x1, x2
    elif discriminant == 0:
        return -b / (2*a),
    else:
        real = -b / (2*a)
        imag = (-discriminant)**0.5 / (2*a)
        return complex(real, imag), complex(real, -imag)

print(quadratic_formula(2, -8, 6))   # (3.0, 1.0)
print(quadratic_formula(1, -4, 4))   # (2.0,)
print(quadratic_formula(1, 2, 5))    # ((−1+2j), (−1−2j))
```

## Python: Plotting Parabolas

```python
import numpy as np
import matplotlib.pyplot as plt

def plot_parabola(a, b, c):
    h = -b / (2*a)
    k = a*h**2 + b*h + c
    x = np.linspace(h - 5, h + 5, 300)
    y = a*x**2 + b*x + c

    plt.figure(figsize=(8, 6))
    plt.plot(x, y, 'b-', linewidth=2, label=f'{a}x² + {b}x + {c}')
    plt.plot(h, k, 'ro', markersize=10, label=f'Vertex ({h:.1f}, {k:.1f})')
    plt.axvline(h, color='gray', linestyle='--', alpha=0.5, label=f'Axis: x = {h:.1f}')
    plt.axhline(0, color='k', linewidth=0.5)

    # Plot roots if real
    disc = b**2 - 4*a*c
    if disc >= 0:
        r1 = (-b + disc**0.5) / (2*a)
        r2 = (-b - disc**0.5) / (2*a)
        plt.plot([r1, r2], [0, 0], 'gs', markersize=8, label='Roots')

    plt.grid(True); plt.legend()
    plt.title('Quadratic Function'); plt.xlabel('x'); plt.ylabel('f(x)')
    plt.show()

plot_parabola(2, -8, 6)
```

## Key Takeaways

- Standard form ($ax^2 + bx + c$) is best for the quadratic formula and y-intercept.
- Vertex form ($a(x-h)^2 + k$) immediately reveals vertex and axis of symmetry.
- Factored form ($a(x-r_1)(x-r_2)$) directly shows the roots.
- The discriminant $b^2 - 4ac$ determines 2 real, 1 repeated, or 2 complex roots.
- Completing the square converts standard to vertex form and derives the quadratic formula.

---

*Based on the [freeCodeCamp College Algebra with Python Certification](https://www.freecodecamp.org/learn/college-algebra-with-python/)*

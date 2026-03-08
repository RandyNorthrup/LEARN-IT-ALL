---
id: lesson-012-001
title: Parent Graphs
chapterId: chapter-12
order: 1
duration: 5
objectives:
  - Identify the eight fundamental parent functions
  - Describe key characteristics of each parent function
  - Understand domain, range, and symmetry for each
  - Plot and compare parent functions using Python
  - Recognize transformations of parent functions
---

# Parent Graphs

A **parent function** is the simplest form of a family of functions. Every function you encounter is a transformation (shift, stretch, or reflection) of one of these parent functions. Knowing them by sight is essential.

## The Eight Parent Functions

### 1. Linear: $y = x$

- **Domain:** $(-\infty, \infty)$
- **Range:** $(-\infty, \infty)$
- **Key features:** Passes through the origin, slope = 1, symmetric about the origin (odd function).

### 2. Quadratic: $y = x^2$

- **Domain:** $(-\infty, \infty)$
- **Range:** $[0, \infty)$
- **Key features:** U-shaped parabola, vertex at $(0, 0)$, symmetric about the y-axis (even function). Opens upward.

### 3. Cubic: $y = x^3$

- **Domain:** $(-\infty, \infty)$
- **Range:** $(-\infty, \infty)$
- **Key features:** S-shaped curve through the origin, symmetric about the origin (odd function). Inflection point at $(0, 0)$.

### 4. Absolute Value: $y = |x|$

- **Domain:** $(-\infty, \infty)$
- **Range:** $[0, \infty)$
- **Key features:** V-shaped graph, vertex at $(0, 0)$, symmetric about the y-axis (even function).

### 5. Square Root: $y = \sqrt{x}$

- **Domain:** $[0, \infty)$
- **Range:** $[0, \infty)$
- **Key features:** Starts at the origin, increases but flattens out. Half of a sideways parabola.

### 6. Rational: $y = \frac{1}{x}$

- **Domain:** $(-\infty, 0) \cup (0, \infty)$
- **Range:** $(-\infty, 0) \cup (0, \infty)$
- **Key features:** Hyperbola with two branches. Vertical asymptote at $x = 0$, horizontal asymptote at $y = 0$. Odd function.

### 7. Exponential: $y = 2^x$

- **Domain:** $(-\infty, \infty)$
- **Range:** $(0, \infty)$
- **Key features:** Passes through $(0, 1)$, increases rapidly for positive $x$, approaches 0 for negative $x$. Horizontal asymptote at $y = 0$.

### 8. Logarithmic: $y = \log(x)$

- **Domain:** $(0, \infty)$
- **Range:** $(-\infty, \infty)$
- **Key features:** Passes through $(1, 0)$, increases slowly. Vertical asymptote at $x = 0$. Inverse of the exponential function.

## Summary Table

| Function | Formula | Domain | Range | Symmetry |
|---|---|---|---|---|
| Linear | $y = x$ | All reals | All reals | Odd |
| Quadratic | $y = x^2$ | All reals | $[0,\infty)$ | Even |
| Cubic | $y = x^3$ | All reals | All reals | Odd |
| Absolute value | $y = \|x\|$ | All reals | $[0,\infty)$ | Even |
| Square root | $y = \sqrt{x}$ | $[0,\infty)$ | $[0,\infty)$ | Neither |
| Rational | $y = 1/x$ | $x \neq 0$ | $y \neq 0$ | Odd |
| Exponential | $y = 2^x$ | All reals | $(0,\infty)$ | Neither |
| Logarithmic | $y = \log(x)$ | $(0,\infty)$ | All reals | Neither |

## Python Comparison Plots

```python
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(2, 4, figsize=(18, 8))
x = np.linspace(-4, 4, 400)
x_pos = np.linspace(0.01, 4, 400)   # for sqrt, log
x_nz = np.concatenate([np.linspace(-4, -0.1, 200),
                        np.linspace(0.1, 4, 200)])  # for 1/x

functions = [
    ('y = x',        x,    x,                  'blue'),
    ('y = x²',       x,    x**2,               'red'),
    ('y = x³',       x,    x**3,               'green'),
    ('y = |x|',      x,    np.abs(x),          'purple'),
    ('y = √x',       x_pos, np.sqrt(x_pos),    'orange'),
    ('y = 1/x',      x_nz, 1/x_nz,            'brown'),
    ('y = 2ˣ',       x,    2**x,               'teal'),
    ('y = log(x)',   x_pos, np.log10(x_pos),   'magenta'),
]

for ax, (title, xv, yv, color) in zip(axes.flat, functions):
    ax.plot(xv, yv, color=color, linewidth=2)
    ax.set_title(title, fontsize=12)
    ax.set_xlim(-4, 4); ax.set_ylim(-4, 4)
    ax.axhline(0, color='k', linewidth=0.5)
    ax.axvline(0, color='k', linewidth=0.5)
    ax.grid(True, alpha=0.3)

plt.suptitle('The Eight Parent Functions', fontsize=14)
plt.tight_layout(); plt.show()
```

## Transformations Preview

Every parent function can be transformed with shifts, stretches, and reflections:

- **Vertical shift:** $y = f(x) + k$
- **Horizontal shift:** $y = f(x - h)$
- **Vertical stretch/compress:** $y = a \cdot f(x)$
- **Reflection:** $y = -f(x)$ (over x-axis), $y = f(-x)$ (over y-axis)

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-4, 4, 300)
plt.plot(x, x**2, 'b-', label='y = x² (parent)')
plt.plot(x, (x-2)**2 + 1, 'r--', label='y = (x-2)² + 1')
plt.plot(x, -x**2, 'g--', label='y = -x²')
plt.legend(); plt.grid(True)
plt.title('Transformations of y = x²'); plt.show()
```

## Key Takeaways

- Memorize the shape, domain, range, and symmetry of each parent function.
- Even functions ($f(-x) = f(x)$) are symmetric about the y-axis.
- Odd functions ($f(-x) = -f(x)$) are symmetric about the origin.
- Every function you graph in algebra is a transformation of one of these eight parents.
- Python makes it easy to visualize and compare all parent functions side by side.

---

*Based on the [freeCodeCamp College Algebra with Python Certification](https://www.freecodecamp.org/learn/college-algebra-with-python/)*

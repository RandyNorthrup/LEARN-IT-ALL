---
id: lesson-007-002
title: Graphing
chapterId: chapter-07
order: 2
duration: 5
objectives:
  - Plot points on the coordinate plane
  - Graph linear, quadratic, and polynomial functions
  - Find intercepts and identify symmetry
  - Use matplotlib for professional mathematical plotting
---

# Graphing Functions

Graphing is the visual representation of a function. Every point (x, y) on a graph satisfies y = f(x). Graphs help you understand behavior, find solutions, and communicate mathematical ideas.

## The Coordinate Plane

The coordinate plane has two perpendicular axes:
- **x-axis** (horizontal) — independent variable
- **y-axis** (vertical) — dependent variable

The axes divide the plane into four **quadrants**:
- Quadrant I: x > 0, y > 0 (upper right)
- Quadrant II: x < 0, y > 0 (upper left)
- Quadrant III: x < 0, y < 0 (lower left)
- Quadrant IV: x > 0, y < 0 (lower right)

## Plotting Points

```python
import matplotlib.pyplot as plt

# Points to plot
points = [(2, 3), (-1, 4), (-3, -2), (4, -1), (0, 0)]
labels = ['A(2,3)', 'B(-1,4)', 'C(-3,-2)', 'D(4,-1)', 'O(0,0)']

plt.figure(figsize=(7, 7))
for (x, y), label in zip(points, labels):
    plt.plot(x, y, 'ro', markersize=8)
    plt.annotate(label, (x, y), textcoords="offset points",
                xytext=(10, 5), fontsize=10)

plt.axhline(y=0, color='k', linewidth=1)
plt.axvline(x=0, color='k', linewidth=1)
plt.grid(True, alpha=0.3)
plt.xlim(-5, 5)
plt.ylim(-5, 5)
plt.xlabel('x')
plt.ylabel('y')
plt.title('Plotting Points on the Coordinate Plane')
plt.show()
```

## Graphing Linear Functions

A linear function y = mx + b produces a straight line:
- **m** is the slope (rise over run)
- **b** is the y-intercept (where the line crosses the y-axis)

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(-5, 5, 200)

plt.figure(figsize=(8, 6))

# Different slopes
plt.plot(x, 2*x + 1, label='y = 2x + 1 (slope 2)', linewidth=2)
plt.plot(x, 0.5*x - 2, label='y = 0.5x - 2 (slope 1/2)', linewidth=2)
plt.plot(x, -x + 3, label='y = -x + 3 (slope -1)', linewidth=2)
plt.plot(x, 0*x + 2, label='y = 2 (slope 0, horizontal)', linewidth=2, linestyle='--')

plt.axhline(y=0, color='k', linewidth=0.5)
plt.axvline(x=0, color='k', linewidth=0.5)
plt.grid(True, alpha=0.3)
plt.xlabel('x')
plt.ylabel('y')
plt.title('Linear Functions with Different Slopes')
plt.legend()
plt.ylim(-6, 8)
plt.show()
```

## Finding Intercepts

The **x-intercept** is where y = 0 (the graph crosses the x-axis).
The **y-intercept** is where x = 0 (the graph crosses the y-axis).

```python
from sympy import symbols, solve

x = symbols('x')

# For f(x) = 2x^2 - 8
f = 2*x**2 - 8

# x-intercepts: set f(x) = 0
x_intercepts = solve(f, x)
print(f"x-intercepts: {x_intercepts}")  # [-2, 2]

# y-intercept: evaluate f(0)
y_intercept = f.subs(x, 0)
print(f"y-intercept: {y_intercept}")  # -8
```

## Graphing Quadratic Functions

A quadratic f(x) = ax**2 + bx + c produces a parabola:
- Opens upward if a > 0, downward if a < 0
- Vertex at x = -b/(2a)

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(-4, 6, 300)

fig, axes = plt.subplots(1, 3, figsize=(15, 5))

# Parabola opening up
y1 = x**2 - 4*x + 3
axes[0].plot(x, y1, 'b-', linewidth=2)
axes[0].plot([1, 3], [0, 0], 'ro', markersize=8)  # x-intercepts
axes[0].plot(2, -1, 'gs', markersize=10)  # vertex
axes[0].set_title('y = x² - 4x + 3\nVertex: (2, -1)')
axes[0].grid(True, alpha=0.3)
axes[0].axhline(y=0, color='k', linewidth=0.5)
axes[0].axvline(x=0, color='k', linewidth=0.5)
axes[0].set_ylim(-3, 10)

# Parabola opening down
y2 = -(x-1)**2 + 4
axes[1].plot(x, y2, 'r-', linewidth=2)
axes[1].plot(1, 4, 'gs', markersize=10)  # vertex
axes[1].set_title('y = -(x-1)² + 4\nVertex: (1, 4)')
axes[1].grid(True, alpha=0.3)
axes[1].axhline(y=0, color='k', linewidth=0.5)
axes[1].axvline(x=0, color='k', linewidth=0.5)
axes[1].set_ylim(-10, 6)

# Wider parabola
y3 = 0.5*x**2 - 2
axes[2].plot(x, y3, 'g-', linewidth=2)
axes[2].set_title('y = 0.5x² - 2\n(wider parabola, a < 1)')
axes[2].grid(True, alpha=0.3)
axes[2].axhline(y=0, color='k', linewidth=0.5)
axes[2].axvline(x=0, color='k', linewidth=0.5)
axes[2].set_ylim(-4, 10)

plt.tight_layout()
plt.show()
```

## Graphing Polynomial Functions

Higher-degree polynomials have more complex shapes:

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(-3, 3, 300)

plt.figure(figsize=(10, 6))

plt.plot(x, x**2, label='$x^2$ (degree 2)', linewidth=2)
plt.plot(x, x**3, label='$x^3$ (degree 3)', linewidth=2)
plt.plot(x, x**4 - 4*x**2 + 1, label='$x^4 - 4x^2 + 1$ (degree 4)', linewidth=2)
plt.plot(x, x**3 - 3*x, label='$x^3 - 3x$ (degree 3)', linewidth=2, linestyle='--')

plt.axhline(y=0, color='k', linewidth=0.5)
plt.axvline(x=0, color='k', linewidth=0.5)
plt.grid(True, alpha=0.3)
plt.xlabel('x')
plt.ylabel('y')
plt.title('Polynomial Functions of Different Degrees')
plt.legend()
plt.ylim(-8, 8)
plt.show()
```

## Symmetry

- **Even functions** (symmetric about y-axis): f(-x) = f(x). Examples: x**2, x**4, |x|
- **Odd functions** (symmetric about origin): f(-x) = -f(x). Examples: x**3, x**5, sin(x)

```python
from sympy import symbols, simplify

x = symbols('x')

def check_symmetry(expr, name):
    neg_x = expr.subs(x, -x)
    if simplify(neg_x - expr) == 0:
        print(f"{name}: EVEN function (y-axis symmetry)")
    elif simplify(neg_x + expr) == 0:
        print(f"{name}: ODD function (origin symmetry)")
    else:
        print(f"{name}: NEITHER even nor odd")

check_symmetry(x**2, "x²")          # EVEN
check_symmetry(x**3, "x³")          # ODD
check_symmetry(x**2 + x, "x² + x")  # NEITHER
check_symmetry(x**4 - x**2, "x⁴ - x²")  # EVEN
```

## Using plt.scatter() for Data Points

```python
import matplotlib.pyplot as plt
import numpy as np

# Plot data points and a best-fit line
x_data = np.array([1, 2, 3, 4, 5, 6, 7])
y_data = np.array([2.1, 4.3, 5.8, 8.2, 9.9, 12.1, 14.0])

# Best fit line
coeffs = np.polyfit(x_data, y_data, 1)
x_line = np.linspace(0, 8, 100)
y_line = np.polyval(coeffs, x_line)

plt.figure(figsize=(8, 5))
plt.scatter(x_data, y_data, color='red', s=60, zorder=5, label='Data points')
plt.plot(x_line, y_line, 'b-', linewidth=2, label=f'Best fit: y = {coeffs[0]:.2f}x + {coeffs[1]:.2f}')
plt.xlabel('x')
plt.ylabel('y')
plt.title('Scatter Plot with Best-Fit Line')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()
```

## Matplotlib Essentials

| Function | Purpose |
|----------|--------|
| `plt.plot(x, y)` | Line plot |
| `plt.scatter(x, y)` | Scatter plot |
| `plt.xlabel()`, `plt.ylabel()` | Axis labels |
| `plt.title()` | Plot title |
| `plt.legend()` | Show legend |
| `plt.grid(True)` | Show grid |
| `plt.xlim()`, `plt.ylim()` | Set axis limits |
| `plt.figure(figsize=(w, h))` | Set figure size |
| `plt.axhline()`, `plt.axvline()` | Draw horizontal/vertical lines |
| `plt.savefig('plot.png')` | Save to file |

Graphing transforms abstract equations into visual understanding. Throughout this course, you will graph every type of function you study.

*Based on the [freeCodeCamp College Algebra with Python Certification](https://www.freecodecamp.org/learn/college-algebra-with-python/)*

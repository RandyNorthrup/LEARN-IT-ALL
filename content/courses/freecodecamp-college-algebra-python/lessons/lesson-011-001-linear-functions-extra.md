---
id: lesson-011-001
title: Linear Functions: Extra
chapterId: chapter-11
order: 1
duration: 5
objectives:
  - Write equations in slope-intercept, point-slope, and standard forms
  - Convert between the three forms of linear equations
  - Find the equation of a line from two points
  - Determine parallel and perpendicular line equations
  - Apply linear functions to word problems
---

# Linear Functions: Extra

Linear functions are the building blocks of algebra. This lesson explores the three standard forms of linear equations, how to convert between them, and how parallel and perpendicular relationships work.

## Slope-Intercept Form: $y = mx + b$

This is the most common form:
- $m$ = slope (rate of change)
- $b$ = y-intercept (where the line crosses the y-axis)

**Example:** $y = 3x - 2$ has slope 3 and y-intercept $-2$.

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-3, 5, 100)
y = 3 * x - 2
plt.plot(x, y)
plt.axhline(0, color='k', linewidth=0.5)
plt.axvline(0, color='k', linewidth=0.5)
plt.plot(0, -2, 'ro', label='y-intercept (0, -2)')
plt.grid(True); plt.legend(); plt.title('y = 3x - 2')
plt.show()
```

## Point-Slope Form: $y - y_1 = m(x - x_1)$

Useful when you know the slope and one point $(x_1, y_1)$.

**Example:** Slope $m = -2$, through point $(3, 5)$:

$$y - 5 = -2(x - 3)$$
$$y - 5 = -2x + 6$$
$$y = -2x + 11$$

## Standard Form: $Ax + By = C$

Where $A$, $B$, and $C$ are integers and $A \geq 0$.

**Converting slope-intercept to standard form:**

$y = \frac{2}{3}x + 4$ → Multiply by 3: $3y = 2x + 12$ → Rearrange: $-2x + 3y = 12$ → $2x - 3y = -12$

## Converting Between Forms

| From | To | Method |
|---|---|---|
| Slope-intercept → Standard | Move $x$ term to the left side, clear fractions | |
| Standard → Slope-intercept | Solve for $y$: $y = \frac{-A}{B}x + \frac{C}{B}$ | |
| Point-slope → Slope-intercept | Distribute and simplify | |

**Example:** Convert $3x + 4y = 20$ to slope-intercept:

$$4y = -3x + 20 \Rightarrow y = -\frac{3}{4}x + 5$$

So $m = -\frac{3}{4}$ and $b = 5$.

## Finding an Equation from Two Points

Given points $(x_1, y_1)$ and $(x_2, y_2)$:

**Step 1:** Calculate slope: $m = \frac{y_2 - y_1}{x_2 - x_1}$

**Step 2:** Use point-slope form with either point.

**Example:** Points $(1, 3)$ and $(4, 9)$:

$$m = \frac{9 - 3}{4 - 1} = \frac{6}{3} = 2$$
$$y - 3 = 2(x - 1) \Rightarrow y = 2x + 1$$

```python
from sympy import symbols, Eq, solve, Rational

x, y, m, b = symbols('x y m b')

# Given two points
x1, y1 = 1, 3
x2, y2 = 4, 9

# Calculate slope
slope = Rational(y2 - y1, x2 - x1)
print(f"Slope: {slope}")  # 2

# Find y-intercept
intercept = solve(Eq(y1, slope * x1 + b), b)[0]
print(f"y-intercept: {intercept}")  # 1
print(f"Equation: y = {slope}x + {intercept}")  # y = 2x + 1
```

## Parallel Lines

Parallel lines have the **same slope** but different y-intercepts.

**Example:** Find the line parallel to $y = 3x + 1$ through $(2, -4)$:

$$y - (-4) = 3(x - 2) \Rightarrow y = 3x - 10$$

## Perpendicular Lines

Perpendicular lines have slopes that are **negative reciprocals**: $m_1 \cdot m_2 = -1$.

**Example:** Find the line perpendicular to $y = \frac{2}{3}x + 5$ through $(6, 1)$:

Perpendicular slope: $m = -\frac{3}{2}$

$$y - 1 = -\frac{3}{2}(x - 6) \Rightarrow y = -\frac{3}{2}x + 10$$

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-2, 10, 200)
y_orig = (2/3) * x + 5
y_perp = (-3/2) * x + 10

plt.plot(x, y_orig, label='y = (2/3)x + 5')
plt.plot(x, y_perp, label='y = -(3/2)x + 10')
plt.plot(6, 1, 'ro', markersize=8, label='(6, 1)')
plt.grid(True); plt.legend(); plt.axis('equal')
plt.title('Perpendicular Lines'); plt.show()
```

## Word Problem Application

A plumber charges a \$75 service fee plus \$50 per hour. Write the cost function and find the cost for 4 hours.

$$C(h) = 50h + 75$$
$$C(4) = 50(4) + 75 = 275$$

The slope (50) is the hourly rate; the y-intercept (75) is the fixed fee.

## Key Takeaways

- Slope-intercept form ($y = mx + b$) is best for graphing and identifying slope/intercept at a glance.
- Point-slope form ($y - y_1 = m(x - x_1)$) is best when you know a point and slope.
- Standard form ($Ax + By = C$) is useful for systems and integer-coefficient work.
- Parallel lines share slopes; perpendicular lines have negative reciprocal slopes.
- Two points uniquely determine a line — calculate slope first, then use point-slope form.

---

*Based on the [freeCodeCamp College Algebra with Python Certification](https://www.freecodecamp.org/learn/college-algebra-with-python/)*

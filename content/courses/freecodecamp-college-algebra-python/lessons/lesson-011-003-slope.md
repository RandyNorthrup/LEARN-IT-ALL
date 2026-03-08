---
id: lesson-011-003
title: Slope
chapterId: chapter-11
order: 3
duration: 5
objectives:
  - Define slope as rise over run
  - Calculate slope from two points
  - Interpret positive, negative, zero, and undefined slopes
  - Connect slope to real-world rates of change
  - Create visual slope demonstrations with Python
---

# Slope

Slope is one of the most important concepts in mathematics. It measures steepness, direction, and rate of change. This lesson gives you a thorough understanding of slope with visual Python examples.

## Definition: Rise Over Run

The slope $m$ of a line through two points $(x_1, y_1)$ and $(x_2, y_2)$ is:

$$m = \frac{\text{rise}}{\text{run}} = \frac{y_2 - y_1}{x_2 - x_1} = \frac{\Delta y}{\Delta x}$$

"Rise" is the vertical change and "run" is the horizontal change.

## Calculating Slope from Two Points

**Example 1:** Points $(2, 3)$ and $(6, 11)$:

$$m = \frac{11 - 3}{6 - 2} = \frac{8}{4} = 2$$

The line rises 2 units for every 1 unit it moves right.

**Example 2:** Points $(-1, 7)$ and $(3, -5)$:

$$m = \frac{-5 - 7}{3 - (-1)} = \frac{-12}{4} = -3$$

The line falls 3 units for every 1 unit it moves right.

```python
def calculate_slope(x1, y1, x2, y2):
    if x2 - x1 == 0:
        return "undefined (vertical line)"
    return (y2 - y1) / (x2 - x1)

print(calculate_slope(2, 3, 6, 11))     # 2.0
print(calculate_slope(-1, 7, 3, -5))    # -3.0
print(calculate_slope(4, 2, 4, 8))      # undefined (vertical line)
```

## Four Types of Slope

| Slope | Direction | Example | Visual |
|---|---|---|---|
| **Positive** ($m > 0$) | Line rises left to right | $y = 2x + 1$ | / |
| **Negative** ($m < 0$) | Line falls left to right | $y = -x + 5$ | \ |
| **Zero** ($m = 0$) | Horizontal line | $y = 3$ | — |
| **Undefined** | Vertical line | $x = 4$ | \| |

```python
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 4, figsize=(16, 4))
x = np.linspace(-3, 3, 100)

# Positive slope
axes[0].plot(x, 2*x + 1); axes[0].set_title('Positive (m=2)')
axes[0].grid(True); axes[0].set_ylim(-6, 8)

# Negative slope
axes[1].plot(x, -x + 3); axes[1].set_title('Negative (m=-1)')
axes[1].grid(True); axes[1].set_ylim(-2, 8)

# Zero slope
axes[2].axhline(3, color='blue'); axes[2].set_title('Zero (m=0)')
axes[2].grid(True); axes[2].set_ylim(0, 6)

# Undefined slope
axes[3].axvline(2, color='blue'); axes[3].set_title('Undefined')
axes[3].grid(True)

plt.tight_layout(); plt.show()
```

## Slope as Rate of Change

Slope has direct real-world meaning whenever two quantities are linearly related.

### Speed
A car's position over time: the slope of the position vs. time graph is the **speed**.

If a car is at mile marker 20 at 1:00 PM and mile marker 140 at 3:00 PM:

$$\text{Speed} = \frac{140 - 20}{3 - 1} = \frac{120}{2} = 60 \text{ mph}$$

### Growth Rate
A plant grows from 5 cm to 17 cm over 4 weeks:

$$\text{Growth rate} = \frac{17 - 5}{4 - 0} = 3 \text{ cm/week}$$

### Unit Pricing
If 3 pounds of apples cost \$4.50 and 7 pounds cost \$10.50:

$$\text{Price per pound} = \frac{10.50 - 4.50}{7 - 3} = \frac{6.00}{4} = \$1.50/\text{lb}$$

## Visual Python Examples: Comparing Slopes

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(0, 5, 100)
slopes = [0.5, 1, 2, 3]

plt.figure(figsize=(8, 6))
for m in slopes:
    plt.plot(x, m * x, label=f'm = {m}')

plt.xlabel('x'); plt.ylabel('y')
plt.title('Comparing Different Slopes')
plt.legend(); plt.grid(True)
plt.show()
```

As slope increases, the line becomes steeper. A slope of 1 means a 45° angle.

## Slope Between Points on a Curve

For non-linear functions, the slope between two points gives the **average rate of change**:

```python
import numpy as np

# Average rate of change of f(x) = x^2 from x=1 to x=4
f = lambda x: x**2
avg_slope = (f(4) - f(1)) / (4 - 1)
print(f"Average rate of change: {avg_slope}")  # 5.0
```

This is the slope of the **secant line** connecting $(1, 1)$ and $(4, 16)$. In calculus, letting the two points get infinitely close gives the **instantaneous** rate of change (the derivative).

## Key Takeaways

- Slope = rise/run = $\frac{\Delta y}{\Delta x}$ = the rate at which $y$ changes per unit of $x$.
- Positive slope rises, negative falls, zero is horizontal, undefined is vertical.
- Slope has real-world meaning: speed, growth rate, unit price, interest rate, etc.
- Steeper lines have larger absolute slope values.
- Average rate of change on a curve is the slope of the secant line connecting two points.

---

*Based on the [freeCodeCamp College Algebra with Python Certification](https://www.freecodecamp.org/learn/college-algebra-with-python/)*

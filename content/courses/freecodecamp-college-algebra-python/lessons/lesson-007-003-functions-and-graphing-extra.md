---
id: lesson-007-003
title: Functions and Graphing: Extra
chapterId: chapter-07
order: 3
duration: 5
objectives:
  - Identify parent functions and their basic shapes
  - Apply vertical and horizontal shifts to functions
  - Apply reflections and stretches/compressions
  - Visualize transformations with Python before-and-after plots
---

# Function Transformations

Every complex-looking function is built from simple **parent functions** modified by transformations. Once you recognize the parent and the transformations, you can graph anything quickly.

## Parent Functions

These are the fundamental building blocks:

| Parent Function | Equation | Shape |
|----------------|----------|-------|
| Linear | f(x) = x | Straight line through origin |
| Quadratic | f(x) = x**2 | U-shaped parabola |
| Cubic | f(x) = x**3 | S-shaped curve |
| Absolute Value | f(x) = |x| | V-shape |
| Square Root | f(x) = sqrt(x) | Half-parabola on its side |
| Reciprocal | f(x) = 1/x | Two-branch hyperbola |

```python
import matplotlib.pyplot as plt
import numpy as np

fig, axes = plt.subplots(2, 3, figsize=(15, 10))

# Linear
x = np.linspace(-4, 4, 200)
axes[0,0].plot(x, x, 'b-', linewidth=2)
axes[0,0].set_title('Linear: f(x) = x')

# Quadratic
axes[0,1].plot(x, x**2, 'r-', linewidth=2)
axes[0,1].set_title('Quadratic: f(x) = x²')

# Cubic
axes[0,2].plot(x, x**3, 'g-', linewidth=2)
axes[0,2].set_title('Cubic: f(x) = x³')

# Absolute value
axes[1,0].plot(x, np.abs(x), 'm-', linewidth=2)
axes[1,0].set_title('Absolute Value: f(x) = |x|')

# Square root
x_pos = np.linspace(0, 4, 200)
axes[1,1].plot(x_pos, np.sqrt(x_pos), 'c-', linewidth=2)
axes[1,1].set_title('Square Root: f(x) = √x')
axes[1,1].set_xlim(-1, 5)

# Reciprocal
x_neg = np.linspace(-4, -0.1, 100)
x_pos2 = np.linspace(0.1, 4, 100)
axes[1,2].plot(x_neg, 1/x_neg, 'orange', linewidth=2)
axes[1,2].plot(x_pos2, 1/x_pos2, 'orange', linewidth=2)
axes[1,2].set_title('Reciprocal: f(x) = 1/x')
axes[1,2].set_ylim(-5, 5)

for ax in axes.flat:
    ax.grid(True, alpha=0.3)
    ax.axhline(y=0, color='k', linewidth=0.5)
    ax.axvline(x=0, color='k', linewidth=0.5)

plt.tight_layout()
plt.show()
```

## Transformation Rules

Given a parent function f(x), the transformed function is:

**y = a * f(b(x - h)) + k**

Where:
- **h** = horizontal shift (right if positive, left if negative)
- **k** = vertical shift (up if positive, down if negative)
- **a** = vertical stretch (|a| > 1) or compression (0 < |a| < 1); reflection over x-axis if a < 0
- **b** = horizontal stretch (0 < |b| < 1) or compression (|b| > 1); reflection over y-axis if b < 0

## Vertical Shifts

f(x) + k shifts the graph UP by k units.
f(x) - k shifts the graph DOWN by k units.

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(-4, 4, 200)

plt.figure(figsize=(8, 6))
plt.plot(x, x**2, 'b-', linewidth=2, label='$f(x) = x^2$ (parent)')
plt.plot(x, x**2 + 3, 'r--', linewidth=2, label='$f(x) = x^2 + 3$ (up 3)')
plt.plot(x, x**2 - 2, 'g--', linewidth=2, label='$f(x) = x^2 - 2$ (down 2)')

plt.axhline(y=0, color='k', linewidth=0.5)
plt.axvline(x=0, color='k', linewidth=0.5)
plt.grid(True, alpha=0.3)
plt.title('Vertical Shifts')
plt.legend()
plt.ylim(-5, 12)
plt.show()
```

## Horizontal Shifts

f(x - h) shifts RIGHT by h units (counterintuitive!).
f(x + h) shifts LEFT by h units.

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(-6, 6, 300)

plt.figure(figsize=(8, 6))
plt.plot(x, x**2, 'b-', linewidth=2, label='$f(x) = x^2$ (parent)')
plt.plot(x, (x-3)**2, 'r--', linewidth=2, label='$f(x) = (x-3)^2$ (right 3)')
plt.plot(x, (x+2)**2, 'g--', linewidth=2, label='$f(x) = (x+2)^2$ (left 2)')

plt.axhline(y=0, color='k', linewidth=0.5)
plt.axvline(x=0, color='k', linewidth=0.5)
plt.grid(True, alpha=0.3)
plt.title('Horizontal Shifts')
plt.legend()
plt.ylim(-2, 15)
plt.show()
```

## Reflections

-f(x) reflects over the **x-axis** (flips vertically).
f(-x) reflects over the **y-axis** (flips horizontally).

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(-4, 4, 300)

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 5))

# x-axis reflection
ax1.plot(x, x**2, 'b-', linewidth=2, label='$f(x) = x^2$')
ax1.plot(x, -x**2, 'r--', linewidth=2, label='$-f(x) = -x^2$')
ax1.set_title('Reflection over x-axis')
ax1.legend()
ax1.grid(True, alpha=0.3)
ax1.axhline(y=0, color='k', linewidth=0.5)
ax1.axvline(x=0, color='k', linewidth=0.5)

# y-axis reflection
x_pos = np.linspace(0, 4, 200)
ax2.plot(x_pos, np.sqrt(x_pos), 'b-', linewidth=2, label='$f(x) = \sqrt{x}$')
x_neg = np.linspace(-4, 0, 200)
ax2.plot(x_neg, np.sqrt(-x_neg), 'r--', linewidth=2, label='$f(-x) = \sqrt{-x}$')
ax2.set_title('Reflection over y-axis')
ax2.legend()
ax2.grid(True, alpha=0.3)
ax2.axhline(y=0, color='k', linewidth=0.5)
ax2.axvline(x=0, color='k', linewidth=0.5)

plt.tight_layout()
plt.show()
```

## Vertical Stretches and Compressions

a * f(x):
- |a| > 1: vertical **stretch** (graph gets taller)
- 0 < |a| < 1: vertical **compression** (graph gets shorter)

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(-3, 3, 200)

plt.figure(figsize=(8, 6))
plt.plot(x, x**2, 'b-', linewidth=2, label='$x^2$ (parent)')
plt.plot(x, 3*x**2, 'r--', linewidth=2, label='$3x^2$ (stretch by 3)')
plt.plot(x, 0.25*x**2, 'g--', linewidth=2, label='$0.25x^2$ (compress by 1/4)')

plt.axhline(y=0, color='k', linewidth=0.5)
plt.axvline(x=0, color='k', linewidth=0.5)
plt.grid(True, alpha=0.3)
plt.title('Vertical Stretch and Compression')
plt.legend()
plt.ylim(-1, 12)
plt.show()
```

## Combining Multiple Transformations

Graph y = -2(x - 1)**2 + 5. Starting from y = x**2:
1. Horizontal shift right 1: (x-1)**2
2. Vertical stretch by 2: 2(x-1)**2
3. Reflection over x-axis: -2(x-1)**2
4. Vertical shift up 5: -2(x-1)**2 + 5

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(-3, 5, 300)

plt.figure(figsize=(10, 6))
plt.plot(x, x**2, 'b-', linewidth=1, alpha=0.4, label='Step 0: $x^2$')
plt.plot(x, (x-1)**2, 'g-', linewidth=1, alpha=0.4, label='Step 1: $(x-1)^2$')
plt.plot(x, 2*(x-1)**2, 'orange', linewidth=1, alpha=0.4, label='Step 2: $2(x-1)^2$')
plt.plot(x, -2*(x-1)**2, 'm-', linewidth=1, alpha=0.4, label='Step 3: $-2(x-1)^2$')
plt.plot(x, -2*(x-1)**2 + 5, 'r-', linewidth=3, label='Step 4: $-2(x-1)^2 + 5$')

plt.plot(1, 5, 'ko', markersize=8)  # vertex
plt.annotate('Vertex (1, 5)', (1, 5), xytext=(2, 6),
            arrowprops=dict(arrowstyle='->'), fontsize=11)

plt.axhline(y=0, color='k', linewidth=0.5)
plt.axvline(x=0, color='k', linewidth=0.5)
plt.grid(True, alpha=0.3)
plt.title('Building a Transformed Function Step by Step')
plt.legend(loc='lower right')
plt.ylim(-10, 10)
plt.show()
```

## Describing Transformations from an Equation

```python
def describe_transformations(a, b, h, k, parent="x²"):
    """Describe transformations of y = a*f(b(x-h)) + k."""
    print(f"Parent function: f(x) = {parent}")
    print(f"Transformed: y = {a}*f({b}(x - {h})) + {k}")
    print("Transformations:")
    
    if h > 0: print(f"  - Shift RIGHT {h} units")
    elif h < 0: print(f"  - Shift LEFT {abs(h)} units")
    
    if k > 0: print(f"  - Shift UP {k} units")
    elif k < 0: print(f"  - Shift DOWN {abs(k)} units")
    
    if a < 0: print(f"  - Reflect over x-axis")
    if abs(a) > 1: print(f"  - Vertical stretch by factor {abs(a)}")
    elif 0 < abs(a) < 1: print(f"  - Vertical compression by factor {abs(a)}")
    
    if b < 0: print(f"  - Reflect over y-axis")
    if abs(b) > 1: print(f"  - Horizontal compression by factor 1/{abs(b)}")
    elif 0 < abs(b) < 1: print(f"  - Horizontal stretch by factor 1/{abs(b)}")

# y = -2(x - 1)^2 + 5
describe_transformations(a=-2, b=1, h=1, k=5)
```

Understanding transformations lets you graph any function by starting from a parent you know and applying simple modifications.

*Based on the [freeCodeCamp College Algebra with Python Certification](https://www.freecodecamp.org/learn/college-algebra-with-python/)*

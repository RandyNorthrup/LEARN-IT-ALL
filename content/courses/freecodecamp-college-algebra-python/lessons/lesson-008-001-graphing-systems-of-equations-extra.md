---
id: lesson-008-001
title: Graphing Systems of Equations: Extra
chapterId: chapter-08
order: 1
duration: 5
objectives:
  - Solve systems of equations by graphing
  - Identify one-solution, no-solution, and infinite-solution cases visually
  - Find intersection points algebraically and graphically
  - Build Python visualizations of systems and their solutions
---

# Graphing Systems of Equations

A **system of equations** is two or more equations with the same variables. The **solution** is the point (or points) where all equations are satisfied simultaneously. Graphically, this is where the lines (or curves) intersect.

## The Three Cases for Linear Systems

Two lines in a plane can relate to each other in exactly three ways:

1. **One solution** — lines intersect at exactly one point (different slopes)
2. **No solution** — lines are parallel (same slope, different y-intercept)
3. **Infinite solutions** — lines are coincident / identical (same line)

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(-2, 6, 200)

fig, axes = plt.subplots(1, 3, figsize=(16, 5))

# Case 1: One solution (lines intersect)
axes[0].plot(x, 2*x - 1, 'b-', linewidth=2, label='y = 2x - 1')
axes[0].plot(x, -x + 5, 'r-', linewidth=2, label='y = -x + 5')
axes[0].plot(2, 3, 'go', markersize=12, zorder=5)
axes[0].annotate('Solution: (2, 3)', (2, 3), xytext=(3, 1),
                arrowprops=dict(arrowstyle='->'), fontsize=11)
axes[0].set_title('One Solution\n(Intersecting Lines)')
axes[0].legend()

# Case 2: No solution (parallel lines)
axes[1].plot(x, 2*x + 1, 'b-', linewidth=2, label='y = 2x + 1')
axes[1].plot(x, 2*x - 3, 'r-', linewidth=2, label='y = 2x - 3')
axes[1].set_title('No Solution\n(Parallel Lines)')
axes[1].legend()

# Case 3: Infinite solutions (same line)
axes[2].plot(x, x + 1, 'b-', linewidth=3, label='y = x + 1')
axes[2].plot(x, x + 1, 'r--', linewidth=2, label='2y = 2x + 2')
axes[2].set_title('Infinite Solutions\n(Same Line)')
axes[2].legend()

for ax in axes:
    ax.grid(True, alpha=0.3)
    ax.axhline(y=0, color='k', linewidth=0.5)
    ax.axvline(x=0, color='k', linewidth=0.5)
    ax.set_xlabel('x')
    ax.set_ylabel('y')
    ax.set_ylim(-5, 10)

plt.tight_layout()
plt.show()
```

## Finding the Intersection Point

To find where two lines intersect, set them equal and solve:

y = 2x - 1 and y = -x + 5

2x - 1 = -x + 5 → 3x = 6 → x = 2 → y = 2(2) - 1 = 3

Solution: (2, 3)

```python
from sympy import symbols, Eq, solve

x, y = symbols('x y')

# System: y = 2x - 1 and y = -x + 5
eq1 = Eq(y, 2*x - 1)
eq2 = Eq(y, -x + 5)

solution = solve((eq1, eq2), (x, y))
print(f"Intersection point: ({solution[x]}, {solution[y]})")  # (2, 3)
```

## Detecting the Type of System

```python
def classify_system(m1, b1, m2, b2):
    """Classify a system of two linear equations y=m1*x+b1, y=m2*x+b2."""
    if m1 == m2:
        if b1 == b2:
            return "Infinite solutions (same line)"
        else:
            return "No solution (parallel lines)"
    else:
        x_int = (b2 - b1) / (m1 - m2)
        y_int = m1 * x_int + b1
        return f"One solution at ({x_int:.4g}, {y_int:.4g})"

print(classify_system(2, -1, -1, 5))  # One solution at (2, 3)
print(classify_system(2, 1, 2, -3))   # No solution (parallel)
print(classify_system(1, 1, 1, 1))    # Infinite solutions
print(classify_system(3, 2, -0.5, 9)) # One solution at (2, 8)
```

## Graphing Non-Linear Systems

Systems can involve curves too. A line and a parabola can intersect at 0, 1, or 2 points:

```python
import matplotlib.pyplot as plt
import numpy as np
from sympy import symbols, Eq, solve

# System: y = x^2 and y = x + 2
x_sym, y_sym = symbols('x y')
solutions = solve((Eq(y_sym, x_sym**2), Eq(y_sym, x_sym + 2)), (x_sym, y_sym))
print(f"Intersections: {solutions}")  # [(-1, 1), (2, 4)]

x = np.linspace(-3, 4, 300)

plt.figure(figsize=(8, 6))
plt.plot(x, x**2, 'b-', linewidth=2, label='$y = x^2$')
plt.plot(x, x + 2, 'r-', linewidth=2, label='$y = x + 2$')

for sol in solutions:
    px, py = float(sol[0]), float(sol[1])
    plt.plot(px, py, 'go', markersize=10, zorder=5)
    plt.annotate(f'({px}, {py})', (px, py), xytext=(px+0.3, py+0.5),
                fontsize=11, arrowprops=dict(arrowstyle='->'))

plt.axhline(y=0, color='k', linewidth=0.5)
plt.axvline(x=0, color='k', linewidth=0.5)
plt.grid(True, alpha=0.3)
plt.xlabel('x')
plt.ylabel('y')
plt.title('Non-Linear System: Parabola and Line')
plt.legend()
plt.ylim(-2, 10)
plt.show()
```

## Interactive System Solver and Plotter

Here is a reusable function that solves and plots any system of two equations:

```python
import matplotlib.pyplot as plt
import numpy as np
from sympy import symbols, Eq, solve, lambdify

def solve_and_plot_system(expr1, expr2, x_range=(-5, 5)):
    """Solve and plot a system of two equations."""
    x = symbols('x')
    y1 = expr1
    y2 = expr2
    
    # Solve algebraically
    solutions = solve(Eq(y1, y2), x)
    
    # Convert to plottable functions
    f1 = lambdify(x, y1, 'numpy')
    f2 = lambdify(x, y2, 'numpy')
    
    x_vals = np.linspace(x_range[0], x_range[1], 400)
    
    plt.figure(figsize=(8, 6))
    plt.plot(x_vals, f1(x_vals), 'b-', linewidth=2, label=f'$y = {y1}$')
    plt.plot(x_vals, f2(x_vals), 'r-', linewidth=2, label=f'$y = {y2}$')
    
    for sol in solutions:
        px = float(sol)
        py = float(y1.subs(x, sol))
        plt.plot(px, py, 'go', markersize=10, zorder=5)
        plt.annotate(f'({px:.2f}, {py:.2f})', (px, py),
                    xytext=(10, 10), textcoords='offset points',
                    fontsize=10, arrowprops=dict(arrowstyle='->'))
    
    plt.axhline(y=0, color='k', linewidth=0.5)
    plt.axvline(x=0, color='k', linewidth=0.5)
    plt.grid(True, alpha=0.3)
    plt.legend()
    plt.title(f'System Solution: {len(solutions)} intersection(s)')
    plt.show()
    
    return solutions

# Example usage
x = symbols('x')
solve_and_plot_system(x**2 - 4, 2*x - 1, x_range=(-4, 5))
```

## Real-World Example: Supply and Demand

```python
import matplotlib.pyplot as plt
import numpy as np
from sympy import symbols, Eq, solve

p = symbols('p')  # price

# Demand: q = -5p + 100 (falls as price rises)
# Supply: q = 3p - 20 (rises as price rises)
demand = -5*p + 100
supply = 3*p - 20

eq_price = solve(Eq(demand, supply), p)[0]
eq_quantity = demand.subs(p, eq_price)
print(f"Equilibrium price: ${eq_price}")      # $15
print(f"Equilibrium quantity: {eq_quantity}")  # 25 units

p_vals = np.linspace(0, 25, 200)

plt.figure(figsize=(8, 5))
plt.plot(p_vals, -5*p_vals + 100, 'b-', linewidth=2, label='Demand: q = -5p + 100')
plt.plot(p_vals, 3*p_vals - 20, 'r-', linewidth=2, label='Supply: q = 3p - 20')
plt.plot(float(eq_price), float(eq_quantity), 'go', markersize=12)
plt.annotate(f'Equilibrium\n(${eq_price}, {eq_quantity} units)',
            (float(eq_price), float(eq_quantity)),
            xytext=(18, 50), fontsize=11,
            arrowprops=dict(arrowstyle='->', color='green'))
plt.xlabel('Price ($)')
plt.ylabel('Quantity')
plt.title('Market Equilibrium')
plt.legend()
plt.grid(True, alpha=0.3)
plt.ylim(-10, 110)
plt.show()
```

Graphing systems provides powerful visual intuition for understanding solutions. Combined with algebraic methods, you have a complete toolkit for solving any system.

*Based on the [freeCodeCamp College Algebra with Python Certification](https://www.freecodecamp.org/learn/college-algebra-with-python/)*

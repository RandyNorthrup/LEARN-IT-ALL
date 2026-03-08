---
id: lesson-008-002
title: Graphing Systems
chapterId: chapter-08
order: 2
duration: 5
objectives:
  - Solve systems of equations using the substitution method
  - Solve systems of equations using the elimination method
  - Compare substitution and elimination approaches
  - Extend techniques to systems with three equations
  - Use numpy.linalg.solve() and SymPy to verify solutions
---

# Graphing Systems

A **system of equations** consists of two or more equations with the same variables. The solution is the set of values that satisfies every equation simultaneously. In this lesson you will learn both graphical and algebraic techniques, then verify results with Python.

## Graphical Approach

Graphing each equation and finding the intersection point gives you a visual solution.

```python
import numpy as np
import matplotlib.pyplot as plt

# System: 2x + y = 8, x - y = 1
x = np.linspace(-2, 6, 300)
y1 = 8 - 2 * x        # from 2x + y = 8
y2 = x - 1             # from x - y = 1  =>  y = x - 1

plt.plot(x, y1, label='2x + y = 8')
plt.plot(x, y2, label='x - y = 1')
plt.plot(3, 2, 'ro', markersize=10, label='Solution (3, 2)')
plt.xlabel('x'); plt.ylabel('y')
plt.legend(); plt.grid(True); plt.title('Graphing a System')
plt.show()
```

The lines cross at $(3, 2)$, which is the solution.

## Substitution Method

Solve one equation for a variable, then substitute into the other.

**Example:** $2x + y = 8$ and $x - y = 1$

1. From the second equation: $y = x - 1$
2. Substitute into the first: $2x + (x - 1) = 8 \Rightarrow 3x = 9 \Rightarrow x = 3$
3. Back-substitute: $y = 3 - 1 = 2$

Substitution works best when one variable has a coefficient of 1 or $-1$.

## Elimination Method

Add or subtract equations (after multiplying if necessary) to eliminate a variable.

**Example:** $3x + 2y = 12$ and $x - 2y = 0$

Add the two equations directly:

$$3x + 2y + x - 2y = 12 + 0 \Rightarrow 4x = 12 \Rightarrow x = 3$$

Substitute back: $3 - 2y = 0 \Rightarrow y = 1.5$

Elimination shines when coefficients are already opposites or easy to make opposites.

## Comparing Methods

| Method | Best When | Drawback |
|---|---|---|
| Graphing | You need a visual picture | Imprecise for non-integer solutions |
| Substitution | A variable is already isolated | Messy with large coefficients |
| Elimination | Coefficients line up nicely | Requires careful arithmetic |

## Systems with Three Equations

For three unknowns you need three independent equations. The strategy is to eliminate one variable at a time, reducing to a 2×2 system.

**Example:**

$$x + y + z = 6$$
$$2x - y + z = 3$$
$$x + 2y - z = 5$$

Adding equations 1 and 3 eliminates $z$: $2x + 3y = 11$. Adding equations 1 and 2 also eliminates nothing directly, but subtracting equation 1 from equation 2 gives $x - 2y = -3$. Solving the resulting 2×2 system yields $x = 1$, $y = 3$, $z = 2$.

## Solving with NumPy

`numpy.linalg.solve()` handles systems expressed in matrix form $Ax = b$.

```python
import numpy as np

# 3x3 system from above
A = np.array([[1, 1, 1],
              [2, -1, 1],
              [1, 2, -1]])
b = np.array([6, 3, 5])

solution = np.linalg.solve(A, b)
print(f"x = {solution[0]}, y = {solution[1]}, z = {solution[2]}")
# Output: x = 1.0, y = 3.0, z = 2.0
```

## Solving with SymPy

SymPy gives exact symbolic answers:

```python
from sympy import symbols, Eq, solve

x, y, z = symbols('x y z')
eq1 = Eq(x + y + z, 6)
eq2 = Eq(2*x - y + z, 3)
eq3 = Eq(x + 2*y - z, 5)

result = solve((eq1, eq2, eq3), (x, y, z))
print(result)  # {x: 1, y: 3, z: 2}
```

Both libraries confirm the hand-calculated answer.

## Key Takeaways

- Graphing provides intuition; algebraic methods provide precision.
- Substitution and elimination are complementary — choose based on equation structure.
- For 3×3 (or larger) systems, matrix methods and Python tools save significant effort.
- Always verify your solution by plugging values back into **all** original equations.

---

*Based on the [freeCodeCamp College Algebra with Python Certification](https://www.freecodecamp.org/learn/college-algebra-with-python/)*

---
id: lesson-010-001
title: Solving Systems of Equations: Extra
chapterId: chapter-10
order: 1
duration: 5
objectives:
  - Solve 2×2 systems step-by-step using substitution
  - Solve 2×2 systems step-by-step using elimination
  - Classify systems as consistent, inconsistent, or dependent
  - Apply Cramer's rule to solve systems
  - Represent systems in matrix form
---

# Solving Systems of Equations: Extra

This lesson provides thorough practice with substitution and elimination, introduces the classification of systems, and shows how Cramer's rule and matrix notation connect algebra to linear algebra.

## Substitution Method — Step by Step

The substitution method works by isolating one variable in one equation and substituting into the other.

**Example:** Solve the system:
$$y = 2x + 1$$
$$3x + 2y = 12$$

**Step 1:** The first equation already has $y$ isolated.

**Step 2:** Substitute $y = 2x + 1$ into the second equation:
$$3x + 2(2x + 1) = 12$$
$$3x + 4x + 2 = 12$$
$$7x = 10$$
$$x = \frac{10}{7}$$

**Step 3:** Back-substitute:
$$y = 2 \cdot \frac{10}{7} + 1 = \frac{20}{7} + \frac{7}{7} = \frac{27}{7}$$

Solution: $\left(\frac{10}{7},\; \frac{27}{7}\right)$

## Elimination Method — Step by Step

**Example:** Solve:
$$4x + 3y = 10$$
$$2x - 3y = 2$$

**Step 1:** The $y$ coefficients are already opposites ($+3y$ and $-3y$).

**Step 2:** Add the equations:
$$6x = 12 \Rightarrow x = 2$$

**Step 3:** Substitute back: $4(2) + 3y = 10 \Rightarrow 3y = 2 \Rightarrow y = \frac{2}{3}$

When coefficients don't align, multiply one or both equations first.

**Example:** Solve:
$$2x + 5y = 1$$
$$3x + 2y = 7$$

Multiply the first equation by 3 and the second by $-2$:
$$6x + 15y = 3$$
$$-6x - 4y = -14$$

Add: $11y = -11 \Rightarrow y = -1$. Then $2x + 5(-1) = 1 \Rightarrow x = 3$.

## Classifying Systems

A system of two linear equations can be:

| Type | Graphically | Algebraically | Solutions |
|---|---|---|---|
| **Consistent & Independent** | Lines intersect at one point | Unique solution | Exactly one |
| **Inconsistent** | Lines are parallel | Contradiction (e.g., $0 = 5$) | None |
| **Dependent** | Lines are identical | Identity (e.g., $0 = 0$) | Infinitely many |

**Inconsistent example:** $x + y = 3$ and $x + y = 7$ — same slopes, different intercepts.

**Dependent example:** $2x + 4y = 8$ and $x + 2y = 4$ — the first is just twice the second.

## Cramer's Rule

For the system $ax + by = e$ and $cx + dy = f$, define:

$$D = ad - bc, \quad D_x = ed - bf, \quad D_y = af - ce$$

Then:
$$x = \frac{D_x}{D}, \quad y = \frac{D_y}{D} \quad (D \neq 0)$$

**Example:** $2x + 5y = 1$ and $3x + 2y = 7$

$$D = (2)(2) - (5)(3) = 4 - 15 = -11$$
$$D_x = (1)(2) - (5)(7) = 2 - 35 = -33$$
$$D_y = (2)(7) - (1)(3) = 14 - 3 = 11$$

$$x = \frac{-33}{-11} = 3, \quad y = \frac{11}{-11} = -1$$

If $D = 0$, the system is either inconsistent or dependent.

## Matrix Representation

Any linear system can be written as $Ax = b$:

$$\begin{bmatrix} 2 & 5 \\ 3 & 2 \end{bmatrix} \begin{bmatrix} x \\ y \end{bmatrix} = \begin{bmatrix} 1 \\ 7 \end{bmatrix}$$

This notation is the foundation of linear algebra and scales to any number of variables.

```python
import numpy as np
from sympy import symbols, Eq, solve, Matrix

# NumPy solution
A = np.array([[2, 5], [3, 2]])
b = np.array([1, 7])
print("NumPy:", np.linalg.solve(A, b))  # [3. -1.]

# Cramer's rule in Python
D = np.linalg.det(A)
Dx = np.linalg.det(np.array([[1, 5], [7, 2]]))
Dy = np.linalg.det(np.array([[2, 1], [3, 7]]))
print(f"Cramer: x = {Dx/D}, y = {Dy/D}")

# SymPy symbolic solution
x, y = symbols('x y')
result = solve([Eq(2*x + 5*y, 1), Eq(3*x + 2*y, 7)], [x, y])
print("SymPy:", result)  # {x: 3, y: -1}

# SymPy Matrix method
M = Matrix([[2, 5, 1], [3, 2, 7]])
print("RREF:", M.rref())  # Row-reduced form
```

## Key Takeaways

- Substitution is cleanest when a variable is already isolated or has coefficient 1.
- Elimination is efficient when coefficients can be easily matched.
- Classifying a system tells you *how many* solutions to expect before you solve.
- Cramer's rule provides a formula-based approach using determinants.
- Matrix notation ($Ax = b$) generalizes systems to any dimension.

---

*Based on the [freeCodeCamp College Algebra with Python Certification](https://www.freecodecamp.org/learn/college-algebra-with-python/)*

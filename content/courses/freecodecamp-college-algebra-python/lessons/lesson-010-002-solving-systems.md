---
id: lesson-010-002
title: Solving Systems
chapterId: chapter-10
order: 2
duration: 5
objectives:
  - Build augmented matrices from systems of equations
  - Perform elementary row operations
  - Apply Gaussian elimination to solve systems
  - Compute reduced row echelon form (RREF)
  - Use NumPy for matrix operations and 3×3 system examples
---

# Solving Systems

Matrix methods provide a systematic, scalable approach to solving linear systems. This lesson covers augmented matrices, row operations, Gaussian elimination, and RREF — techniques that work for systems of any size.

## Augmented Matrices

An augmented matrix combines the coefficient matrix $A$ and the constant vector $b$ into one structure, separated by a vertical bar.

For the system:
$$2x + 3y = 8$$
$$x - y = 1$$

The augmented matrix is:

$$\left[\begin{array}{cc|c} 2 & 3 & 8 \\ 1 & -1 & 1 \end{array}\right]$$

## Elementary Row Operations

Three legal operations that do not change the solution set:

1. **Swap** two rows: $R_i \leftrightarrow R_j$
2. **Scale** a row by a nonzero constant: $kR_i \to R_i$
3. **Replace** a row with itself plus a multiple of another: $R_i + kR_j \to R_i$

These operations are the engine behind Gaussian elimination.

## Gaussian Elimination

The goal is to transform the augmented matrix into **row echelon form** (upper triangular with leading 1s), then back-substitute.

**Example:** Solve the system above.

$$\left[\begin{array}{cc|c} 2 & 3 & 8 \\ 1 & -1 & 1 \end{array}\right]$$

**Step 1:** Swap $R_1$ and $R_2$ to get a leading 1:

$$\left[\begin{array}{cc|c} 1 & -1 & 1 \\ 2 & 3 & 8 \end{array}\right]$$

**Step 2:** $R_2 - 2R_1 \to R_2$:

$$\left[\begin{array}{cc|c} 1 & -1 & 1 \\ 0 & 5 & 6 \end{array}\right]$$

**Step 3:** Scale $R_2$: $\frac{1}{5}R_2 \to R_2$:

$$\left[\begin{array}{cc|c} 1 & -1 & 1 \\ 0 & 1 & 6/5 \end{array}\right]$$

**Back-substitute:** From $R_2$: $y = \frac{6}{5}$. From $R_1$: $x - \frac{6}{5} = 1 \Rightarrow x = \frac{11}{5}$.

## Reduced Row Echelon Form (RREF)

RREF goes further than row echelon form by making every leading entry 1 and all other entries in that column 0. The solution reads directly from the matrix.

Continuing from above, apply $R_1 + R_2 \to R_1$:

$$\left[\begin{array}{cc|c} 1 & 0 & 11/5 \\ 0 & 1 & 6/5 \end{array}\right]$$

This directly tells us $x = \frac{11}{5}$, $y = \frac{6}{5}$.

## 3×3 System Example

Solve:
$$x + y + z = 6$$
$$2x + 3y + z = 14$$
$$x - y + 2z = 2$$

Augmented matrix:

$$\left[\begin{array}{ccc|c} 1 & 1 & 1 & 6 \\ 2 & 3 & 1 & 14 \\ 1 & -1 & 2 & 2 \end{array}\right]$$

Apply row operations:
- $R_2 - 2R_1 \to R_2$: $[0, 1, -1, 2]$
- $R_3 - R_1 \to R_3$: $[0, -2, 1, -4]$
- $R_3 + 2R_2 \to R_3$: $[0, 0, -1, 0]$

Back-substitute: $z = 0$, $y - 0 = 2 \Rightarrow y = 2$, $x + 2 + 0 = 6 \Rightarrow x = 4$.

Solution: $(4, 2, 0)$.

## NumPy Implementation

```python
import numpy as np

# 3x3 system
A = np.array([[1, 1, 1],
              [2, 3, 1],
              [1, -1, 2]], dtype=float)
b = np.array([6, 14, 2], dtype=float)

# Direct solve
solution = np.linalg.solve(A, b)
print(f"Solution: x={solution[0]}, y={solution[1]}, z={solution[2]}")
# Output: x=4.0, y=2.0, z=0.0

# Verify: A @ x should equal b
print("Verification:", np.allclose(A @ solution, b))  # True
```

## SymPy for Exact RREF

SymPy's `Matrix.rref()` returns the reduced row echelon form with exact fractions:

```python
from sympy import Matrix

# Augmented matrix
M = Matrix([
    [1, 1, 1, 6],
    [2, 3, 1, 14],
    [1, -1, 2, 2]
])

rref_matrix, pivot_columns = M.rref()
print("RREF:")
print(rref_matrix)
# Matrix([[1, 0, 0, 4],
#         [0, 1, 0, 2],
#         [0, 0, 1, 0]])
print("Pivot columns:", pivot_columns)  # (0, 1, 2)
```

## Determinants and Invertibility

A system $Ax = b$ has a unique solution if and only if $\det(A) \neq 0$.

```python
det = np.linalg.det(A)
print(f"det(A) = {det}")  # -1.0 (nonzero => unique solution)

# You can also solve via the inverse: x = A^(-1) * b
A_inv = np.linalg.inv(A)
print("Via inverse:", A_inv @ b)  # [4. 2. 0.]
```

## Key Takeaways

- Augmented matrices encode a system compactly and set up systematic elimination.
- Gaussian elimination transforms to row echelon form; RREF gives the answer directly.
- Row operations never change the solution set — they just make it easier to read.
- NumPy handles numerical solutions efficiently; SymPy provides exact symbolic RREF.
- Check $\det(A) \neq 0$ to confirm a unique solution exists before solving.

---

*Based on the [freeCodeCamp College Algebra with Python Certification](https://www.freecodecamp.org/learn/college-algebra-with-python/)*

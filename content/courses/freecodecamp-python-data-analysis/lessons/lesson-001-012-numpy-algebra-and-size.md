---
id: lesson-001-012
title: Numpy Algebra and Size
chapterId: chapter-01
order: 12
duration: 5
objectives:
  - Perform matrix multiplication and other linear algebra operations
  - Understand memory layout and size of NumPy arrays
  - Use np.linalg for determinants, inverses, and eigenvalues
---

# Numpy Algebra and Size

NumPy includes a comprehensive linear algebra module and efficient memory management. This lesson covers matrix operations, the `np.linalg` module, and how to understand array memory usage.

## Matrix Multiplication

There are several ways to multiply matrices in NumPy:

```python
import numpy as np

a = np.array([[1, 2],
              [3, 4]])
b = np.array([[5, 6],
              [7, 8]])

# Element-wise multiplication (Hadamard product)
print(a * b)
# [[ 5 12]
#  [21 32]]

# Matrix multiplication (dot product)
print(a @ b)          # Using @ operator
print(np.dot(a, b))   # Using np.dot
print(np.matmul(a, b))  # Using np.matmul
# All produce:
# [[19 22]
#  [43 50]]
```

## Linear Algebra with np.linalg

The `np.linalg` module provides essential linear algebra operations:

```python
A = np.array([[1, 2],
              [3, 4]])

# Determinant
print(np.linalg.det(A))  # -2.0

# Inverse
inv_A = np.linalg.inv(A)
print(inv_A)
# [[-2.   1. ]
#  [ 1.5 -0.5]]

# Verify: A @ A_inv = Identity
print(A @ inv_A)  # [[1. 0.] [0. 1.]]

# Eigenvalues and eigenvectors
eigenvalues, eigenvectors = np.linalg.eig(A)
print(f"Eigenvalues: {eigenvalues}")
print(f"Eigenvectors:\n{eigenvectors}")

# Solve linear system: Ax = b
b = np.array([5, 11])
x = np.linalg.solve(A, b)
print(f"Solution: {x}")  # [1. 2.]
```

## Transpose

```python
arr = np.array([[1, 2, 3],
                [4, 5, 6]])

print(arr.T)       # Transpose
# [[1 4]
#  [2 5]
#  [3 6]]

print(arr.shape)   # (2, 3)
print(arr.T.shape) # (3, 2)
```

## Understanding Array Size and Memory

Knowing how much memory your arrays use is important for large datasets:

```python
arr = np.arange(1000000, dtype='float64')

print(arr.dtype)      # float64
print(arr.itemsize)   # 8 bytes per element
print(arr.size)       # 1000000 elements
print(arr.nbytes)     # 8000000 bytes (about 7.6 MB)

# Compare with float32
arr32 = arr.astype('float32')
print(arr32.nbytes)   # 4000000 bytes (about 3.8 MB)
```

## Data Type Impact on Memory

| dtype | Bytes per element | Range |
|---|---|---|
| int8 | 1 | -128 to 127 |
| int32 | 4 | ±2.1 billion |
| int64 | 8 | ±9.2 quintillion |
| float32 | 4 | ~7 decimal digits precision |
| float64 | 8 | ~15 decimal digits precision |

Choosing smaller data types can significantly reduce memory usage for large datasets. Use `float32` instead of `float64` when full precision is not needed.

## Practical Example: Solving a System of Equations

```python
# 2x + 3y = 8
# 4x + y  = 10
A = np.array([[2, 3],
              [4, 1]])
b = np.array([8, 10])

solution = np.linalg.solve(A, b)
print(f"x = {solution[0]:.2f}, y = {solution[1]:.2f}")
# x = 2.20, y = 1.20
```

More resources:

-  <a href="https://github.com/ine-rmotr-curriculum/freecodecamp-intro-to-numpy" target="_blank" rel="noopener noreferrer nofollow">Notebooks on GitHub</a>
-  <a href="https://colab.research.google.com/github/googlecolab/colabtools/blob/master/notebooks/colab-github-demo.ipynb" target="_blank" rel="noopener noreferrer nofollow">How to open Notebooks from GitHub using Google Colab.</a>

---

*Based on the [freeCodeCamp Data Analysis with Python Certification](https://www.freecodecamp.org/learn/data-analysis-with-python/)*

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/data-analysis-with-python/)*
*Original Challenge ID: 5e9a093a74c4063ca6f7c157*

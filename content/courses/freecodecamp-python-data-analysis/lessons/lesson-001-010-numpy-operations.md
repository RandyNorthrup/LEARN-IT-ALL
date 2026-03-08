---
id: lesson-001-010
title: Numpy Operations
chapterId: chapter-01
order: 10
duration: 5
objectives:
  - Perform element-wise arithmetic operations on NumPy arrays
  - Use comparison operators to create boolean arrays
  - Apply universal functions (ufuncs) for mathematical computation
---

# Numpy Operations

NumPy operations are the reason the library is so powerful. Instead of writing loops, you apply operations to entire arrays at once. This lesson covers arithmetic, comparison, and mathematical operations.

## Element-wise Arithmetic

Arithmetic operators apply to each element independently:

```python
import numpy as np

a = np.array([10, 20, 30, 40])
b = np.array([1, 2, 3, 4])

print(a + b)   # [11 22 33 44]
print(a - b)   # [ 9 18 27 36]
print(a * b)   # [ 10  40  90 160]
print(a / b)   # [10. 10. 10. 10.]
print(a // b)  # [10 10 10 10] — integer division
print(a % b)   # [0 0 0 0] — modulus
print(a ** 2)  # [ 100  400  900 1600] — power
```

## Scalar Operations

Operations with a single number apply to every element (broadcasting):

```python
arr = np.array([1, 2, 3, 4, 5])
print(arr + 100)  # [101 102 103 104 105]
print(arr * 3)    # [ 3  6  9 12 15]
print(1 / arr)    # [1.   0.5  0.33 0.25 0.2]
```

## Comparison Operators

Comparisons return boolean arrays:

```python
arr = np.array([10, 25, 30, 45, 50])

print(arr > 30)   # [False False False  True  True]
print(arr == 25)  # [False  True False False False]
print(arr != 10)  # [False  True  True  True  True]
print(arr >= 30)  # [False False  True  True  True]
```

Use boolean arrays for filtering (more in the Boolean Arrays lesson).

## Universal Functions (ufuncs)

NumPy provides optimized mathematical functions:

```python
arr = np.array([1, 4, 9, 16, 25])

# Square root
print(np.sqrt(arr))   # [1. 2. 3. 4. 5.]

# Absolute value
print(np.abs(np.array([-3, -1, 0, 2, 4])))  # [3 1 0 2 4]

# Trigonometric functions
angles = np.array([0, np.pi/6, np.pi/4, np.pi/3, np.pi/2])
print(np.sin(angles))  # [0.  0.5  0.707  0.866  1.]

# Exponential and logarithm
print(np.exp([0, 1, 2]))     # [1.    2.718  7.389]
print(np.log([1, np.e, 10])) # [0.  1.  2.302]
```

## Aggregation Functions

```python
arr = np.array([[1, 2, 3],
                [4, 5, 6]])

print(np.sum(arr))         # 21
print(np.sum(arr, axis=0)) # [5 7 9] — column sums
print(np.sum(arr, axis=1)) # [ 6 15] — row sums
print(np.mean(arr))        # 3.5
print(np.median(arr))      # 3.5
print(np.std(arr))         # 1.707...
print(np.min(arr))         # 1
print(np.max(arr))         # 6
```

## Matrix Operations

```python
a = np.array([[1, 2], [3, 4]])
b = np.array([[5, 6], [7, 8]])

# Element-wise multiplication
print(a * b)  # [[ 5 12] [21 32]]

# Matrix multiplication (dot product)
print(a @ b)           # [[19 22] [43 50]]
print(np.dot(a, b))    # Same result
```

More resources:

-  <a href="https://github.com/ine-rmotr-curriculum/freecodecamp-intro-to-numpy" target="_blank" rel="noopener noreferrer nofollow">Notebooks on GitHub</a>
-  <a href="https://colab.research.google.com/github/googlecolab/colabtools/blob/master/notebooks/colab-github-demo.ipynb" target="_blank" rel="noopener noreferrer nofollow">How to open Notebooks from GitHub using Google Colab.</a>

---

*Based on the [freeCodeCamp Data Analysis with Python Certification](https://www.freecodecamp.org/learn/data-analysis-with-python/)*

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/data-analysis-with-python/)*
*Original Challenge ID: 5e9a093a74c4063ca6f7c155*

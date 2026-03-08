---
id: lesson-001-007
title: Numpy Introduction A
chapterId: chapter-01
order: 7
duration: 5
objectives:
  - Understand what NumPy is and why it is essential for data science
  - Create NumPy arrays from Python lists and using built-in functions
  - Inspect array properties including shape, dtype, and ndim
---

# Numpy Introduction A

NumPy (Numerical Python) is the foundational library for numerical computing in Python. It provides the `ndarray` object — a fast, memory-efficient multi-dimensional array — and hundreds of mathematical functions to operate on arrays.

## Why NumPy?

Python lists are versatile but slow for numerical work. NumPy arrays store data in contiguous memory and use compiled C code under the hood, making them:

- **10-100x faster** than Python lists for mathematical operations
- **More memory efficient** because all elements share the same data type
- **Easier to use** with vectorized operations (no explicit loops needed)

## Creating Arrays

```python
import numpy as np

# From a Python list
a = np.array([1, 2, 3, 4, 5])
print(a)  # [1 2 3 4 5]

# From nested lists (2D array)
b = np.array([[1, 2, 3],
              [4, 5, 6]])
print(b)
# [[1 2 3]
#  [4 5 6]]

# Using built-in functions
zeros = np.zeros((3, 4))       # 3x4 array of zeros
ones = np.ones((2, 3))         # 2x3 array of ones
range_arr = np.arange(0, 10, 2)  # [0 2 4 6 8]
linear = np.linspace(0, 1, 5)    # [0. 0.25 0.5 0.75 1.]
```

## Array Properties

Every array has attributes that describe its structure:

```python
arr = np.array([[1, 2, 3], [4, 5, 6]])

print(arr.shape)    # (2, 3) — 2 rows, 3 columns
print(arr.ndim)     # 2 — number of dimensions
print(arr.size)     # 6 — total elements
print(arr.dtype)    # int64 — element data type
print(arr.itemsize) # 8 — bytes per element
```

## Data Types

NumPy supports many numeric types. Specify the type at creation or convert later:

```python
# Create with a specific type
float_arr = np.array([1, 2, 3], dtype='float32')
print(float_arr)  # [1. 2. 3.]

# Convert types
int_arr = float_arr.astype('int64')
print(int_arr)  # [1 2 3]

# Common dtypes: int32, int64, float32, float64, bool, str
```

## Vectorized Operations

The real power of NumPy is vectorization — performing operations on entire arrays without loops:

```python
a = np.array([1, 2, 3, 4, 5])

# No loop needed!
print(a * 2)     # [ 2  4  6  8 10]
print(a + 10)    # [11 12 13 14 15]
print(a ** 2)    # [ 1  4  9 16 25]
print(np.sqrt(a))  # [1.   1.41 1.73 2.   2.24]
```

Compare this to the equivalent Python list comprehension: `[x * 2 for x in python_list]`. The NumPy version is both shorter and significantly faster.

More resources:

-  <a href="https://github.com/ine-rmotr-curriculum/freecodecamp-intro-to-numpy" target="_blank" rel="noopener noreferrer nofollow">Notebooks on GitHub</a>
-  <a href="https://colab.research.google.com/github/googlecolab/colabtools/blob/master/notebooks/colab-github-demo.ipynb" target="_blank" rel="noopener noreferrer nofollow">How to open Notebooks from GitHub using Google Colab.</a>

---

*Based on the [freeCodeCamp Data Analysis with Python Certification](https://www.freecodecamp.org/learn/data-analysis-with-python/)*

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/data-analysis-with-python/)*
*Original Challenge ID: 5e9a093a74c4063ca6f7c152*

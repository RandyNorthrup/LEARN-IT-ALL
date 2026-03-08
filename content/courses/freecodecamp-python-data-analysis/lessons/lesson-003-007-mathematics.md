---
id: lesson-003-007
title: Mathematics
chapterId: chapter-03
order: 7
duration: 5
objectives:
  - Perform element-wise arithmetic operations on NumPy arrays
  - Use aggregation functions like sum, mean, min, max, and std
  - Apply universal functions (ufuncs) and understand broadcasting basics
---

# Mathematics

NumPy makes mathematical operations on arrays fast and intuitive. Operations are applied element-wise by default, and NumPy provides a rich set of aggregation and universal functions for more complex calculations.

## Element-wise Arithmetic

Standard arithmetic operators work element-by-element on arrays:

```python
import numpy as np

a = np.array([1, 2, 3, 4])
print(a + 2)   # [3 4 5 6]
print(a - 1)   # [0 1 2 3]
print(a * 3)   # [ 3  6  9 12]
print(a / 2)   # [0.5 1.  1.5 2. ]
print(a ** 2)  # [ 1  4  9 16]
```

You can also perform operations between two arrays of the same shape:

```python
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

print(a + b)  # [5 7 9]
print(a * b)  # [ 4 10 18]
print(b - a)  # [3 3 3]
print(b / a)  # [4.  2.5 2. ]
```

## Aggregation Functions

Aggregation functions reduce an array to a single value (or reduce along an axis):

```python
arr = np.array([[1, 2, 3],
                [4, 5, 6]])

print(np.sum(arr))       # 21 — sum of all elements
print(np.sum(arr, axis=0))  # [5 7 9] — sum along columns
print(np.sum(arr, axis=1))  # [ 6 15] — sum along rows

print(np.mean(arr))   # 3.5
print(np.min(arr))    # 1
print(np.max(arr))    # 6
print(np.std(arr))    # 1.707...
print(np.var(arr))    # 2.916...
```

The `axis` parameter is key: `axis=0` operates down the rows (column-wise), and `axis=1` operates across the columns (row-wise).

## Universal Functions (ufuncs)

NumPy provides mathematical functions that operate element-wise:

```python
a = np.array([0, np.pi/4, np.pi/2, np.pi])

# Trigonometric functions
print(np.sin(a))  # [0.000 0.707 1.000 0.000]
print(np.cos(a))  # [1.000 0.707 0.000 -1.000]

# Exponential and logarithmic
print(np.exp([1, 2, 3]))     # [ 2.718  7.389 20.086]
print(np.log([1, np.e, 100]))  # [0.000 1.000 4.605]
print(np.log10([1, 10, 100]))  # [0. 1. 2.]

# Rounding
print(np.round([1.234, 5.678], 1))  # [1.2 5.7]
print(np.floor([1.7, 2.3]))  # [1. 2.]
print(np.ceil([1.2, 2.8]))   # [2. 3.]
```

## Broadcasting Basics

Broadcasting allows NumPy to perform operations on arrays with different shapes:

```python
arr = np.array([[1, 2, 3],
                [4, 5, 6]])

# Scalar is broadcast to match array shape
print(arr + 10)
# [[11 12 13]
#  [14 15 16]]

# 1D array is broadcast across rows
row_add = np.array([10, 20, 30])
print(arr + row_add)
# [[11 22 33]
#  [14 25 36]]
```

## Useful Math Functions

```python
arr = np.array([3, -2, 5, -1, 4])

print(np.abs(arr))      # [3 2 5 1 4] — absolute values
print(np.sqrt([4, 9, 16]))  # [2. 3. 4.]
print(np.cumsum(arr))   # [ 3  1  6  5  9] — cumulative sum
print(np.cumprod([1, 2, 3, 4]))  # [ 1  2  6 24] — cumulative product
```

---

*Based on the [freeCodeCamp Data Analysis with Python Certification](https://www.freecodecamp.org/learn/data-analysis-with-python/)*

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/data-analysis-with-python/)*
*Original Challenge ID: 5e9a0a8e09c5df3cc3600ed8*

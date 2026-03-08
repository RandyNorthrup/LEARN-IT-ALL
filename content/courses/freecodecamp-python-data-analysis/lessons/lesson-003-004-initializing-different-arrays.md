---
id: lesson-003-004
title: Initializing Different Arrays
chapterId: chapter-03
order: 4
duration: 5
objectives:
  - Create arrays filled with zeros, ones, and custom values
  - Generate arrays with random numbers using various distributions
  - Use arange, linspace, and other initialization functions
---

# Initializing Different Arrays

NumPy provides many functions to create arrays with specific values or patterns. Knowing these functions saves you from manually building arrays and makes your code cleaner and more efficient.

## Arrays of Zeros and Ones

The most common initializers create arrays filled with zeros or ones:

```python
import numpy as np

# 1D array of zeros
print(np.zeros(5))  # [0. 0. 0. 0. 0.]

# 2D array of zeros (3 rows, 4 columns)
print(np.zeros((3, 4)))
# [[0. 0. 0. 0.]
#  [0. 0. 0. 0.]
#  [0. 0. 0. 0.]]

# 2D array of ones
print(np.ones((2, 3)))
# [[1. 1. 1.]
#  [1. 1. 1.]]

# Array filled with a specific value
print(np.full((2, 3), 99))
# [[99 99 99]
#  [99 99 99]]
```

## Identity and Diagonal Matrices

```python
# Identity matrix (ones on the diagonal)
print(np.eye(3))
# [[1. 0. 0.]
#  [0. 1. 0.]
#  [0. 0. 1.]]

# Diagonal matrix from a list
print(np.diag([1, 2, 3]))
# [[1 0 0]
#  [0 2 0]
#  [0 0 3]]
```

## Arrays with Sequences

```python
# arange: like Python range but returns an array
print(np.arange(0, 10, 2))  # [0 2 4 6 8]

# linspace: evenly spaced values between endpoints (inclusive)
print(np.linspace(0, 1, 5))  # [0.   0.25 0.5  0.75 1.  ]

# logspace: values spaced evenly on a log scale
print(np.logspace(0, 3, 4))  # [   1.   10.  100. 1000.]
```

## Random Arrays

NumPy's random module offers many distributions:

```python
# Uniform random values between 0 and 1
print(np.random.rand(2, 3))

# Random integers in a range
print(np.random.randint(1, 100, size=(3, 3)))

# Normal (Gaussian) distribution: mean=0, std=1
print(np.random.randn(2, 4))

# Set a seed for reproducibility
np.random.seed(42)
print(np.random.rand(3))  # Always produces the same values
```

## Creating Arrays with the Same Shape

Use the `_like` family of functions to create arrays matching another array's shape:

```python
original = np.array([[1, 2, 3], [4, 5, 6]])

print(np.zeros_like(original))  # Same shape, filled with 0
print(np.ones_like(original))   # Same shape, filled with 1
print(np.full_like(original, 7))  # Same shape, filled with 7
```

## Empty Arrays

`np.empty()` allocates memory without initializing values. It is faster than `np.zeros()` but the contents are unpredictable:

```python
arr = np.empty((2, 3))  # Values are whatever was in memory
print(arr)  # Unpredictable output
```

Use `np.empty()` only when you plan to fill every element before reading the array.

---

*Based on the [freeCodeCamp Data Analysis with Python Certification](https://www.freecodecamp.org/learn/data-analysis-with-python/)*

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/data-analysis-with-python/)*
*Original Challenge ID: 5e9a0a8e09c5df3cc3600ed5*

---
id: lesson-003-002
title: Basics of Numpy
chapterId: chapter-03
order: 2
duration: 5
objectives:
  - Create NumPy arrays from Python lists and using built-in functions
  - Understand array attributes like shape, dtype, ndim, and size
  - Perform basic array operations and type casting
---

# Basics of NumPy

The foundation of NumPy is the `ndarray` (N-dimensional array) object. Understanding how to create arrays and inspect their properties is the first step to effective numerical computing in Python.

## Creating Arrays

The most common way to create a NumPy array is from a Python list:

```python
import numpy as np

# 1D array from a list
a = np.array([1, 2, 3, 4, 5])
print(a)        # [1 2 3 4 5]
print(type(a))  # <class 'numpy.ndarray'>

# 2D array from nested lists
b = np.array([[1, 2, 3], [4, 5, 6]])
print(b)
# [[1 2 3]
#  [4 5 6]]
```

## Array Attributes

Every NumPy array has important attributes that describe its structure:

```python
arr = np.array([[1, 2, 3], [4, 5, 6]])

print(arr.ndim)   # 2 — number of dimensions
print(arr.shape)  # (2, 3) — rows x columns
print(arr.size)   # 6 — total number of elements
print(arr.dtype)  # int64 — data type of elements
print(arr.itemsize)  # 8 — bytes per element
```

## Specifying Data Types

You can control the data type when creating arrays:

```python
# Float array
float_arr = np.array([1, 2, 3], dtype='float32')
print(float_arr)  # [1. 2. 3.]

# Complex numbers
complex_arr = np.array([1, 2, 3], dtype='complex64')
print(complex_arr)  # [1.+0.j 2.+0.j 3.+0.j]

# Boolean array
bool_arr = np.array([0, 1, 0, 1], dtype='bool')
print(bool_arr)  # [False  True False  True]
```

## Built-in Array Creation Functions

NumPy provides several convenience functions for creating common arrays:

```python
# Evenly spaced values within a range
print(np.arange(0, 10, 2))  # [0 2 4 6 8]

# Evenly spaced values between two endpoints
print(np.linspace(0, 1, 5))  # [0.   0.25 0.5  0.75 1.  ]

# Zeros and ones
print(np.zeros((2, 3)))  # 2x3 array of zeros
print(np.ones((3, 2)))   # 3x2 array of ones

# Identity matrix
print(np.eye(3))  # 3x3 identity matrix

# Random values
print(np.random.rand(2, 3))     # 2x3 uniform random [0, 1)
print(np.random.randint(0, 10, size=(2, 3)))  # 2x3 random integers
```

## Type Casting

You can change the data type of an existing array with `astype()`:

```python
int_arr = np.array([1, 2, 3, 4])
float_arr = int_arr.astype('float64')
print(float_arr)  # [1. 2. 3. 4.]
```

Remember that NumPy arrays are homogeneous — every element must have the same data type. If you pass mixed types, NumPy will upcast to the most general type.

---

*Based on the [freeCodeCamp Data Analysis with Python Certification](https://www.freecodecamp.org/learn/data-analysis-with-python/)*

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/data-analysis-with-python/)*
*Original Challenge ID: 5e9a0a8e09c5df3cc3600ed3*

---
id: lesson-003-003
title: Accessing and Changing Elements, Rows, Columns
chapterId: chapter-03
order: 3
duration: 5
objectives:
  - Access individual elements in 1D and 2D arrays using indexing
  - Select rows, columns, and sub-arrays with slicing
  - Modify array elements, rows, and columns in place
---

# Accessing and Changing Elements, Rows, Columns

NumPy arrays support powerful indexing and slicing syntax that lets you read and modify any part of an array. Understanding these operations is essential for data manipulation.

## Accessing Elements in 1D Arrays

Indexing works just like Python lists — zero-based, with negative indices counting from the end:

```python
import numpy as np

a = np.array([10, 20, 30, 40, 50])
print(a[0])    # 10 — first element
print(a[-1])   # 50 — last element
print(a[2])    # 30 — third element
```

## Accessing Elements in 2D Arrays

For 2D arrays, provide both the row and column index separated by a comma:

```python
arr = np.array([[1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12]])

print(arr[0, 0])   # 1 — row 0, col 0
print(arr[1, 2])   # 7 — row 1, col 2
print(arr[2, -1])  # 12 — row 2, last col
```

## Slicing Rows and Columns

Use the `start:stop:step` syntax to select ranges. Omitting a value uses the default (start=0, stop=end, step=1):

```python
arr = np.array([[1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12]])

# Get a specific row
print(arr[0, :])    # [1 2 3 4] — entire first row

# Get a specific column
print(arr[:, 1])    # [ 2  6 10] — entire second column

# Get a sub-matrix (rows 0-1, cols 1-3)
print(arr[0:2, 1:3])
# [[2 3]
#  [6 7]]

# Every other element in a row
print(arr[1, ::2])  # [5 7]
```

## Modifying Elements

You can assign new values to individual elements or entire slices:

```python
arr = np.array([[1, 2, 3],
                [4, 5, 6],
                [7, 8, 9]])

# Change a single element
arr[0, 0] = 100

# Change an entire row
arr[1, :] = [40, 50, 60]

# Change an entire column
arr[:, 2] = [30, 60, 90]

print(arr)
# [[100   2  30]
#  [ 40  50  60]
#  [  7   8  90]]
```

## Fancy Indexing

You can use a list of indices to select specific elements:

```python
a = np.array([10, 20, 30, 40, 50])
print(a[[0, 2, 4]])  # [10 30 50]
```

## Important Note: Views vs Copies

Slicing a NumPy array returns a **view**, not a copy. Modifying the slice will modify the original array. Use `.copy()` when you need an independent copy.

---

*Based on the [freeCodeCamp Data Analysis with Python Certification](https://www.freecodecamp.org/learn/data-analysis-with-python/)*

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/data-analysis-with-python/)*
*Original Challenge ID: 5e9a0a8e09c5df3cc3600ed4*

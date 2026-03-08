---
id: lesson-001-009
title: Numpy Arrays
chapterId: chapter-01
order: 9
duration: 5
objectives:
  - Create and manipulate 1D, 2D, and 3D NumPy arrays
  - Access elements using indexing and slicing
  - Understand how array shape and dimensions work
---

# Numpy Arrays

The NumPy array (`ndarray`) is the central data structure in NumPy. This lesson covers creating arrays of different dimensions, accessing elements through indexing and slicing, and understanding how shape works.

## 1D Arrays (Vectors)

A 1D array is a simple sequence of values:

```python
import numpy as np

a = np.array([10, 20, 30, 40, 50])
print(a[0])     # 10 — first element
print(a[-1])    # 50 — last element
print(a[1:4])   # [20 30 40] — slice from index 1 to 3
print(a[::2])   # [10 30 50] — every other element
```

## 2D Arrays (Matrices)

A 2D array has rows and columns, like a spreadsheet or matrix:

```python
matrix = np.array([[1, 2, 3],
                   [4, 5, 6],
                   [7, 8, 9]])

print(matrix.shape)  # (3, 3)
print(matrix[0, 0])  # 1 — row 0, col 0
print(matrix[1, :])  # [4 5 6] — entire second row
print(matrix[:, 2])  # [3 6 9] — entire third column
print(matrix[0:2, 1:3])  # Sub-matrix
# [[2 3]
#  [5 6]]
```

## 3D Arrays (Tensors)

A 3D array is a stack of 2D arrays. Think of it as multiple matrices:

```python
tensor = np.array([[[1, 2], [3, 4]],
                   [[5, 6], [7, 8]]])

print(tensor.shape)   # (2, 2, 2)
print(tensor.ndim)    # 3
print(tensor[0])      # First 2D slice: [[1 2] [3 4]]
print(tensor[1, 0, 1])  # 6
```

## Reshaping Arrays

Change the shape without changing the data (total elements must match):

```python
a = np.arange(12)     # [ 0  1  2 ... 11]
print(a.reshape(3, 4))
# [[ 0  1  2  3]
#  [ 4  5  6  7]
#  [ 8  9 10 11]]

print(a.reshape(2, 2, 3))  # 3D: two 2x3 matrices

# Use -1 to auto-calculate one dimension
print(a.reshape(-1, 4))   # (3, 4)
print(a.reshape(3, -1))   # (3, 4)
```

## Modifying Arrays

Assign new values to elements or slices:

```python
arr = np.zeros((3, 3), dtype='int32')
arr[0, :] = [1, 2, 3]     # Set first row
arr[:, -1] = [10, 20, 30]  # Set last column
arr[1, 1] = 99             # Set single element
print(arr)
# [[ 1  2 10]
#  [ 0 99 20]
#  [ 0  0 30]]
```

## Array Concatenation

Combine multiple arrays:

```python
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

# Stack vertically
print(np.vstack([a, b]))  # [[1 2 3] [4 5 6]]

# Stack horizontally
print(np.hstack([a, b]))  # [1 2 3 4 5 6]
```

More resources:

-  <a href="https://github.com/ine-rmotr-curriculum/freecodecamp-intro-to-numpy" target="_blank" rel="noopener noreferrer nofollow">Notebooks on GitHub</a>
-  <a href="https://colab.research.google.com/github/googlecolab/colabtools/blob/master/notebooks/colab-github-demo.ipynb" target="_blank" rel="noopener noreferrer nofollow">How to open Notebooks from GitHub using Google Colab.</a>

---

*Based on the [freeCodeCamp Data Analysis with Python Certification](https://www.freecodecamp.org/learn/data-analysis-with-python/)*

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/data-analysis-with-python/)*
*Original Challenge ID: 5e9a093a74c4063ca6f7c154*

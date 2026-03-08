---
id: lesson-003-008
title: Reorganizing Arrays
chapterId: chapter-03
order: 8
duration: 5
objectives:
  - Reshape arrays without changing their data using reshape and resize
  - Stack and concatenate arrays vertically and horizontally
  - Flatten and ravel multi-dimensional arrays into 1D
---

# Reorganizing Arrays

Reorganizing arrays — changing their shape, combining them, or splitting them — is a routine part of data manipulation. NumPy provides several functions for reshaping and restructuring arrays without altering the underlying data.

## Reshaping Arrays

The `reshape()` method changes the shape of an array without modifying its data. The total number of elements must remain the same:

```python
import numpy as np

arr = np.array([1, 2, 3, 4, 5, 6])

# Reshape 1D (6,) to 2D (2, 3)
reshaped = arr.reshape(2, 3)
print(reshaped)
# [[1 2 3]
#  [4 5 6]]

# Reshape to (3, 2)
print(arr.reshape(3, 2))
# [[1 2]
#  [3 4]
#  [5 6]]

# Use -1 to let NumPy infer one dimension
print(arr.reshape(2, -1))  # (2, 3) — NumPy calculates 3
print(arr.reshape(-1, 1))  # (6, 1) — column vector
```

## Flattening Arrays

Convert a multi-dimensional array back to 1D:

```python
arr = np.array([[1, 2, 3], [4, 5, 6]])

# flatten() returns a copy
flat = arr.flatten()
print(flat)  # [1 2 3 4 5 6]

# ravel() returns a view (more memory efficient)
raveled = arr.ravel()
print(raveled)  # [1 2 3 4 5 6]
```

Prefer `ravel()` when you do not need to modify the result independently of the original.

## Stacking Arrays

Combine multiple arrays into one:

```python
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

# Vertical stack (row-wise)
print(np.vstack([a, b]))
# [[1 2 3]
#  [4 5 6]]

# Horizontal stack (column-wise)
print(np.hstack([a, b]))  # [1 2 3 4 5 6]

# For 2D arrays
x = np.array([[1, 2], [3, 4]])
y = np.array([[5, 6], [7, 8]])

print(np.vstack([x, y]))
# [[1 2]
#  [3 4]
#  [5 6]
#  [7 8]]

print(np.hstack([x, y]))
# [[1 2 5 6]
#  [3 4 7 8]]
```

## Concatenation

`np.concatenate()` joins arrays along an existing axis:

```python
a = np.array([[1, 2], [3, 4]])
b = np.array([[5, 6]])

# Concatenate along axis 0 (rows)
print(np.concatenate([a, b], axis=0))
# [[1 2]
#  [3 4]
#  [5 6]]

# Concatenate along axis 1 (columns)
c = np.array([[5], [6]])
print(np.concatenate([a, c], axis=1))
# [[1 2 5]
#  [3 4 6]]
```

## Splitting Arrays

The inverse of stacking — divide an array into smaller arrays:

```python
arr = np.array([[1, 2, 3, 4],
                [5, 6, 7, 8]])

# Split into 2 equal parts along columns
left, right = np.hsplit(arr, 2)
print(left)   # [[1 2] [5 6]]
print(right)  # [[3 4] [7 8]]

# Split into specific column positions
first, second, third = np.hsplit(arr, [1, 3])
print(first)   # [[1] [5]]
print(second)  # [[2 3] [6 7]]
print(third)   # [[4] [8]]
```

---

*Based on the [freeCodeCamp Data Analysis with Python Certification](https://www.freecodecamp.org/learn/data-analysis-with-python/)*

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/data-analysis-with-python/)*
*Original Challenge ID: 5e9a0a8e09c5df3cc3600ed9*

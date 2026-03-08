---
id: lesson-003-009
title: Loading Data and Advanced Indexing
chapterId: chapter-03
order: 9
duration: 5
objectives:
  - Load data from text and CSV files into NumPy arrays
  - Use boolean indexing to filter arrays based on conditions
  - Apply advanced indexing techniques for complex data selection
---

# Loading Data and Advanced Indexing

In real-world data analysis, you rarely type array values by hand. NumPy provides functions to load data from files, and advanced indexing techniques let you extract exactly the data you need.

## Loading Data from Files

The most common file-loading functions are `np.loadtxt()` and `np.genfromtxt()`:

```python
import numpy as np

# Load a simple CSV/text file
# Suppose data.txt contains:
# 1,2,3
# 4,5,6
# 7,8,9
data = np.loadtxt('data.txt', delimiter=',')
print(data)
# [[1. 2. 3.]
#  [4. 5. 6.]
#  [7. 8. 9.]]

# genfromtxt handles missing values
data = np.genfromtxt('data.txt', delimiter=',',
                     filling_values=0)  # Replace missing with 0
```

You can also specify which columns to load and skip header rows:

```python
# Load only columns 0 and 2, skip first row
data = np.loadtxt('data.csv', delimiter=',',
                  usecols=(0, 2), skiprows=1)
```

## Saving Data

```python
arr = np.array([[1, 2, 3], [4, 5, 6]])

# Save as text
np.savetxt('output.csv', arr, delimiter=',', fmt='%d')

# Save in NumPy binary format (faster for large arrays)
np.save('output.npy', arr)
loaded = np.load('output.npy')
```

## Boolean Indexing

Boolean indexing uses True/False arrays to select elements that meet a condition:

```python
arr = np.array([10, 25, 30, 45, 50, 65, 70])

# Create a boolean mask
mask = arr > 40
print(mask)  # [False False False  True  True  True  True]

# Apply the mask to select elements
print(arr[mask])  # [45 50 65 70]

# Combine conditions with & (and), | (or), ~ (not)
print(arr[(arr > 20) & (arr < 60)])  # [25 30 45 50]
print(arr[~(arr > 40)])  # [10 25 30]
```

## Fancy Indexing with Integer Arrays

Pass an array of indices to select specific elements in any order:

```python
arr = np.array([10, 20, 30, 40, 50])
indices = np.array([0, 3, 4])
print(arr[indices])  # [10 40 50]

# Works with 2D arrays too
arr2d = np.array([[1, 2], [3, 4], [5, 6], [7, 8]])
print(arr2d[[0, 2, 3]])  # Select rows 0, 2, and 3
# [[1 2]
#  [5 6]
#  [7 8]]
```

## np.where for Conditional Selection

`np.where()` returns indices where a condition is true, or creates a new array by choosing values:

```python
arr = np.array([1, 2, 3, 4, 5])

# Get indices where condition is true
indices = np.where(arr > 3)
print(indices)     # (array([3, 4]),)
print(arr[indices])  # [4 5]

# Choose between two values based on condition
result = np.where(arr > 3, 'big', 'small')
print(result)  # ['small' 'small' 'small' 'big' 'big']
```

## np.argmin, np.argmax, np.argsort

These functions return indices rather than values:

```python
arr = np.array([30, 10, 50, 20, 40])

print(np.argmin(arr))   # 1 — index of minimum value (10)
print(np.argmax(arr))   # 2 — index of maximum value (50)
print(np.argsort(arr))  # [1 3 0 4 2] — indices that would sort the array
```

---

*Based on the [freeCodeCamp Data Analysis with Python Certification](https://www.freecodecamp.org/learn/data-analysis-with-python/)*

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/data-analysis-with-python/)*
*Original Challenge ID: 5e9a0a8e09c5df3cc3600eda*

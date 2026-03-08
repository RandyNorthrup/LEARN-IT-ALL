---
id: lesson-001-008
title: Numpy Introduction B
chapterId: chapter-01
order: 8
duration: 5
objectives:
  - Use NumPy aggregation functions for statistical analysis
  - Understand broadcasting rules for operations on different-shaped arrays
  - Apply random number generation for simulations and sampling
---

# Numpy Introduction B

This lesson continues the NumPy introduction, covering aggregation functions, broadcasting, and random number generation — three capabilities that make NumPy indispensable for data analysis.

## Aggregation Functions

Aggregation functions reduce an array (or an axis of an array) to a single value:

```python
import numpy as np

arr = np.array([[1, 2, 3],
                [4, 5, 6],
                [7, 8, 9]])

# Global aggregations
print(np.sum(arr))    # 45
print(np.mean(arr))   # 5.0
print(np.std(arr))    # 2.581...
print(np.min(arr))    # 1
print(np.max(arr))    # 9

# Aggregation along an axis
print(np.sum(arr, axis=0))  # [12 15 18] — sum of each column
print(np.sum(arr, axis=1))  # [ 6 15 24] — sum of each row
print(np.mean(arr, axis=0))  # [4. 5. 6.] — mean of each column
```

The `axis` parameter is crucial: `axis=0` operates **down** rows (column-wise), `axis=1` operates **across** columns (row-wise).

## Broadcasting

Broadcasting is NumPy's mechanism for performing operations on arrays with different shapes. Instead of requiring arrays to be the same size, NumPy "stretches" smaller arrays to match:

```python
# Scalar broadcast: adds 10 to every element
arr = np.array([[1, 2, 3], [4, 5, 6]])
print(arr + 10)
# [[11 12 13]
#  [14 15 16]]

# 1D array broadcast across rows
row = np.array([100, 200, 300])
print(arr + row)
# [[101 202 303]
#  [104 205 306]]

# Column vector broadcast across columns
col = np.array([[10], [20]])
print(arr + col)
# [[11 12 13]
#  [24 25 26]]
```

### Broadcasting Rules

1. If arrays have different numbers of dimensions, the shape of the smaller array is padded with ones on the left
2. Arrays with size 1 along a dimension are stretched to match the other array
3. If sizes disagree and neither is 1, broadcasting raises an error

## Random Number Generation

NumPy's random module is essential for sampling, simulations, and generating test data:

```python
# Set seed for reproducibility
np.random.seed(42)

# Uniform random values in [0, 1)
print(np.random.rand(3))     # [0.374 0.950 0.731]

# Random integers
print(np.random.randint(1, 7, size=10))  # Simulate 10 dice rolls

# Normal (Gaussian) distribution
print(np.random.randn(5))  # Mean=0, std=1

# Random choice from an array
colors = ['red', 'blue', 'green']
print(np.random.choice(colors, size=5))

# Shuffle an array in place
arr = np.arange(10)
np.random.shuffle(arr)
print(arr)
```

## Practical Example: Simulating Coin Flips

```python
np.random.seed(0)
flips = np.random.randint(0, 2, size=10000)  # 0=tails, 1=heads
print(f"Heads: {np.sum(flips)}, Tails: {10000 - np.sum(flips)}")
print(f"Proportion heads: {np.mean(flips):.4f}")  # ~0.5
```

More resources:

-  <a href="https://github.com/ine-rmotr-curriculum/freecodecamp-intro-to-numpy" target="_blank" rel="noopener noreferrer nofollow">Notebooks on GitHub</a>
-  <a href="https://colab.research.google.com/github/googlecolab/colabtools/blob/master/notebooks/colab-github-demo.ipynb" target="_blank" rel="noopener noreferrer nofollow">How to open Notebooks from GitHub using Google Colab.</a>

---

*Based on the [freeCodeCamp Data Analysis with Python Certification](https://www.freecodecamp.org/learn/data-analysis-with-python/)*

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/data-analysis-with-python/)*
*Original Challenge ID: 5e9a093a74c4063ca6f7c153*

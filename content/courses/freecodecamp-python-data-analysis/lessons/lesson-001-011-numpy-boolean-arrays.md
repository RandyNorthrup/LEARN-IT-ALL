---
id: lesson-001-011
title: Numpy Boolean Arrays
chapterId: chapter-01
order: 11
duration: 5
objectives:
  - Create boolean arrays using comparison operators
  - Use boolean indexing to filter array data based on conditions
  - Combine multiple conditions using logical operators
---

# Numpy Boolean Arrays

Boolean arrays are one of NumPy's most useful features. They let you filter data based on conditions without writing explicit loops, making data selection concise and fast.

## Creating Boolean Arrays

Any comparison operation on a NumPy array produces a boolean array:

```python
import numpy as np

temperatures = np.array([72, 85, 90, 68, 95, 78, 88, 65, 92])

hot_days = temperatures > 85
print(hot_days)
# [False False  True False  True False  True False  True]
```

## Boolean Indexing (Filtering)

Use a boolean array as an index to select elements where the condition is True:

```python
# Select only hot days
print(temperatures[hot_days])  # [90 95 88 92]

# Or do it in one step
print(temperatures[temperatures > 85])  # [90 95 88 92]

# Count how many hot days
print(np.sum(temperatures > 85))  # 4 (True counts as 1)
```

## Combining Conditions

Use `&` (and), `|` (or), and `~` (not) for compound conditions. **Parentheses are required** around each condition:

```python
temps = np.array([72, 85, 90, 68, 95, 78, 88, 65, 92])

# Temperatures between 75 and 90
comfortable = (temps >= 75) & (temps <= 90)
print(temps[comfortable])  # [85 90 78 88]

# Either very hot or very cold
extreme = (temps > 90) | (temps < 70)
print(temps[extreme])  # [68 95 65 92]

# NOT hot (inverse a condition)
print(temps[~(temps > 85)])  # [72 85 68 78 65]
```

## np.where: Conditional Selection

`np.where()` returns indices or values based on a condition:

```python
arr = np.array([10, 20, 30, 40, 50])

# Get indices where condition is true
indices = np.where(arr > 25)
print(indices)       # (array([2, 3, 4]),)
print(arr[indices])  # [30 40 50]

# Create a new array with conditional values
result = np.where(arr > 25, 'high', 'low')
print(result)  # ['low' 'low' 'high' 'high' 'high']

# Replace values conditionally
capped = np.where(arr > 30, 30, arr)
print(capped)  # [10 20 30 30 30]
```

## Boolean Functions

```python
arr = np.array([True, True, False, True])

print(np.all(arr))   # False — not all are True
print(np.any(arr))   # True — at least one is True

# Practical example: check if all values are positive
data = np.array([1, 5, 3, -2, 8])
print(np.all(data > 0))  # False
print(np.any(data < 0))  # True
```

## Practical Example: Exam Scores

```python
scores = np.array([65, 78, 92, 55, 88, 73, 60, 95, 82, 48])

passing = scores >= 60
print(f"Passing students: {np.sum(passing)}")  # 8
print(f"Fail rate: {np.mean(~passing):.0%}")   # 20%
print(f"Average passing score: {np.mean(scores[passing]):.1f}")  # 79.1
print(f"Highest failing score: {np.max(scores[~passing])}")  # 55
```

More resources:

-  <a href="https://github.com/ine-rmotr-curriculum/freecodecamp-intro-to-numpy" target="_blank" rel="noopener noreferrer nofollow">Notebooks on GitHub</a>
-  <a href="https://colab.research.google.com/github/googlecolab/colabtools/blob/master/notebooks/colab-github-demo.ipynb" target="_blank" rel="noopener noreferrer nofollow">How to open Notebooks from GitHub using Google Colab.</a>

---

*Based on the [freeCodeCamp Data Analysis with Python Certification](https://www.freecodecamp.org/learn/data-analysis-with-python/)*

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/data-analysis-with-python/)*
*Original Challenge ID: 5e9a093a74c4063ca6f7c156*

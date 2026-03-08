---
id: lesson-001-016
title: Pandas Conditional Selection and Modifying DataFrames
chapterId: chapter-01
order: 16
duration: 5
objectives:
  - Apply conditional logic to modify DataFrame values
  - Use apply and map to transform data in columns
  - Perform groupby operations for aggregated analysis
---

# Pandas Conditional Selection and Modifying DataFrames

Beyond simple filtering, Pandas lets you modify DataFrames based on conditions, apply transformations to columns, and aggregate data with groupby. These techniques form the backbone of data analysis workflows.

## Conditional Modification

Update values based on conditions using `loc`:

```python
import pandas as pd

df = pd.DataFrame({
    'name': ['Alice', 'Bob', 'Charlie', 'Diana'],
    'score': [85, 42, 91, 67],
    'grade': ['', '', '', '']
})

# Set grade based on score
df.loc[df['score'] >= 70, 'grade'] = 'Pass'
df.loc[df['score'] < 70, 'grade'] = 'Fail'
print(df)
#       name  score grade
# 0    Alice     85  Pass
# 1      Bob     42  Fail
# 2  Charlie     91  Pass
# 3    Diana     67  Fail
```

## np.where for Conditional Columns

For simple if/else logic, `np.where` is concise:

```python
import numpy as np

df['status'] = np.where(df['score'] >= 70, 'Pass', 'Fail')
```

## The apply Method

`apply()` runs a function on every value in a column or row:

```python
# Apply to a column
df['score_doubled'] = df['score'].apply(lambda x: x * 2)

# Custom function
def letter_grade(score):
    if score >= 90: return 'A'
    elif score >= 80: return 'B'
    elif score >= 70: return 'C'
    elif score >= 60: return 'D'
    else: return 'F'

df['letter'] = df['score'].apply(letter_grade)
print(df[['name', 'score', 'letter']])
```

## The map Method

`map()` replaces values using a dictionary or function:

```python
# Map with a dictionary
grade_points = {'A': 4.0, 'B': 3.0, 'C': 2.0, 'D': 1.0, 'F': 0.0}
df['gpa'] = df['letter'].map(grade_points)
```

## GroupBy: Split-Apply-Combine

`groupby()` is one of the most powerful Pandas features. It splits data into groups, applies a function, and combines results:

```python
df = pd.DataFrame({
    'department': ['Sales', 'Sales', 'Engineering', 'Engineering', 'HR'],
    'employee': ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'],
    'salary': [50000, 55000, 80000, 75000, 60000]
})

# Average salary by department
print(df.groupby('department')['salary'].mean())
# department
# Engineering    77500.0
# HR             60000.0
# Sales          52500.0

# Multiple aggregations
print(df.groupby('department')['salary'].agg(['mean', 'min', 'max', 'count']))
```

## Replace and Update

```python
# Replace specific values
df['department'] = df['department'].replace('HR', 'Human Resources')

# Replace multiple values
df['department'] = df['department'].replace({
    'Sales': 'Sales & Marketing',
    'Engineering': 'Tech'
})
```

More resources:

-  <a href="https://github.com/ine-rmotr-curriculum/freecodecamp-intro-to-pandas" target="_blank" rel="noopener noreferrer nofollow">Notebooks on GitHub</a>
-  <a href="https://colab.research.google.com/github/googlecolab/colabtools/blob/master/notebooks/colab-github-demo.ipynb" target="_blank" rel="noopener noreferrer nofollow">How to open Notebooks from GitHub using Google Colab.</a>

---

*Based on the [freeCodeCamp Data Analysis with Python Certification](https://www.freecodecamp.org/learn/data-analysis-with-python/)*

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/data-analysis-with-python/)*
*Original Challenge ID: 5e9a093a74c4063ca6f7c15b*

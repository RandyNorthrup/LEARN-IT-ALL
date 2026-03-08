---
id: lesson-001-015
title: Pandas DataFrames
chapterId: chapter-01
order: 15
duration: 5
objectives:
  - Create DataFrames from dictionaries, lists, and NumPy arrays
  - Understand DataFrame structure including index, columns, and values
  - Use sorting, renaming, and basic DataFrame manipulation methods
---

# Pandas DataFrames

The DataFrame is the primary data structure in Pandas. It represents a table with rows and columns, similar to a spreadsheet, SQL table, or R data frame. This lesson dives deeper into creating, inspecting, and manipulating DataFrames.

## Creating DataFrames

### From a Dictionary

```python
import pandas as pd

data = {
    'product': ['Widget', 'Gadget', 'Doohickey'],
    'price': [9.99, 24.99, 4.99],
    'quantity': [100, 50, 200]
}
df = pd.DataFrame(data)
print(df)
#     product  price  quantity
# 0    Widget   9.99       100
# 1    Gadget  24.99        50
# 2  Doohickey   4.99       200
```

### From a List of Dictionaries

```python
records = [
    {'name': 'Alice', 'score': 85},
    {'name': 'Bob', 'score': 92},
    {'name': 'Charlie', 'score': 78}
]
df = pd.DataFrame(records)
```

### From a NumPy Array

```python
import numpy as np

arr = np.random.randint(0, 100, size=(4, 3))
df = pd.DataFrame(arr, columns=['Math', 'Science', 'English'],
                  index=['Student_1', 'Student_2', 'Student_3', 'Student_4'])
print(df)
```

## DataFrame Structure

```python
print(df.index)    # Row labels
print(df.columns)  # Column names
print(df.values)   # Underlying 2D NumPy array
print(df.shape)    # (rows, columns)
print(df.dtypes)   # Data type per column
```

## Sorting

```python
df = pd.DataFrame({
    'name': ['Charlie', 'Alice', 'Bob'],
    'age': [35, 25, 30],
    'salary': [70000, 50000, 60000]
})

# Sort by a column
print(df.sort_values('age'))
print(df.sort_values('salary', ascending=False))

# Sort by multiple columns
print(df.sort_values(['age', 'salary'], ascending=[True, False]))

# Sort by index
print(df.sort_index())
```

## Renaming

```python
# Rename columns
df = df.rename(columns={'name': 'employee', 'age': 'years'})

# Rename index values
df = df.rename(index={0: 'first', 1: 'second', 2: 'third'})
```

## Adding and Removing Columns

```python
# Add a new column
df['bonus'] = df['salary'] * 0.1

# Remove a column
df = df.drop(columns=['bonus'])

# Remove rows
df = df.drop(index=[0, 2])  # Drop rows by index
```

## Setting and Resetting the Index

```python
# Use a column as the index
df = df.set_index('employee')
print(df.loc['Alice'])

# Reset back to numeric index
df = df.reset_index()
```

## Copying DataFrames

Like NumPy, assignment creates a reference, not a copy:

```python
df2 = df           # Reference — changes affect df too
df3 = df.copy()    # Independent copy
```

More resources:

-  <a href="https://github.com/ine-rmotr-curriculum/freecodecamp-intro-to-pandas" target="_blank" rel="noopener noreferrer nofollow">Notebooks on GitHub</a>
-  <a href="https://colab.research.google.com/github/googlecolab/colabtools/blob/master/notebooks/colab-github-demo.ipynb" target="_blank" rel="noopener noreferrer nofollow">How to open Notebooks from GitHub using Google Colab.</a>

---

*Based on the [freeCodeCamp Data Analysis with Python Certification](https://www.freecodecamp.org/learn/data-analysis-with-python/)*

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/data-analysis-with-python/)*
*Original Challenge ID: 5e9a093a74c4063ca6f7c15a*

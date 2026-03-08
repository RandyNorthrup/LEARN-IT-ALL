---
id: lesson-001-013
title: Pandas Introduction
chapterId: chapter-01
order: 13
duration: 5
objectives:
  - Understand what Pandas is and its role in data analysis
  - Create and inspect Series and DataFrame objects
  - Load data from CSV files and explore it with basic methods
---

# Pandas Introduction

Pandas is the most important Python library for data analysis. Built on top of NumPy, it provides two key data structures — `Series` and `DataFrame` — that make working with structured data intuitive and powerful.

## Why Pandas?

While NumPy handles numerical arrays, Pandas handles **tabular data** — the kind you see in spreadsheets, databases, and CSV files. Pandas adds:

- **Labeled axes** — Rows and columns have names, not just numbers
- **Mixed data types** — A DataFrame can have integer, float, and string columns
- **Missing data handling** — Built-in support for NaN values
- **Rich I/O** — Read from CSV, Excel, JSON, SQL, HTML, and more

## Series: 1D Labeled Data

A `Series` is a one-dimensional labeled array:

```python
import pandas as pd

# Create from a list
s = pd.Series([10, 20, 30, 40], index=['a', 'b', 'c', 'd'])
print(s)
# a    10
# b    20
# c    30
# d    40

# Access by label or position
print(s['b'])    # 20
print(s[1])      # 20
print(s.values)  # [10 20 30 40] — underlying NumPy array
```

## DataFrame: 2D Labeled Data

A `DataFrame` is a table with labeled rows and columns:

```python
data = {
    'name': ['Alice', 'Bob', 'Charlie', 'Diana'],
    'age': [25, 30, 35, 28],
    'city': ['NYC', 'LA', 'Chicago', 'NYC']
}
df = pd.DataFrame(data)
print(df)
#       name  age     city
# 0    Alice   25      NYC
# 1      Bob   30       LA
# 2  Charlie   35  Chicago
# 3    Diana   28      NYC
```

## Loading Data from CSV

In practice, you will load data from files rather than typing it:

```python
df = pd.read_csv('data.csv')

# First 5 rows
print(df.head())

# Last 5 rows
print(df.tail())

# Shape, columns, and types
print(df.shape)    # (rows, columns)
print(df.columns)  # Column names
print(df.dtypes)   # Data type per column
print(df.info())   # Concise summary
```

## Descriptive Statistics

```python
# Numeric columns: count, mean, std, min, quartiles, max
print(df.describe())

# Categorical columns
print(df.describe(include='object'))

# Individual statistics
print(df['age'].mean())    # Average
print(df['age'].median())  # Median
print(df['city'].value_counts())  # Frequency table
```

## Selecting Columns

```python
# Single column (returns a Series)
print(df['name'])

# Multiple columns (returns a DataFrame)
print(df[['name', 'age']])
```

Pandas is designed to make data manipulation feel as natural as working with a spreadsheet. As you progress through these lessons, you will see how powerful it becomes for real-world analysis.

More resources:

-  <a href="https://github.com/ine-rmotr-curriculum/freecodecamp-intro-to-pandas" target="_blank" rel="noopener noreferrer nofollow">Notebooks on GitHub</a>
-  <a href="https://colab.research.google.com/github/googlecolab/colabtools/blob/master/notebooks/colab-github-demo.ipynb" target="_blank" rel="noopener noreferrer nofollow">How to open Notebooks from GitHub using Google Colab.</a>

---

*Based on the [freeCodeCamp Data Analysis with Python Certification](https://www.freecodecamp.org/learn/data-analysis-with-python/)*

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/data-analysis-with-python/)*
*Original Challenge ID: 5e9a093a74c4063ca6f7c158*

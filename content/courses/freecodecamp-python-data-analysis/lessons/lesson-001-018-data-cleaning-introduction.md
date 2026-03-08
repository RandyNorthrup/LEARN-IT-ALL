---
id: lesson-001-018
title: Data Cleaning Introduction
chapterId: chapter-01
order: 18
duration: 5
objectives:
  - Understand why data cleaning is essential for reliable analysis
  - Identify common data quality issues in real-world datasets
  - Use Pandas methods to detect and handle missing values
---

# Data Cleaning Introduction

Data cleaning (also called data wrangling or data munging) is the process of finding and fixing problems in your data. In practice, data analysts spend 60-80% of their time on cleaning — it is the most important and most time-consuming step in any analysis.

## Why Data Cleaning Matters

Raw data from the real world is almost never ready for analysis. Common problems include:

- **Missing values** — Blank cells, NaN, None, or placeholder values like -1 or 999
- **Incorrect data types** — Numbers stored as strings, dates as text
- **Inconsistent formatting** — "New York", "new york", "NY" all meaning the same thing
- **Duplicates** — The same record appears multiple times
- **Outliers** — Extreme values that may be errors or genuine anomalies
- **Structural issues** — Merged columns, extra whitespace, encoding problems

If you skip cleaning, your analysis results will be unreliable.

## Detecting Missing Values

Pandas represents missing values as `NaN` (Not a Number):

```python
import pandas as pd
import numpy as np

df = pd.DataFrame({
    'name': ['Alice', 'Bob', None, 'Diana'],
    'age': [25, np.nan, 35, 28],
    'salary': [50000, 60000, np.nan, np.nan]
})

# Check for missing values
print(df.isnull())       # Boolean mask of NaN values
print(df.isnull().sum())  # Count NaNs per column
print(df.isnull().sum().sum())  # Total NaN count

# Percentage of missing values
print((df.isnull().sum() / len(df) * 100).round(1))
```

## Handling Missing Values

### Drop rows or columns with missing values:

```python
# Drop rows with any NaN
df_clean = df.dropna()

# Drop rows where specific columns are NaN
df_clean = df.dropna(subset=['name', 'age'])

# Drop columns with any NaN
df_clean = df.dropna(axis=1)

# Drop only if ALL values in the row are NaN
df_clean = df.dropna(how='all')
```

### Fill missing values:

```python
# Fill with a constant
df['salary'] = df['salary'].fillna(0)

# Fill with the mean
df['age'] = df['age'].fillna(df['age'].mean())

# Fill with the median (more robust to outliers)
df['salary'] = df['salary'].fillna(df['salary'].median())

# Forward fill (use previous value)
df['age'] = df['age'].ffill()

# Backward fill (use next value)
df['age'] = df['age'].bfill()
```

## Checking Data Types

```python
print(df.dtypes)

# Convert types
df['age'] = df['age'].astype('int64')  # Float to int (no NaNs!)
df['date'] = pd.to_datetime(df['date'])  # String to datetime
df['price'] = pd.to_numeric(df['price'], errors='coerce')  # Force to numeric
```

Data cleaning is not glamorous, but it is the foundation of every trustworthy analysis. The techniques in this lesson and the next few will ensure your data is reliable before you draw any conclusions.

More resources:

-  <a href="https://github.com/ine-rmotr-curriculum/data-cleaning-rmotr-freecodecamp" target="_blank" rel="noopener noreferrer nofollow">Notebooks on GitHub</a>
-  <a href="https://colab.research.google.com/github/googlecolab/colabtools/blob/master/notebooks/colab-github-demo.ipynb" target="_blank" rel="noopener noreferrer nofollow">How to open Notebooks from GitHub using Google Colab.</a>

---

*Based on the [freeCodeCamp Data Analysis with Python Certification](https://www.freecodecamp.org/learn/data-analysis-with-python/)*

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/data-analysis-with-python/)*
*Original Challenge ID: 5e9a093a74c4063ca6f7c15d*

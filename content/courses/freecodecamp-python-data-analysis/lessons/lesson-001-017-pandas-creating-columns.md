---
id: lesson-001-017
title: Pandas Creating Columns
chapterId: chapter-01
order: 17
duration: 5
objectives:
  - Create new DataFrame columns from calculations on existing columns
  - Use string methods and datetime operations to generate derived columns
  - Apply functions to create custom computed columns
---

# Pandas Creating Columns

Creating new columns from existing data is a core data analysis task. Whether you are computing totals, extracting date parts, or categorizing values, Pandas makes column creation straightforward.

## Basic Column Creation

Create a new column by assigning values:

```python
import pandas as pd
import numpy as np

df = pd.DataFrame({
    'product': ['Widget', 'Gadget', 'Doohickey'],
    'price': [10.00, 25.00, 5.00],
    'quantity': [100, 50, 200]
})

# Calculated column from other columns
df['revenue'] = df['price'] * df['quantity']

# Column with a constant value
df['currency'] = 'USD'

# Column from a NumPy operation
df['log_price'] = np.log(df['price'])

print(df)
```

## Arithmetic Between Columns

```python
df = pd.DataFrame({
    'revenue': [1000, 2000, 1500],
    'cost': [600, 1200, 800]
})

df['profit'] = df['revenue'] - df['cost']
df['margin_pct'] = (df['profit'] / df['revenue'] * 100).round(1)
df['roi'] = (df['profit'] / df['cost'] * 100).round(1)
print(df)
```

## String Operations

The `.str` accessor provides vectorized string operations:

```python
df = pd.DataFrame({
    'full_name': ['Alice Smith', 'Bob Jones', 'Charlie Brown']
})

df['first_name'] = df['full_name'].str.split(' ').str[0]
df['last_name'] = df['full_name'].str.split(' ').str[1]
df['initials'] = df['first_name'].str[0] + df['last_name'].str[0]
df['name_upper'] = df['full_name'].str.upper()
df['name_length'] = df['full_name'].str.len()
print(df)
```

## DateTime Operations

Extract parts from datetime columns:

```python
df = pd.DataFrame({
    'date': pd.to_datetime(['2024-01-15', '2024-03-22', '2024-07-04'])
})

df['year'] = df['date'].dt.year
df['month'] = df['date'].dt.month
df['day_name'] = df['date'].dt.day_name()
df['quarter'] = df['date'].dt.quarter
df['is_weekend'] = df['date'].dt.dayofweek >= 5
print(df)
```

## Conditional Columns

Create columns based on conditions:

```python
df = pd.DataFrame({
    'score': [92, 78, 45, 88, 65]
})

# Using np.where (if/else)
df['pass_fail'] = np.where(df['score'] >= 60, 'Pass', 'Fail')

# Using np.select (multiple conditions)
conditions = [
    df['score'] >= 90,
    df['score'] >= 80,
    df['score'] >= 70,
    df['score'] >= 60
]
choices = ['A', 'B', 'C', 'D']
df['grade'] = np.select(conditions, choices, default='F')
print(df)
```

## Using apply for Complex Logic

```python
def categorize(row):
    if row['score'] >= 90:
        return 'Excellent'
    elif row['score'] >= 70:
        return 'Good'
    else:
        return 'Needs Improvement'

df['category'] = df.apply(categorize, axis=1)
print(df)
```

## Using pd.cut for Binning

```python
df['score_bin'] = pd.cut(df['score'],
                         bins=[0, 60, 70, 80, 90, 100],
                         labels=['F', 'D', 'C', 'B', 'A'])
```

More resources:

-  <a href="https://github.com/ine-rmotr-curriculum/freecodecamp-intro-to-pandas" target="_blank" rel="noopener noreferrer nofollow">Notebooks on GitHub</a>
-  <a href="https://colab.research.google.com/github/googlecolab/colabtools/blob/master/notebooks/colab-github-demo.ipynb" target="_blank" rel="noopener noreferrer nofollow">How to open Notebooks from GitHub using Google Colab.</a>

---

*Based on the [freeCodeCamp Data Analysis with Python Certification](https://www.freecodecamp.org/learn/data-analysis-with-python/)*

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/data-analysis-with-python/)*
*Original Challenge ID: 5e9a093a74c4063ca6f7c15c*

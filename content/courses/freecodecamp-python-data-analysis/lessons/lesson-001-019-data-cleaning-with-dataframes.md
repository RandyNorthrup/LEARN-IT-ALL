---
id: lesson-001-019
title: Data Cleaning with DataFrames
chapterId: chapter-01
order: 19
duration: 5
objectives:
  - Clean string data by stripping whitespace and standardizing case
  - Convert and fix data types across DataFrame columns
  - Rename columns and restructure DataFrames for consistency
---

# Data Cleaning with DataFrames

This lesson covers practical techniques for cleaning messy DataFrames: fixing strings, correcting data types, renaming columns, and dealing with inconsistent formatting.

## Cleaning String Data

Strings are the most common source of data quality issues:

```python
import pandas as pd

df = pd.DataFrame({
    'city': ['  New York  ', 'new york', 'NEW YORK', 'Los Angeles', 'los angeles ']
})

# Strip whitespace
df['city'] = df['city'].str.strip()

# Standardize case
df['city'] = df['city'].str.title()  # 'New York'
# Other options: .str.lower(), .str.upper()

print(df['city'].value_counts())
# New York       3
# Los Angeles    2
```

## Replacing Values

Fix inconsistent entries:

```python
df = pd.DataFrame({
    'status': ['active', 'Active', 'ACTIVE', 'inactive', 'Inactive', 'N/A', '']
})

# Standardize
df['status'] = df['status'].str.lower().str.strip()

# Replace empty and placeholder values with NaN
import numpy as np
df['status'] = df['status'].replace({'n/a': np.nan, '': np.nan})
print(df)
```

## Fixing Data Types

Data often loads with incorrect types:

```python
df = pd.DataFrame({
    'date': ['2024-01-15', '2024-02-20', '2024-03-10'],
    'amount': ['1,234.56', '2,345.67', '3,456.78'],
    'is_valid': ['true', 'false', 'true']
})

# String to datetime
df['date'] = pd.to_datetime(df['date'])

# Remove commas and convert to float
df['amount'] = df['amount'].str.replace(',', '').astype(float)

# String to boolean
df['is_valid'] = df['is_valid'].map({'true': True, 'false': False})

print(df.dtypes)
```

## Renaming Columns

Clean up column names for consistency:

```python
df = pd.DataFrame(columns=['First Name', 'Last Name', 'Phone Number'])

# Rename specific columns
df = df.rename(columns={'First Name': 'first_name', 'Last Name': 'last_name'})

# Bulk cleanup: lowercase, replace spaces with underscores
df.columns = df.columns.str.lower().str.replace(' ', '_')
print(df.columns)  # ['first_name', 'last_name', 'phone_number']
```

## Handling Outliers

Identify and handle extreme values:

```python
df = pd.DataFrame({'age': [25, 30, 35, 28, 150, 22, -5, 45]})

# Identify outliers using IQR
Q1 = df['age'].quantile(0.25)
Q3 = df['age'].quantile(0.75)
IQR = Q3 - Q1
lower = Q1 - 1.5 * IQR
upper = Q3 + 1.5 * IQR

# Filter outliers
df_clean = df[(df['age'] >= lower) & (df['age'] <= upper)]
print(df_clean)

# Or cap outliers instead of removing
df['age'] = df['age'].clip(lower=0, upper=120)
```

## Reordering Columns

```python
# Specify column order
df = df[['last_name', 'first_name', 'phone_number']]
```

More resources:

-  <a href="https://github.com/ine-rmotr-curriculum/data-cleaning-rmotr-freecodecamp" target="_blank" rel="noopener noreferrer nofollow">Notebooks on GitHub</a>
-  <a href="https://colab.research.google.com/github/googlecolab/colabtools/blob/master/notebooks/colab-github-demo.ipynb" target="_blank" rel="noopener noreferrer nofollow">How to open Notebooks from GitHub using Google Colab.</a>

---

*Based on the [freeCodeCamp Data Analysis with Python Certification](https://www.freecodecamp.org/learn/data-analysis-with-python/)*

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/data-analysis-with-python/)*
*Original Challenge ID: 5e9a093a74c4063ca6f7c15e*

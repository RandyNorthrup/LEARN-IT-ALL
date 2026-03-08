---
id: lesson-001-002
title: Data Analysis Example A
chapterId: chapter-01
order: 2
duration: 5
objectives:
  - Walk through a real-world data analysis example using Pandas
  - Load and inspect a dataset from a CSV file
  - Perform basic exploratory data analysis with groupby and aggregation
---

# Data Analysis Example A

The best way to learn data analysis is by doing it. This lesson walks through a real-world example using Pandas to analyze a dataset, demonstrating the typical workflow from loading data to extracting insights.

## Setting Up Your Environment

You can follow along using Google Colab, Jupyter Notebook, or any Python environment with Pandas installed:

```python
import pandas as pd
import numpy as np
```

## Loading and Inspecting Data

The first step in any analysis is loading your data and getting a feel for its structure:

```python
# Load a dataset
df = pd.read_csv('sales_data.csv')

# Basic inspection
print(df.shape)      # (rows, columns)
print(df.columns)    # Column names
print(df.dtypes)     # Data types of each column
print(df.head())     # First 5 rows
print(df.tail())     # Last 5 rows
```

## Summary Statistics

The `describe()` method gives you a quick statistical overview of numeric columns:

```python
print(df.describe())
# Shows count, mean, std, min, 25%, 50%, 75%, max
# for each numeric column
```

For non-numeric columns, use:

```python
print(df.describe(include='object'))
# Shows count, unique, top (most frequent), freq
```

## Asking Questions of the Data

Data analysis is driven by questions. Here are some common patterns:

```python
# How many unique categories are there?
print(df['category'].nunique())
print(df['category'].value_counts())

# What is the average value by group?
print(df.groupby('category')['amount'].mean())

# What is the total per group, sorted?
result = df.groupby('region')['revenue'].sum().sort_values(ascending=False)
print(result)
```

## Filtering Data

Select rows that meet specific conditions:

```python
# Rows where amount is greater than 1000
high_value = df[df['amount'] > 1000]
print(high_value.shape)

# Multiple conditions
filtered = df[(df['amount'] > 500) & (df['region'] == 'West')]
print(filtered.head())
```

## Key Takeaways

This example demonstrates the core data analysis pattern: **load → inspect → summarize → question → filter**. Nearly every analysis follows this flow, regardless of the dataset or domain.

More resources:

-  <a href="https://github.com/ine-rmotr-curriculum/FreeCodeCamp-Pandas-Real-Life-Example" target="_blank" rel="noopener noreferrer nofollow">Notebooks on GitHub</a>
-  <a href="https://colab.research.google.com/github/googlecolab/colabtools/blob/master/notebooks/colab-github-demo.ipynb" target="_blank" rel="noopener noreferrer nofollow">How to open Notebooks from GitHub using Google Colab.</a>

---

*Based on the [freeCodeCamp Data Analysis with Python Certification](https://www.freecodecamp.org/learn/data-analysis-with-python/)*

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/data-analysis-with-python/)*
*Original Challenge ID: 5e9a093a74c4063ca6f7c14d*

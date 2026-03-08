---
id: lesson-001-003
title: Data Analysis Example B
chapterId: chapter-01
order: 3
duration: 5
objectives:
  - Apply data transformation techniques to reshape datasets
  - Create visualizations to communicate data insights
  - Combine multiple analysis steps into a complete workflow
---

# Data Analysis Example B

This lesson continues the real-world data analysis example, focusing on data transformation, visualization, and combining multiple analysis techniques into a complete workflow.

## Data Transformation

Real datasets often need to be reshaped before analysis. Common transformations include:

```python
import pandas as pd
import numpy as np

df = pd.read_csv('sales_data.csv')

# Create new calculated columns
df['profit_margin'] = (df['revenue'] - df['cost']) / df['revenue'] * 100

# Convert data types
df['date'] = pd.to_datetime(df['date'])
df['year'] = df['date'].dt.year
df['month'] = df['date'].dt.month

# Bin continuous values into categories
df['size_category'] = pd.cut(df['amount'],
                              bins=[0, 100, 500, float('inf')],
                              labels=['Small', 'Medium', 'Large'])
```

## Pivot Tables

Pivot tables summarize data across two dimensions, similar to spreadsheet pivot tables:

```python
# Average revenue by region and year
pivot = df.pivot_table(values='revenue',
                       index='region',
                       columns='year',
                       aggfunc='mean')
print(pivot)
```

## Basic Visualization

Visualization turns numbers into pictures, making patterns easier to spot:

```python
import matplotlib.pyplot as plt

# Bar chart of total revenue by region
df.groupby('region')['revenue'].sum().plot(kind='bar')
plt.title('Total Revenue by Region')
plt.ylabel('Revenue ($)')
plt.tight_layout()
plt.show()

# Line chart of monthly trends
monthly = df.groupby('month')['revenue'].sum()
monthly.plot(kind='line', marker='o')
plt.title('Monthly Revenue Trend')
plt.xlabel('Month')
plt.ylabel('Revenue ($)')
plt.show()
```

## Putting It All Together

A complete analysis workflow combines all these steps:

1. **Load** the data with `pd.read_csv()`
2. **Clean** by handling missing values and fixing types
3. **Transform** by adding calculated columns and reshaping
4. **Analyze** with groupby, pivot tables, and aggregations
5. **Visualize** with charts that tell a clear story
6. **Communicate** your findings with clear labels and context

Each step builds on the previous one, and you will often loop back to earlier steps as you discover new questions in the data.

More resources:

-  <a href="https://github.com/ine-rmotr-curriculum/FreeCodeCamp-Pandas-Real-Life-Example" target="_blank" rel="noopener noreferrer nofollow">Notebooks on GitHub</a>
-  <a href="https://colab.research.google.com/github/googlecolab/colabtools/blob/master/notebooks/colab-github-demo.ipynb" target="_blank" rel="noopener noreferrer nofollow">How to open Notebooks from GitHub using Google Colab.</a>

---

*Based on the [freeCodeCamp Data Analysis with Python Certification](https://www.freecodecamp.org/learn/data-analysis-with-python/)*

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/data-analysis-with-python/)*
*Original Challenge ID: 5e9a093a74c4063ca6f7c14e*

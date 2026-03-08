---
id: lesson-001-021
title: Data Cleaning and Visualizations
chapterId: chapter-01
order: 21
duration: 5
objectives:
  - Create visualizations to identify data quality issues
  - Use histograms and box plots to detect outliers
  - Visualize missing data patterns and distributions before and after cleaning
---

# Data Cleaning and Visualizations

Visualization is a powerful ally in data cleaning. Charts can reveal problems that are invisible in raw numbers: outliers, skewed distributions, missing data patterns, and unexpected relationships. This lesson combines cleaning techniques with visual inspection.

## Visualizing Missing Data

See where missing values occur:

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Create a dataset with missing values
df = pd.DataFrame({
    'A': [1, 2, np.nan, 4, 5, np.nan, 7, 8, 9, 10],
    'B': [np.nan, 2, 3, np.nan, 5, 6, 7, np.nan, 9, 10],
    'C': [1, 2, 3, 4, 5, 6, 7, 8, 9, np.nan]
})

# Heatmap of missing values
sns.heatmap(df.isnull(), cbar=True, yticklabels=False, cmap='viridis')
plt.title('Missing Data Heatmap')
plt.show()

# Bar chart of missing values per column
df.isnull().sum().plot(kind='bar')
plt.title('Missing Values per Column')
plt.ylabel('Count')
plt.show()
```

## Detecting Outliers with Box Plots

Box plots show the distribution of data and highlight outliers:

```python
df = pd.DataFrame({
    'salary': [45000, 50000, 55000, 48000, 52000, 300000, 47000, 51000]
})

df['salary'].plot(kind='box')
plt.title('Salary Distribution')
plt.show()
# The value 300000 will appear as an outlier dot
```

## Histograms for Distribution Analysis

Histograms reveal the shape of your data distribution:

```python
# Before cleaning
df['salary'].plot(kind='hist', bins=20, edgecolor='black')
plt.title('Salary Distribution (Before Cleaning)')
plt.xlabel('Salary')
plt.show()

# Remove the outlier
Q1 = df['salary'].quantile(0.25)
Q3 = df['salary'].quantile(0.75)
IQR = Q3 - Q1
df_clean = df[(df['salary'] >= Q1 - 1.5*IQR) & (df['salary'] <= Q3 + 1.5*IQR)]

# After cleaning
df_clean['salary'].plot(kind='hist', bins=20, edgecolor='black')
plt.title('Salary Distribution (After Cleaning)')
plt.xlabel('Salary')
plt.show()
```

## Scatter Plots for Relationship Inspection

Spot impossible or suspicious relationships:

```python
df = pd.DataFrame({
    'height_cm': [165, 170, 155, 180, 175, 10, 190, 160],
    'weight_kg': [65, 75, 55, 85, 72, 800, 90, 62]
})

plt.scatter(df['height_cm'], df['weight_kg'])
plt.xlabel('Height (cm)')
plt.ylabel('Weight (kg)')
plt.title('Height vs Weight (Note the outliers!)')
plt.show()
```

## Comparing Before and After Cleaning

```python
fig, axes = plt.subplots(1, 2, figsize=(12, 5))

# Before
df['weight_kg'].plot(kind='hist', ax=axes[0], bins=10, edgecolor='black')
axes[0].set_title('Before Cleaning')

# After (remove impossible values)
df_clean = df[(df['height_cm'] > 100) & (df['weight_kg'] < 200)]
df_clean['weight_kg'].plot(kind='hist', ax=axes[1], bins=10, edgecolor='black')
axes[1].set_title('After Cleaning')

plt.tight_layout()
plt.show()
```

## Key Visualization Tips for Cleaning

1. **Always visualize before analysis** — A quick histogram or box plot takes seconds and can save hours
2. **Compare before and after** — Side-by-side plots confirm your cleaning worked
3. **Check distributions by group** — Use `groupby` + plot to find group-specific issues
4. **Look for impossible values** — Negative ages, future dates, percentages over 100

More resources:

-  <a href="https://github.com/ine-rmotr-curriculum/data-cleaning-rmotr-freecodecamp" target="_blank" rel="noopener noreferrer nofollow">Notebooks on GitHub</a>
-  <a href="https://colab.research.google.com/github/googlecolab/colabtools/blob/master/notebooks/colab-github-demo.ipynb" target="_blank" rel="noopener noreferrer nofollow">How to open Notebooks from GitHub using Google Colab.</a>

---

*Based on the [freeCodeCamp Data Analysis with Python Certification](https://www.freecodecamp.org/learn/data-analysis-with-python/)*

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/data-analysis-with-python/)*
*Original Challenge ID: 5e9a093a74c4063ca6f7c160*

---
id: lesson-003-054
title: Visualizing Data with Python
chapterId: chapter-03
order: 54
duration: 5
objectives:
  - Create common chart types with matplotlib (line, scatter, bar, histogram)
  - Add labels, titles, legends, and formatting to plots
  - Use subplots to display multiple charts together
  - Choose the right chart type for different data stories
---

# Visualizing Data with Python

Data visualization transforms raw numbers into visual stories. Python's **matplotlib** library is the foundation of data visualization in the Python ecosystem, providing a flexible toolkit for creating publication-quality charts.

## Getting Started with Matplotlib

```python
import matplotlib.pyplot as plt

# Simple line plot
months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
sales = [150, 200, 180, 250, 300, 280]

plt.plot(months, sales)
plt.title('Monthly Sales')
plt.xlabel('Month')
plt.ylabel('Sales ($)')
plt.show()
```

The `plt` pattern: create the plot, customize it, then display it with `show()` or save it with `savefig()`.

## Line Plots

Best for showing **trends over time** or continuous data:

```python
import matplotlib.pyplot as plt

years = [2019, 2020, 2021, 2022, 2023]
python_popularity = [30, 33, 38, 42, 48]
js_popularity = [65, 63, 60, 58, 55]

plt.plot(years, python_popularity, 'bo-', label='Python', linewidth=2)
plt.plot(years, js_popularity, 'rs--', label='JavaScript', linewidth=2)

plt.title('Programming Language Trends')
plt.xlabel('Year')
plt.ylabel('Popularity Index')
plt.legend()
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.savefig('trends.png', dpi=150)
plt.show()
```

Format strings: `'bo-'` means blue circles with solid lines. `'rs--'` means red squares with dashed lines.

## Scatter Plots

Best for showing **relationships between two variables**:

```python
import matplotlib.pyplot as plt

hours_studied = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
test_scores = [45, 55, 50, 65, 70, 72, 80, 85, 88, 95]

plt.scatter(hours_studied, test_scores, 
            c='blue', s=100, alpha=0.7, edgecolors='black')

plt.title('Study Hours vs Test Scores')
plt.xlabel('Hours Studied')
plt.ylabel('Test Score')
plt.grid(True, alpha=0.3)
plt.show()
```

Use scatter plots to discover correlations, clusters, or outliers in your data.

## Bar Charts

Best for **comparing categories**:

```python
import matplotlib.pyplot as plt

languages = ['Python', 'JavaScript', 'Java', 'C++', 'Go']
jobs = [15000, 18000, 12000, 8000, 5000]
colors = ['#3776ab', '#f7df1e', '#ed8b00', '#00599c', '#00add8']

plt.bar(languages, jobs, color=colors, edgecolor='black')
plt.title('Job Postings by Language')
plt.xlabel('Language')
plt.ylabel('Number of Jobs')
plt.tight_layout()
plt.show()
```

For horizontal bars, use `plt.barh()` — helpful when category names are long.

## Histograms

Best for showing **distributions** of a single variable:

```python
import matplotlib.pyplot as plt
import random

# Generate sample data
scores = [random.gauss(75, 10) for _ in range(200)]

plt.hist(scores, bins=20, color='steelblue', edgecolor='black', alpha=0.7)
plt.title('Distribution of Test Scores')
plt.xlabel('Score')
plt.ylabel('Number of Students')
plt.axvline(x=75, color='red', linestyle='--', label='Mean')
plt.legend()
plt.show()
```

## Subplots: Multiple Charts

Display multiple charts in a grid:

```python
import matplotlib.pyplot as plt

fig, axes = plt.subplots(2, 2, figsize=(10, 8))

# Top-left: Line plot
axes[0, 0].plot([1, 2, 3, 4], [10, 20, 25, 30], 'b-o')
axes[0, 0].set_title('Line Plot')

# Top-right: Bar chart
axes[0, 1].bar(['A', 'B', 'C'], [30, 20, 50], color='coral')
axes[0, 1].set_title('Bar Chart')

# Bottom-left: Scatter plot
import random
x = [random.random() for _ in range(50)]
y = [random.random() for _ in range(50)]
axes[1, 0].scatter(x, y, alpha=0.6)
axes[1, 0].set_title('Scatter Plot')

# Bottom-right: Histogram
data = [random.gauss(0, 1) for _ in range(500)]
axes[1, 1].hist(data, bins=25, color='green', alpha=0.7)
axes[1, 1].set_title('Histogram')

plt.suptitle('Four Common Chart Types', fontsize=14, fontweight='bold')
plt.tight_layout()
plt.savefig('subplots.png', dpi=150)
plt.show()
```

## Choosing the Right Chart

| Data Story | Chart Type | Example |
|------------|------------|----------|
| Trend over time | Line plot | Stock prices, temperature |
| Comparing categories | Bar chart | Sales by region |
| Relationship between variables | Scatter plot | Height vs weight |
| Distribution of values | Histogram | Exam score spread |
| Proportions of a whole | Pie chart | Market share |

## Saving Figures

```python
# Save as PNG (raster) - good for web
plt.savefig('chart.png', dpi=150, bbox_inches='tight')

# Save as SVG (vector) - good for print
plt.savefig('chart.svg', bbox_inches='tight')

# Save as PDF
plt.savefig('chart.pdf', bbox_inches='tight')
```

The `bbox_inches='tight'` parameter removes excess whitespace around the chart.

## Styling Your Plots

Matplotlib provides built-in styles:

```python
import matplotlib.pyplot as plt

plt.style.use('seaborn-v0_8')  # Clean, modern style
# Other options: 'ggplot', 'dark_background', 'fivethirtyeight'

plt.plot([1, 2, 3, 4], [1, 4, 9, 16])
plt.title('Styled Plot')
plt.show()
```

Data visualization is both a technical skill and an art. Choosing the right chart type and keeping visualizations clean and focused are just as important as knowing the code to create them.

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*

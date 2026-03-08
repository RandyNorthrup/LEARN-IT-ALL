---
id: lesson-011-002
title: Linear Equations
chapterId: chapter-11
order: 2
duration: 5
objectives:
  - Graph linear equations and identify intercepts
  - Calculate and interpret rates of change
  - Understand the concept of linear regression
  - Use np.polyfit to find best-fit lines
  - Build real-world linear models with Python
---

# Linear Equations

Linear equations model constant-rate relationships. This lesson covers graphing, intercepts, rates of change, and introduces linear regression — the bridge from algebra to data science.

## Graphing Linear Equations

To graph a linear equation, you need at least two points. The simplest approach is to find the intercepts.

**x-intercept:** Set $y = 0$ and solve for $x$.
**y-intercept:** Set $x = 0$ and solve for $y$.

**Example:** $3x + 4y = 12$

- x-intercept: $3x = 12 \Rightarrow x = 4$ → point $(4, 0)$
- y-intercept: $4y = 12 \Rightarrow y = 3$ → point $(0, 3)$

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(-1, 6, 100)
y = (12 - 3*x) / 4

plt.plot(x, y, 'b-', label='3x + 4y = 12')
plt.plot(4, 0, 'ro', markersize=8, label='x-intercept (4, 0)')
plt.plot(0, 3, 'go', markersize=8, label='y-intercept (0, 3)')
plt.axhline(0, color='k', linewidth=0.5)
plt.axvline(0, color='k', linewidth=0.5)
plt.grid(True); plt.legend()
plt.title('Linear Equation: 3x + 4y = 12')
plt.xlabel('x'); plt.ylabel('y')
plt.show()
```

## Rate of Change

The **slope** of a linear function is its rate of change — how much $y$ changes per unit change in $x$.

$$\text{Rate of change} = m = \frac{\Delta y}{\Delta x} = \frac{y_2 - y_1}{x_2 - x_1}$$

**Real-world example:** A car travels 150 miles in 3 hours.

$$\text{Rate} = \frac{150 \text{ mi}}{3 \text{ hr}} = 50 \text{ mph}$$

The distance function is $d(t) = 50t$, where the slope 50 represents the speed.

## Linear Regression: The Best-Fit Line

Real data rarely falls perfectly on a line. **Linear regression** finds the line that minimizes the sum of squared distances from each data point to the line.

The best-fit line $y = mx + b$ can be found using `np.polyfit(x, y, 1)`, which returns $[m, b]$.

```python
import numpy as np
import matplotlib.pyplot as plt

# Sample data: hours studied vs. exam score
hours = np.array([1, 2, 3, 4, 5, 6, 7, 8])
scores = np.array([52, 58, 65, 68, 73, 79, 84, 88])

# Find best-fit line
m, b = np.polyfit(hours, scores, 1)
print(f"Best-fit line: y = {m:.2f}x + {b:.2f}")
# Output: Best-fit line: y = 5.14x + 48.50

# Plot data and regression line
plt.scatter(hours, scores, color='blue', label='Data')
x_line = np.linspace(0, 9, 100)
y_line = m * x_line + b
plt.plot(x_line, y_line, 'r-', label=f'y = {m:.2f}x + {b:.2f}')
plt.xlabel('Hours Studied'); plt.ylabel('Exam Score')
plt.title('Linear Regression: Study Hours vs. Score')
plt.legend(); plt.grid(True); plt.show()
```

**Interpreting the result:** The slope $m \approx 5.14$ means each additional hour of studying is associated with about 5.14 more points on the exam. The intercept $b \approx 48.5$ is the predicted score with zero hours of study.

## Making Predictions

Once you have the regression equation, you can predict values:

```python
# Predict score for 10 hours of studying
predicted = m * 10 + b
print(f"Predicted score for 10 hours: {predicted:.1f}")  # ~99.9
```

**Caution:** Predictions far outside the data range (extrapolation) are unreliable.

## Real-World Linear Modeling

**Temperature conversion:** $F = \frac{9}{5}C + 32$

```python
import numpy as np
import matplotlib.pyplot as plt

celsius = np.linspace(-40, 100, 100)
fahrenheit = (9/5) * celsius + 32

plt.plot(celsius, fahrenheit)
plt.xlabel('Celsius'); plt.ylabel('Fahrenheit')
plt.title('Temperature Conversion')
plt.grid(True)
plt.axhline(32, color='r', linestyle='--', alpha=0.5, label='Freezing (32°F)')
plt.axhline(212, color='orange', linestyle='--', alpha=0.5, label='Boiling (212°F)')
plt.legend(); plt.show()
```

**Depreciation:** A machine worth \$50,000 loses \$4,000 in value per year.

$$V(t) = -4000t + 50000$$

After how many years is it worth \$18,000?

$$18000 = -4000t + 50000 \Rightarrow t = 8 \text{ years}$$

## Key Takeaways

- x-intercept and y-intercept provide two easy points for graphing any linear equation.
- Slope is rate of change — it has real-world meaning (speed, price per unit, growth rate).
- `np.polyfit(x, y, 1)` computes the best-fit line for data that's approximately linear.
- Linear models are powerful for interpolation but risky for extrapolation.
- Linear regression connects algebra directly to data science and statistics.

---

*Based on the [freeCodeCamp College Algebra with Python Certification](https://www.freecodecamp.org/learn/college-algebra-with-python/)*

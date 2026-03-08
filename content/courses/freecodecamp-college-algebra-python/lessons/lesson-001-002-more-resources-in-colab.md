---
id: lesson-001-002
title: More Resources in Colab
chapterId: chapter-01
order: 2
duration: 5
objectives:
  - Navigate Google Colab notebooks for math and Python work
  - Use code and markdown cells effectively
  - Install and import packages for algebra
  - Create mathematical visualizations with matplotlib
---

# Google Colab Deep Dive

## What Is Google Colab?

Google Colab (Colaboratory) is a free, cloud-based Jupyter notebook environment. It requires no setup — you just need a Google account. It comes pre-installed with Python, NumPy, matplotlib, and many other scientific packages.

## Creating and Managing Notebooks

To get started:
1. Go to [colab.research.google.com](https://colab.research.google.com)
2. Click **File > New Notebook**
3. Your notebook is automatically saved to Google Drive

You can also open notebooks from GitHub, upload local `.ipynb` files, or start from templates.

## Code Cells vs Markdown Cells

Notebooks have two main cell types:

**Code cells** execute Python:
```python
# This runs as Python code
x = 5
y = x ** 2 + 3 * x - 7
print(f"When x = {x}, y = {y}")  # When x = 5, y = 33
```

**Markdown cells** hold formatted text. You can write:
- Headers with `#`, `##`, `###`
- **Bold** and *italic* text
- Mathematical notation using LaTeX: `$f(x) = x^2 + 3x - 7$`
- Bullet lists and numbered lists
- Links and images

To switch cell type, use the dropdown menu at the top or:
- `Ctrl+M M` to convert to markdown
- `Ctrl+M Y` to convert to code

## Installing Packages

Colab comes with many packages pre-installed. For additional ones:

```python
# Install a package (the ! runs a shell command)
!pip install sympy

# Then import it
from sympy import symbols, solve, plot
```

Key packages for this course:
- **sympy** — symbolic algebra (usually pre-installed)
- **numpy** — numerical arrays and linear algebra
- **matplotlib** — plotting and visualization

## Plotting Inline with Matplotlib

Graphs appear directly below code cells. Here is how to create your first math plot:

```python
import matplotlib.pyplot as plt
import numpy as np

# Create x values from -5 to 5
x = np.linspace(-5, 5, 200)

# Define a quadratic function
y = x**2 - 2*x - 3

# Create the plot
plt.figure(figsize=(8, 5))
plt.plot(x, y, 'b-', linewidth=2, label='$f(x) = x^2 - 2x - 3$')
plt.axhline(y=0, color='k', linewidth=0.5)  # x-axis
plt.axvline(x=0, color='k', linewidth=0.5)  # y-axis
plt.grid(True, alpha=0.3)
plt.xlabel('x')
plt.ylabel('f(x)')
plt.title('Graph of a Quadratic Function')
plt.legend()
plt.show()
```

This plots the parabola f(x) = x**2 - 2x - 3, which crosses the x-axis at x = -1 and x = 3.

## Multiple Functions on One Plot

You can compare functions visually:

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(-3, 5, 200)

plt.figure(figsize=(8, 5))
plt.plot(x, x**2, label='$y = x^2$')
plt.plot(x, 2*x + 1, label='$y = 2x + 1$')
plt.plot(x, -x + 4, label='$y = -x + 4$')

plt.axhline(y=0, color='k', linewidth=0.5)
plt.axvline(x=0, color='k', linewidth=0.5)
plt.grid(True, alpha=0.3)
plt.legend()
plt.title('Comparing Multiple Functions')
plt.ylim(-5, 15)
plt.show()
```

## Using Subplots for Side-by-Side Comparison

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(-4, 4, 200)

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))

# Left plot: linear function
ax1.plot(x, 2*x + 1, 'r-', linewidth=2)
ax1.set_title('Linear: y = 2x + 1')
ax1.grid(True, alpha=0.3)
ax1.axhline(y=0, color='k', linewidth=0.5)
ax1.axvline(x=0, color='k', linewidth=0.5)

# Right plot: quadratic function
ax2.plot(x, x**2 - 4, 'b-', linewidth=2)
ax2.set_title('Quadratic: y = x² - 4')
ax2.grid(True, alpha=0.3)
ax2.axhline(y=0, color='k', linewidth=0.5)
ax2.axvline(x=0, color='k', linewidth=0.5)

plt.tight_layout()
plt.show()
```

## Saving and Sharing Work

- **Auto-save**: Colab saves automatically to your Google Drive
- **Download**: File > Download > Download .ipynb (or .py)
- **Share**: Click the "Share" button (top right) and set permissions, just like Google Docs
- **GitHub**: File > Save a copy in GitHub — pushes the notebook to a repository
- **Link sharing**: Anyone with the link can view; set "Editor" access for collaboration

## Keyboard Shortcuts

Useful shortcuts to speed up your workflow:

| Shortcut | Action |
|----------|--------|
| Shift+Enter | Run cell and move to next |
| Ctrl+Enter | Run cell and stay |
| Ctrl+M A | Insert cell above |
| Ctrl+M B | Insert cell below |
| Ctrl+M D | Delete cell |
| Ctrl+M Z | Undo cell deletion |

With your Colab environment set up, you are ready to tackle algebra problems with Python throughout the rest of this course.

*Based on the [freeCodeCamp College Algebra with Python Certification](https://www.freecodecamp.org/learn/college-algebra-with-python/)*

---
id: lesson-001-005
title: Jupyter Notebooks Cells
chapterId: chapter-01
order: 5
duration: 5
objectives:
  - Understand the difference between code cells and markdown cells
  - Use keyboard shortcuts to create, run, and manage cells
  - Format markdown cells with headings, lists, code blocks, and equations
---

# Jupyter Notebooks Cells

Jupyter Notebooks are built around **cells** — individual blocks that can contain either code or formatted text. Mastering how to create, edit, and manage cells is fundamental to working efficiently in notebooks.

## Types of Cells

### Code Cells

Code cells contain Python (or another language) that the kernel executes. Output appears directly below the cell:

```python
# This is a code cell
x = 42
print(f"The answer is {x}")
# Output: The answer is 42
```

The last expression in a code cell is automatically displayed without needing `print()`:

```python
import pandas as pd
df = pd.DataFrame({'a': [1, 2, 3], 'b': [4, 5, 6]})
df  # Displays a formatted table
```

### Markdown Cells

Markdown cells contain formatted text using Markdown syntax:

```markdown
# Heading 1
## Heading 2

**Bold text** and *italic text*

- Bullet list item
- Another item

1. Numbered item
2. Another numbered item

`inline code`

$$E = mc^2$$
```

Switch a cell to Markdown mode by pressing **M** in command mode, or select "Markdown" from the cell type dropdown.

## Cell Modes

Jupyter has two modes:

- **Command mode** (blue border) — Navigate between cells. Press **Esc** to enter.
- **Edit mode** (green border) — Type inside a cell. Press **Enter** to enter.

## Essential Keyboard Shortcuts

In **command mode**:

| Shortcut | Action |
|---|---|
| **A** | Insert cell above |
| **B** | Insert cell below |
| **DD** | Delete current cell |
| **M** | Convert to Markdown |
| **Y** | Convert to Code |
| **Z** | Undo cell deletion |
| **Up/Down** | Navigate between cells |

In **edit mode**:

| Shortcut | Action |
|---|---|
| **Shift+Enter** | Run cell, move to next |
| **Ctrl+Enter** | Run cell, stay in place |
| **Alt+Enter** | Run cell, insert below |
| **Tab** | Code completion |
| **Shift+Tab** | Show documentation |

## Execution Order Matters

Cells can be executed in any order, not just top-to-bottom. The execution number `In [5]:` shows the order. Be careful — running cells out of order can cause confusion:

```python
# Cell 1 (run second)
print(x)  # Works because Cell 2 already defined x

# Cell 2 (run first)
x = 10
```

Best practice: periodically restart the kernel and run all cells top-to-bottom (**Kernel → Restart & Run All**) to verify your notebook works sequentially.

More resources:

-  <a href="https://github.com/ine-rmotr-curriculum/ds-content-interactive-jupyterlab-tutorial" target="_blank" rel="noopener noreferrer nofollow">Notebooks on GitHub</a>
-  <a href="https://colab.research.google.com/github/googlecolab/colabtools/blob/master/notebooks/colab-github-demo.ipynb" target="_blank" rel="noopener noreferrer nofollow">How to open Notebooks from GitHub using Google Colab.</a>

---

*Based on the [freeCodeCamp Data Analysis with Python Certification](https://www.freecodecamp.org/learn/data-analysis-with-python/)*

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/data-analysis-with-python/)*
*Original Challenge ID: 5e9a093a74c4063ca6f7c150*

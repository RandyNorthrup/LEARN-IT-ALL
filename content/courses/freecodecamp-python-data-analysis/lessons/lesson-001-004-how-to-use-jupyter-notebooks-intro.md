---
id: lesson-001-004
title: How to use Jupyter Notebooks Intro
chapterId: chapter-01
order: 4
duration: 5
objectives:
  - Understand what Jupyter Notebooks are and why they are used in data analysis
  - Launch Jupyter Notebook or use Google Colab as an alternative
  - Navigate the Jupyter Notebook interface and create a new notebook
---

# How to use Jupyter Notebooks Intro

Jupyter Notebooks are the standard interactive environment for data analysis in Python. They let you combine executable code, rich text, visualizations, and equations in a single document — making them ideal for exploration and presentation.

## What is a Jupyter Notebook?

A Jupyter Notebook (file extension `.ipynb`) is a document that contains:

- **Code cells** — Write and run Python code
- **Markdown cells** — Write formatted text, headings, lists, and equations
- **Output** — Results, tables, and plots appear directly below the code that generates them

This combination makes notebooks perfect for data analysis because you can document your thought process alongside your code.

## Getting Started

There are several ways to use Jupyter Notebooks:

### Option 1: Google Colab (easiest)

Google Colab runs in your browser with no setup required:

1. Go to [colab.research.google.com](https://colab.research.google.com)
2. Click "New Notebook"
3. Start writing Python code immediately

Colab provides free access to GPUs, pre-installed data science libraries, and integration with Google Drive.

### Option 2: Local Installation

Install Jupyter using pip:

```bash
pip install jupyter
```

Then launch it from your terminal:

```bash
jupyter notebook
```

This opens a file browser in your web browser. Click "New" → "Python 3" to create a notebook.

### Option 3: JupyterLab

JupyterLab is the next-generation interface with a more IDE-like experience:

```bash
pip install jupyterlab
jupyter lab
```

## The Notebook Interface

When you open a notebook, you will see:

- **Menu bar** — File operations, edit commands, cell operations
- **Toolbar** — Quick-access buttons for common actions (run, stop, restart)
- **Cell area** — Where you write code and text
- **Kernel indicator** — Shows whether the Python kernel is busy or idle

The kernel is the computational engine that executes your code. Each notebook connects to one kernel, which maintains the state of all variables until you restart it.

## Running Your First Code

```python
# Type this in a code cell and press Shift+Enter to run
import pandas as pd
import numpy as np

print("Jupyter is ready!")
print(f"Pandas version: {pd.__version__}")
print(f"NumPy version: {np.__version__}")
```

Press **Shift+Enter** to execute a cell and move to the next one, or **Ctrl+Enter** to execute and stay on the current cell.

More resources:

-  <a href="https://github.com/ine-rmotr-curriculum/ds-content-interactive-jupyterlab-tutorial" target="_blank" rel="noopener noreferrer nofollow">Notebooks on GitHub</a>
-  <a href="https://colab.research.google.com/github/googlecolab/colabtools/blob/master/notebooks/colab-github-demo.ipynb" target="_blank" rel="noopener noreferrer nofollow">How to open Notebooks from GitHub using Google Colab.</a>

---

*Based on the [freeCodeCamp Data Analysis with Python Certification](https://www.freecodecamp.org/learn/data-analysis-with-python/)*

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/data-analysis-with-python/)*
*Original Challenge ID: 5e9a093a74c4063ca6f7c14f*

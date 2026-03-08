---
id: lesson-001-001
title: Spreadsheets and Additional Resources
chapterId: chapter-01
order: 1
duration: 5
objectives:
  - Understand what college algebra covers and why Python is a powerful companion
  - Set up a Python environment for mathematical computation
  - Use Python as a scientific calculator
  - Introduction to SymPy for symbolic mathematics
---

# Course Introduction: College Algebra with Python

## What Does College Algebra Cover?

College algebra is the foundation of higher mathematics. It covers the essential topics you need for calculus, statistics, data science, and engineering:

- **Linear equations and systems** — solving for unknowns, modeling real-world relationships
- **Functions** — understanding inputs, outputs, domain, and range
- **Polynomials and factoring** — breaking expressions into simpler parts
- **Exponents and logarithms** — growth, decay, and scaling
- **Graphing** — visualizing mathematical relationships
- **Word problems** — translating real situations into solvable equations

## Why Combine Algebra with Python?

Traditionally, algebra is done with pencil and paper. Adding Python gives you superpowers:

1. **Instant verification** — check your hand calculations in seconds
2. **Visualization** — graph functions to build intuition
3. **Scalability** — solve systems with 10 variables just as easily as 2
4. **Automation** — build reusable tools for common problem types

## Setting Up Your Environment

You have several options for running Python:

**Google Colab** (recommended for beginners — no installation needed):
- Go to [colab.research.google.com](https://colab.research.google.com)
- Click "New Notebook"
- Start typing Python code in cells

**Jupyter Notebook** (local installation):
```python
# Install via pip
pip install jupyter notebook
# Launch
jupyter notebook
```

**Local Python** with any text editor or IDE like VS Code.

## Python as a Calculator

Python handles all arithmetic operations you need for algebra:

```python
# Basic arithmetic
print(2 + 3)       # Addition: 5
print(10 - 4)      # Subtraction: 6
print(6 * 7)       # Multiplication: 42
print(15 / 4)      # Division: 3.75
print(15 // 4)     # Floor division: 3
print(15 % 4)      # Modulus (remainder): 3
print(2 ** 10)     # Exponentiation: 1024

# Order of operations (PEMDAS) works naturally
result = 3 + 4 * 2 ** 2 - (6 / 3)
print(result)  # 3 + 4*4 - 2 = 3 + 16 - 2 = 17
```

Python also has a built-in `math` module for common mathematical functions:

```python
import math

print(math.sqrt(144))    # Square root: 12.0
print(math.pi)           # Pi: 3.141592653589793
print(math.e)            # Euler's number: 2.718281828459045
print(math.log(100, 10)) # Log base 10 of 100: 2.0
print(math.factorial(5)) # 5! = 120
print(math.ceil(4.3))    # Ceiling: 5
print(math.floor(4.7))   # Floor: 4
```

## Introduction to SymPy: Symbolic Math

While regular Python works with numbers, **SymPy** lets you work with algebraic symbols — just like writing on paper:

```python
from sympy import symbols, expand, simplify, solve, factor

# Define symbolic variables
x, y = symbols('x y')

# Create and manipulate expressions
expr = (x + 2) * (x - 3)
print(expand(expr))    # x**2 - x - 6

# Factor an expression
expr2 = x**2 - 9
print(factor(expr2))   # (x - 3)*(x + 3)

# Solve an equation (finds x where expression = 0)
print(solve(x**2 - 5*x + 6, x))  # [2, 3]

# Solve for a specific variable
from sympy import Eq
equation = Eq(2*x + 5, 13)
print(solve(equation, x))  # [4]
```

SymPy can also display math beautifully:

```python
from sympy import init_printing, sqrt, Rational
init_printing()  # Pretty printing in notebooks

# Exact fractions instead of decimals
print(Rational(1, 3) + Rational(1, 6))  # 1/2

# Symbolic square roots
print(sqrt(8))          # 2*sqrt(2)
print(simplify(sqrt(8)))  # 2*sqrt(2)
```

## Your First Algebra Problem in Python

Let's solve a real problem: *"A rectangle has a perimeter of 30 and a length that is 3 more than its width. Find the dimensions."*

```python
from sympy import symbols, Eq, solve

w, l = symbols('w l')

# Set up the equations
eq1 = Eq(2*l + 2*w, 30)  # Perimeter = 30
eq2 = Eq(l, w + 3)        # Length is 3 more than width

# Solve the system
solution = solve((eq1, eq2), (w, l))
print(solution)  # {w: 6, l: 9}

# Verify
print(f"Width: {solution[w]}, Length: {solution[l]}")
print(f"Perimeter: {2*solution[w] + 2*solution[l]}")  # 30
```

Throughout this course, you will build up both your algebra skills and your Python toolkit side by side.

*Based on the [freeCodeCamp College Algebra with Python Certification](https://www.freecodecamp.org/learn/college-algebra-with-python/)*

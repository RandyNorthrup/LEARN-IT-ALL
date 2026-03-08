---
id: lesson-002-002
title: Applications of Linear Systems: Extra
chapterId: chapter-02
order: 2
duration: 5
objectives:
  - Set up systems of linear equations from real-world scenarios
  - Solve mixture, distance-rate-time, and break-even problems
  - Use numpy.linalg.solve for systems of equations
  - Interpret solutions in context
---

# Applications of Linear Systems

Linear systems arise naturally when a real-world situation involves two or more unknown quantities with two or more relationships between them. This lesson covers the most common application types.

## Solving Systems with NumPy

For a system of linear equations in the form Ax = b, NumPy provides a direct solver:

```python
import numpy as np

# System:  2x + 3y = 13
#          4x - y  = 5

A = np.array([[2, 3],
              [4, -1]])
b = np.array([13, 5])

solution = np.linalg.solve(A, b)
print(f"x = {solution[0]}, y = {solution[1]}")
# x = 2.0, y = 3.0
```

You can also use SymPy for exact (symbolic) solutions:

```python
from sympy import symbols, Eq, solve
x, y = symbols('x y')
solution = solve((Eq(2*x + 3*y, 13), Eq(4*x - y, 5)), (x, y))
print(solution)  # {x: 2, y: 3}
```

## Application 1: Mixture Problems

*"A chemist needs 100 mL of a 40% acid solution. She has a 25% solution and a 60% solution. How much of each should she mix?"*

Let x = mL of 25% solution, y = mL of 60% solution.

- Total volume: x + y = 100
- Total acid: 0.25x + 0.60y = 0.40(100) = 40

```python
import numpy as np

A = np.array([[1, 1],
              [0.25, 0.60]])
b = np.array([100, 40])

solution = np.linalg.solve(A, b)
print(f"25% solution: {solution[0]:.1f} mL")  # 57.1 mL
print(f"60% solution: {solution[1]:.1f} mL")  # 42.9 mL

# Verify: 57.1(0.25) + 42.9(0.60) = 14.3 + 25.7 = 40.0 ✓
```

## Application 2: Distance-Rate-Time

The fundamental relationship is **distance = rate * time** (d = rt).

*"A boat travels 60 km upstream in 4 hours and 60 km downstream in 2 hours. Find the speed of the boat in still water and the speed of the current."*

Let b = boat speed, c = current speed.
- Upstream (against current): 60 = (b - c) * 4
- Downstream (with current): 60 = (b + c) * 2

Simplify: b - c = 15 and b + c = 30

```python
import numpy as np

# b - c = 15
# b + c = 30
A = np.array([[1, -1],
              [1, 1]])
b_vec = np.array([15, 30])

solution = np.linalg.solve(A, b_vec)
print(f"Boat speed: {solution[0]} km/h")    # 22.5 km/h
print(f"Current speed: {solution[1]} km/h")  # 7.5 km/h

# Upstream: (22.5 - 7.5) * 4 = 15 * 4 = 60 ✓
# Downstream: (22.5 + 7.5) * 2 = 30 * 2 = 60 ✓
```

## Application 3: Break-Even Analysis

*"A company has fixed costs of $5,000/month and variable costs of $12 per unit. They sell each unit for $20. How many units must they sell to break even?"*

Break-even occurs when **Total Cost = Total Revenue**.

```python
from sympy import symbols, Eq, solve

x = symbols('x')  # number of units

cost = 5000 + 12 * x    # Total Cost = Fixed + Variable
revenue = 20 * x          # Total Revenue = price * quantity

# Break-even: Cost = Revenue
break_even = solve(Eq(cost, revenue), x)
print(f"Break-even point: {break_even[0]} units")  # 625 units
print(f"Revenue at break-even: ${20 * break_even[0]}")  # $12,500
```

Visualize the break-even point:

```python
import matplotlib.pyplot as plt
import numpy as np

units = np.linspace(0, 1000, 200)
cost = 5000 + 12 * units
revenue = 20 * units

plt.figure(figsize=(8, 5))
plt.plot(units, cost, 'r-', label='Total Cost', linewidth=2)
plt.plot(units, revenue, 'b-', label='Total Revenue', linewidth=2)
plt.axvline(x=625, color='green', linestyle='--', label='Break-even (625 units)')
plt.fill_between(units, cost, revenue, where=(revenue > cost), alpha=0.2, color='green', label='Profit zone')
plt.fill_between(units, cost, revenue, where=(revenue < cost), alpha=0.2, color='red', label='Loss zone')
plt.xlabel('Units Sold')
plt.ylabel('Dollars ($)')
plt.title('Break-Even Analysis')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()
```

## Application 4: Investment Problem

*"An investor puts $10,000 into two accounts. One earns 5% annual interest, the other 8%. Total interest earned in one year is $680. How much is in each account?"*

```python
import numpy as np

# x + y = 10000
# 0.05x + 0.08y = 680
A = np.array([[1, 1],
              [0.05, 0.08]])
b = np.array([10000, 680])

solution = np.linalg.solve(A, b)
print(f"At 5%: ${solution[0]:,.0f}")  # $4,000
print(f"At 8%: ${solution[1]:,.0f}")  # $6,000

# Verify: 4000(0.05) + 6000(0.08) = 200 + 480 = 680 ✓
```

## Three-Variable Systems

NumPy handles larger systems just as easily:

```python
import numpy as np

# x + y + z = 6
# 2x - y + z = 3
# x + 2y - z = 2

A = np.array([[1, 1, 1],
              [2, -1, 1],
              [1, 2, -1]])
b = np.array([6, 3, 2])

solution = np.linalg.solve(A, b)
print(f"x = {solution[0]}, y = {solution[1]}, z = {solution[2]}")
# x = 1.0, y = 2.0, z = 3.0
```

The key insight: any time you have n unknowns, you need n independent equations to find a unique solution.

*Based on the [freeCodeCamp College Algebra with Python Certification](https://www.freecodecamp.org/learn/college-algebra-with-python/)*

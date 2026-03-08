---
id: lesson-003-001
title: Demand and Revenue
chapterId: chapter-03
order: 1
duration: 5
objectives:
  - Understand demand functions and how price affects quantity
  - Calculate revenue, cost, and profit functions
  - Perform break-even analysis algebraically and computationally
  - Plot demand, supply, and revenue curves with matplotlib
---

# Demand and Revenue: Economic Applications of Algebra

## The Demand Function

In economics, a **demand function** describes the relationship between the price of a product and the quantity consumers will buy. Generally, as price increases, demand decreases — this is the **law of demand**.

A linear demand function has the form: **q = m * p + b** (or equivalently, **p = m * q + b**), where q is quantity and p is price.

### Finding a Demand Function from Two Points

If you know two price-quantity pairs, you can determine the linear demand function:

*"At $10, consumers buy 200 units. At $15, they buy 150 units. Find the demand function."*

```python
import numpy as np

# Two known points: (price, quantity)
p1, q1 = 10, 200
p2, q2 = 15, 150

# Slope: change in q / change in p
m = (q2 - q1) / (p2 - p1)
print(f"Slope: {m}")  # -10.0 (negative: demand decreases as price rises)

# y-intercept using point-slope form: q - q1 = m(p - p1)
b = q1 - m * p1
print(f"Intercept: {b}")  # 300.0

print(f"Demand function: q = {m}p + {b}")
# q = -10p + 300
```

## Revenue Function

**Revenue = Price * Quantity**. If q = -10p + 300:

R(p) = p * q = p * (-10p + 300) = -10p**2 + 300p

This is a downward-opening parabola — revenue starts at zero, rises to a maximum, then falls back to zero.

```python
import matplotlib.pyplot as plt
import numpy as np

p = np.linspace(0, 30, 200)
q = -10 * p + 300
revenue = p * q

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 5))

# Demand curve
ax1.plot(p, q, 'b-', linewidth=2)
ax1.set_xlabel('Price ($)')
ax1.set_ylabel('Quantity Demanded')
ax1.set_title('Demand Curve')
ax1.grid(True, alpha=0.3)
ax1.set_xlim(0, 35)
ax1.set_ylim(0, 350)

# Revenue curve
ax2.plot(p, revenue, 'r-', linewidth=2)
ax2.set_xlabel('Price ($)')
ax2.set_ylabel('Revenue ($)')
ax2.set_title('Revenue Curve')
ax2.grid(True, alpha=0.3)

# Mark maximum revenue
max_idx = np.argmax(revenue)
ax2.plot(p[max_idx], revenue[max_idx], 'go', markersize=10)
ax2.annotate(f'Max Revenue: ${revenue[max_idx]:.0f}\nat p=${p[max_idx]:.0f}',
            xy=(p[max_idx], revenue[max_idx]),
            xytext=(p[max_idx]+3, revenue[max_idx]-200),
            arrowprops=dict(arrowstyle='->', color='green'),
            fontsize=10)

plt.tight_layout()
plt.show()
```

## Finding Maximum Revenue

The maximum of R(p) = -10p**2 + 300p occurs at the vertex of the parabola:

p_max = -b / (2a) = -300 / (2 * -10) = 15

```python
from sympy import symbols, diff, solve

p = symbols('p')
R = -10 * p**2 + 300 * p

# Take the derivative and set it to zero
dR = diff(R, p)
optimal_price = solve(dR, p)[0]
max_revenue = R.subs(p, optimal_price)

print(f"Optimal price: ${optimal_price}")     # $15
print(f"Maximum revenue: ${max_revenue}")     # $2250
print(f"Quantity at max revenue: {-10*optimal_price + 300}")  # 150 units
```

## Cost Function

A typical cost function has fixed costs plus variable costs:

**C(q) = Fixed Costs + Variable Cost per Unit * q**

Example: C(q) = 500 + 8q (fixed cost $500, $8 per unit to produce)

## Profit Function

**Profit = Revenue - Cost**

```python
import numpy as np
import matplotlib.pyplot as plt

# Using quantity as the independent variable
q = np.linspace(0, 300, 300)

# From demand: p = (-1/10)q + 30  (rearranged from q = -10p + 300)
p = (-1/10) * q + 30

revenue = p * q  # R = (-1/10)q^2 + 30q
cost = 500 + 8 * q
profit = revenue - cost

plt.figure(figsize=(10, 6))
plt.plot(q, revenue, 'b-', label='Revenue', linewidth=2)
plt.plot(q, cost, 'r-', label='Cost', linewidth=2)
plt.plot(q, profit, 'g-', label='Profit', linewidth=2)
plt.axhline(y=0, color='k', linewidth=0.5)
plt.fill_between(q, 0, profit, where=(profit > 0), alpha=0.15, color='green')
plt.fill_between(q, 0, profit, where=(profit < 0), alpha=0.15, color='red')
plt.xlabel('Quantity')
plt.ylabel('Dollars ($)')
plt.title('Revenue, Cost, and Profit')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()
```

## Break-Even Analysis

Break-even points occur where Profit = 0 (or Revenue = Cost):

```python
from sympy import symbols, Eq, solve

q = symbols('q')
revenue = (-1/10) * q**2 + 30 * q
cost = 500 + 8 * q

break_even = solve(Eq(revenue, cost), q)
print(f"Break-even quantities: {[round(float(x), 1) for x in break_even]}")
# Two break-even points: where the business starts and stops being profitable
```

## Supply and Demand Equilibrium

The **equilibrium point** is where supply equals demand:

```python
import matplotlib.pyplot as plt
import numpy as np

p = np.linspace(0, 35, 200)
demand = -10 * p + 300   # Demand: q = -10p + 300
supply = 8 * p - 40       # Supply: q = 8p - 40

# Equilibrium: -10p + 300 = 8p - 40 => 340 = 18p => p = 18.89
eq_price = 340 / 18
eq_quantity = -10 * eq_price + 300

plt.figure(figsize=(8, 5))
plt.plot(p, demand, 'b-', label='Demand', linewidth=2)
plt.plot(p, supply, 'r-', label='Supply', linewidth=2)
plt.plot(eq_price, eq_quantity, 'go', markersize=10, label=f'Equilibrium (${eq_price:.2f}, {eq_quantity:.1f} units)')
plt.xlabel('Price ($)')
plt.ylabel('Quantity')
plt.title('Supply and Demand Equilibrium')
plt.legend()
plt.grid(True, alpha=0.3)
plt.ylim(0, 350)
plt.show()
```

Understanding these economic functions through algebra gives you the tools to analyze markets, set optimal prices, and predict profitability.

*Based on the [freeCodeCamp College Algebra with Python Certification](https://www.freecodecamp.org/learn/college-algebra-with-python/)*

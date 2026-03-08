---
id: lesson-003-002
title: Business Applications of College Algebra: Extra
chapterId: chapter-03
order: 2
duration: 5
objectives:
  - Calculate markup, markdown, and discount percentages
  - Model linear and exponential depreciation
  - Perform cost analysis and optimization
  - Build Python business calculator functions
---

# Business Applications of College Algebra

Algebra is the backbone of business mathematics. This lesson covers practical formulas used in retail, accounting, and financial planning, with Python implementations you can reuse.

## Markup and Markdown

**Markup** is the amount added to cost to get the selling price:
- Selling Price = Cost + Markup
- Markup = Cost * Markup Rate
- Selling Price = Cost * (1 + Markup Rate)

**Markdown** (discount) reduces the selling price:
- Sale Price = Original Price - Discount
- Sale Price = Original Price * (1 - Discount Rate)

```python
def calculate_markup(cost, markup_rate):
    """Calculate selling price from cost and markup percentage."""
    selling_price = cost * (1 + markup_rate)
    markup_amount = cost * markup_rate
    return selling_price, markup_amount

def calculate_markdown(original_price, discount_rate):
    """Calculate sale price from original price and discount percentage."""
    sale_price = original_price * (1 - discount_rate)
    savings = original_price * discount_rate
    return sale_price, savings

# Example: Item costs $45, store marks up 60%
price, markup = calculate_markup(45, 0.60)
print(f"Selling price: ${price:.2f}")   # $72.00
print(f"Markup amount: ${markup:.2f}")  # $27.00

# Example: $72 item is discounted 25%
sale, saved = calculate_markdown(72, 0.25)
print(f"Sale price: ${sale:.2f}")  # $54.00
print(f"You save: ${saved:.2f}")   # $18.00
```

## Finding the Original Price

*"After a 30% discount, a jacket costs $56. What was the original price?"*

```python
from sympy import symbols, Eq, solve

p = symbols('p')
# sale_price = original * (1 - discount_rate)
equation = Eq(p * (1 - 0.30), 56)
original = solve(equation, p)[0]
print(f"Original price: ${original:.2f}")  # $80.00
```

## Linear Depreciation

Assets lose value over time. **Straight-line depreciation** decreases value by the same amount each year:

Annual Depreciation = (Purchase Price - Salvage Value) / Useful Life

```python
import matplotlib.pyplot as plt
import numpy as np

purchase_price = 25000  # New car
salvage_value = 5000    # Value after useful life
useful_life = 8         # Years

annual_depreciation = (purchase_price - salvage_value) / useful_life
print(f"Annual depreciation: ${annual_depreciation:,.0f}")  # $2,500

years = np.arange(0, useful_life + 1)
value = purchase_price - annual_depreciation * years

plt.figure(figsize=(8, 5))
plt.plot(years, value, 'bo-', linewidth=2, markersize=6)
plt.xlabel('Year')
plt.ylabel('Value ($)')
plt.title('Straight-Line Depreciation')
plt.grid(True, alpha=0.3)
for i, v in enumerate(value):
    plt.annotate(f'${v:,.0f}', (years[i], v), textcoords="offset points",
                xytext=(0, 10), ha='center', fontsize=8)
plt.show()
```

## Exponential Depreciation

More realistic for many assets — value drops by a fixed **percentage** each year:

Value(t) = P * (1 - r)**t, where r is the depreciation rate.

```python
import matplotlib.pyplot as plt
import numpy as np

P = 25000  # Purchase price
r = 0.20   # 20% depreciation rate per year
years = np.arange(0, 11)

linear_value = np.maximum(P - 2500 * years, 5000)
exponential_value = P * (1 - r) ** years

plt.figure(figsize=(8, 5))
plt.plot(years, linear_value, 'b-o', label='Linear Depreciation', linewidth=2)
plt.plot(years, exponential_value, 'r-s', label='Exponential (20%/yr)', linewidth=2)
plt.xlabel('Year')
plt.ylabel('Value ($)')
plt.title('Linear vs Exponential Depreciation')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()
```

## Cost Analysis

Total cost consists of fixed costs (rent, salaries) and variable costs (materials, per-unit labor):

```python
def total_cost(quantity, fixed_cost, variable_cost_per_unit):
    return fixed_cost + variable_cost_per_unit * quantity

def average_cost(quantity, fixed_cost, variable_cost_per_unit):
    return total_cost(quantity, fixed_cost, variable_cost_per_unit) / quantity

# Factory: $10,000/month fixed, $15/unit variable
for q in [100, 500, 1000, 5000]:
    tc = total_cost(q, 10000, 15)
    ac = average_cost(q, 10000, 15)
    print(f"Qty: {q:5d} | Total: ${tc:10,.0f} | Avg: ${ac:8.2f}")

# Output shows average cost decreases as quantity increases (economies of scale)
# Qty:   100 | Total:    $11,500 | Avg:   $115.00
# Qty:   500 | Total:    $17,500 | Avg:    $35.00
# Qty:  1000 | Total:    $25,000 | Avg:    $25.00
# Qty:  5000 | Total:    $85,000 | Avg:    $17.00
```

## Optimization: Finding Maximum Profit

*"A company’s profit function is P(x) = -2x**2 + 120x - 400. Find the quantity that maximizes profit."*

The vertex of the parabola P(x) = ax**2 + bx + c occurs at x = -b/(2a):

```python
from sympy import symbols, diff, solve
import matplotlib.pyplot as plt
import numpy as np

x = symbols('x')
P = -2*x**2 + 120*x - 400

# Find maximum using derivative
dP = diff(P, x)
optimal_x = solve(dP, x)[0]
max_profit = P.subs(x, optimal_x)

print(f"Optimal quantity: {optimal_x} units")  # 30 units
print(f"Maximum profit: ${max_profit}")         # $1400

# Visualize
x_vals = np.linspace(0, 60, 200)
profit_vals = -2*x_vals**2 + 120*x_vals - 400

plt.figure(figsize=(8, 5))
plt.plot(x_vals, profit_vals, 'g-', linewidth=2)
plt.plot(30, 1400, 'ro', markersize=10, label='Max Profit')
plt.axhline(y=0, color='k', linewidth=0.5)
plt.fill_between(x_vals, 0, profit_vals, where=(profit_vals > 0), alpha=0.15, color='green')
plt.xlabel('Quantity')
plt.ylabel('Profit ($)')
plt.title('Profit Optimization')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()
```

## Business Calculator: Putting It All Together

```python
def business_analysis(fixed_cost, variable_cost, selling_price, max_qty=1000):
    """Complete break-even and profit analysis."""
    from sympy import symbols, Eq, solve
    q = symbols('q')

    cost = fixed_cost + variable_cost * q
    revenue = selling_price * q
    profit = revenue - cost

    be = solve(Eq(cost, revenue), q)[0]
    print(f"Break-even: {be} units")
    print(f"Revenue at break-even: ${selling_price * be:,.0f}")
    print(f"Profit at {max_qty} units: ${profit.subs(q, max_qty):,.0f}")
    
    contribution_margin = selling_price - variable_cost
    print(f"Contribution margin: ${contribution_margin}/unit")

business_analysis(5000, 12, 20)
```

These algebraic tools are used every day in business planning, from startups calculating runway to corporations optimizing product lines.

*Based on the [freeCodeCamp College Algebra with Python Certification](https://www.freecodecamp.org/learn/college-algebra-with-python/)*

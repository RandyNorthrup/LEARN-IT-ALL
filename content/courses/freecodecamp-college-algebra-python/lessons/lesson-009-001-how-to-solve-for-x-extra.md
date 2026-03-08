---
id: lesson-009-001
title: How to Solve for X: Extra
chapterId: chapter-09
order: 1
duration: 5
objectives:
  - Solve one-step, two-step, and multi-step equations
  - Handle equations with variables on both sides
  - Solve equations containing fractions and decimals
  - Solve absolute value equations
  - Verify algebraic solutions with Python
---

# How to Solve for X: Extra

Solving for $x$ is the central skill in algebra. This lesson walks through every major equation type you will encounter, from the simplest one-step problems to absolute value equations, with Python verification at each stage.

## One-Step Equations

One-step equations require a single inverse operation.

| Equation | Operation | Solution |
|---|---|---|
| $x + 7 = 12$ | Subtract 7 | $x = 5$ |
| $x - 3 = 10$ | Add 3 | $x = 13$ |
| $4x = 20$ | Divide by 4 | $x = 5$ |
| $\frac{x}{6} = 3$ | Multiply by 6 | $x = 18$ |

## Two-Step Equations

Undo addition/subtraction first, then multiplication/division.

**Example:** $3x + 5 = 20$

1. Subtract 5: $3x = 15$
2. Divide by 3: $x = 5$

## Multi-Step Equations

When terms need to be combined or the distributive property applied:

**Example:** $2(3x - 4) + x = 13$

1. Distribute: $6x - 8 + x = 13$
2. Combine like terms: $7x - 8 = 13$
3. Add 8: $7x = 21$
4. Divide by 7: $x = 3$

## Variables on Both Sides

Move all variable terms to one side and constants to the other.

**Example:** $5x - 2 = 3x + 8$

1. Subtract $3x$: $2x - 2 = 8$
2. Add 2: $2x = 10$
3. Divide by 2: $x = 5$

**Special cases:**
- If you arrive at $0 = 0$, the equation is an **identity** — every real number is a solution.
- If you arrive at $0 = 5$ (a contradiction), there is **no solution**.

## Equations with Fractions

Multiply every term by the **least common denominator (LCD)** to clear fractions.

**Example:** $\frac{x}{3} + \frac{x}{4} = 7$

LCD is 12:

$$12 \cdot \frac{x}{3} + 12 \cdot \frac{x}{4} = 12 \cdot 7$$
$$4x + 3x = 84 \Rightarrow 7x = 84 \Rightarrow x = 12$$

## Equations with Decimals

Multiply by a power of 10 to eliminate decimals.

**Example:** $0.3x + 1.5 = 4.2$

Multiply by 10: $3x + 15 = 42 \Rightarrow 3x = 27 \Rightarrow x = 9$

## Absolute Value Equations

The equation $|ax + b| = c$ (where $c \geq 0$) splits into two cases:

$$ax + b = c \quad \text{or} \quad ax + b = -c$$

**Example:** $|2x - 5| = 9$

- Case 1: $2x - 5 = 9 \Rightarrow x = 7$
- Case 2: $2x - 5 = -9 \Rightarrow x = -2$

If $c < 0$, there is **no solution** because absolute value is never negative.

## Python Verification

Use SymPy to check every answer:

```python
from sympy import symbols, Eq, solve, Abs

x = symbols('x')

# Multi-step: 2(3x - 4) + x = 13
print(solve(Eq(2*(3*x - 4) + x, 13), x))  # [3]

# Fractions: x/3 + x/4 = 7
from sympy import Rational
print(solve(Eq(x/3 + x/4, 7), x))  # [12]

# Variables both sides: 5x - 2 = 3x + 8
print(solve(Eq(5*x - 2, 3*x + 8), x))  # [5]

# Absolute value: |2x - 5| = 9
print(solve(Eq(Abs(2*x - 5), 9), x))  # [-2, 7]
```

## Building a Random Problem Generator

```python
import random
from sympy import symbols, Eq, solve

x = symbols('x')

def random_two_step():
    a = random.randint(2, 9)
    b = random.randint(1, 20)
    answer = random.randint(-10, 10)
    c = a * answer + b
    equation = Eq(a * x + b, c)
    print(f"Solve: {a}x + {b} = {c}")
    return solve(equation, x)[0]

solution = random_two_step()
print(f"Answer: x = {solution}")
```

This generator creates solvable equations with integer answers — perfect for practice.

## Key Takeaways

- Always perform the same operation on **both sides** of the equation.
- Clear fractions (multiply by LCD) and decimals (multiply by powers of 10) early.
- Absolute value equations produce two cases — always check both.
- SymPy's `solve()` function handles all these equation types and catches special cases automatically.

---

*Based on the [freeCodeCamp College Algebra with Python Certification](https://www.freecodecamp.org/learn/college-algebra-with-python/)*

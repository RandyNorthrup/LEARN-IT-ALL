---
id: lesson-014-001
title: Simple and Compound Interest
chapterId: chapter-14
order: 1
duration: 5
objectives:
  - Calculate simple interest using I = Prt
  - Calculate compound interest using A = P(1 + r/n)^(nt)
  - Apply continuous compounding with A = Pe^(rt)
  - Compare simple vs. compound growth over time
  - Build a Python compound interest calculator and growth plots
---

# Simple and Compound Interest

Understanding interest is one of the most practical applications of algebra. This lesson covers the three main interest formulas, compares their growth, and builds Python tools to explore them.

## Simple Interest: $I = Prt$

Simple interest is calculated only on the **original principal**.

- $P$ = principal (initial amount)
- $r$ = annual interest rate (as a decimal)
- $t$ = time in years
- $I$ = interest earned

The total amount after $t$ years: $A = P + I = P(1 + rt)$

**Example:** You deposit \$5,000 at 4% simple interest for 3 years.

$$I = 5000 \times 0.04 \times 3 = \$600$$
$$A = 5000 + 600 = \$5{,}600$$

Simple interest grows **linearly** — the same dollar amount is added each year.

## Compound Interest: $A = P\left(1 + \frac{r}{n}\right)^{nt}$

Compound interest is calculated on the principal **plus previously accumulated interest**.

- $n$ = number of times interest is compounded per year
- Common values: annually ($n=1$), semi-annually ($n=2$), quarterly ($n=4$), monthly ($n=12$), daily ($n=365$)

**Example:** \$5,000 at 4% compounded monthly for 3 years.

$$A = 5000\left(1 + \frac{0.04}{12}\right)^{12 \times 3} = 5000(1.003\overline{3})^{36}$$
$$A \approx \$5{,}637.48$$

Compound interest grows **exponentially** — each period adds a percentage of a growing balance.

## Continuous Compounding: $A = Pe^{rt}$

As $n \to \infty$, the compound interest formula approaches continuous compounding:

$$A = Pe^{rt}$$

where $e \approx 2.71828$.

**Example:** \$5,000 at 4% compounded continuously for 3 years.

$$A = 5000 \cdot e^{0.04 \times 3} = 5000 \cdot e^{0.12} \approx \$5{,}637.48$$

Continuous compounding is the upper bound — it produces slightly more than any finite compounding frequency.

## Comparing Growth

| Method | Formula | \$5,000 at 4% for 10 years |
|---|---|---|
| Simple | $P(1 + rt)$ | \$7,000.00 |
| Annually | $P(1 + r)^t$ | \$7,401.22 |
| Monthly | $P(1 + r/12)^{12t}$ | \$7,444.32 |
| Daily | $P(1 + r/365)^{365t}$ | \$7,449.23 |
| Continuous | $Pe^{rt}$ | \$7,459.12 |

The difference between daily and continuous compounding is minimal, but the difference between simple and compound is substantial over time.

## Time Value of Money

Money today is worth more than the same amount in the future because it can earn interest. This principle underlies all of finance:

- **Future Value (FV):** What a current amount will grow to.
- **Present Value (PV):** What a future amount is worth today.

$$PV = \frac{FV}{\left(1 + \frac{r}{n}\right)^{nt}}$$

**Example:** How much must you invest now at 5% compounded annually to have \$10,000 in 8 years?

$$PV = \frac{10000}{(1.05)^8} = \frac{10000}{1.47746} \approx \$6{,}768.39$$

## Python Compound Interest Calculator

```python
import math

def simple_interest(P, r, t):
    """Returns (interest, total_amount)"""
    I = P * r * t
    return I, P + I

def compound_interest(P, r, n, t):
    """Returns total amount with compound interest"""
    return P * (1 + r/n) ** (n * t)

def continuous_interest(P, r, t):
    """Returns total amount with continuous compounding"""
    return P * math.exp(r * t)

# Compare all three
P, r, t = 5000, 0.04, 10

I, A_simple = simple_interest(P, r, t)
A_annual = compound_interest(P, r, 1, t)
A_monthly = compound_interest(P, r, 12, t)
A_continuous = continuous_interest(P, r, t)

print(f"Simple:     ${A_simple:,.2f}")
print(f"Annual:     ${A_annual:,.2f}")
print(f"Monthly:    ${A_monthly:,.2f}")
print(f"Continuous: ${A_continuous:,.2f}")
```

## Growth Comparison Plot

```python
import numpy as np
import matplotlib.pyplot as plt

P, r = 5000, 0.04
t = np.linspace(0, 30, 300)

A_simple = P * (1 + r * t)
A_annual = P * (1 + r) ** t
A_monthly = P * (1 + r/12) ** (12 * t)
A_continuous = P * np.exp(r * t)

plt.figure(figsize=(10, 6))
plt.plot(t, A_simple, label='Simple')
plt.plot(t, A_annual, label='Compound (annually)')
plt.plot(t, A_monthly, label='Compound (monthly)')
plt.plot(t, A_continuous, label='Continuous', linestyle='--')
plt.xlabel('Years'); plt.ylabel('Account Balance ($)')
plt.title('$5,000 at 4%: Simple vs. Compound Interest')
plt.legend(); plt.grid(True)
plt.ticklabel_format(style='plain', axis='y')
plt.show()
```

The exponential curves clearly pull away from the straight line of simple interest, especially over long time horizons. This is the power of compound growth.

## Key Takeaways

- Simple interest ($I = Prt$) grows linearly; compound interest grows exponentially.
- More frequent compounding yields more interest, but with diminishing returns.
- Continuous compounding ($A = Pe^{rt}$) is the theoretical maximum.
- Present value calculations let you work backward from a future goal.
- Even small rate differences compound dramatically over decades.

---

*Based on the [freeCodeCamp College Algebra with Python Certification](https://www.freecodecamp.org/learn/college-algebra-with-python/)*

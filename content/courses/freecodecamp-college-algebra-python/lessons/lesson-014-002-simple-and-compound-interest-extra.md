---
id: lesson-014-002
title: Simple and Compound Interest: Extra
chapterId: chapter-14
order: 2
duration: 5
objectives:
  - Calculate future and present value for lump sums
  - Understand annuities and their future value formula
  - Apply the loan amortization formula
  - Compare investment options quantitatively
  - Build a Python loan calculator and amortization schedule generator
---

# Simple and Compound Interest: Extra

This lesson extends financial mathematics to annuities, loan amortization, and investment comparison — the practical applications that affect everyday financial decisions. We conclude with a Python amortization schedule generator.

## Future Value and Present Value Review

The two fundamental time-value-of-money calculations:

**Future Value (lump sum):**
$$FV = PV \left(1 + \frac{r}{n}\right)^{nt}$$

**Present Value (lump sum):**
$$PV = \frac{FV}{\left(1 + \frac{r}{n}\right)^{nt}}$$

**Example:** You want \$50,000 for a down payment in 5 years. Interest rate is 6% compounded monthly. How much do you need now?

$$PV = \frac{50000}{\left(1 + \frac{0.06}{12}\right)^{60}} = \frac{50000}{(1.005)^{60}} = \frac{50000}{1.34885} \approx \$37{,}069$$

## Annuities: Regular Payments

An **annuity** is a series of equal payments made at regular intervals.

### Future Value of an Annuity

If you deposit $PMT$ dollars every period at rate $r/n$ per period for $nt$ periods:

$$FV = PMT \cdot \frac{\left(1 + \frac{r}{n}\right)^{nt} - 1}{\frac{r}{n}}$$

**Example:** You save \$500/month at 7% compounded monthly for 30 years.

$$FV = 500 \cdot \frac{(1.005833)^{360} - 1}{0.005833}$$
$$FV = 500 \cdot \frac{8.1165 - 1}{0.005833} = 500 \cdot 1219.97 \approx \$609{,}985$$

You invested $500 \times 360 = \$180{,}000$ total, but compound growth turned it into over \$600,000.

```python
def annuity_fv(pmt, r, n, t):
    rate = r / n
    return pmt * ((1 + rate)**(n*t) - 1) / rate

fv = annuity_fv(500, 0.07, 12, 30)
print(f"Future value: ${fv:,.2f}")         # ~$609,985
print(f"Total contributed: ${500*12*30:,}") # $180,000
print(f"Interest earned: ${fv - 180000:,.2f}")
```

## Loan Amortization Formula

For a loan of $P$ dollars at annual rate $r$, compounded $n$ times per year, for $t$ years, the periodic payment is:

$$PMT = P \cdot \frac{\frac{r}{n}}{1 - \left(1 + \frac{r}{n}\right)^{-nt}}$$

**Example:** \$250,000 mortgage at 6.5% for 30 years, monthly payments.

$$PMT = 250000 \cdot \frac{0.005417}{1 - (1.005417)^{-360}} \approx \$1{,}580.17$$

Total paid: $1580.17 \times 360 = \$568{,}861$. Of that, \$318,861 is interest.

```python
def loan_payment(P, r, n, t):
    rate = r / n
    return P * rate / (1 - (1 + rate)**(-n*t))

pmt = loan_payment(250000, 0.065, 12, 30)
print(f"Monthly: ${pmt:,.2f} | Total interest: ${pmt*360 - 250000:,.2f}")
```

## Comparing Rates with Effective Annual Rate (EAR)

$$EAR = \left(1 + \frac{r}{n}\right)^n - 1$$

```python
ear_q = (1 + 0.055/4)**4 - 1    # 5.5% quarterly => 5.61%
ear_d = (1 + 0.054/365)**365 - 1 # 5.4% daily => 5.55%
print(f"5.5% quarterly EAR: {ear_q:.4%}, 5.4% daily EAR: {ear_d:.4%}")
```

## Python Amortization Schedule Generator

```python
def amortization_schedule(P, r, n, t):
    """Generate a complete amortization schedule"""
    rate = r / n
    periods = int(n * t)
    pmt = P * rate / (1 - (1 + rate)**(-periods))
    balance = P
    total_interest = 0

    print(f"Loan: ${P:,.2f} | Rate: {r*100:.1f}% | Payment: ${pmt:,.2f}")
    print(f"{'Month':>6} {'Principal':>10} {'Interest':>10} {'Balance':>12}")

    for month in range(1, periods + 1):
        interest = balance * rate
        principal = pmt - interest
        balance -= principal
        total_interest += interest
        if month <= 3 or month > periods - 2:
            print(f"{month:>6} {principal:>10,.2f} {interest:>10,.2f} {max(balance,0):>12,.2f}")
        elif month == 4:
            print(f"{'...':>6}")

    print(f"\nTotal interest: ${total_interest:,.2f}")

amortization_schedule(250000, 0.065, 12, 30)
```

Early payments are mostly interest; later payments are mostly principal.

## Investment Growth Plot

```python
import numpy as np
import matplotlib.pyplot as plt

t = np.arange(0, 31)
lump = 10000 * (1.07)**t
annuity = [200 * ((1 + 0.07/12)**(12*yr) - 1) / (0.07/12) for yr in t]

plt.plot(t, lump, label='$10k lump sum at 7%')
plt.plot(t, annuity, label='$200/month at 7%')
plt.xlabel('Years'); plt.ylabel('Value ($)')
plt.title('Lump Sum vs. Monthly Contributions')
plt.legend(); plt.grid(True); plt.show()
```

## Course Summary

Throughout this course you built a complete algebra toolkit: solving equations, systems of equations and matrix methods, linear/quadratic/polynomial functions, graphing and transformations, and financial mathematics — all reinforced with Python (SymPy, NumPy, Matplotlib).

## Key Takeaways

- Future and present value are inverse operations — one compounds forward, the other discounts back.
- Annuity formulas handle regular payment streams for savings and loans.
- The amortization formula determines loan payments; early payments are interest-heavy.
- Effective annual rate (EAR) enables fair comparison across different compounding frequencies.
- Python makes financial calculations transparent and reproducible.

---

*Based on the [freeCodeCamp College Algebra with Python Certification](https://www.freecodecamp.org/learn/college-algebra-with-python/)*

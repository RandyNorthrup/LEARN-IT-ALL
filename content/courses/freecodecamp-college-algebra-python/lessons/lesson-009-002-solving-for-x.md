---
id: lesson-009-002
title: Solving for X
chapterId: chapter-09
order: 2
duration: 5
objectives:
  - Solve literal equations for a specific variable
  - Solve rational equations and check for excluded values
  - Solve radical equations using the squaring technique
  - Identify and discard extraneous solutions
  - Use SymPy solve() workflows for advanced equations
---

# Solving for X

This lesson tackles advanced equation-solving scenarios: literal equations, rational equations, radical equations, and the critical habit of checking for extraneous solutions.

## Literal Equations

A **literal equation** contains multiple variables and you solve for one of them. Common examples are science and geometry formulas.

**Example:** Solve $A = \frac{1}{2}bh$ for $h$:

$$2A = bh \Rightarrow h = \frac{2A}{b}$$

**Example:** Solve $y = mx + b$ for $m$:

$$y - b = mx \Rightarrow m = \frac{y - b}{x}$$

```python
from sympy import symbols, Eq, solve

A, b, h = symbols('A b h')
result = solve(Eq(A, b * h / 2), h)
print(result)  # [2*A/b]
```

## Rational Equations

Rational equations contain fractions with variables in the denominator. The key step is to **identify excluded values** (values that make a denominator zero), then multiply through by the LCD.

**Example:** $\frac{3}{x} + \frac{1}{2} = \frac{5}{x}$

Excluded value: $x \neq 0$. Multiply every term by $2x$:

$$2x \cdot \frac{3}{x} + 2x \cdot \frac{1}{2} = 2x \cdot \frac{5}{x}$$
$$6 + x = 10 \Rightarrow x = 4$$

Since $4 \neq 0$, the solution is valid.

**Example with extraneous solution:** $\frac{x}{x-2} = \frac{2}{x-2} + 1$

Excluded value: $x \neq 2$. Multiply by $(x - 2)$:

$$x = 2 + (x - 2) \Rightarrow x = x$$

This is true for all $x$, but $x = 2$ is excluded. So the solution set is all real numbers except $x = 2$.

## Radical Equations

Isolate the radical, then raise both sides to the appropriate power.

**Example:** $\sqrt{x + 3} = 5$

1. Square both sides: $x + 3 = 25$
2. Solve: $x = 22$
3. Check: $\sqrt{22 + 3} = \sqrt{25} = 5$ ✓

**Example requiring a check:** $\sqrt{2x + 1} = x - 1$

1. Square both sides: $2x + 1 = x^2 - 2x + 1$
2. Rearrange: $x^2 - 4x = 0 \Rightarrow x(x - 4) = 0$
3. Candidates: $x = 0$ or $x = 4$
4. Check $x = 0$: $\sqrt{1} = -1$ → $1 \neq -1$ ✗ (extraneous!)
5. Check $x = 4$: $\sqrt{9} = 3$ → $3 = 3$ ✓

Only $x = 4$ is valid.

## Extraneous Solutions

Extraneous solutions are values that emerge from algebraic manipulation (like squaring both sides) but do not satisfy the original equation. They commonly arise with:

- **Rational equations** — a candidate may equal an excluded value
- **Radical equations** — squaring can introduce false positives
- **Absolute value equations** — rare but possible with nested expressions

**Rule:** Always substitute candidates back into the original equation.

## SymPy Solve Workflows

SymPy handles all these equation types. For radical and rational equations, it automatically filters many extraneous solutions.

```python
from sympy import symbols, Eq, solve, sqrt, Rational

x = symbols('x')

# Radical equation: sqrt(2x + 1) = x - 1
solutions = solve(Eq(sqrt(2*x + 1), x - 1), x)
print("Radical:", solutions)  # [4]  (0 is filtered automatically)

# Rational equation: 3/x + 1/2 = 5/x
solutions = solve(Eq(3/x + Rational(1, 2), 5/x), x)
print("Rational:", solutions)  # [4]

# Literal equation: solve PV = nRT for T
P, V, n, R, T = symbols('P V n R T')
result = solve(Eq(P * V, n * R * T), T)
print("Literal:", result)  # [P*V/(R*n)]
```

## Systematic Approach

1. Identify the equation type (linear, rational, radical, literal).
2. Note any restrictions on the variable (excluded values, domain constraints).
3. Apply appropriate algebraic steps to isolate $x$.
4. Check all candidates against the original equation.
5. Verify with SymPy for confidence.

```python
# Quick verification function
def verify(equation, variable, solutions):
    for s in solutions:
        result = equation.subs(variable, s)
        print(f"  x = {s}: LHS - RHS = {result.lhs - result.rhs} -> {'Valid' if result else 'Extraneous'}")

x = symbols('x')
eq = Eq(sqrt(2*x + 1), x - 1)
verify(eq, x, [0, 4])
```

## Key Takeaways

- Literal equations are solved with the same inverse operations — just treat the target variable as the unknown.
- For rational equations, always identify excluded values before solving.
- Squaring both sides of radical equations can introduce extraneous solutions — always check.
- SymPy is your safety net: it handles symbolic manipulation and often catches extraneous solutions automatically.

---

*Based on the [freeCodeCamp College Algebra with Python Certification](https://www.freecodecamp.org/learn/college-algebra-with-python/)*

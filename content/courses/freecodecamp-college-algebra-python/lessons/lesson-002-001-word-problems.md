---
id: lesson-002-001
title: Word Problems
chapterId: chapter-02
order: 1
duration: 5
objectives:
  - Identify key words in word problems that indicate mathematical operations
  - Translate English sentences into algebraic equations
  - Apply a systematic approach to solving word problems
  - Use SymPy's solve() function to verify solutions
---

# Word Problems: Translating Words to Equations

## The Systematic Approach

Word problems are where algebra meets the real world. The challenge is not the math — it is the translation from English to equations. Follow these steps every time:

1. **Read the problem carefully** — at least twice
2. **Identify the unknowns** — assign variables (x, y, etc.)
3. **Find relationships** — translate sentences to equations
4. **Solve** — use algebra or Python
5. **Check** — substitute back into the original problem

## Key Words and Their Operations

| English Phrase | Math Operation |
|---------------|----------------|
| sum, total, increased by, more than | Addition (+) |
| difference, decreased by, less than, fewer | Subtraction (-) |
| product, times, of, twice, triple | Multiplication (*) |
| quotient, divided by, per, ratio | Division (/) |
| is, equals, gives, results in | Equals (=) |
| at least | >= |
| at most, no more than | <= |

**Important:** "less than" reverses the order. "5 less than x" means x - 5, **not** 5 - x.

## Setting Up SymPy for Word Problems

```python
from sympy import symbols, Eq, solve

# Define your variables
x, y = symbols('x y')
```

## Worked Example 1: Age Problem

*"Maria is 4 years older than twice her son's age. If the sum of their ages is 64, how old is each person?"*

**Step 1 — Assign variables:**
- Let x = son's age
- Maria's age = 2x + 4 ("4 more than twice")

**Step 2 — Set up equation:**
- Sum of ages = 64: x + (2x + 4) = 64

**Step 3 — Solve with Python:**

```python
from sympy import symbols, Eq, solve

x = symbols('x')

# Sum of ages = 64
equation = Eq(x + (2*x + 4), 64)
solution = solve(equation, x)

son_age = solution[0]
maria_age = 2 * son_age + 4

print(f"Son's age: {son_age}")    # 20
print(f"Maria's age: {maria_age}")  # 44

# Check: 20 + 44 = 64 ✓, and 44 = 2(20) + 4 ✓
```

## Worked Example 2: Consecutive Integers

*"The sum of three consecutive odd integers is 87. Find the integers."*

Consecutive odd integers differ by 2: n, n+2, n+4

```python
from sympy import symbols, Eq, solve

n = symbols('n')

# Three consecutive odd integers sum to 87
equation = Eq(n + (n + 2) + (n + 4), 87)
solution = solve(equation, n)

first = solution[0]
print(f"The three integers: {first}, {first + 2}, {first + 4}")
# The three integers: 27, 29, 31

# Check: 27 + 29 + 31 = 87 ✓
```

## Worked Example 3: Money Problem

*"A cashier has 25 coins in nickels and dimes. The total value is $1.75. How many of each coin?"*

```python
from sympy import symbols, Eq, solve

n, d = symbols('n d')  # nickels and dimes

# Two equations from the problem
eq1 = Eq(n + d, 25)             # total coins = 25
eq2 = Eq(0.05*n + 0.10*d, 1.75) # total value = $1.75

solution = solve((eq1, eq2), (n, d))
print(f"Nickels: {solution[n]}")  # 15
print(f"Dimes: {solution[d]}")    # 10

# Check: 15 + 10 = 25 coins ✓
# Check: 15(0.05) + 10(0.10) = 0.75 + 1.00 = $1.75 ✓
```

## Worked Example 4: Geometry Problem

*"The length of a rectangular garden is 5 meters more than its width. If the area is 150 square meters, find the dimensions."*

```python
from sympy import symbols, Eq, solve

w = symbols('w')

# length = w + 5, area = length * width = 150
equation = Eq(w * (w + 5), 150)
solutions = solve(equation, w)

# Filter for positive solution (width must be positive)
for s in solutions:
    if s > 0:
        width = s
        length = s + 5
        print(f"Width: {width} m")   # 10 m
        print(f"Length: {length} m")  # 15 m

# Check: 10 * 15 = 150 ✓
```

## Building a Word Problem Solver

You can create a reusable function for common problem types:

```python
from sympy import symbols, Eq, solve

def solve_age_problem(total_age, age_relationship_multiplier, age_difference):
    """Solve: Person A is 'age_difference' more than
    'multiplier' times Person B's age. Total = total_age."""
    x = symbols('x')  # younger person's age
    older_age = age_relationship_multiplier * x + age_difference
    equation = Eq(x + older_age, total_age)
    solution = solve(equation, x)
    younger = solution[0]
    older = age_relationship_multiplier * younger + age_difference
    return int(younger), int(older)

# Maria problem: 4 more than twice, total 64
younger, older = solve_age_problem(64, 2, 4)
print(f"Younger: {younger}, Older: {older}")  # 20, 44
```

The key to word problems is practice. Every time you translate words to math, the process becomes more natural.

*Based on the [freeCodeCamp College Algebra with Python Certification](https://www.freecodecamp.org/learn/college-algebra-with-python/)*

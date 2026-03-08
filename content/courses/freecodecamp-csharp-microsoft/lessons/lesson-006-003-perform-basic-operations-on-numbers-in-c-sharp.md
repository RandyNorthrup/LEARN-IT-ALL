---
id: lesson-006-003
title: Perform Basic Operations on Numbers in C#
chapterId: chapter-06
order: 3
duration: 5
objectives:
  - Use arithmetic operators for calculations
  - Understand operator precedence and associativity
  - Distinguish integer division from floating-point division
  - Use increment and decrement operators
  - Apply Math class methods for common operations
---

# Perform Basic Operations on Numbers in C#

## Arithmetic Operators

C# supports all the standard arithmetic operators:

| Operator | Operation        | Example    | Result |
|----------|-----------------|------------|--------|
| `+`      | Addition        | `5 + 3`    | `8`    |
| `-`      | Subtraction     | `10 - 4`   | `6`    |
| `*`      | Multiplication  | `6 * 7`    | `42`   |
| `/`      | Division        | `15 / 4`   | `3`    |
| `%`      | Modulus (remainder) | `15 % 4` | `3`  |

```csharp
int a = 10;
int b = 3;

Console.WriteLine($"{a} + {b} = {a + b}");   // 13
Console.WriteLine($"{a} - {b} = {a - b}");   // 7
Console.WriteLine($"{a} * {b} = {a * b}");   // 30
Console.WriteLine($"{a} / {b} = {a / b}");   // 3  (integer division!)
Console.WriteLine($"{a} % {b} = {a % b}");   // 1
```

## Integer Division vs Floating-Point Division

When both operands are integers, C# performs **integer division** — the result is truncated, not rounded:

```csharp
int x = 7;
int y = 2;
Console.WriteLine(x / y);   // 3  (not 3.5)
```

To get a floating-point result, at least one operand must be a floating-point type:

```csharp
double result1 = 7.0 / 2;        // 3.5
double result2 = (double)7 / 2;   // 3.5  (cast one operand)
decimal result3 = 7m / 2;         // 3.5  (decimal literal)

Console.WriteLine(result1);  // 3.5
Console.WriteLine(result2);  // 3.5
Console.WriteLine(result3);  // 3.5
```

The modulus operator `%` returns the **remainder** after division and works with both integers and floating-point numbers:

```csharp
Console.WriteLine(10 % 3);      // 1
Console.WriteLine(10.5 % 3.0);  // 1.5
```

## Operator Precedence

C# follows standard mathematical order of operations (PEMDAS):

1. Parentheses `()`
2. Multiplication `*`, Division `/`, Modulus `%` (left to right)
3. Addition `+`, Subtraction `-` (left to right)

```csharp
int result = 2 + 3 * 4;        // 14  (not 20)
int grouped = (2 + 3) * 4;     // 20
int complex = 10 - 2 * 3 + 1;  // 5   (10 - 6 + 1)
```

When in doubt, use parentheses to make your intent explicit.

## Compound Assignment Operators

C# provides shorthand operators that combine arithmetic with assignment:

```csharp
int score = 100;
score += 10;   // score = score + 10  → 110
score -= 5;    // score = score - 5   → 105
score *= 2;    // score = score * 2   → 210
score /= 3;    // score = score / 3   → 70
score %= 40;   // score = score % 40  → 30

Console.WriteLine(score);  // 30
```

## Increment and Decrement Operators

The `++` and `--` operators increase or decrease a value by one:

```csharp
int count = 5;
count++;  // count is now 6
count--;  // count is now 5 again
```

They can be used as **prefix** or **postfix**, which matters when used in expressions:

```csharp
int a = 5;
int b = a++;  // b = 5 (assign first, then increment a to 6)
int c = ++a;  // c = 7 (increment a to 7 first, then assign)

Console.WriteLine($"a={a}, b={b}, c={c}");  // a=7, b=5, c=7
```

- **Postfix** (`a++`): returns the current value, *then* increments
- **Prefix** (`++a`): increments *first*, then returns the new value

## The Math Class

The `System.Math` class provides useful mathematical methods:

```csharp
// Powers and roots
Console.WriteLine(Math.Pow(2, 8));      // 256  (2^8)
Console.WriteLine(Math.Sqrt(144));      // 12

// Absolute value
Console.WriteLine(Math.Abs(-42));       // 42
Console.WriteLine(Math.Abs(42));        // 42

// Rounding
Console.WriteLine(Math.Round(3.7));     // 4
Console.WriteLine(Math.Round(3.5));     // 4  (banker's rounding)
Console.WriteLine(Math.Round(4.5));     // 4  (banker's rounding)
Console.WriteLine(Math.Round(3.14159, 2));  // 3.14

// Floor and Ceiling
Console.WriteLine(Math.Floor(3.9));     // 3
Console.WriteLine(Math.Ceiling(3.1));   // 4

// Min and Max
Console.WriteLine(Math.Min(10, 20));    // 10
Console.WriteLine(Math.Max(10, 20));    // 20
```

> **Note:** `Math.Round` uses **banker's rounding** (round half to even) by default. To always round .5 up, pass `MidpointRounding.AwayFromZero`:

```csharp
Console.WriteLine(Math.Round(3.5, MidpointRounding.AwayFromZero));  // 4
Console.WriteLine(Math.Round(4.5, MidpointRounding.AwayFromZero));  // 5
```

## Putting It Together

Here's a practical example that calculates the area and circumference of a circle:

```csharp
const double Pi = Math.PI;
double radius = 5.0;

double area = Pi * Math.Pow(radius, 2);
double circumference = 2 * Pi * radius;

Console.WriteLine($"Radius:        {radius}");
Console.WriteLine($"Area:          {Math.Round(area, 2)}");
Console.WriteLine($"Circumference: {Math.Round(circumference, 2)}");
```

Output:

```
Radius:        5
Area:          78.54
Circumference: 31.42
```

## Key Takeaways

- Integer division truncates; cast to `double` or `decimal` for precision
- Use parentheses to override default operator precedence
- Prefix `++a` and postfix `a++` differ when used in expressions
- The `Math` class provides `Pow`, `Sqrt`, `Abs`, `Round`, `Floor`, `Ceiling`, `Min`, and `Max`
- `Math.Round` defaults to banker's rounding

*Based on the [freeCodeCamp Foundational C# with Microsoft Certification](https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/)*

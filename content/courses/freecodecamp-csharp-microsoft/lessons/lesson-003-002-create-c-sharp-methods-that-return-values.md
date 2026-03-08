---
id: lesson-003-002
title: Create C# Methods that Return Values
chapterId: chapter-03
order: 2
duration: 5
objectives:
  - Write methods with return statements for various data types
  - Return multiple values using tuples and out parameters
  - Use expression-bodied methods for concise syntax
  - Implement method chaining patterns
---

# Create C# Methods that Return Values

Methods that return values are the workhorses of C# programs. They take input, process it, and send a result back to the caller. Mastering return values lets you build composable, testable logic.

## The return Statement

A method declares its return type before its name. The `return` statement sends a value back and immediately exits the method:

```csharp
static double CelsiusToFahrenheit(double celsius)
{
    return celsius * 9.0 / 5.0 + 32.0;
}

double temp = CelsiusToFahrenheit(100);
Console.WriteLine($"100°C = {temp}°F");  // Output: 100°C = 212°F
```

The compiler enforces that every code path returns a value. This won't compile:

```csharp
// ERROR: not all code paths return a value
static string GetGrade(int score)
{
    if (score >= 90)
        return "A";
    // Missing return for scores below 90!
}
```

You must ensure every possible branch returns:

```csharp
static string GetGrade(int score)
{
    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 70) return "C";
    if (score >= 60) return "D";
    return "F";
}
```

## Returning Multiple Values with Tuples

Sometimes a method needs to return more than one value. C# tuples make this elegant:

```csharp
static (double min, double max, double average) GetStats(double[] numbers)
{
    double min = numbers[0];
    double max = numbers[0];
    double sum = 0;

    foreach (double n in numbers)
    {
        if (n < min) min = n;
        if (n > max) max = n;
        sum += n;
    }

    return (min, max, sum / numbers.Length);
}

double[] scores = { 88, 92, 79, 95, 84 };
var stats = GetStats(scores);
Console.WriteLine($"Min: {stats.min}, Max: {stats.max}, Avg: {stats.average:F1}");
// Output: Min: 79, Max: 95, Avg: 87.6
```

You can also deconstruct tuples directly:

```csharp
var (lo, hi, avg) = GetStats(scores);
```

## Returning Multiple Values with out Parameters

The `out` keyword provides an alternative way to return multiple values, especially useful in the "Try" pattern:

```csharp
static bool TryDivide(double numerator, double denominator, out double result)
{
    if (denominator == 0)
    {
        result = 0;
        return false;
    }
    result = numerator / denominator;
    return true;
}

if (TryDivide(10, 3, out double quotient))
{
    Console.WriteLine($"Result: {quotient:F2}");  // Result: 3.33
}
else
{
    Console.WriteLine("Cannot divide by zero.");
}
```

## Expression-Bodied Methods

For methods whose body is a single expression, C# offers the `=>` shorthand:

```csharp
// Traditional
static int Square(int n)
{
    return n * n;
}

// Expression-bodied (equivalent)
static int Square(int n) => n * n;

// More examples
static bool IsEven(int n) => n % 2 == 0;
static string FullName(string first, string last) => $"{first} {last}";
static double CircleArea(double radius) => Math.PI * radius * radius;
```

Expression-bodied methods work for any return type and keep your code concise when the logic is simple.

## Returning Arrays and Collections

Methods can return arrays, lists, or any collection type:

```csharp
static int[] GetEvenNumbers(int start, int count)
{
    int[] evens = new int[count];
    int current = start % 2 == 0 ? start : start + 1;

    for (int i = 0; i < count; i++)
    {
        evens[i] = current;
        current += 2;
    }
    return evens;
}

int[] evenNums = GetEvenNumbers(1, 5);
Console.WriteLine(string.Join(", ", evenNums));  // Output: 2, 4, 6, 8, 10
```

## Method Chaining

When methods return values, you can chain calls — using one method's output as input to another:

```csharp
static string Sanitize(string input) => input.Trim();
static string Capitalize(string input) =>
    input.Length == 0 ? "" : char.ToUpper(input[0]) + input[1..].ToLower();

Console.WriteLine(Capitalize(Sanitize("  aLiCe  ")));  // Alice
```

You can also chain on return values directly:

```csharp
string result = "  Hello World  ".Trim().ToUpper().Replace(" ", "-");
// Output: HELLO-WORLD
```

This fluent pattern is the foundation of LINQ queries you'll encounter later.

## Practical Example: Grade Calculator

```csharp
static (string letter, string message) EvaluateGrade(double score)
{
    string letter = score switch
    {
        >= 90 => "A",
        >= 80 => "B",
        >= 70 => "C",
        >= 60 => "D",
        _     => "F"
    };

    string message = letter == "F" ? "See instructor for help." : "Keep up the good work!";
    return (letter, message);
}

var (grade, feedback) = EvaluateGrade(85);
Console.WriteLine($"Grade: {grade} — {feedback}");
// Output: Grade: B — Keep up the good work!
```

## Key Takeaways

- Every code path in a non-void method must return a value of the declared type
- Tuples provide a clean way to return multiple values with named fields
- `out` parameters are ideal for the Try-pattern (return bool + result)
- Expression-bodied methods (`=>`) reduce boilerplate for single-expression logic
- Method chaining makes code readable by composing small, focused methods

*Based on the [freeCodeCamp Foundational C# with Microsoft Certification](https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/)*

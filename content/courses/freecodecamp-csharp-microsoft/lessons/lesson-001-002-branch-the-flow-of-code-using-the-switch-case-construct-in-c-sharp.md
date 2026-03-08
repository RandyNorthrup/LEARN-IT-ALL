---
id: lesson-001-002
title: Branch the Flow of Code Using the switch-case Construct in C#
chapterId: chapter-01
order: 2
duration: 5
objectives:
  - Write switch statements with case labels, break, and default
  - Use switch expressions for concise value-returning switches
  - Apply pattern matching in switch with type patterns and when clauses
  - Decide when to use switch vs if-else chains
---

# Branch the Flow of Code Using the switch-case Construct in C#

When your code needs to compare a single value against many possible options, the `switch` construct is often cleaner and more readable than a chain of `if`/`else if` blocks. In this lesson, you will learn the classic `switch` statement, the modern `switch` expression, and the powerful pattern-matching features that make `switch` a first-class tool in C#.

## The Classic switch Statement

The `switch` statement evaluates an expression once and matches it against a series of `case` labels:

```csharp
Console.Write("Enter a day number (1-7): ");
int day = int.Parse(Console.ReadLine()!);

switch (day)
{
    case 1:
        Console.WriteLine("Monday");
        break;
    case 2:
        Console.WriteLine("Tuesday");
        break;
    case 3:
        Console.WriteLine("Wednesday");
        break;
    case 4:
        Console.WriteLine("Thursday");
        break;
    case 5:
        Console.WriteLine("Friday");
        break;
    case 6:
        Console.WriteLine("Saturday");
        break;
    case 7:
        Console.WriteLine("Sunday");
        break;
    default:
        Console.WriteLine("Invalid day number");
        break;
}
```

### Key Rules

1. **`break` is required** at the end of each case (unless you use `return`, `throw`, or `goto case`). C# does not allow fall-through between cases with code.
2. **`default` is optional** but recommended — it handles any value not matched by a case.
3. **Multiple case labels** can share a single block:

```csharp
switch (day)
{
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
        Console.WriteLine("Weekday");
        break;
    case 6:
    case 7:
        Console.WriteLine("Weekend");
        break;
    default:
        Console.WriteLine("Invalid");
        break;
}
```

### Switching on Strings

`switch` works with strings, using ordinal comparison by default:

```csharp
string command = "start";

switch (command.ToLower())
{
    case "start":
        Console.WriteLine("Starting the engine...");
        break;
    case "stop":
        Console.WriteLine("Stopping the engine...");
        break;
    case "status":
        Console.WriteLine("Engine is running.");
        break;
    default:
        Console.WriteLine($"Unknown command: {command}");
        break;
}
```

## Switch Expressions (C# 8+)

Switch expressions provide a more concise syntax when you need to **return a value** based on matching. They use the `=>` (arrow) operator instead of `case`/`break`:

```csharp
int dayNumber = 3;

string dayName = dayNumber switch
{
    1 => "Monday",
    2 => "Tuesday",
    3 => "Wednesday",
    4 => "Thursday",
    5 => "Friday",
    6 => "Saturday",
    7 => "Sunday",
    _ => "Invalid" // _ is the discard pattern (like default)
};

Console.WriteLine(dayName); // "Wednesday"
```

The `_` discard pattern serves the same purpose as `default`. Switch expressions are perfect for mapping one value to another:

```csharp
char grade = 'B';

string feedback = grade switch
{
    'A' => "Excellent work!",
    'B' => "Good job!",
    'C' => "Satisfactory.",
    'D' => "Needs improvement.",
    'F' => "Failed — please see instructor.",
    _ => "Invalid grade."
};

Console.WriteLine(feedback); // "Good job!"
```

## Pattern Matching in switch

C# allows you to match against more than just constant values. Pattern matching makes `switch` vastly more powerful.

### Type Patterns

Match based on the runtime type of an object:

```csharp
object data = 42;

string description = data switch
{
    int i => $"Integer: {i}",
    double d => $"Double: {d:F2}",
    string s => $"String of length {s.Length}: \"{s}\"",
    bool b => $"Boolean: {b}",
    null => "null value",
    _ => $"Unknown type: {data.GetType().Name}"
};

Console.WriteLine(description); // "Integer: 42"
```

### when Clauses (Case Guards)

Add extra conditions to a pattern with `when`:

```csharp
int score = 85;

string result = score switch
{
    >= 90 when score <= 100 => "A",
    >= 80 => "B",
    >= 70 => "C",
    >= 60 => "D",
    >= 0 => "F",
    _ => "Invalid score"
};

Console.WriteLine(result); // "B"
```

`when` clauses are especially useful with type patterns:

```csharp
object value = -5;

string analysis = value switch
{
    int n when n > 0 => "Positive integer",
    int n when n < 0 => "Negative integer",
    int => "Zero",
    double d when d > 0 => "Positive double",
    double => "Non-positive double",
    _ => "Not a number"
};

Console.WriteLine(analysis); // "Negative integer"
```

### Relational Patterns (C# 9+)

```csharp
double temperature = 72.5;

string comfort = temperature switch
{
    < 32 => "Freezing",
    < 50 => "Cold",
    < 65 => "Cool",
    < 80 => "Comfortable",
    < 95 => "Warm",
    _ => "Dangerously hot"
};

Console.WriteLine(comfort); // "Comfortable"
```

### Combining Patterns with and, or, not

```csharp
int month = 3;

string season = month switch
{
    3 or 4 or 5 => "Spring",
    6 or 7 or 8 => "Summer",
    9 or 10 or 11 => "Autumn",
    12 or 1 or 2 => "Winter",
    _ => "Invalid month"
};

Console.WriteLine(season); // "Spring"
```

## switch Statement vs switch Expression

| Feature | Statement | Expression |
|---------|-----------|------------|
| Returns a value | No (executes code) | Yes |
| Fall-through | Not allowed (must `break`) | N/A |
| Pattern matching | Yes | Yes |
| Multiple statements per case | Yes | No (single expression per arm) |
| `default` keyword | `default:` | `_` discard |

**Rule of thumb:** Use a switch **expression** when you are mapping an input to a single output value. Use a switch **statement** when each case requires multiple lines of code.

## switch vs if-else — When to Use Each

| Scenario | Prefer |
|----------|--------|
| Comparing one variable to many constants | `switch` |
| Range checks or complex conditions | `if`/`else` |
| Type-based dispatch | `switch` with type patterns |
| Two or three simple conditions | `if`/`else` |
| Mapping a value to another value | Switch expression |

```csharp
// switch is cleaner here
string fruit = "apple";
decimal price = fruit switch
{
    "apple" => 1.20m,
    "banana" => 0.75m,
    "cherry" => 3.50m,
    _ => 0m
};

// if-else is better for range logic (though switch can do it too)
if (price > 2.00m)
    Console.WriteLine("Expensive");
else if (price > 1.00m)
    Console.WriteLine("Moderate");
else
    Console.WriteLine("Cheap");
```

## Recap

- The **`switch` statement** matches a value against case labels, requires `break`, and supports a `default` case.
- **Switch expressions** (C# 8+) use `=>` arrows and `_` discard for concise value-returning switches.
- **Pattern matching** enables type patterns, relational patterns, `when` guards, and combined `and`/`or`/`not` patterns.
- Choose `switch` when comparing one value against many options; choose `if`/`else` for complex or range-based conditions.

*Based on the [freeCodeCamp Foundational C# with Microsoft Certification](https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/)*

---
id: lesson-001-005
title: Evaluate Boolean Expressions to Make Decisions in C#
chapterId: chapter-01
order: 5
duration: 5
objectives:
  - Build and evaluate boolean expressions using comparison and logical operators
  - Use the conditional (ternary) operator for inline decisions
  - Apply the conditional access operator (?.) and null-coalescing operator (??)
  - Use pattern matching with the is keyword
  - Write methods that return bool for reusable condition checks
---

# Evaluate Boolean Expressions to Make Decisions in C#

Every decision your program makes boils down to a boolean expression — something that evaluates to `true` or `false`. In this lesson, you will deepen your understanding of boolean logic beyond simple `if` statements and learn the operators and patterns that make decision-making code concise and safe.

## Boolean Expressions Review

A boolean expression uses comparison operators to produce a `true`/`false` result:

```csharp
int age = 25;
bool isAdult = age >= 18;          // true
bool isTeenager = age >= 13 && age <= 19; // false
bool isMinorOrSenior = age < 18 || age >= 65; // false
```

### Comparison Operators

| Operator | Meaning | Example |
|----------|---------|---------|
| `==` | Equal to | `x == 5` |
| `!=` | Not equal to | `x != 0` |
| `>` | Greater than | `x > 10` |
| `<` | Less than | `x < 100` |
| `>=` | Greater than or equal | `x >= 0` |
| `<=` | Less than or equal | `x <= 255` |

### Logical Operators

| Operator | Meaning | Short-circuits? |
|----------|---------|-----------------|
| `&&` | AND | Yes — skips right side if left is `false` |
| `\|\|` | OR | Yes — skips right side if left is `true` |
| `!` | NOT | N/A |

```csharp
string? name = "Alice";
bool isValid = name != null && name.Length > 0; // Safe: if name is null, Length is never accessed
```

Short-circuit evaluation is not just an optimization — it prevents runtime errors by skipping potentially dangerous operations.

## Methods That Return bool

Extracting conditions into methods makes your code self-documenting:

```csharp
bool IsEligibleToVote(int age, bool isCitizen)
{
    return age >= 18 && isCitizen;
}

bool IsLeapYear(int year)
{
    return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
}

// Usage reads like English
if (IsEligibleToVote(25, true))
{
    Console.WriteLine("You can vote!");
}

Console.WriteLine($"2024 is a leap year: {IsLeapYear(2024)}"); // True
```

Many built-in types also have methods that return `bool`:

```csharp
string input = "  ";
bool isEmpty = string.IsNullOrEmpty(input);      // false (has spaces)
bool isBlank = string.IsNullOrWhiteSpace(input);  // true

int[] numbers = { 2, 4, 6, 8 };
bool allEven = Array.TrueForAll(numbers, n => n % 2 == 0); // true
```

## The Conditional (Ternary) Operator

The `?:` operator is a compact alternative to simple `if`/`else` blocks:

```csharp
// Syntax: condition ? valueIfTrue : valueIfFalse

int temperature = 35;
string weather = temperature > 30 ? "Hot" : "Pleasant";
Console.WriteLine(weather); // "Hot"

// Works in string interpolation
int score = 85;
Console.WriteLine($"Result: {(score >= 70 ? "Pass" : "Fail")}"); // "Pass"

// Nested ternary (use sparingly — can hurt readability)
string grade = score >= 90 ? "A"
             : score >= 80 ? "B"
             : score >= 70 ? "C"
             : "F";
Console.WriteLine($"Grade: {grade}"); // "B"
```

> **Best practice:** Use the ternary operator for simple, one-line decisions. For complex logic, stick with `if`/`else` for readability.

## The Conditional Access Operator (?.)

The `?.` operator safely accesses members of an object that might be `null`. If the object is `null`, the entire expression evaluates to `null` instead of throwing a `NullReferenceException`:

```csharp
string? name = null;

// Without ?. — would throw NullReferenceException
// int length = name.Length;

// With ?. — safely returns null
int? length = name?.Length;
Console.WriteLine(length); // (nothing — null)

// Chain multiple levels
string?[] names = { "Alice", null, "Charlie" };
int? secondLength = names[1]?.Length;
Console.WriteLine(secondLength.HasValue); // False
```

Use `?.` with method calls too:

```csharp
string? text = null;
string? upper = text?.ToUpper(); // null — no exception
```

## The Null-Coalescing Operator (??)

The `??` operator provides a default value when the left side is `null`:

```csharp
string? userInput = null;
string displayName = userInput ?? "Anonymous";
Console.WriteLine(displayName); // "Anonymous"

// Combine with ?.
string? name = null;
int nameLength = name?.Length ?? 0;
Console.WriteLine(nameLength); // 0
```

### The Null-Coalescing Assignment Operator (??=)

Assigns a value only if the variable is currently `null`:

```csharp
string? greeting = null;
greeting ??= "Hello, World!";
Console.WriteLine(greeting); // "Hello, World!"

greeting ??= "This won't be assigned";
Console.WriteLine(greeting); // Still "Hello, World!"
```

## Pattern Matching with `is`

The `is` keyword lets you test a value against a pattern. It goes far beyond simple type checking:

### Type Pattern

```csharp
object value = 42;

if (value is int number)
{
    Console.WriteLine($"It's an integer: {number}");
}

// Works with any type
object data = "Hello";
if (data is string text)
{
    Console.WriteLine($"String of length {text.Length}");
}
```

### Constant Pattern

```csharp
int? nullableValue = null;
if (nullableValue is null)
{
    Console.WriteLine("Value is null");
}

int status = 404;
if (status is 404)
{
    Console.WriteLine("Not found");
}
```

### Relational and Logical Patterns (C# 9+)

```csharp
int age = 25;

string category = age switch
{
    < 13 => "Child",
    >= 13 and < 18 => "Teenager",
    >= 18 and < 65 => "Adult",
    >= 65 => "Senior",
};
Console.WriteLine(category); // "Adult"

// Using 'or' pattern
if (age is < 13 or >= 65)
{
    Console.WriteLine("Reduced ticket price");
}

// Negation with 'not'
if (age is not 0)
{
    Console.WriteLine("Valid age");
}
```

### Combining ?., ??, and Pattern Matching

These operators work beautifully together for defensive, null-safe code:

```csharp
string? GetUserEmail(int userId)
{
    // Simulated lookup — might return null
    return userId == 1 ? "alice@example.com" : null;
}

string? email = GetUserEmail(2);

// Pattern matching + null coalescing
string display = email is string e && e.Contains('@')
    ? e
    : "No valid email";

Console.WriteLine(display); // "No valid email"
```

## Recap

- Boolean expressions combine comparison (`==`, `!=`, `>`, `<`) and logical operators (`&&`, `||`, `!`).
- The **ternary operator** (`?:`) provides compact inline decisions.
- The **conditional access operator** (`?.`) prevents `NullReferenceException` by returning `null` when the object is `null`.
- The **null-coalescing operator** (`??`) supplies default values; `??=` assigns only when `null`.
- **Pattern matching** with `is` enables type checks, constant checks, and relational logic in a single, readable expression.

*Based on the [freeCodeCamp Foundational C# with Microsoft Certification](https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/)*

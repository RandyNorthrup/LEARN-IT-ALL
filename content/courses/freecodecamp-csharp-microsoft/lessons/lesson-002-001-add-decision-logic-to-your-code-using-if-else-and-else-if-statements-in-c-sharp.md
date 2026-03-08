---
id: lesson-002-001
title: Add Decision Logic to Your Code Using if, else, and else if statements in C#
chapterId: chapter-02
order: 1
duration: 5
objectives:
  - Write if, else, and else-if statements for conditional logic
  - Use comparison operators to form boolean expressions
  - Combine conditions with logical operators (&&, ||, !)
  - Nest conditionals and use the ternary operator
---

# Add Decision Logic to Your Code Using if, else, and else if Statements in C#

## Boolean Expressions

Before diving into `if` statements, you need to understand **boolean expressions** — expressions that evaluate to `true` or `false`.

C# provides these **comparison operators**:

| Operator | Meaning                  | Example      | Result  |
|----------|--------------------------|--------------|---------|
| `==`     | Equal to                 | `5 == 5`     | `true`  |
| `!=`     | Not equal to             | `5 != 3`     | `true`  |
| `>`      | Greater than             | `10 > 7`     | `true`  |
| `<`      | Less than                | `3 < 1`      | `false` |
| `>=`     | Greater than or equal to | `5 >= 5`     | `true`  |
| `<=`     | Less than or equal to    | `4 <= 3`     | `false` |

```csharp
int age = 20;
bool isAdult = age >= 18;        // true
bool isTeenager = age >= 13 && age <= 19;  // false (age is 20)
Console.WriteLine(isAdult);      // True
Console.WriteLine(isTeenager);   // False
```

## The if Statement

An `if` statement executes a block of code only when a condition is `true`:

```csharp
int temperature = 35;

if (temperature > 30)
{
    Console.WriteLine("It's hot outside!");
}
```

If the condition is `false`, the code block is simply skipped.

## The if-else Statement

Add an `else` block to execute code when the condition is `false`:

```csharp
int score = 72;

if (score >= 60)
{
    Console.WriteLine("You passed!");
}
else
{
    Console.WriteLine("You failed. Try again.");
}
// Output: You passed!
```

## The else-if Chain

Use `else if` to test multiple conditions in sequence:

```csharp
int score = 85;

if (score >= 90)
{
    Console.WriteLine("Grade: A");
}
else if (score >= 80)
{
    Console.WriteLine("Grade: B");
}
else if (score >= 70)
{
    Console.WriteLine("Grade: C");
}
else if (score >= 60)
{
    Console.WriteLine("Grade: D");
}
else
{
    Console.WriteLine("Grade: F");
}
// Output: Grade: B
```

Only the **first** matching branch executes. Once a condition is `true`, the remaining `else if` and `else` blocks are skipped.

## Logical Operators

Combine multiple conditions with logical operators:

| Operator | Name | Description                               |
|----------|------|-------------------------------------------|
| `&&`     | AND  | `true` only if **both** sides are `true`  |
| `\|\|`  | OR   | `true` if **either** side is `true`       |
| `!`      | NOT  | Inverts a boolean value                   |

```csharp
int age = 25;
bool hasLicense = true;

// AND: both conditions must be true
if (age >= 16 && hasLicense)
{
    Console.WriteLine("You can drive.");
}

// OR: at least one condition must be true
string day = "Saturday";
if (day == "Saturday" || day == "Sunday")
{
    Console.WriteLine("It's the weekend!");
}

// NOT: invert a condition
bool isRaining = false;
if (!isRaining)
{
    Console.WriteLine("No umbrella needed.");
}
```

### Short-Circuit Evaluation

C# uses **short-circuit evaluation**:
- With `&&`, if the left side is `false`, the right side is not evaluated
- With `||`, if the left side is `true`, the right side is not evaluated

This is useful for avoiding errors:

```csharp
string? name = null;

// Safe: if name is null, the second condition is never evaluated
if (name != null && name.Length > 0)
{
    Console.WriteLine($"Hello, {name}");
}
```

## Nesting Conditionals

You can place `if` statements inside other `if` statements:

```csharp
int age = 25;
bool isStudent = true;

if (age >= 18)
{
    Console.WriteLine("You are an adult.");

    if (isStudent)
    {
        Console.WriteLine("You qualify for a student discount.");
    }
}
else
{
    Console.WriteLine("You are a minor.");
}
```

Keep nesting shallow (1–2 levels) for readability. Consider refactoring deeply nested code into methods.

## The Ternary Operator

The **ternary operator** `? :` is a compact inline `if-else`:

```csharp
condition ? valueIfTrue : valueIfFalse
```

```csharp
int age = 20;
string status = age >= 18 ? "Adult" : "Minor";
Console.WriteLine(status);  // Adult

// You can use it directly in expressions
int score = 85;
Console.WriteLine($"Result: {(score >= 60 ? "Pass" : "Fail")}");
// Output: Result: Pass
```

Use the ternary operator for simple conditions. For complex logic, stick with `if/else`.

## Practical Example: Login Validator

```csharp
string username = "admin";
string password = "secure123";
int loginAttempts = 2;
const int MaxAttempts = 3;

if (loginAttempts >= MaxAttempts)
{
    Console.WriteLine("Account locked. Too many attempts.");
}
else if (username == "admin" && password == "secure123")
{
    Console.WriteLine("Login successful! Welcome, admin.");
}
else
{
    int remaining = MaxAttempts - loginAttempts;
    Console.WriteLine($"Invalid credentials. {remaining} attempt(s) remaining.");
}
```

## Key Takeaways

- `if` executes code when a condition is `true`; `else` handles the `false` case
- `else if` chains let you test multiple conditions in sequence
- Comparison operators (`==`, `!=`, `>`, `<`, `>=`, `<=`) produce boolean results
- Logical operators (`&&`, `||`, `!`) combine or invert conditions with short-circuit evaluation
- The ternary operator (`? :`) provides a compact inline conditional
- Keep nesting shallow for readable code

*Based on the [freeCodeCamp Foundational C# with Microsoft Certification](https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/)*

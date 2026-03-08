---
id: lesson-003-005
title: Write Your First C# Method
chapterId: chapter-03
order: 5
duration: 5
objectives:
  - Understand method syntax including access modifiers, return types, and parameters
  - Distinguish between void and returning methods
  - Create and call static methods
  - Explain the benefits of code reuse through methods
---

# Write Your First C# Method

Methods are the building blocks of well-organized C# programs. A **method** is a named block of code that performs a specific task. Instead of writing the same logic repeatedly, you define it once inside a method and call that method whenever you need it.

## Why Use Methods?

Without methods, all your code lives in a single `Main` block and quickly becomes unmanageable. Methods provide:

- **Code reuse** — write logic once, call it many times
- **Readability** — descriptive method names make code self-documenting
- **Maintainability** — fix a bug in one place instead of everywhere
- **Testability** — isolate logic into units you can verify independently

## Method Syntax

Every C# method follows this general structure:

```csharp
accessModifier returnType MethodName(parameterList)
{
    // method body
}
```

Here is a concrete example:

```csharp
static void SayHello()
{
    Console.WriteLine("Hello, world!");
}
```

Let's break down each component:

| Component | Description |
|-----------|-------------|
| `static` | The method belongs to the class itself, not an instance |
| `void` | The method does not return a value |
| `SayHello` | The method name (PascalCase by convention) |
| `()` | Empty parameter list — no input required |

## Calling a Method

To execute a method, use its name followed by parentheses:

```csharp
SayHello();   // Output: Hello, world!
SayHello();   // You can call it as many times as you like
```

## void vs. Returning Methods

A `void` method performs an action but does not produce a result the caller can use:

```csharp
static void PrintSeparator()
{
    Console.WriteLine("-------------------");
}
```

A **returning method** computes a value and sends it back to the caller with the `return` keyword:

```csharp
static int Add(int a, int b)
{
    return a + b;
}

// Usage:
int sum = Add(3, 5);
Console.WriteLine(sum);  // Output: 8
```

The return type (`int` in this case) must match the type of the value returned.

## Methods with Parameters

Parameters let you pass data into a method so it can work with different inputs each time:

```csharp
static void Greet(string name)
{
    Console.WriteLine($"Welcome, {name}!");
}

Greet("Alice");   // Output: Welcome, Alice!
Greet("Bob");     // Output: Welcome, Bob!
```

You can define multiple parameters separated by commas:

```csharp
static double CalculateArea(double width, double height)
{
    return width * height;
}

double area = CalculateArea(4.5, 3.0);
Console.WriteLine($"Area: {area}");  // Output: Area: 13.5
```

## Method Signatures

A **method signature** is the combination of the method's name and its parameter types. C# uses signatures to distinguish between methods. Two methods can share a name if their parameter lists differ — this is called **method overloading**:

```csharp
static int Multiply(int a, int b)
{
    return a * b;
}

static double Multiply(double a, double b)
{
    return a * b;
}

Console.WriteLine(Multiply(3, 4));       // Calls int version → 12
Console.WriteLine(Multiply(2.5, 4.0));   // Calls double version → 10.0
```

## Static Methods

In a top-level statements program (the default in .NET 8), any methods you define are implicitly static and local. In a class-based program, you mark methods with `static` when they don't need access to instance data:

```csharp
class MathHelper
{
    public static int Square(int number)
    {
        return number * number;
    }
}

// Called on the class, not an instance:
int result = MathHelper.Square(7);  // 49
```

You've already used many static methods — `Console.WriteLine()`, `int.Parse()`, and `Math.Max()` are all static methods provided by the .NET libraries.

## Putting It All Together

Here is a program demonstrating multiple methods:

```csharp
string[] names = { "Alice", "Bob", "Charlie" };

PrintHeader("Guest List");
foreach (string name in names)
{
    PrintGuest(name);
}
Console.WriteLine($"Total guests: {CountGuests(names)}");

static void PrintHeader(string title)
{
    Console.WriteLine("========================");
    Console.WriteLine($"  {title}");
    Console.WriteLine("========================");
}

static void PrintGuest(string name)
{
    Console.WriteLine($"  - {name}");
}

static int CountGuests(string[] guests)
{
    return guests.Length;
}
```

Output:

```
========================
  Guest List
========================
  - Alice
  - Bob
  - Charlie
Total guests: 3
```

Notice how each method has a single, clear responsibility. This makes the top-level code read almost like plain English.

## Key Takeaways

- A method is a reusable block of code with a name, optional parameters, and an optional return value
- Use `void` when a method performs an action without returning data
- Use a specific return type (`int`, `string`, `bool`, etc.) when the caller needs a result
- Method overloading lets you create multiple methods with the same name but different parameters
- `static` methods belong to the class and don't require an instance to call

*Based on the [freeCodeCamp Foundational C# with Microsoft Certification](https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/)*

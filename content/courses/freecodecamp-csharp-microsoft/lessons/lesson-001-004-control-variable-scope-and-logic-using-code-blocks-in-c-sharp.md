---
id: lesson-001-004
title: Control Variable Scope and Logic Using Code Blocks in C#
chapterId: chapter-01
order: 4
duration: 5
objectives:
  - Understand how code blocks define variable scope in C#
  - Distinguish between block scope, method scope, and class scope
  - Recognize that C# disallows variable shadowing in nested scopes
  - Apply best practices for variable declaration placement
---

# Control Variable Scope and Logic Using Code Blocks in C#

Every variable in C# has a **scope** — the region of code where it can be accessed. Understanding scope is essential for writing bug-free code, avoiding naming conflicts, and managing memory effectively. In this lesson, you will learn how curly braces create scope boundaries and how to declare variables in the right place.

## What Is a Code Block?

A code block is any section of code enclosed in curly braces `{ }`. Code blocks appear in `if` statements, loops, methods, classes, and more:

```csharp
if (true)
{                       // Code block starts
    int x = 10;         // x exists only inside this block
    Console.WriteLine(x);
}                       // Code block ends — x is no longer accessible

// Console.WriteLine(x); // ERROR: x does not exist here
```

## Block Scope

Variables declared inside a code block are only accessible within that block and any nested blocks inside it. They are created when the block is entered and destroyed when the block is exited:

```csharp
{
    int outer = 1;

    {
        int inner = 2;
        Console.WriteLine(outer);  // OK — outer is accessible in nested block
        Console.WriteLine(inner);  // OK — inner is declared in this block
    }

    Console.WriteLine(outer);      // OK — still in outer's block
    // Console.WriteLine(inner);   // ERROR — inner's block has ended
}
```

### Scope in if/else Blocks

```csharp
bool isLoggedIn = true;

if (isLoggedIn)
{
    string greeting = "Welcome back!";
    Console.WriteLine(greeting);
}
else
{
    string greeting = "Please log in."; // Different variable — different block
    Console.WriteLine(greeting);
}

// Console.WriteLine(greeting); // ERROR — greeting only exists inside its block
```

Each branch of an `if`/`else` is a separate scope. If you need the variable after the block, declare it **before** the `if`:

```csharp
string greeting;

if (isLoggedIn)
{
    greeting = "Welcome back!";
}
else
{
    greeting = "Please log in.";
}

Console.WriteLine(greeting); // OK — declared before the if block
```

### Scope in Loops

Loop variables follow the same rules:

```csharp
for (int i = 0; i < 3; i++)
{
    string message = $"Iteration {i}";
    Console.WriteLine(message);
}

// Console.WriteLine(i);       // ERROR — i is scoped to the for loop
// Console.WriteLine(message); // ERROR — message is scoped to the loop body
```

If you need the loop counter after the loop, declare it before:

```csharp
int i;
for (i = 0; i < 10; i++)
{
    if (i == 7)
        break;
}
Console.WriteLine($"Loop exited at i = {i}"); // OK — i is declared outside
```

## Method Scope

Variables declared inside a method (but outside any inner block) are accessible throughout the entire method from the point of declaration:

```csharp
void ProcessOrder()
{
    int orderId = 42;        // Method scope — accessible everywhere below
    decimal total = 0m;

    for (int i = 0; i < 5; i++)
    {
        total += 10.50m;      // Can access 'total' in this inner block
    }

    Console.WriteLine($"Order {orderId}: {total:C}");
}
```

## Class Scope (Fields)

Variables declared at the class level (fields) are accessible to all methods in the class:

```csharp
class Player
{
    // Class scope — accessible to all methods
    private string name = "Hero";
    private int health = 100;
    private int score = 0;

    public void TakeDamage(int damage)
    {
        health -= damage;     // Can access class field
        if (health <= 0)
        {
            health = 0;
            Console.WriteLine($"{name} has been defeated!");
        }
    }

    public void AddScore(int points)
    {
        score += points;      // Can access class field
        Console.WriteLine($"{name}'s score: {score}");
    }
}
```

## Variable Shadowing — Not Allowed in C#

Some languages allow an inner variable to have the same name as an outer variable (called "shadowing"). **C# does not allow this within a method:**

```csharp
void Example()
{
    int x = 10;

    if (true)
    {
        // int x = 20; // COMPILE ERROR: A local variable named 'x'
                       // cannot be declared in this scope because
                       // it may have a different meaning in an enclosing scope
    }
}
```

This rule prevents subtle bugs where you accidentally use the wrong variable. However, method parameters can share names with class fields — in that case, use `this` to disambiguate:

```csharp
class Account
{
    private decimal balance;

    public void SetBalance(decimal balance)
    {
        this.balance = balance; // this.balance = field, balance = parameter
    }
}
```

## Scope Rules Summary

| Scope Level | Declared In | Accessible To |
|-------------|------------|---------------|
| Block | `if`, `for`, `while`, etc. | Only within that block and nested blocks |
| Method | Inside a method, outside inner blocks | Entire method from point of declaration |
| Class | As a field in a class | All methods in the class |
| Namespace/Global | Top-level or namespace level | Depends on access modifiers |

## Impact on if/for/while Blocks

Understanding scope changes how you structure your code:

```csharp
// Pattern 1: Declare inside when only needed inside
for (int i = 0; i < 10; i++)
{
    double squareRoot = Math.Sqrt(i); // Only needed inside the loop
    Console.WriteLine($"√{i} = {squareRoot:F2}");
}

// Pattern 2: Declare outside when needed after the block
bool found = false;
int foundIndex = -1;

for (int i = 0; i < data.Length; i++)
{
    if (data[i] == target)
    {
        found = true;
        foundIndex = i;
        break;
    }
}

if (found)
{
    Console.WriteLine($"Found at index {foundIndex}");
}
```

## Best Practices for Variable Declaration

### 1. Declare Variables as Close to Their Use as Possible

```csharp
// Less ideal — declared far from usage
int result;
// ... 20 lines of other code ...
result = CalculateSomething();

// Better — declared right where it's used
// ... 20 lines of other code ...
int result = CalculateSomething();
```

### 2. Use the Narrowest Scope That Works

```csharp
// Less ideal — counter is accessible after the loop but never used
int counter = 0;
while (counter < 10)
{
    Console.WriteLine(counter);
    counter++;
}

// Better — use a for loop to limit scope automatically
for (int counter = 0; counter < 10; counter++)
{
    Console.WriteLine(counter);
}
```

### 3. Avoid Reusing Variable Names Across Different Contexts

```csharp
// Confusing — same name for different purposes
int temp = GetTemperature();
Console.WriteLine(temp);
// ... later ...
int temp2 = GetUserInput(); // Had to rename because temp was already taken

// Clearer — descriptive names avoid conflicts
int currentTemperature = GetTemperature();
int userSelection = GetUserInput();
```

### 4. Initialize Variables at Declaration When Possible

```csharp
// C# requires definite assignment — you cannot use a variable that
// might not have been assigned
int value;
if (someCondition)
{
    value = 42;
}
// Console.WriteLine(value); // ERROR: 'value' might not be assigned

// Fix: initialize at declaration
int value2 = 0;
if (someCondition)
{
    value2 = 42;
}
Console.WriteLine(value2); // OK — guaranteed to be assigned
```

## Recap

- **Code blocks** (`{ }`) create scope boundaries — variables declared inside are not accessible outside.
- Variables should be declared in the **narrowest scope** that serves your needs.
- **C# does not allow variable shadowing** within a method, preventing accidental name collisions.
- Declare variables **close to their first use** and **initialize them at declaration** when possible.
- Use `this` to disambiguate between class fields and parameters with the same name.

*Based on the [freeCodeCamp Foundational C# with Microsoft Certification](https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/)*

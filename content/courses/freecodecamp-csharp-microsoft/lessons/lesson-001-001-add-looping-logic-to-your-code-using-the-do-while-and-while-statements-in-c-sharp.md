---
id: lesson-001-001
title: Add Looping Logic to Your Code Using the do-while and while Statements in C#
chapterId: chapter-01
order: 1
duration: 5
objectives:
  - Write while loops that repeat based on a boolean condition
  - Write do-while loops that execute at least once before checking the condition
  - Choose between while and do-while based on the use case
  - Use break and continue to control loop flow
  - Implement input validation patterns with do-while
---

# Add Looping Logic to Your Code Using the do-while and while Statements in C#

Loops let your program repeat a block of code until a condition changes. The `while` and `do-while` loops are condition-based — they keep running as long as a boolean expression is `true`. Unlike the `for` loop, they do not require a counter variable, making them ideal for scenarios where you do not know in advance how many iterations are needed.

## The while Loop

A `while` loop evaluates its condition **before** each iteration. If the condition is `false` from the start, the body never executes:

```csharp
int count = 0;

while (count < 5)
{
    Console.WriteLine($"Count: {count}");
    count++;
}
// Output: Count: 0, Count: 1, Count: 2, Count: 3, Count: 4
```

If `count` started at 5 or higher, the loop body would never run.

### Reading Until End of Input

A classic `while` use case — keep processing until there is no more data:

```csharp
Console.WriteLine("Enter numbers (type 'done' to stop):");
int total = 0;
int itemCount = 0;

string? input = Console.ReadLine();

while (input != null && input.ToLower() != "done")
{
    if (int.TryParse(input, out int number))
    {
        total += number;
        itemCount++;
    }
    else
    {
        Console.WriteLine($"'{input}' is not a valid number. Skipping.");
    }

    input = Console.ReadLine();
}

if (itemCount > 0)
{
    Console.WriteLine($"Sum: {total}, Average: {(double)total / itemCount:F1}");
}
```

## The do-while Loop

A `do-while` loop evaluates its condition **after** each iteration, guaranteeing the body executes **at least once**:

```csharp
int count = 10;

do
{
    Console.WriteLine($"Count: {count}");
    count++;
} while (count < 5);

// Output: Count: 10
// The body ran once even though count (10) is not less than 5
```

### Syntax Comparison

```csharp
// while — condition checked FIRST
while (condition)
{
    // May never execute
}

// do-while — condition checked AFTER
do
{
    // Always executes at least once
} while (condition); // Note the semicolon!
```

## Input Validation with do-while

The `do-while` loop is the natural choice for input validation because you always need to ask at least once:

```csharp
int userAge;

do
{
    Console.Write("Enter your age (1-120): ");
    string? input = Console.ReadLine();

    if (int.TryParse(input, out userAge) && userAge >= 1 && userAge <= 120)
    {
        break; // Valid input — exit the loop
    }

    Console.WriteLine("Invalid input. Please enter a number between 1 and 120.");

} while (true); // Loop forever until break

Console.WriteLine($"Your age: {userAge}");
```

A variation using the condition directly (no `break`):

```csharp
string? password;
int attempts = 0;
const int maxAttempts = 3;

do
{
    Console.Write($"Enter password (attempt {attempts + 1}/{maxAttempts}): ");
    password = Console.ReadLine();
    attempts++;

    if (password == "secret123")
    {
        Console.WriteLine("Access granted!");
        break;
    }
    else
    {
        Console.WriteLine("Incorrect password.");
    }

} while (attempts < maxAttempts);

if (password != "secret123")
{
    Console.WriteLine("Account locked. Too many failed attempts.");
}
```

## when to Use while vs do-while

| Scenario | Best Choice | Why |
|----------|-------------|-----|
| Might not need to execute at all | `while` | Checks condition first |
| Must execute at least once | `do-while` | Checks condition after |
| User input validation | `do-while` | Must prompt at least once |
| Reading from a stream | `while` | Stream might be empty |
| Menu display | `do-while` | Must show menu at least once |
| Waiting for an event | `while` | May already have occurred |

## break and continue

### break — Exit the Loop Immediately

```csharp
int[] data = { 4, 8, 15, 16, 23, 42 };
int index = 0;

while (index < data.Length)
{
    if (data[index] == 15)
    {
        Console.WriteLine($"Found 15 at index {index}");
        break; // Stop searching
    }
    index++;
}
```

### continue — Skip to the Next Iteration

```csharp
int number = 0;

while (number < 20)
{
    number++;

    if (number % 3 == 0)
        continue; // Skip multiples of 3

    Console.Write($"{number} ");
}
// 1 2 4 5 7 8 10 11 13 14 16 17 19 20
```

## Intentional Infinite Loops

Some programs need to run indefinitely — servers, game loops, background services. Use `while (true)` with a `break` condition:

```csharp
// Simple game loop pattern
while (true)
{
    Console.Write("\nEnter command (move/attack/quit): ");
    string? command = Console.ReadLine()?.ToLower();

    if (command == "quit")
    {
        Console.WriteLine("Thanks for playing!");
        break;
    }

    switch (command)
    {
        case "move":
            Console.WriteLine("You move forward.");
            break;
        case "attack":
            Console.WriteLine("You swing your sword!");
            break;
        default:
            Console.WriteLine("Unknown command.");
            break;
    }
}
```

> **Warning:** Always ensure your infinite loop has a reachable `break` condition. A loop with no exit will freeze your program.

## Avoiding Common Mistakes

### Forgetting to Update the Condition Variable

```csharp
// BUG: Infinite loop — count never changes
int count = 0;
while (count < 5)
{
    Console.WriteLine(count);
    // Missing: count++;
}

// FIX:
int count2 = 0;
while (count2 < 5)
{
    Console.WriteLine(count2);
    count2++; // Now the loop will terminate
}
```

### Off-by-One Errors

```csharp
// Runs 5 times (0, 1, 2, 3, 4) — correct
int i = 0;
while (i < 5)
{
    Console.Write($"{i} ");
    i++;
}
// 0 1 2 3 4

// Runs 6 times (0, 1, 2, 3, 4, 5) — maybe not what you intended
int j = 0;
while (j <= 5)
{
    Console.Write($"{j} ");
    j++;
}
// 0 1 2 3 4 5
```

## Recap

- `while` checks the condition **before** the body — the body may never execute.
- `do-while` checks the condition **after** the body — the body always executes at least once.
- Use `do-while` for input validation and menu display; use `while` when the body might not need to run.
- `break` exits the loop immediately; `continue` skips to the next iteration.
- Always ensure your loop condition will eventually become `false` (or that you have a `break`) to avoid infinite loops.

*Based on the [freeCodeCamp Foundational C# with Microsoft Certification](https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/)*

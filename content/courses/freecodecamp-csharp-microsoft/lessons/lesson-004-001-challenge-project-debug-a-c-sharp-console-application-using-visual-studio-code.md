---
id: lesson-004-001
title: Challenge Project - Debug a C# Console Application Using Visual Studio Code
chapterId: chapter-04
order: 1
duration: 5
objectives:
  - Find and fix intentional bugs in a C# calculator application
  - Apply debugging tools and exception handling techniques
  - Demonstrate proficiency with breakpoints, stepping, and variable inspection
---

# Challenge Project — Debug a C# Console Application

In this challenge, you're given a C# calculator application that contains **five intentional bugs**. Your job is to find every bug, diagnose the root cause, and fix it. Use the VS Code debugger — breakpoints, stepping, the Watch window, and the Variables panel — to locate each issue.

## The Buggy Calculator

Here is the complete application. It should perform basic arithmetic, maintain a history of operations, and allow the user to chain calculations. But it doesn't work correctly:

```csharp
double result = 0;
List<string> history = new();
bool running = true;

Console.WriteLine("=== CONSOLE CALCULATOR ===");
Console.WriteLine("Commands: +, -, *, /, clear, history, quit");
Console.WriteLine($"Current value: {result}\n");

while (running)
{
    Console.Write("Enter operator: ");
    string op = Console.ReadLine()!.Trim().ToLower();

    if (op == "quit")
    {
        running = false;
        continue;  // BUG 1: should be 'break' — continue restarts the loop
                    // and checks 'running', but then falls through to operand prompt
    }

    if (op == "clear")
    {
        result = 0;
        Console.WriteLine("Cleared. Current value: 0\n");
        continue;
    }

    if (op == "history")
    {
        if (history.Count == 0)
        {
            Console.WriteLine("No operations yet.\n");
        }
        else
        {
            Console.WriteLine("--- History ---");
            for (int i = 0; i <= history.Count; i++)  // BUG 2: off-by-one, should be <
            {
                Console.WriteLine($"  {history[i]}");
            }
            Console.WriteLine();
        }
        continue;
    }

    if (op != "+" && op != "-" && op != "*" && op != "/")
    {
        Console.WriteLine("Unknown command. Try +, -, *, /, clear, history, or quit.\n");
        continue;
    }

    Console.Write("Enter number: ");
    string numInput = Console.ReadLine()!;
    double operand = double.Parse(numInput);  // BUG 3: no TryParse, crashes on bad input

    double previous = result;

    switch (op)
    {
        case "+":
            result += operand;
            break;
        case "-":
            result -= operand;
            break;
        case "*":
            result += operand;  // BUG 4: should be *= not +=
            break;
        case "/":
            result /= operand;  // BUG 5: no check for division by zero
            break;
    }

    string entry = $"{previous} {op} {operand} = {result}";
    history.Add(entry);
    Console.WriteLine($"Result: {result}\n");
}

Console.WriteLine($"\nFinal result: {result}");
Console.WriteLine("Goodbye!");
```

## Your Task

Find and fix all five bugs. For each bug:

1. **Describe the symptom** — what wrong behavior does the user see?
2. **Identify the root cause** — what line of code is responsible?
3. **Apply the fix** — make the minimal change to correct the behavior
4. **Verify** — test the fix with appropriate inputs

## Bug Hunting Hints

Here are test scenarios that expose each bug:

| Test | Expected Result | Actual Result (Buggy) |
|------|----------------|----------------------|
| Type `quit` | Program exits | Program prompts for a number |
| Enter `history` with 3 entries | Shows 3 entries | Crashes with IndexOutOfRangeException |
| Enter `abc` as a number | Shows error message | Crashes with FormatException |
| Calculate `5 * 3` | Result: 15 | Result: 8 (adds instead of multiplying) |
| Calculate `10 / 0` | Shows division error | Result: Infinity or NaN |

## Debugging Strategy

1. **Start with the crash bugs** (Bugs 2, 3) — they're easiest to reproduce
2. **Set breakpoints** inside the `switch` statement to verify Bug 4
3. **Use the Watch window** to monitor `result` and `operand` across operations
4. **Test edge cases** after fixing — empty strings, negative numbers, very large numbers

## Expected Fixes Summary

After fixing all bugs, the calculator should:

- Exit cleanly when the user types `quit`
- Display history without crashing
- Handle non-numeric input gracefully with `TryParse`
- Multiply correctly using `*=`
- Prevent division by zero with a guard check

## Stretch Goals

Once all bugs are fixed, consider enhancing the calculator:

- Add a `%` (modulo) operator
- Add an `undo` command that reverts the last operation (use the history)
- Add support for parenthetical expressions
- Save history to a file and load it on startup

*Based on the [freeCodeCamp Foundational C# with Microsoft Certification](https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/)*

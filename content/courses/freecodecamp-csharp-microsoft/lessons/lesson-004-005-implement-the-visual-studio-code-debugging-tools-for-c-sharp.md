---
id: lesson-004-005
title: Implement the Visual Studio Code Debugging Tools for C#
chapterId: chapter-04
order: 5
duration: 5
objectives:
  - Configure launch.json for C# debugging in VS Code
  - Use breakpoints including conditional and hit-count breakpoints
  - Navigate code with stepping commands (Step Over, Step Into, Step Out)
  - Inspect variables using the Watch window, Call Stack, and Variables panel
---

# Implement the Visual Studio Code Debugging Tools for C#

The VS Code debugger is one of the most powerful tools in your development workflow. Instead of scattering `Console.WriteLine()` statements throughout your code, the debugger lets you pause execution, inspect every variable, and step through code line by line.

## Setting Up the Debugger

With the C# Dev Kit extension installed, VS Code can generate a `launch.json` file. Press **Ctrl+Shift+D** to open the Run and Debug panel, then click **"create a launch.json file"** and select **C#**.

Key settings in `launch.json`:
- `program` — path to your compiled DLL
- `console` — use `integratedTerminal` for apps that read user input
- `stopAtEntry` — set to `true` to pause at the very first line

## Breakpoints

A **breakpoint** tells the debugger to pause execution at a specific line. Click in the gutter (left margin) next to a line number to set one — a red dot appears.

### Line Breakpoints

The most basic breakpoint. Execution stops every time that line is reached:

```csharp
for (int i = 0; i < 100; i++)
{
    double result = CalculateValue(i);  // ← Set breakpoint here
    Console.WriteLine($"{i}: {result}");
}
```

### Conditional Breakpoints

Right-click a breakpoint and select **"Edit Breakpoint"** to add a condition. The debugger only pauses when the condition is true:

- **Expression condition**: `i == 42` — pause only when `i` equals 42
- **Expression condition**: `result > 1000` — pause when `result` exceeds 1000
- **Expression condition**: `name == "Alice"` — pause for a specific value

Conditional breakpoints are invaluable when debugging loops.

### Hit Count Breakpoints

Right-click a breakpoint, choose **"Edit Breakpoint"**, then select **"Hit Count"**. The breakpoint triggers after being hit a specific number of times:

- `= 50` — pause on the 50th hit
- `>= 10` — pause on the 10th hit and every hit after
- `% 25` — pause every 25th hit

## Stepping Through Code

Once paused at a breakpoint, use these commands to control execution:

| Command | Shortcut | Description |
|---------|----------|-------------|
| **Continue** | F5 | Resume execution until the next breakpoint |
| **Step Over** | F10 | Execute the current line and move to the next line |
| **Step Into** | F11 | Enter the method being called on the current line |
| **Step Out** | Shift+F11 | Execute the rest of the current method and return to the caller |
| **Stop** | Shift+F5 | Terminate the debugging session |
| **Restart** | Ctrl+Shift+F5 | Stop and restart the debugging session |

### When to Use Each

- **Step Over (F10)** — use when you trust the method on the current line works correctly and you want to see its result without going inside
- **Step Into (F11)** — use when you suspect a bug is *inside* the method being called
- **Step Out (Shift+F11)** — use when you've stepped into a method and realized the bug isn't there; jump back to the caller

## The Debug Panels

### Variables Panel

Shows all variables in scope at the current breakpoint — **Locals** (current method variables) and **Parameters** (values passed in). Click arrows to expand objects and arrays. You can also **modify values** during debugging by double-clicking the value field.

### Watch Window

Add expressions to monitor across your session: variable names (`total`, `i`), expressions (`numbers.Length`, `price * quantity`), or comparisons (`i > 50`). Watch expressions update automatically each time execution pauses.

### Call Stack

Shows the chain of method calls leading to the current line. Click any frame to see the code and variables at that level — essential for understanding *how* you reached the current point.

## Practical Debugging Walkthrough

Consider this buggy method:

```csharp
static double CalculateAverage(int[] scores)
{
    int total = 0;
    for (int i = 1; i <= scores.Length; i++)  // Bug: starts at 1, goes past end
    {
        total += scores[i];  // Will crash with IndexOutOfRangeException
    }
    return total / scores.Length;  // Bug: integer division truncates
}
```

**Debugging steps:**

1. Set a breakpoint on the `for` line
2. Start debugging (F5)
3. Step Over (F10) to watch `i` increment in the Variables panel
4. Notice `i` starts at 1 instead of 0 — the first element is skipped
5. Continue stepping until `i == scores.Length` — the index is out of range
6. Fix: change `int i = 1; i <= scores.Length` to `int i = 0; i < scores.Length`
7. Fix the integer division: `return (double)total / scores.Length;`

## Key Takeaways

- The VS Code debugger replaces scattered `Console.WriteLine` debugging with precise, interactive inspection
- Breakpoints can be conditional or hit-count-based for targeted pausing
- Step Over, Step Into, and Step Out give you fine-grained control over execution
- The Variables panel, Watch window, and Call Stack work together to give you full visibility into program state
- Debugging is a skill that improves with practice — use the debugger regularly, even when you think you know where the bug is

*Based on the [freeCodeCamp Foundational C# with Microsoft Certification](https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/)*

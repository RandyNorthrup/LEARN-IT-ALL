---
id: lesson-001-008
title: Trophy - Add Logic to C# Console Applications
chapterId: chapter-01
order: 8
duration: 5
objectives:
  - Review all key concepts from the Add Logic chapter
  - Assess your understanding with self-check questions
  - Identify common mistakes and how to avoid them
---

# Trophy — Add Logic to C# Console Applications

Congratulations on completing the "Add Logic to C# Console Applications" chapter! You now have all the tools to control program flow — decisions, branching, looping, and scope management. Let us review what you learned, test your understanding, and preview what comes next.

## Chapter Review

### Boolean Expressions and Decision-Making

You learned that every decision in C# boils down to a `bool`:

- **Comparison operators:** `==`, `!=`, `>`, `<`, `>=`, `<=`
- **Logical operators:** `&&` (AND), `||` (OR), `!` (NOT)
- **Conditional operator:** `condition ? trueValue : falseValue`
- **Null-safety operators:** `?.` (conditional access), `??` (null-coalescing), `??=` (null-coalescing assignment)
- **Pattern matching:** `is` keyword with type, constant, relational, and logical patterns

### switch Constructs

You explored two forms of switch:

- **switch statement** — executes code blocks, requires `break`, supports `default`
- **switch expression** (C# 8+) — returns a value using `=>` arrows and `_` discard

And you learned pattern matching within switch: type patterns, `when` guards, relational patterns (`< 0`, `>= 18`), and combined patterns (`and`, `or`, `not`).

### Loops

You mastered three loop types:

| Loop | Checks When | Best For |
|------|------------|----------|
| `while` | Before each iteration | May not need to run |
| `do-while` | After each iteration | Must run at least once |
| `for` | Before each iteration | Known count, index needed |

Plus `foreach` for iterating collections without needing an index.

Key loop tools:
- `break` — exit immediately
- `continue` — skip to next iteration

### Variable Scope

You learned that curly braces `{ }` define scope boundaries:

- Variables are only accessible within their declaring block and nested blocks
- C# prohibits variable shadowing within a method
- Declare variables in the narrowest scope possible
- Use `this` to disambiguate between fields and parameters

## Self-Assessment Questions

**1. What is the output of this code?**

```csharp
int x = 5;
string result = x switch
{
    > 10 => "Big",
    > 0 and <= 10 => "Medium",
    0 => "Zero",
    _ => "Negative"
};
Console.WriteLine(result);
```

<details>
<summary>Show answer</summary>

`Medium` — `x` is 5, which matches the pattern `> 0 and <= 10`.

</details>

**2. How many times does this loop execute?**

```csharp
int i = 10;
do
{
    Console.Write(i + " ");
    i++;
} while (i < 5);
```

<details>
<summary>Show answer</summary>

Once. The `do-while` loop always executes the body at least once, then checks the condition. Since `10 < 5` is `false`, it stops after printing `10`.

</details>

**3. Will this code compile?**

```csharp
if (true)
{
    int value = 42;
}
Console.WriteLine(value);
```

<details>
<summary>Show answer</summary>

No. `value` is declared inside the `if` block and is not accessible outside it. The compiler reports: "The name 'value' does not exist in the current context."

</details>

**4. What does `?.` do, and how is it different from `.`?**

<details>
<summary>Show answer</summary>

`?.` is the conditional access operator. It checks if the left side is `null` before accessing the member. If the left side is `null`, the entire expression evaluates to `null` instead of throwing a `NullReferenceException`. Regular `.` would throw if the object is `null`.

</details>

**5. What is the output?**

```csharp
for (int i = 0; i < 10; i++)
{
    if (i % 3 == 0)
        continue;
    if (i > 7)
        break;
    Console.Write(i + " ");
}
```

<details>
<summary>Show answer</summary>

`1 2 4 5 7` — Values divisible by 3 (0, 3, 6, 9) are skipped by `continue`. When `i` reaches 8, `break` exits the loop. So only 1, 2, 4, 5, and 7 are printed.

</details>

**6. When should you use a switch expression instead of a switch statement?**

<details>
<summary>Show answer</summary>

Use a switch expression when you need to map an input to a single return value. Each arm produces one expression. Use a switch statement when each case needs multiple lines of code or side effects (like printing to the console).

</details>

## Common Mistakes to Avoid

| Mistake | Problem | Fix |
|---------|---------|-----|
| Missing `break` in switch | Compiler error (C# requires it) | Always add `break`, `return`, or `throw` |
| Forgetting to update loop variable | Infinite loop | Ensure the condition variable changes |
| Using `==` for null checks | Works, but less idiomatic | Use `is null` or `is not null` |
| Declaring variables in wrong scope | Compiler error or unintended behavior | Declare in the narrowest scope needed |
| Nested ternary operators | Hard to read | Use `if`/`else` or `switch` instead |
| `while` when `do-while` is needed | Duplicated code before the loop | Use `do-while` for "do first, check after" |

## Key Patterns to Remember

### Input Validation

```csharp
int value;
do
{
    Console.Write("Enter a number: ");
} while (!int.TryParse(Console.ReadLine(), out value));
```

### Menu Loop

```csharp
bool running = true;
while (running)
{
    // Display menu
    switch (Console.ReadLine())
    {
        case "1": /* action */ break;
        case "q": running = false; break;
        default: Console.WriteLine("Invalid"); break;
    }
}
```

### Search with Early Exit

```csharp
for (int i = 0; i < data.Length; i++)
{
    if (data[i] == target)
    {
        Console.WriteLine($"Found at {i}");
        break;
    }
}
```

## What's Next

In the next chapter, **Work with Methods in C# Console Applications**, you will learn to:

- Create and call methods with parameters and return values
- Understand value vs reference parameter passing
- Use `out`, `ref`, and `in` parameter modifiers
- Build overloaded methods
- Apply optional and named parameters

Methods will allow you to organize and reuse the logic you built in this chapter, making your programs cleaner and more maintainable.

*Based on the [freeCodeCamp Foundational C# with Microsoft Certification](https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/)*

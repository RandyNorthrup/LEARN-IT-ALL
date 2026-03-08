---
id: lesson-001-007
title: Iterate Through a Code Block Using the for Statement in C#
chapterId: chapter-01
order: 7
duration: 5
objectives:
  - Write for loops with initialization, condition, and iterator expressions
  - Compare for loops to foreach loops and choose the right one
  - Use nested for loops to generate 2D patterns
  - Apply common for loop patterns like countdown, stepping, and reverse iteration
---

# Iterate Through a Code Block Using the for Statement in C#

The `for` loop gives you precise control over iteration — you decide where to start, when to stop, and how to step through values. This makes it ideal for index-based access, counting patterns, and multi-dimensional traversal.

## for Loop Syntax

A `for` loop has three parts separated by semicolons inside the parentheses:

```csharp
for (initialization; condition; iterator)
{
    // Loop body
}
```

- **Initialization** — runs once before the loop starts (typically declares a counter)
- **Condition** — evaluated before each iteration; if `false`, the loop exits
- **Iterator** — runs after each iteration (typically increments or decrements the counter)

```csharp
for (int i = 0; i < 5; i++)
{
    Console.WriteLine($"Iteration {i}");
}
// Output:
// Iteration 0
// Iteration 1
// Iteration 2
// Iteration 3
// Iteration 4
```

The counter variable `i` is scoped to the loop — it does not exist outside the `for` block.

## Common for Loop Patterns

### Counting Down

```csharp
Console.WriteLine("Countdown:");
for (int i = 10; i >= 0; i--)
{
    Console.Write($"{i} ");
}
Console.WriteLine("Liftoff!");
// 10 9 8 7 6 5 4 3 2 1 0 Liftoff!
```

### Stepping by a Custom Value

```csharp
Console.WriteLine("Even numbers 0-20:");
for (int i = 0; i <= 20; i += 2)
{
    Console.Write($"{i} ");
}
// 0 2 4 6 8 10 12 14 16 18 20
```

### Iterating an Array by Index

```csharp
string[] colors = { "Red", "Green", "Blue", "Yellow" };

for (int i = 0; i < colors.Length; i++)
{
    Console.WriteLine($"Color {i + 1}: {colors[i]}");
}
```

### Reverse Iteration

```csharp
int[] numbers = { 10, 20, 30, 40, 50 };

Console.WriteLine("Reversed:");
for (int i = numbers.Length - 1; i >= 0; i--)
{
    Console.Write($"{numbers[i]} ");
}
// 50 40 30 20 10
```

## for vs foreach — When to Use Each

| Feature | `for` | `foreach` |
|---------|-------|-----------|
| Need the index? | Yes — `i` is available | No — only the element |
| Modify the collection? | Can modify by index | Cannot modify during iteration |
| Direction | Any (forward, backward, skip) | Forward only |
| Simplicity | Slightly more verbose | Simpler syntax |

```csharp
string[] names = { "Alice", "Bob", "Charlie" };

// foreach — simpler when you just need each element
foreach (string name in names)
{
    Console.WriteLine(name);
}

// for — necessary when you need the index
for (int i = 0; i < names.Length; i++)
{
    Console.WriteLine($"{i + 1}. {names[i]}");
}

// for — necessary when modifying elements
for (int i = 0; i < names.Length; i++)
{
    names[i] = names[i].ToUpper();
}
```

**Rule of thumb:** Use `foreach` when you just need each element. Use `for` when you need the index, when you need to modify the array, or when you need non-standard iteration (backwards, every other element, etc.).

## Nested for Loops

When you need to iterate over two dimensions — rows and columns, pairs, or grid coordinates — use nested `for` loops:

### Multiplication Table

```csharp
Console.WriteLine("Multiplication Table (1-5):");
Console.Write("     ");
for (int col = 1; col <= 5; col++)
    Console.Write($"{col,4}");
Console.WriteLine();
Console.WriteLine("     " + new string('-', 20));

for (int row = 1; row <= 5; row++)
{
    Console.Write($"{row,3} |");
    for (int col = 1; col <= 5; col++)
    {
        Console.Write($"{row * col,4}");
    }
    Console.WriteLine();
}
```

Output:

```
Multiplication Table (1-5):
        1   2   3   4   5
     --------------------
  1 |   1   2   3   4   5
  2 |   2   4   6   8  10
  3 |   3   6   9  12  15
  4 |   4   8  12  16  20
  5 |   5  10  15  20  25
```

### Triangle Pattern

```csharp
int rows = 5;
for (int i = 1; i <= rows; i++)
{
    for (int j = 0; j < i; j++)
    {
        Console.Write("* ");
    }
    Console.WriteLine();
}
// *
// * *
// * * *
// * * * *
// * * * * *
```

### 2D Array Traversal

```csharp
int[,] grid =
{
    { 1, 2, 3 },
    { 4, 5, 6 },
    { 7, 8, 9 }
};

for (int row = 0; row < grid.GetLength(0); row++)
{
    for (int col = 0; col < grid.GetLength(1); col++)
    {
        Console.Write($"{grid[row, col],3}");
    }
    Console.WriteLine();
}
```

## Using break and continue in for Loops

```csharp
// Find the first negative number
int[] values = { 5, 12, -3, 8, -7, 15 };

for (int i = 0; i < values.Length; i++)
{
    if (values[i] < 0)
    {
        Console.WriteLine($"First negative at index {i}: {values[i]}");
        break; // Exit the loop immediately
    }
}

// Skip even numbers
Console.Write("Odd numbers: ");
for (int i = 0; i < 10; i++)
{
    if (i % 2 == 0)
        continue; // Skip to the next iteration
    Console.Write($"{i} ");
}
// Odd numbers: 1 3 5 7 9
```

## Advanced: Multiple Variables and Omitted Parts

All three parts of a `for` loop are optional:

```csharp
// Two counter variables
for (int left = 0, right = 10; left < right; left++, right--)
{
    Console.WriteLine($"left={left}, right={right}");
}
// left=0, right=10
// left=1, right=9
// ... and so on until left >= right

// Infinite loop (all parts omitted — rarely useful, but legal)
// for (;;) { /* must break out somehow */ }
```

## A Practical Example: FizzBuzz

The classic interview problem, solved with a `for` loop:

```csharp
for (int i = 1; i <= 30; i++)
{
    string output = (i % 3 == 0, i % 5 == 0) switch
    {
        (true, true) => "FizzBuzz",
        (true, false) => "Fizz",
        (false, true) => "Buzz",
        _ => i.ToString()
    };
    Console.Write($"{output} ");
}
```

## Recap

- The `for` loop gives you an initializer, condition, and iterator for precise control.
- Use `for` when you need the index, need to modify elements, or iterate non-sequentially.
- Use `foreach` when you simply need each element in order.
- Nested `for` loops handle 2D patterns, grids, and tables.
- `break` exits the loop early; `continue` skips to the next iteration.

*Based on the [freeCodeCamp Foundational C# with Microsoft Certification](https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/)*

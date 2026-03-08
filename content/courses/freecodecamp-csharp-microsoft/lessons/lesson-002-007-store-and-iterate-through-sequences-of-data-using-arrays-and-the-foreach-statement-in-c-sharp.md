---
id: lesson-002-007
title: Store and Iterate Through Sequences of Data Using Arrays and the foreach Statement in C#
chapterId: chapter-02
order: 7
duration: 5
objectives:
  - Declare and initialize arrays of different types
  - Access array elements by index and use the Length property
  - Iterate over arrays with foreach and for loops
  - Use Array.Sort, Array.Reverse, and other array methods
  - Work with multi-dimensional and jagged arrays
---

# Store and Iterate Through Sequences of Data Using Arrays and the foreach Statement in C#

## What Is an Array?

An **array** is a fixed-size collection of elements that are all the same type. Arrays let you store many values under a single variable name and access them by their **index** (position).

## Declaring and Initializing Arrays

There are several ways to create an array:

```csharp
// Declare with explicit size (elements default to 0 / null / false)
int[] scores = new int[5];

// Declare and initialize with values
int[] grades = new int[] { 90, 85, 92, 88, 76 };

// Shorthand (type inferred from values)
int[] numbers = { 1, 2, 3, 4, 5 };

// String array
string[] names = { "Alice", "Bob", "Carol" };

// Boolean array
bool[] flags = new bool[3];  // all false by default
```

## Accessing Elements

Array indices are **zero-based** — the first element is at index `0`:

```csharp
string[] fruits = { "Apple", "Banana", "Cherry", "Date" };

Console.WriteLine(fruits[0]);   // Apple
Console.WriteLine(fruits[2]);   // Cherry
Console.WriteLine(fruits[^1]);  // Date  (index from end, C# 8+)

// Modify an element
fruits[1] = "Blueberry";
Console.WriteLine(fruits[1]);   // Blueberry
```

Accessing an index outside the array bounds throws an `IndexOutOfRangeException`:

```csharp
// Console.WriteLine(fruits[10]);  // Runtime error!
```

## The Length Property

Every array has a `.Length` property that returns the number of elements:

```csharp
int[] data = { 10, 20, 30, 40, 50 };
Console.WriteLine(data.Length);  // 5
```

This is essential for loops and bounds checking.

## Iterating with foreach

The `foreach` loop iterates over every element without needing an index:

```csharp
string[] colors = { "Red", "Green", "Blue", "Yellow" };

foreach (string color in colors)
{
    Console.WriteLine(color);
}
```

Output:

```
Red
Green
Blue
Yellow
```

`foreach` is **read-only** — you cannot modify the loop variable:

```csharp
foreach (string color in colors)
{
    // color = "Purple";  // ERROR: cannot assign to 'color'
}
```

## Iterating with for

Use a `for` loop when you need the index or want to modify elements:

```csharp
int[] values = { 1, 2, 3, 4, 5 };

for (int i = 0; i < values.Length; i++)
{
    values[i] *= 2;  // double each element
}

// values is now { 2, 4, 6, 8, 10 }
foreach (int v in values)
{
    Console.Write($"{v} ");
}
// Output: 2 4 6 8 10
```

## Useful Array Methods

The `System.Array` class provides several static helper methods:

```csharp
int[] numbers = { 5, 3, 8, 1, 9, 2 };

// Sort in ascending order (modifies the original array)
Array.Sort(numbers);
// numbers: { 1, 2, 3, 5, 8, 9 }

// Reverse the array
Array.Reverse(numbers);
// numbers: { 9, 8, 5, 3, 2, 1 }

// Search for a value (array must be sorted for BinarySearch)
Array.Sort(numbers);
int index = Array.IndexOf(numbers, 5);  // works on unsorted too
Console.WriteLine($"Found 5 at index {index}");

// Clear elements (reset to default values)
Array.Clear(numbers, 0, 2);  // first 2 elements become 0
// numbers: { 0, 0, 3, 5, 8, 9 }

// Copy to another array
int[] copy = new int[6];
Array.Copy(numbers, copy, numbers.Length);
```

## Multi-Dimensional Arrays

C# supports **rectangular** multi-dimensional arrays:

```csharp
// 2D array: 3 rows, 4 columns
int[,] matrix = new int[3, 4];
matrix[0, 0] = 1;
matrix[2, 3] = 12;

// Initialize with values
int[,] grid = {
    { 1, 2, 3 },
    { 4, 5, 6 },
    { 7, 8, 9 }
};

// Iterate with nested for loops
for (int row = 0; row < grid.GetLength(0); row++)
{
    for (int col = 0; col < grid.GetLength(1); col++)
    {
        Console.Write($"{grid[row, col],4}");
    }
    Console.WriteLine();
}
```

## Jagged Arrays

A **jagged array** is an array of arrays — each inner array can have a different length:

```csharp
int[][] jagged = new int[3][];
jagged[0] = new int[] { 1, 2 };
jagged[1] = new int[] { 3, 4, 5 };
jagged[2] = new int[] { 6 };

foreach (int[] row in jagged)
{
    foreach (int val in row)
    {
        Console.Write($"{val} ");
    }
    Console.WriteLine();
}
```

Output:

```
1 2
3 4 5
6
```

## Key Takeaways

- Arrays are fixed-size, zero-indexed collections of a single type
- Use `foreach` for simple iteration; use `for` when you need the index or want to modify elements
- `.Length` returns the number of elements
- `Array.Sort()` and `Array.Reverse()` modify the array in place
- Multi-dimensional arrays have fixed dimensions; jagged arrays allow varying inner sizes

*Based on the [freeCodeCamp Foundational C# with Microsoft Certification](https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/)*

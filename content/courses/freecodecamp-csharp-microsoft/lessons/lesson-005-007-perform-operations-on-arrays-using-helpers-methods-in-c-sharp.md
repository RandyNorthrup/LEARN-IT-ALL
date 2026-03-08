---
id: lesson-005-007
title: Perform Operations on Arrays Using Helper Methods in C#
chapterId: chapter-05
order: 7
duration: 5
objectives:
  - Use Array helper methods like Sort, Reverse, Clear, Resize, and Copy
  - Search arrays with IndexOf, Exists, Find, and FindAll
  - Apply basic LINQ methods like Where, Select, OrderBy, First, and Count
  - Convert between arrays and lists
---

# Perform Operations on Arrays Using Helper Methods in C#

Arrays are fundamental data structures, but raw arrays can feel limiting without the right tools. C# provides a rich set of static helper methods on the `Array` class and, through LINQ, a powerful query syntax that transforms how you work with collections.

## Sorting and Reversing

The `Array.Sort` method sorts an array in place in ascending order. `Array.Reverse` reverses the element order:

```csharp
int[] numbers = { 5, 1, 4, 2, 3 };

Array.Sort(numbers);
Console.WriteLine(string.Join(", ", numbers)); // 1, 2, 3, 4, 5

Array.Reverse(numbers);
Console.WriteLine(string.Join(", ", numbers)); // 5, 4, 3, 2, 1
```

For strings, `Sort` uses alphabetical (ordinal) order by default:

```csharp
string[] names = { "Charlie", "Alice", "Bob" };
Array.Sort(names);
// names: ["Alice", "Bob", "Charlie"]
```

To sort descending, sort first then reverse — or use LINQ (shown later).

## Clearing and Resizing

### Array.Clear

Sets a range of elements to their default value (`0` for numbers, `null` for reference types, `false` for bools):

```csharp
int[] scores = { 90, 85, 78, 92, 88 };
Array.Clear(scores, 1, 2); // Clear 2 elements starting at index 1
Console.WriteLine(string.Join(", ", scores)); // 90, 0, 0, 92, 88
```

### Array.Resize

Creates a new array with the specified size and copies existing elements. The original reference is updated:

```csharp
int[] data = { 10, 20, 30 };
Array.Resize(ref data, 5);  // Grow — new slots get default value (0)
Console.WriteLine(string.Join(", ", data)); // 10, 20, 30, 0, 0

Array.Resize(ref data, 2);  // Shrink — extra elements are discarded
Console.WriteLine(string.Join(", ", data)); // 10, 20
```

> **Note:** `Array.Resize` does not resize in place — it allocates a new array and copies data. For frequent resizing, consider using `List<T>` instead.

## Copying Arrays

### Array.Copy

Copies elements from one array to another:

```csharp
int[] source = { 1, 2, 3, 4, 5 };
int[] destination = new int[5];

Array.Copy(source, destination, 3); // Copy first 3 elements
Console.WriteLine(string.Join(", ", destination)); // 1, 2, 3, 0, 0

// Copy with source and destination offsets
int[] partial = new int[3];
Array.Copy(source, 2, partial, 0, 3); // Copy 3 elements from index 2
Console.WriteLine(string.Join(", ", partial)); // 3, 4, 5
```

You can also use the instance method `CopyTo` or the `Clone` method:

```csharp
int[] clone = (int[])source.Clone(); // Shallow copy of entire array
```

## Searching Arrays

### Array.IndexOf

Returns the index of the first match, or `-1`:

```csharp
string[] fruits = { "apple", "banana", "cherry", "banana" };
int index = Array.IndexOf(fruits, "banana");       // 1
int last = Array.LastIndexOf(fruits, "banana");     // 3
int missing = Array.IndexOf(fruits, "mango");       // -1
```

### Array.Exists

Checks if any element matches a condition (using a predicate):

```csharp
int[] ages = { 15, 22, 17, 30, 12 };
bool hasAdult = Array.Exists(ages, age => age >= 18); // true
bool allAdults = Array.TrueForAll(ages, age => age >= 18); // false
```

### Array.Find and Array.FindAll

Return the first match or all matches:

```csharp
int[] values = { 3, 7, 12, 5, 18, 2, 9 };

int firstBig = Array.Find(values, v => v > 10);      // 12
int lastBig = Array.FindLast(values, v => v > 10);    // 18
int[] allBig = Array.FindAll(values, v => v > 10);    // [12, 18]

int firstIdx = Array.FindIndex(values, v => v > 10);  // 2
```

## LINQ Basics for Arrays

LINQ (Language Integrated Query) provides a declarative way to query and transform collections. Add `using System.Linq;` at the top of your file (included by default in .NET 8 with `ImplicitUsings`).

### Filtering with Where

```csharp
int[] numbers = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

int[] evens = numbers.Where(n => n % 2 == 0).ToArray();
// [2, 4, 6, 8, 10]
```

### Transforming with Select

```csharp
string[] names = { "alice", "bob", "charlie" };

string[] capitalized = names
    .Select(n => char.ToUpper(n[0]) + n[1..])
    .ToArray();
// ["Alice", "Bob", "Charlie"]
```

### Sorting with OrderBy and OrderByDescending

```csharp
string[] cities = { "Seattle", "Austin", "Denver", "Boston" };

string[] sorted = cities.OrderBy(c => c).ToArray();
// ["Austin", "Boston", "Denver", "Seattle"]

string[] byLength = cities.OrderBy(c => c.Length).ToArray();
// ["Austin", "Boston", "Denver", "Seattle"]

string[] desc = cities.OrderByDescending(c => c).ToArray();
// ["Seattle", "Denver", "Boston", "Austin"]
```

### Aggregation: First, Count, Sum, Average, Min, Max

```csharp
int[] scores = { 85, 92, 78, 95, 88 };

int first = scores.First();                    // 85
int firstAbove90 = scores.First(s => s > 90);  // 92
int count = scores.Count(s => s >= 90);        // 2
int sum = scores.Sum();                        // 438
double avg = scores.Average();                 // 87.6
int min = scores.Min();                        // 78
int max = scores.Max();                        // 95
```

### Chaining LINQ Methods

LINQ methods return `IEnumerable<T>`, so you can chain them fluently:

```csharp
int[] data = { 5, 3, 8, 1, 9, 2, 7, 4, 6 };

int[] result = data
    .Where(n => n > 3)
    .OrderBy(n => n)
    .ToArray();
// [4, 5, 6, 7, 8, 9]
```

## Converting Between Arrays and Lists

`List<T>` provides dynamic resizing that arrays lack. Converting between them is straightforward:

```csharp
// Array to List
string[] array = { "one", "two", "three" };
List<string> list = new List<string>(array);
// or: List<string> list = array.ToList();

// List to Array
string[] backToArray = list.ToArray();

// List advantages: Add, Remove, Insert dynamically
list.Add("four");
list.Remove("two");
list.Insert(0, "zero");
Console.WriteLine(string.Join(", ", list)); // zero, one, three, four
```

## Recap

- `Array.Sort`, `Reverse`, `Clear`, `Resize`, and `Copy` provide essential array manipulation.
- `Array.IndexOf`, `Find`, `FindAll`, and `Exists` search arrays with predicates.
- LINQ methods (`Where`, `Select`, `OrderBy`, `First`, `Count`) offer powerful, composable queries.
- Use `List<T>` when you need dynamic sizing; convert freely between arrays and lists.

*Based on the [freeCodeCamp Foundational C# with Microsoft Certification](https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/)*

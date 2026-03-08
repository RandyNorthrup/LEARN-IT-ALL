---
id: lesson-003-004
title: Guided Project - Plan a Petting Zoo Visit
chapterId: chapter-03
order: 4
duration: 5
objectives:
  - Build a complete petting zoo visit planner application
  - Apply method concepts for scheduling and grouping visitors
  - Decompose a problem into well-defined methods
  - Combine parameters, return values, and arrays in practice
---

# Guided Project — Plan a Petting Zoo Visit

In this guided project, you'll build a console application that organizes a school field trip to a petting zoo. The application assigns students to groups, randomizes the order of animal areas, and prints a complete visit schedule. This project brings together every method concept from the chapter.

## Project Requirements

The petting zoo visit planner must:

1. Accept a list of students and a desired group size
2. Randomly assign students to groups of the specified size
3. Define the animal areas to visit (e.g., Alpacas, Goats, Rabbits, Ducks, Pigs, Llamas)
4. Randomize the visit order for each group so they don't all crowd the same area
5. Print the schedule showing which group visits which area and when

## Step 1: Define the Data

Start by setting up your student list and animal areas:

```csharp
string[] students = {
    "Alice", "Bob", "Charlie", "Diana", "Eve",
    "Frank", "Grace", "Hank", "Ivy", "Jack",
    "Karen", "Leo", "Mona", "Nate", "Olivia"
};

string[] animalAreas = { "Alpacas", "Goats", "Rabbits", "Ducks", "Pigs", "Llamas" };

int groupSize = 6;
```

## Step 2: Shuffle an Array

Create a method that randomly shuffles an array using the Fisher-Yates algorithm:

```csharp
static void ShuffleArray(string[] array)
{
    Random random = new();
    for (int i = array.Length - 1; i > 0; i--)
    {
        int j = random.Next(i + 1);
        string temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
```

## Step 3: Split Students into Groups

Write a method that divides the shuffled student list into groups:

```csharp
static string[][] SplitIntoGroups(string[] students, int groupSize)
{
    int groupCount = (int)Math.Ceiling((double)students.Length / groupSize);
    string[][] groups = new string[groupCount][];

    for (int i = 0; i < groupCount; i++)
    {
        int start = i * groupSize;
        int length = Math.Min(groupSize, students.Length - start);
        groups[i] = new string[length];
        Array.Copy(students, start, groups[i], 0, length);
    }

    return groups;
}
```

## Step 4: Generate the Visit Schedule

Create a method that assigns each group a randomized tour order:

```csharp
static string[][] GenerateSchedules(string[] animalAreas, int groupCount)
{
    string[][] schedules = new string[groupCount][];

    for (int i = 0; i < groupCount; i++)
    {
        schedules[i] = (string[])animalAreas.Clone();
        ShuffleArray(schedules[i]);
    }

    return schedules;
}
```

## Step 5: Print the Schedule

Build a method that displays the full visit plan:

```csharp
static void PrintSchedule(string[][] groups, string[][] schedules)
{
    Console.WriteLine("===========================================");
    Console.WriteLine("     PETTING ZOO VISIT SCHEDULE");
    Console.WriteLine("===========================================");

    for (int i = 0; i < groups.Length; i++)
    {
        Console.WriteLine($"\nGroup {i + 1}: {string.Join(", ", groups[i])}");
        Console.WriteLine("  Visit order:");
        for (int j = 0; j < schedules[i].Length; j++)
        {
            Console.WriteLine($"    {j + 1}. {schedules[i][j]}");
        }
    }

    Console.WriteLine("\n===========================================");
}
```

## Step 6: Wire Everything Together

The main program flow calls each method in sequence:

```csharp
ShuffleArray(students);  // Randomize student order before grouping
string[][] groups = SplitIntoGroups(students, groupSize);
string[][] schedules = GenerateSchedules(animalAreas, groups.Length);
PrintSchedule(groups, schedules);
```

## Sample Output

```
===========================================
     PETTING ZOO VISIT SCHEDULE
===========================================

Group 1: Mona, Jack, Alice, Eve, Frank, Hank
  Visit order:
    1. Ducks
    2. Llamas
    3. Alpacas
    4. Rabbits
    5. Goats
    6. Pigs

Group 2: Grace, Leo, Karen, Nate, Diana, Charlie
  Visit order:
    1. Goats
    2. Pigs
    3. Ducks
    4. Llamas
    5. Alpacas
    6. Rabbits

Group 3: Bob, Olivia, Ivy
  Visit order:
    1. Rabbits
    2. Alpacas
    3. Goats
    4. Pigs
    5. Ducks
    6. Llamas

===========================================
```

## What You Practiced

This project exercised every method skill from the chapter:

- **Defining methods** with clear, single responsibilities
- **Parameters** — passing arrays and primitive values
- **Return values** — methods that produce arrays and jagged arrays
- **Void methods** — `ShuffleArray` modifies in place, `PrintSchedule` outputs to console
- **Calling methods** — composing a solution from small, well-named building blocks

The key insight is **decomposition**: breaking a complex problem into small methods that each do one thing well. This makes the code easier to read, test, and modify.

*Based on the [freeCodeCamp Foundational C# with Microsoft Certification](https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/)*

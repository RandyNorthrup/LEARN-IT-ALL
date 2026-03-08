---
id: lesson-002-005
title: Guided Project - Develop foreach and if-elseif-else Structures to Process Array Data in C#
chapterId: chapter-02
order: 5
duration: 5
objectives:
  - Process arrays of student data using foreach loops
  - Apply if, else-if, and else logic to categorize data
  - Filter and display information based on conditions
  - Build a complete student report application
---

# Guided Project — Develop foreach and if-elseif-else Structures to Process Array Data in C#

## Project Overview

In this guided project you'll build a C# console application that processes student enrollment data. You'll iterate through arrays with `foreach`, apply conditional logic to categorize students, and produce a formatted report. This ties together arrays, loops, and decision-making.

## The Scenario

A school administrator needs a program that:
1. Stores student names, grades, and enrollment status
2. Categorizes students by performance level
3. Identifies students who need academic support
4. Prints a summary report

## Step 1: Define the Data

Set up parallel arrays for student information:

```csharp
string[] studentNames = { "Sophia", "Andrew", "Emma", "Logan", "Olivia", "Noah" };
int[] examScores     = { 95, 72, 88, 65, 91, 58 };
bool[] isEnrolled    = { true, true, true, false, true, true };
```

## Step 2: Categorize Students

Use `foreach` with an index-tracking variable (or switch to a `for` loop) to process each student:

```csharp
Console.WriteLine($"{"Student",-12}{"Score",8}{"Status",12}{"Level",15}");
Console.WriteLine(new string('-', 47));

for (int i = 0; i < studentNames.Length; i++)
{
    // Skip students who are not currently enrolled
    if (!isEnrolled[i])
    {
        Console.WriteLine($"{studentNames[i],-12}{"---",8}{"Inactive",12}{"---",15}");
        continue;
    }

    int score = examScores[i];
    string level;

    if (score >= 90)
    {
        level = "Excellent";
    }
    else if (score >= 80)
    {
        level = "Good";
    }
    else if (score >= 70)
    {
        level = "Satisfactory";
    }
    else if (score >= 60)
    {
        level = "Needs Support";
    }
    else
    {
        level = "At Risk";
    }

    Console.WriteLine($"{studentNames[i],-12}{score,8}{"Active",12}{level,15}");
}
```

## Step 3: Generate Summary Statistics

Calculate and display aggregate information:

```csharp
int enrolledCount = 0;
int totalScore = 0;
int highPerformers = 0;
int needsSupport = 0;

for (int i = 0; i < studentNames.Length; i++)
{
    if (!isEnrolled[i]) continue;

    enrolledCount++;
    totalScore += examScores[i];

    if (examScores[i] >= 90)
        highPerformers++;
    else if (examScores[i] < 70)
        needsSupport++;
}

double classAverage = enrolledCount > 0 ? (double)totalScore / enrolledCount : 0;

Console.WriteLine();
Console.WriteLine("=== Summary ===");
Console.WriteLine($"Total enrolled:    {enrolledCount}");
Console.WriteLine($"Class average:     {classAverage:F1}");
Console.WriteLine($"High performers:   {highPerformers}");
Console.WriteLine($"Needs support:     {needsSupport}");
```

## Step 4: List Students Needing Support

Use a `foreach`-style loop to print students below the threshold:

```csharp
Console.WriteLine();
Console.WriteLine("=== Students Needing Academic Support ===");

bool foundAny = false;
for (int i = 0; i < studentNames.Length; i++)
{
    if (isEnrolled[i] && examScores[i] < 70)
    {
        Console.WriteLine($"  - {studentNames[i]} (Score: {examScores[i]})");
        foundAny = true;
    }
}

if (!foundAny)
{
    Console.WriteLine("  No students need support at this time.");
}
```

## Complete Working Program

```csharp
string[] studentNames = { "Sophia", "Andrew", "Emma", "Logan", "Olivia", "Noah" };
int[] examScores     = { 95, 72, 88, 65, 91, 58 };
bool[] isEnrolled    = { true, true, true, false, true, true };

// === Detailed Report ===
Console.WriteLine($"{"Student",-12}{"Score",8}{"Status",12}{"Level",15}");
Console.WriteLine(new string('-', 47));

for (int i = 0; i < studentNames.Length; i++)
{
    if (!isEnrolled[i])
    {
        Console.WriteLine($"{studentNames[i],-12}{"---",8}{"Inactive",12}{"---",15}");
        continue;
    }

    int score = examScores[i];
    string level;

    if (score >= 90)
        level = "Excellent";
    else if (score >= 80)
        level = "Good";
    else if (score >= 70)
        level = "Satisfactory";
    else if (score >= 60)
        level = "Needs Support";
    else
        level = "At Risk";

    Console.WriteLine($"{studentNames[i],-12}{score,8}{"Active",12}{level,15}");
}

// === Summary ===
int enrolledCount = 0;
int totalScore = 0;
int highPerformers = 0;
int needsSupport = 0;

for (int i = 0; i < studentNames.Length; i++)
{
    if (!isEnrolled[i]) continue;

    enrolledCount++;
    totalScore += examScores[i];

    if (examScores[i] >= 90)
        highPerformers++;
    else if (examScores[i] < 70)
        needsSupport++;
}

double classAverage = enrolledCount > 0 ? (double)totalScore / enrolledCount : 0;

Console.WriteLine();
Console.WriteLine("=== Summary ===");
Console.WriteLine($"Total enrolled:    {enrolledCount}");
Console.WriteLine($"Class average:     {classAverage:F1}");
Console.WriteLine($"High performers:   {highPerformers}");
Console.WriteLine($"Needs support:     {needsSupport}");

// === Support List ===
Console.WriteLine();
Console.WriteLine("=== Students Needing Academic Support ===");

bool foundAny = false;
for (int i = 0; i < studentNames.Length; i++)
{
    if (isEnrolled[i] && examScores[i] < 70)
    {
        Console.WriteLine($"  - {studentNames[i]} (Score: {examScores[i]})");
        foundAny = true;
    }
}

if (!foundAny)
{
    Console.WriteLine("  No students need support at this time.");
}
```

## Expected Output

```
Student        Score      Status          Level
-----------------------------------------------
Sophia            95      Active      Excellent
Andrew            72      Active   Satisfactory
Emma              88      Active           Good
Logan            ---    Inactive            ---
Olivia            91      Active      Excellent
Noah              58      Active        At Risk

=== Summary ===
Total enrolled:    5
Class average:     80.8
High performers:   2
Needs support:     1

=== Students Needing Academic Support ===
  - Noah (Score: 58)
```

## Concepts Practiced

- **Parallel arrays** for storing related data
- **for loops** with index-based access
- **if/else-if/else** for multi-way categorization
- **`continue`** to skip iterations
- **String interpolation** with alignment specifiers
- **Aggregate calculations** (counts, averages, filtering)

*Based on the [freeCodeCamp Foundational C# with Microsoft Certification](https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/)*

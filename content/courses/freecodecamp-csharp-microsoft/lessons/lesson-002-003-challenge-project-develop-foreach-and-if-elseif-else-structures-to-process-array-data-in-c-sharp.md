---
id: lesson-002-003
title: Challenge Project - Develop foreach and if-elseif-else Structures to Process Array Data in C#
chapterId: chapter-02
order: 3
duration: 5
objectives:
  - Independently build an array-processing application
  - Apply foreach loops and conditional logic without step-by-step guidance
  - Translate requirements into working C# code
  - Practice problem-solving and debugging skills
---

# Challenge Project — Develop foreach and if-elseif-else Structures to Process Array Data in C#

## Challenge Overview

This is an **independent practice** challenge. Unlike the guided project, you'll receive requirements and expected output — but it's up to you to write the code. Try to complete the challenge on your own before looking at the solution.

## The Problem

A school needs a program to analyze student assignment submissions. Given data about students, their submitted assignments, and scores, the program should:

1. Display each student's name and their assignment scores
2. Calculate and show each student's average score
3. Determine each student's pass/fail status (passing is 70 or above)
4. Count how many assignments each student is missing (scored 0)
5. Show a class summary with overall statistics

## Starting Data

Use these arrays as your data source:

```csharp
string[] students = { "Alice", "Bob", "Charlie", "Diana" };

// Each student has 5 assignments; 0 means not submitted
int[][] assignments = {
    new int[] { 85, 92, 78, 90, 88 },     // Alice
    new int[] { 72, 0, 68, 74, 0 },        // Bob
    new int[] { 95, 98, 92, 0, 97 },       // Charlie
    new int[] { 60, 55, 0, 62, 0 }         // Diana
};
```

## Requirements

### Requirement 1: Student Detail Report

For each student, display:
- Their name
- All assignment scores (show "MISSING" for scores of 0)
- Their average (calculated from submitted assignments only)
- A status of "PASS" or "FAIL"

### Requirement 2: Missing Assignment Alerts

After the detail report, list students who have missing assignments with the count of missing work.

### Requirement 3: Class Summary

Display:
- Total number of students
- Number passing vs failing
- Class average (across all students' averages)

## Expected Output

Your program should produce output similar to this:

```
=== Student Detail Report ===

Alice:
  Assignments: 85, 92, 78, 90, 88
  Average: 86.6  |  Status: PASS

Bob:
  Assignments: 72, MISSING, 68, 74, MISSING
  Average: 71.3  |  Status: PASS

Charlie:
  Assignments: 95, 98, 92, MISSING, 97
  Average: 95.5  |  Status: PASS

Diana:
  Assignments: 60, 55, MISSING, 62, MISSING
  Average: 59.0  |  Status: FAIL

=== Missing Assignment Alerts ===
  - Bob: 2 missing assignment(s)
  - Charlie: 1 missing assignment(s)
  - Diana: 2 missing assignment(s)

=== Class Summary ===
  Total students: 4
  Passing: 3
  Failing: 1
  Class average: 78.1
```

## Hints

If you're stuck, here are some hints (try without them first!):

<details>
<summary>Hint 1: Calculating average from non-zero scores</summary>

Don't include scores of `0` in the average calculation. Track both the sum and the count of submitted (non-zero) assignments:

```csharp
int sum = 0;
int submitted = 0;
foreach (int score in assignments[i])
{
    if (score > 0)
    {
        sum += score;
        submitted++;
    }
}
double average = submitted > 0 ? (double)sum / submitted : 0;
```
</details>

<details>
<summary>Hint 2: Displaying scores with MISSING</summary>

Build a display string by checking each score:

```csharp
string[] display = new string[assignments[i].Length];
for (int j = 0; j < assignments[i].Length; j++)
{
    display[j] = assignments[i][j] == 0 ? "MISSING" : assignments[i][j].ToString();
}
Console.WriteLine($"  Assignments: {String.Join(", ", display)}");
```
</details>

<details>
<summary>Hint 3: Counting missing assignments</summary>

```csharp
int missing = 0;
foreach (int score in assignments[i])
{
    if (score == 0) missing++;
}
```
</details>

## Solution

Once you've attempted the challenge, compare your solution:

<details>
<summary>Click to reveal the complete solution</summary>

```csharp
string[] students = { "Alice", "Bob", "Charlie", "Diana" };

int[][] assignments = {
    new int[] { 85, 92, 78, 90, 88 },
    new int[] { 72, 0, 68, 74, 0 },
    new int[] { 95, 98, 92, 0, 97 },
    new int[] { 60, 55, 0, 62, 0 }
};

double[] averages = new double[students.Length];
int passing = 0;
int failing = 0;

Console.WriteLine("=== Student Detail Report ===");

for (int i = 0; i < students.Length; i++)
{
    Console.WriteLine();
    Console.WriteLine($"{students[i]}:");

    // Build display and calculate average
    string[] display = new string[assignments[i].Length];
    int sum = 0;
    int submitted = 0;
    int missing = 0;

    for (int j = 0; j < assignments[i].Length; j++)
    {
        if (assignments[i][j] == 0)
        {
            display[j] = "MISSING";
            missing++;
        }
        else
        {
            display[j] = assignments[i][j].ToString();
            sum += assignments[i][j];
            submitted++;
        }
    }

    averages[i] = submitted > 0 ? (double)sum / submitted : 0;
    string status = averages[i] >= 70 ? "PASS" : "FAIL";

    if (averages[i] >= 70) passing++;
    else failing++;

    Console.WriteLine($"  Assignments: {String.Join(", ", display)}");
    Console.WriteLine($"  Average: {averages[i]:F1}  |  Status: {status}");
}

// Missing assignment alerts
Console.WriteLine();
Console.WriteLine("=== Missing Assignment Alerts ===");

bool anyMissing = false;
for (int i = 0; i < students.Length; i++)
{
    int missing = 0;
    foreach (int score in assignments[i])
    {
        if (score == 0) missing++;
    }
    if (missing > 0)
    {
        Console.WriteLine($"  - {students[i]}: {missing} missing assignment(s)");
        anyMissing = true;
    }
}
if (!anyMissing)
    Console.WriteLine("  No missing assignments!");

// Class summary
double classAvg = 0;
foreach (double avg in averages) classAvg += avg;
classAvg /= averages.Length;

Console.WriteLine();
Console.WriteLine("=== Class Summary ===");
Console.WriteLine($"  Total students: {students.Length}");
Console.WriteLine($"  Passing: {passing}");
Console.WriteLine($"  Failing: {failing}");
Console.WriteLine($"  Class average: {classAvg:F1}");
```
</details>

## Concepts Practiced

- **Jagged arrays** (`int[][]`) for variable-length data
- **Nested loops** for processing 2D data
- **Conditional logic** for categorization and filtering
- **String.Join** for formatting array output
- **Independent problem-solving** from requirements to implementation

*Based on the [freeCodeCamp Foundational C# with Microsoft Certification](https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/)*

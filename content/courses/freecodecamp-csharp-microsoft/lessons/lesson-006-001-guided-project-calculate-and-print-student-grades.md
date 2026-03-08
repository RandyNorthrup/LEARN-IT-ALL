---
id: lesson-006-001
title: Guided Project - Calculate and Print Student Grades
chapterId: chapter-06
order: 1
duration: 5
objectives:
  - Use arrays to store collections of student scores
  - Iterate over arrays with foreach loops
  - Calculate averages from numeric data
  - Use conditional logic to assign letter grades
  - Build a complete working console application
---

# Guided Project — Calculate and Print Student Grades

## Project Overview

In this guided project you'll build a C# console application that takes an array of student exam scores, calculates each student's average, assigns a letter grade, and prints a formatted report. This project ties together arrays, loops, conditionals, and string formatting.

## Step 1: Set Up the Data

Start by defining the student names and their exam scores. Each student has scores from three assignments and two exams:

```csharp
string[] studentNames = { "Sophia", "Andrew", "Emma", "Logan" };

// Each row: Assignment1, Assignment2, Assignment3, Exam1, Exam2
int[] sophiaScores = { 90, 86, 87, 98, 100 };
int[] andrewScores = { 92, 89, 81, 70, 85 };
int[] emmaScores   = { 90, 85, 87, 90, 82 };
int[] loganScores  = { 90, 95, 87, 88, 96 };
```

## Step 2: Calculate Averages

Write a method that computes the average of an integer array:

```csharp
static double CalculateAverage(int[] scores)
{
    int sum = 0;
    foreach (int score in scores)
    {
        sum += score;
    }
    return (double)sum / scores.Length;
}
```

The cast to `double` ensures floating-point division rather than integer division.

## Step 3: Determine Letter Grades

Create a method that converts a numeric average to a letter grade:

```csharp
static string GetLetterGrade(double average)
{
    if (average >= 93)
        return "A";
    else if (average >= 90)
        return "A-";
    else if (average >= 87)
        return "B+";
    else if (average >= 83)
        return "B";
    else if (average >= 80)
        return "B-";
    else if (average >= 77)
        return "C+";
    else if (average >= 73)
        return "C";
    else if (average >= 70)
        return "C-";
    else if (average >= 67)
        return "D+";
    else if (average >= 63)
        return "D";
    else
        return "F";
}
```

## Step 4: Print the Report

Now combine everything to produce a formatted grade report:

```csharp
int[][] allScores = { sophiaScores, andrewScores, emmaScores, loganScores };

Console.WriteLine($"{"Student",-12}{"Average",10}{"Grade",8}");
Console.WriteLine(new string('-', 30));

for (int i = 0; i < studentNames.Length; i++)
{
    double avg = CalculateAverage(allScores[i]);
    string grade = GetLetterGrade(avg);
    Console.WriteLine($"{studentNames[i],-12}{avg,10:F1}{grade,8}");
}
```

## Step 5: Complete Working Program

Here is the full program in a single `Program.cs` file using top-level statements:

```csharp
string[] studentNames = { "Sophia", "Andrew", "Emma", "Logan" };

int[] sophiaScores = { 90, 86, 87, 98, 100 };
int[] andrewScores = { 92, 89, 81, 70, 85 };
int[] emmaScores   = { 90, 85, 87, 90, 82 };
int[] loganScores  = { 90, 95, 87, 88, 96 };

int[][] allScores = { sophiaScores, andrewScores, emmaScores, loganScores };

Console.WriteLine($"{"Student",-12}{"Average",10}{"Grade",8}");
Console.WriteLine(new string('-', 30));

for (int i = 0; i < studentNames.Length; i++)
{
    double avg = CalculateAverage(allScores[i]);
    string grade = GetLetterGrade(avg);
    Console.WriteLine($"{studentNames[i],-12}{avg,10:F1}{grade,8}");
}

static double CalculateAverage(int[] scores)
{
    int sum = 0;
    foreach (int score in scores)
    {
        sum += score;
    }
    return (double)sum / scores.Length;
}

static string GetLetterGrade(double average)
{
    if (average >= 93)
        return "A";
    else if (average >= 90)
        return "A-";
    else if (average >= 87)
        return "B+";
    else if (average >= 83)
        return "B";
    else if (average >= 80)
        return "B-";
    else if (average >= 77)
        return "C+";
    else if (average >= 73)
        return "C";
    else if (average >= 70)
        return "C-";
    else if (average >= 67)
        return "D+";
    else if (average >= 63)
        return "D";
    else
        return "F";
}
```

## Expected Output

```
Student       Average   Grade
------------------------------
Sophia          92.2      A-
Andrew          83.4       B
Emma            86.8      B+
Logan           91.2      A-
```

## Concepts Practiced

- **Arrays** for storing related data
- **foreach** loops for iteration
- **Casting** (`(double)`) to control division behavior
- **if/else-if chains** for multi-way branching
- **String interpolation** with alignment and format specifiers
- **Static local functions** in top-level statements

*Based on the [freeCodeCamp Foundational C# with Microsoft Certification](https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/)*

---
id: lesson-006-002
title: Guided Project - Calculate Final GPA
chapterId: chapter-06
order: 2
duration: 5
objectives:
  - Store course names and credit hours in arrays
  - Map letter grades to grade-point values
  - Calculate weighted GPA from course data
  - Format and display a transcript-style report
---

# Guided Project — Calculate Final GPA

## Project Overview

In this project you'll build a C# console application that calculates a student's Grade Point Average (GPA) from an array of courses, credit hours, and letter grades. You'll practice working with parallel arrays, type conversion, and formatted output.

## Understanding GPA Calculation

GPA is a **weighted average**. Each course has:
- A **letter grade** (A, B, C, D, F) with a corresponding point value
- A number of **credit hours** that determines the course's weight

The formula is:

$$
\text{GPA} = \frac{\sum (\text{grade points} \times \text{credit hours})}{\sum \text{credit hours}}
$$

## Step 1: Define the Data

Set up parallel arrays for course information:

```csharp
string[] courseNames = { "English 101", "Algebra", "Biology", "Computer Science", "Psychology" };
int[] creditHours    = { 3, 3, 4, 4, 3 };
string[] grades      = { "A", "B", "B", "A", "C" };
```

## Step 2: Map Letter Grades to Points

Create a method that converts a letter grade to its numeric equivalent:

```csharp
static double GradeToPoints(string grade)
{
    return grade switch
    {
        "A"  => 4.0,
        "A-" => 3.7,
        "B+" => 3.3,
        "B"  => 3.0,
        "B-" => 2.7,
        "C+" => 2.3,
        "C"  => 2.0,
        "C-" => 1.7,
        "D+" => 1.3,
        "D"  => 1.0,
        "F"  => 0.0,
        _    => 0.0
    };
}
```

This uses a **switch expression** (C# 8+), which is a concise way to map inputs to outputs.

## Step 3: Calculate the GPA

Loop through all courses, multiply each grade's point value by the credit hours, then divide by total credits:

```csharp
static double CalculateGpa(string[] grades, int[] creditHours)
{
    double totalPoints = 0;
    int totalCredits = 0;

    for (int i = 0; i < grades.Length; i++)
    {
        double points = GradeToPoints(grades[i]);
        totalPoints += points * creditHours[i];
        totalCredits += creditHours[i];
    }

    return totalCredits > 0 ? totalPoints / totalCredits : 0;
}
```

## Step 4: Display the Transcript

Print a formatted table showing each course, its grade, credit hours, and the calculated quality points:

```csharp
Console.WriteLine($"{"Course",-20}{"Grade",6}{"Credits",10}{"Points",10}");
Console.WriteLine(new string('=', 46));

for (int i = 0; i < courseNames.Length; i++)
{
    double pts = GradeToPoints(grades[i]) * creditHours[i];
    Console.WriteLine($"{courseNames[i],-20}{grades[i],6}{creditHours[i],10}{pts,10:F1}");
}

double gpa = CalculateGpa(grades, creditHours);
int totalCreds = 0;
foreach (int c in creditHours) totalCreds += c;

Console.WriteLine(new string('=', 46));
Console.WriteLine($"{"",-20}{"",-6}{"Total:",10}{totalCreds,0}");
Console.WriteLine($"\nFinal GPA: {gpa:F2}");
```

## Complete Working Program

```csharp
string[] courseNames = { "English 101", "Algebra", "Biology", "Computer Science", "Psychology" };
int[] creditHours    = { 3, 3, 4, 4, 3 };
string[] grades      = { "A", "B", "B", "A", "C" };

Console.WriteLine($"{"Course",-20}{"Grade",6}{"Credits",10}{"Points",10}");
Console.WriteLine(new string('=', 46));

for (int i = 0; i < courseNames.Length; i++)
{
    double pts = GradeToPoints(grades[i]) * creditHours[i];
    Console.WriteLine($"{courseNames[i],-20}{grades[i],6}{creditHours[i],10}{pts,10:F1}");
}

double gpa = CalculateGpa(grades, creditHours);
int totalCreds = 0;
foreach (int c in creditHours) totalCreds += c;

Console.WriteLine(new string('=', 46));
Console.WriteLine($"{"Total Credits:",-26}{totalCreds,20}");
Console.WriteLine($"\nFinal GPA: {gpa:F2}");

static double GradeToPoints(string grade)
{
    return grade switch
    {
        "A"  => 4.0,
        "A-" => 3.7,
        "B+" => 3.3,
        "B"  => 3.0,
        "B-" => 2.7,
        "C+" => 2.3,
        "C"  => 2.0,
        "C-" => 1.7,
        "D+" => 1.3,
        "D"  => 1.0,
        "F"  => 0.0,
        _    => 0.0
    };
}

static double CalculateGpa(string[] grades, int[] creditHours)
{
    double totalPoints = 0;
    int totalCredits = 0;

    for (int i = 0; i < grades.Length; i++)
    {
        double points = GradeToPoints(grades[i]);
        totalPoints += points * creditHours[i];
        totalCredits += creditHours[i];
    }

    return totalCredits > 0 ? totalPoints / totalCredits : 0;
}
```

## Expected Output

```
Course               Grade   Credits    Points
==============================================
English 101              A         3      12.0
Algebra                  B         3       9.0
Biology                  B         4      12.0
Computer Science         A         4      16.0
Psychology               C         3       6.0
==============================================
Total Credits:                         17

Final GPA: 3.24
```

## Concepts Practiced

- **Parallel arrays** to store related data across multiple arrays
- **Switch expressions** for clean value mapping
- **Weighted average** calculations
- **String interpolation** with alignment and formatting
- **Static local functions** in top-level statements

*Based on the [freeCodeCamp Foundational C# with Microsoft Certification](https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/)*

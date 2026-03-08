---
id: lesson-005-005
title: Guided Project - Work with Variable Data in C#
chapterId: chapter-05
order: 5
duration: 5
objectives:
  - Parse CSV-formatted data into strongly typed variables
  - Apply type conversion techniques to transform string data
  - Use string manipulation to clean and format output
  - Build a complete working console application using variable data techniques
---

# Guided Project — Work with Variable Data in C#

In this guided project, you will build a **pet adoption console application** that reads structured data, converts types, manipulates strings, and produces formatted output. This project ties together everything you have learned about variable data in C#.

## Project Overview

The Contoso Pets application manages a shelter's pet inventory. The app will:

1. Store pet data (species, ID, age, description, personality, nickname)
2. Display all pets with formatted output
3. Allow searching by characteristics

## Step 1 — Define the Data

Start by storing pet data in parallel arrays. In a real application you would read from a file or database, but for learning purposes we will embed the data as CSV strings and parse them:

```csharp
// Simulated CSV data: species,id,age,description,personality,nickname
string[] petData =
{
    "dog,d001,2,Medium size with golden fur,friendly and playful,Buddy",
    "dog,d002,5,Large size with black fur,calm and loyal,Shadow",
    "cat,c001,3,Small size with white fur,curious and independent,Snowball",
    "cat,c002,1,Medium size with tabby pattern,energetic and affectionate,Whiskers",
    "dog,d003,4,Small size with brown fur,shy but loving,Peanut",
    "cat,c003,6,Large size with orange fur,lazy and cuddly,Garfield"
};
```

## Step 2 — Parse the Data

Split each CSV record and convert to the appropriate types:

```csharp
string[] species = new string[petData.Length];
string[] ids = new string[petData.Length];
int[] ages = new int[petData.Length];
string[] descriptions = new string[petData.Length];
string[] personalities = new string[petData.Length];
string[] nicknames = new string[petData.Length];

for (int i = 0; i < petData.Length; i++)
{
    string[] fields = petData[i].Split(',');

    species[i] = fields[0].Trim();
    ids[i] = fields[1].Trim();

    if (!int.TryParse(fields[2].Trim(), out ages[i]))
    {
        Console.WriteLine($"Warning: Could not parse age for record {i}. Defaulting to 0.");
    }

    descriptions[i] = fields[3].Trim();
    personalities[i] = fields[4].Trim();
    nicknames[i] = fields[5].Trim();
}

Console.WriteLine($"Successfully loaded {petData.Length} pet records.\n");
```

## Step 3 — Display Formatted Pet Listings

Create a method that prints a nicely formatted table of all pets:

```csharp
void DisplayAllPets()
{
    Console.WriteLine("╔══════════════════════════════════════════════════════════════╗");
    Console.WriteLine("║              CONTOSO PETS — Available Animals               ║");
    Console.WriteLine("╠══════════════════════════════════════════════════════════════╣");

    for (int i = 0; i < petData.Length; i++)
    {
        string speciesLabel = species[i] == "dog" ? "🐕 Dog" : "🐈 Cat";
        string ageText = ages[i] == 1 ? "1 year" : $"{ages[i]} years";

        Console.WriteLine($"║ ID: {ids[i],-6} | {speciesLabel,-8} | {nicknames[i],-12} | Age: {ageText,-9} ║");
        Console.WriteLine($"║   Description:  {descriptions[i],-44} ║");
        Console.WriteLine($"║   Personality:  {personalities[i],-44} ║");
        Console.WriteLine("╠══════════════════════════════════════════════════════════════╣");
    }

    Console.WriteLine("╚══════════════════════════════════════════════════════════════╝");
}

DisplayAllPets();
```

## Step 4 — Search by Characteristic

Implement a search that checks descriptions and personalities using string methods:

```csharp
void SearchPets(string searchTerm)
{
    searchTerm = searchTerm.Trim().ToLower();

    if (string.IsNullOrEmpty(searchTerm))
    {
        Console.WriteLine("Please enter a search term.");
        return;
    }

    Console.WriteLine($"\nSearch results for \"{searchTerm}\":");
    Console.WriteLine(new string('-', 50));

    bool found = false;
    for (int i = 0; i < petData.Length; i++)
    {
        bool inDescription = descriptions[i].Contains(searchTerm, StringComparison.OrdinalIgnoreCase);
        bool inPersonality = personalities[i].Contains(searchTerm, StringComparison.OrdinalIgnoreCase);

        if (inDescription || inPersonality)
        {
            found = true;
            string matchLocation = (inDescription && inPersonality)
                ? "description & personality"
                : inDescription ? "description" : "personality";

            Console.WriteLine($"  {nicknames[i]} ({ids[i]}) — matched in {matchLocation}");
        }
    }

    if (!found)
    {
        Console.WriteLine("  No pets matched your search.");
    }
}
```

## Step 5 — Build the Menu Loop

Tie everything together with an interactive menu:

```csharp
bool running = true;

while (running)
{
    Console.WriteLine("\n--- Contoso Pets Menu ---");
    Console.WriteLine("1. Display all pets");
    Console.WriteLine("2. Search by characteristic");
    Console.WriteLine("3. Display dogs only");
    Console.WriteLine("4. Display cats only");
    Console.WriteLine("5. Exit");
    Console.Write("\nEnter your choice: ");

    string? choice = Console.ReadLine();

    switch (choice)
    {
        case "1":
            DisplayAllPets();
            break;
        case "2":
            Console.Write("Enter search term: ");
            string? term = Console.ReadLine();
            SearchPets(term ?? "");
            break;
        case "3":
            DisplayBySpecies("dog");
            break;
        case "4":
            DisplayBySpecies("cat");
            break;
        case "5":
            running = false;
            Console.WriteLine("Goodbye!");
            break;
        default:
            Console.WriteLine("Invalid choice. Please enter 1-5.");
            break;
    }
}

void DisplayBySpecies(string targetSpecies)
{
    Console.WriteLine($"\n{targetSpecies.ToUpper()}S:");
    for (int i = 0; i < petData.Length; i++)
    {
        if (species[i].Equals(targetSpecies, StringComparison.OrdinalIgnoreCase))
        {
            string ageText = ages[i] == 1 ? "1 year old" : $"{ages[i]} years old";
            Console.WriteLine($"  {nicknames[i],-12} | {ageText,-14} | {descriptions[i]}");
        }
    }
}
```

## What You Practiced

This project exercised every skill from the "Work with Variable Data" chapter:

| Skill | How It Was Used |
|-------|----------------|
| Type conversion | `int.TryParse` for ages |
| String methods | `Split`, `Trim`, `ToLower`, `Contains`, `Equals` |
| Formatting | String interpolation with alignment (`,-12`), padding |
| Arrays | Parallel arrays for structured data, indexed access |
| Control flow | `switch`, `while` loop, `if`/`else` branching |

## Recap

You built a complete console application that parses CSV data into typed arrays, formats output for readable display, and searches text using built-in string methods. These are the foundational skills for data-driven C# applications.

*Based on the [freeCodeCamp Foundational C# with Microsoft Certification](https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/)*

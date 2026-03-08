---
id: lesson-005-001
title: Challenge Project - Work with Variable Data in C#
chapterId: chapter-05
order: 1
duration: 5
objectives:
  - Extend an existing application with new search and filter features
  - Apply string manipulation and type conversion to solve requirements
  - Work from a requirements specification rather than step-by-step instructions
---

# Challenge Project — Work with Variable Data in C#

Now it is your turn. In this challenge, you will extend the Contoso Pets application from the guided project by adding search and filter functionality. Unlike the guided project, you will receive requirements — not step-by-step instructions. Use what you have learned to figure out the implementation.

## Starting Point

Begin with the completed guided project code (or a clean version below). The app already has pet data stored in arrays and a basic menu. Your job is to add the features described in the requirements.

Here is the minimum starting state you need:

```csharp
// Pet data arrays (already populated)
string[] species = { "dog", "dog", "cat", "cat", "dog", "cat" };
string[] ids = { "d001", "d002", "c001", "c002", "d003", "c003" };
int[] ages = { 2, 5, 3, 1, 4, 6 };
string[] descriptions =
{
    "Medium size with golden fur",
    "Large size with black fur",
    "Small size with white fur",
    "Medium size with tabby pattern",
    "Small size with brown fur",
    "Large size with orange fur"
};
string[] personalities =
{
    "friendly and playful",
    "calm and loyal",
    "curious and independent",
    "energetic and affectionate",
    "shy but loving",
    "lazy and cuddly"
};
string[] nicknames = { "Buddy", "Shadow", "Snowball", "Whiskers", "Peanut", "Garfield" };
```

## Requirements

### Requirement 1 — Multi-Term Search

Allow the user to enter multiple search terms separated by commas. The app should find pets that match **any** of the terms in either their description or personality.

**Example input:** `friendly, orange, small`

**Expected behavior:**
- Search each term independently (trim whitespace)
- Display which term(s) matched for each result
- Show a "no results" message if nothing matches

> **Hint:** Use `string.Split(',')` to break the input into individual terms. Loop through each term and each pet, checking with `Contains`.

### Requirement 2 — Age Filter

Add a menu option that lets the user filter pets by age range. The user enters a minimum and maximum age, and the app displays only pets within that range.

**Example interaction:**
```
Enter minimum age: 2
Enter maximum age: 4
```

**Expected behavior:**
- Use `int.TryParse` to validate both inputs
- Display matching pets with formatted output
- Handle invalid input gracefully

> **Hint:** Validate the input first. If `min > max`, either swap them or show an error message.

### Requirement 3 — Edit Pet Nickname

Add a menu option that lets the user change a pet's nickname. The user selects a pet by ID and enters the new nickname.

**Expected behavior:**
- Prompt for the pet ID
- Validate that the ID exists (use `Array.IndexOf`)
- Show the current nickname and ask for the new one
- Update the nickname in the array
- Confirm the change

> **Hint:** `Array.IndexOf(ids, userInput)` returns the index or `-1` if not found.

### Requirement 4 — Summary Statistics

Add a menu option that displays summary statistics:
- Total number of pets
- Number of dogs vs cats
- Average age (formatted to one decimal place)
- Oldest and youngest pet (with nickname)

> **Hint:** You can compute these with simple loops, or use `Array.FindIndex` and LINQ methods like `ages.Average()`.

## Acceptance Criteria

Your solution should:

- [ ] Handle all four requirements above
- [ ] Not crash on invalid input (use `TryParse` and null checks)
- [ ] Display results with clear formatting
- [ ] Return to the main menu after each operation

## Tips for Success

- **Start small.** Implement one requirement at a time and test it before moving on.
- **Reuse patterns.** The search from the guided project can be adapted for multi-term search.
- **Test edge cases.** What happens if the user enters an empty string? A negative age? An ID that does not exist?
- **Keep your code organized.** Use separate methods (or local functions) for each feature to keep your main loop clean.

## What You Are Practicing

| Skill | Where It Applies |
|-------|-----------------|
| `string.Split` and `Trim` | Multi-term search parsing |
| `int.TryParse` | Age filter input validation |
| `Array.IndexOf` | Finding a pet by ID |
| String interpolation with formatting | Summary statistics display |
| `Contains` with `StringComparison` | Case-insensitive search |

Good luck! When you are satisfied with your solution, compare your approach to the patterns used in the guided project to see alternative ways to solve the same problems.

*Based on the [freeCodeCamp Foundational C# with Microsoft Certification](https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/)*

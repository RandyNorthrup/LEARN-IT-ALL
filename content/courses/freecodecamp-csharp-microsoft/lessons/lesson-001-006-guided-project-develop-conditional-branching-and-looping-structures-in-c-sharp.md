---
id: lesson-001-006
title: Guided Project - Develop Conditional Branching and Looping Structures in C#
chapterId: chapter-01
order: 6
duration: 5
objectives:
  - Build a text-based RPG game loop using while and do-while
  - Implement a menu system with switch statements
  - Manage player stats with variables and conditional logic
  - Create battle logic combining loops, conditionals, and random numbers
---

# Guided Project — Develop Conditional Branching and Looping Structures in C#

In this guided project, you will build a complete **text-based RPG game** that uses every control-flow construct you have learned: `if`/`else`, `switch`, `while`, `do-while`, and `for` loops. You will create a game loop, a menu system, player stats, and a turn-based battle system.

## Project Overview

**Dragon's Quest** is a console RPG where the player explores, fights monsters, and tries to survive. The game features:

- A main game loop with a menu
- Player stats (health, attack, gold, potions)
- Turn-based combat with random damage
- A shop to buy potions
- Win/lose conditions

## Step 1 — Set Up Player Stats

```csharp
using System;

// Player stats
string playerName = "";
int playerHealth = 100;
int playerMaxHealth = 100;
int playerAttack = 15;
int playerGold = 50;
int potions = 3;
int monstersDefeated = 0;
const int monstersToWin = 5;

Random random = new Random();
```

## Step 2 — Get the Player's Name

Use a `do-while` loop to ensure the player enters a valid name:

```csharp
Console.WriteLine("=== DRAGON'S QUEST ===\n");

do
{
    Console.Write("Enter your hero's name: ");
    playerName = Console.ReadLine()?.Trim() ?? "";

    if (string.IsNullOrWhiteSpace(playerName))
    {
        Console.WriteLine("Please enter a valid name.");
    }
} while (string.IsNullOrWhiteSpace(playerName));

Console.WriteLine($"\nWelcome, {playerName}! Defeat {monstersToWin} monsters to win.");
Console.WriteLine("Your journey begins...\n");
```

## Step 3 — Build the Main Game Loop

The game runs until the player dies, wins, or quits:

```csharp
bool gameRunning = true;

while (gameRunning && playerHealth > 0 && monstersDefeated < monstersToWin)
{
    // Display status
    Console.WriteLine($"\n--- {playerName} | HP: {playerHealth}/{playerMaxHealth} | ATK: {playerAttack} | Gold: {playerGold} | Potions: {potions} ---");
    Console.WriteLine($"Monsters defeated: {monstersDefeated}/{monstersToWin}");

    // Show menu
    Console.WriteLine("\nWhat would you like to do?");
    Console.WriteLine("1. Explore (fight a monster)");
    Console.WriteLine("2. Use a potion");
    Console.WriteLine("3. Visit the shop");
    Console.WriteLine("4. View stats");
    Console.WriteLine("5. Quit");
    Console.Write("\nChoice: ");

    string? choice = Console.ReadLine();

    switch (choice)
    {
        case "1":
            FightMonster();
            break;
        case "2":
            UsePotion();
            break;
        case "3":
            VisitShop();
            break;
        case "4":
            ViewStats();
            break;
        case "5":
            gameRunning = false;
            Console.WriteLine($"\n{playerName} retreats from the quest. Farewell!");
            break;
        default:
            Console.WriteLine("Invalid choice. Please enter 1-5.");
            break;
    }
}
```

## Step 4 — Implement Combat

The battle system uses a `while` loop for turn-based combat:

```csharp
void FightMonster()
{
    // Generate a random monster
    string[] monsterNames = { "Goblin", "Skeleton", "Dark Elf", "Troll", "Shadow Wolf" };
    string monsterName = monsterNames[random.Next(monsterNames.Length)];
    int monsterHealth = random.Next(30, 70);
    int monsterAttack = random.Next(5, 20);

    Console.WriteLine($"\nA wild {monsterName} appears! (HP: {monsterHealth}, ATK: {monsterAttack})");

    // Battle loop
    while (monsterHealth > 0 && playerHealth > 0)
    {
        Console.Write("\n[A]ttack or [R]un? ");
        string? action = Console.ReadLine()?.ToLower();

        if (action == "r")
        {
            bool escaped = random.Next(100) < 50; // 50% chance to escape
            if (escaped)
            {
                Console.WriteLine("You escaped successfully!");
                return;
            }
            else
            {
                Console.WriteLine("You failed to escape!");
            }
        }
        else if (action == "a")
        {
            // Player attacks
            int playerDamage = random.Next(playerAttack / 2, playerAttack + 1);
            monsterHealth -= playerDamage;
            Console.WriteLine($"You deal {playerDamage} damage to the {monsterName}!");

            if (monsterHealth <= 0)
            {
                int goldReward = random.Next(10, 30);
                playerGold += goldReward;
                monstersDefeated++;
                Console.WriteLine($"\nYou defeated the {monsterName}! +{goldReward} gold");
                return;
            }
        }
        else
        {
            Console.WriteLine("Invalid action.");
            continue;
        }

        // Monster attacks
        int monsterDamage = random.Next(monsterAttack / 2, monsterAttack + 1);
        playerHealth -= monsterDamage;
        Console.WriteLine($"The {monsterName} deals {monsterDamage} damage to you! (HP: {Math.Max(0, playerHealth)}/{playerMaxHealth})");
    }
}
```

## Step 5 — Potions and Shop

```csharp
void UsePotion()
{
    if (potions <= 0)
    {
        Console.WriteLine("You have no potions!");
        return;
    }

    if (playerHealth == playerMaxHealth)
    {
        Console.WriteLine("Your health is already full!");
        return;
    }

    potions--;
    int healAmount = 30;
    playerHealth = Math.Min(playerHealth + healAmount, playerMaxHealth);
    Console.WriteLine($"You used a potion! +{healAmount} HP (HP: {playerHealth}/{playerMaxHealth}). Potions remaining: {potions}");
}

void VisitShop()
{
    Console.WriteLine("\n=== SHOP ===");
    Console.WriteLine($"Your gold: {playerGold}");
    Console.WriteLine("1. Health Potion — 20 gold");
    Console.WriteLine("2. Strength Boost (+5 ATK) — 40 gold");
    Console.WriteLine("3. Leave shop");
    Console.Write("Choice: ");

    string? shopChoice = Console.ReadLine();

    switch (shopChoice)
    {
        case "1":
            if (playerGold >= 20)
            {
                playerGold -= 20;
                potions++;
                Console.WriteLine($"Purchased a potion! Potions: {potions}, Gold: {playerGold}");
            }
            else
            {
                Console.WriteLine("Not enough gold!");
            }
            break;
        case "2":
            if (playerGold >= 40)
            {
                playerGold -= 40;
                playerAttack += 5;
                Console.WriteLine($"Attack increased to {playerAttack}! Gold: {playerGold}");
            }
            else
            {
                Console.WriteLine("Not enough gold!");
            }
            break;
        case "3":
            Console.WriteLine("You leave the shop.");
            break;
        default:
            Console.WriteLine("Invalid choice.");
            break;
    }
}

void ViewStats()
{
    Console.WriteLine($"\n=== {playerName.ToUpper()}'S STATS ===");
    Console.WriteLine($"  Health:    {playerHealth}/{playerMaxHealth}");
    Console.WriteLine($"  Attack:    {playerAttack}");
    Console.WriteLine($"  Gold:      {playerGold}");
    Console.WriteLine($"  Potions:   {potions}");
    Console.WriteLine($"  Defeated:  {monstersDefeated}/{monstersToWin}");
}
```

## Step 6 — Win/Lose Conditions

Add this after the main game loop:

```csharp
// End game message
if (playerHealth <= 0)
{
    Console.WriteLine($"\n{playerName} has fallen in battle. Game Over.");
    Console.WriteLine($"Monsters defeated: {monstersDefeated}");
}
else if (monstersDefeated >= monstersToWin)
{
    Console.WriteLine($"\nCongratulations, {playerName}! You defeated all {monstersToWin} monsters!");
    Console.WriteLine($"Final stats — Gold: {playerGold}, HP: {playerHealth}/{playerMaxHealth}");
    Console.WriteLine("You are the champion of Dragon's Quest!");
}
```

## What You Practiced

| Concept | Where It Was Used |
|---------|-------------------|
| `while` loop | Main game loop, battle loop |
| `do-while` | Name input validation |
| `switch` statement | Menu system, shop |
| `if`/`else` | Combat logic, potion usage, gold checks |
| `break` and `continue` | Loop control in battle |
| Variable scope | Player stats at method level, monster stats in battle scope |
| `Random` | Monster generation, damage calculation |

## Recap

You built a fully functional text-based RPG using every control-flow construct covered in this chapter. The game loop, menu system, and battle logic demonstrate how `while`, `switch`, `if`/`else`, and scope rules work together in a real application.

*Based on the [freeCodeCamp Foundational C# with Microsoft Certification](https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/)*

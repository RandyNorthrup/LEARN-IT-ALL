---
id: lesson-001-003
title: Challenge Project - Develop Branching and Looping Structures in C#
chapterId: chapter-01
order: 3
duration: 5
objectives:
  - Extend an existing game with inventory, multiple enemy types, and leveling
  - Design program logic from requirements without step-by-step instructions
  - Apply branching and looping structures to complex, interconnected features
---

# Challenge Project — Develop Branching and Looping Structures in C#

Time to prove your skills. In this challenge, you will extend the Dragon's Quest RPG from the guided project by adding an inventory system, multiple enemy types with unique behaviors, and a leveling-up mechanic. You receive the requirements — you design the solution.

## Starting Point

Begin with the completed guided project. Your player already has stats, a game loop, a battle system, and a shop. Now you will layer on three new features.

## Requirement 1 — Inventory System

Add an inventory that the player can manage from the main menu.

**Specifications:**

- The player starts with no items (use a `List<string>` or a string array)
- Items can be found after defeating monsters (random chance)
- Possible items: `"Iron Shield"`, `"Lucky Charm"`, `"Fire Scroll"`, `"Healing Ring"`, `"Speed Boots"`
- Add a menu option to view inventory
- Add a menu option to use an item (each item has a different effect):
  - **Iron Shield:** reduces damage taken in next battle by 50% (one-time use)
  - **Lucky Charm:** guarantees escape on next run attempt (one-time use)
  - **Fire Scroll:** deals 30 bonus damage on next attack (one-time use)
  - **Healing Ring:** heals 15 HP immediately (one-time use)
  - **Speed Boots:** permanently increases escape chance to 75%
- Items are consumed when used (except Speed Boots which are permanent)

> **Hint:** Track active effects with `bool` flags like `hasShieldActive` and `hasFireScrollActive`. Reset them after they are consumed in combat.

> **Hint:** For the inventory list, `List<string>` is easier to manage than arrays since you need to add and remove items dynamically.

## Requirement 2 — Multiple Enemy Types

Replace the generic random monster with distinct enemy types that have unique behaviors.

**Specifications:**

| Enemy | HP Range | ATK Range | Special Behavior |
|-------|----------|-----------|-----------------|
| Goblin | 20–40 | 5–10 | 25% chance to steal 5 gold on hit |
| Skeleton | 30–50 | 8–15 | Takes half damage from normal attacks |
| Dark Elf | 40–60 | 10–18 | 30% chance to dodge player attack |
| Troll | 50–80 | 12–20 | Regenerates 5 HP each turn |
| Dragon (boss) | 100–150 | 20–30 | Only appears as the final monster |

- The dragon should only appear when the player has defeated the required number of regular monsters
- Display the enemy's special ability when the battle starts
- Implement each special behavior in the battle loop using conditionals

> **Hint:** Use a `switch` expression or `switch` statement on the monster name to apply the special behavior each turn.

## Requirement 3 — Leveling Up

Add an experience (XP) system with levels.

**Specifications:**

- The player starts at Level 1 with 0 XP
- Each monster defeated grants XP: `monsterMaxHP / 2` (rounded down)
- XP thresholds for leveling up:
  - Level 2: 50 XP
  - Level 3: 120 XP
  - Level 4: 200 XP
  - Level 5: 300 XP
- On level up:
  - Max HP increases by 20
  - Current HP is fully restored
  - Attack increases by 5
  - Display a congratulatory message
- Show current level and XP in the stats display

> **Hint:** Store the XP thresholds in an `int[]` array. After adding XP, use a `while` loop to check if the player has enough XP for the next level (they might gain multiple levels at once from a boss fight).

## Acceptance Criteria

Your solution should:

- [ ] Allow viewing and using inventory items from the menu
- [ ] Have at least 4 distinct enemy types with working special behaviors
- [ ] Include a boss fight (dragon) as the final encounter
- [ ] Track XP and implement leveling up with stat increases
- [ ] Handle edge cases (using items when inventory is empty, using potions at full health, etc.)
- [ ] Not crash on any input — validate everything

## Design Tips

**Start with data structures.** Before writing logic, decide how you will store:
- Inventory items (array, list, or dictionary?)
- Active item effects (bool flags? an enum?)
- XP thresholds (array? constants?)

**Test incrementally.** Add one feature at a time:
1. First: inventory display and item pickup
2. Then: item usage and effects in combat
3. Then: multiple enemy types with special behaviors
4. Finally: XP tracking and leveling

**Keep your code organized.** Each feature should be in its own local function or method. A 300-line `Main` method is hard to debug.

## What You Are Practicing

| Skill | Where It Applies |
|-------|-----------------|
| `List<T>` and dynamic collections | Inventory management |
| `switch` with patterns | Enemy type behavior |
| `while` loop with multiple conditions | Battle loop, level-up checking |
| `do-while` | Menu input validation |
| Variable scope | Item effect flags, combat-local vs game-wide |
| Boolean logic | Combining conditions for special behaviors |
| `Random` | Item drops, enemy special ability triggers |

Good luck, adventurer! The dragon awaits.

*Based on the [freeCodeCamp Foundational C# with Microsoft Certification](https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/)*

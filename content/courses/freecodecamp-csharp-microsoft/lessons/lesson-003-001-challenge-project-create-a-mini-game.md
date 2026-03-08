---
id: lesson-003-001
title: Challenge Project - Create a Mini-Game
chapterId: chapter-03
order: 1
duration: 5
objectives:
  - Design a console mini-game using method decomposition
  - Apply method parameters and return values in a real project
  - Implement game logic with well-structured methods
  - Test and iterate on a complete application
---

# Challenge Project — Create a Mini-Game

In this challenge, you'll build a console-based number guessing tournament. The game pits the player against the computer across multiple rounds. You'll practice method decomposition by breaking the game into small, focused methods.

## Game Rules

1. The game runs a configurable number of rounds (best of 3, 5, or 7)
2. Each round, a random target number is generated between 1 and 100
3. The player and computer each guess the target number
4. The closest guess wins the round
5. After all rounds, the overall winner is announced

## Requirements

Your solution should include the following methods at minimum:

| Method | Purpose |
|--------|---------|
| `DisplayWelcome()` | Print the game title and rules |
| `GetRoundCount()` | Ask the player how many rounds to play (3, 5, or 7) |
| `GenerateTarget()` | Return a random number between 1 and 100 |
| `GetPlayerGuess(int round)` | Prompt and return the player's guess with input validation |
| `GetComputerGuess()` | Return a random guess for the computer |
| `DetermineRoundWinner(int target, int playerGuess, int computerGuess)` | Return who won the round |
| `DisplayRoundResult(...)` | Show the target, both guesses, and who won |
| `DisplayFinalResult(int playerWins, int computerWins)` | Announce the tournament winner |

## Starter Skeleton

Here's a skeleton to get you started. Fill in each method:

```csharp
DisplayWelcome();
int rounds = GetRoundCount();

int playerWins = 0;
int computerWins = 0;

for (int round = 1; round <= rounds; round++)
{
    Console.WriteLine($"\n--- Round {round} of {rounds} ---");

    int target = GenerateTarget();
    int playerGuess = GetPlayerGuess(round);
    int computerGuess = GetComputerGuess();

    string winner = DetermineRoundWinner(target, playerGuess, computerGuess);

    if (winner == "Player") playerWins++;
    else if (winner == "Computer") computerWins++;

    DisplayRoundResult(target, playerGuess, computerGuess, winner);
}

DisplayFinalResult(playerWins, computerWins);
```

## Hints for Implementation

**`GetRoundCount()`** should validate that the input is 3, 5, or 7. Loop until valid input is received:

```csharp
static int GetRoundCount()
{
    int count = 0;
    while (count != 3 && count != 5 && count != 7)
    {
        Console.Write("How many rounds? (3, 5, or 7): ");
        int.TryParse(Console.ReadLine(), out count);
    }
    return count;
}
```

**`GetPlayerGuess()`** should validate the input is between 1 and 100:

```csharp
static int GetPlayerGuess(int round)
{
    int guess = 0;
    while (guess < 1 || guess > 100)
    {
        Console.Write($"Round {round} - Enter your guess (1-100): ");
        int.TryParse(Console.ReadLine(), out guess);
    }
    return guess;
}
```

**`DetermineRoundWinner()`** should compare distances from the target:

```csharp
static string DetermineRoundWinner(int target, int playerGuess, int computerGuess)
{
    int playerDistance = Math.Abs(target - playerGuess);
    int computerDistance = Math.Abs(target - computerGuess);

    if (playerDistance < computerDistance) return "Player";
    if (computerDistance < playerDistance) return "Computer";
    return "Tie";
}
```

## Sample Session

```
========================================
  NUMBER GUESSING TOURNAMENT
========================================
Guess closest to the target number (1-100) to win each round!

How many rounds? (3, 5, or 7): 3

--- Round 1 of 3 ---
Round 1 - Enter your guess (1-100): 42
Target: 37 | You: 42 | Computer: 68
You win this round! (Distance: 5 vs 31)

--- Round 2 of 3 ---
Round 2 - Enter your guess (1-100): 75
Target: 91 | You: 75 | Computer: 88
Computer wins this round! (Distance: 16 vs 3)

--- Round 3 of 3 ---
Round 3 - Enter your guess (1-100): 50
Target: 55 | You: 50 | Computer: 23
You win this round! (Distance: 5 vs 32)

========================================
Final Score: Player 2 - Computer 1
Congratulations, you win the tournament!
========================================
```

## Stretch Goals

Once the basic game works, consider adding:

- **Difficulty levels** — adjust the computer's guess range (easy: random 1–100, hard: within 20 of target)
- **Score history** — track wins across multiple tournaments using an array
- **Hint system** — after each guess, tell the player if they were "hot" or "cold"
- **Replay prompt** — ask "Play again?" after each tournament

Each extension requires adding new methods, reinforcing the decomposition skill.

## What You're Practicing

- Breaking a complex program into small methods with clear contracts
- Using return values to pass data between methods
- Input validation with loops
- Combining `void` methods (display) with returning methods (logic)

*Based on the [freeCodeCamp Foundational C# with Microsoft Certification](https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/)*

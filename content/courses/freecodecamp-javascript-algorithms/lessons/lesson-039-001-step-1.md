---
id: lesson-039-001
title: Step 1
chapterId: chapter-39
order: 1
duration: 5
objectives:
  - Step 1
---

# Step 1

In this project, you will learn algorithmic thinking by building a dice game. There are a total of 6 rounds and for each round, the player can roll the dice up to 3 times and collect a score. 

The HTML and CSS have been provided for you. Feel free to explore them. When you are ready, you will need to set up your HTML variables. Get all of your `.die` elements and assign them to a `listOfAllDice` variable. Get your score inputs (the `input` elements in your `#score-options`) and score spans, and assign them to `scoreInputs` and `scoreSpans`. Assign the `#current-round` element to `roundElement` and the `#current-round-rolls` element to `rollsElement`, then do the same for your `#total-score` and `#score-history` elements. Assign your `#roll-dice-btn`, `#keep-score-btn`, `#rules-btn`, and `.rules-container` to variables with properly formatted names.

When the user clicks on the `Show rules` button, they should be able to toggle between showing and hiding the game rules. Create a variable `isModalShowing` to track the state of the game rules.

Each time the user rolls the dice, you will need to keep track of all of the dice values. Create a variable `diceValuesArr` to track this.

Throughout the game, you will need to keep track of the current score, total score, number of rolls and which round the player is on. Declare `rolls`, `score`, and `round` variables for this purpose.

Think about what the starting value of each of these variables should be. All of these variables should be able to be reassigned.

## Starter Code

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Advanced Dice Game</title>
  <link rel="stylesheet" href="styles.css" />
</head>

<body>
  <header>
    <h1>Advanced Dice Game</h1>
    <button class="btn" id="rules-btn" type="button">Show rules</button>
    <div class="rules-container">
      <h2>Rules</h2>
      <ul>
        <li>There are total of six rounds</li>
        <li>You can only roll the dice three times per round</li>
        <li>To start the game, roll the dice</li>
        <li>
          Then, choose from one of the selected scores or roll the dice again
        </li>
        <li>
          If you choose a selected score, then you will move to the next round
        </li>
        <li>
          If you decline to choose a selected score, then you can roll the
          dice again two more times
        </li>
      </ul>
      <h2 class="points">Points</h2>
      <ul>
        <li>Three of a kind: Sum of all five dice</li>
        <li>Four of a kind: Sum of all five dice</li>
        <li>Full house: Three of a kind and a pair - 25 points</li>
        <li>
          Small straight: Four of the dice have consecutive values - 30 points
        </li>
        <li>
          Large straight: All five dice have consecutive values - 40 points
        </li>
      </ul>
    </div>
  </header>

  <main>
    <form id="game">
      <div id="dice">
        <div class="die"></div>
        <div class="die"></div>
        <div class="die"></div>
        <div class="die"></div>
        <div class="die"></div>
      </div>

      <p class="rounds-text">
        <strong>Rolls:</strong> <span id="current-round-rolls">0</span> |
        <strong>Round:</strong> <span id="current-round">1</span>
      </p>

      <div id="score-options">
        <div>
          <input type="radio" name="score-options" id="three-of-a-kind" value="three-of-a-kind" disabled />
          <label for="three-of-a-kind">Three of a kind<span></span></label>
        </div>
        <div>
          <input type="radio" name="score-options" id="four-of-a-kind" value="four-of-a-kind" disabled />
          <label for="four-of-a-kind">Four of a kind<span></span></label>
        </div>
        <div>
          <input type="radio" name="score-options" id="full-house" value="full-house" disabled />
          <label for="full-house">Full house<span></span></label>
        </div>
        <div>
          <input type="radio" name="score-options" id="small-straight" value="small-straight" disabled />
          <label for="small-straight">Small straight<span></span></label>
        </div>
        <div>
          <input type="radio" name="score-options" id="large-straight" value="large-straight" disabled />
          <label for="large-straight">Large straight<span></span></label>
        </div>

        <div>
          <input type="radio" name="score-options" id="none" value="none" disabled />
          <label for="none">None of the above<span></span></label>
        </div>
      </div>

      <button class="btn" id="keep-score-btn" type="button">
        Keep the above selected score
      </button>
      <button class="btn" id="roll-dice-btn" type="button">
        Roll the dice
      </button>
    </form>

    <div id="scores">
      <h3>Score history (Total score: <span id="total-score">0</span>)</h3>
      <ol id="score-history"></ol>
    </div>
  </main>
  <script src="./script.js"></script>
</body>

</html>
```

## Hints

1. You should assign your `.die` elements to `listOfAllDice`.
2. You should assign your `#score-options input` elements to `scoreInputs`.
3. You should assign your `#score-options span` elements to `scoreSpans`.
4. You should assign your `#current-round` element to `roundElement`.
5. You should assign your `#current-round-rolls` element to `rollsElement`.
6. You should assign your `#total-score` element to `totalScoreElement`.
7. You should assign your `#score-history` element to `scoreHistory`.
8. You should assign your `#roll-dice-btn` element to `rollDiceBtn`.
9. You should assign your `#keep-score-btn` element to `keepScoreBtn`.
10. You should assign your `#rules-btn` element to `rulesBtn`.
11. You should assign your `.rules-container` element to `rulesContainer`.
12. Your `isModalShowing` variable should have the value `false`.
13. Your `diceValuesArr` should have an empty array for the value.
14. Your `rolls` variable should have the value `0`.
15. Your `score` variable should have the value `0`.
16. Your `round` variable should have the value `1`.
17. All of your new variables should be declared with `let`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 657a0ea50da0c8d9d6d7950a*

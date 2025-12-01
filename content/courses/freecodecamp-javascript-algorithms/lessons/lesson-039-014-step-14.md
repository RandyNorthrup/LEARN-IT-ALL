---
id: lesson-039-014
title: Step 14
chapterId: chapter-39
order: 14
duration: 5
objectives:
  - Step 14
---

# Step 14

For the last portion of the game, you will need to create an algorithm that checks for the presence of a straight. A small straight is when four of the dice have consecutive values in any order (Ex. in a roll of `41423`, we have `1234`) resulting in a score of `30` points. A large straight is when all five dice have consecutive values in any order (Ex. in a roll of `35124`, we have `12345`) resulting in a score of `40` points.

Declare a `checkForStraights` function which accepts an array of numbers. If the user gets a large straight, update the fifth radio button with a score of `40`. If the user gets a small straight, update the fourth radio button with a score of `30`. Regardless, it should always update the last radio button to display a score of 0, with the correct attributes.

Call your `checkForStraights` function when the `rollDiceBtn` is clicked to complete your dice game!

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

1. Your `checkForStraights` variable should be a function.
2. If a small straight is rolled, your `checkForStraights` function should enable the fourth radio button, set the value to `30`, update the displayed text to `, score = 30` and leave the fifth radio button disabled.
3. If a large straight is rolled, your `checkForStraights` function should enable the fourth button, set the value to `30`, update the displayed text to `, score = 30`. Additionally, the function should enable the fifth radio button, set the value to `40`, and update the displayed text to `, score = 40`.
4. If no straight is rolled, your `checkForStraights` function should not enable the fourth or fifth radio button.
5. If no straight is rolled, your `checkForStraights` function should enable the final radio button set the value to `0`, and update the displayed text to `, score = 0`.
6. You should call the `checkForStraights` function when the `rollDiceBtn` is clicked.
7. Math.random = myMathRandom;
8. try {
  rollDiceBtn.click();
} finally {
  Math.random = origMathRandom;
}
9. assert.isFalse(scoreInputs[4].disabled);
assert.strictEqual(scoreInputs[4].value, "40");
assert.strictEqual(scoreSpans[4].innerText, ", score = 40");

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 657e230500602983e01fff6e*

---
id: lesson-015-126
title: Step 140
chapterId: chapter-15
order: 126
duration: 5
objectives:
  - Step 140
---

# Step 140

Back to your `attack` function - inside the `else if` block, create another `if` and `else` statement. If the player is fighting the dragon (`fighting` would be `2`), call the `winGame` function. Move the `defeatMonster()` call to the `else` block.

For this step, you will need to use the strict equality (`===`) operator to check if `fighting` is equal to `2`.

## Starter Code

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="./styles.css">
    <title>RPG - Dragon Repeller</title>
  </head>
  <body>
    <div id="game">
      <div id="stats">
        <span class="stat">XP: <strong><span id="xpText">0</span></strong></span>
        <span class="stat">Health: <strong><span id="healthText">100</span></strong></span>
        <span class="stat">Gold: <strong><span id="goldText">50</span></strong></span>
      </div>
      <div id="controls">
        <button id="button1">Go to store</button>
        <button id="button2">Go to cave</button>
        <button id="button3">Fight dragon</button>
      </div>
      <div id="monsterStats">
        <span class="stat">Monster Name: <strong><span id="monsterName"></span></strong></span>
        <span class="stat">Health: <strong><span id="monsterHealth"></span></strong></span>
      </div>
      <div id="text">
        Welcome to Dragon Repeller. You must defeat the dragon that is preventing people from leaving the town. You are in the town square. Where do you want to go? Use the buttons above.
      </div>
    </div>
    <script src="./script.js"></script>
  </body>
</html>
```

## Hints

1. You should add a new `if` statement in your `else if` block.
2. Your new `if` statement should check if `fighting` is strictly equal to `2`.
3. You should call the `winGame` function in your `if` block.
4. You should add an `else` block.
5. Your `else` block should call the `defeatMonster` function.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62a8f256b813a476cae51f49*

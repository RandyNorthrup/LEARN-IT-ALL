---
id: lesson-015-065
title: Step 76
chapterId: chapter-15
order: 65
duration: 5
objectives:
  - Step 76
---

# Step 76

Now that you are updating the `gold` and `health` variables, you need to display those new values on the game screen. You have retrieved the `healthText` and `goldText` elements in a prior step.

After your assignment lines, assign the `innerText` property of `goldText` to be the variable `gold`. Use the same pattern to update `healthText` with the `health` variable.

You can test this by clicking your `"Go to store"` button, followed by your `"Buy Health"` button.

**Note:** Your answer should only be two lines of code.

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

1. Your `buyHealth` function should update the text of `healthText` to be the value of `health`.
2. Your `buyHealth` function should update the text of `goldText` to be the value of `gold`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62a8c465fa7b0c252f4a8f0c*

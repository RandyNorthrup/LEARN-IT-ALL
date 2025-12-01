---
id: lesson-015-145
title: Step 160
chapterId: chapter-15
order: 145
duration: 5
objectives:
  - Step 160
---

# Step 160

Create two new functions named `pickTwo` and `pickEight`.

Inside each of those, call the `pick()` function and pass either `2` or `8` as the argument depending on the function name.

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

1. You should use the `function` keyword to declare `pickTwo`.
2. You should use the `function` keyword to declare `pickEight`.
3. `pickTwo` should call the `pick` function.
4. `pickTwo` should call the `pick` function with `2` as the argument.
5. `pickEight` should call the `pick` function.
6. `pickEight` should call the `pick` function with `8` as the argument.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62aa258da314ef42ba0a1858*

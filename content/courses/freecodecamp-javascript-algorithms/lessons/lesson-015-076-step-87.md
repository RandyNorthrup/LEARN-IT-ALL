---
id: lesson-015-076
title: Step 87
chapterId: chapter-15
order: 76
duration: 5
objectives:
  - Step 87
---

# Step 87

You should tell the player what weapon they bought. In between the two lines you just wrote, use `let` to initialize a new variable called `newWeapon`. Set this to equal `weapons`.

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

1. Your `buyWeapon` function should have a variable named `newWeapon`.
2. You should use `let` to declare `newWeapon`.
3. `newWeapon` should be initialised to have the value of `weapons`. Don't forget your semicolon.
4. `newWeapon` should be declared before you modify `text`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62a8cbd1e3595431d5a2b3f1*

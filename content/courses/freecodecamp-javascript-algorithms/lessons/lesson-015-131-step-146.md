---
id: lesson-015-131
title: Step 146
chapterId: chapter-15
order: 131
duration: 5
objectives:
  - Step 146
---

# Step 146

The attack of the monster will be based on the monster's `level` and the player's `xp`. In the `getMonsterAttackValue` function, use `const` to create a variable called `hit`. Assign it the equation `(level * 5) - (Math.floor(Math.random() * xp));`.

This will set the monster's attack to five times their `level` minus a random number between `0` and the player's `xp`.

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

1. You should use `const` to declare the variable `hit`.
2. You should use the equation `(level * 5) - (Math.floor(Math.random() * xp))`.
3. You should set `hit` to the value of `(level * 5) - (Math.floor(Math.random() * xp))`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62aa1d9f535e102e4663e7a6*

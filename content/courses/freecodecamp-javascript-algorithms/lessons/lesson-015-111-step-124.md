---
id: lesson-015-111
title: Step 124
chapterId: chapter-15
order: 111
duration: 5
objectives:
  - Step 124
---

# Step 124

The `Math` object in JavaScript contains static properties and methods for mathematical constants and functions. One of those is `Math.random()`, which generates a random number from `0` (inclusive) to `1` (exclusive). Another is `Math.floor()`, which rounds a given number down to the nearest integer.

Using these, you can generate a random number within a range. For example, this generates a random number between `1` and `5`: `Math.floor(Math.random() * 5) + 1;`.

Following this pattern, use the addition operator (`+`) to add a random number between `1` and the value of `xp` to your `monsterHealth -= weapons[currentWeaponIndex].power`.

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

1. You should use the same `monsterHealth` line you already wrote.
2. You should add to the `weapons[currentWeaponIndex].power` value.
3. You should use `Math.floor()`.
4. You should use `Math.random()`.
5. You should multiply `Math.random()` by the value of `xp`.
6. You should use `Math.floor()` to round the result of `Math.random() * xp` down.
7. You should add `1` to the result of `Math.floor()`.
8. You should add the result of `Math.floor(Math.random() * xp) + 1` to the result of `weapons[currentWeaponIndex].power`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62a8e4dc6a60f85bf256a0cb*

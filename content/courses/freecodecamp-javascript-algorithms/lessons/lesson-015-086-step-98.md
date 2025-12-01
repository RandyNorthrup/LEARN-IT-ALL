---
id: lesson-015-086
title: Step 98
chapterId: chapter-15
order: 86
duration: 5
objectives:
  - Step 98
---

# Step 98

When you were testing your function, you should have seen an error message in the console. This error is due to the condition in the `buyWeapon` function.

The `currentWeaponIndex` variable is the index of the `weapons` array, but array indexing starts at zero. The index of the last element in an array is one less than the length of the array.

Change the `if` condition to check `weapons.length - 1`, instead of `weapons.length`.

Test out your `buyWeapon` function again to see the error message disappear.

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
        <span class="stat">Gold: <strong><span id="goldText">250</span></strong></span>
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

1. You should update the condition to subtract `1` from `weapons.length`.
2. Your condition should check if `currentWeaponIndex` is less than `weapons.length - 1`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62a8d1c72e8bb13c2074d93c*

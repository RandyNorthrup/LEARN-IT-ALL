---
id: lesson-015-073
title: Step 84
chapterId: chapter-15
order: 73
duration: 5
objectives:
  - Step 84
---

# Step 84

The value of the `currentWeaponIndex` variable corresponds to an index in the `weapons` array. The player starts with a `"stick"`, since `currentWeaponIndex` starts at `0` and `weapons[0]` is the `"stick"` weapon.

In the `buyWeapon` function, use compound assignment to add `1` to `currentWeaponIndex` - the user is buying the next weapon in the `weapons` array.

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

1. You should use compound assignment to add one to `currentWeaponIndex`.
2. Your `buyWeapon` function should increase `currentWeaponIndex` by `1`.
3. Your code should be in your `if` statement.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62a8c8cee8e5cf2e001789b4*

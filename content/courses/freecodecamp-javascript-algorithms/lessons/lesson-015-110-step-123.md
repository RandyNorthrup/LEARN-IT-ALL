---
id: lesson-015-110
title: Step 123
chapterId: chapter-15
order: 110
duration: 5
objectives:
  - Step 123
---

# Step 123

Set `monsterHealth` to `monsterHealth` minus the power of the player's current weapon. 

Remember that you can access the power of the player's current weapon using `weapons[currentWeaponIndex].power`.

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

1. You should use compound assignment to modify the `monsterHealth` variable.
2. You should use bracket notation with `currentWeaponIndex` to access `weapons`.
3. You should use dot notation to access the `power` property of `weapons[currentWeaponIndex]`.
4. You should subtract the `power` of the current weapon from `monsterHealth`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62a8e49f4df7af5ae2d7a616*

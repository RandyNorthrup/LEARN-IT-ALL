---
id: lesson-015-125
title: Step 138
chapterId: chapter-15
order: 125
duration: 5
objectives:
  - Step 138
---

# Step 138

At the end of your code, create a `restart` function. Inside this function, set `xp` to `0`, `health` to `100`, `gold` to `50`, `currentWeaponIndex` to `0`, and set `inventory` to an array with the string `stick`.

Also update the `innerText` properties of `goldText`, `healthText`, and `xpText` to their current values.

Finally, call the `goTown()` function.

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

1. You should use the `function` keyword to declare `restart`.
2. Your `restart` function should set `xp` to `0`.
3. Your `restart` function should set `health` to `100`.
4. Your `restart` function should set `gold` to `50`.
5. Your `restart` function should set `currentWeaponIndex` to `0`.
6. Your `restart` function should set `inventory` to an array with the string `"stick"`.
7. Your `restart` function should call the `goTown()` function.
8. You should set `goldText.innerText` to the value of `gold`.
9. You should set `healthText.innerText` to the value of `health`.
10. You should set `xpText.innerText` to the value of `xp`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62a8f20463b324759953edad*

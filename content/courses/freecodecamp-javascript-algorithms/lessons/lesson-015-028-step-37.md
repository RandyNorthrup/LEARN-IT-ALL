---
id: lesson-015-028
title: Step 37
chapterId: chapter-15
order: 28
duration: 5
objectives:
  - Step 37
---

# Step 37

Using the same syntax, set the `onclick` properties of `button2` and `button3` to `goCave` and `fightDragon` respectively.

Once you have done that, open your console and try clicking the buttons on your project.

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

1. You should assign the `goStore` function reference to `button1.onclick`. Make sure not to call the function.
2. You should use dot notation to access the `onclick` property of `button2`.
3. You should not use `let` or `const` to assign `button2.onclick`.
4. You should assign the `goCave` function reference to `button2.onclick`. Make sure not to call the function.
5. You should use dot notation to access the `onclick` property of `button3`.
6. You should not use `let` or `const` to assign `button3.onclick`.
7. You should assign the `fightDragon` function reference to `button3.onclick`. Make sure not to call the function.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62a3c4a0e52767482c5202d4*

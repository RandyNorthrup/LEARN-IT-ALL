---
id: lesson-015-035
title: Step 40
chapterId: chapter-15
order: 35
duration: 5
objectives:
  - Step 40
---

# Step 40

You will also need to update the functions that run when the buttons are clicked again.

In your `goStore()` function, update the `onclick` property for each button to run `buyHealth`, `buyWeapon`, and `goTown`, respectively.

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

1. You should use dot notation to access the `onclick` property of `button1`.
2. You should not use `let` or `const` to access the `onclick` property of `button1`.
3. You should set the `onclick` property of `button1` to be `buyHealth`.
4. You should set the `onclick` property of `button1` in your `goStore` function.
5. You should use dot notation to access the `onclick` property of `button2`.
6. You should not use `let` or `const` to access the `onclick` property of `button2`.
7. You should set the `onclick` property of `button2` to be `buyWeapon`.
8. You should set the `onclick` property of `button2` in your `goStore` function.
9. You should use dot notation to access the `onclick` property of `button3`.
10. You should not use `let` or `const` to access the `onclick` property of `button3`.
11. You should set the `onclick` property of `button3` to be `goTown`.
12. You should set the `onclick` property of `button3` in your `goStore` function.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62a7bf06d2ad9d1c5024e833*

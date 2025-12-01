---
id: lesson-015-087
title: Step 99
chapterId: chapter-15
order: 87
duration: 5
objectives:
  - Step 99
---

# Step 99

If the player has purchased all of the weapons in the `weapons` array, the player should not be able to purchase any more and a message should be displayed.

Add an `else` statement for your outer `if` statement. Inside this new `else` statement, set `text.innerText` to `"You already have the most powerful weapon!"`.

Test your `buyWeapon` function again to make sure the message is displayed when the player has the most powerful weapon.

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

1. You should have another `else` statement in your `buyWeapon` function.
2. You should set `text.innerText` to `"You already have the most powerful weapon!"`.
3. You should modify your `text.innerText` to `"You already have the most powerful weapon!"` within your outer `else` statement.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62a8d2146a3e853d0a6e28ca*

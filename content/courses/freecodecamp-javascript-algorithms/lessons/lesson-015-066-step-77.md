---
id: lesson-015-066
title: Step 77
chapterId: chapter-15
order: 66
duration: 5
objectives:
  - Step 77
---

# Step 77

What if the player doesn't have enough gold to buy health? You should use an `if` statement to check if the player has enough gold to buy health. 

In the previous project, you learned how to work with `if` statements like this:

```js
const num = 5;
if (num >= 3) {
  console.log("This code will run because num is greater than or equal to 3.");
}
```

Start by placing all of the code in your `buyHealth` function inside an `if` statement. For the `if` statement condition, check if `gold` is greater than or equal to `10`.

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

1. Your `buyHealth` function should have an `if` statement.
2. Your `if` statement should check if `gold` is greater than or equal to `10`.
3. All of your `buyHealth` code should be inside the `if` statement.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62a8c4db0710f3260f867a92*

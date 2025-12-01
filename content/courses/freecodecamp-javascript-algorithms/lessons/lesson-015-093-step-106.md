---
id: lesson-015-093
title: Step 106
chapterId: chapter-15
order: 93
duration: 5
objectives:
  - Step 106
---

# Step 106

In the previous project, you learned how to work with the `shift()` method to remove the first element from an array like this:

```js
const myArray = ["first", "second", "third"];
const firstElement = myArray.shift();
// myArray is now ["second", "third"]
```

Use the `shift()` method to take the first element from the `inventory` array and assign it to your `currentWeapon` variable.

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

1. Your `sellWeapon` function should use the `shift()` method.
2. You should use the `shift()` method on the `inventory` array.
3. You should assign the value of `inventory.shift()` to your `currentWeapon` variable.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62a8d539dc11cb42b5dd7ec8*

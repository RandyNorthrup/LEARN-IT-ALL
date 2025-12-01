---
id: lesson-015-080
title: Step 91
chapterId: chapter-15
order: 80
duration: 5
objectives:
  - Step 91
---

# Step 91

Back at the beginning of this project, you created the `inventory` array. Add the `newWeapon` to the end of the `inventory` array using the `push()` method.

In the previous project, you learned how to work with the `push` method like this:

```js
const myArray = [];
myArray.push("new item");
// myArray is now ["new item"]
```

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

1. You should use the `push` method on `inventory`.
2. You should `push` the value of `newWeapon` to the `inventory` array.
3. Your `buyWeapon` function should add the value of `newWeapon` to the `inventory` array.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62a8cf22272d6d35af80d4ac*

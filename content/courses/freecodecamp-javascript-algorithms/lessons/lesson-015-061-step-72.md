---
id: lesson-015-061
title: Step 72
chapterId: chapter-15
order: 61
duration: 5
objectives:
  - Step 72
---

# Step 72

Now that you have a `"cave"` location object, update your `goCave` function to call `update` and pass that new `"cave"` location. Remember that this is the third element in your `locations` array.

Don't forget to remove your `console.log` call!

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

1. You should use bracket notation to access the third element in your `locations` array.
2. You should pass the third element in your `locations` array to `update`.
3. You should call `update` with the third element in your `locations` array in your `goCave` function.
4. You should not have the `console.log` statement in your `goCave` function.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62a8c31ec0ec78216a1c36a0*

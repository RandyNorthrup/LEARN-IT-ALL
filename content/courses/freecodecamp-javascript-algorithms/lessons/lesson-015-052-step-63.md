---
id: lesson-015-052
title: Step 63
chapterId: chapter-15
order: 52
duration: 5
objectives:
  - Step 63
---

# Step 63

The `locations` array contains two locations: the `"town square"` and the `"store"`. Currently you are passing that entire array into the `update` function.

Pass in only the first element of the `locations` array by adding `[0]` at the end of the variable. For example: `myFunction(arg[0]);`.

This is called <dfn>bracket notation</dfn>. Values in an array are accessed by index. Indices are numerical values and start at `0` - this is called zero-based indexing. `arg[0]` would be the first element in the `arg` array.

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

1. You should use bracket notation with `locations`.
2. You should access the first object in the `locations` array. Remember that arrays are zero-based.
3. You should pass the first object in the `locations` array into the `update` function.
4. This call should still be in your `goTown()` function.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62a8b6536156c51500739b41*

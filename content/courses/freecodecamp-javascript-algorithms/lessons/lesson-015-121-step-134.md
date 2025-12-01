---
id: lesson-015-121
title: Step 134
chapterId: chapter-15
order: 121
duration: 5
objectives:
  - Step 134
---

# Step 134

Your `locations` array doesn't have a fifth element, so `locations[4]` doesn't work.

Add a new object at the end of the `locations` array, following the same structure as the other objects. Set `name` to `"kill monster"`, set `"button text"` to an array with three `"Go to town square"` strings, set `"button functions"` to an array with three `goTown` variables, and set `text` to `"The monster screams Arg! as it dies. You gain experience points and find gold."`.

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

1. Your `locations` array should have five values.
2. Your fifth `locations` value should be an object.
3. Your fifth `locations` value should have a `name` property with the value `"kill monster"`.
4. Your fifth `locations` value should have a `"button text"` array with three `"Go to town square"` strings.
5. Your fifth `locations` value should have a `"button functions"` array with three `goTown` variables.
6. Your fifth `locations` value should have a `text` property with the value `"The monster screams Arg! as it dies. You gain experience points and find gold."`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62a8eff21c0b0f6ebe5b8e38*

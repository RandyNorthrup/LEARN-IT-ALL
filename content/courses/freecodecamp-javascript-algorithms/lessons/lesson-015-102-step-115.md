---
id: lesson-015-102
title: Step 115
chapterId: chapter-15
order: 102
duration: 5
objectives:
  - Step 115
---

# Step 115

Add a new object to the end of the `locations` array, following the same properties as the rest of the objects. Set `name` to `"fight"`, `"button text"` to an array with `"Attack"`, `"Dodge"`, and `"Run"`, `"button functions"` to an array with `attack`, `dodge`, and `goTown`, and `text` to `"You are fighting a monster."`.

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

1. Your `locations` array should have 4 values in it.
2. Your new value should be an object.
3. Your new object should have a `name` property set to `"fight"`.
4. Your new object should have a `"button text"` property set to an array with the strings `"Attack"`, `"Dodge"`, and `"Run"`.
5. Your new object should have a `"button functions"` property set to an array with the variables `attack`, `dodge`, and `goTown`.
6. Your new object should have a `text` property set to `"You are fighting a monster."`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62a8e142f7f0bd4fed898de3*

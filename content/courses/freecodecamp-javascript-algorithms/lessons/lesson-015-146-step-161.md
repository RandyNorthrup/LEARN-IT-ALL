---
id: lesson-015-146
title: Step 161
chapterId: chapter-15
order: 146
duration: 5
objectives:
  - Step 161
---

# Step 161

Add another object to your `locations` array. Set `name` to `"easter egg"`, set `"button text"` to an array with the strings `"2"`, `"8"`, and `"Go to town square?"`, set `"button functions"` to an array with the variables `pickTwo`, `pickEight`, and `goTown`, and `text` to `"You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"`.

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

1. Your `locations` array should have 8 values.
2. Your eighth `locations` value should be an object.
3. Your eighth `locations` value should have a `name` property with the value `"easter egg"`.
4. Your eighth `locations` value should have a `"button text"` array with the strings `"2"`, `"8"`, and `"Go to town square?"`.
5. Your eighth `locations` value should have a `"button functions"` an array with the variables `pickTwo`, `pickEight`, and `goTown`.
6. Your eighth `locations` value should have a `text` property with the value `"You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62aa25fcb5837d43b4d9873d*

---
id: lesson-015-160
title: Step 139
chapterId: chapter-15
order: 160
duration: 5
objectives:
  - Step 139
---

# Step 139

In the `locations` array, add another object at the end. Set the `name` property to `"lose"`, set `"button text"` to an array with three `"REPLAY?"` strings, set `"button functions"` to an array with three `restart` variables, and set `text` to `"You die. &#x2620;"`. 

In a later step, you will update the code for the `&#x2620;` emoticon text to properly display on the page.

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

1. You should have six values in the `locations` array.
2. Your sixth `locations` value should be an object.
3. Your sixth `locations` value should have a `name` property with the value `"lose"`.
4. Your sixth `locations` value should have a `"button text"` array with three `"REPLAY?"` strings.
5. Your sixth `locations` value should have a `"button functions"` array with three `restart` variables.
6. Your sixth `locations` value should have a `text` property with the value `"You die. &#x2620;"`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62ba17beef16c563069a65d8*

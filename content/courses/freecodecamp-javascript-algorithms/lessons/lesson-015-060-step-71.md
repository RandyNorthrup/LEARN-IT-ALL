---
id: lesson-015-060
title: Step 71
chapterId: chapter-15
order: 60
duration: 5
objectives:
  - Step 71
---

# Step 71

Add a third object to the `locations` array. Give it the same properties as the other two objects.

Set `name` to `cave`. Set `button text` to an array with the strings `"Fight slime"`, `"Fight fanged beast"`, and `"Go to town square"`. Set the `"button functions"` to an array with the variables `fightSlime`, `fightBeast`, and `goTown`. Set the `text` property to `"You enter the cave. You see some monsters."`.

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

1. You should have three values in your `locations` array.
2. Your third `locations` value should be an object.
3. Your third `locations` object should have a `name` property with the value of `"cave"`.
4. Your third `locations` object should have a `"button text"` property which is an array.
5. Your `"button text"` property should have the string values `"Fight slime"`, `"Fight fanged beast"`, and `"Go to town square"`.
6. Your third `locations` object should have a `"button functions"` property which is an array.
7. Your `"button functions"` property should have the function values `fightSlime`, `fightBeast`, and `goTown`.
8. Your third `locations` object should have a `text` property which is a string.
9. Your third `locations` object should have a `text` property with the value of `"You enter the cave. You see some monsters."`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62a8c2bbbd8aa82052f47c53*

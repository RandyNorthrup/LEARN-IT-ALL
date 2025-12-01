---
id: lesson-015-043
title: Step 54
chapterId: chapter-15
order: 43
duration: 5
objectives:
  - Step 54
---

# Step 54

Your `locations` array will hold different locations like the **store**, the **cave**, and the **town square**. Each location will be represented as an object.

Inside your `locations` array, add an object. Inside that object add a key called `name` with a value of `"town square"`.

Remember to follow this syntax:

```js
{
  key: value
}
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

1. Your first value of `locations` should be an object.
2. Your first value of `locations` should have a `name` property.
3. Your first value of `locations` should have a `name` property with a value of `"town square"`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62a8a9d876b2580943ba9351*

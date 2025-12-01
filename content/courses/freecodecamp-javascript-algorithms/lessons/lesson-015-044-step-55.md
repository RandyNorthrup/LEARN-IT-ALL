---
id: lesson-015-044
title: Step 55
chapterId: chapter-15
order: 44
duration: 5
objectives:
  - Step 55
---

# Step 55

Just like array values, object properties are separated by a comma. Add a comma after your `name` property and add a `button text` property with the value of an empty array. 

Since the property name has a space in it, you will need to surround it with quotes.

```js
{
  name: "Naomi",
  "favorite color": "purple"
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

1. Your first `locations` value should be an object.
2. Your first `locations` value should have a `button text` property.
3. Your first `locations` value should have a `button text` property with a value that is an array.
4. Your first `locations` value should have a `button text` property with a value that is an empty array.
5. You should not remove or change the `name` property.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62a8ab0e27cbaf0b54ba8a42*

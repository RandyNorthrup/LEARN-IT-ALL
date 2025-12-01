---
id: lesson-015-170
title: Step 50
chapterId: chapter-15
order: 170
duration: 5
objectives:
  - Step 50
---

# Step 50

If the property name (key) of an object has a space in it, you will need to use single or double quotes around the name. 

Here is an example of an object with a property name that has a space:

```js
const spaceObj = {
  "Space Name": "Kirk",
};
```

If you tried to write a key without the quotes, it would throw an error:

```js
const spaceObj = {
  // Throws an error
  Space Name: "Kirk",
}; 

```

Add a new property with a key of `"Number of legs"` and value of `4` to the `cat` object.

Open up the console to see the output.

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

1. Your `cat` object should have a key called `"Number of legs"`.
2. Your `cat` object should have a `"Number of legs"` property with a value of `4`.
3. Your `cat` object should have two properties.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6608b8713915f21398ff32e1*

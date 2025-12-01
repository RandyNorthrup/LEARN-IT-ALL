---
id: lesson-015-105
title: Step 118
chapterId: chapter-15
order: 105
duration: 5
objectives:
  - Step 118
---

# Step 118

By default, the HTML element that shows the monster's stats has been hidden with CSS. When the player clicks the "Fight dragon" button, the monster's stats should be displayed. You can accomplish this by using the <dfn>style</dfn> and <dfn>display</dfn> properties on the `monsterStats` element.

The `style` property is used to access the inline style of an element and the `display` property is used to set the visibility of an element.

Here is an example of how to update the display for a paragraph element:

```js
const paragraph = document.querySelector('p');
paragraph.style.display = 'block';
```

Display the `monsterStats` element by updating the `display` property of the `style` property to `block`.

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

1. You should use dot notation to access the `style` property of `monsterStats`.
2. You should use dot notation to access the `display` property of the `style` property.
3. You should set the `display` property to `block`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62a8e24c673b075317cc0b09*

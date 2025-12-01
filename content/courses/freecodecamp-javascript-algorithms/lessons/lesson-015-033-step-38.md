---
id: lesson-015-033
title: Step 38
chapterId: chapter-15
order: 33
duration: 5
objectives:
  - Step 38
---

# Step 38

The `innerText` property controls the text that appears in an HTML element. For example:

```html
<p id="info">Demo content</p> 
```

```js
const info = document.querySelector("#info"); 
info.innerText = "Hello World"; 
```

The example above would change the text of the `p` element from `Demo content` to `Hello World`.

When a player clicks your `Go to store` button, you want to change the buttons and text. Remove the code inside the `goStore` function and add a line that updates the text of `button1` to say `"Buy 10 health (10 gold)"`.

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

1. You should not have a `console.log("Going to store.");` line in your code.
2. You should use dot notation to access the `innerText` property of `button1`.
3. You should not use `let` or `const` to access the `innerText` property of `button1`.
4. You should update the `innerText` property of `button1` to be `Buy 10 health (10 gold)`.
5. You should update the `innerText` property within your `goStore` function.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62a3cfc8328d3351b95d4f61*

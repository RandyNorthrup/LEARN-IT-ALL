---
id: lesson-015-027
title: Step 36
chapterId: chapter-15
order: 27
duration: 5
objectives:
  - Step 36
---

# Step 36

`button1` represents your first `button` element. These elements have a special property called `onclick`, which you can use to determine what happens when someone clicks that button.

You can access properties in JavaScript a couple of different ways. The first is with <dfn>dot notation</dfn>. Here is an example of using dot notation to set the `onclick` property of a button to a function reference.

```js
button.onclick = myFunction;
```

In this example, `button` is the button element, and `myFunction` is a reference to a function. When the button is clicked, `myFunction` will be called.

Use dot notation to set the `onclick` property of your `button1` to the function reference of `goStore`. Note that `button1` is already declared, so you don't need to use `let` or `const`.

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

1. You should use dot notation to access the `onclick` property of `button1`.
2. You should not use `let` or `const`.
3. You should assign the `goStore` function reference to `button1.onclick`. Make sure not to call the function.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62a3c2fccf186146b59c6e96*

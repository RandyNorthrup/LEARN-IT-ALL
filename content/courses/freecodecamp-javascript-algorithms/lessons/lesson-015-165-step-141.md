---
id: lesson-015-165
title: Step 141
chapterId: chapter-15
order: 165
duration: 5
objectives:
  - Step 141
---

# Step 141

In order for the `&#x2620;` emoticon text to properly display on the page, you will need to use the <dfn>innerHTML</dfn> property. 

The `innerHTML` property allows you to access or modify the content inside an HTML element using JavaScript. 
 
Here is an example of updating the content for this paragraph element using the `innerHTML`  property.

```html
<p id="demo">This is a paragraph.</p>
```

```js
document.querySelector("#demo").innerHTML = "Hello, innerHTML!";
```
 
In the `update` function, change `text.innerText` to `text.innerHTML`.

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

1. You should use dot notation to access the `innerHTML` property of `text`.
2. You should not use `let` or `const` to access the `innerHTML` property of `text`.
3. You should set `innerHTML` equal to the `text` property of `location`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 65b2f6acce65b7a69751a090*

---
id: lesson-015-166
title: Step 48
chapterId: chapter-15
order: 166
duration: 5
objectives:
  - Step 48
---

# Step 48

Before you can begin to build out your `locations` array, you will first need to learn about <dfn>objects</dfn>. Objects are an important data type in JavaScript. The next few steps will be dedicated to learning about them so you will better understand how to apply them in your project.

Objects are non primitive data types that store key-value pairs. Non primitive data types are mutable data types that are not `undefined`, `null`, `boolean`, `number`, `string`, or `symbol`. Mutable means that the data can be changed after it is created.

Here is the basic syntax for an object:

```js
{
  key: value
}
```

You will learn about keys and values in the next few steps. 

For now, create a `const` variable called `cat` and assign it an empty object `{}`.

Below that `cat` variable, add a `console.log(cat)` statement to see the object in the console.

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

1. You should have a `const` variable called `cat`.
2. You should assign an empty object to the `cat` variable.
3. You should have a `console.log` statement that logs the `cat` object.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660880e67dfed9eb6adb7178*

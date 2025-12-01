---
id: lesson-015-034
title: Step 39
chapterId: chapter-15
order: 34
duration: 5
objectives:
  - Step 39
---

# Step 39

Now, add a line that updates the text of `button2` to say `"Buy weapon (30 gold)"` and update the text of `button3` to say `"Go to town square"`.

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

1. You should use dot notation to access the `innerText` property of `button2`.
2. You should not use `let` or `const` to access the `innerText` property of `button2`.
3. You should update the `innerText` property of `button2` to be `"Buy weapon (30 gold)"`.
4. You should update the `innerText` property within your `goStore` function.
5. You should use dot notation to access the `innerText` property of `button3`.
6. You should not use `let` or `const` to access the `innerText` property of `button3`.
7. You should update the `innerText` property of `button3` to be `"Go to town square"`.
8. You should update the `innerText` property within your `goStore` function.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62a7beb1ad61211ac153707f*

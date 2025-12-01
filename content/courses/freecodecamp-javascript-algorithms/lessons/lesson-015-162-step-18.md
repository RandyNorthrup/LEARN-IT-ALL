---
id: lesson-015-162
title: Step 18
chapterId: chapter-15
order: 162
duration: 5
objectives:
  - Step 18
---

# Step 18

Use `querySelector()` to get the other two `button` elements using their `id`s: `button2` and `button3`. Store them in variables called `button2` and `button3`. Remember to use `const`.

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
      <div id="monsterStats"></div>
      <div id="text"></div>
    </div>
    <script src="./script.js"></script>
  </body>
</html>
```

## Hints

1. You should declare a `button2` variable with `const`.
2. Your `button2` variable should have the value of your `"#button2"` element.
3. You should declare a `button3` variable with `const`.
4. Your `button3` variable should have the value of your `"#button3"` element.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62fc20387ef88d1d1998aac5*

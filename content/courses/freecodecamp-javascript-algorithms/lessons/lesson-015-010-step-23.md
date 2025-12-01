---
id: lesson-015-010
title: Step 23
chapterId: chapter-15
order: 10
duration: 5
objectives:
  - Step 23
---

# Step 23

Give your `#game` a maximum width of `500px` and a maximum height of `400px`. Set the `background-color` to `#ffffff` and the `color` to `#ffffff`. 

Use margins to center it by setting the top margin to `30px`, bottom margin to `0px`, and the left and right margin to `auto`. 

Finally, give it `10px` of padding on all four sides.

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

1. You should have a `#game` selector.
2. Your `#game` selector should have a `max-width` of `500px`.
3. Your `#game` selector should have a `max-height` of `400px`.
4. Your `#game` selector should have a `background-color` of `#ffffff`.
5. Your `#game` selector should have a `color` of `#ffffff`.
6. Your `#game` selector should have a `margin-top` set to `30px`.
7. Your `#game` selector should have a `margin-left` set to `auto`.
8. Your `#game` selector should have a `margin-right` set to `auto`.
9. Your `#game` selector should have a `margin-bottom` set to `0px`.
10. Your `#game` selector should have `10px` of padding on all sides.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62a240c67f3dbb1a1e6d95ee*

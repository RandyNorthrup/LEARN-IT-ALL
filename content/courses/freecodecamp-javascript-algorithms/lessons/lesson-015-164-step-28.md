---
id: lesson-015-164
title: Step 28
chapterId: chapter-15
order: 164
duration: 5
objectives:
  - Step 28
---

# Step 28

Finally, you will need to add some styles for your buttons. Start by setting the `cursor` property to `pointer`. Then set the text `color` to `#0a0a23` and the `background-color` to `#feac32`.

Then set the `background-image` property to `linear-gradient(#fecc4c, #ffac33)`. Lastly, set the `border` to `3px solid #feac32`.

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

1. You should have a `button` selector.
2. Your `button` selector should have a `cursor` property set to `pointer`.
3. Your `button` selector should have a `color` property set to `#0a0a23`.
4. Your `button` selector should have a `background-color` property set to `#feac32`.
5. Your `button` selector should have a `background-image` property set to `linear-gradient(#fecc4c, #ffac33)`.
6. Your `button` selector should have a `border` property set to `3px solid #feac32`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6577ea4f23e3ba1217007bc7*

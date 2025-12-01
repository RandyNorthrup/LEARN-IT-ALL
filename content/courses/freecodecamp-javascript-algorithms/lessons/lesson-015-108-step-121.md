---
id: lesson-015-108
title: Step 121
chapterId: chapter-15
order: 108
duration: 5
objectives:
  - Step 121
---

# Step 121

On a new line, use the addition assignment operator(`+=`), to add the string `" You attack it with your <weapon>."` to the `text` value, replacing `<weapon>` with the player's current weapon. Additionally, remember that this line of text starts with a space so it will properly display.

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

1. You should use dot notation to access the `innerText` property of `text` on a new line.
2. You should use compound assignment with `text.innerText`.
3. You should add the string `" You attack it with your "` to the `text.innerText` value. Remember that spacing matters.
4. You should use the concatenation operator to add the current weapon to the string. You can get the current weapon with `weapons[currentWeaponIndex].name`.
5. You should use the concatenation operator to end your string with `"."`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62a8e41e2f190c58404dd46e*

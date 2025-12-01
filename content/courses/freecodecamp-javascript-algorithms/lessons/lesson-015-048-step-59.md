---
id: lesson-015-048
title: Step 59
chapterId: chapter-15
order: 48
duration: 5
objectives:
  - Step 59
---

# Step 59

Add a second object to your `locations` array (remember to separate them with a comma). Following the pattern you used in the first object, create the same properties but use the values from the `goStore` function. Set the `name` property to `store`.

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

1. Your `locations` array should have two values.
2. Both `locations` values should be objects.
3. Your second `locations` object should have a `name` property with the value of `store`.
4. Your second `locations` object should have a `button text` property which is an array.
5. Your `button text` property should have the string values `"Buy 10 health (10 gold)"`, `"Buy weapon (30 gold)"`, and `"Go to town square"`.
6. Your second `locations` object should have a `button functions` property which is an array.
7. Your `button functions` property should have the function values `buyHealth`, `buyWeapon`, and `goTown`.
8. Your second `locations` object should have a `text` property which is a string.
9. Your second `locations` object should have a `text` property with the value of `"You enter the store."`.
10. You should not modify the first `locations` object.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62a8ae85fcaedc0fddc7ca4f*

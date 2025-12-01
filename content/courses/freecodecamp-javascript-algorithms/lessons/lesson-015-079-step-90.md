---
id: lesson-015-079
title: Step 90
chapterId: chapter-15
order: 79
duration: 5
objectives:
  - Step 90
---

# Step 90

In the previous project, you learned how to work with the concatenation operator to insert variables into a string like this:

```js
const organization = "freeCodeCamp";

// "Hello, our name is freeCodeCamp."
"Hello, our name is " + organization + ".";
```

Update the string `"You now have a new weapon."` to `"You now have a "` followed by the name of the new weapon, and remember to end the sentence with a period.

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

1. You should update the `text.innerText` assignment to start with the string `"You now have a "`.
2. You should use the concatenation operator to add `newWeapon` to the end of the `text.innerText` string.
3. You should use the concatenation operator to end your `text.innerText` string with a `.`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62a8ce73d0dce43468f6689c*

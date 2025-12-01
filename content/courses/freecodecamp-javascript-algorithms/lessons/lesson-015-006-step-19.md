---
id: lesson-015-006
title: Step 19
chapterId: chapter-15
order: 6
duration: 5
objectives:
  - Step 19
---

# Step 19

Similar to your `#stats` element, your `#monsterStats` element needs two `span` elements. Give them the class `stat` and give the first element the text `Monster Name: ` and the second the text `Health: `. After the text in each, add a `strong` element with an empty nested `span` element. Give the first inner `span` element an `id` of `monsterName` and the second inner `span` element an `id` of `monsterHealth`.

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
--fcc-editable-region--
      <div id="monsterStats">

      </div>
--fcc-editable-region--
      <div id="text"></div>
    </div>
    <script src="./script.js"></script>
  </body>
</html>
```

## Hints

1. Your `#monsterStats` element should have two `span` elements.
2. Your new `span` elements should both have a `class` value of `stat`.
3. Your first `span` element should have a `strong` element with an empty nested `span` element.
4. Your second `span` element should have a `strong` element with an empty nested `span` element.
5. Your first `span` element should have the text `Monster Name: `. Make sure the spacing is correct.
6. Your second `span` element should have the text `Health: `. Make sure the spacing is correct.
7. Your `strong` and `span` elements should come after the text.
8. Your first inner `span` element should have an `id` of `monsterName`.
9. Your second inner `span` element should have an `id` of `monsterHealth`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62a23d1c5f1c93161f3582ae*

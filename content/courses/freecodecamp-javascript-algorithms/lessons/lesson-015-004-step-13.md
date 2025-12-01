---
id: lesson-015-004
title: Step 13
chapterId: chapter-15
order: 4
duration: 5
objectives:
  - Step 13
---

# Step 13

Wrap the numbers `0`, `100`, and `50` in `span` elements, and wrap those new `span` elements in `strong` elements. Then give your new `span` elements `id` values of `xpText`, `healthText`, and `goldText`, respectively.

Your answer should follow this basic structure:

```html
<span class="stat">TEXT <strong><span id="VALUE">TEXT</span></strong></span>
```

## Starter Code

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="./styles.css">
    <title>RPG - Dragon Repeller</title>
    <script src="./script.js"></script>
  </head>
  <body>
    <div id="game">
      <div id="stats">
--fcc-editable-region--
        <span class="stat">XP: 0</span>
        <span class="stat">Health: 100</span>
        <span class="stat">Gold: 50</span>
--fcc-editable-region--
      </div>
      <div id="controls"></div>
      <div id="monsterStats"></div>
      <div id="text"></div>
    </div>
  </body>
</html>
```

## Hints

1. You should add a `strong` element in your first `.stat` element.
2. Your first new `strong` element should have a `span` element.
3. Your first nested `span` element should have the `id` of `xpText`.
4. Your first `span` element should be wrapped around the text `0`.
5. The text of your first `.stat` element should still be `XP: 0`.
6. You should add a `strong` element in your second `.stat` element.
7. Your second new `strong` element should have a `span` element.
8. Your second nested `span` element should have the `id` of `healthText`.
9. Your second `span` element should be wrapped around the text `100`.
10. The text of your second `.stat` element should still be `Health: 100`.
11. You should add a `strong` element in your third `.stat` element.
12. Your third new `strong` element should have a `span` element.
13. Your third nested `span` element should have the `id` of `goldText`.
14. Your third `span` element should be wrapped around the text `50`.
15. The text of your third `.stat` element should still be `Gold: 50`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 62a23c1d505bfa13747c8a9b*

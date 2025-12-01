---
id: lesson-011-055
title: Step 56
chapterId: chapter-11
order: 55
duration: 5
objectives:
  - Step 56
---

# Step 56

Below the `.chin` element, add two `div` elements each with a `class` of `eye`. Also, give the first `.eye` element a `class` of `left`, and the second `.eye` element a `class` of `right`.

## Starter Code

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="./styles.css" />
    <title>Penguin</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>

  <body>
    <div class="left-mountain"></div>
    <div class="back-mountain"></div>
    <div class="sun"></div>
    <div class="penguin">
--fcc-editable-region--
      <div class="penguin-head">
        <div class="face left"></div>
        <div class="face right"></div>
        <div class="chin"></div>

      </div>
--fcc-editable-region--
      <div class="penguin-body"></div>
    </div>

    <div class="ground"></div>
  </body>
</html>
```

## Hints

1. You should add two `div` elements within `.penguin-head`. Expected `--fcc-expected--` `div` elements, found `--fcc-actual--`.
2. You should give the first new `div` a `class` of `eye`.
3. You should give the second new `div` a `class` of `eye`.
4. You should give the first new `div` a `class` of `left`.
5. You should give the second new `div` a `class` of `right`.
6. You should place `div.eye.left` after `div.chin`.
7. You should place `div.eye.right` after `div.eye.left`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 619d090cd8d6db0c93dc5087*

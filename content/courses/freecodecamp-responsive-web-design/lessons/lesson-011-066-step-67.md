---
id: lesson-011-066
title: Step 67
chapterId: chapter-11
order: 66
duration: 5
objectives:
  - Step 67
---

# Step 67

Below the `.blush.right` element, add two `div` elements each with a `class` of `beak`. Also, give the first `.beak` element a `class` of `top`, and the second `.beak` element a `class` of `bottom`.

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
      <div class="penguin-head">
        <div class="face left"></div>
        <div class="face right"></div>
        <div class="chin"></div>
        <div class="eye left">
          <div class="eye-lid"></div>
        </div>
        <div class="eye right">
          <div class="eye-lid"></div>
        </div>
        <div class="blush left"></div>
        <div class="blush right"></div>
--fcc-editable-region--

--fcc-editable-region--
      </div>
      <div class="penguin-body"></div>
    </div>

    <div class="ground"></div>
  </body>
</html>
```

## Hints

1. You should add two `div` elements within `.penguin-head`. Expected `--fcc-expected--` `div` elements, found `--fcc-actual--`.
2. You should give the first new `div` a `class` of `beak`.
3. You should give the second new `div` a `class` of `beak`.
4. You should give the first new `div` a `class` of `top`.
5. You should give the second new `div` a `class` of `bottom`.
6. You should place `div.beak.top` after `div.blush.right`.
7. You should place `div.beak.bottom` after `div.beak.top`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 619d10cc98145f14820399c5*

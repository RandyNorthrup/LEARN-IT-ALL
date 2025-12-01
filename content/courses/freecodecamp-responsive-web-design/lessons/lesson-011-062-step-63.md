---
id: lesson-011-062
title: Step 63
chapterId: chapter-11
order: 62
duration: 5
objectives:
  - Step 63
---

# Step 63

Below the `.eye.right` element, add two `div` elements each with a `class` of `blush`. Also, give the first `.blush` element a `class` of `left`, and the second `.blush` element a `class` of `right`.

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
2. You should give the first new `div` a `class` of `blush`.
3. You should give the second new `div` a `class` of `blush`.
4. You should give the first new `div` a `class` of `left`.
5. You should give the second new `div` a `class` of `right`.
6. You should place `.blush.right` after `.blush.left`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 619d0eec0ac40611b41e2ccc*

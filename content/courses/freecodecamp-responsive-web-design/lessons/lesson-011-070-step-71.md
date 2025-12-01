---
id: lesson-011-070
title: Step 71
chapterId: chapter-11
order: 70
duration: 5
objectives:
  - Step 71
---

# Step 71

The penguin's body looks a bit plain. Spruce him up by adding a `div` element with a `class` of `shirt`, immediately before the `.penguin-body` element.

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
        <div class="beak top"></div>
        <div class="beak bottom"></div>
      </div>
--fcc-editable-region--

--fcc-editable-region--
      <div class="penguin-body"></div>
    </div>

    <div class="ground"></div>
  </body>
</html>
```

## Hints

1. You should add a `div` element within `.penguin`. Expected `--fcc-expected--` `div` elements, found `--fcc-actual--`.
2. You should give the new `div` a `class` of `shirt`.
3. You should place the new `div` before `.penguin-body`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 619d1340361095175f4b5115*

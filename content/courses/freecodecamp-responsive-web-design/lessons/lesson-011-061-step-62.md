---
id: lesson-011-061
title: Step 62
chapterId: chapter-11
order: 61
duration: 5
objectives:
  - Step 62
---

# Step 62

Position the `.eye-lid` elements `25%` from the top, and `-23%` from the left of their parents. Then, give all corners a radius of `50%`.

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
      </div>
      <div class="penguin-body"></div>
    </div>

    <div class="ground"></div>
  </body>
</html>
```

## Hints

1. You should give `.eye-lid` a `top` of `--fcc-expected--`, but found `--fcc-actual--`.
2. You should give `.eye-lid` a `left` of `--fcc-expected--`, but found `--fcc-actual--`.
3. You should give `.eye-lid` a `border-radius` of `--fcc-expected--`, but found `--fcc-actual--`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 619d0e56f9ca9710fcb974e3*

---
id: lesson-011-068
title: Step 69
chapterId: chapter-11
order: 68
duration: 5
objectives:
  - Step 69
---

# Step 69

Target the `.beak` element with a `class` of `top`, give it a `width` of `20%`, and position it `60%` from the top, and `40%` from the left of its parent.

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
      <div class="penguin-body"></div>
    </div>

    <div class="ground"></div>
  </body>
</html>
```

## Hints

1. You should use the `.beak.top` selector.
2. You should give `.beak.top` a `width` of `--fcc-expected--`, but found `--fcc-actual--`.
3. You should give `.beak.top` a `top` of `--fcc-expected--`, but found `--fcc-actual--`.
4. You should give `.beak.top` a `left` of `--fcc-expected--`, but found `--fcc-actual--`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 619d11e6d5ef9515d2a16033*

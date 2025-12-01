---
id: lesson-011-076
title: Step 77
chapterId: chapter-11
order: 76
duration: 5
objectives:
  - Step 77
---

# Step 77

Position the `.shirt` element `165px` from the top, and `127.5px` from the left of its parent. Then, increase its stacking order such that it appears above the `.penguin-body` element.

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
      <div class="shirt">
        <div>💜</div>
        <p>I CSS</p>
      </div> 
      <div class="penguin-body"></div>
    </div>

    <div class="ground"></div>
  </body>
</html>
```

## Hints

1. You should give `.shirt` a `top` of `--fcc-expected--`, but found `--fcc-actual--`.
2. You should give `.shirt` a `left` of `--fcc-expected--`, but found `--fcc-actual--`.
3. You should give the `.shirt` element a `z-index` of `1`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 619d1deb8b04811b8839ffe4*

---
id: lesson-011-088
title: Step 89
chapterId: chapter-11
order: 88
duration: 5
objectives:
  - Step 89
---

# Step 89

Target the `.arm` element with a `class` of `left`, and position it `35%` from the top, and `5%` from the left of its parent. Then, target the `.arm` element with a `class` of `right`, and position it `0%` from the top, and `-5%` from the right of its parent.

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
      <div class="penguin-body">
        <div class="arm left"></div>
        <div class="arm right"></div>
        <div class="foot left"></div>
        <div class="foot right"></div>
      </div>
    </div>

    <div class="ground"></div>
  </body>
</html>
```

## Hints

1. You should use the `.arm.left` selector.
2. You should give `.arm.left` a `top` of `--fcc-expected--`, but found `--fcc-actual--`.
3. You should give `.arm.left` a `left` of `--fcc-expected--`, but found `--fcc-actual--`.
4. You should use the `.arm.right` selector.
5. You should give `.arm.right` a `top` of `0%`.
6. You should give `.arm.right` a `right` of `--fcc-expected--`, but found `--fcc-actual--`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 619d2b7a84e78b246f2d17a2*

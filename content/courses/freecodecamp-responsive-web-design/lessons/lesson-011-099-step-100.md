---
id: lesson-011-099
title: Step 100
chapterId: chapter-11
order: 99
duration: 5
objectives:
  - Step 100
---

# Step 100

Use the `wave` animation on the left arm. Have the animation last `3s`, infinitely iterate, and have a linear timing function.

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

1. You should give `.arm.left` an `animation-name` of `--fcc-expected--`, but found `--fcc-actual--`.
2. You should give `.arm.left` an `animation-duration` of `--fcc-expected--`, but found `--fcc-actual--`.
3. You should give `.arm.left` an `animation-iteration-count` of `--fcc-expected--`, but found `--fcc-actual--`.
4. You should give `.arm.left` an `animation-timing-function` of `--fcc-expected--`, but found `--fcc-actual--`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 619d33c51140292cc5a21742*

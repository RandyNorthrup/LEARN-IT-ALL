---
id: lesson-011-073
title: Step 74
chapterId: chapter-11
order: 73
duration: 5
objectives:
  - Step 74
---

# Step 74

Target the `.shirt` element, and set its `font-size` to `25px`, `font-family` to `Helvetica` with a fallback of `sans-serif`, and `font-weight` to `bold`.

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

1. You should use the `.shirt` selector.
2. You should give `.shirt` a `font-size` of `--fcc-expected--`, but found `--fcc-actual--`.
3. You should give `.shirt` a `font-family` of `--fcc-expected--`, but found `--fcc-actual--`.
4. You should give `.shirt` a `font-weight` of `--fcc-expected--`, but found `--fcc-actual--`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 619d1629a8adc61960ca8b40*

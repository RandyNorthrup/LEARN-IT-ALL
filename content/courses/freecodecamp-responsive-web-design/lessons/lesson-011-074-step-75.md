---
id: lesson-011-074
title: Step 75
chapterId: chapter-11
order: 74
duration: 5
objectives:
  - Step 75
---

# Step 75

In some browsers, the _heart_ emoji may look slightly different from the previous step. This is because some of the character's properties were overridden by the `font-weight` style of `bold`.

Fix this, by targeting the `div` with the heart emoji, and setting its `font-weight` to its original value.

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

1. You should use the `.shirt div` selector to target the `div` with the heart emoji.
2. You should give the `.shirt div` a `font-weight` of `initial` or `normal`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 619d1c5fc9f8941a400955da*

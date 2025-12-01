---
id: lesson-011-065
title: Step 66
chapterId: chapter-11
order: 65
duration: 5
objectives:
  - Step 66
---

# Step 66

Target the `.blush` element with a `class` of `left`, and position it `15%` left of its parent. Then, target the `.blush` element with a `class` of `right`, and position it `15%` right of its parent.

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
      </div>
      <div class="penguin-body"></div>
    </div>

    <div class="ground"></div>
  </body>
</html>
```

## Hints

1. You should use the `.blush.left` selector.
2. You should give `.blush.left` a `left` of `--fcc-expected--`, but found `--fcc-actual--`.
3. You should use the `.blush.right` selector.
4. You should give `.blush.right` a `right` of `--fcc-expected--`, but found `--fcc-actual--`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 619d107edf7ddf13cc77106a*

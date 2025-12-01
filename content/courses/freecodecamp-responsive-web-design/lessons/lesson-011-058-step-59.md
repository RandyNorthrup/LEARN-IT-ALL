---
id: lesson-011-058
title: Step 59
chapterId: chapter-11
order: 58
duration: 5
objectives:
  - Step 59
---

# Step 59

Target the `.eye` element with the `left` class, and position it `25%` from the left of its parent. Then, target the `.eye` element with the `right` class, and position it `25%` from the right of its parent.

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
        <div class="eye left"></div>
        <div class="eye right"></div>
      </div>
      <div class="penguin-body"></div>
    </div>

    <div class="ground"></div>
  </body>
</html>
```

## Hints

1. You should use the `.eye.left` selector.
2. You should give `.eye.left` a `left` of `--fcc-expected--`, but found `--fcc-actual--`.
3. You should use the `.eye.right` selector.
4. You should give `.eye.right` a `right` of `--fcc-expected--`, but found `--fcc-actual--`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 619d0c1594c38c0ebae75878*

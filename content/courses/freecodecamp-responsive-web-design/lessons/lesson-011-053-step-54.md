---
id: lesson-011-053
title: Step 54
chapterId: chapter-11
order: 53
duration: 5
objectives:
  - Step 54
---

# Step 54

So far, the `.face` and `.chin` elements have the same `background-color`.

Create a custom CSS property called `--penguin-face`, and set it to `white`.

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
      </div>
      <div class="penguin-body"></div>
    </div>

    <div class="ground"></div>
  </body>
</html>
```

## Hints

1. You should use the `:root` selector.
2. You should give `:root` a `--penguin-face` property.
3. You should give `:root` a `--penguin-face` of `--fcc-expected--`, but found `--fcc-actual--`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 619d05c54dabca0b10058235*

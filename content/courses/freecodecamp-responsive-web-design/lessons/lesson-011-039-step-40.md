---
id: lesson-011-039
title: Step 40
chapterId: chapter-11
order: 39
duration: 5
objectives:
  - Step 40
---

# Step 40

Give the pseudo-element a `width` half that of its parent, a `height` of `45%`, and a `background-color` of `gray`.

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
      <div class="penguin-head"></div>
      <div class="penguin-body"></div>
    </div>

    <div class="ground"></div>
  </body>
</html>
```

## Hints

1. You should give `.penguin-body::before` a `width` of `50%`.
2. You should give `.penguin-body::before` a `height` of `45%`.
3. You should give `.penguin-body::before` a `background-color` of `--fcc-expected--`, but found `--fcc-actual--`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 619be73b3c806006ccc00bb0*

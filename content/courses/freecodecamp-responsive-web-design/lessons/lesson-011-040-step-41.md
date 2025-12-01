---
id: lesson-011-040
title: Step 41
chapterId: chapter-11
order: 40
duration: 5
objectives:
  - Step 41
---

# Step 41

Position the pseudo-element `10%` from the top and `25%` from the left of its parent.

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

1. You should give `.penguin-body::before` a `top` of `--fcc-expected--`, but found `--fcc-actual--`.
2. You should give `.penguin-body::before` a `left` of `--fcc-expected--`, but found `--fcc-actual--`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 619be7af7b0bf60770f5d2a4*

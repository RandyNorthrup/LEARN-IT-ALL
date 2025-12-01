---
id: lesson-011-054
title: Step 55
chapterId: chapter-11
order: 54
duration: 5
objectives:
  - Step 55
---

# Step 55

Where relevant, replace property values with your `--penguin-face` variable.

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

1. You should give `.face` a `background-color` of `var(--penguin-face)`.
2. You should give `.chin` a `background-color` of `var(--penguin-face)`.
3. You should not use `var(--penguin-face)` in the `.penguin-body` selector.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 619d0882f54bf40bdc4671ed*

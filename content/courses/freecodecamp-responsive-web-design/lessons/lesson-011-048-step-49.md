---
id: lesson-011-048
title: Step 49
chapterId: chapter-11
order: 48
duration: 5
objectives:
  - Step 49
---

# Step 49

Target the `.face` element with the `left` class, and position it `5%` left of its parent.

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
      </div>
      <div class="penguin-body"></div>
    </div>

    <div class="ground"></div>
  </body>
</html>
```

## Hints

1. You should use the `.face.left` selector.
2. You should give `.face.left` a `left` property.
3. You should give `.face.left` a `left` of `--fcc-expected--`, but found `--fcc-actual--`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 619d022dc8400c0763829a17*

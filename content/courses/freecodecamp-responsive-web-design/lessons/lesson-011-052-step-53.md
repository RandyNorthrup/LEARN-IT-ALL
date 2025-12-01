---
id: lesson-011-052
title: Step 53
chapterId: chapter-11
order: 52
duration: 5
objectives:
  - Step 53
---

# Step 53

Position the `.chin` element such that it is `25%` from the top, and `5%` from the left of its parent. Then, give the top corners a radius of `70%`, and the bottom corners a radius of `100%`.

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

1. You should give `.chin` a `top` property.
2. You should give `.chin` a `top` of `--fcc-expected--`, but found `--fcc-actual--`.
3. You should give `.chin` a `left` property.
4. You should give `.chin` a `left` of `--fcc-expected--`, but found `--fcc-actual--`.
5. You should give `.chin` a `border-radius` of `70% 70% 100% 100%`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 619d0503e03a790a4179d463*

---
id: lesson-011-030
title: Step 31
chapterId: chapter-11
order: 30
duration: 5
objectives:
  - Step 31
---

# Step 31

_Most_ penguins do not have a square head.

Give the penguin a slightly oval head by setting the radius of the top corners to `70%` and the radius of the bottom corners to `65%`.

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

1. You should give `.penguin-head` a `border-radius` of `70% 70% 65% 65%`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 61993cf26a8e0f0a553db223*

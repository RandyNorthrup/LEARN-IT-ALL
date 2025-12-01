---
id: lesson-011-036
title: Step 37
chapterId: chapter-11
order: 36
duration: 5
objectives:
  - Step 37
---

# Step 37

Change the stack level of the `.penguin-head` element such that it appears in front of the `.penguin-body` element.

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

1. You should use the `z-index` property to change the stack level.
2. You should give the `.penguin-head` element a `z-index` of `1`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 619943876b706d0f35c01dbc*

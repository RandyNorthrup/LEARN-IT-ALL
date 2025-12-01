---
id: lesson-011-037
title: Step 38
chapterId: chapter-11
order: 37
duration: 5
objectives:
  - Step 38
---

# Step 38

To give the penguin body a crest, create a pseudo-element that is the first child of the `.penguin-body` element. Set the `content` property of the pseudo-element to an empty string.

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

1. You should use the `.penguin-body::before` selector.
2. You should give `.penguin-body::before` a `content` of `""`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 6199442866286d0ff421a4fc*

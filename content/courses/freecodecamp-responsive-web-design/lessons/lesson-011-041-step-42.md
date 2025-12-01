---
id: lesson-011-041
title: Step 42
chapterId: chapter-11
order: 41
duration: 5
objectives:
  - Step 42
---

# Step 42

Round off the crest, by giving the pseudo-element bottom corners a radius of `100%`, leaving the top corners at `0%`.

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

1. You should use the `border-radius` property to round off the crest.
2. You should give `.penguin-body::before` a `border-radius` of `0% 0% 100% 100%`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 619be80062551a080e32c821*

---
id: lesson-011-027
title: Step 29
chapterId: chapter-11
order: 27
duration: 5
objectives:
  - Step 29
---

# Step 29

Change the stack level of the `.penguin` element such that it appears in front of the `.ground` element, and give it a `position` of `relative`.

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
2. You should give the `.penguin` element a `z-index` of `4`.
3. You should give `.penguin` a `position` property.
4. You should give `.penguin` a `position` of `relative`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 6197f40a16afea068c7e60c8*

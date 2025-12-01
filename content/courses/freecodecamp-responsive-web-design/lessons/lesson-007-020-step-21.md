---
id: lesson-007-020
title: Step 21
chapterId: chapter-07
order: 20
duration: 5
objectives:
  - Step 21
---

# Step 21

The `animation-iteration-count` property sets how many times your animation should repeat. This can be set to a number, or to `infinite` to indefinitely repeat the animation. Your Ferris wheel should never stop, so set the `.wheel` selector to have an `animation-iteration-count` of `infinite`.

The `animation-timing-function` property sets how the animation should progress over time. There are a few different values for this property, but you want the Ferris wheel animation to run at the same rate from start to finish. Set the `animation-timing-function` to `linear` in your `.wheel` selector.

## Starter Code

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Ferris Wheel</title>
    <link rel="stylesheet" href="./styles.css">
  </head>
  <body>
    <div class="wheel">
      <span class="line"></span>
      <span class="line"></span>
      <span class="line"></span>
      <span class="line"></span>
      <span class="line"></span>
      <span class="line"></span>

      <div class="cabin"></div>
      <div class="cabin"></div>
      <div class="cabin"></div>
      <div class="cabin"></div>
      <div class="cabin"></div>
      <div class="cabin"></div>
    </div>
  </body>
</html>
```

## Hints

1. Your `.wheel` selector should have an `animation-iteration-count` property set to `infinite`.
2. Your `.wheel` selector should have an `animation-timing-function` property set to `linear`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 6140e0d875ec16262f26432b*

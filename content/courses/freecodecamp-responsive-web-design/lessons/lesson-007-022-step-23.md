---
id: lesson-007-022
title: Step 23
chapterId: chapter-07
order: 22
duration: 5
objectives:
  - Step 23
---

# Step 23

With your `.wheel` selector, you created four different properties to control the animation. For your `.cabin` selector, you can use the `animation` property to set these all at once.

Set the `animation` property of the `.cabin` rule to `cabins 10s linear infinite`. This will set the `animation-name`, `animation-duration`, `animation-timing-function`, and `animation-iteration-count` properties in that order.

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

1. Your `.cabin` selector should have an `animation` property set to `cabins 10s linear infinite`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 614100d7d335bb2a5ff74f1f*

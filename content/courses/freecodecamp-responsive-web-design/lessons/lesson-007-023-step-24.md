---
id: lesson-007-023
title: Step 24
chapterId: chapter-07
order: 23
duration: 5
objectives:
  - Step 24
---

# Step 24

To make your cabin animation seem more like a natural swinging motion, you can use the `ease-in-out` timing function. This setting will tell the animation to start and end at a slower pace, but move more quickly in the middle of the cycle.

Replace `linear` to `ease-in-out` in the `.cabin` selector.

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

1. Your `.cabin` selector should have an `animation` property set to `cabins 10s ease-in-out infinite`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 61410126fa3a6d2b3cda502e*

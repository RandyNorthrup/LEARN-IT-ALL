---
id: lesson-007-026
title: Step 27
chapterId: chapter-07
order: 26
duration: 5
objectives:
  - Step 27
---

# Step 27

Because the animation is on an infinite loop and the start and end colors are not the same, the transition appears jerky when it switches back to yellow from red. 

To start fixing this, remove the `background-color` from your `0%` selector.

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

1. Your `0%` selector should not have a `background-color` property.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 6169ab1aaeb4cd1174def700*

---
id: lesson-007-025
title: Step 26
chapterId: chapter-07
order: 25
duration: 5
objectives:
  - Step 26
---

# Step 26

Between the `0%` and `100%` selectors, add a `50%` selector. This will apply in the middle of the animation cycle. Set the `background-color` to `purple`.

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

1. You should create a new `50%` selector in your `@keyframes cabins` rule.
2. Your `50%` selector should be between your `0%` and `100%` selectors.
3. Your `50%` selector should have a `background-color` property set to `purple`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 6141026ec9882f2d39dcf2b8*

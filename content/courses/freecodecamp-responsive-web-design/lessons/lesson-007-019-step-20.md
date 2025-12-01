---
id: lesson-007-019
title: Step 20
chapterId: chapter-07
order: 19
duration: 5
objectives:
  - Step 20
---

# Step 20

The `animation-name` property is used to link a `@keyframes` rule to a CSS selector. The value of this property should match the name of the `@keyframes` rule. Give your `.wheel` selector an `animation-name` property set to `wheel`.

The `animation-duration` property is used to set how long the animation should sequence to complete. The time should be specified in either seconds (`s`) or milliseconds (`ms`). Set your `.wheel` selector to have an `animation-duration` property of `10s`.

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

1. Your `.wheel` selector should have an `animation-name` property set to `wheel`.
2. Your `.wheel` selector should have an `animation-duration` property set to `10s`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 6140df547f09402144e40b92*

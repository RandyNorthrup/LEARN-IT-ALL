---
id: lesson-007-013
title: Step 14
chapterId: chapter-07
order: 13
duration: 5
objectives:
  - Step 14
---

# Step 14

Time to position the cabins around the wheel. Select the first `.cabin` element. Set the `right` property to `-8.5%` and the `top` property to `50%`.

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

1. You should have a `.cabin:nth-of-type(1)` selector.
2. Your `.cabin:nth-of-type(1)` selector should have a `right` property set to `-8.5%`.
3. Your `.cabin:nth-of-type(1)` selector should have a `top` property set to `50%`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 6140d3dc359b371b1a21d783*

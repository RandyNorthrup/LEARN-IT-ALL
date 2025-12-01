---
id: lesson-007-007
title: Step 8
chapterId: chapter-07
order: 7
duration: 5
objectives:
  - Step 8
---

# Step 8

The `transform-origin` property is used to set the point around which a CSS transformation is applied. For example, when performing a `rotate` (which you will do later in this project), the `transform-origin` determines around which point the element is rotated.

Give the `.line` selector a `transform-origin` property of `0% 0%`. This will offset the origin point by `0%` from the left and `0%` from the top, setting it to the top left corner of the element.

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

1. Your `.line` selector should have a `transform-origin` property set to `0% 0%`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 6140d0069049f5139d78da40*

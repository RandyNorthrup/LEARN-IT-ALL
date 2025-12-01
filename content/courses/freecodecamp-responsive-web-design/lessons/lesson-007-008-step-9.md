---
id: lesson-007-008
title: Step 9
chapterId: chapter-07
order: 8
duration: 5
objectives:
  - Step 9
---

# Step 9

Create a selector to target your second `.line` element. Set the `transform` property to `rotate(60deg)`.

Remember that the `transform` property allows you to manipulate the shape of an element. In this case, using the `rotate(60deg)` value will rotate the element around its `transform-origin` point by 60 degrees clockwise.

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

1. You should create a `.line:nth-of-type(2)` selector.
2. Your `.line:nth-of-type(2)` selector should have a `transform` property set to `rotate(60deg)`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 6140d10d50636e14695013b2*

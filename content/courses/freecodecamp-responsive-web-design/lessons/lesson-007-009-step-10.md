---
id: lesson-007-009
title: Step 10
chapterId: chapter-07
order: 9
duration: 5
objectives:
  - Step 10
---

# Step 10

Using the same pattern, create a separate selector for the third `.line`, the fourth `.line`, the fifth `.line`, and the sixth `.line`.

Set the `transform` property for the third `.line` to `rotate(120deg)`, the fourth to `rotate(180deg)`, the fifth to `rotate(240deg)`, and the sixth to `rotate(300deg)`.

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

1. You should create a `.line:nth-of-type(3)` selector.
2. Your `.line:nth-of-type(3)` selector should have a `transform` property set to `rotate(120deg)`.
3. You should create a `.line:nth-of-type(4)` selector.
4. Your `.line:nth-of-type(4)` selector should have a `transform` property set to `rotate(180deg)`.
5. You should create a `.line:nth-of-type(5)` selector.
6. Your `.line:nth-of-type(5)` selector should have a `transform` property set to `rotate(240deg)`.
7. You should create a `.line:nth-of-type(6)` selector.
8. Your `.line:nth-of-type(6)` selector should have a `transform` property set to `rotate(300deg)`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 6140d1a351e88f159ed54fca*

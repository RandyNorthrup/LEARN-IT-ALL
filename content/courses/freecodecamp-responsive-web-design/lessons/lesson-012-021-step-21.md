---
id: lesson-012-021
title: Step 21
chapterId: chapter-12
order: 21
duration: 5
objectives:
  - Step 21
---

# Step 21

The buildings are too spaced out. Squeeze them together by adding two empty `div` elements to the top of the `.background-buildings` element, two more at the bottom of it, and one more in between `.bb3` and `.bb4`. These will be added as evenly-spaced elements across the container, effectively moving the buildings closer to the center.

## Starter Code

```html
<!DOCTYPE html>
<html lang="en">    
  <head>
    <meta charset="UTF-8">
    <title>City Skyline</title>
    <link href="styles.css" rel="stylesheet" />   
  </head>

  <body>
--fcc-editable-region--
    <div class="background-buildings">
      <div class="bb1">
        <div class="bb1a"></div>
        <div class="bb1b"></div>
        <div class="bb1c"></div>
        <div class="bb1d"></div>
      </div>
      <div class="bb2"></div>
      <div class="bb3"></div>
      <div class="bb4"></div>
    </div>
--fcc-editable-region--
  </body>
</html>
```

## Hints

1. You should add two new `div` elements before the `.bb1` element.
2. You should add one new `div` element between the `.bb3` and `.bb4` elements.
3. You should add two new `div` elements after the `.bb4` element.
4. You should add 5 new `div` elements.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5d822fd413a79914d39e98dd*

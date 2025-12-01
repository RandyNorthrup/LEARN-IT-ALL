---
id: lesson-012-020
title: Step 20
chapterId: chapter-12
order: 20
duration: 5
objectives:
  - Step 20
---

# Step 20

The buildings are currently stacked on top of each other. Align the buildings by turning the `.background-buildings` element into a flexbox parent. Use the `align-items` and `justify-content` properties to evenly space the buildings across the bottom of the element.

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
  </body>
</html>
```

## Hints

1. You should add a `display` of `flex` to the `background-buildings` class.
2. You should add an `align-items` of `flex-end` to the `background-buildings` class.
3. You should add a `justify-content` of `space-evenly` to the `background-buildings` class.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5d822fd413a79914d39e98dc*

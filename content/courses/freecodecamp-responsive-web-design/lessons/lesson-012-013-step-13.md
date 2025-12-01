---
id: lesson-012-013
title: Step 13
chapterId: chapter-12
order: 13
duration: 5
objectives:
  - Step 13
---

# Step 13

Center the parts of your building by turning the `.bb1` element into a flexbox parent. Use the `flex-direction` and `align-items` properties to center the children.

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
    </div>
  </body>
</html>
```

## Hints

1. You should not change the `.bb1` `width` or `height` properties.
2. You should give the `.bb1` element a `display` of `flex`.
3. You should give the `.bb1` element a `flex-direction` of `column`.
4. You should give the `.bb1` element a `align-items` of `center`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5d822fd413a79914d39e98d5*

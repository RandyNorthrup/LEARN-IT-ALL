---
id: lesson-012-036
title: Step 36
chapterId: chapter-12
order: 36
duration: 5
objectives:
  - Step 36
---

# Step 36

Squeeze the buildings together again by adding two empty `div` elements within both the top and bottom of the `.foreground-buildings` element, and one more in between `.fb2` and `.fb3`.

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
      <div></div>
      <div></div>
      <div class="bb1">
        <div class="bb1a"></div>
        <div class="bb1b"></div>
        <div class="bb1c"></div>
        <div class="bb1d"></div>
      </div>
      <div class="bb2"></div>
      <div class="bb3"></div>
      <div></div>
      <div class="bb4"></div>
      <div></div>
      <div></div>
    </div>
--fcc-editable-region--
    <div class="foreground-buildings">
      <div class="fb1"></div>
      <div class="fb2"></div>
      <div class="fb3"></div>
      <div class="fb4"></div>
      <div class="fb5"></div>
      <div class="fb6"></div>
    </div>
--fcc-editable-region--
  </body>
</html>
```

## Hints

1. You should add two `div` elements as the first children of `.foreground-buildings`.
2. You should add one `div` element between `.fb2` and `.fb3`.
3. You should add two `div` elements as the last children of `.foreground-buildings`.
4. You should have added 5 new `div` elements.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5d822fd413a79914d39e98ec*

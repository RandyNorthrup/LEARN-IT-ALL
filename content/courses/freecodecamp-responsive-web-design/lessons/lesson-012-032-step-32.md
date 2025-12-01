---
id: lesson-012-032
title: Step 32
chapterId: chapter-12
order: 32
duration: 5
objectives:
  - Step 32
---

# Step 32

Add the same `display`, `align-items`, and `justify-content` properties and values to `.foreground-buildings` that you used on `.background-buildings`. Again, this will use Flexbox to evenly space the buildings across the bottom of their container.

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

    <div class="foreground-buildings">
      <div class="fb1"></div>
      <div class="fb2"></div>
      <div class="fb3"></div>
      <div class="fb4"></div>
      <div class="fb5"></div>
      <div class="fb6"></div>
    </div>
  </body>
</html>
```

## Hints

1. You should give `.foreground-buildings` a `display` property of `flex`.
2. You should give `.foreground-buildings` an `align-items` property of `flex-end`.
3. You should give `.foreground-buildings` a `justify-content` property of `space-evenly`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5d822fd413a79914d39e98e8*

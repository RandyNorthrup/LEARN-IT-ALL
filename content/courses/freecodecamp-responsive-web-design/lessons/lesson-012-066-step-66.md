---
id: lesson-012-066
title: Step 66
chapterId: chapter-12
order: 66
duration: 5
objectives:
  - Step 66
---

# Step 66

Move the `display`, `flex-direction`, and `align-items` properties and values from `.bb1` to the new `building-wrap` class.

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
        <div class="bb1a bb1-window"></div>
        <div class="bb1b bb1-window"></div>
        <div class="bb1c bb1-window"></div>
        <div class="bb1d"></div>
      </div>
      <div class="bb2">
        <div class="bb2a"></div>
        <div class="bb2b"></div>
      </div>
      <div class="bb3"></div>
      <div></div>
      <div class="bb4">
        <div class="bb4a"></div>
        <div class="bb4b"></div>
        <div class="bb4c"></div>
      </div>
      <div></div>
      <div></div>
    </div>

    <div class="foreground-buildings">
      <div></div>
      <div></div>
      <div class="fb1"></div>
      <div class="fb2"></div>
      <div></div>
      <div class="fb3"></div>
      <div class="fb4"></div>
      <div class="fb5"></div>
      <div class="fb6"></div>
      <div></div>
      <div></div>
    </div>
  </body>
</html>
```

## Hints

1. You should remove `display` from `.bb1`.
2. You should move `display` with a value of `flex` to `.building-wrap`.
3. You should remove `flex-direction` from `.bb1`.
4. You should move `flex-direction` with a value of `column` to `.building-wrap`.
5. You should remove `align-items` from `.bb1`.
6. You should move `align-items` with a value of `center` to `.building-wrap`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5d822fd413a79914d39e990a*

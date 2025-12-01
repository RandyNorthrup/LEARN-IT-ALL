---
id: lesson-012-037
title: Step 37
chapterId: chapter-12
order: 37
duration: 5
objectives:
  - Step 37
---

# Step 37

Move the position of `.fb4` relative to where it is now by adding a `position` of `relative` and `left` of `10%` to it. Do the same for `.fb5` but use `right` instead of `left`. This will cover up the remaining white space in between the buildings.

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

1. You should give `.fb4` a `position` of `relative`.
2. You should give `.fb4` a `left` of `10%`.
3. You should give `.fb5` a `position` of `relative`.
4. You should give `.fb5` a `right` of `10%`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5d822fd413a79914d39e98ed*

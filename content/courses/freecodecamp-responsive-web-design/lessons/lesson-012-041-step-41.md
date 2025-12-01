---
id: lesson-012-041
title: Step 41
chapterId: chapter-12
order: 41
duration: 5
objectives:
  - Step 41
---

# Step 41

You want to add the same gradient to the next two sections. Instead of doing that, create a new class selector called `bb1-window`, and move the `height` and `background` properties and values from `.bb1a` to the new class selector.

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

1. You should create a new class selector called `bb1-window`.
2. You should move the `height` property and value from `.bb1a` to `.bb1-window`.
3. You should move the `background` property and value from `.bb1a` to `.bb1-window`.
4. You should not move the `background-color` property from `.bb1a`.
5. You should not move the `width` property from `.bb1a`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5d822fd413a79914d39e98f1*

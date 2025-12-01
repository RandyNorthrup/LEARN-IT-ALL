---
id: lesson-012-073
title: Step 73
chapterId: chapter-12
order: 73
duration: 5
objectives:
  - Step 73
---

# Step 73

Looks good! On to the foreground buildings! Turn the `.fb1` building into three sections by nesting three new `div` elements within it. Give them the classes of `fb1a`, `fb1b` and `fb1c`, in that order.

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
      <div class="bb1 building-wrap">
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
      <div class="bb4 building-wrap">
        <div class="bb4a"></div>
        <div class="bb4b"></div>
        <div class="bb4c window-wrap">
          <div class="bb4-window"></div>
          <div class="bb4-window"></div>
          <div class="bb4-window"></div>
          <div class="bb4-window"></div>
        </div>
      </div>
      <div></div>
      <div></div>
    </div>

    <div class="foreground-buildings">
      <div></div>
      <div></div>
--fcc-editable-region--
      <div class="fb1"></div>
--fcc-editable-region--
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

1. You should add three `div` elements within `.fb1`.
2. You should give the first new `div` a class of `fb1a`.
3. You should give the second new `div` a class of `fb1b`.
4. You should give the third new `div` a class of `fb1c`.
5. You should place the new `div` elements in this order `.fb1a + .fb1b + .fb1c`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5d822fd413a79914d39e9911*

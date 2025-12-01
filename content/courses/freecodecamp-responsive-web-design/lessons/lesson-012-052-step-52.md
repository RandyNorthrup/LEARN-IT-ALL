---
id: lesson-012-052
title: Step 52
chapterId: chapter-12
order: 52
duration: 5
objectives:
  - Step 52
---

# Step 52

You can see the hard color change at the top of the section. Change the gradient type from `linear-gradient` to `repeating-linear-gradient` for this section. This will make the four colors of your gradient repeat until it gets to the bottom of the element; giving you some stripes, and saving you from having to add a bunch of elements to create them.

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

1. You should change the `background` property of `.bb2b` from using `linear-gradient` to using `repeating-linear-gradient`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5d822fd413a79914d39e98fc*

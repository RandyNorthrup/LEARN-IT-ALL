---
id: lesson-012-104
title: Step 103
chapterId: chapter-12
order: 104
duration: 5
objectives:
  - Step 103
---

# Step 103

This building is going to have another triangle on top. Give the top section a `border-top` of `5vh solid transparent`, and a `border-left` that is `8vw`, `solid`, and uses your building color variable as the color.

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
      <div class="fb1 building-wrap">
        <div class="fb1a"></div>
        <div class="fb1b"></div>
        <div class="fb1c"></div>
      </div>
      <div class="fb2">
        <div class="fb2a"></div>
        <div class="fb2b window-wrap">
          <div class="fb2-window"></div>
          <div class="fb2-window"></div>
          <div class="fb2-window"></div>
        </div>
      </div>
      <div></div>
      <div class="fb3 building-wrap">
        <div class="fb3a window-wrap">
          <div class="fb3-window"></div>
          <div class="fb3-window"></div>
          <div class="fb3-window"></div>
        </div>
        <div class="fb3b"></div>
        <div class="fb3a"></div>
        <div class="fb3b"></div>
      </div>
      <div class="fb4">
        <div class="fb4a"></div>
        <div class="fb4b">
          <div class="fb4-window"></div>
          <div class="fb4-window"></div>
          <div class="fb4-window"></div>
          <div class="fb4-window"></div>
          <div class="fb4-window"></div>
          <div class="fb4-window"></div>
        </div>
      </div>
      <div class="fb5"></div>
      <div class="fb6"></div>
      <div></div>
      <div></div>
    </div>
  </body>
</html>
```

## Hints

1. You should give `.fb4a` a `border-top` of `5vh solid transparent`.
2. You should give `.fb4a` a `border-left` of `8vw solid var(--building-color1)`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5d822fd413a79914d39e9930*

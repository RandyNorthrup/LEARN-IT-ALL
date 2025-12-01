---
id: lesson-012-106
title: Step 104
chapterId: chapter-12
order: 106
duration: 5
objectives:
  - Step 104
---

# Step 104

On to the next building! It's the green one in the foreground. Give it a `repeating-linear-gradient` with your building color from `0%` to `5%`, and `transparent` from `5%` to `10%`.

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

1. You should give `.fb5` a `background` property.
2. You should give the `background` a `repeating-linear-gradient`.
3. You should give the `repeating-linear-gradient` a first color of `--building-color2` from `0%` to `5%`.
4. You should give the `repeating-linear-gradient` a second color of `transparent` from `5%` to `10%`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5d822fd413a79914d39e9932*

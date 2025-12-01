---
id: lesson-012-051
title: Step 51
chapterId: chapter-12
order: 51
duration: 5
objectives:
  - Step 51
---

# Step 51

Gradient transitions often gradually change from one color to another. When a more abrupt change is required, the transition can be made with a hard stop like this:

```css
linear-gradient(
  var(--first-color) 0%,
  var(--first-color) 40%,
  var(--second-color) 40%,
  var(--second-color) 80%
);
```

Add a `linear-gradient` to `.bb2b` that uses `--building-color2` from `0%` to `6%` and `--window-color2` from `6%` to `9%`.

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

1. You should give `.bb2b` a `background` property.
2. You should use a `linear-gradient` on the `background`.
3. You should use `--building-color2` from `0%` to `6%`.
4. You should use `--window-color2` from `6%` to `9%`.
5. `.bb2b` should have a `linear-gradient` transitioning from `--building-color2` at `0%` to `6%`, and `--window-color2` at `6%` to `9%`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5d822fd413a79914d39e98fb*

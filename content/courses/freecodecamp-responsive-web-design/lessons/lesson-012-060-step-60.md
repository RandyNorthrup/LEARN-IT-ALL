---
id: lesson-012-060
title: Step 60
chapterId: chapter-12
order: 60
duration: 5
objectives:
  - Step 60
---

# Step 60

So far, all the gradients you created have gone from top to bottom, that's the default direction. You can specify another direction by adding it before your colors like this:

```css
gradient-type(
  direction,
  color1,
  color2
);
```

Fill in `.bb3` with a `repeating-linear-gradient`. Use `90deg` for the direction, your `building-color3` for the first two colors, and `window-color3` at `15%` for the third.

When you don't specify a distance for a color, it will use the values that makes sense. In this case, the first two colors will default to `0%` and `7.5%` because it starts at `0%`, and `7.5%` is half of the `15%`, so you do not need to set them.

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

1. You should give `.bb3` a `background` using `repeating-linear-gradient`.
2. You should use `90deg` for the direction in the first argument of `repeating-linear-gradient`.
3. You should not set the percentage for the first color.
4. You should not set the percentage for the second color.
5. You should use `--building-color3` for the first two colors.
6. You should use `--window-color3` at `15%` for the third color.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5d822fd413a79914d39e9904*

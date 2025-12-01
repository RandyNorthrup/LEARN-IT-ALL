---
id: lesson-012-040
title: Step 40
chapterId: chapter-12
order: 40
duration: 5
objectives:
  - Step 40
---

# Step 40

Gradients in CSS are a way to transition between colors across the distance of an element. They are applied to the `background` property and the syntax looks like this:

```css
gradient-type(
  color1,
  color2
);
```

In the example, `color1` is solid at the top, `color2` is solid at the bottom, and in between it transitions evenly from one to the next. In `.bb1a`, add a `background` property below the `background-color` property. Set it as a gradient of type `linear-gradient` that uses `--building-color1` as the first color and `--window-color1` as the second.

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

1. You should apply a `background` to `.bb1a` right after the `background-color`.
2. You should give the `background` a `linear-gradient`.
3. You should give the `background` a `linear-gradient` starting from `var(--building-color1)`.
4. You should give the `background` a `linear-gradient` ending at `var(--window-color1)`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5d822fd413a79914d39e98f0*

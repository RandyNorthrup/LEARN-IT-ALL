---
id: lesson-012-044
title: Step 44
chapterId: chapter-12
order: 44
duration: 5
objectives:
  - Step 44
---

# Step 44

Gradients can use as many colors as you want like this:

```css
gradient-type(
  color1,
  color2,
  color3
);
```

Add a `linear-gradient` to `.bb1d` with `orange` as the first color, `--building-color1` as the second, and `--window-color1` as the third. Remember to use the gradient on the `background` property.

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

1. You should use the `background` on `.bb1d`.
2. You should give the `background` property a `linear-gradient`.
3. You should use `orange` as the first color in the `linear-gradient`.
4. You should use `--building-color1` as the second color in the `linear-gradient`.
5. You should use `--window-color1` as the third color in the `linear-gradient`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5d822fd413a79914d39e98f4*

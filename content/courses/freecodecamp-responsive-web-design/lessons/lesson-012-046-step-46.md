---
id: lesson-012-046
title: Step 46
chapterId: chapter-12
order: 46
duration: 5
objectives:
  - Step 46
---

# Step 46

You can specify where you want a gradient transition to complete by adding it to the color like this:

```css
gradient-type(
  color1,
  color2 20%,
  color3
);
```

Here, it will transition from `color1` to `color2` between `0%` and `20%` of the element and then transition to `color3` for the rest. Add `80%` to the `--building-color1` color of the `.bb1d` gradient so you can see it in action.

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

1. You should add a value of `80%` to the `--building-color1` color in the `linear-gradient` of `.bb1d`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5d822fd413a79914d39e98f6*

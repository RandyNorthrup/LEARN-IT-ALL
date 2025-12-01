---
id: lesson-012-029
title: Step 29
chapterId: chapter-12
order: 29
duration: 5
objectives:
  - Step 29
---

# Step 29

You want the `.foreground-buildings` container to sit directly on top of the `.background-buildings` element. Give it a `width` and `height` of `100%`, set the `position` to `absolute`, and the `top` to `0`. This will make it the same size as the body and move the start of it to the top left corner.

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

    <div class="foreground-buildings"></div>
  </body>
</html>
```

## Hints

1. You should use a `.foreground-buildings` selector.
2. You should give the `.foreground-buildings` element a `width` of `100%`.
3. You should give the `.foreground-buildings` element a `height` of `100%`.
4. You should give the `.foreground-buildings` element a `position` of `absolute`.
5. You should give the `.foreground-buildings` element a `top` of `0`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5d822fd413a79914d39e98e5*

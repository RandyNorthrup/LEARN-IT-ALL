---
id: lesson-012-033
title: Step 33
chapterId: chapter-12
order: 33
duration: 5
objectives:
  - Step 33
---

# Step 33

To begin optimizing your code, first move the `position` and `top` properties and values from `.foreground-buildings` to `.background-buildings`, then change the existing `.background-buildings` selector to also target `.foreground-buildings`, so the styles will be applied to both. You can use a comma (`,`) to separate selectors like this: `selector1, selector2`.

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
      <div class="fb1"></div>
      <div class="fb2"></div>
      <div class="fb3"></div>
      <div class="fb4"></div>
      <div class="fb5"></div>
      <div class="fb6"></div>
    </div>
  </body>
</html>
```

## Hints

1. You should not remove the `.foreground-buildings` declaration.
2. You should remove the `position` property from `.foreground-buildings`.
3. You should remove the `top` property from `.foreground-buildings`.
4. You should add the `position` property of `absolute` to `.background-buildings, .foreground-buildings`.
5. You should add the `top` property of `0` to `.background-buildings, .foreground-buildings`.
6. You should use a comma to use both `.foreground-buildings` and `.background-buildings` selectors in the same style declaration.
7. You should not have a separate `.background-buildings` selector.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5d822fd413a79914d39e98e9*

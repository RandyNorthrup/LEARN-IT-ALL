---
id: lesson-012-025
title: Step 25
chapterId: chapter-12
order: 25
duration: 5
objectives:
  - Step 25
---

# Step 25

That didn't work, because the variables you declared in `.bb1` do not cascade to the `.bb2` and `.bb3` sibling elements. That's just how CSS works. Because of this, variables are often declared in the `:root` selector. This is the highest level selector in CSS; putting your variables there will make them usable everywhere. Add the `:root` selector to the top of your stylesheet, and move all your variable declarations there.

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
  </body>
</html>
```

## Hints

1. You should declare a `:root` selector at the top of the stylesheet.
2. You should define `--building-color1` with a value of `#aa80ff` in the `:root` selector.
3. You should define `--building-color2` with a value of `#66cc99` in the `:root` selector.
4. You should define `--building-color3` with a value of `#cc6699` in the `:root` selector.
5. You should remove the custom property variables from `.bb1`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5d822fd413a79914d39e98e1*

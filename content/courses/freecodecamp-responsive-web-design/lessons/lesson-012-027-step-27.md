---
id: lesson-012-027
title: Step 27
chapterId: chapter-12
order: 27
duration: 5
objectives:
  - Step 27
---

# Step 27

Create another variable named `--building-color4` and give it a value of `#538cc6`. Make sure it's in the `:root` selector this time. Then use it to fill in the last building.

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

1. You should define a new property variable called `--building-color4`.
2. You should give `--building-color4` a value of `#538cc6` in the `:root` selector.
3. You should add `background-color: var(--building-color4)` in the `.bb4` selector.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5d822fd413a79914d39e98e3*

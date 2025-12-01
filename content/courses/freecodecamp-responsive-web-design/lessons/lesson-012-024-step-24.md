---
id: lesson-012-024
title: Step 24
chapterId: chapter-12
order: 24
duration: 5
objectives:
  - Step 24
---

# Step 24

Create a new variable below the other ones named `--building-color3` and give it a value of `#cc6699`. Then use it as the `background-color` of the `.bb3` class and give it a fallback value of `pink`.

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

1. You should define a new property variable called `--building-color3`.
2. You should give `--building-color3` a value of `#cc6699`.
3. You should set the `background-color` of `.bb3`.
4. You should set the `background-color` using the `--building-color3` variable with a fallback of `pink`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5d822fd413a79914d39e98e0*

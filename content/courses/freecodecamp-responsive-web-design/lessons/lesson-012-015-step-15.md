---
id: lesson-012-015
title: Step 15
chapterId: chapter-12
order: 15
duration: 5
objectives:
  - Step 15
---

# Step 15

To use a variable, put the variable name in parentheses with `var` in front of them like this: `var(--variable-name)`. Whatever value you gave the variable will be applied to whatever property you use it on. 

Add the variable `--building-color1` you created in the previous step as the value of the `background-color` property of the `.bb1a` class.

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
      <div class="bb1">
        <div class="bb1a"></div>
        <div class="bb1b"></div>
        <div class="bb1c"></div>
        <div class="bb1d"></div>
      </div>
    </div>
  </body>
</html>
```

## Hints

1. The `background-color` of the `.bb1a` element should be set.
2. You should use `var(--building-color1)` to set the `background-color` of the `.bb1a` element.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5d822fd413a79914d39e98d7*

---
id: lesson-017-054
title: Step 55
chapterId: chapter-17
order: 54
duration: 5
objectives:
  - Step 55
---

# Step 55

The callback function should have a parameter for each capture group in the regular expression. In your case, `rangeRegex` has four capture groups: the first letter, the first numbers, the second letter, and the second numbers.

Give your callback function four more parameters to match those capture groups: `char1`, `num1`, `char2`, and `num2`. `char` will be short for `character`.

## Starter Code

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="./styles.css" />
    <title>Functional Programming Spreadsheet</title>
  </head>
  <body>
    <div id="container">
      <div></div>
    </div>
    <script src="./script.js"></script>
  </body>
</html>
```

## Hints

1. Your callback function should have `char1` as the second parameter.
2. Your callback function should have `num1` as the third parameter.
3. Your callback function should have `char2` as the fourth parameter.
4. Your callback function should have `num2` as the fifth parameter.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 646d3141790b3cb337dd611a*

---
id: lesson-017-036
title: Step 37
chapterId: chapter-17
order: 36
duration: 5
objectives:
  - Step 37
---

# Step 37

After matching a cell letter successfully, your `rangeRegex` needs to match the cell number. Cell numbers in your sheet range from `1` to `99`.

Add a capture group after your letter capture group. Your new capture group should match one or two digits – the first digit should be `1` through `9`, and the second digit should be `0` through `9`. The second digit should be optional.

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

1. You should add a second capture group to your `rangeRegex`.
2. Your second capture group should have a character class.
3. Your second capture group should have two character classes.
4. Your first new character class should match the digits `1` through `9`.
5. Your second new character class should match the digits `0` through `9`.
6. Your second new character class should be optional.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 64498542cab69128ab24e4de*

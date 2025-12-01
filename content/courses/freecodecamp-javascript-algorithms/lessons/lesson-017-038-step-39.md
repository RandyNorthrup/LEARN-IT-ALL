---
id: lesson-017-038
title: Step 39
chapterId: chapter-17
order: 38
duration: 5
objectives:
  - Step 39
---

# Step 39

After your `rangeRegex` finds the `:`, it needs to look for the same letter and number pattern as it did before.

Copy your two existing capture groups and paste them after the colon.

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

1. You should add a third capture group to your `rangeRegex`, after the colon.
2. Your third capture group should use a character class.
3. Your third capture group should match the characters `A` through `J`.
4. You should add a fourth capture group to your `rangeRegex`.
5. Your fourth capture group should match one or two digits.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6449863f592af72d9be0959e*

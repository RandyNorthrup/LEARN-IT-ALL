---
id: lesson-017-060
title: Step 61
chapterId: chapter-17
order: 60
duration: 5
objectives:
  - Step 61
---

# Step 61

Declare a variable `cellRegex` to match cell references. It should match a letter from `A` to `J`, followed by a digit from `1` to `9`, and an optional digit from `0` to `9`. Make the regular expression case-insensitive and global.

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

1. You should declare a `cellRegex` variable.
2. You should use `const` to declare your `cellRegex` variable.
3. You should assign a regular expression to your `cellRegex` variable.
4. Your regular expression should use a character class to match the characters from `A` to `J`.
5. Your regular expression should use a character class to match the digits from `1` to `9`.
6. Your regular expression should use a character class to match the digits from `0` to `9`.
7. Your third character class should be optional.
8. Your regular expression should be case-insensitive and global.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 646d39c156fe94b7482c3ab6*

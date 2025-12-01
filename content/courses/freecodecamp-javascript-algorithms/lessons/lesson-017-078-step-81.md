---
id: lesson-017-078
title: Step 81
chapterId: chapter-17
order: 78
duration: 5
objectives:
  - Step 81
---

# Step 81

Now that you've parsed and evaluated the multiplication and division operators, you need to do the same with the addition and subtraction operators.

Declare an `infix` variable, and assign it a regular expression that matches a number (including decimal numbers) followed by a `+` or `-` operator followed by another number.

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

1. You should declare an `infix` variable.
2. You should use `const` to declare your `infix` variable.
3. Your `infix` variable should be a regular expression.
4. Your `infix` regex should use a capture group.
5. Your first capture group should use a character class.
6. Your first capture group should match one or more digits or decimal points. Use the `\d` character class.
7. Your `infix` regex should use a second capture group.
8. Your second capture group should use a character class.
9. Your second capture group should match either the `+` or `-` operator.
10. Your `infix` regex should use a third capture group.
11. Your third capture group should be the same as your first capture group.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 646d42f58deb2fc52adc6611*

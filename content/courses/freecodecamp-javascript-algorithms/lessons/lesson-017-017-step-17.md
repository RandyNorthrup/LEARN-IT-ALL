---
id: lesson-017-017
title: Step 17
chapterId: chapter-17
order: 17
duration: 5
objectives:
  - Step 17
---

# Step 17

Now in your nested `.forEach()` call, declare an `input` variable. Use the `.createElement()` method of the `document` object to create an `input` element. Set the `type` attribute to `"text"` and the `id` attribute to `letter + number`.

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

1. You should declare an `input` variable.
2. You should use `const` to declare your `input` variable.
3. You should call the `.createElement()` method of the `document` object.
4. You should pass the string `"input"` to the `.createElement()` method.
5. You should assign your new `input` element to your `input` variable.
6. You should access the `type` property of your `input` element.
7. You should set the `type` attribute of your `input` element to `"text"`.
8. You should access the `id` property of your `input` element.
9. You should set the `id` attribute of your `input` element to `letter + number`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 643475e13dc727231acd0f72*

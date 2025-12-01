---
id: lesson-017-102
title: Step 101
chapterId: chapter-17
order: 102
duration: 5
objectives:
  - Step 101
---

# Step 101

Arrays have an `.every()` method. Like the `.some()` method, `.every()` accepts a callback function which should take an element of the array as the argument. The `.every()` method will return `true` if the callback function returns `true` for all elements in the array.

Here is an example of a `.every()` method call to check if all elements in the array are uppercase letters.

```js
const arr = ["A", "b", "C"];
arr.every(letter => letter === letter.toUpperCase());
```

Add an `everyeven` property to your `spreadsheetFunctions` - use the `.every()` method to check whether all array elements are even.

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

1. Your `spreadsheetFunctions` object should have an `everyeven` property.
2. Your `everyeven` property should be a function.
3. Your `everyeven` function should return `true` if every element in the array is even.
4. Your `everyeven` function should return `false` if some of the elements in the array are not even.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6491d38f5b09a021c4b5d5fe*

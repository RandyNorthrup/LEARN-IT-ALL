---
id: lesson-017-025
title: Step 26
chapterId: chapter-17
order: 25
duration: 5
objectives:
  - Step 26
---

# Step 26

Object properties consist of key/value pairs. You can use shorthand property names when declaring an object literal. When using the shorthand property name syntax, the name of the variable becomes the property key and its value the property value.

The following example declares a `user` object with the properties `userId`, `firstName`, and `loggedIn`.

```js
const userId = 1;
const firstName = "John";
const loggedIn = true;

const user = {
  userId,
  firstName,
  loggedIn,
};

console.log(user); // { userId: 1, firstName: 'John', loggedIn: true }
```

To keep track of all of your spreadsheet's functions, declare a `spreadsheetFunctions` object. Using the shorthand notation syntax, set `sum`, `average`, and `median` as properties on the `spreadsheetFunctions` object.

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

1. You should declare a `spreadsheetFunctions` variable.
2. You should use `const` to declare your `spreadsheetFunctions` variable.
3. Your `spreadsheetFunctions` variable should be an object.
4. Your `spreadsheetFunctions` object should have a `sum` property.
5. Your `sum` property should be your `sum` function.
6. Your `spreadsheetFunctions` object should have an `average` property.
7. Your `average` property should be your `average` function.
8. Your `spreadsheetFunctions` object should have a `median` property.
9. Your `median` property should be your `median` function.
10. You should use destructuring syntax to assign your properties.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 64496df724dd3716a71fe971*

---
id: lesson-017-086
title: Step 89
chapterId: chapter-17
order: 86
duration: 5
objectives:
  - Step 89
---

# Step 89

Update the callback function to take `match`, `fn`, and `args` as parameters. It should implicitly return the result of checking whether `spreadsheetFunctions` has its own property of `fn`.

Remember to make `fn` lower case.

To check if a property on a given object exists or not, you can use the <dfn>hasOwnProperty()</dfn> method. 

The `hasOwnProperty()` method returns `true` or `false` depending on if the property is found on the object or not.

Here is an example of how to use the `hasOwnProperty()` method:

```js
const developerObj = {
  name: 'John',
  age: 34,
}

developerObj.hasOwnProperty('name'); // true
developerObj.hasOwnProperty('salary'); // false
```

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

1. Your callback function should have `match` as the first parameter.
2. Your callback function should have `fn` as the second parameter.
3. Your callback function should have `args` as the third parameter.
4. Your callback function should use an implicit return.
5. Your callback function should return the result of calling the `.hasOwnProperty()` method on the `spreadsheetFunctions` object.
6. You should pass `fn` to the .`hasOwnProperty()` method.
7. You should call the `.toLowerCase()` method on `fn`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 646d4626420eeecd51f241c2*

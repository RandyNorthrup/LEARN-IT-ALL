---
id: lesson-017-044
title: Step 45
chapterId: chapter-17
order: 44
duration: 5
objectives:
  - Step 45
---

# Step 45

The concept of returning a function within a function is called <dfn>currying</dfn>. This approach allows you to create a variable that holds a function to be called later, but with a reference to the parameters of the outer function call.

For example:

```js
const innerOne = elemValue(1);
const final = innerOne("A");
```

`innerOne` would be your `inner` function, with `num` set to `1`, and `final` would have the value of the cell with the `id` of `"A1"`. This is possible because functions have access to all variables declared at their creation. This is called <dfn>closure</dfn>.

You'll get some more practice with this. Declare a function called `addCharacters` which takes a `character1` parameter.

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

1. You should declare an `addCharacters` variable.
2. You should use `const` to declare your `addCharacters` variable.
3. Your `addCharacters` variable should be an arrow function.
4. Your `addCharacters` function should not use an implicit return.
5. Your `addCharacters` function should have a `character1` parameter.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 646d0a022da7bcabf3e3aca3*

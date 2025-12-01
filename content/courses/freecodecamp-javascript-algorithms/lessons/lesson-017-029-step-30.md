---
id: lesson-017-029
title: Step 30
chapterId: chapter-17
order: 29
duration: 5
objectives:
  - Step 30
---

# Step 30

Because the `change` event is triggering on an `input` element, the element will have a `value` property that represents the current value of the input.

Assign the `value` property of `element` to a new variable called `value`, and use `.replace()` to remove all whitespace.

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

1. You should declare a `value` variable after your `element` variable.
2. You should use `const` to declare your `value` variable.
3. You should assign the `value` property of `element` to your `value` variable.
4. You should call the `.replace()` method on the `value` property of the `element`.
5. You should pass a regular expression to match whitespace to your `.replace()` method. Use the `\s` character class.
6. You should make your regular expression global.
7. You should pass an empty string as your second argument to the `.replace()` method.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 64497da4062602213ecf32e7*

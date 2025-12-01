---
id: lesson-017-067
title: Step 68
chapterId: chapter-17
order: 67
duration: 5
objectives:
  - Step 68
---

# Step 68

Now that you have your infix functions, you need a way to evaluate them. Declare an `infixEval` function which takes two parameters, `str` and `regex`. It should implicitly return the `.replace()` method of `str`, with `regex` and an empty callback as the arguments.

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

1. You should declare an `infixEval` variable.
2. You should use `const` to declare your `infixEval` variable.
3. Your `infixEval` variable should be a function.
4. Your `infixEval` function should use arrow syntax.
5. Your `infixEval` function should have `str` as its first parameter.
6. Your `infixEval` function should have `regex` as its second parameter.
7. Your `infixEval` function should use an implicit return.
8. Your `infixEval` function should return the result of calling the `.replace()` method on `str`.
9. You should pass `regex` as the first argument to the `.replace()` method.
10. You should pass an empty arrow function as the second argument to the `.replace()` method.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 646d3da8501e15bcd355ba1d*

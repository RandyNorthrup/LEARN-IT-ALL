---
id: lesson-017-022
title: Step 23
chapterId: chapter-17
order: 22
duration: 5
objectives:
  - Step 23
---

# Step 23

Your next function will calculate the median value of an array of numbers. Start by declaring a `median` arrow function that takes a `nums` parameter.

In the function, declare a `sorted` variable and assign it the value of sorting a copy of the `nums` array.

You should use the `slice()` method for creating a shallow copy of the array.

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

1. You should declare a `median` variable.
2. You should use `const` to declare your `median` variable.
3. Your `median` variable should be a function.
4. Your `median` function should use arrow syntax.
5. Your `median` function should have a `nums` parameter.
6. Your `median` function should not use an implicit return.
7. Your `median` function should have a `sorted` variable.
8. You should use `const` to declare your `sorted` variable.
9. You should use `.slice()` to assign a copy of the `nums` array to `sorted`.
10. You should chain the `.sort()` method to your `.slice()` method.
11. You should pass a callback function to your `sort` method to accurately sort the numbers in ascending order. Use an implicit return for clarity.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 643715013330824ecaa70442*

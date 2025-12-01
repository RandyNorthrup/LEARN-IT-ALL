---
id: lesson-017-011
title: Step 11
chapterId: chapter-17
order: 11
duration: 5
objectives:
  - Step 11
---

# Step 11

Your `range` function expects numbers, but your `start` and `end` values will be strings (specifically, they will be single characters such as `A`).

Convert your `start` and `end` values in your `range()` call to numbers by using the `.charCodeAt()` method on them, passing the number `0` as the argument to that method.

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

1. You should use the `.charCodeAt()` method.
2. You should call the `.charCodeAt()` method on `start`.
3. You should pass `0` to the `.charCodeAt()` method of `start`.
4. You should call the `.charCodeAt()` method on `end`.
5. You should pass `0` to the `.charCodeAt()` method of `end`.
6. You should use the `.charCodeAt()` methods directly in your `range` call.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6434552bcc0a951a0a99df3b*

---
id: lesson-021-012
title: Step 12
chapterId: chapter-21
order: 12
duration: 5
objectives:
  - Step 12
---

# Step 12

Arrays have a `.some()` method. Like the `.filter()` method, `.some()` accepts a callback function which should take an element of the array as the argument. The `.some()` method will return `true` if the callback function returns `true` for at least one element in the array.

Here is an example of a `.some()` method call to check if any element in the array is an uppercase letter.

```js
const arr = ["A", "b", "C"];
arr.some(letter => letter === letter.toUpperCase());
```

Use the `.some()` method to check if testing your `msg` on any of your `denyList` regular expressions returns `true`.

Use `regex` as the parameter for the callback function, for clarity.

## Starter Code

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Learn Regular Expressions by Building a Spam Filter</title>
    <link rel="stylesheet" href="styles.css" />
  </head>

  <body>
    <header class="main-text">
      <h1 class="title">Is this Spam?</h1>
      <p class="description">
        Enter a phrase to check if it would be marked as spam or not.
      </p>
    </header>

    <main>
      <label class="message-label" for="message-input">Message: </label>
      <textarea
        placeholder="Enter message here"
        value=""
        type="text"
        name="message"
        id="message-input"
        rows="10"
        cols="40"
      ></textarea>
      <button class="btn" id="check-message-btn" type="button">
        Check message
      </button>
      <p id="result"></p>
    </main>

    <footer class="footer">&copy; freeCodeCamp</footer>
    <script src="./script.js"></script>
  </body>
</html>
```

## Hints

1. Your `isSpam` function should implicitly return the result of `denyList.some()`.
2. Your `.some()` method should use arrow syntax for the callback.
3. Your `.some()` callback should take `regex` as the parameter.
4. Your `.some()` callback should implicitly return the result of testing `msg` on `regex`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6421f98f4999d1179ce37cb4*

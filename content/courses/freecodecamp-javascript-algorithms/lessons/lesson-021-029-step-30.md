---
id: lesson-021-029
title: Step 30
chapterId: chapter-21
order: 29
duration: 5
objectives:
  - Step 30
---

# Step 30

Like your `freeRegex`, update your `stockRegex` to replace the `e` and `o` characters with character classes to match the letter and the corresponding number.

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

1. Your `stockRegex` should use a character class to match the letter `e` and the number `3`.
2. Your `stockRegex` should use a character class to match the letter `o` and the number `0`.
3. Your `stockRegex` should match `stock alert`.
4. Your `stockRegex` should match `st0ck al3rt`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 642344dc9390c712080432c7*

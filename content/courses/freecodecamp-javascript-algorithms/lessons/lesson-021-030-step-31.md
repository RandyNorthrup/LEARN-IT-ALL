---
id: lesson-021-030
title: Step 31
chapterId: chapter-21
order: 30
duration: 5
objectives:
  - Step 31
---

# Step 31

Next update your `s` and `t` characters to also match `5` and `7` respectively.

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

1. Your `stockRegex` should use a character class to match the letter `s` and the number `5`.
2. Your `stockRegex` should use a character class to match the letter `t` and the number `7`.
3. Your `stockRegex` should match `stock alert`.
4. Your `stockRegex` should match `570ck al3r7`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 64234598ef08dd13114edae5*

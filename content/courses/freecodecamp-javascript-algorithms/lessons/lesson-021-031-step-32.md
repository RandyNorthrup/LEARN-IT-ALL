---
id: lesson-021-031
title: Step 32
chapterId: chapter-21
order: 31
duration: 5
objectives:
  - Step 32
---

# Step 32

Character classes can take more than two characters. Replace your `a` character with a character class that matches `a`, `@`, and `4`.

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

1. Your `stockRegex` should use a character class to match `a`, `@`, and `4`.
2. Your `stockRegex` should match `stock alert`.
3. Your `stockRegex` should match `stock @lert`.
4. Your `stockRegex` should match `stock 4lert`.
5. Your `stockRegex` should match `570ck 4l3r7`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6423462975f33b14056583de*

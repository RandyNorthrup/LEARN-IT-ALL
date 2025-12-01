---
id: lesson-021-033
title: Step 34
chapterId: chapter-21
order: 33
duration: 5
objectives:
  - Step 34
---

# Step 34

Finally, allow your regex to match whole words (like you did with `freeRegex`).

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

1. Your `stockRegex` should use a non-capturing group.
2. Your `stockRegex` should use a non-capturing group to match `\s` or `^`.
3. Your `stockRegex` should use a second non-capturing group.
4. Your `stockRegex` should use a non-capturing group to match `\s` or `$`.
5. Your `stockRegex` should match `it's stock alert time`.
6. Your `stockRegex` should match `stock alert time`.
7. Your `stockRegex` should match `it's stock alert`.
8. Your `stockRegex` should match `stock alert`.
9. Your `stockRegex` should not match `hands-stock alert time`.
10. Your `stockRegex` should not match `stock alert-management`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 64234797d84734163088961a*

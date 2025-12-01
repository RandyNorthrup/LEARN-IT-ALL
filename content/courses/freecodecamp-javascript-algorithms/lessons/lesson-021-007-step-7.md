---
id: lesson-021-007
title: Step 7
chapterId: chapter-21
order: 7
duration: 5
objectives:
  - Step 7
---

# Step 7

Regular expressions can take <dfn>flags</dfn> to modify their behavior. For instance, the `i` flag can be used to make the expression ignore case, causing it to match `hello`, `HELLO`, and `Hello` for the expression `/hello/`.

Flags are added after the trailing slash. Add the `i` flag to your `helpRegex`.

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

1. Your `helpRegex` should have the case-insensitive `i` flag.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 641ce3065c50e62f97406973*

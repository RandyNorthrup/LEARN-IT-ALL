---
id: lesson-021-032
title: Step 33
chapterId: chapter-21
order: 32
duration: 5
objectives:
  - Step 33
---

# Step 33

Using the same syntax, update `c` to match `c`, `{`, `[`, and `(`.

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

1. Your `stockRegex` should use a character class to match `c`, `{`, `[`, and `(`.
2. Your `stockRegex` should match `stock alert`.
3. Your `stockRegex` should match `570(k 4l3r7`.
4. Your `stockRegex` should match `sto{k alert`.
5. Your `stockRegex` should match `sto[k alert`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6423472aeed932150e8984b6*

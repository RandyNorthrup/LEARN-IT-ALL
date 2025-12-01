---
id: lesson-021-023
title: Step 24
chapterId: chapter-21
order: 23
duration: 5
objectives:
  - Step 24
---

# Step 24

Spam messages often use numbers instead of letters to bypass filters. Your regular expression should catch these.

Replace the `e` characters in your regular expression with character classes that match `e` and `3`.

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

1. Your `freeRegex` should use a character class.
2. Your `freeRegex` should use a character class to match `e` and `3`.
3. Your `freeRegex` should use three character classes to match `e` and `3`.
4. Your `freeRegex` should match `free money`.
5. Your `freeRegex` should match `fr33 mon3y`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 64233094a1293c079b5b0996*

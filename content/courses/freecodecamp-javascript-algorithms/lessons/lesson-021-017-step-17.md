---
id: lesson-021-017
title: Step 17
chapterId: chapter-21
order: 17
duration: 5
objectives:
  - Step 17
---

# Step 17

Between your digits and your `dollars` text, you want to catch place values.

Use the `|` token to allow `hundred`, `thousand`, `million`, or `billion` between your digits and `dollars`.

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

1. Your `dollarRegex` should use the `|` token.
2. Your `dollarRegex` should have three `|` tokens.
3. Your `dollarRegex` should use the `|` token to match `hundred`, `thousand`, `million`, or `billion`.
4. Your `dollarRegex` should match `1 hundred dollars`.
5. Your `dollarRegex` should match `1 thousand dollars`.
6. Your `dollarRegex` should match `1 million dollars`.
7. Your `dollarRegex` should match `1 billion dollars`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 64220e8cb589f61e625bf453*

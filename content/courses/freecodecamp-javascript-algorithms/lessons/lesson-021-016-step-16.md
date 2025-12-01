---
id: lesson-021-016
title: Step 16
chapterId: chapter-21
order: 16
duration: 5
objectives:
  - Step 16
---

# Step 16

The dollar value may be more than one digit. To match this, the `+` quantifier can be used - this matches one or more consecutive occurrences. For example, the regular expression `/a+/` matches one or more consecutive `a` characters.

Update your regular expression to match one or more consecutive digits.

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

1. Your `dollarRegex` should use the `+` quantifier.
2. Your `dollarRegex` should use the `+` quantifier on your `[0-9]` character class.
3. Your `dollarRegex` should still match `"100 dollars"`.
4. Your `dollarRegex` should still match `"3 dollars"`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 642208bc4d44701c6fd6f65e*

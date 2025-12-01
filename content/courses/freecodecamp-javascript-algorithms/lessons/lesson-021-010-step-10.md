---
id: lesson-021-010
title: Step 10
chapterId: chapter-21
order: 10
duration: 5
objectives:
  - Step 10
---

# Step 10

The <dfn>alternate sequence</dfn> `|` can be used to match either the text on the left or the text on the right of the `|`. For example, the regular expression `/yes|no/` will match either `yes` or `no`.

Update your `helpRegex` to match either `please help` or `assist me`.

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

1. Your `helpRegex` should use the `|` alternate sequence.
2. Your `helpRegex` should match the string `please help`.
3. Your `helpRegex` should match the string `assist me`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 641cf198ec366c33d6504854*

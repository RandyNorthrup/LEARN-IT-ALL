---
id: lesson-021-026
title: Step 27
chapterId: chapter-21
order: 26
duration: 5
objectives:
  - Step 27
---

# Step 27

If you try entering the message `free money`, you'll notice it doesn't match your expression! This is because `\s` doesn't match the beginning or end of the text.

To match the beginning of the text, you can use the `^` anchor. This asserts that your pattern match starts at the beginning of the full string.

Replace your first `\s` character with a non-capturing group that matches `\s` or `^`.

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

1. Your `freeRegex` should use a non-capturing group.
2. Your `freeRegex` should use a non-capturing group to match `\s` or `^`.
3. Your `freeRegex` should match `it's free money time`.
4. Your `freeRegex` should match `free money time`.
5. Your `freeRegex` should not match `hands-free money time`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 642335220b7d830a69eb59fb*

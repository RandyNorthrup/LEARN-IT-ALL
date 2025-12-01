---
id: lesson-021-027
title: Step 28
chapterId: chapter-21
order: 27
duration: 5
objectives:
  - Step 28
---

# Step 28

You still aren't matching `free money` yet, because you need to match the end of the string as well.

Like the `^` anchor, you can use the `$` anchor to match the end of the string.

Update your regular expression to match either the end of the string or a space, like you did for the beginning of the string.

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

1. Your `freeRegex` should use a second non-capturing group.
2. Your `freeRegex` should use a non-capturing group to match `\s` or `$`.
3. Your `freeRegex` should match `it's free money time`.
4. Your `freeRegex` should match `free money time`.
5. Your `freeRegex` should match `it's free money`.
6. Your `freeRegex` should match `free money`.
7. Your `freeRegex` should not match `hands-free money time`.
8. Your `freeRegex` should not match `free money-management`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 642335d232d7690b2d67dbaf*

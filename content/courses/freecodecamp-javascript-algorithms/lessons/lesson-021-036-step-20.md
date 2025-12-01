---
id: lesson-021-036
title: Step 20
chapterId: chapter-21
order: 36
duration: 5
objectives:
  - Step 20
---

# Step 20

While this expression does match `1 hundred dollars`, it will not match `1  hundred  dollars`, or `10 dollars`.

Spam messages can and will find a way to exploit flaws in your detection. Time to improve your regex.

Replace the first literal space with the `\s*` expression. The `\s` character class matches whitespace, such as spaces, tabs, and new lines. The `*` quantifier means "match the previous character 0 or more times".

Replace the second literal space with `\s+`. The `+` quantifier means "match the previous character at least one time".

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

1. Your `dollarRegex` must not use literal spaces.
2. Your `dollarRegex` must allow any number of spaces before the dollar quantity, and one or more spaces after.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 66bb6467b4b7381178420970*

---
id: lesson-021-020
title: Step 21
chapterId: chapter-21
order: 20
duration: 5
objectives:
  - Step 21
---

# Step 21

One last thing with this expression. You don't actually need the match value from your capture group, so you can turn it into a <dfn>non-capturing group</dfn>. This will allow you to group the characters together without preserving the result.

To create a non-capturing group in a regular expression, you can add `?:` after the opening parenthesis of a group. For instance, `(?:a|b)` will match either `a` or `b`, but it will not capture the result.

Update your regular expression to use a non-capturing group.

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

1. Your `dollarRegex` should use `?:`.
2. Your `dollarRegex` should use a non-capturing group.
3. Your `(hundred|thousand|million|billion)` should be a non-capturing group.
4. Your `(hundred|thousand|million|billion)` group should still be optional.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 64221007887f38213fa57827*

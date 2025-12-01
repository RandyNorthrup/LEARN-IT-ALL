---
id: lesson-020-010
title: Step 10
chapterId: chapter-20
order: 10
duration: 5
objectives:
  - Step 10
---

# Step 10

Now it's time to implement the actual counting functionality. 

Instead of just logging the current count, you need to increment it and update the display.

Remove the `console.log`.

Check if the current first number inside the `.count` is already 10 (the text is `10/10`), and if so, do nothing.

If the number is less than 10, increment the current count by 1 and update the text of the `.count` element. For example, if the current count is 2, it should be incremented to 3 and the text for the `.count` element should be `3/10`.

## Starter Code

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Emoji Reactor</title>
  <link rel="stylesheet" href="./styles.css" />
</head>
<body>
  <main>

    <h1 class="title">How are you feeling today?</h1>

    <p class="description">
      Click on the buttons below to rate your emotions.
    </p>
    <div class="btn-container">
      <button id="happy-btn" class="emoji-btn" aria-label="Happy face emoji">
        <span role="img" aria-hidden="true">😊</span>
        <span class="count">0/10</span>
      </button>
    </div>
  </main>
  <script src="./script.js"></script>
</body>
</html>
```

## Hints

1. When the button is clicked, the count should increment from 0 to 1.
2. When the button is clicked multiple times, the count should increment properly.
3. When the count is already at 10, clicking should not increment it further.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/front-end-development-libraries/)*
*Original Challenge ID: 689b17e7e63b8e2c13839e98*

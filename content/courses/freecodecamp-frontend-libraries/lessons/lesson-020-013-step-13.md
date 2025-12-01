---
id: lesson-020-013
title: Step 13
chapterId: chapter-20
order: 13
duration: 5
objectives:
  - Step 13
---

# Step 13

You've probably noticed that your code is getting quite repetitive! There's a better way to handle multiple similar elements.

Instead of selecting each button individually, use `querySelectorAll(".emoji-btn")` to select all buttons with the class `emoji-btn` at once. Store the result in a variable called `btns`.

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
      <button
        id="confused-btn"
        class="emoji-btn"
        aria-label="Confused face emoji"
      >
        <span role="img" aria-hidden="true">😕</span>
        <span class="count">0/10</span>
      </button>
      <button id="sad-btn" class="emoji-btn" aria-label="Angry face emoji">
        <span role="img" aria-hidden="true">😠</span>
        <span class="count">0/10</span>
      </button>
      <button
        id="loving-btn"
        class="emoji-btn"
        aria-label="Loving face emoji"
      >
        <span role="img" aria-hidden="true">😍</span>
        <span class="count">0/10</span>
      </button>
    </div>
  </main>
  <script src="./script.js"></script>
</body>
</html>
```

## Hints

1. You should use `querySelectorAll` to select all emoji buttons.
2. You should store the result in a variable called `btns`.
3. The `btns` variable should contain all 4 emoji buttons.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/front-end-development-libraries/)*
*Original Challenge ID: 68a9fa1787009f3293b7ba7f*

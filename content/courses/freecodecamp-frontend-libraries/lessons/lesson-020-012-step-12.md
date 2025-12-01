---
id: lesson-020-012
title: Step 12
chapterId: chapter-20
order: 12
duration: 5
objectives:
  - Step 12
---

# Step 12

It's time to start working on the other buttons. The remaining `button` elements have been added for you in the HTML file.

For each new button (`#confused-btn`, `#sad-btn` and `#loving-btn`), select it using `querySelector` with its ID, then add a click event listener that calls `updateCount` with that button.

Use the variable names `confusedBtn`, `sadBtn`, `lovingBtn`.

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

1. You should create a variable named `confusedBtn`.
2. You should store the `#confused-btn` element in the `confusedBtn` variable.
3. You should create a variable named `sadBtn`.
4. You should store the `#sad-btn` element in the `sadBtn` variable.
5. You should create a variable named `lovingBtn`.
6. You should store the `#loving-btn` element in the `lovingBtn` variable.
7. The `#confused-btn` element should have a click event listener that calls `updateCount`.
8. The `#sad-btn` element should have a click event listener that calls `updateCount`.
9. The `#loving-btn` element should have a click event listener that calls `updateCount`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/front-end-development-libraries/)*
*Original Challenge ID: 68a9fa161498c3324ac06fe1*

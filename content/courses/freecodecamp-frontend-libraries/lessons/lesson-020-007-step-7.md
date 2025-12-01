---
id: lesson-020-007
title: Step 7
chapterId: chapter-20
order: 7
duration: 5
objectives:
  - Step 7
---

# Step 7

Now you need to add an event listener on the `happyBtn` element.

Write the event listener and its callback so that when the button is clicked the app will log to the console `Button clicked!`.

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

1. When the `happyBtn` is clicked, `Button clicked!` should be logged to the console.
2. assert.sameDeepOrderedMembers(spy.calls, [["Button clicked!"]]);

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/front-end-development-libraries/)*
*Original Challenge ID: 6899c30b1d26094e11170c92*

---
id: lesson-020-006
title: Step 6
chapterId: chapter-20
order: 6
duration: 5
objectives:
  - Step 6
---

# Step 6

Now, in the JavaScript file, create an `happyBtn` variable.

Use `querySelector` to store a reference to the `#happy-btn` element in the `happyBtn` variable.

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

1. You should have a variable named `happyBtn`.
2. The `happyBtn` variable should hold a reference to the `#happy-btn` element.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/front-end-development-libraries/)*
*Original Challenge ID: 6899b84e392df30ae370985e*

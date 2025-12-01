---
id: lesson-020-004
title: Step 4
chapterId: chapter-20
order: 4
duration: 5
objectives:
  - Step 4
---

# Step 4

Inside the `button` element, create a `span` element that contains `😊`

Give to the `span` element a `role` attribute with a value of `img` and an `aria-hidden` attribute with a value of `true`.

Then, create a second `span` element with a `class` of `count` containing the text `0/10`.

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
--fcc-editable-region--
      <button id="happy-btn" class="emoji-btn" aria-label="Happy face emoji">
        
      </button>
--fcc-editable-region--
    </div>
  </main>
</body>
</html>
```

## Hints

1. Inside the `button` element there should be two `span` elements.
2. The first `span` element should have a text content of `😊`.
3. The first `span` element should have a `role` attribute with value of `img`.
4. The first `span` element should have an `aria-hidden` attribute with value of `true`.
5. The second `span` element should have a `class` attribute with value of `count`.
6. The second `span` element should have a text content of `0/10`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/front-end-development-libraries/)*
*Original Challenge ID: 6899b593d232e07617f74055*

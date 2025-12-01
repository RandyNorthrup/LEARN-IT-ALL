---
id: lesson-008-016
title: Step 16
chapterId: chapter-08
order: 16
duration: 5
objectives:
  - Step 16
---

# Step 16

To give the markers different colors, you will need to add a unique class to each one. Multiple classes can be added to an element by listing them in the `class` attribute and separating them with a space. For example, the following adds both the `animal` and `dog` classes to a `div` element.

```html
<div class="animal dog">
```

If you add multiple classes to an HTML element, the styles of the first classes you list may be overridden by later classes.

To begin, add the class `one` to the first marker `div` element.

## Starter Code

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Colored Markers</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <h1>CSS Color Markers</h1>
    <div class="container">
--fcc-editable-region--
      <div class="marker">
      </div>
      <div class="marker">
      </div>
      <div class="marker">
      </div>
--fcc-editable-region--
    </div>
  </body>
</html>
```

## Hints

1. You should add the class `one` to the first marker `div` element.
2. Your first marker `div` should have the classes `marker` and `one`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 61764c602bee6974e7790f35*

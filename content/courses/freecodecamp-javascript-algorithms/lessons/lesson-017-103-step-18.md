---
id: lesson-017-103
title: Step 18
chapterId: chapter-17
order: 103
duration: 5
objectives:
  - Step 18
---

# Step 18

In earlier projects you learned about the `setAttribute` method. Another way to update an attribute in JavaScript is to use the following syntax:

```js
el.attribute = value;
```

The property names for hyphenated HTML attribute values, such as `aria-label`, follow camel case, becoming `ariaLabel`.

```js
el.ariaLabel = "Aria Label Value";
```

Set the `aria-label` attribute for the `input` element to the same value as the `id` attribute.

## Starter Code

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="./styles.css" />
    <title>Functional Programming Spreadsheet</title>
  </head>
  <body>
    <div id="container">
      <div></div>
    </div>
    <script src="./script.js"></script>
  </body>
</html>
```

## Hints

1. You should have an `input.ariaLabel`.
2. You should give `input.ariaLabel` the same value as `input.id`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 65ae458e23954c3469e0c209*

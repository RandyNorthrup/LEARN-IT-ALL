---
id: lesson-014-059
title: Step 5
chapterId: chapter-14
order: 59
duration: 5
objectives:
  - Step 5
---

# Step 5

Nest a `link` element within the `head` element. Give it a `rel` attribute with a value of `stylesheet` and an `href` attribute with a value of `styles.css`.

## Starter Code

```html
<!DOCTYPE html>
<html lang="en">
--fcc-editable-region--
  <head>
    <meta charset="UTF-8">
    <title>Registration Form</title>
  </head>
--fcc-editable-region--
  <body>
  </body>
</html>
```

## Hints

1. Your code should have a `link` element.
2. You should not change your existing `head` tags. Make sure you did not delete the closing tag.
3. You should have one `link` element.
4. Your `link` element should be a void element, it should not have an end tag `</link>`.
5. Your `link` element should be inside your `head` element.
6. const headElement = document.createElement("head");
headElement.innerHTML = headElementContent;
assert.isNotNull(headElement.querySelector('link'));
7. Your `link` element should have a `rel` attribute with the value `stylesheet`.
8. Your `link` element should have an `href` attribute with the value `styles.css`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 62cc5b1779e4d313466f73c5*

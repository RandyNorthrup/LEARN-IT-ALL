---
id: lesson-006-013
title: Step 15
chapterId: chapter-06
order: 13
duration: 5
objectives:
  - Step 15
---

# Step 15

Now that you have the CSS in the `styles.css` file, go ahead and remove the `style` element and all its content. Once it is removed, the text that was centered will shift back to the left.

## Starter Code

```html
<!DOCTYPE html>
<html lang="en">
--fcc-editable-region--
  <head>
    <meta charset="utf-8" />
    <title>Cafe Menu</title>
    <style>
      h1, h2, p {
        text-align: center;
      }
    </style>
  </head>
--fcc-editable-region--
  <body>
    <main>
      <h1>CAMPER CAFE</h1>
      <p>Est. 2020</p>
      <section>
        <h2>Coffee</h2>
      </section>
    </main>
  </body>
</html>
```

## Hints

1. You should not have any `style` tags in your code.
2. You should not have any CSS selectors in your HTML file.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5f3477ae8466a9a3d2cc953c*

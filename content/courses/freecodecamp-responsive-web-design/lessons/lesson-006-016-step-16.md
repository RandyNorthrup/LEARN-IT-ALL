---
id: lesson-006-016
title: Step 16
chapterId: chapter-06
order: 16
duration: 5
objectives:
  - Step 16
---

# Step 16

Now you need to link the `styles.css` file, so the styles will be applied again. Inside the `head` element, add a `link` element. Give it a `rel` attribute with the value of `"stylesheet"` and an `href` attribute with the value of `"styles.css"`.

Note that the `link` element is a void element.

## Starter Code

```html
<!DOCTYPE html>
<html lang="en">
--fcc-editable-region--
  <head>
    <meta charset="utf-8" />
    <title>Cafe Menu</title>
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

1. Your code should have a `link` element.
2. The `link` element is a void element, it should not have an end tag `</link>`.
3. You should not change your existing `head` element. Make sure you did not delete the closing tag.
4. You should have one `link` element.
5. Your `link` element should be within your `head` element.
6. Your `link` element should have a `rel` attribute with the value `stylesheet`.
7. Your `link` element should have an `href` attribute with the value `styles.css`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5f3477cb2e27333b1ab2b955*

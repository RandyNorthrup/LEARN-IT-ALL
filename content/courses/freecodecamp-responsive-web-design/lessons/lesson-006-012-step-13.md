---
id: lesson-006-012
title: Step 13
chapterId: chapter-06
order: 12
duration: 5
objectives:
  - Step 13
---

# Step 13

You now have three type selectors with the same styling. You can add the same group of styles to many elements by creating a list of selectors. Each selector is separated with commas like this:

```css
selector1, selector2 {
  property: value;
}
```

Delete the three existing type selectors and replace them with one selector list that centers the text for the `h1`, `h2`, and `p` elements.

## Starter Code

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Cafe Menu</title>
--fcc-editable-region--
    <style>
      h1 {
        text-align: center;
      }
      h2 {
        text-align: center;
      }
      p {
        text-align: center;
      }
    </style>
--fcc-editable-region--
  </head>
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

1. You should use a single type selector for all three elements, `h1, h2, p`. Be sure to use that order.
2. You should only have one selector in your `style` element.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5f3477ae34c1239cafe128be*

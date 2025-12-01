---
id: lesson-006-014
title: Step 12
chapterId: chapter-06
order: 14
duration: 5
objectives:
  - Step 12
---

# Step 12

In the previous step, you used a <dfn>type selector</dfn> to style the `h1` element. Center the content of the `h2` and the `p` elements by adding a new type selector for each one to the existing `style` element.

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

1. You should not change the existing `h1` selector.
2. You should not add a new `style` tag. Add the new CSS rules to the existing `style` tag.
3. You should add a new `h2` selector.
4. You should add a new `p` selector.
5. Your `h1` element should have a `text-align` of `center`.
6. Your `h2` element should have a `text-align` of `center`.
7. Your `p` element should have a `text-align` of `center`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5f3477ae9675db8bb7655b30*

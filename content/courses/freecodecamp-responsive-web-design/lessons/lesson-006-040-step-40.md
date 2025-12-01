---
id: lesson-006-040
title: Step 40
chapterId: chapter-06
order: 40
duration: 5
objectives:
  - Step 40
---

# Step 40

That worked, but there is still a little space on the right of the price.

You could keep trying various percentages for the widths. Instead, use the backspace key to move the `p` element with the class `price` next to the `p` element with the class `flavor` so that they are on the same line in the editor. Make sure there is no space between the two elements.

## Starter Code

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Cafe Menu</title>
    <link href="styles.css" rel="stylesheet"/>
  </head>
  <body>
    <div class="menu">
      <main>
        <h1>CAMPER CAFE</h1>
        <p>Est. 2020</p>
        <section>
          <h2>Coffee</h2>
          <article class="item">
--fcc-editable-region--
            <p class="flavor">French Vanilla</p>
            <p class="price">3.00</p>
--fcc-editable-region--
          </article>
          <article>
            <p>Caramel Macchiato</p>
            <p>3.75</p>
          </article>
          <article>
            <p>Pumpkin Spice</p>
            <p>3.50</p>
          </article>
          <article>
            <p>Hazelnut</p>
            <p>4.00</p>
          </article>
          <article>
            <p>Mocha</p>
            <p>4.50</p>
          </article>
        </section>
      </main>
    </div>
  </body>
</html>
```

## Hints

1. Your `p` elements should not have any space between them.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5f3cade9fa77275d9f4efe62*

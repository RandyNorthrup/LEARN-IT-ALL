---
id: lesson-006-090
title: Step 50
chapterId: chapter-06
order: 90
duration: 5
objectives:
  - Step 50
---

# Step 50

For the two `p` elements you just added, add `dessert` as the value of the first `p` element's `class` attribute and the value `price` as the second `p` element's `class` attribute.

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
            <p class="flavor">French Vanilla</p><p class="price">3.00</p>
          </article>
          <article class="item">
            <p class="flavor">Caramel Macchiato</p><p class="price">3.75</p>
          </article>
          <article class="item">
            <p class="flavor">Pumpkin Spice</p><p class="price">3.50</p>
          </article>
          <article class="item">
            <p class="flavor">Hazelnut</p><p class="price">4.00</p>
          </article>
          <article class="item">
            <p class="flavor">Mocha</p><p class="price">4.50</p>
          </article>
        </section>
        <section>
          <h2>Desserts</h2>
          <article class="item">
--fcc-editable-region--
            <p>Donut</p><p>1.50</p>
--fcc-editable-region--
          </article>
        </section>
      </main>
    </div>
  </body>
</html>
```

## Hints

1. You should have one `p` element with the `dessert` class.
2. Your `p` element with the text `Donut` should have the `dessert` class.
3. Your `p` element with the text `1.50` should have the `price` class.
4. You should not have any spaces between your `p` elements.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5f7b87422a560036fd03ccff*

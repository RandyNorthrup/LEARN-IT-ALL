---
id: lesson-006-049
title: Step 48
chapterId: chapter-06
order: 49
duration: 5
objectives:
  - Step 48
---

# Step 48

Add an empty `article` element under the `Desserts` heading. Give it a `class` attribute with the value `item`.

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
--fcc-editable-region--
          <h2>Desserts</h2>
--fcc-editable-region--
        </section>
      </main>
    </div>
  </body>
</html>
```

## Hints

1. You should not change your existing `h2` element.
2. Your `article` element should be below your `h2` element.
3. Your new `article` element should have the `item` class.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5f3ef6e0819d4f23ca7285e6*

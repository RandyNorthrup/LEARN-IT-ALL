---
id: lesson-006-079
title: Step 89
chapterId: chapter-06
order: 79
duration: 5
objectives:
  - Step 89
---

# Step 89

The image you added is not centered horizontally like the `Coffee` heading above it. `img` elements are "like" inline elements.

To make the image behave like block-level elements such as headings, create an `img` type selector. Set the `display` property to `block`, and use `margin-left` and `margin-right` properties to center it horizontally.

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
        <p class="established">Est. 2020</p>
        <hr>
        <section>
          <h2>Coffee</h2>
          <img src="https://cdn.freecodecamp.org/curriculum/css-cafe/coffee.jpg" alt="coffee icon"/>
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
            <p class="dessert">Donut</p><p class="price">1.50</p>
          </article>
          <article class="item">
            <p class="dessert">Cherry Pie</p><p class="price">2.75</p>
          </article>
          <article class="item">
            <p class="dessert">Cheesecake</p><p class="price">3.00</p>
          </article>
          <article class="item">
            <p class="dessert">Cinnamon Roll</p><p class="price">2.50</p>
          </article>
        </section>
      </main>
      <hr class="bottom-line">
      <footer>
        <p>
          <a href="https://www.freecodecamp.org" target="_blank">Visit our website</a>
        </p>
        <p class="address">123 Free Code Camp Drive</p>
      </footer>
    </div>
  </body>
</html>
```

## Hints

1. You should use an `img` selector.
2. You should set the `display` property to `block`.
3. You should set the `margin-left` property to `auto`.
4. You should set the `margin-right` property to `auto`.
5. Your `img` element should have a `display` of `block`.
6. Your `img` element should have a `margin-left` and `margin-right` of `auto`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5f475bb508746c16c9431d42*

---
id: lesson-006-063
title: Step 73
chapterId: chapter-06
order: 63
duration: 5
objectives:
  - Step 73
---

# Step 73

Focusing on the menu items and prices, there is a fairly large gap between each line.

Use the existing selector that targets all the `p` elements nested in elements with the class named `item` and set their top and bottom margin to `5px`.

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
      <hr>
      <footer>
        <p>
          <a href="https://www.freecodecamp.org" target="_blank">Visit our website</a>
        </p>
        <p>123 Free Code Camp Drive</p>
      </footer>
    </div>
  </body>
</html>
```

## Hints

1. You should set the `margin-top` property to `5px`.
2. You should set the `margin-bottom` property to `5px`.
3. You should use the existing `.item p` selector.
4. Your `p` elements nested in your `.item` elements should have a `margin-top` of `5px`.
5. Your `p` elements nested in your `.item` elements should have a `margin-bottom` of `5px`.
6. Your `p` elements nested in your `.item` elements should not have a `margin-left` set.
7. Your `p` elements nested in your `.item` elements should not have a `margin-right` set.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5f45a276c093334f0f6e9df4*

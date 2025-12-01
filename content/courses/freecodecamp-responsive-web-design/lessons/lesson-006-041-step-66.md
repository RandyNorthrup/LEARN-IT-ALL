---
id: lesson-006-041
title: Step 66
chapterId: chapter-06
order: 41
duration: 5
objectives:
  - Step 66
---

# Step 66

You can use an `hr` element to display a divider between sections of different content.

```html
<section>
  <h2>Things cats love</h2>
  <hr>
  <p>Cats love lasagna.</p>
</section>
```

First, add an `hr` element between the `p` element with the class `established` and the first `section` element.

Note that the `hr` element is a void element.

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
--fcc-editable-region--
      <main>
        <h1>CAMPER CAFE</h1>
        <p class="established">Est. 2020</p>
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
--fcc-editable-region--
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

1. You should add an `hr` element.
2. The `hr` element is a void element, it should not have an end tag `</hr>`.
3. You should not change your existing `p` element with the class `established`.
4. You should not change your existing `main` element.
5. Your `hr` element should be between your `p` element and your `section` element.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5f3ef6e01f288a026d709587*

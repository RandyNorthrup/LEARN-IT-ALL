---
id: lesson-006-075
title: Step 88
chapterId: chapter-06
order: 75
duration: 5
objectives:
  - Step 88
---

# Step 88

The menu looks good, but other than the coffee beans background image, it is mainly just text.

Under the `Coffee` heading, add an image using the url `https://cdn.freecodecamp.org/curriculum/css-cafe/coffee.jpg`. Give the image an `alt` value of `coffee icon`.

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
--fcc-editable-region--
          <h2>Coffee</h2>
--fcc-editable-region--
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

1. You should have an `<img>` tag.
2. The `img` element is a void element, it should not have an end tag `</img>`.
3. Your `img` element should have a `src` attribute, with the value `"https://cdn.freecodecamp.org/curriculum/css-cafe/coffee.jpg"`.
4. Your `img` element should have an `alt` attribute, with the value `"coffee icon"`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5f46e8284aae155c83015dee*

---
id: lesson-006-051
title: Step 64
chapterId: chapter-06
order: 51
duration: 5
objectives:
  - Step 64
---

# Step 64

Inside the `footer`, add a `p` element. Then, nest an anchor (`a`) element in the `p` that links to `https://www.freecodecamp.org` and has the text `Visit our website`.

Make sure that the link opens in a new tab by adding a `target` attribute with the value `_blank`.

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
        
      </footer>
--fcc-editable-region--
    </div>
  </body>
</html>
```

## Hints

1. You should not modify the existing `footer` element.
2. Your new `p` element should be nested within your `footer` element. You should have exactly one `p` element.
3. Your new `a` element should be nested within your new `p` element. You should have exactly one `a` element.
4. Your new `a` element should have the text `Visit our website`.
5. Your new `a` element should link to `https://www.freecodecamp.org`. Remember that `a` elements use the `href` attribute to create a link.
6. Your new `a` element should have the `target` attribute set to `_blank`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5f3ef6e0a81099d9a697b550*

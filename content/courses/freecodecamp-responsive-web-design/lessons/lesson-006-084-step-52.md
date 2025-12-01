---
id: lesson-006-084
title: Step 52
chapterId: chapter-06
order: 84
duration: 5
objectives:
  - Step 52
---

# Step 52

Below the dessert you just added, add the rest of the desserts and prices using three more `article` elements, each with two nested `p` elements. Each element should have the correct dessert and price text, and all of them should have the correct classes.

```md
Cherry Pie 2.75
Cheesecake 3.00
Cinnamon Roll 2.50
```

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
--fcc-editable-region--
          <article class="item">
            <p class="dessert">Donut</p><p class="price">1.50</p>
          </article>
--fcc-editable-region--
        </section>
      </main>
    </div>
  </body>
</html>
```

## Hints

1. You should have four `article` elements in your second `section`.
2. You should have four `.dessert` elements.
3. You should have four new `.price` elements.
4. Your `section` element should have eight `p` elements.
5. assert.lengthOf(paragraphs,8);
6. Your `.dessert` elements should have the text `Donut`, `Cherry Pie`, `Cheesecake`, and `Cinnamon Roll`.
7. Your new `.price` elements should have the text `1.50`, `2.75`, `3.00`, and `2.50`.
8. You should not have any spaces between your `p` elements.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5f716bee5838c354c728a7c5*

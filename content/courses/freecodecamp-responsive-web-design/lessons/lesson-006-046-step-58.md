---
id: lesson-006-046
title: Step 58
chapterId: chapter-06
order: 46
duration: 5
objectives:
  - Step 58
---

# Step 58

It is a bit boring for all the text to have the same `font-family`. You can still have the majority of the text `sans-serif` and make just the `h1` and `h2` elements different using a different selector.

Style both the `h1` and the `h2` elements using a single selector so that these elements' text use `Impact` font.

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
    </div>
  </body>
</html>
```

## Hints

1. You should use an `h1, h2` selector.
2. You should set the `font-family` to `Impact`.
3. Your `h1` element should have a `font-family` of `Impact`.
4. const headingFont = window.getComputedStyle(h1Element)?.getPropertyValue('font-family');
assert.match(headingFont,/impact/i);
5. Your `h2` element should have a `font-family` of `Impact`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5f3ef6e056bdde6ae6892ba2*

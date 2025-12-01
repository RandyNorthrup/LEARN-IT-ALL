---
id: lesson-006-086
title: Step 44
chapterId: chapter-06
order: 86
duration: 5
objectives:
  - Step 44
---

# Step 44

To complete the styling, add the applicable class names `flavor` and `price` to all the remaining `p` elements.

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
--fcc-editable-region--
          <article class="item">
            <p>Caramel Macchiato</p><p>3.75</p>
          </article>
          <article class="item">
            <p>Pumpkin Spice</p><p>3.50</p>
          </article>
          <article class="item">
            <p>Hazelnut</p><p>4.00</p>
          </article>
          <article class="item">
            <p>Mocha</p><p>4.50</p>
          </article>
--fcc-editable-region--
        </section>
      </main>
    </div>
  </body>
</html>
```

## Hints

1. You should have five `.flavor` elements.
2. You should have five `.price` elements.
3. Your `.flavor` elements should be your `p` elements with the text `French Vanilla`, `Caramel Macchiato`, `Pumpkin Spice`, `Hazelnut`, and `Mocha`.
4. Your `.price` elements should be your `p` elements with the text `3.00`, `3.75`, `3.50`, `4.00`, and `4.50`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5f7692f7c5b3ce22a57788b6*

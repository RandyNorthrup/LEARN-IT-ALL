---
id: lesson-006-034
title: Step 37
chapterId: chapter-06
order: 34
duration: 5
objectives:
  - Step 37
---

# Step 37

The `p` elements are nested in an `article` element with the class attribute of `item`. You can style all the `p` elements nested anywhere in elements with a class named `item` like this:

```css
.item p { }
```

Using the above selector, add a `display` property with value `inline-block` so the `p` elements behave more like inline elements.

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
            <p class="flavor">French Vanilla</p>
            <p class="price">3.00</p>
          </article>
          <article>
            <p>Caramel Macchiato</p>
            <p>3.75</p>
          </article>
          <article>
            <p>Pumpkin Spice</p>
            <p>3.50</p>
          </article>
          <article>
            <p>Hazelnut</p>
            <p>4.00</p>
          </article>
          <article>
            <p>Mocha</p>
            <p>4.50</p>
          </article>
        </section>
      </main>
    </div>
  </body>
</html>
```

## Hints

1. You should use the `.item p` selector.
2. You should set the `display` property to `inline-block`.
3. Your `.item p` selector should set the `display` property to `inline-block`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5f3c866dbf362f99b9a0c6d0*

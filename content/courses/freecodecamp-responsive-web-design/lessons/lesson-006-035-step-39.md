---
id: lesson-006-035
title: Step 39
chapterId: chapter-06
order: 35
duration: 5
objectives:
  - Step 39
---

# Step 39

Well, that did not work. Styling the `p` elements as `inline-block` and placing them on separate lines creates an extra space to the right of the first `p` element, causing the second one to shift to the next line.

One way to fix that is to make each `p` element's width slightly less than `50%`. So, change the `width` value to `49%` for each class to see what happens.

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

1. You should set the `width` property to `49%` in your `.flavor` selector.
2. You should set the `width` property to `49%` in your `.price` selector.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5f3c866dd0d0275f01d4d847*

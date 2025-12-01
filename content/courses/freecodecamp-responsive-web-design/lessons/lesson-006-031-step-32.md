---
id: lesson-006-031
title: Step 32
chapterId: chapter-06
order: 31
duration: 5
objectives:
  - Step 32
---

# Step 32

The flavors and prices are currently stacked on top of each other and centered with their respective `p` elements. It would be nice if the flavor was on the left and the price was on the right.

Add the class name `flavor` to the `French Vanilla` `p` element.

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
          <article>
--fcc-editable-region--
            <p>French Vanilla</p>
            <p>3.00</p>
--fcc-editable-region--
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

1. You should add the `flavor` class to your `p` element.
2. You should only have one element with the `flavor` class.
3. Your `flavor` class should be on the `p` element with the text `French Vanilla`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5f3c866d28d7ad0de6470505*

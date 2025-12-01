---
id: lesson-006-036
title: Step 36
chapterId: chapter-06
order: 36
duration: 5
objectives:
  - Step 36
---

# Step 36

That is kind of what you want, but now it would be nice if the flavor and price were on the same line. `p` elements are <dfn>block-level</dfn> elements, so they take up the entire width of their parent element.

To get them on the same line, you need to apply some styling to the `p` elements so they behave more like <dfn>inline</dfn> elements.

To do that, start by adding a `class` attribute with the value `item` to the first `article` element under the `Coffee` heading.

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
--fcc-editable-region--
          <h2>Coffee</h2>
          <article>
            <p class="flavor">French Vanilla</p>
            <p class="price">3.00</p>
          </article>
--fcc-editable-region--
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

1. You should apply the `item` class to your `article` element.
2. You should only have one `item` class element.
3. Your first `article` element should have the `item` class.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5f3c866de7a5b784048f94b1*

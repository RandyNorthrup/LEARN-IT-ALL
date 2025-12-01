---
id: lesson-006-032
title: Step 31
chapterId: chapter-06
order: 32
duration: 5
objectives:
  - Step 31
---

# Step 31

Starting below the existing coffee/price pair, add the following coffee and prices using `article` elements with two nested `p` elements inside each:

```md
Caramel Macchiato 3.75
Pumpkin Spice 3.50
Hazelnut 4.00
Mocha 4.50
```

As before, the first `p` element's text should contain the coffee flavor and the second `p` element's text should contain the price.

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
--fcc-editable-region--
          <article>
            <p>French Vanilla</p>
            <p>3.00</p>
          </article>
--fcc-editable-region--
        </section>
      </main>
    </div>
  </body>
</html>
```

## Hints

1. You should have five `article` elements.
2. Each `article` element should have two `p` elements.
3. Your first `article` element should have `p` elements with the text `French Vanilla` and `3.00`.
4. Your second `article` element should have `p` elements with the text `Caramel Macchiato` and `3.75`.
5. Your third `article` element should have `p` elements with the text `Pumpkin Spice` and `3.50`.
6. Your fourth `article` element should have `p` elements with the text `Hazelnut` and `4.00`.
7. Your fifth `article` element should have `p` elements with the text `Mocha` and `4.50`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5f3c866d5414453fc2d7b480*

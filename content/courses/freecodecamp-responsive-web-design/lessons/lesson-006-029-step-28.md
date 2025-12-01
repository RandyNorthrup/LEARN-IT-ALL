---
id: lesson-006-029
title: Step 28
chapterId: chapter-06
order: 29
duration: 5
objectives:
  - Step 28
---

# Step 28

Since the cafe's main product for sale is coffee, you could use an image of coffee beans as the page background.

Remove the comment and its contents inside the `body` type selector. After that, add a `background-image` property and set its value to `url(https://cdn.freecodecamp.org/curriculum/css-cafe/beans.jpg)`.

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
        </section>
      </main>
    </div>
  </body>
</html>
```

## Hints

1. You should remove the commented out `background-color` property.
2. Your `body` selector should not have any comments.
3. You should set the `background-image` property to `url(https://cdn.freecodecamp.org/curriculum/css-cafe/beans.jpg)`.
4. Your `body` element should have the coffee beans background image.
5. assert(bodyBackground === `url("https://cdn.freecodecamp.org/curriculum/css-cafe/beans.jpg")`);

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5f35e5c44359872a137bd98f*

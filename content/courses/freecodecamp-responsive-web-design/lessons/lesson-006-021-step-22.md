---
id: lesson-006-021
title: Step 22
chapterId: chapter-06
order: 21
duration: 5
objectives:
  - Step 22
---

# Step 22

Comments in CSS look like this:

```css
/* comment here */
```

In your style sheet, comment out the line containing the `background-color` property and value, so you can see the effect of only styling the `#menu` element. This will make the background white again.

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
    <div id="menu">
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

1. You should comment out the `background-color: burlywood;` line in your CSS.
2. Your `body` should have a white background.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5f356ed60a5decd94ab66986*

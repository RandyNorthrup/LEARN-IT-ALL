---
id: lesson-006-015
title: Step 14
chapterId: chapter-06
order: 15
duration: 5
objectives:
  - Step 14
---

# Step 14

You have styled three elements by writing CSS inside the `style` tags. This works, but since there will be many more styles, it's best to put all the styles in a separate file and link to it.

A separate `styles.css` file has been created for you. You can switch between files with the tabs at the top of the editor.

Start by rewriting the styles you have created into the `styles.css` file. Make sure you exclude the opening and closing `style` tags.

## Starter Code

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Cafe Menu</title>
    <style>
      h1, h2, p {
        text-align: center;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>CAMPER CAFE</h1>
      <p>Est. 2020</p>
      <section>
        <h2>Coffee</h2>
      </section>
    </main>
  </body>
</html>
```

## Hints

1. Your `styles.css` file should have the `h1, h2, p` type selector.
2. Your code should not contain the `<style>` tags.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5f3477aefa51bfc29327200b*

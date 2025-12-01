---
id: lesson-006-022
title: Step 26
chapterId: chapter-06
order: 22
duration: 5
objectives:
  - Step 26
---

# Step 26

So far you have been using type and id selectors to style elements. However, it is more common to use a different selector to style your elements. 

A <dfn>class selector</dfn> is defined by a name with a dot directly in front of it, like this:

```css
.class-name {
  styles
}
```

Change the existing `#menu` selector into a class selector by replacing `#menu` with a class named `.menu`.

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

1. You should have a `.menu` class selector.
2. You should not have a `#menu` selector.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5f356ed6199b0cdef1d2be8f*

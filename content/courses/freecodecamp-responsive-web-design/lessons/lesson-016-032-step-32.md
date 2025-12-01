---
id: lesson-016-032
title: Step 32
chapterId: chapter-16
order: 32
duration: 5
objectives:
  - Step 32
---

# Step 32

Logical operators can be used to construct more complex media queries. The `and` logical operator is used to query two media conditions.

For example, a media query that targets a display width between 500px and 1000px would be:

```css
@media (min-width: 500px) and (max-width: 1000px){

}
```

Add another `@media` rule to apply if the browser window is wider than `769px` but smaller than `1199px`.

## Starter Code

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Piano</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="./styles.css">
  </head>
  <body>
    <div id="piano">
      <img class="logo" src="https://cdn.freecodecamp.org/platform/universal/fcc_primary.svg" alt="freeCodeCamp Logo" />
      <div class="keys">
        <div class="key"></div>
        <div class="key black--key"></div>
        <div class="key black--key"></div>
        <div class="key"></div>
        <div class="key black--key"></div>
        <div class="key black--key"></div>
        <div class="key black--key"></div>

        <div class="key"></div>
        <div class="key black--key"></div>
        <div class="key black--key"></div>
        <div class="key"></div>
        <div class="key black--key"></div>
        <div class="key black--key"></div>
        <div class="key black--key"></div>

        <div class="key"></div>
        <div class="key black--key"></div>
        <div class="key black--key"></div>
        <div class="key"></div>
        <div class="key black--key"></div>
        <div class="key black--key"></div>
        <div class="key black--key"></div>
      </div>
    </div>
  </body>
</html>
```

## Hints

1. You should add a new `@media` query.
2. Your `@media` query should have a `min-width` of `769px` and a `max-width` of `1199px`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 612ec19d5268da7074941f84*

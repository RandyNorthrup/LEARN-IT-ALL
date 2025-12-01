---
id: lesson-003-003
title: Add Rows with grid-template-rows
chapterId: chapter-03
order: 3
duration: 5
objectives:
  - Add Rows with grid-template-rows
---

# Add Rows with grid-template-rows

The grid you created in the last challenge will set the number of rows automatically. To adjust the rows manually, use the `grid-template-rows` property in the same way you used `grid-template-columns` in the previous challenge.

## Instructions

Add two rows to the grid that are `50px` tall each.

## Starter Code

```html
<style>
  .d1 {
    background: LightSkyBlue;
  }
  .d2 {
    background: LightSalmon;
  }
  .d3 {
    background: PaleTurquoise;
  }
  .d4 {
    background: LightPink;
  }
  .d5 {
    background: PaleGreen;
  }

  .container {
    font-size: 40px;
    width: 100%;
    background: LightGray;
    display: grid;
    grid-template-columns: 100px 100px 100px;
    /* Only change code below this line */

    
    /* Only change code above this line */
  }
</style>

<div class="container">
  <div class="d1">1</div>
  <div class="d2">2</div>
  <div class="d3">3</div>
  <div class="d4">4</div>
  <div class="d5">5</div>
</div>
```

## Hints

1. `container` class should have a `grid-template-rows` property with two units of `50px`.

## Solution

```html
```html
<style>
  .container {
    grid-template-rows: 50px 50px;
  }
</style>
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5a9036e138fddaf9a66b5d33*

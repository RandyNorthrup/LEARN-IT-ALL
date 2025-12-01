---
id: lesson-003-005
title: Create a Column Gap Using grid-column-gap
chapterId: chapter-03
order: 5
duration: 5
objectives:
  - Create a Column Gap Using grid-column-gap
---

# Create a Column Gap Using grid-column-gap

So far in the grids you have created, the columns have all been tight up against each other. Sometimes you want a gap in between the columns. To add a gap between the columns, use the `grid-column-gap` property like this:

```css
grid-column-gap: 10px;
```

This creates 10px of empty space between all of our columns.

## Instructions

Give the columns in the grid a `20px` gap.

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
    min-height: 300px;
    width: 100%;
    background: LightGray;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
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

1. `container` class should have a `grid-column-gap` property that has the value of `20px`.

## Solution

```html
```html
<style>
  .container {
    grid-column-gap: 20px;
  }
</style>
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5a9036ee38fddaf9a66b5d35*

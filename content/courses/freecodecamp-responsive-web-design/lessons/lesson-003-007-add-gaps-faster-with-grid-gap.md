---
id: lesson-003-007
title: Add Gaps Faster with grid-gap
chapterId: chapter-03
order: 7
duration: 5
objectives:
  - Add Gaps Faster with grid-gap
---

# Add Gaps Faster with grid-gap

`grid-gap` is a shorthand property for `grid-row-gap` and `grid-column-gap` from the previous two challenges that's more convenient to use. If `grid-gap` has one value, it will create a gap between all rows and columns. However, if there are two values, it will use the first one to set the gap between the rows and the second value for the columns.

## Instructions

Use `grid-gap` to introduce a `10px` gap between the rows and `20px` gap between the columns.

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

1. `container` class should have a `grid-gap` property that introduces a `10px` gap between the rows and a `20px` gap between the columns.

## Solution

```html
```html
<style>
  .container {
    grid-gap: 10px 20px;
  }
</style>
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5a9036ee38fddaf9a66b5d37*

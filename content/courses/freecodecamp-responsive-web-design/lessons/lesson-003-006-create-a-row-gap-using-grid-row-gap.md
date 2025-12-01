---
id: lesson-003-006
title: Create a Row Gap using grid-row-gap
chapterId: chapter-03
order: 6
duration: 5
objectives:
  - Create a Row Gap using grid-row-gap
---

# Create a Row Gap using grid-row-gap

You can add a gap in between the rows of a grid using `grid-row-gap` in the same way that you added a gap in between columns in the previous challenge.

## Instructions

Create a gap for the rows that is `5px` tall.

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

1. `container` class should have a `grid-row-gap` property that has the value of `5px`.

## Solution

```html
```html
<style>
  .container {
    grid-row-gap: 5px;
  }
</style>
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5a9036ee38fddaf9a66b5d36*

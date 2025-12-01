---
id: lesson-003-013
title: Align All Items Vertically using align-items
chapterId: chapter-03
order: 13
duration: 5
objectives:
  - Align All Items Vertically using align-items
---

# Align All Items Vertically using align-items

Using the `align-items` property on a grid container will set the vertical alignment for all the items in our grid.

## Instructions

Use it now to move all the items to the end of each cell.

## Starter Code

```html
<style>
  .item1 {
    background: LightSkyBlue;
  }
  .item2 {
    background: LightSalmon;
  }
  .item3 {
    background: PaleTurquoise;
  }
  .item4 {
    background: LightPink;
  }
  .item5 {
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
    grid-gap: 10px;
    /* Only change code below this line */

    
    /* Only change code above this line */
  }
</style>

<div class="container">
  <div class="item1">1</div>
  <div class="item2">2</div>
  <div class="item3">3</div>
  <div class="item4">4</div>
  <div class="item5">5</div>
</div>
```

## Hints

1. `container` class should have a `align-items` property that has the value of `end`.

## Solution

```html
```html
<style>
  .container {
    align-items: end;
  }
</style>
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5a94fdf869fb03452672e45b*

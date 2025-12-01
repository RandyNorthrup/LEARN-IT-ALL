---
id: lesson-003-010
title: Align an Item Horizontally using justify-self
chapterId: chapter-03
order: 10
duration: 5
objectives:
  - Align an Item Horizontally using justify-self
---

# Align an Item Horizontally using justify-self

In CSS Grid, the content of each item is located in a box which is referred to as a <dfn>cell</dfn>. You can align the content's position within its cell horizontally using the `justify-self` property on a grid item. By default, this property has a value of `stretch`, which will make the content fill the whole width of the cell. This CSS Grid property accepts other values as well:

`start`: aligns the content at the left of the cell,

`center`: aligns the content in the center of the cell,

`end`: aligns the content at the right of the cell.

## Instructions

Use the `justify-self` property to center the item with the class `item2`.

## Starter Code

```html
<style>
  .item1 {
    background: LightSkyBlue;
  }

  .item2 {
    background: LightSalmon;
    /* Only change code below this line */

    
    /* Only change code above this line */
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

1. `item2` class should have a `justify-self` property that has the value of `center`.

## Solution

```html
```html
<style>
  .item2 {
    justify-self: center;
  }
</style>
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5a90374338fddaf9a66b5d3a*

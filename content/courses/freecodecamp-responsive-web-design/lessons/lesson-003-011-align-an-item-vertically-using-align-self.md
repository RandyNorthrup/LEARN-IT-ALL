---
id: lesson-003-011
title: Align an Item Vertically using align-self
chapterId: chapter-03
order: 11
duration: 5
objectives:
  - Align an Item Vertically using align-self
---

# Align an Item Vertically using align-self

Just as you can align an item horizontally, there's a way to align an item vertically as well. To do this, you use the `align-self` property on an item. This property accepts all of the same values as `justify-self` from the last challenge.

## Instructions

Align the item with the class `item3` vertically at the `end`.

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
    /* Only change code below this line */

    
    /* Only change code above this line */
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

1. `item3` class should have a `align-self` property that has the value of `end`.

## Solution

```html
```html
<style>
  .item3 {
    align-self: end;
  }
</style>
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5a90375238fddaf9a66b5d3b*

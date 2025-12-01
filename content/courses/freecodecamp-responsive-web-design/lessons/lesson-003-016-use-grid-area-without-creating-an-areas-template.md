---
id: lesson-003-016
title: Use grid-area Without Creating an Areas Template
chapterId: chapter-03
order: 16
duration: 5
objectives:
  - Use grid-area Without Creating an Areas Template
---

# Use grid-area Without Creating an Areas Template

The `grid-area` property you learned in the last challenge can be used in another way. If your grid doesn't have an areas template to reference, you can create an area on the fly for an item to be placed like this:

```css
item1 {
  grid-area: 1/1/2/4;
}
```

This is using the line numbers you learned about earlier to define where the area for this item will be. The numbers in the example above represent these values:

```css
grid-area: horizontal line to start at / vertical line to start at / horizontal
  line to end at / vertical line to end at;
```

So the item in the example will consume the rows between lines 1 and 2, and the columns between lines 1 and 4.

## Instructions

Using the `grid-area` property, place the element with `item5` class between the third and fourth horizontal lines and between the first and fourth vertical lines.

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
    /* Only change code below this line */


    /* Only change code above this line */
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

1. The `item5` class should have a `grid-area` property to make it fill the whole area between the third and fourth horizontal lines, and first and fourth vertical lines.

## Solution

```html
```html
<style>
  .item5 {
    grid-area: 3/1/4/4;
  }
</style>
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5a94fe2669fb03452672e45e*

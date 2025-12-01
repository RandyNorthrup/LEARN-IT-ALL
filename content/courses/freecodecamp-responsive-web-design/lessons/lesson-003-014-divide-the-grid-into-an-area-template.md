---
id: lesson-003-014
title: Divide the Grid Into an Area Template
chapterId: chapter-03
order: 14
duration: 5
objectives:
  - Divide the Grid Into an Area Template
---

# Divide the Grid Into an Area Template

You can group cells of your grid together into an <dfn>area</dfn> and give the area a custom name. Do this by using `grid-template-areas` on the container like this:

```css
grid-template-areas:
  'header header header'
  'advert content content'
  'advert footer footer';
```

The code above groups the cells of the grid into four areas: `header`, `advert`, `content`, and `footer`. Every word represents a cell and every pair of quotation marks represent a row.

## Instructions

Change the template so the `footer` area spans the entire bottom row. Defining the areas won't have any visual effect right now. Later, you will make an item use an area to see how it works.

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
    grid-template-areas:
    /* Only change code below this line */
      'header header header'
      'advert content content'
      'advert footer footer';
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

1. `container` class should have a `grid-template-areas` property similar to the example but with the `footer` area spanning the whole bottom row.

## Solution

```html
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

    grid-template-areas:
      'header header header'
      'advert content content'
      'footer footer footer';
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
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5a94fe0569fb03452672e45c*

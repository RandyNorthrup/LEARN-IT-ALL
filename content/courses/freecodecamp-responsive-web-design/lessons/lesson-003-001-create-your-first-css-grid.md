---
id: lesson-003-001
title: Create Your First CSS Grid
chapterId: chapter-03
order: 1
duration: 5
objectives:
  - Create Your First CSS Grid
---

# Create Your First CSS Grid

Turn any HTML element into a grid container by setting its `display` property to `grid`. This gives you the ability to use all the other properties associated with CSS Grid.

**Note:** In CSS Grid, the parent element is referred to as the <dfn>container</dfn> and its children are called <dfn>items</dfn>.

## Instructions

Change the display of the div with the `container` class to `grid`.

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

1. `container` class should have a `display` property with a value of `grid`.

## Solution

```html
```html
<style>
  .container {
    display: grid;
  }
</style>
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5a858944d96184f06fd60d61*

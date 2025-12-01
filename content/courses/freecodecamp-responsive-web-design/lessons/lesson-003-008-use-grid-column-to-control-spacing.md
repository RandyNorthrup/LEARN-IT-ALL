---
id: lesson-003-008
title: Use grid-column to Control Spacing
chapterId: chapter-03
order: 8
duration: 5
objectives:
  - Use grid-column to Control Spacing
---

# Use grid-column to Control Spacing

Up to this point, all the properties that have been discussed are for grid containers. The `grid-column` property is the first one for use on the grid items themselves.

The hypothetical horizontal and vertical lines that create the grid are referred to as <dfn>lines</dfn>. These lines are numbered starting with 1 at the top left corner of the grid and move right for columns and down for rows, counting upward.

This is what the lines look like for a 3x3 grid:

<div style='position:relative;margin:auto;background:Gainsboro;display:block;margin-top:100px;margin-bottom:50px;width:200px;height:200px;'><p style='left:25%;top:-30%;font-size:130%;position:absolute;color:RoyalBlue;'>column lines</p><p style='left:0%;top:-15%;font-size:130%;position:absolute;color:RoyalBlue;'>1</p><p style='left:30%;top:-15%;font-size:130%;position:absolute;color:RoyalBlue;'>2</p><p style='left:63%;top:-15%;font-size:130%;position:absolute;color:RoyalBlue;'>3</p><p style='left:95%;top:-15%;font-size:130%;position:absolute;color:RoyalBlue;'>4</p><p style='left:-40%;top:45%;font-size:130%;transform:rotateZ(-90deg);position:absolute;'>row lines</p><p style='left:-10%;top:-10%;font-size:130%;position:absolute;'>1</p><p style='left:-10%;top:21%;font-size:130%;position:absolute;'>2</p><p style='left:-10%;top:53%;font-size:130%;position:absolute;'>3</p><p style='left:-10%;top:85%;font-size:130%;position:absolute;'>4</p><div style='left:0%;top:0%;width:5%;height:100%;background:RoyalBlue;position:absolute;'></div><div style='left:31%;top:0%;width:5%;height:100%;background:RoyalBlue;position:absolute;'></div><div style='left:63%;top:0%;width:5%;height:100%;background:RoyalBlue;position:absolute;'></div><div style='left:95%;top:0%;width:5%;height:100%;background:RoyalBlue;position:absolute;'></div><div style='left:0%;top:0%;width:100%;height:5%;background:black;position:absolute;'></div><div style='left:0%;top:31%;width:100%;height:5%;background:black;position:absolute;'></div><div style='left:0%;top:63%;width:100%;height:5%;background:black;position:absolute;'></div><div style='left:0%;top:95%;width:100%;height:5%;background:black;position:absolute;'></div></div>

To control the number of columns an item will consume, you can use the `grid-column` property in conjunction with the line numbers you want the item to start and stop at.

Here's an example:

```css
grid-column: 1 / 3;
```

This will make the item start at the first vertical line of the grid on the left and span to the 3rd line of the grid, consuming two columns.

## Instructions

Make the item with the class `item5` consume the last two columns of the grid.

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

1. `item5` class should have a `grid-column` property.
2. `item5` class should have a `grid-column` property which results in it consuming the last two columns of the grid.

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
    grid-column: 2 / 4;
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
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5a90372638fddaf9a66b5d38*

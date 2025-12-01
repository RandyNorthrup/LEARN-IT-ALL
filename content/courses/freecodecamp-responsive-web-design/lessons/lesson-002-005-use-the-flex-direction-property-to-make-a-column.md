---
id: lesson-002-005
title: Use the flex-direction Property to Make a Column
chapterId: chapter-02
order: 5
duration: 5
objectives:
  - Use the flex-direction Property to Make a Column
---

# Use the flex-direction Property to Make a Column

The last two challenges used the `flex-direction` property set to `row`. This property can also create a column by vertically stacking the children of a flex container.

## Instructions

Add the CSS property `flex-direction` to the `#box-container` element, and give it a value of `column`.

## Starter Code

```html
<style>
  #box-container {
    display: flex;
    height: 500px;

  }
  #box-1 {
    background-color: dodgerblue;
    width: 50%;
    height: 50%;
  }

  #box-2 {
    background-color: orangered;
    width: 50%;
    height: 50%;
  }
</style>

<div id="box-container">
  <div id="box-1"></div>
  <div id="box-2"></div>
</div>
```

## Hints

1. The `#box-container` element should have a `flex-direction` property set to `column`.

## Solution

```html
```html
<style>
  #box-container {
    display: flex;
    height: 500px;
    flex-direction: column;
  }
  #box-1 {
    background-color: dodgerblue;
    width: 50%;
    height: 50%;
  }

  #box-2 {
    background-color: orangered;
    width: 50%;
    height: 50%;
  }
</style>

<div id="box-container">
  <div id="box-1"></div>
  <div id="box-2"></div>
</div>
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 587d78ac367417b2b2512af4*

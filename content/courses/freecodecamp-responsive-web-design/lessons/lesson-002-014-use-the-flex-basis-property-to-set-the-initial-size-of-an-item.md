---
id: lesson-002-014
title: Use the flex-basis Property to Set the Initial Size of an Item
chapterId: chapter-02
order: 14
duration: 5
objectives:
  - Use the flex-basis Property to Set the Initial Size of an Item
---

# Use the flex-basis Property to Set the Initial Size of an Item

The `flex-basis` property specifies the initial size of the item before CSS makes adjustments with `flex-shrink` or `flex-grow`.

The units used by the `flex-basis` property are the same as other size properties (`px`, `em`, `%`, etc.). The value `auto` sizes items based on the content.

## Instructions

Set the initial size of the boxes using `flex-basis`. Add the CSS property `flex-basis` to both `#box-1` and `#box-2`. Give `#box-1` a value of `10em` and `#box-2` a value of `20em`.

## Starter Code

```html
<style>
  #box-container {
    display: flex;
    height: 500px;
  }

  #box-1 {
    background-color: dodgerblue;
    height: 200px;

  }

  #box-2 {
    background-color: orangered;
    height: 200px;

  }
</style>

<div id="box-container">
  <div id="box-1"></div>
  <div id="box-2"></div>
</div>
```

## Hints

1. The `#box-1` element should have the `flex-basis` property.
2. The `#box-1` element should have a `flex-basis` value of `10em`.
3. The `#box-2` element should have the `flex-basis` property.
4. The `#box-2` element should have a `flex-basis` value of `20em`.

## Solution

```html
```html
<style>
  #box-container {
    display: flex;
    height: 500px;
  }

  #box-1 {
    background-color: dodgerblue;
    height: 200px;
    flex-basis: 10em;
  }

  #box-2 {
    background-color: orangered;
    height: 200px;
    flex-basis: 20em;
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
*Original Challenge ID: 587d78ae367417b2b2512afd*

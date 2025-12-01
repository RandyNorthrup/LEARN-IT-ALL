---
id: lesson-001-013
title: Add id Attributes to Bootstrap Elements
chapterId: chapter-01
order: 13
duration: 5
objectives:
  - Add id Attributes to Bootstrap Elements
---

# Add id Attributes to Bootstrap Elements

Recall that in addition to class attributes, you can give each of your elements an `id` attribute.

Each id must be unique to a specific element and used only once per page.

Let's give a unique id to each of our `div` elements of class `well`.

Remember that you can give an element an id like this:

```html
<div class="well" id="center-well">
```

Give the well on the left the id of `left-well`. Give the well on the right the id of `right-well`.

## Starter Code

```html
<div class="container-fluid">
  <h3 class="text-primary text-center">jQuery Playground</h3>
  <div class="row">
    <div class="col-xs-6">
      <div class="well">
        <button class="btn btn-default target"></button>
        <button class="btn btn-default target"></button>
        <button class="btn btn-default target"></button>
      </div>
    </div>
    <div class="col-xs-6">
      <div class="well">
        <button class="btn btn-default target"></button>
        <button class="btn btn-default target"></button>
        <button class="btn btn-default target"></button>
      </div>
    </div>
  </div>
</div>
```

## Hints

1. Your left `well` should have the id of `left-well`.
2. Your right `well` should have the id of `right-well`.

## Solution

```html
```html
<div class="container-fluid">
  <h3 class="text-primary text-center">jQuery Playground</h3>
  <div class="row">
    <div class="col-xs-6">
      <div class="well" id="left-well">
        <button class="btn btn-default target"></button>
        <button class="btn btn-default target"></button>
        <button class="btn btn-default target"></button>
      </div>
    </div>
    <div class="col-xs-6">
      <div class="well" id="right-well">
        <button class="btn btn-default target"></button>
        <button class="btn btn-default target"></button>
        <button class="btn btn-default target"></button>
      </div>
    </div>
  </div>
</div>
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/front-end-development-libraries/)*
*Original Challenge ID: bad87fee1348bd9aec908853*

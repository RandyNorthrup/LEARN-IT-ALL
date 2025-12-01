---
id: lesson-001-014
title: Label Bootstrap Wells
chapterId: chapter-01
order: 14
duration: 5
objectives:
  - Label Bootstrap Wells
---

# Label Bootstrap Wells

For the sake of clarity, let's label both of our wells with their ids.

Above your left-well, inside its `col-xs-6` `div` element, add an `h4` element with the text `#left-well`.

Above your right-well, inside its `col-xs-6` `div` element, add an `h4` element with the text `#right-well`.

## Starter Code

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

## Hints

1. You should add an `h4` element to each of your `<div class="col-xs-6">` elements.
2. const columnSixTwoChildren = columnSixes?.[1]?.querySelectorAll(`:scope ${'h4'}`);
assert.lengthOf(columnSixTwoChildren,1);
3. One `h4` element should have the text `#left-well`.
4. One `h4` element should have the text `#right-well`.
5. All of your `h4` elements should have closing tags.

## Solution

```html
```html
<div class="container-fluid">
  <h3 class="text-primary text-center">jQuery Playground</h3>
  <div class="row">
    <div class="col-xs-6">
      <h4>#left-well</h4>
      <div class="well" id="left-well">
        <button class="btn btn-default target"></button>
        <button class="btn btn-default target"></button>
        <button class="btn btn-default target"></button>
      </div>
    </div>
    <div class="col-xs-6">
      <h4>#right-well</h4>
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
*Original Challenge ID: bad87fee1348bd9aec908854*

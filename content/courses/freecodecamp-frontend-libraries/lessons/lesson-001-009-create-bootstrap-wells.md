---
id: lesson-001-009
title: Create Bootstrap Wells
chapterId: chapter-01
order: 9
duration: 5
objectives:
  - Create Bootstrap Wells
---

# Create Bootstrap Wells

Bootstrap has a class called `well` that can create a visual sense of depth for your columns.

Nest one `div` element with the class `well` within each of your `col-xs-6` `div` elements.

## Starter Code

```html
<div class="container-fluid">
  <h3 class="text-primary text-center">jQuery Playground</h3>
  <div class="row">
    <div class="col-xs-6">

    </div>
    <div class="col-xs-6">

    </div>
  </div>
</div>
```

## Hints

1. You should add a `div` element with the class `well` inside each of your `div` elements with the class `col-xs-6`
2. Both of your `div` elements with the class `col-xs-6` should be nested within your `div` element with the class `row`.
3. All your `div` elements should have closing tags.

## Solution

```html
```html
<div class="container-fluid">
  <h3 class="text-primary text-center">jQuery Playground</h3>
  <div class="row">
    <div class="col-xs-6">
      <div class="well"></div>
    </div>
    <div class="col-xs-6">
      <div class="well"></div>
    </div>
  </div>
</div>
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/front-end-development-libraries/)*
*Original Challenge ID: bad87fee1348bd9aec908848*

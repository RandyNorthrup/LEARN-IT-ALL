---
id: lesson-001-010
title: Add Elements within Your Bootstrap Wells
chapterId: chapter-01
order: 10
duration: 5
objectives:
  - Add Elements within Your Bootstrap Wells
---

# Add Elements within Your Bootstrap Wells

Now we're several `div` elements deep on each column of our row. This is as deep as we'll need to go. Now we can add our `button` elements.

Nest three `button` elements within each of your `div` elements having the class name `well`.

## Starter Code

```html
<div class="container-fluid">
  <h3 class="text-primary text-center">jQuery Playground</h3>
  <div class="row">
    <div class="col-xs-6">
      <div class="well">



      </div>
    </div>
    <div class="col-xs-6">
      <div class="well">



      </div>
    </div>
  </div>
</div>
```

## Hints

1. Three `button` elements should be nested within each of your `div` elements with class `well`.
2. const buttonTwo = document.querySelectorAll('div.well')?.[1]
const buttonTwoChildren = buttonTwo?.querySelectorAll(`:scope ${'button'}`);
assert.lengthOf(buttonTwoChildren,3);
3. You should have a total of 6 `button` elements.
4. All of your `button` elements should have closing tags.

## Solution

```html
```html
<div class="container-fluid">
  <h3 class="text-primary text-center">jQuery Playground</h3>
  <div class="row">
    <div class="col-xs-6">
      <div class="well">
        <button></button>
        <button></button>
        <button></button>
      </div>
    </div>
    <div class="col-xs-6">
      <div class="well">
        <button></button>
        <button></button>
        <button></button>
      </div>
    </div>
  </div>
</div>
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/front-end-development-libraries/)*
*Original Challenge ID: bad87fee1348bd9aec908849*

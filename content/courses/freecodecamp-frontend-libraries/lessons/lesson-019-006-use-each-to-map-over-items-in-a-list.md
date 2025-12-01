---
id: lesson-019-006
title: Use @each to Map Over Items in a List
chapterId: chapter-19
order: 6
duration: 5
objectives:
  - Use @each to Map Over Items in a List
---

# Use @each to Map Over Items in a List

The last challenge showed how the `@for` directive uses a starting and ending value to loop a certain number of times. Sass also offers the `@each` directive which loops over each item in a list or map. On each iteration, the variable gets assigned to the current value from the list or map.

```scss
@each $color in blue, red, green {
  .#{$color}-text {color: $color;}
}
```

A map has slightly different syntax. Here's an example:

```scss
$colors: (color1: blue, color2: red, color3: green);

@each $key, $color in $colors {
  .#{$color}-text {color: $color;}
}
```

Note that the `$key` variable is needed to reference the keys in the map. Otherwise, the compiled CSS would have `color1`, `color2`... in it. Both of the above code examples are converted into the following CSS:

```scss
.blue-text {
  color: blue;
}

.red-text {
  color: red;
}

.green-text {
  color: green;
}
```

## Instructions

Write an `@each` directive that goes through a list: `blue, black, red` and assigns each variable to a `.color-bg` class, where the `color` part changes for each item to the respective color. Each class should set the `background-color` to the respective color as well.

## Starter Code

```html
<style type='text/scss'>



  div {
    height: 200px;
    width: 200px;
  }
</style>

<div class="blue-bg"></div>
<div class="black-bg"></div>
<div class="red-bg"></div>
```

## Hints

1. Your code should use the `@each` directive.
2. Your `.blue-bg` class should have a `background-color` of blue.
3. Your `.black-bg` class should have a `background-color` of black.
4. Your `.red-bg` class should have a `background-color` of red.

## Solution

```html
```html
<style type='text/scss'>

  @each $color in blue, black, red {
    .#{$color}-bg {background-color: $color;}
  }

  div {
    height: 200px;
    width: 200px;
  }
</style>

<div class="blue-bg"></div>
<div class="black-bg"></div>
<div class="red-bg"></div>
```

---

```html
<style type='text/scss'>

  $colors: (color1: blue, color2: black, color3: red);

  @each $key, $color in $colors {
    .#{$color}-bg {background-color: $color;}
  }

  div {
    height: 200px;
    width: 200px;
  }
</style>

<div class="blue-bg"></div>
<div class="black-bg"></div>
<div class="red-bg"></div>
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/front-end-development-libraries/)*
*Original Challenge ID: 587d7dbf367417b2b2512bba*

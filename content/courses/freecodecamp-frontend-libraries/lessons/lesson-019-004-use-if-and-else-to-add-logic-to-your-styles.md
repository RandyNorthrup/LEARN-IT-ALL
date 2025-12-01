---
id: lesson-019-004
title: Use @if and @else to Add Logic To Your Styles
chapterId: chapter-19
order: 4
duration: 5
objectives:
  - Use @if and @else to Add Logic To Your Styles
---

# Use @if and @else to Add Logic To Your Styles

The `@if` directive in Sass is useful to test for a specific case - it works just like the `if` statement in JavaScript.

```scss
@mixin make-bold($bool) {
  @if $bool == true {
    font-weight: bold;
  }
}
```

And just like in JavaScript, the `@else if` and `@else` directives test for more conditions:

```scss
@mixin text-effect($val) {
  @if $val == danger {
    color: red;
  }
  @else if $val == alert {
    color: yellow;
  }
  @else if $val == success {
    color: green;
  }
  @else {
    color: black;
  }
}
```

## Instructions

Create a mixin called `border-stroke` that takes a parameter `$val`. The mixin should check for the following conditions using `@if`, `@else if`, and `@else` directives:

```scss
light - 1px solid black
medium - 3px solid black
heavy - 6px solid black
```

If the `$val` parameter value is not `light`, `medium`, or `heavy`, then the `border` property should be set to `none`.

## Starter Code

```html
<style type='text/scss'>



  #box {
    width: 150px;
    height: 150px;
    background-color: red;
    @include border-stroke(medium);
  }
</style>

<div id="box"></div>
```

## Hints

1. Your code should declare a mixin named `border-stroke` which has a parameter named `$val`.
2. Your mixin should have an `@if` statement to check if `$val` is `light`, and to set the `border` to `1px solid black`.
3. Your mixin should have an `@else if` statement to check if `$val` is `medium`, and to set the `border` to `3px solid black`.
4. Your mixin should have an `@else if` statement to check if `$val` is `heavy`, and to set the `border` to `6px solid black`.
5. Your mixin should have an `@else` statement to set the `border` to `none`.

## Solution

```html
```html
<style type='text/scss'>
  @mixin border-stroke($val) {
    @if $val == light {
      border: 1px solid black;
    }
    @else if $val == medium {
      border: 3px solid black;
    }
    @else if $val == heavy {
      border: 6px solid black;
    }
    @else {
      border: none;
    }
  }


  #box {
    width: 150px;
    height: 150px;
    background-color: red;
    @include border-stroke(medium);
  }
</style>

<div id="box"></div>
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/front-end-development-libraries/)*
*Original Challenge ID: 587d7dbe367417b2b2512bb8*

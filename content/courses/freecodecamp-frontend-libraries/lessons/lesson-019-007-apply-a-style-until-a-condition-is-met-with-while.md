---
id: lesson-019-007
title: Apply a Style Until a Condition is Met with @while
chapterId: chapter-19
order: 7
duration: 5
objectives:
  - Apply a Style Until a Condition is Met with @while
---

# Apply a Style Until a Condition is Met with @while

The `@while` directive is an option with similar functionality to the JavaScript `while` loop. It creates CSS rules until a condition is met.

The `@for` challenge gave an example to create a simple grid system. This can also work with `@while`.

```scss
$x: 1;
@while $x < 13 {
  .col-#{$x} { width: 100%/12 * $x;}
  $x: $x + 1;
}
```

First, define a variable `$x` and set it to 1. Next, use the `@while` directive to create the grid system *while* `$x` is less than 13. After setting the CSS rule for `width`, `$x` is incremented by 1 to avoid an infinite loop.

## Instructions

Use `@while` to create a series of classes with different `font-sizes`.

There should be 5 different classes from `text-1` to `text-5`. Then set `font-size` to `15px` multiplied by the current index number. Make sure to avoid an infinite loop!

## Starter Code

```html
<style type='text/scss'>



</style>

<p class="text-1">Hello</p>
<p class="text-2">Hello</p>
<p class="text-3">Hello</p>
<p class="text-4">Hello</p>
<p class="text-5">Hello</p>
```

## Hints

1. Your code should use the `@while` directive.
2. Your code should use an index variable which starts at an index of 1.
3. Your code should increment the counter variable.
4. Your `.text-1` class should have a `font-size` of `15px`.
5. Your `.text-2` class should have a `font-size` of `30px`.
6. Your `.text-3` class should have a `font-size` of `45px`.
7. Your `.text-4` class should have a `font-size` of `60px`.
8. Your `.text-5` class should have a `font-size` of `75px`.

## Solution

```html
```html
<style type='text/scss'>
  $x: 1;
  @while $x < 6 {
    .text-#{$x}{
      font-size: 15px * $x;
    }
    $x: $x + 1;
  }
</style>

<p class="text-1">Hello</p>
<p class="text-2">Hello</p>
<p class="text-3">Hello</p>
<p class="text-4">Hello</p>
<p class="text-5">Hello</p>
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/front-end-development-libraries/)*
*Original Challenge ID: 587d7dbf367417b2b2512bbb*

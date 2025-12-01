---
id: lesson-019-001
title: Store Data with Sass Variables
chapterId: chapter-19
order: 1
duration: 5
objectives:
  - Store Data with Sass Variables
---

# Store Data with Sass Variables

One feature of Sass that's different than CSS is it uses variables. They are declared and set to store data, similar to JavaScript.

In JavaScript, variables are defined using the `let` and `const` keywords. In Sass, variables start with a `$` followed by the variable name.

Here are a couple examples:

```scss
$main-fonts: Arial, sans-serif;
$headings-color: green;
```

And to use the variables:

```scss
h1 {
  font-family: $main-fonts;
  color: $headings-color;
}
```

One example where variables are useful is when a number of elements need to be the same color. If that color is changed, the only place to edit the code is the variable value.

## Instructions

Create a variable `$text-color` and set it to `red`. Then change the value of the `color` property for the `.blog-post` and `h2` to the `$text-color` variable.

## Starter Code

```html
<style type='text/scss'>


  .header{
    text-align: center;
  }
  .blog-post, h2 {
    color: red;
  }
</style>

<h1 class="header">Learn Sass</h1>
<div class="blog-post">
  <h2>Some random title</h2>
  <p>This is a paragraph with some random text in it</p>
</div>
<div class="blog-post">
  <h2>Header #2</h2>
  <p>Here is some more random text.</p>
</div>
<div class="blog-post">
  <h2>Here is another header</h2>
  <p>Even more random text within a paragraph</p>
</div>
```

## Hints

1. Your code should have a Sass variable declared for `$text-color` with a value of `red`.
2. Your code should use the `$text-color` variable to change the `color` for the `.blog-post` and `h2` items.
3. Your `.blog-post` element should have a `color` of red.
4. Your `h2` elements should have a `color` of red.

## Solution

```html
```html
<style type='text/scss'>
  $text-color: red;

  .header{
    text-align: center;
  }
  .blog-post, h2 {
    color: $text-color;
  }
</style>

<h1 class="header">Learn Sass</h1>
<div class="blog-post">
  <h2>Some random title</h2>
  <p>This is a paragraph with some random text in it</p>
</div>
<div class="blog-post">
  <h2>Header #2</h2>
  <p>Here is some more random text.</p>
</div>
<div class="blog-post">
  <h2>Here is another header</h2>
  <p>Even more random text within a paragraph</p>
</div>
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/front-end-development-libraries/)*
*Original Challenge ID: 587d7dbd367417b2b2512bb4*

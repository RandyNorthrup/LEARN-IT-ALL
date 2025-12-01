---
id: lesson-001-005
title: House our page within a Bootstrap container-fluid div
chapterId: chapter-01
order: 5
duration: 5
objectives:
  - House our page within a Bootstrap container-fluid div
---

# House our page within a Bootstrap container-fluid div

Now let's make sure all the content on your page is mobile-responsive.

Let's nest your `h3` element within a `div` element with the class `container-fluid`.

## Starter Code

```html
<h3 class="text-primary text-center">jQuery Playground</h3>
```

## Hints

1. Your `div` element should have the class `container-fluid`.
2. Each of your `div` elements should have closing tags.
3. assert.equal(code.match(/<\/div>/g).length ,code.match(/<div/g).length);
4. Your `h3` element should be nested inside a `div` element.

## Solution

```html
```html
<div class="container-fluid">
    <h3 class="text-primary text-center">jQuery Playground</h3>
</div>
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/front-end-development-libraries/)*
*Original Challenge ID: bad87fee1348bd9aec908746*

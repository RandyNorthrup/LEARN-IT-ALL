---
id: lesson-013-009
title: Step 9
chapterId: chapter-13
order: 9
duration: 5
objectives:
  - Step 9
---

# Step 9

All `img` elements should have an `alt` attribute. The `alt` attribute's text is used for screen readers to improve accessibility and is displayed if the image fails to load. 

Here is an example of an `img` element with an `alt` attribute:

```html
<img src="cat.jpg" alt="A cat">
```

Inside the `img` element, add an `alt` attribute with this text:

`A cute orange cat lying on its back`

## Starter Code

```html
<html>
  <body>
    <main>
      <h1>CatPhotoApp</h1>
      <h2>Cat Photos</h2>
      <!-- TODO: Add link to cat photos -->
      <p>Everyone loves cute cats online!</p>
--fcc-editable-region--
      <img src="https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg">
--fcc-editable-region--
    </main>
  </body>
</html>
```

## Hints

1. Your code should have an `img` element. You removed the `img` element from an earlier step.
2. Your `img` element does not have an `alt` attribute. Check that there is a space after the opening tag's name and/or there are spaces before all attribute names.
3. Your `img` element's `alt` attribute value is set to something other than `A cute orange cat lying on its back`. Make sure the `alt` attribute's value is surrounded with quotation marks.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 5dc24165f86c76b9248c6ebc*

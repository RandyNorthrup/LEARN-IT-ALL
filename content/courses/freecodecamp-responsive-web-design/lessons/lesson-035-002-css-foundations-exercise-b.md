---
id: lesson-035-002
title: CSS Foundations Exercise B
chapterId: chapter-35
order: 2
duration: 5
objectives:
  - CSS Foundations Exercise B
---

# CSS Foundations Exercise B

**Objective:** There are several elements in the HTML file provided, which you will have to add either class or ID attributes to. You will then have to add rules in the CSS file provided using the correct selector syntax.

## User Stories

1. You should see a `yellow` background for all odd numbered elements in the list.

1. You should have a `class` selector used for all odd numbered elements in the list.

1. You should see that the second element in the list has `blue` text and a `font-size` of `36px`.

1. The `font-size` and text color on the second element should be set by using an `id` attribute.

1. You should see that the third element in the list has a `font-size` of `24px`.

1. The `font-size` on the third element should be set by using a `class` attribute.

1. You should see that the fourth element in the list has a `red` background, a `font-size` of `24px`, and a `font-weight` of `bold`.

1. The `font-size` of the fourth element should be set with a `class` attribute. The `font-weight` and the color should be set with an `id` attribute.

## Starter Code

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Class and ID Selectors</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <p>Number 1 - I'm a class!</p>
    <div>Number 2 - I'm one ID.</div>
    <p>Number 3 - I'm a class, but cooler!</p>
    <div>Number 4 - I'm another ID.</div>
    <p>Number 5 - I'm a class!</p>
  </body>
</html>
```

## Hints

1. Every odd element should have a `class` attribute.
2. const everyPHasClass = p?.every((paragraph) => paragraph.classList.length > 0);
3. assert(everyPHasClass);
4. Your odd elements should have a `background-color` of `yellow`.
5. const everyPHasBackgroundColor = p?.every((paragraph) => {
  const style = getComputedStyle(paragraph);
  
  return style?.backgroundColor === 'rgb(255, 255, 0)';
})
6. assert.equal(everyPHasBackgroundColor, true);
7. Your second element should have `blue` text and a `font-size` of `36px`.
8. const style = new __helpers.CSSHelp(document).getStyle(`#${secondElementId}`);
9. assert.equal(style?.color, 'blue');
assert.equal(style?.fontSize, '36px');
10. Your third element should have text and a `font-size` of `24px`.
11. assert(thirdElement?.innerText?.length > 0);
12. const thirdElementClasses = Array.from(thirdElement?.classList?.values());
13. assert(thirdElementClasses.some(thirdElementClass => {
14. const style = new __helpers.CSSHelp(document).getStyle(`.${thirdElementClass}`);
15. return style?.fontSize === '24px';
16. }))
17. The fourth element should have a `font-size` of `24px`.
18. const style = new __helpers.CSSHelp(document).getStyle(`.${fourthElementClass}`);
19. assert(style?.fontSize === '24px');
20. The fourth element should have a `red` `background-color`.
21. const style = new __helpers.CSSHelp(document).getStyle(`#${fourthElement}`);
22. assert(style?.backgroundColor === 'red');
23. The fourth element should have a `font-weight` of `bold`.
24. const style = new __helpers.CSSHelp(document).getStyle(`#${fourthElement}`);
25. assert(style?.fontWeight === 'bold');

## Solution

```html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Class and ID Selectors</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <p class="odd">Number 1 - I'm a class!</p>
    <div id="two">Number 2 - I'm one ID.</div>
    <p class="odd adjust-font-size">Number 3 - I'm a class, but cooler!</p>
    <div id="four" class="adjust-font-size">Number 4 - I'm another ID.</div>
    <p class="odd">Number 5 - I'm a class!</p>
  </body>
</html>
```

```css
.odd {
  background-color: yellow;
  font-family: Verdana, "DejaVu Sans", sans-serif;
}

.adjust-font-size {
  font-size: 24px;
}

#two {
  color: blue;
  font-size: 36px;
}

#four {
  background-color: red;
  font-weight: bold;
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 63ee3fe4381756f9716727f0*

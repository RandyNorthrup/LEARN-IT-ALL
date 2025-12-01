---
id: lesson-035-003
title: CSS Foundations Exercise C
chapterId: chapter-35
order: 3
duration: 5
objectives:
  - CSS Foundations Exercise C
---

# CSS Foundations Exercise C

Let's build a little off the previous exercise, in which you added multiple classes to a single element in order to apply two different rules to it.

1. You should see a black background and white text on the first `button` element.
1. You should see a yellow background on the second `button` element.
1. You should set a font size of `28px` using a selector list.
1. You should have a list of fonts containing `Helvetica` and `Times New Roman` with `sans-serif` as a fallback in the selector list.
1. You should see a unique class name on each element.
1. You should have a selector list for styles that both elements share.

## Starter Code

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Grouping Selectors</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <button>Click Me!</button>
    <button>No, Click Me!</button>
  </body>
</html>
```

## Hints

1. You should have a `black` background on the first element.
2. const style = new __helpers.CSSHelp(document).getStyle(`.${classes[0]}`);
3. assert.equal(style?.backgroundColor, 'black');
4. Your first element should have a text color of `white`.
5. const classes = document.querySelectorAll('button')?.[0].classList;
6. const style = new __helpers.CSSHelp(document).getStyle(`.${classes[0]}`);
7. assert.equal(style?.color, 'white');
8. You should set the `font-size` for both elements to `28px` using a selector list.
9. function eitherOr() {
  const a = new __helpers.CSSHelp(document)
  return a.getStyle(`.${classOne}, .${classTwo}`) ?? a.getStyle(`.${classTwo}, .${classOne}`);
}
assert.equal(eitherOr()?.fontSize, '28px');
10. You should have a unique class name on each element.
11. for(let i = 0; i < elementOneClasses.length; i++){
    assert(![...elementTwoClasses].includes(elementOneClasses[i]));
}
12. You should have a selector list for styles that both elements share.
13. function eitherOr() {
  const a = new __helpers.CSSHelp(document)
  return a.getStyle(`.${classOne}, .${classTwo}`) ?? a.getStyle(`.${classTwo}, .${classOne}`);
}
assert.exists(eitherOr());
14. You should have a list of fonts containing `Helvetica` and `Times New Roman` with `sans-serif` as a fallback in the selector list.
15. function eitherOr() {
  const a = new __helpers.CSSHelp(document)
  return a.getStyle(`.${classOne}, .${classTwo}`) ?? a.getStyle(`.${classTwo}, .${classOne}`);
}
16. assert.equal(eitherOr()?.fontFamily, 'Helvetica, "Times New Roman", sans-serif');
17. Each element should only have one class.
18. assert(elementOneClasses.length === 1 && elementTwoClasses.length === 1);

## Solution

```html
```html
<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Grouping Selectors</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <button class="inverted">Click Me!</button>
    <button class="fancy">No, Click Me!</button>
  </body>
</html>
```

```css
.inverted,
.fancy {
  font-family: Helvetica, "Times New Roman", sans-serif;
  font-size: 28px;
}

.inverted {
  background-color: black;
  color: white;
}

.fancy {
  background-color: yellow;
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 63ee3fe9381756f9716727f1*

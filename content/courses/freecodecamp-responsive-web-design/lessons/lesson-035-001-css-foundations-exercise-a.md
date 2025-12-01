---
id: lesson-035-001
title: CSS Foundations Exercise A
chapterId: chapter-35
order: 1
duration: 5
objectives:
  - CSS Foundations Exercise A
---

# CSS Foundations Exercise A

**Objective:** 
In this exercise, you're going to practice adding CSS to an HTML file using all three methods: external CSS, internal CSS, and inline CSS. You should only be using type selectors for this exercise when adding styles via the external and internal methods. You should also use keywords for colors (e.g. "blue") instead of using `RGB` or `HEX` values.

## User Stories

- You should see a `div` element with some text.
  - It should have a `red` background, `white` text, a font size of `32px`, text center aligned and `bold`.
  - The CSS for the `div` element should be added externally, and using a type selector.
- You should see a `p` element with some text.
  - It should have a `green` background, `white` text, and a font size of `18px`.
  - The CSS for the `p` element should be added internally, and using a type selector.
- You should see a `button` element with some text.
  - The `button` element should have an `orange` background and a font size of `18px`.
  - The CSS for the `button` element should be added using inline styles.

## Starter Code

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Exercise A</title>
  </head>
  <body>

  </body>
</html>
```

## Hints

1. You should have one `div` element containing some text.
2. assert.isNotNull(divElement);
assert.isAtLeast(divElement?.innerText.length, 1);
3. You should have an external stylesheet containing the `div` element styles.
4. assert.isTrue(isExternal);
assert.isNotNull(divStyle);
5. Your `div` element should not have its CSS added using internal or inline styles.
6. assert.isNotTrue(styleElement?.innerText.includes('div'));
assert.isNotTrue(document.querySelector('div')?.hasAttribute('style'));
7. Your `div` element should have a `background-color` of `red` and a `color` of `white`.
8. assert.equal(divBGColor, 'red');
assert.equal(divColor, 'white');
9. Your `div` element should have `font-weight` set to `bold`, `font-size` set to `32px`, and `text-align` set to `center`.
10. assert.equal(textAlign, 'center');
assert.equal(fontSize, '32px');
assert.equal(fontWeight,'bold');
11. You should have one `p` element and it should contain some text.
12. assert.isNotNull(pElement);
assert.isAtLeast(pElement?.innerText.length, 1)
13. Your `p` element should have its styles added internally using a `style` element.
14. if (rules && rules.selectorText === 'p') {
  isStyled = true;
}
15. assert.isTrue(isStyled);
16. Your `p` element should have a `font-size` of `18px` and have `color` set to `white`.
17. if (rules && rules.selectorText === 'p') {
  fontSize = rules.style.fontSize;
  color = rules.style.color;
}
18. assert.equal(fontSize, "18px");
assert.equal(color, 'white');
19. You should have one `button` element containing some text.
20. assert.isNotNull(btnElement);
assert.isAtLeast(btnElement?.innerText.length, 1);
21. Your `button` element should have an inline style.
22. Your `button` element should have its `font-size` set to `18px`.

## Solution

```html
```html
<!DOCTYPE html>
<html>
<head>
  <title>My Styling Example</title>
  <link rel="stylesheet" type="text/css" href="styles.css">
  <style>
    p {
      background-color: green;
      color: white;
      font-size: 18px;
    }
  </style>
</head>
<body>
  <div>Hello World!</div>
  <p>This is a paragraph.</p>
  <button style="background-color: orange; font-size: 18px;">Click Me</button>
</body>
</html>
```

```css
div {
  background-color: red;
  color: white;
  font-size: 32px;
  text-align: center;
  font-weight: bold;
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 63ee3f71381756f9716727ef*

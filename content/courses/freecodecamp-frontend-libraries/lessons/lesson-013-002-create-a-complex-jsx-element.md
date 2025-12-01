---
id: lesson-013-002
title: Create a Complex JSX Element
chapterId: chapter-13
order: 2
duration: 5
objectives:
  - Create a Complex JSX Element
---

# Create a Complex JSX Element

The last challenge was a simple example of JSX, but JSX can represent more complex HTML as well.

One important thing to know about nested JSX is that it must return a single element.

This one parent element would wrap all of the other levels of nested elements.

For instance, several JSX elements written as siblings with no parent wrapper element will not transpile.

Here's an example:

**Valid JSX:**

```jsx
<div>
  <p>Paragraph One</p>
  <p>Paragraph Two</p>
  <p>Paragraph Three</p>
</div>
```

**Invalid JSX:**

```jsx
<p>Paragraph One</p>
<p>Paragraph Two</p>
<p>Paragraph Three</p>
```

## Instructions

Define a new constant `JSX` that renders a `div` which contains the following elements in order:

An `h1`, a `p`, and an unordered list that contains three `li` items. You can include any text you want within each element.

**Note:** When rendering multiple elements like this, you can wrap them all in parentheses, but it's not strictly required. Also notice this challenge uses a `div` tag to wrap all the child elements within a single parent element. If you remove the `div`, the JSX will no longer transpile. Keep this in mind, since it will also apply when you return JSX elements in React components.

## Hints

1. The constant `JSX` should return a `div` element.
2. The `div` should contain an `h1` tag as the first element.
3. The `div` should contain a `p` tag as the second element.
4. The `div` should contain a `ul` tag as the third element.
5. The `ul` should contain three `li` elements.

## Solution

```html
```jsx
const JSX = (
<div>
  <h1>Hello JSX!</h1>
  <p>Some info</p>
  <ul>
    <li>An item</li>
    <li>Another item</li>
    <li>A third item</li>
  </ul>
</div>);
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/front-end-development-libraries/)*
*Original Challenge ID: 5a24bbe0dba28a8d3cbd4c5d*

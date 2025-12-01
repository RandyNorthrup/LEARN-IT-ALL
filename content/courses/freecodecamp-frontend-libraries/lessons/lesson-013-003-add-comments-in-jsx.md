---
id: lesson-013-003
title: Add Comments in JSX
chapterId: chapter-13
order: 3
duration: 5
objectives:
  - Add Comments in JSX
---

# Add Comments in JSX

JSX is a syntax that gets compiled into valid JavaScript. Sometimes, for readability, you might need to add comments to your code. Like most programming languages, JSX has its own way to do this.

To put comments inside JSX, you use the syntax `{/* */}` to wrap around the comment text.

## Instructions

The code editor has a JSX element similar to what you created in the last challenge. Add a comment somewhere within the provided `div` element, without modifying the existing `h1` or `p` elements.

## Starter Code

```html
const JSX = (
  <div>
    <h1>This is a block of JSX</h1>
    <p>Here's a subtitle</p>
  </div>
);
```

## Hints

1. The constant `JSX` should return a `div` element.
2. The `div` should contain an `h1` tag as the first element.
3. The `div` should contain a `p` tag as the second element.
4. The existing `h1` and `p` elements should not be modified.
5. The `JSX` should use valid comment syntax.

## Solution

```html
```jsx
const JSX = (
<div>
  <h1>This is a block of JSX</h1>
  { /* this is a JSX comment */ }
  <p>Here's a subtitle</p>
</div>);
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/front-end-development-libraries/)*
*Original Challenge ID: 5a24bbe0dba28a8d3cbd4c5e*

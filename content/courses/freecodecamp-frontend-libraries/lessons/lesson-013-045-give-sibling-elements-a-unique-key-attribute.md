---
id: lesson-013-045
title: Give Sibling Elements a Unique Key Attribute
chapterId: chapter-13
order: 45
duration: 5
objectives:
  - Give Sibling Elements a Unique Key Attribute
---

# Give Sibling Elements a Unique Key Attribute

The last challenge showed how the `map` method is used to dynamically render a number of elements based on user input. However, there was an important piece missing from that example. When you create an array of elements, each one needs a `key` attribute set to a unique value. React uses these keys to keep track of which items are added, changed, or removed. This helps make the re-rendering process more efficient when the list is modified in any way.  

**Note:** Keys only need to be unique between sibling elements, they don't need to be globally unique in your application.

## Instructions

The code editor has an array with some front end frameworks and a stateless functional component named `Frameworks()`. `Frameworks()` needs to map the array to an unordered list, much like in the last challenge. Finish writing the `map` callback to return an `li` element for each framework in the `frontEndFrameworks` array. This time, make sure to give each `li` a `key` attribute, set to a unique value. The `li` elements should also contain text from `frontEndFrameworks`.

Normally, you want to make the key something that uniquely identifies the element being rendered. As a last resort the array index may be used, but typically you should try to use a unique identification.

## Starter Code

```html
const frontEndFrameworks = [
  'React',
  'Angular',
  'Ember',
  'Knockout',
  'Backbone',
  'Vue'
];

function Frameworks() {
  const renderFrameworks = null; // Change this line
  return (
    <div>
      <h1>Popular Front End JavaScript Frameworks</h1>
      <ul>
        {renderFrameworks}
      </ul>
    </div>
  );
};
```

## Hints

1. The `Frameworks` component should exist and render to the page.
2. `Frameworks` should render an `h1` element.
3. `Frameworks` should render a `ul` element.
4. The `ul` tag should render 6 child `li` elements.
5. Each list item element should have a unique `key` attribute.
6. Each list item element should contain text from `frontEndFrameworks`.

## Solution

```html
```jsx
const frontEndFrameworks = [
  'React',
  'Angular',
  'Ember',
  'Knockout',
  'Backbone',
  'Vue'
];

function Frameworks() {
  const renderFrameworks = frontEndFrameworks.map((fw, i) => <li key={i}>{fw}</li>);
  return (
    <div>
      <h1>Popular Front End JavaScript Frameworks</h1>
      <ul>
        {renderFrameworks}
      </ul>
    </div>
  );
};
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/front-end-development-libraries/)*
*Original Challenge ID: 5a24c314108439a4d403618b*

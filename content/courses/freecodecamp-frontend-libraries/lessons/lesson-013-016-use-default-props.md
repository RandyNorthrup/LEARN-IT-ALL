---
id: lesson-013-016
title: Use Default Props
chapterId: chapter-13
order: 16
duration: 5
objectives:
  - Use Default Props
---

# Use Default Props

React also has an option to set default props. You can assign default props to a component as a property on the component itself and React assigns the default prop if necessary. This allows you to specify what a prop value should be if no value is explicitly provided. For example, if you declare `MyComponent.defaultProps = { location: 'San Francisco' }`, you have defined a location prop that's set to the string `San Francisco`, unless you specify otherwise. React assigns default props if props are undefined, but if you pass `null` as the value for a prop, it will remain `null`.

## Instructions

The code editor shows a `ShoppingCart` component. Define default props on this component which specify a prop `items` with a value of `0`.

## Starter Code

```html
const ShoppingCart = (props) => {
  return (
    <div>
      <h1>Shopping Cart Component</h1>
    </div>
  )
};
// Change code below this line
```

## Hints

1. The `ShoppingCart` component should render.
2. The `ShoppingCart` component should have a default prop of `{ items: 0 }`.

## Solution

```html
```jsx
const ShoppingCart = (props) => {
  return (
    <div>
      <h1>Shopping Cart Component</h1>
    </div>
  )
};

// Change code below this line
ShoppingCart.defaultProps = {
  items: 0
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/front-end-development-libraries/)*
*Original Challenge ID: 5a24c314108439a4d403616b*

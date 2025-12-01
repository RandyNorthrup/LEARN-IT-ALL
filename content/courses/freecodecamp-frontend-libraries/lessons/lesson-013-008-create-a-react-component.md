---
id: lesson-013-008
title: Create a React Component
chapterId: chapter-13
order: 8
duration: 5
objectives:
  - Create a React Component
---

# Create a React Component

The other way to define a React component is with the ES6 `class` syntax. In the following example, `Kitten` extends `React.Component`:

```jsx
class Kitten extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1>Hi</h1>
    );
  }
}
```

This creates an ES6 class `Kitten` which extends the `React.Component` class. So the `Kitten` class now has access to many useful React features, such as local state and lifecycle hooks. Don't worry if you aren't familiar with these terms yet, they will be covered in greater detail in later challenges. Also notice the `Kitten` class has a `constructor` defined within it that calls `super()`. It uses `super()` to call the constructor of the parent class, in this case `React.Component`. The constructor is a special method used during the initialization of objects that are created with the `class` keyword. It is best practice to call a component's `constructor` with `super`, and pass `props` to both. This makes sure the component is initialized properly. For now, know that it is standard for this code to be included. Soon you will see other uses for the constructor as well as `props`.

## Instructions

`MyComponent` is defined in the code editor using class syntax. Finish writing the `render` method so it returns a `div` element that contains an `h1` with the text `Hello React!`.

## Starter Code

```html
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // Change code below this line



    // Change code above this line
  }
};
```

## Hints

1. The React component should return a `div` element.
2. The returned `div` should render an `h1` heading element within it.
3. The `h1` heading element should contain the string `Hello React!`.

## Solution

```html
```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // Change code below this line
    return (
      <div>
        <h1>Hello React!</h1>
      </div>
    );
    // Change code above this line
  }
};
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/front-end-development-libraries/)*
*Original Challenge ID: 5a24c314108439a4d4036163*

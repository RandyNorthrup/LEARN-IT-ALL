---
id: lesson-013-011
title: Compose React Components
chapterId: chapter-13
order: 11
duration: 5
objectives:
  - Compose React Components
---

# Compose React Components

As the challenges continue to use more complex compositions with React components and JSX, there is one important point to note. Rendering ES6 style class components within other components is no different than rendering the simple components you used in the last few challenges. You can render JSX elements, stateless functional components, and ES6 class components within other components.

## Instructions

In the code editor, the `TypesOfFood` component is already rendering a component called `Vegetables`. Also, there is the `Fruits` component from the last challenge.

Nest two components inside of `Fruits` — first `NonCitrus`, and then `Citrus`. Both of these components are provided for you behind the scenes. Next, nest the `Fruits` class component into the `TypesOfFood` component, below the `h1` heading element and above `Vegetables`. The result should be a series of nested components, which uses two different component types.

## Starter Code

```html
class Fruits extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h2>Fruits:</h2>
        { /* Change code below this line */ }

        { /* Change code above this line */ }
      </div>
    );
  }
};

class TypesOfFood extends React.Component {
  constructor(props) {
     super(props);
  }
  render() {
    return (
      <div>
        <h1>Types of Food:</h1>
        { /* Change code below this line */ }

        { /* Change code above this line */ }
        <Vegetables />
      </div>
    );
  }
};
```

## Hints

1. The `TypesOfFood` component should return a single `div` element.
2. The `TypesOfFood` component should return the `Fruits` component.
3. The `Fruits` component should return the `NonCitrus` component and the `Citrus` component.
4. The `TypesOfFood` component should return the `Vegetables` component below the `Fruits` component.

## Solution

```html
```jsx
class Fruits extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h2>Fruits:</h2>
        { /* Change code below this line */ }
        <NonCitrus />
        <Citrus />
        { /* Change code above this line */ }
      </div>
    )
  }
}

class TypesOfFood extends React.Component {
  constructor(props) {
     super(props);
  }
    render() {
      return (
        <div>
        <h1>Types of Food:</h1>
          { /* Change code below this line */ }
          <Fruits />
          { /* Change code above this line */ }
          <Vegetables />
        </div>
      );
    }
};
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/front-end-development-libraries/)*
*Original Challenge ID: 5a24c314108439a4d4036166*

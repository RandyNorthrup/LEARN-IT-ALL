---
id: lesson-013-012
title: Render a Class Component to the DOM
chapterId: chapter-13
order: 12
duration: 5
objectives:
  - Render a Class Component to the DOM
---

# Render a Class Component to the DOM

You may remember using the ReactDOM API in an earlier challenge to render JSX elements to the DOM. The process for rendering React components will look very similar. The past few challenges focused on components and composition, so the rendering was done for you behind the scenes. However, none of the React code you write will render to the DOM without making a call to the ReactDOM API.

Here's a refresher on the syntax: `ReactDOM.render(componentToRender, targetNode)`. The first argument is the React component that you want to render. The second argument is the DOM node that you want to render that component within.

React components are passed into `ReactDOM.render()` a little differently than JSX elements. For JSX elements, you pass in the name of the element that you want to render. However, for React components, you need to use the same syntax as if you were rendering a nested component, for example `ReactDOM.render(<ComponentToRender />, targetNode)`. You use this syntax for both ES6 class components and functional components.

## Instructions

Both the `Fruits` and `Vegetables` components are defined for you behind the scenes. Render both components as children of the `TypesOfFood` component, then render `TypesOfFood` to the DOM. There is a `div` with `id='challenge-node'` available for you to use.

## Starter Code

```html
class TypesOfFood extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Types of Food:</h1>
        {/* Change code below this line */}

        {/* Change code above this line */}
      </div>
    );
  }
};

// Change code below this line
```

## Hints

1. The `TypesOfFood` component should return a single `div` element.
2. The `TypesOfFood` component should render the `Fruits` component after the `h1` element.
3. The `TypesOfFood` component should render the `Vegetables` component after `Fruits`.
4. The `TypesOfFood` component should render to the DOM within the `div` with the id `challenge-node`.

## Solution

```html
```jsx
class TypesOfFood extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Types of Food:</h1>
        {/* Change code below this line */}
          <Fruits />
           <Vegetables />
         {/* Change code above this line */}
      </div>
    );
  }
};

// Change code below this line
ReactDOM.render(<TypesOfFood />, document.getElementById('challenge-node'));
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/front-end-development-libraries/)*
*Original Challenge ID: 5a24c314108439a4d4036167*

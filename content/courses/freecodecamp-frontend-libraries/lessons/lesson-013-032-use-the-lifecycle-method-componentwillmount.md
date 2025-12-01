---
id: lesson-013-032
title: Use the Lifecycle Method componentWillMount
chapterId: chapter-13
order: 32
duration: 5
objectives:
  - Use the Lifecycle Method componentWillMount
---

# Use the Lifecycle Method componentWillMount

React components have several special methods that provide opportunities to perform actions at specific points in the lifecycle of a component. These are called lifecycle methods, or lifecycle hooks, and allow you to catch components at certain points in time. This can be before they are rendered, before they update, before they receive props, before they unmount, and so on. Here is a list of some of the main lifecycle methods: `componentWillMount()` `componentDidMount()` `shouldComponentUpdate()` `componentDidUpdate()` `componentWillUnmount()` The next several lessons will cover some of the basic use cases for these lifecycle methods.

**Note:** The `componentWillMount` Lifecycle method will be deprecated in a future version of 16.X and removed in version 17. Learn more in this <a href="https://www.freecodecamp.org/news/how-to-safely-use-reacts-life-cycles-with-fiber-s-async-rendering-fd4469ebbd8f/" target="_blank" rel="noopener noreferrer nofollow">article</a>

## Instructions

The `componentWillMount()` method is called before the `render()` method when a component is being mounted to the DOM. Log something to the console within `componentWillMount()` - you may want to have your browser console open to see the output.

## Starter Code

```html
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    // Change code below this line

    // Change code above this line
  }
  render() {
    return <div />
  }
};
```

## Hints

1. `MyComponent` should render a `div` element.
2. `console.log` should be called in `componentWillMount`.

## Solution

```html
```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    // Change code below this line
    console.log('Component is mounting...');
    // Change code above this line
  }
  render() {
    return <div />
  }
};
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/front-end-development-libraries/)*
*Original Challenge ID: 5a24c314108439a4d403617c*

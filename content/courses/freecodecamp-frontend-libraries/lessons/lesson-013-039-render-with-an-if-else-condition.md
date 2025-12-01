---
id: lesson-013-039
title: Render with an If-Else Condition
chapterId: chapter-13
order: 39
duration: 5
objectives:
  - Render with an If-Else Condition
---

# Render with an If-Else Condition

Another application of using JavaScript to control your rendered view is to tie the elements that are rendered to a condition. When the condition is true, one view renders. When it's false, it's a different view. You can do this with a standard `if/else` statement in the `render()` method of a React component.

## Instructions

MyComponent contains a `boolean` in its state which tracks whether you want to display some element in the UI or not. The `button` toggles the state of this value. Currently, it renders the same UI every time. Rewrite the `render()` method with an `if/else` statement so that if `display` is `true`, you return the current markup. Otherwise, return the markup without the `h1` element.

**Note:** You must write an `if/else` to pass the tests. Use of the ternary operator will not pass here.

## Starter Code

```html
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true
    }
    this.toggleDisplay = this.toggleDisplay.bind(this);
  }
  toggleDisplay() {
    this.setState((state) => ({
      display: !state.display
    }));
  }
  render() {
    // Change code below this line

    return (
       <div>
         <button onClick={this.toggleDisplay}>Toggle Display</button>
         <h1>Displayed!</h1>
       </div>
    );
  }
};
```

## Hints

1. `MyComponent` should exist and render.
2. When `display` is set to `true`, a `div`, `button`, and `h1` should render.
3. When `display` is set to `false`, only a `div` and `button` should render.
4. The render method should use an `if/else` statement to check the condition of `this.state.display`.

## Solution

```html
```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true
    }
 this.toggleDisplay = this.toggleDisplay.bind(this);
 }
  toggleDisplay() {
    this.setState((state) => ({
      display: !state.display
    }));
  }
  render() {
    // Change code below this line
    if (this.state.display) {
      return (
         <div>
           <button onClick={this.toggleDisplay}>Toggle Display</button>
           <h1>Displayed!</h1>
         </div>
      );
    } else {
      return (
        <div>
           <button onClick={this.toggleDisplay}>Toggle Display</button>
         </div>
      );
    }
  }
};
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/front-end-development-libraries/)*
*Original Challenge ID: 5a24c314108439a4d4036184*

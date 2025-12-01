---
id: lesson-013-027
title: Write a Simple Counter
chapterId: chapter-13
order: 27
duration: 5
objectives:
  - Write a Simple Counter
---

# Write a Simple Counter

You can design a more complex stateful component by combining the concepts covered so far. These include initializing `state`, writing methods that set `state`, and assigning click handlers to trigger these methods.

## Instructions

The `Counter` component keeps track of a `count` value in `state`. There are two buttons which call methods `increment()` and `decrement()`. Write these methods so the counter value is incremented or decremented by 1 when the appropriate button is clicked. Also, create a `reset()` method so when the reset button is clicked, the count is set to 0.

**Note:** Make sure you don't modify the `className`s of the buttons. Also, remember to add the necessary bindings for the newly-created methods in the constructor.

## Starter Code

```html
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
    // Change code below this line

    // Change code above this line
  }
  // Change code below this line

  // Change code above this line
  render() {
    return (
      <div>
        <button className='inc' onClick={this.increment}>Increment!</button>
        <button className='dec' onClick={this.decrement}>Decrement!</button>
        <button className='reset' onClick={this.reset}>Reset</button>
        <h1>Current Count: {this.state.count}</h1>
      </div>
    );
  }
};
```

## Hints

1. `Counter` should return a `div` element which contains three buttons with text content in this order `Increment!`, `Decrement!`, `Reset`.
2. The state of `Counter` should initialize with a `count` property set to `0`.
3. Clicking the increment button should increment the count by `1`.
4. Clicking the decrement button should decrement the count by `1`.
5. Clicking the reset button should reset the count to `0`.

## Solution

```html
```jsx
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  this.increment = this.increment.bind(this);
 this.decrement = this.decrement.bind(this);
 this.reset = this.reset.bind(this);
 }
  reset() {
    this.setState({
      count: 0
    });
  }
  increment() {
    this.setState(state => ({
      count: state.count + 1
    }));
  }
  decrement() {
    this.setState(state => ({
      count: state.count - 1
    }));
  }
  render() {
    return (
      <div>
        <button className='inc' onClick={this.increment}>Increment!</button>
        <button className='dec' onClick={this.decrement}>Decrement!</button>
        <button className='reset' onClick={this.reset}>Reset</button>
        <h1>Current Count: {this.state.count}</h1>
      </div>
    );
  }
};
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/front-end-development-libraries/)*
*Original Challenge ID: 5a24c314108439a4d4036177*

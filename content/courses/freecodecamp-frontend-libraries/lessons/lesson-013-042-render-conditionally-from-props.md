---
id: lesson-013-042
title: Render Conditionally from Props
chapterId: chapter-13
order: 42
duration: 5
objectives:
  - Render Conditionally from Props
---

# Render Conditionally from Props

So far, you've seen how to use `if/else`, `&&`, and the ternary operator (`condition ? expressionIfTrue : expressionIfFalse`) to make conditional decisions about what to render and when. However, there's one important topic left to discuss that lets you combine any or all of these concepts with another powerful React feature: props. Using props to conditionally render code is very common with React developers — that is, they use the value of a given prop to automatically make decisions about what to render.

In this challenge, you'll set up a child component to make rendering decisions based on props. You'll also use the ternary operator, but you can see how several of the other concepts that were covered in the last few challenges might be just as useful in this context.

## Instructions

The code editor has two components that are partially defined for you: a parent called `GameOfChance`, and a child called `Results`. They are used to create a simple game where the user presses a button to see if they win or lose.

First, you'll need a simple expression that randomly returns a different value every time it is run. You can use `Math.random()`. This method returns a value between `0` (inclusive) and `1` (exclusive) each time it is called. So for 50/50 odds, use `Math.random() >= .5` in your expression. Statistically speaking, this expression will return `true` 50% of the time, and `false` the other 50%. In the render method, replace `null` with the above expression to complete the variable declaration.

Now you have an expression that you can use to make a randomized decision in the code. Next you need to implement this. Render the `Results` component as a child of `GameOfChance`, and pass in `expression` as a prop called `fiftyFifty`. In the `Results` component, write a ternary expression to render the `h1` element with the text `You Win!` or `You Lose!` based on the `fiftyFifty` prop that's being passed in from `GameOfChance`. Finally, make sure the `handleClick()` method is correctly counting each turn so the user knows how many times they've played. This also serves to let the user know the component has actually updated in case they win or lose twice in a row.

## Starter Code

```html
class Results extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    {/* Change code below this line */}
    return <h1></h1>;
    {/* Change code above this line */}
  }
}

class GameOfChance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 1
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState(prevState => {
      // Complete the return statement:
      return {
        counter: prevState
      }
    });
  }
  render() {
    const expression = null; // Change this line
    return (
      <div>
        <button onClick={this.handleClick}>Play Again</button>
        {/* Change code below this line */}

        {/* Change code above this line */}
        <p>{'Turn: ' + this.state.counter}</p>
      </div>
    );
  }
}
```

## Hints

1. The `GameOfChance` component should exist and render to the page.
2. `GameOfChance` should return a single `button` element.
3. `GameOfChance` should return a single instance of the `Results` component, which has a prop called `fiftyFifty`.
4. `GameOfChance` state should be initialized with a property of `counter` set to a value of `1`.
5. When the `GameOfChance` component is first rendered to the DOM, a `p` element should be returned with the inner text of `Turn: 1`.
6. Each time the button is clicked, the counter state should be incremented by a value of 1, and a single `p` element should be rendered to the DOM that contains the text `Turn: N`, where `N` is the value of the counter state.
7. When the `GameOfChance` component is first mounted to the DOM and each time the button is clicked thereafter, a single `h1` element should be returned that randomly renders either `You Win!` or `You Lose!`. Note: this can fail randomly. If that happens, please try again.

## Solution

```html
```jsx
// We want this to be deterministic for testing purposes.
const randomSequence = [true, false, false, true, true, false, false, true, true, false];
let index = 0;
const fiftyFifty = () => randomSequence[index++ % randomSequence.length];

class Results extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <h1>{this.props.fiftyFifty ? 'You Win!' : 'You Lose!'}</h1>;
  }
}

class GameOfChance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 1
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState(prevState => {
      return {
        counter: prevState.counter + 1
      }
    });
  }
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Play Again</button>
        <Results fiftyFifty={fiftyFifty()} />
        <p>{'Turn: ' + this.state.counter}</p>
      </div>
    );
  }
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/front-end-development-libraries/)*
*Original Challenge ID: 5a24c314108439a4d4036188*

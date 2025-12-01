---
id: lesson-013-041
title: Use a Ternary Expression for Conditional Rendering
chapterId: chapter-13
order: 41
duration: 5
objectives:
  - Use a Ternary Expression for Conditional Rendering
---

# Use a Ternary Expression for Conditional Rendering

Before moving on to dynamic rendering techniques, there's one last way to use built-in JavaScript conditionals to render what you want: the <dfn>ternary operator</dfn>. The ternary operator is often utilized as a shortcut for `if/else` statements in JavaScript. They're not quite as robust as traditional `if/else` statements, but they are very popular among React developers. One reason for this is because of how JSX is compiled, `if/else` statements can't be inserted directly into JSX code. You might have noticed this a couple challenges ago — when an `if/else` statement was required, it was always *outside* the `return` statement. Ternary expressions can be an excellent alternative if you want to implement conditional logic within your JSX. Recall that a ternary operator has three parts, but you can combine several ternary expressions together. Here's the basic syntax:

```jsx
condition ? expressionIfTrue : expressionIfFalse;
```

## Instructions

The code editor has three constants defined within the `CheckUserAge` component's `render()` method. They are called `buttonOne`, `buttonTwo`, and `buttonThree`. Each of these is assigned a simple JSX expression representing a button element. First, initialize the state of `CheckUserAge` with `input` and `userAge` both set to values of an empty string.

Once the component is rendering information to the page, users should have a way to interact with it. Within the component's `return` statement, set up a ternary expression that implements the following logic: when the page first loads, render the submit button, `buttonOne`, to the page. Then, when a user enters their age and clicks the button, render a different button based on the age. If a user enters a number less than `18`, render `buttonThree`. If a user enters a number greater than or equal to `18`, render `buttonTwo`.

## Starter Code

```html
const inputStyle = {
  width: 235,
  margin: 5
};

class CheckUserAge extends React.Component {
  constructor(props) {
    super(props);
    // Change code below this line

    // Change code above this line
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      input: e.target.value,
      userAge: ''
    });
  }
  submit() {
    this.setState(state => ({
      userAge: state.input
    }));
  }
  render() {
    const buttonOne = <button onClick={this.submit}>Submit</button>;
    const buttonTwo = <button>You May Enter</button>;
    const buttonThree = <button>You Shall Not Pass</button>;
    return (
      <div>
        <h3>Enter Your Age to Continue</h3>
        <input
          style={inputStyle}
          type='number'
          value={this.state.input}
          onChange={this.handleChange}
        />
        <br />
        {/* Change code below this line */}

        {/* Change code above this line */}
      </div>
    );
  }
}
```

## Hints

1. The `CheckUserAge` component should render with a single `input` element and a single `button` element.
2. The `CheckUserAge` component's state should be initialized with a property of `userAge` and a property of `input`, both set to a value of an empty string.
3. When the `CheckUserAge` component is first rendered to the DOM, the `button`'s inner text should be Submit.
4. When a number of less than 18 is entered into the `input` element and the `button` is clicked, the `button`'s inner text should read `You Shall Not Pass`.
5. When a number greater than or equal to 18 is entered into the `input` element and the `button` is clicked, the `button`'s inner text should read `You May Enter`.
6. Once a number has been submitted, and the value of the `input` is once again changed, the `button` should return to reading `Submit`.
7. Your code should not contain any `if/else` statements.

## Solution

```html
```jsx
const inputStyle = {
  width: 235,
  margin: 5
};

class CheckUserAge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userAge: '',
      input: ''
    };
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      input: e.target.value,
      userAge: ''
    });
  }
  submit() {
    this.setState(state => ({
      userAge: state.input
    }));
  }
  render() {
    const buttonOne = <button onClick={this.submit}>Submit</button>;
    const buttonTwo = <button>You May Enter</button>;
    const buttonThree = <button>You Shall Not Pass</button>;
    return (
      <div>
        <h3>Enter Your Age to Continue</h3>
        <input
          style={inputStyle}
          type='number'
          value={this.state.input}
          onChange={this.handleChange}
        />
        <br />
        {this.state.userAge === ''
          ? buttonOne
          : this.state.userAge >= 18
          ? buttonTwo
          : buttonThree}
      </div>
    );
  }
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/front-end-development-libraries/)*
*Original Challenge ID: 5a24c314108439a4d4036187*

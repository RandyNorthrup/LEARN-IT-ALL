---
id: lesson-014-002
title: Manage State Locally First
chapterId: chapter-14
order: 2
duration: 5
objectives:
  - Manage State Locally First
---

# Manage State Locally First

Here you'll finish creating the `DisplayMessages` component.

## Instructions

First, in the `render()` method, have the component render an `input` element, `button` element, and `ul` element. When the `input` element changes, it should trigger a `handleChange()` method. Also, the `input` element should render the value of `input` that's in the component's state. The `button` element should trigger a `submitMessage()` method when it's clicked.

Second, write these two methods. The `handleChange()` method should update the `input` with what the user is typing. The `submitMessage()` method should concatenate the current message (stored in `input`) to the `messages` array in local state, and clear the value of the `input`.

Finally, use the `ul` to map over the array of `messages` and render it to the screen as a list of `li` elements.

## Starter Code

```html
class DisplayMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      messages: []
    }
  }
  // Add handleChange() and submitMessage() methods here

  render() {
    return (
      <div>
        <h2>Type in a new Message:</h2>
        { /* Render an input, button, and ul below this line */ }

        { /* Change code above this line */ }
      </div>
    );
  }
};
```

## Hints

1. The `DisplayMessages` component should initialize with a state equal to `{ input: "", messages: [] }`.
2. The `DisplayMessages` component should render a `div` containing an `h2` element, a `button` element, a `ul` element, and `li` elements as children.
3. `.map` should be used on the `messages` array.
4. The `input` element should render the value of `input` in local state.
5. Calling the method `handleChange` should update the `input` value in state to the current input.
6. Clicking the `Add message` button should call the method `submitMessage` which should add the current `input` to the `messages` array in state.
7. The `submitMessage` method should clear the current input.

## Solution

```html
```jsx
class DisplayMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      messages: []
    }
 this.handleChange = this.handleChange.bind(this);
   this.submitMessage = this.submitMessage.bind(this);
 }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  submitMessage() {
    this.setState((state) => {
      const currentMessage = state.input;
      return {
        input: '',
        messages: state.messages.concat(currentMessage)
      };  
    });
  }
  render() {
    return (
      <div>
        <h2>Type in a new Message:</h2>
        <input
          value={this.state.input}
          onChange={this.handleChange}/><br/>
        <button onClick={this.submitMessage}>Submit</button>
        <ul>
          {this.state.messages.map( (message, idx) => {
              return (
                 <li key={idx}>{message}</li>
              )
            })
          }
        </ul>
      </div>
    );
  }
};
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/front-end-development-libraries/)*
*Original Challenge ID: 5a24c314108439a4d4036142*

---
id: lesson-013-029
title: Create a Controlled Form
chapterId: chapter-13
order: 29
duration: 5
objectives:
  - Create a Controlled Form
---

# Create a Controlled Form

The last challenge showed that React can control the internal state for certain elements like `input` and `textarea`, which makes them controlled components. This applies to other form elements as well, including the regular HTML `form` element.

## Instructions

The `MyForm` component is set up with an empty `form` with a submit handler. The submit handler will be called when the form is submitted.

We've added a button which submits the form. You can see it has the `type` set to `submit` indicating it is the button controlling the form. Add the `input` element in the `form` and set its `value` and `onChange()` attributes like the last challenge. You should then complete the `handleSubmit` method so that it sets the component state property `submit` to the current input value in the local `state`.

**Note:** You also must call `event.preventDefault()` in the submit handler, to prevent the default form submit behavior which will refresh the web page. For camper convenience, the default behavior has been disabled here to prevent refreshes from resetting challenge code.

Finally, create an `h1` tag after the `form` which renders the `submit` value from the component's `state`. You can then type in the form and click the button (or press enter), and you should see your input rendered to the page.

## Starter Code

```html
class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      submit: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  handleSubmit(event) {
    // Change code below this line

    // Change code above this line
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {/* Change code below this line */}

          {/* Change code above this line */}
          <button type='submit'>Submit!</button>
        </form>
        {/* Change code below this line */}

        {/* Change code above this line */}
      </div>
    );
  }
}
```

## Hints

1. `MyForm` should return a `div` element which contains a `form` and an `h1` tag. The form should include an `input` and a `button`.
2. The state of `MyForm` should initialize with `input` and `submit` properties, both set to empty strings.
3. Typing in the `input` element should update the `input` property of the component's state.
4. Submitting the form should run `handleSubmit` which should set the `submit` property in state equal to the current input.
5. `handleSubmit` should call `event.preventDefault`
6. The `h1` heading element should render the value of the `submit` field from the component's state.

## Solution

```html
```jsx
class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      submit: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState(state => ({
      submit: state.input
    }));
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.input} onChange={this.handleChange} />
          <button type='submit'>Submit!</button>
        </form>
        <h1>{this.state.submit}</h1>
      </div>
    );
  }
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/front-end-development-libraries/)*
*Original Challenge ID: 5a24c314108439a4d4036179*

---
id: lesson-013-044
title: Use Array.map() to Dynamically Render Elements
chapterId: chapter-13
order: 44
duration: 5
objectives:
  - Use Array.map() to Dynamically Render Elements
---

# Use Array.map() to Dynamically Render Elements

Conditional rendering is useful, but you may need your components to render an unknown number of elements. Often in reactive programming, a programmer has no way to know what the state of an application is until runtime, because so much depends on a user's interaction with that program. Programmers need to write their code to correctly handle that unknown state ahead of time. Using `Array.map()` in React illustrates this concept.

For example, you create a simple "To Do List" app. As the programmer, you have no way of knowing how many items a user might have on their list. You need to set up your component to dynamically render the correct number of list elements long before someone using the program decides that today is laundry day.

## Instructions

The code editor has most of the `MyToDoList` component set up. Some of this code should look familiar if you completed the controlled form challenge. You'll notice a `textarea` and a `button`, along with a couple of methods that track their states, but nothing is rendered to the page yet.

Inside the `constructor`, create a `this.state` object and define two states: `userInput` should be initialized as an empty string, and `toDoList` should be initialized as an empty array. Next, delete the `null` value in the `render()` method next to the `items` variable. In its place, map over the `toDoList` array stored in the component's internal state and dynamically render a `li` for each item. Try entering the string `eat, code, sleep, repeat` into the `textarea`, then click the button and see what happens.

**Note:** You may know that all sibling child elements created by a mapping operation like this do need to be supplied with a unique `key` attribute. Don't worry, this is the topic of the next challenge.

## Starter Code

```html
const textAreaStyles = {
  width: 235,
  margin: 5
};

class MyToDoList extends React.Component {
  constructor(props) {
    super(props);
    // Change code below this line

    // Change code above this line
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit() {
    const itemsArray = this.state.userInput.split(',');
    this.setState({
      toDoList: itemsArray
    });
  }
  handleChange(e) {
    this.setState({
      userInput: e.target.value
    });
  }
  render() {
    const items = null; // Change this line
    return (
      <div>
        <textarea
          onChange={this.handleChange}
          value={this.state.userInput}
          style={textAreaStyles}
          placeholder='Separate Items With Commas'
        />
        <br />
        <button onClick={this.handleSubmit}>Create List</button>
        <h1>My "To Do" List:</h1>
        <ul>{items}</ul>
      </div>
    );
  }
}
```

## Hints

1. The MyToDoList component should exist and render to the page.
2. The first child of `MyToDoList` should be a `textarea` element.
3. The second child of `MyToDoList` should be a `br` element.
4. The third child of `MyToDoList` should be a `button` element.
5. The state of `MyToDoList` should be initialized with `toDoList` as an empty array.
6. The state of `MyToDoList` should be initialized with `userInput` as an empty string.
7. When the `Create List` button is clicked, the `MyToDoList` component should dynamically return an unordered list that contains a list item element for every item of a comma-separated list entered into the `textarea` element.

## Solution

```html
```jsx
const textAreaStyles = {
  width: 235,
  margin: 5
};

class MyToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toDoList: [],
      userInput: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit() {
    const itemsArray = this.state.userInput.split(',');
    this.setState({
      toDoList: itemsArray
    });
  }
  handleChange(e) {
    this.setState({
      userInput: e.target.value
    });
  }
  render() {
    const items = this.state.toDoList.map((item, i) => {
      return <li key={i}>{item}</li>;
    });
    return (
      <div>
        <textarea
          onChange={this.handleChange}
          value={this.state.userInput}
          style={textAreaStyles}
          placeholder='Separate Items With Commas'
        />
        <br />
        <button onClick={this.handleSubmit}>Create List</button>
        <h1>My "To Do" List:</h1>
        <ul>{items}</ul>
      </div>
    );
  }
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/front-end-development-libraries/)*
*Original Challenge ID: 5a24c314108439a4d403618a*

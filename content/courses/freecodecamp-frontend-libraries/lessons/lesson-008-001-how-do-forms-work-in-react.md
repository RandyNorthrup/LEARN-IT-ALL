---
id: lesson-008-001
title: How Do Forms Work in React?
chapterId: chapter-08
order: 1
duration: 5
objectives:
  - How Do Forms Work in React?
---

# How Do Forms Work in React?

Forms are fundamental to every web application because they let you handle user input, collect data, and trigger actions.

In React, forms are managed using state or refs, giving you full control over their behavior and validation. These two ways to manage forms are called "controlled"  and "uncontrolled" input.

Let's look at what controlled and uncontrolled inputs are.

Controlled input is the most "React-like" way to handle form inputs. With controlled inputs, you store the input field value in state and update it through `onChange` events. This gives you complete control over the form data and allows instant validation and conditional rendering.

The process works like this: React maintains the form state with the `useState` hook, and you update it on every change. When a user types in an input field, the `onChange` event fires, updates the state, and React re-renders the component with the new value.

```jsx
import { useState } from "react";

function App() {
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Your name</label> <br />
        <input value={name} id="name" onChange={handleChange} type="text" />
        <button type="submit">Submit</button>
      </form> 
    </>
  );
}

export default App;
```

The benefits of controlled inputs include the following:

- Immediate access to the form data.

- You can implement instant validation.

- You can conditionally disable the submit button.

- You can control the input value programmatically.

Uncontrolled inputs on the other hand are seen more in traditional HTML forms. So, instead of handling the inputs through the `useState` hook, uncontrolled inputs in HTML maintain their own internal state with the help of the DOM.

Since the DOM controls the input values, what you need is to pull in the values of the input fields with ref. This approach requires less code and performs better because refs do not make React re-render.

Here's an example of uncontrolled inputs:

```jsx
import { useRef } from "react";

function App() {
  const nameRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(nameRef.current.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Your</label>{" "}
      <input type="text" ref={nameRef} id="name" />
      <button type="submit">Submit</button>
    </form>
  );
}

export default App;
```

One very noticeable advantage of uncontrolled inputs is that they require less code. They also perform better and feel more natural to React beginners who are familiar with HTML.

So, which should you use between controlled and uncontrolled inputs? 

Use controlled inputs when you need dynamic form updates, real-time validation, or when you want to sync input values with state. They provide better control but require more re-renders.

Use uncontrolled inputs when you need simpler forms, want to access values only on submission, or when you're working with non-React code.

Regardless of which you use between controlled and uncontrolled inputs, here are some best practices you should adhere to while making forms in React:

- Always prevent the default form submission.

- Ensure you validate inputs before submission.

- Always provide clear feedback to users with loading, validation errors or other related states.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/front-end-development-libraries/)*
*Original Challenge ID: 67d1a928ae86929a85c1bb6b*

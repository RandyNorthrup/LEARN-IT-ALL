---
id: lesson-007-002
title: How Does Conditional Rendering Work in React Components?
chapterId: chapter-07
order: 2
duration: 5
objectives:
  - How Does Conditional Rendering Work in React Components?
---

# How Does Conditional Rendering Work in React Components?

Conditional rendering in React allows you to create dynamic user interfaces. It is used to show different content based on certain conditions or states within your application.

The most common approaches of using conditional rendering includes using `if` statements, the ternary (`?:`) operator, and logical AND (`&&`) operator.

The simplest form of conditional rendering uses an `if` statement. Here's an example:

```jsx
function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  }
  return <h1>Please sign in</h1>;
}
```

In this example, the `Greeting` component checks the `isLoggedIn` prop. If it's `true`, it returns a welcome message, otherwise, it prompts the user to sign in.

Here is an example using the `Greeting` component inside of the parent `App` component:

```jsx
function App() {
  return (
    <div className="App">
      <Greeting isLoggedIn={false} />
    </div>
  );
}
```

For simpler conditions, the ternary operator (`?:`) is often used directly within JSX. It allows for inline conditional rendering, which can make your code more concise:

```jsx
function Greeting({ isLoggedIn }) {
  return <h1>{isLoggedIn ? "Welcome back!" : "Please sign in."}</h1>;
}
```

This code achieves the same result as the previous example but in a more compact form. The ternary operator checks `isLoggedIn` and renders the appropriate message.

Another common pattern for conditional rendering is using the logical AND (`&&`) operator. This is particularly useful when you want to render something, or nothing, based on a condition:

```jsx
function Notification({ message }) {
  return (
    <div>
      {message && <p>{message}</p>}
    </div>
  );
}
```

In this example, the paragraph element with the message is only rendered if the `message` prop is truthy. If `message` is falsy - meaning it is an empty string, `null`, or `undefined`, nothing is rendered to the screen.

By mastering these techniques of conditional rendering, you can build more interactive and user-friendly applications that adapt to changing data and user interactions.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/front-end-development-libraries/)*
*Original Challenge ID: 673500abfe36cd015b67b1b7*
